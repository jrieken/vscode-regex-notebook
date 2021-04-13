import * as vscode from 'vscode';


const serializer = new class implements vscode.NotebookSerializer {

	dataToNotebook(data: Uint8Array): vscode.NotebookData {
		const cells: vscode.NotebookCellData[] = [];
		const str = Buffer.from(data).toString();
		const lines = str.split('\n');
		for (const line of lines) {

			let kind: vscode.NotebookCellKind | undefined;
			if (line.startsWith('RE: ')) {
				kind = vscode.NotebookCellKind.Code;
			} else if (line.startsWith('MD: ')) {
				kind = vscode.NotebookCellKind.Markdown;
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

			cells.push(cell);

		}
		return new vscode.NotebookData(cells);
	}

	notebookToData(data: vscode.NotebookData): Uint8Array {
		const lines: string[] = [];
		for (const cell of data.cells) {
			if (cell.kind === vscode.NotebookCellKind.Code) {
				lines.push(`RE: ${JSON.stringify(cell.source)}`);
			} else {
				lines.push(`MD: ${JSON.stringify(cell.source)}`);
			}
		}
		return Buffer.from(lines.join('\n'));
	}
};

export function activate(context: vscode.ExtensionContext) {

	// make notebook data from bytes and vice versa
	const registration = vscode.notebook.registerNotebookSerializer('regexpnb', serializer);

	// "execute" a regular expression
	const kernel = vscode.notebook.createNotebookKernel({
		id: 'regex-kernel',
		label: 'RegexNB',
		supportedLanguages: ['plaintext'],
		selector: { viewType: 'regexpnb' },
		executeHandler: executions => {
			for (let exec of executions) {
				exec.start();
				const output = new vscode.NotebookCellOutputItem('application/x.regexp', exec.cell.document.getText());
				exec.replaceOutput(new vscode.NotebookCellOutput([output]));
				exec.end();
			}
		}
	});

	context.subscriptions.push(registration, kernel);
}
