const getNumber = e => isNaN(e) ? e.charCodeAt(0) - 87 : parseInt(e);
const Normalize = s => {
  s = s.toString().toLowerCase().split(",").join(".");
  s = s.split(" ").join("");
  s.indexOf(".") + 1 == s.length && (s = s.substring(0, s.length - 1));
  while (!s.indexOf("+") || !s.indexOf("-")){
    while (!s.indexOf("+")) s = s.substring(1, s.length);
    if (!s.indexOf("-")){
    	if (s.substring(1, 2) === "-") s = s.substring(2, s.length);
      else if (s.substring(1, 2) === "+") s = "-" + s.substring(2, s.length);
      else break;
    }
  }
  return s;
}
const fixNotation = n => {
  const sign = (n.split("")[0] === "-" ? 1 : 0);
  sign && (n = n.substring(1, n.length));
	let exp = null;
  if (((n.indexOf("e+")) >= 0 && (exp = "e+")) || ((n.indexOf("e-")) >= 0 && (exp = "e-"))) {
    n = n.split(exp);
    n[0] = n[0].split("");
    let dot = n[0].indexOf(".");
    if (dot >= 0) n[0].splice(dot, 1);	else dot = n[0].length;
    const moveDot = getNumber(n[1]);
    if (exp === "e+") {
      if (moveDot + dot < n[0].length)	n[0].splice(moveDot + dot, 0, ".");
      else if (moveDot + dot > n[0].length)	n[0].push("0".repeat(moveDot + dot - n[0].length));
    }else {
      if (dot - moveDot > 0)	n[0].splice(dot - moveDot, 0, ".");
      else if (dot - moveDot <= 0) n[0].unshift("0." + "0".repeat(Math.abs(dot - moveDot)));
    }
    n = n[0].join("");
  }
  n = n.split("");
  while(n[0] === "0" && n[1] !== ".")	n.shift();
  while((n[n.length - 1] === "0" || n[n.length - 1] === ".") && n.indexOf(".") <= n.length - 1 && n.indexOf(".") >= 0)	n.pop();
  return n.length ? (sign ? "-" : "") + n.join("") : "0";
}
const checkIncompatible = (n, base) => {
  let digits = n.split("e+").join("").split("e-").join("").split("");
  if (n === "" || digits.reduce((a, d) => d == "." ? ++a : a, 0) > 1 || digits.reduce((a, d) => d == "-" ? ++a : a, 0) > 1 || 
      (digits.some(d => isNaN(d) && (getNumber(d) < 10 || getNumber(d) > 35) && d != "." && d != "-")))   return "invalid number " + n;
  if (digits.some(d => getNumber(d) >= base))    return "number doesn´t match base";
  if (isNaN(base))	return "target base is Not A Number"; 
  if (base < 2 || base > 36)  return "base argument should be an integer between 2 and 36";
  return false;
};

