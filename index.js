const TelegramBot = require('node-telegram-bot-api');
const redis = require('redis');
const EmojiData = require('emoji-data');
const config = require('./config');

const client = redis.createClient(config.redis_url);

client.on("error", function (err) {
    console.log("Error " + err);
});

const bot = new TelegramBot(config.bot_token, {polling: true});

bot.onText(/\/emojistats/, (msg, match) => {
	var chatID = msg.chat.id;
	client.zrevrangebyscore(`chat:${chatID}`, '+inf', 0, 'WITHSCORES', 'LIMIT', 0, 10, (err, res) => {
		if (err) throw err;
		var respString = `Top emojis in chat ${chatID}: \n`;
		for (var i = 0; i < res.length; i+=2) {
			respString += `${EmojiData.from_unified(res[i]).render()} - ${res[i+1]}\n`
		}
		bot.sendMessage(chatID, respString);
	});
});

bot.on('message', msg => {
	const chatID = msg.chat.id;
	EmojiData.scan(msg.text).forEach(e => {
		client.zincrby(`chat:${chatID}`, 1, e.unified);
	});
});