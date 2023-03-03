task4()
function task1() {
    const validator = require('validator');


    console.log(validator.isIP('192.168.1.1'));
}

function task2(){
    const colors = require("colors");
    const sound = require("sound-play");

// Output the given text with a random color


    const text = "This is the text you want to output";
    console.log(colors.rainbow(text));

// Play a sound with sound-play
    sound.play("C:\\Users\\ozmitelll\\WebstormProjects\\pzshki\\pz_2_3\\mp3\\phonk-808-cowbell.wav");
}

function task3(){
const fs = require('fs');
const path = require('path');

const absolutePath = process.argv[2];

const fileInfo = path.parse(absolutePath);

const familyOS = {
  darwin: 'Mac OS',
  win32: 'Windows OS',
  linux: 'Linux OS'
};

console.log(`Full Path: ${absolutePath}`);
console.log(`Name: ${fileInfo.name}`);
console.log(`Extension: ${fileInfo.ext}`);
console.log(`Family of Operating Systems: ${familyOS[process.platform]}`);

}
function task4(){
    let readline = require
    ('readline');

    let rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    let randomNumber = Math.round(Math.random());

    console.log('Загадайте число: Орел (1) або Решка (2)');

    rl.on('line', (answer) => {
        if (answer === '1' || answer === '2') {
            console.log(randomNumber === parseInt(answer)
                ? 'Вітаю! Ви вгадали!'
                : 'Ви не вгадали :(');
            rl.close();
        } else {
            console.log('Введіть будь ласка число 1 або 2');
        }
    });

}