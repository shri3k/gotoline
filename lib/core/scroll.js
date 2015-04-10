/**
 * Description: Get the scroll of the page
 *
 * @method getScrollPos
 * @param  {String} Complete url string + the anchor position of the page
 * @return {Number} Returns position in %
 */
var pgPositionPattern = /#\d+$/gi;
exports.getScrollTo = function(url) {
  var pgExtract = pgPositionPattern.exec(url);
  return Number(pgExtract[0].slice(1));
};
