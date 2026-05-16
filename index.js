const { Telegraf } = require('telegraf');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const bot = new Telegraf(process.env.BOT_TOKEN);
const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);

bot.start((ctx) => {
    if (ctx.from.id == process.env.ADMIN_ID) {
        ctx.reply("🔱 نظام Black Control متصل.. أهلاً بك يا سيدي.");
    } else {
        ctx.reply("❌ الوصول مرفوض.");
    }
});

bot.on('text', async (ctx) => {
    if (ctx.from.id != process.env.ADMIN_ID) return;
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    try {
        const result = await model.generateContent(ctx.message.text);
        const response = await result.response;
        ctx.reply(response.text());
    } catch (e) {
        ctx.reply("حدث خطأ، تأكد من الـ API Key.");
    }
});

bot.launch();
