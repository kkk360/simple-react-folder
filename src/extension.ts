import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('simple-react-folder.create', async (uri: vscode.Uri) => {
        // 获取目标路径（右键选中的路径或工作区根路径）
        const targetUri = uri || vscode.workspace.workspaceFolders?.[0].uri;
        if (!targetUri) {
            vscode.window.showErrorMessage('Please select a folder');
            return;
        }

        try {
            // 提示用户输入组件名称
            const componentName = await vscode.window.showInputBox({
                prompt: 'input component name',
                placeHolder: 'MyComponent'
            });

            if (!componentName) {
                return; // 用户取消输入
            }

            // 使用用户输入的名称创建文件夹
            const folderPath = path.join(targetUri.fsPath, componentName);
            fs.mkdirSync(folderPath);

            // 创建空的 index.tsx
            fs.writeFileSync(path.join(folderPath, 'index.tsx'), '');

            // 创建空的 index.module.scss
            fs.writeFileSync(path.join(folderPath, 'index.module.scss'), '');

            // 获取创建的文件夹的 URI
            const folderUri = vscode.Uri.file(folderPath);

            // 打开文件浏览器并选中新建的文件夹
            await vscode.commands.executeCommand('revealInExplorer', folderUri);

            // 触发重命名操作
            setTimeout(async () => {
                const edit = new vscode.WorkspaceEdit();
                const newFolderUri = vscode.Uri.file(folderPath);
                await vscode.commands.executeCommand('fileutils.renameFile', newFolderUri);
            }, 100);

        } catch (error) {
            vscode.window.showErrorMessage(`Error: ${error}`);
        }
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}