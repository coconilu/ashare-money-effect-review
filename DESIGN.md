# DESIGN.md — 「赚钱效应复盘终端」设计契约

## Direction：Retrospect Terminal（复盘终端）

题材是金融市场复盘，设计对标**交易终端 / 数据仪表盘**，而不是教科书或杂志页：深色底、等宽数字、红涨绿跌（A 股惯例）、时间轴与数据徽章是第一公民。读者像坐在一块行情大屏前，亲手拨动成交额、政策力度、杠杆水平，看赚钱效应如何开关。

## 色彩令牌（`:root` 唯一定义处）

```
--canvas:  #0c1017   页面底（近黑深蓝）
--surface: #141a24   卡片底
--surface2:#1b2330   嵌套底 / hover
--text:    #e8edf4   主文字
--muted:   #8b96a8   次文字
--border:  #26303f   描边
--accent:  #f0b429   琥珀金：交互强调、active、聚焦（终端高亮色）
--good:    #e64545   A股红 = 涨 / 赚钱效应好
--bad:     #2fa36b   A股绿 = 跌 / 赚钱效应差
--warn:    #e8843c   警示（⚠️ callout）
--info:    #4f9cf9   信息（∑ callout、链接）
```

⚠️ 语义与国际惯例相反，全站统一：**红 = 好/涨/赚钱效应强，绿 = 差/跌/亏钱**。不要出现绿色表扬、红色批评的用法。

## 字体与排版

- 正文：`system-ui, "PingFang SC", "Microsoft YaHei", sans-serif`，16px / 1.75
- 数字与代码：`ui-monospace, "SF Mono", Consolas, monospace`（`.num` 类强制等宽，所有点位/成交额/百分比必须用它）
- 标题：`600/700` 字重，章头 h1 带左侧 4px `--accent` 竖条
- 内容栏最大宽 860px 居中；演示卡片可放宽到 960px

## 组件（类名固定，长相以此为准）

- `.topbar` 顶部导航：左 = 站点名「赚钱效应复盘终端」，右 = 章节链接（当前章 `.active` 琥珀下划线）；移动端折叠为横向滚动条
- `.progress` 顶部 3px 阅读进度条（site.js 驱动，琥珀色）
- `.card` 内容卡片：`--surface` 底 + 1px `--border` + 10px 圆角 + 24px padding
- `.callout` 四色：`.c-intuition`💡(金) `.c-trap`⚠️(橙) `.c-math`∑(蓝) `.c-summary`✓(红，取 A股红)；左侧 3px 色条 + 图标 + 加粗小标题
- `.demo` 演示卡片：`--surface` 底、双边框效果（外 1px border + 内阴影），内含 `.demo-title` / 控件区 `.ctl` / 画布 / `.readout` 徽章行 / `.demo-note` 引导语（前置 ▶，斜体 muted）
- `.ctl` 控件组：滑块 `input[type=range]` 全宽、琥珀色 thumb；`.btn-group` 分段按钮（active 琥珀底黑字）；预设按钮 `.preset` 小胶囊
- `.readout` 数值徽章：等宽大字 + 小 label，随状态变色（`.r-good` 红 / `.r-bad` 绿 / `.r-warn` 橙）
- `.timeline` 时间轴：左侧竖线 + 圆点节点（好点红、差点绿），节点可点展开 `.tl-detail`
- `.formula` 公式块：Georgia 斜体居中 + `--surface2` 底
- `.chapter-nav` 章末双卡（上一章 ← / 下一章 →，hover 上浮）
- `.btn-done` 标记完成按钮（site.js，完成后变红底白字「已完成 ✓」）

## 首页形态

深色 hero：大标题 + 一句话副标 + 背景为缓慢呼吸的网格线 + 大号等宽数字跑马（3842.19 / 3.45万亿 / 79% 三个关键数）。下方章节卡片网格（2 列，移动 1 列），每卡 = 章号 + 标题 + 一句话钩子 + 完成态圆点。

## 硬性规则

- 零外部资源：无 CDN / 框架 / 网络字体 / 外链图片；`file://` 可直接打开
- 每章单文件：骨架 + 文案 + 内联 `<script>`；CSS/JS 引用：`../assets/css/main.css`、`../assets/js/site.js`
- 演示加载即初始化完毕；事件驱动重绘优先；rAF 动画必须可停止且尊重 `prefers-reduced-motion`
- 章末三件套：`.c-summary` 小结 + `.btn-done` + `.chapter-nav`
- 数据口径：指数点位/成交额/百分比以 `final-report.md` 与 `raw/sh-index-monthly.csv` 为准，不得编造新数字；报告标了"存疑/待核实"的内容不进网站
