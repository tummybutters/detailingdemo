// @ts-nocheck
import React from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';

const THEME = {
    primary: '#FF7F50',
    dark: '#0a0a0a',
    text: '#ffffff',
    cardBg: 'rgba(10, 10, 10, 0.90)',
    border: 'rgba(255, 255, 255, 0.1)'
};

export const ServiceItem = ({ item, isActive, onClick, isAddOn = false }) => (
    <motion.div
        layout
        onClick={onClick}
        style={{
            padding: '12px 16px',
            background: isActive ? 'rgba(255, 127, 80, 0.1)' : 'transparent',
            borderLeft: isActive ? `3px solid ${THEME.primary}` : '3px solid transparent',
            cursor: 'pointer',
            marginBottom: '4px',
            borderRadius: '0 8px 8px 0'
        }}
    >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{
                fontSize: isAddOn ? '0.9rem' : '1rem',
                color: isActive ? THEME.primary : 'rgba(255,255,255,0.8)',
                fontWeight: isActive ? 600 : 400
            }}>
                {isAddOn && <Plus size={12} style={{ marginRight: 6, display: 'inline' }} />}
                {item.name || item.title}
            </span>
        </div>
        {isActive && !isAddOn && (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ marginTop: '8px', fontSize: '0.85rem', color: '#aaa', lineHeight: '1.4' }}
            >
                {item.description}
            </motion.div>
        )}
    </motion.div>
);
