var db = require('./persistence');
var connection = db.connection;

exports.init = function(socket,sockets,callback) {
    
 callback(null, { 
      groupe: {
        seq:'003',
        phas:'001',
        template: "slider1.ejs",
        data: "slider1.json",
        cible:"container"
      },
       moderateur: {
        template: "slider1.ejs",
        data: "slider1.json",
        cible:"container"
      },
      animateur: {
        template: null ,
        data: null ,
        cible:null
      },
      diffuseur: {
        template: "slider1.ejs",
        data: "slider1.json",
        cible:"container"
      }
  })
}

exports.storeResponse = function(socket,sockets,data) {

   //var commentaire = connection.escape(data.commentaire) ;
   var reps = JSON.stringify(data.reponse);
   
   var query = "SELECT id FROM reponses WHERE sequence ='" + data.seq + "' AND phase ='"+data.phas + "' AND id_groupe=" + data.idgrp ;
      connection.query(query,  function(err,rows2,fields) {
          if (err) throw err;
          if ( rows2.length == 0 )
            connection.query("INSERT INTO reponses VALUES ( '','" + data.seq + "','"+ data.phas+"',"+data.idgrp+",'"+reps+"' , '')", function(err) { if (err) throw err; });
          else 
            connection.query("UPDATE reponses set reponse='"+reps+"' WHERE id = "+rows2[0].id, function(err) { if (err) throw err; });
            })
}


