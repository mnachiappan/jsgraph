/**
 * Created by Meyyappan on 7/12/2014.
 */

function ColorGenerator(){
    this.currentColor = 0;

}

ColorGenerator.prototype.getNextColor = function(){
    if(this.currentColor >= this.color_data.length){
        this.currentColor = 0;
    }
    var color = this.color_data[this.currentColor];
    this.currentColor++;
    return color;
}

ColorGenerator.prototype.color_data = [
    //{r: 240, g: 248, b: 255}, //"aliceblue": 
    {r: 218, g: 165, b: 32}, //"goldenrod": 
    {r: 119, g: 136, b: 153}, //"lightslategrey": 
    {r: 70, g: 130, b: 180}, //"steelblue": 
    {r: 147, g: 112, b: 216}, //"mediumpurple": 
    {r: 222, g: 184, b: 135} //"burlywood": 
];

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
}

var graphApp = angular.module('graphApp', []);


graphApp.controller('GraphController', ['$scope', function ($scope) {

    $scope.numberOfLabels = null;

    $scope.numberOfDataSets = null;

    $scope.lineChartData;

    $scope.formattedData;

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
        lineChart = new Chart(ctx).Line($scope.formattedData, {responsive: true});
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