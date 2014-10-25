// Module dependencies.
/*var application_root = __dirname;

/**/
/*var fs = require('fs')*/

var express = require("express");
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var socketCount = 0;

app.use(express.static(__dirname));


var that =  this;

that.players = [];

function Player() {

    this.id = guid();
    this.lat;
    this.name;
    this.long;

}

var players = [];

var player = io.of("/player")
.on("connection", function(socket){


        console.log("new player connected");

        var newPlayer =  new Player();
        that.players.push(newPlayer);

        console.log("this is players", that.players);

        console.log("this is our player:", newPlayer);

        player.emit("newPlayer", newPlayer);



        socket.on('latLong', function(msg){
            console.log("receiving new lat longs");

            var position = that.players.indexOf(msg.id)
            var changeObject = findById(that.players, msg.id);
            changeObject.lat = msg.lat;
            changeObject.long = msg.long;
            spectator.emit('newPosition', changeObject);
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
        console.log("this is the supporter methdos");
        console.log("this is our players", that.players);


        console.log("this is our players stringified", JSON.stringify(that.players));
        supporter.emit('playerlist', that.players);

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



function findById(source, id) {
    for (var i = 0; i < source.length; i++) {
        if (source[i].id === id) {
            return source[i];
        }
    }
    throw "Couldn't find object with id: " + id;
}


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