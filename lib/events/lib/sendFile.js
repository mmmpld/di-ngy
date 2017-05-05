"use strict";

/**
 * Sends file to channel
 * @param {Clingy} app
 * @param {Object} msg
 * @param {String} content
 */
module.exports = function (app, msg, text, files) {
    msg.channel
        .send(String(text), {
            files
        })
        .then(() => app.log.info("SentFile"))
        .catch(() => app.log.warning("SentFileError"));
};
