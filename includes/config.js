'use strict';

function isDebug(){
  try {
    require.resolve('./env');
    return true;
  } catch(e){}
  return false;
}

var env;
if(isDebug()){
  env = require('./env');
} else {
  env = process.env;
  env.isDebug = false;
}

module.exports = env;
