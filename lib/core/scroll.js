/**
 * Description: Get the scroll of the page
 *
 * @method getScrollPos
 * @param  {String} Complete url string + the anchor position of the page
 * @return {Number} Returns position in %
 */
var pgPositionPattern = /#\d+$/gi;
exports.getScrollTo = function(url) {
  let pgExtract = pgPositionPattern.exec(url);
  let result = pgExtract?pgExtract[0].slice(1):'';
  return Number(result);
};
