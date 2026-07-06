// ========== 完整增强版游戏逻辑 ==========

// 使用原有的ITEMS和CUSTOMERS，并扩展
Object.assign(ITEMS, EXTENDED_ITEMS || {});
const ALL_CUSTOMERS = EXTENDED_CUSTOMERS || CUSTOMERS;

// 扩展的游戏状态
let gameState = {
    money: 100,
    day: 1,
    reputation: 0,
    inventory: {},
    currentCustomer: null,
    dialogueIndex: 0,
    unlockedStories: [],
    achievements: [],
    shopUpgrades: [],
    consecutiveSuccess: 0,
    merchantVisited: false,
    soundEnabled: true
};

// ========== 音效系统 ==========
function playSound(soundName) {
    if (!gameState.soundEnabled) return;

    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        const sounds = {
            coin: { freq: 800, duration: 0.1 },
            success: { freq: 600, duration: 0.2 },
            dialogue: { freq: 400, duration: 0.05 },
            button: { freq: 500, duration: 0.08 },
            unlock: { freq: 1000, duration: 0.3 }
        };

        const sound = sounds[soundName] || sounds.button;

        oscillator.frequency.value = sound.freq;
        oscillator.type = 'sine';

        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + sound.duration);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + sound.duration);
    } catch (e) {
        console.log('Audio not supported');
    }
}

function toggleSound() {
    gameState.soundEnabled = !gameState.soundEnabled;
    document.getElementById('sound-status').textContent = gameState.soundEnabled ? '开启' : '关闭';
    playSound('button');
}

// ========== 成就系统 ==========
function checkAchievements() {
    const achievements = [
        {
            id: 'first_sale',
            name: '第一笔交易',
            description: '完成第一笔交易',
            icon: '💰',
            condition: () => gameState.unlockedStories.length >= 1
        },
        {
            id: 'story_collector',
            name: '故事收集者',
            description: '解锁10个故事',
            icon: '📖',
            condition: () => gameState.unlockedStories.length >= 10
        },
        {
            id: 'wealthy_merchant',
            name: '富商',
            description: '拥有1000金币',
            icon: '💎',
            condition: () => gameState.money >= 1000
        },
        {
            id: 'famous_shop',
            name: '名店',
            description: '声望达到100',
            icon: '⭐',
            condition: () => gameState.reputation >= 100
        },
        {
            id: 'perfect_service',
            name: '完美服务',
            description: '连续10次交易成功',
            icon: '🏆',
            condition: () => gameState.consecutiveSuccess >= 10
        }
    ];

    achievements.forEach(achievement => {
        if (!gameState.achievements.includes(achievement.id) && achievement.condition()) {
            gameState.achievements.push(achievement.id);
            showAchievement(achievement);
            playSound('unlock');
        }
    });
}

function showAchievement(achievement) {
    const popup = document.createElement('div');
    popup.className = 'achievement-popup';
    popup.innerHTML = `
        <h3>${achievement.icon} 成就解锁！</h3>
        <p><strong>${achievement.name}</strong></p>
        <p>${achievement.description}</p>
    `;
    document.body.appendChild(popup);

    setTimeout(() => {
        popup.remove();
    }, 3500);
}

function showAchievements() {
    const achievements = [
        { id: 'first_sale', name: '第一笔交易', description: '完成第一笔交易', icon: '💰' },
        { id: 'story_collector', name: '故事收集者', description: '解锁10个故事', icon: '📖' },
        { id: 'wealthy_merchant', name: '富商', description: '拥有1000金币', icon: '💎' },
        { id: 'famous_shop', name: '名店', description: '声望达到100', icon: '⭐' },
        { id: 'perfect_service', name: '完美服务', description: '连续10次交易成功', icon: '🏆' }
    ];

    let html = '<div class="merchant-overlay" onclick="this.remove()"><div class="merchant-panel" onclick="event.stopPropagation()"><h2>🏆 成就系统</h2><div class="story-book">';

    achievements.forEach(ach => {
        const unlocked = gameState.achievements.includes(ach.id);
        html += `
            <div class="story-item ${unlocked ? '' : 'locked'}">
                <h4>${ach.icon} ${ach.name}</h4>
                <p>${ach.description}</p>
                <p style="color: ${unlocked ? '#4ade80' : '#666'};">${unlocked ? '✅ 已解锁' : '🔒 未解锁'}</p>
            </div>
        `;
    });

    html += '</div><button onclick="this.closest(\'.merchant-overlay\').remove()">关闭</button></div></div>';
    document.body.insertAdjacentHTML('beforeend', html);
}

