# GamesHub — 全站优化审计与发布说明

- 生产地址：https://aicloud26.github.io/GamesHub/
- 仓库：github.com/AIcloud26/GamesHub（GitHub Pages **项目子路径** `/GamesHub/`）
- 站点：Kingshot 攻略站（品牌名 GamesHub）
- 本次交付性质：一次性全站审计 → 修复 → UI/内容/SEO/性能/无障碍优化 → 本地测试。**未直接部署**（无仓库写权限），部署动作见文末，需你在 GitHub 网页完成。

---

## 1. 本次发现了什么（线上问题与根因）

| 现象 | 根因 |
| --- | --- |
| hero.svg、子页（Active Codes、About 等）404 | 所有链接/资源写成域名根绝对路径（`/games/...`、`/favicon.svg`），项目站实际前缀是 `/GamesHub/` |
| 首页 Featured / Popular / Latest 三栏重复 | 同一篇文章 `featured` 与 `popular` 都为 true，且 Latest 直接取全量，三栏高度重叠 |
| 导航、卡片、面包屑、信息页链接跳错 | 全站硬编码 `href="/..."`，没有 base 概念 |
| favicon / 图标加载异常 | 静态资源同样缺少 base 前缀 |
| 搜索在子路径下取不到索引 | fetch 写死 `/search-index.json` |
| robots sitemap 地址错误 | 拼接成根域名路径，缺 `/GamesHub/` |
| 品牌名不统一 | 代码内仍有临时名 GameAtlas，与线上 Kingshot/GamesHub 不一致 |
| 卡片封面缺失/不统一 | 无封面系统，404 占位 |
| 文章正文内链 404 | Markdown 正文里写成 `/games/kingshot/...` 根绝对链接 |

> 说明：GitHub 仓库页对匿名抓取返回拦截，以上以「线上实际渲染结果 + 本地源码」双重核实，非臆测。

## 2. 做了哪些修复

### 路由与子路径（核心）
- 新增统一 base 层：`src/engine/routing/paths.ts` 暴露 `BASE / withBase()`，所有游戏/栏目/文章路由自动带部署前缀。
- 新增 `src/engine/routing/assets.ts` 的 `asset()`，favicon、图标、hero 图等静态资源统一加前缀（http/data 链接原样放行）。
- `astro.config.mjs`：
  - 增加 `base`（由构建变量 `PUBLIC_BASE` 注入）；
  - 增加一个轻量 **remark 插件**，构建时自动给 Markdown **正文内链**补 base 前缀，外部链接和锚点不动。以后正文写 `/games/...` 也不会再 404。
- Header / Footer / 面包屑 / About / Privacy / Terms / Cookie / 游戏落地页 / 搜索 / robots 全部改走 base。
- canonical、OG、sitemap 全部输出为 `https://aicloud26.github.io/GamesHub/...`。

### 首页选稿去重
- Featured = `featured:true` 按日期；Editor's Picks = `popular:true` 且不在 Featured；Latest = 排除前两者。7 篇文章在首页各只出现 1 次（已验证）。
- 同步调整了文章 frontmatter 的 featured/popular 与日期，形成真实的三栏分布。

### UI / 组件 / 图片
- 新增统一封面组件 `ArticleThumb.astro`：16:9 抽象分类封面（指南/兑换码/英雄/强度榜/活动各有图标），非伪造游戏截图；支持以后用授权真图通过 `cover` 字段覆盖。
- `ArticleCard.astro` 统一卡片：封面、分类标签、`<time datetime>`、hover/focus 态。
- 重绘 favicon / icon / hero（城堡主视觉）/ logo 的 SVG；新增 `public/.nojekyll`。
- 响应式栅格优化，移动端卡片单列、触摸目标 ≥44px。

### 内容谨慎性（未编造）
- `active-codes` 删除了**无法核实的、带具体日期的过期码断言**，改为「不维护固定过期码列表、以游戏内为准」的稳妥表述。
- 全文未杜撰兑换码、英雄强度、奖励或测试经历；不确定项保留 Pending verification 口径。

