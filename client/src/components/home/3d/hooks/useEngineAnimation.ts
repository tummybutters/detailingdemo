// @ts-nocheck
import { useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export function useEngineAnimation(engineTrigger, activeAddOn) {
    const engineDirtOpacityRef = useRef(0);
    const engineHoldRef = useRef(0);
    const engineFadeRef = useRef(0);
    const engineDelayRef = useRef(0);

    const ENGINE_HOLD_DURATION = 0.35;
    const ENGINE_FADE_DURATION = 1.75;
    const ENGINE_MAX_OPACITY = 0.85;
    const ENGINE_DELAY_DURATION = 0;

    useEffect(() => {
        if (!engineTrigger) return;
        engineDelayRef.current = ENGINE_DELAY_DURATION;
        engineHoldRef.current = ENGINE_HOLD_DURATION;
        engineFadeRef.current = ENGINE_FADE_DURATION;
        engineDirtOpacityRef.current = ENGINE_MAX_OPACITY;
    }, [engineTrigger]);

    useEffect(() => {
        if (activeAddOn?.name?.includes('Engine')) return;
        engineDelayRef.current = 0;
        engineHoldRef.current = 0;
        engineFadeRef.current = 0;
        engineDirtOpacityRef.current = 0;
    }, [activeAddOn]);

    useFrame((state, delta) => {
        let engineOpacity = 0;
        if (engineDelayRef.current > 0) {
            engineDelayRef.current = Math.max(0, engineDelayRef.current - delta);
        } else if (engineHoldRef.current > 0) {
            engineHoldRef.current = Math.max(0, engineHoldRef.current - delta);
            engineOpacity = ENGINE_MAX_OPACITY;
        } else if (engineFadeRef.current > 0) {
            engineFadeRef.current = Math.max(0, engineFadeRef.current - delta);
            engineOpacity = ENGINE_MAX_OPACITY * (engineFadeRef.current / ENGINE_FADE_DURATION);
        }
        engineDirtOpacityRef.current = engineOpacity;
    });

    return engineDirtOpacityRef;
}
