/* eslint-disable no-console */
const chalk = require('chalk');
const connect = require('./components/ConnectWSChat/connect');
const auth = require('./components/ConnectWSChat/authorization');
const checkSettings = require('./components/ConnectWSChat/checkSettings');

const reconnectInterval = 2 * 1000;

const settings = checkSettings();
const { username, wsChatURL } = settings;

(async () => {
    if (!auth.checkIsAuthorized(username, wsChatURL)) {
        const data = await auth.authorization();
        return data === undefined
            ? console.log(`${chalk.red('You have interrupted chat settings. Disconnected')}`)
            : connect(data.username, data.wsChatURL, reconnectInterval);
    }
    connect(username, wsChatURL, reconnectInterval);
})();
