"use strict";

const resolveCommand = require("./lib/resolveCommand");
const sendMessage = require("./lib/sendMessage");

/**
 * onMessage event
 * @param {Message} msg
 * @param {Dingy} app
 */
module.exports = function (msg, app) {
    const messageText = msg.content;

    if (msg.channel.type !== "text") {
        app.log.debug("Ignoring non-text channel message");
        return;
    }

    /**
     * Basic Check
     * Conditions:
     *    NOT from the system
     *    NOT from a bot
     *    DOES start with prefix
     */
    if (!msg.system && !msg.author.bot && messageText.toLowerCase().startsWith(app.config.prefix.toLowerCase())) {
        const messageCommand = messageText.substr(app.config.prefix.length);
        let commandResult;

        app.log.debug("Resolving", msg.author.id, messageCommand);
        commandResult = resolveCommand(messageCommand, msg, app);

        //commandResult is false if the message should be ignored
        if (commandResult !== false) {
            app.log.debug("Returning", msg.author.id);
            sendMessage(app, msg, commandResult);
        } else {
            app.log.debug("Ignoring");
        }
    }
};
