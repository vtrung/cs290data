function dataInsert(name){
  var req = new XMLHttpRequest();
  req.open("GET", "/insert?name=" + name, true);
  req.addEventListener('load',function(){
    if(req.status >= 200 && req.status < 400){
      dataLoad();
    }
  });
  req.send(null);
}

function dataDelete(id){
  var req = new XMLHttpRequest();
  req.open("GET", "/delete?id=" + id, true);
  req.addEventListener('load',function(){
    if(req.status >= 200 && req.status < 400){
      dataLoad();
    }
  });
  req.send(null);
}

function dataLoad(){
  var req = new XMLHttpRequest();
  req.open("GET", "/getTable", true);
  req.addEventListener('load', function(){
    if(req.status >= 200 && req.status < 400){
      console.log(req.responseText);
    }
  });
  req.sent(null);
}

function datePrint(results){

}
