/* eslint-disable no-console */
const chalk = require('chalk');
const auth = require('./components/authorization');
const getSettings = require('./components/getSettings');
const connect = require('./components/connect');

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
