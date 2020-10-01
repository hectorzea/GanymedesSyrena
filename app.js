//ENVIROMENTAL VARIABLES
require("./config/config");
const createError = require('http-errors');
const express = require('express');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require('cors');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.options('*', cors());

const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const productRouter = require('./routes/product');



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/user', usersRouter);
app.use('/api/product', productRouter);



// catch 404 and forward to error handler
app.use((req, res, next) =>  {
    next(createError(404));
});

// error handler
app.use( (err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

//connection to mongoose
mongoose.connect(
    process.env.DATABASEURL,
    { useNewUrlParser: true, useCreateIndex: true },
    err => {
        if (err) throw err;
        console.log("DATABASE UP");
    }
);

//the start of the app xD
app.listen(3001, () => {
    console.log("HTTP SERVER UP")
});

module.exports = app;
