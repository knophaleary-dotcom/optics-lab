---
title: 仿真1：傅里叶变换基础 (sim01)
date: 2026-08-06
category: 傅里叶光学 / 仿真
---

对应讲义第1讲，Goodman Ch.2。5张教学图。

## 演示内容

| 图 | 变换对 | 意义 |
|----|--------|------|
| `01_rect_sinc.png` | rect(x) ↔ sinc(f) | 单缝衍射的数学根源 |
| `01_gibbs.png` | 方波 ≈ Σ正弦波 | 吉布斯现象（过冲~9%无法消除）|
| `01_comb.png` | comb(x) ↔ comb(f) | 光栅 = 梳状结构 → 离散衍射级 |
| `01_convolution.png` | f⊗g ↔ F·G | 卷积定理：成像分析的核心工具 |
| `01_airy.png` | circ(r) ↔ Airy(J₁/x) | 圆孔 → 艾里斑，分辨率极限 |

## 核心公式

**傅里叶变换对**：$F(f_x) = \int f(x) e^{-i2\pi f_x x} dx$

**卷积定理**：$\mathcal{F}\{f \otimes g\} = \mathcal{F}\{f\} \cdot \mathcal{F}\{g\}$

**艾里斑第一暗环**：$r = 1.22 \lambda z / D$（瑞利判据）

## 运行方式

```bash
cd sim
python sim01_fourier_basics.py
```

## 关键直觉

- **窄的信号 → 宽的频谱**；宽的信号 → 窄的频谱
- 单缝衍射图案 = sinc² 曲线 —— 这就是傅里叶变换在物理世界的直接体现
- 双缝 = 单缝 × cos调制 = 卷积定理的应用
