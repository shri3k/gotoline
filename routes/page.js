var http = require('http');
var https = require('https');
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
    try {
      http.get(res.toString(), function(dat) {
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
      });
    } catch (e) {
      console.log("error on", e);
      https.get(res.toString(), function(dat) {
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
      });
    }
    // response.render('page', {
    //   id: req.params.id,
    //   src: res
    // });
  });
});

module.exports = router;
