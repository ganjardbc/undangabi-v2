# UndangAbi V2 - Development Backlog

Path:

```txt
docs/development/backlog.md
```

## Overview

Dokumen ini berisi backlog implementasi UndangAbi V2.

Rules:

* Task harus kecil dan dapat diselesaikan dalam 1 sesi coding.
* Satu task = satu objective.
* Setiap task harus memiliki acceptance criteria.
* AI Coding Agent hanya mengerjakan satu task dalam satu waktu.

Status:

```txt
TODO
IN_PROGRESS
DONE
BLOCKED
```

Priority:

```txt
P0 = Critical
P1 = High
P2 = Medium
P3 = Low
```

---

# Phase 0 - Foundation

## MONO-001

Title:

```txt
Setup Monorepo Workspace
```

Priority:

```txt
P0
```

Status:

```txt
DONE
```

Acceptance Criteria:

```txt
pnpm workspace configured
turbo configured
apps folder created
packages folder created
```

---

## MONO-002

Title:

```txt
Setup Shared Packages
```

Status:

```txt
DONE
```

Acceptance Criteria:

```txt
packages/ui
packages/shared-types
packages/shared-utils
packages/eslint-config
packages/tsconfig
```

---

## API-001

Title:

```txt
Setup NestJS Application
```

Status:

```txt
DONE
```

Acceptance Criteria:

```txt
apps/api created
NestJS running
Health endpoint available
```

---

## WEB-001

Title:

```txt
Setup Customer App
```

Status:

```txt
DONE
```

Acceptance Criteria:

```txt
Vue 3
Vite
Pinia
Vue Router
```

---

## WEB-002

Title:

```txt
Setup Admin App
```

Status:

```txt
DONE
```

Acceptance Criteria:

```txt
Vue 3
Vite
Pinia
Vue Router
```

---

## WEB-003

Title:

```txt
Setup Public Web App
```

Status:

```txt
DONE
```

Acceptance Criteria:

```txt
Vue 3
SSR Ready
SEO Ready
```

---

## DB-001

Title:

```txt
Setup PostgreSQL
```

Status:

```txt
DONE
```

Acceptance Criteria:

```txt
Database running
DATABASE_URL configured
```

---

## DB-002

Title:

```txt
Setup Prisma
```

Status:

```txt
DONE
```

Acceptance Criteria:

```txt
Prisma initialized
Migration working
Generate working
```

---

## DB-003

Title:

```txt
Create Initial Prisma Schema
```

Status:

```txt
DONE
```

Acceptance Criteria:

```txt
User
Role
Permission
UserRole
RolePermission
```

---

# Phase 1 - Authentication & RBAC

## AUTH-001

Title:

```txt
Create Users Module
```

Status:

```txt
DONE
```

Acceptance Criteria:

```txt
Users module exists
Prisma integration working
```

---

## AUTH-002

Title:

```txt
Create Roles Module
```

Status:

```txt
DONE
```

Acceptance Criteria:

```txt
Roles schema implemented
```

---

## AUTH-003

Title:

```txt
Create Permissions Module
```

Status:

```txt
DONE
```

Acceptance Criteria:

```txt
Permissions schema implemented
```

---

## AUTH-004

Title:

```txt
Create Auth Module
```

Status:

```txt
DONE
```

Acceptance Criteria:

```txt
Auth module registered
```

---

## AUTH-005

Title:

```txt
Implement Register API
```

Status:

```txt
DONE
```

Acceptance Criteria:

```txt
User created
Password hashed
Role customer assigned
```

---

## AUTH-006

Title:

```txt
Implement Login API
```

Status:

```txt
DONE
```

Acceptance Criteria:

```txt
JWT returned
User validated
```

---

## AUTH-007

Title:

```txt
Implement Current User API
```

Status:

```txt
DONE
```

Acceptance Criteria:

```txt
GET /auth/me works
```

---

## AUTH-008

Title:

```txt
Implement JWT Guard
```

Status:

```txt
DONE
```

Acceptance Criteria:

```txt
Protected routes secured
```

---

## AUTH-009

Title:

```txt
Implement Permissions Guard
```

Status:

```txt
DONE
```

Acceptance Criteria:

```txt
Permission decorator working
```

---

## AUTH-010

Title:

```txt
Create Login Page
```

