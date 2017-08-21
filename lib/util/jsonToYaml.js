"use strict";

const {
    decycle
} = require("./cycle");
const {
    isObject,
    isArray,
    isFunction,

    isString,
    isNumber,
    isBoolean
} = require("lodash");

const LINEBREAK = "\n";
const INDENT_CHAR = " ";
const INDENT_SIZE = 2;

const indent = (str, factor) => INDENT_CHAR.repeat(factor * INDENT_SIZE) + str;
const addBreak = str => LINEBREAK + str;

const format = function (val, factor = 0) {
    if (isString(val)) {
        return val;
    } else if (isNumber(val) || isBoolean(val)) {
        return String(val);
    } else if (isArray(val)) {
        return addBreak(val
            .filter(item => !isFunction(item))
            .map(item => indent(format(item, factor + 1), factor))
            .join(LINEBREAK));
    } else if (isObject(val)) {
        return addBreak(Object.entries(val)
            .filter(entry => !isFunction(entry[1]))
            .map(entry => indent(`${entry[0]}: ${format(entry[1], factor + 1)}`, factor))
            .join(LINEBREAK));
    } else {
        return "";
    }
};

module.exports = function (obj) {
    return format(decycle(obj)).replace(/\s+\n/g, "\n").trim();
};
