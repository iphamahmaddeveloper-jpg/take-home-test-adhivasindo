# Backend - Adhivasindo Take Home Test

REST API dengan module Authentication (Register/Login + JWT) dan Content Management (CRUD + Search + Pagination).

## Tech Stack
- Node.js + Express
- MySQL (via Laragon) + Sequelize ORM
- JWT untuk security layer
- bcryptjs untuk hashing password
- Swagger untuk API Documentation

## Cara Menjalankan (dengan Laragon)

### 1. Jalankan Laragon
Buka Laragon, klik **Start All** (memastikan MySQL aktif di port 3306).

### 2. Buat database
Buka **HeidiSQL** atau **phpMyAdmin** dari menu Laragon, buat database baru bernama:
```
adhivasindo_db
```

### 3. Install dependencies
```bash
npm install
```

### 4. Setup environment variables
```bash
copy .env.example .env
```
Default `.env` sudah disesuaikan untuk Laragon (host `127.0.0.1`, port `3306`, user `root`, password kosong). Sesuaikan jika konfigurasi Laragon kamu berbeda.

### 5. Jalankan server (otomatis membuat tabel)
```bash
npm run dev
```
Server berjalan di: `http://localhost:4000`

### 6. (Opsional) Isi data contoh
```bash
npm run seed
```
Akun contoh setelah seed:
- email: `juliana@example.com`
- password: `password123`

## API Documentation
Swagger UI tersedia di:
```
http://localhost:4000/api-docs
```

## Endpoint Ringkas

### Auth
| Method | Endpoint | Deskripsi |
|---|---|---|
| POST | /api/auth/register | Registrasi user baru |
| POST | /api/auth/login | Login, mengembalikan JWT token |

### Content (butuh header `Authorization: Bearer <token>`)
| Method | Endpoint | Deskripsi |
|---|---|---|
| GET | /api/contents?search=&page=&limit= | List content + search + pagination |
| GET | /api/contents/:id | Detail content |
| POST | /api/contents | Tambah content |
| PUT | /api/contents/:id | Update content |
| DELETE | /api/contents/:id | Hapus content |

## ERD & Spesifikasi Tabel
Lihat file [`ERD.md`](./ERD.md)

## Contoh Request

**Register**
```bash
curl -X POST http://localhost:4000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Juliana","email":"juliana@example.com","password":"password123"}'
```

**Login**
```bash
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"juliana@example.com","password":"password123"}'
```

**Get Contents (pakai token dari login)**
```bash
curl http://localhost:4000/api/contents?search=pemrograman&page=1&limit=10 \
  -H "Authorization: Bearer <TOKEN>"
```
