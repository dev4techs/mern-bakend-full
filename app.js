const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const userRouter = require('./server/routes/user.routes');
const authRouter = require('./server/routes/auth.routes');

const app = express();

require('./db');

app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// app.use('/', indexRouter);
app.use('/api/users',userRouter);
app.use('/auth',authRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};


  res.status(err.status || 500).json({
    status: err.status || 500,
    message: err.message
  });

});

module.exports = app;
