! function(t, e) {
  "object" == typeof exports && "undefined" != typeof module ? e(exports) : "function" == typeof define && define.amd ? define(["exports"], e) : e(t.echarts = {})
}(this, function(t) {
  "use strict";

  function e(t) {
    var e = {},
      n = {},
      i = t.match(/Firefox\/([\d.]+)/),
      r = t.match(/MSIE\s([\d.]+)/) || t.match(/Trident\/.+?rv:(([\d.]+))/),
      a = t.match(/Edge\/([\d.]+)/),
      o = /micromessenger/i.test(t);
    return i && (n.firefox = !0, n.version = i[1]), r && (n.ie = !0, n.version = r[1]), a && (n.edge = !0, n.version = a[1]), o && (n.weChat = !0), {
      browser: n,
      os: e,
      node: !1,
      canvasSupported: !!document.createElement("canvas").getContext,
      svgSupported: "undefined" != typeof SVGRect,
      touchEventsSupported: "ontouchstart" in window && !n.ie && !n.edge,
      pointerEventsSupported: "onpointerdown" in window && (n.edge || n.ie && n.version >= 11),
      domSupported: "undefined" != typeof document
    }
  }

  function n(t, e) {
    "createCanvas" === t && (yf = null), vf[t] = e
  }

  function i(t) {
    if (null == t || "object" != typeof t) return t;
    var e = t,
      n = uf.call(t);
    if ("[object Array]" === n) {
      if (!R(t)) {
        e = [];
        for (var r = 0, a = t.length; a > r; r++) e[r] = i(t[r])
      }
    } else if (lf[n]) {
      if (!R(t)) {
        var o = t.constructor;
        if (t.constructor.from) e = o.from(t);
        else {
          e = new o(t.length);
          for (var r = 0, a = t.length; a > r; r++) e[r] = i(t[r])
        }
      }
    } else if (!sf[n] && !R(t) && !C(t)) {
      e = {};
      for (var s in t) t.hasOwnProperty(s) && (e[s] = i(t[s]))
    }
    return e
  }

  function r(t, e, n) {
    if (!S(e) || !S(t)) return n ? i(e) : t;
    for (var a in e)
      if (e.hasOwnProperty(a)) {
        var o = t[a],
          s = e[a];
        !S(s) || !S(o) || x(s) || x(o) || C(s) || C(o) || M(s) || M(o) || R(s) || R(o) ? !n && a in t || (t[a] = i(e[a], !0)) : r(o, s, n)
      }
    return t
  }

  function a(t, e) {
    for (var n = t[0], i = 1, a = t.length; a > i; i++) n = r(n, t[i], e);
    return n
  }

  function o(t, e) {
    for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
    return t
  }

  function s(t, e, n) {
    for (var i in e) e.hasOwnProperty(i) && (n ? null != e[i] : null == t[i]) && (t[i] = e[i]);
    return t
  }

  function l() {
    return yf || (yf = mf().getContext("2d")), yf
  }

  function u(t, e) {
    if (t) {
      if (t.indexOf) return t.indexOf(e);
      for (var n = 0, i = t.length; i > n; n++)
        if (t[n] === e) return n
    }
    return -1
  }

  function h(t, e) {
    function n() {}
    var i = t.prototype;
    n.prototype = e.prototype, t.prototype = new n;
    for (var r in i) i.hasOwnProperty(r) && (t.prototype[r] = i[r]);
    t.prototype.constructor = t, t.superClass = e
  }

  function c(t, e, n) {
    t = "prototype" in t ? t.prototype : t, e = "prototype" in e ? e.prototype : e, s(t, e, n)
  }

  function f(t) {
    return t ? "string" == typeof t ? !1 : "number" == typeof t.length : void 0
  }

  function d(t, e, n) {
    if (t && e)
      if (t.forEach && t.forEach === cf) t.forEach(e, n);
      else if (t.length === +t.length)
      for (var i = 0, r = t.length; r > i; i++) e.call(n, t[i], i, t);
    else
      for (var a in t) t.hasOwnProperty(a) && e.call(n, t[a], a, t)
  }

  function p(t, e, n) {
    if (t && e) {
      if (t.map && t.map === pf) return t.map(e, n);
      for (var i = [], r = 0, a = t.length; a > r; r++) i.push(e.call(n, t[r], r, t));
      return i
    }
  }

  function g(t, e, n, i) {
    if (t && e) {
      if (t.reduce && t.reduce === gf) return t.reduce(e, n, i);
      for (var r = 0, a = t.length; a > r; r++) n = e.call(i, n, t[r], r, t);
      return n
    }
  }

  function v(t, e, n) {
    if (t && e) {
      if (t.filter && t.filter === ff) return t.filter(e, n);
      for (var i = [], r = 0, a = t.length; a > r; r++) e.call(n, t[r], r, t) && i.push(t[r]);
      return i
    }
  }

  function m(t, e, n) {
    if (t && e)
      for (var i = 0, r = t.length; r > i; i++)
        if (e.call(n, t[i], i, t)) return t[i]
  }

  function y(t, e) {
    var n = df.call(arguments, 2);
    return function() {
      return t.apply(e, n.concat(df.call(arguments)))
    }
  }

  function _(t) {
    var e = df.call(arguments, 1);
    return function() {
      return t.apply(this, e.concat(df.call(arguments)))
    }
  }

  function x(t) {
    return "[object Array]" === uf.call(t)
  }

  function w(t) {
    return "function" == typeof t
  }

  function b(t) {
    return "[object String]" === uf.call(t)
  }

  function S(t) {
    var e = typeof t;
    return "function" === e || !!t && "object" === e
  }

  function M(t) {
    return !!sf[uf.call(t)]
  }

  function T(t) {
    return !!lf[uf.call(t)]
  }

  function C(t) {
    return "object" == typeof t && "number" == typeof t.nodeType && "object" == typeof t.ownerDocument
  }

  function I(t) {
    return t !== t
  }

  function k() {
    for (var t = 0, e = arguments.length; e > t; t++)
      if (null != arguments[t]) return arguments[t]
  }

  function A(t, e) {
    return null != t ? t : e
  }

  function D(t, e, n) {
    return null != t ? t : null != e ? e : n
  }

  function P() {
    return Function.call.apply(df, arguments)
  }

  function L(t) {
    if ("number" == typeof t) return [t, t, t, t];
    var e = t.length;
    return 2 === e ? [t[0], t[1], t[0], t[1]] : 3 === e ? [t[0], t[1], t[2], t[1]] : t
  }

  function O(t, e) {
    if (!t) throw new Error(e)
  }

  function E(t) {
    return null == t ? null : "function" == typeof t.trim ? t.trim() : t.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "")
  }

  function B(t) {
    t[_f] = !0
  }

  function R(t) {
    return t[_f]
  }

  function z(t) {
    function e(t, e) {
      n ? i.set(t, e) : i.set(e, t)
    }
    var n = x(t);
    this.data = {};
    var i = this;
    t instanceof z ? t.each(e) : t && d(t, e)
  }

  function N(t) {
    return new z(t)
  }

  function F(t, e) {
    for (var n = new t.constructor(t.length + e.length), i = 0; i < t.length; i++) n[i] = t[i];
    var r = t.length;
    for (i = 0; i < e.length; i++) n[i + r] = e[i];
    return n
  }

  function V() {}

  function H(t, e) {
    var n = new wf(2);
    return null == t && (t = 0), null == e && (e = 0), n[0] = t, n[1] = e, n
  }

  function W(t, e) {
    return t[0] = e[0], t[1] = e[1], t
  }

  function G(t) {
    var e = new wf(2);
    return e[0] = t[0], e[1] = t[1], e
  }

  function X(t, e, n) {
    return t[0] = e, t[1] = n, t
  }

  function q(t, e, n) {
    return t[0] = e[0] + n[0], t[1] = e[1] + n[1], t
  }

  function U(t, e, n, i) {
    return t[0] = e[0] + n[0] * i, t[1] = e[1] + n[1] * i, t
  }

  function j(t, e, n) {
    return t[0] = e[0] - n[0], t[1] = e[1] - n[1], t
  }

  function Y(t) {
    return Math.sqrt(Z(t))
  }

  function Z(t) {
    return t[0] * t[0] + t[1] * t[1]
  }

  function $(t, e, n) {
    return t[0] = e[0] * n[0], t[1] = e[1] * n[1], t
  }

  function K(t, e, n) {
    return t[0] = e[0] / n[0], t[1] = e[1] / n[1], t
  }

  function Q(t, e) {
    return t[0] * e[0] + t[1] * e[1]
  }

  function J(t, e, n) {
    return t[0] = e[0] * n, t[1] = e[1] * n, t
  }

  function te(t, e) {
    var n = Y(e);
    return 0 === n ? (t[0] = 0, t[1] = 0) : (t[0] = e[0] / n, t[1] = e[1] / n), t
  }

  function ee(t, e) {
    return Math.sqrt((t[0] - e[0]) * (t[0] - e[0]) + (t[1] - e[1]) * (t[1] - e[1]))
  }

  function ne(t, e) {
    return (t[0] - e[0]) * (t[0] - e[0]) + (t[1] - e[1]) * (t[1] - e[1])
  }

  function ie(t, e) {
    return t[0] = -e[0], t[1] = -e[1], t
  }

  function re(t, e, n, i) {
    return t[0] = e[0] + i * (n[0] - e[0]), t[1] = e[1] + i * (n[1] - e[1]), t
  }

  function ae(t, e, n) {
    var i = e[0],
      r = e[1];
    return t[0] = n[0] * i + n[2] * r + n[4], t[1] = n[1] * i + n[3] * r + n[5], t
  }

  function oe(t, e, n) {
    return t[0] = Math.min(e[0], n[0]), t[1] = Math.min(e[1], n[1]), t
  }

  function se(t, e, n) {
    return t[0] = Math.max(e[0], n[0]), t[1] = Math.max(e[1], n[1]), t
  }

  function le() {
    this.on("mousedown", this._dragStart, this), this.on("mousemove", this._drag, this), this.on("mouseup", this._dragEnd, this), this.on("globalout", this._dragEnd, this)
  }

  function ue(t, e) {
    return {
      target: t,
      topTarget: e && e.topTarget
    }
  }

  function he(t, e) {
    var n = t._$eventProcessor;
    return null != e && n && n.normalizeQuery && (e = n.normalizeQuery(e)), e
  }

  function ce(t, e, n, i, r, a) {
    var o = t._$handlers;
    if ("function" == typeof n && (r = i, i = n, n = null), !i || !e) return t;
    n = he(t, n), o[e] || (o[e] = []);
    for (var s = 0; s < o[e].length; s++)
      if (o[e][s].h === i) return t;
    var l = {
        h: i,
        one: a,
        query: n,
        ctx: r || t,
        callAtLast: i.zrEventfulCallAtLast
      },
      u = o[e].length - 1,
      h = o[e][u];
    return h && h.callAtLast ? o[e].splice(u, 0, l) : o[e].push(l), t
  }

  function fe(t, e, n, i, r, a) {
    var o = i + "-" + r,
      s = t.length;
    if (a.hasOwnProperty(o)) return a[o];
    if (1 === e) {
      var l = Math.round(Math.log((1 << s) - 1 & ~r) / Af);
      return t[n][l]
    }
    for (var u = i | 1 << n, h = n + 1; i & 1 << h;) h++;
    for (var c = 0, f = 0, d = 0; s > f; f++) {
      var p = 1 << f;
      p & r || (c += (d % 2 ? -1 : 1) * t[n][f] * fe(t, e - 1, h, u, r | p, a), d++)
    }
    return a[o] = c, c
  }

  function de(t, e) {
    var n = [
        [t[0], t[1], 1, 0, 0, 0, -e[0] * t[0], -e[0] * t[1]],
        [0, 0, 0, t[0], t[1], 1, -e[1] * t[0], -e[1] * t[1]],
        [t[2], t[3], 1, 0, 0, 0, -e[2] * t[2], -e[2] * t[3]],
        [0, 0, 0, t[2], t[3], 1, -e[3] * t[2], -e[3] * t[3]],
        [t[4], t[5], 1, 0, 0, 0, -e[4] * t[4], -e[4] * t[5]],
        [0, 0, 0, t[4], t[5], 1, -e[5] * t[4], -e[5] * t[5]],
        [t[6], t[7], 1, 0, 0, 0, -e[6] * t[6], -e[6] * t[7]],
        [0, 0, 0, t[6], t[7], 1, -e[7] * t[6], -e[7] * t[7]]
      ],
      i = {},
      r = fe(n, 8, 0, 0, 0, i);
    if (0 !== r) {
      for (var a = [], o = 0; 8 > o; o++)
        for (var s = 0; 8 > s; s++) null == a[s] && (a[s] = 0), a[s] += ((o + s) % 2 ? -1 : 1) * fe(n, 7, 0 === o ? 1 : 0, 1 << o, 1 << s, i) / r * e[o];
      return function(t, e, n) {
        var i = e * a[6] + n * a[7] + 1;
        t[0] = (e * a[0] + n * a[1] + a[2]) / i, t[1] = (e * a[3] + n * a[4] + a[5]) / i
      }
    }
  }

  function pe(t, e, n, i) {
    return n = n || {}, i || ! of .canvasSupported ? ge(t, e, n) : of .browser.firefox && null != e.layerX && e.layerX !== e.offsetX ? (n.zrX = e.layerX, n.zrY = e.layerY) : null != e.offsetX ? (n.zrX = e.offsetX, n.zrY = e.offsetY) : ge(t, e, n), n
  }

  function ge(t, e, n) {
    if (t.getBoundingClientRect && of .domSupported) {
      var i = e.clientX,
        r = e.clientY;
      if ("CANVAS" === t.nodeName.toUpperCase()) {
        var a = t.getBoundingClientRect();
        return n.zrX = i - a.left, void(n.zrY = r - a.top)
      }
      var o = t[Lf] || (t[Lf] = {}),
        s = me(ve(t, o), o);
      if (s) return s(Of, i, r), n.zrX = Of[0], void(n.zrY = Of[1])
    }
    n.zrX = n.zrY = 0
  }

  function ve(t, e) {
    var n = e.markers;
    if (n) return n;
    n = e.markers = [];
    for (var i = ["left", "right"], r = ["top", "bottom"], a = 0; 4 > a; a++) {
      var o = document.createElement("div"),
        s = o.style,
        l = a % 2,
        u = (a >> 1) % 2;
      s.cssText = ["position:absolute", "visibility: hidden", "padding: 0", "margin: 0", "border-width: 0", "width:0", "height:0", i[l] + ":0", r[u] + ":0", i[1 - l] + ":auto", r[1 - u] + ":auto", ""].join("!important;"), t.appendChild(o), n.push(o)
    }
    return n
  }

  function me(t, e) {
    for (var n = e.transformer, i = e.srcCoords, r = !0, a = [], o = [], s = 0; 4 > s; s++) {
      var l = t[s].getBoundingClientRect(),
        u = 2 * s,
        h = l.left,
        c = l.top;
      a.push(h, c), r &= i && h === i[u] && c === i[u + 1], o.push(t[s].offsetLeft, t[s].offsetTop)
    }
    return r ? n : (e.srcCoords = a, e.transformer = de(a, o))
  }

  function ye(t, e, n) {
    if (e = e || window.event, null != e.zrX) return e;
    var i = e.type,
      r = i && i.indexOf("touch") >= 0;
    if (r) {
      var a = "touchend" !== i ? e.targetTouches[0] : e.changedTouches[0];
      a && pe(t, a, e, n)
    } else pe(t, e, e, n), e.zrDelta = e.wheelDelta ? e.wheelDelta / 120 : -(e.detail || 0) / 3;
    var o = e.button;
    return null == e.which && void 0 !== o && Pf.test(e.type) && (e.which = 1 & o ? 1 : 2 & o ? 3 : 4 & o ? 2 : 0), e
  }

  function _e(t, e, n) {
    Df ? t.addEventListener(e, n) : t.attachEvent("on" + e, n)
  }

  function xe(t, e, n) {
    Df ? t.removeEventListener(e, n) : t.detachEvent("on" + e, n)
  }

  function we(t) {
    var e = t[1][0] - t[0][0],
      n = t[1][1] - t[0][1];
    return Math.sqrt(e * e + n * n)
  }

  function be(t) {
    return [(t[0][0] + t[1][0]) / 2, (t[0][1] + t[1][1]) / 2]
  }

  function Se(t, e, n) {
    return {
      type: t,
      event: n,
      target: e.target,
      topTarget: e.topTarget,
      cancelBubble: !1,
      offsetX: n.zrX,
      offsetY: n.zrY,
      gestureEvent: n.gestureEvent,
      pinchX: n.pinchX,
      pinchY: n.pinchY,
      pinchScale: n.pinchScale,
      wheelDelta: n.zrDelta,
      zrByTouch: n.zrByTouch,
      which: n.which,
      stop: Me
    }
  }

  function Me() {
    Ef(this.event)
  }

  function Te() {}

  function Ce(t, e, n) {
    if (t[t.rectHover ? "rectContain" : "contain"](e, n)) {
      for (var i, r = t; r;) {
        if (r.clipPath && !r.clipPath.contain(e, n)) return !1;
        r.silent && (i = !0), r = r.parent
      }
      return i ? zf : !0
    }
    return !1
  }

  function Ie() {
    var t = new Vf(6);
    return ke(t), t
  }

  function ke(t) {
    return t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 1, t[4] = 0, t[5] = 0, t
  }

  function Ae(t, e) {
    return t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t[4] = e[4], t[5] = e[5], t
  }

  function De(t, e, n) {
    var i = e[0] * n[0] + e[2] * n[1],
      r = e[1] * n[0] + e[3] * n[1],
      a = e[0] * n[2] + e[2] * n[3],
      o = e[1] * n[2] + e[3] * n[3],
      s = e[0] * n[4] + e[2] * n[5] + e[4],
      l = e[1] * n[4] + e[3] * n[5] + e[5];
    return t[0] = i, t[1] = r, t[2] = a, t[3] = o, t[4] = s, t[5] = l, t
  }

  function Pe(t, e, n) {
    return t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t[4] = e[4] + n[0], t[5] = e[5] + n[1], t
  }

  function Le(t, e, n) {
    var i = e[0],
      r = e[2],
      a = e[4],
      o = e[1],
      s = e[3],
      l = e[5],
      u = Math.sin(n),
      h = Math.cos(n);
    return t[0] = i * h + o * u, t[1] = -i * u + o * h, t[2] = r * h + s * u, t[3] = -r * u + h * s, t[4] = h * a + u * l, t[5] = h * l - u * a, t
  }

  function Oe(t, e, n) {
    var i = n[0],
      r = n[1];
    return t[0] = e[0] * i, t[1] = e[1] * r, t[2] = e[2] * i, t[3] = e[3] * r, t[4] = e[4] * i, t[5] = e[5] * r, t
  }

  function Ee(t, e) {
    var n = e[0],
      i = e[2],
      r = e[4],
      a = e[1],
      o = e[3],
      s = e[5],
      l = n * o - a * i;
    return l ? (l = 1 / l, t[0] = o * l, t[1] = -a * l, t[2] = -i * l, t[3] = n * l, t[4] = (i * s - o * r) * l, t[5] = (a * r - n * s) * l, t) : null
  }

  function Be(t) {
    var e = Ie();
    return Ae(e, t), e
  }

  function Re(t) {
    return t > Gf || -Gf > t
  }

  function ze(t) {
    this._target = t.target, this._life = t.life || 1e3, this._delay = t.delay || 0, this._initialized = !1, this.loop = null == t.loop ? !1 : t.loop, this.gap = t.gap || 0, this.easing = t.easing || "Linear", this.onframe = t.onframe, this.ondestroy = t.ondestroy, this.onrestart = t.onrestart, this._pausedTime = 0, this._paused = !1
  }

  function Ne(t) {
    return t = Math.round(t), 0 > t ? 0 : t > 255 ? 255 : t
  }

  function Fe(t) {
    return t = Math.round(t), 0 > t ? 0 : t > 360 ? 360 : t
  }

  function Ve(t) {
    return 0 > t ? 0 : t > 1 ? 1 : t
  }

  function He(t) {
    return Ne(t.length && "%" === t.charAt(t.length - 1) ? parseFloat(t) / 100 * 255 : parseInt(t, 10))
  }

  function We(t) {
    return Ve(t.length && "%" === t.charAt(t.length - 1) ? parseFloat(t) / 100 : parseFloat(t))
  }

  function Ge(t, e, n) {
    return 0 > n ? n += 1 : n > 1 && (n -= 1), 1 > 6 * n ? t + (e - t) * n * 6 : 1 > 2 * n ? e : 2 > 3 * n ? t + (e - t) * (2 / 3 - n) * 6 : t
  }

  function Xe(t, e, n) {
    return t + (e - t) * n
  }

  function qe(t, e, n, i, r) {
    return t[0] = e, t[1] = n, t[2] = i, t[3] = r, t
  }

  function Ue(t, e) {
    return t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t
  }

  function je(t, e) {
    id && Ue(id, e), id = nd.put(t, id || e.slice())
  }

  function Ye(t, e) {
    if (t) {
      e = e || [];
      var n = nd.get(t);
      if (n) return Ue(e, n);
      t += "";
      var i = t.replace(/ /g, "").toLowerCase();
      if (i in ed) return Ue(e, ed[i]), je(t, e), e;
      if ("#" !== i.charAt(0)) {
        var r = i.indexOf("("),
          a = i.indexOf(")");
        if (-1 !== r && a + 1 === i.length) {
          var o = i.substr(0, r),
            s = i.substr(r + 1, a - (r + 1)).split(","),
            l = 1;
          switch (o) {
            case "rgba":
              if (4 !== s.length) return void qe(e, 0, 0, 0, 1);
              l = We(s.pop());
            case "rgb":
              return 3 !== s.length ? void qe(e, 0, 0, 0, 1) : (qe(e, He(s[0]), He(s[1]), He(s[2]), l), je(t, e), e);
            case "hsla":
              return 4 !== s.length ? void qe(e, 0, 0, 0, 1) : (s[3] = We(s[3]), Ze(s, e), je(t, e), e);
            case "hsl":
              return 3 !== s.length ? void qe(e, 0, 0, 0, 1) : (Ze(s, e), je(t, e), e);
            default:
              return
          }
        }
        qe(e, 0, 0, 0, 1)
      } else {
        if (4 === i.length) {
          var u = parseInt(i.substr(1), 16);
          return u >= 0 && 4095 >= u ? (qe(e, (3840 & u) >> 4 | (3840 & u) >> 8, 240 & u | (240 & u) >> 4, 15 & u | (15 & u) << 4, 1), je(t, e), e) : void qe(e, 0, 0, 0, 1)
        }
        if (7 === i.length) {
          var u = parseInt(i.substr(1), 16);
          return u >= 0 && 16777215 >= u ? (qe(e, (16711680 & u) >> 16, (65280 & u) >> 8, 255 & u, 1), je(t, e), e) : void qe(e, 0, 0, 0, 1)
        }
      }
    }
  }

  function Ze(t, e) {
    var n = (parseFloat(t[0]) % 360 + 360) % 360 / 360,
      i = We(t[1]),
      r = We(t[2]),
      a = .5 >= r ? r * (i + 1) : r + i - r * i,
      o = 2 * r - a;
    return e = e || [], qe(e, Ne(255 * Ge(o, a, n + 1 / 3)), Ne(255 * Ge(o, a, n)), Ne(255 * Ge(o, a, n - 1 / 3)), 1), 4 === t.length && (e[3] = t[3]), e
  }

  function $e(t) {
    if (t) {
      var e, n, i = t[0] / 255,
        r = t[1] / 255,
        a = t[2] / 255,
        o = Math.min(i, r, a),
        s = Math.max(i, r, a),
        l = s - o,
        u = (s + o) / 2;
      if (0 === l) e = 0, n = 0;
      else {
        n = .5 > u ? l / (s + o) : l / (2 - s - o);
        var h = ((s - i) / 6 + l / 2) / l,
          c = ((s - r) / 6 + l / 2) / l,
          f = ((s - a) / 6 + l / 2) / l;
        i === s ? e = f - c : r === s ? e = 1 / 3 + h - f : a === s && (e = 2 / 3 + c - h), 0 > e && (e += 1), e > 1 && (e -= 1)
      }
      var d = [360 * e, n, u];
      return null != t[3] && d.push(t[3]), d
    }
  }

  function Ke(t, e) {
    var n = Ye(t);
    if (n) {
      for (var i = 0; 3 > i; i++) n[i] = 0 > e ? n[i] * (1 - e) | 0 : (255 - n[i]) * e + n[i] | 0, n[i] > 255 ? n[i] = 255 : t[i] < 0 && (n[i] = 0);
      return rn(n, 4 === n.length ? "rgba" : "rgb")
    }
  }

  function Qe(t) {
    var e = Ye(t);
    return e ? ((1 << 24) + (e[0] << 16) + (e[1] << 8) + +e[2]).toString(16).slice(1) : void 0
  }

  function Je(t, e, n) {
    if (e && e.length && t >= 0 && 1 >= t) {
      n = n || [];
      var i = t * (e.length - 1),
        r = Math.floor(i),
        a = Math.ceil(i),
        o = e[r],
        s = e[a],
        l = i - r;
      return n[0] = Ne(Xe(o[0], s[0], l)), n[1] = Ne(Xe(o[1], s[1], l)), n[2] = Ne(Xe(o[2], s[2], l)), n[3] = Ve(Xe(o[3], s[3], l)), n
    }
  }

  function tn(t, e, n) {
    if (e && e.length && t >= 0 && 1 >= t) {
      var i = t * (e.length - 1),
        r = Math.floor(i),
        a = Math.ceil(i),
        o = Ye(e[r]),
        s = Ye(e[a]),
        l = i - r,
        u = rn([Ne(Xe(o[0], s[0], l)), Ne(Xe(o[1], s[1], l)), Ne(Xe(o[2], s[2], l)), Ve(Xe(o[3], s[3], l))], "rgba");
      return n ? {
        color: u,
        leftIndex: r,
        rightIndex: a,
        value: i
      } : u
    }
  }

  function en(t, e, n, i) {
    return t = Ye(t), t ? (t = $e(t), null != e && (t[0] = Fe(e)), null != n && (t[1] = We(n)), null != i && (t[2] = We(i)), rn(Ze(t), "rgba")) : void 0
  }

  function nn(t, e) {
    return t = Ye(t), t && null != e ? (t[3] = Ve(e), rn(t, "rgba")) : void 0
  }

  function rn(t, e) {
    if (t && t.length) {
      var n = t[0] + "," + t[1] + "," + t[2];
      return ("rgba" === e || "hsva" === e || "hsla" === e) && (n += "," + t[3]), e + "(" + n + ")"
    }
  }

  function an(t, e) {
    return t[e]
  }

  function on(t, e, n) {
    t[e] = n
  }

  function sn(t, e, n) {
    return (e - t) * n + t
  }

  function ln(t, e, n) {
    return n > .5 ? e : t
  }

  function un(t, e, n, i, r) {
    var a = t.length;
    if (1 === r)
      for (var o = 0; a > o; o++) i[o] = sn(t[o], e[o], n);
    else
      for (var s = a && t[0].length, o = 0; a > o; o++)
        for (var l = 0; s > l; l++) i[o][l] = sn(t[o][l], e[o][l], n)
  }

  function hn(t, e, n) {
    var i = t.length,
      r = e.length;
    if (i !== r) {
      var a = i > r;
      if (a) t.length = r;
      else
        for (var o = i; r > o; o++) t.push(1 === n ? e[o] : sd.call(e[o]))
    }
    for (var s = t[0] && t[0].length, o = 0; o < t.length; o++)
      if (1 === n) isNaN(t[o]) && (t[o] = e[o]);
      else
        for (var l = 0; s > l; l++) isNaN(t[o][l]) && (t[o][l] = e[o][l])
  }

  function cn(t, e, n) {
    if (t === e) return !0;
    var i = t.length;
    if (i !== e.length) return !1;
    if (1 === n) {
      for (var r = 0; i > r; r++)
        if (t[r] !== e[r]) return !1
    } else
      for (var a = t[0].length, r = 0; i > r; r++)
        for (var o = 0; a > o; o++)
          if (t[r][o] !== e[r][o]) return !1;
    return !0
  }

  function fn(t, e, n, i, r, a, o, s, l) {
    var u = t.length;
    if (1 === l)
      for (var h = 0; u > h; h++) s[h] = dn(t[h], e[h], n[h], i[h], r, a, o);
    else
      for (var c = t[0].length, h = 0; u > h; h++)
        for (var f = 0; c > f; f++) s[h][f] = dn(t[h][f], e[h][f], n[h][f], i[h][f], r, a, o)
  }

  function dn(t, e, n, i, r, a, o) {
    var s = .5 * (n - t),
      l = .5 * (i - e);
    return (2 * (e - n) + s + l) * o + (-3 * (e - n) - 2 * s - l) * a + s * r + e
  }

  function pn(t) {
    if (f(t)) {
      var e = t.length;
      if (f(t[0])) {
        for (var n = [], i = 0; e > i; i++) n.push(sd.call(t[i]));
        return n
      }
      return sd.call(t)
    }
    return t
  }

  function gn(t) {
    return t[0] = Math.floor(t[0]), t[1] = Math.floor(t[1]), t[2] = Math.floor(t[2]), "rgba(" + t.join(",") + ")"
  }

  function vn(t) {
    var e = t[t.length - 1].value;
    return f(e && e[0]) ? 2 : 1
  }

  function mn(t, e, n, i, r, a) {
    var o = t._getter,
      s = t._setter,
      l = "spline" === e,
      u = i.length;
    if (u) {
      var h, c = i[0].value,
        d = f(c),
        p = !1,
        g = !1,
        v = d ? vn(i) : 0;
      i.sort(function(t, e) {
        return t.time - e.time
      }), h = i[u - 1].time;
      for (var m = [], y = [], _ = i[0].value, x = !0, w = 0; u > w; w++) {
        m.push(i[w].time / h);
        var b = i[w].value;
        if (d && cn(b, _, v) || !d && b === _ || (x = !1), _ = b, "string" == typeof b) {
          var S = Ye(b);
          S ? (b = S, p = !0) : g = !0
        }
        y.push(b)
      }
      if (a || !x) {
        for (var M = y[u - 1], w = 0; u - 1 > w; w++) d ? hn(y[w], M, v) : !isNaN(y[w]) || isNaN(M) || g || p || (y[w] = M);
        d && hn(o(t._target, r), M, v);
        var T, C, I, k, A, D, P = 0,
          L = 0;
        if (p) var O = [0, 0, 0, 0];
        var E = function(t, e) {
            var n;
            if (0 > e) n = 0;
            else if (L > e) {
              for (T = Math.min(P + 1, u - 1), n = T; n >= 0 && !(m[n] <= e); n--);
              n = Math.min(n, u - 2)
            } else {
              for (n = P; u > n && !(m[n] > e); n++);
              n = Math.min(n - 1, u - 2)
            }
            P = n, L = e;
            var i = m[n + 1] - m[n];
            if (0 !== i)
              if (C = (e - m[n]) / i, l)
                if (k = y[n], I = y[0 === n ? n : n - 1], A = y[n > u - 2 ? u - 1 : n + 1], D = y[n > u - 3 ? u - 1 : n + 2], d) fn(I, k, A, D, C, C * C, C * C * C, o(t, r), v);
                else {
                  var a;
                  if (p) a = fn(I, k, A, D, C, C * C, C * C * C, O, 1), a = gn(O);
                  else {
                    if (g) return ln(k, A, C);
                    a = dn(I, k, A, D, C, C * C, C * C * C)
                  }
                  s(t, r, a)
                }
            else if (d) un(y[n], y[n + 1], C, o(t, r), v);
            else {
              var a;
              if (p) un(y[n], y[n + 1], C, O, 1), a = gn(O);
              else {
                if (g) return ln(y[n], y[n + 1], C);
                a = sn(y[n], y[n + 1], C)
              }
              s(t, r, a)
            }
          },
          B = new ze({
            target: t._target,
            life: h,
            loop: t._loop,
            delay: t._delay,
            onframe: E,
            ondestroy: n
          });
        return e && "spline" !== e && (B.easing = e), B
      }
    }
  }

  function yn(t, e, n, i, r, a, o, s) {
    function l() {
      h--, h || a && a()
    }
    b(i) ? (a = r, r = i, i = 0) : w(r) ? (a = r, r = "linear", i = 0) : w(i) ? (a = i, i = 0) : w(n) ? (a = n, n = 500) : n || (n = 500), t.stopAnimation(), _n(t, "", t, e, n, i, s);
    var u = t.animators.slice(),
      h = u.length;
    h || a && a();
    for (var c = 0; c < u.length; c++) u[c].done(l).start(r, o)
  }

  function _n(t, e, n, i, r, a, o) {
    var s = {},
      l = 0;
    for (var u in i) i.hasOwnProperty(u) && (null != n[u] ? S(i[u]) && !f(i[u]) ? _n(t, e ? e + "." + u : u, n[u], i[u], r, a, o) : (o ? (s[u] = n[u], xn(t, e, u, i[u])) : s[u] = i[u], l++) : null == i[u] || o || xn(t, e, u, i[u]));
    l > 0 && t.animate(e, !1).when(null == r ? 500 : r, s).delay(a || 0)
  }

  function xn(t, e, n, i) {
    if (e) {
      var r = {};
      r[e] = {}, r[e][n] = i, t.attr(r)
    } else t.attr(n, i)
  }

  function wn(t, e, n, i) {
    0 > n && (t += n, n = -n), 0 > i && (e += i, i = -i), this.x = t, this.y = e, this.width = n, this.height = i
  }

  function bn(t) {
    for (var e = 0; t >= xd;) e |= 1 & t, t >>= 1;
    return t + e
  }

  function Sn(t, e, n, i) {
    var r = e + 1;
    if (r === n) return 1;
    if (i(t[r++], t[e]) < 0) {
      for (; n > r && i(t[r], t[r - 1]) < 0;) r++;
      Mn(t, e, r)
    } else
      for (; n > r && i(t[r], t[r - 1]) >= 0;) r++;
    return r - e
  }

  function Mn(t, e, n) {
    for (n--; n > e;) {
      var i = t[e];
      t[e++] = t[n], t[n--] = i
    }
  }

  function Tn(t, e, n, i, r) {
    for (i === e && i++; n > i; i++) {
      for (var a, o = t[i], s = e, l = i; l > s;) a = s + l >>> 1, r(o, t[a]) < 0 ? l = a : s = a + 1;
      var u = i - s;
      switch (u) {
        case 3:
          t[s + 3] = t[s + 2];
        case 2:
          t[s + 2] = t[s + 1];
        case 1:
          t[s + 1] = t[s];
          break;
        default:
          for (; u > 0;) t[s + u] = t[s + u - 1], u--
      }
      t[s] = o
    }
  }

  function Cn(t, e, n, i, r, a) {
    var o = 0,
      s = 0,
      l = 1;
    if (a(t, e[n + r]) > 0) {
      for (s = i - r; s > l && a(t, e[n + r + l]) > 0;) o = l, l = (l << 1) + 1, 0 >= l && (l = s);
      l > s && (l = s), o += r, l += r
    } else {
      for (s = r + 1; s > l && a(t, e[n + r - l]) <= 0;) o = l, l = (l << 1) + 1, 0 >= l && (l = s);
      l > s && (l = s);
      var u = o;
      o = r - l, l = r - u
    }
    for (o++; l > o;) {
      var h = o + (l - o >>> 1);
      a(t, e[n + h]) > 0 ? o = h + 1 : l = h
    }
    return l
  }

  function In(t, e, n, i, r, a) {
    var o = 0,
      s = 0,
      l = 1;
    if (a(t, e[n + r]) < 0) {
      for (s = r + 1; s > l && a(t, e[n + r - l]) < 0;) o = l, l = (l << 1) + 1, 0 >= l && (l = s);
      l > s && (l = s);
      var u = o;
      o = r - l, l = r - u
    } else {
      for (s = i - r; s > l && a(t, e[n + r + l]) >= 0;) o = l, l = (l << 1) + 1, 0 >= l && (l = s);
      l > s && (l = s), o += r, l += r
    }
    for (o++; l > o;) {
      var h = o + (l - o >>> 1);
      a(t, e[n + h]) < 0 ? l = h : o = h + 1
    }
    return l
  }

  function kn(t, e) {
    function n(t, e) {
      l[c] = t, u[c] = e, c += 1
    }

    function i() {
      for (; c > 1;) {
        var t = c - 2;
        if (t >= 1 && u[t - 1] <= u[t] + u[t + 1] || t >= 2 && u[t - 2] <= u[t] + u[t - 1]) u[t - 1] < u[t + 1] && t--;
        else if (u[t] > u[t + 1]) break;
        a(t)
      }
    }

    function r() {
      for (; c > 1;) {
        var t = c - 2;
        t > 0 && u[t - 1] < u[t + 1] && t--, a(t)
      }
    }

    function a(n) {
      var i = l[n],
        r = u[n],
        a = l[n + 1],
        h = u[n + 1];
      u[n] = r + h, n === c - 3 && (l[n + 1] = l[n + 2], u[n + 1] = u[n + 2]), c--;
      var f = In(t[a], t, i, r, 0, e);
      i += f, r -= f, 0 !== r && (h = Cn(t[i + r - 1], t, a, h, h - 1, e), 0 !== h && (h >= r ? o(i, r, a, h) : s(i, r, a, h)))
    }

    function o(n, i, r, a) {
      var o = 0;
      for (o = 0; i > o; o++) f[o] = t[n + o];
      var s = 0,
        l = r,
        u = n;
      if (t[u++] = t[l++], 0 !== --a) {
        if (1 === i) {
          for (o = 0; a > o; o++) t[u + o] = t[l + o];
          return void(t[u + a] = f[s])
        }
        for (var c, d, p, g = h;;) {
          c = 0, d = 0, p = !1;
          do
            if (e(t[l], f[s]) < 0) {
              if (t[u++] = t[l++], d++, c = 0, 0 === --a) {
                p = !0;
                break
              }
            } else if (t[u++] = f[s++], c++, d = 0, 1 === --i) {
            p = !0;
            break
          } while (g > (c | d));
          if (p) break;
          do {
            if (c = In(t[l], f, s, i, 0, e), 0 !== c) {
              for (o = 0; c > o; o++) t[u + o] = f[s + o];
              if (u += c, s += c, i -= c, 1 >= i) {
                p = !0;
                break
              }
            }
            if (t[u++] = t[l++], 0 === --a) {
              p = !0;
              break
            }
            if (d = Cn(f[s], t, l, a, 0, e), 0 !== d) {
              for (o = 0; d > o; o++) t[u + o] = t[l + o];
              if (u += d, l += d, a -= d, 0 === a) {
                p = !0;
                break
              }
            }
            if (t[u++] = f[s++], 1 === --i) {
              p = !0;
              break
            }
            g--
          } while (c >= wd || d >= wd);
          if (p) break;
          0 > g && (g = 0), g += 2
        }
        if (h = g, 1 > h && (h = 1), 1 === i) {
          for (o = 0; a > o; o++) t[u + o] = t[l + o];
          t[u + a] = f[s]
        } else {
          if (0 === i) throw new Error;
          for (o = 0; i > o; o++) t[u + o] = f[s + o]
        }
      } else
        for (o = 0; i > o; o++) t[u + o] = f[s + o]
    }

    function s(n, i, r, a) {
      var o = 0;
      for (o = 0; a > o; o++) f[o] = t[r + o];
      var s = n + i - 1,
        l = a - 1,
        u = r + a - 1,
        c = 0,
        d = 0;
      if (t[u--] = t[s--], 0 !== --i) {
        if (1 === a) {
          for (u -= i, s -= i, d = u + 1, c = s + 1, o = i - 1; o >= 0; o--) t[d + o] = t[c + o];
          return void(t[u] = f[l])
        }
        for (var p = h;;) {
          var g = 0,
            v = 0,
            m = !1;
          do
            if (e(f[l], t[s]) < 0) {
              if (t[u--] = t[s--], g++, v = 0, 0 === --i) {
                m = !0;
                break
              }
            } else if (t[u--] = f[l--], v++, g = 0, 1 === --a) {
            m = !0;
            break
          } while (p > (g | v));
          if (m) break;
          do {
            if (g = i - In(f[l], t, n, i, i - 1, e), 0 !== g) {
              for (u -= g, s -= g, i -= g, d = u + 1, c = s + 1, o = g - 1; o >= 0; o--) t[d + o] = t[c + o];
              if (0 === i) {
                m = !0;
                break
              }
            }
            if (t[u--] = f[l--], 1 === --a) {
              m = !0;
              break
            }
            if (v = a - Cn(t[s], f, 0, a, a - 1, e), 0 !== v) {
              for (u -= v, l -= v, a -= v, d = u + 1, c = l + 1, o = 0; v > o; o++) t[d + o] = f[c + o];
              if (1 >= a) {
                m = !0;
                break
              }
            }
            if (t[u--] = t[s--], 0 === --i) {
              m = !0;
              break
            }
            p--
          } while (g >= wd || v >= wd);
          if (m) break;
          0 > p && (p = 0), p += 2
        }
        if (h = p, 1 > h && (h = 1), 1 === a) {
          for (u -= i, s -= i, d = u + 1, c = s + 1, o = i - 1; o >= 0; o--) t[d + o] = t[c + o];
          t[u] = f[l]
        } else {
          if (0 === a) throw new Error;
          for (c = u - (a - 1), o = 0; a > o; o++) t[c + o] = f[o]
        }
      } else
        for (c = u - (a - 1), o = 0; a > o; o++) t[c + o] = f[o]
    }
    var l, u, h = wd,
      c = 0,
      f = [];
    l = [], u = [], this.mergeRuns = i, this.forceMergeRuns = r, this.pushRun = n
  }

  function An(t, e, n, i) {
    n || (n = 0), i || (i = t.length);
    var r = i - n;
    if (!(2 > r)) {
      var a = 0;
      if (xd > r) return a = Sn(t, n, i, e), void Tn(t, n, i, n + a, e);
      var o = new kn(t, e),
        s = bn(r);
      do {
        if (a = Sn(t, n, i, e), s > a) {
          var l = r;
          l > s && (l = s), Tn(t, n, n + l, n + a, e), a = l
        }
        o.pushRun(n, a), o.mergeRuns(), r -= a, n += a
      } while (0 !== r);
      o.forceMergeRuns()
    }
  }

  function Dn(t, e) {
    return t.zlevel === e.zlevel ? t.z === e.z ? t.z2 - e.z2 : t.z - e.z : t.zlevel - e.zlevel
  }

  function Pn(t, e, n) {
    var i = null == e.x ? 0 : e.x,
      r = null == e.x2 ? 1 : e.x2,
      a = null == e.y ? 0 : e.y,
      o = null == e.y2 ? 0 : e.y2;
    e.global || (i = i * n.width + n.x, r = r * n.width + n.x, a = a * n.height + n.y, o = o * n.height + n.y), i = isNaN(i) ? 0 : i, r = isNaN(r) ? 1 : r, a = isNaN(a) ? 0 : a, o = isNaN(o) ? 0 : o;
    var s = t.createLinearGradient(i, a, r, o);
    return s
  }

  function Ln(t, e, n) {
    var i = n.width,
      r = n.height,
      a = Math.min(i, r),
      o = null == e.x ? .5 : e.x,
      s = null == e.y ? .5 : e.y,
      l = null == e.r ? .5 : e.r;
    e.global || (o = o * i + n.x, s = s * r + n.y, l *= a);
    var u = t.createRadialGradient(o, s, 0, o, s, l);
    return u
  }

  function On() {
    return !1
  }

  function En(t, e, n) {
    var i = mf(),
      r = e.getWidth(),
      a = e.getHeight(),
      o = i.style;
    return o && (o.position = "absolute", o.left = 0, o.top = 0, o.width = r + "px", o.height = a + "px", i.setAttribute("data-zr-dom-id", t)), i.width = r * n, i.height = a * n, i
  }

  function Bn(t) {
    if ("string" == typeof t) {
      var e = Bd.get(t);
      return e && e.image
    }
    return t
  }

  function Rn(t, e, n, i, r) {
    if (t) {
      if ("string" == typeof t) {
        if (e && e.__zrImageSrc === t || !n) return e;
        var a = Bd.get(t),
          o = {
            hostEl: n,
            cb: i,
            cbPayload: r
          };
        return a ? (e = a.image, !Nn(e) && a.pending.push(o)) : (e = new Image, e.onload = e.onerror = zn, Bd.put(t, e.__cachedImgObj = {
          image: e,
          pending: [o]
        }), e.src = e.__zrImageSrc = t), e
      }
      return t
    }
    return e
  }

  function zn() {
    var t = this.__cachedImgObj;
    this.onload = this.onerror = this.__cachedImgObj = null;
    for (var e = 0; e < t.pending.length; e++) {
      var n = t.pending[e],
        i = n.cb;
      i && i(this, n.cbPayload), n.hostEl.dirty()
    }
    t.pending.length = 0
  }

  function Nn(t) {
    return t && t.width && t.height
  }

  function Fn(t, e) {
    e = e || Vd;
    var n = t + ":" + e;
    if (Rd[n]) return Rd[n];
    for (var i = (t + "").split("\n"), r = 0, a = 0, o = i.length; o > a; a++) r = Math.max(Kn(i[a], e).width, r);
    return zd > Nd && (zd = 0, Rd = {}), zd++, Rd[n] = r, r
  }

  function Vn(t, e, n, i, r, a, o, s) {
    return o ? Wn(t, e, n, i, r, a, o, s) : Hn(t, e, n, i, r, a, s)
  }

  function Hn(t, e, n, i, r, a, o) {
    var s = Qn(t, e, r, a, o),
      l = Fn(t, e);
    r && (l += r[1] + r[3]);
    var u = s.outerHeight,
      h = Gn(0, l, n),
      c = Xn(0, u, i),
      f = new wn(h, c, l, u);
    return f.lineHeight = s.lineHeight, f
  }

  function Wn(t, e, n, i, r, a, o, s) {
    var l = Jn(t, {
        rich: o,
        truncate: s,
        font: e,
        textAlign: n,
        textPadding: r,
        textLineHeight: a
      }),
      u = l.outerWidth,
      h = l.outerHeight,
      c = Gn(0, u, n),
      f = Xn(0, h, i);
    return new wn(c, f, u, h)
  }

  function Gn(t, e, n) {
    return "right" === n ? t -= e : "center" === n && (t -= e / 2), t
  }

  function Xn(t, e, n) {
    return "middle" === n ? t -= e / 2 : "bottom" === n && (t -= e), t
  }

  function qn(t, e, n) {
    var i = e.textPosition,
      r = e.textDistance,
      a = n.x,
      o = n.y,
      s = n.height,
      l = n.width,
      u = s / 2,
      h = "left",
      c = "top";
    switch (i) {
      case "left":
        a -= r, o += u, h = "right", c = "middle";
        break;
      case "right":
        a += r + l, o += u, c = "middle";
        break;
      case "top":
        a += l / 2, o -= r, h = "center", c = "bottom";
        break;
      case "bottom":
        a += l / 2, o += s + r, h = "center";
        break;
      case "inside":
        a += l / 2, o += u, h = "center", c = "middle";
        break;
      case "insideLeft":
        a += r, o += u, c = "middle";
        break;
      case "insideRight":
        a += l - r, o += u, h = "right", c = "middle";
        break;
      case "insideTop":
        a += l / 2, o += r, h = "center";
        break;
      case "insideBottom":
        a += l / 2, o += s - r, h = "center", c = "bottom";
        break;
      case "insideTopLeft":
        a += r, o += r;
        break;
      case "insideTopRight":
        a += l - r, o += r, h = "right";
        break;
      case "insideBottomLeft":
        a += r, o += s - r, c = "bottom";
        break;
      case "insideBottomRight":
        a += l - r, o += s - r, h = "right", c = "bottom"
    }
    return t = t || {}, t.x = a, t.y = o, t.textAlign = h, t.textVerticalAlign = c, t
  }

  function Un(t, e, n, i, r) {
    if (!e) return "";
    var a = (t + "").split("\n");
    r = jn(e, n, i, r);
    for (var o = 0, s = a.length; s > o; o++) a[o] = Yn(a[o], r);
    return a.join("\n")
  }

  function jn(t, e, n, i) {
    i = o({}, i), i.font = e;
    var n = A(n, "...");
    i.maxIterations = A(i.maxIterations, 2);
    var r = i.minChar = A(i.minChar, 0);
    i.cnCharWidth = Fn("???", e);
    var a = i.ascCharWidth = Fn("a", e);
    i.placeholder = A(i.placeholder, "");
    for (var s = t = Math.max(0, t - 1), l = 0; r > l && s >= a; l++) s -= a;
    var u = Fn(n, e);
    return u > s && (n = "", u = 0), s = t - u, i.ellipsis = n, i.ellipsisWidth = u, i.contentWidth = s, i.containerWidth = t, i
  }

  function Yn(t, e) {
    var n = e.containerWidth,
      i = e.font,
      r = e.contentWidth;
    if (!n) return "";
    var a = Fn(t, i);
    if (n >= a) return t;
    for (var o = 0;; o++) {
      if (r >= a || o >= e.maxIterations) {
        t += e.ellipsis;
        break
      }
      var s = 0 === o ? Zn(t, r, e.ascCharWidth, e.cnCharWidth) : a > 0 ? Math.floor(t.length * r / a) : 0;
      t = t.substr(0, s), a = Fn(t, i)
    }
    return "" === t && (t = e.placeholder), t
  }

  function Zn(t, e, n, i) {
    for (var r = 0, a = 0, o = t.length; o > a && e > r; a++) {
      var s = t.charCodeAt(a);
      r += s >= 0 && 127 >= s ? n : i
    }
    return a
  }

  function $n(t) {
    return Fn("???", t)
  }

  function Kn(t, e) {
    return Hd.measureText(t, e)
  }

  function Qn(t, e, n, i, r) {
    null != t && (t += "");
    var a = A(i, $n(e)),
      o = t ? t.split("\n") : [],
      s = o.length * a,
      l = s;
    if (n && (l += n[0] + n[2]), t && r) {
      var u = r.outerHeight,
        h = r.outerWidth;
      if (null != u && l > u) t = "", o = [];
      else if (null != h)
        for (var c = jn(h - (n ? n[1] + n[3] : 0), e, r.ellipsis, {
            minChar: r.minChar,
            placeholder: r.placeholder
          }), f = 0, d = o.length; d > f; f++) o[f] = Yn(o[f], c)
    }
    return {
      lines: o,
      height: s,
      outerHeight: l,
      lineHeight: a
    }
  }

  function Jn(t, e) {
    var n = {
      lines: [],
      width: 0,
      height: 0
    };
    if (null != t && (t += ""), !t) return n;
    for (var i, r = Fd.lastIndex = 0; null != (i = Fd.exec(t));) {
      var a = i.index;
      a > r && ti(n, t.substring(r, a)), ti(n, i[2], i[1]), r = Fd.lastIndex
    }
    r < t.length && ti(n, t.substring(r, t.length));
    var o = n.lines,
      s = 0,
      l = 0,
      u = [],
      h = e.textPadding,
      c = e.truncate,
      f = c && c.outerWidth,
      d = c && c.outerHeight;
    h && (null != f && (f -= h[1] + h[3]), null != d && (d -= h[0] + h[2]));
    for (var p = 0; p < o.length; p++) {
      for (var g = o[p], v = 0, m = 0, y = 0; y < g.tokens.length; y++) {
        var _ = g.tokens[y],
          x = _.styleName && e.rich[_.styleName] || {},
          w = _.textPadding = x.textPadding,
          b = _.font = x.font || e.font,
          S = _.textHeight = A(x.textHeight, $n(b));
        if (w && (S += w[0] + w[2]), _.height = S, _.lineHeight = D(x.textLineHeight, e.textLineHeight, S), _.textAlign = x && x.textAlign || e.textAlign, _.textVerticalAlign = x && x.textVerticalAlign || "middle", null != d && s + _.lineHeight > d) return {
          lines: [],
          width: 0,
          height: 0
        };
        _.textWidth = Fn(_.text, b);
        var M = x.textWidth,
          T = null == M || "auto" === M;
        if ("string" == typeof M && "%" === M.charAt(M.length - 1)) _.percentWidth = M, u.push(_), M = 0;
        else {
          if (T) {
            M = _.textWidth;
            var C = x.textBackgroundColor,
              I = C && C.image;
            I && (I = Bn(I), Nn(I) && (M = Math.max(M, I.width * S / I.height)))
          }
          var k = w ? w[1] + w[3] : 0;
          M += k;
          var P = null != f ? f - m : null;
          null != P && M > P && (!T || k > P ? (_.text = "", _.textWidth = M = 0) : (_.text = Un(_.text, P - k, b, c.ellipsis, {
            minChar: c.minChar
          }), _.textWidth = Fn(_.text, b), M = _.textWidth + k))
        }
        m += _.width = M, x && (v = Math.max(v, _.lineHeight))
      }
      g.width = m, g.lineHeight = v, s += v, l = Math.max(l, m)
    }
    n.outerWidth = n.width = A(e.textWidth, l), n.outerHeight = n.height = A(e.textHeight, s), h && (n.outerWidth += h[1] + h[3], n.outerHeight += h[0] + h[2]);
    for (var p = 0; p < u.length; p++) {
      var _ = u[p],
        L = _.percentWidth;
      _.width = parseInt(L, 10) / 100 * l
    }
    return n
  }

  function ti(t, e, n) {
    for (var i = "" === e, r = e.split("\n"), a = t.lines, o = 0; o < r.length; o++) {
      var s = r[o],
        l = {
          styleName: n,
          text: s,
          isLineHolder: !s && !i
        };
      if (o) a.push({
        tokens: [l]
      });
      else {
        var u = (a[a.length - 1] || (a[0] = {
            tokens: []
          })).tokens,
          h = u.length;
        1 === h && u[0].isLineHolder ? u[0] = l : (s || !h || i) && u.push(l)
      }
    }
  }

  function ei(t) {
    var e = (t.fontSize || t.fontFamily) && [t.fontStyle, t.fontWeight, (t.fontSize || 12) + "px", t.fontFamily || "sans-serif"].join(" ");
    return e && E(e) || t.textFont || t.font
  }

  function ni(t, e) {
    var n, i, r, a, o = e.x,
      s = e.y,
      l = e.width,
      u = e.height,
      h = e.r;
    0 > l && (o += l, l = -l), 0 > u && (s += u, u = -u), "number" == typeof h ? n = i = r = a = h : h instanceof Array ? 1 === h.length ? n = i = r = a = h[0] : 2 === h.length ? (n = r = h[0], i = a = h[1]) : 3 === h.length ? (n = h[0], i = a = h[1], r = h[2]) : (n = h[0], i = h[1], r = h[2], a = h[3]) : n = i = r = a = 0;
    var c;
    n + i > l && (c = n + i, n *= l / c, i *= l / c), r + a > l && (c = r + a, r *= l / c, a *= l / c), i + r > u && (c = i + r, i *= u / c, r *= u / c), n + a > u && (c = n + a, n *= u / c, a *= u / c), t.moveTo(o + n, s), t.lineTo(o + l - i, s), 0 !== i && t.arc(o + l - i, s + i, i, -Math.PI / 2, 0), t.lineTo(o + l, s + u - r), 0 !== r && t.arc(o + l - r, s + u - r, r, 0, Math.PI / 2), t.lineTo(o + a, s + u), 0 !== a && t.arc(o + a, s + u - a, a, Math.PI / 2, Math.PI), t.lineTo(o, s + n), 0 !== n && t.arc(o + n, s + n, n, Math.PI, 1.5 * Math.PI)
  }

  function ii(t) {
    return ri(t), d(t.rich, ri), t
  }

  function ri(t) {
    if (t) {
      t.font = ei(t);
      var e = t.textAlign;
      "middle" === e && (e = "center"), t.textAlign = null == e || Gd[e] ? e : "left";
      var n = t.textVerticalAlign || t.textBaseline;
      "center" === n && (n = "middle"), t.textVerticalAlign = null == n || Xd[n] ? n : "top";
      var i = t.textPadding;
      i && (t.textPadding = L(t.textPadding))
    }
  }

  function ai(t, e, n, i, r, a) {
    i.rich ? si(t, e, n, i, r, a) : oi(t, e, n, i, r, a)
  }

  function oi(t, e, n, i, r, a) {
    var o, s = ci(i),
      l = !1,
      u = e.__attrCachedBy === Td.PLAIN_TEXT;
    a !== Cd ? (a && (o = a.style, l = !s && u && o), e.__attrCachedBy = s ? Td.NONE : Td.PLAIN_TEXT) : u && (e.__attrCachedBy = Td.NONE);
    var h = i.font || Wd;
    l && h === (o.font || Wd) || (e.font = h);
    var c = t.__computedFont;
    t.__styleFont !== h && (t.__styleFont = h, c = t.__computedFont = e.font);
    var f = i.textPadding,
      d = i.textLineHeight,
      p = t.__textCotentBlock;
    (!p || t.__dirtyText) && (p = t.__textCotentBlock = Qn(n, c, f, d, i.truncate));
    var g = p.outerHeight,
      v = p.lines,
      m = p.lineHeight,
      y = pi(jd, t, i, r),
      _ = y.baseX,
      x = y.baseY,
      w = y.textAlign || "left",
      b = y.textVerticalAlign;
    ui(e, i, r, _, x);
    var S = Xn(x, g, b),
      M = _,
      T = S;
    if (s || f) {
      var C = Fn(n, c),
        I = C;
      f && (I += f[1] + f[3]);
      var k = Gn(_, I, w);
      s && fi(t, e, i, k, S, I, g), f && (M = _i(_, w, f), T += f[0])
    }
    e.textAlign = w, e.textBaseline = "middle", e.globalAlpha = i.opacity || 1;
    for (var A = 0; A < qd.length; A++) {
      var D = qd[A],
        P = D[0],
        L = D[1],
        O = i[P];
      l && O === o[P] || (e[L] = Md(e, L, O || D[2]))
    }
    T += m / 2;
    var E = i.textStrokeWidth,
      B = l ? o.textStrokeWidth : null,
      R = !l || E !== B,
      z = !l || R || i.textStroke !== o.textStroke,
      N = vi(i.textStroke, E),
      F = mi(i.textFill);
    if (N && (R && (e.lineWidth = E), z && (e.strokeStyle = N)), F && (l && i.textFill === o.textFill || (e.fillStyle = F)), 1 === v.length) N && e.strokeText(v[0], M, T), F && e.fillText(v[0], M, T);
    else
      for (var A = 0; A < v.length; A++) N && e.strokeText(v[A], M, T), F && e.fillText(v[A], M, T), T += m
  }

  function si(t, e, n, i, r, a) {
    a !== Cd && (e.__attrCachedBy = Td.NONE);
    var o = t.__textCotentBlock;
    (!o || t.__dirtyText) && (o = t.__textCotentBlock = Jn(n, i)), li(t, e, o, i, r)
  }

  function li(t, e, n, i, r) {
    var a = n.width,
      o = n.outerWidth,
      s = n.outerHeight,
      l = i.textPadding,
      u = pi(jd, t, i, r),
      h = u.baseX,
      c = u.baseY,
      f = u.textAlign,
      d = u.textVerticalAlign;
    ui(e, i, r, h, c);
    var p = Gn(h, o, f),
      g = Xn(c, s, d),
      v = p,
      m = g;
    l && (v += l[3], m += l[0]);
    var y = v + a;
    ci(i) && fi(t, e, i, p, g, o, s);
    for (var _ = 0; _ < n.lines.length; _++) {
      for (var x, w = n.lines[_], b = w.tokens, S = b.length, M = w.lineHeight, T = w.width, C = 0, I = v, k = y, A = S - 1; S > C && (x = b[C], !x.textAlign || "left" === x.textAlign);) hi(t, e, x, i, M, m, I, "left"), T -= x.width, I += x.width, C++;
      for (; A >= 0 && (x = b[A], "right" === x.textAlign);) hi(t, e, x, i, M, m, k, "right"), T -= x.width, k -= x.width, A--;
      for (I += (a - (I - v) - (y - k) - T) / 2; A >= C;) x = b[C], hi(t, e, x, i, M, m, I + x.width / 2, "center"), I += x.width, C++;
      m += M
    }
  }

  function ui(t, e, n, i, r) {
    if (n && e.textRotation) {
      var a = e.textOrigin;
      "center" === a ? (i = n.width / 2 + n.x, r = n.height / 2 + n.y) : a && (i = a[0] + n.x, r = a[1] + n.y), t.translate(i, r), t.rotate(-e.textRotation), t.translate(-i, -r)
    }
  }

  function hi(t, e, n, i, r, a, o, s) {
    var l = i.rich[n.styleName] || {};
    l.text = n.text;
    var u = n.textVerticalAlign,
      h = a + r / 2;
    "top" === u ? h = a + n.height / 2 : "bottom" === u && (h = a + r - n.height / 2), !n.isLineHolder && ci(l) && fi(t, e, l, "right" === s ? o - n.width : "center" === s ? o - n.width / 2 : o, h - n.height / 2, n.width, n.height);
    var c = n.textPadding;
    c && (o = _i(o, s, c), h -= n.height / 2 - c[2] - n.textHeight / 2), gi(e, "shadowBlur", D(l.textShadowBlur, i.textShadowBlur, 0)), gi(e, "shadowColor", l.textShadowColor || i.textShadowColor || "transparent"), gi(e, "shadowOffsetX", D(l.textShadowOffsetX, i.textShadowOffsetX, 0)), gi(e, "shadowOffsetY", D(l.textShadowOffsetY, i.textShadowOffsetY, 0)), gi(e, "textAlign", s), gi(e, "textBaseline", "middle"), gi(e, "font", n.font || Wd);
    var f = vi(l.textStroke || i.textStroke, p),
      d = mi(l.textFill || i.textFill),
      p = A(l.textStrokeWidth, i.textStrokeWidth);
    f && (gi(e, "lineWidth", p), gi(e, "strokeStyle", f), e.strokeText(n.text, o, h)), d && (gi(e, "fillStyle", d), e.fillText(n.text, o, h))
  }

  function ci(t) {
    return !!(t.textBackgroundColor || t.textBorderWidth && t.textBorderColor)
  }

  function fi(t, e, n, i, r, a, o) {
    var s = n.textBackgroundColor,
      l = n.textBorderWidth,
      u = n.textBorderColor,
      h = b(s);
    if (gi(e, "shadowBlur", n.textBoxShadowBlur || 0), gi(e, "shadowColor", n.textBoxShadowColor || "transparent"), gi(e, "shadowOffsetX", n.textBoxShadowOffsetX || 0), gi(e, "shadowOffsetY", n.textBoxShadowOffsetY || 0), h || l && u) {
      e.beginPath();
      var c = n.textBorderRadius;
      c ? ni(e, {
        x: i,
        y: r,
        width: a,
        height: o,
        r: c
      }) : e.rect(i, r, a, o), e.closePath()
    }
    if (h)
      if (gi(e, "fillStyle", s), null != n.fillOpacity) {
        var f = e.globalAlpha;
        e.globalAlpha = n.fillOpacity * n.opacity, e.fill(), e.globalAlpha = f
      } else e.fill();
    else if (S(s)) {
      var d = s.image;
      d = Rn(d, null, t, di, s), d && Nn(d) && e.drawImage(d, i, r, a, o)
    }
    if (l && u)
      if (gi(e, "lineWidth", l), gi(e, "strokeStyle", u), null != n.strokeOpacity) {
        var f = e.globalAlpha;
        e.globalAlpha = n.strokeOpacity * n.opacity, e.stroke(), e.globalAlpha = f
      } else e.stroke()
  }

  function di(t, e) {
    e.image = t
  }

  function pi(t, e, n, i) {
    var r = n.x || 0,
      a = n.y || 0,
      o = n.textAlign,
      s = n.textVerticalAlign;
    if (i) {
      var l = n.textPosition;
      if (l instanceof Array) r = i.x + yi(l[0], i.width), a = i.y + yi(l[1], i.height);
      else {
        var u = e && e.calculateTextPosition ? e.calculateTextPosition(Ud, n, i) : qn(Ud, n, i);
        r = u.x, a = u.y, o = o || u.textAlign, s = s || u.textVerticalAlign
      }
      var h = n.textOffset;
      h && (r += h[0], a += h[1])
    }
    return t = t || {}, t.baseX = r, t.baseY = a, t.textAlign = o, t.textVerticalAlign = s, t
  }

  function gi(t, e, n) {
    return t[e] = Md(t, e, n), t[e]
  }

  function vi(t, e) {
    return null == t || 0 >= e || "transparent" === t || "none" === t ? null : t.image || t.colorStops ? "#000" : t
  }

  function mi(t) {
    return null == t || "none" === t ? null : t.image || t.colorStops ? "#000" : t
  }

  function yi(t, e) {
    return "string" == typeof t ? t.lastIndexOf("%") >= 0 ? parseFloat(t) / 100 * e : parseFloat(t) : t
  }

  function _i(t, e, n) {
    return "right" === e ? t - n[1] : "center" === e ? t + n[3] / 2 - n[1] / 2 : t + n[3]
  }

  function xi(t, e) {
    return null != t && (t || e.textBackgroundColor || e.textBorderWidth && e.textBorderColor || e.textPadding)
  }

  function wi(t) {
    t = t || {}, gd.call(this, t);
    for (var e in t) t.hasOwnProperty(e) && "style" !== e && (this[e] = t[e]);
    this.style = new kd(t.style, this), this._rect = null, this.__clipPaths = null
  }

  function bi(t) {
    wi.call(this, t)
  }

  function Si(t) {
    return parseInt(t, 10)
  }

  function Mi(t) {
    return t ? t.__builtin__ ? !0 : "function" != typeof t.resize || "function" != typeof t.refresh ? !1 : !0 : !1
  }

  function Ti(t, e, n) {
    return tp.copy(t.getBoundingRect()), t.transform && tp.applyTransform(t.transform), ep.width = e, ep.height = n, !tp.intersect(ep)
  }

  function Ci(t, e) {
    if (t === e) return !1;
    if (!t || !e || t.length !== e.length) return !0;
    for (var n = 0; n < t.length; n++)
      if (t[n] !== e[n]) return !0;
    return !1
  }

  function Ii(t, e) {
    for (var n = 0; n < t.length; n++) {
      var i = t[n];
      i.setTransform(e), e.beginPath(), i.buildPath(e, i.shape), e.clip(), i.restoreTransform(e)
    }
  }

  function ki(t, e) {
    var n = document.createElement("div");
    return n.style.cssText = ["position:relative", "overflow:hidden", "width:" + t + "px", "height:" + e + "px", "padding:0", "margin:0", "border-width:0"].join(";") + ";", n
  }

  function Ai(t) {
    return "mousewheel" === t && of .browser.firefox ? "DOMMouseScroll" : t
  }

  function Di(t) {
    t._touching = !0, clearTimeout(t._touchTimer), t._touchTimer = setTimeout(function() {
      t._touching = !1
    }, 700)
  }

  function Pi(t) {
    var e = t.pointerType;
    return "pen" === e || "touch" === e
  }

  function Li(t) {
    function e(t, e) {
      return function() {
        return e._touching ? void 0 : t.apply(e, arguments)
      }
    }
    d(op, function(e) {
      t._handlers[e] = y(up[e], t)
    }), d(lp, function(e) {
      t._handlers[e] = y(up[e], t)
    }), d(ap, function(n) {
      t._handlers[n] = e(up[n], t)
    })
  }

  function Oi(t) {
    function e(e, n) {
      d(e, function(e) {
        _e(t, Ai(e), n._handlers[e])
      }, n)
    }
    kf.call(this), this.dom = t, this._touching = !1, this._touchTimer, this._handlers = {}, Li(this), of .pointerEventsSupported ? e(lp, this) : ( of .touchEventsSupported && e(op, this), e(ap, this))
  }

  function Ei(t, e) {
    var n = new gp(rf(), t, e);
    return dp[n.id] = n, n
  }

  function Bi(t) {
    if (t) t.dispose();
    else {
      for (var e in dp) dp.hasOwnProperty(e) && dp[e].dispose();
      dp = {}
    }
    return this
  }

  function Ri(t) {
    return dp[t]
  }

  function zi(t, e) {
    fp[t] = e
  }

  function Ni(t) {
    delete dp[t]
  }

  function Fi(t) {
    return t instanceof Array ? t : null == t ? [] : [t]
  }

  function Vi(t, e, n) {
    if (t) {
      t[e] = t[e] || {}, t.emphasis = t.emphasis || {}, t.emphasis[e] = t.emphasis[e] || {};
      for (var i = 0, r = n.length; r > i; i++) {
        var a = n[i];
        !t.emphasis[e].hasOwnProperty(a) && t[e].hasOwnProperty(a) && (t.emphasis[e][a] = t[e][a])
      }
    }
  }

  function Hi(t) {
    return !yp(t) || _p(t) || t instanceof Date ? t : t.value
  }

  function Wi(t) {
    return yp(t) && !(t instanceof Array)
  }

  function Gi(t, e) {
    e = (e || []).slice();
    var n = p(t || [], function(t) {
      return {
        exist: t
      }
    });
    return mp(e, function(t, i) {
      if (yp(t)) {
        for (var r = 0; r < n.length; r++)
          if (!n[r].option && null != t.id && n[r].exist.id === t.id + "") return n[r].option = t, void(e[i] = null);
        for (var r = 0; r < n.length; r++) {
          var a = n[r].exist;
          if (!(n[r].option || null != a.id && null != t.id || null == t.name || Ui(t) || Ui(a) || a.name !== t.name + "")) return n[r].option = t, void(e[i] = null)
        }
      }
    }), mp(e, function(t) {
      if (yp(t)) {
        for (var e = 0; e < n.length; e++) {
          var i = n[e].exist;
          if (!n[e].option && !Ui(i) && null == t.id) {
            n[e].option = t;
            break
          }
        }
        e >= n.length && n.push({
          option: t
        })
      }
    }), n
  }

  function Xi(t) {
    var e = N();
    mp(t, function(t) {
      var n = t.exist;
      n && e.set(n.id, t)
    }), mp(t, function(t) {
      var n = t.option;
      O(!n || null == n.id || !e.get(n.id) || e.get(n.id) === t, "id duplicates: " + (n && n.id)), n && null != n.id && e.set(n.id, t), !t.keyInfo && (t.keyInfo = {})
    }), mp(t, function(t, n) {
      var i = t.exist,
        r = t.option,
        a = t.keyInfo;
      if (yp(r)) {
        if (a.name = null != r.name ? r.name + "" : i ? i.name : xp + n, i) a.id = i.id;
        else if (null != r.id) a.id = r.id + "";
        else {
          var o = 0;
          do a.id = "\x00" + a.name + "\x00" + o++; while (e.get(a.id))
        }
        e.set(a.id, t)
      }
    })
  }

  function qi(t) {
    var e = t.name;
    return !(!e || !e.indexOf(xp))
  }

  function Ui(t) {
    return yp(t) && t.id && 0 === (t.id + "").indexOf("\x00_ec_\x00")
  }

  function ji(t, e) {
    return null != e.dataIndexInside ? e.dataIndexInside : null != e.dataIndex ? x(e.dataIndex) ? p(e.dataIndex, function(e) {
      return t.indexOfRawIndex(e)
    }) : t.indexOfRawIndex(e.dataIndex) : null != e.name ? x(e.name) ? p(e.name, function(e) {
      return t.indexOfName(e)
    }) : t.indexOfName(e.name) : void 0
  }

  function Yi() {
    var t = "__\x00ec_inner_" + bp++ + "_" + Math.random().toFixed(5);
    return function(e) {
      return e[t] || (e[t] = {})
    }
  }

  function Zi(t, e, n) {
    if (b(e)) {
      var i = {};
      i[e + "Index"] = 0, e = i
    }
    var r = n && n.defaultMainType;
    !r || $i(e, r + "Index") || $i(e, r + "Id") || $i(e, r + "Name") || (e[r + "Index"] = 0);
    var a = {};
    return mp(e, function(i, r) {
      var i = e[r];
      if ("dataIndex" === r || "dataIndexInside" === r) return void(a[r] = i);
      var o = r.match(/^(\w+)(Index|Id|Name)$/) || [],
        s = o[1],
        l = (o[2] || "").toLowerCase();
      if (!(!s || !l || null == i || "index" === l && "none" === i || n && n.includeMainTypes && u(n.includeMainTypes, s) < 0)) {
        var h = {
          mainType: s
        };
        ("index" !== l || "all" !== i) && (h[l] = i);
        var c = t.queryComponents(h);
        a[s + "Models"] = c, a[s + "Model"] = c[0]
      }
    }), a
  }

  function $i(t, e) {
    return t && t.hasOwnProperty(e)
  }

  function Ki(t, e, n) {
    t.setAttribute ? t.setAttribute(e, n) : t[e] = n
  }

  function Qi(t, e) {
    return t.getAttribute ? t.getAttribute(e) : t[e]
  }

  function Ji(t) {
    return "auto" === t ? of .domSupported ? "html" : "richText" : t || "html"
  }

  function tr(t) {
    var e = {
      main: "",
      sub: ""
    };
    return t && (t = t.split(Sp), e.main = t[0] || "", e.sub = t[1] || ""), e
  }

  function er(t) {
    O(/^[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)?$/.test(t), 'componentType "' + t + '" illegal')
  }

  function nr(t) {
    t.$constructor = t, t.extend = function(t) {
      var e = this,
        n = function() {
          t.$constructor ? t.$constructor.apply(this, arguments) : e.apply(this, arguments)
        };
      return o(n.prototype, t), n.extend = this.extend, n.superCall = rr, n.superApply = ar, h(n, this), n.superClass = e, n
    }
  }

  function ir(t) {
    var e = ["__\x00is_clz", Tp++, Math.random().toFixed(3)].join("_");
    t.prototype[e] = !0, t.isInstance = function(t) {
      return !(!t || !t[e])
    }
  }

  function rr(t, e) {
    var n = P(arguments, 2);
    return this.superClass.prototype[e].apply(t, n)
  }

  function ar(t, e, n) {
    return this.superClass.prototype[e].apply(t, n)
  }

  function or(t, e) {
    function n(t) {
      var e = i[t.main];
      return e && e[Mp] || (e = i[t.main] = {}, e[Mp] = !0), e
    }
    e = e || {};
    var i = {};
    if (t.registerClass = function(t, e) {
        if (e)
          if (er(e), e = tr(e), e.sub) {
            if (e.sub !== Mp) {
              var r = n(e);
              r[e.sub] = t
            }
          } else i[e.main] = t;
        return t
      }, t.getClass = function(t, e, n) {
        var r = i[t];
        if (r && r[Mp] && (r = e ? r[e] : null), n && !r) throw new Error(e ? "Component " + t + "." + (e || "") + " not exists. Load it first." : t + ".type should be specified.");
        return r
      }, t.getClassesByMainType = function(t) {
        t = tr(t);
        var e = [],
          n = i[t.main];
        return n && n[Mp] ? d(n, function(t, n) {
          n !== Mp && e.push(t)
        }) : e.push(n), e
      }, t.hasClass = function(t) {
        return t = tr(t), !!i[t.main]
      }, t.getAllClassMainTypes = function() {
        var t = [];
        return d(i, function(e, n) {
          t.push(n)
        }), t
      }, t.hasSubTypes = function(t) {
        t = tr(t);
        var e = i[t.main];
        return e && e[Mp]
      }, t.parseClassType = tr, e.registerWhenExtend) {
      var r = t.extend;
      r && (t.extend = function(e) {
        var n = r.call(this, e);
        return t.registerClass(n, e.type)
      })
    }
    return t
  }

  function sr(t) {
    return t > -Op && Op > t
  }

  function lr(t) {
    return t > Op || -Op > t
  }

  function ur(t, e, n, i, r) {
    var a = 1 - r;
    return a * a * (a * t + 3 * r * e) + r * r * (r * i + 3 * a * n)
  }

  function hr(t, e, n, i, r) {
    var a = 1 - r;
    return 3 * (((e - t) * a + 2 * (n - e) * r) * a + (i - n) * r * r)
  }

  function cr(t, e, n, i, r, a) {
    var o = i + 3 * (e - n) - t,
      s = 3 * (n - 2 * e + t),
      l = 3 * (e - t),
      u = t - r,
      h = s * s - 3 * o * l,
      c = s * l - 9 * o * u,
      f = l * l - 3 * s * u,
      d = 0;
    if (sr(h) && sr(c))
      if (sr(s)) a[0] = 0;
      else {
        var p = -l / s;
        p >= 0 && 1 >= p && (a[d++] = p)
      }
    else {
      var g = c * c - 4 * h * f;
      if (sr(g)) {
        var v = c / h,
          p = -s / o + v,
          m = -v / 2;
        p >= 0 && 1 >= p && (a[d++] = p), m >= 0 && 1 >= m && (a[d++] = m)
      } else if (g > 0) {
        var y = Lp(g),
          _ = h * s + 1.5 * o * (-c + y),
          x = h * s + 1.5 * o * (-c - y);
        _ = 0 > _ ? -Pp(-_, Rp) : Pp(_, Rp), x = 0 > x ? -Pp(-x, Rp) : Pp(x, Rp);
        var p = (-s - (_ + x)) / (3 * o);
        p >= 0 && 1 >= p && (a[d++] = p)
      } else {
        var w = (2 * h * s - 3 * o * c) / (2 * Lp(h * h * h)),
          b = Math.acos(w) / 3,
          S = Lp(h),
          M = Math.cos(b),
          p = (-s - 2 * S * M) / (3 * o),
          m = (-s + S * (M + Bp * Math.sin(b))) / (3 * o),
          T = (-s + S * (M - Bp * Math.sin(b))) / (3 * o);
        p >= 0 && 1 >= p && (a[d++] = p), m >= 0 && 1 >= m && (a[d++] = m), T >= 0 && 1 >= T && (a[d++] = T)
      }
    }
    return d
  }

  function fr(t, e, n, i, r) {
    var a = 6 * n - 12 * e + 6 * t,
      o = 9 * e + 3 * i - 3 * t - 9 * n,
      s = 3 * e - 3 * t,
      l = 0;
    if (sr(o)) {
      if (lr(a)) {
        var u = -s / a;
        u >= 0 && 1 >= u && (r[l++] = u)
      }
    } else {
      var h = a * a - 4 * o * s;
      if (sr(h)) r[0] = -a / (2 * o);
      else if (h > 0) {
        var c = Lp(h),
          u = (-a + c) / (2 * o),
          f = (-a - c) / (2 * o);
        u >= 0 && 1 >= u && (r[l++] = u), f >= 0 && 1 >= f && (r[l++] = f)
      }
    }
    return l
  }

  function dr(t, e, n, i, r, a) {
    var o = (e - t) * r + t,
      s = (n - e) * r + e,
      l = (i - n) * r + n,
      u = (s - o) * r + o,
      h = (l - s) * r + s,
      c = (h - u) * r + u;
    a[0] = t, a[1] = o, a[2] = u, a[3] = c, a[4] = c, a[5] = h, a[6] = l, a[7] = i
  }

  function pr(t, e, n, i, r, a, o, s, l, u, h) {
    var c, f, d, p, g, v = .005,
      m = 1 / 0;
    zp[0] = l, zp[1] = u;
    for (var y = 0; 1 > y; y += .05) Np[0] = ur(t, n, r, o, y), Np[1] = ur(e, i, a, s, y), p = Tf(zp, Np), m > p && (c = y, m = p);
    m = 1 / 0;
    for (var _ = 0; 32 > _ && !(Ep > v); _++) f = c - v, d = c + v, Np[0] = ur(t, n, r, o, f), Np[1] = ur(e, i, a, s, f), p = Tf(Np, zp), f >= 0 && m > p ? (c = f, m = p) : (Fp[0] = ur(t, n, r, o, d), Fp[1] = ur(e, i, a, s, d), g = Tf(Fp, zp), 1 >= d && m > g ? (c = d, m = g) : v *= .5);
    return h && (h[0] = ur(t, n, r, o, c), h[1] = ur(e, i, a, s, c)), Lp(m)
  }

  function gr(t, e, n, i) {
    var r = 1 - i;
    return r * (r * t + 2 * i * e) + i * i * n
  }

  function vr(t, e, n, i) {
    return 2 * ((1 - i) * (e - t) + i * (n - e))
  }

  function mr(t, e, n, i, r) {
    var a = t - 2 * e + n,
      o = 2 * (e - t),
      s = t - i,
      l = 0;
    if (sr(a)) {
      if (lr(o)) {
        var u = -s / o;
        u >= 0 && 1 >= u && (r[l++] = u)
      }
    } else {
      var h = o * o - 4 * a * s;
      if (sr(h)) {
        var u = -o / (2 * a);
        u >= 0 && 1 >= u && (r[l++] = u)
      } else if (h > 0) {
        var c = Lp(h),
          u = (-o + c) / (2 * a),
          f = (-o - c) / (2 * a);
        u >= 0 && 1 >= u && (r[l++] = u), f >= 0 && 1 >= f && (r[l++] = f)
      }
    }
    return l
  }

  function yr(t, e, n) {
    var i = t + n - 2 * e;
    return 0 === i ? .5 : (t - e) / i
  }

  function _r(t, e, n, i, r) {
    var a = (e - t) * i + t,
      o = (n - e) * i + e,
      s = (o - a) * i + a;
    r[0] = t, r[1] = a, r[2] = s, r[3] = s, r[4] = o, r[5] = n
  }

  function xr(t, e, n, i, r, a, o, s, l) {
    var u, h = .005,
      c = 1 / 0;
    zp[0] = o, zp[1] = s;
    for (var f = 0; 1 > f; f += .05) {
      Np[0] = gr(t, n, r, f), Np[1] = gr(e, i, a, f);
      var d = Tf(zp, Np);
      c > d && (u = f, c = d)
    }
    c = 1 / 0;
    for (var p = 0; 32 > p && !(Ep > h); p++) {
      var g = u - h,
        v = u + h;
      Np[0] = gr(t, n, r, g), Np[1] = gr(e, i, a, g);
      var d = Tf(Np, zp);
      if (g >= 0 && c > d) u = g, c = d;
      else {
        Fp[0] = gr(t, n, r, v), Fp[1] = gr(e, i, a, v);
        var m = Tf(Fp, zp);
        1 >= v && c > m ? (u = v, c = m) : h *= .5
      }
    }
    return l && (l[0] = gr(t, n, r, u), l[1] = gr(e, i, a, u)), Lp(c)
  }

  function wr(t, e, n) {
    if (0 !== t.length) {
      var i, r = t[0],
        a = r[0],
        o = r[0],
        s = r[1],
        l = r[1];
      for (i = 1; i < t.length; i++) r = t[i], a = Vp(a, r[0]), o = Hp(o, r[0]), s = Vp(s, r[1]), l = Hp(l, r[1]);
      e[0] = a, e[1] = s, n[0] = o, n[1] = l
    }
  }

  function br(t, e, n, i, r, a) {
    r[0] = Vp(t, n), r[1] = Vp(e, i), a[0] = Hp(t, n), a[1] = Hp(e, i)
  }

  function Sr(t, e, n, i, r, a, o, s, l, u) {
    var h, c = fr,
      f = ur,
      d = c(t, n, r, o, Yp);
    for (l[0] = 1 / 0, l[1] = 1 / 0, u[0] = -1 / 0, u[1] = -1 / 0, h = 0; d > h; h++) {
      var p = f(t, n, r, o, Yp[h]);
      l[0] = Vp(p, l[0]), u[0] = Hp(p, u[0])
    }
    for (d = c(e, i, a, s, Zp), h = 0; d > h; h++) {
      var g = f(e, i, a, s, Zp[h]);
      l[1] = Vp(g, l[1]), u[1] = Hp(g, u[1])
    }
    l[0] = Vp(t, l[0]), u[0] = Hp(t, u[0]), l[0] = Vp(o, l[0]), u[0] = Hp(o, u[0]), l[1] = Vp(e, l[1]), u[1] = Hp(e, u[1]), l[1] = Vp(s, l[1]), u[1] = Hp(s, u[1])
  }

  function Mr(t, e, n, i, r, a, o, s) {
    var l = yr,
      u = gr,
      h = Hp(Vp(l(t, n, r), 1), 0),
      c = Hp(Vp(l(e, i, a), 1), 0),
      f = u(t, n, r, h),
      d = u(e, i, a, c);
    o[0] = Vp(t, r, f), o[1] = Vp(e, a, d), s[0] = Hp(t, r, f), s[1] = Hp(e, a, d)
  }

  function Tr(t, e, n, i, r, a, o, s, l) {
    var u = oe,
      h = se,
      c = Math.abs(r - a);
    if (1e-4 > c % Xp && c > 1e-4) return s[0] = t - n, s[1] = e - i, l[0] = t + n, void(l[1] = e + i);
    if (qp[0] = Gp(r) * n + t, qp[1] = Wp(r) * i + e, Up[0] = Gp(a) * n + t, Up[1] = Wp(a) * i + e, u(s, qp, Up), h(l, qp, Up), r %= Xp, 0 > r && (r += Xp), a %= Xp, 0 > a && (a += Xp), r > a && !o ? a += Xp : a > r && o && (r += Xp), o) {
      var f = a;
      a = r, r = f
    }
    for (var d = 0; a > d; d += Math.PI / 2) d > r && (jp[0] = Gp(d) * n + t, jp[1] = Wp(d) * i + e, u(s, jp, s), h(l, jp, l))
  }

  function Cr(t, e, n, i, r, a, o) {
    if (0 === r) return !1;
    var s = r,
      l = 0,
      u = t;
    if (o > e + s && o > i + s || e - s > o && i - s > o || a > t + s && a > n + s || t - s > a && n - s > a) return !1;
    if (t === n) return Math.abs(a - t) <= s / 2;
    l = (e - i) / (t - n), u = (t * i - n * e) / (t - n);
    var h = l * a - o + u,
      c = h * h / (l * l + 1);
    return s / 2 * s / 2 >= c
  }

  function Ir(t, e, n, i, r, a, o, s, l, u, h) {
    if (0 === l) return !1;
    var c = l;
    if (h > e + c && h > i + c && h > a + c && h > s + c || e - c > h && i - c > h && a - c > h && s - c > h || u > t + c && u > n + c && u > r + c && u > o + c || t - c > u && n - c > u && r - c > u && o - c > u) return !1;
    var f = pr(t, e, n, i, r, a, o, s, u, h, null);
    return c / 2 >= f
  }

  function kr(t, e, n, i, r, a, o, s, l) {
    if (0 === o) return !1;
    var u = o;
    if (l > e + u && l > i + u && l > a + u || e - u > l && i - u > l && a - u > l || s > t + u && s > n + u && s > r + u || t - u > s && n - u > s && r - u > s) return !1;
    var h = xr(t, e, n, i, r, a, s, l, null);
    return u / 2 >= h
  }

  function Ar(t) {
    return t %= ug, 0 > t && (t += ug), t
  }

  function Dr(t, e, n, i, r, a, o, s, l) {
    if (0 === o) return !1;
    var u = o;
    s -= t, l -= e;
    var h = Math.sqrt(s * s + l * l);
    if (h - u > n || n > h + u) return !1;
    if (Math.abs(i - r) % hg < 1e-4) return !0;
    if (a) {
      var c = i;
      i = Ar(r), r = Ar(c)
    } else i = Ar(i), r = Ar(r);
    i > r && (r += hg);
    var f = Math.atan2(l, s);
    return 0 > f && (f += hg), f >= i && r >= f || f + hg >= i && r >= f + hg
  }

  function Pr(t, e, n, i, r, a) {
    if (a > e && a > i || e > a && i > a) return 0;
    if (i === e) return 0;
    var o = e > i ? 1 : -1,
      s = (a - e) / (i - e);
    (1 === s || 0 === s) && (o = e > i ? .5 : -.5);
    var l = s * (n - t) + t;
    return l === r ? 1 / 0 : l > r ? o : 0
  }

  function Lr(t, e) {
    return Math.abs(t - e) < dg
  }

  function Or() {
    var t = gg[0];
    gg[0] = gg[1], gg[1] = t
  }

  function Er(t, e, n, i, r, a, o, s, l, u) {
    if (u > e && u > i && u > a && u > s || e > u && i > u && a > u && s > u) return 0;
    var h = cr(e, i, a, s, u, pg);
    if (0 === h) return 0;
    for (var c, f, d = 0, p = -1, g = 0; h > g; g++) {
      var v = pg[g],
        m = 0 === v || 1 === v ? .5 : 1,
        y = ur(t, n, r, o, v);
      l > y || (0 > p && (p = fr(e, i, a, s, gg), gg[1] < gg[0] && p > 1 && Or(), c = ur(e, i, a, s, gg[0]), p > 1 && (f = ur(e, i, a, s, gg[1]))), d += 2 === p ? v < gg[0] ? e > c ? m : -m : v < gg[1] ? c > f ? m : -m : f > s ? m : -m : v < gg[0] ? e > c ? m : -m : c > s ? m : -m)
    }
    return d
  }

  function Br(t, e, n, i, r, a, o, s) {
    if (s > e && s > i && s > a || e > s && i > s && a > s) return 0;
    var l = mr(e, i, a, s, pg);
    if (0 === l) return 0;
    var u = yr(e, i, a);
    if (u >= 0 && 1 >= u) {
      for (var h = 0, c = gr(e, i, a, u), f = 0; l > f; f++) {
        var d = 0 === pg[f] || 1 === pg[f] ? .5 : 1,
          p = gr(t, n, r, pg[f]);
        o > p || (h += pg[f] < u ? e > c ? d : -d : c > a ? d : -d)
      }
      return h
    }
    var d = 0 === pg[0] || 1 === pg[0] ? .5 : 1,
      p = gr(t, n, r, pg[0]);
    return o > p ? 0 : e > a ? d : -d
  }

  function Rr(t, e, n, i, r, a, o, s) {
    if (s -= e, s > n || -n > s) return 0;
    var l = Math.sqrt(n * n - s * s);
    pg[0] = -l, pg[1] = l;
    var u = Math.abs(i - r);
    if (1e-4 > u) return 0;
    if (1e-4 > u % fg) {
      i = 0, r = fg;
      var h = a ? 1 : -1;
      return o >= pg[0] + t && o <= pg[1] + t ? h : 0
    }
    if (a) {
      var l = i;
      i = Ar(r), r = Ar(l)
    } else i = Ar(i), r = Ar(r);
    i > r && (r += fg);
    for (var c = 0, f = 0; 2 > f; f++) {
      var d = pg[f];
      if (d + t > o) {
        var p = Math.atan2(s, d),
          h = a ? 1 : -1;
        0 > p && (p = fg + p), (p >= i && r >= p || p + fg >= i && r >= p + fg) && (p > Math.PI / 2 && p < 1.5 * Math.PI && (h = -h), c += h)
      }
    }
    return c
  }

  function zr(t, e, n, i, r) {
    for (var a = 0, o = 0, s = 0, l = 0, u = 0, h = 0; h < t.length;) {
      var c = t[h++];
      switch (c === cg.M && h > 1 && (n || (a += Pr(o, s, l, u, i, r))), 1 === h && (o = t[h], s = t[h + 1], l = o, u = s), c) {
        case cg.M:
          l = t[h++], u = t[h++], o = l, s = u;
          break;
        case cg.L:
          if (n) {
            if (Cr(o, s, t[h], t[h + 1], e, i, r)) return !0
          } else a += Pr(o, s, t[h], t[h + 1], i, r) || 0;
          o = t[h++], s = t[h++];
          break;
        case cg.C:
          if (n) {
            if (Ir(o, s, t[h++], t[h++], t[h++], t[h++], t[h], t[h + 1], e, i, r)) return !0
          } else a += Er(o, s, t[h++], t[h++], t[h++], t[h++], t[h], t[h + 1], i, r) || 0;
          o = t[h++], s = t[h++];
          break;
        case cg.Q:
          if (n) {
            if (kr(o, s, t[h++], t[h++], t[h], t[h + 1], e, i, r)) return !0
          } else a += Br(o, s, t[h++], t[h++], t[h], t[h + 1], i, r) || 0;
          o = t[h++], s = t[h++];
          break;
        case cg.A:
          var f = t[h++],
            d = t[h++],
            p = t[h++],
            g = t[h++],
            v = t[h++],
            m = t[h++];
          h += 1;
          var y = 1 - t[h++],
            _ = Math.cos(v) * p + f,
            x = Math.sin(v) * g + d;
          h > 1 ? a += Pr(o, s, _, x, i, r) : (l = _, u = x);
          var w = (i - f) * g / p + f;
          if (n) {
            if (Dr(f, d, g, v, v + m, y, e, w, r)) return !0
          } else a += Rr(f, d, g, v, v + m, y, w, r);
          o = Math.cos(v + m) * p + f, s = Math.sin(v + m) * g + d;
          break;
        case cg.R:
          l = o = t[h++], u = s = t[h++];
          var b = t[h++],
            S = t[h++],
            _ = l + b,
            x = u + S;
          if (n) {
            if (Cr(l, u, _, u, e, i, r) || Cr(_, u, _, x, e, i, r) || Cr(_, x, l, x, e, i, r) || Cr(l, x, l, u, e, i, r)) return !0
          } else a += Pr(_, u, _, x, i, r), a += Pr(l, x, l, u, i, r);
          break;
        case cg.Z:
          if (n) {
            if (Cr(o, s, l, u, e, i, r)) return !0
          } else a += Pr(o, s, l, u, i, r);
          o = l, s = u
      }
    }
    return n || Lr(s, u) || (a += Pr(o, s, l, u, i, r) || 0), 0 !== a
  }

  function Nr(t, e, n) {
    return zr(t, 0, !1, e, n)
  }

  function Fr(t, e, n, i) {
    return zr(t, e, !0, n, i)
  }

  function Vr(t) {
    wi.call(this, t), this.path = null
  }

  function Hr(t, e, n, i, r, a, o, s, l, u, h) {
    var c = l * (Ig / 180),
      f = Cg(c) * (t - n) / 2 + Tg(c) * (e - i) / 2,
      d = -1 * Tg(c) * (t - n) / 2 + Cg(c) * (e - i) / 2,
      p = f * f / (o * o) + d * d / (s * s);
    p > 1 && (o *= Mg(p), s *= Mg(p));
    var g = (r === a ? -1 : 1) * Mg((o * o * s * s - o * o * d * d - s * s * f * f) / (o * o * d * d + s * s * f * f)) || 0,
      v = g * o * d / s,
      m = g * -s * f / o,
      y = (t + n) / 2 + Cg(c) * v - Tg(c) * m,
      _ = (e + i) / 2 + Tg(c) * v + Cg(c) * m,
      x = Dg([1, 0], [(f - v) / o, (d - m) / s]),
      w = [(f - v) / o, (d - m) / s],
      b = [(-1 * f - v) / o, (-1 * d - m) / s],
      S = Dg(w, b);
    Ag(w, b) <= -1 && (S = Ig), Ag(w, b) >= 1 && (S = 0), 0 === a && S > 0 && (S -= 2 * Ig), 1 === a && 0 > S && (S += 2 * Ig), h.addData(u, y, _, o, s, x, S, c, a)
  }

  function Wr(t) {
    if (!t) return new lg;
    for (var e, n = 0, i = 0, r = n, a = i, o = new lg, s = lg.CMD, l = t.match(Pg), u = 0; u < l.length; u++) {
      for (var h, c = l[u], f = c.charAt(0), d = c.match(Lg) || [], p = d.length, g = 0; p > g; g++) d[g] = parseFloat(d[g]);
      for (var v = 0; p > v;) {
        var m, y, _, x, w, b, S, M = n,
          T = i;
        switch (f) {
          case "l":
            n += d[v++], i += d[v++], h = s.L, o.addData(h, n, i);
            break;
          case "L":
            n = d[v++], i = d[v++], h = s.L, o.addData(h, n, i);
            break;
          case "m":
            n += d[v++], i += d[v++], h = s.M, o.addData(h, n, i), r = n, a = i, f = "l";
            break;
          case "M":
            n = d[v++], i = d[v++], h = s.M, o.addData(h, n, i), r = n, a = i, f = "L";
            break;
          case "h":
            n += d[v++], h = s.L, o.addData(h, n, i);
            break;
          case "H":
            n = d[v++], h = s.L, o.addData(h, n, i);
            break;
          case "v":
            i += d[v++], h = s.L, o.addData(h, n, i);
            break;
          case "V":
            i = d[v++], h = s.L, o.addData(h, n, i);
            break;
          case "C":
            h = s.C, o.addData(h, d[v++], d[v++], d[v++], d[v++], d[v++], d[v++]), n = d[v - 2], i = d[v - 1];
            break;
          case "c":
            h = s.C, o.addData(h, d[v++] + n, d[v++] + i, d[v++] + n, d[v++] + i, d[v++] + n, d[v++] + i), n += d[v - 2], i += d[v - 1];
            break;
          case "S":
            m = n, y = i;
            var C = o.len(),
              I = o.data;
            e === s.C && (m += n - I[C - 4], y += i - I[C - 3]), h = s.C, M = d[v++], T = d[v++], n = d[v++], i = d[v++], o.addData(h, m, y, M, T, n, i);
            break;
          case "s":
            m = n, y = i;
            var C = o.len(),
              I = o.data;
            e === s.C && (m += n - I[C - 4], y += i - I[C - 3]), h = s.C, M = n + d[v++], T = i + d[v++], n += d[v++], i += d[v++], o.addData(h, m, y, M, T, n, i);
            break;
          case "Q":
            M = d[v++], T = d[v++], n = d[v++], i = d[v++], h = s.Q, o.addData(h, M, T, n, i);
            break;
          case "q":
            M = d[v++] + n, T = d[v++] + i, n += d[v++], i += d[v++], h = s.Q, o.addData(h, M, T, n, i);
            break;
          case "T":
            m = n, y = i;
            var C = o.len(),
              I = o.data;
            e === s.Q && (m += n - I[C - 4], y += i - I[C - 3]), n = d[v++], i = d[v++], h = s.Q, o.addData(h, m, y, n, i);
            break;
          case "t":
            m = n, y = i;
            var C = o.len(),
              I = o.data;
            e === s.Q && (m += n - I[C - 4], y += i - I[C - 3]), n += d[v++], i += d[v++], h = s.Q, o.addData(h, m, y, n, i);
            break;
          case "A":
            _ = d[v++], x = d[v++], w = d[v++], b = d[v++], S = d[v++], M = n, T = i, n = d[v++], i = d[v++], h = s.A, Hr(M, T, n, i, b, S, _, x, w, h, o);
            break;
          case "a":
            _ = d[v++], x = d[v++], w = d[v++], b = d[v++], S = d[v++], M = n, T = i, n += d[v++], i += d[v++], h = s.A, Hr(M, T, n, i, b, S, _, x, w, h, o)
        }
      }("z" === f || "Z" === f) && (h = s.Z, o.addData(h), n = r, i = a), e = h
    }
    return o.toStatic(), o
  }

  function Gr(t, e) {
    var n = Wr(t);
    return e = e || {}, e.buildPath = function(t) {
      if (t.setData) {
        t.setData(n.data);
        var e = t.getContext();
        e && t.rebuildPath(e)
      } else {
        var e = t;
        n.rebuildPath(e)
      }
    }, e.applyTransform = function(t) {
      Sg(n, t), this.dirty(!0)
    }, e
  }

  function Xr(t, e) {
    return new Vr(Gr(t, e))
  }

  function qr(t, e) {
    return Vr.extend(Gr(t, e))
  }

  function Ur(t, e) {
    for (var n = [], i = t.length, r = 0; i > r; r++) {
      var a = t[r];
      a.path || a.createPathProxy(), a.__dirtyPath && a.buildPath(a.path, a.shape, !0), n.push(a.path)
    }
    var o = new Vr(e);
    return o.createPathProxy(), o.buildPath = function(t) {
      t.appendPath(n);
      var e = t.getContext();
      e && t.rebuildPath(e)
    }, o
  }

  function jr(t, e, n, i, r, a, o) {
    var s = .5 * (n - t),
      l = .5 * (i - e);
    return (2 * (e - n) + s + l) * o + (-3 * (e - n) - 2 * s - l) * a + s * r + e
  }

  function Yr(t, e, n) {
    var i = e.points,
      r = e.smooth;
    if (i && i.length >= 2) {
      if (r && "spline" !== r) {
        var a = Vg(i, r, n, e.smoothConstraint);
        t.moveTo(i[0][0], i[0][1]);
        for (var o = i.length, s = 0;
          (n ? o : o - 1) > s; s++) {
          var l = a[2 * s],
            u = a[2 * s + 1],
            h = i[(s + 1) % o];
          t.bezierCurveTo(l[0], l[1], u[0], u[1], h[0], h[1])
        }
      } else {
        "spline" === r && (i = Fg(i, n)), t.moveTo(i[0][0], i[0][1]);
        for (var s = 1, c = i.length; c > s; s++) t.lineTo(i[s][0], i[s][1])
      }
      n && t.closePath()
    }
  }

  function Zr(t, e, n) {
    var i = n && n.lineWidth;
    if (e && i) {
      var r = e.x1,
        a = e.x2,
        o = e.y1,
        s = e.y2;
      Gg(2 * r) === Gg(2 * a) ? t.x1 = t.x2 = Kr(r, i, !0) : (t.x1 = r, t.x2 = a), Gg(2 * o) === Gg(2 * s) ? t.y1 = t.y2 = Kr(o, i, !0) : (t.y1 = o, t.y2 = s)
    }
  }

  function $r(t, e, n) {
    var i = n && n.lineWidth;
    if (e && i) {
      var r = e.x,
        a = e.y,
        o = e.width,
        s = e.height;
      t.x = Kr(r, i, !0), t.y = Kr(a, i, !0), t.width = Math.max(Kr(r + o, i, !1) - t.x, 0 === o ? 0 : 1), t.height = Math.max(Kr(a + s, i, !1) - t.y, 0 === s ? 0 : 1)
    }
  }

  function Kr(t, e, n) {
    var i = Gg(2 * t);
    return (i + Gg(e)) % 2 === 0 ? i / 2 : (i + (n ? 1 : -1)) / 2
  }

  function Qr(t, e, n) {
    var i = t.cpx2,
      r = t.cpy2;
    return null === i || null === r ? [(n ? hr : ur)(t.x1, t.cpx1, t.cpx2, t.x2, e), (n ? hr : ur)(t.y1, t.cpy1, t.cpy2, t.y2, e)] : [(n ? vr : gr)(t.x1, t.cpx1, t.x2, e), (n ? vr : gr)(t.y1, t.cpy1, t.y2, e)]
  }

  function Jr(t) {
    wi.call(this, t), this._displayables = [], this._temporaryDisplayables = [], this._cursor = 0, this.notClear = !0
  }

  function ta(t) {
    return Vr.extend(t)
  }

  function ea(t, e) {
    return qr(t, e)
  }

  function na(t, e) {
    cv[t] = e
  }

  function ia(t) {
    return cv.hasOwnProperty(t) ? cv[t] : void 0
  }

  function ra(t, e, n, i) {
    var r = Xr(t, e);
    return n && ("center" === i && (n = oa(n, r.getBoundingRect())), sa(r, n)), r
  }

  function aa(t, e, n) {
    var i = new bi({
      style: {
        image: t,
        x: e.x,
        y: e.y,
        width: e.width,
        height: e.height
      },
      onload: function(t) {
        if ("center" === n) {
          var r = {
            width: t.width,
            height: t.height
          };
          i.setStyle(oa(e, r))
        }
      }
    });
    return i
  }

  function oa(t, e) {
    var n, i = e.width / e.height,
      r = t.height * i;
    r <= t.width ? n = t.height : (r = t.width, n = r / i);
    var a = t.x + t.width / 2,
      o = t.y + t.height / 2;
    return {
      x: a - r / 2,
      y: o - n / 2,
      width: r,
      height: n
    }
  }

  function sa(t, e) {
    if (t.applyTransform) {
      var n = t.getBoundingRect(),
        i = n.calculateTransform(e);
      t.applyTransform(i)
    }
  }

  function la(t) {
    return Zr(t.shape, t.shape, t.style), t
  }

  function ua(t) {
    return $r(t.shape, t.shape, t.style), t
  }

  function ha(t) {
    return null != t && "none" !== t
  }

  function ca(t) {
    if ("string" != typeof t) return t;
    var e = pv.get(t);
    return e || (e = Ke(t, -.1), 1e4 > gv && (pv.set(t, e), gv++)), e
  }

  function fa(t) {
    if (t.__hoverStlDirty) {
      t.__hoverStlDirty = !1;
      var e = t.__hoverStl;
      if (!e) return void(t.__cachedNormalStl = t.__cachedNormalZ2 = null);
      var n = t.__cachedNormalStl = {};
      t.__cachedNormalZ2 = t.z2;
      var i = t.style;
      for (var r in e) null != e[r] && (n[r] = i[r]);
      n.fill = i.fill, n.stroke = i.stroke
    }
  }

  function da(t) {
    var e = t.__hoverStl;
    if (e && !t.__highlighted) {
      var n = t.__zr,
        i = t.useHoverLayer && n && "canvas" === n.painter.type;
      if (t.__highlighted = i ? "layer" : "plain", !(t.isGroup || !n && t.useHoverLayer)) {
        var r = t,
          a = t.style;
        i && (r = n.addHover(t), a = r.style), Ra(a), i || fa(r), a.extendFrom(e), pa(a, e, "fill"), pa(a, e, "stroke"), Ba(a), i || (t.dirty(!1), t.z2 += av)
      }
    }
  }

  function pa(t, e, n) {
    !ha(e[n]) && ha(t[n]) && (t[n] = ca(t[n]))
  }

  function ga(t) {
    var e = t.__highlighted;
    if (e && (t.__highlighted = !1, !t.isGroup))
      if ("layer" === e) t.__zr && t.__zr.removeHover(t);
      else {
        var n = t.style,
          i = t.__cachedNormalStl;
        i && (Ra(n), t.setStyle(i), Ba(n));
        var r = t.__cachedNormalZ2;
        null != r && t.z2 - r === av && (t.z2 = r)
      }
  }

  function va(t, e, n) {
    var i, r = lv,
      a = lv;
    t.__highlighted && (r = sv, i = !0), e(t, n), t.__highlighted && (a = sv, i = !0), t.isGroup && t.traverse(function(t) {
      !t.isGroup && e(t, n)
    }), i && t.__highDownOnUpdate && t.__highDownOnUpdate(r, a)
  }

  function ma(t, e) {
    e = t.__hoverStl = e !== !1 && (t.hoverStyle || e || {}), t.__hoverStlDirty = !0, t.__highlighted && (t.__cachedNormalStl = null, ga(t), da(t))
  }

  function ya(t) {
    !ba(this, t) && !this.__highByOuter && va(this, da)
  }

  function _a(t) {
    !ba(this, t) && !this.__highByOuter && va(this, ga)
  }

  function xa(t) {
    this.__highByOuter |= 1 << (t || 0), va(this, da)
  }

  function wa(t) {
    !(this.__highByOuter &= ~(1 << (t || 0))) && va(this, ga)
  }

  function ba(t, e) {
    return t.__highDownSilentOnTouch && e.zrByTouch
  }

  function Sa(t, e) {
    Ma(t, !0), va(t, ma, e)
  }

  function Ma(t, e) {
    var n = e === !1;
    if (t.__highDownSilentOnTouch = t.highDownSilentOnTouch, t.__highDownOnUpdate = t.highDownOnUpdate, !n || t.__highDownDispatcher) {
      var i = n ? "off" : "on";
      t[i]("mouseover", ya)[i]("mouseout", _a), t[i]("emphasis", xa)[i]("normal", wa), t.__highByOuter = t.__highByOuter || 0, t.__highDownDispatcher = !n
    }
  }

  function Ta(t) {
    return !(!t || !t.__highDownDispatcher)
  }

  function Ca(t) {
    var e = hv[t];
    return null == e && 32 >= uv && (e = hv[t] = uv++), e
  }

  function Ia(t, e, n, i, r, a, o) {
    r = r || rv;
    var s, l = r.labelFetcher,
      u = r.labelDataIndex,
      h = r.labelDimIndex,
      c = n.getShallow("show"),
      f = i.getShallow("show");
    (c || f) && (l && (s = l.getFormattedLabel(u, "normal", null, h)), null == s && (s = w(r.defaultText) ? r.defaultText(u, r) : r.defaultText));
    var d = c ? s : null,
      p = f ? A(l ? l.getFormattedLabel(u, "emphasis", null, h) : null, s) : null;
    (null != d || null != p) && (Aa(t, n, a, r), Aa(e, i, o, r, !0)), t.text = d, e.text = p
  }

  function ka(t, e, n) {
    var i = t.style;
    e && (Ra(i), t.setStyle(e), Ba(i)), i = t.__hoverStl, n && i && (Ra(i), o(i, n), Ba(i))
  }

  function Aa(t, e, n, i, r) {
    return Pa(t, e, i, r), n && o(t, n), t
  }

  function Da(t, e, n) {
    var i, r = {
      isRectText: !0
    };
    n === !1 ? i = !0 : r.autoColor = n, Pa(t, e, r, i)
  }

  function Pa(t, e, n, i) {
    if (n = n || rv, n.isRectText) {
      var r;
      n.getTextPosition ? r = n.getTextPosition(e, i) : (r = e.getShallow("position") || (i ? null : "inside"), "outside" === r && (r = "top")), t.textPosition = r, t.textOffset = e.getShallow("offset");
      var a = e.getShallow("rotate");
      null != a && (a *= Math.PI / 180), t.textRotation = a, t.textDistance = A(e.getShallow("distance"), i ? null : 5)
    }
    var o, s = e.ecModel,
      l = s && s.option.textStyle,
      u = La(e);
    if (u) {
      o = {};
      for (var h in u)
        if (u.hasOwnProperty(h)) {
          var c = e.getModel(["rich", h]);
          Oa(o[h] = {}, c, l, n, i)
        }
    }
    return t.rich = o, Oa(t, e, l, n, i, !0), n.forceRich && !n.textStyle && (n.textStyle = {}), t
  }

  function La(t) {
    for (var e; t && t !== t.ecModel;) {
      var n = (t.option || rv).rich;
      if (n) {
        e = e || {};
        for (var i in n) n.hasOwnProperty(i) && (e[i] = 1)
      }
      t = t.parentModel
    }
    return e
  }

  function Oa(t, e, n, i, r, a) {
    n = !r && n || rv, t.textFill = Ea(e.getShallow("color"), i) || n.color, t.textStroke = Ea(e.getShallow("textBorderColor"), i) || n.textBorderColor, t.textStrokeWidth = A(e.getShallow("textBorderWidth"), n.textBorderWidth), r || (a && (t.insideRollbackOpt = i, Ba(t)), null == t.textFill && (t.textFill = i.autoColor)), t.fontStyle = e.getShallow("fontStyle") || n.fontStyle, t.fontWeight = e.getShallow("fontWeight") || n.fontWeight, t.fontSize = e.getShallow("fontSize") || n.fontSize, t.fontFamily = e.getShallow("fontFamily") || n.fontFamily, t.textAlign = e.getShallow("align"), t.textVerticalAlign = e.getShallow("verticalAlign") || e.getShallow("baseline"), t.textLineHeight = e.getShallow("lineHeight"), t.textWidth = e.getShallow("width"), t.textHeight = e.getShallow("height"), t.textTag = e.getShallow("tag"), a && i.disableBox || (t.textBackgroundColor = Ea(e.getShallow("backgroundColor"), i), t.textPadding = e.getShallow("padding"), t.textBorderColor = Ea(e.getShallow("borderColor"), i), t.textBorderWidth = e.getShallow("borderWidth"), t.textBorderRadius = e.getShallow("borderRadius"), t.textBoxShadowColor = e.getShallow("shadowColor"), t.textBoxShadowBlur = e.getShallow("shadowBlur"), t.textBoxShadowOffsetX = e.getShallow("shadowOffsetX"), t.textBoxShadowOffsetY = e.getShallow("shadowOffsetY")), t.textShadowColor = e.getShallow("textShadowColor") || n.textShadowColor, t.textShadowBlur = e.getShallow("textShadowBlur") || n.textShadowBlur, t.textShadowOffsetX = e.getShallow("textShadowOffsetX") || n.textShadowOffsetX, t.textShadowOffsetY = e.getShallow("textShadowOffsetY") || n.textShadowOffsetY
  }

  function Ea(t, e) {
    return "auto" !== t ? t : e && e.autoColor ? e.autoColor : null
  }

  function Ba(t) {
    var e, n = t.textPosition,
      i = t.insideRollbackOpt;
    if (i && null == t.textFill) {
      var r = i.autoColor,
        a = i.isRectText,
        o = i.useInsideStyle,
        s = o !== !1 && (o === !0 || a && n && "string" == typeof n && n.indexOf("inside") >= 0),
        l = !s && null != r;
      (s || l) && (e = {
        textFill: t.textFill,
        textStroke: t.textStroke,
        textStrokeWidth: t.textStrokeWidth
      }), s && (t.textFill = "#fff", null == t.textStroke && (t.textStroke = r, null == t.textStrokeWidth && (t.textStrokeWidth = 2))), l && (t.textFill = r)
    }
    t.insideRollback = e
  }

  function Ra(t) {
    var e = t.insideRollback;
    e && (t.textFill = e.textFill, t.textStroke = e.textStroke, t.textStrokeWidth = e.textStrokeWidth, t.insideRollback = null)
  }

  function za(t, e) {
    var n = e || e.getModel("textStyle");
    return E([t.fontStyle || n && n.getShallow("fontStyle") || "", t.fontWeight || n && n.getShallow("fontWeight") || "", (t.fontSize || n && n.getShallow("fontSize") || 12) + "px", t.fontFamily || n && n.getShallow("fontFamily") || "sans-serif"].join(" "))
  }

  function Na(t, e, n, i, r, a) {
    "function" == typeof r && (a = r, r = null);
    var o = i && i.isAnimationEnabled();
    if (o) {
      var s = t ? "Update" : "",
        l = i.getShallow("animationDuration" + s),
        u = i.getShallow("animationEasing" + s),
        h = i.getShallow("animationDelay" + s);
      "function" == typeof h && (h = h(r, i.getAnimationDelayParams ? i.getAnimationDelayParams(e, r) : null)), "function" == typeof l && (l = l(r)), l > 0 ? e.animateTo(n, l, h || 0, u, a, !!a) : (e.stopAnimation(), e.attr(n), a && a())
    } else e.stopAnimation(), e.attr(n), a && a()
  }

  function Fa(t, e, n, i, r) {
    Na(!0, t, e, n, i, r)
  }

  function Va(t, e, n, i, r) {
    Na(!1, t, e, n, i, r)
  }

  function Ha(t, e) {
    for (var n = ke([]); t && t !== e;) De(n, t.getLocalTransform(), n), t = t.parent;
    return n
  }

  function Wa(t, e, n) {
    return e && !f(e) && (e = Xf.getLocalTransform(e)), n && (e = Ee([], e)), ae([], t, e)
  }

  function Ga(t, e, n) {
    var i = 0 === e[4] || 0 === e[5] || 0 === e[0] ? 1 : Math.abs(2 * e[4] / e[0]),
      r = 0 === e[4] || 0 === e[5] || 0 === e[2] ? 1 : Math.abs(2 * e[4] / e[2]),
      a = ["left" === t ? -i : "right" === t ? i : 0, "top" === t ? -r : "bottom" === t ? r : 0];
    return a = Wa(a, e, n), Math.abs(a[0]) > Math.abs(a[1]) ? a[0] > 0 ? "right" : "left" : a[1] > 0 ? "bottom" : "top"
  }

  function Xa(t, e, n) {
    function i(t) {
      var e = {};
      return t.traverse(function(t) {
        !t.isGroup && t.anid && (e[t.anid] = t)
      }), e
    }

    function r(t) {
      var e = {
        position: G(t.position),
        rotation: t.rotation
      };
      return t.shape && (e.shape = o({}, t.shape)), e
    }
    if (t && e) {
      var a = i(t);
      e.traverse(function(t) {
        if (!t.isGroup && t.anid) {
          var e = a[t.anid];
          if (e) {
            var i = r(t);
            t.attr(r(e)), Fa(t, i, n, t.dataIndex)
          }
        }
      })
    }
  }

  function qa(t, e) {
    return p(t, function(t) {
      var n = t[0];
      n = nv(n, e.x), n = iv(n, e.x + e.width);
      var i = t[1];
      return i = nv(i, e.y), i = iv(i, e.y + e.height), [n, i]
    })
  }

  function Ua(t, e) {
    var n = nv(t.x, e.x),
      i = iv(t.x + t.width, e.x + e.width),
      r = nv(t.y, e.y),
      a = iv(t.y + t.height, e.y + e.height);
    return i >= n && a >= r ? {
      x: n,
      y: r,
      width: i - n,
      height: a - r
    } : void 0
  }

  function ja(t, e, n) {
    e = o({
      rectHover: !0
    }, e);
    var i = e.style = {
      strokeNoScale: !0
    };
    return n = n || {
      x: -1,
      y: -1,
      width: 2,
      height: 2
    }, t ? 0 === t.indexOf("image://") ? (i.image = t.slice(8), s(i, n), new bi(e)) : ra(t.replace("path://", ""), e, n, "center") : void 0
  }

  function Ya(t, e, n, i, r) {
    for (var a = 0, o = r[r.length - 1]; a < r.length; a++) {
      var s = r[a];
      if (Za(t, e, n, i, s[0], s[1], o[0], o[1])) return !0;
      o = s
    }
  }

  function Za(t, e, n, i, r, a, o, s) {
    var l = n - t,
      u = i - e,
      h = o - r,
      c = s - a,
      f = $a(h, c, l, u);
    if (Ka(f)) return !1;
    var d = t - r,
      p = e - a,
      g = $a(d, p, l, u) / f;
    if (0 > g || g > 1) return !1;
    var v = $a(d, p, h, c) / f;
    return 0 > v || v > 1 ? !1 : !0
  }

  function $a(t, e, n, i) {
    return t * i - n * e
  }

  function Ka(t) {
    return 1e-6 >= t && t >= -1e-6
  }

  function Qa(t, e, n) {
    this.parentModel = e, this.ecModel = n, this.option = t
  }

  function Ja(t, e, n) {
    for (var i = 0; i < e.length && (!e[i] || (t = t && "object" == typeof t ? t[e[i]] : null, null != t)); i++);
    return null == t && n && (t = n.get(e)), t
  }

  function to(t, e) {
    var n = bv(t).getParent;
    return n ? n.call(t, e) : t.parentModel
  }

  function eo(t) {
    return [t || "", Sv++, Math.random().toFixed(5)].join("_")
  }

  function no(t) {
    var e = {};
    return t.registerSubTypeDefaulter = function(t, n) {
      t = tr(t), e[t.main] = n
    }, t.determineSubType = function(n, i) {
      var r = i.type;
      if (!r) {
        var a = tr(n).main;
        t.hasSubTypes(n) && e[a] && (r = e[a](i))
      }
      return r
    }, t
  }

  function io(t, e) {
    function n(t) {
      var n = {},
        a = [];
      return d(t, function(o) {
        var s = i(n, o),
          l = s.originalDeps = e(o),
          h = r(l, t);
        s.entryCount = h.length, 0 === s.entryCount && a.push(o), d(h, function(t) {
          u(s.predecessor, t) < 0 && s.predecessor.push(t);
          var e = i(n, t);
          u(e.successor, t) < 0 && e.successor.push(o)
        })
      }), {
        graph: n,
        noEntryList: a
      }
    }

    function i(t, e) {
      return t[e] || (t[e] = {
        predecessor: [],
        successor: []
      }), t[e]
    }

    function r(t, e) {
      var n = [];
      return d(t, function(t) {
        u(e, t) >= 0 && n.push(t)
      }), n
    }
    t.topologicalTravel = function(t, e, i, r) {
      function a(t) {
        l[t].entryCount--, 0 === l[t].entryCount && u.push(t)
      }

      function o(t) {
        h[t] = !0, a(t)
      }
      if (t.length) {
        var s = n(e),
          l = s.graph,
          u = s.noEntryList,
          h = {};
        for (d(t, function(t) {
            h[t] = !0
          }); u.length;) {
          var c = u.pop(),
            f = l[c],
            p = !!h[c];
          p && (i.call(r, c, f.originalDeps.slice()), delete h[c]), d(f.successor, p ? o : a)
        }
        d(h, function() {
          throw new Error("Circle dependency may exists")
        })
      }
    }
  }

  function ro(t) {
    return t.replace(/^\s+|\s+$/g, "")
  }

  function ao(t, e, n, i) {
    var r = e[1] - e[0],
      a = n[1] - n[0];
    if (0 === r) return 0 === a ? n[0] : (n[0] + n[1]) / 2;
    if (i)
      if (r > 0) {
        if (t <= e[0]) return n[0];
        if (t >= e[1]) return n[1]
      } else {
        if (t >= e[0]) return n[0];
        if (t <= e[1]) return n[1]
      }
    else {
      if (t === e[0]) return n[0];
      if (t === e[1]) return n[1]
    }
    return (t - e[0]) / r * a + n[0]
  }

  function oo(t, e) {
    switch (t) {
      case "center":
      case "middle":
        t = "50%";
        break;
      case "left":
      case "top":
        t = "0%";
        break;
      case "right":
      case "bottom":
        t = "100%"
    }
    return "string" == typeof t ? ro(t).match(/%$/) ? parseFloat(t) / 100 * e : parseFloat(t) : null == t ? 0 / 0 : +t
  }

  function so(t, e, n) {
    return null == e && (e = 10), e = Math.min(Math.max(0, e), 20), t = (+t).toFixed(e), n ? t : +t
  }

  function lo(t) {
    return t.sort(function(t, e) {
      return t - e
    }), t
  }

  function uo(t) {
    if (t = +t, isNaN(t)) return 0;
    for (var e = 1, n = 0; Math.round(t * e) / e !== t;) e *= 10, n++;
    return n
  }

  function ho(t) {
    var e = t.toString(),
      n = e.indexOf("e");
    if (n > 0) {
      var i = +e.slice(n + 1);
      return 0 > i ? -i : 0
    }
    var r = e.indexOf(".");
    return 0 > r ? 0 : e.length - 1 - r
  }

  function co(t, e) {
    var n = Math.log,
      i = Math.LN10,
      r = Math.floor(n(t[1] - t[0]) / i),
      a = Math.round(n(Math.abs(e[1] - e[0])) / i),
      o = Math.min(Math.max(-r + a, 0), 20);
    return isFinite(o) ? o : 20
  }

  function fo(t, e, n) {
    if (!t[e]) return 0;
    var i = g(t, function(t, e) {
      return t + (isNaN(e) ? 0 : e)
    }, 0);
    if (0 === i) return 0;
    for (var r = Math.pow(10, n), a = p(t, function(t) {
        return (isNaN(t) ? 0 : t) / i * r * 100
      }), o = 100 * r, s = p(a, function(t) {
        return Math.floor(t)
      }), l = g(s, function(t, e) {
        return t + e
      }, 0), u = p(a, function(t, e) {
        return t - s[e]
      }); o > l;) {
      for (var h = Number.NEGATIVE_INFINITY, c = null, f = 0, d = u.length; d > f; ++f) u[f] > h && (h = u[f], c = f);
      ++s[c], u[c] = 0, ++l
    }
    return s[e] / r
  }

  function po(t) {
    var e = 2 * Math.PI;
    return (t % e + e) % e
  }

  function go(t) {
    return t > -Mv && Mv > t
  }

  function vo(t) {
    if (t instanceof Date) return t;
    if ("string" == typeof t) {
      var e = Cv.exec(t);
      if (!e) return new Date(0 / 0);
      if (e[8]) {
        var n = +e[4] || 0;
        return "Z" !== e[8].toUpperCase() && (n -= e[8].slice(0, 3)), new Date(Date.UTC(+e[1], +(e[2] || 1) - 1, +e[3] || 1, n, +(e[5] || 0), +e[6] || 0, +e[7] || 0))
      }
      return new Date(+e[1], +(e[2] || 1) - 1, +e[3] || 1, +e[4] || 0, +(e[5] || 0), +e[6] || 0, +e[7] || 0)
    }
    return new Date(null == t ? 0 / 0 : Math.round(t))
  }

  function mo(t) {
    return Math.pow(10, yo(t))
  }

  function yo(t) {
    return Math.floor(Math.log(t) / Math.LN10)
  }

  function _o(t, e) {
    var n, i = yo(t),
      r = Math.pow(10, i),
      a = t / r;
    return n = e ? 1.5 > a ? 1 : 2.5 > a ? 2 : 4 > a ? 3 : 7 > a ? 5 : 10 : 1 > a ? 1 : 2 > a ? 2 : 3 > a ? 3 : 5 > a ? 5 : 10, t = n * r, i >= -20 ? +t.toFixed(0 > i ? -i : 0) : t
  }

  function xo(t, e) {
    var n = (t.length - 1) * e + 1,
      i = Math.floor(n),
      r = +t[i - 1],
      a = n - i;
    return a ? r + a * (t[i] - r) : r
  }

  function wo(t) {
    function e(t, n, i) {
      return t.interval[i] < n.interval[i] || t.interval[i] === n.interval[i] && (t.close[i] - n.close[i] === (i ? -1 : 1) || !i && e(t, n, 1))
    }
    t.sort(function(t, n) {
      return e(t, n, 0) ? -1 : 1
    });
    for (var n = -1 / 0, i = 1, r = 0; r < t.length;) {
      for (var a = t[r].interval, o = t[r].close, s = 0; 2 > s; s++) a[s] <= n && (a[s] = n, o[s] = s ? 1 : 1 - i), n = a[s], i = o[s];
      a[0] === a[1] && o[0] * o[1] !== 1 ? t.splice(r, 1) : r++
    }
    return t
  }

  function bo(t) {
    return t - parseFloat(t) >= 0
  }

  function So(t) {
    return isNaN(t) ? "-" : (t = (t + "").split("."), t[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, "$1,") + (t.length > 1 ? "." + t[1] : ""))
  }

  function Mo(t, e) {
    return t = (t || "").toLowerCase().replace(/-(.)/g, function(t, e) {
      return e.toUpperCase()
    }), e && t && (t = t.charAt(0).toUpperCase() + t.slice(1)), t
  }

  function To(t) {
    return null == t ? "" : (t + "").replace(Av, function(t, e) {
      return Dv[e]
    })
  }

  function Co(t, e, n) {
    x(e) || (e = [e]);
    var i = e.length;
    if (!i) return "";
    for (var r = e[0].$vars || [], a = 0; a < r.length; a++) {
      var o = Pv[a];
      t = t.replace(Lv(o), Lv(o, 0))
    }
    for (var s = 0; i > s; s++)
      for (var l = 0; l < r.length; l++) {
        var u = e[s][r[l]];
        t = t.replace(Lv(Pv[l], s), n ? To(u) : u)
      }
    return t
  }

  function Io(t, e, n) {
    return d(e, function(e, i) {
      t = t.replace("{" + i + "}", n ? To(e) : e)
    }), t
  }

  function ko(t, e) {
    t = b(t) ? {
      color: t,
      extraCssText: e
    } : t || {};
    var n = t.color,
      i = t.type,
      e = t.extraCssText,
      r = t.renderMode || "html",
      a = t.markerId || "X";
    return n ? "html" === r ? "subItem" === i ? '<span style="display:inline-block;vertical-align:middle;margin-right:8px;margin-left:3px;border-radius:4px;width:4px;height:4px;background-color:' + To(n) + ";" + (e || "") + '"></span>' : '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:' + To(n) + ";" + (e || "") + '"></span>' : {
      renderMode: r,
      content: "{marker" + a + "|}  ",
      style: {
        color: n
      }
    } : ""
  }

  function Ao(t, e) {
    return t += "", "0000".substr(0, e - t.length) + t
  }

  function Do(t, e, n) {
    ("week" === t || "month" === t || "quarter" === t || "half-year" === t || "year" === t) && (t = "MM-dd\nyyyy");
    var i = vo(e),
      r = n ? "UTC" : "",
      a = i["get" + r + "FullYear"](),
      o = i["get" + r + "Month"]() + 1,
      s = i["get" + r + "Date"](),
      l = i["get" + r + "Hours"](),
      u = i["get" + r + "Minutes"](),
      h = i["get" + r + "Seconds"](),
      c = i["get" + r + "Milliseconds"]();
    return t = t.replace("MM", Ao(o, 2)).replace("M", o).replace("yyyy", a).replace("yy", a % 100).replace("dd", Ao(s, 2)).replace("d", s).replace("hh", Ao(l, 2)).replace("h", l).replace("mm", Ao(u, 2)).replace("m", u).replace("ss", Ao(h, 2)).replace("s", h).replace("SSS", Ao(c, 3))
  }

  function Po(t) {
    return t ? t.charAt(0).toUpperCase() + t.substr(1) : t
  }

  function Lo(t) {
    return Vn(t.text, t.font, t.textAlign, t.textVerticalAlign, t.textPadding, t.textLineHeight, t.rich, t.truncate)
  }

  function Oo(t, e, n, i, r, a, o, s) {
    return Vn(t, e, n, i, r, s, a, o)
  }

  function Eo(t, e, n, i, r) {
    var a = 0,
      o = 0;
    null == i && (i = 1 / 0), null == r && (r = 1 / 0);
    var s = 0;
    e.eachChild(function(l, u) {
      var h, c, f = l.position,
        d = l.getBoundingRect(),
        p = e.childAt(u + 1),
        g = p && p.getBoundingRect();
      if ("horizontal" === t) {
        var v = d.width + (g ? -g.x + d.x : 0);
        h = a + v, h > i || l.newline ? (a = 0, h = v, o += s + n, s = d.height) : s = Math.max(s, d.height)
      } else {
        var m = d.height + (g ? -g.y + d.y : 0);
        c = o + m, c > r || l.newline ? (a += s + n, o = 0, c = m, s = d.width) : s = Math.max(s, d.width)
      }
      l.newline || (f[0] = a, f[1] = o, "horizontal" === t ? a = h + n : o = c + n)
    })
  }

  function Bo(t, e, n) {
    n = kv(n || 0);
    var i = e.width,
      r = e.height,
      a = oo(t.left, i),
      o = oo(t.top, r),
      s = oo(t.right, i),
      l = oo(t.bottom, r),
      u = oo(t.width, i),
      h = oo(t.height, r),
      c = n[2] + n[0],
      f = n[1] + n[3],
      d = t.aspect;
    switch (isNaN(u) && (u = i - s - f - a), isNaN(h) && (h = r - l - c - o), null != d && (isNaN(u) && isNaN(h) && (d > i / r ? u = .8 * i : h = .8 * r), isNaN(u) && (u = d * h), isNaN(h) && (h = u / d)), isNaN(a) && (a = i - s - u - f), isNaN(o) && (o = r - l - h - c), t.left || t.right) {
      case "center":
        a = i / 2 - u / 2 - n[3];
        break;
      case "right":
        a = i - u - f
    }
    switch (t.top || t.bottom) {
      case "middle":
      case "center":
        o = r / 2 - h / 2 - n[0];
        break;
      case "bottom":
        o = r - h - c
    }
    a = a || 0, o = o || 0, isNaN(u) && (u = i - f - a - (s || 0)), isNaN(h) && (h = r - c - o - (l || 0));
    var p = new wn(a + n[3], o + n[0], u, h);
    return p.margin = n, p
  }

  function Ro(t, e, n) {
    function i(n, i) {
      var o = {},
        l = 0,
        u = {},
        h = 0,
        c = 2;
      if (Bv(n, function(e) {
          u[e] = t[e]
        }), Bv(n, function(t) {
          r(e, t) && (o[t] = u[t] = e[t]), a(o, t) && l++, a(u, t) && h++
        }), s[i]) return a(e, n[1]) ? u[n[2]] = null : a(e, n[2]) && (u[n[1]] = null), u;
      if (h !== c && l) {
        if (l >= c) return o;
        for (var f = 0; f < n.length; f++) {
          var d = n[f];
          if (!r(o, d) && r(t, d)) {
            o[d] = t[d];
            break
          }
        }
        return o
      }
      return u
    }

    function r(t, e) {
      return t.hasOwnProperty(e)
    }

    function a(t, e) {
      return null != t[e] && "auto" !== t[e]
    }

    function o(t, e, n) {
      Bv(t, function(t) {
        e[t] = n[t]
      })
    }!S(n) && (n = {});
    var s = n.ignoreSize;
    !x(s) && (s = [s, s]);
    var l = i(zv[0], 0),
      u = i(zv[1], 1);
    o(zv[0], t, l), o(zv[1], t, u)
  }

  function zo(t) {
    return No({}, t)
  }

  function No(t, e) {
    return e && t && Bv(Rv, function(n) {
      e.hasOwnProperty(n) && (t[n] = e[n])
    }), t
  }

  function Fo(t) {
    var e = [];
    return d(Vv.getClassesByMainType(t), function(t) {
      e = e.concat(t.prototype.dependencies || [])
    }), e = p(e, function(t) {
      return tr(t).main
    }), "dataset" !== t && u(e, "dataset") <= 0 && e.unshift("dataset"), e
  }

  function Vo(t, e) {
    for (var n = t.length, i = 0; n > i; i++)
      if (t[i].length > e) return t[i];
    return t[n - 1]
  }

  function Ho(t) {
    var e = t.get("coordinateSystem"),
      n = {
        coordSysName: e,
        coordSysDims: [],
        axisMap: N(),
        categoryAxisMap: N()
      },
      i = qv[e];
    return i ? (i(t, n, n.axisMap, n.categoryAxisMap), n) : void 0
  }

  function Wo(t) {
    return "category" === t.get("type")
  }

  function Go(t) {
    this.fromDataset = t.fromDataset, this.data = t.data || (t.sourceFormat === Zv ? {} : []), this.sourceFormat = t.sourceFormat || $v, this.seriesLayoutBy = t.seriesLayoutBy || Qv, this.dimensionsDefine = t.dimensionsDefine, this.encodeDefine = t.encodeDefine && N(t.encodeDefine), this.startIndex = t.startIndex || 0, this.dimensionsDetectCount = t.dimensionsDetectCount
  }

  function Xo(t) {
    var e = t.option.source,
      n = $v;
    if (T(e)) n = Kv;
    else if (x(e)) {
      0 === e.length && (n = jv);
      for (var i = 0, r = e.length; r > i; i++) {
        var a = e[i];
        if (null != a) {
          if (x(a)) {
            n = jv;
            break
          }
          if (S(a)) {
            n = Yv;
            break
          }
        }
      }
    } else if (S(e)) {
      for (var o in e)
        if (e.hasOwnProperty(o) && f(e[o])) {
          n = Zv;
          break
        }
    } else if (null != e) throw new Error("Invalid data");
    tm(t).sourceFormat = n
  }

  function qo(t) {
    return tm(t).source
  }

  function Uo(t) {
    tm(t).datasetMap = N()
  }

  function jo(t) {
    var e = t.option,
      n = e.data,
      i = T(n) ? Kv : Uv,
      r = !1,
      a = e.seriesLayoutBy,
      o = e.sourceHeader,
      s = e.dimensions,
      l = Jo(t);
    if (l) {
      var u = l.option;
      n = u.source, i = tm(l).sourceFormat, r = !0, a = a || u.seriesLayoutBy, null == o && (o = u.sourceHeader), s = s || u.dimensions
    }
    var h = Yo(n, i, a, o, s),
      c = e.encode;
    !c && l && (c = Qo(t, l, n, i, a, h)), tm(t).source = new Go({
      data: n,
      fromDataset: r,
      seriesLayoutBy: a,
      sourceFormat: i,
      dimensionsDefine: h.dimensionsDefine,
      startIndex: h.startIndex,
      dimensionsDetectCount: h.dimensionsDetectCount,
      encodeDefine: c
    })
  }

  function Yo(t, e, n, i, r) {
    if (!t) return {
      dimensionsDefine: Zo(r)
    };
    var a, o, s;
    if (e === jv) "auto" === i || null == i ? $o(function(t) {
      null != t && "-" !== t && (b(t) ? null == o && (o = 1) : o = 0)
    }, n, t, 10) : o = i ? 1 : 0, r || 1 !== o || (r = [], $o(function(t, e) {
      r[e] = null != t ? t : ""
    }, n, t)), a = r ? r.length : n === Jv ? t.length : t[0] ? t[0].length : null;
    else if (e === Yv) r || (r = Ko(t), s = !0);
    else if (e === Zv) r || (r = [], s = !0, d(t, function(t, e) {
      r.push(e)
    }));
    else if (e === Uv) {
      var l = Hi(t[0]);
      a = x(l) && l.length || 1
    }
    var u;
    return s && d(r, function(t, e) {
      "name" === (S(t) ? t.name : t) && (u = e)
    }), {
      startIndex: o,
      dimensionsDefine: Zo(r),
      dimensionsDetectCount: a,
      potentialNameDimIndex: u
    }
  }

  function Zo(t) {
    if (t) {
      var e = N();
      return p(t, function(t) {
        if (t = o({}, S(t) ? t : {
            name: t
          }), null == t.name) return t;
        t.name += "", null == t.displayName && (t.displayName = t.name);
        var n = e.get(t.name);
        return n ? t.name += "-" + n.count++ : e.set(t.name, {
          count: 1
        }), t
      })
    }
  }

  function $o(t, e, n, i) {
    if (null == i && (i = 1 / 0), e === Jv)
      for (var r = 0; r < n.length && i > r; r++) t(n[r] ? n[r][0] : null, r);
    else
      for (var a = n[0] || [], r = 0; r < a.length && i > r; r++) t(a[r], r)
  }

  function Ko(t) {
    for (var e, n = 0; n < t.length && !(e = t[n++]););
    if (e) {
      var i = [];
      return d(e, function(t, e) {
        i.push(e)
      }), i
    }
  }

  function Qo(t, e, n, i, r, a) {
    var o = Ho(t),
      s = {},
      l = [],
      u = [],
      h = t.subType,
      c = N(["pie", "map", "funnel"]),
      f = N(["line", "bar", "pictorialBar", "scatter", "effectScatter", "candlestick", "boxplot"]);
    if (o && null != f.get(h)) {
      var p = t.ecModel,
        g = tm(p).datasetMap,
        v = e.uid + "_" + r,
        m = g.get(v) || g.set(v, {
          categoryWayDim: 1,
          valueWayDim: 0
        });
      d(o.coordSysDims, function(t) {
        if (null == o.firstCategoryDimIndex) {
          var e = m.valueWayDim++;
          s[t] = e, u.push(e)
        } else if (o.categoryAxisMap.get(t)) s[t] = 0, l.push(0);
        else {
          var e = m.categoryWayDim++;
          s[t] = e, u.push(e)
        }
      })
    } else if (null != c.get(h)) {
      for (var y, _ = 0; 5 > _ && null == y; _++) es(n, i, r, a.dimensionsDefine, a.startIndex, _) || (y = _);
      if (null != y) {
        s.value = y;
        var x = a.potentialNameDimIndex || Math.max(y - 1, 0);
        u.push(x), l.push(x)
      }
    }
    return l.length && (s.itemName = l), u.length && (s.seriesName = u), s
  }

  function Jo(t) {
    var e = t.option,
      n = e.data;
    return n ? void 0 : t.ecModel.getComponent("dataset", e.datasetIndex || 0)
  }

  function ts(t, e) {
    return es(t.data, t.sourceFormat, t.seriesLayoutBy, t.dimensionsDefine, t.startIndex, e)
  }

  function es(t, e, n, i, r, a) {
    function o(t) {
      return null != t && isFinite(t) && "" !== t ? !1 : b(t) && "-" !== t ? !0 : void 0
    }
    var s, l = 5;
    if (T(t)) return !1;
    var u;
    if (i && (u = i[a], u = S(u) ? u.name : u), e === jv)
      if (n === Jv) {
        for (var h = t[a], c = 0; c < (h || []).length && l > c; c++)
          if (null != (s = o(h[r + c]))) return s
      } else
        for (var c = 0; c < t.length && l > c; c++) {
          var f = t[r + c];
          if (f && null != (s = o(f[a]))) return s
        } else if (e === Yv) {
          if (!u) return;
          for (var c = 0; c < t.length && l > c; c++) {
            var d = t[c];
            if (d && null != (s = o(d[u]))) return s
          }
        } else if (e === Zv) {
      if (!u) return;
      var h = t[u];
      if (!h || T(h)) return !1;
      for (var c = 0; c < h.length && l > c; c++)
        if (null != (s = o(h[c]))) return s
    } else if (e === Uv)
      for (var c = 0; c < t.length && l > c; c++) {
        var d = t[c],
          p = Hi(d);
        if (!x(p)) return !1;
        if (null != (s = o(p[a]))) return s
      }
    return !1
  }

  function ns(t, e) {
    if (e) {
      var n = e.seiresIndex,
        i = e.seriesId,
        r = e.seriesName;
      return null != n && t.componentIndex !== n || null != i && t.id !== i || null != r && t.name !== r
    }
  }

  function is(t, e) {
    var n = t.color && !t.colorLayer;
    d(e, function(e, a) {
      "colorLayer" === a && n || Vv.hasClass(a) || ("object" == typeof e ? t[a] = t[a] ? r(t[a], e, !1) : i(e) : null == t[a] && (t[a] = e))
    })
  }

  function rs(t) {
    t = t, this.option = {}, this.option[em] = 1, this._componentsMap = N({
      series: []
    }), this._seriesIndices, this._seriesIndicesMap, is(t, this._theme.option), r(t, Wv, !1), this.mergeOption(t)
  }

  function as(t, e) {
    x(e) || (e = e ? [e] : []);
    var n = {};
    return d(e, function(e) {
      n[e] = (t.get(e) || []).slice()
    }), n
  }

  function os(t, e, n) {
    var i = e.type ? e.type : n ? n.subType : Vv.determineSubType(t, e);
    return i
  }

  function ss(t, e) {
    t._seriesIndicesMap = N(t._seriesIndices = p(e, function(t) {
      return t.componentIndex
    }) || [])
  }

  function ls(t, e) {
    return e.hasOwnProperty("subType") ? v(t, function(t) {
      return t.subType === e.subType
    }) : t
  }

  function us(t) {
    d(im, function(e) {
      this[e] = y(t[e], t)
    }, this)
  }

  function hs() {
    this._coordinateSystems = []
  }

  function cs(t) {
    this._api = t, this._timelineOptions = [], this._mediaList = [], this._mediaDefault, this._currentMediaIndices = [], this._optionBackup, this._newBaseOption
  }

  function fs(t, e, n) {
    var i, r, a = [],
      o = [],
      s = t.timeline;
    if (t.baseOption && (r = t.baseOption), (s || t.options) && (r = r || {}, a = (t.options || []).slice()), t.media) {
      r = r || {};
      var l = t.media;
      am(l, function(t) {
        t && t.option && (t.query ? o.push(t) : i || (i = t))
      })
    }
    return r || (r = t), r.timeline || (r.timeline = s), am([r].concat(a).concat(p(o, function(t) {
      return t.option
    })), function(t) {
      am(e, function(e) {
        e(t, n)
      })
    }), {
      baseOption: r,
      timelineOptions: a,
      mediaDefault: i,
      mediaList: o
    }
  }

  function ds(t, e, n) {
    var i = {
        width: e,
        height: n,
        aspectratio: e / n
      },
      r = !0;
    return d(t, function(t, e) {
      var n = e.match(um);
      if (n && n[1] && n[2]) {
        var a = n[1],
          o = n[2].toLowerCase();
        ps(i[o], t, a) || (r = !1)
      }
    }), r
  }

  function ps(t, e, n) {
    return "min" === n ? t >= e : "max" === n ? e >= t : t === e
  }

  function gs(t, e) {
    return t.join(",") === e.join(",")
  }

  function vs(t, e) {
    e = e || {}, am(e, function(e, n) {
      if (null != e) {
        var i = t[n];
        if (Vv.hasClass(n)) {
          e = Fi(e), i = Fi(i);
          var r = Gi(i, e);
          t[n] = sm(r, function(t) {
            return t.option && t.exist ? lm(t.exist, t.option, !0) : t.exist || t.option
          })
        } else t[n] = lm(i, e, !0)
      }
    })
  }

  function ms(t) {
    var e = t && t.itemStyle;
    if (e)
      for (var n = 0, i = fm.length; i > n; n++) {
        var a = fm[n],
          o = e.normal,
          s = e.emphasis;
        o && o[a] && (t[a] = t[a] || {}, t[a].normal ? r(t[a].normal, o[a]) : t[a].normal = o[a], o[a] = null), s && s[a] && (t[a] = t[a] || {}, t[a].emphasis ? r(t[a].emphasis, s[a]) : t[a].emphasis = s[a], s[a] = null)
      }
  }

  function ys(t, e, n) {
    if (t && t[e] && (t[e].normal || t[e].emphasis)) {
      var i = t[e].normal,
        r = t[e].emphasis;
      i && (n ? (t[e].normal = t[e].emphasis = null, s(t[e], i)) : t[e] = i), r && (t.emphasis = t.emphasis || {}, t.emphasis[e] = r)
    }
  }

  function _s(t) {
    ys(t, "itemStyle"), ys(t, "lineStyle"), ys(t, "areaStyle"), ys(t, "label"), ys(t, "labelLine"), ys(t, "upperLabel"), ys(t, "edgeLabel")
  }

  function xs(t, e) {
    var n = cm(t) && t[e],
      i = cm(n) && n.textStyle;
    if (i)
      for (var r = 0, a = wp.length; a > r; r++) {
        var e = wp[r];
        i.hasOwnProperty(e) && (n[e] = i[e])
      }
  }

  function ws(t) {
    t && (_s(t), xs(t, "label"), t.emphasis && xs(t.emphasis, "label"))
  }

  function bs(t) {
    if (cm(t)) {
      ms(t), _s(t), xs(t, "label"), xs(t, "upperLabel"), xs(t, "edgeLabel"), t.emphasis && (xs(t.emphasis, "label"), xs(t.emphasis, "upperLabel"), xs(t.emphasis, "edgeLabel"));
      var e = t.markPoint;
      e && (ms(e), ws(e));
      var n = t.markLine;
      n && (ms(n), ws(n));
      var i = t.markArea;
      i && ws(i);
      var r = t.data;
      if ("graph" === t.type) {
        r = r || t.nodes;
        var a = t.links || t.edges;
        if (a && !T(a))
          for (var o = 0; o < a.length; o++) ws(a[o]);
        d(t.categories, function(t) {
          _s(t)
        })
      }
      if (r && !T(r))
        for (var o = 0; o < r.length; o++) ws(r[o]);
      var e = t.markPoint;
      if (e && e.data)
        for (var s = e.data, o = 0; o < s.length; o++) ws(s[o]);
      var n = t.markLine;
      if (n && n.data)
        for (var l = n.data, o = 0; o < l.length; o++) x(l[o]) ? (ws(l[o][0]), ws(l[o][1])) : ws(l[o]);
      "gauge" === t.type ? (xs(t, "axisLabel"), xs(t, "title"), xs(t, "detail")) : "treemap" === t.type ? (ys(t.breadcrumb, "itemStyle"), d(t.levels, function(t) {
        _s(t)
      })) : "tree" === t.type && _s(t.leaves)
    }
  }

  function Ss(t) {
    return x(t) ? t : t ? [t] : []
  }

  function Ms(t) {
    return (x(t) ? t[0] : t) || {}
  }

  function Ts(t, e) {
    e = e.split(",");
    for (var n = t, i = 0; i < e.length && (n = n && n[e[i]], null != n); i++);
    return n
  }

  function Cs(t, e, n, i) {
    e = e.split(",");
    for (var r, a = t, o = 0; o < e.length - 1; o++) r = e[o], null == a[r] && (a[r] = {}), a = a[r];
    (i || null == a[e[o]]) && (a[e[o]] = n)
  }

  function Is(t) {
    d(pm, function(e) {
      e[0] in t && !(e[1] in t) && (t[e[1]] = t[e[0]])
    })
  }

  function ks(t) {
    d(t, function(e, n) {
      var i = [],
        r = [0 / 0, 0 / 0],
        a = [e.stackResultDimension, e.stackedOverDimension],
        o = e.data,
        s = e.isStackedByIndex,
        l = o.map(a, function(a, l, u) {
          var h = o.get(e.stackedDimension, u);
          if (isNaN(h)) return r;
          var c, f;
          s ? f = o.getRawIndex(u) : c = o.get(e.stackedByDimension, u);
          for (var d = 0 / 0, p = n - 1; p >= 0; p--) {
            var g = t[p];
            if (s || (f = g.data.rawIndexOf(g.stackedByDimension, c)), f >= 0) {
              var v = g.data.getByRawIndex(g.stackResultDimension, f);
              if (h >= 0 && v > 0 || 0 >= h && 0 > v) {
                h += v, d = v;
                break
              }
            }
          }
          return i[0] = h, i[1] = d, i
        });
      o.hostModel.setData(l), e.data = l
    })
  }

  function As(t, e) {
    Go.isInstance(t) || (t = Go.seriesDataToSource(t)), this._source = t;
    var n = this._data = t.data,
      i = t.sourceFormat;
    i === Kv && (this._offset = 0, this._dimSize = e, this._data = n);
    var r = _m[i === jv ? i + "_" + t.seriesLayoutBy : i];
    o(this, r)
  }

  function Ds() {
    return this._data.length
  }

  function Ps(t) {
    return this._data[t]
  }

  function Ls(t) {
    for (var e = 0; e < t.length; e++) this._data.push(t[e])
  }

  function Os(t, e, n) {
    return null != n ? t[n] : t
  }

  function Es(t, e, n, i) {
    return Bs(t[i], this._dimensionInfos[e])
  }

  function Bs(t, e) {
    var n = e && e.type;
    if ("ordinal" === n) {
      var i = e && e.ordinalMeta;
      return i ? i.parseAndCollect(t) : t
    }
    return "time" === n && "number" != typeof t && null != t && "-" !== t && (t = +vo(t)), null == t || "" === t ? 0 / 0 : +t
  }

  function Rs(t, e, n) {
    if (t) {
      var i = t.getRawDataItem(e);
      if (null != i) {
        var r, a, o = t.getProvider().getSource().sourceFormat,
          s = t.getDimensionInfo(n);
        return s && (r = s.name, a = s.index), xm[o](i, e, a, r)
      }
    }
  }

  function zs(t, e, n) {
    if (t) {
      var i = t.getProvider().getSource().sourceFormat;
      if (i === Uv || i === Yv) {
        var r = t.getRawDataItem(e);
        return i !== Uv || S(r) || (r = null), r ? r[n] : void 0
      }
    }
  }

  function Ns(t) {
    return new Fs(t)
  }

  function Fs(t) {
    t = t || {}, this._reset = t.reset, this._plan = t.plan, this._count = t.count, this._onDirty = t.onDirty, this._dirty = !0, this.context
  }

  function Vs(t, e, n, i, r, a) {
    Tm.reset(n, i, r, a), t._callingProgress = e, t._callingProgress({
      start: n,
      end: i,
      count: i - n,
      next: Tm.next
    }, t.context)
  }

  function Hs(t, e) {
    t._dueIndex = t._outputDueEnd = t._dueEnd = 0, t._settedOutputEnd = null;
    var n, i;
    !e && t._reset && (n = t._reset(t.context), n && n.progress && (i = n.forceFirstProgress, n = n.progress), x(n) && !n.length && (n = null)), t._progress = n, t._modBy = t._modDataCount = null;
    var r = t._downstream;
    return r && r.dirty(), i
  }

  function Ws(t) {
    var e = t.name;
    qi(t) || (t.name = Gs(t) || e)
  }

  function Gs(t) {
    var e = t.getRawData(),
      n = e.mapDimension("seriesName", !0),
      i = [];
    return d(n, function(t) {
      var n = e.getDimensionInfo(t);
      n.displayName && i.push(n.displayName)
    }), i.join(" ")
  }

  function Xs(t) {
    return t.model.getRawData().count()
  }

  function qs(t) {
    var e = t.model;
    return e.setData(e.getRawData().cloneShallow()), Us
  }

  function Us(t, e) {
    t.end > e.outputData.count() && e.model.getRawData().cloneShallow(e.outputData)
  }

  function js(t, e) {
    d(t.CHANGABLE_METHODS, function(n) {
      t.wrapMethod(n, _(Ys, e))
    })
  }

  function Ys(t) {
    var e = Zs(t);
    e && e.setOutputEnd(this.count())
  }

  function Zs(t) {
    var e = (t.ecModel || {}).scheduler,
      n = e && e.getPipeline(t.uid);
    if (n) {
      var i = n.currentTask;
      if (i) {
        var r = i.agentStubMap;
        r && (i = r.get(t.uid))
      }
      return i
    }
  }

  function $s() {
    this.group = new _d, this.uid = eo("viewChart"), this.renderTask = Ns({
      plan: Js,
      reset: tl
    }), this.renderTask.context = {
      view: this
    }
  }

  function Ks(t, e, n) {
    if (t && (t.trigger(e, n), t.isGroup && !Ta(t)))
      for (var i = 0, r = t.childCount(); r > i; i++) Ks(t.childAt(i), e, n)
  }

  function Qs(t, e, n) {
    var i = ji(t, e),
      r = e && null != e.highlightKey ? Ca(e.highlightKey) : null;
    null != i ? d(Fi(i), function(e) {
      Ks(t.getItemGraphicEl(e), n, r)
    }) : t.eachItemGraphicEl(function(t) {
      Ks(t, n, r)
    })
  }

  function Js(t) {
    return Lm(t.model)
  }

  function tl(t) {
    var e = t.model,
      n = t.ecModel,
      i = t.api,
      r = t.payload,
      a = e.pipelineContext.progressiveRender,
      o = t.view,
      s = r && Pm(r).updateMethod,
      l = a ? "incrementalPrepareRender" : s && o[s] ? s : "render";
    return "render" !== l && o[l](e, n, i, r), Em[l]
  }

  function el(t, e, n) {
    function i() {
      h = (new Date).getTime(), c = null, t.apply(o, s || [])
    }
    var r, a, o, s, l, u = 0,
      h = 0,
      c = null;
    e = e || 0;
    var f = function() {
      r = (new Date).getTime(), o = this, s = arguments;
      var t = l || e,
        f = l || n;
      l = null, a = r - (f ? u : h) - t, clearTimeout(c), f ? c = setTimeout(i, t) : a >= 0 ? i() : c = setTimeout(i, -a), u = r
    };
    return f.clear = function() {
      c && (clearTimeout(c), c = null)
    }, f.debounceNextCall = function(t) {
      l = t
    }, f
  }

  function nl(t, e, n, i) {
    this.ecInstance = t, this.api = e, this.unfinished;
    var n = this._dataProcessorHandlers = n.slice(),
      i = this._visualHandlers = i.slice();
    this._allHandlers = n.concat(i), this._stageTaskMap = N()
  }

  function il(t, e, n, i, r) {
    function a(t, e) {
      return t.setDirty && (!t.dirtyMap || t.dirtyMap.get(e.__pipeline.id))
    }
    r = r || {};
    var o;
    d(e, function(e) {
      if (!r.visualType || r.visualType === e.visualType) {
        var s = t._stageTaskMap.get(e.uid),
          l = s.seriesTaskMap,
          u = s.overallTask;
        if (u) {
          var h, c = u.agentStubMap;
          c.each(function(t) {
            a(r, t) && (t.dirty(), h = !0)
          }), h && u.dirty(), Hm(u, i);
          var f = t.getPerformArgs(u, r.block);
          c.each(function(t) {
            t.perform(f)
          }), o |= u.perform(f)
        } else l && l.each(function(s) {
          a(r, s) && s.dirty();
          var l = t.getPerformArgs(s, r.block);
          l.skip = !e.performRawSeries && n.isSeriesFiltered(s.context.model), Hm(s, i), o |= s.perform(l)
        })
      }
    }), t.unfinished |= o
  }

  function rl(t, e, n, i, r) {
    function a(n) {
      var a = n.uid,
        s = o.get(a) || o.set(a, Ns({
          plan: hl,
          reset: cl,
          count: dl
        }));
      s.context = {
        model: n,
        ecModel: i,
        api: r,
        useClearVisual: e.isVisual && !e.isLayout,
        plan: e.plan,
        reset: e.reset,
        scheduler: t
      }, pl(t, n, s)
    }
    var o = n.seriesTaskMap || (n.seriesTaskMap = N()),
      s = e.seriesType,
      l = e.getTargetSeries;
    e.createOnAllSeries ? i.eachRawSeries(a) : s ? i.eachRawSeriesByType(s, a) : l && l(i, r).each(a);
    var u = t._pipelineMap;
    o.each(function(t, e) {
      u.get(e) || (t.dispose(), o.removeKey(e))
    })
  }

  function al(t, e, n, i, r) {
    function a(e) {
      var n = e.uid,
        i = s.get(n);
      i || (i = s.set(n, Ns({
        reset: sl,
        onDirty: ul
      })), o.dirty()), i.context = {
        model: e,
        overallProgress: h,
        modifyOutputEnd: c
      }, i.agent = o, i.__block = h, pl(t, e, i)
    }
    var o = n.overallTask = n.overallTask || Ns({
      reset: ol
    });
    o.context = {
      ecModel: i,
      api: r,
      overallReset: e.overallReset,
      scheduler: t
    };
    var s = o.agentStubMap = o.agentStubMap || N(),
      l = e.seriesType,
      u = e.getTargetSeries,
      h = !0,
      c = e.modifyOutputEnd;
    l ? i.eachRawSeriesByType(l, a) : u ? u(i, r).each(a) : (h = !1, d(i.getSeries(), a));
    var f = t._pipelineMap;
    s.each(function(t, e) {
      f.get(e) || (t.dispose(), o.dirty(), s.removeKey(e))
    })
  }

  function ol(t) {
    t.overallReset(t.ecModel, t.api, t.payload)
  }

  function sl(t) {
    return t.overallProgress && ll
  }

  function ll() {
    this.agent.dirty(), this.getDownstream().dirty()
  }

  function ul() {
    this.agent && this.agent.dirty()
  }

  function hl(t) {
    return t.plan && t.plan(t.model, t.ecModel, t.api, t.payload)
  }

  function cl(t) {
    t.useClearVisual && t.data.clearAllVisual();
    var e = t.resetDefines = Fi(t.reset(t.model, t.ecModel, t.api, t.payload));
    return e.length > 1 ? p(e, function(t, e) {
      return fl(e)
    }) : Wm
  }

  function fl(t) {
    return function(e, n) {
      var i = n.data,
        r = n.resetDefines[t];
      if (r && r.dataEach)
        for (var a = e.start; a < e.end; a++) r.dataEach(i, a);
      else r && r.progress && r.progress(e, i)
    }
  }

  function dl(t) {
    return t.data.count()
  }

  function pl(t, e, n) {
    var i = e.uid,
      r = t._pipelineMap.get(i);
    !r.head && (r.head = n), r.tail && r.tail.pipe(n), r.tail = n, n.__idxInPipeline = r.count++, n.__pipeline = r
  }

  function gl(t) {
    Gm = null;
    try {
      t(Xm, qm)
    } catch (e) {}
    return Gm
  }

  function vl(t, e) {
    for (var n in e.prototype) t[n] = V
  }

  function ml(t) {
    if (b(t)) {
      var e = new DOMParser;
      t = e.parseFromString(t, "text/xml")
    }
    for (9 === t.nodeType && (t = t.firstChild);
      "svg" !== t.nodeName.toLowerCase() || 1 !== t.nodeType;) t = t.nextSibling;
    return t
  }

  function yl() {
    this._defs = {}, this._root = null, this._isDefine = !1, this._isText = !1
  }

  function _l(t, e) {
    for (var n = t.firstChild; n;) {
      if (1 === n.nodeType) {
        var i = n.getAttribute("offset");
        i = i.indexOf("%") > 0 ? parseInt(i, 10) / 100 : i ? parseFloat(i) : 0;
        var r = n.getAttribute("stop-color") || "#000000";
        e.addColorStop(i, r)
      }
      n = n.nextSibling
    }
  }

  function xl(t, e) {
    t && t.__inheritedStyle && (e.__inheritedStyle || (e.__inheritedStyle = {}), s(e.__inheritedStyle, t.__inheritedStyle))
  }

  function wl(t) {
    for (var e = E(t).split(Jm), n = [], i = 0; i < e.length; i += 2) {
      var r = parseFloat(e[i]),
        a = parseFloat(e[i + 1]);
      n.push([r, a])
    }
    return n
  }

  function bl(t, e, n, i) {
    var r = e.__inheritedStyle || {},
      a = "text" === e.type;
    if (1 === t.nodeType && (Ml(t, e), o(r, Tl(t)), !i))
      for (var s in ny)
        if (ny.hasOwnProperty(s)) {
          var l = t.getAttribute(s);
          null != l && (r[ny[s]] = l)
        }
    var u = a ? "textFill" : "fill",
      h = a ? "textStroke" : "stroke";
    e.style = e.style || new kd;
    var c = e.style;
    null != r.fill && c.set(u, Sl(r.fill, n)), null != r.stroke && c.set(h, Sl(r.stroke, n)), d(["lineWidth", "opacity", "fillOpacity", "strokeOpacity", "miterLimit", "fontSize"], function(t) {
      var e = "lineWidth" === t && a ? "textStrokeWidth" : t;
      null != r[t] && c.set(e, parseFloat(r[t]))
    }), r.textBaseline && "auto" !== r.textBaseline || (r.textBaseline = "alphabetic"), "alphabetic" === r.textBaseline && (r.textBaseline = "bottom"), "start" === r.textAlign && (r.textAlign = "left"), "end" === r.textAlign && (r.textAlign = "right"), d(["lineDashOffset", "lineCap", "lineJoin", "fontWeight", "fontFamily", "fontStyle", "textAlign", "textBaseline"], function(t) {
      null != r[t] && c.set(t, r[t])
    }), r.lineDash && (e.style.lineDash = E(r.lineDash).split(Jm)), c[h] && "none" !== c[h] && (e[h] = !0), e.__inheritedStyle = r
  }

  function Sl(t, e) {
    var n = e && t && t.match(iy);
    if (n) {
      var i = E(n[1]),
        r = e[i];
      return r
    }
    return t
  }

  function Ml(t, e) {
    var n = t.getAttribute("transform");
    if (n) {
      n = n.replace(/,/g, " ");
      var i = null,
        r = [];
      n.replace(ry, function(t, e, n) {
        r.push(e, n)
      });
      for (var a = r.length - 1; a > 0; a -= 2) {
        var o = r[a],
          s = r[a - 1];
        switch (i = i || Ie(), s) {
          case "translate":
            o = E(o).split(Jm), Pe(i, i, [parseFloat(o[0]), parseFloat(o[1] || 0)]);
            break;
          case "scale":
            o = E(o).split(Jm), Oe(i, i, [parseFloat(o[0]), parseFloat(o[1] || o[0])]);
            break;
          case "rotate":
            o = E(o).split(Jm), Le(i, i, parseFloat(o[0]));
            break;
          case "skew":
            o = E(o).split(Jm), console.warn("Skew transform is not supported yet");
            break;
          case "matrix":
            var o = E(o).split(Jm);
            i[0] = parseFloat(o[0]), i[1] = parseFloat(o[1]), i[2] = parseFloat(o[2]), i[3] = parseFloat(o[3]), i[4] = parseFloat(o[4]), i[5] = parseFloat(o[5])
        }
      }
      e.setLocalTransform(i)
    }
  }

  function Tl(t) {
    var e = t.getAttribute("style"),
      n = {};
    if (!e) return n;
    var i = {};
    ay.lastIndex = 0;
    for (var r; null != (r = ay.exec(e));) i[r[1]] = r[2];
    for (var a in ny) ny.hasOwnProperty(a) && null != i[a] && (n[ny[a]] = i[a]);
    return n
  }

  function Cl(t, e, n) {
    var i = e / t.width,
      r = n / t.height,
      a = Math.min(i, r),
      o = [a, a],
      s = [-(t.x + t.width / 2) * a + e / 2, -(t.y + t.height / 2) * a + n / 2];
    return {
      scale: o,
      position: s
    }
  }

  function Il(t, e) {
    return function(n, i, r) {
      (e || !this._disposed) && (n = n && n.toLowerCase(), kf.prototype[t].call(this, n, i, r))
    }
  }

  function kl() {
    kf.call(this)
  }

  function Al(t, e, n) {
    function r(t, e) {
      return t.__prio - e.__prio
    }
    n = n || {}, "string" == typeof e && (e = Hy[e]), this.id, this.group, this._dom = t;
    var a = "canvas",
      o = this._zr = Ei(t, {
        renderer: n.renderer || a,
        devicePixelRatio: n.devicePixelRatio,
        width: n.width,
        height: n.height
      });
    this._throttledZrFlush = el(y(o.flush, o), 17);
    var e = i(e);
    e && vm(e, !0), this._theme = e, this._chartsViews = [], this._chartsMap = {}, this._componentsViews = [], this._componentsMap = {}, this._coordSysMgr = new hs;
    var s = this._api = jl(this);
    An(Vy, r), An(zy, r), this._scheduler = new nl(this, s, zy, Vy), kf.call(this, this._ecEventProcessor = new Yl), this._messageCenter = new kl, this._initEvents(), this.resize = y(this.resize, this), this._pendingActions = [], o.animation.on("frame", this._onframe, this), zl(o, this), B(this)
  }

  function Dl(t, e, n) {
    if (!this._disposed) {
      var i, r = this._model,
        a = this._coordSysMgr.getCoordinateSystems();
      e = Zi(r, e);
      for (var o = 0; o < a.length; o++) {
        var s = a[o];
        if (s[t] && null != (i = s[t](r, e, n))) return i
      }
    }
  }

  function Pl(t) {
    var e = t._model,
      n = t._scheduler;
    n.restorePipelines(e), n.prepareStageTasks(), Nl(t, "component", e, n), Nl(t, "chart", e, n), n.plan()
  }

  function Ll(t, e, n, i, r) {
    function a(i) {
      i && i.__alive && i[e] && i[e](i.__model, o, t._api, n)
    }
    var o = t._model;
    if (!i) return void hy(t._componentsViews.concat(t._chartsViews), a);
    var s = {};
    s[i + "Id"] = n[i + "Id"], s[i + "Index"] = n[i + "Index"], s[i + "Name"] = n[i + "Name"];
    var l = {
      mainType: i,
      query: s
    };
    r && (l.subType = r);
    var u = n.excludeSeriesId;
    null != u && (u = N(Fi(u))), o && o.eachComponent(l, function(e) {
      u && null != u.get(e.id) || a(t["series" === i ? "_chartsMap" : "_componentsMap"][e.__viewId])
    }, t)
  }

  function Ol(t, e) {
    var n = t._chartsMap,
      i = t._scheduler;
    e.eachSeries(function(t) {
      i.updateStreamModes(t, n[t.__viewId])
    })
  }

  function El(t, e) {
    var n = t.type,
      i = t.escapeConnect,
      r = By[n],
      a = r.actionInfo,
      l = (a.update || "update").split(":"),
      u = l.pop();
    l = null != l[0] && dy(l[0]), this[Ay] = !0;
    var h = [t],
      c = !1;
    t.batch && (c = !0, h = p(t.batch, function(e) {
      return e = s(o({}, e), t), e.batch = null, e
    }));
    var f, d = [],
      g = "highlight" === n || "downplay" === n;
    hy(h, function(t) {
      f = r.action(t, this._model, this._api), f = f || o({}, t), f.type = a.event || f.type, d.push(f), g ? Ll(this, u, t, "series") : l && Ll(this, u, t, l.main, l.sub)
    }, this), "none" === u || g || l || (this[Dy] ? (Pl(this), Oy.update.call(this, t), this[Dy] = !1) : Oy[u].call(this, t)), f = c ? {
      type: a.event || n,
      escapeConnect: i,
      batch: d
    } : d[0], this[Ay] = !1, !e && this._messageCenter.trigger(f.type, f)
  }

  function Bl(t) {
    for (var e = this._pendingActions; e.length;) {
      var n = e.shift();
      El.call(this, n, t)
    }
  }

  function Rl(t) {
    !t && this.trigger("updated")
  }

  function zl(t, e) {
    t.on("rendered", function() {
      e.trigger("rendered"), !t.animation.isFinished() || e[Dy] || e._scheduler.unfinished || e._pendingActions.length || e.trigger("finished")
    })
  }

  function Nl(t, e, n, i) {
    function r(t) {
      var e = "_ec_" + t.id + "_" + t.type,
        r = s[e];
      if (!r) {
        var h = dy(t.type),
          c = a ? km.getClass(h.main, h.sub) : $s.getClass(h.sub);
        r = new c, r.init(n, u), s[e] = r, o.push(r), l.add(r.group)
      }
      t.__viewId = r.__id = e, r.__alive = !0, r.__model = t, r.group.__ecComponentInfo = {
        mainType: t.mainType,
        index: t.componentIndex
      }, !a && i.prepareView(r, t, n, u)
    }
    for (var a = "component" === e, o = a ? t._componentsViews : t._chartsViews, s = a ? t._componentsMap : t._chartsMap, l = t._zr, u = t._api, h = 0; h < o.length; h++) o[h].__alive = !1;
    a ? n.eachComponent(function(t, e) {
      "series" !== t && r(e)
    }) : n.eachSeries(r);
    for (var h = 0; h < o.length;) {
      var c = o[h];
      c.__alive ? h++ : (!a && c.renderTask.dispose(), l.remove(c.group), c.dispose(n, u), o.splice(h, 1), delete s[c.__id], c.__id = c.group.__ecComponentInfo = null)
    }
  }

  function Fl(t) {
    t.clearColorPalette(), t.eachSeries(function(t) {
      t.clearColorPalette()
    })
  }

  function Vl(t, e, n, i) {
    Hl(t, e, n, i), hy(t._chartsViews, function(t) {
      t.__alive = !1
    }), Wl(t, e, n, i), hy(t._chartsViews, function(t) {
      t.__alive || t.remove(e, n)
    })
  }

  function Hl(t, e, n, i, r) {
    hy(r || t._componentsViews, function(t) {
      var r = t.__model;
      t.render(r, e, n, i), Ul(r, t)
    })
  }

  function Wl(t, e, n, i, r) {
    var a, o = t._scheduler;
    e.eachSeries(function(e) {
      var n = t._chartsMap[e.__viewId];
      n.__alive = !0;
      var s = n.renderTask;
      o.updatePayload(s, i), r && r.get(e.uid) && s.dirty(), a |= s.perform(o.getPerformArgs(s)), n.group.silent = !!e.get("silent"), Ul(e, n), ql(e, n)
    }), o.unfinished |= a, Xl(t, e), zm(t._zr.dom, e)
  }

  function Gl(t, e) {
    hy(Fy, function(n) {
      n(t, e)
    })
  }

  function Xl(t, e) {
    var n = t._zr,
      i = n.storage,
      r = 0;
    i.traverse(function() {
      r++
    }), r > e.get("hoverLayerThreshold") && ! of .node && e.eachSeries(function(e) {
      if (!e.preventUsingHoverLayer) {
        var n = t._chartsMap[e.__viewId];
        n.__alive && n.group.traverse(function(t) {
          t.useHoverLayer = !0
        })
      }
    })
  }

  function ql(t, e) {
    var n = t.get("blendMode") || null;
    e.group.traverse(function(t) {
      t.isGroup || t.style.blend !== n && t.setStyle("blend", n), t.eachPendingDisplayable && t.eachPendingDisplayable(function(t) {
        t.setStyle("blend", n)
      })
    })
  }

  function Ul(t, e) {
    var n = t.get("z"),
      i = t.get("zlevel");
    e.group.traverse(function(t) {
      "group" !== t.type && (null != n && (t.z = n), null != i && (t.zlevel = i))
    })
  }

  function jl(t) {
    var e = t._coordSysMgr;
    return o(new us(t), {
      getCoordinateSystems: y(e.getCoordinateSystems, e),
      getComponentByElement: function(e) {
        for (; e;) {
          var n = e.__ecComponentInfo;
          if (null != n) return t._model.getComponent(n.mainType, n.index);
          e = e.parent
        }
      }
    })
  }

  function Yl() {
    this.eventInfo
  }

  function Zl(t) {
    function e(t, e) {
      for (var n = 0; n < t.length; n++) {
        var i = t[n];
        i[a] = e
      }
    }
    var n = 0,
      i = 1,
      r = 2,
      a = "__connectUpdateStatus";
    hy(Ry, function(o, s) {
      t._messageCenter.on(s, function(o) {
        if (Xy[t.group] && t[a] !== n) {
          if (o && o.escapeConnect) return;
          var s = t.makeActionFromEvent(o),
            l = [];
          hy(Gy, function(e) {
            e !== t && e.group === t.group && l.push(e)
          }), e(l, n), hy(l, function(t) {
            t[a] !== i && t.dispatchAction(s)
          }), e(l, r)
        }
      })
    })
  }

  function $l(t, e, n) {
    var i = tu(t);
    if (i) return i;
    var r = new Al(t, e, n);
    return r.id = "ec_" + qy++, Gy[r.id] = r, Ki(t, jy, r.id), Zl(r), r
  }

  function Kl(t) {
    if (x(t)) {
      var e = t;
      t = null, hy(e, function(e) {
        null != e.group && (t = e.group)
      }), t = t || "g_" + Uy++, hy(e, function(e) {
        e.group = t
      })
    }
    return Xy[t] = !0, t
  }

  function Ql(t) {
    Xy[t] = !1
  }

  function Jl(t) {
    "string" == typeof t ? t = Gy[t] : t instanceof Al || (t = tu(t)), t instanceof Al && !t.isDisposed() && t.dispose()
  }

  function tu(t) {
    return Gy[Qi(t, jy)]
  }

  function eu(t) {
    return Gy[t]
  }

  function nu(t, e) {
    Hy[t] = e
  }

  function iu(t) {
    Ny.push(t)
  }

  function ru(t, e) {
    cu(zy, t, e, my)
  }

  function au(t) {
    Fy.push(t)
  }

  function ou(t, e, n) {
    "function" == typeof e && (n = e, e = "");
    var i = fy(t) ? t.type : [t, t = {
      event: e
    }][0];
    t.event = (t.event || i).toLowerCase(), e = t.event, uy(Py.test(i) && Py.test(e)), By[i] || (By[i] = {
      action: n,
      actionInfo: t
    }), Ry[e] = i
  }

  function su(t, e) {
    hs.register(t, e)
  }

  function lu(t) {
    var e = hs.get(t);
    return e ? e.getDimensionsInfo ? e.getDimensionsInfo() : e.dimensions.slice() : void 0
  }

  function uu(t, e) {
    cu(Vy, t, e, wy, "layout")
  }

  function hu(t, e) {
    cu(Vy, t, e, My, "visual")
  }

  function cu(t, e, n, i, r) {
    (cy(e) || fy(e)) && (n = e, e = i);
    var a = nl.wrapStageHandler(n, r);
    return a.__prio = e, a.__raw = n, t.push(a), a
  }

  function fu(t, e) {
    Wy[t] = e
  }

  function du(t) {
    return Vv.extend(t)
  }

  function pu(t) {
    return km.extend(t)
  }

  function gu(t) {
    return Im.extend(t)
  }

  function vu(t) {
    return $s.extend(t)
  }

  function mu(t) {
    n("createCanvas", t)
  }

  function yu(t, e, n) {
    sy.registerMap(t, e, n)
  }

  function _u(t) {
    var e = sy.retrieveMap(t);
    return e && e[0] && {
      geoJson: e[0].geoJSON,
      specialAreas: e[0].specialAreas
    }
  }

  function xu(t) {
    return t
  }

  function wu(t, e, n, i, r) {
    this._old = t, this._new = e, this._oldKeyGetter = n || xu, this._newKeyGetter = i || xu, this.context = r
  }

  function bu(t, e, n, i, r) {
    for (var a = 0; a < t.length; a++) {
      var o = "_ec_" + r[i](t[a], a),
        s = e[o];
      null == s ? (n.push(o), e[o] = a) : (s.length || (e[o] = s = [s]), s.push(a))
    }
  }

  function Su(t) {
    var e = {},
      n = e.encode = {},
      i = N(),
      r = [],
      a = [],
      o = e.userOutput = {
        dimensionNames: t.dimensions.slice(),
        encode: {}
      };
    d(t.dimensions, function(e) {
      var s = t.getDimensionInfo(e),
        l = s.coordDim;
      if (l) {
        var u = s.coordDimIndex;
        Mu(n, l)[u] = e, s.isExtraCoord || (i.set(l, 1), Cu(s.type) && (r[0] = e), Mu(o.encode, l)[u] = s.index), s.defaultTooltip && a.push(e)
      }
      $y.each(function(t, e) {
        var i = Mu(n, e),
          r = s.otherDims[e];
        null != r && r !== !1 && (i[r] = s.name)
      })
    });
    var s = [],
      l = {};
    i.each(function(t, e) {
      var i = n[e];
      l[e] = i[0], s = s.concat(i)
    }), e.dataDimsOnCoord = s, e.encodeFirstDimNotExtra = l;
    var u = n.label;
    u && u.length && (r = u.slice());
    var h = n.tooltip;
    return h && h.length ? a = h.slice() : a.length || (a = r.slice()), n.defaultedLabel = r, n.defaultedTooltip = a, e
  }

  function Mu(t, e) {
    return t.hasOwnProperty(e) || (t[e] = []), t[e]
  }

  function Tu(t) {
    return "category" === t ? "ordinal" : "time" === t ? "time" : "float"
  }

  function Cu(t) {
    return !("ordinal" === t || "time" === t)
  }

  function Iu(t) {
    return t._rawCount > 65535 ? n_ : r_
  }

  function ku(t) {
    var e = t.constructor;
    return e === Array ? t.slice() : new e(t)
  }

  function Au(t, e) {
    d(a_.concat(e.__wrappedMethods || []), function(n) {
      e.hasOwnProperty(n) && (t[n] = e[n])
    }), t.__wrappedMethods = e.__wrappedMethods, d(o_, function(n) {
      t[n] = i(e[n])
    }), t._calculationInfo = o(e._calculationInfo)
  }

  function Du(t, e, n, i, r) {
    var a = e_[e.type],
      o = i - 1,
      s = e.name,
      l = t[s][o];
    if (l && l.length < n) {
      for (var u = new a(Math.min(r - o * n, n)), h = 0; h < l.length; h++) u[h] = l[h];
      t[s][o] = u
    }
    for (var c = i * n; r > c; c += n) t[s].push(new a(Math.min(r - c, n)))
  }

  function Pu(t) {
    var e = t._invertedIndicesMap;
    d(e, function(n, i) {
      var r = t._dimensionInfos[i],
        a = r.ordinalMeta;
      if (a) {
        n = e[i] = new i_(a.categories.length);
        for (var o = 0; o < n.length; o++) n[o] = Jy;
        for (var o = 0; o < t._count; o++) n[t.get(i, o)] = o
      }
    })
  }

  function Lu(t, e, n) {
    var i;
    if (null != e) {
      var r = t._chunkSize,
        a = Math.floor(n / r),
        o = n % r,
        s = t.dimensions[e],
        l = t._storage[s][a];
      if (l) {
        i = l[o];
        var u = t._dimensionInfos[s].ordinalMeta;
        u && u.categories.length && (i = u.categories[i])
      }
    }
    return i
  }

  function Ou(t) {
    return t
  }

  function Eu(t) {
    return t < this._count && t >= 0 ? this._indices[t] : -1
  }

  function Bu(t, e) {
    var n = t._idList[e];
    return null == n && (n = Lu(t, t._idDimIdx, e)), null == n && (n = t_ + e), n
  }

  function Ru(t) {
    return x(t) || (t = [t]), t
  }

  function zu(t, e) {
    var n = t.dimensions,
      i = new s_(p(n, t.getDimensionInfo, t), t.hostModel);
    Au(i, t);
    for (var r = i._storage = {}, a = t._storage, o = 0; o < n.length; o++) {
      var s = n[o];
      a[s] && (u(e, s) >= 0 ? (r[s] = Nu(a[s]), i._rawExtent[s] = Fu(), i._extent[s] = null) : r[s] = a[s])
    }
    return i
  }

  function Nu(t) {
    for (var e = new Array(t.length), n = 0; n < t.length; n++) e[n] = ku(t[n]);
    return e
  }

  function Fu() {
    return [1 / 0, -1 / 0]
  }

  function Vu(t, e, n) {
    function r(t, e, n) {
      null != $y.get(e) ? t.otherDims[e] = n : (t.coordDim = e, t.coordDimIndex = n, h.set(e, !0))
    }
    Go.isInstance(e) || (e = Go.seriesDataToSource(e)), n = n || {}, t = (t || []).slice();
    for (var a = (n.dimsDef || []).slice(), l = N(n.encodeDef), u = N(), h = N(), c = [], f = Hu(e, t, a, n.dimCount), p = 0; f > p; p++) {
      var g = a[p] = o({}, S(a[p]) ? a[p] : {
          name: a[p]
        }),
        v = g.name,
        m = c[p] = {
          otherDims: {}
        };
      null != v && null == u.get(v) && (m.name = m.displayName = v, u.set(v, p)), null != g.type && (m.type = g.type), null != g.displayName && (m.displayName = g.displayName)
    }
    l.each(function(t, e) {
      if (t = Fi(t).slice(), 1 === t.length && !b(t[0]) && t[0] < 0) return void l.set(e, !1);
      var n = l.set(e, []);
      d(t, function(t, i) {
        b(t) && (t = u.get(t)), null != t && f > t && (n[i] = t, r(c[t], e, i))
      })
    });
    var y = 0;
    d(t, function(t) {
      var e, t, n, a;
      if (b(t)) e = t, t = {};
      else {
        e = t.name;
        var o = t.ordinalMeta;
        t.ordinalMeta = null, t = i(t), t.ordinalMeta = o, n = t.dimsDef, a = t.otherDims, t.name = t.coordDim = t.coordDimIndex = t.dimsDef = t.otherDims = null
      }
      var u = l.get(e);
      if (u !== !1) {
        var u = Fi(u);
        if (!u.length)
          for (var h = 0; h < (n && n.length || 1); h++) {
            for (; y < c.length && null != c[y].coordDim;) y++;
            y < c.length && u.push(y++)
          }
        d(u, function(i, o) {
          var l = c[i];
          if (r(s(l, t), e, o), null == l.name && n) {
            var u = n[o];
            !S(u) && (u = {
              name: u
            }), l.name = l.displayName = u.name, l.defaultTooltip = u.defaultTooltip
          }
          a && s(l.otherDims, a)
        })
      }
    });
    var _ = n.generateCoord,
      x = n.generateCoordCount,
      w = null != x;
    x = _ ? x || 1 : 0;
    for (var M = _ || "value", T = 0; f > T; T++) {
      var m = c[T] = c[T] || {},
        C = m.coordDim;
      null == C && (m.coordDim = Wu(M, h, w), m.coordDimIndex = 0, (!_ || 0 >= x) && (m.isExtraCoord = !0), x--), null == m.name && (m.name = Wu(m.coordDim, u)), null == m.type && ts(e, T, m.name) && (m.type = "ordinal")
    }
    return c
  }

  function Hu(t, e, n, i) {
    var r = Math.max(t.dimensionsDetectCount || 1, e.length, n.length, i || 0);
    return d(e, function(t) {
      var e = t.dimsDef;
      e && (r = Math.max(r, e.length))
    }), r
  }

  function Wu(t, e, n) {
    if (n || null != e.get(t)) {
      for (var i = 0; null != e.get(t + i);) i++;
      t += i
    }
    return e.set(t, !0), t
  }

  function Gu(t, e, n) {
    n = n || {};
    var i, r, a, o, s = n.byIndex,
      l = n.stackedCoordDimension,
      u = !(!t || !t.get("stack"));
    if (d(e, function(t, n) {
        b(t) && (e[n] = t = {
          name: t
        }), u && !t.isExtraCoord && (s || i || !t.ordinalMeta || (i = t), r || "ordinal" === t.type || "time" === t.type || l && l !== t.coordDim || (r = t))
      }), !r || s || i || (s = !0), r) {
      a = "__\x00ecstackresult", o = "__\x00ecstackedover", i && (i.createInvertedIndices = !0);
      var h = r.coordDim,
        c = r.type,
        f = 0;
      d(e, function(t) {
        t.coordDim === h && f++
      }), e.push({
        name: a,
        coordDim: h,
        coordDimIndex: f,
        type: c,
        isExtraCoord: !0,
        isCalculationCoord: !0
      }), f++, e.push({
        name: o,
        coordDim: o,
        coordDimIndex: f,
        type: c,
        isExtraCoord: !0,
        isCalculationCoord: !0
      })
    }
    return {
      stackedDimension: r && r.name,
      stackedByDimension: i && i.name,
      isStackedByIndex: s,
      stackedOverDimension: o,
      stackResultDimension: a
    }
  }

  function Xu(t, e) {
    return !!e && e === t.getCalculationInfo("stackedDimension")
  }

  function qu(t, e) {
    return Xu(t, e) ? t.getCalculationInfo("stackResultDimension") : e
  }

  function Uu(t, e, n) {
    n = n || {}, Go.isInstance(t) || (t = Go.seriesDataToSource(t));
    var i, r = e.get("coordinateSystem"),
      a = hs.get(r),
      o = Ho(e);
    o && (i = p(o.coordSysDims, function(t) {
      var e = {
          name: t
        },
        n = o.axisMap.get(t);
      if (n) {
        var i = n.get("type");
        e.type = Tu(i)
      }
      return e
    })), i || (i = a && (a.getDimensionsInfo ? a.getDimensionsInfo() : a.dimensions.slice()) || ["x", "y"]);
    var s, l, u = h_(t, {
      coordDimensions: i,
      generateCoord: n.generateCoord
    });
    o && d(u, function(t, e) {
      var n = t.coordDim,
        i = o.categoryAxisMap.get(n);
      i && (null == s && (s = e), t.ordinalMeta = i.getOrdinalMeta()), null != t.otherDims.itemName && (l = !0)
    }), l || null == s || (u[s].otherDims.itemName = 0);
    var h = Gu(e, u),
      c = new s_(u, e);
    c.setCalculationInfo(h);
    var f = null != s && ju(t) ? function(t, e, n, i) {
      return i === s ? n : this.defaultDimValueGetter(t, e, n, i)
    } : null;
    return c.hasItemOption = !1, c.initData(t, null, f), c
  }

  function ju(t) {
    if (t.sourceFormat === Uv) {
      var e = Yu(t.data || []);
      return null != e && !x(Hi(e))
    }
  }

  function Yu(t) {
    for (var e = 0; e < t.length && null == t[e];) e++;
    return t[e]
  }

  function Zu(t) {
    this._setting = t || {}, this._extent = [1 / 0, -1 / 0], this._interval = 0, this.init && this.init.apply(this, arguments)
  }

  function $u(t) {
    this.categories = t.categories || [], this._needCollect = t.needCollect, this._deduplication = t.deduplication, this._map
  }

  function Ku(t) {
    return t._map || (t._map = N(t.categories))
  }

  function Qu(t) {
    return S(t) && null != t.value ? t.value : t + ""
  }

  function Ju(t, e, n, i) {
    var r = {},
      a = t[1] - t[0],
      o = r.interval = _o(a / e, !0);
    null != n && n > o && (o = r.interval = n), null != i && o > i && (o = r.interval = i);
    var s = r.intervalPrecision = th(o),
      l = r.niceTickExtent = [p_(Math.ceil(t[0] / o) * o, s), p_(Math.floor(t[1] / o) * o, s)];
    return nh(l, t), r
  }

  function th(t) {
    return ho(t) + 2
  }

  function eh(t, e, n) {
    t[e] = Math.max(Math.min(t[e], n[1]), n[0])
  }

  function nh(t, e) {
    !isFinite(t[0]) && (t[0] = e[0]), !isFinite(t[1]) && (t[1] = e[1]), eh(t, 0, e), eh(t, 1, e), t[0] > t[1] && (t[0] = t[1])
  }

  function ih(t, e, n, i) {
    var r = [];
    if (!t) return r;
    var a = 1e4;
    e[0] < n[0] && r.push(e[0]);
    for (var o = n[0]; o <= n[1] && (r.push(o), o = p_(o + t, i), o !== r[r.length - 1]);)
      if (r.length > a) return [];
    return e[1] > (r.length ? r[r.length - 1] : n[1]) && r.push(e[1]), r
  }

  function rh(t) {
    return t.get("stack") || m_ + t.seriesIndex
  }

  function ah(t) {
    return t.dim + t.index
  }

  function oh(t, e) {
    var n = [];
    return e.eachSeriesByType(t, function(t) {
      hh(t) && !ch(t) && n.push(t)
    }), n
  }

  function sh(t) {
    var e = [];
    return d(t, function(t) {
      var n = t.getData(),
        i = t.coordinateSystem,
        r = i.getBaseAxis(),
        a = r.getExtent(),
        o = "category" === r.type ? r.getBandWidth() : Math.abs(a[1] - a[0]) / n.count(),
        s = oo(t.get("barWidth"), o),
        l = oo(t.get("barMaxWidth"), o),
        u = t.get("barGap"),
        h = t.get("barCategoryGap");
      e.push({
        bandWidth: o,
        barWidth: s,
        barMaxWidth: l,
        barGap: u,
        barCategoryGap: h,
        axisKey: ah(r),
        stackId: rh(t)
      })
    }), lh(e)
  }

  function lh(t) {
    var e = {};
    d(t, function(t) {
      var n = t.axisKey,
        i = t.bandWidth,
        r = e[n] || {
          bandWidth: i,
          remainedWidth: i,
          autoWidthCount: 0,
          categoryGap: "20%",
          gap: "30%",
          stacks: {}
        },
        a = r.stacks;
      e[n] = r;
      var o = t.stackId;
      a[o] || r.autoWidthCount++, a[o] = a[o] || {
        width: 0,
        maxWidth: 0
      };
      var s = t.barWidth;
      s && !a[o].width && (a[o].width = s, s = Math.min(r.remainedWidth, s), r.remainedWidth -= s);
      var l = t.barMaxWidth;
      l && (a[o].maxWidth = l);
      var u = t.barGap;
      null != u && (r.gap = u);
      var h = t.barCategoryGap;
      null != h && (r.categoryGap = h)
    });
    var n = {};
    return d(e, function(t, e) {
      n[e] = {};
      var i = t.stacks,
        r = t.bandWidth,
        a = oo(t.categoryGap, r),
        o = oo(t.gap, 1),
        s = t.remainedWidth,
        l = t.autoWidthCount,
        u = (s - a) / (l + (l - 1) * o);
      u = Math.max(u, 0), d(i, function(t) {
        var e = t.maxWidth;
        e && u > e && (e = Math.min(e, s), t.width && (e = Math.min(e, t.width)), s -= e, t.width = e, l--)
      }), u = (s - a) / (l + (l - 1) * o), u = Math.max(u, 0);
      var h, c = 0;
      d(i, function(t) {
        t.width || (t.width = u), h = t, c += t.width * (1 + o)
      }), h && (c -= h.width * o);
      var f = -c / 2;
      d(i, function(t, i) {
        n[e][i] = n[e][i] || {
          bandWidth: r,
          offset: f,
          width: t.width
        }, f += t.width * (1 + o)
      })
    }), n
  }

  function uh(t, e, n) {
    if (t && e) {
      var i = t[ah(e)];
      return null != i && null != n && (i = i[rh(n)]), i
    }
  }

  function hh(t) {
    return t.coordinateSystem && "cartesian2d" === t.coordinateSystem.type
  }

  function ch(t) {
    return t.pipelineContext && t.pipelineContext.large
  }

  function fh(t, e) {
    return e.toGlobalCoord(e.dataToCoord(0))
  }

  function dh(t, e) {
    return O_(t, L_(e))
  }

  function ph(t, e) {
    var n, i, r, a = t.type,
      o = e.getMin(),
      s = e.getMax(),
      l = null != o,
      u = null != s,
      h = t.getExtent();
    "ordinal" === a ? n = e.getCategories().length : (i = e.get("boundaryGap"), x(i) || (i = [i || 0, i || 0]), "boolean" == typeof i[0] && (i = [0, 0]), i[0] = oo(i[0], 1), i[1] = oo(i[1], 1), r = h[1] - h[0] || Math.abs(h[0])), null == o && (o = "ordinal" === a ? n ? 0 : 0 / 0 : h[0] - i[0] * r), null == s && (s = "ordinal" === a ? n ? n - 1 : 0 / 0 : h[1] + i[1] * r), "dataMin" === o ? o = h[0] : "function" == typeof o && (o = o({
      min: h[0],
      max: h[1]
    })), "dataMax" === s ? s = h[1] : "function" == typeof s && (s = s({
      min: h[0],
      max: h[1]
    })), (null == o || !isFinite(o)) && (o = 0 / 0), (null == s || !isFinite(s)) && (s = 0 / 0), t.setBlank(I(o) || I(s) || "ordinal" === a && !t.getOrdinalMeta().categories.length), e.getNeedCrossZero() && (o > 0 && s > 0 && !l && (o = 0), 0 > o && 0 > s && !u && (s = 0));
    var c = e.ecModel;
    if (c && "time" === a) {
      var f, p = oh("bar", c);
      if (d(p, function(t) {
          f |= t.getBaseAxis() === e.axis
        }), f) {
        var g = sh(p),
          v = gh(o, s, e, g);
        o = v.min, s = v.max
      }
    }
    return [o, s]
  }

  function gh(t, e, n, i) {
    var r = n.axis.getExtent(),
      a = r[1] - r[0],
      o = uh(i, n.axis);
    if (void 0 === o) return {
      min: t,
      max: e
    };
    var s = 1 / 0;
    d(o, function(t) {
      s = Math.min(t.offset, s)
    });
    var l = -1 / 0;
    d(o, function(t) {
      l = Math.max(t.offset + t.width, l)
    }), s = Math.abs(s), l = Math.abs(l);
    var u = s + l,
      h = e - t,
      c = 1 - (s + l) / a,
      f = h / c - h;
    return e += f * (l / u), t -= f * (s / u), {
      min: t,
      max: e
    }
  }

  function vh(t, e) {
    var n = ph(t, e),
      i = null != e.getMin(),
      r = null != e.getMax(),
      a = e.get("splitNumber");
    "log" === t.type && (t.base = e.get("logBase"));
    var o = t.type;
    t.setExtent(n[0], n[1]), t.niceExtent({
      splitNumber: a,
      fixMin: i,
      fixMax: r,
      minInterval: "interval" === o || "time" === o ? e.get("minInterval") : null,
      maxInterval: "interval" === o || "time" === o ? e.get("maxInterval") : null
    });
    var s = e.get("interval");
    null != s && t.setInterval && t.setInterval(s)
  }

  function mh(t, e) {
    if (e = e || t.get("type")) switch (e) {
      case "category":
        return new d_(t.getOrdinalMeta ? t.getOrdinalMeta() : t.getCategories(), [1 / 0, -1 / 0]);
      case "value":
        return new v_;
      default:
        return (Zu.getClass(e) || v_).create(t)
    }
  }

  function yh(t) {
    var e = t.scale.getExtent(),
      n = e[0],
      i = e[1];
    return !(n > 0 && i > 0 || 0 > n && 0 > i)
  }

  function _h(t) {
    var e = t.getLabelModel().get("formatter"),
      n = "category" === t.type ? t.scale.getExtent()[0] : null;
    return "string" == typeof e ? e = function(e) {
      return function(n) {
        return n = t.scale.getLabel(n), e.replace("{value}", null != n ? n : "")
      }
    }(e) : "function" == typeof e ? function(i, r) {
      return null != n && (r = i - n), e(xh(t, i), r)
    } : function(e) {
      return t.scale.getLabel(e)
    }
  }

  function xh(t, e) {
    return "category" === t.type ? t.scale.getLabel(e) : e
  }

  function wh(t) {
    var e = t.model,
      n = t.scale;
    if (e.get("axisLabel.show") && !n.isBlank()) {
      var i, r, a = "category" === t.type,
        o = n.getExtent();
      a ? r = n.count() : (i = n.getTicks(), r = i.length);
      var s, l = t.getLabelModel(),
        u = _h(t),
        h = 1;
      r > 40 && (h = Math.ceil(r / 40));
      for (var c = 0; r > c; c += h) {
        var f = i ? i[c] : o[0] + c,
          d = u(f),
          p = l.getTextRect(d),
          g = bh(p, l.get("rotate") || 0);
        s ? s.union(g) : s = g
      }
      return s
    }
  }

  function bh(t, e) {
    var n = e * Math.PI / 180,
      i = t.plain(),
      r = i.width,
      a = i.height,
      o = r * Math.cos(n) + a * Math.sin(n),
      s = r * Math.sin(n) + a * Math.cos(n),
      l = new wn(i.x, i.y, o, s);
    return l
  }

  function Sh(t) {
    var e = t.get("interval");
    return null == e ? "auto" : e
  }

  function Mh(t) {
    return "category" === t.type && 0 === Sh(t.getLabelModel())
  }

  function Th(t, e) {
    if ("image" !== this.type) {
      var n = this.style,
        i = this.shape;
      i && "line" === i.symbolType ? n.stroke = t : this.__isEmptyBrush ? (n.stroke = t, n.fill = e || "#fff") : (n.fill && (n.fill = t), n.stroke && (n.stroke = t)), this.dirty(!1)
    }
  }

  function Ch(t, e, n, i, r, a, o) {
    var s = 0 === t.indexOf("empty");
    s && (t = t.substr(5, 1).toLowerCase() + t.substr(6));
    var l;
    return l = 0 === t.indexOf("image://") ? aa(t.slice(8), new wn(e, n, i, r), o ? "center" : "cover") : 0 === t.indexOf("path://") ? ra(t.slice(7), {}, new wn(e, n, i, r), o ? "center" : "cover") : new j_({
      shape: {
        symbolType: t,
        x: e,
        y: n,
        width: i,
        height: r
      }
    }), l.__isEmptyBrush = s, l.setColor = Th, l.setColor(a), l
  }

  function Ih(t) {
    return Uu(t.getSource(), t)
  }

  function kh(t, e) {
    var n = e;
    Qa.isInstance(e) || (n = new Qa(e), c(n, F_));
    var i = mh(n);
    return i.setExtent(t[0], t[1]), vh(i, n), i
  }

  function Ah(t) {
    c(t, F_)
  }

  function Dh(t, e) {
    return Math.abs(t - e) < $_
  }

  function Ph(t, e, n) {
    var i = 0,
      r = t[0];
    if (!r) return !1;
    for (var a = 1; a < t.length; a++) {
      var o = t[a];
      i += Pr(r[0], r[1], o[0], o[1], e, n), r = o
    }
    var s = t[0];
    return Dh(r[0], s[0]) && Dh(r[1], s[1]) || (i += Pr(r[0], r[1], s[0], s[1], e, n)), 0 !== i
  }

  function Lh(t, e, n) {
    if (this.name = t, this.geometries = e, n) n = [n[0], n[1]];
    else {
      var i = this.getBoundingRect();
      n = [i.x + i.width / 2, i.y + i.height / 2]
    }
    this.center = n
  }

  function Oh(t) {
    if (!t.UTF8Encoding) return t;
    var e = t.UTF8Scale;
    null == e && (e = 1024);
    for (var n = t.features, i = 0; i < n.length; i++)
      for (var r = n[i], a = r.geometry, o = a.coordinates, s = a.encodeOffsets, l = 0; l < o.length; l++) {
        var u = o[l];
        if ("Polygon" === a.type) o[l] = Eh(u, s[l], e);
        else if ("MultiPolygon" === a.type)
          for (var h = 0; h < u.length; h++) {
            var c = u[h];
            u[h] = Eh(c, s[l][h], e)
          }
      }
    return t.UTF8Encoding = !1, t
  }

  function Eh(t, e, n) {
    for (var i = [], r = e[0], a = e[1], o = 0; o < t.length; o += 2) {
      var s = t.charCodeAt(o) - 64,
        l = t.charCodeAt(o + 1) - 64;
      s = s >> 1 ^ -(1 & s), l = l >> 1 ^ -(1 & l), s += r, l += a, r = s, a = l, i.push([s / n, l / n])
    }
    return i
  }

  function Bh(t) {
    return "category" === t.type ? zh(t) : Vh(t)
  }

  function Rh(t, e) {
    return "category" === t.type ? Fh(t, e) : {
      ticks: t.scale.getTicks()
    }
  }

  function zh(t) {
    var e = t.getLabelModel(),
      n = Nh(t, e);
    return !e.get("show") || t.scale.isBlank() ? {
      labels: [],
      labelCategoryInterval: n.labelCategoryInterval
    } : n
  }

  function Nh(t, e) {
    var n = Hh(t, "labels"),
      i = Sh(e),
      r = Wh(n, i);
    if (r) return r;
    var a, o;
    return w(i) ? a = Yh(t, i) : (o = "auto" === i ? Xh(t) : i, a = jh(t, o)), Gh(n, i, {
      labels: a,
      labelCategoryInterval: o
    })
  }

  function Fh(t, e) {
    var n = Hh(t, "ticks"),
      i = Sh(e),
      r = Wh(n, i);
    if (r) return r;
    var a, o;
    if ((!e.get("show") || t.scale.isBlank()) && (a = []), w(i)) a = Yh(t, i, !0);
    else if ("auto" === i) {
      var s = Nh(t, t.getLabelModel());
      o = s.labelCategoryInterval, a = p(s.labels, function(t) {
        return t.tickValue
      })
    } else o = i, a = jh(t, o, !0);
    return Gh(n, i, {
      ticks: a,
      tickCategoryInterval: o
    })
  }

  function Vh(t) {
    var e = t.scale.getTicks(),
      n = _h(t);
    return {
      labels: p(e, function(e, i) {
        return {
          formattedLabel: n(e, i),
          rawLabel: t.scale.getLabel(e),
          tickValue: e
        }
      })
    }
  }

  function Hh(t, e) {
    return Q_(t)[e] || (Q_(t)[e] = [])
  }

  function Wh(t, e) {
    for (var n = 0; n < t.length; n++)
      if (t[n].key === e) return t[n].value
  }

  function Gh(t, e, n) {
    return t.push({
      key: e,
      value: n
    }), n
  }

  function Xh(t) {
    var e = Q_(t).autoInterval;
    return null != e ? e : Q_(t).autoInterval = t.calculateCategoryInterval()
  }

  function qh(t) {
    var e = Uh(t),
      n = _h(t),
      i = (e.axisRotate - e.labelRotate) / 180 * Math.PI,
      r = t.scale,
      a = r.getExtent(),
      o = r.count();
    if (a[1] - a[0] < 1) return 0;
    var s = 1;
    o > 40 && (s = Math.max(1, Math.floor(o / 40)));
    for (var l = a[0], u = t.dataToCoord(l + 1) - t.dataToCoord(l), h = Math.abs(u * Math.cos(i)), c = Math.abs(u * Math.sin(i)), f = 0, d = 0; l <= a[1]; l += s) {
      var p = 0,
        g = 0,
        v = Vn(n(l), e.font, "center", "top");
      p = 1.3 * v.width, g = 1.3 * v.height, f = Math.max(f, p, 7), d = Math.max(d, g, 7)
    }
    var m = f / h,
      y = d / c;
    isNaN(m) && (m = 1 / 0), isNaN(y) && (y = 1 / 0);
    var _ = Math.max(0, Math.floor(Math.min(m, y))),
      x = Q_(t.model),
      w = x.lastAutoInterval,
      b = x.lastTickCount;
    return null != w && null != b && Math.abs(w - _) <= 1 && Math.abs(b - o) <= 1 && w > _ ? _ = w : (x.lastTickCount = o, x.lastAutoInterval = _), _
  }

  function Uh(t) {
    var e = t.getLabelModel();
    return {
      axisRotate: t.getRotate ? t.getRotate() : t.isHorizontal && !t.isHorizontal() ? 90 : 0,
      labelRotate: e.get("rotate") || 0,
      font: e.getFont()
    }
  }

  function jh(t, e, n) {
    function i(t) {
      l.push(n ? t : {
        formattedLabel: r(t),
        rawLabel: a.getLabel(t),
        tickValue: t
      })
    }
    var r = _h(t),
      a = t.scale,
      o = a.getExtent(),
      s = t.getLabelModel(),
      l = [],
      u = Math.max((e || 0) + 1, 1),
      h = o[0],
      c = a.count();
    0 !== h && u > 1 && c / u > 2 && (h = Math.round(Math.ceil(h / u) * u));
    var f = Mh(t),
      d = s.get("showMinLabel") || f,
      p = s.get("showMaxLabel") || f;
    d && h !== o[0] && i(o[0]);
    for (var g = h; g <= o[1]; g += u) i(g);
    return p && g - u !== o[1] && i(o[1]), l
  }

  function Yh(t, e, n) {
    var i = t.scale,
      r = _h(t),
      a = [];
    return d(i.getTicks(), function(t) {
      var o = i.getLabel(t);
      e(t, o) && a.push(n ? t : {
        formattedLabel: r(t),
        rawLabel: o,
        tickValue: t
      })
    }), a
  }

  function Zh(t, e) {
    var n = t[1] - t[0],
      i = e,
      r = n / i / 2;
    t[0] += r, t[1] -= r
  }

  function $h(t, e, n, i, r) {
    function a(t, e) {
      return h ? t > e : e > t
    }
    var o = e.length;
    if (t.onBand && !i && o) {
      var s, l = t.getExtent();
      if (1 === o) e[0].coord = l[0], s = e[1] = {
        coord: l[0]
      };
      else {
        var u = e[1].coord - e[0].coord;
        d(e, function(t) {
          t.coord -= u / 2;
          var e = e || 0;
          e % 2 > 0 && (t.coord -= u / (2 * (e + 1)))
        }), s = {
          coord: e[o - 1].coord + u
        }, e.push(s)
      }
      var h = l[0] > l[1];
      a(e[0].coord, l[0]) && (r ? e[0].coord = l[0] : e.shift()), r && a(l[0], e[0].coord) && e.unshift({
        coord: l[0]
      }), a(l[1], s.coord) && (r ? s.coord = l[1] : e.pop()), r && a(s.coord, l[1]) && e.push({
        coord: l[1]
      })
    }
  }

  function Kh(t, e) {
    var n = t.mapDimension("defaultedLabel", !0),
      i = n.length;
    if (1 === i) return Rs(t, e, n[0]);
    if (i) {
      for (var r = [], a = 0; a < n.length; a++) {
        var o = Rs(t, e, n[a]);
        r.push(o)
      }
      return r.join(" ")
    }
  }

  function Qh(t, e, n) {
    _d.call(this), this.updateData(t, e, n)
  }

  function Jh(t) {
    return [t[0] / 2, t[1] / 2]
  }

  function tc(t, e) {
    this.parent.drift(t, e)
  }

  function ec(t, e) {
    if (!this.incremental && !this.useHoverLayer)
      if ("emphasis" === e) {
        var n = this.__symbolOriginalScale,
          i = n[1] / n[0],
          r = {
            scale: [Math.max(1.1 * n[0], n[0] + 3), Math.max(1.1 * n[1], n[1] + 3 * i)]
          };
        this.animateTo(r, 400, "elasticOut")
      } else "normal" === e && this.animateTo({
        scale: this.__symbolOriginalScale
      }, 400, "elasticOut")
  }

  function nc(t) {
    this.group = new _d, this._symbolCtor = t || Qh
  }

  function ic(t, e, n, i) {
    return !(!e || isNaN(e[0]) || isNaN(e[1]) || i.isIgnore && i.isIgnore(n) || i.clipShape && !i.clipShape.contain(e[0], e[1]) || "none" === t.getItemVisual(n, "symbol"))
  }

  function rc(t) {
    return null == t || S(t) || (t = {
      isIgnore: t
    }), t || {}
  }

  function ac(t) {
    var e = t.hostModel;
    return {
      itemStyle: e.getModel("itemStyle").getItemStyle(["color"]),
      hoverItemStyle: e.getModel("emphasis.itemStyle").getItemStyle(),
      symbolRotate: e.get("symbolRotate"),
      symbolOffset: e.get("symbolOffset"),
      hoverAnimation: e.get("hoverAnimation"),
      labelModel: e.getModel("label"),
      hoverLabelModel: e.getModel("emphasis.label"),
      cursorStyle: e.get("cursor")
    }
  }

  function oc(t, e, n) {
    var i, r = t.getBaseAxis(),
      a = t.getOtherAxis(r),
      o = sc(a, n),
      s = r.dim,
      l = a.dim,
      u = e.mapDimension(l),
      h = e.mapDimension(s),
      c = "x" === l || "radius" === l ? 1 : 0,
      f = p(t.dimensions, function(t) {
        return e.mapDimension(t)
      }),
      d = e.getCalculationInfo("stackResultDimension");
    return (i |= Xu(e, f[0])) && (f[0] = d), (i |= Xu(e, f[1])) && (f[1] = d), {
      dataDimsForPoint: f,
      valueStart: o,
      valueAxisDim: l,
      baseAxisDim: s,
      stacked: !!i,
      valueDim: u,
      baseDim: h,
      baseDataOffset: c,
      stackedOverDimension: e.getCalculationInfo("stackedOverDimension")
    }
  }

  function sc(t, e) {
    var n = 0,
      i = t.scale.getExtent();
    return "start" === e ? n = i[0] : "end" === e ? n = i[1] : i[0] > 0 ? n = i[0] : i[1] < 0 && (n = i[1]), n
  }

  function lc(t, e, n, i) {
    var r = 0 / 0;
    t.stacked && (r = n.get(n.getCalculationInfo("stackedOverDimension"), i)), isNaN(r) && (r = t.valueStart);
    var a = t.baseDataOffset,
      o = [];
    return o[a] = n.get(t.baseDim, i), o[1 - a] = r, e.dataToPoint(o)
  }

  function uc(t, e) {
    var n = [];
    return e.diff(t).add(function(t) {
      n.push({
        cmd: "+",
        idx: t
      })
    }).update(function(t, e) {
      n.push({
        cmd: "=",
        idx: e,
        idx1: t
      })
    }).remove(function(t) {
      n.push({
        cmd: "-",
        idx: t
      })
    }).execute(), n
  }

  function hc(t) {
    return isNaN(t[0]) || isNaN(t[1])
  }

  function cc(t, e, n, i, r, a, o, s, l, u) {
    return "none" !== u && u ? fc.apply(this, arguments) : dc.apply(this, arguments)
  }

  function fc(t, e, n, i, r, a, o, s, l, u, h) {
    for (var c = 0, f = n, d = 0; i > d; d++) {
      var p = e[f];
      if (f >= r || 0 > f) break;
      if (hc(p)) {
        if (h) {
          f += a;
          continue
        }
        break
      }
      if (f === n) t[a > 0 ? "moveTo" : "lineTo"](p[0], p[1]);
      else if (l > 0) {
        var g = e[c],
          v = "y" === u ? 1 : 0,
          m = (p[v] - g[v]) * l;
        gx(mx, g), mx[v] = g[v] + m, gx(yx, p), yx[v] = p[v] - m, t.bezierCurveTo(mx[0], mx[1], yx[0], yx[1], p[0], p[1])
      } else t.lineTo(p[0], p[1]);
      c = f, f += a
    }
    return d
  }

  function dc(t, e, n, i, r, a, o, s, l, u, h) {
    for (var c = 0, f = n, d = 0; i > d; d++) {
      var p = e[f];
      if (f >= r || 0 > f) break;
      if (hc(p)) {
        if (h) {
          f += a;
          continue
        }
        break
      }
      if (f === n) t[a > 0 ? "moveTo" : "lineTo"](p[0], p[1]), gx(mx, p);
      else if (l > 0) {
        var g = f + a,
          v = e[g];
        if (h)
          for (; v && hc(e[g]);) g += a, v = e[g];
        var m = .5,
          y = e[c],
          v = e[g];
        if (!v || hc(v)) gx(yx, p);
        else {
          hc(v) && !h && (v = p), j(vx, v, y);
          var _, x;
          if ("x" === u || "y" === u) {
            var w = "x" === u ? 0 : 1;
            _ = Math.abs(p[w] - y[w]), x = Math.abs(p[w] - v[w])
          } else _ = Mf(p, y), x = Mf(p, v);
          m = x / (x + _), px(yx, p, vx, -l * (1 - m))
        }
        fx(mx, mx, s), dx(mx, mx, o), fx(yx, yx, s), dx(yx, yx, o), t.bezierCurveTo(mx[0], mx[1], yx[0], yx[1], p[0], p[1]), px(mx, p, vx, l * m)
      } else t.lineTo(p[0], p[1]);
      c = f, f += a
    }
    return d
  }

  function pc(t, e) {
    var n = [1 / 0, 1 / 0],
      i = [-1 / 0, -1 / 0];
    if (e)
      for (var r = 0; r < t.length; r++) {
        var a = t[r];
        a[0] < n[0] && (n[0] = a[0]), a[1] < n[1] && (n[1] = a[1]), a[0] > i[0] && (i[0] = a[0]), a[1] > i[1] && (i[1] = a[1])
      }
    return {
      min: e ? n : i,
      max: e ? i : n
    }
  }

  function gc(t, e, n) {
    var i = t.getArea(),
      r = t.getBaseAxis().isHorizontal(),
      a = i.x,
      o = i.y,
      s = i.width,
      l = i.height,
      u = n.get("lineStyle.width") || 2;
    a -= u / 2, o -= u / 2, s += u, l += u;
    var h = new qg({
      shape: {
        x: a,
        y: o,
        width: s,
        height: l
      }
    });
    return e && (h.shape[r ? "width" : "height"] = 0, Va(h, {
      shape: {
        width: s,
        height: l
      }
    }, n)), h
  }

  function vc(t, e, n) {
    var i = t.getArea(),
      r = new zg({
        shape: {
          cx: so(t.cx, 1),
          cy: so(t.cy, 1),
          r0: so(i.r0, 1),
          r: so(i.r, 1),
          startAngle: i.startAngle,
          endAngle: i.endAngle,
          clockwise: i.clockwise
        }
      });
    return e && (r.shape.endAngle = i.startAngle, Va(r, {
      shape: {
        endAngle: i.endAngle
      }
    }, n)), r
  }

  function mc(t, e) {
    if (t.length === e.length) {
      for (var n = 0; n < t.length; n++) {
        var i = t[n],
          r = e[n];
        if (i[0] !== r[0] || i[1] !== r[1]) return
      }
      return !0
    }
  }

  function yc(t) {
    return "number" == typeof t ? t : t ? .5 : 0
  }

  function _c(t, e, n) {
    if (!n.valueDim) return [];
    for (var i = [], r = 0, a = e.count(); a > r; r++) i.push(lc(n, t, e, r));
    return i
  }

  function xc(t, e, n) {
    for (var i = e.getBaseAxis(), r = "x" === i.dim || "radius" === i.dim ? 0 : 1, a = [], o = 0; o < t.length - 1; o++) {
      var s = t[o + 1],
        l = t[o];
      a.push(l);
      var u = [];
      switch (n) {
        case "end":
          u[r] = s[r], u[1 - r] = l[1 - r], a.push(u);
          break;
        case "middle":
          var h = (l[r] + s[r]) / 2,
            c = [];
          u[r] = c[r] = h, u[1 - r] = l[1 - r], c[1 - r] = s[1 - r], a.push(u), a.push(c);
          break;
        default:
          u[r] = l[r], u[1 - r] = s[1 - r], a.push(u)
      }
    }
    return t[o] && a.push(t[o]), a
  }

  function wc(t, e) {
    var n = t.getVisual("visualMeta");
    if (n && n.length && t.count() && "cartesian2d" === e.type) {
      for (var i, r, a = n.length - 1; a >= 0; a--) {
        var o = n[a].dimension,
          s = t.dimensions[o],
          l = t.getDimensionInfo(s);
        if (i = l && l.coordDim, "x" === i || "y" === i) {
          r = n[a];
          break
        }
      }
      if (r) {
        var u = e.getAxis(i),
          h = p(r.stops, function(t) {
            return {
              coord: u.toGlobalCoord(u.dataToCoord(t.value)),
              color: t.color
            }
          }),
          c = h.length,
          f = r.outerColors.slice();
        c && h[0].coord > h[c - 1].coord && (h.reverse(), f.reverse());
        var g = 10,
          v = h[0].coord - g,
          m = h[c - 1].coord + g,
          y = m - v;
        if (.001 > y) return "transparent";
        d(h, function(t) {
          t.offset = (t.coord - v) / y
        }), h.push({
          offset: c ? h[c - 1].offset : .5,
          color: f[1] || "transparent"
        }), h.unshift({
          offset: c ? h[0].offset : .5,
          color: f[0] || "transparent"
        });
        var _ = new Jg(0, 0, 0, 0, h, !0);
        return _[i] = v, _[i + "2"] = m, _
      }
    }
  }

  function bc(t, e, n) {
    var i = t.get("showAllSymbol"),
      r = "auto" === i;
    if (!i || r) {
      var a = n.getAxesByScale("ordinal")[0];
      if (a && (!r || !Sc(a, e))) {
        var o = e.mapDimension(a.dim),
          s = {};
        return d(a.getViewLabels(), function(t) {
            s[t.tickValue] = 1
          }),
          function(t) {
            return !s.hasOwnProperty(e.get(o, t))
          }
      }
    }
  }

  function Sc(t, e) {
    var n = t.getExtent(),
      i = Math.abs(n[1] - n[0]) / t.scale.count();
    isNaN(i) && (i = 0);
    for (var r = e.count(), a = Math.max(1, Math.round(r / 5)), o = 0; r > o; o += a)
      if (1.5 * Qh.getSymbolSize(e, o)[t.isHorizontal() ? 1 : 0] > i) return !1;
    return !0
  }

  function Mc(t, e, n) {
    if ("cartesian2d" === t.type) {
      var i = t.getBaseAxis().isHorizontal(),
        r = gc(t, e, n);
      if (!n.get("clip", !0)) {
        var a = r.shape,
          o = Math.max(a.width, a.height);
        i ? (a.y -= o, a.height += 2 * o) : (a.x -= o, a.width += 2 * o)
      }
      return r
    }
    return vc(t, e, n)
  }

  function Tc(t) {
    return this._axes[t]
  }

  function Cc(t) {
    Ix.call(this, t)
  }

  function Ic(t, e) {
    return e.type || (e.data ? "category" : "value")
  }

  function kc(t, e) {
    return t.getCoordSysModel() === e
  }

  function Ac(t, e, n) {
    this._coordsMap = {}, this._coordsList = [], this._axesMap = {}, this._axesList = [], this._initCartesian(t, e, n), this.model = t
  }

  function Dc(t, e, n, i) {
    function r(t) {
      return t.dim + "_" + t.index
    }
    n.getAxesOnZeroOf = function() {
      return a ? [a] : []
    };
    var a, o = t[e],
      s = n.model,
      l = s.get("axisLine.onZero"),
      u = s.get("axisLine.onZeroAxisIndex");
    if (l) {
      if (null != u) Pc(o[u]) && (a = o[u]);
      else
        for (var h in o)
          if (o.hasOwnProperty(h) && Pc(o[h]) && !i[r(o[h])]) {
            a = o[h];
            break
          }
      a && (i[r(a)] = !0)
    }
  }

  function Pc(t) {
    return t && "category" !== t.type && "time" !== t.type && yh(t)
  }

  function Lc(t, e) {
    var n = t.getExtent(),
      i = n[0] + n[1];
    t.toGlobalCoord = "x" === t.dim ? function(t) {
      return t + e
    } : function(t) {
      return i - t + e
    }, t.toLocalCoord = "x" === t.dim ? function(t) {
      return t - e
    } : function(t) {
      return i - t + e
    }
  }

  function Oc(t) {
    return p(Rx, function(e) {
      var n = t.getReferringComponents(e)[0];
      return n
    })
  }

  function Ec(t) {
    return "cartesian2d" === t.get("coordinateSystem")
  }

  function Bc(t, e, n, i) {
    var r, a, o = po(n - t.rotation),
      s = i[0] > i[1],
      l = "start" === e && !s || "start" !== e && s;
    return go(o - zx / 2) ? (a = l ? "bottom" : "top", r = "center") : go(o - 1.5 * zx) ? (a = l ? "top" : "bottom", r = "center") : (a = "middle", r = 1.5 * zx > o && o > zx / 2 ? l ? "left" : "right" : l ? "right" : "left"), {
      rotation: o,
      textAlign: r,
      textVerticalAlign: a
    }
  }

  function Rc(t, e, n) {
    if (!Mh(t.axis)) {
      var i = t.get("axisLabel.showMinLabel"),
        r = t.get("axisLabel.showMaxLabel");
      e = e || [], n = n || [];
      var a = e[0],
        o = e[1],
        s = e[e.length - 1],
        l = e[e.length - 2],
        u = n[0],
        h = n[1],
        c = n[n.length - 1],
        f = n[n.length - 2];
      i === !1 ? (zc(a), zc(u)) : Nc(a, o) && (i ? (zc(o), zc(h)) : (zc(a), zc(u))), r === !1 ? (zc(s), zc(c)) : Nc(l, s) && (r ? (zc(l), zc(f)) : (zc(s), zc(c)))
    }
  }

  function zc(t) {
    t && (t.ignore = !0)
  }

  function Nc(t, e) {
    var n = t && t.getBoundingRect().clone(),
      i = e && e.getBoundingRect().clone();
    if (n && i) {
      var r = ke([]);
      return Le(r, r, -t.rotation), n.applyTransform(De([], r, t.getLocalTransform())), i.applyTransform(De([], r, e.getLocalTransform())), n.intersect(i)
    }
  }

  function Fc(t) {
    return "middle" === t || "center" === t
  }

  function Vc(t, e, n) {
    var i = e.axis;
    if (e.get("axisTick.show") && !i.scale.isBlank()) {
      for (var r = e.getModel("axisTick"), a = r.getModel("lineStyle"), o = r.get("length"), l = i.getTicksCoords(), u = [], h = [], c = t._transform, f = [], d = 0; d < l.length; d++) {
        var p = l[d].coord;
        u[0] = p, u[1] = 0, h[0] = p, h[1] = n.tickDirection * o, c && (ae(u, u, c), ae(h, h, c));
        var g = new jg({
          anid: "tick_" + l[d].tickValue,
          subPixelOptimize: !0,
          shape: {
            x1: u[0],
            y1: u[1],
            x2: h[0],
            y2: h[1]
          },
          style: s(a.getLineStyle(), {
            stroke: e.get("axisLine.lineStyle.color")
          }),
          z2: 2,
          silent: !0
        });
        t.group.add(g), f.push(g)
      }
      return f
    }
  }

  function Hc(t, e, n) {
    var i = e.axis,
      r = k(n.axisLabelShow, e.get("axisLabel.show"));
    if (r && !i.scale.isBlank()) {
      var a = e.getModel("axisLabel"),
        o = a.get("margin"),
        s = i.getViewLabels(),
        l = (k(n.labelRotate, a.get("rotate")) || 0) * zx / 180,
        u = Hx(n.rotation, l, n.labelDirection),
        h = e.getCategories && e.getCategories(!0),
        c = [],
        f = Wx(e),
        p = e.get("triggerEvent");
      return d(s, function(r, s) {
        var l = r.tickValue,
          d = r.formattedLabel,
          g = r.rawLabel,
          v = a;
        h && h[l] && h[l].textStyle && (v = new Qa(h[l].textStyle, a, e.ecModel));
        var m = v.getTextColor() || e.get("axisLine.lineStyle.color"),
          y = i.dataToCoord(l),
          _ = [y, n.labelOffset + n.labelDirection * o],
          x = new Og({
            anid: "label_" + l,
            position: _,
            rotation: u.rotation,
            silent: f,
            z2: 10
          });
        Aa(x.style, v, {
          text: d,
          textAlign: v.getShallow("align", !0) || u.textAlign,
          textVerticalAlign: v.getShallow("verticalAlign", !0) || v.getShallow("baseline", !0) || u.textVerticalAlign,
          textFill: "function" == typeof m ? m("category" === i.type ? g : "value" === i.type ? l + "" : l, s) : m
        }), p && (x.eventData = Vx(e), x.eventData.targetType = "axisLabel", x.eventData.value = g), t._dumbGroup.add(x), x.updateTransform(), c.push(x), t.group.add(x), x.decomposeTransform()
      }), c
    }
  }

  function Wc(t) {
    var e = Gc(t);
    if (e) {
      var n = e.axisPointerModel,
        i = e.axis.scale,
        r = n.option,
        a = n.get("status"),
        o = n.get("value");
      null != o && (o = i.parse(o));
      var s = qc(n);
      null == a && (r.status = s ? "show" : "hide");
      var l = i.getExtent().slice();
      l[0] > l[1] && l.reverse(), (null == o || o > l[1]) && (o = l[1]), o < l[0] && (o = l[0]), r.value = o, s && (r.status = e.axis.scale.isBlank() ? "hide" : "show")
    }
  }

  function Gc(t) {
    var e = (t.ecModel.getComponent("axisPointer") || {}).coordSysAxesInfo;
    return e && e.axesInfo[Uc(t)]
  }

  function Xc(t) {
    var e = Gc(t);
    return e && e.axisPointerModel
  }

  function qc(t) {
    return !!t.get("handle.show")
  }

  function Uc(t) {
    return t.type + "||" + t.id
  }

  function jc(t, e, n, i, r, a) {
    var o = Gx.getAxisPointerClass(t.axisPointerClass);
    if (o) {
      var s = Xc(e);
      s ? (t._axisPointer || (t._axisPointer = new o)).render(e, s, i, a) : Yc(t, i)
    }
  }

  function Yc(t, e, n) {
    var i = t._axisPointer;
    i && i.dispose(e, n), t._axisPointer = null
  }

  function Zc(t, e, n) {
    n = n || {};
    var i = t.coordinateSystem,
      r = e.axis,
      a = {},
      o = r.getAxesOnZeroOf()[0],
      s = r.position,
      l = o ? "onZero" : s,
      u = r.dim,
      h = i.getRect(),
      c = [h.x, h.x + h.width, h.y, h.y + h.height],
      f = {
        left: 0,
        right: 1,
        top: 0,
        bottom: 1,
        onZero: 2
      },
      d = e.get("offset") || 0,
      p = "x" === u ? [c[2] - d, c[3] + d] : [c[0] - d, c[1] + d];
    if (o) {
      var g = o.toGlobalCoord(o.dataToCoord(0));
      p[f.onZero] = Math.max(Math.min(g, p[1]), p[0])
    }
    a.position = ["y" === u ? p[f[l]] : c[0], "x" === u ? p[f[l]] : c[3]], a.rotation = Math.PI / 2 * ("x" === u ? 0 : 1);
    var v = {
      top: -1,
      bottom: 1,
      left: -1,
      right: 1
    };
    a.labelDirection = a.tickDirection = a.nameDirection = v[s], a.labelOffset = o ? p[f[s]] - p[f.onZero] : 0, e.get("axisTick.inside") && (a.tickDirection = -a.tickDirection), k(n.labelInside, e.get("axisLabel.inside")) && (a.labelDirection = -a.labelDirection);
    var m = e.get("axisLabel.rotate");
    return a.labelRotate = "top" === l ? -m : m, a.z2 = 1, a
  }

  function $c(t, e, n, i) {
    var r = e.getData(),
      a = this.dataIndex,
      o = r.getName(a),
      s = e.get("selectedOffset");
    i.dispatchAction({
      type: "pieToggleSelect",
      from: t,
      name: o,
      seriesId: e.id
    }), r.each(function(t) {
      Kc(r.getItemGraphicEl(t), r.getItemLayout(t), e.isSelected(r.getName(t)), s, n)
    })
  }

  function Kc(t, e, n, i, r) {
    var a = (e.startAngle + e.endAngle) / 2,
      o = Math.cos(a),
      s = Math.sin(a),
      l = n ? i : 0,
      u = [o * l, s * l];
    r ? t.animate().when(200, {
      position: u
    }).start("bounceOut") : t.attr("position", u)
  }

  function Qc(t, e) {
    _d.call(this);
    var n = new zg({
        z2: 2
      }),
      i = new Wg,
      r = new Og;
    this.add(n), this.add(i), this.add(r), this.updateData(t, e, !0)
  }

  function Jc(t, e, n, i, r, a, o) {
    function s(e, n, i) {
      for (var r = e; n > r; r++)
        if (t[r].y += i, r > e && n > r + 1 && t[r + 1].y > t[r].y + t[r].height) return void l(r, i / 2);
      l(n - 1, i / 2)
    }

    function l(e, n) {
      for (var i = e; i >= 0 && (t[i].y -= n, !(i > 0 && t[i].y > t[i - 1].y + t[i - 1].height)); i--);
    }

    function u(t, e, n, i, r, a) {
      for (var o = a > 0 ? e ? Number.MAX_VALUE : 0 : e ? Number.MAX_VALUE : 0, s = 0, l = t.length; l > s; s++) {
        var u = Math.abs(t[s].y - i),
          h = t[s].len,
          c = t[s].len2,
          f = r + h > u ? Math.sqrt((r + h + c) * (r + h + c) - u * u) : Math.abs(t[s].x - n);
        e && f >= o && (f = o - 10), !e && o >= f && (f = o + 10), t[s].x = n + f * a, o = f
      }
    }
    t.sort(function(t, e) {
      return t.y - e.y
    });
    for (var h, c = 0, f = t.length, d = [], p = [], g = 0; f > g; g++) h = t[g].y - c, 0 > h && s(g, f, -h, r), c = t[g].y + t[g].height;
    0 > o - c && l(f - 1, c - o);
    for (var g = 0; f > g; g++) t[g].y >= n ? p.push(t[g]) : d.push(t[g]);
    u(d, !1, e, n, i, r), u(p, !0, e, n, i, r)
  }

  function tf(t, e, n, i, r, a) {
    for (var o = [], s = [], l = 0; l < t.length; l++) ef(t[l]) || (t[l].x < e ? o.push(t[l]) : s.push(t[l]));
    Jc(s, e, n, i, 1, r, a), Jc(o, e, n, i, -1, r, a);
    for (var l = 0; l < t.length; l++)
      if (!ef(t[l])) {
        var u = t[l].linePoints;
        if (u) {
          var h = u[1][0] - u[2][0];
          u[2][0] = t[l].x < e ? t[l].x + 3 : t[l].x - 3, u[1][1] = u[2][1] = t[l].y, u[1][0] = u[2][0] + h
        }
      }
  }

  function ef(t) {
    return "center" === t.position
  }
  var nf = 2311,
    rf = function() {
      return nf++
    },
    af = {};
  af = "object" == typeof wx && "function" == typeof wx.getSystemInfoSync ? {
    browser: {},
    os: {},
    node: !1,
    wxa: !0,
    canvasSupported: !0,
    svgSupported: !1,
    touchEventsSupported: !0,
    domSupported: !1
  } : "undefined" == typeof document && "undefined" != typeof self ? {
    browser: {},
    os: {},
    node: !1,
    worker: !0,
    canvasSupported: !0,
    domSupported: !1
  } : "undefined" == typeof navigator ? {
    browser: {},
    os: {},
    node: !0,
    worker: !1,
    canvasSupported: !0,
    svgSupported: !0,
    domSupported: !1
  } : e(navigator.userAgent);
  var of = af, sf = {
    "[object Function]": 1,
    "[object RegExp]": 1,
    "[object Date]": 1,
    "[object Error]": 1,
    "[object CanvasGradient]": 1,
    "[object CanvasPattern]": 1,
    "[object Image]": 1,
    "[object Canvas]": 1
  }, lf = {
    "[object Int8Array]": 1,
    "[object Uint8Array]": 1,
    "[object Uint8ClampedArray]": 1,
    "[object Int16Array]": 1,
    "[object Uint16Array]": 1,
    "[object Int32Array]": 1,
    "[object Uint32Array]": 1,
    "[object Float32Array]": 1,
    "[object Float64Array]": 1
  }, uf = Object.prototype.toString, hf = Array.prototype, cf = hf.forEach, ff = hf.filter, df = hf.slice, pf = hf.map, gf = hf.reduce, vf = {}, mf = function() {
    return vf.createCanvas()
  };
  vf.createCanvas = function() {
    return document.createElement("canvas")
  };
  var yf, _f = "__ec_primitive__";
  z.prototype = {
    constructor: z,
    get: function(t) {
      return this.data.hasOwnProperty(t) ? this.data[t] : null
    },
    set: function(t, e) {
      return this.data[t] = e
    },
    each: function(t, e) {
      void 0 !== e && (t = y(t, e));
      for (var n in this.data) this.data.hasOwnProperty(n) && t(this.data[n], n)
    },
    removeKey: function(t) {
      delete this.data[t]
    }
  };
  var xf = (Object.freeze || Object)({
      $override: n,
      clone: i,
      merge: r,
      mergeAll: a,
      extend: o,
      defaults: s,
      createCanvas: mf,
      getContext: l,
      indexOf: u,
      inherits: h,
      mixin: c,
      isArrayLike: f,
      each: d,
      map: p,
      reduce: g,
      filter: v,
      find: m,
      bind: y,
      curry: _,
      isArray: x,
      isFunction: w,
      isString: b,
      isObject: S,
      isBuiltInObject: M,
      isTypedArray: T,
      isDom: C,
      eqNaN: I,
      retrieve: k,
      retrieve2: A,
      retrieve3: D,
      slice: P,
      normalizeCssArray: L,
      assert: O,
      trim: E,
      setAsPrimitive: B,
      isPrimitive: R,
      createHashMap: N,
      concatArray: F,
      noop: V
    }),
    wf = "undefined" == typeof Float32Array ? Array : Float32Array,
    bf = Y,
    Sf = Z,
    Mf = ee,
    Tf = ne,
    Cf = (Object.freeze || Object)({
      create: H,
      copy: W,
      clone: G,
      set: X,
      add: q,
      scaleAndAdd: U,
      sub: j,
      len: Y,
      length: bf,
      lenSquare: Z,
      lengthSquare: Sf,
      mul: $,
      div: K,
      dot: Q,
      scale: J,
      normalize: te,
      distance: ee,
      dist: Mf,
      distanceSquare: ne,
      distSquare: Tf,
      negate: ie,
      lerp: re,
      applyTransform: ae,
      min: oe,
      max: se
    });
  le.prototype = {
    constructor: le,
    _dragStart: function(t) {
      var e = t.target;
      e && e.draggable && (this._draggingTarget = e, e.dragging = !0, this._x = t.offsetX, this._y = t.offsetY, this.dispatchToElement(ue(e, t), "dragstart", t.event))
    },
    _drag: function(t) {
      var e = this._draggingTarget;
      if (e) {
        var n = t.offsetX,
          i = t.offsetY,
          r = n - this._x,
          a = i - this._y;
        this._x = n, this._y = i, e.drift(r, a, t), this.dispatchToElement(ue(e, t), "drag", t.event);
        var o = this.findHover(n, i, e).target,
          s = this._dropTarget;
        this._dropTarget = o, e !== o && (s && o !== s && this.dispatchToElement(ue(s, t), "dragleave", t.event), o && o !== s && this.dispatchToElement(ue(o, t), "dragenter", t.event))
      }
    },
    _dragEnd: function(t) {
      var e = this._draggingTarget;
      e && (e.dragging = !1), this.dispatchToElement(ue(e, t), "dragend", t.event), this._dropTarget && this.dispatchToElement(ue(this._dropTarget, t), "drop", t.event), this._draggingTarget = null, this._dropTarget = null
    }
  };
  var If = Array.prototype.slice,
    kf = function(t) {
      this._$handlers = {}, this._$eventProcessor = t
    };
  kf.prototype = {
    constructor: kf,
    one: function(t, e, n, i) {
      return ce(this, t, e, n, i, !0)
    },
    on: function(t, e, n, i) {
      return ce(this, t, e, n, i, !1)
    },
    isSilent: function(t) {
      var e = this._$handlers;
      return !e[t] || !e[t].length
    },
    off: function(t, e) {
      var n = this._$handlers;
      if (!t) return this._$handlers = {}, this;
      if (e) {
        if (n[t]) {
          for (var i = [], r = 0, a = n[t].length; a > r; r++) n[t][r].h !== e && i.push(n[t][r]);
          n[t] = i
        }
        n[t] && 0 === n[t].length && delete n[t]
      } else delete n[t];
      return this
    },
    trigger: function(t) {
      var e = this._$handlers[t],
        n = this._$eventProcessor;
      if (e) {
        var i = arguments,
          r = i.length;
        r > 3 && (i = If.call(i, 1));
        for (var a = e.length, o = 0; a > o;) {
          var s = e[o];
          if (n && n.filter && null != s.query && !n.filter(t, s.query)) o++;
          else {
            switch (r) {
              case 1:
                s.h.call(s.ctx);
                break;
              case 2:
                s.h.call(s.ctx, i[1]);
                break;
              case 3:
                s.h.call(s.ctx, i[1], i[2]);
                break;
              default:
                s.h.apply(s.ctx, i)
            }
            s.one ? (e.splice(o, 1), a--) : o++
          }
        }
      }
      return n && n.afterTrigger && n.afterTrigger(t), this
    },
    triggerWithContext: function(t) {
      var e = this._$handlers[t],
        n = this._$eventProcessor;
      if (e) {
        var i = arguments,
          r = i.length;
        r > 4 && (i = If.call(i, 1, i.length - 1));
        for (var a = i[i.length - 1], o = e.length, s = 0; o > s;) {
          var l = e[s];
          if (n && n.filter && null != l.query && !n.filter(t, l.query)) s++;
          else {
            switch (r) {
              case 1:
                l.h.call(a);
                break;
              case 2:
                l.h.call(a, i[1]);
                break;
              case 3:
                l.h.call(a, i[1], i[2]);
                break;
              default:
                l.h.apply(a, i)
            }
            l.one ? (e.splice(s, 1), o--) : s++
          }
        }
      }
      return n && n.afterTrigger && n.afterTrigger(t), this
    }
  };
  var Af = Math.log(2),
    Df = "undefined" != typeof window && !!window.addEventListener,
    Pf = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
    Lf = "___zrEVENTSAVED",
    Of = [],
    Ef = Df ? function(t) {
      t.preventDefault(), t.stopPropagation(), t.cancelBubble = !0
    } : function(t) {
      t.returnValue = !1, t.cancelBubble = !0
    },
    Bf = function() {
      this._track = []
    };
  Bf.prototype = {
    constructor: Bf,
    recognize: function(t, e, n) {
      return this._doTrack(t, e, n), this._recognize(t)
    },
    clear: function() {
      return this._track.length = 0, this
    },
    _doTrack: function(t, e, n) {
      var i = t.touches;
      if (i) {
        for (var r = {
            points: [],
            touches: [],
            target: e,
            event: t
          }, a = 0, o = i.length; o > a; a++) {
          var s = i[a],
            l = pe(n, s, {});
          r.points.push([l.zrX, l.zrY]), r.touches.push(s)
        }
        this._track.push(r)
      }
    },
    _recognize: function(t) {
      for (var e in Rf)
        if (Rf.hasOwnProperty(e)) {
          var n = Rf[e](this._track, t);
          if (n) return n
        }
    }
  };
  var Rf = {
      pinch: function(t, e) {
        var n = t.length;
        if (n) {
          var i = (t[n - 1] || {}).points,
            r = (t[n - 2] || {}).points || i;
          if (r && r.length > 1 && i && i.length > 1) {
            var a = we(i) / we(r);
            !isFinite(a) && (a = 1), e.pinchScale = a;
            var o = be(i);
            return e.pinchX = o[0], e.pinchY = o[1], {
              type: "pinch",
              target: t[0].target,
              event: e
            }
          }
        }
      }
    },
    zf = "silent";
  Te.prototype.dispose = function() {};
  var Nf = ["click", "dblclick", "mousewheel", "mouseout", "mouseup", "mousedown", "mousemove", "contextmenu"],
    Ff = function(t, e, n, i) {
      kf.call(this), this.storage = t, this.painter = e, this.painterRoot = i, n = n || new Te, this.proxy = null, this._hovered = {}, this._lastTouchMoment, this._lastX, this._lastY, this._gestureMgr, le.call(this), this.setHandlerProxy(n)
    };
  Ff.prototype = {
    constructor: Ff,
    setHandlerProxy: function(t) {
      this.proxy && this.proxy.dispose(), t && (d(Nf, function(e) {
        t.on && t.on(e, this[e], this)
      }, this), t.handler = this), this.proxy = t
    },
    mousemove: function(t) {
      var e = t.zrX,
        n = t.zrY,
        i = this._hovered,
        r = i.target;
      r && !r.__zr && (i = this.findHover(i.x, i.y), r = i.target);
      var a = this._hovered = this.findHover(e, n),
        o = a.target,
        s = this.proxy;
      s.setCursor && s.setCursor(o ? o.cursor : "default"), r && o !== r && this.dispatchToElement(i, "mouseout", t), this.dispatchToElement(a, "mousemove", t), o && o !== r && this.dispatchToElement(a, "mouseover", t)
    },
    mouseout: function(t) {
      this.dispatchToElement(this._hovered, "mouseout", t);
      var e, n = t.toElement || t.relatedTarget;
      do n = n && n.parentNode; while (n && 9 !== n.nodeType && !(e = n === this.painterRoot));
      !e && this.trigger("globalout", {
        event: t
      })
    },
    resize: function() {
      this._hovered = {}
    },
    dispatch: function(t, e) {
      var n = this[t];
      n && n.call(this, e)
    },
    dispose: function() {
      this.proxy.dispose(), this.storage = this.proxy = this.painter = null
    },
    setCursorStyle: function(t) {
      var e = this.proxy;
      e.setCursor && e.setCursor(t)
    },
    dispatchToElement: function(t, e, n) {
      t = t || {};
      var i = t.target;
      if (!i || !i.silent) {
        for (var r = "on" + e, a = Se(e, t, n); i && (i[r] && (a.cancelBubble = i[r].call(i, a)), i.trigger(e, a), i = i.parent, !a.cancelBubble););
        a.cancelBubble || (this.trigger(e, a), this.painter && this.painter.eachOtherLayer(function(t) {
          "function" == typeof t[r] && t[r].call(t, a), t.trigger && t.trigger(e, a)
        }))
      }
    },
    findHover: function(t, e, n) {
      for (var i = this.storage.getDisplayList(), r = {
          x: t,
          y: e
        }, a = i.length - 1; a >= 0; a--) {
        var o;
        if (i[a] !== n && !i[a].ignore && (o = Ce(i[a], t, e)) && (!r.topTarget && (r.topTarget = i[a]), o !== zf)) {
          r.target = i[a];
          break
        }
      }
      return r
    },
    processGesture: function(t, e) {
      this._gestureMgr || (this._gestureMgr = new Bf);
      var n = this._gestureMgr;
      "start" === e && n.clear();
      var i = n.recognize(t, this.findHover(t.zrX, t.zrY, null).target, this.proxy.dom);
      if ("end" === e && n.clear(), i) {
        var r = i.type;
        t.gestureEvent = r, this.dispatchToElement({
          target: i.target
        }, r, i.event)
      }
    }
  }, d(["click", "mousedown", "mouseup", "mousewheel", "dblclick", "contextmenu"], function(t) {
    Ff.prototype[t] = function(e) {
      var n = this.findHover(e.zrX, e.zrY),
        i = n.target;
      if ("mousedown" === t) this._downEl = i, this._downPoint = [e.zrX, e.zrY], this._upEl = i;
      else if ("mouseup" === t) this._upEl = i;
      else if ("click" === t) {
        if (this._downEl !== this._upEl || !this._downPoint || Mf(this._downPoint, [e.zrX, e.zrY]) > 4) return;
        this._downPoint = null
      }
      this.dispatchToElement(n, t, e)
    }
  }), c(Ff, kf), c(Ff, le);
  var Vf = "undefined" == typeof Float32Array ? Array : Float32Array,
    Hf = (Object.freeze || Object)({
      create: Ie,
      identity: ke,
      copy: Ae,
      mul: De,
      translate: Pe,
      rotate: Le,
      scale: Oe,
      invert: Ee,
      clone: Be
    }),
    Wf = ke,
    Gf = 5e-5,
    Xf = function(t) {
      t = t || {}, t.position || (this.position = [0, 0]), null == t.rotation && (this.rotation = 0), t.scale || (this.scale = [1, 1]), this.origin = this.origin || null
    },
    qf = Xf.prototype;
  qf.transform = null, qf.needLocalTransform = function() {
    return Re(this.rotation) || Re(this.position[0]) || Re(this.position[1]) || Re(this.scale[0] - 1) || Re(this.scale[1] - 1)
  };
  var Uf = [];
  qf.updateTransform = function() {
    var t = this.parent,
      e = t && t.transform,
      n = this.needLocalTransform(),
      i = this.transform;
    if (!n && !e) return void(i && Wf(i));
    i = i || Ie(), n ? this.getLocalTransform(i) : Wf(i), e && (n ? De(i, t.transform, i) : Ae(i, t.transform)), this.transform = i;
    var r = this.globalScaleRatio;
    if (null != r && 1 !== r) {
      this.getGlobalScale(Uf);
      var a = Uf[0] < 0 ? -1 : 1,
        o = Uf[1] < 0 ? -1 : 1,
        s = ((Uf[0] - a) * r + a) / Uf[0] || 0,
        l = ((Uf[1] - o) * r + o) / Uf[1] || 0;
      i[0] *= s, i[1] *= s, i[2] *= l, i[3] *= l
    }
    this.invTransform = this.invTransform || Ie(), Ee(this.invTransform, i)
  }, qf.getLocalTransform = function(t) {
    return Xf.getLocalTransform(this, t)
  }, qf.setTransform = function(t) {
    var e = this.transform,
      n = t.dpr || 1;
    e ? t.setTransform(n * e[0], n * e[1], n * e[2], n * e[3], n * e[4], n * e[5]) : t.setTransform(n, 0, 0, n, 0, 0)
  }, qf.restoreTransform = function(t) {
    var e = t.dpr || 1;
    t.setTransform(e, 0, 0, e, 0, 0)
  };
  var jf = [],
    Yf = Ie();
  qf.setLocalTransform = function(t) {
    if (t) {
      var e = t[0] * t[0] + t[1] * t[1],
        n = t[2] * t[2] + t[3] * t[3],
        i = this.position,
        r = this.scale;
      Re(e - 1) && (e = Math.sqrt(e)), Re(n - 1) && (n = Math.sqrt(n)), t[0] < 0 && (e = -e), t[3] < 0 && (n = -n), i[0] = t[4], i[1] = t[5], r[0] = e, r[1] = n, this.rotation = Math.atan2(-t[1] / n, t[0] / e)
    }
  }, qf.decomposeTransform = function() {
    if (this.transform) {
      var t = this.parent,
        e = this.transform;
      t && t.transform && (De(jf, t.invTransform, e), e = jf);
      var n = this.origin;
      n && (n[0] || n[1]) && (Yf[4] = n[0], Yf[5] = n[1], De(jf, e, Yf), jf[4] -= n[0], jf[5] -= n[1], e = jf), this.setLocalTransform(e)
    }
  }, qf.getGlobalScale = function(t) {
    var e = this.transform;
    return t = t || [], e ? (t[0] = Math.sqrt(e[0] * e[0] + e[1] * e[1]), t[1] = Math.sqrt(e[2] * e[2] + e[3] * e[3]), e[0] < 0 && (t[0] = -t[0]), e[3] < 0 && (t[1] = -t[1]), t) : (t[0] = 1, t[1] = 1, t)
  }, qf.transformCoordToLocal = function(t, e) {
    var n = [t, e],
      i = this.invTransform;
    return i && ae(n, n, i), n
  }, qf.transformCoordToGlobal = function(t, e) {
    var n = [t, e],
      i = this.transform;
    return i && ae(n, n, i), n
  }, Xf.getLocalTransform = function(t, e) {
    e = e || [], Wf(e);
    var n = t.origin,
      i = t.scale || [1, 1],
      r = t.rotation || 0,
      a = t.position || [0, 0];
    return n && (e[4] -= n[0], e[5] -= n[1]), Oe(e, e, i), r && Le(e, e, r), n && (e[4] += n[0], e[5] += n[1]), e[4] += a[0], e[5] += a[1], e
  };
  var Zf = {
    linear: function(t) {
      return t
    },
    quadraticIn: function(t) {
      return t * t
    },
    quadraticOut: function(t) {
      return t * (2 - t)
    },
    quadraticInOut: function(t) {
      return (t *= 2) < 1 ? .5 * t * t : -.5 * (--t * (t - 2) - 1)
    },
    cubicIn: function(t) {
      return t * t * t
    },
    cubicOut: function(t) {
      return --t * t * t + 1
    },
    cubicInOut: function(t) {
      return (t *= 2) < 1 ? .5 * t * t * t : .5 * ((t -= 2) * t * t + 2)
    },
    quarticIn: function(t) {
      return t * t * t * t
    },
    quarticOut: function(t) {
      return 1 - --t * t * t * t
    },
    quarticInOut: function(t) {
      return (t *= 2) < 1 ? .5 * t * t * t * t : -.5 * ((t -= 2) * t * t * t - 2)
    },
    quinticIn: function(t) {
      return t * t * t * t * t
    },
    quinticOut: function(t) {
      return --t * t * t * t * t + 1
    },
    quinticInOut: function(t) {
      return (t *= 2) < 1 ? .5 * t * t * t * t * t : .5 * ((t -= 2) * t * t * t * t + 2)
    },
    sinusoidalIn: function(t) {
      return 1 - Math.cos(t * Math.PI / 2)
    },
    sinusoidalOut: function(t) {
      return Math.sin(t * Math.PI / 2)
    },
    sinusoidalInOut: function(t) {
      return .5 * (1 - Math.cos(Math.PI * t))
    },
    exponentialIn: function(t) {
      return 0 === t ? 0 : Math.pow(1024, t - 1)
    },
    exponentialOut: function(t) {
      return 1 === t ? 1 : 1 - Math.pow(2, -10 * t)
    },
    exponentialInOut: function(t) {
      return 0 === t ? 0 : 1 === t ? 1 : (t *= 2) < 1 ? .5 * Math.pow(1024, t - 1) : .5 * (-Math.pow(2, -10 * (t - 1)) + 2)
    },
    circularIn: function(t) {
      return 1 - Math.sqrt(1 - t * t)
    },
    circularOut: function(t) {
      return Math.sqrt(1 - --t * t)
    },
    circularInOut: function(t) {
      return (t *= 2) < 1 ? -.5 * (Math.sqrt(1 - t * t) - 1) : .5 * (Math.sqrt(1 - (t -= 2) * t) + 1)
    },
    elasticIn: function(t) {
      var e, n = .1,
        i = .4;
      return 0 === t ? 0 : 1 === t ? 1 : (!n || 1 > n ? (n = 1, e = i / 4) : e = i * Math.asin(1 / n) / (2 * Math.PI), -(n * Math.pow(2, 10 * (t -= 1)) * Math.sin(2 * (t - e) * Math.PI / i)))
    },
    elasticOut: function(t) {
      var e, n = .1,
        i = .4;
      return 0 === t ? 0 : 1 === t ? 1 : (!n || 1 > n ? (n = 1, e = i / 4) : e = i * Math.asin(1 / n) / (2 * Math.PI), n * Math.pow(2, -10 * t) * Math.sin(2 * (t - e) * Math.PI / i) + 1)
    },
    elasticInOut: function(t) {
      var e, n = .1,
        i = .4;
      return 0 === t ? 0 : 1 === t ? 1 : (!n || 1 > n ? (n = 1, e = i / 4) : e = i * Math.asin(1 / n) / (2 * Math.PI), (t *= 2) < 1 ? -.5 * n * Math.pow(2, 10 * (t -= 1)) * Math.sin(2 * (t - e) * Math.PI / i) : n * Math.pow(2, -10 * (t -= 1)) * Math.sin(2 * (t - e) * Math.PI / i) * .5 + 1)
    },
    backIn: function(t) {
      var e = 1.70158;
      return t * t * ((e + 1) * t - e)
    },
    backOut: function(t) {
      var e = 1.70158;
      return --t * t * ((e + 1) * t + e) + 1
    },
    backInOut: function(t) {
      var e = 2.5949095;
      return (t *= 2) < 1 ? .5 * t * t * ((e + 1) * t - e) : .5 * ((t -= 2) * t * ((e + 1) * t + e) + 2)
    },
    bounceIn: function(t) {
      return 1 - Zf.bounceOut(1 - t)
    },
    bounceOut: function(t) {
      return 1 / 2.75 > t ? 7.5625 * t * t : 2 / 2.75 > t ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : 2.5 / 2.75 > t ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375
    },
    bounceInOut: function(t) {
      return .5 > t ? .5 * Zf.bounceIn(2 * t) : .5 * Zf.bounceOut(2 * t - 1) + .5
    }
  };
  ze.prototype = {
    constructor: ze,
    step: function(t, e) {
      if (this._initialized || (this._startTime = t + this._delay, this._initialized = !0), this._paused) return void(this._pausedTime += e);
      var n = (t - this._startTime - this._pausedTime) / this._life;
      if (!(0 > n)) {
        n = Math.min(n, 1);
        var i = this.easing,
          r = "string" == typeof i ? Zf[i] : i,
          a = "function" == typeof r ? r(n) : n;
        return this.fire("frame", a), 1 === n ? this.loop ? (this.restart(t), "restart") : (this._needsRemove = !0, "destroy") : null
      }
    },
    restart: function(t) {
      var e = (t - this._startTime - this._pausedTime) % this._life;
      this._startTime = t - e + this.gap, this._pausedTime = 0, this._needsRemove = !1
    },
    fire: function(t, e) {
      t = "on" + t, this[t] && this[t](this._target, e)
    },
    pause: function() {
      this._paused = !0
    },
    resume: function() {
      this._paused = !1
    }
  };
  var $f = function() {
      this.head = null, this.tail = null, this._len = 0
    },
    Kf = $f.prototype;
  Kf.insert = function(t) {
    var e = new Qf(t);
    return this.insertEntry(e), e
  }, Kf.insertEntry = function(t) {
    this.head ? (this.tail.next = t, t.prev = this.tail, t.next = null, this.tail = t) : this.head = this.tail = t, this._len++
  }, Kf.remove = function(t) {
    var e = t.prev,
      n = t.next;
    e ? e.next = n : this.head = n, n ? n.prev = e : this.tail = e, t.next = t.prev = null, this._len--
  }, Kf.len = function() {
    return this._len
  }, Kf.clear = function() {
    this.head = this.tail = null, this._len = 0
  };
  var Qf = function(t) {
      this.value = t, this.next, this.prev
    },
    Jf = function(t) {
      this._list = new $f, this._map = {}, this._maxSize = t || 10, this._lastRemovedEntry = null
    },
    td = Jf.prototype;
  td.put = function(t, e) {
    var n = this._list,
      i = this._map,
      r = null;
    if (null == i[t]) {
      var a = n.len(),
        o = this._lastRemovedEntry;
      if (a >= this._maxSize && a > 0) {
        var s = n.head;
        n.remove(s), delete i[s.key], r = s.value, this._lastRemovedEntry = s
      }
      o ? o.value = e : o = new Qf(e), o.key = t, n.insertEntry(o), i[t] = o
    }
    return r
  }, td.get = function(t) {
    var e = this._map[t],
      n = this._list;
    return null != e ? (e !== n.tail && (n.remove(e), n.insertEntry(e)), e.value) : void 0
  }, td.clear = function() {
    this._list.clear(), this._map = {}
  };
  var ed = {
      transparent: [0, 0, 0, 0],
      aliceblue: [240, 248, 255, 1],
      antiquewhite: [250, 235, 215, 1],
      aqua: [0, 255, 255, 1],
      aquamarine: [127, 255, 212, 1],
      azure: [240, 255, 255, 1],
      beige: [245, 245, 220, 1],
      bisque: [255, 228, 196, 1],
      black: [0, 0, 0, 1],
      blanchedalmond: [255, 235, 205, 1],
      blue: [0, 0, 255, 1],
      blueviolet: [138, 43, 226, 1],
      brown: [165, 42, 42, 1],
      burlywood: [222, 184, 135, 1],
      cadetblue: [95, 158, 160, 1],
      chartreuse: [127, 255, 0, 1],
      chocolate: [210, 105, 30, 1],
      coral: [255, 127, 80, 1],
      cornflowerblue: [100, 149, 237, 1],
      cornsilk: [255, 248, 220, 1],
      crimson: [220, 20, 60, 1],
      cyan: [0, 255, 255, 1],
      darkblue: [0, 0, 139, 1],
      darkcyan: [0, 139, 139, 1],
      darkgoldenrod: [184, 134, 11, 1],
      darkgray: [169, 169, 169, 1],
      darkgreen: [0, 100, 0, 1],
      darkgrey: [169, 169, 169, 1],
      darkkhaki: [189, 183, 107, 1],
      darkmagenta: [139, 0, 139, 1],
      darkolivegreen: [85, 107, 47, 1],
      darkorange: [255, 140, 0, 1],
      darkorchid: [153, 50, 204, 1],
      darkred: [139, 0, 0, 1],
      darksalmon: [233, 150, 122, 1],
      darkseagreen: [143, 188, 143, 1],
      darkslateblue: [72, 61, 139, 1],
      darkslategray: [47, 79, 79, 1],
      darkslategrey: [47, 79, 79, 1],
      darkturquoise: [0, 206, 209, 1],
      darkviolet: [148, 0, 211, 1],
      deeppink: [255, 20, 147, 1],
      deepskyblue: [0, 191, 255, 1],
      dimgray: [105, 105, 105, 1],
      dimgrey: [105, 105, 105, 1],
      dodgerblue: [30, 144, 255, 1],
      firebrick: [178, 34, 34, 1],
      floralwhite: [255, 250, 240, 1],
      forestgreen: [34, 139, 34, 1],
      fuchsia: [255, 0, 255, 1],
      gainsboro: [220, 220, 220, 1],
      ghostwhite: [248, 248, 255, 1],
      gold: [255, 215, 0, 1],
      goldenrod: [218, 165, 32, 1],
      gray: [128, 128, 128, 1],
      green: [0, 128, 0, 1],
      greenyellow: [173, 255, 47, 1],
      grey: [128, 128, 128, 1],
      honeydew: [240, 255, 240, 1],
      hotpink: [255, 105, 180, 1],
      indianred: [205, 92, 92, 1],
      indigo: [75, 0, 130, 1],
      ivory: [255, 255, 240, 1],
      khaki: [240, 230, 140, 1],
      lavender: [230, 230, 250, 1],
      lavenderblush: [255, 240, 245, 1],
      lawngreen: [124, 252, 0, 1],
      lemonchiffon: [255, 250, 205, 1],
      lightblue: [173, 216, 230, 1],
      lightcoral: [240, 128, 128, 1],
      lightcyan: [224, 255, 255, 1],
      lightgoldenrodyellow: [250, 250, 210, 1],
      lightgray: [211, 211, 211, 1],
      lightgreen: [144, 238, 144, 1],
      lightgrey: [211, 211, 211, 1],
      lightpink: [255, 182, 193, 1],
      lightsalmon: [255, 160, 122, 1],
      lightseagreen: [32, 178, 170, 1],
      lightskyblue: [135, 206, 250, 1],
      lightslategray: [119, 136, 153, 1],
      lightslategrey: [119, 136, 153, 1],
      lightsteelblue: [176, 196, 222, 1],
      lightyellow: [255, 255, 224, 1],
      lime: [0, 255, 0, 1],
      limegreen: [50, 205, 50, 1],
      linen: [250, 240, 230, 1],
      magenta: [255, 0, 255, 1],
      maroon: [128, 0, 0, 1],
      mediumaquamarine: [102, 205, 170, 1],
      mediumblue: [0, 0, 205, 1],
      mediumorchid: [186, 85, 211, 1],
      mediumpurple: [147, 112, 219, 1],
      mediumseagreen: [60, 179, 113, 1],
      mediumslateblue: [123, 104, 238, 1],
      mediumspringgreen: [0, 250, 154, 1],
      mediumturquoise: [72, 209, 204, 1],
      mediumvioletred: [199, 21, 133, 1],
      midnightblue: [25, 25, 112, 1],
      mintcream: [245, 255, 250, 1],
      mistyrose: [255, 228, 225, 1],
      moccasin: [255, 228, 181, 1],
      navajowhite: [255, 222, 173, 1],
      navy: [0, 0, 128, 1],
      oldlace: [253, 245, 230, 1],
      olive: [128, 128, 0, 1],
      olivedrab: [107, 142, 35, 1],
      orange: [255, 165, 0, 1],
      orangered: [255, 69, 0, 1],
      orchid: [218, 112, 214, 1],
      palegoldenrod: [238, 232, 170, 1],
      palegreen: [152, 251, 152, 1],
      paleturquoise: [175, 238, 238, 1],
      palevioletred: [219, 112, 147, 1],
      papayawhip: [255, 239, 213, 1],
      peachpuff: [255, 218, 185, 1],
      peru: [205, 133, 63, 1],
      pink: [255, 192, 203, 1],
      plum: [221, 160, 221, 1],
      powderblue: [176, 224, 230, 1],
      purple: [128, 0, 128, 1],
      red: [255, 0, 0, 1],
      rosybrown: [188, 143, 143, 1],
      royalblue: [65, 105, 225, 1],
      saddlebrown: [139, 69, 19, 1],
      salmon: [250, 128, 114, 1],
      sandybrown: [244, 164, 96, 1],
      seagreen: [46, 139, 87, 1],
      seashell: [255, 245, 238, 1],
      sienna: [160, 82, 45, 1],
      silver: [192, 192, 192, 1],
      skyblue: [135, 206, 235, 1],
      slateblue: [106, 90, 205, 1],
      slategray: [112, 128, 144, 1],
      slategrey: [112, 128, 144, 1],
      snow: [255, 250, 250, 1],
      springgreen: [0, 255, 127, 1],
      steelblue: [70, 130, 180, 1],
      tan: [210, 180, 140, 1],
      teal: [0, 128, 128, 1],
      thistle: [216, 191, 216, 1],
      tomato: [255, 99, 71, 1],
      turquoise: [64, 224, 208, 1],
      violet: [238, 130, 238, 1],
      wheat: [245, 222, 179, 1],
      white: [255, 255, 255, 1],
      whitesmoke: [245, 245, 245, 1],
      yellow: [255, 255, 0, 1],
      yellowgreen: [154, 205, 50, 1]
    },
    nd = new Jf(20),
    id = null,
    rd = Je,
    ad = tn,
    od = (Object.freeze || Object)({
      parse: Ye,
      lift: Ke,
      toHex: Qe,
      fastLerp: Je,
      fastMapToColor: rd,
      lerp: tn,
      mapToColor: ad,
      modifyHSL: en,
      modifyAlpha: nn,
      stringify: rn
    }),
    sd = Array.prototype.slice,
    ld = function(t, e, n, i) {
      this._tracks = {}, this._target = t, this._loop = e || !1, this._getter = n || an, this._setter = i || on, this._clipCount = 0, this._delay = 0, this._doneList = [], this._onframeList = [], this._clipList = []
    };
  ld.prototype = {
    when: function(t, e) {
      var n = this._tracks;
      for (var i in e)
        if (e.hasOwnProperty(i)) {
          if (!n[i]) {
            n[i] = [];
            var r = this._getter(this._target, i);
            if (null == r) continue;
            0 !== t && n[i].push({
              time: 0,
              value: pn(r)
            })
          }
          n[i].push({
            time: t,
            value: e[i]
          })
        }
      return this
    },
    during: function(t) {
      return this._onframeList.push(t), this
    },
    pause: function() {
      for (var t = 0; t < this._clipList.length; t++) this._clipList[t].pause();
      this._paused = !0
    },
    resume: function() {
      for (var t = 0; t < this._clipList.length; t++) this._clipList[t].resume();
      this._paused = !1
    },
    isPaused: function() {
      return !!this._paused
    },
    _doneCallback: function() {
      this._tracks = {}, this._clipList.length = 0;
      for (var t = this._doneList, e = t.length, n = 0; e > n; n++) t[n].call(this)
    },
    start: function(t, e) {
      var n, i = this,
        r = 0,
        a = function() {
          r--, r || i._doneCallback()
        };
      for (var o in this._tracks)
        if (this._tracks.hasOwnProperty(o)) {
          var s = mn(this, t, a, this._tracks[o], o, e);
          s && (this._clipList.push(s), r++, this.animation && this.animation.addClip(s), n = s)
        }
      if (n) {
        var l = n.onframe;
        n.onframe = function(t, e) {
          l(t, e);
          for (var n = 0; n < i._onframeList.length; n++) i._onframeList[n](t, e)
        }
      }
      return r || this._doneCallback(), this
    },
    stop: function(t) {
      for (var e = this._clipList, n = this.animation, i = 0; i < e.length; i++) {
        var r = e[i];
        t && r.onframe(this._target, 1), n && n.removeClip(r)
      }
      e.length = 0
    },
    delay: function(t) {
      return this._delay = t, this
    },
    done: function(t) {
      return t && this._doneList.push(t), this
    },
    getClips: function() {
      return this._clipList
    }
  };
  var ud = 1;
  "undefined" != typeof window && (ud = Math.max(window.devicePixelRatio || 1, 1));
  var hd = 0,
    cd = ud,
    fd = function() {};
  1 === hd && (fd = console.error);
  var dd = fd,
    pd = function() {
      this.animators = []
    };
  pd.prototype = {
    constructor: pd,
    animate: function(t, e) {
      var n, i = !1,
        r = this,
        a = this.__zr;
      if (t) {
        var o = t.split("."),
          s = r;
        i = "shape" === o[0];
        for (var l = 0, h = o.length; h > l; l++) s && (s = s[o[l]]);
        s && (n = s)
      } else n = r;
      if (!n) return void dd('Property "' + t + '" is not existed in element ' + r.id);
      var c = r.animators,
        f = new ld(n, e);
      return f.during(function() {
        r.dirty(i)
      }).done(function() {
        c.splice(u(c, f), 1)
      }), c.push(f), a && a.animation.addAnimator(f), f
    },
    stopAnimation: function(t) {
      for (var e = this.animators, n = e.length, i = 0; n > i; i++) e[i].stop(t);
      return e.length = 0, this
    },
    animateTo: function(t, e, n, i, r, a) {
      yn(this, t, e, n, i, r, a)
    },
    animateFrom: function(t, e, n, i, r, a) {
      yn(this, t, e, n, i, r, a, !0)
    }
  };
  var gd = function(t) {
    Xf.call(this, t), kf.call(this, t), pd.call(this, t), this.id = t.id || rf()
  };
  gd.prototype = {
    type: "element",
    name: "",
    __zr: null,
    ignore: !1,
    clipPath: null,
    isGroup: !1,
    drift: function(t, e) {
      switch (this.draggable) {
        case "horizontal":
          e = 0;
          break;
        case "vertical":
          t = 0
      }
      var n = this.transform;
      n || (n = this.transform = [1, 0, 0, 1, 0, 0]), n[4] += t, n[5] += e, this.decomposeTransform(), this.dirty(!1)
    },
    beforeUpdate: function() {},
    afterUpdate: function() {},
    update: function() {
      this.updateTransform()
    },
    traverse: function() {},
    attrKV: function(t, e) {
      if ("position" === t || "scale" === t || "origin" === t) {
        if (e) {
          var n = this[t];
          n || (n = this[t] = []), n[0] = e[0], n[1] = e[1]
        }
      } else this[t] = e
    },
    hide: function() {
      this.ignore = !0, this.__zr && this.__zr.refresh()
    },
    show: function() {
      this.ignore = !1, this.__zr && this.__zr.refresh()
    },
    attr: function(t, e) {
      if ("string" == typeof t) this.attrKV(t, e);
      else if (S(t))
        for (var n in t) t.hasOwnProperty(n) && this.attrKV(n, t[n]);
      return this.dirty(!1), this
    },
    setClipPath: function(t) {
      var e = this.__zr;
      e && t.addSelfToZr(e), this.clipPath && this.clipPath !== t && this.removeClipPath(), this.clipPath = t, t.__zr = e, t.__clipTarget = this, this.dirty(!1)
    },
    removeClipPath: function() {
      var t = this.clipPath;
      t && (t.__zr && t.removeSelfFromZr(t.__zr), t.__zr = null, t.__clipTarget = null, this.clipPath = null, this.dirty(!1))
    },
    addSelfToZr: function(t) {
      this.__zr = t;
      var e = this.animators;
      if (e)
        for (var n = 0; n < e.length; n++) t.animation.addAnimator(e[n]);
      this.clipPath && this.clipPath.addSelfToZr(t)
    },
    removeSelfFromZr: function(t) {
      this.__zr = null;
      var e = this.animators;
      if (e)
        for (var n = 0; n < e.length; n++) t.animation.removeAnimator(e[n]);
      this.clipPath && this.clipPath.removeSelfFromZr(t)
    }
  }, c(gd, pd), c(gd, Xf), c(gd, kf);
  var vd = ae,
    md = Math.min,
    yd = Math.max;
  wn.prototype = {
    constructor: wn,
    union: function(t) {
      var e = md(t.x, this.x),
        n = md(t.y, this.y);
      this.width = yd(t.x + t.width, this.x + this.width) - e, this.height = yd(t.y + t.height, this.y + this.height) - n, this.x = e, this.y = n
    },
    applyTransform: function() {
      var t = [],
        e = [],
        n = [],
        i = [];
      return function(r) {
        if (r) {
          t[0] = n[0] = this.x, t[1] = i[1] = this.y, e[0] = i[0] = this.x + this.width, e[1] = n[1] = this.y + this.height, vd(t, t, r), vd(e, e, r), vd(n, n, r), vd(i, i, r), this.x = md(t[0], e[0], n[0], i[0]), this.y = md(t[1], e[1], n[1], i[1]);
          var a = yd(t[0], e[0], n[0], i[0]),
            o = yd(t[1], e[1], n[1], i[1]);
          this.width = a - this.x, this.height = o - this.y
        }
      }
    }(),
    calculateTransform: function(t) {
      var e = this,
        n = t.width / e.width,
        i = t.height / e.height,
        r = Ie();
      return Pe(r, r, [-e.x, -e.y]), Oe(r, r, [n, i]), Pe(r, r, [t.x, t.y]), r
    },
    intersect: function(t) {
      if (!t) return !1;
      t instanceof wn || (t = wn.create(t));
      var e = this,
        n = e.x,
        i = e.x + e.width,
        r = e.y,
        a = e.y + e.height,
        o = t.x,
        s = t.x + t.width,
        l = t.y,
        u = t.y + t.height;
      return !(o > i || n > s || l > a || r > u)
    },
    contain: function(t, e) {
      var n = this;
      return t >= n.x && t <= n.x + n.width && e >= n.y && e <= n.y + n.height
    },
    clone: function() {
      return new wn(this.x, this.y, this.width, this.height)
    },
    copy: function(t) {
      this.x = t.x, this.y = t.y, this.width = t.width, this.height = t.height
    },
    plain: function() {
      return {
        x: this.x,
        y: this.y,
        width: this.width,
        height: this.height
      }
    }
  }, wn.create = function(t) {
    return new wn(t.x, t.y, t.width, t.height)
  };
  var _d = function(t) {
    t = t || {}, gd.call(this, t);
    for (var e in t) t.hasOwnProperty(e) && (this[e] = t[e]);
    this._children = [], this.__storage = null, this.__dirty = !0
  };
  _d.prototype = {
    constructor: _d,
    isGroup: !0,
    type: "group",
    silent: !1,
    children: function() {
      return this._children.slice()
    },
    childAt: function(t) {
      return this._children[t]
    },
    childOfName: function(t) {
      for (var e = this._children, n = 0; n < e.length; n++)
        if (e[n].name === t) return e[n]
    },
    childCount: function() {
      return this._children.length
    },
    add: function(t) {
      return t && t !== this && t.parent !== this && (this._children.push(t), this._doAdd(t)), this
    },
    addBefore: function(t, e) {
      if (t && t !== this && t.parent !== this && e && e.parent === this) {
        var n = this._children,
          i = n.indexOf(e);
        i >= 0 && (n.splice(i, 0, t), this._doAdd(t))
      }
      return this
    },
    _doAdd: function(t) {
      t.parent && t.parent.remove(t), t.parent = this;
      var e = this.__storage,
        n = this.__zr;
      e && e !== t.__storage && (e.addToStorage(t), t instanceof _d && t.addChildrenToStorage(e)), n && n.refresh()
    },
    remove: function(t) {
      var e = this.__zr,
        n = this.__storage,
        i = this._children,
        r = u(i, t);
      return 0 > r ? this : (i.splice(r, 1), t.parent = null, n && (n.delFromStorage(t), t instanceof _d && t.delChildrenFromStorage(n)), e && e.refresh(), this)
    },
    removeAll: function() {
      var t, e, n = this._children,
        i = this.__storage;
      for (e = 0; e < n.length; e++) t = n[e], i && (i.delFromStorage(t), t instanceof _d && t.delChildrenFromStorage(i)), t.parent = null;
      return n.length = 0, this
    },
    eachChild: function(t, e) {
      for (var n = this._children, i = 0; i < n.length; i++) {
        var r = n[i];
        t.call(e, r, i)
      }
      return this
    },
    traverse: function(t, e) {
      for (var n = 0; n < this._children.length; n++) {
        var i = this._children[n];
        t.call(e, i), "group" === i.type && i.traverse(t, e)
      }
      return this
    },
    addChildrenToStorage: function(t) {
      for (var e = 0; e < this._children.length; e++) {
        var n = this._children[e];
        t.addToStorage(n), n instanceof _d && n.addChildrenToStorage(t)
      }
    },
    delChildrenFromStorage: function(t) {
      for (var e = 0; e < this._children.length; e++) {
        var n = this._children[e];
        t.delFromStorage(n), n instanceof _d && n.delChildrenFromStorage(t)
      }
    },
    dirty: function() {
      return this.__dirty = !0, this.__zr && this.__zr.refresh(), this
    },
    getBoundingRect: function(t) {
      for (var e = null, n = new wn(0, 0, 0, 0), i = t || this._children, r = [], a = 0; a < i.length; a++) {
        var o = i[a];
        if (!o.ignore && !o.invisible) {
          var s = o.getBoundingRect(),
            l = o.getLocalTransform(r);
          l ? (n.copy(s), n.applyTransform(l), e = e || n.clone(), e.union(n)) : (e = e || s.clone(), e.union(s))
        }
      }
      return e || n
    }
  }, h(_d, gd);
  var xd = 32,
    wd = 7,
    bd = function() {
      this._roots = [], this._displayList = [], this._displayListLen = 0
    };
  bd.prototype = {
    constructor: bd,
    traverse: function(t, e) {
      for (var n = 0; n < this._roots.length; n++) this._roots[n].traverse(t, e)
    },
    getDisplayList: function(t, e) {
      return e = e || !1, t && this.updateDisplayList(e), this._displayList
    },
    updateDisplayList: function(t) {
      this._displayListLen = 0;
      for (var e = this._roots, n = this._displayList, i = 0, r = e.length; r > i; i++) this._updateAndAddDisplayable(e[i], null, t);
      n.length = this._displayListLen, of .canvasSupported && An(n, Dn)
    },
    _updateAndAddDisplayable: function(t, e, n) {
      if (!t.ignore || n) {
        t.beforeUpdate(), t.__dirty && t.update(), t.afterUpdate();
        var i = t.clipPath;
        if (i) {
          e = e ? e.slice() : [];
          for (var r = i, a = t; r;) r.parent = a, r.updateTransform(), e.push(r), a = r, r = r.clipPath
        }
        if (t.isGroup) {
          for (var o = t._children, s = 0; s < o.length; s++) {
            var l = o[s];
            t.__dirty && (l.__dirty = !0), this._updateAndAddDisplayable(l, e, n)
          }
          t.__dirty = !1
        } else t.__clipPaths = e, this._displayList[this._displayListLen++] = t
      }
    },
    addRoot: function(t) {
      t.__storage !== this && (t instanceof _d && t.addChildrenToStorage(this), this.addToStorage(t), this._roots.push(t))
    },
    delRoot: function(t) {
      if (null == t) {
        for (var e = 0; e < this._roots.length; e++) {
          var n = this._roots[e];
          n instanceof _d && n.delChildrenFromStorage(this)
        }
        return this._roots = [], this._displayList = [], void(this._displayListLen = 0)
      }
      if (t instanceof Array)
        for (var e = 0, i = t.length; i > e; e++) this.delRoot(t[e]);
      else {
        var r = u(this._roots, t);
        r >= 0 && (this.delFromStorage(t), this._roots.splice(r, 1), t instanceof _d && t.delChildrenFromStorage(this))
      }
    },
    addToStorage: function(t) {
      return t && (t.__storage = this, t.dirty(!1)), this
    },
    delFromStorage: function(t) {
      return t && (t.__storage = null), this
    },
    dispose: function() {
      this._renderList = this._roots = null
    },
    displayableSortFunc: Dn
  };
  var Sd = {
      shadowBlur: 1,
      shadowOffsetX: 1,
      shadowOffsetY: 1,
      textShadowBlur: 1,
      textShadowOffsetX: 1,
      textShadowOffsetY: 1,
      textBoxShadowBlur: 1,
      textBoxShadowOffsetX: 1,
      textBoxShadowOffsetY: 1
    },
    Md = function(t, e, n) {
      return Sd.hasOwnProperty(e) ? n *= t.dpr : n
    },
    Td = {
      NONE: 0,
      STYLE_BIND: 1,
      PLAIN_TEXT: 2
    },
    Cd = 9,
    Id = [
      ["shadowBlur", 0],
      ["shadowOffsetX", 0],
      ["shadowOffsetY", 0],
      ["shadowColor", "#000"],
      ["lineCap", "butt"],
      ["lineJoin", "miter"],
      ["miterLimit", 10]
    ],
    kd = function(t) {
      this.extendFrom(t, !1)
    };
  kd.prototype = {
    constructor: kd,
    fill: "#000",
    stroke: null,
    opacity: 1,
    fillOpacity: null,
    strokeOpacity: null,
    lineDash: null,
    lineDashOffset: 0,
    shadowBlur: 0,
    shadowOffsetX: 0,
    shadowOffsetY: 0,
    lineWidth: 1,
    strokeNoScale: !1,
    text: null,
    font: null,
    textFont: null,
    fontStyle: null,
    fontWeight: null,
    fontSize: null,
    fontFamily: null,
    textTag: null,
    textFill: "#000",
    textStroke: null,
    textWidth: null,
    textHeight: null,
    textStrokeWidth: 0,
    textLineHeight: null,
    textPosition: "inside",
    textRect: null,
    textOffset: null,
    textAlign: null,
    textVerticalAlign: null,
    textDistance: 5,
    textShadowColor: "transparent",
    textShadowBlur: 0,
    textShadowOffsetX: 0,
    textShadowOffsetY: 0,
    textBoxShadowColor: "transparent",
    textBoxShadowBlur: 0,
    textBoxShadowOffsetX: 0,
    textBoxShadowOffsetY: 0,
    transformText: !1,
    textRotation: 0,
    textOrigin: null,
    textBackgroundColor: null,
    textBorderColor: null,
    textBorderWidth: 0,
    textBorderRadius: 0,
    textPadding: null,
    rich: null,
    truncate: null,
    blend: null,
    bind: function(t, e, n) {
      var i = this,
        r = n && n.style,
        a = !r || t.__attrCachedBy !== Td.STYLE_BIND;
      t.__attrCachedBy = Td.STYLE_BIND;
      for (var o = 0; o < Id.length; o++) {
        var s = Id[o],
          l = s[0];
        (a || i[l] !== r[l]) && (t[l] = Md(t, l, i[l] || s[1]))
      }
      if ((a || i.fill !== r.fill) && (t.fillStyle = i.fill), (a || i.stroke !== r.stroke) && (t.strokeStyle = i.stroke), (a || i.opacity !== r.opacity) && (t.globalAlpha = null == i.opacity ? 1 : i.opacity), (a || i.blend !== r.blend) && (t.globalCompositeOperation = i.blend || "source-over"), this.hasStroke()) {
        var u = i.lineWidth;
        t.lineWidth = u / (this.strokeNoScale && e && e.getLineScale ? e.getLineScale() : 1)
      }
    },
    hasFill: function() {
      var t = this.fill;
      return null != t && "none" !== t
    },
    hasStroke: function() {
      var t = this.stroke;
      return null != t && "none" !== t && this.lineWidth > 0
    },
    extendFrom: function(t, e) {
      if (t)
        for (var n in t) !t.hasOwnProperty(n) || e !== !0 && (e === !1 ? this.hasOwnProperty(n) : null == t[n]) || (this[n] = t[n])
    },
    set: function(t, e) {
      "string" == typeof t ? this[t] = e : this.extendFrom(t, !0)
    },
    clone: function() {
      var t = new this.constructor;
      return t.extendFrom(this, !0), t
    },
    getGradient: function(t, e, n) {
      for (var i = "radial" === e.type ? Ln : Pn, r = i(t, e, n), a = e.colorStops, o = 0; o < a.length; o++) r.addColorStop(a[o].offset, a[o].color);
      return r
    }
  };
  for (var Ad = kd.prototype, Dd = 0; Dd < Id.length; Dd++) {
    var Pd = Id[Dd];
    Pd[0] in Ad || (Ad[Pd[0]] = Pd[1])
  }
  kd.getGradient = Ad.getGradient;
  var Ld = function(t, e) {
    this.image = t, this.repeat = e, this.type = "pattern"
  };
  Ld.prototype.getCanvasPattern = function(t) {
    return t.createPattern(this.image, this.repeat || "repeat")
  };
  var Od = function(t, e, n) {
    var i;
    n = n || cd, "string" == typeof t ? i = En(t, e, n) : S(t) && (i = t, t = i.id), this.id = t, this.dom = i;
    var r = i.style;
    r && (i.onselectstart = On, r["-webkit-user-select"] = "none", r["user-select"] = "none", r["-webkit-touch-callout"] = "none", r["-webkit-tap-highlight-color"] = "rgba(0,0,0,0)", r.padding = 0, r.margin = 0, r["border-width"] = 0), this.domBack = null, this.ctxBack = null, this.painter = e, this.config = null, this.clearColor = 0, this.motionBlur = !1, this.lastFrameAlpha = .7, this.dpr = n
  };
  Od.prototype = {
    constructor: Od,
    __dirty: !0,
    __used: !1,
    __drawIndex: 0,
    __startIndex: 0,
    __endIndex: 0,
    incremental: !1,
    getElementCount: function() {
      return this.__endIndex - this.__startIndex
    },
    initContext: function() {
      this.ctx = this.dom.getContext("2d"), this.ctx.dpr = this.dpr
    },
    createBackBuffer: function() {
      var t = this.dpr;
      this.domBack = En("back-" + this.id, this.painter, t), this.ctxBack = this.domBack.getContext("2d"), 1 !== t && this.ctxBack.scale(t, t)
    },
    resize: function(t, e) {
      var n = this.dpr,
        i = this.dom,
        r = i.style,
        a = this.domBack;
      r && (r.width = t + "px", r.height = e + "px"), i.width = t * n, i.height = e * n, a && (a.width = t * n, a.height = e * n, 1 !== n && this.ctxBack.scale(n, n))
    },
    clear: function(t, e) {
      var n = this.dom,
        i = this.ctx,
        r = n.width,
        a = n.height,
        e = e || this.clearColor,
        o = this.motionBlur && !t,
        s = this.lastFrameAlpha,
        l = this.dpr;
      if (o && (this.domBack || this.createBackBuffer(), this.ctxBack.globalCompositeOperation = "copy", this.ctxBack.drawImage(n, 0, 0, r / l, a / l)), i.clearRect(0, 0, r, a), e && "transparent" !== e) {
        var u;
        e.colorStops ? (u = e.__canvasGradient || kd.getGradient(i, e, {
          x: 0,
          y: 0,
          width: r,
          height: a
        }), e.__canvasGradient = u) : e.image && (u = Ld.prototype.getCanvasPattern.call(e, i)), i.save(), i.fillStyle = u || e, i.fillRect(0, 0, r, a), i.restore()
      }
      if (o) {
        var h = this.domBack;
        i.save(), i.globalAlpha = s, i.drawImage(h, 0, 0, r, a), i.restore()
      }
    }
  };
  var Ed = "undefined" != typeof window && (window.requestAnimationFrame && window.requestAnimationFrame.bind(window) || window.msRequestAnimationFrame && window.msRequestAnimationFrame.bind(window) || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame) || function(t) {
      setTimeout(t, 16)
    },
    Bd = new Jf(50),
    Rd = {},
    zd = 0,
    Nd = 5e3,
    Fd = /\{([a-zA-Z0-9_]+)\|([^}]*)\}/g,
    Vd = "12px sans-serif",
    Hd = {};
  Hd.measureText = function(t, e) {
    var n = l();
    return n.font = e || Vd, n.measureText(t)
  };
  var Wd = Vd,
    Gd = {
      left: 1,
      right: 1,
      center: 1
    },
    Xd = {
      top: 1,
      bottom: 1,
      middle: 1
    },
    qd = [
      ["textShadowBlur", "shadowBlur", 0],
      ["textShadowOffsetX", "shadowOffsetX", 0],
      ["textShadowOffsetY", "shadowOffsetY", 0],
      ["textShadowColor", "shadowColor", "transparent"]
    ],
    Ud = {},
    jd = {},
    Yd = new wn,
    Zd = function() {};
  Zd.prototype = {
    constructor: Zd,
    drawRectText: function(t, e) {
      var n = this.style;
      e = n.textRect || e, this.__dirty && ii(n, !0);
      var i = n.text;
      if (null != i && (i += ""), xi(i, n)) {
        t.save();
        var r = this.transform;
        n.transformText ? this.setTransform(t) : r && (Yd.copy(e), Yd.applyTransform(r), e = Yd), ai(this, t, i, n, e, Cd), t.restore()
      }
    }
  }, wi.prototype = {
    constructor: wi,
    type: "displayable",
    __dirty: !0,
    invisible: !1,
    z: 0,
    z2: 0,
    zlevel: 0,
    draggable: !1,
    dragging: !1,
    silent: !1,
    culling: !1,
    cursor: "pointer",
    rectHover: !1,
    progressive: !1,
    incremental: !1,
    globalScaleRatio: 1,
    beforeBrush: function() {},
    afterBrush: function() {},
    brush: function() {},
    getBoundingRect: function() {},
    contain: function(t, e) {
      return this.rectContain(t, e)
    },
    traverse: function(t, e) {
      t.call(e, this)
    },
    rectContain: function(t, e) {
      var n = this.transformCoordToLocal(t, e),
        i = this.getBoundingRect();
      return i.contain(n[0], n[1])
    },
    dirty: function() {
      this.__dirty = this.__dirtyText = !0, this._rect = null, this.__zr && this.__zr.refresh()
    },
    animateStyle: function(t) {
      return this.animate("style", t)
    },
    attrKV: function(t, e) {
      "style" !== t ? gd.prototype.attrKV.call(this, t, e) : this.style.set(e)
    },
    setStyle: function(t, e) {
      return this.style.set(t, e), this.dirty(!1), this
    },
    useStyle: function(t) {
      return this.style = new kd(t, this), this.dirty(!1), this
    },
    calculateTextPosition: null
  }, h(wi, gd), c(wi, Zd), bi.prototype = {
    constructor: bi,
    type: "image",
    brush: function(t, e) {
      var n = this.style,
        i = n.image;
      n.bind(t, this, e);
      var r = this._image = Rn(i, this._image, this, this.onload);
      if (r && Nn(r)) {
        var a = n.x || 0,
          o = n.y || 0,
          s = n.width,
          l = n.height,
          u = r.width / r.height;
        if (null == s && null != l ? s = l * u : null == l && null != s ? l = s / u : null == s && null == l && (s = r.width, l = r.height), this.setTransform(t), n.sWidth && n.sHeight) {
          var h = n.sx || 0,
            c = n.sy || 0;
          t.drawImage(r, h, c, n.sWidth, n.sHeight, a, o, s, l)
        } else if (n.sx && n.sy) {
          var h = n.sx,
            c = n.sy,
            f = s - h,
            d = l - c;
          t.drawImage(r, h, c, f, d, a, o, s, l)
        } else t.drawImage(r, a, o, s, l);
        null != n.text && (this.restoreTransform(t), this.drawRectText(t, this.getBoundingRect()))
      }
    },
    getBoundingRect: function() {
      var t = this.style;
      return this._rect || (this._rect = new wn(t.x || 0, t.y || 0, t.width || 0, t.height || 0)), this._rect
    }
  }, h(bi, wi);
  var $d = 1e5,
    Kd = 314159,
    Qd = .01,
    Jd = .001,
    tp = new wn(0, 0, 0, 0),
    ep = new wn(0, 0, 0, 0),
    np = function(t, e, n) {
      this.type = "canvas";
      var i = !t.nodeName || "CANVAS" === t.nodeName.toUpperCase();
      this._opts = n = o({}, n || {}), this.dpr = n.devicePixelRatio || cd, this._singleCanvas = i, this.root = t;
      var r = t.style;
      r && (r["-webkit-tap-highlight-color"] = "transparent", r["-webkit-user-select"] = r["user-select"] = r["-webkit-touch-callout"] = "none", t.innerHTML = ""), this.storage = e;
      var a = this._zlevelList = [],
        s = this._layers = {};
      if (this._layerConfig = {}, this._needsManuallyCompositing = !1, i) {
        var l = t.width,
          u = t.height;
        null != n.width && (l = n.width), null != n.height && (u = n.height), this.dpr = n.devicePixelRatio || 1, t.width = l * this.dpr, t.height = u * this.dpr, this._width = l, this._height = u;
        var h = new Od(t, this, this.dpr);
        h.__builtin__ = !0, h.initContext(), s[Kd] = h, h.zlevel = Kd, a.push(Kd), this._domRoot = t
      } else {
        this._width = this._getSize(0), this._height = this._getSize(1);
        var c = this._domRoot = ki(this._width, this._height);
        t.appendChild(c)
      }
      this._hoverlayer = null, this._hoverElements = []
    };
  np.prototype = {
    constructor: np,
    getType: function() {
      return "canvas"
    },
    isSingleCanvas: function() {
      return this._singleCanvas
    },
    getViewportRoot: function() {
      return this._domRoot
    },
    getViewportRootOffset: function() {
      var t = this.getViewportRoot();
      return t ? {
        offsetLeft: t.offsetLeft || 0,
        offsetTop: t.offsetTop || 0
      } : void 0
    },
    refresh: function(t) {
      var e = this.storage.getDisplayList(!0),
        n = this._zlevelList;
      this._redrawId = Math.random(), this._paintList(e, t, this._redrawId);
      for (var i = 0; i < n.length; i++) {
        var r = n[i],
          a = this._layers[r];
        if (!a.__builtin__ && a.refresh) {
          var o = 0 === i ? this._backgroundColor : null;
          a.refresh(o)
        }
      }
      return this.refreshHover(), this
    },
    addHover: function(t, e) {
      if (!t.__hoverMir) {
        var n = new t.constructor({
          style: t.style,
          shape: t.shape,
          z: t.z,
          z2: t.z2,
          silent: t.silent
        });
        return n.__from = t, t.__hoverMir = n, e && n.setStyle(e), this._hoverElements.push(n), n
      }
    },
    removeHover: function(t) {
      var e = t.__hoverMir,
        n = this._hoverElements,
        i = u(n, e);
      i >= 0 && n.splice(i, 1), t.__hoverMir = null
    },
    clearHover: function() {
      for (var t = this._hoverElements, e = 0; e < t.length; e++) {
        var n = t[e].__from;
        n && (n.__hoverMir = null)
      }
      t.length = 0
    },
    refreshHover: function() {
      var t = this._hoverElements,
        e = t.length,
        n = this._hoverlayer;
      if (n && n.clear(), e) {
        An(t, this.storage.displayableSortFunc), n || (n = this._hoverlayer = this.getLayer($d));
        var i = {};
        n.ctx.save();
        for (var r = 0; e > r;) {
          var a = t[r],
            o = a.__from;
          o && o.__zr ? (r++, o.invisible || (a.transform = o.transform, a.invTransform = o.invTransform, a.__clipPaths = o.__clipPaths, this._doPaintEl(a, n, !0, i))) : (t.splice(r, 1), o.__hoverMir = null, e--)
        }
        n.ctx.restore()
      }
    },
    getHoverLayer: function() {
      return this.getLayer($d)
    },
    _paintList: function(t, e, n) {
      if (this._redrawId === n) {
        e = e || !1, this._updateLayerStatus(t);
        var i = this._doPaintList(t, e);
        if (this._needsManuallyCompositing && this._compositeManually(), !i) {
          var r = this;
          Ed(function() {
            r._paintList(t, e, n)
          })
        }
      }
    },
    _compositeManually: function() {
      var t = this.getLayer(Kd).ctx,
        e = this._domRoot.width,
        n = this._domRoot.height;
      t.clearRect(0, 0, e, n), this.eachBuiltinLayer(function(i) {
        i.virtual && t.drawImage(i.dom, 0, 0, e, n)
      })
    },
    _doPaintList: function(t, e) {
      for (var n = [], i = 0; i < this._zlevelList.length; i++) {
        var r = this._zlevelList[i],
          a = this._layers[r];
        a.__builtin__ && a !== this._hoverlayer && (a.__dirty || e) && n.push(a)
      }
      for (var o = !0, s = 0; s < n.length; s++) {
        var a = n[s],
          l = a.ctx,
          u = {};
        l.save();
        var h = e ? a.__startIndex : a.__drawIndex,
          c = !e && a.incremental && Date.now,
          f = c && Date.now(),
          p = a.zlevel === this._zlevelList[0] ? this._backgroundColor : null;
        if (a.__startIndex === a.__endIndex) a.clear(!1, p);
        else if (h === a.__startIndex) {
          var g = t[h];
          g.incremental && g.notClear && !e || a.clear(!1, p)
        } - 1 === h && (console.error("For some unknown reason. drawIndex is -1"), h = a.__startIndex);
        for (var v = h; v < a.__endIndex; v++) {
          var m = t[v];
          if (this._doPaintEl(m, a, e, u), m.__dirty = m.__dirtyText = !1, c) {
            var y = Date.now() - f;
            if (y > 15) break
          }
        }
        a.__drawIndex = v, a.__drawIndex < a.__endIndex && (o = !1), u.prevElClipPaths && l.restore(), l.restore()
      }
      return of.wxa && d(this._layers, function(t) {
        t && t.ctx && t.ctx.draw && t.ctx.draw()
      }), o
    },
    _doPaintEl: function(t, e, n, i) {
      var r = e.ctx,
        a = t.transform;
      if (!(!e.__dirty && !n || t.invisible || 0 === t.style.opacity || a && !a[0] && !a[3] || t.culling && Ti(t, this._width, this._height))) {
        var o = t.__clipPaths,
          s = i.prevElClipPaths;
        (!s || Ci(o, s)) && (s && (r.restore(), i.prevElClipPaths = null, i.prevEl = null), o && (r.save(), Ii(o, r), i.prevElClipPaths = o)), t.beforeBrush && t.beforeBrush(r), t.brush(r, i.prevEl || null), i.prevEl = t, t.afterBrush && t.afterBrush(r)
      }
    },
    getLayer: function(t, e) {
      this._singleCanvas && !this._needsManuallyCompositing && (t = Kd);
      var n = this._layers[t];
      return n || (n = new Od("zr_" + t, this, this.dpr), n.zlevel = t, n.__builtin__ = !0, this._layerConfig[t] && r(n, this._layerConfig[t], !0), e && (n.virtual = e), this.insertLayer(t, n), n.initContext()), n
    },
    insertLayer: function(t, e) {
      var n = this._layers,
        i = this._zlevelList,
        r = i.length,
        a = null,
        o = -1,
        s = this._domRoot;
      if (n[t]) return void dd("ZLevel " + t + " has been used already");
      if (!Mi(e)) return void dd("Layer of zlevel " + t + " is not valid");
      if (r > 0 && t > i[0]) {
        for (o = 0; r - 1 > o && !(i[o] < t && i[o + 1] > t); o++);
        a = n[i[o]]
      }
      if (i.splice(o + 1, 0, t), n[t] = e, !e.virtual)
        if (a) {
          var l = a.dom;
          l.nextSibling ? s.insertBefore(e.dom, l.nextSibling) : s.appendChild(e.dom)
        } else s.firstChild ? s.insertBefore(e.dom, s.firstChild) : s.appendChild(e.dom)
    },
    eachLayer: function(t, e) {
      var n, i, r = this._zlevelList;
      for (i = 0; i < r.length; i++) n = r[i], t.call(e, this._layers[n], n)
    },
    eachBuiltinLayer: function(t, e) {
      var n, i, r, a = this._zlevelList;
      for (r = 0; r < a.length; r++) i = a[r], n = this._layers[i], n.__builtin__ && t.call(e, n, i)
    },
    eachOtherLayer: function(t, e) {
      var n, i, r, a = this._zlevelList;
      for (r = 0; r < a.length; r++) i = a[r], n = this._layers[i], n.__builtin__ || t.call(e, n, i)
    },
    getLayers: function() {
      return this._layers
    },
    _updateLayerStatus: function(t) {
      function e(t) {
        r && (r.__endIndex !== t && (r.__dirty = !0), r.__endIndex = t)
      }
      if (this.eachBuiltinLayer(function(t) {
          t.__dirty = t.__used = !1
        }), this._singleCanvas)
        for (var n = 1; n < t.length; n++) {
          var i = t[n];
          if (i.zlevel !== t[n - 1].zlevel || i.incremental) {
            this._needsManuallyCompositing = !0;
            break
          }
        }
      for (var r = null, a = 0, n = 0; n < t.length; n++) {
        var o, i = t[n],
          s = i.zlevel;
        i.incremental ? (o = this.getLayer(s + Jd, this._needsManuallyCompositing), o.incremental = !0, a = 1) : o = this.getLayer(s + (a > 0 ? Qd : 0), this._needsManuallyCompositing), o.__builtin__ || dd("ZLevel " + s + " has been used by unkown layer " + o.id), o !== r && (o.__used = !0, o.__startIndex !== n && (o.__dirty = !0), o.__startIndex = n, o.__drawIndex = o.incremental ? -1 : n, e(n), r = o), i.__dirty && (o.__dirty = !0, o.incremental && o.__drawIndex < 0 && (o.__drawIndex = n))
      }
      e(n), this.eachBuiltinLayer(function(t) {
        !t.__used && t.getElementCount() > 0 && (t.__dirty = !0, t.__startIndex = t.__endIndex = t.__drawIndex = 0), t.__dirty && t.__drawIndex < 0 && (t.__drawIndex = t.__startIndex)
      })
    },
    clear: function() {
      return this.eachBuiltinLayer(this._clearLayer), this
    },
    _clearLayer: function(t) {
      t.clear()
    },
    setBackgroundColor: function(t) {
      this._backgroundColor = t
    },
    configLayer: function(t, e) {
      if (e) {
        var n = this._layerConfig;
        n[t] ? r(n[t], e, !0) : n[t] = e;
        for (var i = 0; i < this._zlevelList.length; i++) {
          var a = this._zlevelList[i];
          if (a === t || a === t + Qd) {
            var o = this._layers[a];
            r(o, n[t], !0)
          }
        }
      }
    },
    delLayer: function(t) {
      var e = this._layers,
        n = this._zlevelList,
        i = e[t];
      i && (i.dom.parentNode.removeChild(i.dom), delete e[t], n.splice(u(n, t), 1))
    },
    resize: function(t, e) {
      if (this._domRoot.style) {
        var n = this._domRoot;
        n.style.display = "none";
        var i = this._opts;
        if (null != t && (i.width = t), null != e && (i.height = e), t = this._getSize(0), e = this._getSize(1), n.style.display = "", this._width !== t || e !== this._height) {
          n.style.width = t + "px", n.style.height = e + "px";
          for (var r in this._layers) this._layers.hasOwnProperty(r) && this._layers[r].resize(t, e);
          d(this._progressiveLayers, function(n) {
            n.resize(t, e)
          }), this.refresh(!0)
        }
        this._width = t, this._height = e
      } else {
        if (null == t || null == e) return;
        this._width = t, this._height = e, this.getLayer(Kd).resize(t, e)
      }
      return this
    },
    clearLayer: function(t) {
      var e = this._layers[t];
      e && e.clear()
    },
    dispose: function() {
      this.root.innerHTML = "", this.root = this.storage = this._domRoot = this._layers = null
    },
    getRenderedCanvas: function(t) {
      if (t = t || {}, this._singleCanvas && !this._compositeManually) return this._layers[Kd].dom;
      var e = new Od("image", this, t.pixelRatio || this.dpr);
      if (e.initContext(), e.clear(!1, t.backgroundColor || this._backgroundColor), t.pixelRatio <= this.dpr) {
        this.refresh();
        var n = e.dom.width,
          i = e.dom.height,
          r = e.ctx;
        this.eachLayer(function(t) {
          t.__builtin__ ? r.drawImage(t.dom, 0, 0, n, i) : t.renderToCanvas && (e.ctx.save(), t.renderToCanvas(e.ctx), e.ctx.restore())
        })
      } else
        for (var a = {}, o = this.storage.getDisplayList(!0), s = 0; s < o.length; s++) {
          var l = o[s];
          this._doPaintEl(l, e, !0, a)
        }
      return e.dom
    },
    getWidth: function() {
      return this._width
    },
    getHeight: function() {
      return this._height
    },
    _getSize: function(t) {
      var e = this._opts,
        n = ["width", "height"][t],
        i = ["clientWidth", "clientHeight"][t],
        r = ["paddingLeft", "paddingTop"][t],
        a = ["paddingRight", "paddingBottom"][t];
      if (null != e[n] && "auto" !== e[n]) return parseFloat(e[n]);
      var o = this.root,
        s = document.defaultView.getComputedStyle(o);
      return (o[i] || Si(s[n]) || Si(o.style[n])) - (Si(s[r]) || 0) - (Si(s[a]) || 0) | 0
    },
    pathToImage: function(t, e) {
      e = e || this.dpr;
      var n = document.createElement("canvas"),
        i = n.getContext("2d"),
        r = t.getBoundingRect(),
        a = t.style,
        o = a.shadowBlur * e,
        s = a.shadowOffsetX * e,
        l = a.shadowOffsetY * e,
        u = a.hasStroke() ? a.lineWidth : 0,
        h = Math.max(u / 2, -s + o),
        c = Math.max(u / 2, s + o),
        f = Math.max(u / 2, -l + o),
        d = Math.max(u / 2, l + o),
        p = r.width + h + c,
        g = r.height + f + d;
      n.width = p * e, n.height = g * e, i.scale(e, e), i.clearRect(0, 0, p, g), i.dpr = e;
      var v = {
        position: t.position,
        rotation: t.rotation,
        scale: t.scale
      };
      t.position = [h - r.x, f - r.y], t.rotation = 0, t.scale = [1, 1], t.updateTransform(), t && t.brush(i);
      var m = bi,
        y = new m({
          style: {
            x: 0,
            y: 0,
            image: n
          }
        });
      return null != v.position && (y.position = t.position = v.position), null != v.rotation && (y.rotation = t.rotation = v.rotation), null != v.scale && (y.scale = t.scale = v.scale), y
    }
  };
  var ip = function(t) {
    t = t || {}, this.stage = t.stage || {}, this.onframe = t.onframe || function() {}, this._clips = [], this._running = !1, this._time, this._pausedTime, this._pauseStart, this._paused = !1, kf.call(this)
  };
  ip.prototype = {
    constructor: ip,
    addClip: function(t) {
      this._clips.push(t)
    },
    addAnimator: function(t) {
      t.animation = this;
      for (var e = t.getClips(), n = 0; n < e.length; n++) this.addClip(e[n])
    },
    removeClip: function(t) {
      var e = u(this._clips, t);
      e >= 0 && this._clips.splice(e, 1)
    },
    removeAnimator: function(t) {
      for (var e = t.getClips(), n = 0; n < e.length; n++) this.removeClip(e[n]);
      t.animation = null
    },
    _update: function() {
      for (var t = (new Date).getTime() - this._pausedTime, e = t - this._time, n = this._clips, i = n.length, r = [], a = [], o = 0; i > o; o++) {
        var s = n[o],
          l = s.step(t, e);
        l && (r.push(l), a.push(s))
      }
      for (var o = 0; i > o;) n[o]._needsRemove ? (n[o] = n[i - 1], n.pop(), i--) : o++;
      i = r.length;
      for (var o = 0; i > o; o++) a[o].fire(r[o]);
      this._time = t, this.onframe(e), this.trigger("frame", e), this.stage.update && this.stage.update()
    },
    _startLoop: function() {
      function t() {
        e._running && (Ed(t), !e._paused && e._update())
      }
      var e = this;
      this._running = !0, Ed(t)
    },
    start: function() {
      this._time = (new Date).getTime(), this._pausedTime = 0, this._startLoop()
    },
    stop: function() {
      this._running = !1
    },
    pause: function() {
      this._paused || (this._pauseStart = (new Date).getTime(), this._paused = !0)
    },
    resume: function() {
      this._paused && (this._pausedTime += (new Date).getTime() - this._pauseStart, this._paused = !1)
    },
    clear: function() {
      this._clips = []
    },
    isFinished: function() {
      return !this._clips.length
    },
    animate: function(t, e) {
      e = e || {};
      var n = new ld(t, e.loop, e.getter, e.setter);
      return this.addAnimator(n), n
    }
  }, c(ip, kf);
  var rp = 300,
    ap = ["click", "dblclick", "mousewheel", "mouseout", "mouseup", "mousedown", "mousemove", "contextmenu"],
    op = ["touchstart", "touchend", "touchmove"],
    sp = {
      pointerdown: 1,
      pointerup: 1,
      pointermove: 1,
      pointerout: 1
    },
    lp = p(ap, function(t) {
      var e = t.replace("mouse", "pointer");
      return sp[e] ? e : t
    }),
    up = {
      mousemove: function(t) {
        t = ye(this.dom, t), this.trigger("mousemove", t)
      },
      mouseout: function(t) {
        t = ye(this.dom, t);
        var e = t.toElement || t.relatedTarget;
        if (e !== this.dom)
          for (; e && 9 !== e.nodeType;) {
            if (e === this.dom) return;
            e = e.parentNode
          }
        this.trigger("mouseout", t)
      },
      touchstart: function(t) {
        t = ye(this.dom, t), t.zrByTouch = !0, this._lastTouchMoment = new Date, this.handler.processGesture(this, t, "start"), up.mousemove.call(this, t), up.mousedown.call(this, t), Di(this)
      },
      touchmove: function(t) {
        t = ye(this.dom, t), t.zrByTouch = !0, this.handler.processGesture(this, t, "change"), up.mousemove.call(this, t), Di(this)
      },
      touchend: function(t) {
        t = ye(this.dom, t), t.zrByTouch = !0, this.handler.processGesture(this, t, "end"), up.mouseup.call(this, t), +new Date - this._lastTouchMoment < rp && up.click.call(this, t), Di(this)
      },
      pointerdown: function(t) {
        up.mousedown.call(this, t)
      },
      pointermove: function(t) {
        Pi(t) || up.mousemove.call(this, t)
      },
      pointerup: function(t) {
        up.mouseup.call(this, t)
      },
      pointerout: function(t) {
        Pi(t) || up.mouseout.call(this, t)
      }
    };
  d(["click", "mousedown", "mouseup", "mousewheel", "dblclick", "contextmenu"], function(t) {
    up[t] = function(e) {
      e = ye(this.dom, e), this.trigger(t, e)
    }
  });
  var hp = Oi.prototype;
  hp.dispose = function() {
    for (var t = ap.concat(op), e = 0; e < t.length; e++) {
      var n = t[e];
      xe(this.dom, Ai(n), this._handlers[n])
    }
  }, hp.setCursor = function(t) {
    this.dom.style && (this.dom.style.cursor = t || "default")
  }, c(Oi, kf);
  var cp = ! of .canvasSupported,
    fp = {
      canvas: np
    },
    dp = {},
    pp = "4.1.1",
    gp = function(t, e, n) {
      n = n || {}, this.dom = e, this.id = t;
      var i = this,
        r = new bd,
        a = n.renderer;
      if (cp) {
        if (!fp.vml) throw new Error("You need to require 'zrender/vml/vml' to support IE8");
        a = "vml"
      } else a && fp[a] || (a = "canvas");
      var o = new fp[a](e, r, n, t);
      this.storage = r, this.painter = o;
      var s = of .node || of .worker ? null : new Oi(o.getViewportRoot());
      this.handler = new Ff(r, o, s, o.root), this.animation = new ip({
        stage: {
          update: y(this.flush, this)
        }
      }), this.animation.start(), this._needsRefresh;
      var l = r.delFromStorage,
        u = r.addToStorage;
      r.delFromStorage = function(t) {
        l.call(r, t), t && t.removeSelfFromZr(i)
      }, r.addToStorage = function(t) {
        u.call(r, t), t.addSelfToZr(i)
      }
    };
  gp.prototype = {
    constructor: gp,
    getId: function() {
      return this.id
    },
    add: function(t) {
      this.storage.addRoot(t), this._needsRefresh = !0
    },
    remove: function(t) {
      this.storage.delRoot(t), this._needsRefresh = !0
    },
    configLayer: function(t, e) {
      this.painter.configLayer && this.painter.configLayer(t, e), this._needsRefresh = !0
    },
    setBackgroundColor: function(t) {
      this.painter.setBackgroundColor && this.painter.setBackgroundColor(t), this._needsRefresh = !0
    },
    refreshImmediately: function() {
      this._needsRefresh = this._needsRefreshHover = !1, this.painter.refresh(), this._needsRefresh = this._needsRefreshHover = !1
    },
    refresh: function() {
      this._needsRefresh = !0
    },
    flush: function() {
      var t;
      this._needsRefresh && (t = !0, this.refreshImmediately()), this._needsRefreshHover && (t = !0, this.refreshHoverImmediately()), t && this.trigger("rendered")
    },
    addHover: function(t, e) {
      if (this.painter.addHover) {
        var n = this.painter.addHover(t, e);
        return this.refreshHover(), n
      }
    },
    removeHover: function(t) {
      this.painter.removeHover && (this.painter.removeHover(t), this.refreshHover())
    },
    clearHover: function() {
      this.painter.clearHover && (this.painter.clearHover(), this.refreshHover())
    },
    refreshHover: function() {
      this._needsRefreshHover = !0
    },
    refreshHoverImmediately: function() {
      this._needsRefreshHover = !1, this.painter.refreshHover && this.painter.refreshHover()
    },
    resize: function(t) {
      t = t || {}, this.painter.resize(t.width, t.height), this.handler.resize()
    },
    clearAnimation: function() {
      this.animation.clear()
    },
    getWidth: function() {
      return this.painter.getWidth()
    },
    getHeight: function() {
      return this.painter.getHeight()
    },
    pathToImage: function(t, e) {
      return this.painter.pathToImage(t, e)
    },
    setCursorStyle: function(t) {
      this.handler.setCursorStyle(t)
    },
    findHover: function(t, e) {
      return this.handler.findHover(t, e)
    },
    on: function(t, e, n) {
      this.handler.on(t, e, n)
    },
    off: function(t, e) {
      this.handler.off(t, e)
    },
    trigger: function(t, e) {
      this.handler.trigger(t, e)
    },
    clear: function() {
      this.storage.delRoot(), this.painter.clear()
    },
    dispose: function() {
      this.animation.stop(), this.clear(), this.storage.dispose(), this.painter.dispose(), this.handler.dispose(), this.animation = this.storage = this.painter = this.handler = null, Ni(this.id)
    }
  };
  var vp = (Object.freeze || Object)({
      version: pp,
      init: Ei,
      dispose: Bi,
      getInstance: Ri,
      registerPainter: zi
    }),
    mp = d,
    yp = S,
    _p = x,
    xp = "series\x00",
    wp = ["fontStyle", "fontWeight", "fontSize", "fontFamily", "rich", "tag", "color", "textBorderColor", "textBorderWidth", "width", "height", "lineHeight", "align", "verticalAlign", "baseline", "shadowColor", "shadowBlur", "shadowOffsetX", "shadowOffsetY", "textShadowColor", "textShadowBlur", "textShadowOffsetX", "textShadowOffsetY", "backgroundColor", "borderColor", "borderWidth", "borderRadius", "padding"],
    bp = 0,
    Sp = ".",
    Mp = "___EC__COMPONENT__CONTAINER___",
    Tp = 0,
    Cp = function(t) {
      for (var e = 0; e < t.length; e++) t[e][1] || (t[e][1] = t[e][0]);
      return function(e, n, i) {
        for (var r = {}, a = 0; a < t.length; a++) {
          var o = t[a][1];
          if (!(n && u(n, o) >= 0 || i && u(i, o) < 0)) {
            var s = e.getShallow(o);
            null != s && (r[t[a][0]] = s)
          }
        }
        return r
      }
    },
    Ip = Cp([
      ["lineWidth", "width"],
      ["stroke", "color"],
      ["opacity"],
      ["shadowBlur"],
      ["shadowOffsetX"],
      ["shadowOffsetY"],
      ["shadowColor"]
    ]),
    kp = {
      getLineStyle: function(t) {
        var e = Ip(this, t);
        return e.lineDash = this.getLineDash(e.lineWidth), e
      },
      getLineDash: function(t) {
        null == t && (t = 1);
        var e = this.get("type"),
          n = Math.max(t, 2),
          i = 4 * t;
        return "solid" === e || null == e ? !1 : "dashed" === e ? [i, i] : [n, n]
      }
    },
    Ap = Cp([
      ["fill", "color"],
      ["shadowBlur"],
      ["shadowOffsetX"],
      ["shadowOffsetY"],
      ["opacity"],
      ["shadowColor"]
    ]),
    Dp = {
      getAreaStyle: function(t, e) {
        return Ap(this, t, e)
      }
    },
    Pp = Math.pow,
    Lp = Math.sqrt,
    Op = 1e-8,
    Ep = 1e-4,
    Bp = Lp(3),
    Rp = 1 / 3,
    zp = H(),
    Np = H(),
    Fp = H(),
    Vp = Math.min,
    Hp = Math.max,
    Wp = Math.sin,
    Gp = Math.cos,
    Xp = 2 * Math.PI,
    qp = H(),
    Up = H(),
    jp = H(),
    Yp = [],
    Zp = [],
    $p = {
      M: 1,
      L: 2,
      C: 3,
      Q: 4,
      A: 5,
      Z: 6,
      R: 7
    },
    Kp = [],
    Qp = [],
    Jp = [],
    tg = [],
    eg = Math.min,
    ng = Math.max,
    ig = Math.cos,
    rg = Math.sin,
    ag = Math.sqrt,
    og = Math.abs,
    sg = "undefined" != typeof Float32Array,
    lg = function(t) {
      this._saveData = !t, this._saveData && (this.data = []), this._ctx = null
    };
  lg.prototype = {
    constructor: lg,
    _xi: 0,
    _yi: 0,
    _x0: 0,
    _y0: 0,
    _ux: 0,
    _uy: 0,
    _len: 0,
    _lineDash: null,
    _dashOffset: 0,
    _dashIdx: 0,
    _dashSum: 0,
    setScale: function(t, e, n) {
      n = n || 0, this._ux = og(n / cd / t) || 0, this._uy = og(n / cd / e) || 0
    },
    getContext: function() {
      return this._ctx
    },
    beginPath: function(t) {
      return this._ctx = t, t && t.beginPath(), t && (this.dpr = t.dpr), this._saveData && (this._len = 0), this._lineDash && (this._lineDash = null, this._dashOffset = 0), this
    },
    moveTo: function(t, e) {
      return this.addData($p.M, t, e), this._ctx && this._ctx.moveTo(t, e), this._x0 = t, this._y0 = e, this._xi = t, this._yi = e, this
    },
    lineTo: function(t, e) {
      var n = og(t - this._xi) > this._ux || og(e - this._yi) > this._uy || this._len < 5;
      return this.addData($p.L, t, e), this._ctx && n && (this._needsDash() ? this._dashedLineTo(t, e) : this._ctx.lineTo(t, e)), n && (this._xi = t, this._yi = e), this
    },
    bezierCurveTo: function(t, e, n, i, r, a) {
      return this.addData($p.C, t, e, n, i, r, a), this._ctx && (this._needsDash() ? this._dashedBezierTo(t, e, n, i, r, a) : this._ctx.bezierCurveTo(t, e, n, i, r, a)), this._xi = r, this._yi = a, this
    },
    quadraticCurveTo: function(t, e, n, i) {
      return this.addData($p.Q, t, e, n, i), this._ctx && (this._needsDash() ? this._dashedQuadraticTo(t, e, n, i) : this._ctx.quadraticCurveTo(t, e, n, i)), this._xi = n, this._yi = i, this
    },
    arc: function(t, e, n, i, r, a) {
      return this.addData($p.A, t, e, n, n, i, r - i, 0, a ? 0 : 1), this._ctx && this._ctx.arc(t, e, n, i, r, a), this._xi = ig(r) * n + t, this._yi = rg(r) * n + e, this
    },
    arcTo: function(t, e, n, i, r) {
      return this._ctx && this._ctx.arcTo(t, e, n, i, r), this
    },
    rect: function(t, e, n, i) {
      return this._ctx && this._ctx.rect(t, e, n, i), this.addData($p.R, t, e, n, i), this
    },
    closePath: function() {
      this.addData($p.Z);
      var t = this._ctx,
        e = this._x0,
        n = this._y0;
      return t && (this._needsDash() && this._dashedLineTo(e, n), t.closePath()), this._xi = e, this._yi = n, this
    },
    fill: function(t) {
      t && t.fill(), this.toStatic()
    },
    stroke: function(t) {
      t && t.stroke(), this.toStatic()
    },
    setLineDash: function(t) {
      if (t instanceof Array) {
        this._lineDash = t, this._dashIdx = 0;
        for (var e = 0, n = 0; n < t.length; n++) e += t[n];
        this._dashSum = e
      }
      return this
    },
    setLineDashOffset: function(t) {
      return this._dashOffset = t, this
    },
    len: function() {
      return this._len
    },
    setData: function(t) {
      var e = t.length;
      this.data && this.data.length === e || !sg || (this.data = new Float32Array(e));
      for (var n = 0; e > n; n++) this.data[n] = t[n];
      this._len = e
    },
    appendPath: function(t) {
      t instanceof Array || (t = [t]);
      for (var e = t.length, n = 0, i = this._len, r = 0; e > r; r++) n += t[r].len();
      sg && this.data instanceof Float32Array && (this.data = new Float32Array(i + n));
      for (var r = 0; e > r; r++)
        for (var a = t[r].data, o = 0; o < a.length; o++) this.data[i++] = a[o];
      this._len = i
    },
    addData: function(t) {
      if (this._saveData) {
        var e = this.data;
        this._len + arguments.length > e.length && (this._expandData(), e = this.data);
        for (var n = 0; n < arguments.length; n++) e[this._len++] = arguments[n];
        this._prevCmd = t
      }
    },
    _expandData: function() {
      if (!(this.data instanceof Array)) {
        for (var t = [], e = 0; e < this._len; e++) t[e] = this.data[e];
        this.data = t
      }
    },
    _needsDash: function() {
      return this._lineDash
    },
    _dashedLineTo: function(t, e) {
      var n, i, r = this._dashSum,
        a = this._dashOffset,
        o = this._lineDash,
        s = this._ctx,
        l = this._xi,
        u = this._yi,
        h = t - l,
        c = e - u,
        f = ag(h * h + c * c),
        d = l,
        p = u,
        g = o.length;
      for (h /= f, c /= f, 0 > a && (a = r + a), a %= r, d -= a * h, p -= a * c; h > 0 && t >= d || 0 > h && d >= t || 0 === h && (c > 0 && e >= p || 0 > c && p >= e);) i = this._dashIdx, n = o[i], d += h * n, p += c * n, this._dashIdx = (i + 1) % g, h > 0 && l > d || 0 > h && d > l || c > 0 && u > p || 0 > c && p > u || s[i % 2 ? "moveTo" : "lineTo"](h >= 0 ? eg(d, t) : ng(d, t), c >= 0 ? eg(p, e) : ng(p, e));
      h = d - t, c = p - e, this._dashOffset = -ag(h * h + c * c)
    },
    _dashedBezierTo: function(t, e, n, i, r, a) {
      var o, s, l, u, h, c = this._dashSum,
        f = this._dashOffset,
        d = this._lineDash,
        p = this._ctx,
        g = this._xi,
        v = this._yi,
        m = ur,
        y = 0,
        _ = this._dashIdx,
        x = d.length,
        w = 0;
      for (0 > f && (f = c + f), f %= c, o = 0; 1 > o; o += .1) s = m(g, t, n, r, o + .1) - m(g, t, n, r, o), l = m(v, e, i, a, o + .1) - m(v, e, i, a, o), y += ag(s * s + l * l);
      for (; x > _ && (w += d[_], !(w > f)); _++);
      for (o = (w - f) / y; 1 >= o;) u = m(g, t, n, r, o), h = m(v, e, i, a, o), _ % 2 ? p.moveTo(u, h) : p.lineTo(u, h), o += d[_] / y, _ = (_ + 1) % x;
      _ % 2 !== 0 && p.lineTo(r, a), s = r - u, l = a - h, this._dashOffset = -ag(s * s + l * l)
    },
    _dashedQuadraticTo: function(t, e, n, i) {
      var r = n,
        a = i;
      n = (n + 2 * t) / 3, i = (i + 2 * e) / 3, t = (this._xi + 2 * t) / 3, e = (this._yi + 2 * e) / 3, this._dashedBezierTo(t, e, n, i, r, a)
    },
    toStatic: function() {
      var t = this.data;
      t instanceof Array && (t.length = this._len, sg && (this.data = new Float32Array(t)))
    },
    getBoundingRect: function() {
      Kp[0] = Kp[1] = Jp[0] = Jp[1] = Number.MAX_VALUE, Qp[0] = Qp[1] = tg[0] = tg[1] = -Number.MAX_VALUE;
      for (var t = this.data, e = 0, n = 0, i = 0, r = 0, a = 0; a < t.length;) {
        var o = t[a++];
        switch (1 === a && (e = t[a], n = t[a + 1], i = e, r = n), o) {
          case $p.M:
            i = t[a++], r = t[a++], e = i, n = r, Jp[0] = i, Jp[1] = r, tg[0] = i, tg[1] = r;
            break;
          case $p.L:
            br(e, n, t[a], t[a + 1], Jp, tg), e = t[a++], n = t[a++];
            break;
          case $p.C:
            Sr(e, n, t[a++], t[a++], t[a++], t[a++], t[a], t[a + 1], Jp, tg), e = t[a++], n = t[a++];
            break;
          case $p.Q:
            Mr(e, n, t[a++], t[a++], t[a], t[a + 1], Jp, tg), e = t[a++], n = t[a++];
            break;
          case $p.A:
            var s = t[a++],
              l = t[a++],
              u = t[a++],
              h = t[a++],
              c = t[a++],
              f = t[a++] + c;
            a += 1;
            var d = 1 - t[a++];
            1 === a && (i = ig(c) * u + s, r = rg(c) * h + l), Tr(s, l, u, h, c, f, d, Jp, tg), e = ig(f) * u + s, n = rg(f) * h + l;
            break;
          case $p.R:
            i = e = t[a++], r = n = t[a++];
            var p = t[a++],
              g = t[a++];
            br(i, r, i + p, r + g, Jp, tg);
            break;
          case $p.Z:
            e = i, n = r
        }
        oe(Kp, Kp, Jp), se(Qp, Qp, tg)
      }
      return 0 === a && (Kp[0] = Kp[1] = Qp[0] = Qp[1] = 0), new wn(Kp[0], Kp[1], Qp[0] - Kp[0], Qp[1] - Kp[1])
    },
    rebuildPath: function(t) {
      for (var e, n, i, r, a, o, s = this.data, l = this._ux, u = this._uy, h = this._len, c = 0; h > c;) {
        var f = s[c++];
        switch (1 === c && (i = s[c], r = s[c + 1], e = i, n = r), f) {
          case $p.M:
            e = i = s[c++], n = r = s[c++], t.moveTo(i, r);
            break;
          case $p.L:
            a = s[c++], o = s[c++], (og(a - i) > l || og(o - r) > u || c === h - 1) && (t.lineTo(a, o), i = a, r = o);
            break;
          case $p.C:
            t.bezierCurveTo(s[c++], s[c++], s[c++], s[c++], s[c++], s[c++]), i = s[c - 2], r = s[c - 1];
            break;
          case $p.Q:
            t.quadraticCurveTo(s[c++], s[c++], s[c++], s[c++]), i = s[c - 2], r = s[c - 1];
            break;
          case $p.A:
            var d = s[c++],
              p = s[c++],
              g = s[c++],
              v = s[c++],
              m = s[c++],
              y = s[c++],
              _ = s[c++],
              x = s[c++],
              w = g > v ? g : v,
              b = g > v ? 1 : g / v,
              S = g > v ? v / g : 1,
              M = Math.abs(g - v) > .001,
              T = m + y;
            M ? (t.translate(d, p), t.rotate(_), t.scale(b, S), t.arc(0, 0, w, m, T, 1 - x), t.scale(1 / b, 1 / S), t.rotate(-_), t.translate(-d, -p)) : t.arc(d, p, w, m, T, 1 - x), 1 === c && (e = ig(m) * g + d, n = rg(m) * v + p), i = ig(T) * g + d, r = rg(T) * v + p;
            break;
          case $p.R:
            e = i = s[c], n = r = s[c + 1], t.rect(s[c++], s[c++], s[c++], s[c++]);
            break;
          case $p.Z:
            t.closePath(), i = e, r = n
        }
      }
    }
  }, lg.CMD = $p;
  var ug = 2 * Math.PI,
    hg = 2 * Math.PI,
    cg = lg.CMD,
    fg = 2 * Math.PI,
    dg = 1e-4,
    pg = [-1, -1, -1],
    gg = [-1, -1],
    vg = Ld.prototype.getCanvasPattern,
    mg = Math.abs,
    yg = new lg(!0);
  Vr.prototype = {
    constructor: Vr,
    type: "path",
    __dirtyPath: !0,
    strokeContainThreshold: 5,
    segmentIgnoreThreshold: 0,
    subPixelOptimize: !1,
    brush: function(t, e) {
      var n = this.style,
        i = this.path || yg,
        r = n.hasStroke(),
        a = n.hasFill(),
        o = n.fill,
        s = n.stroke,
        l = a && !!o.colorStops,
        u = r && !!s.colorStops,
        h = a && !!o.image,
        c = r && !!s.image;
      if (n.bind(t, this, e), this.setTransform(t), this.__dirty) {
        var f;
        l && (f = f || this.getBoundingRect(), this._fillGradient = n.getGradient(t, o, f)), u && (f = f || this.getBoundingRect(), this._strokeGradient = n.getGradient(t, s, f))
      }
      l ? t.fillStyle = this._fillGradient : h && (t.fillStyle = vg.call(o, t)), u ? t.strokeStyle = this._strokeGradient : c && (t.strokeStyle = vg.call(s, t));
      var d = n.lineDash,
        p = n.lineDashOffset,
        g = !!t.setLineDash,
        v = this.getGlobalScale();
      if (i.setScale(v[0], v[1], this.segmentIgnoreThreshold), this.__dirtyPath || d && !g && r ? (i.beginPath(t), d && !g && (i.setLineDash(d), i.setLineDashOffset(p)), this.buildPath(i, this.shape, !1), this.path && (this.__dirtyPath = !1)) : (t.beginPath(), this.path.rebuildPath(t)), a)
        if (null != n.fillOpacity) {
          var m = t.globalAlpha;
          t.globalAlpha = n.fillOpacity * n.opacity, i.fill(t), t.globalAlpha = m
        } else i.fill(t);
      if (d && g && (t.setLineDash(d), t.lineDashOffset = p), r)
        if (null != n.strokeOpacity) {
          var m = t.globalAlpha;
          t.globalAlpha = n.strokeOpacity * n.opacity, i.stroke(t), t.globalAlpha = m
        } else i.stroke(t);
      d && g && t.setLineDash([]), null != n.text && (this.restoreTransform(t), this.drawRectText(t, this.getBoundingRect()))
    },
    buildPath: function() {},
    createPathProxy: function() {
      this.path = new lg
    },
    getBoundingRect: function() {
      var t = this._rect,
        e = this.style,
        n = !t;
      if (n) {
        var i = this.path;
        i || (i = this.path = new lg), this.__dirtyPath && (i.beginPath(), this.buildPath(i, this.shape, !1)), t = i.getBoundingRect()
      }
      if (this._rect = t, e.hasStroke()) {
        var r = this._rectWithStroke || (this._rectWithStroke = t.clone());
        if (this.__dirty || n) {
          r.copy(t);
          var a = e.lineWidth,
            o = e.strokeNoScale ? this.getLineScale() : 1;
          e.hasFill() || (a = Math.max(a, this.strokeContainThreshold || 4)), o > 1e-10 && (r.width += a / o, r.height += a / o, r.x -= a / o / 2, r.y -= a / o / 2)
        }
        return r
      }
      return t
    },
    contain: function(t, e) {
      var n = this.transformCoordToLocal(t, e),
        i = this.getBoundingRect(),
        r = this.style;
      if (t = n[0], e = n[1], i.contain(t, e)) {
        var a = this.path.data;
        if (r.hasStroke()) {
          var o = r.lineWidth,
            s = r.strokeNoScale ? this.getLineScale() : 1;
          if (s > 1e-10 && (r.hasFill() || (o = Math.max(o, this.strokeContainThreshold)), Fr(a, o / s, t, e))) return !0
        }
        if (r.hasFill()) return Nr(a, t, e)
      }
      return !1
    },
    dirty: function(t) {
      null == t && (t = !0), t && (this.__dirtyPath = t, this._rect = null), this.__dirty = this.__dirtyText = !0, this.__zr && this.__zr.refresh(), this.__clipTarget && this.__clipTarget.dirty()
    },
    animateShape: function(t) {
      return this.animate("shape", t)
    },
    attrKV: function(t, e) {
      "shape" === t ? (this.setShape(e), this.__dirtyPath = !0, this._rect = null) : wi.prototype.attrKV.call(this, t, e)
    },
    setShape: function(t, e) {
      var n = this.shape;
      if (n) {
        if (S(t))
          for (var i in t) t.hasOwnProperty(i) && (n[i] = t[i]);
        else n[t] = e;
        this.dirty(!0)
      }
      return this
    },
    getLineScale: function() {
      var t = this.transform;
      return t && mg(t[0] - 1) > 1e-10 && mg(t[3] - 1) > 1e-10 ? Math.sqrt(mg(t[0] * t[3] - t[2] * t[1])) : 1
    }
  }, Vr.extend = function(t) {
    var e = function(e) {
      Vr.call(this, e), t.style && this.style.extendFrom(t.style, !1);
      var n = t.shape;
      if (n) {
        this.shape = this.shape || {};
        var i = this.shape;
        for (var r in n) !i.hasOwnProperty(r) && n.hasOwnProperty(r) && (i[r] = n[r])
      }
      t.init && t.init.call(this, e)
    };
    h(e, Vr);
    for (var n in t) "style" !== n && "shape" !== n && (e.prototype[n] = t[n]);
    return e
  }, h(Vr, wi);
  var _g = lg.CMD,
    xg = [
      [],
      [],
      []
    ],
    wg = Math.sqrt,
    bg = Math.atan2,
    Sg = function(t, e) {
      var n, i, r, a, o, s, l = t.data,
        u = _g.M,
        h = _g.C,
        c = _g.L,
        f = _g.R,
        d = _g.A,
        p = _g.Q;
      for (r = 0, a = 0; r < l.length;) {
        switch (n = l[r++], a = r, i = 0, n) {
          case u:
            i = 1;
            break;
          case c:
            i = 1;
            break;
          case h:
            i = 3;
            break;
          case p:
            i = 2;
            break;
          case d:
            var g = e[4],
              v = e[5],
              m = wg(e[0] * e[0] + e[1] * e[1]),
              y = wg(e[2] * e[2] + e[3] * e[3]),
              _ = bg(-e[1] / y, e[0] / m);
            l[r] *= m, l[r++] += g, l[r] *= y, l[r++] += v, l[r++] *= m, l[r++] *= y, l[r++] += _, l[r++] += _, r += 2, a = r;
            break;
          case f:
            s[0] = l[r++], s[1] = l[r++], ae(s, s, e), l[a++] = s[0], l[a++] = s[1], s[0] += l[r++], s[1] += l[r++], ae(s, s, e), l[a++] = s[0], l[a++] = s[1]
        }
        for (o = 0; i > o; o++) {
          var s = xg[o];
          s[0] = l[r++], s[1] = l[r++], ae(s, s, e), l[a++] = s[0], l[a++] = s[1]
        }
      }
    },
    Mg = Math.sqrt,
    Tg = Math.sin,
    Cg = Math.cos,
    Ig = Math.PI,
    kg = function(t) {
      return Math.sqrt(t[0] * t[0] + t[1] * t[1])
    },
    Ag = function(t, e) {
      return (t[0] * e[0] + t[1] * e[1]) / (kg(t) * kg(e))
    },
    Dg = function(t, e) {
      return (t[0] * e[1] < t[1] * e[0] ? -1 : 1) * Math.acos(Ag(t, e))
    },
    Pg = /([mlvhzcqtsa])([^mlvhzcqtsa]*)/gi,
    Lg = /-?([0-9]*\.)?[0-9]+([eE]-?[0-9]+)?/g,
    Og = function(t) {
      wi.call(this, t)
    };
  Og.prototype = {
    constructor: Og,
    type: "text",
    brush: function(t, e) {
      var n = this.style;
      this.__dirty && ii(n, !0), n.fill = n.stroke = n.shadowBlur = n.shadowColor = n.shadowOffsetX = n.shadowOffsetY = null;
      var i = n.text;
      return null != i && (i += ""), xi(i, n) ? (this.setTransform(t), ai(this, t, i, n, null, e), void this.restoreTransform(t)) : void(t.__attrCachedBy = Td.NONE)
    },
    getBoundingRect: function() {
      var t = this.style;
      if (this.__dirty && ii(t, !0), !this._rect) {
        var e = t.text;
        null != e ? e += "" : e = "";
        var n = Vn(t.text + "", t.font, t.textAlign, t.textVerticalAlign, t.textPadding, t.textLineHeight, t.rich);
        if (n.x += t.x || 0, n.y += t.y || 0, vi(t.textStroke, t.textStrokeWidth)) {
          var i = t.textStrokeWidth;
          n.x -= i / 2, n.y -= i / 2, n.width += i, n.height += i
        }
        this._rect = n
      }
      return this._rect
    }
  }, h(Og, wi);
  var Eg = Vr.extend({
      type: "circle",
      shape: {
        cx: 0,
        cy: 0,
        r: 0
      },
      buildPath: function(t, e, n) {
        n && t.moveTo(e.cx + e.r, e.cy), t.arc(e.cx, e.cy, e.r, 0, 2 * Math.PI, !0)
      }
    }),
    Bg = [
      ["shadowBlur", 0],
      ["shadowColor", "#000"],
      ["shadowOffsetX", 0],
      ["shadowOffsetY", 0]
    ],
    Rg = function(t) {
      return of.browser.ie && of .browser.version >= 11 ? function() {
        var e, n = this.__clipPaths,
          i = this.style;
        if (n)
          for (var r = 0; r < n.length; r++) {
            var a = n[r],
              o = a && a.shape,
              s = a && a.type;
            if (o && ("sector" === s && o.startAngle === o.endAngle || "rect" === s && (!o.width || !o.height))) {
              for (var l = 0; l < Bg.length; l++) Bg[l][2] = i[Bg[l][0]], i[Bg[l][0]] = Bg[l][1];
              e = !0;
              break
            }
          }
        if (t.apply(this, arguments), e)
          for (var l = 0; l < Bg.length; l++) i[Bg[l][0]] = Bg[l][2]
      } : t
    },
    zg = Vr.extend({
      type: "sector",
      shape: {
        cx: 0,
        cy: 0,
        r0: 0,
        r: 0,
        startAngle: 0,
        endAngle: 2 * Math.PI,
        clockwise: !0
      },
      brush: Rg(Vr.prototype.brush),
      buildPath: function(t, e) {
        var n = e.cx,
          i = e.cy,
          r = Math.max(e.r0 || 0, 0),
          a = Math.max(e.r, 0),
          o = e.startAngle,
          s = e.endAngle,
          l = e.clockwise,
          u = Math.cos(o),
          h = Math.sin(o);
        t.moveTo(u * r + n, h * r + i), t.lineTo(u * a + n, h * a + i), t.arc(n, i, a, o, s, !l), t.lineTo(Math.cos(s) * r + n, Math.sin(s) * r + i), 0 !== r && t.arc(n, i, r, s, o, l), t.closePath()
      }
    }),
    Ng = Vr.extend({
      type: "ring",
      shape: {
        cx: 0,
        cy: 0,
        r: 0,
        r0: 0
      },
      buildPath: function(t, e) {
        var n = e.cx,
          i = e.cy,
          r = 2 * Math.PI;
        t.moveTo(n + e.r, i), t.arc(n, i, e.r, 0, r, !1), t.moveTo(n + e.r0, i), t.arc(n, i, e.r0, 0, r, !0)
      }
    }),
    Fg = function(t, e) {
      for (var n = t.length, i = [], r = 0, a = 1; n > a; a++) r += ee(t[a - 1], t[a]);
      var o = r / 2;
      o = n > o ? n : o;
      for (var a = 0; o > a; a++) {
        var s, l, u, h = a / (o - 1) * (e ? n : n - 1),
          c = Math.floor(h),
          f = h - c,
          d = t[c % n];
        e ? (s = t[(c - 1 + n) % n], l = t[(c + 1) % n], u = t[(c + 2) % n]) : (s = t[0 === c ? c : c - 1], l = t[c > n - 2 ? n - 1 : c + 1], u = t[c > n - 3 ? n - 1 : c + 2]);
        var p = f * f,
          g = f * p;
        i.push([jr(s[0], d[0], l[0], u[0], f, p, g), jr(s[1], d[1], l[1], u[1], f, p, g)])
      }
      return i
    },
    Vg = function(t, e, n, i) {
      var r, a, o, s, l = [],
        u = [],
        h = [],
        c = [];
      if (i) {
        o = [1 / 0, 1 / 0], s = [-1 / 0, -1 / 0];
        for (var f = 0, d = t.length; d > f; f++) oe(o, o, t[f]), se(s, s, t[f]);
        oe(o, o, i[0]), se(s, s, i[1])
      }
      for (var f = 0, d = t.length; d > f; f++) {
        var p = t[f];
        if (n) r = t[f ? f - 1 : d - 1], a = t[(f + 1) % d];
        else {
          if (0 === f || f === d - 1) {
            l.push(G(t[f]));
            continue
          }
          r = t[f - 1], a = t[f + 1]
        }
        j(u, a, r), J(u, u, e);
        var g = ee(p, r),
          v = ee(p, a),
          m = g + v;
        0 !== m && (g /= m, v /= m), J(h, u, -g), J(c, u, v);
        var y = q([], p, h),
          _ = q([], p, c);
        i && (se(y, y, o), oe(y, y, s), se(_, _, o), oe(_, _, s)), l.push(y), l.push(_)
      }
      return n && l.push(l.shift()), l
    },
    Hg = Vr.extend({
      type: "polygon",
      shape: {
        points: null,
        smooth: !1,
        smoothConstraint: null
      },
      buildPath: function(t, e) {
        Yr(t, e, !0)
      }
    }),
    Wg = Vr.extend({
      type: "polyline",
      shape: {
        points: null,
        smooth: !1,
        smoothConstraint: null
      },
      style: {
        stroke: "#000",
        fill: null
      },
      buildPath: function(t, e) {
        Yr(t, e, !1)
      }
    }),
    Gg = Math.round,
    Xg = {},
    qg = Vr.extend({
      type: "rect",
      shape: {
        r: 0,
        x: 0,
        y: 0,
        width: 0,
        height: 0
      },
      buildPath: function(t, e) {
        var n, i, r, a;
        this.subPixelOptimize ? ($r(Xg, e, this.style), n = Xg.x, i = Xg.y, r = Xg.width, a = Xg.height, Xg.r = e.r, e = Xg) : (n = e.x, i = e.y, r = e.width, a = e.height), e.r ? ni(t, e) : t.rect(n, i, r, a), t.closePath()
      }
    }),
    Ug = {},
    jg = Vr.extend({
      type: "line",
      shape: {
        x1: 0,
        y1: 0,
        x2: 0,
        y2: 0,
        percent: 1
      },
      style: {
        stroke: "#000",
        fill: null
      },
      buildPath: function(t, e) {
        var n, i, r, a;
        this.subPixelOptimize ? (Zr(Ug, e, this.style), n = Ug.x1, i = Ug.y1, r = Ug.x2, a = Ug.y2) : (n = e.x1, i = e.y1, r = e.x2, a = e.y2);
        var o = e.percent;
        0 !== o && (t.moveTo(n, i), 1 > o && (r = n * (1 - o) + r * o, a = i * (1 - o) + a * o), t.lineTo(r, a))
      },
      pointAt: function(t) {
        var e = this.shape;
        return [e.x1 * (1 - t) + e.x2 * t, e.y1 * (1 - t) + e.y2 * t]
      }
    }),
    Yg = [],
    Zg = Vr.extend({
      type: "bezier-curve",
      shape: {
        x1: 0,
        y1: 0,
        x2: 0,
        y2: 0,
        cpx1: 0,
        cpy1: 0,
        percent: 1
      },
      style: {
        stroke: "#000",
        fill: null
      },
      buildPath: function(t, e) {
        var n = e.x1,
          i = e.y1,
          r = e.x2,
          a = e.y2,
          o = e.cpx1,
          s = e.cpy1,
          l = e.cpx2,
          u = e.cpy2,
          h = e.percent;
        0 !== h && (t.moveTo(n, i), null == l || null == u ? (1 > h && (_r(n, o, r, h, Yg), o = Yg[1], r = Yg[2], _r(i, s, a, h, Yg), s = Yg[1], a = Yg[2]), t.quadraticCurveTo(o, s, r, a)) : (1 > h && (dr(n, o, l, r, h, Yg), o = Yg[1], l = Yg[2], r = Yg[3], dr(i, s, u, a, h, Yg), s = Yg[1], u = Yg[2], a = Yg[3]), t.bezierCurveTo(o, s, l, u, r, a)))
      },
      pointAt: function(t) {
        return Qr(this.shape, t, !1)
      },
      tangentAt: function(t) {
        var e = Qr(this.shape, t, !0);
        return te(e, e)
      }
    }),
    $g = Vr.extend({
      type: "arc",
      shape: {
        cx: 0,
        cy: 0,
        r: 0,
        startAngle: 0,
        endAngle: 2 * Math.PI,
        clockwise: !0
      },
      style: {
        stroke: "#000",
        fill: null
      },
      buildPath: function(t, e) {
        var n = e.cx,
          i = e.cy,
          r = Math.max(e.r, 0),
          a = e.startAngle,
          o = e.endAngle,
          s = e.clockwise,
          l = Math.cos(a),
          u = Math.sin(a);
        t.moveTo(l * r + n, u * r + i), t.arc(n, i, r, a, o, !s)
      }
    }),
    Kg = Vr.extend({
      type: "compound",
      shape: {
        paths: null
      },
      _updatePathDirty: function() {
        for (var t = this.__dirtyPath, e = this.shape.paths, n = 0; n < e.length; n++) t = t || e[n].__dirtyPath;
        this.__dirtyPath = t, this.__dirty = this.__dirty || t
      },
      beforeBrush: function() {
        this._updatePathDirty();
        for (var t = this.shape.paths || [], e = this.getGlobalScale(), n = 0; n < t.length; n++) t[n].path || t[n].createPathProxy(), t[n].path.setScale(e[0], e[1], t[n].segmentIgnoreThreshold)
      },
      buildPath: function(t, e) {
        for (var n = e.paths || [], i = 0; i < n.length; i++) n[i].buildPath(t, n[i].shape, !0)
      },
      afterBrush: function() {
        for (var t = this.shape.paths || [], e = 0; e < t.length; e++) t[e].__dirtyPath = !1
      },
      getBoundingRect: function() {
        return this._updatePathDirty(), Vr.prototype.getBoundingRect.call(this)
      }
    }),
    Qg = function(t) {
      this.colorStops = t || []
    };
  Qg.prototype = {
    constructor: Qg,
    addColorStop: function(t, e) {
      this.colorStops.push({
        offset: t,
        color: e
      })
    }
  };
  var Jg = function(t, e, n, i, r, a) {
    this.x = null == t ? 0 : t, this.y = null == e ? 0 : e, this.x2 = null == n ? 1 : n, this.y2 = null == i ? 0 : i, this.type = "linear", this.global = a || !1, Qg.call(this, r)
  };
  Jg.prototype = {
    constructor: Jg
  }, h(Jg, Qg);
  var tv = function(t, e, n, i, r) {
    this.x = null == t ? .5 : t, this.y = null == e ? .5 : e, this.r = null == n ? .5 : n, this.type = "radial", this.global = r || !1, Qg.call(this, i)
  };
  tv.prototype = {
    constructor: tv
  }, h(tv, Qg), Jr.prototype.incremental = !0, Jr.prototype.clearDisplaybles = function() {
    this._displayables = [], this._temporaryDisplayables = [], this._cursor = 0, this.dirty(), this.notClear = !1
  }, Jr.prototype.addDisplayable = function(t, e) {
    e ? this._temporaryDisplayables.push(t) : this._displayables.push(t), this.dirty()
  }, Jr.prototype.addDisplayables = function(t, e) {
    e = e || !1;
    for (var n = 0; n < t.length; n++) this.addDisplayable(t[n], e)
  }, Jr.prototype.eachPendingDisplayable = function(t) {
    for (var e = this._cursor; e < this._displayables.length; e++) t && t(this._displayables[e]);
    for (var e = 0; e < this._temporaryDisplayables.length; e++) t && t(this._temporaryDisplayables[e])
  }, Jr.prototype.update = function() {
    this.updateTransform();
    for (var t = this._cursor; t < this._displayables.length; t++) {
      var e = this._displayables[t];
      e.parent = this, e.update(), e.parent = null
    }
    for (var t = 0; t < this._temporaryDisplayables.length; t++) {
      var e = this._temporaryDisplayables[t];
      e.parent = this, e.update(), e.parent = null
    }
  }, Jr.prototype.brush = function(t) {
    for (var e = this._cursor; e < this._displayables.length; e++) {
      var n = this._displayables[e];
      n.beforeBrush && n.beforeBrush(t), n.brush(t, e === this._cursor ? null : this._displayables[e - 1]), n.afterBrush && n.afterBrush(t)
    }
    this._cursor = e;
    for (var e = 0; e < this._temporaryDisplayables.length; e++) {
      var n = this._temporaryDisplayables[e];
      n.beforeBrush && n.beforeBrush(t), n.brush(t, 0 === e ? null : this._temporaryDisplayables[e - 1]), n.afterBrush && n.afterBrush(t)
    }
    this._temporaryDisplayables = [], this.notClear = !0
  };
  var ev = [];
  Jr.prototype.getBoundingRect = function() {
    if (!this._rect) {
      for (var t = new wn(1 / 0, 1 / 0, -1 / 0, -1 / 0), e = 0; e < this._displayables.length; e++) {
        var n = this._displayables[e],
          i = n.getBoundingRect().clone();
        n.needLocalTransform() && i.applyTransform(n.getLocalTransform(ev)), t.union(i)
      }
      this._rect = t
    }
    return this._rect
  }, Jr.prototype.contain = function(t, e) {
    var n = this.transformCoordToLocal(t, e),
      i = this.getBoundingRect();
    if (i.contain(n[0], n[1]))
      for (var r = 0; r < this._displayables.length; r++) {
        var a = this._displayables[r];
        if (a.contain(t, e)) return !0
      }
    return !1
  }, h(Jr, wi);
  var nv = Math.max,
    iv = Math.min,
    rv = {},
    av = 1,
    ov = {
      color: "textFill",
      textBorderColor: "textStroke",
      textBorderWidth: "textStrokeWidth"
    },
    sv = "emphasis",
    lv = "normal",
    uv = 1,
    hv = {},
    cv = {},
    fv = Ur,
    dv = Kr,
    pv = N(),
    gv = 0;
  na("circle", Eg), na("sector", zg), na("ring", Ng), na("polygon", Hg), na("polyline", Wg), na("rect", qg), na("line", jg), na("bezierCurve", Zg), na("arc", $g);
  var vv = (Object.freeze || Object)({
      Z2_EMPHASIS_LIFT: av,
      CACHED_LABEL_STYLE_PROPERTIES: ov,
      extendShape: ta,
      extendPath: ea,
      registerShape: na,
      getShapeClass: ia,
      makePath: ra,
      makeImage: aa,
      mergePath: fv,
      resizePath: sa,
      subPixelOptimizeLine: la,
      subPixelOptimizeRect: ua,
      subPixelOptimize: dv,
      setElementHoverStyle: ma,
      setHoverStyle: Sa,
      setAsHighDownDispatcher: Ma,
      isHighDownDispatcher: Ta,
      getHighlightDigit: Ca,
      setLabelStyle: Ia,
      modifyLabelStyle: ka,
      setTextStyle: Aa,
      setText: Da,
      getFont: za,
      updateProps: Fa,
      initProps: Va,
      getTransform: Ha,
      applyTransform: Wa,
      transformDirection: Ga,
      groupTransition: Xa,
      clipPointsByRect: qa,
      clipRectByRect: Ua,
      createIcon: ja,
      linePolygonIntersect: Ya,
      lineLineIntersect: Za,
      Group: _d,
      Image: bi,
      Text: Og,
      Circle: Eg,
      Sector: zg,
      Ring: Ng,
      Polygon: Hg,
      Polyline: Wg,
      Rect: qg,
      Line: jg,
      BezierCurve: Zg,
      Arc: $g,
      IncrementalDisplayable: Jr,
      CompoundPath: Kg,
      LinearGradient: Jg,
      RadialGradient: tv,
      BoundingRect: wn
    }),
    mv = ["textStyle", "color"],
    yv = {
      getTextColor: function(t) {
        var e = this.ecModel;
        return this.getShallow("color") || (!t && e ? e.get(mv) : null)
      },
      getFont: function() {
        return za({
          fontStyle: this.getShallow("fontStyle"),
          fontWeight: this.getShallow("fontWeight"),
          fontSize: this.getShallow("fontSize"),
          fontFamily: this.getShallow("fontFamily")
        }, this.ecModel)
      },
      getTextRect: function(t) {
        return Vn(t, this.getFont(), this.getShallow("align"), this.getShallow("verticalAlign") || this.getShallow("baseline"), this.getShallow("padding"), this.getShallow("lineHeight"), this.getShallow("rich"), this.getShallow("truncateText"))
      }
    },
    _v = Cp([
      ["fill", "color"],
      ["stroke", "borderColor"],
      ["lineWidth", "borderWidth"],
      ["opacity"],
      ["shadowBlur"],
      ["shadowOffsetX"],
      ["shadowOffsetY"],
      ["shadowColor"],
      ["textPosition"],
      ["textAlign"]
    ]),
    xv = {
      getItemStyle: function(t, e) {
        var n = _v(this, t, e),
          i = this.getBorderLineDash();
        return i && (n.lineDash = i), n
      },
      getBorderLineDash: function() {
        var t = this.get("borderType");
        return "solid" === t || null == t ? null : "dashed" === t ? [5, 5] : [1, 1]
      }
    },
    wv = c,
    bv = Yi();
  Qa.prototype = {
    constructor: Qa,
    init: null,
    mergeOption: function(t) {
      r(this.option, t, !0)
    },
    get: function(t, e) {
      return null == t ? this.option : Ja(this.option, this.parsePath(t), !e && to(this, t))
    },
    getShallow: function(t, e) {
      var n = this.option,
        i = null == n ? n : n[t],
        r = !e && to(this, t);
      return null == i && r && (i = r.getShallow(t)), i
    },
    getModel: function(t, e) {
      var n, i = null == t ? this.option : Ja(this.option, t = this.parsePath(t));
      return e = e || (n = to(this, t)) && n.getModel(t), new Qa(i, e, this.ecModel)
    },
    isEmpty: function() {
      return null == this.option
    },
    restoreData: function() {},
    clone: function() {
      var t = this.constructor;
      return new t(i(this.option))
    },
    setReadOnly: function() {},
    parsePath: function(t) {
      return "string" == typeof t && (t = t.split(".")), t
    },
    customizeGetParent: function(t) {
      bv(this).getParent = t
    },
    isAnimationEnabled: function() {
      if (! of .node) {
        if (null != this.option.animation) return !!this.option.animation;
        if (this.parentModel) return this.parentModel.isAnimationEnabled()
      }
    }
  }, nr(Qa), ir(Qa), wv(Qa, kp), wv(Qa, Dp), wv(Qa, yv), wv(Qa, xv);
  var Sv = 0,
    Mv = 1e-4,
    Tv = 9007199254740991,
    Cv = /^(?:(\d{4})(?:[-\/](\d{1,2})(?:[-\/](\d{1,2})(?:[T ](\d{1,2})(?::(\d\d)(?::(\d\d)(?:[.,](\d+))?)?)?(Z|[\+\-]\d\d:?\d\d)?)?)?)?)?$/,
    Iv = (Object.freeze || Object)({
      linearMap: ao,
      parsePercent: oo,
      round: so,
      asc: lo,
      getPrecision: uo,
      getPrecisionSafe: ho,
      getPixelPrecision: co,
      getPercentWithPrecision: fo,
      MAX_SAFE_INTEGER: Tv,
      remRadian: po,
      isRadianAroundZero: go,
      parseDate: vo,
      quantity: mo,
      nice: _o,
      quantile: xo,
      reformIntervals: wo,
      isNumeric: bo
    }),
    kv = L,
    Av = /([&<>"'])/g,
    Dv = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    },
    Pv = ["a", "b", "c", "d", "e", "f", "g"],
    Lv = function(t, e) {
      return "{" + t + (null == e ? "" : e) + "}"
    },
    Ov = Un,
    Ev = (Object.freeze || Object)({
      addCommas: So,
      toCamelCase: Mo,
      normalizeCssArray: kv,
      encodeHTML: To,
      formatTpl: Co,
      formatTplSimple: Io,
      getTooltipMarker: ko,
      formatTime: Do,
      capitalFirst: Po,
      truncateText: Ov,
      getTextBoundingRect: Lo,
      getTextRect: Oo
    }),
    Bv = d,
    Rv = ["left", "right", "top", "bottom", "width", "height"],
    zv = [
      ["width", "left", "right"],
      ["height", "top", "bottom"]
    ],
    Nv = (_(Eo, "vertical"), _(Eo, "horizontal"), {
      getBoxLayoutParams: function() {
        return {
          left: this.get("left"),
          top: this.get("top"),
          right: this.get("right"),
          bottom: this.get("bottom"),
          width: this.get("width"),
          height: this.get("height")
        }
      }
    }),
    Fv = Yi(),
    Vv = Qa.extend({
      type: "component",
      id: "",
      name: "",
      mainType: "",
      subType: "",
      componentIndex: 0,
      defaultOption: null,
      ecModel: null,
      dependentModels: [],
      uid: null,
      layoutMode: null,
      $constructor: function(t, e, n, i) {
        Qa.call(this, t, e, n, i), this.uid = eo("ec_cpt_model")
      },
      init: function(t, e, n) {
        this.mergeDefaultAndTheme(t, n)
      },
      mergeDefaultAndTheme: function(t, e) {
        var n = this.layoutMode,
          i = n ? zo(t) : {},
          a = e.getTheme();
        r(t, a.get(this.mainType)), r(t, this.getDefaultOption()), n && Ro(t, i, n)
      },
      mergeOption: function(t) {
        r(this.option, t, !0);
        var e = this.layoutMode;
        e && Ro(this.option, t, e)
      },
      optionUpdated: function() {},
      getDefaultOption: function() {
        var t = Fv(this);
        if (!t.defaultOption) {
          for (var e = [], n = this.constructor; n;) {
            var i = n.prototype.defaultOption;
            i && e.push(i), n = n.superClass
          }
          for (var a = {}, o = e.length - 1; o >= 0; o--) a = r(a, e[o], !0);
          t.defaultOption = a
        }
        return t.defaultOption
      },
      getReferringComponents: function(t) {
        return this.ecModel.queryComponents({
          mainType: t,
          index: this.get(t + "Index", !0),
          id: this.get(t + "Id", !0)
        })
      }
    });
  or(Vv, {
    registerWhenExtend: !0
  }), no(Vv), io(Vv, Fo), c(Vv, Nv);
  var Hv = "";
  "undefined" != typeof navigator && (Hv = navigator.platform || "");
  var Wv = {
      color: ["#c23531", "#2f4554", "#61a0a8", "#d48265", "#91c7ae", "#749f83", "#ca8622", "#bda29a", "#6e7074", "#546570", "#c4ccd3"],
      gradientColor: ["#f6efa6", "#d88273", "#bf444c"],
      textStyle: {
        fontFamily: Hv.match(/^Win/) ? "Microsoft YaHei" : "sans-serif",
        fontSize: 12,
        fontStyle: "normal",
        fontWeight: "normal"
      },
      blendMode: null,
      animation: "auto",
      animationDuration: 1e3,
      animationDurationUpdate: 300,
      animationEasing: "exponentialOut",
      animationEasingUpdate: "cubicOut",
      animationThreshold: 2e3,
      progressiveThreshold: 3e3,
      progressive: 400,
      hoverLayerThreshold: 3e3,
      useUTC: !1
    },
    Gv = Yi(),
    Xv = {
      clearColorPalette: function() {
        Gv(this).colorIdx = 0, Gv(this).colorNameMap = {}
      },
      getColorFromPalette: function(t, e, n) {
        e = e || this;
        var i = Gv(e),
          r = i.colorIdx || 0,
          a = i.colorNameMap = i.colorNameMap || {};
        if (a.hasOwnProperty(t)) return a[t];
        var o = Fi(this.get("color", !0)),
          s = this.get("colorLayer", !0),
          l = null != n && s ? Vo(s, n) : o;
        if (l = l || o, l && l.length) {
          var u = l[r];
          return t && (a[t] = u), i.colorIdx = (r + 1) % l.length, u
        }
      }
    },
    qv = {
      cartesian2d: function(t, e, n, i) {
        var r = t.getReferringComponents("xAxis")[0],
          a = t.getReferringComponents("yAxis")[0];
        e.coordSysDims = ["x", "y"], n.set("x", r), n.set("y", a), Wo(r) && (i.set("x", r), e.firstCategoryDimIndex = 0), Wo(a) && (i.set("y", a), e.firstCategoryDimIndex = 1)
      },
      singleAxis: function(t, e, n, i) {
        var r = t.getReferringComponents("singleAxis")[0];
        e.coordSysDims = ["single"], n.set("single", r), Wo(r) && (i.set("single", r), e.firstCategoryDimIndex = 0)
      },
      polar: function(t, e, n, i) {
        var r = t.getReferringComponents("polar")[0],
          a = r.findAxisModel("radiusAxis"),
          o = r.findAxisModel("angleAxis");
        e.coordSysDims = ["radius", "angle"], n.set("radius", a), n.set("angle", o), Wo(a) && (i.set("radius", a), e.firstCategoryDimIndex = 0), Wo(o) && (i.set("angle", o), e.firstCategoryDimIndex = 1)
      },
      geo: function(t, e) {
        e.coordSysDims = ["lng", "lat"]
      },
      parallel: function(t, e, n, i) {
        var r = t.ecModel,
          a = r.getComponent("parallel", t.get("parallelIndex")),
          o = e.coordSysDims = a.dimensions.slice();
        d(a.parallelAxisIndex, function(t, a) {
          var s = r.getComponent("parallelAxis", t),
            l = o[a];
          n.set(l, s), Wo(s) && null == e.firstCategoryDimIndex && (i.set(l, s), e.firstCategoryDimIndex = a)
        })
      }
    },
    Uv = "original",
    jv = "arrayRows",
    Yv = "objectRows",
    Zv = "keyedColumns",
    $v = "unknown",
    Kv = "typedArray",
    Qv = "column",
    Jv = "row";
  Go.seriesDataToSource = function(t) {
    return new Go({
      data: t,
      sourceFormat: T(t) ? Kv : Uv,
      fromDataset: !1
    })
  }, ir(Go);
  var tm = Yi(),
    em = "\x00_ec_inner",
    nm = Qa.extend({
      init: function(t, e, n, i) {
        n = n || {}, this.option = null, this._theme = new Qa(n), this._optionManager = i
      },
      setOption: function(t, e) {
        O(!(em in t), "please use chart.getOption()"), this._optionManager.setOption(t, e), this.resetOption(null)
      },
      resetOption: function(t) {
        var e = !1,
          n = this._optionManager;
        if (!t || "recreate" === t) {
          var i = n.mountOption("recreate" === t);
          this.option && "recreate" !== t ? (this.restoreData(), this.mergeOption(i)) : rs.call(this, i), e = !0
        }
        if (("timeline" === t || "media" === t) && this.restoreData(), !t || "recreate" === t || "timeline" === t) {
          var r = n.getTimelineOption(this);
          r && (this.mergeOption(r), e = !0)
        }
        if (!t || "recreate" === t || "media" === t) {
          var a = n.getMediaOption(this, this._api);
          a.length && d(a, function(t) {
            this.mergeOption(t, e = !0)
          }, this)
        }
        return e
      },
      mergeOption: function(t) {
        function e(e, i) {
          var r = Fi(t[e]),
            s = Gi(a.get(e), r);
          Xi(s), d(s, function(t) {
            var n = t.option;
            S(n) && (t.keyInfo.mainType = e, t.keyInfo.subType = os(e, n, t.exist))
          });
          var l = as(a, i);
          n[e] = [], a.set(e, []), d(s, function(t, i) {
            var r = t.exist,
              s = t.option;
            if (O(S(s) || r, "Empty component definition"), s) {
              var u = Vv.getClass(e, t.keyInfo.subType, !0);
              if (r && r instanceof u) r.name = t.keyInfo.name, r.mergeOption(s, this), r.optionUpdated(s, !1);
              else {
                var h = o({
                  dependentModels: l,
                  componentIndex: i
                }, t.keyInfo);
                r = new u(s, this, this, h), o(r, h), r.init(s, this, this, h), r.optionUpdated(null, !0)
              }
            } else r.mergeOption({}, this), r.optionUpdated({}, !1);
            a.get(e)[i] = r, n[e][i] = r.option
          }, this), "series" === e && ss(this, a.get("series"))
        }
        var n = this.option,
          a = this._componentsMap,
          s = [];
        Uo(this), d(t, function(t, e) {
          null != t && (Vv.hasClass(e) ? e && s.push(e) : n[e] = null == n[e] ? i(t) : r(n[e], t, !0))
        }), Vv.topologicalTravel(s, Vv.getAllClassMainTypes(), e, this), this._seriesIndicesMap = N(this._seriesIndices = this._seriesIndices || [])
      },
      getOption: function() {
        var t = i(this.option);
        return d(t, function(e, n) {
          if (Vv.hasClass(n)) {
            for (var e = Fi(e), i = e.length - 1; i >= 0; i--) Ui(e[i]) && e.splice(i, 1);
            t[n] = e
          }
        }), delete t[em], t
      },
      getTheme: function() {
        return this._theme
      },
      getComponent: function(t, e) {
        var n = this._componentsMap.get(t);
        return n ? n[e || 0] : void 0
      },
      queryComponents: function(t) {
        var e = t.mainType;
        if (!e) return [];
        var n = t.index,
          i = t.id,
          r = t.name,
          a = this._componentsMap.get(e);
        if (!a || !a.length) return [];
        var o;
        if (null != n) x(n) || (n = [n]), o = v(p(n, function(t) {
          return a[t]
        }), function(t) {
          return !!t
        });
        else if (null != i) {
          var s = x(i);
          o = v(a, function(t) {
            return s && u(i, t.id) >= 0 || !s && t.id === i
          })
        } else if (null != r) {
          var l = x(r);
          o = v(a, function(t) {
            return l && u(r, t.name) >= 0 || !l && t.name === r
          })
        } else o = a.slice();
        return ls(o, t)
      },
      findComponents: function(t) {
        function e(t) {
          var e = r + "Index",
            n = r + "Id",
            i = r + "Name";
          return !t || null == t[e] && null == t[n] && null == t[i] ? null : {
            mainType: r,
            index: t[e],
            id: t[n],
            name: t[i]
          }
        }

        function n(e) {
          return t.filter ? v(e, t.filter) : e
        }
        var i = t.query,
          r = t.mainType,
          a = e(i),
          o = a ? this.queryComponents(a) : this._componentsMap.get(r);
        return n(ls(o, t))
      },
      eachComponent: function(t, e, n) {
        var i = this._componentsMap;
        if ("function" == typeof t) n = e, e = t, i.each(function(t, i) {
          d(t, function(t, r) {
            e.call(n, i, t, r)
          })
        });
        else if (b(t)) d(i.get(t), e, n);
        else if (S(t)) {
          var r = this.findComponents(t);
          d(r, e, n)
        }
      },
      getSeriesByName: function(t) {
        var e = this._componentsMap.get("series");
        return v(e, function(e) {
          return e.name === t
        })
      },
      getSeriesByIndex: function(t) {
        return this._componentsMap.get("series")[t]
      },
      getSeriesByType: function(t) {
        var e = this._componentsMap.get("series");
        return v(e, function(e) {
          return e.subType === t
        })
      },
      getSeries: function() {
        return this._componentsMap.get("series").slice()
      },
      getSeriesCount: function() {
        return this._componentsMap.get("series").length
      },
      eachSeries: function(t, e) {
        d(this._seriesIndices, function(n) {
          var i = this._componentsMap.get("series")[n];
          t.call(e, i, n)
        }, this)
      },
      eachRawSeries: function(t, e) {
        d(this._componentsMap.get("series"), t, e)
      },
      eachSeriesByType: function(t, e, n) {
        d(this._seriesIndices, function(i) {
          var r = this._componentsMap.get("series")[i];
          r.subType === t && e.call(n, r, i)
        }, this)
      },
      eachRawSeriesByType: function(t, e, n) {
        return d(this.getSeriesByType(t), e, n)
      },
      isSeriesFiltered: function(t) {
        return null == this._seriesIndicesMap.get(t.componentIndex)
      },
      getCurrentSeriesIndices: function() {
        return (this._seriesIndices || []).slice()
      },
      filterSeries: function(t, e) {
        var n = v(this._componentsMap.get("series"), t, e);
        ss(this, n)
      },
      restoreData: function(t) {
        var e = this._componentsMap;
        ss(this, e.get("series"));
        var n = [];
        e.each(function(t, e) {
          n.push(e)
        }), Vv.topologicalTravel(n, Vv.getAllClassMainTypes(), function(n) {
          d(e.get(n), function(e) {
            ("series" !== n || !ns(e, t)) && e.restoreData()
          })
        })
      }
    });
  c(nm, Xv);
  var im = ["getDom", "getZr", "getWidth", "getHeight", "getDevicePixelRatio", "dispatchAction", "isDisposed", "on", "off", "getDataURL", "getConnectedDataURL", "getModel", "getOption", "getViewOfComponentModel", "getViewOfSeriesModel"],
    rm = {};
  hs.prototype = {
    constructor: hs,
    create: function(t, e) {
      var n = [];
      d(rm, function(i) {
        var r = i.create(t, e);
        n = n.concat(r || [])
      }), this._coordinateSystems = n
    },
    update: function(t, e) {
      d(this._coordinateSystems, function(n) {
        n.update && n.update(t, e)
      })
    },
    getCoordinateSystems: function() {
      return this._coordinateSystems.slice()
    }
  }, hs.register = function(t, e) {
    rm[t] = e
  }, hs.get = function(t) {
    return rm[t]
  };
  var am = d,
    om = i,
    sm = p,
    lm = r,
    um = /^(min|max)?(.+)$/;
  cs.prototype = {
    constructor: cs,
    setOption: function(t, e) {
      t && d(Fi(t.series), function(t) {
        t && t.data && T(t.data) && B(t.data)
      }), t = om(t);
      var n = this._optionBackup,
        i = fs.call(this, t, e, !n);
      this._newBaseOption = i.baseOption, n ? (vs(n.baseOption, i.baseOption), i.timelineOptions.length && (n.timelineOptions = i.timelineOptions), i.mediaList.length && (n.mediaList = i.mediaList), i.mediaDefault && (n.mediaDefault = i.mediaDefault)) : this._optionBackup = i
    },
    mountOption: function(t) {
      var e = this._optionBackup;
      return this._timelineOptions = sm(e.timelineOptions, om), this._mediaList = sm(e.mediaList, om), this._mediaDefault = om(e.mediaDefault), this._currentMediaIndices = [], om(t ? e.baseOption : this._newBaseOption)
    },
    getTimelineOption: function(t) {
      var e, n = this._timelineOptions;
      if (n.length) {
        var i = t.getComponent("timeline");
        i && (e = om(n[i.getCurrentIndex()], !0))
      }
      return e
    },
    getMediaOption: function() {
      var t = this._api.getWidth(),
        e = this._api.getHeight(),
        n = this._mediaList,
        i = this._mediaDefault,
        r = [],
        a = [];
      if (!n.length && !i) return a;
      for (var o = 0, s = n.length; s > o; o++) ds(n[o].query, t, e) && r.push(o);
      return !r.length && i && (r = [-1]), r.length && !gs(r, this._currentMediaIndices) && (a = sm(r, function(t) {
        return om(-1 === t ? i.option : n[t].option)
      })), this._currentMediaIndices = r, a
    }
  };
  var hm = d,
    cm = S,
    fm = ["areaStyle", "lineStyle", "nodeStyle", "linkStyle", "chordStyle", "label", "labelLine"],
    dm = function(t, e) {
      hm(Ss(t.series), function(t) {
        cm(t) && bs(t)
      });
      var n = ["xAxis", "yAxis", "radiusAxis", "angleAxis", "singleAxis", "parallelAxis", "radar"];
      e && n.push("valueAxis", "categoryAxis", "logAxis", "timeAxis"), hm(n, function(e) {
        hm(Ss(t[e]), function(t) {
          t && (xs(t, "axisLabel"), xs(t.axisPointer, "label"))
        })
      }), hm(Ss(t.parallel), function(t) {
        var e = t && t.parallelAxisDefault;
        xs(e, "axisLabel"), xs(e && e.axisPointer, "label")
      }), hm(Ss(t.calendar), function(t) {
        ys(t, "itemStyle"), xs(t, "dayLabel"), xs(t, "monthLabel"), xs(t, "yearLabel")
      }), hm(Ss(t.radar), function(t) {
        xs(t, "name")
      }), hm(Ss(t.geo), function(t) {
        cm(t) && (ws(t), hm(Ss(t.regions), function(t) {
          ws(t)
        }))
      }), hm(Ss(t.timeline), function(t) {
        ws(t), ys(t, "label"), ys(t, "itemStyle"), ys(t, "controlStyle", !0);
        var e = t.data;
        x(e) && d(e, function(t) {
          S(t) && (ys(t, "label"), ys(t, "itemStyle"))
        })
      }), hm(Ss(t.toolbox), function(t) {
        ys(t, "iconStyle"), hm(t.feature, function(t) {
          ys(t, "iconStyle")
        })
      }), xs(Ms(t.axisPointer), "label"), xs(Ms(t.tooltip).axisPointer, "label")
    },
    pm = [
      ["x", "left"],
      ["y", "top"],
      ["x2", "right"],
      ["y2", "bottom"]
    ],
    gm = ["grid", "geo", "parallel", "legend", "toolbox", "title", "visualMap", "dataZoom", "timeline"],
    vm = function(t, e) {
      dm(t, e), t.series = Fi(t.series), d(t.series, function(t) {
        if (S(t)) {
          var e = t.type;
          if ("line" === e) null != t.clipOverflow && (t.clip = t.clipOverflow);
          else if ("pie" === e || "gauge" === e) null != t.clockWise && (t.clockwise = t.clockWise);
          else if ("gauge" === e) {
            var n = Ts(t, "pointer.color");
            null != n && Cs(t, "itemStyle.color", n)
          }
          Is(t)
        }
      }), t.dataRange && (t.visualMap = t.dataRange), d(gm, function(e) {
        var n = t[e];
        n && (x(n) || (n = [n]), d(n, function(t) {
          Is(t)
        }))
      })
    },
    mm = function(t) {
      var e = N();
      t.eachSeries(function(t) {
        var n = t.get("stack");
        if (n) {
          var i = e.get(n) || e.set(n, []),
            r = t.getData(),
            a = {
              stackResultDimension: r.getCalculationInfo("stackResultDimension"),
              stackedOverDimension: r.getCalculationInfo("stackedOverDimension"),
              stackedDimension: r.getCalculationInfo("stackedDimension"),
              stackedByDimension: r.getCalculationInfo("stackedByDimension"),
              isStackedByIndex: r.getCalculationInfo("isStackedByIndex"),
              data: r,
              seriesModel: t
            };
          if (!a.stackedDimension || !a.isStackedByIndex && !a.stackedByDimension) return;
          i.length && r.setCalculationInfo("stackedOnSeries", i[i.length - 1].seriesModel), i.push(a)
        }
      }), e.each(ks)
    },
    ym = As.prototype;
  ym.pure = !1, ym.persistent = !0, ym.getSource = function() {
    return this._source
  };
  var _m = {
      arrayRows_column: {
        pure: !0,
        count: function() {
          return Math.max(0, this._data.length - this._source.startIndex)
        },
        getItem: function(t) {
          return this._data[t + this._source.startIndex]
        },
        appendData: Ls
      },
      arrayRows_row: {
        pure: !0,
        count: function() {
          var t = this._data[0];
          return t ? Math.max(0, t.length - this._source.startIndex) : 0
        },
        getItem: function(t) {
          t += this._source.startIndex;
          for (var e = [], n = this._data, i = 0; i < n.length; i++) {
            var r = n[i];
            e.push(r ? r[t] : null)
          }
          return e
        },
        appendData: function() {
          throw new Error('Do not support appendData when set seriesLayoutBy: "row".')
        }
      },
      objectRows: {
        pure: !0,
        count: Ds,
        getItem: Ps,
        appendData: Ls
      },
      keyedColumns: {
        pure: !0,
        count: function() {
          var t = this._source.dimensionsDefine[0].name,
            e = this._data[t];
          return e ? e.length : 0
        },
        getItem: function(t) {
          for (var e = [], n = this._source.dimensionsDefine, i = 0; i < n.length; i++) {
            var r = this._data[n[i].name];
            e.push(r ? r[t] : null)
          }
          return e
        },
        appendData: function(t) {
          var e = this._data;
          d(t, function(t, n) {
            for (var i = e[n] || (e[n] = []), r = 0; r < (t || []).length; r++) i.push(t[r])
          })
        }
      },
      original: {
        count: Ds,
        getItem: Ps,
        appendData: Ls
      },
      typedArray: {
        persistent: !1,
        pure: !0,
        count: function() {
          return this._data ? this._data.length / this._dimSize : 0
        },
        getItem: function(t, e) {
          t -= this._offset, e = e || [];
          for (var n = this._dimSize * t, i = 0; i < this._dimSize; i++) e[i] = this._data[n + i];
          return e
        },
        appendData: function(t) {
          this._data = t
        },
        clean: function() {
          this._offset += this.count(), this._data = null
        }
      }
    },
    xm = {
      arrayRows: Os,
      objectRows: function(t, e, n, i) {
        return null != n ? t[i] : t
      },
      keyedColumns: Os,
      original: function(t, e, n) {
        var i = Hi(t);
        return null != n && i instanceof Array ? i[n] : i
      },
      typedArray: Os
    },
    wm = {
      arrayRows: Es,
      objectRows: function(t, e) {
        return Bs(t[e], this._dimensionInfos[e])
      },
      keyedColumns: Es,
      original: function(t, e, n, i) {
        var r = t && (null == t.value ? t : t.value);
        return !this._rawData.pure && Wi(t) && (this.hasItemOption = !0), Bs(r instanceof Array ? r[i] : r, this._dimensionInfos[e])
      },
      typedArray: function(t, e, n, i) {
        return t[i]
      }
    },
    bm = /\{@(.+?)\}/g,
    Sm = {
      getDataParams: function(t, e) {
        var n = this.getData(e),
          i = this.getRawValue(t, e),
          r = n.getRawIndex(t),
          a = n.getName(t),
          o = n.getRawDataItem(t),
          s = n.getItemVisual(t, "color"),
          l = n.getItemVisual(t, "borderColor"),
          u = this.ecModel.getComponent("tooltip"),
          h = u && u.get("renderMode"),
          c = Ji(h),
          f = this.mainType,
          d = "series" === f,
          p = n.userOutput;
        return {
          componentType: f,
          componentSubType: this.subType,
          componentIndex: this.componentIndex,
          seriesType: d ? this.subType : null,
          seriesIndex: this.seriesIndex,
          seriesId: d ? this.id : null,
          seriesName: d ? this.name : null,
          name: a,
          dataIndex: r,
          data: o,
          dataType: e,
          value: i,
          color: s,
          borderColor: l,
          dimensionNames: p ? p.dimensionNames : null,
          encode: p ? p.encode : null,
          marker: ko({
            color: s,
            renderMode: c
          }),
          $vars: ["seriesName", "name", "value"]
        }
      },
      getFormattedLabel: function(t, e, n, i, r) {
        e = e || "normal";
        var a = this.getData(n),
          o = a.getItemModel(t),
          s = this.getDataParams(t, n);
        null != i && s.value instanceof Array && (s.value = s.value[i]);
        var l = o.get("normal" === e ? [r || "label", "formatter"] : [e, r || "label", "formatter"]);
        if ("function" == typeof l) return s.status = e, s.dimensionIndex = i, l(s);
        if ("string" == typeof l) {
          var u = Co(l, s);
          return u.replace(bm, function(e, n) {
            var i = n.length;
            return "[" === n.charAt(0) && "]" === n.charAt(i - 1) && (n = +n.slice(1, i - 1)), Rs(a, t, n)
          })
        }
      },
      getRawValue: function(t, e) {
        return Rs(this.getData(e), t)
      },
      formatTooltip: function() {}
    },
    Mm = Fs.prototype;
  Mm.perform = function(t) {
    function e(t) {
      return !(t >= 1) && (t = 1), t
    }
    var n = this._upstream,
      i = t && t.skip;
    if (this._dirty && n) {
      var r = this.context;
      r.data = r.outputData = n.context.outputData
    }
    this.__pipeline && (this.__pipeline.currentTask = this);
    var a;
    this._plan && !i && (a = this._plan(this.context));
    var o = e(this._modBy),
      s = this._modDataCount || 0,
      l = e(t && t.modBy),
      u = t && t.modDataCount || 0;
    (o !== l || s !== u) && (a = "reset");
    var h;
    (this._dirty || "reset" === a) && (this._dirty = !1, h = Hs(this, i)), this._modBy = l, this._modDataCount = u;
    var c = t && t.step;
    if (this._dueEnd = n ? n._outputDueEnd : this._count ? this._count(this.context) : 1 / 0, this._progress) {
      var f = this._dueIndex,
        d = Math.min(null != c ? this._dueIndex + c : 1 / 0, this._dueEnd);
      if (!i && (h || d > f)) {
        var p = this._progress;
        if (x(p))
          for (var g = 0; g < p.length; g++) Vs(this, p[g], f, d, l, u);
        else Vs(this, p, f, d, l, u)
      }
      this._dueIndex = d;
      var v = null != this._settedOutputEnd ? this._settedOutputEnd : d;
      this._outputDueEnd = v
    } else this._dueIndex = this._outputDueEnd = null != this._settedOutputEnd ? this._settedOutputEnd : this._dueEnd;
    return this.unfinished()
  };
  var Tm = function() {
    function t() {
      return n > i ? i++ : null
    }

    function e() {
      var t = i % o * r + Math.ceil(i / o),
        e = i >= n ? null : a > t ? t : i;
      return i++, e
    }
    var n, i, r, a, o, s = {
      reset: function(l, u, h, c) {
        i = l, n = u, r = h, a = c, o = Math.ceil(a / r), s.next = r > 1 && a > 0 ? e : t
      }
    };
    return s
  }();
  Mm.dirty = function() {
    this._dirty = !0, this._onDirty && this._onDirty(this.context)
  }, Mm.unfinished = function() {
    return this._progress && this._dueIndex < this._dueEnd
  }, Mm.pipe = function(t) {
    (this._downstream !== t || this._dirty) && (this._downstream = t, t._upstream = this, t.dirty())
  }, Mm.dispose = function() {
    this._disposed || (this._upstream && (this._upstream._downstream = null), this._downstream && (this._downstream._upstream = null), this._dirty = !1, this._disposed = !0)
  }, Mm.getUpstream = function() {
    return this._upstream
  }, Mm.getDownstream = function() {
    return this._downstream
  }, Mm.setOutputEnd = function(t) {
    this._outputDueEnd = this._settedOutputEnd = t
  };
  var Cm = Yi(),
    Im = Vv.extend({
      type: "series.__base__",
      seriesIndex: 0,
      coordinateSystem: null,
      defaultOption: null,
      legendDataProvider: null,
      visualColorAccessPath: "itemStyle.color",
      visualBorderColorAccessPath: "itemStyle.borderColor",
      layoutMode: null,
      init: function(t, e, n) {
        this.seriesIndex = this.componentIndex, this.dataTask = Ns({
          count: Xs,
          reset: qs
        }), this.dataTask.context = {
          model: this
        }, this.mergeDefaultAndTheme(t, n), jo(this);
        var i = this.getInitialData(t, n);
        js(i, this), this.dataTask.context.data = i, Cm(this).dataBeforeProcessed = i, Ws(this)
      },
      mergeDefaultAndTheme: function(t, e) {
        var n = this.layoutMode,
          i = n ? zo(t) : {},
          a = this.subType;
        Vv.hasClass(a) && (a += "Series"), r(t, e.getTheme().get(this.subType)), r(t, this.getDefaultOption()), Vi(t, "label", ["show"]), this.fillDataTextStyle(t.data), n && Ro(t, i, n)
      },
      mergeOption: function(t, e) {
        t = r(this.option, t, !0), this.fillDataTextStyle(t.data);
        var n = this.layoutMode;
        n && Ro(this.option, t, n), jo(this);
        var i = this.getInitialData(t, e);
        js(i, this), this.dataTask.dirty(), this.dataTask.context.data = i, Cm(this).dataBeforeProcessed = i, Ws(this)
      },
      fillDataTextStyle: function(t) {
        if (t && !T(t))
          for (var e = ["show"], n = 0; n < t.length; n++) t[n] && t[n].label && Vi(t[n], "label", e)
      },
      getInitialData: function() {},
      appendData: function(t) {
        var e = this.getRawData();
        e.appendData(t.data)
      },
      getData: function(t) {
        var e = Zs(this);
        if (e) {
          var n = e.context.data;
          return null == t ? n : n.getLinkedData(t)
        }
        return Cm(this).data
      },
      setData: function(t) {
        var e = Zs(this);
        if (e) {
          var n = e.context;
          n.data !== t && e.modifyOutputEnd && e.setOutputEnd(t.count()), n.outputData = t, e !== this.dataTask && (n.data = t)
        }
        Cm(this).data = t
      },
      getSource: function() {
        return qo(this)
      },
      getRawData: function() {
        return Cm(this).dataBeforeProcessed
      },
      getBaseAxis: function() {
        var t = this.coordinateSystem;
        return t && t.getBaseAxis && t.getBaseAxis()
      },
      formatTooltip: function(t, e, n, i) {
        function r(n) {
          function r(t, n) {
            var r = c.getDimensionInfo(n);
            if (r && r.otherDims.tooltip !== !1) {
              var f = r.type,
                d = "sub" + o.seriesIndex + "at" + h,
                p = ko({
                  color: y,
                  type: "subItem",
                  renderMode: i,
                  markerId: d
                }),
                g = "string" == typeof p ? p : p.content,
                v = (a ? g + To(r.displayName || "-") + ": " : "") + To("ordinal" === f ? t + "" : "time" === f ? e ? "" : Do("yyyy/MM/dd hh:mm:ss", t) : So(t));
              v && s.push(v), l && (u[d] = y, ++h)
            }
          }
          var a = g(n, function(t, e, n) {
              var i = c.getDimensionInfo(n);
              return t |= i && i.tooltip !== !1 && null != i.displayName
            }, 0),
            s = [];
          f.length ? d(f, function(e) {
            r(Rs(c, t, e), e)
          }) : d(n, r);
          var p = a ? l ? "\n" : "<br/>" : "",
            v = p + s.join(p || ", ");
          return {
            renderMode: i,
            content: v,
            style: u
          }
        }

        function a(t) {
          return {
            renderMode: i,
            content: To(So(t)),
            style: u
          }
        }
        var o = this;
        i = i || "html";
        var s = "html" === i ? "<br/>" : "\n",
          l = "richText" === i,
          u = {},
          h = 0,
          c = this.getData(),
          f = c.mapDimension("defaultedTooltip", !0),
          p = f.length,
          v = this.getRawValue(t),
          m = x(v),
          y = c.getItemVisual(t, "color");
        S(y) && y.colorStops && (y = (y.colorStops[0] || {}).color), y = y || "transparent";
        var _ = p > 1 || m && !p ? r(v) : a(p ? Rs(c, t, f[0]) : m ? v[0] : v),
          w = _.content,
          b = o.seriesIndex + "at" + h,
          M = ko({
            color: y,
            type: "item",
            renderMode: i,
            markerId: b
          });
        u[b] = y, ++h;
        var T = c.getName(t),
          C = this.name;
        qi(this) || (C = ""), C = C ? To(C) + (e ? ": " : s) : "";
        var I = "string" == typeof M ? M : M.content,
          k = e ? I + C + w : C + I + (T ? To(T) + ": " + w : w);
        return {
          html: k,
          markers: u
        }
      },
      isAnimationEnabled: function() {
        if ( of .node) return !1;
        var t = this.getShallow("animation");
        return t && this.getData().count() > this.getShallow("animationThreshold") && (t = !1), t
      },
      restoreData: function() {
        this.dataTask.dirty()
      },
      getColorFromPalette: function(t, e, n) {
        var i = this.ecModel,
          r = Xv.getColorFromPalette.call(this, t, e, n);
        return r || (r = i.getColorFromPalette(t, e, n)), r
      },
      coordDimToDataDim: function(t) {
        return this.getRawData().mapDimension(t, !0)
      },
      getProgressive: function() {
        return this.get("progressive")
      },
      getProgressiveThreshold: function() {
        return this.get("progressiveThreshold")
      },
      getAxisTooltipData: null,
      getTooltipPosition: null,
      pipeTask: null,
      preventIncremental: null,
      pipelineContext: null
    });
  c(Im, Sm), c(Im, Xv);
  var km = function() {
    this.group = new _d, this.uid = eo("viewComponent")
  };
  km.prototype = {
    constructor: km,
    init: function() {},
    render: function() {},
    dispose: function() {},
    filterForExposedEvent: null
  };
  var Am = km.prototype;
  Am.updateView = Am.updateLayout = Am.updateVisual = function() {}, nr(km), or(km, {
    registerWhenExtend: !0
  });
  var Dm = function() {
      var t = Yi();
      return function(e) {
        var n = t(e),
          i = e.pipelineContext,
          r = n.large,
          a = n.progressiveRender,
          o = n.large = i.large,
          s = n.progressiveRender = i.progressiveRender;
        return !!(r ^ o || a ^ s) && "reset"
      }
    },
    Pm = Yi(),
    Lm = Dm();
  $s.prototype = {
    type: "chart",
    init: function() {},
    render: function() {},
    highlight: function(t, e, n, i) {
      Qs(t.getData(), i, "emphasis")
    },
    downplay: function(t, e, n, i) {
      Qs(t.getData(), i, "normal")
    },
    remove: function() {
      this.group.removeAll()
    },
    dispose: function() {},
    incrementalPrepareRender: null,
    incrementalRender: null,
    updateTransform: null,
    filterForExposedEvent: null
  };
  var Om = $s.prototype;
  Om.updateView = Om.updateLayout = Om.updateVisual = function(t, e, n, i) {
    this.render(t, e, n, i)
  }, nr($s, ["dispose"]), or($s, {
    registerWhenExtend: !0
  }), $s.markUpdateMethod = function(t, e) {
    Pm(t).updateMethod = e
  };
  var Em = {
      incrementalPrepareRender: {
        progress: function(t, e) {
          e.view.incrementalRender(t, e.model, e.ecModel, e.api, e.payload)
        }
      },
      render: {
        forceFirstProgress: !0,
        progress: function(t, e) {
          e.view.render(e.model, e.ecModel, e.api, e.payload)
        }
      }
    },
    Bm = {
      createOnAllSeries: !0,
      performRawSeries: !0,
      reset: function(t, e) {
        var n = t.getData(),
          i = (t.visualColorAccessPath || "itemStyle.color").split("."),
          r = t.get(i) || t.getColorFromPalette(t.name, null, e.getSeriesCount());
        n.setVisual("color", r);
        var a = (t.visualBorderColorAccessPath || "itemStyle.borderColor").split("."),
          o = t.get(a);
        if (n.setVisual("borderColor", o), !e.isSeriesFiltered(t)) {
          "function" != typeof r || r instanceof Qg || n.each(function(e) {
            n.setItemVisual(e, "color", r(t.getDataParams(e)))
          });
          var s = function(t, e) {
            var n = t.getItemModel(e),
              r = n.get(i, !0),
              o = n.get(a, !0);
            null != r && t.setItemVisual(e, "color", r), null != o && t.setItemVisual(e, "borderColor", o)
          };
          return {
            dataEach: n.hasItemOption ? s : null
          }
        }
      }
    },
    Rm = {
      legend: {
        selector: {
          all: "??????",
          inverse: "??????"
        }
      },
      toolbox: {
        brush: {
          title: {
            rect: "????????????",
            polygon: "??????",
            lineX: "????????????",
            lineY: "????????????",
            keep: "????????????",
            clear: "????????????"
          }
        },
        dataView: {
          title: "????????????",
          lang: ["????????????", "??????", "??????"]
        },
        dataZoom: {
          title: {
            zoom: "????????????",
            back: "??????????????????"
          }
        },
        magicType: {
          title: {
            line: "??????????????????",
            bar: "??????????????????",
            stack: "???????????????",
            tiled: "???????????????"
          }
        },
        restore: {
          title: "??????"
        },
        saveAsImage: {
          title: "???????????????",
          lang: ["?????????????????????"]
        }
      },
      series: {
        typeNames: {
          pie: "??????",
          bar: "?????????",
          line: "?????????",
          scatter: "?????????",
          effectScatter: "???????????????",
          radar: "?????????",
          tree: "??????",
          treemap: "????????????",
          boxplot: "?????????",
          candlestick: "K??????",
          k: "K??????",
          heatmap: "?????????",
          map: "??????",
          parallel: "???????????????",
          lines: "??????",
          graph: "?????????",
          sankey: "?????????",
          funnel: "?????????",
          gauge: "????????????",
          pictorialBar: "????????????",
          themeRiver: "???????????????",
          sunburst: "?????????"
        }
      },
      aria: {
        general: {
          withTitle: "?????????????????????{title}???????????????",
          withoutTitle: "?????????????????????"
        },
        series: {
          single: {
            prefix: "",
            withName: "???????????????{seriesType}?????????{seriesName}???",
            withoutName: "???????????????{seriesType}???"
          },
          multiple: {
            prefix: "??????{seriesCount}????????????????????????",
            withName: "???{seriesId}????????????????????????{seriesName}???{seriesType}???",
            withoutName: "???{seriesId}??????????????????{seriesType}???",
            separator: {
              middle: "???",
              end: "???"
            }
          }
        },
        data: {
          allData: "??????????????????",
          partialData: "????????????{displayCnt}????????????",
          withName: "{name}????????????{value}",
          withoutName: "{value}",
          separator: {
            middle: "???",
            end: ""
          }
        }
      }
    },
    zm = function(t, e) {
      function n(t, e) {
        if ("string" != typeof t) return t;
        var n = t;
        return d(e, function(t, e) {
          n = n.replace(new RegExp("\\{\\s*" + e + "\\s*\\}", "g"), t)
        }), n
      }

      function i(t) {
        var e = o.get(t);
        if (null == e) {
          for (var n = t.split("."), i = Rm.aria, r = 0; r < n.length; ++r) i = i[n[r]];
          return i
        }
        return e
      }

      function r() {
        var t = e.getModel("title").option;
        return t && t.length && (t = t[0]), t && t.text
      }

      function a(t) {
        return Rm.series.typeNames[t] || "????????????"
      }
      var o = e.getModel("aria");
      if (o.get("show")) {
        if (o.get("description")) return void t.setAttribute("aria-label", o.get("description"));
        var s = 0;
        e.eachSeries(function() {
          ++s
        }, this);
        var l, u = o.get("data.maxCount") || 10,
          h = o.get("series.maxCount") || 10,
          c = Math.min(s, h);
        if (!(1 > s)) {
          var f = r();
          l = f ? n(i("general.withTitle"), {
            title: f
          }) : i("general.withoutTitle");
          var p = [],
            g = s > 1 ? "series.multiple.prefix" : "series.single.prefix";
          l += n(i(g), {
            seriesCount: s
          }), e.eachSeries(function(t, e) {
            if (c > e) {
              var r, o = t.get("name"),
                l = "series." + (s > 1 ? "multiple" : "single") + ".";
              r = i(o ? l + "withName" : l + "withoutName"), r = n(r, {
                seriesId: t.seriesIndex,
                seriesName: t.get("name"),
                seriesType: a(t.subType)
              });
              var h = t.getData();
              window.data = h, r += h.count() > u ? n(i("data.partialData"), {
                displayCnt: u
              }) : i("data.allData");
              for (var f = [], d = 0; d < h.count(); d++)
                if (u > d) {
                  var g = h.getName(d),
                    v = Rs(h, d);
                  f.push(n(i(g ? "data.withName" : "data.withoutName"), {
                    name: g,
                    value: v
                  }))
                }
              r += f.join(i("data.separator.middle")) + i("data.separator.end"), p.push(r)
            }
          }), l += p.join(i("series.multiple.separator.middle")) + i("series.multiple.separator.end"), t.setAttribute("aria-label", l)
        }
      }
    },
    Nm = Math.PI,
    Fm = function(t, e) {
      e = e || {}, s(e, {
        text: "loading",
        color: "#c23531",
        textColor: "#000",
        maskColor: "rgba(255, 255, 255, 0.8)",
        zlevel: 0
      });
      var n = new qg({
          style: {
            fill: e.maskColor
          },
          zlevel: e.zlevel,
          z: 1e4
        }),
        i = new $g({
          shape: {
            startAngle: -Nm / 2,
            endAngle: -Nm / 2 + .1,
            r: 10
          },
          style: {
            stroke: e.color,
            lineCap: "round",
            lineWidth: 5
          },
          zlevel: e.zlevel,
          z: 10001
        }),
        r = new qg({
          style: {
            fill: "none",
            text: e.text,
            textPosition: "right",
            textDistance: 10,
            textFill: e.textColor
          },
          zlevel: e.zlevel,
          z: 10001
        });
      i.animateShape(!0).when(1e3, {
        endAngle: 3 * Nm / 2
      }).start("circularInOut"), i.animateShape(!0).when(1e3, {
        startAngle: 3 * Nm / 2
      }).delay(300).start("circularInOut");
      var a = new _d;
      return a.add(i), a.add(r), a.add(n), a.resize = function() {
        var e = t.getWidth() / 2,
          a = t.getHeight() / 2;
        i.setShape({
          cx: e,
          cy: a
        });
        var o = i.shape.r;
        r.setShape({
          x: e - o,
          y: a - o,
          width: 2 * o,
          height: 2 * o
        }), n.setShape({
          x: 0,
          y: 0,
          width: t.getWidth(),
          height: t.getHeight()
        })
      }, a.resize(), a
    },
    Vm = nl.prototype;
  Vm.restoreData = function(t, e) {
    t.restoreData(e), this._stageTaskMap.each(function(t) {
      var e = t.overallTask;
      e && e.dirty()
    })
  }, Vm.getPerformArgs = function(t, e) {
    if (t.__pipeline) {
      var n = this._pipelineMap.get(t.__pipeline.id),
        i = n.context,
        r = !e && n.progressiveEnabled && (!i || i.progressiveRender) && t.__idxInPipeline > n.blockIndex,
        a = r ? n.step : null,
        o = i && i.modDataCount,
        s = null != o ? Math.ceil(o / a) : null;
      return {
        step: a,
        modBy: s,
        modDataCount: o
      }
    }
  }, Vm.getPipeline = function(t) {
    return this._pipelineMap.get(t)
  }, Vm.updateStreamModes = function(t, e) {
    var n = this._pipelineMap.get(t.uid),
      i = t.getData(),
      r = i.count(),
      a = n.progressiveEnabled && e.incrementalPrepareRender && r >= n.threshold,
      o = t.get("large") && r >= t.get("largeThreshold"),
      s = "mod" === t.get("progressiveChunkMode") ? r : null;
    t.pipelineContext = n.context = {
      progressiveRender: a,
      modDataCount: s,
      large: o
    }
  }, Vm.restorePipelines = function(t) {
    var e = this,
      n = e._pipelineMap = N();
    t.eachSeries(function(t) {
      var i = t.getProgressive(),
        r = t.uid;
      n.set(r, {
        id: r,
        head: null,
        tail: null,
        threshold: t.getProgressiveThreshold(),
        progressiveEnabled: i && !(t.preventIncremental && t.preventIncremental()),
        blockIndex: -1,
        step: Math.round(i || 700),
        count: 0
      }), pl(e, t, t.dataTask)
    })
  }, Vm.prepareStageTasks = function() {
    var t = this._stageTaskMap,
      e = this.ecInstance.getModel(),
      n = this.api;
    d(this._allHandlers, function(i) {
      var r = t.get(i.uid) || t.set(i.uid, []);
      i.reset && rl(this, i, r, e, n), i.overallReset && al(this, i, r, e, n)
    }, this)
  }, Vm.prepareView = function(t, e, n, i) {
    var r = t.renderTask,
      a = r.context;
    a.model = e, a.ecModel = n, a.api = i, r.__block = !t.incrementalPrepareRender, pl(this, e, r)
  }, Vm.performDataProcessorTasks = function(t, e) {
    il(this, this._dataProcessorHandlers, t, e, {
      block: !0
    })
  }, Vm.performVisualTasks = function(t, e, n) {
    il(this, this._visualHandlers, t, e, n)
  }, Vm.performSeriesTasks = function(t) {
    var e;
    t.eachSeries(function(t) {
      e |= t.dataTask.perform()
    }), this.unfinished |= e
  }, Vm.plan = function() {
    this._pipelineMap.each(function(t) {
      var e = t.tail;
      do {
        if (e.__block) {
          t.blockIndex = e.__idxInPipeline;
          break
        }
        e = e.getUpstream()
      } while (e)
    })
  };
  var Hm = Vm.updatePayload = function(t, e) {
      "remain" !== e && (t.context.payload = e)
    },
    Wm = fl(0);
  nl.wrapStageHandler = function(t, e) {
    return w(t) && (t = {
      overallReset: t,
      seriesType: gl(t)
    }), t.uid = eo("stageHandler"), e && (t.visualType = e), t
  };
  var Gm, Xm = {},
    qm = {};
  vl(Xm, nm), vl(qm, us), Xm.eachSeriesByType = Xm.eachRawSeriesByType = function(t) {
    Gm = t
  }, Xm.eachComponent = function(t) {
    "series" === t.mainType && t.subType && (Gm = t.subType)
  };
  var Um = ["#37A2DA", "#32C5E9", "#67E0E3", "#9FE6B8", "#FFDB5C", "#ff9f7f", "#fb7293", "#E062AE", "#E690D1", "#e7bcf3", "#9d96f5", "#8378EA", "#96BFFF"],
    jm = {
      color: Um,
      colorLayer: [
        ["#37A2DA", "#ffd85c", "#fd7b5f"],
        ["#37A2DA", "#67E0E3", "#FFDB5C", "#ff9f7f", "#E062AE", "#9d96f5"],
        ["#37A2DA", "#32C5E9", "#9FE6B8", "#FFDB5C", "#ff9f7f", "#fb7293", "#e7bcf3", "#8378EA", "#96BFFF"], Um
      ]
    },
    Ym = "#eee",
    Zm = function() {
      return {
        axisLine: {
          lineStyle: {
            color: Ym
          }
        },
        axisTick: {
          lineStyle: {
            color: Ym
          }
        },
        axisLabel: {
          textStyle: {
            color: Ym
          }
        },
        splitLine: {
          lineStyle: {
            type: "dashed",
            color: "#aaa"
          }
        },
        splitArea: {
          areaStyle: {
            color: Ym
          }
        }
      }
    },
    $m = ["#dd6b66", "#759aa0", "#e69d87", "#8dc1a9", "#ea7e53", "#eedd78", "#73a373", "#73b9bc", "#7289ab", "#91ca8c", "#f49f42"],
    Km = {
      color: $m,
      backgroundColor: "#333",
      tooltip: {
        axisPointer: {
          lineStyle: {
            color: Ym
          },
          crossStyle: {
            color: Ym
          }
        }
      },
      legend: {
        textStyle: {
          color: Ym
        }
      },
      textStyle: {
        color: Ym
      },
      title: {
        textStyle: {
          color: Ym
        }
      },
      toolbox: {
        iconStyle: {
          normal: {
            borderColor: Ym
          }
        }
      },
      dataZoom: {
        textStyle: {
          color: Ym
        }
      },
      visualMap: {
        textStyle: {
          color: Ym
        }
      },
      timeline: {
        lineStyle: {
          color: Ym
        },
        itemStyle: {
          normal: {
            color: $m[1]
          }
        },
        label: {
          normal: {
            textStyle: {
              color: Ym
            }
          }
        },
        controlStyle: {
          normal: {
            color: Ym,
            borderColor: Ym
          }
        }
      },
      timeAxis: Zm(),
      logAxis: Zm(),
      valueAxis: Zm(),
      categoryAxis: Zm(),
      line: {
        symbol: "circle"
      },
      graph: {
        color: $m
      },
      gauge: {
        title: {
          textStyle: {
            color: Ym
          }
        }
      },
      candlestick: {
        itemStyle: {
          normal: {
            color: "#FD1050",
            color0: "#0CF49B",
            borderColor: "#FD1050",
            borderColor0: "#0CF49B"
          }
        }
      }
    };
  Km.categoryAxis.splitLine.show = !1, Vv.extend({
    type: "dataset",
    defaultOption: {
      seriesLayoutBy: Qv,
      sourceHeader: null,
      dimensions: null,
      source: null
    },
    optionUpdated: function() {
      Xo(this)
    }
  }), km.extend({
    type: "dataset"
  });
  var Qm = Vr.extend({
      type: "ellipse",
      shape: {
        cx: 0,
        cy: 0,
        rx: 0,
        ry: 0
      },
      buildPath: function(t, e) {
        var n = .5522848,
          i = e.cx,
          r = e.cy,
          a = e.rx,
          o = e.ry,
          s = a * n,
          l = o * n;
        t.moveTo(i - a, r), t.bezierCurveTo(i - a, r - l, i - s, r - o, i, r - o), t.bezierCurveTo(i + s, r - o, i + a, r - l, i + a, r), t.bezierCurveTo(i + a, r + l, i + s, r + o, i, r + o), t.bezierCurveTo(i - s, r + o, i - a, r + l, i - a, r), t.closePath()
      }
    }),
    Jm = /[\s,]+/;
  yl.prototype.parse = function(t, e) {
    e = e || {};
    var n = ml(t);
    if (!n) throw new Error("Illegal svg");
    var i = new _d;
    this._root = i;
    var r = n.getAttribute("viewBox") || "",
      a = parseFloat(n.getAttribute("width") || e.width),
      o = parseFloat(n.getAttribute("height") || e.height);
    isNaN(a) && (a = null), isNaN(o) && (o = null), bl(n, i, null, !0);
    for (var s = n.firstChild; s;) this._parseNode(s, i), s = s.nextSibling;
    var l, u;
    if (r) {
      var h = E(r).split(Jm);
      h.length >= 4 && (l = {
        x: parseFloat(h[0] || 0),
        y: parseFloat(h[1] || 0),
        width: parseFloat(h[2]),
        height: parseFloat(h[3])
      })
    }
    if (l && null != a && null != o && (u = Cl(l, a, o), !e.ignoreViewBox)) {
      var c = i;
      i = new _d, i.add(c), c.scale = u.scale.slice(), c.position = u.position.slice()
    }
    return e.ignoreRootClip || null == a || null == o || i.setClipPath(new qg({
      shape: {
        x: 0,
        y: 0,
        width: a,
        height: o
      }
    })), {
      root: i,
      width: a,
      height: o,
      viewBoxRect: l,
      viewBoxTransform: u
    }
  }, yl.prototype._parseNode = function(t, e) {
    var n = t.nodeName.toLowerCase();
    "defs" === n ? this._isDefine = !0 : "text" === n && (this._isText = !0);
    var i;
    if (this._isDefine) {
      var r = ey[n];
      if (r) {
        var a = r.call(this, t),
          o = t.getAttribute("id");
        o && (this._defs[o] = a)
      }
    } else {
      var r = ty[n];
      r && (i = r.call(this, t, e), e.add(i))
    }
    for (var s = t.firstChild; s;) 1 === s.nodeType && this._parseNode(s, i), 3 === s.nodeType && this._isText && this._parseText(s, i), s = s.nextSibling;
    "defs" === n ? this._isDefine = !1 : "text" === n && (this._isText = !1)
  }, yl.prototype._parseText = function(t, e) {
    if (1 === t.nodeType) {
      var n = t.getAttribute("dx") || 0,
        i = t.getAttribute("dy") || 0;
      this._textX += parseFloat(n), this._textY += parseFloat(i)
    }
    var r = new Og({
      style: {
        text: t.textContent,
        transformText: !0
      },
      position: [this._textX || 0, this._textY || 0]
    });
    xl(e, r), bl(t, r, this._defs);
    var a = r.style.fontSize;
    a && 9 > a && (r.style.fontSize = 9, r.scale = r.scale || [1, 1], r.scale[0] *= a / 9, r.scale[1] *= a / 9);
    var o = r.getBoundingRect();
    return this._textX += o.width, e.add(r), r
  };
  var ty = {
      g: function(t, e) {
        var n = new _d;
        return xl(e, n), bl(t, n, this._defs), n
      },
      rect: function(t, e) {
        var n = new qg;
        return xl(e, n), bl(t, n, this._defs), n.setShape({
          x: parseFloat(t.getAttribute("x") || 0),
          y: parseFloat(t.getAttribute("y") || 0),
          width: parseFloat(t.getAttribute("width") || 0),
          height: parseFloat(t.getAttribute("height") || 0)
        }), n
      },
      circle: function(t, e) {
        var n = new Eg;
        return xl(e, n), bl(t, n, this._defs), n.setShape({
          cx: parseFloat(t.getAttribute("cx") || 0),
          cy: parseFloat(t.getAttribute("cy") || 0),
          r: parseFloat(t.getAttribute("r") || 0)
        }), n
      },
      line: function(t, e) {
        var n = new jg;
        return xl(e, n), bl(t, n, this._defs), n.setShape({
          x1: parseFloat(t.getAttribute("x1") || 0),
          y1: parseFloat(t.getAttribute("y1") || 0),
          x2: parseFloat(t.getAttribute("x2") || 0),
          y2: parseFloat(t.getAttribute("y2") || 0)
        }), n
      },
      ellipse: function(t, e) {
        var n = new Qm;
        return xl(e, n), bl(t, n, this._defs), n.setShape({
          cx: parseFloat(t.getAttribute("cx") || 0),
          cy: parseFloat(t.getAttribute("cy") || 0),
          rx: parseFloat(t.getAttribute("rx") || 0),
          ry: parseFloat(t.getAttribute("ry") || 0)
        }), n
      },
      polygon: function(t, e) {
        var n = t.getAttribute("points");
        n && (n = wl(n));
        var i = new Hg({
          shape: {
            points: n || []
          }
        });
        return xl(e, i), bl(t, i, this._defs), i
      },
      polyline: function(t, e) {
        var n = new Vr;
        xl(e, n), bl(t, n, this._defs);
        var i = t.getAttribute("points");
        i && (i = wl(i));
        var r = new Wg({
          shape: {
            points: i || []
          }
        });
        return r
      },
      image: function(t, e) {
        var n = new bi;
        return xl(e, n), bl(t, n, this._defs), n.setStyle({
          image: t.getAttribute("xlink:href"),
          x: t.getAttribute("x"),
          y: t.getAttribute("y"),
          width: t.getAttribute("width"),
          height: t.getAttribute("height")
        }), n
      },
      text: function(t, e) {
        var n = t.getAttribute("x") || 0,
          i = t.getAttribute("y") || 0,
          r = t.getAttribute("dx") || 0,
          a = t.getAttribute("dy") || 0;
        this._textX = parseFloat(n) + parseFloat(r), this._textY = parseFloat(i) + parseFloat(a);
        var o = new _d;
        return xl(e, o), bl(t, o, this._defs), o
      },
      tspan: function(t, e) {
        var n = t.getAttribute("x"),
          i = t.getAttribute("y");
        null != n && (this._textX = parseFloat(n)), null != i && (this._textY = parseFloat(i));
        var r = t.getAttribute("dx") || 0,
          a = t.getAttribute("dy") || 0,
          o = new _d;
        return xl(e, o), bl(t, o, this._defs), this._textX += r, this._textY += a, o
      },
      path: function(t, e) {
        var n = t.getAttribute("d") || "",
          i = Xr(n);
        return xl(e, i), bl(t, i, this._defs), i
      }
    },
    ey = {
      lineargradient: function(t) {
        var e = parseInt(t.getAttribute("x1") || 0, 10),
          n = parseInt(t.getAttribute("y1") || 0, 10),
          i = parseInt(t.getAttribute("x2") || 10, 10),
          r = parseInt(t.getAttribute("y2") || 0, 10),
          a = new Jg(e, n, i, r);
        return _l(t, a), a
      },
      radialgradient: function() {}
    },
    ny = {
      fill: "fill",
      stroke: "stroke",
      "stroke-width": "lineWidth",
      opacity: "opacity",
      "fill-opacity": "fillOpacity",
      "stroke-opacity": "strokeOpacity",
      "stroke-dasharray": "lineDash",
      "stroke-dashoffset": "lineDashOffset",
      "stroke-linecap": "lineCap",
      "stroke-linejoin": "lineJoin",
      "stroke-miterlimit": "miterLimit",
      "font-family": "fontFamily",
      "font-size": "fontSize",
      "font-style": "fontStyle",
      "font-weight": "fontWeight",
      "text-align": "textAlign",
      "alignment-baseline": "textBaseline"
    },
    iy = /url\(\s*#(.*?)\)/,
    ry = /(translate|scale|rotate|skewX|skewY|matrix)\(([\-\s0-9\.e,]*)\)/g,
    ay = /([^\s:;]+)\s*:\s*([^:;]+)/g,
    oy = N(),
    sy = {
      registerMap: function(t, e, n) {
        var i;
        return x(e) ? i = e : e.svg ? i = [{
          type: "svg",
          source: e.svg,
          specialAreas: e.specialAreas
        }] : (e.geoJson && !e.features && (n = e.specialAreas, e = e.geoJson), i = [{
          type: "geoJSON",
          source: e,
          specialAreas: n
        }]), d(i, function(t) {
          var e = t.type;
          "geoJson" === e && (e = t.type = "geoJSON");
          var n = ly[e];
          n(t)
        }), oy.set(t, i)
      },
      retrieveMap: function(t) {
        return oy.get(t)
      }
    },
    ly = {
      geoJSON: function(t) {
        var e = t.source;
        t.geoJSON = b(e) ? "undefined" != typeof JSON && JSON.parse ? JSON.parse(e) : new Function("return (" + e + ");")() : e
      },
      svg: function(t) {
        t.svgXML = ml(t.source)
      }
    },
    uy = O,
    hy = d,
    cy = w,
    fy = S,
    dy = Vv.parseClassType,
    py = "4.4.0",
    gy = {
      zrender: "4.1.1"
    },
    vy = 1,
    my = 1e3,
    yy = 800,
    _y = 900,
    xy = 5e3,
    wy = 1e3,
    by = 1100,
    Sy = 2e3,
    My = 3e3,
    Ty = 3500,
    Cy = 4e3,
    Iy = 5e3,
    ky = {
      PROCESSOR: {
        FILTER: my,
        SERIES_FILTER: yy,
        STATISTIC: xy
      },
      VISUAL: {
        LAYOUT: wy,
        PROGRESSIVE_LAYOUT: by,
        GLOBAL: Sy,
        CHART: My,
        POST_CHART_LAYOUT: Ty,
        COMPONENT: Cy,
        BRUSH: Iy
      }
    },
    Ay = "__flagInMainProcess",
    Dy = "__optionUpdated",
    Py = /^[a-zA-Z0-9_]+$/;
  kl.prototype.on = Il("on", !0), kl.prototype.off = Il("off", !0), kl.prototype.one = Il("one", !0), c(kl, kf);
  var Ly = Al.prototype;
  Ly._onframe = function() {
    if (!this._disposed) {
      var t = this._scheduler;
      if (this[Dy]) {
        var e = this[Dy].silent;
        this[Ay] = !0, Pl(this), Oy.update.call(this), this[Ay] = !1, this[Dy] = !1, Bl.call(this, e), Rl.call(this, e)
      } else if (t.unfinished) {
        var n = vy,
          i = this._model,
          r = this._api;
        t.unfinished = !1;
        do {
          var a = +new Date;
          t.performSeriesTasks(i), t.performDataProcessorTasks(i), Ol(this, i), t.performVisualTasks(i), Wl(this, this._model, r, "remain"), n -= +new Date - a
        } while (n > 0 && t.unfinished);
        t.unfinished || this._zr.flush()
      }
    }
  }, Ly.getDom = function() {
    return this._dom
  }, Ly.getZr = function() {
    return this._zr
  }, Ly.setOption = function(t, e, n) {
    if (!this._disposed) {
      var i;
      if (fy(e) && (n = e.lazyUpdate, i = e.silent, e = e.notMerge), this[Ay] = !0, !this._model || e) {
        var r = new cs(this._api),
          a = this._theme,
          o = this._model = new nm;
        o.scheduler = this._scheduler, o.init(null, null, a, r)
      }
      this._model.setOption(t, Ny), n ? (this[Dy] = {
        silent: i
      }, this[Ay] = !1) : (Pl(this), Oy.update.call(this), this._zr.flush(), this[Dy] = !1, this[Ay] = !1, Bl.call(this, i), Rl.call(this, i))
    }
  }, Ly.setTheme = function() {
    console.error("ECharts#setTheme() is DEPRECATED in ECharts 3.0")
  }, Ly.getModel = function() {
    return this._model
  }, Ly.getOption = function() {
    return this._model && this._model.getOption()
  }, Ly.getWidth = function() {
    return this._zr.getWidth()
  }, Ly.getHeight = function() {
    return this._zr.getHeight()
  }, Ly.getDevicePixelRatio = function() {
    return this._zr.painter.dpr || window.devicePixelRatio || 1
  }, Ly.getRenderedCanvas = function(t) {
    if ( of .canvasSupported) {
      t = t || {}, t.pixelRatio = t.pixelRatio || 1, t.backgroundColor = t.backgroundColor || this._model.get("backgroundColor");
      var e = this._zr;
      return e.painter.getRenderedCanvas(t)
    }
  }, Ly.getSvgDataUrl = function() {
    if ( of .svgSupported) {
      var t = this._zr,
        e = t.storage.getDisplayList();
      return d(e, function(t) {
        t.stopAnimation(!0)
      }), t.painter.pathToDataUrl()
    }
  }, Ly.getDataURL = function(t) {
    if (!this._disposed) {
      t = t || {};
      var e = t.excludeComponents,
        n = this._model,
        i = [],
        r = this;
      hy(e, function(t) {
        n.eachComponent({
          mainType: t
        }, function(t) {
          var e = r._componentsMap[t.__viewId];
          e.group.ignore || (i.push(e), e.group.ignore = !0)
        })
      });
      var a = "svg" === this._zr.painter.getType() ? this.getSvgDataUrl() : this.getRenderedCanvas(t).toDataURL("image/" + (t && t.type || "png"));
      return hy(i, function(t) {
        t.group.ignore = !1
      }), a
    }
  }, Ly.getConnectedDataURL = function(t) {
    if (!this._disposed && of .canvasSupported) {
      var e = this.group,
        n = Math.min,
        r = Math.max,
        a = 1 / 0;
      if (Xy[e]) {
        var o = a,
          s = a,
          l = -a,
          u = -a,
          h = [],
          c = t && t.pixelRatio || 1;
        d(Gy, function(a) {
          if (a.group === e) {
            var c = a.getRenderedCanvas(i(t)),
              f = a.getDom().getBoundingClientRect();
            o = n(f.left, o), s = n(f.top, s), l = r(f.right, l), u = r(f.bottom, u), h.push({
              dom: c,
              left: f.left,
              top: f.top
            })
          }
        }), o *= c, s *= c, l *= c, u *= c;
        var f = l - o,
          p = u - s,
          g = mf();
        g.width = f, g.height = p;
        var v = Ei(g);
        return t.connectedBackgroundColor && v.add(new qg({
          shape: {
            x: 0,
            y: 0,
            width: f,
            height: p
          },
          style: {
            fill: t.connectedBackgroundColor
          }
        })), hy(h, function(t) {
          var e = new bi({
            style: {
              x: t.left * c - o,
              y: t.top * c - s,
              image: t.dom
            }
          });
          v.add(e)
        }), v.refreshImmediately(), g.toDataURL("image/" + (t && t.type || "png"))
      }
      return this.getDataURL(t)
    }
  }, Ly.convertToPixel = _(Dl, "convertToPixel"), Ly.convertFromPixel = _(Dl, "convertFromPixel"), Ly.containPixel = function(t, e) {
    if (!this._disposed) {
      var n, i = this._model;
      return t = Zi(i, t), d(t, function(t, i) {
        i.indexOf("Models") >= 0 && d(t, function(t) {
          var r = t.coordinateSystem;
          if (r && r.containPoint) n |= !!r.containPoint(e);
          else if ("seriesModels" === i) {
            var a = this._chartsMap[t.__viewId];
            a && a.containPoint && (n |= a.containPoint(e, t))
          }
        }, this)
      }, this), !!n
    }
  }, Ly.getVisual = function(t, e) {
    var n = this._model;
    t = Zi(n, t, {
      defaultMainType: "series"
    });
    var i = t.seriesModel,
      r = i.getData(),
      a = t.hasOwnProperty("dataIndexInside") ? t.dataIndexInside : t.hasOwnProperty("dataIndex") ? r.indexOfRawIndex(t.dataIndex) : null;
    return null != a ? r.getItemVisual(a, e) : r.getVisual(e)
  }, Ly.getViewOfComponentModel = function(t) {
    return this._componentsMap[t.__viewId]
  }, Ly.getViewOfSeriesModel = function(t) {
    return this._chartsMap[t.__viewId]
  };
  var Oy = {
    prepareAndUpdate: function(t) {
      Pl(this), Oy.update.call(this, t)
    },
    update: function(t) {
      var e = this._model,
        n = this._api,
        i = this._zr,
        r = this._coordSysMgr,
        a = this._scheduler;
      if (e) {
        a.restoreData(e, t), a.performSeriesTasks(e), r.create(e, n), a.performDataProcessorTasks(e, t), Ol(this, e), r.update(e, n), Fl(e), a.performVisualTasks(e, t), Vl(this, e, n, t);
        var o = e.get("backgroundColor") || "transparent";
        if ( of .canvasSupported) i.setBackgroundColor(o);
        else {
          var s = Ye(o);
          o = rn(s, "rgb"), 0 === s[3] && (o = "transparent")
        }
        Gl(e, n)
      }
    },
    updateTransform: function(t) {
      var e = this._model,
        n = this,
        i = this._api;
      if (e) {
        var r = [];
        e.eachComponent(function(a, o) {
          var s = n.getViewOfComponentModel(o);
          if (s && s.__alive)
            if (s.updateTransform) {
              var l = s.updateTransform(o, e, i, t);
              l && l.update && r.push(s)
            } else r.push(s)
        });
        var a = N();
        e.eachSeries(function(r) {
          var o = n._chartsMap[r.__viewId];
          if (o.updateTransform) {
            var s = o.updateTransform(r, e, i, t);
            s && s.update && a.set(r.uid, 1)
          } else a.set(r.uid, 1)
        }), Fl(e), this._scheduler.performVisualTasks(e, t, {
          setDirty: !0,
          dirtyMap: a
        }), Wl(n, e, i, t, a), Gl(e, this._api)
      }
    },
    updateView: function(t) {
      var e = this._model;
      e && ($s.markUpdateMethod(t, "updateView"), Fl(e), this._scheduler.performVisualTasks(e, t, {
        setDirty: !0
      }), Vl(this, this._model, this._api, t), Gl(e, this._api))
    },
    updateVisual: function(t) {
      Oy.update.call(this, t)
    },
    updateLayout: function(t) {
      Oy.update.call(this, t)
    }
  };
  Ly.resize = function(t) {
    if (!this._disposed) {
      this._zr.resize(t);
      var e = this._model;
      if (this._loadingFX && this._loadingFX.resize(), e) {
        var n = e.resetOption("media"),
          i = t && t.silent;
        this[Ay] = !0, n && Pl(this), Oy.update.call(this), this[Ay] = !1, Bl.call(this, i), Rl.call(this, i)
      }
    }
  }, Ly.showLoading = function(t, e) {
    if (!this._disposed && (fy(t) && (e = t, t = ""), t = t || "default", this.hideLoading(), Wy[t])) {
      var n = Wy[t](this._api, e),
        i = this._zr;
      this._loadingFX = n, i.add(n)
    }
  }, Ly.hideLoading = function() {
    this._disposed || (this._loadingFX && this._zr.remove(this._loadingFX), this._loadingFX = null)
  }, Ly.makeActionFromEvent = function(t) {
    var e = o({}, t);
    return e.type = Ry[t.type], e
  }, Ly.dispatchAction = function(t, e) {
    if (!this._disposed && (fy(e) || (e = {
        silent: !!e
      }), By[t.type] && this._model)) {
      if (this[Ay]) return void this._pendingActions.push(t);
      El.call(this, t, e.silent), e.flush ? this._zr.flush(!0) : e.flush !== !1 && of .browser.weChat && this._throttledZrFlush(), Bl.call(this, e.silent), Rl.call(this, e.silent)
    }
  }, Ly.appendData = function(t) {
    if (!this._disposed) {
      var e = t.seriesIndex,
        n = this.getModel(),
        i = n.getSeriesByIndex(e);
      i.appendData(t), this._scheduler.unfinished = !0
    }
  }, Ly.on = Il("on", !1), Ly.off = Il("off", !1), Ly.one = Il("one", !1);
  var Ey = ["click", "dblclick", "mouseover", "mouseout", "mousemove", "mousedown", "mouseup", "globalout", "contextmenu"];
  Ly._initEvents = function() {
    hy(Ey, function(t) {
      var e = function(e) {
        var n, i = this.getModel(),
          r = e.target,
          a = "globalout" === t;
        if (a) n = {};
        else if (r && null != r.dataIndex) {
          var s = r.dataModel || i.getSeriesByIndex(r.seriesIndex);
          n = s && s.getDataParams(r.dataIndex, r.dataType, r) || {}
        } else r && r.eventData && (n = o({}, r.eventData));
        if (n) {
          var l = n.componentType,
            u = n.componentIndex;
          ("markLine" === l || "markPoint" === l || "markArea" === l) && (l = "series", u = n.seriesIndex);
          var h = l && null != u && i.getComponent(l, u),
            c = h && this["series" === h.mainType ? "_chartsMap" : "_componentsMap"][h.__viewId];
          n.event = e, n.type = t, this._ecEventProcessor.eventInfo = {
            targetEl: r,
            packedEvent: n,
            model: h,
            view: c
          }, this.trigger(t, n)
        }
      };
      e.zrEventfulCallAtLast = !0, this._zr.on(t, e, this)
    }, this), hy(Ry, function(t, e) {
      this._messageCenter.on(e, function(t) {
        this.trigger(e, t)
      }, this)
    }, this)
  }, Ly.isDisposed = function() {
    return this._disposed
  }, Ly.clear = function() {
    this._disposed || this.setOption({
      series: []
    }, !0)
  }, Ly.dispose = function() {
    if (!this._disposed) {
      this._disposed = !0, Ki(this.getDom(), jy, "");
      var t = this._api,
        e = this._model;
      hy(this._componentsViews, function(n) {
        n.dispose(e, t)
      }), hy(this._chartsViews, function(n) {
        n.dispose(e, t)
      }), this._zr.dispose(), delete Gy[this.id]
    }
  }, c(Al, kf), Yl.prototype = {
    constructor: Yl,
    normalizeQuery: function(t) {
      var e = {},
        n = {},
        i = {};
      if (b(t)) {
        var r = dy(t);
        e.mainType = r.main || null, e.subType = r.sub || null
      } else {
        var a = ["Index", "Name", "Id"],
          o = {
            name: 1,
            dataIndex: 1,
            dataType: 1
          };
        d(t, function(t, r) {
          for (var s = !1, l = 0; l < a.length; l++) {
            var u = a[l],
              h = r.lastIndexOf(u);
            if (h > 0 && h === r.length - u.length) {
              var c = r.slice(0, h);
              "data" !== c && (e.mainType = c, e[u.toLowerCase()] = t, s = !0)
            }
          }
          o.hasOwnProperty(r) && (n[r] = t, s = !0), s || (i[r] = t)
        })
      }
      return {
        cptQuery: e,
        dataQuery: n,
        otherQuery: i
      }
    },
    filter: function(t, e) {
      function n(t, e, n, i) {
        return null == t[n] || e[i || n] === t[n]
      }
      var i = this.eventInfo;
      if (!i) return !0;
      var r = i.targetEl,
        a = i.packedEvent,
        o = i.model,
        s = i.view;
      if (!o || !s) return !0;
      var l = e.cptQuery,
        u = e.dataQuery;
      return n(l, o, "mainType") && n(l, o, "subType") && n(l, o, "index", "componentIndex") && n(l, o, "name") && n(l, o, "id") && n(u, a, "name") && n(u, a, "dataIndex") && n(u, a, "dataType") && (!s.filterForExposedEvent || s.filterForExposedEvent(t, e.otherQuery, r, a))
    },
    afterTrigger: function() {
      this.eventInfo = null
    }
  };
  var By = {},
    Ry = {},
    zy = [],
    Ny = [],
    Fy = [],
    Vy = [],
    Hy = {},
    Wy = {},
    Gy = {},
    Xy = {},
    qy = new Date - 0,
    Uy = new Date - 0,
    jy = "_echarts_instance_",
    Yy = Ql;
  hu(Sy, Bm), iu(vm), ru(_y, mm), fu("default", Fm), ou({
    type: "highlight",
    event: "highlight",
    update: "highlight"
  }, V), ou({
    type: "downplay",
    event: "downplay",
    update: "downplay"
  }, V), nu("light", jm), nu("dark", Km);
  var Zy = {};
  wu.prototype = {
    constructor: wu,
    add: function(t) {
      return this._add = t, this
    },
    update: function(t) {
      return this._update = t, this
    },
    remove: function(t) {
      return this._remove = t, this
    },
    execute: function() {
      var t, e = this._old,
        n = this._new,
        i = {},
        r = {},
        a = [],
        o = [];
      for (bu(e, i, a, "_oldKeyGetter", this), bu(n, r, o, "_newKeyGetter", this), t = 0; t < e.length; t++) {
        var s = a[t],
          l = r[s];
        if (null != l) {
          var u = l.length;
          u ? (1 === u && (r[s] = null), l = l.unshift()) : r[s] = null, this._update && this._update(l, t)
        } else this._remove && this._remove(t)
      }
      for (var t = 0; t < o.length; t++) {
        var s = o[t];
        if (r.hasOwnProperty(s)) {
          var l = r[s];
          if (null == l) continue;
          if (l.length)
            for (var h = 0, u = l.length; u > h; h++) this._add && this._add(l[h]);
          else this._add && this._add(l)
        }
      }
    }
  };
  var $y = N(["tooltip", "label", "itemName", "itemId", "seriesName"]),
    Ky = S,
    Qy = "undefined",
    Jy = -1,
    t_ = "e\x00\x00",
    e_ = {
      "float": typeof Float64Array === Qy ? Array : Float64Array,
      "int": typeof Int32Array === Qy ? Array : Int32Array,
      ordinal: Array,
      number: Array,
      time: Array
    },
    n_ = typeof Uint32Array === Qy ? Array : Uint32Array,
    i_ = typeof Int32Array === Qy ? Array : Int32Array,
    r_ = typeof Uint16Array === Qy ? Array : Uint16Array,
    a_ = ["hasItemOption", "_nameList", "_idList", "_invertedIndicesMap", "_rawData", "_chunkSize", "_chunkCount", "_dimValueGetter", "_count", "_rawCount", "_nameDimIdx", "_idDimIdx"],
    o_ = ["_extent", "_approximateExtent", "_rawExtent"],
    s_ = function(t, e) {
      t = t || ["x", "y"];
      for (var n = {}, i = [], r = {}, a = 0; a < t.length; a++) {
        var o = t[a];
        b(o) && (o = {
          name: o
        });
        var s = o.name;
        o.type = o.type || "float", o.coordDim || (o.coordDim = s, o.coordDimIndex = 0), o.otherDims = o.otherDims || {}, i.push(s), n[s] = o, o.index = a, o.createInvertedIndices && (r[s] = [])
      }
      this.dimensions = i, this._dimensionInfos = n, this.hostModel = e, this.dataType, this._indices = null, this._count = 0, this._rawCount = 0, this._storage = {}, this._nameList = [], this._idList = [], this._optionModels = [], this._visual = {}, this._layout = {}, this._itemVisuals = [], this.hasItemVisual = {}, this._itemLayouts = [], this._graphicEls = [], this._chunkSize = 1e5, this._chunkCount = 0, this._rawData, this._rawExtent = {}, this._extent = {}, this._approximateExtent = {}, this._dimensionsSummary = Su(this), this._invertedIndicesMap = r, this._calculationInfo = {}, this.userOutput = this._dimensionsSummary.userOutput
    },
    l_ = s_.prototype;
  l_.type = "list", l_.hasItemOption = !0, l_.getDimension = function(t) {
    return ("number" == typeof t || !isNaN(t) && !this._dimensionInfos.hasOwnProperty(t)) && (t = this.dimensions[t]), t
  }, l_.getDimensionInfo = function(t) {
    return this._dimensionInfos[this.getDimension(t)]
  }, l_.getDimensionsOnCoord = function() {
    return this._dimensionsSummary.dataDimsOnCoord.slice()
  }, l_.mapDimension = function(t, e) {
    var n = this._dimensionsSummary;
    if (null == e) return n.encodeFirstDimNotExtra[t];
    var i = n.encode[t];
    return e === !0 ? (i || []).slice() : i && i[e]
  }, l_.initData = function(t, e, n) {
    var i = Go.isInstance(t) || f(t);
    i && (t = new As(t, this.dimensions.length)), this._rawData = t, this._storage = {}, this._indices = null, this._nameList = e || [], this._idList = [], this._nameRepeatCount = {}, n || (this.hasItemOption = !1), this.defaultDimValueGetter = wm[this._rawData.getSource().sourceFormat], this._dimValueGetter = n = n || this.defaultDimValueGetter, this._dimValueGetterArrayRows = wm.arrayRows, this._rawExtent = {}, this._initDataFromProvider(0, t.count()), t.pure && (this.hasItemOption = !1)
  }, l_.getProvider = function() {
    return this._rawData
  }, l_.appendData = function(t) {
    var e = this._rawData,
      n = this.count();
    e.appendData(t);
    var i = e.count();
    e.persistent || (i += n), this._initDataFromProvider(n, i)
  }, l_.appendValues = function(t, e) {
    for (var n = this._chunkSize, i = this._storage, r = this.dimensions, a = r.length, o = this._rawExtent, s = this.count(), l = s + Math.max(t.length, e ? e.length : 0), u = this._chunkCount, h = 0; a > h; h++) {
      var c = r[h];
      o[c] || (o[c] = Fu()), i[c] || (i[c] = []), Du(i, this._dimensionInfos[c], n, u, l), this._chunkCount = i[c].length
    }
    for (var f = new Array(a), d = s; l > d; d++) {
      for (var p = d - s, g = Math.floor(d / n), v = d % n, m = 0; a > m; m++) {
        var c = r[m],
          y = this._dimValueGetterArrayRows(t[p] || f, c, p, m);
        i[c][g][v] = y;
        var _ = o[c];
        y < _[0] && (_[0] = y), y > _[1] && (_[1] = y)
      }
      e && (this._nameList[d] = e[p])
    }
    this._rawCount = this._count = l, this._extent = {}, Pu(this)
  }, l_._initDataFromProvider = function(t, e) {
    if (!(t >= e)) {
      for (var n, i = this._chunkSize, r = this._rawData, a = this._storage, o = this.dimensions, s = o.length, l = this._dimensionInfos, u = this._nameList, h = this._idList, c = this._rawExtent, f = this._nameRepeatCount = {}, d = this._chunkCount, p = 0; s > p; p++) {
        var g = o[p];
        c[g] || (c[g] = Fu());
        var v = l[g];
        0 === v.otherDims.itemName && (n = this._nameDimIdx = p), 0 === v.otherDims.itemId && (this._idDimIdx = p), a[g] || (a[g] = []), Du(a, v, i, d, e), this._chunkCount = a[g].length
      }
      for (var m = new Array(s), y = t; e > y; y++) {
        m = r.getItem(y, m);
        for (var _ = Math.floor(y / i), x = y % i, w = 0; s > w; w++) {
          var g = o[w],
            b = a[g][_],
            S = this._dimValueGetter(m, g, y, w);
          b[x] = S;
          var M = c[g];
          S < M[0] && (M[0] = S), S > M[1] && (M[1] = S)
        }
        if (!r.pure) {
          var T = u[y];
          if (m && null == T)
            if (null != m.name) u[y] = T = m.name;
            else if (null != n) {
            var C = o[n],
              I = a[C][_];
            if (I) {
              T = I[x];
              var k = l[C].ordinalMeta;
              k && k.categories.length && (T = k.categories[T])
            }
          }
          var A = null == m ? null : m.id;
          null == A && null != T && (f[T] = f[T] || 0, A = T, f[T] > 0 && (A += "__ec__" + f[T]), f[T]++), null != A && (h[y] = A)
        }
      }!r.persistent && r.clean && r.clean(), this._rawCount = this._count = e, this._extent = {}, Pu(this)
    }
  }, l_.count = function() {
    return this._count
  }, l_.getIndices = function() {
    var t, e = this._indices;
    if (e) {
      var n = e.constructor,
        i = this._count;
      if (n === Array) {
        t = new n(i);
        for (var r = 0; i > r; r++) t[r] = e[r]
      } else t = new n(e.buffer, 0, i)
    } else
      for (var n = Iu(this), t = new n(this.count()), r = 0; r < t.length; r++) t[r] = r;
    return t
  }, l_.get = function(t, e) {
    if (!(e >= 0 && e < this._count)) return 0 / 0;
    var n = this._storage;
    if (!n[t]) return 0 / 0;
    e = this.getRawIndex(e);
    var i = Math.floor(e / this._chunkSize),
      r = e % this._chunkSize,
      a = n[t][i],
      o = a[r];
    return o
  }, l_.getByRawIndex = function(t, e) {
    if (!(e >= 0 && e < this._rawCount)) return 0 / 0;
    var n = this._storage[t];
    if (!n) return 0 / 0;
    var i = Math.floor(e / this._chunkSize),
      r = e % this._chunkSize,
      a = n[i];
    return a[r]
  }, l_._getFast = function(t, e) {
    var n = Math.floor(e / this._chunkSize),
      i = e % this._chunkSize,
      r = this._storage[t][n];
    return r[i]
  }, l_.getValues = function(t, e) {
    var n = [];
    x(t) || (e = t, t = this.dimensions);
    for (var i = 0, r = t.length; r > i; i++) n.push(this.get(t[i], e));
    return n
  }, l_.hasValue = function(t) {
    for (var e = this._dimensionsSummary.dataDimsOnCoord, n = 0, i = e.length; i > n; n++)
      if (isNaN(this.get(e[n], t))) return !1;
    return !0
  }, l_.getDataExtent = function(t) {
    t = this.getDimension(t);
    var e = this._storage[t],
      n = Fu();
    if (!e) return n;
    var i, r = this.count(),
      a = !this._indices;
    if (a) return this._rawExtent[t].slice();
    if (i = this._extent[t]) return i.slice();
    i = n;
    for (var o = i[0], s = i[1], l = 0; r > l; l++) {
      var u = this._getFast(t, this.getRawIndex(l));
      o > u && (o = u), u > s && (s = u)
    }
    return i = [o, s], this._extent[t] = i, i
  }, l_.getApproximateExtent = function(t) {
    return t = this.getDimension(t), this._approximateExtent[t] || this.getDataExtent(t)
  }, l_.setApproximateExtent = function(t, e) {
    e = this.getDimension(e), this._approximateExtent[e] = t.slice()
  }, l_.getCalculationInfo = function(t) {
    return this._calculationInfo[t]
  }, l_.setCalculationInfo = function(t, e) {
    Ky(t) ? o(this._calculationInfo, t) : this._calculationInfo[t] = e
  }, l_.getSum = function(t) {
    var e = this._storage[t],
      n = 0;
    if (e)
      for (var i = 0, r = this.count(); r > i; i++) {
        var a = this.get(t, i);
        isNaN(a) || (n += a)
      }
    return n
  }, l_.getMedian = function(t) {
    var e = [];
    this.each(t, function(t) {
      isNaN(t) || e.push(t)
    });
    var n = [].concat(e).sort(function(t, e) {
        return t - e
      }),
      i = this.count();
    return 0 === i ? 0 : i % 2 === 1 ? n[(i - 1) / 2] : (n[i / 2] + n[i / 2 - 1]) / 2
  }, l_.rawIndexOf = function(t, e) {
    var n = t && this._invertedIndicesMap[t],
      i = n[e];
    return null == i || isNaN(i) ? Jy : i
  }, l_.indexOfName = function(t) {
    for (var e = 0, n = this.count(); n > e; e++)
      if (this.getName(e) === t) return e;
    return -1
  }, l_.indexOfRawIndex = function(t) {
    if (!this._indices) return t;
    if (t >= this._rawCount || 0 > t) return -1;
    var e = this._indices,
      n = e[t];
    if (null != n && n < this._count && n === t) return t;
    for (var i = 0, r = this._count - 1; r >= i;) {
      var a = (i + r) / 2 | 0;
      if (e[a] < t) i = a + 1;
      else {
        if (!(e[a] > t)) return a;
        r = a - 1
      }
    }
    return -1
  }, l_.indicesOfNearest = function(t, e, n) {
    var i = this._storage,
      r = i[t],
      a = [];
    if (!r) return a;
    null == n && (n = 1 / 0);
    for (var o = Number.MAX_VALUE, s = -1, l = 0, u = this.count(); u > l; l++) {
      var h = e - this.get(t, l),
        c = Math.abs(h);
      n >= h && o >= c && ((o > c || h >= 0 && 0 > s) && (o = c, s = h, a.length = 0), a.push(l))
    }
    return a
  }, l_.getRawIndex = Ou, l_.getRawDataItem = function(t) {
    if (this._rawData.persistent) return this._rawData.getItem(this.getRawIndex(t));
    for (var e = [], n = 0; n < this.dimensions.length; n++) {
      var i = this.dimensions[n];
      e.push(this.get(i, t))
    }
    return e
  }, l_.getName = function(t) {
    var e = this.getRawIndex(t);
    return this._nameList[e] || Lu(this, this._nameDimIdx, e) || ""
  }, l_.getId = function(t) {
    return Bu(this, this.getRawIndex(t))
  }, l_.each = function(t, e, n, i) {
    if (this._count) {
      "function" == typeof t && (i = n, n = e, e = t, t = []), n = n || i || this, t = p(Ru(t), this.getDimension, this);
      for (var r = t.length, a = 0; a < this.count(); a++) switch (r) {
        case 0:
          e.call(n, a);
          break;
        case 1:
          e.call(n, this.get(t[0], a), a);
          break;
        case 2:
          e.call(n, this.get(t[0], a), this.get(t[1], a), a);
          break;
        default:
          for (var o = 0, s = []; r > o; o++) s[o] = this.get(t[o], a);
          s[o] = a, e.apply(n, s)
      }
    }
  }, l_.filterSelf = function(t, e, n, i) {
    if (this._count) {
      "function" == typeof t && (i = n, n = e, e = t, t = []), n = n || i || this, t = p(Ru(t), this.getDimension, this);
      for (var r = this.count(), a = Iu(this), o = new a(r), s = [], l = t.length, u = 0, h = t[0], c = 0; r > c; c++) {
        var f, d = this.getRawIndex(c);
        if (0 === l) f = e.call(n, c);
        else if (1 === l) {
          var g = this._getFast(h, d);
          f = e.call(n, g, c)
        } else {
          for (var v = 0; l > v; v++) s[v] = this._getFast(h, d);
          s[v] = c, f = e.apply(n, s)
        }
        f && (o[u++] = d)
      }
      return r > u && (this._indices = o), this._count = u, this._extent = {}, this.getRawIndex = this._indices ? Eu : Ou, this
    }
  }, l_.selectRange = function(t) {
    if (this._count) {
      var e = [];
      for (var n in t) t.hasOwnProperty(n) && e.push(n);
      var i = e.length;
      if (i) {
        var r = this.count(),
          a = Iu(this),
          o = new a(r),
          s = 0,
          l = e[0],
          u = t[l][0],
          h = t[l][1],
          c = !1;
        if (!this._indices) {
          var f = 0;
          if (1 === i) {
            for (var d = this._storage[e[0]], p = 0; p < this._chunkCount; p++)
              for (var g = d[p], v = Math.min(this._count - p * this._chunkSize, this._chunkSize), m = 0; v > m; m++) {
                var y = g[m];
                (y >= u && h >= y || isNaN(y)) && (o[s++] = f), f++
              }
            c = !0
          } else if (2 === i) {
            for (var d = this._storage[l], _ = this._storage[e[1]], x = t[e[1]][0], w = t[e[1]][1], p = 0; p < this._chunkCount; p++)
              for (var g = d[p], b = _[p], v = Math.min(this._count - p * this._chunkSize, this._chunkSize), m = 0; v > m; m++) {
                var y = g[m],
                  S = b[m];
                (y >= u && h >= y || isNaN(y)) && (S >= x && w >= S || isNaN(S)) && (o[s++] = f), f++
              }
            c = !0
          }
        }
        if (!c)
          if (1 === i)
            for (var m = 0; r > m; m++) {
              var M = this.getRawIndex(m),
                y = this._getFast(l, M);
              (y >= u && h >= y || isNaN(y)) && (o[s++] = M)
            } else
              for (var m = 0; r > m; m++) {
                for (var T = !0, M = this.getRawIndex(m), p = 0; i > p; p++) {
                  var C = e[p],
                    y = this._getFast(n, M);
                  (y < t[C][0] || y > t[C][1]) && (T = !1)
                }
                T && (o[s++] = this.getRawIndex(m))
              }
        return r > s && (this._indices = o), this._count = s, this._extent = {}, this.getRawIndex = this._indices ? Eu : Ou, this
      }
    }
  }, l_.mapArray = function(t, e, n, i) {
    "function" == typeof t && (i = n, n = e, e = t, t = []), n = n || i || this;
    var r = [];
    return this.each(t, function() {
      r.push(e && e.apply(this, arguments))
    }, n), r
  }, l_.map = function(t, e, n, i) {
    n = n || i || this, t = p(Ru(t), this.getDimension, this);
    var r = zu(this, t);
    r._indices = this._indices, r.getRawIndex = r._indices ? Eu : Ou;
    for (var a = r._storage, o = [], s = this._chunkSize, l = t.length, u = this.count(), h = [], c = r._rawExtent, f = 0; u > f; f++) {
      for (var d = 0; l > d; d++) h[d] = this.get(t[d], f);
      h[l] = f;
      var g = e && e.apply(n, h);
      if (null != g) {
        "object" != typeof g && (o[0] = g, g = o);
        for (var v = this.getRawIndex(f), m = Math.floor(v / s), y = v % s, _ = 0; _ < g.length; _++) {
          var x = t[_],
            w = g[_],
            b = c[x],
            S = a[x];
          S && (S[m][y] = w), w < b[0] && (b[0] = w), w > b[1] && (b[1] = w)
        }
      }
    }
    return r
  }, l_.downSample = function(t, e, n, i) {
    for (var r = zu(this, [t]), a = r._storage, o = [], s = Math.floor(1 / e), l = a[t], u = this.count(), h = this._chunkSize, c = r._rawExtent[t], f = new(Iu(this))(u), d = 0, p = 0; u > p; p += s) {
      s > u - p && (s = u - p, o.length = s);
      for (var g = 0; s > g; g++) {
        var v = this.getRawIndex(p + g),
          m = Math.floor(v / h),
          y = v % h;
        o[g] = l[m][y]
      }
      var _ = n(o),
        x = this.getRawIndex(Math.min(p + i(o, _) || 0, u - 1)),
        w = Math.floor(x / h),
        b = x % h;
      l[w][b] = _, _ < c[0] && (c[0] = _), _ > c[1] && (c[1] = _), f[d++] = x
    }
    return r._count = d, r._indices = f, r.getRawIndex = Eu, r
  }, l_.getItemModel = function(t) {
    var e = this.hostModel;
    return new Qa(this.getRawDataItem(t), e, e && e.ecModel)
  }, l_.diff = function(t) {
    var e = this;
    return new wu(t ? t.getIndices() : [], this.getIndices(), function(e) {
      return Bu(t, e)
    }, function(t) {
      return Bu(e, t)
    })
  }, l_.getVisual = function(t) {
    var e = this._visual;
    return e && e[t]
  }, l_.setVisual = function(t, e) {
    if (Ky(t))
      for (var n in t) t.hasOwnProperty(n) && this.setVisual(n, t[n]);
    else this._visual = this._visual || {}, this._visual[t] = e
  }, l_.setLayout = function(t, e) {
    if (Ky(t))
      for (var n in t) t.hasOwnProperty(n) && this.setLayout(n, t[n]);
    else this._layout[t] = e
  }, l_.getLayout = function(t) {
    return this._layout[t]
  }, l_.getItemLayout = function(t) {
    return this._itemLayouts[t]
  }, l_.setItemLayout = function(t, e, n) {
    this._itemLayouts[t] = n ? o(this._itemLayouts[t] || {}, e) : e
  }, l_.clearItemLayouts = function() {
    this._itemLayouts.length = 0
  }, l_.getItemVisual = function(t, e, n) {
    var i = this._itemVisuals[t],
      r = i && i[e];
    return null != r || n ? r : this.getVisual(e)
  }, l_.setItemVisual = function(t, e, n) {
    var i = this._itemVisuals[t] || {},
      r = this.hasItemVisual;
    if (this._itemVisuals[t] = i, Ky(e))
      for (var a in e) e.hasOwnProperty(a) && (i[a] = e[a], r[a] = !0);
    else i[e] = n, r[e] = !0
  }, l_.clearAllVisual = function() {
    this._visual = {}, this._itemVisuals = [], this.hasItemVisual = {}
  };
  var u_ = function(t) {
    t.seriesIndex = this.seriesIndex, t.dataIndex = this.dataIndex, t.dataType = this.dataType
  };
  l_.setItemGraphicEl = function(t, e) {
    var n = this.hostModel;
    e && (e.dataIndex = t, e.dataType = this.dataType, e.seriesIndex = n && n.seriesIndex, "group" === e.type && e.traverse(u_, e)), this._graphicEls[t] = e
  }, l_.getItemGraphicEl = function(t) {
    return this._graphicEls[t]
  }, l_.eachItemGraphicEl = function(t, e) {
    d(this._graphicEls, function(n, i) {
      n && t && t.call(e, n, i)
    })
  }, l_.cloneShallow = function(t) {
    if (!t) {
      var e = p(this.dimensions, this.getDimensionInfo, this);
      t = new s_(e, this.hostModel)
    }
    if (t._storage = this._storage, Au(t, this), this._indices) {
      var n = this._indices.constructor;
      t._indices = new n(this._indices)
    } else t._indices = null;
    return t.getRawIndex = t._indices ? Eu : Ou, t
  }, l_.wrapMethod = function(t, e) {
    var n = this[t];
    "function" == typeof n && (this.__wrappedMethods = this.__wrappedMethods || [], this.__wrappedMethods.push(t), this[t] = function() {
      var t = n.apply(this, arguments);
      return e.apply(this, [t].concat(P(arguments)))
    })
  }, l_.TRANSFERABLE_METHODS = ["cloneShallow", "downSample", "map"], l_.CHANGABLE_METHODS = ["filterSelf", "selectRange"];
  var h_ = function(t, e) {
    return e = e || {}, Vu(e.coordDimensions || [], t, {
      dimsDef: e.dimensionsDefine || t.dimensionsDefine,
      encodeDef: e.encodeDefine || t.encodeDefine,
      dimCount: e.dimensionsCount,
      generateCoord: e.generateCoord,
      generateCoordCount: e.generateCoordCount
    })
  };
  Zu.prototype.parse = function(t) {
    return t
  }, Zu.prototype.getSetting = function(t) {
    return this._setting[t]
  }, Zu.prototype.contain = function(t) {
    var e = this._extent;
    return t >= e[0] && t <= e[1]
  }, Zu.prototype.normalize = function(t) {
    var e = this._extent;
    return e[1] === e[0] ? .5 : (t - e[0]) / (e[1] - e[0])
  }, Zu.prototype.scale = function(t) {
    var e = this._extent;
    return t * (e[1] - e[0]) + e[0]
  }, Zu.prototype.unionExtent = function(t) {
    var e = this._extent;
    t[0] < e[0] && (e[0] = t[0]), t[1] > e[1] && (e[1] = t[1])
  }, Zu.prototype.unionExtentFromData = function(t, e) {
    this.unionExtent(t.getApproximateExtent(e))
  }, Zu.prototype.getExtent = function() {
    return this._extent.slice()
  }, Zu.prototype.setExtent = function(t, e) {
    var n = this._extent;
    isNaN(t) || (n[0] = t), isNaN(e) || (n[1] = e)
  }, Zu.prototype.isBlank = function() {
    return this._isBlank
  }, Zu.prototype.setBlank = function(t) {
    this._isBlank = t
  }, Zu.prototype.getLabel = null, nr(Zu), or(Zu, {
    registerWhenExtend: !0
  }), $u.createByAxisModel = function(t) {
    var e = t.option,
      n = e.data,
      i = n && p(n, Qu);
    return new $u({
      categories: i,
      needCollect: !i,
      deduplication: e.dedplication !== !1
    })
  };
  var c_ = $u.prototype;
  c_.getOrdinal = function(t) {
    return Ku(this).get(t)
  }, c_.parseAndCollect = function(t) {
    var e, n = this._needCollect;
    if ("string" != typeof t && !n) return t;
    if (n && !this._deduplication) return e = this.categories.length, this.categories[e] = t, e;
    var i = Ku(this);
    return e = i.get(t), null == e && (n ? (e = this.categories.length, this.categories[e] = t, i.set(t, e)) : e = 0 / 0), e
  };
  var f_ = Zu.prototype,
    d_ = Zu.extend({
      type: "ordinal",
      init: function(t, e) {
        (!t || x(t)) && (t = new $u({
          categories: t
        })), this._ordinalMeta = t, this._extent = e || [0, t.categories.length - 1]
      },
      parse: function(t) {
        return "string" == typeof t ? this._ordinalMeta.getOrdinal(t) : Math.round(t)
      },
      contain: function(t) {
        return t = this.parse(t), f_.contain.call(this, t) && null != this._ordinalMeta.categories[t]
      },
      normalize: function(t) {
        return f_.normalize.call(this, this.parse(t))
      },
      scale: function(t) {
        return Math.round(f_.scale.call(this, t))
      },
      getTicks: function() {
        for (var t = [], e = this._extent, n = e[0]; n <= e[1];) t.push(n), n++;
        return t
      },
      getLabel: function(t) {
        return this.isBlank() ? void 0 : this._ordinalMeta.categories[t]
      },
      count: function() {
        return this._extent[1] - this._extent[0] + 1
      },
      unionExtentFromData: function(t, e) {
        this.unionExtent(t.getApproximateExtent(e))
      },
      getOrdinalMeta: function() {
        return this._ordinalMeta
      },
      niceTicks: V,
      niceExtent: V
    });
  d_.create = function() {
    return new d_
  };
  var p_ = so,
    g_ = so,
    v_ = Zu.extend({
      type: "interval",
      _interval: 0,
      _intervalPrecision: 2,
      setExtent: function(t, e) {
        var n = this._extent;
        isNaN(t) || (n[0] = parseFloat(t)), isNaN(e) || (n[1] = parseFloat(e))
      },
      unionExtent: function(t) {
        var e = this._extent;
        t[0] < e[0] && (e[0] = t[0]), t[1] > e[1] && (e[1] = t[1]), v_.prototype.setExtent.call(this, e[0], e[1])
      },
      getInterval: function() {
        return this._interval
      },
      setInterval: function(t) {
        this._interval = t, this._niceExtent = this._extent.slice(), this._intervalPrecision = th(t)
      },
      getTicks: function() {
        return ih(this._interval, this._extent, this._niceExtent, this._intervalPrecision)
      },
      getLabel: function(t, e) {
        if (null == t) return "";
        var n = e && e.precision;
        return null == n ? n = ho(t) || 0 : "auto" === n && (n = this._intervalPrecision), t = g_(t, n, !0), So(t)
      },
      niceTicks: function(t, e, n) {
        t = t || 5;
        var i = this._extent,
          r = i[1] - i[0];
        if (isFinite(r)) {
          0 > r && (r = -r, i.reverse());
          var a = Ju(i, t, e, n);
          this._intervalPrecision = a.intervalPrecision, this._interval = a.interval, this._niceExtent = a.niceTickExtent
        }
      },
      niceExtent: function(t) {
        var e = this._extent;
        if (e[0] === e[1])
          if (0 !== e[0]) {
            var n = e[0];
            t.fixMax ? e[0] -= n / 2 : (e[1] += n / 2, e[0] -= n / 2)
          } else e[1] = 1;
        var i = e[1] - e[0];
        isFinite(i) || (e[0] = 0, e[1] = 1), this.niceTicks(t.splitNumber, t.minInterval, t.maxInterval);
        var r = this._interval;
        t.fixMin || (e[0] = g_(Math.floor(e[0] / r) * r)), t.fixMax || (e[1] = g_(Math.ceil(e[1] / r) * r))
      }
    });
  v_.create = function() {
    return new v_
  };
  var m_ = "__ec_stack_",
    y_ = .5,
    __ = "undefined" != typeof Float32Array ? Float32Array : Array,
    x_ = ({
      seriesType: "bar",
      plan: Dm(),
      reset: function(t) {
        function e(t, e) {
          for (var n, c = t.count, f = new __(2 * c), d = new __(c), p = [], g = [], v = 0, m = 0; null != (n = t.next());) g[u] = e.get(o, n), g[1 - u] = e.get(s, n), p = i.dataToPoint(g, null, p), f[v++] = p[0], f[v++] = p[1], d[m++] = n;
          e.setLayout({
            largePoints: f,
            largeDataIndices: d,
            barWidth: h,
            valueAxisStart: fh(r, a, !1),
            valueAxisHorizontal: l
          })
        }
        if (hh(t) && ch(t)) {
          var n = t.getData(),
            i = t.coordinateSystem,
            r = i.getBaseAxis(),
            a = i.getOtherAxis(r),
            o = n.mapDimension(a.dim),
            s = n.mapDimension(r.dim),
            l = a.isHorizontal(),
            u = l ? 0 : 1,
            h = uh(sh([t]), r, t).width;
          return h > y_ || (h = y_), {
            progress: e
          }
        }
      }
    }, v_.prototype),
    w_ = Math.ceil,
    b_ = Math.floor,
    S_ = 1e3,
    M_ = 60 * S_,
    T_ = 60 * M_,
    C_ = 24 * T_,
    I_ = function(t, e, n, i) {
      for (; i > n;) {
        var r = n + i >>> 1;
        t[r][1] < e ? n = r + 1 : i = r
      }
      return n
    },
    k_ = v_.extend({
      type: "time",
      getLabel: function(t) {
        var e = this._stepLvl,
          n = new Date(t);
        return Do(e[0], n, this.getSetting("useUTC"))
      },
      niceExtent: function(t) {
        var e = this._extent;
        if (e[0] === e[1] && (e[0] -= C_, e[1] += C_), e[1] === -1 / 0 && 1 / 0 === e[0]) {
          var n = new Date;
          e[1] = +new Date(n.getFullYear(), n.getMonth(), n.getDate()), e[0] = e[1] - C_
        }
        this.niceTicks(t.splitNumber, t.minInterval, t.maxInterval);
        var i = this._interval;
        t.fixMin || (e[0] = so(b_(e[0] / i) * i)), t.fixMax || (e[1] = so(w_(e[1] / i) * i))
      },
      niceTicks: function(t, e, n) {
        t = t || 10;
        var i = this._extent,
          r = i[1] - i[0],
          a = r / t;
        null != e && e > a && (a = e), null != n && a > n && (a = n);
        var o = A_.length,
          s = I_(A_, a, 0, o),
          l = A_[Math.min(s, o - 1)],
          u = l[1];
        if ("year" === l[0]) {
          var h = r / u,
            c = _o(h / t, !0);
          u *= c
        }
        var f = this.getSetting("useUTC") ? 0 : 60 * new Date(+i[0] || +i[1]).getTimezoneOffset() * 1e3,
          d = [Math.round(w_((i[0] - f) / u) * u + f), Math.round(b_((i[1] - f) / u) * u + f)];
        nh(d, i), this._stepLvl = l, this._interval = u, this._niceExtent = d
      },
      parse: function(t) {
        return +vo(t)
      }
    });
  d(["contain", "normalize"], function(t) {
    k_.prototype[t] = function(e) {
      return x_[t].call(this, this.parse(e))
    }
  });
  var A_ = [
    ["hh:mm:ss", S_],
    ["hh:mm:ss", 5 * S_],
    ["hh:mm:ss", 10 * S_],
    ["hh:mm:ss", 15 * S_],
    ["hh:mm:ss", 30 * S_],
    ["hh:mm\nMM-dd", M_],
    ["hh:mm\nMM-dd", 5 * M_],
    ["hh:mm\nMM-dd", 10 * M_],
    ["hh:mm\nMM-dd", 15 * M_],
    ["hh:mm\nMM-dd", 30 * M_],
    ["hh:mm\nMM-dd", T_],
    ["hh:mm\nMM-dd", 2 * T_],
    ["hh:mm\nMM-dd", 6 * T_],
    ["hh:mm\nMM-dd", 12 * T_],
    ["MM-dd\nyyyy", C_],
    ["MM-dd\nyyyy", 2 * C_],
    ["MM-dd\nyyyy", 3 * C_],
    ["MM-dd\nyyyy", 4 * C_],
    ["MM-dd\nyyyy", 5 * C_],
    ["MM-dd\nyyyy", 6 * C_],
    ["week", 7 * C_],
    ["MM-dd\nyyyy", 10 * C_],
    ["week", 14 * C_],
    ["week", 21 * C_],
    ["month", 31 * C_],
    ["week", 42 * C_],
    ["month", 62 * C_],
    ["week", 70 * C_],
    ["quarter", 95 * C_],
    ["month", 31 * C_ * 4],
    ["month", 31 * C_ * 5],
    ["half-year", 380 * C_ / 2],
    ["month", 31 * C_ * 8],
    ["month", 31 * C_ * 10],
    ["year", 380 * C_]
  ];
  k_.create = function(t) {
    return new k_({
      useUTC: t.ecModel.get("useUTC")
    })
  };
  var D_ = Zu.prototype,
    P_ = v_.prototype,
    L_ = ho,
    O_ = so,
    E_ = Math.floor,
    B_ = Math.ceil,
    R_ = Math.pow,
    z_ = Math.log,
    N_ = Zu.extend({
      type: "log",
      base: 10,
      $constructor: function() {
        Zu.apply(this, arguments), this._originalScale = new v_
      },
      getTicks: function() {
        var t = this._originalScale,
          e = this._extent,
          n = t.getExtent();
        return p(P_.getTicks.call(this), function(i) {
          var r = so(R_(this.base, i));
          return r = i === e[0] && t.__fixMin ? dh(r, n[0]) : r, r = i === e[1] && t.__fixMax ? dh(r, n[1]) : r
        }, this)
      },
      getLabel: P_.getLabel,
      scale: function(t) {
        return t = D_.scale.call(this, t), R_(this.base, t)
      },
      setExtent: function(t, e) {
        var n = this.base;
        t = z_(t) / z_(n), e = z_(e) / z_(n), P_.setExtent.call(this, t, e)
      },
      getExtent: function() {
        var t = this.base,
          e = D_.getExtent.call(this);
        e[0] = R_(t, e[0]), e[1] = R_(t, e[1]);
        var n = this._originalScale,
          i = n.getExtent();
        return n.__fixMin && (e[0] = dh(e[0], i[0])), n.__fixMax && (e[1] = dh(e[1], i[1])), e
      },
      unionExtent: function(t) {
        this._originalScale.unionExtent(t);
        var e = this.base;
        t[0] = z_(t[0]) / z_(e), t[1] = z_(t[1]) / z_(e), D_.unionExtent.call(this, t)
      },
      unionExtentFromData: function(t, e) {
        this.unionExtent(t.getApproximateExtent(e))
      },
      niceTicks: function(t) {
        t = t || 10;
        var e = this._extent,
          n = e[1] - e[0];
        if (!(1 / 0 === n || 0 >= n)) {
          var i = mo(n),
            r = t / n * i;
          for (.5 >= r && (i *= 10); !isNaN(i) && Math.abs(i) < 1 && Math.abs(i) > 0;) i *= 10;
          var a = [so(B_(e[0] / i) * i), so(E_(e[1] / i) * i)];
          this._interval = i, this._niceExtent = a
        }
      },
      niceExtent: function(t) {
        P_.niceExtent.call(this, t);
        var e = this._originalScale;
        e.__fixMin = t.fixMin, e.__fixMax = t.fixMax
      }
    });
  d(["contain", "normalize"], function(t) {
    N_.prototype[t] = function(e) {
      return e = z_(e) / z_(this.base), D_[t].call(this, e)
    }
  }), N_.create = function() {
    return new N_
  };
  var F_ = {
      getMin: function(t) {
        var e = this.option,
          n = t || null == e.rangeStart ? e.min : e.rangeStart;
        return this.axis && null != n && "dataMin" !== n && "function" != typeof n && !I(n) && (n = this.axis.scale.parse(n)), n
      },
      getMax: function(t) {
        var e = this.option,
          n = t || null == e.rangeEnd ? e.max : e.rangeEnd;
        return this.axis && null != n && "dataMax" !== n && "function" != typeof n && !I(n) && (n = this.axis.scale.parse(n)), n
      },
      getNeedCrossZero: function() {
        var t = this.option;
        return null != t.rangeStart || null != t.rangeEnd ? !1 : !t.scale
      },
      getCoordSysModel: V,
      setRange: function(t, e) {
        this.option.rangeStart = t, this.option.rangeEnd = e
      },
      resetRange: function() {
        this.option.rangeStart = this.option.rangeEnd = null
      }
    },
    V_ = ta({
      type: "triangle",
      shape: {
        cx: 0,
        cy: 0,
        width: 0,
        height: 0
      },
      buildPath: function(t, e) {
        var n = e.cx,
          i = e.cy,
          r = e.width / 2,
          a = e.height / 2;
        t.moveTo(n, i - a), t.lineTo(n + r, i + a), t.lineTo(n - r, i + a), t.closePath()
      }
    }),
    H_ = ta({
      type: "diamond",
      shape: {
        cx: 0,
        cy: 0,
        width: 0,
        height: 0
      },
      buildPath: function(t, e) {
        var n = e.cx,
          i = e.cy,
          r = e.width / 2,
          a = e.height / 2;
        t.moveTo(n, i - a), t.lineTo(n + r, i), t.lineTo(n, i + a), t.lineTo(n - r, i), t.closePath()
      }
    }),
    W_ = ta({
      type: "pin",
      shape: {
        x: 0,
        y: 0,
        width: 0,
        height: 0
      },
      buildPath: function(t, e) {
        var n = e.x,
          i = e.y,
          r = e.width / 5 * 3,
          a = Math.max(r, e.height),
          o = r / 2,
          s = o * o / (a - o),
          l = i - a + o + s,
          u = Math.asin(s / o),
          h = Math.cos(u) * o,
          c = Math.sin(u),
          f = Math.cos(u),
          d = .6 * o,
          p = .7 * o;
        t.moveTo(n - h, l + s), t.arc(n, l, o, Math.PI - u, 2 * Math.PI + u), t.bezierCurveTo(n + h - c * d, l + s + f * d, n, i - p, n, i), t.bezierCurveTo(n, i - p, n - h + c * d, l + s + f * d, n - h, l + s), t.closePath()
      }
    }),
    G_ = ta({
      type: "arrow",
      shape: {
        x: 0,
        y: 0,
        width: 0,
        height: 0
      },
      buildPath: function(t, e) {
        var n = e.height,
          i = e.width,
          r = e.x,
          a = e.y,
          o = i / 3 * 2;
        t.moveTo(r, a), t.lineTo(r + o, a + n), t.lineTo(r, a + n / 4 * 3), t.lineTo(r - o, a + n), t.lineTo(r, a), t.closePath()
      }
    }),
    X_ = {
      line: jg,
      rect: qg,
      roundRect: qg,
      square: qg,
      circle: Eg,
      diamond: H_,
      pin: W_,
      arrow: G_,
      triangle: V_
    },
    q_ = {
      line: function(t, e, n, i, r) {
        r.x1 = t, r.y1 = e + i / 2, r.x2 = t + n, r.y2 = e + i / 2
      },
      rect: function(t, e, n, i, r) {
        r.x = t, r.y = e, r.width = n, r.height = i
      },
      roundRect: function(t, e, n, i, r) {
        r.x = t, r.y = e, r.width = n, r.height = i, r.r = Math.min(n, i) / 4
      },
      square: function(t, e, n, i, r) {
        var a = Math.min(n, i);
        r.x = t, r.y = e, r.width = a, r.height = a
      },
      circle: function(t, e, n, i, r) {
        r.cx = t + n / 2, r.cy = e + i / 2, r.r = Math.min(n, i) / 2
      },
      diamond: function(t, e, n, i, r) {
        r.cx = t + n / 2, r.cy = e + i / 2, r.width = n, r.height = i
      },
      pin: function(t, e, n, i, r) {
        r.x = t + n / 2, r.y = e + i / 2, r.width = n, r.height = i
      },
      arrow: function(t, e, n, i, r) {
        r.x = t + n / 2, r.y = e + i / 2, r.width = n, r.height = i
      },
      triangle: function(t, e, n, i, r) {
        r.cx = t + n / 2, r.cy = e + i / 2, r.width = n, r.height = i
      }
    },
    U_ = {};
  d(X_, function(t, e) {
    U_[e] = new t
  });
  var j_ = ta({
      type: "symbol",
      shape: {
        symbolType: "",
        x: 0,
        y: 0,
        width: 0,
        height: 0
      },
      calculateTextPosition: function(t, e, n) {
        var i = qn(t, e, n),
          r = this.shape;
        return r && "pin" === r.symbolType && "inside" === e.textPosition && (i.y = n.y + .4 * n.height), i
      },
      buildPath: function(t, e, n) {
        var i = e.symbolType;
        if ("none" !== i) {
          var r = U_[i];
          r || (i = "rect", r = U_[i]), q_[i](e.x, e.y, e.width, e.height, r.shape), r.buildPath(t, r.shape, n)
        }
      }
    }),
    Y_ = {
      isDimensionStacked: Xu,
      enableDataStack: Gu,
      getStackedDimension: qu
    },
    Z_ = (Object.freeze || Object)({
      createList: Ih,
      getLayoutRect: Bo,
      dataStack: Y_,
      createScale: kh,
      mixinAxisModelCommonMethods: Ah,
      completeDimensions: Vu,
      createDimensions: h_,
      createSymbol: Ch
    }),
    $_ = 1e-8;
  Lh.prototype = {
    constructor: Lh,
    properties: null,
    getBoundingRect: function() {
      var t = this._rect;
      if (t) return t;
      for (var e = Number.MAX_VALUE, n = [e, e], i = [-e, -e], r = [], a = [], o = this.geometries, s = 0; s < o.length; s++)
        if ("polygon" === o[s].type) {
          var l = o[s].exterior;
          wr(l, r, a), oe(n, n, r), se(i, i, a)
        }
      return 0 === s && (n[0] = n[1] = i[0] = i[1] = 0), this._rect = new wn(n[0], n[1], i[0] - n[0], i[1] - n[1])
    },
    contain: function(t) {
      var e = this.getBoundingRect(),
        n = this.geometries;
      if (!e.contain(t[0], t[1])) return !1;
      t: for (var i = 0, r = n.length; r > i; i++)
        if ("polygon" === n[i].type) {
          var a = n[i].exterior,
            o = n[i].interiors;
          if (Ph(a, t[0], t[1])) {
            for (var s = 0; s < (o ? o.length : 0); s++)
              if (Ph(o[s])) continue t;
            return !0
          }
        }
      return !1
    },
    transformTo: function(t, e, n, i) {
      var r = this.getBoundingRect(),
        a = r.width / r.height;
      n ? i || (i = n / a) : n = a * i;
      for (var o = new wn(t, e, n, i), s = r.calculateTransform(o), l = this.geometries, u = 0; u < l.length; u++)
        if ("polygon" === l[u].type) {
          for (var h = l[u].exterior, c = l[u].interiors, f = 0; f < h.length; f++) ae(h[f], h[f], s);
          for (var d = 0; d < (c ? c.length : 0); d++)
            for (var f = 0; f < c[d].length; f++) ae(c[d][f], c[d][f], s)
        }
      r = this._rect, r.copy(o), this.center = [r.x + r.width / 2, r.y + r.height / 2]
    },
    cloneShallow: function(t) {
      null == t && (t = this.name);
      var e = new Lh(t, this.geometries, this.center);
      return e._rect = this._rect, e.transformTo = null, e
    }
  };
  var K_ = function(t) {
      return Oh(t), p(v(t.features, function(t) {
        return t.geometry && t.properties && t.geometry.coordinates.length > 0
      }), function(t) {
        var e = t.properties,
          n = t.geometry,
          i = n.coordinates,
          r = [];
        "Polygon" === n.type && r.push({
          type: "polygon",
          exterior: i[0],
          interiors: i.slice(1)
        }), "MultiPolygon" === n.type && d(i, function(t) {
          t[0] && r.push({
            type: "polygon",
            exterior: t[0],
            interiors: t.slice(1)
          })
        });
        var a = new Lh(e.name, r, e.cp);
        return a.properties = e, a
      })
    },
    Q_ = Yi(),
    J_ = [0, 1],
    tx = function(t, e, n) {
      this.dim = t, this.scale = e, this._extent = n || [0, 0], this.inverse = !1, this.onBand = !1
    };
  tx.prototype = {
    constructor: tx,
    contain: function(t) {
      var e = this._extent,
        n = Math.min(e[0], e[1]),
        i = Math.max(e[0], e[1]);
      return t >= n && i >= t
    },
    containData: function(t) {
      return this.contain(this.dataToCoord(t))
    },
    getExtent: function() {
      return this._extent.slice()
    },
    getPixelPrecision: function(t) {
      return co(t || this.scale.getExtent(), this._extent)
    },
    setExtent: function(t, e) {
      var n = this._extent;
      n[0] = t, n[1] = e
    },
    dataToCoord: function(t, e) {
      var n = this._extent,
        i = this.scale;
      return t = i.normalize(t), this.onBand && "ordinal" === i.type && (n = n.slice(), Zh(n, i.count())), ao(t, J_, n, e)
    },
    coordToData: function(t, e) {
      var n = this._extent,
        i = this.scale;
      this.onBand && "ordinal" === i.type && (n = n.slice(), Zh(n, i.count()));
      var r = ao(t, n, J_, e);
      return this.scale.scale(r)
    },
    pointToData: function() {},
    getTicksCoords: function(t) {
      t = t || {};
      var e = t.tickModel || this.getTickModel(),
        n = Rh(this, e),
        i = n.ticks,
        r = p(i, function(t) {
          return {
            coord: this.dataToCoord(t),
            tickValue: t
          }
        }, this),
        a = e.get("alignWithLabel");
      return $h(this, r, n.tickCategoryInterval, a, t.clamp), r
    },
    getViewLabels: function() {
      return Bh(this).labels
    },
    getLabelModel: function() {
      return this.model.getModel("axisLabel")
    },
    getTickModel: function() {
      return this.model.getModel("axisTick")
    },
    getBandWidth: function() {
      var t = this._extent,
        e = this.scale.getExtent(),
        n = e[1] - e[0] + (this.onBand ? 1 : 0);
      0 === n && (n = 1);
      var i = Math.abs(t[1] - t[0]);
      return Math.abs(i) / n
    },
    isHorizontal: null,
    getRotate: null,
    calculateCategoryInterval: function() {
      return qh(this)
    }
  };
  var ex = K_,
    nx = {};
  d(["map", "each", "filter", "indexOf", "inherits", "reduce", "filter", "bind", "curry", "isArray", "isString", "isObject", "isFunction", "extend", "defaults", "clone", "merge"], function(t) {
    nx[t] = xf[t]
  });
  var ix = {};
  d(["extendShape", "extendPath", "makePath", "makeImage", "mergePath", "resizePath", "createIcon", "setHoverStyle", "setLabelStyle", "setTextStyle", "setText", "getFont", "updateProps", "initProps", "getTransform", "clipPointsByRect", "clipRectByRect", "registerShape", "getShapeClass", "Group", "Image", "Text", "Circle", "Sector", "Ring", "Polygon", "Polyline", "Rect", "Line", "BezierCurve", "Arc", "IncrementalDisplayable", "CompoundPath", "LinearGradient", "RadialGradient", "BoundingRect"], function(t) {
    ix[t] = vv[t]
  }), Im.extend({
    type: "series.line",
    dependencies: ["grid", "polar"],
    getInitialData: function() {
      return Uu(this.getSource(), this)
    },
    defaultOption: {
      zlevel: 0,
      z: 2,
      coordinateSystem: "cartesian2d",
      legendHoverLink: !0,
      hoverAnimation: !0,
      clip: !0,
      label: {
        position: "top"
      },
      lineStyle: {
        width: 2,
        type: "solid"
      },
      step: !1,
      smooth: !1,
      smoothMonotone: null,
      symbol: "emptyCircle",
      symbolSize: 4,
      symbolRotate: null,
      showSymbol: !0,
      showAllSymbol: "auto",
      connectNulls: !1,
      sampling: "none",
      animationEasing: "linear",
      progressive: 0,
      hoverLayerThreshold: 1 / 0
    }
  });
  var rx = Qh.prototype,
    ax = Qh.getSymbolSize = function(t, e) {
      var n = t.getItemVisual(e, "symbolSize");
      return n instanceof Array ? n.slice() : [+n, +n]
    };
  rx._createSymbol = function(t, e, n, i, r) {
    this.removeAll();
    var a = e.getItemVisual(n, "color"),
      o = Ch(t, -1, -1, 2, 2, a, r);
    o.attr({
      z2: 100,
      culling: !0,
      scale: Jh(i)
    }), o.drift = tc, this._symbolType = t, this.add(o)
  }, rx.stopSymbolAnimation = function(t) {
    this.childAt(0).stopAnimation(t)
  }, rx.getSymbolPath = function() {
    return this.childAt(0)
  }, rx.getScale = function() {
    return this.childAt(0).scale
  }, rx.highlight = function() {
    this.childAt(0).trigger("emphasis")
  }, rx.downplay = function() {
    this.childAt(0).trigger("normal")
  }, rx.setZ = function(t, e) {
    var n = this.childAt(0);
    n.zlevel = t, n.z = e
  }, rx.setDraggable = function(t) {
    var e = this.childAt(0);
    e.draggable = t, e.cursor = t ? "move" : e.cursor
  }, rx.updateData = function(t, e, n) {
    this.silent = !1;
    var i = t.getItemVisual(e, "symbol") || "circle",
      r = t.hostModel,
      a = ax(t, e),
      o = i !== this._symbolType;
    if (o) {
      var s = t.getItemVisual(e, "symbolKeepAspect");
      this._createSymbol(i, t, e, a, s)
    } else {
      var l = this.childAt(0);
      l.silent = !1, Fa(l, {
        scale: Jh(a)
      }, r, e)
    }
    if (this._updateCommon(t, e, a, n), o) {
      var l = this.childAt(0),
        u = n && n.fadeIn,
        h = {
          scale: l.scale.slice()
        };
      u && (h.style = {
        opacity: l.style.opacity
      }), l.scale = [0, 0], u && (l.style.opacity = 0), Va(l, h, r, e)
    }
    this._seriesModel = r
  };
  var ox = ["itemStyle"],
    sx = ["emphasis", "itemStyle"],
    lx = ["label"],
    ux = ["emphasis", "label"];
  rx._updateCommon = function(t, e, n, i) {
    function r(e) {
      return b ? t.getName(e) : Kh(t, e)
    }
    var a = this.childAt(0),
      s = t.hostModel,
      l = t.getItemVisual(e, "color");
    "image" !== a.type && a.useStyle({
      strokeNoScale: !0
    });
    var u = i && i.itemStyle,
      h = i && i.hoverItemStyle,
      c = i && i.symbolRotate,
      f = i && i.symbolOffset,
      d = i && i.labelModel,
      p = i && i.hoverLabelModel,
      g = i && i.hoverAnimation,
      v = i && i.cursorStyle;
    if (!i || t.hasItemOption) {
      var m = i && i.itemModel ? i.itemModel : t.getItemModel(e);
      u = m.getModel(ox).getItemStyle(["color"]), h = m.getModel(sx).getItemStyle(), c = m.getShallow("symbolRotate"), f = m.getShallow("symbolOffset"), d = m.getModel(lx), p = m.getModel(ux), g = m.getShallow("hoverAnimation"), v = m.getShallow("cursor")
    } else h = o({}, h);
    var y = a.style;
    a.attr("rotation", (c || 0) * Math.PI / 180 || 0), f && a.attr("position", [oo(f[0], n[0]), oo(f[1], n[1])]), v && a.attr("cursor", v), a.setColor(l, i && i.symbolInnerColor), a.setStyle(u);
    var _ = t.getItemVisual(e, "opacity");
    null != _ && (y.opacity = _);
    var x = t.getItemVisual(e, "liftZ"),
      w = a.__z2Origin;
    null != x ? null == w && (a.__z2Origin = a.z2, a.z2 += x) : null != w && (a.z2 = w, a.__z2Origin = null);
    var b = i && i.useNameLabel;
    Ia(y, h, d, p, {
      labelFetcher: s,
      labelDataIndex: e,
      defaultText: r,
      isRectText: !0,
      autoColor: l
    }), a.__symbolOriginalScale = Jh(n), a.hoverStyle = h, a.highDownOnUpdate = g && s.isAnimationEnabled() ? ec : null, Sa(a)
  }, rx.fadeOut = function(t, e) {
    var n = this.childAt(0);
    this.silent = n.silent = !0, !(e && e.keepLabel) && (n.style.text = null), Fa(n, {
      style: {
        opacity: 0
      },
      scale: [0, 0]
    }, this._seriesModel, this.dataIndex, t)
  }, h(Qh, _d);
  var hx = nc.prototype;
  hx.updateData = function(t, e) {
    e = rc(e);
    var n = this.group,
      i = t.hostModel,
      r = this._data,
      a = this._symbolCtor,
      o = ac(t);
    r || n.removeAll(), t.diff(r).add(function(i) {
      var r = t.getItemLayout(i);
      if (ic(t, r, i, e)) {
        var s = new a(t, i, o);
        s.attr("position", r), t.setItemGraphicEl(i, s), n.add(s)
      }
    }).update(function(s, l) {
      var u = r.getItemGraphicEl(l),
        h = t.getItemLayout(s);
      return ic(t, h, s, e) ? (u ? (u.updateData(t, s, o), Fa(u, {
        position: h
      }, i)) : (u = new a(t, s), u.attr("position", h)), n.add(u), void t.setItemGraphicEl(s, u)) : void n.remove(u)
    }).remove(function(t) {
      var e = r.getItemGraphicEl(t);
      e && e.fadeOut(function() {
        n.remove(e)
      })
    }).execute(), this._data = t
  }, hx.isPersistent = function() {
    return !0
  }, hx.updateLayout = function() {
    var t = this._data;
    t && t.eachItemGraphicEl(function(e, n) {
      var i = t.getItemLayout(n);
      e.attr("position", i)
    })
  }, hx.incrementalPrepareUpdate = function(t) {
    this._seriesScope = ac(t), this._data = null, this.group.removeAll()
  }, hx.incrementalUpdate = function(t, e, n) {
    function i(t) {
      t.isGroup || (t.incremental = t.useHoverLayer = !0)
    }
    n = rc(n);
    for (var r = t.start; r < t.end; r++) {
      var a = e.getItemLayout(r);
      if (ic(e, a, r, n)) {
        var o = new this._symbolCtor(e, r, this._seriesScope);
        o.traverse(i), o.attr("position", a), this.group.add(o), e.setItemGraphicEl(r, o)
      }
    }
  }, hx.remove = function(t) {
    var e = this.group,
      n = this._data;
    n && t ? n.eachItemGraphicEl(function(t) {
      t.fadeOut(function() {
        e.remove(t)
      })
    }) : e.removeAll()
  };
  var cx = function(t, e, n, i, r, a, o, s) {
      for (var l = uc(t, e), u = [], h = [], c = [], f = [], d = [], p = [], g = [], v = oc(r, e, o), m = oc(a, t, s), y = 0; y < l.length; y++) {
        var _ = l[y],
          x = !0;
        switch (_.cmd) {
          case "=":
            var w = t.getItemLayout(_.idx),
              b = e.getItemLayout(_.idx1);
            (isNaN(w[0]) || isNaN(w[1])) && (w = b.slice()), u.push(w), h.push(b), c.push(n[_.idx]), f.push(i[_.idx1]), g.push(e.getRawIndex(_.idx1));
            break;
          case "+":
            var S = _.idx;
            u.push(r.dataToPoint([e.get(v.dataDimsForPoint[0], S), e.get(v.dataDimsForPoint[1], S)])), h.push(e.getItemLayout(S).slice()), c.push(lc(v, r, e, S)), f.push(i[S]), g.push(e.getRawIndex(S));
            break;
          case "-":
            var S = _.idx,
              M = t.getRawIndex(S);
            M !== S ? (u.push(t.getItemLayout(S)), h.push(a.dataToPoint([t.get(m.dataDimsForPoint[0], S), t.get(m.dataDimsForPoint[1], S)])), c.push(n[S]), f.push(lc(m, a, t, S)), g.push(M)) : x = !1
        }
        x && (d.push(_), p.push(p.length))
      }
      p.sort(function(t, e) {
        return g[t] - g[e]
      });
      for (var T = [], C = [], I = [], k = [], A = [], y = 0; y < p.length; y++) {
        var S = p[y];
        T[y] = u[S], C[y] = h[S], I[y] = c[S], k[y] = f[S], A[y] = d[S]
      }
      return {
        current: T,
        next: C,
        stackedOnCurrent: I,
        stackedOnNext: k,
        status: A
      }
    },
    fx = oe,
    dx = se,
    px = U,
    gx = W,
    vx = [],
    mx = [],
    yx = [],
    _x = Vr.extend({
      type: "ec-polyline",
      shape: {
        points: [],
        smooth: 0,
        smoothConstraint: !0,
        smoothMonotone: null,
        connectNulls: !1
      },
      style: {
        fill: null,
        stroke: "#000"
      },
      brush: Rg(Vr.prototype.brush),
      buildPath: function(t, e) {
        var n = e.points,
          i = 0,
          r = n.length,
          a = pc(n, e.smoothConstraint);
        if (e.connectNulls) {
          for (; r > 0 && hc(n[r - 1]); r--);
          for (; r > i && hc(n[i]); i++);
        }
        for (; r > i;) i += cc(t, n, i, r, r, 1, a.min, a.max, e.smooth, e.smoothMonotone, e.connectNulls) + 1
      }
    }),
    xx = Vr.extend({
      type: "ec-polygon",
      shape: {
        points: [],
        stackedOnPoints: [],
        smooth: 0,
        stackedOnSmooth: 0,
        smoothConstraint: !0,
        smoothMonotone: null,
        connectNulls: !1
      },
      brush: Rg(Vr.prototype.brush),
      buildPath: function(t, e) {
        var n = e.points,
          i = e.stackedOnPoints,
          r = 0,
          a = n.length,
          o = e.smoothMonotone,
          s = pc(n, e.smoothConstraint),
          l = pc(i, e.smoothConstraint);
        if (e.connectNulls) {
          for (; a > 0 && hc(n[a - 1]); a--);
          for (; a > r && hc(n[r]); r++);
        }
        for (; a > r;) {
          var u = cc(t, n, r, a, a, 1, s.min, s.max, e.smooth, o, e.connectNulls);
          cc(t, i, r + u - 1, u, a, -1, l.min, l.max, e.stackedOnSmooth, o, e.connectNulls), r += u + 1, t.closePath()
        }
      }
    });
  $s.extend({
    type: "line",
    init: function() {
      var t = new _d,
        e = new nc;
      this.group.add(e.group), this._symbolDraw = e, this._lineGroup = t
    },
    render: function(t, e, n) {
      var i = t.coordinateSystem,
        r = this.group,
        a = t.getData(),
        o = t.getModel("lineStyle"),
        l = t.getModel("areaStyle"),
        u = a.mapArray(a.getItemLayout),
        h = "polar" === i.type,
        c = this._coordSys,
        f = this._symbolDraw,
        d = this._polyline,
        p = this._polygon,
        g = this._lineGroup,
        v = t.get("animation"),
        m = !l.isEmpty(),
        y = l.get("origin"),
        _ = oc(i, a, y),
        x = _c(i, a, _),
        w = t.get("showSymbol"),
        b = w && !h && bc(t, a, i),
        S = this._data;
      S && S.eachItemGraphicEl(function(t, e) {
        t.__temp && (r.remove(t), S.setItemGraphicEl(e, null))
      }), w || f.remove(), r.add(g);
      var M, T = !h && t.get("step");
      i && i.getArea && (M = i.getArea(), null != M.width ? (M.x -= .1, M.y -= .1, M.width += .2, M.height += .2) : M.r0 && (M.r0 -= .5, M.r1 += .5)), d && c.type === i.type && T === this._step ? (m && !p ? p = this._newPolygon(u, x, i, v) : p && !m && (g.remove(p), p = this._polygon = null), g.setClipPath(Mc(i, !1, t)), w && f.updateData(a, {
        isIgnore: b,
        clipShape: M
      }), a.eachItemGraphicEl(function(t) {
        t.stopAnimation(!0)
      }), mc(this._stackedOnPoints, x) && mc(this._points, u) || (v ? this._updateAnimation(a, x, i, n, T, y) : (T && (u = xc(u, i, T), x = xc(x, i, T)), d.setShape({
        points: u
      }), p && p.setShape({
        points: u,
        stackedOnPoints: x
      })))) : (w && f.updateData(a, {
        isIgnore: b,
        clipShape: M
      }), T && (u = xc(u, i, T), x = xc(x, i, T)), d = this._newPolyline(u, i, v), m && (p = this._newPolygon(u, x, i, v)), g.setClipPath(Mc(i, !0, t)));
      var C = wc(a, i) || a.getVisual("color");
      d.useStyle(s(o.getLineStyle(), {
        fill: "none",
        stroke: C,
        lineJoin: "bevel"
      }));
      var I = t.get("smooth");
      if (I = yc(t.get("smooth")), d.setShape({
          smooth: I,
          smoothMonotone: t.get("smoothMonotone"),
          connectNulls: t.get("connectNulls")
        }), p) {
        var k = a.getCalculationInfo("stackedOnSeries"),
          A = 0;
        p.useStyle(s(l.getAreaStyle(), {
          fill: C,
          opacity: .7,
          lineJoin: "bevel"
        })), k && (A = yc(k.get("smooth"))), p.setShape({
          smooth: I,
          stackedOnSmooth: A,
          smoothMonotone: t.get("smoothMonotone"),
          connectNulls: t.get("connectNulls")
        })
      }
      this._data = a, this._coordSys = i, this._stackedOnPoints = x, this._points = u, this._step = T, this._valueOrigin = y
    },
    dispose: function() {},
    highlight: function(t, e, n, i) {
      var r = t.getData(),
        a = ji(r, i);
      if (!(a instanceof Array) && null != a && a >= 0) {
        var o = r.getItemGraphicEl(a);
        if (!o) {
          var s = r.getItemLayout(a);
          if (!s) return;
          o = new Qh(r, a), o.position = s, o.setZ(t.get("zlevel"), t.get("z")), o.ignore = isNaN(s[0]) || isNaN(s[1]), o.__temp = !0, r.setItemGraphicEl(a, o), o.stopSymbolAnimation(!0), this.group.add(o)
        }
        o.highlight()
      } else $s.prototype.highlight.call(this, t, e, n, i)
    },
    downplay: function(t, e, n, i) {
      var r = t.getData(),
        a = ji(r, i);
      if (null != a && a >= 0) {
        var o = r.getItemGraphicEl(a);
        o && (o.__temp ? (r.setItemGraphicEl(a, null), this.group.remove(o)) : o.downplay())
      } else $s.prototype.downplay.call(this, t, e, n, i)
    },
    _newPolyline: function(t) {
      var e = this._polyline;
      return e && this._lineGroup.remove(e), e = new _x({
        shape: {
          points: t
        },
        silent: !0,
        z2: 10
      }), this._lineGroup.add(e), this._polyline = e, e
    },
    _newPolygon: function(t, e) {
      var n = this._polygon;
      return n && this._lineGroup.remove(n), n = new xx({
        shape: {
          points: t,
          stackedOnPoints: e
        },
        silent: !0
      }), this._lineGroup.add(n), this._polygon = n, n
    },
    _updateAnimation: function(t, e, n, i, r, a) {
      var o = this._polyline,
        s = this._polygon,
        l = t.hostModel,
        u = cx(this._data, t, this._stackedOnPoints, e, this._coordSys, n, this._valueOrigin, a),
        h = u.current,
        c = u.stackedOnCurrent,
        f = u.next,
        d = u.stackedOnNext;
      r && (h = xc(u.current, n, r), c = xc(u.stackedOnCurrent, n, r), f = xc(u.next, n, r), d = xc(u.stackedOnNext, n, r)), o.shape.__points = u.current, o.shape.points = h, Fa(o, {
        shape: {
          points: f
        }
      }, l), s && (s.setShape({
        points: h,
        stackedOnPoints: c
      }), Fa(s, {
        shape: {
          points: f,
          stackedOnPoints: d
        }
      }, l));
      for (var p = [], g = u.status, v = 0; v < g.length; v++) {
        var m = g[v].cmd;
        if ("=" === m) {
          var y = t.getItemGraphicEl(g[v].idx1);
          y && p.push({
            el: y,
            ptIdx: v
          })
        }
      }
      o.animators && o.animators.length && o.animators[0].during(function() {
        for (var t = 0; t < p.length; t++) {
          var e = p[t].el;
          e.attr("position", o.shape.__points[p[t].ptIdx])
        }
      })
    },
    remove: function() {
      var t = this.group,
        e = this._data;
      this._lineGroup.removeAll(), this._symbolDraw.remove(!0), e && e.eachItemGraphicEl(function(n, i) {
        n.__temp && (t.remove(n), e.setItemGraphicEl(i, null))
      }), this._polyline = this._polygon = this._coordSys = this._points = this._stackedOnPoints = this._data = null
    }
  });
  var bx = function(t, e, n) {
      return {
        seriesType: t,
        performRawSeries: !0,
        reset: function(t, i) {
          function r(e, n) {
            if (c) {
              var i = t.getRawValue(n),
                r = t.getDataParams(n);
              u && e.setItemVisual(n, "symbol", o(i, r)), h && e.setItemVisual(n, "symbolSize", s(i, r))
            }
            if (e.hasItemOption) {
              var a = e.getItemModel(n),
                l = a.getShallow("symbol", !0),
                f = a.getShallow("symbolSize", !0),
                d = a.getShallow("symbolKeepAspect", !0);
              null != l && e.setItemVisual(n, "symbol", l), null != f && e.setItemVisual(n, "symbolSize", f), null != d && e.setItemVisual(n, "symbolKeepAspect", d)
            }
          }
          var a = t.getData(),
            o = t.get("symbol"),
            s = t.get("symbolSize"),
            l = t.get("symbolKeepAspect"),
            u = w(o),
            h = w(s),
            c = u || h,
            f = !u && o ? o : e,
            d = h ? null : s;
          return a.setVisual({
            legendSymbol: n || f,
            symbol: f,
            symbolSize: d,
            symbolKeepAspect: l
          }), i.isSeriesFiltered(t) ? void 0 : {
            dataEach: a.hasItemOption || c ? r : null
          }
        }
      }
    },
    Sx = function(t) {
      return {
        seriesType: t,
        plan: Dm(),
        reset: function(t) {
          function e(t, e) {
            for (var n = t.end - t.start, r = a && new Float32Array(n * s), l = t.start, u = 0, h = [], c = []; l < t.end; l++) {
              var f;
              if (1 === s) {
                var d = e.get(o[0], l);
                f = !isNaN(d) && i.dataToPoint(d, null, c)
              } else {
                var d = h[0] = e.get(o[0], l),
                  p = h[1] = e.get(o[1], l);
                f = !isNaN(d) && !isNaN(p) && i.dataToPoint(h, null, c)
              }
              a ? (r[u++] = f ? f[0] : 0 / 0, r[u++] = f ? f[1] : 0 / 0) : e.setItemLayout(l, f && f.slice() || [0 / 0, 0 / 0])
            }
            a && e.setLayout("symbolPoints", r)
          }
          var n = t.getData(),
            i = t.coordinateSystem,
            r = t.pipelineContext,
            a = r.large;
          if (i) {
            var o = p(i.dimensions, function(t) {
                return n.mapDimension(t)
              }).slice(0, 2),
              s = o.length,
              l = n.getCalculationInfo("stackResultDimension");
            return Xu(n, o[0]) && (o[0] = l), Xu(n, o[1]) && (o[1] = l), s && {
              progress: e
            }
          }
        }
      }
    },
    Mx = {
      average: function(t) {
        for (var e = 0, n = 0, i = 0; i < t.length; i++) isNaN(t[i]) || (e += t[i], n++);
        return 0 === n ? 0 / 0 : e / n
      },
      sum: function(t) {
        for (var e = 0, n = 0; n < t.length; n++) e += t[n] || 0;
        return e
      },
      max: function(t) {
        for (var e = -1 / 0, n = 0; n < t.length; n++) t[n] > e && (e = t[n]);
        return isFinite(e) ? e : 0 / 0
      },
      min: function(t) {
        for (var e = 1 / 0, n = 0; n < t.length; n++) t[n] < e && (e = t[n]);
        return isFinite(e) ? e : 0 / 0
      },
      nearest: function(t) {
        return t[0]
      }
    },
    Tx = function(t) {
      return Math.round(t.length / 2)
    },
    Cx = function(t) {
      return {
        seriesType: t,
        modifyOutputEnd: !0,
        reset: function(t) {
          var e = t.getData(),
            n = t.get("sampling"),
            i = t.coordinateSystem;
          if ("cartesian2d" === i.type && n) {
            var r = i.getBaseAxis(),
              a = i.getOtherAxis(r),
              o = r.getExtent(),
              s = o[1] - o[0],
              l = Math.round(e.count() / s);
            if (l > 1) {
              var u;
              "string" == typeof n ? u = Mx[n] : "function" == typeof n && (u = n), u && t.setData(e.downSample(e.mapDimension(a.dim), 1 / l, u, Tx))
            }
          }
        }
      }
    },
    Ix = function(t) {
      this._axes = {}, this._dimList = [], this.name = t || ""
    };
  Ix.prototype = {
    constructor: Ix,
    type: "cartesian",
    getAxis: function(t) {
      return this._axes[t]
    },
    getAxes: function() {
      return p(this._dimList, Tc, this)
    },
    getAxesByScale: function(t) {
      return t = t.toLowerCase(), v(this.getAxes(), function(e) {
        return e.scale.type === t
      })
    },
    addAxis: function(t) {
      var e = t.dim;
      this._axes[e] = t, this._dimList.push(e)
    },
    dataToCoord: function(t) {
      return this._dataCoordConvert(t, "dataToCoord")
    },
    coordToData: function(t) {
      return this._dataCoordConvert(t, "coordToData")
    },
    _dataCoordConvert: function(t, e) {
      for (var n = this._dimList, i = t instanceof Array ? [] : {}, r = 0; r < n.length; r++) {
        var a = n[r],
          o = this._axes[a];
        i[a] = o[e](t[a])
      }
      return i
    }
  }, Cc.prototype = {
    constructor: Cc,
    type: "cartesian2d",
    dimensions: ["x", "y"],
    getBaseAxis: function() {
      return this.getAxesByScale("ordinal")[0] || this.getAxesByScale("time")[0] || this.getAxis("x")
    },
    containPoint: function(t) {
      var e = this.getAxis("x"),
        n = this.getAxis("y");
      return e.contain(e.toLocalCoord(t[0])) && n.contain(n.toLocalCoord(t[1]))
    },
    containData: function(t) {
      return this.getAxis("x").containData(t[0]) && this.getAxis("y").containData(t[1])
    },
    dataToPoint: function(t, e, n) {
      var i = this.getAxis("x"),
        r = this.getAxis("y");
      return n = n || [], n[0] = i.toGlobalCoord(i.dataToCoord(t[0])), n[1] = r.toGlobalCoord(r.dataToCoord(t[1])), n
    },
    clampData: function(t, e) {
      var n = this.getAxis("x").scale,
        i = this.getAxis("y").scale,
        r = n.getExtent(),
        a = i.getExtent(),
        o = n.parse(t[0]),
        s = i.parse(t[1]);
      return e = e || [], e[0] = Math.min(Math.max(Math.min(r[0], r[1]), o), Math.max(r[0], r[1])), e[1] = Math.min(Math.max(Math.min(a[0], a[1]), s), Math.max(a[0], a[1])), e
    },
    pointToData: function(t, e) {
      var n = this.getAxis("x"),
        i = this.getAxis("y");
      return e = e || [], e[0] = n.coordToData(n.toLocalCoord(t[0])), e[1] = i.coordToData(i.toLocalCoord(t[1])), e
    },
    getOtherAxis: function(t) {
      return this.getAxis("x" === t.dim ? "y" : "x")
    },
    getArea: function() {
      var t = this.getAxis("x").getGlobalExtent(),
        e = this.getAxis("y").getGlobalExtent(),
        n = Math.min(t[0], t[1]),
        i = Math.min(e[0], e[1]),
        r = Math.max(t[0], t[1]) - n,
        a = Math.max(e[0], e[1]) - i,
        o = new wn(n, i, r, a);
      return o
    }
  }, h(Cc, Ix);
  var kx = function(t, e, n, i, r) {
    tx.call(this, t, e, n), this.type = i || "value", this.position = r || "bottom"
  };
  kx.prototype = {
    constructor: kx,
    index: 0,
    getAxesOnZeroOf: null,
    model: null,
    isHorizontal: function() {
      var t = this.position;
      return "top" === t || "bottom" === t
    },
    getGlobalExtent: function(t) {
      var e = this.getExtent();
      return e[0] = this.toGlobalCoord(e[0]), e[1] = this.toGlobalCoord(e[1]), t && e[0] > e[1] && e.reverse(), e
    },
    getOtherAxis: function() {
      this.grid.getOtherAxis()
    },
    pointToData: function(t, e) {
      return this.coordToData(this.toLocalCoord(t["x" === this.dim ? 0 : 1]), e)
    },
    toLocalCoord: null,
    toGlobalCoord: null
  }, h(kx, tx);
  var Ax = {
      show: !0,
      zlevel: 0,
      z: 0,
      inverse: !1,
      name: "",
      nameLocation: "end",
      nameRotate: null,
      nameTruncate: {
        maxWidth: null,
        ellipsis: "...",
        placeholder: "."
      },
      nameTextStyle: {},
      nameGap: 15,
      silent: !1,
      triggerEvent: !1,
      tooltip: {
        show: !1
      },
      axisPointer: {},
      axisLine: {
        show: !0,
        onZero: !0,
        onZeroAxisIndex: null,
        lineStyle: {
          color: "#333",
          width: 1,
          type: "solid"
        },
        symbol: ["none", "none"],
        symbolSize: [10, 15]
      },
      axisTick: {
        show: !0,
        inside: !1,
        length: 5,
        lineStyle: {
          width: 1
        }
      },
      axisLabel: {
        show: !0,
        inside: !1,
        rotate: 0,
        showMinLabel: null,
        showMaxLabel: null,
        margin: 8,
        fontSize: 12
      },
      splitLine: {
        show: !0,
        lineStyle: {
          color: ["#ccc"],
          width: 1,
          type: "solid"
        }
      },
      splitArea: {
        show: !1,
        areaStyle: {
          color: ["rgba(250,250,250,0.3)", "rgba(200,200,200,0.3)"]
        }
      }
    },
    Dx = {};
  Dx.categoryAxis = r({
    boundaryGap: !0,
    deduplication: null,
    splitLine: {
      show: !1
    },
    axisTick: {
      alignWithLabel: !1,
      interval: "auto"
    },
    axisLabel: {
      interval: "auto"
    }
  }, Ax), Dx.valueAxis = r({
    boundaryGap: [0, 0],
    splitNumber: 5
  }, Ax), Dx.timeAxis = s({
    scale: !0,
    min: "dataMin",
    max: "dataMax"
  }, Dx.valueAxis), Dx.logAxis = s({
    scale: !0,
    logBase: 10
  }, Dx.valueAxis);
  var Px = ["value", "category", "time", "log"],
    Lx = function(t, e, n, i) {
      d(Px, function(o) {
        e.extend({
          type: t + "Axis." + o,
          mergeDefaultAndTheme: function(e, i) {
            var a = this.layoutMode,
              s = a ? zo(e) : {},
              l = i.getTheme();
            r(e, l.get(o + "Axis")), r(e, this.getDefaultOption()), e.type = n(t, e), a && Ro(e, s, a)
          },
          optionUpdated: function() {
            var t = this.option;
            "category" === t.type && (this.__ordinalMeta = $u.createByAxisModel(this))
          },
          getCategories: function(t) {
            var e = this.option;
            return "category" === e.type ? t ? e.data : this.__ordinalMeta.categories : void 0
          },
          getOrdinalMeta: function() {
            return this.__ordinalMeta
          },
          defaultOption: a([{}, Dx[o + "Axis"], i], !0)
        })
      }), Vv.registerSubTypeDefaulter(t + "Axis", _(n, t))
    },
    Ox = Vv.extend({
      type: "cartesian2dAxis",
      axis: null,
      init: function() {
        Ox.superApply(this, "init", arguments), this.resetRange()
      },
      mergeOption: function() {
        Ox.superApply(this, "mergeOption", arguments), this.resetRange()
      },
      restoreData: function() {
        Ox.superApply(this, "restoreData", arguments), this.resetRange()
      },
      getCoordSysModel: function() {
        return this.ecModel.queryComponents({
          mainType: "grid",
          index: this.option.gridIndex,
          id: this.option.gridId
        })[0]
      }
    });
  r(Ox.prototype, F_);
  var Ex = {
    offset: 0
  };
  Lx("x", Ox, Ic, Ex), Lx("y", Ox, Ic, Ex), Vv.extend({
    type: "grid",
    dependencies: ["xAxis", "yAxis"],
    layoutMode: "box",
    coordinateSystem: null,
    defaultOption: {
      show: !1,
      zlevel: 0,
      z: 0,
      left: "10%",
      top: 60,
      right: "10%",
      bottom: 60,
      containLabel: !1,
      backgroundColor: "rgba(0,0,0,0)",
      borderWidth: 1,
      borderColor: "#ccc"
    }
  });
  var Bx = Ac.prototype;
  Bx.type = "grid", Bx.axisPointerEnabled = !0, Bx.getRect = function() {
    return this._rect
  }, Bx.update = function(t, e) {
    var n = this._axesMap;
    this._updateScale(t, this.model), d(n.x, function(t) {
      vh(t.scale, t.model)
    }), d(n.y, function(t) {
      vh(t.scale, t.model)
    });
    var i = {};
    d(n.x, function(t) {
      Dc(n, "y", t, i)
    }), d(n.y, function(t) {
      Dc(n, "x", t, i)
    }), this.resize(this.model, e)
  }, Bx.resize = function(t, e, n) {
    function i() {
      d(a, function(t) {
        var e = t.isHorizontal(),
          n = e ? [0, r.width] : [0, r.height],
          i = t.inverse ? 1 : 0;
        t.setExtent(n[i], n[1 - i]), Lc(t, e ? r.x : r.y)
      })
    }
    var r = Bo(t.getBoxLayoutParams(), {
      width: e.getWidth(),
      height: e.getHeight()
    });
    this._rect = r;
    var a = this._axesList;
    i(), !n && t.get("containLabel") && (d(a, function(t) {
      if (!t.model.get("axisLabel.inside")) {
        var e = wh(t);
        if (e) {
          var n = t.isHorizontal() ? "height" : "width",
            i = t.model.get("axisLabel.margin");
          r[n] -= e[n] + i, "top" === t.position ? r.y += e.height + i : "left" === t.position && (r.x += e.width + i)
        }
      }
    }), i())
  }, Bx.getAxis = function(t, e) {
    var n = this._axesMap[t];
    if (null != n) {
      if (null == e)
        for (var i in n)
          if (n.hasOwnProperty(i)) return n[i];
      return n[e]
    }
  }, Bx.getAxes = function() {
    return this._axesList.slice()
  }, Bx.getCartesian = function(t, e) {
    if (null != t && null != e) {
      var n = "x" + t + "y" + e;
      return this._coordsMap[n]
    }
    S(t) && (e = t.yAxisIndex, t = t.xAxisIndex);
    for (var i = 0, r = this._coordsList; i < r.length; i++)
      if (r[i].getAxis("x").index === t || r[i].getAxis("y").index === e) return r[i]
  }, Bx.getCartesians = function() {
    return this._coordsList.slice()
  }, Bx.convertToPixel = function(t, e, n) {
    var i = this._findConvertTarget(t, e);
    return i.cartesian ? i.cartesian.dataToPoint(n) : i.axis ? i.axis.toGlobalCoord(i.axis.dataToCoord(n)) : null
  }, Bx.convertFromPixel = function(t, e, n) {
    var i = this._findConvertTarget(t, e);
    return i.cartesian ? i.cartesian.pointToData(n) : i.axis ? i.axis.coordToData(i.axis.toLocalCoord(n)) : null
  }, Bx._findConvertTarget = function(t, e) {
    var n, i, r = e.seriesModel,
      a = e.xAxisModel || r && r.getReferringComponents("xAxis")[0],
      o = e.yAxisModel || r && r.getReferringComponents("yAxis")[0],
      s = e.gridModel,
      l = this._coordsList;
    if (r) n = r.coordinateSystem, u(l, n) < 0 && (n = null);
    else if (a && o) n = this.getCartesian(a.componentIndex, o.componentIndex);
    else if (a) i = this.getAxis("x", a.componentIndex);
    else if (o) i = this.getAxis("y", o.componentIndex);
    else if (s) {
      var h = s.coordinateSystem;
      h === this && (n = this._coordsList[0])
    }
    return {
      cartesian: n,
      axis: i
    }
  }, Bx.containPoint = function(t) {
    var e = this._coordsList[0];
    return e ? e.containPoint(t) : void 0
  }, Bx._initCartesian = function(t, e) {
    function n(n) {
      return function(o, s) {
        if (kc(o, t, e)) {
          var l = o.get("position");
          "x" === n ? "top" !== l && "bottom" !== l && (l = i.bottom ? "top" : "bottom") : "left" !== l && "right" !== l && (l = i.left ? "right" : "left"), i[l] = !0;
          var u = new kx(n, mh(o), [0, 0], o.get("type"), l),
            h = "category" === u.type;
          u.onBand = h && o.get("boundaryGap"), u.inverse = o.get("inverse"), o.axis = u, u.model = o, u.grid = this, u.index = s, this._axesList.push(u), r[n][s] = u, a[n]++
        }
      }
    }
    var i = {
        left: !1,
        right: !1,
        top: !1,
        bottom: !1
      },
      r = {
        x: {},
        y: {}
      },
      a = {
        x: 0,
        y: 0
      };
    return e.eachComponent("xAxis", n("x"), this), e.eachComponent("yAxis", n("y"), this), a.x && a.y ? (this._axesMap = r, void d(r.x, function(e, n) {
      d(r.y, function(i, r) {
        var a = "x" + n + "y" + r,
          o = new Cc(a);
        o.grid = this, o.model = t, this._coordsMap[a] = o, this._coordsList.push(o), o.addAxis(e), o.addAxis(i)
      }, this)
    }, this)) : (this._axesMap = {}, void(this._axesList = []))
  }, Bx._updateScale = function(t, e) {
    function n(t, e) {
      d(t.mapDimension(e.dim, !0), function(n) {
        e.scale.unionExtentFromData(t, qu(t, n))
      })
    }
    d(this._axesList, function(t) {
      t.scale.setExtent(1 / 0, -1 / 0)
    }), t.eachSeries(function(i) {
      if (Ec(i)) {
        var r = Oc(i, t),
          a = r[0],
          o = r[1];
        if (!kc(a, e, t) || !kc(o, e, t)) return;
        var s = this.getCartesian(a.componentIndex, o.componentIndex),
          l = i.getData(),
          u = s.getAxis("x"),
          h = s.getAxis("y");
        "list" === l.type && (n(l, u, i), n(l, h, i))
      }
    }, this)
  }, Bx.getTooltipAxes = function(t) {
    var e = [],
      n = [];
    return d(this.getCartesians(), function(i) {
      var r = null != t && "auto" !== t ? i.getAxis(t) : i.getBaseAxis(),
        a = i.getOtherAxis(r);
      u(e, r) < 0 && e.push(r), u(n, a) < 0 && n.push(a)
    }), {
      baseAxes: e,
      otherAxes: n
    }
  };
  var Rx = ["xAxis", "yAxis"];
  Ac.create = function(t, e) {
    var n = [];
    return t.eachComponent("grid", function(i, r) {
      var a = new Ac(i, t, e);
      a.name = "grid_" + r, a.resize(i, e, !0), i.coordinateSystem = a, n.push(a)
    }), t.eachSeries(function(e) {
      if (Ec(e)) {
        var n = Oc(e, t),
          i = n[0],
          r = n[1],
          a = i.getCoordSysModel(),
          o = a.coordinateSystem;
        e.coordinateSystem = o.getCartesian(i.componentIndex, r.componentIndex)
      }
    }), n
  }, Ac.dimensions = Ac.prototype.dimensions = Cc.prototype.dimensions, hs.register("cartesian2d", Ac);
  var zx = Math.PI,
    Nx = function(t, e) {
      this.opt = e, this.axisModel = t, s(e, {
        labelOffset: 0,
        nameDirection: 1,
        tickDirection: 1,
        labelDirection: 1,
        silent: !0
      }), this.group = new _d;
      var n = new _d({
        position: e.position.slice(),
        rotation: e.rotation
      });
      n.updateTransform(), this._transform = n.transform, this._dumbGroup = n
    };
  Nx.prototype = {
    constructor: Nx,
    hasBuilder: function(t) {
      return !!Fx[t]
    },
    add: function(t) {
      Fx[t].call(this)
    },
    getGroup: function() {
      return this.group
    }
  };
  var Fx = {
      axisLine: function() {
        var t = this.opt,
          e = this.axisModel;
        if (e.get("axisLine.show")) {
          var n = this.axisModel.axis.getExtent(),
            i = this._transform,
            r = [n[0], 0],
            a = [n[1], 0];
          i && (ae(r, r, i), ae(a, a, i));
          var s = o({
            lineCap: "round"
          }, e.getModel("axisLine.lineStyle").getLineStyle());
          this.group.add(new jg({
            anid: "line",
            subPixelOptimize: !0,
            shape: {
              x1: r[0],
              y1: r[1],
              x2: a[0],
              y2: a[1]
            },
            style: s,
            strokeContainThreshold: t.strokeContainThreshold || 5,
            silent: !0,
            z2: 1
          }));
          var l = e.get("axisLine.symbol"),
            u = e.get("axisLine.symbolSize"),
            h = e.get("axisLine.symbolOffset") || 0;
          if ("number" == typeof h && (h = [h, h]), null != l) {
            "string" == typeof l && (l = [l, l]), ("string" == typeof u || "number" == typeof u) && (u = [u, u]);
            var c = u[0],
              f = u[1];
            d([{
              rotate: t.rotation + Math.PI / 2,
              offset: h[0],
              r: 0
            }, {
              rotate: t.rotation - Math.PI / 2,
              offset: h[1],
              r: Math.sqrt((r[0] - a[0]) * (r[0] - a[0]) + (r[1] - a[1]) * (r[1] - a[1]))
            }], function(e, n) {
              if ("none" !== l[n] && null != l[n]) {
                var i = Ch(l[n], -c / 2, -f / 2, c, f, s.stroke, !0),
                  a = e.r + e.offset,
                  o = [r[0] + a * Math.cos(t.rotation), r[1] - a * Math.sin(t.rotation)];
                i.attr({
                  rotation: e.rotate,
                  position: o,
                  silent: !0,
                  z2: 11
                }), this.group.add(i)
              }
            }, this)
          }
        }
      },
      axisTickLabel: function() {
        var t = this.axisModel,
          e = this.opt,
          n = Vc(this, t, e),
          i = Hc(this, t, e);
        Rc(t, i, n)
      },
      axisName: function() {
        var t = this.opt,
          e = this.axisModel,
          n = k(t.axisName, e.get("name"));
        if (n) {
          var i, r = e.get("nameLocation"),
            a = t.nameDirection,
            s = e.getModel("nameTextStyle"),
            l = e.get("nameGap") || 0,
            u = this.axisModel.axis.getExtent(),
            h = u[0] > u[1] ? -1 : 1,
            c = ["start" === r ? u[0] - h * l : "end" === r ? u[1] + h * l : (u[0] + u[1]) / 2, Fc(r) ? t.labelOffset + a * l : 0],
            f = e.get("nameRotate");
          null != f && (f = f * zx / 180);
          var d;
          Fc(r) ? i = Hx(t.rotation, null != f ? f : t.rotation, a) : (i = Bc(t, r, f || 0, u), d = t.axisNameAvailableWidth, null != d && (d = Math.abs(d / Math.sin(i.rotation)), !isFinite(d) && (d = null)));
          var p = s.getFont(),
            g = e.get("nameTruncate", !0) || {},
            v = g.ellipsis,
            m = k(t.nameTruncateMaxWidth, g.maxWidth, d),
            y = null != v && null != m ? Ov(n, m, p, v, {
              minChar: 2,
              placeholder: g.placeholder
            }) : n,
            _ = e.get("tooltip", !0),
            x = e.mainType,
            w = {
              componentType: x,
              name: n,
              $vars: ["name"]
            };
          w[x + "Index"] = e.componentIndex;
          var b = new Og({
            anid: "name",
            __fullText: n,
            __truncatedText: y,
            position: c,
            rotation: i.rotation,
            silent: Wx(e),
            z2: 1,
            tooltip: _ && _.show ? o({
              content: n,
              formatter: function() {
                return n
              },
              formatterParams: w
            }, _) : null
          });
          Aa(b.style, s, {
            text: y,
            textFont: p,
            textFill: s.getTextColor() || e.get("axisLine.lineStyle.color"),
            textAlign: s.get("align") || i.textAlign,
            textVerticalAlign: s.get("verticalAlign") || i.textVerticalAlign
          }), e.get("triggerEvent") && (b.eventData = Vx(e), b.eventData.targetType = "axisName", b.eventData.name = n), this._dumbGroup.add(b), b.updateTransform(), this.group.add(b), b.decomposeTransform()
        }
      }
    },
    Vx = Nx.makeAxisEventDataBase = function(t) {
      var e = {
        componentType: t.mainType,
        componentIndex: t.componentIndex
      };
      return e[t.mainType + "Index"] = t.componentIndex, e
    },
    Hx = Nx.innerTextLayout = function(t, e, n) {
      var i, r, a = po(e - t);
      return go(a) ? (r = n > 0 ? "top" : "bottom", i = "center") : go(a - zx) ? (r = n > 0 ? "bottom" : "top", i = "center") : (r = "middle", i = a > 0 && zx > a ? n > 0 ? "right" : "left" : n > 0 ? "left" : "right"), {
        rotation: a,
        textAlign: i,
        textVerticalAlign: r
      }
    },
    Wx = Nx.isLabelSilent = function(t) {
      var e = t.get("tooltip");
      return t.get("silent") || !(t.get("triggerEvent") || e && e.show)
    },
    Gx = pu({
      type: "axis",
      _axisPointer: null,
      axisPointerClass: null,
      render: function(t, e, n, i) {
        this.axisPointerClass && Wc(t), Gx.superApply(this, "render", arguments), jc(this, t, e, n, i, !0)
      },
      updateAxisPointer: function(t, e, n, i) {
        jc(this, t, e, n, i, !1)
      },
      remove: function(t, e) {
        var n = this._axisPointer;
        n && n.remove(e), Gx.superApply(this, "remove", arguments)
      },
      dispose: function(t, e) {
        Yc(this, e), Gx.superApply(this, "dispose", arguments)
      }
    }),
    Xx = [];
  Gx.registerAxisPointerClass = function(t, e) {
    Xx[t] = e
  }, Gx.getAxisPointerClass = function(t) {
    return t && Xx[t]
  };
  var qx = ["axisLine", "axisTickLabel", "axisName"],
    Ux = ["splitArea", "splitLine"],
    jx = Gx.extend({
      type: "cartesianAxis",
      axisPointerClass: "CartesianAxisPointer",
      render: function(t, e, n, i) {
        this.group.removeAll();
        var r = this._axisGroup;
        if (this._axisGroup = new _d, this.group.add(this._axisGroup), t.get("show")) {
          var a = t.getCoordSysModel(),
            o = Zc(a, t),
            s = new Nx(t, o);
          d(qx, s.add, s), this._axisGroup.add(s.getGroup()), d(Ux, function(e) {
            t.get(e + ".show") && this["_" + e](t, a)
          }, this), Xa(r, this._axisGroup, t), jx.superCall(this, "render", t, e, n, i)
        }
      },
      remove: function() {
        this._splitAreaColors = null
      },
      _splitLine: function(t, e) {
        var n = t.axis;
        if (!n.scale.isBlank()) {
          var i = t.getModel("splitLine"),
            r = i.getModel("lineStyle"),
            a = r.get("color");
          a = x(a) ? a : [a];
          for (var o = e.coordinateSystem.getRect(), l = n.isHorizontal(), u = 0, h = n.getTicksCoords({
              tickModel: i
            }), c = [], f = [], d = r.getLineStyle(), p = 0; p < h.length; p++) {
            var g = n.toGlobalCoord(h[p].coord);
            l ? (c[0] = g, c[1] = o.y, f[0] = g, f[1] = o.y + o.height) : (c[0] = o.x, c[1] = g, f[0] = o.x + o.width, f[1] = g);
            var v = u++ % a.length,
              m = h[p].tickValue;
            this._axisGroup.add(new jg({
              anid: null != m ? "line_" + h[p].tickValue : null,
              subPixelOptimize: !0,
              shape: {
                x1: c[0],
                y1: c[1],
                x2: f[0],
                y2: f[1]
              },
              style: s({
                stroke: a[v]
              }, d),
              silent: !0
            }))
          }
        }
      },
      _splitArea: function(t, e) {
        var n = t.axis;
        if (!n.scale.isBlank()) {
          var i = t.getModel("splitArea"),
            r = i.getModel("areaStyle"),
            a = r.get("color"),
            o = e.coordinateSystem.getRect(),
            l = n.getTicksCoords({
              tickModel: i,
              clamp: !0
            });
          if (l.length) {
            var u = a.length,
              h = this._splitAreaColors,
              c = N(),
              f = 0;
            if (h)
              for (var d = 0; d < l.length; d++) {
                var p = h.get(l[d].tickValue);
                if (null != p) {
                  f = (p + (u - 1) * d) % u;
                  break
                }
              }
            var g = n.toGlobalCoord(l[0].coord),
              v = r.getAreaStyle();
            a = x(a) ? a : [a];
            for (var d = 1; d < l.length; d++) {
              var m, y, _, w, b = n.toGlobalCoord(l[d].coord);
              n.isHorizontal() ? (m = g, y = o.y, _ = b - m, w = o.height, g = m + _) : (m = o.x, y = g, _ = o.width, w = b - y, g = y + w);
              var S = l[d - 1].tickValue;
              null != S && c.set(S, f), this._axisGroup.add(new qg({
                anid: null != S ? "area_" + S : null,
                shape: {
                  x: m,
                  y: y,
                  width: _,
                  height: w
                },
                style: s({
                  fill: a[f]
                }, v),
                silent: !0
              })), f = (f + 1) % u
            }
            this._splitAreaColors = c
          }
        }
      }
    });
  jx.extend({
    type: "xAxis"
  }), jx.extend({
    type: "yAxis"
  }), pu({
    type: "grid",
    render: function(t) {
      this.group.removeAll(), t.get("show") && this.group.add(new qg({
        shape: t.coordinateSystem.getRect(),
        style: s({
          fill: t.get("backgroundColor")
        }, t.getItemStyle()),
        silent: !0,
        z2: -1
      }))
    }
  }), iu(function(t) {
    t.xAxis && t.yAxis && !t.grid && (t.grid = {})
  }), hu(bx("line", "circle", "line")), uu(Sx("line")), ru(ky.PROCESSOR.STATISTIC, Cx("line"));
  var Yx = function(t, e, n) {
      e = x(e) && {
        coordDimensions: e
      } || o({}, e);
      var i = t.getSource(),
        r = h_(i, e),
        a = new s_(r, t);
      return a.initData(i, n), a
    },
    Zx = {
      updateSelectedMap: function(t) {
        this._targetList = x(t) ? t.slice() : [], this._selectTargetMap = g(t || [], function(t, e) {
          return t.set(e.name, e), t
        }, N())
      },
      select: function(t, e) {
        var n = null != e ? this._targetList[e] : this._selectTargetMap.get(t),
          i = this.get("selectedMode");
        "single" === i && this._selectTargetMap.each(function(t) {
          t.selected = !1
        }), n && (n.selected = !0)
      },
      unSelect: function(t, e) {
        var n = null != e ? this._targetList[e] : this._selectTargetMap.get(t);
        n && (n.selected = !1)
      },
      toggleSelected: function(t, e) {
        var n = null != e ? this._targetList[e] : this._selectTargetMap.get(t);
        return null != n ? (this[n.selected ? "unSelect" : "select"](t, e), n.selected) : void 0
      },
      isSelected: function(t, e) {
        var n = null != e ? this._targetList[e] : this._selectTargetMap.get(t);
        return n && n.selected
      }
    },
    $x = gu({
      type: "series.pie",
      init: function(t) {
        $x.superApply(this, "init", arguments), this.legendDataProvider = function() {
          return this.getRawData()
        }, this.updateSelectedMap(this._createSelectableList()), this._defaultLabelLine(t)
      },
      mergeOption: function(t) {
        $x.superCall(this, "mergeOption", t), this.updateSelectedMap(this._createSelectableList())
      },
      getInitialData: function() {
        return Yx(this, ["value"])
      },
      _createSelectableList: function() {
        for (var t = this.getRawData(), e = t.mapDimension("value"), n = [], i = 0, r = t.count(); r > i; i++) n.push({
          name: t.getName(i),
          value: t.get(e, i),
          selected: zs(t, i, "selected")
        });
        return n
      },
      getDataParams: function(t) {
        var e = this.getData(),
          n = $x.superCall(this, "getDataParams", t),
          i = [];
        return e.each(e.mapDimension("value"), function(t) {
          i.push(t)
        }), n.percent = fo(i, t, e.hostModel.get("percentPrecision")), n.$vars.push("percent"), n
      },
      _defaultLabelLine: function(t) {
        Vi(t, "labelLine", ["show"]);
        var e = t.labelLine,
          n = t.emphasis.labelLine;
        e.show = e.show && t.label.show, n.show = n.show && t.emphasis.label.show
      },
      defaultOption: {
        zlevel: 0,
        z: 2,
        legendHoverLink: !0,
        hoverAnimation: !0,
        center: ["50%", "50%"],
        radius: [0, "75%"],
        clockwise: !0,
        startAngle: 90,
        minAngle: 0,
        minShowLabelAngle: 0,
        selectedOffset: 10,
        hoverOffset: 10,
        avoidLabelOverlap: !0,
        percentPrecision: 2,
        stillShowZeroSum: !0,
        label: {
          rotate: !1,
          show: !0,
          position: "outer"
        },
        labelLine: {
          show: !0,
          length: 15,
          length2: 15,
          smooth: !1,
          lineStyle: {
            width: 1,
            type: "solid"
          }
        },
        itemStyle: {
          borderWidth: 1
        },
        animationType: "expansion",
        animationTypeUpdate: "transition",
        animationEasing: "cubicOut"
      }
    });
  c($x, Zx);
  var Kx = Qc.prototype;
  Kx.updateData = function(t, e, n) {
    var i = this.childAt(0),
      r = this.childAt(1),
      a = this.childAt(2),
      l = t.hostModel,
      u = t.getItemModel(e),
      h = t.getItemLayout(e),
      c = o({}, h);
    c.label = null;
    var f = l.getShallow("animationTypeUpdate");
    if (n) {
      i.setShape(c);
      var d = l.getShallow("animationType");
      "scale" === d ? (i.shape.r = h.r0, Va(i, {
        shape: {
          r: h.r
        }
      }, l, e)) : (i.shape.endAngle = h.startAngle, Fa(i, {
        shape: {
          endAngle: h.endAngle
        }
      }, l, e))
    } else "expansion" === f ? i.setShape(c) : Fa(i, {
      shape: c
    }, l, e);
    var p = t.getItemVisual(e, "color");
    i.useStyle(s({
      lineJoin: "bevel",
      fill: p
    }, u.getModel("itemStyle").getItemStyle())), i.hoverStyle = u.getModel("emphasis.itemStyle").getItemStyle();
    var g = u.getShallow("cursor");
    g && i.attr("cursor", g), Kc(this, t.getItemLayout(e), l.isSelected(null, e), l.get("selectedOffset"), l.get("animation"));
    var v = !n && "transition" === f;
    this._updateLabel(t, e, v), this.highDownOnUpdate = u.get("hoverAnimation") && l.isAnimationEnabled() ? function(t, e) {
      "emphasis" === e ? (r.ignore = r.hoverIgnore, a.ignore = a.hoverIgnore, i.stopAnimation(!0), i.animateTo({
        shape: {
          r: h.r + l.get("hoverOffset")
        }
      }, 300, "elasticOut")) : (r.ignore = r.normalIgnore, a.ignore = a.normalIgnore, i.stopAnimation(!0), i.animateTo({
        shape: {
          r: h.r
        }
      }, 300, "elasticOut"))
    } : null, Sa(this)
  }, Kx._updateLabel = function(t, e, n) {
    var i = this.childAt(1),
      r = this.childAt(2),
      a = t.hostModel,
      o = t.getItemModel(e),
      s = t.getItemLayout(e),
      l = s.label,
      u = t.getItemVisual(e, "color");
    if (!l || isNaN(l.x) || isNaN(l.y)) return void(r.ignore = r.normalIgnore = r.hoverIgnore = i.ignore = i.normalIgnore = i.hoverIgnore = !0);
    var h = {
        points: l.linePoints || [
          [l.x, l.y],
          [l.x, l.y],
          [l.x, l.y]
        ]
      },
      c = {
        x: l.x,
        y: l.y
      };
    n ? (Fa(i, {
      shape: h
    }, a, e), Fa(r, {
      style: c
    }, a, e)) : (i.attr({
      shape: h
    }), r.attr({
      style: c
    })), r.attr({
      rotation: l.rotation,
      origin: [l.x, l.y],
      z2: 10
    });
    var f = o.getModel("label"),
      d = o.getModel("emphasis.label"),
      p = o.getModel("labelLine"),
      g = o.getModel("emphasis.labelLine"),
      u = t.getItemVisual(e, "color");
    Ia(r.style, r.hoverStyle = {}, f, d, {
      labelFetcher: t.hostModel,
      labelDataIndex: e,
      defaultText: t.getName(e),
      autoColor: u,
      useInsideStyle: !!l.inside
    }, {
      textAlign: l.textAlign,
      textVerticalAlign: l.verticalAlign,
      opacity: t.getItemVisual(e, "opacity")
    }), r.ignore = r.normalIgnore = !f.get("show"), r.hoverIgnore = !d.get("show"), i.ignore = i.normalIgnore = !p.get("show"), i.hoverIgnore = !g.get("show"), i.setStyle({
      stroke: u,
      opacity: t.getItemVisual(e, "opacity")
    }), i.setStyle(p.getModel("lineStyle").getLineStyle()), i.hoverStyle = g.getModel("lineStyle").getLineStyle();
    var v = p.get("smooth");
    v && v === !0 && (v = .4), i.setShape({
      smooth: v
    })
  }, h(Qc, _d);
  var Qx = ($s.extend({
      type: "pie",
      init: function() {
        var t = new _d;
        this._sectorGroup = t
      },
      render: function(t, e, n, i) {
        if (!i || i.from !== this.uid) {
          var r = t.getData(),
            a = this._data,
            o = this.group,
            s = e.get("animation"),
            l = !a,
            u = t.get("animationType"),
            h = t.get("animationTypeUpdate"),
            c = _($c, this.uid, t, s, n),
            f = t.get("selectedMode");
          if (r.diff(a).add(function(t) {
              var e = new Qc(r, t);
              l && "scale" !== u && e.eachChild(function(t) {
                t.stopAnimation(!0)
              }), f && e.on("click", c), r.setItemGraphicEl(t, e), o.add(e)
            }).update(function(t, e) {
              var n = a.getItemGraphicEl(e);
              l || "transition" === h || n.eachChild(function(t) {
                t.stopAnimation(!0)
              }), n.updateData(r, t), n.off("click"), f && n.on("click", c), o.add(n), r.setItemGraphicEl(t, n)
            }).remove(function(t) {
              var e = a.getItemGraphicEl(t);
              o.remove(e)
            }).execute(), s && r.count() > 0 && (l ? "scale" !== u : "transition" !== h)) {
            for (var d = r.getItemLayout(0), p = 1; isNaN(d.startAngle) && p < r.count(); ++p) d = r.getItemLayout(p);
            var g = Math.max(n.getWidth(), n.getHeight()) / 2,
              v = y(o.removeClipPath, o);
            o.setClipPath(this._createClipPath(d.cx, d.cy, g, d.startAngle, d.clockwise, v, t, l))
          } else o.removeClipPath();
          this._data = r
        }
      },
      dispose: function() {},
      _createClipPath: function(t, e, n, i, r, a, o, s) {
        var l = new zg({
            shape: {
              cx: t,
              cy: e,
              r0: 0,
              r: n,
              startAngle: i,
              endAngle: i,
              clockwise: r
            }
          }),
          u = s ? Va : Fa;
        return u(l, {
          shape: {
            endAngle: i + (r ? 1 : -1) * Math.PI * 2
          }
        }, o, a), l
      },
      containPoint: function(t, e) {
        var n = e.getData(),
          i = n.getItemLayout(0);
        if (i) {
          var r = t[0] - i.cx,
            a = t[1] - i.cy,
            o = Math.sqrt(r * r + a * a);
          return o <= i.r && o >= i.r0
        }
      }
    }), function(t, e) {
      d(e, function(e) {
        e.update = "updateView", ou(e, function(n, i) {
          var r = {};
          return i.eachComponent({
            mainType: "series",
            subType: t,
            query: n
          }, function(t) {
            t[e.method] && t[e.method](n.name, n.dataIndex);
            var i = t.getData();
            i.each(function(e) {
              var n = i.getName(e);
              r[n] = t.isSelected(n) || !1
            })
          }), {
            name: n.name,
            selected: r,
            seriesId: n.seriesId
          }
        })
      })
    }),
    Jx = function(t) {
      return {
        getTargetSeries: function(e) {
          var n = {},
            i = N();
          return e.eachSeriesByType(t, function(t) {
            t.__paletteScope = n, i.set(t.uid, t)
          }), i
        },
        reset: function(t) {
          var e = t.getRawData(),
            n = {},
            i = t.getData();
          i.each(function(t) {
            var e = i.getRawIndex(t);
            n[e] = t
          }), e.each(function(r) {
            var a, o = n[r],
              s = null != o && i.getItemVisual(o, "color", !0),
              l = null != o && i.getItemVisual(o, "borderColor", !0);
            if (s && l || (a = e.getItemModel(r)), s) e.setItemVisual(r, "color", s);
            else {
              var u = a.get("itemStyle.color") || t.getColorFromPalette(e.getName(r) || r + "", t.__paletteScope, e.count());
              e.setItemVisual(r, "color", u), null != o && i.setItemVisual(o, "color", u)
            }
            if (l) e.setItemVisual(r, "borderColor", l);
            else {
              var h = a.get("itemStyle.borderColor");
              e.setItemVisual(r, "borderColor", h), null != o && i.setItemVisual(o, "borderColor", h)
            }
          })
        }
      }
    },
    tw = Math.PI / 180,
    ew = function(t, e, n, i) {
      var r, a, o = t.getData(),
        s = [],
        l = !1,
        u = (t.get("minShowLabelAngle") || 0) * tw;
      o.each(function(n) {
        var i = o.getItemLayout(n),
          h = o.getItemModel(n),
          c = h.getModel("label"),
          f = c.get("position") || h.get("emphasis.label.position"),
          d = h.getModel("labelLine"),
          p = d.get("length"),
          g = d.get("length2");
        if (!(i.angle < u)) {
          var v, m, y, _, x = (i.startAngle + i.endAngle) / 2,
            w = Math.cos(x),
            b = Math.sin(x);
          r = i.cx, a = i.cy;
          var S = "inside" === f || "inner" === f;
          if ("center" === f) v = i.cx, m = i.cy, _ = "center";
          else {
            var M = (S ? (i.r + i.r0) / 2 * w : i.r * w) + r,
              T = (S ? (i.r + i.r0) / 2 * b : i.r * b) + a;
            if (v = M + 3 * w, m = T + 3 * b, !S) {
              var C = M + w * (p + e - i.r),
                I = T + b * (p + e - i.r),
                k = C + (0 > w ? -1 : 1) * g,
                A = I;
              v = k + (0 > w ? -5 : 5), m = A, y = [
                [M, T],
                [C, I],
                [k, A]
              ]
            }
            _ = S ? "center" : w > 0 ? "left" : "right"
          }
          var D, P = c.getFont(),
            L = c.get("rotate");
          D = "number" == typeof L ? L * (Math.PI / 180) : L ? 0 > w ? -x + Math.PI : -x : 0;
          var O = t.getFormattedLabel(n, "normal") || o.getName(n),
            E = Vn(O, P, _, "top");
          l = !!D, i.label = {
            x: v,
            y: m,
            position: f,
            height: E.height,
            len: p,
            len2: g,
            linePoints: y,
            textAlign: _,
            verticalAlign: "middle",
            rotation: D,
            inside: S
          }, S || s.push(i.label)
        }
      }), !l && t.get("avoidLabelOverlap") && tf(s, r, a, e, n, i)
    },
    nw = 2 * Math.PI,
    iw = Math.PI / 180,
    rw = function(t, e, n) {
      e.eachSeriesByType(t, function(t) {
        var e = t.getData(),
          i = e.mapDimension("value"),
          r = t.get("center"),
          a = t.get("radius");
        x(a) || (a = [0, a]), x(r) || (r = [r, r]);
        var o = n.getWidth(),
          s = n.getHeight(),
          l = Math.min(o, s),
          u = oo(r[0], o),
          h = oo(r[1], s),
          c = oo(a[0], l / 2),
          f = oo(a[1], l / 2),
          d = -t.get("startAngle") * iw,
          p = t.get("minAngle") * iw,
          g = 0;
        e.each(i, function(t) {
          !isNaN(t) && g++
        });
        var v = e.getSum(i),
          m = Math.PI / (v || g) * 2,
          y = t.get("clockwise"),
          _ = t.get("roseType"),
          w = t.get("stillShowZeroSum"),
          b = e.getDataExtent(i);
        b[0] = 0;
        var S = nw,
          M = 0,
          T = d,
          C = y ? 1 : -1;
        if (e.each(i, function(t, n) {
            var i;
            if (isNaN(t)) return void e.setItemLayout(n, {
              angle: 0 / 0,
              startAngle: 0 / 0,
              endAngle: 0 / 0,
              clockwise: y,
              cx: u,
              cy: h,
              r0: c,
              r: _ ? 0 / 0 : f
            });
            i = "area" !== _ ? 0 === v && w ? m : t * m : nw / g, p > i ? (i = p, S -= p) : M += t;
            var r = T + C * i;
            e.setItemLayout(n, {
              angle: i,
              startAngle: T,
              endAngle: r,
              clockwise: y,
              cx: u,
              cy: h,
              r0: c,
              r: _ ? ao(t, b, [c, f]) : f
            }), T = r
          }), nw > S && g)
          if (.001 >= S) {
            var I = nw / g;
            e.each(i, function(t, n) {
              if (!isNaN(t)) {
                var i = e.getItemLayout(n);
                i.angle = I, i.startAngle = d + C * n * I, i.endAngle = d + C * (n + 1) * I
              }
            })
          } else m = S / M, T = d, e.each(i, function(t, n) {
            if (!isNaN(t)) {
              var i = e.getItemLayout(n),
                r = i.angle === p ? p : t * m;
              i.startAngle = T, i.endAngle = T + C * r, T += C * r
            }
          });
        ew(t, f, o, s)
      })
    },
    aw = function(t) {
      return {
        seriesType: t,
        reset: function(t, e) {
          var n = e.findComponents({
            mainType: "legend"
          });
          if (n && n.length) {
            var i = t.getData();
            i.filterSelf(function(t) {
              for (var e = i.getName(t), r = 0; r < n.length; r++)
                if (!n[r].isSelected(e)) return !1;
              return !0
            })
          }
        }
      }
    };
  Qx("pie", [{
    type: "pieToggleSelect",
    event: "pieselectchanged",
    method: "toggleSelected"
  }, {
    type: "pieSelect",
    event: "pieselected",
    method: "select"
  }, {
    type: "pieUnSelect",
    event: "pieunselected",
    method: "unSelect"
  }]), hu(Jx("pie")), uu(_(rw, "pie")), ru(aw("pie")), t.version = py, t.dependencies = gy, t.PRIORITY = ky, t.init = $l, t.connect = Kl, t.disConnect = Ql, t.disconnect = Yy, t.dispose = Jl, t.getInstanceByDom = tu, t.getInstanceById = eu, t.registerTheme = nu, t.registerPreprocessor = iu, t.registerProcessor = ru, t.registerPostUpdate = au, t.registerAction = ou, t.registerCoordinateSystem = su, t.getCoordinateSystemDimensions = lu, t.registerLayout = uu, t.registerVisual = hu, t.registerLoading = fu, t.extendComponentModel = du, t.extendComponentView = pu, t.extendSeriesModel = gu, t.extendChartView = vu, t.setCanvasCreator = mu, t.registerMap = yu, t.getMap = _u, t.dataTool = Zy, t.zrender = vp, t.number = Iv, t.format = Ev, t.throttle = el, t.helper = Z_, t.matrix = Hf, t.vector = Cf, t.color = od, t.parseGeoJSON = K_, t.parseGeoJson = ex, t.util = nx, t.graphic = ix, t.List = s_, t.Model = Qa, t.Axis = tx, t.env = of
});