/* global alert, $ */
'use strict';

var nUndef = function(v){
  return typeof v !== 'undefined';
};

var defaultRounds = { 32 : {}, 16 : {
  '1a-2b' : {},
  '1c-2d' : {},
  '1b-2a' : {},
  '1d-2c' : {},
  '1e-2f' : {},
  '1g-2h' : {},
  '1f-2e' : {},
  '1h-2g' : {}
}, 8 : {
  '1a2b-1c2d' : {},
  '1e2f-1g2h' : {},
  '1b2a-1d2c' : {},
  '1f2e-1h2g' : {}
}, 4 : {
  '1a2b1c2d-1e2f1g2h' : {},
  '1b2a1d2c-1f2e1h2g' : {}
}, 2 : {
  '1a2b1c2d1e2f1g2h-1b2a1d2c1f2e1h2g' : {}
} };

angular.module('worldCupStandingsApp')
  .controller('UseradminCtrl', function ($scope, $http, $routeParams, RoundInfo, User, $location) {
    $scope.unsaved = true;
    var initialize = function(){
      $scope.rounds = RoundInfo;
      $scope.groups = ['A','B','C','D','E','F','G','H'].map(function(group){
        if(!$scope.user.rounds[32][group]){
          var groupInfo = RoundInfo.rounds[32][group];
          $scope.user.rounds[32][group] = Object.keys(groupInfo).reduce(function(o,p){
            o[p] = {};
            o[p][groupInfo[p][0]] = 0;
            o[p][groupInfo[p][1]] = 0;
            return o;
          },{});
        }
        return {'group' : group, 'rounds' : RoundInfo.rounds[32][group]};
      });
    };

    var standingPoints = function(standing){
      var points = 0;
      points += standing.W * 3;
      points += standing.D;
      return points;
    };
    var differential = function(standing){
      return standing.GF - standing.GA;
    };

    var groupPositions = function(group){
      group = group.toUpperCase();
      var groupInfo = RoundInfo.rounds[32][group];
      var standings = {};
      var groupScores = $scope.user.rounds[32][group];
      Object.keys(groupInfo).forEach(function(c){
        var match = groupScores[c];
        var teams = Object.keys(match);
        var team1 = teams[0];
        var team2 = teams[1];
        if(!standings[team1]){
          standings[team1] = { 'W' : 0, 'L' : 0, 'D' : 0, 'GF' : 0, 'GA' : 0 };
        }
        if(!standings[team2]){
          standings[team2] = { 'W' : 0, 'L' : 0, 'D' : 0, 'GF' : 0, 'GA' : 0 };
        }
        standings[team1].W += match[team1] > match[team2] ? 1 : 0;
        standings[team1].L += match[team1] < match[team2] ? 1 : 0;
        standings[team1].D += match[team1] === match[team2] ? 1 : 0;
        standings[team1].GF += parseInt(match[team1],10);
        standings[team1].GA += parseInt(match[team2],10);

        standings[team2].W += match[team2] > match[team1] ? 1 : 0;
        standings[team2].L += match[team2] < match[team1] ? 1 : 0;
        standings[team2].D += match[team2] === match[team1] ? 1 : 0;
        standings[team2].GF += parseInt(match[team2],10);
        standings[team2].GA += parseInt(match[team1],10);
      });
      var positions = Object.keys(standings);
      positions.sort(function(A,B){
        var teamA = standings[A];
        var teamB = standings[B];
        var pointsA = standingPoints(teamA);
        var pointsB = standingPoints(teamB);
        if(pointsA === pointsB){
          // differential matters
          var diff = differential(teamB) - differential(teamA);
          if(diff === 0){
            // GF matters
            var goals = teamB.GF - teamA.GF;
            if(goals === 0){
              console.warn('standings for',A,B,'are exactly tied, cannot compute a winner.');
            }
            return goals;
          } else {
            return diff;
          }
        } else {
          return pointsB - pointsA;
        }
        return ;
      });
      console.log(standings);
      return positions;
    };
    var round16Team = $scope.round16Team = function(team){
      if (!$scope.user) {
        return '';
      }
      var num = parseInt(team,10);
      var group = team[1];
      var positions = groupPositions(group);
      return positions[num-1];
    };
    var round8Team = $scope.round8Team = function(team){
      if (!$scope.user) {
        return '';
      }
      var parts = team.match(/(\d\w)(\d\w)/);
      var scores = $scope.user.rounds[16][parts[1] + '-' + parts[2]];
      var team16A = round16Team(parts[1]);
      var team16B = round16Team(parts[2]);
      if(nUndef(scores[parts[1]]) && nUndef(scores[parts[2]])){
        return scores[parts[1]] > scores[parts[2]] ? team16A : team16B;
      }
      return '';
    };
    var round4Team = $scope.round4Team = function(team){
      if (!$scope.user) {
        return '';
      }
      var parts = team.match(/(\d\w\d\w)(\d\w\d\w)/);
      var scores = $scope.user.rounds[8][parts[1] + '-' + parts[2]];
      var teamA = round8Team(parts[1]);
      var teamB = round8Team(parts[2]);
      if(nUndef(scores[parts[1]]) && nUndef(scores[parts[2]])){
        return scores[parts[1]] > scores[parts[2]] ? teamA : teamB;
      }
      return '';
    };
    $scope.round2Team = function(team){
      if (!$scope.user) {
        return '';
      }
      var parts = team.match(/(\d\w\d\w\d\w\d\w)(\d\w\d\w\d\w\d\w)/);
      var scores = $scope.user.rounds[4][parts[1] + '-' + parts[2]];
      var teamA = round4Team(parts[1]);
      var teamB = round4Team(parts[2]);
      if(nUndef(scores[parts[1]]) && nUndef(scores[parts[2]])){
        return scores[parts[1]] > scores[parts[2]] ? teamA : teamB;
      }
      return '';
    };
    $scope.saveUser = function(){
      if($scope.user && $scope.user.username){
        var creating = $routeParams.username === 'new';
        User[creating ? 'create' : 'update']($scope.user).$promise.then(function(resource){
          if(creating){
            $location.path('/user/' + resource.username);
          } else {
            $scope.unsaved = false;
          }
        },function(info){
          var err = (info.data && info.data.err) || 'Unknown error saving.';
          alert(err);
        });
      }
    };
    if($routeParams.username !== 'new'){
      User.get({username : $routeParams.username}).$promise.then(function(user){
        $scope.user = $.extend(true,user,{rounds : defaultRounds});
        initialize();
      },function(info){
        var err = (info.data && info.data.err) || 'Unknown user.';
        alert(err);
      });
      $scope.$watch('user', function() {
        $scope.unsaved = true;
        $scope.saveUser();
      }, true);
    } else {
      $scope.newUser = true;
      $scope.user = { rounds : defaultRounds };
      initialize();
    }
  });
