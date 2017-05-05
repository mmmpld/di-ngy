"use strict";

/**
 * Sends text to channel
 * @param {Clingy} app
 * @param {Object} msg
 * @param {String} text
 */
module.exports = function (app, msg, text) {
    msg.channel
        .send(String(text))
        .then(() => app.log.info("SentText"))
        .catch(() => app.log.warning("SentTextError"));
};
