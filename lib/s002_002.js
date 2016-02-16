var db = require('./persistence');
var connection = db.connection;

exports.init = function(socket,sockets,callback) {
  connection.query("SELECT id,id_groupe,mot,poids,ts FROM nuage WHERE phase=1 order by mot",function(err,rows,fields) { 
    if (err) throw err; 
    callback(null, { 
      groupe: {
        template: "saisie_nuage.ejs",
        data: "saisie_nuage1.json",
        cible:"container"
      },
       moderateur: {
        template: "collecte_nuage.ejs",
        data: "collecte_nuage1.json",
        cible: "container",
        bdd:rows
      },
      animateur: {
        template: null,
        data: null,
        cible: null
      },
      diffuseur: {
        template: "mode_emploi.ejs",
        data: "mode_emploi_nuage1.json",
        cible:"container"
      }
    })
  })
}

exports.storeResponse = function(socket,sockets,data) {

  if (data.typerep == "drop") {
  // cas d'un retour moderateur 
  connection.query("UPDATE nuage SET poids = " + data.dragpoids + " WHERE id = "+data.dragid, function(err,rows,fields) { 
      if (err) { 
        socket.emit('confirm',{message:'pb en écriture dragpoids'});
        throw err; 
        }
  }) ;
    
  connection.query("UPDATE nuage SET poids = " + data.droppoids + " WHERE id = "+data.dropid, function(err,rows,fields) { 
      if (err) { 
        socket.emit('confirm',{message:'pb en écriture droppoids'});
        throw err; 
        }
  }) ;

  } else if( data.typerep == "majmot" ) {
      var mot = connection.escape(data.value);
      connection.query("UPDATE nuage SET mot = " + mot + " WHERE id = "+data.id, function(err,rows,fields) { 
      if (err) {   socket.emit('confirm',{message:'pb en écriture mot'}); throw err; }
      })
  } else {

//---- sinon groupe  
    var mot = (data.mot).trim().toUpperCase() ;
    var mot = connection.escape(mot);
  
    connection.query("SELECT id,mot,poids FROM nuage WHERE phase = 1 AND mot =" + mot +" LIMIT 1", function(err,rows,fields) {
    console.log(rows);
	if (rows.length == 0 ) {
    		connection.query("INSERT INTO nuage VALUES ( '', "+ data.idgrp +"," + mot + ",1 ,1,CURRENT_TIMESTAMP )", function(err) { 
      			if (err) { throw err; }
        		socket.emit('message',{ message: 'votre mot est cree'} );
        		
    		}) ;
         } else {
                var query = "UPDATE nuage SET poids="+ ( rows[0].poids + 1) +", ts=CURRENT_TIMESTAMP WHERE id="+rows[0].id ;
          	connection.query(query,function(err) { if (err) throw err ; 
		 socket.emit('message',{ message: 'votre mot est modifié'} ); 
		})      
	 }
sockets.in('moderateurs').emit('collecte:mot',{ mot:mot });
    }) // query select from nuages

//-----

  } // else
} // fonction storeResponse


