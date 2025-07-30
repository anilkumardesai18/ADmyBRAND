# 🚀 Deployment Guide

## Deployment Overview

ADmyBRAND Insights is built with Next.js 15 and can be deployed to various platforms. This guide covers deployment strategies, optimization, and best practices.

## 🏗️ Build Process

### Production Build

```bash
# Install dependencies
npm install

# Run production build
npm run build

# Start production server (for Node.js deployments)
npm start
```

### Build Output
```
.next/
├── static/           # Static assets with hashing
├── server/           # Server-side code
└── standalone/       # Self-contained deployment (if enabled)
```

### Build Optimization

```javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable standalone output for containerized deployments
  output: 'standalone',
  
  // Image optimization
  images: {
    domains: ['example.com'],
    formats: ['image/webp', 'image/avif'],
  },
  
  // Compression
  compress: true,
  
  // Bundle analyzer (development)
  ...(process.env.ANALYZE === 'true' && {
    webpack: (config) => {
      config.plugins.push(new BundleAnalyzerPlugin());
      return config;
    },
  }),
};

module.exports = nextConfig;
```

## ☁️ Platform Deployments

### 1. Vercel (Recommended)

**Why Vercel:**
- Zero-config deployment
- Automatic HTTPS
- Global CDN
- Preview deployments
- Built-in analytics

**Deployment Steps:**

1. **Connect Repository**
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Login and deploy
   vercel login
   vercel
   ```

2. **Environment Variables**
   ```bash
   # Set environment variables
   vercel env add NEXT_PUBLIC_APP_URL
   vercel env add NEXT_PUBLIC_API_URL
   ```

3. **Custom Domain**
   ```bash
   # Add custom domain
   vercel domains add yourdomain.com
   vercel alias your-project.vercel.app yourdomain.com
   ```

**Vercel Configuration:**
```json
// vercel.json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "regions": ["iad1", "sfo1"],
  "functions": {
    "app/api/**/*.ts": {
      "maxDuration": 30
    }
  }
}
```

### 2. Netlify

**Deployment Steps:**

1. **Build Settings**
   ```bash
   # Build command
   npm run build
   
   # Publish directory
   .next
   ```

2. **Netlify Configuration**
   ```toml
   # netlify.toml
   [build]
     command = "npm run build"
     publish = ".next"
   
   [build.environment]
     NODE_VERSION = "18"
   
   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```

### 3. AWS (S3 + CloudFront)

**Static Export Setup:**
```javascript
// next.config.js
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
};
```

**Deployment Script:**
```bash
#!/bin/bash
# deploy-aws.sh

# Build static export
npm run build

# Upload to S3
aws s3 sync out/ s3://your-bucket-name --delete

# Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id YOUR_DISTRIBUTION_ID --paths "/*"
```

### 4. Docker Deployment

**Dockerfile:**
```dockerfile
# Dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

**Docker Compose:**
```yaml
# docker-compose.yml
version: '3.8'

services:
  admybrand-insights:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - NEXT_PUBLIC_APP_URL=https://yourdomain.com
    restart: unless-stopped
    
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - admybrand-insights
    restart: unless-stopped
```

### 5. Kubernetes Deployment

**Deployment YAML:**
```yaml
# k8s-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: admybrand-insights
spec:
  replicas: 3
  selector:
    matchLabels:
      app: admybrand-insights
  template:
    metadata:
      labels:
        app: admybrand-insights
    spec:
      containers:
      - name: admybrand-insights
        image: your-registry/admybrand-insights:latest
        ports:
        - containerPort: 3000
        env:
        - name: NODE_ENV
          value: "production"
        - name: NEXT_PUBLIC_APP_URL
          value: "https://yourdomain.com"
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
---
apiVersion: v1
kind: Service
metadata:
  name: admybrand-insights-service
spec:
  selector:
    app: admybrand-insights
  ports:
  - port: 80
    targetPort: 3000
  type: LoadBalancer
```

## 🔧 Environment Configuration

### Environment Variables

```bash
# .env.production
NEXT_PUBLIC_APP_URL=https://yourdomain.com
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
NEXT_PUBLIC_ANALYTICS_ID=GA_MEASUREMENT_ID

# Database (if using)
DATABASE_URL=postgresql://user:password@host:port/database

# Authentication (if using external auth)
NEXTAUTH_URL=https://yourdomain.com
NEXTAUTH_SECRET=your-secret-key

# External APIs
STRIPE_SECRET_KEY=sk_live_...
SENDGRID_API_KEY=SG...
```

### Environment-Specific Configs

