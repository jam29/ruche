var conf = require('../config');
var db = require('../lib/persistence');
var connection = db.connection;

exports.index = function(req, res){
  res.render('index', { title:'installation', url_static_root: conf.url_static_root, url_nodejs_root: conf.url_nodejs_root, url_nodejs: conf.url_nodejs_root.slice(1), web_server_url: conf.web_server_url });
};

exports.conducteur = function(req, res){
//  connection.connect();
  connection.query('SELECT * FROM conducteur ORDER BY timecode_prevu', function(err, rows, fields) {
  if (err) throw err;
     res.render('conducteur', {top:rows, url_static_root: conf.url_static_root, url_nodejs_root: conf.url_nodejs_root, url_nodejs: conf.url_nodejs_root.slice(1), web_server_url: conf.web_server_url});
  });
//  connection.end();
};

exports.groupe = function(req, res){
  res.render('groupe', { url_static_root: conf.url_static_root, url_nodejs_root: conf.url_nodejs_root, url_nodejs: conf.url_nodejs_root.slice(1), web_server_url: conf.web_server_url , idgrp:req.cookies.id_groupe });
};

exports.moderateur = function(req, res){
  res.render('moderateur', { url_static_root: conf.url_static_root, url_nodejs_root: conf.url_nodejs_root, url_nodejs: conf.url_nodejs_root.slice(1), web_server_url: conf.web_server_url });
};

exports.animateur = function(req, res){
  res.render('animateur', { url_static_root: conf.url_static_root, url_nodejs_root: conf.url_nodejs_root, url_nodejs: conf.url_nodejs_root.slice(1), web_server_url: conf.web_server_url });
};

exports.diffuseur = function(req, res){
  res.render('diffuseur', { url_static_root: conf.url_static_root, url_nodejs_root: conf.url_nodejs_root, url_nodejs: conf.url_nodejs_root.slice(1), web_server_url: conf.web_server_url });
};
