'use strict';

describe('Controller: AccountingCtrl', function () {

  // load the controller's module
  beforeEach(module('finapp'));

  var AccountingCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AccountingCtrl = $controller('AccountingCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
