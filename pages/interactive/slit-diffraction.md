---
title: 单缝衍射演示 (交互)
date: 2026-08-07
category: 交互演示
---

拖动滑块改变缝宽和波长，观察夫琅禾费单缝衍射图案的变化。

## 运行方式

```bash
cd "C:\UA_study\Fourier optics\teaching"
python demo_diffraction.py
```

## 物理原理

单缝夫琅禾费衍射：

$$ I(x) = I_0 \cdot \text{sinc}^2\left( \frac{a x}{\lambda z} \right) $$

- **缝越窄 (a越小)** → 衍射越宽（中央亮纹越散开）
- **波长越长 (λ越大)** → 衍射越宽
- **传播距离越远 (z越大)** → 屏幕上的衍射图案越大

## 关键结论

窄的信号 → 宽的频谱；宽孔径 → 窄衍射斑。

衍射极限：任何光学系统的分辨率由孔径大小决定。
