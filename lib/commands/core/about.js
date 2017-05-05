"use strict";

module.exports = function (args, msg, app) {
    return [`Name: ${app.config.name}\nWebsite: ${app.config.website}`, "md"];
};
