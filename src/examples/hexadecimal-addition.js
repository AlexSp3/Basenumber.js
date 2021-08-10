/* 
 * @Example: add two hexadecimal numbers and transform the result in decimal base
 * 
 * @Author: Alexandro Palacios 
 * @Last_edit: 10/08/2021
 */

const num1 = prompt("Write first hexadecimal number");

const num2 = prompt("Write second hexadecimal number");

const hex = new BaseNumber(num1, 16);

const result = new BaseNumber(  hex.add(num2, 16, 10) );   // base 10 number

console.log(result.value());
