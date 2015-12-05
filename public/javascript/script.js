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
      datePrint(eq.responseText);
    }
  });
  req.send(null);
}

function datePrint(results){
  var table = document.getElementById('workouts');
  results.forEach(function(a){
    var item = document.createElement('tr');
    var name = document.createElement('td').textContent(a.name);
    var reps = document.createElement('td').textContent(a.reps);
    var weight = document.createElement('td').textContent(a.weight);
    var date = document.createElement('td').textContent(a.date);
    var lbs = document.createElement('td').textContent(a.lbs);
    item.appendChild(name);
    item.appendChild(reps);
    item.appendChild(weight);
    item.appendChild(date);
    item.appendChild(lbs);
    list.appendChild(table);
  });
}
