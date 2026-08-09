---
title: 网站使用指南
date: 2026-08-08
category: 关于
---

## 如何添加新内容

### 1. 添加新文档

在 `pages/` 目录下创建 `.md` 文件（Markdown格式），然后在 `config.js` 的 `NAV_ITEMS` 中添加对应条目。

**示例**：添加一篇新文章

```javascript
// 在 config.js 的 NAV_ITEMS 中找到你要放的分类
{
  label: "我的新文章",
  id: "my-article",
  type: "document",
  path: "fourier-optics/my-article",
  source: "/pages/fourier-optics/my-article.md",
  description: "这篇文章讲什么",
}
```

### 2. 添加交互演示

type 设为 `"interactive"`，在 `assets/js/main.js` 的 `loadInteractive` 函数中添加对应的渲染函数。

### 3. 添加程序/代码

type 设为 `"program"`，source 指向说明该程序的 `.md` 文件。

## 如何修改网站样式

### 快速换色（推荐新手）

打开 `config.js`，找到第 ~20 行的 `themePreset`：

```javascript
themePreset: "dark-blue",   // 改这个！
// 可选: "dark-blue" | "dark-green" | "light-minimal" | "warm"
```

保存后刷新浏览器即可看到变化。

### 自定义颜色（进阶）

在 `config.js` 的 `themes` 对象中添加你自己的配色方案，格式参考已有的四种。

### 改字体

修改 `config.js` 的 `fonts.body` 和 `fonts.heading`。

### 改布局

修改 `config.js` 的 `layout.sidebarWidth` 和 `layout.contentMaxWidth`。

## 文件结构

```
website/
├── index.html          ← 主页面（不要改）
├── config.js           ← ★ 配置文件：颜色/字体/导航（你改这个）
├── assets/
│   ├── css/style.css   ← 样式表（进阶用户可改）
│   └── js/main.js      ← 核心引擎（不要改）
└── pages/              ← ★ 内容页面（你在这里添加 .md 文件）
```

## 注意事项

- 所有 `.md` 文件请用 **UTF-8 编码**保存
- LaTeX 公式用 `$...$`（行内）或 `$$...$$`（独立行）
- 代码块用 \`\`\`python ... \`\`\` 包裹
