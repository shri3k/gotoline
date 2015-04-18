var db = require('../app').db;
var generate = require('project-name-generator');
var count;
exports.getRoot = function(req, cb) {
  cb(null, {
    "title": "Title"
  });
};

var setPage = exports.setPage = function(req, cb) {
  function hasValue(val, cb) {
    return db.exists("val:" + val, cb);
  }

  function setValue() {
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
      db.set("key:" + id, req.body.url);
      db.set("val:" + req.body.url, id);
      cb(null, id.toString());
    });
  }

  var url = req.body.url;
  hasValue(url, function(err, reply) {
    console.log("error", err);
    console.log("reply", reply);
    if (err) {
      return new Error(err);
    }
    if (reply === 0) {
      return setValue();
    }
    var existingId = db.getIt("val:" + url, function(err, reply) {
      cb(null, reply[1]);
    });
  });
};
