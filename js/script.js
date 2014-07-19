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
                for (var j = 0; j < this.labels.length - this.datasets[i].data.length; j++){
                    this.datasets[i].data.push(_createDataElement(0));
                }
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

        this.flattenLabels = function(){
            var labels = [];
            for(var i = 0; i < this.labels.length; i++){
                labels.push(this.labels[i][_labelTag]);
            }
            return labels;
        }
    }

function lineChartData(){
    this.labels = [];
    this.datasets = [];
    var _labelTag = "label";
    var _elemTag = "elem";

    var createDataElement = function(dataElem){
        var result = {};
        result[_elemTag] = dataElem;
        return result;
    }


    this.flattenRGBColor = function(color){
        var result = "rgba(" + color.r + "," + color.g + "," + color.b + "," + color.o + ")";
        return result;
    }

    this.flattenData = function(data){
        var result = [];
        for(var i = 0; i<data.length; i++){
            result.push(data[i][_elemTag]);
        }
        return result;
    }

    this.flattenDataset = function(dataset){
        var result = {};
        result["label"] = dataset.label;
        result["fillColor"] = this.flattenRGBColor(dataset.fillColor);
        result["strokeColor"] = this.flattenRGBColor(dataset.strokeColor);
        result["pointColor"] = this.flattenRGBColor(dataset.pointColor);
        result["pointStrokeColor"] = dataset.pointStrokeColor;
        result["pointHighlightFill"] = dataset.pointHighlightFill;
        result["pointHighlightStroke"] = this.flattenRGBColor(dataset.pointHighlightStroke);
        console.log(dataset);
        console.log(dataset.data);
        result["data"] = this.flattenData(dataset.data);
        return result;
    }

    this.flattenAll = function(){
        var result = {};
        var datasets = [];
        result["labels"] = this.flattenLabels();
        for(var i = 0; i<this.datasets.length; i++){
            datasets.push(this.flattenDataset(this.datasets[i]));
        }
        result["datasets"] = datasets;
        return result;
    }

    this.addData = function(label, fillColor, strokeColor, pointColor, pointStrokeColor, pointHighlightFill, pointHighlightStroke, data){
        fillColor = this.standardizeColor(fillColor);
        strokeColor = this.standardizeColor(strokeColor);
        pointColor = this.standardizeColor(pointColor);
        pointHighlightStroke = this.standardizeColor(pointHighlightStroke);

        var localData = []
        for(var i = 0; i < data.length; i++){
            localData.push(createDataElement(data[i]));
        }


        var result = {
            "label": label,
            "fillColor": fillColor,
            "strokeColor": strokeColor,
            "pointColor": pointColor,
            "pointStrokeColor": pointStrokeColor,
            "pointHighlightFill": pointHighlightFill,
            "pointHighlightStroke": pointHighlightStroke,
            "data": localData
        };
        this.datasets.push(result);
    }

    this.getDatasets = function(){
        return this.datasets;
    }

    this.getData = function(index){
        if(index >= this.datasets.length){
            return null;
        }else{
            return this.datasets[index];
        }
    }

    this.setDataFillColor = function(index, fillColor){
        fillColor = this.standardizeColor(fillColor);
        this.datasets[index].fillColor = fillColor;
    }

    this.setDataStrokeColor = function(index, strokeColor){
        strokeColor = this.standardizeColor(strokeColor);
        this.datasets[index].strokeColor = strokeColor;
    }

    this.setDataPointColor = function(index, pointColor){
        pointColor = this.standardizeColor(pointColor);
        this.datasets[index].pointColor = pointColor;
    }

    this.setDataPointStrokeColor = function(index, pointStrokeColor){
        this.datasets[index].pointStrokeColor = pointStrokeColor;
    }

    this.setDataPointHighlightFill = function(index, pointHighlightFill){
        pointHighlightFill = this.standardizeColor(pointHighlightFill);
        this.datasets[index].pointHighlightFill = pointHighlightFill;
    }

    this.setData = function(index, data){
        var localData = []
        for(var i = 0; i < data.length; i++){
            localData.push(createDataElement(data[i]));
        }
        this.datasets[index]["data"] = localData;
    }


}

lineChartData.prototype = (new basicChartData());
/*
    'color' is of form {"r": 10, "b": 20, "g": 30, "o": 0.4}
 */
lineChartData.prototype.standardizeColor = function(color){
    if(color["r"] > 255){
        color["r"] = 255;
    }
    if(color["b"] > 255){
        color["b"] = 255;
    }
    if(color["g"] > 255){
        color["g"] = 255;
    }
    if(color["o"] > 1){
        color["o"] = 1;
    }
    return color;
}


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