"use strict";

const fs = require("fs");
const Log = require("log");
const Clingy = require("cli-ngy");
const Discord = require("discord.js");
const merge = require("lodash/merge");
const flatCache = require("flat-cache");

const configDefault = require("./lib/defaults/config.default.json");
const stringsDefault = require("./lib/defaults/strings.default.json");
const commandsDefault = require("./lib/defaults/commands.default");
const userEventsDefault = require("./lib/defaults/userEvents.default");
const onMessage = require("./lib/events/onMessage");

module.exports = class {
    constructor(config, commands = {}, strings = {}, userEvents = {}) {
        const app = this;
        let logStream;
        let commandsMerged;

        console.log("Init:Starting");

        if (!config.token) {
            throw new Error("No token provided!");
        }
        if (!config.adminIds) {
            throw new Error("No admin-IDs provided!");
        }

        app.config = merge(configDefault, config);
        app.strings = merge(stringsDefault, strings);
        app.userEvents = merge(userEventsDefault, userEvents);

        if (app.config.options.enableDefaultCommands) {
            commandsMerged = merge(commandsDefault, commands);
        } else {
            commandsMerged = commands;
        }

        console.log("Init:Loaded Config");

        /**
         * Init Internal instances
         */
        logStream = fs.createWriteStream(`${app.config.files.data.dir}${app.config.files.data.log}.log`);
        console.log("Init:Loaded Log Stream");

        app.log = new Log("debug", logStream);
        console.log("Init:Created Log");

        app.cli = new Clingy(commandsMerged);
        console.log("Init:Created Clingy");

        app.bot = new Discord.Client();
        console.log("Init:Created Discord Client");

        app.data = {};
        app.storage = {};

        app.config.files.data.storage.forEach(storageName => {
            app.storage[storageName] = flatCache.load(`${storageName}.json`, app.config.files.data.dir);
        });
        console.log("Init:Loaded Cache");

        /**
         * Run events
         */
        app.bot.on("message", msg => {
            app.userEvents.onMessage(msg, app);
            onMessage(msg, app);
        });
        console.log("Init:Bound Message Event");

        //User event
        app.userEvents.onInit(app);
        console.log("Init:Finished Start");
    }
    connect() {
        const app = this;

        console.log("Connect:Starting");

        app.bot
            .login(app.config.token)
            .then(() => {
                console.log("Connect:Connected");

                app.bot.user.setGame(app.strings.currentlyPlaying);
                app.userEvents.onConnect(app);
            })
            .catch(err => {
                console.log("Connect:Connection Failure");
                throw new Error("An error occured connecting to the discord API", err);
            });

        console.log("Connect:Attempt Login");
    }
};
