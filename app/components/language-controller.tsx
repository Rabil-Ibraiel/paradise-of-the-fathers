"use client";

import { useEffect, useState } from "react";

export type SiteLanguage = "en" | "ar";

const storageKey = "paradise-language";
const languageEvent = "paradise:language-change";

const arabicText: Record<string, string> = {
  "The Paradise of the Fathers": "فردوس الآباء",
  Saints: "القديسون",
  Manuscripts: "المخطوطات",
  Books: "الكتب",
  "Paradise of Fathers": "فردوس الآباء",
  "Begin with a saint": "ابدأ بسيرة قديس",
  "A new illustrated archive of the saints and spiritual heritage of the Church of the East.":
    "أرشيف مصوّر جديد لقديسي كنيسة المشرق وتراثها الروحي.",
  "A new illustrated archive of the saints and spiritual heritage of the":
    "أرشيف مصوّر جديد للقديسين والتراث الروحي في",
  "Church of the East.": "كنيسة المشرق.",
  "Created through": "أُنجز من خلال",
  "Sons of the Church of the East": "أبناء كنيسة المشرق",
  "Independent educational project · Made for remembrance · 2026":
    "مشروع تعليمي مستقل · صُنع لحفظ الذاكرة · ٢٠٢٦",
  "Skip to manuscripts": "انتقل إلى المخطوطات",
  "Written by hand": "مكتوب باليد",
  "Manuscripts.": "المخطوطات.",
  "This room begins with catalogued witnesses. It names shelfmarks, dates, and limits openly, so that beauty never comes at the cost of historical clarity.":
    "تبدأ هذه القاعة بالشواهد المفهرسة، وتعرض أرقام الحفظ والتواريخ بوضوح، ليبقى الجمال مقرونًا بالدقة التاريخية.",
  "HMML Reading Room · CC BY 4.0": "قاعة مطالعة HMML · CC BY 4.0",
  "Search real manuscript metadata by title, shelfmark, repository, country, author, or subject. Every result returns to its permanent holding-library record.":
    "ابحث في بيانات المخطوطات الموثقة بحسب العنوان أو رقم الحفظ أو المكتبة أو البلد أو المؤلف أو الموضوع. يقود كل سجل إلى صفحته التفصيلية.",
  "Manuscript categories": "تصنيفات المخطوطات",
  "All witnesses": "جميع الشواهد",
  "Syriac witnesses.": "شاهدًا سريانيًا.",
  record: "سجل",
  records: "سجلًا",
  "Liturgy & Prayer": "الطقوس والصلاة",
  Scripture: "الكتاب المقدس",
  "Saints & Martyrs": "القديسون والشهداء",
  "Homilies & Poetry": "الميامر والشعر",
  "Theology & Spirituality": "اللاهوت والروحانية",
  "History & Canon Law": "التاريخ والقانون الكنسي",
  "Language & Learning": "اللغة والتعليم",
  "Other Collections": "مجموعات أخرى",
  "Search the records": "ابحث في السجلات",
  "Try Narsai, Gospel, Alqosh, or a shelfmark":
    "جرّب نرساي أو الإنجيل أو ألقوش أو رقم حفظ",
  "Holding country": "بلد الحفظ",
  "All countries": "جميع البلدان",
  "Sort by": "الترتيب حسب",
  "Catalogue order": "ترتيب الفهرس",
  "Oldest first": "الأقدم أولًا",
  "Newest first": "الأحدث أولًا",
  "Title A–Z": "العنوان أبجديًا",
  "Repository A–Z": "المكتبة أبجديًا",
  "View the manuscript": "عرض المخطوطة",
  "No manuscripts match those filters.": "لا توجد مخطوطات تطابق هذه المرشحات.",
  "Clear the search": "مسح البحث",
  "Opening the Syriac manuscript index…": "جارٍ فتح فهرس المخطوطات السريانية…",
  "The catalogue file could not be opened.": "تعذّر فتح ملف الفهرس.",
  "The catalogue could not be opened.": "تعذّر فتح الفهرس.",
  "Search directly in HMML Data Portal": "البحث مباشرة في بوابة بيانات HMML",
  "Metadata: HMML Reading Room weekly dataset, updated":
    "البيانات الوصفية: مجموعة بيانات قاعة مطالعة HMML الأسبوعية، حُدّثت",
  "Dataset & schema": "مجموعة البيانات وبنيتها",
  "Syri.ac discovery gateway": "بوابة الاستكشاف Syri.ac",
  "Ways into a manuscript collection": "مداخل إلى مجموعة مخطوطات",
  "Explore by what a book carries.": "استكشف بحسب ما يحمله الكتاب.",
  "Open Syri.ac’s faceted search": "افتح البحث المصنّف في Syri.ac",
  "Three early witnesses": "ثلاثة شواهد مبكرة",
  "Catalogued manuscripts.": "مخطوطات مفهرسة.",
  "These records remain anchored in the catalogues of their holding libraries.":
    "تبقى هذه السجلات مرتبطة بفهارس المكتبات التي تحفظها.",
  "Open a witness": "افتح شاهدًا",
  "Manuscripts connected to these lives.": "مخطوطات مرتبطة بهذه السير.",
  "Syri.ac brings dispersed catalogue data into one searchable gateway. These four records are especially close to the saints and liturgical memory gathered in this archive.":
    "يجمع Syri.ac بيانات الفهارس المتفرقة في بوابة واحدة قابلة للبحث. وترتبط هذه السجلات الأربعة خصوصًا بالقديسين والذاكرة الطقسية في هذا الأرشيف.",
  "View record": "عرض السجل",
  "Continue your research": "تابع بحثك",
  "Three doors into Syri.ac.": "ثلاثة أبواب إلى Syri.ac.",
  "Syri.ac is an annotated bibliography of open-access resources hosted by the University of Oklahoma. We point into it rather than reproduce its database.":
    "Syri.ac ببليوغرافيا مشروحة لمصادر مفتوحة تستضيفها جامعة أوكلاهوما. نوجّه القارئ إليها مع الحفاظ على مرجعية قاعدة بياناتها.",
  "Search digitised manuscripts": "ابحث في المخطوطات الرقمية",
  "Find manuscript catalogues": "ابحث عن فهارس المخطوطات",
  "Learn the manuscript world": "تعرّف إلى عالم المخطوطات",
  "Words of the scribe": "كلمات الناسخ",
  "Five small words for entering the page.": "خمس كلمات صغيرة للدخول إلى الصفحة.",
  "Terminology source: Syri.ac": "مصدر المصطلحات: Syri.ac",
  "Back to manuscript search": "العودة إلى بحث المخطوطات",
  "Skip to manuscript details": "انتقل إلى تفاصيل المخطوطة",
  "Held by": "محفوظة لدى",
  "Open the permanent HMML record": "فتح سجل HMML الدائم",
  "The manuscript at a glance": "لمحة عن المخطوطة",
  Date: "التاريخ",
  "HMML project": "مشروع HMML",
  Object: "المادة",
  Repository: "المكتبة",
  "Holding institution": "جهة الحفظ",
  Place: "المكان",
  Collection: "المجموعة",
  "Project number": "رقم المشروع",
  "Object type": "نوع المادة",
  Status: "الحالة",
  "Digital surrogate": "النسخة الرقمية",
  Support: "المادة",
  Medium: "الوسيط",
  Foliation: "الترقيم الورقي",
  Dimensions: "الأبعاد",
  Features: "الخصائص",
  Description: "الوصف",
  "Catalogue summary": "ملخص الفهرس",
  "Object description": "وصف المخطوطة",
  "The book as catalogued.": "الكتاب كما ورد في الفهرس.",
  "Physical description": "الوصف المادي",
  "Material, extent, and form.": "المادة والحجم والشكل.",
  Condition: "الحالة",
  Collation: "الملازم",
  Binding: "التجليد",
  Provenance: "تاريخ الاقتناء",
  Bibliography: "المراجع",
  Colophon: "الخاتمة",
  Reproduction: "الاستنساخ",
  Genres: "الأنواع",
  Manuscript: "مخطوطة",
  "Writing system": "نظام الكتابة",
  Script: "الخط",
  Layout: "تنسيق الصفحة",
  "Texts in this part": "نصوص هذا الجزء",
  "Metadata care": "العناية بالبيانات الوصفية",
  "Dataset updated": "تحديث مجموعة البيانات",
  "Permanent record": "السجل الدائم",
  "HMML schema": "بنية HMML",
  "Manuscript metadata sources": "مصادر بيانات المخطوطة",
  Contents: "المحتويات",
  "Uniform title": "العنوان الموحّد",
  "Alternate titles": "عناوين بديلة",
  Contributors: "المساهمون",
  Pagination: "ترقيم الصفحات",
  Rubric: "العنوان الأحمر",
  Incipit: "الاستهلال",
  Explicit: "الخاتمة النصية",
  "Cataloguer’s notes": "ملاحظات المفهرس",
  "Catalogued contents": "المحتويات المفهرسة",
  "Record unavailable.": "السجل غير متاح.",
  "Return to manuscript search": "العودة إلى بحث المخطوطات",
  "Opening the catalogue leaf.": "جارٍ فتح صفحة الفهرس.",
  "Loading the complete reusable HMML description…":
    "جارٍ تحميل الوصف الكامل للمخطوطة…",
  "An old name, a new work": "اسم قديم، وعمل جديد",
  "A garden of remembered lives.": "حديقة من السير المحفوظة في الذاكرة.",
  "The Paradise of the Fathers is the famous English name of a classic Syriac collection of the lives and wisdom of early monastic fathers.":
    "«فردوس الآباء» هو الاسم الإنكليزي الشهير لمجموعة سريانية كلاسيكية تضم سير الآباء الرهبان الأوائل وحِكمتهم.",
  "This website is not a new edition, translation, or replacement for that ancient book. It respectfully borrows the beloved name for a new, simple, illustrated collection focused on principal saints in the Church of the East.":
    "هذا الموقع ليس طبعة جديدة لذلك الكتاب القديم ولا ترجمة له أو بديلًا عنه. بل يستعير اسمه المحبوب باحترام لمجموعة جديدة ومبسطة ومصوّرة عن أبرز قديسي كنيسة المشرق.",
  "Simple, not shallow.": "مبسّط، لا سطحي.",
  "Each life is concise enough to enter easily, while citations keep the path open for deeper study.":
    "تُقدَّم كل سيرة بإيجاز يسهّل الدخول إليها، مع مراجع تفتح الطريق لدراسة أعمق.",
  "Illustrated, not invented.": "مصوّر، لا متخيّل.",
  "Documented icons and manuscript images are identified. Where no responsible likeness is available, the design uses a symbolic Syriac monogram rather than a fictional portrait.":
    "تُعرَّف الأيقونات والصور الموثقة بوضوح، ويستعمل التصميم رمزًا سريانيًا حين تكون الرمزية أنسب من صورة شخصية.",
  "Devotional and careful.": "روحي ودقيق.",
  "Sacred memory is treated with reverence, while later tradition and recoverable history are distinguished clearly.":
    "تُعامل الذاكرة المقدسة بتوقير، مع تمييز واضح بين التقليد المتأخر والتاريخ القابل للتحقق.",
  "The historical book": "الكتاب التاريخي",
  "Follow the name to its source.": "اتبع الاسم إلى مصدره.",
  "Encyclopedic introduction": "مدخل موسوعي",
  "Syriaca.org work record": "سجل العمل في Syriaca.org",
  "Enter the new collection": "ادخل إلى المجموعة الجديدة",
  "Begin with one remembered life.": "ابدأ بسيرة واحدة باقية في الذاكرة.",
  "Browse the saints": "تصفّح القديسين",
  "Skip to the story": "انتقل إلى الحكاية",
  "Skip to content": "انتقل إلى المحتوى",
  "A new illustrated archive": "أرشيف مصوّر جديد",
  "Lives that carried": "سِيَر حملت",
  "the light": "النور",
  "eastward.": "نحو المشرق.",
  "Meet the principal saints, teachers, martyrs, and missionaries of the Church of the East through concise, carefully sourced lives.":
    "تعرّف إلى أبرز قديسي كنيسة المشرق ومعلّميها وشهدائها ومبشّريها من خلال سِيَر موجزة وموثقة بعناية.",
  "Explore their lives": "استكشف سِيَرهم",
  "Why “Paradise”?": "لماذا «الفردوس»؟",
  "An old and beloved name,": "اسم قديم ومحبوب،",
  "carried into a new work of remembrance.":
    "يُحمل إلى عمل جديد لحفظ الذاكرة.",
  "Apostles of the East": "رسل المشرق",
  "Mission · Memory · Liturgy": "رسالة · ذاكرة · طقس",
  "Explore the collection": "استكشف المجموعة",
  "Lives, places, and sources": "سِيَر وأماكن ومصادر",
  "Witnesses written by hand": "شواهد مكتوبة باليد",
  "Texts behind the archive": "النصوص وراء الأرشيف",
  "Featured lives": "سِيَر مختارة",
  "A constellation of lives.": "كوكبة من السِيَر.",
  "Begin with three voices: an apostolic missionary, a poet of sacred learning, and a master of mercy and stillness.":
    "ابدأ بثلاثة أصوات: مبشّر رسولي، وشاعر للمعرفة المقدسة، ومعلّم للرحمة والسكون.",
  "View all saint profiles": "عرض جميع سِيَر القديسين",
  "Featured manuscripts": "مخطوطات مختارة",
  "Faith preserved in ink, parchment, and memory.":
    "إيمان حُفظ بالحبر والرق والذاكرة.",
  "Three catalogued witnesses introduce the craft, prayer, and memory of the East Syriac scribal world.":
    "تقدّم ثلاثة شواهد مفهرسة حرفة عالم النساخة السريانية الشرقية وصلاته وذاكرته.",
  "Enter the manuscript room": "ادخل قاعة المخطوطات",
  "Church of the East Psalter": "مزامير كنيسة المشرق",
  "Eastern Syriac vocalization and line illustrations.":
    "ضبط سرياني شرقي ورسوم خطية.",
  "Gospel Lectionary": "كتاب قراءات الإنجيل",
  "Geometric illumination within an East Syriac book.":
    "زخرفة هندسية في كتاب سرياني شرقي.",
  "The name behind the project": "الاسم وراء المشروع",
  "An old name.": "اسم قديم.",
  "A new collection.": "مجموعة جديدة.",
  "The Paradise of the Fathers is the familiar English name of a classic Syriac collection. This website is a new, independent illustrated series about saints of the Church of the East.":
    "«فردوس الآباء» هو الاسم الإنكليزي المألوف لمجموعة سريانية كلاسيكية. وهذا الموقع سلسلة مصوّرة جديدة ومستقلة عن قديسي كنيسة المشرق.",
  "It respectfully borrows the name; it does not claim to be a new edition or translation of the ancient book.":
    "يستعير الموقع الاسم باحترام، من دون أن يدّعي أنه طبعة جديدة أو ترجمة للكتاب القديم.",
  "Read the full story": "اقرأ الحكاية كاملة",
  "One life at a time": "سيرة واحدة في كل مرة",
  "The past becomes a mirror.": "يصير الماضي مرآة.",
  "Begin with a single saint. Stay long enough to notice what their life asks of yours.":
    "ابدأ بقديس واحد، وامكث قليلًا لتلاحظ ما تطلبه سيرته من حياتك.",
  "Choose a life": "اختر سيرة",
  "Skip to the saints": "انتقل إلى القديسين",
  "The lives": "السِيَر",
  "Saints of the East.": "قديسو المشرق.",
  "Apostles, poets, monks, theologians, and martyrs—each profile distinguishes devotional memory from the history we can document. This sourced directory begins with fifteen lives and will continue to grow without pretending that one list can exhaust the Church’s calendar or memory.":
    "رسل وشعراء ورهبان ولاهوتيون وشهداء؛ تميّز كل سيرة بين الذاكرة التعبدية والتاريخ الذي يمكن توثيقه. يبدأ هذا الدليل الموثق بخمس عشرة سيرة وسيواصل النمو، فذاكرة الكنيسة وتقويمها أوسع من أن تحيط بهما قائمة واحدة.",
  "Filter saints by vocation": "رشّح القديسين بحسب الدعوة",
  "The whole communion": "الشركة كلها",
  "Every life currently gathered in the archive.":
    "كل سيرة جُمعت في الأرشيف حتى الآن.",
  "Apostles & missionaries": "الرسل والمبشّرون",
  "Lives remembered through movement, hospitality, and beginnings.":
    "سِيَر تُذكر بالرحلة والضيافة والبدايات.",
  "Teachers & poets": "المعلّمون والشعراء",
  "Scripture, theology, poetry, and the schooling of attention.":
    "الكتاب المقدس واللاهوت والشعر وتربية الانتباه.",
  "Monastic fathers": "الآباء الرهبان",
  "Stillness, community, reform, and places shaped by prayer.":
    "السكون والجماعة والإصلاح وأماكن شكّلتها الصلاة.",
  "Martyrs & witnesses": "الشهداء والشهود",
  "Lives remembered where faith, power, and courage meet.":
    "سِيَر تُذكر حيث يلتقي الإيمان بالقوة والشجاعة.",
  "Bishops & patriarchs": "الأساقفة والبطاركة",
  "Pastoral responsibility across cities, regions, and generations.":
    "مسؤولية رعوية تمتد عبر المدن والأقاليم والأجيال.",
  Missionaries: "المبشّرون",
  Teachers: "المعلّمون",
  Monastics: "الرهبان",
  Martyrs: "الشهداء",
  Bishops: "الأساقفة",
  "Read profile ↗": "اقرأ السيرة ↖",
  "Remembered in": "يُذكر في",
  Vocation: "الدعوة",
  Period: "الحقبة",
  "Life & memory": "السيرة والذاكرة",
  "The life remembered.": "السيرة كما حفظتها الذاكرة.",
  "For reflection": "للتأمل",
  "Threads in this life": "خيوط في هذه السيرة",
  "A fuller life": "سيرة أوسع",
  "The person, the memory, the legacy.":
    "الشخص والذاكرة والإرث.",
  "Study further": "للمزيد من الدراسة",
  "Sources & further reading.": "المصادر وقراءات إضافية.",
  "Saints.": "القديسون.",
  "All saints": "جميع القديسين",
  "Read the life": "اقرأ السيرة",
  "Back to all saints": "العودة إلى جميع القديسين",
  "Life and witness": "السيرة والشهادة",
  "Sources and further reading": "المصادر وقراءات إضافية",
  "Open source": "فتح المصدر",
  "Skip to books": "انتقل إلى الكتب",
  "Texts behind the lives": "النصوص وراء السِيَر",
  "Books.": "الكتب.",
  "A reading room rather than a shop: original works, historic editions, and open digital copies arranged by the questions they help us ask.":
    "قاعة قراءة لا متجر: أعمال أصلية وطبعات تاريخية ونسخ رقمية مفتوحة، مرتبة بحسب الأسئلة التي تساعدنا على طرحها.",
  "Book categories": "تصنيفات الكتب",
  "The whole shelf": "الرف كله",
  "Move between texts, lives, worship, and history.":
    "تنقّل بين النصوص والسِيَر والعبادة والتاريخ.",
  "Open-library pathways": "مسارات إلى المكتبات المفتوحة",
  "The shelf continues elsewhere.": "يمتد الرف إلى أماكن أخرى.",
  "Internet Archive supplies the complete digitized editions and cover previews used here. Open Library provides searchable bibliographic records and cover services for readers who want to compare editions.":
    "يوفّر أرشيف الإنترنت الطبعات الرقمية الكاملة ومعاينات الأغلفة المستعملة هنا، وتقدّم المكتبة المفتوحة سجلات ببليوغرافية قابلة للبحث لمن يريد مقارنة الطبعات.",
  "Syri.ac bibliography": "ببليوغرافيا Syri.ac",
  "How Syri.ac helps this archive": "كيف يساعد Syri.ac هذا الأرشيف",
  "From a remembered life to the texts that preserve it.":
    "من سيرة محفوظة في الذاكرة إلى النصوص التي تصونها.",
  "The saint profiles remain short and welcoming. Syri.ac supplies the next step: manuscript witnesses, historic editions, translations, bibliographies, and the scholarly paths between them.":
    "تبقى سِيَر القديسين موجزة ومرحّبة، ويقدّم Syri.ac الخطوة التالية: شواهد مخطوطة وطبعات تاريخية وترجمات وببليوغرافيات ومسارات البحث التي تصل بينها.",
  "About the Syri.ac project": "عن مشروع Syri.ac",
  "Read at Internet Archive": "اقرأ في أرشيف الإنترنت",
  "Digitized-book covers are displayed from Internet Archive. Bibliographic pathways are checked against Syri.ac and Syriaca.org.":
    "تُعرض أغلفة الكتب الرقمية من أرشيف الإنترنت، وتُراجع المسارات الببليوغرافية بالاستناد إلى Syri.ac وSyriaca.org.",
  "DOCUMENTED DEVOTIONAL IMAGE · CC0": "صورة تعبدية موثقة · CC0",
  "A NEW ILLUSTRATED ARCHIVE · I": "أرشيف مصوّر جديد · ١",
  "Opening The Paradise of the Fathers": "جارٍ فتح فردوس الآباء",
  "View the book": "عرض الكتاب",
  "Read online": "اقرأ على الإنترنت",
  "Discover the collection": "اكتشف المجموعة",
  "Loading": "جارٍ التحميل",
};

