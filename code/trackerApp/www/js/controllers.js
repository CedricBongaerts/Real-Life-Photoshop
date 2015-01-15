angular.module('starter.controllers', ['uiGmapgoogle-maps'])

.config(function(uiGmapGoogleMapApiProvider) {
	uiGmapGoogleMapApiProvider.configure({
        //    key: 'your api key',
        v: '3.17',
        libraries: 'visualization'
    });
})


<<<<<<< HEAD
.controller('StartCtrl', function($scope, $ionicLoading, $compile, uiGmapGoogleMapApi) {
=======
.controller('StartCtrl', function($scope, uiGmapGoogleMapApi) {
>>>>>>> origin/master
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

	uiGmapGoogleMapApi.then(function(maps) {
		$scope.map = { 
			center: { latitude: 51.2192, longitude: 4.4028 }, 
			zoom: 16
		};

	});



    // Niet Werkende map (Wel juiste manier..) 
    /*    $scope.init = function() {
        var myLatlng = new google.maps.LatLng(43.07493,-89.381388);

        var mapOptions = {
          center: myLatlng,
          zoom: 16,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("map"),
            mapOptions);
        
        console.log("map loaded");

        $scope.map = map;
    };

    $scope.centerOnMe = function() {
        if(!$scope.map) {
            return;
        }

        $scope.loading = $ionicLoading.show({
          content: 'Getting current location...',
          showBackdrop: false
        });

        navigator.geolocation.getCurrentPosition(function(pos) {
          $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
          $ionicLoading.hide();
        }, function(error) {
          alert('Unable to get location: ' + error.message);
        });
    };

    $scope.clickTest = function() {
        alert('Example of infowindow with ng-click');
    };*/
})

.controller('ArtCtrl', function($scope) {
	if(localStorage.artlist !== "" ){
		$scope.artlist = JSON.parse(localStorage.artlist);
	}

})

.controller('ArtDetailCtrl', function($scope, $stateParams, uiGmapGoogleMapApi, $ionicPopup) {
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
