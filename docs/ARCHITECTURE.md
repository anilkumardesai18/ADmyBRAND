# 🏗️ Architecture Documentation

## System Architecture Overview

ADmyBRAND Insights follows a modern, scalable architecture built on Next.js 15 with the App Router pattern.

## 📐 Architecture Patterns

### 1. **Component-Based Architecture**
```
┌─────────────────────────────────────┐
│           Presentation Layer        │
│  ┌─────────────┐ ┌─────────────┐   │
│  │    Pages    │ │ Components  │   │
│  └─────────────┘ └─────────────┘   │
└─────────────────────────────────────┘
┌─────────────────────────────────────┐
│            Business Layer           │
│  ┌─────────────┐ ┌─────────────┐   │
│  │  Contexts   │ │   Hooks     │   │
│  └─────────────┘ └─────────────┘   │
└─────────────────────────────────────┘
┌─────────────────────────────────────┐
│             Data Layer              │
│  ┌─────────────┐ ┌─────────────┐   │
│  │ Mock Data   │ │   Types     │   │
│  └─────────────┘ └─────────────┘   │
└─────────────────────────────────────┘
```

### 2. **Next.js App Router Structure**
```
app/
├── layout.tsx          # Root layout with providers
├── page.tsx            # Dashboard home
├── globals.css         # Global styles
├── (auth)/            # Route groups
│   ├── login/
│   └── register/
├── (dashboard)/       # Protected routes
│   ├── profile/
│   ├── settings/
│   └── reports/
└── api/               # API routes (future)
```

## 🔧 Core Systems

### Authentication System
```typescript
interface AuthFlow {
  Login → AuthContext → LocalStorage → Router
  Logout → ClearStorage → Redirect → Login
  Protected → CheckAuth → Redirect/Allow
}
```

**Components:**
- `AuthContext.tsx` - Global authentication state
- `ProfileDropdown.tsx` - User interface
- `login/page.tsx` - Authentication form

### Theme System
```typescript
interface ThemeFlow {
  SystemDetection → ThemeProvider → CSS Variables → Components
  UserToggle → LocalStorage → ThemeUpdate → Rerender
}
```

**Components:**
- `ThemeProvider.tsx` - Theme state management
- `EnhancedThemeToggle.tsx` - Theme switcher UI
- `globals.css` - CSS variable definitions

### Layout System
```typescript
interface LayoutFlow {
  RootLayout → AuthProvider → ThemeProvider → DashboardLayout
  Sidebar → Navigation → Content → ProfileDropdown
}
```

**Components:**
- `layout.tsx` - Root application layout
- `CollapsibleDashboardLayout.tsx` - Main dashboard wrapper
- `CollapsibleSidebar.tsx` - Navigation sidebar

## 📊 Data Architecture

### Data Flow Pattern
```
Mock Data (JSON) → Context/State → Components → UI
     ↓
Real API (Future) �� Context/State → Components → UI
```

### State Management
```typescript
// Global State (React Context)
AuthContext: User authentication and session
ThemeContext: Theme preferences and system detection

// Local State (useState/useReducer)
Component State: UI interactions and temporary data
Form State: Input handling and validation

// Server State (Future)
React Query/SWR: API data fetching and caching
```

### Data Types
```typescript
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  lastLogin?: string;
}

interface ChartData {
  [key: string]: string | number;
}

interface MetricData {
  value: string | number;
  change: number;
  target?: string | number;
  period: string;
}
```

## 🎨 UI Architecture

### Design System Hierarchy
```
Design Tokens (CSS Variables)
    ↓
Base Components (UI primitives)
    ↓
Composite Components (Dashboard widgets)
    ↓
Page Components (Full layouts)
```

### Component Categories

#### 1. **Base Components** (`/ui/`)
- `EnhancedThemeToggle.tsx` - Theme switcher
- `ProfileDropdown.tsx` - User menu
- `NotificationDropdown.tsx` - Notifications

#### 2. **Dashboard Components** (`/dashboard/`)
- `AnalyticsOverview.tsx` - Main dashboard
- `ProfessionalCharts.tsx` - Chart widgets
- `AdvancedDataTable.tsx` - Data tables
- `MetricCard.tsx` - Metric displays

#### 3. **Layout Components** (`/layout/`)
- `CollapsibleDashboardLayout.tsx` - Main layout
- `CollapsibleSidebar.tsx` - Navigation sidebar

### Styling Architecture
```scss
// Global Styles (globals.css)
CSS Variables → Tailwind Config → Component Classes

// Component Styles
Tailwind Classes → CSS Modules (if needed) → Inline Styles (rare)

// Animation Styles
Framer Motion → CSS Transitions → CSS Animations
```

## 🔄 State Management Patterns

### Context Pattern
```typescript
// Provider Pattern
<AuthProvider>
  <ThemeProvider>
    <App />
  </ThemeProvider>
</AuthProvider>

// Consumer Pattern
const { user, login, logout } = useAuth();
const { theme, setTheme } = useTheme();
```

