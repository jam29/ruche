
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
        template: "affichage_proposition_ruche.ejs",
        data: "proposition_ruche9.json",
        cible:"container"
      },
      diffuseur: {
        template: "banner.ejs",
        data: "banner.json",
        cible:"container"
      }
  })
}
