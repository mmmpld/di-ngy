"use strict";

/**
 * Exits the bot
 * @param {Array} args
 * @param {Message} msg
 * @param {Dingy} app
 */
module.exports = function (args, msg, app) {
    app.bot.setTimeout(() => {
        process.exit();
    }, 1000);

    return "Shutting down.";
};
