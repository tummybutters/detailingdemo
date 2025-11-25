// @ts-nocheck
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function useGroupAnimation(hoodGroup, leftDoorGroup, activeAddOn, activeService, view) {
    useFrame((state, delta) => {
        const easing = 2.0 * delta; // Smoother, slower easing
        const isEngineActive = activeAddOn?.name?.includes('Engine');
        const isInteriorActive = activeService?.id === 'interior' && view !== 'home';

        // Animate Groups
        if (hoodGroup) {
            const targetX = isEngineActive ? -0.8 : 0; // Open Down wider
            hoodGroup.rotation.x = THREE.MathUtils.lerp(hoodGroup.rotation.x, targetX, easing);
        }

        if (leftDoorGroup) {
            // Open Outwards (Using -1.15 as verified in Hinge Tuner)
            const targetY = isInteriorActive ? -1.15 : 0;
            leftDoorGroup.rotation.y = THREE.MathUtils.lerp(leftDoorGroup.rotation.y, targetY, easing);
        }
    });
}
