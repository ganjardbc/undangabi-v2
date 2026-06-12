# UndangAbi V2 - Prisma Schema Design

## Overview

Dokumen ini menjelaskan rancangan Prisma schema untuk UndangAbi V2.

Dokumen ini bukan file final `schema.prisma`, tetapi menjadi panduan sebelum implementasi Prisma schema sebenarnya.

Referensi utama:

* Product Requirements
* System Design
* ERD
* Database Design
* API Contract

---

# Prisma Setup

## Generator

```prisma
generator client {
  provider = "prisma-client-js"
}
```

## Datasource

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

---

# Naming Rules

## Model Name

Gunakan PascalCase.

Contoh:

```txt
User
Role
Permission
Invitation
Guest
Rsvp
CheckIn
AnalyticsEvent
```

## Database Table Name

Gunakan snake_case plural dengan `@@map`.

Contoh:

```prisma
model User {
  id String @id @default(uuid())

  @@map("users")
}
```

## Field Name

Gunakan camelCase di Prisma, lalu mapping ke snake_case menggunakan `@map`.

Contoh:

```prisma
createdAt DateTime @default(now()) @map("created_at")
```

---

# Global Field Convention

Gunakan UUID string sebagai primary key.

```prisma
id String @id @default(uuid()) @db.Uuid
```

Gunakan timestamp:

```prisma
createdAt DateTime @default(now()) @map("created_at")
updatedAt DateTime @updatedAt @map("updated_at")
deletedAt DateTime? @map("deleted_at")
```

---

# Enums

## UserStatus

```prisma
enum UserStatus {
  active
  inactive
  suspended
}
```

## InvitationStatus

```prisma
enum InvitationStatus {
  draft
  published
  archived
}
```

## EventType

```prisma
enum EventType {
  wedding
  khitanan
  birthday
  graduation
  seminar
  gathering
  custom
}
```

## GuestStatus

```prisma
enum GuestStatus {
  not_sent
  sent
  opened
  rsvp_submitted
  checked_in
}
```

## AttendanceStatus

```prisma
enum AttendanceStatus {
  attending
  not_attending
}
```

## GiftType

```prisma
enum GiftType {
  bank_transfer
  qris
}
```

## AnalyticsEventType

```prisma
enum AnalyticsEventType {
  invitation_viewed
  rsvp_submitted
  guestbook_submitted
  gift_clicked
  calendar_clicked
  qr_checked_in
}
```

---

# Core Models

## User

Purpose:

Menyimpan user platform.

```prisma
model User {
  id              String     @id @default(uuid()) @db.Uuid
  name            String
  email           String     @unique
  passwordHash    String?    @map("password_hash")
  phone           String?
  avatarUrl       String?    @map("avatar_url")
  status          UserStatus @default(active)
  emailVerifiedAt DateTime?  @map("email_verified_at")

  createdAt       DateTime   @default(now()) @map("created_at")
  updatedAt       DateTime   @updatedAt @map("updated_at")
  deletedAt       DateTime?  @map("deleted_at")

  userRoles       UserRole[]
  invitations     Invitation[]

  @@index([email])
  @@index([status])
  @@index([deletedAt])
  @@map("users")
}
```

---

## Role

```prisma
model Role {
  id              String           @id @default(uuid()) @db.Uuid
  name            String
  slug            String           @unique
  description     String?

  createdAt       DateTime         @default(now()) @map("created_at")
  updatedAt       DateTime         @updatedAt @map("updated_at")

  userRoles       UserRole[]
  rolePermissions RolePermission[]

  @@map("roles")
}
```

---

## Permission

```prisma
model Permission {
  id              String           @id @default(uuid()) @db.Uuid
  name            String
  slug            String           @unique
  description     String?

  createdAt       DateTime         @default(now()) @map("created_at")
  updatedAt       DateTime         @updatedAt @map("updated_at")

  rolePermissions RolePermission[]

  @@map("permissions")
}
```

---

## UserRole

