"use strict";

/**
 * Turns an array into a humaized string
 * @param {Array} arr
 * @returns {String}
 */
module.exports = function (arr) {
    return arr.map((item, index, data) => {
        if (index === 0) {
            return `'${item}'`;
        } else if (index < data.length - 1) {
            return `, '${item}'`;
        } else {
            return ` or '${item}'`;
        }
    }).join("");
};
