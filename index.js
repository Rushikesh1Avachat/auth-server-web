require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { dbConnect } = require('./config/Database');
const { appConfig } = require('./config/AppConfig');

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

  // Preflight
  app.options("*", cors());

  // DB
  await dbConnect();

  // Routes
  appConfig(app);

  // ✅ Listen on Render-assigned port
  const PORT = process.env.PORT || 5500; // Render sets process.env.PORT
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
};

startServer();

