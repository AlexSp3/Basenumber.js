/* 
 * @Example: Write a number in binary and then show it in base 8, 10, 12, 16
 * 
 * @Author: Alexandro Palacios 
 * @Last_edit: 10/08/2021
 */

const num = prompt("Write a binary number");

const bin = new BaseNumber(num, 2);

console.log(  "Binary: " + bin.value() );
console.log(  "Octal: " + bin.toOct().value() );
console.log(  "Decimal: " + bin.toDec().value() );
console.log(  "Base 12: " + bin.parseBase(12).value() );
console.log(  "Hexadecimal: " + bin.toHex().value() );



