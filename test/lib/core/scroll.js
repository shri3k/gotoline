var path = require('path');
var program = require('index').requireTest(__filename);

describe('lib/core/scroll', function(){
  describe(':getScrollTo', function(done){
    beforeEach(function(){
      this.fn = program.getScrollTo;
      this.url = "http://www.somefakeurl.com";
    });

    it('should return 0 string on passing empty string', function(done){
      this.fn(this.url).should.be.a.Number.and.equal(0);
      done();
    });

    it('should return 0 string on passing string without numeric after #', function(done){
      this.fn(this.url+"#blah-blah").should.be.a.Number.and.equal(0);
      done();
    });

    it('should return 30 on passing string/url with 30 at the end #', function(done){
      this.fn(this.url+"#30").should.equal(30);
      done();
    });

  });
});
