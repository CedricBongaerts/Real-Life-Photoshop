angular.module('starter.controllers', ['uiGmapgoogle-maps'])

.config(function(uiGmapGoogleMapApiProvider) {
	uiGmapGoogleMapApiProvider.configure({
        //    key: 'your api key',
        v: '3.17',
        libraries: 'visualization'
    });
})


.controller('StartCtrl', function($scope, uiGmapGoogleMapApi) {
	$scope.art={ name: "", coords:[]};
	var watchId=null;
	$scope.started = false;

	if(localStorage.getItem('artlist') === null || localStorage.getItem('artlist') === "" ){
		localStorage.setItem('artlist', JSON.stringify([]));
		console.log("localstorage set");
	}

	uiGmapGoogleMapApi.then(function(maps) {
		$scope.map = { 
			center: { latitude: 43.07493, longitude: -89.381388 }, 
			zoom: 16
		};

	});

	

	$scope.startStopButtonClicked = function() {
		if($scope.started){
			//van start naar stop clickevent
			var artlist = [];

			artlist = JSON.parse(localStorage.artlist);
			artlist.push($scope.art);
			localStorage.setItem('artlist',JSON.stringify(artlist));

			navigator.geolocation.clearWatch(watchId);

			$scope.map.center.latitude = $scope.art.coords[$scope.art.coords.length-1].latitude;
			$scope.map.center.longitude = $scope.art.coords[$scope.art.coords.length-1].longitude;
			$scope.started = !$scope.started;
			$scope.art={ name: "", coords:[]};
			console.log("tracking stopped",watchId);
		}

		else{

			if ($scope.art.name !== "") {
				//van stop naar start clickevent
				$scope.started = !$scope.started;

				//GPS enablen
				watchId = navigator.geolocation.watchPosition(
					function(pos) {
						console.log(pos.coords.latitude);
						console.log(pos.coords.longitude);
						
						$scope.$apply(function () {
							$scope.map.center.latitude = pos.coords.latitude;
							$scope.map.center.longitude = pos.coords.longitude;
							$scope.pos = pos;
							$scope.art.coords.push(pos.coords);
						});

					}, function(error) {
						console.log('Unable to get location: ' + error.message);
					}, {maximumAge:5000, timeout:2 * 60 * 1000, enableHighAccuracy: true}  

					);

				console.log("tracking started",watchId);
			}
			else{
				alert("Please fill in a name.");
			}
		}
	};
})

.controller('ArtCtrl', function($scope) {
	if(localStorage.artlist !== "" ){
		$scope.artlist = JSON.parse(localStorage.artlist);
	}

})

.controller('ArtDetailCtrl', function($scope, $stateParams, uiGmapGoogleMapApi) {
	console.log($stateParams.artId);
	var artlist = JSON.parse(localStorage.artlist);
	artlist.some(function(entry) {
		if(entry.name === $stateParams.artId){
			$scope.art = entry;
			return;
		}
	});

	uiGmapGoogleMapApi.then(function(maps) {
		$scope.map = { 
			center: { latitude: $scope.art.coords[0].latitude, longitude: $scope.art.coords[0].longitude }, 
			zoom: 16
		};

	});

})

.controller('HomeCtrl', function($scope) {

})
