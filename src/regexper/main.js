//@ts-check

import Parser from './parser/javascript.js';

const api = acquireNotebookRendererApi('regexp-renderer');

api.onDidCreateOutput(async event => {

  const child = document.createElement('div');
  child.innerHTML = `
    <div class="messages" style="visibility: hidden;"></div>
    <div class="progress">
      <div>
      </div>
    </div>
    <div class="svg" style="overflow-x: scroll;">
      <svg>
      </svg>
    </div>`;

  event.element.appendChild(child);

  try {
    const parser = new Parser(child, { keepContent: true });
    await parser.parse(event.output.data[event.mimeType]);
      await parser.render();
  } catch (err) {
    console.error(err);
  }
});
