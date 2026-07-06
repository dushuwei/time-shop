// ========== 游戏配置和常量 ==========
const CONFIG = {
    SAVE_KEY: 'timeShopSaveV2',
    SHOP_UPGRADES: {
        size1: { name: '扩展货架', cost: 200, inventorySlots: 10 },
        size2: { name: '二楼仓库', cost: 500, inventorySlots: 20 },
        decoration1: { name: '复古装修', cost: 300, reputationBonus: 5 },
        decoration2: { name: '豪华装修', cost: 800, reputationBonus: 15 },
        assistant: { name: '雇佣助手', cost: 1000, autoSell: true }
    },
    MERCHANT_SCHEDULE: [3, 7, 12, 18, 25], // 商人出现的天数
    SOUND_ENABLED: true
};

// 成就系统
const ACHIEVEMENTS = {
    first_sale: { name: '第一笔交易', description: '完成第一笔交易', icon: '💰' },
    story_collector: { name: '故事收集者', description: '解锁10个故事', icon: '📖' },
    wealthy_merchant: { name: '富商', description: '拥有1000金币', icon: '💎' },
    famous_shop: { name: '名店', description: '声望达到100', icon: '⭐' },
    time_traveler: { name: '时间旅行者', description: '与来自5个不同时代的顾客交易', icon: '⏰' },
    perfect_service: { name: '完美服务', description: '连续10次交易成功', icon: '🏆' }
};

// 音效系统（使用Web Audio API）
const SOUNDS = {
    coin: { freq: 800, duration: 0.1 },
    success: { freq: 600, duration: 0.2 },
    dialogue: { freq: 400, duration: 0.05 },
    button: { freq: 500, duration: 0.08 },
    unlock: { freq: 1000, duration: 0.3 }
};

// 创建简单的音效播放器
function playSound(soundName) {
    if (!CONFIG.SOUND_ENABLED) return;

    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const sound = SOUNDS[soundName];
    if (!sound) return;

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = sound.freq;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + sound.duration);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + sound.duration);
}

// ========== 扩展的物品数据 ==========
const EXTENDED_ITEMS = {
    ...ITEMS,
    typewriter: {
        id: "typewriter",
        name: "打字机",
        description: "作家的好伙伴",
        price: 55,
        sellPrice: 85,
        rarity: "rare",
        icon: "⌨️"
    },
    music_box: {
        id: "music_box",
        name: "八音盒",
        description: "旋转时播放出童年的旋律",
        price: 35,
        sellPrice: 55,
        rarity: "uncommon",
        icon: "🎶"
    },
    telescope: {
        id: "telescope",
        name: "望远镜",
        description: "让我们看见遥远的星辰",
        price: 60,
        sellPrice: 95,
        rarity: "rare",
        icon: "🔭"
    },
    game_console: {
        id: "game_console",
        name: "游戏机",
        description: "红白机时代的快乐",
        price: 50,
        sellPrice: 80,
        rarity: "uncommon",
        icon: "🎮"
    },
    love_letter: {
        id: "love_letter",
        name: "情书",
        description: "泛黄的信纸上写满了情话",
        price: 10,
        sellPrice: 30,
        rarity: "common",
        icon: "💌"
    },
    sundial: {
        id: "sundial",
        name: "日晷",
        description: "古老的计时工具",
        price: 80,
        sellPrice: 120,
        rarity: "rare",
        icon: "☀️"
    },
    snow_globe: {
        id: "snow_globe",
        name: "雪花球",
        description: "摇晃时飘起雪花",
        price: 25,
        sellPrice: 40,
        rarity: "common",
        icon: "🔮"
    },
    compass: {
        id: "compass",
        name: "指南针",
        description: "永远指向心中的方向",
        price: 30,
        sellPrice: 50,
        rarity: "common",
        icon: "🧭"
    },
    diary: {
        id: "diary",
        name: "日记本",
        description: "记录着秘密和梦想",
        price: 20,
        sellPrice: 35,
        rarity: "common",
        icon: "📔"
    },
    painting: {
        id: "painting",
        name: "油画",
        description: "印象派大师的真迹",
        price: 200,
        sellPrice: 300,
        rarity: "legendary",
        icon: "🖼️"
    }
};

