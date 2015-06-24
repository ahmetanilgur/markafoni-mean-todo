/// <reference path="../../typings/angularjs/angular.d.ts"/>
var myApp = angular.module('myApp', ["xeditable"]);
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
//xeditable dalgasi
myApp.run(function(editableOptions) {
  editableOptions.theme = 'default'; // bootstrap3 theme. Can be also 'bs2', 'default'
});

$scope.addTodo = function() {
  console.log($scope.todo);
  $http.post('/add', $scope.todo).success(function(response) {
    console.log(response);
    refresh();
  });
};

$scope.remove = function(id) {
  console.log(id);
  $http.delete('/delete/' + id).success(function(response) {
    refresh();
  });
};

$scope.edit = function(id) {
  console.log(id);
  $http.get('/todolist/' + id).success(function(response) {
    $scope.todo = response;
  });
};

$scope.update = function(id) {
  console.log(id);
  $http.put('/update/' + id +"/"+this.$data).success(function(response) {
    refresh();
  });
};
$scope.updateStatus = function(id) {
  console.log(id);
  $http.put('/updateStatus/' + id, $scope.todo).success(function(response) {
    refresh();
  });
};
$scope.updateActive = function(id) {
  console.log(id);
  $http.put('/updateActive/' + id, $scope.todo).success(function(response) {
    refresh();
  });
};

$scope.deselect = function() {
  $scope.todo = "";
};

}]);