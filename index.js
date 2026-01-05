require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { dbConnect } = require("./config/Database");
const { appConfig } = require("./config/AppConfig");

const startServer = async () => {
  const app = express();

  // Body parser
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // CORS
  app.use(
    cors({
      origin: [
        "http://localhost:5173",
        "https://auth-frontend-main-gwe4.vercel.app",
      ],
      credentials: true,
    })
  );

  app.options("*", cors());

  // DB
  await dbConnect();

  // App config
  appConfig(app);

  // ✅ LISTEN HERE ONLY
  const PORT = process.env.PORT || 5500;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
};

startServer();

