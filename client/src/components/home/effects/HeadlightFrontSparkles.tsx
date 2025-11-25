// @ts-nocheck
import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const sparkleVertexShader = `
    uniform float uTime;
    uniform float uFade;
    uniform float uBaseSize;
    uniform float uPixelRatio;
    attribute float aRandom;
    varying float vIntensity;

    float hash(float n) {
        return fract(sin(n) * 43758.5453123);
    }

    void main() {
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);

        // Layered twinkle: fast stochastic gate + rapid sine flares
        float t = uTime * (6.0 + aRandom * 8.0);
        float noisy = hash(t + aRandom * 97.0);
        float gate = step(0.4, noisy);
        float strobe = pow(hash(t * 2.7 + aRandom * 211.0), 9.0) * gate;
        float shimmer = pow(abs(sin(t * (1.6 + aRandom))), 8.0);
        float sparkle = max(shimmer, strobe);

        vIntensity = (0.18 + sparkle * 1.6) * uFade;

        float size = uBaseSize * (0.8 + sparkle * 2.6) * uPixelRatio * uFade;
        gl_PointSize = min(size, uPixelRatio * 8.0);
        gl_Position = projectionMatrix * mvPosition;
    }
`;

const sparkleFragmentShader = `
    precision highp float;
    uniform vec3 uColorA;
    uniform vec3 uColorB;
    varying float vIntensity;

    void main() {
        vec2 uv = gl_PointCoord - 0.5;
        float r = length(uv * 2.0);

        // Crisp core + cross-shaped glints for a jewel-like pixel
        float core = smoothstep(0.45, 0.05, r);
        float cross = pow(max(0.0, 1.0 - (abs(uv.x) + abs(uv.y)) * 3.2), 3.0);
        float sparkle = clamp(core + cross * 1.4, 0.0, 1.0);

        float alpha = sparkle * vIntensity;
        if (alpha <= 0.01) discard;

        float hueMix = 0.5 + 0.5 * sin((uv.x + uv.y) * 28.0);
        vec3 color = mix(uColorA, uColorB, hueMix);
        gl_FragColor = vec4(color * (1.2 + vIntensity * 1.8), alpha);
    }
`;

// --- Headlight Front Sparkles (dense, compact oval in front of the lamp) ---
export function HeadlightFrontSparkles({
    center,
    size,
    nodes = [],
    count = 360,
    offset = 0.08,
    renderOrder = 15,
    fixedCenter = null,
    forward = new THREE.Vector3(0, 0, 1),
    yNudge = 0.04,
    zNudge = -0.05,
    xNudge = 0,
    trigger = 0
}) {
    const pointsRef = useRef();
    const geometryRef = useRef();
    const materialRef = useRef();
    const opacityRef = useRef(0);
    const remainingRef = useRef(0);
    const holdRef = useRef(0);
    const { gl } = useThree();
    const tmpVec = useMemo(() => new THREE.Vector3(), []);

    // Compact oval distribution
    const positions = useMemo(() => {
        const arr = new Float32Array(count * 3);
        const sx = (size?.x ?? 0.6) * 0.25;
        const sy = (size?.y ?? 0.2) * 0.25;
        const sz = (size?.z ?? 0.2) * 0.08;
        for (let i = 0; i < count; i++) {
            const theta = Math.random() * Math.PI * 2;
            const r = Math.sqrt(Math.random());
            const x = Math.cos(theta) * r * sx;
            const y = Math.sin(theta) * r * sy * 0.75; // Slightly flatter vertically
            const z = (Math.random() - 0.5) * sz;
            const i3 = i * 3;
            arr[i3 + 0] = x;
            arr[i3 + 1] = y;
            arr[i3 + 2] = z;
        }
        return arr;
    }, [count, size?.x, size?.y, size?.z]);

    const randoms = useMemo(
        () => Float32Array.from({ length: count }, () => Math.random()),
        [count]
    );

    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uFade: { value: 0 },
        uBaseSize: { value: 1.5 }, // small points
        uPixelRatio: { value: Math.min(2, gl.getPixelRatio()) },
        uColorA: { value: new THREE.Color('#fff8e1') },
        uColorB: { value: new THREE.Color('#ffd87a') }
    }), [gl]);

    useEffect(() => {
        if (!geometryRef.current) return;
        geometryRef.current.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometryRef.current.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 1));
    }, [positions, randoms]);

    const tmpBox = useMemo(() => new THREE.Box3(), []);
    const tmpCenter = useMemo(() => new THREE.Vector3(), []);
    const totalDuration = 3.0;
    const introDelay = 0.4;
    const holdDuration = 0.5;
    const fadeDuration = Math.max(0.1, totalDuration - introDelay - holdDuration);
    const delayRef = useRef(0);

    useEffect(() => {
        if (!trigger) return;
        remainingRef.current = fadeDuration;
        holdRef.current = holdDuration;
        delayRef.current = introDelay;
        opacityRef.current = 1;
    }, [fadeDuration, holdDuration, introDelay, trigger]);

    useFrame((state, delta) => {
        const mat = materialRef.current;
        if (!mat) return;

        if (delayRef.current > 0) {
            delayRef.current = Math.max(0, delayRef.current - delta);
            opacityRef.current = 0;
        } else if (holdRef.current > 0) {
            holdRef.current = Math.max(0, holdRef.current - delta);
            opacityRef.current = 1;
        } else if (remainingRef.current > 0) {
            opacityRef.current = remainingRef.current / fadeDuration;
            remainingRef.current = Math.max(0, remainingRef.current - delta);
        } else {
            opacityRef.current = 0;
        }

        mat.uniforms.uFade.value = opacityRef.current;
        mat.uniforms.uTime.value = state.clock.elapsedTime;

        let liveCenter = fixedCenter || center;

        // Recompute live center from headlight nodes so float/animations are respected
        if (!liveCenter && nodes && nodes.length > 0) {
            tmpBox.makeEmpty();
            nodes.forEach((n) => {
                n.updateWorldMatrix(true, false);
                tmpBox.expandByObject(n);
            });
            if (!tmpBox.isEmpty()) {
                liveCenter = tmpBox.getCenter(tmpCenter);
            }
        }

        if (pointsRef.current && liveCenter) {
            // Nudge downward slightly and forward in car space (not toward camera) to sit on the headlight
            const baseCenter = tmpCenter.copy(liveCenter);
            baseCenter.y += yNudge;
            baseCenter.z += zNudge;
            baseCenter.x += xNudge;

            tmpVec.copy(forward).normalize().multiplyScalar(offset);
            pointsRef.current.position.copy(baseCenter).add(tmpVec);
            pointsRef.current.lookAt(baseCenter.clone().add(forward));

        }
    });

    if (!center && (!nodes || nodes.length === 0)) return null;

    return (
        <>
            <points ref={pointsRef} renderOrder={renderOrder} frustumCulled={false}>
                <bufferGeometry ref={geometryRef} />
                <shaderMaterial
                    ref={materialRef}
                    vertexShader={sparkleVertexShader}
                    fragmentShader={sparkleFragmentShader}
                    uniforms={uniforms}
                    transparent
                    depthWrite={false}
                    depthTest={false}
                    blending={THREE.AdditiveBlending}
                    toneMapped={false}
                />
            </points>
            {/* Debug helper: tiny magenta plane showing sparkle anchor (dev only) */}
            <mesh position={center} visible={false}>
                <planeGeometry args={[0.05, 0.05]} />
                <meshBasicMaterial color="magenta" />
            </mesh>
        </>
    );
}
