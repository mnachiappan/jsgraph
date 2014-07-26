graphApp.controller('LineGraphController', ['$scope', 'objectConvert', 'screenSelector', function ($scope, objectConvert, screenSelector) {
    var objectConvert = objectConvert;

    // template chart
    var randomScalingFactor = function(){ return Math.round(Math.random()*100)}; var lineChartData = { labels : ["label1","label2","label3","label4","label5","label6","label7"], datasets : [ { label: "My First dataset", fillColor : "rgba(220,220,220,0.2)", strokeColor : "rgba(220,220,220,1)", pointColor : "rgba(220,220,220,1)", pointStrokeColor : "#fff", pointHighlightFill : "#fff", pointHighlightStroke : "rgba(220,220,220,1)", data : [randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor()] }, { label: "My Second dataset", fillColor : "rgba(151,187,205,0.2)", strokeColor : "rgba(151,187,205,1)", pointColor : "rgba(151,187,205,1)", pointStrokeColor : "#fff", pointHighlightFill : "#fff", pointHighlightStroke : "rgba(151,187,205,1)", data : [randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor()] } ] };
    // end of template chart

    $scope.numberOfLabels = null;

    $scope.numberOfDataSets = null;

    $scope.lineChartData;

    $scope.formattedData;

    $scope.generatedJavascript;

    // screen controlling

    var screenSelector = screenSelector;

    $scope.selectedScreen = 0;
    
    $scope.toNextScreen = function (currentScreenIndex) {
        $scope.selectedScreen = screenSelector.toNextScreen(currentScreenIndex);
    };

    $scope.toPreviousScreen = function (currentScreenIndex) {
        $scope.selectedScreen = screenSelector.toPreviousScreen(currentScreenIndex);
    };

    $scope.isScreenSelected = function (screenName) {
        return screenSelector.isScreenSelected(screenName, $scope.selectedScreen);
    }

    // end of screen controlling
    
    var lineChart;
    var graphContainerID = "#graphContainer";
    var graphID = "canvas";
    var ctx = document.getElementById("canvas").getContext("2d");
    lineChart = new Chart(ctx).Line(lineChartData, {responsive: true});
    var resetLineGraph = function(data){
        $('#canvas').remove();
        $('#graphContainer').append('<canvas id="canvas"></canvas>');
        ctx = document.getElementById("canvas").getContext("2d");
        lineChart = new Chart(ctx).Line(data, {responsive: true});
    };

    $scope.initializeLabelAndData = (function (numberLabels, numberData) {
        $scope.lineChartData = new LineChartData()
        $scope.lineChartData.addNLabels(numberLabels);
        for (var i = 0; i < numberData; i++){
            var label = "label" + i;
            $scope.lineChartData.addEmptyDataSet(numberLabels, label);
        }
        toNextScreen();
        $scope.formattedData = $scope.lineChartData.flattenAll();
        resetLineGraph($scope.formattedData);
    });

    $scope.generateNewLineGraph = function(){
        toNextScreen();
        $scope.formattedData = $scope.lineChartData.flattenAll();
        resetLineGraph($scope.formattedData);
    };

    $scope.updateData = (function (dataSetIndex, pointIndex, newValue) {
        if (!isNaN(newValue)) {
            lineChart.datasets[dataSetIndex].points[pointIndex].value = newValue;
            lineChart.update();
        } else {
            console.log("Please enter a number.");
        }
    });

    $scope.generateJS = function(){
        $scope.generatedJavascript = objectConvert.toJSON($scope.formattedData);
        return true;
    };

    $scope.generateCode = function(){
        $scope.generateJS();
        toNextScreen();
    };

}]);