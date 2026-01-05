require('dotenv').config();
const express = require('express');
var cors = require('cors');
const { dbConnect } = require('./config/Database');
const { appConfig } = require('./config/AppConfig');

const startServer = async () => {
  const app = express();

  // CORS configuration (example using Express)
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // allow Postman / server-to-server

    const allowedOrigins = [
      'http://localhost:5173', // local dev
      'https://auth-frontend-main-4zxz-pepah0fx8.vercel.app' // your deployed frontend
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

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// Replace your current app.use(cors(corsOptions)) with this
app.use(cors(corsOptions));

// Keep your preflight handling
app.options('*', cors(corsOptions));

  app.use(cors(corsOptions));

  // Handle preflight requests
  app.options('*', cors(corsOptions));

  // database connection
  await dbConnect();
  // App Default Config
  await appConfig(app);
};
startServer();





