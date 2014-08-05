graphApp.controller('RadarGraphController', ['$scope', 'objectConvert', 'screenSelector', 'multipleCanvasFactory', function ($scope, objectConvert, screenSelector, multipleCanvasFactory) {
    var objectConvert = objectConvert;
    var radarCanvas = multipleCanvasFactory;

    var radarChartData = radarCanvas.getTemplateData();
    var ctx = document.getElementById("canvas").getContext("2d");
    var radarChart = new Chart(ctx).Radar(radarChartData, {responsive: true});

    $scope.chartType = "Radar";


    $scope.dataSize = {};

    $scope.dataSize.numberOfLabels = 3;

    $scope.dataSize.numberOfDataSets = 2;

    $scope.chartData;

    $scope.formattedData;

    $scope.generatedJavascript;

    $scope.selectedScreen = 0;

    $scope.toNextScreen = function () {
        $scope.selectedScreen = screenSelector.toNextScreen($scope.selectedScreen);
        console.log($scope.selectedScreen);
    };

    $scope.toPreviousScreen = function (currentScreenIndex) {
        $scope.selectedScreen = screenSelector.toPreviousScreen(currentScreenIndex);
    };

    $scope.isScreenSelected = function (screenName) {
        return screenSelector.isScreenSelected(screenName, $scope.selectedScreen);
    }

    $scope.initializeLabelAndData = (function (numberLabels, numberData) {
        $scope.chartData = new RadarChartData();
        console.log($scope.chartData.prototype);
        console.log($scope.chartData.addNLabels);
        $scope.chartData.addNLabels(numberLabels);
        for (var i = 0; i <  numberData; i++){
            var label = "label" + i;
            $scope.chartData.addEmptyDataSet(numberLabels, label);
        }
        $scope.toNextScreen();
        $scope.formattedData = $scope.chartData.flattenAll();
        radarCanvas.resetLineGraph($scope.formattedData, "radar");
    });

    $scope.generateNewGraph = function () {
        $scope.toNextScreen();
        $scope.formattedData = $scope.chartData.flattenAll();
        radarCanvas.resetLineGraph($scope.formattedData, "radar");
    };

    $scope.updateData = function (datasetIndex, pointIndex, newValue) {
        radarCanvas.updateData(datasetIndex, pointIndex, newValue, "radar");
    };

    $scope.removeLabel = function (labelIndex) {
        $scope.chartData.removeLabel(labelIndex);
    };

    $scope.generateJS = function () {
        $scope.generatedJavascript = objectConvert.toJSON($scope.chartData.flattenAll());
        return true;
    };

    $scope.generateCode = function () {
        $scope.generateJS();
        $scope.toNextScreen();
    }

}]);