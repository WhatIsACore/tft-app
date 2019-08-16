'use strict';

var config = require('./includes/config'),
    logger = require('./includes/logger');

var express = require('express'),
    routes = express(),
    compression = require('compression'),
    minify = require('express-minify');

var server = require('http').Server(routes);

routes.use(compression());
if(!config.debug) routes.use(minify());

routes.get('/', function(req, res, next){
        res.sendFile(__dirname + '/public/index.html');
      })
      .use('/', express.static(__dirname + '/public'));

server.listen(config.port, function(){
  logger.info('starting server on port ' + config.port);
});
