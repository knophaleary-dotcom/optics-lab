---
title: VCSEL 阵列生成
date: 2026-08-01
category: 散斑结构光 / 发射端
---

## 5种布局策略

| 方法 | 特点 |
|------|------|
| grid_random | 规则网格 + 均匀随机偏移（默认）|
| grid_quasi_random | 矩形网格 + 极坐标准随机抖动 |
| grid_min_spacing | 网格 + 随机 + 最小距离硬约束 |
| low_discrepancy | Halton低差异序列（非冗余矩形布局）|
| non_redundant | 费马螺旋（最大散斑唯一性）|

## 关键参数

- 网格间距：40μm
- 随机偏移：±间距×25%
- 波长：940nm
- 发散角：20° FWHM
- 单点功率：5mW

## 质量指标

**峰值旁瓣比 (PSR)**：越高 → 散斑越独特
**散斑对比度 C = σ/μ**：≈1.0 = 完全发展散斑

## 代码位置

```bash
cd "C:\UA study\claude\test\python_sim"
python demo_vcsel.py
```
