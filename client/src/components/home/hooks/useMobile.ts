// @ts-nocheck
import { useState, useEffect } from 'react';

/**
 * Custom hook to detect mobile viewport
 * Updates on window resize
 */
export function useMobile() {
    const getIsMobile = () => {
        if (typeof window === 'undefined') return false;
        return window.innerWidth < 768;
    };

    const [isMobile, setIsMobile] = useState(getIsMobile);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        const handleResize = () => setIsMobile(getIsMobile());
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return isMobile;
}
