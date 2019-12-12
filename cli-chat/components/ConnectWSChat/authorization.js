const fs = require('fs');
const path = require('path');
const prompts = require('prompts');
const chalk = require('chalk');

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
        }, {
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
    ];

    const onSubmit = (prompt, answer) => console.log(`Got it. your ${chalk.red(prompt.name)} now is: ${chalk.green(answer)}`);
    onCancel = (prompt) => {
        console.log(`    --------------------------------------------------------------------------------------------
                    You avoid chat settings. Now you wil be disconnected...
    --------------------------------------------------------------------------------------------`);
        return false;
    };

    const response = await prompts(questions, { onSubmit, onCancel });

    if (!checkIsAuthorized(response.username, response.wsChatURL)) {
        return;
    }

    const writeStream = fs.createWriteStream(path.join(__dirname, '../../settings/settings.config'), { encoding: 'utf8' });

    writeStream.write(`USERNAME = "${response.username}"
WSCHATURL = "${response.wsChatURL}"`);

    return {
        username: response.username,
        wsChatURL: response.wsChatURL,
    };
}

function checkIsAuthorized(username, wsChatURL) {
    if (username === undefined || wsChatURL === undefined) {
        return false;
    }
    return true;
}
module.exports = {
    authorization,
    checkIsAuthorized,
};
