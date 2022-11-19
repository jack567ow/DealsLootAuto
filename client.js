const { Api, TelegramClient } = require('telegram');
const { StringSession } = require('telegram/sessions');

const cfg = require('./config');

const dev = false;

// const { apiId, apiHash, sessionKey } = require('./credentials_me');

const session = new StringSession(dev ? sessionKey : cfg.TG_USER_SESSION_KEY);
const client = new TelegramClient(
	session,
	dev ? apiId : parseInt(cfg.TG_USER_APP_ID),
	dev ? apiHash : cfg.TG_USER_APP_HASH,
	{
		connectionRetries: 5,
	}
);

module.exports = client;
