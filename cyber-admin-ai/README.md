# سایبردو — پنل مدیریت و دستیار هوشمند (Persian, RTL)

پنل مدیریت کاملاً فارسی و راست‌به‌چپ برای یک طراح وب و معمار ربات تلگرام، با
دستیار هوشمند ۳۶۰ درجه. ساخته‌شده با React + Vite، Tailwind CSS، Zustand،
Recharts، lucide-react و Supabase.

این پروژه از همون معماری ماژولار پروژه‌های قبلی (`cyber-portfolio`,
`cyber-admin`) پیروی می‌کنه، با سه تفاوت اصلی: **فارسی/RTL کامل**، **اتصال به
دیتابیس مشترک Supabase**، و **ماژول دستیار هوشمند**.

## راه‌اندازی

```bash
npm install
cp .env.example .env.local   # اطلاعات Supabase پروژه‌ی اصلی رو اینجا بذار
npm run dev                   # http://localhost:5175
```

اگه `.env.local` رو تنظیم نکنی، برنامه به‌صورت خودکار با داده‌ی نمایشی محلی
(`src/data/mock*.js`) کار می‌کنه — یه نوار زرد بالای صفحه هم یادآوری می‌کنه که
در حالت آفلاینی.

## معماری دیتابیس مشترک ⚠️ مهم‌ترین بخش

این پنل باید دقیقاً به همون پروژه‌ی Supabase وصل بشه که سایت اصلی
(`cyber-portfolio`) و بک‌اند ربات‌های تلگرام (سرویس‌های پایتون/Node) بهش وصلن.
تعریف کامل جدول‌ها با اینترفیس‌های TypeScript و SQL آماده برای Supabase SQL
Editor در `src/types/database.d.ts` هست:

- **`bots`** — نام، وضعیت، توکن ماسک‌شده، کاربران فعال، تأخیر، آپ‌تایم، URL وبهوک، لاگ‌ها، متریک‌ها
- **`projects`** — مشتری، نوع، بودجه، درصد پیشرفت، وضعیت (backlog/in_progress/qa/delivered)، ددلاین، اطلاعات ورود رمزشده، فایل‌ها
- **`invoices`** — مشتری، آیتم‌های فاکتور، مبلغ کل، وضعیت پرداخت، سررسید، chat_id تلگرام (برای یادآوری مستقیم)
- **`ai_memory`** — تاریخچه‌ی گفتگو با دستیار هوشمند، وظایف زمان‌بندی‌شده، اهداف کاربر، برنامه‌های استراتژیک، یادداشت‌های حال‌وهوا

هر سه پروژه (این پنل، سایت اصلی، بک‌اند ربات‌ها) باید همین جدول‌ها رو
بخونن/بنویسن — یعنی مثلاً وقتی رباتی خطا می‌ده و بک‌اند پایتون وضعیتش رو تو
جدول `bots` آپدیت می‌کنه، همون لحظه (به لطف Supabase Realtime که در
`src/hooks/useSupabaseTable.js` فعاله) این پنل هم آپدیت می‌شه، بدون رفرش.

### الگوی هوک‌ها
هر جدول یه هوک اختصاصی داره که روی `useSupabaseTable.js` سوار شده:
`useBots`, `useProjects`, `useInvoices`, `useAiMemory` — هر کدوم وقتی
Supabase پیکربندی نشده باشه، خودکار به mock داده‌ی همون شکل سوییچ می‌کنن، پس
UI هیچ‌وقت کرش نمی‌کنه.

## دستیار هوشمند ۳۶۰ درجه

`src/components/ai-companion/` — شامل:
- **چت متنی** (`ChatWidget.jsx`) با آواتار انیمیت
- **سه دکمه‌ی سناریو**: بریفینگ صبحگاهی، تحلیل استراتژیک، حالت تمرکز عمیق —
  هر سه از داده‌ی *واقعی* داشبورد (بات‌ها/پروژه‌ها/فاکتورها) خلاصه می‌سازن،
  نه متن ثابت