// ========== 故事收集册 ==========
function showStoryBook() {
    let html = '<div class="merchant-overlay" onclick="this.remove()"><div class="merchant-panel" onclick="event.stopPropagation()"><h2>📚 故事收集册</h2><div class="story-book">';

    ALL_CUSTOMERS.forEach(customer => {
        const unlocked = gameState.unlockedStories.includes(customer.id);
        html += `
            <div class="story-item ${unlocked ? '' : 'locked'}">
                <h4>${customer.avatar || '❓'} ${unlocked ? customer.name : '???'}</h4>
                <p style="font-style: italic; color: #daa520;">${unlocked ? customer.storyTitle : '未解锁'}</p>
                <p>${unlocked ? customer.era : '需要满足特定条件'}</p>
            </div>
        `;
    });

    html += '</div><button onclick="this.closest(\'.merchant-overlay\').remove()">关闭</button></div></div>';
    document.body.insertAdjacentHTML('beforeend', html);
}

// ========== 商店升级系统 ==========
function showUpgrades() {
    const upgrades = [
        { id: 'size1', name: '扩展货架', cost: 200, description: '增加库存容量', icon: '📦' },
        { id: 'decoration1', name: '复古装修', cost: 300, description: '声望+5', icon: '🎨' },
        { id: 'size2', name: '二楼仓库', cost: 500, description: '大幅增加库存', icon: '🏢' },
        { id: 'decoration2', name: '豪华装修', cost: 800, description: '声望+15', icon: '✨' },
        { id: 'assistant', name: '雇佣助手', cost: 1000, description: '自动接待顾客', icon: '👔' }
    ];

    let html = '<div class="merchant-overlay" onclick="this.remove()"><div class="merchant-panel" onclick="event.stopPropagation()"><h2>🏪 商店升级</h2><div class="upgrade-grid">';

    upgrades.forEach(upgrade => {
        const purchased = gameState.shopUpgrades.includes(upgrade.id);
        const canAfford = gameState.money >= upgrade.cost;

        html += `
            <div class="upgrade-card ${purchased ? 'purchased' : ''}">
                <div>
                    <div style="font-size: 1.5rem;">${upgrade.icon} ${upgrade.name}</div>
                    <div style="color: #daa520; font-size: 0.9rem;">${upgrade.description}</div>
                    <div style="color: #ffd700; margin-top: 0.5rem;">💰 ${upgrade.cost} 金币</div>
                </div>
                <button
                    onclick="buyUpgrade('${upgrade.id}', ${upgrade.cost})"
                    ${purchased || !canAfford ? 'disabled' : ''}>
                    ${purchased ? '已购买' : (canAfford ? '购买' : '金币不足')}
                </button>
            </div>
        `;
    });

    html += '</div><button onclick="this.closest(\'.merchant-overlay\').remove()">关闭</button></div></div>';
    document.body.insertAdjacentHTML('beforeend', html);
}

function buyUpgrade(upgradeId, cost) {
    if (gameState.money >= cost && !gameState.shopUpgrades.includes(upgradeId)) {
        gameState.money -= cost;
        gameState.shopUpgrades.push(upgradeId);

        // 应用升级效果
        if (upgradeId === 'decoration1') gameState.reputation += 5;
        if (upgradeId === 'decoration2') gameState.reputation += 15;

        playSound('success');
        updateUI();
        showMessage('升级成功！', 'success');

        // 重新显示升级界面
        document.querySelector('.merchant-overlay').remove();
        setTimeout(() => showUpgrades(), 300);
    }
}

