import type { HistoricalParagraph } from "./saints";

export type SaintLifeChapter = {
  title: string;
  paragraphs: HistoricalParagraph[];
};

const biographies: Record<string, SaintLifeChapter[]> = {
  "mar-addai": [
    {
      title: "Edessa remembers a beginning",
      paragraphs: [
        {
          text: "The Teaching of Addai places the apostle inside Edessa’s celebrated Abgar tradition. The story begins with an exchange between King Abgar and Jesus, continues with Addai’s arrival after the resurrection, and presents healing, hospitality, and public teaching as the means by which the city receives the Gospel.",
          sourceIndexes: [0, 1],
        },
      ],
    },
    {
      title: "The life preserved in a later text",
      paragraphs: [
        {
          text: "The Syriac Teaching is not a diary from the apostolic age. Its literary form reflects the concerns of Christians in late-antique Edessa, including the authority of local teaching, the memory of the city’s archives, and the desire to connect an established Syriac community to the apostles. Its value therefore lies both in the tradition it transmits and in the world of the later community that shaped it.",
          sourceIndexes: [0, 2],
        },
      ],
    },
    {
      title: "A name carried by worship",
      paragraphs: [
        {
          text: "Addai’s memory outlived the political world of Edessa because it entered the Church’s language of origin and prayer. Joined with Mari, his name marks the East Syriac Eucharistic tradition and expresses the conviction that the churches east of the Roman frontier received an apostolic inheritance of their own.",
          sourceIndexes: [0, 2],
        },
      ],
    },
  ],
  "mar-mari": [
    {
      title: "The apostle who continues the road",
      paragraphs: [
        {
          text: "The Acts of Mar Mari remember him as a disciple ordained by Addai and sent beyond Edessa. The narrative carries him through Mesopotamia toward the royal cities of the Parthian world, using journeys, debates, healings, and the founding of communities to explain how Christian memory crossed from one city into a much wider landscape.",
          sourceIndexes: [0],
        },
      ],
    },
    {
      title: "Sacred geography and remembered origins",
      paragraphs: [
        {
          text: "The Acts arrange places along Mari’s route as a sacred geography. Modern readers should not treat every episode as a securely dated itinerary, but the text remains important evidence for how eastern Christians imagined the continuity between apostolic commission and the later churches of Mesopotamia.",
          sourceIndexes: [0],
        },
      ],
    },
    {
      title: "Communion across generations",
      paragraphs: [
        {
          text: "Mari’s enduring presence is liturgical rather than merely biographical. His name beside Addai’s in the Eucharistic tradition binds missionary memory to the repeated life of worship: the apostle is remembered whenever a community gathers, gives thanks, and receives the tradition it will hand on.",
          sourceIndexes: [0, 1],
        },
      ],
    },
  ],
  "mar-narsai": [
    {
      title: "A teacher between two schools",
      paragraphs: [
        {
          text: "Narsai’s career belongs to the teaching cultures of Edessa and Nisibis. He taught biblical interpretation at Edessa and later became a defining voice at Nisibis, where the study of Scripture, Syriac language, theological argument, and communal discipline formed future clergy and teachers.",
          sourceIndexes: [0, 1],
        },
      ],
    },
    {
      title: "Theology made audible",
      paragraphs: [
        {
          text: "His characteristic form was the memra, an extended verse homily intended to be heard. Rhythm and parallelism allowed a congregation or school to follow complex readings of Scripture, the sacraments, creation, and salvation. The large body transmitted under his name also requires care, because not every attributed poem can be assigned to him with equal confidence.",
          sourceIndexes: [0, 2],
        },
      ],
    },
    {
      title: "A long life in manuscripts",
      paragraphs: [
        {
          text: "Narsai’s importance can be measured in copying as well as biography. His homilies circulated in collections, entered liturgical reading, and continued to train East Syriac imagination long after the schools that shaped him had changed. Manuscript catalogues preserve both the reach of this legacy and the textual questions that remain.",
          sourceIndexes: [0, 2],
        },
      ],
    },
  ],
  "mar-babai-the-great": [
    {
      title: "Monk and organiser",
      paragraphs: [
        {
          text: "Babai was born around the middle of the sixth century and received the learned formation associated with Nisibis before entering the monastic world of Mount Izla. At the Great Monastery he combined study with ascetic discipline and eventually became one of the most influential monastic leaders of his generation.",
          sourceIndexes: [0, 1],
        },
      ],
    },
    {
      title: "Leadership during a vacancy",
      paragraphs: [
        {
          text: "During the long vacancy in the patriarchate between 609 and 628, Babai helped oversee monasteries and defend the theological identity of the Church of the East. His authority was not simply administrative: visitation, reform, teaching, and controversy all belonged to his effort to hold scattered communities together during political and ecclesiastical uncertainty.",
          sourceIndexes: [0, 1],
        },
      ],
    },
    {
      title: "Union, discipline, and memory",
      paragraphs: [
        {
          text: "Babai wrote theological, ascetical, and hagiographical works. His Book of the Union became especially important for East Syriac Christology, while lives of holy people translated doctrine into exemplary stories. His legacy joins precise language about Christ with a demanding vision of monastic attention and responsibility.",
          sourceIndexes: [0, 1],
        },
      ],
    },
  ],
  "mar-isaac-of-nineveh": [
    {
      title: "From Beth Qaṭraye to Nineveh",
      paragraphs: [
        {
          text: "Isaac came from Beth Qaṭraye, the Syriac Christian region associated with the Gulf. Tradition remembers his consecration as bishop of Nineveh and a brief episcopate, followed by withdrawal from office and a return to the solitary life. Later notices place his final years in the monastic landscapes of Khuzistan and connect his burial with the monastery of Rabban Shabur.",
          sourceIndexes: [0, 1],
        },
      ],
    },
    {
      title: "The hidden work of the heart",
      paragraphs: [
        {
          text: "Isaac’s surviving discourses are less a chronological autobiography than a map of inner transformation. They address stillness, prayer, tears, discernment, compassion, the reading of Scripture, and the patient purification of desire. Different collections of his writings survive, and modern scholarship continues to study their transmission and attribution.",
          sourceIndexes: [0, 1],
        },
      ],
    },
    {
      title: "A teacher beyond one communion",
      paragraphs: [
        {
          text: "Translations carried Isaac’s teaching into Greek, Arabic, Georgian, Slavonic, and modern languages. Readers from many Christian traditions came to know him as Isaac the Syrian, often without knowing the East Syriac setting from which he emerged. His wide reception is itself part of his life: a local monastic voice became a shared teacher of mercy.",
          sourceIndexes: [0, 1],
        },
      ],
    },
  ],
  "mar-qardagh": [
    {
      title: "A nobleman in a Sasanian world",
      paragraphs: [
        {
          text: "Qardagh’s Life places him in fourth-century Adiabene under Shapur II. He is portrayed as a high-born Zoroastrian and military governor whose encounter with the Christian teacher ʿAbdishoʿ begins a conversion that places status, family loyalty, and imperial expectation in conflict with baptismal allegiance.",
          sourceIndexes: [0, 1],
        },
      ],
    },
    {
      title: "Martyrdom as heroic narrative",
      paragraphs: [
        {
          text: "The story culminates in Qardagh’s refusal to abandon his new faith and his death by stoning. The surviving Syriac narrative is a crafted hagiography, not a contemporary court record: it reshapes an earlier Sasanian setting for later Christian audiences and presents the martyr with the courage and discipline of an idealised warrior.",
          sourceIndexes: [0, 1],
        },
      ],
    },
    {
      title: "A cult rooted near Arbela",
      paragraphs: [
        {
          text: "Qardagh’s cult remained especially connected with the country north of Arbela. Place, shrine, feast, and manuscript retelling kept the martyr’s name alive. His story is valuable not only for a possible fourth-century core, but also for what it reveals about Christian identity in the multilingual and religiously diverse world of late-antique Iraq.",
          sourceIndexes: [0, 1],
        },
      ],
    },
  ],
  "aphrahat-the-persian": [
    {
      title: "The Persian Sage",
      paragraphs: [
        {
          text: "Aphrahat wrote in the first half of the fourth century within the Sasanian Empire. Later tradition calls him the Persian Sage. Little secure narrative biography survives, but his twenty-three Demonstrations provide something more immediate than a later legend: the voice of a Syriac teacher addressing communities east of the Roman frontier.",
          sourceIndexes: [0, 1],
        },
      ],
    },
    {
      title: "Twenty-three demonstrations",
      paragraphs: [
        {
          text: "The Demonstrations treat faith, love, fasting, prayer, covenant, humility, pastoral life, and conflict. Most are arranged according to the Syriac alphabet, giving the collection a deliberate literary architecture. Their biblical language shows a Christian intellectual world formed deeply by Scripture and by patterns of interpretation shared with neighboring Jewish communities.",
          sourceIndexes: [0, 1],
        },
      ],
    },
    {
      title: "Writing under pressure",
      paragraphs: [
        {
          text: "Some Demonstrations reflect the growing danger faced by Christians during the reign of Shapur II and the political tension created by war with Rome. Aphrahat answers pressure with pastoral instruction rather than autobiography. His life is therefore best approached through the responsibilities his writings reveal: teaching, exhortation, correction, and care for a vulnerable Church.",
          sourceIndexes: [0, 1],
        },
      ],
    },
  ],
  "mar-awgin": [
    {
      title: "The Egyptian father in tradition",
      paragraphs: [
        {
          text: "The hagiographical tradition presents Awgin as an Egyptian ascetic who crossed into Mesopotamia with a company of disciples and established himself near Mount Izla. In this remembered life, the movement from Egypt links the famous desert tradition with the monasteries of the Syriac East.",
          sourceIndexes: [0, 1],
        },
      ],
    },
    {
      title: "A layered family of stories",
      paragraphs: [
        {
          text: "Awgin’s dossier is chronologically layered. Lists of disciples and foundations include figures from different periods, and some connections were formed by much later storytellers. The responsible reading is therefore not to force every name into a single fourth-century biography, but to recognise a tradition that gathered many monastic beginnings around one father.",
          sourceIndexes: [0],
        },
      ],
    },
    {
      title: "The monastery beneath Izla",
      paragraphs: [
        {
          text: "The monastery bearing Awgin’s name anchored his memory in a real landscape. Even when the earliest stages cannot be reconstructed in detail, the association of saint, mountain, disciples, and monastery explains why he became a symbol of Mesopotamian monastic origins and a point of continuity for later communities.",
          sourceIndexes: [0, 1],
        },
      ],
    },
  ],
  "mar-abraham-of-kashkar": [
    {
      title: "Formation and reform",
      paragraphs: [
        {
          text: "Abraham was born around the turn of the sixth century and was associated with the School of Nisibis before embracing an ascetic vocation. Tradition remembers journeys and encounters with other monastic cultures, but his historical importance is clearest in the disciplined community he formed on Mount Izla.",
          sourceIndexes: [0, 1],
        },
      ],
    },
    {
      title: "The Great Monastery",
      paragraphs: [
        {
          text: "As founder and abbot of the Great Monastery, Abraham helped renew communal monasticism in the Church of the East. Rules attributed to his circle ordered prayer, work, obedience, poverty, hospitality, and the authority of the superior. Reform meant giving a durable common shape to the desire for solitude.",
          sourceIndexes: [0, 1],
        },
      ],
    },
    {
      title: "Father of monks of the East",
      paragraphs: [
        {
          text: "Abraham’s disciples carried monastic foundations into northern Mesopotamia and beyond. Later tradition therefore called him the Father of the Monks of the Orient. The title describes a network more than an isolated hero: teachers formed disciples, disciples founded houses, and a mountain monastery became a source of institutional memory.",
          sourceIndexes: [0, 1],
        },
      ],
    },
  ],
  "rabban-bar-idta": [
    {
      title: "A disciple becomes a father",
      paragraphs: [
        {
          text: "Rabban Bar ʿIdta belonged to the generation formed by Abraham of Kashkar. Syriaca.org identifies him as Abraham’s disciple and a monastic leader. His remembered life shows how the reform of Mount Izla moved outward through people who received a rule of life and then adapted it to new places.",
          sourceIndexes: [0],
        },
      ],
    },
    {
      title: "A monastery in Marga",
      paragraphs: [
        {
          text: "Hagiographical tradition credits Bar ʿIdta with founding an important monastery in the region of Marga. It also remembers his sister Hana Isho as the founder of a monastery dedicated to St Febronia, a detail that opens a window onto women’s participation in the same wider landscape of patronage and religious foundation.",
          sourceIndexes: [0],
        },
      ],
    },
    {
      title: "Life preserved through monastic memory",
      paragraphs: [
        {
          text: "Dates for Bar ʿIdta’s death vary in the sources around the early seventh century. His importance does not rest on a perfectly recoverable chronology. It rests on the monastery, the disciples, and the literary memory through which later East Syriac communities understood the transmission of monastic authority.",
          sourceIndexes: [0, 1],
        },
      ],
    },
  ],
  "dadisho-qatraya": [
    {
      title: "A voice from Beth Qaṭraye",
      paragraphs: [
        {
          text: "Dadishoʿ flourished in the late seventh century and carried the name Qatraya, linking him to the Syriac Christian culture of Beth Qaṭraye in the Gulf. His career belongs to the same wider regional flowering that produced influential ascetical voices such as Isaac of Nineveh.",
          sourceIndexes: [0, 1],
        },
      ],
    },
    {
      title: "Reading the fathers as a living school",
      paragraphs: [
        {
          text: "His writings include interpretation of earlier monastic authorities, especially Abba Isaiah, and teaching on stillness, prayer, and solitary life. Commentary for Dadishoʿ was not merely explanation of an old text; it was a way of guiding a new reader through the practical and spiritual demands of the fathers.",
          sourceIndexes: [0, 1],
        },
      ],
    },
    {
      title: "The geography of Syriac asceticism",
      paragraphs: [
        {
          text: "Dadishoʿ helps correct the impression that Syriac monastic literature belonged only to the mountains of northern Mesopotamia. His name and works point toward the Gulf, while their manuscript transmission connects that region to monasteries and libraries across the Church of the East.",
          sourceIndexes: [0, 1],
        },
      ],
    },
  ],
  "sahdona": [
    {
      title: "Bishop, monk, and author",
      paragraphs: [
        {
          text: "Sahdona, also known as Martyrios, was an early seventh-century East Syriac monk, bishop, and spiritual author. The surviving record is shaped by both his ascetical teaching and the ecclesiastical controversy that later surrounded his name.",
          sourceIndexes: [0],
        },
      ],
    },
    {
      title: "The Book of Perfection",
      paragraphs: [
        {
          text: "His principal legacy is the Book of Perfection, a substantial guide to Christian and monastic life. It treats conversion, humility, prayer, love, communal responsibility, and the ascent toward maturity. The work preserves the pastoral breadth of a writer who could address the inner life without separating it from the obligations of community.",
          sourceIndexes: [0],
        },
      ],
    },
    {
      title: "A disputed ecclesial path",
      paragraphs: [
        {
          text: "Sahdona became involved in the Christological conflicts of his century and departed from the position defended by the Church of the East. His opponents condemned that change, yet his spiritual writings continued to be copied. The tension between rejected ecclesiastical allegiance and valued ascetical teaching is essential to an honest account of his reception.",
          sourceIndexes: [0],
        },
      ],
    },
  ],
  "rabban-hormizd": [
    {
      title: "Thirty-two years of formation",
      paragraphs: [
        {
          text: "The Syriac biographical record remembers Hormizd as a Persian monk who spent thirty-two years at the monastery of Rabban Bar ʿIdta. That long apprenticeship places his later foundation within a chain of formation: the celebrated hermit first appears as a disciple shaped by an established community.",
          sourceIndexes: [0, 1],
        },
      ],
    },
    {
      title: "The mountain above Alqosh",
      paragraphs: [
        {
          text: "Hormizd eventually left with other monks and founded the monastery north of Alqosh that bears his name. His Life fills the mountain with ascetic struggle and miracles. Those episodes belong to hagiography, while the enduring monastery gives the tradition a powerful historical and geographical centre.",
          sourceIndexes: [0, 1],
        },
      ],
    },
    {
      title: "A monastery that carried centuries",
      paragraphs: [
        {
          text: "The monastery of Rabban Hormizd became one of the most important Christian sites of northern Iraq. Its cells, church, tombs, manuscripts, and later patriarchal associations carried the saint’s memory far beyond the uncertain details of a seventh-century chronology. The place became part of the biography.",
          sourceIndexes: [0, 1],
        },
      ],
    },
  ],
  "mar-george-of-izla": [
    {
      title: "Mihrangushnasp becomes George",
      paragraphs: [
        {
          text: "George’s pre-baptismal name was Mihrangushnasp. The Syriac tradition remembers him as a Zoroastrian convert who became a monk and priest connected with Mount Izla. His new name and vocation expressed a break with the religious obligations expected of him in the Sasanian world.",
          sourceIndexes: [0],
        },
      ],
    },
    {
      title: "Conflict and execution",
      paragraphs: [
        {
          text: "The record connects George with debates against Miaphysite Christians and with opposition to Gabriel of Sinjar. Gabriel is said to have denounced him to Khosrow II for abandoning Zoroastrianism. George was executed in 615, making conversion, doctrinal conflict, and imperial law inseparable in his remembered martyrdom.",
          sourceIndexes: [0],
        },
      ],
    },
    {
      title: "Babai as biographer",
      paragraphs: [
        {
          text: "George’s Life is associated with Babai the Great. It is therefore both a martyr story and a theological portrait crafted for a late-Sasanian audience. Reading it well means attending to the person it commemorates and to the doctrinal and communal purposes for which Babai shaped the narrative.",
          sourceIndexes: [0],
        },
      ],
    },
  ],
  "ishoyahb-iii": [
    {
      title: "From Adiabene to the patriarchate",
      paragraphs: [
        {
          text: "Ishoʿyahb came from Adiabene and rose through episcopal leadership before serving as patriarch from 649 to 659. His ministry unfolded during the transition from late Sasanian rule into the first decades of Islamic government, when bishops and monasteries had to negotiate new political conditions.",
          sourceIndexes: [0],
        },
      ],
    },
    {
      title: "Letters across a wide Church",
      paragraphs: [
        {
          text: "His surviving correspondence reveals a Church linked across northern Mesopotamia, Persia, and the Gulf. The letters address bishops, monks, discipline, disputed authority, and communities under pressure. Their immediacy makes Ishoʿyahb one of the clearest guides to the relationships and anxieties of the seventh-century Church of the East.",
          sourceIndexes: [0],
        },
      ],
    },
    {
      title: "Liturgy and institutional memory",
      paragraphs: [
        {
          text: "Later memory also associates Ishoʿyahb with liturgical organisation and reform. Whether approached through letters, ecclesiastical office, or worship, his life shows a leader working to preserve communion across great distance. His legacy is not a single dramatic episode but the difficult craft of holding a dispersed Church together.",
          sourceIndexes: [0],
        },
      ],
    },
  ],
};

export function findSaintBiography(slug: string) {
  return biographies[slug] ?? [];
}
