const axios = require('axios');
const BitlyClient = require('bitly').BitlyClient;
const { BITLY_API_KEY, AMAZON_TAG } = require('../config.js');
const bitly = new BitlyClient(BITLY_API_KEY);

const short = async (url, merchant) => {
	try {
		if (merchant == 'flipkart') {
			const res = await axios.get(
				`https://affiliate.flipkart.com/a_url_shorten?url=${encodeURIComponent(
					url
				)}`
			);
			return res.data.response.shortened_url;
		} else {
			let link = new URL(url);
			let redirectUrl = link.searchParams.get('openid.return_to');
			if (redirectUrl) {
				let redirectLink = new URL(redirectUrl);
				redirectLink.searchParams.set('tag', AMAZON_TAG);
				url = redirectLink.toString();
			}
			return (await bitly.shorten(url)).link;
		}
	} catch (err) {
		console.log('Err:', err.message);
	}
};
module.exports = short;
