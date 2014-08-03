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
        templateUrl: 'com/chart/graphs/multiple/line/line.html',
        controller: 'LineGraphController'
    })
});

graphApp.run(function($rootScope, $location, $anchorScroll, $routeParams) {
    //when the route is changed scroll to the proper element.
    $rootScope.$on('$routeChangeSuccess', function(newRoute, oldRoute) {
        $location.hash($routeParams.scrollTo);
        $anchorScroll();
    });
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


