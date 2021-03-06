function dataInsert(name){
  //console.log("dataInsert");
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
  //console.log("dataDelete");
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
  //console.log("dataUpdate " + id);
  //pool.query("UPDATE workouts SET name=?, reps=?, weight=?, date=?, lbs=? WHERE id=? ",
  if(id){
    var req = new XMLHttpRequest();
    var url = "/safe-update?id=" + id;
    if(name)
      url += "&name=" + name;
    if(reps)
      url += "&reps=" + reps;
    if(weight)
      url += "&weight=" + weight;
    if(date)
      url += "&date=" + date;
    if(lbs)
      url += "&lbs=" + lbs;

    req.open("GET", url, true);
    req.addEventListener('load',function(){
      if(req.status >= 200 && req.status < 400){
        dataLoad();
      }
    });
    req.send(null);
  }
}


var deleteButton = function(){
  var res = this.id;
  var id = res.split("delete-")[1];
  //console.log("delete:"+id);
  dataDelete(id);
}

var updateButton = function(){
  document.getElementById('update-form').style.display = "block";
  var res = this.id;
  var id = res.split("update-")[1];
  //console.log("update:"+id);
  var row = document.getElementById('row'+id);
  var rdata = row.getElementsByTagName('td');
  document.getElementById('upid').value = id;
  document.getElementById('upname').value = rdata[0].textContent;
  document.getElementById('upreps').value = rdata[1].textContent;
  document.getElementById('upweight').value = rdata[2].textContent;
  document.getElementById('uppdate').value = rdata[3].textContent;
  document.getElementById('uplbs').value = rdata[4].textContent;
}

function dataLoad(){
  //console.log("dataLoad");
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
  //console.log("dataPrint");
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
  lbs.textContent = "measure";
  item.appendChild(name);
  item.appendChild(reps);
  item.appendChild(weight);
  item.appendChild(date);
  item.appendChild(lbs);
  table.appendChild(item);

  var result = JSON.parse(results);

  for(i in result){
    //console.log(a);
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
    if(a.lbs)
      lbs.textContent = "lbs";
    else {
      lbs.textContent = "kg";
    }
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
    updateb.id = 'update-' + a.id;
    updateb.onclick=updateButton;
    //updateb['onclick'] = 'dataDelete('+ a.id +')'
    deleteb.textContent = 'delete';
    deleteb.id = 'delete-' + a.id;
    deleteb.onclick=deleteButton;
    bdata.appendChild(updateb);
    bdata.appendChild(deleteb);
    item.appendChild(bdata);

    table.appendChild(item);
  }
}
