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
        controller: 'LeaderboardCtrl',
        resolve : {
          rounds : function(Rounds){
            return Rounds.master().$promise;
          },
          users : function(User){
            return User.list().$promise;
          }
        }
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
