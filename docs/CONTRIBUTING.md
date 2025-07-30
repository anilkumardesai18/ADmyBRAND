# 🤝 Contributing to ADmyBRAND Insights

Thank you for your interest in contributing to ADmyBRAND Insights! This document provides guidelines and information for contributors.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Component Guidelines](#component-guidelines)
- [Testing Guidelines](#testing-guidelines)
- [Documentation](#documentation)
- [Pull Request Process](#pull-request-process)
- [Issue Reporting](#issue-reporting)

## 📜 Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inclusive experience for everyone. We pledge to:

- Use welcoming and inclusive language
- Respect differing viewpoints and experiences
- Accept constructive criticism gracefully
- Focus on what is best for the community
- Show empathy towards other community members

### Unacceptable Behavior

- Harassment, discrimination, or offensive comments
- Personal attacks or trolling
- Publishing private information without permission
- Any conduct that would be inappropriate in a professional setting

## 🚀 Getting Started

### Prerequisites

- **Node.js 18+** 
- **npm or yarn**
- **Git**
- **Code editor** (VS Code recommended)

### Development Setup

1. **Fork the repository**
   ```bash
   # Fork on GitHub, then clone your fork
   git clone https://github.com/your-username/admybrand-insights.git
   cd admybrand-insights
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment**
   ```bash
   # Copy environment template
   cp .env.example .env.local
   
   # Edit environment variables as needed
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Verify setup**
   - Open [http://localhost:3000](http://localhost:3000)
   - Ensure all features work correctly
   - Check console for any errors

### Recommended VS Code Extensions

```json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "ms-vscode.vscode-typescript-next",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense"
  ]
}
```

## 🔄 Development Workflow

### Branch Strategy

```
main
├── develop
├── feature/feature-name
├── bugfix/bug-description
├── hotfix/critical-fix
└── release/version-number
```

### Workflow Steps

1. **Create a branch**
   ```bash
   # For new features
   git checkout -b feature/add-new-chart-type
   
   # For bug fixes
   git checkout -b bugfix/fix-table-sorting
   
   # For documentation
   git checkout -b docs/update-api-docs
   ```

2. **Make changes**
   - Follow coding standards
   - Write tests for new features
   - Update documentation as needed

3. **Commit changes**
   ```bash
   # Stage changes
   git add .
   
   # Commit with descriptive message
   git commit -m "feat: add donut chart component with animations"
   ```

4. **Push and create PR**
   ```bash
   git push origin feature/add-new-chart-type
   # Create pull request on GitHub
   ```

### Commit Message Convention

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**
```bash
feat(dashboard): add real-time data updates
fix(charts): resolve tooltip positioning issue
docs(api): update authentication endpoints
style(components): improve button hover animations
refactor(utils): optimize data processing functions
test(dashboard): add unit tests for metric cards
chore(deps): update dependencies to latest versions
```

## 📝 Coding Standards

### TypeScript Guidelines

```typescript
// ✅ Good: Use interfaces for object types
interface UserProps {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'viewer';
}

// ✅ Good: Use type for unions and primitives
type Theme = 'light' | 'dark' | 'system';
type Status = 'loading' | 'success' | 'error';

// ✅ Good: Use generic types
interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// ❌ Avoid: Using any type
const data: any = fetchData(); // Bad

// ✅ Good: Use proper typing
const data: UserData = fetchData(); // Good
```

### React Component Guidelines

```typescript
// ✅ Good: Functional component with proper typing
interface MetricCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: string;
  color: 'blue' | 'green' | 'purple' | 'orange';
}

export function MetricCard({ 
  title, 
  value, 
  change, 
  icon, 
  color 
}: MetricCardProps) {
  return (
    <div className="metric-card">
      {/* Component content */}
    </div>
  );
}

// ✅ Good: Use React.memo for performance
export const MetricCard = React.memo(function MetricCard(props: MetricCardProps) {
  // Component implementation
});

// ✅ Good: Custom hooks for logic
function useMetricData(metricId: string) {
  const [data, setData] = useState<MetricData | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Fetch data logic
  }, [metricId]);
  
  return { data, loading };
}
```

### Styling Guidelines

```typescript
// ✅ Good: Use Tailwind CSS classes
<div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">

// ✅ Good: Conditional classes with clsx
import clsx from 'clsx';

const buttonClasses = clsx(
  'px-4 py-2 rounded-lg font-medium transition-colors',
  {
    'bg-blue-600 text-white': variant === 'primary',
    'bg-gray-200 text-gray-800': variant === 'secondary',
    'opacity-50 cursor-not-allowed': disabled,
  }
);

// ✅ Good: CSS variables for theming
:root {
  --color-primary: oklch(0.55 0.15 264.695);
  --color-secondary: oklch(0.6 0.15 162.48);
}

// ❌ Avoid: Inline styles (except for dynamic values)
<div style={{ backgroundColor: 'red' }}> // Bad

// ✅ Good: Tailwind classes
<div className="bg-red-500"> // Good
```

### File Organization

```
src/
├── components/
│   ├── ui/              # Base UI components
│   ├── dashboard/       # Dashboard-specific components
│   ├── layout/          # Layout components
│   └── providers/       # Context providers
├── hooks/               # Custom React hooks
├── utils/               # Utility functions
├── types/               # TypeScript type definitions
├── contexts/            # React contexts
├── data/                # Mock data and constants
└── styles/              # Additional CSS files
```

### Naming Conventions

```typescript
// ✅ Components: PascalCase
export function MetricCard() {}
export function AdvancedDataTable() {}

// ✅ Files: PascalCase for components
MetricCard.tsx
AdvancedDataTable.tsx

// ✅ Hooks: camelCase starting with 'use'
export function useAuth() {}
export function useTheme() {}

// ✅ Constants: UPPER_SNAKE_CASE
export const API_BASE_URL = 'https://api.example.com';
export const DEFAULT_PAGE_SIZE = 10;

// ✅ Variables and functions: camelCase
const userData = fetchUserData();
const handleSubmit = () => {};

// ✅ Types and interfaces: PascalCase
interface UserData {}
type ApiResponse<T> = {};
```

## 🧩 Component Guidelines

### Component Structure

```typescript
// ComponentName.tsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

// 1. Types and interfaces
interface ComponentProps {
  // Props definition
}

// 2. Constants (if any)
const ANIMATION_DURATION = 0.3;

// 3. Main component
export function ComponentName({ 
  prop1, 
  prop2, 
  ...props 
}: ComponentProps) {
  // 4. State and hooks
  const [state, setState] = useState(initialValue);
  
  // 5. Event handlers
  const handleClick = () => {
    // Handler logic
  };
  
  // 6. Computed values
  const computedValue = useMemo(() => {
    return expensiveCalculation(prop1);
  }, [prop1]);
  
  // 7. Effects
  useEffect(() => {
    // Effect logic
  }, [dependencies]);
  
  // 8. Render
  return (
    <motion.div
      className={clsx('base-classes', {
        'conditional-class': condition
      })}
      {...props}
    >
      {/* Component content */}
    </motion.div>
  );
}

// 9. Default props (if needed)
ComponentName.defaultProps = {
  prop2: 'default-value'
};
```

### Animation Guidelines

```typescript
// ✅ Good: Consistent animation variants
const fadeInVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

const staggerVariants = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

// ✅ Good: Reusable animation components
export function FadeIn({ children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}
```

### Accessibility Guidelines

```typescript
// ✅ Good: Proper ARIA labels
<button
  aria-label="Close modal"
  aria-expanded={isOpen}
  onClick={handleClose}
>
  <CloseIcon />
</button>

// ✅ Good: Semantic HTML
<main role="main">
  <section aria-labelledby="dashboard-heading">
    <h1 id="dashboard-heading">Dashboard</h1>
  </section>
</main>

// ✅ Good: Keyboard navigation
const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === 'Enter' || event.key === ' ') {
    handleClick();
  }
};

// ✅ Good: Focus management
useEffect(() => {
  if (isOpen) {
    modalRef.current?.focus();
  }
}, [isOpen]);
```

## 🧪 Testing Guidelines

### Unit Testing

```typescript
// ComponentName.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { MetricCard } from './MetricCard';

describe('MetricCard', () => {
  const defaultProps = {
    title: 'Revenue',
    value: '$1,000',
    icon: 'attach_money',
    color: 'blue' as const
  };

  it('renders metric information correctly', () => {
    render(<MetricCard {...defaultProps} />);
    
    expect(screen.getByText('Revenue')).toBeInTheDocument();
    expect(screen.getByText('$1,000')).toBeInTheDocument();
  });

  it('displays change indicator when provided', () => {
    render(<MetricCard {...defaultProps} change={10} />);
    
    expect(screen.getByText('+10%')).toBeInTheDocument();
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    render(<MetricCard {...defaultProps} onClick={handleClick} />);
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### Integration Testing

```typescript
// Dashboard.integration.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import { Dashboard } from './Dashboard';
import { AuthProvider } from '@/contexts/AuthContext';

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <AuthProvider>
      <ThemeProvider>
        {component}
      </ThemeProvider>
    </AuthProvider>
  );
};

describe('Dashboard Integration', () => {
  it('loads dashboard data correctly', async () => {
    renderWithProviders(<Dashboard />);
    
    await waitFor(() => {
      expect(screen.getByText('Analytics Dashboard')).toBeInTheDocument();
    });
    
    expect(screen.getByText('Total Revenue')).toBeInTheDocument();
    expect(screen.getByText('Active Users')).toBeInTheDocument();
  });
});
```

### Testing Best Practices

1. **Test user behavior, not implementation**
2. **Use descriptive test names**
3. **Follow AAA pattern (Arrange, Act, Assert)**
4. **Mock external dependencies**
5. **Test error states and edge cases**

## 📚 Documentation

### Component Documentation

```typescript
/**
 * MetricCard displays a key performance indicator with optional change indicator
 * 
 * @example
 * ```tsx
 * <MetricCard
 *   title="Total Revenue"
 *   value="$245,890"
 *   change={12.5}
 *   icon="attach_money"
 *   color="blue"
 * />
 * ```
 */
interface MetricCardProps {
  /** The metric title/label */
  title: string;
  /** The metric value to display */
  value: string | number;
  /** Optional percentage change from previous period */
  change?: number;
  /** Material Icons icon name */
  icon: string;
  /** Color theme for the card */
  color: 'blue' | 'green' | 'purple' | 'orange';
  /** Optional click handler */
  onClick?: () => void;
}
```

### README Updates

When adding new features, update the relevant documentation:

- **README.md** - Main project documentation
- **COMPONENTS.md** - Component library documentation
- **API.md** - API documentation
- **DEPLOYMENT.md** - Deployment instructions

## 🔄 Pull Request Process

### Before Submitting

1. **Run tests**
   ```bash
   npm run test
   npm run lint
   npm run build
   ```

2. **Update documentation**
   - Add/update component documentation
   - Update README if needed
   - Add changelog entry

3. **Self-review**
   - Check code quality
   - Verify functionality
   - Test on different screen sizes

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests added/updated
- [ ] Integration tests added/updated
- [ ] Manual testing completed

## Screenshots
(If applicable)

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] Tests pass
```

### Review Process

1. **Automated checks** must pass
2. **Code review** by maintainers
3. **Testing** in review environment
4. **Approval** from at least one maintainer
5. **Merge** to main branch

## 🐛 Issue Reporting

### Bug Reports

Use the bug report template:

```markdown
**Describe the bug**
A clear description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment:**
- OS: [e.g. iOS]
- Browser [e.g. chrome, safari]
- Version [e.g. 22]

**Additional context**
Any other context about the problem.
```

### Feature Requests

Use the feature request template:

```markdown
**Is your feature request related to a problem?**
A clear description of what the problem is.

**Describe the solution you'd like**
A clear description of what you want to happen.

**Describe alternatives you've considered**
Alternative solutions or features you've considered.

**Additional context**
Any other context or screenshots about the feature request.
```

## 🏆 Recognition

Contributors will be recognized in:
- **CHANGELOG.md** - Feature contributions
- **README.md** - Major contributors
- **GitHub Contributors** - All contributors

## 📞 Getting Help

- **Discord:** [Join our Discord](https://discord.gg/admybrand)
- **Email:** developers@admybrand.com
- **GitHub Discussions:** Use for questions and discussions

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to ADmyBRAND Insights! 🎉