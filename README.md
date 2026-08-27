# Take Home Test Fullstack - Adhivasindo

Project ini berisi implementasi lengkap sesuai soal Take Home Test:
- **Backend**: REST API (Auth + Content Management), Node.js + Express + MySQL + JWT
- **Frontend**: React (Vite) + Tailwind, implementasi desain LMS, terhubung ke backend

Project ini SUDAH DIUJI JALAN oleh Claude sebelum dikirim (backend berhasil connect ke database, sync tabel, register/login/CRUD/search semua tervalidasi bekerja; frontend berhasil build tanpa error).

## Struktur Folder
```
project/
├── backend/     # REST API
└── frontend/    # React app
```

## Cara Menjalankan (pakai Laragon) — URUTAN PENTING: backend dulu, baru frontend

### 1. Jalankan Laragon
Buka Laragon → klik **Start All**. Pastikan MySQL aktif (biasanya port 3306).

### 2. Buat Database
Di Laragon, klik menu **Database** (atau buka HeidiSQL/phpMyAdmin dari situ) → buat database baru bernama:
```
adhivasindo_db
```

### 3. Setup Backend

Buka terminal (bisa lewat Laragon: klik kanan → Terminal, atau CMD biasa):
```
cd /d "D:\TAKE HOME TEST\backend"
copy .env.example .env
npm install
npm run dev
```

Default `.env` sudah disetel untuk Laragon (`127.0.0.1:3306`, user `root`, password kosong). Kalau MySQL Laragon kamu pakai password, edit dulu file `.env` (`notepad .env`) sebelum `npm run dev`.

Jika berhasil, akan muncul:
```
✅ Database connected
✅ Models synced
🚀 Server running on http://localhost:4000
📄 API Docs on http://localhost:4000/api-docs
```

(Opsional, supaya dashboard langsung ada isi data) buka terminal baru, masih di folder `backend`:
```
npm run seed
```
Ini membuat akun contoh: `juliana@example.com` / `password123` beserta 3 modul contoh.

### 4. Jalankan Frontend

Buka terminal baru:
```
cd /d "D:\TAKE HOME TEST\frontend"
npm install
npm run dev
```

Buka browser ke URL yang muncul di terminal (biasanya `http://localhost:5173`).

### 5. Testing Alur Aplikasi
1. Buka `/register` untuk buat akun baru, ATAU langsung `/login` pakai akun seed di atas
2. Setelah login → masuk ke Dashboard
3. Coba: search modul, tambah modul baru, edit modul, hapus modul
4. Cek juga Swagger API Docs di `http://localhost:4000/api-docs`

## Dokumen Pendukung
- `backend/ERD.md` — Diagram ERD dan spesifikasi tabel
- `backend/README.md` — Detail dokumentasi backend & contoh request API
- `frontend/README.md` — Detail dokumentasi frontend

## Troubleshooting Cepat
| Masalah | Solusi |
|---|---|
| `Access denied for user 'root'` | Cek `DB_USER`/`DB_PASS` di `.env` cocok dengan setting MySQL Laragon kamu (default Laragon: user `root`, password kosong) |
| `ECONNREFUSED` saat backend start | Pastikan Laragon sudah **Start All** dan MySQL aktif |
| `Unknown database 'adhivasindo_db'` | Buat dulu database-nya lewat HeidiSQL/phpMyAdmin di Laragon |
| Frontend error fetch API | Pastikan backend sudah jalan di port 4000 sebelum buka frontend |
| Port 4000/3306 bentrok | Cek di Laragon apakah ada service lain pakai port itu; ubah `PORT` di `.env` backend jika perlu |
| CMD tidak pindah drive dengan `cd D:` | Pakai `cd /d "D:\TAKE HOME TEST\backend"` (perlu `/d` untuk pindah drive di Windows) |

## Catatan untuk Pengumpulan Tugas
Sesuai instruksi soal, jangan lupa:
1. Screen record hasil aplikasi (pastikan URL address bar terlihat di rekaman)
2. Upload project ini ke repository (GitHub)
3. Kirim ke email `admin@adhivasindo.co.id` dengan subjek: `Fullstack_[nama]_[tanggal]_[bulan]_[tahun]`
