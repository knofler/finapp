'use strict';

describe('Directive: locations', function () {

  // load the directive's module and view
  beforeEach(module('finapp'));
  beforeEach(module('app/directive/locations/locations.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<locations></locations>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the locations directive');
  }));
});