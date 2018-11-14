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

        $scope.getTeams = function() {
            let url = "NCAATeamsGet";

            $http.get(url).then(function(response) {
                $scope.teams = response;
            });
        };

        for (var i = 0; i < teams.size(); i++) {
            teamWinners.at(i) = teams.at(i);
        }
        //
        var continueBool = false;
        var roundFinished = false;
        var winnerFound = false;

        var battleWinner = 0;
        var incrementNum = 0;
        var roundNum = 0;
        var startingBattleSpot = 0;
        var tournamentNum = 0;
        var winnerVectorIndex = 0;

        do {
            teamWinners[0]; //Reset the size to 0
            tournamentNum = 0;
            continueBool = false;
            roundFinished = false;

            do {
                startingBattleSpot = tournamentNum * 2;
                do {
                    for (int i = startingBattleSpot, j = 1; i < startingBattleSpot + 2; i++, j++) {
                        if (i == startingBattleSpot) {
                            cout << "Type";
                        }
                        else {
                            cout << "type";
                        }
                        cout << " \"" << j << "\" if you prefer " << restaurantVector.at(i);
                        if (i == startingBattleSpot) {
                            cout << " or" << endl;
                        }
                    }
                    cout << endl;

                    battleWinner = ErrorCheckInput(false);
                    if (battleWinner != -1) {
                        continueBool = true;
                    }
                } while (continueBool == false);

                incrementNum = startingBattleSpot - 1;
                winnerVectorIndex = battleWinner + incrementNum;

                tempRestaurantVector.push_back(restaurantVector.at(winnerVectorIndex));

                tournamentNum++;

                if (tournamentNum == (restaurantVector.size() / 2)) {
                    roundFinished = true;
                }
            } while (roundFinished == false);

            restaurantVector.resize(NUM_ELEMENTS);

            for (unsigned int m = 0; m < tempRestaurantVector.size(); m++) {
                restaurantVector.push_back(tempRestaurantVector.at(m));
            }

            if (restaurantVector.size() == 1) {
                winnerFound = true;
            }

            roundNum++;
        } while (winnerFound == false);
        cout << "The winning restaurant is " << restaurantVector.at(0) << "." << endl;



        //
        for

        var indexSpot =


            var randNum = ((Math.random() * 2) + 1);

        if (randNum == 1) {
            console.log("Team 1 wins");
            teams.splice(indexSpot, 1);
            //delete team 1
        }
        else {
            console.log("Team 2 wins");
            //delete team 2
        }
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
