var express = require('express');
var router = express.Router();
var mainModel = require('../models/main');
router.get('/', function(req, res, next) {
  res.render('index', mainModel.getRoot());
});

router.post('/', function(req, res) {
  var response = res;
  mainModel.setPage(req, function(err, res) {
    if (err) {
      throw new Error(err);
    }
    response.status(200).send('ok');
  });
});
module.exports = router;
