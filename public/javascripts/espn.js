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

    $scope.beginTourney = function() {
        console.log("The tourney has begun");
        $scope.teams = [];
        $scope.teamWinners = [];
        $scope.tempWinners = [];
        var winningTeam;

        $scope.getTeams = function() {
            let url = "NCAATeamsGet";

            $http.get(url).then(function(response) {
                $scope.teams = response;
            });
        };

        for (var i = 0; i < teams.length; i++) {
            teamWinners.push(teams.at(i));
        }
        //
        var roundFinished = false;
        var winnerFound = false;

        var incrementNum = 0;
        var roundNum = 0;
        var startingBattleSpot = 0;
        var tournamentNum = 0;
        var winnerIndex = 0;

        do {
            tempWinners = [];
            tournamentNum = 0;
            roundFinished = false;

            do {
                startingBattleSpot = tournamentNum * 2;
                var randNum = ((Math.random() * 2) + 1);
                
                console.log("Rand value " + randNum);

                if (randNum == 1) {
                    console.log("Team 1 wins");
                    console.log("Spot " + startingBattleSpot);
                    teamWinners.splice(startingBattleSpot, 1);
                    //delete team 1
                }
                else {
                    console.log("Team 2 wins");
                    console.log("Spot " + (startingBattleSpot + 1));
                    teamWinners.splice(startingBattleSpot + 1, 1);
                    //delete team 2
                }

                incrementNum = startingBattleSpot - 1;
                winnerIndex = randNum + incrementNum;

                tempWinners.push(teamWinners.at(winnerIndex));

                tournamentNum++;

                if (tournamentNum == (teamWinners.length / 2)) {
                    roundFinished = true;
                }
            } while (roundFinished == false);

            teamWinners = [];

            var teamWinners = tempWinners.splice();

            if (teamWinners.length == 1) {
                winnerFound = true;
            }

            roundNum++;
        } while (winnerFound == false);
        $scope.winningTeam.toString(teamWinners[0]);
        console.log("Winning team " + teamWinners[0]);
    }
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
