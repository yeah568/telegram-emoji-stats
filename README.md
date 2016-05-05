# telegram-emoji-stats

Keeps track of usage of emojis in a Telegram chat, and provides some basic statistics.

## Setup
- Clone this repo. Run `npm install`.
- Copy/rename `config.js.example` to `config.js`.
- Supply a valid Redis URL and bot token in config.js.
- Run `npm start`.

## Usage
- Add `@EmojiStatsBot` to your chat.
- Use `/emojistats` to get the stats for that chat.
