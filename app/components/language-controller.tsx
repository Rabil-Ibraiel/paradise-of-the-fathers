"use client";

import { useEffect, useState } from "react";
import {
  arabicDisplayText,
  arabicEditorialText,
} from "../data/arabic-translations";

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
  "HMML Reading Room · CC BY 4.0": "HMML Reading Room · CC BY 4.0",
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
  "Search directly in HMML Data Portal": "البحث مباشرة في HMML Data Portal",
  "Metadata: HMML Reading Room weekly dataset, updated":
    "البيانات الوصفية: مجموعة بيانات HMML Reading Room الأسبوعية، حُدّثت",
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
  "Open manuscript record": "عرض سجل المخطوطة",
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
    "يوفّر Internet Archive الطبعات الرقمية الكاملة ومعاينات الأغلفة المستعملة هنا، وتقدّم Open Library سجلات ببليوغرافية قابلة للبحث لمن يريد مقارنة الطبعات.",
  "Syri.ac bibliography": "ببليوغرافيا Syri.ac",
  "How Syri.ac helps this archive": "كيف يساعد Syri.ac هذا الأرشيف",
  "From a remembered life to the texts that preserve it.":
    "من سيرة محفوظة في الذاكرة إلى النصوص التي تصونها.",
  "The saint profiles remain short and welcoming. Syri.ac supplies the next step: manuscript witnesses, historic editions, translations, bibliographies, and the scholarly paths between them.":
    "تبقى سِيَر القديسين موجزة ومرحّبة، ويقدّم Syri.ac الخطوة التالية: شواهد مخطوطة وطبعات تاريخية وترجمات وببليوغرافيات ومسارات البحث التي تصل بينها.",
  "About the Syri.ac project": "عن مشروع Syri.ac",
  "Read at Internet Archive": "اقرأ في Internet Archive",
  "Digitized-book covers are displayed from Internet Archive. Bibliographic pathways are checked against Syri.ac and Syriaca.org.":
    "تُعرض أغلفة الكتب الرقمية من Internet Archive، وتُراجع المسارات الببليوغرافية بالاستناد إلى Syri.ac وSyriaca.org.",
  "DOCUMENTED DEVOTIONAL IMAGE · CC0": "صورة تعبدية موثقة · CC0",
  "A NEW ILLUSTRATED ARCHIVE · I": "أرشيف مصوّر جديد · ١",
  "Opening The Paradise of the Fathers": "جارٍ فتح فردوس الآباء",
  "View the book": "عرض الكتاب",
  "Read online": "اقرأ على الإنترنت",
  "Discover the collection": "اكتشف المجموعة",
  "Loading": "جارٍ التحميل",
  ...arabicEditorialText,
};

const originalText = new WeakMap<Text, string>();
const originalAttributes = new WeakMap<Element, Map<string, string>>();
const translatedAttributes = ["aria-label", "title", "placeholder", "alt"] as const;
const displayTextSelector =
  ".brand__name, h1, h2, .book-object__edition, .catalog-cover > strong";

