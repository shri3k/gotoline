var path = require('path');
var defaults = require('defaults');

var alias = {
  'dev': require('./env/development'),
  'stage': require('./env/stage'),
  'prod': require('./env/production')
};

var options = {

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
  try {
    // check if it's alias first
    if (alias[env]) {
      conf = require(path.join('./env', alias[env]));
    } else {
      conf = require(path.join('./env', env));
    }
    throw new Error('No environment found!');
  } catch (e) {
    process.stdout.write('Falling back to dev env');
    conf = require(path.join('./env', alias.dev));
  }
  return defaults(options, conf);
}
module.exports = config(process.env.NODE_ENV || 'dev', options);
