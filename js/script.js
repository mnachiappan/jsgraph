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
    {r: 240, g: 248, b: 255}, //"aliceblue": 
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

    $scope.lineChartData = new LineChartData();

    $scope.dataLabels = [];

    $scope.insertEmptyLocalLabels = (function (numberLabels) {
        while (numberLabels > 0) {
            $scope.dataLabels.push(emptyLabel());
            numberLabels--;
        }
    });

    // end method for labels

    $scope.initializeLabelAndData = (function (numberLabels, numberData) {
        $scope.insertEmptyLocalDatas(numberLabels, numberData);
        $scope.insertEmptyLocalLabels(numberLabels);
    });

    // methods for data
    var emptyValue = (function () {
        return {val: 0};
    });

    var newDataElement = (function (size) {
        var result = [];
        for (var i = 0; i < size; i++) {
            result.push(emptyValue());
        }
        return result;
    });

    $scope.insertEmptyLocalDatas = (function (numberLabels, numberDataElements) {
        for (var dataIndex = 0; dataIndex < numberDataElements; dataIndex++) {
            $scope.dataSets.push(newDataElement(numberLabels));
        }
    });

    

    $scope.dataSets = [];



    // end of data


    $scope.newDataRow = (function () {
        $scope.dataSets.push(DataFactoryMany.newDataRow($scope.dataLabels.length));
    });

    $scope.addLabel = (function (newLabel, index) {
        for (var i = 0; i < $scope.dataSets.length; i++) {
            dataArray = $scope.dataSets[i]["data"];
            dataArray.splice(index, 0, {"val": 0});
        }
        $scope.dataLabels.splice(index, 0, {"label": newLabel});
    });

    $scope.pushData = (function () {
        var label = $scope.dataLabels[0]["label"];
        var data = [$scope.dataSets[0]["data"][0]["val"], $scope.dataSets[1]["data"][0]["val"]];
        window.myLine.addData(data, label);
        window.myLine.update();
    });

    $scope.updateLabel = (function (labelIndex, newLabel) {
        if (newLabel !== null && newLabel !== undefined) {
            chartInfo.chart.datasets[labelIndex].label = newLabel;
            chartInfo.chart.update();
            console.log('updated label');
            console.log(chartInfo.chart.datasets);
        } else {
            console.log("Error with label");
        }
    });

    $scope.updateData = (function (dataSetIndex, pointIndex, newValue) {
        if (!isNaN(newValue)) {
            chartInfo.chart.datasets[dataSetIndex].points[pointIndex].value = newValue;
            chartInfo.chart.update();
        } else {
            console.log("Please enter a number.");
        }
    });


    // input is an array of label strings
    // output is an array of {"label": label} objects
    var convertLabelsToLocalForm = (function (labels) {
        var length = labels.length;
        var labelsResult = [];
        for (var i = 0; i < length; i++) {
            labelsResult.push({label: labels[i]});
        }
        return labelsResult;
    });

    var convertDataToArray = (function (data) {
        var resultData = [];
        for (var i = 0; i < data.length; i++) {
            resultData.push({val: data[i]});
        }
        return resultData;
    });

    var convertDatasetsToArray = (function (datasets) {
        var resultSets = [];
        for (var i = 0; i < datasets.length; i++) {
            resultSets.push(convertDataToArray(datasets[i].data));
        }
        return resultSets;
    });

    var chartInfo = null;
    $scope.createLine = (function (canvasId, numbLabels, numbDataSets) {
        chartInfo = LineFactory.newLine(canvasId, numbLabels, numbDataSets);
        console.log(chartInfo);
        $scope.dataLabels = convertLabelsToLocalForm(chartInfo.chartData.labels);
        $scope.dataSets = convertDatasetsToArray(chartInfo.chartData.datasets);
    });
}]);