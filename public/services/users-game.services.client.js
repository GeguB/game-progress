(function () {
    angular
        .module("GameProgress")
        .factory("UsersGameService", UsersGameService);

    function UsersGameService($http) {
        var api = {
            addGameToUser: addGameToUser,
            allUsersGames: allUsersGames,
            updateUsersGame: updateUsersGame,
            gameInstances: gameInstances
        };
        return api;

        function addGameToUser(game, userID) {
            var Indata = {'game': game, 'userID': userID};
            return $http.post('/api/user/game', Indata)
        }

        function updateUsersGame(UserGameID, UserGame) {
            return $http.put('/api/user/game/:id'+UserGameID, UserGame);
        }

        function allUsersGames(userID) {
            return $http.get('/api/user/games', {params: { userID: userID }})
        }

        function gameInstances(gameID) {
            return $http.get('/api/user/games/:id'+gameID)
        }
    }
})();