var http = require('http');
var https = require('https');
var express = require('express');
var router = express.Router();
var pageModel = require('../models/page');
var positionify = require('../lib/scroll');
var scrollify = require('../scripts/scroll');

router.get('/', function(req, res, next) {
  res.render('page', pageModel.getPage());
});

router.get('/:id', function(req, response, next) {
  var url = res.toString();
  pageModel.getPage(req.params.id, function(err, res) {
    if (err) {
      throw new Error(err);
    }
    try {
      http.get(url, injectScript(response, url));
    } catch (e) {
      console.log("trying https..");
      https.get(url, injectScript(response, url));
    }
  });
});

module.exports = router;

function injectScript(resp, url) {
  return function(dat) {
    var serve = '';
    dat.on('data', function(res) {
      serve += res.toString();
    });
    dat.on('end', function() {
      var slicedUp = serve.split(/(<\/body>)/);
      slicedUp.splice(2, 0, scrollify(0, positionify.getScrollTo(url)));
      // console.log(slicedUp);
      resp.status(200).send(slicedUp.join());
    });
  };
}
