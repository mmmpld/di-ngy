"use strict";

module.exports = function () {
    return {
        currentlyPlaying: "with bots",

        separator: "-".repeat(12),

        infoSimilar: "Did you mean",
        infoEmpty: "Empty message",
        infoTooLong: "The output was too long to print",
        infoInternal: "Internal error",

        errorUnknownCommand: "Unkown command",
        errorMissingArgs: "Missing argument",
        errorPermission: "You don't have permissions to access this command",
        errorTooLong: "The output was too long to print",
        errorInternal: "Internal error",
    };
};
