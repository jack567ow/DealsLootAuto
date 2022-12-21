const client = require('./client');
const { Bot } = require("grammy");
require('./newDeals')
const cfg = require("./config");
const convertMsg = require("./convertMsg");
const convertMsgs = require("./website/convertMsg");
const bot = new Bot(cfg.BOT_TOKEN); // Initialize bot
const emojiRegex = require('emoji-regex')();
const { amazonWithInfoAndPrice } = require("./website/amazon");
// const { FKWithInfoAndPrice } = require("./website/flipkart");
const urlunshort = require('./website/unshort');
;
const urlRegex = /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i;

const isUrl = (str) => { // Return true if string is a valid URL
  return urlRegex.test(str);
};



// Command
const cmd = (cmd, desc) => ({command: cmd, description: desc});
try{
  bot.api.setMyCommands([cmd('start', 'Start'),cmd('lootalert', 'Lootalert Convert'),cmd('dealsloot', 'Dealsloot SEND'),cmd('autoconvert', 'Auto Convert')]);
}catch(e){
  console.error('Failed to set commands.');
}

const senErrMsg = async (ctx) => {
  ctx.reply('An Error has occurred while processing this message.\nLooks like The message you send does not contain any affiliate link. \n\nPlease send valid message containing link.', { reply_to_message_id: ctx.message.message_id });
}

// Start command
bot.command('start', (ctx) => {
  if (
    ctx.chat.type == "private" &&
    (ctx.chat.id == cfg.ADMIN_TG_ID ||
      ctx.chat.id == cfg.DEV_TG_ID ||
      ctx.chat.id == cfg.TG_USER_PEER_ID)
  ) {
    try {
    ctx.reply(
      `Hello, ${ctx.from.first_name}!\n\nI'm An Affiliate Bot. I can convert links into affiliate links`,
      {disable_web_page_preview: true, reply_to_message_id: ctx.message.message_id}
    );
  }catch (e){}
}
});

bot.command("autoconvert", async (ctx) => {
  if (
  ctx.chat.type == "private" &&
  (ctx.chat.id == cfg.ADMIN_TG_ID ||
    ctx.chat.id == cfg.NISHU_TG_ID ||
   ctx.chat.id == cfg.OTHER_TG_ID ||
   ctx.chat.id == cfg.DEV_TG_ID ||
    ctx.chat.id == cfg.AYUSH_TG_ID)
) {
  try {
    const message = (ctx.message?.reply_to_message?.text || ctx.message?.reply_to_message?.caption || ctx.message?.text || ctx.message?.caption)
    const DeaUrl = (message.match(/\bhttps?:\/\/\S+/gi))[0];
    const url = await urlunshort(DeaUrl);
    const productUrl =
      "http" + url.split("http")[1].split(" ")[0].replace("dl.", "www.");
    if (isUrl(productUrl))
    try {
        const merchant = productUrl
          .replace("www.", "")
          .split("//")[1]
          .split(".")[0];
        if (merchant.match(/amazon/gi)) {
          try {
          const data = await amazonWithInfoAndPrice(productUrl, merchant , 'autopost');
          if (data.status == "ok") {
            ctx.reply( data?.finalMsg, { reply_to_message_id: ctx.message.message_id, disable_web_page_preview: true });
            ctx.api.sendMessage(cfg.TG_CHANNEL_ID2,  data?.finalMsg, { disable_web_page_preview: true });
        }
        } catch (e) {
          console.error(e);
          senErrMsg(ctx);
        }
      }
      } catch (e) {
        console.error(e);
        senErrMsg(ctx);
      }
  } catch (e) {
    console.error(e);
    senErrMsg(ctx);
  }

}
});

bot.command('dealsloot', async (ctx) => {
    if (
    ctx.chat.type == "private" &&
    (ctx.chat.id == cfg.ADMIN_TG_ID ||
      ctx.chat.id == cfg.NISHU_TG_ID ||
     ctx.chat.id == cfg.OTHER_TG_ID ||
     ctx.chat.id == cfg.DEV_TG_ID ||
      ctx.chat.id == cfg.AYUSH_TG_ID)
  ) {
  try {
    const message = ctx.message?.reply_to_message?.text || ctx.message?.reply_to_message?.caption || ctx.message?.text || ctx.message?.caption;
    const data = await convertMsgs(message.replace('/dealsloot', ''), 'dealsloot');
    if (data?.status == 'ok') {
      if (ctx?.message?.photo && cfg?.SEND_WITH_IMAGE) {
        ctx.replyWithPhoto(ctx.message.photo[0].file_id, { caption: data.finalMsg, reply_to_message_id: ctx.message.message_id, disable_web_page_preview: true });
        ctx.api.sendPhoto(cfg?.TG_CHANNEL_ID2, ctx.message?.photo[0]?.file_id, { caption: data?.finalMsg, disable_web_page_preview: true });
      } else {
        ctx.reply(data.finalMsg, { reply_to_message_id: ctx.message.message_id, disable_web_page_preview: true });
        ctx.api.sendMessage(cfg.TG_CHANNEL_ID2, data?.finalMsg, { disable_web_page_preview: true });
      }
    } else {
      senErrMsg(ctx);
    }
  } catch (e) {
    console.log(e);
    senErrMsg(ctx);
  }
}
});


