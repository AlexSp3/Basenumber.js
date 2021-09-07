![basenumber.js](/img/logo.png)

![version](/img/version.png)


A Javascript **BigDecimal** library for arbitrary precision that allows you to work with numbers in different bases from **2 to 36**.

## Description
* Allows integers, floating, and negative **2 to 36** base numbers.
* Work with **Big Integers** and **Big Decimals**.
* Specify the number of digits after comma.
* Do base transformation in a easy and fast way.
* Decimal `power` and nth `root` allowed.
* Includes `toFixed`, `toExponential`, `toPrecision`, `toString` for basenumber instances, similar to javascript number methods.
* Includes `floor`, `ceil`, `round`, `trunc`, `pow`, `sqrt`, `sign`, `exp`, `abs`, and **trigonometrics functions** similar to the [Math](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math) object in javascript.
* Includes high precision constants you can include in your project: `Pi`, `e`, `Ln10`, `Ln2`.
* No dependencies.
* Clear [documentation](https://github.com/alexpalapine2003/BaseNumber/wiki) and [speed tests](https://github.com/alexpalapine2003/BaseNumber/wiki).

## Use in browser
```Html
<script src='path/basenumber.js'></script>
```
The minify version
```Html
<script src='path/basenumber.min.js'></script>
```
## Use it in Node.js:
```
$ npm install basenumber.js
```
```Html
const Base = require('basenumber.js');
```
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

Library allows Infinity and NaN as values
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
```
---
Open source [MIT License](LICENSE)
