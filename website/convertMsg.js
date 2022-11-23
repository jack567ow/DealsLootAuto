const unshort = require('./unshort');
const short = require('./short');
const cfg = require('../config');

const conLink = (link, merchant) => {
    let url = new URL(link);
    // console.log(url);
    cfg.PARAMS_TO_REMOVE.split(',').map(param => url.searchParams.delete(param.trim()));
    fresh = link.includes('fpw');
    seller = link.includes('smid');
    rewards = link.includes('rdpf');
    if (merchant === 'amazon' && !fresh && !seller && !rewards) {
        if (link.indexOf('/gp/product/') > -1 || link.indexOf('/dp/') > -1) {
            const id = link.split('?')[0].includes('dp') ? link.split('?')[0].split('/dp/')[1].split('/')[0] : link.split('?')[0].split('/gp/product/')[1].split('/')[0];
            url = new URL(`https://amazon.in/dp/${id}?psc=1&linkCode=ll2&tag=${cfg.AMAZON_TAG}`);
        } else {
            url.searchParams.set('tag', cfg.AMAZON_TAG);
        }
    } else if (merchant === 'flipkart') {
        url.searchParams.set('affid', cfg.FLIPKART_TAG);
       //  url.searchParams.set('affExtParam1', cfg.FK_AFFEXTPARAM1);
        // url.searchParams.set('affExtParam2', cfg.FK_AFFEXTPARAM2);
    }
    if (rewards && merchant === 'amazon') {
        let decodeurl = decodeURIComponent(link);
        const urlParams = new URLSearchParams(decodeurl);
        rewardAd = urlParams.get(`openid.return_to`);
        url = new URL(`${rewardAd}&tag=${cfg.AMAZON_TAG}`);
    }
    if (seller && merchant === 'amazon') {
        const id = link.split('?')[0].includes('dp') ? link.split('?')[0].split('/dp/')[1].split('/')[0] : link.split('?')[0].split('/gp/product/')[1].split('/')[0];
        SELLERID = link.match(/(?<=smid=)............../gm);
        url = new URL(`https://www.amazon.in/dp/${id}?smid=${SELLERID}&tag=${cfg.AMAZON_TAG}`);
    }
    if (fresh && merchant === 'amazon') {
        const id = link.split('?')[0].includes('dp') ? link.split('?')[0].split('/dp/')[1].split('/')[0] : link.split('?')[0].split('/gp/product/')[1].split('/')[0];
        url = new URL(`https://www.amazon.in/dp/${id}?linkCode=sl1&th=1&psc=1&fpw=alm&tag=${cfg.AMAZON_TAG}`);
    }
    return url.toString();
}

const conLink2 = (link, merchant) => {
    let url = new URL(link);
    // console.log(url);
    cfg.PARAMS_TO_REMOVE.split(',').map(param => url.searchParams.delete(param.trim()));
    fresh = link.includes('fpw');
    seller = link.includes('smid');
    rewards = link.includes('rdpf');
    if (merchant === 'amazon' && !fresh && !seller && !rewards) {
        if (link.indexOf('/gp/product/') > -1 || link.indexOf('/dp/') > -1) {
            const id = link.split('?')[0].includes('dp') ? link.split('?')[0].split('/dp/')[1].split('/')[0] : link.split('?')[0].split('/gp/product/')[1].split('/')[0];
            url = new URL(`https://amazon.in/dp/${id}?psc=1&linkCode=ll2&tag=${cfg.AMAZON_TAG2}`);
        } else {
            url.searchParams.set('tag', cfg.AMAZON_TAG2);
        }
    } else if (merchant === 'flipkart') {
        url.searchParams.set('affid', cfg.FLIPKART_TAG2);
       //  url.searchParams.set('affExtParam1', cfg.FK_AFFEXTPARAM1);
        // url.searchParams.set('affExtParam2', cfg.FK_AFFEXTPARAM2);
    }
    if (rewards && merchant === 'amazon') {
        let decodeurl = decodeURIComponent(link);
        const urlParams = new URLSearchParams(decodeurl);
        rewardAd = urlParams.get(`openid.return_to`);
        url = new URL(`${rewardAd}&tag=${cfg.AMAZON_TAG2}`);
    }
    if (seller && merchant === 'amazon') {
        const id = link.split('?')[0].includes('dp') ? link.split('?')[0].split('/dp/')[1].split('/')[0] : link.split('?')[0].split('/gp/product/')[1].split('/')[0];
        SELLERID = link.match(/(?<=smid=)............../gm);
        url = new URL(`https://www.amazon.in/dp/${id}?smid=${SELLERID}&tag=${cfg.AMAZON_TAG2}`);
    }
    if (fresh && merchant === 'amazon') {
        const id = link.split('?')[0].includes('dp') ? link.split('?')[0].split('/dp/')[1].split('/')[0] : link.split('?')[0].split('/gp/product/')[1].split('/')[0];
        url = new URL(`https://www.amazon.in/dp/${id}?linkCode=sl1&th=1&psc=1&fpw=alm&tag=${cfg.AMAZON_TAG2}`);
    }
    return url.toString();
}