bot.command('lootalert', async (ctx) => {
    if (
    ctx.chat.type == "private" &&
    (ctx.chat.id == cfg.ADMIN_TG_ID ||
      ctx.chat.id == cfg.NISHU_TG_ID ||
     ctx.chat.id == cfg.OTHER_TG_ID ||
     ctx.chat.id == cfg.DEV_TG_ID ||
      ctx.chat.id == cfg.AYUSH_TG_ID)
  ) {
  try {
    const message = ctx.message?.reply_to_message?.text || ctx.message?.reply_to_message?.caption || ctx.message?.text || ctx.message?.caption;
    const data = await convertMsgs(message.replace('/lootalert', ''), 'lootalert');
    if (data?.status == 'ok') {
      if ((ctx.message?.photo || ctx.message?.reply_to_message?.photo) && cfg?.SEND_WITH_IMAGE) {
        ctx.replyWithPhoto((ctx.message?.reply_to_message?.photo[0]?.file_id || ctx.message?.photo[0]?.file_id), { caption: data?.finalMsg, reply_to_message_id: ctx.message.message_id, disable_web_page_preview: true });
      } else {
        ctx.reply(data?.finalMsg, { reply_to_message_id: ctx.message?.message_id, disable_web_page_preview: true });
      }
    } else {
      senErrMsg(ctx);
    }
  } catch (e) {
    console.log(e);
    senErrMsg(ctx);
  }
}
});

bot.on('message', async (ctx) => {
  try{
    if (
    ctx.chat.type == "private" &&
    (ctx.chat.id == cfg.ADMIN_TG_ID ||
      ctx.chat.id == cfg.NISHU_TG_ID ||
     ctx.chat.id == cfg.OTHER_TG_ID ||
     ctx.chat.id == cfg.DEV_TG_ID ||
      ctx.chat.id == cfg.AYUSH_TG_ID)
  ) {
        try {
          const data = await convertMsg(ctx.message?.text || ctx.message?.caption);
          if (data?.status == 'ok') {
            if (ctx?.message?.photo && cfg?.SEND_WITH_IMAGE) {
              ctx.replyWithPhoto(ctx.message.photo[0].file_id, { caption: data.finalMsg, reply_to_message_id: ctx.message.message_id, disable_web_page_preview: true });
              ctx.api.sendPhoto(cfg?.TG_CHANNEL_ID, ctx.message?.photo[0]?.file_id, { caption: data?.finalMsg, disable_web_page_preview: true });
            } else {
              ctx.reply(data.finalMsg, { reply_to_message_id: ctx.message.message_id, disable_web_page_preview: true });
              ctx.api.sendMessage(cfg.TG_CHANNEL_ID, data?.finalMsg, { disable_web_page_preview: true });
            }
          } else {
            senErrMsg(ctx);
          }
        } catch (e) {
          console.log(e);
          senErrMsg(ctx);
        }
      }
  }catch (e) {}
});

bot.start();
console.log('bot is up and running');





// bot.on("message", async (ctx) => {
//   if (
//     ctx.chat.type == "private" &&
//     (ctx.chat.id == cfg.ADMIN_TG_ID ||
//       ctx.chat.id == cfg.DEV_TG_ID ||
//       ctx.chat.id == cfg.TG_USER_PEER_ID)
//   ) {
//     try {
//       const data = await convertMsg(ctx.message.text || ctx.message.caption);
//       let resMsg = "AE625353";
//       if (data.finalMsg) {
//         resMsg = data.finalMsg.replace(emojiRegex, "");
//       }
//       if (data?.status == 'ok') {
//         if (ctx?.message?.photo && cfg?.SEND_WITH_IMAGE) {
//         ctx.replyWithPhoto(ctx.message.photo[0].file_id, { caption: data.finalMsg, reply_to_message_id: ctx.message.message_id, disable_web_page_preview: true });
//         ctx.api.sendPhoto(cfg?.TG_CHANNEL_ID, ctx.message?.photo[0]?.file_id, { caption: data?.finalMsg, disable_web_page_preview: true });
//         } else {
//           ctx.api.sendMessage(cfg.TG_CHANNEL_ID, resMsg, {disable_web_page_preview: true});
//           ctx.reply(resMsg, {reply_to_message_id: ctx.message.message_id,disable_web_page_preview: true});
//         }
//       } else if (data.status == "other" || data.status == "other-dontsend") {
//         try {
//           await client.sendMessage("@ExtraPeBot", {
//             message: resMsg,
//           });
//         } catch (err) {
//           console.error(err.message);
//         }
//       } else if (data.status == "other-earnkaro") {
//         try {
//           await client.sendMessage("@ekmaster_bot", {
//             message: resMsg,
//           });
//         } catch (err) {
//           console.error(err.message);
//         }
//       } else {
//         senErrMsg(ctx);
//       }
//     } catch (e) {
//       console.error(e);
//       senErrMsg(ctx);
//     }
//   } else {
//     ctx.reply(
//       `Hello, ${ctx.from.first_name}!\n\nI'm An Affiliate Bot. I can convert links into affiliate links.\n\n`,
//       { disable_web_page_preview: true }
//     );
//   }
// });

