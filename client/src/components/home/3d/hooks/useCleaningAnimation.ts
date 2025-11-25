// @ts-nocheck
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function useCleaningAnimation(cleaningState) {
    const dirtOpacityRef = useRef(0);
    const lastCleaningState = useRef(cleaningState);

    useFrame((state, delta) => {
        if (cleaningState !== lastCleaningState.current) {
            if (cleaningState === 'dirty' || cleaningState === 'foaming') {
                // Force the dirt layer fully on as soon as we enter the dirty/foam phase
                dirtOpacityRef.current = 1;
            } else if (cleaningState === 'clean') {
                dirtOpacityRef.current = 0;
            }
            lastCleaningState.current = cleaningState;
        }

        const targetDirt =
            cleaningState === 'dirty' ? 1 :
                cleaningState === 'foaming' ? 0 :
                    cleaningState === 'rinsing' ? 0 : 0;
        const dirtSpeed =
            cleaningState === 'foaming' ? 7.0 :
                cleaningState === 'rinsing' ? 8.5 :
                    4.0;
        dirtOpacityRef.current = THREE.MathUtils.lerp(dirtOpacityRef.current, targetDirt, 1 - Math.exp(-dirtSpeed * delta));
    });

    return dirtOpacityRef;
}
