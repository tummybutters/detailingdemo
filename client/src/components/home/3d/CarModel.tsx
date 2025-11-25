// @ts-nocheck
import React, { useRef, useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import {
    DirtShell,
    FoamParticles,
    FoamAccumulator,
    WaterParticles,
    EngineSparkles,
    PetHairProxy,
    PetHairSparkles,
    HeadlightGlow,
    HeadlightFrontSparkles
} from '../effects';
import {
    useCarModelSetup,
    useMaterials,
    useEngineAnimation,
    useCleaningAnimation,
    useGroupAnimation
} from './hooks';
import { ModelDebugger } from './ModelDebugger';

export default function CarModel({
    activeService,
    activeAddOn,
    onPartClick,
    cleaningState,
    isMobile,
    view,
    foamCount,
    waterCount,
    foamSplatCount,
    headlightTrigger,
    engineTrigger,
    petHairTrigger
}) {
    const { scene } = useGLTF('/bmw_m4_f82_optimized.glb');


    // Use extracted hooks for setup and state management
    const {
        hoodGroup,
        leftDoorGroup,
        rightDoorGroup,
        rightDoorNodes,
        engineGroup,
        engineNodes,
        engineBounds,
        headlightNodes,
        headlightLeftNodes,
        headlightRightNodes,
        headlightLeftBounds,
        headlightRightBounds
    } = useCarModelSetup(scene);

    // Material initialization
    useMaterials(scene);

    // Animation state management
    const dirtOpacityRef = useCleaningAnimation(cleaningState);
    const engineDirtOpacityRef = useEngineAnimation(engineTrigger, activeAddOn);
    useGroupAnimation(hoodGroup, leftDoorGroup, activeAddOn, activeService, view);

    // Refs for foam accumulation
    const foamAccumRef = useRef();
    const dirtRepeat = useMemo(() => [4, 4], []);

    // Click handler for interior detection
    const handleClick = (e) => {
        e.stopPropagation();
        if (/window|glass|door/i.test(e.object.name)) {
            onPartClick('interior');
        }
    };

    return (
        <>
            <ModelDebugger scene={scene} />
            <primitive
                object={scene}
                scale={1.0}
                onPointerDown={handleClick}
            />

            {/* Pet hair proxy floor */}
            <PetHairProxy
                trigger={petHairTrigger}
                position={[0, 0.35, -0.2]}
                size={[3.0, 3.0]}
            />
            {petHairTrigger !== 0 && <PetHairSparkles trigger={petHairTrigger} />}

            {/* Dirt Shell & Foam - Attached to the Right Door Group if it exists */}
            {
                rightDoorGroup && rightDoorNodes.length > 0 && (
                    <primitive object={rightDoorGroup}>
                        <DirtShell
                            nodes={rightDoorNodes}
                            opacityRef={dirtOpacityRef}
                            color="#5c4033"
                            texturePath="/engine_dirt.png"
                            textureRepeat={dirtRepeat}
                            usePlanar={true}
                        />
                        {(cleaningState === 'foaming' || cleaningState === 'rinsing') && (
                            <FoamAccumulator
                                ref={foamAccumRef}
                                foaming={cleaningState === 'foaming'}
                                rinsing={cleaningState === 'rinsing'}
                                count={foamSplatCount}
                            />
                        )}
                    </primitive>
                )
            }

            {/* Engine Bay Dirt Overlay */}
            {
                engineGroup && engineNodes.length > 0 && (
                    <primitive object={engineGroup}>
                        <DirtShell
                            nodes={engineNodes}
                            opacityRef={engineDirtOpacityRef}
                            color="#5c4033"
                            texturePath="/engine_dirt.png"
                        />
                    </primitive>
                )
            }

            {/* Engine sparkles (world-space, avoid double transforms) */}
            {
                engineBounds && engineTrigger !== 0 && (
                    <EngineSparkles
                        center={engineBounds.center}
                        size={engineBounds.size}
                        trigger={engineTrigger}
                    />
                )
            }

            {/* Foam Cannon - World Space */}
            <FoamParticles
                active={cleaningState === 'foaming'}
                rinsing={false}
                doorMeshes={rightDoorNodes}
                onHit={!isMobile ? (point, normal) => foamAccumRef.current?.addSplat(point, normal) : undefined}
                enableHitDetection={!isMobile}
                count={foamCount}
                position={[0, 0, 0]}
            />
            <WaterParticles
                active={cleaningState === 'rinsing'}
                doorMeshes={rightDoorNodes}
                count={waterCount}
            />

            {/* Headlight overlay (warm glow) */}
            <HeadlightGlow
                nodes={headlightNodes}
                trigger={headlightTrigger}
            />
            {headlightTrigger !== 0 && (
                <>
                    <HeadlightFrontSparkles
                        nodes={headlightLeftNodes}
                        center={headlightLeftBounds?.center}
                        size={headlightLeftBounds?.size}
                        fixedCenter={new THREE.Vector3(-0.7, 0.68, 1.85)}
                        trigger={headlightTrigger}
                        forward={new THREE.Vector3(0, 0, 1)}
                        yNudge={0.04}
                        zNudge={-0.05}
                        xNudge={0}
                    />
                    <HeadlightFrontSparkles
                        nodes={headlightRightNodes}
                        center={headlightRightBounds?.center}
                        size={headlightRightBounds?.size}
                        fixedCenter={new THREE.Vector3(0.7, 0.68, 1.85)}
                        trigger={headlightTrigger}
                        forward={new THREE.Vector3(0, 0, 1)}
                        yNudge={0.04}
                        zNudge={-0.05}
                        xNudge={0}
                    />
                </>
            )}
        </>
    );
}
