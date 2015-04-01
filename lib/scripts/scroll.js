/*TODO: find a way to make use of function
        instead of returning string
*/

var scroll = function(x, y) {
  return "function(x, y) {"+
    "window.onLoad = function() {"+
      "window.scrollTo("+x+", "+y+");"+
    "};"+
  "};";
};
module.exports = function(x, y) {
  return '(' + scroll(x, y) + '())';
};
