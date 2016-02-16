var db = require('./persistence') ;
var connection = db.connection ;

exports.init = function(socket,sockets,callback) {
  connection.query("SELECT * FROM notes", function(err,rows,fields) {
  if (err) throw err;   

  callback(null, { 
      groupe: {
        template: "regarde_diffuseur.ejs",
        data: "regarde_diffuseur15.json",
        cible:"container"
      },
       moderateur: {
        template: "collecte_notes.ejs",
        data: "note.json",
        cible:"container",
        bdd:rows
      },
      animateur: {
        template: "collecte_notes.ejs",
        data: "note.json",
        cible:"container",
        bdd:rows
      },
      diffuseur: {
        template: "collecte_notes.ejs",
        data: "note.json",
        cible:"container",
        bdd:rows
      }
  })
 })
}

exports.storeResponse = function(socket,sockets,data) {
      connection.query("INSERT INTO notes VALUES ( '',"+data.idgrp+","+data.note+")", function(err) { if (err) throw err; } );
}
