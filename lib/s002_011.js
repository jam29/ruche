var db = require('./persistence');
var connection = db.connection;


exports.init = function(socket,sockets,callback) {
  connection.query("SELECT mot AS text, poids AS weight FROM nuage WHERE phase = 3 AND poids > 0 ",function(err,rows,fields) { 
  if (err) throw err; 
  callback(null, { timeout: 1500,
      groupe: {
       template: "regarde_diffuseur.ejs",
        data: "regarde_diffuseur3.json",
        cible:"container"
      },
       moderateur: {
        template: "affiche_nuage.ejs",
        data: "affiche_nuage3.json",
        cible:"fonction" ,
        bdd:rows
      },
      animateur: {
       template: "regarde_diffuseur.ejs",
        data: "regarde_diffuseur3.json",
        cible:"container"
      },
      diffuseur: {
        template: "affiche_nuage.ejs",
        data: "affiche_nuage3.json",
        cible:"fonction" ,
        bdd:rows
      }
  })
 })
}

exports.storeResponse = function(socket,sockets,data) {
  // moderateur emet une reponse.
    connection.escape(data.mot);
    connection.query("INSERT INTO nuage VALUES ( '','" + data.mot + "',1 )",function(err,rows,fields) { if (err) throw err; } ) ;
  }
