// @ts-nocheck
import { SERVICES_DATA } from '../hero-services';

/**
 * Theme constants for the interactive hero scene
 */
export const THEME = {
    primary: '#FF7F50',
    dark: '#0a0a0a',
    text: '#ffffff',
    cardBg: 'rgba(10, 10, 10, 0.90)',
    border: 'rgba(255, 255, 255, 0.1)'
};

/**
 * Home menu item for resetting to hero orbit view
 */
export const HOME_MENU_ITEM = {
    id: 'home',
    title: 'Home',
    description: 'Reset to a hero orbit view of the car.',
    target: 'home'
};

/**
 * Complete menu items including home and all services
 */
export const MENU_ITEMS = [HOME_MENU_ITEM, ...SERVICES_DATA];

/**
 * Location-specific copy for different service areas
 */
export const LOCATION_COPY = {
    sacramento: {
        city: 'Sacramento, CA',
        description: "Providing Interior Detailing, Exterior Detailing, Paint Correction, Ceramic Coating, and more! Serving Sacramento, Davis, Woodland, Dixon, Winters, Elk Grove, and surrounding areas — all delivered with precision, care, and professional-grade results."
    },
    'orange-county': {
        city: 'Orange County, CA',
        description: "Providing Interior Detailing, Exterior Detailing, Paint Correction, Ceramic Coating, and more! Serving Newport Beach, Irvine, Tustin, Huntington Beach, San Clemente, Costa Mesa, and surrounding areas — all delivered with precision, care, and professional-grade results."
    }
} as const;
