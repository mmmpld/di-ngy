"use strict";

const LENGTH_LINE = 32;
const LENGTH_INDENTATION = 2;
const SPACE = " ";


/**
 * Returns Indentation
 * @param {Number} n
 * @returns {String}
 */
const getIndentation = n => SPACE.repeat(LENGTH_INDENTATION * n);


/**
 * Gets Spacing needed to fill up
 * @param {String} str
 * @param {Number} n
 * @returns {String}
 */
const getSpacing = (str, n) => SPACE.repeat(LENGTH_LINE - str.length - (n * LENGTH_INDENTATION));


/**
 * Formats string as intended and spaced line
 * @param {String} str
 * @param {Number} [n=0]
 * @returns {String}
 */
module.exports = (str, n = 0) => getIndentation(n) + str + getSpacing(str, n);
