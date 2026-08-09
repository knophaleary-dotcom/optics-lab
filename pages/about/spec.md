---
title: 内容规范
date: 2026-08-08
category: 关于
---

## 文档规范

### 编码

所有文件必须使用 **UTF-8 无 BOM** 编码。乱码的根本原因就是编码不一致。

### 文件头 (Frontmatter)

每个 `.md` 文件必须以 YAML 头开始：

```yaml
---
title: 文档标题
date: 2026-08-08
category: 所属分类
---

正文从这里开始...
```

### 标题层级

- `#` 用于页面主标题（每个文件只用一次）
- `##` 用于小节标题
- `###` 用于子节标题

## LaTeX 公式规范

### 行内公式

```latex
透镜相位：$t(x,y) = \exp(-ik(x^2+y^2)/2f)$
```

### 独立公式

```latex
夫琅禾费衍射：
$$ U(x,y,z) = \frac{e^{ikz}}{i\lambda z}
   \iint U(\xi,\eta,0) e^{-i2\pi(x\xi+y\eta)/(\lambda z)} d\xi d\eta $$
```

### 常用符号

| 符号 | LaTeX | 含义 |
|------|-------|------|
| $\lambda$ | `\lambda` | 波长 |
| $\theta$ | `\theta` | 角度 |
| $\pi$ | `\pi` | 圆周率 |
| $\mathcal{F}$ | `\mathcal{F}` | 傅里叶变换 |
| $\otimes$ | `\otimes` | 卷积 |
| $\exp$ | `\exp` | 指数函数 |
| $\text{sinc}$ | `\text{sinc}` | sinc函数 |
| $\sqrt{}$ | `\sqrt{}` | 平方根 |

### 避免乱码的规则

1. **不要在公式里写中文**——中文放公式外面
2. **反斜杠要双写**（在 Markdown 中是 `\\` → 显示为 `\`）
3. **用 `\text{}` 包裹公式内的英文单词**（如 `\text{sinc}`）

## 代码块规范

```python
# 程序代码用三反引号包裹
import numpy as np
x = np.linspace(0, 10, 100)
```

指定语言可以获得语法高亮：\`\`\`python, \`\`\`bash, \`\`\`cpp

## 图片规范

- 放到 `pages/` 同目录下的 `images/` 文件夹
- 引用：`![描述](images/filename.png)`
- 推荐格式：PNG（无损）
- 推荐宽度：不超过 800px

## 命名规范

- 文件名：英文小写 + 连字符，如 `fourier-optics-intro.md`
- 不要用中文文件名（容易乱码）
- 不要用空格（URL 不友好）
