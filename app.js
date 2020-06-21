const express = require('express');
const mysql = require('mysql');
const records = require('./routes/records');
const app = express();

// Database
app.use(function(req,res,next) {
    global.connection = mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'hris'
    });
    connection.connect();
    next();
});


app.get('/', function(req,res) {
    res.send('Test Node');
});

app.use(function(req,res,next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Routes
app.use('/employee_records', records);

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
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
  

app.listen(5000, () => console.log('Server Starting on Port 5000'));

module.exports = app;