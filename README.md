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
```
### Obtain number base
Number base is save as an integer
```
dec.base();   // returns 10
```
