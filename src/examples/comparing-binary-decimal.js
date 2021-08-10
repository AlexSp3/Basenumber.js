/* 
 * @Example: check if a number in base 2 with scientific notation is higher, equal or lower than a number in base decimal
 * 
 * @Author: Alexandro Palacios 
 * @Last_edit: 10/08/2021
 */

const bin = new BaseNumber("1011e+10", 2);

const num1 = prompt("Write a decimal number");

const dec = new BaseNumber(num1);

console.log("Your number is higher than " + bin.value() + "(2): ", dec.higherThan(bin));
console.log("Your number is equal to " + bin.value() + "(2): ", dec.equalTo(bin));
console.log("Your number is lower than " + bin.value() + "(2): ", dec.lowerThan(bin));



