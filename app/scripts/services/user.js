'use strict';

angular.module('worldCupStandingsApp')
  .factory('User', ['$resource', function ($resource) {
    return $resource('/api/users/:userame', {}, {
      list: {
        method: 'GET',
        params: {username : 'all'},
        isArray: true
      },
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
