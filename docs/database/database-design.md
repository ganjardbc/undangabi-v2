# UndangAbi V2 - Database Design Document

## Overview

Dokumen ini menjelaskan aturan desain database untuk UndangAbi V2 berdasarkan ERD MVP.

Database digunakan untuk mendukung:

* Authentication
* RBAC
* Multi Invitation
* Guest Management
* RSVP
* Guestbook
* Digital Gift
* QR Check-in
* Analytics
* SEO & Social Preview
* Calendar Integration

---

# Database Engine

Database utama:

```txt
PostgreSQL
```

ORM:

```txt
Prisma
```

---

# Naming Convention

## Table Name

Gunakan:

```txt
snake_case
plural
```

Contoh:

```txt
users
roles
permissions
invitations
guests
rsvps
check_ins
```

---

## Column Name

Gunakan:

```txt
snake_case
```

Contoh:

```txt
created_at
updated_at
deleted_at
invitation_id
guest_id
```

---

## Primary Key

Gunakan UUID.

```txt
id uuid primary key
```

---

# Common Columns

Untuk entity utama, gunakan:

```txt
id
created_at
updated_at
deleted_at
```

`deleted_at` hanya digunakan untuk table yang mendukung soft delete.

---

# Soft Delete Rules

Gunakan soft delete untuk:

```txt
users
invitations
guests
```

Tidak perlu soft delete untuk:

```txt
roles
permissions
role_permissions
user_roles
rsvps
guestbook_entries
gifts
check_ins
analytics_events
```

---

# Enum Design

## UserStatus

```txt
active
inactive
suspended
```

---

## InvitationStatus

```txt
draft
published
archived
```

---

## EventType

```txt
wedding
khitanan
birthday
graduation
seminar
gathering
custom
```

---

## GuestStatus

```txt
not_sent
sent
opened
rsvp_submitted
checked_in
```

---

## AttendanceStatus

```txt
attending
not_attending
```

---

## GiftType

```txt
bank_transfer
qris
```

---

## AnalyticsEventType

```txt
invitation_viewed
rsvp_submitted
guestbook_submitted
gift_clicked
calendar_clicked
qr_checked_in
```

---

# Core Tables

## users

Purpose:

Menyimpan data user platform.

Columns:

```txt
id
name
email
password_hash
phone
avatar_url
status
email_verified_at
created_at
updated_at
deleted_at
```

Rules:

* `email` harus unique.
* `password_hash` nullable jika nanti mendukung OAuth.
* `deleted_at` digunakan untuk soft delete.

---

## roles

Purpose:

Menyimpan role sistem.

Default data:

```txt
admin
customer
```

Columns:

```txt
id
name
slug
description
created_at
updated_at
```

Rules:

* `slug` unique.

---

## permissions

Purpose:

Menyimpan permission sistem.

Columns:

```txt
id
name
slug
description
created_at
updated_at
```

Rules:

* `slug` unique.

---

## user_roles

Purpose:

Pivot table antara users dan roles.

Columns:

```txt
id
user_id
role_id
created_at
```

Rules:

* Unique combination: `user_id + role_id`

---

## role_permissions

Purpose:

Pivot table antara roles dan permissions.

Columns:

```txt
id
role_id
permission_id
created_at
```

Rules:

* Unique combination: `role_id + permission_id`

---

# Invitation Tables

## invitations

Purpose:

Entity utama undangan.

Columns:

```txt
id
user_id
theme_id
title
slug
event_type
status
cover_image_url
music_url
youtube_url
story
seo_title
seo_description
og_image_url
theme_config
section_visibility
published_at
archived_at
created_at
updated_at
deleted_at
```

Rules:

* `slug` unique secara global.
* `user_id` wajib.
* `theme_id` nullable jika menggunakan config custom penuh.
* `status` default `draft`.
* `theme_config` menggunakan JSON.
* `section_visibility` menggunakan JSON.
* `deleted_at` untuk soft delete.

---

## invitation_themes

Purpose:

Menyimpan tema bawaan.

Default themes:

```txt
elegant
modern
nature
```

Columns:

```txt
id
name
slug
description
default_config
is_active
created_at
updated_at
```

Rules:

* `slug` unique.
* `default_config` JSON.
* `is_active` default true.

---

## invitation_events

Purpose:

Menyimpan detail acara dalam undangan.

Satu invitation bisa memiliki lebih dari satu event.

Contoh:

```txt
Akad
Resepsi
Ngunduh Mantu
Main Event
```

Columns:

```txt
id
invitation_id
title
event_name
start_at
end_at
location_name
location_address
google_maps_url
latitude
longitude
created_at
updated_at
```

Rules:

* `invitation_id` wajib.
* `start_at` wajib.
* `end_at` nullable.
* `latitude` dan `longitude` nullable.

---

## invitation_galleries

Purpose:

Menyimpan gambar gallery.

Columns:

```txt
id
invitation_id
image_url
caption
sort_order
created_at
updated_at
```

Rules:

* `sort_order` default 0.
* `caption` nullable.

---

# Guest Tables

## guest_categories

Purpose:

Menyimpan kategori tamu per invitation.

Columns:

```txt
id
invitation_id
name
color
created_at
updated_at
```

Rules:

* Unique combination: `invitation_id + name`.
* Default categories dibuat saat invitation dibuat.

Default:

```txt
Keluarga
Teman
Kantor
VIP
```

