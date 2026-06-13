# 🕊️ UndangAbi V2 — Digital Invitation & Guest Management System

UndangAbi V2 adalah platform modern **Digital Invitation + Guest Management System** yang dirancang untuk membantu pengguna membuat undangan digital premium, mengelola daftar tamu, menerima RSVP secara real-time, mengintegrasikan sistem check-in berbasis QR Code, dan memantau analitik undangan dalam satu sistem terintegrasi.

---

## 🌟 Key Features (MVP Scope)

- 📂 **Multi-Invitation Management**: Buat dan kelola lebih dari satu undangan dalam satu akun customer.
- 👥 **Guest Management**: Kelola data tamu undangan, kategori tamu, dan buat tautan undangan personal (*personalized invitation link*).
- 💬 **RSVP & Guestbook**: Dapatkan respon kehadiran tamu secara instan beserta pesan ucapan digital (*guestbook*).
- 🎁 **Digital Gift**: Integrasi informasi pembayaran digital, hadiah, alamat pengiriman kado, dan *cashless gift* (QRIS/Bank Transfer).
- 📅 **Add to Calendar**: Memudahkan tamu menambahkan jadwal acara ke Google Calendar, Apple Calendar, atau Outlook.
- 📱 **QR Check-in**: Scan QR Code tamu di lokasi acara untuk pencatatan kehadiran yang cepat dan akurat.
- 📊 **Analytics Dashboard**: Pantau performa undangan seperti statistik kunjungan, total RSVP hadir/tidak hadir, dan status check-in tamu.

---

## 🛠️ Technology Stack & Architecture

Project ini dibangun menggunakan arsitektur **Monorepo** dengan standard industri yang skalabel dan efisien:

