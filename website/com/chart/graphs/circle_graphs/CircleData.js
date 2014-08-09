/**
 * Created by Meyyappan on 8/9/2014.
 */
var CircleData = (function(){
    /*
        datasets = [
            {
                "value": 3,
                "color": {r: 218, g: 165, b: 32, o: 1},
                "highlight": {r: 218, g: 165, b: 32, o: 0.8},
                "label": "label"
            },...
        ]
     */
    function CircleData(){
        this.datasets = [];
        this.ColorGenerator = new ColorGenerator();
    }

    CircleData.prototype.addEmptyDataSet = function () {
        var dataset = {};
        var value = 0;
        var color = this.ColorGenerator.getNextColor();
        var highlight = clone(color);
        color["o"] = 1;
        highlight["o"] = 0.8;
        var label = "label";
        dataset.value = value;
        dataset.color = color;
        dataset.highlight = highlight;
        dataset.label = label;
        datasets.push(dataset);
    };


    return CircleData;
})();