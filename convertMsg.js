const unshort = require("./website/urlunshort");
const short = require("./short");
const cfg = require("./config");
const toRemovePathNames = ['dealsmagnet-com', 'Dealspoint', 'dealsmagnet.com', 'B01637IK4Q'];

function shouldRemovePathName(pathname) {
	return toRemovePathNames.some((name) => pathname.includes(name));
}

const conLink = (link, merchant) => {
  let url = new URL(link);
  // console.log(url);
  cfg.PARAMS_TO_REMOVE.split(",").map((param) =>
    url.searchParams.delete(param.trim())
  );
  fresh = link.includes("fpw");
  seller = link.includes("smid");
  rewards = link.includes("rdpf");
  if (merchant === "amazon" && !fresh && !seller && !rewards) {
    if (link.indexOf("/gp/product/") > -1 || link.indexOf("/dp/") > -1) {
      const id = link.split("?")[0].includes("dp")
        ? link.split("?")[0].split("/dp/")[1].split("/")[0]
        : link.split("?")[0].split("/gp/product/")[1].split("/")[0];
      url = new URL(
        `https://amazon.in/dp/${id}?psc=1&linkCode=ll2&tag=${cfg.AMAZON_TAG}`
      );
    } else {
      let pathnameArray = url.pathname.split('/');
				pathnameArray = pathnameArray.filter(
					(item) => !shouldRemovePathName(item)
				);
				url.pathname = pathnameArray.join('/');
      url.searchParams.set("tag", cfg.AMAZON_TAG);
    }
  } else if (merchant === 'flipkart' &&
  cfg.SHOULD_USE_AFFID) {
    url.searchParams.set("affid", cfg.FLIPKART_TAG);
    url.searchParams.set('affExtParam1', cfg.FK_AFFEXTPARAM1);
    url.searchParams.set('affExtParam2', cfg.FK_AFFEXTPARAM2);
  }
  if (rewards && merchant === 'amazon') {
            let decodeurl = decodeURIComponent(link);
        const urlParams = new URLSearchParams(decodeurl);
        rewardAd = urlParams.get(`openid.return_to`);
        url = new URL(`${rewardAd}&tag=${cfg.AMAZON_TAG}`);
  }
  if (seller && merchant === "amazon") {
    const id = link.split("?")[0].includes("dp")
      ? link.split("?")[0].split("/dp/")[1].split("/")[0]
      : link.split("?")[0].split("/gp/product/")[1].split("/")[0];
    SELLERID = link.match(/(?<=smid=)............../gm);
    url = new URL(
      `https://www.amazon.in/dp/${id}?smid=${SELLERID}&tag=${cfg.AMAZON_TAG}`
    );
  }
  if (fresh && merchant === "amazon") {
    const id = link.split("?")[0].includes("dp")
      ? link.split("?")[0].split("/dp/")[1].split("/")[0]
      : link.split("?")[0].split("/gp/product/")[1].split("/")[0];
    url = new URL(
      `https://www.amazon.in/dp/${id}?linkCode=sl1&th=1&psc=1&fpw=alm&tag=${cfg.AMAZON_TAG}`
    );
  }
  return url.toString();
};

module.exports = conLink;


const cpl = (str) => str.charAt(0).toUpperCase() + str.slice(1);

const convertMsg = async (msg) => {
  try {
    const urls = msg.match(/\bhttps?:\/\/\S+/gi);
    let status = "ok";
    let shouldUseExtrape = false;
    if (urls && urls.length > 0) {
      const lUrls = await unshort(urls);
      // console.log(lUrls);
      let finalMsg = msg;
      await Promise.all(
        lUrls.map(async (lUrl, i) => {
          const link = lUrl.includes("linkredirect.in/visitretailer/474")
            ? decodeURIComponent(lUrl.split("&dl=")[1])
            : lUrl;
          const merchant = link.split("//")[1].split(".")[1];
          // console.log(merchant);
          if (merchant.match(/amazon|flipkart/i)) {
            if (!lUrl.includes("t.me")) {
              if (
                merchant == "flipkart" &&
                cfg.SHOULD_USE_EXTRAPE_FOR_FLIPKART
              ) {
                const finalUrl = conLink(link, merchant);
                finalMsg = finalMsg.replace(urls[i], finalUrl);
                console.log("forwading to extrape");
                shouldUseExtrape = true;
              } else {
                const extractedUrl = conLink(link, merchant);
                const finalUrl = await short(extractedUrl, merchant);
                finalMsg = finalMsg.replace(urls[i], finalUrl);
              }
              if (cfg.REPLACE_KEYWORDS)
                cfg.REPLACE_KEYWORDS.split(",").map((keyword) => {
                  let [key, value] = keyword.split("=");
                  [key, value] = [key.trim(), value.trim()];
                  finalMsg = finalMsg.replace(key, value);
                });
            } else {
              return;
            }
            if (shouldUseExtrape) {
              status = "other-dontsend";
            }
          } else {
            if (merchant.match(/ajio|myntra/i)) {
              for (let i = 0; i < urls.length; i++) {
                finalMsg = finalMsg.replace(urls[i], lUrls[i]);
              }
              status = "other-earnkaro";
            } else {
              status = "other";
            }
            return;
          }
        })
      );
      return { status, finalMsg };
    }
  } catch (e) {
    console.error(e);
    return { status: "error", msg: "Something went wrong" };
  }
};

module.exports = convertMsg;

// .replace(/\?.+/, '')
