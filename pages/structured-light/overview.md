---
title: 散斑结构光项目总览
date: 2026-08-01
category: 散斑结构光
---

单目散斑结构光 3D 成像系统全链路仿真。

## 系统架构

```
VCSEL阵列 → 准直镜 → DOE(3×3) → 目标面散斑
                                    ↓
                          成像镜头 + CMOS Sensor
                                    ↓
                         标定 → 深度计算 → 优化
```

## 关键参数

| 参数 | 值 |
|------|-----|
| VCSEL | 32×32阵列, 940nm, 20° FWHM |
| 准直镜 | f=3.0mm, NA=0.4 |
| DOE | 3×3 Dammann光栅, 8台阶量化 |
| 基线 | 75mm |
| 投影距离 | 500mm |
| 成像镜头 | f=4.0mm, F/2.4 |
| Sensor | 1280×800, 3μm像素 |

## 项目位置

- **Python版**：`C:\UA study\claude\test\python_sim\`
- **C++版**：`C:\UA study\claude\test\`
- **设计文档**：`C:\UA study\claude\test\docs\`

## 快速开始

```bash
cd "C:\UA study\claude\test\python_sim"
python run_projector.py --quick
```
