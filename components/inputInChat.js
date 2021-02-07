const readline = require('readline');
const chalk = require('chalk');
const prompts = require('prompts');
const stopSessionForActiveTelegramUser = require('./stopSessionForActiveTelegramUser');


async function inputInChat(username, ws, wsChatURL, botWithHandlers) {
    let isActiveInputInChat = true;
    while (isActiveInputInChat) {
        if (ws.readyState > 1) {
            return;
        }
        const questions = [{
            type: 'text',
            name: 'message',
            message: '',
            validate: (value) => {
                if (value === '') {
                    return 'Input something please';
                }
                if (value.length >= 1024) {
                    return 'Length of your message should be less than 1024 symbols';
                }
                if (value.trim() === '') {
                    return 'Input correct message please, only spaces are not allowed';
                }
                return true;
            },
            format: (value) => value.trim(),
        }];

        const onSubmit = (prompt, answer) => {
            console.log(`You send to chat: "${chalk.green(answer)}"`);
            readline.moveCursor(process.stdout, 0, -1);
            readline.moveCursor(process.stdout, 0, -1);
        };
        // eslint-disable-next-line no-loop-func
        const onCancel = () => {
            stopSessionForActiveTelegramUser(botWithHandlers);

            readline.moveCursor(process.stdout, 0, -1);
            console.log(`         --------------------------------------------------------------------------------------------
            You exit from the chat ${chalk.green(wsChatURL)}. Goodbye ${chalk.green(username)}.
         --------------------------------------------------------------------------------------------`);

            isActiveInputInChat = false;
            ws.close(1000, 'I\'m leaving this chat');

            return false;
        };
        const response2 = await prompts(questions, { onSubmit, onCancel });

        const msg = {
            from: username,
            message: response2.message,
        };
        ws.send(JSON.stringify(msg));
    }
}

module.exports = inputInChat;
