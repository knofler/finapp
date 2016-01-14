'use strict';

describe('Directive: uiJoin', function () {

  // load the directive's module and view
  beforeEach(module('finapp'));
  beforeEach(module('app/directive/uidir/ui-join/ui-join.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<ui-join></ui-join>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the uiJoin directive');
  }));
});