'use strict';

describe('Directive: txtToSpeech', function () {

  // load the directive's module and view
  beforeEach(module('finapp'));
  beforeEach(module('app/directive/txt-to-speech/txt-to-speech.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<txt-to-speech></txt-to-speech>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the txtToSpeech directive');
  }));
});