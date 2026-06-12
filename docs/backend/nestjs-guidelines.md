# UndangAbi V2 - NestJS Guidelines

Path:

```txt
docs/backend/nestjs-guidelines.md
```

## Overview

Dokumen ini menjelaskan guideline implementasi backend NestJS untuk UndangAbi V2.

Guideline ini mengikuti pola project `umkm-pos`, yaitu:

* Modular monolith
* Module per domain
* Controller tipis
* Service berisi business logic
* Global JWT guard
* Public route menggunakan decorator
* RBAC menggunakan guard/decorator
* Prisma diakses melalui Database Module

---

# Backend App

Backend berada di:

```txt
apps/api
```

Stack:

```txt
NestJS
TypeScript
Prisma
PostgreSQL
JWT
RBAC
Swagger
```

---

# Root Structure

```txt
apps/api/src/

├── app.module.ts
├── main.ts
│
├── auth/
├── users/
├── rbac/
│
├── invitations/
├── invitation-themes/
├── invitation-events/
├── invitation-galleries/
│
├── guests/
├── guest-categories/
│
├── rsvp/
├── guestbook/
├── gifts/
├── check-in/
├── analytics/
├── seo/
├── calendar/
├── uploads/
│
├── database/
└── common/
```

---

# Module Pattern

Setiap domain harus dibuat sebagai module sendiri.

Contoh:

```txt
guests/

├── dto/
├── entities/
├── constants/
│
├── guests.module.ts
├── guests.controller.ts
└── guests.service.ts
```

Rules:

* `module.ts` hanya untuk dependency injection.
* `controller.ts` hanya untuk HTTP request/response.
* `service.ts` untuk business logic.
* `dto/` untuk request validation.
* `entities/` untuk response shape atau Swagger entity.
* `constants/` untuk enum, message, atau static value.

---

# App Module

`app.module.ts` harus mendaftarkan seluruh module domain.

Contoh:

```ts
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    DatabaseModule,

    AuthModule,
    UsersModule,
    RbacModule,

    InvitationsModule,
    InvitationThemesModule,
    InvitationEventsModule,
    InvitationGalleriesModule,

    GuestsModule,
    GuestCategoriesModule,

    RsvpModule,
    GuestbookModule,
    GiftsModule,
    CheckInModule,
    AnalyticsModule,
    SeoModule,
    CalendarModule,
    UploadsModule,
  ],
})
export class AppModule {}
```

---

# Global Guard Strategy

Gunakan JWT guard secara global seperti pola `umkm-pos`.

Default semua route harus protected.

Public route hanya boleh dibuka dengan decorator:

```ts
@Public()
```

Contoh:

```ts
@Public()
@Post('login')
login() {}
```

Protected route:

```ts
@Get('me')
me() {}
```

---

# Common Folder

```txt
common/

├── decorators/
│   ├── public.decorator.ts
│   ├── current-user.decorator.ts
│   └── permissions.decorator.ts
│
├── guards/
│   ├── jwt-auth.guard.ts
│   └── permissions.guard.ts
│
├── interceptors/
│   └── response.interceptor.ts
│
├── filters/
│   └── http-exception.filter.ts
│
├── pipes/
│
├── constants/
│
└── types/
```

---

# Auth Rules

Auth module bertanggung jawab untuk:

* Register
* Login
* Forgot Password
* Get current user
* Token validation

Auth module boleh bergantung ke:

```txt
UsersModule
RbacModule
UploadsModule
DatabaseModule
```

---

# RBAC Rules

RBAC mengikuti pola `umkm-pos`.

Roles:

```txt
admin
customer
```

Permissions:

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

Gunakan decorator:

```ts
@Permissions('manage_own_invitations')
```

Contoh:

```ts
@Permissions('manage_own_invitations')
@Get('invitations')
findAll() {}
```

---

# Controller Guideline

Controller tidak boleh berisi business logic.

Controller hanya boleh:

* Menerima request
* Memanggil service
* Mengembalikan response
* Menggunakan guard/decorator
* Menggunakan DTO

Contoh:

