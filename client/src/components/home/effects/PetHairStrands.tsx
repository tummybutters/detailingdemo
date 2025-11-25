// @ts-nocheck
import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// --- Pet Hair Strands (instanced thin hairs on interior floor) ---
export function PetHairStrands({ state, count = 420 }) {
    const meshRef = useRef();
    const dummy = useMemo(() => new THREE.Object3D(), []);
    const fadeRef = useRef(0);

    // Scatter strands across a rectangular footprint on the floor
    const strands = useMemo(() => {
        const items = [];
        for (let i = 0; i < count; i++) {
            const x = (Math.random() - 0.5) * 1.2;  // width across rear footwell
            const z = -0.9 + Math.random() * 1.45; // depth covering both sides, slightly under seats
            const y = 0.05 + Math.random() * 0.03; // hover just above carpet plane
            const height = 0.06 + Math.random() * 0.08;
            const thickness = 0.0025 + Math.random() * 0.0013;
            const leanX = (Math.random() - 0.5) * 0.25;
            const leanZ = (Math.random() - 0.5) * 0.35;
            const yaw = (Math.random() - 0.5) * Math.PI;

            items.push({
                position: new THREE.Vector3(x, y, z),
                rotation: new THREE.Euler(leanX, yaw, leanZ),
                scale: new THREE.Vector3(thickness, height, thickness)
            });
        }
        return items;
    }, [count]);

    // Initialize hidden
    useEffect(() => {
        if (!meshRef.current) return;
        strands.forEach((_, i) => {
            dummy.scale.setScalar(0);
            dummy.updateMatrix();
            meshRef.current.setMatrixAt(i, dummy.matrix);
        });
        meshRef.current.instanceMatrix.needsUpdate = true;
    }, [dummy, strands]);

    useFrame((_, delta) => {
        const mesh = meshRef.current;
        if (!mesh) return;

        const target =
            state === 'dirty' ? 1 : 0;
        const speed = state === 'dirty' ? 6.0 : 2.5;
        fadeRef.current = THREE.MathUtils.lerp(fadeRef.current, target, 1 - Math.exp(-speed * delta));

        const fade = fadeRef.current;
        for (let i = 0; i < strands.length; i++) {
            const s = strands[i];
            dummy.position.copy(s.position);
            dummy.rotation.copy(s.rotation);
            dummy.scale.copy(s.scale).multiplyScalar(fade);
            dummy.updateMatrix();
            mesh.setMatrixAt(i, dummy.matrix);
        }

        mesh.visible = fade > 0.01;
        mesh.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh
            ref={meshRef}
            args={[null, null, count]}
            castShadow={false}
            receiveShadow={false}
            frustumCulled={false}
            renderOrder={2}
        >
            <cylinderGeometry args={[1, 1, 1, 5, 1]} />
            <meshStandardMaterial
                color="#e6d6b5"
                emissive="#bfae8c"
                emissiveIntensity={0.35}
                roughness={0.7}
                metalness={0.05}
                transparent
                opacity={0.95}
                depthWrite={false}
            />
        </instancedMesh>
    );
}
