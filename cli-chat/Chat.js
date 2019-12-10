/* eslint-disable no-console */
const WebSocket = require('ws');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const prompts = require('prompts');
const dotenv = require('dotenv');
const readline = require('readline');
const notifier = require('node-notifier');
const TelegramBot = require('node-telegram-bot-api');

const result = dotenv.config();

if (result.error) {
    throw result.error;
}

// ///////////////////////////////////// HISTORY

const d = new Date();
const historyFileName = `${[d.getMonth() + 1, d.getDate(), d.getFullYear()].join('-')} ${[d.getHours(), d.getMinutes(), d.getSeconds()].join('-')}`;

// //////////////////////////////////////////////

// ////////////////////////////////////////////////////////////////////////////////////////

// To send message to bot: https://t.me/Cli_Chat_for_ST2019_bot

const token = process.env.TOKEN;
const bot = new TelegramBot(token, {
    polling: {
        params: {
            timeout: 0,
        },
    },
});


const timeOptions = {
    day: '2-digit',
    year: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
};

const allChatData = [];
let isStartChatting = false;
let whoAmI;

bot.onText(/\/happy/, (msg) => {
    const chatId = msg.chat.id;
    const happySmile = '😃';
    bot.sendMessage(chatId, happySmile);
});

bot.onText(/\/love/, (msg) => {
    const chatId = msg.chat.id;
    const loveSmile = '❤';
    bot.sendMessage(chatId, loveSmile);
});

bot.onText(/\/startchat/, (msg) => {
    const chatId = msg.chat.id;
    const chatUsername = msg.chat.username;
    const chatDate = +`${msg.date}000`;
    const chatText = msg.text;

    isStartChatting = true;

    bot.sendMessage(chatId, `Welcome home ${chatUsername}. You connected to the chat: ws://chat.shas.tel`);

    // bot.sendMessage(chatId, JSON.stringify(msg));
});

bot.onText(/\/stopchat/, (msg) => {
    const chatId = msg.chat.id;
    const chatUsername = msg.chat.username;
    const chatDate = +`${msg.date}000`;
    const chatText = msg.text;

    isStartChatting = false;

    bot.sendMessage(chatId, `You exit from the chat: ws://chat.shas.tel. Goodbye ${chatUsername}`);

    // bot.sendMessage(chatId, `${new Date(chatDate).toLocaleDateString('en-US', timeOptions)} ${chatUsername}: ${chatText}
    // You stop chatting in chat "ws://chat.shas.tel"
    // `);
});

bot.onText(/\/send (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const chatUsername = 'cli-chat-rudzenia-bot';
    const chatDate = +`${msg.date}000`;
    const chatText = match[1];

    bot.sendMessage(chatId, `${new Date(chatDate).toLocaleDateString('en-US', timeOptions)} ${chatUsername}: ${chatText}`);
});

bot.onText(/\/help/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, `Use this commands:
    /startchat - for start chatting in ws chat
    /stopchat - for stop chatting in ws chat
    /send ******* - for send something in ws chat from bot
    /love - bot sends you a love emoji
    /happy - bot sends you a happySmile emoji`);
});

// Listen for any kind of message.
bot.on('message', (msg) => {
    if (bot.isPolling() !== true) {
        return;
    }
    const chatId = msg.chat.id;
    const chatUsername = msg.chat.username;
    const chatDate = +`${msg.date}000`;
    const chatText = msg.text;
    whoAmI = msg.chat.id;

    if (isStartChatting && chatText !== '/stopchat') {
        bot.sendMessage(chatId, `${new Date(chatDate).toLocaleDateString('en-US', timeOptions)} ${chatUsername}: ${chatText}`);
    } else if (chatText === '/startchat' || chatText === '/stopchat' || chatText === '/help' || /^\/send /.exec(chatText) !== null) {
        // eslint-disable-next-line no-useless-return
        return;
    } else {
        bot.sendMessage(chatId, `Unknown command: "${chatText}".
Use /help to display all commands`);
    }
});

bot.on('polling_error', (err) => chalk.red(console.log(err)));

// ///////////////////////////////////////////////////////////////////////////////////////////////

const reconnectInterval = 2 * 1000;

let isNewMessage = false;

const allUsersWithColors = {
};

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

const settings = fs.readFileSync('settings.config', { flag: 'as+' }, { encoding: 'utf-8' });
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


