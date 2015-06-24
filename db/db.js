var databaseURI = "localhost:27017/todo";
var collections = ["todo"];
var db = require("mongojs").connect(databaseURI, collections);

module.exports = db;