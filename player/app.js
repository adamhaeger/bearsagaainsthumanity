
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
        console.log(lat.coords.latitude, lat.coords.longitude);


        $scope.currentLat = lat.coords.latitude;

        $scope.currentLong= lat.coords.longitude;

        socket.emit('latLong',{
            lat : lat.coords.latitude,
            long: lat.coords.longitude
        });

    }

    socket.on("userid", function(){})


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

//    navigator.geolocation.watchPosition(geo_success, geo_error, geo_options);


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