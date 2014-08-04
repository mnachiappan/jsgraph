var BarChartData = (function () {
    function BarChartData() {
        this.labels = [];
        this.datasets = [];
        this.colorGen = new ColorGenerator();
    }

    BarChartData.prototype = new LabelData();

    BarChartData.prototype._labelTag = "label";
    BarChartData.prototype._elemTag = "elem";

    BarChartData.prototype.addEmptyDataSet = function (numberLabels, labelName) {
        var result = {};
        var color = clone(this.colorGen.getNextColor());
        var color2 = clone(color);
        var color3 = clone(color);
        var color4 = clone(color);

        result["label"] = labelName;

        color["o"] = 0.5;
        result["fillColor"] = color;

        color2["o"] = 0.8;
        result["strokeColor"] = color2;

        color3["o"] = 0.75;
        result["highlightFill"] = color3;

        color4["o"] = 1;
        result["highlightStroke"] = color4;

        var localData = [];
        for(var i = 0; i < numberLabels; i++){
            localData.push(this.createDataElement(0));
        }
        result["data"] = localData;
        this.datasets.push(result);
    };

    BarChartData.prototype.lineChartDatasetProperties = ["label"];
    BarChartData.prototype.lineChartDatasetRGBColor = ["fillColor", "strokeColor", "highlightFill", "highlightStroke"];
    return BarChartData;
})();