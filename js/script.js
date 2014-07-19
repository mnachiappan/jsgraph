/**
 * Created by Meyyappan on 7/12/2014.
 */

function basicChartData(){
        this.labels = [];
        this.datasets = [];
        var _labelTag = "label";
        var _elemTag = "elem";
        function _fillArray(value, len) {
          var arr = [];
          for (var i = 0; i < len; i++) {
            arr.push(value);
          };
          return arr;
        }

        function _createLabelElement(value){
            var result = {};
            result[_labelTag] = value;
            return result;
        }

        function _createDataElement(value){
            var result = {};
            result[_elemTag] = value;
            return result;
        }

        this.getLabels = function(){
            return this.labels;
        }

        /*
        Append labels to end of current label set.
        Also update the datasets, so that each set has new data elements.
        Example:
        INPUT
        newLabels = ["Hello", "Hi"]
        RESULT
        this.labels = [..., {"label": "Hello"}, {"label": "Hi"}]
        this.datasets [{..., "data": [...,{"elem": 0}, {"elem": 0}]}]
        */
        this.addLabels = function(newLabels){
            var labelsLength = newLabels.length;
            for(var i = 0; i < labelsLength; i++){
                this.labels.push(_createLabelElement(newLabels[i]));
            }
            for (var i = 0; i < this.datasets.length; i++){
                this.datasets[i].data.push(_fillArray(_createDataElement(0), labelsLength));
            }
        }

        // Changes the label of an existing label, given a new label and the index location.
        // Example:
        // INPUT
        // newLabel = "Jan"
        // location = 1
        // RESULT
        // 
        
        this.setLabel = function(newLabel, location){
            if(location >= this.labels.length){
                console.log("Attempted to add new label: " + newLabel + ", at location: " + location + ".");
            }else{
                this.labels[location][_labelTag] = newLabel;
            }
        }
    }

function lineChartData(){
    this.labels = [];
    this.datasets = [];
}

lineChartData.prototype = new basicChartData();
var graphApp = angular.module('graphApp', []);

graphApp.factory('DataFactoryMany', function () {
    var dataFactory = {};
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
        var randColor = getRandomInt(100, 240);
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
        return datasets;
    });

    var lineFactory = {};
// .labels // .datasets
    lineFactory["newLine"] = (function (canvasId, numbLabels, numbDataSets) {
        var ctx = document.getElementById(canvasId).getContext("2d");
        var labels = initializeArray(numbLabels, "Label");
        var datasets = createDatasets(numbLabels, numbDataSets);
        var chartData = {
            labels: labels,
            datasets: datasets
        };
        var chart = new Chart(ctx).Line(chartData, {responsive: true});
        return {
            chart: chart,
            chartData: chartData
        };
    });

    lineFactory["localLabelsToLineChart"] = (function (localLabels) {
        var chartLabels = [];
        for (label in localLabels) {
            chartLabels.push(label['label']);
        }
        return chartLabels;
    });

    // ex data: [{val: 0}, {val: 0}]
    lineFactory["localDataToChartData"] = (function (label, fillColor, strokeColor, pointColor, pointStrokeColor, pointHighlightFill, pointHighlightStroke, localData) {
        var result = {};
        result['label'] = label;
        result['fillColor'] = fillColor;
        result['strokeColor'] = strokeColor;
        result['pointColor'] = pointColor;
        result['pointStrokeColor'] = pointStrokeColor;
        result['pointHighlightFill'] = pointHighlightFill;
        result['pointHighlightStroke'] = pointHighlightStroke;
        var data = [];
        for (value in localData){
            data.push(value.val)
        }
        result['data'] = data;
        return result;
    });

    return lineFactory;
});

graphApp.controller('GraphController', ['$scope', 'DataFactoryMany', 'LineFactory', function ($scope, DataFactoryMany, LineFactory) {



    // methods for labels

    var emptyLabel = (function () {
        return {label: ""};
    });

    $scope.numberOfLabels = null;

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

    $scope.numberOfDataSets = null;

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