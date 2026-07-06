#!/bin/bash
cd "$(dirname "$0")"
echo "正在启动《时光杂货铺》网页版..."
echo "服务器地址: http://localhost:5200"
echo "按 Ctrl+C 停止服务器"
echo ""
python3 -m http.server 5200
