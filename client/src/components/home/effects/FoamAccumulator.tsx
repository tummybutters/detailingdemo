// @ts-nocheck
import React, { useRef, useMemo, useEffect, useImperativeHandle, forwardRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// --- Foam Accumulation Splat Layer (sticks to door) ---
export const FoamAccumulator = forwardRef(function FoamAccumulator({ foaming, rinsing, count = 320 }, ref) {
    const meshRef = useRef();
    const initialized = useRef(false);

    const foamAlpha = useMemo(() => {
        const size = 64;
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
        const g = ctx.createRadialGradient(size / 2, size / 2, size * 0.05, size / 2, size / 2, size * 0.48);
        g.addColorStop(0, 'rgba(255,255,255,1)');
        g.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, size, size);
        const tex = new THREE.CanvasTexture(canvas);
        tex.needsUpdate = true;
        return tex;
    }, []);
    const dummy = useMemo(() => new THREE.Object3D(), []);
    const tmpMatrix = useMemo(() => new THREE.Matrix4(), []);
    const tmpQuat = useMemo(() => new THREE.Quaternion(), []);
    const baseNormal = useMemo(() => new THREE.Vector3(0, 0, 1), []);
    const splats = useMemo(() => {
        return Array.from({ length: count }, () => ({
            position: new THREE.Vector3(),
            quaternion: new THREE.Quaternion(),
            size: 0
        }));
    }, [count]);
    const writeIndex = useRef(0);
    const globalAlpha = useRef(0);
    const rinseTimer = useRef(0);

    // Initialize all splats hidden
    useEffect(() => {
        if (!meshRef.current) return;
        meshRef.current.visible = false;
        for (let i = 0; i < count; i++) {
            dummy.scale.setScalar(0);
            dummy.updateMatrix();
            meshRef.current.setMatrixAt(i, dummy.matrix);
        }
        meshRef.current.count = count;
        meshRef.current.instanceMatrix.needsUpdate = true;
        initialized.current = true;
    }, [count, dummy]);

    useImperativeHandle(ref, () => ({
        addSplat(worldPoint, worldNormal) {
            const mesh = meshRef.current;
            if (!mesh || !mesh.parent) return;

            const parent = mesh.parent;
            const localPos = worldPoint.clone();
            parent.worldToLocal(localPos);

            const invMatrix = tmpMatrix.copy(parent.matrixWorld).invert();
            const localNormal = worldNormal.clone().transformDirection(invMatrix).normalize();

            const i = writeIndex.current % count;
            const s = splats[i];
            s.position.copy(localPos);
            s.quaternion.copy(tmpQuat.setFromUnitVectors(baseNormal, localNormal));
            s.size = 0.12 + Math.random() * 0.12;
            writeIndex.current++;
        }
    }), [baseNormal, count, splats, tmpMatrix, tmpQuat]);

    useFrame((_, delta) => {
        const mesh = meshRef.current;
        if (!mesh || !initialized.current) return;

        // Keep foam opaque until water has had time to reach the door
        if (foaming) {
            rinseTimer.current = 0;
        } else if (rinsing) {
            rinseTimer.current += delta;
        } else {
            rinseTimer.current = 0;
        }

        const holdFoam = rinsing && rinseTimer.current < 0.35;
        const target = foaming || holdFoam ? 1 : 0;
        const speed = rinsing ? 2.2 : foaming ? 6 : 1.2;
        globalAlpha.current = THREE.MathUtils.lerp(globalAlpha.current, target, 1 - Math.exp(-speed * delta));

        const shouldShow = foaming || rinsing || globalAlpha.current > 1e-3;
        if (!shouldShow) {
            mesh.visible = false;
            return;
        }
        mesh.visible = true;

        for (let i = 0; i < count; i++) {
            const s = splats[i];
            const fade = globalAlpha.current;
            // Safety check: prevent rendering artifacts at (0,0,0) if size is somehow set but position isn't
            if (fade < 1e-3 || s.size < 0.001 || s.position.lengthSq() < 0.0001) {
                dummy.scale.setScalar(0);
            } else {
                dummy.position.copy(s.position);
                dummy.quaternion.copy(s.quaternion);
                dummy.scale.setScalar(s.size * fade);
            }

            dummy.updateMatrix();
            mesh.setMatrixAt(i, dummy.matrix);
        }

        mesh.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh
            ref={meshRef}
            args={[null, null, count]}
            castShadow={false}
            receiveShadow={false}
        >
            <planeGeometry args={[1, 1]} />
            <meshStandardMaterial
                color="#f5fbff"
                emissive="#b8e6ff"
                emissiveIntensity={0.8}
                roughness={0.25}
                metalness={0}
                transparent
                opacity={0.95}
                depthWrite={false}
                toneMapped={false}
                alphaMap={foamAlpha}
                alphaTest={0.35}
                side={THREE.DoubleSide}
            />
        </instancedMesh>
    );
});
