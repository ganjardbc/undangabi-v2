# UndangAbi V2 - Module Breakdown

## Overview

Dokumen ini menjelaskan pembagian module pada UndangAbi V2.

Tujuan dokumen:

* Menjadi acuan implementasi backend dan frontend.
* Membantu AI Coding Agent memahami batas tanggung jawab setiap module.
* Menghindari overlap antar module.
* Menjadi blueprint sebelum membuat API Contract dan Prisma Schema.

---

# Application Scope

UndangAbi V2 menggunakan monorepo dengan beberapa aplikasi:

```txt
apps/web       # Public invitation website
apps/customer  # Customer dashboard
apps/admin     # Admin dashboard
apps/api       # Backend API
```

---

# Backend Module List

```txt
auth
users
rbac

invitations
invitation-themes
invitation-events
invitation-galleries

guests
guest-categories

rsvp
guestbook
gifts
check-in
analytics

seo
calendar
uploads
database
common
```

---

# Frontend Module List

## apps/customer

```txt
auth
dashboard
invitations
guests
rsvp
guestbook
gifts
check-in
analytics
settings
```

## apps/admin

```txt
auth
dashboard
users
invitations
templates
analytics
settings
```

## apps/web

```txt
public-invitation
public-rsvp
public-guestbook
public-calendar
```

---

# Backend Modules

---

## Auth Module

### Responsibility

Mengelola authentication user.

### Features

* Register
* Login
* Logout
* Forgot Password
* Token validation

### Tables

* users
* roles
* user_roles
* permissions
* role_permissions

### Dependencies

* Users Module
* RBAC Module
* Database Module

### API Endpoints

```txt
POST /auth/register
POST /auth/login
POST /auth/forgot-password
GET /auth/me
POST /auth/logout
```

### Permissions

Public:

* register
* login
* forgot password

Protected:

* me
* logout

### Frontend Usage

Used by:

```txt
apps/customer
apps/admin
```

---

## Users Module

### Responsibility

Mengelola data user.

### Features

* Get profile
* Update profile
* Change password
* Admin user management

### Tables

* users
* user_roles

### Dependencies

* RBAC Module
* Database Module

### API Endpoints

```txt
GET /users/me
PATCH /users/me
PATCH /users/me/password

GET /admin/users
GET /admin/users/:id
PATCH /admin/users/:id
DELETE /admin/users/:id
```

### Permissions

```txt
manage_users
```

For customer profile:

```txt
authenticated_user
```

### Frontend Usage

Used by:

```txt
apps/customer/settings
apps/admin/users
```

---

## RBAC Module

### Responsibility

Mengelola role dan permission.

### Features

* Role checking
* Permission checking
* Assign role to user
* Seed default role and permission

### Tables

* roles
* permissions
* user_roles
* role_permissions

### Dependencies

* Database Module

### API Endpoints

```txt
GET /admin/roles
GET /admin/permissions
POST /admin/users/:id/roles
DELETE /admin/users/:id/roles/:roleId
```

### Permissions

```txt
manage_users
```

### Notes

Struktur module ini mengikuti pola dari project `umkm-pos`.

---

## Invitations Module

### Responsibility

Mengelola entity utama undangan.

### Features

* Create invitation
* Update invitation
* Delete invitation
* Archive invitation
* Publish invitation
* Duplicate invitation
* Get invitation detail
* List own invitations
* Admin list all invitations

### Tables

* invitations
* invitation_themes

### Dependencies

* Users Module
* Invitation Themes Module
* Uploads Module
* Analytics Module

### API Endpoints

```txt
GET /invitations
POST /invitations
GET /invitations/:id
PATCH /invitations/:id
DELETE /invitations/:id

POST /invitations/:id/publish
POST /invitations/:id/archive
POST /invitations/:id/duplicate

GET /admin/invitations
GET /admin/invitations/:id
```

### Permissions

```txt
manage_own_invitations
manage_all_invitations
```

### Frontend Usage

Used by:

```txt
apps/customer/invitations
apps/admin/invitations
apps/web/public-invitation
```

---

## Invitation Themes Module

### Responsibility

Mengelola tema undangan.

### Features

