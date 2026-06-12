# UndangAbi V2 - Prisma Guidelines

Path:

```txt
docs/backend/prisma-guidelines.md
```

## Overview

Dokumen ini menjelaskan guideline penggunaan Prisma pada UndangAbi V2.

Guideline ini mengikuti pola backend monorepo seperti `umkm-pos`, yaitu Prisma digunakan di `apps/api`, seluruh akses database melalui service layer, dan Prisma client disediakan melalui `DatabaseModule`.

---

# Prisma Location

Prisma berada di:

```txt
apps/api/prisma/
```

Struktur:

```txt
apps/api/prisma/

├── schema.prisma
├── seed.ts
└── migrations/
```

---

# Database Module

Prisma client harus dibungkus dalam Database Module.

```txt
apps/api/src/database/

├── database.module.ts
└── prisma.service.ts
```

Service lain tidak boleh membuat PrismaClient sendiri.

Benar:

```ts
constructor(private readonly prisma: PrismaService) {}
```

Salah:

```ts
const prisma = new PrismaClient();
```

---

# Prisma Service

`PrismaService` bertanggung jawab untuk:

* Connect database
* Disconnect database
* Shared Prisma client
* Transaction support

Contoh:

```ts
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
```

---

# Schema Naming Rules

## Prisma Model

Gunakan PascalCase.

```prisma
User
Invitation
Guest
CheckIn
AnalyticsEvent
```

## Database Table

Gunakan snake_case plural.

```prisma
@@map("users")
@@map("invitations")
@@map("check_ins")
```

## Prisma Field

Gunakan camelCase.

```prisma
createdAt
updatedAt
deletedAt
```

## Database Column

Gunakan snake_case.

```prisma
@map("created_at")
@map("updated_at")
@map("deleted_at")
```

---

# ID Strategy

Gunakan UUID untuk semua primary key.

```prisma
id String @id @default(uuid()) @db.Uuid
```

Public token seperti `invitationToken` dan `qrCodeToken` tetap string biasa.

---

# Timestamp Rules

Semua table utama menggunakan:

```prisma
createdAt DateTime @default(now()) @map("created_at")
updatedAt DateTime @updatedAt @map("updated_at")
```

Table yang mendukung soft delete menggunakan:

```prisma
deletedAt DateTime? @map("deleted_at")
```

---

# Soft Delete Rules

Soft delete digunakan untuk:

```txt
users
invitations
guests
```

Query normal wajib menambahkan:

```ts
deletedAt: null
```

Contoh:

```ts
await this.prisma.invitation.findMany({
  where: {
    userId,
    deletedAt: null,
  },
});
```

---

# Hard Delete Rules

Hard delete boleh digunakan untuk:

```txt
role_permissions
user_roles
temporary records
```

Untuk MVP, data historis seperti RSVP, check-in, dan analytics tidak dihapus.

---

# Enum Rules

Enum Prisma menggunakan lowercase values agar cocok dengan database/API.

Contoh:

```prisma
enum InvitationStatus {
  draft
  published
  archived
}
```

Enum utama:

```txt
UserStatus
InvitationStatus
EventType
GuestStatus
AttendanceStatus
GiftType
AnalyticsEventType
```

---

# Relation Rules

Setiap relation wajib jelas.

Contoh:

```prisma
user User @relation(fields: [userId], references: [id])
```

Untuk one-to-many:

```prisma
model User {
  invitations Invitation[]
}
```

Untuk one-to-one:

```prisma
model Guest {
  rsvp    Rsvp?
  checkIn CheckIn?
}
```

---

# Index Rules

Tambahkan index untuk field yang sering dipakai query.

Wajib index:

```txt
users.email
users.status
users.deleted_at

invitations.user_id
invitations.slug
invitations.status
invitations.deleted_at

guests.invitation_id
guests.category_id
guests.status
guests.invitation_token
guests.qr_code_token
guests.deleted_at

rsvps.invitation_id
rsvps.guest_id
rsvps.attendance_status

check_ins.invitation_id
check_ins.guest_id
check_ins.checked_in_at

analytics_events.invitation_id
analytics_events.guest_id
analytics_events.event_type
analytics_events.visitor_id
analytics_events.created_at
```

