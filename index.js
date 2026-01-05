require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { dbConnect } = require("./config/Database");
const { appConfig } = require("./config/AppConfig");

const startServer = async () => {
  const app = express();

  // Middleware
  app.use(express.json());

  // ✅ CORS (VERY IMPORTANT)
  app.use(
    cors({
      origin: [
        "http://localhost:5173",
        "https://auth-frontend-main-6jtn-a47k61tb4.vercel.app",
      ],
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  );

  app.options("*", cors());

  // DB
  await dbConnect();

  // Routes
  await appConfig(app);

  // ✅ LISTEN (REQUIRED)
  const PORT = process.env.PORT || 5500;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
