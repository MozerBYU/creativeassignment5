//Stuff to do
//Write angular to send out 2 teams specified in the html
//select the winning team and put it in a new array of teams for the next round
var app = angular.module('myTourneyApp', []);
app.controller('addCtrl', function($scope, $http) {
    $scope.teams = [];
    $scope.tournamentTeams = [];

    $scope.getTeams = function() {
        let url = "NCAATeamsGet";

        $http.get(url).then(function(response) {
            $scope.teams = response.data;
            console.log($scope.teams);
        });
    };

    $scope.getTeams();

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
            $scope.getTeams();
        }).error(function(data, status, headers, config) {
            console.log("post failed");
        });

        $scope.teamName = "";
        $scope.ranking = "";
        $scope.imageURL = "";
    };

    $scope.deleteTeam = function() {
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

    $scope.beginTourney = function() {
        console.log("The tourney has begun");
        $scope.tournamentTeams = [];
        var teamWinners = [];
        var tempWinners = [];
        var winningTeam;

        for (var i = 0; i < $scope.teams.length; i++) {
            teamWinners.push($scope.teams[i]);
        }
        //
        var roundFinished = false;
        var winnerFound = false;

        var incrementNum = 0;
        var roundNum = 0;
        var startingBattleSpot = 0;
        var tournamentNum = 0;
        var winnerIndex = 0;
        var team1Spot;
        var team2Spot;
        var firstTime = true;

        do {
            tempWinners = [];
            tournamentNum = 0;
            roundFinished = false;
            if (firstTime) {
                team1Spot = 0;
                team2Spot = teamWinners.length - 1;
            }
            else {
                team1Spot = 0;
                team2Spot = 1;
            }

            do {

                var randNum = Math.floor((Math.random() * 2) + 1);

                console.log("Rand value " + randNum);

                if (randNum == 1) {
                    console.log("Team 1 wins");
                    tempWinners.push(teamWinners[team1Spot])
                    //delete team 1
                }
                else {
                    console.log("Team 2 wins");
                    tempWinners.push(teamWinners[team2Spot]);
                    //delete team 2
                }

                // incrementNum = startingBattleSpot - 1;
                // winnerIndex = randNum + incrementNum;

                // tempWinners.push(teamWinners[winnerIndex]);

                tournamentNum += 1;

                if (firstTime) {
                    team1Spot += 2;
                    team2Spot = teamWinners.length - 1 - team1Spot;
                }
                else {
                    team1Spot += 2;
                    team2Spot = team1Spot + 1;
                }

                if (tournamentNum == Math.floor(teamWinners.length / 2)) {
                    firstTime = false;
                    roundFinished = true;
                }
            } while (roundFinished == false);

            teamWinners = tempWinners;
            $scope.tournamentTeams.push(tempWinners);

            if (teamWinners.length == 1) {
                winnerFound = true;
            }

            roundNum++;
        } while (winnerFound == false);
        winningTeam = (teamWinners[0]);
        console.log($scope.tournamentTeams);
    };
});
app.controller('showCtrl', function($scope, $http) {

});
