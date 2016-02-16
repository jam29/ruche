var db = require('./persistence');
var connection = db.connection;

exports.init = function(socket,sockets,callback) {
    
 callback(null, { 
      groupe: {
        seq:'008',
        phas:'001',
        template: "slider1.ejs",
        data: "slider8.json",
        cible:"container"
      },
       moderateur: {
        template: "slider1.ejs",
        data: "slider8.json",
        cible:"container"
      },
      animateur: {
        template: "affichage_proposition_ruche.ejs",
        data: "proposition_ruche8.json",
        cible:"container"
      },
      diffuseur: {
        template: "slider1.ejs",
        data: "slider8.json",
        cible:"container"
      }
  })
}



