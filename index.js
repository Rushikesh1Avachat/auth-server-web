require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { dbConnect } = require('./config/Database');
const { appConfig } = require('./config/AppConfig');

const startServer = async () => {
  const app = express();

  // CORS configuration
  const corsOptions = {
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // allow Postman / server-to-server

      const allowedOrigins = [
        'http://localhost:5173', // local dev
        // 'https://auth-frontend-main-4zxz-pepah0fx8.vercel.app' // deployed frontend
      ];

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true, // allow cookies
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  };

  // Apply CORS middleware once
  app.use(cors(corsOptions));

  // Handle preflight requests once
  app.options('*', cors(corsOptions));

  // Database connection
  await dbConnect();

  // App Default Config
  await appConfig(app);

  // Start server
  // app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

startServer();





