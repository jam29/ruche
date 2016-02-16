var db = require('./persistence');
var connection = db.connection;

exports.init = function(socket,sockets,callback) {
    
 callback(null, { 
      groupe: {
        template: "questions_classement1.ejs",
        data: "questions_classement_1.json",
        cible:"container"
      },
       moderateur: {
        template: "questions_classement1.ejs",
        data: "questions_classement_1.json",
        cible:"container"
      },
      animateur: {
        template: "affichage_proposition_ruche.ejs",
        data: "proposition_ruche1.json",
        cible:"container"
      },
      diffuseur: {
        template: "questions_classement1.ejs",
        data: "questions_classement_1.json",
        cible:"container"
      }
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


