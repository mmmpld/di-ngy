"use strict";

const help = require("../commands/core/help");
const about = require("../commands/core/about");
const _eval = require("../commands/core/eval");

module.exports = {
    about: {
        fn: about,
        alias: ["info"],
        args: [],
        admin: false,
        outputType: "code",
        help: {
            short: "About this bot",
            long: "Shows info about this bot"
        }
    },
    help: {
        fn: help,
        alias: ["helpme", "how", "howto", "tutorial", "intro"],
        args: [{
            name: "command",
            type: "string",
            default: null,
            required: false,
            help: "Command to get help for"
        }],
        admin: false,
        outputType: "code",
        help: {
            short: "Shows help",
            long: "Shows help for one or all commands"
        }
    },
    eval: {
        fn: _eval,
        alias: ["dump", "debug"],
        args: [{
            name: "string",
            type: "string",
            required: true,
            help: "Command to run"
        }],
        admin: true,
        outputType: "code",
        help: {
            short: "Executes a JS command",
            long: "Executes a JS command [DANGEROUS]"
        }
    },
};