const commonCatalogueWords: Record<string, string> = {
  a: "",
  an: "",
  the: "الـ",
  of: "من",
  and: "و",
  or: "أو",
  in: "في",
  on: "على",
  from: "من",
  for: "لـ",
  with: "مع",
  by: "بقلم",
  manuscript: "مخطوطة",
  manuscripts: "مخطوطات",
  fragment: "قصاصة",
  fragments: "قصاصات",
  book: "كتاب",
  books: "كتب",
  text: "نص",
  texts: "نصوص",
  work: "عمل",
  works: "أعمال",
  collection: "مجموعة",
  collections: "مجموعات",
  liturgical: "طقسي",
  liturgy: "الطقس",
  prayer: "صلاة",
  prayers: "صلوات",
  gospel: "الإنجيل",
  gospels: "الأناجيل",
  biblical: "كتابي",
  bible: "الكتاب المقدس",
  psalter: "سفر المزامير",
  psalms: "المزامير",
  lectionary: "كتاب قراءات",
  lectionaries: "كتب قراءات",
  homily: "ميمر",
  homilies: "ميامر",
  sermon: "عظة",
  sermons: "عظات",
  hymn: "ترتيلة",
  hymns: "تراتيل",
  saint: "قديس",
  saints: "قديسين",
  martyr: "شهيد",
  martyrs: "شهداء",
  life: "سيرة",
  lives: "سِيَر",
  history: "تاريخ",
  chronicle: "حولية",
  theology: "لاهوت",
  theological: "لاهوتي",
  commentary: "تفسير",
  commentaries: "تفاسير",
  canon: "قانون",
  canons: "قوانين",
  rite: "طقس",
  rites: "طقوس",
  funeral: "جناز",
  anaphora: "قداس",
  anaphoras: "أنافير",
  syriac: "سرياني",
  eastern: "شرقي",
  east: "المشرق",
  arabic: "عربي",
  garshuni: "كرشوني",
  parchment: "رَقّ",
  paper: "ورق",
  unknown: "غير معروف",
  anonymous: "مجهول",
  author: "مؤلف",
  authors: "مؤلفون",
  scribe: "ناسخ",
  century: "القرن",
  date: "تاريخ",
  dated: "مؤرخة",
  undated: "غير مؤرخة",
  church: "كنيسة",
  monastery: "دير",
  cathedral: "كاتدرائية",
  library: "مكتبة",
  university: "جامعة",
  archive: "أرشيف",
  institute: "معهد",
  college: "كلية",
  school: "مدرسة",
  bishop: "أسقف",
  patriarch: "بطريرك",
  priest: "كاهن",
  monk: "راهب",
  complete: "كامل",
  incomplete: "غير كامل",
  damaged: "متضرر",
  folio: "ورقة",
  folios: "أوراق",
  fol: "ورقة",
  leaf: "ورقة",
  leaves: "أوراق",
  item: "مادة",
  items: "مواد",
  cm: "سم",
  volume: "مجلد",
  volumes: "مجلدات",
  part: "جزء",
  parts: "أجزاء",
  notes: "ملاحظات",
  miscellaneous: "متفرقات",
};

