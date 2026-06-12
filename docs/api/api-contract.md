# UndangAbi V2 - API Contract

## Overview

Dokumen ini menjelaskan API contract untuk UndangAbi V2 MVP.

Base URL:

```txt
/api/v1
```

Authentication:

```txt
Authorization: Bearer <access_token>
```

Public endpoints tidak membutuhkan token.

---

# Standard Response Format

## Success Response

```json
{
  "success": true,
  "message": "Success",
  "data": {}
}
```

## List Response

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

## Error Response

```json
{
  "success": false,
  "message": "Validation error",
  "errors": {
    "email": ["Email is required"]
  }
}
```

---

# Health API

## Health Check

```http
GET /health
```

Full path:

```txt
/api/v1/health
```

Response:

```json
{
  "success": true,
  "message": "Success",
  "data": {
    "status": "ok",
    "service": "undangabi-api"
  }
}
```

---

# Authentication API

## Register

```http
POST /auth/register
```

Request:

```json
{
  "name": "Ganjar Hadiatna",
  "email": "ganjar@example.com",
  "password": "password123"
}
```

Response:

```json
{
  "success": true,
  "message": "Register success",
  "data": {
    "user": {
      "id": "uuid",
      "name": "Ganjar Hadiatna",
      "email": "ganjar@example.com"
    },
    "access_token": "jwt_token"
  }
}
```

---

## Login

```http
POST /auth/login
```

Request:

```json
{
  "email": "ganjar@example.com",
  "password": "password123"
}
```

Response:

```json
{
  "success": true,
  "message": "Login success",
  "data": {
    "user": {
      "id": "uuid",
      "name": "Ganjar Hadiatna",
      "email": "ganjar@example.com",
      "roles": ["customer"],
      "permissions": ["manage_own_invitations"]
    },
    "access_token": "jwt_token"
  }
}
```

---

## Get Current User

```http
GET /auth/me
```

Response:

```json
{
  "success": true,
  "message": "Success",
  "data": {
    "id": "uuid",
    "name": "Ganjar Hadiatna",
    "email": "ganjar@example.com",
    "roles": ["customer"],
    "permissions": [
      "manage_own_invitations",
      "manage_own_guests",
      "manage_own_rsvp",
      "view_own_analytics"
    ]
  }
}
```

---

## Forgot Password

```http
POST /auth/forgot-password
```

Request:

```json
{
  "email": "ganjar@example.com"
}
```

Response:

```json
{
  "success": true,
  "message": "Reset password instruction has been sent",
  "data": null
}
```

---

## Logout

```http
POST /auth/logout
```

Response:

```json
{
  "success": true,
  "message": "Logout success",
  "data": null
}
```

---

# User API

## Get Profile

```http
GET /users/me
```

---

## Update Profile

```http
PATCH /users/me
```

Request:

```json
{
  "name": "Ganjar Hadiatna",
  "phone": "08123456789",
  "avatar_url": "https://cdn.undangabi.com/avatar.jpg"
}
```

---

## Change Password

```http
PATCH /users/me/password
```

Request:

```json
{
  "current_password": "oldpassword",
  "new_password": "newpassword"
}
```

---

# Admin User API

## List Users

```http
GET /admin/users?page=1&limit=10&search=ganjar&status=active
```

Permission:

```txt
manage_users
```

---

## Get User Detail

```http
GET /admin/users/:id
```

---

## Update User

```http
PATCH /admin/users/:id
```

Request:

```json
{
  "name": "Ganjar Hadiatna",
  "status": "active"
}
```

---

## Delete User

```http
DELETE /admin/users/:id
```

---

# RBAC API

## List Roles

```http
GET /admin/roles
```

Permission:

```txt
manage_users
```

---

## List Permissions

```http
GET /admin/permissions
```

Permission:

```txt
manage_users
```

---

## Assign Role To User

```http
POST /admin/users/:id/roles
```

Request:

```json
{
  "role_id": "uuid"
}
```

---

## Remove Role From User

```http
DELETE /admin/users/:id/roles/:roleId
```

---

# Invitation API

## List Own Invitations

```http
GET /invitations?page=1&limit=10&status=published&search=wedding
```

Permission:

```txt
manage_own_invitations
```

---

## Create Invitation

```http
POST /invitations
```

Request:

```json
{
  "title": "Wedding Ganjar & Fitri",
  "slug": "ganjar-fitri",
  "event_type": "wedding",
  "theme_id": "uuid"
}
```

Response:

