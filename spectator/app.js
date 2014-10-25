
var app = angular.module('app', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
]);


app.run(function () {

   console.log("hey there this receiver");


});



app.controller('spectatorController', ['$scope', function($scope) {
	spectator = this;
	//var socket = io();
	var socket = io.connect('http://localhost:8888/spectator');
	var spectator
	var map;
	var myLatlng = new google.maps.LatLng(59.438006,10.593910);
	var carebearImg = 'images/carebear.png';
	var players = [];
	var playerExists = function(id) {
		return (typeof players[id] != 'undefined');
	}
	var createPlayer = function(id,lat,long) {
		var playersLatlng = new google.maps.LatLng(lat,long);
		players[id] = {
			id:id,
			lat:lat,
			long:long,
			marker: new google.maps.Marker({
			    position: playersLatlng,
			    map: map,
			    title:"PLayerId:"+id,
			    icon: carebearImg
			}),
			//infoWindow: new google.maps.InfoWindow({
      		//	content: "Player: "+id
			//});
		}

	}
	var positionPlayer = function(id,lat,long) {

		var playersLatlng = new google.maps.LatLng(lat,long);
		players[id].marker.setPosition(playersLatlng);
		//players[id].marker.setAnimation(google.maps.Animation.BOUNCE);
		//setTimeout(function() {players[id].marker.setAnimation(null);}, 2000);

	}
	spectator.initialize = function() {
		var mapOptions = {
		  center: myLatlng,
		  zoom: 15,
		  mapTypeId: google.maps.MapTypeId.SATELLITE
		 
		};
		map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

	}
	console.log("initialize spectatorController");
	
	socket.on('connect',function() {
		console.log("connected to server");
	});
	socket.on('newPosition', function(msg){
		        
        console.log('new lat: ' + msg.lat);
        console.log('new long: ' + msg.long);
        console.log('new id: ' + msg.id);

        if (!playerExists(msg.id)) {
        	createPlayer(msg.id,msg.lat,msg.long);
        }
        else {
        	positionPlayer(msg.id,msg.lat,msg.long);
        }
	})
	function test() {
		createPlayer(1,59.438006,10.593910);
		createPlayer(2,59.438206,10.590910);
		console.log("Player exists:"+playerExists(1));
		setTimeout(function() {
			console.log("Positioning player")
			positionPlayer(1,59.438006,10.5930000);
		}, 1000);
		socket.emit('latLong', {
			id: 3,
			lat: 59.430006,
			long: 10.5935000

		});
		setTimeout(function() {
			console.log("Positioning player")
			socket.emit('latLong', {
				id: 3,
				lat: 59.439006,
				long: 10.5939000

			});
		}, 3000);
		
	}
	
	spectator.initialize();
	test();

}]);
