(function () {
    angular
        .module("GameProgress")
        .controller("NewGameCtrl", NewGameCtrl);

    function NewGameCtrl($scope, $location, $rootScope, GameService) {
        $scope.newGame = newGame;

        function newGame(game) {
            GameService
                .addGame(game)
                .then(
                    function (response) {
                        var game = response.data;
                        $scope.message = "Game has been added."
                        // if(game != null){
                            // $rootScope.gamePage = game;
                            // $location.url("/game-details");
                        // }
                    },
                    function (err) {
                        $scope.error = err;
                    }
                )
        }
    }
})();