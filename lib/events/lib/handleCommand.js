"use strict";

const arrayToText = require("./arrayToText");

module.exports = function (str, msg, app) {
    const callerIsAdmin = app.config.adminIds.includes(msg.author.id);
    const commandLookup = app.cli.parse(str);

    if (commandLookup.success) { //Command lookup successful
        const command = commandLookup.command;

        //Permission check
        if (!command.admin || callerIsAdmin) {
            const content = command.fn(commandLookup.args, msg, app, commandLookup); //Run command fn

            return {
                content,
                type: command.outputType
            };
        } else {
            if (app.config.options.answerToMissingArgs) {
                return {
                    content: app.strings.errorPermission,
                    type: "error"
                };
            } else {
                return {
                    content: "", //app.strings.errorPermission,
                    type: "ignored"
                };
            }
        }
    } else { //Command is missing
        const error = commandLookup.error;

        if (error.type === "missingCommand") {
            if (app.config.options.answerToMissingCommand) {
                const similar = error.similar.filter(commandName => !app.cli.getCommand([commandName]).command.admin);
                const content = [`${app.strings.errorUnknownCommand} '${error.missing}'`];

                if (similar.length > 0) {
                    content.push(`${app.strings.infoSimilar} ${arrayToText(similar)}?`);
                }

                return {
                    content: content.join("\n"),
                    type: "error"
                };
            } else {
                return {
                    content: "",
                    type: "ignored"
                };
            }
        } else if (error.type === "missingArg") {
            if (app.config.options.answerToMissingArgs) {
                return {
                    content: `${app.strings.errorMissingArgument} '${error.missing[0].name}'`,
                    type: "text"
                };
            } else {
                return {
                    content: "", //`${app.strings.errorMissingArgument} '${error.missing[0].name}'`,
                    type: "ignored"
                };
            }
        } else {
            return {
                content: "", //app.strings.errorInternal,
                type: "ignored"
            };
        }
    }
};