```prisma
model UserRole {
  id        String   @id @default(uuid()) @db.Uuid
  userId    String   @map("user_id") @db.Uuid
  roleId    String   @map("role_id") @db.Uuid

  createdAt DateTime @default(now()) @map("created_at")

  user      User     @relation(fields: [userId], references: [id])
  role      Role     @relation(fields: [roleId], references: [id])

  @@unique([userId, roleId])
  @@index([userId])
  @@index([roleId])
  @@map("user_roles")
}
```

---

## RolePermission

```prisma
model RolePermission {
  id           String     @id @default(uuid()) @db.Uuid
  roleId       String     @map("role_id") @db.Uuid
  permissionId String     @map("permission_id") @db.Uuid

  createdAt    DateTime   @default(now()) @map("created_at")

  role         Role       @relation(fields: [roleId], references: [id])
  permission   Permission @relation(fields: [permissionId], references: [id])

  @@unique([roleId, permissionId])
  @@index([roleId])
  @@index([permissionId])
  @@map("role_permissions")
}
```

---

# Invitation Models

## Invitation

```prisma
model Invitation {
  id                String           @id @default(uuid()) @db.Uuid
  userId            String           @map("user_id") @db.Uuid
  themeId           String?          @map("theme_id") @db.Uuid

  title             String
  slug              String           @unique
  eventType         EventType        @default(wedding) @map("event_type")
  status            InvitationStatus @default(draft)

  coverImageUrl     String?          @map("cover_image_url")
  musicUrl          String?          @map("music_url")
  youtubeUrl        String?          @map("youtube_url")
  story             String?

  seoTitle          String?          @map("seo_title")
  seoDescription    String?          @map("seo_description")
  ogImageUrl        String?          @map("og_image_url")

  themeConfig       Json?            @map("theme_config")
  sectionVisibility Json?            @map("section_visibility")

  publishedAt       DateTime?        @map("published_at")
  archivedAt        DateTime?        @map("archived_at")

  createdAt         DateTime         @default(now()) @map("created_at")
  updatedAt         DateTime         @updatedAt @map("updated_at")
  deletedAt         DateTime?        @map("deleted_at")

  user              User             @relation(fields: [userId], references: [id])
  theme             InvitationTheme? @relation(fields: [themeId], references: [id])

  events            InvitationEvent[]
  galleries         InvitationGallery[]
  guests            Guest[]
  guestbookEntries  GuestbookEntry[]
  gifts             Gift[]
  analyticsEvents   AnalyticsEvent[]

  @@index([userId])
  @@index([slug])
  @@index([status])
  @@index([eventType])
  @@index([deletedAt])
  @@map("invitations")
}
```

---

## InvitationTheme

```prisma
model InvitationTheme {
  id            String       @id @default(uuid()) @db.Uuid
  name          String
  slug          String       @unique
  description   String?
  defaultConfig Json?        @map("default_config")
  isActive      Boolean      @default(true) @map("is_active")

  createdAt     DateTime     @default(now()) @map("created_at")
  updatedAt     DateTime     @updatedAt @map("updated_at")

  invitations   Invitation[]

  @@map("invitation_themes")
}
```

---

## InvitationEvent

```prisma
model InvitationEvent {
  id              String     @id @default(uuid()) @db.Uuid
  invitationId    String     @map("invitation_id") @db.Uuid

  title           String
  eventName       String?    @map("event_name")
  startAt         DateTime   @map("start_at")
  endAt           DateTime?  @map("end_at")

  locationName    String?    @map("location_name")
  locationAddress String?    @map("location_address")
  googleMapsUrl   String?    @map("google_maps_url")
  latitude        Decimal?   @db.Decimal(10, 7)
  longitude       Decimal?   @db.Decimal(10, 7)

  createdAt       DateTime   @default(now()) @map("created_at")
  updatedAt       DateTime   @updatedAt @map("updated_at")

  invitation      Invitation @relation(fields: [invitationId], references: [id])

  @@index([invitationId])
  @@index([startAt])
  @@map("invitation_events")
}
```

---

## InvitationGallery

```prisma
model InvitationGallery {
  id           String     @id @default(uuid()) @db.Uuid
  invitationId String     @map("invitation_id") @db.Uuid

  imageUrl     String     @map("image_url")
  caption      String?
  sortOrder    Int        @default(0) @map("sort_order")

  createdAt    DateTime   @default(now()) @map("created_at")
  updatedAt    DateTime   @updatedAt @map("updated_at")

  invitation   Invitation @relation(fields: [invitationId], references: [id])

  @@index([invitationId])
  @@map("invitation_galleries")
}
```

