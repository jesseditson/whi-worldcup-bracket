/* global alert */
'use strict';

angular.module('worldCupStandingsApp')
  .controller('MatchCtrl', ['$scope','$http','rounds','users','RoundInfo','$location','$routeParams',function ($scope, $http, rounds, users, RoundInfo, $location, $routeParams) {
    if (!$routeParams.teams) {
      $scope.single = false;
      var links = [];
      Object.keys(rounds[32]).forEach(function(group){
        Object.keys(rounds[32][group]).forEach(function(match){
          var abbr = Object.keys(rounds[32][group][match]);
          links.push({
            teamA : abbr[0],
            teamB : abbr[1],
            link : '/match/' + group + '/' + match
            });
        });
      });
      $scope.links = links;
    } else {
      $scope.single = true;
      var teams = $routeParams.teams;
      var round = $routeParams.round;
      var teamA;
      var teamB;
      var match;
      var matchName;
      var groupStage = false;
      if (/^[a-h]$/i.test(round)) {
        var matches = RoundInfo.rounds[32][round];
        groupStage = true;
        Object.keys(matches).forEach(function(key){
          var parts = key.split('-');
          if(key === teams || (parts[1] + '-' + parts[0]) === teams){
            teamA = parts[0];
            teamB = parts[1];
            matchName = key;
            match = rounds[32][round][key];
          }
        });
        if(!match){
          alert('match not found');
          $location.path('/');
          return;
        }
      } else if(/^(2|3|4|8|16)$/i.test(round)){
        alert('knockout stages aren\'t supported yet.');
        $location.path('/');
        return;
      } else {
        $location.path('/');
        return;
      }
      var tie = match[teamA] === match[teamB];
      var actual = $scope.actual = {
        name : 'Actual',
        teamA : { score : match[teamA], winner : match[teamA] > match[teamB], tie : tie },
        teamB : { score : match[teamB], winner : match[teamA] < match[teamB], tie : tie },
      };
      $scope.users = users.map(function(user){
        var userMatch = (groupStage ? user.rounds[32][round] : user.rounds[round])[matchName];
        var tie = userMatch[teamA] === userMatch[teamB];
        user.teamA = { score : userMatch[teamA], winner : userMatch[teamA] > userMatch[teamB], tie : tie };
        user.teamB = { score : userMatch[teamB], winner : userMatch[teamA] < userMatch[teamB], tie : tie };
        user.points = 0;
        if((actual.teamA.tie && user.teamA.tie) || (actual.teamA.winner === user.teamA.winner && actual.teamB.winner === user.teamB.winner)){
          user.points += 1;
        }
        if(match[teamA] === userMatch[teamA] && match[teamB] === userMatch[teamB]){
          user.points += 1;
        }
        return user;
      }).sort(function(a,b){
        return b.points - a.points;
      });
      $scope.users.unshift(actual);
      $scope.users.map(function(user){
        user.classes = {
          teamawinner : user.teamA.winner,
          teambwinner : user.teamB.winner,
          tie : user.teamA.tie
        };
        return user;
      });
      $scope.teamA = teamA;
      $scope.teamB = teamB;
    }
  }]);
