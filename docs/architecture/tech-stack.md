# UndangAbi V2 - Tech Stack & Architecture Decision Record

## Overview

UndangAbi V2 adalah platform **Digital Invitation + Guest Management System** yang memungkinkan pengguna membuat berbagai jenis undangan digital, mengelola tamu, RSVP, QR Check-in, dan analytics dalam satu platform.

Target MVP:

* Multi Invitation
* Guest Management
* RSVP
* QR Check-in
* Analytics
* SEO Preview
* Calendar Integration

---

# Architecture Style

Menggunakan:

* Monorepo
* Domain Driven Module Structure
* Feature Based Frontend Architecture
* Modular Monolith Backend
* REST API
* JWT Authentication
* RBAC Authorization

---

# Technology Stack

## Frontend

### Framework

* Vue 3
* TypeScript
* Vite

### UI

* PrimeVue
* Tailwind CSS

### State Management

* Pinia
* pinia-plugin-persistedstate

### Validation

* Zod

### HTTP Client

* Axios

### Routing

* Vue Router

### Charts

* Chart.js

### Utilities

* DayJS

---

## Backend

### Framework

* NestJS

### Language

* TypeScript

### ORM

* Prisma

### Database

* PostgreSQL

### Authentication

* JWT

### Authorization

* Role Based Access Control (RBAC)

### File Upload

* S3 Compatible Storage

Contoh:

* Cloudflare R2
* MinIO
* AWS S3

### API Documentation

* Swagger

---

## Infrastructure

### Monorepo

* PNPM Workspace
* TurboRepo

### Containerization

* Docker

### Deployment

* Railway

### CI/CD

* GitHub Actions

---

# Monorepo Structure

```txt
undangabi/

├── apps/
│
│   ├── web/
│   ├── customer/
│   ├── admin/
│   └── api/
│
├── packages/
│
│   ├── ui/
│   ├── shared-types/
│   ├── shared-utils/
│   ├── eslint-config/
│   └── tsconfig/
│
├── infra/
│
│   ├── docker/
│   └── scripts/
│
├── docs/
│
│   ├── architecture/
│   └── runbooks/
│
├── turbo.json
├── pnpm-workspace.yaml
└── package.json
```

---

# Applications

## apps/web

Public invitation website.

Responsibilities:

* Public invitation page
* SEO
* Open Graph
* WhatsApp Preview
* RSVP Form
* Guestbook
* Gift Information
* Personalized Invitation

No authentication required.

---

## apps/customer

Customer dashboard.

Responsibilities:

* Manage Invitations
* Manage Guests
* Manage RSVP
* QR Check-in
* Analytics
* Theme Customization

Requires authentication.

---

## apps/admin

Internal dashboard.

Responsibilities:

* User Management
* Template Management
* Global Analytics
* System Monitoring

Requires admin role.

---

## apps/api

Main backend service.

Responsibilities:

* Authentication
* Authorization
* Business Logic
* Database Access
* File Upload
* Analytics

---

# Shared Packages

## packages/ui

Reusable UI components.

Examples:

```txt
Button
Input
Modal
Table
Card
Badge
Dialog
```

---

## packages/shared-types

Shared TypeScript types.

Examples:

```txt
User
Role
Permission
Invitation
Guest
RSVP
Analytics
```

---

## packages/shared-utils

Shared helper functions.

Examples:

```txt
slugify
formatDate
formatPhoneNumber
generateCalendarLink
```

---

# Backend Structure

```txt
apps/api/src/

├── auth/
├── users/
├── rbac/
│
├── invitations/
├── invitation-themes/
│
├── guests/
├── guest-categories/
│
├── rsvp/
├── guestbook/
│
├── gifts/
├── check-in/
├── analytics/
│
├── seo/
├── calendar/
├── uploads/
│
├── database/
└── common/
```

---

# Backend Module Guideline

Each module must follow:

```txt
module-name/

├── dto/
├── entities/
├── constants/
│
├── module-name.controller.ts
├── module-name.service.ts
├── module-name.module.ts
```

Example:

```txt
guests/

├── dto/
├── entities/
├── constants/
│
├── guests.controller.ts
├── guests.service.ts
├── guests.module.ts
```

Rules:

* Business logic only in service
* Controller only handles request/response
* DTO for validation
* Prisma access only inside service layer

---

# Frontend Structure

```txt
src/

├── core/
├── shared/
└── modules/
```

---

## Core

```txt
core/

├── initiate.ts
├── global-routes.ts
├── global-components.ts
└── global-styles.ts
```

Contains application bootstrap.

---

## Shared

```txt
shared/

├── components/
├── composables/
├── constants/
├── helpers/
├── layouts/
└── services/
```

Reusable resources.

---

## Modules

Feature-based architecture.

```txt
modules/

├── auth/
├── dashboard/
├── invitations/
├── guests/
├── rsvp/
├── check-in/
├── analytics/
└── settings/
```

---

# Frontend Module Guideline

Every module must follow:

```txt
module-name/

├── pages/
├── components/
├── stores/
├── services/
├── types/
└── router/
```

Example:

```txt
invitations/

├── pages/
│   ├── list.vue
│   ├── create.vue
│   └── edit.vue
│
├── components/
│
├── stores/
│
├── services/
│
├── types/
│
└── router/
```

Rules:

* Pages for route-level components
* Components for local module components
* Store for Pinia
* Service for API communication
* Types for local interfaces
* Router for route registration

---

# Authentication Strategy

Authentication:

* JWT Access Token

Storage:

* Pinia Persist

Protected Route:

* Route Guard

---

# Authorization Strategy

Using RBAC.

Roles:

```txt
Admin
Customer
```

Permission examples:

```txt
manage_users
manage_templates
manage_all_invitations

manage_own_invitations
manage_own_guests
manage_own_rsvp
view_own_analytics
```

Frontend Route Example:

```ts
meta: {
  permission: ['manage_own_invitations']
}
```

---

# Database Strategy

Database:

* PostgreSQL

ORM:

* Prisma

Migration:

```bash
pnpm prisma migrate dev
```

Rules:

* UUID for public entities
* Soft Delete where applicable
* created_at
* updated_at

Mandatory on all tables.

---

# File Storage Strategy

Store files outside database.

Examples:

```txt
Invitation Cover
Gallery Images
Music Files
QRIS Images
```

Storage:

* Cloudflare R2

Fallback:

* MinIO

Database stores URL only.

---

# Theme System

Use:

```txt
1 Layout Engine
3 Visual Themes
```

Themes:

```txt
Elegant
Modern
Nature
```

Customizable:

```txt
Primary Color
Secondary Color
Font
Cover Style
Section Visibility
```

Do not create different layouts per theme.

Only visual customization.

---

# Architecture Principles

1. Feature First
2. Modular Monolith
3. Shared Types Across Apps
4. Thin Controllers
5. Fat Services
6. Reusable UI Components
7. Domain Separation
8. Single Source of Truth
9. Mobile First
10. SEO First
11. Performance First

---

# Future Expansion

Not included in MVP:

* AI Features
* Subscription
* White Label
* Team Collaboration
* Custom Domain
* Reminder WhatsApp

Architecture must allow these features to be added without major refactoring.
