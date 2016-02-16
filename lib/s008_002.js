var db = require('./persistence');
var connection = db.connection;

exports.init = function(socket,sockets,callback) {
  connection.query("SELECT sequence,phase,id_groupe,reponse,commentaire FROM reponses WHERE sequence='008' AND phase='001' ",function(err,rows,fields) {
  if (err) throw err; 
  callback(null, {
      groupe: {
        seq:'008',
        phas:'001',
        echelle:6,
        template: "slider.ejs",
        data: "slider8.json",
        cible:"container",
        bdd:rows
      },
       moderateur: {
        template: "affiche_reponse_slider8.ejs",
        data: "slider8.json",
        cible:"container",
        bdd:rows
      },
      animateur: {
        template: "mode_emploi.ejs",
        data: "mode_emploi_slider8.json",
        cible: "container"
      },
      diffuseur: {
        template: "mode_emploi.ejs",
        data: "mode_emploi_slider8.json",
        cible: "container"
      }
  })
 })
}

exports.storeResponse = function(socket,sockets,data) {
   var commentaire = connection.escape(data.commentaire) ;
   var reps = JSON.stringify(data.reponse);

        var query = "SELECT id FROM reponses WHERE sequence ='" + data.seq + "' AND phase ='"+data.phas + "' AND id_groupe=" + data.idgrp ;
           connection.query(query,  function(err,rows2,fields) {
           if (err) throw err;
           if ( rows2.length == 0 )
             connection.query("INSERT INTO reponses VALUES ( '','" + data.seq + "','"+ data.phas+"',"+data.idgrp+",'"+reps+"' , "+commentaire+")", function(err) { if (err) throw err; });
           else if ( data.type != "new") {
             connection.query("UPDATE reponses set reponse='"+reps+"',commentaire="+commentaire+" WHERE id = "+rows2[0].id, function(err) { if (err) throw err; });
             socket.emit('message',{ message:'Vos évaluations sont enregistrées '+data.idgrp } );
	   } // fin elseif
          process.emit('moderateur:refresh');
          })

	
}
