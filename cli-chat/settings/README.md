For autoconnect to ws chat here must store settings.config file with this format:

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

Keyword color information you can find here: https://www.w3.org/wiki/CSS/Properties/color/keywords.

If you do not have this "settings.config", when you run ```npm run start``` will be displayed that you do not have settings for chat and must answer a couple of questions.

After this questions "settings.config" will be created with your preferences and stored in settings/settings.config.