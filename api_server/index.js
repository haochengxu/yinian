const path = require('path')
var express = require('express');
var app = express();
var http = require('http')
var https = require('https')
var indexRouter = require('./routes');
var fs = require('fs')

var options = {
    key: fs.readFileSync('../2_www.yinianxingzhe.club.key'),
    cert: fs.readFileSync('../1_www.yinianxingzhe.club_bundle.crt')
}
app.use('/', indexRouter);

http.createServer(app).listen(80)
https.createServer(options, app).listen(443)

console.log("node listening at 80")
console.log("node listening at 443")