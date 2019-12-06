/* eslint-disable no-console */
const WebSocket = require('ws');
// const fs = require('fs');
const chalk = require('chalk');
const prompts = require('prompts');
//  const readline = require('readline');
// readline.moveCursor(process.stdout, 0, -1);

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

        const colors = [
            'red',
            'green',
            'yellow',
            'blue',
            'cyan',
            'white',
            'gray',
        ];

        function generateRGBColor() {
            const r = Math.floor(Math.random() * 256); // Random between 0-255
            const g = Math.floor(Math.random() * 256); // Random between 0-255
            const b = Math.floor(Math.random() * 256); // Random between 0-255
            return [r, g, b];
        }

        // function generateColorIterator() {
        //     let currentColor = -1;

        //     return () => {
        //         if (currentColor >= colors.length - 1) {
        //             currentColor += 1;
        //             return colors[currentColor % colors.length];
        //         }
        //         currentColor += 1;
        //         return colors[currentColor];
        //     };
        // }

        // const generateColor = generateColorIterator();

        const allUsersWithColors = {
        };

        newData.reverse();

        for (let i = 0; i < newData.length; i += 1) {
            // if (newData[i].from === response.username) {
            //     console.log(`${chalk.blue(new Date(newData[i].time).toLocaleDateString('en-US', timeOptions))} ${chalk.bold.bgGreen.keyword('black')(newData[i].from)}: ${chalk.bgGreen.keyword('black')(newData[i].message)}`);
            // } else if (allUsersWithColors[newData[i].from] !== undefined) {
            //     console.log(`${chalk.blue(new Date(newData[i].time).toLocaleDateString('en-US', timeOptions))} ${chalk.bold.keyword(allUsersWithColors[newData[i].from])(newData[i].from)}: ${chalk.bold.keyword(allUsersWithColors[newData[i].from])(newData[i].message)}`);
            // } else {
            //     allUsersWithColors[newData[i].from] = generateColor();
            //     console.log(`${chalk.blue(new Date(newData[i].time).toLocaleDateString('en-US', timeOptions))} ${chalk.bold.keyword(allUsersWithColors[newData[i].from])(newData[i].from)}: ${chalk.bold.keyword(allUsersWithColors[newData[i].from])(newData[i].message)}`);
            // }

            if (newData[i].from === response.username) {
                console.log(`${chalk.blue(new Date(newData[i].time).toLocaleDateString('en-US', timeOptions))} ${chalk.bold.bgGreen.keyword('black')(newData[i].from)}: ${chalk.bgGreen.keyword('black')(newData[i].message)}`);
            } else if (allUsersWithColors[newData[i].from] !== undefined) {
                console.log(`${chalk.blue(new Date(newData[i].time).toLocaleDateString('en-US', timeOptions))} ${chalk.bold.rgb(...allUsersWithColors[newData[i].from])(newData[i].from)}: ${chalk.bold.rgb(...allUsersWithColors[newData[i].from])(newData[i].message)}`);
            } else {
                allUsersWithColors[newData[i].from] = generateRGBColor();
                console.log(`${chalk.blue(new Date(newData[i].time).toLocaleDateString('en-US', timeOptions))} ${chalk.bold.rgb(...allUsersWithColors[newData[i].from])(newData[i].from)}: ${chalk.bold.rgb(...allUsersWithColors[newData[i].from])(newData[i].message)}`);
            }
        }
    });

    ws.on('error', (error) => {
        console.log('Error: ', error);
    });

    ws.on('close', (code) => {
        console.log(`Disconnected from the chat with ${chalk.red(code)} code`);
    });

    for (let i = 0; i < 10e8; i += 1) {
        const questions = [{
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
