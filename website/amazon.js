const amazonScraper = require('amazon-buddy');
const convertMsg = require("./convertMsg");
const amazonWithInfoAndPrice = async (link,channel) => {
  try {
  if (link.indexOf("/gp/product/") > -1 || link.indexOf("/dp/") > -1) {
    const id = link.split("?")[0].includes("dp")
      ? link.split("?")[0].split("/dp/")[1].split("/")[0]
      : link.split("?")[0].split("/gp/product/")[1].split("/")[0];
        const product_by_asin = await amazonScraper.asin({ asin: id, country: 'IN' });
        const data = (product_by_asin.result)[0];
       let Msg = `${(data.title)} @${(data.price.current_price)}\n\n${(data.url)}`;
       const resMsg = await convertMsg(Msg,'autopost');
      return resMsg;
    }
  } catch (e) {
    console.log(e);
    return null;
  }
};

module.exports = { amazonWithInfoAndPrice };