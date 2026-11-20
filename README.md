# MaxwellYHQ.github.io

我的个人主页。纯静态站点，不依赖任何框架和构建工具。

## 在线地址

https://maxwellyhq.github.io

## 技术栈

| 项目 | 选择 | 说明 |
| --- | --- | --- |
| 结构 | 原生 HTML5 | 语义化标签，无模板引擎 |
| 样式 | 原生 CSS | CSS 变量 + Grid/Flex 布局 + 媒体查询 |
| 交互 | 原生 JavaScript | 无依赖，直接操作 DOM |
| 部署 | GitHub Pages | 推送 main 分支后自动发布 |

## 目录结构

```
.
├── index.html      # 页面结构与内容
├── style.css       # 全部样式（含深色模式）
├── script.js       # 主题切换、滚动动效
├── README.md       # 本文件
└── .gitignore      # 不纳入版本管理的文件
```

## 本地预览

直接双击 `index.html`，浏览器即可打开，无需启动服务器。

## 开发计划

- [x] 初始化仓库，定义项目说明
- [ ] 搭建首屏 Hero 区域（姓名 + 一句话简介）
- [ ] 添加「关于我」区域
- [ ] 添加「技能」区域
- [ ] 添加「项目」区域
- [ ] 添加「联系方式」区域与页脚
- [ ] 移动端适配检查
- [ ] 部署到 GitHub Pages

## 协作约定

- 主分支 `main` 保持随时可发布，不直接在上面开发。
- 每个功能开独立分支，命名 `feat/xxx`、`fix/xxx`、`style/xxx`。
- 提交信息遵循 Conventional Commits：`feat:` 新功能、`fix:` 修复、`style:` 样式、`docs:` 文档、`chore:` 杂项。
- 通过 Pull Request 合并到 `main`，合并前自查一遍 diff。
