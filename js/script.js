/**
 * Created by Meyyappan on 7/12/2014.
 */

var graphApp = angular.module('graphApp', []);

graphApp.factory('DataFactoryMany', function () {
    var dataFactory = {};

    var dataLabels = [
        //{"label": "January"},
    ];

    var dataSets = [
        {
            "data": [
                {"val": 1},
                {"val": 22},
                {"val": 3}
            ]
        },
        {
            "data": [
                {"val": 4},
                {"val": 5},
                {"val": 6}
            ]
        }
    ];

    var createNewValueObj = (function () {
        return {"val": 0};
    });

    var createNewDataObj = (function (numberOfLabels) {
        var data = [];
        for (var i = 0; i < numberOfLabels; i++) {
            data.push(createNewValueObj());
        }

        return {"data": data};
    });

    dataFactory["newDataRow"] = (function (numberOfLabels) {
        return (createNewDataObj(numberOfLabels));
    });

    dataFactory["dataLabels"] = dataLabels;
    dataFactory["dataSets"] = dataSets;

    return dataFactory;
});

graphApp.factory('LineFactory', function () {
    var initializeArray = (function (length, value) {
        var result = [];
        while (length > 0) {
            result.push(value);
            length--;
        }
        return result;
    });

    var getRandomInt = (function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    });

    var randomColorSelection = (function () {
        var color = {};
        var randColor = getRandomInt(10, 240);
        randColor = randColor.toString();
        color["fillColor"] = "rgba(" + randColor + "," + randColor + "," + randColor + "," + "0.2)";
        color["strokeColor"] = color["pointColor"] = color["pointHighlightStroke"] = "rgba(" + randColor + "," + randColor + "," + randColor + "," + "1)";
        color["pointStrokeColor"] = color["pointHighlightFill"] = "#fff";
        return color;
    });

    var createData = (function (labelIndex, dataLength) {
        var dataElement = {};
        var color = randomColorSelection();
        dataElement["label"] = "data" + labelIndex.toString();
        dataElement["fillColor"] = color["fillColor"];
        dataElement["strokeColor"] = color["strokeColor"];
        dataElement["pointColor"] = color["pointColor"];
        dataElement["pointStrokeColor"] = color["pointStrokeColor"];
        dataElement["pointHighlightFill"] = color["pointHighlightFill"];
        dataElement["pointHighlightStroke"] = color["pointHighlightStroke"];
        dataElement["data"] = initializeArray(dataLength, labelIndex);
        return dataElement;
    });

    var createDatasets = (function (numbLabels, numbDataSets) {
        var datasets = [];
        for (var i = 0; i < numbDataSets; i++) {
            datasets.push(createData(i, numbLabels));
        }
        console.log(datasets)
        return datasets;
    });

    var lineFactory = {};

    lineFactory["newLine"] = (function (canvasId, numbLabels, numbDataSets) {
        var ctx = document.getElementById(canvasId).getContext("2d");
        var labels = initializeArray(numbLabels, "Label");
        var datasets = createDatasets(numbLabels, numbDataSets);
        var chartData = {
            labels: labels,
            datasets: datasets
        };
        console.log(chartData);
        var chart = new Chart(ctx).Line(chartData, {responsive: true});
        return chart;
    });

    return lineFactory;
});

graphApp.controller('GraphController', ['$scope', 'DataFactoryMany', 'LineFactory', function ($scope, DataFactoryMany, LineFactory) {
    $scope.numberOfLabels = null;
    $scope.numberOfDataSets = null;

    $scope.dataLabels = [];

    $scope.dataSets = [];

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

    $scope.updateData = (function (dataSetIndex, pointIndex) {
        console.log("Data set: " + dataSetIndex + ", point: " + pointIndex);
    });

    var chart = null;
    $scope.createLine = (function (canvasId, numbLabels, numbDataSets){
        chart = LineFactory.newLine(canvasId, numbLabels, numbDataSets);
    });
}]);