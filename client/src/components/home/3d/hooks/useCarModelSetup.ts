// @ts-nocheck
import { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';

export function useCarModelSetup(scene) {
    // We store the *Pivot Groups* not the raw nodes for animation
    const [hoodGroup, setHoodGroup] = useState(null);
    const [leftDoorGroup, setLeftDoorGroup] = useState(null);
    const [rightDoorGroup, setRightDoorGroup] = useState(null);
    const [rightDoorNodes, setRightDoorNodes] = useState([]); // Store nodes for DirtShell
    const [engineGroup, setEngineGroup] = useState(null);
    const [engineNodes, setEngineNodes] = useState([]);
    const [engineBounds, setEngineBounds] = useState(null);
    const [headlightNodes, setHeadlightNodes] = useState([]);
    const [headlightLeftNodes, setHeadlightLeftNodes] = useState([]);
    const [headlightRightNodes, setHeadlightRightNodes] = useState([]);
    const [headlightLeftBounds, setHeadlightLeftBounds] = useState(null);
    const [headlightRightBounds, setHeadlightRightBounds] = useState(null);

    const isSetup = useRef(false);

    useEffect(() => {
        if (isSetup.current || !scene) return;
        isSetup.current = true;

        // Temporary collectors
        const rawHoodNodes = [];
        const rawLeftDoorNodes = [];
        const rawRightDoorNodes = [];
        const rawEngineNodes = [];
        const rawHeadlightNodes = [];
        const rawHeadlightLeft = [];
        const rawHeadlightRight = [];
        const rawFloorNodes = [];
        let engineBayGroup = null;
        const tmpCenter = new THREE.Vector3();
        const headlightNames = [];

        scene.traverse((node) => {
            if (node.isGroup && !engineBayGroup) {
                const groupName = node.name?.toLowerCase() || '';
                if (groupName.includes('enginebay')) {
                    engineBayGroup = node;
                }
            }

            if (node.isMesh) {
                node.castShadow = true;
                node.receiveShadow = true;
                const name = node.name.toLowerCase();
                const parentName = node.parent?.name.toLowerCase() || '';
                node.updateWorldMatrix(true, false);
                const worldCenter = tmpCenter;
                node.getWorldPosition(worldCenter);

                // --- HOOD DETECTION ---
                if ((name.includes('hood') || name.includes('bonnet')) &&
                    !name.includes('badge') &&
                    !name.includes('light') &&
                    !name.includes('lamp')) {
                    rawHoodNodes.push(node);
                }

                // --- ENGINE BAY DETECTION ---
                const isEngine =
                    (name.includes('enginebay') || parentName.includes('enginebay')) ||
                    ((name.includes('engine') || parentName.includes('engine')) && !name.includes('hood'));
                if (isEngine) {
                    rawEngineNodes.push(node);
                    if (!engineBayGroup && node.parent?.isObject3D) engineBayGroup = node.parent;
                }

                // --- HEADLIGHT DETECTION ---
                const isHeadlight =
                    (name.includes('headlight') || name.includes('head_light')) &&
                    !name.includes('tail') &&
                    !name.includes('rear');
                const isFrontLampGlass =
                    (name.includes('lamp') || name.includes('light')) &&
                    (name.includes('glass') || name.includes('lens')) &&
                    !name.includes('tail') &&
                    !name.includes('rear');
                if (isHeadlight || isFrontLampGlass) {
                    rawHeadlightNodes.push(node);
                    headlightNames.push(node.name);

                    // Quick left/right split based on name or position
                    const isLeft = name.includes('left') || name.includes('_l') || node.position.x > 0;
                    const isRight = name.includes('right') || name.includes('_r') || node.position.x < 0;
                    if (isLeft && !isRight) rawHeadlightLeft.push(node);
                    else if (isRight && !isLeft) rawHeadlightRight.push(node);
                    else {
                        // Fallback to world X if ambiguous
                        node.updateWorldMatrix(true, false);
                        node.getWorldPosition(tmpCenter);
                        if (tmpCenter.x >= 0) rawHeadlightLeft.push(node); else rawHeadlightRight.push(node);
                    }
                }

                // --- DOOR DETECTION ---
                const isBlocked =
                    name.includes('rear') ||
                    name.includes('back') ||
                    name.includes('quarter') ||
                    name.includes('fixed') ||
                    name.includes('headlight') ||
                    name.includes('lamp') ||
                    name.includes('fog') ||
                    name.includes('light') ||
                    name.includes('windshield') ||
                    name.includes('fender') ||
                    name.includes('bumper') ||
                    name.includes('grille') ||
                    name.includes('skirt') ||
                    name.includes('spoiler') ||
                    name.includes('logo') ||
                    name.includes('badge');

                if (!isBlocked) {
                    const isExplicitLeft =
                        name.includes('left') || name.includes('_l') ||
                        parentName.includes('left') || parentName.includes('_l');
                    const isExplicitRight =
                        name.includes('right') || name.includes('_r') ||
                        parentName.includes('right') || parentName.includes('_r');
                    const isRightSide = worldCenter.x < 0;
                    const isLeftSide = worldCenter.x >= 0;
                    const isDoorish = name.includes('door') || parentName.includes('door');

                    // Explicit Left Door parts
                    if (isDoorish && (isExplicitLeft || (!isExplicitRight && isLeftSide))) {
                        rawLeftDoorNodes.push(node);
                    }
                    // Explicit Right Door parts (Hierarchy based)
                    else if (node.parent && (
                        node.parent.name === 'ARm4_door_R' ||
                        node.parent.name === 'ARm4_doorglass_R' ||
                        node.parent.name === 'ARm4_door_R_handle_carbon'
                    )) {
                        console.log("Found Right Door Mesh (Hierarchy):", node.name);
                        rawRightDoorNodes.push(node);
                    }
                    else if (isDoorish && (isExplicitRight || (!isExplicitLeft && isRightSide))) {
                        // Fallback
                        if (!rawRightDoorNodes.includes(node)) {
                            rawRightDoorNodes.push(node);
                        }
                    }
                }

                // Floor detection: explicit interior meshes that cover cabin base
                if (node.isMesh) {
                    const isNamedFloor =
                        name.includes('interior_ar4_interior_black_0'.toLowerCase()) ||
                        name.includes('interior_ar4_alcnt_0'.toLowerCase()) ||
                        name.includes('interior_ar4_main_0'.toLowerCase()) ||
                        name.includes('interior_ar4_int_decals_0'.toLowerCase()) ||
                        name.includes('interior_ar4_int_seams_0'.toLowerCase());
                    if (isNamedFloor) {
                        rawFloorNodes.push(node);
                    }
                }
            }
        });

        // --- PIVOT CREATION ---
        const leftHinge = new THREE.Vector3(0.830, 0.950, 0.670);
        const hoodHinge = new THREE.Vector3(0, 1.0, 0.8);

        // --- ANIMATION GROUPS ---
        const leftGroup = new THREE.Group();
        leftGroup.position.copy(leftHinge);
        scene.add(leftGroup);
        rawLeftDoorNodes.forEach(node => leftGroup.attach(node));
        setLeftDoorGroup(leftGroup);

        // RIGHT DOOR SETUP
        const rightGroup = new THREE.Group();
        const rightHinge = new THREE.Vector3(-0.830, 0.950, 0.670); // Symmetric to left
        rightGroup.position.copy(rightHinge);
        scene.add(rightGroup);
        rawRightDoorNodes.forEach(node => rightGroup.attach(node));
        setRightDoorGroup(rightGroup);
        setRightDoorNodes(rawRightDoorNodes);

        const hGroup = new THREE.Group();
        hGroup.position.copy(hoodHinge);
        scene.add(hGroup);
        rawHoodNodes.forEach(node => hGroup.attach(node));
        setHoodGroup(hGroup);

        // ENGINE BAY (no re-parenting to preserve transforms)
        const engineBox = new THREE.Box3();
        rawEngineNodes.forEach((node) => {
            node.updateWorldMatrix(true, false);
            engineBox.expandByObject(node);
        });
        const engineCenter = engineBox.isEmpty() ? null : engineBox.getCenter(new THREE.Vector3());
        const engineSize = engineBox.isEmpty() ? null : engineBox.getSize(new THREE.Vector3());
        let engineOverlayGroup = engineBayGroup;
        if (!engineOverlayGroup) {
            engineOverlayGroup = new THREE.Group();
            scene.add(engineOverlayGroup);
        }
        setEngineGroup(engineOverlayGroup);
        setEngineNodes(rawEngineNodes);
        setEngineBounds(engineCenter && engineSize ? { center: engineCenter, size: engineSize } : null);

        setHeadlightNodes(rawHeadlightNodes);
        setHeadlightLeftNodes(rawHeadlightLeft);
        setHeadlightRightNodes(rawHeadlightRight);

        // Headlight bounds
        const leftBox = new THREE.Box3();
        rawHeadlightLeft.forEach((n) => {
            n.updateWorldMatrix(true, false);
            leftBox.expandByObject(n);
        });
        const rightBox = new THREE.Box3();
        rawHeadlightRight.forEach((n) => {
            n.updateWorldMatrix(true, false);
            rightBox.expandByObject(n);
        });
        const leftCenter = leftBox.isEmpty() ? null : leftBox.getCenter(new THREE.Vector3());
        const leftSize = leftBox.isEmpty() ? null : leftBox.getSize(new THREE.Vector3());
        const rightCenter = rightBox.isEmpty() ? null : rightBox.getCenter(new THREE.Vector3());
        const rightSize = rightBox.isEmpty() ? null : rightBox.getSize(new THREE.Vector3());
        setHeadlightLeftBounds(leftCenter && leftSize ? { center: leftCenter, size: leftSize } : null);
        setHeadlightRightBounds(rightCenter && rightSize ? { center: rightCenter, size: rightSize } : null);

        console.info('Headlight node count:', rawHeadlightNodes.length, 'names:', headlightNames);
        console.info('PetHair floor candidates:', rawFloorNodes.map(n => n.name));

    }, [scene]);

    return {
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
    };
}
