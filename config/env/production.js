var cred = require('./cred');
module.exports = {
  'db': {
    'host': 'pub-redis-10769.us-east-1-2.4.ec2.garantiadata.com',
    'port': 10769,
    'auth': cred.auth
  }
};
