// Module dependencies.
var application_root = __dirname;
var express = require("express");
var app = express();
/*var fs = require('fs')*/


app.use(express.static(__dirname));

app.listen(process.env.PORT || 8888);
