"use strict";

const LENGTH_LINE = 32;
const LENGTH_INDENTATION = 2;
const SPACE = " ";

const getIndentation = n => SPACE.repeat(LENGTH_INDENTATION * n);
const getSpacing = (str, n) => SPACE.repeat(LENGTH_LINE - str.length - (n * LENGTH_INDENTATION));

module.exports = (str, n = 0) => getIndentation(n) + str + getSpacing(str, n);
