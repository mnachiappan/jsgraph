var LineChartData = (function(){
    function LineChartData(){
        this.labels = [];
        this.datasets = [];
        this.colorGen = new ColorGenerator();

    }
    LineChartData.prototype = new LabelData();

    LineChartData.prototype._labelTag = "label";
    LineChartData.prototype._elemTag = "elem";
    LineChartData.prototype.addEmptyDataSet = function(numberLabels, labelName){
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
    LineChartData.prototype.addData = function(label, fillColor, strokeColor, pointColor, pointStrokeColor, pointHighlightFill, pointHighlightStroke, data){
        fillColor = this.standardizeColor(fillColor);
        strokeColor = this.standardizeColor(strokeColor);
        pointColor = this.standardizeColor(pointColor);
        pointHighlightStroke = this.standardizeColor(pointHighlightStroke);

        var localData = []
        for(var i = 0; i < data.length; i++){
            localData.push(this.createDataElement(data[i]));
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
    };

    LineChartData.prototype.lineChartDatasetProperties = ["label", "pointStrokeColor", "pointHighlightFill"];
    LineChartData.prototype.lineChartDatasetRGBColor = ["fillColor", "strokeColor", "pointColor", "pointHighlightStroke"];
    return LineChartData;
})();




