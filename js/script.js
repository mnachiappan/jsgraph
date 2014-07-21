/**
 * Created by Meyyappan on 7/12/2014.
 */

function clone(obj) {
    // Handle the 3 simple types, and null or undefined
    if (null == obj || "object" != typeof obj) return obj;

    // Handle Date
    if (obj instanceof Date) {
        var copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }

    // Handle Array
    if (obj instanceof Array) {
        var copy = [];
        for (var i = 0, len = obj.length; i < len; i++) {
            copy[i] = clone(obj[i]);
        }
        return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
        var copy = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
        }
        return copy;
    }

    throw new Error("Unable to copy obj! Its type isn't supported.");
};

var graphApp = angular.module('graphApp', ['ngRoute']);

graphApp.config(function($routeProvider){
    $routeProvider
    .when('/', {
        templateUrl : 'partials/selection.html',
        controller : 'MainController'
    })
    .when('/line', {
        templateUrl: 'partials/line.html',
        controller: 'LineGraphController'
    })
});

graphApp.controller('MainController', ['$scope', function($scope){
        var randomScalingFactor = function(){ return Math.round(Math.random()*100)};
        var lineChartData = {
            labels : ["January","February","March","April","May","June","July"],
            datasets : [
                {
                    label: "My First dataset",
                    fillColor : "rgba(220,220,220,0.2)",
                    strokeColor : "rgba(220,220,220,1)",
                    pointColor : "rgba(220,220,220,1)",
                    pointStrokeColor : "#fff",
                    pointHighlightFill : "#fff",
                    pointHighlightStroke : "rgba(220,220,220,1)",
                    data : [randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor()]
                },
                {
                    label: "My Second dataset",
                    fillColor : "rgba(151,187,205,0.2)",
                    strokeColor : "rgba(151,187,205,1)",
                    pointColor : "rgba(151,187,205,1)",
                    pointStrokeColor : "#fff",
                    pointHighlightFill : "#fff",
                    pointHighlightStroke : "rgba(151,187,205,1)",
                    data : [randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor()]
                }
            ]

        };

        var linectx = document.getElementById("linecanvas").getContext("2d");
        var line = new Chart(linectx).Line(lineChartData, {
            responsive: true
        });

        var radarChartData = {
        labels: ["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"],
        datasets: [
            {
                label: "My First dataset",
                fillColor: "rgba(220,220,220,0.2)",
                strokeColor: "rgba(220,220,220,1)",
                pointColor: "rgba(220,220,220,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: [65,59,90,81,56,55,40]
            },
            {
                label: "My Second dataset",
                fillColor: "rgba(151,187,205,0.2)",
                strokeColor: "rgba(151,187,205,1)",
                pointColor: "rgba(151,187,205,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(151,187,205,1)",
                data: [28,48,40,19,96,27,100]
            }
        ]
    };

    var radar = new Chart(document.getElementById("radarcanvas").getContext("2d")).Radar(radarChartData, {
            responsive: true
        });


    var barChartData = {
        labels : ["January","February","March","April","May","June","July"],
        datasets : [
            {
                fillColor : "rgba(220,220,220,0.5)",
                strokeColor : "rgba(220,220,220,0.8)",
                highlightFill: "rgba(220,220,220,0.75)",
                highlightStroke: "rgba(220,220,220,1)",
                data : [randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor()]
            },
            {
                fillColor : "rgba(151,187,205,0.5)",
                strokeColor : "rgba(151,187,205,0.8)",
                highlightFill : "rgba(151,187,205,0.75)",
                highlightStroke : "rgba(151,187,205,1)",
                data : [randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor()]
            }
        ]

    };

    var bar = new Chart(document.getElementById("barcanvas").getContext("2d")).Bar(barChartData, {
            responsive : true
        });
}]);

graphApp.controller('LineGraphController', ['$scope', function ($scope) {

    $scope.numberOfLabels = null;

    $scope.numberOfDataSets = null;

    $scope.lineChartData;

    $scope.formattedData;

    $scope.screens = ["labelDataSelect", "labelInsert", "dataInsert"];
    var toNextScreen = function(){
        if($scope.selectedScreen < $scope.screens.length - 1){
            $scope.selectedScreen++;
        }
    };

    var toPreviousScreen = function(){
        if ($scope.selectedScreen >= 1){
            $scope.selectedScreen--;
        }
    };
    $scope.selectedScreen = 0;
    $scope.screenSelected = function(screen){
        return screen == $scope.screens[$scope.selectedScreen];
    }

    var lineChart;
    var graphContainerID = "#graphContainer";
    var graphID = "canvas";
    var ctx;


    $scope.initializeLabelAndData = (function (numberLabels, numberData) {
        $scope.lineChartData = new LineChartData()
        $scope.lineChartData.addNLabels(numberLabels);
        for (var i = 0; i < numberData; i++){
            var label = "label" + i;
            $scope.lineChartData.addEmptyDataSet(numberLabels, label);
        }
        console.log($scope.lineChartData);
    });

    $scope.generateNewLineGraph = function(){
        $scope.formattedData = $scope.lineChartData.flattenAll();

        $('#' + graphID).remove();
        $(graphContainerID).append('<canvas id="' + graphID + '"></canvas>');
        
        ctx = document.getElementById(graphID).getContext("2d");
        lineChart = new Chart(ctx).Radar($scope.formattedData, {responsive: true});
    };

    $scope.updateData = (function (dataSetIndex, pointIndex, newValue) {
        if (!isNaN(newValue)) {
            lineChart.datasets[dataSetIndex].points[pointIndex].value = newValue;
            lineChart.update();
        } else {
            console.log("Please enter a number.");
        }
    });

}]);