// @ts-nocheck
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ServiceItem } from './ServiceItem';

const THEME = {
    primary: '#FF7F50',
    dark: '#0a0a0a',
    text: '#ffffff',
    cardBg: 'rgba(10, 10, 10, 0.90)',
    border: 'rgba(255, 255, 255, 0.1)'
};

export const Sidebar = ({
    activeService,
    setActiveService,
    activeAddOn,
    setActiveAddOn,
    setCameraView,
    activeMenuItem,
    setActiveMenuItem,
    queueInfoCard,
    menuItems
}) => {
    return (
        <div style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: '350px',
            background: THEME.cardBg,
            backdropFilter: 'blur(20px)',
            borderRight: `1px solid ${THEME.border}`,
            zIndex: 20,
            overflowY: 'auto',
            padding: '100px 0 40px 0'
        }}>
            <div style={{ padding: '0 24px 24px 24px' }}>
                <h2 style={{
                    fontFamily: '"Playfair Display", serif',
                    color: 'white',
                    fontSize: '1.8rem',
                    marginBottom: '8px'
                }}>
                    Service Menu
                </h2>
                <p style={{ color: '#888', fontSize: '0.9rem' }}>
                    Select a package to view details and 3D demonstration.
                </p>
            </div>


            {/* Main Service Buttons - Always Visible */}
            <div>
                {menuItems?.map((service) => {
                    const isHome = service.id === 'home';
                    const isActive = activeMenuItem === service.id;
                    return (
                        <div key={service.id}>
                            <ServiceItem
                                item={service}
                                isActive={isActive}
                                onClick={() => {
                                    if (isHome) {
                                        setActiveMenuItem('home');
                                        setActiveAddOn(null);
                                        setCameraView('home');
                                        queueInfoCard('home');
                                        return;
                                    }
                                    setActiveMenuItem(service.id);
                                    setActiveService(service);
                                    setActiveAddOn(null);
                                    setCameraView(service.target);
                                    queueInfoCard(service.target);
                                }}
                            />
                        </div>
                    );
                })}
            </div>

            {/* Add-ons Section - Shows below all three main buttons */}
            <AnimatePresence>
                {activeService && activeService.addOns && activeService.addOns.length > 0 && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        style={{ overflow: 'hidden', background: 'rgba(0,0,0,0.2)' }}
                    >
                        <div style={{ padding: '12px 0' }}>
                            <div style={{
                                padding: '0 24px 8px',
                                fontSize: '0.75rem',
                                textTransform: 'uppercase',
                                letterSpacing: '1px',
                                color: '#666'
                            }}>
                                Recommended Add-ons
                            </div>
                            {activeService.addOns.map((addon, idx) => (
                                <ServiceItem
                                    key={idx}
                                    item={addon}
                                    isActive={activeAddOn?.name === addon.name}
                                    isAddOn={true}
                                    onClick={() => {
                                        setActiveAddOn(activeAddOn?.name === addon.name ? null : addon);
                                        if (addon.target) {
                                            setCameraView(addon.target);
                                            queueInfoCard(addon.target);
                                        }
                                    }}
                                />
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
