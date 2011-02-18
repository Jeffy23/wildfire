/*
 * g.Raphael 0.4 - Charting library, based on Raphaël
 *
 * Copyright (c) 2009 Dmitry Baranovskiy (http://g.raphaeljs.com)
 * Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license.
 */
 (function() {
    Raphael.fn.g = Raphael.fn.g || {};
    Raphael.fn.g.markers = {
        disc: "disc",
        o: "disc",
        flower: "flower",
        f: "flower",
        diamond: "diamond",
        d: "diamond",
        square: "square",
        s: "square",
        triangle: "triangle",
        t: "triangle",
        star: "star",
        "*": "star",
        cross: "cross",
        x: "cross",
        plus: "plus",
        "+": "plus",
        arrow: "arrow",
        "->": "arrow"
    };
    Raphael.fn.g.shim = {
        stroke: "none",
        fill: "#000",
        "fill-opacity": 0
    };
    Raphael.fn.g.txtattr = {
        font: "12px Arial, sans-serif"
    };
    Raphael.fn.g.colors = [];
    var b = [0.6, 0.2, 0.05, 0.1333, 0.75, 0];
    for (var a = 0; a < 10; a++) {
        if (a < b.length) {
            Raphael.fn.g.colors.push("hsb(" + b[a] + ", .75, .75)");
        } else {
            Raphael.fn.g.colors.push("hsb(" + b[a - b.length] + ", 1, .5)");
        }
    }
    Raphael.fn.g.text = function(c, f, e) {
        return this.text(c, f, e).attr(this.g.txtattr);
    };
    Raphael.fn.g.labelise = function(c, f, e) {
        if (c) {
            return (c + "").replace(/(##+(?:\.#+)?)|(%%+(?:\.%+)?)/g,
            function(g, i, h) {
                if (i) {
                    return ( + f).toFixed(i.replace(/^#+\.?/g, "").length);
                }
                if (h) {
                    return (f * 100 / e).toFixed(h.replace(/^%+\.?/g, "").length) + "%";
                }
            });
        } else {
            return ( + f).toFixed(0);
        }
    };
    Raphael.fn.g.finger = function(j, i, e, k, f, g, h) {
        if ((f && !k) || (!f && !e)) {
            return h ? "": this.path();
        }
        g = {
            square: "square",
            sharp: "sharp",
            soft: "soft"
        } [g] || "round";
        var m;
        k = Math.round(k);
        e = Math.round(e);
        j = Math.round(j);
        i = Math.round(i);
        switch (g) {
        case "round":
            if (!f) {
                var c = Math.floor(k / 2);
                if (e < c) {
                    c = e;
                    m = ["M", j + 0.5, i + 0.5 - Math.floor(k / 2), "l", 0, 0, "a", c, Math.floor(k / 2), 0, 0, 1, 0, k, "l", 0, 0, "z"];
                } else {
                    m = ["M", j + 0.5, i + 0.5 - c, "l", e - c, 0, "a", c, c, 0, 1, 1, 0, k, "l", c - e, 0, "z"];
                }
            } else {
                var c = Math.floor(e / 2);
                if (k < c) {
                    c = k;
                    m = ["M", j - Math.floor(e / 2) + 0.001, i + 0.001, "l", 0, 0, "a", Math.floor(e / 2), c, 0, 0, 1, e, 0, "l", 0, 0, "z"];
                } else {
                    m = ["M", j - c + 0.001, i + 0.001, "l", 0, c - k, "a", c, c, 0, 1, 1, e, 0, "l", 0, k - c, "z"];
                }
            }
            break;
        case "sharp":
            if (!f) {
                var l = Math.floor(k / 2);
                m = ["M", j + 0.5, i + 0.5 + l, "l", 0, -k, Math.max(e - l, 0), 0, Math.min(l, e), l, -Math.min(l, e), l + (l * 2 < k), "z"];
            } else {
                var l = Math.floor(e / 2);
                m = ["M", j + l + 0.001, i + 0.001, "l", -e, 0, 0, -Math.max(k - l, 0), l, -Math.min(l, k), l, Math.min(l, k), l, "z"];
            }
            break;
        case "square":
            if (!f) {
                m = ["M", j, i + Math.floor(k / 2), "l", 0, -k, e, 0, 0, k, "z"];
            } else {
                m = ["M", j + 0.001 + Math.floor(e / 2), i - 0.001, "l", 1 - e, 0, 0, -k, e - 1, 0, "z"];
            }
            break;
        case "soft":
            var c;
            if (!f) {
                c = Math.min(e, Math.round(k / 5));
                m = ["M", j + 0.5, i + 0.5 - Math.floor(k / 2), "l", e - c, 0, "a", c, c, 0, 0, 1, c, c, "l", 0, k - c * 2, "a", c, c, 0, 0, 1, -c, c, "l", c - e, 0, "z"];
            } else {
                c = Math.min(Math.round(e / 5), k);
                m = ["M", j - Math.floor(e / 2), i, "l", 0, c - k, "a", c, c, 0, 0, 1, c, -c, "l", e - 2 * c, 0, "a", c, c, 0, 0, 1, c, c, "l", 0, k - c, "z"];
            }
        }
        if (h) {
            return m.join(",");
        } else {
            return this.path(m);
        }
    };
    Raphael.fn.g.disc = function(c, f, e) {
        return this.circle(c, f, e);
    };
    Raphael.fn.g.line = function(c, f, e) {
        return this.rect(c - e, f - e / 5, 2 * e, 2 * e / 5);
    };
    Raphael.fn.g.square = function(c, f, e) {
        e = e * 0.7;
        return this.rect(c - e, f - e, 2 * e, 2 * e);
    };
    Raphael.fn.g.triangle = function(c, f, e) {
        e *= 1.75;
        return this.path("M".concat(c, ",", f, "m0-", e * 0.58, "l", e * 0.5, ",", e * 0.87, "-", e, ",0z"));
    };
    Raphael.fn.g.diamond = function(c, f, e) {
        return this.path(["M", c, f - e, "l", e, e, -e, e, -e, -e, e, -e, "z"]);
    };
    Raphael.fn.g.flower = function(g, f, c, e) {
        c = c * 1.25;
        var l = c,
        k = l * 0.5;
        e = +e < 3 || !e ? 5: e;
        var m = ["M", g, f + k, "Q"],
        j;
        for (var h = 1; h < e * 2 + 1; h++) {
            j = h % 2 ? l: k;
            m = m.concat([ + (g + j * Math.sin(h * Math.PI / e)).toFixed(3), +(f + j * Math.cos(h * Math.PI / e)).toFixed(3)]);
        }
        m.push("z");
        return this.path(m.join(","));
    };
    Raphael.fn.g.star = function(c, k, j, e) {
        e = e || j * 0.5;
        var h = ["M", c, k + e, "L"],
        g;
        for (var f = 1; f < 10; f++) {
            g = f % 2 ? j: e;
            h = h.concat([(c + g * Math.sin(f * Math.PI * 0.2)).toFixed(3), (k + g * Math.cos(f * Math.PI * 0.2)).toFixed(3)]);
        }
        h.push("z");
        return this.path(h.join(","));
    };
    Raphael.fn.g.cross = function(c, f, e) {
        e = e / 2.5;
        return this.path("M".concat(c - e, ",", f, "l", [ - e, -e, e, -e, e, e, e, -e, e, e, -e, e, e, e, -e, e, -e, -e, -e, e, -e, -e, "z"]));
    };
    Raphael.fn.g.plus = function(c, f, e) {
        e = e / 2;
        return this.path("M".concat(c - e / 2, ",", f - e / 2, "l", [0, -e, e, 0, 0, e, e, 0, 0, e, -e, 0, 0, e, -e, 0, 0, -e, -e, 0, 0, -e, "z"]));
    };
    Raphael.fn.g.arrow = function(c, f, e) {
        return this.path("M".concat(c - e * 0.7, ",", f - e * 0.4, "l", [e * 0.6, 0, 0, -e * 0.4, e, e * 0.8, -e, e * 0.8, 0, -e * 0.4, -e * 0.6, 0], "z"));
    };
    Raphael.fn.g.tag = function(c, k, j, i, g) {
        i = i || 0;
        g = g == null ? 5: g;
        j = j == null ? "$9.99": j;
        var f = 0.5522 * g,
        e = this.set(),
        h = 3;
        e.push(this.path().attr({
            fill: "#000",
            stroke: "none"
        }));
        e.push(this.text(c, k, j).attr(this.g.txtattr).attr({
            fill: "#fff"
        }));
        e.update = function() {
            this.rotate(0, c, k);
            var m = this[1].getBBox();
            if (m.height >= g * 2) {
                this[0].attr({
                    path: ["M", c, k + g, "a", g, g, 0, 1, 1, 0, -g * 2, g, g, 0, 1, 1, 0, g * 2, "m", 0, -g * 2 - h, "a", g + h, g + h, 0, 1, 0, 0, (g + h) * 2, "L", c + g + h, k + m.height / 2 + h, "l", m.width + 2 * h, 0, 0, -m.height - 2 * h, -m.width - 2 * h, 0, "L", c, k - g - h].join(",")
                });
            } else {
                var l = Math.sqrt(Math.pow(g + h, 2) - Math.pow(m.height / 2 + h, 2));
                this[0].attr({
                    path: ["M", c, k + g, "c", -f, 0, -g, f - g, -g, -g, 0, -f, g - f, -g, g, -g, f, 0, g, g - f, g, g, 0, f, f - g, g, -g, g, "M", c + l, k - m.height / 2 - h, "a", g + h, g + h, 0, 1, 0, 0, m.height + 2 * h, "l", g + h - l + m.width + 2 * h, 0, 0, -m.height - 2 * h, "L", c + l, k - m.height / 2 - h].join(",")
                });
            }
            this[1].attr({
                x: c + g + h + m.width / 2,
                y: k
            });
            i = (360 - i) % 360;
            this.rotate(i, c, k);
            i > 90 && i < 270 && this[1].attr({
                x: c - g - h - m.width / 2,
                y: k,
                rotation: [180 + i, c, k]
            });
            return this;
        };
        e.update();
        return e;
    };
    Raphael.fn.g.popupit = function(j, i, k, e, q) {
        e = e == null ? 2: e;
        q = q || 5;
        j = Math.round(j) + 0.5;
        i = Math.round(i) + 0.5;
        var g = k.getBBox(),
        l = Math.round(g.width / 2),
        f = Math.round(g.height / 2),
        o = [0, l + q * 2, 0, -l - q * 2],
        m = [ - f * 2 - q * 3, -f - q, 0, -f - q],
        c = ["M", j - o[e], i - m[e], "l", -q, (e == 2) * -q, -Math.max(l - q, 0), 0, "a", q, q, 0, 0, 1, -q, -q, "l", 0, -Math.max(f - q, 0), (e == 3) * -q, -q, (e == 3) * q, -q, 0, -Math.max(f - q, 0), "a", q, q, 0, 0, 1, q, -q, "l", Math.max(l - q, 0), 0, q, !e * -q, q, !e * q, Math.max(l - q, 0), 0, "a", q, q, 0, 0, 1, q, q, "l", 0, Math.max(f - q, 0), (e == 1) * q, q, (e == 1) * -q, q, 0, Math.max(f - q, 0), "a", q, q, 0, 0, 1, -q, q, "l", -Math.max(l - q, 0), 0, "z"].join(","),
        n = [{
            x: j,
            y: i + q * 2 + f
        },
        {
            x: j - q * 2 - l,
            y: i
        },
        {
            x: j,
            y: i - q * 2 - f
        },
        {
            x: j + q * 2 + l,
            y: i
        }][e];
        k.translate(n.x - l - g.x, n.y - f - g.y);
        return this.path(c).attr({
            fill: "#000",
            stroke: "none"
        }).insertBefore(k.node ? k: k[0]);
    };
    Raphael.fn.g.popup = function(c, j, i, e, g) {
        e = e == null ? 2: e;
        g = g || 5;
        i = i || "$9.99";
        var f = this.set(),
        h = 3;
        f.push(this.path().attr({
            fill: "#000",
            stroke: "none"
        }));
        f.push(this.text(c, j, i).attr(this.g.txtattr).attr({
            fill: "#fff"
        }));
        f.update = function(m, l, n) {
            m = m || c;
            l = l || j;
            var q = this[1].getBBox(),
            s = q.width / 2,
            o = q.height / 2,
            v = [0, s + g * 2, 0, -s - g * 2],
            t = [ - o * 2 - g * 3, -o - g, 0, -o - g],
            k = ["M", m - v[e], l - t[e], "l", -g, (e == 2) * -g, -Math.max(s - g, 0), 0, "a", g, g, 0, 0, 1, -g, -g, "l", 0, -Math.max(o - g, 0), (e == 3) * -g, -g, (e == 3) * g, -g, 0, -Math.max(o - g, 0), "a", g, g, 0, 0, 1, g, -g, "l", Math.max(s - g, 0), 0, g, !e * -g, g, !e * g, Math.max(s - g, 0), 0, "a", g, g, 0, 0, 1, g, g, "l", 0, Math.max(o - g, 0), (e == 1) * g, g, (e == 1) * -g, g, 0, Math.max(o - g, 0), "a", g, g, 0, 0, 1, -g, g, "l", -Math.max(s - g, 0), 0, "z"].join(","),
            u = [{
                x: m,
                y: l + g * 2 + o
            },
            {
                x: m - g * 2 - s,
                y: l
            },
            {
                x: m,
                y: l - g * 2 - o
            },
            {
                x: m + g * 2 + s,
                y: l
            }][e];
            if (n) {
                this[0].animate({
                    path: k
                },
                500, ">");
                this[1].animate(u, 500, ">");
            } else {
                this[0].attr({
                    path: k
                });
                this[1].attr(u);
            }
            return this;
        };
        return f.update(c, j);
    };
    Raphael.fn.g.flag = function(c, i, h, g) {
        g = g || 0;
        h = h || "$9.99";
        var e = this.set(),
        f = 3;
        e.push(this.path().attr({
            fill: "#000",
            stroke: "none"
        }));
        e.push(this.text(c, i, h).attr(this.g.txtattr).attr({
            fill: "#fff"
        }));
        e.update = function(j, m) {
            this.rotate(0, j, m);
            var l = this[1].getBBox(),
            k = l.height / 2;
            this[0].attr({
                path: ["M", j, m, "l", k + f, -k - f, l.width + 2 * f, 0, 0, l.height + 2 * f, -l.width - 2 * f, 0, "z"].join(",")
            });
            this[1].attr({
                x: j + k + f + l.width / 2,
                y: m
            });
            g = 360 - g;
            this.rotate(g, j, m);
            g > 90 && g < 270 && this[1].attr({
                x: j - r - f - l.width / 2,
                y: m,
                rotation: [180 + g, j, m]
            });
            return this;
        };
        return e.update(c, i);
    };
    Raphael.fn.g.label = function(c, g, f) {
        var e = this.set();
        e.push(this.rect(c, g, 10, 10).attr({
            stroke: "none",
            fill: "#000"
        }));
        e.push(this.text(c, g, f).attr(this.g.txtattr).attr({
            fill: "#fff"
        }));
        e.update = function() {
            var i = this[1].getBBox(),
            h = Math.min(i.width + 10, i.height + 10) / 2;
            this[0].attr({
                x: i.x - h / 2,
                y: i.y - h / 2,
                width: i.width + h,
                height: i.height + h,
                r: h
            });
        };
        e.update();
        return e;
    };
    Raphael.fn.g.labelit = function(f) {
        var e = f.getBBox(),
        c = Math.min(20, e.width + 10, e.height + 10) / 2;
        return this.rect(e.x - c / 2, e.y - c / 2, e.width + c, e.height + c, c).attr({
            stroke: "none",
            fill: "#000"
        }).insertBefore(f[0]);
    };
    Raphael.fn.g.drop = function(c, i, h, f, g) {
        f = f || 30;
        g = g || 0;
        var e = this.set();
        e.push(this.path(["M", c, i, "l", f, 0, "A", f * 0.4, f * 0.4, 0, 1, 0, c + f * 0.7, i - f * 0.7, "z"]).attr({
            fill: "#000",
            stroke: "none",
            rotation: [22.5 - g, c, i]
        }));
        g = (g + 90) * Math.PI / 180;
        e.push(this.text(c + f * Math.sin(g), i + f * Math.cos(g), h).attr(this.g.txtattr).attr({
            "font-size": f * 12 / 30,
            fill: "#fff"
        }));
        e.drop = e[0];
        e.text = e[1];
        return e;
    };
    Raphael.fn.g.blob = function(e, k, j, i) {
        i = ( + i + 1 ? i: 45) + 90;
        var g = 12,
        c = Math.PI / 180,
        h = g * 12 / 12;
        var f = this.set();
        f.push(this.path().attr({
            fill: "#000",
            stroke: "none"
        }));
        f.push(this.text(e + g * Math.sin((i) * c), k + g * Math.cos((i) * c) - h / 2, j).attr(this.g.txtattr).attr({
            "font-size": h,
            fill: "#fff"
        }));
        f.update = function(q, p, v) {
            q = q || e;
            p = p || k;
            var y = this[1].getBBox(),
            B = Math.max(y.width + h, g * 25 / 12),
            x = Math.max(y.height + h, g * 25 / 12),
            m = q + g * Math.sin((i - 22.5) * c),
            z = p + g * Math.cos((i - 22.5) * c),
            o = q + g * Math.sin((i + 22.5) * c),
            A = p + g * Math.cos((i + 22.5) * c),
            D = (o - m) / 2,
            C = (A - z) / 2,
            n = B / 2,
            l = x / 2,
            u = -Math.sqrt(Math.abs(n * n * l * l - n * n * C * C - l * l * D * D) / (n * n * C * C + l * l * D * D)),
            t = u * n * C / l + (o + m) / 2,
            s = u * -l * D / n + (A + z) / 2;
            if (v) {
                this.animate({
                    x: t,
                    y: s,
                    path: ["M", e, k, "L", o, A, "A", n, l, 0, 1, 1, m, z, "z"].join(",")
                },
                500, ">");
            } else {
                this.attr({
                    x: t,
                    y: s,
                    path: ["M", e, k, "L", o, A, "A", n, l, 0, 1, 1, m, z, "z"].join(",")
                });
            }
            return this;
        };
        f.update(e, k);
        return f;
    };
    Raphael.fn.g.colorValue = function(g, f, e, c) {
        return "hsb(" + [Math.min((1 - g / f) * 0.4, 1), e || 0.75, c || 0.75] + ")";
    };
    Raphael.fn.g.snapEnds = function(l, m, k) {
        var h = l,
        n = m;
        if (h == n) {
            return {
                from: h,
                to: n,
                power: 0
            };
        }
        function o(f) {
            return Math.abs(f - 0.5) < 0.25 ? Math.floor(f) + 0.5: Math.round(f);
        }
        var j = (n - h) / k,
        c = Math.floor(j),
        g = c,
        e = 0;
        if (c) {
            while (g) {
                e--;
                g = Math.floor(j * Math.pow(10, e)) / Math.pow(10, e);
            }
            e++;
        } else {
            while (!c) {
                e = e || 1;
                c = Math.floor(j * Math.pow(10, e)) / Math.pow(10, e);
                e++;
            }
            e && e--;
        }
        var n = o(m * Math.pow(10, e)) / Math.pow(10, e);
        if (n < m) {
            n = o((m + 0.5) * Math.pow(10, e)) / Math.pow(10, e);
        }
        var h = o((l - (e > 0 ? 0: 0.5)) * Math.pow(10, e)) / Math.pow(10, e);
        return {
            from: h,
            to: n,
            power: e
        };
    };
    Raphael.fn.g.axis = function(s, q, m, E, h, H, k, J, l, c) {
        c = c == null ? 2: c;
        l = l || "t";
        H = H || 10;
        var D = l == "|" || l == " " ? ["M", s + 0.5, q, "l", 0, 0.001] : k == 1 || k == 3 ? ["M", s + 0.5, q, "l", 0, -m] : ["M", s, q + 0.5, "l", m, 0],
        v = this.g.snapEnds(E, h, H),
        I = v.from,
        z = v.to,
        G = v.power,
        F = 0,
        A = this.set();
        d = (z - I) / H;
        var p = I,
        o = G > 0 ? G: 0;
        u = m / H;
        if ( + k == 1 || +k == 3) {
            var e = q,
            w = (k - 1 ? 1: -1) * (c + 3 + !!(k - 1));
            while (e >= q - m) {
                l != "-" && l != " " && (D = D.concat(["M", s - (l == "+" || l == "|" ? c: !(k - 1) * c * 2), e + 0.5, "l", c * 2 + 1, 0]));
                A.push(this.text(s + w, e, (J && J[F++]) || (Math.round(p) == p ? p: +p.toFixed(o))).attr(this.g.txtattr).attr({
                    "text-anchor": k - 1 ? "start": "end"
                }));
                p += d;
                e -= u;
            }
            if (Math.round(e + u - (q - m))) {
                l != "-" && l != " " && (D = D.concat(["M", s - (l == "+" || l == "|" ? c: !(k - 1) * c * 2), q - m + 0.5, "l", c * 2 + 1, 0]));
                A.push(this.text(s + w, q - m, (J && J[F]) || (Math.round(p) == p ? p: +p.toFixed(o))).attr(this.g.txtattr).attr({
                    "text-anchor": k - 1 ? "start": "end"
                }));
            }
        } else {
            var g = s,
            p = I,
            o = G > 0 ? G: 0,
            w = (k ? -1: 1) * (c + 9 + !k),
            u = m / H,
            B = 0,
            C = 0;
            while (g <= s + m) {
                l != "-" && l != " " && (D = D.concat(["M", g + 0.5, q - (l == "+" ? c: !!k * c * 2), "l", 0, c * 2 + 1]));
                A.push(B = this.text(g, q + w, (J && J[F++]) || (Math.round(p) == p ? p: +p.toFixed(o))).attr(this.g.txtattr));
                var n = B.getBBox();
                if (C >= n.x - 5) {
                    A.pop(A.length - 1).remove();
                } else {
                    C = n.x + n.width;
                }
                p += d;
                g += u;
            }
            if (Math.round(g - u - s - m)) {
                l != "-" && l != " " && (D = D.concat(["M", s + m + 0.5, q - (l == "+" ? c: !!k * c * 2), "l", 0, c * 2 + 1]));
                A.push(this.text(s + m, q + w, (J && J[F]) || (Math.round(p) == p ? p: +p.toFixed(o))).attr(this.g.txtattr));
            }
        }
        var K = this.path(D);
        K.text = A;
        K.all = this.set([K, A]);
        K.remove = function() {
            this.text.remove();
            this.constructor.prototype.remove.call(this);
        };
        return K;
    };
    Raphael.el.lighter = function(e) {
        e = e || 2;
        var c = [this.attrs.fill, this.attrs.stroke];
        this.fs = this.fs || [c[0], c[1]];
        c[0] = Raphael.rgb2hsb(Raphael.getRGB(c[0]).hex);
        c[1] = Raphael.rgb2hsb(Raphael.getRGB(c[1]).hex);
        c[0].b = Math.min(c[0].b * e, 1);
        c[0].s = c[0].s / e;
        c[1].b = Math.min(c[1].b * e, 1);
        c[1].s = c[1].s / e;
        this.attr({
            fill: "hsb(" + [c[0].h, c[0].s, c[0].b] + ")",
            stroke: "hsb(" + [c[1].h, c[1].s, c[1].b] + ")"
        });
    };
    Raphael.el.darker = function(e) {
        e = e || 2;
        var c = [this.attrs.fill, this.attrs.stroke];
        this.fs = this.fs || [c[0], c[1]];
        c[0] = Raphael.rgb2hsb(Raphael.getRGB(c[0]).hex);
        c[1] = Raphael.rgb2hsb(Raphael.getRGB(c[1]).hex);
        c[0].s = Math.min(c[0].s * e, 1);
        c[0].b = c[0].b / e;
        c[1].s = Math.min(c[1].s * e, 1);
        c[1].b = c[1].b / e;
        this.attr({
            fill: "hsb(" + [c[0].h, c[0].s, c[0].b] + ")",
            stroke: "hsb(" + [c[1].h, c[1].s, c[1].b] + ")"
        });
    };
    Raphael.el.original = function() {
        if (this.fs) {
            this.attr({
                fill: this.fs[0],
                stroke: this.fs[1]
            });
            delete this.fs;
        }
    };
})();