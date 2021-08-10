/* 
 * @Example: Take the square root of an octal number, fixed precision to one digit, and show its IEEE754 representation with 32 bits (without modifying the original number)
 * 
 * @Author: Alexandro Palacios 
 * @Last_edit: 10/08/2021
 */

const num = prompt("Write an octal number");

const oct = new BaseNumber(num, 8);

let bin = oct.clone().root(2).fixed(1).toBin().toIEEE754();

console.log(  bin );
console.log( "Original number: " + oct.value() );
