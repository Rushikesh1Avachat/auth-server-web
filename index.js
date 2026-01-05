require('dotenv').config();
const express = require('express');
var cors = require('cors');
const { dbConnect } = require('./config/Database');
const { appConfig } = require('./config/AppConfig');

const startServer = async () => {
  const app = express();

  // CORS configuration (example using Express)
  const corsOptions = {
   origin: [
    "http://localhost:5173",
    "https://auth-frontend-main-6jtn-a47k61tb4.vercel.app"
  ],
    credentials: true, // Allow credentials (cookies)
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  };
  app.use(cors(corsOptions));

  // Handle preflight requests
  app.options('*', cors(corsOptions));

  // database connection
  await dbConnect();
  // App Default Config
  await appConfig(app);
};
startServer();