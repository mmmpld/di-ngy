"use strict";

const MESSAGE_MAX_LENGTH = 2000;
const handleCommand = require("./lib/handleCommand");
const mapFromObject = require("./lib/mapFromObject");
const sendText = require("./lib/sendText");
const sendCode = require("./lib/sendCode");
const sendFile = require("./lib/sendFile");
const types = mapFromObject({
    text: sendText,
    code: sendCode,
    error: sendCode,
    image: sendFile,
    file: sendFile
});

/**
 * onMessage event
 * @param {Object} msg
 * @param {Clingy} app
 * @returns {Boolean}
 */
module.exports = function (msg, app) {
    const messageText = msg.content;

    if (!msg.system && !msg.author.bot && messageText.startsWith(app.config.prefix)) {
        const commandString = messageText.substr(app.config.prefix.length);
        const commandResult = handleCommand(commandString, msg, app);

        if (types.has(commandResult.type)) {
            app.log.info("Resolving", messageText);

            if (commandResult.content.length === 0) {
                /**
                 * Empty message
                 */
                app.log.warning("Empty", commandResult.content);
                sendCode(app, msg, app.strings.infoEmpty);

                return false;
            } else if (commandResult.content.length >= MESSAGE_MAX_LENGTH) {
                /**
                 * Max-length message
                 */
                if (app.config.options.sendFilesForLongReply) {
                    app.log.info("TooLong", true);
                    sendFile(app, msg, app.strings.infoTooLong, [{
                        name: "output.txt",
                        attachment: Buffer.from(commandResult.content)
                    }]);

                    return true;
                } else {
                    app.log.warning("TooLong", false);
                    sendCode(app, msg, app.strings.errorTooLong);

                    return false;
                }
            } else {
                /**
                 * "Normal" sending routine
                 */
                const sendFn = types.get(commandResult.type);

                sendFn(app, msg, commandResult.content, commandResult.secondary);

                return true;
            }
        } else {
            app.log.info("Ignoring", messageText);

            return false;
        }
    }

    return false;
};