// bot.command('convert', async (ctx) => {
//   try {
//     const message = ctx.message?.reply_to_message?.text || ctx.message?.reply_to_message?.caption || ctx.message?.text || ctx.message?.caption;
//     const data = await convertMsg(message.replace('/convert ', ''));
//     if (data?.status == 'ok') {
//       if ((ctx.message?.photo || ctx.message?.reply_to_message?.photo) && cfg?.SEND_WITH_IMAGE) {
//         ctx.replyWithPhoto((ctx.message?.reply_to_message?.photo[0]?.file_id || ctx.message?.photo[0]?.file_id), { caption: data?.finalMsg, reply_to_message_id: ctx.message.message_id, disable_web_page_preview: true });
//       } else {
//         ctx.reply(data?.finalMsg, { reply_to_message_id: ctx.message?.message_id, disable_web_page_preview: true });
//       }
//     } else {
//       senErrMsg(ctx);
//     }
//   } catch (e) {
//     console.log(e);
//     senErrMsg(ctx);
//   }
// });


// bot.command("coc", async (ctx) => {
//   if (
//     ctx.chat.type == "private" &&
//     (ctx.chat.id == cfg.ADMIN_TG_ID ||
//       ctx.chat.id == cfg.DEV_TG_ID ||
//       ctx.chat.id == cfg.TG_USER_PEER_ID)
//   ) {
//     try {
//       const data = await cocubulaConvert(
//         ctx.message.text || ctx.message.caption
//       );
//       if (data.status == "ok") {
//         let resMsg = data.finalMsg.replace("/coc ", "");
//         if (ctx.message.photo && cfg.SEND_WITH_IMAGE) {
//           ctx.replyWithPhoto(ctx.message.photo[0].file_id, {
//             caption: resMsg,
//             reply_to_message_id: ctx.message.message_id,
//             disable_web_page_preview: true,
//           });
//         } else {
//           ctx.reply(resMsg, {
//             reply_to_message_id: ctx.message.message_id,
//             disable_web_page_preview: true,
//           });
//         }
//       } else {
//         ctx.reply(
//           "cant convert this link as this conversion is handled by third-party bots"
//         );
//       }
//     } catch (e) {
//       console.error(e);
//       senErrMsg(ctx);
//     }
//   } else {
//     ctx.reply(
//       `Hello, ${ctx.from.first_name}!\n\nI'm An Affiliate Bot. I can convert links into affiliate links.\n\n`,
//       { disable_web_page_preview: true }
//     );
//   }
// });

// bot.command("rkworld", async (ctx) => {
//   if (
//     ctx.chat.type == "private" &&
//     (ctx.chat.id == cfg.ADMIN_TG_ID ||
//       ctx.chat.id == cfg.DEV_TG_ID ||
//       ctx.chat.id == cfg.TG_USER_PEER_ID)
//   ) {
//     try {
//       const data = await RKWORLDINFOCOMConvert(
//         ctx.message.text || ctx.message.caption
//       );
//       if (data.status == "ok") {
//         let resMsg = data.finalMsg.replace("/rkworld", "");
//         if (ctx.message.photo && cfg.SEND_WITH_IMAGE) {
//           ctx.replyWithPhoto(ctx.message.photo[0].file_id, {
//             caption: resMsg,
//             reply_to_message_id: ctx.message.message_id,
//             disable_web_page_preview: true,
//           });
//         } else {
//           ctx.reply(resMsg, {
//             reply_to_message_id: ctx.message.message_id,
//             disable_web_page_preview: true,
//           });
//         }
//       } else {
//         ctx.reply(
//           "cant convert this link as this conversion is handled by third-party bots"
//         );
//       }
//     } catch (e) {
//       console.error(e);
//       senErrMsg(ctx);
//     }
//   } else {
//     ctx.reply(
//       `Hello, ${ctx.from.first_name}!\n\nI'm An Affiliate Bot. I can convert links into affiliate links.\n\n`,
//       { disable_web_page_preview: true }
//     );
//   }
// });
// bot.launch();

// console.log('bot is up and running');
