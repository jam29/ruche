var db = require('./persistence');
var connection = db.connection;

exports.init = function(socket,sockets,callback) {
    
 callback(null, { 
      groupe: {
        template: "questions_classement1.ejs",
        data: "questions_classement_9.json",
        cible:"container"
      },
       moderateur: {
        template: "questions_classement1.ejs",
        data: "questions_classement_9.json",
        cible:"container"
      },
      animateur: {
        template: "affichage_proposition_ruche.ejs",
        data: "proposition_ruche9.json",
        cible:"container"
      },
      diffuseur: {
        template: "questions_classement1.ejs",
        data: "questions_classement_9.json",
        cible:"container"
      }
  })
}

