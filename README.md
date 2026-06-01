# Getinge SW China Installed Base Dashboard

这是一个面向 Getinge SW China 的装机与项目看板。页面包含登录、产品看板切换、装机数据导入、项目录入、趋势图、客户排名、省份地图，以及全屏 Heat Map 展示。

当前前端入口是 `index.html`，主要交互逻辑在 `js/app.js`，样式在 `css/style.css`。本地 Node 后台是 `server.mjs`，Cloudflare Pages Functions 在 `functions/api/`。

## 当前页面结构

首页登录后进入 dashboard 主界面，顶部可切换产品看板：

- `Magnus Dashboard`：1180 Magnus IB 正式看板
- `Magnus 2026 Funnel`：Magnus Funnel 正式看板
- `Tegris Dashboard`：Tegris 正式看板
- `IC MIC Dashboard`：IC-MIC 正式看板
- `TEST Magnus IB`：仅 `Test` 用户可见的测试页面

主界面包含：

- 顶部品牌区、用户信息、退出登录、修改密码、项目录入与数据更新入口
- KPI 区：总量、覆盖省份、本季度新增、合作伙伴等
- 排名区：医院/客户排名与合作伙伴排名
- 中国省份地图：支持优先级筛选与地图导航
- 趋势图：近 12 个月与近五年趋势
- 底部动态：最新装机/签约信息滚动展示
- `Heat Map`：打开全屏产品热力图

## Heat Map 页面

5 个 Heat Map 页面共用 `footprint-overlay` 结构：

- 全屏浮层：`#footprintOverlay`
- 顶部极光氛围层：`.footprint-top-banner`
- 顶部/下部产品纪念图层：`.footprint-anniversary-badge`
- 右上 Getinge logo：`.footprint-brandmark`
- 中央静态地图：`#footprintMap`
- 左侧列表：`#footprintRail`
- 右侧统计卡：`#footprintStats`
- 返回按钮：`#closeFootprintMapButton`

当前正式 Heat Map 使用静态 4K 底图：

- `Magnus IB`：`assets/magnus-ib-rev4-4k.png`
- `Magnus Funnel`：`assets/magnus-funnel-rev4-4k.png`
- `Tegris`：`assets/tegris-rev4-4k.png`
- `IC-MIC`：`assets/ic-mic-rev4-4k.png`（REV5 光柱版）

测试 Heat Map 使用：

- `Test Magnus IB`：`assets/test-pages/test-magnus-ib-heatmap-v2.png`

Heat Map 中部/下部纪念图层：

- Magnus / Tegris / Funnel / Test 通用图：`assets/test-pages/test-hybrid-or-30th-anniversary-badge.png`
- IC-MIC 专用图：`assets/test-pages/ic-mic-cycle-for-life-badge.png`

Heat Map 静态图映射位于 `js/app.js` 的 `footprintStaticImageSrc()`。版式、极光、标题图位置、左右信息框和返回按钮样式位于 `css/style.css` 的 `footprint-*` 样式段。

## 本地运行

推荐使用内置 Node 后台运行。这样登录、改密、用户导入、装机数据导入和 Baserow 同步都能走完整接口：

```bash
node server.mjs
```

然后访问：

```text
http://localhost:8080
```

不要直接用 `file://.../index.html` 打开。当前版本依赖这些接口：

- `/api/session`
- `/api/session/password`
- `/api/users`
- `/api/dashboard-data`

如果只是静态预览，也可以临时运行：

```bash
python3 -m http.server 8080
```

但这种方式不适合验证登录、改密、用户导入和装机数据同步。

## 局域网共享

如果希望其他电脑、iPad 或手机访问同一份数据，请固定使用一台电脑作为本地后台服务器。

1. 在主电脑运行：

```bash
node server.mjs
```

2. 终端会显示类似：

```text
LAN access: http://192.168.1.23:8080
```

3. 其他设备访问这个局域网地址：

```text
http://192.168.1.23:8080
```

主电脑需要保持开机，并和其他设备在同一个 Wi-Fi / 局域网内。如果其他设备打不开，请检查 macOS 防火墙是否允许 Node.js 接收传入连接。

## 登录与权限

本地后台会读取 `data/authorized-users.json`，也支持从 Baserow 读取授权用户。默认内置了一组 bootstrap 用户，便于首次登录和初始化。

常用管理员账号：

```text
Maquet / 123win
```

管理员可使用页面中的用户导入功能更新授权用户。普通用户只可浏览看板和 Heat Map。

`TEST Magnus IB` 仅用户名为 `Test` 的用户可见，用于测试 Heat Map 新版设计，不影响正式产品页。

## 数据与导入

后台数据主要来自两处：

- 本地缓存：`data/dashboard-data.json`
- 云端后台：Baserow

页面右上角的 `更新数据` 支持导入 `.xlsx` / `.xls`。导入后服务器会生成或更新 dashboard 数据，并在配置了 Baserow 时同步到云端。

装机数据模板：

```text
outputs/dashboard-data-template/dashboard-data-import-template.xlsx
```

Dashboard 数据结构包含：

- `provinceData`：省份总量、最新客户、日期、地图坐标
- `users`：医院/客户排名
- `partners`：合作伙伴排名
- `updates`：最新动态
- `monthlyTrend`：近 12 个月趋势
- `yearlyTrend`：近五年趋势
- `productModels`：项目录入产品型号
- `productLineOptions`：二级产品线筛选，例如 1180 的 B0-B5、Magnus Funnel 的 `<60` / `≧60`、IC-MIC 的 WD500 / HS66 / CSS600 / Novito

