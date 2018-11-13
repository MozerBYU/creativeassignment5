//Stuff to do
//Write angular to send out 2 teams specified in the html
//select the winning team and put it in a new array of teams for the next round
var app = window.angular.module('myTourneyApp', []);
app.controller('addCtrl', function($scope, $http) {
    $scope.teams = [];

    $scope.getTeams = function() {
        console.log('get teams')
        let url = "NCAATeamsGet";

        $http.get(url).then(function(response) {
            console.log('get worked')
            console.log(response.data);
            $scope.teams = response.data;
        });
    };
    
    $scope.addNewTeam = function() {
        let teamName = $scope.teamName;
        let ranking = $scope.ranking;
        let imageURL = $scope.imageURL;
        let url = "NCAATeamsPost";

        if ($scope.teamName.length > 0 && $scope.ranking.length > 0) {
            let newTeam = { name: teamName, rankingSpot: ranking, avatarUrl: imageURL };
            $http({
                url: url,
                method: "POST",
                data: newTeam
            }).success(function(data, status, headers, config) {
                console.log("post worked");
            }).error(function(data, status, headers, config) {
                console.log("post failed");
            });

            $scope.teamName = "";
            $scope.ranking = "";
            $scope.imageURL = "";
        }
    };

    $scope.deleteTeam = function() {
        console.log("in delete");
        let url = "NCAATeamsDelete?q=";
        url += $scope.ranking;

        $http({
            url: url,
            method: "DELETE",
        }).success(function(data, status, headers, config) {
            console.log("delete worked");
            $scope.addNewTeam();
        }).error(function(data, status, headers, config) {
            console.log("delete failed");
        });
    };
});

app.controller('tourneyCtrl', function($scope) {

});
