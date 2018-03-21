(function () {
    angular
        .module("GameProgress")
        .controller("UsersGamesCtrl", UsersGamesCtrl);

    function UsersGamesCtrl($scope, $location, $rootScope, UsersGameService, GameService) {
        $scope.allUsersGames = allUsersGames;
        // $scope.findGameById = findGameById;
        $scope.updateUsersGame = updateUsersGame;
        $scope.deleteUsersGame = deleteUsersGame;
        $scope.statuses = ["New", "Playing", "Finished", "Dropped", "Whishlist", "Owned"];
        $scope.rates = ["1", "2", "3", "4", "5"];

        function updateUsersGame(userGame) {
            UsersGameService
                .updateUsersGame(userGame._id, userGame)
                .then(
                    function(response) {
                        $scope.message = "Data Updated."
                    },
                    function(err) {
                        $scope.error = err;
                    }
                );
        }

        function deleteUsersGame(userGame) {
            userGame.status = "Deleted"
            UsersGameService
                .updateUsersGame(userGame._id, userGame)
                .then(
                    function(response) {
                        $scope.message = "Game removed."
                    },
                    function(err) {
                        $scope.error = err;
                    }
                );
        }

        function allUsersGames(userID){
            UsersGameService
                .allUsersGames(userID)
                .then(
                    function (response) {
                        var userGamesRAW = response.data;
                        var userGamesRAWdata = {};
                        var userGames = [];
                        arrLen = userGamesRAW.length;
                        for (i = 0; i < arrLen; i++)
                        {   var ID = userGamesRAW[i].gameID;
                            userGamesRAWdata[ID] = userGamesRAW[i];
                        }

                        var counter = 0;
                        var counterR = 0;

                        for (i = 0; i < arrLen; i++){
                            GameService
                                .findGameById(userGamesRAW[i].gameID)
                                .then(
                                    function (response) {
                                        userGames.push({id: response.data[0]._id, data: response.data[0]});
                                    }
                                );
                        }
                        $scope.userGamesRAW = userGamesRAWdata;
                        $scope.listUsersGames = userGames;

                    },
                    function (err) {
                        $scope.error = err;
                    }
                )
        }

        // function findGameById(gameID) {
        //     console.log("Controller", gameID);
        //     GameService
        //         .findGameById(gameID)
        //         .then(
        //             function (response) {
        //                 console.log("Controller", response.data);
        //                 return response.data;
        //             }
        //         )
        // }
    }
})();