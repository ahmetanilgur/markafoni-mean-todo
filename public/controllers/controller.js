/// <reference path="../../typings/angularjs/angular.d.ts"/>
var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
    console.log("Hello World from controller");


var refresh = function() {
  $http.get('/todolist').success(function(response) {
    console.log("I got the data I requested");
    $scope.todolist = response;
    $scope.todo = "";
  });
};

refresh();

$scope.addTodo = function() {
  console.log($scope.todo);
  $http.post('/todolist', $scope.todo).success(function(response) {
    console.log(response);
    refresh();
  });
};

$scope.remove = function(id) {
  console.log(id);
  $http.delete('/todolist/' + id).success(function(response) {
    refresh();
  });
};

$scope.edit = function(id) {
  console.log(id);
  $http.get('/todolist/' + id).success(function(response) {
    $scope.todo = response;
  });
};

$scope.update = function() {
  console.log($scope.todo._id);
  $http.put('/todolist/' + $scope.todo._id, $scope.todo).success(function(response) {
    refresh();
  })
};
$scope.update2 = function(id) {
  console.log(id);
  $http.put('/todolist2/' + id, $scope.todo).success(function(response) {
    refresh();
  })
};
$scope.update3 = function(id) {
  console.log(id);
  $http.put('/todolist3/' + id, $scope.todo).success(function(response) {
    refresh();
  })
};

$scope.deselect = function() {
  $scope.todo = "";
}

}]);﻿