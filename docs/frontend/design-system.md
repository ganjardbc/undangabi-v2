# UndangAbi V2 - Design System

## Overview

Dokumen ini mendefinisikan standar visual UndangAbi V2.

Tujuan:

* Konsistensi UI.
* Reusable Components.
* Mempermudah AI Coding Agent.
* Mempermudah scaling design.

---

# Design Principles

## Simplicity

Semua halaman harus mudah digunakan oleh pengguna non-teknis.

---

## Mobile First

Mayoritas pengguna membuka undangan dari smartphone.

---

## Fast Interaction

Minim popup dan minim klik.

---

## Consistency

Komponen harus menggunakan design token yang sama.

---

# Color Palette

## Primary

```txt
#3051B8
```

Digunakan untuk:

* Primary Button
* Active Navigation
* Link
* Chart Primary

---

## Secondary

```txt
#F8F9FC
```

Digunakan untuk:

* Background Section
* Card Background

---

## Success

```txt
#16A34A
```

---

## Warning

```txt
#F59E0B
```

---

## Danger

```txt
#DC2626
```

---

# Neutral Colors

```txt
#FFFFFF
#F5F5F5
#E5E7EB
#9CA3AF
#374151
#111827
```

---

# Typography

## Font Family

```txt
Inter
```

Fallback:

```txt
sans-serif
```

---

# Font Size Scale

```txt
12px
14px
16px
18px
20px
24px
30px
36px
48px
```

---

# Border Radius

```txt
sm = 6px
md = 10px
lg = 14px
xl = 20px
```

---

# Shadow

## Card

```txt
shadow-sm
```

## Modal

```txt
shadow-lg
```

---

# Spacing Scale

```txt
4
8
12
16
24
32
48
64
```

---

# Responsive Breakpoints

```txt
sm = 640px
md = 768px
lg = 1024px
xl = 1280px
2xl = 1536px
```

---

# Form Rules

Label always visible.

Example:

```txt
Name
[ Input ]
```

Never use placeholder as label.

---

# Table Rules

Desktop:

```txt
Table
```

Mobile:

```txt
Card List
```

---

# Loading States

Use:

```txt
Skeleton Loader
```

Avoid:

```txt
Blank Screen
```

---

# Empty States

Every page must have:

```txt
Icon
Title
Description
Primary Action
```

---

# Notification Types

```txt
Success
Info
Warning
Error
```

---

# Accessibility

Minimum contrast:

```txt
WCAG AA
```

Keyboard navigation required.
