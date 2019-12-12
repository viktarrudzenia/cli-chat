/* eslint-disable no-console */
const chalk = require('chalk');
const auth = require('./components/ConnectWSChat/authorization');
const checkSettings = require('./components/ConnectWSChat/checkSettings');
const connect = require('./components/ConnectWSChat/connect');

const reconnectInterval = 2 * 1000;

const settings = checkSettings();
const { username, wsChatURL } = settings;

(async () => {
    if (!auth.checkIsAuthorized(username, wsChatURL)) {
        const data = await auth.authorization();
        if (data === undefined) {
            console.log(`${chalk.red('You have interrupted chat settings. Disconnected')}`);
            return;
        }
        connect(data.username, data.wsChatURL, reconnectInterval);
    }
    connect(username, wsChatURL, reconnectInterval);
})();
