# UndangAbi V2 - Entity Relationship Diagram

## Overview

Dokumen ini menjelaskan desain database UndangAbi V2.

Catatan:

* Struktur `users` dan `rbac` mengikuti pola dari project `umkm-pos`.
* Domain UndangAbi dibuat khusus untuk kebutuhan digital invitation, guest management, RSVP, QR check-in, dan analytics.

---

# ERD Diagram

```mermaid
erDiagram
    USERS ||--o{ USER_ROLES : has
    ROLES ||--o{ USER_ROLES : assigned
    ROLES ||--o{ ROLE_PERMISSIONS : has
    PERMISSIONS ||--o{ ROLE_PERMISSIONS : granted

    USERS ||--o{ INVITATIONS : owns
    INVITATIONS ||--o{ INVITATION_EVENTS : has
    INVITATIONS ||--o{ INVITATION_GALLERIES : has
    INVITATIONS ||--o{ GUESTS : has
    INVITATIONS ||--o{ GUESTBOOK_ENTRIES : has
    INVITATIONS ||--o{ GIFTS : has
    INVITATIONS ||--o{ ANALYTICS_EVENTS : tracks

    INVITATION_THEMES ||--o{ INVITATIONS : used_by

    GUEST_CATEGORIES ||--o{ GUESTS : categorizes
    GUESTS ||--o| RSVPS : submits
    GUESTS ||--o| CHECK_INS : checks_in

    USERS {
        uuid id PK
        string name
        string email
        string password_hash
        string phone
        string avatar_url
        boolean is_active
        datetime created_at
        datetime updated_at
        datetime deleted_at
    }

    ROLES {
        uuid id PK
        string name
        string slug
        string description
        datetime created_at
        datetime updated_at
    }

    PERMISSIONS {
        uuid id PK
        string name
        string slug
        string description
        datetime created_at
        datetime updated_at
    }

    USER_ROLES {
        uuid id PK
        uuid user_id FK
        uuid role_id FK
        datetime created_at
    }

    ROLE_PERMISSIONS {
        uuid id PK
        uuid role_id FK
        uuid permission_id FK
        datetime created_at
    }

    INVITATIONS {
        uuid id PK
        uuid user_id FK
        uuid theme_id FK
        string title
        string slug
        string event_type
        string status
        string cover_image_url
        string music_url
        string youtube_url
        text story
        string seo_title
        text seo_description
        string og_image_url
        json theme_config
        json section_visibility
        datetime published_at
        datetime archived_at
        datetime created_at
        datetime updated_at
        datetime deleted_at
    }

    INVITATION_THEMES {
        uuid id PK
        string name
        string slug
        string description
        json default_config
        boolean is_active
        datetime created_at
        datetime updated_at
    }

    INVITATION_EVENTS {
        uuid id PK
        uuid invitation_id FK
        string title
        string event_name
        datetime start_at
        datetime end_at
        string location_name
        text location_address
        string google_maps_url
        decimal latitude
        decimal longitude
        datetime created_at
        datetime updated_at
    }

    INVITATION_GALLERIES {
        uuid id PK
        uuid invitation_id FK
        string image_url
        string caption
        integer sort_order
        datetime created_at
        datetime updated_at
    }

    GUEST_CATEGORIES {
        uuid id PK
        uuid invitation_id FK
        string name
        string color
        datetime created_at
        datetime updated_at
    }

    GUESTS {
        uuid id PK
        uuid invitation_id FK
        uuid category_id FK
        string name
        string phone
        string email
        string invitation_token
        string qr_code_token
        string status
        integer max_guest_count
        datetime opened_at
        datetime sent_at
        datetime created_at
        datetime updated_at
        datetime deleted_at
    }

    RSVPS {
        uuid id PK
        uuid guest_id FK
        uuid invitation_id FK
        string attendance_status
        integer guest_count
        text message
        datetime submitted_at
        datetime created_at
        datetime updated_at
    }

    GUESTBOOK_ENTRIES {
        uuid id PK
        uuid invitation_id FK
        uuid guest_id FK
        string guest_name
        text message
        boolean is_visible
        datetime created_at
        datetime updated_at
    }

    GIFTS {
        uuid id PK
        uuid invitation_id FK
        string type
        string bank_name
        string account_number
        string account_holder_name
        string qris_image_url
        boolean is_active
        datetime created_at
        datetime updated_at
    }

    CHECK_INS {
        uuid id PK
        uuid guest_id FK
        uuid invitation_id FK
        datetime checked_in_at
        string checked_in_by
        string notes
        datetime created_at
        datetime updated_at
    }

    ANALYTICS_EVENTS {
        uuid id PK
        uuid invitation_id FK
        uuid guest_id FK
        string event_type
        string visitor_id
        string ip_address
        string user_agent
        string referrer
        json metadata
        datetime created_at
    }
```