const manuscriptConditionPhrases: Array<[RegExp, string]> = [
  [/\ba considerable part of the text is lost\b/gi, "فقد جزء كبير من النص"],
  [/\balmost (?:the )?entire original manuscript is lost\b/gi, "فقدت المخطوطة الأصلية في معظمها"],
  [/\ba few folios are missing or out of order\b/gi, "بضع أوراق مفقودة أو في غير ترتيبها"],
  [/\bappears to be two imperfect manuscripts joined together\b/gi, "يبدو أنها مخطوطتان ناقصتان مضمتان معا"],
  [/\biron gall ink corrosion\b/gi, "تآكل حبر العفص الحديدي"],
  [/\btext obscured by repairs\b/gi, "نص تحجبه الترميمات"],
  [/\baccording to a note on\b/gi, "بحسب حاشية في"],
  [/\bthe manuscript was damaged\b/gi, "تعرضت المخطوطة للتلف"],
  [/\blater repaired\b/gi, "رممت لاحقا"],
  [/\bfirst and last (?:leaves|folios) are missing\b/gi, "الأوراق الأولى والأخيرة مفقودة"],
  [/\bfirst folio is loose\b/gi, "الورقة الأولى منفصلة"],
  [/\bmany torn leaves\b/gi, "أوراق كثيرة ممزقة"],
  [/\bmany leaves torn\b/gi, "أوراق كثيرة ممزقة"],
  [/\bmany leaves (?:are )?wanting\b/gi, "أوراق كثيرة مفقودة"],
  [/\bmany wanting leaves\b/gi, "أوراق كثيرة مفقودة"],
  [/\bseveral (?:leaves|folios)\b/gi, "أوراق عدة"],
  [/\ba few (?:leaves|folios)\b/gi, "بضع أوراق"],
  [/\bmany pages\b/gi, "صفحات كثيرة"],
  [/\btorn pages\b/gi, "صفحات ممزقة"],
  [/\bminimal worming\b/gi, "إصابة حشرية طفيفة"],
  [/\bsevere worming\b/gi, "إصابة حشرية شديدة"],
  [/\bminimal water damage\b/gi, "تلف مائي طفيف"],
  [/\bsevere water damage\b/gi, "تلف مائي شديد"],
  [/\bextensive water damage\b/gi, "تلف مائي واسع"],
  [/\bminimal leaf deterioration\b/gi, "تدهور طفيف في الأوراق"],
  [/\bsevere leaf deterioration\b/gi, "تدهور شديد في الأوراق"],
  [/\bextensive leaf deterioration\b/gi, "تدهور واسع في الأوراق"],
  [/\bwith extensive loss of text\b/gi, "مع فقدان واسع للنص"],
  [/\bwith severe loss of text\b/gi, "مع فقدان شديد للنص"],
  [/\bwith significant loss of text\b/gi, "مع فقدان ملحوظ للنص"],
  [/\bwith some loss of text\b/gi, "مع فقدان جزئي للنص"],
  [/\bwith minimal loss of text\b/gi, "مع فقدان طفيف للنص"],
  [/\bwith insignificant loss of text\b/gi, "مع فقدان طفيف للنص"],
  [/\bwith slight loss of text\b/gi, "مع فقدان طفيف للنص"],
  [/\bwithout loss of text\b/gi, "من دون فقدان للنص"],
  [/\bwanting leaves at (?:the )?beginning and end\b/gi, "تنقصها أوراق من أولها وآخرها"],
  [/\bmissing (?:leaves|folios) at (?:the )?beginning and end\b/gi, "تفقد أوراقا من أولها وآخرها"],
  [/\bwanting leaves at (?:the )?beginning\b/gi, "تنقصها أوراق من أولها"],
  [/\bwanting leaves at (?:the )?end\b/gi, "تنقصها أوراق من آخرها"],
  [/\bwanting leaves throughout\b/gi, "تنقصها أوراق في مواضع متفرقة"],
  [/\bleaves (?:are )?wanting at (?:the )?beginning and end\b/gi, "أوراق مفقودة من البداية والنهاية"],
  [/\bleaves (?:are )?wanting at (?:the )?beginning\b/gi, "أوراق مفقودة من البداية"],
  [/\bleaves (?:are )?wanting at (?:the )?end\b/gi, "أوراق مفقودة من النهاية"],
  [/\bmissing (?:leaves|folios) at (?:the )?beginning\b/gi, "أوراق مفقودة من البداية"],
  [/\bmissing (?:leaves|folios) at (?:the )?end\b/gi, "أوراق مفقودة من النهاية"],
  [/\bmissing (?:leaves|folios) throughout\b/gi, "أوراق مفقودة في مواضع متفرقة"],
  [/\bleaf deterioration and tearing\b/gi, "تدهور الأوراق وتمزقها"],
  [/\bleaf deterioration\b/gi, "تدهور الأوراق"],
  [/\bwater damage\b/gi, "تلف مائي"],
  [/\bwater stains\b/gi, "بقع مائية"],
  [/\bhumidity stains\b/gi, "بقع رطوبة"],
  [/\bliquid stains\b/gi, "بقع سوائل"],
  [/\bmold damage\b/gi, "أضرار العفن"],
  [/\bfire damage\b/gi, "أضرار حريق"],
  [/\bink corrosion\b/gi, "تآكل الحبر"],
  [/\bink bleeding\b/gi, "نزف الحبر"],
  [/\bink fading\b/gi, "بهتان الحبر"],
  [/\bbinding issues\b/gi, "مشكلات في التجليد"],
  [/\bloose leaves\b/gi, "أوراق منفصلة"],
  [/\btorn leaves\b/gi, "أوراق ممزقة"],
  [/\bdamaged leaves\b/gi, "أوراق متضررة"],
  [/\bmissing leaves\b/gi, "أوراق مفقودة"],
  [/\bmissing folios\b/gi, "أوراق مفقودة"],
  [/\bmissing pages\b/gi, "صفحات مفقودة"],
  [/\bappears? to have been replaced\b/gi, "يبدو أنها استبدلت"],
  [/\bappears? to have been added\b/gi, "يبدو أنها أضيفت"],
  [/\b(?:leaves|folios) have been replaced\b/gi, "استبدلت الأوراق"],
  [/\bpages have been replaced\b/gi, "استبدلت الصفحات"],
  [/\bhave been replaced\b/gi, "استبدلت"],
  [/\bhave been added\b/gi, "أضيفت"],
  [/\bhas been replaced\b/gi, "استبدلت"],
  [/\bhas been added\b/gi, "أضيفت"],
  [/\bconsists? of only one (?:folio|leaf)\b/gi, "لا تتألف إلا من ورقة واحدة"],
  [/\bconsists? only of\b/gi, "لا تتألف إلا من"],
  [/\bconsists? of\b/gi, "تتألف من"],
  [/\bcomprised of\b/gi, "تتألف من"],
  [/\bcollection of fragments\b/gi, "مجموعة جذاذات"],
  [/\bfrom multiple manuscripts\b/gi, "من مخطوطات متعددة"],
  [/\bfrom different manuscripts\b/gi, "من مخطوطات مختلفة"],
  [/\bloss of text\b/gi, "فقدان في النص"],
  [/\brepair note\b/gi, "حاشية ترميم"],
  [/\bacquisition note\b/gi, "حاشية تملك"],
  [/\bownership note\b/gi, "حاشية تملك"],
  [/\bdonation note\b/gi, "حاشية وقف"],
  [/\bwaqf note\b/gi, "حاشية وقف"],
  [/\bcatalogu?ed by\b/gi, "فهرسها"],
  [/\bcopied by\b/gi, "نسخها"],
  [/\bbound by\b/gi, "جلدها"],
  [/\bdonated to\b/gi, "مهداة إلى"],
  [/\bmodern repairs and restorations\b/gi, "ترميمات وإصلاحات حديثة"],
  [/\bfront flyleaves?\b/gi, "أوراق الحراسة الأمامية"],
  [/\brear flyleaves?\b/gi, "أوراق الحراسة الخلفية"],
  [/\bfinal flyleaves?\b/gi, "أوراق الحراسة الأخيرة"],
  [/\bout of order\b/gi, "في غير ترتيبها"],
  [/\bwrong order\b/gi, "في ترتيب خاطئ"],
  [/\bat a later date\b/gi, "في تاريخ لاحق"],
  [/\bby a later hand\b/gi, "بخط ناسخ لاحق"],
  [/\bin a later hand\b/gi, "بخط ناسخ لاحق"],
  [/\bdifferent hand\b/gi, "خط مختلف"],
  [/\bdifferent manuscript(?:s)?\b/gi, "مخطوطة مختلفة"],
  [/\bmanuscript parts\b/gi, "أجزاء المخطوطة"],
  [/\bpartly legible\b/gi, "مقروءة جزئيا"],
  [/\bhardly legible\b/gi, "عسيرة القراءة"],
  [/\bdifficult to read\b/gi, "عسير القراءة"],
  [/\balmost completely lost\b/gi, "مفقودة في معظمها"],
  [/\bcompletely lost\b/gi, "مفقودة بالكامل"],
  [/\bonly a single folio remains\b/gi, "لم يبق إلا ورقة واحدة"],
  [/\bonly a single leaf remains\b/gi, "لم يبق إلا ورقة واحدة"],
  [/\bimperfect\s*:\s*/gi, "ناقصة؛ "],
  [/\bimperfect\b/gi, "ناقصة"],
  [/\bfragmentary\b/gi, "مجزأة"],
  [/\bfragment\b/gi, "جذاذة مخطوطة"],
];

