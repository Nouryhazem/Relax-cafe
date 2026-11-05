# Relax Café · Level Seven | ريلاكس كافيه — سمالوط

<p align="center">
  <strong>«فوق الزحمة. في قلب سمالوط، وعلى الدور السابع، Relax مكان تاخد فيه وقتك بعيد عن دوشة اليوم.»</strong>
</p>

<p align="center">
  الموقع الرسمي لتجربة <strong>ريلاكس كافيه (Relax Café)</strong> في سمالوط، المنيا — الدور السابع.
</p>

---

## ✨ المميزات الرئيسية (Key Features)

1. **تجربة الصعود بالدور السابع (Level Seven Experience)**:
   - محاكاة أسانسير تفاعلية مع أصوات واقعية وأجواء معمارية راقية.
   - قسم «فوق الزحمة» التفاعلي بالصور الحقيقية للكافيه بصيغة WebP فائقة الخفة (~20KB للصور المصغرة و~200KB للصور الكاملة).

2. **قائمة المشروبات الرقمية (Interactive Menu)**:
   - 8 أقسام كاملة بأسعار حقيقية معتمدة بالجنيه المصري (EGP).
   - قسم «الأكثر طلباً» يعرض المشروبات الأكثر شهرة وإقبالاً.
   - إمكانية إضافة قطعة كيك طازجة (+5 ج.م) مع أي طلب قهوة.
   - صور واقعية حقيقية لكل صنف مع أحجام مُحسنة وسرعة تحميل فائقة.

3. **اختارلي على مزاجي (Find Your Pause)**:
   - محرك اقتراحات مبني على 5 أسئلة سريعة عن المزاج والميزانية لاقتراح 3 مشروبات حقيقية من المنيو.

4. **حاسبة الحساب «من غير لخبطة» (Split at Seven)**:
   - حاسبة دقيقة لقعدات الأصحاب لحساب حصة كل فرد بالجولات والطلبات المشتركة بدقة القروش وبدون أي لبس أو إحراج.
   - جاهزة ونظيفة تماماً للتسليم بدون بيانات وهمية.

---

## 🛠️ التقنيات المستخدمة (Tech Stack)

- **Framework**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Bundler & Dev Server**: [Vite 8](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Motion](https://motion.dev/) (Framer Motion)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Audio Synthesis**: Web Audio API Sound Manager (Pure procedural audio, zero external weight)
- **Deployment**: Ready for [GitHub Pages](https://pages.github.com/), [Vercel](https://vercel.com/), or [Netlify](https://www.netlify.com/)

---

## 🚀 تشغيل المشروع محلياً (Local Development)

```bash
# 1. استنساخ المستودع (Clone the repository)
git clone https://github.com/<YOUR_USERNAME>/<YOUR_REPO_NAME>.git
cd <YOUR_REPO_NAME>

# 2. تثبيت الحزم (Install dependencies)
npm install

# 3. تشغيل خادم التطوير (Start development server)
npm run dev
```

افتح المتصفح على: `http://localhost:3000`

---

## 📦 بناء الإنتاج (Production Build)

```bash
# فحص الأنواع وبناء حزمة الإنتاج
npm run build

# معاينة حزمة الإنتاج محلياً
npm run preview
```

ينتج عن البناء مجلد `dist/` جاهز للنشر على أي منصة استضافة ثابتة.

---

## 🌐 خطوات النشر على GitHub (Deploy to GitHub)

1. أنشئ مستودعاً جديداً على حسابك في GitHub (مثلاً: `relax-cafe`).
2. افتح سطر الأوامر في مجلد المشروع وقم بربط المستودع:
   ```bash
   git init
   git add .
   git commit -m "feat: Relax Café Level Seven production release"
   git branch -M main
   git remote add origin https://github.com/<YOUR_USERNAME>/relax-cafe.git
   git push -u origin main
   ```
3. **تفعيل GitHub Pages**:
   - اذهب إلى **Settings** في مستودع GitHub.
   - اختر **Pages** من القائمة الجانبية.
   - تحت **Build and deployment**، اختر **Source**: `GitHub Actions`.
   - سيقوم ملف سير العمل `.github/workflows/deploy.yml` ببناء الموقع ونشره تلقائياً فوراً!

---

## 📍 معلومات التواصل والمكان (Location & Contact)

- **العنوان**: سمالوط، محافظة المنيا — الدور السابع (أسانسير).
- **المواعيد**: يومياً من 10:00 صباحاً حتى 1:00 منتصف الليل.
- **الهاتف**: `+20 11 11727490`
- **الموقع على خرائط جوجل**: [Relax Café on Google Maps](https://maps.google.com)
- **مبادئ الخدمة**: متاح حجوزات لأعياد الميلاد والمؤتمرات والمناسبات الخاصة.

---

<p align="center">
  <strong>RELAX CAFÉ · LEVEL SEVEN · SAMALOUT</strong>
</p>