Status:

```txt
DONE
```

Acceptance Criteria:

```txt
Login form working
```

---

## AUTH-011

Title:

```txt
Create Register Page
```

Status:

```txt
DONE
```

Acceptance Criteria:

```txt
Register form working
```

---

# Phase 2 - Invitation Core

## INV-001

Title:

```txt
Create Invitation Theme Schema
```

Status:

```txt
DONE
```

---

## INV-002

Title:

```txt
Create Invitation Schema
```

Status:

```txt
DONE
```

---

## INV-003

Title:

```txt
Implement Create Invitation API
```

Status:

```txt
DONE
```

Acceptance Criteria:

```txt
Invitation created
Owner assigned
```

---

## INV-004

Title:

```txt
Implement List Invitation API
```

Status:

```txt
DONE
```

---

## INV-005

Title:

```txt
Implement Detail Invitation API
```

Status:

```txt
DONE
```

---

## INV-006

Title:

```txt
Implement Update Invitation API
```

Status:

```txt
DONE
```

---

## INV-007

Title:

```txt
Implement Delete Invitation API
```

Status:

```txt
DONE
```

---

## INV-008

Title:

```txt
Implement Publish Invitation API
```

Status:

```txt
DONE
```

---

## INV-009

Title:

```txt
Implement Archive Invitation API
```

Status:

```txt
DONE
```

---

## INV-010

Title:

```txt
Implement Duplicate Invitation API
```

Status:

```txt
DONE
```

---

## INV-011

Title:

```txt
Create Invitation List Page
```

Status:

```txt
DONE
```

---

## INV-012

Title:

```txt
Create Invitation Create Page
```

Status:

```txt
DONE
```

---

## INV-013

Title:

```txt
Create Invitation Builder Page
```

Status:

```txt
DONE
```

---

## INV-014

Title:

```txt
Implement General Builder Section
```

Status:

```txt
DONE
```

---

## INV-015

Title:

```txt
Implement Story Builder Section
```

Status:

```txt
DONE
```

---

## INV-016

Title:

```txt
Implement Cover Builder Section
```

Status:

```txt
DONE
```

---

## INV-017

Title:

```txt
Implement Music Builder Section
```

Status:

```txt
DONE
```

---

## INV-018

Title:

```txt
Implement Public Invitation Page
```

Status:

```txt
DONE
```

Acceptance Criteria:

```txt
Invitation rendered by slug
```

---

## INV-019

Title:

```txt
Implement SEO Metadata
```

Status:

```txt
DONE
```

---

## INV-020

Title:

```txt
Implement WhatsApp OG Preview
```

Status:

```txt
DONE
```

Acceptance Criteria:

```txt
WhatsApp preview image displayed
```

---

# Phase 3 - Event & Gallery

## EVT-001

```txt
Create Invitation Event Schema
```

## EVT-002

```txt
Implement Event CRUD API
```

## EVT-003

```txt
Implement Event Management UI
```

## EVT-004

```txt
Create Invitation Gallery Schema
```

## EVT-005

```txt
Implement Gallery Upload API
```

## EVT-006

```txt
Implement Gallery UI
```

## EVT-007

```txt
Implement Countdown Component
```

## EVT-008

```txt
Implement Google Maps Section
```

---

# Phase 4 - Guest Management

## GST-001

```txt
Create Guest Category Schema
```

Status:

```txt
DONE
```

## GST-002

```txt
Create Guest Schema
```

Status:

```txt
DONE
```

## GST-003

```txt
Implement Guest CRUD API
```

Status:

```txt
DONE
```

## GST-004

```txt
Implement Guest Search API
```

Status:

```txt
DONE
```

## GST-005

```txt
Implement Guest Filter API
```

Status:

```txt
DONE
```

## GST-006

```txt
Create Guest List Page
```

Status:

```txt
DONE
```

## GST-007

```txt
Create Guest Detail Page
```

Status:

```txt
DONE
```

## GST-008

```txt
Create Guest Category Page
```

Status:

```txt
DONE
```

## GST-009

```txt
Generate Personalized Link
```

Status:

```txt
DONE
```

Acceptance Criteria:

```txt
Link contains token
Guest name displayed
```

---

## GST-010

```txt
Generate Guest QR Code
```

Status:

```txt
DONE
```

