'use strict';

var config = require('./config'),
    logger = require('./logger'),
    APIMod = require('riot-lol-api'),
    API = new APIMod(config.APIKey);

function getPlayer(name){
  return {
    name: name
  }
}
module.exports.getPlayer = getPlayer;
