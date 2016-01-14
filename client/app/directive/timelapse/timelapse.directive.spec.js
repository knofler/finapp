'use strict';

describe('Directive: timelapse', function () {

  // load the directive's module and view
  beforeEach(module('finapp'));
  beforeEach(module('app/directive/timelapse/timelapse.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<timelapse></timelapse>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the timelapse directive');
  }));
});