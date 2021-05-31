//@ts-check

import Parser from './parser/javascript.js';

export function activate() {

	/**
	 * 	
	 * @param {string} id 
	 * @param {import('vscode-notebook-renderer').CellInfo} info 
	 */
	async function renderCell(id, info) {

		info.element.innerHTML = `
		<div class="messages" style="visibility: hidden;"></div>
		<div class="progress">
			<div>
			</div>
		</div>
		<div class="svg" style="overflow-x: scroll;">
			<svg>
			</svg>
		</div>`;

		try {
			const parser = new Parser(info.element, { keepContent: true });
			await parser.parse(info.text());

			// unset flags, rendered in status bar
			parser.parsed.flags = [];

			await parser.render();

		} catch (err) {
			console.error(err);
			info.element.innerHTML = String(err);
		}
	}

	return { renderCell };
}

// append base element
// <script type="text/html" id="svg-container-base"></script>
const containerBase = document.createElement('script');
document.head.appendChild(containerBase);
containerBase.type = 'text/html';
containerBase.id = 'svg-container-base';

const style = document.createElement('style');
document.head.appendChild(style);
style.innerText = `
svg {
	
}
.root text,
.root tspan {
	font: 12px Arial;
}
.root path {
	fill-opacity: 0;
	stroke-width: 2px;
	stroke: var(--theme-foreground);
}
.root circle {
	fill: var(--theme-menu-hover-background);
	stroke-width: 2px;
	stroke: var(--theme-foreground);
}
.anchor text,
.any-character text {
	fill: var(--theme-foreground);
}
.anchor rect,
.any-character rect {
	fill: var(--theme-menu-hover-background);
}
.escape text,
.charset-escape text,
.literal text {
	fill: var(--theme-foreground);
}
.escape rect,
.charset-escape rect {
	fill: #bada55;
}
.literal rect {
	fill: var(--theme-button-background);
}
.charset .charset-box {
	fill: var(--theme-menu-hover-background);
}
.subexp .subexp-label tspan,
.charset .charset-label tspan,
.match-fragment .repeat-label tspan {
	font-size: 10px;
}
.repeat-label {
	cursor: help;
}
.subexp .subexp-label tspan,
.charset .charset-label tspan {
	dominant-baseline: text-after-edge;
}
.subexp .subexp-box {
	stroke: #908c83;
	stroke-dasharray: 6, 2;
	stroke-width: 2px;
	fill-opacity: 0;
}
.quote {
	fill: rgba(var(--theme-foreground), 0.5);
}
`;
