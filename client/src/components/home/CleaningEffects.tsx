// @ts-nocheck
import React, { useRef, useMemo, useEffect, useImperativeHandle, forwardRef } from 'react';
import { useFrame, useThree, createPortal } from '@react-three/fiber';
import * as THREE from 'three';
import { useTexture } from '@react-three/drei';

// --- Dirt Shell Component ---
// Renders a transparent "dirt" layer over the existing geometry
export function DirtShell({ nodes, opacity = 1, opacityRef, color = '#3e2b22', texturePath = '/dirt_mask.png', textureRepeat = null, usePlanar = false }) {
    const originalTexture = useTexture(texturePath);
    const texture = useMemo(() => {
        const t = originalTexture.clone();
        t.colorSpace = THREE.SRGBColorSpace;
        t.anisotropy = 8;
        if (textureRepeat) {
            t.wrapS = t.wrapT = THREE.RepeatWrapping;
            t.repeat.set(textureRepeat[0], textureRepeat[1]);
        } else {
            t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping;
        }
        t.needsUpdate = true;
        return t;
    }, [originalTexture, textureRepeat]);

    const materialRefs = useRef([]);
    const meshRefs = useRef([]);

    // Custom Shader for Planar Projection (Side View / YZ Plane)
    const planarShader = useMemo(() => ({
        uniforms: {
            uMap: { value: texture },
            uColor: { value: new THREE.Color(color) },
            uOpacity: { value: opacity },
            uScale: { value: new THREE.Vector2(3.5, 3.5) } // Scale to fit door size
        },
        vertexShader: `
            varying vec2 vUv;
            uniform vec2 uScale;
            void main() {
                // Project UVs from local Position (YZ plane for side door)
                vUv = position.zy * uScale; 
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,
        fragmentShader: `
            uniform sampler2D uMap;
            uniform vec3 uColor;
            uniform float uOpacity;
            varying vec2 vUv;
            void main() {
                vec4 tex = texture2D(uMap, vUv);
                // Invert: Black spots (0.0) become visible (1.0), White bg (1.0) becomes transparent (0.0)
                float mask = 1.0 - tex.r; 
                float alpha = mask * uOpacity;
                if (alpha < 0.01) discard;
                gl_FragColor = vec4(uColor, alpha);
            }
        `
    }), [texture, color, opacity]);

    useFrame(() => {
        const next = opacityRef ? opacityRef.current ?? 0 : opacity;

        // Keep shell meshes glued to their source transforms every frame
        nodes.forEach((node, i) => {
            const shell = meshRefs.current[i];
            if (!shell || !node) return;
            node.updateWorldMatrix(true, false);
            shell.matrixAutoUpdate = false;
            shell.matrix.copy(node.matrix);
            shell.matrixWorldNeedsUpdate = true;
        });

        materialRefs.current.forEach((mat) => {
            if (!mat) return;
            // Update uniforms for shader material
            if (mat.uniforms) {
                mat.uniforms.uOpacity.value = next;
                mat.uniforms.uMap.value = texture; // Ensure texture is current
            } else {
                // Standard material fallback
                mat.opacity = next;
                mat.visible = next > 0.001;
            }
            mat.transparent = true;
        });
    });

    return (
        <group>
            {nodes.map((node, i) => (
                <mesh
                    key={i}
                    ref={(ref) => { meshRefs.current[i] = ref; }}
                    geometry={node.geometry}
                    renderOrder={20}
                    frustumCulled={false}
                >
                    {usePlanar ? (
                        <shaderMaterial
                            ref={(ref) => { materialRefs.current[i] = ref; }}
                            uniforms={planarShader.uniforms}
                            vertexShader={planarShader.vertexShader}
                            fragmentShader={planarShader.fragmentShader}
                            transparent
                            depthWrite={false}
                            depthTest={false}
                            side={THREE.DoubleSide}
                            polygonOffset
                            polygonOffsetFactor={-2}
                        />
                    ) : (
                        <meshStandardMaterial
                            ref={(ref) => { materialRefs.current[i] = ref; }}
                            color={color}
                            map={texture}
                            alphaMap={texture}
                            transparent
                            opacity={opacityRef ? opacityRef.current : opacity}
                            roughness={1.0}
                            metalness={0.0}
                            depthWrite={false}
                            depthTest={false}
                            side={THREE.DoubleSide}
                            polygonOffset
                            polygonOffsetFactor={-2}
                        />
                    )}
                </mesh>
            ))}
        </group>
    );
}

// --- Foam Shell Component (Animated) ---
// Replaced by foam splat accumulator below

// --- Foam Cannon Component (GPU Instanced) ---
export function FoamParticles({ active, rinsing, doorMeshes = [], onHit, count = 500, enableHitDetection = true }) {
    const meshRef = useRef();
    const nozzleRef = useRef();
    const nozzleAlpha = useRef(0);
    const liveCountRef = useRef(0);
    const dummy = useMemo(() => new THREE.Object3D(), []);
    const spawnIndex = useRef(0);
    const raycaster = useMemo(() => new THREE.Raycaster(), []);
    const spawnPerFrame = useMemo(() => Math.max(4, Math.floor(count / 42)), [count]);

    // World-space references for aiming/hit placement
    const cannonOrigin = useMemo(() => new THREE.Vector3(-2.5, 1.05, 0.52), []);
    const maxTravel = 3.5; // clamp spray travel so it doesn't fly off into the ether
    const fallbackTarget = useMemo(() => new THREE.Vector3(-0.83, 0.95, 0.67), []);
    const doorBox = useMemo(() => new THREE.Box3(), []);
    const doorExpanded = useMemo(() => new THREE.Box3(), []);
    const doorCenter = useMemo(() => new THREE.Vector3(), []);
    const doorSize = useMemo(() => new THREE.Vector3(), []);
    const tmpTarget = useMemo(() => new THREE.Vector3(), []);
    const tmpDir = useMemo(() => new THREE.Vector3(), []);
    const tmpDelta = useMemo(() => new THREE.Vector3(), []);
    const tmpNormal = useMemo(() => new THREE.Vector3(1, 0, 0), []);
    const jitter = useMemo(() => new THREE.Vector3(), []);

    // Per-instance state kept off the React graph for speed
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

    // Initialize all matrices to "invisible"
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

        // Smooth nozzle fade
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

        // Update a live bounding box of the right door in world space (so Float/animations are respected)
        if (doorMeshes.length > 0) {
            doorBox.makeEmpty();
            doorMeshes.forEach((m) => {
                m.updateWorldMatrix(true, false);
                doorBox.expandByObject(m);
            });
            doorBox.getCenter(doorCenter);
            doorBox.getSize(doorSize);
            if (enableHitDetection) {
                doorExpanded.copy(doorBox).expandByScalar(0.12);
            }
        } else {
            doorBox.makeEmpty();
        }

        // Keep the visible nozzle aimed at the current door center (or fallback target)
        if (nozzleRef.current) {
            nozzleRef.current.lookAt(doorBox.isEmpty() ? fallbackTarget : doorCenter);
        }

        // Spawn burst while active
        if (active) {
            for (let s = 0; s < spawnPerFrame; s++) {
                const i = spawnIndex.current % count;
                const p = particles[i];

                p.position.copy(cannonOrigin);
                p.position.x += (Math.random() - 0.5) * 0.12;
                p.position.y += (Math.random() - 0.5) * 0.08;
                p.position.z += (Math.random() - 0.5) * 0.18;

                // Aim across the entire door area using its live bounds
                if (!doorBox.isEmpty()) {
                    tmpTarget.copy(doorCenter);
                    tmpTarget.y += (Math.random() - 0.5) * doorSize.y * 0.9;
                    tmpTarget.z += (Math.random() - 0.5) * doorSize.z * 0.95;
                } else {
                    tmpTarget.copy(fallbackTarget);
                    tmpTarget.y += (Math.random() - 0.5) * 0.35;
                    tmpTarget.z += (Math.random() - 0.5) * 0.65;
                }

                jitter.set(
                    (Math.random() - 0.5) * 0.08,
                    (Math.random() - 0.5) * 0.06,
                    (Math.random() - 0.5) * 0.08
                );
                const dir = tmpDir.copy(tmpTarget).sub(cannonOrigin).add(jitter).normalize();
                const speed = rinsing ? 4.5 + Math.random() * 1.5 : 6.5 + Math.random() * 2.0;

                p.velocity.copy(dir).multiplyScalar(speed);
                p.velocity.y += Math.random() * 0.4; // slight upward push

                p.life = rinsing ? 1.5 + Math.random() * 0.5 : 2.0 + Math.random() * 0.8;
                p.maxLife = p.life;
                p.size = rinsing ? 0.12 + Math.random() * 0.08 : 0.16 + Math.random() * 0.08;

                spawnIndex.current++;
            }
        }

        let liveCount = 0;
        for (let i = 0; i < count; i++) {
            const p = particles[i];

            if (p.life > 0) {
                p.life -= delta;

                p.prev.copy(p.position);

                if (rinsing) {
                    p.velocity.y -= 9 * delta; // gravity for rinsing
                    p.velocity.multiplyScalar(0.992);
                } else {
                    p.velocity.y += 0.4 * delta; // keep foam buoyant
                    p.velocity.multiplyScalar(0.995);
                }

                p.position.addScaledVector(p.velocity, delta);

                if (
                    p.position.distanceToSquared(cannonOrigin) > maxTravel * maxTravel ||
                    (!doorBox.isEmpty() && p.position.x > doorBox.max.x + 0.3)
                ) {
                    p.life = 0;
                }

                // Kill particles that fly past the car envelope
                // Broad-phase bounds check then precise raycast to the actual door meshes
                if (enableHitDetection && !doorBox.isEmpty() && onHit) {
                    const maxY = Math.max(p.prev.y, p.position.y);
                    const minY = Math.min(p.prev.y, p.position.y);
                    const maxZ = Math.max(p.prev.z, p.position.z);
                    const minZ = Math.min(p.prev.z, p.position.z);
                    const crossesX =
                        (p.prev.x <= doorExpanded.max.x && p.position.x >= doorExpanded.min.x) ||
                        (p.position.x <= doorExpanded.max.x && p.prev.x >= doorExpanded.min.x);
                    const crossesY = maxY >= doorExpanded.min.y && minY <= doorExpanded.max.y;
                    const crossesZ = maxZ >= doorExpanded.min.z && minZ <= doorExpanded.max.z;

                    if (crossesX && crossesY && crossesZ) {
                        tmpDelta.copy(p.position).sub(p.prev);
                        const segLength = tmpDelta.length();
                        if (segLength > 0.0001) {
                            raycaster.set(p.prev, tmpDelta.normalize());
                            raycaster.far = segLength;
                            const hits = raycaster.intersectObjects(doorMeshes, true);
                            if (hits.length) {
                                const hit = hits[0];
                                if (hit.face && hit.object) {
                                    tmpNormal.copy(hit.face.normal).transformDirection(hit.object.matrixWorld).normalize();
                                } else {
                                    tmpNormal.set(-1, 0, 0);
                                }
                                onHit(hit.point, tmpNormal);
                                p.position.copy(hit.point);
                                p.life = 0; // Stop particle after sticking
                            }
                        }
                    }
                }

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
                <sphereGeometry args={[0.08, 12, 12]} />
                <meshStandardMaterial
                    color="#e8f4ff"
                    emissive="#9fd6ff"
                    emissiveIntensity={1.0}
                    roughness={0.35}
                    metalness={0}
                    transparent
                    opacity={0.95}
                    depthWrite={false}
                    toneMapped={false}
                />
            </instancedMesh>
        </group>
    );
}

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

// --- Headlight Front Sparkles (dense, compact oval in front of the lamp) ---
export function HeadlightFrontSparkles({
    center,
    size,
    nodes = [],
    count = 360,
    offset = 0.08,
    renderOrder = 15,
    fixedCenter = null,
    forward = new THREE.Vector3(0, 0, 1),
    yNudge = 0.04,
    zNudge = -0.05,
    xNudge = 0,
    trigger = 0
}) {
    const pointsRef = useRef();
    const geometryRef = useRef();
    const materialRef = useRef();
    const opacityRef = useRef(0);
    const remainingRef = useRef(0);
    const holdRef = useRef(0);
    const { gl } = useThree();
    const tmpVec = useMemo(() => new THREE.Vector3(), []);

    // Compact oval distribution
    const positions = useMemo(() => {
        const arr = new Float32Array(count * 3);
        const sx = (size?.x ?? 0.6) * 0.25;
        const sy = (size?.y ?? 0.2) * 0.25;
        const sz = (size?.z ?? 0.2) * 0.08;
        for (let i = 0; i < count; i++) {
            const theta = Math.random() * Math.PI * 2;
            const r = Math.sqrt(Math.random());
            const x = Math.cos(theta) * r * sx;
            const y = Math.sin(theta) * r * sy * 0.75; // Slightly flatter vertically
            const z = (Math.random() - 0.5) * sz;
            const i3 = i * 3;
            arr[i3 + 0] = x;
            arr[i3 + 1] = y;
            arr[i3 + 2] = z;
        }
        return arr;
    }, [count, size?.x, size?.y, size?.z]);

    const randoms = useMemo(
        () => Float32Array.from({ length: count }, () => Math.random()),
        [count]
    );

    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uFade: { value: 0 },
        uBaseSize: { value: 1.5 }, // small points
        uPixelRatio: { value: Math.min(2, gl.getPixelRatio()) },
        uColorA: { value: new THREE.Color('#fff8e1') },
        uColorB: { value: new THREE.Color('#ffd87a') }
    }), [gl]);

    useEffect(() => {
        if (!geometryRef.current) return;
        geometryRef.current.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometryRef.current.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 1));
    }, [positions, randoms]);

    const tmpBox = useMemo(() => new THREE.Box3(), []);
    const tmpCenter = useMemo(() => new THREE.Vector3(), []);
    const totalDuration = 3.0;
    const introDelay = 0.4;
    const holdDuration = 0.5;
    const fadeDuration = Math.max(0.1, totalDuration - introDelay - holdDuration);
    const delayRef = useRef(0);

    useEffect(() => {
        if (!trigger) return;
        remainingRef.current = fadeDuration;
        holdRef.current = holdDuration;
        delayRef.current = introDelay;
        opacityRef.current = 1;
    }, [fadeDuration, holdDuration, introDelay, trigger]);

    useFrame((state, delta) => {
        const mat = materialRef.current;
        if (!mat) return;

        if (delayRef.current > 0) {
            delayRef.current = Math.max(0, delayRef.current - delta);
            opacityRef.current = 0;
        } else if (holdRef.current > 0) {
            holdRef.current = Math.max(0, holdRef.current - delta);
            opacityRef.current = 1;
        } else if (remainingRef.current > 0) {
            opacityRef.current = remainingRef.current / fadeDuration;
            remainingRef.current = Math.max(0, remainingRef.current - delta);
        } else {
            opacityRef.current = 0;
        }

        mat.uniforms.uFade.value = opacityRef.current;
        mat.uniforms.uTime.value = state.clock.elapsedTime;

        let liveCenter = fixedCenter || center;

        // Recompute live center from headlight nodes so float/animations are respected
        if (!liveCenter && nodes && nodes.length > 0) {
            tmpBox.makeEmpty();
            nodes.forEach((n) => {
                n.updateWorldMatrix(true, false);
                tmpBox.expandByObject(n);
            });
            if (!tmpBox.isEmpty()) {
                liveCenter = tmpBox.getCenter(tmpCenter);
            }
        }

        if (pointsRef.current && liveCenter) {
            // Nudge downward slightly and forward in car space (not toward camera) to sit on the headlight
            const baseCenter = tmpCenter.copy(liveCenter);
            baseCenter.y += yNudge;
            baseCenter.z += zNudge;
            baseCenter.x += xNudge;

            tmpVec.copy(forward).normalize().multiplyScalar(offset);
            pointsRef.current.position.copy(baseCenter).add(tmpVec);
            pointsRef.current.lookAt(baseCenter.clone().add(forward));

        }
    });

    if (!center && (!nodes || nodes.length === 0)) return null;

    return (
        <>
            <points ref={pointsRef} renderOrder={renderOrder} frustumCulled={false}>
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
            {/* Debug helper: tiny magenta plane showing sparkle anchor (dev only) */}
            <mesh position={center} visible={false}>
                <planeGeometry args={[0.05, 0.05]} />
                <meshBasicMaterial color="magenta" />
            </mesh>
        </>
    );
}

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

// Pet hair proxy plane positioned over the floor area
// Pet hair proxy plane positioned over the floor area
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
