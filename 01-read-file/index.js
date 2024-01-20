const fs = require('fs');
const path = require('path');

const fullPath = path.join('01-read-file', 'text.txt');
console.log(fullPath); // 01-read-file\text.txt

fs.readFile(fullPath, 'utf-8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data);
});

// для теста кода напиши в консоль: node 01-read-file
