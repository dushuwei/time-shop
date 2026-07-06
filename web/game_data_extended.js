// ========== 扩展的游戏数据 ==========

// 完整的物品数据库（新增物品）
const ITEMS = {
    // 原有物品
    cassette_tape: {
        id: "cassette_tape",
        name: "磁带",
        description: "1980年代的音乐载体，承载着青春的回忆",
        price: 15,
        sellPrice: 25,
        rarity: "common",
        era: "1980s",
        icon: "🎵"
    },
    vinyl_record: {
        id: "vinyl_record",
        name: "黑胶唱片",
        description: "经典的音乐收藏品",
        price: 30,
        sellPrice: 50,
        rarity: "uncommon",
        era: "1960s",
        icon: "💿"
    },
    pocket_watch: {
        id: "pocket_watch",
        name: "怀表",
        description: "维多利亚时代的精致计时器",
        price: 50,
        sellPrice: 80,
        rarity: "rare",
        era: "victorian",
        icon: "⏰"
    },
    hologram_toy: {
        id: "hologram_toy",
        name: "全息玩具",
        description: "2050年代儿童的最爱",
        price: 40,
        sellPrice: 60,
        rarity: "uncommon",
        era: "2050s",
        icon: "🎮"
    },
    ancient_book: {
        id: "ancient_book",
        name: "古籍",
        description: "失传已久的珍贵典籍",
        price: 100,
        sellPrice: 150,
        rarity: "legendary",
        era: "ancient",
        icon: "📜"
    },
    polaroid_camera: {
        id: "polaroid_camera",
        name: "拍立得相机",
        description: "能即时成像的神奇相机",
        price: 45,
        sellPrice: 70,
        rarity: "uncommon",
        era: "1990s",
        icon: "📷"
    },
    // 新增物品
    typewriter: {
        id: "typewriter",
        name: "打字机",
        description: "作家的好伙伴，每一次敲击都是灵感的火花",
        price: 55,
        sellPrice: 85,
        rarity: "rare",
        era: "1950s",
        icon: "⌨️"
    },
    music_box: {
        id: "music_box",
        name: "八音盒",
        description: "旋转时播放出童年的旋律",
        price: 35,
        sellPrice: 55,
        rarity: "uncommon",
        era: "1900s",
        icon: "🎶"
    },
    telescope: {
        id: "telescope",
        name: "望远镜",
        description: "让我们看见遥远的星辰",
        price: 60,
        sellPrice: 95,
        rarity: "rare",
        era: "1800s",
        icon: "🔭"
    },
    game_console: {
        id: "game_console",
        name: "游戏机",
        description: "80后的童年回忆，红白机时代的快乐",
        price: 50,
        sellPrice: 80,
        rarity: "uncommon",
        era: "1980s",
        icon: "🎮"
    },
    love_letter: {
        id: "love_letter",
        name: "情书",
        description: "泛黄的信纸上写满了青涩的情话",
        price: 10,
        sellPrice: 30,
        rarity: "common",
        era: "various",
        icon: "💌"
    },
    sundial: {
        id: "sundial",
        name: "日晷",
        description: "古老的计时工具，记录着时光的流逝",
        price: 80,
        sellPrice: 120,
        rarity: "rare",
        era: "ancient",
        icon: "☀️"
    },
    snow_globe: {
        id: "snow_globe",
        name: "雪花球",
        description: "摇晃时飘起雪花，仿佛回到那个冬天",
        price: 25,
        sellPrice: 40,
        rarity: "common",
        era: "1990s",
        icon: "🔮"
    },
    pocket_knife: {
        id: "pocket_knife",
        name: "瑞士军刀",
        description: "冒险者的必备工具",
        price: 40,
        sellPrice: 65,
        rarity: "uncommon",
        era: "1970s",
        icon: "🔪"
    },
    compass: {
        id: "compass",
        name: "指南针",
        description: "永远指向心中的方向",
        price: 30,
        sellPrice: 50,
        rarity: "common",
        era: "various",
        icon: "🧭"
    },
    diary: {
        id: "diary",
        name: "日记本",
        description: "记录着某人的秘密和梦想",
        price: 20,
        sellPrice: 35,
        rarity: "common",
        era: "various",
        icon: "📔"
    }
};

