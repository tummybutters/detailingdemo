// @ts-nocheck
import { useEffect } from 'react';

// --- Debug Helper ---
export function ModelDebugger({ scene }) {
    useEffect(() => {
        // console.log("--- MODEL NODE STRUCTURE ---");
        scene.traverse((node) => {
            if (node.isMesh || node.isGroup) {
                // console.log(`Name: "${node.name}"`);
            }
        });
        // console.log("---------------------------");
    }, [scene]);
    return null;
}
