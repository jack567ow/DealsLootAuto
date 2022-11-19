const { NewMessage } = require('telegram/events');

const { Bot } = require("grammy");
const cfg = require("./config");
const bot = new Bot(cfg.BOT_TOKEN); // Initialize bot
const client = require('./client');
const emojiRegex = require("emoji-regex")();
const unshort = require("./website/unshort");

async function newDealFromDealsChannel(event) {
  if (cfg.FORWADING_FROM_OTHERS) {
    try {
      const msg = `/autoconvert ${event.message.message}`
      console.log("new post from autodeals");
      await client.sendMessage(cfg.BOT_USERNAME, {
        message: msg,
      });
    } catch (err) {
      console.log(err.message);
    }
  }
}

async function processedMsgFromBots(event) {
	console.log('posting processed post from bots');
	let resMsg = event.message.message.replace(/\[[^\]]+\]/g, '');
	if (resMsg.includes('not be able to convert')) {
		console.log('skipping not supported link');
		return;
	}
	if (resMsg.includes('cannot be converted')) {
		console.log('skipping not supported link');
		return;
	}
	try {
		bot.telegram.sendMessage(cfg.DEV_TG_ID, resMsg, {
			disable_web_page_preview: true,
		});
		bot.telegram.sendMessage(cfg.ADMIN_TG_ID, resMsg, {
			disable_web_page_preview: true,
		});
		bot.telegram.sendMessage(cfg.TG_CHANNEL_ID, resMsg, {
			disable_web_page_preview: true,
		});
	} catch (err) {
		console.log(err.message);
	}
}

(async () => {
	await client.start();
	await client.connect();

	setInterval(() => {
		try {
			client.getMe();
		} catch (err) {
			console.log(err.message);
		}
	}, 60 * 1000);

	client.addEventHandler(
    newDealFromDealsChannel,
    new NewMessage({ chats: cfg.DEALS_CHANNELS.split(",") })
  );
  client.addEventHandler(
    processedMsgFromBots,
    new NewMessage({ chats: [2015117555] })
  );
})();

// channels
// dealscargo -1001233917129
// indiafreestuff	1238284351
// indiadesire.com 1314450075
// earnkaro	1480964161
// Thuthu        1357696831
// dm -1001388138647
// bots
// Botbyayush 1971268253
// extrape 2015117555
// earnKaro 953541683

// ours
// test channel id 1789301431
// earnly mock 2027793161