---

## guests

Purpose:

Menyimpan data tamu.

Columns:

```txt
id
invitation_id
category_id
name
phone
email
invitation_token
qr_code_token
status
max_guest_count
opened_at
sent_at
created_at
updated_at
deleted_at
```

Rules:

* `invitation_id` wajib.
* `category_id` nullable.
* `name` wajib.
* `phone` nullable.
* `email` nullable.
* `invitation_token` unique.
* `qr_code_token` unique.
* `max_guest_count` default 1.
* `status` default `not_sent`.
* `deleted_at` untuk soft delete.

---

# RSVP Tables

## rsvps

Purpose:

Menyimpan konfirmasi kehadiran tamu.

Columns:

```txt
id
guest_id
invitation_id
attendance_status
guest_count
message
submitted_at
created_at
updated_at
```

Rules:

* One guest can only have one RSVP.
* Unique: `guest_id`.
* `guest_count` default 1.
* `submitted_at` wajib ketika RSVP dibuat.

---

# Guestbook Tables

## guestbook_entries

Purpose:

Menyimpan ucapan dan doa.

Columns:

```txt
id
invitation_id
guest_id
guest_name
message
is_visible
created_at
updated_at
```

Rules:

* `guest_id` nullable.
* `guest_name` digunakan jika guest tidak terdaftar.
* `is_visible` default true.

---

# Gift Tables

## gifts

Purpose:

Menyimpan informasi amplop digital.

Columns:

```txt
id
invitation_id
type
bank_name
account_number
account_holder_name
qris_image_url
is_active
created_at
updated_at
```

Rules:

* `type` wajib.
* Jika `type = bank_transfer`, maka `bank_name`, `account_number`, dan `account_holder_name` wajib.
* Jika `type = qris`, maka `qris_image_url` wajib.
* `is_active` default true.

---

# Check-in Tables

## check_ins

Purpose:

Menyimpan data QR check-in.

Columns:

```txt
id
guest_id
invitation_id
checked_in_at
checked_in_by
notes
created_at
updated_at
```

Rules:

* One guest can only check-in once.
* Unique: `guest_id`.
* `checked_in_by` dapat berisi user id admin/customer yang melakukan scan.
* `checked_in_at` wajib.

---

# Analytics Tables

## analytics_events

Purpose:

Menyimpan tracking event.

Columns:

```txt
id
invitation_id
guest_id
event_type
visitor_id
ip_address
user_agent
referrer
metadata
created_at
```

Rules:

* Append-only.
* Tidak perlu update.
* Tidak perlu soft delete.
* `guest_id` nullable.
* `metadata` JSON.

---

# JSON Fields

## invitations.theme_config

Contoh:

```json
{
  "theme": "modern",
  "primaryColor": "#3051B8",
  "secondaryColor": "#FFFFFF",
  "font": "Inter",
  "coverStyle": "centered"
}
```

---

## invitations.section_visibility

Contoh:

```json
{
  "story": true,
  "gallery": true,
  "video": true,
  "gift": true,
  "rsvp": true,
  "guestbook": true
}
```

---

## invitation_themes.default_config

Contoh:

```json
{
  "primaryColor": "#3051B8",
  "secondaryColor": "#F8F9FC",
  "font": "Inter",
  "coverStyle": "centered"
}
```

---

## analytics_events.metadata

Contoh:

```json
{
  "device": "mobile",
  "browser": "Chrome",
  "source": "whatsapp"
}
```

---

# Index Strategy

## users

```txt
email
status
deleted_at
```

---

## invitations

```txt
user_id
slug
status
event_type
deleted_at
```

---

## invitation_events

```txt
invitation_id
start_at
```

---

## guests

```txt
invitation_id
category_id
invitation_token
qr_code_token
status
phone
deleted_at
```

---

## rsvps

```txt
invitation_id
guest_id
attendance_status
```

---

## check_ins

```txt
invitation_id
guest_id
checked_in_at
```

---

## analytics_events

```txt
invitation_id
guest_id
event_type
visitor_id
created_at
```

---

# Unique Constraints

```txt
users.email

roles.slug
permissions.slug

user_roles.user_id + user_roles.role_id
role_permissions.role_id + role_permissions.permission_id

invitations.slug

invitation_themes.slug

guest_categories.invitation_id + guest_categories.name

guests.invitation_token
guests.qr_code_token

rsvps.guest_id

check_ins.guest_id
```

---

# Delete Behavior

## User Deleted

When user is soft deleted:

* Invitations remain but should not be visible.
* Admin can still inspect data if needed.

---

## Invitation Deleted

When invitation is soft deleted:

* Guests remain.
* RSVP remains.
* Analytics remains.
* Public page not accessible.

---

## Guest Deleted

When guest is soft deleted:

* RSVP remains for historical data.
* Check-in remains for historical data.
* Guest should not appear in active guest list.

---

# Data Access Rules

## Admin

Can access:

* All users
* All invitations
* All guests
* All analytics

---

## Customer

Can only access:

* Own invitations
* Guests under own invitations
* RSVP under own invitations
* Analytics under own invitations

---

# Seed Data

## Roles

```txt
admin
customer
```

---

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

---

## Themes

```txt
elegant
modern
nature
```

---

# Future Tables

Not included in MVP:

```txt
plans
subscriptions
payments
teams
team_members
custom_domains
whatsapp_reminders
ai_generations
```
