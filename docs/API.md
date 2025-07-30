# 🔌 API Documentation

## API Overview

ADmyBRAND Insights currently uses mock data for demonstration purposes. This document outlines the API structure for future integration with real backend services.

## 📊 Data Models

### User Model

```typescript
interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'viewer';
  avatar?: string;
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
  preferences: {
    theme: 'light' | 'dark' | 'system';
    notifications: boolean;
    timezone: string;
  };
}
```

### Analytics Data Models

```typescript
interface MetricData {
  id: string;
  name: string;
  value: number;
  change: number;
  changeType: 'increase' | 'decrease';
  period: string;
  target?: number;
  unit: 'currency' | 'percentage' | 'number';
  timestamp: string;
}

interface ChartDataPoint {
  timestamp: string;
  [key: string]: string | number;
}

interface ChartData {
  id: string;
  title: string;
  type: 'line' | 'bar' | 'area' | 'pie' | 'donut';
  data: ChartDataPoint[];
  metadata: {
    xAxis: string;
    yAxis: string;
    color: string;
    description?: string;
  };
}

interface TableData {
  id: string;
  [key: string]: any;
}

interface Campaign {
  id: string;
  name: string;
  status: 'active' | 'paused' | 'completed';
  budget: number;
  spent: number;
  impressions: number;
  clicks: number;
  conversions: number;
  ctr: number;
  cpc: number;
  roas: number;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
}
```

## 🔐 Authentication API

### Login

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@admybrand.com",
  "password": "password"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_123",
      "name": "Admin User",
      "email": "admin@admybrand.com",
      "role": "admin"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "refresh_token_here",
    "expiresIn": 3600
  }
}
```

### Logout

```http
POST /api/auth/logout
Authorization: Bearer {token}
```

**Response:**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

### Refresh Token

```http
POST /api/auth/refresh
Content-Type: application/json

{
  "refreshToken": "refresh_token_here"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "token": "new_jwt_token",
    "expiresIn": 3600
  }
}
```

### Get Current User

```http
GET /api/auth/me
Authorization: Bearer {token}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "user_123",
    "name": "Admin User",
    "email": "admin@admybrand.com",
    "role": "admin",
    "lastLogin": "2025-01-30T10:00:00Z",
    "preferences": {
      "theme": "dark",
      "notifications": true,
      "timezone": "UTC"
    }
  }
}
```

## 📊 Analytics API

### Get Dashboard Overview

```http
GET /api/analytics/overview
Authorization: Bearer {token}
Query Parameters:
  - period: 7d | 30d | 90d | 1y (default: 30d)
  - timezone: UTC | America/New_York | etc (default: UTC)
```

**Response:**
```json
{
  "success": true,
  "data": {
    "metrics": [
      {
        "id": "total_revenue",
        "name": "Total Revenue",
        "value": 245890,
        "change": 12.5,
        "changeType": "increase",
        "period": "30d",
        "target": 300000,
        "unit": "currency"
      }
    ],
    "goals": [
      {
        "id": "revenue_goal",
        "title": "Monthly Revenue",
        "current": 245890,
        "target": 300000,
        "unit": "currency",
        "progress": 81.96
      }
    ],
    "period": "30d",
    "lastUpdated": "2025-01-30T10:00:00Z"
  }
}
```

### Get Chart Data

```http
GET /api/analytics/charts/{chartId}
Authorization: Bearer {token}
Query Parameters:
  - period: 7d | 30d | 90d | 1y (default: 30d)
  - granularity: hour | day | week | month (default: day)
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "revenue_over_time",
    "title": "Revenue Over Time",
    "type": "line",
    "data": [
      {
        "timestamp": "2025-01-01T00:00:00Z",
        "revenue": 32000,
        "users": 1200
      }
    ],
    "metadata": {
      "xAxis": "timestamp",
      "yAxis": "revenue",
      "color": "#3B82F6",
      "description": "Revenue trends over the selected period"
    }
  }
}
```

### Get Table Data

```http
GET /api/analytics/tables/{tableId}
Authorization: Bearer {token}
Query Parameters:
  - page: number (default: 1)
  - limit: number (default: 10, max: 100)
  - sort: field_name (default: created_at)
  - order: asc | desc (default: desc)
  - search: string (optional)
  - filters: JSON object (optional)
```

**Response:**
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "campaign_123",
        "name": "Summer Sale Campaign",
        "status": "active",
        "budget": 10000,
        "spent": 7500,
        "impressions": 125000,
        "clicks": 2500,
        "conversions": 125,
        "ctr": 2.0,
        "cpc": 3.0,
        "roas": 4.2
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 150,
      "totalPages": 15,
      "hasNext": true,
      "hasPrev": false
    }
  }
}
```

