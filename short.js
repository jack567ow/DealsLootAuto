const axios = require('axios');
const BitlyClient = require('bitly').BitlyClient;
const { BITLY_API_KEY} = require('./config.js');
const bitly = new BitlyClient(BITLY_API_KEY);

const short = async (url, merchant) => {
        try{
            if(merchant == 'flipkart'){
                const res = await axios.get(`https://affiliate.flipkart.com/a_url_shorten?url=${encodeURIComponent(url)}`);
                return res.data.response.shortened_url;
            }else{
                return (await bitly.shorten(url)).link;
            }
        }catch(err){
                console.log(err);
                return url
        }
}
module.exports = short;
