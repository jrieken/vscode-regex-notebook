import { TextDecoder } from 'node:util';
import * as vscode from 'vscode';


const serializer = new class implements vscode.NotebookSerializer {

	dataToNotebook(data: Uint8Array): vscode.NotebookData {
		const str = new TextDecoder().decode(data);
		const cells = JSON.parse(str);
		return new vscode.NotebookData(cells);
	}

	notebookToData(data: vscode.NotebookData): Uint8Array {
		const cells = data.cells;
		const str = JSON.stringify(cells, undefined, 2);
		return Buffer.from(str);
	}
};

const contentProvider = new class implements vscode.NotebookContentProvider {

	async openNotebook(uri: vscode.Uri, openContext: vscode.NotebookDocumentOpenContext, token: vscode.CancellationToken) {
		let data = openContext.untitledDocumentData;
		if (!data) {
			let fileUri: vscode.Uri;
			if (openContext.backupId) {
				fileUri = vscode.Uri.parse(openContext.backupId);
			} else {
				fileUri = uri;
			}
			data = await vscode.workspace.fs.readFile(fileUri);
		}
		const str = new TextDecoder().decode(data);
		const cells = JSON.parse(str);
		return new vscode.NotebookData(cells);
	}
	saveNotebook(document: vscode.NotebookDocument, token: vscode.CancellationToken) {
		return this.saveNotebookAs(document.uri, document, token);
	}
	async saveNotebookAs(targetResource: vscode.Uri, document: vscode.NotebookDocument, token: vscode.CancellationToken) {
		const cells = document.getCells();
		const str = JSON.stringify(cells, undefined, 2);
		const data = Buffer.from(str);
		await vscode.workspace.fs.writeFile(targetResource, data);
	}
	async backupNotebook(document: vscode.NotebookDocument, context: vscode.NotebookDocumentBackupContext, token: vscode.CancellationToken) {
		await this.saveNotebookAs(context.destination, document, token);
		return {
			id: context.destination.toString(),
			delete() { vscode.workspace.fs.delete(context.destination); }
		};
	}
};

const kernel = new class implements vscode.NotebookKernel {

	readonly id = 'regex';
	readonly label: string = 'Regex';
	readonly supportedLanguages = ['plaintext'];
	private _execOrderPool = 0;

	async executeCellsRequest(document: vscode.NotebookDocument, ranges: vscode.NotebookCellRange[]) {

		for (const range of ranges) {
			const cells = document.getCells(range);
			for (const cell of cells) {
				const exec = vscode.notebook.createNotebookCellExecutionTask(document.uri, cell.index, this.id)!;
				exec.executionOrder = this._execOrderPool++;
				exec.start();
				const output = new vscode.NotebookCellOutputItem('x-application/regex', cell.document.getText());
				exec.replaceOutput([new vscode.NotebookCellOutput([output])]);
				exec.end();
			}
		}
	}
};

export function activate(_context: vscode.ExtensionContext) {

	vscode.notebook.registerNotebookSerializer('regexp-np', serializer);
	// vscode.notebook.registerNotebookContentProvider('regexp-np', contentProvider);

	vscode.notebook.registerNotebookKernelProvider({ viewType: 'regexp-np' }, new class implements vscode.NotebookKernelProvider {
		provideKernels(document: vscode.NotebookDocument, token: vscode.CancellationToken): vscode.ProviderResult<vscode.NotebookKernel[]> {
			return [kernel];
		}
	});


}
