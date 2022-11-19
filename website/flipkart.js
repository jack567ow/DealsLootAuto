const cheerio = require('cheerio');
const axios = require('axios');
const convertMsg = require("./convertMsg");


const FKWithInfoAndPrice = async (url, merchant) => {
    try {
        const res = await axios.get(url, {
            headers: {
                "User-Agent":
                    "Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.111 Safari/537.36",
            },
        });
        console.log(url);
        const $ = cheerio.load(res.data);
        try {
            const BRAND = $('.yhB1nd .G6XhRU').text().trim();
            console.log(`FK`);
            const price =
                parseInt(
                    $('._3yRFQ5')
                        .text()
                        .trim()
                        .replace(/^\D+|[^0-9.]/g, "")
                ) ||
                parseInt(
                    $('div[class="_30jeq3 _16Jk6d"]')
                        .text()
                        .trim()
                        .replace(/^\D+|[^0-9.]/g, "")
                );
            const title = $('.B_NuCI').text().trim();
            let Msg = `${BRAND}\n\n${title} @ ${price}\n\n${url}`
            console.log(Msg);
            const resMsg = await convertMsg(Msg, merchant);
            return resMsg;
    } catch (e) {
        console.log(e);
        return null;
    }
} catch (e) {
    console.log(e);
    return null;
}
};

module.exports = { FKWithInfoAndPrice };