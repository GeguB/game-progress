(function () {
    angular
        .module("GameProgress")
        .factory("GameService", GameService);

    function GameService($http) {
        var api = {
            addGame: addGame,
            allGames: allGames,
            findGameById: findGameById
        };
        return api;

        function addGame(game) {
            return $http.post('/api/game', game)
        }

        function allGames() {
            return $http.get('/api/games')
        }

        function findGameById(gameID) {
            return $http.get('/api/game/'+gameID)
        }
    }
})();