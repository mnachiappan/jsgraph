graphApp.controller('BarGraphController', ['$scope', 'objectConvert', 'screenSelector', 'multipleCanvasFactory', function ($scope, objectConvert, screenSelector, multipleCanvasFactory){
    var objectConvert = objectConvert;
    var barCanvas = multipleCanvasFactory;

    var barChartData = barCanvas.getTemplateData();
    var ctx = document.getElementById("canvas").getContext("2d");
    var barChart = new Chart(ctx).Bar(barChartData, {responsive : true});

    $scope.chartType = "Bar";

    $scope.dataSize = {};
    $scope.dataSize.numberOfLabels = 3;
    $scope.dataSize.numberOfDataSets = 2;

    $scope.chartData;
    $scope.formattedData;
    $scope.generatedJavascript;

    $scope.selectedScreen = 0;
    $scope.toNextScreen = function () {
        $scope.selectedScreen = screenSelector.toNextScreen($scope.selectedScreen);
    };
    $scope.toPreviousScreen = function (currentScreenIndex) {
        $scope.selectedScreen = screenSelector.toPreviousScreen(currentScreenIndex);
    };
    $scope.isScreenSelected = function (screenName) {
        return screenSelector.isScreenSelected(screenName, $scope.selectedScreen);
    }

    $scope.initializeLabelAndData = (function (numberLabels, numberData) {
        $scope.chartData = new BarChartData();
        console.log($scope.chartData.prototype);
        $scope.chartData.addNLabels(numberLabels);
        for (var i = 0; i < numberData; i++){
            var label = "label" + i;
            $scope.chartData.addEmptyDataSet(numberLabels, label);
        }
        $scope.toNextScreen();
        $scope.formattedData = $scope.chartData.flattenAll();
        barCanvas.resetLineGraph($scope.formattedData, "bar");
    });

    $scope.generateNewGraph = function () {
        $scope.toNextScreen();
        $scope.formattedData = $scope.chartData.flattenAll();
        barCanvas.resetLineGraph($scope.formattedData, "bar");
    };

    $scope.updateData = function (dataSetIndex, pointIndex, newValue) {
        barCanvas.updateData(dataSetIndex, pointIndex, newValue, "bar");
    };

    $scope.removeLabel = function (labelIndex) {
        $scope.chartData.removeLabel(labelIndex);
    };

    $scope.generateJS = function(){
        $scope.generatedJavascript = objectConvert.toJSON($scope.chartData.flattenAll());
        return true;
    };

    $scope.generateCode = function(){
        $scope.generateJS();
        $scope.toNextScreen();
    };
}]);