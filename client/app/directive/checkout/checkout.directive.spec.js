'use strict';

describe('Directive: checkout', function () {

  // load the directive's module and view
  beforeEach(module('finapp'));
  beforeEach(module('app/directive/checkout/checkout.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<checkout></checkout>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the checkout directive');
  }));
});