
var app = angular.module('app', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
]);


app.run(function () {

   console.log("hey there this receiver");


});



app.controller('spectatorController', ['$scope','$location', function($scope,$location) {
	var hostUrl = $location.$$protocol+'://'+$location.$$host+':'+$location.$$port;
	spectator = this;
	//var socket = io();
	var socket = io.connect(hostUrl+'/spectator');
	var map;
	var myLatlng = new google.maps.LatLng(59.438006,10.593910);
	var carebearImg = 'images/carebear.png';
	var carebearImgArr = ['images/carebear1.png','images/carebear2.png','images/carebear3.png','images/carebear4.png'];
	//var carebearImg = 'http://www.agence2presse.eu/Agence2Presse/Scripts/Widgets/Timer/flip/';
	var players = [];
	var playerExists = function(id) {
		return (typeof players[id] != 'undefined');
	}
	var burnPlayer = function(id) {
		if(players[id] && !players[id].isBurned) {
			players[id].marker.setIcon("http://img1.wikia.nocookie.net/__cb20100718075739/callofduty/images/5/5a/Icon_skull.png");
			players[id].marker.setAnimation(google.maps.Animation.BOUNCE);
			setTimeout(function() {
				players[id].marker.setAnimation(null);
				players[id].infoWindow.close(map,players[id].marker);
			}, 2000);
			

		}


	}
	var removePlayer = function(id) {
		players[id].marker.setAnimation(google.maps.Animation.BOUNCE);
		setTimeout(function() {
			players[id].marker.setMap(null);			
		}, 2000);

	}
	var createPlayer = function(id,lat,long) {
		var playersLatlng = new google.maps.LatLng(lat,long);
		var iconNumber = Math.floor((Math.random() * 4));
		players[id] = {
			id: id,
			lat: lat,
			long:long,
			marker: new google.maps.Marker({
			    position: playersLatlng,
			    map: map,
			    title:"PLayerId:"+id,
			    icon: carebearImgArr[iconNumber]
			}),
			infoWindow: new google.maps.InfoWindow({
      			content: getInfoWindowContent(id,lat,long),
		         disableAutoPan: false,		
     			maxWidth: 150
			})

		}
		console.log(players.indexOf(players[id]));

		players[id].infoWindow.open(map,players[id].marker);
		
	}
	var positionPlayer = function(id,lat,long) {
		if(!players[id].isBurned) {
			var playersLatlng = new google.maps.LatLng(lat,long);
			players[id].marker.setPosition(playersLatlng);
		}
		//players[id].infoWindow.setContent(getInfoWindowContent(id,lat,long));
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
	socket.on('burnedPlayer', function(msg){
		console.log('burning: '+msg.id);
		burnPlayer(msg.id);
	});
	socket.on('message', function(msg){
		$scope.feedItems.splice(0, 0, msg);
		$scope.$apply();
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
			console.log("Burning player")
			burnPlayer(2);
		}, 2000);
		setTimeout(function() {
			console.log("Positioning player")
			positionPlayer(1,59.435100,10.5926001);
		}, 1000);
		setTimeout(function() {
			console.log("Removing player")
			removePlayer(1);
		}, 5000);
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
				long: 10.593900

			});
		}, 3000);

		
	}
	//$scope.feedItems = ['Player 1 burned player 2','Player 4 burned player 1','Player 2 left the game','Player 1 burned player 7'];
	
	$scope.feedItems = [];
	function getInfoWindowContent(id,lat,long) {
		return '<div class="infoWindowContent" id="markerInfo'+id+'">'+
		      '<div id="siteNotice">'+
		      '</div>'+
		      '<h3>'+id+'</h3>'+
		      '<div class="message"></div>'+
		      //'<p class="lat">lat: '+lat+'</p>'+
		      //'<p class="lang">long: '+long+'</p>'
		      '</div>';
	}
	spectator.initialize();
	//test();

}]);
