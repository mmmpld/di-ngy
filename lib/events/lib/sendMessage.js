"use strict";

/**
 * Sends mardown codeblock to channel
 * @param {Clingy} app
 * @param {Object} msg
 * @param {Array} data
 */
module.exports = function (app, msg, data) {
    const text = data[0];
    const code = data[1] || false;
    const files = data[2] || [];

    msg.channel
        .send(String(text), {
            code,
            files
        })
        .then(() => app.log.info("SentMsg"))
        .catch(() => app.log.warning("SentMsgError"));
};
