var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose')

var smsRouter = require('./routes/sms');


var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const {DB_URL} = require('./config/dbConfig')
mongoose.connect(DB_URL,{ useNewUrlParser: true }).then(()=>{
    console.log("Successfully connected to MongoDB");
}).catch((err)=>{
    console.log("Unable to connect to MongoDB ",err);
});

app.use('/contact', smsRouter);



app.listen(5500,'localhost',()=>{console.log('server started at port 5500')})

module.exports = app;
