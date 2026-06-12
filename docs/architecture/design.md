# UndangAbi V2 - System Design Document

# Overview

UndangAbi V2 adalah platform Digital Invitation & Guest Management System yang memungkinkan pengguna membuat undangan digital, mengelola tamu, mengumpulkan RSVP, melakukan QR Check-in, dan melihat analytics acara.

Sistem dirancang menggunakan pendekatan:

* Modular Monolith
* Monorepo Architecture
* Domain Driven Module Structure
* REST API
* RBAC Authorization

---

# High Level Architecture

```txt
Internet
│
├── Public Invitation Website
│   └── apps/web
│
├── Customer Dashboard
│   └── apps/customer
│
├── Admin Dashboard
│   └── apps/admin
│
└── API
    └── apps/api

            │
            ▼

        PostgreSQL

            │
            ▼

       S3 Storage
```

---

# Applications

## Web Application

Public facing application.

Responsibilities:

* Render invitation page
* RSVP submission
* Guestbook submission
* Display event information
* SEO rendering
* Open Graph rendering

Authentication not required.

---

## Customer Dashboard

Customer management portal.

Responsibilities:

* Invitation Management
* Guest Management
* RSVP Management
* QR Check-in
* Analytics
* Theme Customization

Authentication required.

---

## Admin Dashboard

Internal management portal.

Responsibilities:

* User Management
* Platform Monitoring
* Template Management
* Global Analytics

Authentication required.

---

## API

Single backend service.

Responsibilities:

* Business Logic
* Authentication
* Authorization
* Database Access
* File Upload
* Analytics

---

# Domain Model

Core domains:

```txt
User
│
└── Invitation
        │
        ├── Event
        ├── Theme
        ├── Gallery
        ├── Guest
        ├── RSVP
        ├── Guestbook
        ├── Gift
        ├── CheckIn
        └── Analytics
```

---

# User Domain

Represents platform user.

Types:

```txt
Admin
Customer
```

Relationship:

```txt
User
 └── Invitations
```

One user can own multiple invitations.

---

# Invitation Domain

Main business entity.

Contains:

* Event Information
* Theme Configuration
* Gallery
* Guest Data
* RSVP Data
* Analytics

Statuses:

```txt
Draft
Published
Archived
```

---

# Theme Domain

Purpose:

Customize invitation appearance.

Themes:

```txt
Elegant
Modern
Nature
```

Stored Configuration:

```json
{
  "theme": "modern",
  "primaryColor": "#3051B8",
  "secondaryColor": "#FFFFFF",
  "font": "Inter",
  "coverStyle": "centered"
}
```

Single Layout Engine.

Themes only change visual appearance.

---

# Guest Domain

Represents invitation recipient.

Properties:

* Name
* Phone Number
* Category
* Personalized Link
* QR Code

Relationship:

```txt
Invitation
 └── Guests
```

---

# Guest Categories

Built-in categories:

```txt
Family
Friends
Office
VIP
```

Custom categories may be added later.

---

# RSVP Domain

Represents attendance confirmation.

Statuses:

```txt
Attending
Not Attending
```

Data:

* Attendance Status
* Guest Count
* Message

Relationship:

```txt
Guest
 └── RSVP
```

One guest has one RSVP record.

---

# Guestbook Domain

Stores messages from guests.

Data:

* Guest Name
* Message
* Created Date

Relationship:

```txt
Invitation
 └── Guestbook Entries
```

---

# Gift Domain

Stores digital gift information.

Supported Types:

```txt
Bank Transfer
QRIS
```

Relationship:

```txt
Invitation
 └── Gifts
```

---

# Check-In Domain

Used during event.

Each guest receives:

```txt
Unique QR Code
```

Workflow:

```txt
Guest Arrives
        │
        ▼

Scan QR

        │
        ▼

Attendance Recorded

        │
        ▼

Analytics Updated
```

---

# Analytics Domain

Collects:

* Visitors
* RSVP
* Attendance

Metrics:

```txt
Total Visitors
Unique Visitors

Total RSVP
RSVP Rate

Total Attendance
Attendance Rate
```

---

# Authorization Design

Uses Role Based Access Control.

---

## Admin

Permissions:

```txt
manage_users
manage_templates
manage_all_invitations
view_global_analytics
```

---

## Customer

Permissions:

```txt
manage_own_invitations
manage_own_guests
manage_own_rsvp
view_own_analytics
```

---

# Invitation Rendering Strategy

Public invitation pages must support:

* SEO
* Open Graph
* WhatsApp Preview

Rendering flow:

```txt
Request Invitation
        │
        ▼

Load Invitation

        │
        ▼

Load Theme

        │
        ▼

Generate SEO Metadata

        │
        ▼

Render Page
```

---

# Personalized Invitation Flow

Guest link:

```txt
/ganjar-fitri?to=Ganjar+Hadiatna
```

System:

```txt
Load Guest
        │
        ▼

Render Guest Name

        │
        ▼

Track Visit
```

---

# RSVP Flow

```txt
Guest Opens Invitation

        │
        ▼

Submit RSVP

        │
        ▼

Validate Data

        │
        ▼

Store RSVP

        │
        ▼

Update Analytics
```

---

# QR Check-In Flow

```txt
Generate Guest QR

        │
        ▼

Guest Arrives

        │
        ▼

Scan QR

        │
        ▼

Validate Guest

        │
        ▼

Update Attendance

        │
        ▼

Update Analytics
```

---

# Calendar Integration Flow

Supported:

* Google Calendar
* Apple Calendar
* Outlook Calendar

Workflow:

```txt
Guest Clicks Add To Calendar

        │
        ▼

Generate Calendar Event

        │
        ▼

Open Calendar Provider
```

---

# Social Preview Flow

Used when invitation link is shared.

Workflow:

```txt
Request URL

        │
        ▼

Load Invitation

        │
        ▼

Load Preview Image

        │
        ▼

Generate Open Graph Metadata

        │
        ▼

Return HTML Metadata
```

---

# File Storage Strategy

Stored Files:

* Cover Image
* Gallery Image
* QRIS Image
* Background Music

Storage:

```txt
Cloudflare R2
```

Fallback:

```txt
MinIO
```

Database stores only URLs.

---

# Non Functional Requirements

Performance:

* Mobile First
* Fast Initial Load
* Lazy Loaded Gallery

Security:

* JWT Authentication
* RBAC Authorization
* Input Validation
* File Upload Validation

Scalability:

* Multiple Invitations Per User
* Large Guest Lists
* Future Subscription Support

Maintainability:

* Modular Architecture
* Feature Based Frontend
* Domain Based Backend

---

# Future Extensions

Not included in MVP:

* AI Content Generator
* Subscription System
* Team Collaboration
* White Label
* Custom Domain
* WhatsApp Reminder

Architecture must support future addition without major refactoring.
