function LineChartData(){
    this.labels = [];
    this.datasets = [];
    var _labelTag = "label";
    var _elemTag = "elem";

    var colorGen = new ColorGenerator();

    var createDataElement = function(dataElem){
        var result = {};
        result[_elemTag] = dataElem;
        return result;
    }


    this.flattenRGBColor = function(color){
        var result = "rgba(" + color.r + "," + color.g + "," + color.b + "," + color.o + ")";
        return result;
    }

    this.flattenData = function(data){
        var result = [];
        for(var i = 0; i<data.length; i++){
            result.push(data[i][_elemTag]);
        }
        return result;
    }

    this.flattenDataset = function(dataset){
        var result = {};
        result["label"] = dataset.label;
        result["fillColor"] = this.flattenRGBColor(dataset.fillColor);
        result["strokeColor"] = this.flattenRGBColor(dataset.strokeColor);
        result["pointColor"] = this.flattenRGBColor(dataset.pointColor);
        result["pointStrokeColor"] = dataset.pointStrokeColor;
        result["pointHighlightFill"] = dataset.pointHighlightFill;
        result["pointHighlightStroke"] = this.flattenRGBColor(dataset.pointHighlightStroke);
        console.log(dataset);
        console.log(dataset.data);
        result["data"] = this.flattenData(dataset.data);
        return result;
    }

    this.flattenAll = function(){
        var result = {};
        var datasets = [];
        result["labels"] = this.flattenLabels();
        for(var i = 0; i<this.datasets.length; i++){
            datasets.push(this.flattenDataset(this.datasets[i]));
        }
        result["datasets"] = datasets;
        return result;
    }

    /*
        Create new dataset with label: 'labelName' and with 'numberLabels' data elements.
     */
    this.addEmptyDataSet = function(numberLabels, labelName){
        var result = {};
        var color = clone(colorGen.getNextColor());
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
            localData.push(createDataElement(0));
        }

        result["data"] = localData;
        return result;
    }

    this.addData = function(label, fillColor, strokeColor, pointColor, pointStrokeColor, pointHighlightFill, pointHighlightStroke, data){
        fillColor = this.standardizeColor(fillColor);
        strokeColor = this.standardizeColor(strokeColor);
        pointColor = this.standardizeColor(pointColor);
        pointHighlightStroke = this.standardizeColor(pointHighlightStroke);

        var localData = []
        for(var i = 0; i < data.length; i++){
            localData.push(createDataElement(data[i]));
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
    }

    this.getDatasets = function(){
        return this.datasets;
    }

    this.getData = function(index){
        if(index >= this.datasets.length){
            return null;
        }else{
            return this.datasets[index];
        }
    }

    this.setDataFillColor = function(index, fillColor){
        fillColor = this.standardizeColor(fillColor);
        this.datasets[index].fillColor = fillColor;
    }

    this.setDataStrokeColor = function(index, strokeColor){
        strokeColor = this.standardizeColor(strokeColor);
        this.datasets[index].strokeColor = strokeColor;
    }

    this.setDataPointColor = function(index, pointColor){
        pointColor = this.standardizeColor(pointColor);
        this.datasets[index].pointColor = pointColor;
    }

    this.setDataPointStrokeColor = function(index, pointStrokeColor){
        this.datasets[index].pointStrokeColor = pointStrokeColor;
    }

    this.setDataPointHighlightFill = function(index, pointHighlightFill){
        pointHighlightFill = this.standardizeColor(pointHighlightFill);
        this.datasets[index].pointHighlightFill = pointHighlightFill;
    }

    this.setData = function(index, data){
        var localData = []
        for(var i = 0; i < data.length; i++){
            localData.push(createDataElement(data[i]));
        }
        this.datasets[index]["data"] = localData;
    }


}

LineChartData.prototype = (new BasicChartData());
/*
    'color' is of form {"r": 10, "b": 20, "g": 30, "o": 0.4}
 */
LineChartData.prototype.standardizeColor = function(color){
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
}