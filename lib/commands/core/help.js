"use strict";

const spaceText = require("./lib/spaceText");
const humanizeList = require("../../util/humanizeList");
const humanizePath = require("../../util/humanizePath");

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

const getHelpSingle = function (command, app) {
    const result = [`Help for '${command.name}':`, app.strings.separator];

    result.push(spaceText("Description:") + command.help.long);

    if (command.alias.length > 0) {
        result.push(spaceText("Alias:") + humanizeList(command.alias));
    }

    if (command.sub) {
        const subcommandData = command.sub.getAll();
        const subcommandKeys = Array.from(subcommandData.map.keys());

        result.push(spaceText("Subcommands:") + humanizeList(subcommandKeys));
    }

    if (command.args.length) {
        result.push(spaceText("Arguments:"));

        command.args.forEach(arg => {
            result.push(spaceText(`${arg.name}:`, 1));
            result.push(spaceText("Description:", 2) + arg.help);
            result.push(spaceText("Type:", 2) + arg.type);
            result.push(spaceText("Required:", 2) + arg.required);
            result.push(spaceText("Default:", 2) + arg.default);
        });
    }

    return result.join("\n");
};

module.exports = function (args, msg, app, cliLookup) {
    const commandPath = cliLookup.commandPathRemains;

    if (commandPath.length) {
        const commandLookup = app.cli.getCommand(commandPath);

        if (commandLookup.success && !commandLookup.command.hidden) {
            return [getHelpSingle(commandLookup.command, app), "md"];
        } else {
            return [`Command '${humanizePath(commandPath)}' not found`, "error"];
        }
    } else {
        const commandAll = app.cli.getAll();

        return [getHelpAll(commandAll, app), "md"];
    }
};
