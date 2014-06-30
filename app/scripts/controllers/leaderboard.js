'use strict';


var nUndef = function(v){
  return typeof v !== 'undefined';
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

var groupPositions = function(group,rounds,user){
  group = group.toUpperCase();
  var groupInfo = rounds[32][group];
  var standings = {};
  var groupScores = user.rounds[32][group];
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
          console.warn('standings for',A,B,'are exactly tied, but we do not support computing team v team scores yet.');
          // console.log(groupScores[A + '-' + B]);
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
  return positions;
};
var round16Team = function(team,rounds,user){
  var num = parseInt(team,10);
  var group = team[1];
  var positions = groupPositions(group,rounds,user);
  return positions[num-1];
};
var round8Team = function(team,rounds,user){
  var parts = team.match(/(\d\w)(\d\w)/);
  var scores = user.rounds[16][parts[1] + '-' + parts[2]];
  var team16A = round16Team(parts[1],rounds,user);
  var team16B = round16Team(parts[2],rounds,user);
  if(nUndef(scores[parts[1]]) && nUndef(scores[parts[2]])){
    return scores[parts[1]] > scores[parts[2]] ? team16A : team16B;
  }
  return '';
};
var round4Team = function(team,rounds,user){
  var parts = team.match(/(\d\w\d\w)(\d\w\d\w)/);
  var scores = user.rounds[8][parts[1] + '-' + parts[2]];
  var teamA = round8Team(parts[1],rounds,user);
  var teamB = round8Team(parts[2],rounds,user);
  if(nUndef(scores[parts[1]]) && nUndef(scores[parts[2]])){
    return scores[parts[1]] > scores[parts[2]] ? teamA : teamB;
  }
  return '';
};
var round2Team = function(team,rounds,user){
  var parts = team.match(/(\d\w\d\w\d\w\d\w)(\d\w\d\w\d\w\d\w)/);
  var scores = user.rounds[4][parts[1] + '-' + parts[2]];
  var teamA = round4Team(parts[1],rounds,user);
  var teamB = round4Team(parts[2],rounds,user);
  if(nUndef(scores[parts[1]]) && nUndef(scores[parts[2]])){
    return scores[parts[1]] > scores[parts[2]] ? teamA : teamB;
  }
  return '';
};

angular.module('worldCupStandingsApp')
  .controller('LeaderboardCtrl', ['$scope','$http','users','rounds',function ($scope, $http, users, rounds) {
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
            // console.log(user.name,'exact : ',match,'('+user.points+')');
          }
          var userWinner = userScores[teams[0]] === userScores[teams[1]] ? -1 : userScores[teams[0]] > userScores[teams[1]] ? 0 : 1;
          var realWinner = realScores[teams[0]] === realScores[teams[1]] ? -1 : realScores[teams[0]] > realScores[teams[1]] ? 0 : 1;
          if(userWinner === realWinner){
            user.points += 1;
            // console.log(user.name,'winner : ',match,'('+user.points+')');
          }
        });
      });
    });
    // add points for round of 16
    var round16Teams = [];
    Object.keys(rounds[16]).forEach(function(match){
      var matchInfo = rounds[16][match];
      var teamA = Object.keys(matchInfo)[0];
      var teamB = Object.keys(matchInfo)[1];
      var teamAInfo = matchInfo[teamA];
      var teamBInfo = matchInfo[teamB];
      round16Teams.push(teamAInfo.team);
      round16Teams.push(teamBInfo.team);
    });
    Object.keys(rounds[16]).forEach(function(match){
      var matchInfo = rounds[16][match];
      var teamA = Object.keys(matchInfo)[0];
      var teamB = Object.keys(matchInfo)[1];
      var teamAInfo = matchInfo[teamA];
      var teamBInfo = matchInfo[teamB];
      users.forEach(function(user){
        var userTeamA = round16Team(teamA,rounds,user);
        var userTeamB = round16Team(teamB,rounds,user);
        if (round16Teams.indexOf(userTeamA) > -1) {
          console.log(user.name,'got +2 from',userTeamA,'getting out of group');
          user.points += 2;
        }
        if (round16Teams.indexOf(userTeamB) > -1) {
          console.log(user.name,'got +2 from',userTeamB,'getting out of group');
          user.points += 2;
        }
      });
      users.forEach(function(user){
        if(teamAInfo.score !== teamBInfo.score || teamAInfo.penalties !== teamBInfo.penalties){
          // this team has finished their match
          var userScores = user.rounds[16][match];
          console.log(user.name,'guessed',teamAInfo.team,':',userScores[teamA],',',teamBInfo.team,':',userScores[teamB]);
          if(!userScores){
            console.warn('NO ROUND 16 SCORE FOR USER: ',user.name);
            return;
          }
          if(userScores[teamA] === teamAInfo.score && userScores[teamB] === teamBInfo.score){
            if(teamAInfo.score === teamBInfo.score){
              console.error('unable to compute winner for',teamAInfo.team,'vs',teamBInfo.team,'as user penalty predictions are not recorded yet.');
            } else {
              console.log(user.name,'got exact scoreline correct for',match);
              user.points += 1;
            }
          } else {
            console.log(user.name,'missed scoreline for',match);
          }
        }
      });
    });
    console.log('------------ Round of 8 -------------');
    var round8Teams = [];
    Object.keys(rounds[8] || {}).forEach(function(match){
      var matchInfo = rounds[8][match];
      var teamA = Object.keys(matchInfo)[0];
      var teamB = Object.keys(matchInfo)[1];
      var teamAInfo = matchInfo[teamA];
      var teamBInfo = matchInfo[teamB];
      round8Teams.push(teamAInfo.team);
      round8Teams.push(teamBInfo.team);
    });
    Object.keys(rounds[8]).forEach(function(match){
      var matchInfo = rounds[8][match];
      var teamA = Object.keys(matchInfo)[0];
      var teamB = Object.keys(matchInfo)[1];
      var teamAInfo = matchInfo[teamA];
      var teamBInfo = matchInfo[teamB];
      users.forEach(function(user){
        var userTeamA = round16Team(teamA,rounds,user);
        var userTeamB = round16Team(teamB,rounds,user);
        if (round8Teams.indexOf(userTeamA) > -1) {
          console.log(user.name,'got +3 from',userTeamA,'advancing to round of 8');
          user.points += 3;
        }
        if (round8Teams.indexOf(userTeamB) > -1) {
          console.log(user.name,'got +3 from',userTeamB,'advancing to round of 8');
          user.points += 3;
        }
      });
      users.forEach(function(user){
        if(teamAInfo.score !== teamBInfo.score || teamAInfo.penalties !== teamBInfo.penalties){
          // this team has finished their match
          var userScores = user.rounds[8][match];
          if(!userScores){
            console.log('NO ROUND 8 SCORE FOR USER: ',user.name);
            return;
          }
          if(userScores[teamA] === teamAInfo.score && userScores[teamB] === teamBInfo.score){
            if(teamAInfo.score === teamBInfo.score){
              console.error('unable to compute winner for',teamAInfo.team,'vs',teamBInfo.team,'as user penalty predictions are not recorded yet.');
            } else {
              console.log(user.name,'got exact scoreline correct for',match);
              user.points += 1;
            }
          } else {
            console.log(user.name,'missed scoreline for',match);
          }
        }
      });
    });

    $scope.users = users.sort(function(a,b){
      return b.points - a.points;
    }).map(function(user,index){
      user.position = index + 1;
      return user;
    });
  }]);
