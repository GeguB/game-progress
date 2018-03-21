var mongoose      = require("mongoose");

module.exports = function() {

    var UsersGameSchema = new mongoose.Schema(
        {
            userID: String,
            gameID: String,
            status: String,
            lastUpdated: Date,
            rate: String
        });
    var UsersGameModel = mongoose.model('UsersGameModel', UsersGameSchema);

    var api = {
        addGameToUser: addGameToUser,
        allUsersGames: allUsersGames,
        updateUsersGame: updateUsersGame,
        gameInstances: gameInstances
    };
    return api;

    function addGameToUser(Indata) {
        var currentDate = new Date();
        var UserGame = new UsersGameModel({
            userID:Indata.userID,
            gameID: Indata.game._id,
            status: "New",
            lastUpdated: currentDate,
            rate: "0"
        });
        return UsersGameModel.create(UserGame);
    }

    function allUsersGames(userID) {
        return UsersGameModel.where({userID: userID}).where({ status: { $not: { $eq : 'Deleted' } } }).find().sort({lastUpdated: -1});
    }

    function gameInstances(gameID) {
        return UsersGameModel.where('gameID', gameID).find();
    }

    function updateUsersGame(UserGameID, UserGame) {
        return UsersGameModel.update({_id: UserGameID}, {$set: UserGame})
    }

    function getMongooseModel() {
        return UsersGameModel;
    }
};