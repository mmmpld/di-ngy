"use strict";

const MESSAGE_MAX_LENGTH = 2000;

const loadAttachments = require("./lib/loadAttachments");
const resolveCommand = require("./lib/resolveCommand");
const sendMessage = require("./lib/sendMessage");

const attachmentsToArgs = arr => arr.length > 0 ? " " + arr.map(JSON.stringify).join(" ") : "";

/**
 * onMessage event
 * @param {Object} msg
 * @param {Clingy} app
 */
module.exports = function (msg, app) {
    const messageText = msg.content;

    /**
     * Basic Check
     * Conditions:
     *   NOT from the system
     *   NOT from a bot
     *   DOES start with prefix
     */
    if (!msg.system && !msg.author.bot && messageText.startsWith(app.config.prefix)) {
        loadAttachments(msg.attachments)
            .then(attachmentContent => {
                const messageCommand = messageText.substr(app.config.prefix.length);
                const messageCommandWithAttachments = messageCommand + attachmentsToArgs(attachmentContent);
                const commandResult = resolveCommand(messageCommandWithAttachments, msg, app);

                if (commandResult !== false) {
                    app.log.info("Resolving", messageText);

                    if (commandResult[0].length === 0) {
                        //Empty message
                        app.log.warning("Empty", commandResult.content);
                        sendMessage(app, msg, [app.strings.infoEmpty, "error"]);

                        return false;
                    } else if (commandResult[0].length >= MESSAGE_MAX_LENGTH) {
                        //Max-length message
                        if (app.config.options.sendFilesForLongReply) {
                            app.log.info("TooLong", true);
                            sendMessage(app, msg, [app.strings.infoTooLong, "md", [{
                                name: "output.txt",
                                attachment: Buffer.from(commandResult[0])
                            }]]);
                        } else {
                            app.log.warning("TooLong", false);
                            sendMessage(app, msg, [app.strings.errorTooLong, "md"]);
                        }
                    } else {
                        /**
                         * "Normal" sending routine
                         */
                        sendMessage(app, msg, commandResult);

                        return true;
                    }
                } else {
                    app.log.info("Ignoring", messageText);
                }
            })
            .catch(err => {
                app.log.error("FailedToDownload", err);
            });
    }
};
