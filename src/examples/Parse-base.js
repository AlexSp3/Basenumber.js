/* 
 * @Example: Write a number in binary and then show it in base 8, 10, 12, 16
 * 
 * @Author: Alexandro Palacios 
 * @Last_edit: 10/08/2021
 */

const num = prompt("Write an octal number");

const bin = new BaseNumber(num, 2);

// Notice that using the .clone() method avoid modificactions in the original instance

console.log(  bin.clone().toOct().value() );
console.log(  bin.clone().toDec().value() );
console.log(  bin.clone().parseBase(12).value() );
console.log(  bin.clone().toHex().value() );

