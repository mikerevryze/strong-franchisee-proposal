# Revryze x Alloy Personal Training Growth Partnership

## Overview

This is a sales proposal web application for the Revryze x Alloy Personal Training partnership. The application presents a corporate-level, data-driven proposal showing how deploying Revryze across studio openings generates incremental royalty revenue for Alloy corporate. Built as a single-page presentation with an interactive royalty calculator and a premium dark theme design aesthetic. Targeted at Alloy corporate (franchisor) leadership with messaging pillars of "Stronger Together", science-backed training, and proven results since 1992.

**Key framing**: Corporate incurs $0 cost. Franchisees pay Revryze fees. All royalty revenue shown is pure upside for the franchisor.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state
- **Styling**: Tailwind CSS with custom dark theme design system
- **UI Components**: shadcn/ui component library (Radix UI primitives)
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React

### Backend Architecture
- **Runtime**: Node.js with Express 5
- **Language**: TypeScript with tsx for development
- **Build Tool**: esbuild for production server bundling
- **Dev Server**: Vite with HMR for frontend development

### Project Structure
```
client/           # React frontend application
  src/
    components/ui/  # shadcn/ui component library
    pages/          # Page components (proposal.tsx is main page)
    hooks/          # Custom React hooks
    lib/            # Utilities and query client
server/           # Express backend
  routes.ts       # API route definitions
  storage.ts      # Data storage interface (in-memory)
  static.ts       # Static file serving for production
shared/           # Shared types and schemas
  schema.ts       # Drizzle ORM schema definitions
```

### Design System
- Premium dark interface (#0a0a0a background)
- Primary brand color: Alloy Chartreuse/Neon Yellow (#CCFF00)
- Alert/failure color: Red (#ef4444)
- Inter font family with varied weights
- CSS variables for theming (light/dark mode support)
- Brand tone: Empowering, professional, inclusive, results-driven

### Build Process
- Development: `npm run dev` - Vite dev server with HMR
- Production: `npm run build` - Builds client with Vite, bundles server with esbuild
- Database: `npm run db:push` - Drizzle Kit schema push

## External Dependencies

### Database
- **PostgreSQL** via Drizzle ORM (connection via DATABASE_URL environment variable)
- **Drizzle Kit** for schema migrations
- Schema includes basic user table with UUID primary keys

### UI Component Libraries
- **Radix UI** - Accessible primitive components (dialogs, dropdowns, tooltips, etc.)
- **shadcn/ui** - Pre-styled component collection built on Radix
- **class-variance-authority** - Component variant styling
- **Recharts** - Chart library for data visualization

### Development Tools
- **Vite** - Frontend build tool and dev server
- **esbuild** - Production server bundling
- **tsx** - TypeScript execution for Node.js
- **Tailwind CSS** - Utility-first CSS framework

### Session Management
- **connect-pg-simple** - PostgreSQL session store (configured but not actively used)
- **express-session** - Session middleware

### Replit-Specific
- **@replit/vite-plugin-runtime-error-modal** - Error overlay in development
- **@replit/vite-plugin-cartographer** - Development tooling
- **@replit/vite-plugin-dev-banner** - Development banner