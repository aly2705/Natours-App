const express = require('express');
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const AppError = require('./utilities/AppError');
const globalErrorHandler = require('./controllers/errorController');

const app = express();

///////////////////////////////////////////////////////
// 1) MIDDLEWARES

// 3rd party middleware && using evironment variables
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

// express middleware
app.use(express.json());

app.use(express.static(`${__dirname}/public`));

// Creating our own middleware
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
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

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
