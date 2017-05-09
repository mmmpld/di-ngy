"use strict";

const http = require("http");
const Dingy = require("./index");

const config = {
    name: "lisa-bot-beta",
    prefix: "%",
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
    foo: {
        fn: () => new Promise((resolve, reject) => setTimeout(() => {
            resolve("foo");
        }, 2000)),
        alias: [],
        args: [],
        admin: false,
        hidden: true,
        help: {
            short: "Shows help",
            long: "Shows help for one or all commands"
        }
    },
};

const bot = new Dingy(config, commands, {}, {});

//Spoof server for heroku
http.createServer(() => "Bot running").listen(process.env.PORT || 6000);

bot.connect();