### SEO / 性能 / 无障碍 / 安全
- 每页唯一 `<h1>`、规范 canonical、OG/Twitter、JSON-LD（WebSite / Breadcrumb / Article / FAQ）。
- 图片 `loading`/`decoding`，首屏 hero `fetchpriority="high"`，封面懒加载。
- `:focus-visible` 焦点样式、`prefers-reduced-motion` 降级、`theme-color`、语义化标签、alt 齐备。
- `overflow-x:hidden` 防横向溢出；未引入任何未授权第三方脚本、追踪或广告代码（仅保留广告位结构，无脚本）。

## 3. 改了哪些文件（主要）

- `astro.config.mjs`（base + remark 内链插件）
- `src/engine/routing/paths.ts`、`src/engine/routing/assets.ts`（新）
- `src/engine/components/ArticleThumb.astro`（新）、`ArticleCard.astro`、`home/ArticleRail.astro`
- `src/engine/layout/BaseLayout.astro`、`components/Header.astro`、`Footer.astro`、`HeroSection.astro`、`GamesDirectory.astro`
- `src/pages/index.astro`、`src/pages/games/[game]/index.astro`、`src/pages/games/index.astro`、`src/pages/search.astro`、`src/pages/robots.txt.ts`
- `src/pages/about|privacy|terms|cookie-policy.astro`
- `src/sites/gameatlas/site.config.ts`、`src/sites/index.ts`、`src/games/kingshot/config.ts`、`src/content.config.ts`
- `src/games/kingshot/content/**/*.md`（7 篇 frontmatter 与个别内链/措辞）
- `public/**` 与 `src/games/kingshot/assets/images/**`（SVG 资源、`.nojekyll`）
- `.github/workflows/deploy.yml`（项目站构建变量）

## 4. 本地测试结果（可复验）

构建命令（与线上 Actions 一致）：

```bash
PUBLIC_DOMAIN=aicloud26.github.io PUBLIC_BASE=/GamesHub SITE=gameshub npm run build:fast
```

- `astro check`：**0 errors**（46 文件）。
- 构建：**21 个页面**成功。
- 全站链接爬取（含正文 `<a href>`、CSS/JS/图片资源）：**29 个内部目标，0 死链；0 个残留根路径链接；0 个缺失资源**。
- 无头浏览器（桌面 1366 / 移动 390 / 小屏 360）× 7 类页面：
  - 每页恰好 1 个 `<h1>`；
  - 无横向滚动条；
  - **0 个 4xx / 失败请求**；
  - 正文无裸根路径内链。
- 搜索实测：关键词返回结果，链接均带 `/GamesHub` 前缀。

> 测试在本地以 `/GamesHub/` 子路径静态服务方式进行，等价于 GitHub Pages 项目站环境。

## 5. 已知边界（不夸大）

- 未实际部署（无仓库凭证）；上线需你执行下方动作并以 Actions 绿勾为准。
- 兑换码、英雄数值等强时效内容不在源码里硬编码具体值，需上线后按游戏内实况维护。
- 不承诺 Google 收录/排名/广告审批结果；sitemap/robots/结构化数据已就绪，收录需时间。
- 封面为抽象占位图，**不是真实游戏截图**；要上真实截图请用有版权/授权的图并填 `cover`。

## 6. 部署动作（你来做，约 5 分钟）

方式 A（推荐，保留自动构建）：
1. 打开 github.com/AIcloud26/GamesHub，进入 **Settings → Pages**。
2. **Build and deployment → Source** 选 **GitHub Actions**。
3. 把本压缩包解压后的**全部内容**覆盖上传到仓库根目录（关键：`.github/workflows/deploy.yml`、`public/.nojekyll` 这类点开头文件要显示并上传；macOS 用 Cmd+Shift+. 显示隐藏文件）。
4. 提交后进入 **Actions** 标签，等 “Deploy Astro site to GitHub Pages” 出现绿勾（约 1–2 分钟）。
5. 访问 https://aicloud26.github.io/GamesHub/ ，强刷（Ctrl/Cmd+Shift+R）核对：首页三栏不重复、Active Codes / About 能打开、favicon 与 hero 图正常。

方式 B（不想用 Actions）：仓库 Actions 已配好，不建议改用“分支直传 dist”。若坚持，需要本地先 build 出 `dist/` 再传，并自行处理子路径，不推荐。

回滚：在仓库 **Commits** 里找到上一个正常版本点 **Revert**，或在 Pages 的 deployment 历史里回退；Actions 会自动重新部署旧版。
