'use strict';

describe('Directive: cards', function () {

  // load the directive's module and view
  beforeEach(module('finapp'));
  beforeEach(module('app/directive/cards/cards.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<cards></cards>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the cards directive');
  }));
});