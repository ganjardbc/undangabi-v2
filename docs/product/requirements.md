# UndangAbi V2 - Product Requirements Document (PRD)

## Overview

UndangAbi V2 adalah platform Digital Invitation & Guest Management System yang memungkinkan pengguna membuat berbagai jenis undangan digital, mengelola tamu, memantau RSVP, melakukan QR Check-in, dan melihat analytics acara dalam satu platform.

Tujuan utama produk:

* Membuat undangan digital dalam hitungan menit.
* Mengelola tamu dalam satu dashboard.
* Mempermudah proses RSVP.
* Mempermudah proses check-in tamu saat acara berlangsung.
* Memberikan insight melalui analytics.

---

# Product Positioning

Bukan hanya:

> Website Undangan Digital

Tetapi:

> Platform Digital Invitation & Guest Management System

---

# Target Users

## Customer

Penyelenggara acara yang ingin membuat dan mengelola undangan.

Contoh:

* Pernikahan
* Khitanan
* Ulang Tahun
* Wisuda
* Gathering
* Seminar
* Acara Komunitas

---

## Admin

Tim internal UndangAbi yang mengelola platform.

---

# MVP Scope

## Authentication

### Register

Pengguna dapat membuat akun baru menggunakan email dan password.

### Login

Pengguna dapat masuk ke sistem menggunakan akun yang telah terdaftar.

### Forgot Password

Pengguna dapat melakukan reset password.

### Logout

Pengguna dapat keluar dari sistem.

---

# Role & Permission

## Admin

Memiliki akses penuh ke seluruh sistem.

Kemampuan:

* Kelola user
* Kelola undangan
* Kelola template
* Melihat statistik global

---

## Customer

Memiliki akses terhadap data miliknya sendiri.

Kemampuan:

* Kelola undangan sendiri
* Kelola tamu sendiri
* Kelola RSVP sendiri
* Melihat analytics sendiri

---

# Dashboard

## Customer Dashboard

Menampilkan:

* Total Undangan
* Total Tamu
* Total RSVP
* Total Kehadiran
* Total Kunjungan

---

## Admin Dashboard

Menampilkan:

* Total User
* Total Undangan
* Total RSVP
* Total Kehadiran
* Statistik Platform

---

# Invitation Management

## Multi Invitation

Satu akun dapat memiliki lebih dari satu undangan.

Contoh:

```txt
Ganjar
├── Wedding Ganjar & Fitri
├── Khitanan Alif
├── Birthday Nisa
```

---

## Invitation Status

Setiap undangan memiliki status:

```txt
Draft
Published
Archived
```

---

## Invitation Actions

Pengguna dapat:

* Create Invitation
* Edit Invitation
* Duplicate Invitation
* Archive Invitation
* Delete Invitation

---

## Invitation Slug

Setiap undangan memiliki slug yang dapat dikustomisasi.

Contoh:

```txt
undangabi.com/ganjar-fitri
```

---

# Event Information

Setiap undangan harus memiliki:

* Nama Acara
* Nama Penyelenggara
* Foto Cover
* Tanggal Acara
* Waktu Acara
* Lokasi Acara
* Google Maps

---

## Countdown Timer

Menampilkan hitung mundur menuju hari acara.

---

# Invitation Content

## Story Section

Berisi cerita pasangan atau cerita acara.

---

## Gallery Section

Berisi foto-foto acara atau foto pasangan.

---

## Video Section

Mendukung embed YouTube.

---

## Music Section

Mendukung background music.

---

# Theme & Customization

## Theme

Sistem menyediakan tiga tema bawaan:

### Elegant

Tema formal dan premium.

---

### Modern

Tema minimalis dan modern.

---

### Nature

Tema natural dan outdoor.

---

## Customization

Setiap tema dapat dikustomisasi:

* Primary Color
* Secondary Color
* Font
* Cover Style

---

## Section Visibility

Pengguna dapat mengaktifkan atau menonaktifkan section:

* Story
* Gallery
* Video
* Gift
* RSVP
* Guestbook

---