---

# Guest Models

## GuestCategory

```prisma
model GuestCategory {
  id           String   @id @default(uuid()) @db.Uuid
  invitationId String   @map("invitation_id") @db.Uuid

  name         String
  color        String?

  createdAt    DateTime @default(now()) @map("created_at")
  updatedAt    DateTime @updatedAt @map("updated_at")

  invitation   Invitation @relation(fields: [invitationId], references: [id])
  guests       Guest[]

  @@unique([invitationId, name])
  @@index([invitationId])
  @@map("guest_categories")
}
```

---

## Guest

```prisma
model Guest {
  id              String      @id @default(uuid()) @db.Uuid
  invitationId    String      @map("invitation_id") @db.Uuid
  categoryId      String?     @map("category_id") @db.Uuid

  name            String
  phone           String?
  email           String?

  invitationToken String      @unique @map("invitation_token")
  qrCodeToken     String      @unique @map("qr_code_token")

  status          GuestStatus @default(not_sent)
  maxGuestCount   Int         @default(1) @map("max_guest_count")

  openedAt        DateTime?   @map("opened_at")
  sentAt          DateTime?   @map("sent_at")

  createdAt       DateTime    @default(now()) @map("created_at")
  updatedAt       DateTime    @updatedAt @map("updated_at")
  deletedAt       DateTime?   @map("deleted_at")

  invitation      Invitation  @relation(fields: [invitationId], references: [id])
  category        GuestCategory? @relation(fields: [categoryId], references: [id])

  rsvp            Rsvp?
  checkIn         CheckIn?
  guestbookEntries GuestbookEntry[]
  analyticsEvents AnalyticsEvent[]

  @@index([invitationId])
  @@index([categoryId])
  @@index([status])
  @@index([phone])
  @@index([deletedAt])
  @@map("guests")
}
```

---

# RSVP Models

## Rsvp

```prisma
model Rsvp {
  id               String           @id @default(uuid()) @db.Uuid
  guestId          String           @unique @map("guest_id") @db.Uuid
  invitationId     String           @map("invitation_id") @db.Uuid

  attendanceStatus AttendanceStatus @map("attendance_status")
  guestCount       Int              @default(1) @map("guest_count")
  message          String?
  submittedAt      DateTime         @default(now()) @map("submitted_at")

  createdAt        DateTime         @default(now()) @map("created_at")
  updatedAt        DateTime         @updatedAt @map("updated_at")

  guest            Guest            @relation(fields: [guestId], references: [id])
  invitation       Invitation       @relation(fields: [invitationId], references: [id])

  @@index([invitationId])
  @@index([attendanceStatus])
  @@map("rsvps")
}
```

Note:

Model `Invitation` harus memiliki relation:

```prisma
rsvps Rsvp[]
```

---

# Guestbook Models

## GuestbookEntry

```prisma
model GuestbookEntry {
  id           String     @id @default(uuid()) @db.Uuid
  invitationId String     @map("invitation_id") @db.Uuid
  guestId      String?    @map("guest_id") @db.Uuid

  guestName    String?    @map("guest_name")
  message      String
  isVisible    Boolean    @default(true) @map("is_visible")

  createdAt    DateTime   @default(now()) @map("created_at")
  updatedAt    DateTime   @updatedAt @map("updated_at")

  invitation   Invitation @relation(fields: [invitationId], references: [id])
  guest        Guest?     @relation(fields: [guestId], references: [id])

  @@index([invitationId])
  @@index([guestId])
  @@index([isVisible])
  @@map("guestbook_entries")
}
```

---

# Gift Models

## Gift

```prisma
model Gift {
  id                String   @id @default(uuid()) @db.Uuid
  invitationId      String   @map("invitation_id") @db.Uuid

  type              GiftType
  bankName          String?  @map("bank_name")
  accountNumber     String?  @map("account_number")
  accountHolderName String?  @map("account_holder_name")
  qrisImageUrl      String?  @map("qris_image_url")
  isActive          Boolean  @default(true) @map("is_active")

  createdAt         DateTime @default(now()) @map("created_at")
  updatedAt         DateTime @updatedAt @map("updated_at")

  invitation        Invitation @relation(fields: [invitationId], references: [id])

  @@index([invitationId])
  @@index([type])
  @@index([isActive])
  @@map("gifts")
}
```

