"use strict";

const resolveCommand = require("./lib/resolveCommand");
const sendMessage = require("./lib/sendMessage");

/**
 * onMessage event
 * @param {Message} msg
 * @param {Clingy} app
 */
module.exports = function (msg, app) {
    const messageText = msg.content;

    /**
     * Basic Check
     * Conditions:
     *    NOT from the system
     *    NOT from a bot
     *    DOES start with prefix
     */
    if (!msg.system && !msg.author.bot && messageText.startsWith(app.config.prefix)) {
        const messageCommand = messageText.substr(app.config.prefix.length);
        let commandResult;

        app.log.info("Resolving", msg.author.id, messageCommand);
        commandResult = resolveCommand(messageCommand, msg, app);

        /**
         * commandResult is false if:
         *    command does not exist
         *    OR args are missing
         *    OR permissions are missing
         */
        if (commandResult !== false) {
            app.log.info("Returning", msg.author.id, messageCommand);
            sendMessage(app, msg, commandResult);
        } else {
            app.log.notice("Ignoring", msg.author.id, messageCommand);
        }
    }
};