const manuscriptConditionWords: Record<string, string> = {
  a: "",
  additional: "إضافية",
  added: "مضافة",
  after: "بعد",
  almost: "تقريبا",
  also: "أيضا",
  an: "",
  and: "و",
  appear: "تبدو",
  appears: "تبدو",
  are: "",
  as: "بوصفها",
  at: "في",
  beginning: "البداية",
  been: "",
  binding: "التجليد",
  blank: "بيضاء",
  bound: "مجلدة",
  burned: "محترقة",
  but: "لكن",
  by: "على يد",
  colophon: "حرد المتن",
  completely: "بالكامل",
  condition: "الحالة",
  containing: "تحتوي على",
  cover: "الغلاف",
  damaged: "متضررة",
  damage: "تلف",
  date: "تاريخ",
  dated: "مؤرخة",
  deterioration: "تدهور",
  detached: "منفصلة",
  disordered: "مختلة الترتيب",
  due: "بسبب",
  elsewhere: "في مواضع أخرى",
  end: "النهاية",
  extensive: "واسع",
  faded: "باهتة",
  fading: "بهتان",
  final: "الأخيرة",
  first: "الأولى",
  flyleaf: "ورقة حراسة",
  flyleaves: "أوراق حراسة",
  for: "لـ",
  folio: "ورقة",
  folios: "أوراق",
  fragment: "جذاذة",
  fragments: "جذاذات",
  few: "بضع",
  four: "أربع",
  front: "الأمامية",
  from: "من",
  hand: "خط",
  hands: "خطوط",
  half: "نصف",
  has: "",
  have: "",
  holes: "ثقوب",
  humidity: "رطوبة",
  illegible: "غير مقروءة",
  images: "الصور",
  incomplete: "ناقصة",
  in: "في",
  ink: "الحبر",
  inserted: "مدرجة",
  is: "",
  it: "هي",
  item: "مادة",
  items: "مواد",
  joined: "مضمومة",
  last: "الأخيرة",
  later: "لاحقا",
  leaf: "ورقة",
  leaves: "أوراق",
  legible: "مقروءة",
  likely: "على الأرجح",
  loose: "منفصلة",
  loss: "فقدان",
  lost: "مفقودة",
  many: "كثيرة",
  manuscript: "المخطوطة",
  manuscripts: "مخطوطات",
  may: "قد",
  middle: "الوسط",
  minimal: "طفيف",
  missing: "مفقودة",
  misplaced: "في غير موضعها",
  misbound: "مجلدة بترتيب خاطئ",
  modern: "حديثة",
  mold: "عفن",
  most: "معظم",
  multiple: "متعددة",
  nearly: "تقريبا",
  note: "حاشية",
  notes: "حواش",
  not: "لا",
  of: "من",
  on: "في",
  one: "واحدة",
  only: "فقط",
  or: "أو",
  original: "الأصلية",
  originally: "أصلا",
  other: "أخرى",
  obliterated: "مطموسة",
  page: "صفحة",
  pages: "صفحات",
  paper: "ورق",
  part: "جزء",
  parts: "أجزاء",
  parchment: "رق",
  partial: "جزئي",
  partially: "جزئيا",
  perhaps: "ربما",
  quire: "ملزمة",
  quires: "ملازم",
  read: "القراءة",
  rear: "الخلفية",
  rebound: "أعيد تجليدها",
  repaired: "مرممة",
  repairs: "ترميمات",
  replace: "استبدال",
  replaced: "مستبدلة",
  rest: "الباقي",
  restored: "مرممة",
  restoration: "ترميم",
  restorations: "ترميمات",
  ripped: "ممزقة",
  same: "نفسها",
  rubbing: "احتكاك",
  severe: "شديد",
  severely: "بشدة",
  several: "عدة",
  significant: "ملحوظ",
  single: "واحدة",
  slight: "طفيف",
  stains: "بقع",
  some: "بعض",
  supplied: "مستكملة",
  surviving: "الباقية",
  syriac: "السريانية",
  that: "أن",
  the: "",
  this: "هذه",
  teared: "ممزقة",
  tearing: "تمزق",
  tears: "تمزقات",
  text: "النص",
  texts: "النصوص",
  three: "ثلاث",
  time: "الوقت",
  together: "معا",
  throughout: "في مواضع متفرقة",
  torn: "ممزقة",
  trimming: "تشذيب",
  two: "اثنتان",
  unbound: "غير مجلدة",
  various: "متنوعة",
  volume: "المجلد",
  was: "كانت",
  water: "الماء",
  were: "كانت",
  with: "مع",
  without: "من دون",
  wanting: "مفقودة",
  worn: "بالية",
  worm: "حشري",
  worming: "إصابة حشرية",
  wrong: "خاطئ",
  writing: "كتابة",
  written: "مكتوبة",
};

