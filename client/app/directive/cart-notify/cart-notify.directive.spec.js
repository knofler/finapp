'use strict';

describe('Directive: cartNotify', function () {

  // load the directive's module and view
  beforeEach(module('finapp'));
  beforeEach(module('app/directive/cart-notify/cart-notify.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<cart-notify></cart-notify>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the cartNotify directive');
  }));
});