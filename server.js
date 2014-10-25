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


var players = [];

function Player() {

    this.id = guid();
    this.lat;
    this.long;

}

var players = [];

var player = io.of("/player")
.on("connection", function(socket){


        console.log("new player connected");

        var player =  new Player();
        players[player.id] = player;

        console.log("this is our player:", player);

        socket.emit("newPlayer", player);

        socket.on('latLong', function(msg){

            console.log("receiving new lat longs");

            players[msg.id].lat = msg.lat;
            players[msg.id].long = msg.long;

            console.log(players[msg.id]);

            spectator.emit('newPosition', players[msg.id]);
        });
    });




var spectator = io.of('spectator')
    .on("connection", function(socket){

        console.log("got a new spectator connection");

        //socket.on("newPosition", function(player){})
    });

var supporter = io.of('supporter')
    .on("connection", function(socket){

        console.log("got a new supporter connection");

        //socket.on("newPosition", function(player){})
    });




/*io.of(/spectator)

io.of(/supporter)*/

/*


io.on('connection', function(socket){
    socketCount++;
    console.log('a user connected');



    player.id = socketCount;

    players[player.id] = player;

    console.log('this is our player:', players);

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



    socket.on('latLong', function(msg){

*/
/*
        console.log(msg);

        console.log('new lat: ' + msg.lat);
        console.log('new long: ' + msg.long)*//*
;

        players[msg.id].lat = msg.lat;
        players[msg.id].long = msg.long;
        socket.emit("newPosition", player[msg.id])
    });

});
*/

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