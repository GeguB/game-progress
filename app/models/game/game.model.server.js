var mongoose      = require("mongoose");

module.exports = function() {

    var GameSchema = new mongoose.Schema(
        {
            name: String,
            releaseDate: String,
            platform: String,
            genres: String,
            addedDate: Date
        });
    var GameModel = mongoose.model('GameModel', GameSchema);

    var api = {
        addGame: addGame,
        allGames: allGames,
        findGameById: findGameById
    };
    return api;

    function addGame(game) {
        var currentDate = new Date();
        var Game = new GameModel({
            name: game.name,
            releaseDate: game.releaseDate,
            platform: game.platform,
            genres: game.genres,
            addedDate: currentDate
        });
        return GameModel.create(Game);

    }

    function allGames() {
        return GameModel.find().sort({name: 1});
    }

    function findGameById(gameID) {
        return GameModel.where('_id', gameID).find();
    }

    function getMongooseModel() {
        return GameModel;
    }
};
