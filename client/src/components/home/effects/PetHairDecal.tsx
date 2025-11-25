// @ts-nocheck
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

// Pet hair decal using provided texture; discards dark background so only hair shows
export function PetHairDecal({
    state,
    texturePath = '/pet_hair.png',
    position = [0, 0.05, -0.2],
    rotation = [-Math.PI / 2, 0, 0],
    size = [1.6, 1.0],
    opacity = 1.0,
    threshold = 0.08,
    renderOrder = 15
}) {
    const hairMap = useTexture(texturePath);
    const fadeRef = useRef(0);
    const meshRef = useRef();

    // Avoid mip blurring for crisp strands
    useMemo(() => {
        if (!hairMap) return;
        hairMap.wrapS = hairMap.wrapT = THREE.ClampToEdgeWrapping;
        hairMap.minFilter = THREE.LinearFilter;
        hairMap.magFilter = THREE.LinearFilter;
        hairMap.needsUpdate = true;
    }, [hairMap]);

    useFrame((_, delta) => {
        const target = state === 'dirty' ? 1 : 0;
        fadeRef.current = THREE.MathUtils.lerp(fadeRef.current, target, 1 - Math.exp(-8 * delta));
        if (meshRef.current?.material) {
            meshRef.current.material.uniforms.uFade.value = fadeRef.current * opacity;
        }
    });

    const uniforms = useMemo(() => ({
        uMap: { value: hairMap },
        uFade: { value: 0 },
        uThreshold: { value: threshold },
        uTint: { value: new THREE.Color('#e6d6b5') }
    }), [hairMap, threshold]);

    // Custom shader to treat dark background as transparent and keep hair tinted
    const vertexShader = `
        varying vec2 vUv;
        void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `;

    const fragmentShader = `
        precision highp float;
        uniform sampler2D uMap;
        uniform float uFade;
        uniform float uThreshold;
        uniform vec3 uTint;
        varying vec2 vUv;
        void main() {
            vec4 tex = texture2D(uMap, vUv);
            float luma = dot(tex.rgb, vec3(0.299, 0.587, 0.114));
            if (luma < uThreshold || uFade <= 0.001) discard;
            vec3 color = mix(tex.rgb, uTint, 0.35);
            gl_FragColor = vec4(color, uFade);
        }
    `;

    return (
        <mesh
            ref={meshRef}
            position={position}
            rotation={rotation}
            frustumCulled={false}
            renderOrder={renderOrder}
        >
            <planeGeometry args={size} />
            <shaderMaterial
                uniforms={uniforms}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                transparent
                depthWrite={false}
                depthTest={false}
            />
        </mesh>
    );
}
