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
			center: { latitude: 0, longitude: 0}, 
			zoom: 2
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

	$scope.takeScreenshot = function() {
        navigator.screenshot.save((function(e, r) {
          if (e) {
            $ionicPopup.alert({
              title: 'Error!',
              template: 'Screenshot unsuccessful'
            });
          } else {
            $ionicPopup.confirm({
              title: 'Screenshot successful',
              template: 'Click OK to share'
            }).then(function(res) {
              if (res) {
                window.plugins.socialsharing.share(null, null, 'file://' + r.filePath);
              } else {
                $ionicPopup.alert({
                  title: 'Error!',
                  template: 'Could not share'
                });
              }
            });
          }
        }), 'jpg', 50, 'randomScreenshot');
      };
	})

.controller('HomeCtrl', function($scope) {


});
