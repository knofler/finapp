'use strict';

describe('Directive: opinion', function () {

  // load the directive's module and view
  beforeEach(module('finapp'));
  beforeEach(module('app/directive/opinion/opinion.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<opinion></opinion>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the opinion directive');
  }));
});