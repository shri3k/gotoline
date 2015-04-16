var db = require('../app').db;
var generate = require('project-name-generator');
var count;
exports.getRoot = function(req, cb) {
 cb(null, {"title":"Title"});
};

var setPage = exports.setPage = function(req, cb) {
  var id = generate().dashed;
  console.log(id);
  db.get(id, function(err, reply) {
    /*retrying if unique id already exists or
    has error*/
    if (err || reply) {
      if (count > 10) {
        console.log('exhausted..giving up');
        cb("DB is stressed");
      }
      debug('Retrying another word-set');
      setPage(req, cb);
      count++;
    }
    console.log(req.body.url);
    db.set(id, req.body.url);
    cb(null, id.toString());
  });
};
