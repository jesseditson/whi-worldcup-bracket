'use strict';

angular.module('worldCupStandingsApp', [
  'ngResource',
  'ngSanitize',
  'ngRoute'
])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'partials/leaderboard',
        controller: 'LeaderboardCtrl'
      })
      .when('/user/:username',{
        templateUrl: 'partials/useradmin',
        controller: 'UseradminCtrl'
      })
      .when('/user/new',{
        templateUrl: 'partials/useradmin',
        controller: 'UseradminCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode(true);
  });
