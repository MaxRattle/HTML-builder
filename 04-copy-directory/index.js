const fs = require('fs');
const path = require('path');

const folderPath = path.join(__dirname, 'files');
// console.log(folderPath); //HTML-builder (#10)\HTML-builder\04-copy-directory\files

const copiedFolderPath = path.join(__dirname, 'files-copy');

fs.mkdir(copiedFolderPath, (err) => {
  if (err) {
    console.error('Папка не создана, ошибка: ', err);
    return;
  }
  console.error('Папка создана: ', copiedFolderPath);

  // Получить список файлов в папке files
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      console.error('Не удалось прочитать содержимое папки:', err);
      return;
    }

    // Копировать каждый файл из папки files в папку files-copy
    files.forEach((file) => {
      const sourceFilePath = path.join(folderPath, file);
      const destinationFilePath = path.join(copiedFolderPath, file);

      fs.copyFile(sourceFilePath, destinationFilePath, (err) => {
        if (err) {
          console.error(`Не удалось скопировать файл ${file}:`, err);
        } else {
          console.log(`Файл ${file} успешно скопирован.`);
        }
      });
    });
  });
});

// для запуска программы используйте в консоли: node 04-copy-directory