function translateManuscriptCondition(value: string) {
  let translated = value
    .replace(/\bimperect\b/gi, "Imperfect")
    .replace(/\bimpefect\b/gi, "Imperfect")
    .replace(/\bdeterioraiont\b/gi, "deterioration")
    .replace(/\bbegining\b/gi, "beginning")
    .replace(/\breparied\b/gi, "repaired")
    .replace(/\bthrougout\b/gi, "throughout")
    .replace(/\bteared\b/gi, "torn");

  manuscriptConditionPhrases.forEach(([phrase, arabic]) => {
    translated = translated.replace(phrase, arabic);
  });

  translated = translated
    .replace(/\bfol\.\s*/gi, "ورقة ")
    .replace(/\bpp?\.\s*/gi, "صفحة ")
    .replace(/\b[A-Za-z]+\b/g, (word) => {
      return manuscriptConditionWords[word.toLocaleLowerCase()] ?? word;
    })
    .replace(/\s*;\s*/g, "؛ ")
    .replace(/\s*,\s*/g, "، ")
    .replace(/\s{2,}/g, " ")
    .replace(/\s+([.:،؛])/g, "$1")
    .trim();

  return translated;
}

const latinTransliteration: Record<string, string> = {
  a: "ا",
  b: "ب",
  c: "ك",
  d: "د",
  e: "ِ",
  f: "ف",
  g: "گ",
  h: "ه",
  i: "ي",
  j: "ج",
  k: "ك",
  l: "ل",
  m: "م",
  n: "ن",
  o: "و",
  p: "پ",
  q: "ق",
  r: "ر",
  s: "س",
  t: "ت",
  u: "و",
  v: "ڤ",
  w: "و",
  x: "كس",
  y: "ي",
  z: "ز",
  ā: "ا",
  ē: "ي",
  ī: "ي",
  ō: "و",
  ū: "و",
  ḥ: "ح",
  ṣ: "ص",
  ṭ: "ط",
  ḍ: "ض",
  š: "ش",
  ž: "ژ",
  ʿ: "ع",
  ʾ: "ء",
};

