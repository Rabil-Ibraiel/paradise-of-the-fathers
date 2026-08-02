export type SaintCategory =
  | "Missionaries"
  | "Teachers"
  | "Monastics"
  | "Martyrs"
  | "Bishops";

export type SaintTone = "green" | "red" | "blue" | "gold";

export type SaintSource = {
  label: string;
  publisher: string;
  url: string;
};

export type HistoricalParagraph = {
  text: string;
  sourceIndexes: number[];
  arabicText?: string;
};

export type Saint = {
  slug: string;
  name: string;
  syriacName: string;
  title: string;
  era: string;
  place: string;
  category: SaintCategory;
  summary: string;
  image?: string;
  imageAlt?: string;
  imageCaption?: string;
  imageSourceUrl?: string;
  imagePosition?: string;
  tone: SaintTone;
  devotionalIntroduction: string;
  reflection: string;
  historicalContext: HistoricalParagraph[];
  themes: string[];
  sources: SaintSource[];
  isEditorial?: boolean;
  arabic?: {
    name: string;
    title: string;
    era: string;
    place: string;
    summary: string;
    imageAlt: string;
    imageCaption: string;
    devotionalIntroduction: string;
    reflection: string;
    themes: string[];
  };
  lifeChapters?: Array<{
    title: string;
    arabicTitle: string;
    paragraphs: Array<HistoricalParagraph & { arabicText: string }>;
  }>;
  imageLicense?: string;
};

