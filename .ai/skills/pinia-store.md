# .ai/skills/pinia-store.md

## Purpose

Gunakan skill ini ketika membuat Pinia Store.

---

# Store Responsibilities

Store hanya untuk:

```txt
Auth State
UI State
Cached Data
```

---

# Store Naming

```ts
useAuthStore
useInvitationStore
useGuestStore
```

---

# Store Structure

```ts
state
getters
actions
```

---

# Forbidden

Jangan:

```txt
Query Prisma
Business Logic Kompleks
Manipulasi DOM
```

---

# Async Rules

API call boleh dilakukan melalui service.

Example:

```ts
const data = await invitationService.getAll();
```

---

# Output Checklist

Pastikan:

```txt
Store typed
No any
Action terpisah
State minimal
```
