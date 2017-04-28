"use strict";

//ONLY ADMINS CAN USE THIS
module.exports = function (args, msg, app) {
    try {
        return eval(args.string);
    } catch (err) {
        return err;
    }
};
