# UndangAbi V2 - Development Roadmap

Path:

```txt
docs/development/roadmap.md
```

## Overview

Dokumen ini menjelaskan roadmap development UndangAbi V2.

Tujuan roadmap:

* Menentukan urutan pengerjaan.
* Menjadi acuan sprint planning.
* Menjadi checkpoint progress project.
* Menjadi panduan AI Coding Agent.

Roadmap disusun berdasarkan business value, bukan berdasarkan urutan database atau module.

---

# MVP Goal

Target MVP:

```txt
Customer dapat:
- Membuat akun
- Membuat lebih dari satu undangan
- Mengelola tamu
- Menerima RSVP
- Menggunakan QR Check-In
- Menggunakan Add To Calendar
- Membagikan undangan dengan preview WhatsApp
- Melihat analytics dasar
```

Target admin:

```txt
- Mengelola user
- Mengelola template
- Melihat seluruh invitation
```

---

# Phase 0 - Foundation

Status:

```txt
Critical
```

Goal:

```txt
Project dapat dijalankan secara lokal dan siap dikembangkan.
```

Deliverables:

```txt
Monorepo Setup
Shared Packages
Backend Setup
Frontend Setup
Database Setup
```

Tasks:

```txt
[ ] Setup pnpm workspace
[ ] Setup turbo

[ ] Setup apps/api
[ ] Setup apps/customer
[ ] Setup apps/admin
[ ] Setup apps/web

[ ] Setup packages/ui
[ ] Setup packages/shared-types
[ ] Setup packages/shared-utils

[ ] Setup PostgreSQL
[ ] Setup Prisma

[ ] Setup ESLint
[ ] Setup Prettier

[ ] Setup Environment Variables

[ ] Setup Cloudflare R2 config
```

Definition of Done:

```txt
pnpm dev berjalan
Semua aplikasi bisa start
Database terkoneksi
Prisma generate berhasil
```

Estimated:

```txt
1 - 2 hari
```

---

# Phase 1 - Authentication & RBAC

Goal:

```txt
User dapat login dan memiliki permission.
```

Deliverables:

```txt
Authentication
Authorization
RBAC
```

Tasks:

```txt
[ ] Database Module

[ ] User Model
[ ] Role Model
[ ] Permission Model

[ ] Auth Module

[ ] Register
[ ] Login
[ ] Logout

[ ] JWT Auth Guard

[ ] Current User Decorator

[ ] Permission Decorator
[ ] Permission Guard

[ ] Seed Roles
[ ] Seed Permissions

[ ] Customer Login Page
[ ] Customer Register Page

[ ] Admin Login Page
```

Definition of Done:

```txt
Customer login
Customer register
Admin login
Permission berjalan
```

Estimated:

```txt
2 - 3 hari
```

---

# Phase 2 - Invitation Core

Goal:

```txt
Customer dapat membuat dan mempublikasikan undangan.
```

Deliverables:

```txt
Invitation CRUD
Theme Selection
Public Invitation
```

Tasks:

```txt
[ ] Invitation Theme Module
[ ] Invitation Module

[ ] Create Invitation
[ ] Edit Invitation
[ ] Delete Invitation

[ ] Publish Invitation
[ ] Archive Invitation
[ ] Duplicate Invitation

[ ] Invitation Builder

[ ] General Section
[ ] Story Section
[ ] Cover Section
[ ] Music Section

[ ] Public Invitation Page

[ ] SEO Metadata
[ ] WhatsApp Preview
```

Definition of Done:

```txt
Undangan dapat dibuat
Undangan dapat dipublish
Undangan tampil secara publik
Preview WhatsApp tampil
```

Estimated:

```txt
4 - 5 hari
```

---

# Phase 3 - Event & Gallery

Goal:

```txt
Undangan terlihat layak digunakan.
```

Deliverables:

```txt
Event Management
Gallery Management
Maps Integration
```

Tasks:

```txt
[ ] Invitation Event Module

[ ] Multiple Events

[ ] Gallery Module

[ ] Upload Gallery

[ ] Google Maps Integration

[ ] Countdown Component
```

Definition of Done:

```txt
Acara tampil
Gallery tampil
Maps tampil
Countdown berjalan
```

Estimated:

```txt
2 - 3 hari
```

---

# Phase 4 - Guest Management

Goal:

```txt
Customer dapat mengelola tamu secara profesional.
```

Deliverables:

```txt
Guest Management
Guest Categories
Guest Import
```

Tasks:

```txt
[ ] Guest Category Module

[ ] Guest Module

[ ] Guest CRUD

[ ] Import CSV

[ ] Guest Search

[ ] Guest Filters

[ ] Personalized Invitation Link

[ ] Guest Token Generation
```

