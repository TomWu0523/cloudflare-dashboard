# Getinge SW China Installed Base Dashboard

本目录是一个静态网页原型，用于展示 SW China installed base，并支持在 1180 Magnus OR Table、Tegris Dashboard 与 IC MIC Dashboard 之间切换。

## 本地运行

推荐使用内置 Node 后台运行，这样 Excel 授权用户导入后会保存到 `data/authorized-users.json`，下次打开无需重新导入：

```bash
node server.mjs
```

然后访问：

```text
http://localhost:8080
```

注意：请不要直接用 `file://.../index.html` 打开。当前版本的登录、改密、用户导入和装机数据同步都依赖 `/api/session`、`/api/users`、`/api/dashboard-data` 这些后端接口，必须通过 `http://localhost:8080` 或线上域名访问。

## 共享给其他设备

如果希望你导入用户名、密码和装机数据后，其他电脑、iPad 或手机也能直接登录和浏览，请固定使用一台电脑作为“迷你后台服务器”：

1. 在这台主电脑上运行：

```bash
node server.mjs
```

2. 终端会显示类似下面的局域网地址：

```text
LAN access: http://192.168.1.23:8080
```

3. 其他设备必须访问这个局域网地址，而不是访问自己的 `localhost:8080`。

```text
http://192.168.1.23:8080
```

4. 以后只需要在这台主电脑提供的页面里导入授权用户和装机数据，所有访问同一个地址的设备都会读取同一份 `data/authorized-users.json` 和 `data/dashboard-data.json`。

注意：主电脑需要保持开机，并和其他设备在同一个 Wi-Fi / 局域网内。如果其他设备打不开，请检查 macOS 防火墙是否允许 Node.js 接收传入连接。

仅静态预览也可以使用下面的命令，但授权用户只能保存在当前浏览器缓存中：

```bash
python3 -m http.server 8080
```

然后访问：

```text
http://localhost:8080
```

## 数据替换

当前测试数据写在 `js/app.js` 的 `dashboards` 配置中，每个产品看板包含：

- `provinceData`：各省总装机量、最新装机场地、日期和地图坐标
- `users`：用户排名
- `partners`：合作伙伴销售排名
- `updates`：底部滚动动态
- `monthlyTrend`：近 12 个月趋势
- `yearlyTrend`：近五年装机趋势
- `productModels`：项目录入中的产品型号选项
- `productLineOptions`：可选的二级产品线筛选项，例如 1180 下的 B0-B5、IC MIC 下的 S600 与 Novito

后续可以改成读取 CSV、Excel 或接口数据。

## 后台数据与 Excel 导入

- 授权用户保存于 `data/authorized-users.json`
- 1180、Tegris、IC MIC 装机看板数据保存于 `data/dashboard-data.json`
- 装机数据 Excel 模版：`outputs/dashboard-data-template/dashboard-data-import-template.xlsx`

在每个 dashboard 页面右上角点击“导入装机数据”即可导入该模版格式的 `.xlsx` / `.xls` 文件。模版只需要维护 `装机数据` 一张明细表，字段包括产品、型号、数量、配置、销售、销售渠道、最终客户、省份、订单时间、装机时间、保修过期时间；导入后会写入 Baserow，地图、省份汇总、用户排名、合作伙伴排名、最新动态、月度趋势与年度趋势会按明细自动生成。

## Baserow 云端后台

项目根目录的 `.env` 保存 Baserow API URL、token 和 table ID。启动 `node server.mjs` 后：

- `Authorization User` 用于云端授权用户。当前表没有单独的用户名/密码字段，因此服务器会把用户名、密码和职位保存到 `Notes` 的内部 JSON 中，`Name` 用于显示名，`Active` 控制启用状态。
- `Install_Base` 用于云端装机明细。页面读取它并结合 `Product_Master`、`Customer_Master`、`Sales_Partner_Master` 自动生成前台 dashboard。
- 导入装机 Excel 后，服务器会按 `装机编号` 增量写入 Baserow：编号已存在则更新，编号不存在则新增，Excel 中没出现的旧记录会保留。若 `装机编号` 留空，系统会按产品、型号、客户、日期和渠道自动生成稳定编号。
- 1180 与 IC MIC 的导入记录会在 `Remarks` 中自动标记 `TEST_DATA_1180` / `TEST_DATA_IC_MIC`，便于测试结束后批量删除；Tegris 不会加测试标记。

`.env` 内含 token，请不要分享或提交到代码仓库。

## GitHub 与 Cloudflare Pages 部署指南

### 1. 本地部署前检查

先在本地确认当前版本正常：

```bash
node server.mjs
```

打开：

```text
http://localhost:8080
```

至少验证下面几项：

- 管理员可登录：`Maquet / 123win`
- 普通用户可登录
- 看板数据正常显示
- 修改密码正常
- 用户 Excel 导入正常
- 装机数据 Excel 导入正常

### 2. 推送到 GitHub

如果当前目录还不是 Git 仓库：

```bash
git init
git branch -M main
```

提交前先检查：

```bash
git status --short
```

以下文件不应该进入仓库：

- `.env`
- `data/authorized-users.json`
- `.DS_Store`

然后提交并推送：

