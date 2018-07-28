const express = require('express'),
    path = require('path'),
    fs = require('fs'),
    app = express();

const dirFiles = fs.readdirSync(__dirname);

for (var file of dirFiles) {
    const currFileName = '/' + file;
    const currentFilePath = path.join(__dirname + currFileName)
    if (file && fs.existsSync(currentFilePath) && file.indexOf('html') !== -1) {
        app.get(currFileName, function (req, res) {
            res.sendFile(currentFilePath);
        });
    }
}

app.use(express.static(__dirname));

app.listen(8083);
