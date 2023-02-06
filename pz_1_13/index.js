function task2(){
    const BLACK = "⬛"
    const WHITE = "⬜"

    let n = 8
    let leftSide = 8;
    let res = ""

    for (let q=0; q<n; ++q) {
        let line = ""

        for (let w=0; w<n; ++w) {

            line += q+w & 1 ? BLACK : WHITE
        }

        res += leftSide-- + " " + line + "<br>"
    }

    document.write(res)
    document.write("ㅤA   B   C   D   E   F  G   H " + "<br>")

}
let duplicateArray = [1, 2, 2, 4, 5, 4, 7, 8, 7, 3, 6];
class Random{
    static nextDouble(low,high){
        return Math.random() * (high - low) + low;
    }
    static nextInt(low,high){
       return Math.floor(Math.random() * (high - low + 1) ) + low;
    }

    static nextArray(array){
        let index = Math.floor(Math.random() * (array.length-1 + 1));
        return array[index];
    }
}
console.log(Random.nextArray(duplicateArray));

class Person{
    constructor(name) {
        this.name = name;
    }
    static greet(){
        console.log('Hello!');
    }
}

function createGreetable(str){
    return new Person(str);
}