// @ts-nocheck
import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

const THEME = {
    primary: '#FF7F50',
    dark: '#0a0a0a',
    text: '#ffffff',
    cardBg: 'rgba(10, 10, 10, 0.90)',
    border: 'rgba(255, 255, 255, 0.1)'
};

/**
 * Booking modal for requesting service appointments
 */
export const BookingModal = ({ isOpen, onClose, service, addOn, isMobile }) => {
    if (!isOpen) return null;
    const total = (service?.price || 0) + (addOn?.price || 0);

    return (
        <div style={{
            position: 'fixed', inset: 0, zIndex: 100,
            background: 'rgba(0,0,0,0.8)', backdropFilter: isMobile ? 'none' : 'blur(5px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px'
        }} onClick={onClose}>
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                onClick={e => e.stopPropagation()}
                style={{
                    background: '#111', border: `1px solid ${THEME.border}`,
                    padding: '30px', borderRadius: '20px', width: '100%', maxWidth: '400px',
                    position: 'relative'
                }}
            >
                <button onClick={onClose} style={{ position: 'absolute', top: 20, right: 20, background: 'none', border: 'none', color: '#666', cursor: 'pointer' }}>
                    <X size={24} />
                </button>

                <h2 style={{ color: 'white', fontFamily: '"Playfair Display", serif', marginTop: 0 }}>Request Booking</h2>
                <div style={{ marginBottom: '20px', color: '#888', fontSize: '0.9rem' }}>
                    <p>Service: <span style={{ color: 'white' }}>{service?.title}</span></p>
                    {addOn && <p>Add-on: <span style={{ color: 'white' }}>{addOn.name}</span></p>}
                    <p style={{ color: THEME.primary, fontWeight: 'bold', fontSize: '1.1rem', marginTop: '10px' }}>Total Est: ${total}</p>
                </div>

                <form onSubmit={(e) => { e.preventDefault(); alert("Booking request sent! (Demo)"); onClose(); }}>
                    <input type="text" placeholder="Your Name" style={{ width: '100%', padding: '12px', background: '#222', border: '1px solid #333', borderRadius: '8px', color: 'white', marginBottom: '10px' }} required />
                    <input type="tel" placeholder="Phone Number" style={{ width: '100%', padding: '12px', background: '#222', border: '1px solid #333', borderRadius: '8px', color: 'white', marginBottom: '20px' }} required />
                    <button type="submit" style={{ width: '100%', padding: '14px', background: THEME.primary, color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer' }}>
                        Send Request
                    </button>
                </form>
            </motion.div>
        </div>
    );
};
