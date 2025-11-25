// @ts-nocheck
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const THEME = {
    primary: '#FF7F50',
    dark: '#0a0a0a',
    text: '#ffffff',
    cardBg: 'rgba(10, 10, 10, 0.90)',
    border: 'rgba(255, 255, 255, 0.1)'
};

/**
 * Minimal info card that appears after camera settles
 * Displays service/view specific information
 */
export const InfoCard = ({ visible, onClose, isMobile, view, viewContent }) => {
    const content = viewContent?.[view];

    return (
        <AnimatePresence>
            {visible && content && (
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 12 }}
                    transition={{ duration: 0.22, ease: 'easeOut' }}
                    style={{
                        position: 'absolute',
                        top: isMobile ? '80px' : '120px',
                        right: isMobile ? '16px' : '32px',
                        width: isMobile ? '180px' : '340px',
                        minHeight: isMobile ? '120px' : '180px',
                        background: 'linear-gradient(145deg, rgba(18, 14, 12, 0.95), rgba(10, 8, 6, 0.95))',
                        border: `1px solid ${THEME.primary}`,
                        borderRadius: '4px', // Sharper corners for premium feel
                        boxShadow: '0 14px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,127,80,0.1)',
                        padding: isMobile ? '18px 16px' : '32px 24px',
                        color: 'white',
                        zIndex: 60,
                        pointerEvents: 'auto',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center',
                        ...(isMobile ? { top: '80px', right: '16px', left: 'auto', bottom: 'auto', transform: 'none' } : content.position)
                    }}
                >
                    <button
                        onClick={onClose}
                        style={{
                            position: 'absolute',
                            top: '12px',
                            right: '12px',
                            width: '24px',
                            height: '24px',
                            borderRadius: '50%',
                            border: 'none',
                            background: 'transparent',
                            color: 'rgba(255,255,255,0.4)',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'color 0.2s ease'
                        }}
                        aria-label="Close info card"
                    >
                        <X size={18} />
                    </button>

                    <h3 style={{
                        fontFamily: '"Playfair Display", serif',
                        fontSize: isMobile ? '1.2rem' : '1.6rem',
                        fontWeight: '700',
                        margin: isMobile ? '0 0 10px 0' : '0 0 16px 0',
                        color: THEME.primary,
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        lineHeight: '1.1'
                    }}>
                        {content.title}
                    </h3>

                    <div style={{
                        width: isMobile ? '42px' : '60px',
                        height: '2px',
                        background: 'rgba(255,255,255,0.2)',
                        marginBottom: isMobile ? '12px' : '20px'
                    }} />

                    <p style={{
                        fontFamily: 'inherit',
                        fontSize: isMobile ? '0.9rem' : '1rem',
                        lineHeight: isMobile ? '1.4' : '1.6',
                        color: 'rgba(255,255,255,0.9)',
                        margin: 0,
                        fontWeight: '300'
                    }}>
                        {content.description}
                    </p>

                </motion.div>
            )}
        </AnimatePresence>
    );
};
