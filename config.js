// Points d'entrée de l'appli : Répertoires et URLs
var app_name = '131107_La_Poste';
var server = 'n1.netdirect.fr';
var webprotocol = 'http://';
var web_server_url = webprotocol + server;
var root_dir = '/content/';
var web_root_dir = root_dir + 'htdocs/www/' + app_name + '/';
var nodejs_root_dir = root_dir + 'nodejs/' + app_name + '/';
var url_static_root = '/' + app_name + '/';
var url_nodejs_root = '/nodejs/' + app_name + '/';

// Database
var dbhost     = 'ft1.netdirect.fr';
var dbuser     = 'nodejs';
var dbpassword = 'c3LZcM2HLXsKdBdw';
var dbname     = '131107-La-Poste';

module.exports.app_name = app_name;
module.exports.server = server;
module.exports.webprotocol = webprotocol;
module.exports.web_server_url = web_server_url;
module.exports.root_dir = root_dir;
module.exports.web_root_dir = web_root_dir;
module.exports.nodejs_root_dir = nodejs_root_dir;
module.exports.url_static_root = url_static_root;
module.exports.url_nodejs_root = url_nodejs_root;

module.exports.dbhost = dbhost;
module.exports.dbuser = dbuser;
module.exports.dbpassword = dbpassword;
module.exports.dbname = dbname;
