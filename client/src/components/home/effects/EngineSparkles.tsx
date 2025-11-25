// @ts-nocheck
import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// --- Engine Sparkles (GPU fairy dust points) ---
// Shaders for the "fairy dust" sparkle field
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

// --- Engine Sparkles (high-density, twinkling fairy dust) ---
export function EngineSparkles({
    center,
    size,
    trigger = 0,
    count = 624,
    depthTest = true,
    renderOrder = 12,
    viewOffset = 0,
    introDelay = 0.4,
    holdDuration = 0.5,
    fadeDuration = 2.1
}) {
    const pointsRef = useRef();
    const geometryRef = useRef();
    const materialRef = useRef();
    const delayRef = useRef(0);
    const holdRef = useRef(0);
    const fadeRef = useRef(0);
    const { gl } = useThree();
    const tmpViewOffset = useMemo(() => new THREE.Vector3(), []);

    // Precompute static positions and per-point phase offsets
    const positions = useMemo(() => {
        const arr = new Float32Array(count * 3);
        const sx = size?.x ?? 1;
        const sy = size?.y ?? 1;
        const sz = size?.z ?? 1;
        for (let i = 0; i < count; i++) {
            const i3 = i * 3;
            arr[i3 + 0] = (Math.random() - 0.5) * sx * 0.9;
            arr[i3 + 1] = (Math.random() - 0.15) * sy * 0.7; // slight bias upward in the bay
            arr[i3 + 2] = (Math.random() - 0.5) * sz * 0.9;
        }
        return arr;
    }, [count, size?.x, size?.y, size?.z]);

    const randoms = useMemo(
        () => Float32Array.from({ length: count }, () => Math.random()),
        [count]
    );

    // Stable uniforms so the material isn't recreated
    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uFade: { value: 0 },
        uBaseSize: { value: 2.4 },
        uPixelRatio: { value: Math.min(2, gl.getPixelRatio()) },
        uColorA: { value: new THREE.Color('#ffe9b0') }, // gold core
        uColorB: { value: new THREE.Color('#ffcd6b') }  // deeper gold edge
    }), [gl]);

    useEffect(() => {
        if (!geometryRef.current) return;
        geometryRef.current.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometryRef.current.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 1));
        geometryRef.current.computeBoundingSphere();
    }, [positions, randoms]);

    useEffect(() => {
        if (!trigger) return;
        delayRef.current = introDelay;
        holdRef.current = holdDuration;
        fadeRef.current = fadeDuration;
    }, [trigger, introDelay, holdDuration, fadeDuration]);

    useFrame((state, delta) => {
        const mat = materialRef.current;
        if (!mat) return;

        let intensity = 0;
        if (delayRef.current > 0) {
            delayRef.current = Math.max(0, delayRef.current - delta);
        } else if (holdRef.current > 0) {
            holdRef.current = Math.max(0, holdRef.current - delta);
            intensity = 1;
        } else if (fadeRef.current > 0) {
            intensity = fadeRef.current / fadeDuration;
            fadeRef.current = Math.max(0, fadeRef.current - delta);
        }

        mat.uniforms.uFade.value = intensity;
        mat.uniforms.uTime.value = state.clock.elapsedTime;

        // Nudge sparkles toward the camera to sit above surfaces when requested
        if (pointsRef.current && center) {
            if (viewOffset > 0) {
                tmpViewOffset.copy(state.camera.position).sub(center).normalize().multiplyScalar(viewOffset);
                pointsRef.current.position.copy(center).add(tmpViewOffset);
            } else {
                pointsRef.current.position.copy(center);
            }
        }
    });

    if (!center || !size) return null;

    return (
        <points
            ref={pointsRef}
            frustumCulled={false}
            renderOrder={renderOrder}
        >
            <bufferGeometry ref={geometryRef} />
            <shaderMaterial
                ref={materialRef}
                vertexShader={sparkleVertexShader}
                fragmentShader={sparkleFragmentShader}
                uniforms={uniforms}
                transparent
                depthWrite={false}
                depthTest={depthTest}
                blending={THREE.AdditiveBlending}
                toneMapped={false}
            />
        </points>
    );
}
