const express = require('express');
const { authRoutes } = require('../routes');
const helmet = require('helmet');
const errorHandler = require('../middlewares/errorMiddleare');
const cookieParser = require('cookie-parser');

exports.appConfig = (app) => {
  app.use(helmet());
  app.use(cookieParser());
  app.use(express.json());

  app.use('/api/auth', authRoutes);

  app.get('/', (req, res) => {
    res.send('Hello Code with Rushikesh');
  });

  app.use(errorHandler);
};
