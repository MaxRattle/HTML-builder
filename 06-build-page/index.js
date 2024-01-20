// какой же "кайф" писать без сторонних модулей)
// для запуска программы используйте в консоли: node 06-build-page
const fs = require('fs');
const path = require('path');

// создание папки project-dist и копирование в эту папку assets с вложенными в нее папками и файлами
const folderPath = path.join(__dirname, 'assets');
const copiedFolderPath = path.join(__dirname, 'project-dist/assets');

function copyFolderRecursive(source, destination, callback) {
  fs.mkdir(destination, { recursive: true }, (err) => {
    if (err) {
      callback(err);
      return;
    }
    fs.readdir(source, (err, files) => {
      if (err) {
        callback(err);
        return;
      }
      const fileCopyPromises = files.map((file) => {
        const sourceFilePath = path.join(source, file);
        const destinationFilePath = path.join(destination, file);
        return new Promise((resolve, reject) => {
          fs.stat(sourceFilePath, (err, stats) => {
            if (err) {
              reject(err);
              return;
            }
            if (stats.isDirectory()) {
              copyFolderRecursive(
                sourceFilePath,
                destinationFilePath,
                (err) => {
                  if (err) {
                    reject(err);
                  } else {
                    resolve();
                  }
                },
              );
            } else {
              fs.copyFile(sourceFilePath, destinationFilePath, (err) => {
                if (err) {
                  reject(err);
                } else {
                  resolve();
                }
              });
            }
          });
        });
      });
      Promise.all(fileCopyPromises)
        .then(() => {
          callback();
        })
        .catch((err) => {
          callback(err);
        });
    });
  });
}

fs.mkdir(copiedFolderPath, { recursive: true }, (err) => {
  if (err) {
    console.error('Папка не создана, ошибка: ', err);
    return;
  }
  console.log('Папка создана: ', copiedFolderPath);

  copyFolderRecursive(folderPath, copiedFolderPath, (err) => {
    if (err) {
      console.error('Не удалось скопировать содержимое папки:', err);
    } else {
      console.log('Содержимое папки скопировано успешно');
    }
  });
});

// объединение стилей в единый файл styles в папку project-dist
const folderPathStyles = path.join(__dirname, 'styles');
const folderPathBundle = path.join(__dirname, 'project-dist');
const outputPath = path.join(folderPathBundle, 'style.css');

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

        // Записываем данные в style.css
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

// копируем файл template.html в папку project-dist; далее меняем название template.html -> index.html внутри папки project-dist
const sourceFolderPath = __dirname;
const destinationFolderPath = path.join(__dirname, 'project-dist');
const componentsFolderPath = path.join(__dirname, 'components');

const copyAndRenameFile = (callback) => {
  const sourcePath = path.join(sourceFolderPath, 'template.html');
  const destinationPath = path.join(destinationFolderPath, 'index.html');

  fs.copyFile(sourcePath, destinationPath, (err) => {
    if (err) {
      console.error('Ошибка при копировании файла', err);
    } else {
      console.log('Файл успешно скопирован и переименован');
    }

    callback();
  });
};

// заменяем теги шаблоново в index.html на содержимое html-компонентов из папки components
const replaceTemplates = () => {
  const indexFilePath = path.join(destinationFolderPath, 'index.html');

  fs.readFile(indexFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Ошибка при чтении файла index.html', err);
      return;
    }

    const headerFilePath = path.join(componentsFolderPath, 'header.html');
    const articlesFilePath = path.join(componentsFolderPath, 'articles.html');
    const footerFilePath = path.join(componentsFolderPath, 'footer.html');

    fs.readFile(headerFilePath, 'utf8', (err, headerData) => {
      if (err) {
        console.error('Ошибка при чтении файла header.html', err);
        return;
      }
      data = data.replace('{{header}}', headerData);

      fs.readFile(articlesFilePath, 'utf8', (err, articlesData) => {
        if (err) {
          console.error('Ошибка при чтении файла articles.html', err);
          return;
        }
        data = data.replace('{{articles}}', articlesData);

        fs.readFile(footerFilePath, 'utf8', (err, footerData) => {
          if (err) {
            console.error('Ошибка при чтении файла footer.html', err);
            return;
          }
          data = data.replace('{{footer}}', footerData);

          fs.writeFile(indexFilePath, data, 'utf8', (err) => {
            if (err) {
              console.error('Ошибка при сохранении файла index.html', err);
            } else {
              console.log('Файл index.html успешно обновлен');
            }
          });
        });
      });
    });
  });
};

copyAndRenameFile(replaceTemplates);
