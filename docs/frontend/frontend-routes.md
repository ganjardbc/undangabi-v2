# UndangAbi V2 - Frontend Routes Design

## Overview

Dokumen ini menjelaskan struktur route frontend untuk UndangAbi V2.

Monorepo memiliki tiga aplikasi frontend:

```txt
apps/web       # Public invitation website
apps/customer  # Customer dashboard
apps/admin     # Admin dashboard
```

---

# Route Principles

## Public Routes

Public routes tidak membutuhkan login.

Digunakan untuk:

* Melihat undangan
* RSVP
* Guestbook
* Digital gift
* Add to calendar

---

## Customer Routes

Customer routes membutuhkan login.

Digunakan untuk:

* Mengelola undangan
* Mengelola tamu
* Melihat RSVP
* QR Check-in
* Analytics

---

## Admin Routes

Admin routes membutuhkan login dan role admin.

Digunakan untuk:

* Mengelola user
* Mengelola undangan
* Mengelola template
* Melihat global analytics

---

# Route Meta Convention

Setiap route menggunakan meta:

```ts
meta: {
  title: 'Page Title',
  layout: 'dashboard',
  permission: ['manage_own_invitations']
}
```

---

# Layout Types

```txt
auth
dashboard
public
admin
error
```

---

# apps/web Routes

## Purpose

`apps/web` digunakan untuk halaman undangan publik.

Aplikasi ini harus mobile-first dan SEO-friendly.

---

## Public Invitation Routes

```txt
/:slug
```

Page:

```txt
public-invitation/pages/detail.vue
```

Purpose:

Menampilkan halaman undangan publik berdasarkan slug.

Example:

```txt
/ganjar-fitri
```

---

## Personalized Invitation

```txt
/:slug?to=:guestName&token=:guestToken
```

Purpose:

Menampilkan nama tamu secara personal.

Example:

```txt
/ganjar-fitri?to=Ganjar+Hadiatna&token=abc123
```

---

## RSVP Section

RSVP berada di halaman detail undangan.

Tidak perlu route terpisah untuk MVP.

Component:

```txt
public-invitation/components/RsvpForm.vue
```

---

## Guestbook Section

Guestbook berada di halaman detail undangan.

Tidak perlu route terpisah untuk MVP.

Component:

```txt
public-invitation/components/GuestbookForm.vue
```

---

## Calendar Routes

Jika ICS perlu route frontend download proxy, gunakan:

```txt
/:slug/calendar
```

Namun untuk MVP, calendar dapat langsung menggunakan API endpoint.

---

## Error Routes

```txt
/404
```

Page:

```txt
error/pages/404.vue
```

```txt
/expired
```

Page:

```txt
error/pages/expired.vue
```

```txt
/not-published
```

Page:

```txt
error/pages/not-published.vue
```

---

# apps/customer Routes

## Auth Routes

```txt
/login
/register
/forgot-password
```

Layout:

```txt
auth
```

Pages:

```txt
auth/pages/login.vue
auth/pages/register.vue
auth/pages/forgot-password.vue
```

---

## Dashboard

```txt
/dashboard
```

Layout:

```txt
dashboard
```

Permission:

```txt
authenticated_user
```

Page:

```txt
dashboard/pages/index.vue
```

---

# Customer Invitation Routes

## Invitation List

```txt
/invitations
```

Permission:

```txt
manage_own_invitations
```

Page:

```txt
invitations/pages/list.vue
```

---

## Create Invitation

```txt
/invitations/create
```

Permission:

```txt
manage_own_invitations
```

Page:

```txt
invitations/pages/create.vue
```

---

## Edit Invitation

```txt
/invitations/:id/edit
```

Permission:

```txt
manage_own_invitations
```

Page:

```txt
invitations/pages/edit.vue
```

---

## Preview Invitation

```txt
/invitations/:id/preview
```

Permission:

```txt
manage_own_invitations
```

Page:

```txt
invitations/pages/preview.vue
```

---

## Invitation Settings

```txt
/invitations/:id/settings
```

Permission:

```txt
manage_own_invitations
```

Page:

```txt
invitations/pages/settings.vue
```

---

# Customer Invitation Builder Routes

Untuk MVP, builder bisa dibagi per tab atau route.

Recommended route:

```txt
/invitations/:id/builder
```

Page:

```txt
invitations/pages/builder.vue
```

Internal tabs:

```txt
General
Events
Theme
Story
Gallery
Gift
SEO
Publish
```

Alternative route per section:

```txt
/invitations/:id/general
/invitations/:id/events
/invitations/:id/theme
/invitations/:id/story
/invitations/:id/gallery
/invitations/:id/gifts
/invitations/:id/seo
```

Recommendation:

Gunakan single route `builder` dengan tab internal agar sederhana untuk MVP.

---

# Customer Guest Routes

## Guest List

```txt
/invitations/:id/guests
```

Permission:

```txt
manage_own_guests
```

Page:

```txt
guests/pages/list.vue
```

---

## Import Guests

```txt
/invitations/:id/guests/import
```

Permission:

```txt
manage_own_guests
```

Page:

```txt
guests/pages/import.vue
```

---

## Guest Detail

```txt
/invitations/:id/guests/:guestId
```

Permission:

```txt
manage_own_guests
```

Page:

```txt
guests/pages/detail.vue
```

---

## Guest Categories

```txt
/invitations/:id/guest-categories
```

Permission:

```txt
manage_own_guests
```

Page:

```txt
guests/pages/categories.vue
```

---

# Customer RSVP Routes

## RSVP List

```txt
/invitations/:id/rsvp
```

