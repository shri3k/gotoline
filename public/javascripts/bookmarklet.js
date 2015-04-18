(function() {
  function display(msg) {
    var element = document.createElement('div');
    element.textContent = msg;
    element.style.position = "fixed";
    element.style.bottom = '1px';
    element.style.textAlign = 'center';
    element.style.width = '100%';
    element.style.backgroundColor= "LightYellow"
    document.body.appendChild(element);
  }
  var url = 'http://localhost:3000';
  var method = 'POST';
  var xhr = new XMLHttpRequest();
  if (!('withCredentials' in xhr)) {
    alert('Browser dont support rando');
  }
  xhr.open(method, url);
  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  xhr.onload = function(res) {
    display(this.responseText);
  };
  xhr.onerror = function() {
    console.log('something happended!! oh no!!');
  };
  xhr.send('url=' + window.location.href + '#400');
}());
