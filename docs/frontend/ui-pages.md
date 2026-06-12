# UndangAbi V2 - UI Pages Specification

## Overview

Dokumen ini menjelaskan seluruh halaman UI yang harus dibuat pada MVP UndangAbi V2.

Tujuan:

* Menjadi acuan UI/UX design.
* Menjadi backlog frontend development.
* Menjadi referensi AI Coding Agent.
* Menentukan scope MVP secara jelas.

---

# Applications

UndangAbi V2 memiliki tiga aplikasi frontend:

```txt
apps/web
apps/customer
apps/admin
```

---

# apps/web

Public Invitation Website

---

## Public Invitation Page

### Route

```txt
/:slug
```

### Purpose

Menampilkan undangan publik.

### Sections

```txt
Hero Section
Countdown
Event Information
Story
Gallery
Video
Gift
RSVP
Guestbook
Calendar Integration
Footer
```

### Components

```txt
InvitationHero
CountdownTimer
EventCard
StorySection
GallerySection
VideoSection
GiftSection
RsvpSection
GuestbookSection
CalendarSection
FooterSection
```

### API Dependencies

```txt
GET /public/invitations/:slug
GET /public/invitations/:slug/guest
```

---

## Not Published Page

### Route

```txt
/not-published
```

### Purpose

Undangan masih draft.

---

## Expired Page

### Route

```txt
/expired
```

### Purpose

Undangan sudah tidak tersedia.

---

## 404 Page

### Route

```txt
/404
```

### Purpose

Undangan tidak ditemukan.

---

# apps/customer

Customer Dashboard

---

# Authentication

---

## Login Page

### Route

```txt
/login
```

### Purpose

Login customer.

### Components

```txt
LoginForm
SocialLoginButton
```

### Actions

```txt
Login
Forgot Password
Register
```

---

## Register Page

### Route

```txt
/register
```

### Purpose

Registrasi customer.

### Components

```txt
RegisterForm
```

---

## Forgot Password Page

### Route

```txt
/forgot-password
```

### Purpose

Reset password.

---

# Dashboard

---

## Dashboard Page

### Route

```txt
/dashboard
```

### Purpose

Ringkasan seluruh aktivitas customer.

### Widgets

```txt
Total Invitations
Total Guests
Total RSVP
Total Attendance
Total Visitors
```

### Components

```txt
StatisticCard
RecentInvitations
```

---

# Invitation Pages

---

## Invitation List Page

### Route

```txt
/invitations
```

### Purpose

Menampilkan seluruh undangan milik user.

### Components

```txt
InvitationTable
InvitationCard
SearchInput
StatusFilter
CreateButton
```

### Actions

```txt
Create
Edit
Preview
Publish
Archive
Duplicate
Delete
```

---

## Create Invitation Page

### Route

```txt
/invitations/create
```

### Purpose

Membuat undangan baru.

### Form Fields

```txt
Title
Slug
Event Type
Theme
```

---

## Invitation Builder Page

### Route

```txt
/invitations/:id/builder
```

### Purpose

Halaman utama konfigurasi undangan.

---

### Builder Layout

```txt
Sidebar Navigation
Preview Panel
Configuration Panel
```

---

### Builder Sections

```txt
General
Events
Theme
Story
Gallery
Video
Gift
SEO
Publish
```

---

## General Tab

### Purpose

Informasi dasar undangan.

### Fields

```txt
Title
Slug
Event Type
Cover Image
Music
YouTube URL
```

---

## Events Tab

### Purpose

Kelola acara.

### Components

```txt
EventList
EventForm
```

### Fields

```txt
Title
Date
Time
Location
Maps URL
```

---

## Theme Tab

### Purpose

Kustomisasi tampilan.

### Components

```txt
ThemeSelector
ColorPicker
FontSelector
```

### Fields

```txt
Theme
Primary Color
Secondary Color
Font
Cover Style
```

---

## Story Tab

### Purpose

Cerita acara.

### Components

```txt
RichTextEditor
```

---

## Gallery Tab

### Purpose

Upload foto.

### Components

```txt
GalleryUploader
GallerySortable
```

---

## Video Tab

### Purpose

Embed YouTube.

### Fields

```txt
YouTube URL
```

---

## Gift Tab

### Purpose

Amplop digital.

### Components

```txt
GiftList
GiftForm
```

### Fields

```txt
Bank Name
Account Number
Account Holder
QRIS Image
```

---

## SEO Tab

### Purpose

SEO dan preview.

### Fields

```txt
SEO Title
SEO Description
OG Image
```

### Components

```txt
SeoPreview
WhatsappPreview
```

---

## Publish Tab

### Purpose

Publikasi undangan.

### Components

```txt
PublishChecklist
PublishButton
```

---

## Invitation Preview Page

### Route

```txt
/invitations/:id/preview
```

### Purpose

Preview undangan sebelum publish.

---

## Invitation Settings Page

### Route

```txt
/invitations/:id/settings
```

### Purpose

Pengaturan undangan.

### Actions

```txt
Archive
Delete
Duplicate
```

---

# Guest Pages

---

## Guest List Page

