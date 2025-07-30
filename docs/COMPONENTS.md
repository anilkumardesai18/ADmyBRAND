# 🧩 Components Documentation

## Component Library Overview

ADmyBRAND Insights uses a modular component architecture with reusable, type-safe components built with React, TypeScript, and Tailwind CSS.

## 📁 Component Structure

```
src/components/
├── dashboard/          # Dashboard-specific components
├── layout/            # Layout and navigation components  
├── ui/                # Base UI components
├── providers/         # Context providers
└── demo/              # Demo and documentation components
```

## 📊 Dashboard Components

### `AnalyticsOverview`

**Purpose:** Main dashboard overview with key metrics, goals, and quick actions.

**Props:**
```typescript
interface AnalyticsOverviewProps {
  // No props - uses internal state and mock data
}
```

**Features:**
- Key metrics cards (Revenue, Users, Conversion Rate, AOV)
- Goal progress tracking with animated progress bars
- Time period selector (7d, 30d, 90d, 1y)
- Quick action buttons
- Export functionality

**Usage:**
```tsx
import { AnalyticsOverview } from '@/components/dashboard/AnalyticsOverview';

<AnalyticsOverview />
```

**Animations:**
- Staggered card entrance animations
- Progress bar fill animations
- Hover effects on interactive elements

---

### `ProfessionalCharts`

**Purpose:** Interactive chart component supporting multiple visualization types.

**Props:**
```typescript
interface ProfessionalChartProps {
  data: ChartDataPoint[];
  title: string;
  dataKey: string;
  color?: string;
  type?: 'line' | 'bar' | 'area';
  showControls?: boolean;
  height?: number;
}

interface ChartDataPoint {
  [key: string]: string | number;
}
```

**Features:**
- Multiple chart types (Line, Bar, Area)
- Interactive controls (chart type switcher, time range)
- Fullscreen mode
- Custom tooltips
- Responsive design
- Dynamic X-axis detection

**Usage:**
```tsx
import { ProfessionalChart } from '@/components/dashboard/ProfessionalCharts';

<ProfessionalChart
  data={chartData.revenueOverTime}
  title="Revenue Analytics"
  dataKey="revenue"
  color="#3B82F6"
  type="area"
  showControls={true}
/>
```

**Chart Types:**
- **Line Chart:** Trend visualization with smooth curves
- **Bar Chart:** Categorical data comparison
- **Area Chart:** Filled area under line chart

---

### `AdvancedDataTable`

**Purpose:** Feature-rich data table with sorting, filtering, and pagination.

**Props:**
```typescript
interface AdvancedDataTableProps {
  data: any[];
  title: string;
  showFilters?: boolean;
  showExport?: boolean;
  showBulkActions?: boolean;
  pageSize?: number;
}
```

**Features:**
- Column sorting (ascending/descending)
- Global search filtering
- Pagination with page size options
- Bulk selection and actions
- Export functionality (CSV/PDF)
- Responsive table design
- Loading states

**Usage:**
```tsx
import { AdvancedDataTable } from '@/components/dashboard/AdvancedDataTable';

<AdvancedDataTable
  data={tableData}
  title="Campaign Performance Analytics"
  showFilters={true}
  showExport={true}
  showBulkActions={true}
/>
```

**Table Features:**
- **Sorting:** Click column headers to sort
- **Search:** Global search across all columns
- **Pagination:** Navigate through large datasets
- **Selection:** Bulk actions on selected rows

---

### `ProfessionalMetricCard`

**Purpose:** Enhanced metric display card with animations and progress indicators.

**Props:**
```typescript
interface ProfessionalMetricCardProps {
  icon: string;
  title: string;
  value: string;
  change: number;
  color: 'blue' | 'green' | 'purple' | 'orange';
  subtitle?: string;
  target?: string;
  period?: string;
  delay?: number;
}
```

**Features:**
- Animated value counting
- Change indicators (positive/negative)
- Progress towards target
- Icon with color theming
- Hover animations
- Responsive design

**Usage:**
```tsx
import { ProfessionalMetricCard } from '@/components/dashboard/ProfessionalMetricCard';

<ProfessionalMetricCard
  icon="attach_money"
  title="Total Revenue"
  value="$245,890"
  change={12.5}
  color="blue"
  subtitle="Monthly recurring revenue"
  target="$300,000"
  period="vs last month"
  delay={0.1}
/>
```

