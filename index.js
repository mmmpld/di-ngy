"use strict";

const fs = require("fs");
const Log = require("log");
const Clingy = require("cli-ngy");
const Discord = require("discord.js");
const merge = require("lodash/merge");
const flatCache = require("flat-cache");

const configDefault = require("./lib/defaults/config.default");
const stringsDefault = require("./lib/defaults/strings.default");
const commandsDefault = require("./lib/defaults/commands.default");
const userEventsDefault = require("./lib/defaults/userEvents.default");

const onMessage = require("./lib/events/onMessage");

/**
 * Di-ngy class
 * @class
 */
module.exports = class {
    /**
     * Creates Di-ngy instance
     * @constructor
     * @param {Object} config
     * @param {Object} commands
     * @param {Object} strings
     * @param {Object} userEvents
     */
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
        logStream = fs.createWriteStream(`${app.config.files.data.dir}${app.config.files.data.log}.log`);
        app.log = new Log("debug", logStream);
        app.log.info("Init:Loaded Log Stream");

        app.cli = new Clingy(commandsMerged, {
            caseSensitive: app.config.options.commandsAreCaseSensitive,
            suggestSimilar: app.config.options.answerToMissingCommand,
        });
        app.log.info("Init:Created Clingy");

        app.bot = new Discord.Client();
        app.log.info("Init:Created Discord Client");

        app.data = {};
        app.storage = {};

        app.config.files.data.storage.forEach(storageName => {
            app.storage[storageName] = flatCache.load(`${storageName}.json`, app.config.files.data.dir);
        });
        app.log.info("Init:Loaded Cache");

        /**
         * Run events
         */
        app.bot.on("message", msg => {
            app.userEvents.onMessage(msg, app);
            onMessage(msg, app);
        });
        app.log.info("Init:Bound Message Event");

        //User event
        app.log.info("Init:Finished Start");
        app.userEvents.onInit(app);
    }
    /**
     * Connects the bot to Discord
     */
    connect() {
        const app = this;

        app.log.info("Connect:Starting");

        app.bot
            .login(app.config.token)
            .then(() => {
                console.log("Connection established");
                app.log.info("Connect:Connected");
                app.bot.user.setGame(app.strings.currentlyPlaying);
                app.userEvents.onConnect(app);
            })
            .catch(err => {
                console.log("Connection failure");
                app.log.info("Connect:Connection Failure");

                throw new Error("An error occured connecting to the discord API", err);
            });

        app.log.info("Connect:Attempt Login");
    }
};
