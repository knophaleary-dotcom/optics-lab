/**
 * ============================================================
 *   个人网站配置文件 — 修改这个文件来调整网站的外观和结构
 *   Personal Website Config — Edit this file to customize
 * ============================================================
 * 用法 / Usage:
 *   1. 修改下面的变量来改颜色、字体、布局
 *      Change the variables below to customize colors, fonts, layout
 *   2. 修改末尾的 NAV_ITEMS 来调整导航栏和分类下拉
 *      Edit NAV_ITEMS at the bottom to adjust navigation dropdowns
 *   3. 保存后刷新浏览器即可看到效果
 *      Save and refresh the browser to see changes
 * ============================================================
 */

const CONFIG = {
  // ---- 网站基本信息 / Site Info ----
  siteName: "Optics Lab",
  subtitle: "光学学习档案 · Optics Learning Archive",
  author: "Optics Student",
  language: "zh-CN",  // "zh-CN" or "en"

  // ---- 配色方案 / Color Scheme ----
  // 修改这些值来改变整个网站的配色
  // 预设方案: "dark-blue" | "dark-green" | "light-minimal" | "warm" | "custom"
  themePreset: "dark-blue",

  themes: {
    "dark-blue": {
      bg:           "#0d1117",
      surface:      "#161b22",
      border:       "#30363d",
      text:         "#c9d1d9",
      heading:      "#f0f6fc",
      muted:        "#8b949e",
      accent:       "#58a6ff",
      accent2:      "#f78166",
      codeBg:       "#1c2333",
      navWidth:     260,
    },
    "dark-green": {
      bg:           "#0a0f0a",
      surface:      "#121712",
      border:       "#2d3d2d",
      text:         "#c9d9c9",
      heading:      "#f0fcf0",
      muted:        "#8b9e8b",
      accent:       "#3fb950",
      accent2:      "#d29922",
      codeBg:       "#1c2a1c",
      navWidth:     260,
    },
    "light-minimal": {
      bg:           "#ffffff",
      surface:      "#f6f8fa",
      border:       "#d0d7de",
      text:         "#24292f",
      heading:      "#0a0a0a",
      muted:        "#656d76",
      accent:       "#0969da",
      accent2:      "#cf222e",
      codeBg:       "#f0f0f0",
      navWidth:     260,
    },
    "warm": {
      bg:           "#1e1a14",
      surface:      "#2a2520",
      border:       "#4a3f35",
      text:         "#d4c8b8",
      heading:      "#f5e6d3",
      muted:        "#9e8e7e",
      accent:       "#f39b2e",
      accent2:      "#e0554a",
      codeBg:       "#2e2822",
      navWidth:     260,
    },
  },

  // ---- 字体 / Fonts ----
  fonts: {
    body:    "'Segoe UI', 'Microsoft YaHei', sans-serif",
    heading: "'Segoe UI', 'Microsoft YaHei', sans-serif",
    code:    "'Cascadia Code', 'Fira Code', 'Consolas', monospace",
    math:    "'Cambria Math', 'Latin Modern Math', serif",
  },

  // ---- 布局 / Layout ----
  layout: {
    sidebarWidth: 260,       // 侧边栏宽度 (px)
    contentMaxWidth: 960,    // 内容最大宽度 (px)
    showSidebar: true,       // 是否显示侧边导航栏
    showTOC: true,           // 是否在文章页面显示目录
  },

  // ---- 首页 / Homepage ----
  homepage: {
    showHero: true,
    heroTitle: "欢迎来到我的光学实验室",
    heroSubtitle: "归档傅里叶光学、散斑结构光的学习笔记、仿真程序和交互演示",
    showRecentUpdates: true,
    recentCount: 6,
  },

  // ---- MathJax (LaTeX公式渲染) ----
  mathJax: {
    enabled: true,
    inlineDelimiters: [["$", "$"], ["\\(", "\\)"]],
    displayDelimiters: [["$$", "$$"], ["\\[", "\\]"]],
  },
};

