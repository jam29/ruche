var express = require('express')
  , routes  = require('./routes')
  , http    = require('http')
  , path    = require('path')
  , connect = require('express/node_modules/connect');

var db = require('./lib/persistence');
var connection = db.connection;

var conf = require('./config');

var sequences = require('./lib/sequences');
var configgrp = sequences['configgrp'] ;

var socket = require('socket.io');

var app     = express();
var server  = http.createServer(app);
var io      = socket.listen(server);

var nom_encours, data_encours ;

io.sockets.on('connection',function(socket) {

socket.on('groupe:connect',     function(groupes)     { socket.join(groupes) ;

        function sequence_groupe (nom, data) {
            if (data.groupe) socket.emit('groupe:template', {
              name:           nom,
              seq:data.groupe.seq,
              phas:data.groupe.phas,
              echelle:data.groupe.echelle,
              template:       data.groupe.template,
              template_data:  data.groupe.data,
              cible: data.groupe.cible,
              bdd:data.groupe.bdd,
            })
	 
            var sequenceGrp = sequences[nom];

            function onReponseGrp (data) {
              sockets = io.sockets ;
              sequenceGrp.storeResponse(socket, sockets, data)
            }
          
            socket.on('groupe:reponse', onReponseGrp) 

            socket.on('moderateur:refresh',function(){process.emit('moderateur:refresh')});

            process.once('fin_sequence', function () {
              socket.removeListener('groupe:reponse', onReponseGrp)
            })
         } // fin function sequence_groupe

        function onStartGrp (nom, data) { 
          sequence_groupe(nom, data)
        }
      
        process.on('sequence', onStartGrp) 

        socket.on('disconnect', function () { process.removeListener('sequence', onStartGrp ) })
        if (nom_encours) { sequence_groupe(nom_encours, data_encours)    }

} ); // fin socket on groupe connect

// moderateur

socket.on('moderateur:connect', function(moderateurs) { socket.join(moderateurs) ; 

          function sequence_moderateur (nom, data) {
            if (data.moderateur) socket.emit('moderateur:template', {
              name: nom,
              template: data.moderateur.template,
              template_data: data.moderateur.data,
              cible: data.moderateur.cible,
              bdd:data.moderateur.bdd
            })

            var sequenceMdr = sequences[nom];           

            function onReponseMdr (data) { 
              sockets = io.sockets ;
              sequenceMdr.storeResponse(socket, sockets, data)
            }
          
            socket.on('moderateur:reponse', onReponseMdr)

            process.once('fin_sequence', function () {
              socket.removeListener('moderateur:reponse', onReponseMdr)
            })
          } // fin sequence moderateur

          function onStartMdr (nom, data) { 
            sequence_moderateur(nom, data)
          }
        
          process.on('sequence', onStartMdr) 

          function Refresh(){
                  var nsequence = sequences[nom_encours] ;
                  nsequence.init(socket,sockets,function(err,newdata){
                      data_encours=newdata;
                      sequence_moderateur(nom_encours,newdata)
                  })
          }

          socket.on('moderateur:refresh',Refresh),
          process.on('moderateur:refresh',Refresh),

          socket.on('disconnect', function () { process.removeListener('sequence', onStartMdr) })


        if (nom_encours) { sequence_moderateur(nom_encours, data_encours)    }
} ) ;

socket.on('animateur:connect',  function(animateurs)  { socket.join(animateurs) ; 
          function sequence_animateur (nom, data) {
            if (data.animateur) socket.emit('animateur:template', {
              name:           nom,
              template:       data.animateur.template,
              template_data:  data.animateur.data,
              cible: data.animateur.cible,
              bdd:data.moderateur.bdd
            })

            var sequence = sequences[nom];

            function onReponseAni (data) {
              sockets = io.sockets ;
              sequence.storeResponse(socket, sockets, data)
            }
          
            socket.on('animateur:reponse', onReponseAni)

            process.once('fin_sequence', function () {
              socket.removeListener('animateur:reponse', onReponseAni)
            })
          }

          function onStartAnim (nom, data) { 
            sequence_animateur(nom, data)
          }
        
          process.on('sequence', onStartAnim) 

          function Refresh(){
                  var nsequence = sequences[nom_encours] ;
                  nsequence.init(socket,sockets,function(err,newdata){
                      data_encours=newdata;
                      sequence_animateur(nom_encours,newdata)
                  })
          }

          socket.on('animateur:refresh',Refresh);
          process.on('animateur:refresh',Refresh);

          socket.on('disconnect', function () { process.removeListener('sequence', onStartAnim) })

          if (nom_encours) { sequence_animateur(nom_encours, data_encours)    }
} ) ;

socket.on('diffuseur:connect',  function(diffuseurs)  { socket.join(diffuseurs) ; 
          function sequence_diffuseur (nom, data) {
            if (data.diffuseur) socket.emit('diffuseur:template', {
              name:           nom,
              template:       data.diffuseur.template,
              template_data:  data.diffuseur.data,
              cible: data.diffuseur.cible,
              bdd:data.moderateur.bdd
            })

            var sequence = sequences[nom];

            function onReponseDif (data) {
              sockets = io.sockets ;
              sequence.storeResponse(socket, sockets, data)
            }
          
            socket.on('diffuseur:reponse', onReponseDif)

            process.on('fin_sequence', function () {
              socket.removeListener('diffuseur:reponse', onReponseDif)
            })
          }

          function onStartDif (nom, data) { 
            sequence_diffuseur(nom, data)
          }
        
          process.on('sequence', onStartDif) 
          // ici le conducteur a dit : " j'ai une sequence !!! "

          socket.on('disconnect', function () { process.removeListener('sequence', onStartDif) })

        if (nom_encours) { sequence_diffuseur(nom_encours, data_encours)    }
} ) ;

 
        socket.on('conducteur:sequence', function (nom) {
          process.emit('fin_sequence');
          var sequence = sequences[nom.nom] ;
        
          nom_encours = nom.nom ;
        
          sockets = io.sockets ;
        
          sequence.init(socket, sockets, function (err, data) {
              data_encours = data ;

              function onEnd () {
                sequence.end()
              }
          
              socket.once('conducteur:fin_sequence', onEnd)

              // process.emit est une instance de Emitter (pub/sub)
              process.emit('sequence', nom.nom, data);
          })

        })
  
});


