'use strict';

var request = require('request');
var path = require('path');
var fs = require('fs');
var mongoose = require('mongoose');
// Bootstrap models
var modelsPath = path.join(__dirname, '../lib/models');
fs.readdirSync(modelsPath).forEach(function (file) {
  if (/(.*)\.(js$|coffee$)/.test(file)) {
    require(modelsPath + '/' + file);
  }
});
var Rounds = mongoose.model('Rounds');

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var config = require(path.join(__dirname, '../lib/config/config'));
if(!mongoose.connection.db){
  mongoose.connect(config.mongo.uri, config.mongo.options);
}
var teamMap = {
  '09B8CB53-BB56-4B7E-86BD-EC7FC7CEAF33' : 'bra',
  'A0CD1355-B6FC-48D3-B67B-AF5AA2B2C1E1' : 'cro',
  'E0D48500-EF6D-40AC-A7A0-0F4B5BD59A9D' : 'mex',
  'DF25ABB8-37EB-4C2A-8B6C-BDA53BF5A74D' : 'cam',
  '05A7BADE-915A-4AFB-8C28-702069220E43' : 'spa',
  'FB6842E6-BB62-450D-98C0-A062610E6518' : 'ned',
  '9A319800-C80A-4FD9-9679-125D27246FB0' : 'chi',
  '16EF7687-2D69-473C-BFE7-B781D67752DC' : 'aus',
  'AD00D1E4-BA78-41B6-A7DF-E6E102F71042' : 'col',
  '38C4D44E-CDA3-40E2-8364-DA27CC190C52' : 'gre',
  '6B2A7C79-3758-421C-8967-7ABFE1FDC982' : 'cot',
  'F71A08CF-B3C5-414C-9144-308A5EE6DACC' : 'jap',
  '088C4113-CEFC-460C-830C-277C148C0CE7' : 'uru',
  'F77B348A-D7AE-4534-8ADA-8E52BEE64744' : 'cos',
  '2EFCFEB2-EBF8-4628-B659-B00C49D93811' : 'eng',
  'B61B25AA-CD8E-4778-AC26-DD08D7851990' : 'ita',
  '496A037B-FD32-4917-93E6-335D76C3422C' : 'swi',
  '8BABAAE8-D906-44F7-B784-A828573B35D9' : 'ecu',
  '4F9F018B-C14D-4E73-8145-2E77B8C64E9E' : 'fra',
  '17E2DCED-76BB-435D-9E96-68D5B3D490FA' : 'hon',
  '8DF9E0C5-F49F-4BCC-967D-EC4FF3C945EE' : 'arg',
  '74EA3831-DA4A-4093-B1E3-FD4EB45AA798' : 'bos',
  'FE173702-5266-4C67-8647-7A6A53ED0DE8' : 'ger',
  'F5280217-C808-4E1D-BB0E-BF4445687EC5' : 'por',
  'A6F97883-74FE-4162-A65E-10B3D94B71A3' : 'ira',
  '028EDCA8-6D1E-49CC-8442-A7A12E921E09' : 'nig',
  'CCC66F75-7004-46E4-BB31-259B06A42516' : 'gha',
  '820A471B-4B85-41E8-97A6-BC3063FE78D9' : 'usa',
  'AEA9A2F1-3A08-4149-96BD-A6F7433F46BA' : 'bel',
  '5841CDD6-D35C-4A2C-B063-0DF8529CB433' : 'alg',
  'BBBE6B39-E345-43C7-9E31-A442A866BF60' : 'rus',
  '8D6EAC04-14E9-4026-BF2A-AB81C4F3C529' : 'kor'
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
}, 3 : {
  'a-b' : {}
}, 2 : {
  '1a2b1c2d1e2f1g2h-1b2a1d2c1f2e1h2g' : {}
} };


var cli = require.main === module;