// ========== 神秘商人系统 ==========
function openMerchant() {
    const merchantItems = [
        { itemId: 'ancient_book', stock: 1 },
        { itemId: 'sundial', stock: 2 },
        { itemId: 'telescope', stock: 2 },
        { itemId: 'typewriter', stock: 3 },
        { itemId: 'music_box', stock: 2 }
    ];

    let html = '<div class="merchant-overlay"><div class="merchant-panel"><h2>🧙 神秘商人</h2><p style="text-align: center; color: #daa520; font-size: 1.2rem;">我带来了一些稀有物品...</p><div class="merchant-items">';

    merchantItems.forEach(item => {
        const itemData = ITEMS[item.itemId];
        if (itemData) {
            html += `
                <div class="merchant-item">
                    <div style="font-size: 3rem;">${itemData.icon}</div>
                    <div style="font-size: 1.2rem; color: #ffd700; margin: 0.5rem 0;">${itemData.name}</div>
                    <div style="color: #daa520; font-size: 0.9rem;">${itemData.description}</div>
                    <div style="color: #ffd700; margin-top: 0.5rem;">💰 ${itemData.price} 金币</div>
                    <button onclick="buyFromMerchant('${item.itemId}', ${itemData.price})">购买</button>
                </div>
            `;
        }
    });

    html += '</div><button onclick="document.querySelector(\'.merchant-overlay\').remove()">离开</button></div></div>';
    document.body.insertAdjacentHTML('beforeend', html);
}

function buyFromMerchant(itemId, price) {
    if (gameState.money >= price) {
        gameState.money -= price;
        addToInventory(itemId, 1);
        playSound('coin');
        updateUI();
        showMessage(`购买了 ${ITEMS[itemId].name}！`, 'success');
    } else {
        showMessage('金币不足！', 'error');
    }
}

// ========== 库存管理 ==========
function addToInventory(itemId, quantity) {
    if (!gameState.inventory[itemId]) {
        gameState.inventory[itemId] = 0;
    }
    gameState.inventory[itemId] += quantity;
}

// ========== 游戏初始化 ==========
function initGame() {
    const savedGame = localStorage.getItem('timeShopSaveV2');
    if (savedGame) {
        document.getElementById('continue-btn').disabled = false;
    }
}

// ========== 开始/继续游戏 ==========
function startNewGame() {
    playSound('button');
    gameState = {
        money: 100,
        day: 1,
        reputation: 0,
        inventory: {
            cassette_tape: 2,
            hologram_toy: 1,
            pocket_watch: 1,
            polaroid_camera: 1,
            game_console: 1,
            love_letter: 1
        },
        currentCustomer: null,
        dialogueIndex: 0,
        unlockedStories: [],
        achievements: [],
        shopUpgrades: [],
        consecutiveSuccess: 0,
        merchantVisited: false,
        soundEnabled: true
    };

    enterShop();
}

function continueGame() {
    playSound('button');
    const savedGame = localStorage.getItem('timeShopSaveV2');
    if (savedGame) {
        gameState = JSON.parse(savedGame);
        enterShop();
    }
}

function enterShop() {
    document.getElementById('main-menu').style.display = 'none';
    document.getElementById('shop').classList.add('active');
    updateUI();
    spawnCustomer();
}

function backToMenu() {
    playSound('button');
    if (confirm('是否保存当前进度？')) {
        saveGame();
    }
    document.getElementById('shop').classList.remove('active');
    document.getElementById('main-menu').style.display = 'block';
}

