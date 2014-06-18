'use strict';

angular.module('worldCupStandingsApp')
  .factory('User', ['$resource', function ($resource) {
    return $resource('/api/users/:userame', {}, { //parameters default
      update: {
        method: 'PUT',
        params: {}
      },
      create: {
        method: 'POST',
        params: {}
      },
      get: {
        method: 'GET',
        params: {}
      }
    });
  }]);
