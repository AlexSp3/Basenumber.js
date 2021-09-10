![logo](https://user-images.githubusercontent.com/37636391/132720326-7f39d50a-a0e9-4668-a257-559ce2e552cb.png)

<!---![Stars](https://img.shields.io/github/stars/AlexSp3/Basenumber.js)-->
<!---![Downloads](https://img.shields.io/github/downloads/AlexSp3/Basenumber.js/total.svg)-->
[![License](https://img.shields.io/github/license/AlexSp3/Basenumber.js.svg)](LICENSE)
![Mantained?](https://img.shields.io/badge/Maintained%3F-yes-green.svg)
[![GitHub tag](https://img.shields.io/github/tag/AlexSp3/Basenumber.js.svg)](https://github.com/AlexSp3/Basenumber.js/releases)

---
A **BigDecimal** library for arbitrary precision that allows you to work with numbers in different bases from **2 to 36**.

Clear [**documentation**](https://github.com/AlexSp3/Basenumber.js/wiki) and [**speed tests**](https://github.com/AlexSp3/Basenumber.js/wiki/Tests).

## Description
* Allows integers, floating, and negative **2 to 36** base numbers.
* Work with **Big Integers** and **Big Decimals**.
* Do base transformation in a easy and fast way.
* Specify the precision digits after comma.
* Decimal `power` and nth `root` allowed.
* Includes `floor`, `ceil`, `round`, `trunc`, `pow`, `sqrt`, `sign`, `exp`, `abs`, and **trigonometrics functions** similar to the [**Math**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math) object in javascript.
* Includes high precision constants you can include in your project: `Pi`, `e`, `Ln10`, `Ln2`.
* No dependencies.
* Based on native `BigInt` Javascript library.
* Little more than **20kb** minified!

## Use in browser
```Html
<script src='path/basenumber.js'></script>
```
The **minify** version in a CDN, to avoid downloading the repository:
```Html
<script src='https://cdn.jsdelivr.net/gh/AlexSp3/Basenumber.js@main/BaseNumber.min.js'></script>
```
## Use in Node.js:
```
$ npm install basenumber.js
```
```Javascript
const Base = require('basenumber.js');
```
## Available methods

| Number / String methods  | Base convertion | Math operations | Comparison | Library configuration |
| ---: | --: | ---: | --: | --: |
| [`abs()`](https://github.com/AlexSp3/Basenumber.js/wiki/#abs) | [`toBase()`](https://github.com/AlexSp3/Basenumber.js/wiki/#toBase) | [`acos()`](https://github.com/AlexSp3/Basenumber.js/wiki/#acos)  | [`equalTo()`](https://github.com/AlexSp3/Basenumber.js/wiki/#equalTo)  | [`setDecimals()`](https://github.com/AlexSp3/Basenumber.js/wiki/#setdecimals) |
| [`ceil()`](https://github.com/AlexSp3/Basenumber.js/wiki/#ceil) | [`toDec()`](https://github.com/AlexSp3/Basenumber.js/wiki/#todec) | [`add()`](https://github.com/AlexSp3/Basenumber.js/wiki/#add)  | [`isBase()`](https://github.com/AlexSp3/Basenumber.js/wiki/#isBase)  | [`setAngle()`](https://github.com/AlexSp3/Basenumber.js/wiki/#setangle) |
| [`clamp()`](https://github.com/AlexSp3/Basenumber.js/wiki/#clamp) | [`toHex()`](https://github.com/AlexSp3/Basenumber.js/wiki/#tohex) | [`asin()`](https://github.com/AlexSp3/Basenumber.js/wiki/#asin)  | [`isFinite()`](https://github.com/AlexSp3/Basenumber.js/wiki/#isFinite)  | [`noConflict()`](https://github.com/AlexSp3/Basenumber.js/wiki/#noConflict) |
| [`floor()`](https://github.com/AlexSp3/Basenumber.js/wiki/#floor) | [`toOct()`](https://github.com/AlexSp3/Basenumber.js/wiki/#toOct) | [`atan()`](https://github.com/AlexSp3/Basenumber.js/wiki/#atan)  | [`isFloat()`](https://github.com/AlexSp3/Basenumber.js/wiki/#isFloat)  | |
| [`neg()`](https://github.com/AlexSp3/Basenumber.js/wiki/#neg) | [`toBin()`](https://github.com/AlexSp3/Basenumber.js/wiki/#toBin) |  [`cbrt()`](https://github.com/AlexSp3/Basenumber.js/wiki/#cbrt)  | [`isInt()`](https://github.com/AlexSp3/Basenumber.js/wiki/#isInt)  | |
| [`round()`](https://github.com/AlexSp3/Basenumber.js/wiki/#round) | | [`cos()`](https://github.com/AlexSp3/Basenumber.js/wiki/#cos)  | [`isNaN()`](https://github.com/AlexSp3/Basenumber.js/wiki/#isnan)  | |
| [`toExponential()` / `toExp()`](https://github.com/AlexSp3/Basenumber.js/wiki/#toexponential--toexp) | | [`divide()`](https://github.com/AlexSp3/Basenumber.js/wiki/#divide)  | [`isNeg()`](https://github.com/AlexSp3/Basenumber.js/wiki/#isNeg)  | |
| [`toFixed()`](https://github.com/AlexSp3/Basenumber.js/wiki/#tofixed)| | [`fact()`](https://github.com/AlexSp3/Basenumber.js/wiki/#fact)  | [`isPos()`](https://github.com/AlexSp3/Basenumber.js/wiki/#ispos)  | |
| [`toNumber()`](https://github.com/AlexSp3/Basenumber.js/wiki/#tonumber) | | [`exp()`](https://github.com/AlexSp3/Basenumber.js/wiki/#exp)  | [`isZero()`](https://github.com/AlexSp3/Basenumber.js/wiki/#iszero)  | |
| [`toPrecision()`](https://github.com/AlexSp3/Basenumber.js/wiki/#toprecision) | | [`ln()`](https://github.com/AlexSp3/Basenumber.js/wiki/#ln)  | [`lowerThan()`](https://github.com/AlexSp3/Basenumber.js/wiki/#lowerThan)  | |
| [`toSignificantDigits()` / `toSD()`](https://github.com/AlexSp3/Basenumber.js/wiki/#tosignificant--tosd) | | [`log()`](https://github.com/AlexSp3/Basenumber.js/wiki/#log)  | |
| [`toString()`](https://github.com/AlexSp3/Basenumber.js/wiki/#tostring) | | [`multiply()`](https://github.com/AlexSp3/Basenumber.js/wiki/#multiply)  | |
| [`trunc()`](https://github.com/AlexSp3/Basenumber.js/wiki/#trunc) | | [`pow()`](https://github.com/AlexSp3/Basenumber.js/wiki/#pow)  | |
|                                                                   | | [`root()`](https://github.com/AlexSp3/Basenumber.js/wiki/#root)  |  |
|                                                                   | |[`sin()`](https://github.com/AlexSp3/Basenumber.js/wiki/#sin)  | |
|                                                                   | | [`sqrt()`](https://github.com/AlexSp3/Basenumber.js/wiki/#sqrt)  | |
|                                                                   | | [`subtract()`](https://github.com/AlexSp3/Basenumber.js/wiki/#subtract)  | |
|                                                                   | |  [`tan()`](https://github.com/AlexSp3/Basenumber.js/wiki/#tan)  | |



## Examples
Create a basenumber from a Number, String, or another basenumber
```Javascript
Base.setDecimals(10);

dec = Base(15);
bin = Base("1010", 2);
hex = Base("1f", 16);
copy = Base(hex);

dec.add(bin);                    // '25'
bin.multiply(hex).log(2);        // '1000.0100011011'
bin.divide(dec).toFixed(3);      // '0.101'
dec.subtract("a", 16);           // '5'

hex.equalTo(copy)     // true
bin.lowerThan(dec)    // true
copy.higherThan(hex)  // false
```

Library allows `±0`, `NaN` and `±Infinity` as values
```Javascript
x = Base(Infinity);
y = Base(-Infinity);
z = Base(NaN);

x.isFinite()              // false
y.isFinite()              // false
z.isFinite()              // false
z.isNaN()                 // true
x.equalTo(y)              // false
x.equalTo(Infinity)       // true
x.higherThan("ffff", 16)  // true
Base(0).equalTo(-0)       // true
```
## Base transformation
When transforming from one base to another base, it returns a new **Basenumber**
```Javascript
x = Base(100);
y = Base("f.f", 16);
z = Base("n3sv6g", 36);

x.toBase(2)    // '1100100'
x.toBin()      // '1100100'
x.toHex()      // '64'
x.toBase(30)   // '3a'

y.toBase(8)    // '17.74'
y.toDec()      // '15.9375'

z.toDec()      // '1397155624'
z.toOct()      // '12321563450'
z.toBin()      // '1010011010001101110011100101000'

x.toBin().toDec()   // '100'
```
## Round numbers in any base

There isn't a built-in function that can round numbers in other base than 10. You can use the [`round()`](https://github.com/AlexSp3/Basenumber.js/wiki/#round) method in Basenumber.js

```Javascript
x = Base(9.417, 8)
y = Base("5d10.af5", 16)

x.round(2)     // '9.42' in base 8
x.round(1)     // '9.4' in base 8
x.round(0)     // '10' in base 8

y.round(2)     // '5d10.af' in base 16
y.round(1)     // '5d10.b' in base 16
y.round(0)     // '5d11' in base 16
```

## Chaining methods
```Javascript
x = Base(100);

x.add(5).subtract(80).add("101", 2).toHex().toString()    // '1e' 
```
## High precision values
You can specify the number of digits after comma. This value is the same for any base
```Javascript
Base.setDecimals(100);

x = Base("101", 2);

x.ln()            // 1.1001110000000100000111110111111011011000110100110011011010101111110111110111011110100101000101100001

x.toDec().ln()    // 1.6094379124341003746007593332261876395256013542685177219126478914741789877076577646301338780931796111

```
Basenumber has **high precision constants**, up to **1025 digits** to include in your projects:
```Javascript
Base.Pi      // '3.1415926535897932384626433832795028...'
Base.e       // '2.7182818284590452353602874713526624...'
Base.Ln2     // '0.6931471805599453094172321214581765...'
Base.Ln10    // '2.3025850929940456840179914546843642...'
```
## Can I contribute?
Of course you can! Contributers are necessary for mantaining and improve the library. If you want to contribute, do not hesitate to make a [**pull request**](https://github.com/AlexSp3/Basenumber.js/pulls). If you need some information on how to contribute on a Github project, [**this reading**](https://gist.github.com/MarcDiethelm/7303312)  might be useful.
## Website
### [https://alexsp3.github.io/Basenumber.js](https://alexsp3.github.io/Basenumber.js)

---
Open source [**MIT License**](LICENSE)