async function connect() {
    // ///////////////////

    if (username === undefined || wsChatURL === undefined) {
        // ////////////////////////
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
            return console.log(`${chalk.red('You have interrupted chat settings. Disconnected')}`);
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

        if (response.username === undefined) {
            return console.log(`${chalk.red('You have interrupted chat settings. Disconnected')}`);
        }

        // ////////////

        const writeStream = fs.createWriteStream('settings.config', { encoding: 'utf8' });

        writeStream.write(`USERNAME = "${response.username}";
WSCHATURL = "${response.wsChatURL}"`);

        username = response.username;
        wsChatURL = response.wsChatURL;
    }
    // /////////////////////////////
    const ws = await new WebSocket(wsChatURL);
    ws.on('open', () => {
        console.log(`    --------------------------------------------------------------------------------------------
                Welcome home ${chalk.green(username)}. You connected to the chat ${chalk.green(wsChatURL)}
         --------------------------------------------------------------------------------------------`);
    });

    ws.on('message', (data) => {
        const timeOptions = {
            day: '2-digit',
            year: '2-digit',
            month: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
        };

        function generateRGBColor() {
            const r = Math.floor(Math.random() * 256);
            const g = Math.floor(Math.random() * 256);
            const b = Math.floor(Math.random() * 256);
            return [r, g, b];
        }


        const newData = JSON.parse(data).reverse();

        if (isNewMessage && newData[0].from !== username) {
            notifier.notify({
                title: `New message in chat: ${wsChatURL}`,
                message: `${newData[0].from} said: '${newData[0].message}'`,
            });
            readline.clearLine(process.stdout, 0);
            console.log('');
            readline.moveCursor(process.stdout, 0, -1);
        }
        for (let i = 0; i < newData.length; i += 1) {
            // /////////////////////////////////////////////////////////// HISTORY
            const message = `${new Date(newData[i].time).toLocaleDateString('en-US', timeOptions)} ${newData[i].from}: ${newData[i].message}\n`;
            fs.appendFileSync(`./history/${historyFileName}.txt`, message);

            // //////////////////////////////////////////////////////////

            if (newData[i].from === username) {
                // allChatData.push(`${new Date(newData[i].time).toLocaleDateString('en-US', timeOptions)} ${(newData[i].from)}: ${(newData[i].message)}`);
                console.log(`${chalk.blue(new Date(newData[i].time).toLocaleDateString('en-US', timeOptions))} ${chalk.bold.bgGreen.keyword('black')(newData[i].from)}: ${chalk.bgGreen.keyword('black')(newData[i].message)}`);
            } else if (allUsersWithColors[newData[i].from] !== undefined) {
                // allChatData.push(`${new Date(newData[i].time).toLocaleDateString('en-US', timeOptions)} ${(newData[i].from)}: ${(newData[i].message)}`);
                console.log(`${chalk.blue(new Date(newData[i].time).toLocaleDateString('en-US', timeOptions))} ${chalk.bold.rgb(...allUsersWithColors[newData[i].from])(newData[i].from)}: ${chalk.bold.rgb(...allUsersWithColors[newData[i].from])(newData[i].message)}`);
            } else {
                // allChatData.push(`${new Date(newData[i].time).toLocaleDateString('en-US', timeOptions)} ${(newData[i].from)}: ${(newData[i].message)}`);
                allUsersWithColors[newData[i].from] = generateRGBColor();
                console.log(`${chalk.blue(new Date(newData[i].time).toLocaleDateString('en-US', timeOptions))} ${chalk.bold.rgb(...allUsersWithColors[newData[i].from])(newData[i].from)}: ${chalk.bold.rgb(...allUsersWithColors[newData[i].from])(newData[i].message)}`);
            }
            // bot.sendMessage(whoAmI, `${new Date(newData[i].time).toLocaleDateString('en-US', timeOptions)} ${(newData[i].from)}: ${(newData[i].message)}`);
        }
        isNewMessage = true;
    });

    ws.on('error', (error) => {
        console.error('Error: ', error);
        console.log(`         --------------------------------------------------------------------------------------------
                Trying to reconnect to chat ${chalk.green(wsChatURL)}... with ${chalk.green(reconnectInterval / 1000)}s interval
         --------------------------------------------------------------------------------------------`);
        setTimeout(connect, reconnectInterval);
    });

    ws.on('close', (code, reason) => {
        console.log(`         --------------------------------------------------------------------------------------------
            Server: You disconnected from the chat ${chalk.green(wsChatURL)} with ${chalk.red(code)} code and this reason: '${chalk.red(reason)}'
         --------------------------------------------------------------------------------------------`);
        if (code !== 1000) {
            console.log(`         --------------------------------------------------------------------------------------------
                Trying to reconnect to chat ${chalk.green(wsChatURL)}... with ${chalk.green(reconnectInterval / 1000)}s interval
         --------------------------------------------------------------------------------------------`);
            setTimeout(connect, reconnectInterval);
        }
    });

    for (let i = 0; i < 10e8; i += 1) {
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
        const onCancel = (prompt) => {
            if (whoAmI !== undefined) {
                bot.sendMessage(whoAmI, 'Server crashed. This session is end.');
            }
            bot.stopPolling();

            readline.moveCursor(process.stdout, 0, -1);
            console.log(`         --------------------------------------------------------------------------------------------
                You exit from the chat ${chalk.green(wsChatURL)}. Goodbye ${chalk.green(username)}.
         --------------------------------------------------------------------------------------------`);
            i = Infinity;
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

connect();
