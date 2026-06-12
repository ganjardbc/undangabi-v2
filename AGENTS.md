# AGENTS.md

## Project

UndangAbi V2

## Product Summary

UndangAbi V2 adalah platform **Digital Invitation + Guest Management System**.

Produk ini memungkinkan customer untuk:

* Membuat lebih dari satu undangan.
* Mengelola tamu.
* Mengirim personalized invitation.
* Menerima RSVP.
* Mengelola guestbook.
* Menampilkan digital gift.
* Menggunakan QR Check-In.
* Menampilkan Add To Calendar.
* Melihat analytics undangan.

---

# Mandatory Context

Sebelum mengerjakan task, baca dokumen berikut sesuai kebutuhan.

## Product

```txt
docs/product/requirements.md
```

## Architecture

```txt
docs/architecture/tech-stack.md
docs/architecture/design.md
docs/architecture/module-breakdown.md
```

## Database

```txt
docs/database/erd.md
docs/database/database-design.md
docs/database/prisma-schema-design.md
```

## API

```txt
docs/api/api-contract.md
```

## Frontend

```txt
docs/frontend/frontend-routes.md
docs/frontend/ui-pages.md
docs/frontend/design-system.md
docs/frontend/layouts.md
docs/frontend/ui-components.md
```

## Backend

```txt
docs/backend/nestjs-guidelines.md
docs/backend/prisma-guidelines.md
```

## Development

```txt
docs/development/conventions.md
docs/development/roadmap.md
docs/development/backlog.md
docs/development/milestones.md
```

---

# Architecture Rules

Project menggunakan:

```txt
Monorepo
PNPM Workspace
TurboRepo
Vue 3
Vite
Pinia
PrimeVue
Tailwind CSS
NestJS
Prisma
PostgreSQL
```

Root structure:

```txt
apps/
  web/
  customer/
  admin/
  api/

packages/
  ui/
  shared-types/
  shared-utils/
  eslint-config/
  tsconfig/

docs/
infra/
```

---

# Implementation Principles

## Build One Task At A Time

Jangan membangun seluruh aplikasi sekaligus.

Ikuti urutan:

```txt
docs/development/backlog.md
```

Selesaikan satu task kecil, lalu lanjut ke task berikutnya.

---

## Follow Roadmap

Gunakan:

```txt
docs/development/roadmap.md
```

sebagai urutan phase.

Jangan mengerjakan fitur di luar phase tanpa instruksi eksplisit.

---

## Respect MVP Scope

Fitur berikut **tidak masuk MVP**:

```txt
AI Features
Subscription
Team Collaboration
Custom Domain
White Label
WhatsApp Reminder
Marketplace Template
```

Jangan implementasikan fitur tersebut kecuali diminta eksplisit.

---

# Backend Rules

Backend berada di:

```txt
apps/api
```

Framework:

```txt
NestJS
Prisma
PostgreSQL
JWT
RBAC
```

Ikuti:

```txt
docs/backend/nestjs-guidelines.md
docs/backend/prisma-guidelines.md
```

---

## Backend Module Structure

Setiap module harus mengikuti struktur:

```txt
module-name/
  dto/
  entities/
  constants/

  module-name.module.ts
  module-name.controller.ts
  module-name.service.ts
```

Example:

```txt
invitations/
  dto/
    create-invitation.dto.ts
    update-invitation.dto.ts

  entities/
    invitation.entity.ts

  constants/
    invitation-status.constant.ts

  invitations.module.ts
  invitations.controller.ts
  invitations.service.ts
```

---

## Controller Rules

Controller hanya boleh:

* Menerima request.
* Menggunakan DTO.
* Menggunakan decorator.
* Memanggil service.
* Mengembalikan response.

Controller **tidak boleh** berisi business logic.

---

## Service Rules

Service berisi:

* Business logic.
* Ownership validation.
* Database query.
* Transaction.
* Error handling.
* Data transformation.

---

## Auth Rules

Gunakan global JWT guard.

Semua route protected secara default.

Public route wajib memakai:

```ts
@Public()
```

---

## RBAC Rules

Gunakan permission decorator.

Example:

```ts
@Permissions('manage_own_invitations')
```

Permission utama:

```txt
manage_users
manage_templates
manage_all_invitations
view_global_analytics

manage_own_invitations
manage_own_guests
manage_own_rsvp
view_own_analytics
```

---

## Ownership Rules

Customer hanya boleh mengakses resource miliknya sendiri.

Selalu scope query dengan `userId`.

Benar:

```ts
where: {
  id: invitationId,
  userId: currentUser.id,
  deletedAt: null,
}
```

Salah:

```ts
where: {
  id: invitationId,
}
```

Admin boleh mengakses semua data sesuai permission.

---

## Public API Rules

Public API hanya boleh mengembalikan invitation yang:

```txt
status = published
deletedAt = null
```

Jangan expose data sensitif.

---

## Prisma Rules

Jangan membuat PrismaClient baru di service.

Gunakan:

```ts
constructor(private readonly prisma: PrismaService) {}
```

Prisma berada di:

```txt
apps/api/prisma/schema.prisma
```

Soft delete untuk:

```txt
users
invitations
guests
```

Analytics bersifat append-only.

---

# Frontend Rules

Frontend berada di:

```txt
apps/web
apps/customer
apps/admin
```

Framework:

```txt
Vue 3
Vite
Pinia
Vue Router
PrimeVue
Tailwind CSS
```

---

## Frontend Structure

Ikuti pola:

```txt
src/
  core/
    initiate.ts
    global-routes.ts
    global-components.ts
    global-styles.ts

  modules/
  shared/
```

`main.ts` harus tipis.

Example:

```ts
import './core/global-components';
import './core/global-styles';
import './core/initiate';
```

---

