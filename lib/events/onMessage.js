"use strict";

const executeCommand = require("./lib/executeCommand");

module.exports = function (msg, app) {
    const text = msg.content;

    if (text.startsWith(app.config.prefix) && !msg.author.bot) {
        const commandString = text.substr(app.config.prefix.length);
        const commandResult = executeCommand(commandString, msg, app);

        app.log.info(`${msg.author.id}: ${text}`);

        if (commandResult.content.length >= 2000) {
            return msg.channel.sendMessage(app.strings.errorTooLong);
        }

        if (commandResult.type === "text") {
            return msg.channel.sendMessage(commandResult.content);
        } else if (commandResult.type === "code" || commandResult.type === "error") {
            return msg.channel.sendCode("text", commandResult.content);
        } else {
            return msg.channel.sendMessage(app.strings.errorInternal);
        }
    } else {
        return false;
    }
};
