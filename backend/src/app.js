const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
require("dotenv").config();

const sequelize = require("./config/db");
const swaggerSpec = require("./config/swagger");
const authRoutes = require("./routes/authRoutes");
const contentRoutes = require("./routes/contentRoutes");

// Load models so associations are registered
require("./models/User");
require("./models/Content");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Adhivasindo Take Home Test API is running",
    docs: "/api-docs",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/contents", contentRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

const PORT = process.env.PORT || 4000;

async function start() {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected");

    await sequelize.sync({ alter: true });
    console.log("✅ Models synced");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`📄 API Docs on http://localhost:${PORT}/api-docs`);
    });
  } catch (err) {
    console.error("❌ Unable to start server:", err);
  }
}

start();
