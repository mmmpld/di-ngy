"use strict";

module.exports = {
    name: "#botName#",                  //Name of the bot
    token: "#botToken#",                //Bot-token, should be secret! (Using ENV-vars to store this is recommended)
    prefix: "#botPrefix#",              //Prefix to respond to: prefix:'foo' => responds to "foo help"
    adminIds: ["#userId#"],             //User-IDs of people with admin access, aloowing dangerous commands

    dataPersisted: {                    //Settings for JSON-storage
        dir: "./data/",                 //  Directory to store JSONs, from base directory
        files: ["foo", "bar"]           //  File ids, "foo" will be saved as "foo.json" and can be accessed with bot.dataPersisted.foo
    },
    options: {                          //Customizable options
        enableDefaultCommands: true,    //  If the builting "about", "help" and "eval" commands should be active
        commandsAreCaseSensitive: true, //  If false, "#botToken# hELp" will work too

        answerToMissingCommand: false,  //  If a message should be sent indicating that the command requested doesn't exist
        answerToMissingArgs: true,      //  If a message should be sent indicating that arguments were missing
        answerToMissingPerms: false,    //  If a message should be sent indicating that permissions were missing

        sendFilesForLongReply: true,    //  If replies over 2000 chars should be sent as file instead

        logLevel: "debug"               //  Level of log messages recommended to be either "debug" or "info", but can be any acceptable log-level
    }
};