## 📈 Reports API

### Get Revenue Report

```http
GET /api/reports/revenue
Authorization: Bearer {token}
Query Parameters:
  - startDate: ISO date string
  - endDate: ISO date string
  - groupBy: day | week | month (default: day)
  - channels: comma-separated list (optional)
```

**Response:**
```json
{
  "success": true,
  "data": {
    "summary": {
      "totalRevenue": 245890,
      "averageRevenue": 8196.33,
      "growth": 12.5,
      "topChannel": "Organic Search"
    },
    "timeSeries": [
      {
        "date": "2025-01-01",
        "revenue": 8500,
        "orders": 45,
        "averageOrderValue": 188.89
      }
    ],
    "channels": [
      {
        "name": "Organic Search",
        "revenue": 110650,
        "percentage": 45.0,
        "growth": 15.2
      }
    ]
  }
}
```

### Get Traffic Report

```http
GET /api/reports/traffic
Authorization: Bearer {token}
Query Parameters:
  - startDate: ISO date string
  - endDate: ISO date string
  - groupBy: day | week | month (default: day)
```

**Response:**
```json
{
  "success": true,
  "data": {
    "summary": {
      "totalSessions": 125000,
      "totalUsers": 85000,
      "averageSessionDuration": 180,
      "bounceRate": 35.5
    },
    "timeSeries": [
      {
        "date": "2025-01-01",
        "sessions": 4200,
        "users": 3100,
        "pageViews": 12600,
        "bounceRate": 32.1
      }
    ],
    "sources": [
      {
        "name": "Organic Search",
        "sessions": 56250,
        "percentage": 45.0,
        "bounceRate": 28.5
      }
    ]
  }
}
```

### Get Conversion Report

```http
GET /api/reports/conversions
Authorization: Bearer {token}
Query Parameters:
  - startDate: ISO date string
  - endDate: ISO date string
  - goalId: string (optional)
```

**Response:**
```json
{
  "success": true,
  "data": {
    "summary": {
      "totalConversions": 5250,
      "conversionRate": 4.2,
      "totalValue": 245890,
      "averageValue": 46.84
    },
    "goals": [
      {
        "id": "purchase",
        "name": "Purchase",
        "conversions": 3150,
        "rate": 2.52,
        "value": 189500
      }
    ],
    "funnels": [
      {
        "step": "Landing Page",
        "users": 85000,
        "dropoffRate": 0
      },
      {
        "step": "Product Page",
        "users": 42500,
        "dropoffRate": 50.0
      }
    ]
  }
}
```

## 👤 User Management API

### Update User Profile

```http
PUT /api/users/profile
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Updated Name",
  "preferences": {
    "theme": "dark",
    "notifications": true,
    "timezone": "America/New_York"
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "user_123",
    "name": "Updated Name",
    "email": "admin@admybrand.com",
    "preferences": {
      "theme": "dark",
      "notifications": true,
      "timezone": "America/New_York"
    },
    "updatedAt": "2025-01-30T10:00:00Z"
  }
}
```

### Change Password

```http
POST /api/users/change-password
Authorization: Bearer {token}
Content-Type: application/json

{
  "currentPassword": "old_password",
  "newPassword": "new_password"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Password changed successfully"
}
```

## 📤 Export API

### Export Data

```http
POST /api/export
Authorization: Bearer {token}
Content-Type: application/json

{
  "type": "csv" | "pdf" | "xlsx",
  "data": "campaigns" | "revenue" | "traffic" | "conversions",
  "filters": {
    "startDate": "2025-01-01",
    "endDate": "2025-01-31",
    "channels": ["organic", "paid"]
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "exportId": "export_123",
    "downloadUrl": "https://api.admybrand.com/exports/export_123.csv",
    "expiresAt": "2025-01-30T11:00:00Z"
  }
}
```

### Get Export Status

```http
GET /api/export/{exportId}
Authorization: Bearer {token}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "export_123",
    "status": "completed" | "processing" | "failed",
    "progress": 100,
    "downloadUrl": "https://api.admybrand.com/exports/export_123.csv",
    "createdAt": "2025-01-30T10:00:00Z",
    "expiresAt": "2025-01-30T11:00:00Z"
  }
}
```

## 🔔 Notifications API

### Get Notifications

```http
GET /api/notifications
Authorization: Bearer {token}
Query Parameters:
  - page: number (default: 1)
  - limit: number (default: 20)
  - unread: boolean (optional)
```

