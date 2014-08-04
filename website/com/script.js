/**
 * Created by Meyyappan on 7/12/2014.
 */



var graphApp = angular.module('graphApp', ['ngRoute', 'ui.router']);


graphApp.config(function($routeProvider){
    $routeProvider
        .when('/',{
            templateUrl: 'com/home/home.html',
            controller : 'SelectionController'
        })
    .when('/selection', {
        templateUrl : 'com/chart/main/selection.html',
        controller : 'SelectionController'
    })
    .when('/line', {
        templateUrl: 'com/chart/graphs/multiple/line.html',
        controller: 'LineGraphController'
    })
});

/*
graphApp.config(function($stateProvider, $urlRouterProvider){
	$urlRouterProvider.otherwise('/graphs');

	$stateProvider
		.state('graphs', {
			url: '/graphs',
			templateUrl: 'com/chart/main/selection.html', 
			controller: 'SelectionController'
		});

    $stateProvider
        .state('line', {
           url: '/line',
           templateUrl: 'com/chart/graphs/multiple/line/line.html',
           controller: 'LineGraphController'
        });
});
*/


