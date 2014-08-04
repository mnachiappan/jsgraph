graphApp.controller('LineGraphController', ['$scope', 'objectConvert', 'screenSelector', 'multipleCanvasFactory', function ($scope, objectConvert, screenSelector, multipleCanvasFactory) {
    var objectConvert = objectConvert;
    var lineCanvas = multipleCanvasFactory;

    // template chart
    var randomScalingFactor = function(){ return Math.round(Math.random()*100)};
    var lineChartData = lineCanvas.getTemplateData();
    var ctx = document.getElementById("canvas").getContext("2d");
    var lineChart = new Chart(ctx).Line(lineChartData, {responsive: true});

    // end of template chart
    $scope.dataSize = {};

    $scope.dataSize.numberOfLabels = 3;

    $scope.dataSize.numberOfDataSets = 2;

    $scope.lineChartData;

    $scope.formattedData;

    $scope.generatedJavascript;



    // screen controlling

    //var screenSelector = screenSelector;

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

    // end of screen controlling


    $scope.initializeLabelAndData = (function (numberLabels, numberData) {
        $scope.lineChartData = new LineChartData()
        $scope.lineChartData.addNLabels(numberLabels);
        for (var i = 0; i < numberData; i++){
            var label = "label" + i;
            $scope.lineChartData.addEmptyDataSet(numberLabels, label);
        }
        $scope.toNextScreen();
        $scope.formattedData = $scope.lineChartData.flattenAll();
        lineCanvas.resetLineGraph($scope.formattedData, "line");
    });

    $scope.generateNewLineGraph = function(){
        $scope.toNextScreen();
        $scope.formattedData = $scope.lineChartData.flattenAll();
        lineCanvas.resetLineGraph($scope.formattedData, "line");
    };

    $scope.updateData = (function (dataSetIndex, pointIndex, newValue) { 
        lineCanvas.updateData(dataSetIndex, pointIndex, newValue)
    });

    $scope.removeLabel = function (labelIndex) {
        $scope.lineChartData.removeLabel(labelIndex);
    };

    $scope.generateJS = function(){
        $scope.generatedJavascript = objectConvert.toJSON($scope.lineChartData.flattenAll());
        return true;
    };

    $scope.generateCode = function(){
        $scope.generateJS();
        $scope.toNextScreen();
    };

}]);