**Color Themes:**
- **Blue:** Primary metrics (Revenue, Views)
- **Green:** Growth metrics (Users, Sessions)
- **Purple:** Conversion metrics (Rate, Goals)
- **Orange:** Value metrics (AOV, LTV)

---

### `SkeletonCard`

**Purpose:** Loading placeholder for metric cards and content.

**Props:**
```typescript
interface SkeletonCardProps {
  className?: string;
  showIcon?: boolean;
  lines?: number;
}
```

**Features:**
- Animated shimmer effect
- Configurable layout
- Matches actual content dimensions
- Smooth transition to real content

**Usage:**
```tsx
import { SkeletonCard } from '@/components/dashboard/SkeletonCard';

{loading ? (
  <SkeletonCard showIcon={true} lines={3} />
) : (
  <MetricCard {...props} />
)}
```

## 🏗️ Layout Components

### `CollapsibleDashboardLayout`

**Purpose:** Main application layout with header, sidebar, and content area.

**Props:**
```typescript
interface DashboardLayoutProps {
  children: React.ReactNode;
}
```

**Features:**
- Responsive layout structure
- Header with search and user controls
- Content area with proper spacing
- Theme provider integration
- Authentication context

**Usage:**
```tsx
import { CollapsibleDashboardLayout } from '@/components/layout/CollapsibleDashboardLayout';

<CollapsibleDashboardLayout>
  {children}
</CollapsibleDashboardLayout>
```

---

### `CollapsibleSidebar`

**Purpose:** Navigation sidebar with collapsible functionality.

**Props:**
```typescript
interface SidebarProps {
  className?: string;
}
```

**Features:**
- Collapsible design (280px ↔ 88px)
- Hamburger menu toggle
- Active route highlighting
- Smooth animations
- User profile section (mobile)
- Icon-only mode when collapsed

**Usage:**
```tsx
import { CollapsibleSidebar } from '@/components/layout/CollapsibleSidebar';

<CollapsibleSidebar />
```

**States:**
- **Expanded:** Full width with icons and labels
- **Collapsed:** Narrow width with icons only
- **Mobile:** Hidden by default with overlay

## 🎨 UI Components

### `ProfileDropdown`

**Purpose:** User profile menu with navigation and authentication controls.

**Props:**
```typescript
// No props - uses AuthContext for user data
```

**Features:**
- Dynamic user information display
- Navigation links to profile pages
- Logout functionality with session clearing
- Responsive design
- Smooth animations

**Usage:**
```tsx
import { ProfileDropdown } from '@/components/ui/ProfileDropdown';

<ProfileDropdown />
```

**Menu Items:**
- **Profile:** Navigate to user profile page
- **Account Settings:** Navigate to settings page
- **Help & Support:** Navigate to help center
- **Privacy & Security:** Navigate to privacy settings
- **Sign Out:** Logout with session clearing

---

### `EnhancedThemeToggle`

**Purpose:** Theme switcher with light, dark, and system modes.

**Props:**
```typescript
interface ThemeToggleProps {
  className?: string;
}
```

**Features:**
- Three theme modes (Light, Dark, System)
- System preference detection
- Smooth theme transitions
- Icon animations
- Persistent storage

**Usage:**
```tsx
import { EnhancedThemeToggle } from '@/components/ui/EnhancedThemeToggle';

<EnhancedThemeToggle />
```

**Theme Modes:**
- **Light:** Light color scheme
- **Dark:** Dark color scheme  
- **System:** Follows OS preference

---

### `NotificationDropdown`

**Purpose:** Notification center with message management.

**Props:**
```typescript
interface NotificationDropdownProps {
  className?: string;
}
```

**Features:**
- Notification list with timestamps
- Mark as read functionality
- Notification categories
- Real-time updates (simulated)
- Responsive design

**Usage:**
```tsx
import { NotificationDropdown } from '@/components/ui/NotificationDropdown';

<NotificationDropdown />
```

## 🔧 Provider Components

### `ThemeProvider`

