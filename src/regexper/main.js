//@ts-check

import Parser from './parser/javascript.js';

const api = acquireNotebookRendererApi('regexp-renderer');

api.onDidCreateOutput(async event => {

	event.element.innerHTML = `
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
		const parser = new Parser(event.element, { keepContent: true });
		await parser.parse(event.output.data[event.mimeType]);
		await parser.render();

	} catch (err) {
		console.error(err);
	}
});


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
	background-color: #fff;
}
.root text,
.root tspan {
	font: 12px Arial;
}
.root path {
	fill-opacity: 0;
	stroke-width: 2px;
	stroke: #000;
}
.root circle {
	fill: #6b6659;
	stroke-width: 2px;
	stroke: #000;
}
.anchor text,
.any-character text {
	fill: #fff;
}
.anchor rect,
.any-character rect {
	fill: #6b6659;
}
.escape text,
.charset-escape text,
.literal text {
	fill: #000;
}
.escape rect,
.charset-escape rect {
	fill: #bada55;
}
.literal rect {
	fill: #dae9e5;
}
.charset .charset-box {
	fill: #cbcbba;
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
	fill: #908c83;
}
`;
