"use strict";

const fetch = require("node-fetch");

/**
 * Loads an attachment and returns contents
 * @param {MessageAttachment} attachment
 * @returns {Promise}
 */
module.exports = function (attachment) {
    return new Promise((resolve, reject) => {
        fetch(attachment.url)
            .then(response => {
                response.text()
                    .then(text => {
                        resolve(text);
                    });
            })
            .catch(err => {
                reject(err);
            });
    });
};
