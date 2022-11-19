const axios = require("axios");

const resolveUrl = async (url) => {
  try {
    const req = await axios.get(url);
    const longUrl = req.request.res.responseUrl
      ? req.request.res.responseUrl
      : req.request._redirectable._currentUrl
      ? req.request._redirectable._currentUrl
      : req.request._currentUrl
      ? req.request._currentUrl
      : req.request._options.href
      ? req.request._options.href
      : "https://" + req.request.host + req.request.path;
    return longUrl ? longUrl : url;
  } catch (err) {
    const longUrl = err.request.res.responseUrl
      ? err.request.res.responseUrl
      : err.request._redirectable._currentUrl
      ? err.request._redirectable._currentUrl
      : err.request._currentUrl
      ? err.request._currentUrl
      : err.request._options.href
      ? err.request._options.href
      : "https://" + err.request.host + err.request.path;
    return longUrl ? longUrl : url;
  }
};

module.exports = resolveUrl;