### Core Frameworks
* **Monorepo Manager**: [TurboRepo](https://turbo.build/) & [PNPM Workspaces](https://pnpm.io/)
* **Frontend Apps**: [Vue 3](https://vuejs.org/) + [Vite](https://vitejs.dev/) + [TypeScript](https://www.typescriptlang.org/)
* **Backend API**: [NestJS](https://nestjs.com/) + [TypeScript](https://www.typescriptlang.org/)
* **Database & ORM**: [PostgreSQL](https://www.postgresql.org/) + [Prisma ORM](https://www.prisma.io/)

### Frontend UI & Styling
* **Design System**: [PrimeVue V4](https://primevue.org/) (Sleek UI Components)
* **Styling**: [Tailwind CSS V4](https://tailwindcss.com/)
* **State Management**: [Pinia](https://pinia.vuejs.org/) + Persisted State plugin
* **Form Validation**: [Zod](https://zod.dev/)

---

## 📁 Repository Structure

Monorepo diorganisasikan ke dalam folder `apps/` (untuk executable applications) dan `packages/` (untuk shared libraries & configs):

```txt
undangabi-v2/
├── apps/
│   ├── api/             # NestJS Main Backend API (Port: 3030)
│   ├── customer/        # Customer Dashboard Portal (Port: 5174)
│   ├── web/             # Public Invitation & Landing Page (Port: 5173)
│   └── admin/           # System Administration Dashboard (Port: 5175)
│
├── packages/
│   ├── ui/              # Reusable Shared UI components (PrimeVue-based)
│   ├── shared-types/    # Shared TypeScript Interfaces (User, RSVP, Invitation, etc.)
│   ├── shared-utils/    # Shared pure utility functions (slugify, formatters, etc.)
│   ├── eslint-config/   # Shared ESLint configuration rules
│   └── tsconfig/        # Shared TypeScript configs
│
├── docs/                # Comprehensive Product & Architecture Documentation
└── infra/               # Deployment scripts and Docker configurations
```

---

## 🚀 Getting Started

### Prerequisites
Sebelum memulai, pastikan Anda telah menginstal:
* [Node.js](https://nodejs.org/) (Versi LTS terbaru, minimal v18+)
* [PNPM](https://pnpm.io/) (Versi 9+)
* [PostgreSQL](https://www.postgresql.org/) (Running locally or hosted)

### 1. Clone & Install Dependencies
Clone repositori ke sistem lokal Anda dan jalankan perintah install:
```bash
pnpm install
```

### 2. Configure Environment Variables
Salin berkas `.env.example` menjadi `.env` di root direktori, lalu sesuaikan nilai konfigurasinya:
```bash
cp .env.example .env
```

Isi berkas `.env` mencakup konfigurasi database PostgreSQL, JWT secret token, serta konfigurasi cloud storage (seperti Cloudflare R2 / AWS S3) untuk upload aset gambar/musik:
```env
# Database & API
PORT=3030
DATABASE_URL="postgresql://username:password@localhost:5432/undangabi?schema=public"
JWT_SECRET="isi-dengan-secret-key-anda"

# Storage
S3_ENDPOINT="https://your-account-id.r2.cloudflarestorage.com"
S3_ACCESS_KEY="r2-access-key"
...
```

### 3. Setup Database Migrations
Jalankan migrasi Prisma untuk menyiapkan skema tabel PostgreSQL:
```bash
# Generate Prisma Client & jalankan migrasi
pnpm --filter undangabi-api prisma migrate dev
```

### 4. Running Development Servers
Gunakan TurboRepo untuk menjalankan semua aplikasi monorepo secara bersamaan dalam mode *development*:
```bash
pnpm dev
```
Setelah dijalankan, Anda dapat mengakses:
* **API Backend**: [http://localhost:3030/api/v1](http://localhost:3030/api/v1) (Swagger Docs: `/api/v1/docs`)
* **Public Web**: [http://localhost:5173](http://localhost:5173)
* **Customer Dashboard**: [http://localhost:5174](http://localhost:5174)
* **Admin Dashboard**: [http://localhost:5175](http://localhost:5175)

---

## ⚙️ Monorepo Scripts Reference

Semua command di bawah ini dijalankan dari root direktori monorepo menggunakan `pnpm`:

| Command | Deskripsi |
| :--- | :--- |
| `pnpm dev` | Menjalankan seluruh aplikasi (Vite & NestJS) secara paralel. |
| `pnpm build` | Membangun semua modul dan aplikasi untuk versi produksi. |
| `pnpm test` | Menjalankan unit & integration testing di seluruh workspace. |
| `pnpm lint` | Melakukan scan kode program untuk menemukan issues / style violation. |
| `pnpm format` | Memformat gaya penulisan kode program secara otomatis (Prettier). |
| `pnpm typecheck` | Menjalankan kompilasi TypeScript untuk pengecekan validitas tipe data. |

---

## 📜 Development Guidelines & Principles

Untuk menjaga kerapian dan konsistensi kode monorepo ini, seluruh developer wajib mengikuti aturan dasar berikut:

1. **Strict Module Structure**:
   * **Backend**: Setiap fitur baru di `apps/api` wajib mengikuti pola folder: `dto/`, `entities/`, `constants/`, `*.module.ts`, `*.controller.ts`, dan `*.service.ts`. Controller dilarang menyimpan logika bisnis.
   * **Frontend**: Setiap halaman / fitur di frontend wajib diorganisasikan ke dalam `modules/module-name/` dengan sub-folder `pages/`, `components/`, `stores/`, `services/`, `types/`, dan `router/`.
2. **Ownership Check**: Selalu batasi query data customer menggunakan `userId` dari pengguna yang terautentikasi (Cth: `where: { id: invitationId, userId: currentUser.id }`).
3. **No Database Direct Access from Frontend**: Komunikasi dengan database hanya dilakukan melalui REST API di `apps/api`.
4. **DRY Types & Utils**: Gunakan tipe data bersama dari `packages/shared-types` dan fungsi helper bersama dari `packages/shared-utils`. Dilarang menduplikasi tipe data atau fungsi helper.
5. **Soft Delete**: Data `users`, `invitations`, dan `guests` menggunakan metode *soft delete* (kolom `deletedAt`). Pastikan query selalu memfilter record yang `deletedAt: null`.

Informasi selengkapnya mengenai aturan pengembangan dapat dilihat langsung pada [AGENTS.md](file:///Users/ganjarhadiatna/Projects/undangabi-v2/AGENTS.md) dan koleksi panduan di folder [docs/](file:///Users/ganjarhadiatna/Projects/undangabi-v2/docs/).
