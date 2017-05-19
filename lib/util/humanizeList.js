"use strict";

/**
 * Turns an array into a humanized string
 * @param {Array} arr
 * @returns {String}
 */
module.exports = arr => arr.map(key => `'${key}'`).join(", ");
