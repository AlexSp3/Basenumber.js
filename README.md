# BaseNumber
A cool library that allows you to work with numbers in different bases from 2 to 36.

- [Create a BaseNumber object](README.md/#create-a-basenumber-object)
   - [Signed numbers](README.md/#signed-numbers)
   - [Obtain number value](README.md/#obtain-number-value)
   - [Obtain number base](README.md/#obtain-number-base)
- [Modify number instance](README.md/#modify-number-instance)
   - [Modify value](README.md/#modify-value)
   - [Parse Base](README.md/#parse-base)
   - [Parse decimal](README.md/#parse-decimal)
   - [Parse hexadecimal](README.md/#parse-hexadecimal)
   - [Parse Octal](README.md/#parse-octal)
   - [Parse Binary](README.md/#parse-binary)
- [Working with float numbers](README.md/#working-with-float-numbers)
   - [Fixed precision](README.md/#fixed-precision)
   - [Scientific notation](README.md/#scientific-notation)
   - [IEEE754 Floating point](README.md/#ieee754-floating-point)
- [Simple Math Operations](README.md/#simple-math-operations)
   - [Addition](README.md/#addition)
   - [Subtract](README.md/#subtract)
   - [Multiply](README.md/#multiply)
   - [Divide](README.md/#divide)
   - [Exponent](README.md/#exponent)
   - [Root](README.md/#root)
- [Chaining methods](README.md/#chaining-methods)
- [Clone numbers](README.md/#clone-numbers)
- [Comparing numbers with different bases](README.md/#comparing-numbers-with-different-bases)   
   - [Checking equality](README.md/#checking-equality)
   - [Higher Than](README.md/#higher-than)
   - [Lower Than](README.md/#lower-than)
---
## Create a BaseNumber object:
Let´s start creating our first BaseNumber. The constructor uses two arguments (last optional) to build the instance:
| Argument | Type                     | Detail   |
| ---      | ---                      | ---      | 
| `number` | Object / String / Number | Required |
| `base`   | Number                   | Optional |
```JavaScript
const dec = new BaseNumber(10, 10);  // new BaseNumber(number, base);

const hex = new BaseNumber("f2", 16);
```
BaseNumber.js works with decimal base numers by default, so you can omit the base argument:
```JavaScript
const dec = new BaseNumber(10);
```
### Signed numbers
The library allows user to create signed numbers. Specify the sign in the first argument of the instance:
```JavaScript
const dec = new BaseNumber(-10);

const oct = new BaseNumber("--++10", 8);  // it´s "10" in base 8

const hex = new BaseNumber("-+10", 2);    // it´s "-10" in base 2
```
### Obtain number value
Since BaseNumber allows user to create up to base 36 number, number value is an string that may contain letters and numbers:
```JavaScript
dec.value();  // returns "10"
hex.value();  // returns "f2"
```
### Obtain number base
Number base is save as an integer
```JavaScript
dec.base();   // returns 10
hex.base();   // returns 16
```
## Modify number instance
Once a BaseNumber object is created, you can modify it dynamically:
### Modify value
The `newValue` method allows user to modify the value of an instance. It takes two parameters, second is optional, and returns the old instance:
| Argument | Type                     | Detail   |
| ---      | ---                      | ---      | 
| `number` | Object / String / Number | Required |
| `base`   | Number                   | Optional |
```JavaScript
dec.newValue(number[, base]);
```
The `number` argument can be either a string/number variable or another BaseNumber instance. In case it´s a BaseNumber instance, `base` parameter would be equal to the instance's `base`. E.g:
```JavaScript
dec.newValue(hex);  // base argument is by default hex.base()

// Now 'dec' is a copy of 'hex' instance (same value and same base)
```
In case number argument is a string/float variable, the `base` parameter would be equal to the **instance base** by default, unless you specify it:
```JavaScript
dec.newValue(5);  // base argument is by default dec.base()

// New value is 5 in base 10
```
This method returns the updated instance:
```JavaScript
const dec = new BaseNumber(10);

dec.newValue(5).value();  // returns "5" in base 10

dec.value() // returns "5" in base 10
```
### Parse Base
BaseNumber.js has its own method to parse a number into a new base. The instance is modified after using this function. Use the `parseBase()` method:
```JavaScript
const dec = new BaseNumber(15);

dec.parseBase(16);   // now base is 16

dec.value();         // returns "f" (15 in hexadecimal)
```
If base parameter is omitted, number would be parse in base **10** by default.
### Parse decimal
Similar to the parseBase(), returns a value parsed in decimal base. It does modify the instance itself. It´s a way to improve code readlibility:
```JavaScript
const hex = new BaseNumber("f", 16);
hex.toDec().value();   // returns "15"
```
### Parse hexadecimal
```JavaScript
const dec = new BaseNumber(15);
dec.toHex().value();   // returns "f"
```
### Parse Octal
```JavaScript
const dec = new BaseNumber(10);
dec.toOct().value();   // returns "12"
```
### Parse Binary
```JavaScript
const dec = new BaseNumber(10);
dec.toBin().value();   // returns "1010"
```
## Working with float numbers
All above functions can be also used with float numbers. E.g:
```JavaScript
const dec = new BaseNumber(10.0625);

dec.toBin();   // new base is 2

dec.value();       // returns "1010.0001"
```
### Fixed precision
BaseNumber.js allows user to round or fixed decimal numbers in any base from **2** to **36**. Using the method `fixed()`, similar to the [`toFixed()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed) in js, it fixes the precision of the number, rounding up or down depending the number (and user parameters). The method returns the modified instance:
| Argument    | Type    | Detail   |
| ---         | ---     | ---      | 
| `precision` | Number  | Required |
| `exclusive` | Boolean | Optional |
```JavaScript
dec.fixed(precision[, exclusive]);
```
`precision` argument must be higher than 0 to avoid errors. `exclusive` argument allows user to decide how to fixed the middle number between 0 and the base. E.g: suppose a **base 9** number:
```JavaScript
const dec = new BaseNumber(10.04, 9);
```
The *4* digit is the middle number because base is an odd number (9), and the the possible symbols in the base are `[0, 1, 2, 3, (4), 5, 6, 7, 8]`.
```JavaScript
const dec = new BaseNumber(10.04, 9);

// by default, exclusive is false, so the middle number would be fixed up
dec.fixed(1).value();     // returns "10.1"

// exclusive is true, so the middle number would be fixed down
dec.fixed(1, true).value();     // returns "10.0"
```
### Scientific notation
BaseNumber.js also allows scientific notation within your numbers. You can init an instance this way:
```JavaScript
const dec = new BaseNumber(10e-2);  // equals to "0.1" in base 10

const oct = new BaseNumber(10e+2, 8);  // equals to "1000" in base 8

const hex = new BaseNumber("ff.e10e-2", 16);  // equals to "0.ffe10" in base 16
```
Notice that `e-` / `e+` is refer to scientific notation. **Omitting** the sign (`+` or `-`) may cause *errors or unexpected results*:
```JavaScript
const hex1 = new BaseNumber("ff.e10e-2", 16);  // equals to "0.ffe10" in base 16

const hex2 = new BaseNumber("ff.e10e2", 16);   // equals to "ff.e10e2" in base 16, no scientific notation here

const dec = new BaseNumber("10e2");   // Error, number doesn´t match base
```
### IEEE754 Floating point
BaseNumber.js includes a method in which a number in any base can be transfromed to IEEE754 representation. Call the `toIEEE754()` method, it returns an object with three keys: `exponent`, `mantissa` and `sign`. The instance remains with no modifications:
```JavaScript
dec.toIEEE754([bits64]);
```
The `bits64` argument allows to change the 32 bit floating point representation into a 64 bit representation. It´s by default `false` (32 bits).
```JavaScript
const dec = new BaseNumber(10.625);

dec.toIEEE754();

/* returns
{
   exponent: "10000010",
   mantissa: "01010100000000000000000",
   sign: "0"
} */
```
## Simple Math Operations
BaseNumber allows you to make some simple math operations with normal variables or another BaseNumber instance. Although following examples show only integer numbers, *all math operation are also available for float numbers*. When using math operations in BaseNumber.js, you are modifying the instance:
### Addition
The addition method takes two arguments, last optional:
| Argument     | Type                     | Detail   |
| ---          | ---                      | ---      | 
| `number`     | Object / String / Number | Required |
| `base`       | Number                   | Optional |
```JavaScript
dec.add(number[, base]);
```
The `number` argument can be either a string/number variable or another BaseNumber instance. In case it´s a BaseNumber instance, `base` parameter would be equal to the number instance's `base`. E.g:
```JavaScript
const dec = new BaseNumber(10); 
const hex = new BaseNumber("ff", 16); 

dec.add(hex);  // base argument is by default hex.base()

dec.add(hex, 10);  // base argument is by default hex.base(), doesn´t matter if there is a base argument
```
In case number argument is a string/float variable, the `base` parameter would be **10** by default, unless you specify it:
```JavaScript
dec.add(77);     // Base by default is 10 

dec.add(77, 8);  // Base is 8
```
Since the return value of the math functions is the modified instance, in order to take the value you need to add the `.value()` method at the end of the operation.
```JavaScript
dec.add(77).value()   // returns the new value

dec.value()   // returns the new value
```
The remaining Math operations works exactly the same:
### Subtract
```JavaScript
const dec = new BaseNumber(10);

dec.subtract(5).value();   // returns "5"
```
### Multiply
```JavaScript
const dec = new BaseNumber(10);

dec.multiply(5).value();   // returns "50"
```
### Divide
```JavaScript
const dec = new BaseNumber(10);

dec.divide(5).value();   // returns "2"
```
### Exponent
```JavaScript
const dec = new BaseNumber(10);

dec.pow(2).value();   // returns "100"
```
### Root
```JavaScript
const dec = new BaseNumber(10);

dec.root(2).value();   // returns "3.16227766...."
```
## Chaining methods
BaseNumber.js allows user to chain math and other operators. The list of operators that can be chained is the following:
- `fixed()`
- `newValue()`
- `parseBase()`
- `toDec()`
- `toHex()`
- `toBin()`
- `toOct()`
- `add()`
- `subtract()`
- `multiply()`
- `divide()`
- `pow()`
- `root()`
- `clone()`

E.g:
```JavaScript
const dec = new BaseNumber(10);

dec.add(5).subtract("f", 16).subtract(1).pow(2).toBin().value();   // returns "1"
```
## Clone numbers
In order to make an operation without modifying the original instance, you can make use of the `clone()` method, which returns a new BaseNumber instance, remaining the original:
```JavaScript
const dec = new BaseNumber(10);

let result = dec.clone().add(5).value();   // Now result is equal to "15"

dec.value();   // dec value is still equal to "10" in base 10
```
It can also be used to make a copy of the instance on another variable, so you can work with two instance that have the same value, but different references, it means that you can modify one without modifying the other:
```JavaScript
const dec = new BaseNumber(10);

const copy = dec.clone();
```
## Comparing numbers with different bases
BaseNumber.js allows user to make comparisons between instances or variables. Although following examples show only integer numbers, *all comparing operations are also available for float numbers*:
### Checking equality:
Call the `equalTo()` method to check equality between values. It has two parameters, second is optional. It may return true or false.
```JavaScript
dec.equalTo(number[, base]);
```
The `number` argument can be either a string/number variable or another BaseNumber instance. In case it´s a BaseNumber instance, `base` parameter would be equal to the number instance's `base`. E.g:
```JavaScript
const dec = new BaseNumber(15); 
const hex = new BaseNumber("f", 16);

dec.equalTo(hex);   // returns true (base is hex.base())

hex.equalTo(dec);   // returns true (base is dec.base())
```
In case number argument is a string/number variable, the `base` parameter would be **10** by default, unless you specify it:
```JavaScript
const dec = new BaseNumber(15); 
const hex = new BaseNumber("f", 16);

dec.equalTo(15);   // returns true (base is 10 by default)

hex.equalTo(15, 16);   // returns false (base is 16)
```
### Higher Than
Call the `higherThan()` method to check if an element is higher than the argument number. It has two parameters, second is optional. It may return true or false.
```JavaScript
dec.higherThan(number[, base]);
```
It works the same as the `equalTo()` method.
### Lower Than
Call the `lowerThan()` method to check if an element is lower than the argument number. It has two parameters, second is optional. It may return true or false.
```JavaScript
dec.lowerThan(number[, base]);
```
It works the same as the `equalTo()` method.

---

- Open source [MIT License](LICENSE)
