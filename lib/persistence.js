var mysql      = require('mysql');
var conf       = require('../config');
var connection = mysql.createConnection({
  host     : conf.dbhost,
  user     : conf.dbuser,
  password : conf.dbpassword,
  database : conf.dbname
});

exports.connection = connection;
