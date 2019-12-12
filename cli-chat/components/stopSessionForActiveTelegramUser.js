const TelegramBot = require('./telegramBot');

function stopSessionForActiveTelegramUser(bot) {
    if (TelegramBot.checkUserSession()) {
        bot.sendMessage(TelegramBot.checkUserSession(), 'Server crashed. This session is end.');
        TelegramBot.clearUserChatIdAndSession();
    }
    bot.stopPolling();
}

module.exports = stopSessionForActiveTelegramUser;
