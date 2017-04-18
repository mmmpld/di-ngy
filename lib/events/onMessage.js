"use strict";

const executeCommand = require("./lib/executeCommand");

module.exports = function (msg, app) {
    const msgSplit = msg.content.split(" ");

    if (msgSplit[0] === app.config.prefix && !msg.author.bot) {
        const commandString = msg.content.substr(msgSplit[0].length);
        const commandResult = executeCommand(commandString, msg, app);

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
