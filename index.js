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

        /**
         * Init Internal instances
         */
        logStream = fs.createWriteStream(app.config.files.data.dir + app.config.files.data.log);

        app.log = new Log("debug", logStream);
        app.cli = new Clingy(commandsMerged);
        app.bot = new Discord.Client();
        app.data = flatCache.load(app.config.files.data.storage, app.config.files.data.dir);

        /**
         * Run events
         */
        app.bot.on("message", msg => {
            app.userEvents.onMessage(msg, app);
            onMessage(msg, app);
        });

        //User event
        app.userEvents.onInit(app);
    }
    connect() {
        const app = this;

        app.bot
            .login(app.config.token)
            .then(() => {
                app.bot.user.setGame(app.strings.currentlyPlaying);
                app.userEvents.onConnect(app);
            })
            .catch(err => {
                throw new Error("An error occured connecting to the discord API", err);
            });
    }
};
