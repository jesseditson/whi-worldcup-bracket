'use strict';

var updateScores = require('../../scoreUpdater');
var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Rounds = mongoose.model('Rounds');

exports.getUser = function(req, res) {
  if(req.query.username === 'all'){
    return User.find({},function (err, users) {
      if (!err) {
        return res.json(users);
      } else {
        return res.send(err);
      }
    });
  } else {
    return User.findOne({username:req.query.username},function (err, user) {
      if (!err) {
        return res.json(user);
      } else {
        return res.send(err);
      }
    });
  }
};

exports.reloadStandings = function(req,res){
  updateScores(function(err){
    if (!err) {
      return res.json({ok : true});
    } else {
      return res.send(500,err);
    }
  });
};

exports.newUser = function(req,res){
  if (!req.body || !req.body.username) {
    return res.send(406,'username is required');
  }
  return User.create(req.body,function(err){
    if (!err) {
      return res.json({'username' : req.body.username});
    } else {
      return res.send(406,err);
    }
  });
};

exports.updateUser = function(req,res){
  if (!req.body || !req.body.username) {
    return res.send(406,'username is required');
  }
  delete req.body._id;
  return User.update({username : req.body.username},req.body,function(err,user){
    if (!err) {
      return res.json(user);
    } else {
      return res.send(406,err);
    }
  });
};

exports.rounds = function(req,res){
  return Rounds.findOne({master : true},function(err,rounds){
    console.log(err,rounds);
    if(!err){
      return res.json(rounds);
    } else {
      return res.send(err);
    }
  });
};
