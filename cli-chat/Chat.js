/* eslint-disable no-console */
const chalk = require('chalk');
const auth = require('./components/ConnectWSChat/authorization');
const checkSettings = require('./components/ConnectWSChat/checkSettings');
const connect = require('./components/ConnectWSChat/connect');

const settings = checkSettings();
const {
    username, wsChatURL, messagesToDisplayAtStart, reconnectInterval,
} = settings;

(async () => {
    if (!auth.checkIsAuthorized(username, wsChatURL, messagesToDisplayAtStart, reconnectInterval)) {
        const data = await auth.authorization();
        if (data === undefined) {
            console.log(`${chalk.red('You have interrupted chat settings. Disconnected')}`);
            return;
        }
        connect(data.username, data.wsChatURL, data.messagesToDisplayAtStart, data.reconnectInterval);
    }
    connect(username, wsChatURL, messagesToDisplayAtStart, reconnectInterval);
})();
