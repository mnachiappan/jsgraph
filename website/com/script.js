/**
 * Created by Meyyappan on 7/12/2014.
 */



var graphApp = angular.module('graphApp', ['ngRoute']);

graphApp.config(function($routeProvider){
    $routeProvider
    .when('/', {
        templateUrl : 'com/chart/main/selection.html',
        controller : 'SelectionController'
    })
    .when('/line', {
        templateUrl: 'com/chart/graphs/line/line.html',
        controller: 'LineGraphController'
    })
});



