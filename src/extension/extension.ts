import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

	// make notebook data from bytes and vice versa
	context.subscriptions.push(vscode.workspace.registerNotebookSerializer('regexpnb', new class implements vscode.NotebookSerializer {

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
	}, { transientOutputs: true }));


	// "execute" a regular expression
	const controller = vscode.notebooks.createNotebookController('regex-kernel', 'regexpnb', 'Regex');
	controller.supportedLanguages = ['plaintext'];
	controller.executeHandler = (cells: vscode.NotebookCell[]) => {
		for (const cell of cells) {
			const execution = controller.createNotebookCellExecution(cell);
			execution.start();
			const cellContent = execution.cell.document.getText();

			try {
				// "validation" by parsing
				const match = /\/(.*)\/(.*)/.exec(cellContent);
				if (match) {
					new RegExp(match[1], match[2]);
				} else {
					new RegExp(cellContent);
				}
			} catch (err) {
				// show validation error and continue with next cell
				const errorItem = vscode.NotebookCellOutputItem.error(err as Error);
				const regexOutput = new vscode.NotebookCellOutput([errorItem]);
				execution.replaceOutput(regexOutput);
				execution.end(false);

				continue;
			}

			const regexItem = vscode.NotebookCellOutputItem.text(cellContent, 'application/x.regexp');
			const regexOutput = new vscode.NotebookCellOutput([regexItem]);
			execution.replaceOutput(regexOutput);
			execution.end(undefined);
		}
	};
	context.subscriptions.push(controller);

	// status bar provider
	context.subscriptions.push(vscode.notebooks.registerNotebookCellStatusBarItemProvider('regexpnb', new class implements vscode.NotebookCellStatusBarItemProvider {

		provideCellStatusBarItems(cell: vscode.NotebookCell): vscode.ProviderResult<vscode.NotebookCellStatusBarItem[]> {
			const cellContent = cell.document.getText();
			const flags = new Set<string>();
			try {
				const idx = cellContent.lastIndexOf('/');
				if (idx > 0 && idx < cellContent.length) {
					cellContent.substring(idx + 1).split('').map(f => {
						switch (f) {
							case 'g': return flags.add('global');
							case 'i': return flags.add('ignoreCase');
							case 'm': return flags.add('multiline');
							case 'u': return flags.add('unicode');
							case 'y': return flags.add('sticky');
						}
						return '';
					}).sort().filter(s => !!s);
				}
			} catch { }

			if (flags.size > 0) {
				return [new vscode.NotebookCellStatusBarItem(
					'Flags: ' + Array.from(flags).join(', '),
					vscode.NotebookCellStatusBarAlignment.Right
				)];
			}
		}
	}));

}
