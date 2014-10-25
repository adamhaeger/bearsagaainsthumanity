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

bear = this;

app.use(express.static(__dirname));


bear.players = [];


var numPlayers = 0;

function Player() {
    
    this.id = numPlayers;
    this.lat;
    this.long;
    numPlayers++;


}

var player = io.of("/player")
.on("connection", function(socket){


        console.log("new player connected");
        var newPlayer =  new Player();
        bear.players.push(newPlayer);

        console.log("this is our player:", bear.players);

        player.emit("newPlayer", newPlayer);

        socket.on('latLong', function(msg){

            //console.log("receiving new lat longs");
            if (bear.players[msg.id]) {
                bear.players[msg.id].lat = msg.lat;
                bear.players[msg.id].long = msg.long;

                //console.log(players[msg.id]);

                spectator.emit('newPosition', bear.players[msg.id]);
            }
        });
    });




var spectator = io.of('/spectator')
    .on("connection", function(socket){

        console.log("got a new spectator connection" , bear.players);

        //socket.on("newPosition", function(player){})
    });

var supporter = io.of('/supporter')
    .on("connection", function(socket){

     console.log("got a new supporter connection" , bear.players);

    socket.emit('playerlist', bear.players);
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