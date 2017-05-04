"use strict";

const handleCommand = require("./lib/handleCommand");
const sendableTypes = ["text", "code", "error", "image", "file"];

/**
 * Sends text to channel
 * @param {Clingy} app
 * @param {Object} msg
 * @param {String} content
 */
const sendText = function (app, msg, content) {
    msg.channel
        .send(content)
        .then(() => app.log.info("SentText"))
        .catch(() => app.log.warning("SentTextError"));
};

/**
 * Sends mardown codeblock to channel
 * @param {Clingy} app
 * @param {Object} msg
 * @param {String} content
 */
const sendCode = function (app, msg, content) {
    msg.channel
        .send(content, {
            code: "md"
        })
        .then(() => app.log.info("SentCode"))
        .catch(() => app.log.warning("SentCodeError"));
};

/**
 * Sends file to channel
 * @param {Clingy} app
 * @param {Object} msg
 * @param {String} content
 */
const sendFile = function (app, msg, content) {
    msg.channel
        .send("", {
            file: content
        })
        .then(() => app.log.info("SentFile"))
        .catch(() => app.log.warning("SentFileError"));
};

/**
 * onMessage event
 * @param {Object} msg
 * @param {Clingy} app
 * @returns {Boolean}
 */
module.exports = function (msg, app) {
    const text = msg.content;

    if (text.startsWith(app.config.prefix) && !msg.author.bot) {
        const commandString = text.substr(app.config.prefix.length);
        const commandResult = handleCommand(commandString, msg, app);

        if (typeof commandResult.content === "string" && sendableTypes.includes(commandResult.type)) {
            app.log.info("Resolving", text);

            if (commandResult.content.length === 0) {
                app.log.warning("Empty", text);
                sendCode(app, msg, app.strings.infoEmpty);

                return false;
            } else if (commandResult.content.length >= 2000) {
                app.log.warning("TooLong", text);
                sendCode(app, msg, app.strings.errorTooLong);

                return false;
            } else {
                if (commandResult.type === "text") {
                    sendText(app, msg, commandResult.content);

                    return true;
                } else if (commandResult.type === "code" || commandResult.type === "error") {
                    sendCode(app, msg, commandResult.content);

                    return true;
                } else if (commandResult.type === "image" || commandResult.type === "file") {
                    sendFile(app, msg, commandResult.content);

                    return true;
                } else {
                    app.log.error("Error", text);
                    sendCode(app, msg, app.strings.errorInternal);

                    return false;
                }
            }
        } else {
            app.log.info("Ignoring", text);

            return false;
        }
    }

    return false;
};
