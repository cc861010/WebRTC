(function() {
    function g(a) {
        throw a;
    }
    var j = void 0, k = !0, l = null, o = !1;
    function aa(a) {
        return function() {
            return this[a]
        }
    }
    function p(a) {
        return function() {
            return a
        }
    }
    var r, ba = this;
    function ca(a, b) {
        var c = a.split("."), d = ba;
        !(c[0] in d) && d.execScript && d.execScript("var " + c[0]);
        for (var e; c.length && (e = c.shift()); )
            !c.length && s(b) ? d[e] = b : d = d[e] ? d[e] : d[e] = {}
    }
    function da() {
    }
    function ea(a) {
        var b = typeof a;
        if ("object" == b)
            if (a) {
                if (a instanceof Array)
                    return "array";
                if (a instanceof Object)
                    return b;
                var c = Object.prototype.toString.call(a);
                if ("[object Window]" == c)
                    return "object";
                if ("[object Array]" == c || "number" == typeof a.length && "undefined" != typeof a.splice && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("splice"))
                    return "array";
                if ("[object Function]" == c || "undefined" != typeof a.call && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("call"))
                    return "function"
            } else
                return "null";
        else if ("function" == b && "undefined" == typeof a.call)
            return "object";
        return b
    }
    function s(a) {
        return a !== j
    }
    function fa(a) {
        var b = ea(a);
        return "array" == b || "object" == b && "number" == typeof a.length
    }
    function t(a) {
        return "string" == typeof a
    }
    function ga(a) {
        return "number" == typeof a
    }
    function ha(a) {
        var b = typeof a;
        return "object" == b && a != l || "function" == b
    }
    Math.floor(2147483648 * Math.random()).toString(36);
    function ia(a, b, c) {
        return a.call.apply(a.bind, arguments)
    }
    function ja(a, b, c) {
        a || g(Error());
        if (2 < arguments.length) {
            var d = Array.prototype.slice.call(arguments, 2);
            return function() {
                var c = Array.prototype.slice.call(arguments);
                Array.prototype.unshift.apply(c, d);
                return a.apply(b, c)
            }
        }
        return function() {
            return a.apply(b, arguments)
        }
    }
    function u(a, b, c) {
        u = Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? ia : ja;
        return u.apply(l, arguments)
    }
    function ka(a, b) {
        function c() {
        }
        c.prototype = b.prototype;
        a.Jd = b.prototype;
        a.prototype = new c
    }
    ;
    function la(a) {
        a = String(a);
        if (/^\s*$/.test(a) ? 0 : /^[\],:{}\s\u2028\u2029]*$/.test(a.replace(/\\["\\\/bfnrtu]/g, "@").replace(/"[^"\\\n\r\u2028\u2029\x00-\x08\x10-\x1f\x80-\x9f]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:[\s\u2028\u2029]*\[)+/g, "")))
            try {
                return eval("(" + a + ")")
            } catch (b) {
            }
        g(Error("Invalid JSON string: " + a))
    }
    function ma() {
        this.Xb = j
    }
    function na(a, b, c) {
        switch (typeof b) {
            case "string":
                oa(b, c);
                break;
            case "number":
                c.push(isFinite(b) && !isNaN(b) ? b : "null");
                break;
            case "boolean":
                c.push(b);
                break;
            case "undefined":
                c.push("null");
                break;
            case "object":
                if (b == l) {
                    c.push("null");
                    break
                }
                if ("array" == ea(b)) {
                    var d = b.length;
                    c.push("[");
                    for (var e = "", f = 0; f < d; f++)
                        c.push(e), e = b[f], na(a, a.Xb ? a.Xb.call(b, String(f), e) : e, c), e = ",";
                    c.push("]");
                    break
                }
                c.push("{");
                d = "";
                for (f in b)
                    Object.prototype.hasOwnProperty.call(b, f) && (e = b[f], "function" != typeof e && (c.push(d),
                        oa(f, c), c.push(":"), na(a, a.Xb ? a.Xb.call(b, f, e) : e, c), d = ","));
                c.push("}");
                break;
            case "function":
                break;
            default:
                g(Error("Unknown type: " + typeof b))
        }
    }
    var pa = {'"': '\\"',"\\": "\\\\","/": "\\/","\b": "\\b","\f": "\\f","\n": "\\n","\r": "\\r","\t": "\\t","\x0B": "\\u000b"}, qa = /\uffff/.test("\uffff") ? /[\\\"\x00-\x1f\x7f-\uffff]/g : /[\\\"\x00-\x1f\x7f-\xff]/g;
    function oa(a, b) {
        b.push('"', a.replace(qa, function(a) {
            if (a in pa)
                return pa[a];
            var b = a.charCodeAt(0), e = "\\u";
            16 > b ? e += "000" : 256 > b ? e += "00" : 4096 > b && (e += "0");
            return pa[a] = e + b.toString(16)
        }), '"')
    }
    ;
    function y(a) {
        if ("undefined" !== typeof JSON && s(JSON.stringify))
            a = JSON.stringify(a);
        else {
            var b = [];
            na(new ma, a, b);
            a = b.join("")
        }
        return a
    }
    ;
    function ra(a) {
        for (var b = [], c = 0, d = 0; d < a.length; d++) {
            var e = a.charCodeAt(d);
            55296 <= e && 56319 >= e && (e -= 55296, d++, z(d < a.length, "Surrogate pair missing trail surrogate."), e = 65536 + (e << 10) + (a.charCodeAt(d) - 56320));
            128 > e ? b[c++] = e : (2048 > e ? b[c++] = e >> 6 | 192 : (65536 > e ? b[c++] = e >> 12 | 224 : (b[c++] = e >> 18 | 240, b[c++] = e >> 12 & 63 | 128), b[c++] = e >> 6 & 63 | 128), b[c++] = e & 63 | 128)
        }
        return b
    }
    ;
    function A(a, b, c, d) {
        var e;
        d < b ? e = "at least " + b : d > c && (e = 0 === c ? "none" : "no more than " + c);
        e && g(Error(a + " failed: Was called with " + d + (1 === d ? " argument." : " arguments.") + " Expects " + e + "."))
    }
    function B(a, b, c) {
        var d = "";
        switch (b) {
            case 1:
                d = c ? "first" : "First";
                break;
            case 2:
                d = c ? "second" : "Second";
                break;
            case 3:
                d = c ? "third" : "Third";
                break;
            case 4:
                d = c ? "fourth" : "Fourth";
                break;
            default:
                sa.assert(o, "errorPrefix_ called with argumentNumber > 4.  Need to update it?")
        }
        return a + " failed: " + (d + " argument ")
    }
    function C(a, b, c, d) {
        (!d || s(c)) && "function" != ea(c) && g(Error(B(a, b, d) + "must be a valid function."))
    }
    function ta(a, b, c) {
        s(c) && (!ha(c) || c === l) && g(Error(B(a, b, k) + "must be a valid context object."))
    }
    ;
    function D(a, b) {
        return Object.prototype.hasOwnProperty.call(a, b)
    }
    function ua(a, b) {
        if (Object.prototype.hasOwnProperty.call(a, b))
            return a[b]
    }
    ;
    var va = {}, sa = {}, wa = /[\[\].#$\/]/, xa = /[\[\].#$]/;
    function ya(a) {
        return t(a) && 0 !== a.length && !wa.test(a)
    }
    function za(a, b, c) {
        (!c || s(b)) && Aa(B(a, 1, c), b)
    }
    function Aa(a, b, c, d) {
        c || (c = 0);
        d || (d = []);
        s(b) || g(Error(a + "contains undefined" + Ba(d)));
        "function" == ea(b) && g(Error(a + "contains a function" + Ba(d)));
        Ca(b) && g(Error(a + "contains " + b.toString() + Ba(d)));
        1E3 < c && g(new TypeError(a + "contains a cyclic object value (" + d.slice(0, 100).join(".") + "...)"));
        t(b) && (b.length > 10485760 / 3 && 10485760 < va.Kd.Id(b).length) && g(Error(a + "contains a string greater than 10485760 utf8 bytes" + Ba(d) + " ('" + b.substring(0, 50) + "...')"));
        if (ha(b))
            for (var e in b)
                D(b, e) && (".priority" !== e && (".value" !==
                    e && !ya(e)) && g(Error(a + "contains an invalid key (" + e + ")" + Ba(d) + '.  Keys must be non-empty strings and can\'t contain ".", "#", "$", "/", "[", or "]"')), d.push(e), Aa(a, b[e], c + 1, d), d.pop())
    }
    function Ba(a) {
        return 0 == a.length ? "" : " in property " + a.join(".")
    }
    function Da(a, b) {
        ha(b) || g(Error(B(a, 1, o) + " must be an object containing the children to replace."));
        za(a, b, o)
    }
    function Ea(a, b, c, d) {
        (!d || s(c)) && (c !== l && !ga(c) && !t(c)) && g(Error(B(a, b, d) + "must be a valid firebase priority (null or a string.)"))
    }
    function Fa(a, b, c) {
        if (!c || s(b))
            switch (b) {
                case "value":
                case "child_added":
                case "child_removed":
                case "child_changed":
                case "child_moved":
                    break;
                default:
                    g(Error(B(a, 1, c) + 'must be a valid event type: "value", "child_added", "child_removed", "child_changed", or "child_moved".'))
            }
    }
    function Ga(a, b) {
        s(b) && !ya(b) && g(Error(B(a, 2, k) + 'must be a valid firebase key (non-empty string, not containing ".", "#", "$", "/", "[", or "]").'))
    }
    function Ha(a, b) {
        (!t(b) || 0 === b.length || xa.test(b)) && g(Error(B(a, 1, o) + 'must be a non-empty string and can\'t contain ".", "#", "$", "[", or "]".'))
    }
    function E(a, b) {
        ".info" === F(b) && g(Error(a + " failed: Can't modify data under /.info/"))
    }
    ;
    function G(a, b, c, d, e, f, h) {
        this.o = a;
        this.path = b;
        this.ta = c;
        this.Z = d;
        this.la = e;
        this.ra = f;
        this.Pa = h;
        s(this.Z) && (s(this.ra) && s(this.ta)) && g("Query: Can't combine startAt(), endAt(), and limit().")
    }
    G.prototype.oc = function(a, b) {
        A("Query.on", 2, 4, arguments.length);
        Fa("Query.on", a, o);
        C("Query.on", 2, b, o);
        var c = Ia("Query.on", arguments[2], arguments[3]);
        this.o.Bb(this, a, b, c.cancel, c.W);
        return b
    };
    G.prototype.on = G.prototype.oc;
    G.prototype.Ib = function(a, b, c) {
        A("Query.off", 0, 3, arguments.length);
        Fa("Query.off", a, k);
        C("Query.off", 2, b, k);
        ta("Query.off", 3, c);
        this.o.Wb(this, a, b, c)
    };
    G.prototype.off = G.prototype.Ib;
    G.prototype.vd = function(a, b) {
        function c(h) {
            f && (f = o, e.Ib(a, c), b.call(d.W, h))
        }
        A("Query.once", 2, 4, arguments.length);
        Fa("Query.once", a, o);
        C("Query.once", 2, b, o);
        var d = Ia("Query.once", arguments[2], arguments[3]), e = this, f = k;
        this.oc(a, c, function() {
            e.Ib(a, c);
            d.cancel && d.cancel.call(d.W)
        })
    };
    G.prototype.once = G.prototype.vd;
    G.prototype.rd = function(a) {
        A("Query.limit", 1, 1, arguments.length);
        (!ga(a) || Math.floor(a) !== a || 0 >= a) && g("Query.limit: First argument must be a positive integer.");
        return new G(this.o, this.path, a, this.Z, this.la, this.ra, this.Pa)
    };
    G.prototype.limit = G.prototype.rd;
    G.prototype.Ed = function(a, b) {
        A("Query.startAt", 0, 2, arguments.length);
        Ea("Query.startAt", 1, a, k);
        Ga("Query.startAt", b);
        s(a) || (b = a = l);
        return new G(this.o, this.path, this.ta, a, b, this.ra, this.Pa)
    };
    G.prototype.startAt = G.prototype.Ed;
    G.prototype.ld = function(a, b) {
        A("Query.endAt", 0, 2, arguments.length);
        Ea("Query.endAt", 1, a, k);
        Ga("Query.endAt", b);
        return new G(this.o, this.path, this.ta, this.Z, this.la, a, b)
    };
    G.prototype.endAt = G.prototype.ld;
    function Ja(a) {
        var b = {};
        s(a.Z) && (b.sp = a.Z);
        s(a.la) && (b.sn = a.la);
        s(a.ra) && (b.ep = a.ra);
        s(a.Pa) && (b.en = a.Pa);
        s(a.ta) && (b.l = a.ta);
        s(a.Z) && (s(a.la) && a.Z === l && a.la === l) && (b.vf = "l");
        return b
    }
    G.prototype.Ia = function() {
        var a = Ka(Ja(this));
        return "{}" === a ? "default" : a
    };
    function Ia(a, b, c) {
        var d = {};
        b && c ? (d.cancel = b, C(a, 3, d.cancel, k), d.W = c, ta(a, 4, d.W)) : b && ("object" === typeof b && b !== l ? d.W = b : "function" === typeof b ? d.cancel = b : g(Error(B(a, 3, k) + "must either be a cancel callback or a context object.")));
        return d
    }
    ;
    function I(a) {
        if (a instanceof I)
            return a;
        if (1 == arguments.length) {
            this.m = a.split("/");
            for (var b = 0, c = 0; c < this.m.length; c++)
                0 < this.m[c].length && (this.m[b] = this.m[c], b++);
            this.m.length = b;
            this.X = 0
        } else
            this.m = arguments[0], this.X = arguments[1]
    }
    function F(a) {
        return a.X >= a.m.length ? l : a.m[a.X]
    }
    function La(a) {
        var b = a.X;
        b < a.m.length && b++;
        return new I(a.m, b)
    }
    function Ma(a) {
        return a.X < a.m.length ? a.m[a.m.length - 1] : l
    }
    r = I.prototype;
    r.toString = function() {
        for (var a = "", b = this.X; b < this.m.length; b++)
            "" !== this.m[b] && (a += "/" + this.m[b]);
        return a || "/"
    };
    r.parent = function() {
        if (this.X >= this.m.length)
            return l;
        for (var a = [], b = this.X; b < this.m.length - 1; b++)
            a.push(this.m[b]);
        return new I(a, 0)
    };
    r.C = function(a) {
        for (var b = [], c = this.X; c < this.m.length; c++)
            b.push(this.m[c]);
        if (a instanceof I)
            for (c = a.X; c < a.m.length; c++)
                b.push(a.m[c]);
        else {
            a = a.split("/");
            for (c = 0; c < a.length; c++)
                0 < a[c].length && b.push(a[c])
        }
        return new I(b, 0)
    };
    r.f = function() {
        return this.X >= this.m.length
    };
    function Na(a, b) {
        var c = F(a);
        if (c === l)
            return b;
        if (c === F(b))
            return Na(La(a), La(b));
        g("INTERNAL ERROR: innerPath (" + b + ") is not within outerPath (" + a + ")")
    }
    r.contains = function(a) {
        var b = 0;
        if (this.m.length > a.m.length)
            return o;
        for (; b < this.m.length; ) {
            if (this.m[b] !== a.m[b])
                return o;
            ++b
        }
        return k
    };
    function Oa() {
        this.children = {};
        this.hc = 0;
        this.value = l
    }
    function Ra(a, b, c) {
        this.ua = a ? a : "";
        this.ob = b ? b : l;
        this.u = c ? c : new Oa
    }
    function J(a, b) {
        for (var c = b instanceof I ? b : new I(b), d = a, e; (e = F(c)) !== l; )
            d = new Ra(e, d, ua(d.u.children, e) || new Oa), c = La(c);
        return d
    }
    r = Ra.prototype;
    r.j = function() {
        return this.u.value
    };
    function M(a, b) {
        z("undefined" !== typeof b);
        a.u.value = b;
        Sa(a)
    }
    r.Eb = function() {
        return 0 < this.u.hc
    };
    r.f = function() {
        return this.j() === l && !this.Eb()
    };
    r.B = function(a) {
        for (var b in this.u.children)
            a(new Ra(b, this, this.u.children[b]))
    };
    function Ta(a, b, c, d) {
        c && !d && b(a);
        a.B(function(a) {
            Ta(a, b, k, d)
        });
        c && d && b(a)
    }
    function Ua(a, b, c) {
        for (a = c ? a : a.parent(); a !== l; ) {
            if (b(a))
                return k;
            a = a.parent()
        }
        return o
    }
    r.path = function() {
        return new I(this.ob === l ? this.ua : this.ob.path() + "/" + this.ua)
    };
    r.name = aa("ua");
    r.parent = aa("ob");
    function Sa(a) {
        if (a.ob !== l) {
            var b = a.ob, c = a.ua, d = a.f(), e = D(b.u.children, c);
            d && e ? (delete b.u.children[c], b.u.hc--, Sa(b)) : !d && !e && (b.u.children[c] = a.u, b.u.hc++, Sa(b))
        }
    }
    ;
    function Va(a, b) {
        this.Ma = a ? a : Wa;
        this.Y = b ? b : Xa
    }
    function Wa(a, b) {
        return a < b ? -1 : a > b ? 1 : 0
    }
    r = Va.prototype;
    r.ia = function(a, b) {
        return new Va(this.Ma, this.Y.ia(a, b, this.Ma).copy(l, l, o, l, l))
    };
    r.remove = function(a) {
        return new Va(this.Ma, this.Y.remove(a, this.Ma).copy(l, l, o, l, l))
    };
    r.get = function(a) {
        for (var b, c = this.Y; !c.f(); ) {
            b = this.Ma(a, c.key);
            if (0 === b)
                return c.value;
            0 > b ? c = c.left : 0 < b && (c = c.right)
        }
        return l
    };
    function Ya(a, b) {
        for (var c, d = a.Y, e = l; !d.f(); ) {
            c = a.Ma(b, d.key);
            if (0 === c) {
                if (d.left.f())
                    return e ? e.key : l;
                for (d = d.left; !d.right.f(); )
                    d = d.right;
                return d.key
            }
            0 > c ? d = d.left : 0 < c && (e = d, d = d.right)
        }
        g(Error("Attempted to find predecessor key for a nonexistent key.  What gives?"))
    }
    r.f = function() {
        return this.Y.f()
    };
    r.count = function() {
        return this.Y.count()
    };
    r.ib = function() {
        return this.Y.ib()
    };
    r.Sa = function() {
        return this.Y.Sa()
    };
    r.sa = function(a) {
        return this.Y.sa(a)
    };
    r.Ja = function(a) {
        return this.Y.Ja(a)
    };
    r.Qa = function(a) {
        return new Za(this.Y, a)
    };
    function Za(a, b) {
        this.Wc = b;
        for (this.Gb = []; !a.f(); )
            this.Gb.push(a), a = a.left
    }
    function $a(a) {
        if (0 === a.Gb.length)
            return l;
        var b = a.Gb.pop(), c;
        c = a.Wc ? a.Wc(b.key, b.value) : {key: b.key,value: b.value};
        for (b = b.right; !b.f(); )
            a.Gb.push(b), b = b.left;
        return c
    }
    function ab(a, b, c, d, e) {
        this.key = a;
        this.value = b;
        this.color = c != l ? c : k;
        this.left = d != l ? d : Xa;
        this.right = e != l ? e : Xa
    }
    r = ab.prototype;
    r.copy = function(a, b, c, d, e) {
        return new ab(a != l ? a : this.key, b != l ? b : this.value, c != l ? c : this.color, d != l ? d : this.left, e != l ? e : this.right)
    };
    r.count = function() {
        return this.left.count() + 1 + this.right.count()
    };
    r.f = p(o);
    r.sa = function(a) {
        return this.left.sa(a) || a(this.key, this.value) || this.right.sa(a)
    };
    r.Ja = function(a) {
        return this.right.Ja(a) || a(this.key, this.value) || this.left.Ja(a)
    };
    function bb(a) {
        return a.left.f() ? a : bb(a.left)
    }
    r.ib = function() {
        return bb(this).key
    };
    r.Sa = function() {
        return this.right.f() ? this.key : this.right.Sa()
    };
    r.ia = function(a, b, c) {
        var d, e;
        e = this;
        d = c(a, e.key);
        e = 0 > d ? e.copy(l, l, l, e.left.ia(a, b, c), l) : 0 === d ? e.copy(l, b, l, l, l) : e.copy(l, l, l, l, e.right.ia(a, b, c));
        return cb(e)
    };
    function db(a) {
        if (a.left.f())
            return Xa;
        !a.left.H() && !a.left.left.H() && (a = eb(a));
        a = a.copy(l, l, l, db(a.left), l);
        return cb(a)
    }
    r.remove = function(a, b) {
        var c, d;
        c = this;
        if (0 > b(a, c.key))
            !c.left.f() && (!c.left.H() && !c.left.left.H()) && (c = eb(c)), c = c.copy(l, l, l, c.left.remove(a, b), l);
        else {
            c.left.H() && (c = gb(c));
            !c.right.f() && (!c.right.H() && !c.right.left.H()) && (c = hb(c), c.left.left.H() && (c = gb(c), c = hb(c)));
            if (0 === b(a, c.key)) {
                if (c.right.f())
                    return Xa;
                d = bb(c.right);
                c = c.copy(d.key, d.value, l, l, db(c.right))
            }
            c = c.copy(l, l, l, l, c.right.remove(a, b))
        }
        return cb(c)
    };
    r.H = aa("color");
    function cb(a) {
        a.right.H() && !a.left.H() && (a = ib(a));
        a.left.H() && a.left.left.H() && (a = gb(a));
        a.left.H() && a.right.H() && (a = hb(a));
        return a
    }
    function eb(a) {
        a = hb(a);
        a.right.left.H() && (a = a.copy(l, l, l, l, gb(a.right)), a = ib(a), a = hb(a));
        return a
    }
    function ib(a) {
        var b;
        b = a.copy(l, l, k, l, a.right.left);
        return a.right.copy(l, l, a.color, b, l)
    }
    function gb(a) {
        var b;
        b = a.copy(l, l, k, a.left.right, l);
        return a.left.copy(l, l, a.color, l, b)
    }
    function hb(a) {
        var b, c;
        b = a.left.copy(l, l, !a.left.color, l, l);
        c = a.right.copy(l, l, !a.right.color, l, l);
        return a.copy(l, l, !a.color, b, c)
    }
    function jb() {
    }
    r = jb.prototype;
    r.copy = function() {
        return this
    };
    r.ia = function(a, b) {
        return new ab(a, b, j, j, j)
    };
    r.remove = function() {
        return this
    };
    r.get = p(l);
    r.count = p(0);
    r.f = p(k);
    r.sa = p(o);
    r.Ja = p(o);
    r.ib = p(l);
    r.Sa = p(l);
    r.H = p(o);
    var Xa = new jb;
    var kb = Array.prototype, lb = kb.forEach ? function(a, b, c) {
        kb.forEach.call(a, b, c)
    } : function(a, b, c) {
        for (var d = a.length, e = t(a) ? a.split("") : a, f = 0; f < d; f++)
            f in e && b.call(c, e[f], f, a)
    }, mb = kb.map ? function(a, b, c) {
        return kb.map.call(a, b, c)
    } : function(a, b, c) {
        for (var d = a.length, e = Array(d), f = t(a) ? a.split("") : a, h = 0; h < d; h++)
            h in f && (e[h] = b.call(c, f[h], h, a));
        return e
    };
    function nb() {
    }
    ;
    function ob() {
        this.z = [];
        this.gc = [];
        this.hd = [];
        this.Ob = [];
        this.Ob[0] = 128;
        for (var a = 1; 64 > a; ++a)
            this.Ob[a] = 0;
        this.reset()
    }
    ka(ob, nb);
    ob.prototype.reset = function() {
        this.z[0] = 1732584193;
        this.z[1] = 4023233417;
        this.z[2] = 2562383102;
        this.z[3] = 271733878;
        this.z[4] = 3285377520;
        this.Ac = this.eb = 0
    };
    function pb(a, b) {
        var c;
        c || (c = 0);
        for (var d = a.hd, e = c; e < c + 64; e += 4)
            d[e / 4] = b[e] << 24 | b[e + 1] << 16 | b[e + 2] << 8 | b[e + 3];
        for (e = 16; 80 > e; e++) {
            var f = d[e - 3] ^ d[e - 8] ^ d[e - 14] ^ d[e - 16];
            d[e] = (f << 1 | f >>> 31) & 4294967295
        }
        c = a.z[0];
        for (var h = a.z[1], i = a.z[2], m = a.z[3], n = a.z[4], q, e = 0; 80 > e; e++)
            40 > e ? 20 > e ? (f = m ^ h & (i ^ m), q = 1518500249) : (f = h ^ i ^ m, q = 1859775393) : 60 > e ? (f = h & i | m & (h | i), q = 2400959708) : (f = h ^ i ^ m, q = 3395469782), f = (c << 5 | c >>> 27) + f + n + q + d[e] & 4294967295, n = m, m = i, i = (h << 30 | h >>> 2) & 4294967295, h = c, c = f;
        a.z[0] = a.z[0] + c & 4294967295;
        a.z[1] = a.z[1] + h &
            4294967295;
        a.z[2] = a.z[2] + i & 4294967295;
        a.z[3] = a.z[3] + m & 4294967295;
        a.z[4] = a.z[4] + n & 4294967295
    }
    ob.prototype.update = function(a, b) {
        s(b) || (b = a.length);
        var c = this.gc, d = this.eb, e = 0;
        if (t(a))
            for (; e < b; )
                c[d++] = a.charCodeAt(e++), 64 == d && (pb(this, c), d = 0);
        else
            for (; e < b; )
                c[d++] = a[e++], 64 == d && (pb(this, c), d = 0);
        this.eb = d;
        this.Ac += b
    };
    function qb() {
        this.La = {};
        this.length = 0
    }
    qb.prototype.setItem = function(a, b) {
        D(this.La, a) || (this.length += 1);
        this.La[a] = b
    };
    qb.prototype.getItem = function(a) {
        return D(this.La, a) ? this.La[a] : l
    };
    qb.prototype.removeItem = function(a) {
        D(this.La, a) && (this.length -= 1, delete this.La[a])
    };
    var N = l;
    if ("undefined" !== typeof sessionStorage)
        try {
            sessionStorage.setItem("firebase-sentinel", "cache"), sessionStorage.removeItem("firebase-sentinel"), N = sessionStorage
        } catch (rb) {
            N = new qb
        }
    else
        N = new qb;
    function sb(a, b, c, d) {
        this.host = a;
        this.Yb = b;
        this.jb = c;
        this.aa = d || N.getItem(a) || this.host
    }
    function tb(a, b) {
        b !== a.aa && (a.aa = b, "s-" === a.aa.substr(0, 2) && N.setItem(a.host, a.aa))
    }
    sb.prototype.toString = function() {
        return (this.Yb ? "https://" : "http://") + this.host
    };
    var ub, vb, wb, xb;
    function yb() {
        return ba.navigator ? ba.navigator.userAgent : l
    }
    xb = wb = vb = ub = o;
    var zb;
    if (zb = yb()) {
        var Ab = ba.navigator;
        ub = 0 == zb.indexOf("Opera");
        vb = !ub && -1 != zb.indexOf("MSIE");
        wb = !ub && -1 != zb.indexOf("WebKit");
        xb = !ub && !wb && "Gecko" == Ab.product
    }
    var Bb = vb, Cb = xb, Db = wb;
    var Eb;
    if (ub && ba.opera) {
        var Fb = ba.opera.version;
        "function" == typeof Fb && Fb()
    } else
        Cb ? Eb = /rv\:([^\);]+)(\)|;)/ : Bb ? Eb = /MSIE\s+([^\);]+)(\)|;)/ : Db && (Eb = /WebKit\/(\S+)/), Eb && Eb.exec(yb());
    var Gb = l, Hb = l;
    function Ib(a, b) {
        fa(a) || g(Error("encodeByteArray takes an array as a parameter"));
        if (!Gb) {
            Gb = {};
            Hb = {};
            for (var c = 0; 65 > c; c++)
                Gb[c] = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(c), Hb[c] = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_.".charAt(c)
        }
        for (var c = b ? Hb : Gb, d = [], e = 0; e < a.length; e += 3) {
            var f = a[e], h = e + 1 < a.length, i = h ? a[e + 1] : 0, m = e + 2 < a.length, n = m ? a[e + 2] : 0, q = f >> 2, f = (f & 3) << 4 | i >> 4, i = (i & 15) << 2 | n >> 6, n = n & 63;
            m || (n = 64, h || (i = 64));
            d.push(c[q], c[f], c[i], c[n])
        }
        return d.join("")
    }
    ;
    var Jb, Kb = 1;
    Jb = function() {
        return Kb++
    };
    function z(a, b) {
        a || g(Error("Firebase INTERNAL ASSERT FAILED:" + b))
    }
    function Lb(a) {
        var b = ra(a), a = new ob;
        a.update(b);
        var b = [], c = 8 * a.Ac;
        56 > a.eb ? a.update(a.Ob, 56 - a.eb) : a.update(a.Ob, 64 - (a.eb - 56));
        for (var d = 63; 56 <= d; d--)
            a.gc[d] = c & 255, c /= 256;
        pb(a, a.gc);
        for (d = c = 0; 5 > d; d++)
            for (var e = 24; 0 <= e; e -= 8)
                b[c++] = a.z[d] >> e & 255;
        return Ib(b)
    }
    function Mb() {
        for (var a = "", b = 0; b < arguments.length; b++)
            a = fa(arguments[b]) ? a + Mb.apply(l, arguments[b]) : "object" === typeof arguments[b] ? a + y(arguments[b]) : a + arguments[b], a += " ";
        return a
    }
    var Nb = l, Ob = k;
    function Pb() {
        Ob === k && (Ob = o, Nb === l && "true" === N.getItem("logging_enabled") && Qb(k));
        if (Nb) {
            var a = Mb.apply(l, arguments);
            Nb(a)
        }
    }
    function Sb(a) {
        return function() {
            Pb(a, arguments)
        }
    }
    function Tb() {
        if ("undefined" !== typeof console) {
            var a = "FIREBASE INTERNAL ERROR: " + Mb.apply(l, arguments);
            "undefined" !== typeof console.error ? console.error(a) : console.log(a)
        }
    }
    function Ub() {
        var a = Mb.apply(l, arguments);
        g(Error("FIREBASE FATAL ERROR: " + a))
    }
    function Vb() {
        if ("undefined" !== typeof console) {
            var a = "FIREBASE WARNING: " + Mb.apply(l, arguments);
            "undefined" !== typeof console.warn ? console.warn(a) : console.log(a)
        }
    }
    function Ca(a) {
        return ga(a) && (a != a || a == Number.POSITIVE_INFINITY || a == Number.NEGATIVE_INFINITY)
    }
    function Wb(a, b) {
        return a !== b ? a === l ? -1 : b === l ? 1 : typeof a !== typeof b ? "number" === typeof a ? -1 : 1 : a > b ? 1 : -1 : 0
    }
    function Xb(a, b) {
        if (b && a in b)
            return b[a];
        g(Error("Missing required key (" + a + ") in object: " + y(b)))
    }
    var Yb = 0;
    function Ka(a) {
        if ("object" !== typeof a || a === l)
            return y(a);
        var b = [], c;
        for (c in a)
            b.push(c);
        b.sort();
        c = "{";
        for (var d = 0; d < b.length; d++)
            0 !== d && (c += ","), c += y(b[d]), c += ":", c += Ka(a[b[d]]);
        return c + "}"
    }
    function Zb(a, b) {
        if (a.length <= b)
            return [a];
        for (var c = [], d = 0; d < a.length; d += b)
            d + b > a ? c.push(a.substring(d, a.length)) : c.push(a.substring(d, d + b));
        return c
    }
    function $b(a) {
        z(!Ca(a));
        var b, c, d, e;
        0 === a ? (d = c = 0, b = -Infinity === 1 / a ? 1 : 0) : (b = 0 > a, a = Math.abs(a), a >= Math.pow(2, -1022) ? (d = Math.min(Math.floor(Math.log(a) / Math.LN2), 1023), c = d + 1023, d = Math.round(a * Math.pow(2, 52 - d) - Math.pow(2, 52))) : (c = 0, d = Math.round(a / Math.pow(2, -1074))));
        e = [];
        for (a = 52; a; a -= 1)
            e.push(d % 2 ? 1 : 0), d = Math.floor(d / 2);
        for (a = 11; a; a -= 1)
            e.push(c % 2 ? 1 : 0), c = Math.floor(c / 2);
        e.push(b ? 1 : 0);
        e.reverse();
        b = e.join("");
        c = "";
        for (a = 0; 64 > a; a += 8)
            d = parseInt(b.substr(a, 8), 2).toString(16), 1 === d.length && (d = "0" + d), c += d;
        return c.toLowerCase()
    }
    ;
    function ac(a, b) {
        this.oa = a;
        z(this.oa !== l, "LeafNode shouldn't be created with null value.");
        this.Ua = "undefined" !== typeof b ? b : l
    }
    r = ac.prototype;
    r.J = p(k);
    r.k = aa("Ua");
    r.ec = function(a) {
        return new ac(this.oa, a)
    };
    r.N = function() {
        return O
    };
    r.F = function(a) {
        return F(a) === l ? this : O
    };
    r.T = p(l);
    r.D = function(a, b) {
        return (new P(new Va, this.Ua)).D(a, b)
    };
    r.Ya = function(a, b) {
        var c = F(a);
        return c === l ? b : this.D(c, O.Ya(La(a), b))
    };
    r.f = p(o);
    r.Hb = p(0);
    r.P = function(a) {
        return a && this.k() !== l ? {".value": this.j(),".priority": this.k()} : this.j()
    };
    r.hash = function() {
        var a = "";
        this.k() !== l && (a += "priority:" + bc(this.k()) + ":");
        var b = typeof this.oa, a = a + (b + ":"), a = "number" === b ? a + $b(this.oa) : a + this.oa;
        return Lb(a)
    };
    r.j = aa("oa");
    r.toString = function() {
        return "string" === typeof this.oa ? '"' + this.oa + '"' : this.oa
    };
    function P(a, b) {
        this.R = a || new Va;
        this.Ua = "undefined" !== typeof b ? b : l
    }
    r = P.prototype;
    r.J = p(o);
    r.k = aa("Ua");
    r.ec = function(a) {
        return new P(this.R, a)
    };
    r.D = function(a, b) {
        var c = this.R.remove(a);
        b && b.f() && (b = l);
        b !== l && (c = c.ia(a, b));
        return b && b.k() !== l ? new cc(c, l, this.Ua) : new P(c, this.Ua)
    };
    r.Ya = function(a, b) {
        var c = F(a);
        if (c === l)
            return b;
        var d = this.N(c).Ya(La(a), b);
        return this.D(c, d)
    };
    r.f = function() {
        return this.R.f()
    };
    r.Hb = function() {
        return this.R.count()
    };
    var dc = /^\d+$/;
    r = P.prototype;
    r.P = function(a) {
        if (this.f())
            return l;
        var b = {}, c = 0, d = 0, e = k;
        this.B(function(f, h) {
            b[f] = h.P(a);
            c++;
            e && dc.test(f) ? d = Math.max(d, Number(f)) : e = o
        });
        if (!a && e && d < 2 * c) {
            var f = [], h;
            for (h in b)
                f[h] = b[h];
            return f
        }
        a && this.k() !== l && (b[".priority"] = this.k());
        return b
    };
    r.hash = function() {
        var a = "";
        this.k() !== l && (a += "priority:" + bc(this.k()) + ":");
        this.B(function(b, c) {
            var d = c.hash();
            "" !== d && (a += ":" + b + ":" + d)
        });
        return "" === a ? "" : Lb(a)
    };
    r.N = function(a) {
        a = this.R.get(a);
        return a === l ? O : a
    };
    r.F = function(a) {
        var b = F(a);
        return b === l ? this : this.N(b).F(La(a))
    };
    r.T = function(a) {
        return Ya(this.R, a)
    };
    r.Kc = function() {
        return this.R.ib()
    };
    r.Lc = function() {
        return this.R.Sa()
    };
    r.B = function(a) {
        return this.R.sa(a)
    };
    r.lc = function(a) {
        return this.R.Ja(a)
    };
    r.Qa = function() {
        return this.R.Qa()
    };
    r.toString = function() {
        var a = "{", b = k;
        this.B(function(c, d) {
            b ? b = o : a += ", ";
            a += '"' + c + '" : ' + d.toString()
        });
        return a += "}"
    };
    var O = new P(new Va);
    function cc(a, b, c) {
        P.call(this, a, c);
        b === l && (b = new Va(ec), a.sa(function(a, c) {
            b = b.ia({name: a,wa: c.k()}, c)
        }));
        this.ka = b
    }
    ka(cc, P);
    r = cc.prototype;
    r.D = function(a, b) {
        var c = this.N(a), d = this.R, e = this.ka;
        c !== l && (d = d.remove(a), e = e.remove({name: a,wa: c.k()}));
        b && b.f() && (b = l);
        b !== l && (d = d.ia(a, b), e = e.ia({name: a,wa: b.k()}, b));
        return new cc(d, e, this.k())
    };
    r.T = function(a, b) {
        var c = Ya(this.ka, {name: a,wa: b.k()});
        return c ? c.name : l
    };
    r.B = function(a) {
        return this.ka.sa(function(b, c) {
            return a(b.name, c)
        })
    };
    r.lc = function(a) {
        return this.ka.Ja(function(b, c) {
            return a(b.name, c)
        })
    };
    r.Qa = function() {
        return this.ka.Qa(function(a, b) {
            return {key: a.name,value: b}
        })
    };
    r.Kc = function() {
        return this.ka.f() ? l : this.ka.ib().name
    };
    r.Lc = function() {
        return this.ka.f() ? l : this.ka.Sa().name
    };
    function Q(a, b) {
        if ("object" !== typeof a)
            return new ac(a, b);
        if (a === l)
            return O;
        var c = l;
        ".priority" in a ? c = a[".priority"] : "undefined" !== typeof b && (c = b);
        z(c === l || "string" === typeof c || "number" === typeof c);
        if (".value" in a && a[".value"] !== l)
            return new ac(a[".value"], c);
        var c = new P(new Va, c), d;
        for (d in a)
            if (D(a, d) && "." !== d.substring(0, 1)) {
                var e = Q(a[d]);
                if (e.J() || !e.f())
                    c = c.D(d, e)
            }
        return c
    }
    function ec(a, b) {
        return Wb(a.wa, b.wa) || (a.name !== b.name ? a.name < b.name ? -1 : 1 : 0)
    }
    function bc(a) {
        return "number" === typeof a ? "number:" + $b(a) : "string:" + a
    }
    ;
    function R(a, b) {
        this.u = a;
        this.Vb = b
    }
    R.prototype.P = function() {
        A("Firebase.DataSnapshot.val", 0, 0, arguments.length);
        return this.u.P()
    };
    R.prototype.val = R.prototype.P;
    R.prototype.md = function() {
        A("Firebase.DataSnapshot.exportVal", 0, 0, arguments.length);
        return this.u.P(k)
    };
    R.prototype.exportVal = R.prototype.md;
    R.prototype.C = function(a) {
        A("Firebase.DataSnapshot.child", 0, 1, arguments.length);
        ga(a) && (a = String(a));
        Ha("Firebase.DataSnapshot.child", a);
        var b = new I(a), c = this.Vb.C(b);
        return new R(this.u.F(b), c)
    };
    R.prototype.child = R.prototype.C;
    R.prototype.mc = function(a) {
        A("Firebase.DataSnapshot.hasChild", 1, 1, arguments.length);
        Ha("Firebase.DataSnapshot.hasChild", a);
        var b = new I(a);
        return !this.u.F(b).f()
    };
    R.prototype.hasChild = R.prototype.mc;
    R.prototype.k = function() {
        A("Firebase.DataSnapshot.getPriority", 0, 0, arguments.length);
        return this.u.k()
    };
    R.prototype.getPriority = R.prototype.k;
    R.prototype.forEach = function(a) {
        A("Firebase.DataSnapshot.forEach", 1, 1, arguments.length);
        C("Firebase.DataSnapshot.forEach", 1, a, o);
        if (this.u.J())
            return o;
        var b = this;
        return this.u.B(function(c, d) {
            return a(new R(d, b.Vb.C(c)))
        })
    };
    R.prototype.forEach = R.prototype.forEach;
    R.prototype.Eb = function() {
        A("Firebase.DataSnapshot.hasChildren", 0, 0, arguments.length);
        return this.u.J() ? o : !this.u.f()
    };
    R.prototype.hasChildren = R.prototype.Eb;
    R.prototype.name = function() {
        A("Firebase.DataSnapshot.name", 0, 0, arguments.length);
        return this.Vb.name()
    };
    R.prototype.name = R.prototype.name;
    R.prototype.Hb = function() {
        A("Firebase.DataSnapshot.numChildren", 0, 0, arguments.length);
        return this.u.Hb()
    };
    R.prototype.numChildren = R.prototype.Hb;
    R.prototype.wd = function() {
        A("Firebase.DataSnapshot.ref", 0, 0, arguments.length);
        return this.Vb
    };
    R.prototype.ref = R.prototype.wd;
    function fc(a) {
        this.sc = a;
        this.Qb = [];
        this.Oa = 0;
        this.ic = -1;
        this.Ga = l
    }
    ;
    function S(a, b) {
        for (var c in a)
            b.call(j, a[c], c, a)
    }
    function gc(a) {
        var b = {}, c;
        for (c in a)
            b[c] = a[c];
        return b
    }
    ;
    function hc() {
        this.$a = {}
    }
    function ic(a, b, c) {
        s(c) || (c = 1);
        D(a.$a, b) || (a.$a[b] = 0);
        a.$a[b] += c
    }
    hc.prototype.get = function() {
        return gc(this.$a)
    };
    function jc(a) {
        this.jd = a;
        this.Fb = l
    }
    jc.prototype.get = function() {
        var a = this.jd.get(), b = gc(a);
        if (this.Fb)
            for (var c in this.Fb)
                b[c] -= this.Fb[c];
        this.Fb = a;
        return b
    };
    function kc(a, b) {
        this.ad = {};
        this.$b = new jc(a);
        this.n = b;
        setTimeout(u(this.Uc, this), 10 + 6E4 * Math.random())
    }
    kc.prototype.Uc = function() {
        var a = this.$b.get(), b = {}, c = o, d;
        for (d in a)
            0 < a[d] && D(this.ad, d) && (b[d] = a[d], c = k);
        c && (a = this.n, a.S && (b = {c: b}, a.e("reportStats", b), a.ya("s", b)));
        setTimeout(u(this.Uc, this), 6E5 * Math.random())
    };
    var lc = {}, mc = {};
    function nc(a) {
        a = a.toString();
        lc[a] || (lc[a] = new hc);
        return lc[a]
    }
    ;
    var oc = l;
    "undefined" !== typeof MozWebSocket ? oc = MozWebSocket : "undefined" !== typeof WebSocket && (oc = WebSocket);
    function pc(a, b, c) {
        this.jc = a;
        this.e = Sb(this.jc);
        this.frames = this.gb = l;
        this.zc = 0;
        this.$ = nc(b);
        this.Na = (b.Yb ? "wss://" : "ws://") + b.aa + "/.ws?v=5";
        b.host !== b.aa && (this.Na = this.Na + "&ns=" + b.jb);
        c && (this.Na = this.Na + "&s=" + c)
    }
    var qc;
    pc.prototype.open = function(a, b) {
        this.da = b;
        this.Mb = a;
        this.e("websocket connecting to " + this.Na);
        this.U = new oc(this.Na);
        this.ab = o;
        var c = this;
        this.U.onopen = function() {
            c.e("Websocket connected.");
            c.ab = k
        };
        this.U.onclose = function() {
            c.e("Websocket connection was disconnected.");
            c.U = l;
            c.Ha()
        };
        this.U.onmessage = function(a) {
            if (c.U !== l)
                if (a = a.data, ic(c.$, "bytes_received", a.length), rc(c), c.frames !== l)
                    sc(c, a);
                else {
                    a: {
                        z(c.frames === l, "We already have a frame buffer");
                        if (4 >= a.length) {
                            var b = Number(a);
                            if (!isNaN(b)) {
                                c.zc =
                                    b;
                                c.frames = [];
                                a = l;
                                break a
                            }
                        }
                        c.zc = 1;
                        c.frames = []
                    }
                    a !== l && sc(c, a)
                }
        };
        this.U.onerror = function() {
            c.e("WebSocket error.  Closing connection.");
            c.Ha()
        }
    };
    pc.prototype.start = function() {
    };
    pc.isAvailable = function() {
        return !("undefined" !== typeof navigator && "Opera" === navigator.appName) && oc !== l && !qc
    };
    function sc(a, b) {
        a.frames.push(b);
        if (a.frames.length == a.zc) {
            var c = a.frames.join("");
            a.frames = l;
            c = "undefined" !== typeof JSON && s(JSON.parse) ? JSON.parse(c) : la(c);
            a.Mb(c)
        }
    }
    pc.prototype.send = function(a) {
        rc(this);
        a = y(a);
        ic(this.$, "bytes_sent", a.length);
        a = Zb(a, 16384);
        1 < a.length && this.U.send(String(a.length));
        for (var b = 0; b < a.length; b++)
            this.U.send(a[b])
    };
    pc.prototype.xb = function() {
        this.Ea = k;
        this.gb && (clearTimeout(this.gb), this.gb = l);
        this.U && (this.U.close(), this.U = l)
    };
    pc.prototype.Ha = function() {
        this.Ea || (this.e("WebSocket is closing itself"), this.xb(), this.da && (this.da(this.ab), this.da = l))
    };
    pc.prototype.close = function() {
        this.Ea || (this.e("WebSocket is being closed"), this.xb())
    };
    function rc(a) {
        clearTimeout(a.gb);
        a.gb = setInterval(function() {
            a.U.send("0");
            rc(a)
        }, 45E3)
    }
    ;
    function tc() {
        this.set = {}
    }
    r = tc.prototype;
    r.add = function(a, b) {
        this.set[a] = b !== l ? b : k
    };
    r.contains = function(a) {
        return D(this.set, a)
    };
    r.get = function(a) {
        return this.set[a]
    };
    r.remove = function(a) {
        delete this.set[a]
    };
    r.f = function() {
        var a;
        a: {
            for (a in this.set) {
                a = o;
                break a
            }
            a = k
        }
        return a
    };
    r.count = function() {
        var a = 0, b;
        for (b in this.set)
            a++;
        return a
    };
    r.keys = function() {
        var a = [], b;
        for (b in this.set)
            D(this.set, b) && a.push(b);
        return a
    };
    var uc = "pLPCommand", vc = "pRTLPCB";
    function wc(a, b, c) {
        this.jc = a;
        this.e = Sb(a);
        this.Hd = b;
        this.$ = nc(b);
        this.Zb = c;
        this.ab = o;
        this.Ab = function(a) {
            b.host !== b.aa && (a.ns = b.jb);
            var c = [], f;
            for (f in a)
                a.hasOwnProperty(f) && c.push(f + "=" + a[f]);
            return (b.Yb ? "https://" : "http://") + b.aa + "/.lp?" + c.join("&")
        }
    }
    var xc, yc;
    wc.prototype.open = function(a, b) {
        function c() {
            if (!d.Ea) {
                d.ea = new zc(function(a, b, c, e, f) {
                    ic(d.$, "bytes_received", y(arguments).length);
                    if (d.ea)
                        if (d.Ba && (clearTimeout(d.Ba), d.Ba = l), d.ab = k, "start" == a)
                            d.id = b, d.Tc = c;
                        else if ("close" === a)
                            if (b) {
                                d.ea.Zc = o;
                                var h = d.Pc;
                                h.ic = b;
                                h.Ga = function() {
                                    d.Ha()
                                };
                                h.ic < h.Oa && (h.Ga(), h.Ga = l)
                            } else
                                d.Ha();
                        else
                            g(Error("Unrecognized command received: " + a))
                }, function(a, b) {
                    ic(d.$, "bytes_received", y(arguments).length);
                    var c = d.Pc;
                    for (c.Qb[a] = b; c.Qb[c.Oa]; ) {
                        var e = c.Qb[c.Oa];
                        delete c.Qb[c.Oa];
                        for (var f = 0; f < e.length; ++f)
                            e[f] && c.sc(e[f]);
                        if (c.Oa === c.ic) {
                            c.Ga && (clearTimeout(c.Ga), c.Ga(), c.Ga = l);
                            break
                        }
                        c.Oa++
                    }
                }, function() {
                    d.Ha()
                }, d.Ab);
                var a = {start: "t"};
                a.ser = Math.floor(1E8 * Math.random());
                d.ea.cc && (a.cb = d.ea.cc);
                a.v = "5";
                d.Zb && (a.s = d.Zb);
                a = d.Ab(a);
                d.e("Connecting via long-poll to " + a);
                Ac(d.ea, a, function() {
                })
            }
        }
        this.Ec = 0;
        this.va = b;
        this.Pc = new fc(a);
        this.Ea = o;
        var d = this;
        this.Ba = setTimeout(function() {
            d.e("Timed out trying to connect.");
            d.Ha();
            d.Ba = l
        }, 3E4);
        if ("complete" === document.readyState)
            c();
        else {
            var e = o, f = function() {
                document.body ? e || (e = k, c()) : setTimeout(f, 10)
            };
            document.addEventListener ? (document.addEventListener("DOMContentLoaded", f, o), window.addEventListener("load", f, o)) : document.attachEvent && (document.attachEvent("onreadystatechange", function() {
                "complete" === document.readyState && f()
            }, o), window.attachEvent("onload", f, o))
        }
    };
    wc.prototype.start = function() {
        var a = this.ea, b = this.Tc;
        a.td = this.id;
        a.ud = b;
        for (a.fc = k; Bc(a); )
            ;
        a = this.id;
        b = this.Tc;
        this.Ta = document.createElement("iframe");
        var c = {dframe: "t"};
        c.id = a;
        c.pw = b;
        a = this.Ab(c);
        this.Ta.src = a;
        this.Ta.style.display = "none";
        document.body.appendChild(this.Ta)
    };
    wc.isAvailable = function() {
        return !yc && (xc || k)
    };
    wc.prototype.xb = function() {
        this.Ea = k;
        this.ea && (this.ea.close(), this.ea = l);
        this.Ta && (document.body.removeChild(this.Ta), this.Ta = l);
        this.Ba && (clearTimeout(this.Ba), this.Ba = l)
    };
    wc.prototype.Ha = function() {
        this.Ea || (this.e("Longpoll is closing itself"), this.xb(), this.va && (this.va(this.ab), this.va = l))
    };
    wc.prototype.close = function() {
        this.Ea || (this.e("Longpoll is being closed."), this.xb())
    };
    wc.prototype.send = function(a) {
        a = y(a);
        ic(this.$, "bytes_sent", a.length);
        for (var a = ra(a), a = Ib(a, k), a = Zb(a, 1840), b = 0; b < a.length; b++) {
            var c = this.ea;
            c.qb.push({Ad: this.Ec,Gd: a.length,Fc: a[b]});
            c.fc && Bc(c);
            this.Ec++
        }
    };
    function zc(a, b, c, d) {
        this.Ab = d;
        this.da = c;
        this.tc = new tc;
        this.qb = [];
        this.kc = Math.floor(1E8 * Math.random());
        this.Zc = k;
        this.cc = Jb();
        window[uc + this.cc] = a;
        window[vc + this.cc] = b;
        a = document.createElement("iframe");
        a.style.display = "none";
        document.body ? document.body.appendChild(a) : g("Document body has not initialized. Wait to initialize Firebase until after the document is ready.");
        a.contentDocument ? a.qa = a.contentDocument : a.contentWindow ? a.qa = a.contentWindow.document : a.document && (a.qa = a.document);
        this.ca = a;
        try {
            this.ca.qa.open(), this.ca.qa.write("<html><body></body></html>"), this.ca.qa.close()
        } catch (e) {
            Pb("frame writing exception"), e.stack && Pb(e.stack), Pb(e)
        }
    }
    zc.prototype.close = function() {
        this.fc = o;
        if (this.ca) {
            this.ca.qa.body.innerHTML = "";
            var a = this;
            setTimeout(function() {
                a.ca !== l && (document.body.removeChild(a.ca), a.ca = l)
            }, 0)
        }
        var b = this.da;
        b && (this.da = l, b())
    };
    function Bc(a) {
        if (a.fc && a.Zc && a.tc.count() < (0 < a.qb.length ? 2 : 1)) {
            a.kc++;
            var b = {};
            b.id = a.td;
            b.pw = a.ud;
            b.ser = a.kc;
            for (var b = a.Ab(b), c = "", d = 0; 0 < a.qb.length; )
                if (1870 >= a.qb[0].Fc.length + 30 + c.length) {
                    var e = a.qb.shift(), c = c + "&seg" + d + "=" + e.Ad + "&ts" + d + "=" + e.Gd + "&d" + d + "=" + e.Fc;
                    d++
                } else
                    break;
            var b = b + c, f = a.kc;
            a.tc.add(f);
            var h = function() {
                a.tc.remove(f);
                Bc(a)
            }, i = setTimeout(h, 25E3);
            Ac(a, b, function() {
                clearTimeout(i);
                h()
            });
            return k
        }
        return o
    }
    function Ac(a, b, c) {
        setTimeout(function() {
            try {
                var d = a.ca.qa.createElement("script");
                d.type = "text/javascript";
                d.async = k;
                d.src = b;
                d.onload = d.onreadystatechange = function() {
                    var a = d.readyState;
                    if (!a || "loaded" === a || "complete" === a)
                        d.onload = d.onreadystatechange = l, d.parentNode && d.parentNode.removeChild(d), c()
                };
                d.onerror = function() {
                    Pb("Long-poll script failed to load.");
                    a.close()
                };
                a.ca.qa.body.appendChild(d)
            } catch (e) {
            }
        }, 1)
    }
    ;
    function Cc() {
        function a(a, c) {
            c && c.isAvailable() && b.push(c)
        }
        var b = [], c = Dc;
        if ("array" == ea(c))
            for (var d = 0; d < c.length; ++d)
                a(0, c[d]);
        else
            S(c, a);
        this.bc = b
    }
    var Dc = [wc, {isAvailable: p(o)}, pc];
    function Ec(a, b, c, d, e, f) {
        this.id = a;
        this.e = Sb("c:" + this.id + ":");
        this.sc = c;
        this.mb = d;
        this.va = e;
        this.rc = f;
        this.M = b;
        this.Pb = [];
        this.Dc = 0;
        this.Bc = new Cc;
        this.ma = 0;
        this.e("Connection created");
        Fc(this)
    }
    function Fc(a) {
        var b;
        var c = a.Bc;
        0 < c.bc.length ? b = c.bc[0] : g(Error("No transports available"));
        a.G = new b("c:" + a.id + ":" + a.Dc++, a.M);
        var d = Gc(a, a.G), e = Hc(a, a.G);
        a.yb = a.G;
        a.vb = a.G;
        a.w = l;
        setTimeout(function() {
            a.G && a.G.open(d, e)
        }, 0)
    }
    function Hc(a, b) {
        return function(c) {
            b === a.G ? (a.G = l, !c && 0 === a.ma ? (a.e("Realtime connection failed."), "s-" === a.M.aa.substr(0, 2) && (N.removeItem(a.M.jb), a.M.aa = a.M.host)) : 1 === a.ma && a.e("Realtime connection lost."), a.close()) : b === a.w ? (c = a.w, a.w = l, (a.yb === c || a.vb === c) && a.close()) : a.e("closing an old connection")
        }
    }
    function Gc(a, b) {
        return function(c) {
            if (2 != a.ma)
                if (b === a.vb) {
                    var d = Xb("t", c), c = Xb("d", c);
                    if ("c" == d) {
                        if (d = Xb("t", c), "d" in c)
                            if (c = c.d, "h" === d) {
                                var d = c.ts, e = c.v, f = c.h;
                                a.Zb = c.s;
                                tb(a.M, f);
                                if (0 == a.ma && (a.G.start(), c = a.G, a.e("Realtime connection established."), a.G = c, a.ma = 1, a.mb && (a.mb(d), a.mb = l), "5" !== e && Vb("Protocol version mismatch detected"), c = 1 < a.Bc.bc.length ? a.Bc.bc[1] : l))
                                    a.w = new c("c:" + a.id + ":" + a.Dc++, a.M, a.Zb), a.w.open(Gc(a, a.w), Hc(a, a.w))
                            } else if ("n" === d) {
                                a.e("recvd end transmission on primary");
                                a.vb = a.w;
                                for (c = 0; c < a.Pb.length; ++c)
                                    a.Kb(a.Pb[c]);
                                a.Pb = [];
                                Ic(a)
                            } else
                                "s" === d ? (a.e("Connection shutdown command received. Shutting down..."), a.rc && (a.rc(c), a.rc = l), a.va = l, a.close()) : "r" === d ? (a.e("Reset packet received.  New host: " + c), tb(a.M, c), 1 === a.ma ? a.close() : (Jc(a), Fc(a))) : Tb("Unknown control packet command: " + d)
                    } else
                        "d" == d && a.Kb(c)
                } else
                    b === a.w ? (d = Xb("t", c), c = Xb("d", c), "c" == d ? "t" in c && (c = c.t, "a" === c ? (a.w.start(), a.e("sending client ack on secondary"), a.w.send({t: "c",d: {t: "a",d: {}}}), a.e("Ending transmission on primary"),
                        a.G.send({t: "c",d: {t: "n",d: {}}}), a.yb = a.w, Ic(a)) : "r" === c && (a.e("Got a reset on secondary, closing it"), a.w.close(), (a.yb === a.w || a.vb === a.w) && a.close())) : "d" == d ? a.Pb.push(c) : g(Error("Unknown protocol layer: " + d))) : a.e("message on old connection")
        }
    }
    Ec.prototype.wc = function(a) {
        a = {t: "d",d: a};
        1 !== this.ma && g("Connection is not connected");
        this.yb.send(a)
    };
    function Ic(a) {
        a.yb === a.w && a.vb === a.w && (a.e("cleaning up and promoting a connection: " + a.w.jc), a.G = a.w, a.w = l)
    }
    Ec.prototype.Kb = function(a) {
        this.sc(a)
    };
    Ec.prototype.close = function() {
        2 !== this.ma && (this.e("Closing realtime connection."), this.ma = 2, Jc(this), this.va && (this.va(), this.va = l))
    };
    function Jc(a) {
        a.e("Shutting down all connections");
        a.G && (a.G.close(), a.G = l);
        a.w && (a.w.close(), a.w = l)
    }
    ;
    function Kc(a, b, c, d) {
        this.id = Lc++;
        this.e = Sb("p:" + this.id + ":");
        this.wb = k;
        this.ba = {};
        this.O = [];
        this.nb = 0;
        this.lb = [];
        this.S = o;
        this.Ub = 1E3;
        this.Lb = b || da;
        this.Jb = c || da;
        this.kb = d || da;
        this.M = a;
        this.vc = l;
        this.Rb = [];
        this.xa = {};
        this.zd = 0;
        this.hb = this.Oc = l;
        setTimeout(u(this.Gc, this), 0)
    }
    var Lc = 0, Mc = 0;
    r = Kc.prototype;
    r.ya = function(a, b, c, d) {
        var e = ++this.zd, a = {r: e,a: a,b: b};
        this.e(y(a));
        this.S ? this.sb.wc(a) : this.Rb.push(a);
        var f = this, a = setTimeout(function() {
            var a = f.xa[e];
            a && (delete f.xa[e], a.ha && a.ha.Nb && a.ha.Nb())
        }, 45E3);
        this.xa[e] = {ha: {Mb: c,Nb: d},bd: a}
    };
    function Nc(a, b, c, d, e) {
        a.e("Listen on " + b + " for " + c);
        var f = {p: b}, d = mb(d, function(a) {
            return Ja(a)
        });
        "{}" !== c && (f.q = d);
        a.ya("l", f, function(d) {
            a.e("listen response", d);
            d = d.s;
            "ok" !== d && Oc(a, b, c);
            e && e(d)
        }, function() {
            a.e("timed out on listen...")
        })
    }
    r.Za = function(a, b, c) {
        this.Ca = {kd: a,Ic: o,fa: b,Cb: c};
        this.e("Authenticating using credential: " + this.Ca);
        Pc(this)
    };
    r.zb = function() {
        delete this.Ca;
        this.kb(o);
        this.S && this.ya("unauth", {}, function() {
        }, function() {
        })
    };
    function Pc(a) {
        var b = a.Ca;
        a.S && b && a.ya("auth", {cred: b.kd}, function(c) {
            var d = c.s, c = c.d || "error";
            "ok" !== d && a.Ca === b && delete a.Ca;
            b.Ic ? "ok" !== d && b.Cb && b.Cb(d, c) : (b.Ic = k, b.fa && b.fa(d, c));
            a.kb("ok" === d)
        }, function() {
            a.e("timed out on auth...")
        })
    }
    r.dd = function(a, b, c) {
        a = a.toString();
        if (Oc(this, a, b) && this.S) {
            this.e("Unlisten on " + a + " for " + b);
            var d = this, a = {p: a}, c = mb(c, function(a) {
                return Ja(a)
            });
            "{}" !== b && (a.q = c);
            this.ya("u", a, l, function() {
                d.e("timed out on unlisten...")
            })
        }
    };
    function Qc(a, b, c, d) {
        a.S ? Rc(a, "o", b, c, d) : a.lb.push({uc: b,action: "o",data: c,A: d})
    }
    r.qc = function(a, b) {
        this.S ? Rc(this, "oc", a, l, b) : this.lb.push({uc: a,action: "oc",data: l,A: b})
    };
    function Rc(a, b, c, d, e) {
        c = {p: c,d: d};
        a.e("onDisconnect " + b, c);
        a.ya(b, c, function(a) {
            e && setTimeout(function() {
                e(a.s)
            }, 0)
        }, function() {
            a.e("timed out on onDisconnect...")
        })
    }
    r.put = function(a, b, c, d) {
        Sc(this, "p", a, b, c, d)
    };
    function Sc(a, b, c, d, e, f) {
        c = {p: c,d: d};
        s(f) && (c.h = f);
        a.O.push({action: b,Vc: c,A: e});
        a.nb++;
        b = a.O.length - 1;
        a.S && Tc(a, b)
    }
    function Tc(a, b) {
        var c = a.O[b].action, d = a.O[b].A;
        a.ya(c, a.O[b].Vc, function(e) {
            a.e(c + " response", e);
            delete a.O[b];
            a.nb--;
            0 === a.nb && (a.O = []);
            d && d(e.s)
        }, function() {
            a.e("timed out on put...")
        })
    }
    r.Kb = function(a) {
        if ("r" in a) {
            this.e("from server: " + y(a));
            var b = a.r, c = this.xa[b];
            c && (delete this.xa[b], clearTimeout(c.bd), c.ha && c.ha.Mb && c.ha.Mb(a.b))
        } else
            "error" in a && g("A server-side error has occurred: " + a.error), "a" in a && (b = a.a, a = a.b, this.e("handleServerMessage", b, a), "d" === b ? this.Lb(a.p, a.d) : "m" === b ? this.Lb(a.p, a.d, k) : "c" === b ? (b = a.p, a = (a = a.q) ? mb(a, function(a) {
                return Ka(a)
            }).join("$") : "{}", (a = Oc(this, b, a)) && a.A && a.A("permission_denied")) : "ac" === b ? (b = a.s, a = a.d, c = this.Ca, delete this.Ca, c && c.Cb &&
                c.Cb(b, a), this.kb(o)) : "sd" === b ? this.vc ? this.vc(a) : "msg" in a && "undefined" !== typeof console && console.log("FIREBASE: " + a.msg.replace("\n", "\nFIREBASE: ")) : Tb("Unrecognized action received from server: " + y(b) + "\nAre you using the latest client?"))
    };
    r.mb = function(a) {
        this.e("connection ready");
        this.S = k;
        this.hb = (new Date).getTime();
        Yb = a - (new Date).getTime();
        for (a = 0; a < this.Rb.length; a++)
            this.sb.wc(this.Rb[a]);
        this.Rb = [];
        Pc(this);
        for (a = 0; a < this.O.length; a++)
            this.O[a] && Tc(this, a);
        for (var b in this.ba)
            for (var c in this.ba[b])
                a = this.ba[b][c], Nc(this, b, c, a.Va, a.A);
        for (; this.lb.length; )
            b = this.lb.shift(), Rc(this, b.action, b.uc, b.data, b.A);
        this.Jb(k)
    };
    r.Rc = function() {
        this.S = o;
        this.e("data client disconnected");
        var a = u(function() {
            this.Gc()
        }, this);
        if (this.wb) {
            this.hb && (3E4 < (new Date).getTime() - this.hb && (this.Ub = 1E3), this.hb = l);
            var b = Math.max(0, this.Ub - ((new Date).getTime() - this.Oc)), b = Math.random() * b;
            this.e("Trying to reconnect in " + b + "ms");
            setTimeout(a, b);
            this.Ub = Math.min(3E5, 1.5 * this.Ub)
        } else {
            for (var c = 0; c < this.O.length; c++) {
                var d = this.O[c];
                d && "h" in d.Vc && (d.A && d.A("disconnect"), delete this.O[c], this.nb--)
            }
            0 === this.nb && (this.O = []);
            for (b in this.xa)
                c =
                    this.xa[b], delete this.xa[b], c !== l && (c.ha && c.ha.Nb && c.ha.Nb(), clearTimeout(c.bd));
            this.Xc = function() {
                setTimeout(a, 0)
            }
        }
        this.Jb(o)
    };
    r.Gc = function() {
        if (this.wb) {
            this.e("Making a connection attempt");
            this.Oc = (new Date).getTime();
            this.hb = l;
            var a = u(this.Kb, this), b = u(this.mb, this), c = u(this.Rc, this), d = this.id + ":" + Mc++, e = this;
            this.sb = new Ec(d, this.M, a, b, c, function(a) {
                e.wb = o;
                g(Error(a))
            })
        }
    };
    r.Ra = function() {
        this.wb = o;
        this.sb ? this.sb.close() : this.Rc()
    };
    r.ub = function() {
        this.wb = k;
        this.Xc();
        this.Xc = j
    };
    function Oc(a, b, c) {
        b = (new I(b)).toString();
        c || (c = "{}");
        var d = a.ba[b][c];
        delete a.ba[b][c];
        return d
    }
    ;
    function Uc() {
        this.Ka = O
    }
    function T(a, b) {
        return a.Ka.F(b)
    }
    function U(a, b, c) {
        a.Ka = a.Ka.Ya(b, c)
    }
    Uc.prototype.toString = function() {
        return this.Ka.toString()
    };
    function Vc() {
        this.za = new Uc;
        this.K = new Uc;
        this.Aa = new Uc;
        this.pb = new Ra
    }
    function Wc(a, b) {
        for (var c = T(a.za, b), d = T(a.K, b), e = J(a.pb, b), f = o, h = e; h !== l; ) {
            if (h.j() !== l) {
                f = k;
                break
            }
            h = h.parent()
        }
        if (f)
            return o;
        c = Xc(c, d, e);
        return c !== d ? (U(a.K, b, c), k) : o
    }
    function Xc(a, b, c) {
        if (c.f())
            return a;
        if (c.j() !== l)
            return b;
        a = a || O;
        c.B(function(d) {
            var d = d.name(), e = a.N(d), f = b.N(d), h = J(c, d), e = Xc(e, f, h);
            a = a.D(d, e)
        });
        return a
    }
    Vc.prototype.set = function(a, b) {
        var c = this, d = [];
        lb(b, function(a) {
            var b = a.path, a = a.Fa, h = Jb();
            M(J(c.pb, b), h);
            U(c.K, b, a);
            d.push({path: b,Bd: h})
        });
        return d
    };
    function Yc(a, b) {
        lb(b, function(b) {
            var d = b.Bd, b = J(a.pb, b.path), e = b.j();
            z(e !== l, "pendingPut should not be null.");
            e === d && M(b, l)
        })
    }
    ;
    function Zc() {
        this.Da = []
    }
    function $c(a, b) {
        if (0 !== b.length) {
            a.Da.push.apply(a.Da, b);
            for (var c = 0; c < a.Da.length; c++)
                if (a.Da[c]) {
                    var d = a.Da[c];
                    a.Da[c] = l;
                    var e = d.fa;
                    e(d.$c, d.rb)
                }
            a.Da = []
        }
    }
    ;
    function V(a, b, c, d) {
        this.type = a;
        this.ja = b;
        this.V = c;
        this.rb = d
    }
    ;
    function ad(a) {
        this.I = a;
        this.ga = [];
        this.Hc = new Zc
    }
    function bd(a, b, c, d, e) {
        a.ga.push({type: b,fa: c,cancel: d,W: e});
        var d = [], f = cd(a.g);
        a.fb && f.push(new V("value", a.g));
        for (var h = 0; h < f.length; h++)
            if (f[h].type === b) {
                var i = new W(a.I.o, a.I.path);
                f[h].V && (i = i.C(f[h].V));
                d.push({fa: e ? u(c, e) : c,$c: new R(f[h].ja, i),rb: f[h].rb})
            }
        $c(a.Hc, d)
    }
    ad.prototype.Sb = function(a, b) {
        b = this.Tb(a, b);
        b != l && fd(this, b)
    };
    function fd(a, b) {
        for (var c = [], d = 0; d < b.length; d++) {
            var e = b[d], f = e.type, h = new W(a.I.o, a.I.path);
            b[d].V && (h = h.C(b[d].V));
            h = new R(b[d].ja, h);
            "value" === e.type && !h.Eb() ? f += "(" + h.P() + ")" : "value" !== e.type && (f += " " + h.name());
            Pb(a.I.o.n.id + ": event:" + a.I.path + ":" + a.I.Ia() + ":" + f);
            for (f = 0; f < a.ga.length; f++) {
                var i = a.ga[f];
                b[d].type === i.type && c.push({fa: i.W ? u(i.fa, i.W) : i.fa,$c: h,rb: e.rb})
            }
        }
        $c(a.Hc, c)
    }
    function cd(a) {
        var b = [];
        if (!a.J()) {
            var c = l;
            a.B(function(a, e) {
                b.push(new V("child_added", e, a, c));
                c = a
            })
        }
        return b
    }
    function gd(a) {
        a.fb || (a.fb = k, fd(a, [new V("value", a.g)]))
    }
    ;
    function hd(a, b) {
        ad.call(this, a);
        this.g = b
    }
    ka(hd, ad);
    hd.prototype.Tb = function(a, b) {
        this.g = a;
        this.fb && b != l && b.push(new V("value", this.g));
        return b
    };
    hd.prototype.bb = function() {
        return {}
    };
    function id(a, b) {
        this.Db = a;
        this.pc = b
    }
    function jd(a, b, c, d, e) {
        var f = a.F(c), h = b.F(c), d = new id(d, e), e = kd(d, c, f, h), i = o;
        if (!f.f() && !h.f() && f.k() !== h.k())
            var i = a.F(c.parent()), m = b.F(c.parent()), n = Ma(c), i = i.T(n, f) != m.T(n, h);
        if (e || i) {
            f = c;
            c = e;
            for (h = i; f.parent() !== l; ) {
                var q = a.F(f), e = b.F(f), i = f.parent();
                if (!d.Db || J(d.Db, i).j())
                    m = b.F(i), n = [], f = Ma(f), q.f() ? (q = m.T(f, e), n.push(new V("child_added", e, f, q))) : e.f() ? n.push(new V("child_removed", q, f)) : (q = m.T(f, e), h && n.push(new V("child_moved", e, f, q)), c && n.push(new V("child_changed", e, f, q))), d.pc(i, m, n);
                h &&
                (h = o, c = k);
                f = i
            }
        }
    }
    function kd(a, b, c, d) {
        var e, f = [];
        c === d ? e = o : c.J() && d.J() ? e = c.j() !== d.j() : c.J() ? (ld(a, b, O, d, f), e = k) : d.J() ? (ld(a, b, c, O, f), e = k) : e = ld(a, b, c, d, f);
        e ? a.pc(b, d, f) : c.k() !== d.k() && a.pc(b, d, l);
        return e
    }
    function ld(a, b, c, d, e) {
        var f = o, h = !a.Db || !J(a.Db, b).f(), i = [], m = [], n = [], q = [], x = {}, v = {}, w, L, K, H;
        w = c.Qa();
        K = $a(w);
        L = d.Qa();
        for (H = $a(L); K !== l || H !== l; ) {
            c = K === l ? 1 : H === l ? -1 : K.key === H.key ? 0 : ec({name: K.key,wa: K.value.k()}, {name: H.key,wa: H.value.k()});
            if (0 > c)
                f = ua(x, K.key), s(f) ? (n.push({Jc: K,cd: i[f]}), i[f] = l) : (v[K.key] = m.length, m.push(K)), f = k, K = $a(w);
            else {
                if (0 < c)
                    f = ua(v, H.key), s(f) ? (n.push({Jc: m[f],cd: H}), m[f] = l) : (x[H.key] = i.length, i.push(H)), f = k;
                else {
                    c = b.C(H.key);
                    if (c = kd(a, c, K.value, H.value))
                        q.push(H), f = k;
                    K =
                        $a(w)
                }
                H = $a(L)
            }
            if (!h && f)
                return k
        }
        for (h = 0; h < m.length; h++)
            if (x = m[h])
                c = b.C(x.key), kd(a, c, x.value, O), e.push(new V("child_removed", x.value, x.key));
        for (h = 0; h < i.length; h++)
            if (x = i[h])
                c = b.C(x.key), m = d.T(x.key, x.value), kd(a, c, O, x.value), e.push(new V("child_added", x.value, x.key, m));
        for (h = 0; h < n.length; h++)
            x = n[h].Jc, i = n[h].cd, c = b.C(i.key), m = d.T(i.key, i.value), e.push(new V("child_moved", i.value, i.key, m)), (c = kd(a, c, x.value, i.value)) && q.push(i);
        for (h = 0; h < q.length; h++)
            a = q[h], m = d.T(a.key, a.value), e.push(new V("child_changed",
                a.value, a.key, m));
        return f
    }
    ;
    function md() {
        this.L = this.na = l;
        this.set = {}
    }
    ka(md, tc);
    r = md.prototype;
    r.setActive = function(a) {
        this.na = a
    };
    function nd(a) {
        return a.contains("default")
    }
    function od(a) {
        return a.na != l && nd(a)
    }
    r.defaultView = function() {
        return nd(this) ? this.get("default") : l
    };
    r.path = aa("L");
    r.toString = function() {
        return mb(this.keys(), function(a) {
            return "default" === a ? "{}" : a
        }).join("$")
    };
    r.Va = function() {
        var a = [];
        S(this.set, function(b) {
            a.push(b.I)
        });
        return a
    };
    function pd(a, b) {
        ad.call(this, a);
        this.g = O;
        this.Tb(b, cd(b))
    }
    ka(pd, ad);
    pd.prototype.Tb = function(a, b) {
        if (b === l)
            return b;
        var c = [], d = this.I;
        s(d.Z) && (s(d.la) && d.la != l ? c.push(function(a, b) {
            var c = Wb(b, d.Z);
            return 0 < c || 0 === c && a >= d.la
        }) : c.push(function(a, b) {
            return 0 <= Wb(b, d.Z)
        }));
        s(d.ra) && (s(d.Pa) ? c.push(function(a, b) {
            var c = Wb(b, d.ra);
            return 0 > c || 0 === c && a <= d.Pa
        }) : c.push(function(a, b) {
            return 0 >= Wb(b, d.ra)
        }));
        var e = l, f = l;
        if (s(this.I.ta))
            if (s(this.I.Z)) {
                if (e = qd(a, c, this.I.ta, o)) {
                    var h = a.N(e).k();
                    c.push(function(a, b) {
                        var c = Wb(b, h);
                        return 0 > c || 0 === c && a <= e
                    })
                }
            } else if (f = qd(a, c, this.I.ta,
                k)) {
                var i = a.N(f).k();
                c.push(function(a, b) {
                    var c = Wb(b, i);
                    return 0 < c || 0 === c && a >= f
                })
            }
        for (var m = [], n = [], q = [], x = [], v = 0; v < b.length; v++) {
            var w = b[v].V, L = b[v].ja;
            switch (b[v].type) {
                case "child_added":
                    rd(c, w, L) && (this.g = this.g.D(w, L), n.push(b[v]));
                    break;
                case "child_removed":
                    this.g.N(w).f() || (this.g = this.g.D(w, l), m.push(b[v]));
                    break;
                case "child_changed":
                    !this.g.N(w).f() && rd(c, w, L) && (this.g = this.g.D(w, L), x.push(b[v]));
                    break;
                case "child_moved":
                    var K = !this.g.N(w).f(), H = rd(c, w, L);
                    K ? H ? (this.g = this.g.D(w, L), q.push(b[v])) :
                        (m.push(new V("child_removed", this.g.N(w), w)), this.g = this.g.D(w, l)) : H && (this.g = this.g.D(w, L), n.push(b[v]))
            }
        }
        var dd = e || f;
        if (dd) {
            var ed = (v = f !== l) ? this.g.Kc() : this.g.Lc(), Rb = o, Pa = o, Qa = this;
            (v ? a.lc : a.B).call(a, function(a, b) {
                !Pa && ed === l && (Pa = k);
                if (Pa && Rb)
                    return k;
                Rb ? (m.push(new V("child_removed", Qa.g.N(a), a)), Qa.g = Qa.g.D(a, l)) : Pa && (n.push(new V("child_added", b, a)), Qa.g = Qa.g.D(a, b));
                ed === a && (Pa = k);
                a === dd && (Rb = k)
            })
        }
        for (v = 0; v < n.length; v++)
            c = n[v], w = this.g.T(c.V, c.ja), m.push(new V("child_added", c.ja, c.V, w));
        for (v = 0; v < q.length; v++)
            c = q[v], w = this.g.T(c.V, c.ja), m.push(new V("child_moved", c.ja, c.V, w));
        for (v = 0; v < x.length; v++)
            c = x[v], w = this.g.T(c.V, c.ja), m.push(new V("child_changed", c.ja, c.V, w));
        this.fb && 0 < m.length && m.push(new V("value", this.g));
        return m
    };
    function qd(a, b, c, d) {
        if (a.J())
            return l;
        var e = l;
        (d ? a.lc : a.B).call(a, function(a, d) {
            if (rd(b, a, d) && (e = a, c--, 0 === c))
                return k
        });
        return e
    }
    function rd(a, b, c) {
        for (var d = 0; d < a.length; d++)
            if (!a[d](b, c.k()))
                return o;
        return k
    }
    pd.prototype.mc = function(a) {
        return this.g.N(a) !== O
    };
    pd.prototype.bb = function(a, b, c) {
        var d = {};
        this.g.J() || this.g.B(function(a) {
            d[a] = k
        });
        var e = this.g, c = T(c, new I("")), f = new Ra;
        M(J(f, this.I.path), k);
        var h = O.Ya(a, b), i = [];
        jd(c, h, a, f, function(a, b, c) {
            c !== l && (i = i.concat(c))
        });
        this.Tb(b, i);
        this.g.J() || this.g.B(function(a) {
            d[a] = k
        });
        this.g = e;
        return d
    };
    function sd(a, b) {
        this.n = a;
        this.i = b;
        this.Qc = b.Ka;
        this.pa = new Ra
    }
    sd.prototype.Bb = function(a, b, c, d, e) {
        var f = a.path, h = J(this.pa, f), i = h.j();
        i === l ? (i = new md, M(h, i)) : z(!i.f(), "We shouldn't be storing empty QueryMaps");
        var m = a.Ia();
        if (i.contains(m))
            bd(i.get(m), b, c, d, e);
        else {
            var n = this.i.Ka.F(f), a = "default" === a.Ia() ? new hd(a, n) : new pd(a, n);
            if (od(i) || td(h))
                i.add(m, a), i.L || (i.L = a.I.path);
            else {
                var q, x;
                i.f() || (q = i.toString(), x = i.Va());
                i.add(m, a);
                i.L || (i.L = a.I.path);
                i.setActive(ud(this, i));
                q && x && this.n.dd(i.path(), q, x)
            }
            od(i) && Ta(h, function(a) {
                if (a = a.j()) {
                    a.na && a.na();
                    a.na =
                        l
                }
            });
            bd(a, b, c, d, e);
            (b = (b = Ua(J(this.pa, f), function(a) {
                var b;
                if (b = a.j())
                    if (b = a.j().defaultView())
                        b = a.j().defaultView().fb;
                if (b)
                    return k
            }, k)) || this.n === l) && gd(a)
        }
    };
    function vd(a, b, c, d, e) {
        for (var f = a.get(b), h = o, i = f.ga.length - 1; 0 <= i; i--) {
            var m = f.ga[i];
            if ((!c || m.type === c) && (!d || m.fa === d) && (!e || m.W === e))
                if (f.ga.splice(i, 1), h = k, c && d)
                    break
        }
        (c = h && !(0 < f.ga.length)) && a.remove(b);
        return c
    }
    sd.prototype.Wb = function(a, b, c, d) {
        var e = J(this.pa, a.path).j();
        return e === l ? l : wd(this, e, a, b, c, d)
    };
    function wd(a, b, c, d, e, f) {
        var h = b.path(), h = J(a.pa, h), c = c ? c.Ia() : l, i = [];
        c && "default" !== c ? vd(b, c, d, e, f) && i.push(c) : lb(b.keys(), function(a) {
            vd(b, a, d, e, f) && i.push(a)
        });
        b.f() && M(h, l);
        c = td(h);
        if (0 < i.length && !c) {
            for (var m = h, n = h.parent(), c = o; !c && n; ) {
                var q = n.j();
                if (q) {
                    z(!od(q));
                    var x = m.name(), v = o;
                    S(q.set, function(a) {
                        v = a.mc(x) || v
                    });
                    v && (c = k)
                }
                m = n;
                n = n.parent()
            }
            m = l;
            if (!od(b)) {
                n = b.na;
                b.na = l;
                var w = [], L = function(b) {
                    var c = b.j();
                    c && nd(c) ? (w.push(c.path()), c.na == l && c.setActive(ud(a, c))) : (c && c.na == l && c.setActive(ud(a,
                        c)), b.B(L))
                };
                L(h);
                m = w;
                n && n()
            }
            return c ? l : m
        }
        return l
    }
    function xd(a, b, c) {
        Ta(J(a.pa, b), function(a) {
            (a = a.j()) && S(a.set, function(a) {
                gd(a)
            })
        }, c, k)
    }
    function yd(a, b, c) {
        function d(a) {
            for (var b = 0; b < c.length; ++b)
                if (c[b].contains(a))
                    return k;
            return o
        }
        var e = a.Qc, f = a.i.Ka;
        a.Qc = f;
        jd(e, f, b, a.pa, function(c, e, f) {
            if (b.contains(c)) {
                var n = d(c);
                n && xd(a, c, o);
                a.Sb(c, e, f);
                n && xd(a, c, k)
            } else
                a.Sb(c, e, f)
        });
        d(b) && xd(a, b, k)
    }
    sd.prototype.Sb = function(a, b, c) {
        a = J(this.pa, a).j();
        a !== l && S(a.set, function(a) {
            a.Sb(b, c)
        })
    };
    function td(a) {
        return Ua(a, function(a) {
            return a.j() && od(a.j())
        })
    }
    function ud(a, b) {
        if (a.n) {
            var c = b.keys(), d = a.n, e = function(d) {
                "ok" !== d ? (Vb("on() or once() for " + b.path().toString() + " failed: " + d), b && S(b.set, function(a) {
                    for (var b = 0; b < a.ga.length; b++) {
                        var c = a.ga[b];
                        c.cancel && (c.W ? u(c.cancel, c.W) : c.cancel)()
                    }
                }), wd(a, b)) : lb(c, function(a) {
                    (a = b.get(a)) && gd(a)
                })
            }, f = b.toString(), h = b.path().toString();
            d.ba[h] = d.ba[h] || {};
            z(!d.ba[h][f], "listen() called twice for same path/queryId.");
            d.ba[h][f] = {Va: b.Va(),A: e};
            d.S && Nc(d, h, f, b.Va(), e);
            return u(a.n.dd, a.n, b.path(), b.toString(),
                b.Va())
        }
        return da
    }
    sd.prototype.bb = function(a, b, c, d) {
        var e = {};
        S(b.set, function(b) {
            b = b.bb(a, c, d);
            S(b, function(a, b) {
                e[b] = a ? k : ua(e, b) || o
            })
        });
        c.J() || c.B(function(a) {
            D(e, a) || (e[a] = o)
        });
        return e
    };
    function zd(a, b, c, d, e, f) {
        var h = b.path();
        if (f !== l) {
            var i = [];
            d.J() || d.B(function(a, b) {
                i.push({path: h.C(a),Fa: b});
                delete f[a]
            });
            S(f, function(a, b) {
                i.push({path: h.C(b),Fa: O})
            });
            return i
        }
        var b = a.bb(h, b, d, e), m = O, n = [];
        S(b, function(b, f) {
            var h = new I(f);
            b ? m = m.D(f, d.F(h)) : n = n.concat(Ad(a, d.F(h), J(c, h), e))
        });
        return [{path: h,Fa: m}].concat(n)
    }
    function Bd(a, b, c, d, e) {
        for (var f = J(a.pa, b), h = f.parent(), i = o; !i && h !== l; ) {
            var m = h.j();
            m !== l && (nd(m) ? i = k : (m = a.bb(b, m, c, d), f = f.name(), ua(m, f) && (i = k)));
            f = h;
            h = h.parent()
        }
        if (i)
            return [{path: b,Fa: c}];
        h = J(a.pa, b);
        i = h.j();
        return i !== l ? nd(i) ? [{path: b,Fa: c}] : zd(a, i, h, c, d, e) : Ad(a, c, h, d)
    }
    function Ad(a, b, c, d) {
        var e = c.j();
        if (e !== l)
            return nd(e) ? [{path: c.path(),Fa: b}] : zd(a, e, c, b, d, l);
        if (b.J())
            return [];
        var f = [];
        b.B(function(b, e) {
            var m = new I(b);
            f = f.concat(Ad(a, e, J(c, m), d))
        });
        return f
    }
    ;
    function Cd(a) {
        this.M = a;
        this.$ = nc(a);
        this.n = new Kc(this.M, u(this.Lb, this), u(this.Jb, this), u(this.kb, this));
        var b = u(function() {
            return new kc(this.$, this.n)
        }, this), a = a.toString();
        mc[a] || (mc[a] = b());
        this.Fd = mc[a];
        this.ac = new Ra;
        this.i = new Vc;
        this.Q = new sd(this.n, this.i.Aa);
        this.Mc = new Uc;
        this.nc = new sd(l, this.Mc);
        Dd(this, "connected", o);
        Dd(this, "authenticated", o)
    }
    r = Cd.prototype;
    r.toString = function() {
        return (this.M.Yb ? "https://" : "http://") + this.M.host
    };
    r.name = function() {
        return this.M.jb
    };
    r.Lb = function(a, b, c) {
        var d = [], e = l;
        if (9 <= a.length && a.lastIndexOf(".priority") === a.length - 9)
            a = new I(a.substring(0, a.length - 9)), c = T(this.i.za, a).ec(b), d.push(a);
        else if (c) {
            var e = b, a = new I(a), c = T(this.i.za, a), f;
            for (f in b) {
                var h = Q(b[f]), c = c.D(f, h);
                d.push(a.C(f))
            }
        } else
            a = new I(a), c = Q(b), d.push(a);
        b = Bd(this.Q, a, c, this.i.K, e);
        e = o;
        for (f = 0; f < b.length; ++f) {
            var c = b[f], h = this.i, i = c.path;
            U(h.za, i, c.Fa);
            e = Wc(h, i) || e
        }
        e && (a = Ed(this, a), Fd(this, a), a = a.path());
        yd(this.Q, a, d)
    };
    r.Jb = function(a) {
        Dd(this, "connected", a)
    };
    r.kb = function(a) {
        Dd(this, "authenticated", a)
    };
    function Dd(a, b, c) {
        b = new I("/.info/" + b);
        U(a.Mc, b, Q(c));
        yd(a.nc, b, [b])
    }
    r.Za = function(a, b, c) {
        this.n.Za(a, function(a, c) {
            X(b, a, c)
        }, function(a, b) {
            Vb("auth() was canceled: " + b);
            if (c) {
                var f = Error(b);
                f.code = a.toUpperCase();
                c(f)
            }
        })
    };
    r.zb = function() {
        this.n.zb()
    };
    r.Xa = function(a, b, c, d) {
        this.e("set", {path: a.toString(),value: b});
        var b = Q(b, c), c = Bd(this.Q, a, b, this.i.K, l), e = this.i.set(a, c), f = this;
        this.n.put(a.toString(), b.P(k), function(b) {
            var c = "ok" === b;
            Yc(f.i, e);
            c || (Vb("set at " + a + " failed: " + b), Wc(f.i, a), c = Ed(f, a), Fd(f, c), yd(f.Q, c.path(), []));
            X(d, b)
        });
        b = Ed(this, a);
        Gd(this, a);
        Fd(this, b);
        yd(this.Q, b.path(), [a])
    };
    r.update = function(a, b, c) {
        this.e("update", {path: a.toString(),value: b});
        var d = T(this.i.Aa, a), e = k, f = [], h;
        for (h in b) {
            var e = o, i = Q(b[h]), d = d.D(h, i);
            f.push(a.C(h))
        }
        if (e)
            Pb("update() called with empty data.  Don't do anything."), X(c, "ok");
        else {
            var d = Bd(this.Q, a, d, this.i.K, b), m = this.i.set(a, d), n = this;
            Sc(this.n, "m", a.toString(), b, function(b) {
                z("ok" === b || "permission_denied" === b, "merge at " + a + " failed.");
                Yc(n.i, m);
                X(c, b)
            }, j);
            b = Ed(this, a);
            Gd(this, a);
            Fd(this, b);
            yd(this.Q, b.path(), f)
        }
    };
    r.xc = function(a, b, c) {
        this.e("setPriority", {path: a.toString(),wa: b});
        var d = T(this.i.K, a).ec(b), d = Bd(this.Q, a, d, this.i.K, l), e = this.i.set(a, d), f = this;
        this.n.put(a.toString() + "/.priority", b, function(a) {
            Yc(f.i, e);
            X(c, a)
        });
        a = Ed(this, a);
        Fd(this, a);
        yd(this.Q, a.path(), [])
    };
    r.qc = function(a, b) {
        this.n.qc(a.toString(), function(a) {
            X(b, a)
        })
    };
    function Hd(a, b, c, d) {
        c = Q(c);
        Qc(a.n, b.toString(), c.P(k), function(a) {
            X(d, a)
        })
    }
    function Id(a) {
        ic(a.$, "deprecated_on_disconnect");
        a.Fd.ad.deprecated_on_disconnect = k
    }
    r.Bb = function(a, b, c, d, e) {
        ".info" === F(a.path) ? this.nc.Bb(a, b, c, d, e) : this.Q.Bb(a, b, c, d, e)
    };
    r.Wb = function(a, b, c, d) {
        if (".info" === F(a.path))
            this.nc.Wb(a, b, c, d);
        else if (b = this.Q.Wb(a, b, c, d), b !== l) {
            for (var c = this.i, a = a.path, d = [], e = 0; e < b.length; ++e)
                d[e] = T(c.za, b[e]);
            U(c.za, a, O);
            for (e = 0; e < b.length; ++e)
                U(c.za, b[e], d[e])
        }
    };
    r.Ra = function() {
        this.n.Ra()
    };
    r.ub = function() {
        this.n.ub()
    };
    r.yc = function(a) {
        if ("undefined" !== typeof console) {
            a ? (this.$b || (this.$b = new jc(this.$)), a = this.$b.get()) : a = this.$.get();
            var b = a, c = [], d = 0, e;
            for (e in b)
                c[d++] = e;
            var f = function(a, b) {
                return Math.max(b.length, a)
            };
            if (c.reduce)
                e = c.reduce(f, 0);
            else {
                var h = 0;
                lb(c, function(a) {
                    h = f.call(j, h, a)
                });
                e = h
            }
            for (var i in a) {
                b = a[i];
                for (c = i.length; c < e + 2; c++)
                    i += " ";
                console.log(i + b)
            }
        }
    };
    r.e = function() {
        Pb("r:" + this.n.id + ":", arguments)
    };
    function Jd(a, b) {
        var c = new W(a, b);
        return new R(T(a.i.Aa, b), c)
    }
    function X(a, b, c) {
        if (a)
            if ("ok" == b)
                a(l, c);
            else {
                var d = b = (b || "error").toUpperCase();
                c && (d += ": " + c);
                c = Error(d);
                c.code = b;
                a(c)
            }
    }
    ;
    function Gd(a, b) {
        var c = J(a.ac, b);
        Ua(c, function(b) {
            Kd(a, b)
        });
        Kd(a, c);
        Ta(c, function(b) {
            Kd(a, b)
        })
    }
    function Kd(a, b) {
        var c = b.j();
        if (c !== l) {
            for (var d = -1, e = [], f = 0; f < c.length; f++)
                if (2 === c[f].status)
                    z(d === f - 1, "All SENT items should be at beginning of queue."), d = f, c[f].status = 4, c[f].Cc = "set";
                else if (c[f].dc(), c[f].A) {
                    var h = Jd(a, b.path());
                    e.push(u(c[f].A, l, Error("set"), o, h))
                }
            -1 === d ? M(b, l) : c.length = d + 1;
            for (f = 0; f < e.length; f++)
                e[f]()
        }
    }
    function Ld(a, b) {
        var c = b || a.ac;
        b || Md(a, c);
        if (!c.f())
            if (c.j() !== l) {
                var d = Nd(a, c);
                if (0 !== d.length) {
                    var e = c.path();
                    if (2 !== d[0].status && 4 !== d[0].status) {
                        for (var f = 0; f < d.length; f++)
                            z(1 === d[f].status, "tryToSendTransactionForNode_: items in queue should all be run."), d[f].status = 2, d[f].Yc++;
                        var h = T(a.i.K, e).hash();
                        U(a.i.K, e, T(a.i.Aa, e));
                        var i = T(a.i.K, e).P(k), m = Jb();
                        M(J(a.i.pb, e), m);
                        a.n.put(e.toString(), i, function(b) {
                            a.e("transaction put response", {path: e.toString(),status: b});
                            var h = J(a.i.pb, e), i = h.j();
                            z(i !==
                                l, "tryToSendTransactionsForNode_: pendingPut should not be null.");
                            i === m && (M(h, l), U(a.i.K, e, T(a.i.za, e)));
                            if ("ok" === b) {
                                b = [];
                                for (f = 0; f < d.length; f++)
                                    d[f].status = 3, d[f].A && (h = Jd(a, d[f].path), b.push(u(d[f].A, l, l, k, h))), d[f].dc();
                                Md(a, c);
                                Ld(a);
                                for (f = 0; f < b.length; f++)
                                    b[f]()
                            } else {
                                if ("datastale" === b)
                                    for (f = 0; f < d.length; f++)
                                        d[f].status = 4 === d[f].status ? 5 : 1;
                                else {
                                    Vb("transaction at " + e + " failed: " + b);
                                    for (f = 0; f < d.length; f++)
                                        d[f].status = 5, d[f].Cc = b
                                }
                                b = Ed(a, e);
                                Fd(a, b);
                                yd(a.Q, b.path(), [e])
                            }
                        }, h)
                    }
                }
            } else
                c.B(function(b) {
                    Ld(a,
                        b)
                })
    }
    function Fd(a, b) {
        var c = b.path();
        U(a.i.Aa, c, T(a.i.K, c));
        var d = Nd(a, b);
        if (0 !== d.length) {
            for (var e = T(a.i.Aa, c), f = [], h = 0; h < d.length; h++) {
                var i = Na(c, d[h].path), m = o, n;
                z(i !== l, "rerunTransactionsUnderNode_: relativePath should not be null.");
                if (5 === d[h].status)
                    m = k, n = d[h].Cc;
                else if (1 === d[h].status)
                    if (25 <= d[h].Yc)
                        m = k, n = "maxretry";
                    else {
                        var q = d[h].update(e.F(i).P());
                        s(q) ? (Aa("transaction failed: Data returned ", q), e = e.Ya(i, Q(q))) : (m = k, n = "nodata")
                    }
                m && (d[h].dc(), d[h].status = 3, d[h].A && (m = new W(a, d[h].path), i = new R(e.F(i),
                    m), "nodata" === n ? f.push(u(d[h].A, l, l, o, i)) : f.push(u(d[h].A, l, Error(n), o, i))))
            }
            d = T(a.i.K, c).k();
            U(a.i.Aa, c, e.ec(d));
            Ld(a);
            for (h = 0; h < f.length; h++)
                f[h]()
        }
    }
    function Ed(a, b) {
        for (var c, d = a.ac; (c = F(b)) !== l && d.j() === l; )
            d = J(d, c), b = La(b);
        return d
    }
    function Nd(a, b) {
        var c = [];
        Od(a, b, c);
        c.sort(function(a, b) {
            return a.Sc - b.Sc
        });
        return c
    }
    function Od(a, b, c) {
        var d = b.j();
        if (d !== l)
            for (var e = 0; e < d.length; e++)
                c.push(d[e]);
        b.B(function(b) {
            Od(a, b, c)
        })
    }
    function Md(a, b) {
        var c = b.j();
        if (c) {
            for (var d = 0, e = 0; e < c.length; e++)
                3 !== c[e].status && (c[d] = c[e], d++);
            c.length = d;
            M(b, 0 < c.length ? c : l)
        }
        b.B(function(b) {
            Md(a, b)
        })
    }
    ;
    function Y() {
        this.Wa = {}
    }
    Y.pd = function() {
        return Y.Nc ? Y.Nc : Y.Nc = new Y
    };
    Y.prototype.Ra = function() {
        for (var a in this.Wa)
            this.Wa[a].Ra()
    };
    Y.prototype.interrupt = Y.prototype.Ra;
    Y.prototype.ub = function() {
        for (var a in this.Wa)
            this.Wa[a].ub()
    };
    Y.prototype.resume = Y.prototype.ub;
    var Z = {qd: function(a) {
        var b = P.prototype.hash;
        P.prototype.hash = a;
        return function() {
            P.prototype.hash = b
        }
    }};
    Z.hijackHash = Z.qd;
    Z.Ia = function(a) {
        return a.Ia()
    };
    Z.queryIdentifier = Z.Ia;
    Z.sd = function(a) {
        return a.o.n.ba
    };
    Z.listens = Z.sd;
    Z.xd = function(a) {
        return a.o.n.sb
    };
    Z.refConnection = Z.xd;
    Z.fd = Kc;
    Z.DataConnection = Z.fd;
    Kc.prototype.sendRequest = Kc.prototype.ya;
    Kc.prototype.interrupt = Kc.prototype.Ra;
    Z.gd = Ec;
    Z.RealTimeConnection = Z.gd;
    Ec.prototype.sendRequest = Ec.prototype.wc;
    Ec.prototype.close = Ec.prototype.close;
    Z.ed = sb;
    Z.ConnectionTarget = Z.ed;
    Z.nd = function() {
        xc = qc = k
    };
    Z.forceLongPolling = Z.nd;
    Z.od = function() {
        yc = k
    };
    Z.forceWebSockets = Z.od;
    Z.Dd = function(a, b) {
        a.o.n.vc = b
    };
    Z.setSecurityDebugCallback = Z.Dd;
    Z.yc = function(a, b) {
        a.o.yc(b)
    };
    Z.stats = Z.yc;
    function $(a, b, c) {
        this.tb = a;
        this.L = b;
        this.ua = c
    }
    ca("fb.api.onDisconnect", $);
    $.prototype.cancel = function(a) {
        A("Firebase.onDisconnect().cancel", 0, 1, arguments.length);
        C("Firebase.onDisconnect().cancel", 1, a, k);
        this.tb.qc(this.L, a)
    };
    $.prototype.cancel = $.prototype.cancel;
    $.prototype.remove = function(a) {
        A("Firebase.onDisconnect().remove", 0, 1, arguments.length);
        E("Firebase.onDisconnect().remove", this.L);
        C("Firebase.onDisconnect().remove", 1, a, k);
        Hd(this.tb, this.L, l, a)
    };
    $.prototype.remove = $.prototype.remove;
    $.prototype.set = function(a, b) {
        A("Firebase.onDisconnect().set", 1, 2, arguments.length);
        E("Firebase.onDisconnect().set", this.L);
        za("Firebase.onDisconnect().set", a, o);
        C("Firebase.onDisconnect().set", 2, b, k);
        Hd(this.tb, this.L, a, b)
    };
    $.prototype.set = $.prototype.set;
    $.prototype.Xa = function(a, b, c) {
        A("Firebase.onDisconnect().setWithPriority", 2, 3, arguments.length);
        E("Firebase.onDisconnect().setWithPriority", this.L);
        za("Firebase.onDisconnect().setWithPriority", a, o);
        Ea("Firebase.onDisconnect().setWithPriority", 2, b, o);
        C("Firebase.onDisconnect().setWithPriority", 3, c, k);
        (".length" === this.ua || ".keys" === this.ua) && g("Firebase.onDisconnect().setWithPriority failed: " + this.ua + " is a read-only object.");
        var d = this.tb, e = this.L, f = Q(a, b);
        Qc(d.n, e.toString(), f.P(k), function(a) {
            X(c,
                a)
        })
    };
    $.prototype.setWithPriority = $.prototype.Xa;
    $.prototype.update = function(a, b) {
        A("Firebase.onDisconnect().update", 1, 2, arguments.length);
        E("Firebase.onDisconnect().update", this.L);
        Da("Firebase.onDisconnect().update", a);
        C("Firebase.onDisconnect().update", 2, b, k);
        var c = this.tb, d = this.L, e = k, f;
        for (f in a)
            e = o;
        e ? (Pb("onDisconnect().update() called with empty data.  Don't do anything."), X(b, k)) : (c = c.n, d = d.toString(), e = function(a) {
            X(b, a)
        }, c.S ? Rc(c, "om", d, a, e) : c.lb.push({uc: d,action: "om",data: a,A: e}))
    };
    $.prototype.update = $.prototype.update;
    var Pd, Qd = 0, Rd = [];
    Pd = function() {
        var a = (new Date).getTime() + Yb, b = a === Qd;
        Qd = a;
        for (var c = Array(8), d = 7; 0 <= d; d--)
            c[d] = "-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz".charAt(a % 64), a = Math.floor(a / 64);
        z(0 === a);
        a = c.join("");
        if (b) {
            for (d = 11; 0 <= d && 63 === Rd[d]; d--)
                Rd[d] = 0;
            Rd[d]++
        } else
            for (d = 0; 12 > d; d++)
                Rd[d] = Math.floor(64 * Math.random());
        for (d = 0; 12 > d; d++)
            a += "-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz".charAt(Rd[d]);
        z(20 === a.length, "NextPushId: Length should be 20.");
        return a
    };
    function W() {
        var a, b, c;
        if (arguments[0] instanceof Cd)
            c = arguments[0], a = arguments[1];
        else {
            A("new Firebase", 1, 2, arguments.length);
            var d = arguments[0];
            b = a = "";
            var e = k, f = "";
            if (t(d)) {
                var h = d.indexOf("//");
                if (0 <= h)
                    var i = d.substring(0, h - 1), d = d.substring(h + 2);
                h = d.indexOf("/");
                -1 === h && (h = d.length);
                a = d.substring(0, h);
                var d = d.substring(h + 1), m = a.split(".");
                if (3 == m.length) {
                    h = m[2].indexOf(":");
                    e = 0 <= h ? "https" === i : k;
                    if ("firebase" === m[1])
                        Ub(a + " is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead");
                    else {
                        b = m[0];
                        f = "";
                        d = ("/" + d).split("/");
                        for (i = 0; i < d.length; i++)
                            if (0 < d[i].length) {
                                h = d[i];
                                try {
                                    h = decodeURIComponent(h.replace(/\+/g, " "))
                                } catch (n) {
                                }
                                f += "/" + h
                            }
                    }
                    b = b.toLowerCase()
                } else
                    b = l
            }
            e || "undefined" !== typeof window && (window.location && window.location.protocol && -1 !== window.location.protocol.indexOf("https:")) && Vb("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().");
            a = new sb(a, e, b);
            b = new I(f);
            e = b.toString();
            if (!(d = !t(a.host)))
                if (!(d = 0 === a.host.length))
                    if (!(d = !ya(a.jb)))
                        if (d =
                            0 !== e.length)
                            e && (e = e.replace(/^\/*\.info(\/|$)/, "/")), d = !(t(e) && 0 !== e.length && !xa.test(e));
            d && g(Error(B("new Firebase", 1, o) + 'must be a valid firebase URL and the path can\'t contain ".", "#", "$", "[", or "]".'));
            arguments[1] ? arguments[1] instanceof Y ? c = arguments[1] : g(Error("Expected a valid Firebase.Context for second argument to new Firebase()")) : c = Y.pd();
            e = a.toString();
            d = ua(c.Wa, e);
            d || (d = new Cd(a), c.Wa[e] = d);
            c = d;
            a = b
        }
        G.call(this, c, a)
    }
    ka(W, G);
    ca("Firebase", W);
    W.prototype.name = function() {
        A("Firebase.name", 0, 0, arguments.length);
        return this.path.f() ? l : Ma(this.path)
    };
    W.prototype.name = W.prototype.name;
    W.prototype.C = function(a) {
        A("Firebase.child", 1, 1, arguments.length);
        if (ga(a))
            a = String(a);
        else if (!(a instanceof I))
            if (F(this.path) === l) {
                var b = a;
                b && (b = b.replace(/^\/*\.info(\/|$)/, "/"));
                Ha("Firebase.child", b)
            } else
                Ha("Firebase.child", a);
        return new W(this.o, this.path.C(a))
    };
    W.prototype.child = W.prototype.C;
    W.prototype.parent = function() {
        A("Firebase.parent", 0, 0, arguments.length);
        var a = this.path.parent();
        return a === l ? l : new W(this.o, a)
    };
    W.prototype.parent = W.prototype.parent;
    W.prototype.toString = function() {
        A("Firebase.toString", 0, 0, arguments.length);
        var a;
        if (this.parent() === l)
            a = this.o.toString();
        else {
            a = this.parent().toString() + "/";
            var b = this.name();
            a += encodeURIComponent(String(b))
        }
        return a
    };
    W.prototype.toString = W.prototype.toString;
    W.prototype.set = function(a, b) {
        A("Firebase.set", 1, 2, arguments.length);
        E("Firebase.set", this.path);
        za("Firebase.set", a, o);
        C("Firebase.set", 2, b, k);
        return this.o.Xa(this.path, a, l, b)
    };
    W.prototype.set = W.prototype.set;
    W.prototype.update = function(a, b) {
        A("Firebase.update", 1, 2, arguments.length);
        E("Firebase.update", this.path);
        Da("Firebase.update", a);
        C("Firebase.update", 2, b, k);
        return this.o.update(this.path, a, b)
    };
    W.prototype.update = W.prototype.update;
    W.prototype.Xa = function(a, b, c) {
        A("Firebase.setWithPriority", 2, 3, arguments.length);
        E("Firebase.setWithPriority", this.path);
        za("Firebase.setWithPriority", a, o);
        Ea("Firebase.setWithPriority", 2, b, o);
        C("Firebase.setWithPriority", 3, c, k);
        (".length" === this.name() || ".keys" === this.name()) && g("Firebase.setWithPriority failed: " + this.name() + " is a read-only object.");
        return this.o.Xa(this.path, a, b, c)
    };
    W.prototype.setWithPriority = W.prototype.Xa;
    W.prototype.remove = function(a) {
        A("Firebase.remove", 0, 1, arguments.length);
        E("Firebase.remove", this.path);
        C("Firebase.remove", 1, a, k);
        this.set(l, a)
    };
    W.prototype.remove = W.prototype.remove;
    W.prototype.transaction = function(a, b) {
        function c() {
        }
        A("Firebase.transaction", 1, 2, arguments.length);
        E("Firebase.transaction", this.path);
        C("Firebase.transaction", 1, a, o);
        C("Firebase.transaction", 2, b, k);
        (".length" === this.name() || ".keys" === this.name()) && g("Firebase.transaction failed: " + this.name() + " is a read-only object.");
        var d = this.o, e = this.path;
        d.e("transaction on " + e);
        var f = new W(d, e);
        f.oc("value", c);
        var h = {path: e,update: a,A: b,Sc: Jb(),Yc: 0,dc: function() {
            f.Ib("value", c)
        }}, i = d.i.Aa, m = h.update(T(i,
            e).P());
        if (s(m)) {
            Aa("transaction failed: Data returned ", m);
            var n = T(d.i.K, e).k();
            U(i, e, Q(m, n));
            yd(d.Q, e, [e]);
            h.status = 1;
            e = J(d.ac, e);
            i = e.j() || [];
            i.push(h);
            M(e, i);
            Ld(d)
        } else
            h.dc(), h.A && (d = Jd(d, e), h.A(l, o, d))
    };
    W.prototype.transaction = W.prototype.transaction;
    W.prototype.xc = function(a, b) {
        A("Firebase.setPriority", 1, 2, arguments.length);
        E("Firebase.setPriority", this.path);
        Ea("Firebase.setPriority", 1, a, o);
        C("Firebase.setPriority", 2, b, k);
        this.o.xc(this.path, a, b)
    };
    W.prototype.setPriority = W.prototype.xc;
    W.prototype.push = function(a, b) {
        A("Firebase.push", 0, 2, arguments.length);
        E("Firebase.push", this.path);
        za("Firebase.push", a, k);
        C("Firebase.push", 2, b, k);
        var c = Pd(), c = this.C(c);
        "undefined" !== typeof a && a !== l && c.set(a, b);
        return c
    };
    W.prototype.push = W.prototype.push;
    W.prototype.da = function() {
        return new $(this.o, this.path, this.name())
    };
    W.prototype.onDisconnect = W.prototype.da;
    W.prototype.yd = function() {
        Vb("FirebaseRef.removeOnDisconnect() being deprecated. Please use FirebaseRef.onDisconnect().remove() instead.");
        this.da().remove();
        Id(this.o)
    };
    W.prototype.removeOnDisconnect = W.prototype.yd;
    W.prototype.Cd = function(a) {
        Vb("FirebaseRef.setOnDisconnect(value) being deprecated. Please use FirebaseRef.onDisconnect().set(value) instead.");
        this.da().set(a);
        Id(this.o)
    };
    W.prototype.setOnDisconnect = W.prototype.Cd;
    W.prototype.Za = function(a, b, c) {
        A("Firebase.auth", 1, 3, arguments.length);
        t(a) || g(Error(B("Firebase.auth", 1, o) + "must be a valid credential (a string)."));
        C("Firebase.auth", 2, b, k);
        C("Firebase.auth", 3, b, k);
        this.o.Za(a, b, c)
    };
    W.prototype.auth = W.prototype.Za;
    W.prototype.zb = function() {
        this.o.zb()
    };
    W.prototype.unauth = W.prototype.zb;
    function Qb(a, b) {
        z(!b || a === k || a === o, "Can't turn on custom loggers persistently.");
        a === k ? ("undefined" !== typeof console && ("function" === typeof console.log ? Nb = u(console.log, console) : "object" === typeof console.log && (Nb = function(a) {
            console.log(a)
        })), b && N.setItem("logging_enabled", "true")) : a ? Nb = a : (Nb = l, N.removeItem("logging_enabled"))
    }
    W.enableLogging = Qb;
    W.INTERNAL = Z;
    W.Context = Y;
})();
