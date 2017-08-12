"use strict";

/* eslint no-unused-vars: "off", no-console: "off" */
/**
 * Executes user input
 * @param {Array} args
 */
module.exports = function (args, msg, app) {
    let result = "";

    try {
        result = eval(args.code);
    } catch (err) {
        result = err;
    }

    console.log(result);

    return false;
};