```ts
@Post()
@Permissions('manage_own_invitations')
create(
  @CurrentUser() user: CurrentUserPayload,
  @Body() dto: CreateInvitationDto,
) {
  return this.invitationsService.create(user.id, dto);
}
```

---

# Service Guideline

Service berisi:

* Business logic
* Ownership validation
* Database query
* Transaction
* Data transformation
* Error handling

Contoh ownership rule:

```txt
Customer hanya boleh mengakses invitation miliknya sendiri.
Admin boleh mengakses semua invitation.
```

Service harus melakukan pengecekan:

```ts
const invitation = await this.prisma.invitation.findFirst({
  where: {
    id,
    userId,
    deletedAt: null,
  },
});
```

---

# DTO Guideline

DTO wajib menggunakan:

```txt
class-validator
class-transformer
```

Contoh:

```ts
export class CreateInvitationDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  slug: string;

  @IsEnum(EventType)
  eventType: EventType;
}
```

Rules:

* Semua request body harus punya DTO.
* Jangan menggunakan `any`.
* Jangan validasi manual di controller.
* Validasi kompleks boleh dilakukan di service.

---

# Response Format

Semua response harus konsisten.

Success:

```json
{
  "success": true,
  "message": "Success",
  "data": {}
}
```

List:

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

Error:

```json
{
  "success": false,
  "message": "Validation error",
  "errors": {}
}
```

Gunakan interceptor global untuk membungkus response jika memungkinkan.

---

# Public API Rules

Public API hanya boleh membaca data undangan yang:

```txt
status = published
deleted_at = null
```

Public API tidak boleh mengembalikan data sensitif:

```txt
user email
internal id jika tidak perlu
admin data
deleted records
```

---

# Ownership Rules

Untuk customer route, query wajib scoped by owner.

Contoh:

```ts
where: {
  id: invitationId,
  userId: currentUser.id,
  deletedAt: null,
}
```

Jangan hanya query by id.

Salah:

```ts
where: {
  id: invitationId,
}
```

Benar:

```ts
where: {
  id: invitationId,
  userId: currentUser.id,
  deletedAt: null,
}
```

---

# Module Dependency Rules

Dependency antar module harus jelas.

Contoh:

```txt
GuestsModule
├── InvitationsModule
├── GuestCategoriesModule
├── AnalyticsModule
└── DatabaseModule
```

Hindari circular dependency.

Jika butuh data dari module lain, gunakan service yang di-export dari module tersebut.

---

# Error Handling

Gunakan NestJS exception:

```txt
BadRequestException
UnauthorizedException
ForbiddenException
NotFoundException
ConflictException
UnprocessableEntityException
```

Contoh:

```ts
throw new NotFoundException('Invitation not found');
```

---

# File Upload Rules

Upload module bertanggung jawab untuk:

* Validasi file type
* Validasi file size
* Upload ke storage
* Return public URL

File yang didukung:

```txt
image
music
csv
```

Storage:

```txt
Cloudflare R2
MinIO fallback
```

Database hanya menyimpan URL.

---

# Transaction Rules

Gunakan Prisma transaction untuk proses yang membuat banyak data sekaligus.

Contoh:

* Create invitation + default guest categories
* Duplicate invitation + events + gallery + gifts
* Import guests from CSV
* Submit RSVP + update guest status + analytics event
* Check-in guest + update guest status + analytics event

---

# Logging Rules

Log hanya untuk:

* Error penting
* Upload failure
* Auth failure suspicious
* External service failure

Jangan log:

* Password
* JWT token
* QR token
* Sensitive user data

---

# Testing Rules

Minimal test:

```txt
Auth
RBAC
Invitation ownership
Guest import
RSVP submit
QR check-in
```

Test harus fokus pada business rule.

---

# Implementation Order

```txt
1. DatabaseModule
2. CommonModule
3. AuthModule
4. UsersModule
5. RbacModule
6. UploadsModule
7. InvitationThemesModule
8. InvitationsModule
9. InvitationEventsModule
10. InvitationGalleriesModule
11. GuestCategoriesModule
12. GuestsModule
13. RsvpModule
14. GuestbookModule
15. GiftsModule
16. CheckInModule
17. AnalyticsModule
18. SeoModule
19. CalendarModule
```
