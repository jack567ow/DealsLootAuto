const axios = require('axios');
const unshort = async(urls) => {
    const longUrls = await Promise.all(urls.map(async url => { 
        const extractUrl = req => req?.request?.res?.responseUrl || 
        req?.request?._redirectable?._currentUrl ||  
        req?.request?._currentUrl ||  
        req?.request?._options?.href || 
        'https://'+ req?.request?.host + req?.request?.path;
      
          try{
              const req = await axios.get(url);
              const result = extractUrl(req);
              var longUrl = result ? result : url;
          }catch(err){
              const result = extractUrl(err);
              var longUrl = result ? result : url;
          }
        return longUrl;
}))
    return longUrls;
}

module.exports = unshort;