const conLink3 = (link, merchant) => {
    let url = new URL(link);
    // console.log(url);
    cfg.PARAMS_TO_REMOVE.split(',').map(param => url.searchParams.delete(param.trim()));
    fresh = link.includes('fpw');
    seller = link.includes('smid');
    rewards = link.includes('rdpf');
    if (merchant === 'amazon' && !fresh && !seller && !rewards) {
        if (link.indexOf('/gp/product/') > -1 || link.indexOf('/dp/') > -1) {
            const id = link.split('?')[0].includes('dp') ? link.split('?')[0].split('/dp/')[1].split('/')[0] : link.split('?')[0].split('/gp/product/')[1].split('/')[0];
            url = new URL(`https://amazon.in/dp/${id}?psc=1&linkCode=ll2&tag=${cfg.AMAZON_TAG3}`);
        } else {
            url.searchParams.set('tag', cfg.AMAZON_TAG3);
        }
    } else if (merchant === 'flipkart') {
        url.searchParams.set('affid', cfg.FLIPKART_TAG2);
       //  url.searchParams.set('affExtParam1', cfg.FK_AFFEXTPARAM1);
        // url.searchParams.set('affExtParam2', cfg.FK_AFFEXTPARAM2);
    }
    if (rewards && merchant === 'amazon') {
        let decodeurl = decodeURIComponent(link);
        const urlParams = new URLSearchParams(decodeurl);
        rewardAd = urlParams.get(`openid.return_to`);
        url = new URL(`${rewardAd}&tag=${cfg.AMAZON_TAG3}`);
    }
    if (seller && merchant === 'amazon') {
        const id = link.split('?')[0].includes('dp') ? link.split('?')[0].split('/dp/')[1].split('/')[0] : link.split('?')[0].split('/gp/product/')[1].split('/')[0];
        SELLERID = link.match(/(?<=smid=)............../gm);
        url = new URL(`https://www.amazon.in/dp/${id}?smid=${SELLERID}&tag=${cfg.AMAZON_TAG3}`);
    }
    if (fresh && merchant === 'amazon') {
        const id = link.split('?')[0].includes('dp') ? link.split('?')[0].split('/dp/')[1].split('/')[0] : link.split('?')[0].split('/gp/product/')[1].split('/')[0];
        url = new URL(`https://www.amazon.in/dp/${id}?linkCode=sl1&th=1&psc=1&fpw=alm&tag=${cfg.AMAZON_TAG3}`);
    }
    return url.toString();
}

const cpl = (str) => str.charAt(0).toUpperCase() + str.slice(1);

const convertMsgs = async (msg,channel) => {
if (channel =='lootalert') {
    try {
        const urls = msg.match(/\bhttps?:\/\/\S+/gi);
        if (urls && urls.length > 0) {
            const lUrls = await unshort(urls);
            let finalMsg = msg;
            let status = 'error';
            await Promise.all(lUrls.map(async (lUrl, i) => {
                const link = lUrl.includes('linkredirect.in/visitretailer/474') ? decodeURIComponent(lUrl.split('&dl=')[1]) : lUrl;
                const merchant = link.split('//')[1].split('.')[1];
                if (merchant.match(/amazon|flipkart/i)) {
                    const extractedUrl = conLink2(link, merchant);
                    const finalUrl = await short(extractedUrl, merchant);
                    finalMsg = finalMsg.replace(urls[i], finalUrl);
                    if (cfg.REPLACE_KEYWORDS) cfg.REPLACE_KEYWORDS.split(',').map(keyword => {
                        let [key, value] = keyword.split('=');
                        [key, value] = [key.trim(), value.trim()];
                        finalMsg = finalMsg.replace(key, value);
                    })
                    return status = 'ok'
                } else {
                    if(urls.length > 1){
                        finalMsg = finalMsg.replace(urls[i], '');
                        return status = 'ok'
                    }else {
                        finalMsg = finalMsg.replace(urls[i], 'The message you send does not contain any affiliate link.');
                        return status = 'error';
                    }
                }
            }))
            return { status, finalMsg }
        }
    } catch (e) {
        console.log(e);
        return { status: 'error', msg: 'Something went wrong' }
    }
}
    if (channel =='autopost') {
        try {        
                  let finalMsg = msg;
                  let status = 'error';
                  const link = msg.match(/\bhttps?:\/\/\S+/gi);
                  await Promise.all(link.map(async (link, i) => {
                        const extractedUrl = conLink3(link, 'amazon');
                          const finalUrl = await short(extractedUrl, 'amazon');
                          finalMsg = finalMsg.replace(link, finalUrl);
                          return status = 'ok'
                  }))
                  return { status, finalMsg }
          } catch (e) {
              console.log(e);
              return { status: 'error', msg: 'Something went wrong' }
          }
      }
      
if (channel =='dealsloot') {
    try {
        const urls = msg.match(/\bhttps?:\/\/\S+/gi);
        if (urls && urls.length > 0) {
            const lUrls = await unshort(urls);
            let finalMsg = msg;
            let status = 'error';
            await Promise.all(lUrls.map(async (lUrl, i) => {
                const link = lUrl.includes('linkredirect.in/visitretailer/474') ? decodeURIComponent(lUrl.split('&dl=')[1]) : lUrl;
                const merchant = link.split('//')[1].split('.')[1];
                if (merchant.match(/amazon|flipkart/i)) {
                    const extractedUrl = conLink3(link, merchant);
                    const finalUrl = await short(extractedUrl, merchant);
                    finalMsg = finalMsg.replace(urls[i], finalUrl);
                    if (cfg.REPLACE_KEYWORDS) cfg.REPLACE_KEYWORDS.split(',').map(keyword => {
                        let [key, value] = keyword.split('=');
                        [key, value] = [key.trim(), value.trim()];
                        finalMsg = finalMsg.replace(key, value);
                    })
                    return status = 'ok'
                } else {
                    if(urls.length > 1){
                        finalMsg = finalMsg.replace(urls[i], '');
                        return status = 'ok'
                    }else {
                        finalMsg = finalMsg.replace(urls[i], 'The message you send does not contain any affiliate link.');
                        return status = 'error';
                    }
                }
            }))
            return { status, finalMsg }
        }
    } catch (e) {
        console.log(e);
        return { status: 'error', msg: 'Something went wrong' }
    }
} 
}
  
module.exports = convertMsgs;

// .replace(/\?.+/, '')

