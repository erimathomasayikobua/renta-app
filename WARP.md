# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Commands

### Development
- `npm start` - Starts the development server at http://localhost:3000 with hot reload
- `npm test` - Runs tests in interactive watch mode (Jest + React Testing Library)
- `npm run build` - Creates production build in `build/` directory

### Testing
The project uses Jest with React Testing Library. Test files use the pattern `*.test.js` and are located alongside source files.

## Architecture Overview

### Application Type
This is a **Create React App** project - a single-page React application for a multi-category rental platform called "Renta" that handles vehicles (cars, bikes, scooters), housing (apartments, houses, studios), and professional services (cleaning, plumbing, etc.).

### Key Architectural Patterns

**Client-Side Routing**: Custom navigation system using state-based routing in `App.js` via `currentPage` state and `handleNavigate` function. No React Router - pages are conditionally rendered based on string identifiers ('home', 'rides', 'houses', etc.).

**State Management**: React Context API with multiple providers wrapping the entire app in a specific hierarchy (see Context Providers section below).

**Data Persistence**: localStorage is used for all data persistence, simulating a backend. Keys follow the pattern `rentaApp*` (e.g., `rentaAppUsers`, `rentaAppBookings`, `rentaAppMessages`).

**Mock Data System**: `src/utils/mockData.js` initializes demo users and provides static data arrays for rides, houses, and services. Called on app mount via `initializeMockData()`.

### Context Providers

The application uses a nested context provider hierarchy in `App.js`:

```
AuthProvider
  └─ ThemeProvider
      └─ CurrencyProvider
          └─ LocationProvider
              └─ BookingProvider
                  └─ ChatProvider
```

**AuthContext** (`src/contexts/AuthContext.js`)
- Manages user authentication, registration, login/logout
- Stores user in localStorage (`rentaAppUser` and `rentaAppUsers`)
- Provides role checks: `isAdmin`, `isProvider`, `isCustomer`, `isAgent`
- User roles: 'admin', 'provider', 'customer', 'agent'

**BookingContext** (`src/contexts/BookingContext.js`)
- Manages booking lifecycle (create, cancel)
- Depends on AuthContext for user identification
- Stores bookings in localStorage (`rentaAppBookings`)

**ChatContext** (`src/contexts/ChatContext.js`)
- Handles support messaging system with auto-response simulation
- Tracks unread message count (shown in header)
- Stores messages in localStorage (`rentaAppMessages`)

**CurrencyContext** (`src/contexts/CurrencyContext.js`)
- Multi-currency support with conversion utilities
- Auto-detection based on location
- Supported currencies: USD, EUR, GBP, CAD, AUD, INR, JPY, CNY, MXN, BRL, UGX, KSHS, TSHS, NAIRA
- All base prices in mockData are in USD

**LocationContext** (`src/contexts/LocationContext.js`)
- User location tracking with distance calculation using Haversine formula
- Stores location in localStorage (`rentaAppUserLocation`)

**ThemeContext** (`src/contexts/ThemeContext.js`)
- Theme switching: 'default', 'dark', 'light'
- Sets `data-theme` attribute on document root
- Persists to localStorage (`rentaAppTheme`)

### Component Structure

**Pages** (`src/pages/`)
- Each page receives `onNavigate` prop for navigation
- Role-specific dashboards: `CustomerDashboard.js`, `ProviderDashboard.js`, `Admin.js`
- Authentication pages in `src/pages/auth/` subdirectory
- Module CSS files (e.g., `Home.module.css`) are co-located with components

**Common Components** (`src/components/common/`)
- `Button.js` - Variants: primary, secondary, ghost; Sizes: small, medium, large
- `Input.js`, `Card.js`, `Modal.js` - Reusable UI primitives
- All use CSS Modules for styling

**Layout Components** (`src/components/layout/`)
- `Header.js` - Main navigation with role-based menu items, theme selector, and support chat badge

### Utilities

**currency.js** - Currency conversion, formatting, and location-based currency detection
**location.js** - Country/state data, distance calculation (Haversine formula)
**mockData.js** - Mock user initialization and static data arrays for rides, houses, services

### User Roles & Access

The app has four user roles with different capabilities:
- **Admin**: Full system access including user management (admin panel)
- **Provider**: Can list and manage services/rentals
- **Customer**: Can browse and book services
- **Agent**: Support/customer service role

Demo accounts (password matches role):
- admin@renta.com / admin123
- provider@renta.com / provider123
- agent@renta.com / agent123

### Data Model Notes

**Bookings**: Include userId, userName, userEmail, status ('pending', 'cancelled'), and service-specific data
**Users**: Include role, location, currency preference, serviceCategories (for providers), verified status
**Messages**: Include userId, sender ('user'/'support'), text, attachments, timestamp, read status

All entities use timestamp-based IDs: `Date.now().toString()`

## Development Guidelines

### Navigation
Always use the `onNavigate` prop passed to page components. Pass page identifiers as strings: 'home', 'rides', 'houses', 'services', 'bookings', 'chat', 'profile', 'admin', 'customer-dashboard', 'provider-dashboard', 'support', 'login', 'register'.

### Context Usage
Import and use context hooks at the top level of components:
```javascript
const { user, isAuthenticated, login, logout } = useAuth();
const { selectedCurrency, format } = useCurrency();
const { bookings, createBooking } = useBooking();
```

### Styling
Use CSS Modules exclusively. Import styles as: `import styles from './Component.module.css'` and apply as `className={styles.className}`.

### LocalStorage Keys
All localStorage keys must use the prefix `rentaApp` to avoid conflicts. Existing keys:
- `rentaAppUser` - Current logged-in user
- `rentaAppUsers` - All registered users
- `rentaAppBookings` - All bookings
- `rentaAppMessages` - All chat messages
- `rentaAppCurrency` - User's currency preference
- `rentaAppTheme` - User's theme preference
- `rentaAppUserLocation` - User's location data
- `rentaAppInitialized` - Flag indicating mock data has been set up

### Multi-Currency Implementation
When displaying prices, always use the `format` function from `useCurrency()` context:
```javascript
const { format } = useCurrency();
format(price, 'USD') // Converts from USD base price to user's selected currency
```

### Adding New Pages
1. Create page component in `src/pages/` with `onNavigate` prop
2. Add case to `renderPage()` switch statement in `App.js`
3. Import the component at the top of `App.js`
4. Add navigation links in `Header.js` if needed

### Testing Notes
- Tests use React Testing Library and Jest
- `setupTests.js` imports `@testing-library/jest-dom` for custom matchers
- Default test in `App.test.js` is outdated and should be updated to reflect current app structure
