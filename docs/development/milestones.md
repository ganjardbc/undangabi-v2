# UndangAbi V2 - Milestones

Path:

```txt
docs/development/milestones.md
```

## Overview

Dokumen ini mendefinisikan milestone development UndangAbi V2.

Tujuan:

* Menentukan target deliverable setiap fase.
* Menjadi acuan progress project.
* Menjadi acuan demo internal.
* Menjadi acuan release management.

Milestone berfokus pada outcome yang dapat diuji oleh stakeholder, bukan task teknis.

---

# Project Vision

UndangAbi V2 adalah platform digital invitation yang memungkinkan customer:

```txt
Membuat lebih dari satu undangan
Mengelola tamu
Mengelola RSVP
Menggunakan QR Check-In
Menggunakan Add To Calendar
Melihat Analytics
Menggunakan Template Undangan
```

Target MVP:

```txt
Platform siap digunakan untuk acara nyata.
```

---

# Milestone M0

## Foundation Ready

Status:

```txt
DONE
```

Goal:

```txt
Project dapat dijalankan dan siap dikembangkan.
```

Deliverables:

```txt
Monorepo
Backend API
Customer App
Admin App
Public Web
Database
Shared Packages
```

Success Criteria:

```txt
pnpm dev berjalan
Semua aplikasi start tanpa error
Database terkoneksi
Prisma migration berjalan
```

Demo Checklist:

```txt
[x] apps/api running
[x] apps/customer running
[x] apps/admin running
[x] apps/web running
[x] database connected
```

Expected Result:

```txt
Development environment siap digunakan.
```

---

# Milestone M1

## Authentication Ready

Status:

```txt
DONE
```

Goal:

```txt
User dapat menggunakan sistem secara aman.
```

Deliverables:

```txt
Register
Login
JWT Authentication
RBAC
Permission Guard
```

Success Criteria:

```txt
Customer dapat register
Customer dapat login
Admin dapat login
Permission berjalan
```

Demo Checklist:

```txt
[x] Register customer
[x] Login customer
[x] Login admin
[x] Protected route bekerja
[x] Permission bekerja
```

Expected Result:

```txt
Sistem memiliki fondasi autentikasi dan otorisasi.
```

---

# Milestone M2

## Invitation Builder Ready

Status:

```txt
PLANNED
```

Goal:

```txt
Customer dapat membuat undangan.
```

Deliverables:

```txt
Invitation CRUD
Theme Selection
Builder
Story Section
Cover Section
Music Section
SEO Metadata
WhatsApp Preview
```

Success Criteria:

```txt
Customer dapat membuat undangan
Customer dapat mengedit undangan
Customer dapat publish undangan
```

Demo Checklist:

```txt
[ ] Create invitation
[ ] Edit invitation
[ ] Publish invitation
[ ] Preview invitation
[ ] WhatsApp preview image muncul
```

Expected Result:

```txt
Undangan dapat dibagikan secara publik.
```

---

# Milestone M3

## Public Invitation Ready

Status:

```txt
PLANNED
```

Goal:

```txt
Undangan dapat dilihat tamu.
```

Deliverables:

```txt
Public Page
Theme Rendering
Event Display
Gallery
Countdown
Maps Integration
```

Success Criteria:

```txt
Public invitation tampil
SEO berjalan
Mobile responsive
```

Demo Checklist:

```txt
[ ] Open invitation via slug
[ ] Countdown tampil
[ ] Gallery tampil
[ ] Maps tampil
[ ] Mobile view baik
```

Expected Result:

```txt
Undangan terlihat profesional dan layak digunakan.
```

---

# Milestone M4

## Guest Management Ready

Status:

```txt
PLANNED
```

Goal:

```txt
Customer dapat mengelola tamu.
```

Deliverables:

```txt
Guest CRUD
Guest Categories
CSV Import
Guest Search
Personalized Link
QR Generation
```

Success Criteria:

```txt
Customer dapat mengelola ribuan tamu
Import CSV berhasil
```

Demo Checklist:

```txt
[ ] Add guest
[ ] Edit guest
[ ] Import CSV
[ ] Generate personalized link
[ ] Generate guest QR
```

Expected Result:

```txt
Manajemen tamu siap digunakan.
```

---

# Milestone M5

## RSVP Ready

Status:

```txt
PLANNED
```

Goal:

```txt
Tamu dapat memberikan konfirmasi kehadiran.
```

Deliverables:

```txt
RSVP Form
RSVP Dashboard
Attendance Summary
Guestbook
```

Success Criteria:

```txt
RSVP tersimpan
Guestbook tersimpan
```

Demo Checklist:

