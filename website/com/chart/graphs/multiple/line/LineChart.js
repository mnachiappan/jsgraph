var ColorGenerator = (function(){
    function ColorGenerator(){
        this.currentColor = -1;
    }

    ColorGenerator.prototype.getNextColor = function(){
        if(this.currentColor >= this.color_data.length - 1){
            this.currentColor = 0;
        }else{
            this.currentColor = this.currentColor + 1;
        }
        var color = this.color_data[this.currentColor];
        
        return color;
    }

    ColorGenerator.prototype.color_data = [
        //{r: 240, g: 248, b: 255}, //"aliceblue": 
        {r: 218, g: 165, b: 32}, //"goldenrod": 
        {r: 119, g: 136, b: 153}, //"lightslategrey": 
        {r: 70, g: 130, b: 180}, //"steelblue": 
        {r: 147, g: 112, b: 216}, //"mediumpurple": 
        {r: 222, g: 184, b: 135} //"burlywood": 
    ];
    return ColorGenerator;
})();

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

// Common methods amongst all graphs
// Steps to add new common method
// create var and set a function
// add the new function to commonFns
// 
(function(){

    var createDataElement = function(dataElem){
        var result = {};
        result[this._elemTag] = dataElem;
        return result;
    };

    var flattenRGBColor = function(color){
        var result = "rgba(" + color.r + "," + color.g + "," + color.b + "," + color.o + ")";
        return result;
    };

    var flattenData = function(data){
        var result = [];
        for(var i = 0; i<data.length; i++){
            result.push(data[i][this._elemTag]);
        }
        return result;
    };

    var flattenDataset = function(dataset){
        var result = {};
        var lineChartDatasetProperties = this.lineChartDatasetProperties;
        var lineChartDatasetRGBColor = this.lineChartDatasetRGBColor;
        for(var i = 0; i < lineChartDatasetProperties.length; i++){
            var property = lineChartDatasetProperties[i];
            result[property] = dataset[property];
        }
        for(var i = 0; i < lineChartDatasetRGBColor.length; i++){
            var property = lineChartDatasetRGBColor[i];
            result[property] = this.flattenRGBColor(dataset[property]);
        }
        result["data"] = this.flattenData(dataset["data"]);
        return result;
    };

    var flattenAll = function(){
        var result = {};
        var datasets = [];
        result["labels"] = this.flattenLabels();
        for(var i = 0; i<this.datasets.length; i++){
            datasets.push(this.flattenDataset(this.datasets[i]));
        }
        result["datasets"] = datasets;
                console.log("flattenAll");
        console.log(result);
        return result;

    };

    var standardizeColor = function(color){
        if(color["r"] > 255){
            color["r"] = 255;
        }
        if(color["b"] > 255){
            color["b"] = 255;
        }
        if(color["g"] > 255){
            color["g"] = 255;
        }
        if(color["o"] > 1){
            color["o"] = 1;
        }
        return color;
    };

    var commonFns = [
        {
            fnName : "createDataElement",
            fn : createDataElement
        },
        {
            fnName : "flattenRGBColor",
            fn : flattenRGBColor
        },
        {
            fnName : "flattenData",
            fn : flattenData
        },
        {
            fnName : "flattenDataset",
            fn : flattenDataset
        },
        {
            fnName : "flattenAll",
            fn : flattenAll
        },
        {
            fnName : "standardizeColor",
            fn : standardizeColor
        }
    ];

    for (var i = 0; i < commonFns.length; i++){
        var func = commonFns[i];
        LineChartData.prototype[func["fnName"]] = func["fn"];        
    }
})();


