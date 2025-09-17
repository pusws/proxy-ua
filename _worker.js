// 需要反代的地址
const hostname = "https://snippets.neib.cn"

// HTML 前端页面
const HTML_PAGE = `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>支持乌克兰 - 和平与正义</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: #005BBB;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #333;
        }
        
        .container {
            background: #FFD700;
            border-radius: 20px;
            padding: 40px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
            text-align: center;
            max-width: 500px;
            width: 90%;
        }
        
        .logo {
            font-size: 48px;
            margin-bottom: 20px;
        }
        
        h1 {
            color: #005BBB;
            margin-bottom: 20px;
            font-size: 28px;
            font-weight: 600;
        }
        
        .description {
            color: #005BBB;
            margin-bottom: 30px;
            font-size: 16px;
            line-height: 1.6;
        }
        
        .status {
            display: inline-flex;
            align-items: center;
            background: #005BBB;
            color: #FFD700;
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 14px;
            margin-bottom: 30px;
            font-weight: 600;
        }
        
        .status::before {
            content: '●';
            margin-right: 8px;
            animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
        }
        
        .info-card {
            background: white;
            border: 2px solid #005BBB;
            border-radius: 12px;
            padding: 20px;
            margin: 20px 0;
            text-align: left;
        }
        
        .info-title {
            font-weight: 600;
            color: #005BBB;
            margin-bottom: 10px;
        }
        
        .info-text {
            color: #005BBB;
            font-size: 14px;
            line-height: 1.5;
        }
        
        .code {
            background: #005BBB;
            color: #FFD700;
            padding: 12px;
            border-radius: 8px;
            font-family: 'Courier New', monospace;
            font-size: 12px;
            margin: 10px 0;
            overflow-x: auto;
            font-weight: 600;
        }
        
        .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 2px solid #005BBB;
            color: #005BBB;
            font-size: 12px;
            font-weight: 600;
        }
        
        @media (max-width: 600px) {
            .container {
                padding: 30px 20px;
            }
            
            h1 {
                font-size: 24px;
            }
            
            .logo {
                font-size: 36px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="logo">🇺🇦</div>
        <h1>Слава Україні!</h1>
        <div class="description">
            我们坚定支持乌克兰人民的正义斗争，<br>
            强烈谴责俄罗斯的非法侵略和战争罪行。
        </div>
        
        <div class="status">
            与乌克兰同在
        </div>
        
        <div class="info-card">
            <div class="info-title">🕊️ 和平与正义</div>
            <div class="info-text">
                • 支持乌克兰的主权和领土完整<br>
                • 谴责俄罗斯对平民的攻击<br>
                • 呼吁国际社会加强制裁<br>
                • 为乌克兰难民提供人道主义援助
            </div>
        </div>
        
        <div class="info-card">
            <div class="info-title">⚖️ 战争罪行</div>
            <div class="info-text">
                俄罗斯军队在乌克兰犯下的战争罪行包括：<br>
                • 故意攻击平民目标<br>
                • 强制转移人口<br>
                • 酷刑和非法拘禁<br>
                • 破坏民用基础设施
            </div>
        </div>
        
        <div class="info-card">
            <div class="info-title">💙 支持乌克兰</div>
            <div class="code">乌克兰必胜 🇺🇦 Героям слава!</div>
        </div>
        
        <div class="footer">
            自由与民主万岁 • 和平终将到来
        </div>
    </div>
</body>
</html>
`;

function handleRequest(request) {
    // 检查是否为 WebSocket 请求
    if (request.headers.get('Upgrade') !== 'websocket') {
        // 如果是普通的 HTTP GET 请求，返回前端页面
        if (request.method === 'GET') {
            return new Response(HTML_PAGE, {
                headers: {
                    'Content-Type': 'text/html; charset=utf-8',
                    'Cache-Control': 'public, max-age=3600'
                }
            });
        }
        // 其他非 WebSocket 请求返回 403
        return new Response('Access Denied', { status: 403 });
    }

    // WebSocket 请求继续代理到目标服务器
    let url = new URL(request.url);
    return fetch(new Request(hostname + url.pathname + url.search, request));
}

export default {
    async fetch(request, env, ctx) {
        return handleRequest(request);
    },
};