Definition of Done:

```txt
Import CSV berhasil
Link personal berhasil
Kategori tamu berjalan
```

Estimated:

```txt
3 - 4 hari
```

---

# Phase 5 - RSVP & Guestbook

Goal:

```txt
Tamu dapat memberikan respon.
```

Deliverables:

```txt
RSVP
Guestbook
```

Tasks:

```txt
[ ] RSVP Module

[ ] Submit RSVP

[ ] RSVP Dashboard

[ ] RSVP Summary

[ ] Guestbook Module

[ ] Submit Guestbook

[ ] Guestbook Moderation
```

Definition of Done:

```txt
RSVP tersimpan
Guestbook tersimpan
Dashboard RSVP tersedia
```

Estimated:

```txt
2 - 3 hari
```

---

# Phase 6 - Gifts & Calendar

Goal:

```txt
Undangan siap digunakan untuk acara nyata.
```

Deliverables:

```txt
Amplop Digital
Add To Calendar
```

Tasks:

```txt
[ ] Gift Module

[ ] Bank Transfer

[ ] QRIS

[ ] Calendar Module

[ ] Google Calendar

[ ] Outlook Calendar

[ ] ICS Export

[ ] Calendar Click Tracking
```

Definition of Done:

```txt
QRIS tampil
Bank transfer tampil
Add to Calendar berjalan
```

Estimated:

```txt
2 hari
```

---

# Phase 7 - QR Check-In

Goal:

```txt
Digunakan pada hari acara.
```

Deliverables:

```txt
QR Invitation
Attendance Tracking
```

Tasks:

```txt
[ ] QR Generator

[ ] Check-In Module

[ ] QR Validation

[ ] QR Scanner

[ ] Attendance Dashboard

[ ] Attendance Summary
```

Definition of Done:

```txt
QR berhasil dibuat
QR berhasil discan
Attendance tercatat
```

Estimated:

```txt
3 hari
```

---

# Phase 8 - Analytics

Goal:

```txt
Customer mengetahui performa undangan.
```

Deliverables:

```txt
Visitor Analytics
RSVP Analytics
Attendance Analytics
```

Tasks:

```txt
[ ] Analytics Module

[ ] Track View

[ ] Track RSVP

[ ] Track Guestbook

[ ] Track Gift Click

[ ] Track Calendar Click

[ ] Analytics Dashboard

[ ] Analytics Charts
```

Definition of Done:

```txt
Analytics tampil
Chart tampil
Tracking berjalan
```

Estimated:

```txt
2 - 3 hari
```

---

# Phase 9 - Admin Panel

Goal:

```txt
Platform dapat dikelola.
```

Deliverables:

```txt
User Management
Template Management
Global Analytics
```

Tasks:

```txt
[ ] Admin Dashboard

[ ] User Management

[ ] User Detail

[ ] User Status Management

[ ] Invitation Management

[ ] Template Management

[ ] Global Analytics
```

Definition of Done:

```txt
Admin dapat mengelola platform
```

Estimated:

```txt
2 - 3 hari
```

---

# Phase 10 - Production Ready

Goal:

```txt
Siap launch ke production.
```

Deliverables:

```txt
Performance
Security
Monitoring
Deployment
```

Tasks:

```txt
[ ] SEO Optimization

[ ] Error Tracking

[ ] Monitoring

[ ] Backup Strategy

[ ] Rate Limiter

[ ] Security Review

[ ] CI/CD

[ ] Production Deployment
```

Definition of Done:

```txt
Production deployment berhasil
Monitoring aktif
Backup aktif
```

Estimated:

```txt
2 - 4 hari
```

---

# MVP Milestone

## MVP Alpha

Completed:

```txt
Phase 0
Phase 1
Phase 2
```

Result:

```txt
User bisa login dan membuat undangan.
```

---

## MVP Beta

Completed:

```txt
Phase 0 - 5
```

Result:

```txt
Undangan sudah bisa digunakan dan menerima RSVP.
```

---

## MVP Release Candidate

Completed:

```txt
Phase 0 - 8
```

Result:

```txt
Undangan siap digunakan pada acara nyata.
```

---

## MVP Production

Completed:

```txt
Phase 0 - 10
```

Result:

```txt
Platform siap menerima customer.
```

---

# Recommended Build Order

```txt
Phase 0
↓
Phase 1
↓
Phase 2
↓
Phase 4
↓
Phase 5
↓
Phase 6
↓
Phase 7
↓
Phase 8
↓
Phase 3
↓
Phase 9
↓
Phase 10
```

Reason:

Guest, RSVP, QR Check-In, dan Calendar lebih penting untuk MVP dibandingkan Gallery dan polishing visual.
