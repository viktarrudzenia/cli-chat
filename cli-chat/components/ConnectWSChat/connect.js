const WebSocket = require('ws');
const chalk = require('chalk');
const prompts = require('prompts');
const readline = require('readline');
const notifier = require('node-notifier');
const TelegramBot = require('../TelegramBot/telegramBot');
const logToHistory = require('../History/history');

function generateRGBColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return [r, g, b];
}

const allUsersWithColors = {
};

let isNewMessage = false;

function stopSessionForActiveTelegramUser(bot) {
    if (TelegramBot.checkUserSession()) {
        bot.sendMessage(TelegramBot.checkUserSession(), 'Server crashed. This session is end.');
        TelegramBot.clearUserChatIdAndSession();
    }
    bot.stopPolling();
}

async function connect(settings) {
    const {
        username, wsChatURL, messagesToDisplayAtStart, reconnectInterval, dateColor, otherUsersColor, myColor,
    } = settings;

    const ws = await new WebSocket(wsChatURL);
    const bot = TelegramBot.createTelegramBot();
    const botWithHandlers = TelegramBot.hangAllHandlers(bot, wsChatURL);

    ws.on('open', () => {
        console.log(`    --------------------------------------------------------------------------------------------
                Welcome home ${chalk.green(username)}. You connected to the chat ${chalk.green(wsChatURL)}
         --------------------------------------------------------------------------------------------
         --------------------------------------------------------------------------------------------
        To start chatting via TelegramBot use this telegram link: ${chalk.green('https://t.me/Cli_Chat_for_ST2019_bot')}
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

        const newData = JSON.parse(data).slice(0, messagesToDisplayAtStart).reverse();

        if (newData[0] === undefined) {
            console.log('Server now crashed. Somebody send in msg.from: false value :)');
            return;
        }

        if (TelegramBot.isChatStarting()) {
            botWithHandlers.sendMessage(TelegramBot.checkUserSession(), `${new Date(newData[0].time).toLocaleDateString('en-US', timeOptions)} ${newData[0].from}: ${newData[0].message}`);
        }

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
            logToHistory(newData[i]);
            if (newData[i].from === username) {
                console.log(`${chalk.blue(new Date(newData[i].time).toLocaleDateString('en-US', timeOptions))} ${chalk.bold.bgGreen.keyword('black')(newData[i].from)}: ${chalk.bgGreen.keyword('black')(newData[i].message)}`);
            } else if (allUsersWithColors[newData[i].from] !== undefined) {
                console.log(`${chalk.blue(new Date(newData[i].time).toLocaleDateString('en-US', timeOptions))} ${chalk.bold.rgb(...allUsersWithColors[newData[i].from])(newData[i].from)}: ${chalk.bold.rgb(...allUsersWithColors[newData[i].from])(newData[i].message)}`);
            } else {
                allUsersWithColors[newData[i].from] = generateRGBColor();
                console.log(`${chalk.blue(new Date(newData[i].time).toLocaleDateString('en-US', timeOptions))} ${chalk.bold.rgb(...allUsersWithColors[newData[i].from])(newData[i].from)}: ${chalk.bold.rgb(...allUsersWithColors[newData[i].from])(newData[i].message)}`);
            }
        }
        isNewMessage = true;
    });

    ws.on('error', (error) => {
        stopSessionForActiveTelegramUser(botWithHandlers);

        console.error('Error: ', error);
        console.log(`         --------------------------------------------------------------------------------------------
                Trying to reconnect to chat ${chalk.green(wsChatURL)}... with ${chalk.green(reconnectInterval / 1000)}s interval
         --------------------------------------------------------------------------------------------`);
        setTimeout(connect, reconnectInterval, settings);
    });

    ws.on('close', (code, reason) => {
        stopSessionForActiveTelegramUser(botWithHandlers);

        console.log(`         --------------------------------------------------------------------------------------------
            Server: You disconnected from the chat ${chalk.green(wsChatURL)} with ${chalk.red(code)} code and this reason: '${chalk.red(reason)}'
         --------------------------------------------------------------------------------------------`);
        if (code !== 1000) {
            console.log(`         --------------------------------------------------------------------------------------------
                Trying to reconnect to chat ${chalk.green(wsChatURL)}... with ${chalk.green(reconnectInterval / 1000)}s interval
         --------------------------------------------------------------------------------------------`);
            setTimeout(connect, reconnectInterval, settings);
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
            stopSessionForActiveTelegramUser(botWithHandlers);

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

module.exports = connect;
