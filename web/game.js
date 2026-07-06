// 游戏数据
const ITEMS = {
    cassette_tape: {
        id: "cassette_tape",
        name: "磁带",
        description: "1980年代的音乐载体，承载着青春的回忆",
        price: 15,
        rarity: "common"
    },
    vinyl_record: {
        id: "vinyl_record",
        name: "黑胶唱片",
        description: "经典的音乐收藏品",
        price: 30,
        rarity: "uncommon"
    },
    pocket_watch: {
        id: "pocket_watch",
        name: "怀表",
        description: "维多利亚时代的精致计时器",
        price: 50,
        rarity: "rare"
    },
    hologram_toy: {
        id: "hologram_toy",
        name: "全息玩具",
        description: "2050年代儿童的最爱",
        price: 40,
        rarity: "uncommon"
    },
    ancient_book: {
        id: "ancient_book",
        name: "古籍",
        description: "失传已久的珍贵典籍",
        price: 100,
        rarity: "legendary"
    },
    polaroid_camera: {
        id: "polaroid_camera",
        name: "拍立得相机",
        description: "能即时成像的神奇相机",
        price: 45,
        rarity: "uncommon"
    }
};

const CUSTOMERS = [
    {
        id: "nostalgic_teen",
        name: "李明",
        era: "1985年 · 高中生",
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
        unlockCondition: ""
    },
    {
        id: "future_elder",
        name: "王奶奶",
        era: "2050年 · 老人",
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
    }
];

// 游戏状态
let gameState = {
    money: 100,
    day: 1,
    reputation: 0,
    inventory: {},
    currentCustomer: null,
    dialogueIndex: 0,
    unlockedStories: []
};

// 初始化游戏
function initGame() {
    // 检查是否有存档
    const savedGame = localStorage.getItem('timeShopSave');
    if (savedGame) {
        document.getElementById('continue-btn').disabled = false;
    }
}

// 开始新游戏
function startNewGame() {
    gameState = {
        money: 100,
        day: 1,
        reputation: 0,
        inventory: {
            cassette_tape: 2,
            hologram_toy: 1,
            pocket_watch: 1,
            polaroid_camera: 1
        },
        currentCustomer: null,
        dialogueIndex: 0,
        unlockedStories: []
    };

    enterShop();
}

// 继续游戏
function continueGame() {
    const savedGame = localStorage.getItem('timeShopSave');
    if (savedGame) {
        gameState = JSON.parse(savedGame);
        enterShop();
    }
}

// 进入商店
function enterShop() {
    document.getElementById('main-menu').style.display = 'none';
    document.getElementById('shop').classList.add('active');
    updateUI();
    spawnCustomer();
}

// 返回菜单
function backToMenu() {
    if (confirm('是否保存当前进度？')) {
        saveGame();
    }
    document.getElementById('shop').classList.remove('active');
    document.getElementById('main-menu').style.display = 'block';
}

// 更新UI
function updateUI() {
    document.getElementById('money').textContent = gameState.money;
    document.getElementById('day').textContent = gameState.day;
    document.getElementById('reputation').textContent = gameState.reputation;
    updateInventoryDisplay();
}

// 更新库存显示
function updateInventoryDisplay() {
    const inventoryEl = document.getElementById('inventory');
    inventoryEl.innerHTML = '';

    if (Object.keys(gameState.inventory).length === 0) {
        inventoryEl.innerHTML = '<div style="color: #daa520; text-align: center; padding: 1rem;">库存为空</div>';
        return;
    }

    for (const [itemId, quantity] of Object.entries(gameState.inventory)) {
        if (quantity > 0) {
            const item = ITEMS[itemId];
            const itemDiv = document.createElement('button');
            itemDiv.className = 'item-button';
            itemDiv.onclick = () => offerItem(itemId);
            itemDiv.innerHTML = `
                <div class="item-name">${item.name}</div>
                <div class="item-quantity">数量: ${quantity}</div>
            `;
            inventoryEl.appendChild(itemDiv);
        }
    }
}

