//Stuff to do
//Write angular to send out 2 teams specified in the html
//select the winning team and put it in a new array of teams for the next round
var app = angular.module('myTourneyApp', []);
app.controller('addCtrl', function($scope, $http) {
    $scope.addNewTeam = function() {
        let teamName = $scope.teamName;
        let ranking = $scope.ranking;
        let imageURL = $scope.imageURL;
        let url = "NCAATeamsPost";

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
    };

    $scope.deleteTeam = function() {
        let url = "NCAATeamsDelete";

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
app.controller('showCtrl', function($scope, $http) {
    $scope.teams = [];
    
    $scope.getTeams = function() {
        let url = "NCAATeamsGet";

        $http.get(url).then(function(response) {
            $scope.teams = response;
        });
    };
});
app.controller('tourneyCtrl', function($scope) {

});
