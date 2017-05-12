"use strict";

const core_help = require("../commands/core/help");
const core_about = require("../commands/core/about");
const core_eval = require("../commands/core/eval");

module.exports = {
    about: {
        fn: core_about,
        alias: ["info"],
        args: [],
        help: {
            short: "About this bot",
            long: "Shows info about this bot"
        }
    },
    help: {
        fn: core_help,
        alias: ["helpme", "how", "howto", "man"],
        args: [{
            name: "command",
            type: "string",
            default: null,
            required: false,
            help: "Command to get help for"
        }],
        help: {
            short: "Shows help",
            long: "Shows help for one or all commands"
        }
    },
    eval: {
        fn: core_eval,
        alias: ["dump", "debug"],
        args: [{
            name: "string",
            type: "string",
            required: true,
            help: "Command to run"
        }],
        admin: true,
        hidden: true,
        help: {
            short: "Executes a JS command",
            long: "Executes a JS command, only the admin can use this"
        }
    },
};
