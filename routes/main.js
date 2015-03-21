var express = require('express');
var router = express.Router();
var mainModel = require('../models/main');
router.get('/', function(req, res, next) {
  res.render('index', mainModel.getRoot());
});
module.exports = router;
