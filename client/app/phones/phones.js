'use strict';

angular.module('finapp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('phones', {
        url: '/phones',
        templateUrl: 'app/phones/phones.html',
        controller: 'PhonesCtrl'
      });
  });