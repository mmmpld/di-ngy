"use strict";

module.exports = function (args, msg, app) {
    return [`Name: ${app.config.name}`, `Website: ${app.config.website}`].join("\n");
};
