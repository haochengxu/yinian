const path = require('path')
var express = require('express');
var app = express();
var indexRouter = require('./routes');

app.use('/', indexRouter);

app.listen(80, function() {
    console.log("node listening at 80")
});