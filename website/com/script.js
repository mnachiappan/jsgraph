/**
 * Created by Meyyappan on 7/12/2014.
 */



var graphApp = angular.module('graphApp', ['ngRoute']);

graphApp.config(function($routeProvider){
    $routeProvider
    .when('/', {
        templateUrl : 'selectionspage/selection.html',
        controller : 'SelectionController'
    })
    .when('/line', {
        templateUrl: 'linegraph/line.html',
        controller: 'LineGraphController'
    })
});



