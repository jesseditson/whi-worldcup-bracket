/* global alert */
'use strict';

angular.module('worldCupStandingsApp')
  .controller('LeaderboardCtrl', ['$scope','$http','users','rounds',function ($scope, $http, users, rounds) {
    var reloadPoints = function(){
      users = users.map(function(user){
        user.points = 0;
        return user;
      });
      // add points for round of 32
      ['A','B','C','D','E','F','G','H'].forEach(function(group){
        var groupScores = rounds[32][group];
        Object.keys(groupScores).forEach(function(match){
          var teams = match.split('-');
          var realScores = groupScores[match];
          users.forEach(function(user){
            var userScores = user.rounds[32][group][match];
            if(userScores[teams[0]] === realScores[teams[0]] && userScores[teams[1]] === realScores[teams[1]]){
              user.points += 1;
              console.log(user.name,'exact : ',match,'('+user.points+')');
            }
            var userWinner = userScores[teams[0]] === userScores[teams[1]] ? -1 : userScores[teams[0]] > userScores[teams[1]] ? 0 : 1;
            var realWinner = realScores[teams[0]] === realScores[teams[1]] ? -1 : realScores[teams[0]] > realScores[teams[1]] ? 0 : 1;
            if(userWinner === realWinner){
              user.points += 1;
              console.log(user.name,'winner : ',match,'('+user.points+')');
            }
          });
        });
      });
      $scope.users = users.sort(function(a,b){
        return a.points < b.points;
      });
    };
    reloadPoints();
    $scope.reloadScores = function(){
      $http({method: 'GET', url: '/api/reloadStandings'}).
        success(function() {
          reloadPoints();
        }).
        error(function(data) {
          alert(data || 'error reloading scores...');
        });
    };
  }]);
