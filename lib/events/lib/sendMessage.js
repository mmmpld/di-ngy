"use strict";

const MAX_SIZE_MESSAGE = 2000;
const MAX_SIZE_FILE = 6.4e+7;

const _isString = require("lodash/isString");
const isEmpty = str => str.length === 0;
const isTooBigForMsg = str => str.length > MAX_SIZE_MESSAGE;
const isTooBigForFile = str => str.length > MAX_SIZE_FILE;

/**
 * Sends a message
 * @param {Dingy} app
 * @param {message} msg
 * @param {String} text
 * @param {Boolean|String} code
 * @param {Array} files
 */
const send = function (app, msg, text, code, files) {
    msg
        .channel
        .send(String(text), {
            code,
            files
        })
        .then(() => app.log.info("SentMsg"))
        .catch(() => app.log.warning("SentMsgError"));
};

const performChecks = function (app, msg, text, code, files) {
    if (isEmpty(text)) {
        app.log.notice("Empty");
        send(app, msg, app.strings.infoEmpty, "error", []);
    } else if (isTooBigForMsg(text)) {
        if (app.config.options.sendFilesForLongReply) {
            const outputFile = Buffer.from(text);

            if (isTooBigForFile(outputFile)) {
                app.log.warning("TooLong", true);
                send(app, msg, app.strings.infoTooLong, "error", []);
            } else {
                const outputAttachment = {
                    name: "output.txt",
                    attachment: outputFile
                };

                app.log.notice("TooLong", true);
                send(app, msg, app.strings.infoTooLong, "error", [outputAttachment]);
            }
        } else {
            app.log.warning("TooLong", false);
            send(app, msg, app.strings.errorTooLong, "error", []);
        }
    } else {
        //Normal case
        app.log.debug("Sending");
        send(app, msg, text, code, files);
    }
};

/**
 * Performs checks and waits for promise, then sends a message
 * @param {Dingy} app
 * @param {message} msg
 * @param {Array} data
 */
module.exports = function (app, msg, data) {
    const isPromise = !_isString(data[0]);
    const code = data[1] || false;
    const files = data[2] || [];

    console.log(data);

    if (isPromise) {
        data[0]
            .then(resolvedText => {
                app.log.debug("TextAsync");
                performChecks(app, msg, resolvedText, code, files);
            })
            .catch(err => {
                app.log.warn("ErrorInPromise", err);
            });
    } else {
        const text = data[0];

        app.log.debug("TextSync");
        performChecks(app, msg, text, code, files);
    }
};
