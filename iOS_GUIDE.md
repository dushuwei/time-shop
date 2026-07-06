# iOS版本开发指南

## 方案2：使用Capacitor打包（推荐用于网页版）

### 1. 安装依赖
```bash
cd /home/ivan/dsw/cloudme_snow_cr_api_test_20260527/time_shop_game/web

# 安装Node.js和npm（如果还没有）
# 然后安装Capacitor
npm init -y
npm install @capacitor/core @capacitor/cli @capacitor/ios
```

### 2. 初始化Capacitor
```bash
npx cap init "时光杂货铺" "com.timeshop.game"
```

### 3. 添加iOS平台
```bash
npx cap add ios
```

### 4. 配置capacitor.config.json
```json
{
  "appId": "com.timeshop.game",
  "appName": "时光杂货铺",
  "webDir": ".",
  "bundledWebRuntime": false,
  "server": {
    "url": "http://localhost:5200"
  }
}
```

### 5. 构建和运行
```bash
npx cap copy
npx cap open ios
```

这会在Xcode中打开项目，然后你可以：
- 在模拟器中测试
- 配置签名
- 提交到App Store

## 方案3：使用React Native重写（完全原生）

### 1. 创建React Native项目
```bash
npx react-native init TimeShopGame
cd TimeShopGame
```

### 2. 安装依赖
```bash
npm install @react-navigation/native
npm install react-native-async-storage
npm install react-native-sound
```

### 3. 移植游戏逻辑
将JavaScript逻辑移植到React Native组件中

### 4. 运行iOS版本
```bash
npx react-native run-ios
```

## 方案对比

| 特性 | Godot导出 | Capacitor | React Native |
|------|----------|-----------|--------------|
| 开发难度 | 简单 | 很简单 | 中等 |
| 性能 | 好 | 中等 | 很好 |
| 原生体验 | 中等 | 中等 | 很好 |
| 代码复用 | Godot代码 | HTML/JS代码 | 需要重写 |
| 包大小 | 较大 | 小 | 中等 |

## 推荐方案

**如果你想快速发布iOS版本：**
→ 使用 **Capacitor** 打包现有的HTML5版本

**如果你想要最佳性能和体验：**
→ 使用 **React Native** 重写

**如果你想一次开发多平台：**
→ 使用 **Godot** 导出

## 前置要求

无论选择哪种方案，你都需要：

1. **Mac电脑** - iOS开发必须在macOS上进行
2. **Xcode** - 从App Store免费下载
3. **Apple Developer账号** - $99/年（如果要上架App Store）
4. **iOS设备或模拟器** - 用于测试

## 快速开始（Capacitor方案）

我可以帮你立即创建一个iOS版本的配置文件。需要我开始吗？

这个方案的优势是：
- ✅ 复用现有的HTML5游戏代码
- ✅ 几乎不需要修改游戏逻辑
- ✅ 打包后是真正的原生iOS应用
- ✅ 可以访问原生iOS功能
- ✅ 可以上架App Store
