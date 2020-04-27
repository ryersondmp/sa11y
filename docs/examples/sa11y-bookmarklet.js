/* Copyright (C) Federico Zivolo 2019 Distributed under the MIT License (license terms are a http://opensource.org/licenses/MIT). */
(function (e, t) {
    'object' == typeof exports && 'undefined' != typeof module ? module.exports = t() : 'function' == typeof define && define.amd ? define(t) : e.Popper = t()
})(this, function () {
    'use strict';

    function e(e) {
        return e && '[object Function]' === {}.toString.call(e)
    }

    function t(e, t) {
        if (1 !== e.nodeType) return [];
        var o = e.ownerDocument.defaultView,
            n = o.getComputedStyle(e, null);
        return t ? n[t] : n
    }

    function o(e) {
        return 'HTML' === e.nodeName ? e : e.parentNode || e.host
    }

    function n(e) {
        if (!e) return document.body;
        switch (e.nodeName) {
            case 'HTML':
            case 'BODY':
                return e.ownerDocument.body;
            case '#document':
                return e.body;
        }
        var i = t(e),
            r = i.overflow,
            p = i.overflowX,
            s = i.overflowY;
        return /(auto|scroll|overlay)/.test(r + s + p) ? e : n(o(e))
    }

    function r(e) {
        return 11 === e ? pe : 10 === e ? se : pe || se
    }

    function p(e) {
        if (!e) return document.documentElement;
        for (var o = r(10) ? document.body : null, n = e.offsetParent || null; n === o && e.nextElementSibling;) n = (e = e.nextElementSibling).offsetParent;
        var i = n && n.nodeName;
        return i && 'BODY' !== i && 'HTML' !== i ? -1 !== ['TH', 'TD', 'TABLE'].indexOf(n.nodeName) && 'static' === t(n, 'position') ? p(n) : n : e ? e.ownerDocument.documentElement : document.documentElement
    }

    function s(e) {
        var t = e.nodeName;
        return 'BODY' !== t && ('HTML' === t || p(e.firstElementChild) === e)
    }

    function d(e) {
        return null === e.parentNode ? e : d(e.parentNode)
    }

    function a(e, t) {
        if (!e || !e.nodeType || !t || !t.nodeType) return document.documentElement;
        var o = e.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_FOLLOWING,
            n = o ? e : t,
            i = o ? t : e,
            r = document.createRange();
        r.setStart(n, 0), r.setEnd(i, 0);
        var l = r.commonAncestorContainer;
        if (e !== l && t !== l || n.contains(i)) return s(l) ? l : p(l);
        var f = d(e);
        return f.host ? a(f.host, t) : a(e, d(t).host)
    }

    function l(e) {
        var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 'top',
            o = 'top' === t ? 'scrollTop' : 'scrollLeft',
            n = e.nodeName;
        if ('BODY' === n || 'HTML' === n) {
            var i = e.ownerDocument.documentElement,
                r = e.ownerDocument.scrollingElement || i;
            return r[o]
        }
        return e[o]
    }

    function f(e, t) {
        var o = 2 < arguments.length && void 0 !== arguments[2] && arguments[2],
            n = l(t, 'top'),
            i = l(t, 'left'),
            r = o ? -1 : 1;
        return e.top += n * r, e.bottom += n * r, e.left += i * r, e.right += i * r, e
    }

    function m(e, t) {
        var o = 'x' === t ? 'Left' : 'Top',
            n = 'Left' == o ? 'Right' : 'Bottom';
        return parseFloat(e['border' + o + 'Width'], 10) + parseFloat(e['border' + n + 'Width'], 10)
    }

    function h(e, t, o, n) {
        return ee(t['offset' + e], t['scroll' + e], o['client' + e], o['offset' + e], o['scroll' + e], r(10) ? parseInt(o['offset' + e]) + parseInt(n['margin' + ('Height' === e ? 'Top' : 'Left')]) + parseInt(n['margin' + ('Height' === e ? 'Bottom' : 'Right')]) : 0)
    }

    function c(e) {
        var t = e.body,
            o = e.documentElement,
            n = r(10) && getComputedStyle(o);
        return {
            height: h('Height', t, o, n),
            width: h('Width', t, o, n)
        }
    }

    function g(e) {
        return fe({}, e, {
            right: e.left + e.width,
            bottom: e.top + e.height
        })
    }

    function u(e) {
        var o = {};
        try {
            if (r(10)) {
                o = e.getBoundingClientRect();
                var n = l(e, 'top'),
                    i = l(e, 'left');
                o.top += n, o.left += i, o.bottom += n, o.right += i
            } else o = e.getBoundingClientRect()
        } catch (t) {}
        var p = {
                left: o.left,
                top: o.top,
                width: o.right - o.left,
                height: o.bottom - o.top
            },
            s = 'HTML' === e.nodeName ? c(e.ownerDocument) : {},
            d = s.width || e.clientWidth || p.right - p.left,
            a = s.height || e.clientHeight || p.bottom - p.top,
            f = e.offsetWidth - d,
            h = e.offsetHeight - a;
        if (f || h) {
            var u = t(e);
            f -= m(u, 'x'), h -= m(u, 'y'), p.width -= f, p.height -= h
        }
        return g(p)
    }

    function b(e, o) {
        var i = 2 < arguments.length && void 0 !== arguments[2] && arguments[2],
            p = r(10),
            s = 'HTML' === o.nodeName,
            d = u(e),
            a = u(o),
            l = n(e),
            m = t(o),
            h = parseFloat(m.borderTopWidth, 10),
            c = parseFloat(m.borderLeftWidth, 10);
        i && s && (a.top = ee(a.top, 0), a.left = ee(a.left, 0));
        var b = g({
            top: d.top - a.top - h,
            left: d.left - a.left - c,
            width: d.width,
            height: d.height
        });
        if (b.marginTop = 0, b.marginLeft = 0, !p && s) {
            var w = parseFloat(m.marginTop, 10),
                y = parseFloat(m.marginLeft, 10);
            b.top -= h - w, b.bottom -= h - w, b.left -= c - y, b.right -= c - y, b.marginTop = w, b.marginLeft = y
        }
        return (p && !i ? o.contains(l) : o === l && 'BODY' !== l.nodeName) && (b = f(b, o)), b
    }

    function w(e) {
        var t = 1 < arguments.length && void 0 !== arguments[1] && arguments[1],
            o = e.ownerDocument.documentElement,
            n = b(e, o),
            i = ee(o.clientWidth, window.innerWidth || 0),
            r = ee(o.clientHeight, window.innerHeight || 0),
            p = t ? 0 : l(o),
            s = t ? 0 : l(o, 'left'),
            d = {
                top: p - n.top + n.marginTop,
                left: s - n.left + n.marginLeft,
                width: i,
                height: r
            };
        return g(d)
    }

    function y(e) {
        var n = e.nodeName;
        if ('BODY' === n || 'HTML' === n) return !1;
        if ('fixed' === t(e, 'position')) return !0;
        var i = o(e);
        return !!i && y(i)
    }

    function E(e) {
        if (!e || !e.parentElement || r()) return document.documentElement;
        for (var o = e.parentElement; o && 'none' === t(o, 'transform');) o = o.parentElement;
        return o || document.documentElement
    }

    function v(e, t, i, r) {
        var p = 4 < arguments.length && void 0 !== arguments[4] && arguments[4],
            s = {
                top: 0,
                left: 0
            },
            d = p ? E(e) : a(e, t);
        if ('viewport' === r) s = w(d, p);
        else {
            var l;
            'scrollParent' === r ? (l = n(o(t)), 'BODY' === l.nodeName && (l = e.ownerDocument.documentElement)) : 'window' === r ? l = e.ownerDocument.documentElement : l = r;
            var f = b(l, d, p);
            if ('HTML' === l.nodeName && !y(d)) {
                var m = c(e.ownerDocument),
                    h = m.height,
                    g = m.width;
                s.top += f.top - f.marginTop, s.bottom = h + f.top, s.left += f.left - f.marginLeft, s.right = g + f.left
            } else s = f
        }
        i = i || 0;
        var u = 'number' == typeof i;
        return s.left += u ? i : i.left || 0, s.top += u ? i : i.top || 0, s.right -= u ? i : i.right || 0, s.bottom -= u ? i : i.bottom || 0, s
    }

    function x(e) {
        var t = e.width,
            o = e.height;
        return t * o
    }

    function O(e, t, o, n, i) {
        var r = 5 < arguments.length && void 0 !== arguments[5] ? arguments[5] : 0;
        if (-1 === e.indexOf('auto')) return e;
        var p = v(o, n, r, i),
            s = {
                top: {
                    width: p.width,
                    height: t.top - p.top
                },
                right: {
                    width: p.right - t.right,
                    height: p.height
                },
                bottom: {
                    width: p.width,
                    height: p.bottom - t.bottom
                },
                left: {
                    width: t.left - p.left,
                    height: p.height
                }
            },
            d = Object.keys(s).map(function (e) {
                return fe({
                    key: e
                }, s[e], {
                    area: x(s[e])
                })
            }).sort(function (e, t) {
                return t.area - e.area
            }),
            a = d.filter(function (e) {
                var t = e.width,
                    n = e.height;
                return t >= o.clientWidth && n >= o.clientHeight
            }),
            l = 0 < a.length ? a[0].key : d[0].key,
            f = e.split('-')[1];
        return l + (f ? '-' + f : '')
    }

    function L(e, t, o) {
        var n = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null,
            i = n ? E(t) : a(t, o);
        return b(o, i, n)
    }

    function S(e) {
        var t = e.ownerDocument.defaultView,
            o = t.getComputedStyle(e),
            n = parseFloat(o.marginTop || 0) + parseFloat(o.marginBottom || 0),
            i = parseFloat(o.marginLeft || 0) + parseFloat(o.marginRight || 0),
            r = {
                width: e.offsetWidth + i,
                height: e.offsetHeight + n
            };
        return r
    }

    function T(e) {
        var t = {
            left: 'right',
            right: 'left',
            bottom: 'top',
            top: 'bottom'
        };
        return e.replace(/left|right|bottom|top/g, function (e) {
            return t[e]
        })
    }

    function C(e, t, o) {
        o = o.split('-')[0];
        var n = S(e),
            i = {
                width: n.width,
                height: n.height
            },
            r = -1 !== ['right', 'left'].indexOf(o),
            p = r ? 'top' : 'left',
            s = r ? 'left' : 'top',
            d = r ? 'height' : 'width',
            a = r ? 'width' : 'height';
        return i[p] = t[p] + t[d] / 2 - n[d] / 2, i[s] = o === s ? t[s] - n[a] : t[T(s)], i
    }

    function D(e, t) {
        return Array.prototype.find ? e.find(t) : e.filter(t)[0]
    }

    function N(e, t, o) {
        if (Array.prototype.findIndex) return e.findIndex(function (e) {
            return e[t] === o
        });
        var n = D(e, function (e) {
            return e[t] === o
        });
        return e.indexOf(n)
    }

    function P(t, o, n) {
        var i = void 0 === n ? t : t.slice(0, N(t, 'name', n));
        return i.forEach(function (t) {
            t['function'] && console.warn('`modifier.function` is deprecated, use `modifier.fn`!');
            var n = t['function'] || t.fn;
            t.enabled && e(n) && (o.offsets.popper = g(o.offsets.popper), o.offsets.reference = g(o.offsets.reference), o = n(o, t))
        }), o
    }

    function k() {
        if (!this.state.isDestroyed) {
            var e = {
                instance: this,
                styles: {},
                arrowStyles: {},
                attributes: {},
                flipped: !1,
                offsets: {}
            };
            e.offsets.reference = L(this.state, this.popper, this.reference, this.options.positionFixed), e.placement = O(this.options.placement, e.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding), e.originalPlacement = e.placement, e.positionFixed = this.options.positionFixed, e.offsets.popper = C(this.popper, e.offsets.reference, e.placement), e.offsets.popper.position = this.options.positionFixed ? 'fixed' : 'absolute', e = P(this.modifiers, e), this.state.isCreated ? this.options.onUpdate(e) : (this.state.isCreated = !0, this.options.onCreate(e))
        }
    }

    function W(e, t) {
        return e.some(function (e) {
            var o = e.name,
                n = e.enabled;
            return n && o === t
        })
    }

    function B(e) {
        for (var t = [!1, 'ms', 'Webkit', 'Moz', 'O'], o = e.charAt(0).toUpperCase() + e.slice(1), n = 0; n < t.length; n++) {
            var i = t[n],
                r = i ? '' + i + o : e;
            if ('undefined' != typeof document.body.style[r]) return r
        }
        return null
    }

    function H() {
        return this.state.isDestroyed = !0, W(this.modifiers, 'applyStyle') && (this.popper.removeAttribute('x-placement'), this.popper.style.position = '', this.popper.style.top = '', this.popper.style.left = '', this.popper.style.right = '', this.popper.style.bottom = '', this.popper.style.willChange = '', this.popper.style[B('transform')] = ''), this.disableEventListeners(), this.options.removeOnDestroy && this.popper.parentNode.removeChild(this.popper), this
    }

    function A(e) {
        var t = e.ownerDocument;
        return t ? t.defaultView : window
    }

    function M(e, t, o, i) {
        var r = 'BODY' === e.nodeName,
            p = r ? e.ownerDocument.defaultView : e;
        p.addEventListener(t, o, {
            passive: !0
        }), r || M(n(p.parentNode), t, o, i), i.push(p)
    }

    function F(e, t, o, i) {
        o.updateBound = i, A(e).addEventListener('resize', o.updateBound, {
            passive: !0
        });
        var r = n(e);
        return M(r, 'scroll', o.updateBound, o.scrollParents), o.scrollElement = r, o.eventsEnabled = !0, o
    }

    function I() {
        this.state.eventsEnabled || (this.state = F(this.reference, this.options, this.state, this.scheduleUpdate))
    }

    function R(e, t) {
        return A(e).removeEventListener('resize', t.updateBound), t.scrollParents.forEach(function (e) {
            e.removeEventListener('scroll', t.updateBound)
        }), t.updateBound = null, t.scrollParents = [], t.scrollElement = null, t.eventsEnabled = !1, t
    }

    function U() {
        this.state.eventsEnabled && (cancelAnimationFrame(this.scheduleUpdate), this.state = R(this.reference, this.state))
    }

    function Y(e) {
        return '' !== e && !isNaN(parseFloat(e)) && isFinite(e)
    }

    function V(e, t) {
        Object.keys(t).forEach(function (o) {
            var n = ''; - 1 !== ['width', 'height', 'top', 'right', 'bottom', 'left'].indexOf(o) && Y(t[o]) && (n = 'px'), e.style[o] = t[o] + n
        })
    }

    function j(e, t) {
        Object.keys(t).forEach(function (o) {
            var n = t[o];
            !1 === n ? e.removeAttribute(o) : e.setAttribute(o, t[o])
        })
    }

    function q(e, t) {
        var o = e.offsets,
            n = o.popper,
            i = o.reference,
            r = $,
            p = function (e) {
                return e
            },
            s = r(i.width),
            d = r(n.width),
            a = -1 !== ['left', 'right'].indexOf(e.placement),
            l = -1 !== e.placement.indexOf('-'),
            f = t ? a || l || s % 2 == d % 2 ? r : Z : p,
            m = t ? r : p;
        return {
            left: f(1 == s % 2 && 1 == d % 2 && !l && t ? n.left - 1 : n.left),
            top: m(n.top),
            bottom: m(n.bottom),
            right: f(n.right)
        }
    }

    function K(e, t, o) {
        var n = D(e, function (e) {
                var o = e.name;
                return o === t
            }),
            i = !!n && e.some(function (e) {
                return e.name === o && e.enabled && e.order < n.order
            });
        if (!i) {
            var r = '`' + t + '`';
            console.warn('`' + o + '`' + ' modifier is required by ' + r + ' modifier in order to work, be sure to include it before ' + r + '!')
        }
        return i
    }

    function z(e) {
        return 'end' === e ? 'start' : 'start' === e ? 'end' : e
    }

    function G(e) {
        var t = 1 < arguments.length && void 0 !== arguments[1] && arguments[1],
            o = ce.indexOf(e),
            n = ce.slice(o + 1).concat(ce.slice(0, o));
        return t ? n.reverse() : n
    }

    function _(e, t, o, n) {
        var i = e.match(/((?:\-|\+)?\d*\.?\d*)(.*)/),
            r = +i[1],
            p = i[2];
        if (!r) return e;
        if (0 === p.indexOf('%')) {
            var s;
            switch (p) {
                case '%p':
                    s = o;
                    break;
                case '%':
                case '%r':
                default:
                    s = n;
            }
            var d = g(s);
            return d[t] / 100 * r
        }
        if ('vh' === p || 'vw' === p) {
            var a;
            return a = 'vh' === p ? ee(document.documentElement.clientHeight, window.innerHeight || 0) : ee(document.documentElement.clientWidth, window.innerWidth || 0), a / 100 * r
        }
        return r
    }

    function X(e, t, o, n) {
        var i = [0, 0],
            r = -1 !== ['right', 'left'].indexOf(n),
            p = e.split(/(\+|\-)/).map(function (e) {
                return e.trim()
            }),
            s = p.indexOf(D(p, function (e) {
                return -1 !== e.search(/,|\s/)
            }));
        p[s] && -1 === p[s].indexOf(',') && console.warn('Offsets separated by white space(s) are deprecated, use a comma (,) instead.');
        var d = /\s*,\s*|\s+/,
            a = -1 === s ? [p] : [p.slice(0, s).concat([p[s].split(d)[0]]), [p[s].split(d)[1]].concat(p.slice(s + 1))];
        return a = a.map(function (e, n) {
            var i = (1 === n ? !r : r) ? 'height' : 'width',
                p = !1;
            return e.reduce(function (e, t) {
                return '' === e[e.length - 1] && -1 !== ['+', '-'].indexOf(t) ? (e[e.length - 1] = t, p = !0, e) : p ? (e[e.length - 1] += t, p = !1, e) : e.concat(t)
            }, []).map(function (e) {
                return _(e, i, t, o)
            })
        }), a.forEach(function (e, t) {
            e.forEach(function (o, n) {
                Y(o) && (i[t] += o * ('-' === e[n - 1] ? -1 : 1))
            })
        }), i
    }

    function J(e, t) {
        var o, n = t.offset,
            i = e.placement,
            r = e.offsets,
            p = r.popper,
            s = r.reference,
            d = i.split('-')[0];
        return o = Y(+n) ? [+n, 0] : X(n, p, s, d), 'left' === d ? (p.top += o[0], p.left -= o[1]) : 'right' === d ? (p.top += o[0], p.left += o[1]) : 'top' === d ? (p.left += o[0], p.top -= o[1]) : 'bottom' === d && (p.left += o[0], p.top += o[1]), e.popper = p, e
    }
    for (var Q = Math.min, Z = Math.floor, $ = Math.round, ee = Math.max, te = 'undefined' != typeof window && 'undefined' != typeof document, oe = ['Edge', 'Trident', 'Firefox'], ne = 0, ie = 0; ie < oe.length; ie += 1)
        if (te && 0 <= navigator.userAgent.indexOf(oe[ie])) {
            ne = 1;
            break
        } var i = te && window.Promise,
        re = i ? function (e) {
            var t = !1;
            return function () {
                t || (t = !0, window.Promise.resolve().then(function () {
                    t = !1, e()
                }))
            }
        } : function (e) {
            var t = !1;
            return function () {
                t || (t = !0, setTimeout(function () {
                    t = !1, e()
                }, ne))
            }
        },
        pe = te && !!(window.MSInputMethodContext && document.documentMode),
        se = te && /MSIE 10/.test(navigator.userAgent),
        de = function (e, t) {
            if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function')
        },
        ae = function () {
            function e(e, t) {
                for (var o, n = 0; n < t.length; n++) o = t[n], o.enumerable = o.enumerable || !1, o.configurable = !0, 'value' in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
            }
            return function (t, o, n) {
                return o && e(t.prototype, o), n && e(t, n), t
            }
        }(),
        le = function (e, t, o) {
            return t in e ? Object.defineProperty(e, t, {
                value: o,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = o, e
        },
        fe = Object.assign || function (e) {
            for (var t, o = 1; o < arguments.length; o++)
                for (var n in t = arguments[o], t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
            return e
        },
        me = te && /Firefox/i.test(navigator.userAgent),
        he = ['auto-start', 'auto', 'auto-end', 'top-start', 'top', 'top-end', 'right-start', 'right', 'right-end', 'bottom-end', 'bottom', 'bottom-start', 'left-end', 'left', 'left-start'],
        ce = he.slice(3),
        ge = {
            FLIP: 'flip',
            CLOCKWISE: 'clockwise',
            COUNTERCLOCKWISE: 'counterclockwise'
        },
        ue = function () {
            function t(o, n) {
                var i = this,
                    r = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {};
                de(this, t), this.scheduleUpdate = function () {
                    return requestAnimationFrame(i.update)
                }, this.update = re(this.update.bind(this)), this.options = fe({}, t.Defaults, r), this.state = {
                    isDestroyed: !1,
                    isCreated: !1,
                    scrollParents: []
                }, this.reference = o && o.jquery ? o[0] : o, this.popper = n && n.jquery ? n[0] : n, this.options.modifiers = {}, Object.keys(fe({}, t.Defaults.modifiers, r.modifiers)).forEach(function (e) {
                    i.options.modifiers[e] = fe({}, t.Defaults.modifiers[e] || {}, r.modifiers ? r.modifiers[e] : {})
                }), this.modifiers = Object.keys(this.options.modifiers).map(function (e) {
                    return fe({
                        name: e
                    }, i.options.modifiers[e])
                }).sort(function (e, t) {
                    return e.order - t.order
                }), this.modifiers.forEach(function (t) {
                    t.enabled && e(t.onLoad) && t.onLoad(i.reference, i.popper, i.options, t, i.state)
                }), this.update();
                var p = this.options.eventsEnabled;
                p && this.enableEventListeners(), this.state.eventsEnabled = p
            }
            return ae(t, [{
                key: 'update',
                value: function () {
                    return k.call(this)
                }
            }, {
                key: 'destroy',
                value: function () {
                    return H.call(this)
                }
            }, {
                key: 'enableEventListeners',
                value: function () {
                    return I.call(this)
                }
            }, {
                key: 'disableEventListeners',
                value: function () {
                    return U.call(this)
                }
            }]), t
        }();
    return ue.Utils = ('undefined' == typeof window ? global : window).PopperUtils, ue.placements = he, ue.Defaults = {
        placement: 'bottom',
        positionFixed: !1,
        eventsEnabled: !0,
        removeOnDestroy: !1,
        onCreate: function () {},
        onUpdate: function () {},
        modifiers: {
            shift: {
                order: 100,
                enabled: !0,
                fn: function (e) {
                    var t = e.placement,
                        o = t.split('-')[0],
                        n = t.split('-')[1];
                    if (n) {
                        var i = e.offsets,
                            r = i.reference,
                            p = i.popper,
                            s = -1 !== ['bottom', 'top'].indexOf(o),
                            d = s ? 'left' : 'top',
                            a = s ? 'width' : 'height',
                            l = {
                                start: le({}, d, r[d]),
                                end: le({}, d, r[d] + r[a] - p[a])
                            };
                        e.offsets.popper = fe({}, p, l[n])
                    }
                    return e
                }
            },
            offset: {
                order: 200,
                enabled: !0,
                fn: J,
                offset: 0
            },
            preventOverflow: {
                order: 300,
                enabled: !0,
                fn: function (e, t) {
                    var o = t.boundariesElement || p(e.instance.popper);
                    e.instance.reference === o && (o = p(o));
                    var n = B('transform'),
                        i = e.instance.popper.style,
                        r = i.top,
                        s = i.left,
                        d = i[n];
                    i.top = '', i.left = '', i[n] = '';
                    var a = v(e.instance.popper, e.instance.reference, t.padding, o, e.positionFixed);
                    i.top = r, i.left = s, i[n] = d, t.boundaries = a;
                    var l = t.priority,
                        f = e.offsets.popper,
                        m = {
                            primary: function (e) {
                                var o = f[e];
                                return f[e] < a[e] && !t.escapeWithReference && (o = ee(f[e], a[e])), le({}, e, o)
                            },
                            secondary: function (e) {
                                var o = 'right' === e ? 'left' : 'top',
                                    n = f[o];
                                return f[e] > a[e] && !t.escapeWithReference && (n = Q(f[o], a[e] - ('right' === e ? f.width : f.height))), le({}, o, n)
                            }
                        };
                    return l.forEach(function (e) {
                        var t = -1 === ['left', 'top'].indexOf(e) ? 'secondary' : 'primary';
                        f = fe({}, f, m[t](e))
                    }), e.offsets.popper = f, e
                },
                priority: ['left', 'right', 'top', 'bottom'],
                padding: 5,
                boundariesElement: 'scrollParent'
            },
            keepTogether: {
                order: 400,
                enabled: !0,
                fn: function (e) {
                    var t = e.offsets,
                        o = t.popper,
                        n = t.reference,
                        i = e.placement.split('-')[0],
                        r = Z,
                        p = -1 !== ['top', 'bottom'].indexOf(i),
                        s = p ? 'right' : 'bottom',
                        d = p ? 'left' : 'top',
                        a = p ? 'width' : 'height';
                    return o[s] < r(n[d]) && (e.offsets.popper[d] = r(n[d]) - o[a]), o[d] > r(n[s]) && (e.offsets.popper[d] = r(n[s])), e
                }
            },
            arrow: {
                order: 500,
                enabled: !0,
                fn: function (e, o) {
                    var n;
                    if (!K(e.instance.modifiers, 'arrow', 'keepTogether')) return e;
                    var i = o.element;
                    if ('string' == typeof i) {
                        if (i = e.instance.popper.querySelector(i), !i) return e;
                    } else if (!e.instance.popper.contains(i)) return console.warn('WARNING: `arrow.element` must be child of its popper element!'), e;
                    var r = e.placement.split('-')[0],
                        p = e.offsets,
                        s = p.popper,
                        d = p.reference,
                        a = -1 !== ['left', 'right'].indexOf(r),
                        l = a ? 'height' : 'width',
                        f = a ? 'Top' : 'Left',
                        m = f.toLowerCase(),
                        h = a ? 'left' : 'top',
                        c = a ? 'bottom' : 'right',
                        u = S(i)[l];
                    d[c] - u < s[m] && (e.offsets.popper[m] -= s[m] - (d[c] - u)), d[m] + u > s[c] && (e.offsets.popper[m] += d[m] + u - s[c]), e.offsets.popper = g(e.offsets.popper);
                    var b = d[m] + d[l] / 2 - u / 2,
                        w = t(e.instance.popper),
                        y = parseFloat(w['margin' + f], 10),
                        E = parseFloat(w['border' + f + 'Width'], 10),
                        v = b - e.offsets.popper[m] - y - E;
                    return v = ee(Q(s[l] - u, v), 0), e.arrowElement = i, e.offsets.arrow = (n = {}, le(n, m, $(v)), le(n, h, ''), n), e
                },
                element: '[x-arrow]'
            },
            flip: {
                order: 600,
                enabled: !0,
                fn: function (e, t) {
                    if (W(e.instance.modifiers, 'inner')) return e;
                    if (e.flipped && e.placement === e.originalPlacement) return e;
                    var o = v(e.instance.popper, e.instance.reference, t.padding, t.boundariesElement, e.positionFixed),
                        n = e.placement.split('-')[0],
                        i = T(n),
                        r = e.placement.split('-')[1] || '',
                        p = [];
                    switch (t.behavior) {
                        case ge.FLIP:
                            p = [n, i];
                            break;
                        case ge.CLOCKWISE:
                            p = G(n);
                            break;
                        case ge.COUNTERCLOCKWISE:
                            p = G(n, !0);
                            break;
                        default:
                            p = t.behavior;
                    }
                    return p.forEach(function (s, d) {
                        if (n !== s || p.length === d + 1) return e;
                        n = e.placement.split('-')[0], i = T(n);
                        var a = e.offsets.popper,
                            l = e.offsets.reference,
                            f = Z,
                            m = 'left' === n && f(a.right) > f(l.left) || 'right' === n && f(a.left) < f(l.right) || 'top' === n && f(a.bottom) > f(l.top) || 'bottom' === n && f(a.top) < f(l.bottom),
                            h = f(a.left) < f(o.left),
                            c = f(a.right) > f(o.right),
                            g = f(a.top) < f(o.top),
                            u = f(a.bottom) > f(o.bottom),
                            b = 'left' === n && h || 'right' === n && c || 'top' === n && g || 'bottom' === n && u,
                            w = -1 !== ['top', 'bottom'].indexOf(n),
                            y = !!t.flipVariations && (w && 'start' === r && h || w && 'end' === r && c || !w && 'start' === r && g || !w && 'end' === r && u),
                            E = !!t.flipVariationsByContent && (w && 'start' === r && c || w && 'end' === r && h || !w && 'start' === r && u || !w && 'end' === r && g),
                            v = y || E;
                        (m || b || v) && (e.flipped = !0, (m || b) && (n = p[d + 1]), v && (r = z(r)), e.placement = n + (r ? '-' + r : ''), e.offsets.popper = fe({}, e.offsets.popper, C(e.instance.popper, e.offsets.reference, e.placement)), e = P(e.instance.modifiers, e, 'flip'))
                    }), e
                },
                behavior: 'flip',
                padding: 5,
                boundariesElement: 'viewport',
                flipVariations: !1,
                flipVariationsByContent: !1
            },
            inner: {
                order: 700,
                enabled: !1,
                fn: function (e) {
                    var t = e.placement,
                        o = t.split('-')[0],
                        n = e.offsets,
                        i = n.popper,
                        r = n.reference,
                        p = -1 !== ['left', 'right'].indexOf(o),
                        s = -1 === ['top', 'left'].indexOf(o);
                    return i[p ? 'left' : 'top'] = r[o] - (s ? i[p ? 'width' : 'height'] : 0), e.placement = T(t), e.offsets.popper = g(i), e
                }
            },
            hide: {
                order: 800,
                enabled: !0,
                fn: function (e) {
                    if (!K(e.instance.modifiers, 'hide', 'preventOverflow')) return e;
                    var t = e.offsets.reference,
                        o = D(e.instance.modifiers, function (e) {
                            return 'preventOverflow' === e.name
                        }).boundaries;
                    if (t.bottom < o.top || t.left > o.right || t.top > o.bottom || t.right < o.left) {
                        if (!0 === e.hide) return e;
                        e.hide = !0, e.attributes['x-out-of-boundaries'] = ''
                    } else {
                        if (!1 === e.hide) return e;
                        e.hide = !1, e.attributes['x-out-of-boundaries'] = !1
                    }
                    return e
                }
            },
            computeStyle: {
                order: 850,
                enabled: !0,
                fn: function (e, t) {
                    var o = t.x,
                        n = t.y,
                        i = e.offsets.popper,
                        r = D(e.instance.modifiers, function (e) {
                            return 'applyStyle' === e.name
                        }).gpuAcceleration;
                    void 0 !== r && console.warn('WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!');
                    var s, d, a = void 0 === r ? t.gpuAcceleration : r,
                        l = p(e.instance.popper),
                        f = u(l),
                        m = {
                            position: i.position
                        },
                        h = q(e, 2 > window.devicePixelRatio || !me),
                        c = 'bottom' === o ? 'top' : 'bottom',
                        g = 'right' === n ? 'left' : 'right',
                        b = B('transform');
                    if (d = 'bottom' == c ? 'HTML' === l.nodeName ? -l.clientHeight + h.bottom : -f.height + h.bottom : h.top, s = 'right' == g ? 'HTML' === l.nodeName ? -l.clientWidth + h.right : -f.width + h.right : h.left, a && b) m[b] = 'translate3d(' + s + 'px, ' + d + 'px, 0)', m[c] = 0, m[g] = 0, m.willChange = 'transform';
                    else {
                        var w = 'bottom' == c ? -1 : 1,
                            y = 'right' == g ? -1 : 1;
                        m[c] = d * w, m[g] = s * y, m.willChange = c + ', ' + g
                    }
                    var E = {
                        "x-placement": e.placement
                    };
                    return e.attributes = fe({}, E, e.attributes), e.styles = fe({}, m, e.styles), e.arrowStyles = fe({}, e.offsets.arrow, e.arrowStyles), e
                },
                gpuAcceleration: !0,
                x: 'bottom',
                y: 'right'
            },
            applyStyle: {
                order: 900,
                enabled: !0,
                fn: function (e) {
                    return V(e.instance.popper, e.styles), j(e.instance.popper, e.attributes), e.arrowElement && Object.keys(e.arrowStyles).length && V(e.arrowElement, e.arrowStyles), e
                },
                onLoad: function (e, t, o, n, i) {
                    var r = L(i, t, e, o.positionFixed),
                        p = O(o.placement, r, t, e, o.modifiers.flip.boundariesElement, o.modifiers.flip.padding);
                    return t.setAttribute('x-placement', p), V(t, {
                        position: o.positionFixed ? 'fixed' : 'absolute'
                    }), o
                },
                gpuAcceleration: void 0
            }
        }
    }, ue
});
! function (t, e) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = e(require("popper.js")) : "function" == typeof define && define.amd ? define(["popper.js"], e) : (t = t || self).tippy = e(t.Popper)
}(this, function (t) {
    "use strict";
    t = t && t.hasOwnProperty("default") ? t.default : t;

    function e() {
        return (e = Object.assign || function (t) {
            for (var e = 1; e < arguments.length; e++) {
                var a = arguments[e];
                for (var r in a) Object.prototype.hasOwnProperty.call(a, r) && (t[r] = a[r])
            }
            return t
        }).apply(this, arguments)
    }
    var a = "undefined" != typeof window && "undefined" != typeof document,
        r = a ? navigator.userAgent : "",
        n = /MSIE |Trident\//.test(r),
        i = /UCBrowser\//.test(r),
        o = a && /iPhone|iPad|iPod/.test(navigator.platform) && !window.MSStream,
        p = {
            a11y: !0,
            allowHTML: !0,
            animateFill: !0,
            animation: "shift-away",
            appendTo: function () {
                return document.body
            },
            aria: "describedby",
            arrow: !1,
            arrowType: "sharp",
            boundary: "scrollParent",
            content: "",
            delay: 0,
            distance: 10,
            duration: [325, 275],
            flip: !0,
            flipBehavior: "flip",
            flipOnUpdate: !1,
            followCursor: !1,
            hideOnClick: !0,
            ignoreAttributes: !1,
            inertia: !1,
            interactive: !1,
            interactiveBorder: 2,
            interactiveDebounce: 0,
            lazy: !0,
            maxWidth: 350,
            multiple: !1,
            offset: 0,
            onHidden: function () {},
            onHide: function () {},
            onMount: function () {},
            onShow: function () {},
            onShown: function () {},
            onTrigger: function () {},
            placement: "top",
            popperOptions: {},
            role: "tooltip",
            showOnInit: !1,
            size: "regular",
            sticky: !1,
            target: "",
            theme: "dark",
            touch: !0,
            touchHold: !1,
            trigger: "mouseenter focus",
            triggerTarget: null,
            updateDuration: 0,
            wait: null,
            zIndex: 9999
        },
        s = ["arrow", "arrowType", "boundary", "distance", "flip", "flipBehavior", "flipOnUpdate", "offset", "placement", "popperOptions"],
        c = a ? Element.prototype : {},
        l = c.matches || c.matchesSelector || c.webkitMatchesSelector || c.mozMatchesSelector || c.msMatchesSelector;

    function d(t) {
        return [].slice.call(t)
    }

    function f(t, e) {
        return m(t, function (t) {
            return l.call(t, e)
        })
    }

    function m(t, e) {
        for (; t;) {
            if (e(t)) return t;
            t = t.parentElement
        }
        return null
    }
    var u = {
            passive: !0
        },
        b = 4,
        y = "x-placement",
        v = "x-out-of-boundaries",
        h = "tippy-iOS",
        x = "tippy-active",
        g = "tippy-popper",
        w = "tippy-tooltip",
        k = "tippy-content",
        A = "tippy-backdrop",
        E = "tippy-arrow",
        C = "tippy-roundarrow",
        L = ".".concat(g),
        X = ".".concat(w),
        Y = ".".concat(k),
        T = ".".concat(A),
        I = ".".concat(E),
        S = ".".concat(C),
        O = !1;

    function z() {
        O || (O = !0, o && document.body.classList.add(h), window.performance && document.addEventListener("mousemove", H))
    }
    var M = 0;

    function H() {
        var t = performance.now();
        t - M < 20 && (O = !1, document.removeEventListener("mousemove", H), o || document.body.classList.remove(h)), M = t
    }

    function V() {
        var t = document.activeElement;
        t && t.blur && t._tippy && t.blur()
    }
    var _ = Object.keys(p);

    function N(t, e) {
        return {}.hasOwnProperty.call(t, e)
    }

    function P(t, e, a) {
        if (Array.isArray(t)) {
            var r = t[e];
            return null == r ? a : r
        }
        return t
    }

    function D(t, e) {
        return 0 === e ? t : function (r) {
            clearTimeout(a), a = setTimeout(function () {
                t(r)
            }, e)
        };
        var a
    }

    function q(t, e) {
        return t && t.modifiers && t.modifiers[e]
    }

    function B(t, e) {
        return t.indexOf(e) > -1
    }

    function F(t) {
        return t instanceof Element
    }

    function j(t) {
        return !(!t || !N(t, "isVirtual")) || F(t)
    }

    function U(t, e) {
        return "function" == typeof t ? t.apply(null, e) : t
    }

    function W(t, e) {
        t.filter(function (t) {
            return "flip" === t.name
        })[0].enabled = e
    }

    function R() {
        return document.createElement("div")
    }

    function J(t, e) {
        t.forEach(function (t) {
            t && (t.style.transitionDuration = "".concat(e, "ms"))
        })
    }

    function G(t, e) {
        t.forEach(function (t) {
            t && t.setAttribute("data-state", e)
        })
    }

    function K(t, a) {
        var r = e({}, a, {
            content: U(a.content, [t])
        }, a.ignoreAttributes ? {} : function (t) {
            return _.reduce(function (e, a) {
                var r = (t.getAttribute("data-tippy-".concat(a)) || "").trim();
                if (!r) return e;
                if ("content" === a) e[a] = r;
                else try {
                    e[a] = JSON.parse(r)
                } catch (t) {
                    e[a] = r
                }
                return e
            }, {})
        }(t));
        return (r.arrow || i) && (r.animateFill = !1), r
    }

    function Q(t, e) {
        Object.keys(t).forEach(function (t) {
            if (!N(e, t)) throw new Error("[tippy]: `".concat(t, "` is not a valid option"))
        })
    }

    function Z(t, e) {
        t.innerHTML = F(e) ? e.innerHTML : e
    }

    function $(t, e) {
        if (F(e.content)) Z(t, ""), t.appendChild(e.content);
        else if ("function" != typeof e.content) {
            t[e.allowHTML ? "innerHTML" : "textContent"] = e.content
        }
    }

    function tt(t) {
        return {
            tooltip: t.querySelector(X),
            backdrop: t.querySelector(T),
            content: t.querySelector(Y),
            arrow: t.querySelector(I) || t.querySelector(S)
        }
    }

    function et(t) {
        t.setAttribute("data-inertia", "")
    }

    function at(t) {
        var e = R();
        return "round" === t ? (e.className = C, Z(e, '<svg viewBox="0 0 18 7" xmlns="http://www.w3.org/2000/svg"><path d="M0 7s2.021-.015 5.253-4.218C6.584 1.051 7.797.007 9 0c1.203-.007 2.416 1.035 3.761 2.782C16.012 7.005 18 7 18 7H0z"/></svg>')) : e.className = E, e
    }

    function rt() {
        var t = R();
        return t.className = A, t.setAttribute("data-state", "hidden"), t
    }

    function nt(t, e) {
        t.setAttribute("tabindex", "-1"), e.setAttribute("data-interactive", "")
    }

    function it(t, e, a) {
        var r = i && void 0 !== document.body.style.webkitTransition ? "webkitTransitionEnd" : "transitionend";
        t[e + "EventListener"](r, a)
    }

    function ot(t) {
        var e = t.getAttribute(y);
        return e ? e.split("-")[0] : ""
    }

    function pt(t, e, a) {
        a.split(" ").forEach(function (a) {
            t.classList[e](a + "-theme")
        })
    }

    function st(t, e) {
        var a = R();
        a.className = g, a.id = "tippy-".concat(t), a.style.zIndex = "" + e.zIndex, a.style.position = "absolute", a.style.top = "0", a.style.left = "0", e.role && a.setAttribute("role", e.role);
        var r = R();
        r.className = w, r.style.maxWidth = e.maxWidth + ("number" == typeof e.maxWidth ? "px" : ""), r.setAttribute("data-size", e.size), r.setAttribute("data-animation", e.animation), r.setAttribute("data-state", "hidden"), pt(r, "add", e.theme);
        var n = R();
        return n.className = k, n.setAttribute("data-state", "hidden"), e.interactive && nt(a, r), e.arrow && r.appendChild(at(e.arrowType)), e.animateFill && (r.appendChild(rt()), r.setAttribute("data-animatefill", "")), e.inertia && et(r), $(n, e), r.appendChild(n), a.appendChild(r), a
    }

    function ct(t, e, a) {
        var r = tt(t),
            n = r.tooltip,
            i = r.content,
            o = r.backdrop,
            p = r.arrow;
        t.style.zIndex = "" + a.zIndex, n.setAttribute("data-size", a.size), n.setAttribute("data-animation", a.animation), n.style.maxWidth = a.maxWidth + ("number" == typeof a.maxWidth ? "px" : ""), a.role ? t.setAttribute("role", a.role) : t.removeAttribute("role"), e.content !== a.content && $(i, a), !e.animateFill && a.animateFill ? (n.appendChild(rt()), n.setAttribute("data-animatefill", "")) : e.animateFill && !a.animateFill && (n.removeChild(o), n.removeAttribute("data-animatefill")), !e.arrow && a.arrow ? n.appendChild(at(a.arrowType)) : e.arrow && !a.arrow && n.removeChild(p), e.arrow && a.arrow && e.arrowType !== a.arrowType && n.replaceChild(at(a.arrowType), p), !e.interactive && a.interactive ? nt(t, n) : e.interactive && !a.interactive && function (t, e) {
            t.removeAttribute("tabindex"), e.removeAttribute("data-interactive")
        }(t, n), !e.inertia && a.inertia ? et(n) : e.inertia && !a.inertia && function (t) {
            t.removeAttribute("data-inertia")
        }(n), e.theme !== a.theme && (pt(n, "remove", e.theme), pt(n, "add", a.theme))
    }
    var lt = 1,
        dt = [];

    function ft(a, r) {
        var i, o, c, h, g, w = K(a, r);
        if (!w.multiple && a._tippy) return null;
        var k, A, E, C, X, Y = !1,
            T = !1,
            I = !1,
            S = !1,
            z = [],
            M = D(ht, w.interactiveDebounce),
            H = lt++,
            V = st(H, w),
            _ = tt(V),
            j = {
                id: H,
                reference: a,
                popper: V,
                popperChildren: _,
                popperInstance: null,
                props: w,
                state: {
                    isEnabled: !0,
                    isVisible: !1,
                    isDestroyed: !1,
                    isMounted: !1,
                    isShown: !1
                },
                clearDelayTimeouts: Tt,
                set: It,
                setContent: function (t) {
                    It({
                        content: t
                    })
                },
                show: St,
                hide: Ot,
                enable: function () {
                    j.state.isEnabled = !0
                },
                disable: function () {
                    j.state.isEnabled = !1
                },
                destroy: function (t) {
                    if (j.state.isDestroyed) return;
                    T = !0, j.state.isMounted && Ot(0);
                    bt(), delete a._tippy;
                    var e = j.props.target;
                    e && t && F(a) && d(a.querySelectorAll(e)).forEach(function (t) {
                        t._tippy && t._tippy.destroy()
                    });
                    j.popperInstance && j.popperInstance.destroy();
                    T = !1, j.state.isDestroyed = !0
                }
            };
        return a._tippy = j, V._tippy = j, ut(), w.lazy || Ct(), w.showOnInit && Lt(), !w.a11y || w.target || (!F(X = $()) || l.call(X, "a[href],area[href],button,details,input,textarea,select,iframe,[tabindex]") && !X.hasAttribute("disabled")) || $().setAttribute("tabindex", "0"), V.addEventListener("mouseenter", function (t) {
            j.props.interactive && j.state.isVisible && "mouseenter" === i && Lt(t, !0)
        }), V.addEventListener("mouseleave", function () {
            j.props.interactive && "mouseenter" === i && document.addEventListener("mousemove", M)
        }), j;

        function R() {
            document.removeEventListener("mousemove", yt)
        }

        function Z() {
            document.body.removeEventListener("mouseleave", Xt), document.removeEventListener("mousemove", M), dt = dt.filter(function (t) {
                return t !== M
            })
        }

        function $() {
            return j.props.triggerTarget || a
        }

        function et() {
            document.addEventListener("click", Yt, !0)
        }

        function at() {
            document.removeEventListener("click", Yt, !0)
        }

        function rt() {
            return [j.popperChildren.tooltip, j.popperChildren.backdrop, j.popperChildren.content]
        }

        function nt() {
            var t = j.props.followCursor;
            return t && "focus" !== i || O && "initial" === t
        }

        function pt(t, e) {
            var a = j.popperChildren.tooltip;

            function r(t) {
                t.target === a && (it(a, "remove", r), e())
            }
            if (0 === t) return e();
            it(a, "remove", E), it(a, "add", r), E = r
        }

        function mt(t, e) {
            var a = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
            $().addEventListener(t, e, a), z.push({
                eventType: t,
                handler: e,
                options: a
            })
        }

        function ut() {
            j.props.touchHold && !j.props.target && (mt("touchstart", vt, u), mt("touchend", xt, u)), j.props.trigger.trim().split(" ").forEach(function (t) {
                if ("manual" !== t)
                    if (j.props.target) switch (t) {
                        case "mouseenter":
                            mt("mouseover", wt), mt("mouseout", kt);
                            break;
                        case "focus":
                            mt("focusin", wt), mt("focusout", kt);
                            break;
                        case "click":
                            mt(t, wt)
                    } else switch (mt(t, vt), t) {
                        case "mouseenter":
                            mt("mouseleave", xt);
                            break;
                        case "focus":
                            mt(n ? "focusout" : "blur", gt)
                    }
            })
        }

        function bt() {
            z.forEach(function (t) {
                var e = t.eventType,
                    a = t.handler,
                    r = t.options;
                $().removeEventListener(e, a, r)
            }), z = []
        }

        function yt(t) {
            var r = o = t,
                n = r.clientX,
                i = r.clientY;
            if (C) {
                var p = m(t.target, function (t) {
                        return t === a
                    }),
                    s = a.getBoundingClientRect(),
                    c = j.props.followCursor,
                    l = "horizontal" === c,
                    d = "vertical" === c,
                    f = B(["top", "bottom"], ot(V)),
                    u = V.getAttribute(y),
                    b = !!u && !!u.split("-")[1],
                    v = f ? V.offsetWidth : V.offsetHeight,
                    h = v / 2,
                    x = f ? 0 : b ? v : h,
                    g = f ? b ? v : h : 0;
                !p && j.props.interactive || (j.popperInstance.reference = e({}, j.popperInstance.reference, {
                    referenceNode: a,
                    clientWidth: 0,
                    clientHeight: 0,
                    getBoundingClientRect: function () {
                        return {
                            width: f ? v : 0,
                            height: f ? 0 : v,
                            top: (l ? s.top : i) - x,
                            bottom: (l ? s.bottom : i) + x,
                            left: (d ? s.left : n) - g,
                            right: (d ? s.right : n) + g
                        }
                    }
                }), j.popperInstance.update()), "initial" === c && j.state.isVisible && R()
            }
        }

        function vt(t) {
            j.state.isEnabled && !At(t) && (j.state.isVisible || (i = t.type, t instanceof MouseEvent && (o = t, dt.forEach(function (e) {
                return e(t)
            }))), "click" === t.type && !1 !== j.props.hideOnClick && j.state.isVisible ? Xt() : Lt(t))
        }

        function ht(t) {
            var e = f(t.target, L) === V,
                r = m(t.target, function (t) {
                    return t === a
                });
            e || r || function (t, e, a, r) {
                if (!t) return !0;
                var n = a.clientX,
                    i = a.clientY,
                    o = r.interactiveBorder,
                    p = r.distance,
                    s = e.top - i > ("top" === t ? o + p : o),
                    c = i - e.bottom > ("bottom" === t ? o + p : o),
                    l = e.left - n > ("left" === t ? o + p : o),
                    d = n - e.right > ("right" === t ? o + p : o);
                return s || c || l || d
            }(ot(V), V.getBoundingClientRect(), t, j.props) && (Z(), Xt())
        }

        function xt(t) {
            if (!At(t)) return j.props.interactive ? (document.body.addEventListener("mouseleave", Xt), document.addEventListener("mousemove", M), void dt.push(M)) : void Xt()
        }

        function gt(t) {
            t.target === $() && (j.props.interactive && t.relatedTarget && V.contains(t.relatedTarget) || Xt())
        }

        function wt(t) {
            f(t.target, j.props.target) && Lt(t)
        }

        function kt(t) {
            f(t.target, j.props.target) && Xt()
        }

        function At(t) {
            var e = "ontouchstart" in window,
                a = B(t.type, "touch"),
                r = j.props.touchHold;
            return e && O && r && !a || O && !r && a
        }

        function Et() {
            !S && A && (S = !0, function (t) {
                t.offsetHeight
            }(V), A())
        }

        function Ct() {
            var r = j.props.popperOptions,
                n = j.popperChildren,
                i = n.tooltip,
                o = n.arrow,
                p = q(r, "preventOverflow");

            function s(t) {
                j.props.flip && !j.props.flipOnUpdate && (t.flipped && (j.popperInstance.options.placement = t.placement), W(j.popperInstance.modifiers, !1)), i.setAttribute(y, t.placement), !1 !== t.attributes[v] ? i.setAttribute(v, "") : i.removeAttribute(v), k && k !== t.placement && I && (i.style.transition = "none", requestAnimationFrame(function () {
                    i.style.transition = ""
                })), k = t.placement, I = j.state.isVisible;
                var a = ot(V),
                    r = i.style;
                r.top = r.bottom = r.left = r.right = "", r[a] = -(j.props.distance - 10) + "px";
                var n = p && void 0 !== p.padding ? p.padding : b,
                    o = "number" == typeof n,
                    s = e({
                        top: o ? n : n.top,
                        bottom: o ? n : n.bottom,
                        left: o ? n : n.left,
                        right: o ? n : n.right
                    }, !o && n);
                s[a] = o ? n + j.props.distance : (n[a] || 0) + j.props.distance, j.popperInstance.modifiers.filter(function (t) {
                    return "preventOverflow" === t.name
                })[0].padding = s, C = s
            }
            var c = e({
                eventsEnabled: !1,
                placement: j.props.placement
            }, r, {
                modifiers: e({}, r ? r.modifiers : {}, {
                    preventOverflow: e({
                        boundariesElement: j.props.boundary,
                        padding: b
                    }, p),
                    arrow: e({
                        element: o,
                        enabled: !!o
                    }, q(r, "arrow")),
                    flip: e({
                        enabled: j.props.flip,
                        padding: j.props.distance + b,
                        behavior: j.props.flipBehavior
                    }, q(r, "flip")),
                    offset: e({
                        offset: j.props.offset
                    }, q(r, "offset"))
                }),
                onCreate: function (t) {
                    s(t), Et(), r && r.onCreate && r.onCreate(t)
                },
                onUpdate: function (t) {
                    s(t), Et(), r && r.onUpdate && r.onUpdate(t)
                }
            });
            j.popperInstance = new t(a, V, c)
        }

        function Lt(t, a) {
            if (Tt(), !j.state.isVisible) {
                if (j.props.target) return function (t) {
                    if (t) {
                        var a = f(t.target, j.props.target);
                        a && !a._tippy && ft(a, e({}, j.props, {
                            content: U(r.content, [a]),
                            appendTo: r.appendTo,
                            target: "",
                            showOnInit: !0
                        }))
                    }
                }(t);
                if (Y = !0, t && !a && j.props.onTrigger(j, t), j.props.wait) return j.props.wait(j, t);
                nt() && !j.state.isMounted && (j.popperInstance || Ct(), document.addEventListener("mousemove", yt)), et();
                var n = P(j.props.delay, 0, p.delay);
                n ? c = setTimeout(function () {
                    St()
                }, n) : St()
            }
        }

        function Xt() {
            if (Tt(), !j.state.isVisible) return R(), void at();
            Y = !1;
            var t = P(j.props.delay, 1, p.delay);
            t ? h = setTimeout(function () {
                j.state.isVisible && Ot()
            }, t) : g = requestAnimationFrame(function () {
                Ot()
            })
        }

        function Yt(t) {
            if (!j.props.interactive || !V.contains(t.target)) {
                if ($().contains(t.target)) {
                    if (O) return;
                    if (j.state.isVisible && B(j.props.trigger, "click")) return
                }!0 === j.props.hideOnClick && (Tt(), Ot())
            }
        }

        function Tt() {
            clearTimeout(c), clearTimeout(h), cancelAnimationFrame(g)
        }

        function It(t) {
            Q(t = t || {}, p), bt();
            var r = j.props,
                n = K(a, e({}, j.props, {}, t, {
                    ignoreAttributes: !0
                }));
            n.ignoreAttributes = N(t, "ignoreAttributes") ? t.ignoreAttributes || !1 : r.ignoreAttributes, j.props = n, ut(), Z(), M = D(ht, n.interactiveDebounce), ct(V, r, n), j.popperChildren = tt(V), j.popperInstance && (s.some(function (e) {
                return N(t, e) && t[e] !== r[e]
            }) ? (j.popperInstance.destroy(), Ct(), j.state.isVisible && j.popperInstance.enableEventListeners(), j.props.followCursor && o && yt(o)) : j.popperInstance.update())
        }

        function St() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : P(j.props.duration, 0, p.duration[1]);
            if (!j.state.isDestroyed && j.state.isEnabled && (!O || j.props.touch) && !$().hasAttribute("disabled") && !1 !== j.props.onShow(j)) {
                et(), V.style.visibility = "visible", j.state.isVisible = !0, j.props.interactive && $().classList.add(x);
                var e = rt();
                J(e.concat(V), 0), A = function () {
                        if (j.state.isVisible) {
                            var r = nt();
                            r && o ? yt(o) : r || j.popperInstance.update(), j.popperChildren.backdrop && (j.popperChildren.content.style.transitionDelay = Math.round(t / 12) + "ms"), j.props.sticky && function () {
                                    J([V], n ? 0 : j.props.updateDuration);
                                    var t = a.getBoundingClientRect();
                                    ! function e() {
                                        var r = a.getBoundingClientRect();
                                        t.top === r.top && t.right === r.right && t.bottom === r.bottom && t.left === r.left || j.popperInstance.scheduleUpdate(), t = r, j.state.isMounted && requestAnimationFrame(e)
                                    }()
                                }(), J([V], j.props.updateDuration), J(e, t), G(e, "visible"),
                                function (t, e) {
                                    pt(t, e)
                                }(t, function () {
                                    j.props.aria && $().setAttribute("aria-".concat(j.props.aria), V.id), j.props.onShown(j), j.state.isShown = !0
                                })
                        }
                    },
                    function () {
                        S = !1;
                        var t = nt();
                        j.popperInstance ? (W(j.popperInstance.modifiers, j.props.flip), t || (j.popperInstance.reference = a, j.popperInstance.enableEventListeners()), j.popperInstance.scheduleUpdate()) : (Ct(), t || j.popperInstance.enableEventListeners());
                        var e = j.props.appendTo,
                            r = "parent" === e ? a.parentNode : U(e, [a]);
                        r.contains(V) || (r.appendChild(V), j.props.onMount(j), j.state.isMounted = !0)
                    }()
            }
        }

        function Ot() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : P(j.props.duration, 1, p.duration[1]);
            if (!j.state.isDestroyed && (j.state.isEnabled || T) && (!1 !== j.props.onHide(j) || T)) {
                at(), V.style.visibility = "hidden", j.state.isVisible = !1, j.state.isShown = !1, I = !1, j.props.interactive && $().classList.remove(x);
                var e = rt();
                J(e, t), G(e, "hidden"),
                    function (t, e) {
                        pt(t, function () {
                            !j.state.isVisible && V.parentNode && V.parentNode.contains(V) && e()
                        })
                    }(t, function () {
                        Y || R(), j.props.aria && $().removeAttribute("aria-".concat(j.props.aria)), j.popperInstance.disableEventListeners(), j.popperInstance.options.placement = j.props.placement, V.parentNode.removeChild(V), j.props.onHidden(j), j.state.isMounted = !1
                    })
            }
        }
    }
    var mt = !1;

    function ut(t, a) {
        Q(a || {}, p), mt || (document.addEventListener("touchstart", z, u), window.addEventListener("blur", V), mt = !0);
        var r, n = e({}, p, {}, a);
        r = t, "[object Object]" !== {}.toString.call(r) || r.addEventListener || function (t) {
            var e = {
                isVirtual: !0,
                attributes: t.attributes || {},
                contains: function () {},
                setAttribute: function (e, a) {
                    t.attributes[e] = a
                },
                getAttribute: function (e) {
                    return t.attributes[e]
                },
                removeAttribute: function (e) {
                    delete t.attributes[e]
                },
                hasAttribute: function (e) {
                    return e in t.attributes
                },
                addEventListener: function () {},
                removeEventListener: function () {},
                classList: {
                    classNames: {},
                    add: function (e) {
                        t.classList.classNames[e] = !0
                    },
                    remove: function (e) {
                        delete t.classList.classNames[e]
                    },
                    contains: function (e) {
                        return e in t.classList.classNames
                    }
                }
            };
            for (var a in e) t[a] = e[a]
        }(t);
        var i = function (t) {
            if (j(t)) return [t];
            if (t instanceof NodeList) return d(t);
            if (Array.isArray(t)) return t;
            try {
                return d(document.querySelectorAll(t))
            } catch (t) {
                return []
            }
        }(t).reduce(function (t, e) {
            var a = e && ft(e, n);
            return a && t.push(a), t
        }, []);
        return j(t) ? i[0] : i
    }
    return ut.version = "4.3.5", ut.defaults = p, ut.setDefaults = function (t) {
            Object.keys(t).forEach(function (e) {
                p[e] = t[e]
            })
        }, ut.hideAll = function () {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                e = t.exclude,
                a = t.duration;
            d(document.querySelectorAll(L)).forEach(function (t) {
                var r, n = t._tippy;
                if (n) {
                    var i = !1;
                    e && (i = (r = e)._tippy && !l.call(r, L) ? n.reference === e : t === e.popper), i || n.hide(a)
                }
            })
        }, ut.group = function (t) {
            var a = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                r = a.delay,
                n = void 0 === r ? t[0].props.delay : r,
                i = a.duration,
                o = void 0 === i ? 0 : i,
                p = !1;

            function s(t) {
                p = t, f()
            }

            function c(e) {
                e._originalProps.onShow(e), t.forEach(function (t) {
                    t.set({
                        duration: o
                    }), t.state.isVisible && t.hide()
                }), s(!0)
            }

            function l(t) {
                t._originalProps.onHide(t), s(!1)
            }

            function d(t) {
                t._originalProps.onShown(t), t.set({
                    duration: t._originalProps.duration
                })
            }

            function f() {
                t.forEach(function (t) {
                    t.set({
                        onShow: c,
                        onShown: d,
                        onHide: l,
                        delay: p ? [0, Array.isArray(n) ? n[1] : n] : n,
                        duration: p ? o : t._originalProps.duration
                    })
                })
            }
            t.forEach(function (t) {
                t._originalProps ? t.set(t._originalProps) : t._originalProps = e({}, t.props)
            }), f()
        }, a && setTimeout(function () {
            d(document.querySelectorAll("[data-tippy]")).forEach(function (t) {
                var e = t.getAttribute("data-tippy");
                e && ut(t, {
                    content: e
                })
            })
        }),
        function (t) {
            if (a) {
                var e = document.createElement("style");
                e.type = "text/css", e.textContent = t, e.setAttribute("data-tippy-stylesheet", "");
                var r = document.head,
                    n = r.querySelector("style,link");
                n ? r.insertBefore(e, n) : r.appendChild(e)
            }
        }('.tippy-iOS{cursor:pointer!important;-webkit-tap-highlight-color:transparent}.tippy-popper{transition-timing-function:cubic-bezier(.165,.84,.44,1);max-width:calc(100% - 8px);pointer-events:none;outline:0}.tippy-popper[x-placement^=top] .tippy-backdrop{border-radius:40% 40% 0 0}.tippy-popper[x-placement^=top] .tippy-roundarrow{bottom:-7px;bottom:-6.5px;-webkit-transform-origin:50% 0;transform-origin:50% 0;margin:0 3px}.tippy-popper[x-placement^=top] .tippy-roundarrow svg{position:absolute;left:0;-webkit-transform:rotate(180deg);transform:rotate(180deg)}.tippy-popper[x-placement^=top] .tippy-arrow{border-top:8px solid #333;border-right:8px solid transparent;border-left:8px solid transparent;bottom:-7px;margin:0 3px;-webkit-transform-origin:50% 0;transform-origin:50% 0}.tippy-popper[x-placement^=top] .tippy-backdrop{-webkit-transform-origin:0 25%;transform-origin:0 25%}.tippy-popper[x-placement^=top] .tippy-backdrop[data-state=visible]{-webkit-transform:scale(1) translate(-50%,-55%);transform:scale(1) translate(-50%,-55%)}.tippy-popper[x-placement^=top] .tippy-backdrop[data-state=hidden]{-webkit-transform:scale(.2) translate(-50%,-45%);transform:scale(.2) translate(-50%,-45%);opacity:0}.tippy-popper[x-placement^=top] [data-animation=shift-toward][data-state=visible]{-webkit-transform:translateY(-10px);transform:translateY(-10px)}.tippy-popper[x-placement^=top] [data-animation=shift-toward][data-state=hidden]{opacity:0;-webkit-transform:translateY(-20px);transform:translateY(-20px)}.tippy-popper[x-placement^=top] [data-animation=perspective]{-webkit-transform-origin:bottom;transform-origin:bottom}.tippy-popper[x-placement^=top] [data-animation=perspective][data-state=visible]{-webkit-transform:perspective(700px) translateY(-10px);transform:perspective(700px) translateY(-10px)}.tippy-popper[x-placement^=top] [data-animation=perspective][data-state=hidden]{opacity:0;-webkit-transform:perspective(700px) rotateX(60deg);transform:perspective(700px) rotateX(60deg)}.tippy-popper[x-placement^=top] [data-animation=fade][data-state=visible]{-webkit-transform:translateY(-10px);transform:translateY(-10px)}.tippy-popper[x-placement^=top] [data-animation=fade][data-state=hidden]{opacity:0;-webkit-transform:translateY(-10px);transform:translateY(-10px)}.tippy-popper[x-placement^=top] [data-animation=shift-away][data-state=visible]{-webkit-transform:translateY(-10px);transform:translateY(-10px)}.tippy-popper[x-placement^=top] [data-animation=shift-away][data-state=hidden]{opacity:0}.tippy-popper[x-placement^=top] [data-animation=scale]{-webkit-transform-origin:bottom;transform-origin:bottom}.tippy-popper[x-placement^=top] [data-animation=scale][data-state=visible]{-webkit-transform:translateY(-10px);transform:translateY(-10px)}.tippy-popper[x-placement^=top] [data-animation=scale][data-state=hidden]{opacity:0;-webkit-transform:translateY(-10px) scale(.5);transform:translateY(-10px) scale(.5)}.tippy-popper[x-placement^=bottom] .tippy-backdrop{border-radius:0 0 30% 30%}.tippy-popper[x-placement^=bottom] .tippy-roundarrow{top:-7px;-webkit-transform-origin:50% 100%;transform-origin:50% 100%;margin:0 3px}.tippy-popper[x-placement^=bottom] .tippy-roundarrow svg{position:absolute;left:0}.tippy-popper[x-placement^=bottom] .tippy-arrow{border-bottom:8px solid #333;border-right:8px solid transparent;border-left:8px solid transparent;top:-7px;margin:0 3px;-webkit-transform-origin:50% 100%;transform-origin:50% 100%}.tippy-popper[x-placement^=bottom] .tippy-backdrop{-webkit-transform-origin:0 -50%;transform-origin:0 -50%}.tippy-popper[x-placement^=bottom] .tippy-backdrop[data-state=visible]{-webkit-transform:scale(1) translate(-50%,-45%);transform:scale(1) translate(-50%,-45%)}.tippy-popper[x-placement^=bottom] .tippy-backdrop[data-state=hidden]{-webkit-transform:scale(.2) translate(-50%);transform:scale(.2) translate(-50%);opacity:0}.tippy-popper[x-placement^=bottom] [data-animation=shift-toward][data-state=visible]{-webkit-transform:translateY(10px);transform:translateY(10px)}.tippy-popper[x-placement^=bottom] [data-animation=shift-toward][data-state=hidden]{opacity:0;-webkit-transform:translateY(20px);transform:translateY(20px)}.tippy-popper[x-placement^=bottom] [data-animation=perspective]{-webkit-transform-origin:top;transform-origin:top}.tippy-popper[x-placement^=bottom] [data-animation=perspective][data-state=visible]{-webkit-transform:perspective(700px) translateY(10px);transform:perspective(700px) translateY(10px)}.tippy-popper[x-placement^=bottom] [data-animation=perspective][data-state=hidden]{opacity:0;-webkit-transform:perspective(700px) rotateX(-60deg);transform:perspective(700px) rotateX(-60deg)}.tippy-popper[x-placement^=bottom] [data-animation=fade][data-state=visible]{-webkit-transform:translateY(10px);transform:translateY(10px)}.tippy-popper[x-placement^=bottom] [data-animation=fade][data-state=hidden]{opacity:0;-webkit-transform:translateY(10px);transform:translateY(10px)}.tippy-popper[x-placement^=bottom] [data-animation=shift-away][data-state=visible]{-webkit-transform:translateY(10px);transform:translateY(10px)}.tippy-popper[x-placement^=bottom] [data-animation=shift-away][data-state=hidden]{opacity:0}.tippy-popper[x-placement^=bottom] [data-animation=scale]{-webkit-transform-origin:top;transform-origin:top}.tippy-popper[x-placement^=bottom] [data-animation=scale][data-state=visible]{-webkit-transform:translateY(10px);transform:translateY(10px)}.tippy-popper[x-placement^=bottom] [data-animation=scale][data-state=hidden]{opacity:0;-webkit-transform:translateY(10px) scale(.5);transform:translateY(10px) scale(.5)}.tippy-popper[x-placement^=left] .tippy-backdrop{border-radius:50% 0 0 50%}.tippy-popper[x-placement^=left] .tippy-roundarrow{right:-12px;-webkit-transform-origin:33.33333333% 50%;transform-origin:33.33333333% 50%;margin:3px 0}.tippy-popper[x-placement^=left] .tippy-roundarrow svg{position:absolute;left:0;-webkit-transform:rotate(90deg);transform:rotate(90deg)}.tippy-popper[x-placement^=left] .tippy-arrow{border-left:8px solid #333;border-top:8px solid transparent;border-bottom:8px solid transparent;right:-7px;margin:3px 0;-webkit-transform-origin:0 50%;transform-origin:0 50%}.tippy-popper[x-placement^=left] .tippy-backdrop{-webkit-transform-origin:50% 0;transform-origin:50% 0}.tippy-popper[x-placement^=left] .tippy-backdrop[data-state=visible]{-webkit-transform:scale(1) translate(-50%,-50%);transform:scale(1) translate(-50%,-50%)}.tippy-popper[x-placement^=left] .tippy-backdrop[data-state=hidden]{-webkit-transform:scale(.2) translate(-75%,-50%);transform:scale(.2) translate(-75%,-50%);opacity:0}.tippy-popper[x-placement^=left] [data-animation=shift-toward][data-state=visible]{-webkit-transform:translateX(-10px);transform:translateX(-10px)}.tippy-popper[x-placement^=left] [data-animation=shift-toward][data-state=hidden]{opacity:0;-webkit-transform:translateX(-20px);transform:translateX(-20px)}.tippy-popper[x-placement^=left] [data-animation=perspective]{-webkit-transform-origin:right;transform-origin:right}.tippy-popper[x-placement^=left] [data-animation=perspective][data-state=visible]{-webkit-transform:perspective(700px) translateX(-10px);transform:perspective(700px) translateX(-10px)}.tippy-popper[x-placement^=left] [data-animation=perspective][data-state=hidden]{opacity:0;-webkit-transform:perspective(700px) rotateY(-60deg);transform:perspective(700px) rotateY(-60deg)}.tippy-popper[x-placement^=left] [data-animation=fade][data-state=visible]{-webkit-transform:translateX(-10px);transform:translateX(-10px)}.tippy-popper[x-placement^=left] [data-animation=fade][data-state=hidden]{opacity:0;-webkit-transform:translateX(-10px);transform:translateX(-10px)}.tippy-popper[x-placement^=left] [data-animation=shift-away][data-state=visible]{-webkit-transform:translateX(-10px);transform:translateX(-10px)}.tippy-popper[x-placement^=left] [data-animation=shift-away][data-state=hidden]{opacity:0}.tippy-popper[x-placement^=left] [data-animation=scale]{-webkit-transform-origin:right;transform-origin:right}.tippy-popper[x-placement^=left] [data-animation=scale][data-state=visible]{-webkit-transform:translateX(-10px);transform:translateX(-10px)}.tippy-popper[x-placement^=left] [data-animation=scale][data-state=hidden]{opacity:0;-webkit-transform:translateX(-10px) scale(.5);transform:translateX(-10px) scale(.5)}.tippy-popper[x-placement^=right] .tippy-backdrop{border-radius:0 50% 50% 0}.tippy-popper[x-placement^=right] .tippy-roundarrow{left:-12px;-webkit-transform-origin:66.66666666% 50%;transform-origin:66.66666666% 50%;margin:3px 0}.tippy-popper[x-placement^=right] .tippy-roundarrow svg{position:absolute;left:0;-webkit-transform:rotate(-90deg);transform:rotate(-90deg)}.tippy-popper[x-placement^=right] .tippy-arrow{border-right:8px solid #333;border-top:8px solid transparent;border-bottom:8px solid transparent;left:-7px;margin:3px 0;-webkit-transform-origin:100% 50%;transform-origin:100% 50%}.tippy-popper[x-placement^=right] .tippy-backdrop{-webkit-transform-origin:-50% 0;transform-origin:-50% 0}.tippy-popper[x-placement^=right] .tippy-backdrop[data-state=visible]{-webkit-transform:scale(1) translate(-50%,-50%);transform:scale(1) translate(-50%,-50%)}.tippy-popper[x-placement^=right] .tippy-backdrop[data-state=hidden]{-webkit-transform:scale(.2) translate(-25%,-50%);transform:scale(.2) translate(-25%,-50%);opacity:0}.tippy-popper[x-placement^=right] [data-animation=shift-toward][data-state=visible]{-webkit-transform:translateX(10px);transform:translateX(10px)}.tippy-popper[x-placement^=right] [data-animation=shift-toward][data-state=hidden]{opacity:0;-webkit-transform:translateX(20px);transform:translateX(20px)}.tippy-popper[x-placement^=right] [data-animation=perspective]{-webkit-transform-origin:left;transform-origin:left}.tippy-popper[x-placement^=right] [data-animation=perspective][data-state=visible]{-webkit-transform:perspective(700px) translateX(10px);transform:perspective(700px) translateX(10px)}.tippy-popper[x-placement^=right] [data-animation=perspective][data-state=hidden]{opacity:0;-webkit-transform:perspective(700px) rotateY(60deg);transform:perspective(700px) rotateY(60deg)}.tippy-popper[x-placement^=right] [data-animation=fade][data-state=visible]{-webkit-transform:translateX(10px);transform:translateX(10px)}.tippy-popper[x-placement^=right] [data-animation=fade][data-state=hidden]{opacity:0;-webkit-transform:translateX(10px);transform:translateX(10px)}.tippy-popper[x-placement^=right] [data-animation=shift-away][data-state=visible]{-webkit-transform:translateX(10px);transform:translateX(10px)}.tippy-popper[x-placement^=right] [data-animation=shift-away][data-state=hidden]{opacity:0}.tippy-popper[x-placement^=right] [data-animation=scale]{-webkit-transform-origin:left;transform-origin:left}.tippy-popper[x-placement^=right] [data-animation=scale][data-state=visible]{-webkit-transform:translateX(10px);transform:translateX(10px)}.tippy-popper[x-placement^=right] [data-animation=scale][data-state=hidden]{opacity:0;-webkit-transform:translateX(10px) scale(.5);transform:translateX(10px) scale(.5)}.tippy-tooltip{position:relative;color:#fff;border-radius:.25rem;font-size:.875rem;padding:.3125rem .5625rem;line-height:1.4;text-align:center;background-color:#333}.tippy-tooltip[data-size=small]{padding:.1875rem .375rem;font-size:.75rem}.tippy-tooltip[data-size=large]{padding:.375rem .75rem;font-size:1rem}.tippy-tooltip[data-animatefill]{overflow:hidden;background-color:initial}.tippy-tooltip[data-interactive],.tippy-tooltip[data-interactive] .tippy-roundarrow path{pointer-events:auto}.tippy-tooltip[data-inertia][data-state=visible]{transition-timing-function:cubic-bezier(.54,1.5,.38,1.11)}.tippy-tooltip[data-inertia][data-state=hidden]{transition-timing-function:ease}.tippy-arrow,.tippy-roundarrow{position:absolute;width:0;height:0}.tippy-roundarrow{width:18px;height:7px;fill:#333;pointer-events:none}.tippy-backdrop{position:absolute;background-color:#333;border-radius:50%;width:calc(110% + 2rem);left:50%;top:50%;z-index:-1;transition:all cubic-bezier(.46,.1,.52,.98);-webkit-backface-visibility:hidden;backface-visibility:hidden}.tippy-backdrop:after{content:"";float:left;padding-top:100%}.tippy-backdrop+.tippy-content{transition-property:opacity;will-change:opacity}.tippy-backdrop+.tippy-content[data-state=hidden]{opacity:0}'), ut
});

