var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'localhost',
  user            : 'student',
  password        : 'default',
  database        : 'student'
});

module.exports.pool = pool;

var app = express();

var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3001);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// -- GET -- //


app.get('/',function(req,res){
  var content = {};
  content.title = "GET Request Received";
  console.log(pool);
  var params = [];
  for (var p in req.query){
    params.push({'name':p,'value':req.query[p]})
  }
  content.dataList = params;
  res.render('home', content);
});

app.get('/app',function(req,res){
  res.render('app');
});

// ------ GET TABLES ------ //
app.get('/reset-table',function(req,res,next){
  var context = {};
    pool.query("DROP TABLE IF EXISTS todo", function(err){
    var createString = "CREATE TABLE todo(" +
    "id INT PRIMARY KEY AUTO_INCREMENT," +
    "name VARCHAR(255) NOT NULL," +
    "done BOOLEAN," +
    "due DATE)";
    mysql.pool.query(createString, function(err){
      context.results = "Table reset";
      res.render('table',context);
    })
  });
  res.render('app');
});

app.get('/insert',function(req,res,next){
  var context = {};
    pool.query("INSERT INTO todo (`name`) VALUES (?)", [req.query.c], function(err, result){
    if(err){
      next(err);
      return;
    }
    context.results = "Inserted id " + result.insertId;
    res.render('table',context);
  });
});

app.get('/table',function(req,res,next){
  var context = {};
  pool.query('SELECT * FROM todo', function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    context.results = JSON.stringify(rows);
    res.render('table', context);
  });
});

app.get('/simple-update',function(req,res,next){
  var context = {};
  pool.query("UPDATE todo SET name=?, done=?, due=? WHERE id=? ",
    [req.query.name, req.query.done, req.query.due, req.query.id],
    function(err, result){
    if(err){
      next(err);
      return;
    }
    context.results = "Updated " + result.changedRows + " rows.";
    res.render('table',context);
  });
});

app.get('/safe-update',function(req,res,next){
  var context = {};
  pool.query("SELECT * FROM todo WHERE id=?", [req.query.id], function(err, result){
    if(err){
      next(err);
      return;
    }
    if(result.length == 1){
      var curVals = result[0];
      mysql.pool.query("UPDATE todo SET name=?, done=?, due=? WHERE id=? ",
        [req.query.name || curVals.name, req.query.done || curVals.done, req.query.due || curVals.due, req.query.id],
        function(err, result){
        if(err){
          next(err);
          return;
        }
        context.results = "Updated " + result.changedRows + " rows.";
        res.render('table',context);
      });
    }
  });
});


// -- POST -- //

app.post('/', function(req, res){
  var content = {}
  content.title = "POST Request Received";
  var params = [];
  for (var p in req.body){
    params.push({'name':p,'value':req.body[p]})
  }
  console.log("POST");
  console.log(req.body);
  console.log(params);
  content.dataList = params;
  res.render('home', content);
});

app.use(function(req,res){
  res.type('text/plain');
  res.status(404);
  res.send('404 - Not Found');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.send('500 - Server Error');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