class BaseNumber {
	#number; #base; #isFloat; #isNegative;
  constructor(n, base = 10) {  
    n = Normalize(n);
    base = parseInt(base);
    const state = checkIncompatible(n, base);
    if (state) throw "error building number: " + state; 
    n = fixNotation(n);
    let digits = n.split("");
    this.#number = n;
    this.#base = base;
    this.#isFloat = !(digits.reduce((a, d) => d == "." ? ++a : a, 0) < 1);
    this.#isNegative = (this.#number.split("")[0] === "-");
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

		const sign = (this.#isNegative ? "-" : "");
    const base = this.#base;
    let digits = this.#number.split("");
    sign === "-" && digits.shift();
    precision = parseInt(precision);
    if (precision < 0 || isNaN(precision)) throw "error rounding number: precision argument should be an integer higher than 0"; 
    
    if (typeof digits[digits.indexOf(".") + 1 + precision] === "undefined" ||
        !this.#isFloat)   return this;

    (base - !!exclusive) - getNumber(digits[digits.indexOf(".") + 1 + precision]) <= (base - !!exclusive) / 2 
    && add(digits.indexOf(".") + precision);
    digits.splice(digits.indexOf(".") + 1 + precision);
    !precision && digits.splice(-1);
    return this.newValue(sign + digits.join(""));
  }
  
  higherThan(target, base = 10) {
    const targetVal = parseFloat((target instanceof BaseNumber ? target.clone() : (new BaseNumber(target, base))).parseBase().#number);
    return parseFloat(this.clone().parseBase().#number) > targetVal;
  }
  
  lowerThan(target, base = 10) {
    const targetVal = parseFloat((target instanceof BaseNumber ? target.clone() : (new BaseNumber(target, base))).parseBase().#number);
    return parseFloat(this.clone().parseBase().#number) < targetVal;
  }
  
  equalTo(target, base = 10) {
  	const targetVal = parseFloat((target instanceof BaseNumber ? target.clone() : (new BaseNumber(target, base))).parseBase().#number);
    return parseFloat(this.clone().parseBase().#number) === targetVal;
  }
  
  parseBase(base = 10) {
    base = parseInt(base);
    const sign = (this.#isNegative ? "-" : "");
    const state = checkIncompatible("0", base);
    if (state) throw "error parsing number: " + state; 
  	const int = parseInt(this.#isFloat ? this.#number.split(".")[0] : this.#number, this.#base).toString(base);
    let dec = this.#isFloat ? this.#number.split(".")[1].split("").reduce((a, d, i) => a + getNumber(d) * Math.pow(this.#base, -(i + 1)), 0) : 0;
    let timeout = 100, parsedDec = [];
    while (timeout && (dec - Math.floor(dec))) {
      dec = parseFloat(((dec - Math.floor(dec)) * base).toFixed(14));
      const toPush = Math.floor(dec);
      parsedDec.push(toPush > 9 ? String.fromCharCode(toPush + 87) : toPush);
    	timeout--;
    }
    return this.newValue(((sign === "-" && int.split("")[0] !== sign) ? sign : "") + int + (parsedDec.length ? "." + parsedDec.join("") : ""), base);
  }
  
  newValue(n, base = this.#base) {
    if (n instanceof BaseNumber) {
    	this.#number = n.#number;
      this.#base = n.#base;
      this.#isFloat = n.#isFloat;
      this.#isNegative = n.#isNegative;
    }else{
      n = Normalize(n);
      base = parseInt(base);
      const state = checkIncompatible(n, base); 
      if (state) throw "error modifying number: " + state; 
      this.#number = n;
      this.#base = base;
      this.#isFloat = !(n.split("").reduce((a, d) => d == "." ? ++a : a, 0) < 1);
      this.#isNegative = (n.split("")[0] === "-");
    }
    return this;
  }
  
  add(target, base = 10) {
  	const holdBase = this.#base;
    return this.newValue(parseFloat(this.parseBase().#number) + 
    parseFloat((target instanceof BaseNumber ? target.clone() : 
    new BaseNumber(target, base)).parseBase().#number), 10).parseBase(holdBase);
  }
  
  subtract(target, base = 10) {
  	const holdBase = this.#base;
    return this.newValue(parseFloat(this.parseBase().#number) - 
    parseFloat((target instanceof BaseNumber ? target.clone() : 
    new BaseNumber(target, base)).parseBase().#number), 10).parseBase(holdBase);
  }
  
  multiply(target, base = 10) {
  	const holdBase = this.#base;
    return this.newValue(parseFloat(this.parseBase().#number) * 
    parseFloat((target instanceof BaseNumber ? target.clone() : 
    new BaseNumber(target, base)).parseBase().#number), 10).parseBase(holdBase);
  }
  
  divide(target, base = 10) {
  	const holdBase = this.#base;
    return this.newValue(parseFloat(this.parseBase().#number) / 
    parseFloat((target instanceof BaseNumber ? target.clone() : 
    new BaseNumber(target, base)).parseBase().#number), 10).parseBase(holdBase);
  }
  pow(target, base = 10) {
    const holdBase = this.#base;
    return this.newValue(Math.pow(
    parseFloat(this.clone().parseBase().#number), 
    parseFloat((target instanceof BaseNumber ? target.clone() : new BaseNumber(target, base)).parseBase().#number)), 10).parseBase(holdBase);
  }
  root(target, base = 10) {
  	if (this.#isNegative && !((target instanceof BaseNumber ? target.#number : target) % 2))	throw "error: cannot take the even root of a negative number";
    this.#isNegative && (this.#number = this.#number.substring(1, this.#number.length));
  	return this.newValue((this.#isNegative ? "-" : "") + 
    this.pow(1 / (target instanceof BaseNumber ? target.clone() : new BaseNumber(target, base)).parseBase().#number, 10).#number);
  }
  
  toDec() {	return this.parseBase();	}
  toHex() {	return this.parseBase(16);}
  toBin() {	return this.parseBase(2);	}
  toOct() {	return this.parseBase(8);	}
  
  value() { return this.#number;	}
  base() { return this.#base;	}
  
  toIEEE754(bits64 = false) {
  	const bin = this.clone().parseBase(2).#number.split(""), mantL = (bits64 ? 52 : 23), expL = (bits64 ? 11 : 8);
    let sign = "0";
    bin[0] === "-" && (sign = "1") && bin.shift();
    const dot = (this.#isFloat ? bin.indexOf(".") : bin.length);
    bin.splice(dot, 1);
    const exp = new BaseNumber(bin.indexOf("1") >= 0 ? dot - bin.indexOf("1") - 1 + (bits64 ? 1023 : 127) : 0).parseBase(2).#number.split("");
    while (bin.indexOf("1") > 0) bin.shift();
    bin.shift();
    while (bin.length < mantL) 	bin.push("0");	 
    while (exp.length < expL) 	exp.unshift("0");	   
    return {	sign: sign, exponent: exp.join("").substring(0, expL), mantissa: bin.join("").substring(0, mantL)};
  }
  
  clone() { return new BaseNumber(this.#number, this.#base);	}
}
