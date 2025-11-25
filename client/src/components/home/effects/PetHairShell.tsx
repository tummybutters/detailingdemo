// @ts-nocheck
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

// Pet hair shell that wraps existing floor geometry using the hair texture as alpha
export function PetHairShell({ state, nodes = [], texturePath = '/pet_hair.png' }) {
    const hairMap = useTexture(texturePath);
    const fadeRef = useRef(0);
    const matRefs = useRef([]);

    useMemo(() => {
        if (!hairMap) return;
        hairMap.wrapS = hairMap.wrapT = THREE.RepeatWrapping;
        hairMap.repeat.set(2, 2); // tile slightly for variation
        hairMap.minFilter = THREE.LinearMipMapLinearFilter;
        hairMap.magFilter = THREE.LinearFilter;
        hairMap.needsUpdate = true;
    }, [hairMap]);

    useFrame((_, delta) => {
        const target = state === 'dirty' ? 1 : 0;
        const speed = state === 'dirty' ? 6.0 : 2.5;
        fadeRef.current = THREE.MathUtils.lerp(fadeRef.current, target, 1 - Math.exp(-speed * delta));
        matRefs.current.forEach((mat) => {
            if (!mat) return;
            mat.opacity = fadeRef.current;
            mat.visible = mat.opacity > 0.01;
        });
    });

    if (!nodes || nodes.length === 0) return null;

    return (
        <group renderOrder={12}>
            {nodes.map((node, i) => (
                <mesh
                    key={i}
                    geometry={node.geometry}
                    position={node.position}
                    rotation={node.rotation}
                    scale={node.scale}
                    castShadow={false}
                    receiveShadow={false}
                >
                    <meshStandardMaterial
                        color="#d8c6a4"
                        map={hairMap}
                        alphaMap={hairMap}
                        transparent
                        opacity={0}
                        roughness={0.9}
                        metalness={0.0}
                        depthWrite={false}
                        side={THREE.DoubleSide}
                        polygonOffset
                        polygonOffsetFactor={-1}
                        blending={THREE.NormalBlending}
                        ref={(ref) => { matRefs.current[i] = ref; }}
                    />
                </mesh>
            ))}
        </group>
    );
}