Permission:

```txt
manage_own_rsvp
```

Page:

```txt
rsvp/pages/list.vue
```

---

## RSVP Detail

```txt
/invitations/:id/rsvp/:rsvpId
```

Permission:

```txt
manage_own_rsvp
```

Page:

```txt
rsvp/pages/detail.vue
```

---

# Customer Guestbook Routes

## Guestbook List

```txt
/invitations/:id/guestbook
```

Permission:

```txt
manage_own_invitations
```

Page:

```txt
guestbook/pages/list.vue
```

---

# Customer Check-In Routes

## QR Scanner

```txt
/invitations/:id/check-in
```

Permission:

```txt
manage_own_guests
```

Page:

```txt
check-in/pages/scanner.vue
```

---

## Check-In List

```txt
/invitations/:id/check-ins
```

Permission:

```txt
manage_own_guests
```

Page:

```txt
check-in/pages/list.vue
```

---

# Customer Analytics Routes

## Invitation Analytics

```txt
/invitations/:id/analytics
```

Permission:

```txt
view_own_analytics
```

Page:

```txt
analytics/pages/detail.vue
```

---

# Customer Settings Routes

## Profile

```txt
/settings/profile
```

Permission:

```txt
authenticated_user
```

Page:

```txt
settings/pages/profile.vue
```

---

## Change Password

```txt
/settings/password
```

Permission:

```txt
authenticated_user
```

Page:

```txt
settings/pages/password.vue
```

---

# Customer Error Routes

```txt
/403
/404
/500
```

Pages:

```txt
error/pages/403.vue
error/pages/404.vue
error/pages/500.vue
```

---

# apps/admin Routes

## Admin Auth Routes

Admin app may use the same auth flow.

```txt
/login
/forgot-password
```

Layout:

```txt
auth
```

---

## Admin Dashboard

```txt
/admin/dashboard
```

Permission:

```txt
view_global_analytics
```

Page:

```txt
dashboard/pages/index.vue
```

---

# Admin User Routes

## User List

```txt
/admin/users
```

Permission:

```txt
manage_users
```

Page:

```txt
users/pages/list.vue
```

---

## User Detail

```txt
/admin/users/:id
```

Permission:

```txt
manage_users
```

Page:

```txt
users/pages/detail.vue
```

---

# Admin Invitation Routes

## All Invitations

```txt
/admin/invitations
```

Permission:

```txt
manage_all_invitations
```

Page:

```txt
invitations/pages/list.vue
```

---

## Invitation Detail

```txt
/admin/invitations/:id
```

Permission:

```txt
manage_all_invitations
```

Page:

```txt
invitations/pages/detail.vue
```

---

# Admin Template Routes

## Template List

```txt
/admin/templates
```

Permission:

```txt
manage_templates
```

Page:

```txt
templates/pages/list.vue
```

---

## Create Template

```txt
/admin/templates/create
```

Permission:

```txt
manage_templates
```

Page:

```txt
templates/pages/create.vue
```

---

## Edit Template

```txt
/admin/templates/:id/edit
```

Permission:

```txt
manage_templates
```

Page:

```txt
templates/pages/edit.vue
```

---

# Admin Analytics Routes

## Global Analytics

```txt
/admin/analytics
```

Permission:

```txt
view_global_analytics
```

Page:

```txt
analytics/pages/index.vue
```

---

# Admin Settings Routes

```txt
/admin/settings/profile
/admin/settings/password
```

Permission:

```txt
authenticated_user
```

---

# Route Guard Rules

## Public App

`apps/web`:

* Only published invitations can be viewed.
* Draft invitations return not published page.
* Archived invitations return expired page.

---

## Customer App

If not logged in:

```txt
redirect to /login
```

If logged in and accessing auth page:

```txt
redirect to /dashboard
```

If permission missing:

```txt
redirect to /403
```

---

## Admin App

If not logged in:

```txt
redirect to /login
```

If user is not admin:

```txt
redirect to /403
```

If permission missing:

```txt
redirect to /403
```

---

# Route File Structure

Each module owns its route file.

Example:

```txt
modules/invitations/router/index.ts
modules/guests/router/index.ts
modules/rsvp/router/index.ts
```

Global router should auto-load module routes.

Example pattern:

```ts
const modules = import.meta.glob('../modules/**/router/index.ts', {
  eager: true
});
```

---

# Route Naming Convention

Use kebab-case for route names.

Examples:

```txt
customer-dashboard
invitation-list
invitation-create
invitation-edit
guest-list
guest-detail
check-in-scanner
admin-user-list
```

---

# Recommended MVP Route List

## apps/web

```txt
/:slug
/404
/expired
/not-published
```

## apps/customer

```txt
/login
/register
/forgot-password

/dashboard

/invitations
/invitations/create
/invitations/:id/builder
/invitations/:id/preview
/invitations/:id/settings

/invitations/:id/guests
/invitations/:id/guests/import
/invitations/:id/guests/:guestId
/invitations/:id/guest-categories

/invitations/:id/rsvp
/invitations/:id/rsvp/:rsvpId

/invitations/:id/guestbook

/invitations/:id/check-in
/invitations/:id/check-ins

/invitations/:id/analytics

/settings/profile
/settings/password

/403
/404
/500
```

## apps/admin

```txt
/login
/forgot-password

/admin/dashboard

/admin/users
/admin/users/:id

/admin/invitations
/admin/invitations/:id

/admin/templates
/admin/templates/create
/admin/templates/:id/edit

/admin/analytics

/admin/settings/profile
/admin/settings/password

/403
/404
/500
```
