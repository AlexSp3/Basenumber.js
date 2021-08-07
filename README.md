# BaseNumber
A library that allows you to work with numbers in different bases from 2 to 36.

## Create a BaseNumber object:
```
const dec = new BaseNumber(10, 10);  // new BaseNumber(number, base);

const hex = new BaseNumber("f2", 16);
```
BaseNumber.js works with decimal base numers by default, so you can omit the base argument:
```
const dec = new BaseNumber(10);
```
### Obtain number value
Since BaseNumber allows user to create up to base 36 number, number value is an string that may contain letters and numbers:
```
dec.value();  // returns "10"
hex.value();  // returns "f2"
```
### Obtain number base
Number base is save as an integer
```
dec.base();   // returns 10
hex.base();   // returns 16
```
## Simple Math Operations
BaseNumber allows you to make some simple math operations with normal variables or another BaseNumber instance:
### Addition
The addition method takes three arguments, two of them optional:
```
dec.add(number[, base[, resultBase]]);
```
The `number` argument can be either a string/float variable or another BaseNumber instance. In case it´s a BaseNumber instance, `base` parameter would be equal to the number instance's `base`. E.g:
```
dec.add(hex);  // base argument is by default hex.base()
```
In case number argument is a string/float variable, the `base` parameter would be **10** by default, unless you specify it:
```
dec.add(77);     // Base by default is 10 

dec.add(77, 8);  // Base is 8
```




