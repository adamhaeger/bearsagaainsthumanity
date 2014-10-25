
var app = angular.module('app', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
]);


app.run(function () {

   console.log("hey there this receiver");

});

app.controller('chatController', ['$scope', function($scope) {



    $scope.sendMessage = function(message){


        socket.emit(message);
    }

}]);