// ============================================================
//   导航栏配置 / Navigation Configuration
//   ★ 在这里添加/修改/删除分类和子页面
//   ★ 支持无限层级的下拉菜单
// ============================================================
const NAV_ITEMS = [
  {
    // 一级分类 (有下拉菜单)
    label: "傅里叶光学",         // 显示名称
    icon: "📐",                  // 图标 (emoji)
    id: "fourier-optics",        // 唯一标识
    description: "从物理图像出发，以DOE设计为主线",
    children: [
      {
        label: "教学讲义",
        id: "lecture-notes",
        type: "document",        // type: "document" | "interactive" | "program" | "link"
        path: "fourier-optics/lecture-notes",
        source: "pages/fourier-optics/lecture-notes.md",
        description: "7讲完整讲义，标注Goodman章节",
      },
      {
        label: "教学PPT (网页版)",
        id: "lecture-web",
        type: "document",
        path: "fourier-optics/lecture-web",
        source: "pages/fourier-optics/教学网页.md",
        description: "21页深色主题交互式教学网页",
      },
      {
        label: "仿真1：傅里叶变换基础",
        id: "sim01",
        type: "program",
        path: "fourier-optics/sim01",
        source: "pages/fourier-optics/sim01.md",
        description: "rect→sinc, comb, 卷积定理, 艾里斑",
      },
      {
        label: "仿真2：标量衍射理论",
        id: "sim02",
        type: "program",
        path: "fourier-optics/sim02",
        source: "pages/fourier-optics/sim02.md",
        description: "角谱法ASM、夫琅禾费、菲涅尔衍射",
      },
      {
        label: "仿真3：透镜与4f系统",
        id: "sim03",
        type: "program",
        path: "fourier-optics/sim03",
        source: "pages/fourier-optics/sim03.md",
        description: "透镜傅里叶变换、4f空间滤波",
      },
      {
        label: "仿真4：DOE设计",
        id: "sim04",
        type: "program",
        path: "fourier-optics/sim04",
        source: "pages/fourier-optics/sim04.md",
        description: "GS算法、达曼光栅3×3",
      },
      {
        label: "交互演示：角度-频率映射器",
        id: "angle-mapper",
        type: "interactive",
        path: "fourier-optics/angle-mapper",
        source: "pages/fourier-optics/angle-mapper.md",
        description: "sin(θ)=λ/Lx 几何演示",
      },
    ],
  },
  {
    // 第二个一级分类
    label: "散斑结构光",
    icon: "🔬",
    id: "structured-light",
    description: "VCSEL→DOE 3×3→深度计算全链路仿真",
    children: [
      {
        label: "项目总览",
        id: "sl-overview",
        type: "document",
        path: "structured-light/overview",
        source: "pages/structured-light/overview.md",
        description: "系统架构、光学链路、文件结构",
      },
      {
        label: "VCSEL 阵列生成",
        id: "sl-vcsel",
        type: "program",
        path: "structured-light/vcsel",
        source: "pages/structured-light/vcsel.md",
        description: "随机坐标生成，三种布局策略",
      },
      {
        label: "DOE 设计与仿真",
        id: "sl-doe",
        type: "program",
        path: "structured-light/doe",
        source: "pages/structured-light/doe.md",
        description: "Dammann光栅、IFTA、3×3分束",
      },
      {
        label: "深度计算",
        id: "sl-depth",
        type: "program",
        path: "structured-light/depth",
        source: "pages/structured-light/depth.md",
        description: "NCC块匹配、SGM、视差→深度",
      },
      {
        label: "3×3 散斑投影演示",
        id: "sl-speckle-demo",
        type: "interactive",
        path: "structured-light/speckle-demo",
        source: "pages/structured-light/speckle-demo.md",
        description: "浏览器内交互查看3×3散斑场",
      },
    ],
  },
  {
    // 不需要下拉的单独链接
    label: "交互演示集",
    icon: "🎮",
    id: "interactive",
    description: "交互式可视化演示程序",
    children: [
      {
        label: "角度-频率映射器",
        id: "demo-angle",
        type: "interactive",
        path: "interactive/angle-mapper",
        source: "pages/interactive/angle-mapper.md",
        description: "sin(θ)=λ/Lx 几何关系演示",
      },
      {
        label: "单缝衍射演示",
        id: "demo-slit",
        type: "interactive",
        path: "interactive/slit-diffraction",
        source: "pages/interactive/slit-diffraction.md",
        description: "拖动滑块改变缝宽和波长",
      },
    ],
  },
  {
    label: "视觉科学",
    icon: "👁️",
    id: "vision-science",
    description: "视觉系统与神经计算：侧抑制、空间滤波、错觉现象",
    children: [
      {
        label: "侧抑制效应与视觉错觉",
        id: "lateral-inhibition",
        type: "link",
        path: "vision-science/lateral-inhibition",
        source: "pages/vision-science/lateral-inhibition.html",
        description: "马赫带、赫曼方格、同时对比度——空间高通滤波的神经基础",
      },
    ],
  },
  {
    label: "关于本站",
    icon: "ℹ️",
    id: "about",
    description: "网站说明与使用指南",
    children: [
      {
        label: "使用指南",
        id: "guide",
        type: "document",
        path: "about/guide",
        source: "pages/about/guide.md",
        description: "如何添加内容、修改样式、上传文件",
      },
      {
        label: "内容规范",
        id: "spec",
        type: "document",
        path: "about/spec",
        source: "pages/about/spec.md",
        description: "文档格式要求、LaTeX规范、程序规范",
      },
    ],
  },
];

// 导出供主程序使用
if (typeof module !== 'undefined') module.exports = { CONFIG, NAV_ITEMS };
