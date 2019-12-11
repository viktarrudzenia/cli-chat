const WebSocket = require('ws');
const TelegramBot = require('node-telegram-bot-api');
const dotenv = require('dotenv');

const result = dotenv.config();

if (result.error) {
    throw result.error;
}


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
        const ws = new WebSocket('ws://chat.shas.tel');
        ws.on('open', () => {
            const msg = {
                from: chatUsername,
                message: chatText,
            };
            ws.send(JSON.stringify(msg));
        });

        // bot.sendMessage(chatId, `${new Date(chatDate).toLocaleDateString('en-US', timeOptions)} ${chatUsername}: ${chatText}`);
    } else if (chatText === '/startchat' || chatText === '/stopchat' || chatText === '/help' || /^\/send /.exec(chatText) !== null) {
        // eslint-disable-next-line no-useless-return
        return;
    } else {
        bot.sendMessage(chatId, `Unknown command: "${chatText}".
Use /help to display all commands`);
    }
});

bot.on('polling_error', (err) => console.log(err));

function checkUserSession() {
    return whoAmI === undefined ? false : whoAmI;
}

function isChatStarting() {
    return isStartChatting !== false;
}
// ///////////////////////////////////////////////////////////////////////////////////////////////

module.exports = {
    bot,
    checkUserSession,
    isChatStarting,
};
