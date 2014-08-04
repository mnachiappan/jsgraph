graphApp.factory('multipleCanvasFactory', [function multipleCanvasFactory () {
	var graphContainerID = "#graphContainer";
	var graphID = "#canvas";
	var graphContainerName = "graphContainer";
	var graphName = "canvas";
	var ctx;
	var lineChart;

	var multipleCanvasFactory = {};

	multipleCanvasFactory.resetLineGraph = function (data, chartType) {
		$(graphID).remove();
		$(graphContainerID).append('<canvas id="canvas"></canvas>');
		ctx = document.getElementById(graphName).getContext("2d");
        if(chartType === "line"){
            lineChart = new Chart(ctx).Line(data, {responsive: true});
        }

	};

	multipleCanvasFactory.updateData = function (dataSetIndex, pointIndex, newValue) {
		if(!isNaN(newValue)){
			lineChart.datasets[dataSetIndex].points[pointIndex].value = newValue;
			lineChart.update();
		}else{
			console.log("Please enter a number.");
		}
	};

	return multipleCanvasFactory;
}]);