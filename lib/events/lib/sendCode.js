"use strict";

/**
 * Sends mardown codeblock to channel
 * @param {Clingy} app
 * @param {Object} msg
 * @param {String} text
 */
module.exports= function (app, msg, text) {
    msg.channel
        .send(String(text), {
            code: "md"
        })
        .then(() => app.log.info("SentCode"))
        .catch(() => app.log.warning("SentCodeError"));
};
