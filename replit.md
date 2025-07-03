# replit.md

## Overview

Hardy's Wash N' Wax is a full-stack mobile car detailing application built with Express.js, React (TypeScript), and PostgreSQL. The application provides a comprehensive booking system for mobile car detailing services in the Davis, California area. The architecture includes a RESTful API backend, React frontend with modern UI components, database management with Drizzle ORM, and integrations with third-party services like Google Sheets, Mailchimp, and mapping services.

## System Architecture

The application follows a modern full-stack architecture with clear separation of concerns:

- **Frontend**: React with TypeScript, using Vite as the build tool
- **Backend**: Express.js server with TypeScript
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Styling**: Tailwind CSS with custom design system and Radix UI components
- **Build System**: Vite for frontend bundling, ESBuild for server bundling

## Key Components

### Frontend Architecture
- **React Router**: Using Wouter for client-side routing
- **State Management**: React Query (TanStack Query) for server state management
- **UI Framework**: Custom component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom theme configuration
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **API Structure**: RESTful API with Express.js
- **Database Layer**: Drizzle ORM with PostgreSQL (Neon serverless)
- **Authentication**: Basic setup for user management
- **File Structure**: Modular organization with separate route handlers

### Database Schema Management
- **ORM**: Drizzle ORM for type-safe database operations
- **Migrations**: Automated database migrations through drizzle-kit
- **Schema**: Shared schema definitions between frontend and backend

### Third-Party Integrations
- **Mapping Services**: Mapbox for location search and geocoding
- **Email Services**: Multiple email providers (EmailJS, SendGrid)
- **Google Sheets**: Automated booking synchronization
- **Mailchimp**: Email marketing automation
- **Analytics**: Google Analytics 4 integration

## Data Flow

1. **User Interaction**: Users interact with the React frontend
2. **Form Submission**: Booking forms are validated with Zod schemas
3. **API Communication**: Frontend communicates with Express backend via REST APIs
4. **Database Operations**: Backend performs CRUD operations using Drizzle ORM
5. **External Integrations**: Data is synchronized with Google Sheets and Mailchimp
6. **Email Notifications**: Booking confirmations sent via multiple email services

### Booking Flow
1. Location input with Mapbox geocoding
2. Vehicle type selection
3. Service category and add-ons selection
4. Date/time scheduling
5. Customer information collection
6. Payment processing (placeholder for future implementation)
7. Confirmation and external service synchronization

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Serverless PostgreSQL connection
- **drizzle-orm**: Type-safe ORM
- **express**: Web framework
- **react**: Frontend framework
- **@tanstack/react-query**: Server state management
- **@radix-ui/***: UI component primitives
- **tailwindcss**: Utility-first CSS framework

### Third-Party Services
- **Mapbox**: Location services and geocoding
- **Google Sheets API**: Data synchronization
- **Mailchimp**: Email marketing
- **EmailJS/SendGrid**: Email notifications
- **Google Analytics**: User analytics

### Development Tools
- **vite**: Build tool and dev server
- **typescript**: Type safety
- **drizzle-kit**: Database migration tool
- **eslint**: Code linting

## Deployment Strategy

### Production Build
- Frontend built with Vite to static assets
- Backend bundled with ESBuild for Node.js deployment
- Database migrations run via drizzle-kit

### Environment Configuration
- Environment variables for database connections
- API keys for third-party services
- Service account credentials for Google APIs

### Static Assets
- Public folder for static files (favicon, images, etc.)
- PWA manifest and service worker for offline capabilities
- SEO optimization with meta tags and structured data

### Performance Optimizations
- Service worker with stale-while-revalidate caching strategy
- Image optimization and lazy loading
- Font preloading and optimization
- Code splitting and lazy loading

## Changelog

```
Changelog:
- July 02, 2025. Enhanced locations dropdown with premium design and updated Davis to Sacramento focus:
  * Enhanced dropdown with premium styling, animations, and luxury design elements
  * Changed primary service area from Davis to Sacramento in navigation and homepage
  * Updated H1 title to "Mobile Car Detailing Sacramento, CA" 
  * Updated serving areas to prioritize Sacramento, Davis, Woodland, Elk Grove
  * Updated SEO meta tags and structured data for Sacramento focus
- July 02, 2025. Removed Ask Ian chatbot per client request and added location-based navigation:
  * Removed AskIan chat component from header navigation
  * Added Locations dropdown menu with Sacramento, CA and Orange County, CA options
  * Created dedicated Orange County homepage (/orange-county)
  * Updated Hero component to accept location prop for dynamic content
  * Added Orange County-specific SEO meta tags and structured data
- July 02, 2025. Enhanced Ian's AI system prompt with improved personality constraints:
  * Responses limited to 4 short, high-information sentences
  * Better sentence structure variation to avoid repetition
  * Refined tone and dry humor examples
  * Updated guardrails for off-topic conversations
  * More natural conversational flow while maintaining professional edge
- July 02, 2025. Successfully integrated Gemini AI for Ask Ian chatbot
- July 02, 2025. Initial setup
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```