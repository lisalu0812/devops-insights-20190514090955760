
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

    var auckland = {lat: -36.848461, lng: 174.763336};
    var map = new google.maps.Map(
        document.getElementById('map'), {zoom:6, center: auckland});
    var marker = new google.maps.Marker ({position: auckland, map: map});
    var places = [];
      //Adding a latlng obj for each city
      places.push(new google.maps.LatLng(-43.89834, 171.73011));  //Ashburton
      places.push(new google.maps.LatLng(-43.53333, 172.63333));  //Christchurch
      places.push(new google.maps.LatLng(-37.78333, 175.28333));  //Hamilton
      places.push(new google.maps.LatLng(-45.87416, 170.50361));  //Dunedin
      places.push(new google.maps.LatLng(-41.27078, 173.28404));  //Nelson
      places.push(new google.maps.LatLng(-39.06667, 174.08333));  //New Plymouth
      places.push(new google.maps.LatLng(-45.03023, 168.66271));  //Queenstown
      places.push(new google.maps.LatLng(-40.35636, 175.61113));  //Palmerston North
      places.push(new google.maps.LatLng(-41.28664, 174.77557));  //Wellington
      
     //Loop through the places array
     for (var i=0; i< places.length;i++){
     	//Create a new marker
     	var marker = new google.map.Marker ({
     		position: places[i],map: map
     	});
     }
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
                if(which === 1) {
                    $scope.zip1City = response.data.city;
                    $scope.zip1Weather = response.data.weather;
                } else if(which === 2) {
                    $scope.zip2City = response.data.city;
                    $scope.zip2Weather = response.data.weather;
                } else if(which === 3) {
                    $scope.zip3City = response.data.city;
                    $scope.zip3Weather = response.data.weather;
                } else if(which === 4) {
                    $scope.zip4City = response.data.city;
                    $scope.zip4Weather = response.data.weather;
                } 
            });
        } else {
            if(which === 1) {
                    $scope.zip1City = "";
                    $scope.zip1Weather = "";
                } else if(which === 2) {
                    $scope.zip2City = "";
                    $scope.zip2Weather = "";
                } else if(which === 3) {
                    $scope.zip3City = "";
                    $scope.zip3Weather = "";
                } else if(which === 4) {
                    $scope.zip4City = "";
                    $scope.zip4Weather = "";
                } 
        }
    };
    
}]);