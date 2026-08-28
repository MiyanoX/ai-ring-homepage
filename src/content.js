const HERO_IMAGE = {
  src: "/assets/elara/hero-hands-v2.jpg",
  position: "68% 46%",
};

const STATEMENT_IMAGE = {
  src: "/assets/elara/editorial-hands-v2.jpg",
  position: "50% 45%",
};

const RITUAL_IMAGES = [
  {
    src: "/assets/elara/ritual-sleep-hands-v2.jpg",
    position: "50% 48%",
  },
  {
    src: "/assets/elara/ritual-energy-hands-v2.jpg",
    position: "50% 45%",
  },
  {
    src: "/assets/elara/ritual-calm-hands-v2.jpg",
    position: "50% 42%",
  },
];

const INSIGHT_IMAGE = {
  src: "/assets/elara/daily-insight-device.jpg",
  position: "48% 50%",
};

const FINISHES_IMAGE = {
  src: "/assets/elara/ring-finishes.jpg",
  position: "50% 50%",
};

const TECHNOLOGY_IMAGE = {
  src: "/assets/elara/technology-hands.jpg",
  position: "68% 50%",
};

const TRUST_IMAGE = {
  src: "/assets/elara/trust-prototype-hands.jpg",
  position: "58% 50%",
};

const GIFT_IMAGE = {
  src: "/assets/elara/gift-nfc-hands.jpg",
  position: "60% 50%",
};

const P1_HERO_IMAGE = HERO_IMAGE;
const P1_PROOF_IMAGE = {
  src: "/assets/elara/p1-finishes.png",
  position: "50% 54%",
};
const P1_HEALTH_IMAGE = INSIGHT_IMAGE;
const P1_EDITION_IMAGE = {
  src: "/assets/elara/p1-engraving-macro.png",
  position: "50% 54%",
};
const P1_RISK_IMAGE = {
  src: "/assets/elara/p1-sizing-kit.png",
  position: "64% 52%",
};

const NAV_HREFS = ["#rituals", "#insight", "#finishes"];
const RITUAL_INDEXES = ["01", "02", "03"];

function withImage(image, alt) {
  return {
    src: image.src,
    position: image.position,
    alt,
  };
}

