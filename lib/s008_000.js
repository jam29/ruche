
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
        seq:'003',
        phas:'001',
        template: "affichage_proposition_ruche.ejs",
        data: "proposition_ruche8.json",
        cible:"container"
      },
      diffuseur: {
        template: "banner.ejs",
        data: "banner.json",
        cible:"container"
      }
  })
}
