var db = require('./persistence');
var connection = db.connection;


exports.init = function(socket,sockets,callback) {
  connection.query("SELECT mot AS text, poids AS weight FROM nuage WHERE phase = 1 AND poids > 0 ",function(err,rows,fields) { 
  if (err) throw err; 
  callback(null, { 
      groupe: {
        template: "regarde_diffuseur.ejs",
        data: "regarde_diffuseur1.json",
        cible:"container",
      },
       moderateur: {
        template: "affiche_nuage.ejs",
        data: "affiche_nuage1.json",
        cible:"fonction" ,
        bdd:rows
      },
      animateur: {
        template: "regarde_diffuseur.ejs",
        data: "regarde_diffuseur1.json",
        cible:"container"
      },
      diffuseur: {
        template: "affiche_nuage.ejs",
        data: "affiche_nuage1.json",
        cible:"fonction" ,
        bdd:rows
      }
   })
 })
}


