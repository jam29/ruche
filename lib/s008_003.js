var db = require('./persistence');
var connection = db.connection;

exports.init = function(socket,sockets,callback) {

  connection.query("SELECT id_groupe,reponse,commentaire FROM reponses WHERE sequence='008' AND phase='001' ",function(err,rows,fields) {
  if (err) throw err; 

  callback(null, {
      groupe: {
        template: "regarde_diffuseur.ejs",
        data: "regarde_diffuseur_slider.json",
        cible:"container",
      },
       moderateur: {
        template: "affiche_reponse_slider8.ejs",
        data: "slider8.json",
        cible:"container" ,
        bdd:rows
      },
      animateur: {
        template: "affiche_reponse_slider8.ejs",
        data: "slider8.json",
        cible:"container" ,
        bdd:rows
      },
      diffuseur: {
       template: "affiche_reponse_slider8_diffuseur.ejs",
        data: "slider8.json",
        cible:"container" ,
        bdd:rows
      }
   })
 })
}



