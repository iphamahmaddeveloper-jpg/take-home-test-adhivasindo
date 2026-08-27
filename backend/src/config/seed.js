const bcrypt = require("bcryptjs");
const sequelize = require("./db");
const User = require("../models/User");
const Content = require("../models/Content");

async function seed() {
  try {
    await sequelize.sync({ alter: true });

    const hashedPassword = await bcrypt.hash("password123", 10);

    const [user] = await User.findOrCreate({
      where: { email: "juliana@example.com" },
      defaults: { name: "Juliana", email: "juliana@example.com", password: hashedPassword },
    });

    const contents = [
      {
        title: "Pemrograman Frontend Modern dengan React dan Angular",
        category: "PEMROGRAMAN",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        thumbnail_url: "https://picsum.photos/seed/pemrograman/400/300",
        author_id: user.id,
      },
      {
        title: "Storytelling dalam Pemasaran: Mengubah Data Menjadi Cerita yang Menginspirasi",
        category: "CREATIVE MARKETING",
        description: "Materi kompetensi seputar storytelling dan pemasaran viral.",
        thumbnail_url: "https://picsum.photos/seed/marketing/400/300",
        author_id: user.id,
      },
      {
        title: "Pemasaran Viral: Bagaimana Menciptakan Konten yang Cepat Menyebar",
        category: "MANAGEMENT SDM",
        description: "Materi kompetensi manajemen SDM dan strategi konten.",
        thumbnail_url: "https://picsum.photos/seed/sdm/400/300",
        author_id: user.id,
      },
    ];

    for (const c of contents) {
      await Content.findOrCreate({ where: { title: c.title }, defaults: c });
    }

    console.log("✅ Seed completed. Login with: juliana@example.com / password123");
    process.exit(0);
  } catch (err) {
    console.error("❌ Seed failed:", err);
    process.exit(1);
  }
}

seed();
