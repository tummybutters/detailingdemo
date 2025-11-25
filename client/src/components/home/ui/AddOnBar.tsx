// @ts-nocheck
import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const THEME = {
    primary: '#FF7F50',
    dark: '#0a0a0a',
    text: '#ffffff',
    cardBg: 'rgba(10, 10, 10, 0.90)',
    border: 'rgba(255, 255, 255, 0.1)'
};

/**
 * Mobile add-on selection bar that appears above service dock
 */
export const AddOnBar = ({ activeService, activeAddOn, setActiveAddOn, setCameraView, queueInfoCard, showPrice = true }) => {
    if (!activeService?.addOns?.length) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            style={{
                position: 'absolute', // Clamp within hero so it scrolls away with the section
                bottom: 'calc(110px + env(safe-area-inset-bottom, 0px))',
                left: 0,
                right: 0,
                padding: '12px 16px',
                display: 'flex',
                gap: '10px',
                overflowX: 'auto',
                overflowY: 'hidden',
                zIndex: 54,
                background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)',
                maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
                WebkitOverflowScrolling: 'touch'
            }}
        >
            {activeService.addOns.map((addon, idx) => {
                const isSelected = activeAddOn?.name === addon.name;
                return (
                    <button
                        key={idx}
                        onClick={() => {
                            setActiveAddOn(isSelected ? null : addon);
                            if (addon.target) {
                                setCameraView(addon.target);
                                queueInfoCard(addon.target);
                            }
                        }}
                        style={{
                            background: isSelected ? THEME.primary : 'rgba(0,0,0,0.6)',
                            border: `1px solid ${isSelected ? THEME.primary : 'rgba(255,255,255,0.2)'}`,
                            borderRadius: '20px',
                            padding: '8px 16px',
                            color: 'white',
                            fontSize: '0.8rem',
                            whiteSpace: 'nowrap',
                            flexShrink: 0
                        }}
                    >
                        {isSelected && <Check size={12} style={{ marginRight: 6, display: 'inline' }} />}
                        {addon.name}
                        {showPrice && typeof addon.price === 'number' && addon.price >= 0 ? ` (+$${addon.price})` : ''}
                    </button>
                );
            })}
        </motion.div>
    );
};
