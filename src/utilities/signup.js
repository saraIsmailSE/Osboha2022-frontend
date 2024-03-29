export const STEPS = [{
    headerText: "تالياً سأشرح لك الأمور الأساسية التي يوفرها المشروع وستكتشف البقية بعد انضمامك",
    image: `character_2.png`,
    // description: `تالياً سأشرح لك الأمور الأساسية التي يوفرها المشروع وستكتشف البقية بعد انضمامك`,
    type: "info",
},
{
    headerText: `تبدأ مهمة السفير الأسبوعية يوم الاحد وتنتهي السبت لتكون علامته الكاملة هي 100% `,
    image: "character_4.png",
    description: `لا تعتمد قراءتك على أكبر عدد من الصفحات إنما عن استمراريتك بالتعلم، وقد قمنا بتجهيز قائد لك تم تدريبه لمتابعتك وتشجيعك وهناك أنشطة وتكريمات`,
    type: "info",
},
{
    headerText: `كيف تنال علامة القراءة الكاملة ؟`,
    image: "character_5.png",
    description: `بكل بساطة تقرأ 30 صفحة أسبوعياً بإمكانك قراءتها كاملة خلال يوم واحد أو تقوم بتقسيمها على أيام الأسبوع `,
    type: "info",
},
{
    headerText: `ســـؤال`,
    image: "question_character.png",
    description: `هل تتذكر عدد الصفحات الأسبوعية التي عليك قراءتها للحصول على العلامة الكاملة في القراءة؟`,
    type: "question",
    options: [{
            text: "اختر عدد الصفحات",
            value: "",
        },
        {
            text: "ثلاثون صفحة اسبوعياً",
            value: 30,
        },
        {
            text: "خمسون صفحة اسبوعياً",
            value: 50
        },
        {
            text: "ستون صفحة اسبوعياً",
            value: 60
        },
    ],
    message_false: {
        title: "هل أنت متأكد؟",
        text: " إجابتك غير صحيحة، حاول مرةً أخرى",
        imageUrl: "wrong.png",
    },
    message_true: {
        title: "أحسنت",
        text: " الآن صرت تعرف كيف تحصل على علامة (100/100)  في قراءتك الأسبوعية، وتذكر  بإمكانك دوما قراءة ما يناسبك",
        imageUrl: "right.png",
    },
},
{
    headerText: `ســـؤال`,
    image: "question_character.png",
    description: `أخبرتك سابقاً بشأن تقسيم القراءة خلال الأسبوع، فهل ستقوم بقراءة الـ (30) صفحة على دفعة واحدة في يوم واحد أم تفضل تقسيمها حسب أوقات فراغك خلال الأسبوع؟`,
    type: "question",
    options: [{
            text: "كيف ستُنظم قرائتك ",
            value: ""
        },
        {
            text: "قرائتها على دفعة واحدة",
            value: 1
        },
        {
            text: "تقسيمها",
            value: 2
        },
    ],
    message_true: {
        title: "أحسنت",
        text: "--",
        imageUrl: "right.png",
    },
},
{
    headerText: `يأتي الآن السؤال الأهم كيف تستفيد من قراءتك؟`,
    image: "character_3.png",
    description: `يكون هذا بثلاثة أنواع`,
    type: "info",
    extra: [{
            text: `تعبير عن رأيك فيما قرأت (أطروحة)`,
            image: `creative.png`,
        },
        {
            text: `كتابة اقتباس أعجبك من الكتاب`,
            image: `quotes.png`,
        },
        {
            text: `سكرين شوت لاقتباسات أثارت اهتمامك`,
            image: `screenshot.png`,
        },
    ],
},
{
    headerText: `ســـؤال`,
    image: "question_character.png",
    description: `كيف تفضل كتابة ما استفدته من قراءتك؟`,
    type: "question",
    options: [
        {text:"كيف تفضل كتابة ما استفدته من قراءتك؟",
    value:''},
        {text: "أن تكتب رأيك الشخصي فيما قرأت (أطروحة) ",
    value:'thesis'},
        {text:"أن تكتب اقتباس أعجبك مما قرأت (اقتباس)", value:'qoute'},
        {text:"أن تقوم بعمل سكرين شوت للاقتباسات التي أعجبتك (سكرين شوت)",value:'screenshot'},
    ],
    message_true: {
        title: "أحسنت",
        text: "--",
        imageUrl: "right.png",
    },
},
{
    headerText: `تبقى أن أخبرك عن الكتب داخل المشروع`,
    image: "character_6.png",
    description: `حيث أننا نمتلك مكتبة ضخمة تتجدد أسبوعيًا تحتوي على أكثر من 400 كتاب من 15 فئة مختلفة`,
    type: "info",
},
{
    headerText: `أي الفئات التالية ترغب البدء بها`,
    image: "question_character.png",
    description: ``,
    type: "info",
    extra: [{
            text: `الفئة الاجتماعية`,
            image: `book_1.png`,
        },
        {
            text: `الفئة الأدبية`,
            image: `book_2.png`,
        },
        {
            text: `الفئة الاقتصادية`,
            image: `book_3.png`,
        },
    ],
    message_true: {
        title: "أحسنت",
        text: "اختيار موفق",
        imageUrl: "right.png",
    },
},
// {
//     headerText: `في مشروعنا هناك العديد من الفعاليات والدورات الغير المنهجية منها التصميم والانفوجرافيك والنقاشات الفكرية، المشاركة بها اختيارية ، أيها ستحب أن تجرب أولاً؟`,
//     image: "character_7.png",
//     description: ``,
//     type: "info",
//     extra: [{
//             text: `كتابة المقالات`,
//             image: `writing.png`,
//         },
//         {
//             text: `النقاش المنهجي`,
//             image: `discussion.png`,
//         },
//         {
//             text: `التثقيف بالفيديو (ورش تعليمية)`,
//             image: `video.png`,
//         },
//         {
//             text: `الانفوجرافيك والتصميم`,
//             image: `graphic_design.png`,
//         },
//     ],
//     message_true: {
//         title: "اختيار موفق",
//         text: " يُمكنك سؤال قائدك عنها فور انضمامك",
//         imageUrl: "right.png",
//     },
// },
];