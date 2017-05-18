"use strict";

const Dingy = require("./index");

const config = {
    name: "lisa-bot-beta",
    prefix: "$$",
    token: process.env.DISCORD_KEY_TEST,
    adminIds: [
        "128985967875850240"
    ]
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

const bot = new Dingy(config, commands);

bot.connect();
