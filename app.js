const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
require('./config/db.config');
require('dotenv').config();

//Router definition
const userRouter = require('./routes/user.route');
const homeRouter = require('./routes/home.route');
const vanRouter = require('./routes/van.route');

const app = express();

//CORS configuration
app.use(
  cors({
    credentials: true,
    origin: process.env.ORIGIN,
  })
);

app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use('/', homeRouter);
app.use('/user', userRouter);
app.use('/van', vanRouter);

module.exports = app;
