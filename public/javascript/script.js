function dataInsert(name){
  var req = new XMLHttpRequest();
  req.open("GET", "/insert?name=" + name, false);
  req.addEventListener('load',function(){
    if(req.status >= 200 && req.status < 400){
      console.log(req.responseText);
    }
  });
  req.send(null);
}

function dataLoad(){
  var req = new XMLHttpRequest();
  req.open("GET", "/getTable", false);
  req.addEventListener('load', function(){
    if(req.status >= 200 && req.status < 400){
      console.log(req.responseText);
    }
  });
  req.sent(null);
}

function datePrint(results){

}