* List active themes
* Get theme detail
* Admin create theme
* Admin update theme
* Admin deactivate theme

### Tables

* invitation_themes
* invitations

### Dependencies

* Database Module

### API Endpoints

```txt
GET /invitation-themes
GET /invitation-themes/:id

GET /admin/invitation-themes
POST /admin/invitation-themes
PATCH /admin/invitation-themes/:id
DELETE /admin/invitation-themes/:id
```

### Permissions

```txt
manage_templates
```

### Default Themes

```txt
elegant
modern
nature
```

---

## Invitation Events Module

### Responsibility

Mengelola detail acara dalam undangan.

### Features

* Add event
* Update event
* Delete event
* List events by invitation

### Tables

* invitation_events
* invitations

### Dependencies

* Invitations Module
* Calendar Module

### API Endpoints

```txt
GET /invitations/:invitationId/events
POST /invitations/:invitationId/events
PATCH /invitations/:invitationId/events/:eventId
DELETE /invitations/:invitationId/events/:eventId
```

### Permissions

```txt
manage_own_invitations
```

---

## Invitation Galleries Module

### Responsibility

Mengelola gallery foto undangan.

### Features

* Upload gallery image
* Update caption
* Reorder image
* Delete image

### Tables

* invitation_galleries
* invitations

### Dependencies

* Invitations Module
* Uploads Module

### API Endpoints

```txt
GET /invitations/:invitationId/galleries
POST /invitations/:invitationId/galleries
PATCH /invitations/:invitationId/galleries/:galleryId
DELETE /invitations/:invitationId/galleries/:galleryId
```

### Permissions

```txt
manage_own_invitations
```

---

## Guest Categories Module

### Responsibility

Mengelola kategori tamu.

### Features

* Create category
* Update category
* Delete category
* List categories by invitation
* Seed default categories

### Tables

* guest_categories
* guests

### Dependencies

* Invitations Module

### API Endpoints

```txt
GET /invitations/:invitationId/guest-categories
POST /invitations/:invitationId/guest-categories
PATCH /invitations/:invitationId/guest-categories/:categoryId
DELETE /invitations/:invitationId/guest-categories/:categoryId
```

### Permissions

```txt
manage_own_guests
```

---

## Guests Module

### Responsibility

Mengelola tamu undangan.

### Features

* Create guest
* Update guest
* Delete guest
* List guests
* Search guests
* Filter guests
* Import CSV
* Generate personalized link
* Generate QR code token
* Track opened invitation

### Tables

* guests
* guest_categories
* invitations

### Dependencies

* Invitations Module
* Guest Categories Module
* Uploads Module
* Analytics Module

### API Endpoints

```txt
GET /invitations/:invitationId/guests
POST /invitations/:invitationId/guests
GET /invitations/:invitationId/guests/:guestId
PATCH /invitations/:invitationId/guests/:guestId
DELETE /invitations/:invitationId/guests/:guestId

POST /invitations/:invitationId/guests/import
GET /invitations/:invitationId/guests/:guestId/link
GET /invitations/:invitationId/guests/:guestId/qr
```

### Permissions

```txt
manage_own_guests
```

### Public APIs

```txt
GET /public/invitations/:slug/guest
POST /public/invitations/:slug/guest/opened
```

---

## RSVP Module

### Responsibility

Mengelola konfirmasi kehadiran.

### Features

* Submit RSVP
* Update RSVP
* View RSVP list
* RSVP summary

### Tables

* rsvps
* guests
* invitations

### Dependencies

* Guests Module
* Invitations Module
* Analytics Module

### API Endpoints

```txt
POST /public/invitations/:slug/rsvp

GET /invitations/:invitationId/rsvps
GET /invitations/:invitationId/rsvps/summary
PATCH /invitations/:invitationId/rsvps/:rsvpId
```

### Permissions

```txt
manage_own_rsvp
```

---

## Guestbook Module

### Responsibility

Mengelola ucapan dan doa.

### Features

* Submit guestbook entry
* List public visible entries
* Hide or show entry
* Delete entry

### Tables

* guestbook_entries
* guests
* invitations

### Dependencies

* Invitations Module
* Guests Module

### API Endpoints

