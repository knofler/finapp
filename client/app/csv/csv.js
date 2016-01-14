'use strict';

angular.module('finapp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('csv', {
        url: '/csv',
        templateUrl: 'app/csv/csv.html',
        controller: 'CsvCtrl'
      });
  });