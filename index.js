require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { dbConnect } = require('./config/Database');
const { appConfig } = require('./config/AppConfig');

const startServer = async () => {
  const app = express();

  const corsOptions = {
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      const allowedOrigins = [
        'http://localhost:5173',
        process.env.FRONTEND_URL,
      ];

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  };

  app.use(cors(corsOptions));
  app.options('*', cors(corsOptions));

  await dbConnect();
  await appConfig(app);

  // const PORT = process.env.PORT || 5500;
  // app.listen(PORT, () =>
  //   console.log(`🚀 Server running on port ${PORT}`)
  // );
};

startServer();




