(function(){
    var xhr = new XMLHttpRequest();
    xhr.open('POST','http://localhost:3000/', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onload = function(res){
      console.log(res);
    };
    xhr.send('url='+window.location.href+'#400');
}());
