const express = require('express');
const { authRoutes } = require('../routes');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const errorHandler = require('../middlewares/errorMiddleare');

exports.appConfig = (app) => {
  app.use(helmet());
  app.use(cookieParser());
  app.use(express.json());

  app.use('/api/auth', authRoutes);

  app.get('/', (req, res) => {
    res.send('Hello World Rushikesh & Code it!');
  });

  app.use(errorHandler);
};
