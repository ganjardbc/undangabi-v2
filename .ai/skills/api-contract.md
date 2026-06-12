# .ai/skills/api-contract.md

## Purpose

Gunakan skill ini ketika membuat endpoint API.

---

# Source Of Truth

Selalu baca:

```txt
docs/api/api-contract.md
```

---

# Rules

Jangan mengubah:

```txt
Route
Request Shape
Response Shape
```

tanpa instruksi eksplisit.

---

# Validation

Gunakan DTO.

---

# Pagination

Gunakan:

```txt
page
limit
search
sort
order
```

---

# Success Response

```json
{
  "success": true,
  "message": "Success",
  "data": {}
}
```

---

# Error Response

```json
{
  "success": false,
  "message": "Validation Error",
  "errors": {}
}
```

---

# Ownership

Customer hanya boleh melihat datanya sendiri.

---

# Output Checklist

Pastikan:

```txt
API sesuai contract
DTO sesuai contract
Response sesuai contract
Permission sesuai contract
```