// 生成顾客
function spawnCustomer() {
    const availableCustomers = CUSTOMERS.filter(customer => {
        if (!customer.unlockCondition) return true;

        if (customer.unlockCondition.includes('day')) {
            const requiredDay = parseInt(customer.unlockCondition.match(/\d+/)[0]);
            return gameState.day >= requiredDay;
        }

        if (customer.unlockCondition.includes('reputation')) {
            const requiredRep = parseInt(customer.unlockCondition.match(/\d+/)[0]);
            return gameState.reputation >= requiredRep;
        }

        return true;
    });

    if (availableCustomers.length === 0) {
        showMessage('今天没有顾客来访...', 'error');
        return;
    }

    gameState.currentCustomer = availableCustomers[Math.floor(Math.random() * availableCustomers.length)];
    gameState.dialogueIndex = 0;

    document.getElementById('customer-name').textContent = gameState.currentCustomer.name;
    document.getElementById('customer-era').textContent = gameState.currentCustomer.era;

    showDialogue();
}

// 显示对话
function showDialogue() {
    if (!gameState.currentCustomer) return;

    if (gameState.dialogueIndex < gameState.currentCustomer.dialogue.length) {
        const dialogue = gameState.currentCustomer.dialogue[gameState.dialogueIndex];
        document.getElementById('dialogue-text').textContent = dialogue;
    } else {
        showCustomerRequest();
    }
}

// 显示顾客需求
function showCustomerRequest() {
    const items = gameState.currentCustomer.desiredItems.map(id => ITEMS[id].name).join('、');
    document.getElementById('dialogue-text').textContent = `我需要: ${items}\n\n请从库存中选择物品给顾客。`;
}

// 下一段对话
function nextDialogue() {
    if (!gameState.currentCustomer) {
        spawnCustomer();
        return;
    }

    gameState.dialogueIndex++;
    showDialogue();
}

// 提供物品
function offerItem(itemId) {
    if (!gameState.currentCustomer) {
        showMessage('现在没有顾客...', 'error');
        return;
    }

    if (gameState.dialogueIndex < gameState.currentCustomer.dialogue.length) {
        showMessage('请先听完顾客的话...', 'error');
        return;
    }

    if (gameState.currentCustomer.desiredItems.includes(itemId)) {
        // 交易成功
        gameState.inventory[itemId]--;
        if (gameState.inventory[itemId] <= 0) {
            delete gameState.inventory[itemId];
        }

        gameState.money += gameState.currentCustomer.rewardMoney;
        gameState.reputation += gameState.currentCustomer.rewardReputation;

        if (!gameState.unlockedStories.includes(gameState.currentCustomer.id)) {
            gameState.unlockedStories.push(gameState.currentCustomer.id);
        }

        showMessage('交易成功！顾客很满意！', 'success');

        updateUI();
        gameState.currentCustomer = null;

        setTimeout(() => {
            spawnCustomer();
        }, 2000);
    } else {
        showMessage('这不是顾客想要的物品...', 'error');
    }
}

// 下一天
function nextDay() {
    gameState.day++;
    gameState.currentCustomer = null;
    updateUI();
    showMessage(`第 ${gameState.day} 天开始了！`, 'success');
    setTimeout(() => {
        spawnCustomer();
    }, 1500);
}

// 保存游戏
function saveGame() {
    localStorage.setItem('timeShopSave', JSON.stringify(gameState));
    showMessage('游戏已保存！', 'success');
}

// 显示消息
function showMessage(text, type = 'success') {
    const messageEl = document.createElement('div');
    messageEl.className = type === 'success' ? 'success-message' : 'error-message';
    messageEl.textContent = text;
    document.body.appendChild(messageEl);

    setTimeout(() => {
        messageEl.remove();
    }, 2000);
}

// 显示关于
function showCredits() {
    alert('《时光杂货铺》\n\n一个关于时间、记忆与连接的故事。\n\n经营一家神奇的杂货铺，\n服务来自不同时代的顾客，\n倾听他们的故事。\n\n游戏开发：Claude\n2026');
}

// 页面加载完成后初始化
window.onload = initGame;