```json
{
  "success": true,
  "message": "Invitation created",
  "data": {
    "id": "uuid",
    "title": "Wedding Ganjar & Fitri",
    "slug": "ganjar-fitri",
    "status": "draft"
  }
}
```

---

## Get Invitation Detail

```http
GET /invitations/:id
```

---

## Update Invitation

```http
PATCH /invitations/:id
```

Request:

```json
{
  "title": "Wedding Ganjar & Fitri",
  "cover_image_url": "https://cdn.undangabi.com/cover.jpg",
  "music_url": "https://cdn.undangabi.com/music.mp3",
  "youtube_url": "https://youtube.com/watch?v=example",
  "story": "Awal mula cerita kami...",
  "theme_config": {
    "theme": "modern",
    "primaryColor": "#3051B8",
    "secondaryColor": "#FFFFFF",
    "font": "Inter",
    "coverStyle": "centered"
  },
  "section_visibility": {
    "story": true,
    "gallery": true,
    "video": true,
    "gift": true,
    "rsvp": true,
    "guestbook": true
  }
}
```

---

## Publish Invitation

```http
POST /invitations/:id/publish
```

---

## Archive Invitation

```http
POST /invitations/:id/archive
```

---

## Duplicate Invitation

```http
POST /invitations/:id/duplicate
```

---

## Delete Invitation

```http
DELETE /invitations/:id
```

---

# Admin Invitation API

## List All Invitations

```http
GET /admin/invitations?page=1&limit=10&status=published&search=ganjar
```

Permission:

```txt
manage_all_invitations
```

---

## Get Admin Invitation Detail

```http
GET /admin/invitations/:id
```

---

# Invitation Themes API

## List Active Themes

```http
GET /invitation-themes
```

---

## Get Theme Detail

```http
GET /invitation-themes/:id
```

---

## Admin List Themes

```http
GET /admin/invitation-themes
```

Permission:

```txt
manage_templates
```

---

## Create Theme

```http
POST /admin/invitation-themes
```

Request:

```json
{
  "name": "Modern",
  "slug": "modern",
  "description": "Tema modern minimalis",
  "default_config": {
    "primaryColor": "#3051B8",
    "secondaryColor": "#F8F9FC",
    "font": "Inter",
    "coverStyle": "centered"
  }
}
```

---

## Update Theme

```http
PATCH /admin/invitation-themes/:id
```

---

## Delete Theme

```http
DELETE /admin/invitation-themes/:id
```

---

# Invitation Events API

## List Events

```http
GET /invitations/:invitationId/events
```

---

## Create Event

```http
POST /invitations/:invitationId/events
```

Request:

```json
{
  "title": "Akad Nikah",
  "event_name": "Akad",
  "start_at": "2026-07-12T08:00:00+07:00",
  "end_at": "2026-07-12T10:00:00+07:00",
  "location_name": "Gedung Serbaguna Bandung",
  "location_address": "Jl. Contoh No. 1, Bandung",
  "google_maps_url": "https://maps.google.com/example",
  "latitude": -6.914744,
  "longitude": 107.609810
}
```

---

## Update Event

```http
PATCH /invitations/:invitationId/events/:eventId
```

---

## Delete Event

```http
DELETE /invitations/:invitationId/events/:eventId
```

---

# Invitation Galleries API

## List Gallery

```http
GET /invitations/:invitationId/galleries
```

---

## Add Gallery Image

```http
POST /invitations/:invitationId/galleries
```

Request:

```json
{
  "image_url": "https://cdn.undangabi.com/gallery-1.jpg",
  "caption": "Prewedding",
  "sort_order": 1
}
```

---

## Update Gallery Image

```http
PATCH /invitations/:invitationId/galleries/:galleryId
```

---

## Delete Gallery Image

```http
DELETE /invitations/:invitationId/galleries/:galleryId
```

---

# Guest Categories API

## List Guest Categories

```http
GET /invitations/:invitationId/guest-categories
```

---

## Create Guest Category

```http
POST /invitations/:invitationId/guest-categories
```

Request:

```json
{
  "name": "Keluarga",
  "color": "#3051B8"
}
```

---

## Update Guest Category

```http
PATCH /invitations/:invitationId/guest-categories/:categoryId
```

---

## Delete Guest Category

```http
DELETE /invitations/:invitationId/guest-categories/:categoryId
```

---

# Guests API

## List Guests

```http
GET /invitations/:invitationId/guests?page=1&limit=10&search=ganjar&category_id=uuid&status=sent
```

