"use strict";

const spaceText = require("../../util/spaceText");
const humanizeList = require("../../util/humanizeList");
const humanizePath = require("../../util/humanizePath");

/**
 * Displays list of all non-hidden commands
 * @param {Object} commands
 * @param {Dingy} app
 * @returns {Array}
 */
const getHelpAll = function (commands, app) {
    const result = ["Help", app.strings.separator];

    commands.map.forEach((command, commandName) => {
        if (!command.hidden) {
            const groupType = command.sub ? "[GROUP]" : "";

            result.push(`${spaceText(commandName)}${command.help.short} ${groupType}`);
        }
    });

    return result.join("\n");
};

/**
 * Displays help for a single command
 * @param {Object} command
 * @param {Array} commandPath
 * @param {Dingy} app
 * @returns {Array}
 */
const getHelpSingle = function (command, commandPath, app) {
    const result = [`Help for ${humanizePath(commandPath)}:`, app.strings.separator];

    result.push(spaceText("Description:") + command.help.long);

    if (command.alias.length > 0) {
        result.push(spaceText("Alias:") + humanizeList(command.alias));
    }

    if (command.sub) {
        const subcommandData = command.sub.getAll();
        const subcommandKeys = Array.from(subcommandData.map.keys());

        result.push(spaceText("Subcommands:") + humanizeList(subcommandKeys));
    }

    if (command.args.length > 0) {
        result.push(spaceText("Arguments:"));

        command.args.forEach(arg => {
            result.push(spaceText(`${arg.name}:`, 1));

            if (arg.help) {
                result.push(spaceText("Description:", 2) + arg.help);
            }

            result.push(spaceText("Required:", 2) + arg.required);

            if (!arg.required) {
                result.push(spaceText("Default:", 2) + arg.default);
            }
        });
    }

    return result.join("\n");
};

/**
 * Displays help
 * @param {Array} args
 * @param {Message} msg
 * @param {Dingy} app
 * @param {Array} cliLookup
 * @returns {Array}
 */
module.exports = function (args, msg, app) {
    const commandPath = args._all;

    if (commandPath.length > 0) {
        const commandLookup = app.cli.getCommand(commandPath);

        if (commandLookup.success && !commandLookup.command.hidden) {
            return [getHelpSingle(commandLookup.command, commandPath, app), "md"];
        } else {
            return [`Command '${humanizePath(commandPath)}' not found`, "error"];
        }
    } else {
        const commandAll = app.cli.getAll();

        return [getHelpAll(commandAll, app), "md"];
    }
};
