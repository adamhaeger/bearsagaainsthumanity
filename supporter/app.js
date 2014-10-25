
var app = angular.module('app', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute'
]);


app.run(function () {

    console.log("hey there this is the supporter");

});

app.controller('supporterController', ['$scope', function($scope) {


}]);