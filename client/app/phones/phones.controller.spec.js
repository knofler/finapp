'use strict';

describe('Controller: PhonesCtrl', function () {

  // load the controller's module
  beforeEach(module('finapp'));

  var PhonesCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PhonesCtrl = $controller('PhonesCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
