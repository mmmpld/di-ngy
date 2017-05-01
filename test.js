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

const bot = new Dingy(config, {}, {}, {});

//Spoof server for heroku
http.createServer(() => "Bot running").listen(process.env.PORT || 6000);

bot.connect();
