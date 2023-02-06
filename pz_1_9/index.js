function task1(){
    for (let i = 0; i <=100; i++) {
            console.log(i);
    }
}


function task2(){
    let i = 0;
    do {
        if(i==0){
            console.log(i + '- це нуль')

        }
        i++
        if(i%2 == 0 &&  i != 0){
            console.log(i + '- це парне')

        }
        else {
            console.log(i + '- це непарне')
        }


    }
    while (i<10){

    }
}
function task3(){
    for (let i = 0; i <=9; console.log(i), i++){}
}

function task4(){

// Pyramid
//     const numLevels = prompt("How many levels does your pyramid have?");
    const numLevels = 5;
    let pyramid = '';

    for (let i = 0; i < numLevels; i++) {
        for (let j = 0; j < i + 1; j++) {
            pyramid += "*";
        }
        pyramid += "\n";
    }

    console.log(pyramid);

// Rhombus
//     const numRows = prompt("How many rows does your rhombus have?");
    const numRows = 5;
    let rhombus = '';

    for (let i = 0; i < numRows; i++) {
        let stars = '';
        let spaces = '';

        for (let j = 0; j < numRows - i - 1; j++) {
            spaces += " ";
        }

        for (let j = 0; j < 2 * i + 1; j++) {
            stars += "*";
        }

        rhombus += spaces + stars + "\n";
    }

    console.log(rhombus);

    let levels = 5;

    for (let i = 1; i <= levels; i++) {
        let str = '';

        for (let k = 1; k <= (levels - i); k++) {
            str = str + ' ';
        }

        for (let j = 1; j <= (2 * i - 1); j++) {
            str = str + '*';
        }

        console.log(str);
    }

    for (let i = (levels - 1); i >= 1; i--) {
        let str = '';

        for (let k = 1; k <= (levels - i); k++) {
            str = str + ' ';
        }

        for (let j = 1; j <= (2 * i - 1); j++) {
            str = str + '*';
        }

        console.log(str);
    }


}
function task5(){
    let numb = 10000;

    let result = 0;
    let counter = 0;

    while(numb > 50){
        numb /= 2;
        counter += 1;
        result = numb;
    }
    console.log(`Result: ${result}, Iteractions: ${counter}`);
}

function task6(){
    let month = prompt('Введіть число місяця');

    if(month>12 || month <= 0){
        alert('Такого місяця немає!')
    }
    else {
        if (month < 3 || month == 12) {
            alert(`Місяць належить до зими. Це - ${getMonthName(month)}`);
        } else if (month >= 3 && month <= 5) {
            alert(`Місяць належить до весни. Це - ${getMonthName(month)}`);
        } else if (month >= 6 && month <= 8) {
            alert(`Місяць належить до літа. Це - ${getMonthName(month)}`);
        } else if (month >= 9 && month <= 11) {
            alert(`Місяць належить до осіні. Це - ${getMonthName(month)}`);
        }
    }



    function getMonthName(num) {
        let months = [
            'Січень',
            'Лютий',
            'Березень',
            'Квітень',
            'Травень',
            'Червень',
            'Липень',
            'Серпень',
            'Вересень',
            'Жовтень',
            'Листопад',
            'Грудень'
        ];

        return months[num - 1];
    }
}

function task7(){
    let tc = prompt("Enter the temperature in Celsius: ");
    let tf = (9/5)*tc + 32;
    alert(`The temperature in Fahrenheit is ${tf}`);
}

function task8(){
    let number = prompt("Please enter a number from 1 to 7");
    let day;

    switch (number) {
        case '1':
            day = "Monday";
            break;
        case '2':
            day = "Tuesday";
            break;
        case '3':
            day = "Wednesday";
            break;
        case '4':
            day = "Thursday";
            break;
        case '5':
            day = "Friday";
            break;
        case '6':
            day = "Saturday";
            break;
        case '7':
            day = "Sunday";
            break;
        default:
            day = "Invalid Day";
    }

    alert("The day is " + day);
}