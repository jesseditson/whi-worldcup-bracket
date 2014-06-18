'use strict';

var teams = {
  'bra' : {
    'name' : 'Brazil',
    'image' : 'http://cache.images.globalsportsmedia.com/soccer/teams/150x150/349.png'
  },
  'cro' : {
    'name' : 'Croatia',
    'image' : 'http://cache.images.globalsportsmedia.com/soccer/teams/150x150/514.png'
  },
  'mex' : {
    'name' : 'Mexico',
    'image' : 'http://cache.images.globalsportsmedia.com/soccer/teams/150x150/1497.png'
  },
  'cam' : {
    'name' : 'Cameroon',
    'image' : 'http://cache.images.globalsportsmedia.com/soccer/teams/150x150/386.png'
  },
  'spa' : {
    'name' : 'Spain',
    'image' : 'http://cache.images.globalsportsmedia.com/soccer/teams/150x150/2137.png'
  },
  'ned' : {
    'name' : 'Netherlands',
    'image' : 'http://cache.images.globalsportsmedia.com/soccer/teams/150x150/1552.png'
  },
  'chi' : {
    'name' : 'Chile',
    'image' : 'http://cache.images.globalsportsmedia.com/soccer/teams/150x150/424.png'
  },
  'aus' : {
    'name' : 'Australia',
    'image' : 'http://cache.images.globalsportsmedia.com/soccer/teams/150x150/156.png'
  },
  'col' : {
    'name' : 'Colombia',
    'image' : 'http://cache.images.globalsportsmedia.com/soccer/teams/150x150/473.png'
  },
  'gre' : {
    'name' : 'Greece',
    'image' : 'http://cache.images.globalsportsmedia.com/soccer/teams/150x150/1091.png'
  },
  'cot' : {
    'name' : 'Cote d\'Ivoire',
    'image' : 'http://cache.images.globalsportsmedia.com/soccer/teams/150x150/598.png'
  },
  'jap' : {
    'name' : 'Japan',
    'image' : 'http://cache.images.globalsportsmedia.com/soccer/teams/150x150/1348.png'
  },
  'uru' : {
    'name' : 'Uruguay',
    'image' : 'http://cache.images.globalsportsmedia.com/soccer/teams/150x150/2300.png'
  },
  'cos' : {
    'name' : 'Costa Rica',
    'image' : 'http://cache.images.globalsportsmedia.com/soccer/teams/150x150/477.png'
  },
  'eng' : {
    'name' : 'England',
    'image' : 'http://cache.images.globalsportsmedia.com/soccer/teams/150x150/774.png'
  },
  'ita' : {
    'name' : 'Italy',
    'image' : 'http://cache.images.globalsportsmedia.com/soccer/teams/150x150/1318.png'
  },
  'swi' : {
    'name' : 'Switzerland',
    'image' : 'http://cache.images.globalsportsmedia.com/soccer/teams/150x150/2201.png'
  },
  'ecu' : {
    'name' : 'Ecuador',
    'image' : 'http://cache.images.globalsportsmedia.com/soccer/teams/150x150/657.png'
  },
  'fra' : {
    'name' : 'France',
    'image' : 'http://cache.images.globalsportsmedia.com/soccer/teams/150x150/944.png'
  },
  'hon' : {
    'name' : 'Honduras',
    'image' : 'http://cache.images.globalsportsmedia.com/soccer/teams/150x150/1099.png'
  },
  'arg' : {
    'name' : 'Argentina',
    'image' : 'http://cache.images.globalsportsmedia.com/soccer/teams/150x150/132.png'
  },
  'bos' : {
    'name' : 'Bosnia-Herzegovina',
    'image' : 'http://cache.images.globalsportsmedia.com/soccer/teams/150x150/299.png'
  },
  'ger' : {
    'name' : 'Germany',
    'image' : 'http://cache.images.globalsportsmedia.com/soccer/teams/150x150/1037.png'
  },
  'por' : {
    'name' : 'Portugal',
    'image' : 'http://cache.images.globalsportsmedia.com/soccer/teams/150x150/1772.png'
  },
  'ira' : {
    'name' : 'Iran',
    'image' : 'http://cache.images.globalsportsmedia.com/soccer/teams/150x150/1178.png'
  },
  'nig' : {
    'name' : 'Nigeria',
    'image' : 'http://cache.images.globalsportsmedia.com/soccer/teams/150x150/1567.png'
  },
  'gha' : {
    'name' : 'Ghana',
    'image' : 'http://cache.images.globalsportsmedia.com/soccer/teams/150x150/1038.png'
  },
  'usa' : {
    'name' : 'USA',
    'image' : 'http://cache.images.globalsportsmedia.com/soccer/teams/150x150/2281.png'
  },
  'bel' : {
    'name' : 'Belgium',
    'image' : 'http://cache.images.globalsportsmedia.com/soccer/teams/150x150/281.png'
  },
  'alg' : {
    'name' : 'Algeria',
    'image' : 'http://cache.images.globalsportsmedia.com/soccer/teams/150x150/78.png'
  },
  'rus' : {
    'name' : 'Russia',
    'image' : 'http://cache.images.globalsportsmedia.com/soccer/teams/150x150/1878.png'
  },
  'kor' : {
    'name' : 'Korea',
    'image' : 'http://cache.images.globalsportsmedia.com/soccer/teams/150x150/1385.png'
  }
};

