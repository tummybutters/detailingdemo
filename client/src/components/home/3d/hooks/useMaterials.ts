// @ts-nocheck
import { useEffect, useRef } from 'react';

export function useMaterials(scene) {
    const materialsInitialized = useRef(false);

    useEffect(() => {
        if (materialsInitialized.current || !scene) return;

        scene.traverse((node) => {
            if (node.isMesh && node.material) {
                // Store original values on first run
                if (node.userData.origEnvMapIntensity === undefined) {
                    node.userData.origEnvMapIntensity = node.material.envMapIntensity || 1.0;
                }
                if (node.userData.origRoughness === undefined) {
                    node.userData.origRoughness = node.material.roughness || 0.5;
                }

                // Restore original values
                node.material.envMapIntensity = node.userData.origEnvMapIntensity;
                node.material.roughness = node.userData.origRoughness;
                node.material.needsUpdate = true;
            }
        });

        materialsInitialized.current = true;
    }, [scene]);
}
