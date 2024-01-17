const fs = require('fs');
const path = require('path');

const folderPath = path.join(__dirname, 'secret-folder');
console.log(folderPath);
fs.readdir(folderPath, (err, files) => {
  if (err) {
    console.error(err);
    return;
  }

  files.forEach((file) => {
    let filePath = path.join(folderPath, file);

    fs.stat(filePath, (err, stats) => {
      if (err) {
        console.error(err);
        return;
      }

      if (stats.isFile()) {
        console.log(
          `${path.parse(file).name} - ${path.extname(file)} - ${(
            stats.size / 1024
          ).toFixed(3)}kb`,
        );
      }
    });
  });
});

// для запуска кода используйте в консоли: node 03-files-in-folder или с помощью расширения в VsCode: Code Runner

// data - .csv - 32.731kb
// script - .js - 6.176kb
// style - .css - 11.999kb
// text - .txt - 6.337kb
