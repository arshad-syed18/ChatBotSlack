require('dotenv').config();
const axios = require('axios');
const { App } = require('@slack/bolt');
// get your signing secret and botToken by following the steps in readme
const signingSecret = process.env['SLACK_SIGNING_SECRET']
const botToken = process.env['SLACK_BOT_TOKEN']

const app = new App({
    signingSecret: signingSecret,
    token: botToken,
});

(async () => {
    await app.start(process.env.PORT || 12000);
    // Looks for the message that says quote and replies with quote
    app.message('quote', async ({ message, say }) => {
      console.log("User asked for a quote!");
      // gets quote from quotable
        let resp = await axios.get(`https://api.quotable.io/random`);
        const quote = resp.data.content;
      // replies to user with the quote
        await say(`Hello, <@${message.user}>, ${quote}`);
    });
    app.message(/tell me a joke/i, async ({ message, say }) => {
      console.log("User asked for a joke!");
      // gets joke from joke API
      let resp = await axios.get(`https://official-joke-api.appspot.com/random_joke`);
     const setup = resp.data.setup;
      const punchline = resp.data.punchline;
      // replies to user with the joke
      await say(`Sure, <@${message.user}>, here's a joke for you:\n\n${setup}\n${punchline}`);
  });

  

    console.log(`⚡ Bolt app is running!`);
})();