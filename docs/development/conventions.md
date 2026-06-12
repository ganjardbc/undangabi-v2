# UndangAbi V2 - Development Conventions

Path:

```txt
docs/development/conventions.md
```

## Overview

Dokumen ini menjelaskan convention development UndangAbi V2.

Tujuan:

* Menjaga struktur project konsisten.
* Mempermudah kerja AI Coding Agent.
* Mempermudah maintenance.
* Mengikuti pola monorepo seperti `umkm-pos`.

---

# Monorepo Convention

Project menggunakan:

```txt
pnpm workspace
turbo
```

Struktur:

```txt
undangabi/

├── apps/
│   ├── web/
│   ├── customer/
│   ├── admin/
│   └── api/
│
├── packages/
│   ├── ui/
│   ├── shared-types/
│   ├── shared-utils/
│   ├── eslint-config/
│   └── tsconfig/
│
├── docs/
├── infra/
├── package.json
├── pnpm-workspace.yaml
└── turbo.json
```

Workspace:

```yaml
packages:
  - 'apps/*'
  - 'packages/*'
```

---

# Package Naming

Gunakan scope:

```txt
@undangabi/*
```

Examples:

```txt
@undangabi/ui
@undangabi/shared-types
@undangabi/shared-utils
@undangabi/eslint-config
@undangabi/tsconfig
```

Apps:

```txt
undangabi-web
undangabi-customer
undangabi-admin
undangabi-api
```

---

# Root Scripts

Root `package.json` minimal memiliki:

```json
{
  "scripts": {
    "dev": "turbo dev",
    "build": "turbo build",
    "test": "turbo test",
    "lint": "turbo lint",
    "format": "turbo format",
    "typecheck": "turbo typecheck"
  }
}
```

---

# Turbo Task Convention

`turbo.json` menggunakan task:

```txt
dev
build
test
lint
format
typecheck
preview
```

Rules:

* `dev` tidak di-cache.
* `preview` tidak di-cache.
* `build` bergantung ke `^build`.
* `typecheck` bergantung ke `^typecheck`.
* `test` boleh bergantung ke `^build`.

---

# TypeScript Convention

Rules:

```txt
Strict mode enabled
No implicit any
Use explicit DTO/type
Prefer type over interface for simple object
Use interface only when extensibility is needed
```

Jangan gunakan:

```ts
any
```

Kecuali benar-benar tidak bisa dihindari.

---

# File Naming Convention

## General

Gunakan kebab-case.

```txt
guest-table.vue
create-invitation.dto.ts
invitation-status.constant.ts
```

## NestJS Files

```txt
*.module.ts
*.controller.ts
*.service.ts
*.dto.ts
*.entity.ts
*.guard.ts
*.decorator.ts
```

## Vue Files

Gunakan PascalCase untuk reusable component:

```txt
GuestTable.vue
InvitationCard.vue
UiButton.vue
```

Gunakan kebab-case untuk page jika mengikuti pola existing project:

```txt
list.vue
create.vue
edit.vue
detail.vue
```

---

# Backend Module Convention

Setiap module NestJS:

```txt
module-name/

├── dto/
├── entities/
├── constants/
│
├── module-name.module.ts
├── module-name.controller.ts
└── module-name.service.ts
```

Example:

```txt
invitations/

├── dto/
│   ├── create-invitation.dto.ts
│   └── update-invitation.dto.ts
│
├── entities/
│   └── invitation.entity.ts
│
├── constants/
│   └── invitation-status.constant.ts
│
├── invitations.module.ts
├── invitations.controller.ts
└── invitations.service.ts
```

---

# Frontend Module Convention

Setiap frontend module:

```txt
modules/module-name/

├── pages/
├── components/
├── stores/
├── services/
├── types/
└── router/
```

Example:

```txt
modules/invitations/

├── pages/
│   ├── list.vue
│   ├── create.vue
│   └── builder.vue
│
├── components/
│   ├── InvitationTable.vue
│   └── InvitationForm.vue
│
├── stores/
│   └── invitation.store.ts
│
├── services/
│   └── invitation.service.ts
│
├── types/
│   └── invitation.type.ts
│
└── router/
    └── index.ts
```

---

# Frontend Core Convention

Ikuti pola `umkm-pos`:

```txt
src/

├── core/
│   ├── initiate.ts
│   ├── global-routes.ts
│   ├── global-components.ts
│   └── global-styles.ts
│
├── modules/
└── shared/
```

`main.ts` harus tipis.

```ts
import './core/global-components';
import './core/global-styles';
import './core/initiate';
```

---

# Dynamic Route Convention

Gunakan auto-load route per module.

