// // // // // function solution(nums){
// // // // //     return ((nums==Array() || nums == null) ? new Array() : nums.sort((a,b)=>a-b))
// // // // // }
// // // // // console.log(solution([1,10,2,3,5]))
// // // // //
// // // // //
// // // // let str = "How can mirrors be real if our eyes aren't real";
// // // //
// String.prototype.toJadenCase = function (){
//     return this.split(" ").map((word) => {
//         return word[0].toUpperCase() + word.slice(1);
//     }).join(" ");
// };
// // // // console.log(str.toJadenCase())
// // // //
// // // //
// // // function openOrSenior(data){
// // //     let wordAnswer = [];
// // //     for (let i = 0; i < data.length; i++) {
// // //         if(data[i][0]>=55 && data[i][1]>7){
// // //             wordAnswer.push('Senior')
// // //         }
// // //         else {
// // //             wordAnswer.push('Open');
// // //         }
// // //     }
// // //     return wordAnswer
// // // }
// // // console.log(...openOrSenior([[45, 12],[55,21],[19, -2],[104, 20]]))
// // // function highAndLow(numbers){
// // //     let array = numbers.split(' ');
// // //     array.sort((a,b)=> a-b)
// // //     return array[array.length-1]+ " " + array[0];
// // // }
// //
// // const util = require("util");
// //
// // function validatePIN(pin){
// //     let boolean = false;
// //     var re = /[^0-9]+/g;
// //     if(pin.length === 4 || pin.length === 6){
// //         if(pin.indexOf(".")== -1 && pin.indexOf("-")== -1 && pin.indexOf("+")==-1 && re.test(pin) !==true) {
// //             for (let i = 0; i < pin.length; i++) {
// //                 if (util.isNumber(+pin[i])) {
// //                     boolean = true
// //                 } else {
// //                     boolean = false;
// //                     i = pin.length
// //                 }
// //             }
// //         }
// //     }
// //     return boolean;
// // }
// //
// // console.log(validatePIN('1234'));
//
//
// function narcissistic(value) {
//     let numbers = value.toString();
//     let digit = 0;
//     let boolean = false;
//     for (let i = 0; i < numbers.length; i++) {
//         digit += numbers[i] ** numbers.length;
//     }
//     if (digit === value) {
//         boolean = true;
//     }
//     return boolean;
// }
//
// console.log(narcissistic(1652));


// function maskify(cc) {
//     let word = ""
//     for (let i = 0; i < cc.length-4; i++) {
//         word+="#";
//     }
//     return word;
// }
//
// console.log(maskify("4556364607935616"))

// function alphabetPosition(text) {
//     let words = text.split(' ')
//     let numbersIndex = "";
//     let array = ['2','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
//     for (let i = 0; i < words.length; i++) {
//         for (let j = 0; j < words[i].length; j++) {
//             for (let k = 0; k < array.length; k++) {
//                 if(words[i][j].toUpperCase()===array[k]){
//                     numbersIndex+=k + " "
//                 }
//             }
//         }
//     }
//
//     return numbersIndex;
// // }
//
// console.log(alphabetPosition("The sunset sets at twelve o'clock."))

// function duplicateEncode(word) {
//     return word
//         .toLowerCase()
//         .split("")
//         .map(function (a, i, w) {
//             return w.indexOf(a) == w.lastIndexOf(a) ? "(" : ")";
//         })
//         .join("");
// }
// console.log(duplicateEncode('din'))

// function generateHashtag(string) {
//     if (string.trim() === '') return false;
//
//     const stringWithCamelCase = string
//         .split(' ')
//         .map(word => word.charAt(0).toUpperCase() + word.slice(1))
//         .join('');
//
//     const stringWithHashtag = `#${stringWithCamelCase.trim()}`;
//
//     return stringWithHashtag.length > 140 ? false : stringWithHashtag;
// }
//
// console.log(generateHashtag("undefined"))