### Component State Pattern
```typescript
// Local UI State
const [isOpen, setIsOpen] = useState(false);
const [loading, setLoading] = useState(true);

// Form State
const [formData, setFormData] = useState(initialState);
const [errors, setErrors] = useState({});
```

## 🚀 Performance Architecture

### Optimization Strategies

#### 1. **Code Splitting**
```typescript
// Route-based splitting (automatic with App Router)
app/dashboard/page.tsx → dashboard.chunk.js
app/reports/page.tsx → reports.chunk.js

// Component-based splitting
const HeavyComponent = lazy(() => import('./HeavyComponent'));
```

#### 2. **Image Optimization**
```typescript
// Next.js Image component
<Image
  src="/chart.png"
  alt="Chart"
  width={800}
  height={400}
  priority={true}
  placeholder="blur"
/>
```

#### 3. **Bundle Optimization**
```typescript
// Tree shaking
import { motion } from 'framer-motion'; // ✅ Good
import * as FramerMotion from 'framer-motion'; // ❌ Bad

// Dynamic imports
const Chart = dynamic(() => import('./Chart'), {
  loading: () => <ChartSkeleton />
});
```

## 🔐 Security Architecture

### Authentication Security
```typescript
// Token-based authentication
localStorage.setItem('authToken', token); // Client-side storage
httpOnly cookies (recommended for production) // Server-side storage

// Route protection
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Redirect to="/login" />;
};
```

### Data Security
```typescript
// Input validation
const validateInput = (input: string) => {
  return input.trim().length > 0 && input.length < 100;
};

// XSS prevention
const sanitizeHTML = (html: string) => {
  return DOMPurify.sanitize(html);
};
```

## 📱 Responsive Architecture

### Breakpoint Strategy
```typescript
// Mobile-first approach
const breakpoints = {
  sm: '640px',   // Small devices
  md: '768px',   // Medium devices  
  lg: '1024px',  // Large devices
  xl: '1280px',  // Extra large devices
  '2xl': '1536px' // 2X large devices
};

// Component responsiveness
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  {/* Responsive grid */}
</div>
```

### Layout Adaptation
```typescript
// Sidebar behavior
Desktop: Always visible, collapsible
Tablet: Collapsible with overlay
Mobile: Hidden by default, hamburger menu

// Navigation patterns
Desktop: Full navigation with labels
Mobile: Icon-only navigation with tooltips
```

## 🧪 Testing Architecture

### Testing Strategy
```
Unit Tests (Jest + React Testing Library)
    ↓
Integration Tests (Testing Library)
    ↓
E2E Tests (Cypress/Playwright)
    ↓
Visual Tests (Storybook + Chromatic)
```

### Test Structure
```typescript
// Component testing
describe('MetricCard', () => {
  it('displays metric value correctly', () => {
    render(<MetricCard value="$1,000" />);
    expect(screen.getByText('$1,000')).toBeInTheDocument();
  });
});

// Integration testing
describe('Dashboard Flow', () => {
  it('loads dashboard data correctly', async () => {
    render(<Dashboard />);
    await waitFor(() => {
      expect(screen.getByText('Total Revenue')).toBeInTheDocument();
    });
  });
});
```

## 🔄 Future Architecture Considerations

### API Integration
```typescript
// Replace mock data with real API
const useChartData = () => {
  return useQuery('chartData', fetchChartData, {
    refetchInterval: 30000, // Real-time updates
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
```

### State Management Evolution
```typescript
// Consider Zustand for complex state
import { create } from 'zustand';

const useStore = create((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));
```

### Micro-frontend Architecture
```typescript
// Module federation for large teams
const RemoteComponent = React.lazy(() => import('remote/Component'));

// Independent deployment of dashboard modules
Dashboard → Analytics Module + Reports Module + Settings Module
```

## 📊 Monitoring Architecture

### Performance Monitoring
```typescript
// Web Vitals tracking
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

getCLS(console.log);
getFID(console.log);
getFCP(console.log);
getLCP(console.log);
getTTFB(console.log);
```

### Error Tracking
```typescript
// Error boundaries
class ErrorBoundary extends React.Component {
  componentDidCatch(error, errorInfo) {
    // Log to monitoring service
    console.error('Dashboard Error:', error, errorInfo);
  }
}
```

## 🔧 Development Architecture

### Development Workflow
```
Feature Branch → Development → Testing → Code Review → Main Branch
     ↓              ↓           ↓          ↓           ↓
Local Dev → Preview Deploy → Test Suite → PR Review → Production
```

### Build Pipeline
```typescript
// Development
npm run dev → Next.js Dev Server → Hot Reload → Browser

// Production
npm run build → Next.js Build → Static Generation → CDN Deploy
```

This architecture provides a solid foundation for scaling the ADmyBRAND Insights dashboard while maintaining performance, security, and developer experience.