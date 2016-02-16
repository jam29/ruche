var db = require('./persistence');
var connection = db.connection;

exports.initDeviceGroupe = function(callback) {
        connection.query("SELECT id FROM groupe WHERE ip = '' LIMIT 1 ",function(err,rows,fields) { 
          connection.query("UPDATE groupe SET ip = 'occuped' WHERE id = "+rows[0].id, function(err) { } ) 
            callback(null,{ idgrp:rows[0].id } ) ;
        })
}

exports.searchGrp = function(id,callback) {
  connection.query("SELECT id,nom FROM groupe WHERE id ="+id , function(err,rows,fields){ 
     callback(null,{idgrp:rows[0].id, nomgrp:rows[0].nom}) ;
  })
}
