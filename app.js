const express = require('express');
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

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
  //console.log('Hello from the middleware');
  next();
});

///////////////////////////////////////////////////////
// 2) ROUTE HANDLERS - now in their own modules

//////////////////////////////////////////////////////////
// 3) ROUTES
// Mounting routers
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

//////////////////////////////////////////////////////////
// 4) START THE SERVER - entry point changed in server.js
module.exports = app;
