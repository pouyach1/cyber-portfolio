import { formatToman } from "../../lib/format";

/**
 * This engine builds genuinely useful Persian summaries from the actual
 * bots/projects/invoices in the dashboard — it's not just canned text.
 *
 * To upgrade to a real LLM (OpenAI, Claude, etc.), replace the body of
 * `generateChatReply` with a fetch() to your own backend endpoint (never
 * call a paid LLM API directly from the browser — proxy it through a
 * server function so your key stays secret), and pass this same
 * `buildContext()` output as the system context.
 */
export function buildContext({ bots, projects, invoices }) {
  const erroredBots = bots.filter((b) => b.status === "error");
  const pausedBots = bots.filter((b) => b.status === "paused");
  const urgentProjects = projects.filter((p) => {
    const daysLeft = Math.ceil((new Date(p.deadline).getTime() - Date.now()) / 86400000);
    return daysLeft <= 3 && p.status !== "delivered";
  });
  const overdueInvoices = invoices.filter((i) => (i.overdue_days ?? 0) > 0);
  const totalUnpaid = invoices.reduce((sum, i) => sum + i.total_amount, 0);

  return { erroredBots, pausedBots, urgentProjects, overdueInvoices, totalUnpaid };
}

export function morningBriefing({ bots, projects, invoices }) {
  const { erroredBots, pausedBots, urgentProjects, overdueInvoices, totalUnpaid } = buildContext({
    bots,
    projects,
    invoices,
  });

  const lines = [`☀️ صبح بخیر! این خلاصه‌ی امروزته:`];

  if (urgentProjects.length > 0) {
    lines.push(
      `⏰ ${urgentProjects.length} پروژه کمتر از ۳ روز تا ددلاین دارن: ${urgentProjects
        .map((p) => p.client_name)
        .join("، ")}`
    );
  } else {
    lines.push(`✅ هیچ پروژه‌ای ددلاین فوری نداره — روز آروم‌ایه.`);
  }

  if (erroredBots.length > 0) {
    lines.push(`🚨 ${erroredBots.length} ربات در وضعیت خطا هستن: ${erroredBots.map((b) => b.name).join("، ")}`);
  }
  if (pausedBots.length > 0) {
    lines.push(`⏸️ ${pausedBots.length} ربات متوقف‌ان: ${pausedBots.map((b) => b.name).join("، ")}`);
  }

  if (overdueInvoices.length > 0) {
    lines.push(
      `💸 ${overdueInvoices.length} فاکتور معوقه داری (مجموع ${formatToman(totalUnpaid)}) — پیشنهاد می‌کنم یادآوری بفرستی.`
    );
  } else {
    lines.push(`💰 هیچ فاکتور معوقه‌ای نیست.`);
  }

  lines.push(`بریم یه روز خفن بسازیم 🚀`);
  return lines.join("\n");
}

export function strategicAudit({ bots, projects, invoices }) {
  const totalRevenuePipeline = projects.reduce((sum, p) => sum + p.budget, 0);
  const inProgress = projects.filter((p) => p.status === "in_progress").length;
  const avgLatency = Math.round(bots.reduce((sum, b) => sum + b.latency_ms, 0) / (bots.length || 1));
  const highLatencyBots = bots.filter((b) => b.latency_ms > 300);

  const lines = [
    `📊 تحلیل استراتژیک این ماه:`,
    `— ارزش کل پروژه‌های در جریان: ${formatToman(totalRevenuePipeline)} (${inProgress} پروژه فعال)`,
    `— میانگین تأخیر ربات‌ها: ${avgLatency}ms`,
  ];

  if (highLatencyBots.length > 0) {
    lines.push(
      `⚠️ پیشنهاد فنی: ${highLatencyBots
        .map((b) => b.name)
        .join("، ")} تأخیر بالایی دارن — بررسی webhook یا ارتقای هاست رو در نظر بگیر.`
    );
  }

  lines.push(
    `💡 پیشنهاد رشد: با توجه به تعداد ربات‌های فعال، می‌تونی یه پلن "نگهداری ماهانه" برای مشتری‌های ربات پیشنهاد بدی — درآمد ثابت‌تر و بار پشتیبانی قابل پیش‌بینی‌تر.`
  );

  return lines.join("\n");
}

export function deepFocusPlan() {
  return [
    `🌙 حالت تمرکز عمیق فعال شد — برای ۲ ساعت آینده.`,
    `پیشنهاد برنامه:`,
    `۱. (۴۵ دقیقه) مهم‌ترین کار امروز رو بدون وقفه پیش ببر`,
    `۲. (۱۰ دقیقه) استراحت کوتاه`,
    `۳. (۴۵ دقیقه) دومین اولویت یا رفع باگ فوری`,
    `۴. (۲۰ دقیقه) مرور و آماده‌سازی برای فردا`,
    `هشدارهای غیرضروری تا پایان این بازه ساکت می‌مونن.`,
  ].join("\n");
}

const KEYWORD_REPLIES = [
  {
    match: /خسته|فرسود|burnout|استرس/,
    reply:
      "می‌فهمم، این روزها فشار کاری زیاده. یادت باشه استراحت کوتاه هم بخشی از کار حرفه‌ایه، نه تنبلی. می‌خوای یه وقفه‌ی ۱۰ دقیقه‌ای رو تو برنامه‌ت بذارم؟",
  },
  {
    match: /قیمت|هزینه|تعرفه/,
    reply:
      "برای قیمت‌گذاری، پیشنهادم اینه که بر اساس ارزش تحویلی قیمت بدی نه فقط ساعت کار — مخصوصاً برای پروژه‌های هوش مصنوعی و ربات که ارزش بالایی برای مشتری دارن.",
  },
  {
    match: /هدف|goal|برنامه بلندمدت/,
    reply: "بگو هدفت چیه تا تو حافظه‌م ثبتش کنم و هر چند وقت یه‌بار پیگیرش باشم.",
  },
];

/**
 * Free-text chat reply. This is intentionally simple pattern-matching —
 * swap this function's body for a real LLM call when ready (see file
 * header comment).
 */
export function generateChatReply(message, context) {
  const found = KEYWORD_REPLIES.find((k) => k.match.test(message));
  if (found) return found.reply;

  if (/بریفینگ|صبح/.test(message)) return morningBriefing(context);
  if (/استراتژ|آدیت|تحلیل/.test(message)) return strategicAudit(context);
  if (/تمرکز|فوکوس/.test(message)) return deepFocusPlan();

  return "متوجه شدم! می‌تونم کمکت کنم پیشنهاد قیمت بنویسم، برنامه‌ی امروزت رو مرتب کنم، یا یه بررسی استراتژیک از وضعیت کسب‌وکارت بدم. کدومش رو می‌خوای؟";
}
