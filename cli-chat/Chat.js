/* eslint-disable no-console */
const chalk = require('chalk');
const auth = require('./components/ConnectWSChat/authorization');
const getSettings = require('./components/ConnectWSChat/checkSettings');
const connect = require('./components/ConnectWSChat/connect');

const settings = getSettings();

(async () => {
    if (!auth.checkIsAuthorized(settings)) {
        const newSettings = await auth.authorization();
        if (newSettings === undefined) {
            console.log(`${chalk.red('You have interrupted chat settings. Disconnected')}`);
            return;
        }
        connect(newSettings);
    } else {
        connect(settings);
    }
})();