```txt
[ ] Submit RSVP
[ ] View RSVP dashboard
[ ] Submit guestbook
[ ] View guestbook dashboard
```

Expected Result:

```txt
Interaksi tamu berjalan.
```

---

# Milestone M6

## Event Day Ready

Status:

```txt
PLANNED
```

Goal:

```txt
Undangan siap digunakan pada hari acara.
```

Deliverables:

```txt
QR Check-In
Attendance Dashboard
Attendance Summary
```

Success Criteria:

```txt
QR dapat discan
Attendance tercatat
```

Demo Checklist:

```txt
[ ] Generate QR
[ ] Scan QR
[ ] Attendance recorded
[ ] Attendance dashboard updated
```

Expected Result:

```txt
Check-in tamu berjalan secara digital.
```

---

# Milestone M7

## Gift & Calendar Ready

Status:

```txt
PLANNED
```

Goal:

```txt
Undangan siap digunakan secara penuh.
```

Deliverables:

```txt
Bank Transfer
QRIS
Google Calendar
Outlook Calendar
ICS Export
```

Success Criteria:

```txt
Add To Calendar berjalan
Gift information tampil
```

Demo Checklist:

```txt
[ ] Add to Google Calendar
[ ] Add to Outlook Calendar
[ ] Download ICS
[ ] QRIS tampil
[ ] Bank transfer tampil
```

Expected Result:

```txt
Customer dapat menggunakan fitur tambahan yang umum digunakan pada undangan digital modern.
```

---

# Milestone M8

## Analytics Ready

Status:

```txt
PLANNED
```

Goal:

```txt
Customer dapat melihat performa undangan.
```

Deliverables:

```txt
Visitor Tracking
RSVP Tracking
Gift Click Tracking
Calendar Click Tracking
Analytics Dashboard
Charts
```

Success Criteria:

```txt
Data tracking tersimpan
Analytics tampil
```

Demo Checklist:

```txt
[ ] Visitor tracked
[ ] RSVP tracked
[ ] Gift click tracked
[ ] Calendar click tracked
[ ] Analytics dashboard tampil
```

Expected Result:

```txt
Customer dapat mengukur performa undangan.
```

---

# Milestone M9

## Admin Panel Ready

Status:

```txt
PLANNED
```

Goal:

```txt
Platform dapat dikelola oleh admin.
```

Deliverables:

```txt
Admin Dashboard
User Management
Invitation Management
Template Management
Global Analytics
```

Success Criteria:

```txt
Admin dapat mengelola platform
```

Demo Checklist:

```txt
[ ] View users
[ ] View invitations
[ ] Manage templates
[ ] View analytics
```

Expected Result:

```txt
Platform siap dikelola secara operasional.
```

---

# Milestone M10

## MVP Release Candidate

Status:

```txt
PLANNED
```

Goal:

```txt
Platform siap diuji oleh pengguna terbatas.
```

Deliverables:

```txt
Performance Optimization
Error Tracking
Backup Strategy
Monitoring
CI/CD
```

Success Criteria:

```txt
Tidak ada blocker kritikal
Monitoring aktif
Backup aktif
```

Demo Checklist:

```txt
[ ] Production build
[ ] Monitoring active
[ ] Error tracking active
[ ] Backup active
```

Expected Result:

```txt
Release Candidate siap digunakan oleh early adopter.
```

---

# Milestone M11

## MVP Production Release

Status:

```txt
PLANNED
```

Goal:

```txt
Platform siap menerima customer.
```

Deliverables:

```txt
Production Deployment
Security Review
Final QA
Launch Checklist
```

Success Criteria:

```txt
Platform dapat digunakan secara publik
```

Demo Checklist:

```txt
[ ] Production deployed
[ ] SSL active
[ ] Domain active
[ ] Monitoring active
[ ] Backup active
```

Expected Result:

```txt
UndangAbi V2 resmi diluncurkan.
```

---

# MVP Success Metrics

## Business Metrics

```txt
1 customer dapat membuat lebih dari 1 undangan
1 customer dapat mengelola lebih dari 1000 tamu
RSVP dapat digunakan tanpa error
QR Check-In dapat digunakan saat acara
```

---

## Technical Metrics

```txt
Lighthouse > 90
API response < 500ms
No critical security issue
No critical production bug
```

---

# MVP Completion Definition

MVP dianggap selesai ketika milestone berikut selesai:

```txt
M0
M1
M2
M3
M4
M5
M6
M7
M8
```

Milestone berikut tidak wajib untuk launch awal:

```txt
M9
M10
M11
```

Karena dapat dilakukan paralel setelah MVP mulai digunakan customer pertama.
