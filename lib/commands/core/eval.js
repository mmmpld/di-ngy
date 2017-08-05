"use strict";

/**
 * Executes user input
 * @param {Array} args
 */
module.exports = function (args) {
    let result = "";

    try {
        result = eval(args.code);
    } catch (err) {
        result = err;
    }

    console.log(result);

    return false;
};
