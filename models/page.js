var db = require('../app').db;
exports.getPage = function(id, cb) {
  db.get(id, cb);
};
