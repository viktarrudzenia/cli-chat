const fs = require('fs');
const path = require('path');
const prompts = require('prompts');
const chalk = require('chalk');

function checkIsAuthorized(username, wsChatURL, messagesToDisplayAtStart, reconnectInterval) {
    if (username === undefined
        || wsChatURL === undefined
        || messagesToDisplayAtStart === undefined
        || reconnectInterval === undefined) {
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

    const settings = await prompts(initialSetiings, { onCancel });

    if (settings.apply === undefined) {
        // console.log(`${chalk.red('You have interrupted chat settings. Disconnected')}`);
        return;
    }

    // ///////////////////////////////////////////////////////////////////////////////////////////

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
            initial: '1000',
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
            initial: '3',
            validate: (value) => {
                if (value < 1) {
                    return 'Input correct amount. It should be a number > 0';
                }
                return true;
            },
        },
    ];

    const onSubmit = (prompt, answer) => console.log(`Got it. your ${chalk.red(prompt.name)} now is: ${chalk.green(answer)}`);
    onCancel = (prompt) => {
        console.log(`    --------------------------------------------------------------------------------------------
                    You avoid chat settings. Now you wil be disconnected...
    --------------------------------------------------------------------------------------------`);
        return false;
    };

    const response = await prompts(questions, { onSubmit, onCancel });

    if (!checkIsAuthorized(response.username, response.wsChatURL, response.messagesToDisplayAtStart, response.reconnectInterval)) {
        return;
    }

    const writeStream = fs.createWriteStream(path.join(__dirname, '../../settings/settings.config'), { encoding: 'utf8' });

    writeStream.write(`USERNAME = "${response.username}"
WS_CHAT_URL = "${response.wsChatURL}"
MESSAGES_TO_DISPLAY_AT_START = "${response.messagesToDisplayAtStart}"
RECONNECT_INTERVAL = "${response.reconnectInterval}"
`);

    return {
        username: response.username,
        wsChatURL: response.wsChatURL,
        messagesToDisplayAtStart: response.messagesToDisplayAtStart,
        reconnectInterval: response.reconnectInterval,
    };
}
module.exports = {
    authorization,
    checkIsAuthorized,
};
