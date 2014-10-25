
var app = angular.module('app', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute'
]);


app.run(function () {

    console.log("hey there this receiver");

});

app.controller('chatController', ['$scope', '$interval', function($scope, $interval) {

    var positionSuccess = function(lat, long){
/*
        console.log(lat.coords.latitude, lat.coords.longitude);
        $scope.player.lat = lat.coords.latitude;
        $scope.player.long = lat.coords.longitude;
*/

        socket.emit('latLong',{
//            userId : $scope.userId,
            lat : lat.coords.latitude,
            long: lat.coords.longitude
        });

    }


    socket.on("socketCountChange", function(count){
        console.log("socket count changed:" + count);
        $scope.socketCount = count;
    });


    socket.on("newPlayer", function(players){
        //$scope.player = player;

        console.log(Object.keys(players));
    });


    socket.on("newPosition", function(msg){
        console.log(msg);
    })

    var positionError = function(error){

        console.log("this is the error", erro);
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

    $scope.sendMessage = function(message){
        console.log("sending message", message);
        socket.emit('chat message', message);
    }

}]);