require('dotenv').config();
const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const courseRouter = require('./routes/courses');
const mediaRouter = require('./routes/media');
const orderPaymentsRouter = require('./routes/orderPayments');
const refreshTokenRouter = require('./routes/refreshToken');
const mentorsRouter = require('./routes/mentors');
const chaptersRouter = require('./routes/chapters');
const lessonsRouter = require('./routes/lessons');
const imageCoursesRouter = require('./routes/imageCourses');
const myCoursesRouter = require('./routes/myCourses');
const reviewsRouter = require('./routes/reviews');
const webhookRouter = require('./routes/webhook');

const verifyToken = require('./middlewares/verifyToken');
const can = require('./middlewares/permission');

const app = express();

app.use(logger('dev'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: false, limit: '50mb' }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/courses', courseRouter);
app.use('/media', verifyToken, can('ADMIN', 'STUDENT'), mediaRouter);
app.use('/orders', verifyToken, can('ADMIN', 'STUDENT'), orderPaymentsRouter);
app.use('/refresh-token', refreshTokenRouter);
app.use('/mentors', verifyToken, can('ADMIN'), mentorsRouter);
app.use('/chapters', verifyToken, can('ADMIN'), chaptersRouter);
app.use('/lessons', verifyToken, can('ADMIN'), lessonsRouter);
app.use('/image-courses', verifyToken, can('ADMIN'), imageCoursesRouter);
app.use('/my-courses', verifyToken, can('ADMIN', 'STUDENT'), myCoursesRouter);
app.use('/reviews', verifyToken, can('ADMIN', 'STUDENT'), reviewsRouter);
app.use('/webhook', webhookRouter);

module.exports = app;
