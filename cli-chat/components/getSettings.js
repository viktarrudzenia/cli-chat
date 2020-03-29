const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

function getSettings() {
    let username;
    let wsChatURL;
    let messagesToDisplayAtStart;
    let reconnectInterval;
    let dateColor;
    let otherUsersColor;
    let myColor;

    const fileWithSettings = fs.readFileSync(path.join(__dirname, '../settings/settings.config'), { flag: 'as+' }, { encoding: 'utf-8' });
    const regExpUsername = /(?<=USERNAME = ")[^"]+/;
    const regExpWsChatURL = /(?<=WS_CHAT_URL = ")[^"]+/;
    const regExpMessagesToDisplayAtStart = /(?<=MESSAGES_TO_DISPLAY_AT_START = ")[^"]+/;
    const regExpReconnectInterval = /(?<=RECONNECT_INTERVAL = ")[^"]+/;
    const regExpDateColor = /(?<=DATE_COLOR = ")[^"]+/;
    const regExpOtherUsersColor = /(?<=OTHER_USERS_COLOR = ")[^"]+/;
    const regExpMyColor = /(?<=MY_COLOR = ")[^"]+/;


    if (regExpUsername.exec(fileWithSettings) !== null
    || regExpWsChatURL.exec(fileWithSettings) !== null
    || regExpMessagesToDisplayAtStart.exec(fileWithSettings) !== null
    || regExpReconnectInterval.exec(fileWithSettings) !== null
    || regExpDateColor.exec(fileWithSettings) !== null
    || regExpOtherUsersColor.exec(fileWithSettings) !== null
    || regExpMyColor.exec(fileWithSettings) !== null
    ) {
        [username] = regExpUsername.exec(fileWithSettings);
        [wsChatURL] = regExpWsChatURL.exec(fileWithSettings);
        [messagesToDisplayAtStart] = regExpMessagesToDisplayAtStart.exec(fileWithSettings);
        [reconnectInterval] = regExpReconnectInterval.exec(fileWithSettings);
        [dateColor] = regExpDateColor.exec(fileWithSettings);
        [otherUsersColor] = regExpOtherUsersColor.exec(fileWithSettings);
        [myColor] = regExpMyColor.exec(fileWithSettings);
    } else {
        console.log(chalk.red(`You do not have settings for chat, now you need to answer a couple of questions
                    Press enter when you are ready `));
    }
    return {
        username,
        wsChatURL,
        messagesToDisplayAtStart,
        reconnectInterval,
        dateColor,
        otherUsersColor,
        myColor,
    };
}

module.exports = getSettings;
