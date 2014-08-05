var RadarChartData = (function () {
    function RadarChartData() {
        this.labels = [];
        this.datasets = [];
        this.colorGen = new ColorGenerator();
    }

    RadarChartData.prototype = new LabelData();

    RadarChartData.prototype._labelTag = "label";
    RadarChartData.prototype._elemTag = "elem";

    RadarChartData.prototype.addEmptyDataSet = function(numberLabels, labelName){
        var result = {};
        var color = clone(this.colorGen.getNextColor());
        var color2 = clone(color);
        result["label"] = labelName;
        color2["o"] = 0.2;
        result["fillColor"] = color2;
        color["o"] = 1;
        result["strokeColor"] = color;
        result["pointColor"] = color;
        result["pointStrokeColor"] = "#fff"
        result["pointHighlightFill"] = "#fff"
        result["pointHighlightStroke"] = color;
        var localData = []
        for(var i = 0; i < numberLabels; i++){
            localData.push(this.createDataElement(0));
        }
        result["data"] = localData;
        this.datasets.push(result);
    };

    RadarChartData.prototype.lineChartDatasetProperties = ["label", "pointStrokeColor", "pointHighlightFill"];
    RadarChartData.prototype.lineChartDatasetRGBColor = ["fillColor", "strokeColor", "pointColor", "pointHighlightStroke"];

    return RadarChartData;
})();