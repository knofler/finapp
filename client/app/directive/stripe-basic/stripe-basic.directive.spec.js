'use strict';

describe('Directive: stripeBasic', function () {

  // load the directive's module and view
  beforeEach(module('finapp'));
  beforeEach(module('app/directive/stripe-basic/stripe-basic.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<stripe-basic></stripe-basic>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the stripeBasic directive');
  }));
});