```javascript
// config/environments.js
const environments = {
  development: {
    apiUrl: 'http://localhost:3001/api',
    debug: true,
  },
  staging: {
    apiUrl: 'https://staging-api.yourdomain.com',
    debug: true,
  },
  production: {
    apiUrl: 'https://api.yourdomain.com',
    debug: false,
  }
};

export const config = environments[process.env.NODE_ENV || 'development'];
```

## 🔒 Security Configuration

### Security Headers

```javascript
// next.config.js
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin'
  }
];

module.exports = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      }
    ];
  }
};
```

### Content Security Policy

```javascript
// CSP configuration
const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' *.googletagmanager.com;
  child-src *.youtube.com *.google.com *.twitter.com;
  style-src 'self' 'unsafe-inline' *.googleapis.com;
  img-src * blob: data:;
  media-src 'none';
  connect-src *;
  font-src 'self' *.googleapis.com *.gstatic.com;
`;

const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy.replace(/\n/g, '')
  }
];
```

## 📊 Performance Optimization

### Bundle Analysis

```bash
# Analyze bundle size
npm install --save-dev @next/bundle-analyzer

# Add to package.json
"analyze": "ANALYZE=true npm run build"

# Run analysis
npm run analyze
```

### Image Optimization

```javascript
// next.config.js
module.exports = {
  images: {
    domains: ['example.com', 'cdn.yourdomain.com'],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  }
};
```

### Caching Strategy

```javascript
// Cache configuration
module.exports = {
  async headers() {
    return [
      {
        source: '/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      },
      {
        source: '/(.*).js',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      }
    ];
  }
};
```

## 🔍 Monitoring & Analytics

### Performance Monitoring

```javascript
// lib/analytics.js
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

function sendToAnalytics(metric) {
  // Send to your analytics service
  console.log(metric);
}

getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getFCP(sendToAnalytics);
getLCP(sendToAnalytics);
getTTFB(sendToAnalytics);
```

### Error Tracking

```javascript
// lib/error-tracking.js
export function reportError(error, errorInfo) {
  // Send to error tracking service (Sentry, LogRocket, etc.)
  console.error('Application Error:', error, errorInfo);
}

// Error boundary
class ErrorBoundary extends React.Component {
  componentDidCatch(error, errorInfo) {
    reportError(error, errorInfo);
  }
}
```

### Health Checks

```javascript
// pages/api/health.js
export default function handler(req, res) {
  const healthcheck = {
    uptime: process.uptime(),
    message: 'OK',
    timestamp: Date.now(),
    environment: process.env.NODE_ENV,
    version: process.env.npm_package_version
  };
  
  try {
    res.status(200).json(healthcheck);
  } catch (error) {
    healthcheck.message = error;
    res.status(503).json(healthcheck);
  }
}
```

## 🔄 CI/CD Pipeline

### GitHub Actions

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - run: npm ci
      - run: npm run lint
      - run: npm run test
      - run: npm run build

  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - run: npm ci
      - run: npm run build
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

### GitLab CI

```yaml
# .gitlab-ci.yml
stages:
  - test
  - build
  - deploy

variables:
  NODE_VERSION: "18"

test:
  stage: test
  image: node:$NODE_VERSION
  script:
    - npm ci
    - npm run lint
    - npm run test
    - npm run build

deploy_production:
  stage: deploy
  image: node:$NODE_VERSION
  script:
    - npm ci
    - npm run build
    - # Deploy commands here
  only:
    - main
```

## 🚨 Troubleshooting

### Common Issues

1. **Build Failures**
   ```bash
   # Clear Next.js cache
   rm -rf .next
   
   # Clear node_modules
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **Memory Issues**
   ```bash
   # Increase Node.js memory limit
   NODE_OPTIONS="--max-old-space-size=4096" npm run build
   ```

3. **Static Export Issues**
   ```javascript
   // Disable image optimization for static export
   module.exports = {
     output: 'export',
     images: {
       unoptimized: true
     }
   };
   ```

### Performance Issues

1. **Bundle Size**
   - Use dynamic imports for large components
   - Optimize images and assets
   - Remove unused dependencies

2. **Runtime Performance**
   - Implement proper caching
   - Use React.memo for expensive components
   - Optimize re-renders

### Deployment Checklist

- [ ] Environment variables configured
- [ ] Security headers implemented
- [ ] HTTPS enabled
- [ ] CDN configured
- [ ] Monitoring setup
- [ ] Error tracking enabled
- [ ] Performance monitoring active
- [ ] Backup strategy in place
- [ ] Health checks implemented
- [ ] CI/CD pipeline working

This deployment guide provides comprehensive instructions for deploying ADmyBRAND Insights to various platforms with proper optimization and monitoring.