'use strict';

angular.module('finapp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('accounting', {
        url: '/accounting',
        templateUrl: 'app/accounting/accounting.html',
        controller: 'AccountingCtrl'
      });
  });