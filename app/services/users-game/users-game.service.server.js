var mongoose = require("mongoose");
module.exports = function (app) {

    var usersGameModel = require("../../models/users-game/users-game.model.server.js")();

    var auth = authorized;
    app.post('/api/user/game', auth, addGameToUser);
    app.get('/api/user/games', auth, allUsersGames);
    app.put('/api/user/game/:id', auth, updateUsersGame);
    app.get('/api/user/games/:id', gameInstances);


    function updateUsersGame(req, res) {
        var UserGame = req.body;
        usersGameModel
            .updateUsersGame(req.params.id.slice(3), UserGame)
            .then(
                function(UserGame){
                    return;
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(users){
                    res.json(users);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function addGameToUser(req, res) {
        var Indata = req.body;
        usersGameModel.addGameToUser(Indata)
            .then(
                res.sendStatus(200))
        ;
    }

    function allUsersGames(req, res) {
        usersGameModel
            .allUsersGames(req.query.userID)
            .then(
                function (games) {
                    res.json(games);
                },
                function () {
                    res.status(400).send(err);
                }
            );
    }

    function gameInstances(req, res) {
        usersGameModel
            .gameInstances(req.params.id.slice(3))
            .then(
                function (games) {
                    return res.status(200).json(games);
                },
                function () {
                    return res.status(400).send(err).end;
                }
            );
    }

    function authorized(req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    };

};