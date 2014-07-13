/**
 * Created by Meyyappan on 7/12/2014.
 */

var graphApp = angular.module('graphApp', []);

graphApp.factory('DataFactory', function () {
    var dataFactory = {};

    var dataLabels = [
        {"label": "January"},
        {"label": "February"},
        {"label": "March"}
    ];

    var dataSets = [
        {
            "data": [
                {"val": 1},
                {"val": 22},
                {"val": 3}
            ]
        },
        {
            "data": [
                {"val": 4},
                {"val": 5},
                {"val": 6}
            ]
        }
    ];

    var createNewValueObj = (function () {
        return {"val": 0};
    });

    var createNewDataObj = (function (numberOfLabels) {
        var data = [];
        for (var i = 0; i < numberOfLabels; i++) {
            data.push(createNewValueObj());
        }

        return {"data": data};
    });

    dataFactory["newDataRow"] = (function (numberOfLabels) {
        return (createNewDataObj(numberOfLabels));
    });

    dataFactory["dataLabels"] = dataLabels;
    dataFactory["dataSets"] = dataSets;

    return dataFactory;
});

graphApp.controller('GraphController', ['$scope', 'DataFactory', function ($scope, DataFactory) {
    $scope.dataLabels = [];

    $scope.dataSets = [];

    $scope.newDataRow = (function () {
        $scope.dataSets.push(DataFactory.newDataRow($scope.dataLabels.length));
    });

    $scope.addLabel = (function (newLabel, index) {
        for (var i = 0; i < $scope.dataSets.length; i++) {
            dataArray = $scope.dataSets[i]["data"];
            dataArray.splice(index, 0, {"val": 0});
        }
        $scope.dataLabels.splice(index, 0, {"label": newLabel});
    });

    $scope.pushData = (function(){
        var label = $scope.dataLabels[0]["label"];
        var data = [$scope.dataSets[0]["data"][0]["val"], $scope.dataSets[1]["data"][0]["val"]];
        window.myLine.addData(data, label);
        window.myLine.update();
    });

    // should remove

     var randomScalingFactor = function () {
        return Math.round(Math.random() * 100)
    };
    var lineChartData = {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
            {
                label: "My First dataset",
                fillColor: "rgba(220,220,220,0.2)",
                strokeColor: "rgba(220,220,220,1)",
                pointColor: "rgba(220,220,220,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: [65, 59, 80, 81, 56, 55, 40]
            },
            {
                label: "My Second dataset",
                fillColor: "rgba(151,187,205,0.2)",
                strokeColor: "rgba(151,187,205,1)",
                pointColor: "rgba(151,187,205,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(151,187,205,1)",
                data: [28, 48, 40, 19, 86, 27, 90]
            }
        ]
    };
    var ctx = document.getElementById("canvas").getContext("2d");
    var chrt = new Chart(ctx);
    window.myLine = chrt.Line(lineChartData,
        {responsive: true}
    );


    // should remove

}]);