# Guest Management

## Guest CRUD

Pengguna dapat:

* Tambah tamu
* Edit tamu
* Hapus tamu

---

## Import Guest

Mendukung import CSV.

Kolom:

```txt
Nama
Nomor WhatsApp
Kategori
```

---

## Guest Category

Kategori bawaan:

* Keluarga
* Teman
* Kantor
* VIP

---

# Advanced Guest Management

## Guest Status

Status tamu:

```txt
Belum Dikirim
Sudah Dikirim
Sudah Dibuka
Sudah RSVP
Sudah Hadir
```

---

## Search

Pengguna dapat mencari tamu berdasarkan:

* Nama
* Nomor WhatsApp

---

## Filter

Pengguna dapat memfilter tamu berdasarkan:

* Kategori
* Status RSVP
* Status Kehadiran

---

# Personalized Invitation

Setiap tamu memiliki link personal.

Contoh:

```txt
https://undangabi.com/ganjar-fitri?to=Ganjar+Hadiatna
```

Saat membuka link:

```txt
Kepada
Ganjar Hadiatna
```

akan ditampilkan secara otomatis.

---

# RSVP

## Attendance Confirmation

Pilihan:

* Hadir
* Tidak Hadir

---

## Guest Count

Tamu dapat mengisi jumlah kehadiran.

---

## Message

Tamu dapat meninggalkan pesan atau catatan.

---

# Guestbook

Tamu dapat mengirim:

* Ucapan
* Doa

yang akan tampil pada halaman undangan.

---

# Digital Gift

## Bank Transfer

Mendukung:

* BCA
* BRI
* BNI
* Mandiri

---

## QRIS

Pengguna dapat mengunggah QRIS.

---

# QR Check-in

## Guest QR Code

Setiap tamu memiliki QR unik.

---

## Check-in Process

Petugas melakukan scan QR saat tamu datang.

Status otomatis berubah:

```txt
Belum Hadir
↓
Hadir
```

---

## Attendance Dashboard

Menampilkan:

* Total Hadir
* Total Belum Hadir
* Persentase Kehadiran

---

# SEO & Social Preview

## SEO Information

Pengguna dapat mengatur:

* SEO Title
* SEO Description

---

## Social Preview Image

Pengguna dapat menentukan gambar preview yang digunakan saat link dibagikan.

Platform:

* WhatsApp
* Telegram
* Facebook
* LinkedIn

---

# Calendar Integration

## Add To Calendar

Tamu dapat menambahkan acara ke:

* Google Calendar
* Apple Calendar
* Outlook Calendar

---

## ICS Download

Tamu dapat mengunduh file ICS.

---

# Analytics

## Visitor Analytics

Menampilkan:

* Total Kunjungan
* Unique Visitors

---

## RSVP Analytics

Menampilkan:

* Total RSVP
* Persentase RSVP

---

## Attendance Analytics

Menampilkan:

* Total Kehadiran
* Persentase Kehadiran

---

# Out Of Scope (Not Included in MVP)

Fitur berikut tidak termasuk dalam MVP:

## AI Features

* Generate cerita pasangan
* Generate kata pembuka
* Generate ucapan terima kasih

---

## Subscription

* Free Plan
* Pro Plan
* Agency Plan

---

## Team Collaboration

* Multi User
* Multi Admin

---

## Custom Domain

Contoh:

```txt
ganjarfitri.com
```

---

## White Label

Branding pihak ketiga.

---

## Reminder WhatsApp

* H-7
* H-3
* H-1

---

# Success Criteria

MVP dianggap berhasil apabila pengguna dapat:

1. Membuat akun.
2. Membuat lebih dari satu undangan.
3. Mengelola tamu.
4. Mengumpulkan RSVP.
5. Melakukan QR Check-in.
6. Melihat analytics acara.
7. Membagikan undangan dengan preview WhatsApp yang benar.
8. Menambahkan acara ke kalender digital.

Jika seluruh flow tersebut berjalan tanpa hambatan, maka MVP siap digunakan oleh pengguna pertama.
