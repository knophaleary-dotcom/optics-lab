---
title: 角度-频率映射器 (交互演示)
date: 2026-08-07
category: 交互演示
---

拖动滑块改变平面波的入射角 θ，观察 sin(θ) = λ/Lx = λ·fx 的几何意义。

## 运行方式

```bash
cd "C:\UA_study\Fourier optics\teaching"
python demo_angle_mapper.py
```

## 物理原理

平面波以角度 θ 入射到观测平面 (z=0) 上：

$$ \sin(\theta) = \frac{\lambda}{L_x} = \lambda \cdot f_x $$

- θ 越大 → 空间周期 Lx 越短 → 空间频率 fx 越高
- θ = 90° → Lx = λ（最短周期，对应 Nyquist 采样极限）

## 视觉元素

- **红色斜线**：波前（等相位面）
- **黑色水平线**：观测平面 (z=0)
- **红色圆点**：波前与观测面的交点
- **蓝色双向箭头**：空间周期 Lx
