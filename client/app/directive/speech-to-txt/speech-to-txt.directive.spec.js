'use strict';

describe('Directive: speechToTxt', function () {

  // load the directive's module and view
  beforeEach(module('finapp'));
  beforeEach(module('app/directive/speech-to-txt/speech-to-txt.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<speech-to-txt></speech-to-txt>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the speechToTxt directive');
  }));
});