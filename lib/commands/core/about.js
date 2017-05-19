"use strict";

/**
 * Displays bot info
 * @param {Array} args
 * @param {Message} msg
 * @param {Dingy} app
 * @returns {Array}
 */
module.exports = function (args, msg, app) {
    return [app.config.name, "md"];
};