// ========== UI更新 ==========
function updateUI() {
    document.getElementById('money').textContent = gameState.money;
    document.getElementById('day').textContent = gameState.day;
    document.getElementById('reputation').textContent = gameState.reputation;
    document.getElementById('stories').textContent = gameState.unlockedStories.length;
    updateInventoryDisplay();
    checkAchievements();
}

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
            if (item) {
                const itemDiv = document.createElement('button');
                itemDiv.className = `item-button rarity-${item.rarity}`;
                itemDiv.onclick = () => offerItem(itemId);
                itemDiv.innerHTML = `
                    <div class="item-icon">${item.icon}</div>
                    <div class="item-info">
                        <div class="item-name">${item.name}</div>
                        <div class="item-quantity">数量: ${quantity}</div>
                    </div>
                `;
                inventoryEl.appendChild(itemDiv);
            }
        }
    }
}

// ========== 顾客系统 ==========
function spawnCustomer() {
    const availableCustomers = ALL_CUSTOMERS.filter(customer => {
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

    document.getElementById('customer-avatar').textContent = gameState.currentCustomer.avatar || '👤';
    document.getElementById('customer-name').textContent = gameState.currentCustomer.name;
    document.getElementById('customer-era').textContent = gameState.currentCustomer.era;

    showDialogue();
}

function showDialogue() {
    if (!gameState.currentCustomer) return;

    if (gameState.dialogueIndex < gameState.currentCustomer.dialogue.length) {
        const dialogue = gameState.currentCustomer.dialogue[gameState.dialogueIndex];
        document.getElementById('dialogue-text').textContent = dialogue;
        playSound('dialogue');
    } else {
        showCustomerRequest();
    }
}

function showCustomerRequest() {
    const items = gameState.currentCustomer.desiredItems.map(id => ITEMS[id].name).join('、');
    document.getElementById('dialogue-text').textContent = `我需要: ${items}\n\n请从库存中选择物品给顾客。`;
}

function nextDialogue() {
    playSound('button');
    if (!gameState.currentCustomer) {
        spawnCustomer();
        return;
    }

    gameState.dialogueIndex++;
    showDialogue();
}

function offerItem(itemId) {
    playSound('button');

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
        gameState.consecutiveSuccess++;

        if (!gameState.unlockedStories.includes(gameState.currentCustomer.id)) {
            gameState.unlockedStories.push(gameState.currentCustomer.id);
        }

        playSound('success');
        showMessage('交易成功！顾客很满意！', 'success');

        updateUI();
        gameState.currentCustomer = null;

        setTimeout(() => {
            spawnCustomer();
        }, 2000);
    } else {
        gameState.consecutiveSuccess = 0;
        showMessage('这不是顾客想要的物品...', 'error');
    }
}

// ========== 游戏循环 ==========
function nextDay() {
    playSound('button');
    gameState.day++;
    gameState.currentCustomer = null;

    // 检查是否触发神秘商人
    if ([3, 7, 12, 18, 25].includes(gameState.day) && !gameState.merchantVisited) {
        showMessage(`第 ${gameState.day} 天 - 神秘商人来访！`, 'success');
        setTimeout(() => {
            openMerchant();
            gameState.merchantVisited = true;
        }, 1500);
    } else {
        gameState.merchantVisited = false;
        showMessage(`第 ${gameState.day} 天开始了！`, 'success');
        setTimeout(() => {
            spawnCustomer();
        }, 1500);
    }

    updateUI();
}

// ========== 存档系统 ==========
function saveGame() {
    localStorage.setItem('timeShopSaveV2', JSON.stringify(gameState));
    playSound('success');
    showMessage('游戏已保存！', 'success');
}

// ========== 消息系统 ==========
function showMessage(text, type = 'success') {
    const messageEl = document.createElement('div');
    messageEl.className = type === 'success' ? 'success-message' : 'error-message';
    messageEl.textContent = text;
    document.body.appendChild(messageEl);

    setTimeout(() => {
        messageEl.remove();
    }, 2000);
}

// 页面加载完成后初始化
window.onload = function() {
    initGame();
};
