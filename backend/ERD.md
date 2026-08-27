# ERD & Spesifikasi Tabel

## Diagram (text-based ERD)

```
┌────────────────────────┐          ┌─────────────────────────────┐
│         users           │          │           contents            │
├────────────────────────┤          ├─────────────────────────────┤
│ PK id (UUID)            │ 1      N │ PK id (UUID)                  │
│    name (VARCHAR)        │ ───────► │ FK author_id (UUID) → users.id│
│    email (VARCHAR, UQ)   │          │    title (VARCHAR)            │
│    password (VARCHAR)    │          │    category (VARCHAR)         │
│    created_at (TIMESTAMP)│          │    description (TEXT)         │
│    updated_at (TIMESTAMP)│          │    thumbnail_url (VARCHAR)    │
└────────────────────────┘          │    created_at (TIMESTAMP)      │
                                     │    updated_at (TIMESTAMP)      │
                                     └─────────────────────────────┘
```

Relasi: satu `user` dapat memiliki banyak `content` (One-to-Many), melalui foreign key `contents.author_id -> users.id`.

## Spesifikasi Tabel

### Table: `users`
| Kolom | Tipe Data | Constraint | Keterangan |
|---|---|---|---|
| id | UUID | PRIMARY KEY, default uuidv4 | Identifier unik user |
| name | VARCHAR(255) | NOT NULL | Nama lengkap user |
| email | VARCHAR(255) | NOT NULL, UNIQUE | Email untuk login |
| password | VARCHAR(255) | NOT NULL | Password ter-hash (bcrypt) |
| created_at | TIMESTAMP | NOT NULL, default now() | Waktu dibuat |
| updated_at | TIMESTAMP | NOT NULL, default now() | Waktu diupdate terakhir |

### Table: `contents`
| Kolom | Tipe Data | Constraint | Keterangan |
|---|---|---|---|
| id | UUID | PRIMARY KEY, default uuidv4 | Identifier unik content |
| title | VARCHAR(255) | NOT NULL | Judul modul/konten |
| category | VARCHAR(100) | NOT NULL | Kategori (Pemrograman, Creative Marketing, dll) |
| description | TEXT | NULLABLE | Deskripsi konten |
| thumbnail_url | VARCHAR(255) | NULLABLE | URL gambar thumbnail |
| author_id | UUID | FOREIGN KEY → users.id, NULLABLE | Pembuat konten |
| created_at | TIMESTAMP | NOT NULL, default now() | Waktu dibuat |
| updated_at | TIMESTAMP | NOT NULL, default now() | Waktu diupdate terakhir |

## Catatan
Skema dibuat menggunakan Sequelize ORM dan otomatis di-sync ke database (`sequelize.sync({ alter: true })`) saat server dijalankan pertama kali, sehingga tabel akan otomatis terbentuk sesuai spesifikasi di atas.
