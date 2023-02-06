function seconds(total){
    return total % 60;
}

function perimetr(side,count){
    return count*side;
}

function task3(n){
    for (let i = 1; i < n; i++) {
        if(i%3 ==0){
            console.log('fizz')
            i++;
        }
        if(i%5== 0){
            console.log('buzz')
            i++;
        }
        if(i%3==0 && i%5==0){
            console.log('fizzbuzz')
            i++;
        }
        console.log(i);
    }
}

function Calculate(x,y,z){
    return (x+y+z)/2;
}
function isDivisible(n,x,y) {
    return (n % x === 0) && (n % y === 0);
}

function task6(n){
    let array = Array(n);
    let sum = 0;
    for (let i = 0; i < array.length; i++) {
        array[i] = Math.floor(Math.random() * 101);
    }
    console.log(...array)
    for (let i = 0; i < array.length; i++) {
        sum+= array[i];
    }
    array.sort()
    console.log("Max value in array: " + array[array.length-1]);
    console.log("Min value in array: " + array[0]);
    console.log("Sum all values in array: " + sum);
    console.log("Average this array: " + (sum / n));
    for (let i = 0; i < array.length; i++) {
        if(array[i] % 2 !=0){
            console.log(array[i]);
        }
    }
}
function task7(){
    let array = new Array(5);
    for (let i = 0; i < array.length; i++) {
        array[i] = new Array(5);
    }
    for (let i = 0; i<array.length; i++)
        for (let j=0; j<array[i].length; j++)
            array[i][j] = Math.floor(Math.random() * 19) -8


    for (let i=0; i<array.length; i++)
    {
        for (let j=0; j<array[i].length; j++)
            document.write(array[i][j]+" ")
        document.write('<br>');
    }


    for(let i = 0; i < array.length; i++){
        for(let j = 0; j < array[i].length; j++){
            if(i === j){
                if(array[i][j]<0){
                    array[i][j]='-';
                }
            }
            if ((i + j) == (5 - 1)){
                if(array[i][j]>0){
                    array[i][j]='+';
                }
            }
        }
    }
    for (let i=0; i<array.length; i++)
    {
        for (let j=0; j<array[i].length; j++)
            document.write(array[i][j]+" ")
        document.write('<br>');
    }

}
function task8(){
    let choose = +prompt('Choose a function: 1 - Add 2 - Sub 3 - Mul 4 - Div')
    if(choose>0 && choose<5){
    let a = +prompt("Write first number");
    let b = +prompt("Write second number");
    switch (choose){
        case 1:
            document.write(Add(a,b));
            break;
        case 2:
            document.write(Sub(a,b));
            break;
        case 3:
            document.write(Mul(a,b));
            break;
        case 4:
            document.write(Div(a,b));
            break;
        default:
            document.write("Try again!")
            break;
    }
    }else {
        document.write("Try again (1 - 4)")
    }
    function Add(a,b){return a+b}
    function Sub(a,b){return a-b}
    function Mul(a,b){return a*b}
    function Div(a,b){
        if(b !== 0) {
            return a / b;
        }
        else{
            document.write('Divine on zero not be!!')
        }
    }
}

function task10(array){
    for (let i = 0; i < array.length; i++) {

        if(typeof array[i] == "number"){
            array[i] = Math.pow(array[i], 2);
        }
    }

}
let array = ['bread', 'milk', 'cheese', 'hummus', 'noodles', 112, 1, 22, 3, 5, 8, 13];
// task10(array)

let duplicateArray = [1, 2, 2, 4, 5, 4, 7, 8, 7, 3, 6];


function task11(array){
    console.log(...Array.from(new Set(array)))
}
task11(duplicateArray)