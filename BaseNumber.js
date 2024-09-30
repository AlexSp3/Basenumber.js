/*
MIT License
Copyright (c) 2021 alexpalapine2003
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

(function(globalScope) {

    "use strict";

    let decimals = 20;

    let shift = "0".repeat(decimals + 1);

    let angles = "degrees";

    let oldCtrValue = globalScope.Base;

    // The natural logarithm of 10 (1025 digits).
    const LN10 = '2.3025850929940456840179914546843642076011014886287729760333279009675726096773524802359972050895982983419677840422862486334095254650828067566662873690987816894829072083255546808437998948262331985283935053089653777326288461633662222876982198867465436674744042432743651550489343149393914796194044002221051017141748003688084012647080685567743216228355220114804663715659121373450747856947683463616792101806445070648000277502684916746550586856935673420670581136429224554405758925724208241314695689016758940256776311356919292033376587141660230105703089634572075440370847469940168269282808481184289314848524948644871927809676271275775397027668605952496716674183485704422507197965004714951050492214776567636938662976979522110718264549734772662425709429322582798502585509785265383207606726317164309505995087807523710333101197857547331541421808427543863591778117054309827482385045648019095610299291824318237525357709750539565187697510374970888692180205189339507238539205144634197265287286965110862571492198849978748873771345686209167058';
    // The natural logarithm of 2 (1025 digits).
    const LN2 = '0.6931471805599453094172321214581765680755001343602552541206800094933936219696947156058633269964186875420014810205706857336855202357581305570326707516350759619307275708283714351903070386238916734711233501153644979552391204751726815749320651555247341395258829504530070953263666426541042391578149520437404303855008019441706416715186447128399681717845469570262716310645461502572074024816377733896385506952606683411372738737229289564935470257626520988596932019650585547647033067936544325476327449512504060694381471046899465062201677204245245296126879465461931651746813926725041038025462596568691441928716082938031727143677826548775664850856740776484514644399404614226031930967354025744460703080960850474866385231381816767514386674766478908814371419854942315199735488037516586127535291661000710535582498794147295092931138971559982056543928717000721808576102523688921324497138932037843935308877482597017155910708823683627589842589185353024363421436706118923678919237231467232172053401649256872747782344535347648114941864238677677440';
    const PI = '3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019385211055596446229489549303819644288109756659334461284756482337867831652712019091456485669234603486104543266482133936072602491412737245870066063155881748815209209628292540917153643678925903600113305305488204665213841469519415116094330572703657595919530921861173819326117931051185480744623799627495673518857527248912279381830119491298336733624406566430860213949463952247371907021798609437027705392171762931767523846748184676694051320005681271452635608277857713427577896091736371787214684409012249534301465495853710507922796892589235420199561121290219608640344181598136297747713099605187072113499999983729780499510597317328160963185950244594553469083026425223082533446850352619311881710100031378387528865875332083814206171776691473035982534904287554687311595628638823537875937519577818577805321712268066130019278766111959092164201989380952572010654858632788';
    const E = '2.7182818284590452353602874713526624977572470936999595749669676277240766303535475945713821785251664274274663919320030599218174135966290435729003342952605956307381323286279434907632338298807531952510190115738341879307021540891499348841675092447614606680822648001684774118537423454424371075390777449920695517027618386062613313845830007520449338265602976067371132007093287091274437470472306969772093101416928368190255151086574637721112523897844250569536967707854499699679468644549059879316368892300987931277361782154249992295763514822082698951936680331825288693984964651058209392398294887933203625094431173012381970684161403970198376793206832823764648042953118023287825098194558153017567173613320698112509961818815930416903515988885193458072738667385894228792284998920868058257492796104841984443634632449684875602336248270419786232090021609902353043699418491463140934317381436405462531520961836908887070167683964243781405927145635490613031072085103837505101157477041718986106873969655212671546889570350354021234078498193343210681';

    const numerals = '0123456789abcdefghijklmnopqrstuvwxyz';

    const MAX_FLOAT_VALUE = "11111111111111111111111011111111100000111000000110101100100101000111000000100011101001111001111001000000000000000000000000000000";
    const MAX_DOUBLE_VALUE = "11111111111111111111111111111111111111111111111111111011101011101000110110000001011001010011000011110011101000100011110110111111010111000000010111011000010110101101010111000110010010111000000100000110001100110001010011010001000111111010100001110110010011000110111011100100110110001010001110000001010000100111001101111001101000100110000100010000101000000100001100001000101111011100111010111111000110011101000101001100111001011110011001010000111101010010100100110111101101110110010101101110010010001100111101101010010010001101101001111110000111010011010000101111010110000001100011010001000100100000001010110001101000101010101100100011110101100111011110110100011001000111011110001110001011000100110100011010011011111001100111111101011" + "0".repeat(293);

    const err = (func, msg) => { throw "error [BaseNumber.js] in " + func + ": " + msg; }

    /* @function Normalize string
     *
     * Replace commas by dot and remove spaces
     * Simplify signs +/- at the beginning
     * 
     * @param (string)
     * @return string normalized
     */
    const Normalize = s => {
        s = String(s).split(",").join(".").split("_").join("").split(" ").join("");
        s !== "NaN" && s.indexOf("Infinity") === -1 && (s = s.toLowerCase());
        s.indexOf(".") + 1 == s.length && (s = s.substring(0, s.length - 1));
        while (s[0] === "+" || s[0] === "-") {
            while (s[0] === "+") s = s.slice(1);
            if (s[0] === "-") {
                if (s[1] === "-") s = s.slice(2);
                else if (s[1] === "+") s = "-" + s.slice(2);
                else break;
            }
        }
        return s;
    }

    /* @function Fix notation 
     *
     * If user writes a number with scientific notation the function 
     * simplify it to a string with 0 at the left or right
     * 
     * Remove trailing zeros and fix dot notation
     * 
     * @param (string)
     * @return string without notation
     */
    const fixNott = n => {
        const sign = (n[0] === "-");
        sign && (n = n.slice(1));
        let exp;
        if (((n.indexOf("e+")) >= 0 && (exp = "e+")) || ((n.indexOf("e-")) >= 0 && (exp = "e-"))) {
            n = n.split(exp);
            n[0] = n[0].split("");
            let dot = n[0].indexOf(".");
            dot >= 0 ? n[0].splice(dot, 1) : dot = n[0].length;
            const moveDot = parseInt(n[1], 10);

            if (isNaN(moveDot)) err("'constructor'", "invalid exponent");

            try {
                // Move the comma/dot
                if (exp === "e+") {
                    if (moveDot + dot < n[0].length) n[0].splice(moveDot + dot, 0, ".");
                    else if (moveDot + dot > n[0].length) n[0].push("0".repeat(moveDot + dot - n[0].length));
                } else {
                    if (dot - moveDot > 0) n[0].splice(dot - moveDot, 0, ".");
                    else if (dot - moveDot <= 0) n[0].unshift("0." + "0".repeat(Math.abs(dot - moveDot)));
                }
                n = n[0].join("");
            } catch (e) {
                err("'constructor'", "max number length exceded");
            }
        }
        n = n.split("");
        // remove extra '0' at right
        while (n[0] === "0" && n[1] !== ".") n.shift();
        // add '0' at left if has a dot at index 0
        n[0] === "." && n.unshift("0");
        // remove extra '0' at right if is float, or extra '.'
        while (n.indexOf(".") >= 0 && (n[n.length - 1] === "0" || n[n.length - 1] === ".")) n.pop();
        return (sign ? "-" : "") + (n.length ? n.join("") : "0");
    };

    const _catch = (n, base, func) => {
        let digits = n.replace("NaN", "0").replace("Infinity", "0").replace("e+", "").replace("e-", "").split("");
        if (n === "" || digits.reduce((a, d) => d == "." ? ++a : a, 0) > 1 || digits.reduce((a, d) => d == "-" ? ++a : a, 0) > 1 ||
            (digits.some(d => isNaN(d) && (B.getNumber(d) < 10 || B.getNumber(d) > 36) && d != "." && d != "-"))) err(func, "invalid number " + n);
        if (digits.some(d => B.getNumber(d) >= base)) err(func, "number '" + n + "' doesn't match base " + base);
        if (isNaN(base)) err(func, "target base is Not A Number");
        if (base < 2 || base > 36) err(func, "base argument should be an integer between 2 and 36");
    };

    /* @function Lexicographic comparition 
     *
     * When working with strings cannot compare like numbers, so need to
     * make them the same length and add '0' on the left and on the right to
     * compare each character
     * 
     * It catches +Infinity and -Infinity
     * Using function with NaN returns non sense result
     * 
     * @param (string, string)
     * @return 1, -1 or 0 depends on the comparition result
     */
    function cmp(s1, s2) {

        // Fix sign
        let sign1 = "1", sign2 = "1";

        if (s1[0] === "-") {
            sign1 = "0";
            s1 = s1.slice(1);
        } else if (s1[0] === "+") {
            s1 = s1.slice(1);
        }

        if (s2[0] === "-") {
            sign2 = "0";
            s2 = s2.slice(1);
        } else if (s2[0] === "+") {
            s2 = s2.slice(1);
        }


        // check special values
        if (s1 === "Infinity") {
            if (s1 === s2) return sign1 > sign2;
            return sign1 === "0" ? -1 : 1;
        }
        if (s2 === "Infinity") {
            return sign2 === "0" ? 1 : -1;
        }

        //  add point in case there isn't
        s1 += s1.indexOf(".") < 0 ? ".0" : "";
        s2 += s2.indexOf(".") < 0 ? ".0" : "";

        // Add '0' on the left
        s1 = s1.split(".")[0].padStart(s2.indexOf("."), "0") + "." + s1.split(".")[1];
        s2 = s2.split(".")[0].padStart(s1.indexOf("."), "0") + "." + s2.split(".")[1];
        // Add '0' on the right
        s1 = sign1 + s1.padEnd(s2.length, "0");
        s2 = sign2 + s2.padEnd(s1.length, "0");

        return s1 > s2 || -(s1 < s2);
    };

    /* @function BigInteger arithmetic 
     *
     * BigInt is a built-in library that allows user to make operations with big integers.
     * However, there isn´t something available for BigDecimals.
     * This function implements a BigDecimal inside BaseNumber.js
     * 
     * @param (string, string, string)
     * @return the result of the operation
     */
    const arith = (b1, b2, op) => {

        // Fix precision to what is needed
        b1 = b1.split(".").concat("");
        b1[1] = b1[1].slice(0, decimals);
        b1 = b1[0] + (b1[1].length ? "." + b1[1] : "");

        b2 = b2.split(".").concat("");
        b2[1] = b2[1].slice(0, decimals);
        b2 = b2[0] + (b2[1].length ? "." + b2[1] : "");

        if (op === "pow") return fixNott(_pow(b1, b2));
        if (op === "root") return fixNott(_pow(b1, arith("1", b2, "d")));

        // Add point at the end in case there isn't
        b1 += (b1.indexOf(".") < 0 ? "." : "");
        b2 += (b2.indexOf(".") < 0 ? "." : "");

        // Add '0' on the right
        b1 = b1.padEnd(b1.indexOf(".") + b2.length - b2.indexOf("."), "0");
        b2 = b2.padEnd(b2.indexOf(".") + b1.length - b1.indexOf("."), "0");

        // Get dot index
        const dot = b1.indexOf(".");

        // Erase dots
        b1 = b1.replace(".", "");
        b2 = b2.replace(".", "");

        // Decimals after comma
        const dec = Math.abs(dot - b1.length);

        // In order to move the comma we need to remove the sign to avoid errors like '0000-0.56'
        function fixDot(s, cond) {
            const sign = (s[0] === "-" ? "-" : "");
            sign && (s = s.slice(1));
            s = s.padStart(cond, "0");
            return sign + s.slice(0, s.length - cond) + "." + s.slice(s.length - cond);
        }

        if (op === "a") return fixNott(fixDot(String(BigInt(b1) + BigInt(b2)), dec));
        if (op === "s") return fixNott(fixDot(String(BigInt(b1) - BigInt(b2)), dec));
        if (op === "m") return fixNott(fixDot(String(BigInt(b1) * BigInt(b2)), dec * 2));
        if (op === "d") return fixNott(fixDot(String(BigInt(b1 + shift) / BigInt(b2)), decimals + 1));
        if (op === "mod") return fixNott(fixDot(String(BigInt(b1) % BigInt(b2)), dec));

        function _pow(a, b) {
            // To avoid undefined due to trailing right zeros
            if (a === "0") return b1;

            // If b is integer make normal power
            if (b.indexOf(".") == -1 && a.indexOf(".") == -1) {
                // Remove "0" at right to short time execution
                let tZeros = 0;
                for (; a[a.length - 1] === "0"; tZeros++) a = a.slice(0, -1);

                return String(BigInt(a) ** BigInt(b)) + (tZeros ? "0".repeat(tZeros).repeat(b) : "");

                //If 'a' or 'b' are floats do exp(b * ln(a))
            } else {
                const oldDecimals = decimals,
                    extraDec = Math.floor((b * 1.3) * Math.log10(a));

                if (decimals + extraDec > 1042) {
                    err("'pow()'", "arguments are too big to reach the precision required")
                }

                B.setDecimals(decimals + extraDec);

                const r = naturalExponential(arith(b, naturalLogarithm(a), "m"));

                B.setDecimals(oldDecimals);
                return r;
            }

        };
    };

    function naturalLogarithm(x) {
        /* Series converges faster when argument is closer to 1, so let's reduce the argument the way that
         * ln(x) = ln(a*10^b) 
         * = ln(a) + b * ln(10)
         */
        let r = "0",
            a = x.replace(".", ""),
            b = (x.indexOf(".") + 1 || x.length + 1) - 2;
        // If number <= 0.9
        if (cmp(x, "0.9") != 1) {
            // Trail zeros at left to convert any decimal <= 0.9 into an integer
            for (; a[0] === "0"; b--) a = a.slice(1);
        }
        a = a[0] + "." + a.slice(1);

        // If a is higher or equal to 1.1
        if (cmp(a, "1.1") > -1) {
            /* Reduce the argument again using ln(2) the way that
             * ln(a) = ln(r*2^y) 
             * = ln(r) + y * ln(2)
             */
            let y = Math.floor(a / 2) - 1;
            y < 1 && (y = 1);
            const d = String(2 ** y);
            r = arith(naturalLogarithm(arith(a, d, "d")), arith(String(y), LN2, "m"), "a");

        } else {
            // Take logarithm
            let aux = arith(arith(a, "1", "s"), arith(a, "1", "a"), "d"),
                acc = aux,
                sq = arith(aux, aux, "m"),
                last = "x",
                cur = 0;
            // Use Taylor series
            for (let i = 1; cur <= decimals; i += 2) {
                last = r;
                r = arith(r, arith(acc, String(i), "d"), "a");
                acc = arith(acc, sq, "m");
                // Search for a digit that is not accurate
                for (; last[cur] === r[cur] && cur <= decimals; cur++);
            }
            r = arith(r, "2", "m");
        }

        return arith(r, arith(String(b), LN10, "m"), "a");
    }

    function naturalExponential(x) {
        /* Argument reduction 
         * if x > LN2, do 
         * exp(x) = exp(a) * 2^b  where a = x - b * ln2, b = floor(x / ln2)
         */
        if (cmp(x, LN2) == 1) {
            // Do floor
            let b = arith(x, LN2, "d");
            // if b has decimals
            if (b.indexOf(".") + 1) {
                b = b.split(".")[0];
                // if b is negative
                if (b[0] === "-") {
                    let i = b.length - 1;
                    for (; b[i] === "0"; i--) b[i] = "9";
                    b[i] = String(b[i] - 1);
                }
            }

            // Precision error. Result would not be correctly rounded since LN2 constant has only 1025 decimals
            const decRequired = decimals + b / 3.25;
            if (decRequired > 1042) {
                err("'exp()'", "argument '" + x + "' is too big to reach the precision required");
            }

            const oldDecimals = decimals;
            B.setDecimals(decRequired);

            const r = arith(naturalExponential(arith(x, arith(b, LN2, "m"), "s")), String(BigInt(2) ** BigInt(b)), "m");
            B.setDecimals(oldDecimals);
            return r;
        } else {
            let r = arith("1", x, "a"),
                // Take exponential
                last = "x",
                cur = 0,
                fact = "1",
                acc = arith(x, x, "m");
            // Use Taylor/Maclaurin series
            for (let i = 2; cur < r.length; i++) {
                last = r;
                // Get new factorial
                fact = arith(fact, String(i), "m");
                r = arith(r, arith(acc, fact, "d"), "a");
                acc = arith(acc, x, "m");
                // Search for a digit that is not accurate
                for (; cur < r.length && last[cur] === r[cur]; cur++);
            }
            return r;
        }
    }

    function cosine(x) {
        let r = "1",
            last = "x",
            cur = 0,
            fact = "1",
            acc = arith(x, x, "m"),
            sq = acc;
        // Use Taylor series
        for (let i = 2; cur <= decimals; i += 2) {
            last = r;
            // Get new factorial
            fact = arith(fact, arith(String(i - 1), String(i), "m"), "m");
            r = arith(r, arith(acc, fact, "d"), (i % 4 ? "s" : "a"));
            acc = arith(acc, sq, "m");
            // Search for a digit that is not accurate
            for (; last[cur] === r[cur] && cur <= decimals; cur++);
        }
        return r;
    }

    function sine(x) {
        let r = x,
            last = "x",
            cur = 0,
            fact = "1",
            sq = arith(x, x, "m"),
            acc = arith(sq, x, "m");
        // Use Taylor series
        for (let i = 3; cur <= decimals; i += 2) {
            last = r;
            // Get new factorial
            fact = arith(fact, arith(String(i - 1), String(i), "m"), "m");
            r = arith(r, arith(acc, fact, "d"), ((i - 1) % 4 ? "s" : "a"));
            acc = arith(acc, sq, "m");
            // Search for a digit that is not accurate
            for (; last[cur] === r[cur] && cur <= decimals; cur++);
        }
        return r;
    }

    function inverseTangent(x) {
        /*
         * Domain: [-Infinity, Infinity]
         * Range: [-pi/2, pi/2]
         *
         * atan(x) = x - x^3/3 + x^5/5 - x^7/7 + ...
         * */

        /* Argument reduction
         * atan(x) = 2 * atan(x / (1 + sqrt(1 + x^2)))
         */
        if (cmp(x, "0.5") == 1) {
            return arith("2", inverseTangent(arith(x, arith("1", arith(arith("1", arith(x, x, "m"), "a"), "2", "root"), "a"), "d")), "m");
        } else {
            // Take inverseTangent
            let r = x,
                last = "x",
                cur = 0,
                sq = arith(x, x, "m"),
                acc = x;
            // Use Taylor series
            for (let i = 3; cur <= decimals; i += 2) {
                last = r;
                acc = arith(acc, sq, "m");
                r = arith(r, arith(acc, String(i), "d"), ((i - 1) % 4 ? "s" : "a"));
                // Search for a digit that is not accurate
                for (; last[cur] === r[cur] && cur <= decimals; cur++);
            }
            return r;
        }
    }


    function factorial(x) {
        let r = "1";
        for (let i = "2"; cmp(i, x) < 1; i = String(BigInt(i) + BigInt("1"))) {
            r = String(BigInt(r) * BigInt(i));
        }
        return r;
    }

    B.setDecimals = (n) => {

        // decimals must be >= 0
        if (n < 0)
            err("'Base.setDecimals()'", `Invalid decimals value ${value}`);

        decimals = n;
        shift = "0".repeat(decimals + 1);
    }

    B.setAngle = (value = 1) => {
        value = value.toLowerCase();
        if (value !== "degrees" && value !== "radians") {
            err("'setAngle()'", "Invalid unit " + value);
        }
        angles = value === "degrees";
    }

    B.getNumber = e => numerals.indexOf(e);

    B.someNan = (...n) => n.some(e => e.isNaN());
    B.someInf = (...n) => n.some(e => !e.isFinite());
    B.someZero = (...n) => n.some(e => e.isZero());
    B.allInf = (...n) => n.every(e => !e.isFinite());
    B.allZero = (...n) => n.every(e => e.isZero());
    B.difSign = (x, y) => x.s !== y.s;

    B.max = (...arg) => {
        const n = arg.map(e => new B(e.n || e, e.b || 10).toB());
        return n.reduce((max, e) => cmp(e.n, max.n) == 1 ? e : max, new B("-Infinity"));
    }

    B.min = (...arg) => {
        const n = arg.map(e => new B(e.n || e, e.b || 10).toB());
        return n.reduce((min, e) => cmp(e.n, min.n) == -1 ? e : min, new B("Infinity"));
    }

    B.radians = (x, base = x.b || 10) => {
        n = new B(x, base).toB().n;
        return new B(arith(arith(n, PI, "m"), "180", "d")).toB(base);
    }

    // Constants
    B.Ln10 = new B(LN10);
    B.Ln2 = new B(LN2);
    B.Pi = new B(PI);
    B.e = new B(E);

    function B(n, base = 10) {
        if (!(this instanceof B)) return new B(n, base);
        if (n instanceof B) return n.clone();
        if (n instanceof BigInt) n = n.toString();

        n = Normalize(n);
        base = parseInt(base, 10);

        _catch(n, base, "'constructor()'");
        n = fixNott(n);
        const P = this;
        P.n = n;
        P.b = base;
        P.f = (n.indexOf(".") + 1);
        P.s = (n[0] === "-");

        /* Returns a new Basenumber with precision digits rounded using 'exclusive' if it is true 
         *
         * Number of digits after comma DO NOT depend on the 'base'
         * E.g.
         * 
         * Base(14.2309, 10).round(3)    =>   '14.231'
         * Base('f.a0ee', 16).round(3)   =>   'f.a0f'
         * 
         */

        P.round = function(precision = 1, exclusive = false) {

            // carry in case of overflow
            const _addOne = p => {
                if (digits[p] == ".") _addOne(p - 1);
                else if (B.getNumber(digits[p]) + 1 == base) {
                    digits[p] = "0";
                    p > 0 ? _addOne(p - 1) : digits.unshift("1");
                } else {
                    digits[p] = numerals[B.getNumber(digits[p]) + 1];
                }
            };

            // Non-finite? or Non-float
            if (!P.isFinite() || !P.f)
                return P.clone();

            const
                sign = (P.s ? "-" : ""),
                base = P.b;

            let digits = P.n.split("");
            sign === "-" && digits.shift();

            if (precision < 0 || isNaN(precision))
                err("'round()'", "precision argument should be a number higher than -1");

            precision = Math.min(precision, decimals);

            const
                dot = digits.indexOf("."),
                nextDigit = digits[dot + 1 + precision];

            if (typeof nextDigit === "undefined")
                return P.clone();

            // Add +1 to the last precision digit if necessary
            (base - !!exclusive) - B.getNumber(nextDigit) <= (base - !!exclusive) / 2 &&
                _addOne(dot + precision);

            // Truncate non-significant digits
            digits.splice(digits.indexOf(".") + 1 + precision);
            !precision && digits.splice(-1);

            return new B(sign + digits.join(""), P.b);
        }

        /* Returns a String representing the number with 'precision' digits after comma
         * Show extra '0' if needed
         *
         * Base(10).toFixed(3)            =>   '10.000'
         * Base('9ff'00005)'.toFixed(1)   =>   '9ff.0'
         * 
         */

        P.toFixed = function(precision = P.n.split(".").concat("")[1].length, exclusive = false) {
            // Non-finite?
            if (!P.isFinite()) return P.n;

            precision = Math.min(precision, decimals);
            if (precision < 0 || isNaN(precision)) err("'toFixed()'", "precision argument should be a number higher than -1");

            // Round
            const n = P.round(precision, exclusive);
            const [ints, decs] = n.n.split(".").concat("");

            // PadEnd to show extra '0'
            return ints + "." + decs.padEnd(precision, "0");
        }

        P.trunc = function() { return new B(P.n.split(".")[0], P.b); }

        P.toPrecision = function(precision = P.abs().n.length - (P.f ? 1 : 0), exclusive = false) {
            if (!P.isFinite()) return P.n;
            precision = Math.min(precision, P.abs().trunc().n.length + decimals);
            if (precision < 1 || isNaN(precision))
                err("'toPrecision()'", "precision argument should be a number higher than 0");

            let n = P.abs().n,
                dot = n.indexOf(".") + 1;

            dot ? dot-- : dot = n.length;

            n = new B("0" + "." + n.replace(".", ""), P.b).round(precision, exclusive).n.slice(2).padEnd(dot > precision ? dot : precision, "0");
            n = n.substring(0, dot) + "." + n.slice(dot);

            if (dot > precision ? dot : precision > n.length - 1)
                return new B((P.s ? "-" : "") + n, P.b).toExp();
            else {
                n[n.length - 1] === "." && (n = n.substring(0, n.length - 1));
                return (P.s ? "-" : "") + n;
            }
        }

        P.toSignificantDigits = P.toSD = function(precision = P.abs().n.length - (P.f ? 1 : 0), exclusive = false) {
            if (!P.isFinite()) return P.n;
            precision = Math.min(precision, P.abs().trunc().n.length + decimals);
            if (precision < 1 || isNaN(precision))
                err("'toSignificantDigits()'", "precision argument should be a number higher than 0");

            let n = P.abs().n,
                dot = n.indexOf(".") + 1;

            dot ? dot-- : dot = n.length;

            n = new B("0" + "." + n.replace(".", ""), P.b).round(precision, exclusive).n.slice(2).padEnd(dot, "0");

            return fixNott((P.s ? "-" : "") + n.substring(0, dot) + "." + n.slice(dot));
        }

        P.higherThan = function(target, base = 10) {
            return cmp(P.round(decimals).toB().n, new B(target, base).round(decimals).toB().n) == 1;
        }

        P.lowerThan = function(target, base = 10) {
            return cmp(P.round(decimals).toB().n, new B(target, base).round(decimals).toB().n) == -1;
        }

        P.equalTo = function(target, base = 10) {
            return !cmp(P.round(decimals).toB().n, new B(target, base).round(decimals).toB().n);
        }

        P.newValue = function(n, base = P.b) {
            n = new B(n, base);
            Object.getOwnPropertyNames(n).forEach(prop => P[prop] = n[prop]);
            return P;
        }

        P.add = function(target, base = 10) {
            target = new B(target, base).toB();
            // Some NaN, Infinity, Zero
            if (B.someZero(P, target) || B.someInf(P, target)) return new B(P.toB() + target, P.b);

            return new B(arith(P.toB().n, target.n, "a")).toB(P.b).round(decimals);
        }

        P.subtract = function(target, base = 10) {
            target = new B(target, base).toB();
            // Some NaN, Infinity, Zero
            if (B.someZero(P, target) || B.someInf(P, target)) return new B(P.toB() - target, P.b);

            return new B(arith(P.toB().n, target.n, "s")).toB(P.b).round(decimals);
        }

        P.multiply = function(target, base = 10) {
            target = new B(target, base).toB();
            // Some NaN, Infinity, Zero
            if (B.someZero(P, target) || B.someInf(P, target)) return new B(P.toB() * target, P.b);

            return new B(arith(P.toB().n, target.n, "m")).toB(P.b).round(decimals);
        }

        P.divide = function(target, base = 10) {
            target = new B(target, base).toB();
            // Some NaN, Infinity, Zero
            if (B.someZero(P, target) || B.someInf(P, target)) return new B(P.toB() / target, P.b);

            return new B(arith(P.toB().n, target.n, "d")).toB(P.b).round(decimals);
        }
        P.module = function(target, base = 10) {
            target = new B(target, base).toB();
            // Some NaN, Infinity, Zero
            if (B.someZero(P, target) || B.someInf(P, target)) return new B(P.toB() % target, P.b);

            return new B(arith(P.toB().n, target.n, "mod")).toB(P.b).round(decimals);
        }
        P.pow = function(target, base = 10) {
            target = new B(target, base).toB();
            // Some NaN, Infinity, Zero
            if (B.someZero(P, target) || B.someInf(P, target)) return new B(Math.pow(P.toB(), target), P.b);

            return new B(arith(P.toB().n, target.n, "pow")).toB(P.b).round(decimals);
        }
        P.root = function(target, base = 10) {
            target = new B(target, base).toB();
            // Some NaN, Infinity, Zero
            if (B.someZero(P, target) || B.someInf(P, target)) return new B(Math.pow(P.toB(), 1 / target), P.b);

            /* Determine sign (complex number) return NaN
             * Some operations that can be performed in a calculator like
             * root[3](-2) Cannot be performed since the formula would not converge for negative numbers
             */
            if (P.s) {
                return new B("NaN", P.b);
            }

            target = target.n;
            const dot = target.indexOf(".") + 1 || target.length;
            const dec = target.length - dot;
            target = target.replace(".", "");

            // Fix precision decimals
            const oldDecimals = decimals;
            B.setDecimals(decimals + (Math.floor((1 * decimals) / 100) || 2));

            let aux = arith(P.n, target, "root");
            aux = arith(aux, "1" + "0".repeat(dec >= 0 ? dec : 0), "pow");
            const r = new B(aux).toB(P.b);

            B.setDecimals(oldDecimals);
            return r.round(decimals);
        }
        P.sqrt = function() { return P.root(2); }
        P.cbrt = function() { return P.root(3); }

        P.fact = function() {
            if (!P.isFinite()) return P.clone();
            const n = P.toB().trunc().n;

            return new B(factorial(n)).toB(P.b);
        }

        P.toDec = function() { return P.toB(); }
        P.toHex = function() { return P.toB(16); }
        P.toBin = function() { return P.toB(2); }
        P.toOct = function() { return P.toB(8); }

        P.valueOf = function() { return P.n; }
        P.toString = function() { return P.isZero() ? P.abs().n : P.n; }
        P.base = function() { return P.b; }
        P.sign = function() {
            if (P.isZero() || P.isNaN()) return +P;
            return P.s ? -1 : 1;
        }

        /* Returns an object with 3 keys representing the floating point representation
         * of the number in 32 or 64 bits. Sensitive to special values such as NaN or ±Infinity 
         *
         * NaN         = 1 11111111 11111111111111111111111
         * Infinity    = 0 11111111 00000000000000000000000
         * -Infinity   = 1 11111111 00000000000000000000000
         * 
         */
        P.toIEEE754 = function(bits64 = false) {
            let bin = P.toB(2).n,
                sign = "0";
            const mantL = (bits64 ? 52 : 23),
                expL = (bits64 ? 11 : 8);
            // Determine sign
            bin[0] === "-" && (sign = "1") && (bin = bin.slice(1));
            // check for NaN
            if (P.isNaN()) {
                return { sign: "1", exponent: "1".repeat(expL), mantissa: "1".repeat(mantL) };
            }

            // check for non finite values
            if (cmp(bin, bits64 ? MAX_DOUBLE_VALUE : MAX_FLOAT_VALUE) == 1) {
                return { sign: sign, exponent: "1".repeat(expL), mantissa: "0".repeat(mantL) };
            }

            // Save comma index
            const dot = (P.f ? bin.indexOf(".") : bin.length);
            // Remove comma
            bin = bin.replace(".", "");
            // Exponent: how many times did comma move
            const _one = bin.indexOf("1");

            let exp = new B(_one >= 0 ? dot - _one - 1 + (bits64 ? 1023 : 127) : 0);

            // If negative, means exp = 0
            if (exp.isNeg()) {
                exp = "0";
                bin = "0";
            } else {
                exp = exp.toB(2).n;

                // Remove left zeros
                while (bin.indexOf("1") > 0) bin = bin.slice(1);
                bin = bin.slice(1);
            }

            return { sign: sign, exponent: exp.padStart(expL, "0").slice(0, expL), mantissa: bin.padEnd(mantL, "0").slice(0, mantL) };
        }

        P.clone = function() { return new B(P.n, P.b); } // new B(P) cause overflow

        P.toNumber = function() { return +P.toB(); }

        P.abs = function() { return new B(P.s ? P.n.slice(1) : P.n, P.b); }

        P.floor = function() { return P.s ? P.abs().ceil().neg() : new B(P.n.split(".")[0], P.b); }

        P.ceil = function() {
            if (P.f) {
                if (P.s) {
                    return P.abs().floor().neg();
                } else {
                    return new B(String(BigInt(new B(P.n.split(".")[0], P.b).toB().n) + BigInt("1"))).toB(P.b);
                }
            } else return P.clone();
        }

        P.clamp = function(min, max) {
            return B.min(B.max(P, min), max);
        }

        P.neg = function() { return new B(P.s ? P.n.slice(1) : "-" + P.n, P.b); }

        P.isNeg = function() { return P.s; }
        P.isPos = function() { return !P.s; }
        P.isInt = function() { return !P.f; }
        P.isFloat = function() { return P.f; }
        P.isBase = function(base = 10) { return P.b === parseInt(base); }
        P.isZero = function() { return P.abs().n === "0" }
        P.isFinite = function() { return P.abs().n !== "Infinity" && !P.isNaN(); }
        P.isNaN = function() { return P.n === "NaN" }

        P.toExponential = P.toExp = function(digits = -1) {
            if (!P.isFinite()) return P.n;
            let n = P.abs().n;
            let exp = (P.f ? n.indexOf(".") : n.length) - 1;
            n = n.replace(".", "");

            while (n[0] === "0" && n.length !== 1)(n = n.slice(1)) && exp--;

            // by default show all digits
            digits = Math.floor(digits);
            if (digits < 0)(digits = n.length);
            else digits++;
            // fill extra zeros if needed
            n = n.padEnd(digits, "0");

            return (P.s ? "-" : "") + n[0] + "." + n.slice(1, digits) + " e" + (exp > -1 ? "+" + exp : exp);
        }

        /*  ln(-n)        = NaN
         *  ln(0)         = -Infinity
         *  ln(-0)        = -Infinity
         *  ln(1)         = 0
         *  ln(Infinity)  = Infinity
         *  ln(-Infinity) = NaN
         *  ln(NaN)       = NaN
         */
        P.ln = function() {
            // If number is zero return -Infinity
            if (P.isZero()) return new B("-Infinity", P.b);
            // If negative return NaN
            if (P.s) return new B("NaN", P.b);
            // If +Infinity
            if (!P.isFinite()) return P.clone();
            // Fix precision decimals
            const oldDecimals = decimals;
            B.setDecimals(decimals + (Math.floor(decimals / 100) || 2));

            const r = new B(naturalLogarithm(P.toB().n)).toB(P.b);

            B.setDecimals(oldDecimals);
            return r.round(decimals);
        }

        P.log = function(y = 10) {
            // If number is negative or zero return NaN
            if (cmp(P.n, "0") != 1) return new B("NaN", P.b);
            // If +Infinity
            if (!P.isFinite()) return P.clone();
            // Fix precision decimals
            const oldDecimals = decimals;
            B.setDecimals(decimals + (Math.floor(decimals / 100) || 2));

            const r = new B(arith(naturalLogarithm(P.toB().n), naturalLogarithm(String(y)), "d")).toB(P.b);

            B.setDecimals(oldDecimals);
            return r.round(decimals);
        }

        P.exp = function() {
            // If Infinity/NaN return the object cloned
            if (!P.isFinite()) return P.clone();
            // Fix precision decimals
            const oldDecimals = decimals;
            B.setDecimals(decimals + (Math.floor(decimals / 100) || 2));
            const r = new B(naturalExponential(P.toB().n)).toB(P.b);

            B.setDecimals(oldDecimals);
            return r.round(decimals);
        }

        /* cos(0)         = 1
         * cos(-0)        = 1
         * cos(Infinity)  = NaN
         * cos(-Infinity) = NaN
         * cos(NaN)       = NaN
         */
        P.cosine = P.cos = function() {
            if (P.isZero()) return new B("1", P.b);
            if (!P.isFinite()) return new B("NaN", P.b);

            // Fix precision decimals
            const oldDecimals = decimals,
                x = P.toB().n;
            B.setDecimals(decimals + (Math.floor(decimals / 100) || 2));

            // If angle is in degrees transform to radians
            const r = new B(cosine(angles ? arith(arith(arith(x, PI, "m"), "180", "d"), "180", "mod") : arith(x, PI, "mod"))).toB(P.b);

            B.setDecimals(oldDecimals);
            return r.round(decimals);
        }

        /* sin(0)         = 0
         * sin(-0)        = -0
         * sin(Infinity)  = NaN
         * sin(-Infinity) = NaN
         * sin(NaN)       = NaN
         */
        P.sine = P.sin = function() {
            if (P.isZero()) return P.clone();
            if (!P.isFinite()) return new B("NaN", P.b);

            // Fix precision decimals
            const oldDecimals = decimals,
                x = P.toB().n;
            B.setDecimals(decimals + (Math.floor(decimals / 100) || 2));

            // If angle is in degrees transform to radians
            const r = new B(sine(angles ? arith(arith(arith(x, PI, "m"), "180", "d"), "180", "mod") : arith(x, PI, "mod"))).toB(P.b);

            B.setDecimals(oldDecimals);
            return r.round(decimals);
        }

        /* tan(0)         = 0
         * tan(-0)        = -0
         * tan(Infinity)  = NaN
         * tan(-Infinity) = NaN
         * tan(NaN)       = NaN
         * tan(90)        = Infinity
         * tan(-90)       = -Infinity
         */
        P.tangent = P.tan = function() {
            if (P.isZero()) return P.clone();
            if (!P.isFinite()) return new B("NaN", P.b);

            // Fix precision decimals
            const oldDecimals = decimals,
                x = P.toB().n;
            B.setDecimals(decimals + (Math.floor(decimals / 100) || 2));

            // If angle is in degrees transform to radians
            const radians = angles ? arith(arith(arith(x, PI, "m"), "180", "d"), "180", "mod") : arith(x, PI, "mod");

            let _cos = cosine(radians);
            // Check if cosine is '0'
            let [i, d] = _cos.split(".").concat("x");
            d = d.slice(0, oldDecimals);
            // Trail zeros at right
            while (d[d.length - 1] === "0") d = d.slice(0, -1);
            // If Infinity
            if (!d) {
                if (i === "0") return new B("Infinity", P.b);
                else if (i === "-0") return new B("-Infinity", P.b);
            }

            const r = new B(arith(sine(radians), _cos, "d")).toB(P.b);

            B.setDecimals(oldDecimals);
            return r.round(decimals);
        }

        /* acos(0)       = pi/2
         * acos(-0)      = pi/2
         * acos(1)       = 0
         * acos(-1)      = pi
         * acos(1/2)     = pi/3
         * acos(-1/2)    = 2*pi/3
         * acos(|x| > 1) = NaN
         * acos(NaN)     = NaN
         * 
         * acos(x) = pi/2 - asin(x)
         */
        P.inverseCosine = P.acos = function() {
            if (P.isNaN() || P.isZero()) return P.clone();
            if (cmp(P.abs().n, "1") == 1) return new B("NaN", P.b);

            // Fix precision decimals
            const oldDecimals = decimals,
                x = P.toB().n;
            B.setDecimals(decimals + (Math.floor((3 * decimals) / 100) || 2));

            // Get angle in radians
            const radians = arith(arith("0.5", PI, "m"), arith("2", inverseTangent(arith(x, arith("1", arith(arith("1", arith(x, x, "m"), "s"), "2", "root"), "a"), "d")), "m"), "s");

            // Transform angle to degrees if necessary
            const r = new B(angles ? arith(arith("180", radians, "m"), PI, "d") : radians).toB(P.b);

            B.setDecimals(oldDecimals);
            return r.round(decimals);
        }

        /* asin(0)       = 0
         * asin(-0)      = -0
         * asin(1/2)     = pi/6
         * asin(-1/2)    = -pi/6
         * asin(1)       = pi/2
         * asin(-1)      = -pi/2
         * asin(|x| > 1) = NaN
         * asin(NaN)     = NaN
         *              
         * asin(x) = 2*atan(x/(1 + sqrt(1 - x^2)))
         */
        P.inverseSine = P.asin = function() {
            if (P.isNaN() || P.isZero()) return P.clone();
            if (cmp(P.abs().n, "1") == 1) return new B("NaN", P.b);

            // Fix precision decimals
            const oldDecimals = decimals,
                x = P.toB().n;
            B.setDecimals(decimals + (Math.floor((3 * decimals) / 100) || 3));

            // Get angle in radians
            const radians = arith("2", inverseTangent(arith(x, arith("1", arith(arith("1", arith(x, x, "m"), "s"), "2", "root"), "a"), "d")), "m");

            // Transform angle to degrees if necessary
            const r = new B(angles ? arith(arith("180", radians, "m"), PI, "d") : radians).toB(P.b);

            B.setDecimals(oldDecimals);
            return r.round(decimals);
        }

        /* atan(0)         = 0
         * atan(-0)        = -0
         * atan(1)         = pi/4
         * atan(-1)        = -pi/4
         * atan(Infinity)  = pi/2
         * atan(-Infinity) = -pi/2
         * atan(NaN)       = NaN
         */
        P.inverseTangent = P.atan = function() {
            if (P.isNaN() || P.isZero()) return P.clone();
            if (!P.isFinite()) return new B(arith(PI, "2", "d"), P.b);

            // Fix precision decimals
            const
                oldDecimals = decimals,
                x = P.toB().n;

            B.setDecimals(decimals + (Math.floor((3 * decimals) / 100) || 3));

            // Get angle in radians
            const radians = inverseTangent(x);

            // Transform angle to degrees if necessary
            const r = new B(angles ? arith(arith("180", radians, "m"), PI, "d") : radians).toB(P.b);

            B.setDecimals(oldDecimals);
            return r.round(decimals);
        }

        P.toBase = P.toB = function(base = 10) {
            base = parseInt(base);
            if (P.b === base || !P.isFinite()) return P.clone();
            const n = P.abs().n;
            _catch("0", base, "'toBase()'");

            // Fix precision decimals
            const oldDecimals = decimals;
            B.setDecimals(decimals + (Math.floor(decimals / 100) || 2));

            let acc = "1",
                int = P.b === 10 ? n.split(".")[0] : n.split(".")[0].split("").reduceRight((a, d) => {
                    const r = String(BigInt(a) + BigInt(B.getNumber(d)) * BigInt(acc));
                    acc = String(BigInt(acc) * BigInt(P.b));
                    return r;
                }, 0),
                parsedInt = [];

            // While int >= base
            while (cmp(int, String(base)) > -1) {
                const toPush = String(BigInt(int) % BigInt(base));
                parsedInt.unshift(numerals[toPush]);
                int = String(BigInt(int) / BigInt(base));
            }
            parsedInt.unshift(numerals[int]);

            acc = String(P.b);
            let dec = P.f ? (P.b === 10 ? "0." + n.split(".")[1] : n.split(".")[1].split("").reduce((a, d) => {
                const r = arith(a, arith(String(B.getNumber(d)), acc, "d"), "a");
                acc = String(BigInt(acc) * BigInt(P.b));
                return r;
            }, "0")) : "0";
            let timeout = decimals + 1,
                parsedDec = "",
                toPush = "1",
                dot = dec.split(".").concat("")[1].length;
            dec = dec.replace(".", "");
            while (timeout && toPush && dec !== "0") {
                dec = String(BigInt(dec.slice(-dot)) * BigInt(base));
                toPush = dec.slice(0, -dot) || "0"; // "0" cause toPush must be a truely value
                parsedDec += numerals[toPush];
                timeout--;
            }
            const r = new B((P.s ? "-" : "") + parsedInt.join("") + "." + parsedDec, base);
            B.setDecimals(oldDecimals);
            return r.round(decimals);
        }
    }

    // Export.

    // AMD.
    if (typeof define == 'function' && define.amd) {
        define(function() {
            return B;
        });
        // Node and other environments that support module.exports.
    } else if (typeof module != 'undefined' && module.exports) {
        if (typeof Symbol == 'function' && typeof Symbol.iterator == 'symbol') {
            const P = B.prototype;
            P[Symbol['for']('nodejs.util.inspect.custom')] = P.toString;
            P[Symbol.toStringTag] = 'Base';
        }
        module.exports = B;
        // Browser.
    } else {
        if (!globalScope) {
            globalScope = typeof self != 'undefined' && self && self.self == self ? self : window;
        }
        B.noConflict = () => {
            globalScope.Base = oldCtrValue;
            return B;
        }
        globalScope.Base = B;
    }
})(this);
