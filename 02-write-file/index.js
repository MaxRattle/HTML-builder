const fs = require('fs');
const path = require('path');
const readline = require('readline');

const filepath = path.join(__dirname, 'file.txt');
const stream = fs.createWriteStream(filepath, { flags: 'a' });
const { stdin, stdout } = process;

stdout.write("Приветствую! Введите, пожалуйста, текст! Он будет записываться в файл file.txt до тех пор, пока вы не завершите исполнение программы.\n");

const rl = readline.createInterface({
    input: stdin,
    output: stdout,
});

rl.setPrompt('Напишите текст или закройте программу: ');
rl.prompt();

stdin.on('keypress', (_, key) => {
    if (key.ctrl && key.name === 'c') {
        console.log('\nВвод текста завершен с помощью комбинации клавиш (Ctrl + C)! Откройте файл file.txt');
        rl.close();
    }
});

rl.on('line', (input) => {
    if (input.toLowerCase() === 'exit') {
        console.log('\nВвод текста завершен с помощью слова exit, откройте файл file.txt');
        rl.close();
    } else {
        rl.setPrompt('Напишите текст или закройте программу: ');
        rl.prompt();
        stream.write(input + '\n');
    }
});

rl.on('close', () => {
    stream.end();
});

// Нода какая-то жесть, на данный момент кажется так сейчас, но интересно)