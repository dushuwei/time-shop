#!/bin/bash

echo "=========================================="
echo "  时光杂货铺 - iOS版本构建脚本"
echo "=========================================="
echo ""

# 检查是否在Mac上运行
if [[ "$OSTYPE" != "darwin"* ]]; then
    echo "❌ 错误：iOS开发需要在macOS上进行"
    echo "   请在Mac电脑上运行此脚本"
    exit 1
fi

# 检查Node.js
if ! command -v node &> /dev/null; then
    echo "❌ 未安装Node.js"
    echo "   请先安装Node.js: https://nodejs.org/"
    exit 1
fi

# 检查Xcode
if ! command -v xcodebuild &> /dev/null; then
    echo "❌ 未安装Xcode"
    echo "   请从App Store安装Xcode"
    exit 1
fi

echo "✅ 环境检查通过"
echo ""

# 安装Capacitor
echo "📦 步骤 1/4: 安装Capacitor..."
npm install @capacitor/core @capacitor/cli @capacitor/ios --save

# 初始化Capacitor（如果还没有初始化）
if [ ! -d "ios" ]; then
    echo "🔧 步骤 2/4: 初始化iOS项目..."
    npx cap add ios
else
    echo "✅ iOS项目已存在，跳过初始化"
fi

# 同步代码
echo "🔄 步骤 3/4: 同步代码到iOS项目..."
npx cap sync ios

# 打开Xcode
echo "🚀 步骤 4/4: 打开Xcode..."
npx cap open ios

echo ""
echo "=========================================="
echo "✅ iOS项目已准备就绪！"
echo "=========================================="
echo ""
echo "下一步操作："
echo "1. 在Xcode中选择开发团队（Team）"
echo "2. 连接iPhone或选择模拟器"
echo "3. 点击运行按钮（▶️）"
echo "4. 游戏将在iOS设备上启动！"
echo ""
echo "上架App Store："
echo "1. 配置App图标和启动画面"
echo "2. 设置版本号和构建号"
echo "3. 创建Archive"
echo "4. 上传到App Store Connect"
echo ""
