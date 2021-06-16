var createError = require('http-errors');
var express = require('express');
const session = require('express-session');
var path = require('path');
var cookies = require('cookie-parser');
var logger = require('morgan');

const mainRoutes = require('./routes/mainRoutes');
const productsRoutes = require('./routes/productsRoutes');
const userRoutes = require('./routes/userRoutes');
const brandsRoutes = require('./routes/brandsRoutes');

var methodOverride = require('method-override');

var app = express();

const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware');

app.use(session({
  secret: 'Locote',
  resave: false,
  saveUninitialized: false
})); 

app.use(cookies());

app.use(userLoggedMiddleware);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(methodOverride('_method'));


app.use(express.static(path.join(__dirname, 'public')));

app.use('/', mainRoutes);
app.use('/products', productsRoutes);
app.use('/users', userRoutes);
app.use('/brands', brandsRoutes)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
 
module.exports = app;
