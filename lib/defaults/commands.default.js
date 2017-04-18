"use strict";

const help = require("../commands/core/help");
const about = require("../commands/core/about");

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
        alias: ["helpme", "how","howto", "tutorial", "intro"],
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
};