- **ماتریس آیزنهاور** برای اولویت‌بندی کارها
- **چک‌این حال‌وهوا** برای نقش همدم/رفیق هوشمند

### ارتقا به یک LLM واقعی
موتور فعلی (`aiEngine.js`) قالب‌محوره — پاسخ‌های سناریو رو از روی داده‌ی زنده
می‌سازه، ولی چت آزاد فقط تطبیق کلیدواژه‌ست. برای وصل کردن یک مدل واقعی
(OpenAI، Claude و غیره):

1. یک endpoint سمت سرور بساز (هیچ‌وقت کلید API رو مستقیم تو مرورگر نذار)
2. تابع `generateChatReply` در `aiEngine.js` رو با یک `fetch` به همون
   endpoint جایگزین کن
3. خروجی `buildContext()` رو به‌عنوان system context به مدل بده — این تابع
   از قبل بات‌های خطادار، پروژه‌های فوری، و فاکتورهای معوقه رو استخراج می‌کنه

## ساختار پروژه

```
cyber-admin-ai/
├── .env.example                # قالب متغیرهای Supabase
├── index.html                  # dir="rtl" lang="fa"، فونت Vazirmatn
├── src/
│   ├── App.jsx                 # سایدبار + هدر + سوییچ صفحه بر اساس تب فعال
│   ├── lib/
│   │   ├── constants.js        # تب‌های ناوبری فارسی
│   │   ├── format.js           # تبدیل به ارقام فارسی، فرمت تومان
│   │   ├── invoiceMath.js
│   │   └── supabaseClient.js   # کلاینت Supabase + isSupabaseConfigured
│   ├── types/
│   │   └── database.d.ts       # اینترفیس‌های TS + SQL برای اسکیمای مشترک
│   ├── hooks/
│   │   ├── useSupabaseTable.js # الگوی پایه: fetch + realtime + fallback
│   │   ├── useBots.js
│   │   ├── useProjects.js
│   │   ├── useInvoices.js
│   │   └── useAiMemory.js
│   ├── store/
│   │   └── useDashboardStore.js  # تب فعال، حالت تمرکز عمیق، مودال‌ها
│   ├── data/                   # mock داده‌ی fallback (هم‌شکل با اسکیما)
│   └── components/
│       ├── layout/              # Sidebar.jsx, Header.jsx
│       ├── ui/                  # GlassPanel, StatusPill, NeonButton, SectionHeading
│       ├── modals/ModalShell.jsx
│       ├── ai-companion/
│       │   ├── AiCompanionPage.jsx
│       │   ├── ChatWidget.jsx / ChatMessage.jsx / AvatarOrb.jsx
│       │   ├── ScenarioButtons.jsx
│       │   ├── EisenhowerMatrix.jsx
│       │   ├── MoodCheckIn.jsx
│       │   └── aiEngine.js      # منطق پاسخ‌دهی — نقطه‌ی ارتقا به LLM واقعی
│       ├── overview/            # OverviewPage, MetricsGrid, RevenueChart, ActivityStream
│       ├── bots/                # BotEcosystemPage, BotStatusTable, WebhookPingTester, BroadcastDrawer, LogsDrawer
│       ├── kanban/               # KanbanBoard, KanbanProjectCard (مدیریت اطلاعات ورود ماسک‌شده)
│       ├── financial/           # FinancialPage, InvoiceGenerator, UnpaidInstallmentsTable
│       ├── devtools/            # DevToolsPage, SnippetVault
│       └── security/            # SecurityPage
```

## نکات امنیتی
- `api_token_masked` و `credentials_json` هیچ‌وقت نباید مقدار خام رو تو
  کلاینت نگه دارن — فقط نسخه‌ی ماسک‌شده. رمزگشایی واقعی باید سمت سرور، پشت
  احراز هویت انجام بشه.
- کلید anon کلاینت Supabase عمومیه؛ محدودیت دسترسی واقعی باید با Row Level
  Security (RLS) روی هر جدول تعریف بشه — این خارج از اسکوپ کد فرانت‌اند است
  ولی حتماً قبل از production فعالش کن.
