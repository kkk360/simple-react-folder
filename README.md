# Simple React Folder

一个简单易用的 VSCode 插件，用于快速创建 React 组件文件夹结构。

## 功能特性

- 🚀 **一键创建**：右键菜单快速创建 React 组件文件夹
- 📁 **标准结构**：自动生成包含 `index.tsx` 和 `index.module.scss` 的组件文件夹
- 🎨 **样式模板**：自动生成 TypeScript React 组件和样式模块文件
- ⚡ **智能命名**：支持自定义组件名称，自动应用到文件和样式类名
- 🔧 **开发友好**：创建后自动在资源管理器中显示并支持重命名
- ⚙️ **可配置**：支持自定义样式文件扩展名（.scss、.css、.less、.sass）

## 配置

### 自定义样式文件扩展名

您可以在 VSCode 设置中自定义生成的样式文件扩展名：

1. 打开 VSCode 设置（`Ctrl+,` 或 `Cmd+,`）
2. 搜索 "Simple React Folder"
3. 找到 "Style File Extension" 设置项
4. 输入您想要的扩展名（支持：`.scss`、`.css`、`.less`、`.sass`）

默认值为 `.scss`。

### 通过 settings.json 配置

您也可以直接在 `settings.json` 文件中添加配置：

```json
{
  "simpleReactFolder.styleFileExtension": ".css"
}
```

## 使用方法

### 创建 React 组件

1. **右键菜单方式**：
   - 在 VSCode 资源管理器中右键点击目标文件夹
   - 选择 "New React Component" 选项

2. **命令面板方式**：
   - 按 `Ctrl+Shift+P` (Windows/Linux) 或 `Cmd+Shift+P` (macOS)
   - 输入 "New React Component"
   - 选择命令并执行

### 输入组件名称

在弹出的输入框中输入组件名称（例如：`MyComponent`），插件将自动创建以下文件结构：

```
MyComponent/
├── index.tsx
└── index.module.scss  # 扩展名可通过配置自定义
```

## 生成的文件内容

### index.tsx
```tsx
import React from 'react';
import Style from './index.module.scss';

interface MyComponentProps {
    // define your props here
}

export const MyComponent: React.FC<MyComponentProps> = () => {
    return (
        <div className={Style.MyComponent}>
            MyComponent Component
        </div>
    );
};

export default MyComponent;
```

### index.module.scss (或其他配置的扩展名)
```scss
.MyComponent {
    // add your styles here
}
```

## 系统要求

- VSCode 1.80.0 或更高版本
- Node.js 16.0.0 或更高版本（开发环境）

## 开发

### 本地开发设置

1. 克隆仓库：
   ```bash
   git clone https://github.com/kkk360/simple-react-folder
   cd simple-react-folder
   ```

2. 安装依赖：
   ```bash
   npm install
   ```

3. 编译 TypeScript：
   ```bash
   npm run compile
   ```

4. 在 VSCode 中按 F5 启动调试

### 构建和发布

```bash
# 构建扩展包
npm run package

# 发布到 VSCode 扩展市场
npm run publish
```

## 许可证

MIT License

## 贡献

欢迎提交 Issue 和 Pull Request！

## 更新日志

### v0.0.3
- 新增配置功能：支持自定义样式文件扩展名
- 支持 .scss、.css、.less、.sass 等扩展名
- 优化文件生成逻辑

### v0.0.2
- 初始版本发布
- 支持创建 React 组件文件夹
- 自动生成 TypeScript 和 SCSS 文件模板

## 作者

wangxiaohai

## 仓库地址

https://github.com/kkk360/simple-react-folder
