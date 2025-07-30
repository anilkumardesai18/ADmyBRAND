# 📊 ADmyBRAND Insights Dashboard

A modern, visually stunning analytics dashboard for digital marketing agencies built with Next.js 15, React 19, and TypeScript.

![ADmyBRAND Insights](https://img.shields.io/badge/Version-0.1.0-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-15.4.5-black.svg)
![React](https://img.shields.io/badge/React-19.1.0-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8.svg)

## 🌟 Features

### 📈 Dashboard Features
- **Overview Page** with key metrics cards (Revenue, Users, Conversions, Growth %)
- **Interactive Charts** - Multiple chart types (Line, Bar, Area, Donut/Pie) using Recharts
- **Advanced Data Table** with sorting, filtering, and pagination
- **Responsive Design** - Perfect on desktop, tablet, and mobile
- **Real-time Updates** with simulated data intervals
- **AI-Powered Insights** - Smart business recommendations and alerts

### 🎨 UI/UX Excellence
- **Modern Design System** with consistent colors, typography, and spacing
- **Beautiful Visual Hierarchy** with clear information architecture
- **Smooth Animations** using Framer Motion with micro-interactions
- **Dark/Light Mode Toggle** with system preference detection
- **Professional Loading States** with skeleton screens
- **Gradient Backgrounds** and modern card designs

### 🔧 Technical Features
- **Authentication System** with session management and demo credentials
- **Collapsible Sidebar** with hamburger menu and responsive behavior
- **Profile Management** with functional dropdown and navigation
- **Export Functionality** for data tables (CSV/PDF ready)
- **Advanced Filters** with date ranges and search capabilities
- **Goal Tracking** with progress visualization
- **Theme System** with persistent storage

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd admybrand-insights
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```
   
   > **Note:** The project uses Turbopack for faster development builds with `--turbopack` flag.

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Demo Credentials
- **Email:** `admin@admybrand.com`
- **Password:** `password`

### Demo Components
The project includes demo components to showcase implemented features:
- **ProfileDropdownDemo** - Demonstrates the functional profile dropdown with navigation
- **SidebarDemo** - Shows the collapsible sidebar functionality
- Access these demos through the main dashboard interface

## 📁 Project Structure

```
admybrand-insights/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── globals.css         # Global styles
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Dashboard home
│   │   ├── login/              # Authentication pages
│   │   ├── profile/            # User profile
│   │   ├── settings/           # Account settings
│   │   ├── help-support/       # Help center
│   │   ├── privacy/            # Privacy settings
│   │   └── reports/            # Analytics reports
│   │       ├── revenue/
│   │       ├── traffic/
│   │       ├── conversions/
│   │       └── engagement/
│   ├── components/             # Reusable components
│   │   ├── dashboard/          # Dashboard-specific components
│   │   │   ├── AnalyticsOverview.tsx
│   │   │   ├── ProfessionalCharts.tsx
│   │   │   ├── ProfessionalMetricCard.tsx
│   │   │   └── AdvancedDataTable.tsx
│   │   ├── demo/               # Demo components
│   │   │   ├── ProfileDropdownDemo.tsx
│   │   │   └── SidebarDemo.tsx
│   │   ├── layout/             # Layout components
│   │   │   ├── CollapsibleDashboardLayout.tsx
│   │   │   └── CollapsibleSidebar.tsx
│   │   ├── ui/                 # UI components
│   │   │   ├── ProfileDropdown.tsx
│   │   │   ├── EnhancedThemeToggle.tsx
│   │   │   ├── ThemeToggle.tsx
│   │   │   ├── NotificationDropdown.tsx
│   │   │   └── Skeleton.tsx
│   │   └── providers/          # Context providers
│   │       └── ThemeProvider.tsx
│   ├── contexts/               # React contexts
│   │   └── AuthContext.tsx     # Authentication context
│   ├── data/                   # Mock data
│   │   ├── chartData.json
│   │   └── enhancedTableData.json
│   └── styles/                 # Additional styles
│       ���── CollapsibleSidebar.css
├── public/                     # Static assets
├── docs/                       # Documentation
└── package.json
```

## 🎨 Design System

### Color Palette
```css
/* Primary Colors */
--primary: oklch(0.55 0.15 264.695);      /* Blue */
--secondary: oklch(0.6 0.15 162.48);      /* Green */
--accent: oklch(0.65 0.15 70.08);         /* Orange */

/* Gradients */
--gradient-primary: linear-gradient(135deg, #3B82F6, #8B5CF6);
--gradient-secondary: linear-gradient(135deg, #10B981, #3B82F6);
```

### Typography
- **Font Family:** Inter (Google Fonts)
- **Headings:** 700 weight, responsive sizing
- **Body:** 400 weight, 16px base
- **Captions:** 500 weight, 14px

### Spacing System
- **Base Unit:** 4px (0.25rem)
- **Scale:** 4, 8, 12, 16, 20, 24, 32, 40, 48, 64px
- **Container:** Max-width with responsive padding

## 📊 Components Documentation

### Dashboard Components

#### `AnalyticsOverview`
Main dashboard overview with key metrics and goals.
```tsx
<AnalyticsOverview />
```

#### `ProfessionalChart`
Interactive charts with multiple visualization types.
```tsx
<ProfessionalChart
  data={chartData}
  title="Revenue Analytics"
  dataKey="revenue"
  type="area"
  color="#3B82F6"
  showControls={true}
/>
```

#### `ProfessionalMetricCard`
Enhanced metric cards with progress indicators and targets.
```tsx
<ProfessionalMetricCard
  icon="attach_money"
  title="Total Revenue"
  value="$245,890"
  change={12.5}
  color="blue"
  subtitle="Monthly recurring revenue"
  target="$300,000"
  period="vs last month"
/>
```

#### `AdvancedDataTable`
Feature-rich data table with sorting and filtering.
```tsx
<AdvancedDataTable
  data={tableData}
  title="Campaign Performance"
  showFilters={true}
  showExport={true}
  showBulkActions={true}
/>
```

### Layout Components

#### `CollapsibleSidebar`
Responsive sidebar with hamburger menu functionality.
- **Expanded:** 280px width with icons and labels
- **Collapsed:** 88px width with icons only
- **Mobile:** Hidden by default with overlay

#### `ProfileDropdown`
User profile menu with navigation and logout functionality.
- Dynamic user data from AuthContext
- Navigation to profile pages (Profile, Settings, Help & Support, Privacy)
- Logout with session clearing

### Demo Components

#### `ProfileDropdownDemo`
Demonstrates the profile dropdown functionality with:
- Real user data display
- Navigation link testing
- Logout functionality showcase
- Responsive design examples

#### `SidebarDemo`
Shows the collapsible sidebar features with:
- Expand/collapse animations
- Mobile responsiveness
- Navigation structure

## 🔐 Authentication System

### AuthContext
Provides authentication state and methods throughout the app.

```tsx
const { user, login, logout, isAuthenticated } = useAuth();
```

### Features
- **Session Management:** localStorage-based token storage
- **User State:** Reactive user data with TypeScript interfaces
- **Route Protection:** Automatic redirects based on auth state
- **Demo Mode:** Built-in demo credentials for testing

### User Interface
- Login page with form validation
- Profile dropdown with user information
- Logout functionality with session clearing
- Protected routes and navigation

## 🎭 Theme System

### ThemeProvider
Manages dark/light mode with system preference detection.

```tsx
const { theme, setTheme } = useTheme();
```

### Features
- **System Detection:** Automatically detects user preference
- **Persistent Storage:** Remembers user choice
- **Smooth Transitions:** Animated theme switching
- **CSS Variables:** Consistent theming across components
- **Enhanced Toggle:** Beautiful theme switcher component

## 📱 Responsive Design

### Breakpoints
```css
/* Mobile First Approach */
sm: 640px    /* Small devices */
md: 768px    /* Medium devices */
lg: 1024px   /* Large devices */
xl: 1280px   /* Extra large devices */
2xl: 1536px  /* 2X large devices */
```

### Mobile Optimizations
- **Collapsible Sidebar:** Hamburger menu on mobile
- **Touch Targets:** Minimum 44px for touch interactions
- **Responsive Typography:** Fluid text scaling
- **Optimized Images:** Responsive image loading
- **Grid Layouts:** Responsive grid systems for all components

## 🎬 Animation System

### Framer Motion Integration
All animations use Framer Motion for smooth, performant transitions.

#### Common Patterns
```tsx
// Page transitions
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

// Staggered lists
const containerVariants = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};
```

### Animation Types
- **Page Transitions:** Smooth enter/exit animations
- **Micro-interactions:** Hover and click feedback
- **Loading States:** Skeleton screens and spinners
- **Data Visualization:** Animated chart rendering
- **Component Interactions:** Button hovers, card animations

## 📊 Data Management

### Mock Data Structure
```json
{
  "revenueOverTime": [
    { "month": "Jan", "revenue": 32000, "users": 1200 }
  ],
  "revenueByChannel": [
    { "channel": "Organic Search", "revenue": 18500 }
  ],
  "trafficSources": [
    { "name": "Organic Search", "value": 45, "color": "#3B82F6" }
  ]
}
```

### Data Flow
1. **Static Data:** JSON files in `/src/data/`
2. **Context Providers:** Global state management
3. **Component Props:** Type-safe data passing
4. **Real-time Updates:** Simulated with intervals

## 🛠 Development

### Available Scripts
```bash
npm run dev      # Start development server (with Turbopack)
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Code Quality
- **TypeScript:** Full type safety with strict mode
- **ESLint:** Code linting and formatting
- **Next.js 15:** Latest framework features
- **Modern React:** React 19 with latest hooks

### Performance Optimizations
- **Next.js 15:** Latest performance improvements
- **Turbopack:** Fast development builds
- **Image Optimization:** Next.js Image component
- **Code Splitting:** Automatic route-based splitting
- **Tree Shaking:** Unused code elimination

## 🚀 Deployment

### Build Process
```bash
npm run build
```

### Deployment Platforms
- **Vercel:** Recommended (zero-config)
- **Netlify:** Static site hosting
- **AWS:** S3 + CloudFront
- **Docker:** Containerized deployment

### Environment Variables
```env
NEXT_PUBLIC_APP_URL=https://your-domain.com
NEXT_PUBLIC_API_URL=https://api.your-domain.com
```

### Build Optimization
- Static generation for optimal performance
- Automatic image optimization
- CSS and JavaScript minification
- Font optimization with Google Fonts

## 🧪 Testing

### Testing Strategy
- **Unit Tests:** Component testing with Jest
- **Integration Tests:** Page and flow testing
- **E2E Tests:** Cypress or Playwright
- **Visual Tests:** Storybook integration

### Test Structure
```
tests/
├── __tests__/          # Unit tests
├── integration/        # Integration tests
├── e2e/               # End-to-end tests
└── __mocks__/         # Test mocks
```

## 📈 Performance Metrics

### Core Web Vitals
- **LCP:** < 2.5s (Largest Contentful Paint)
- **FID:** < 100ms (First Input Delay)
- **CLS:** < 0.1 (Cumulative Layout Shift)

### Optimization Features
- **Image Optimization:** Next.js Image component
- **Font Optimization:** Google Fonts with display=swap
- **Code Splitting:** Route-based and component-based
- **Caching:** Static generation and ISR

## 🔧 Customization

### Adding New Charts
1. Create chart component in `/src/components/dashboard/`
2. Add to `ProfessionalCharts.tsx` or create standalone
3. Update data structure in `/src/data/`
4. Add to dashboard layout

### Theme Customization
1. Update CSS variables in `globals.css`
2. Modify Tailwind config for new colors
3. Update component color mappings
4. Test in both light and dark modes

### Adding New Pages
1. Create page in `/src/app/`
2. Add navigation link to sidebar
3. Update TypeScript types if needed
4. Add to authentication flow if required

## 🤝 Contributing

### Development Workflow
1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

### Code Standards
- **TypeScript:** Strict mode enabled
- **Components:** Functional components with hooks
- **Styling:** Tailwind CSS classes
- **Animations:** Framer Motion for interactions

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js Team** for the amazing framework
- **Tailwind CSS** for the utility-first CSS framework
- **Framer Motion** for smooth animations
- **Recharts** for beautiful data visualizations
- **Vercel** for hosting and deployment platform

## 📞 Support

For support and questions:
- **Email:** support@admybrand.com
- **Documentation:** [docs.admybrand.com](https://docs.admybrand.com)
- **Issues:** [GitHub Issues](https://github.com/your-repo/issues)

---

**Built with ❤️ by the ADmyBRAND Team**

*Last updated: January 2025*
