import * as vscode from 'vscode';

const contentProvider = new class implements vscode.NotebookContentProvider {

	private readonly _onDidChangeNotebook = new vscode.EventEmitter<vscode.NotebookDocumentContentChangeEvent>();

	readonly onDidChangeNotebook = this._onDidChangeNotebook.event;

	async openNotebook(uri: vscode.Uri, openContext: vscode.NotebookDocumentOpenContext): Promise<vscode.NotebookData> {

		const actual = openContext.backupId ? vscode.Uri.parse(openContext.backupId) : uri;
		const data = Buffer.from(await vscode.workspace.fs.readFile(actual)).toString();

		const cells: vscode.NotebookCellData[] = data.split('\n').map(line => {
			return {
				cellKind: vscode.CellKind.Code,
				source: line,
				language: 'plaintext',
				outputs: [{ outputKind: vscode.CellOutputKind.Rich, data: { 'x-application/regex': line } }],
				metadata: undefined
			};
		});

		return {
			cells,
			languages: [],
			metadata: {}
		};
	}

	async resolveNotebook(_document: vscode.NotebookDocument, _webview: vscode.NotebookCommunication): Promise<void> {
		// nothing
	}

	async backupNotebook(document: vscode.NotebookDocument, context: vscode.NotebookDocumentBackupContext, token: vscode.CancellationToken): Promise<vscode.NotebookDocumentBackup> {
		await this.saveNotebookAs(context.destination, document, token);
		return {
			id: context.destination.toString(),
			delete() { vscode.workspace.fs.delete(context.destination); }
		};
	}

	saveNotebook(document: vscode.NotebookDocument, token: vscode.CancellationToken): Promise<void> {
		return this.saveNotebookAs(document.uri, document, token);
	}

	async saveNotebookAs(targetResource: vscode.Uri, document: vscode.NotebookDocument, _token: vscode.CancellationToken): Promise<void> {
		const lines = document.cells.map(cell => cell.document.getText()).join('\n');
		const data = Buffer.from(lines);
		await vscode.workspace.fs.writeFile(targetResource, data);
	}
};

const kernel = new class implements vscode.NotebookKernel {

	readonly label: string = 'Regex';

	private _execOrderPool = 0;

	async executeCell(document: vscode.NotebookDocument, cell: vscode.NotebookCell): Promise<void> {
		const edit = new vscode.WorkspaceEdit();
		// TODO@jrieken cell-index and/or replaceCellOutput(celluri, output)
		edit.replaceCellOutput(document.uri, document.cells.indexOf(cell), [{
			outputKind: vscode.CellOutputKind.Rich,
			data: { 'x-application/regex': cell.document.getText() }
		}]);
		edit.replaceCellMetadata(document.uri, document.cells.indexOf(cell), { executionOrder: this._execOrderPool++ });
		await vscode.workspace.applyEdit(edit);
	}

	executeAllCells(document: vscode.NotebookDocument): void {
		for (const cell of document.cells) {
			if (cell.cellKind === vscode.CellKind.Code) {
				this.executeCell(document, cell);
			}
		}
	}

	cancelCellExecution(document: vscode.NotebookDocument, cell: vscode.NotebookCell): void {
		throw new Error('Method not implemented.');
	}

	cancelAllCellsExecution(document: vscode.NotebookDocument): void {
		throw new Error('Method not implemented.');
	}

};

export function activate(_context: vscode.ExtensionContext) {

	//
	console.log('hello');

	vscode.notebook.registerNotebookContentProvider('regexp-np', contentProvider);
	vscode.notebook.registerNotebookKernelProvider({ viewType: 'regexp-np' }, new class implements vscode.NotebookKernelProvider {

		//TODO@jrieken overkill, replace with notebook runner concept?
		// onDidChangeKernels?: vscode.Event<vscode.NotebookDocument | undefined> | undefined;

		provideKernels(document: vscode.NotebookDocument, token: vscode.CancellationToken): vscode.ProviderResult<vscode.NotebookKernel[]> {
			return [kernel];	
		}
	});


}
