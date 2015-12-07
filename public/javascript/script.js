function dataInsert(name){
  console.log("dataInsert");
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
  console.log("dataDelete");
  var req = new XMLHttpRequest();
  req.open("GET", "/delete?id=" + id, true);
  req.addEventListener('load',function(){
    if(req.status >= 200 && req.status < 400){
      dataLoad();
    }
  });
  req.send(null);
}

function dataUpdate(id, name, reps, weight, date, lbs){
  console.log("dataUpdate " + id);
  pool.query("UPDATE workouts SET name=?, reps=?, weight=?, date=?, lbs=? WHERE id=? ",
  if(id){
    var req = new XMLHttpRequest();
    var get = "/safe-update?id=" + id;
    if(name)
      get += "&name=" + name;
    if(reps)
      get += "&reps=" + reps;
    if(workout)
      get += "&weight=" + weight;
    if(date)
      get += "&date=" + date;
    if(lbs)
      get += "&lbs=" + lbs;

    req.open("GET", get, true);
    req.addEventListener('load',function(){
      if(req.status >= 200 && req.status < 400){
        dataLoad();
      }
    });
    req.send(null);
  }
}

function dataLoad(){
  console.log("dataLoad");
  var req = new XMLHttpRequest();
  req.open("GET", "/getTable", true);
  req.addEventListener('load', function(){
    if(req.status >= 200 && req.status < 400){
      console.log(req.responseText);
      datePrint(req.responseText);
    }
  });
  req.send(null);
}

function datePrint(results){
  console.log("dataPrint");
  var table = document.getElementById('workouts');
  //clear rows
  while(table.rows.length > 0) {
    table.deleteRow(0);
  }
  //build header
  var item = document.createElement('tr');
  var name = document.createElement('th');
  name.textContent = "name";
  var reps = document.createElement('th');
  reps.textContent = "reps";
  var weight = document.createElement('th');
  weight.textContent = "weight";
  var date = document.createElement('th');
  date.textContent = "date";
  var lbs = document.createElement('th');
  lbs.textContent = "lbs";
  item.appendChild(name);
  item.appendChild(reps);
  item.appendChild(weight);
  item.appendChild(date);
  item.appendChild(lbs);
  table.appendChild(item);

  var result = JSON.parse(results);

  for(i in result){
    console.log(a);
    var a = result[i];
    var item = document.createElement('tr');
    item.id = 'row'+a.id;
    var name = document.createElement('td');
    name.textContent = a.name;
    var reps = document.createElement('td');
    reps.textContent = a.reps;
    var weight = document.createElement('td');
    weight.textContent = a.weight;
    var date = document.createElement('td');
    date.textContent = a.date;
    var lbs = document.createElement('td');
    lbs.textContent = a.lbs;
    item.appendChild(name);
    item.appendChild(reps);
    item.appendChild(weight);
    item.appendChild(date);
    item.appendChild(lbs);
    //createbutton
    var deleteb = document.createElement('button');
    var updateb = document.createElement('button');
    var bdata = document.createElement('td');
    updateb.textContent = 'update';
    updateb.onclick=function(){dataUpdate(id=a.id)};
    //updateb['onclick'] = 'dataDelete('+ a.id +')'
    deleteb.textContent = 'delete';
    deleteb.onclick=function(){dataDelete(a.id)};
    bdata.appendChild(updateb);
    bdata.appendChild(deleteb);
    item.appendChild(bdata);

    table.appendChild(item);
  }
}
