graphApp.factory('objectConvert', function (){

	var datasetOrderLine = ["label", "fillColor", "strokeColor", "pointColor", "pointStrokeColor", "pointHighlightFill", "pointHighlightStroke", "data"];

	/*
		["a", "b"] -> '["a", "b"]'
	 */
	var labelsToJSON = function(labels){
		return JSON.stringify(labels);
	};

	var datasetsToJSON = function (datasets){
		var result = "[";

	};

	var converter = {};

	converter.toJSON = function(chartData){
		var LABELS = "labels";
		var DATASETS = "datasets";
		var data = chartData;

		var labelsJSON = labelsToJSON(chartData[LABELS]);
		var datasetsJSON = datasetsToJSON(chartData[DATASETS]);
	};

	converter.toJSON = function (chartData){
		return JSON.stringify(chartData);
	};

	return converter;
});