// @ts-nocheck
import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// --- Water Rinse Particles (visual only, no sticking) ---
export function WaterParticles({ active, doorMeshes = [], count = 280 }) {
    const meshRef = useRef();
    const nozzleRef = useRef();
    const nozzleAlpha = useRef(0);
    const liveCountRef = useRef(0);
    const dummy = useMemo(() => new THREE.Object3D(), []);
    const spawnIndex = useRef(0);
    const spawnPerFrame = useMemo(() => Math.max(5, Math.floor(count / 24)), [count]);

    const cannonOrigin = useMemo(() => new THREE.Vector3(-2.5, 1.05, 0.52), []);
    const fallbackTarget = useMemo(() => new THREE.Vector3(-0.83, 0.95, 0.67), []);
    const doorBox = useMemo(() => new THREE.Box3(), []);
    const doorCenter = useMemo(() => new THREE.Vector3(), []);
    const doorSize = useMemo(() => new THREE.Vector3(), []);
    const tmpTarget = useMemo(() => new THREE.Vector3(), []);
    const tmpDir = useMemo(() => new THREE.Vector3(), []);
    const jitter = useMemo(() => new THREE.Vector3(), []);

    const particles = useMemo(() => {
        return Array.from({ length: count }, () => ({
            position: new THREE.Vector3(),
            prev: new THREE.Vector3(),
            velocity: new THREE.Vector3(),
            life: 0,
            maxLife: 0,
            size: 0
        }));
    }, [count]);

    useEffect(() => {
        if (!meshRef.current) return;
        for (let i = 0; i < count; i++) {
            dummy.scale.setScalar(0);
            dummy.updateMatrix();
            meshRef.current.setMatrixAt(i, dummy.matrix);
        }
        meshRef.current.count = count;
        meshRef.current.instanceMatrix.needsUpdate = true;
    }, [count, dummy]);

    useFrame((_, delta) => {
        const mesh = meshRef.current;
        if (!mesh) return;

        // Fade nozzle visibility like foam gun
        const targetAlpha = active ? 1 : 0;
        nozzleAlpha.current = THREE.MathUtils.lerp(nozzleAlpha.current, targetAlpha, 1 - Math.exp(-8 * delta));
        if (nozzleRef.current) {
            nozzleRef.current.visible = nozzleAlpha.current > 0.02;
            nozzleRef.current.traverse((child) => {
                if (child.isMesh && child.material) {
                    child.material.transparent = true;
                    child.material.opacity = nozzleAlpha.current;
                    child.material.needsUpdate = true;
                }
            });
        }

        const shouldSimulate = active || liveCountRef.current > 0;
        if (!shouldSimulate) return;

        if (doorMeshes.length > 0) {
            doorBox.makeEmpty();
            doorMeshes.forEach((m) => {
                m.updateWorldMatrix(true, false);
                doorBox.expandByObject(m);
            });
            doorBox.getCenter(doorCenter);
            doorBox.getSize(doorSize);
        } else {
            doorBox.makeEmpty();
        }

        if (nozzleRef.current) {
            nozzleRef.current.lookAt(doorBox.isEmpty() ? fallbackTarget : doorCenter);
        }

        if (active) {
            for (let s = 0; s < spawnPerFrame; s++) {
                const i = spawnIndex.current % count;
                const p = particles[i];

                p.position.copy(cannonOrigin);
                p.position.x += (Math.random() - 0.5) * 0.08;
                p.position.y += (Math.random() - 0.5) * 0.06;
                p.position.z += (Math.random() - 0.5) * 0.14;

                if (!doorBox.isEmpty()) {
                    tmpTarget.copy(doorCenter);
                    tmpTarget.y += (Math.random() - 0.5) * doorSize.y * 0.8;
                    tmpTarget.z += (Math.random() - 0.5) * doorSize.z * 0.9;
                } else {
                    tmpTarget.copy(fallbackTarget);
                    tmpTarget.y += (Math.random() - 0.5) * 0.3;
                    tmpTarget.z += (Math.random() - 0.5) * 0.55;
                }

                jitter.set(
                    (Math.random() - 0.5) * 0.08,
                    (Math.random() - 0.5) * 0.04,
                    (Math.random() - 0.5) * 0.08
                );
                const dir = tmpDir.copy(tmpTarget).sub(cannonOrigin).add(jitter).normalize();
                const speed = 6.5 + Math.random() * 1.8;

                p.velocity.copy(dir).multiplyScalar(speed);
                p.velocity.y -= Math.random() * 0.2;

                p.life = 1.2 + Math.random() * 0.5;
                p.maxLife = p.life;
                p.size = 0.12 + Math.random() * 0.05;

                spawnIndex.current++;
            }
        }

        let liveCount = 0;
        for (let i = 0; i < count; i++) {
            const p = particles[i];

            if (p.life > 0) {
                p.life -= delta;
                p.prev.copy(p.position);
                p.velocity.y -= 9 * delta;
                p.velocity.multiplyScalar(0.994);
                p.position.addScaledVector(p.velocity, delta);

                dummy.position.copy(p.position);
                const fade = Math.max(0, p.life / (p.maxLife || 1));
                dummy.scale.setScalar(p.size * fade);
                liveCount++;
            } else {
                dummy.scale.setScalar(0);
            }

            dummy.updateMatrix();
            mesh.setMatrixAt(i, dummy.matrix);
        }

        liveCountRef.current = liveCount;
        mesh.instanceMatrix.needsUpdate = true;
    });

    return (
        <group>
            <group ref={nozzleRef} position={cannonOrigin.toArray()}>
                {/* Gun body */}
                <mesh rotation={[-Math.PI / 2, 0, 0]}>
                    <cylinderGeometry args={[0.035, 0.04, 0.34, 16]} />
                    <meshStandardMaterial color="#1a1f27" metalness={0.35} roughness={0.55} transparent />
                </mesh>
                {/* Tip collar */}
                <mesh position={[0, 0, 0.18]} rotation={[-Math.PI / 2, 0, 0]}>
                    <cylinderGeometry args={[0.045, 0.048, 0.06, 12]} />
                    <meshStandardMaterial color="#2c3440" metalness={0.25} roughness={0.45} transparent />
                </mesh>
                {/* Emit nub */}
                <mesh position={[0, 0, 0.23]} rotation={[-Math.PI / 2, 0, 0]}>
                    <cylinderGeometry args={[0.018, 0.018, 0.05, 10]} />
                    <meshStandardMaterial color="#161b22" metalness={0.3} roughness={0.5} transparent />
                </mesh>
                {/* Handle */}
                <mesh position={[0, -0.08, -0.05]} rotation={[0, 0, Math.PI / 2.4]}>
                    <boxGeometry args={[0.14, 0.06, 0.04]} />
                    <meshStandardMaterial color="#11151c" roughness={0.6} metalness={0.15} transparent />
                </mesh>
                {/* Bottle (uniform, opaque) */}
                <mesh position={[0, -0.2, -0.05]} scale={[0.9, 0.9, 0.9]}>
                    <cylinderGeometry args={[0.09, 0.09, 0.22, 18]} />
                    <meshStandardMaterial color="#3a3d44" roughness={0.52} metalness={0.1} transparent />
                </mesh>
                {/* Neck connector */}
                <mesh position={[0, -0.06, -0.05]}>
                    <cylinderGeometry args={[0.06, 0.07, 0.07, 12]} />
                    <meshStandardMaterial color="#1c222c" roughness={0.45} metalness={0.3} transparent />
                </mesh>
                {/* Cap */}
                <mesh position={[0, -0.04, -0.05]}>
                    <cylinderGeometry args={[0.12, 0.12, 0.03, 16]} />
                    <meshStandardMaterial color="#0f141b" roughness={0.4} metalness={0.3} transparent />
                </mesh>
                {/* Hose (dark green) */}
                <mesh position={[0, -0.8, -0.05]} rotation={[0, 0, 0]}>
                    <cylinderGeometry args={[0.018, 0.018, 1.2, 12]} />
                    <meshStandardMaterial color="#1f3b2b" roughness={0.55} metalness={0.05} transparent />
                </mesh>
            </group>

            <instancedMesh
                ref={meshRef}
                args={[null, null, count]}
                castShadow={false}
                receiveShadow={false}
                frustumCulled={false}
            >
                <sphereGeometry args={[0.07, 10, 10]} />
                <meshStandardMaterial
                    color="#a4d7ff"
                    emissive="#6bb7ff"
                    emissiveIntensity={0.4}
                    roughness={0.25}
                    metalness={0}
                    transparent
                    opacity={0.55}
                    depthWrite={false}
                    toneMapped={false}
                />
            </instancedMesh>
        </group>
    );
}
