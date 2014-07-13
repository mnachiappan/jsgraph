/**
 * Created by Meyyappan on 7/12/2014.
 */

var graphApp = angular.module('graphApp', []);

graphApp.controller('GraphController', ['$scope', function ($scope) {
    $scope.dataLabels = [
        "January",
        "February",
        "March"
    ];

    $scope.dataSets = [
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

    $scope.createNewValueObj = (function () {
        return {"val": 0};
    });

    $scope.createNewDataObj = (function () {
        var result = [];
        for (var i = 0; i < $scope.dataLabels.length; i++) {
            result.push($scope.createNewValueObj());
        }

        return {"data": result};
    });

    $scope.newDataRow = (function () {
        $scope.dataSets.push($scope.createNewDataObj());
    })

}]);