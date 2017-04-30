"use strict";

//ONLY ADMINS CAN USE THIS
module.exports = function (args, msg, app) {
    let result = "";

    try {
        result = eval(args.string);
    } catch (err) {
        result = err;
    }

    return String(result);
};
