angular.module('starter.controllers', [])

.controller('StartCtrl', function($scope) {
	$scope.art={ name: "", coords:[]};
	var watchId=null;
	$scope.started = false;

	if(localStorage.getItem('artlist') === null || localStorage.getItem('artlist') === "" ){
		localStorage.setItem('artlist', JSON.stringify([]));
		console.log("localstorage set");
	}

	

	$scope.startStopButtonClicked = function() {
		if($scope.started){
			//van start naar stop clickevent
			var artlist = [];

			artlist = JSON.parse(localStorage.artlist);
			artlist.push($scope.art);
			localStorage.setItem('artlist',JSON.stringify(artlist));

			navigator.geolocation.clearWatch(watchId);

			$scope.started = !$scope.started;
			$scope.art={ name: "", coords:[]};
			console.log("tracking stopped",watchId);
			
		}

		else{
			//van stop naar start clickevent
			$scope.started = !$scope.started;

			//GPS enablen
			watchId = navigator.geolocation.watchPosition(
				function(pos) {
					console.log(pos.coords.latitude);
					//var latitude = pos.coords.latitude;
					console.log(pos.coords.longitude);
					//var longitude = pos.coords.longitude;
					$scope.art.coords.push(pos.coords);
					console.log($scope.art.coords);

					$scope.$apply();

				}, function(error) {
					console.log('Unable to get location: ' + error.message);
				}, {maximumAge:2000, timeout:2 * 60 * 1000, enableHighAccuracy: true}  

				);

			console.log("tracking started",watchId);
			//$scope.$apply();
		}
	};
})

.controller('ArtCtrl', function($scope) {
	if(localStorage.artlist !== "" ){
		$scope.artlist = JSON.parse(localStorage.artlist);
	}
})

.controller('ArtDetailCtrl', function($scope,$stateParams) {
	console.log($stateParams.artId);
})

.controller('HomeCtrl', function($scope) {

})
