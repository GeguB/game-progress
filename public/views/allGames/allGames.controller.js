(function () {
    angular
        .module("GameProgress")
        .controller("AllGamesCtrl", AllGamesCtrl);

    function AllGamesCtrl($scope, $location, $rootScope, GameService, UsersGameService) {
        $scope.getAllGames = allGames();
        $scope.mapGametoUser = mapGametoUser;
        $scope.gameAverageRate = gameAverageRate;
        $scope.avgRate = [];
        $scope.votesNo = [];

        function allGames() {
            GameService
                .allGames()
                .then(
                    function (response) {
                        $rootScope.allGames = response.data;
                    },
                    function (err) {
                        $scope.error = err;
                    }
                )
        }

        function mapGametoUser(game, userID) {
            UsersGameService
                .addGameToUser(game, userID)
                .then(function (response) {
                        $scope.apply = response.data;
                        $scope.message = "Game has been added to your list."
                    },
                    function (err) {
                        $scope.error = err;
                    })

        }

        function gameAverageRate(gameID) {
            UsersGameService
                .gameInstances(gameID)
                .then(function (response) {
                        var sumRate = 0.0;
                        var ratesNo = 0.0;
                        var input = response.data;
                        input.forEach(function (record) {
                            if (record.rate != "0")
                            {sumRate = sumRate + parseInt(record.rate);
                            ratesNo = ratesNo + 1;}
                        });
                        var avg = sumRate*1.0/ratesNo;
                        if (isNaN(avg))
                            avg = "No data";
                        $scope.avgRate.push(avg);
                        $scope.votesNo.push(ratesNo);
                    },
                    function (err) {
                        $scope.error = err;
                    })
        }


    }

})();