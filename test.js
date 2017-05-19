"use strict";

const Dingy = require("./index");

const config = {
    name: "lisa-bot-beta",
    prefix: "$$",
    token: process.env.DISCORD_KEY_TEST,
    adminIds: [
        "128985967875850d240"
    ],
    options: {
        enableDefaultCommands: true,
        commandsAreCaseSensitive: true,

        answerToMissingCommand: true,
        answerToMissingArgs: true,
        answerToMissingPerms: true,

        sendFilesForLongReply: true,

        logLevel: "debug"
    }
};

const commands = {
    test: {
        fn: () => "foo",
        alias: [],
        args: [],
        help: {
            short: "Test main",
            long: "Test main"
        },
        sub: {
            async: {
                fn: () => new Promise(resolve => setTimeout(() => {
                    resolve("success");
                }, 2000)),
                alias: [],
                args: [],
                help: {
                    short: "Test async",
                    long: "Test async"
                }
            },
            long: {
                fn: () => "a".repeat(3000),
                alias: [],
                args: [],
                help: {
                    short: "Test long",
                    long: "Test long"
                }
            },
            admin: {
                fn: () => "success",
                alias: [],
                args: [],
                admin: true,
                help: {
                    short: "Test admin",
                    long: "Test admin"
                }
            },
            args: {
                fn: () => "success",
                alias: [],
                args: [{
                    name: "foo",
                    type: "string",
                    required: true
                }],
                help: {
                    short: "Test args",
                    long: "Test args"
                }
            },
        }
    },
};

const bot = new Dingy(config, commands);

bot.connect();
