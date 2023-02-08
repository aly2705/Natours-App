const path = require('path');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const viewRouter = require('./routes/viewRoutes');
const AppError = require('./utilities/AppError');
const globalErrorHandler = require('./controllers/errorController');

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

///////////////////////////////////////////////////////
// 1) MIDDLEWARES

// Serving static files
app.use(express.static(path.join(__dirname, 'public')));

// Set Security HTTP headers
app.use(helmet());

// Development logging: 3rd party middleware && using evironment variables
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

// Limit requests from the same IP
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour',
});
app.use('/api', limiter);

// Body parser: express middleware
app.use(express.json({ limit: '10kb' }));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS (Cross-site scripting attacks)
app.use(xss());

//Prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSize',
      'difficulty',
      'price',
    ],
  })
);

// Test middleware: Creating our own middleware
app.use((req, res, next) => {
  // express middleware
  // console.log(req.headers);
  next();
});

///////////////////////////////////////////////////////
// 2) ROUTE HANDLERS - now in their own modules

//////////////////////////////////////////////////////////
// 3) ROUTES
// Mounting routers
app.use('/', viewRouter);
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);

// Middleware for unhandled routes
app.all('*', (req, res, next) => {
  const err = new AppError(`Can't find ${req.originalUrl}`, 404);
  next(err); // next with parameter will be interpreted as an error => go to error handler middleware
});

// Global error handling middleware
app.use(globalErrorHandler);

//////////////////////////////////////////////////////////
// 4) START THE SERVER - entry point changed in server.js
module.exports = app;
