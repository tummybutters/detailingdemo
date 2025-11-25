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

// --- Pet Hair Sparkles above proxy floor ---
export function PetHairSparkles({
    trigger = 0,
    position = new THREE.Vector3(0, 0.05, -0.8),
    size = new THREE.Vector3(2.2, 0.001, 1.6),
    count = 420,
    holdDuration = 0.5,
    fadeDuration = 2.5
}) {
    const pointsRef = useRef();
    const geometryRef = useRef();
    const materialRef = useRef();
    const delayRef = useRef(0);
    const holdRef = useRef(0);
    const fadeRef = useRef(0);
    const { gl } = useThree();

    const positions = useMemo(() => {
        const arr = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            const i3 = i * 3;
            arr[i3 + 0] = (Math.random() - 0.5) * (size.x ?? 2);
            arr[i3 + 1] = (Math.random() * 0.08); // slight vertical jitter
            arr[i3 + 2] = (Math.random() - 0.5) * (size.z ?? 1);
        }
        return arr;
    }, [count, size.x, size.z]);

    const randoms = useMemo(
        () => Float32Array.from({ length: count }, () => Math.random()),
        [count]
    );

    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uFade: { value: 0 },
        uBaseSize: { value: 3.0 },
        uPixelRatio: { value: Math.min(2, gl.getPixelRatio()) },
        uColorA: { value: new THREE.Color('#fff8e1') },
        uColorB: { value: new THREE.Color('#ffd87a') }
    }), [gl]);

    useEffect(() => {
        if (!geometryRef.current) return;
        geometryRef.current.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometryRef.current.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 1));
    }, [positions, randoms]);

    useEffect(() => {
        if (!trigger) return;
        delayRef.current = 0.2;
        holdRef.current = holdDuration;
        fadeRef.current = fadeDuration;
    }, [trigger, holdDuration, fadeDuration]);

    useFrame((state, delta) => {
        const mat = materialRef.current;
        if (!mat) return;

        let opacity = 0;
        if (delayRef.current > 0) {
            delayRef.current = Math.max(0, delayRef.current - delta);
        } else if (holdRef.current > 0) {
            holdRef.current = Math.max(0, holdRef.current - delta);
            opacity = 1;
        } else if (fadeRef.current > 0) {
            opacity = fadeRef.current / fadeDuration;
            fadeRef.current = Math.max(0, fadeRef.current - delta);
        }

        mat.uniforms.uFade.value = opacity;
        mat.uniforms.uTime.value = state.clock.elapsedTime;

        if (pointsRef.current && position) {
            pointsRef.current.position.set(position.x, position.y, position.z);
        }
    });

    if (!position) return null;

    return (
        <points ref={pointsRef} frustumCulled={false} renderOrder={20}>
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
    );
}
