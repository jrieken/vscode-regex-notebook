
const path = require('path');

let pegLoader = {
    name: 'peg-loader',
    setup(build) {
        let fs = require('fs');
        let canopy = require('./src/renderer/regexper-static/node_modules/canopy');

        // Load ".txt" files and return an array of words
        build.onLoad({ filter: /\.peg$/ }, async (args) => {
            let peg = await fs.promises.readFile(args.path, 'utf8');
            let js = canopy.compile(peg);
            return {
                contents: js,
                loader: 'js',
            };
        });
    },
};

let fixer = {
    name: 'fixer',
    setup(build) {
        let fs = require('fs');
        build.onEnd(async result => {
            const p = path.join(__dirname, 'dist/regexper-renderer.js');
            const source = await fs.promises.readFile(p, 'utf8');

            const modSource = String(source)
                .replace('eve = function(name, scope) {', 'var eve = function(name, scope) {') // esbuild issue?
                .replace(/export {\n  activate\n\};/m, 'export { activate }'); // https://github.com/microsoft/vscode/issues/125519

            await fs.promises.writeFile(p, modSource);
        });
    },
};

require('esbuild').build({
    entryPoints: [path.join(__dirname, 'src/renderer/main.js')],
    bundle: true,
    format: 'esm',
    // minify: true,
    platform: 'browser',
    outfile: path.join(__dirname, 'dist/regexper-renderer.js'),
    plugins: [pegLoader, fixer],
}).catch(() => process.exit(1));

require('esbuild').build({
    entryPoints: [path.join(__dirname, 'src/extension/extension.ts')],
    bundle: true,
    format: 'cjs',
    // minify: true,
    platform: 'node',
    outfile: path.join(__dirname, 'dist/extension.js'),
    external: ['vscode']
}).catch(() => process.exit(1));
