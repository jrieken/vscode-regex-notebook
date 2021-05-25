import * as vscode from 'vscode';


const serializer = new class implements vscode.NotebookSerializer {

	deserializeNotebook(data: Uint8Array): vscode.NotebookData {
		const cells: vscode.NotebookCellData[] = [];
		const str = Buffer.from(data).toString();
		const lines = str.split('\n');
		for (const line of lines) {

			let kind: vscode.NotebookCellKind | undefined;
			if (line.startsWith('RE: ')) {
				kind = vscode.NotebookCellKind.Code;
			} else if (line.startsWith('MD: ')) {
				kind = vscode.NotebookCellKind.Markup;
			}

			if (!kind) {
				// invalid line -> ignore...
				continue;
			}

			const cell = new vscode.NotebookCellData(
				kind,
				JSON.parse(line.substr(4)),
				'plaintext'
			);

			if (cell.kind === vscode.NotebookCellKind.Code) {
				cell.outputs = [new vscode.NotebookCellOutput([vscode.NotebookCellOutputItem.text(cell.value, 'application/x.regexp')])];
			}

			cells.push(cell);
		}
		return new vscode.NotebookData(cells);
	}

	serializeNotebook(data: vscode.NotebookData): Uint8Array {
		const lines: string[] = [];
		for (const cell of data.cells) {
			if (cell.kind === vscode.NotebookCellKind.Code) {
				lines.push(`RE: ${JSON.stringify(cell.value)}`);
			} else {
				lines.push(`MD: ${JSON.stringify(cell.value)}`);
			}
		}
		return Buffer.from(lines.join('\n'));
	}
};

export function activate(context: vscode.ExtensionContext) {

	// make notebook data from bytes and vice versa
	const registration = vscode.notebook.registerNotebookSerializer('regexpnb', serializer, { transientOutputs: true });

	// "execute" a regular expression
	const controller = vscode.notebook.createNotebookController('regex-kernel', 'regexpnb', 'Regex');
	controller.supportedLanguages = ['plaintext'];
	controller.executeHandler = (cells: vscode.NotebookCell[]) => {
		for (const cell of cells) {

			const execution = controller.createNotebookCellExecutionTask(cell);
			execution.start();
			const cellContent = execution.cell.document.getText();
			const regexOutput = vscode.NotebookCellOutputItem.text(cellContent, 'application/x.regexp');
			execution.replaceOutput(new vscode.NotebookCellOutput([regexOutput]));
			execution.end();
		}
	};

	context.subscriptions.push(registration, controller);
}
