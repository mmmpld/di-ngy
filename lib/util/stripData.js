"use strict";

const {
    isObject,
    isNil,
    isString,
    isArray,
    isNumber,
    isBoolean,
    isFunction
} = require("lodash");
const {
    decycle
} = require("./cycle");

const BLOCKED_KEYS = /\$\w+|_\w+|client|guild|lastMessage/;

const stripFilterValues = value => !isNil(value) && !isFunction(value);
const stripFilterEntries = entry => !BLOCKED_KEYS.test(entry[0]) && stripFilterValues(entry[1]);

const strip = function (val) {
    if (isString(val) || isNumber(val) || isBoolean(val)) {
        return val;
    } else if (isArray(val)) {
        return val.filter(stripFilterValues);
    } else if (isObject(val)) {
        const result = {};

        Object.entries(val)
            .filter(stripFilterEntries)
            .forEach(entry => {
                result[entry[0]] = entry[1];
            });

        return result;
    } else {
        return null;
    }
};

module.exports = function (obj) {
    const result = Object.assign({}, obj);

    return strip(decycle(result));
};