## Baserow 配置

本地 `.env` 可配置 Baserow API。`.env` 不应提交到 GitHub。

```text
BASEROW_API_URL=https://api.baserow.io
BASEROW_TOKEN=<你的 Baserow Token>
BASEROW_AUTH_USERS_TABLE_ID=955652
BASEROW_INSTALL_BASE_TABLE_ID=951860
BASEROW_PRODUCT_TABLE_ID=951856
BASEROW_CUSTOMER_TABLE_ID=951857
BASEROW_SALES_PARTNER_TABLE_ID=951858
SESSION_SECRET=<随机长字符串>
```

Baserow 表用途：

- `Authorization User`：授权用户
- `Install_Base`：装机明细
- `Product_Master`：产品主数据
- `Customer_Master`：客户主数据
- `Sales_Partner_Master`：渠道/合作伙伴主数据

导入装机 Excel 后，服务器会按 `装机编号` 增量写入 Baserow。编号已存在则更新，编号不存在则新增。旧记录不会因为 Excel 未出现而自动删除。

## 目录说明

```text
index.html                 页面结构与主要 DOM
css/style.css              全站样式、Heat Map 版式、极光与标题图样式
js/app.js                  dashboard 数据、交互、图表、Heat Map 静态图映射
js/footprint3d.js          旧版/实验性 3D footprint 渲染逻辑
server.mjs                 本地 Node 后台与 API
functions/api/             Cloudflare Pages Functions
assets/                    正式图片、库文件、logo、Heat Map 静态图
assets/test-pages/         Test 页与 Heat Map 顶部纪念图资源
data/                      本地授权用户与 dashboard 数据缓存
outputs/                   生成物、模板、同步记录、QA 截图
image backup/              原始备份图片，不直接作为页面引用
scripts/                   数据同步与模板生成脚本
```

## GitHub 更新清单

如果只修改最近的 Heat Map 版式或极光效果，通常需要提交：

- `index.html`
- `css/style.css`

如果替换 Heat Map 静态图或顶部纪念图，还需要提交相关资源，例如：

- `assets/magnus-ib-rev4-4k.png`
- `assets/magnus-funnel-rev4-4k.png`
- `assets/tegris-rev4-4k.png`
- `assets/ic-mic-rev4-4k.png`
- `assets/test-pages/test-hybrid-or-30th-anniversary-badge.png`
- `assets/test-pages/ic-mic-cycle-for-life-badge.png`

如果修改静态图映射或页面交互，还需要提交：

- `js/app.js`

不要提交：

- `.env`
- `data/authorized-users.json`
- `.DS_Store`

## Cloudflare Pages 部署

在 Cloudflare Dashboard 中：

1. 打开 `Workers & Pages`
2. 选择 `Create application`
3. 选择 `Pages`
4. 选择 `Connect to Git`
5. 连接 GitHub 仓库

构建配置：

```text
Framework preset: None
Root directory: 仓库根目录
Build command: 留空
Build output directory: /
```

如果界面强制要求命令，可填：

```bash
exit 0
```

Cloudflare Pages 必须同时部署 `functions/api/`，否则线上登录、改密、用户导入和装机数据导入不会正常工作。

需要在 `Settings -> Variables and Secrets` 的 Production 环境配置：

```text
BASEROW_API_URL=https://api.baserow.io
BASEROW_AUTH_USERS_TABLE_ID=955652
BASEROW_INSTALL_BASE_TABLE_ID=951860
BASEROW_PRODUCT_TABLE_ID=951856
BASEROW_CUSTOMER_TABLE_ID=951857
BASEROW_SALES_PARTNER_TABLE_ID=951858
BASEROW_TOKEN=<你的 Baserow Token>
SESSION_SECRET=<随机长字符串>
```

`BASEROW_TOKEN` 和 `SESSION_SECRET` 应配置为 Secret。

## 部署后验证

未登录访问：

```text
https://你的域名/api/session
```

预期返回 `401`。

登录后建议验证：

- `/api/session` 返回当前用户
- 修改密码正常
- 用户 Excel 导入正常
- 装机数据导入正常
- 4 个正式产品页可切换
- `Test` 用户可看到 `TEST Magnus IB`
- 5 个 Heat Map 页面能打开、返回、显示正确静态图和顶部纪念图

## 常见问题

`Failed to fetch`
: 通常是通过 `file://` 打开页面。请改用 `http://localhost:8080` 或线上域名。

`用户名或密码不正确`
: 检查本地 `data/authorized-users.json` 或 Cloudflare Production 的 Baserow 配置。

`error 1101`
: 通常是 Cloudflare Pages Function 运行时异常。请查看 Functions 日志和最近代码变更。

改密码接口 `404`
: 检查是否部署了 `functions/api/session/password.js`。

Heat Map 图片没有更新
: 检查 `js/app.js` 的 `footprintStaticImageSrc()`，以及 `index.html` 中 CSS/JS 的 cache version。

Heat Map 样式没有更新
: 优先检查 `index.html` 中 `css/style.css?v=...` 是否已经递增，并清理浏览器缓存后刷新。

## 安全建议

- 不要提交 `.env`
- 不要提交 `data/authorized-users.json`
- 不要把 `BASEROW_TOKEN` 发给无关人员
- 如果 token 曾经暴露，请在 Baserow 中轮换
- `SESSION_SECRET` 使用随机长字符串，并妥善保存
