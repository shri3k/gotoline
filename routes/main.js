var express = require('express');
var router = express.Router();
var mainModel = require('../models/main');
/**
 * @api {get} / Get all keys
 * @apiVersion 0.1.0
 * @apiName GetAll
 * @apiSuccess {String} url name of the url
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *       "fiesty-fennec": "http://www.google.com"
 *    }
 *
 * @apiError Null Data Entry Failed
 *
 * @apiErrorExample Error-Response:
 *   HTTP/1.1 404 Not Found
 *   {
 *     "error": "null"
 *   }
 */
router.get('/', function(req, res) {
  var response = res;
  mainModel.getRoot(req, function(err, data) {
    if (err) {
      return new Error(err);
    }
    res.render('index', data);
  });
});

/**
 * @api {post} / post the keyword
 * @apiVersion 0.1.0
 * @apiName PostKey
 *
 * @apiSuccess {String} OK just prints OK
 *
 * @apiSuccessExample Success-Response:
 *   HTTP/1.1 200 OK
 *    "ok"
 *
 * @apiError NotAdded Key not added
 *
 * @apiErrorExample Error-Response:
 *   HTTP/1.1 500 Something Happened
 *   {
 *     "error": "Not Added"
 *   }
 */
router.post('/', function(req, res) {
  var response = res;
  mainModel.setPage(req, function(err, data) {
    if (err) {
      throw new Error(err);
    }
    response.status(200).send(data);
  });
});
module.exports = router;
