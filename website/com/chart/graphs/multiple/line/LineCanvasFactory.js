graphApp.factory('lineCanvas', [function lineCanvasFactory () {
	var graphContainerID = "#graphContainer";
	var graphID = "#canvas";
	var graphContainerName = "graphContainer";
	var graphName = "canvas";
	var ctx;
	var lineChart;

	var lineFactory = {};

	lineFactory.resetLineGraph = function (data) {
		$(graphID).remove();
		$(graphContainerID).append('<canvas id="canvas"></canvas>');
		ctx = document.getElementById(graphName).getContext("2d");
		lineChart = new Chart(ctx).Line(data, {responsive: true});
	};

	lineFactory.updateData = function (dataSetIndex, pointIndex, newValue) {
		if(!isNaN(newValue)){
			lineChart.datasets[dataSetIndex].points[pointIndex].value = newValue;
			lineChart.update();
		}else{
			console.log("Please enter a number.");
		}
	};

	return lineFactory;
}]);