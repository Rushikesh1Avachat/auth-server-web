require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { dbConnect } = require('./config/Database');
const { appConfig } = require('./config/AppConfig');

const app = express();

// CORS
app.use(cors({
  origin: '*',
  credentials: true,
}));

// Start server
const startServer = async () => {
  await dbConnect();
  console.log('✅ Connected to MongoDB');

  appConfig(app);

  const PORT = process.env.PORT || 5500;
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
};

startServer();