export const pageContentByLocale = {
  en: {
    seo: {
      htmlLang: "en",
      hreflang: "en",
      title: "ELARA One | Know your rhythm.",
      description:
        "A quiet smart ring concept for understanding sleep, energy, and the rhythm of everyday life.",
    },
    ui: {
      skipToContent: "Skip to main content",
      homeAriaLabel: "ELARA home",
      primaryNavLabel: "Primary navigation",
      previewAriaLabel: "Private preview",
      languageLabel: "Language",
      localeOptions: {
        en: {
          label: "English",
          shortLabel: "EN",
          ariaLabel: "Switch to English",
        },
        zh: {
          label: "中文",
          shortLabel: "中",
          ariaLabel: "Switch to Chinese",
        },
        ja: {
          label: "日本語",
          shortLabel: "日",
          ariaLabel: "Switch to Japanese",
        },
      },
      headerPreviewAction: "Reserve preview",
      previewSuccessLabel: "Local preview ready",
      localPreviewNote: "Local preview only. This form does not send or save your email.",
    },
    nav: [
      { label: "Rituals", href: NAV_HREFS[0] },
      { label: "Daily insight", href: NAV_HREFS[1] },
      { label: "Finishes", href: NAV_HREFS[2] },
    ],
    hero: {
      eyebrow: "ELARA One",
      title: "Know your rhythm.",
      englishTitle: "A quiet way to understand your day.",
      description:
        "A quiet smart ring concept for understanding sleep, energy, and moments of strain without asking for another screen.",
      primaryAction: "Reserve a private preview",
      secondaryAction: "Explore ELARA One",
      image: withImage(
        HERO_IMAGE,
        "A hand wearing the champagne-gold ELARA One ring and brushing a linen sleeve in morning light",
      ),
    },
    statement: {
      eyebrow: "A quiet ritual",
      title: "Make a little room to hear yourself.",
      body:
        "You take care of many things each day. ELARA One notices the subtle shifts that are easy to miss and turns complex signals into a gentler, clearer sense of self.",
      image: withImage(
        STATEMENT_IMAGE,
        "Two hands wearing ELARA One resting quietly together on a stone table in the morning light",
      ),
    },
    rituals: {
      eyebrow: "From night to day",
      title: "A daily rhythm begins with understanding yourself.",
      items: [
        {
          index: RITUAL_INDEXES[0],
          title: "Sleep",
          englishTitle: "Rest",
          copy: "Understand your rest first, then decide how you want to begin the day.",
          image: withImage(
            RITUAL_IMAGES[0],
            "A hand wearing ELARA One resting lightly on soft linen bedding",
          ),
        },
        {
          index: RITUAL_INDEXES[1],
          title: "Energy",
          englishTitle: "Focus",
          copy: "See the shape of your energy so your attention can stay with what matters.",
          image: withImage(
            RITUAL_IMAGES[1],
            "A hand wearing ELARA One holding a neutral cup in the city morning light",
          ),
        },
        {
          index: RITUAL_INDEXES[2],
          title: "Calm",
          englishTitle: "Ease",
          copy: "Notice the cadence of pressure and leave yourself more room when you need it.",
          image: withImage(
            RITUAL_IMAGES[2],
            "Two hands wearing ELARA One gently holding a ceramic cup by the window",
          ),
        },
      ],
    },
    insight: {
      eyebrow: "Your daily insight",
      title: "One insight.\nOnce a day.",
      body:
        "ELARA gathers patterns from sleep, activity, and body rhythm into one gentle, actionable line. Not more data, just what matters today.",
      sampleLabel: "Today's note",
      sample:
        "Your body is looking for a steadier pace. Keep the most important thing for the hours when your energy feels clearest.",
      image: withImage(
        INSIGHT_IMAGE,
        "An ELARA app concept interface showing a daily rhythm insight on a stone surface",
      ),
    },
    finishes: {
      eyebrow: "ELARA Atelier",
      title: "Made to be worn every day.",
      body:
        "A restrained silhouette, a skin-kind inner curve, and jewelry-grade metal tones let the technology step behind the feeling. Concept finishes and final specifications are still in design.",
      options: [
        {
          name: "Champagne Gold",
          englishName: "Soft gold finish",
        },
        {
          name: "Moon Silver",
          englishName: "Cool silver finish",
        },
        {
          name: "Deep Plum",
          englishName: "Muted plum finish",
        },
      ],
      image: withImage(
        FINISHES_IMAGE,
        "Three ELARA One concept finishes in champagne gold, moon silver, and deep plum",
      ),
    },
    preview: {
      eyebrow: "Private preview",
      title: "Be among the first to try it",
      body:
        "Leave your email to step through this concept preview flow. This form does not send or save your email data.",
      inputLabel: "Email address",
      inputPlaceholder: "name@example.com",
      submitLabel: "Reserve a private preview",
      submittingLabel: "Preparing preview…",
      resetLabel: "Use a different email",
      emptyEmailError: "Please enter your email address.",
      invalidEmailError: "Please enter a valid email address.",
      confirmationMessage:
        "Saved in this local preview only. If ELARA opens a real preview later, we will ask you to confirm again once a live service exists.",
    },
    footer: {
      note:
        "ELARA One is a concept product, not a medical device. This page is for brand and product design presentation only.",
      legal: "Concept study · Tokyo · 2026",
    },
  },
  zh: {
    seo: {
      htmlLang: "zh-CN",
      hreflang: "zh-CN",
      title: "ELARA One｜听见自己的节律",
      description:
        "ELARA One 智能指环概念体验：以安静的方式理解睡眠、能量与日常节律。",
    },
    ui: {
      skipToContent: "跳到主要内容",
      homeAriaLabel: "ELARA 首页",
      primaryNavLabel: "主要导航",
      previewAriaLabel: "私享预览",
      languageLabel: "语言",
      localeOptions: {
        en: {
          label: "English",
          shortLabel: "EN",
          ariaLabel: "切换到英文",
        },
        zh: {
          label: "中文",
          shortLabel: "中",
          ariaLabel: "切换到中文",
        },
        ja: {
          label: "日本語",
          shortLabel: "日",
          ariaLabel: "切换到日语",
        },
      },
      headerPreviewAction: "预约体验",
      previewSuccessLabel: "本地预览已准备好",
      localPreviewNote: "仅限本地预览 · 这个表单不会发送或保存你的邮箱。",
    },
    nav: [
      { label: "感知节律", href: NAV_HREFS[0] },
      { label: "每日洞察", href: NAV_HREFS[1] },
      { label: "材质", href: NAV_HREFS[2] },
    ],
    hero: {
      eyebrow: "ELARA One",
      title: "听见自己的节律",
      englishTitle: "睡眠、能量、平静",
      description:
        "一枚安静的智能指环概念，帮助你理解睡眠、能量与压力节奏，不用再多一块屏幕。",
      primaryAction: "预约私享体验",
      secondaryAction: "探索 ELARA One",
      image: withImage(
        HERO_IMAGE,
        "晨光中佩戴香槟金 ELARA One 指环并轻触亚麻衣袖的手",
      ),
    },
    statement: {
      eyebrow: "安静的仪式",
      title: "给自己一点，听见自己的空间。",
      body:
        "你每天都在照顾很多事。ELARA One 留意那些容易被忽略的细微变化，把复杂信号收束成更温柔、更清楚的自我理解。",
      image: withImage(
        STATEMENT_IMAGE,
        "佩戴 ELARA One 的双手在晨光石材桌面上安静交叠",
      ),
    },
    rituals: {
      eyebrow: "从夜到日",
      title: "一天的节律，始于对自己的理解。",
      items: [
        {
          index: RITUAL_INDEXES[0],
          title: "睡眠",
          englishTitle: "休息",
          copy: "先理解休息，再决定今天如何出发。",
          image: withImage(
            RITUAL_IMAGES[0],
            "佩戴 ELARA One 的手轻放在柔软亚麻寝具上",
          ),
        },
        {
          index: RITUAL_INDEXES[1],
          title: "能量",
          englishTitle: "专注",
          copy: "看见自己的能量曲线，把专注留给重要的事。",
          image: withImage(
            RITUAL_IMAGES[1],
            "佩戴 ELARA One 的手在城市晨光中握着素色杯子",
          ),
        },
        {
          index: RITUAL_INDEXES[2],
          title: "平静",
          englishTitle: "从容",
          copy: "察觉压力的节奏，在需要时为自己留一点余地。",
          image: withImage(
            RITUAL_IMAGES[2],
            "佩戴 ELARA One 的双手在窗边轻握陶瓷杯",
          ),
        },
      ],
    },
    insight: {
      eyebrow: "每日洞察",
      title: "一个洞察。\n一天一次。",
      body:
        "ELARA 将睡眠、活动和身体节律的趋势，收束成一句温和、可行动的提示。不是更多数据，只是今天真正需要知道的事。",
      sampleLabel: "今日提示",
      sample:
        "你的身体正在寻找更从容的节奏。把最重要的一件事，留在精力最好的时段。",
      image: withImage(
        INSIGHT_IMAGE,
        "在石材台面展示每日节律洞察的 ELARA 应用概念界面",
      ),
    },
    finishes: {
      eyebrow: "ELARA 工坊",
      title: "为每天佩戴而生。",
      body:
        "克制的轮廓、亲肤的内圈与珠宝级金属质感，让科技退到触感之后。概念材质与最终规格仍在设计中。",
      options: [
        {
          name: "香槟金",
          englishName: "暖调金色",
        },
        {
          name: "月光银",
          englishName: "冷调银色",
        },
        {
          name: "深梅紫",
          englishName: "柔和梅紫",
        },
      ],
      image: withImage(
        FINISHES_IMAGE,
        "香槟金、月光银与深梅紫三种 ELARA One 概念材质",
      ),
    },
    preview: {
      eyebrow: "私享预览",
      title: "成为第一批体验者",
      body:
        "留下邮箱，体验这套概念预约流程。当前表单不会向服务器发送或保存任何邮箱数据。",
      inputLabel: "邮箱地址",
      inputPlaceholder: "name@example.com",
      submitLabel: "预约私享体验",
      submittingLabel: "生成预览中…",
      resetLabel: "使用其他邮箱",
      emptyEmailError: "请输入邮箱地址。",
      invalidEmailError: "请输入有效的邮箱地址。",
      confirmationMessage:
        "已记录在当前本地预览中。ELARA 正式开放体验时，我们会在接入真实服务后再邀请你确认。",
    },
    footer: {
      note:
        "ELARA One 为概念产品，不是医疗设备。本页内容仅用于品牌与产品设计展示。",
      legal: "概念研究 · 东京 · 2026",
    },
    landing: {
      nav: [
        { label: "设计", href: "#design" },
        { label: "科技之美", href: "#technology" },
        { label: "每日知道", href: "#daily" },
        { label: "为什么相信", href: "#trust" },
        { label: "购买", href: "#buy" },
      ],
      hero: {
        eyebrow: "ELARA One · 智能戒指概念",
        title: "一枚属于你的智能戒指。",
        englishTitle: "It starts as a ring.",
        description:
          "先是一枚好看的戒指。然后，它在你不必分心的时候，安静地为你留意身体与生活的节律。",
        primaryAction: "预约私享体验",
        secondaryAction: "先看看它如何融入生活",
        ownershipLine: "为日常而设计 · 概念体验",
        image: withImage(
          HERO_IMAGE,
          "都市女性佩戴香槟金 ELARA One 戒指、手指轻触亚麻衣袖的近景",
        ),
      },
      design: {
        eyebrow: "01 / 设计",
        title: "它首先是一枚戒指。",
        body:
          "素圈与轻设计，两条可以融入日常的线。6 mm 的目标宽度、US 6+ 的尺寸范围与钛合金内圈，让它从通勤到晚餐都不必换一种生活方式。",
        productLines: [
          {
            id: "standard",
            label: "Standard",
            name: "素圈",
            copy: "安静、克制，像你一直在戴的那一枚。",
          },
          {
            id: "design",
            label: "Design",
            name: "设计款",
            copy: "多一点轮廓感，让戒指成为造型的一部分。",
          },
        ],
        specs: [
          { label: "目标宽度", value: "6 mm" },
          { label: "适配尺寸", value: "US 6+" },
          { label: "内圈材质", value: "钛合金" },
          { label: "佩戴方式", value: "日常穿搭不违和" },
        ],
        finishOptions: [
          { id: "champagne", name: "香槟金", englishName: "Champagne" },
          { id: "silver", name: "月光银", englishName: "Moon Silver" },
          { id: "plum", name: "深梅紫", englishName: "Deep Plum" },
        ],
        price: "¥59,500 起",
        priceNote: "概念参考售价",
        image: withImage(
          FINISHES_IMAGE,
          "香槟金、月光银与深梅紫三种 ELARA One 戒指材质并列展示",
        ),
      },
      technology: {
        eyebrow: "02 / 科技之美",
        title: "真正先进的科技，不需要你适应它。它只负责适应你。",
        body:
          "单组三色光 PPG、振动马达与必要的感知能力，被藏进 6 mm 的日常戒指里。你不需要学习一套新的生活方式，好的技术会安静地来到你的生活里。",
        ringLabel: "6 mm 内部",
        ringNote: "传感与佩戴感，被收进一枚日常戒指。",
        capabilities: [
          {
            index: "01",
            label: "感知",
            title: "单组三色光 PPG",
            copy: "以克制的光学结构，持续理解身体节律的变化。",
          },
          {
            index: "02",
            label: "回应",
            title: "振动马达",
            copy: "需要提醒时轻轻回应，而不是把你拉回另一块屏幕。",
          },
          {
            index: "03",
            label: "藏入",
            title: "6 mm 的容纳",
            copy: "把复杂留在内部，把自然的佩戴感留给你。",
          },
        ],
        image: withImage(
          TECHNOLOGY_IMAGE,
          "深梅紫光线中的手部近景，香槟金 ELARA One 戒指与内侧感知细节清晰可见",
        ),
      },
      daily: {
        eyebrow: "03 / 它每天为我知道什么",
        title: "它替你留意那些，你自己没空留意的变化。",
        body:
          "不是把更多指标堆到你面前，而是在 App 里把压力、身体周期、活动与睡眠，整理成你今天真正用得上的理解。",
        noteLabel: "今日的一句话",
        note:
          "今天适合把重要的事，放在精力最清楚的那一段时间里。其余的，留一点余地。",
        items: [
          {
            label: "压力",
            question: "我现在是不是比自己以为的更紧绷？",
            copy: "看见压力节奏，给自己一个及时停下来的理由。",
          },
          {
            label: "月经 / 身体周期",
            question: "身体正在经历怎样的阶段？",
            copy: "把周期放回自己的生活语境里，不用用别人的节奏衡量自己。",
          },
          {
            label: "活动",
            question: "今天的身体，已经走了多远？",
            copy: "理解活动量与能量之间的关系，而不是追逐一个数字。",
          },
          {
            label: "睡眠",
            question: "昨晚的休息，真的够了吗？",
            copy: "从休息开始认识今天，再决定要把力气放在哪里。",
          },
        ],
        image: withImage(
          INSIGHT_IMAGE,
          "石材台面上的 ELARA 应用概念界面，以克制的方式呈现每日节律洞察",
        ),
      },
      trust: {
        eyebrow: "04 / 为什么值得相信",
        title: "让具体的人出现，讲她为什么参与。",
        body:
          "一枚真正要陪你生活的戒指，不能只靠漂亮的渲染图。我们让女性健康体验、技术与验证工作分别被看见，也把仍在确认中的边界说清楚。",
        cards: [
          {
            index: "01",
            label: "女性健康体验设计",
            title: "东京大学女性科研人员参与其中",
            copy: "参与女性健康体验与产品设计讨论，帮助我们从真实生活而不是抽象指标出发。",
          },
          {
            index: "02",
            label: "技术团队",
            title: "让复杂的工程退到佩戴感之后",
            copy: "围绕光学感知、低功耗与小型化结构，把技术约束转化为日常体验。",
          },
          {
            index: "03",
            label: "验证方法",
            title: "从真实样机开始验证",
            copy: "通过样机、佩戴反馈与迭代记录，逐步确认体验与最终规格。",
          },
        ],
        disclosure:
          "姓名、具体资历、验证数据与量产规格将在完成披露与验证后公开。当前页面展示的是概念阶段的产品方向。",
        image: withImage(
          TRUST_IMAGE,
          "双手在桌面上整理 ELARA One 戒指样机、卡尺与设计记录本的验证现场",
        ),
      },
      purchase: {
        eyebrow: "05 / 购买",
        title: "选一枚，成为你的日常。",
        body:
          "从 Standard 素圈或 Design 设计款开始，选择更像你的颜色。刻字与 Gift 路径，也都为重要的人留出位置。",
        lineLabel: "款式",
        finishLabel: "颜色",
        engravingLabel: "刻字（可选）",
        engravingPlaceholder: "留一句只属于你的话",
        engravingHint: "最多 18 个字符 · 概念预览",
        price: "¥59,500 起",
        priceNote: "概念参考售价",
        submitLabel: "预约体验",
        giftLabel: "打开 Gift 路径",
      },
      gift: {
        eyebrow: "Gift / 送给她",
        title: "把一句心意，放进她每天都会戴的东西里。",
        body:
          "Gift 不是另一种包装，而是一条完整的送礼路径：选好戒指，写下心意，把 NFC 心意卡放进盒中，让她在打开时遇见这句话。",
        nfcTitle: "NFC 心意卡，让礼物继续说话。",
        nfcBody:
          "收礼人轻触卡片，即可打开你为她准备的文字与体验入口。当前为概念路径，实际 NFC 内容与服务将在产品确认后接入。",
        steps: ["选择款式与颜色", "写下刻字或心意", "放入 NFC 心意卡", "交给重要的她"],
        openLabel: "查看完整送礼路径",
        closeLabel: "收起 Gift 路径",
        previewLabel: "预览心意卡",
        note: "Gift、NFC 与刻字流程目前均为本地概念预览，不会创建真实订单。",
        image: withImage(
          GIFT_IMAGE,
          "双手把 ELARA One 戒指与 NFC 心意卡放入象牙色礼盒的送礼场景",
        ),
      },
    },
  },
  ja: {
    seo: {
      htmlLang: "ja",
      hreflang: "ja",
      title: "ELARA One｜自分のリズムに耳を澄ます",
      description:
        "睡眠、エネルギー、日々のリズムを静かに理解する、ELARA One スマートリングのコンセプト体験。",
    },
    ui: {
      skipToContent: "メインコンテンツへ移動",
      homeAriaLabel: "ELARA ホーム",
      primaryNavLabel: "主要ナビゲーション",
      previewAriaLabel: "プライベートプレビュー",
      languageLabel: "言語",
      localeOptions: {
        en: {
          label: "English",
          shortLabel: "EN",
          ariaLabel: "英語に切り替える",
        },
        zh: {
          label: "中文",
          shortLabel: "中",
          ariaLabel: "中国語に切り替える",
        },
        ja: {
          label: "日本語",
          shortLabel: "日",
          ariaLabel: "日本語に切り替える",
        },
      },
      headerPreviewAction: "プレビューを予約する",
      previewSuccessLabel: "ローカルプレビューの準備ができました",
      localPreviewNote:
        "ローカルプレビュー専用です。このフォームはメールアドレスを送信も保存もしません。",
    },
    nav: [
      { label: "リチュアル", href: NAV_HREFS[0] },
      { label: "今日のインサイト", href: NAV_HREFS[1] },
      { label: "仕上げ", href: NAV_HREFS[2] },
    ],
    hero: {
      eyebrow: "ELARA One",
      title: "自分のリズムに耳を澄ます",
      englishTitle: "眠り、エネルギー、静けさを知る",
      description:
        "睡眠やエネルギー、緊張の波を静かに理解するためのスマートリングコンセプトです。もうひとつ画面を増やす必要はありません。",
      primaryAction: "プライベートプレビューを予約する",
      secondaryAction: "ELARA One を見る",
      image: withImage(
        HERO_IMAGE,
        "朝の光の中でシャンパンゴールドの ELARA One を着け、リネンの袖に触れる手",
      ),
    },
    statement: {
      eyebrow: "静かなリチュアル",
      title: "自分の声を聴く余白を、少しだけ。",
      body:
        "毎日のなかで、あなたはたくさんのことに気を配っています。ELARA One は見落としやすい微かな変化にそっと気づき、複雑なサインをやわらかく、わかりやすい自己理解へ整えます。",
      image: withImage(
        STATEMENT_IMAGE,
        "朝の光が差す石のテーブルで、ELARA One を着けた両手が静かに重なる様子",
      ),
    },
    rituals: {
      eyebrow: "夜から朝へ",
      title: "一日のリズムは、自分を知ることから始まる。",
      items: [
        {
          index: RITUAL_INDEXES[0],
          title: "睡眠",
          englishTitle: "休息",
          copy: "まずは休まり方を知ることから。そこから今日の始め方を選べます。",
          image: withImage(
            RITUAL_IMAGES[0],
            "ELARA One を着けた手が、やわらかなリネンの寝具にそっと置かれている",
          ),
        },
        {
          index: RITUAL_INDEXES[1],
          title: "エネルギー",
          englishTitle: "集中",
          copy: "自分のエネルギーの波を知れば、大切なことに意識を向けやすくなります。",
          image: withImage(
            RITUAL_IMAGES[1],
            "街の朝の光のなかで、ELARA One を着けた手が落ち着いた色のカップを持つ様子",
          ),
        },
        {
          index: RITUAL_INDEXES[2],
          title: "静けさ",
          englishTitle: "余白",
          copy: "プレッシャーのリズムに気づき、必要なときに自分のための余白を残します。",
          image: withImage(
            RITUAL_IMAGES[2],
            "窓辺で ELARA One を着けた両手が陶器のカップをやさしく包む様子",
          ),
        },
      ],
    },
    insight: {
      eyebrow: "今日のインサイト",
      title: "ひとつの気づき。\n一日に一度。",
      body:
        "ELARA は睡眠、活動、身体のリズムの流れを、やさしく行動に移せるひとことへ整えます。データを増やすのではなく、今日ほんとうに必要なことだけを届けます。",
      sampleLabel: "今日のメモ",
      sample:
        "あなたの身体は、もう少しゆとりのあるペースを求めています。いちばん大切なことは、エネルギーが澄んでいる時間に置いてみてください。",
      image: withImage(
        INSIGHT_IMAGE,
        "石の天板の上で、毎日のリズムのインサイトを表示する ELARA アプリのコンセプト画面",
      ),
    },
    finishes: {
      eyebrow: "ELARA アトリエ",
      title: "毎日、身につけたくなるために。",
      body:
        "抑えた輪郭、肌あたりのよい内側のカーブ、そしてジュエリーのような金属の質感。テクノロジーは触れた感覚の奥へ静かに退きます。コンセプト仕上げと最終仕様は、まだデザイン中です。",
      options: [
        {
          name: "シャンパンゴールド",
          englishName: "やわらかな金色",
        },
        {
          name: "ムーンシルバー",
          englishName: "澄んだ銀色",
        },
        {
          name: "ディーププラム",
          englishName: "落ち着いた梅紫",
        },
      ],
      image: withImage(
        FINISHES_IMAGE,
        "シャンパンゴールド、ムーンシルバー、ディーププラムの 3 種類の ELARA One コンセプト仕上げ",
      ),
    },
    preview: {
      eyebrow: "プライベートプレビュー",
      title: "いち早く体験する",
      body:
        "メールアドレスを入力して、このコンセプト予約フローを試してください。このフォームはメールアドレスを送信も保存もしません。",
      inputLabel: "メールアドレス",
      inputPlaceholder: "name@example.com",
      submitLabel: "プライベートプレビューを予約する",
      submittingLabel: "プレビューを準備中…",
      resetLabel: "別のメールアドレスを使う",
      emptyEmailError: "メールアドレスを入力してください。",
      invalidEmailError: "有効なメールアドレスを入力してください。",
      confirmationMessage:
        "このローカルプレビュー内でのみ記録されました。ELARA の正式な体験案内が始まったら、実際のサービス接続後にあらためて確認をご案内します。",
    },
    footer: {
      note:
        "ELARA One はコンセプト製品であり、医療機器ではありません。このページはブランドと製品デザインの紹介のみを目的としています。",
      legal: "コンセプトスタディ · 東京 · 2026",
    },
    p1: {
      nav: [
        { label: "商品について", href: "#proof" },
        { label: "静かなテクノロジー", href: "#health" },
        { label: "First Edition", href: "#edition" },
        { label: "仕上げ", href: "#finishes" },
        { label: "予約", href: "#purchase" },
      ],
      hero: {
        eyebrow: "ELARA One · P1 Base Ring",
        title: "毎日に似合う、静かなスマートリング。",
        englishTitle: "It starts with a ring.",
        description:
          "まずは、毎日つけたい一枚。細身のシルエットと落ち着いた仕上げの内側に、あなたの一日をそっと見つめるための技術を収めました。",
        width: "6.0 mm",
        innerRing: "チタン内リング",
        edition: "First Edition｜無料刻印",
        price: "¥34,800（税込）",
        priceNote: "P1 コンセプト価格 · 5色 / US 5–12",
        primaryAction: "予約する",
        secondaryAction: "商品を見る",
        localOnlyNote:
          "現在はコンセプト予約フローのプレビューです。実際の注文や決済は作成されません。",
        image: withImage(
          P1_HERO_IMAGE,
          "朝の光のなかでシャンパンゴールドの ELARA One を着けた手元",
        ),
      },
      proof: {
        eyebrow: "01 / 商品の証明",
        title: "6 mm とチタン内リングを、数字だけで終わらせない。",
        body:
          "指にのせたときの細さ、内側の素材、表面の光。毎日つけるものだからこそ、スペックを触れられる印象へ置き換えて伝えます。",
        items: [
          {
            label: "PROPORTION",
            title: "6.0 mm の幅",
            copy: "手持ちのジュエリーと並べても、日常のスタイルを邪魔しない細身の設計。",
          },
          {
            label: "INNER RING",
            title: "チタン内リング",
            copy: "肌に触れる内側にチタンを採用。外側の仕上げとは分けて、素材の範囲を明確に伝えます。",
          },
          {
            label: "FINISH",
            title: "5つの仕上げ",
            copy: "マットとミラー、黒・銀・ゴールド系から、いつもの装いに合う一色を選べます。",
          },
        ],
        image: withImage(
          P1_PROOF_IMAGE,
          "異なる仕上げの ELARA One リングを並べ、細身の輪郭を見せるプロダクトカット",
        ),
      },
      health: {
        eyebrow: "02 / 静かなテクノロジー",
        title: "先進性は、あなたが機械に合わせることではない。",
        body:
          "光学センサーや振動の仕組みは、身につける人の生活を中断しないためにあります。複雑さは内側に置き、必要な気づきだけを日常へ返します。",
        capabilities: [
          {
            label: "SENSING",
            title: "三色光 PPG",
            copy: "身体のリズムを知るための光学センシング。公開できる仕様は確認後に更新します。",
          },
          {
            label: "RESPONSE",
            title: "振動でそっと知らせる",
            copy: "画面を増やすのではなく、必要な場面に小さな合図を返す設計です。",
          },
          {
            label: "ENCLOSURE",
            title: "6 mm に収める",
            copy: "小型化の制約を、毎日つけられる自然な輪郭へ変えていきます。",
          },
        ],
        disclosure:
          "健康に関する機能と最終仕様は確認中です。本ページの App 画面はコンセプト表示であり、医療上の判断を行うものではありません。",
        image: withImage(
          P1_HEALTH_IMAGE,
          "石の天板に置かれた ELARA アプリのコンセプト画面とリング",
        ),
      },
      edition: {
        eyebrow: "03 / First Edition",
        title: "最初の一枚に、あなたの言葉を。",
        body:
          "P1 の予約者には、最初に届ける一枚の内側へ刻印を添えます。値引きではなく、身につける理由を自分の言葉で残すための特典です。",
        examples: ["自分のイニシャル", "始まりの日", "短いひとこと"],
        image: withImage(
          P1_EDITION_IMAGE,
          "ELARA One の内側に刻印を入れるイメージを見せる手元のプロダクトカット",
        ),
        disclosure:
          "刻印の文字数、確認タイミング、使用できる文字は最終仕様の確認後に確定します。",
      },
      finishes: {
        eyebrow: "04 / Choose your finish",
        title: "色は、説明よりも選ぶために。",
        body:
          "5つの仕上げを同じ条件で見比べて、いつもの服と手元に合うものを選びます。P1 ではすべて同価格です。",
        options: [
          { id: "matte-black", name: "マットブラック", englishName: "Matte Black" },
          { id: "mirror-silver", name: "ミラーシルバー", englishName: "Mirror Silver" },
          { id: "matte-silver", name: "マットシルバー", englishName: "Matte Silver" },
          { id: "mirror-gold", name: "ミラーゴールド", englishName: "Mirror Gold" },
          {
            id: "mirror-rose-gold",
            name: "ミラーローズゴールド",
            englishName: "Mirror Rose Gold",
          },
        ],
        selectionNote: "5色同価格 · 日本国内送料込み",
        image: withImage(
          P1_PROOF_IMAGE,
          "ELARA One の仕上げを比較するコンセプトプロダクトカット",
        ),
      },
      risk: {
        eyebrow: "05 / Sizing & delivery",
        title: "サイズは、試してから決める。",
        body:
          "最初から指輪のサイズを当てる必要はありません。予約後に Sizing Kit を届け、試着の結果をもとに最終サイズを確認します。",
        sizeRange: "US 5–12",
        sizeStatus: "Sizing Kit 後に確定",
        depositPending: true,
        depositLabel: "予約金：最終確認中（候補 ¥3,000）",
        deliveryPending: true,
        deliveryLabel: "お届け時期：生産計画の確認後にご案内",
        steps: [
          "Base Ring と仕上げを選ぶ",
          "返金可能な予約金を支払う",
          "Sizing Kit で試着する",
          "最終サイズと刻印を確認する",
          "生産計画とお届け時期をご案内する",
        ],
        refund:
          "正式に生産へ入る前は全額返金。組み合わせの調整が必要な場合は、待つ・色を変える・返金から選べるようにします。",
        disclosure:
          "予約金、返金条件、お届け時期は運用・生産条件の確認中です。確定前は予約を完了できません。",
        operator: "運営主体：公開情報を確認中",
        privacy:
          "ローカルプレビューではメールアドレスや選択内容を送信・保存しません。実サービス接続時の個人情報の扱いは接続前に明記します。",
        productionGate:
          "予約金、返金条件、お届け時期、運営主体の公開情報が確定するまで、実際の予約受付は開始しません。",
        image: withImage(
          P1_RISK_IMAGE,
          "Sizing Kit でリングのサイズを確認する手元と複数の試着リング",
        ),
      },
      specs: {
        eyebrow: "06 / Specs & FAQ",
        title: "最後に、確認したいこと。",
        items: [
          { label: "幅", value: "6.0 mm（目標値）" },
          { label: "内側", value: "チタン内リング" },
          { label: "サイズ", value: "US 5–12" },
          { label: "価格", value: "¥34,800（税込）" },
          { label: "仕上げ", value: "5色・同価格" },
        ],
        faq: [
          {
            question: "最終サイズはいつ決めますか？",
            answer: "予約後に Sizing Kit を試着してから確認します。最初の予約時にサイズを確定する必要はありません。",
          },
          {
            question: "予約金はいくらですか？",
            answer: "候補額は ¥3,000 ですが、正式な金額は運用条件の確認後にページへ反映します。",
          },
          {
            question: "今すぐ商品が届きますか？",
            answer: "現在はコンセプト段階です。生産計画とお届け時期が確定した後に、正式な案内を行います。",
          },
        ],
      },
      purchase: {
        eyebrow: "07 / Reserve",
        title: "P1 Base Ring を、最初の一枚に。",
        body:
          "仕上げを選び、刻印をイメージする。サイズは Sizing Kit のあとで決める。現在はこの流れを確認するためのローカルプレビューです。",
        productName: "ELARA One · Base Ring",
        price: "¥34,800（税込）",
        priceNote: "5色同価格 · 日本国内送料込み",
        finishLabel: "仕上げ",
        sizeLabel: "サイズ",
        sizeNote: "US 5–12 · 最終サイズは Sizing Kit 後に確定",
        engravingLabel: "First Edition 無料刻印",
        engravingPlaceholder: "刻印を入力（コンセプトプレビュー）",
        engravingHint: "文字数と対応文字は最終確認中",
        submitLabel: "予約フローを試す",
        localOnlyNote:
          "ローカルプレビューのみ。ここではメールアドレスも選択内容も送信・保存されず、実際の注文は作成されません。",
        stickyCta: "¥34,800｜First Edition 無料刻印｜予約する",
      },
    },
  },
};
