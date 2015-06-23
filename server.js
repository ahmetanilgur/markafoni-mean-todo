/// <reference path="typings/node/node.d.ts"/>
var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('todo', ['todo']);
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

app.post('/todolist', function (req, res) {
  console.log(req.body.text);
  db.todo.insert({text: req.body.text, status: 0, active: 0}, function(err, doc) {
    res.json(doc);
  });
});

app.delete('/todolist/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.todo.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.get('/todolist/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.todo.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.put('/todolist/:id', function (req, res) {
  var id = req.params.id;
  console.log(req.body.text);
  db.todo.findAndModify({
    query: {_id: mongojs.ObjectId(id)},
    update: {$inc: {status: 1}},
    new: true}, function (err, doc) {
      res.json(doc);
    }
  );
});
app.put('/todolist2/:id', function (req, res) {
  var id = req.params.id;
  console.log(req.body.text);
  db.todo.findAndModify({
    query: {_id: mongojs.ObjectId(id)},
    update: {$inc: {status: 1}},
    new: true}, function (err, doc) {
      res.json(doc);
    }
  );
});

app.put('/todolist3/:id', function (req, res) {
  var id = req.params.id;
  console.log(req.body.text);
  db.todo.findAndModify({
    query: {_id: mongojs.ObjectId(id)},
    update: {$inc: {active: 1}},
    new: true}, function (err, doc) {
      res.json(doc);
    }
  );
});
app.listen(3000);
console.log("Server running on port 3000");