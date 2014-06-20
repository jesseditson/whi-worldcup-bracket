'use strict';

angular.module('worldCupStandingsApp', [
  'ngResource',
  'ngSanitize',
  'ngRoute'
])
  .config(['$routeProvider','$locationProvider',function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'partials/leaderboard',
        controller: 'LeaderboardCtrl',
        resolve : {
          rounds : ['Rounds',function(Rounds){
            return Rounds.master().$promise;
          }],
          users : ['User',function(User){
            return User.list().$promise;
          }]
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
      .when('/match/:round/:teams',{
        templateUrl: 'partials/match',
        controller: 'MatchCtrl',
        resolve : {
          rounds : ['Rounds',function(Rounds){
            return Rounds.master().$promise;
          }],
          users : ['User',function(User){
            return User.list().$promise;
          }]
        }
      })
      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode(true);
  }]);