---

# Unique Constraint Rules

Wajib unique:

```txt
users.email
roles.slug
permissions.slug
invitations.slug
invitation_themes.slug
guests.invitation_token
guests.qr_code_token
rsvps.guest_id
check_ins.guest_id
```

Composite unique:

```txt
user_roles.user_id + role_id
role_permissions.role_id + permission_id
guest_categories.invitation_id + name
```

---

# JSON Field Rules

JSON digunakan untuk data fleksibel.

Fields:

```txt
invitations.theme_config
invitations.section_visibility
invitation_themes.default_config
analytics_events.metadata
```

Rules:

* JSON structure divalidasi di DTO/service.
* Jangan query kompleks berdasarkan JSON field untuk MVP.
* Jangan simpan data relasional penting di JSON.

---

# Transaction Rules

Gunakan transaction untuk operasi multi-step.

Contoh:

```ts
await this.prisma.$transaction(async (tx) => {
  const invitation = await tx.invitation.create({ data });

  await tx.guestCategory.createMany({
    data: defaultCategories.map((category) => ({
      invitationId: invitation.id,
      name: category.name,
      color: category.color,
    })),
  });

  return invitation;
});
```

Wajib transaction untuk:

```txt
Create invitation + default categories
Duplicate invitation
Import guests
Submit RSVP
QR check-in
```

---

# Pagination Rules

Semua list endpoint wajib support pagination.

Input:

```txt
page
limit
search
sort
order
```

Query:

```ts
const skip = (page - 1) * limit;

const [items, total] = await this.prisma.$transaction([
  this.prisma.guest.findMany({
    where,
    skip,
    take: limit,
    orderBy,
  }),
  this.prisma.guest.count({ where }),
]);
```

---

# Ownership Query Rules

Customer query wajib scoped by owner.

Contoh:

```ts
await this.prisma.invitation.findFirst({
  where: {
    id: invitationId,
    userId: currentUser.id,
    deletedAt: null,
  },
});
```

Untuk nested resource:

```ts
await this.prisma.guest.findFirst({
  where: {
    id: guestId,
    invitation: {
      id: invitationId,
      userId: currentUser.id,
      deletedAt: null,
    },
    deletedAt: null,
  },
});
```

---

# Public Query Rules

Public query hanya boleh mengambil invitation yang published.

```ts
await this.prisma.invitation.findFirst({
  where: {
    slug,
    status: 'published',
    deletedAt: null,
  },
});
```

---

# Analytics Rules

Analytics bersifat append-only.

Gunakan:

```ts
await this.prisma.analyticsEvent.create({
  data: {
    invitationId,
    guestId,
    eventType,
    visitorId,
    metadata,
  },
});
```

Jangan update analytics event kecuali benar-benar diperlukan.

---

# Seed Rules

Seed wajib membuat:

```txt
roles
permissions
role_permissions
invitation_themes
```

Default roles:

```txt
admin
customer
```

Default themes:

```txt
elegant
modern
nature
```

---

# Migration Rules

Gunakan migration yang jelas.

Contoh:

```bash
pnpm --filter undangabi-api prisma migrate dev --name init
```

Nama migration harus deskriptif:

```txt
init
add_invitation_tables
add_guest_tables
add_check_in_tables
```

Jangan edit migration lama setelah sudah dipush.

---

# Prisma Generate

Setelah mengubah schema:

```bash
pnpm --filter undangabi-api prisma generate
```

---

# Prisma Studio

Untuk debug lokal:

```bash
pnpm --filter undangabi-api prisma studio
```

---

# Validation Boundary

Prisma hanya menjaga struktur database.

Validation bisnis tetap di DTO/service.

Contoh:

```txt
Jika gift type = bank_transfer:
bankName wajib
accountNumber wajib
accountHolderName wajib
```

Jangan berharap Prisma menangani validasi bisnis seperti ini.

---

# Forbidden Practices

Jangan:

```txt
Membuat PrismaClient di luar PrismaService
Query tanpa ownership check
Query soft deleted data tanpa alasan
Menyimpan file binary di database
Menyimpan password plain text
Menghapus analytics event
Mengandalkan JSON untuk relasi penting
```
