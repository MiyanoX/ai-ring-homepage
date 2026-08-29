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
    p1: {
      nav: [
        { label: "The product", href: "#proof" },
        { label: "Quiet technology", href: "#health" },
        { label: "First Edition", href: "#edition" },
        { label: "Finishes", href: "#finishes" },
        { label: "Reserve", href: "#purchase" },
      ],
      hero: {
        eyebrow: "ELARA One · P1 Base Ring",
        title: "A quiet smart ring made for every day.",
        englishTitle: "It starts with a ring.",
        description:
          "A ring you want to wear every day. Inside its slim silhouette and considered finish, we are exploring technology that quietly observes the shape of your day.",
        width: "6.0 mm",
        innerRing: "Titanium inner ring",
        edition: "First Edition | Free inner engraving",
        price: "¥34,800 (tax included)",
        priceNote: "P1 concept price · 5 finishes / US 5–12",
        primaryAction: "Reserve",
        secondaryAction: "See the product",
        localOnlyNote:
          "This is currently a preview of the concept reservation flow. No real order or payment is created.",
        factLabels: {
          ariaLabel: "P1 Base Ring highlights",
          width: "Width",
          innerRing: "Inner ring",
          price: "Concept price",
        },
        image: withImage(
          P1_HERO_IMAGE,
          "A hand wearing the champagne-gold ELARA One ring in morning light",
        ),
      },
      proof: {
        eyebrow: "01 / Product proof",
        title: "Make 6 mm and a titanium inner ring more than numbers.",
        body:
          "The slimness on your finger, the material on the inside, and the light across the surface. Because this is something you wear every day, we turn specifications into a feeling you can picture.",
        items: [
          {
            label: "PROPORTION",
            title: "6.0 mm wide",
            copy: "A slim profile that sits naturally beside the jewelry you already wear.",
          },
          {
            label: "INNER RING",
            title: "Titanium inner ring",
            copy: "Titanium is used on the inner ring that touches the skin; the outer finish remains clearly separate.",
          },
          {
            label: "FINISH",
            title: "Five finishes",
            copy: "Choose from matte and mirror surfaces in black, silver, gold, and rose-gold tones.",
          },
        ],
        image: withImage(
          P1_PROOF_IMAGE,
          "A product view of ELARA One rings in different finishes showing their slim profiles",
        ),
      },
      health: {
        eyebrow: "02 / Quiet technology",
        title: "Progress means adapting to you, not asking you to adapt to a machine.",
        body:
          "Optical sensing and gentle vibration are there to avoid interrupting the life of the person wearing the ring. Complexity stays inside; only the insight you need returns to your day.",
        capabilities: [
          {
            label: "SENSING",
            title: "Tri-color PPG",
            copy: "Optical sensing for understanding body rhythms. Public specifications will be updated after review.",
          },
          {
            label: "RESPONSE",
            title: "A gentle vibration",
            copy: "A small signal for the moments that need it, instead of sending you to another screen.",
          },
          {
            label: "ENCLOSURE",
            title: "Contained in 6 mm",
            copy: "Turning the constraints of miniaturization into a shape that feels natural to wear every day.",
          },
        ],
        disclosure:
          "Health-related functions and final specifications are under review. The app image on this page is a concept display, not a tool for medical decisions.",
        image: withImage(
          P1_HEALTH_IMAGE,
          "An ELARA app concept screen and ring on a stone surface",
        ),
      },
      edition: {
        eyebrow: "03 / First Edition",
        title: "Your words, inside the first one.",
        body:
          "P1 reservation participants can add engraving to the inside of the first ring delivered. It is not a discount; it is a way to keep the reason you wear it in your own words.",
        examples: ["Your initials", "A day to begin", "A few words"],
        image: withImage(
          P1_EDITION_IMAGE,
          "A hand showing the concept of engraving inside an ELARA One ring",
        ),
        disclosure:
          "Character count, supported characters, and the confirmation timing will be finalized after the production specification is reviewed.",
      },
      finishes: {
        eyebrow: "04 / Choose your finish",
        title: "Choose a finish for the way you already live.",
        body:
          "Compare five finishes under the same conditions and choose the one that belongs with your clothes and your hands. Every finish is the same P1 concept price.",
        options: [
          { id: "matte-black", name: "Matte Black", englishName: "Soft matte black" },
          { id: "mirror-silver", name: "Mirror Silver", englishName: "Polished silver" },
          { id: "matte-silver", name: "Matte Silver", englishName: "Soft silver" },
          { id: "mirror-gold", name: "Mirror Gold", englishName: "Polished gold" },
          { id: "mirror-rose-gold", name: "Mirror Rose Gold", englishName: "Polished rose gold" },
        ],
        selectionNote: "Five finishes · same price · Japan domestic shipping included",
        image: withImage(
          P1_PROOF_IMAGE,
          "A concept product view comparing five ELARA One finishes",
        ),
      },
      risk: {
        eyebrow: "05 / Sizing & delivery",
        title: "Choose your size after trying it.",
        body:
          "You do not need to guess your ring size at the start. A Sizing Kit is planned after reservation so the final size can be confirmed from the fit.",
        sizeRange: "US 5–12",
        sizeStatus: "Confirmed after the Sizing Kit",
        depositPending: true,
        depositLabel: "Reservation deposit: under review (candidate ¥3,000)",
        deliveryPending: true,
        deliveryLabel: "Delivery timing: to be shared after the production plan is confirmed",
        flagLabels: {
          size: "Available sizes",
          deposit: "Reservation deposit",
          delivery: "Delivery",
        },
        steps: [
          "Choose the Base Ring and finish",
          "Pay the refundable reservation deposit",
          "Try the ring with the Sizing Kit",
          "Confirm the final size and engraving",
          "Receive the production plan and delivery timing",
        ],
        refund:
          "A full refund is available before production formally begins. If the combination needs adjustment, you can choose to wait, change the finish, or receive a refund.",
        disclosure:
          "The reservation deposit, refund terms, and delivery timing are still being confirmed. Reservation cannot be completed before those terms are final.",
        operator: "Operator: public details under review",
        privacy:
          "This local preview does not send or save email addresses or selections. Personal-data handling will be stated before any real service is connected.",
        productionGate:
          "Real reservations will not open until the deposit, refund terms, delivery timing, and operator disclosure are confirmed.",
        image: withImage(
          P1_RISK_IMAGE,
          "A hand checking ring size with a Sizing Kit and several sample rings",
        ),
      },
      specs: {
        eyebrow: "06 / Specs & FAQ",
        title: "The details worth confirming.",
        items: [
          { label: "Width", value: "6.0 mm (target)" },
          { label: "Inner ring", value: "Titanium inner ring" },
          { label: "Size", value: "US 5–12" },
          { label: "Price", value: "¥34,800 (tax included)" },
          { label: "Finish", value: "Five finishes · same price" },
        ],
        faq: [
          {
            question: "When is the final size chosen?",
            answer: "After reservation, you will try the Sizing Kit and confirm the size from the fit. You do not need to finalize a size at the first step.",
          },
          {
            question: "How much is the reservation deposit?",
            answer: "The candidate amount is ¥3,000, but the final amount will be published after the operating conditions are confirmed.",
          },
          {
            question: "Will the product arrive right away?",
            answer: "This is currently a concept stage. Official guidance will follow after the production plan and delivery timing are confirmed.",
          },
        ],
      },
      purchase: {
        eyebrow: "07 / Reserve",
        title: "Make the P1 Base Ring your first one.",
        body:
          "Choose a finish and imagine your engraving. Decide the size after the Sizing Kit. This is currently a local preview for understanding the flow.",
        productName: "ELARA One · Base Ring",
        price: "¥34,800 (tax included)",
        priceNote: "Five finishes · same price · Japan domestic shipping included",
        finishLabel: "Finish",
        sizeLabel: "Size",
        sizeNote: "US 5–12 · final size confirmed after the Sizing Kit",
        engravingLabel: "First Edition free engraving",
        engravingPlaceholder: "Enter engraving (concept preview)",
        engravingHint: "Character count and supported characters are under review",
        engravingStatus: {
          withValuePrefix: "Engraving “",
          withValueSuffix: "” (free)",
          empty: "Free engraving can be added",
        },
        submitLabel: "Try the reservation flow",
        localOnlyNote:
          "Local preview only. No email address or selection is sent or saved here, and no real order is created.",
        stickyCta: "¥34,800 · First Edition free engraving · Reserve",
      },
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
    p1: {
      nav: [
        { label: "了解产品", href: "#proof" },
        { label: "安静的科技", href: "#health" },
        { label: "First Edition", href: "#edition" },
        { label: "选择材质", href: "#finishes" },
        { label: "预约", href: "#purchase" },
      ],
      hero: {
        eyebrow: "ELARA One · P1 Base Ring",
        title: "一枚适合每天佩戴的安静智能指环。",
        englishTitle: "It starts with a ring.",
        description:
          "先是一枚你愿意每天戴着的指环。在细窄的轮廓与克制的材质里，我们探索一种安静留意你一天节奏的技术。",
        width: "6.0 mm",
        innerRing: "钛内圈",
        edition: "First Edition｜首枚免费刻字",
        price: "¥34,800（含税）",
        priceNote: "P1 概念价格 · 5 种材质 / US 5–12",
        primaryAction: "预约",
        secondaryAction: "查看产品",
        localOnlyNote: "当前为概念预约流程预览，不会创建真实订单或支付。",
        factLabels: {
          ariaLabel: "P1 Base Ring 核心信息",
          width: "宽度",
          innerRing: "内圈",
          price: "概念价格",
        },
        image: withImage(
          P1_HERO_IMAGE,
          "晨光中佩戴香槟金 ELARA One 指环的手部近景",
        ),
      },
      proof: {
        eyebrow: "01 / 产品证明",
        title: "让 6 mm 与钛内圈，不止是参数。",
        body:
          "戴在指间的细、触碰皮肤的材质、表面接住光线的方式。因为它要陪你每天生活，我们希望把规格转化成可以想象的佩戴感。",
        items: [
          {
            label: "PROPORTION",
            title: "6.0 mm 宽度",
            copy: "细窄的轮廓，即使与日常佩戴的首饰放在一起，也不会打扰你的风格。",
          },
          {
            label: "INNER RING",
            title: "钛内圈",
            copy: "接触皮肤的内圈使用钛材质；外侧的表面处理保持独立并清楚说明。",
          },
          {
            label: "FINISH",
            title: "五种材质",
            copy: "从哑光与镜面，到黑、银、金与玫瑰金色系，选择与你平时穿着相合的一色。",
          },
        ],
        image: withImage(
          P1_PROOF_IMAGE,
          "不同材质的 ELARA One 指环产品图，展示细窄的轮廓",
        ),
      },
      health: {
        eyebrow: "02 / 安静的科技",
        title: "先进，不是让你适应机器，而是让技术适应你。",
        body:
          "光学感知与轻柔振动，是为了不打断佩戴者正在过的生活。把复杂留在内部，只把你当下需要的理解送回日常。",
        capabilities: [
          {
            label: "SENSING",
            title: "三色光 PPG",
            copy: "用于理解身体节律的光学感知。对外公开的规格将在确认后更新。",
          },
          {
            label: "RESPONSE",
            title: "轻轻回应的振动",
            copy: "需要提醒时给出一个小小信号，而不是把你带回另一块屏幕。",
          },
          {
            label: "ENCLOSURE",
            title: "收进 6 mm 之内",
            copy: "把小型化的限制，转化为一枚每天都能自然佩戴的轮廓。",
          },
        ],
        disclosure:
          "健康相关功能与最终规格仍在确认中。本页 App 画面是概念展示，不用于医疗判断。",
        image: withImage(
          P1_HEALTH_IMAGE,
          "石材台面上的 ELARA 应用概念界面与指环",
        ),
      },
      edition: {
        eyebrow: "03 / First Edition",
        title: "把你的话，留在第一枚里。",
        body:
          "P1 预约用户可以为首枚交付的指环添加内圈刻字。它不是折扣，而是把你愿意佩戴它的理由，留在自己的话里。",
        examples: ["你的姓名首字母", "一个开始的日子", "一句简短的话"],
        image: withImage(
          P1_EDITION_IMAGE,
          "展示 ELARA One 指环内圈刻字概念的手部产品图",
        ),
        disclosure: "刻字字数、支持字符与确认时间将在生产规格完成审核后确定。",
      },
      finishes: {
        eyebrow: "04 / 选择材质",
        title: "为你已经拥有的生活，选一种表面。",
        body:
          "在相同条件下比较五种材质，选择与你的衣服和手部相处自然的一种。P1 概念阶段五种材质同价。",
        options: [
          { id: "matte-black", name: "哑光黑", englishName: "Soft matte black" },
          { id: "mirror-silver", name: "镜面银", englishName: "Polished silver" },
          { id: "matte-silver", name: "哑光银", englishName: "Soft silver" },
          { id: "mirror-gold", name: "镜面金", englishName: "Polished gold" },
          { id: "mirror-rose-gold", name: "镜面玫瑰金", englishName: "Polished rose gold" },
        ],
        selectionNote: "五种材质 · 同一价格 · 日本国内配送包含在内",
        image: withImage(
          P1_PROOF_IMAGE,
          "比较五种 ELARA One 指环材质的概念产品图",
        ),
      },
      risk: {
        eyebrow: "05 / 尺寸与交付",
        title: "先试戴，再决定尺寸。",
        body:
          "一开始不必猜自己的指环尺寸。计划在预约后寄出 Sizing Kit，根据试戴结果确认最终尺寸。",
        sizeRange: "US 5–12",
        sizeStatus: "Sizing Kit 后确认",
        depositPending: true,
        depositLabel: "预约金：仍在确认中（候选金额 ¥3,000）",
        deliveryPending: true,
        deliveryLabel: "交付时间：生产计划确认后说明",
        flagLabels: {
          size: "适配尺寸",
          deposit: "预约金",
          delivery: "交付",
        },
        steps: [
          "选择 Base Ring 与材质",
          "支付可退款的预约金",
          "使用 Sizing Kit 试戴",
          "确认最终尺寸与刻字",
          "了解生产计划与交付时间",
        ],
        refund:
          "正式进入生产前可全额退款。如果组合仍需调整，可以选择等待、更换材质或退款。",
        disclosure:
          "预约金、退款条件与交付时间仍在确认中。条件确定前无法完成真实预约。",
        operator: "运营主体：公开信息仍在确认中",
        privacy:
          "本地预览不会发送或保存邮箱与选择内容。接入真实服务前会明确说明个人信息处理方式。",
        productionGate: "在预约金、退款条件、交付时间与运营主体信息确认前，不会开启真实预约。",
        image: withImage(
          P1_RISK_IMAGE,
          "使用 Sizing Kit 确认指环尺寸的手部与多枚试戴指环",
        ),
      },
      specs: {
        eyebrow: "06 / 参数与 FAQ",
        title: "最后，确认这些细节。",
        items: [
          { label: "宽度", value: "6.0 mm（目标值）" },
          { label: "内圈", value: "钛内圈" },
          { label: "尺寸", value: "US 5–12" },
          { label: "价格", value: "¥34,800（含税）" },
          { label: "材质", value: "五种 · 同价" },
        ],
        faq: [
          {
            question: "什么时候确定最终尺寸？",
            answer: "预约后使用 Sizing Kit 试戴，再根据适配度确认尺寸。第一步不需要先确定尺寸。",
          },
          {
            question: "预约金是多少？",
            answer: "候选金额为 ¥3,000，正式金额将在运营条件确认后更新到页面。",
          },
          {
            question: "产品会马上送到吗？",
            answer: "当前仍处于概念阶段。生产计划与交付时间确认后，我们会发布正式说明。",
          },
        ],
      },
      purchase: {
        eyebrow: "07 / 预约",
        title: "让 P1 Base Ring 成为你的第一枚。",
        body: "选择一种材质，想象你的刻字。尺寸在 Sizing Kit 后确定。当前只是帮助你理解流程的本地预览。",
        productName: "ELARA One · Base Ring",
        price: "¥34,800（含税）",
        priceNote: "五种材质 · 同价 · 日本国内配送包含在内",
        finishLabel: "材质",
        sizeLabel: "尺寸",
        sizeNote: "US 5–12 · 最终尺寸在 Sizing Kit 后确认",
        engravingLabel: "First Edition 首枚免费刻字",
        engravingPlaceholder: "输入刻字（概念预览）",
        engravingHint: "字数与支持字符仍在确认中",
        engravingStatus: {
          withValuePrefix: "已加入刻字：「",
          withValueSuffix: "」（免费）",
          empty: "可添加免费刻字",
        },
        submitLabel: "试用预约流程",
        localOnlyNote: "仅限本地预览。邮箱与选择内容不会在这里发送或保存，也不会创建真实订单。",
        stickyCta: "¥34,800 · First Edition 首枚免费刻字 · 预约",
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
        factLabels: {
          ariaLabel: "P1 Base Ring の要点",
          width: "幅",
          innerRing: "内側",
          price: "コンセプト価格",
        },
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
        flagLabels: {
          size: "対応サイズ",
          deposit: "予約金",
          delivery: "お届け",
        },
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
        engravingStatus: {
          withValuePrefix: "「",
          withValueSuffix: "」を刻印（無料）",
          empty: "無料刻印を追加できます",
        },
        submitLabel: "予約フローを試す",
        localOnlyNote:
          "ローカルプレビューのみ。ここではメールアドレスも選択内容も送信・保存されず、実際の注文は作成されません。",
        stickyCta: "¥34,800｜First Edition 無料刻印｜予約する",
      },
    },
  },
};
