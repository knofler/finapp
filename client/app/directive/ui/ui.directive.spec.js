'use strict';

describe('Directive: ui', function () {

  // load the directive's module and view
  beforeEach(module('finapp'));
  beforeEach(module('app/directive/ui/ui.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<ui></ui>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the ui directive');
  }));
});