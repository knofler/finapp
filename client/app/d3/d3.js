'use strict';

angular.module('finapp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('d3', {
        url: '/d3',
        templateUrl: 'app/d3/d3.html',
        controller: 'D3Ctrl'
      });
  });