var mongoose         = require("mongoose");
module.exports = function(app) {

    var gameModel = require("../../models/game/game.model.server.js")();

    app.post  ('/api/game', addGame);
    app.get  ('/api/games', allGames);
    app.get ('/api/game/:id', findGameById);

    function addGame(req, res) {
        var newGame = req.body;
        gameModel.addGame(newGame)
            .then(
                res.sendStatus(200))
        ;
    }

    function allGames(req, res) {
        gameModel
            .allGames()
            .then(
                function (games) {
                    res.json(games);
                },
                function () {
                    res.status(400).send(err);
                }
            );
    }

    function findGameById(req, res) {
        gameModel
            .findGameById(req.params.id)
            .then(
                function (game) {
                    return res.status(200).json(game);
                },
                function () {
                    return res.status(400).send(err).end;
                }
            );
    }

};