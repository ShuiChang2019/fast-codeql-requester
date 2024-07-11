// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import axios from 'axios';


export function activate(context: vscode.ExtensionContext) {

	
	console.log('Congratulations, your extension "FastQL_Docker" is now active!');
			
	let disposable2 = vscode.commands.registerCommand('extension.sendToCodeQLDocker', async () =>{
		const editor = vscode.window.activeTextEditor;
		if (editor){
			// Get selection
			const selection = editor.selection;
			const text = editor.document.getText(selection);
			// Get configuration
			const config = vscode.workspace.getConfiguration('CodeQL_Server_API');
			const uri = config.get<string>('uri','');

			if (text){
				try {
					vscode.window.showInformationMessage(`Sending ${text} to CodeQLDocker`);
					const response = await axios.post(uri,{rawcode: text});
				} catch (error){
					vscode.window.showErrorMessage(`Error: ${error}`);
				} 
			} else {
				vscode.window.showInformationMessage('No code selected');
			}	
		}
	});

	context.subscriptions.push(disposable2);
}

// This method is called when your extension is deactivated
export function deactivate() {}
