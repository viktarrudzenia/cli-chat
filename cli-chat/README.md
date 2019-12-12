# CLI-CHAT

## RUN PROJECT

1. Just ```git clone``` my repository or download ```.zip``` file
2. Open /cli-chat/ directory, then run ```npm i```
3. Run ```npm run start```

## SETTINGS

For autoconnect to ws chat in settings/settings.config  must store configs in this format:

```
USERNAME = "your_username"
WS_CHAT_URL = "your_wschaturl"
MESSAGES_TO_DISPLAY_AT_START = "number_of_messages"
RECONNECT_INTERVAL = "number_of_ms"
DATE_COLOR = "your_color_keyword"
OTHER_USERS_COLOR = "your_color_keyword"
MY_COLOR = "your_color_keyword"
```

If you paste in OTHER_USERS_COLOR = "different color for each user" you can separate all users by color.

Keyword color information you can find here: https://www.w3.org/wiki/CSS/Properties/color/keywords

If you do not have this "settings.config", when you run ```npm run start``` will be displayed that you do not have settings for chat and must answer a couple of questions.

After this questions "settings.config" will be created with your preferences and stored in settings/settings.config.

## TELEGRAMBOT

TelegramBot (cli-chat-rudzenia-bot) starts when you run server ```npm run start```.

To start chatting via TelegramBot use this telegram link: [cli-chat-rudzenia-bot](https://t.me/Cli_Chat_for_ST2019_bot "https://t.me/Cli_Chat_for_ST2019_bot")

cli-chat-rudzenia-bot supports the following commands:

- ```/help``` - Use to display all available commands.
- ```/startchat``` - For start chatting in ws chat. You login at ws chat with your telegram username. And begin receive all chat messages from ws chat.
- ```/stopchat``` - For stop chatting in ws chat. You logout and stop receiving chat messages from ws chat.
- ```/send any_text``` - Bot sends any_text to ws chat on its own behalf.
- ```/love``` - Bot sends you a love emoji.
- ```/happy``` - Bot sends you a happySmile emoji.

## HISTORY

In /history/ logs all history for every connection in txt format: "MM-DD-YYYY HH-MM-SS.txt".
