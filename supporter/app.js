
var app = angular.module('app', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute'
]);


app.run(function () {

    console.log("hey there this is the supporter");

});


app.config(function ($routeProvider, $locationProvider) {



    $routeProvider
        .when('/', {
            templateUrl: 'main.html'
        })

        .when('/chat:player_id', {
            templateUrl: 'main.html'
        })

});


app.controller('supporterController', ['$scope','$location', function($scope,$location) {
    var hostUrl = $location.$$protocol+'://'+$location.$$host+':'+$location.$$port;
    var players = [];
    var socket = io.connect(hostUrl+'/supporter');

    socket.on('connect',function() {
        console.log("connected to server");
    });
    socket.on('newPlayer', function(msg) {
        console.log("Got new player:" + msg.id);
        players[msg.id] = msg;
    });
    socket.on('playerlist', function(msg){

        console.log(msg);
        $scope.players = msg;
        console.log("Players: ", msg);
        $scope.$apply();
    });

}]);