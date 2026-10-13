# GamesHub 日常维护指南（写给非技术同学）

所有内容都是 **Markdown 文件**（`.md`），用记事本或任意编辑器都能改。改完按发布流程上传，Actions 会自动构建上线。

## 1. 新增 / 编辑一篇攻略

目录：`src/games/kingshot/content/<栏目>/`

栏目对应：`guides`（攻略）、`codes`（兑换码）、`heroes`（英雄）、`tier-lists`（强度榜）、`events`（活动）。

每篇文件顶部有一段用 `---` 包起来的信息（frontmatter）：

```yaml
---
title: 文章标题
description: 一句话简介（会进搜索结果摘要）
section: guides          # guides/codes/heroes/tier-lists/events
publishedAt: 2026-10-09  # 发布日期
updatedAt: 2026-10-09    # 更新日期
featured: true           # 上首页 Featured 栏（建议同时只开 2-3 篇）
popular: false           # 上首页 Editor's Picks（不要和 featured 同时开）
author: GamesHub Editorial
---
```

下面正文用 Markdown 写即可。

## 2. 首页三栏怎么排（避免重复）

首页自动按规则分配，**不要把同一篇同时设 `featured: true` 和 `popular: true`**：

- Featured：`featured: true`，按日期新→旧。
- Editor's Picks：`popular: true` 且没被 Featured 选中。
- Latest：剩下所有，按日期新→旧。

想让某篇置顶：设 `featured: true`，并把 `publishedAt` 设为较新日期。

## 3. 正文里怎么放链接（重要）

- 站内链接直接写从根开始的路径即可，构建会自动补 `/GamesHub` 前缀：
  - 例：`[新手攻略](/games/kingshot/guides/beginner-guide/)`
- 也可以写相对路径：同目录 `[名](文件名/)`、去隔壁栏目 `[名](../codes/)`。
- 外部链接（http/https）不受影响，原样写。
- 链接结尾带 `/`，栏目页写到栏目名即可（如 `/games/kingshot/codes/`）。

## 4. 图片

- 默认会自动生成抽象分类封面，**这不是游戏实机截图**，可放心用（无版权问题）。
- 要用真实图：把有版权/授权的图放进文章可引用的位置，并在 frontmatter 加：
  ```yaml
  cover: /games/kingshot/你的图.webp
  ```
- 正文插图务必写 alt：`![描述](图片地址)`。严禁把来路不明或 AI 图冒充官方截图。

## 5. 兑换码内容纪律

- 只放**当前可核实有效**的码；拿不准就别写具体码和具体过期日。
- 过期就删或标注「已过期，以游戏内为准」。
- 不编造奖励内容；拿不准的写 *Pending verification*。

## 6. SEO 自查清单（每篇）

- title 不重复、含核心关键词；description 是通顺的一句话。
- 正文只有一个一级标题（frontmatter 的 title 已自动成为页面 H1，正文从 `##` 开始）。
- 有合适的栏目（section）；更新时改 `updatedAt`。
- 发布后可在 Google Search Console 提交 sitemap：
  `https://aicloud26.github.io/GamesHub/sitemap-index.xml`

## 7. 站点名 / 域名 / 部署

- 站点品牌统一为 **GamesHub**，游戏为 **Kingshot**；改名集中在
  `src/sites/gameatlas/site.config.ts` 与 `src/games/kingshot/config.ts`，别全篇手改。
- 生产域名与子路径由 GitHub Actions 的构建变量控制（`.github/workflows/deploy.yml`）：
  `PUBLIC_DOMAIN=aicloud26.github.io`、`PUBLIC_BASE=/GamesHub`、`SITE=gameshub`。
- **不要**去改 Cloudflare DNS 或换域名，除非你明确知道在做什么；本站托管在 GitHub Pages，Cloudflare 仅 DNS。

## 8. 加统计 / 广告（将来）

- 统计（如 GA/Plausible）或广告：在 `BaseLayout.astro` 的 `<head>` 加你自己账号的官方代码片段，先用测试号、上线前核对，不承诺审批结果。
- 广告位结构已预留，但当前**没有任何广告脚本**；接入前确认合规与体验。

## 9. 本地自检（可选，非必须）

```bash
npm install
PUBLIC_DOMAIN=aicloud26.github.io PUBLIC_BASE=/GamesHub SITE=gameshub npm run build:fast
npx astro check
```

构建产物在 `dist/`。页面 21 个、0 类型错误、0 死链即正常。不熟悉命令也没关系，直接上传由 Actions 构建即可，但建议上传后在 Actions 看绿勾并线上抽查链接。
