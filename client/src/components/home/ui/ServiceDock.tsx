// @ts-nocheck
import React from 'react';
import { motion } from 'framer-motion';

const THEME = {
    primary: '#FF7F50',
    dark: '#0a0a0a',
    text: '#ffffff',
    cardBg: 'rgba(10, 10, 10, 0.90)',
    border: 'rgba(255, 255, 255, 0.1)'
};

/**
 * Mobile bottom service dock with horizontal scrolling
 */
export const ServiceDock = ({
    activeService,
    activeMenuItem,
    setActiveMenuItem,
    setActiveService,
    setCameraView,
    queueInfoCard,
    menuItems
}) => {
    return (
        <div style={{
            position: 'absolute', // Anchor within hero so it scrolls away with the section
            bottom: 0,
            left: 0,
            right: 0,
            minHeight: '110px', // Slightly taller to fit helper text
            maxHeight: '150px', // Cap the maximum height
            background: 'rgba(10, 10, 10, 0.95)',
            borderTop: `1px solid ${THEME.border}`,
            zIndex: 55,
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
            padding: '8px 16px 12px',
            paddingBottom: 'max(12px, env(safe-area-inset-bottom))', // Account for iOS safe area
            boxSizing: 'border-box'
        }}>
            <div style={{
                color: '#b3b3b3',
                fontSize: '0.8rem',
                letterSpacing: '0.3px',
                paddingLeft: '4px'
            }}>
                Tap a service to view the 3D experience
            </div>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                overflowX: 'auto',
                overflowY: 'hidden',
                gap: '12px',
                scrollSnapType: 'x mandatory',
                WebkitOverflowScrolling: 'touch' // Smooth scrolling on iOS
            }}>
            {menuItems?.map((service) => {
                const isActive = activeMenuItem === service.id;
                return (
                    <motion.div
                        key={service.id}
                        layout
                        onClick={() => {
                            setActiveMenuItem(service.id);
                            setActiveService(service);
                            setCameraView(service.target);
                            queueInfoCard(service.target);
                        }}
                        style={{
                            minWidth: '140px',
                            height: '80%',
                            background: isActive ? 'rgba(255, 127, 80, 0.15)' : 'rgba(255,255,255,0.03)',
                            border: isActive ? `1px solid ${THEME.primary}` : '1px solid rgba(255,255,255,0.1)',
                            borderRadius: '12px',
                            padding: '12px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            scrollSnapAlign: 'center',
                            position: 'relative'
                        }}
                    >
                        <div style={{
                            color: isActive ? THEME.primary : 'white',
                            fontWeight: isActive ? '700' : '500',
                            fontSize: '0.9rem',
                            marginBottom: '4px',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                        }}>
                            {service.title || service.name}
                        </div>
                        {isActive && (
                            <motion.div
                                layoutId="activeIndicator"
                                style={{
                                    position: 'absolute',
                                    bottom: '6px',
                                    left: '50%',
                                    x: '-50%',
                                    width: '4px',
                                    height: '4px',
                                    borderRadius: '50%',
                                    background: THEME.primary
                                }}
                            />
                        )}
                    </motion.div>
                );
            })}
            </div>
        </div>
    );
};
