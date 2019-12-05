/* eslint-disable no-console */
const WebSocket = require('ws');
// const fs = require('fs');
const chalk = require('chalk');
const prompts = require('prompts');

const wsChatURL = 'ws://chat.shas.tel';

const questions = [
    {
        type: 'text',
        name: 'username',
        message: 'Hello stranger. Please enter your username?',
        initial: 'anonymous',
    },
    {
        type: 'text',
        name: 'about',
        message: 'Tell something about yourself',
        initial: 'Why should I?',
    },
];

const onSubmit = (prompt, answer) => console.log(`Got it. your ${chalk.red(prompt.name)} now is: ${chalk.green(answer)}`);
const onCancel = (prompt) => {
    console.log('You avoid from settings now you wil be disconnected');
    return false;
};

(async () => {
    const response = await prompts(questions, { onSubmit, onCancel });

    if (response.username === undefined || response.about === undefined) {
        return console.log(`${chalk.red('Wrong settings. Disconnected')}`);
    }

    const ws = await new WebSocket(wsChatURL);

    ws.on('open', () => {
        console.log(`Welcome home ${chalk.green(response.username)}. You connected to the chat`);
    });

    ws.on('message', (data) => {
        const newData = JSON.parse(data);
        const timeOptions = {
            day: '2-digit',
            year: '2-digit',
            month: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        };

        function colorize() {
            let r = 0;
            let g = 0;
            let b = 0;
            return function () {
                for (let i = 0; i < 255; i += 1) {
                    r += 10;
                    g += 10;
                    b += 10;
                    console.log(r, g, b);
                    return `rgb(${r}, ${g}, ${b})`;
                }
            };
        }

        newData.reverse().map((item) => (
            item.from === response.username
                ? console.log(`${chalk.blue(new Date(item.time).toLocaleDateString('en-US', timeOptions))} ${chalk.bold.rgb(10, 100, 200)(item.from)}: ${chalk.bold.rgb(10, 100, 200)(item.message)}`)
                : console.log(`${chalk.blue(new Date(item.time).toLocaleDateString('en-US', timeOptions))} ${chalk.redBright(item.from)}: ${chalk.yellowBright(item.message)}`)));
    });

    ws.on('error', (error) => {
        console.log('Error: ', error);
    });

    ws.on('close', (code) => {
        console.log(`Disconnected from the chat with ${chalk.red(code)} code`);
    });

    for (let i = 0; i < 10e8; i += 1) {
        const questions = [
            {
                type: 'text',
                name: 'message',
                message: '',
                validate: (value) => ((value === '') ? 'Input something please' : true),
            }];

        const onSubmit = (prompt, answer) => console.log(`Your message: "${chalk.green(answer)}" sended to chat`);
        const onCancel = (prompt) => {
            console.log('You exit from the chat');
            i = Infinity;
            return false;
        };
        const response2 = await prompts(questions, { onSubmit, onCancel });

        const msg = {
            from: response.username,
            message: response2.message,
        };
        ws.send(JSON.stringify(msg));
    }
})();