Permission:

```txt
manage_own_guests
```

---

## Create Guest

```http
POST /invitations/:invitationId/guests
```

Request:

```json
{
  "name": "Ganjar Hadiatna",
  "phone": "08123456789",
  "email": "ganjar@example.com",
  "category_id": "uuid",
  "max_guest_count": 2
}
```

---

## Get Guest Detail

```http
GET /invitations/:invitationId/guests/:guestId
```

---

## Update Guest

```http
PATCH /invitations/:invitationId/guests/:guestId
```

---

## Delete Guest

```http
DELETE /invitations/:invitationId/guests/:guestId
```

---

## Import Guests

```http
POST /invitations/:invitationId/guests/import
```

Content-Type:

```txt
multipart/form-data
```

Form Data:

```txt
file: guests.csv
```

---

## Get Guest Personalized Link

```http
GET /invitations/:invitationId/guests/:guestId/link
```

Response:

```json
{
  "success": true,
  "message": "Success",
  "data": {
    "url": "https://undangabi.com/ganjar-fitri?to=Ganjar+Hadiatna&token=guest_token"
  }
}
```

---

## Get Guest QR

```http
GET /invitations/:invitationId/guests/:guestId/qr
```

Response:

```json
{
  "success": true,
  "message": "Success",
  "data": {
    "qr_code_token": "qr_token",
    "qr_code_url": "https://api.undangabi.com/api/v1/check-in/qr_token"
  }
}
```

---

# RSVP API

## Submit RSVP

```http
POST /public/invitations/:slug/rsvp
```

Public.

Request:

```json
{
  "guest_token": "guest_token",
  "attendance_status": "attending",
  "guest_count": 2,
  "message": "Selamat ya!"
}
```

---

## List RSVP

```http
GET /invitations/:invitationId/rsvps?page=1&limit=10&attendance_status=attending
```

---

## RSVP Summary

```http
GET /invitations/:invitationId/rsvps/summary
```

Response:

```json
{
  "success": true,
  "message": "Success",
  "data": {
    "total": 100,
    "attending": 70,
    "not_attending": 10,
    "not_responded": 20
  }
}
```

---

## Update RSVP

```http
PATCH /invitations/:invitationId/rsvps/:rsvpId
```

---

# Guestbook API

## Submit Guestbook Entry

```http
POST /public/invitations/:slug/guestbook
```

Public.

Request:

```json
{
  "guest_token": "guest_token",
  "guest_name": "Ganjar Hadiatna",
  "message": "Selamat menempuh hidup baru."
}
```

---

## Public List Guestbook

```http
GET /public/invitations/:slug/guestbook
```

---

## Customer List Guestbook

```http
GET /invitations/:invitationId/guestbook
```

---

## Update Guestbook Visibility

```http
PATCH /invitations/:invitationId/guestbook/:entryId/visibility
```

Request:

```json
{
  "is_visible": false
}
```

---

## Delete Guestbook Entry

```http
DELETE /invitations/:invitationId/guestbook/:entryId
```

---

# Gifts API

## Public List Gifts

```http
GET /public/invitations/:slug/gifts
```

---

## List Gifts

```http
GET /invitations/:invitationId/gifts
```

---

## Create Gift

```http
POST /invitations/:invitationId/gifts
```

Request:

```json
{
  "type": "bank_transfer",
  "bank_name": "BCA",
  "account_number": "1234567890",
  "account_holder_name": "Ganjar Hadiatna"
}
```

---

## Create QRIS Gift

```http
POST /invitations/:invitationId/gifts
```

Request:

```json
{
  "type": "qris",
  "qris_image_url": "https://cdn.undangabi.com/qris.png"
}
```

---

## Update Gift

```http
PATCH /invitations/:invitationId/gifts/:giftId
```

---

## Delete Gift

```http
DELETE /invitations/:invitationId/gifts/:giftId
```

---

## Track Gift Click

```http
POST /public/invitations/:slug/gifts/:giftId/click
```

---

# Check-in API

## Validate QR

```http
POST /invitations/:invitationId/check-in/validate
```

Request:

```json
{
  "qr_code_token": "qr_token"
}
```

Response:

```json
{
  "success": true,
  "message": "Valid QR",
  "data": {
    "guest": {
      "id": "uuid",
      "name": "Ganjar Hadiatna",
      "status": "rsvp_submitted"
    },
    "already_checked_in": false
  }
}
```

---

## Check-in Guest

