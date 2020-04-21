var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var flash = require('connect-flash');

//router set =========================================================
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup =========================================================
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use((req, res, next) => {
  console.log(req.url, '저도 미들웨어입니다.');
  next();
});
//express set =========================================================
app.use(logger('dev'));                           //log
app.use(express.static(path.join(__dirname, 'public'))); //static 파일을 불러올 폴더 지정
app.use(express.json());                          //json 형식으로 데이터 보내기
app.use(express.urlencoded({ extended: false })); //false면 queryString모듈, true면 qs모듈 사용 (qs모듈은 외부 패키지 모듈이며 queryString에 확장형)
app.use(cookieParser('secret code'));                          //cookie를 자동으로 req.cookie에 저장
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: 'secret code',
  cookie: {
    httpOnly: true,
    secure: false,
  },
}));
app.use(flash());

//router set =========================================================
app.use('/', indexRouter);
app.use('/users', usersRouter);

//express set =========================================================
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
