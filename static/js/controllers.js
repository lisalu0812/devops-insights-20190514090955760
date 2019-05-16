
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
    //var ashburton = {lat:-43.89834, lng: 171.73011};
    var map = new google.maps.Map(
        document.getElementById('map'), {zoom:6, center: auckland});
    var marker = new google.maps.Marker ({position: auckland, map: map});
 
      //Adding more markers
      var ashburton = {lat:-43.89834, lng: 171.73011};
      var marker1 = new google.maps.Marker ({position: ashburton, map: map});
      var christchurch = {lat:-43.53333, lng: 172.63333};
      var marker2 = new google.maps.Marker ({position: christchurch, map: map});
      var hamilton = {lat:-37.78333, lng:175.28333};
      var marker3 = new google.maps.Marker ({position: hamilton, map: map});
      var dunedin = {lat:-45.87416, lng:170.50361};
      var marker4 = new google.maps.Marker ({position: dunedin, map: map});
      var nelson = {lat:-41.27078,lng:173.28404};
      var marker5 = new google.maps.Marker ({position: nelson, map: map});
      var new_plymouth = {lat:-39.06667, lng:174.08333};
      var marker6 = new google.maps.Marker ({position: new_plymouth, map: map});
      var queenstown = {lat:-45.03023,lng:168.66271};
      var marker7 = new google.maps.Marker ({position: queenstown, map: map});
      var palmerston_north = {lat:-40.35636, lng: 175.61113};
      var marker8 = new google.maps.Marker ({position: palmerston_north, map: map});
      var wellington = {lat:-41.28664,lng:174.77557};
      var marker9 = new google.maps.Marker ({position: wellington, map: map});
     
      
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