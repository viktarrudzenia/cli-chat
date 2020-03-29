process.env.NTBA_FIX_319 = 1;
const TelegramBot = require('node-telegram-bot-api');
const WebSocket = require('ws');
const dotenv = require('dotenv');

const envConfigs = dotenv.config();

if (envConfigs.error) {
    throw envConfigs.error;
}

const token = process.env.TOKEN;
const options = {
    polling: {
        params: {
            timeout: 0,
        },
    },
};

const timeOptions = {
    day: '2-digit',
    year: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
};

let isStartChatting = false;
let userChatId;

function createTelegramBot() {
    return new TelegramBot(token, options);
}

function hangAllHandlers(bot, wsChatURL) {
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

        isStartChatting = true;

        bot.sendMessage(chatId, `Welcome home ${chatUsername}. You connected to the chat: ${wsChatURL}`);
    });

    bot.onText(/\/stopchat/, (msg) => {
        const chatId = msg.chat.id;
        const chatUsername = msg.chat.username;

        isStartChatting = false;

        bot.sendMessage(chatId, `You exit from the chat: ${wsChatURL}. Goodbye ${chatUsername}`);
    });

    bot.onText(/\/send (.+)/, (msg, match) => {
        const chatId = msg.chat.id;
        const chatUsername = 'cli-chat-rudzenia-bot';
        const chatDate = +`${msg.date}000`;
        const chatText = match[1];

        const ws = new WebSocket(wsChatURL);
        ws.on('open', () => {
            const msg = {
                from: chatUsername,
                message: chatText,
            };
            ws.send(JSON.stringify(msg));
            ws.close();
        });
        bot.sendMessage(chatId, `${new Date(chatDate).toLocaleDateString('en-US', timeOptions)} ${chatUsername}: ${chatText}`);
    });

    bot.onText(/\/help/, (msg) => {
        const chatId = msg.chat.id;
        bot.sendMessage(chatId, `Use this commands:
        /help - Use to display all available commands
        /startchat - for start chatting in ws chat
        /stopchat - for stop chatting in ws chat
        /send any_text - Bot sends any_text to ws chat
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
        const chatText = msg.text;
        userChatId = msg.chat.id;

        if (isStartChatting && chatText !== '/stopchat') {
            const ws = new WebSocket(wsChatURL);
            ws.on('open', () => {
                const msg = {
                    from: chatUsername,
                    message: chatText,
                };
                ws.send(JSON.stringify(msg));
                ws.close();
            });
        } else if (chatText === '/startchat' || chatText === '/stopchat' || chatText === '/help'
        || /^\/send /.exec(chatText) !== null || chatText === '/love' || chatText === '/happy') {
            // eslint-disable-next-line no-useless-return
            return;
        } else {
            bot.sendMessage(chatId, `Unknown command: "${chatText}".
    Use /help to display all commands`);
        }
    });

    bot.on('polling_error', (err) => console.log(err));

    return bot;
}

function clearUserChatIdAndSession() {
    isStartChatting = false;
    userChatId = undefined;
}

function checkUserSession() {
    return userChatId === undefined ? false : userChatId;
}

function isChatStarting() {
    return isStartChatting !== false;
}

module.exports = {
    createTelegramBot,
    hangAllHandlers,
    clearUserChatIdAndSession,
    checkUserSession,
    isChatStarting,
};