var standingPoints = function(standing){
  var points = 0;
  points += standing.W * 3;
  points += standing.D;
  return points;
};
var differential = function(standing){
  return standing.GF - standing.GA;
};
var groupPositions = function(group,rounds){
  group = group.toUpperCase();
  var standings = {};
  var groupScores = rounds[32][group];
  Object.keys(groupScores).forEach(function(c){
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
          console.log(groupScores[A + '-' + B]);
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

var round16MatchInfo = function(teamA,teamB,rounds){
  var teamAPosition;
  var teamBPosition;
  ['A','B','C','D','E','F','G','H'].forEach(function(groupName){
    var group = groupPositions(groupName,rounds);
    if (group[0] === teamA) {
      teamAPosition = 1 + groupName.toLowerCase();
    }
    if(group[0] === teamB){
      teamBPosition = 1 + groupName.toLowerCase();
    }
    if(group[1] === teamA){
      teamAPosition = 2 + groupName.toLowerCase();
    }
    if(group[1] === teamB){
      teamBPosition = 2 + groupName.toLowerCase();
    }
  });
  var matchName;
  if (defaultRounds[16][teamAPosition + '-' + teamBPosition]) {
    matchName = teamAPosition + '-' + teamBPosition;
  } else if(defaultRounds[16][teamBPosition + '-' + teamAPosition]) {
    matchName = teamBPosition + '-' + teamAPosition;
  }
  return { teamA : teamAPosition, teamB : teamBPosition, name : matchName };
};

// var round8MatchInfo = function(teamA,teamB,rounds){
//   console.log('round 8 teams: ',teamA,teamB);
//   var round16Match = round16MatchInfo(teamA,teamB,rounds);
//   var matchInfo = rounds[16][round16Match.name];
//   var teamA16 = matchInfo[round16Match.teamA];
//   var teamB16 = matchInfo[round16Match.teamB];
//   if(teamAInfo.score !== teamBInfo.score || teamAInfo.penalties !== teamBInfo.penalties){
//     // game has finished, find the winner
//     var winner;
//     if(teamA16.score > teamB16.score){
//       winner = teamA16;
//     } else if(teamA16.score < teamB16.score){
//       winner = teamB16;
//     } else if(teamA16.penalties > teamB16.penalties) {
//       winner = teamA16;
//     } else if(teamA16.penalties < teamB16.penalties){
//       winner = teamB16;
//     }
//     console.log(round16Match,winner);
//   } else {
//     // game not over yet.
//     return null;
//   }
// };

var updateRounds = function(num,rounds,teamA,teamB,match,matchInfo){
  if(matchInfo){
    rounds[num] = rounds[num] || {};
    rounds[num][matchInfo.name] = rounds[num][matchInfo.name] || {};
    rounds[num][matchInfo.name][matchInfo.teamA] = rounds[num][matchInfo.name][matchInfo.teamA] || {};
    rounds[num][matchInfo.name][matchInfo.teamA].team = teamA;
    rounds[num][matchInfo.name][matchInfo.teamA].score = match.awayScore;
    rounds[num][matchInfo.name][matchInfo.teamB] = rounds[num][matchInfo.name][matchInfo.teamB] || {};
    rounds[num][matchInfo.name][matchInfo.teamB].team = teamB;
    rounds[num][matchInfo.name][matchInfo.teamB].score = match.homeScore;
    console.log('updating: ',rounds[num][matchInfo.name]);
  }
  return rounds;
};

var updateScores = function(cb){
  if(cli){ console.log('updating...'); }
  request('http://worldcup.kimonolabs.com/api/matches?apikey=bda7915d7e614641230a2e1ad896985c',function(err,res,body){
    try {
      var matches = JSON.parse(body);
    } catch (e) {
      err = e;
    }
    if (err) {
      console.log('error:',err);
    } else {
      Rounds.findOne({master : true},function(err,rounds){
        matches.forEach(function(match){
          var teamA = teamMap[match.awayTeamId];
          var teamB = teamMap[match.homeTeamId];
          if(match.status !== 'Pre-game' && match.group){
            (rounds[32][match.group][teamA + '-' + teamB] || rounds[32][match.group][teamB + '-' + teamA])[teamA] = match.awayScore;
            (rounds[32][match.group][teamA + '-' + teamB] || rounds[32][match.group][teamB + '-' + teamA])[teamB] = match.homeScore;
          } else {
            var round16Info = round16MatchInfo(teamA,teamB,rounds.toObject());
            rounds = updateRounds(16,rounds,teamA,teamB,match,round16Info);
            // rounds = updateRounds(8,rounds,teamA,teamB,match,round8MatchInfo(teamA,teamB,rounds.toObject()));
          }
        });
        // console.log(rounds);
        rounds.save(function(err){
          if(cli){
            console.log('updated.');
          } else if(cb) {
            cb(err);
          }
        });
      });
    }
  });
};

if(require.main === module) {
  updateScores();
} else {
  module.exports = updateScores;
}
