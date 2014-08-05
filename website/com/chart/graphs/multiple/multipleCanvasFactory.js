graphApp.factory('multipleCanvasFactory', [function multipleCanvasFactory() {
    var graphContainerID = "#graphContainer";
    var graphID = "#canvas";
    var graphContainerName = "graphContainer";
    var graphName = "canvas";
    var ctx;
    var lineChart;
    var randomScalingFactor = function () {
        return Math.round(Math.random() * 100)
    };

    var multipleCanvasFactory = {};

    multipleCanvasFactory.resetLineGraph = function (data, chartType) {
        $(graphID).remove();
        $(graphContainerID).append('<canvas id="canvas"></canvas>');
        ctx = document.getElementById(graphName).getContext("2d");
        if (chartType === "line") {
            lineChart = new Chart(ctx).Line(data, {responsive: true});
        }else if(chartType === "bar"){
            lineChart = new Chart(ctx).Bar(data, {responsive : true});
        }else if(chartType === "radar"){
            lineChart = new Chart(ctx).Radar(data, {responsive : true});
        }

    };

    multipleCanvasFactory.updateData = function (dataSetIndex, pointIndex, newValue, chartType) {
        if (!isNaN(newValue)) {
            if(chartType === "line"){
                lineChart.datasets[dataSetIndex].points[pointIndex].value = newValue;
            }else if (chartType === "bar"){
                lineChart.datasets[dataSetIndex].bars[pointIndex].value = newValue;
            }else if (chartType === "radar"){
                lineChart.datasets[dataSetIndex].points[pointIndex].value = newValue;
            }
            lineChart.update();
        } else {
            console.log("Please enter a number.");
        }
    };

    multipleCanvasFactory.getTemplateData = function () {
        return { labels: ["label1", "label2", "label3"], datasets: [
            { label: "My First dataset", fillColor: "rgba(220,220,220,0.2)", strokeColor: "rgba(220,220,220,1)", pointColor: "rgba(220,220,220,1)", pointStrokeColor: "#fff", pointHighlightFill: "#fff", pointHighlightStroke: "rgba(220,220,220,1)", data: [randomScalingFactor(), randomScalingFactor(), randomScalingFactor()] },
            { label: "My Second dataset", fillColor: "rgba(151,187,205,0.2)", strokeColor: "rgba(151,187,205,1)", pointColor: "rgba(151,187,205,1)", pointStrokeColor: "#fff", pointHighlightFill: "#fff", pointHighlightStroke: "rgba(151,187,205,1)", data: [randomScalingFactor(), randomScalingFactor(), randomScalingFactor()] }
        ] };
    }

    return multipleCanvasFactory;
}]);