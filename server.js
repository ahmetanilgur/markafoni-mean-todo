/// <reference path="typings/node/node.d.ts"/>
var express = require('express');
var app = express();
var db=require('./db/db');

var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/todolist', function (req, res) {
  console.log('I received a GET request');

  db.todo.find(function (err, docs) {
    console.log(docs);
    res.json(docs);
  });
});

//app.post('/todolist', function (req, res) {
app.post('/add', function (req, res) {
  console.log(req.body.text);
  db.todo.insert({text: req.body.text, status: 0, active: 0}, function(err, doc) {
    res.json(doc);
  });
});
//1
app.delete('/delete/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.todo.remove({_id: db.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});
//2
app.get('/delete/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.todo.remove({_id: db.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.get('/todolist/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.todo.findOne({_id: db.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.put('/update/:id/:text', function (req, res) {
  var id = req.params.id;
  var editedText = req.params.text;
  console.log(req.body.text);
  db.todo.findAndModify({
    query: {_id: db.ObjectId(id)},
    update: {$set: {text: editedText}},
    new: true}, function (err, doc) {
      res.json(doc);
      console.log(editedText);
    }
  );
});
app.put('/updateStatus/:id', function (req, res) {
  var id = req.params.id;
  console.log(req.body.text);
  db.todo.findAndModify({
    query: {_id: db.ObjectId(id)},
    update: {$inc: {status: 1}},
    new: true}, function (err, doc) {
      res.json(doc);
    }
  );
});
//Status Update'inin rest api GET versiyonu.
app.get('/updateStatus/:id', function (req, res) {
  var id = req.params.id;
  console.log(req.body.text);
  db.todo.findAndModify({
    query: {_id: db.ObjectId(id)},
    update: {$inc: {status: 1}},
    new: true}, function (err, doc) {
      res.json(doc);
    }
  );
});

app.put('/updateActive/:id', function (req, res) {
  var id = req.params.id;

  console.log(req.body.text);
  db.todo.findAndModify({
    query: {_id: db.ObjectId(id)},
    update: {$inc: {active: 1}},
    new: true}, function (err, doc) {
      
       db.todo.findAndModify({
    query: {_id: db.ObjectId(id),
    status:{$gt:0},
    active:{$gt:1}
    },
    update: {$set: {status: 0}},
    new: true},function(err,doc2){
        res.json(doc2);
    }
  );
});
});
app.listen(3000);
console.log("Server running on port 3000");