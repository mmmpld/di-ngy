"use strict";

const jsonToYaml = require("../../util/jsonToYaml");
const humanizePath = require("../../util/humanizePath");

/**
 * Displays list of all non-hidden commands
 * @param {Object} commands
 * @param {Dingy} app
 * @returns {Array}
 */
const getHelpAll = function (commands, app) {
    const result = {};

    commands.map.forEach((command, commandName) => {
        if (!command.hidden) {
            if (command.sub) {
                result[commandName] = {
                    desc: command.help.short,
                    sub: Object.keys(command.sub)
                };
            } else {
                result[commandName] = command.help.short;
            }
        }
    });

    return ["Help", app.strings.separator, jsonToYaml(result)].join("\n");
};

/**
 * Displays help for a single command
 * @param {Object} command
 * @param {Array} commandPath
 * @param {Dingy} app
 * @returns {Array}
 */
const getHelpSingle = function (command, commandPath, app) {
    const result = {
        desc: command.help.long
    };

    if (command.alias.length > 0) {
        result.alias = command.alias;
    }

    if (command.args.length > 0) {
        result.args = command.args;
    }

    if (command.sub) {
        result.sub = command.sub.getAll().keysAliased;
    }

    return [`Help for '${humanizePath(commandPath)}'`, app.strings.separator, jsonToYaml(result)].join("\n");
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

        if (commandLookup.success) {
            return [getHelpSingle(commandLookup.command, commandPath, app), "yaml"];
        } else {
            return [`Command '${humanizePath(commandPath)}' not found`, "error"];
        }
    } else {
        const commandAll = app.cli.getAll();

        return [getHelpAll(commandAll, app), "yaml"];
    }
};