const originalText = new WeakMap<Text, string>();

function getStoredLanguage(): SiteLanguage {
  try {
    return window.localStorage.getItem(storageKey) === "ar" ? "ar" : "en";
  } catch {
    return "en";
  }
}

function translateValue(value: string) {
  const leading = value.match(/^\s*/)?.[0] ?? "";
  const trailing = value.match(/\s*$/)?.[0] ?? "";
  const clean = value.trim();

  let translated = arabicText[clean];

  if (!translated) {
    const witnesses = clean.match(/^([\d,]+) Syriac witnesses\.$/);
    const records = clean.match(/^([\d,]+) records?$/);
    const next = clean.match(/^Show the next ([\d,]+)$/);
    const position = clean.match(/^([\d,]+) of ([\d,]+)$/);
    const part = clean.match(/^Part ([\d,]+)$/);
    const items = clean.match(/^([\d,]+) items?$/);

    if (witnesses) translated = `${witnesses[1]} شاهدًا سريانيًا.`;
    if (records) translated = `${records[1]} سجل`;
    if (next) translated = `عرض ${next[1]} سجلًا آخر`;
    if (position) translated = `${position[1]} من ${position[2]}`;
    if (part) translated = `الجزء ${part[1]}`;
    if (items) translated = `${items[1]} مادة`;
  }

  return translated ? `${leading}${translated}${trailing}` : value;
}

