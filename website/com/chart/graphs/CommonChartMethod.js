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
        var fnName = func["fnName"];
        var fn = func["fn"];
        LineChartData.prototype[fnName] = fn;
        BarChartData.prototype[fnName] = fn;
        RadarChartData.prototype[fnName] = fn;
    }
})();