// all environments
io.enable('browser client etag');
io.set('resource', conf.url_nodejs_root + 'socket.io');
        io.set('transports', [
                'websocket',
//              'flashsocket',
//              'htmlfile',
//              'xhr-polling',
                'jsonp-polling'
        ]);

app.enable('trust proxy');
app.set('port', process.env.PORT || 3003);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
//app.use(express.static(path.join(__dirname, 'public')));
app.use(express.cookieParser());

//--app.use(express.session({secret: sessionSecret, store: sessionStore}));
//--app.use(express.cookieSession({secret: 'secret', cookie: { maxAge: 999999999 } }));
app.use(app.router);

app.all(conf.url_nodejs_root, function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get(conf.url_nodejs_root, function(req,res){
    console.log("cookie device-->"+req.cookies.type_de_device);
    console.log("cookie groupe-->"+req.cookies.id_groupe);

    if(!req.cookies.type_de_device) {
        res.redirect(conf.url_nodejs_root+'index');
    }

    if(req.cookies.type_de_device === 'conducteur') {
        res.redirect(conf.url_nodejs_root+'conducteur');
    }

    if(req.cookies.type_de_device === 'groupe') {
        res.redirect(conf.url_nodejs_root+'groupe');
    }

    if(req.cookies.type_de_device === 'moderateur') {
        res.redirect(conf.url_nodejs_root+'moderateur');
    }

    if(req.cookies.type_de_device === 'animateur') {
        res.redirect(conf.url_nodejs_root+'animateur');
    }

    if(req.cookies.type_de_device === 'diffuseur') {
        res.redirect(conf.url_nodejs_root+'diffuseur');
    }
});

app.get(conf.url_nodejs_root+'choix/:tod', function(req,res) {
    res.cookie( 'type_de_device', req.params.tod , { maxAge:9999999999 } );
    res.redirect(conf.url_nodejs_root);
});

app.get(conf.url_nodejs_root+'choix_groupe/:grp', function(req,res) {
     res.cookie( 'id_groupe', req.params.grp , { maxAge:9999999999 } );
     res.redirect(conf.url_nodejs_root);
});

app.get(conf.url_nodejs_root+'index'     , routes.index);
app.get(conf.url_nodejs_root+'conducteur', routes.conducteur);
app.get(conf.url_nodejs_root+'groupe'    , routes.groupe);
app.get(conf.url_nodejs_root+'moderateur', routes.moderateur);
app.get(conf.url_nodejs_root+'animateur' , routes.animateur);
app.get(conf.url_nodejs_root+'diffuseur' , routes.diffuseur);
app.get(conf.url_nodejs_root+'raz' , function(req,res){
  res.clearCookie('type_de_device'); 
  res.clearCookie('id_groupe'); 
     res.redirect(conf.url_nodejs_root);
});

server.listen(app.get('port'), function(){
  console.log('Express  server listening on port ' + app.get('port'));
});