// 扩展的顾客数据库（20+个顾客）
const CUSTOMERS = [
    // 原有顾客
    {
        id: "nostalgic_teen",
        name: "李明",
        era: "1985年 · 高中生",
        avatar: "👦",
        storyTitle: "青春的告白",
        dialogue: [
            "你好...我想找一盒磁带。",
            "不是普通的那种，我想要能录音的，音质要好的。",
            "我...我要录一些话给一个很重要的人。",
            "其实是我们班的班花，我喜欢她两年了，但一直没敢说。",
            "马上就要毕业了，我想...至少让她知道。",
            "谢谢！我一定会鼓起勇气的！"
        ],
        desiredItems: ["cassette_tape"],
        rewardMoney: 25,
        rewardReputation: 10,
        unlockCondition: "",
        epilogue: "一个月后，李明又来了。他红着脸告诉你，她答应了。"
    },
    {
        id: "future_elder",
        name: "王奶奶",
        era: "2050年 · 老人",
        avatar: "👵",
        storyTitle: "童年的玩具",
        dialogue: [
            "小店主，你这里有未来的东西吗？",
            "我孙女总说我们那个年代的玩具太老土了。",
            "她不知道，那个小小的全息投影，陪伴了我整个童年。",
            "我想让她看看，其实每个时代都有属于自己的美好。",
            "太好了！这个她一定会喜欢的！"
        ],
        desiredItems: ["hologram_toy"],
        rewardMoney: 60,
        rewardReputation: 15,
        unlockCondition: "day >= 3"
    },
    {
        id: "victorian_gentleman",
        name: "爱德华先生",
        era: "维多利亚时代 · 绅士",
        avatar: "🎩",
        storyTitle: "遗失的时光",
        dialogue: [
            "日安，尊敬的店主。",
            "我在寻找一块怀表，它对我意义重大。",
            "我父亲曾说，时间是我们唯一无法挽回的财富。",
            "他留给我的那块表，在一场火灾中损坏了...",
            "我想，如果能找到一块类似的，至少能让我想起他的教诲。",
            "万分感激！这让我重新找回了与父亲的联系。"
        ],
        desiredItems: ["pocket_watch"],
        rewardMoney: 80,
        rewardReputation: 20,
        unlockCondition: "reputation >= 25"
    },
    {
        id: "photographer",
        name: "张小雨",
        era: "1990年代 · 摄影师",
        avatar: "👩",
        storyTitle: "瞬间的永恒",
        dialogue: [
            "听说这里能找到各种稀奇的东西？",
            "我需要一台拍立得相机，数码的太没感觉了。",
            "有些东西，只有即时成像才能捕捉到那种真实感。",
            "我们街区下个月就要拆了，我想留下些什么...",
            "那些老爷爷老奶奶，那些斑驳的墙壁，都值得被记住。",
            "完美！我要去记录那些即将消失的美好了！"
        ],
        desiredItems: ["polaroid_camera"],
        rewardMoney: 70,
        rewardReputation: 18,
        unlockCondition: "day >= 5"
    },
    // 新增顾客
    {
        id: "lonely_writer",
        name: "陈默",
        era: "1950年代 · 作家",
        avatar: "✍️",
        storyTitle: "最后的手稿",
        dialogue: [
            "我的打字机坏了...",
            "我正在写一部小说，关于时间和记忆的。",
            "没有打字机，我的思绪仿佛也断了。",
            "有些故事，只有在机械键盘的敲击声中才能流淌出来。",
            "谢谢你！我会写完这个故事的。"
        ],
        desiredItems: ["typewriter"],
        rewardMoney: 90,
        rewardReputation: 22,
        unlockCondition: "day >= 7"
    },
    {
        id: "music_teacher",
        name: "林老师",
        era: "1920年代 · 音乐教师",
        avatar: "🎼",
        storyTitle: "母亲的旋律",
        dialogue: [
            "我母亲曾有一个八音盒...",
            "她去世前，那个八音盒不知所踪了。",
            "里面的旋律是她最喜欢的曲子。",
            "每当我听到那个旋律，就想起她给我上的第一堂钢琴课。",
            "这个...和她的一模一样！"
        ],
        desiredItems: ["music_box"],
        rewardMoney: 65,
        rewardReputation: 16,
        unlockCondition: "reputation >= 30"
    },
    {
        id: "astronomer",
        name: "刘星辰",
        era: "1800年代 · 天文学家",
        avatar: "🔬",
        storyTitle: "星空的约定",
        dialogue: [
            "我和我的妻子，第一次相遇是在一个观星之夜。",
            "那时我用望远镜给她看土星环。",
            "她说那是她见过最美的东西。",
            "现在她病了，我想再给她看一次星空...",
            "太好了！今晚就是晴天，我要带她去看星星。"
        ],
        desiredItems: ["telescope"],
        rewardMoney: 100,
        rewardReputation: 25,
        unlockCondition: "reputation >= 40"
    },
    {
        id: "gamer_kid",
        name: "小虎",
        era: "1990年代 · 小学生",
        avatar: "👦",
        storyTitle: "最好的生日礼物",
        dialogue: [
            "叔叔，我想要一台游戏机...",
            "下周就是我生日了，但是爸妈说买不起。",
            "我攒了半年的零花钱，够吗？",
            "班里的同学都在玩超级玛丽，我也好想玩...",
            "谢谢叔叔！这是我收到过最好的礼物！"
        ],
        desiredItems: ["game_console"],
        rewardMoney: 50,
        rewardReputation: 15,
        unlockCondition: "day >= 4"
    },
    {
        id: "old_soldier",
        name: "赵老",
        era: "1940年代 · 退伍军人",
        avatar: "🎖️",
        storyTitle: "战友的信",
        dialogue: [
            "年轻人，你这里有旧情书吗？",
            "我的战友在战场上牺牲了...",
            "他临终前托我把这封信交给他的恋人。",
            "但我回来时，她已经不知所踪。",
            "我想给她写封信，告诉她，他最后想的还是她..."
        ],
        desiredItems: ["love_letter"],
        rewardMoney: 40,
        rewardReputation: 20,
        unlockCondition: "reputation >= 35"
    },
    {
        id: "archaeologist",
        name: "苏教授",
        era: "现代 · 考古学家",
        avatar: "👨‍🏫",
        storyTitle: "古老的秘密",
        dialogue: [
            "我在研究古代的计时系统。",
            "日晷是人类最早的计时工具之一。",
            "我需要一个真正的古代日晷来完成我的研究。",
            "这将帮助我们理解古人是如何理解时间的。",
            "太完美了！这个日晷至少有500年历史！"
        ],
        desiredItems: ["sundial"],
        rewardMoney: 130,
        rewardReputation: 30,
        unlockCondition: "reputation >= 50"
    },
    {
        id: "snow_lover",
        name: "艾米",
        era: "2000年代 · 儿童",
        avatar: "👧",
        storyTitle: "第一场雪",
        dialogue: [
            "我从来没有见过雪...",
            "爸爸说，他小时候这里每年都下雪。",
            "但是现在天气变暖了，不再下雪了。",
            "我想要一个雪花球，这样我就能看到雪了！",
            "哇！好美啊！谢谢你！"
        ],
        desiredItems: ["snow_globe"],
        rewardMoney: 45,
        rewardReputation: 12,
        unlockCondition: "day >= 6"
    }
];

// 继续添加更多顾客...