// ========== 扩展的顾客数据 (20+) ==========
const EXTENDED_CUSTOMERS = [
    ...CUSTOMERS,
    {
        id: "lonely_writer",
        name: "陈默",
        era: "1950年代 · 作家",
        avatar: "✍️",
        dialogue: [
            "我的打字机坏了...",
            "我正在写一部关于时间和记忆的小说。",
            "没有打字机，我的思绪仿佛也断了。",
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
        dialogue: [
            "我母亲曾有一个八音盒...",
            "她去世前，那个八音盒不知所踪了。",
            "里面的旋律是她最喜欢的曲子。",
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
        dialogue: [
            "我和我的妻子，第一次相遇是在一个观星之夜。",
            "那时我用望远镜给她看土星环。",
            "现在她病了，我想再给她看一次星空...",
            "太好了！今晚就是晴天。"
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
        dialogue: [
            "叔叔，我想要一台游戏机...",
            "下周就是我生日了。",
            "我攒了半年的零花钱，够吗？",
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
        dialogue: [
            "年轻人，你这里有旧情书吗？",
            "我的战友在战场上牺牲了...",
            "他托我把信交给他的恋人。",
            "我想给她写封信，告诉她他最后想的还是她..."
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
        dialogue: [
            "我在研究古代的计时系统。",
            "日晷是人类最早的计时工具之一。",
            "这将帮助我们理解古人如何理解时间。",
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
        dialogue: [
            "我从来没有见过雪...",
            "爸爸说，他小时候这里每年都下雪。",
            "我想要一个雪花球！",
            "哇！好美啊！谢谢你！"
        ],
        desiredItems: ["snow_globe"],
        rewardMoney: 45,
        rewardReputation: 12,
        unlockCondition: "day >= 6"
    },
    {
        id: "explorer",
        name: "马可",
        era: "1600年代 · 探险家",
        avatar: "🧭",
        dialogue: [
            "我即将启程前往未知的大陆。",
            "没有指南针，我可能会在海上迷失。",
            "这是一次充满危险的旅程。",
            "有了它，我就能找到回家的路了！"
        ],
        desiredItems: ["compass"],
        rewardMoney: 55,
        rewardReputation: 18,
        unlockCondition: "day >= 8"
    },
    {
        id: "teenage_girl",
        name: "小雪",
        era: "2010年代 · 中学生",
        avatar: "👧",
        dialogue: [
            "我想要一本漂亮的日记本。",
            "我有好多话想说，但不知道跟谁说。",
            "老师说写日记可以帮助我整理思绪。",
            "谢谢！我会好好写的！"
        ],
        desiredItems: ["diary"],
        rewardMoney: 38,
        rewardReputation: 10,
        unlockCondition: "day >= 5"
    },
    {
        id: "art_collector",
        name: "维克多",
        era: "现代 · 收藏家",
        avatar: "🎨",
        dialogue: [
            "我听说你这里有一幅真正的印象派油画。",
            "这种级别的作品市面上已经很难找到了。",
            "我愿意出高价购买。",
            "成交！这将是我收藏的瑰宝！"
        ],
        desiredItems: ["painting"],
        rewardMoney: 350,
        rewardReputation: 50,
        unlockCondition: "reputation >= 70"
    }
];

// ========== 神秘商人系统 ==========
const MERCHANT_ITEMS = [
    { itemId: 'ancient_book', stock: 1 },
    { itemId: 'painting', stock: 1 },
    { itemId: 'sundial', stock: 2 },
    { itemId: 'telescope', stock: 2 },
    { itemId: 'typewriter', stock: 3 }
];

function spawnMerchant() {
    if (!CONFIG.MERCHANT_SCHEDULE.includes(gameState.day)) return false;

    playSound('unlock');
    showMerchantDialog();
    return true;
}

function showMerchantDialog() {
    const merchantDiv = document.createElement('div');
    merchantDiv.className = 'merchant-overlay';
    merchantDiv.innerHTML = `
        <div class="merchant-panel">
            <h2>🧙 神秘商人出现了！</h2>
            <p>我带来了一些稀有物品...</p>
            <div class="merchant-items" id="merchant-items"></div>
            <button onclick="closeMerchant()">离开</button>
        </div>
    `;
    document.body.appendChild(merchantDiv);

    const itemsContainer = document.getElementById('merchant-items');
    MERCHANT_ITEMS.forEach(item => {
        const itemData = EXTENDED_ITEMS[item.itemId];
        const itemDiv = document.createElement('div');
        itemDiv.className = 'merchant-item';
        itemDiv.innerHTML = `
            <div>${itemData.icon} ${itemData.name}</div>
            <div>💰 ${itemData.price}金币</div>
            <button onclick="buyFromMerchant('${item.itemId}', ${itemData.price})">购买</button>
        `;
        itemsContainer.appendChild(itemDiv);
    });
}

function buyFromMerchant(itemId, price) {
    if (gameState.money >= price) {
        gameState.money -= price;
        addToInventory(itemId, 1);
        playSound('coin');
        updateUI();
        showMessage(`购买了 ${EXTENDED_ITEMS[itemId].name}！`, 'success');
    } else {
        showMessage('金币不足！', 'error');
    }
}

function closeMerchant() {
    document.querySelector('.merchant-overlay').remove();
}

// 继续在下一个文件...