---

# Check-In Models

## CheckIn

```prisma
model CheckIn {
  id           String   @id @default(uuid()) @db.Uuid
  guestId      String   @unique @map("guest_id") @db.Uuid
  invitationId String   @map("invitation_id") @db.Uuid

  checkedInAt  DateTime @default(now()) @map("checked_in_at")
  checkedInBy  String?  @map("checked_in_by") @db.Uuid
  notes        String?

  createdAt    DateTime @default(now()) @map("created_at")
  updatedAt    DateTime @updatedAt @map("updated_at")

  guest        Guest      @relation(fields: [guestId], references: [id])
  invitation   Invitation @relation(fields: [invitationId], references: [id])

  @@index([invitationId])
  @@index([checkedInAt])
  @@map("check_ins")
}
```

Note:

Model `Invitation` harus memiliki relation:

```prisma
checkIns CheckIn[]
```

---

# Analytics Models

## AnalyticsEvent

```prisma
model AnalyticsEvent {
  id           String             @id @default(uuid()) @db.Uuid
  invitationId String             @map("invitation_id") @db.Uuid
  guestId      String?            @map("guest_id") @db.Uuid

  eventType    AnalyticsEventType @map("event_type")
  visitorId    String?            @map("visitor_id")
  ipAddress    String?            @map("ip_address")
  userAgent    String?            @map("user_agent")
  referrer     String?
  metadata     Json?

  createdAt    DateTime           @default(now()) @map("created_at")

  invitation   Invitation         @relation(fields: [invitationId], references: [id])
  guest        Guest?             @relation(fields: [guestId], references: [id])

  @@index([invitationId])
  @@index([guestId])
  @@index([eventType])
  @@index([visitorId])
  @@index([createdAt])
  @@map("analytics_events")
}
```

---

# Required Relation Additions

## Invitation Relation Additions

Pastikan model `Invitation` memiliki relation berikut:

```prisma
rsvps   Rsvp[]
checkIns CheckIn[]
```

Full relation section:

```prisma
events            InvitationEvent[]
galleries         InvitationGallery[]
guests            Guest[]
rsvps             Rsvp[]
guestbookEntries  GuestbookEntry[]
gifts             Gift[]
checkIns          CheckIn[]
analyticsEvents   AnalyticsEvent[]
```

---

# Seed Data

## Roles

```txt
admin
customer
```

## Permissions

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

## Themes

```txt
elegant
modern
nature
```

---

# Prisma Migration Strategy

## Initial Migration

```bash
pnpm --filter undangabi-api prisma migrate dev --name init
```

## Generate Client

```bash
pnpm --filter undangabi-api prisma generate
```

## Seed

```bash
pnpm --filter undangabi-api prisma db seed
```

---

# Implementation Notes

## Soft Delete

Soft delete should be implemented at service level.

Tables with soft delete:

```txt
users
invitations
guests
```

---

## JSON Validation

Prisma cannot fully validate JSON structure.

Validate these fields in service layer or DTO:

```txt
themeConfig
sectionVisibility
defaultConfig
metadata
```

---

## Gift Validation

Validation rules must be handled in DTO/service:

```txt
if type = bank_transfer:
  bankName required
  accountNumber required
  accountHolderName required

if type = qris:
  qrisImageUrl required
```

---

## Ownership Validation

Customer must only access own resources.

Ownership validation must happen in service layer.

Example:

```txt
Find invitation by id and userId.
If not found, return 404.
```

---

## Public Access Validation

Public invitation APIs must only return published invitations.

Rule:

```txt
status = published
deletedAt = null
```

---

# Future Models

Not included in MVP:

```prisma
model Plan {}
model Subscription {}
model Payment {}
model Team {}
model TeamMember {}
model CustomDomain {}
model WhatsAppReminder {}
model AiGeneration {}
```
