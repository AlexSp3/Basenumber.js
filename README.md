# BaseNumber
A library that allows you to work with numbers in different bases from 2 to 36.

## Create a BaseNumber object:
```
const dec = new BaseNumber(10, 10);  // new BaseNumber(number, base);
```
BaseNumber.js works with decimal base numers by default, so you can omit the base argument:
```
const dec = new BaseNumber(10);
```
### Obtain number value
```
dec.value();  // returns 10
```
### Obtain number base
```
dec.base();   // returns 10
```
