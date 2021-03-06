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
        
/*

        console.log("this is players", players);
        console.log("this is our player:", newPlayer);
*/

        player.emit("newPlayer", newPlayer);
        socket.on('latLong', function(msg){
            if (msg.lat && msg.long && bear.players[msg.id]) {
                bear.players[msg.id].lat = msg.lat;
                bear.players[msg.id].long = msg.long;
                
            console.log("receiving new lat longs");

                bear.players[msg.id].lat = msg.lat;
                bear.players[msg.id].long = msg.long;
                bear.players[msg.id].lat = msg.lat;
                bear.players[msg.id].long = msg.long;

                bear.players[msg.id].lat = msg.lat;
            bear.players[msg.id].long = msg.long;

                spectator.emit('newPosition', bear.players[msg.id]);
            }
        });

        socket.on('chatMessage', function(message){
            console.log(message);

            player.emit("newChatMessage", message)

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
                    spectator.emit('message','Player '+attackingPlayer.id+' burned player '+defendingPlayer.id+'!!! Distance '+distanceFromAttackingPlayer);
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
