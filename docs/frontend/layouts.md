# UndangAbi V2 - Layouts Specification

## Overview

Layout digunakan sebagai kerangka utama aplikasi.

---

# Layout Types

```txt
Auth Layout
Dashboard Layout
Admin Layout
Public Layout
Error Layout
```

---

# Auth Layout

Used by:

```txt
/login
/register
/forgot-password
```

Structure:

```txt
+-------------------+
|       Logo        |
|                   |
|      Form         |
|                   |
+-------------------+
```

Mobile First.

---

# Dashboard Layout

Used by:

```txt
apps/customer
```

Structure:

```txt
+---------+----------------+
| Sidebar | Header         |
|         |                |
|         | Content        |
|         |                |
+---------+----------------+
```

Sidebar collapsible.

---

# Admin Layout

Same as dashboard layout.

Additional:

```txt
Admin Badge
```

---

# Public Layout

Used by:

```txt
/:slug
```

Structure:

```txt
Hero

Countdown

Content Sections

Footer
```

No sidebar.

---

# Error Layout

Used by:

```txt
404
403
500
expired
```

Structure:

```txt
Illustration

Title

Description

Action Button
```

---

# Header Components

Dashboard Header:

```txt
Breadcrumb
User Menu
Notification
```

---

# Sidebar Components

Customer:

```txt
Dashboard
Invitations
Guests
Analytics
Settings
```

Admin:

```txt
Dashboard
Users
Invitations
Templates
Analytics
Settings
```
