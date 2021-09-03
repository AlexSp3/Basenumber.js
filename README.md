# BaseNumber
A cool BigDecimal library that allows you to work with numbers in different bases from 2 to 36.

- [Create a BaseNumber object](README.md/#create-a-basenumber-object)
   - [Signed numbers](README.md/#signed-numbers)
   - [Scientific notation](README.md/#scientific-notation)
   - [`valueOf()`](README.md/#valueOf)
   - [`toString()`](README.md/#toString)
   - [`toNumber()`](README.md/#toNumber)
   - [`base()`](README.md/#base)
   - [`sign()`](README.md/#sign)
   - [`newValue()`](README.md/#newValue)
   - [`toBase()`](README.md/#toBase)
   - [`toDec()`](README.md/#toDec)
   - [`toHex()`](README.md/#toHex)
   - [`toOct()`](README.md/#toOct)
   - [`toBin()`](README.md/#toBin)
   - [`trunc()`](README.md/#trunc)
   - [`round()`](README.md/#round)
   - [`toFixed()`](README.md/#toFixed)
   - [`toPrecision()`](README.md/#toPrecision)
   - [`toSignificantDigits()` / `toSD()`](README.md/#tosignificantdigits--tosd)
   - [`abs()`](README.md/#abs)
   - [`ceil()`](README.md/#ceil)
   - [`floor()`](README.md/#floor)
   - [`clamp()`](README.md/#clamp)
   - [`toExp()`](README.md/#toExp)
   - [`neg()`](README.md/#neg)
   - [`toIEEE754()`](README.md/#toIEEE754-floating-point-representation)
- [Math Operations](README.md/#math-operations)
   - [`add()`](README.md/#addition)
   - [`subtract()`](README.md/#subtract)
   - [`multiply()`](README.md/#multiply)
   - [`divide()`](README.md/#divide)
   - [`power()`](README.md/#power)
   - [`root()`](README.md/#root)
   - [`sqrt()`](README.md/#sqrt)
   - [`cbrt()`](README.md/#cbrt)
   - [`exp()`](README.md/#exp)
   - [`log()`](README.md/#log)
   - [`ln()`](README.md/#ln)
   - [`cos()`](README.md/#cos)
   - [`sin()`](README.md/#sin)
   - [`tan()`](README.md/#tan)
   - [`fact()`](README.md/#fact)
- [Chaining methods](README.md/#chaining-methods)
- [`clone()`](README.md/#clone)
- [Comparing numbers](README.md/#comparing-numbers)   
   - [`equalTo()`](README.md/#equalTo)
   - [`higherThan()`](README.md/#higherThan)
   - [`lowerThan()`](README.md/#lowerThan)
   - [`isNeg()`](README.md/#isNeg)
   - [`isPos()`](README.md/#isPos)
   - [`isInt()`](README.md/#isInt)
   - [`isFloat()`](README.md/#isFloat)
   - [`isZero()`](README.md/#isZero)
   - [`isNaN()`](README.md/#isNaN)
   - [`isFinite()`](README.md/#isFinite)
   - [`isBase()`](README.md/#isBase)
- [Configuration of the library](README.md/#Configuration-of-the-library) 
   - [`setDecimals()`](README.md/#setDecimals)
   - [`setAngle()`](README.md/#setAngle)
   - [`noConflict()`](README.md/#noConflict)
- [Constants](README.md/#constants)   
- [Special values](README.md/#special-values)   
---
## Create a BaseNumber object:
Let´s start creating our first BaseNumber. The constructor uses two arguments (last optional) to build the instance:
| Argument | Type                     | Detail   |
| ---      | ---                      | ---      | 
| `number` | Object / String / Number | Required |
| `base`   | Number                   | Optional |
```JavaScript
const dec = Base(10, 10);  // Base(number, base);

const hex = Base("f2", 16);
```
BaseNumber.js works with decimal base numbers by default, so you can omit the base argument:
```JavaScript
const dec = Base(10);
```
### Signed numbers
The library allows user to create signed numbers. Specify the sign in the first argument of the instance:
```JavaScript
const dec = Base(-10);

const oct = Base("--++10", 8);  // it´s "10" in base 8

const hex = Base("-+10", 2);    // it´s "-10" in base 2
```
### Scientific notation
BaseNumber.js also allows scientific notation within your numbers. You can init an instance this way:
```JavaScript
const dec = Base(10e-2);  // equals to "0.1" in base 10

const oct = Base(10e+2, 8);  // equals to "1000" in base 8

const hex = Base("ff.e10e-2", 16);  // equals to "0.ffe10" in base 16
```
Notice that `e-` / `e+` is refer to scientific notation. **Omitting** the sign (`+` or `-`) may cause *errors or unexpected results*:
```JavaScript
const hex1 = Base("ff.e10e-2", 16);  // equals to "0.ffe10" in base 16

const hex2 = Base("ff.e10e2", 16);   // equals to "ff.e10e2" in base 16, no scientific notation here

const dec = Base("10e2");   // Error, number doesn´t match base
```
### `valueOf()`
Returns an String that may contain letters and numbers, `0` is a signed number :
```JavaScript
const x = Base(-0);
const y = Base(0);
const z = Base("3a0", 16);

x.valueOf();  // returns "-0" in base 10
y.valueOf();  // returns "0" in base 10
z.valueOf();  // returns "3a0" in base 16
```
### `toString()`
Same as _valueOf()_ but 0 is not signed :
```JavaScript
const x = Base(-0);
const y = Base(0);

x.valueOf();  // returns "0" in base 10
y.valueOf();  // returns "0" in base 10
```
### `toNumber()`
Returns the number representation of the instance. If the instance is in base different than **10**, the method would return the decimal representation of the instance
```JavaScript
const dec = Base(10); 
const hex = Base("a", 16);
const pi = Base("3.1415926535897932384626433832795028841"); 

dec.toNumber();   // returns 10
hex.toNumber();   // returns 10
pi.toNumber();    // returns 3.141592653589793
```
### `base()`
Number base is save as an integer
```JavaScript
const dec = Base(10); 
const hex = Base("f2", 16);

dec.base();   // returns 10
hex.base();   // returns 16
```
### `sign()`
Returns a value representinf the sign of the instance:
| Sign  | Return |
|---    |---     |
| `+`   | _1_    |
| `-`   | _-1_   |
| `+0`  | _0_    |
| `-0`  | _-0_   |
| `NaN` | _NaN_  |

```JavaScript
x = Base("-abc", 16)
y = Base("NaN")
z = Base("le5k1p", 36)

x.sign()        // -1
y.sign()        // NaN
z.sign()        // 1
Base(0).sign()  // 0
Base(-0).sign() // -0
```
### `newValue()`
The `newValue` method allows user to modify the value of an instance. It takes two parameters, second is optional, and returns the same BaseNumber instance:
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
const dec = Base(10);

dec.newValue(5).valueOf();  // returns "5" in base 10

dec.valueOf() // returns "5" in base 10
```
### `toBase()`
BaseNumber.js has its own method to parse a number into a new base. It returns a new BaseNumber:
```JavaScript
const dec = Base(15);

dec.toBase(16).valueOf();  // returns "f" (15 in hexadecimal)
```
If base parameter is omitted, number would be parse in base **10** by default.
### `toDec()`
Similar to the parseBase(), returns a value parsed in decimal base. It does modify the instance itself. It´s a way to improve code readlibility:
```JavaScript
const hex = Base("f", 16);
hex.toDec().valueOf();   // returns "15"
```
### `toHex()`
```JavaScript
const dec = Base(15);
dec.toHex().valueOf();   // returns "f"
```
### `toOct()`
```JavaScript
const dec = Base(10);
dec.toOct().valueOf();   // returns "12"
```
### `toBin()`
```JavaScript
const dec = Base(10.0625);
dec.toBin().valueOf();       // returns "1010.0001"
```
### `trunc()`
Returns a new BaseNumber only with the integer part, similar to `parseInt()`
```JavaScript
const dec = Base(10.0625);
dec.trunc().valueOf();       // returns "10"
```
### `round()`
It rounds a number according to the precision passed as an argument, rounding up or down depending the number (and user parameters). The method returns a new instance with decimals rounded:
| Argument    | Type    | Detail   |
| ---         | ---     | ---      | 
| `precision` | Number  | Required |
| `exclusive` | Boolean | Optional |
```JavaScript
dec.round(precision[, exclusive]);
```
`precision` argument must be higher than 0 to avoid errors. If `precision` arg. is omitted, it would be **1** by default. `exclusive` argument allows user to decide how to round the middle number between 0 and the base. E.g: suppose a **base 9** number:
```JavaScript
const x = Base(10.04, 9);
```
The *4* digit is the middle number because base is an odd number (9), and the the possible symbols in the base are `[0, 1, 2, 3, (4), 5, 6, 7, 8]`.
```JavaScript
const x = Base(10.04, 9);

// by default, exclusive is false, so the middle number would be round up
x.round(1).valueOf();     // returns "10.1"

// exclusive is true, so the middle number would be round down
x.round(1, true).valueOf();     // returns "10"
```
### `toFixed()`
| Argument    | Type    | Detail   |
| ---         | ---     | ---      | 
| `precision` | Number  | Required |
| `exclusive` | Boolean | Optional |

Returns a string showing the number with `precision` decimals.
```JavaScript
dec.toFixed(precision[, exclusive]);
```
`precision` argument must be higher or equal to 0 to avoid errors. If `precision` arg. is omitted, it would returns the same as [valueOf()](README.md/#valueOf).
`exclusive` argument allows user to decide how to round the middle number between 0 and the base, see [round()](README.md/#round) for more info about this parameter.
```JavaScript

x = Base("4.5394")

x.toFixed();              // '4.5394'
x.toFixed(10);            // '4.5394000000'
x.toFixed(2);             // '4.54'
```
### `toPrecision()`
| Argument    | Type    | Detail   |
| ---         | ---     | ---      | 
| `precision` | Number  | Required |
| `exclusive` | Boolean | Optional |

Returns a string showing the number rounded with `precision` digits.
```JavaScript
dec.toPrecision(precision[, exclusive]);
```
`precision` argument must be higher than 0 to avoid errors. If `precision` arg. is omitted, it would returns the same as [valueOf()](README.md/#valueOf). If `precision` is less than the number of digits necessary to represent the integer part of the value in normal notation, then exponential notation is used.
`exclusive` argument allows user to decide how to round the middle number between 0 and the base, see [round()](README.md/#round) for more info about this parameter.
```JavaScript

x = Base("4765456.5394")

x.toPrecision();              // '4765456.5394'
x.toPrecision(15);             // '4765456.53940000'
x.toPrecision(2);             // '4.8 e+6'
```
### `toSignificantDigits()` / `toSD()`
| Argument    | Type    | Detail   |
| ---         | ---     | ---      | 
| `precision` | Number  | Required |
| `exclusive` | Boolean | Optional |

Returns a new BaseNumber whose value is the value of this instance rounded to `precision` significant digits.
```JavaScript
dec.toSignificantDigits(precision[, exclusive]);
```
`precision` argument must be higher than 0 to avoid errors. If `precision` arg. is omitted, it would returns the same as [valueOf()](README.md/#valueOf).
`exclusive` argument allows user to decide how to round the middle number between 0 and the base, see [round()](README.md/#round) for more info about this parameter.
```JavaScript
dec = Base(9876.54321)

dec.toSignificantDigits()                          // '9876.54321'
dec.toSignificantDigits(6)                         // '9876.54'
dec.toSD(2)                                        // '9900'
```
### `abs()`
Returns a new BaseNumber whose value is the absolute value the instance.
```JavaScript
dec = Base(-99);
dec.abs().valueOf()       // '99'
```
### `ceil()`
Returns a new BaseNumber whose value is the value of the instance rounded to a whole number in the direction of positive [Infinity](README.md/#special-values).
```JavaScript
x = Base(1.3)
x.ceil().valueOf()        // '2'

y = Base(-1.8)
y.ceil().valueOf()        // '-1'

z = Base("7a.2", 16)
z.ceil().valueOf()        // '7b'
```
### `floor()`
Returns a new BaseNumber whose value is the value of the instance rounded to a whole number in the direction of negative [Infinity](README.md/#special-values).
```JavaScript
x = Base(1.3)
x.ceil().valueOf()        // '1'

y = Base(-1.8)
y.ceil().valueOf()        // '-2'

z = Base("7a.2", 16)
z.ceil().valueOf()        // '79'
```
### `clamp()`
| Argument    | Type        | Detail   |
| ---         | ---         | ---      | 
| `min`       | BaseNumber  | Required |
| `max`       | BaseNumber  | Optional |

Returns a new BaseNumber whose value is the value of this instance clamped to the range delineated by min and max.
```JavaScript
x = Base(5)
min = Base(100)
max = Base(150)
x.clamp(min, max).valueOf()    // '100'
```
### `toExp()`
Returns a string representing the value of the instance rounded in exponential notation.
```JavaScript
dec = Base(9876.54321)
hex = Base("0.0f4ee21", 16)

dec.toExp()                          // '9.87654321 e+3'
hex.toExp()                          // 'f.4ee21 e-2'
```
### `neg()`
Returns a new BaseNumber with the opposite value of the instance:
```JavaScript
x = Base(10)
y = Base("-32", 16)

x.neg().valueOf()          // '-10'
y.neg().valueOf()          // '32'
```
### `toIEEE754()` Floating point representation
BaseNumber.js includes a method in which a number in any base can be transfromed to IEEE754 representation. Call the `toIEEE754()` method, it returns an object with three keys: `exponent`, `mantissa` and `sign`:
```JavaScript
dec.toIEEE754([bits64]);
```
The `bits64` argument allows to change the 32 bit floating point representation into a 64 bit representation. It´s by default `false` (32 bits).
```JavaScript
const dec = Base(10.625);

dec.toIEEE754();

/* returns
{
   exponent: "10000010",
   mantissa: "01010100000000000000000",
   sign: "0"
} */
```
## Math Operations
BaseNumber allows you to make math operations with normal variables or another BaseNumber instance. Although following examples show only integer numbers, *all math operation are also available for float numbers*.:
### `add()`
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
const dec = Base(10); 
const hex = Base("ff", 16); 

dec.add(hex);  // base argument is by default hex.base()

dec.add(hex, 10);  // base argument is by default hex.base(), doesn´t matter if there is a base argument
```
In case number argument is a string/float variable, the `base` parameter would be **10** by default, unless you specify it:
```JavaScript
dec.add(77);     // Base by default is 10 

dec.add(77, 8);  // Base is 8
```
Since the return value of the math functions is the modified instance, in order to take the value you need to add the [valueOf()](README.md/#valueOf) method at the end of the operation.
```JavaScript
dec.add(77).valueOf()   // returns the new value
```
The remaining Math operations works exactly the same:
### `subtract()`
```JavaScript
dec = Base(10);

dec.subtract(5).valueOf();         // "5"
dec.subtract("f", 16).valueOf();   // "-5"
```
### `multiply()`
```JavaScript
dec = Base(10);
bin = Base(1010, 2)

dec.multiply(5).valueOf();     // "50"
dec.multiply(bin).valueOf();   // "100"
```
### `divide()`
```JavaScript
dec = Base(10);

dec.divide(5).valueOf();         // "2"
dec.divide("a", 16).valueOf();   // "1"
```
### `pow()`
```JavaScript
dec = Base(10);

dec.pow(2).valueOf();       // "100"
dec.pow(10, 2).valueOf();   // "100"
```
### `root()`
```JavaScript
dec = Base(10);

dec.root(2).valueOf();        // "3.16227766...."
dec.root(2.4).valueOf();      // "2.61015721...."
dec.root("10", 2).valueOf();  // "3.16227766...."
```
### `sqrt()`
The same as `root(2)`:
```JavaScript
dec = Base(10);
dec.sqrt().valueOf();     // "3.16227766...."
```
### `cbrt()`
The same as `root(3)`:
```JavaScript
dec = Base(125);
dec.cbrt().valueOf();     // "5"
```
### `exp()`
Returns a new BaseNumber whose value is the base `e` (Euler's number, the base of the natural logarithm) exponential of the instance
```JavaScript
x = Base(1)
x.exp().valueOf()         // '2.7182818284590452354'
```
### `log()`
Returns a new BaseNumber whose value is the base x logarithm of the instance.
If x is omitted, the base 10 logarithm of the instance will be returned.

```JavaScript
x = Base(8)
x.log().valueOf();             // '0.903089....' 

y = Base("100", 16);
y.log(2).valueOf();             // '8' in base 16
y.log("10", 2).valueOf();       // '8' in base 16 
```
### `ln()`
Returns a new BaseNumber whose value is the natural logarithm of the instance.

The ln() is the inverse of the [`exp()`](README.md/#exp) function.
```JavaScript
x = Base(1)
x.ln().valueOf();             // '0' 

y = Base("7a.2", 16);
y.ln().valueOf();             // '4.ce176fb4d0...'
```
### `cos()`
Returns a new BaseNumber whose value is the cosine of the instance.
The operation would depend of the angle unit, see [`setAngle()`](README.md/#setAngle).
```JavaScript
x = Base(90)
x.cos().valueOf();             // '0' 

y = Base(0);
y.cos().valueOf();             // '1'
```
### `sin()`
Returns a new BaseNumber whose value is the sine of the instance.
The operation would depend of the angle unit, see [`setAngle()`](README.md/#setAngle).
```JavaScript
x = Base(90)
x.sin().valueOf();             // '1' 

y = Base(0);
y.sin().valueOf();             // '0'
```
### `tan()`
Returns a new BaseNumber whose value is the tangent of the instance.
The operation would depend of the angle unit, see [`setAngle()`](README.md/#setAngle).
```JavaScript
x = Base(90)
x.tan().valueOf();             // 'NaN' 

y = Base(0);
y.tan().valueOf();             // '0'
```
### `fact()`
Returns a new BaseNumber whose value is the factorial value of the instance.
If the number is a float, it would be truncated to ist integer part

```JavaScript
x = Base(3)
x.fact().valueOf();             // '6' 

y = Base(4.5345);
y.fact().valueOf();             // '24'
```
## Chaining methods
BaseNumber.js allows user to chain math and other operators that return a BaseNumber. The list of operators that can be chained is the following:
- [`newValue()`)](README.md/#newValue)
- [`round()`](README.md/#round)
- [`trunc()`](README.md/#trunc)
- [`clamp()`](README.md/#clamp)
- [`abs()`](README.md/#abs)
- [`neg()`](README.md/#neg)
- [`floor()`](README.md/#floor)
- [`ceil()`](README.md/#ceil)
- [`toBase()`](README.md/#toBase)
- [`toDec()`](README.md/#toDec)
- [`toHex()`](README.md/#toHex)
- [`toBin()`](README.md/#toBin)
- [`toOct()`](README.md/#toOct)
- [`add()`](README.md/#add)
- [`subtract()`](README.md/#subtract)
- [`multiply()`](README.md/#multiply)
- [`divide()`](README.md/#divide)
- [`pow()`](README.md/#pow)
- [`root()`](README.md/#root)
- [`sqrt()`](README.md/#sqrt)
- [`cbrt()`](README.md/#cbrt)
- [`exp()`](README.md/#exp)
- [`log()`](README.md/#log)
- [`ln()`](README.md/#ln)
- [`cos()`](README.md/#cos)
- [`sin()`](README.md/#sin)
- [`tan()`](README.md/#tan)
- [`fact()`](README.md/#fact)
- [`clone()`](README.md/#clone)

E.g:
```JavaScript
const dec = Base(10);

dec.add(5).subtract("f", 16).subtract(1).pow(2).toBin().toString();   // returns "1"
```
## `clone()`
Returns a new BaseNumber instance, which is a copy of the original isntance:
```JavaScript
const dec = Base(10);

const copy = dec.clone();

copy.toString()  // '10'
```
## Comparing numbers
BaseNumber.js allows user to make comparisons between instances or variables. Although following examples show only integer numbers, *all comparing operations are also available for float numbers*:
### `equalTo()`
Call the `equalTo()` method to check equality between values. It has two parameters, second is optional. It may return true or false.
```JavaScript
dec.equalTo(number[, base]);
```
The `number` argument can be either a string/number variable or another BaseNumber instance. In case it´s a BaseNumber instance, `base` parameter would be equal to the number instance's `base`. E.g:
```JavaScript
const dec = Base(15); 
const hex = Base("f", 16);

dec.equalTo(hex);   // returns true (base is hex.base())

hex.equalTo(dec);   // returns true (base is dec.base())
```
In case number argument is a string/number variable, the `base` parameter would be **10** by default, unless you specify it:
```JavaScript
const dec = Base(15); 
const hex = Base("f", 16);

dec.equalTo(15);   // returns true (base is 10 by default)

hex.equalTo(15, 16);   // returns false (base is 16)
```
### `higherThan()`
Call the `higherThan()` method to check if an element is higher than the argument number. It has two parameters, second is optional. It may return true or false.
```JavaScript
dec.higherThan(number[, base]);
```
It works the same as the `equalTo()` method.
### `lowerThan()`
Call the `lowerThan()` method to check if an element is lower than the argument number. It has two parameters, second is optional. It may return true or false.
```JavaScript
dec.lowerThan(number[, base]);
```
It works the same as the `equalTo()` method.
### `isNeg()`
Returns true if the number is negative, else returns false:
```JavaScript
const x = Base("-10")
const y = Base(-0);
const z = Base("100101", 2);

x.isNeg()   // true
y.isNeg()   // true
z.isNeg()   // false
```
### `isPos()`
Returns true if the number is positive, else returns false:
```JavaScript
const x = Base("-10")
const y = Base(-0);
const z = Base("100101", 2);

x.isPos()   // false
y.isPos()   // false
z.isPos()   // true
```
### `isInt()`
Returns true if the number has not after-dot digits
```JavaScript
const x = Base("10.345")
const y = Base(-0);
const z = Base("100101", 2);

x.isInt()   // false
y.isInt()   // true
z.isInt()   // true
```
### `isFloat()`
Returns true if the number has after-dot digits
```JavaScript
const x = Base("10.345")
const y = Base(-0);
const z = Base("100101", 2);

x.isFloat()   // true
y.isFloat()   // false
z.isFloat()   // false
```
### `isZero()`
Returns true whether the instance is `0` or '-0`, else returns false:
```JavaScript
const x = Base("0")
const y = Base(-0);
const z = Base("100101", 2);

x.isZero()   // true
y.isZero()   // true
z.isZero()   // false
```
### `isNaN()`
Returns true whether the instance is `NaN`, else returns false:
```JavaScript
const x = Base("NaN", 8)
const y = Base(NaN);
const z = Base("100101", 2);

x.isNaN()   // true
y.isNaN()   // true
z.isNaN()   // false
```
### `isFinite()`
Returns true whether the instance is a finite value, else returns false. Non finite values are `NaN`, `Infinity` and `-Infinity`, see [Special values](README.md/#special-values) for more information:
```JavaScript
const x = Base("NaN", 8)
const y = Base(Infinity);
const z = Base("100101", 2);

x.isFinite()   // false
y.isFinite()   // false
z.isFinite()   // true
```
### `isBase()`
Returns true whether the instance value is in x base.
If x is omitted, it would be **10** by default:
```JavaScript
const x = Base("NaN", 8)
const y = Base(Infinity);
const z = Base("100101", 2);

x.isBase(8)    // true
y.isBase()     // true (base 10)
z.isBase(16)   // false
```
## Configuration of the library
### `setDecimals()`
Set the number of decimals you want to reach in the operations. Take into account that more decimals may affect time execution of the library. The maximum recommend number of decimals is **1000** without losing precision. By **default**, the value is set as **20**:
```JavaScript
Base.setDecimals(50);
```
### `setAngle()`
Set the angle unit for trigonometric operations. there are two possible units: `"grades"` and `"radians"`. By **default**, the value is set as `"grades"`:
```JavaScript

Base.setAngle("grades");

Base(90).cos().valueOf();        // 0

// or

Base.setAngle("radians");

Base.Pi.divide(2).cos().valueOf();        // 0
```
### `noConflict()`
In case the `Base` variable was used by another variable before loading the library, this function allows user to revert the `Base` variable to the value it had before, and returns the **BaseNumber** constructor:
```Html
<script> let Base = 1 </script>
<script src='BaseNumber.js'></script>
<script>
  const x = Base("ff", 16)  
   
  const B = Base.noConflict()
   
  console.log( Base )     // 1
   
  const y = B(10)       
</script>
```
## Constants
BaseNumber has 4 precision constants values that you can implement in your projects.You can reach up to 1025 digits of precision. Each constant is also a BaseNumber instance:
```JavaScript
Base.Ln10.valueOf()      // '2.302585092.....'
Base.Ln2.valueOf()       // '0.693147180.....'
Base.Pi.valueOf()        // '3.141592653.....'
Base.e.valueOf()         // '2.718281828.....'
```
## Special Values
`±0`, `NaN` and `±Infinity` are valid BaseNumber values.

All values that are not `NaN` in range **(-Infinity, +Infinity)** are considered finite values.

```JavaScript
x = Base("NaN", 8)
y = Base(Infinity);
z = Base("-0", 2);

x.isNaN()          // True
x.isFinite()       // False

y.equalTo(1 / 0)   // True
y.isFinite()       // False

z.isNeg()          // True
z.isFinite()       // True
```

- Open source [MIT License](LICENSE)
