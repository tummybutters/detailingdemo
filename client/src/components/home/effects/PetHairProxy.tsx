// @ts-nocheck
import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

// Pet hair proxy plane positioned over the floor area
export function PetHairProxy({
    trigger = 0,
    texturePath = '/dog_hair_texture.png',
    position = [0, 0.35, -0.2],
    size = [3.0, 3.0],
    rotation = [-Math.PI / 2, 0, 0]
}) {
    const hairMap = useTexture(texturePath);
    const opacityRef = useRef(0);
    const holdRef = useRef(0);
    const fadeRef = useRef(0);
    const meshRef1 = useRef();
    const meshRef2 = useRef();
    const meshRef3 = useRef();
    const HOLD_DURATION = 0.5;
    const FADE_DURATION = 2.5;

    useMemo(() => {
        if (!hairMap) return;
        hairMap.wrapS = hairMap.wrapT = THREE.RepeatWrapping;
        hairMap.repeat.set(6, 6); // More dense tiling for better visibility
        hairMap.minFilter = THREE.LinearFilter;
        hairMap.magFilter = THREE.LinearFilter;
        hairMap.needsUpdate = true;
    }, [hairMap]);

    useEffect(() => {
        if (!trigger) return;
        holdRef.current = HOLD_DURATION;
        fadeRef.current = FADE_DURATION;
        opacityRef.current = 1;
    }, [trigger]);

    useFrame((_, delta) => {
        if (holdRef.current > 0) {
            holdRef.current = Math.max(0, holdRef.current - delta);
            opacityRef.current = 1;
        } else if (fadeRef.current > 0) {
            fadeRef.current = Math.max(0, fadeRef.current - delta);
            opacityRef.current = fadeRef.current / FADE_DURATION;
        } else {
            opacityRef.current = 0;
        }

        const opacity = opacityRef.current;

        const setMaterial = (meshRef) => {
            if (!meshRef.current?.material) return;
            meshRef.current.material.opacity = opacity;
            meshRef.current.material.visible = opacity > 0.01;
        };

        setMaterial(meshRef1);
        setMaterial(meshRef2);
        setMaterial(meshRef3);
    });

    return (
        <group renderOrder={100}>
            {/* First Layer */}
            <mesh
                ref={meshRef1}
                position={position}
                rotation={rotation}
                castShadow={false}
                receiveShadow={false}
                frustumCulled={false}
            >
                <planeGeometry args={size} />
                <meshStandardMaterial
                    map={hairMap}
                    alphaMap={hairMap}
                    transparent
                    opacity={0}
                    roughness={1.0}
                    metalness={0}
                    depthWrite={false}
                    depthTest
                    side={THREE.DoubleSide}
                    polygonOffset
                    polygonOffsetFactor={-2}
                />
            </mesh>

            {/* Second Layer - Rotated 90 degrees for density */}
            <mesh
                ref={meshRef2}
                position={[position[0], position[1] + 0.005, position[2]]}
                rotation={[rotation[0], rotation[1], rotation[2] + Math.PI / 2]}
                castShadow={false}
                receiveShadow={false}
                frustumCulled={false}
            >
                <planeGeometry args={size} />
                <meshStandardMaterial
                    map={hairMap}
                    alphaMap={hairMap}
                    transparent
                    opacity={0}
                    roughness={1.0}
                    metalness={0}
                    depthWrite={false}
                    depthTest
                    side={THREE.DoubleSide}
                    polygonOffset
                    polygonOffsetFactor={-2}
                />
            </mesh>

            {/* Third Layer - Rotated 45 degrees for even more density */}
            <mesh
                ref={meshRef3}
                position={[position[0], position[1] + 0.01, position[2]]}
                rotation={[rotation[0], rotation[1], rotation[2] + Math.PI / 4]}
                castShadow={false}
                receiveShadow={false}
                frustumCulled={false}
            >
                <planeGeometry args={size} />
                <meshStandardMaterial
                    map={hairMap}
                    alphaMap={hairMap}
                    transparent
                    opacity={0}
                    roughness={1.0}
                    metalness={0}
                    depthWrite={false}
                    depthTest
                    side={THREE.DoubleSide}
                    polygonOffset
                    polygonOffsetFactor={-2}
                />
            </mesh>
        </group>
    );
}