```bash
git add .
git commit -m "Deploy dashboard with secure auth"
git remote add origin <你的 GitHub 仓库地址>
git push -u origin main
```

### 3. 创建 Cloudflare Pages 项目

在 Cloudflare Dashboard 中：

1. 打开 `Workers & Pages`
2. 选择 `Create application`
3. 选择 `Pages`
4. 选择 `Connect to Git`
5. 连接 GitHub 仓库

构建配置建议如下：

- Framework preset: `None`
- Root directory: 仓库根目录
- Build command: 留空
- 如果界面强制要求命令，可填 `exit 0`
- Build output directory: `/`

### 4. Cloudflare 必填变量

进入：

`Settings -> Variables and Secrets`

在 **Production** 环境中配置：

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

注意：

- `BASEROW_TOKEN` 使用 Secret
- `SESSION_SECRET` 使用 Secret
- 一定要确认是配置在 **Production**，不是只配置在 Preview

### 5. 当前版本依赖的 Pages Functions

当前项目不能只部署静态文件，还需要同时部署整个 `functions/api/` 目录，关键接口包括：

- `functions/api/session.js`
- `functions/api/session/password.js`
- `functions/api/users.js`
- `functions/api/dashboard-data.js`

这些接口分别负责：

- 登录与登录态校验
- 修改密码
- 授权用户导入
- 装机数据读取与写入

### 6. 首次部署后的验证

先检查接口，再检查页面。

未登录访问：

```text
https://你的域名/api/session
```

预期：返回 `401`

然后打开首页：

```text
https://你的域名
```

用管理员账号登录：

```text
Maquet / 123win
```

登录后建议依次验证：

- `/api/session` 返回当前用户
- 修改密码正常
- 用户 Excel 导入正常
- 装机数据导入正常
- 普通用户可登录并浏览 dashboard

### 7. 日常更新流程

以后更新页面只需要：

```bash
git add .
git commit -m "Update dashboard"
git push
```

Cloudflare Pages 会自动重新部署，部署完成后直接在线验证。

### 8. 常见问题排查

`Failed to fetch`
: 通常是使用了 `file://` 打开页面。请改用 `http://localhost:8080` 或线上域名。

`用户名或密码不正确`
: 先检查 Cloudflare Production 的 `BASEROW_API_URL`、`BASEROW_AUTH_USERS_TABLE_ID`、`BASEROW_TOKEN` 是否与本地一致。

`error 1101`
: 通常是 Cloudflare Pages Function 运行时异常。请查看 Functions 日志或最近代码变更。

改密码接口 404
: 说明缺少 `functions/api/session/password.js`，当前版本已经包含该文件。

### 9. 安全建议

- 不要提交 `.env`
- 不要提交 `data/authorized-users.json`
- 如果曾经暴露过 `BASEROW_TOKEN`，请尽快在 Baserow 中轮换
- `SESSION_SECRET` 应使用随机长字符串，并妥善保存

### Cloudflare Pages 配置

如果部署在 Cloudflare Pages，不能只上传静态文件；需要同时部署整个 `functions/api/` 目录。当前登录、改密、用户导入和装机数据同步分别依赖：

- `functions/api/session.js`
- `functions/api/session/password.js`
- `functions/api/users.js`
- `functions/api/dashboard-data.js`

这样线上登录、修改密码、用户 Excel 导入和装机 Excel 导入才会走 Cloudflare Pages Functions，而不是只停留在当前浏览器。

在 Cloudflare Pages 的 Settings -> Environment variables 中配置：

```text
BASEROW_API_URL=https://api.baserow.io
BASEROW_TOKEN=你的 Baserow token
BASEROW_AUTH_USERS_TABLE_ID=955652
BASEROW_INSTALL_BASE_TABLE_ID=951860
BASEROW_PRODUCT_TABLE_ID=951856
BASEROW_CUSTOMER_TABLE_ID=951857
BASEROW_SALES_PARTNER_TABLE_ID=951858
SESSION_SECRET=一段随机且足够长的会话签名密钥
```

配置后重新部署。线上页面访问 `/api/users` 和 `/api/dashboard-data` 都返回 200 时，用户列表和装机数据导入才会跨设备同步。

Cloudflare Pages 推荐步骤：

1. 新建 GitHub 仓库，把本目录里除 `.env` 以外的文件推送上去。
2. Cloudflare Dashboard -> Workers & Pages -> Create application -> Pages -> Connect to Git。
3. 选择仓库，Framework preset 选 `None`，Build command 留空，Build output directory 填 `/`。
4. 部署后进入项目 Settings -> Variables and Secrets，添加上面 7 个变量。`BASEROW_TOKEN` 和 `SESSION_SECRET` 都选择 Secret。
5. 回到 Deployments，点击 Retry deployment 或重新触发一次部署。
6. 打开线上地址测试：

```text
https://你的域名/api/session
https://你的域名/api/users
https://你的域名/api/dashboard-data
```

7. 其中 `/api/session` 未登录时应返回 401，登录后再访问应返回当前用户；`/api/users` 需要管理员登录后访问；`/api/dashboard-data` 需要登录后访问。
8. 这三个接口都正常后，同事就可以在 Cloudflare 页面右上角导入装机 Excel；数据会增量写入 Baserow，其他设备刷新即可读取最新 dashboard。
