const WebSocket = require('ws');
const chalk = require('chalk');
const readline = require('readline');
const notifier = require('node-notifier');
const TelegramBot = require('./telegramBot');
const logToHistory = require('./history');
const generateRGBColor = require('./generateRGBColor');
const inputInChat = require('./inputInChat');
const stopSessionForActiveTelegramUser = require('./stopSessionForActiveTelegramUser');

const allUsersWithColors = {
};

let isNewMessage = false;

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
            if (otherUsersColor === 'different color for each user') {
                if (newData[i].from === username) {
                    console.log(`${chalk.keyword(dateColor)(new Date(newData[i].time).toLocaleDateString('en-US', timeOptions))} ${chalk.bold.bgGreen.keyword(myColor)(newData[i].from)}: ${chalk.bgGreen.keyword(myColor)(newData[i].message)}`);
                } else if (allUsersWithColors[newData[i].from] !== undefined) {
                    console.log(`${chalk.keyword(dateColor)(new Date(newData[i].time).toLocaleDateString('en-US', timeOptions))} ${chalk.bold.rgb(...allUsersWithColors[newData[i].from])(newData[i].from)}: ${chalk.bold.rgb(...allUsersWithColors[newData[i].from])(newData[i].message)}`);
                } else {
                    allUsersWithColors[newData[i].from] = generateRGBColor();
                    console.log(`${chalk.keyword(dateColor)(new Date(newData[i].time).toLocaleDateString('en-US', timeOptions))} ${chalk.bold.rgb(...allUsersWithColors[newData[i].from])(newData[i].from)}: ${chalk.bold.rgb(...allUsersWithColors[newData[i].from])(newData[i].message)}`);
                }
            } else if (newData[i].from === username) {
                console.log(`${chalk.keyword(dateColor)(new Date(newData[i].time).toLocaleDateString('en-US', timeOptions))} ${chalk.bold.bgGreen.keyword(myColor)(newData[i].from)}: ${chalk.bgGreen.keyword(myColor)(newData[i].message)}`);
            } else {
                console.log(`${chalk.keyword(dateColor)(new Date(newData[i].time).toLocaleDateString('en-US', timeOptions))} ${chalk.keyword(otherUsersColor)(newData[i].from)}: ${chalk.keyword(otherUsersColor)(newData[i].message)}`);
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

    inputInChat(username, ws, wsChatURL, botWithHandlers);
}

module.exports = connect;
