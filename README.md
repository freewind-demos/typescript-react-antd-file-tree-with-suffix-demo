TypeScript React AntDesign File Tree With Suffix Demo
=====================================================

演示 antd `Tree` 组件渲染多层文件树，并在每个目录/文件节点**最右侧**显示 suffix 图标。

## 快速开始

```bash
pnpm install
pnpm start
```

## 布局要点

- `Tree` 开启 `blockNode` → 节点占满整行宽度
- 自定义 `title` 用 flex：`space-between` 把 suffix 图标推到最右
- 外层容器设固定宽度（如 360px），便于观察对齐效果
