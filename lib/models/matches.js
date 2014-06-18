'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Rounds Schema
 */
var RoundsSchema = new Schema({
  master : Boolean,
  32: {
    'A' : {
      'bra-cro' : {
        'bra' : Number,
        'cro' : Number
      },
      'mex-cam' : {
        'mex' : Number,
        'cam' : Number
      },
      'bra-mex' : {
        'bra' : Number,
        'mex' : Number
      },
      'cam-cro' : {
        'cam' : Number,
        'cro' : Number
      },
      'cam-bra' : {
        'cam' : Number,
        'bra' : Number
      },
      'cro-mex' : {
        'cro' : Number,
        'mex' : Number
      }
    },
    'B' : {
      'spa-ned' : {
        'spa' : Number,
        'ned' : Number
      },
      'chi-aus' : {
        'chi' : Number,
        'aus' : Number
      },
      'aus-ned' : {
        'aus' : Number,
        'ned' : Number
      },
      'spa-chi' : {
        'spa' : Number,
        'chi' : Number
      },
      'aus-spa' : {
        'aus' : Number,
        'spa' : Number
      },
      'ned-chi' : {
        'ned' : Number,
        'chi' : Number
      }
    },
    'C' : {
      'col-gre' : {
        'col' : Number,
        'gre' : Number
      },
      'cot-jap' : {
        'cot' : Number,
        'jap' : Number
      },
      'col-cot' : {
        'col' : Number,
        'cot' : Number
      },
      'jap-gre' : {
        'jap' : Number,
        'gre' : Number
      },
      'jap-col' : {
        'jap' : Number,
        'col' : Number
      },
      'gre-cot' : {
        'gre' : Number,
        'cot' : Number
      }
    },
    'D' : {
      'uru-cos' : {
        'uru' : Number,
        'cos' : Number
      },
      'eng-ita' : {
        'eng' : Number,
        'ita' : Number
      },
      'uru-eng' : {
        'uru' : Number,
        'eng' : Number
      },
      'ita-cos' : {
        'ita' : Number,
        'cos' : Number
      },
      'ita-uru' : {
        'ita' : Number,
        'uru' : Number
      },
      'cos-eng' : {
        'cos' : Number,
        'eng' : Number
      }
    },
    'E' : {
      'swi-ecu' : {
        'swi' : Number,
        'ecu' : Number
      },
      'fra-hon' : {
        'fra' : Number,
        'hon' : Number
      },
      'swi-fra' : {
        'swi' : Number,
        'fra' : Number
      },
      'hon-ecu' : {
        'hon' : Number,
        'ecu' : Number
      },
      'hon-swi' : {
        'hon' : Number,
        'swi' : Number
      },
      'ecu-fra' : {
        'ecu' : Number,
        'fra' : Number
      }
    },
    'F' : {
      'arg-bos' : {
        'arg' : Number,
        'bos' : Number
      },
      'ira-nig' : {
        'ira' : Number,
        'nig' : Number
      },
      'arg-ira' : {
        'arg' : Number,
        'ira' : Number
      },
      'nig-bos' : {
        'nig' : Number,
        'bos' : Number
      },
      'nig-arg' : {
        'nig' : Number,
        'arg' : Number
      },
      'bos-ira' : {
        'bos' : Number,
        'ira' : Number
      }
    },
    'G' : {
      'ger-por' : {
        'ger' : Number,
        'por' : Number
      },
      'gha-usa' : {
        'gha' : Number,
        'usa' : Number
      },
      'usa-por' : {
        'usa' : Number,
        'por' : Number
      },
      'ger-gha' : {
        'ger' : Number,
        'gha' : Number
      },
      'usa-ger' : {
        'usa' : Number,
        'ger' : Number
      },
      'por-gha' : {
        'por' : Number,
        'gha' : Number
      }
    },
    'H' : {
      'bel-alg' : {
        'bel' : Number,
        'alg' : Number
      },
      'rus-kor' : {
        'rus' : Number,
        'kor' : Number
      },
      'kor-alg' : {
        'kor' : Number,
        'alg' : Number
      },
      'bel-rus' : {
        'bel' : Number,
        'rus' : Number
      },
      'kor-bel' : {
        'kor' : Number,
        'bel' : Number
      },
      'alg-rus' : {
        'alg' : Number,
        'rus' : Number
      }
    }
  },
  16: {
    '1a-2b' : {
      '1a' : Number,
      '2b' : Number
    },
    '1c-2d' : {
      '1c' : Number,
      '2d' : Number
    },
    '1b-2a' : {
      '1b' : Number,
      '2a' : Number
    },
    '1d-2c' : {
      '1d' : Number,
      '2c' : Number
    },
    '1e-2f' : {
      '1e' : Number,
      '2f' : Number
    },
    '1g-2h' : {
      '1g' : Number,
      '2h' : Number
    },
    '1f-2e' : {
      '1f' : Number,
      '2e' : Number
    },
    '1h-2g' : {
      '1h' : Number,
      '2g' : Number
    }
  },
  8: {
    '1a2b-1c2d' : {
      '1a2b' : Number,
      '1c2d' : Number
    },
    '1e2f-1g2h' : {
      '1e2f' : Number,
      '1g2h' : Number
    },
    '1b2a-1d2c' : {
      '1b2a' : Number,
      '1d2c' : Number
    },
    '1f2e-1h2g' : {
      '1f2e' : Number,
      '1h2g' : Number
    }
  },
  4: {
    '1a2b1c2d-1e2f1g2h' : {
      '1a2b1c2d' : Number,
      '1e2f1g2h' : Number
    },
    '1b2a1d2c-1f2e1h2g' : {
      '1b2a1d2c' : Number,
      '1f2e1h2g' : Number
    }
  },
  2: {
    '1a2b1c2d1e2f1g2h-1b2a1d2c1f2e1h2g' : {
      '1a2b1c2d1e2f1g2h' : Number,
      '1b2a1d2c1f2e1h2g' : Number
    }
  }
});

mongoose.model('Rounds', RoundsSchema);
