"use strict";

const arrayToText = require("./arrayToText");
const _isString = require("lodash/isString");

module.exports = function (str, msg, app) {
    const callerIsAdmin = app.config.adminIds.includes(msg.author.id);
    const commandLookup = app.cli.parse(str);

    if (commandLookup.success) { //Command lookup successful
        const command = commandLookup.command;

        //Permission check
        if (!command.admin || callerIsAdmin) {
            const commandResult = command.fn(commandLookup.args, msg, app, commandLookup); //Run command fn
            const result = _isString(commandResult) ? [commandResult] : commandResult;

            return result;
        } else {
            if (app.config.options.answerToMissingPerms) {
                return [app.strings.errorPermission, "error"];
            } else {
                return false;
            }
        }
    } else {
        const error = commandLookup.error;

        if (error.type === "missingCommand") {
            if (app.config.options.answerToMissingCommand) {
                const similar = error.similar.filter(commandName => !app.cli.getCommand([commandName]).command.admin);
                const content = [`${app.strings.errorUnknownCommand} '${error.missing}'`];

                if (similar.length > 0) {
                    content.push(`${app.strings.infoSimilar} ${arrayToText(similar)}?`);
                }

                return [content.join("\n"), "error"];
            } else {
                return false;
            }
        } else if (error.type === "missingArg") {
            if (app.config.options.answerToMissingArgs) {
                return [`${app.strings.errorMissingArgument} '${error.missing[0].name}'`, "error"];
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
};