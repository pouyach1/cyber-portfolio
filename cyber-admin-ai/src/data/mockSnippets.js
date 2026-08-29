export const mockSnippets = [
  {
    id: "snip-1",
    title: "Aiogram: قالب پایه Webhook",
    lang: "Python",
    tags: ["aiogram", "webhook", "fastapi"],
    code: `@app.post("/webhook/{token}")
async def bot_webhook(token: str, request: Request):
    if token != BOT_TOKEN:
        raise HTTPException(403)
    update = types.Update(**await request.json())
    await dp.process_update(update)
    return {"ok": True}`,
  },
  {
    id: "snip-2",
    title: "Telegraf: منوی دکمه‌های شیشه‌ای",
    lang: "Node.js",
    tags: ["telegraf", "keyboard"],
    code: `bot.command("menu", (ctx) => {
  ctx.reply("یک گزینه را انتخاب کنید:", Markup.inlineKeyboard([
    [Markup.button.callback("📊 پرتفوی", "portfolio")],
    [Markup.button.callback("🔔 هشدارها", "alerts")],
  ]));
});`,
  },
  {
    id: "snip-3",
    title: "React: هوک جستجوی دیبانس‌شده",
    lang: "React",
    tags: ["hooks", "search"],
    code: `function useDebouncedValue(value, delay = 300) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}`,
  },
  {
    id: "snip-4",
    title: "PTB: تأیید پیش از پرداخت",
    lang: "Python",
    tags: ["python-telegram-bot", "payments"],
    code: `async def precheckout_callback(update: Update, context: ContextTypes.DEFAULT_TYPE):
    query = update.pre_checkout_query
    if query.invoice_payload != "expected_payload":
        await query.answer(ok=False, error_message="خطایی رخ داد.")
    else:
        await query.answer(ok=True)`,
  },
];
