"use strict";

/**
 * Loads the contents of all attachments trough promises
 * @param {Collection} attachments
 * @returns {Array}
 */
module.exports = function (app, attachments) {
    const arr = attachments.array();
    const container = [];
    const result = [];

    arr.forEach(attachment => {
        const download = new Promise((resolve, reject) => {
            fetch(attachment.url)
                .then(response => {
                    response.text().then(text => {
                        result.push(text);
                        resolve();
                    });
                })
                .catch(err => {
                    reject(err);
                });
        });

        container.push(download);
    });

    return Promise
        .all(container)
        .then(() => result)
        .catch(err => err);
};
