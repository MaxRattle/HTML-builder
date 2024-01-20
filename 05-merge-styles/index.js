const fs = require('fs');
const path = require('path');

const folderPathStyles = path.join(__dirname, 'styles');
const folderPathBundle = path.join(__dirname, 'project-dist');
const outputPath = path.join(folderPathBundle, 'bundle.css');

// Читаем содержимое папки styles
fs.readdir(folderPathStyles, (err, files) => {
  if (err) {
    console.error('Не удалось прочитать содержимое папки:', err);
    return;
  }

  files.forEach((file) => {
    const filePath = path.join(folderPathStyles, file);

    // Проверяем, является ли файл CSS файлом
    if (path.extname(filePath) === '.css') {
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          console.error('Не удалось прочитать файл:', filePath, err);
          return;
        }

        // Записываем данные в bundle.css
        fs.appendFile(outputPath, data, 'utf8', (err) => {
          if (err) {
            console.error(
              'Не удалось записать данные в файл:',
              outputPath,
              err,
            );
            return;
          }

          console.log(
            'Данные из файла',
            filePath,
            'успешно записаны в',
            outputPath,
          );
        });
      });
    }
  });
});

// для запуска программы используйте в консоли: node 05-merge-styles