## Frontend Module Structure

Setiap frontend module harus mengikuti:

```txt
modules/module-name/
  pages/
  components/
  stores/
  services/
  types/
  router/
```

Example:

```txt
modules/invitations/
  pages/
    list.vue
    create.vue
    builder.vue

  components/
    InvitationTable.vue
    InvitationForm.vue

  stores/
    invitation.store.ts

  services/
    invitation.service.ts

  types/
    invitation.type.ts

  router/
    index.ts
```

---

## Routing Rules

Setiap module memiliki route sendiri:

```txt
modules/*/router/index.ts
```

Global router auto-load route module menggunakan pattern:

```ts
import.meta.glob('../modules/**/router/index.ts', {
  eager: true,
});
```

Route meta harus menggunakan:

```ts
meta: {
  title: 'Page Title',
  layout: 'dashboard',
  permission: ['manage_own_invitations'],
}
```

---

## State Rules

Gunakan Pinia.

Store hanya untuk:

* Auth state.
* UI state.
* Cached module state.

Business logic utama tetap di backend.

---

## Service Rules

API call frontend harus berada di:

```txt
modules/module-name/services/
```

Service tidak boleh memanipulasi UI.

---

## UI Rules

Gunakan design system:

```txt
docs/frontend/design-system.md
```

Reusable generic component berada di:

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

Domain component tetap di module masing-masing.

---

# Shared Package Rules

## shared-types

Path:

```txt
packages/shared-types
```

Digunakan untuk type bersama:

```txt
User
Invitation
Guest
RSVP
Analytics
```

## shared-utils

Path:

```txt
packages/shared-utils
```

Isi:

```txt
slugify
formatDate
formatPhoneNumber
generateCalendarLink
```

Rules:

* Pure function.
* Tidak bergantung ke Vue.
* Tidak bergantung ke NestJS.
* Tidak membaca environment langsung.

---

# Database Rules

Ikuti:

```txt
docs/database/database-design.md
docs/database/prisma-schema-design.md
```

Wajib gunakan:

```txt
UUID primary key
snake_case database column
camelCase Prisma field
soft delete where required
index for frequently queried fields
```

---

# API Rules

Ikuti:

```txt
docs/api/api-contract.md
```

Base URL:

```txt
/api/v1
```

Response format:

```json
{
  "success": true,
  "message": "Success",
  "data": {}
}
```

List response:

```json
{
  "success": true,
  "message": "Success",
  "data": [],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "total_pages": 10
  }
}
```

---

# File Upload Rules

Upload module bertanggung jawab untuk:

* Validate file type.
* Validate file size.
* Upload to storage.
* Return URL.

Storage:

```txt
Cloudflare R2
MinIO fallback
```

Database hanya menyimpan URL, bukan binary file.

---

# Testing Rules

Minimal testing untuk:

```txt
Auth
RBAC
Invitation ownership
Guest import
RSVP submit
QR check-in
```

Jangan lanjut phase besar berikutnya kalau critical flow belum berjalan.

---

# Security Rules

Jangan pernah:

```txt
Menyimpan password plain text
Log JWT token
Log password
Expose draft invitation publicly
Query resource tanpa ownership check
Expose deleted records ke customer
Expose private user data ke public API
```

---

# Development Order

Ikuti urutan:

```txt
Phase 0 - Foundation
Phase 1 - Authentication & RBAC
Phase 2 - Invitation Core
Phase 4 - Guest Management
Phase 5 - RSVP & Guestbook
Phase 6 - Gifts & Calendar
Phase 7 - QR Check-In
Phase 8 - Analytics
Phase 3 - Event & Gallery
Phase 9 - Admin Panel
Phase 10 - Production Ready
```

Catatan:

Phase 3 boleh digeser setelah Phase 8 jika ingin fokus pada value utama MVP.

---

# AI Agent Working Rules

Saat mengerjakan task:

1. Baca dokumen terkait.
2. Pahami task dari `docs/development/backlog.md`.
3. Jangan mengubah scope tanpa alasan kuat.
4. Jangan membuat fitur di luar MVP.
5. Jangan refactor besar tanpa instruksi.
6. Jangan menghapus file tanpa alasan jelas.
7. Jangan membuat duplicate type jika sudah ada di `shared-types`.
8. Jangan membuat duplicate utility jika sudah ada di `shared-utils`.
9. Setelah selesai, jelaskan perubahan yang dibuat.
10. Pastikan command build/typecheck/lint relevan berjalan jika memungkinkan.

---

# Prompting Recommendation

Untuk AI Coding Agent, gunakan format prompt seperti ini:

```txt
Read AGENTS.md.

Task:
Implement AUTH-005 from docs/development/backlog.md.

Relevant docs:
- docs/backend/nestjs-guidelines.md
- docs/backend/prisma-guidelines.md
- docs/api/api-contract.md
- docs/database/prisma-schema-design.md

Rules:
- Follow existing monorepo structure.
- Do not implement features outside this task.
- Keep controller thin.
- Put business logic in service.
- Add DTO validation.
- Use PrismaService.
```

---

# Definition of Done

Sebuah task dianggap selesai jika:

```txt
Code implemented
No obvious TypeScript error
No duplicate logic
No broken existing flow
Follows folder convention
Follows API contract
Ownership rule applied where needed
Permission rule applied where needed
```

---

# Forbidden Actions

Jangan lakukan:

```txt
Generate all modules at once
Implement subscription
Implement AI features
Implement custom domain
Implement WhatsApp reminder
Bypass RBAC
Bypass ownership check
Store uploaded file binary in database
Use any without reason
Put all route in one global file
Put all business logic in controller
```

# Mandatory Workflow

Before marking any task as DONE:

Read:

.ai/workflows/task-completion.md

The task is not complete until all required documentation has been updated.
