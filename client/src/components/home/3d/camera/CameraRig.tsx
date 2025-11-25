// @ts-nocheck
import { useRef, useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { CameraControls } from '@react-three/drei';

const FLOOR_MAT_ROTATION_TOTAL = Math.PI / 2;
const FLOOR_MAT_ROTATION_SPEED = 2.4; // snappier than before

/**
 * Camera rig that handles all camera movements and animations
 * Supports multiple view presets and automatic orbit on home view
 */
export function CameraRig({ view, enableHomeOrbit = true, isMobile }) {
    const controls = useRef();
    const { camera } = useThree();
    const [homeOrbitEnabled, setHomeOrbitEnabled] = useState(false);
    const floorMatRotationRef = useRef(0);
    const floorMatAnimatingRef = useRef(false);

    useEffect(() => {
        if (!controls.current) return;

        switch (view) {
            case 'interior':
                // User requested swap: Driver door is at +X.
                // Positioned to align with back of seat, further down the car (negative Z)
                // Pulled back to avoid polygon glitching
                controls.current.setLookAt(
                    1.5, 1.0, -0.5,
                    0.0, 0.6, 0.0,
                    true
                );
                controls.current.zoomTo(isMobile ? 0.8 : 1.0, true);
                break;

            case 'interior_detail':
                // Interior-facing cockpit view that feels like you're seated inside the car
                controls.current.setLookAt(
                    0.9, 1.15, 0.05,  // Position just inside the driver door, near the A-pillar
                    0.45, 0.9, -0.35, // Target the driver seat cushion and console
                    true
                );
                controls.current.zoomTo(isMobile ? 0.9 : 1.2, true);
                break;

            case 'interior_floor':
                // Low angle toward the rear footwells to showcase pet hair removal
                controls.current.setLookAt(
                    0.0, 0.85, -0.8, // Position: lower and slightly behind the seats
                    0.0, 0.15, 0.25, // Target: slightly lower toward the rear floor area
                    true
                );
                controls.current.zoomTo(isMobile ? 0.8 : 0.65, true);
                break;

            case 'floor_mat':
                // Start from the pet-hair anchor and orbit right around the same footwell target
                controls.current.setLookAt(
                    0.0, 0.85, -0.8,
                    0.0, 0.15, 0.25,
                    true
                );
                controls.current.zoomTo(isMobile ? 0.8 : 1.32, true);
                break;

            case 'engine':
                controls.current.setLookAt(
                    0.8, 1.4, 2.0,
                    0, 0.5, 0.5,
                    true
                );
                break;

            case 'exterior':
                // Use the right-side profile view (same as demo target)
                controls.current.setLookAt(
                    -2.0, 1.0, 3.0, // Position
                    -0.8, 0.8, 0.0, // Target (Right Door approx)
                    true
                );
                break;

            case 'paint':
                // Side profile view for Premium Protection
                controls.current.setLookAt(
                    -5.5, 1.3, 0.2,
                    0, 0.6, 0,
                    true
                );
                break;

            case 'paint_detail':
                // Closer side profile for paint correction details - looking down the car
                controls.current.setLookAt(
                    -3.2, 1.4, -1.5,
                    0, 0.8, 0.5,
                    true
                );
                break;

            case 'paint_correction':
                // Closer side sweep to showcase polishing passes
                controls.current.setLookAt(
                    -3.0, 1.3, 1.6,
                    0.2, 0.9, 0.1,
                    true
                );
                controls.current.zoomTo(1.05, true);
                break;

            case 'ceramic_coating':
                // Slightly higher, balanced three-quarter to show overall gloss
                controls.current.setLookAt(
                    -2.8, 1.6, -1.8,
                    0.1, 0.9, 0.0,
                    true
                );
                controls.current.zoomTo(1.0, true);
                break;

            case 'front':
                // Focus on headlight area (closer, lower angle)
                controls.current.setLookAt(
                    1.0, 0.9, 2.2, // Position: Closer in
                    0.5, 0.7, 1.8, // Target: Headlight area
                    true
                );
                break;

            case 'wheel':
                controls.current.setLookAt(
                    1.5, 1.2, 2.5,
                    0.5, 0.7, 1.8,
                    true
                );
                break;

            case 'right_side':
                // View of the right door
                controls.current.setLookAt(
                    -2.0, 1.0, 3.0, // Position
                    -0.8, 0.8, 0.0, // Target (Right Door approx)
                    true
                );
                break;

            case 'home':
                // Hero-style orbit that keeps the car prominent
                controls.current.setLookAt(
                    2.6, 1.6, 3.2,
                    0.0, 0.9, 0.0,
                    true
                );
                controls.current.zoomTo(1.1, true);
                break;

            default:
                controls.current.setLookAt(4, 2, 5, 0, 0, 0, true);
                break;
        }
    }, [view, camera, isMobile]);

    useEffect(() => {
        if (view === 'floor_mat') {
            floorMatRotationRef.current = 0;
            floorMatAnimatingRef.current = true;
        } else {
            floorMatAnimatingRef.current = false;
        }
    }, [view]);

    useEffect(() => {
        if (view !== 'home' || !enableHomeOrbit) {
            setHomeOrbitEnabled(false);
            return;
        }
        const t = setTimeout(() => setHomeOrbitEnabled(true), 450); // let the camera settle first
        return () => clearTimeout(t);
    }, [view, enableHomeOrbit]);

    useFrame((_, delta) => {
        if (!controls.current) return;

        if (view === 'home') {
            if (homeOrbitEnabled) controls.current.rotate(-0.2 * delta, 0, false);
            controls.current.update(delta);
            return;
        }

        if (view === 'floor_mat' && floorMatAnimatingRef.current && floorMatRotationRef.current < FLOOR_MAT_ROTATION_TOTAL) {
            const remaining = FLOOR_MAT_ROTATION_TOTAL - floorMatRotationRef.current;
            const step = Math.min(FLOOR_MAT_ROTATION_SPEED * delta, remaining);
            controls.current.rotate(-step, 0, false);
            floorMatRotationRef.current += step;
            if (floorMatRotationRef.current >= FLOOR_MAT_ROTATION_TOTAL - 1e-3) {
                floorMatAnimatingRef.current = false;
            }
        }

        controls.current.update(delta);
    });

    return (
        <CameraControls
            ref={controls}
            minPolarAngle={0}
            maxPolarAngle={Math.PI / 1.8}
            mouseButtons={{ left: 0, middle: 0, right: 0, wheel: 0 }}
            touches={{ one: 0, two: 0, three: 0 }}
        />
    );
}
