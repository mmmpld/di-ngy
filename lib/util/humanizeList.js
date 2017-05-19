"use strict";

module.exports = arr => arr.map(key => `'${key}'`).join(", ");
