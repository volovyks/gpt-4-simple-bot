const TelegramBot = require('node-telegram-bot-api');
const OpenAI = require('openai-api');

// Telegram Bot Token and OpenAI API Key
const token = 'YOUR_TELEGRAM_BOT_TOKEN';
const apiKey = 'YOUR_OPENAI_API_KEY';

// Initialize Telegram Bot
const bot = new TelegramBot(token, { polling: true });

// Initialize OpenAI API
const openai = new OpenAI(apiKey);

// Handle incoming messages
bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const message = msg.text;

  try {
    // Call the OpenAI API to generate a response
    const response = await openai.complete({
      engine: 'text-davinci-002',
      prompt: message,
      maxTokens: 150,
      n: 1,
      stop: '\n',
      temperature: 0.5,
    });

    // Send the generated response to the user
    bot.sendMessage(chatId, response.data.choices[0].text);
  } catch (error) {
    console.error(error);
    bot.sendMessage(chatId, 'Sorry, an error occurred.');
  }
});
