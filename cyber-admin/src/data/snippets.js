export const snippets = [
  {
    id: "snip-1",
    title: "Aiogram: Webhook Handler Boilerplate",
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
    title: "Telegraf: Inline Keyboard Menu",
    lang: "Node.js",
    tags: ["telegraf", "keyboard"],
    code: `bot.command("menu", (ctx) => {
  ctx.reply("Choose an option:", Markup.inlineKeyboard([
    [Markup.button.callback("📊 Portfolio", "portfolio")],
    [Markup.button.callback("🔔 Alerts", "alerts")],
  ]));
});`,
  },
  {
    id: "snip-3",
    title: "React: Debounced Search Hook",
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
    title: "PTB: Payment Pre-Checkout",
    lang: "Python",
    tags: ["python-telegram-bot", "payments"],
    code: `async def precheckout_callback(update: Update, context: ContextTypes.DEFAULT_TYPE):
    query = update.pre_checkout_query
    if query.invoice_payload != "expected_payload":
        await query.answer(ok=False, error_message="Something went wrong.")
    else:
        await query.answer(ok=True)`,
  },
];
