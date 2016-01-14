'use strict';

describe('Directive: uiListings', function () {

  // load the directive's module and view
  beforeEach(module('finapp'));
  beforeEach(module('app/directive/uidir/ui-listings/ui-listings.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<ui-listings></ui-listings>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the uiListings directive');
  }));
});