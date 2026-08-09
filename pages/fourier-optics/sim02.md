---
title: 仿真2：标量衍射理论 (sim02)
date: 2026-08-06
category: 傅里叶光学 / 仿真
---

对应讲义第2讲，Goodman Ch.3-4。4张教学图。

## 演示内容

| 图 | 内容 | 关键结论 |
|----|------|---------|
| `02_apertures.png` | 单缝/双缝/光栅衍射 | 远场图案 = 孔径傅里叶变换 |
| `02_asm_evolution.png` | ASM传播演化 | 近场→远场：菲涅尔数 N_F 判断 |
| `02_asm_vs_fraunhofer.png` | ASM与夫琅禾费对比 | 远场时两者完全一致 |
| `02_fresnel.png` | 菲涅尔近场衍射 | 方孔边缘振铃波纹 |

## 核心公式

**角谱传递函数**：$$H(f_x,f_y;z) = \exp\left(i\frac{2\pi}{\lambda}z\sqrt{1-\lambda^2(f_x^2+f_y^2)}\right)$$

**菲涅尔数**：$$N_F = a^2/(\lambda z)$$ — N_F>>1近场，N_F<<1远场

**夫琅禾费条件**：$$z \gg a^2/\lambda$$

## 运行方式

```bash
cd sim
python sim02_diffraction.py
```
