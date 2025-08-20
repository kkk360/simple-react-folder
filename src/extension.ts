import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "simple-react-folder.create",
    async (uri: vscode.Uri) => {
      // 获取目标路径（右键选中的路径或工作区根路径）
      const targetUri = uri || vscode.workspace.workspaceFolders?.[0].uri;
      if (!targetUri) {
        vscode.window.showErrorMessage("Please select a folder");
        return;
      }

      try {
        // 提示用户输入组件名称
        const componentName = await vscode.window.showInputBox({
          prompt: "input component name",
          placeHolder: "MyComponent",
        });

        if (!componentName) {
          return; // 用户取消输入
        }

        // 使用用户输入的名称创建文件夹
        const folderPath = path.join(targetUri.fsPath, componentName);
        fs.mkdirSync(folderPath);

        // 获取配置的样式文件扩展名
        const config = vscode.workspace.getConfiguration("simpleReactFolder");
        const styleExtension = config.get<string>(
          "styleFileExtension",
          ".scss"
        );

        // 创建 index.tsx 并添加模板内容
        const indexTsxContent = `import React from 'react';
import Style from './index.module${styleExtension}';

interface ${componentName}Props {
    // define your props here
}

const ${componentName}: React.FC<${componentName}Props> = () => {
    return (
        <div className={Style.${componentName}}>
            ${componentName} Component
        </div>
        );
};

export default ${componentName};
`;
        fs.writeFileSync(path.join(folderPath, "index.tsx"), indexTsxContent);

        // 创建样式文件并添加基础样式
        const styleContent = `.${componentName} {
    // add your styles here
}`;
        const styleFileName = `index.module${styleExtension}`;
        fs.writeFileSync(path.join(folderPath, styleFileName), styleContent);

        // 获取创建的文件夹的 URI
        const folderUri = vscode.Uri.file(folderPath);

        // 打开文件浏览器并选中新建的文件夹
        await vscode.commands.executeCommand("revealInExplorer", folderUri);

        // 触发重命名操作
        setTimeout(async () => {
          const edit = new vscode.WorkspaceEdit();
          const newFolderUri = vscode.Uri.file(folderPath);
          await vscode.commands.executeCommand(
            "fileutils.renameFile",
            newFolderUri
          );
        }, 100);
      } catch (error) {
        vscode.window.showErrorMessage(`Error: ${error}`);
      }
    }
  );

  // 添加 createPage 命令
  let createPageDisposable = vscode.commands.registerCommand(
    "simple-react-folder.createPage",
    async (uri: vscode.Uri) => {
      // 获取目标路径（右键选中的路径或工作区根路径）
      const targetUri = uri || vscode.workspace.workspaceFolders?.[0].uri;
      if (!targetUri) {
        vscode.window.showErrorMessage("Please select a folder");
        return;
      }

      try {
        // 提示用户输入页面名称
        console.log("Creating page component...");
        const pageName = await vscode.window.showInputBox({
          prompt: "input page name",
          placeHolder: "HomePage",
        });

        if (!pageName) {
          return; // 用户取消输入
        }

        // 使用用户输入的名称创建文件夹
        const folderPath = path.join(targetUri.fsPath, pageName);
        fs.mkdirSync(folderPath);

        // 获取配置的样式文件扩展名
        const config = vscode.workspace.getConfiguration("simpleReactFolder");
        const styleExtension = config.get<string>(
          "styleFileExtension",
          ".scss"
        );

        // 创建 index.tsx 并添加页面模板内容
        const indexTsxContent = `import React from 'react';
import type { GetServerSideProps } from 'next';
import Style from './index.module${styleExtension}';

interface I${pageName}Props {
    // define your props here
}

const ${pageName}: React.FC<I${pageName}Props> = () => {
    return (
        <div className={Style.${pageName}}>
            <h1>${pageName}</h1>
            <p>This is the ${pageName} page</p>
        </div>
        );
};
export const getServerSideProps: GetServerSideProps = async (ctx) => {
	// console.log("ctx", ctx);
	return {
		props: {
			xdata: null,
		},
	};
};
export default ${pageName};
`;
        fs.writeFileSync(path.join(folderPath, "index.tsx"), indexTsxContent);

        // 创建样式文件并添加基础样式
        const styleContent = `.${pageName} {

}`;
        const styleFileName = `index.module${styleExtension}`;
        fs.writeFileSync(path.join(folderPath, styleFileName), styleContent);

        // 获取创建的文件夹的 URI
        const folderUri = vscode.Uri.file(folderPath);

        // 打开文件浏览器并选中新建的文件夹
        await vscode.commands.executeCommand("revealInExplorer", folderUri);

        // 触发重命名操作
        setTimeout(async () => {
          const edit = new vscode.WorkspaceEdit();
          const newFolderUri = vscode.Uri.file(folderPath);
          await vscode.commands.executeCommand(
            "fileutils.renameFile",
            newFolderUri
          );
        }, 100);
      } catch (error) {
        vscode.window.showErrorMessage(`Error: ${error}`);
      }
    }
  );

  context.subscriptions.push(disposable, createPageDisposable);
}

export function deactivate() {}
