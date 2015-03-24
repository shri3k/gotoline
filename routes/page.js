var http = require('http');
var https = require('https');
var express = require('express');
var router = express.Router();
var pageModel = require('../models/page');

function injectScript(dat) {
  var serve = '';
  dat.on('data', function(res) {
    serve += res.toString();
  });
  dat.on('end', function() {
    var slicedUp = serve.split(/(<\/body>)/);
    slicedUp.splice(2, 0, "<script>window.onload = function(){ window.scrollTo(0,500);}</script>");
    console.log(slicedUp);
    response.status(200).send(slicedUp.join());
  });
}

router.get('/', function(req, res, next) {
  res.render('page', pageModel.getPage());
});

router.get('/:id', function(req, response, next) {
  pageModel.getPage(req.params.id, function(err, res) {
    if (err) {
      throw new Error(err);
    }
    try {
      http.get(res.toString(), injectScript);
    } catch (e) {
      console.log("trying https", e);
      https.get(res.toString(), injectScript);
    }
  });
});

module.exports = router;
