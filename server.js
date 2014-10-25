// Module dependencies.
/*var application_root = __dirname;

/**/
/*var fs = require('fs')*/
var express = require("express");
var app = express();
/*var app = require('express')();*/
var http = require('http').Server(app);
var io = require('socket.io')(http);
var socketCount = 0;

app.use(express.static(__dirname));



io.on('connection', function(socket){
    socketCount+=1;
    console.log('a user connected');

    socket.emit("userid", socketCount)


    socket.on('disconnect', function(){
        console.log('user disconnected');
    });


    socket.on('chat message', function(msg){
        console.log('message: ' + msg);
    });


    socket.on('latLong', function(msg){
        console.log('new lat: ' + msg.lat);
        console.log('new long: ' + msg.long);
    });



});

http.listen(process.env.PORT || 8888, function(){
    console.log('listening on *:8888');
});