```txt
POST /public/invitations/:slug/guestbook
GET /public/invitations/:slug/guestbook

GET /invitations/:invitationId/guestbook
PATCH /invitations/:invitationId/guestbook/:entryId/visibility
DELETE /invitations/:invitationId/guestbook/:entryId
```

### Permissions

```txt
manage_own_invitations
```

---

## Gifts Module

### Responsibility

Mengelola amplop digital.

### Features

* Add bank account
* Add QRIS
* Update gift
* Delete gift
* Public gift display
* Track gift clicked

### Tables

* gifts
* invitations

### Dependencies

* Invitations Module
* Uploads Module
* Analytics Module

### API Endpoints

```txt
GET /public/invitations/:slug/gifts

GET /invitations/:invitationId/gifts
POST /invitations/:invitationId/gifts
PATCH /invitations/:invitationId/gifts/:giftId
DELETE /invitations/:invitationId/gifts/:giftId

POST /public/invitations/:slug/gifts/:giftId/click
```

### Permissions

```txt
manage_own_invitations
```

---

## Check-In Module

### Responsibility

Mengelola QR check-in tamu.

### Features

* Validate QR code
* Check-in guest
* Prevent duplicate check-in
* Check-in summary
* Attendance list

### Tables

* check_ins
* guests
* invitations

### Dependencies

* Guests Module
* Invitations Module
* Analytics Module

### API Endpoints

```txt
POST /invitations/:invitationId/check-in/validate
POST /invitations/:invitationId/check-in

GET /invitations/:invitationId/check-ins
GET /invitations/:invitationId/check-ins/summary
```

### Permissions

```txt
manage_own_guests
```

---

## Analytics Module

### Responsibility

Mengelola tracking event dan agregasi analytics.

### Features

* Track invitation viewed
* Track RSVP submitted
* Track guestbook submitted
* Track gift clicked
* Track calendar clicked
* Track QR checked-in
* Get dashboard metrics

### Tables

* analytics_events
* invitations
* guests
* rsvps
* check_ins

### Dependencies

* Invitations Module
* Guests Module

### API Endpoints

```txt
POST /public/invitations/:slug/analytics

GET /invitations/:invitationId/analytics
GET /invitations/:invitationId/analytics/visitors
GET /invitations/:invitationId/analytics/rsvp
GET /invitations/:invitationId/analytics/attendance

GET /admin/analytics
```

### Permissions

```txt
view_own_analytics
view_global_analytics
```

---

## SEO Module

### Responsibility

Mengelola SEO metadata dan social preview.

### Features

* Update SEO title
* Update SEO description
* Update OG image
* Generate public meta data

### Tables

* invitations

### Dependencies

* Invitations Module
* Uploads Module

### API Endpoints

```txt
PATCH /invitations/:invitationId/seo
GET /public/invitations/:slug/meta
```

### Permissions

```txt
manage_own_invitations
```

---

## Calendar Module

### Responsibility

Mengelola calendar integration.

### Features

* Generate Google Calendar URL
* Generate Outlook Calendar URL
* Generate ICS file
* Track calendar clicked

### Tables

* invitation_events
* analytics_events

### Dependencies

* Invitation Events Module
* Analytics Module

### API Endpoints

```txt
GET /public/invitations/:slug/calendar/google
GET /public/invitations/:slug/calendar/outlook
GET /public/invitations/:slug/calendar/ics
POST /public/invitations/:slug/calendar/click
```

### Permissions

Public.

---

## Uploads Module

### Responsibility

Mengelola upload file.

### Features

* Upload cover image
* Upload gallery image
* Upload QRIS image
* Upload background music
* Validate file type
* Validate file size

### Storage

```txt
Cloudflare R2
MinIO fallback
```

### Tables

No dedicated table required for MVP.

Uploaded file URLs are stored in related domain tables.

### API Endpoints

```txt
POST /uploads/image
POST /uploads/music
```

### Permissions

```txt
authenticated_user
```

---

## Database Module

### Responsibility

Mengelola Prisma client dan database connection.

### Features

* Prisma service
* Database connection lifecycle

### Tables

All tables.

### Dependencies

None.

---

## Common Module

