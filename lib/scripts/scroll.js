/*TODO: find a way to make use of function
        instead of returning string
*/

var scroll = function(x, y) {
  return "function() {"+
    "window.onload = function() {"+
      `window.scrollTo(${x}, ${y});`+
    "};"+
  "}";
};
module.exports = function(x, y) {
  return '<script>(' + scroll(x, y) + '())</script>';
};
