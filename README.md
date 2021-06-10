Native notebook for VS Code that renders regular expressions using https://regexper.com.


![Sample showing rendered regular expression](https://github.com/jrieken/vscode-regex-notebook/raw/master/img.png)

This samples makes use of the following APIs/concepts

* `NotebookSerializer` to load and save notebook documents from disk
* `NotebookController` to execute regular expressions cells
* `NotebookRenderer` to present regular expressions in a nice way

### Running out of source

* run `npm install` in the terminal
* also run `npm run compile`
* select `F5` to debug

### Thanks

The rendering uses the https://regexper.com source code which works like a charme 👏 
