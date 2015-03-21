var express = require('express');
var router = express.Router();
var pageModel = require('../models/page');

router.get('/', function(req, res, next) {
  res.render('page', pageModel.getPage());
});

router.get('/:id', function(req, response, next) {
  pageModel.getPage(req.params.id, function(err, res) {
    if (err) {
      throw new Error(err);
    }
    response.render('page', {
      id: req.params.id,
      src: res
    });
  });
});

module.exports = router;
