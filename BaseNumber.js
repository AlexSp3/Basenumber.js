const getNumber = e => isNaN(e) ? e.charCodeAt(0) - 87 : parseInt(e);
const Normalize = s => {
  s = s.toString().toLowerCase().split(",").join(".");
  s.indexOf(".") + 1 == s.length && (s = s.substring(0, s.length - 1));
  return s;
}
const checkIncompatible = (n, base) => {
  let digits = n.split("");
  if (n === "" || digits.reduce((a, d) => d == "." ? ++a : a, 0) > 1 || 
      (digits.some(d => isNaN(d) && (getNumber(d) < 10 || getNumber(d) > 35) && d != ".")))   return "Invalid number";
  if (digits.some(d => getNumber(d) >= base  && d != "."))    return "Number doesn´t match base";
  if (isNaN(base))	return "Target base is Not A Number"; 
  if (base < 2 || base > 36)  return "Invalid base argument";
  return false;
};

class BaseNumber {
	#number; #base; #isFloat;
  constructor(n, base = 10) {  
    n = Normalize(n);
    let digits = n.split("");
    base = parseInt(base);
    const state = checkIncompatible(n, base);
    if (state) throw "error building number: " + state; 
    
    this.#number = n;
    this.#base = base;
    this.#isFloat = !(digits.reduce((a, d) => d == "." ? ++a : a, 0) < 1);
  }
  
  fixed(precision, exclusive = false) {
    const add = p => {
      if (digits[p] == ".") add(p - 1);
      else if (getNumber(digits[p]) + 1 == base) {
        digits[p] = "0";
        p > 0 ? add(p - 1) : digits.unshift("1");
      }else {
        isNaN(digits[p]) ? digits[p] = String.fromCharCode(digits[p].charCodeAt(0) + 1)
        : digits[p] = (digits[p] < 9 ? parseInt(digits[p]) + 1 : "a");
      }
    };

    const base = this.#base;
    let n = this.#number;
    let digits = n.split("");
    precision = parseInt(precision);
    if (precision < 0 || isNaN(precision)) throw "error rounding number: Invalid precision argument"; 
    
    if (typeof digits[digits.indexOf(".") + 1 + precision] === "undefined" ||
        !this.#isFloat)   return n;

    (base - !!exclusive) - getNumber(digits[digits.indexOf(".") + 1 + precision]) <= (base - !!exclusive) / 2 
    && add(digits.indexOf(".") + precision);
    digits.splice(digits.indexOf(".") + 1 + precision);
    !precision && digits.splice(-1);
    return digits.join("");
  }
  
  higherThan(target, base = 10) {
    const targetVal = parseFloat(target instanceof BaseNumber ? target.parseBase() : (new BaseNumber(target, base)).parseBase());
    return parseFloat(this.parseBase()) > targetVal;
  }
  
  lowerThan(target, base = 10) {
    const targetVal = parseFloat(target instanceof BaseNumber ? target.parseBase() : (new BaseNumber(target, base)).parseBase());
    return parseFloat(this.parseBase()) < targetVal;
  }
  
  equalTo(target, base = 10) {
  	const targetVal = parseFloat(target instanceof BaseNumber ? target.parseBase() : (new BaseNumber(target, base)).parseBase());
    return parseFloat(this.parseBase()) === targetVal;
  }
  
  parseBase(base = 10) {
    base = parseInt(base);
    const state = checkIncompatible("0", base);
    if (state) throw "error parsing number: " + state; 
  	const int = parseInt(this.#isFloat ? this.#number.split(".")[0] : this.#number, this.#base);
    let dec = this.#isFloat ? this.#number.split(".")[1].split("").reduce((a, d, i) => a + getNumber(d) * Math.pow(this.#base, -(i + 1)), 0) : 0;
    
    const parsedInt = int.toString(base);
    let timeout = 100, parsedDec = [];
    while (timeout && (dec - Math.floor(dec))) {
      dec = parseFloat(((dec - Math.floor(dec)) * base).toFixed(15));
      const toPush = Math.floor(dec);
      parsedDec.push(toPush > 9 ? String.fromCharCode(toPush + 87) : toPush);
    	timeout--;
    }
    return parsedInt + (parsedDec.length ? "." + parsedDec.join("") : "");
  }
  
  newValue(n, base = this.#base) {
    const temp = new BaseNumber(this.#number, this.#base);
    if (n instanceof BaseNumber) {
    	Object.assign(this, n);
    }else{
      n = Normalize(n);
      base = parseInt(base);
      const state = checkIncompatible(n, base); 
      if (state) throw "error modifying number: " + state; 
      this.#number = n;
      this.#base = base;
      this.#isFloat = !(n.split("").reduce((a, d) => d == "." ? ++a : a, 0) < 1);
    }
    return temp;
  }
  
  newBase(base) {
  	base = parseInt(base);
    const state = checkIncompatible("0", base);
    if (state) throw "error parsing number: " + state; 
    this.#number = this.parseBase(base);
    this.#base = base;
    return this.#number;
  }
  
  add(target, base = 10, resultBase = this.#base) {
    return target instanceof BaseNumber ?
    new BaseNumber(parseFloat(this.parseBase()) + parseFloat(target.parseBase())).parseBase(resultBase) :
    new BaseNumber(parseFloat(this.parseBase()) + parseFloat(new BaseNumber(target, base).parseBase())).parseBase(resultBase);
  }
  
  subtract(target, base = 10, resultBase = this.#base) {
  	return target instanceof BaseNumber ?
    new BaseNumber(parseFloat(this.parseBase()) - parseFloat(target.parseBase())).parseBase(resultBase) :
    new BaseNumber(parseFloat(this.parseBase()) - parseFloat(new BaseNumber(target, base).parseBase())).parseBase(resultBase);
  }
  
  multiply(target, base = 10, resultBase = this.#base) {
  	return target instanceof BaseNumber ?
    new BaseNumber(parseFloat(this.parseBase()) * parseFloat(target.parseBase())).parseBase(resultBase) :
    new BaseNumber(parseFloat(this.parseBase()) * parseFloat(new BaseNumber(target, base).parseBase())).parseBase(resultBase);
  }
  
  divide(target, base = 10, resultBase = this.#base) {
  	return target instanceof BaseNumber ?
    new BaseNumber(parseFloat(this.parseBase()) / parseFloat(target.parseBase())).parseBase(resultBase) :
    new BaseNumber(parseFloat(this.parseBase()) / parseFloat(new BaseNumber(target, base).parseBase())).parseBase(resultBase);
  }
  pow(target, base = 10, resultBase = this.#base) {
  	return target instanceof BaseNumber ?
    new BaseNumber(Math.pow(parseFloat(this.parseBase()), parseFloat(target.parseBase()))).parseBase(resultBase) :
    new BaseNumber(Math.pow(parseFloat(this.parseBase()) , parseFloat(new BaseNumber(target, base).parseBase()))).parseBase(resultBase);
  }
  root(target, base = 10, resultBase = this.#base) {
  	return this.pow(1 / (target instanceof BaseNumber ? target.parseBase() : new BaseNumber(target, base).parseBase()), 10, resultBase);
  }
  
  toDec() {	return this.parseBase();	}
  toHex() {	return this.parseBase(16);}
  toBin() {	return this.parseBase(2);	}
  toOct() {	return this.parseBase(8);	}
  
  value() { return this.#number;	}
  base() { return this.#base;	}
}