function shouldTranslate(node: Text) {
  const parent = node.parentElement;
  if (!parent || !node.data.trim()) return false;
  return !parent.closest(
    "[data-no-translate], script, style, code, pre, textarea, [lang='syr']",
  );
}

function applyLanguage(root: Node, language: SiteLanguage) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let current = walker.nextNode();

  while (current) {
    const text = current as Text;
    if (shouldTranslate(text)) {
      if (!originalText.has(text)) originalText.set(text, text.data);
      const original = originalText.get(text) ?? text.data;
      text.data = language === "ar" ? translateValue(original) : original;
    }
    current = walker.nextNode();
  }
}

export function setSiteLanguage(language: SiteLanguage) {
  document.documentElement.lang = language;
  document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  document.documentElement.dataset.language = language;
  try {
    window.localStorage.setItem(storageKey, language);
  } catch {
    // The language still changes for this visit when storage is unavailable.
  }
  window.dispatchEvent(
    new CustomEvent<SiteLanguage>(languageEvent, { detail: language }),
  );
}

export function LanguageController() {
  useEffect(() => {
    const body = document.body;
    let language = getStoredLanguage();

    const translateDocument = () => {
      observer.disconnect();
      applyLanguage(body, language);
      document.documentElement.dataset.languageReady = "true";
      observer.observe(body, {
        childList: true,
        characterData: true,
        subtree: true,
      });
    };

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (
          mutation.type === "characterData" &&
          mutation.target instanceof Text
        ) {
          originalText.set(mutation.target, mutation.target.data);
        }
      }
      translateDocument();
    });

    const handleLanguage = (event: Event) => {
      language = (event as CustomEvent<SiteLanguage>).detail;
      translateDocument();
    };

    setSiteLanguage(language);
    window.addEventListener(languageEvent, handleLanguage);
    translateDocument();

    return () => {
      observer.disconnect();
      window.removeEventListener(languageEvent, handleLanguage);
    };
  }, []);

  return null;
}

export function LanguageToggle() {
  const [language, setLanguage] = useState<SiteLanguage>("en");

  useEffect(() => {
    const sync = (event?: Event) => {
      setLanguage(
        event
          ? (event as CustomEvent<SiteLanguage>).detail
          : getStoredLanguage(),
      );
    };

    sync();
    window.addEventListener(languageEvent, sync);
    return () => window.removeEventListener(languageEvent, sync);
  }, []);

  return (
    <div
      className="language-toggle"
      role="group"
      aria-label="Language"
      data-no-translate
    >
      <button
        type="button"
        aria-pressed={language === "en"}
        onClick={() => setSiteLanguage("en")}
      >
        EN
      </button>
      <button
        type="button"
        lang="ar"
        aria-pressed={language === "ar"}
        onClick={() => setSiteLanguage("ar")}
      >
        العربية
      </button>
    </div>
  );
}
