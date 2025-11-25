// @ts-nocheck
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
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
