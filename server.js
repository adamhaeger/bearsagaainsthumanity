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


function Player() {

    this.id;
    this.lat;
    this.long;

}

var players = [];

io.on('connection', function(socket){
    socketCount++;
    console.log('a user connected');

    var player =  new Player();

    player.id = socketCount;

    players[player.id];

    console.log(players);

    socket.emit("newPlayer", players);

    socket.emit('socketCountChange',socketCount);



    socket.playerId = player.id;


    socket.on('disconnect', function(){
        socketCount--;
        console.log('user disconnected');

        delete players[socket.playerId];

        socket.emit('socketCountChange', socketCount);

    });

    socket.on('chat message', function(msg){
        console.log('message: ' + msg);
    });

    socket.on('latLong', function(msg){
        console.log('new lat: ' + msg.lat);
        console.log('new long: ' + msg.long);
        socket.emit("newPosition", msg)
    });



});

http.listen(process.env.PORT || 8888, function(){
    console.log('listening on *:8888');
});




var guid = (function() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return function() {
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    };
})();