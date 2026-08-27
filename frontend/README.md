# Frontend - Adhivasindo Take Home Test

Implementasi tampilan Learning Management System (Dashboard) sesuai desain terlampir, terhubung ke Backend API.

## Tech Stack
- React (Vite)
- React Router
- Axios
- Tailwind CSS v4
- Framer Motion (animasi/interaksi)

## Fitur
- Login & Register (terhubung ke API `/api/auth`)
- Dashboard dengan sidebar, banner, dan modul kompetensi (data dari API)
- Search & Pagination pada daftar modul (terhubung ke `/api/contents`)
- CRUD Modul (Tambah, Edit, Hapus) via modal form
- Protected route: dashboard hanya bisa diakses setelah login (JWT tersimpan di localStorage)
- Animasi transisi halaman & interaksi hover/tap menggunakan Framer Motion

## Cara Menjalankan

Pastikan **backend sudah berjalan** di `http://localhost:4000` terlebih dahulu.

```bash
npm install
npm run dev
```

Buka browser ke URL yang muncul (default: `http://localhost:5173`).

## Alur Testing
1. Buka `/register` -> buat akun baru, atau langsung ke `/login` menggunakan akun seed:
   - email: `juliana@example.com`
   - password: `password123`
2. Setelah login, otomatis diarahkan ke `/dashboard`
3. Coba fitur search modul, tambah modul baru, edit, dan hapus modul
4. Logout untuk kembali ke halaman login

## Struktur Folder
```
src/
├── pages/        # Login, Register, Dashboard
├── components/   # Sidebar, ModuleCard, ContentFormModal
├── services/     # api.js (axios instance + interceptor JWT)
├── context/      # AuthContext (state login)
└── App.jsx       # Routing
```
