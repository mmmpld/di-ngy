"use strict";

const core_help = require("../commands/core/help");
const core_about = require("../commands/core/about");
const core_eval = require("../commands/core/eval");
const core_dump = require("../commands/core/dump");

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
        alias: [],
        args: [{
            name: "code",
            type: "string",
            required: true,
            help: "Code to run "
        }],
        admin: true,
        hidden: true,
        help: {
            short: "Executes JS code",
            long: "Executes JS code, dangerous!"
        }
    },
    dump: {
        fn: core_dump,
        alias: [],
        args: [{
            name: "code",
            type: "string",
            required: true,
            help: "Code to run and dump"
        }],
        admin: true,
        hidden: true,
        help: {
            short: "Executes JS code and dumps the result",
            long: "Executes JS code and dumps the result as message, dangerous!"
        }
    },
};
