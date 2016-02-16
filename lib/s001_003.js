var db = require('./persistence') ;
var connection = db.connection ;

exports.init = function(socket,sockets,callback) {
  connection.query("SELECT reponse,id_groupe,commentaire FROM reponses WHERE sequence ='001' AND phase='001'" ,function(err,rows,fields) {
  if (err) throw err;   

  callback(null, { 
      groupe: {
        template: "regarde_diffuseur.ejs",
        data: "regarde_diffuseur_sortable1.json",
        cible:"container",
      },
       moderateur: {
        template: "affiche_reponse.ejs",
        data: "questions_classement_1.json",
        cible:"container" ,
        bdd:rows
      },
      animateur: {
        template: "affiche_reponse_diffuseur.ejs",
        data: "questions_classement_1.json",
        cible:"container" ,
        bdd:rows
      },
      diffuseur: {
        template: "affiche_reponse_diffuseur.ejs",
        data: "questions_classement_1.json",
        cible:"container" ,
        bdd:rows
      }
   })
 })
}

