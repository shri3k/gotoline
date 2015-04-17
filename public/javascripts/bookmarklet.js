(function(){
    var xhr = new XMLHttpRequest();
    if(!('withCredentials' in xhr)){
        alert('Browser dont support rando');
    }
    xhr.open('POST','http://localhost:3000/', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onload = function(res){
      console.log(res);
    };
    xhr.onerror = function(){
      console.log('something happended!! oh no!!');
    };
    xhr.send('url='+window.location.href+'#400');
}());
