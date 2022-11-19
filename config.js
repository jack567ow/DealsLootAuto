require('dotenv').config();

module.exports = {
    OTHER_TG_ID: process.env.OTHER_TG_ID || '' , // Dev TG ID.
    AYUSH_TG_ID: process.env.AYUSH_TG_ID || '' , // Dev TG ID.
    NISHU_TG_ID: process.env.NISHU_TG_ID || '' , // Dev TG ID.
    DEV_TG_ID: process.env.DEV_TG_ID || '' , // Dev TG ID.
    ADMIN_TG_ID: process.env.ADMIN_TG_ID || '', // Your telegram id get it from http://telegram.dog/userinfobot
    BOT_TOKEN : process.env.BOT_TOKEN || '' , // Telegram bot token.
    AMAZON_TAG : process.env.AMAZON_TAG || '' , // Default Amazon affiliate tag
    AMAZON_TAG2 : process.env.AMAZON_TAG2 || '' , // Default Amazon affiliate tag
    AMAZON_TAG3 : process.env.AMAZON_TAG3 || '' , // Default Amazon affiliate tag
    FLIPKART_TAG : process.env.FLIPKART_TAG || '', // Default Flipkart affiliate tag
  BOT_TOKEN: process.env.BOT_TOKEN || "", // Telegram bot token.
  BOT_USERNAME: process.env.BOT_USERNAME || "",
  BITLY_API_KEY: process.env.BITLY_API_KEY, // Bitly api key
  FLIPKART_TAG : process.env.FLIPKART_TAG || '', // Default Flipkart affiliate tag
  FK_AFFEXTPARAM1 : process.env.FK_AFFEXTPARAM1 || '', // Fk affExtParam1
  FK_AFFEXTPARAM2 : process.env.FK_AFFEXTPARAM2 || '', // Fk affExtParam2
  TG_CHANNEL_ID: process.env.TG_CHANNEL_ID || '', // Telegram channel id
  TG_CHANNEL_ID2: process.env.TG_CHANNEL_ID2 || '', // dealsloot channel id
  DEALS_CHANNELS: process.env.DEALS_CHANNELS || "",
  REGULAR_CHANNELS: process.env.REGULAR_CHANNELS || "",
  TG_USER_APP_ID: process.env.TG_USER_APP_ID || '',
  TG_USER_APP_HASH: process.env.TG_USER_APP_HASH || '',
  TG_USER_SESSION_KEY: process.env.TG_USER_SESSION_KEY || '',
  TG_USER_PEER_ID: process.env.TG_USER_PEER_ID || '',
  PARAMS_TO_REMOVE:
		process.env.PARAMS_TO_REMOVE || 'app,src,redirect_prodid=amz', // Parameters to remove from the url. Separated by comma. Ex: utm_source,utm_medium,utm_campaign
	SEND_WITH_IMAGE:
		process.env.SEND_WITH_IMAGE && process.env.SEND_WITH_IMAGE == 'true'
			? true
			: false, // Send with image
	REPLACE_KEYWORDS: process.env.REPLACE_KEYWORDS || '', // Keywords to be replaced in msg. Separated by comma. Ex: amazon=AMAZON,flipkart=FLIPKART
	TG_USER_APP_ID: process.env.TG_USER_APP_ID || 7677284,
	TG_USER_APP_HASH:
		process.env.TG_USER_APP_HASH || '4446c1cdb4e1b19edd3a1d065b8e2af2',
	TG_USER_SESSION_KEY:
		process.env.TG_USER_SESSION_KEY ||
		'1BVtsOKwBu6AXKPWCUZNYz58eqaOdA2o5TE9OK1S3T8_O2mzYd65rlc8HFIcLr9YWeGujjUGti0v1cozEgI_QyiDXntMTNI1f8zUfCUHh7U7-Os434EGwu6gFtg5TIiqWD7YOrgalkLiO1DyjQow_hGdsRxip6IxHBXrLhBoJTXkflkKdu5jSyip2ws9DPsC3MkKq13nau_eoLsalyUdsUEpUwG_B0Nk3ZXqC2bSB3NHhUl_H1V7LIK3sN1_Jn5mAckTPJY3tYd7BwNct9GvaMtWNS_v0ZQKV1jvWlNfvhP_4TxpOZ-OI_pTPYcIPDf4Gedf4I1MZv0rpozCOtbWB8bgoOauzgYw=',
	TG_USER_PEER_ID: process.env.TG_USER_PEER_ID || '1289843128',
	SHOULD_USE_AFFID:
		process.env.SHOULD_USE_AFFID && process.env.SHOULD_USE_AFFID == 'true'
			? true
			: false,
	SHOULD_USE_EXTRAPE_FOR_FLIPKART:
		process.env.SHOULD_USE_EXTRAPE_FOR_FLIPKART &&
		process.env.SHOULD_USE_EXTRAPE_FOR_FLIPKART == 'true'
			? true
			: false,
	BOT_USERNAME: process.env.BOT_USERNAME || '@superDuperDealsBOT',
	FORWADING_FROM_OTHERS:
		process.env.FORWADING_FROM_OTHERS &&
		process.env.FORWADING_FROM_OTHERS == 'true'
			? true
			: false,
};
