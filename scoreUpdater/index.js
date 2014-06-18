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

var cli = require.main === module;

var updateScores = function(cb){
  if(cli){ console.log('updating...'); }
  request('http://worldcup.kimonolabs.com/api/matches?apikey=bda7915d7e614641230a2e1ad896985c',function(err,res,body){
    if (err) {
      console.log('error:',err);
    } else {
      Rounds.findOne({master : true},function(err,rounds){
        var matches = JSON.parse(body);
        matches.forEach(function(match){
          var teamA = teamMap[match.awayTeamId];
          var teamB = teamMap[match.homeTeamId];
          console.log('home',teamB,'away',teamB,match);
          if(match.status !== 'Pre-game'){
            (rounds[32][match.group][teamA + '-' + teamB] || rounds[32][match.group][teamB + '-' + teamA])[teamA] = match.awayScore;
            (rounds[32][match.group][teamA + '-' + teamB] || rounds[32][match.group][teamB + '-' + teamA])[teamB] = match.homeScore;
          }
        });
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
