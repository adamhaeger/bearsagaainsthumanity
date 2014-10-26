
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
        .when('/chat/:player_id', {
            templateUrl: 'chat.html'
        })
});



app.controller('supporterController', ['$scope','$location', function($scope,$location) {
    var hostUrl = $location.$$protocol+'://'+$location.$$host+':'+$location.$$port;
    var players = [];
    var socket = io.connect(hostUrl+'/supporter');

    var player = io.connect(hostUrl+'/player');


    socket.on('connect',function() {
        console.log("connected to server");
    });
    socket.on('newPlayer', function(msg) {
        console.log("Got new player:" + msg.id);
        players[msg.id] = msg;
    });
    socket.on('playerlist', function(msg){
        players = msg;
        console.log("Players: " , players);
        $scope.players = msg;
        $scope.$apply();
    });

    player.on('newChatMessage', function(msg){

        console.log("this is the messages");
        console.log(msg);
    });






    $scope.setCurrentPlayer = function(player){
        $scope.currentPlayer = player;
    }

    $scope.sendMessage = function(message){


        console.log(message);
        /*console.log($scope.currentPlayer);



        if(!$scope.currentPlayer.messages) {
            $scope.currentPlayer.messages = [];
        }

        $scope.currentPlayer.messages.push(message);
*/

  /*      message = null;
        $scope.chatMessage = null;
*/

        player.emit("chatMessage", {id : $scope.currentPlayer.id,  message : message})

    }


}]);