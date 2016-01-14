'use strict';

describe('Directive: elasticDisplay', function () {

  // load the directive's module and view
  beforeEach(module('finapp'));
  beforeEach(module('app/directive/elastic-display/elastic-display.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<elastic-display></elastic-display>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the elasticDisplay directive');
  }));
});