```ts
const modules = import.meta.glob('../modules/**/router/index.ts', {
  eager: true,
});
```

Setiap module bertanggung jawab atas route-nya sendiri.

---

# Route Meta Convention

Gunakan:

```ts
meta: {
  title: 'Invitation List',
  layout: 'dashboard',
  permission: ['manage_own_invitations'],
}
```

Layout:

```txt
auth
dashboard
admin
public
error
```

---

# Store Convention

Gunakan Pinia.

File:

```txt
stores/invitation.store.ts
```

Naming:

```ts
useInvitationStore
useGuestStore
useAuthStore
```

Store berisi state UI dan cache sederhana.

Business logic utama tetap di backend.

---

# Service Convention

Frontend API call berada di service.

Example:

```txt
services/invitation.service.ts
```

Service tidak boleh memanipulasi UI.

Service hanya:

```txt
call API
return data
handle API path
```

---

# Shared Types Convention

Shared types diletakkan di:

```txt
packages/shared-types
```

Digunakan oleh:

```txt
apps/api
apps/customer
apps/admin
apps/web
```

Example:

```txt
packages/shared-types/src/

├── user.ts
├── invitation.ts
├── guest.ts
├── rsvp.ts
└── index.ts
```

---

# Shared Utils Convention

Shared utils diletakkan di:

```txt
packages/shared-utils
```

Example:

```txt
slugify
formatDate
formatPhoneNumber
generateCalendarLink
```

Rules:

* Utils harus pure function.
* Tidak boleh bergantung ke Vue.
* Tidak boleh bergantung ke NestJS.
* Tidak boleh mengakses environment langsung.

---

# UI Package Convention

Reusable UI berada di:

```txt
packages/ui
```

Naming:

```txt
UiButton
UiInput
UiTable
UiModal
UiBadge
```

Domain component tidak masuk package UI jika terlalu spesifik.

Contoh tidak masuk UI package:

```txt
InvitationBuilder
GuestImportPreview
RsvpSummaryCard
```

Itu tetap di module masing-masing.

---

# Import Convention

Gunakan alias jika tersedia.

Frontend:

```ts
import { useAuthStore } from '@/modules/auth/stores/auth.store';
```

Shared package:

```ts
import type { Invitation } from '@undangabi/shared-types';
import { slugify } from '@undangabi/shared-utils';
```

---

# Environment Convention

Gunakan `.env`.

Backend:

```txt
DATABASE_URL
JWT_SECRET
S3_ENDPOINT
S3_ACCESS_KEY
S3_SECRET_KEY
S3_BUCKET
```

Frontend:

```txt
VITE_API_BASE_URL
VITE_PUBLIC_WEB_URL
```

Jangan commit `.env`.

Sediakan:

```txt
.env.example
```

---

# Git Convention

Branch naming:

```txt
feature/auth-module
feature/invitation-builder
fix/rsvp-submit-error
chore/setup-monorepo
docs/update-api-contract
```

Commit style:

```txt
feat: add invitation module
fix: resolve RSVP validation
docs: add API contract
chore: setup eslint config
refactor: simplify guest service
```

---

# Documentation Convention

Docs disimpan di:

```txt
docs/
```

Structure:

```txt
docs/

├── product/
│   └── requirements.md
│
├── architecture/
│   ├── tech-stack.md
│   ├── design.md
│   └── module-breakdown.md
│
├── database/
│   ├── erd.md
│   ├── database-design.md
│   └── prisma-schema-design.md
│
├── api/
│   └── api-contract.md
│
├── frontend/
│   ├── frontend-routes.md
│   ├── ui-pages.md
│   ├── design-system.md
│   ├── layouts.md
│   └── ui-components.md
│
├── backend/
│   ├── nestjs-guidelines.md
│   └── prisma-guidelines.md
│
└── development/
    └── conventions.md
```

---

# AI Coding Agent Rules

When using AI coding agents:

1. Always provide relevant docs.
2. Generate one module at a time.
3. Do not ask AI to generate the whole app in one prompt.
4. Start from backend foundation.
5. Validate generated code before moving to next module.

Recommended order:

```txt
1. Setup monorepo
2. Setup apps/api
3. Setup database + prisma
4. Setup auth/user/rbac
5. Setup invitations
6. Setup guests
7. Setup RSVP
8. Setup check-in
9. Setup frontend customer
10. Setup public web
11. Setup admin
```

---

# Forbidden Practices

Do not:

```txt
Mix domain logic into controller
Query database directly from frontend
Duplicate types between frontend and backend
Create one giant module
Create one giant component
Put all routes in one file
Use any everywhere
Skip ownership validation
Expose draft invitation publicly
Store uploaded files in database
```