**Purpose:** Global theme state management and CSS variable injection.

**Props:**
```typescript
interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: 'light' | 'dark' | 'system';
  storageKey?: string;
}
```

**Features:**
- Theme state management
- CSS variable injection
- System preference detection
- Local storage persistence
- SSR compatibility

**Usage:**
```tsx
import { ThemeProvider } from '@/components/providers/ThemeProvider';

<ThemeProvider defaultTheme="system" storageKey="ui-theme">
  <App />
</ThemeProvider>
```

## 🎭 Animation Patterns

### Common Animation Variants

```typescript
// Page entrance animations
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

// Staggered list animations
const containerVariants = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 }
};

// Hover animations
const hoverVariants = {
  hover: { 
    scale: 1.02, 
    y: -2,
    transition: { duration: 0.2 }
  },
  tap: { scale: 0.98 }
};
```

### Animation Guidelines

1. **Entrance Animations:** 0.3-0.6s duration
2. **Hover Effects:** 0.2s duration
3. **Loading States:** Infinite loops with easing
4. **Page Transitions:** 0.4s with spring physics
5. **Micro-interactions:** 0.1-0.2s for immediate feedback

## 🎨 Styling Patterns

### Tailwind CSS Classes

```typescript
// Card styling
const cardClasses = "bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700";

// Button styling
const buttonClasses = "px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors";

// Text styling
const headingClasses = "text-2xl font-bold text-slate-900 dark:text-slate-100";
const bodyClasses = "text-slate-600 dark:text-slate-400";
```

### Color System

```typescript
// Primary colors
const colors = {
  blue: {
    50: '#eff6ff',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8'
  },
  slate: {
    50: '#f8fafc',
    600: '#475569',
    800: '#1e293b',
    900: '#0f172a'
  }
};
```

## 🔄 State Management Patterns

### Component State

```typescript
// UI state
const [isOpen, setIsOpen] = useState(false);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);

// Form state
const [formData, setFormData] = useState(initialState);
const [errors, setErrors] = useState<Record<string, string>>({});
```

### Context Usage

```typescript
// Authentication
const { user, login, logout, isAuthenticated } = useAuth();

// Theme
const { theme, setTheme } = useTheme();
```

## 📱 Responsive Design Patterns

### Breakpoint Usage

```tsx
// Responsive grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

// Responsive text
<h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">

// Responsive spacing
<div className="p-4 md:p-6 lg:p-8">

// Responsive visibility
<div className="hidden md:block">Desktop only</div>
<div className="block md:hidden">Mobile only</div>
```

### Mobile Optimizations

```typescript
// Touch targets
const touchTarget = "min-h-[44px] min-w-[44px]";

// Mobile navigation
const mobileNav = "fixed bottom-0 left-0 right-0 md:relative";

// Mobile typography
const mobileText = "text-sm md:text-base lg:text-lg";
```

## 🧪 Testing Patterns

### Component Testing

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { MetricCard } from './MetricCard';

describe('MetricCard', () => {
  it('displays metric value correctly', () => {
    render(
      <MetricCard
        title="Revenue"
        value="$1,000"
        change={10}
        icon="attach_money"
        color="blue"
      />
    );
    
    expect(screen.getByText('$1,000')).toBeInTheDocument();
    expect(screen.getByText('Revenue')).toBeInTheDocument();
  });

  it('shows positive change indicator', () => {
    render(
      <MetricCard
        title="Revenue"
        value="$1,000"
        change={10}
        icon="attach_money"
        color="blue"
      />
    );
    
    expect(screen.getByText('+10%')).toBeInTheDocument();
  });
});
```

### Integration Testing

```typescript
import { render, screen, waitFor } from '@testing-library/react';
import { Dashboard } from './Dashboard';
import { AuthProvider } from '@/contexts/AuthContext';

describe('Dashboard Integration', () => {
  it('loads dashboard with user data', async () => {
    render(
      <AuthProvider>
        <Dashboard />
      </AuthProvider>
    );
    
    await waitFor(() => {
      expect(screen.getByText('Analytics Dashboard')).toBeInTheDocument();
    });
  });
});
```

This component documentation provides comprehensive information for developers working with the ADmyBRAND Insights component library.