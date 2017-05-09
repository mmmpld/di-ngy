"use strict";

/*const ENCLOSINGS = [
    ["(", ")"],
    ["[", "]"],
    ["{", "}"],
];*/

const resolveCommand = require("./lib/resolveCommand");
const sendMessage = require("./lib/sendMessage");

/**
 * onMessage event
 * @param {Message} msg
 * @param {Clingy} app
 */
module.exports = function (msg, app) {
    const messageText = msg.content;
    const isCommandMessage = str => str.startsWith(app.config.prefix);
    const getCommandMessage = str =>str.substr(app.config.prefix.length);

    /**
     * Basic Check
     * Conditions:
     *    NOT from the system
     *    NOT from a bot
     *    DOES start with prefix
     */
    if (!msg.system && !msg.author.bot && isCommandMessage(messageText)) {
        const messageCommand = getCommandMessage(messageText);
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
            app.log.debug("Returning", msg.author.id);
            sendMessage(app, msg, commandResult);
        } else {
            app.log.debug("Ignoring");
        }
    }
};
