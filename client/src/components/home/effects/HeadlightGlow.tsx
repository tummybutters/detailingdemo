// @ts-nocheck
import React, { useRef, useEffect } from 'react';
import { useFrame, useThree, createPortal } from '@react-three/fiber';
import * as THREE from 'three';

// --- Headlight Glow Overlay (uses native headlight meshes, no textures) ---
export function HeadlightGlow({ nodes = [], trigger = 0 }) {
    const entriesRef = useRef([]);
    const opacityRef = useRef(0);
    const { scene } = useThree();
    const remainingRef = useRef(0);
    const holdRef = useRef(0);
    const fadeDuration = 2.5; // seconds
    const holdDuration = 0.5; // seconds
    const maxOpacity = 0.82;

    // Kick off a new flash when trigger changes
    useEffect(() => {
        if (!trigger) return;
        remainingRef.current = fadeDuration;
        holdRef.current = holdDuration;
        opacityRef.current = maxOpacity;
    }, [trigger]);

    useFrame((_, delta) => {
        if (holdRef.current > 0) {
            holdRef.current = Math.max(0, holdRef.current - delta);
            opacityRef.current = maxOpacity;
        } else if (remainingRef.current > 0) {
            // Compute opacity before consuming this frame's delta to avoid an initial pop
            opacityRef.current = maxOpacity * (remainingRef.current / fadeDuration);
            remainingRef.current = Math.max(0, remainingRef.current - delta);
        } else {
            opacityRef.current = 0;
        }

        entriesRef.current.forEach((entry) => {
            if (!entry || !entry.mesh || !entry.source || !entry.material) return;

            entry.source.updateWorldMatrix(true, false);
            entry.mesh.matrix.copy(entry.source.matrixWorld);
            entry.mesh.matrixWorldNeedsUpdate = true;
            entry.mesh.visible = opacityRef.current > 0.01;

            entry.material.opacity = opacityRef.current * 0.7; // keep body color bleeding through
            entry.material.emissiveIntensity = 0.35 + 0.45 * opacityRef.current; // mostly white with a hint of warmth
            entry.material.needsUpdate = true;
        });
    });

    if (!nodes.length || !scene) return null;

    // Portal to the scene root to avoid inheriting Float/parent transforms twice
    return createPortal(
        <group>
            {nodes.map((node, i) => (
                <mesh
                    key={node.uuid || i}
                    geometry={node.geometry}
                    matrixAutoUpdate={false}
                    ref={(mesh) => {
                        entriesRef.current[i] = mesh
                            ? {
                                mesh,
                                source: node,
                                material: mesh.material
                            }
                            : null;
                    }}
                >
                    <meshStandardMaterial
                        color="#fff8e1" // off-white base
                        emissive="#ffd87a" // subtle warm tint
                        emissiveIntensity={0}
                        transparent
                        opacity={0}
                        roughness={0.2}
                        metalness={0.15}
                        depthWrite={false}
                        side={THREE.DoubleSide}
                        polygonOffset
                        polygonOffsetFactor={-1}
                    />
                </mesh>
            ))}
        </group>,
        scene
    );
}
