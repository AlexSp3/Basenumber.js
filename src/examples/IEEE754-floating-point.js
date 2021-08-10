/* 
 * @Example: Take the square root of an octal number, fixed precision to one digit, and show its IEEE754 representation with 32 bits
 * 
 * @Author: Alexandro Palacios 
 * @Last_edit: 10/08/2021
 */

const num = prompt("Write an octal number");

const oct = new BaseNumber(num, 8);

let root = oct.root(2);  // square root of num, and return result in base 8 ( = num base)

let fixed = new BaseNumber(root, 8).fixed(1);

const bin = new BaseNumber( new BaseNumber(fixed, 8).toBin(), 2);   

console.log(  bin.toIEEE754() );
