'use strict';

var config = require('./includes/config'),
    logger = require('./includes/logger'),
    api = require('./includes/api');

var express = require('express'),
    routes = express(),
    compression = require('compression'),
    minify = require('express-minify');

// set up ejs to pull views from public folder
routes.set('views', __dirname + '/public');
routes.engine('ejs', require('ejs').renderFile);
routes.set('view engine', 'ejs');

var server = require('http').Server(routes);

// this helps optimize load times
routes.use(compression());
if(!config.isDebug) routes.use(minify());

routes.use('/css', express.static('public/css'))
      .use('/js', express.static('public/js'))
      .use('/media', express.static('public/media'))

      // view paths
      .get('/', function(req, res){
        res.render('index');
      })
      .get('/player/:name', function(req, res){
        res.render('player', {
          title: req.params.name,
          data: api.getPlayer(req.params.name)
        })
      })

      .get('*', function(req, res){   // page not found
        res.status(404);
        res.render('404', {title: '404'});
      });

server.listen(config.PORT, function(){
  logger.info('starting server on port ' + config.PORT);
});