```http
POST /invitations/:invitationId/check-in
```

Request:

```json
{
  "qr_code_token": "qr_token",
  "notes": "Datang bersama keluarga"
}
```

---

## List Check-ins

```http
GET /invitations/:invitationId/check-ins?page=1&limit=10
```

---

## Check-in Summary

```http
GET /invitations/:invitationId/check-ins/summary
```

Response:

```json
{
  "success": true,
  "message": "Success",
  "data": {
    "total_guests": 100,
    "checked_in": 80,
    "not_checked_in": 20,
    "attendance_rate": 80
  }
}
```

---

# Analytics API

## Track Public Event

```http
POST /public/invitations/:slug/analytics
```

Public.

Request:

```json
{
  "guest_token": "guest_token",
  "event_type": "invitation_viewed",
  "visitor_id": "visitor_uuid",
  "metadata": {
    "source": "whatsapp",
    "device": "mobile"
  }
}
```

---

## Get Invitation Analytics

```http
GET /invitations/:invitationId/analytics
```

Response:

```json
{
  "success": true,
  "message": "Success",
  "data": {
    "visitors": {
      "total": 1000,
      "unique": 700
    },
    "rsvp": {
      "total": 300,
      "rate": 30
    },
    "attendance": {
      "total": 250,
      "rate": 83.3
    }
  }
}
```

---

## Visitor Analytics

```http
GET /invitations/:invitationId/analytics/visitors
```

---

## RSVP Analytics

```http
GET /invitations/:invitationId/analytics/rsvp
```

---

## Attendance Analytics

```http
GET /invitations/:invitationId/analytics/attendance
```

---

## Admin Global Analytics

```http
GET /admin/analytics
```

Permission:

```txt
view_global_analytics
```

---

# SEO API

## Update SEO Setting

```http
PATCH /invitations/:invitationId/seo
```

Request:

```json
{
  "seo_title": "Undangan Pernikahan Ganjar & Fitri",
  "seo_description": "Minggu, 12 Juli 2026 - Bandung",
  "og_image_url": "https://cdn.undangabi.com/og-image.jpg"
}
```

---

## Get Public Meta

```http
GET /public/invitations/:slug/meta
```

Public.

---

# Calendar API

## Google Calendar Link

```http
GET /public/invitations/:slug/calendar/google
```

---

## Outlook Calendar Link

```http
GET /public/invitations/:slug/calendar/outlook
```

---

## ICS File

```http
GET /public/invitations/:slug/calendar/ics
```

Response:

```txt
Content-Type: text/calendar
```

---

## Track Calendar Click

```http
POST /public/invitations/:slug/calendar/click
```

Request:

```json
{
  "provider": "google",
  "guest_token": "guest_token"
}
```

---

# Upload API

## Upload Image

```http
POST /uploads/image
```

Content-Type:

```txt
multipart/form-data
```

Form Data:

```txt
file: image.jpg
folder: invitations
```

Response:

```json
{
  "success": true,
  "message": "Upload success",
  "data": {
    "url": "https://cdn.undangabi.com/invitations/image.jpg"
  }
}
```

---

## Upload Music

```http
POST /uploads/music
```

Content-Type:

```txt
multipart/form-data
```

Form Data:

```txt
file: music.mp3
folder: music
```

---

# Public Invitation API

## Get Public Invitation

```http
GET /public/invitations/:slug
```

Public.

Response:

```json
{
  "success": true,
  "message": "Success",
  "data": {
    "id": "uuid",
    "title": "Wedding Ganjar & Fitri",
    "slug": "ganjar-fitri",
    "event_type": "wedding",
    "cover_image_url": "https://cdn.undangabi.com/cover.jpg",
    "music_url": "https://cdn.undangabi.com/music.mp3",
    "youtube_url": "https://youtube.com/watch?v=example",
    "story": "Awal mula cerita kami...",
    "theme_config": {},
    "section_visibility": {},
    "events": [],
    "gallery": [],
    "gifts": []
  }
}
```

---

## Get Public Guest

```http
GET /public/invitations/:slug/guest?token=guest_token
```

Public.

---

## Mark Guest Opened

```http
POST /public/invitations/:slug/guest/opened
```

Request:

```json
{
  "guest_token": "guest_token"
}
```

---

# Permission Summary

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

# HTTP Status Code

```txt
200 OK
201 Created
400 Bad Request
401 Unauthorized
403 Forbidden
404 Not Found
409 Conflict
422 Validation Error
500 Internal Server Error
```