angular.module('worldCupStandingsApp')
  .service('Rounds', function Rounds() {
    return {
      'teams' : teams,
      'rounds' : {
        32: {
          'A' : {
            'bra-cro' : ['bra','cro'],
            'mex-cam' : ['mex','cam'],
            'bra-mex' : ['bra','mex'],
            'cam-cro' : ['cam','cro'],
            'cam-bra' : ['cam','bra'],
            'cro-mex' : ['cro','mex']
          },
          'B' : {
            'spa-ned' : ['spa','ned'],
            'chi-aus' : ['chi','aus'],
            'aus-ned' : ['aus','ned'],
            'spa-chi' : ['spa','chi'],
            'aus-spa' : ['aus','spa'],
            'ned-chi' : ['ned','chi']
          },
          'C' : {
            'col-gre' : ['col','gre'],
            'cot-jap' : ['cot','jap'],
            'col-cot' : ['col','cot'],
            'jap-gre' : ['jap','gre'],
            'jap-col' : ['jap','col'],
            'gre-cot' : ['gre','cot']
          },
          'D' : {
            'uru-cos' : ['uru','cos'],
            'eng-ita' : ['eng','ita'],
            'uru-eng' : ['uru','eng'],
            'ita-cos' : ['ita','cos'],
            'ita-uru' : ['ita','uru'],
            'cos-eng' : ['cos','eng']
          },
          'E' : {
            'swi-ecu' : ['swi','ecu'],
            'fra-hon' : ['fra','hon'],
            'swi-fra' : ['swi','fra'],
            'hon-ecu' : ['hon','ecu'],
            'hon-swi' : ['hon','swi'],
            'ecu-fra' : ['ecu','fra']
          },
          'F' : {
            'arg-bos' : ['arg','bos'],
            'ira-nig' : ['ira','nig'],
            'arg-ira' : ['arg','ira'],
            'nig-bos' : ['nig','bos'],
            'nig-arg' : ['nig','arg'],
            'bos-ira' : ['bos','ira']
          },
          'G' : {
            'ger-por' : ['ger','por'],
            'gha-usa' : ['gha','usa'],
            'usa-por' : ['usa','por'],
            'ger-gha' : ['ger','gha'],
            'usa-ger' : ['usa','ger'],
            'por-gha' : ['por','gha']
          },
          'H' : {
            'bel-alg' : ['bel','alg'],
            'rus-kor' : ['rus','kor'],
            'kor-alg' : ['kor','alg'],
            'bel-rus' : ['bel','rus'],
            'kor-bel' : ['kor','bel'],
            'alg-rus' : ['alg','rus']
          }
        },
        16: {
          '1a-2b' : ['1a','2b'],
          '1c-2d' : ['1c','2d'],
          '1b-2a' : ['1b','2a'],
          '1d-2c' : ['1d','2c'],
          '1e-2f' : ['1e','2f'],
          '1g-2h' : ['1g','2h'],
          '1f-2e' : ['1f','2e'],
          '1h-2g' : ['1h','2g']
        },
        8: {
          '1a2b-1c2d' : ['1a2b','1c2d'],
          '1e2f-1g2h' : ['1e2f','1g2h'],
          '1b2a-1d2c' : ['1b2a','1d2c'],
          '1f2e-1h2g' : ['1f2e','1h2g']
        },
        4: {
          '1a2b1c2d-1e2f1g2h' : ['1a2b1c2d','1e2f1g2h'],
          '1b2a1d2c-1f2e1h2g' : ['1b2a1d2c','1f2e1h2g']
        },
        2: {
          '1a2b1c2d1e2f1g2h-1b2a1d2c1f2e1h2g' : ['1a2b1c2d1e2f1g2h','1b2a1d2c1f2e1h2g']
        }
      }
    };
  });

angular.module('worldCupStandingsApp')
  .filter('unabbreviate', function() {
    return function(string){
      if (teams[string]) {
        return teams[string].name;
      }
    };
  })
  .filter('teamImage',function(){
    return function(string){
      if(teams[string]){
        return teams[string].image;
      }
    };
  })
  .filter('prepad',function(){
    return function(string){
      var minWidth = 8;
      if(string && string.length < minWidth){
        var len = minWidth-string.length;
        for(var i=0;i<len;i++){
          string = '&nbsp;' + string;
        }
      }
      return string;
    };
  })
  .factory('Rounds', ['$resource', function ($resource) {
    return $resource('/api/rounds', {}, {
      master: {
        method: 'GET',
        params: {}
      }
    });
  }]);
