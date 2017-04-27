"use strict";

const Dingy = require("./index");

const bot = new Dingy({
    "name": "lisa-beta",
    "prefix": "$b ",
    "token": "MzA2NDAzMzA0NjMwNTE3Nzcy.C-NHUw.hYG-YicfjloBehA8xEoE2G4olYs",
    "adminIds": [
        "128985967875850240"
    ],
    "website": "https://github.com/FelixRilling/lisa-bot",
    "files": {
        "data": {
            "dir": "./data/",
            "log": "bot",
            "storage": []
        },
        "assets": "./data/assets/"
    },
    "options": {
        "enableDefaultCommands": true
    }
}, {
    foo: {
        fn: () => "foo",
        alias: ["fuu"],
        args: [],
        admin: false,
        outputType: "code",
        help: {
            short: "Shows help",
            long: "Shows help for one or all commands"
        },
        sub: {
            bar: {
                fn: () => "bar",
                alias: ["baa"],
                args: [],
                admin: false,
                outputType: "code",
                help: {
                    short: "Shows help",
                    long: "Shows help for one or all commands"
                }
            }
        }
    }
}, {}, {
    onInit: () => console.log("INIT"),
    onConnect: () => console.log("CONNECT"),
    onMessage: () => console.log("MESSAGE")
});

bot.connect();
