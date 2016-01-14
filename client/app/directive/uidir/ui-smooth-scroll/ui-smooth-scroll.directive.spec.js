'use strict';

describe('Directive: uiSmoothScroll', function () {

  // load the directive's module and view
  beforeEach(module('finapp'));
  beforeEach(module('app/directive/uidir/ui-smooth-scroll/ui-smooth-scroll.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<ui-smooth-scroll></ui-smooth-scroll>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the uiSmoothScroll directive');
  }));
});