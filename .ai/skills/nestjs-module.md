# .ai/skills/nestjs-module.md

## Purpose

Gunakan skill ini ketika membuat atau mengubah module NestJS.

---

# Architecture

Project menggunakan:

```txt
NestJS
Prisma
PostgreSQL
JWT
RBAC
```

Module pattern:

```txt
module-name/

├── dto/
├── entities/
├── constants/

├── module-name.module.ts
├── module-name.controller.ts
└── module-name.service.ts
```

---

# Controller Rules

Controller harus tipis.

Controller hanya boleh:

```txt
Receive Request
Use DTO
Use Decorator
Call Service
Return Response
```

Jangan menaruh:

```txt
Business Logic
Database Query
Complex Validation
```

di controller.

---

# Service Rules

Service bertanggung jawab untuk:

```txt
Business Logic
Ownership Validation
Database Query
Transaction
Error Handling
```

---

# DTO Rules

Semua request body wajib menggunakan DTO.

Gunakan:

```txt
class-validator
class-transformer
```

---

# RBAC Rules

Gunakan:

```ts
@Permissions(...)
```

untuk protected endpoint.

---

# Ownership Rules

Customer hanya boleh mengakses resource miliknya sendiri.

Selalu query menggunakan:

```ts
userId
deletedAt
```

---

# Prisma Rules

Gunakan:

```ts
constructor(
  private readonly prisma: PrismaService,
) {}
```

Jangan membuat PrismaClient baru.

---

# Response Rules

Ikuti API Contract.

Success:

```json
{
  "success": true,
  "message": "Success",
  "data": {}
}
```

---

# Output Checklist

Pastikan:

```txt
DTO dibuat
Controller dibuat
Service dibuat
Module didaftarkan
Ownership validation ada
Permission validation ada
```
