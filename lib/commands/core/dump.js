"use strict";

/* eslint no-unused-vars: "off" */
/**
 * Executes user input and sends it
 * @param {Array} args
 * @returns {Array}
 */
module.exports = function (args, msg, app) {
    let result = "";

    try {
        result = eval(args.code);
    } catch (err) {
        result = err;
    }

    return [String(result), "js"];
};
