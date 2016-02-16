var db = require('./persistence');
var connection = db.connection;

exports.init = function(socket,sockets,callback) {
  connection.query("SELECT * FROM mail WHERE ruche=12 ORDER BY date",function(err,rows,fields) { 

    callback(null, { 
      groupe: {
        template: "question_salle.ejs",
        data: "question12.json",
        cible:"container"
      },
       moderateur: {
        template: "collecte_questions.ejs",
        data: "question12.json",
        cible: "container",
        bdd:rows
      },
      animateur: {
        template: "collecte_questions.ejs",
        data: "question12.json",
        cible: "container",
        bdd:rows
      },
      diffuseur: {
        template: "mode_emploi.ejs",
        data: "mode_emploi_ruche12.json",
        cible:"container"
      }
    })
  })
}

exports.storeResponse = function(socket,sockets,data) {

 if ( data.question ) {
   var question = connection.escape(data.question);
   connection.query("INSERT INTO  mail VALUES ('',"+data.idgrp+",NOW(),12,'ruche auvergne1bis : groupe "+data.idgrp+"',"+question+","+question+",0,0,0)", function (err) { if (err) throw err })
 }

 if ( data.type == "moderateur" ) {
               var query = "SELECT corps_ig FROM mail WHERE id = "+data.id ;
               connection.query(query,function(err,rows,fields) {
                 sockets.in('animateurs').emit("animateur:message",{ message:rows[0].corps_ig });
               })
 }

 if ( data.type == "majsms" ) {
               var mess = connection.escape(data.message);
               var query = "UPDATE mail SET corps_ig ="+ mess + " WHERE id ="+ data.id ;
               connection.query(query);
 }

} // fonction storeResponse
