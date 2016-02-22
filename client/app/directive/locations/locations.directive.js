'use strict';

angular.module('finapp')
  .directive('locations', function ($http,socket) {
    return {
      templateUrl: 'app/directive/locations/locations.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {

      
      // Custom API build to lazy search for Australian location
      var url       = '/api/locations/';
      var serachurl = '/api/locations/search/';
      $(document).on('keyup','#search_suburb',function(){ 
        $http.get(serachurl,{
          params:{
            suburb:scope.suburb
            }
         }).success(function(gotData){
            scope.apilocations = gotData;
          // socket.syncUpdates('location',scope.locations);
        })
       });   

      //Pick address using ui-select and google API
      scope.address = {};
      scope.refreshAddresses = function(address) {
        var params = {address: address, sensor: false};
        return $http.get(
          'http://maps.googleapis.com/maps/api/geocode/json',
          {params: params}
        ).then(function(response) {
          console.log("response from google is :: ", response.data);
          scope.addresses = response.data.results
        });
       };
            
      //Pick address using ui-select and Local location API for australian suburbs only
      scope.auaddress = {};
      scope.refreshAUAddresses = function(address) {
        var params = {suburb: address};
        return $http.get(
          '/api/locations/search/',
          {params: params}
        ).then(function(response) {
          console.log("response.data.suburb is :: ", response.data[response.data.length-1].suburb);
          console.log("response  is :: ", response);
          scope.auaddresses = response.data;
        });
       };


      // scope.formdata = {};
      
      }// End of link
    };//End of Directive
  });//End of Module