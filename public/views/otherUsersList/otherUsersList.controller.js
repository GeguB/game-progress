(function () {
    angular
        .module("GameProgress")
        .controller("OtherUsersListCtrl", OtherUsersListCtrl);

    function OtherUsersListCtrl($scope, $location, $rootScope, UserService, UsersGameService, GameService) {
        $scope.allUsersGames = allUsersGames;
        var url = $location.path().split('/');
        $scope.userID = url[3];
        userID = url[3];

        // UserService
        //     .findUserByUsername(url[3])
        //     .then(
        //         function (response) {
        //             console.log("GOT ID FROM NAME", response)
        //         },
        //         function (err) {
        //             $scope.error = err;
        //         });

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
    }
})();