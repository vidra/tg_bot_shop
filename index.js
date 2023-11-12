const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const app = express();
const fs = require('fs');
const port = 8080;
const cors = require('cors');

// replace the value below with the Telegram token you receive from <strong i="6">@BotFather</strong>
const token = '6136917496:AAHyI3XzIpw2wV3GrQo1BtBfZymqXqoX44Q';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});
const webAppUrl = 'https://flourishing-druid-5a80da.netlify.app';

app.use(cors());
app.use(express.json());

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

if(text === '/start') {
  await bot.sendMessage(chatId, 'Заходи в наш магазин!',{
    reply_markup: {
      inline_keyboard: [
        [{text: 'Заполнить форму', web_app:{url: webAppUrl + '/form'}}]]
    }
  })

    await bot.sendMessage(chatId, 'Заходи в наш интернет магазин по кнопке ниже', {
            reply_markup: {
                inline_keyboard: [
                    [{text: 'Сделать заказ', web_app: {url: webAppUrl}}]
                ]
            }
        })
}

if(msg?.web_app_data?.data) {
    try {
        const data = JSON.parse(msg?.web_app_data?.data)
        console.log(data)
        await bot.sendMessage(chatId, 'Спасибо за обратную связь!')
        await bot.sendMessage(chatId, 'Ваша страна: ' + data?.country);
        await bot.sendMessage(chatId, 'Ваша улица: ' + data?.street);

        setTimeout(async () => {
            await bot.sendMessage(chatId, 'Всю информацию вы получите в этом чате');
        }, 3000)
    } catch (e) {
        console.log(e);
    }
}
});
app.post('/web-data', async (req, res) => {
    const {queryId, products = [], totalPrice} = req.body;
    try {
        await bot.answerWebAppQuery(queryId, {
            type: 'article',
            id: queryId,
            title: 'Успешная покупка',
            input_message_content: {
                message_text: ` Поздравляю с покупкой, вы приобрели товар на сумму ${totalPrice}, ${products.map(item => item.title).join(', ')}`
            }
        })
        return res.status(200).json({});
    } catch (e) {
        return res.status(500).json({})
    }
})
// New code
app.get('/', function (req, res) {
    res.send('the REST endpoint test run!');
});

app.listen(port, function() {
  console.log('Server running at http://127.0.0.1:%s', port);
});
