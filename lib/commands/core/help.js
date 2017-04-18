"use strict";

const lineLength = 32;
const indentationLength = 2;

const getIndentation = n => " ".repeat(indentationLength * n);
const getSpacing = (str, n = 0) => " ".repeat(lineLength - str.length - (n * indentationLength));

const getHelpAll = function (commands, app) {
    const result = ["Help", app.strings.separator];

    commands.map.forEach((command, commandName) => {
        result.push(`${commandName}${getSpacing(commandName)}${command.help.short}`);
    });

    return result.join("\n");
};
const getHelpSingle = function (command, app) {
    const result = [`Help for '${command.name}':`, app.strings.separator];
    const aliasText = command.alias.map(key => `'${key}'`).join(", ");

    result.push(`Description:${getSpacing("Description:")}${command.help.long}`);
    result.push(`Admin-only:${getSpacing("Admin-only:")}${command.admin}`);
    result.push(`Alias:${getSpacing("Alias:")}${aliasText}`);

    if (command.args.length) {
        result.push("Arguments:");

        command.args.forEach(arg => {
            result.push(`${getIndentation(1)}${arg.name}:`);
            result.push(`${getIndentation(2)}Description:${getSpacing("Description:", 2)}${arg.name}`);
            result.push(`${getIndentation(2)}Type:${getSpacing("Type:", 2)}${arg.type}`);
            result.push(`${getIndentation(2)}Required:${getSpacing("Required:", 2)}${arg.required}`);
            result.push(`${getIndentation(2)}Default:${getSpacing("Default:", 2)}${arg.default}`);
        });
    }

    return result.join("\n");
};

module.exports = function (args, msg, app) {
    const isCommandHelp = Boolean(args.command);

    if (isCommandHelp) {
        const commandLookup = app.cli.getCommand(args.command);

        if (commandLookup.success) {
            return getHelpSingle(commandLookup.command, app);
        } else {
            return `Command '${args.command}' not found`;
        }
    } else {
        const commandAll = app.cli.getAll();

        return getHelpAll(commandAll, app);
    }
};
