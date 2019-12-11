/* eslint-disable no-console */
const WebSocket = require('ws');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const prompts = require('prompts');
const readline = require('readline');
const notifier = require('node-notifier');
const TelegramBot = require('./components/TelegramBot/telegramBot');
const connect = require('./components/ConnectWSChat/connect');
const auth = require('./components/ConnectWSChat/authorization');

const reconnectInterval = 2 * 1000;


// const allChatData = [];

// ///////////////////////////////////////////////////////////////////////////////////////////////////////

// const settings = fs.readFileSync('telegramBotSettings.config', { flag: 'as+' }, { encoding: 'utf-8' });
// const regExpUsername = /(?<=USERNAME = ")[^"]+/;
// const regExpWsChatURL = /(?<=WSCHATURL = ")[^"]+/;

// if (regExpUsername.exec(settings) !== null || regExpWsChatURL.exec(settings !== null)) {
//     username = regExpUsername.exec(settings)[0];
//     wsChatURL = regExpWsChatURL.exec(settings)[0];
// } else {
//     console.log(chalk.red(`You do not have settings for chat, now you need to answer a couple of questions
//                     Press enter when you are ready `));
// }

// ///////////////////////////////////////////////////////////////////////////////////////////////////////

let username;
let wsChatURL;

const settings = fs.readFileSync(path.join(__dirname, '/settings/settings.config'), { flag: 'as+' }, { encoding: 'utf-8' });
const regExpUsername = /(?<=USERNAME = ")[^"]+/;
const regExpWsChatURL = /(?<=WSCHATURL = ")[^"]+/;

if (regExpUsername.exec(settings) !== null || regExpWsChatURL.exec(settings !== null)) {
    username = regExpUsername.exec(settings)[0];
    wsChatURL = regExpWsChatURL.exec(settings)[0];
} else {
    console.log(chalk.red(`You do not have settings for chat, now you need to answer a couple of questions
                    Press enter when you are ready `));
}

// ///////////////////////////////////////////////////////////////////////////////////////////////////////
(async () => {
    if (!auth.checkIsAuthorized(username, wsChatURL)) {
        const data = await auth.authorization();
        data === undefined
            ? console.log(`${chalk.red('You have interrupted chat settings. Disconnected')}`)
            : connect(data.username, data.wsChatURL, reconnectInterval);
    } else {
        connect(username, wsChatURL, reconnectInterval);
    }
})();