**Response:**
```json
{
  "success": true,
  "data": {
    "notifications": [
      {
        "id": "notif_123",
        "title": "Campaign Performance Alert",
        "message": "Your campaign 'Summer Sale' is performing 20% above target",
        "type": "success" | "warning" | "error" | "info",
        "read": false,
        "createdAt": "2025-01-30T09:00:00Z"
      }
    ],
    "unreadCount": 5,
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 45,
      "hasNext": true
    }
  }
}
```

### Mark Notification as Read

```http
PUT /api/notifications/{notificationId}/read
Authorization: Bearer {token}
```

**Response:**
```json
{
  "success": true,
  "message": "Notification marked as read"
}
```

## 🔧 Settings API

### Get Settings

```http
GET /api/settings
Authorization: Bearer {token}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "general": {
      "companyName": "ADmyBRAND",
      "timezone": "UTC",
      "currency": "USD",
      "dateFormat": "MM/DD/YYYY"
    },
    "notifications": {
      "email": true,
      "push": false,
      "sms": false,
      "frequency": "daily"
    },
    "privacy": {
      "dataRetention": 365,
      "analyticsTracking": true,
      "marketingEmails": false
    }
  }
}
```

### Update Settings

```http
PUT /api/settings
Authorization: Bearer {token}
Content-Type: application/json

{
  "general": {
    "timezone": "America/New_York",
    "currency": "USD"
  },
  "notifications": {
    "email": true,
    "frequency": "weekly"
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "general": {
      "companyName": "ADmyBRAND",
      "timezone": "America/New_York",
      "currency": "USD",
      "dateFormat": "MM/DD/YYYY"
    },
    "notifications": {
      "email": true,
      "push": false,
      "sms": false,
      "frequency": "weekly"
    }
  }
}
```

## 🚨 Error Handling

### Error Response Format

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": [
      {
        "field": "email",
        "message": "Email is required"
      }
    ]
  },
  "timestamp": "2025-01-30T10:00:00Z",
  "requestId": "req_123"
}
```

### Common Error Codes

| Code | Status | Description |
|------|--------|-------------|
| `UNAUTHORIZED` | 401 | Invalid or missing authentication token |
| `FORBIDDEN` | 403 | Insufficient permissions |
| `NOT_FOUND` | 404 | Resource not found |
| `VALIDATION_ERROR` | 400 | Invalid input data |
| `RATE_LIMIT_EXCEEDED` | 429 | Too many requests |
| `INTERNAL_ERROR` | 500 | Server error |

## 🔄 Real-time Updates

### WebSocket Connection

```javascript
// Connect to WebSocket
const ws = new WebSocket('wss://api.admybrand.com/ws');

// Authentication
ws.onopen = () => {
  ws.send(JSON.stringify({
    type: 'auth',
    token: 'your_jwt_token'
  }));
};

// Subscribe to updates
ws.send(JSON.stringify({
  type: 'subscribe',
  channels: ['metrics', 'notifications']
}));

// Handle messages
ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  
  switch (data.type) {
    case 'metric_update':
      // Update metric in UI
      break;
    case 'notification':
      // Show new notification
      break;
  }
};
```

### Real-time Events

```typescript
interface MetricUpdateEvent {
  type: 'metric_update';
  data: {
    metricId: string;
    value: number;
    change: number;
    timestamp: string;
  };
}

interface NotificationEvent {
  type: 'notification';
  data: {
    id: string;
    title: string;
    message: string;
    type: 'success' | 'warning' | 'error' | 'info';
    timestamp: string;
  };
}
```

## 📝 API Client Implementation

### TypeScript API Client

```typescript
// lib/api-client.ts
class APIClient {
  private baseURL: string;
  private token: string | null = null;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  setToken(token: string) {
    this.token = token;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      ...(this.token && { Authorization: `Bearer ${this.token}` }),
      ...options.headers,
    };

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    return response.json();
  }

  // Authentication methods
  async login(email: string, password: string) {
    return this.request<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async logout() {
    return this.request('/auth/logout', { method: 'POST' });
  }

  // Analytics methods
  async getOverview(period: string = '30d') {
    return this.request<OverviewResponse>(`/analytics/overview?period=${period}`);
  }

  async getChartData(chartId: string, period: string = '30d') {
    return this.request<ChartResponse>(`/analytics/charts/${chartId}?period=${period}`);
  }

  // Export methods
  async exportData(type: string, data: string, filters: any) {
    return this.request<ExportResponse>('/export', {
      method: 'POST',
      body: JSON.stringify({ type, data, filters }),
    });
  }
}

export const apiClient = new APIClient(process.env.NEXT_PUBLIC_API_URL!);
```

This API documentation provides a comprehensive guide for integrating ADmyBRAND Insights with a real backend service.