var Sa11y = new Sa11y();

function Sa11y() {
    /* When checked, save to LocalStorage. Keeps checker active when navigating between pages until it is toggled off.
    Added setTimeout function to (unscientifically) give a little time to load any other content or slow post-rendered JS, iFrames, etc. */

    $(function () {

        //Bind enter key to checkbox.
        $('#sa11y-checkbox').keydown(function (ev) {
            if (ev.keyCode == 13) $(ev.target).click();
        })

        var data = localStorage.getItem("start-sa11y");
        if (data !== null) {
            $("input[name='start-sa11y']").prop('checked', true);
            $(".sa11y-main-toggle-style").addClass("loading-spinner");
            setTimeout(function () {
                Sa11y.checkAll();
            }, 1200);
        }
        $("input[name='start-sa11y']").change(function () {
            if ($(this).is(":checked")) {
                localStorage.setItem("start-sa11y", $(this).val());
                Sa11y.checkAll();
            } else {
                localStorage.removeItem("start-sa11y");
                Sa11y.checkAll();
            }
        });

        //Escape key to shutdown.
        $('body').keyup(function (escape) {
            if (escape.keyCode == 27 && $('#sa11y-panel').hasClass('sa11y-active')) {
                tippy.hideAll()
                localStorage.removeItem("start-sa11y");
                Sa11y.checkAll();
            } else {
                this.onkeyup = null;
            }
        });

    });

    /* Templated SVG icons from FontAwesome 5 for better cross-browser support and minimize conflicting libraries. */
    var MainToggleIcon = "<svg role='img' focusable='false' width='35px' height='35px' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><path fill='#ffffff' d='M256 48c114.953 0 208 93.029 208 208 0 114.953-93.029 208-208 208-114.953 0-208-93.029-208-208 0-114.953 93.029-208 208-208m0-40C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 56C149.961 64 64 149.961 64 256s85.961 192 192 192 192-85.961 192-192S362.039 64 256 64zm0 44c19.882 0 36 16.118 36 36s-16.118 36-36 36-36-16.118-36-36 16.118-36 36-36zm117.741 98.023c-28.712 6.779-55.511 12.748-82.14 15.807.851 101.023 12.306 123.052 25.037 155.621 3.617 9.26-.957 19.698-10.217 23.315-9.261 3.617-19.699-.957-23.316-10.217-8.705-22.308-17.086-40.636-22.261-78.549h-9.686c-5.167 37.851-13.534 56.208-22.262 78.549-3.615 9.255-14.05 13.836-23.315 10.217-9.26-3.617-13.834-14.056-10.217-23.315 12.713-32.541 24.185-54.541 25.037-155.621-26.629-3.058-53.428-9.027-82.141-15.807-8.6-2.031-13.926-10.648-11.895-19.249s10.647-13.926 19.249-11.895c96.686 22.829 124.283 22.783 220.775 0 8.599-2.03 17.218 3.294 19.249 11.895 2.029 8.601-3.297 17.219-11.897 19.249z'/></svg>",
        ErrorIcon = "<svg xmlns='http://www.w3.org/2000/svg' role='img' focusable='false' aria-hidden='true' viewBox='0 0 576 576' width='24px' height='24px'><path fill='#ffffff' d='M569.517 440.013C587.975 472.007 564.806 512 527.94 512H48.054c-36.937 0-59.999-40.055-41.577-71.987L246.423 23.985c18.467-32.009 64.72-31.951 83.154 0l239.94 416.028zM288 354c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z'></path></svg><span class='sr-only'>Error</span>",
        PassIcon = "<svg xmlns='http://www.w3.org/2000/svg' role='img' focusable='false' aria-hidden='true' viewBox='0 0 512 512' width='24px' height='24px'><path fill='#ffffff' d='M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z'/></svg><span class='sr-only'>Pass</span>",
        WarningIcon = "<svg xmlns='http://www.w3.org/2000/svg' width='28px' height='28px' role='img' focusable='false' aria-hidden='true' viewBox='0 0 512 512'><path fill='#505050' d='M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z'/></svg><span class='sr-only'>Warning</span>",
        PanelCheckIcon = "<svg xmlns='http://www.w3.org/2000/svg' width='24px' height='24px' role='img' focusable='false' aria-hidden='true' viewBox='0 0 512 512' ><path fill='#359E56' d='M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z'/></svg>",
        PanelWarningIcon = "<svg xmlns='http://www.w3.org/2000/svg' width='24px' height='24px' role='img' focusable='false' aria-hidden='true' viewBox='0 0 512 512'><path fill='#d39c00' d='M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z'/></svg>",
        PanelErrorIcon = "<svg xmlns='http://www.w3.org/2000/svg' role='img' focusable='false' aria-hidden='true' viewBox='0 0 576 512' width='24px' height='24px'><path fill='#d30017' d='M569.517 440.013C587.975 472.007 564.806 512 527.94 512H48.054c-36.937 0-59.999-40.055-41.577-71.987L246.423 23.985c18.467-32.009 64.72-31.951 83.154 0l239.94 416.028zM288 354c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z'></path></svg>"

    // States of the outlines, used to toggle the outlines.
    this.showingHeaders = false;
    this.showingLinkText = false;
    this.showingContrast = false;
    this.showingLabels = false;
    this.showingAltText = false;
    this.showingQA = false;

    // Sets working document to current page document object.
    this.workingDoc = document;

    // Sets the working document to an iframe
    this.setDocument = function (iframeID) {
        var iframe = document.getElementById(iframeID);
        this.workingDoc = iframe.contentDocument || iframe.contentWindow.document;
    };

    // Create a floating button and hidden divs that contain success/warning message.
    var sa11ycontainer = document.createElement("div");
    sa11ycontainer.setAttribute("id", "sa11y-container");
    //Main button uses checkbox input to pass value for localstorage.
    sa11ycontainer.innerHTML = "<label class='sa11y-main-toggle-style' for='sa11y-checkbox'>" + MainToggleIcon + "<span class='sr-only'>Check Accessibility</span></label><input class='sa11y-hide-native-checkbox' id='sa11y-checkbox' type='checkbox' name='start-sa11y'>"

        +
        "<div id='sa11y-panel' class='sa11y-panel'>"

        +
        "<div id='sa11y-page-outline' class='sa11y-outline-header'><span id='page-outline-header' class='sa11y-bold'>Page outline</span><ul id='sa11y-outline-list' tabindex='-1' aria-labelledby='page-outline-header'></ul></div>"

        +
        "<div id='sa11y-no-errors' role='alert' class='sa11y-panel-header'><div class='sa11y-th-img'>" + PanelCheckIcon + "</div><div class='sa11y-td-msg'>No accessibility errors found!</div></div>"

        +
        "<div id='sa11y-warnings' role='alert' class='sa11y-panel-header'><div class='sa11y-th-img'>" + PanelWarningIcon + "</div><div class='sa11y-td-msg'>No accessibility errors found, but please check warnings!</div></div>"

        +
        "<div id='sa11y-errors-found' role='alert' class='sa11y-panel-header'><div class='sa11y-th-img'>" + PanelErrorIcon + "</div><div class='sa11y-td-msg'>Accessibility errors found!<br><a href='https://www.w3.org/WAI/tutorials/' target='_blank'>Need help?</a></div></div>"

        +
        "<button type='button' aria-expanded='false' id='sa11y-summary-toggle'>Show Outline</button>"

        +
        "</div>";

    $('body').prepend(sa11ycontainer);

    // State of errors on page. Used to toggle pass message.
    this.noErrors = true;
    this.anyWarning = false;
    this.panelActive = false;

    // Toggles the outline of all headers, link texts, and images.
    this.checkAll = function () {
        this.checkHeaders();
        this.checkLinkText();
        this.checkContrast();
        this.checkLabels();
        this.checkAltText();
        this.checkQA();

        if (this.panelActive) {
            Sa11y.reset();
            this.panelActive = false;
        } else {
            this.displayPanel();
            this.panelActive = true;
        }

        tippy('body', {
            target: '[data-tippy-content]',
            interactive: true,
            trigger: 'mouseenter focus',
            arrow: true,
            theme: 'light',
        })

    };

    $("#sa11y-summary-toggle").click(function () {
        $(this).toggleClass("sa11y-btn-active");
        $("#sa11y-page-outline").toggleClass("sa11y-active");
        $(this).text(function (i, v) {
            return v === 'Show Outline' ? 'Hide Outline' : 'Show Outline'
        });
        $(this).attr('aria-expanded', function (i, attr) {
            return attr == 'true' ? 'false' : 'true'
        });
        $("#sa11y-outline-list").focus();
    });

    this.displayPanel = function () {
        if (this.noErrors) {
            $("#sa11y-panel").addClass("sa11y-active");
            $("#sa11y-summary-toggle").addClass("sa11y-active");
            $(".sa11y-main-toggle-style").addClass("sa11y-toggle-active");

            // Display a warning message if only warnings are found.
            if (this.anyWarning) {
                $("#sa11y-no-errors").removeClass("sa11y-active");
                $("#sa11y-warnings").addClass("sa11y-active");
                $(".sa11y-main-toggle-style").addClass("sa11y-toggle-active");
            }

            // Display success message.
            else if (!this.anyWarning) {
                $("#sa11y-warnings").removeClass("sa11y-active");
                $("#sa11y-no-errors").addClass("sa11y-active");
                $(".sa11y-main-toggle-style").addClass("sa11y-toggle-active");
            } else {
                $("#sa11y-warnings").removeClass("sa11y-active");
                $("#sa11y-no-errors").removeClass("sa11y-active");
            }

            $("#allytogglebtn").click(function (event) {
                event.stopPropagation();
            });

        } else {
            $("#sa11y-panel").addClass("sa11y-active");
            $("#sa11y-summary-toggle").addClass("sa11y-active");
            $("#sa11y-errors-found").addClass("sa11y-active");
            $("#sa11y-no-errors").removeClass("sa11y-active");
            $("#sa11y-warnings").removeClass("sa11y-active");
            $(".sa11y-main-toggle-style").addClass("sa11y-toggle-active");
        }
    }

    // Resets all changes made by the tool. Removing outlines and additional spans.
    this.reset = function () {
        this.clearEverything();
        this.showingAltText = false;
        this.showingHeaders = false;
        this.showingLinkText = false;
        this.showingContrast = false;
        this.showingLabels = false;
        this.showingQA = false;
        this.noErrors = true; //Reset page to "no errors" instead of refreshing page.
        this.anyWarning = false;
    };

    this.clearEverything = function () {
        var $body = $(this.workingDoc.getElementsByTagName("body"));

        //Remove error outlines
        $body.find(".sa11y-text-warning").removeClass("sa11y-text-warning");
        $body.find(".sa11y-uppercase-warning").contents().unwrap();
        $body.find(".sa11y-error-border").removeClass("sa11y-error-border");
        $body.find(".sa11y-warning-border").removeClass("sa11y-warning-border");
        $body.find(".sa11y-headings-fail").removeClass("sa11y-headings-fail");
        $body.find(".sa11y-link-text-fail").removeClass("sa11y-link-text-fail");

        //Remove buttons
        $body.find(".tippy-left-inline").remove();
        $body.find(".sa11y-error-btn").remove();
        $body.find(".sa11y-error-text-btn").remove();
        $body.find(".sa11y-link-warning-btn").remove();
        $body.find(".sa11y-warning-btn").remove();
        $body.find(".sa11y-pass-btn").remove();
        $body.find(".sa11y-text-pass-btn").remove();
        $body.find(".sa11y-headings-label").remove();

        //Remove panels
        $body.find(".sa11y-error-message").remove();
        $body.find(".sa11y-pass-message").remove();
        $body.find(".sa11y-warning-message").remove();
        $body.find("#sa11y-panel").removeClass("sa11y-active");
        $body.find("#sa11y-summary-toggle").removeClass("sa11y-active");
        $body.find(".sa11y-popover").remove();
        $body.find("#sa11y-outline-list li").remove();
        $body.find(".sa11y-main-toggle-style").removeClass("allytogglefocus");
        $body.find(".sa11y-main-toggle-style").removeClass("sa11y-toggle-active");
        $body.find("#sa11y-errors-found").removeClass("sa11y-active");
        $body.find("#sa11y-no-errors").removeClass("sa11y-active");
        $body.find("#sa11y-warnings").removeClass("sa11y-active");
    }

    /*================== HEADING STRUCTURE MODULE ===================*/

    this.checkHeaders = function () {
        if (this.showingHeaders) {
            this.clearEverything();
            this.showingHeaders = false;
        } else {
            this.outlineHeaders();
            this.showingHeaders = true;
        }
    };

    this.outlineHeaders = function () {

        // Fetch all headers from the working document.
        let $headings = $(this.workingDoc.querySelectorAll("h1, h2, h3, h4, h5, h6"));
        let prevLevel;

        // Test each header level for accessibility issues.
        $headings.each((i, el) => {
            let $el = $(el);
            let level = +$el.prop("tagName").slice(1);
            let error = null;
            let headingLength = $el.text().trim().length;

            // Tests 4 cases of inaccesibility.
            if (i === 0 && level !== 1) {
                error = "<div class='tippy-heading'>Error</div> First heading on page is not a Heading 1. Heading 1 should be the start of the main content section, and is the main heading that describes the overall purpose of the page.";
            } else if (i !== 0 & level === 1) {
                error = "<div class='tippy-heading'>Error</div> There must only be one Heading 1 per page. Heading 1 is the main heading that describes the overall purpose of the page.";
            } else if (prevLevel && level - prevLevel > 1) {
                error = "<div class='tippy-heading'>Error</div> Non-consecutive heading level used. Headings should never skip levels, or go from <span class='sa11y-bold'>Heading " + prevLevel + "</span> to <span class='sa11y-red-text sa11y-bold'>Heading " + level + ".</span>";
            } else if ($el.text().trim().length < 1) {
                error = "<div class='tippy-heading'>Error</div> Empty heading found! Please remove empty header tags.";
                $el.addClass("sa11y-link-text-fail");
            } else if ($el.text().trim().length > 160) {
                error = "<div class='tippy-heading'>Error</div> Heading is too long! Headings are used to organize content and convey structure. They should be brief, clear, informative and unique. Please keep headings less than 160 characters (no more than a sentence).<hr aria-hidden='true' class='tippy-tool-hr'>Character count: <span class='sa11y-bold sa11y-red-text'>" + headingLength + "</span>"
            }

            prevLevel = level;

            //If the heading error is within a hyperlink, make sure to append button after anchor tag.
            if (error != null && $el.closest("a").length > 0) {
                this.noErrors = false;
                $el.addClass("sa11y-headings-fail");
                $el.closest('a').after('<div class="tippy-left"><button class="sa11y-error-text-btn" data-tippy-content="' + error + '" data-tippy-allowHTML="true">' + ErrorIcon + '</button></div>');
                var li = "<li class='sa11y-outline-" + level + " sa11y-red-text'><span class='sa11y-bold'><span aria-hidden='true'>&times;</span><span class='sr-only'>Error</span> H" + level + ":</span> " + $el.text() + "</li>"; //Generate page outline.
                $("#sa11y-outline-list").append(li); //Generate page outline.
            }

            // Outline element based on error.
            else if (error != null) {
                this.noErrors = false;
                $el.addClass("sa11y-headings-fail");
                $el.before('<div class="tippy-left"><button class="sa11y-error-text-btn" data-tippy-content="' + error + '" data-tippy-allowHTML="true">' + ErrorIcon + '</button></div>');
                var li = "<li class='sa11y-outline-" + level + " sa11y-red-text'><span class='sa11y-bold'><span aria-hidden='true'>&times;</span><span class='sr-only'>Error</span> H" + level + ":</span> " + $el.text() + "</li>"; //Generate page outline.
                $("#sa11y-outline-list").append(li); //Generate page outline.
            } else if (error == null) {
                var li = "<li class='sa11y-outline-" + level + "'><span class='sa11y-bold'>H" + level + ":</span> " + $el.text() + "</li>"; //Generate page outline.
                $("#sa11y-outline-list").append(li); //Generate page outline.
            }

            $("#sa11y-summary-toggle").click(function () {
                if ($(this).attr('aria-expanded') == 'true') {
                    $el.append(" <span class='sa11y-headings-label'>H" + level + "</span> ");
                } else {
                    $(".sa11y-headings-label").remove();
                }
            });

        });
    };

    /*====================== LINK TEXT MODULE =======================*/

    // Toggles the outline of all inaccessible link texts.
    this.checkLinkText = function () {
        if (this.showingLinkText) {
            this.clearEverything();
            this.showingLinkText = false;
        } else {
            this.outlineLinkText();
            this.showingLinkText = true;
        }
    };

    this.outlineLinkText = function () {


        let $links = $("body").find("a").not(".sa11y-exclude");

        /* Example: Find all links within the main content area, and exclude all links with the class.*/

        //Mini function if you need to exclude any text contained with a span.
        $.fn.ignore = function(sel){
          return this.clone().find(sel||">*").remove().end();
        };
        /* Example: If you need to ignore any text within <span class="sr-only">test</span>.
            $el.ignore("span.sr-only").text().trim();
        */

        $links.each((i, el) => {
            let $el = $(el);
            var linktext = $el.text();
            var hasarialabelledby = $el.attr("aria-labelledby");
            var hasarialabel = $el.attr("aria-label");
            var hasariahidden = $el.attr("aria-hidden");
            var hastabindex = $el.attr("tabindex");

            // error is any words that are making this link text inaccessible.
            var error = this.containsLinkTextStopWords($el.ignore("span.sr-only").text().trim());

            // Tests to see if this link is empty
            if ($el.children().length == 0 && $el.ignore("span.sr-only").text().length == 0 && $el.is(':visible')) {
                this.noErrors = false;
                linkErrorMessage = "<div class='tippy-heading'>Error</div> Found an empty hyperlink without any text!"
                $el.addClass("sa11y-link-text-fail");
                $el.after('<div class="tippy-left-inline"><button class="sa11y-error-text-btn" data-tippy-content="' + linkErrorMessage + '" data-tippy-allowHTML="true">' + ErrorIcon + '</button></div>');
            }
            // if link contains any link text stop words, then it fails.
            else if (error != null) {

                if (hasarialabelledby != null) {
                    var acclinkname = document.getElementById(hasarialabelledby).textContent;
                    var linkHasAriaLabelledby = "<div class='tippy-heading'>Good</div> The descriptive label for this link is: <span class='sa11y-bold'>" + linktext + " " + acclinkname + "</span>"
                    $el.after('<div class="tippy-left-inline"><button class="sa11y-text-pass-btn" data-tippy-content="' + linkHasAriaLabelledby + '" data-tippy-allowHTML="true">' + PassIcon + '</button></div>');
                } else if (hasarialabel != null) {
                    linkHasAriaLabel = "<div class='tippy-heading'>Good</div> The descriptive label for this link is: <span class='sa11y-bold'>" + hasarialabel + "</span>"
                    $el.after('<div class="tippy-left-inline"><button class="sa11y-text-pass-btn" data-tippy-content="' + linkHasAriaLabel + '" data-tippy-allowHTML="true">' + PassIcon + '</button></div>');
                } else if (hasariahidden == "true" && hastabindex == "-1") {
                    //do nothing.
                } else {
                    this.noErrors = false;
                    $el.addClass("sa11y-link-text-fail");
                    stopWordMessage = "<div class='tippy-heading'>Error</div> Link text may not be descriptive enough, consider changing word: <span class='sa11y-red-text sa11y-bold'>" + error + "</span><hr aria-hidden='true' class='tippy-tool-hr'><span class='sa11y-bold'>Tip!</span> Link text should always be unique and meaningful so it could be understood out of context."
                    $el.after('<div class="tippy-left-inline"><button class="sa11y-error-text-btn" data-tippy-content="' + stopWordMessage + '" data-tippy-allowHTML="true">' + ErrorIcon + '</button></div>');
                }
            }

        });
    };

    // Checks if text is not descriptive and returns the word(s) that are making the text inaccessible.
    //showStopper words will always flag an issue if contained in a hyperlink.
    //partialStopWords will only be flagged as an issue if it's the only hyperlink text.
    this.containsLinkTextStopWords = function (textContent) {

        let stopWords = ["click here", "<", ">", "http://", "https://", ".aspx", ".html", ".php", "here."];
        let partialStopWords = ["learn more", "learn", "more", "register", "register now", "this page", "check out", "learn to", "view", "view our", "read more", ".", ",", ":", "page", "this page", "download", "form", "link", "here", "this"];
        var hit = null;

        // First check for show stoppers.
        $.each(stopWords, function (index, word) {
            if (textContent.toLowerCase().indexOf(word) >= 0) {
                hit = word;
                return false;
            }
        });

        // If no partial words were found, then check for total words.
        if (hit == null) {
            $.each(partialStopWords, function (index, word) {
                if (textContent.length === word.length && textContent.toLowerCase().indexOf(word) >= 0) {
                    hit = word;
                    return false;
                }
            });
        }
        return hit;
    };

    /*======================== CONTRAST MODULE =======================*/
    /* Thanks to jasonday for this plugin https://www.jqueryscript.net/other/color-contrast-checker.html */
    this.checkContrast = function () {
        if (this.showingContrast) {
            this.showingContrast = false;
        } else {
            this.outlineContrast();
            this.showingContrast = true;
        }
    };

    // Outlines inaccessible link texts with a red border and a tooltip for remediation solution.
    this.outlineContrast = function () {

        var contrastErrors = {
            errors: [],
            warnings: []
        };
        var contrast = {
            // Parse rgb(r, g, b) and rgba(r, g, b, a) strings into an array.
            // Adapted from https://github.com/gka/chroma.js
            parseRgb: function (css) {
                var i, m, rgb, _i, _j;
                if (m = css.match(/rgb\(\s*(\-?\d+),\s*(\-?\d+)\s*,\s*(\-?\d+)\s*\)/)) {
                    rgb = m.slice(1, 4);
                    for (i = _i = 0; _i <= 2; i = ++_i) {
                        rgb[i] = +rgb[i];
                    }
                    rgb[3] = 1;
                } else if (m = css.match(/rgba\(\s*(\-?\d+),\s*(\-?\d+)\s*,\s*(\-?\d+)\s*,\s*([01]|[01]?\.\d+)\)/)) {
                    rgb = m.slice(1, 5);
                    for (i = _j = 0; _j <= 3; i = ++_j) {
                        rgb[i] = +rgb[i];
                    }
                }
                return rgb;
            },
            // Based on http://www.w3.org/TR/WCAG20/#relativeluminancedef
            relativeLuminance: function (c) {
                var lum = [];
                for (var i = 0; i < 3; i++) {
                    var v = c[i] / 255;
                    lum.push(v < 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4));
                }
                return 0.2126 * lum[0] + 0.7152 * lum[1] + 0.0722 * lum[2];
            },
            // Based on http://www.w3.org/TR/WCAG20/#contrast-ratiodef
            contrastRatio: function (x, y) {
                var l1 = contrast.relativeLuminance(contrast.parseRgb(x));
                var l2 = contrast.relativeLuminance(contrast.parseRgb(y));
                return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
            },
            // Based on http://jsfiddle.net/Y4uDL/
            getBackground: function (el) {
                var bgColor = el.css('background-color');
                var bgImage = el.css('background-image');

                if (bgColor !== 'rgba(0, 0, 0, 0)' && bgColor !== 'transparent' && bgImage === "none") {
                    return bgColor;
                } else if (bgImage !== "none") {
                    return "image";
                }

                if (el.is('html')) {
                    return 'rgb(255, 255, 255)';
                } else {
                    return contrast.getBackground(el.parent());
                }
            },
            check: function () {
                $('*:visible').each(function () {
                    var $this = $(this),
                        color = $this.css('color'),
                        background = contrast.getBackground($this),
                        htmlTag = $this[0].tagName,
                        textCheck = $this.clone().children().remove().end().text(),
                        ratingString,
                        fontSizeString,
                        failed;

                    if (htmlTag === "SVG") {
                        var fill = $this.css('fill'),
                            ratio = Math.round(contrast.contrastRatio(fill, background) * 100) / 100,
                            ratioText = ratio + ':1';
                        if (ratio < 3) {
                            failed = true;
                            fontSizeString = "svg fill";
                            ratingString = "fail"
                        }
                    } else if ($.trim(textCheck).length || htmlTag === "INPUT" || htmlTag === "SELECT" || htmlTag === "TEXTAREA") {
                        // does element have a background image - needs to be manually reviewed
                        if (background === "image") {
                            var ratioText = "unknown";
                            ratingString = "Needs manual review";
                            fontSizeString = "N/A";
                            failed = true;
                        } else {
                            var ratio = Math.round(contrast.contrastRatio(color, background) * 100) / 100,
                                ratioText = ratio + ':1',
                                fontSize = parseInt($this.css('fontSize')),
                                fontWeight = $this.css('fontWeight');

                            if (($this.width() <= 1 || $this.height() <= 1) && $this.css("overflow") == 'hidden') {
                                /*Really unscientific condition of ignoring visually hidden screen reader text.
                                If width and height of element is less than 1px and overflow is set to hidden,
                                do not run contrast check on it...*/
                            } else if (fontSize >= 18 || (fontSize >= 14 && fontWeight >= 700)) {
                                fontSizeString = 'Large scale text'
                                if (ratio < 3) {
                                    ratingString = 'fail';
                                    failed = true;
                                } else {
                                    ratingString = 'pass';
                                    failed = false;
                                }
                            } else {
                                fontSizeString = 'Normal scale body text'
                                if (ratio < 4.5) {
                                    ratingString = 'fail';
                                    failed = true;
                                } else {
                                    ratingString = 'pass';
                                    failed = false;
                                }
                            }
                        }
                    }

                    // highlight the element in the DOM and log the element, contrast ratio and failure
                    // for testing in console
                    if (failed) {
                        var error = {};
                        error = {
                            name: $this,
                            ratio: ratioText,
                            detail: fontSizeString,
                            status: ratingString
                        }
                        if (ratingString === "fail") {
                            contrastErrors.errors.push(error);
                        } else if (ratingString === "Needs manual review") {
                            contrastErrors.warnings.push(error);
                        }
                    }
                });

                return contrastErrors;
            }
        }

        contrast.check();
        $.each(contrastErrors.errors, (index, item) => {
            var name = item.name;
            var cdetail = item.detail;
            var cratio = item.ratio;
            var nodename = name[0].nodeName;
            var nodetext = name[0].textContent;
            this.noErrors = false;
            ContrastError = "<div class='tippy-heading'>Error</div> " + cdetail + " does not have enough contrast with the background. The contrast ratio should be at least 4.5:1 for normal text and 3:1 for large text. <hr class='tippy-tool-hr' aria-hidden='true'> The contrast ratio is <span class='sa11y-red-text sa11y-bold'>" + cratio + "</span> for the following text: <span class='sa11y-bold sa11y-red-text'>" + nodetext + "</span>"
            $(name).addClass("sa11y-error-border").before('<div><button class="sa11y-error-text-btn" data-tippy-content="' + ContrastError + '" data-tippy-allowHTML="true">' + ErrorIcon + '</button></div>');
        });

        $.each(contrastErrors.warnings, (index, item) => {
            var name = item.name;
            var nodetext = name[0].textContent;
            this.anyWarning = true;
            ContrastWarning = "<div class='tippy-heading'>Warning</div> The contrast of this text is unknown and needs to be manually reviewed. Ensure the text and the background have strong contrasting colours. The contrast ratio should be at least 4.5:1 for normal text and 3:1 for large text. <hr class='tippy-tool-hr' aria-hidden='true'>Please review contrast of the following text:<br> <span class='sa11y-bold'>" + nodetext + "</span>"
            $(name).addClass('sa11y-warning-border').before('<div><button class="sa11y-link-warning-btn" data-tippy-content="' + ContrastWarning + '" data-tippy-allowHTML="true">' + WarningIcon + '</button></div>');
        });

    };

    /*======================== INPUTS MODULE =======================*/
    this.checkLabels = function () {
        if (this.showingLabels) {
            this.showingLabels = false;
        } else {
            this.outlineLabels();
            this.showingLabels = true;
        }
    };

    /* Outlines inaccessible link texts with a red border and a tooltip for remediation solution. */
    this.outlineLabels = function () {
        let $inputs = $(this.workingDoc.querySelectorAll("input"));
        $inputs.each((i, el) => {
            let $el = $(el);

            if (!$el.attr('id') && !$el.attr('aria-label') && !$el.attr('aria-labelledby')) {
                this.noErrors = false;
                $el.addClass("sa11y-error-border");
                MissingLabelError = "<div class='tippy-heading'>Error</div> There is no label associated with this input. Please add an <kbd>id</kbd> to this input, and add a matching <kbd>for</kbd> attribute to the label."
                $el.after('<div class="tippy-left-inline"><button class="sa11y-error-text-btn" data-tippy-content="' + MissingLabelError + '" data-tippy-allowHTML="true">' + ErrorIcon + '</button></div>');
            } else if ($el.attr('aria-label')) {
                /*Optional: add pass border.*/
            } else if ($el.prev().is("label")) {

                label = $el.prev();
                if (label.attr('for') == $el.attr('id')) {
                    /*Optional: add pass border.*/
                } else {
                    this.noErrors = false;
                    $el.addClass("sa11y-error-border");
                    NoForAttributeError = "<div class='tippy-heading'>Error</div> There is no label associated with this input. Add a <kbd>for</kbd> attribute to the label that matches the <kbd>id</kbd> of this input. <hr class='tippy-tool-hr' aria-hidden='true'> The ID for this input is: <span class='sa11y-bold'>id=&#34;" + $el.attr('id') + "&#34;</span>"
                    $el.after('<div class="tippy-left-inline"><button class="sa11y-error-text-btn" data-tippy-content="' + NoForAttributeError + '" data-tippy-allowHTML="true">' + ErrorIcon + '</button></div>');
                }
            }
        });
    };

    /*================== ALTERNATIVE TEXT MODULE ====================*/

    // Toggles the outline of images.
    this.checkAltText = function () {
        if (this.showingAltText) {
            this.clearEverything();
            this.showingAltText = false;
        } else {
            this.outlineAltText();
            this.showingAltText = true;
        }
    };

    this.outlineAltText = function () {

        let $images = $("body").find("img").not(".sa11y-exclude");
        /* Example: Find all images within the main content area only, and exclude images containing a path.*/

        // Test each image for alternative text.
        $images.each((i, el) => {
            let $el = $(el);
            let text = $el.attr("alt");

            // Checks to see if image contains an alt attribute. If not, then image fails.
            if (text == undefined) {
                this.noErrors = false;

                // Image fails if it is used as a link and is missing an alt attribute.
                //if ($el.parent().prop("tagName") == "A") {
                if ($el.parents().is("a[href]")) {

                    //Image contains both hyperlink
                    if ($el.parents("a").text().trim().length > 1) {
                        $el.addClass("sa11y-error-border");
                        missingAltLinkButHasTextError = "<div class='tippy-heading'>Error</div> Image is being used as a hyperlink with surrounding text, although the alt attribute should be marked as decorative or null."
                        $el.closest("a").before('<div class="tippy-left"><button class="sa11y-error-btn" data-tippy-content="' + missingAltLinkButHasTextError + '" data-tippy-allowHTML="true">' + ErrorIcon + '</button></div>');
                    } else if ($el.parents("a").text().trim().length == 0) {
                        $el.addClass("sa11y-error-border");
                        missingAltLinkError = "<div class='tippy-heading'>Error</div> Image is being used as a hyperlink but is missing alt text! Please ensure alt text describes where the link takes you."
                        $el.closest('a').before('<div class="tippy-left"><button class="sa11y-error-btn" data-tippy-content="' + missingAltLinkError + '" data-tippy-allowHTML="true">' + ErrorIcon + '</button></div>');
                    }

                }
                // General failure message if Image is missing an alt attribute.
                else {
                    $el.addClass("sa11y-error-border");
                    generalAltText = "<div class='tippy-heading'>Error</div> Missing alt text! If the image conveys a story, a mood or important information - be sure to describe the image."
                    $el.before('<div class="tippy-left"><button class="sa11y-error-btn" data-tippy-content="' + generalAltText + '" data-tippy-allowHTML="true">' + ErrorIcon + '</button></div>');
                }
            }

            // If alt attribute is present, further tests are done.
            else {
                let altText = text.replace(/'/g, "&#39;"); //replace apostrophe with HTML ascii to prevent breaking popover.
                let error = this.containsAltTextStopWords(altText);
                let altLength = text.length;

                // Image fails if a stop word was found
                if (error != null && $el.parents().is("a[href]")) {
                    this.noErrors = false;
                    $el.addClass("sa11y-error-border");
                    LinkedImageHasBadAltWord = "<div class='tippy-heading'>Error</div> Detected poor alt text in hyperlinked image. Ensure alt text describes destination of link, not a literal description of the picture. Remove word: <span class='sa11y-red-text sa11y-bold'>" + error + "</span>. <hr aria-hidden='true' class='tippy-tool-hr'> The alt text for this image is: <span class='sa11y-bold'>" + altText + "</span>"

                    $el.closest('a').before('<div class="tippy-left"><button class="sa11y-error-btn" data-tippy-content="' + LinkedImageHasBadAltWord + '" data-tippy-allowHTML="true">' + ErrorIcon + '</button></div>');
                } else if (error != null) {
                    this.noErrors = false;
                    $el.addClass("sa11y-error-border");
                    AltHasBadWord = "<div class='tippy-heading'>Error</div> Poor alt text found. It is not necessary to include words like <em>image</em>, <em>graphic</em> or the file extension. Consider removing the word: <span class='sa11y-red-text sa11y-bold'>" + error + "</span>. <hr aria-hidden='true' class='tippy-tool-hr'> The alt text for this image is: <span class='sa11y-bold'>" + altText + "</span>"
                    $el.before('<div class="tippy-left"><button class="sa11y-error-btn" data-tippy-content="' + AltHasBadWord + '" data-tippy-allowHTML="true">' + ErrorIcon + '</button></div>');
                } else if (text == "" && $el.parents().is("a[href]")) {
                    if ($el.parents("a").text().trim().length == 0) {
                        this.noErrors = false;
                        $el.addClass("sa11y-error-border");
                        ImageLinkNullAltNoText = "<div class='tippy-heading'>Error</div> Image within hyperlink is marked as decorative and there is no link text. Please add alt text to image that describes destination of link."
                        $el.closest('a').before('<div class="tippy-left"><button class="sa11y-error-btn" data-tippy-content="' + ImageLinkNullAltNoText + '" data-tippy-allowHTML="true">' + ErrorIcon + '</button></div>');
                    } else {
                        LinkHasAltMessage = "<div class='tippy-heading'>Good</div> Image is marked as decorative, although the hyperlink is using the surrounding text as a descriptive label."
                        $el.closest('a').before('<div class="tippy-left"><button class="sa11y-pass-btn" data-tippy-content="' + LinkHasAltMessage + '" data-tippy-allowHTML="true">' + PassIcon + '</button></div>');
                    }
                }

                // Image warning if it is decorative and is not a link.
                else if (text == "" && $el.parents().not("a[href]")) {
                    decorativePassMessage = "<div class='tippy-heading'>Good</div> Image marked as <span class='sa11y-bold'>decorative.</span> However, if the image conveys a story, a mood or important information - be sure to add alt text."
                    $el.before('<div class="tippy-left"><button class="sa11y-pass-btn" data-tippy-content="' + decorativePassMessage + '" data-tippy-allowHTML="true">' + PassIcon + '</button></div>');
                }

                // Image warning if it is a link and contains an alt text.
                else if (text.length > 160 && $el.parents().is("a")) {
                    this.noErrors = false;
                    $el.addClass("sa11y-error-border");
                    HyperlinkAltLengthWarning = "<div class='tippy-heading'>Error</div> Alt text description on hyperlinked image is <span class='sa11y-bold'>too long</span>. The alt text on hyperlinked images should describe where the link takes you, not a literal description of the image. <span class='sa11y-bold'>Consider using the title of the page it links to as the alt text.</span> <hr aria-hidden='true' class='tippy-tool-hr'> The alt text is <span class='sa11y-red-text sa11y-bold'>" + altLength + "</span> characters: <span class='sa11y-red-text sa11y-bold'>" + altText + "</span>"
                    $el.closest('a').before('<div class="tippy-left"><button class="sa11y-error-btn" data-tippy-content="' + HyperlinkAltLengthWarning + '" data-tippy-allowHTML="true">' + ErrorIcon + '</button></div>');
                }

                // Image warning if it is a link and contains an alt text.
                else if (text != "" && $el.parents().is("a") && $el.parents("a").text().trim().length == 0) {
                    this.anyWarning = true;
                    $el.addClass("sa11y-warning-border");
                    ImageLinkAltTextWarning = "<div class='tippy-heading'>Please Review</div> Image link contains alt text, although please ensure alt text describes the destination page. <span class='sa11y-bold'>Consider using the title of the page it links to as the alt text.</span> Does the alt text describe where the link takes you? <hr aria-hidden='true' class='tippy-tool-hr'>Alt text: <span class='sa11y-bold'>" + altText + "</span>"
                    $el.closest('a').before('<div class="tippy-left"><button class="sa11y-warning-btn" data-tippy-content="' + ImageLinkAltTextWarning + '" data-tippy-allowHTML="true">' + WarningIcon + '</button></div>');
                }

                // Image warning if it is a link, contains alt text AND surrounding link text.
                else if (text != "" && $el.parents().is("a") && $el.parents("a").text().trim().length > 1) {
                    this.anyWarning = true;
                    $el.addClass("sa11y-warning-border");
                    AnchorLinkAndAlt = "<div class='tippy-heading'>Please Review</div> Image link contains <span class='sa11y-bold'>both alt text and surrounding link text.</span> If this image is decorative and is being used as a functional link to another page, consider marking the image as decorative or null - the surrounding link text should suffice. <hr aria-hidden='true' class='tippy-tool-hr'>Alt text: <span class='sa11y-bold'>" + altText + "</span>"
                    $el.closest('a').before('<div class="tippy-left"><button class="sa11y-warning-btn" data-tippy-content="' + AnchorLinkAndAlt + '" data-tippy-allowHTML="true">' + WarningIcon + '</button></div>');
                }


                // Image error if alt text is too long.
                else if (text.length > 160) {
                    this.noErrors = false;
                    $el.addClass("sa11y-error-border");
                    AltTooLong = "<div class='tippy-heading'>Error</div> Alt text description is <span class='sa11y-bold'>too long</span>. Alt text should be concise, yet meaningful like a <em>tweet</em> (around 100 characters). If this is a complex image or a graph, consider putting the long description of the image in text below or in an accordion component. <hr aria-hidden='true' class='tippy-tool-hr'> The alt text is <span class='sa11y-red-text sa11y-bold'>" + altLength + "</span> characters: <span class='sa11y-red-text sa11y-bold'>" + altText + "</span>"
                    $el.before('<div class="tippy-left"><button class="sa11y-error-btn" data-tippy-content="' + AltTooLong + '" data-tippy-allowHTML="true">' + ErrorIcon + '</button></div>');
                }

                // Image pass if it contains alt text.
                else if (text != "") {
                    PassAltMessage = "<div class='tippy-heading'>Good</div> The alt text for this image is: <span class='sa11y-bold'>" + altText + "</span>"
                    $el.before('<div class="tippy-left"><button class="sa11y-pass-btn" data-tippy-content="' + PassAltMessage + '" data-tippy-allowHTML="true">' + PassIcon + '</button></div>');
                }
            }
        });
    };

    // Checks if text is not descriptive and returns the word(s) that are making the text inaccessible.
    this.containsAltTextStopWords = function (textContent) {
        let stopWords = [".png", "DSC", ".jpg", ".jpeg", "image of", "graphic of", "picture of", "alt", "placeholder"];
        var hit = null;
        $.each(stopWords, function (index, word) {
            if (textContent.toLowerCase().indexOf(word) >= 0) {
                hit = word;
                return word;
            }
        });
        return hit;
    };

    /*================== QUALITY ASSURANCE MODULE ===================*/

    this.checkQA = function () {
        if (this.showingQA) {
            this.clearEverything();
            this.showingQA = false;
        } else {
            this.outlineQA();
            this.showingQA = true;
        }
    };

    this.outlineQA = function () {

        //Warn users to provide captions for videos.
        let $findVideos = $("video, iframe[src*='youtube.com'], iframe[src*='vimeo.com']");
        $findVideos.each((i, el) => {
            let $el = $(el);
            this.anyWarning = true;
            $el.addClass("sa11y-warning-border");
            MissingCaptionsWarning = "<div class='tippy-heading'>Warning</div> Please ensure <span class='sa11y-bold'>all videos have closed captioning.</span> Providing captions for all audio and video content is a mandatory Level A requirement. Captions are meant to support people who are D/deaf or hard-of-hearing."
            $el.before('<div><button class="sa11y-warning-btn" data-tippy-content="' + MissingCaptionsWarning + '" data-tippy-allowHTML="true">' + WarningIcon + '</button></div>');
        });


        //Warning: Make sure all podcasts have captions.
        var soundcloudWarning = $('audio, iframe[src*="soundcloud.com"]');
        if (soundcloudWarning.length > 0) {
            this.anyWarning = true;
            soundcloudWarning.addClass("sa11y-warning-border");
            SoundCloudMessage = "<div class='tippy-heading'>Warning</div> Please ensure to provide a <span class='sa11y-bold'>transcript for all podcasts.</span> Providing transcripts for audio content is a mandatory Level A requirement. Transcripts are meant to support people who are D/deaf or hard-of-hearing, but can benefit everyone. Consider placing the transcript below or within an accordion panel."
            soundcloudWarning.before('<div><button class="sa11y-warning-btn" data-tippy-content="' + SoundCloudMessage + '" data-tippy-allowHTML="true">' + WarningIcon + '</button></div>');
        }

        //Warning: Check Google Data Studio widget.
        var dataStudioWarning = $('iframe[src*="datastudio.google.com"]');
        if (dataStudioWarning.length > 0) {
            this.anyWarning = true;
            dataStudioWarning.addClass("sa11y-warning-border");
            dataStudioWarningMessage = "<div class='tippy-heading'>Error</div> Google Data Studio widgets can be problematic for people who use a keyboard to navigate and people who have difficulty perceiving visual content. Please <span class='sa11y-bold'>provide a text alternative</span> immediately below the Data Studio frame."
            dataStudioWarning.before('<div><button class="sa11y-warning-btn" data-tippy-content="' + dataStudioWarningMessage + '" data-tippy-allowHTML="true">' + WarningIcon + '</button></div>');
        }

        //Warning: Discourage use of Twitter timelines.
        let $twitterWarning = $('[id^=twitter-widget]');
        $twitterWarning.each((i, el) => {
            let $el = $(el);
            var numberofTweets = $el.contents().find(".timeline-TweetList-tweet").length;
            if (numberofTweets > 3) {
                this.anyWarning = true;
                $el.addClass("sa11y-text-warning");
                twittererror = "<div class='tippy-heading'>Warning</div> The default Twitter timeline may cause accessibility issues for keyboard users. Secondly, the inline scrolling of the Twitter timeline may cause usability issues for mobile. It's recommended to add the following data attributes to the embed code. <hr aria-hidden='true' class='tippy-tool-hr'><span class='sa11y-bold'>It's recommended to:</span><ul><li>Add <kbd>data-tweet-limit=&#34;2&#34;</kbd> to limit the amount of tweets.</li><li>Add <kbd>data-chrome=&#34;nofooter noheader&#34;</kbd> to remove the widget's header and footer.</li></ul>"
                $el.before('<div><button class="sa11y-link-warning-btn" data-tippy-content="' + twittererror + '" data-tippy-allowHTML="true">' + WarningIcon + '</button></div>');
            }
        });

        // Warn users of TARGET BLANK within main content.
        let $linksTargetBlank = $("a[target='_blank']").not("a[href$='.pdf']").not("a[href$='.docx']").not("#sa11y-container a").not(".sa11y-exclude");
        $linksTargetBlank.each((i, el) => {
            let $el = $(el);

            //Do not add warning if they included new tab or new window within link text.
            var passWordsNewWindow = ["new tab", "new window"];
            var containsPassWordsNewWindow = passWordsNewWindow.some(function (pass) {
                return $el.text().toLowerCase().indexOf(pass) >= 0;
            });

            if ($el && !containsPassWordsNewWindow) {
                this.anyWarning = true;
                $el.addClass("sa11y-text-warning");
                WarningNewTab = "<div class='tippy-heading'>Warning</div> Please use <span class='sa11y-bold'>target=&ldquo;_blank&rdquo;</span> sparingly. Opening links in new tabs or windows can be very disorienting for people, especially for people who have difficulty perceiving visual content. Secondly, it's not always a good practice to control a user's experience or make decisions for them. Alert the user that the link opens in a new window within the link text."
                $el.first().after('<div class="tippy-left-inline"><button class="sa11y-link-warning-btn" data-tippy-content="' + WarningNewTab + '" data-tippy-allowHTML="true">' + WarningIcon + '</button></div>');
            }
        });

        //Error: Find all links pointing to development environment. Customize as needed.
        let $badDevLinks = $("body").find("a[href^='https://www.dev.'], a[href*='wp-admin']");
        $badDevLinks.each((i, el) => {
            let $el = $(el);
            this.noErrors = false;
            $el.addClass("sa11y-link-text-fail");
            BadLinkMessage = "<div class='tippy-heading'>Error</div> Bad link found. Link appears to point to a development environment. Make sure the link does not contain <em>dev</em> or <em>wp-admin</em> in the URL. <hr aria-hidden='true' class='tippy-tool-hr'>This link points to: <br><span class='sa11y-bold sa11y-red-text'>" + el + "</span>"
            $el.after('<div class="tippy-left-inline"><button class="sa11y-error-text-btn" data-tippy-content="' + BadLinkMessage + '" data-tippy-allowHTML="true">' + ErrorIcon + '</button></div>');
        });

        //Warning: Find all PDFs. Although only append warning icon to first PDF on page.
        var checkPDF = $("a[href$='.pdf']");
        let firstPDF = $("a[href$='.pdf']:first");
        if (checkPDF.length > 0) {
            this.anyWarning = true;
            checkPDF.addClass("sa11y-text-warning");
            checkPDF.has("img").removeClass("sa11y-text-warning");
            WarningPDFMessage = "<div class='tippy-heading'>Warning</div> PDF files are considered web content and must be made accessible as well. If this file is a form, consider using Google Forms as an accessible alternative. If this PDF file is a document, consider converting it into a web page instead. Otherwise, please <span class='sa11y-bold'>check file for accessibility in Acrobat DC.</span>"
            firstPDF.after('<div class="tippy-left-inline"><button class="sa11y-link-warning-btn" data-tippy-content="' + WarningPDFMessage + '" data-tippy-allowHTML="true">' + WarningIcon + '</button></div>');
        }

        //Warning: Detect uppercase. For each element, if it contains more than 4 uppercase words than indicate warning. Uppercase word is anything that is more than 3 characters.
        $('h1, h2, h3, h4, h5, h6, p, li:not([class^="sa11y"]), span, blockquote').each(function () {
            var $this = $(this);
            var uppercasePattern = /(?!<a[^>]*?>)([A-Z]{3,})(?![^<]*?<\/a>)/g;
            var detectUpperCase = $this.text().match(uppercasePattern);

            if (detectUpperCase && detectUpperCase.length > 4) {
                this.anyWarning = true;
                var beforePattern = "<span class='sa11y-uppercase-warning'>";
                var afterPattern = "</span>"
                $(this).html($(this).html().replace(uppercasePattern, beforePattern + "$1" + afterPattern));

                UppercaseWarningMessage = "<div class='tippy-heading'>Warning</div>ALL CAPS DETECTED. It is best practice to avoid typing sentences or phrases in ALL CAPITALS. Lengthy segments of capitalized content is more difficult to read and it may seem like you are SHOUTING. Secondly, some screen readers may interpret all capital text as an acronym. <hr class='tippy-tool-hr' aria-hidden='true'> If this word is an acronym, please ignore this warning. But be sure to also provide the expanded form of the acronym at least once on the page."

                $this.before('<div class="tippy-left"><button class="sa11y-link-warning-btn" data-tippy-content="' + UppercaseWarningMessage + '" data-tippy-allowHTML="true">' + WarningIcon + '</button></div>');
            }

        });

        //Check for blockquotes used as headings. If it's less than 25 characters - it's definitely not a quote.
        let $blockquotes = $(this.workingDoc.getElementsByTagName("blockquote"));
        $blockquotes.each((i, el) => {
            let $el = $(el);
            if ($el.text().trim().length < 25) {
                this.noErrors = false;
                $el.addClass("sa11y-error-border")
                BlockquoteError = "<div class='tippy-heading'>Error</div> Blockquotes should be used for quotes only. They should never be used as headings. Please replace with a semantic heading (e.g. Heading 2 or Heading 3)."
                $el.before('<div class="tippy-left"><button class="sa11y-error-text-btn" data-tippy-content="' + BlockquoteError + '" data-tippy-allowHTML="true">' + ErrorIcon + '</button></div>');
            }
        });

        //Check if a table has a table header.
        let $tablesCheck = $("body").find("table");
        $tablesCheck.each((i, el) => {
            let $el = $(el);
            let findTHeaders = $el.find("th");
            let findHeadingTags = $el.find("h1, h2, h3, h4, h5, h6");
            if (findTHeaders.length == 0) {
                this.noErrors = false;
                $el.addClass("sa11y-error-border");
                MissingHeadingsError = "<div class='tippy-heading'>Error</div> Missing table headers! Accessible tables need HTML markup that indicates header cells and data cells which defines their relationship. This information provides context to people who use assistive technology. Tables should be used for tabular data only."
                $el.before('<div class="tippy-left"><button class="sa11y-error-text-btn" data-tippy-content="' + MissingHeadingsError + '" data-tippy-allowHTML="true">' + ErrorIcon + '</button></div>');
            }
            if (findHeadingTags.length > 0) {
                findHeadingTags.addClass("sa11y-headings-fail");
                findHeadingTags.parent().addClass("sa11y-error-border");
                SemanticHeadingTableError = "<div class='tippy-heading'>Error</div> Semantic headings such as Heading 2 or Heading 3 should only be used for sections of content; <span class='sa11y-bold'>not</span> in HTML tables. Indicate table headings using the <span class='sa11y-bold'>th</span> element instead."
                findHeadingTags.before('<div class="tippy-left"><button class="sa11y-error-text-btn" data-tippy-content="' + SemanticHeadingTableError + '" data-tippy-allowHTML="true">' + ErrorIcon + '</button></div>');
            }
        });

        //Make sure all table headers are not empty.
        let $thCheck = $(this.workingDoc.getElementsByTagName("th"));
        $thCheck.each((i, el) => {
            let $el = $(el);
            if ($el.text().trim().length < 1) {
                $el.addClass("sa11y-error-border");
                EmptyTableHeaderError = "<div class='tippy-heading'>Error</div> Empty table header found! Table headers should <em>never</em> be empty. It is important to designate row and/or column headers to convey their relationship. This information provides context to people who use assistive technology. Please keep in mind that tables should be used for tabular data only."
                $el.append('<div class="tippy-left"><button class="sa11y-error-text-btn" data-tippy-content="' + EmptyTableHeaderError + '" data-tippy-allowHTML="true">' + ErrorIcon + '</button></div>');
            }
        });

        //Error: Check for duplicate IDs.
        var ids = {};
        var found = false;
        $('[id]').each(function () {
            if (this.id && ids[this.id]) {
                found = true;
                this.noErrors = false;
                $(this).addClass("sa11y-link-text-fail");
                duplicateIDMessage = "<div class='tippy-heading'>Error</div> Found <span class='sa11y-bold'>duplicate ID</span>. Duplicate ID errors are known to cause problems for assistive technologies when they are trying to interact with content. <hr aria-hidden='true' class='tippy-tool-hr'>Please remove or change the following ID: <span class='sa11y-bold sa11y-red-text'>" + this.id + "</span>"
                $(this).before('<div class="tippy-left-inline"><button class="sa11y-error-text-btn" data-tippy-content="' + duplicateIDMessage + '" data-tippy-allowHTML="true">' + ErrorIcon + '</button></div>');
            }
            ids[this.id] = 1;
        });

        //Error: Missing language tag. Lang should be at least 2 characters.
        var lang = $("html").attr("lang");
        if ($("html").attr("lang") == undefined || $("html").attr("lang").length < 2) {
            this.noErrors = false;
            $('#sa11y-container').after("<div class='sa11y-error-message'>" + ErrorIcon + "<br> Page language not declared! Please <a href='https://www.w3.org/International/questions/qa-html-language-declarations' target='_blank'>declare language on HTML tag.<span class='sr-only'>(opens new window)</span></a></div>");
        }

        //Error: Missing language tag.
        var userScalable = $("meta").attr("user-scalable");
        if (userScalable == "no" || userScalable == "0" || $("meta[content~='user-scalable=no']").length > 0) {
            this.noErrors = false;
            $('#sa11y-container').after("<div class='sa11y-error-message'>" + ErrorIcon + "<br> Remove <span class='sa11y-bold'>user-scalable=&quot;no&quot;</span> paramater from the meta element to allow zooming. This can be very problematic for people with low vision!</div>");
        }

        var checkAnnouncement = $('.announcement-component').length;
        if (checkAnnouncement > 1) {
            this.anyWarning = true;
            WarningMessageAnnounce = "<div class='tippy-heading'>Warning</div> More than one <strong>Announcement component</strong> found! The Announcement component should be used strategically and sparingly. It should be used to get attention or warn users about something important. Misuse of this component makes it less effective or impactful. This component is semantically labeled as an Announcement for people who use screen readers."
            $('.announcement-component:gt(0)').addClass("sa11y-warning-border");
            $('.announcement-component:gt(0)').before('<div class="tippy-left"><button class="sa11y-link-warning-btn" data-tippy-content="' + WarningMessageAnnounce + '" data-tippy-allowHTML="true">' + WarningIcon + '</button></div>');
        }

    }

    /*========================== Styling ============================*/
    var style = document.createElement('style');
    style.innerHTML = '@import url("https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap");button.sa11y-error-btn{font-size:0!important;width:50px!important;height:50px!important;border-radius:50%!important;position:absolute!important;margin:10px!important;z-index:8888!important;border:1px solid #d30017!important;display:inline-flex!important;padding:12px!important;vertical-align:middle!important;background-color:#d30017!important;background:#d30017!important;cursor:pointer!important;-moz-box-shadow:0 0 16px 0 #0000004f!important;-webkit-box-shadow:0 0 16px 0 #0000004f!important;box-shadow:0 0 16px 0 #0000004f!important;transition:all .2s ease-in-out!important;min-width:0!important}button.sa11y-error-btn:hover,button.sa11y-error-btn:focus{background-color:#ff0000!important}button.sa11y-error-btn:focus{box-shadow:inset 0 0 0 2px #d30017!important;-moz-box-shadow:inset 0 0 0 2px #d30017!important;-webkit-box-shadow:inset 0 0 0 2px #d30017!important;outline:0}button.sa11y-pass-btn{font-size:0!important;width:50px!important;height:50px!important;border-radius:50%!important;border: 1px solid #36844e!important;important;margin:10px!important;position:absolute!important;z-index:8888!important;padding:12px!important;vertical-align:middle!important;background-color:#36844e!important;background:#36844e!important;cursor:pointer!important;-webkit-box-shadow:0 0 16px 0 #0000004f!important;-moz-box-shadow:0 0 16px 0 #0000004f!important;box-shadow:0 0 16px 0 #0000004f!important;transition:all .2s ease-in-out!important;min-width:0!important}button.sa11y-text-pass-btn{font-size:0!important;width:50px!important;height:50px!important;border-radius:50%!important;border:none!important;position:absolute!important;margin:-30px 10px!important;z-index:8888!important;padding:0px!important;vertical-align:middle!important;background-color:#36844e!important;background:#36844e!important;cursor:pointer!important;-webkit-box-shadow:0 0 16px 0 #0000004f!important;-moz-box-shadow:0 0 16px 0 #0000004f!important;box-shadow:0 0 16px 0 #0000004f!important;transition:all .2s ease-in-out!important;min-width:0!important}button.sa11y-text-pass-btn:hover,button.sa11y-pass-btn:hover,button.sa11y-pass-btn:focus,button.sa11y-text-pass-btn:focus{background-color:#38a459!important}button.sa11y-pass-btn:focus,button.sa11y-text-pass-btn:focus{box-shadow:inset 0 0 0 2px #36844e!important;-moz-box-shadow:inset 0 0 0 2px #36844e!important;-webkit-box-shadow:inset 0 0 0 2px #36844e!important;outline:0}button.sa11y-warning-btn{font-size:0!important;margin:10px!important;padding:10px!important;width:50px!important;height:50px!important;border-radius:50%!important;border: 1px solid #ffc800!important;important;position:absolute!important;z-index:8888!important;vertical-align:middle!important;background-color:#ffc800!important;background:#ffc800!important;-moz-box-shadow:0 0 16px 0 #0000004f!important;-webkit-box-shadow:0 0 16px 0 #0000004f!important;box-shadow:0 0 16px 0 #0000004f!important;cursor:pointer!important;transition:all .2s ease-in-out!important;min-width:0!important}button.sa11y-warning-btn:focus,button.sa11y-warning-btn:hover{background-color:#ffd042!important}button.sa11y-warning-btn:focus{box-shadow:inset 0 0 0 2px #ffc800!important;-moz-box-shadow:inset 0 0 0 2px #ffc800!important;-webkit-box-shadow:inset 0 0 0 2px #ffc800!important;outline:0}button.sa11y-link-warning-btn{font-size:0!important;padding:0px!important;width:50px!important;height:50px!important;border-radius:50%!important;border:1px solid #ffc800!important;position:absolute!important;margin:-30px 10px!important;z-index:8888!important;vertical-align:middle!important;background-color:#ffc800!important;background:#ffc800!important;-moz-box-shadow:0 0 16px 0 #0000004f!important;-webkit-box-shadow:0 0 16px 0 #0000004f!important;box-shadow:0 0 16px 0 #0000004f!important;cursor:pointer!important;transition:all .2s ease-in-out!important;min-width:0!important}button.sa11y-link-warning-btn:focus,button.sa11y-link-warning-btn:hover{background-color:#ffd226!important}button.sa11y-link-warning-btn:focus{box-shadow:inset 0 0 0 2px #ffc800!important;-moz-box-shadow:inset 0 0 0 2px #ffc800!important;-webkit-box-shadow:inset 0 0 0 2px #ffc800!important;outline:0}button.sa11y-error-text-btn{font-size:0!important;width:50px!important;height:50px!important;margin:-30px 10px!important;border-radius:50%!important;border:1px solid #d30017!important;position:absolute!important;z-index:8888!important;padding:0px!important;vertical-align:middle!important;background-color:#d30017!important;background:#d30017!important;cursor:pointer!important;-moz-box-shadow:0 0 16px 0 #0000004f!important;-webkit-box-shadow:0 0 16px 0 #0000004f!important;box-shadow:0 0 16px 0 #0000004f!important;transition:all .2s ease-in-out!important;min-width:0!important}button.sa11y-error-text-btn:hover,button.sa11y-error-text-btn:focus{background-color:#ff0000!important}button.sa11y-error-text-btn:focus{box-shadow:inset 0 0 0 2px #d30017!important;-moz-box-shadow:inset 0 0 0 2px #d30017!important;-webkit-box-shadow:inset 0 0 0 2px #d30017!important;outline:0}.sa11y-headings-fail{color:#c22326!important}.sa11y-error-border{border-color:#c22326!important;border-style:solid!important;border-radius:0em!important;border-width:5px!important}.sa11y-link-text-fail{background-color:#c22326!important;border-radius:0.25em!important;padding:5px!important;color:white!important}.sa11y-text-warning,.sa11y-uppercase-warning{color:black!important;background-color:#ffc800!important;border-radius:0.25em!important;padding:5px!important}.sa11y-warning-border{border-color:#ffc800!important;border-style:solid!important;border-width:5px!important;border-radius:0em!important}#sa11y-container svg,.sa11y-link-warning-btn svg{overflow:hidden!important;vertical-align:middle!important}#sa11y-container .sa11y-panel{font-family:"Roboto",sans-serif!important;z-index:8890;background:#fff;box-shadow:0 0 20px 4px rgba(154,161,177,.15),0 4px 80px -8px rgba(36,40,47,.25),0 4px 4px -2px rgba(91,94,105,.15);position:fixed;bottom:60px;right:55px;width:310px;text-align:left!important;overflow:hidden;transform:scale(0);transform-origin:100% 100%;border-radius:.25em;opacity:0;transition:transform .2s,opacity .2s}#sa11y-container .sa11y-panel a{text-decoration:underline!important;color:#004c9b!important;border-bottom:0px!important}#sa11y-container .sa11y-panel a:hover,#sa11y-container .sa11y-panel a:focus{text-decoration:none!important}#sa11y-container .sa11y-panel.sa11y-active{height:auto;opacity:1;visibility:visible;transform:scale(1);transition:transform .2s,opacity .2s}#sa11y-container .sa11y-panel-header{padding:15px 15px 15px 15px!important;color:#4d4d4d!important;line-height:22px!important}#sa11y-container .sa11y-outline-header{padding:10px 15px 0 15px!important;color:#4d4d4d!important;line-height:22px!important}.sa11y-bold{font-weight:700!important}#page-outline-header{font-size:16px!important}#sa11y-no-errors,#sa11y-warnings,#sa11y-errors-found,#sa11y-page-outline{opacity:0;display:none}#sa11y-no-errors.sa11y-active,#sa11y-warnings.sa11y-active,#sa11y-errors-found.sa11y-active,#sa11y-page-outline.sa11y-active,#sa11y-summary-toggle.sa11y-active{opacity:1;display:table}#sa11y-page-outline{padding-bottom:0px!important;width:100%;transition:all .60s ease}#sa11y-container .sa11y-th-img svg{margin:5px 15px 0 0}#sa11y-container .sa11y-hide-native-checkbox{position:fixed;bottom:45px;right:30px;width:1px;height:1px;overflow:hidden;margin:0;padding:0;border:0;outline:0;-ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";filter:alpha(opacity=0);opacity:0}#sa11y-container .sa11y-main-toggle-style{position:fixed!important;bottom:50px!important;right:30px!important;background-color:#4b4b4b!important;color:#fff!important;border-radius:50px!important;box-shadow:2px 2px 20px #0000005c!important;-moz-box-shadow:2px 2px 20px #0000005c!important;-webkit-box-shadow:2px 2px 20px #0000005c!important;cursor:pointer!important;padding:10px!important;margin:0px!important;z-index:99999!important;transition:all .2s ease-in-out}#sa11y-container .sa11y-main-toggle-style:hover,#sa11y-container .sa11y-toggle-active{background-color:#0077C8!important}label.sa11y-main-toggle-style:after{content:none!important;}#sa11y-container .allytogglefocus{transform:scale(1.1);background-color:#0077c8!important}.sa11y-warning-message{font-family:"Roboto",sans-serif;font-size:16px!important;padding:15px;background-color:#ffc802;text-align:center;color:#4b4b4b;border-radius:0em!important}.sa11y-error-message{font-family:"Roboto",sans-serif;font-size:16px!important;padding:15px;background-color:#c22326!important;text-align:center;color:#fff}.sa11y-error-message a{color:#fff!important;text-decoration:underline!important;border:0!important}.sa11y-error-message a:hover,.sa11y-error-message a:focus{text-decoration:none!important}.sa11y-pass-message{font-family:"Roboto",sans-serif;font-size:16px!important;padding:15px;background-color:#35844e;text-align:center;color:#fff;border-radius:0em!important}@-webkit-keyframes rotate{0%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}100%{border:4px solid rgba(255,255,255,.05)}}@keyframes rotate{0%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}100%{border:4px solid rgba(255,255,255,.05)}}#sa11y-container .loading-spinner:before{content:"";position:absolute;display:inline-block;box-sizing:border-box;width:100%;height:100%;border-radius:50%;margin:-10px;border:4px solid rgba(255,255,255,.9);border-top:4px solid transparent;border-bottom:4px solid transparent;-webkit-animation:rotate 2s ease;animation:rotate 2s ease;animation-fill-mode:forwards}.sr-only{position:absolute;clip:rect(1px,1px,1px,1px);padding:0;border:0;height:1px;width:1px;overflow:hidden;display:block;white-space:nowrap;clip-path:inset(50%)}#sa11y-container .sa11y-td-msg{vertical-align:middle;display:table-cell;font-size:16px!important}#sa11y-container .sa11y-th-img{vertical-align:middle;display:table-cell}.sa11y-red-text,.sa11y-red-text strong{color:#ba0013!important;font-family:"Roboto",sans-serif!important;font-size:15px!important}#sa11y-outline-list .sa11y-outline-2{margin-left:15px!important}#sa11y-outline-list .sa11y-outline-3{margin-left:30px!important}#sa11y-outline-list .sa11y-outline-4{margin-left:45px!important}#sa11y-outline-list .sa11y-outline-5{margin-left:60px!important}.sa11y-outline-6{margin-left:75px!important}#sa11y-outline-list{list-style-type:none!important;margin:0!important;padding:0 0 10px 0px!important;outline:0!important;max-height:350px!important;overflow-y:auto!important;border-bottom:1px solid #dbdbdbbf!important}#sa11y-outline-list li,#sa11y-outline-list ul{padding:0!important;font-size:15px!important}::-webkit-scrollbar{-webkit-appearance:none;width:7px}::-webkit-scrollbar-thumb{border-radius:5px;background-color:rgba(0,0,0,.5);-webkit-box-shadow:0 0 1px rgba(255,255,255,.5)}#sa11y-summary-toggle{opacity:0;display:none;border-radius:0!important;background-color:#f6f6f6!important;background:#f6f6f6!important;width:100%!important;padding:0px!important;margin:0px!important;color:#4d4d4d!important;font-size:15px!important;border-bottom:0!important;border-top:1px solid #d7d7d7!important;border-left:0!important;border-right:0!important;outline:0!important;cursor:pointer!important;font-weight:400!important;height:30px!important;line-height:0!important}button#sa11y-summary-toggle:focus,button#sa11y-summary-toggle:hover{box-shadow:inset 0 0 6px #0077C8;background:#e1e1e1}.sa11y-btn-active{box-shadow:inset 0 0 5px #0000002e}.sa11y-popover-toggle{display:inline-block}span.sa11y-headings-label{font-size:15px!important;padding:3px!important;border-radius:3px!important;position:absolute!important;background-color:#777678!important;color:white!important;margin:-5px 0 0 5px!important;font-family:"Roboto",sans-serif!important;}';
    $('head').prepend(style);

    /* Custom Tippy Style */
    var tippystyle = document.createElement('style');
    tippystyle.innerHTML = '.tippy-touch{cursor:pointer!important}.tippy-notransition{-webkit-transition:none!important;transition:none!important}.tippy-heading{font-size:17px!important;font-weight:700!important;padding-bottom:5px}.tippy-popper{max-width:350px!important;-webkit-perspective:800px;perspective:800px;z-index:9999;outline:0;-webkit-transition-timing-function:cubic-bezier(.165,.84,.44,1);transition-timing-function:cubic-bezier(.165,.84,.44,1)}.tippy-left{text-align:left!important;}.tippy-left-inline{text-align:left!important;display:inline-block!important}.tippy-popper ul{padding-left:20px!important}.tippy-popper kbd{padding:1px 2px!important;font-size:14px!important;color:#fff!important;background-color:#212529!important;border-radius:3px!important;font-family:SFMono-Regular,Menlo,"Courier New",monospace!important}.tippy-popper.html-template{max-width:96%;max-width:calc(100% - 20px)}.tippy-popper[x-placement^=top] [x-arrow]{border-top:7px solid #333;border-right:7px solid transparent;border-left:7px solid transparent;bottom:-7px;margin:0 9px}.tippy-popper[x-placement^=top] [x-arrow].arrow-small{border-top:5px solid #333;border-right:5px solid transparent;border-left:5px solid transparent;bottom:-5px}.tippy-popper[x-placement^=top] [x-arrow].arrow-big{border-top:10px solid #333;border-right:10px solid transparent;border-left:10px solid transparent;bottom:-10px}.tippy-popper[x-placement^=top] [x-circle]{-webkit-transform-origin:0 33%;transform-origin:0 33%}.tippy-popper[x-placement^=top] [x-circle].enter{-webkit-transform:scale(1) translate(-50%,-55%);transform:scale(1) translate(-50%,-55%);opacity:1}.tippy-popper[x-placement^=top] [x-circle].leave{-webkit-transform:scale(.15) translate(-50%,-50%);transform:scale(.15) translate(-50%,-50%);opacity:0}.tippy-popper[x-placement^=top] .tippy-tooltip.light-theme [x-circle]{background-color:#fff}.tippy-popper[x-placement^=top] .tippy-tooltip.light-theme [x-arrow]{border-top:7px solid #fff;border-right:7px solid transparent;border-left:7px solid transparent}.tippy-popper[x-placement^=top] .tippy-tooltip.light-theme [x-arrow].arrow-small{border-top:5px solid #fff;border-right:5px solid transparent;border-left:5px solid transparent}.tippy-popper[x-placement^=top] .tippy-tooltip.light-theme [x-arrow].arrow-big{border-top:10px solid #fff;border-right:10px solid transparent;border-left:10px solid transparent}.tippy-popper[x-placement^=top] .tippy-tooltip.transparent-theme [x-circle]{background-color:rgba(0,0,0,.7)}.tippy-popper[x-placement^=top] .tippy-tooltip.transparent-theme [x-arrow]{border-top:7px solid rgba(0,0,0,.7);border-right:7px solid transparent;border-left:7px solid transparent}.tippy-popper[x-placement^=top] .tippy-tooltip.transparent-theme [x-arrow].arrow-small{border-top:5px solid rgba(0,0,0,.7);border-right:5px solid transparent;border-left:5px solid transparent}.tippy-popper[x-placement^=top] .tippy-tooltip.transparent-theme [x-arrow].arrow-big{border-top:10px solid rgba(0,0,0,.7);border-right:10px solid transparent;border-left:10px solid transparent}.tippy-popper[x-placement^=top] [data-animation=perspective]{-webkit-transform-origin:bottom;transform-origin:bottom}.tippy-popper[x-placement^=top] [data-animation=perspective].enter{opacity:1;-webkit-transform:translateY(-10px) rotateX(0);transform:translateY(-10px) rotateX(0)}.tippy-popper[x-placement^=top] [data-animation=perspective].leave{opacity:0;-webkit-transform:translateY(0) rotateX(90deg);transform:translateY(0) rotateX(90deg)}.tippy-popper[x-placement^=top] [data-animation=fade].enter{opacity:1;-webkit-transform:translateY(-10px);transform:translateY(-10px)}.tippy-popper[x-placement^=top] [data-animation=fade].leave{opacity:0;-webkit-transform:translateY(-10px);transform:translateY(-10px)}.tippy-popper[x-placement^=top] [data-animation=shift].enter{opacity:1;-webkit-transform:translateY(-10px);transform:translateY(-10px)}.tippy-popper[x-placement^=top] [data-animation=shift].leave{opacity:0;-webkit-transform:translateY(0);transform:translateY(0)}.tippy-popper[x-placement^=top] [data-animation=scale].enter{opacity:1;-webkit-transform:translateY(-10px) scale(1);transform:translateY(-10px) scale(1)}.tippy-popper[x-placement^=top] [data-animation=scale].leave{opacity:0;-webkit-transform:translateY(0) scale(0);transform:translateY(0) scale(0)}.tippy-popper[x-placement^=bottom] [x-arrow]{border-bottom:7px solid #333;border-right:7px solid transparent;border-left:7px solid transparent;top:-7px;margin:0 9px}.tippy-popper[x-placement^=bottom] [x-arrow].arrow-small{border-bottom:5px solid #333;border-right:5px solid transparent;border-left:5px solid transparent;top:-5px}.tippy-popper[x-placement^=bottom] [x-arrow].arrow-big{border-bottom:10px solid #333;border-right:10px solid transparent;border-left:10px solid transparent;top:-10px}.tippy-popper[x-placement^=bottom] [x-circle]{-webkit-transform-origin:0 -50%;transform-origin:0 -50%}.tippy-popper[x-placement^=bottom] [x-circle].enter{-webkit-transform:scale(1) translate(-50%,-45%);transform:scale(1) translate(-50%,-45%);opacity:1}.tippy-popper[x-placement^=bottom] [x-circle].leave{-webkit-transform:scale(.15) translate(-50%,-5%);transform:scale(.15) translate(-50%,-5%);opacity:0}.tippy-popper[x-placement^=bottom] .tippy-tooltip.light-theme [x-circle]{background-color:#fff}.tippy-popper[x-placement^=bottom] .tippy-tooltip.light-theme [x-arrow]{border-bottom:7px solid #fff;border-right:7px solid transparent;border-left:7px solid transparent}.tippy-popper[x-placement^=bottom] .tippy-tooltip.light-theme [x-arrow].arrow-small{border-bottom:5px solid #fff;border-right:5px solid transparent;border-left:5px solid transparent}.tippy-popper[x-placement^=bottom] .tippy-tooltip.light-theme [x-arrow].arrow-big{border-bottom:10px solid #fff;border-right:10px solid transparent;border-left:10px solid transparent}.tippy-popper[x-placement^=bottom] .tippy-tooltip.transparent-theme [x-circle]{background-color:rgba(0,0,0,.7)}.tippy-popper[x-placement^=bottom] .tippy-tooltip.transparent-theme [x-arrow]{border-bottom:7px solid rgba(0,0,0,.7);border-right:7px solid transparent;border-left:7px solid transparent}.tippy-popper[x-placement^=bottom] .tippy-tooltip.transparent-theme [x-arrow].arrow-small{border-bottom:5px solid rgba(0,0,0,.7);border-right:5px solid transparent;border-left:5px solid transparent}.tippy-popper[x-placement^=bottom] .tippy-tooltip.transparent-theme [x-arrow].arrow-big{border-bottom:10px solid rgba(0,0,0,.7);border-right:10px solid transparent;border-left:10px solid transparent}.tippy-popper[x-placement^=bottom] [data-animation=perspective]{-webkit-transform-origin:top;transform-origin:top}.tippy-popper[x-placement^=bottom] [data-animation=perspective].enter{opacity:1;-webkit-transform:translateY(10px) rotateX(0);transform:translateY(10px) rotateX(0)}.tippy-popper[x-placement^=bottom] [data-animation=perspective].leave{opacity:0;-webkit-transform:translateY(0) rotateX(-90deg);transform:translateY(0) rotateX(-90deg)}.tippy-popper[x-placement^=bottom] [data-animation=fade].enter{opacity:1;-webkit-transform:translateY(10px);transform:translateY(10px)}.tippy-popper[x-placement^=bottom] [data-animation=fade].leave{opacity:0;-webkit-transform:translateY(10px);transform:translateY(10px)}.tippy-popper[x-placement^=bottom] [data-animation=shift].enter{opacity:1;-webkit-transform:translateY(10px);transform:translateY(10px)}.tippy-popper[x-placement^=bottom] [data-animation=shift].leave{opacity:0;-webkit-transform:translateY(0);transform:translateY(0)}.tippy-popper[x-placement^=bottom] [data-animation=scale].enter{opacity:1;-webkit-transform:translateY(10px) scale(1);transform:translateY(10px) scale(1)}.tippy-popper[x-placement^=bottom] [data-animation=scale].leave{opacity:0;-webkit-transform:translateY(0) scale(0);transform:translateY(0) scale(0)}.tippy-popper[x-placement^=left] [x-arrow]{border-left:7px solid #333;border-top:7px solid transparent;border-bottom:7px solid transparent;right:-7px;margin:6px 0}.tippy-popper[x-placement^=left] [x-arrow].arrow-small{border-left:5px solid #333;border-top:5px solid transparent;border-bottom:5px solid transparent;right:-5px}.tippy-popper[x-placement^=left] [x-arrow].arrow-big{border-left:10px solid #333;border-top:10px solid transparent;border-bottom:10px solid transparent;right:-10px}.tippy-popper[x-placement^=left] [x-circle]{-webkit-transform-origin:50% 0;transform-origin:50% 0}.tippy-popper[x-placement^=left] [x-circle].enter{-webkit-transform:scale(1) translate(-50%,-50%);transform:scale(1) translate(-50%,-50%);opacity:1}.tippy-popper[x-placement^=left] [x-circle].leave{-webkit-transform:scale(.15) translate(-50%,-50%);transform:scale(.15) translate(-50%,-50%);opacity:0}.tippy-popper[x-placement^=left] .tippy-tooltip.light-theme [x-circle]{background-color:#fff}.tippy-popper[x-placement^=left] .tippy-tooltip.light-theme [x-arrow]{border-left:7px solid #fff;border-top:7px solid transparent;border-bottom:7px solid transparent}.tippy-popper[x-placement^=left] .tippy-tooltip.light-theme [x-arrow].arrow-small{border-left:5px solid #fff;border-top:5px solid transparent;border-bottom:5px solid transparent}.tippy-popper[x-placement^=left] .tippy-tooltip.light-theme [x-arrow].arrow-big{border-left:10px solid #fff;border-top:10px solid transparent;border-bottom:10px solid transparent}.tippy-popper[x-placement^=left] .tippy-tooltip.transparent-theme [x-circle]{background-color:rgba(0,0,0,.7)}.tippy-popper[x-placement^=left] .tippy-tooltip.transparent-theme [x-arrow]{border-left:7px solid rgba(0,0,0,.7);border-top:7px solid transparent;border-bottom:7px solid transparent}.tippy-popper[x-placement^=left] .tippy-tooltip.transparent-theme [x-arrow].arrow-small{border-left:5px solid rgba(0,0,0,.7);border-top:5px solid transparent;border-bottom:5px solid transparent}.tippy-popper[x-placement^=left] .tippy-tooltip.transparent-theme [x-arrow].arrow-big{border-left:10px solid rgba(0,0,0,.7);border-top:10px solid transparent;border-bottom:10px solid transparent}.tippy-popper[x-placement^=left] [data-animation=perspective]{-webkit-transform-origin:right;transform-origin:right}.tippy-popper[x-placement^=left] [data-animation=perspective].enter{opacity:1;-webkit-transform:translateX(-10px) rotateY(0);transform:translateX(-10px) rotateY(0)}.tippy-popper[x-placement^=left] [data-animation=perspective].leave{opacity:0;-webkit-transform:translateX(0) rotateY(-90deg);transform:translateX(0) rotateY(-90deg)}.tippy-popper[x-placement^=left] [data-animation=fade].enter{opacity:1;-webkit-transform:translateX(-10px);transform:translateX(-10px)}.tippy-popper[x-placement^=left] [data-animation=fade].leave{opacity:0;-webkit-transform:translateX(-10px);transform:translateX(-10px)}.tippy-popper[x-placement^=left] [data-animation=shift].enter{opacity:1;-webkit-transform:translateX(-10px);transform:translateX(-10px)}.tippy-popper[x-placement^=left] [data-animation=shift].leave{opacity:0;-webkit-transform:translateX(0);transform:translateX(0)}.tippy-popper[x-placement^=left] [data-animation=scale].enter{opacity:1;-webkit-transform:translateX(-10px) scale(1);transform:translateX(-10px) scale(1)}.tippy-popper[x-placement^=left] [data-animation=scale].leave{opacity:0;-webkit-transform:translateX(0) scale(0);transform:translateX(0) scale(0)}.tippy-popper[x-placement^=right] [x-arrow]{border-right:7px solid #333;border-top:7px solid transparent;border-bottom:7px solid transparent;left:-7px;margin:6px 0}.tippy-popper[x-placement^=right] [x-arrow].arrow-small{border-right:5px solid #333;border-top:5px solid transparent;border-bottom:5px solid transparent;left:-5px}.tippy-popper[x-placement^=right] [x-arrow].arrow-big{border-right:10px solid #333;border-top:10px solid transparent;border-bottom:10px solid transparent;left:-10px}.tippy-popper[x-placement^=right] [x-circle]{-webkit-transform-origin:-50% 0;transform-origin:-50% 0}.tippy-popper[x-placement^=right] [x-circle].enter{-webkit-transform:scale(1) translate(-50%,-50%);transform:scale(1) translate(-50%,-50%);opacity:1}.tippy-popper[x-placement^=right] [x-circle].leave{-webkit-transform:scale(.15) translate(-50%,-50%);transform:scale(.15) translate(-50%,-50%);opacity:0}.tippy-popper[x-placement^=right] .tippy-tooltip.light-theme [x-circle]{background-color:#fff}.tippy-popper[x-placement^=right] .tippy-tooltip.light-theme [x-arrow]{border-right:7px solid #fff;border-top:7px solid transparent;border-bottom:7px solid transparent}.tippy-popper[x-placement^=right] .tippy-tooltip.light-theme [x-arrow].arrow-small{border-right:5px solid #fff;border-top:5px solid transparent;border-bottom:5px solid transparent}.tippy-popper[x-placement^=right] .tippy-tooltip.light-theme [x-arrow].arrow-big{border-right:10px solid #fff;border-top:10px solid transparent;border-bottom:10px solid transparent}.tippy-popper[x-placement^=right] .tippy-tooltip.transparent-theme [x-circle]{background-color:rgba(0,0,0,.7)}.tippy-popper[x-placement^=right] .tippy-tooltip.transparent-theme [x-arrow]{border-right:7px solid rgba(0,0,0,.7);border-top:7px solid transparent;border-bottom:7px solid transparent}.tippy-popper[x-placement^=right] .tippy-tooltip.transparent-theme [x-arrow].arrow-small{border-right:5px solid rgba(0,0,0,.7);border-top:5px solid transparent;border-bottom:5px solid transparent}.tippy-popper[x-placement^=right] .tippy-tooltip.transparent-theme [x-arrow].arrow-big{border-right:10px solid rgba(0,0,0,.7);border-top:10px solid transparent;border-bottom:10px solid transparent}.tippy-popper[x-placement^=right] [data-animation=perspective]{-webkit-transform-origin:left;transform-origin:left}.tippy-popper[x-placement^=right] [data-animation=perspective].enter{opacity:1;-webkit-transform:translateX(10px) rotateY(0);transform:translateX(10px) rotateY(0)}.tippy-popper[x-placement^=right] [data-animation=perspective].leave{opacity:0;-webkit-transform:translateX(0) rotateY(90deg);transform:translateX(0) rotateY(90deg)}.tippy-popper[x-placement^=right] [data-animation=fade].enter{opacity:1;-webkit-transform:translateX(10px);transform:translateX(10px)}.tippy-popper[x-placement^=right] [data-animation=fade].leave{opacity:0;-webkit-transform:translateX(10px);transform:translateX(10px)}.tippy-popper[x-placement^=right] [data-animation=shift].enter{opacity:1;-webkit-transform:translateX(10px);transform:translateX(10px)}.tippy-popper[x-placement^=right] [data-animation=shift].leave{opacity:0;-webkit-transform:translateX(0);transform:translateX(0)}.tippy-popper[x-placement^=right] [data-animation=scale].enter{opacity:1;-webkit-transform:translateX(10px) scale(1);transform:translateX(10px) scale(1)}.tippy-popper[x-placement^=right] [data-animation=scale].leave{opacity:0;-webkit-transform:translateX(0) scale(0);transform:translateX(0) scale(0)}.tippy-popper .tippy-tooltip.transparent-theme{background-color:rgba(0,0,0,.7)}.tippy-popper .tippy-tooltip.transparent-theme[data-animatefill]{background-color:transparent}.tippy-popper .tippy-tooltip.light-theme{color:#26323d;box-shadow:0 4px 20px 4px rgba(0,20,60,.1),0 4px 80px -8px rgba(0,20,60,.2);background-color:#fff}.tippy-popper .tippy-tooltip.light-theme[data-animatefill]{background-color:transparent}.tippy-tooltip{font-family:"Roboto",sans-serif!important;position:relative;color:#fff;border-radius:4px;font-size:15px!important;padding:16px!important;text-align:left!important;will-change:transform;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;background-color:#333;pointer-events:none}.tippy-tool-hr{margin-top:10px!important;margin-bottom:10px!important;border:0!important;border-top:1px solid rgba(0,0,0,.1)!important}.tippy-tooltip--small{padding:.25rem .5rem;font-size:.8rem}.tippy-tooltip--big{padding:.6rem 1.2rem;font-size:1.2rem}.tippy-tooltip[data-animatefill]{overflow:hidden;background-color:transparent}.tippy-tooltip[data-interactive]{pointer-events:auto}.tippy-tooltip[data-inertia]{-webkit-transition-timing-function:cubic-bezier(.53,1,.36,.85);transition-timing-function:cubic-bezier(.53,2,.36,.85)}.tippy-tooltip [x-arrow]{position:absolute;width:0;height:0}.tippy-tooltip [x-circle]{position:absolute;will-change:transform;background-color:#333;border-radius:50%;width:130%;width:calc(110% + 2rem);left:50%;top:50%;z-index:-1;overflow:hidden;-webkit-transition:all ease;transition:all ease}.tippy-tooltip [x-circle]:before{content:"";padding-top:90%;float:left}@media (max-width:450px){.tippy-popper{max-width:96%;max-width:calc(100% - 20px)}}.tippy-tooltip.light-theme{color:#26323d;box-shadow:0 0 20px 4px rgba(154,161,177,.15),0 4px 80px -8px rgba(36,40,47,.25),0 4px 4px -2px rgba(91,94,105,.15);background-color:#fff}.tippy-tooltip.light-theme[x-placement^=top] .tippy-arrow{border-top:8px solid #fff;border-right:8px solid transparent;border-left:8px solid transparent}.tippy-tooltip.light-theme[x-placement^=bottom] .tippy-arrow{border-bottom:8px solid #fff;border-right:8px solid transparent;border-left:8px solid transparent}.tippy-tooltip.light-theme[x-placement^=left] .tippy-arrow{border-left:8px solid #fff;border-top:8px solid transparent;border-bottom:8px solid transparent}.tippy-tooltip.light-theme[x-placement^=right] .tippy-arrow{border-right:8px solid #fff;border-top:8px solid transparent;border-bottom:8px solid transparent}.tippy-tooltip.light-theme .tippy-backdrop{background-color:#fff}.tippy-tooltip.light-theme .tippy-roundarrow{fill:#fff}.tippy-tooltip.light-theme[data-animatefill]{background-color:initial}';
    $('head').prepend(tippystyle);


    //Add focus state to main toggle button to accommodate custom checkbox button.
    $('input#sa11y-checkbox').on("focus", function () {
        var allyCheckInput = $(this);
        var allyLabelClass = $('.sa11y-main-toggle-style')
        allyLabelClass.addClass('allytogglefocus');
        allyCheckInput.on("blur", function () {
            allyLabelClass.removeClass('allytogglefocus');
            allyCheckInput.off("blur");
        });
    });

} //End of function sa11y()


/*===============================================================
Sa11y - Accessibility checker adapted from Tota11y by Khan Academy.

    Adam Chaboryk, IT Accessibility Specialist, Ryerson University
    Benjamin Luong, Web Accessibility Assistant, Ryerson University
    Arshad Mohammed, Web Accessibility Assistant, Ryerson University

Licensing:
Copyright (c) 2019 Ryerson University

Various parts of Sa11y is adapted from https://github.com/Khan/tota11y

MIT License (MIT)
Copyright (c) 2016 Khan Academy
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

Icons: Font Awesome for the SVG icons. See https://fontawesome.com/license/free
===============================================================*/
