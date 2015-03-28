var path = require('path');
var debug = require('debug')('gotoline');
var defaults = require('defaults');

var envDir = '/env';
var alias = {
  'dev': "development",
  'stage': "staging",
  'prod': "production"
};

var options = {
  //default options go here
};

/**
 * Description: Loads the passed config
 * if not then reverts back to dev
 *
 * @method config
 * @param {string} envrionemtn to be loaded
 * @param {Object} default options if any
 * @return {N/A}
 */
function config(env, options) {
  var conf;
  // check if it's in alias first
  if (alias[env]) {
    conf = require('.' + path.join(envDir, alias[env]));
    debug("Running in " + alias[env]);
  } else {
    try {
      try{
        conf = require('.' + path.join(envDir, env));
        debug("Running in " + env);
      } catch(e){
        throw new Error('No environment found!:' + env);
      }
    } catch (e) {
      debug(e.message);
      debug('Falling back to dev env');
      conf = require('.' + path.join(envDir, alias.dev));
    }
  }
  return defaults(options, conf);
}
module.exports = config(process.env.NODE_ENV || 'dev', options);
