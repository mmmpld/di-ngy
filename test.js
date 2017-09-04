"use strict";

const Dingy = require("./index");

const config = {
    name: "lisa-beta",
    prefix: "$$",
    token: process.env.DISCORD_KEY,
    adminIds: [
        "222957769131687936"
    ],
    options: {
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
            weirdtype: {
                fn: () => true,
                alias: [],
                args: [],
                help: {
                    short: "Test weirdtype",
                    long: "Test weirdtype"
                }
            },
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
                    required: true
                }],
                help: {
                    short: "Test args",
                    long: "Test args"
                }
            },
            save: {
                fn: (args) => bot.redisClient.set("save test", args.data),
                alias: [],
                args: [{
                    name: "data",
                    required: true
                }],
                help: {
                    short: "Save value",
                    long: "Save value"
                }
            },
        }
    },
};

const bot = new Dingy(config, commands);

bot.connect();
