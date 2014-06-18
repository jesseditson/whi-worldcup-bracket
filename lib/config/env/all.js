'use strict';

var path = require('path');

var rootPath = path.normalize(__dirname + '/../../..');

module.exports = {
  root: rootPath,
  port: process.env.PORT || 9000,
  espn: {
    key: 'kz9tv97qftt7x39eb5s4suzm',
    secret: 'rYxsMxW8sB4etQwqWTnDQ5qs'
  },
  mongo: {
    uri : 'mongodb://worldcup:pinkheart@kahana.mongohq.com:10067/whi_worldcup',
    options: {
      db: {
        safe: true
      }
    }
  }
};
