"use strict";

module.exports = {
    name: "#botName#",
    prefix: "#botPrefix#",
    token: "#botToken#",
    adminIds: [
        "#userId#"
    ],
    website: "https://github.com/FelixRilling/di-ngy",
    files: {
        data: {
            dir: "./data/",
            storage: [
                "data"
            ]
        }
    },
    options: {
        enableDefaultCommands: true,
        commandsAreCaseSensitive: true,

        answerToMissingCommand: false,
        answerToMissingArgs: false,
        answerToMissingPerms: false,

        sendFilesForLongReply: true,
    }
};
