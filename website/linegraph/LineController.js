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
        toNextScreen();
    });

    $scope.generateNewLineGraph = function(){
        toNextScreen();
        $scope.formattedData = $scope.lineChartData.flattenAll();
        console.log("creating graph");
        console.log(document.getElementById("canvas"));
        //$('#' + graphID).remove();
        //$(graphContainerID).append('<canvas id="' + graphID + '" height="100" width="100"></canvas>');
        //$(graphContainerID).append('<canvas id="canvas" height="100" width="100" style="width: 100px; height: 100px;"></canvas>');
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