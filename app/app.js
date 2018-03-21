
module.exports = function(app) {

    var userService = require("./services/user/user.service.server.js")(app);
    var gameService = require("./services/game/game.service.server.js")(app);
    var usersGameService = require("./services/users-game/users-game.service.server.js")(app);

}