const transliterationPairs: Array<[string, string]> = [
  ["tch", "تش"],
  ["sch", "ش"],
  ["sh", "ش"],
  ["ch", "تش"],
  ["kh", "خ"],
  ["gh", "غ"],
  ["th", "ث"],
  ["dh", "ذ"],
  ["ph", "ف"],
  ["qu", "كو"],
  ["ck", "ك"],
  ["ee", "ي"],
  ["oo", "و"],
  ["ou", "و"],
];

const arabicTashkeel =
  /[\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06ED]/g;
const arabicIndicDigits = "٠١٢٣٤٥٦٧٨٩";
const easternArabicDigits = "۰۱۲۳۴۵۶۷۸۹";
const leftToRightIsolate = "\u2066";
const popDirectionalIsolate = "\u2069";

const websiteNameAliases: Array<[string, string]> = [
  ["إتش إم إم إل", "HMML"],
  ["سري.أك", "Syri.ac"],
  ["سرياكا.أورغ", "Syriaca.org"],
  ["موقع سرياكا", "Syriaca.org"],
  ["أرشيف الإنترنت", "Internet Archive"],
  ["المكتبة المفتوحة", "Open Library"],
];

const protectedWebsiteNames = [
  "Gorgias Encyclopedic Dictionary of the Syriac Heritage",
  "HMML Reading Room",
  "HMML Data Portal",
  "Internet Archive",
  "Wikimedia Commons",
  "Open Library",
  "Syriaca.org",
  "Beth Mardutho",
  "Syri.ac",
  "GEDSH",
  "HMML",
  "CC BY 4.0",
] as const;

