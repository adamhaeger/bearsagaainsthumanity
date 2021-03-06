
var app = angular.module('app', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute'
]);


app.run(function () {

    console.log("hey there this is the player");

});

app.controller('chatController', ['$scope', '$interval', '$location', function($scope, $interval, $location) {



    var hostUrl = $location.$$protocol+'://'+$location.$$host+':'+$location.$$port;

    var player = io.connect(hostUrl + "/player");
    var connected = false;


    player.on('connect', function () {
        connected=true;
    });
    player.on('disconnect', function () {
        connected=false;
    });

    var positionSuccess = function(lat, long){
    if ($scope.player && !$scope.player.isBurned) {
        $scope.player.lat = lat.coords.latitude;
            $scope.player.long = lat.coords.longitude;
            //console.log('Updating position for: ', $scope.player);
            if (connected) {
                player.emit('latLong', {
                id : $scope.player.id,
                lat : lat.coords.latitude,
                long: lat.coords.longitude
            });
            };
    };    
    }
    $scope.burn = function() {
        console.log('Activated burn: ', $scope.player);

        player.emit('burn', {
            player : $scope.player,
            lat : $scope.player.lat,
            long: $scope.player.long
        })
    }


    player.on("socketCountChange", function(count){
        console.log("socket count changed:" + count);
        $scope.socketCount = count;
    });


    player.on("newPlayer", function(player){
        if(!$scope.player || $scope.player.id === player.id){
            console.log("updated player:", player);
             $scope.player = player;
        }
        if ($scope.player.isBurned) {
            Audio("mp3/die.mp3").play();
        }
    });

    player.on("newChatMessage", function(message){

        console.log(message);

        if(message.id  === $scope.player.id ){


            if(!$scope.player.messages){
                $scope.player.messages = [];
            }

            $scope.player.messages.push(message.message);
        }

        /*console.log("new chat message", player);
        if(!$scope.player || $scope.player.id === player.id){
            console.log("updated player:", player);
            $scope.player = player;
        }*/
    });



    socket.on("newPosition", function(msg){

        console.log("this is new position");
        console.log(msg);
    })

    var positionError = function(error){

        console.log("this is the error", error);
    }

    function geo_success(position) {
        positionSuccess(position.coords.latitude, position.coords.longitude);
    }

    function geo_error() {
        alert("Sorry, no position available.");
    }

    var geo_options = {
        enableHighAccuracy: true,
        maximumAge        : 1000,
        timeout           : 27000
    };

    $interval(function(){
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(positionSuccess, positionError, {
                enableHighAccuracy : true
            });
        } else {
            error('not supported');
        }


    }, 500);

$scope.chatMessage = "this is the message";

}]);