Acceptance Criteria:

```txt
QR generated
Unique per guest
```

---

## GST-011

```txt
Import Guest CSV API
```

Status:

```txt
DONE
```

---

## GST-012

```txt
Import Guest CSV UI
```

Status:

```txt
DONE
```

---

# Phase 5 - RSVP & Guestbook

## RSVP-001

```txt
Create RSVP Schema
```

Status:

```txt
DONE
```

## RSVP-002

```txt
Submit RSVP API
```

Status:

```txt
DONE
```

## RSVP-003

```txt
List RSVP API
```

Status:

```txt
DONE
```

## RSVP-004

```txt
RSVP Summary API
```

Status:

```txt
DONE
```

## RSVP-005

```txt
RSVP Dashboard UI
```

---

## GBOOK-001

```txt
Create Guestbook Schema
```

## GBOOK-002

```txt
Submit Guestbook API
```

## GBOOK-003

```txt
List Guestbook API
```

## GBOOK-004

```txt
Guestbook Management UI
```

---

# Phase 6 - Gifts & Calendar

## GIFT-001

```txt
Create Gift Schema
```

## GIFT-002

```txt
Bank Transfer Gift API
```

## GIFT-003

```txt
QRIS Gift API
```

## GIFT-004

```txt
Gift Management UI
```

---

## CAL-001

```txt
Generate Google Calendar Link
```

## CAL-002

```txt
Generate Outlook Calendar Link
```

## CAL-003

```txt
Generate ICS File
```

## CAL-004

```txt
Track Calendar Click
```

---

# Phase 7 - QR Check-In

## CHECKIN-001

```txt
Create Check-In Schema
```

## CHECKIN-002

```txt
Validate QR API
```

## CHECKIN-003

```txt
Perform Check-In API
```

## CHECKIN-004

```txt
Attendance Summary API
```

## CHECKIN-005

```txt
QR Scanner UI
```

## CHECKIN-006

```txt
Attendance Dashboard UI
```

---

# Phase 8 - Analytics

## ANALYTICS-001

```txt
Create Analytics Schema
```

## ANALYTICS-002

```txt
Track Invitation View
```

## ANALYTICS-003

```txt
Track RSVP Event
```

## ANALYTICS-004

```txt
Track Gift Click Event
```

## ANALYTICS-005

```txt
Track Calendar Click Event
```

## ANALYTICS-006

```txt
Analytics Summary API
```

## ANALYTICS-007

```txt
Analytics Dashboard UI
```

## ANALYTICS-008

```txt
Analytics Charts UI
```

---

# Phase 9 - Admin Panel

## ADMIN-001

```txt
Create Admin Dashboard
```

## ADMIN-002

```txt
User Management API
```

## ADMIN-003

```txt
User Management UI
```

## ADMIN-004

```txt
Invitation Management API
```

## ADMIN-005

```txt
Invitation Management UI
```

## ADMIN-006

```txt
Template Management API
```

## ADMIN-007

```txt
Template Management UI
```

## ADMIN-008

```txt
Global Analytics API
```

## ADMIN-009

```txt
Global Analytics UI
```

---

# Phase 10 - Production Ready

## PROD-001

```txt
Setup Error Tracking
```

## PROD-002

```txt
Setup Monitoring
```

## PROD-003

```txt
Setup Backup Strategy
```

## PROD-004

```txt
Setup CI/CD Pipeline
```

## PROD-005

```txt
Production Deployment
```

## PROD-006

```txt
Security Review
```

## PROD-007

```txt
Performance Audit
```

---

# MVP Critical Path

Task yang wajib selesai untuk MVP:

```txt
MONO-001 → DB-003

AUTH-001 → AUTH-011

INV-001 → INV-020

GST-001 → GST-012

RSVP-001 → RSVP-005

GIFT-001 → GIFT-004

CAL-001 → CAL-004

CHECKIN-001 → CHECKIN-006

ANALYTICS-001 → ANALYTICS-008
```

---

# Recommended First Sprint

```txt
MONO-001
MONO-002

API-001

WEB-001
WEB-002
WEB-003

DB-001
DB-002
DB-003

AUTH-001
AUTH-002
AUTH-003
AUTH-004
```

Expected Result:

```txt
Monorepo ready
Database ready
Auth foundation ready
```
