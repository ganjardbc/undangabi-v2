# UndangAbi V2 - Progress Tracker

Path:

```txt
docs/development/progress.md
```

## Overview

Dokumen ini digunakan untuk melacak progress development UndangAbi V2.

Rules:

* Update setiap task selesai.
* Update setiap phase berubah.
* Update setiap milestone tercapai.
* Jadikan dokumen ini sebagai sumber utama status project saat ini.

Status:

```txt
NOT_STARTED
IN_PROGRESS
DONE
BLOCKED
```

---

# Project Status

Project:

```txt
UndangAbi V2
```

Current Status:

```txt
IN_PROGRESS
```

Current Phase:

```txt
Phase 1 - Auth & RBAC
```

Current Milestone:

```txt
M1 - Authentication Ready
```

Last Updated:

```txt
2026-06-12
```

---

# Overall Progress

## Phase Progress

| Phase                       | Status      | Progress |
| --------------------------- | ----------- | -------- |
| Phase 0 - Foundation        | DONE        | 100%     |
| Phase 1 - Auth & RBAC       | DONE        | 100%     |
| Phase 2 - Invitation Core   | IN_PROGRESS | 0%       |
| Phase 3 - Event & Gallery   | NOT_STARTED | 0%       |
| Phase 4 - Guest Management  | NOT_STARTED | 0%       |
| Phase 5 - RSVP & Guestbook  | NOT_STARTED | 0%       |
| Phase 6 - Gifts & Calendar  | NOT_STARTED | 0%       |
| Phase 7 - QR Check-In       | NOT_STARTED | 0%       |
| Phase 8 - Analytics         | NOT_STARTED | 0%       |
| Phase 9 - Admin Panel       | NOT_STARTED | 0%       |
| Phase 10 - Production Ready | NOT_STARTED | 0%       |

---

## Milestone Progress

| Milestone                   | Status      |
| --------------------------- | ----------- |
| M0 Foundation Ready         | DONE        |
| M1 Authentication Ready     | DONE        |
| M2 Invitation Builder Ready | IN_PROGRESS |
| M3 Public Invitation Ready  | NOT_STARTED |
| M4 Guest Management Ready   | NOT_STARTED |
| M5 RSVP Ready               | NOT_STARTED |
| M6 Event Day Ready          | NOT_STARTED |
| M7 Gift & Calendar Ready    | NOT_STARTED |
| M8 Analytics Ready          | NOT_STARTED |
| M9 Admin Panel Ready        | NOT_STARTED |
| M10 MVP Release Candidate   | NOT_STARTED |
| M11 MVP Production Release  | NOT_STARTED |

---

# Current Sprint

## Sprint Goal

```txt
Setup Auth & RBAC
```

---

## Current Tasks

### TODO

```txt
INV-001 Create Invitation Theme Schema
INV-002 Create Invitation Schema
INV-003 Implement Create Invitation API
```

---

### IN_PROGRESS

```txt
None
```

---

### DONE

```txt
MONO-001 Setup Monorepo Workspace
MONO-002 Setup Shared Packages
API-001 Setup NestJS Application
WEB-001 Setup Customer App
WEB-002 Setup Admin App
WEB-003 Setup Public Web App
DB-001 Setup PostgreSQL
DB-002 Setup Prisma
DB-003 Create Initial Prisma Schema
AUTH-001 Create Users Module
AUTH-002 Create Roles Module
AUTH-003 Create Permissions Module
AUTH-004 Create Auth Module
AUTH-005 Implement Register API
AUTH-006 Implement Login API
AUTH-007 Implement Current User API
AUTH-008 Implement JWT Guard
AUTH-009 Implement Permissions Guard
AUTH-010 Create Login Page
AUTH-011 Create Register Page
```

---

### BLOCKED

```txt
None
```

---

# Completed Tasks

## Phase 0

```txt
MONO-001 Setup Monorepo Workspace
MONO-002 Setup Shared Packages
API-001 Setup NestJS Application
WEB-001 Setup Customer App
WEB-002 Setup Admin App
WEB-003 Setup Public Web App
DB-001 Setup PostgreSQL
DB-002 Setup Prisma
DB-003 Create Initial Prisma Schema
```

---

## Phase 1

```txt
AUTH-001 Create Users Module
AUTH-002 Create Roles Module
AUTH-003 Create Permissions Module
AUTH-004 Create Auth Module
AUTH-005 Implement Register API
AUTH-006 Implement Login API
AUTH-007 Implement Current User API
AUTH-008 Implement JWT Guard
AUTH-009 Implement Permissions Guard
AUTH-010 Create Login Page
AUTH-011 Create Register Page
```

---

## Phase 2

```txt
None
```

---

## Phase 3

```txt
None
```

---

## Phase 4

```txt
None
```

---

## Phase 5

```txt
None
```

---

## Phase 6

```txt
None
```

---

## Phase 7

```txt
None
```

---

## Phase 8

```txt
None
```

---

## Phase 9

```txt
None
```

---

## Phase 10

```txt
None
```

---

# Current Blockers

```txt
None
```

---

# Technical Decisions

## Decision Log

### DEC-001

Date:

```txt
2026-06-12
```

Decision:

```txt
Use Monorepo with TurboRepo
```

Reason:

```txt
Shared types and shared UI between apps.
```

Status:

```txt
ACTIVE
```

---

# MVP Readiness

## MVP Critical Path

| Module     | Status      |
| ---------- | ----------- |
| Auth       | NOT_STARTED |
| Invitation | NOT_STARTED |
| Guests     | NOT_STARTED |
| RSVP       | NOT_STARTED |
| Calendar   | NOT_STARTED |
| Gift       | NOT_STARTED |
| Check-In   | NOT_STARTED |
| Analytics  | NOT_STARTED |

---

## MVP Completion

```txt
0%
```

---

# Next Tasks

Priority Order:

```txt
1. INV-001 Create Invitation Theme Schema
2. INV-002 Create Invitation Schema
3. INV-003 Implement Create Invitation API
```

---

# Notes

```txt
MONO-001 completed.
MONO-002 completed.
API-001 completed.
WEB-001 completed.
WEB-002 completed.
WEB-003 completed.
DB-001 completed.
DB-002 completed.
DB-003 completed.
Phase 0 Foundation Ready. Moving to Phase 1.
AUTH-001 completed.
AUTH-002 completed.
AUTH-003 completed.
AUTH-004 completed.
AUTH-005 completed.
AUTH-006 completed.
```

---

# Update Rules

Setelah task selesai:

Contoh:

```txt
MONO-001
```

Pindahkan:

```txt
TODO
```

ke:

```txt
DONE
```

Tambahkan ke:

```txt
Completed Tasks
```

Update:

```txt
Phase Progress
Milestone Progress
MVP Completion
```

---

# AI Agent Instructions

Saat menyelesaikan task:

1. Update backlog.md status.
2. Update progress.md status.
3. Tambahkan task ke Completed Tasks.
4. Update percentage jika diperlukan.
5. Update Current Phase jika phase selesai.
6. Update Current Milestone jika milestone tercapai.
7. Tambahkan blocker jika ada masalah.
8. Tambahkan Decision Log jika ada keputusan arsitektur penting.