### Route

```txt
/invitations/:id/guests
```

### Purpose

Kelola tamu.

### Components

```txt
GuestTable
GuestSearch
GuestFilter
GuestActionMenu
```

### Actions

```txt
Create
Edit
Delete
Import CSV
Generate Link
Generate QR
```

---

## Guest Detail Page

### Route

```txt
/invitations/:id/guests/:guestId
```

### Purpose

Detail tamu.

### Sections

```txt
Guest Information
RSVP Information
Attendance Information
Analytics
```

---

## Import Guests Page

### Route

```txt
/invitations/:id/guests/import
```

### Purpose

Import CSV.

### Components

```txt
CsvUploader
ImportPreview
ImportResult
```

---

## Guest Categories Page

### Route

```txt
/invitations/:id/guest-categories
```

### Purpose

Kelola kategori tamu.

### Components

```txt
CategoryTable
CategoryForm
```

---

# RSVP Pages

---

## RSVP List Page

### Route

```txt
/invitations/:id/rsvp
```

### Purpose

Melihat RSVP.

### Components

```txt
RsvpTable
AttendanceFilter
SummaryCard
```

### Summary

```txt
Attending
Not Attending
No Response
```

---

## RSVP Detail Page

### Route

```txt
/invitations/:id/rsvp/:rsvpId
```

### Purpose

Detail RSVP.

---

# Guestbook Pages

---

## Guestbook Page

### Route

```txt
/invitations/:id/guestbook
```

### Purpose

Kelola ucapan dan doa.

### Components

```txt
GuestbookTable
VisibilityToggle
```

---

# Check-In Pages

---

## QR Scanner Page

### Route

```txt
/invitations/:id/check-in
```

### Purpose

Scan QR tamu.

### Components

```txt
CameraScanner
CheckInResult
```

### Actions

```txt
Scan
Manual Check-In
```

---

## Attendance Page

### Route

```txt
/invitations/:id/check-ins
```

### Purpose

Daftar kehadiran.

### Components

```txt
AttendanceTable
AttendanceFilter
SummaryCard
```

---

# Analytics Pages

---

## Analytics Dashboard Page

### Route

```txt
/invitations/:id/analytics
```

### Purpose

Melihat performa undangan.

---

### Visitor Section

```txt
Total Visitors
Unique Visitors
```

---

### RSVP Section

```txt
RSVP Total
RSVP Rate
```

---

### Attendance Section

```txt
Attendance Total
Attendance Rate
```

---

### Charts

```txt
Visitor Chart
RSVP Chart
Attendance Chart
```

---

# Settings Pages

---

## Profile Page

### Route

```txt
/settings/profile
```

### Purpose

Update profil.

### Fields

```txt
Name
Phone
Avatar
```

---

## Change Password Page

### Route

```txt
/settings/password
```

### Purpose

Ganti password.

---

# apps/admin

Admin Dashboard

---

## Admin Dashboard Page

### Route

```txt
/admin/dashboard
```

### Widgets

```txt
Total Users
Total Invitations
Total RSVP
Total Attendance
```

---

# User Management

---

## User List Page

### Route

```txt
/admin/users
```

### Components

```txt
UserTable
SearchInput
StatusFilter
```

### Actions

```txt
View
Edit
Suspend
Delete
```

---

## User Detail Page

### Route

```txt
/admin/users/:id
```

### Sections

```txt
Profile
Roles
Invitations
Activity
```

---

# Invitation Management

---

## Invitation List Page

### Route

```txt
/admin/invitations
```

### Purpose

Melihat seluruh undangan.

---

## Invitation Detail Page

### Route

```txt
/admin/invitations/:id
```

### Sections

```txt
General
Events
Guests
RSVP
Analytics
```

---

# Template Management

---

## Template List Page

### Route

```txt
/admin/templates
```

### Components

```txt
TemplateTable
```

---

## Create Template Page

### Route

```txt
/admin/templates/create
```

---

## Edit Template Page

### Route

```txt
/admin/templates/:id/edit
```

---

# Global Analytics

---

## Analytics Page

### Route

```txt
/admin/analytics
```

### Widgets

```txt
Total Users
Total Invitations
Total Guests
Total RSVP
Total Attendance
```

---

# MVP Priority Pages

## P0 (Wajib)

```txt
Login
Register

Dashboard

Invitation List
Invitation Builder
Invitation Preview

Guest List
Import Guests

RSVP List

QR Scanner
Attendance List

Analytics Dashboard

Public Invitation
```

---

## P1 (Sangat Penting)

```txt
Guest Detail
Guest Categories

Guestbook

Settings
```

---

## P2 (Boleh Menyusul)

```txt
Admin Template Management
Advanced Analytics
```

---

# Recommended Development Order

```txt
1. Login
2. Register

3. Dashboard

4. Invitation List
5. Create Invitation
6. Invitation Builder
7. Preview Invitation

8. Guest List
9. Import Guests

10. RSVP List

11. QR Scanner
12. Attendance List

13. Analytics Dashboard

14. Public Invitation

15. Admin Dashboard

16. User Management
17. Template Management
```
