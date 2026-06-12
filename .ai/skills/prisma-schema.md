# .ai/skills/prisma-schema.md

## Purpose

Gunakan skill ini ketika membuat atau mengubah Prisma schema.

---

# Naming Convention

Model:

```txt
PascalCase
```

Example:

```txt
User
Invitation
Guest
```

---

# Database Naming

Table:

```txt
snake_case plural
```

Example:

```prisma
@@map("invitations")
```

Field:

```txt
camelCase
```

Database column:

```txt
snake_case
```

---

# ID Rules

Semua primary key:

```prisma
id String @id @default(uuid()) @db.Uuid
```

---

# Timestamp Rules

Gunakan:

```prisma
createdAt DateTime @default(now())
updatedAt DateTime @updatedAt
```

---

# Soft Delete Rules

Gunakan:

```prisma
deletedAt DateTime?
```

untuk:

```txt
users
guests
invitations
```

---

# Index Rules

Tambahkan index untuk:

```txt
foreign key
status
slug
token
search field
```

---

# Relation Rules

Selalu definisikan relation dua arah.

---

# Transaction Rules

Gunakan transaction untuk:

```txt
Create Invitation
Duplicate Invitation
Import Guest
RSVP Submit
Check-In
```

---

# Output Checklist

Pastikan:

```txt
Model dibuat
Index dibuat
Unique dibuat
Relation dibuat
Migration aman
```
