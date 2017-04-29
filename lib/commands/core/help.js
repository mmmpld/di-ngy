"use strict";

const lineLength = 32;
const indentationLength = 2;

const getIndentation = indentationN => " ".repeat(indentationLength * indentationN);
const getSpacing = (str, indentationN) => " ".repeat(lineLength - str.length - (indentationN * indentationLength));
const getSpacedText = (str, indentationN = 0) => getIndentation(indentationN) + str + getSpacing(str, indentationN);

const getHelpAll = function (commands, app) {
    const result = ["Help", app.strings.separator];

    commands.map.forEach((command, commandName) => {
        if (!command.admin) {
            const groupDesc = command.sub ? "[Group]" : "";

            result.push(`${getSpacedText(commandName)}${command.help.short} ${groupDesc}`);
        }
    });

    return result.join("\n");
};
const getHelpSingle = function (command, app) {
    const result = [`Help for '${command.name}':`, app.strings.separator];
    const aliasText = command.alias.map(key => `'${key}'`).join(", ");

    result.push(getSpacedText("Description:") + command.help.long);
    result.push(getSpacedText("Admin-only:") + command.admin);
    result.push(getSpacedText("Alias:") + aliasText);

    if (command.sub) {
        const subcommandData = command.sub.getAll();
        const subcommandKeys = Array.from(subcommandData.map.keys());

        result.push(getSpacedText("Subcommands:") + subcommandKeys.join(", "));
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

        if (commandLookup.success && !commandLookup.command.admin) {
            return getHelpSingle(commandLookup.command, app);
        } else {
            return `Command '${commandPath[commandPath.length-1]}' not found`;
        }
    } else {
        const commandAll = app.cli.getAll();

        return getHelpAll(commandAll, app);
    }
};
