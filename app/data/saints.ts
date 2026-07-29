export type SaintCategory =
  | "Missionaries"
  | "Teachers"
  | "Monastics"
  | "Martyrs";

export type SaintTone = "green" | "red" | "blue" | "gold";

export type SaintSource = {
  label: string;
  publisher: string;
  url: string;
};

export type HistoricalParagraph = {
  text: string;
  sourceIndexes: number[];
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
  tone: SaintTone;
  devotionalIntroduction: string;
  reflection: string;
  historicalContext: HistoricalParagraph[];
  themes: string[];
  sources: SaintSource[];
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
    image: "/images/mar-addai.webp",
    tone: "red",
    devotionalIntroduction:
      "Mar Addai stands at the doorway of Syriac Christian memory: a messenger received by a city, a healer welcomed into a household, and a witness whose presence marks a beginning. His story invites the reader to notice how faith often travels through hospitality, conversation, and patient teaching.",
    reflection:
      "Where might faithful presence matter more than dramatic words in your own life?",
    historicalContext: [
      {
        text: "The Teaching of Addai, preserved in Syriac, presents Addai as the apostolic envoy who came to Edessa and preached in the court of King Abgar. The narrative became one of the foundational stories through which Syriac Christians remembered the Christian beginnings of their city.",
        sourceIndexes: [0],
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
        sourceIndexes: [0],
      },
    ],
    themes: ["Mission", "Continuity", "The Gospel moving east"],
    sources: [
      {
        label: "Mari — ܡܐܪܝ",
        publisher: "Syriaca.org",
        url: "https://syriaca.org/person/1358",
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
    image: "/images/mar-narsai-hero.webp",
    tone: "blue",
    devotionalIntroduction:
      "For Mar Narsai, teaching could become poetry and poetry could become prayer. His verse homilies trained the mind while awakening wonder, joining careful interpretation to a language meant to be heard. He invites readers to approach learning as an act of attention before God.",
    reflection:
      "What truth becomes clearer when you give it time, rhythm, and attention?",
    historicalContext: [
      {
        text: "Narsai was a poet and teacher of biblical interpretation at the School of Edessa and later at the School of Nisibis. He became one of the major literary and theological voices associated with the formation of the Church of the East.",
        sourceIndexes: [0],
      },
      {
        text: "He is especially known for memre, extended verse homilies composed for teaching and proclamation. These works treat biblical, liturgical, and theological subjects through the disciplined patterns of Syriac poetry.",
        sourceIndexes: [0],
      },
      {
        text: "The schools of Edessa and Nisibis were not modern universities, but communities in which Scripture, interpretation, language, and ecclesial formation belonged together. Narsai’s legacy is inseparable from that culture of shared study.",
        sourceIndexes: [0, 1],
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
        sourceIndexes: [0],
      },
      {
        text: "His writings helped articulate the Church’s Christological vocabulary and defended its teaching in a contested environment. His work is important not only for doctrine but also for understanding how theology, ecclesial leadership, and monastic reform interacted in the late Sasanian world.",
        sourceIndexes: [0],
      },
      {
        text: "Babai’s title, “the Great,” reflects the breadth of his later reception. He is remembered as a teacher whose intellectual clarity served a community seeking stability and faithful expression.",
        sourceIndexes: [0],
      },
    ],
    themes: ["Discernment", "Monastic discipline", "Theological clarity"],
    sources: [
      {
        label: "Babai the Great — ܒܒܝ ܪܒܐ",
        publisher: "Syriaca.org",
        url: "https://syriaca.org/person/359",
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
    image: "/images/mar-isaac.webp",
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
        sourceIndexes: [0],
      },
      {
        text: "Isaac’s works are not a systematic biography. The details of his life remain limited, while the spiritual teaching preserved under his name is extensive. A responsible profile therefore gives greater confidence to his literary legacy than to later attempts to fill every gap in his story.",
        sourceIndexes: [0],
      },
    ],
    themes: ["Mercy", "Stillness", "Prayer of the heart"],
    sources: [
      {
        label: "Isaac of Nineveh — ܐܝܣܚܩ ܕܢܝܢܘܐ",
        publisher: "Syriaca.org",
        url: "https://syriaca.org/person/550",
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
];

export function findSaint(slug: string) {
  return saints.find((saint) => saint.slug === slug);
}