---

# Table Details

## users

Mengikuti pola project `umkm-pos`.

Menyimpan data user platform.

Role:

* Admin
* Customer

---

## roles

Menyimpan daftar role.

Default role:

```txt
admin
customer
```

---

## permissions

Menyimpan daftar permission.

Contoh permission:

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

## user_roles

Pivot table antara user dan role.

Satu user dapat memiliki lebih dari satu role.

---

## role_permissions

Pivot table antara role dan permission.

Satu role dapat memiliki banyak permission.

---

# UndangAbi Domain Tables

## invitations

Entity utama undangan.

Satu user dapat memiliki banyak invitation.

Status:

```txt
draft
published
archived
```

Event type:

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

## invitation_themes

Menyimpan tema bawaan.

Default themes:

```txt
elegant
modern
nature
```

Theme config disimpan dalam bentuk JSON.

---

## invitation_events

Menyimpan detail acara.

Satu invitation dapat memiliki lebih dari satu event.

Contoh:

* Akad
* Resepsi
* Ngunduh Mantu
* Main Event

---

## invitation_galleries

Menyimpan foto gallery undangan.

---

## guest_categories

Kategori tamu per invitation.

Default:

```txt
Keluarga
Teman
Kantor
VIP
```

---

## guests

Menyimpan data tamu.

Status:

```txt
not_sent
sent
opened
rsvp_submitted
checked_in
```

Field penting:

```txt
invitation_token
qr_code_token
```

Digunakan untuk personalized invitation dan QR check-in.

---

## rsvps

Menyimpan konfirmasi kehadiran.

Attendance status:

```txt
attending
not_attending
```

---

## guestbook_entries

Menyimpan ucapan dan doa dari tamu.

---

## gifts

Menyimpan informasi amplop digital.

Type:

```txt
bank_transfer
qris
```

---

## check_ins

Menyimpan data kehadiran tamu saat QR di-scan.

---

## analytics_events

Menyimpan event tracking.

Event type:

```txt
invitation_viewed
rsvp_submitted
guestbook_submitted
gift_clicked
calendar_clicked
qr_checked_in
```

---

# Important Rules

## Multi Invitation

```txt
1 User = Many Invitations
```

---

## Ownership

Customer hanya boleh mengakses invitation miliknya sendiri.

Admin boleh mengakses semua invitation.

---

## Guest Uniqueness

Dalam satu invitation, `invitation_token` harus unik.

Dalam satu invitation, `qr_code_token` harus unik.

---

## Slug Uniqueness

Slug invitation harus unik secara global.

Contoh:

```txt
undangabi.com/ganjar-fitri
```

---

## Soft Delete

Gunakan soft delete untuk:

* users
* invitations
* guests

---

## Analytics

Analytics tidak perlu di-soft-delete.

Analytics bersifat append-only.

---

# Index Recommendation

Tambahkan index pada:

```txt
users.email
invitations.slug
invitations.user_id
guests.invitation_id
guests.invitation_token
guests.qr_code_token
rsvps.guest_id
check_ins.guest_id
analytics_events.invitation_id
analytics_events.event_type
analytics_events.created_at
```

---

# Future Tables

Belum masuk MVP:

```txt
subscriptions
plans
payments
teams
team_members
custom_domains
whatsapp_reminders
ai_generations
```
