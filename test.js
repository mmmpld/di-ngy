"use strict";

const http = require("http");
const Dingy = require("./index");

const config = {
    name: "lisa-bot-beta",
    prefix: "$$",
    token: process.env.DISCORD_KEY_TEST,
    adminIds: [
        "128985967875850240"
    ],
    website: "https://github.com/FelixRilling/lisa-bot",
    files: {
        data: {
            dir: "./data/",
            log: "bot",
            storage: []
        },
        assets: "./data/assets/"
    },
    options: {
        enableDefaultCommands: true,
        commandsAreCaseSensitive: false,
        answerToMissingComman: false,
        answerToMissingArgs: false,
        answerToMissingPerms: false
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
                    resolve("foo");
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
        }
    },
};

const bot = new Dingy(config, commands, {}, {});

//Spoof server for heroku
http.createServer(() => "Bot running").listen(process.env.PORT || 6000);

bot.connect();
