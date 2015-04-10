var path = require('path');
var program = require('index')(__filename);
describe('lib/core/scroll', function(){
  describe(':getScrollTo', function(done){
    beforeEach(function(){
      this.fn = program.getScrollTo;
      this.url = "http://www.somefakeurl.com";
    });
    it('should return a number on passing string with numeric after #', function(done){
      this.fn(this.url+"#30").should.be.a.Number.and.equal(30);
    });

    it('should return 0 string on passing string without numeric after #', function(done){

    });
    it('should return 0 string on passing empty string', function(done){

    });

  });
});
