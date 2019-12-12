const fs = require('fs');
const path = require('path');
const prompts = require('prompts');
const chalk = require('chalk');

function checkIsAuthorized(settings) {
    const {
        username, wsChatURL, messagesToDisplayAtStart, reconnectInterval, dateColor, otherUsersColor, myColor,
    } = settings;

    if (username === undefined
        || wsChatURL === undefined
        || messagesToDisplayAtStart === undefined
        || reconnectInterval === undefined
        || dateColor === undefined
        || otherUsersColor === undefined
        || myColor === undefined) {
        return false;
    }
    return true;
}

async function authorization() {
    const initialSetiings = [
        {
            type: 'text',
            name: 'apply',
            message: 'Press enter to configure your chat settings',
            style: 'invisible',
            initial: '',
        },
    ];

    let onCancel = (prompt) => {
        console.log(`    --------------------------------------------------------------------------------------------
                    You avoid chat settings. Now you wil be disconnected...
    --------------------------------------------------------------------------------------------`);

        return false;
    };

    const settingsForChat = await prompts(initialSetiings, { onCancel });

    if (settingsForChat.apply === undefined) {
        return;
    }

    const questions = [
        {
            type: 'text',
            name: 'username',
            message: 'Hello stranger. Please enter your username?',
            initial: 'anonymous',
            validate: (value) => {
                if (value.length >= 128) {
                    return 'Length of your username should be less than 128 letters';
                } if (value.trim() === '') {
                    return 'Input correct username please, only spaces are not allowed';
                }
                return true;
            },
            format: (value) => value.trim(),
        },
        {
            type: 'text',
            name: 'wsChatURL',
            message: 'Please enter websocket link for chat or press enter if this chat "ws://chat.shas.tel"',
            initial: 'ws://chat.shas.tel',
            validate: (value) => {
                if (value.length >= 128) {
                    return 'Length of your wsChatURL should be less than 128 letters';
                } if (value.trim() === '') {
                    return 'Only spaces are not allowed';
                }
                return true;
            },
            format: (value) => value.trim(),
        },
        {
            type: 'number',
            name: 'messagesToDisplayAtStart',
            message: 'Please enter how much messages to display when you connect to chat"',
            validate: (value) => {
                if (value < 1) {
                    return 'Input correct amount. It should be a number > 0';
                }
                return true;
            },
        },
        {
            type: 'number',
            name: 'reconnectInterval',
            message: 'Please enter number of seconds for reconnect to chat',
            validate: (value) => {
                if (value < 1) {
                    return 'Input correct amount. It should be a number > 0';
                }
                return true;
            },
            format: (value) => value * 1000,
        },
        {
            type: 'select',
            name: 'dateColor',
            message: 'Pick a color for a Date',
            choices: [
                { title: 'Recommended preference', description: 'different color for each user', value: 'blue' },
                { title: 'Blue', value: 'blue' },
                { title: 'Green', value: 'green' },
                { title: 'Red', value: 'red' },
                { title: 'Cyan', value: 'cyan' },
                { title: 'White', value: 'white' },
                { title: 'Black', value: 'black' },
                { title: 'Yellow', value: 'yellow' },
                { title: 'Magenta', value: 'magenta' },
            ],
            initial: 0,
        },
        {
            type: 'select',
            name: 'otherUsersColor',
            message: 'Pick a color for other users',
            choices: [
                { title: 'Recommended preference', description: 'different color for each user', value: 'different color for each user' },
                { title: 'Blue', value: 'blue' },
                { title: 'Green', value: 'green' },
                { title: 'Red', value: 'red' },
                { title: 'Cyan', value: 'cyan' },
                { title: 'White', value: 'white' },
                { title: 'Black', value: 'black' },
                { title: 'Yellow', value: 'yellow' },
                { title: 'Magenta', value: 'magenta' },
            ],
            initial: 0,
        },
        {
            type: 'select',
            name: 'myColor',
            message: 'Pick a color for you',
            choices: [
                { title: 'Recommended preference', description: 'black', value: 'black' },
                { title: 'Blue', value: 'blue' },
                { title: 'Green', value: 'green' },
                { title: 'Red', value: 'red' },
                { title: 'Cyan', value: 'cyan' },
                { title: 'White', value: 'white' },
                { title: 'Black', value: 'black' },
                { title: 'Yellow', value: 'yellow' },
                { title: 'Magenta', value: 'magenta' },
            ],
            initial: 0,
        },
    ];

    const onSubmit = (prompt, answer) => console.log(`Got it. your ${chalk.red(prompt.name)} now is: ${chalk.green(answer)}`);
    onCancel = () => {
        console.log(`    --------------------------------------------------------------------------------------------
                    You avoid chat settings. Now you wil be disconnected...
    --------------------------------------------------------------------------------------------`);
        return false;
    };

    const response = await prompts(questions, { onSubmit, onCancel });
    if (!checkIsAuthorized(response)) {
        return;
    }

    const writeStream = fs.createWriteStream(path.join(__dirname, '../settings/settings.config'), { encoding: 'utf8' });

    writeStream.write(`USERNAME = "${response.username}"
WS_CHAT_URL = "${response.wsChatURL}"
MESSAGES_TO_DISPLAY_AT_START = "${response.messagesToDisplayAtStart}"
RECONNECT_INTERVAL = "${response.reconnectInterval}"
DATE_COLOR = "${response.dateColor}"
OTHER_USERS_COLOR = "${response.otherUsersColor}"
MY_COLOR = "${response.myColor}"
`);

    return {
        username: response.username,
        wsChatURL: response.wsChatURL,
        messagesToDisplayAtStart: response.messagesToDisplayAtStart,
        reconnectInterval: response.reconnectInterval,
        dateColor: response.dateColor,
        otherUsersColor: response.otherUsersColor,
        myColor: response.myColor,
    };
}

module.exports = {
    authorization,
    checkIsAuthorized,
};
