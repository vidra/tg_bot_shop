const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const app = express();
const fs = require('fs');
const port = 8080;
app.use(express.json());
app.use(cors());
// replace the value below with the Telegram token you receive from <strong i="6">@BotFather</strong>
const token = '6136917496:AAHyI3XzIpw2wV3GrQo1BtBfZymqXqoX44Q';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});
const webAppUrl = 'https://flourishing-druid-5a80da.netlify.app/';

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

if(text === '/start') {
  await bot.sendMessage(chatId, 'Заходи в наш магазин!',{
    reply_markup: {
      inline_keyboard: [
        [{text: 'Сделать заказ', web_app:{url: webAppUrl}}]]
    }
  })
}
});
// New code
app.get('/', function (req, res) {
    res.send('the REST endpoint test run!');
});

app.listen(port, function() {
  console.log('Server running at http://127.0.0.1:%s', port);
});
