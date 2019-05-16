
var ConsoleModule = angular.module('ConsoleModule', ['ngRoute']);

ConsoleModule.config(['$routeProvider', '$locationProvider','$sceDelegateProvider', '$httpProvider',
    function ($routeProvider, $locationProvider, $sceDelegateProvider, $httpProvider) {
    $routeProvider.when('/', {
        templateUrl: '/partials/Byzip.html',
        controller: 'wcontroller',
        controllerAs: 'wcontroller'
    });
}]);

ConsoleModule.controller('wcontroller', ['$scope', '$http', '$routeParams', '$timeout', '$sce',
    function($scope, $http, $routeParams, $timeout, $sce) {

    $scope.somemessage = "Some weather";
    $scope.zip1City = "";
    $scope.zip1Weather = "";

    var m1,m2,m3,m4;
    var auckland = {lat: -36.848461, lng: 174.763336};
    var map = new google.maps.Map(
        document.getElementById('map'), {zoom:6, center: auckland});
    var marker = new google.maps.Marker ({position: auckland, map: map});
 
     
      var infowindow = new google.maps.InfoWindow({
      	   content: "GOOGLE MAP"
      });
     
    google.maps.addListener (map, 'click', function(event){
    	marker = new google.maps.Marker({position:event.latLng,map:map});
    	var city;
    	var lat = event.latLng.lat();
    	var lng = event.latLng.lng();
    	var latLng = lat +'&lon='+ lng;
    	$http ({
    		method:"GET",
    		url: '/api/v1/getWeather?lat=' + latLng
    	}).then(function(response){
    		$scope.zip1City = response.data.city;
            $scope.zip1Weather = response.data.weather;
            $scope.zip1m = "";
    	});
    }); 
     
      
    infowindow.open (map,marker);  
    $scope.zip = function(which) {

        var data = "";
        if(which === 1) {
            data = $scope.zip1m;
        } else if(which === 2) {
            data = $scope.zip2m;
        } else if(which === 3) {
            data = $scope.zip3m;
        } else if(which === 4) {
            data = $scope.zip4m;
        } 

        if(data.length >= 4) {
            $http({
                method: "GET",
                url: '/api/v1/getWeather?zip=' + data
            }).then( function(response) {
            	var latLng = null;
                if(which === 1) {
                    $scope.zip1City = response.data.city;
                    $scope.zip1Weather = response.data.weather;
                    latLng = {lat:response.data.la, lng: response.data.lo};
                    m1 = new google.maps.Marker({
                    	position: latLng,
                    	map:map
                    });
                } else if(which === 2) {
                    $scope.zip2City = response.data.city;
                    $scope.zip2Weather = response.data.weather;
                     latLng = {lat:response.data.la, lng: response.data.lo};
                    m2 = new google.maps.Marker({
                    	position: latLng,
                    	map:map
                    });
                } else if(which === 3) {
                    $scope.zip3City = response.data.city;
                    $scope.zip3Weather = response.data.weather;
                     latLng = {lat:response.data.la, lng: response.data.lo};
                    m3 = new google.maps.Marker({
                    	position: latLng,
                    	map:map
                    });
                } else if(which === 4) {
                    $scope.zip4City = response.data.city;
                    $scope.zip4Weather = response.data.weather;
                     latLng = {lat:response.data.la, lng: response.data.lo};
                    m4 = new google.maps.Marker({
                    	position: latLng,
                    	map:map
                    });
                } 
            });
        } else {
            if(which === 1) {
                    $scope.zip1City = "";
                    $scope.zip1Weather = "";
                    m1.setVisible(false);
                } else if(which === 2) {
                    $scope.zip2City = "";
                    $scope.zip2Weather = "";
                    m2.setVisible(false);
                } else if(which === 3) {
                    $scope.zip3City = "";
                    $scope.zip3Weather = "";
                    m3.setVisible(false);
                } else if(which === 4) {
                    $scope.zip4City = "";
                    $scope.zip4Weather = "";
                    m4.setVisible(false);
                } 
        }
    };
    
}]);