export const saints: Saint[] = [
  {
    slug: "mar-addai",
    name: "Mar Addai",
    syriacName: "ܡܪܝ ܐܕܝ",
    title: "The apostle of Edessa",
    era: "Apostolic tradition",
    place: "Edessa",
    category: "Missionaries",
    summary:
      "An apostolic missionary at the heart of early Syriac Christian memory and the tradition of Edessa.",
    image: "/images/addai-mari-icon.jpg",
    imageAlt:
      "Devotional icon of Saints Addai and Mari beneath Christ, from an East Syriac missal",
    imageCaption:
      "Devotional icon of Saints Addai and Mari · source and date unknown · CC0",
    imageSourceUrl:
      "https://commons.wikimedia.org/wiki/File:Icon_of_Mar_Addai_and_Mari_Apostles_of_the_East.jpg",
    imagePosition: "33% center",
    tone: "red",
    devotionalIntroduction:
      "Mar Addai stands at the doorway of Syriac Christian memory: a messenger received by a city, a healer welcomed into a household, and a witness whose presence marks a beginning. His story invites the reader to notice how faith often travels through hospitality, conversation, and patient teaching.",
    reflection:
      "Where might faithful presence matter more than dramatic words in your own life?",
    historicalContext: [
      {
        text: "The Teaching of Addai, preserved in Syriac, presents Addai as the apostolic envoy who came to Edessa and preached in the court of King Abgar. The narrative became one of the foundational stories through which Syriac Christians remembered the Christian beginnings of their city.",
        sourceIndexes: [0, 2],
      },
      {
        text: "The surviving form of the Teaching belongs to Late Antiquity rather than to the first century itself. Historians therefore read the account as sacred memory and as evidence for how later Edessene Christians understood their origins, not as a contemporary record of every event it describes.",
        sourceIndexes: [0, 1],
      },
      {
        text: "Within the tradition of the Church of the East, Addai is remembered together with Mari. Their names remain joined in the ancient Eucharistic tradition known as the Anaphora of Addai and Mari.",
        sourceIndexes: [0],
      },
    ],
    themes: ["Apostolic witness", "Hospitality", "Beginnings in Edessa"],
    sources: [
      {
        label: "The Teaching of Addai",
        publisher: "Syriaca.org",
        url: "https://syriaca.org/work/921",
      },
      {
        label: "Abgarids of Edessa",
        publisher: "Gorgias Encyclopedic Dictionary of the Syriac Heritage",
        url: "https://dev.gedsh.bethmardutho.org/entry/Abgarids-of-Edessa.html",
      },
      {
        label: "Manuscript witnesses to the Doctrine of Addai",
        publisher: "Syri.ac · University of Oklahoma",
        url: "https://syri.ac/authors-jacob-sarug/doctrine-addai",
      },
    ],
  },
  {
    slug: "mar-mari",
    name: "Mar Mari",
    syriacName: "ܡܐܪܝ",
    title: "The road into Mesopotamia",
    era: "Apostolic tradition",
    place: "Mesopotamia",
    category: "Missionaries",
    summary:
      "Remembered with Addai in the apostolic and liturgical life of the Church, carrying the Gospel farther east.",
    image: "/images/addai-mari-icon.jpg",
    imageAlt:
      "Devotional icon of Saints Addai and Mari beneath Christ, from an East Syriac missal",
    imageCaption:
      "Devotional icon of Saints Addai and Mari · source and date unknown · CC0",
    imageSourceUrl:
      "https://commons.wikimedia.org/wiki/File:Icon_of_Mar_Addai_and_Mari_Apostles_of_the_East.jpg",
    imagePosition: "72% center",
    tone: "gold",
    devotionalIntroduction:
      "Mar Mari is remembered as a disciple who kept walking. His life represents the movement from one received word to many new communities, from Edessa toward the cities and villages of Mesopotamia. His memory asks what it means to carry a gift faithfully beyond the place where it was first received.",
    reflection:
      "What have you received that becomes complete only when it is shared?",
    historicalContext: [
      {
        text: "The Acts of Mar Mari present him as a disciple commissioned by Addai and as an apostle to Mesopotamia. In the narrative, his mission reaches the royal cities of the Parthian world and establishes Christian communities farther east.",
        sourceIndexes: [0],
      },
      {
        text: "Like many apostolic acts, the account is hagiographical: it expresses the Church’s memory of its origins through a sacred narrative shaped over time. It is best read with both reverence for the tradition and care about the difference between remembered origin and recoverable chronology.",
        sourceIndexes: [0],
      },
      {
        text: "Mari’s continuing importance is especially visible in worship. Together with Addai, he gives his name to one of the most ancient Eucharistic prayers still in use in the East Syriac tradition.",
        sourceIndexes: [0, 1],
      },
    ],
    themes: ["Mission", "Continuity", "The Gospel moving east"],
    sources: [
      {
        label: "Mari — ܡܐܪܝ",
        publisher: "Syriaca.org",
        url: "https://syriaca.org/person/1358",
      },
      {
        label: "Manuscripts of the Anaphora of Addai and Mari",
        publisher: "Syri.ac · University of Oklahoma",
        url: "https://syri.ac/anaphoras/anaphora-addai-and-mari",
      },
    ],
  },
  {
    slug: "mar-narsai",
    name: "Mar Narsai",
    syriacName: "ܢܪܣܝ",
    title: "Poet and teacher",
    era: "Died c. 500–502",
    place: "Edessa · Nisibis",
    category: "Teachers",
    summary:
      "A formative poet-theologian and teacher associated with the celebrated schools of Edessa and Nisibis.",
    tone: "blue",
    devotionalIntroduction:
      "For Mar Narsai, teaching could become poetry and poetry could become prayer. His verse homilies trained the mind while awakening wonder, joining careful interpretation to a language meant to be heard. He invites readers to approach learning as an act of attention before God.",
    reflection:
      "What truth becomes clearer when you give it time, rhythm, and attention?",
    historicalContext: [
      {
        text: "Narsai was a poet and teacher of biblical interpretation at the School of Edessa and later at the School of Nisibis. He became one of the major literary and theological voices associated with the formation of the Church of the East.",
        sourceIndexes: [0, 2],
      },
      {
        text: "He is especially known for memre, extended verse homilies composed for teaching and proclamation. These works treat biblical, liturgical, and theological subjects through the disciplined patterns of Syriac poetry.",
        sourceIndexes: [0, 2],
      },
      {
        text: "The schools of Edessa and Nisibis were not modern universities, but communities in which Scripture, interpretation, language, and ecclesial formation belonged together. Narsai’s legacy is inseparable from that culture of shared study.",
        sourceIndexes: [0, 1, 2],
      },
    ],
    themes: ["Sacred learning", "Poetry", "Scripture"],
    sources: [
      {
        label: "Narsai — ܢܪܣܝ",
        publisher: "Syriaca.org",
        url: "https://syriaca.org/person/650",
      },
      {
        label: "School of Nisibis",
        publisher: "Syriaca.org",
        url: "https://syriaca.org/place/476",
      },
      {
        label: "Narsai’s homilies, manuscripts, and editions",
        publisher: "Syri.ac · University of Oklahoma",
        url: "https://www.syri.ac/narsai",
      },
    ],
  },
  {
    slug: "mar-babai-the-great",
    name: "Mar Babai the Great",
    syriacName: "ܒܒܝ ܪܒܐ",
    title: "Abbot and theologian",
    era: "c. 551–628",
    place: "Mount Izla",
    category: "Teachers",
    summary:
      "A monastic reformer and theologian whose work helped shape the Church’s language of faith.",
    tone: "green",
    devotionalIntroduction:
      "Mar Babai the Great joined the discipline of the monastery to the precision of theology. His memory suggests that clear teaching is not separate from a life of prayer: words about faith acquire their weight when they are tested by obedience, community, and endurance.",
    reflection:
      "Which convictions in your life are being shaped by practice, not only by argument?",
    historicalContext: [
      {
        text: "Babai the Great was a theologian and monastic author who lived from about 551 to 628. He is closely associated with the monastic life of Mount Izla and with a period of significant institutional and theological pressure for the Church of the East.",
        sourceIndexes: [0, 1],
      },
      {
        text: "His writings helped articulate the Church’s Christological vocabulary and defended its teaching in a contested environment. His work is important not only for doctrine but also for understanding how theology, ecclesial leadership, and monastic reform interacted in the late Sasanian world.",
        sourceIndexes: [0],
      },
      {
        text: "Babai’s title, “the Great,” reflects the breadth of his later reception. He is remembered as a teacher whose intellectual clarity served a community seeking stability and faithful expression.",
        sourceIndexes: [0, 1],
      },
    ],
    themes: ["Discernment", "Monastic discipline", "Theological clarity"],
    sources: [
      {
        label: "Babai the Great — ܒܒܝ ܪܒܐ",
        publisher: "Syriaca.org",
        url: "https://syriaca.org/person/359",
      },
      {
        label: "Ishoʿdnah’s notices on Mar Babai",
        publisher: "Syri.ac · University of Oklahoma",
        url: "https://syri.ac/ishodnah",
      },
    ],
  },
  {
    slug: "mar-isaac-of-nineveh",
    name: "Mar Isaac of Nineveh",
    syriacName: "ܐܝܣܚܩ ܕܢܝܢܘܐ",
    title: "Writer of the inner life",
    era: "Late 7th century",
    place: "Beth Qatraye · Nineveh",
    category: "Monastics",
    summary:
      "A bishop and spiritual writer whose teaching on mercy, prayer, and stillness crossed ecclesial borders.",
    image: "/images/isaac-syrian-icon.jpg",
    imageAlt:
      "Anonymous medieval icon of Saint Isaac the Syrian with a long beard and monastic hood",
    imageCaption:
      "Anonymous icon of Isaac the Syrian · 14th–15th century · public domain",
    imageSourceUrl:
      "https://commons.wikimedia.org/wiki/File:Isak_Sirin.jpg",
    tone: "green",
    devotionalIntroduction:
      "Mar Isaac of Nineveh writes toward the hidden places of the heart. His teaching returns again and again to mercy, humility, prayer, and the patient healing of the person. Readers across many Christian traditions have recognized in his words an invitation to become compassionate toward all creation.",
    reflection:
      "What changes when mercy becomes the measure of spiritual maturity?",
    historicalContext: [
      {
        text: "The hagiographical tradition recorded by Syriaca.org remembers Isaac as a late seventh-century monastic author from Beth Qatraye who briefly served as bishop of Nineveh before returning to the solitary and monastic life. These details belong to the received life of the saint rather than to a contemporary biography.",
        sourceIndexes: [0],
      },
      {
        text: "His ascetical writings were composed in Syriac and circulated far beyond the Church of the East through ancient translations. That wide reception made him one of the most influential Syriac spiritual writers in global Christianity.",
        sourceIndexes: [0, 1],
      },
      {
        text: "Isaac’s works are not a systematic biography. The details of his life remain limited, while the spiritual teaching preserved under his name is extensive. A responsible profile therefore gives greater confidence to his literary legacy than to later attempts to fill every gap in his story.",
        sourceIndexes: [0, 1],
      },
    ],
    themes: ["Mercy", "Stillness", "Prayer of the heart"],
    sources: [
      {
        label: "Isaac of Nineveh — ܐܝܣܚܩ ܕܢܝܢܘܐ",
        publisher: "Syriaca.org",
        url: "https://syriaca.org/person/550",
      },
      {
        label: "Isaac of Nineveh: texts, translations, and studies",
        publisher: "Syri.ac · University of Oklahoma",
        url: "https://syri.ac/brock/isaac",
      },
    ],
  },
  {
    slug: "mar-qardagh",
    name: "Mar Qardagh",
    syriacName: "ܩܪܕܓ",
    title: "The witness of Adiabene",
    era: "Late Antique tradition",
    place: "Adiabene",
    category: "Martyrs",
    summary:
      "A martyr remembered through a powerful East Syriac narrative of conversion, courage, and costly witness.",
    tone: "red",
    devotionalIntroduction:
      "Mar Qardagh is remembered at the point where power, loyalty, family, and faith collide. His story does not present courage as ease; it portrays a conversion that rearranges every allegiance. The reader is asked to consider what faithful witness costs when identity itself is contested.",
    reflection:
      "Which allegiance most deeply shapes the choices you make under pressure?",
    historicalContext: [
      {
        text: "The legend of Mar Qardagh is an East Syriac martyr narrative set in the Sasanian world and associated with Adiabene. It presents Qardagh as a noble and military figure whose conversion leads to conflict and martyrdom.",
        sourceIndexes: [0, 1],
      },
      {
        text: "Modern scholarship studies the text not only for the saint’s story but also for the way late antique Christians in northern Mesopotamia remembered landscape, ancestry, political authority, and heroic virtue. The narrative’s historical setting and the date of its literary composition should not be treated as the same thing.",
        sourceIndexes: [0, 1],
      },
      {
        text: "Read devotionally, Qardagh embodies costly witness. Read historically, his legend reveals how an East Syriac community fashioned a Christian account of courage within the cultural world of late antique Iraq.",
        sourceIndexes: [0, 1],
      },
    ],
    themes: ["Courage", "Conversion", "Costly witness"],
    sources: [
      {
        label: "Qardag — ܩܪܕܓ",
        publisher: "Syriaca.org",
        url: "https://syriaca.org/person/1420",
      },
      {
        label: "Qardagh (text)",
        publisher: "Syriaca.org",
        url: "https://syriaca.org/work/287",
      },
    ],
  },
  {
    slug: "aphrahat-the-persian",
    name: "Aphrahat the Persian",
    syriacName: "ܐܦܪܗܛ ܦܪܣܝܐ",
    title: "The Persian Sage",
    era: "First half of the 4th century",
    place: "Persian Empire",
    category: "Teachers",
    summary:
      "An early Syriac teacher whose twenty-three Demonstrations join Scripture, pastoral care, and the life of faith.",
    tone: "blue",
    devotionalIntroduction:
      "Aphrahat writes with the steadiness of a teacher who expects truth to become practice. His Demonstrations move between Scripture, prayer, fasting, covenant, and community, asking the reader not merely to admire wisdom but to inhabit it.",
    reflection:
      "Which belief in your life is asking to become a visible habit?",
    historicalContext: [
      {
        text: "Aphrahat, known as the Persian Sage, was a fourth-century Syriac author associated with Christianity in the Persian Empire. Twenty-three works known as the Demonstrations survive under his name.",
        sourceIndexes: [0, 1],
      },
      {
        text: "His writings are among the earliest substantial witnesses to Syriac Christianity east of the Roman frontier. They draw deeply on biblical language while addressing the practical and communal demands of Christian life.",
        sourceIndexes: [0, 1],
      },
      {
        text: "The exact details of Aphrahat’s office and biography remain limited. His literary voice is therefore a firmer historical guide than later attempts to supply a complete life story.",
        sourceIndexes: [0],
      },
    ],
    themes: ["Scripture", "Covenant", "Faith practiced"],
    sources: [
      {
        label: "Aphrahat — ܐܦܪܗܛ",
        publisher: "Syriaca.org",
        url: "https://syriaca.org/person/10",
      },
      {
        label: "Aphrahat: editions, translations, and bibliography",
        publisher: "Syri.ac · University of Oklahoma",
        url: "https://syri.ac/aphrahat",
      },
    ],
  },
  {
    slug: "mar-awgin",
    name: "Mar Awgin",
    syriacName: "ܡܪܝ ܐܘܓܝܢ",
    title: "Father of a remembered monastic beginning",
    era: "4th–early 5th century tradition",
    place: "Mount Izla · Nisibis",
    category: "Monastics",
    summary:
      "The traditional founder of Mesopotamian monasticism, remembered with disciples who established communities across the region.",
    tone: "gold",
    devotionalIntroduction:
      "Mar Awgin belongs to the remembered beginnings of Syriac monastic life. His story gathers a company rather than a solitary hero: a teacher, disciples, a mountain, and the patient founding of places where prayer could endure.",
    reflection:
      "What kind of community would help your deepest commitments endure?",
    historicalContext: [
      {
        text: "Syriac hagiographical tradition remembers Awgin as a monk from Egypt who came with disciples and became a founding father of monasticism in Mesopotamia.",
        sourceIndexes: [0],
      },
      {
        text: "Modern scholarship treats this foundation story carefully because the surviving narratives developed long after the period they describe. The tradition remains historically important as an account of how later communities understood their monastic ancestry.",
        sourceIndexes: [0],
      },
      {
        text: "The monastery bearing Mar Awgin’s name stands north of Nisibis and preserves the saint’s memory in the landscape of Tur Abdin and Mount Izla.",
        sourceIndexes: [1],
      },
    ],
    themes: ["Community", "Monastic beginnings", "Tradition and memory"],
    sources: [
      {
        label: "Awgin — ܡܪܝ ܐܘܓܝܢ",
        publisher: "Syriaca.org",
        url: "https://syriaca.org/person/356",
      },
      {
        label: "Monastery of Mar Awgin",
        publisher: "Syriaca.org",
        url: "https://syriaca.org/place/339",
      },
    ],
  },
  {
    slug: "mar-abraham-of-kashkar",
    name: "Mar Abraham of Kashkar",
    syriacName: "ܐܒܪܗܡ ܟܫܟܪܝܐ",
    title: "Father of the Monks of the Orient",
    era: "c. 500–588",
    place: "Kashkar · Mount Izla",
    category: "Monastics",
    summary:
      "A major reformer who founded the Great Monastery on Mount Izla and shaped East Syriac monastic life.",
    tone: "green",
    devotionalIntroduction:
      "Mar Abraham’s life joins reform to patience. He did not seek novelty for its own sake; he sought a disciplined form of life in which prayer, work, hospitality, and obedience could support one another for generations.",
    reflection:
      "Which structure in your life could protect what you value most?",
    historicalContext: [
      {
        text: "Abraham of Kashkar was a monk, founder, and abbot of the Great Monastery on Mount Izla. Syriaca.org records his death in the later sixth century and his East Syriac commemoration on 2 May.",
        sourceIndexes: [0],
      },
      {
        text: "He became a central figure in the renewal and organization of monasticism within the Church of the East. Later tradition called him the Father of the Monks of the Orient.",
        sourceIndexes: [0],
      },
      {
        text: "A Syriac life preserves his hagiographical memory, while monastic rules connected with his reform offer evidence for the ideals later communities associated with his name.",
        sourceIndexes: [0, 1],
      },
    ],
    themes: ["Rule of life", "Reform", "Faithful endurance"],
    sources: [
      {
        label: "Abraham of Kashkar — ܐܒܪܗܡ ܟܫܟܪܝܐ",
        publisher: "Syriaca.org",
        url: "https://syriaca.org/person/320",
      },
      {
        label: "Life of Abraham of Kashkar",
        publisher: "Syriaca.org",
        url: "https://syriaca.org/work/1145",
      },
    ],
  },
  {
    slug: "rabban-bar-idta",
    name: "Rabban Bar ʿIdta",
    syriacName: "ܪܒܢ ܒܪ ܥܕܬܐ",
    title: "Founder in the region of Marga",
    era: "Died early 7th century",
    place: "Marga",
    category: "Monastics",
    summary:
      "A disciple of Abraham of Kashkar remembered as a monastic leader and founder in northern Mesopotamia.",
    tone: "gold",
    devotionalIntroduction:
      "Rabban Bar ʿIdta received a tradition and made room for it to grow. His life belongs to the quiet chain by which one community teaches another, and one disciple becomes responsible for those who will come after him.",
    reflection:
      "What have you received that now depends on your care?",
    historicalContext: [
      {
        text: "Rabban Bar ʿIdta is remembered as a disciple of Abraham of Kashkar and an important monastic leader in the region of Marga.",
        sourceIndexes: [0],
      },
      {
        text: "The hagiographical tradition associates him with the foundation of a monastery that became part of the dense monastic landscape described by East Syriac writers.",
        sourceIndexes: [0],
      },
      {
        text: "Rabban Hormizd later spent decades in Bar ʿIdta’s monastery, linking the memory of this community to the famous monastery above Alqosh.",
        sourceIndexes: [0, 1],
      },
    ],
    themes: ["Discipleship", "Continuity", "Making a dwelling"],
    sources: [
      {
        label: "Rabban Bar ʿIdta — ܪܒܢ ܒܪ ܥܕܬܐ",
        publisher: "Syriaca.org",
        url: "https://syriaca.org/person/366",
      },
      {
        label: "Life of Rabban Hormizd",
        publisher: "Syriaca.org",
        url: "https://syriaca.org/work/963",
      },
    ],
  },
  {
    slug: "dadisho-qatraya",
    name: "Dadishoʿ Qatraya",
    syriacName: "ܕܕܝܫܘܥ ܩܛܪܝܐ",
    title: "Teacher of solitude",
    era: "Late 7th century",
    place: "Beth Qatraye",
    category: "Teachers",
    summary:
      "An East Syriac monastic author whose writings interpret stillness, prayer, and the inherited wisdom of the desert.",
    tone: "blue",
    devotionalIntroduction:
      "Dadishoʿ writes about solitude without making it an escape. Stillness becomes a place of encounter, testing, and attention—a way of learning what the heart carries when noise no longer hides it.",
    reflection:
      "What becomes audible when you stop filling every silence?",
    historicalContext: [
      {
        text: "Dadishoʿ Qatraya was a late seventh-century monastic author from the East Syriac cultural world of Beth Qatraye.",
        sourceIndexes: [0],
      },
      {
        text: "His writings include teaching on solitude and a commentary connected with the ascetical tradition of Abba Isaiah. They show East Syriac authors receiving, interpreting, and reshaping a wide monastic inheritance.",
        sourceIndexes: [0, 1],
      },
      {
        text: "Biographical information about Dadishoʿ is limited. His importance rests principally on the writings and spiritual vocabulary transmitted under his name.",
        sourceIndexes: [0],
      },
    ],
    themes: ["Stillness", "Discernment", "Received wisdom"],
    sources: [
      {
        label: "Dadishoʿ Qatraya — ܕܕܝܫܘܥ ܩܛܪܝܐ",
        publisher: "Syriaca.org",
        url: "https://syriaca.org/person/434",
      },
      {
        label: "Dadishoʿ and the Book of Abba Isaiah",
        publisher: "Comprehensive Bibliography on Syriac Studies",
        url: "https://syriaca.org/cbss/6STTP2LD",
      },
    ],
  },
  {
    slug: "sahdona",
    name: "Sahdona",
    syriacName: "ܣܗܕܘܢܐ",
    title: "Monastic author and bishop",
    era: "Early 7th century",
    place: "Mahuza d-Arewan",
    category: "Teachers",
    summary:
      "A Syriac monastic writer, also known as Martyrios, whose Book of Perfection explores the shape of Christian life.",
    tone: "red",
    devotionalIntroduction:
      "Sahdona’s writing asks what makes a life whole. Perfection is not presented as polish or self-sufficiency, but as a long conversion of desire toward love, humility, prayer, and care for others.",
    reflection:
      "What if spiritual maturity were measured by love rather than achievement?",
    historicalContext: [
      {
        text: "Sahdona, also known as Martyrios, was an early seventh-century Syriac monastic author and bishop associated with the Church of the East.",
        sourceIndexes: [0],
      },
      {
        text: "He is especially remembered for the Book of Perfection, an extensive work of monastic and spiritual instruction.",
        sourceIndexes: [0],
      },
      {
        text: "Sahdona’s ecclesiastical path became contested, and his reception is historically complex. His inclusion here recognizes his importance to East Syriac literary and spiritual history rather than flattening those disputes.",
        sourceIndexes: [0],
      },
    ],
    themes: ["Love", "Spiritual maturity", "A complex inheritance"],
    sources: [
      {
        label: "Sahdona — ܣܗܕܘܢܐ",
        publisher: "Syriaca.org",
        url: "https://syriaca.org/person/711",
      },
    ],
  },
  {
    slug: "rabban-hormizd",
    name: "Rabban Hormizd",
    syriacName: "ܪܒܢ ܗܘܪܡܝܙܕ",
    title: "The elder above Alqosh",
    era: "7th century",
    place: "Alqosh · northern Iraq",
    category: "Monastics",
    summary:
      "A Church of the East monastic founder whose name remains joined to the great monastery overlooking Alqosh.",
    tone: "green",
    devotionalIntroduction:
      "Rabban Hormizd’s memory is held by a mountain. Above Alqosh, stone cells, paths, caves, and worship have carried his name through centuries of danger, renewal, departure, and return.",
    reflection:
      "Which places have taught your community how to remember?",
    historicalContext: [
      {
        text: "Syriaca.org describes Rabban Hormizd as a monastic founder of the Church of the East who lived in the seventh century and spent many years at the monastery of Rabban Bar ʿIdta.",
        sourceIndexes: [0, 1],
      },
      {
        text: "He later founded the monastery northeast of Alqosh that bears his name. The monastery became a major center in the transmission of East Syriac literature and ecclesiastical history.",
        sourceIndexes: [0, 1],
      },
      {
        text: "The surviving life is hagiographical and should not be treated as a modern biography. It nevertheless preserves the community’s account of a saint, a foundation, and a sacred landscape.",
        sourceIndexes: [1],
      },
    ],
    themes: ["Place", "Memory", "Monastic foundation"],
    sources: [
      {
        label: "Hormizd — ܗܘܪܡܝܙܕ",
        publisher: "Syriaca.org",
        url: "https://syriaca.org/person/1271",
      },
      {
        label: "Life of Rabban Hormizd and its manuscripts",
        publisher: "Syriaca.org",
        url: "https://syriaca.org/work/963",
      },
    ],
  },
  {
    slug: "mar-george-of-izla",
    name: "Mar George of Izla",
    syriacName: "ܓܝܘܪܓܝܣ",
    title: "Monk and martyr",
    era: "Died 615",
    place: "Mount Izla",
    category: "Martyrs",
    summary:
      "A monk remembered as a convert from Zoroastrianism who was put to death under the Sasanian ruler Khosrow II.",
    tone: "red",
    devotionalIntroduction:
      "Mar George’s story is one of identity chosen at cost. His received life remembers a convert, monk, priest, and witness whose allegiance could not be reduced to convenience when religious and political pressures closed around him.",
    reflection:
      "Which conviction remains yours when it no longer brings safety?",
    historicalContext: [
      {
        text: "The Syriac tradition remembers George of Izla, whose earlier name was Mihrangushnasp, as a convert from Zoroastrianism who became a monk and priest.",
        sourceIndexes: [0],
      },
      {
        text: "His story places him amid the theological and political conflicts of the early seventh-century Sasanian world and records his death in 615.",
        sourceIndexes: [0],
      },
      {
        text: "The account is a martyr tradition shaped by ecclesial memory. It provides a powerful witness to conversion and conflict while requiring the same distinction between hagiographical narrative and recoverable chronology used throughout this archive.",
        sourceIndexes: [0],
      },
    ],
    themes: ["Conversion", "Courage", "Faith under pressure"],
    sources: [
      {
        label: "George of Izla — ܓܝܘܪܓܝܣ",
        publisher: "Syriaca.org",
        url: "https://syriaca.org/person/1250",
      },
    ],
  },
  {
    slug: "ishoyahb-iii",
    name: "Mar Ishoʿyahb III",
    syriacName: "ܝܫܘܥܝܗܒ ܚܕܝܒܝܐ",
    title: "Patriarch and liturgical reformer",
    era: "Patriarch 649–659",
    place: "Adiabene · Seleucia-Ctesiphon",
    category: "Bishops",
    summary:
      "A patriarch, author, and liturgical reformer who led the Church of the East through a period of profound political change.",
    tone: "blue",
    devotionalIntroduction:
      "Mar Ishoʿyahb III carried responsibility across distance. His letters reveal a leader trying to hold communities together through persuasion, correction, worship, and patient attention while the political world around them changed.",
    reflection:
      "How can leadership protect communion without silencing honest difficulty?",
    historicalContext: [
      {
        text: "Ishoʿyahb III of Adiabene served as patriarch of the Church of the East from 649 to 659 and is remembered as an author and liturgical reformer.",
        sourceIndexes: [0],
      },
      {
        text: "His surviving letters illuminate ecclesiastical relationships extending from Mesopotamia toward the Gulf and other regions during the transition from Sasanian to early Islamic rule.",
        sourceIndexes: [0],
      },
      {
        text: "His importance lies not only in office but in the documentary voice of his correspondence: a rare window into leadership, discipline, mission, and communication within the seventh-century Church of the East.",
        sourceIndexes: [0],
      },
    ],
    themes: ["Leadership", "Communion", "A changing world"],
    sources: [
      {
        label: "Ishoʿyahb III of Adiabene — ܝܫܘܥܝܗܒ ܚܕܝܒܝܐ",
        publisher: "Syriaca.org",
        url: "https://syriaca.org/person/561",
      },
    ],
  },
];

export function findSaint(slug: string) {
  return saints.find((saint) => saint.slug === slug);
}
