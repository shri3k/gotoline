var stream = require('stream');
var utils = require('utils');
var Readable = stream.Readable;
var fs = require('fs');
var mockFile;

var readStream= function(filename, options){
  mockFile = filename;
  Readable.call(this, options);
};
utils.inherit(readStream, Readable);

readStream.prototype._read = function(size){
  var file = fs.createReadableStream(mockFile);
  file.setEncoding("utf8");
  file.on('readable', function(){
    this.push(file.read());
    this.push(null);
  });
};

module.exports = function(filename, cb){
  var rs = new readStream(filename);
  cb(rs);
};