### Responsibility

Shared backend utilities.

### Contents

```txt
guards
decorators
interceptors
filters
pipes
constants
helpers
types
```

Examples:

```txt
JwtAuthGuard
PermissionsGuard
PublicDecorator
CurrentUserDecorator
ApiResponseInterceptor
HttpExceptionFilter
```

---

# Frontend Modules

---

## Customer Auth Module

### App

```txt
apps/customer
```

### Pages

```txt
/login
/register
/forgot-password
```

### Features

* Login
* Register
* Forgot password
* Persist token

---

## Customer Dashboard Module

### App

```txt
apps/customer
```

### Pages

```txt
/dashboard
```

### Features

* Total invitations
* Total guests
* Total RSVP
* Total attendance
* Total visitors

---

## Customer Invitations Module

### App

```txt
apps/customer
```

### Pages

```txt
/invitations
/invitations/create
/invitations/:id/edit
/invitations/:id/preview
```

### Features

* Invitation CRUD
* Publish
* Archive
* Duplicate
* Theme customization
* Event management
* Gallery management
* SEO setting

---

## Customer Guests Module

### App

```txt
apps/customer
```

### Pages

```txt
/invitations/:id/guests
/invitations/:id/guests/import
```

### Features

* Guest CRUD
* Import CSV
* Guest categories
* Filter
* Search
* Generate personalized link
* Generate QR

---

## Customer RSVP Module

### App

```txt
apps/customer
```

### Pages

```txt
/invitations/:id/rsvp
```

### Features

* RSVP list
* RSVP summary
* RSVP detail

---

## Customer Check-In Module

### App

```txt
apps/customer
```

### Pages

```txt
/invitations/:id/check-in
/invitations/:id/check-ins
```

### Features

* QR scanner
* Manual check-in
* Attendance list
* Attendance summary

---

## Customer Analytics Module

### App

```txt
apps/customer
```

### Pages

```txt
/invitations/:id/analytics
```

### Features

* Visitor analytics
* RSVP analytics
* Attendance analytics

---

## Admin Users Module

### App

```txt
apps/admin
```

### Pages

```txt
/admin/users
/admin/users/:id
```

### Features

* List users
* View user detail
* Update user status
* Manage user role

---

## Admin Invitations Module

### App

```txt
apps/admin
```

### Pages

```txt
/admin/invitations
/admin/invitations/:id
```

### Features

* List all invitations
* View invitation detail
* Moderate invitation

---

## Admin Templates Module

### App

```txt
apps/admin
```

### Pages

```txt
/admin/templates
/admin/templates/create
/admin/templates/:id/edit
```

### Features

* Manage invitation themes
* Activate/deactivate themes

---

## Public Invitation Module

### App

```txt
apps/web
```

### Pages

```txt
/:slug
```

### Features

* Render public invitation
* Personalized guest name
* Event detail
* Countdown
* Gallery
* Video
* Music
* Gift
* RSVP
* Guestbook
* Calendar integration

---

# Cross Module Rules

## Ownership Rule

Customer can only access own resources.

Applies to:

```txt
invitations
guests
rsvps
guestbook
gifts
check-ins
analytics
```

---

## Admin Rule

Admin can access all resources.

---

## Public Rule

Public APIs must only expose published invitations.

---

## Soft Delete Rule

Soft deleted records must not appear in normal customer queries.

---

## Analytics Rule

Analytics event is append-only.

Do not update analytics event after creation.

---

# Implementation Order

Recommended implementation order:

```txt
1. Database Module
2. Auth Module
3. Users Module
4. RBAC Module
5. Uploads Module

6. Invitation Themes Module
7. Invitations Module
8. Invitation Events Module
9. Invitation Galleries Module

10. Guest Categories Module
11. Guests Module
12. RSVP Module
13. Guestbook Module
14. Gifts Module

15. Check-In Module
16. Analytics Module
17. SEO Module
18. Calendar Module
```

---

# MVP Critical Path

The MVP can be considered usable when these modules are completed:

```txt
Auth
Users
RBAC
Invitations
Invitation Themes
Guests
RSVP
Guestbook
Gifts
Check-In
Analytics
SEO
Calendar
```
