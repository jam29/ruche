var db = require('./persistence') ;
var connection = db.connection ;

exports.init = function(socket,sockets,callback) {
    callback(null, { 
      groupe: {
        template: "banner.ejs",
        data: "banner.json",
        cible:"container"
      },
       moderateur: {
        template: "banner.ejs",
        data: "banner.json",
        cible:"container"
      },
      animateur: {
        template: "annonce_saisie_nuage.ejs",
        data: "saisie_nuage2.json",
        cible:"container"
      },
      diffuseur: {
        template: "annonce_saisie_nuage.ejs",
        data: "saisie_nuage2.json",
        cible:"container"
      }
    })
}

