"use strict";

const LENGTH_LINE = 32;
const LENGTH_INDENTATION = 2;

const getIndentation = n => " ".repeat(LENGTH_INDENTATION * n);
const getSpacing = (str, n) => " ".repeat(LENGTH_LINE - str.length - (n * LENGTH_INDENTATION));
const getSpacedText = (str, n = 0) => getIndentation(n) + str + getSpacing(str, n);
const humanizeArray = arr => arr.map(key => `'${key}'`).join(", ");
const humanizePath = arr => arr.join("=>");

const getHelpAll = function (commands, app) {
    const result = ["Help", app.strings.separator];

    commands.map.forEach((command, commandName) => {
        if (!command.hidden) {
            const groupType = command.sub ? "[GROUP]" : "";

            result.push(`${getSpacedText(commandName)}${command.help.short} ${groupType}`);
        }
    });

    return result.join("\n");
};

const getHelpSingle = function (command, app) {
    const result = [`Help for '${command.name}':`, app.strings.separator];

    result.push(getSpacedText("Description:") + command.help.long);

    if (command.alias.length > 0) {
        result.push(getSpacedText("Alias:") + humanizeArray(command.alias));
    }

    if (command.sub) {
        const subcommandData = command.sub.getAll();
        const subcommandKeys = Array.from(subcommandData.map.keys());

        result.push(getSpacedText("Subcommands:") + humanizeArray(subcommandKeys));
    }

    if (command.args.length) {
        result.push(getSpacedText("Arguments:"));

        command.args.forEach(arg => {
            result.push(getSpacedText(`${arg.name}:`, 1));
            result.push(getSpacedText("Description:", 2) + arg.help);
            result.push(getSpacedText("Type:", 2) + arg.type);
            result.push(getSpacedText("Required:", 2) + arg.required);
            result.push(getSpacedText("Default:", 2) + arg.default);
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
