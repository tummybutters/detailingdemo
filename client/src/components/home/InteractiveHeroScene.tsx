// @ts-nocheck
import React, { useState, useEffect, useRef, useMemo, Suspense, useLayoutEffect, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {
  useGLTF,
  Environment,
  ContactShadows,
  Float,
  CameraControls,
  PerspectiveCamera,
  useProgress,
  useTexture
} from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import { HeroButton } from '@/components/ui/hero-button';
import { SERVICES_DATA, VIEW_CONTENT } from './hero-services';
import LoadingScreen from './LoadingScreen';
import { Sidebar, InfoCard, BookingModal, ServiceDock, AddOnBar } from './ui';
import { CameraRig } from './3d/camera';
import { useMobile } from './hooks';
import { THEME, HOME_MENU_ITEM, MENU_ITEMS, LOCATION_COPY } from './config';
import { getHeroCache, setHeroReady } from './hero-cache';
import BookingWidgetCard from '@/components/booking/BookingWidgetCard';

// Preload assets
useGLTF.preload('/bmw_m4_f82_optimized.glb');
useTexture.preload('/dirt_mask.png');
useTexture.preload('/engine_dirt.png');
useTexture.preload('/dog_hair_texture.png');
useTexture.preload('/floor_proxy_base.png');
useTexture.preload('/headlight_fog.png');
// HDRI loaded directly via <Environment />

// Constants extracted to ./config/constants.ts



// --- Canvas Loader Component ---
function CanvasLoader({ setLoadingProgress }) {
  const { progress } = useProgress();

  useEffect(() => {
    setLoadingProgress(progress);
  }, [progress, setLoadingProgress]);

  return null;
}

import CarModel from './3d/CarModel';



// --- UI Components ---

// UI Components extracted to ./ui/









export default function InteractiveHeroScene({ location = 'sacramento' }: { location?: keyof typeof LOCATION_COPY }) {
  const isMobile = useMobile();
  const locationCopy = LOCATION_COPY[location] || LOCATION_COPY.sacramento;
  const prefersReducedMotion = useMemo(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);
  const performanceTier = useMemo(() => {
    const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;
    const cores = typeof navigator !== 'undefined' ? navigator.hardwareConcurrency || 8 : 8;
    const memory = typeof navigator !== 'undefined' && navigator.deviceMemory ? navigator.deviceMemory : 8;
    const score = (isMobile ? 1 : 0) + (dpr > 1.75 ? 1 : 0) + (cores <= 4 ? 1 : 0) + (memory && memory <= 4 ? 1 : 0);
    return score >= 2 ? 'low' : 'high';
  }, [isMobile]);
  const foamCount = isMobile
    ? (performanceTier === 'low' ? 160 : 220)
    : (performanceTier === 'low' ? 320 : 420);
  const waterCount = isMobile
    ? (performanceTier === 'low' ? 90 : 130)
    : (performanceTier === 'low' ? 170 : 230);
  const foamSplatCount = isMobile
    ? 140
    : (performanceTier === 'low' ? 220 : 280);
  const shouldFloat = !prefersReducedMotion && performanceTier !== 'low';
  const [activeService, setActiveService] = useState(HOME_MENU_ITEM);
  const [activeMenuItem, setActiveMenuItem] = useState('home');
  const [activeAddOn, setActiveAddOn] = useState(null);
  const [cameraView, setCameraView] = useState('home');
  const initialHeroReady = useMemo(() => getHeroCache().heroReady, []);
  const [loadingProgress, setLoadingProgress] = useState(initialHeroReady ? 100 : 0);
  const [isLoaded, setIsLoaded] = useState(initialHeroReady);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [showBookingWidget, setShowBookingWidget] = useState(false);
  const heroCopyRef = useRef<HTMLDivElement>(null);
  const heroRootRef = useRef<HTMLDivElement>(null);
  const bookingButtonRef = useRef<HTMLButtonElement>(null);
  const [bookingPopupPosition, setBookingPopupPosition] = useState({ top: 220, left: 0 });
  const [mobilePopupTop, setMobilePopupTop] = useState(220);
  const mobileDockRef = useRef<HTMLDivElement>(null);
  const [mobileDockHeight, setMobileDockHeight] = useState(120);
  const [heroHeight, setHeroHeight] = useState(720);
  const bookingPopupVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: -8, scale: 0.94 },
      visible: { opacity: 1, y: 0, scale: 1 }
    }),
    []
  );

  const updateBookingPopupPosition = useCallback(() => {
    if (isMobile) return;
    const button = bookingButtonRef.current;
    const heroRoot = heroRootRef.current;
    if (!button || !heroRoot) return;
    const heroRect = heroRoot.getBoundingClientRect();
    const buttonRect = button.getBoundingClientRect();
    const topOffset = buttonRect.bottom - heroRect.top + 12;
    const leftOffset = buttonRect.left - heroRect.left;
    setBookingPopupPosition({ top: topOffset, left: leftOffset });
  }, [isMobile]);

  useLayoutEffect(() => {
    if (isMobile) return;
    updateBookingPopupPosition();
    window.addEventListener('resize', updateBookingPopupPosition);
    window.addEventListener('orientationchange', updateBookingPopupPosition);
    return () => {
      window.removeEventListener('resize', updateBookingPopupPosition);
      window.removeEventListener('orientationchange', updateBookingPopupPosition);
    };
  }, [isMobile, updateBookingPopupPosition]);

  useLayoutEffect(() => {
    if (isMobile || !showBookingWidget) return;
    updateBookingPopupPosition();
  }, [isMobile, showBookingWidget, updateBookingPopupPosition]);

  useLayoutEffect(() => {
    if (!isMobile) return;
    const updatePopupTop = () => {
      const node = heroCopyRef.current;
      if (!node) return;
      setMobilePopupTop(node.offsetTop + node.offsetHeight + 12);
    };
    updatePopupTop();
    window.addEventListener('resize', updatePopupTop);
    return () => window.removeEventListener('resize', updatePopupTop);
  }, [isMobile, activeMenuItem]);

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;

    const measureHero = () => {
      const header = document.getElementById('site-header');
      const banner = document.getElementById('partnership-banner');
      const headerHeight = header?.getBoundingClientRect().height || 0;
      const bannerHeight = banner?.getBoundingClientRect().height || 0;
      const viewportHeight = window.visualViewport?.height || window.innerHeight || 0;
      const availableHeight = viewportHeight - headerHeight - bannerHeight;
      return Math.max(560, availableHeight);
    };

    if (isMobile) {
      // Lock height once on mobile to avoid jitter from browser chrome hide/show.
      setHeroHeight(measureHero());
      const handleOrientation = () => setHeroHeight(measureHero());
      window.addEventListener('orientationchange', handleOrientation);
      return () => window.removeEventListener('orientationchange', handleOrientation);
    } else {
      const handleResize = () => setHeroHeight(measureHero());
      const handleOrientation = () => setHeroHeight(measureHero());
      setHeroHeight(measureHero());
      window.addEventListener('resize', handleResize);
      window.addEventListener('orientationchange', handleOrientation);
      return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('orientationchange', handleOrientation);
      };
    }
  }, [isMobile]);

  useLayoutEffect(() => {
    if (!isMobile) return;
    const measureDock = () => {
      const node = mobileDockRef.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      if (rect.height) setMobileDockHeight(rect.height);
    };
    measureDock();
    window.addEventListener('resize', measureDock);
    window.addEventListener('orientationchange', measureDock);
    return () => {
      window.removeEventListener('resize', measureDock);
      window.removeEventListener('orientationchange', measureDock);
    };
  }, [isMobile, activeService, activeAddOn]);
  const [headlightTrigger, setHeadlightTrigger] = useState(0);
  const [infoCardVisible, setInfoCardVisible] = useState(false);
  const infoCardTimer = useRef(null);
  const isHome = activeMenuItem === 'home';
  const heroSubtitle = locationCopy.description;
  const isHighPerfMobile = isMobile && performanceTier === 'high';
  const canvasDpr = isMobile ? (isHighPerfMobile ? [1, 1.5] : [0.75, 1.1]) : [1, 1.75];
  const enableShadows = !isMobile || isHighPerfMobile;
  const enableAntialias = !isMobile || isHighPerfMobile;
  const envResolution = isMobile ? (isHighPerfMobile ? 256 : 128) : 256;
  const envBlur = isMobile ? (isHighPerfMobile ? 0.4 : 0.6) : 0.4;
  const shadowMapSize = isMobile ? (isHighPerfMobile ? [512, 512] : [384, 384]) : [768, 768];
  const contactShadowRes = isMobile ? (isHighPerfMobile ? 512 : 320) : 768;
  const contactShadowBlur = isMobile ? (isHighPerfMobile ? 2.0 : 2.2) : 2.8;

  // Cleaning State (Lifted)
  const [cleaningState, setCleaningState] = useState('clean');
  const [engineTrigger, setEngineTrigger] = useState(0);
  const [petHairTrigger, setPetHairTrigger] = useState(0);

  const cleaningTimers = useRef([]);

  const handleClean = () => {
    if (cleaningState === 'foaming' || cleaningState === 'rinsing') return;

    // Clear any existing timers before starting a new sequence
    cleaningTimers.current.forEach(clearTimeout);
    cleaningTimers.current = [];

    // brief pause so camera can settle on the door
    setCleaningState('dirty');

    cleaningTimers.current.push(setTimeout(() => {
      setCleaningState('foaming');
      cleaningTimers.current.push(setTimeout(() => {
        setCleaningState('rinsing');
        // Sync water stop with foam dissipation by shortening rinse window
        cleaningTimers.current.push(setTimeout(() => {
          setCleaningState('clean');
        }, 1800));
      }, 2500)); // slightly longer foaming window before rinse
    }, 1250)); // linger on dirty view a bit longer before spraying
  };

  // Watchdog: Kill exterior animation if user leaves the "exterior" service
  useEffect(() => {
    if (activeService?.id !== 'exterior') {
      cleaningTimers.current.forEach(clearTimeout);
      cleaningTimers.current = [];
      setCleaningState('clean');
    }
  }, [activeService]);

  // Schedule the minimal info card after camera settles
  const queueInfoCard = (view) => {
    if (infoCardTimer.current) clearTimeout(infoCardTimer.current);
    setInfoCardVisible(false);
    if (!view || view === 'home') return;
    infoCardTimer.current = setTimeout(() => setInfoCardVisible(true), 650);
  };

  useEffect(() => {
    return () => {
      if (infoCardTimer.current) clearTimeout(infoCardTimer.current);
    };
  }, []);

  // Engine bay cleaning trigger (matches headlight timing)
  useEffect(() => {
    if (activeAddOn?.name?.includes('Engine')) {
      setCameraView('engine');
      setEngineTrigger(Date.now());
    } else {
      setEngineTrigger(0);
    }
  }, [activeAddOn, setCameraView]);

  // Headlight add-on: just snap camera forward for now
  useEffect(() => {
    if (activeAddOn?.name === 'Headlight Restoration') {
      setCameraView('front');
    }
  }, [activeAddOn, setCameraView]);

  // Trigger headlight glow flash on selection
  useEffect(() => {
    if (activeAddOn?.name === 'Headlight Restoration') {
      const t = Date.now();
      setHeadlightTrigger(t);
      console.info('[Headlight] Trigger fired at', new Date(t).toISOString());
    }
  }, [activeAddOn]);

  // Pet Hair Removal trigger (rear floor focus)
  useEffect(() => {
    const isPetHair = activeService?.id === 'interior' && activeAddOn?.name === 'Pet Hair Removal';
    if (isPetHair) {
      setCameraView('interior_floor');
      setPetHairTrigger(Date.now());
    } else {
      setPetHairTrigger(0);
    }
  }, [activeAddOn, activeService, setCameraView]);

  // Hide loading screen when model is fully loaded
  useEffect(() => {
    // If we've already loaded once, skip the loader entirely.
    if (getHeroCache().heroReady) {
      setIsLoaded(true);
      return;
    }
    if (loadingProgress >= 100) {
      const timer = setTimeout(() => {
        setIsLoaded(true);
        setHeroReady();
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [loadingProgress]);

  return (
    <div
      ref={heroRootRef}
      style={{
      width: '100%',
      minWidth: '320px',
      position: 'relative',
      overflowX: 'hidden',
      background: '#000'
    }}>

      {/* LOADING SCREEN */}
      <AnimatePresence>
        {!isLoaded && <LoadingScreen progress={loadingProgress} />}
      </AnimatePresence>

      {/* HERO SECTION - 3D Canvas */}
      <div
        id="hero"
        style={{
          width: '100%',
          height: heroHeight,
          minHeight: heroHeight,
          minWidth: '320px',
          background: 'transparent',
          position: 'relative',
          paddingTop: isMobile ? '12px' : '32px',
          paddingBottom: isMobile ? '12px' : '24px',
          boxSizing: 'border-box',
          overflow: 'hidden'
        }}
      >

        <header style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          padding: '16px',
          zIndex: 30,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          pointerEvents: 'none'
        }}>
          {/* Removed duplicate logo/title - now in Navbar */}

          {/* Mobile Hero Text - Fades out when not on Home */}
          <AnimatePresence>
            {isMobile && activeMenuItem === 'home' && (
              <motion.div
                ref={heroCopyRef}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                style={{
                  position: 'absolute',
                  top: '30px',
                  left: '20px',
                  right: '20px',
                  pointerEvents: 'auto',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px',
                  zIndex: 40 // Below navbar (50) but above canvas
                }}
              >
                <h2 style={{
                  fontFamily: 'Playfair Display, serif',
                  fontSize: 'clamp(2.1rem, 6vw + 1rem, 2.6rem)',
                  lineHeight: '1.1',
                  margin: '0',
                  color: 'white',
                  textShadow: '0 2px 10px rgba(0,0,0,0.8)'
                }}>
                  Mobile Car Detailing<br />
                  <span style={{ color: THEME.primary }}>{locationCopy.city}</span>
                </h2>
                {locationCopy.description && (
                  <p style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: 'clamp(0.82rem, 2.2vw + 0.48rem, 0.94rem)',
                    lineHeight: '1.35',
                    color: 'rgba(255,255,255,0.9)',
                    textShadow: '0 1px 4px rgba(0,0,0,0.8)',
                    maxWidth: '92%'
                  }}>
                    {locationCopy.description.replace(' — all delivered with precision, care, and professional-grade results.', '')}
                  </p>
                )}
                <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '10px', width: '100%', maxWidth: 'min(320px, 90%)' }}>
                  <HeroButton
                    className="text-xs sm:text-sm"
                    onClick={() => {
                      if (isMobile) {
                        window.location.href = '/booking';
                      } else {
                        setShowBookingWidget((prev) => !prev);
                      }
                    }}
                    style={{ width: 'fit-content', minWidth: '200px', maxWidth: '240px', alignSelf: 'flex-start' }}
                  >
                    Book Your Detail
                  </HeroButton>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </header>

        {/* Desktop booking popup */}
        {!isMobile && (
          <motion.div
            variants={bookingPopupVariants}
            initial="hidden"
            animate={showBookingWidget ? 'visible' : 'hidden'}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              top: bookingPopupPosition.top,
              left: bookingPopupPosition.left,
              width: '340px',
              zIndex: 90,
              pointerEvents: showBookingWidget ? 'auto' : 'none',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <BookingWidgetCard
              iframeHeight={320}
              style={{ width: '100%', borderRadius: '16px' }}
              onClose={() => setShowBookingWidget(false)}
            />
          </motion.div>
        )}

        {/* InfoCard - Now enabled for mobile too */}
        <InfoCard
          visible={infoCardVisible}
          onClose={() => setInfoCardVisible(false)}
          isMobile={isMobile}
          view={cameraView}
          viewContent={VIEW_CONTENT}
        />

        {isMobile ? null : (
          <Sidebar
            activeService={activeService}
            activeMenuItem={activeMenuItem}
            setActiveMenuItem={setActiveMenuItem}
            setActiveService={(service) => {
              setActiveService(service);
              setActiveMenuItem(service?.id || activeMenuItem);
              if (service?.id === 'exterior') handleClean();
            }}
            activeAddOn={activeAddOn}
            setActiveAddOn={setActiveAddOn}
            setCameraView={setCameraView}
            queueInfoCard={queueInfoCard}
            menuItems={MENU_ITEMS}
          />
        )}

        <Canvas
          key={isMobile ? 'canvas-mobile' : 'canvas-desktop'}
          shadows={enableShadows}
          dpr={canvasDpr}
          performance={{ min: isMobile ? 0.3 : 0.5 }}
          gl={{
            antialias: enableAntialias,
            alpha: false,
            powerPreference: 'high-performance',
            preserveDrawingBuffer: false
          }}
          style={{
            position: 'absolute',
            inset: 0,
            marginLeft: isMobile ? '0' : '350px',
            width: isMobile ? '100%' : 'calc(100% - 350px)',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 1,
            background: 'linear-gradient(180deg, #050505 0%, #0d0806 55%, #030303 100%)'
          }}
        >
          <Suspense fallback={<CanvasLoader setLoadingProgress={setLoadingProgress} />}>
            <ambientLight intensity={0.38} />
            <spotLight
              position={[10, 10, 10]}
              angle={0.15}
              penumbra={1}
              intensity={6.5}
              castShadow={enableShadows}
              shadow-mapSize={shadowMapSize} // Reduced for mobile performance
            />
            <pointLight position={[-10, -10, -10]} color={THEME.primary} intensity={5} />

            <Environment
              files="/leibstadt_4k.exr"
              blur={0.28}
              background={false} // use HDRI for reflections/lighting only
              ground={{ height: 12, radius: 140, scale: 160 }} // project the HDRI onto a ground plane to avoid the “floating car” look
            />

            {/* Ceiling plane to hide stray objects above the scene */}
            <mesh
              position={[0, 6.4, 0]}
              rotation={[-Math.PI / 2, 0, 0]}
              receiveShadow={false}
              castShadow={false}
            >
              <planeGeometry args={[200, 200]} />
              <meshStandardMaterial color="#000000" side={THREE.DoubleSide} />
            </mesh>

            {isMobile ? (
              <CarModel
                activeService={activeService}
                activeAddOn={activeAddOn}
                onPartClick={setCameraView}
                cleaningState={cleaningState}
                petHairTrigger={petHairTrigger}
                isMobile={isMobile}
                view={cameraView}
                foamCount={foamCount}
                waterCount={waterCount}
                foamSplatCount={foamSplatCount}
                headlightTrigger={headlightTrigger}
                engineTrigger={engineTrigger}
              />
            ) : (
              shouldFloat ? (
                <Float speed={1} rotationIntensity={0.1} floatIntensity={0.1}>
                  <CarModel
                    activeService={activeService}
                    activeAddOn={activeAddOn}
                    onPartClick={setCameraView}
                    cleaningState={cleaningState}
                    petHairTrigger={petHairTrigger}
                    isMobile={isMobile}
                    view={cameraView}
                    foamCount={foamCount}
                    waterCount={waterCount}
                    foamSplatCount={foamSplatCount}
                    headlightTrigger={headlightTrigger}
                    engineTrigger={engineTrigger}
                  />
                </Float>
              ) : (
                <CarModel
                  activeService={activeService}
                  activeAddOn={activeAddOn}
                  onPartClick={setCameraView}
                  cleaningState={cleaningState}
                  petHairTrigger={petHairTrigger}
                  isMobile={isMobile}
                  view={cameraView}
                  foamCount={foamCount}
                  waterCount={waterCount}
                  foamSplatCount={foamSplatCount}
                  headlightTrigger={headlightTrigger}
                  engineTrigger={engineTrigger}
                />
              )
            )}

            <ContactShadows
              resolution={contactShadowRes}
              scale={isMobile ? 24 : 32}
              blur={contactShadowBlur}
              opacity={0.65}
              far={30}
              color="#000000"
              frames={1}
            />

            <PerspectiveCamera
              makeDefault
              position={[4, 2, 5]}
              fov={isMobile ? 100 : 45}
              onUpdate={(c) => c.updateProjectionMatrix()}
            />
            <CameraRig view={cameraView} enableHomeOrbit={true} isMobile={isMobile} />
          </Suspense>
        </Canvas>

        {isMobile && (
          <div
            ref={mobileDockRef}
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: 0,
              background: 'linear-gradient(180deg, #0a0a0a 0%, #050505 100%)',
              boxShadow: '0 -10px 30px rgba(0,0,0,0.35)',
              zIndex: 80,
              paddingBottom: 'max(8px, env(safe-area-inset-bottom))'
            }}
          >
            <AddOnBar
              activeService={activeService}
              activeAddOn={activeAddOn}
              setActiveAddOn={setActiveAddOn}
              setCameraView={setCameraView}
              queueInfoCard={queueInfoCard}
              showPrice={false}
            />
            <ServiceDock
              activeService={activeService}
              activeMenuItem={activeMenuItem}
              setActiveMenuItem={setActiveMenuItem}
              setActiveService={(service) => {
                setActiveService(service);
                setActiveMenuItem(service?.id || activeMenuItem);
                if (service?.id === 'exterior') handleClean();
              }}
              setCameraView={setCameraView}
              queueInfoCard={queueInfoCard}
              menuItems={MENU_ITEMS}
            />
          </div>
        )}

        {/* HERO FOOTER */}
        {/* HERO FOOTER - Desktop Only or Simplified Mobile */}
        {!isMobile && (
          <div style={{
            position: 'absolute',
            top: '30px',
            left: '370px', // Sidebar width + slight inset
            zIndex: 35,
            maxWidth: '560px',
            pointerEvents: isHome ? 'auto' : 'none'
          }}>
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{
                opacity: isHome ? 1 : 0,
                y: isHome ? 0 : 12
              }}
              transition={{ duration: 0.35 }}
            >
              <h1 style={{
                margin: '0 0 12px 0',
                lineHeight: '1.1',
                textShadow: '0 2px 20px rgba(0,0,0,0.8)',
                fontFamily: '"Playfair Display", serif',
                fontSize: '2.8rem'
              }}>
                <span style={{ display: 'block', color: 'white', marginBottom: '8px' }}>
                  Mobile Car Detailing
                </span>
                <span style={{ color: THEME.primary, fontWeight: 'normal' }}>
                  {locationCopy.city}
                </span>
              </h1>
              <h2 style={{
                color: '#e0e0e0',
                fontSize: '1.1rem',
                lineHeight: '1.6',
                marginBottom: '24px',
                textShadow: '0 1px 10px rgba(0,0,0,0.8)',
                fontWeight: 'normal',
                fontFamily: 'inherit'
              }}>
                {heroSubtitle}
              </h2>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  gap: '10px',
                  width: '100%',
                  maxWidth: '360px',
                  marginTop: '6px',
                  pointerEvents: isHome ? 'auto' : 'none'
                }}
              >
                <HeroButton
                  ref={bookingButtonRef}
                  className="text-xs sm:text-sm"
                  onClick={() => {
                    setShowBookingWidget((prev) => !prev);
                  }}
                  style={{ width: 'fit-content', minWidth: '200px', maxWidth: '240px', alignSelf: 'flex-start' }}
                >
                  {showBookingWidget ? 'Hide Booking' : 'Book Your Detail'}
                </HeroButton>
              </div>
            </motion.div>
          </div>
        )}

        <BookingModal
          isOpen={isBookingOpen}
          onClose={() => setIsBookingOpen(false)}
          service={activeService}
          addOn={activeAddOn}
          isMobile={isMobile}
        />

      </div>
      {/* End Hero Section */}

    </div>
  );
}
