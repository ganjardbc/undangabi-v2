# .ai/skills/vue-module.md

## Purpose

Gunakan skill ini ketika membuat module Vue.

---

# Stack

```txt
Vue 3
Composition API
Pinia
Vue Router
PrimeVue
Tailwind
```

---

# Module Structure

```txt
modules/module-name/

├── pages/
├── components/
├── stores/
├── services/
├── types/
└── router/
```

---

# Component Rules

Gunakan:

```txt
Composition API
<script setup>
```

---

# Page Rules

Page hanya untuk:

```txt
Layout
Container
Page Composition
```

Jangan meletakkan business logic besar di page.

---

# Service Rules

API call harus berada di:

```txt
services/
```

---

# Store Rules

State management berada di:

```txt
stores/
```

---

# Route Rules

Route berada di:

```txt
router/index.ts
```

Gunakan:

```ts
meta: {
  title: '',
  layout: '',
  permission: [],
}
```

---

# UI Rules

Gunakan komponen dari:

```txt
packages/ui
```

jika tersedia.

---

# Output Checklist

Pastikan:

```txt
Page dibuat
Component dibuat
Store dibuat
Service dibuat
Route dibuat
Type dibuat
```
