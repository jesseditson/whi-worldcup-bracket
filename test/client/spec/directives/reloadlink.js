'use strict';

describe('Directive: reloadLink', function () {

  // load the directive's module
  beforeEach(module('worldCupStandingsApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<reload-link></reload-link>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the reloadLink directive');
  }));
});