const protectedWebsiteNamePattern = new RegExp(
  protectedWebsiteNames
    .map((name) => name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .join("|"),
  "g",
);

function preserveWebsiteNames(value: string) {
  let result = value.replace(/[\u2066\u2069]/g, "");

  websiteNameAliases.forEach(([translatedName, officialName]) => {
    result = result.replaceAll(translatedName, officialName);
  });

  return result.replace(
    protectedWebsiteNamePattern,
    (name) => `${leftToRightIsolate}${name}${popDirectionalIsolate}`,
  );
}

function normalizeArabicPresentation(value: string) {
  return preserveWebsiteNames(
    value
      .replace(arabicTashkeel, "")
      .replace(/[٠-٩]/g, (digit) => String(arabicIndicDigits.indexOf(digit)))
      .replace(/[۰-۹]/g, (digit) => String(easternArabicDigits.indexOf(digit)))
      .replace(/\u066B/g, ".")
      .replace(/\u066C/g, ",")
      .replace(/\u066A/g, "%"),
  );
}

function toArabicDigits(value: string) {
  return normalizeArabicPresentation(value);
}

function transliterateLatinWord(value: string) {
  let remaining = value.toLocaleLowerCase();
  let result = "";

  while (remaining) {
    const pair = transliterationPairs.find(([latin]) =>
      remaining.startsWith(latin),
    );
    if (pair) {
      result += pair[1];
      remaining = remaining.slice(pair[0].length);
      continue;
    }

    const [character] = Array.from(remaining);
    result += latinTransliteration[character] ?? character;
    remaining = remaining.slice(character.length);
  }

  return result;
}

function translateUnknownCatalogueText(value: string) {
  const latinWords = value.match(/\p{Script=Latin}+/gu) ?? [];
  const containsUnverifiedName = latinWords.some(
    (word) => commonCatalogueWords[word.toLocaleLowerCase()] === undefined,
  );

  if (containsUnverifiedName) return value;

  return toArabicDigits(
    value.replace(/\p{Script=Latin}+/gu, (word) => {
      const known = commonCatalogueWords[word.toLocaleLowerCase()];
      if (known !== undefined) return known;
      return transliterateLatinWord(word);
    }),
  )
    .replace(/\s{2,}/g, " ")
    .replace(/\s+([,.;:!?])/g, "$1")
    .trim();
}

function isDisplayText(parent?: Element | null) {
  return Boolean(parent?.closest(displayTextSelector));
}

function isReferenceIdentifier(value: string) {
  const clean = value.trim();
  if (!clean) return false;
  if (/^(?:https?:\/\/|www\.|[\w.-]+@)/i.test(clean)) return true;
  if (/^(?:ISBN|ISSN|DOI)\b/i.test(clean)) return true;
  if (/^HMML\s+\d/i.test(clean)) return true;
  if (/^[A-Z]{2,8}(?:\s|-)?\d[\dA-Z ./-]*$/.test(clean)) return true;
  return /^(?:Add MS|Harvard MS|CCM|ACK)\s/i.test(clean);
}

function getStoredLanguage(): SiteLanguage {
  try {
    return window.localStorage.getItem(storageKey) === "ar" ? "ar" : "en";
  } catch {
    return "en";
  }
}

function translateValue(value: string, parent?: Element | null) {
  const leading = value.match(/^\s*/)?.[0] ?? "";
  const trailing = value.match(/\s*$/)?.[0] ?? "";
  const clean = value.trim();

  if (!clean) return value;
  if (
    parent?.closest(
      '[data-translation-context="manuscript-condition"]',
    )
  ) {
    return `${leading}${normalizeArabicPresentation(
      translateManuscriptCondition(clean),
    )}${trailing}`;
  }
  if (/^[\d٠-٩][\d٠-٩,.\s–—-]*$/.test(clean)) {
    return `${leading}${toArabicDigits(clean)}${trailing}`;
  }

  let translated =
    (isDisplayText(parent) ? arabicDisplayText[clean] : undefined) ??
    arabicText[clean];

  if (!translated && isReferenceIdentifier(clean)) return value;

  if (!translated) {
    const witnesses = clean.match(/^([\d,]+) Syriac witnesses\.$/);
    const records = clean.match(/^([\d,]+) records?$/);
    const next = clean.match(/^Show the next ([\d,]+)$/);
    const position = clean.match(/^([\d,]+) of ([\d,]+)$/);
    const part = clean.match(/^Part ([\d,]+)$/);
    const items = clean.match(/^([\d,]+) items?$/);
    const source = clean.match(/^Source ([\d,]+):\s*(.+)$/);
    const manuscriptLink = clean.match(/^View the manuscript:\s*(.+)$/);
    const profileLink = clean.match(/^Read the profile of\s+(.+)$/);
    const digitizedCover = clean.match(/^Digitized cover of\s+(.+)$/);
    const recordUpdated = clean.match(/^(?:·\s*)?record updated\s+(.+)$/);
    const leaves = clean.match(/^([\d,]+)\s+leaf(?:\(ves\)|ves)?$/i);
    const dividedTitle = clean.match(/^(.+?)\s+([|—])\s+(.+)$/);
    const fromPlace = clean.match(/^(.+?)\s+from\s+(.+)$/);

    if (witnesses) translated = `${toArabicDigits(witnesses[1])} شاهدًا سريانيًا.`;
    if (records) translated = `${toArabicDigits(records[1])} سجل`;
    if (next) translated = `عرض ${toArabicDigits(next[1])} سجلًا آخر`;
    if (position) {
      translated = `${toArabicDigits(position[1])} من ${toArabicDigits(position[2])}`;
    }
    if (part) translated = `الجزء ${toArabicDigits(part[1])}`;
    if (items) translated = `${toArabicDigits(items[1])} مادة`;
    if (source) {
      translated = `المصدر ${source[1]}: ${translateValue(source[2])}`;
    }
    if (manuscriptLink) {
      translated = `عرض المخطوطة: ${manuscriptLink[1]}`;
    }
    if (profileLink) {
      translated = `اقرأ سيرة ${translateValue(profileLink[1])}`;
    }
    if (digitizedCover) {
      translated = `غلاف رقمي لكتاب «${digitizedCover[1]}»`;
    }
    if (recordUpdated) {
      translated = `تحديث السجل ${toArabicDigits(recordUpdated[1])}`;
    }
    if (leaves) {
      translated = `${toArabicDigits(leaves[1])} ورقة`;
    }
    if (dividedTitle) {
      translated = `${translateValue(dividedTitle[1])} ${dividedTitle[2]} ${translateValue(dividedTitle[3])}`;
    }
    if (fromPlace) {
      translated = `${translateValue(fromPlace[1])} من ${translateValue(fromPlace[2])}`;
    }
  }

  if (
    !translated &&
    clean.length < 180 &&
    /(?:\s·\s|;\s|,\s)/.test(clean)
  ) {
    translated = clean
      .split(/(\s·\s|;\s|,\s)/)
      .map((part) =>
        /^(?:\s·\s|;\s|,\s)$/.test(part) ? part : translateValue(part),
      )
      .join("");
  }

  if (!translated && /\p{Script=Latin}/u.test(clean)) {
    translated = translateUnknownCatalogueText(clean);
  }

  if (translated) {
    return `${leading}${normalizeArabicPresentation(translated)}${trailing}`;
  }

  if (/\p{Script=Arabic}/u.test(clean)) {
    return `${leading}${normalizeArabicPresentation(clean)}${trailing}`;
  }

  return value;
}

function shouldTranslate(node: Text) {
  const parent = node.parentElement;
  if (!parent || !node.data.trim()) return false;
  return !parent.closest(
    "[data-no-translate], script, style, code, pre, textarea, [lang='syr']",
  );
}

function shouldTranslateElement(element: Element) {
  return !element.closest(
    "[data-no-translate], script, style, code, pre, textarea, [lang='syr']",
  );
}

function applyTranslatedAttributes(root: Node, language: SiteLanguage) {
  const elements: Element[] = [];
  if (root instanceof Element) elements.push(root);
  if (root instanceof Document) elements.push(root.documentElement);
  if (
    root instanceof Element ||
    root instanceof Document ||
    root instanceof DocumentFragment
  ) {
    elements.push(...Array.from(root.querySelectorAll("*")));
  }

  elements.forEach((element) => {
    if (!shouldTranslateElement(element)) return;
    translatedAttributes.forEach((attribute) => {
      const current = element.getAttribute(attribute);
      if (current === null) return;

      let originals = originalAttributes.get(element);
      if (!originals) {
        originals = new Map<string, string>();
        originalAttributes.set(element, originals);
      }
      if (!originals.has(attribute)) originals.set(attribute, current);

      const original = originals.get(attribute) ?? current;
      element.setAttribute(
        attribute,
        language === "ar" ? translateValue(original, element) : original,
      );
    });
  });
}

function applyLanguage(root: Node, language: SiteLanguage) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let current = walker.nextNode();

  while (current) {
    const text = current as Text;
    if (shouldTranslate(text)) {
      if (!originalText.has(text)) originalText.set(text, text.data);
      const original = originalText.get(text) ?? text.data;
      text.data =
        language === "ar"
          ? translateValue(original, text.parentElement)
          : original;
    }
    current = walker.nextNode();
  }

  applyTranslatedAttributes(root, language);
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
    const documentRoot = document.documentElement;
    let language = getStoredLanguage();

    const translateDocument = () => {
      observer.disconnect();
      applyLanguage(documentRoot, language);
      document.documentElement.dataset.languageReady = "true";
      observer.observe(documentRoot, {
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
    >
      <button
        type="button"
        data-no-translate
        aria-pressed={language === "en"}
        onClick={() => setSiteLanguage("en")}
      >
        EN
      </button>
      <button
        type="button"
        lang="ar"
        data-no-translate
        aria-pressed={language === "ar"}
        onClick={() => setSiteLanguage("ar")}
      >
        العربية
      </button>
    </div>
  );
}
