const getNumber = e => isNaN(e) ? e.charCodeAt(0) - 87 : parseInt(e);
const Normalize = s => {
  s = s.toString().toLowerCase().split(",").join(".");
  s.indexOf(".") + 1 == s.length && (s = s.substring(0, s.length - 1));
  return s;
}

class BaseNumber {
    constructor(n, base) {
  	const checkIncompatible = () => {
      if (n === "" || digits.reduce((a, d) => d == "." ? ++a : a, 0) > 1 || 
          (digits.some(d => isNaN(d) && (getNumber(d) < 10 || getNumber(d) > 35) && d != ".")))   return "Invalid number";
      if (digits.some(d => getNumber(d) >= base  && d != "."))    return "Number doesn´t match base";
      if (base < 2 || base > 36)  return "Invalid base argument";
      return false;
    };
    
    n = Normalize(n);
    let digits = n.split("");
    base = parseInt(base);
    let state = checkIncompatible();
    if (state) throw "Error creating number: " + state; 
    
    this.number = n;
    this.base = base;
    this.isFloat = !(digits.reduce((a, d) => d == "." ? ++a : a, 0) < 1);
  }
  
  fixed(precision) {
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

    const base = this.base;
    let n = this.number;
    let digits = n.split("");
    if (precision < 0) throw "Error rounding number: Invalid precision argument"; 
    
    if (typeof digits[digits.indexOf(".") + 1 + precision] === "undefined" ||
        !this.isFloat)   return n;

    base - getNumber(digits[digits.indexOf(".") + 1 + precision]) <= base / 2 
    && add(digits.indexOf(".") + precision);
    digits.splice(digits.indexOf(".") + 1 + precision);
    !precision && digits.splice(-1);
    return digits.join("");
  }
  
  higherThan(target, base = target.base) {
    const checkIncompatible = () => {
      if (n === "" || digits.reduce((a, d) => d == "." ? ++a : a, 0) > 1 || 
          (digits.some(d => isNaN(d) && (getNumber(d) < 10 || getNumber(d) > 35) && d != ".")))   return "Invalid target number";
      if (digits.some(d => getNumber(d) >= base  && d != "."))    return "Target number doesn´t match base";
      if (typeof base === "undefined")	return "Target base is undefined"; 
      if (base < 2 || base > 36)  return "Invalid target base argument";
      return false;
    };
   
    let n = Normalize(typeof target.number !== "undefined" ? target.number : target);
    let digits = n.split("");
    let state = checkIncompatible();
    if (state) throw "Error comparing number: " + state; 
    if (parseInt(this.number.split(".")[0], this.base) === parseInt(n.split(".")[0], base)){
    	const thisVal = this.isFloat ? this.number.split(".")[1].split("").reduce((a, d, i) => a + d * Math.pow(this.base, -(i + 1)), 0) : 0;
      const targetVal = typeof n.split(".")[1] !== "undefined" ? n.split(".")[1].split("").reduce((a, d, i) => a + d * Math.pow(base, -(i + 1)), 0) : 0;
      if (thisVal > targetVal) return true;
      else return false;
    }else if (parseInt(this.number.split(".")[0], this.base) > parseInt(n.split(".")[0], base))	
    	return true;
    else return false;
  }
  
  lowerThan(target, base = target.base) {
    const checkIncompatible = () => {
      if (n === "" || digits.reduce((a, d) => d == "." ? ++a : a, 0) > 1 || 
          (digits.some(d => isNaN(d) && (getNumber(d) < 10 || getNumber(d) > 35) && d != ".")))   return "Invalid target number";
      if (digits.some(d => getNumber(d) >= base  && d != "."))    return "Target number doesn´t match base";
      if (typeof base === "undefined")	return "Target base is undefined"; 
      if (base < 2 || base > 36)  return "Invalid target base argument";
      return false;
    };
   
    let n = Normalize(typeof target.number !== "undefined" ? target.number : target);
    let digits = n.split("");
    let state = checkIncompatible();
    if (state) throw "Error comparing number: " + state; 
    if (parseInt(this.number.split(".")[0], this.base) === parseInt(n.split(".")[0], base)){
    	const thisVal = this.isFloat ? this.number.split(".")[1].split("").reduce((a, d, i) => a + d * Math.pow(this.base, -(i + 1)), 0) : 0;
      const targetVal = typeof n.split(".")[1] !== "undefined" ? n.split(".")[1].split("").reduce((a, d, i) => a + d * Math.pow(base, -(i + 1)), 0) : 0;
      if (thisVal < targetVal) return true;
      else return false;
    }else if (parseInt(this.number.split(".")[0], this.base) < parseInt(n.split(".")[0], base))	
    	return true;
    else return false;
  }
  
  equalTo(target, base = target.base) {
  	if (!this.higherThan(target, base) && !this.lowerThan(target, base))	return true;
    return false;
  }
}