// @ts-nocheck
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// --- Polishing Particles ---
export function PolishingParticles({ center }) {
    const count = 60;
    const meshRef = useRef();
    const dummy = useMemo(() => new THREE.Object3D(), []);
    const particles = useMemo(() => {
        return Array.from({ length: count }, () => ({
            position: new THREE.Vector3(),
            velocity: new THREE.Vector3(),
            life: 0,
            maxLife: 0,
            scale: 0
        }));
    }, [count]);

    useFrame((state, delta) => {
        if (!meshRef.current) return;

        particles.forEach((p, i) => {
            if (p.life <= 0) {
                // Respawn
                p.life = 0.5 + Math.random() * 0.5;
                p.maxLife = p.life;
                const theta = Math.random() * Math.PI * 2;
                const r = Math.random() * 0.3; // Radius around headlight center
                p.position.set(
                    center.x + (Math.random() - 0.5) * 0.5, // Spread across width
                    center.y + Math.sin(theta) * r,
                    center.z + Math.cos(theta) * r
                );
                p.velocity.set(
                    (Math.random() - 0.5) * 0.2,
                    (Math.random() - 0.5) * 0.2,
                    (Math.random() - 0.5) * 0.2
                );
                p.scale = 0.02 + Math.random() * 0.03;
            }

            p.life -= delta;
            p.position.addScaledVector(p.velocity, delta);

            dummy.position.copy(p.position);
            const fade = Math.sin((p.life / p.maxLife) * Math.PI);
            dummy.scale.setScalar(p.scale * fade);
            dummy.updateMatrix();
            meshRef.current.setMatrixAt(i, dummy.matrix);
        });

        meshRef.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={meshRef} args={[null, null, count]}>
            <planeGeometry args={[1, 1]} />
            <meshBasicMaterial
                color="#ffffff"
                transparent
                opacity={0.6}
                blending={THREE.AdditiveBlending}
                depthWrite={false}
            />
        </instancedMesh>
    );
}
