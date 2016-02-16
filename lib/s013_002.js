var db = require('./persistence') ;
var connection = db.connection ;

exports.init = function(socket,sockets,callback) {
  connection.query("SELECT reponse,id_groupe,commentaire FROM reponses WHERE sequence ='013' AND phase='001'" ,function(err,rows,fields) {
  if (err) throw err;   
  console.log(rows);
  callback(null, { 
      groupe: {
        seq:"013",
        phas:"001",
        template: "regarde_diffuseur.ejs",
        data: "regarde_diffuseur.json",
        cible:"container"
      },
       moderateur: {
        template: "reponses_allume.ejs",
        data: "proposition_ruche13.json",
        cible:"container",
        bdd:rows
      },
      animateur: {
        template: "reponses_allume.ejs",
        data: "proposition_ruche13.json",
        cible:"container",
        bdd:rows
      },
      diffuseur: {
        template: "reponses_allume_diffuseur.ejs",
        data: "proposition_ruche13.json",
        cible:"container",
        bdd:rows
      }
  })
 })
}
exports.storeResponse = function(socket,sockets,data) {

  var commentaire = connection.escape(data.commentaire) ;
       
        var query = "SELECT id FROM reponses WHERE sequence ='" + data.seq + "' AND phase ='"+data.phas + "' AND id_groupe=" + data.idgrp ;
          connection.query(query,  function(err,rows2,fields) {
            if (err) throw err;
          if ( rows2.length == 0 )
            connection.query("INSERT INTO reponses VALUES ( '','" + data.seq + "','"+ data.phas+"',"+data.idgrp+",'"+data.reponse+"', "+commentaire+" )", function(err) { if (err) throw err; });
          else 
            connection.query("UPDATE reponses set reponse='"+data.reponse+"' , commentaire = "+commentaire+" WHERE id = "+rows2[0].id, function(err) { if (err) throw err; });
            })
}


