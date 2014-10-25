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
    this.burnAmmo = 5;
    this.burnRangeMeters = 10;
    this.isBurned = false;
}

var player = io.of("/player")
.on("connection", function(socket){
        console.log("new player connected");
        var newPlayer =  new Player();
        bear.players.push(newPlayer);
        //console.log("this is our player:", bear.players);
        player.emit("newPlayer", newPlayer);
        socket.on('latLong', function(msg){
            //console.log("receiving new lat longs");
            if (msg.lat && msg.long && bear.players[msg.id]) {
                bear.players[msg.id].lat = msg.lat;
                bear.players[msg.id].long = msg.long;
                //console.log(players[msg.id]);
                spectator.emit('newPosition', bear.players[msg.id]);
            }
        });
        socket.on('burn', function(msg) {
            console.log('Starting burn!', msg);
            var attackingPlayer = msg.player;
            if (!attackingPlayer.burnAmmo) {
                console.log('no ammo left canceling burn');
                return;
            };
            if (attackingPlayer.burnAmmo > 0) {
                attackingPlayer.burnAmmo--;
                player.emit("newPlayer", attackingPlayer);
            };
            for (var i = 0; i < bear.players.length; i++) {
                var defendingPlayer = bear.players[i];
                if (attackingPlayer.id === defendingPlayer.id) {
                    console.log('skipping self');
                    continue;
                };
                
                var distanceFromAttackingPlayer = measure(attackingPlayer.lat, attackingPlayer.long,
                 defendingPlayer.lat, defendingPlayer.long);

                console.log('Burning: ' +defendingPlayer.id +', distance: '+distanceFromAttackingPlayer);
                if (distanceFromAttackingPlayer <= attackingPlayer.burnRangeMeters ) {
                    console.log('player is burned', defendingPlayer);
                    defendingPlayer.isBurned = true;
                    spectator.emit('burnedPlayer', defendingPlayer);
                    supporter.emit('burnedPlayer', defendingPlayer);
                    player.emit("newPlayer", defendingPlayer);
                };
            };
        });
        socket.on('resetGame', function() {
            bear.players = [];
            supporter.emit('playerlist', bear.players);
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
function measure(lat1, lon1, lat2, lon2){  // generally used geo measurement function
    var R = 6378.137; // Radius of earth in KM
    var dLat = (lat2 - lat1) * Math.PI / 180;
    var dLon = (lon2 - lon1) * Math.PI / 180;
    console.log(dLat);
    console.log(dLon);
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c;
    return d * 1000; // meters
}