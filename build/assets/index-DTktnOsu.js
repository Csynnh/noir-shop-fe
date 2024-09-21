function $v(e, t) {
  for (var n = 0; n < t.length; n++) {
    const r = t[n];
    if (typeof r != 'string' && !Array.isArray(r)) {
      for (const i in r)
        if (i !== 'default' && !(i in e)) {
          const o = Object.getOwnPropertyDescriptor(r, i);
          o && Object.defineProperty(e, i, o.get ? o : { enumerable: !0, get: () => r[i] });
        }
    }
  }
  return Object.freeze(Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }));
}
(function () {
  const t = document.createElement('link').relList;
  if (t && t.supports && t.supports('modulepreload')) return;
  for (const i of document.querySelectorAll('link[rel="modulepreload"]')) r(i);
  new MutationObserver((i) => {
    for (const o of i)
      if (o.type === 'childList')
        for (const a of o.addedNodes) a.tagName === 'LINK' && a.rel === 'modulepreload' && r(a);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(i) {
    const o = {};
    return (
      i.integrity && (o.integrity = i.integrity),
      i.referrerPolicy && (o.referrerPolicy = i.referrerPolicy),
      i.crossOrigin === 'use-credentials'
        ? (o.credentials = 'include')
        : i.crossOrigin === 'anonymous'
          ? (o.credentials = 'omit')
          : (o.credentials = 'same-origin'),
      o
    );
  }
  function r(i) {
    if (i.ep) return;
    i.ep = !0;
    const o = n(i);
    fetch(i.href, o);
  }
})();
function K2(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, 'default') ? e.default : e;
}
var l6 = { exports: {} },
  Cu = {},
  s6 = { exports: {} },
  se = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var yl = Symbol.for('react.element'),
  Tv = Symbol.for('react.portal'),
  Nv = Symbol.for('react.fragment'),
  Fv = Symbol.for('react.strict_mode'),
  jv = Symbol.for('react.profiler'),
  Av = Symbol.for('react.provider'),
  zv = Symbol.for('react.context'),
  Dv = Symbol.for('react.forward_ref'),
  Vv = Symbol.for('react.suspense'),
  Hv = Symbol.for('react.memo'),
  Bv = Symbol.for('react.lazy'),
  vd = Symbol.iterator;
function Uv(e) {
  return e === null || typeof e != 'object'
    ? null
    : ((e = (vd && e[vd]) || e['@@iterator']), typeof e == 'function' ? e : null);
}
var u6 = {
    isMounted: function () {
      return !1;
    },
    enqueueForceUpdate: function () {},
    enqueueReplaceState: function () {},
    enqueueSetState: function () {},
  },
  c6 = Object.assign,
  f6 = {};
function Ko(e, t, n) {
  (this.props = e), (this.context = t), (this.refs = f6), (this.updater = n || u6);
}
Ko.prototype.isReactComponent = {};
Ko.prototype.setState = function (e, t) {
  if (typeof e != 'object' && typeof e != 'function' && e != null)
    throw Error(
      'setState(...): takes an object of state variables to update or a function which returns an object of state variables.',
    );
  this.updater.enqueueSetState(this, e, t, 'setState');
};
Ko.prototype.forceUpdate = function (e) {
  this.updater.enqueueForceUpdate(this, e, 'forceUpdate');
};
function d6() {}
d6.prototype = Ko.prototype;
function Z2(e, t, n) {
  (this.props = e), (this.context = t), (this.refs = f6), (this.updater = n || u6);
}
var G2 = (Z2.prototype = new d6());
G2.constructor = Z2;
c6(G2, Ko.prototype);
G2.isPureReactComponent = !0;
var md = Array.isArray,
  v6 = Object.prototype.hasOwnProperty,
  q2 = { current: null },
  m6 = { key: !0, ref: !0, __self: !0, __source: !0 };
function p6(e, t, n) {
  var r,
    i = {},
    o = null,
    a = null;
  if (t != null)
    for (r in (t.ref !== void 0 && (a = t.ref), t.key !== void 0 && (o = '' + t.key), t))
      v6.call(t, r) && !m6.hasOwnProperty(r) && (i[r] = t[r]);
  var l = arguments.length - 2;
  if (l === 1) i.children = n;
  else if (1 < l) {
    for (var s = Array(l), u = 0; u < l; u++) s[u] = arguments[u + 2];
    i.children = s;
  }
  if (e && e.defaultProps) for (r in ((l = e.defaultProps), l)) i[r] === void 0 && (i[r] = l[r]);
  return { $$typeof: yl, type: e, key: o, ref: a, props: i, _owner: q2.current };
}
function Wv(e, t) {
  return { $$typeof: yl, type: e.type, key: t, ref: e.ref, props: e.props, _owner: e._owner };
}
function Q2(e) {
  return typeof e == 'object' && e !== null && e.$$typeof === yl;
}
function Kv(e) {
  var t = { '=': '=0', ':': '=2' };
  return (
    '$' +
    e.replace(/[=:]/g, function (n) {
      return t[n];
    })
  );
}
var pd = /\/+/g;
function uc(e, t) {
  return typeof e == 'object' && e !== null && e.key != null ? Kv('' + e.key) : t.toString(36);
}
function ps(e, t, n, r, i) {
  var o = typeof e;
  (o === 'undefined' || o === 'boolean') && (e = null);
  var a = !1;
  if (e === null) a = !0;
  else
    switch (o) {
      case 'string':
      case 'number':
        a = !0;
        break;
      case 'object':
        switch (e.$$typeof) {
          case yl:
          case Tv:
            a = !0;
        }
    }
  if (a)
    return (
      (a = e),
      (i = i(a)),
      (e = r === '' ? '.' + uc(a, 0) : r),
      md(i)
        ? ((n = ''),
          e != null && (n = e.replace(pd, '$&/') + '/'),
          ps(i, t, n, '', function (u) {
            return u;
          }))
        : i != null &&
          (Q2(i) &&
            (i = Wv(
              i,
              n +
                (!i.key || (a && a.key === i.key) ? '' : ('' + i.key).replace(pd, '$&/') + '/') +
                e,
            )),
          t.push(i)),
      1
    );
  if (((a = 0), (r = r === '' ? '.' : r + ':'), md(e)))
    for (var l = 0; l < e.length; l++) {
      o = e[l];
      var s = r + uc(o, l);
      a += ps(o, t, n, s, i);
    }
  else if (((s = Uv(e)), typeof s == 'function'))
    for (e = s.call(e), l = 0; !(o = e.next()).done; )
      (o = o.value), (s = r + uc(o, l++)), (a += ps(o, t, n, s, i));
  else if (o === 'object')
    throw (
      ((t = String(e)),
      Error(
        'Objects are not valid as a React child (found: ' +
          (t === '[object Object]' ? 'object with keys {' + Object.keys(e).join(', ') + '}' : t) +
          '). If you meant to render a collection of children, use an array instead.',
      ))
    );
  return a;
}
function Dl(e, t, n) {
  if (e == null) return e;
  var r = [],
    i = 0;
  return (
    ps(e, r, '', '', function (o) {
      return t.call(n, o, i++);
    }),
    r
  );
}
function Zv(e) {
  if (e._status === -1) {
    var t = e._result;
    (t = t()),
      t.then(
        function (n) {
          (e._status === 0 || e._status === -1) && ((e._status = 1), (e._result = n));
        },
        function (n) {
          (e._status === 0 || e._status === -1) && ((e._status = 2), (e._result = n));
        },
      ),
      e._status === -1 && ((e._status = 0), (e._result = t));
  }
  if (e._status === 1) return e._result.default;
  throw e._result;
}
var Yt = { current: null },
  hs = { transition: null },
  Gv = { ReactCurrentDispatcher: Yt, ReactCurrentBatchConfig: hs, ReactCurrentOwner: q2 };
function h6() {
  throw Error('act(...) is not supported in production builds of React.');
}
se.Children = {
  map: Dl,
  forEach: function (e, t, n) {
    Dl(
      e,
      function () {
        t.apply(this, arguments);
      },
      n,
    );
  },
  count: function (e) {
    var t = 0;
    return (
      Dl(e, function () {
        t++;
      }),
      t
    );
  },
  toArray: function (e) {
    return (
      Dl(e, function (t) {
        return t;
      }) || []
    );
  },
  only: function (e) {
    if (!Q2(e))
      throw Error('React.Children.only expected to receive a single React element child.');
    return e;
  },
};
se.Component = Ko;
se.Fragment = Nv;
se.Profiler = jv;
se.PureComponent = Z2;
se.StrictMode = Fv;
se.Suspense = Vv;
se.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Gv;
se.act = h6;
se.cloneElement = function (e, t, n) {
  if (e == null)
    throw Error(
      'React.cloneElement(...): The argument must be a React element, but you passed ' + e + '.',
    );
  var r = c6({}, e.props),
    i = e.key,
    o = e.ref,
    a = e._owner;
  if (t != null) {
    if (
      (t.ref !== void 0 && ((o = t.ref), (a = q2.current)),
      t.key !== void 0 && (i = '' + t.key),
      e.type && e.type.defaultProps)
    )
      var l = e.type.defaultProps;
    for (s in t)
      v6.call(t, s) &&
        !m6.hasOwnProperty(s) &&
        (r[s] = t[s] === void 0 && l !== void 0 ? l[s] : t[s]);
  }
  var s = arguments.length - 2;
  if (s === 1) r.children = n;
  else if (1 < s) {
    l = Array(s);
    for (var u = 0; u < s; u++) l[u] = arguments[u + 2];
    r.children = l;
  }
  return { $$typeof: yl, type: e.type, key: i, ref: o, props: r, _owner: a };
};
se.createContext = function (e) {
  return (
    (e = {
      $$typeof: zv,
      _currentValue: e,
      _currentValue2: e,
      _threadCount: 0,
      Provider: null,
      Consumer: null,
      _defaultValue: null,
      _globalName: null,
    }),
    (e.Provider = { $$typeof: Av, _context: e }),
    (e.Consumer = e)
  );
};
se.createElement = p6;
se.createFactory = function (e) {
  var t = p6.bind(null, e);
  return (t.type = e), t;
};
se.createRef = function () {
  return { current: null };
};
se.forwardRef = function (e) {
  return { $$typeof: Dv, render: e };
};
se.isValidElement = Q2;
se.lazy = function (e) {
  return { $$typeof: Bv, _payload: { _status: -1, _result: e }, _init: Zv };
};
se.memo = function (e, t) {
  return { $$typeof: Hv, type: e, compare: t === void 0 ? null : t };
};
se.startTransition = function (e) {
  var t = hs.transition;
  hs.transition = {};
  try {
    e();
  } finally {
    hs.transition = t;
  }
};
se.unstable_act = h6;
se.useCallback = function (e, t) {
  return Yt.current.useCallback(e, t);
};
se.useContext = function (e) {
  return Yt.current.useContext(e);
};
se.useDebugValue = function () {};
se.useDeferredValue = function (e) {
  return Yt.current.useDeferredValue(e);
};
se.useEffect = function (e, t) {
  return Yt.current.useEffect(e, t);
};
se.useId = function () {
  return Yt.current.useId();
};
se.useImperativeHandle = function (e, t, n) {
  return Yt.current.useImperativeHandle(e, t, n);
};
se.useInsertionEffect = function (e, t) {
  return Yt.current.useInsertionEffect(e, t);
};
se.useLayoutEffect = function (e, t) {
  return Yt.current.useLayoutEffect(e, t);
};
se.useMemo = function (e, t) {
  return Yt.current.useMemo(e, t);
};
se.useReducer = function (e, t, n) {
  return Yt.current.useReducer(e, t, n);
};
se.useRef = function (e) {
  return Yt.current.useRef(e);
};
se.useState = function (e) {
  return Yt.current.useState(e);
};
se.useSyncExternalStore = function (e, t, n) {
  return Yt.current.useSyncExternalStore(e, t, n);
};
se.useTransition = function () {
  return Yt.current.useTransition();
};
se.version = '18.3.1';
s6.exports = se;
var d = s6.exports;
const mt = K2(d),
  Cl = $v({ __proto__: null, default: mt }, [d]);
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var qv = d,
  Qv = Symbol.for('react.element'),
  Xv = Symbol.for('react.fragment'),
  Yv = Object.prototype.hasOwnProperty,
  Jv = qv.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
  em = { key: !0, ref: !0, __self: !0, __source: !0 };
function g6(e, t, n) {
  var r,
    i = {},
    o = null,
    a = null;
  n !== void 0 && (o = '' + n),
    t.key !== void 0 && (o = '' + t.key),
    t.ref !== void 0 && (a = t.ref);
  for (r in t) Yv.call(t, r) && !em.hasOwnProperty(r) && (i[r] = t[r]);
  if (e && e.defaultProps) for (r in ((t = e.defaultProps), t)) i[r] === void 0 && (i[r] = t[r]);
  return { $$typeof: Qv, type: e, key: o, ref: a, props: i, _owner: Jv.current };
}
Cu.Fragment = Xv;
Cu.jsx = g6;
Cu.jsxs = g6;
l6.exports = Cu;
var _ = l6.exports,
  y6 = { exports: {} },
  Cn = {},
  C6 = { exports: {} },
  w6 = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ (function (e) {
  function t(k, $) {
    var N = k.length;
    k.push($);
    e: for (; 0 < N; ) {
      var D = (N - 1) >>> 1,
        V = k[D];
      if (0 < i(V, $)) (k[D] = $), (k[N] = V), (N = D);
      else break e;
    }
  }
  function n(k) {
    return k.length === 0 ? null : k[0];
  }
  function r(k) {
    if (k.length === 0) return null;
    var $ = k[0],
      N = k.pop();
    if (N !== $) {
      k[0] = N;
      e: for (var D = 0, V = k.length, Z = V >>> 1; D < Z; ) {
        var H = 2 * (D + 1) - 1,
          Q = k[H],
          ee = H + 1,
          te = k[ee];
        if (0 > i(Q, N))
          ee < V && 0 > i(te, Q)
            ? ((k[D] = te), (k[ee] = N), (D = ee))
            : ((k[D] = Q), (k[H] = N), (D = H));
        else if (ee < V && 0 > i(te, N)) (k[D] = te), (k[ee] = N), (D = ee);
        else break e;
      }
    }
    return $;
  }
  function i(k, $) {
    var N = k.sortIndex - $.sortIndex;
    return N !== 0 ? N : k.id - $.id;
  }
  if (typeof performance == 'object' && typeof performance.now == 'function') {
    var o = performance;
    e.unstable_now = function () {
      return o.now();
    };
  } else {
    var a = Date,
      l = a.now();
    e.unstable_now = function () {
      return a.now() - l;
    };
  }
  var s = [],
    u = [],
    c = 1,
    f = null,
    v = 3,
    y = !1,
    g = !1,
    C = !1,
    w = typeof setTimeout == 'function' ? setTimeout : null,
    p = typeof clearTimeout == 'function' ? clearTimeout : null,
    m = typeof setImmediate < 'u' ? setImmediate : null;
  typeof navigator < 'u' &&
    navigator.scheduling !== void 0 &&
    navigator.scheduling.isInputPending !== void 0 &&
    navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function h(k) {
    for (var $ = n(u); $ !== null; ) {
      if ($.callback === null) r(u);
      else if ($.startTime <= k) r(u), ($.sortIndex = $.expirationTime), t(s, $);
      else break;
      $ = n(u);
    }
  }
  function S(k) {
    if (((C = !1), h(k), !g))
      if (n(s) !== null) (g = !0), O(x);
      else {
        var $ = n(u);
        $ !== null && R(S, $.startTime - k);
      }
  }
  function x(k, $) {
    (g = !1), C && ((C = !1), p(P), (P = -1)), (y = !0);
    var N = v;
    try {
      for (h($), f = n(s); f !== null && (!(f.expirationTime > $) || (k && !F())); ) {
        var D = f.callback;
        if (typeof D == 'function') {
          (f.callback = null), (v = f.priorityLevel);
          var V = D(f.expirationTime <= $);
          ($ = e.unstable_now()),
            typeof V == 'function' ? (f.callback = V) : f === n(s) && r(s),
            h($);
        } else r(s);
        f = n(s);
      }
      if (f !== null) var Z = !0;
      else {
        var H = n(u);
        H !== null && R(S, H.startTime - $), (Z = !1);
      }
      return Z;
    } finally {
      (f = null), (v = N), (y = !1);
    }
  }
  var b = !1,
    E = null,
    P = -1,
    M = 5,
    I = -1;
  function F() {
    return !(e.unstable_now() - I < M);
  }
  function z() {
    if (E !== null) {
      var k = e.unstable_now();
      I = k;
      var $ = !0;
      try {
        $ = E(!0, k);
      } finally {
        $ ? j() : ((b = !1), (E = null));
      }
    } else b = !1;
  }
  var j;
  if (typeof m == 'function')
    j = function () {
      m(z);
    };
  else if (typeof MessageChannel < 'u') {
    var A = new MessageChannel(),
      W = A.port2;
    (A.port1.onmessage = z),
      (j = function () {
        W.postMessage(null);
      });
  } else
    j = function () {
      w(z, 0);
    };
  function O(k) {
    (E = k), b || ((b = !0), j());
  }
  function R(k, $) {
    P = w(function () {
      k(e.unstable_now());
    }, $);
  }
  (e.unstable_IdlePriority = 5),
    (e.unstable_ImmediatePriority = 1),
    (e.unstable_LowPriority = 4),
    (e.unstable_NormalPriority = 3),
    (e.unstable_Profiling = null),
    (e.unstable_UserBlockingPriority = 2),
    (e.unstable_cancelCallback = function (k) {
      k.callback = null;
    }),
    (e.unstable_continueExecution = function () {
      g || y || ((g = !0), O(x));
    }),
    (e.unstable_forceFrameRate = function (k) {
      0 > k || 125 < k
        ? console.error(
            'forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported',
          )
        : (M = 0 < k ? Math.floor(1e3 / k) : 5);
    }),
    (e.unstable_getCurrentPriorityLevel = function () {
      return v;
    }),
    (e.unstable_getFirstCallbackNode = function () {
      return n(s);
    }),
    (e.unstable_next = function (k) {
      switch (v) {
        case 1:
        case 2:
        case 3:
          var $ = 3;
          break;
        default:
          $ = v;
      }
      var N = v;
      v = $;
      try {
        return k();
      } finally {
        v = N;
      }
    }),
    (e.unstable_pauseExecution = function () {}),
    (e.unstable_requestPaint = function () {}),
    (e.unstable_runWithPriority = function (k, $) {
      switch (k) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          k = 3;
      }
      var N = v;
      v = k;
      try {
        return $();
      } finally {
        v = N;
      }
    }),
    (e.unstable_scheduleCallback = function (k, $, N) {
      var D = e.unstable_now();
      switch (
        (typeof N == 'object' && N !== null
          ? ((N = N.delay), (N = typeof N == 'number' && 0 < N ? D + N : D))
          : (N = D),
        k)
      ) {
        case 1:
          var V = -1;
          break;
        case 2:
          V = 250;
          break;
        case 5:
          V = 1073741823;
          break;
        case 4:
          V = 1e4;
          break;
        default:
          V = 5e3;
      }
      return (
        (V = N + V),
        (k = {
          id: c++,
          callback: $,
          priorityLevel: k,
          startTime: N,
          expirationTime: V,
          sortIndex: -1,
        }),
        N > D
          ? ((k.sortIndex = N),
            t(u, k),
            n(s) === null && k === n(u) && (C ? (p(P), (P = -1)) : (C = !0), R(S, N - D)))
          : ((k.sortIndex = V), t(s, k), g || y || ((g = !0), O(x))),
        k
      );
    }),
    (e.unstable_shouldYield = F),
    (e.unstable_wrapCallback = function (k) {
      var $ = v;
      return function () {
        var N = v;
        v = $;
        try {
          return k.apply(this, arguments);
        } finally {
          v = N;
        }
      };
    });
})(w6);
C6.exports = w6;
var tm = C6.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var nm = d,
  gn = tm;
function U(e) {
  for (
    var t = 'https://reactjs.org/docs/error-decoder.html?invariant=' + e, n = 1;
    n < arguments.length;
    n++
  )
    t += '&args[]=' + encodeURIComponent(arguments[n]);
  return (
    'Minified React error #' +
    e +
    '; visit ' +
    t +
    ' for the full message or use the non-minified dev environment for full errors and additional helpful warnings.'
  );
}
var S6 = new Set(),
  za = {};
function Ai(e, t) {
  Oo(e, t), Oo(e + 'Capture', t);
}
function Oo(e, t) {
  for (za[e] = t, e = 0; e < t.length; e++) S6.add(t[e]);
}
var Ir = !(
    typeof window > 'u' ||
    typeof window.document > 'u' ||
    typeof window.document.createElement > 'u'
  ),
  e3 = Object.prototype.hasOwnProperty,
  rm =
    /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
  hd = {},
  gd = {};
function im(e) {
  return e3.call(gd, e) ? !0 : e3.call(hd, e) ? !1 : rm.test(e) ? (gd[e] = !0) : ((hd[e] = !0), !1);
}
function om(e, t, n, r) {
  if (n !== null && n.type === 0) return !1;
  switch (typeof t) {
    case 'function':
    case 'symbol':
      return !0;
    case 'boolean':
      return r
        ? !1
        : n !== null
          ? !n.acceptsBooleans
          : ((e = e.toLowerCase().slice(0, 5)), e !== 'data-' && e !== 'aria-');
    default:
      return !1;
  }
}
function am(e, t, n, r) {
  if (t === null || typeof t > 'u' || om(e, t, n, r)) return !0;
  if (r) return !1;
  if (n !== null)
    switch (n.type) {
      case 3:
        return !t;
      case 4:
        return t === !1;
      case 5:
        return isNaN(t);
      case 6:
        return isNaN(t) || 1 > t;
    }
  return !1;
}
function Jt(e, t, n, r, i, o, a) {
  (this.acceptsBooleans = t === 2 || t === 3 || t === 4),
    (this.attributeName = r),
    (this.attributeNamespace = i),
    (this.mustUseProperty = n),
    (this.propertyName = e),
    (this.type = t),
    (this.sanitizeURL = o),
    (this.removeEmptyString = a);
}
var Nt = {};
'children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style'
  .split(' ')
  .forEach(function (e) {
    Nt[e] = new Jt(e, 0, !1, e, null, !1, !1);
  });
[
  ['acceptCharset', 'accept-charset'],
  ['className', 'class'],
  ['htmlFor', 'for'],
  ['httpEquiv', 'http-equiv'],
].forEach(function (e) {
  var t = e[0];
  Nt[t] = new Jt(t, 1, !1, e[1], null, !1, !1);
});
['contentEditable', 'draggable', 'spellCheck', 'value'].forEach(function (e) {
  Nt[e] = new Jt(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
['autoReverse', 'externalResourcesRequired', 'focusable', 'preserveAlpha'].forEach(function (e) {
  Nt[e] = new Jt(e, 2, !1, e, null, !1, !1);
});
'allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope'
  .split(' ')
  .forEach(function (e) {
    Nt[e] = new Jt(e, 3, !1, e.toLowerCase(), null, !1, !1);
  });
['checked', 'multiple', 'muted', 'selected'].forEach(function (e) {
  Nt[e] = new Jt(e, 3, !0, e, null, !1, !1);
});
['capture', 'download'].forEach(function (e) {
  Nt[e] = new Jt(e, 4, !1, e, null, !1, !1);
});
['cols', 'rows', 'size', 'span'].forEach(function (e) {
  Nt[e] = new Jt(e, 6, !1, e, null, !1, !1);
});
['rowSpan', 'start'].forEach(function (e) {
  Nt[e] = new Jt(e, 5, !1, e.toLowerCase(), null, !1, !1);
});
var X2 = /[\-:]([a-z])/g;
function Y2(e) {
  return e[1].toUpperCase();
}
'accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height'
  .split(' ')
  .forEach(function (e) {
    var t = e.replace(X2, Y2);
    Nt[t] = new Jt(t, 1, !1, e, null, !1, !1);
  });
'xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type'
  .split(' ')
  .forEach(function (e) {
    var t = e.replace(X2, Y2);
    Nt[t] = new Jt(t, 1, !1, e, 'http://www.w3.org/1999/xlink', !1, !1);
  });
['xml:base', 'xml:lang', 'xml:space'].forEach(function (e) {
  var t = e.replace(X2, Y2);
  Nt[t] = new Jt(t, 1, !1, e, 'http://www.w3.org/XML/1998/namespace', !1, !1);
});
['tabIndex', 'crossOrigin'].forEach(function (e) {
  Nt[e] = new Jt(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
Nt.xlinkHref = new Jt('xlinkHref', 1, !1, 'xlink:href', 'http://www.w3.org/1999/xlink', !0, !1);
['src', 'href', 'action', 'formAction'].forEach(function (e) {
  Nt[e] = new Jt(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function J2(e, t, n, r) {
  var i = Nt.hasOwnProperty(t) ? Nt[t] : null;
  (i !== null
    ? i.type !== 0
    : r || !(2 < t.length) || (t[0] !== 'o' && t[0] !== 'O') || (t[1] !== 'n' && t[1] !== 'N')) &&
    (am(t, n, i, r) && (n = null),
    r || i === null
      ? im(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, '' + n))
      : i.mustUseProperty
        ? (e[i.propertyName] = n === null ? (i.type === 3 ? !1 : '') : n)
        : ((t = i.attributeName),
          (r = i.attributeNamespace),
          n === null
            ? e.removeAttribute(t)
            : ((i = i.type),
              (n = i === 3 || (i === 4 && n === !0) ? '' : '' + n),
              r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
}
var Nr = nm.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
  Vl = Symbol.for('react.element'),
  so = Symbol.for('react.portal'),
  uo = Symbol.for('react.fragment'),
  ef = Symbol.for('react.strict_mode'),
  t3 = Symbol.for('react.profiler'),
  x6 = Symbol.for('react.provider'),
  b6 = Symbol.for('react.context'),
  tf = Symbol.for('react.forward_ref'),
  n3 = Symbol.for('react.suspense'),
  r3 = Symbol.for('react.suspense_list'),
  nf = Symbol.for('react.memo'),
  Hr = Symbol.for('react.lazy'),
  E6 = Symbol.for('react.offscreen'),
  yd = Symbol.iterator;
function ia(e) {
  return e === null || typeof e != 'object'
    ? null
    : ((e = (yd && e[yd]) || e['@@iterator']), typeof e == 'function' ? e : null);
}
var tt = Object.assign,
  cc;
function ga(e) {
  if (cc === void 0)
    try {
      throw Error();
    } catch (n) {
      var t = n.stack.trim().match(/\n( *(at )?)/);
      cc = (t && t[1]) || '';
    }
  return (
    `
` +
    cc +
    e
  );
}
var fc = !1;
function dc(e, t) {
  if (!e || fc) return '';
  fc = !0;
  var n = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    if (t)
      if (
        ((t = function () {
          throw Error();
        }),
        Object.defineProperty(t.prototype, 'props', {
          set: function () {
            throw Error();
          },
        }),
        typeof Reflect == 'object' && Reflect.construct)
      ) {
        try {
          Reflect.construct(t, []);
        } catch (u) {
          var r = u;
        }
        Reflect.construct(e, [], t);
      } else {
        try {
          t.call();
        } catch (u) {
          r = u;
        }
        e.call(t.prototype);
      }
    else {
      try {
        throw Error();
      } catch (u) {
        r = u;
      }
      e();
    }
  } catch (u) {
    if (u && r && typeof u.stack == 'string') {
      for (
        var i = u.stack.split(`
`),
          o = r.stack.split(`
`),
          a = i.length - 1,
          l = o.length - 1;
        1 <= a && 0 <= l && i[a] !== o[l];

      )
        l--;
      for (; 1 <= a && 0 <= l; a--, l--)
        if (i[a] !== o[l]) {
          if (a !== 1 || l !== 1)
            do
              if ((a--, l--, 0 > l || i[a] !== o[l])) {
                var s =
                  `
` + i[a].replace(' at new ', ' at ');
                return (
                  e.displayName &&
                    s.includes('<anonymous>') &&
                    (s = s.replace('<anonymous>', e.displayName)),
                  s
                );
              }
            while (1 <= a && 0 <= l);
          break;
        }
    }
  } finally {
    (fc = !1), (Error.prepareStackTrace = n);
  }
  return (e = e ? e.displayName || e.name : '') ? ga(e) : '';
}
function lm(e) {
  switch (e.tag) {
    case 5:
      return ga(e.type);
    case 16:
      return ga('Lazy');
    case 13:
      return ga('Suspense');
    case 19:
      return ga('SuspenseList');
    case 0:
    case 2:
    case 15:
      return (e = dc(e.type, !1)), e;
    case 11:
      return (e = dc(e.type.render, !1)), e;
    case 1:
      return (e = dc(e.type, !0)), e;
    default:
      return '';
  }
}
function i3(e) {
  if (e == null) return null;
  if (typeof e == 'function') return e.displayName || e.name || null;
  if (typeof e == 'string') return e;
  switch (e) {
    case uo:
      return 'Fragment';
    case so:
      return 'Portal';
    case t3:
      return 'Profiler';
    case ef:
      return 'StrictMode';
    case n3:
      return 'Suspense';
    case r3:
      return 'SuspenseList';
  }
  if (typeof e == 'object')
    switch (e.$$typeof) {
      case b6:
        return (e.displayName || 'Context') + '.Consumer';
      case x6:
        return (e._context.displayName || 'Context') + '.Provider';
      case tf:
        var t = e.render;
        return (
          (e = e.displayName),
          e ||
            ((e = t.displayName || t.name || ''),
            (e = e !== '' ? 'ForwardRef(' + e + ')' : 'ForwardRef')),
          e
        );
      case nf:
        return (t = e.displayName || null), t !== null ? t : i3(e.type) || 'Memo';
      case Hr:
        (t = e._payload), (e = e._init);
        try {
          return i3(e(t));
        } catch {}
    }
  return null;
}
function sm(e) {
  var t = e.type;
  switch (e.tag) {
    case 24:
      return 'Cache';
    case 9:
      return (t.displayName || 'Context') + '.Consumer';
    case 10:
      return (t._context.displayName || 'Context') + '.Provider';
    case 18:
      return 'DehydratedFragment';
    case 11:
      return (
        (e = t.render),
        (e = e.displayName || e.name || ''),
        t.displayName || (e !== '' ? 'ForwardRef(' + e + ')' : 'ForwardRef')
      );
    case 7:
      return 'Fragment';
    case 5:
      return t;
    case 4:
      return 'Portal';
    case 3:
      return 'Root';
    case 6:
      return 'Text';
    case 16:
      return i3(t);
    case 8:
      return t === ef ? 'StrictMode' : 'Mode';
    case 22:
      return 'Offscreen';
    case 12:
      return 'Profiler';
    case 21:
      return 'Scope';
    case 13:
      return 'Suspense';
    case 19:
      return 'SuspenseList';
    case 25:
      return 'TracingMarker';
    case 1:
    case 0:
    case 17:
    case 2:
    case 14:
    case 15:
      if (typeof t == 'function') return t.displayName || t.name || null;
      if (typeof t == 'string') return t;
  }
  return null;
}
function si(e) {
  switch (typeof e) {
    case 'boolean':
    case 'number':
    case 'string':
    case 'undefined':
      return e;
    case 'object':
      return e;
    default:
      return '';
  }
}
function k6(e) {
  var t = e.type;
  return (e = e.nodeName) && e.toLowerCase() === 'input' && (t === 'checkbox' || t === 'radio');
}
function um(e) {
  var t = k6(e) ? 'checked' : 'value',
    n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
    r = '' + e[t];
  if (
    !e.hasOwnProperty(t) &&
    typeof n < 'u' &&
    typeof n.get == 'function' &&
    typeof n.set == 'function'
  ) {
    var i = n.get,
      o = n.set;
    return (
      Object.defineProperty(e, t, {
        configurable: !0,
        get: function () {
          return i.call(this);
        },
        set: function (a) {
          (r = '' + a), o.call(this, a);
        },
      }),
      Object.defineProperty(e, t, { enumerable: n.enumerable }),
      {
        getValue: function () {
          return r;
        },
        setValue: function (a) {
          r = '' + a;
        },
        stopTracking: function () {
          (e._valueTracker = null), delete e[t];
        },
      }
    );
  }
}
function Hl(e) {
  e._valueTracker || (e._valueTracker = um(e));
}
function P6(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var n = t.getValue(),
    r = '';
  return (
    e && (r = k6(e) ? (e.checked ? 'true' : 'false') : e.value),
    (e = r),
    e !== n ? (t.setValue(e), !0) : !1
  );
}
function Fs(e) {
  if (((e = e || (typeof document < 'u' ? document : void 0)), typeof e > 'u')) return null;
  try {
    return e.activeElement || e.body;
  } catch {
    return e.body;
  }
}
function o3(e, t) {
  var n = t.checked;
  return tt({}, t, {
    defaultChecked: void 0,
    defaultValue: void 0,
    value: void 0,
    checked: n ?? e._wrapperState.initialChecked,
  });
}
function Cd(e, t) {
  var n = t.defaultValue == null ? '' : t.defaultValue,
    r = t.checked != null ? t.checked : t.defaultChecked;
  (n = si(t.value != null ? t.value : n)),
    (e._wrapperState = {
      initialChecked: r,
      initialValue: n,
      controlled: t.type === 'checkbox' || t.type === 'radio' ? t.checked != null : t.value != null,
    });
}
function M6(e, t) {
  (t = t.checked), t != null && J2(e, 'checked', t, !1);
}
function a3(e, t) {
  M6(e, t);
  var n = si(t.value),
    r = t.type;
  if (n != null)
    r === 'number'
      ? ((n === 0 && e.value === '') || e.value != n) && (e.value = '' + n)
      : e.value !== '' + n && (e.value = '' + n);
  else if (r === 'submit' || r === 'reset') {
    e.removeAttribute('value');
    return;
  }
  t.hasOwnProperty('value')
    ? l3(e, t.type, n)
    : t.hasOwnProperty('defaultValue') && l3(e, t.type, si(t.defaultValue)),
    t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked);
}
function wd(e, t, n) {
  if (t.hasOwnProperty('value') || t.hasOwnProperty('defaultValue')) {
    var r = t.type;
    if (!((r !== 'submit' && r !== 'reset') || (t.value !== void 0 && t.value !== null))) return;
    (t = '' + e._wrapperState.initialValue),
      n || t === e.value || (e.value = t),
      (e.defaultValue = t);
  }
  (n = e.name),
    n !== '' && (e.name = ''),
    (e.defaultChecked = !!e._wrapperState.initialChecked),
    n !== '' && (e.name = n);
}
function l3(e, t, n) {
  (t !== 'number' || Fs(e.ownerDocument) !== e) &&
    (n == null
      ? (e.defaultValue = '' + e._wrapperState.initialValue)
      : e.defaultValue !== '' + n && (e.defaultValue = '' + n));
}
var ya = Array.isArray;
function ko(e, t, n, r) {
  if (((e = e.options), t)) {
    t = {};
    for (var i = 0; i < n.length; i++) t['$' + n[i]] = !0;
    for (n = 0; n < e.length; n++)
      (i = t.hasOwnProperty('$' + e[n].value)),
        e[n].selected !== i && (e[n].selected = i),
        i && r && (e[n].defaultSelected = !0);
  } else {
    for (n = '' + si(n), t = null, i = 0; i < e.length; i++) {
      if (e[i].value === n) {
        (e[i].selected = !0), r && (e[i].defaultSelected = !0);
        return;
      }
      t !== null || e[i].disabled || (t = e[i]);
    }
    t !== null && (t.selected = !0);
  }
}
function s3(e, t) {
  if (t.dangerouslySetInnerHTML != null) throw Error(U(91));
  return tt({}, t, {
    value: void 0,
    defaultValue: void 0,
    children: '' + e._wrapperState.initialValue,
  });
}
function Sd(e, t) {
  var n = t.value;
  if (n == null) {
    if (((n = t.children), (t = t.defaultValue), n != null)) {
      if (t != null) throw Error(U(92));
      if (ya(n)) {
        if (1 < n.length) throw Error(U(93));
        n = n[0];
      }
      t = n;
    }
    t == null && (t = ''), (n = t);
  }
  e._wrapperState = { initialValue: si(n) };
}
function R6(e, t) {
  var n = si(t.value),
    r = si(t.defaultValue);
  n != null &&
    ((n = '' + n),
    n !== e.value && (e.value = n),
    t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)),
    r != null && (e.defaultValue = '' + r);
}
function xd(e) {
  var t = e.textContent;
  t === e._wrapperState.initialValue && t !== '' && t !== null && (e.value = t);
}
function L6(e) {
  switch (e) {
    case 'svg':
      return 'http://www.w3.org/2000/svg';
    case 'math':
      return 'http://www.w3.org/1998/Math/MathML';
    default:
      return 'http://www.w3.org/1999/xhtml';
  }
}
function u3(e, t) {
  return e == null || e === 'http://www.w3.org/1999/xhtml'
    ? L6(t)
    : e === 'http://www.w3.org/2000/svg' && t === 'foreignObject'
      ? 'http://www.w3.org/1999/xhtml'
      : e;
}
var Bl,
  I6 = (function (e) {
    return typeof MSApp < 'u' && MSApp.execUnsafeLocalFunction
      ? function (t, n, r, i) {
          MSApp.execUnsafeLocalFunction(function () {
            return e(t, n, r, i);
          });
        }
      : e;
  })(function (e, t) {
    if (e.namespaceURI !== 'http://www.w3.org/2000/svg' || 'innerHTML' in e) e.innerHTML = t;
    else {
      for (
        Bl = Bl || document.createElement('div'),
          Bl.innerHTML = '<svg>' + t.valueOf().toString() + '</svg>',
          t = Bl.firstChild;
        e.firstChild;

      )
        e.removeChild(e.firstChild);
      for (; t.firstChild; ) e.appendChild(t.firstChild);
    }
  });
function Da(e, t) {
  if (t) {
    var n = e.firstChild;
    if (n && n === e.lastChild && n.nodeType === 3) {
      n.nodeValue = t;
      return;
    }
  }
  e.textContent = t;
}
var Ea = {
    animationIterationCount: !0,
    aspectRatio: !0,
    borderImageOutset: !0,
    borderImageSlice: !0,
    borderImageWidth: !0,
    boxFlex: !0,
    boxFlexGroup: !0,
    boxOrdinalGroup: !0,
    columnCount: !0,
    columns: !0,
    flex: !0,
    flexGrow: !0,
    flexPositive: !0,
    flexShrink: !0,
    flexNegative: !0,
    flexOrder: !0,
    gridArea: !0,
    gridRow: !0,
    gridRowEnd: !0,
    gridRowSpan: !0,
    gridRowStart: !0,
    gridColumn: !0,
    gridColumnEnd: !0,
    gridColumnSpan: !0,
    gridColumnStart: !0,
    fontWeight: !0,
    lineClamp: !0,
    lineHeight: !0,
    opacity: !0,
    order: !0,
    orphans: !0,
    tabSize: !0,
    widows: !0,
    zIndex: !0,
    zoom: !0,
    fillOpacity: !0,
    floodOpacity: !0,
    stopOpacity: !0,
    strokeDasharray: !0,
    strokeDashoffset: !0,
    strokeMiterlimit: !0,
    strokeOpacity: !0,
    strokeWidth: !0,
  },
  cm = ['Webkit', 'ms', 'Moz', 'O'];
Object.keys(Ea).forEach(function (e) {
  cm.forEach(function (t) {
    (t = t + e.charAt(0).toUpperCase() + e.substring(1)), (Ea[t] = Ea[e]);
  });
});
function _6(e, t, n) {
  return t == null || typeof t == 'boolean' || t === ''
    ? ''
    : n || typeof t != 'number' || t === 0 || (Ea.hasOwnProperty(e) && Ea[e])
      ? ('' + t).trim()
      : t + 'px';
}
function O6(e, t) {
  e = e.style;
  for (var n in t)
    if (t.hasOwnProperty(n)) {
      var r = n.indexOf('--') === 0,
        i = _6(n, t[n], r);
      n === 'float' && (n = 'cssFloat'), r ? e.setProperty(n, i) : (e[n] = i);
    }
}
var fm = tt(
  { menuitem: !0 },
  {
    area: !0,
    base: !0,
    br: !0,
    col: !0,
    embed: !0,
    hr: !0,
    img: !0,
    input: !0,
    keygen: !0,
    link: !0,
    meta: !0,
    param: !0,
    source: !0,
    track: !0,
    wbr: !0,
  },
);
function c3(e, t) {
  if (t) {
    if (fm[e] && (t.children != null || t.dangerouslySetInnerHTML != null)) throw Error(U(137, e));
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null) throw Error(U(60));
      if (typeof t.dangerouslySetInnerHTML != 'object' || !('__html' in t.dangerouslySetInnerHTML))
        throw Error(U(61));
    }
    if (t.style != null && typeof t.style != 'object') throw Error(U(62));
  }
}
function f3(e, t) {
  if (e.indexOf('-') === -1) return typeof t.is == 'string';
  switch (e) {
    case 'annotation-xml':
    case 'color-profile':
    case 'font-face':
    case 'font-face-src':
    case 'font-face-uri':
    case 'font-face-format':
    case 'font-face-name':
    case 'missing-glyph':
      return !1;
    default:
      return !0;
  }
}
var d3 = null;
function rf(e) {
  return (
    (e = e.target || e.srcElement || window),
    e.correspondingUseElement && (e = e.correspondingUseElement),
    e.nodeType === 3 ? e.parentNode : e
  );
}
var v3 = null,
  Po = null,
  Mo = null;
function bd(e) {
  if ((e = xl(e))) {
    if (typeof v3 != 'function') throw Error(U(280));
    var t = e.stateNode;
    t && ((t = Eu(t)), v3(e.stateNode, e.type, t));
  }
}
function $6(e) {
  Po ? (Mo ? Mo.push(e) : (Mo = [e])) : (Po = e);
}
function T6() {
  if (Po) {
    var e = Po,
      t = Mo;
    if (((Mo = Po = null), bd(e), t)) for (e = 0; e < t.length; e++) bd(t[e]);
  }
}
function N6(e, t) {
  return e(t);
}
function F6() {}
var vc = !1;
function j6(e, t, n) {
  if (vc) return e(t, n);
  vc = !0;
  try {
    return N6(e, t, n);
  } finally {
    (vc = !1), (Po !== null || Mo !== null) && (F6(), T6());
  }
}
function Va(e, t) {
  var n = e.stateNode;
  if (n === null) return null;
  var r = Eu(n);
  if (r === null) return null;
  n = r[t];
  e: switch (t) {
    case 'onClick':
    case 'onClickCapture':
    case 'onDoubleClick':
    case 'onDoubleClickCapture':
    case 'onMouseDown':
    case 'onMouseDownCapture':
    case 'onMouseMove':
    case 'onMouseMoveCapture':
    case 'onMouseUp':
    case 'onMouseUpCapture':
    case 'onMouseEnter':
      (r = !r.disabled) ||
        ((e = e.type),
        (r = !(e === 'button' || e === 'input' || e === 'select' || e === 'textarea'))),
        (e = !r);
      break e;
    default:
      e = !1;
  }
  if (e) return null;
  if (n && typeof n != 'function') throw Error(U(231, t, typeof n));
  return n;
}
var m3 = !1;
if (Ir)
  try {
    var oa = {};
    Object.defineProperty(oa, 'passive', {
      get: function () {
        m3 = !0;
      },
    }),
      window.addEventListener('test', oa, oa),
      window.removeEventListener('test', oa, oa);
  } catch {
    m3 = !1;
  }
function dm(e, t, n, r, i, o, a, l, s) {
  var u = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(n, u);
  } catch (c) {
    this.onError(c);
  }
}
var ka = !1,
  js = null,
  As = !1,
  p3 = null,
  vm = {
    onError: function (e) {
      (ka = !0), (js = e);
    },
  };
function mm(e, t, n, r, i, o, a, l, s) {
  (ka = !1), (js = null), dm.apply(vm, arguments);
}
function pm(e, t, n, r, i, o, a, l, s) {
  if ((mm.apply(this, arguments), ka)) {
    if (ka) {
      var u = js;
      (ka = !1), (js = null);
    } else throw Error(U(198));
    As || ((As = !0), (p3 = u));
  }
}
function zi(e) {
  var t = e,
    n = e;
  if (e.alternate) for (; t.return; ) t = t.return;
  else {
    e = t;
    do (t = e), t.flags & 4098 && (n = t.return), (e = t.return);
    while (e);
  }
  return t.tag === 3 ? n : null;
}
function A6(e) {
  if (e.tag === 13) {
    var t = e.memoizedState;
    if ((t === null && ((e = e.alternate), e !== null && (t = e.memoizedState)), t !== null))
      return t.dehydrated;
  }
  return null;
}
function Ed(e) {
  if (zi(e) !== e) throw Error(U(188));
}
function hm(e) {
  var t = e.alternate;
  if (!t) {
    if (((t = zi(e)), t === null)) throw Error(U(188));
    return t !== e ? null : e;
  }
  for (var n = e, r = t; ; ) {
    var i = n.return;
    if (i === null) break;
    var o = i.alternate;
    if (o === null) {
      if (((r = i.return), r !== null)) {
        n = r;
        continue;
      }
      break;
    }
    if (i.child === o.child) {
      for (o = i.child; o; ) {
        if (o === n) return Ed(i), e;
        if (o === r) return Ed(i), t;
        o = o.sibling;
      }
      throw Error(U(188));
    }
    if (n.return !== r.return) (n = i), (r = o);
    else {
      for (var a = !1, l = i.child; l; ) {
        if (l === n) {
          (a = !0), (n = i), (r = o);
          break;
        }
        if (l === r) {
          (a = !0), (r = i), (n = o);
          break;
        }
        l = l.sibling;
      }
      if (!a) {
        for (l = o.child; l; ) {
          if (l === n) {
            (a = !0), (n = o), (r = i);
            break;
          }
          if (l === r) {
            (a = !0), (r = o), (n = i);
            break;
          }
          l = l.sibling;
        }
        if (!a) throw Error(U(189));
      }
    }
    if (n.alternate !== r) throw Error(U(190));
  }
  if (n.tag !== 3) throw Error(U(188));
  return n.stateNode.current === n ? e : t;
}
function z6(e) {
  return (e = hm(e)), e !== null ? D6(e) : null;
}
function D6(e) {
  if (e.tag === 5 || e.tag === 6) return e;
  for (e = e.child; e !== null; ) {
    var t = D6(e);
    if (t !== null) return t;
    e = e.sibling;
  }
  return null;
}
var V6 = gn.unstable_scheduleCallback,
  kd = gn.unstable_cancelCallback,
  gm = gn.unstable_shouldYield,
  ym = gn.unstable_requestPaint,
  st = gn.unstable_now,
  Cm = gn.unstable_getCurrentPriorityLevel,
  of = gn.unstable_ImmediatePriority,
  H6 = gn.unstable_UserBlockingPriority,
  zs = gn.unstable_NormalPriority,
  wm = gn.unstable_LowPriority,
  B6 = gn.unstable_IdlePriority,
  wu = null,
  ur = null;
function Sm(e) {
  if (ur && typeof ur.onCommitFiberRoot == 'function')
    try {
      ur.onCommitFiberRoot(wu, e, void 0, (e.current.flags & 128) === 128);
    } catch {}
}
var qn = Math.clz32 ? Math.clz32 : Em,
  xm = Math.log,
  bm = Math.LN2;
function Em(e) {
  return (e >>>= 0), e === 0 ? 32 : (31 - ((xm(e) / bm) | 0)) | 0;
}
var Ul = 64,
  Wl = 4194304;
function Ca(e) {
  switch (e & -e) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 4:
      return 4;
    case 8:
      return 8;
    case 16:
      return 16;
    case 32:
      return 32;
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return e & 4194240;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return e & 130023424;
    case 134217728:
      return 134217728;
    case 268435456:
      return 268435456;
    case 536870912:
      return 536870912;
    case 1073741824:
      return 1073741824;
    default:
      return e;
  }
}
function Ds(e, t) {
  var n = e.pendingLanes;
  if (n === 0) return 0;
  var r = 0,
    i = e.suspendedLanes,
    o = e.pingedLanes,
    a = n & 268435455;
  if (a !== 0) {
    var l = a & ~i;
    l !== 0 ? (r = Ca(l)) : ((o &= a), o !== 0 && (r = Ca(o)));
  } else (a = n & ~i), a !== 0 ? (r = Ca(a)) : o !== 0 && (r = Ca(o));
  if (r === 0) return 0;
  if (
    t !== 0 &&
    t !== r &&
    !(t & i) &&
    ((i = r & -r), (o = t & -t), i >= o || (i === 16 && (o & 4194240) !== 0))
  )
    return t;
  if ((r & 4 && (r |= n & 16), (t = e.entangledLanes), t !== 0))
    for (e = e.entanglements, t &= r; 0 < t; )
      (n = 31 - qn(t)), (i = 1 << n), (r |= e[n]), (t &= ~i);
  return r;
}
function km(e, t) {
  switch (e) {
    case 1:
    case 2:
    case 4:
      return t + 250;
    case 8:
    case 16:
    case 32:
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return t + 5e3;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return -1;
    case 134217728:
    case 268435456:
    case 536870912:
    case 1073741824:
      return -1;
    default:
      return -1;
  }
}
function Pm(e, t) {
  for (
    var n = e.suspendedLanes, r = e.pingedLanes, i = e.expirationTimes, o = e.pendingLanes;
    0 < o;

  ) {
    var a = 31 - qn(o),
      l = 1 << a,
      s = i[a];
    s === -1 ? (!(l & n) || l & r) && (i[a] = km(l, t)) : s <= t && (e.expiredLanes |= l),
      (o &= ~l);
  }
}
function h3(e) {
  return (e = e.pendingLanes & -1073741825), e !== 0 ? e : e & 1073741824 ? 1073741824 : 0;
}
function U6() {
  var e = Ul;
  return (Ul <<= 1), !(Ul & 4194240) && (Ul = 64), e;
}
function mc(e) {
  for (var t = [], n = 0; 31 > n; n++) t.push(e);
  return t;
}
function wl(e, t, n) {
  (e.pendingLanes |= t),
    t !== 536870912 && ((e.suspendedLanes = 0), (e.pingedLanes = 0)),
    (e = e.eventTimes),
    (t = 31 - qn(t)),
    (e[t] = n);
}
function Mm(e, t) {
  var n = e.pendingLanes & ~t;
  (e.pendingLanes = t),
    (e.suspendedLanes = 0),
    (e.pingedLanes = 0),
    (e.expiredLanes &= t),
    (e.mutableReadLanes &= t),
    (e.entangledLanes &= t),
    (t = e.entanglements);
  var r = e.eventTimes;
  for (e = e.expirationTimes; 0 < n; ) {
    var i = 31 - qn(n),
      o = 1 << i;
    (t[i] = 0), (r[i] = -1), (e[i] = -1), (n &= ~o);
  }
}
function af(e, t) {
  var n = (e.entangledLanes |= t);
  for (e = e.entanglements; n; ) {
    var r = 31 - qn(n),
      i = 1 << r;
    (i & t) | (e[r] & t) && (e[r] |= t), (n &= ~i);
  }
}
var Re = 0;
function W6(e) {
  return (e &= -e), 1 < e ? (4 < e ? (e & 268435455 ? 16 : 536870912) : 4) : 1;
}
var K6,
  lf,
  Z6,
  G6,
  q6,
  g3 = !1,
  Kl = [],
  Jr = null,
  ei = null,
  ti = null,
  Ha = new Map(),
  Ba = new Map(),
  Ur = [],
  Rm =
    'mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit'.split(
      ' ',
    );
function Pd(e, t) {
  switch (e) {
    case 'focusin':
    case 'focusout':
      Jr = null;
      break;
    case 'dragenter':
    case 'dragleave':
      ei = null;
      break;
    case 'mouseover':
    case 'mouseout':
      ti = null;
      break;
    case 'pointerover':
    case 'pointerout':
      Ha.delete(t.pointerId);
      break;
    case 'gotpointercapture':
    case 'lostpointercapture':
      Ba.delete(t.pointerId);
  }
}
function aa(e, t, n, r, i, o) {
  return e === null || e.nativeEvent !== o
    ? ((e = {
        blockedOn: t,
        domEventName: n,
        eventSystemFlags: r,
        nativeEvent: o,
        targetContainers: [i],
      }),
      t !== null && ((t = xl(t)), t !== null && lf(t)),
      e)
    : ((e.eventSystemFlags |= r),
      (t = e.targetContainers),
      i !== null && t.indexOf(i) === -1 && t.push(i),
      e);
}
function Lm(e, t, n, r, i) {
  switch (t) {
    case 'focusin':
      return (Jr = aa(Jr, e, t, n, r, i)), !0;
    case 'dragenter':
      return (ei = aa(ei, e, t, n, r, i)), !0;
    case 'mouseover':
      return (ti = aa(ti, e, t, n, r, i)), !0;
    case 'pointerover':
      var o = i.pointerId;
      return Ha.set(o, aa(Ha.get(o) || null, e, t, n, r, i)), !0;
    case 'gotpointercapture':
      return (o = i.pointerId), Ba.set(o, aa(Ba.get(o) || null, e, t, n, r, i)), !0;
  }
  return !1;
}
function Q6(e) {
  var t = ki(e.target);
  if (t !== null) {
    var n = zi(t);
    if (n !== null) {
      if (((t = n.tag), t === 13)) {
        if (((t = A6(n)), t !== null)) {
          (e.blockedOn = t),
            q6(e.priority, function () {
              Z6(n);
            });
          return;
        }
      } else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
        e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
        return;
      }
    }
  }
  e.blockedOn = null;
}
function gs(e) {
  if (e.blockedOn !== null) return !1;
  for (var t = e.targetContainers; 0 < t.length; ) {
    var n = y3(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
    if (n === null) {
      n = e.nativeEvent;
      var r = new n.constructor(n.type, n);
      (d3 = r), n.target.dispatchEvent(r), (d3 = null);
    } else return (t = xl(n)), t !== null && lf(t), (e.blockedOn = n), !1;
    t.shift();
  }
  return !0;
}
function Md(e, t, n) {
  gs(e) && n.delete(t);
}
function Im() {
  (g3 = !1),
    Jr !== null && gs(Jr) && (Jr = null),
    ei !== null && gs(ei) && (ei = null),
    ti !== null && gs(ti) && (ti = null),
    Ha.forEach(Md),
    Ba.forEach(Md);
}
function la(e, t) {
  e.blockedOn === t &&
    ((e.blockedOn = null),
    g3 || ((g3 = !0), gn.unstable_scheduleCallback(gn.unstable_NormalPriority, Im)));
}
function Ua(e) {
  function t(i) {
    return la(i, e);
  }
  if (0 < Kl.length) {
    la(Kl[0], e);
    for (var n = 1; n < Kl.length; n++) {
      var r = Kl[n];
      r.blockedOn === e && (r.blockedOn = null);
    }
  }
  for (
    Jr !== null && la(Jr, e),
      ei !== null && la(ei, e),
      ti !== null && la(ti, e),
      Ha.forEach(t),
      Ba.forEach(t),
      n = 0;
    n < Ur.length;
    n++
  )
    (r = Ur[n]), r.blockedOn === e && (r.blockedOn = null);
  for (; 0 < Ur.length && ((n = Ur[0]), n.blockedOn === null); )
    Q6(n), n.blockedOn === null && Ur.shift();
}
var Ro = Nr.ReactCurrentBatchConfig,
  Vs = !0;
function _m(e, t, n, r) {
  var i = Re,
    o = Ro.transition;
  Ro.transition = null;
  try {
    (Re = 1), sf(e, t, n, r);
  } finally {
    (Re = i), (Ro.transition = o);
  }
}
function Om(e, t, n, r) {
  var i = Re,
    o = Ro.transition;
  Ro.transition = null;
  try {
    (Re = 4), sf(e, t, n, r);
  } finally {
    (Re = i), (Ro.transition = o);
  }
}
function sf(e, t, n, r) {
  if (Vs) {
    var i = y3(e, t, n, r);
    if (i === null) Ec(e, t, r, Hs, n), Pd(e, r);
    else if (Lm(i, e, t, n, r)) r.stopPropagation();
    else if ((Pd(e, r), t & 4 && -1 < Rm.indexOf(e))) {
      for (; i !== null; ) {
        var o = xl(i);
        if ((o !== null && K6(o), (o = y3(e, t, n, r)), o === null && Ec(e, t, r, Hs, n), o === i))
          break;
        i = o;
      }
      i !== null && r.stopPropagation();
    } else Ec(e, t, r, null, n);
  }
}
var Hs = null;
function y3(e, t, n, r) {
  if (((Hs = null), (e = rf(r)), (e = ki(e)), e !== null))
    if (((t = zi(e)), t === null)) e = null;
    else if (((n = t.tag), n === 13)) {
      if (((e = A6(t)), e !== null)) return e;
      e = null;
    } else if (n === 3) {
      if (t.stateNode.current.memoizedState.isDehydrated)
        return t.tag === 3 ? t.stateNode.containerInfo : null;
      e = null;
    } else t !== e && (e = null);
  return (Hs = e), null;
}
function X6(e) {
  switch (e) {
    case 'cancel':
    case 'click':
    case 'close':
    case 'contextmenu':
    case 'copy':
    case 'cut':
    case 'auxclick':
    case 'dblclick':
    case 'dragend':
    case 'dragstart':
    case 'drop':
    case 'focusin':
    case 'focusout':
    case 'input':
    case 'invalid':
    case 'keydown':
    case 'keypress':
    case 'keyup':
    case 'mousedown':
    case 'mouseup':
    case 'paste':
    case 'pause':
    case 'play':
    case 'pointercancel':
    case 'pointerdown':
    case 'pointerup':
    case 'ratechange':
    case 'reset':
    case 'resize':
    case 'seeked':
    case 'submit':
    case 'touchcancel':
    case 'touchend':
    case 'touchstart':
    case 'volumechange':
    case 'change':
    case 'selectionchange':
    case 'textInput':
    case 'compositionstart':
    case 'compositionend':
    case 'compositionupdate':
    case 'beforeblur':
    case 'afterblur':
    case 'beforeinput':
    case 'blur':
    case 'fullscreenchange':
    case 'focus':
    case 'hashchange':
    case 'popstate':
    case 'select':
    case 'selectstart':
      return 1;
    case 'drag':
    case 'dragenter':
    case 'dragexit':
    case 'dragleave':
    case 'dragover':
    case 'mousemove':
    case 'mouseout':
    case 'mouseover':
    case 'pointermove':
    case 'pointerout':
    case 'pointerover':
    case 'scroll':
    case 'toggle':
    case 'touchmove':
    case 'wheel':
    case 'mouseenter':
    case 'mouseleave':
    case 'pointerenter':
    case 'pointerleave':
      return 4;
    case 'message':
      switch (Cm()) {
        case of:
          return 1;
        case H6:
          return 4;
        case zs:
        case wm:
          return 16;
        case B6:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var Kr = null,
  uf = null,
  ys = null;
function Y6() {
  if (ys) return ys;
  var e,
    t = uf,
    n = t.length,
    r,
    i = 'value' in Kr ? Kr.value : Kr.textContent,
    o = i.length;
  for (e = 0; e < n && t[e] === i[e]; e++);
  var a = n - e;
  for (r = 1; r <= a && t[n - r] === i[o - r]; r++);
  return (ys = i.slice(e, 1 < r ? 1 - r : void 0));
}
function Cs(e) {
  var t = e.keyCode;
  return (
    'charCode' in e ? ((e = e.charCode), e === 0 && t === 13 && (e = 13)) : (e = t),
    e === 10 && (e = 13),
    32 <= e || e === 13 ? e : 0
  );
}
function Zl() {
  return !0;
}
function Rd() {
  return !1;
}
function wn(e) {
  function t(n, r, i, o, a) {
    (this._reactName = n),
      (this._targetInst = i),
      (this.type = r),
      (this.nativeEvent = o),
      (this.target = a),
      (this.currentTarget = null);
    for (var l in e) e.hasOwnProperty(l) && ((n = e[l]), (this[l] = n ? n(o) : o[l]));
    return (
      (this.isDefaultPrevented = (
        o.defaultPrevented != null ? o.defaultPrevented : o.returnValue === !1
      )
        ? Zl
        : Rd),
      (this.isPropagationStopped = Rd),
      this
    );
  }
  return (
    tt(t.prototype, {
      preventDefault: function () {
        this.defaultPrevented = !0;
        var n = this.nativeEvent;
        n &&
          (n.preventDefault
            ? n.preventDefault()
            : typeof n.returnValue != 'unknown' && (n.returnValue = !1),
          (this.isDefaultPrevented = Zl));
      },
      stopPropagation: function () {
        var n = this.nativeEvent;
        n &&
          (n.stopPropagation
            ? n.stopPropagation()
            : typeof n.cancelBubble != 'unknown' && (n.cancelBubble = !0),
          (this.isPropagationStopped = Zl));
      },
      persist: function () {},
      isPersistent: Zl,
    }),
    t
  );
}
var Zo = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function (e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0,
  },
  cf = wn(Zo),
  Sl = tt({}, Zo, { view: 0, detail: 0 }),
  $m = wn(Sl),
  pc,
  hc,
  sa,
  Su = tt({}, Sl, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: ff,
    button: 0,
    buttons: 0,
    relatedTarget: function (e) {
      return e.relatedTarget === void 0
        ? e.fromElement === e.srcElement
          ? e.toElement
          : e.fromElement
        : e.relatedTarget;
    },
    movementX: function (e) {
      return 'movementX' in e
        ? e.movementX
        : (e !== sa &&
            (sa && e.type === 'mousemove'
              ? ((pc = e.screenX - sa.screenX), (hc = e.screenY - sa.screenY))
              : (hc = pc = 0),
            (sa = e)),
          pc);
    },
    movementY: function (e) {
      return 'movementY' in e ? e.movementY : hc;
    },
  }),
  Ld = wn(Su),
  Tm = tt({}, Su, { dataTransfer: 0 }),
  Nm = wn(Tm),
  Fm = tt({}, Sl, { relatedTarget: 0 }),
  gc = wn(Fm),
  jm = tt({}, Zo, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
  Am = wn(jm),
  zm = tt({}, Zo, {
    clipboardData: function (e) {
      return 'clipboardData' in e ? e.clipboardData : window.clipboardData;
    },
  }),
  Dm = wn(zm),
  Vm = tt({}, Zo, { data: 0 }),
  Id = wn(Vm),
  Hm = {
    Esc: 'Escape',
    Spacebar: ' ',
    Left: 'ArrowLeft',
    Up: 'ArrowUp',
    Right: 'ArrowRight',
    Down: 'ArrowDown',
    Del: 'Delete',
    Win: 'OS',
    Menu: 'ContextMenu',
    Apps: 'ContextMenu',
    Scroll: 'ScrollLock',
    MozPrintableKey: 'Unidentified',
  },
  Bm = {
    8: 'Backspace',
    9: 'Tab',
    12: 'Clear',
    13: 'Enter',
    16: 'Shift',
    17: 'Control',
    18: 'Alt',
    19: 'Pause',
    20: 'CapsLock',
    27: 'Escape',
    32: ' ',
    33: 'PageUp',
    34: 'PageDown',
    35: 'End',
    36: 'Home',
    37: 'ArrowLeft',
    38: 'ArrowUp',
    39: 'ArrowRight',
    40: 'ArrowDown',
    45: 'Insert',
    46: 'Delete',
    112: 'F1',
    113: 'F2',
    114: 'F3',
    115: 'F4',
    116: 'F5',
    117: 'F6',
    118: 'F7',
    119: 'F8',
    120: 'F9',
    121: 'F10',
    122: 'F11',
    123: 'F12',
    144: 'NumLock',
    145: 'ScrollLock',
    224: 'Meta',
  },
  Um = { Alt: 'altKey', Control: 'ctrlKey', Meta: 'metaKey', Shift: 'shiftKey' };
function Wm(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = Um[e]) ? !!t[e] : !1;
}
function ff() {
  return Wm;
}
var Km = tt({}, Sl, {
    key: function (e) {
      if (e.key) {
        var t = Hm[e.key] || e.key;
        if (t !== 'Unidentified') return t;
      }
      return e.type === 'keypress'
        ? ((e = Cs(e)), e === 13 ? 'Enter' : String.fromCharCode(e))
        : e.type === 'keydown' || e.type === 'keyup'
          ? Bm[e.keyCode] || 'Unidentified'
          : '';
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: ff,
    charCode: function (e) {
      return e.type === 'keypress' ? Cs(e) : 0;
    },
    keyCode: function (e) {
      return e.type === 'keydown' || e.type === 'keyup' ? e.keyCode : 0;
    },
    which: function (e) {
      return e.type === 'keypress'
        ? Cs(e)
        : e.type === 'keydown' || e.type === 'keyup'
          ? e.keyCode
          : 0;
    },
  }),
  Zm = wn(Km),
  Gm = tt({}, Su, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0,
  }),
  _d = wn(Gm),
  qm = tt({}, Sl, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: ff,
  }),
  Qm = wn(qm),
  Xm = tt({}, Zo, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
  Ym = wn(Xm),
  Jm = tt({}, Su, {
    deltaX: function (e) {
      return 'deltaX' in e ? e.deltaX : 'wheelDeltaX' in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function (e) {
      return 'deltaY' in e
        ? e.deltaY
        : 'wheelDeltaY' in e
          ? -e.wheelDeltaY
          : 'wheelDelta' in e
            ? -e.wheelDelta
            : 0;
    },
    deltaZ: 0,
    deltaMode: 0,
  }),
  ep = wn(Jm),
  tp = [9, 13, 27, 32],
  df = Ir && 'CompositionEvent' in window,
  Pa = null;
Ir && 'documentMode' in document && (Pa = document.documentMode);
var np = Ir && 'TextEvent' in window && !Pa,
  J6 = Ir && (!df || (Pa && 8 < Pa && 11 >= Pa)),
  Od = ' ',
  $d = !1;
function e1(e, t) {
  switch (e) {
    case 'keyup':
      return tp.indexOf(t.keyCode) !== -1;
    case 'keydown':
      return t.keyCode !== 229;
    case 'keypress':
    case 'mousedown':
    case 'focusout':
      return !0;
    default:
      return !1;
  }
}
function t1(e) {
  return (e = e.detail), typeof e == 'object' && 'data' in e ? e.data : null;
}
var co = !1;
function rp(e, t) {
  switch (e) {
    case 'compositionend':
      return t1(t);
    case 'keypress':
      return t.which !== 32 ? null : (($d = !0), Od);
    case 'textInput':
      return (e = t.data), e === Od && $d ? null : e;
    default:
      return null;
  }
}
function ip(e, t) {
  if (co)
    return e === 'compositionend' || (!df && e1(e, t))
      ? ((e = Y6()), (ys = uf = Kr = null), (co = !1), e)
      : null;
  switch (e) {
    case 'paste':
      return null;
    case 'keypress':
      if (!(t.ctrlKey || t.altKey || t.metaKey) || (t.ctrlKey && t.altKey)) {
        if (t.char && 1 < t.char.length) return t.char;
        if (t.which) return String.fromCharCode(t.which);
      }
      return null;
    case 'compositionend':
      return J6 && t.locale !== 'ko' ? null : t.data;
    default:
      return null;
  }
}
var op = {
  color: !0,
  date: !0,
  datetime: !0,
  'datetime-local': !0,
  email: !0,
  month: !0,
  number: !0,
  password: !0,
  range: !0,
  search: !0,
  tel: !0,
  text: !0,
  time: !0,
  url: !0,
  week: !0,
};
function Td(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === 'input' ? !!op[e.type] : t === 'textarea';
}
function n1(e, t, n, r) {
  $6(r),
    (t = Bs(t, 'onChange')),
    0 < t.length &&
      ((n = new cf('onChange', 'change', null, n, r)), e.push({ event: n, listeners: t }));
}
var Ma = null,
  Wa = null;
function ap(e) {
  v1(e, 0);
}
function xu(e) {
  var t = mo(e);
  if (P6(t)) return e;
}
function lp(e, t) {
  if (e === 'change') return t;
}
var r1 = !1;
if (Ir) {
  var yc;
  if (Ir) {
    var Cc = 'oninput' in document;
    if (!Cc) {
      var Nd = document.createElement('div');
      Nd.setAttribute('oninput', 'return;'), (Cc = typeof Nd.oninput == 'function');
    }
    yc = Cc;
  } else yc = !1;
  r1 = yc && (!document.documentMode || 9 < document.documentMode);
}
function Fd() {
  Ma && (Ma.detachEvent('onpropertychange', i1), (Wa = Ma = null));
}
function i1(e) {
  if (e.propertyName === 'value' && xu(Wa)) {
    var t = [];
    n1(t, Wa, e, rf(e)), j6(ap, t);
  }
}
function sp(e, t, n) {
  e === 'focusin'
    ? (Fd(), (Ma = t), (Wa = n), Ma.attachEvent('onpropertychange', i1))
    : e === 'focusout' && Fd();
}
function up(e) {
  if (e === 'selectionchange' || e === 'keyup' || e === 'keydown') return xu(Wa);
}
function cp(e, t) {
  if (e === 'click') return xu(t);
}
function fp(e, t) {
  if (e === 'input' || e === 'change') return xu(t);
}
function dp(e, t) {
  return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
}
var Jn = typeof Object.is == 'function' ? Object.is : dp;
function Ka(e, t) {
  if (Jn(e, t)) return !0;
  if (typeof e != 'object' || e === null || typeof t != 'object' || t === null) return !1;
  var n = Object.keys(e),
    r = Object.keys(t);
  if (n.length !== r.length) return !1;
  for (r = 0; r < n.length; r++) {
    var i = n[r];
    if (!e3.call(t, i) || !Jn(e[i], t[i])) return !1;
  }
  return !0;
}
function jd(e) {
  for (; e && e.firstChild; ) e = e.firstChild;
  return e;
}
function Ad(e, t) {
  var n = jd(e);
  e = 0;
  for (var r; n; ) {
    if (n.nodeType === 3) {
      if (((r = e + n.textContent.length), e <= t && r >= t)) return { node: n, offset: t - e };
      e = r;
    }
    e: {
      for (; n; ) {
        if (n.nextSibling) {
          n = n.nextSibling;
          break e;
        }
        n = n.parentNode;
      }
      n = void 0;
    }
    n = jd(n);
  }
}
function o1(e, t) {
  return e && t
    ? e === t
      ? !0
      : e && e.nodeType === 3
        ? !1
        : t && t.nodeType === 3
          ? o1(e, t.parentNode)
          : 'contains' in e
            ? e.contains(t)
            : e.compareDocumentPosition
              ? !!(e.compareDocumentPosition(t) & 16)
              : !1
    : !1;
}
function a1() {
  for (var e = window, t = Fs(); t instanceof e.HTMLIFrameElement; ) {
    try {
      var n = typeof t.contentWindow.location.href == 'string';
    } catch {
      n = !1;
    }
    if (n) e = t.contentWindow;
    else break;
    t = Fs(e.document);
  }
  return t;
}
function vf(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return (
    t &&
    ((t === 'input' &&
      (e.type === 'text' ||
        e.type === 'search' ||
        e.type === 'tel' ||
        e.type === 'url' ||
        e.type === 'password')) ||
      t === 'textarea' ||
      e.contentEditable === 'true')
  );
}
function vp(e) {
  var t = a1(),
    n = e.focusedElem,
    r = e.selectionRange;
  if (t !== n && n && n.ownerDocument && o1(n.ownerDocument.documentElement, n)) {
    if (r !== null && vf(n)) {
      if (((t = r.start), (e = r.end), e === void 0 && (e = t), 'selectionStart' in n))
        (n.selectionStart = t), (n.selectionEnd = Math.min(e, n.value.length));
      else if (
        ((e = ((t = n.ownerDocument || document) && t.defaultView) || window), e.getSelection)
      ) {
        e = e.getSelection();
        var i = n.textContent.length,
          o = Math.min(r.start, i);
        (r = r.end === void 0 ? o : Math.min(r.end, i)),
          !e.extend && o > r && ((i = r), (r = o), (o = i)),
          (i = Ad(n, o));
        var a = Ad(n, r);
        i &&
          a &&
          (e.rangeCount !== 1 ||
            e.anchorNode !== i.node ||
            e.anchorOffset !== i.offset ||
            e.focusNode !== a.node ||
            e.focusOffset !== a.offset) &&
          ((t = t.createRange()),
          t.setStart(i.node, i.offset),
          e.removeAllRanges(),
          o > r
            ? (e.addRange(t), e.extend(a.node, a.offset))
            : (t.setEnd(a.node, a.offset), e.addRange(t)));
      }
    }
    for (t = [], e = n; (e = e.parentNode); )
      e.nodeType === 1 && t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
    for (typeof n.focus == 'function' && n.focus(), n = 0; n < t.length; n++)
      (e = t[n]), (e.element.scrollLeft = e.left), (e.element.scrollTop = e.top);
  }
}
var mp = Ir && 'documentMode' in document && 11 >= document.documentMode,
  fo = null,
  C3 = null,
  Ra = null,
  w3 = !1;
function zd(e, t, n) {
  var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  w3 ||
    fo == null ||
    fo !== Fs(r) ||
    ((r = fo),
    'selectionStart' in r && vf(r)
      ? (r = { start: r.selectionStart, end: r.selectionEnd })
      : ((r = ((r.ownerDocument && r.ownerDocument.defaultView) || window).getSelection()),
        (r = {
          anchorNode: r.anchorNode,
          anchorOffset: r.anchorOffset,
          focusNode: r.focusNode,
          focusOffset: r.focusOffset,
        })),
    (Ra && Ka(Ra, r)) ||
      ((Ra = r),
      (r = Bs(C3, 'onSelect')),
      0 < r.length &&
        ((t = new cf('onSelect', 'select', null, t, n)),
        e.push({ event: t, listeners: r }),
        (t.target = fo))));
}
function Gl(e, t) {
  var n = {};
  return (
    (n[e.toLowerCase()] = t.toLowerCase()),
    (n['Webkit' + e] = 'webkit' + t),
    (n['Moz' + e] = 'moz' + t),
    n
  );
}
var vo = {
    animationend: Gl('Animation', 'AnimationEnd'),
    animationiteration: Gl('Animation', 'AnimationIteration'),
    animationstart: Gl('Animation', 'AnimationStart'),
    transitionend: Gl('Transition', 'TransitionEnd'),
  },
  wc = {},
  l1 = {};
Ir &&
  ((l1 = document.createElement('div').style),
  'AnimationEvent' in window ||
    (delete vo.animationend.animation,
    delete vo.animationiteration.animation,
    delete vo.animationstart.animation),
  'TransitionEvent' in window || delete vo.transitionend.transition);
function bu(e) {
  if (wc[e]) return wc[e];
  if (!vo[e]) return e;
  var t = vo[e],
    n;
  for (n in t) if (t.hasOwnProperty(n) && n in l1) return (wc[e] = t[n]);
  return e;
}
var s1 = bu('animationend'),
  u1 = bu('animationiteration'),
  c1 = bu('animationstart'),
  f1 = bu('transitionend'),
  d1 = new Map(),
  Dd =
    'abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel'.split(
      ' ',
    );
function ci(e, t) {
  d1.set(e, t), Ai(t, [e]);
}
for (var Sc = 0; Sc < Dd.length; Sc++) {
  var xc = Dd[Sc],
    pp = xc.toLowerCase(),
    hp = xc[0].toUpperCase() + xc.slice(1);
  ci(pp, 'on' + hp);
}
ci(s1, 'onAnimationEnd');
ci(u1, 'onAnimationIteration');
ci(c1, 'onAnimationStart');
ci('dblclick', 'onDoubleClick');
ci('focusin', 'onFocus');
ci('focusout', 'onBlur');
ci(f1, 'onTransitionEnd');
Oo('onMouseEnter', ['mouseout', 'mouseover']);
Oo('onMouseLeave', ['mouseout', 'mouseover']);
Oo('onPointerEnter', ['pointerout', 'pointerover']);
Oo('onPointerLeave', ['pointerout', 'pointerover']);
Ai('onChange', 'change click focusin focusout input keydown keyup selectionchange'.split(' '));
Ai(
  'onSelect',
  'focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange'.split(' '),
);
Ai('onBeforeInput', ['compositionend', 'keypress', 'textInput', 'paste']);
Ai('onCompositionEnd', 'compositionend focusout keydown keypress keyup mousedown'.split(' '));
Ai('onCompositionStart', 'compositionstart focusout keydown keypress keyup mousedown'.split(' '));
Ai('onCompositionUpdate', 'compositionupdate focusout keydown keypress keyup mousedown'.split(' '));
var wa =
    'abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting'.split(
      ' ',
    ),
  gp = new Set('cancel close invalid load scroll toggle'.split(' ').concat(wa));
function Vd(e, t, n) {
  var r = e.type || 'unknown-event';
  (e.currentTarget = n), pm(r, t, void 0, e), (e.currentTarget = null);
}
function v1(e, t) {
  t = (t & 4) !== 0;
  for (var n = 0; n < e.length; n++) {
    var r = e[n],
      i = r.event;
    r = r.listeners;
    e: {
      var o = void 0;
      if (t)
        for (var a = r.length - 1; 0 <= a; a--) {
          var l = r[a],
            s = l.instance,
            u = l.currentTarget;
          if (((l = l.listener), s !== o && i.isPropagationStopped())) break e;
          Vd(i, l, u), (o = s);
        }
      else
        for (a = 0; a < r.length; a++) {
          if (
            ((l = r[a]),
            (s = l.instance),
            (u = l.currentTarget),
            (l = l.listener),
            s !== o && i.isPropagationStopped())
          )
            break e;
          Vd(i, l, u), (o = s);
        }
    }
  }
  if (As) throw ((e = p3), (As = !1), (p3 = null), e);
}
function Ve(e, t) {
  var n = t[k3];
  n === void 0 && (n = t[k3] = new Set());
  var r = e + '__bubble';
  n.has(r) || (m1(t, e, 2, !1), n.add(r));
}
function bc(e, t, n) {
  var r = 0;
  t && (r |= 4), m1(n, e, r, t);
}
var ql = '_reactListening' + Math.random().toString(36).slice(2);
function Za(e) {
  if (!e[ql]) {
    (e[ql] = !0),
      S6.forEach(function (n) {
        n !== 'selectionchange' && (gp.has(n) || bc(n, !1, e), bc(n, !0, e));
      });
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[ql] || ((t[ql] = !0), bc('selectionchange', !1, t));
  }
}
function m1(e, t, n, r) {
  switch (X6(t)) {
    case 1:
      var i = _m;
      break;
    case 4:
      i = Om;
      break;
    default:
      i = sf;
  }
  (n = i.bind(null, t, n, e)),
    (i = void 0),
    !m3 || (t !== 'touchstart' && t !== 'touchmove' && t !== 'wheel') || (i = !0),
    r
      ? i !== void 0
        ? e.addEventListener(t, n, { capture: !0, passive: i })
        : e.addEventListener(t, n, !0)
      : i !== void 0
        ? e.addEventListener(t, n, { passive: i })
        : e.addEventListener(t, n, !1);
}
function Ec(e, t, n, r, i) {
  var o = r;
  if (!(t & 1) && !(t & 2) && r !== null)
    e: for (;;) {
      if (r === null) return;
      var a = r.tag;
      if (a === 3 || a === 4) {
        var l = r.stateNode.containerInfo;
        if (l === i || (l.nodeType === 8 && l.parentNode === i)) break;
        if (a === 4)
          for (a = r.return; a !== null; ) {
            var s = a.tag;
            if (
              (s === 3 || s === 4) &&
              ((s = a.stateNode.containerInfo), s === i || (s.nodeType === 8 && s.parentNode === i))
            )
              return;
            a = a.return;
          }
        for (; l !== null; ) {
          if (((a = ki(l)), a === null)) return;
          if (((s = a.tag), s === 5 || s === 6)) {
            r = o = a;
            continue e;
          }
          l = l.parentNode;
        }
      }
      r = r.return;
    }
  j6(function () {
    var u = o,
      c = rf(n),
      f = [];
    e: {
      var v = d1.get(e);
      if (v !== void 0) {
        var y = cf,
          g = e;
        switch (e) {
          case 'keypress':
            if (Cs(n) === 0) break e;
          case 'keydown':
          case 'keyup':
            y = Zm;
            break;
          case 'focusin':
            (g = 'focus'), (y = gc);
            break;
          case 'focusout':
            (g = 'blur'), (y = gc);
            break;
          case 'beforeblur':
          case 'afterblur':
            y = gc;
            break;
          case 'click':
            if (n.button === 2) break e;
          case 'auxclick':
          case 'dblclick':
          case 'mousedown':
          case 'mousemove':
          case 'mouseup':
          case 'mouseout':
          case 'mouseover':
          case 'contextmenu':
            y = Ld;
            break;
          case 'drag':
          case 'dragend':
          case 'dragenter':
          case 'dragexit':
          case 'dragleave':
          case 'dragover':
          case 'dragstart':
          case 'drop':
            y = Nm;
            break;
          case 'touchcancel':
          case 'touchend':
          case 'touchmove':
          case 'touchstart':
            y = Qm;
            break;
          case s1:
          case u1:
          case c1:
            y = Am;
            break;
          case f1:
            y = Ym;
            break;
          case 'scroll':
            y = $m;
            break;
          case 'wheel':
            y = ep;
            break;
          case 'copy':
          case 'cut':
          case 'paste':
            y = Dm;
            break;
          case 'gotpointercapture':
          case 'lostpointercapture':
          case 'pointercancel':
          case 'pointerdown':
          case 'pointermove':
          case 'pointerout':
          case 'pointerover':
          case 'pointerup':
            y = _d;
        }
        var C = (t & 4) !== 0,
          w = !C && e === 'scroll',
          p = C ? (v !== null ? v + 'Capture' : null) : v;
        C = [];
        for (var m = u, h; m !== null; ) {
          h = m;
          var S = h.stateNode;
          if (
            (h.tag === 5 &&
              S !== null &&
              ((h = S), p !== null && ((S = Va(m, p)), S != null && C.push(Ga(m, S, h)))),
            w)
          )
            break;
          m = m.return;
        }
        0 < C.length && ((v = new y(v, g, null, n, c)), f.push({ event: v, listeners: C }));
      }
    }
    if (!(t & 7)) {
      e: {
        if (
          ((v = e === 'mouseover' || e === 'pointerover'),
          (y = e === 'mouseout' || e === 'pointerout'),
          v && n !== d3 && (g = n.relatedTarget || n.fromElement) && (ki(g) || g[_r]))
        )
          break e;
        if (
          (y || v) &&
          ((v =
            c.window === c ? c : (v = c.ownerDocument) ? v.defaultView || v.parentWindow : window),
          y
            ? ((g = n.relatedTarget || n.toElement),
              (y = u),
              (g = g ? ki(g) : null),
              g !== null && ((w = zi(g)), g !== w || (g.tag !== 5 && g.tag !== 6)) && (g = null))
            : ((y = null), (g = u)),
          y !== g)
        ) {
          if (
            ((C = Ld),
            (S = 'onMouseLeave'),
            (p = 'onMouseEnter'),
            (m = 'mouse'),
            (e === 'pointerout' || e === 'pointerover') &&
              ((C = _d), (S = 'onPointerLeave'), (p = 'onPointerEnter'), (m = 'pointer')),
            (w = y == null ? v : mo(y)),
            (h = g == null ? v : mo(g)),
            (v = new C(S, m + 'leave', y, n, c)),
            (v.target = w),
            (v.relatedTarget = h),
            (S = null),
            ki(c) === u &&
              ((C = new C(p, m + 'enter', g, n, c)),
              (C.target = h),
              (C.relatedTarget = w),
              (S = C)),
            (w = S),
            y && g)
          )
            t: {
              for (C = y, p = g, m = 0, h = C; h; h = Xi(h)) m++;
              for (h = 0, S = p; S; S = Xi(S)) h++;
              for (; 0 < m - h; ) (C = Xi(C)), m--;
              for (; 0 < h - m; ) (p = Xi(p)), h--;
              for (; m--; ) {
                if (C === p || (p !== null && C === p.alternate)) break t;
                (C = Xi(C)), (p = Xi(p));
              }
              C = null;
            }
          else C = null;
          y !== null && Hd(f, v, y, C, !1), g !== null && w !== null && Hd(f, w, g, C, !0);
        }
      }
      e: {
        if (
          ((v = u ? mo(u) : window),
          (y = v.nodeName && v.nodeName.toLowerCase()),
          y === 'select' || (y === 'input' && v.type === 'file'))
        )
          var x = lp;
        else if (Td(v))
          if (r1) x = fp;
          else {
            x = up;
            var b = sp;
          }
        else
          (y = v.nodeName) &&
            y.toLowerCase() === 'input' &&
            (v.type === 'checkbox' || v.type === 'radio') &&
            (x = cp);
        if (x && (x = x(e, u))) {
          n1(f, x, n, c);
          break e;
        }
        b && b(e, v, u),
          e === 'focusout' &&
            (b = v._wrapperState) &&
            b.controlled &&
            v.type === 'number' &&
            l3(v, 'number', v.value);
      }
      switch (((b = u ? mo(u) : window), e)) {
        case 'focusin':
          (Td(b) || b.contentEditable === 'true') && ((fo = b), (C3 = u), (Ra = null));
          break;
        case 'focusout':
          Ra = C3 = fo = null;
          break;
        case 'mousedown':
          w3 = !0;
          break;
        case 'contextmenu':
        case 'mouseup':
        case 'dragend':
          (w3 = !1), zd(f, n, c);
          break;
        case 'selectionchange':
          if (mp) break;
        case 'keydown':
        case 'keyup':
          zd(f, n, c);
      }
      var E;
      if (df)
        e: {
          switch (e) {
            case 'compositionstart':
              var P = 'onCompositionStart';
              break e;
            case 'compositionend':
              P = 'onCompositionEnd';
              break e;
            case 'compositionupdate':
              P = 'onCompositionUpdate';
              break e;
          }
          P = void 0;
        }
      else
        co
          ? e1(e, n) && (P = 'onCompositionEnd')
          : e === 'keydown' && n.keyCode === 229 && (P = 'onCompositionStart');
      P &&
        (J6 &&
          n.locale !== 'ko' &&
          (co || P !== 'onCompositionStart'
            ? P === 'onCompositionEnd' && co && (E = Y6())
            : ((Kr = c), (uf = 'value' in Kr ? Kr.value : Kr.textContent), (co = !0))),
        (b = Bs(u, P)),
        0 < b.length &&
          ((P = new Id(P, e, null, n, c)),
          f.push({ event: P, listeners: b }),
          E ? (P.data = E) : ((E = t1(n)), E !== null && (P.data = E)))),
        (E = np ? rp(e, n) : ip(e, n)) &&
          ((u = Bs(u, 'onBeforeInput')),
          0 < u.length &&
            ((c = new Id('onBeforeInput', 'beforeinput', null, n, c)),
            f.push({ event: c, listeners: u }),
            (c.data = E)));
    }
    v1(f, t);
  });
}
function Ga(e, t, n) {
  return { instance: e, listener: t, currentTarget: n };
}
function Bs(e, t) {
  for (var n = t + 'Capture', r = []; e !== null; ) {
    var i = e,
      o = i.stateNode;
    i.tag === 5 &&
      o !== null &&
      ((i = o),
      (o = Va(e, n)),
      o != null && r.unshift(Ga(e, o, i)),
      (o = Va(e, t)),
      o != null && r.push(Ga(e, o, i))),
      (e = e.return);
  }
  return r;
}
function Xi(e) {
  if (e === null) return null;
  do e = e.return;
  while (e && e.tag !== 5);
  return e || null;
}
function Hd(e, t, n, r, i) {
  for (var o = t._reactName, a = []; n !== null && n !== r; ) {
    var l = n,
      s = l.alternate,
      u = l.stateNode;
    if (s !== null && s === r) break;
    l.tag === 5 &&
      u !== null &&
      ((l = u),
      i
        ? ((s = Va(n, o)), s != null && a.unshift(Ga(n, s, l)))
        : i || ((s = Va(n, o)), s != null && a.push(Ga(n, s, l)))),
      (n = n.return);
  }
  a.length !== 0 && e.push({ event: t, listeners: a });
}
var yp = /\r\n?/g,
  Cp = /\u0000|\uFFFD/g;
function Bd(e) {
  return (typeof e == 'string' ? e : '' + e)
    .replace(
      yp,
      `
`,
    )
    .replace(Cp, '');
}
function Ql(e, t, n) {
  if (((t = Bd(t)), Bd(e) !== t && n)) throw Error(U(425));
}
function Us() {}
var S3 = null,
  x3 = null;
function b3(e, t) {
  return (
    e === 'textarea' ||
    e === 'noscript' ||
    typeof t.children == 'string' ||
    typeof t.children == 'number' ||
    (typeof t.dangerouslySetInnerHTML == 'object' &&
      t.dangerouslySetInnerHTML !== null &&
      t.dangerouslySetInnerHTML.__html != null)
  );
}
var E3 = typeof setTimeout == 'function' ? setTimeout : void 0,
  wp = typeof clearTimeout == 'function' ? clearTimeout : void 0,
  Ud = typeof Promise == 'function' ? Promise : void 0,
  Sp =
    typeof queueMicrotask == 'function'
      ? queueMicrotask
      : typeof Ud < 'u'
        ? function (e) {
            return Ud.resolve(null).then(e).catch(xp);
          }
        : E3;
function xp(e) {
  setTimeout(function () {
    throw e;
  });
}
function kc(e, t) {
  var n = t,
    r = 0;
  do {
    var i = n.nextSibling;
    if ((e.removeChild(n), i && i.nodeType === 8))
      if (((n = i.data), n === '/$')) {
        if (r === 0) {
          e.removeChild(i), Ua(t);
          return;
        }
        r--;
      } else (n !== '$' && n !== '$?' && n !== '$!') || r++;
    n = i;
  } while (n);
  Ua(t);
}
function ni(e) {
  for (; e != null; e = e.nextSibling) {
    var t = e.nodeType;
    if (t === 1 || t === 3) break;
    if (t === 8) {
      if (((t = e.data), t === '$' || t === '$!' || t === '$?')) break;
      if (t === '/$') return null;
    }
  }
  return e;
}
function Wd(e) {
  e = e.previousSibling;
  for (var t = 0; e; ) {
    if (e.nodeType === 8) {
      var n = e.data;
      if (n === '$' || n === '$!' || n === '$?') {
        if (t === 0) return e;
        t--;
      } else n === '/$' && t++;
    }
    e = e.previousSibling;
  }
  return null;
}
var Go = Math.random().toString(36).slice(2),
  lr = '__reactFiber$' + Go,
  qa = '__reactProps$' + Go,
  _r = '__reactContainer$' + Go,
  k3 = '__reactEvents$' + Go,
  bp = '__reactListeners$' + Go,
  Ep = '__reactHandles$' + Go;
function ki(e) {
  var t = e[lr];
  if (t) return t;
  for (var n = e.parentNode; n; ) {
    if ((t = n[_r] || n[lr])) {
      if (((n = t.alternate), t.child !== null || (n !== null && n.child !== null)))
        for (e = Wd(e); e !== null; ) {
          if ((n = e[lr])) return n;
          e = Wd(e);
        }
      return t;
    }
    (e = n), (n = e.parentNode);
  }
  return null;
}
function xl(e) {
  return (
    (e = e[lr] || e[_r]),
    !e || (e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3) ? null : e
  );
}
function mo(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(U(33));
}
function Eu(e) {
  return e[qa] || null;
}
var P3 = [],
  po = -1;
function fi(e) {
  return { current: e };
}
function He(e) {
  0 > po || ((e.current = P3[po]), (P3[po] = null), po--);
}
function Ae(e, t) {
  po++, (P3[po] = e.current), (e.current = t);
}
var ui = {},
  Wt = fi(ui),
  ln = fi(!1),
  $i = ui;
function $o(e, t) {
  var n = e.type.contextTypes;
  if (!n) return ui;
  var r = e.stateNode;
  if (r && r.__reactInternalMemoizedUnmaskedChildContext === t)
    return r.__reactInternalMemoizedMaskedChildContext;
  var i = {},
    o;
  for (o in n) i[o] = t[o];
  return (
    r &&
      ((e = e.stateNode),
      (e.__reactInternalMemoizedUnmaskedChildContext = t),
      (e.__reactInternalMemoizedMaskedChildContext = i)),
    i
  );
}
function sn(e) {
  return (e = e.childContextTypes), e != null;
}
function Ws() {
  He(ln), He(Wt);
}
function Kd(e, t, n) {
  if (Wt.current !== ui) throw Error(U(168));
  Ae(Wt, t), Ae(ln, n);
}
function p1(e, t, n) {
  var r = e.stateNode;
  if (((t = t.childContextTypes), typeof r.getChildContext != 'function')) return n;
  r = r.getChildContext();
  for (var i in r) if (!(i in t)) throw Error(U(108, sm(e) || 'Unknown', i));
  return tt({}, n, r);
}
function Ks(e) {
  return (
    (e = ((e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext) || ui),
    ($i = Wt.current),
    Ae(Wt, e),
    Ae(ln, ln.current),
    !0
  );
}
function Zd(e, t, n) {
  var r = e.stateNode;
  if (!r) throw Error(U(169));
  n
    ? ((e = p1(e, t, $i)),
      (r.__reactInternalMemoizedMergedChildContext = e),
      He(ln),
      He(Wt),
      Ae(Wt, e))
    : He(ln),
    Ae(ln, n);
}
var br = null,
  ku = !1,
  Pc = !1;
function h1(e) {
  br === null ? (br = [e]) : br.push(e);
}
function kp(e) {
  (ku = !0), h1(e);
}
function di() {
  if (!Pc && br !== null) {
    Pc = !0;
    var e = 0,
      t = Re;
    try {
      var n = br;
      for (Re = 1; e < n.length; e++) {
        var r = n[e];
        do r = r(!0);
        while (r !== null);
      }
      (br = null), (ku = !1);
    } catch (i) {
      throw (br !== null && (br = br.slice(e + 1)), V6(of, di), i);
    } finally {
      (Re = t), (Pc = !1);
    }
  }
  return null;
}
var ho = [],
  go = 0,
  Zs = null,
  Gs = 0,
  On = [],
  $n = 0,
  Ti = null,
  Er = 1,
  kr = '';
function xi(e, t) {
  (ho[go++] = Gs), (ho[go++] = Zs), (Zs = e), (Gs = t);
}
function g1(e, t, n) {
  (On[$n++] = Er), (On[$n++] = kr), (On[$n++] = Ti), (Ti = e);
  var r = Er;
  e = kr;
  var i = 32 - qn(r) - 1;
  (r &= ~(1 << i)), (n += 1);
  var o = 32 - qn(t) + i;
  if (30 < o) {
    var a = i - (i % 5);
    (o = (r & ((1 << a) - 1)).toString(32)),
      (r >>= a),
      (i -= a),
      (Er = (1 << (32 - qn(t) + i)) | (n << i) | r),
      (kr = o + e);
  } else (Er = (1 << o) | (n << i) | r), (kr = e);
}
function mf(e) {
  e.return !== null && (xi(e, 1), g1(e, 1, 0));
}
function pf(e) {
  for (; e === Zs; ) (Zs = ho[--go]), (ho[go] = null), (Gs = ho[--go]), (ho[go] = null);
  for (; e === Ti; )
    (Ti = On[--$n]),
      (On[$n] = null),
      (kr = On[--$n]),
      (On[$n] = null),
      (Er = On[--$n]),
      (On[$n] = null);
}
var hn = null,
  mn = null,
  qe = !1,
  Gn = null;
function y1(e, t) {
  var n = Tn(5, null, null, 0);
  (n.elementType = 'DELETED'),
    (n.stateNode = t),
    (n.return = e),
    (t = e.deletions),
    t === null ? ((e.deletions = [n]), (e.flags |= 16)) : t.push(n);
}
function Gd(e, t) {
  switch (e.tag) {
    case 5:
      var n = e.type;
      return (
        (t = t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase() ? null : t),
        t !== null ? ((e.stateNode = t), (hn = e), (mn = ni(t.firstChild)), !0) : !1
      );
    case 6:
      return (
        (t = e.pendingProps === '' || t.nodeType !== 3 ? null : t),
        t !== null ? ((e.stateNode = t), (hn = e), (mn = null), !0) : !1
      );
    case 13:
      return (
        (t = t.nodeType !== 8 ? null : t),
        t !== null
          ? ((n = Ti !== null ? { id: Er, overflow: kr } : null),
            (e.memoizedState = { dehydrated: t, treeContext: n, retryLane: 1073741824 }),
            (n = Tn(18, null, null, 0)),
            (n.stateNode = t),
            (n.return = e),
            (e.child = n),
            (hn = e),
            (mn = null),
            !0)
          : !1
      );
    default:
      return !1;
  }
}
function M3(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function R3(e) {
  if (qe) {
    var t = mn;
    if (t) {
      var n = t;
      if (!Gd(e, t)) {
        if (M3(e)) throw Error(U(418));
        t = ni(n.nextSibling);
        var r = hn;
        t && Gd(e, t) ? y1(r, n) : ((e.flags = (e.flags & -4097) | 2), (qe = !1), (hn = e));
      }
    } else {
      if (M3(e)) throw Error(U(418));
      (e.flags = (e.flags & -4097) | 2), (qe = !1), (hn = e);
    }
  }
}
function qd(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; ) e = e.return;
  hn = e;
}
function Xl(e) {
  if (e !== hn) return !1;
  if (!qe) return qd(e), (qe = !0), !1;
  var t;
  if (
    ((t = e.tag !== 3) &&
      !(t = e.tag !== 5) &&
      ((t = e.type), (t = t !== 'head' && t !== 'body' && !b3(e.type, e.memoizedProps))),
    t && (t = mn))
  ) {
    if (M3(e)) throw (C1(), Error(U(418)));
    for (; t; ) y1(e, t), (t = ni(t.nextSibling));
  }
  if ((qd(e), e.tag === 13)) {
    if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e)) throw Error(U(317));
    e: {
      for (e = e.nextSibling, t = 0; e; ) {
        if (e.nodeType === 8) {
          var n = e.data;
          if (n === '/$') {
            if (t === 0) {
              mn = ni(e.nextSibling);
              break e;
            }
            t--;
          } else (n !== '$' && n !== '$!' && n !== '$?') || t++;
        }
        e = e.nextSibling;
      }
      mn = null;
    }
  } else mn = hn ? ni(e.stateNode.nextSibling) : null;
  return !0;
}
function C1() {
  for (var e = mn; e; ) e = ni(e.nextSibling);
}
function To() {
  (mn = hn = null), (qe = !1);
}
function hf(e) {
  Gn === null ? (Gn = [e]) : Gn.push(e);
}
var Pp = Nr.ReactCurrentBatchConfig;
function ua(e, t, n) {
  if (((e = n.ref), e !== null && typeof e != 'function' && typeof e != 'object')) {
    if (n._owner) {
      if (((n = n._owner), n)) {
        if (n.tag !== 1) throw Error(U(309));
        var r = n.stateNode;
      }
      if (!r) throw Error(U(147, e));
      var i = r,
        o = '' + e;
      return t !== null && t.ref !== null && typeof t.ref == 'function' && t.ref._stringRef === o
        ? t.ref
        : ((t = function (a) {
            var l = i.refs;
            a === null ? delete l[o] : (l[o] = a);
          }),
          (t._stringRef = o),
          t);
    }
    if (typeof e != 'string') throw Error(U(284));
    if (!n._owner) throw Error(U(290, e));
  }
  return e;
}
function Yl(e, t) {
  throw (
    ((e = Object.prototype.toString.call(t)),
    Error(
      U(31, e === '[object Object]' ? 'object with keys {' + Object.keys(t).join(', ') + '}' : e),
    ))
  );
}
function Qd(e) {
  var t = e._init;
  return t(e._payload);
}
function w1(e) {
  function t(p, m) {
    if (e) {
      var h = p.deletions;
      h === null ? ((p.deletions = [m]), (p.flags |= 16)) : h.push(m);
    }
  }
  function n(p, m) {
    if (!e) return null;
    for (; m !== null; ) t(p, m), (m = m.sibling);
    return null;
  }
  function r(p, m) {
    for (p = new Map(); m !== null; )
      m.key !== null ? p.set(m.key, m) : p.set(m.index, m), (m = m.sibling);
    return p;
  }
  function i(p, m) {
    return (p = ai(p, m)), (p.index = 0), (p.sibling = null), p;
  }
  function o(p, m, h) {
    return (
      (p.index = h),
      e
        ? ((h = p.alternate),
          h !== null ? ((h = h.index), h < m ? ((p.flags |= 2), m) : h) : ((p.flags |= 2), m))
        : ((p.flags |= 1048576), m)
    );
  }
  function a(p) {
    return e && p.alternate === null && (p.flags |= 2), p;
  }
  function l(p, m, h, S) {
    return m === null || m.tag !== 6
      ? ((m = $c(h, p.mode, S)), (m.return = p), m)
      : ((m = i(m, h)), (m.return = p), m);
  }
  function s(p, m, h, S) {
    var x = h.type;
    return x === uo
      ? c(p, m, h.props.children, S, h.key)
      : m !== null &&
          (m.elementType === x ||
            (typeof x == 'object' && x !== null && x.$$typeof === Hr && Qd(x) === m.type))
        ? ((S = i(m, h.props)), (S.ref = ua(p, m, h)), (S.return = p), S)
        : ((S = Ps(h.type, h.key, h.props, null, p.mode, S)),
          (S.ref = ua(p, m, h)),
          (S.return = p),
          S);
  }
  function u(p, m, h, S) {
    return m === null ||
      m.tag !== 4 ||
      m.stateNode.containerInfo !== h.containerInfo ||
      m.stateNode.implementation !== h.implementation
      ? ((m = Tc(h, p.mode, S)), (m.return = p), m)
      : ((m = i(m, h.children || [])), (m.return = p), m);
  }
  function c(p, m, h, S, x) {
    return m === null || m.tag !== 7
      ? ((m = _i(h, p.mode, S, x)), (m.return = p), m)
      : ((m = i(m, h)), (m.return = p), m);
  }
  function f(p, m, h) {
    if ((typeof m == 'string' && m !== '') || typeof m == 'number')
      return (m = $c('' + m, p.mode, h)), (m.return = p), m;
    if (typeof m == 'object' && m !== null) {
      switch (m.$$typeof) {
        case Vl:
          return (
            (h = Ps(m.type, m.key, m.props, null, p.mode, h)),
            (h.ref = ua(p, null, m)),
            (h.return = p),
            h
          );
        case so:
          return (m = Tc(m, p.mode, h)), (m.return = p), m;
        case Hr:
          var S = m._init;
          return f(p, S(m._payload), h);
      }
      if (ya(m) || ia(m)) return (m = _i(m, p.mode, h, null)), (m.return = p), m;
      Yl(p, m);
    }
    return null;
  }
  function v(p, m, h, S) {
    var x = m !== null ? m.key : null;
    if ((typeof h == 'string' && h !== '') || typeof h == 'number')
      return x !== null ? null : l(p, m, '' + h, S);
    if (typeof h == 'object' && h !== null) {
      switch (h.$$typeof) {
        case Vl:
          return h.key === x ? s(p, m, h, S) : null;
        case so:
          return h.key === x ? u(p, m, h, S) : null;
        case Hr:
          return (x = h._init), v(p, m, x(h._payload), S);
      }
      if (ya(h) || ia(h)) return x !== null ? null : c(p, m, h, S, null);
      Yl(p, h);
    }
    return null;
  }
  function y(p, m, h, S, x) {
    if ((typeof S == 'string' && S !== '') || typeof S == 'number')
      return (p = p.get(h) || null), l(m, p, '' + S, x);
    if (typeof S == 'object' && S !== null) {
      switch (S.$$typeof) {
        case Vl:
          return (p = p.get(S.key === null ? h : S.key) || null), s(m, p, S, x);
        case so:
          return (p = p.get(S.key === null ? h : S.key) || null), u(m, p, S, x);
        case Hr:
          var b = S._init;
          return y(p, m, h, b(S._payload), x);
      }
      if (ya(S) || ia(S)) return (p = p.get(h) || null), c(m, p, S, x, null);
      Yl(m, S);
    }
    return null;
  }
  function g(p, m, h, S) {
    for (var x = null, b = null, E = m, P = (m = 0), M = null; E !== null && P < h.length; P++) {
      E.index > P ? ((M = E), (E = null)) : (M = E.sibling);
      var I = v(p, E, h[P], S);
      if (I === null) {
        E === null && (E = M);
        break;
      }
      e && E && I.alternate === null && t(p, E),
        (m = o(I, m, P)),
        b === null ? (x = I) : (b.sibling = I),
        (b = I),
        (E = M);
    }
    if (P === h.length) return n(p, E), qe && xi(p, P), x;
    if (E === null) {
      for (; P < h.length; P++)
        (E = f(p, h[P], S)),
          E !== null && ((m = o(E, m, P)), b === null ? (x = E) : (b.sibling = E), (b = E));
      return qe && xi(p, P), x;
    }
    for (E = r(p, E); P < h.length; P++)
      (M = y(E, p, P, h[P], S)),
        M !== null &&
          (e && M.alternate !== null && E.delete(M.key === null ? P : M.key),
          (m = o(M, m, P)),
          b === null ? (x = M) : (b.sibling = M),
          (b = M));
    return (
      e &&
        E.forEach(function (F) {
          return t(p, F);
        }),
      qe && xi(p, P),
      x
    );
  }
  function C(p, m, h, S) {
    var x = ia(h);
    if (typeof x != 'function') throw Error(U(150));
    if (((h = x.call(h)), h == null)) throw Error(U(151));
    for (
      var b = (x = null), E = m, P = (m = 0), M = null, I = h.next();
      E !== null && !I.done;
      P++, I = h.next()
    ) {
      E.index > P ? ((M = E), (E = null)) : (M = E.sibling);
      var F = v(p, E, I.value, S);
      if (F === null) {
        E === null && (E = M);
        break;
      }
      e && E && F.alternate === null && t(p, E),
        (m = o(F, m, P)),
        b === null ? (x = F) : (b.sibling = F),
        (b = F),
        (E = M);
    }
    if (I.done) return n(p, E), qe && xi(p, P), x;
    if (E === null) {
      for (; !I.done; P++, I = h.next())
        (I = f(p, I.value, S)),
          I !== null && ((m = o(I, m, P)), b === null ? (x = I) : (b.sibling = I), (b = I));
      return qe && xi(p, P), x;
    }
    for (E = r(p, E); !I.done; P++, I = h.next())
      (I = y(E, p, P, I.value, S)),
        I !== null &&
          (e && I.alternate !== null && E.delete(I.key === null ? P : I.key),
          (m = o(I, m, P)),
          b === null ? (x = I) : (b.sibling = I),
          (b = I));
    return (
      e &&
        E.forEach(function (z) {
          return t(p, z);
        }),
      qe && xi(p, P),
      x
    );
  }
  function w(p, m, h, S) {
    if (
      (typeof h == 'object' &&
        h !== null &&
        h.type === uo &&
        h.key === null &&
        (h = h.props.children),
      typeof h == 'object' && h !== null)
    ) {
      switch (h.$$typeof) {
        case Vl:
          e: {
            for (var x = h.key, b = m; b !== null; ) {
              if (b.key === x) {
                if (((x = h.type), x === uo)) {
                  if (b.tag === 7) {
                    n(p, b.sibling), (m = i(b, h.props.children)), (m.return = p), (p = m);
                    break e;
                  }
                } else if (
                  b.elementType === x ||
                  (typeof x == 'object' && x !== null && x.$$typeof === Hr && Qd(x) === b.type)
                ) {
                  n(p, b.sibling),
                    (m = i(b, h.props)),
                    (m.ref = ua(p, b, h)),
                    (m.return = p),
                    (p = m);
                  break e;
                }
                n(p, b);
                break;
              } else t(p, b);
              b = b.sibling;
            }
            h.type === uo
              ? ((m = _i(h.props.children, p.mode, S, h.key)), (m.return = p), (p = m))
              : ((S = Ps(h.type, h.key, h.props, null, p.mode, S)),
                (S.ref = ua(p, m, h)),
                (S.return = p),
                (p = S));
          }
          return a(p);
        case so:
          e: {
            for (b = h.key; m !== null; ) {
              if (m.key === b)
                if (
                  m.tag === 4 &&
                  m.stateNode.containerInfo === h.containerInfo &&
                  m.stateNode.implementation === h.implementation
                ) {
                  n(p, m.sibling), (m = i(m, h.children || [])), (m.return = p), (p = m);
                  break e;
                } else {
                  n(p, m);
                  break;
                }
              else t(p, m);
              m = m.sibling;
            }
            (m = Tc(h, p.mode, S)), (m.return = p), (p = m);
          }
          return a(p);
        case Hr:
          return (b = h._init), w(p, m, b(h._payload), S);
      }
      if (ya(h)) return g(p, m, h, S);
      if (ia(h)) return C(p, m, h, S);
      Yl(p, h);
    }
    return (typeof h == 'string' && h !== '') || typeof h == 'number'
      ? ((h = '' + h),
        m !== null && m.tag === 6
          ? (n(p, m.sibling), (m = i(m, h)), (m.return = p), (p = m))
          : (n(p, m), (m = $c(h, p.mode, S)), (m.return = p), (p = m)),
        a(p))
      : n(p, m);
  }
  return w;
}
var No = w1(!0),
  S1 = w1(!1),
  qs = fi(null),
  Qs = null,
  yo = null,
  gf = null;
function yf() {
  gf = yo = Qs = null;
}
function Cf(e) {
  var t = qs.current;
  He(qs), (e._currentValue = t);
}
function L3(e, t, n) {
  for (; e !== null; ) {
    var r = e.alternate;
    if (
      ((e.childLanes & t) !== t
        ? ((e.childLanes |= t), r !== null && (r.childLanes |= t))
        : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t),
      e === n)
    )
      break;
    e = e.return;
  }
}
function Lo(e, t) {
  (Qs = e),
    (gf = yo = null),
    (e = e.dependencies),
    e !== null && e.firstContext !== null && (e.lanes & t && (an = !0), (e.firstContext = null));
}
function Fn(e) {
  var t = e._currentValue;
  if (gf !== e)
    if (((e = { context: e, memoizedValue: t, next: null }), yo === null)) {
      if (Qs === null) throw Error(U(308));
      (yo = e), (Qs.dependencies = { lanes: 0, firstContext: e });
    } else yo = yo.next = e;
  return t;
}
var Pi = null;
function wf(e) {
  Pi === null ? (Pi = [e]) : Pi.push(e);
}
function x1(e, t, n, r) {
  var i = t.interleaved;
  return (
    i === null ? ((n.next = n), wf(t)) : ((n.next = i.next), (i.next = n)),
    (t.interleaved = n),
    Or(e, r)
  );
}
function Or(e, t) {
  e.lanes |= t;
  var n = e.alternate;
  for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; )
    (e.childLanes |= t),
      (n = e.alternate),
      n !== null && (n.childLanes |= t),
      (n = e),
      (e = e.return);
  return n.tag === 3 ? n.stateNode : null;
}
var Br = !1;
function Sf(e) {
  e.updateQueue = {
    baseState: e.memoizedState,
    firstBaseUpdate: null,
    lastBaseUpdate: null,
    shared: { pending: null, interleaved: null, lanes: 0 },
    effects: null,
  };
}
function b1(e, t) {
  (e = e.updateQueue),
    t.updateQueue === e &&
      (t.updateQueue = {
        baseState: e.baseState,
        firstBaseUpdate: e.firstBaseUpdate,
        lastBaseUpdate: e.lastBaseUpdate,
        shared: e.shared,
        effects: e.effects,
      });
}
function Pr(e, t) {
  return { eventTime: e, lane: t, tag: 0, payload: null, callback: null, next: null };
}
function ri(e, t, n) {
  var r = e.updateQueue;
  if (r === null) return null;
  if (((r = r.shared), Se & 2)) {
    var i = r.pending;
    return i === null ? (t.next = t) : ((t.next = i.next), (i.next = t)), (r.pending = t), Or(e, n);
  }
  return (
    (i = r.interleaved),
    i === null ? ((t.next = t), wf(r)) : ((t.next = i.next), (i.next = t)),
    (r.interleaved = t),
    Or(e, n)
  );
}
function ws(e, t, n) {
  if (((t = t.updateQueue), t !== null && ((t = t.shared), (n & 4194240) !== 0))) {
    var r = t.lanes;
    (r &= e.pendingLanes), (n |= r), (t.lanes = n), af(e, n);
  }
}
function Xd(e, t) {
  var n = e.updateQueue,
    r = e.alternate;
  if (r !== null && ((r = r.updateQueue), n === r)) {
    var i = null,
      o = null;
    if (((n = n.firstBaseUpdate), n !== null)) {
      do {
        var a = {
          eventTime: n.eventTime,
          lane: n.lane,
          tag: n.tag,
          payload: n.payload,
          callback: n.callback,
          next: null,
        };
        o === null ? (i = o = a) : (o = o.next = a), (n = n.next);
      } while (n !== null);
      o === null ? (i = o = t) : (o = o.next = t);
    } else i = o = t;
    (n = {
      baseState: r.baseState,
      firstBaseUpdate: i,
      lastBaseUpdate: o,
      shared: r.shared,
      effects: r.effects,
    }),
      (e.updateQueue = n);
    return;
  }
  (e = n.lastBaseUpdate),
    e === null ? (n.firstBaseUpdate = t) : (e.next = t),
    (n.lastBaseUpdate = t);
}
function Xs(e, t, n, r) {
  var i = e.updateQueue;
  Br = !1;
  var o = i.firstBaseUpdate,
    a = i.lastBaseUpdate,
    l = i.shared.pending;
  if (l !== null) {
    i.shared.pending = null;
    var s = l,
      u = s.next;
    (s.next = null), a === null ? (o = u) : (a.next = u), (a = s);
    var c = e.alternate;
    c !== null &&
      ((c = c.updateQueue),
      (l = c.lastBaseUpdate),
      l !== a && (l === null ? (c.firstBaseUpdate = u) : (l.next = u), (c.lastBaseUpdate = s)));
  }
  if (o !== null) {
    var f = i.baseState;
    (a = 0), (c = u = s = null), (l = o);
    do {
      var v = l.lane,
        y = l.eventTime;
      if ((r & v) === v) {
        c !== null &&
          (c = c.next =
            {
              eventTime: y,
              lane: 0,
              tag: l.tag,
              payload: l.payload,
              callback: l.callback,
              next: null,
            });
        e: {
          var g = e,
            C = l;
          switch (((v = t), (y = n), C.tag)) {
            case 1:
              if (((g = C.payload), typeof g == 'function')) {
                f = g.call(y, f, v);
                break e;
              }
              f = g;
              break e;
            case 3:
              g.flags = (g.flags & -65537) | 128;
            case 0:
              if (((g = C.payload), (v = typeof g == 'function' ? g.call(y, f, v) : g), v == null))
                break e;
              f = tt({}, f, v);
              break e;
            case 2:
              Br = !0;
          }
        }
        l.callback !== null &&
          l.lane !== 0 &&
          ((e.flags |= 64), (v = i.effects), v === null ? (i.effects = [l]) : v.push(l));
      } else
        (y = {
          eventTime: y,
          lane: v,
          tag: l.tag,
          payload: l.payload,
          callback: l.callback,
          next: null,
        }),
          c === null ? ((u = c = y), (s = f)) : (c = c.next = y),
          (a |= v);
      if (((l = l.next), l === null)) {
        if (((l = i.shared.pending), l === null)) break;
        (v = l), (l = v.next), (v.next = null), (i.lastBaseUpdate = v), (i.shared.pending = null);
      }
    } while (!0);
    if (
      (c === null && (s = f),
      (i.baseState = s),
      (i.firstBaseUpdate = u),
      (i.lastBaseUpdate = c),
      (t = i.shared.interleaved),
      t !== null)
    ) {
      i = t;
      do (a |= i.lane), (i = i.next);
      while (i !== t);
    } else o === null && (i.shared.lanes = 0);
    (Fi |= a), (e.lanes = a), (e.memoizedState = f);
  }
}
function Yd(e, t, n) {
  if (((e = t.effects), (t.effects = null), e !== null))
    for (t = 0; t < e.length; t++) {
      var r = e[t],
        i = r.callback;
      if (i !== null) {
        if (((r.callback = null), (r = n), typeof i != 'function')) throw Error(U(191, i));
        i.call(r);
      }
    }
}
var bl = {},
  cr = fi(bl),
  Qa = fi(bl),
  Xa = fi(bl);
function Mi(e) {
  if (e === bl) throw Error(U(174));
  return e;
}
function xf(e, t) {
  switch ((Ae(Xa, t), Ae(Qa, e), Ae(cr, bl), (e = t.nodeType), e)) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : u3(null, '');
      break;
    default:
      (e = e === 8 ? t.parentNode : t),
        (t = e.namespaceURI || null),
        (e = e.tagName),
        (t = u3(t, e));
  }
  He(cr), Ae(cr, t);
}
function Fo() {
  He(cr), He(Qa), He(Xa);
}
function E1(e) {
  Mi(Xa.current);
  var t = Mi(cr.current),
    n = u3(t, e.type);
  t !== n && (Ae(Qa, e), Ae(cr, n));
}
function bf(e) {
  Qa.current === e && (He(cr), He(Qa));
}
var Je = fi(0);
function Ys(e) {
  for (var t = e; t !== null; ) {
    if (t.tag === 13) {
      var n = t.memoizedState;
      if (n !== null && ((n = n.dehydrated), n === null || n.data === '$?' || n.data === '$!'))
        return t;
    } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
      if (t.flags & 128) return t;
    } else if (t.child !== null) {
      (t.child.return = t), (t = t.child);
      continue;
    }
    if (t === e) break;
    for (; t.sibling === null; ) {
      if (t.return === null || t.return === e) return null;
      t = t.return;
    }
    (t.sibling.return = t.return), (t = t.sibling);
  }
  return null;
}
var Mc = [];
function Ef() {
  for (var e = 0; e < Mc.length; e++) Mc[e]._workInProgressVersionPrimary = null;
  Mc.length = 0;
}
var Ss = Nr.ReactCurrentDispatcher,
  Rc = Nr.ReactCurrentBatchConfig,
  Ni = 0,
  et = null,
  Ct = null,
  kt = null,
  Js = !1,
  La = !1,
  Ya = 0,
  Mp = 0;
function zt() {
  throw Error(U(321));
}
function kf(e, t) {
  if (t === null) return !1;
  for (var n = 0; n < t.length && n < e.length; n++) if (!Jn(e[n], t[n])) return !1;
  return !0;
}
function Pf(e, t, n, r, i, o) {
  if (
    ((Ni = o),
    (et = t),
    (t.memoizedState = null),
    (t.updateQueue = null),
    (t.lanes = 0),
    (Ss.current = e === null || e.memoizedState === null ? _p : Op),
    (e = n(r, i)),
    La)
  ) {
    o = 0;
    do {
      if (((La = !1), (Ya = 0), 25 <= o)) throw Error(U(301));
      (o += 1), (kt = Ct = null), (t.updateQueue = null), (Ss.current = $p), (e = n(r, i));
    } while (La);
  }
  if (
    ((Ss.current = eu),
    (t = Ct !== null && Ct.next !== null),
    (Ni = 0),
    (kt = Ct = et = null),
    (Js = !1),
    t)
  )
    throw Error(U(300));
  return e;
}
function Mf() {
  var e = Ya !== 0;
  return (Ya = 0), e;
}
function or() {
  var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
  return kt === null ? (et.memoizedState = kt = e) : (kt = kt.next = e), kt;
}
function jn() {
  if (Ct === null) {
    var e = et.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = Ct.next;
  var t = kt === null ? et.memoizedState : kt.next;
  if (t !== null) (kt = t), (Ct = e);
  else {
    if (e === null) throw Error(U(310));
    (Ct = e),
      (e = {
        memoizedState: Ct.memoizedState,
        baseState: Ct.baseState,
        baseQueue: Ct.baseQueue,
        queue: Ct.queue,
        next: null,
      }),
      kt === null ? (et.memoizedState = kt = e) : (kt = kt.next = e);
  }
  return kt;
}
function Ja(e, t) {
  return typeof t == 'function' ? t(e) : t;
}
function Lc(e) {
  var t = jn(),
    n = t.queue;
  if (n === null) throw Error(U(311));
  n.lastRenderedReducer = e;
  var r = Ct,
    i = r.baseQueue,
    o = n.pending;
  if (o !== null) {
    if (i !== null) {
      var a = i.next;
      (i.next = o.next), (o.next = a);
    }
    (r.baseQueue = i = o), (n.pending = null);
  }
  if (i !== null) {
    (o = i.next), (r = r.baseState);
    var l = (a = null),
      s = null,
      u = o;
    do {
      var c = u.lane;
      if ((Ni & c) === c)
        s !== null &&
          (s = s.next =
            {
              lane: 0,
              action: u.action,
              hasEagerState: u.hasEagerState,
              eagerState: u.eagerState,
              next: null,
            }),
          (r = u.hasEagerState ? u.eagerState : e(r, u.action));
      else {
        var f = {
          lane: c,
          action: u.action,
          hasEagerState: u.hasEagerState,
          eagerState: u.eagerState,
          next: null,
        };
        s === null ? ((l = s = f), (a = r)) : (s = s.next = f), (et.lanes |= c), (Fi |= c);
      }
      u = u.next;
    } while (u !== null && u !== o);
    s === null ? (a = r) : (s.next = l),
      Jn(r, t.memoizedState) || (an = !0),
      (t.memoizedState = r),
      (t.baseState = a),
      (t.baseQueue = s),
      (n.lastRenderedState = r);
  }
  if (((e = n.interleaved), e !== null)) {
    i = e;
    do (o = i.lane), (et.lanes |= o), (Fi |= o), (i = i.next);
    while (i !== e);
  } else i === null && (n.lanes = 0);
  return [t.memoizedState, n.dispatch];
}
function Ic(e) {
  var t = jn(),
    n = t.queue;
  if (n === null) throw Error(U(311));
  n.lastRenderedReducer = e;
  var r = n.dispatch,
    i = n.pending,
    o = t.memoizedState;
  if (i !== null) {
    n.pending = null;
    var a = (i = i.next);
    do (o = e(o, a.action)), (a = a.next);
    while (a !== i);
    Jn(o, t.memoizedState) || (an = !0),
      (t.memoizedState = o),
      t.baseQueue === null && (t.baseState = o),
      (n.lastRenderedState = o);
  }
  return [o, r];
}
function k1() {}
function P1(e, t) {
  var n = et,
    r = jn(),
    i = t(),
    o = !Jn(r.memoizedState, i);
  if (
    (o && ((r.memoizedState = i), (an = !0)),
    (r = r.queue),
    Rf(L1.bind(null, n, r, e), [e]),
    r.getSnapshot !== t || o || (kt !== null && kt.memoizedState.tag & 1))
  ) {
    if (((n.flags |= 2048), el(9, R1.bind(null, n, r, i, t), void 0, null), Pt === null))
      throw Error(U(349));
    Ni & 30 || M1(n, t, i);
  }
  return i;
}
function M1(e, t, n) {
  (e.flags |= 16384),
    (e = { getSnapshot: t, value: n }),
    (t = et.updateQueue),
    t === null
      ? ((t = { lastEffect: null, stores: null }), (et.updateQueue = t), (t.stores = [e]))
      : ((n = t.stores), n === null ? (t.stores = [e]) : n.push(e));
}
function R1(e, t, n, r) {
  (t.value = n), (t.getSnapshot = r), I1(t) && _1(e);
}
function L1(e, t, n) {
  return n(function () {
    I1(t) && _1(e);
  });
}
function I1(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !Jn(e, n);
  } catch {
    return !0;
  }
}
function _1(e) {
  var t = Or(e, 1);
  t !== null && Qn(t, e, 1, -1);
}
function Jd(e) {
  var t = or();
  return (
    typeof e == 'function' && (e = e()),
    (t.memoizedState = t.baseState = e),
    (e = {
      pending: null,
      interleaved: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Ja,
      lastRenderedState: e,
    }),
    (t.queue = e),
    (e = e.dispatch = Ip.bind(null, et, e)),
    [t.memoizedState, e]
  );
}
function el(e, t, n, r) {
  return (
    (e = { tag: e, create: t, destroy: n, deps: r, next: null }),
    (t = et.updateQueue),
    t === null
      ? ((t = { lastEffect: null, stores: null }),
        (et.updateQueue = t),
        (t.lastEffect = e.next = e))
      : ((n = t.lastEffect),
        n === null
          ? (t.lastEffect = e.next = e)
          : ((r = n.next), (n.next = e), (e.next = r), (t.lastEffect = e))),
    e
  );
}
function O1() {
  return jn().memoizedState;
}
function xs(e, t, n, r) {
  var i = or();
  (et.flags |= e), (i.memoizedState = el(1 | t, n, void 0, r === void 0 ? null : r));
}
function Pu(e, t, n, r) {
  var i = jn();
  r = r === void 0 ? null : r;
  var o = void 0;
  if (Ct !== null) {
    var a = Ct.memoizedState;
    if (((o = a.destroy), r !== null && kf(r, a.deps))) {
      i.memoizedState = el(t, n, o, r);
      return;
    }
  }
  (et.flags |= e), (i.memoizedState = el(1 | t, n, o, r));
}
function e4(e, t) {
  return xs(8390656, 8, e, t);
}
function Rf(e, t) {
  return Pu(2048, 8, e, t);
}
function $1(e, t) {
  return Pu(4, 2, e, t);
}
function T1(e, t) {
  return Pu(4, 4, e, t);
}
function N1(e, t) {
  if (typeof t == 'function')
    return (
      (e = e()),
      t(e),
      function () {
        t(null);
      }
    );
  if (t != null)
    return (
      (e = e()),
      (t.current = e),
      function () {
        t.current = null;
      }
    );
}
function F1(e, t, n) {
  return (n = n != null ? n.concat([e]) : null), Pu(4, 4, N1.bind(null, t, e), n);
}
function Lf() {}
function j1(e, t) {
  var n = jn();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && kf(t, r[1]) ? r[0] : ((n.memoizedState = [e, t]), e);
}
function A1(e, t) {
  var n = jn();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && kf(t, r[1])
    ? r[0]
    : ((e = e()), (n.memoizedState = [e, t]), e);
}
function z1(e, t, n) {
  return Ni & 21
    ? (Jn(n, t) || ((n = U6()), (et.lanes |= n), (Fi |= n), (e.baseState = !0)), t)
    : (e.baseState && ((e.baseState = !1), (an = !0)), (e.memoizedState = n));
}
function Rp(e, t) {
  var n = Re;
  (Re = n !== 0 && 4 > n ? n : 4), e(!0);
  var r = Rc.transition;
  Rc.transition = {};
  try {
    e(!1), t();
  } finally {
    (Re = n), (Rc.transition = r);
  }
}
function D1() {
  return jn().memoizedState;
}
function Lp(e, t, n) {
  var r = oi(e);
  if (((n = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null }), V1(e)))
    H1(t, n);
  else if (((n = x1(e, t, n, r)), n !== null)) {
    var i = Qt();
    Qn(n, e, r, i), B1(n, t, r);
  }
}
function Ip(e, t, n) {
  var r = oi(e),
    i = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
  if (V1(e)) H1(t, i);
  else {
    var o = e.alternate;
    if (e.lanes === 0 && (o === null || o.lanes === 0) && ((o = t.lastRenderedReducer), o !== null))
      try {
        var a = t.lastRenderedState,
          l = o(a, n);
        if (((i.hasEagerState = !0), (i.eagerState = l), Jn(l, a))) {
          var s = t.interleaved;
          s === null ? ((i.next = i), wf(t)) : ((i.next = s.next), (s.next = i)),
            (t.interleaved = i);
          return;
        }
      } catch {
      } finally {
      }
    (n = x1(e, t, i, r)), n !== null && ((i = Qt()), Qn(n, e, r, i), B1(n, t, r));
  }
}
function V1(e) {
  var t = e.alternate;
  return e === et || (t !== null && t === et);
}
function H1(e, t) {
  La = Js = !0;
  var n = e.pending;
  n === null ? (t.next = t) : ((t.next = n.next), (n.next = t)), (e.pending = t);
}
function B1(e, t, n) {
  if (n & 4194240) {
    var r = t.lanes;
    (r &= e.pendingLanes), (n |= r), (t.lanes = n), af(e, n);
  }
}
var eu = {
    readContext: Fn,
    useCallback: zt,
    useContext: zt,
    useEffect: zt,
    useImperativeHandle: zt,
    useInsertionEffect: zt,
    useLayoutEffect: zt,
    useMemo: zt,
    useReducer: zt,
    useRef: zt,
    useState: zt,
    useDebugValue: zt,
    useDeferredValue: zt,
    useTransition: zt,
    useMutableSource: zt,
    useSyncExternalStore: zt,
    useId: zt,
    unstable_isNewReconciler: !1,
  },
  _p = {
    readContext: Fn,
    useCallback: function (e, t) {
      return (or().memoizedState = [e, t === void 0 ? null : t]), e;
    },
    useContext: Fn,
    useEffect: e4,
    useImperativeHandle: function (e, t, n) {
      return (n = n != null ? n.concat([e]) : null), xs(4194308, 4, N1.bind(null, t, e), n);
    },
    useLayoutEffect: function (e, t) {
      return xs(4194308, 4, e, t);
    },
    useInsertionEffect: function (e, t) {
      return xs(4, 2, e, t);
    },
    useMemo: function (e, t) {
      var n = or();
      return (t = t === void 0 ? null : t), (e = e()), (n.memoizedState = [e, t]), e;
    },
    useReducer: function (e, t, n) {
      var r = or();
      return (
        (t = n !== void 0 ? n(t) : t),
        (r.memoizedState = r.baseState = t),
        (e = {
          pending: null,
          interleaved: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: e,
          lastRenderedState: t,
        }),
        (r.queue = e),
        (e = e.dispatch = Lp.bind(null, et, e)),
        [r.memoizedState, e]
      );
    },
    useRef: function (e) {
      var t = or();
      return (e = { current: e }), (t.memoizedState = e);
    },
    useState: Jd,
    useDebugValue: Lf,
    useDeferredValue: function (e) {
      return (or().memoizedState = e);
    },
    useTransition: function () {
      var e = Jd(!1),
        t = e[0];
      return (e = Rp.bind(null, e[1])), (or().memoizedState = e), [t, e];
    },
    useMutableSource: function () {},
    useSyncExternalStore: function (e, t, n) {
      var r = et,
        i = or();
      if (qe) {
        if (n === void 0) throw Error(U(407));
        n = n();
      } else {
        if (((n = t()), Pt === null)) throw Error(U(349));
        Ni & 30 || M1(r, t, n);
      }
      i.memoizedState = n;
      var o = { value: n, getSnapshot: t };
      return (
        (i.queue = o),
        e4(L1.bind(null, r, o, e), [e]),
        (r.flags |= 2048),
        el(9, R1.bind(null, r, o, n, t), void 0, null),
        n
      );
    },
    useId: function () {
      var e = or(),
        t = Pt.identifierPrefix;
      if (qe) {
        var n = kr,
          r = Er;
        (n = (r & ~(1 << (32 - qn(r) - 1))).toString(32) + n),
          (t = ':' + t + 'R' + n),
          (n = Ya++),
          0 < n && (t += 'H' + n.toString(32)),
          (t += ':');
      } else (n = Mp++), (t = ':' + t + 'r' + n.toString(32) + ':');
      return (e.memoizedState = t);
    },
    unstable_isNewReconciler: !1,
  },
  Op = {
    readContext: Fn,
    useCallback: j1,
    useContext: Fn,
    useEffect: Rf,
    useImperativeHandle: F1,
    useInsertionEffect: $1,
    useLayoutEffect: T1,
    useMemo: A1,
    useReducer: Lc,
    useRef: O1,
    useState: function () {
      return Lc(Ja);
    },
    useDebugValue: Lf,
    useDeferredValue: function (e) {
      var t = jn();
      return z1(t, Ct.memoizedState, e);
    },
    useTransition: function () {
      var e = Lc(Ja)[0],
        t = jn().memoizedState;
      return [e, t];
    },
    useMutableSource: k1,
    useSyncExternalStore: P1,
    useId: D1,
    unstable_isNewReconciler: !1,
  },
  $p = {
    readContext: Fn,
    useCallback: j1,
    useContext: Fn,
    useEffect: Rf,
    useImperativeHandle: F1,
    useInsertionEffect: $1,
    useLayoutEffect: T1,
    useMemo: A1,
    useReducer: Ic,
    useRef: O1,
    useState: function () {
      return Ic(Ja);
    },
    useDebugValue: Lf,
    useDeferredValue: function (e) {
      var t = jn();
      return Ct === null ? (t.memoizedState = e) : z1(t, Ct.memoizedState, e);
    },
    useTransition: function () {
      var e = Ic(Ja)[0],
        t = jn().memoizedState;
      return [e, t];
    },
    useMutableSource: k1,
    useSyncExternalStore: P1,
    useId: D1,
    unstable_isNewReconciler: !1,
  };
function Un(e, t) {
  if (e && e.defaultProps) {
    (t = tt({}, t)), (e = e.defaultProps);
    for (var n in e) t[n] === void 0 && (t[n] = e[n]);
    return t;
  }
  return t;
}
function I3(e, t, n, r) {
  (t = e.memoizedState),
    (n = n(r, t)),
    (n = n == null ? t : tt({}, t, n)),
    (e.memoizedState = n),
    e.lanes === 0 && (e.updateQueue.baseState = n);
}
var Mu = {
  isMounted: function (e) {
    return (e = e._reactInternals) ? zi(e) === e : !1;
  },
  enqueueSetState: function (e, t, n) {
    e = e._reactInternals;
    var r = Qt(),
      i = oi(e),
      o = Pr(r, i);
    (o.payload = t),
      n != null && (o.callback = n),
      (t = ri(e, o, i)),
      t !== null && (Qn(t, e, i, r), ws(t, e, i));
  },
  enqueueReplaceState: function (e, t, n) {
    e = e._reactInternals;
    var r = Qt(),
      i = oi(e),
      o = Pr(r, i);
    (o.tag = 1),
      (o.payload = t),
      n != null && (o.callback = n),
      (t = ri(e, o, i)),
      t !== null && (Qn(t, e, i, r), ws(t, e, i));
  },
  enqueueForceUpdate: function (e, t) {
    e = e._reactInternals;
    var n = Qt(),
      r = oi(e),
      i = Pr(n, r);
    (i.tag = 2),
      t != null && (i.callback = t),
      (t = ri(e, i, r)),
      t !== null && (Qn(t, e, r, n), ws(t, e, r));
  },
};
function t4(e, t, n, r, i, o, a) {
  return (
    (e = e.stateNode),
    typeof e.shouldComponentUpdate == 'function'
      ? e.shouldComponentUpdate(r, o, a)
      : t.prototype && t.prototype.isPureReactComponent
        ? !Ka(n, r) || !Ka(i, o)
        : !0
  );
}
function U1(e, t, n) {
  var r = !1,
    i = ui,
    o = t.contextType;
  return (
    typeof o == 'object' && o !== null
      ? (o = Fn(o))
      : ((i = sn(t) ? $i : Wt.current),
        (r = t.contextTypes),
        (o = (r = r != null) ? $o(e, i) : ui)),
    (t = new t(n, o)),
    (e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null),
    (t.updater = Mu),
    (e.stateNode = t),
    (t._reactInternals = e),
    r &&
      ((e = e.stateNode),
      (e.__reactInternalMemoizedUnmaskedChildContext = i),
      (e.__reactInternalMemoizedMaskedChildContext = o)),
    t
  );
}
function n4(e, t, n, r) {
  (e = t.state),
    typeof t.componentWillReceiveProps == 'function' && t.componentWillReceiveProps(n, r),
    typeof t.UNSAFE_componentWillReceiveProps == 'function' &&
      t.UNSAFE_componentWillReceiveProps(n, r),
    t.state !== e && Mu.enqueueReplaceState(t, t.state, null);
}
function _3(e, t, n, r) {
  var i = e.stateNode;
  (i.props = n), (i.state = e.memoizedState), (i.refs = {}), Sf(e);
  var o = t.contextType;
  typeof o == 'object' && o !== null
    ? (i.context = Fn(o))
    : ((o = sn(t) ? $i : Wt.current), (i.context = $o(e, o))),
    (i.state = e.memoizedState),
    (o = t.getDerivedStateFromProps),
    typeof o == 'function' && (I3(e, t, o, n), (i.state = e.memoizedState)),
    typeof t.getDerivedStateFromProps == 'function' ||
      typeof i.getSnapshotBeforeUpdate == 'function' ||
      (typeof i.UNSAFE_componentWillMount != 'function' &&
        typeof i.componentWillMount != 'function') ||
      ((t = i.state),
      typeof i.componentWillMount == 'function' && i.componentWillMount(),
      typeof i.UNSAFE_componentWillMount == 'function' && i.UNSAFE_componentWillMount(),
      t !== i.state && Mu.enqueueReplaceState(i, i.state, null),
      Xs(e, n, i, r),
      (i.state = e.memoizedState)),
    typeof i.componentDidMount == 'function' && (e.flags |= 4194308);
}
function jo(e, t) {
  try {
    var n = '',
      r = t;
    do (n += lm(r)), (r = r.return);
    while (r);
    var i = n;
  } catch (o) {
    i =
      `
Error generating stack: ` +
      o.message +
      `
` +
      o.stack;
  }
  return { value: e, source: t, stack: i, digest: null };
}
function _c(e, t, n) {
  return { value: e, source: null, stack: n ?? null, digest: t ?? null };
}
function O3(e, t) {
  try {
    console.error(t.value);
  } catch (n) {
    setTimeout(function () {
      throw n;
    });
  }
}
var Tp = typeof WeakMap == 'function' ? WeakMap : Map;
function W1(e, t, n) {
  (n = Pr(-1, n)), (n.tag = 3), (n.payload = { element: null });
  var r = t.value;
  return (
    (n.callback = function () {
      nu || ((nu = !0), (H3 = r)), O3(e, t);
    }),
    n
  );
}
function K1(e, t, n) {
  (n = Pr(-1, n)), (n.tag = 3);
  var r = e.type.getDerivedStateFromError;
  if (typeof r == 'function') {
    var i = t.value;
    (n.payload = function () {
      return r(i);
    }),
      (n.callback = function () {
        O3(e, t);
      });
  }
  var o = e.stateNode;
  return (
    o !== null &&
      typeof o.componentDidCatch == 'function' &&
      (n.callback = function () {
        O3(e, t), typeof r != 'function' && (ii === null ? (ii = new Set([this])) : ii.add(this));
        var a = t.stack;
        this.componentDidCatch(t.value, { componentStack: a !== null ? a : '' });
      }),
    n
  );
}
function r4(e, t, n) {
  var r = e.pingCache;
  if (r === null) {
    r = e.pingCache = new Tp();
    var i = new Set();
    r.set(t, i);
  } else (i = r.get(t)), i === void 0 && ((i = new Set()), r.set(t, i));
  i.has(n) || (i.add(n), (e = Gp.bind(null, e, t, n)), t.then(e, e));
}
function i4(e) {
  do {
    var t;
    if (
      ((t = e.tag === 13) && ((t = e.memoizedState), (t = t !== null ? t.dehydrated !== null : !0)),
      t)
    )
      return e;
    e = e.return;
  } while (e !== null);
  return null;
}
function o4(e, t, n, r, i) {
  return e.mode & 1
    ? ((e.flags |= 65536), (e.lanes = i), e)
    : (e === t
        ? (e.flags |= 65536)
        : ((e.flags |= 128),
          (n.flags |= 131072),
          (n.flags &= -52805),
          n.tag === 1 &&
            (n.alternate === null ? (n.tag = 17) : ((t = Pr(-1, 1)), (t.tag = 2), ri(n, t, 1))),
          (n.lanes |= 1)),
      e);
}
var Np = Nr.ReactCurrentOwner,
  an = !1;
function Gt(e, t, n, r) {
  t.child = e === null ? S1(t, null, n, r) : No(t, e.child, n, r);
}
function a4(e, t, n, r, i) {
  n = n.render;
  var o = t.ref;
  return (
    Lo(t, i),
    (r = Pf(e, t, n, r, o, i)),
    (n = Mf()),
    e !== null && !an
      ? ((t.updateQueue = e.updateQueue), (t.flags &= -2053), (e.lanes &= ~i), $r(e, t, i))
      : (qe && n && mf(t), (t.flags |= 1), Gt(e, t, r, i), t.child)
  );
}
function l4(e, t, n, r, i) {
  if (e === null) {
    var o = n.type;
    return typeof o == 'function' &&
      !jf(o) &&
      o.defaultProps === void 0 &&
      n.compare === null &&
      n.defaultProps === void 0
      ? ((t.tag = 15), (t.type = o), Z1(e, t, o, r, i))
      : ((e = Ps(n.type, null, r, t, t.mode, i)), (e.ref = t.ref), (e.return = t), (t.child = e));
  }
  if (((o = e.child), !(e.lanes & i))) {
    var a = o.memoizedProps;
    if (((n = n.compare), (n = n !== null ? n : Ka), n(a, r) && e.ref === t.ref))
      return $r(e, t, i);
  }
  return (t.flags |= 1), (e = ai(o, r)), (e.ref = t.ref), (e.return = t), (t.child = e);
}
function Z1(e, t, n, r, i) {
  if (e !== null) {
    var o = e.memoizedProps;
    if (Ka(o, r) && e.ref === t.ref)
      if (((an = !1), (t.pendingProps = r = o), (e.lanes & i) !== 0)) e.flags & 131072 && (an = !0);
      else return (t.lanes = e.lanes), $r(e, t, i);
  }
  return $3(e, t, n, r, i);
}
function G1(e, t, n) {
  var r = t.pendingProps,
    i = r.children,
    o = e !== null ? e.memoizedState : null;
  if (r.mode === 'hidden')
    if (!(t.mode & 1))
      (t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
        Ae(wo, vn),
        (vn |= n);
    else {
      if (!(n & 1073741824))
        return (
          (e = o !== null ? o.baseLanes | n : n),
          (t.lanes = t.childLanes = 1073741824),
          (t.memoizedState = { baseLanes: e, cachePool: null, transitions: null }),
          (t.updateQueue = null),
          Ae(wo, vn),
          (vn |= e),
          null
        );
      (t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
        (r = o !== null ? o.baseLanes : n),
        Ae(wo, vn),
        (vn |= r);
    }
  else
    o !== null ? ((r = o.baseLanes | n), (t.memoizedState = null)) : (r = n), Ae(wo, vn), (vn |= r);
  return Gt(e, t, i, n), t.child;
}
function q1(e, t) {
  var n = t.ref;
  ((e === null && n !== null) || (e !== null && e.ref !== n)) &&
    ((t.flags |= 512), (t.flags |= 2097152));
}
function $3(e, t, n, r, i) {
  var o = sn(n) ? $i : Wt.current;
  return (
    (o = $o(t, o)),
    Lo(t, i),
    (n = Pf(e, t, n, r, o, i)),
    (r = Mf()),
    e !== null && !an
      ? ((t.updateQueue = e.updateQueue), (t.flags &= -2053), (e.lanes &= ~i), $r(e, t, i))
      : (qe && r && mf(t), (t.flags |= 1), Gt(e, t, n, i), t.child)
  );
}
function s4(e, t, n, r, i) {
  if (sn(n)) {
    var o = !0;
    Ks(t);
  } else o = !1;
  if ((Lo(t, i), t.stateNode === null)) bs(e, t), U1(t, n, r), _3(t, n, r, i), (r = !0);
  else if (e === null) {
    var a = t.stateNode,
      l = t.memoizedProps;
    a.props = l;
    var s = a.context,
      u = n.contextType;
    typeof u == 'object' && u !== null
      ? (u = Fn(u))
      : ((u = sn(n) ? $i : Wt.current), (u = $o(t, u)));
    var c = n.getDerivedStateFromProps,
      f = typeof c == 'function' || typeof a.getSnapshotBeforeUpdate == 'function';
    f ||
      (typeof a.UNSAFE_componentWillReceiveProps != 'function' &&
        typeof a.componentWillReceiveProps != 'function') ||
      ((l !== r || s !== u) && n4(t, a, r, u)),
      (Br = !1);
    var v = t.memoizedState;
    (a.state = v),
      Xs(t, r, a, i),
      (s = t.memoizedState),
      l !== r || v !== s || ln.current || Br
        ? (typeof c == 'function' && (I3(t, n, c, r), (s = t.memoizedState)),
          (l = Br || t4(t, n, l, r, v, s, u))
            ? (f ||
                (typeof a.UNSAFE_componentWillMount != 'function' &&
                  typeof a.componentWillMount != 'function') ||
                (typeof a.componentWillMount == 'function' && a.componentWillMount(),
                typeof a.UNSAFE_componentWillMount == 'function' && a.UNSAFE_componentWillMount()),
              typeof a.componentDidMount == 'function' && (t.flags |= 4194308))
            : (typeof a.componentDidMount == 'function' && (t.flags |= 4194308),
              (t.memoizedProps = r),
              (t.memoizedState = s)),
          (a.props = r),
          (a.state = s),
          (a.context = u),
          (r = l))
        : (typeof a.componentDidMount == 'function' && (t.flags |= 4194308), (r = !1));
  } else {
    (a = t.stateNode),
      b1(e, t),
      (l = t.memoizedProps),
      (u = t.type === t.elementType ? l : Un(t.type, l)),
      (a.props = u),
      (f = t.pendingProps),
      (v = a.context),
      (s = n.contextType),
      typeof s == 'object' && s !== null
        ? (s = Fn(s))
        : ((s = sn(n) ? $i : Wt.current), (s = $o(t, s)));
    var y = n.getDerivedStateFromProps;
    (c = typeof y == 'function' || typeof a.getSnapshotBeforeUpdate == 'function') ||
      (typeof a.UNSAFE_componentWillReceiveProps != 'function' &&
        typeof a.componentWillReceiveProps != 'function') ||
      ((l !== f || v !== s) && n4(t, a, r, s)),
      (Br = !1),
      (v = t.memoizedState),
      (a.state = v),
      Xs(t, r, a, i);
    var g = t.memoizedState;
    l !== f || v !== g || ln.current || Br
      ? (typeof y == 'function' && (I3(t, n, y, r), (g = t.memoizedState)),
        (u = Br || t4(t, n, u, r, v, g, s) || !1)
          ? (c ||
              (typeof a.UNSAFE_componentWillUpdate != 'function' &&
                typeof a.componentWillUpdate != 'function') ||
              (typeof a.componentWillUpdate == 'function' && a.componentWillUpdate(r, g, s),
              typeof a.UNSAFE_componentWillUpdate == 'function' &&
                a.UNSAFE_componentWillUpdate(r, g, s)),
            typeof a.componentDidUpdate == 'function' && (t.flags |= 4),
            typeof a.getSnapshotBeforeUpdate == 'function' && (t.flags |= 1024))
          : (typeof a.componentDidUpdate != 'function' ||
              (l === e.memoizedProps && v === e.memoizedState) ||
              (t.flags |= 4),
            typeof a.getSnapshotBeforeUpdate != 'function' ||
              (l === e.memoizedProps && v === e.memoizedState) ||
              (t.flags |= 1024),
            (t.memoizedProps = r),
            (t.memoizedState = g)),
        (a.props = r),
        (a.state = g),
        (a.context = s),
        (r = u))
      : (typeof a.componentDidUpdate != 'function' ||
          (l === e.memoizedProps && v === e.memoizedState) ||
          (t.flags |= 4),
        typeof a.getSnapshotBeforeUpdate != 'function' ||
          (l === e.memoizedProps && v === e.memoizedState) ||
          (t.flags |= 1024),
        (r = !1));
  }
  return T3(e, t, n, r, o, i);
}
function T3(e, t, n, r, i, o) {
  q1(e, t);
  var a = (t.flags & 128) !== 0;
  if (!r && !a) return i && Zd(t, n, !1), $r(e, t, o);
  (r = t.stateNode), (Np.current = t);
  var l = a && typeof n.getDerivedStateFromError != 'function' ? null : r.render();
  return (
    (t.flags |= 1),
    e !== null && a
      ? ((t.child = No(t, e.child, null, o)), (t.child = No(t, null, l, o)))
      : Gt(e, t, l, o),
    (t.memoizedState = r.state),
    i && Zd(t, n, !0),
    t.child
  );
}
function Q1(e) {
  var t = e.stateNode;
  t.pendingContext
    ? Kd(e, t.pendingContext, t.pendingContext !== t.context)
    : t.context && Kd(e, t.context, !1),
    xf(e, t.containerInfo);
}
function u4(e, t, n, r, i) {
  return To(), hf(i), (t.flags |= 256), Gt(e, t, n, r), t.child;
}
var N3 = { dehydrated: null, treeContext: null, retryLane: 0 };
function F3(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function X1(e, t, n) {
  var r = t.pendingProps,
    i = Je.current,
    o = !1,
    a = (t.flags & 128) !== 0,
    l;
  if (
    ((l = a) || (l = e !== null && e.memoizedState === null ? !1 : (i & 2) !== 0),
    l ? ((o = !0), (t.flags &= -129)) : (e === null || e.memoizedState !== null) && (i |= 1),
    Ae(Je, i & 1),
    e === null)
  )
    return (
      R3(t),
      (e = t.memoizedState),
      e !== null && ((e = e.dehydrated), e !== null)
        ? (t.mode & 1 ? (e.data === '$!' ? (t.lanes = 8) : (t.lanes = 1073741824)) : (t.lanes = 1),
          null)
        : ((a = r.children),
          (e = r.fallback),
          o
            ? ((r = t.mode),
              (o = t.child),
              (a = { mode: 'hidden', children: a }),
              !(r & 1) && o !== null
                ? ((o.childLanes = 0), (o.pendingProps = a))
                : (o = Iu(a, r, 0, null)),
              (e = _i(e, r, n, null)),
              (o.return = t),
              (e.return = t),
              (o.sibling = e),
              (t.child = o),
              (t.child.memoizedState = F3(n)),
              (t.memoizedState = N3),
              e)
            : If(t, a))
    );
  if (((i = e.memoizedState), i !== null && ((l = i.dehydrated), l !== null)))
    return Fp(e, t, a, r, l, i, n);
  if (o) {
    (o = r.fallback), (a = t.mode), (i = e.child), (l = i.sibling);
    var s = { mode: 'hidden', children: r.children };
    return (
      !(a & 1) && t.child !== i
        ? ((r = t.child), (r.childLanes = 0), (r.pendingProps = s), (t.deletions = null))
        : ((r = ai(i, s)), (r.subtreeFlags = i.subtreeFlags & 14680064)),
      l !== null ? (o = ai(l, o)) : ((o = _i(o, a, n, null)), (o.flags |= 2)),
      (o.return = t),
      (r.return = t),
      (r.sibling = o),
      (t.child = r),
      (r = o),
      (o = t.child),
      (a = e.child.memoizedState),
      (a =
        a === null
          ? F3(n)
          : { baseLanes: a.baseLanes | n, cachePool: null, transitions: a.transitions }),
      (o.memoizedState = a),
      (o.childLanes = e.childLanes & ~n),
      (t.memoizedState = N3),
      r
    );
  }
  return (
    (o = e.child),
    (e = o.sibling),
    (r = ai(o, { mode: 'visible', children: r.children })),
    !(t.mode & 1) && (r.lanes = n),
    (r.return = t),
    (r.sibling = null),
    e !== null &&
      ((n = t.deletions), n === null ? ((t.deletions = [e]), (t.flags |= 16)) : n.push(e)),
    (t.child = r),
    (t.memoizedState = null),
    r
  );
}
function If(e, t) {
  return (t = Iu({ mode: 'visible', children: t }, e.mode, 0, null)), (t.return = e), (e.child = t);
}
function Jl(e, t, n, r) {
  return (
    r !== null && hf(r),
    No(t, e.child, null, n),
    (e = If(t, t.pendingProps.children)),
    (e.flags |= 2),
    (t.memoizedState = null),
    e
  );
}
function Fp(e, t, n, r, i, o, a) {
  if (n)
    return t.flags & 256
      ? ((t.flags &= -257), (r = _c(Error(U(422)))), Jl(e, t, a, r))
      : t.memoizedState !== null
        ? ((t.child = e.child), (t.flags |= 128), null)
        : ((o = r.fallback),
          (i = t.mode),
          (r = Iu({ mode: 'visible', children: r.children }, i, 0, null)),
          (o = _i(o, i, a, null)),
          (o.flags |= 2),
          (r.return = t),
          (o.return = t),
          (r.sibling = o),
          (t.child = r),
          t.mode & 1 && No(t, e.child, null, a),
          (t.child.memoizedState = F3(a)),
          (t.memoizedState = N3),
          o);
  if (!(t.mode & 1)) return Jl(e, t, a, null);
  if (i.data === '$!') {
    if (((r = i.nextSibling && i.nextSibling.dataset), r)) var l = r.dgst;
    return (r = l), (o = Error(U(419))), (r = _c(o, r, void 0)), Jl(e, t, a, r);
  }
  if (((l = (a & e.childLanes) !== 0), an || l)) {
    if (((r = Pt), r !== null)) {
      switch (a & -a) {
        case 4:
          i = 2;
          break;
        case 16:
          i = 8;
          break;
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
          i = 32;
          break;
        case 536870912:
          i = 268435456;
          break;
        default:
          i = 0;
      }
      (i = i & (r.suspendedLanes | a) ? 0 : i),
        i !== 0 && i !== o.retryLane && ((o.retryLane = i), Or(e, i), Qn(r, e, i, -1));
    }
    return Ff(), (r = _c(Error(U(421)))), Jl(e, t, a, r);
  }
  return i.data === '$?'
    ? ((t.flags |= 128), (t.child = e.child), (t = qp.bind(null, e)), (i._reactRetry = t), null)
    : ((e = o.treeContext),
      (mn = ni(i.nextSibling)),
      (hn = t),
      (qe = !0),
      (Gn = null),
      e !== null &&
        ((On[$n++] = Er),
        (On[$n++] = kr),
        (On[$n++] = Ti),
        (Er = e.id),
        (kr = e.overflow),
        (Ti = t)),
      (t = If(t, r.children)),
      (t.flags |= 4096),
      t);
}
function c4(e, t, n) {
  e.lanes |= t;
  var r = e.alternate;
  r !== null && (r.lanes |= t), L3(e.return, t, n);
}
function Oc(e, t, n, r, i) {
  var o = e.memoizedState;
  o === null
    ? (e.memoizedState = {
        isBackwards: t,
        rendering: null,
        renderingStartTime: 0,
        last: r,
        tail: n,
        tailMode: i,
      })
    : ((o.isBackwards = t),
      (o.rendering = null),
      (o.renderingStartTime = 0),
      (o.last = r),
      (o.tail = n),
      (o.tailMode = i));
}
function Y1(e, t, n) {
  var r = t.pendingProps,
    i = r.revealOrder,
    o = r.tail;
  if ((Gt(e, t, r.children, n), (r = Je.current), r & 2)) (r = (r & 1) | 2), (t.flags |= 128);
  else {
    if (e !== null && e.flags & 128)
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13) e.memoizedState !== null && c4(e, n, t);
        else if (e.tag === 19) c4(e, n, t);
        else if (e.child !== null) {
          (e.child.return = e), (e = e.child);
          continue;
        }
        if (e === t) break e;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === t) break e;
          e = e.return;
        }
        (e.sibling.return = e.return), (e = e.sibling);
      }
    r &= 1;
  }
  if ((Ae(Je, r), !(t.mode & 1))) t.memoizedState = null;
  else
    switch (i) {
      case 'forwards':
        for (n = t.child, i = null; n !== null; )
          (e = n.alternate), e !== null && Ys(e) === null && (i = n), (n = n.sibling);
        (n = i),
          n === null ? ((i = t.child), (t.child = null)) : ((i = n.sibling), (n.sibling = null)),
          Oc(t, !1, i, n, o);
        break;
      case 'backwards':
        for (n = null, i = t.child, t.child = null; i !== null; ) {
          if (((e = i.alternate), e !== null && Ys(e) === null)) {
            t.child = i;
            break;
          }
          (e = i.sibling), (i.sibling = n), (n = i), (i = e);
        }
        Oc(t, !0, n, null, o);
        break;
      case 'together':
        Oc(t, !1, null, null, void 0);
        break;
      default:
        t.memoizedState = null;
    }
  return t.child;
}
function bs(e, t) {
  !(t.mode & 1) && e !== null && ((e.alternate = null), (t.alternate = null), (t.flags |= 2));
}
function $r(e, t, n) {
  if ((e !== null && (t.dependencies = e.dependencies), (Fi |= t.lanes), !(n & t.childLanes)))
    return null;
  if (e !== null && t.child !== e.child) throw Error(U(153));
  if (t.child !== null) {
    for (e = t.child, n = ai(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null; )
      (e = e.sibling), (n = n.sibling = ai(e, e.pendingProps)), (n.return = t);
    n.sibling = null;
  }
  return t.child;
}
function jp(e, t, n) {
  switch (t.tag) {
    case 3:
      Q1(t), To();
      break;
    case 5:
      E1(t);
      break;
    case 1:
      sn(t.type) && Ks(t);
      break;
    case 4:
      xf(t, t.stateNode.containerInfo);
      break;
    case 10:
      var r = t.type._context,
        i = t.memoizedProps.value;
      Ae(qs, r._currentValue), (r._currentValue = i);
      break;
    case 13:
      if (((r = t.memoizedState), r !== null))
        return r.dehydrated !== null
          ? (Ae(Je, Je.current & 1), (t.flags |= 128), null)
          : n & t.child.childLanes
            ? X1(e, t, n)
            : (Ae(Je, Je.current & 1), (e = $r(e, t, n)), e !== null ? e.sibling : null);
      Ae(Je, Je.current & 1);
      break;
    case 19:
      if (((r = (n & t.childLanes) !== 0), e.flags & 128)) {
        if (r) return Y1(e, t, n);
        t.flags |= 128;
      }
      if (
        ((i = t.memoizedState),
        i !== null && ((i.rendering = null), (i.tail = null), (i.lastEffect = null)),
        Ae(Je, Je.current),
        r)
      )
        break;
      return null;
    case 22:
    case 23:
      return (t.lanes = 0), G1(e, t, n);
  }
  return $r(e, t, n);
}
var J1, j3, e7, t7;
J1 = function (e, t) {
  for (var n = t.child; n !== null; ) {
    if (n.tag === 5 || n.tag === 6) e.appendChild(n.stateNode);
    else if (n.tag !== 4 && n.child !== null) {
      (n.child.return = n), (n = n.child);
      continue;
    }
    if (n === t) break;
    for (; n.sibling === null; ) {
      if (n.return === null || n.return === t) return;
      n = n.return;
    }
    (n.sibling.return = n.return), (n = n.sibling);
  }
};
j3 = function () {};
e7 = function (e, t, n, r) {
  var i = e.memoizedProps;
  if (i !== r) {
    (e = t.stateNode), Mi(cr.current);
    var o = null;
    switch (n) {
      case 'input':
        (i = o3(e, i)), (r = o3(e, r)), (o = []);
        break;
      case 'select':
        (i = tt({}, i, { value: void 0 })), (r = tt({}, r, { value: void 0 })), (o = []);
        break;
      case 'textarea':
        (i = s3(e, i)), (r = s3(e, r)), (o = []);
        break;
      default:
        typeof i.onClick != 'function' && typeof r.onClick == 'function' && (e.onclick = Us);
    }
    c3(n, r);
    var a;
    n = null;
    for (u in i)
      if (!r.hasOwnProperty(u) && i.hasOwnProperty(u) && i[u] != null)
        if (u === 'style') {
          var l = i[u];
          for (a in l) l.hasOwnProperty(a) && (n || (n = {}), (n[a] = ''));
        } else
          u !== 'dangerouslySetInnerHTML' &&
            u !== 'children' &&
            u !== 'suppressContentEditableWarning' &&
            u !== 'suppressHydrationWarning' &&
            u !== 'autoFocus' &&
            (za.hasOwnProperty(u) ? o || (o = []) : (o = o || []).push(u, null));
    for (u in r) {
      var s = r[u];
      if (
        ((l = i != null ? i[u] : void 0),
        r.hasOwnProperty(u) && s !== l && (s != null || l != null))
      )
        if (u === 'style')
          if (l) {
            for (a in l)
              !l.hasOwnProperty(a) || (s && s.hasOwnProperty(a)) || (n || (n = {}), (n[a] = ''));
            for (a in s) s.hasOwnProperty(a) && l[a] !== s[a] && (n || (n = {}), (n[a] = s[a]));
          } else n || (o || (o = []), o.push(u, n)), (n = s);
        else
          u === 'dangerouslySetInnerHTML'
            ? ((s = s ? s.__html : void 0),
              (l = l ? l.__html : void 0),
              s != null && l !== s && (o = o || []).push(u, s))
            : u === 'children'
              ? (typeof s != 'string' && typeof s != 'number') || (o = o || []).push(u, '' + s)
              : u !== 'suppressContentEditableWarning' &&
                u !== 'suppressHydrationWarning' &&
                (za.hasOwnProperty(u)
                  ? (s != null && u === 'onScroll' && Ve('scroll', e), o || l === s || (o = []))
                  : (o = o || []).push(u, s));
    }
    n && (o = o || []).push('style', n);
    var u = o;
    (t.updateQueue = u) && (t.flags |= 4);
  }
};
t7 = function (e, t, n, r) {
  n !== r && (t.flags |= 4);
};
function ca(e, t) {
  if (!qe)
    switch (e.tailMode) {
      case 'hidden':
        t = e.tail;
        for (var n = null; t !== null; ) t.alternate !== null && (n = t), (t = t.sibling);
        n === null ? (e.tail = null) : (n.sibling = null);
        break;
      case 'collapsed':
        n = e.tail;
        for (var r = null; n !== null; ) n.alternate !== null && (r = n), (n = n.sibling);
        r === null
          ? t || e.tail === null
            ? (e.tail = null)
            : (e.tail.sibling = null)
          : (r.sibling = null);
    }
}
function Dt(e) {
  var t = e.alternate !== null && e.alternate.child === e.child,
    n = 0,
    r = 0;
  if (t)
    for (var i = e.child; i !== null; )
      (n |= i.lanes | i.childLanes),
        (r |= i.subtreeFlags & 14680064),
        (r |= i.flags & 14680064),
        (i.return = e),
        (i = i.sibling);
  else
    for (i = e.child; i !== null; )
      (n |= i.lanes | i.childLanes),
        (r |= i.subtreeFlags),
        (r |= i.flags),
        (i.return = e),
        (i = i.sibling);
  return (e.subtreeFlags |= r), (e.childLanes = n), t;
}
function Ap(e, t, n) {
  var r = t.pendingProps;
  switch ((pf(t), t.tag)) {
    case 2:
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
      return Dt(t), null;
    case 1:
      return sn(t.type) && Ws(), Dt(t), null;
    case 3:
      return (
        (r = t.stateNode),
        Fo(),
        He(ln),
        He(Wt),
        Ef(),
        r.pendingContext && ((r.context = r.pendingContext), (r.pendingContext = null)),
        (e === null || e.child === null) &&
          (Xl(t)
            ? (t.flags |= 4)
            : e === null ||
              (e.memoizedState.isDehydrated && !(t.flags & 256)) ||
              ((t.flags |= 1024), Gn !== null && (W3(Gn), (Gn = null)))),
        j3(e, t),
        Dt(t),
        null
      );
    case 5:
      bf(t);
      var i = Mi(Xa.current);
      if (((n = t.type), e !== null && t.stateNode != null))
        e7(e, t, n, r, i), e.ref !== t.ref && ((t.flags |= 512), (t.flags |= 2097152));
      else {
        if (!r) {
          if (t.stateNode === null) throw Error(U(166));
          return Dt(t), null;
        }
        if (((e = Mi(cr.current)), Xl(t))) {
          (r = t.stateNode), (n = t.type);
          var o = t.memoizedProps;
          switch (((r[lr] = t), (r[qa] = o), (e = (t.mode & 1) !== 0), n)) {
            case 'dialog':
              Ve('cancel', r), Ve('close', r);
              break;
            case 'iframe':
            case 'object':
            case 'embed':
              Ve('load', r);
              break;
            case 'video':
            case 'audio':
              for (i = 0; i < wa.length; i++) Ve(wa[i], r);
              break;
            case 'source':
              Ve('error', r);
              break;
            case 'img':
            case 'image':
            case 'link':
              Ve('error', r), Ve('load', r);
              break;
            case 'details':
              Ve('toggle', r);
              break;
            case 'input':
              Cd(r, o), Ve('invalid', r);
              break;
            case 'select':
              (r._wrapperState = { wasMultiple: !!o.multiple }), Ve('invalid', r);
              break;
            case 'textarea':
              Sd(r, o), Ve('invalid', r);
          }
          c3(n, o), (i = null);
          for (var a in o)
            if (o.hasOwnProperty(a)) {
              var l = o[a];
              a === 'children'
                ? typeof l == 'string'
                  ? r.textContent !== l &&
                    (o.suppressHydrationWarning !== !0 && Ql(r.textContent, l, e),
                    (i = ['children', l]))
                  : typeof l == 'number' &&
                    r.textContent !== '' + l &&
                    (o.suppressHydrationWarning !== !0 && Ql(r.textContent, l, e),
                    (i = ['children', '' + l]))
                : za.hasOwnProperty(a) && l != null && a === 'onScroll' && Ve('scroll', r);
            }
          switch (n) {
            case 'input':
              Hl(r), wd(r, o, !0);
              break;
            case 'textarea':
              Hl(r), xd(r);
              break;
            case 'select':
            case 'option':
              break;
            default:
              typeof o.onClick == 'function' && (r.onclick = Us);
          }
          (r = i), (t.updateQueue = r), r !== null && (t.flags |= 4);
        } else {
          (a = i.nodeType === 9 ? i : i.ownerDocument),
            e === 'http://www.w3.org/1999/xhtml' && (e = L6(n)),
            e === 'http://www.w3.org/1999/xhtml'
              ? n === 'script'
                ? ((e = a.createElement('div')),
                  (e.innerHTML = '<script></script>'),
                  (e = e.removeChild(e.firstChild)))
                : typeof r.is == 'string'
                  ? (e = a.createElement(n, { is: r.is }))
                  : ((e = a.createElement(n)),
                    n === 'select' &&
                      ((a = e), r.multiple ? (a.multiple = !0) : r.size && (a.size = r.size)))
              : (e = a.createElementNS(e, n)),
            (e[lr] = t),
            (e[qa] = r),
            J1(e, t, !1, !1),
            (t.stateNode = e);
          e: {
            switch (((a = f3(n, r)), n)) {
              case 'dialog':
                Ve('cancel', e), Ve('close', e), (i = r);
                break;
              case 'iframe':
              case 'object':
              case 'embed':
                Ve('load', e), (i = r);
                break;
              case 'video':
              case 'audio':
                for (i = 0; i < wa.length; i++) Ve(wa[i], e);
                i = r;
                break;
              case 'source':
                Ve('error', e), (i = r);
                break;
              case 'img':
              case 'image':
              case 'link':
                Ve('error', e), Ve('load', e), (i = r);
                break;
              case 'details':
                Ve('toggle', e), (i = r);
                break;
              case 'input':
                Cd(e, r), (i = o3(e, r)), Ve('invalid', e);
                break;
              case 'option':
                i = r;
                break;
              case 'select':
                (e._wrapperState = { wasMultiple: !!r.multiple }),
                  (i = tt({}, r, { value: void 0 })),
                  Ve('invalid', e);
                break;
              case 'textarea':
                Sd(e, r), (i = s3(e, r)), Ve('invalid', e);
                break;
              default:
                i = r;
            }
            c3(n, i), (l = i);
            for (o in l)
              if (l.hasOwnProperty(o)) {
                var s = l[o];
                o === 'style'
                  ? O6(e, s)
                  : o === 'dangerouslySetInnerHTML'
                    ? ((s = s ? s.__html : void 0), s != null && I6(e, s))
                    : o === 'children'
                      ? typeof s == 'string'
                        ? (n !== 'textarea' || s !== '') && Da(e, s)
                        : typeof s == 'number' && Da(e, '' + s)
                      : o !== 'suppressContentEditableWarning' &&
                        o !== 'suppressHydrationWarning' &&
                        o !== 'autoFocus' &&
                        (za.hasOwnProperty(o)
                          ? s != null && o === 'onScroll' && Ve('scroll', e)
                          : s != null && J2(e, o, s, a));
              }
            switch (n) {
              case 'input':
                Hl(e), wd(e, r, !1);
                break;
              case 'textarea':
                Hl(e), xd(e);
                break;
              case 'option':
                r.value != null && e.setAttribute('value', '' + si(r.value));
                break;
              case 'select':
                (e.multiple = !!r.multiple),
                  (o = r.value),
                  o != null
                    ? ko(e, !!r.multiple, o, !1)
                    : r.defaultValue != null && ko(e, !!r.multiple, r.defaultValue, !0);
                break;
              default:
                typeof i.onClick == 'function' && (e.onclick = Us);
            }
            switch (n) {
              case 'button':
              case 'input':
              case 'select':
              case 'textarea':
                r = !!r.autoFocus;
                break e;
              case 'img':
                r = !0;
                break e;
              default:
                r = !1;
            }
          }
          r && (t.flags |= 4);
        }
        t.ref !== null && ((t.flags |= 512), (t.flags |= 2097152));
      }
      return Dt(t), null;
    case 6:
      if (e && t.stateNode != null) t7(e, t, e.memoizedProps, r);
      else {
        if (typeof r != 'string' && t.stateNode === null) throw Error(U(166));
        if (((n = Mi(Xa.current)), Mi(cr.current), Xl(t))) {
          if (
            ((r = t.stateNode),
            (n = t.memoizedProps),
            (r[lr] = t),
            (o = r.nodeValue !== n) && ((e = hn), e !== null))
          )
            switch (e.tag) {
              case 3:
                Ql(r.nodeValue, n, (e.mode & 1) !== 0);
                break;
              case 5:
                e.memoizedProps.suppressHydrationWarning !== !0 &&
                  Ql(r.nodeValue, n, (e.mode & 1) !== 0);
            }
          o && (t.flags |= 4);
        } else
          (r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r)),
            (r[lr] = t),
            (t.stateNode = r);
      }
      return Dt(t), null;
    case 13:
      if (
        (He(Je),
        (r = t.memoizedState),
        e === null || (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
      ) {
        if (qe && mn !== null && t.mode & 1 && !(t.flags & 128))
          C1(), To(), (t.flags |= 98560), (o = !1);
        else if (((o = Xl(t)), r !== null && r.dehydrated !== null)) {
          if (e === null) {
            if (!o) throw Error(U(318));
            if (((o = t.memoizedState), (o = o !== null ? o.dehydrated : null), !o))
              throw Error(U(317));
            o[lr] = t;
          } else To(), !(t.flags & 128) && (t.memoizedState = null), (t.flags |= 4);
          Dt(t), (o = !1);
        } else Gn !== null && (W3(Gn), (Gn = null)), (o = !0);
        if (!o) return t.flags & 65536 ? t : null;
      }
      return t.flags & 128
        ? ((t.lanes = n), t)
        : ((r = r !== null),
          r !== (e !== null && e.memoizedState !== null) &&
            r &&
            ((t.child.flags |= 8192),
            t.mode & 1 && (e === null || Je.current & 1 ? wt === 0 && (wt = 3) : Ff())),
          t.updateQueue !== null && (t.flags |= 4),
          Dt(t),
          null);
    case 4:
      return Fo(), j3(e, t), e === null && Za(t.stateNode.containerInfo), Dt(t), null;
    case 10:
      return Cf(t.type._context), Dt(t), null;
    case 17:
      return sn(t.type) && Ws(), Dt(t), null;
    case 19:
      if ((He(Je), (o = t.memoizedState), o === null)) return Dt(t), null;
      if (((r = (t.flags & 128) !== 0), (a = o.rendering), a === null))
        if (r) ca(o, !1);
        else {
          if (wt !== 0 || (e !== null && e.flags & 128))
            for (e = t.child; e !== null; ) {
              if (((a = Ys(e)), a !== null)) {
                for (
                  t.flags |= 128,
                    ca(o, !1),
                    r = a.updateQueue,
                    r !== null && ((t.updateQueue = r), (t.flags |= 4)),
                    t.subtreeFlags = 0,
                    r = n,
                    n = t.child;
                  n !== null;

                )
                  (o = n),
                    (e = r),
                    (o.flags &= 14680066),
                    (a = o.alternate),
                    a === null
                      ? ((o.childLanes = 0),
                        (o.lanes = e),
                        (o.child = null),
                        (o.subtreeFlags = 0),
                        (o.memoizedProps = null),
                        (o.memoizedState = null),
                        (o.updateQueue = null),
                        (o.dependencies = null),
                        (o.stateNode = null))
                      : ((o.childLanes = a.childLanes),
                        (o.lanes = a.lanes),
                        (o.child = a.child),
                        (o.subtreeFlags = 0),
                        (o.deletions = null),
                        (o.memoizedProps = a.memoizedProps),
                        (o.memoizedState = a.memoizedState),
                        (o.updateQueue = a.updateQueue),
                        (o.type = a.type),
                        (e = a.dependencies),
                        (o.dependencies =
                          e === null ? null : { lanes: e.lanes, firstContext: e.firstContext })),
                    (n = n.sibling);
                return Ae(Je, (Je.current & 1) | 2), t.child;
              }
              e = e.sibling;
            }
          o.tail !== null &&
            st() > Ao &&
            ((t.flags |= 128), (r = !0), ca(o, !1), (t.lanes = 4194304));
        }
      else {
        if (!r)
          if (((e = Ys(a)), e !== null)) {
            if (
              ((t.flags |= 128),
              (r = !0),
              (n = e.updateQueue),
              n !== null && ((t.updateQueue = n), (t.flags |= 4)),
              ca(o, !0),
              o.tail === null && o.tailMode === 'hidden' && !a.alternate && !qe)
            )
              return Dt(t), null;
          } else
            2 * st() - o.renderingStartTime > Ao &&
              n !== 1073741824 &&
              ((t.flags |= 128), (r = !0), ca(o, !1), (t.lanes = 4194304));
        o.isBackwards
          ? ((a.sibling = t.child), (t.child = a))
          : ((n = o.last), n !== null ? (n.sibling = a) : (t.child = a), (o.last = a));
      }
      return o.tail !== null
        ? ((t = o.tail),
          (o.rendering = t),
          (o.tail = t.sibling),
          (o.renderingStartTime = st()),
          (t.sibling = null),
          (n = Je.current),
          Ae(Je, r ? (n & 1) | 2 : n & 1),
          t)
        : (Dt(t), null);
    case 22:
    case 23:
      return (
        Nf(),
        (r = t.memoizedState !== null),
        e !== null && (e.memoizedState !== null) !== r && (t.flags |= 8192),
        r && t.mode & 1
          ? vn & 1073741824 && (Dt(t), t.subtreeFlags & 6 && (t.flags |= 8192))
          : Dt(t),
        null
      );
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(U(156, t.tag));
}
function zp(e, t) {
  switch ((pf(t), t.tag)) {
    case 1:
      return (
        sn(t.type) && Ws(), (e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 3:
      return (
        Fo(),
        He(ln),
        He(Wt),
        Ef(),
        (e = t.flags),
        e & 65536 && !(e & 128) ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 5:
      return bf(t), null;
    case 13:
      if ((He(Je), (e = t.memoizedState), e !== null && e.dehydrated !== null)) {
        if (t.alternate === null) throw Error(U(340));
        To();
      }
      return (e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null;
    case 19:
      return He(Je), null;
    case 4:
      return Fo(), null;
    case 10:
      return Cf(t.type._context), null;
    case 22:
    case 23:
      return Nf(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var es = !1,
  Ht = !1,
  Dp = typeof WeakSet == 'function' ? WeakSet : Set,
  G = null;
function Co(e, t) {
  var n = e.ref;
  if (n !== null)
    if (typeof n == 'function')
      try {
        n(null);
      } catch (r) {
        rt(e, t, r);
      }
    else n.current = null;
}
function A3(e, t, n) {
  try {
    n();
  } catch (r) {
    rt(e, t, r);
  }
}
var f4 = !1;
function Vp(e, t) {
  if (((S3 = Vs), (e = a1()), vf(e))) {
    if ('selectionStart' in e) var n = { start: e.selectionStart, end: e.selectionEnd };
    else
      e: {
        n = ((n = e.ownerDocument) && n.defaultView) || window;
        var r = n.getSelection && n.getSelection();
        if (r && r.rangeCount !== 0) {
          n = r.anchorNode;
          var i = r.anchorOffset,
            o = r.focusNode;
          r = r.focusOffset;
          try {
            n.nodeType, o.nodeType;
          } catch {
            n = null;
            break e;
          }
          var a = 0,
            l = -1,
            s = -1,
            u = 0,
            c = 0,
            f = e,
            v = null;
          t: for (;;) {
            for (
              var y;
              f !== n || (i !== 0 && f.nodeType !== 3) || (l = a + i),
                f !== o || (r !== 0 && f.nodeType !== 3) || (s = a + r),
                f.nodeType === 3 && (a += f.nodeValue.length),
                (y = f.firstChild) !== null;

            )
              (v = f), (f = y);
            for (;;) {
              if (f === e) break t;
              if (
                (v === n && ++u === i && (l = a),
                v === o && ++c === r && (s = a),
                (y = f.nextSibling) !== null)
              )
                break;
              (f = v), (v = f.parentNode);
            }
            f = y;
          }
          n = l === -1 || s === -1 ? null : { start: l, end: s };
        } else n = null;
      }
    n = n || { start: 0, end: 0 };
  } else n = null;
  for (x3 = { focusedElem: e, selectionRange: n }, Vs = !1, G = t; G !== null; )
    if (((t = G), (e = t.child), (t.subtreeFlags & 1028) !== 0 && e !== null))
      (e.return = t), (G = e);
    else
      for (; G !== null; ) {
        t = G;
        try {
          var g = t.alternate;
          if (t.flags & 1024)
            switch (t.tag) {
              case 0:
              case 11:
              case 15:
                break;
              case 1:
                if (g !== null) {
                  var C = g.memoizedProps,
                    w = g.memoizedState,
                    p = t.stateNode,
                    m = p.getSnapshotBeforeUpdate(t.elementType === t.type ? C : Un(t.type, C), w);
                  p.__reactInternalSnapshotBeforeUpdate = m;
                }
                break;
              case 3:
                var h = t.stateNode.containerInfo;
                h.nodeType === 1
                  ? (h.textContent = '')
                  : h.nodeType === 9 && h.documentElement && h.removeChild(h.documentElement);
                break;
              case 5:
              case 6:
              case 4:
              case 17:
                break;
              default:
                throw Error(U(163));
            }
        } catch (S) {
          rt(t, t.return, S);
        }
        if (((e = t.sibling), e !== null)) {
          (e.return = t.return), (G = e);
          break;
        }
        G = t.return;
      }
  return (g = f4), (f4 = !1), g;
}
function Ia(e, t, n) {
  var r = t.updateQueue;
  if (((r = r !== null ? r.lastEffect : null), r !== null)) {
    var i = (r = r.next);
    do {
      if ((i.tag & e) === e) {
        var o = i.destroy;
        (i.destroy = void 0), o !== void 0 && A3(t, n, o);
      }
      i = i.next;
    } while (i !== r);
  }
}
function Ru(e, t) {
  if (((t = t.updateQueue), (t = t !== null ? t.lastEffect : null), t !== null)) {
    var n = (t = t.next);
    do {
      if ((n.tag & e) === e) {
        var r = n.create;
        n.destroy = r();
      }
      n = n.next;
    } while (n !== t);
  }
}
function z3(e) {
  var t = e.ref;
  if (t !== null) {
    var n = e.stateNode;
    switch (e.tag) {
      case 5:
        e = n;
        break;
      default:
        e = n;
    }
    typeof t == 'function' ? t(e) : (t.current = e);
  }
}
function n7(e) {
  var t = e.alternate;
  t !== null && ((e.alternate = null), n7(t)),
    (e.child = null),
    (e.deletions = null),
    (e.sibling = null),
    e.tag === 5 &&
      ((t = e.stateNode),
      t !== null && (delete t[lr], delete t[qa], delete t[k3], delete t[bp], delete t[Ep])),
    (e.stateNode = null),
    (e.return = null),
    (e.dependencies = null),
    (e.memoizedProps = null),
    (e.memoizedState = null),
    (e.pendingProps = null),
    (e.stateNode = null),
    (e.updateQueue = null);
}
function r7(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function d4(e) {
  e: for (;;) {
    for (; e.sibling === null; ) {
      if (e.return === null || r7(e.return)) return null;
      e = e.return;
    }
    for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
      if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
      (e.child.return = e), (e = e.child);
    }
    if (!(e.flags & 2)) return e.stateNode;
  }
}
function D3(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6)
    (e = e.stateNode),
      t
        ? n.nodeType === 8
          ? n.parentNode.insertBefore(e, t)
          : n.insertBefore(e, t)
        : (n.nodeType === 8
            ? ((t = n.parentNode), t.insertBefore(e, n))
            : ((t = n), t.appendChild(e)),
          (n = n._reactRootContainer),
          n != null || t.onclick !== null || (t.onclick = Us));
  else if (r !== 4 && ((e = e.child), e !== null))
    for (D3(e, t, n), e = e.sibling; e !== null; ) D3(e, t, n), (e = e.sibling);
}
function V3(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6) (e = e.stateNode), t ? n.insertBefore(e, t) : n.appendChild(e);
  else if (r !== 4 && ((e = e.child), e !== null))
    for (V3(e, t, n), e = e.sibling; e !== null; ) V3(e, t, n), (e = e.sibling);
}
var Ot = null,
  Wn = !1;
function zr(e, t, n) {
  for (n = n.child; n !== null; ) i7(e, t, n), (n = n.sibling);
}
function i7(e, t, n) {
  if (ur && typeof ur.onCommitFiberUnmount == 'function')
    try {
      ur.onCommitFiberUnmount(wu, n);
    } catch {}
  switch (n.tag) {
    case 5:
      Ht || Co(n, t);
    case 6:
      var r = Ot,
        i = Wn;
      (Ot = null),
        zr(e, t, n),
        (Ot = r),
        (Wn = i),
        Ot !== null &&
          (Wn
            ? ((e = Ot),
              (n = n.stateNode),
              e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n))
            : Ot.removeChild(n.stateNode));
      break;
    case 18:
      Ot !== null &&
        (Wn
          ? ((e = Ot),
            (n = n.stateNode),
            e.nodeType === 8 ? kc(e.parentNode, n) : e.nodeType === 1 && kc(e, n),
            Ua(e))
          : kc(Ot, n.stateNode));
      break;
    case 4:
      (r = Ot),
        (i = Wn),
        (Ot = n.stateNode.containerInfo),
        (Wn = !0),
        zr(e, t, n),
        (Ot = r),
        (Wn = i);
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (!Ht && ((r = n.updateQueue), r !== null && ((r = r.lastEffect), r !== null))) {
        i = r = r.next;
        do {
          var o = i,
            a = o.destroy;
          (o = o.tag), a !== void 0 && (o & 2 || o & 4) && A3(n, t, a), (i = i.next);
        } while (i !== r);
      }
      zr(e, t, n);
      break;
    case 1:
      if (!Ht && (Co(n, t), (r = n.stateNode), typeof r.componentWillUnmount == 'function'))
        try {
          (r.props = n.memoizedProps), (r.state = n.memoizedState), r.componentWillUnmount();
        } catch (l) {
          rt(n, t, l);
        }
      zr(e, t, n);
      break;
    case 21:
      zr(e, t, n);
      break;
    case 22:
      n.mode & 1
        ? ((Ht = (r = Ht) || n.memoizedState !== null), zr(e, t, n), (Ht = r))
        : zr(e, t, n);
      break;
    default:
      zr(e, t, n);
  }
}
function v4(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var n = e.stateNode;
    n === null && (n = e.stateNode = new Dp()),
      t.forEach(function (r) {
        var i = Qp.bind(null, e, r);
        n.has(r) || (n.add(r), r.then(i, i));
      });
  }
}
function Hn(e, t) {
  var n = t.deletions;
  if (n !== null)
    for (var r = 0; r < n.length; r++) {
      var i = n[r];
      try {
        var o = e,
          a = t,
          l = a;
        e: for (; l !== null; ) {
          switch (l.tag) {
            case 5:
              (Ot = l.stateNode), (Wn = !1);
              break e;
            case 3:
              (Ot = l.stateNode.containerInfo), (Wn = !0);
              break e;
            case 4:
              (Ot = l.stateNode.containerInfo), (Wn = !0);
              break e;
          }
          l = l.return;
        }
        if (Ot === null) throw Error(U(160));
        i7(o, a, i), (Ot = null), (Wn = !1);
        var s = i.alternate;
        s !== null && (s.return = null), (i.return = null);
      } catch (u) {
        rt(i, t, u);
      }
    }
  if (t.subtreeFlags & 12854) for (t = t.child; t !== null; ) o7(t, e), (t = t.sibling);
}
function o7(e, t) {
  var n = e.alternate,
    r = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if ((Hn(t, e), ir(e), r & 4)) {
        try {
          Ia(3, e, e.return), Ru(3, e);
        } catch (C) {
          rt(e, e.return, C);
        }
        try {
          Ia(5, e, e.return);
        } catch (C) {
          rt(e, e.return, C);
        }
      }
      break;
    case 1:
      Hn(t, e), ir(e), r & 512 && n !== null && Co(n, n.return);
      break;
    case 5:
      if ((Hn(t, e), ir(e), r & 512 && n !== null && Co(n, n.return), e.flags & 32)) {
        var i = e.stateNode;
        try {
          Da(i, '');
        } catch (C) {
          rt(e, e.return, C);
        }
      }
      if (r & 4 && ((i = e.stateNode), i != null)) {
        var o = e.memoizedProps,
          a = n !== null ? n.memoizedProps : o,
          l = e.type,
          s = e.updateQueue;
        if (((e.updateQueue = null), s !== null))
          try {
            l === 'input' && o.type === 'radio' && o.name != null && M6(i, o), f3(l, a);
            var u = f3(l, o);
            for (a = 0; a < s.length; a += 2) {
              var c = s[a],
                f = s[a + 1];
              c === 'style'
                ? O6(i, f)
                : c === 'dangerouslySetInnerHTML'
                  ? I6(i, f)
                  : c === 'children'
                    ? Da(i, f)
                    : J2(i, c, f, u);
            }
            switch (l) {
              case 'input':
                a3(i, o);
                break;
              case 'textarea':
                R6(i, o);
                break;
              case 'select':
                var v = i._wrapperState.wasMultiple;
                i._wrapperState.wasMultiple = !!o.multiple;
                var y = o.value;
                y != null
                  ? ko(i, !!o.multiple, y, !1)
                  : v !== !!o.multiple &&
                    (o.defaultValue != null
                      ? ko(i, !!o.multiple, o.defaultValue, !0)
                      : ko(i, !!o.multiple, o.multiple ? [] : '', !1));
            }
            i[qa] = o;
          } catch (C) {
            rt(e, e.return, C);
          }
      }
      break;
    case 6:
      if ((Hn(t, e), ir(e), r & 4)) {
        if (e.stateNode === null) throw Error(U(162));
        (i = e.stateNode), (o = e.memoizedProps);
        try {
          i.nodeValue = o;
        } catch (C) {
          rt(e, e.return, C);
        }
      }
      break;
    case 3:
      if ((Hn(t, e), ir(e), r & 4 && n !== null && n.memoizedState.isDehydrated))
        try {
          Ua(t.containerInfo);
        } catch (C) {
          rt(e, e.return, C);
        }
      break;
    case 4:
      Hn(t, e), ir(e);
      break;
    case 13:
      Hn(t, e),
        ir(e),
        (i = e.child),
        i.flags & 8192 &&
          ((o = i.memoizedState !== null),
          (i.stateNode.isHidden = o),
          !o || (i.alternate !== null && i.alternate.memoizedState !== null) || ($f = st())),
        r & 4 && v4(e);
      break;
    case 22:
      if (
        ((c = n !== null && n.memoizedState !== null),
        e.mode & 1 ? ((Ht = (u = Ht) || c), Hn(t, e), (Ht = u)) : Hn(t, e),
        ir(e),
        r & 8192)
      ) {
        if (((u = e.memoizedState !== null), (e.stateNode.isHidden = u) && !c && e.mode & 1))
          for (G = e, c = e.child; c !== null; ) {
            for (f = G = c; G !== null; ) {
              switch (((v = G), (y = v.child), v.tag)) {
                case 0:
                case 11:
                case 14:
                case 15:
                  Ia(4, v, v.return);
                  break;
                case 1:
                  Co(v, v.return);
                  var g = v.stateNode;
                  if (typeof g.componentWillUnmount == 'function') {
                    (r = v), (n = v.return);
                    try {
                      (t = r),
                        (g.props = t.memoizedProps),
                        (g.state = t.memoizedState),
                        g.componentWillUnmount();
                    } catch (C) {
                      rt(r, n, C);
                    }
                  }
                  break;
                case 5:
                  Co(v, v.return);
                  break;
                case 22:
                  if (v.memoizedState !== null) {
                    p4(f);
                    continue;
                  }
              }
              y !== null ? ((y.return = v), (G = y)) : p4(f);
            }
            c = c.sibling;
          }
        e: for (c = null, f = e; ; ) {
          if (f.tag === 5) {
            if (c === null) {
              c = f;
              try {
                (i = f.stateNode),
                  u
                    ? ((o = i.style),
                      typeof o.setProperty == 'function'
                        ? o.setProperty('display', 'none', 'important')
                        : (o.display = 'none'))
                    : ((l = f.stateNode),
                      (s = f.memoizedProps.style),
                      (a = s != null && s.hasOwnProperty('display') ? s.display : null),
                      (l.style.display = _6('display', a)));
              } catch (C) {
                rt(e, e.return, C);
              }
            }
          } else if (f.tag === 6) {
            if (c === null)
              try {
                f.stateNode.nodeValue = u ? '' : f.memoizedProps;
              } catch (C) {
                rt(e, e.return, C);
              }
          } else if (
            ((f.tag !== 22 && f.tag !== 23) || f.memoizedState === null || f === e) &&
            f.child !== null
          ) {
            (f.child.return = f), (f = f.child);
            continue;
          }
          if (f === e) break e;
          for (; f.sibling === null; ) {
            if (f.return === null || f.return === e) break e;
            c === f && (c = null), (f = f.return);
          }
          c === f && (c = null), (f.sibling.return = f.return), (f = f.sibling);
        }
      }
      break;
    case 19:
      Hn(t, e), ir(e), r & 4 && v4(e);
      break;
    case 21:
      break;
    default:
      Hn(t, e), ir(e);
  }
}
function ir(e) {
  var t = e.flags;
  if (t & 2) {
    try {
      e: {
        for (var n = e.return; n !== null; ) {
          if (r7(n)) {
            var r = n;
            break e;
          }
          n = n.return;
        }
        throw Error(U(160));
      }
      switch (r.tag) {
        case 5:
          var i = r.stateNode;
          r.flags & 32 && (Da(i, ''), (r.flags &= -33));
          var o = d4(e);
          V3(e, o, i);
          break;
        case 3:
        case 4:
          var a = r.stateNode.containerInfo,
            l = d4(e);
          D3(e, l, a);
          break;
        default:
          throw Error(U(161));
      }
    } catch (s) {
      rt(e, e.return, s);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function Hp(e, t, n) {
  (G = e), a7(e);
}
function a7(e, t, n) {
  for (var r = (e.mode & 1) !== 0; G !== null; ) {
    var i = G,
      o = i.child;
    if (i.tag === 22 && r) {
      var a = i.memoizedState !== null || es;
      if (!a) {
        var l = i.alternate,
          s = (l !== null && l.memoizedState !== null) || Ht;
        l = es;
        var u = Ht;
        if (((es = a), (Ht = s) && !u))
          for (G = i; G !== null; )
            (a = G),
              (s = a.child),
              a.tag === 22 && a.memoizedState !== null
                ? h4(i)
                : s !== null
                  ? ((s.return = a), (G = s))
                  : h4(i);
        for (; o !== null; ) (G = o), a7(o), (o = o.sibling);
        (G = i), (es = l), (Ht = u);
      }
      m4(e);
    } else i.subtreeFlags & 8772 && o !== null ? ((o.return = i), (G = o)) : m4(e);
  }
}
function m4(e) {
  for (; G !== null; ) {
    var t = G;
    if (t.flags & 8772) {
      var n = t.alternate;
      try {
        if (t.flags & 8772)
          switch (t.tag) {
            case 0:
            case 11:
            case 15:
              Ht || Ru(5, t);
              break;
            case 1:
              var r = t.stateNode;
              if (t.flags & 4 && !Ht)
                if (n === null) r.componentDidMount();
                else {
                  var i = t.elementType === t.type ? n.memoizedProps : Un(t.type, n.memoizedProps);
                  r.componentDidUpdate(i, n.memoizedState, r.__reactInternalSnapshotBeforeUpdate);
                }
              var o = t.updateQueue;
              o !== null && Yd(t, o, r);
              break;
            case 3:
              var a = t.updateQueue;
              if (a !== null) {
                if (((n = null), t.child !== null))
                  switch (t.child.tag) {
                    case 5:
                      n = t.child.stateNode;
                      break;
                    case 1:
                      n = t.child.stateNode;
                  }
                Yd(t, a, n);
              }
              break;
            case 5:
              var l = t.stateNode;
              if (n === null && t.flags & 4) {
                n = l;
                var s = t.memoizedProps;
                switch (t.type) {
                  case 'button':
                  case 'input':
                  case 'select':
                  case 'textarea':
                    s.autoFocus && n.focus();
                    break;
                  case 'img':
                    s.src && (n.src = s.src);
                }
              }
              break;
            case 6:
              break;
            case 4:
              break;
            case 12:
              break;
            case 13:
              if (t.memoizedState === null) {
                var u = t.alternate;
                if (u !== null) {
                  var c = u.memoizedState;
                  if (c !== null) {
                    var f = c.dehydrated;
                    f !== null && Ua(f);
                  }
                }
              }
              break;
            case 19:
            case 17:
            case 21:
            case 22:
            case 23:
            case 25:
              break;
            default:
              throw Error(U(163));
          }
        Ht || (t.flags & 512 && z3(t));
      } catch (v) {
        rt(t, t.return, v);
      }
    }
    if (t === e) {
      G = null;
      break;
    }
    if (((n = t.sibling), n !== null)) {
      (n.return = t.return), (G = n);
      break;
    }
    G = t.return;
  }
}
function p4(e) {
  for (; G !== null; ) {
    var t = G;
    if (t === e) {
      G = null;
      break;
    }
    var n = t.sibling;
    if (n !== null) {
      (n.return = t.return), (G = n);
      break;
    }
    G = t.return;
  }
}
function h4(e) {
  for (; G !== null; ) {
    var t = G;
    try {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          var n = t.return;
          try {
            Ru(4, t);
          } catch (s) {
            rt(t, n, s);
          }
          break;
        case 1:
          var r = t.stateNode;
          if (typeof r.componentDidMount == 'function') {
            var i = t.return;
            try {
              r.componentDidMount();
            } catch (s) {
              rt(t, i, s);
            }
          }
          var o = t.return;
          try {
            z3(t);
          } catch (s) {
            rt(t, o, s);
          }
          break;
        case 5:
          var a = t.return;
          try {
            z3(t);
          } catch (s) {
            rt(t, a, s);
          }
      }
    } catch (s) {
      rt(t, t.return, s);
    }
    if (t === e) {
      G = null;
      break;
    }
    var l = t.sibling;
    if (l !== null) {
      (l.return = t.return), (G = l);
      break;
    }
    G = t.return;
  }
}
var Bp = Math.ceil,
  tu = Nr.ReactCurrentDispatcher,
  _f = Nr.ReactCurrentOwner,
  Nn = Nr.ReactCurrentBatchConfig,
  Se = 0,
  Pt = null,
  vt = null,
  $t = 0,
  vn = 0,
  wo = fi(0),
  wt = 0,
  tl = null,
  Fi = 0,
  Lu = 0,
  Of = 0,
  _a = null,
  rn = null,
  $f = 0,
  Ao = 1 / 0,
  xr = null,
  nu = !1,
  H3 = null,
  ii = null,
  ts = !1,
  Zr = null,
  ru = 0,
  Oa = 0,
  B3 = null,
  Es = -1,
  ks = 0;
function Qt() {
  return Se & 6 ? st() : Es !== -1 ? Es : (Es = st());
}
function oi(e) {
  return e.mode & 1
    ? Se & 2 && $t !== 0
      ? $t & -$t
      : Pp.transition !== null
        ? (ks === 0 && (ks = U6()), ks)
        : ((e = Re), e !== 0 || ((e = window.event), (e = e === void 0 ? 16 : X6(e.type))), e)
    : 1;
}
function Qn(e, t, n, r) {
  if (50 < Oa) throw ((Oa = 0), (B3 = null), Error(U(185)));
  wl(e, n, r),
    (!(Se & 2) || e !== Pt) &&
      (e === Pt && (!(Se & 2) && (Lu |= n), wt === 4 && Wr(e, $t)),
      un(e, r),
      n === 1 && Se === 0 && !(t.mode & 1) && ((Ao = st() + 500), ku && di()));
}
function un(e, t) {
  var n = e.callbackNode;
  Pm(e, t);
  var r = Ds(e, e === Pt ? $t : 0);
  if (r === 0) n !== null && kd(n), (e.callbackNode = null), (e.callbackPriority = 0);
  else if (((t = r & -r), e.callbackPriority !== t)) {
    if ((n != null && kd(n), t === 1))
      e.tag === 0 ? kp(g4.bind(null, e)) : h1(g4.bind(null, e)),
        Sp(function () {
          !(Se & 6) && di();
        }),
        (n = null);
    else {
      switch (W6(r)) {
        case 1:
          n = of;
          break;
        case 4:
          n = H6;
          break;
        case 16:
          n = zs;
          break;
        case 536870912:
          n = B6;
          break;
        default:
          n = zs;
      }
      n = m7(n, l7.bind(null, e));
    }
    (e.callbackPriority = t), (e.callbackNode = n);
  }
}
function l7(e, t) {
  if (((Es = -1), (ks = 0), Se & 6)) throw Error(U(327));
  var n = e.callbackNode;
  if (Io() && e.callbackNode !== n) return null;
  var r = Ds(e, e === Pt ? $t : 0);
  if (r === 0) return null;
  if (r & 30 || r & e.expiredLanes || t) t = iu(e, r);
  else {
    t = r;
    var i = Se;
    Se |= 2;
    var o = u7();
    (Pt !== e || $t !== t) && ((xr = null), (Ao = st() + 500), Ii(e, t));
    do
      try {
        Kp();
        break;
      } catch (l) {
        s7(e, l);
      }
    while (!0);
    yf(), (tu.current = o), (Se = i), vt !== null ? (t = 0) : ((Pt = null), ($t = 0), (t = wt));
  }
  if (t !== 0) {
    if ((t === 2 && ((i = h3(e)), i !== 0 && ((r = i), (t = U3(e, i)))), t === 1))
      throw ((n = tl), Ii(e, 0), Wr(e, r), un(e, st()), n);
    if (t === 6) Wr(e, r);
    else {
      if (
        ((i = e.current.alternate),
        !(r & 30) &&
          !Up(i) &&
          ((t = iu(e, r)), t === 2 && ((o = h3(e)), o !== 0 && ((r = o), (t = U3(e, o)))), t === 1))
      )
        throw ((n = tl), Ii(e, 0), Wr(e, r), un(e, st()), n);
      switch (((e.finishedWork = i), (e.finishedLanes = r), t)) {
        case 0:
        case 1:
          throw Error(U(345));
        case 2:
          bi(e, rn, xr);
          break;
        case 3:
          if ((Wr(e, r), (r & 130023424) === r && ((t = $f + 500 - st()), 10 < t))) {
            if (Ds(e, 0) !== 0) break;
            if (((i = e.suspendedLanes), (i & r) !== r)) {
              Qt(), (e.pingedLanes |= e.suspendedLanes & i);
              break;
            }
            e.timeoutHandle = E3(bi.bind(null, e, rn, xr), t);
            break;
          }
          bi(e, rn, xr);
          break;
        case 4:
          if ((Wr(e, r), (r & 4194240) === r)) break;
          for (t = e.eventTimes, i = -1; 0 < r; ) {
            var a = 31 - qn(r);
            (o = 1 << a), (a = t[a]), a > i && (i = a), (r &= ~o);
          }
          if (
            ((r = i),
            (r = st() - r),
            (r =
              (120 > r
                ? 120
                : 480 > r
                  ? 480
                  : 1080 > r
                    ? 1080
                    : 1920 > r
                      ? 1920
                      : 3e3 > r
                        ? 3e3
                        : 4320 > r
                          ? 4320
                          : 1960 * Bp(r / 1960)) - r),
            10 < r)
          ) {
            e.timeoutHandle = E3(bi.bind(null, e, rn, xr), r);
            break;
          }
          bi(e, rn, xr);
          break;
        case 5:
          bi(e, rn, xr);
          break;
        default:
          throw Error(U(329));
      }
    }
  }
  return un(e, st()), e.callbackNode === n ? l7.bind(null, e) : null;
}
function U3(e, t) {
  var n = _a;
  return (
    e.current.memoizedState.isDehydrated && (Ii(e, t).flags |= 256),
    (e = iu(e, t)),
    e !== 2 && ((t = rn), (rn = n), t !== null && W3(t)),
    e
  );
}
function W3(e) {
  rn === null ? (rn = e) : rn.push.apply(rn, e);
}
function Up(e) {
  for (var t = e; ; ) {
    if (t.flags & 16384) {
      var n = t.updateQueue;
      if (n !== null && ((n = n.stores), n !== null))
        for (var r = 0; r < n.length; r++) {
          var i = n[r],
            o = i.getSnapshot;
          i = i.value;
          try {
            if (!Jn(o(), i)) return !1;
          } catch {
            return !1;
          }
        }
    }
    if (((n = t.child), t.subtreeFlags & 16384 && n !== null)) (n.return = t), (t = n);
    else {
      if (t === e) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return !0;
        t = t.return;
      }
      (t.sibling.return = t.return), (t = t.sibling);
    }
  }
  return !0;
}
function Wr(e, t) {
  for (
    t &= ~Of, t &= ~Lu, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes;
    0 < t;

  ) {
    var n = 31 - qn(t),
      r = 1 << n;
    (e[n] = -1), (t &= ~r);
  }
}
function g4(e) {
  if (Se & 6) throw Error(U(327));
  Io();
  var t = Ds(e, 0);
  if (!(t & 1)) return un(e, st()), null;
  var n = iu(e, t);
  if (e.tag !== 0 && n === 2) {
    var r = h3(e);
    r !== 0 && ((t = r), (n = U3(e, r)));
  }
  if (n === 1) throw ((n = tl), Ii(e, 0), Wr(e, t), un(e, st()), n);
  if (n === 6) throw Error(U(345));
  return (
    (e.finishedWork = e.current.alternate), (e.finishedLanes = t), bi(e, rn, xr), un(e, st()), null
  );
}
function Tf(e, t) {
  var n = Se;
  Se |= 1;
  try {
    return e(t);
  } finally {
    (Se = n), Se === 0 && ((Ao = st() + 500), ku && di());
  }
}
function ji(e) {
  Zr !== null && Zr.tag === 0 && !(Se & 6) && Io();
  var t = Se;
  Se |= 1;
  var n = Nn.transition,
    r = Re;
  try {
    if (((Nn.transition = null), (Re = 1), e)) return e();
  } finally {
    (Re = r), (Nn.transition = n), (Se = t), !(Se & 6) && di();
  }
}
function Nf() {
  (vn = wo.current), He(wo);
}
function Ii(e, t) {
  (e.finishedWork = null), (e.finishedLanes = 0);
  var n = e.timeoutHandle;
  if ((n !== -1 && ((e.timeoutHandle = -1), wp(n)), vt !== null))
    for (n = vt.return; n !== null; ) {
      var r = n;
      switch ((pf(r), r.tag)) {
        case 1:
          (r = r.type.childContextTypes), r != null && Ws();
          break;
        case 3:
          Fo(), He(ln), He(Wt), Ef();
          break;
        case 5:
          bf(r);
          break;
        case 4:
          Fo();
          break;
        case 13:
          He(Je);
          break;
        case 19:
          He(Je);
          break;
        case 10:
          Cf(r.type._context);
          break;
        case 22:
        case 23:
          Nf();
      }
      n = n.return;
    }
  if (
    ((Pt = e),
    (vt = e = ai(e.current, null)),
    ($t = vn = t),
    (wt = 0),
    (tl = null),
    (Of = Lu = Fi = 0),
    (rn = _a = null),
    Pi !== null)
  ) {
    for (t = 0; t < Pi.length; t++)
      if (((n = Pi[t]), (r = n.interleaved), r !== null)) {
        n.interleaved = null;
        var i = r.next,
          o = n.pending;
        if (o !== null) {
          var a = o.next;
          (o.next = i), (r.next = a);
        }
        n.pending = r;
      }
    Pi = null;
  }
  return e;
}
function s7(e, t) {
  do {
    var n = vt;
    try {
      if ((yf(), (Ss.current = eu), Js)) {
        for (var r = et.memoizedState; r !== null; ) {
          var i = r.queue;
          i !== null && (i.pending = null), (r = r.next);
        }
        Js = !1;
      }
      if (
        ((Ni = 0),
        (kt = Ct = et = null),
        (La = !1),
        (Ya = 0),
        (_f.current = null),
        n === null || n.return === null)
      ) {
        (wt = 1), (tl = t), (vt = null);
        break;
      }
      e: {
        var o = e,
          a = n.return,
          l = n,
          s = t;
        if (
          ((t = $t),
          (l.flags |= 32768),
          s !== null && typeof s == 'object' && typeof s.then == 'function')
        ) {
          var u = s,
            c = l,
            f = c.tag;
          if (!(c.mode & 1) && (f === 0 || f === 11 || f === 15)) {
            var v = c.alternate;
            v
              ? ((c.updateQueue = v.updateQueue),
                (c.memoizedState = v.memoizedState),
                (c.lanes = v.lanes))
              : ((c.updateQueue = null), (c.memoizedState = null));
          }
          var y = i4(a);
          if (y !== null) {
            (y.flags &= -257), o4(y, a, l, o, t), y.mode & 1 && r4(o, u, t), (t = y), (s = u);
            var g = t.updateQueue;
            if (g === null) {
              var C = new Set();
              C.add(s), (t.updateQueue = C);
            } else g.add(s);
            break e;
          } else {
            if (!(t & 1)) {
              r4(o, u, t), Ff();
              break e;
            }
            s = Error(U(426));
          }
        } else if (qe && l.mode & 1) {
          var w = i4(a);
          if (w !== null) {
            !(w.flags & 65536) && (w.flags |= 256), o4(w, a, l, o, t), hf(jo(s, l));
            break e;
          }
        }
        (o = s = jo(s, l)), wt !== 4 && (wt = 2), _a === null ? (_a = [o]) : _a.push(o), (o = a);
        do {
          switch (o.tag) {
            case 3:
              (o.flags |= 65536), (t &= -t), (o.lanes |= t);
              var p = W1(o, s, t);
              Xd(o, p);
              break e;
            case 1:
              l = s;
              var m = o.type,
                h = o.stateNode;
              if (
                !(o.flags & 128) &&
                (typeof m.getDerivedStateFromError == 'function' ||
                  (h !== null &&
                    typeof h.componentDidCatch == 'function' &&
                    (ii === null || !ii.has(h))))
              ) {
                (o.flags |= 65536), (t &= -t), (o.lanes |= t);
                var S = K1(o, l, t);
                Xd(o, S);
                break e;
              }
          }
          o = o.return;
        } while (o !== null);
      }
      f7(n);
    } catch (x) {
      (t = x), vt === n && n !== null && (vt = n = n.return);
      continue;
    }
    break;
  } while (!0);
}
function u7() {
  var e = tu.current;
  return (tu.current = eu), e === null ? eu : e;
}
function Ff() {
  (wt === 0 || wt === 3 || wt === 2) && (wt = 4),
    Pt === null || (!(Fi & 268435455) && !(Lu & 268435455)) || Wr(Pt, $t);
}
function iu(e, t) {
  var n = Se;
  Se |= 2;
  var r = u7();
  (Pt !== e || $t !== t) && ((xr = null), Ii(e, t));
  do
    try {
      Wp();
      break;
    } catch (i) {
      s7(e, i);
    }
  while (!0);
  if ((yf(), (Se = n), (tu.current = r), vt !== null)) throw Error(U(261));
  return (Pt = null), ($t = 0), wt;
}
function Wp() {
  for (; vt !== null; ) c7(vt);
}
function Kp() {
  for (; vt !== null && !gm(); ) c7(vt);
}
function c7(e) {
  var t = v7(e.alternate, e, vn);
  (e.memoizedProps = e.pendingProps), t === null ? f7(e) : (vt = t), (_f.current = null);
}
function f7(e) {
  var t = e;
  do {
    var n = t.alternate;
    if (((e = t.return), t.flags & 32768)) {
      if (((n = zp(n, t)), n !== null)) {
        (n.flags &= 32767), (vt = n);
        return;
      }
      if (e !== null) (e.flags |= 32768), (e.subtreeFlags = 0), (e.deletions = null);
      else {
        (wt = 6), (vt = null);
        return;
      }
    } else if (((n = Ap(n, t, vn)), n !== null)) {
      vt = n;
      return;
    }
    if (((t = t.sibling), t !== null)) {
      vt = t;
      return;
    }
    vt = t = e;
  } while (t !== null);
  wt === 0 && (wt = 5);
}
function bi(e, t, n) {
  var r = Re,
    i = Nn.transition;
  try {
    (Nn.transition = null), (Re = 1), Zp(e, t, n, r);
  } finally {
    (Nn.transition = i), (Re = r);
  }
  return null;
}
function Zp(e, t, n, r) {
  do Io();
  while (Zr !== null);
  if (Se & 6) throw Error(U(327));
  n = e.finishedWork;
  var i = e.finishedLanes;
  if (n === null) return null;
  if (((e.finishedWork = null), (e.finishedLanes = 0), n === e.current)) throw Error(U(177));
  (e.callbackNode = null), (e.callbackPriority = 0);
  var o = n.lanes | n.childLanes;
  if (
    (Mm(e, o),
    e === Pt && ((vt = Pt = null), ($t = 0)),
    (!(n.subtreeFlags & 2064) && !(n.flags & 2064)) ||
      ts ||
      ((ts = !0),
      m7(zs, function () {
        return Io(), null;
      })),
    (o = (n.flags & 15990) !== 0),
    n.subtreeFlags & 15990 || o)
  ) {
    (o = Nn.transition), (Nn.transition = null);
    var a = Re;
    Re = 1;
    var l = Se;
    (Se |= 4),
      (_f.current = null),
      Vp(e, n),
      o7(n, e),
      vp(x3),
      (Vs = !!S3),
      (x3 = S3 = null),
      (e.current = n),
      Hp(n),
      ym(),
      (Se = l),
      (Re = a),
      (Nn.transition = o);
  } else e.current = n;
  if (
    (ts && ((ts = !1), (Zr = e), (ru = i)),
    (o = e.pendingLanes),
    o === 0 && (ii = null),
    Sm(n.stateNode),
    un(e, st()),
    t !== null)
  )
    for (r = e.onRecoverableError, n = 0; n < t.length; n++)
      (i = t[n]), r(i.value, { componentStack: i.stack, digest: i.digest });
  if (nu) throw ((nu = !1), (e = H3), (H3 = null), e);
  return (
    ru & 1 && e.tag !== 0 && Io(),
    (o = e.pendingLanes),
    o & 1 ? (e === B3 ? Oa++ : ((Oa = 0), (B3 = e))) : (Oa = 0),
    di(),
    null
  );
}
function Io() {
  if (Zr !== null) {
    var e = W6(ru),
      t = Nn.transition,
      n = Re;
    try {
      if (((Nn.transition = null), (Re = 16 > e ? 16 : e), Zr === null)) var r = !1;
      else {
        if (((e = Zr), (Zr = null), (ru = 0), Se & 6)) throw Error(U(331));
        var i = Se;
        for (Se |= 4, G = e.current; G !== null; ) {
          var o = G,
            a = o.child;
          if (G.flags & 16) {
            var l = o.deletions;
            if (l !== null) {
              for (var s = 0; s < l.length; s++) {
                var u = l[s];
                for (G = u; G !== null; ) {
                  var c = G;
                  switch (c.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Ia(8, c, o);
                  }
                  var f = c.child;
                  if (f !== null) (f.return = c), (G = f);
                  else
                    for (; G !== null; ) {
                      c = G;
                      var v = c.sibling,
                        y = c.return;
                      if ((n7(c), c === u)) {
                        G = null;
                        break;
                      }
                      if (v !== null) {
                        (v.return = y), (G = v);
                        break;
                      }
                      G = y;
                    }
                }
              }
              var g = o.alternate;
              if (g !== null) {
                var C = g.child;
                if (C !== null) {
                  g.child = null;
                  do {
                    var w = C.sibling;
                    (C.sibling = null), (C = w);
                  } while (C !== null);
                }
              }
              G = o;
            }
          }
          if (o.subtreeFlags & 2064 && a !== null) (a.return = o), (G = a);
          else
            e: for (; G !== null; ) {
              if (((o = G), o.flags & 2048))
                switch (o.tag) {
                  case 0:
                  case 11:
                  case 15:
                    Ia(9, o, o.return);
                }
              var p = o.sibling;
              if (p !== null) {
                (p.return = o.return), (G = p);
                break e;
              }
              G = o.return;
            }
        }
        var m = e.current;
        for (G = m; G !== null; ) {
          a = G;
          var h = a.child;
          if (a.subtreeFlags & 2064 && h !== null) (h.return = a), (G = h);
          else
            e: for (a = m; G !== null; ) {
              if (((l = G), l.flags & 2048))
                try {
                  switch (l.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Ru(9, l);
                  }
                } catch (x) {
                  rt(l, l.return, x);
                }
              if (l === a) {
                G = null;
                break e;
              }
              var S = l.sibling;
              if (S !== null) {
                (S.return = l.return), (G = S);
                break e;
              }
              G = l.return;
            }
        }
        if (((Se = i), di(), ur && typeof ur.onPostCommitFiberRoot == 'function'))
          try {
            ur.onPostCommitFiberRoot(wu, e);
          } catch {}
        r = !0;
      }
      return r;
    } finally {
      (Re = n), (Nn.transition = t);
    }
  }
  return !1;
}
function y4(e, t, n) {
  (t = jo(n, t)),
    (t = W1(e, t, 1)),
    (e = ri(e, t, 1)),
    (t = Qt()),
    e !== null && (wl(e, 1, t), un(e, t));
}
function rt(e, t, n) {
  if (e.tag === 3) y4(e, e, n);
  else
    for (; t !== null; ) {
      if (t.tag === 3) {
        y4(t, e, n);
        break;
      } else if (t.tag === 1) {
        var r = t.stateNode;
        if (
          typeof t.type.getDerivedStateFromError == 'function' ||
          (typeof r.componentDidCatch == 'function' && (ii === null || !ii.has(r)))
        ) {
          (e = jo(n, e)),
            (e = K1(t, e, 1)),
            (t = ri(t, e, 1)),
            (e = Qt()),
            t !== null && (wl(t, 1, e), un(t, e));
          break;
        }
      }
      t = t.return;
    }
}
function Gp(e, t, n) {
  var r = e.pingCache;
  r !== null && r.delete(t),
    (t = Qt()),
    (e.pingedLanes |= e.suspendedLanes & n),
    Pt === e &&
      ($t & n) === n &&
      (wt === 4 || (wt === 3 && ($t & 130023424) === $t && 500 > st() - $f) ? Ii(e, 0) : (Of |= n)),
    un(e, t);
}
function d7(e, t) {
  t === 0 && (e.mode & 1 ? ((t = Wl), (Wl <<= 1), !(Wl & 130023424) && (Wl = 4194304)) : (t = 1));
  var n = Qt();
  (e = Or(e, t)), e !== null && (wl(e, t, n), un(e, n));
}
function qp(e) {
  var t = e.memoizedState,
    n = 0;
  t !== null && (n = t.retryLane), d7(e, n);
}
function Qp(e, t) {
  var n = 0;
  switch (e.tag) {
    case 13:
      var r = e.stateNode,
        i = e.memoizedState;
      i !== null && (n = i.retryLane);
      break;
    case 19:
      r = e.stateNode;
      break;
    default:
      throw Error(U(314));
  }
  r !== null && r.delete(t), d7(e, n);
}
var v7;
v7 = function (e, t, n) {
  if (e !== null)
    if (e.memoizedProps !== t.pendingProps || ln.current) an = !0;
    else {
      if (!(e.lanes & n) && !(t.flags & 128)) return (an = !1), jp(e, t, n);
      an = !!(e.flags & 131072);
    }
  else (an = !1), qe && t.flags & 1048576 && g1(t, Gs, t.index);
  switch (((t.lanes = 0), t.tag)) {
    case 2:
      var r = t.type;
      bs(e, t), (e = t.pendingProps);
      var i = $o(t, Wt.current);
      Lo(t, n), (i = Pf(null, t, r, e, i, n));
      var o = Mf();
      return (
        (t.flags |= 1),
        typeof i == 'object' && i !== null && typeof i.render == 'function' && i.$$typeof === void 0
          ? ((t.tag = 1),
            (t.memoizedState = null),
            (t.updateQueue = null),
            sn(r) ? ((o = !0), Ks(t)) : (o = !1),
            (t.memoizedState = i.state !== null && i.state !== void 0 ? i.state : null),
            Sf(t),
            (i.updater = Mu),
            (t.stateNode = i),
            (i._reactInternals = t),
            _3(t, r, e, n),
            (t = T3(null, t, r, !0, o, n)))
          : ((t.tag = 0), qe && o && mf(t), Gt(null, t, i, n), (t = t.child)),
        t
      );
    case 16:
      r = t.elementType;
      e: {
        switch (
          (bs(e, t),
          (e = t.pendingProps),
          (i = r._init),
          (r = i(r._payload)),
          (t.type = r),
          (i = t.tag = Yp(r)),
          (e = Un(r, e)),
          i)
        ) {
          case 0:
            t = $3(null, t, r, e, n);
            break e;
          case 1:
            t = s4(null, t, r, e, n);
            break e;
          case 11:
            t = a4(null, t, r, e, n);
            break e;
          case 14:
            t = l4(null, t, r, Un(r.type, e), n);
            break e;
        }
        throw Error(U(306, r, ''));
      }
      return t;
    case 0:
      return (
        (r = t.type),
        (i = t.pendingProps),
        (i = t.elementType === r ? i : Un(r, i)),
        $3(e, t, r, i, n)
      );
    case 1:
      return (
        (r = t.type),
        (i = t.pendingProps),
        (i = t.elementType === r ? i : Un(r, i)),
        s4(e, t, r, i, n)
      );
    case 3:
      e: {
        if ((Q1(t), e === null)) throw Error(U(387));
        (r = t.pendingProps), (o = t.memoizedState), (i = o.element), b1(e, t), Xs(t, r, null, n);
        var a = t.memoizedState;
        if (((r = a.element), o.isDehydrated))
          if (
            ((o = {
              element: r,
              isDehydrated: !1,
              cache: a.cache,
              pendingSuspenseBoundaries: a.pendingSuspenseBoundaries,
              transitions: a.transitions,
            }),
            (t.updateQueue.baseState = o),
            (t.memoizedState = o),
            t.flags & 256)
          ) {
            (i = jo(Error(U(423)), t)), (t = u4(e, t, r, n, i));
            break e;
          } else if (r !== i) {
            (i = jo(Error(U(424)), t)), (t = u4(e, t, r, n, i));
            break e;
          } else
            for (
              mn = ni(t.stateNode.containerInfo.firstChild),
                hn = t,
                qe = !0,
                Gn = null,
                n = S1(t, null, r, n),
                t.child = n;
              n;

            )
              (n.flags = (n.flags & -3) | 4096), (n = n.sibling);
        else {
          if ((To(), r === i)) {
            t = $r(e, t, n);
            break e;
          }
          Gt(e, t, r, n);
        }
        t = t.child;
      }
      return t;
    case 5:
      return (
        E1(t),
        e === null && R3(t),
        (r = t.type),
        (i = t.pendingProps),
        (o = e !== null ? e.memoizedProps : null),
        (a = i.children),
        b3(r, i) ? (a = null) : o !== null && b3(r, o) && (t.flags |= 32),
        q1(e, t),
        Gt(e, t, a, n),
        t.child
      );
    case 6:
      return e === null && R3(t), null;
    case 13:
      return X1(e, t, n);
    case 4:
      return (
        xf(t, t.stateNode.containerInfo),
        (r = t.pendingProps),
        e === null ? (t.child = No(t, null, r, n)) : Gt(e, t, r, n),
        t.child
      );
    case 11:
      return (
        (r = t.type),
        (i = t.pendingProps),
        (i = t.elementType === r ? i : Un(r, i)),
        a4(e, t, r, i, n)
      );
    case 7:
      return Gt(e, t, t.pendingProps, n), t.child;
    case 8:
      return Gt(e, t, t.pendingProps.children, n), t.child;
    case 12:
      return Gt(e, t, t.pendingProps.children, n), t.child;
    case 10:
      e: {
        if (
          ((r = t.type._context),
          (i = t.pendingProps),
          (o = t.memoizedProps),
          (a = i.value),
          Ae(qs, r._currentValue),
          (r._currentValue = a),
          o !== null)
        )
          if (Jn(o.value, a)) {
            if (o.children === i.children && !ln.current) {
              t = $r(e, t, n);
              break e;
            }
          } else
            for (o = t.child, o !== null && (o.return = t); o !== null; ) {
              var l = o.dependencies;
              if (l !== null) {
                a = o.child;
                for (var s = l.firstContext; s !== null; ) {
                  if (s.context === r) {
                    if (o.tag === 1) {
                      (s = Pr(-1, n & -n)), (s.tag = 2);
                      var u = o.updateQueue;
                      if (u !== null) {
                        u = u.shared;
                        var c = u.pending;
                        c === null ? (s.next = s) : ((s.next = c.next), (c.next = s)),
                          (u.pending = s);
                      }
                    }
                    (o.lanes |= n),
                      (s = o.alternate),
                      s !== null && (s.lanes |= n),
                      L3(o.return, n, t),
                      (l.lanes |= n);
                    break;
                  }
                  s = s.next;
                }
              } else if (o.tag === 10) a = o.type === t.type ? null : o.child;
              else if (o.tag === 18) {
                if (((a = o.return), a === null)) throw Error(U(341));
                (a.lanes |= n),
                  (l = a.alternate),
                  l !== null && (l.lanes |= n),
                  L3(a, n, t),
                  (a = o.sibling);
              } else a = o.child;
              if (a !== null) a.return = o;
              else
                for (a = o; a !== null; ) {
                  if (a === t) {
                    a = null;
                    break;
                  }
                  if (((o = a.sibling), o !== null)) {
                    (o.return = a.return), (a = o);
                    break;
                  }
                  a = a.return;
                }
              o = a;
            }
        Gt(e, t, i.children, n), (t = t.child);
      }
      return t;
    case 9:
      return (
        (i = t.type),
        (r = t.pendingProps.children),
        Lo(t, n),
        (i = Fn(i)),
        (r = r(i)),
        (t.flags |= 1),
        Gt(e, t, r, n),
        t.child
      );
    case 14:
      return (r = t.type), (i = Un(r, t.pendingProps)), (i = Un(r.type, i)), l4(e, t, r, i, n);
    case 15:
      return Z1(e, t, t.type, t.pendingProps, n);
    case 17:
      return (
        (r = t.type),
        (i = t.pendingProps),
        (i = t.elementType === r ? i : Un(r, i)),
        bs(e, t),
        (t.tag = 1),
        sn(r) ? ((e = !0), Ks(t)) : (e = !1),
        Lo(t, n),
        U1(t, r, i),
        _3(t, r, i, n),
        T3(null, t, r, !0, e, n)
      );
    case 19:
      return Y1(e, t, n);
    case 22:
      return G1(e, t, n);
  }
  throw Error(U(156, t.tag));
};
function m7(e, t) {
  return V6(e, t);
}
function Xp(e, t, n, r) {
  (this.tag = e),
    (this.key = n),
    (this.sibling =
      this.child =
      this.return =
      this.stateNode =
      this.type =
      this.elementType =
        null),
    (this.index = 0),
    (this.ref = null),
    (this.pendingProps = t),
    (this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null),
    (this.mode = r),
    (this.subtreeFlags = this.flags = 0),
    (this.deletions = null),
    (this.childLanes = this.lanes = 0),
    (this.alternate = null);
}
function Tn(e, t, n, r) {
  return new Xp(e, t, n, r);
}
function jf(e) {
  return (e = e.prototype), !(!e || !e.isReactComponent);
}
function Yp(e) {
  if (typeof e == 'function') return jf(e) ? 1 : 0;
  if (e != null) {
    if (((e = e.$$typeof), e === tf)) return 11;
    if (e === nf) return 14;
  }
  return 2;
}
function ai(e, t) {
  var n = e.alternate;
  return (
    n === null
      ? ((n = Tn(e.tag, t, e.key, e.mode)),
        (n.elementType = e.elementType),
        (n.type = e.type),
        (n.stateNode = e.stateNode),
        (n.alternate = e),
        (e.alternate = n))
      : ((n.pendingProps = t),
        (n.type = e.type),
        (n.flags = 0),
        (n.subtreeFlags = 0),
        (n.deletions = null)),
    (n.flags = e.flags & 14680064),
    (n.childLanes = e.childLanes),
    (n.lanes = e.lanes),
    (n.child = e.child),
    (n.memoizedProps = e.memoizedProps),
    (n.memoizedState = e.memoizedState),
    (n.updateQueue = e.updateQueue),
    (t = e.dependencies),
    (n.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }),
    (n.sibling = e.sibling),
    (n.index = e.index),
    (n.ref = e.ref),
    n
  );
}
function Ps(e, t, n, r, i, o) {
  var a = 2;
  if (((r = e), typeof e == 'function')) jf(e) && (a = 1);
  else if (typeof e == 'string') a = 5;
  else
    e: switch (e) {
      case uo:
        return _i(n.children, i, o, t);
      case ef:
        (a = 8), (i |= 8);
        break;
      case t3:
        return (e = Tn(12, n, t, i | 2)), (e.elementType = t3), (e.lanes = o), e;
      case n3:
        return (e = Tn(13, n, t, i)), (e.elementType = n3), (e.lanes = o), e;
      case r3:
        return (e = Tn(19, n, t, i)), (e.elementType = r3), (e.lanes = o), e;
      case E6:
        return Iu(n, i, o, t);
      default:
        if (typeof e == 'object' && e !== null)
          switch (e.$$typeof) {
            case x6:
              a = 10;
              break e;
            case b6:
              a = 9;
              break e;
            case tf:
              a = 11;
              break e;
            case nf:
              a = 14;
              break e;
            case Hr:
              (a = 16), (r = null);
              break e;
          }
        throw Error(U(130, e == null ? e : typeof e, ''));
    }
  return (t = Tn(a, n, t, i)), (t.elementType = e), (t.type = r), (t.lanes = o), t;
}
function _i(e, t, n, r) {
  return (e = Tn(7, e, r, t)), (e.lanes = n), e;
}
function Iu(e, t, n, r) {
  return (
    (e = Tn(22, e, r, t)), (e.elementType = E6), (e.lanes = n), (e.stateNode = { isHidden: !1 }), e
  );
}
function $c(e, t, n) {
  return (e = Tn(6, e, null, t)), (e.lanes = n), e;
}
function Tc(e, t, n) {
  return (
    (t = Tn(4, e.children !== null ? e.children : [], e.key, t)),
    (t.lanes = n),
    (t.stateNode = {
      containerInfo: e.containerInfo,
      pendingChildren: null,
      implementation: e.implementation,
    }),
    t
  );
}
function Jp(e, t, n, r, i) {
  (this.tag = t),
    (this.containerInfo = e),
    (this.finishedWork = this.pingCache = this.current = this.pendingChildren = null),
    (this.timeoutHandle = -1),
    (this.callbackNode = this.pendingContext = this.context = null),
    (this.callbackPriority = 0),
    (this.eventTimes = mc(0)),
    (this.expirationTimes = mc(-1)),
    (this.entangledLanes =
      this.finishedLanes =
      this.mutableReadLanes =
      this.expiredLanes =
      this.pingedLanes =
      this.suspendedLanes =
      this.pendingLanes =
        0),
    (this.entanglements = mc(0)),
    (this.identifierPrefix = r),
    (this.onRecoverableError = i),
    (this.mutableSourceEagerHydrationData = null);
}
function Af(e, t, n, r, i, o, a, l, s) {
  return (
    (e = new Jp(e, t, n, l, s)),
    t === 1 ? ((t = 1), o === !0 && (t |= 8)) : (t = 0),
    (o = Tn(3, null, null, t)),
    (e.current = o),
    (o.stateNode = e),
    (o.memoizedState = {
      element: r,
      isDehydrated: n,
      cache: null,
      transitions: null,
      pendingSuspenseBoundaries: null,
    }),
    Sf(o),
    e
  );
}
function eh(e, t, n) {
  var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return {
    $$typeof: so,
    key: r == null ? null : '' + r,
    children: e,
    containerInfo: t,
    implementation: n,
  };
}
function p7(e) {
  if (!e) return ui;
  e = e._reactInternals;
  e: {
    if (zi(e) !== e || e.tag !== 1) throw Error(U(170));
    var t = e;
    do {
      switch (t.tag) {
        case 3:
          t = t.stateNode.context;
          break e;
        case 1:
          if (sn(t.type)) {
            t = t.stateNode.__reactInternalMemoizedMergedChildContext;
            break e;
          }
      }
      t = t.return;
    } while (t !== null);
    throw Error(U(171));
  }
  if (e.tag === 1) {
    var n = e.type;
    if (sn(n)) return p1(e, n, t);
  }
  return t;
}
function h7(e, t, n, r, i, o, a, l, s) {
  return (
    (e = Af(n, r, !0, e, i, o, a, l, s)),
    (e.context = p7(null)),
    (n = e.current),
    (r = Qt()),
    (i = oi(n)),
    (o = Pr(r, i)),
    (o.callback = t ?? null),
    ri(n, o, i),
    (e.current.lanes = i),
    wl(e, i, r),
    un(e, r),
    e
  );
}
function _u(e, t, n, r) {
  var i = t.current,
    o = Qt(),
    a = oi(i);
  return (
    (n = p7(n)),
    t.context === null ? (t.context = n) : (t.pendingContext = n),
    (t = Pr(o, a)),
    (t.payload = { element: e }),
    (r = r === void 0 ? null : r),
    r !== null && (t.callback = r),
    (e = ri(i, t, a)),
    e !== null && (Qn(e, i, a, o), ws(e, i, a)),
    a
  );
}
function ou(e) {
  if (((e = e.current), !e.child)) return null;
  switch (e.child.tag) {
    case 5:
      return e.child.stateNode;
    default:
      return e.child.stateNode;
  }
}
function C4(e, t) {
  if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
    var n = e.retryLane;
    e.retryLane = n !== 0 && n < t ? n : t;
  }
}
function zf(e, t) {
  C4(e, t), (e = e.alternate) && C4(e, t);
}
function th() {
  return null;
}
var g7 =
  typeof reportError == 'function'
    ? reportError
    : function (e) {
        console.error(e);
      };
function Df(e) {
  this._internalRoot = e;
}
Ou.prototype.render = Df.prototype.render = function (e) {
  var t = this._internalRoot;
  if (t === null) throw Error(U(409));
  _u(e, t, null, null);
};
Ou.prototype.unmount = Df.prototype.unmount = function () {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    ji(function () {
      _u(null, e, null, null);
    }),
      (t[_r] = null);
  }
};
function Ou(e) {
  this._internalRoot = e;
}
Ou.prototype.unstable_scheduleHydration = function (e) {
  if (e) {
    var t = G6();
    e = { blockedOn: null, target: e, priority: t };
    for (var n = 0; n < Ur.length && t !== 0 && t < Ur[n].priority; n++);
    Ur.splice(n, 0, e), n === 0 && Q6(e);
  }
};
function Vf(e) {
  return !(!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11));
}
function $u(e) {
  return !(
    !e ||
    (e.nodeType !== 1 &&
      e.nodeType !== 9 &&
      e.nodeType !== 11 &&
      (e.nodeType !== 8 || e.nodeValue !== ' react-mount-point-unstable '))
  );
}
function w4() {}
function nh(e, t, n, r, i) {
  if (i) {
    if (typeof r == 'function') {
      var o = r;
      r = function () {
        var u = ou(a);
        o.call(u);
      };
    }
    var a = h7(t, r, e, 0, null, !1, !1, '', w4);
    return (
      (e._reactRootContainer = a),
      (e[_r] = a.current),
      Za(e.nodeType === 8 ? e.parentNode : e),
      ji(),
      a
    );
  }
  for (; (i = e.lastChild); ) e.removeChild(i);
  if (typeof r == 'function') {
    var l = r;
    r = function () {
      var u = ou(s);
      l.call(u);
    };
  }
  var s = Af(e, 0, !1, null, null, !1, !1, '', w4);
  return (
    (e._reactRootContainer = s),
    (e[_r] = s.current),
    Za(e.nodeType === 8 ? e.parentNode : e),
    ji(function () {
      _u(t, s, n, r);
    }),
    s
  );
}
function Tu(e, t, n, r, i) {
  var o = n._reactRootContainer;
  if (o) {
    var a = o;
    if (typeof i == 'function') {
      var l = i;
      i = function () {
        var s = ou(a);
        l.call(s);
      };
    }
    _u(t, a, e, i);
  } else a = nh(n, t, e, i, r);
  return ou(a);
}
K6 = function (e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var n = Ca(t.pendingLanes);
        n !== 0 && (af(t, n | 1), un(t, st()), !(Se & 6) && ((Ao = st() + 500), di()));
      }
      break;
    case 13:
      ji(function () {
        var r = Or(e, 1);
        if (r !== null) {
          var i = Qt();
          Qn(r, e, 1, i);
        }
      }),
        zf(e, 1);
  }
};
lf = function (e) {
  if (e.tag === 13) {
    var t = Or(e, 134217728);
    if (t !== null) {
      var n = Qt();
      Qn(t, e, 134217728, n);
    }
    zf(e, 134217728);
  }
};
Z6 = function (e) {
  if (e.tag === 13) {
    var t = oi(e),
      n = Or(e, t);
    if (n !== null) {
      var r = Qt();
      Qn(n, e, t, r);
    }
    zf(e, t);
  }
};
G6 = function () {
  return Re;
};
q6 = function (e, t) {
  var n = Re;
  try {
    return (Re = e), t();
  } finally {
    Re = n;
  }
};
v3 = function (e, t, n) {
  switch (t) {
    case 'input':
      if ((a3(e, n), (t = n.name), n.type === 'radio' && t != null)) {
        for (n = e; n.parentNode; ) n = n.parentNode;
        for (
          n = n.querySelectorAll('input[name=' + JSON.stringify('' + t) + '][type="radio"]'), t = 0;
          t < n.length;
          t++
        ) {
          var r = n[t];
          if (r !== e && r.form === e.form) {
            var i = Eu(r);
            if (!i) throw Error(U(90));
            P6(r), a3(r, i);
          }
        }
      }
      break;
    case 'textarea':
      R6(e, n);
      break;
    case 'select':
      (t = n.value), t != null && ko(e, !!n.multiple, t, !1);
  }
};
N6 = Tf;
F6 = ji;
var rh = { usingClientEntryPoint: !1, Events: [xl, mo, Eu, $6, T6, Tf] },
  fa = {
    findFiberByHostInstance: ki,
    bundleType: 0,
    version: '18.3.1',
    rendererPackageName: 'react-dom',
  },
  ih = {
    bundleType: fa.bundleType,
    version: fa.version,
    rendererPackageName: fa.rendererPackageName,
    rendererConfig: fa.rendererConfig,
    overrideHookState: null,
    overrideHookStateDeletePath: null,
    overrideHookStateRenamePath: null,
    overrideProps: null,
    overridePropsDeletePath: null,
    overridePropsRenamePath: null,
    setErrorHandler: null,
    setSuspenseHandler: null,
    scheduleUpdate: null,
    currentDispatcherRef: Nr.ReactCurrentDispatcher,
    findHostInstanceByFiber: function (e) {
      return (e = z6(e)), e === null ? null : e.stateNode;
    },
    findFiberByHostInstance: fa.findFiberByHostInstance || th,
    findHostInstancesForRefresh: null,
    scheduleRefresh: null,
    scheduleRoot: null,
    setRefreshHandler: null,
    getCurrentFiber: null,
    reconcilerVersion: '18.3.1-next-f1338f8080-20240426',
  };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < 'u') {
  var ns = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!ns.isDisabled && ns.supportsFiber)
    try {
      (wu = ns.inject(ih)), (ur = ns);
    } catch {}
}
Cn.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = rh;
Cn.createPortal = function (e, t) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!Vf(t)) throw Error(U(200));
  return eh(e, t, null, n);
};
Cn.createRoot = function (e, t) {
  if (!Vf(e)) throw Error(U(299));
  var n = !1,
    r = '',
    i = g7;
  return (
    t != null &&
      (t.unstable_strictMode === !0 && (n = !0),
      t.identifierPrefix !== void 0 && (r = t.identifierPrefix),
      t.onRecoverableError !== void 0 && (i = t.onRecoverableError)),
    (t = Af(e, 1, !1, null, null, n, !1, r, i)),
    (e[_r] = t.current),
    Za(e.nodeType === 8 ? e.parentNode : e),
    new Df(t)
  );
};
Cn.findDOMNode = function (e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == 'function'
      ? Error(U(188))
      : ((e = Object.keys(e).join(',')), Error(U(268, e)));
  return (e = z6(t)), (e = e === null ? null : e.stateNode), e;
};
Cn.flushSync = function (e) {
  return ji(e);
};
Cn.hydrate = function (e, t, n) {
  if (!$u(t)) throw Error(U(200));
  return Tu(null, e, t, !0, n);
};
Cn.hydrateRoot = function (e, t, n) {
  if (!Vf(e)) throw Error(U(405));
  var r = (n != null && n.hydratedSources) || null,
    i = !1,
    o = '',
    a = g7;
  if (
    (n != null &&
      (n.unstable_strictMode === !0 && (i = !0),
      n.identifierPrefix !== void 0 && (o = n.identifierPrefix),
      n.onRecoverableError !== void 0 && (a = n.onRecoverableError)),
    (t = h7(t, null, e, 1, n ?? null, i, !1, o, a)),
    (e[_r] = t.current),
    Za(e),
    r)
  )
    for (e = 0; e < r.length; e++)
      (n = r[e]),
        (i = n._getVersion),
        (i = i(n._source)),
        t.mutableSourceEagerHydrationData == null
          ? (t.mutableSourceEagerHydrationData = [n, i])
          : t.mutableSourceEagerHydrationData.push(n, i);
  return new Ou(t);
};
Cn.render = function (e, t, n) {
  if (!$u(t)) throw Error(U(200));
  return Tu(null, e, t, !1, n);
};
Cn.unmountComponentAtNode = function (e) {
  if (!$u(e)) throw Error(U(40));
  return e._reactRootContainer
    ? (ji(function () {
        Tu(null, null, e, !1, function () {
          (e._reactRootContainer = null), (e[_r] = null);
        });
      }),
      !0)
    : !1;
};
Cn.unstable_batchedUpdates = Tf;
Cn.unstable_renderSubtreeIntoContainer = function (e, t, n, r) {
  if (!$u(n)) throw Error(U(200));
  if (e == null || e._reactInternals === void 0) throw Error(U(38));
  return Tu(e, t, n, !1, r);
};
Cn.version = '18.3.1-next-f1338f8080-20240426';
function y7() {
  if (
    !(
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > 'u' ||
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != 'function'
    )
  )
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(y7);
    } catch (e) {
      console.error(e);
    }
}
y7(), (y6.exports = Cn);
var El = y6.exports;
const S4 = K2(El);
var C7,
  x4 = El;
(C7 = x4.createRoot), x4.hydrateRoot;
/**
 * @remix-run/router v1.19.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function nl() {
  return (
    (nl = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    nl.apply(this, arguments)
  );
}
var Gr;
(function (e) {
  (e.Pop = 'POP'), (e.Push = 'PUSH'), (e.Replace = 'REPLACE');
})(Gr || (Gr = {}));
const b4 = 'popstate';
function oh(e) {
  e === void 0 && (e = {});
  function t(r, i) {
    let { pathname: o, search: a, hash: l } = r.location;
    return K3(
      '',
      { pathname: o, search: a, hash: l },
      (i.state && i.state.usr) || null,
      (i.state && i.state.key) || 'default',
    );
  }
  function n(r, i) {
    return typeof i == 'string' ? i : au(i);
  }
  return lh(t, n, null, e);
}
function pt(e, t) {
  if (e === !1 || e === null || typeof e > 'u') throw new Error(t);
}
function w7(e, t) {
  if (!e) {
    typeof console < 'u' && console.warn(t);
    try {
      throw new Error(t);
    } catch {}
  }
}
function ah() {
  return Math.random().toString(36).substr(2, 8);
}
function E4(e, t) {
  return { usr: e.state, key: e.key, idx: t };
}
function K3(e, t, n, r) {
  return (
    n === void 0 && (n = null),
    nl(
      { pathname: typeof e == 'string' ? e : e.pathname, search: '', hash: '' },
      typeof t == 'string' ? qo(t) : t,
      { state: n, key: (t && t.key) || r || ah() },
    )
  );
}
function au(e) {
  let { pathname: t = '/', search: n = '', hash: r = '' } = e;
  return (
    n && n !== '?' && (t += n.charAt(0) === '?' ? n : '?' + n),
    r && r !== '#' && (t += r.charAt(0) === '#' ? r : '#' + r),
    t
  );
}
function qo(e) {
  let t = {};
  if (e) {
    let n = e.indexOf('#');
    n >= 0 && ((t.hash = e.substr(n)), (e = e.substr(0, n)));
    let r = e.indexOf('?');
    r >= 0 && ((t.search = e.substr(r)), (e = e.substr(0, r))), e && (t.pathname = e);
  }
  return t;
}
function lh(e, t, n, r) {
  r === void 0 && (r = {});
  let { window: i = document.defaultView, v5Compat: o = !1 } = r,
    a = i.history,
    l = Gr.Pop,
    s = null,
    u = c();
  u == null && ((u = 0), a.replaceState(nl({}, a.state, { idx: u }), ''));
  function c() {
    return (a.state || { idx: null }).idx;
  }
  function f() {
    l = Gr.Pop;
    let w = c(),
      p = w == null ? null : w - u;
    (u = w), s && s({ action: l, location: C.location, delta: p });
  }
  function v(w, p) {
    l = Gr.Push;
    let m = K3(C.location, w, p);
    u = c() + 1;
    let h = E4(m, u),
      S = C.createHref(m);
    try {
      a.pushState(h, '', S);
    } catch (x) {
      if (x instanceof DOMException && x.name === 'DataCloneError') throw x;
      i.location.assign(S);
    }
    o && s && s({ action: l, location: C.location, delta: 1 });
  }
  function y(w, p) {
    l = Gr.Replace;
    let m = K3(C.location, w, p);
    u = c();
    let h = E4(m, u),
      S = C.createHref(m);
    a.replaceState(h, '', S), o && s && s({ action: l, location: C.location, delta: 0 });
  }
  function g(w) {
    let p = i.location.origin !== 'null' ? i.location.origin : i.location.href,
      m = typeof w == 'string' ? w : au(w);
    return (
      (m = m.replace(/ $/, '%20')),
      pt(p, 'No window.location.(origin|href) available to create URL for href: ' + m),
      new URL(m, p)
    );
  }
  let C = {
    get action() {
      return l;
    },
    get location() {
      return e(i, a);
    },
    listen(w) {
      if (s) throw new Error('A history only accepts one active listener');
      return (
        i.addEventListener(b4, f),
        (s = w),
        () => {
          i.removeEventListener(b4, f), (s = null);
        }
      );
    },
    createHref(w) {
      return t(i, w);
    },
    createURL: g,
    encodeLocation(w) {
      let p = g(w);
      return { pathname: p.pathname, search: p.search, hash: p.hash };
    },
    push: v,
    replace: y,
    go(w) {
      return a.go(w);
    },
  };
  return C;
}
var k4;
(function (e) {
  (e.data = 'data'), (e.deferred = 'deferred'), (e.redirect = 'redirect'), (e.error = 'error');
})(k4 || (k4 = {}));
function sh(e, t, n) {
  return n === void 0 && (n = '/'), uh(e, t, n, !1);
}
function uh(e, t, n, r) {
  let i = typeof t == 'string' ? qo(t) : t,
    o = Hf(i.pathname || '/', n);
  if (o == null) return null;
  let a = S7(e);
  ch(a);
  let l = null;
  for (let s = 0; l == null && s < a.length; ++s) {
    let u = Sh(o);
    l = Ch(a[s], u, r);
  }
  return l;
}
function S7(e, t, n, r) {
  t === void 0 && (t = []), n === void 0 && (n = []), r === void 0 && (r = '');
  let i = (o, a, l) => {
    let s = {
      relativePath: l === void 0 ? o.path || '' : l,
      caseSensitive: o.caseSensitive === !0,
      childrenIndex: a,
      route: o,
    };
    s.relativePath.startsWith('/') &&
      (pt(
        s.relativePath.startsWith(r),
        'Absolute route path "' +
          s.relativePath +
          '" nested under path ' +
          ('"' + r + '" is not valid. An absolute child route path ') +
          'must start with the combined path of all its parent routes.',
      ),
      (s.relativePath = s.relativePath.slice(r.length)));
    let u = li([r, s.relativePath]),
      c = n.concat(s);
    o.children &&
      o.children.length > 0 &&
      (pt(
        o.index !== !0,
        'Index routes must not have child routes. Please remove ' +
          ('all child routes from route path "' + u + '".'),
      ),
      S7(o.children, t, c, u)),
      !(o.path == null && !o.index) && t.push({ path: u, score: gh(u, o.index), routesMeta: c });
  };
  return (
    e.forEach((o, a) => {
      var l;
      if (o.path === '' || !((l = o.path) != null && l.includes('?'))) i(o, a);
      else for (let s of x7(o.path)) i(o, a, s);
    }),
    t
  );
}
function x7(e) {
  let t = e.split('/');
  if (t.length === 0) return [];
  let [n, ...r] = t,
    i = n.endsWith('?'),
    o = n.replace(/\?$/, '');
  if (r.length === 0) return i ? [o, ''] : [o];
  let a = x7(r.join('/')),
    l = [];
  return (
    l.push(...a.map((s) => (s === '' ? o : [o, s].join('/')))),
    i && l.push(...a),
    l.map((s) => (e.startsWith('/') && s === '' ? '/' : s))
  );
}
function ch(e) {
  e.sort((t, n) =>
    t.score !== n.score
      ? n.score - t.score
      : yh(
          t.routesMeta.map((r) => r.childrenIndex),
          n.routesMeta.map((r) => r.childrenIndex),
        ),
  );
}
const fh = /^:[\w-]+$/,
  dh = 3,
  vh = 2,
  mh = 1,
  ph = 10,
  hh = -2,
  P4 = (e) => e === '*';
function gh(e, t) {
  let n = e.split('/'),
    r = n.length;
  return (
    n.some(P4) && (r += hh),
    t && (r += vh),
    n.filter((i) => !P4(i)).reduce((i, o) => i + (fh.test(o) ? dh : o === '' ? mh : ph), r)
  );
}
function yh(e, t) {
  return e.length === t.length && e.slice(0, -1).every((r, i) => r === t[i])
    ? e[e.length - 1] - t[t.length - 1]
    : 0;
}
function Ch(e, t, n) {
  let { routesMeta: r } = e,
    i = {},
    o = '/',
    a = [];
  for (let l = 0; l < r.length; ++l) {
    let s = r[l],
      u = l === r.length - 1,
      c = o === '/' ? t : t.slice(o.length) || '/',
      f = M4({ path: s.relativePath, caseSensitive: s.caseSensitive, end: u }, c),
      v = s.route;
    if (
      (!f &&
        u &&
        n &&
        !r[r.length - 1].route.index &&
        (f = M4({ path: s.relativePath, caseSensitive: s.caseSensitive, end: !1 }, c)),
      !f)
    )
      return null;
    Object.assign(i, f.params),
      a.push({
        params: i,
        pathname: li([o, f.pathname]),
        pathnameBase: kh(li([o, f.pathnameBase])),
        route: v,
      }),
      f.pathnameBase !== '/' && (o = li([o, f.pathnameBase]));
  }
  return a;
}
function M4(e, t) {
  typeof e == 'string' && (e = { path: e, caseSensitive: !1, end: !0 });
  let [n, r] = wh(e.path, e.caseSensitive, e.end),
    i = t.match(n);
  if (!i) return null;
  let o = i[0],
    a = o.replace(/(.)\/+$/, '$1'),
    l = i.slice(1);
  return {
    params: r.reduce((u, c, f) => {
      let { paramName: v, isOptional: y } = c;
      if (v === '*') {
        let C = l[f] || '';
        a = o.slice(0, o.length - C.length).replace(/(.)\/+$/, '$1');
      }
      const g = l[f];
      return y && !g ? (u[v] = void 0) : (u[v] = (g || '').replace(/%2F/g, '/')), u;
    }, {}),
    pathname: o,
    pathnameBase: a,
    pattern: e,
  };
}
function wh(e, t, n) {
  t === void 0 && (t = !1),
    n === void 0 && (n = !0),
    w7(
      e === '*' || !e.endsWith('*') || e.endsWith('/*'),
      'Route path "' +
        e +
        '" will be treated as if it were ' +
        ('"' + e.replace(/\*$/, '/*') + '" because the `*` character must ') +
        'always follow a `/` in the pattern. To get rid of this warning, ' +
        ('please change the route path to "' + e.replace(/\*$/, '/*') + '".'),
    );
  let r = [],
    i =
      '^' +
      e
        .replace(/\/*\*?$/, '')
        .replace(/^\/*/, '/')
        .replace(/[\\.*+^${}|()[\]]/g, '\\$&')
        .replace(
          /\/:([\w-]+)(\?)?/g,
          (a, l, s) => (
            r.push({ paramName: l, isOptional: s != null }), s ? '/?([^\\/]+)?' : '/([^\\/]+)'
          ),
        );
  return (
    e.endsWith('*')
      ? (r.push({ paramName: '*' }), (i += e === '*' || e === '/*' ? '(.*)$' : '(?:\\/(.+)|\\/*)$'))
      : n
        ? (i += '\\/*$')
        : e !== '' && e !== '/' && (i += '(?:(?=\\/|$))'),
    [new RegExp(i, t ? void 0 : 'i'), r]
  );
}
function Sh(e) {
  try {
    return e
      .split('/')
      .map((t) => decodeURIComponent(t).replace(/\//g, '%2F'))
      .join('/');
  } catch (t) {
    return (
      w7(
        !1,
        'The URL path "' +
          e +
          '" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent ' +
          ('encoding (' + t + ').'),
      ),
      e
    );
  }
}
function Hf(e, t) {
  if (t === '/') return e;
  if (!e.toLowerCase().startsWith(t.toLowerCase())) return null;
  let n = t.endsWith('/') ? t.length - 1 : t.length,
    r = e.charAt(n);
  return r && r !== '/' ? null : e.slice(n) || '/';
}
function xh(e, t) {
  t === void 0 && (t = '/');
  let { pathname: n, search: r = '', hash: i = '' } = typeof e == 'string' ? qo(e) : e;
  return { pathname: n ? (n.startsWith('/') ? n : bh(n, t)) : t, search: Ph(r), hash: Mh(i) };
}
function bh(e, t) {
  let n = t.replace(/\/+$/, '').split('/');
  return (
    e.split('/').forEach((i) => {
      i === '..' ? n.length > 1 && n.pop() : i !== '.' && n.push(i);
    }),
    n.length > 1 ? n.join('/') : '/'
  );
}
function Nc(e, t, n, r) {
  return (
    "Cannot include a '" +
    e +
    "' character in a manually specified " +
    ('`to.' + t + '` field [' + JSON.stringify(r) + '].  Please separate it out to the ') +
    ('`to.' + n + '` field. Alternatively you may provide the full path as ') +
    'a string in <Link to="..."> and the router will parse it for you.'
  );
}
function Eh(e) {
  return e.filter((t, n) => n === 0 || (t.route.path && t.route.path.length > 0));
}
function b7(e, t) {
  let n = Eh(e);
  return t
    ? n.map((r, i) => (i === n.length - 1 ? r.pathname : r.pathnameBase))
    : n.map((r) => r.pathnameBase);
}
function E7(e, t, n, r) {
  r === void 0 && (r = !1);
  let i;
  typeof e == 'string'
    ? (i = qo(e))
    : ((i = nl({}, e)),
      pt(!i.pathname || !i.pathname.includes('?'), Nc('?', 'pathname', 'search', i)),
      pt(!i.pathname || !i.pathname.includes('#'), Nc('#', 'pathname', 'hash', i)),
      pt(!i.search || !i.search.includes('#'), Nc('#', 'search', 'hash', i)));
  let o = e === '' || i.pathname === '',
    a = o ? '/' : i.pathname,
    l;
  if (a == null) l = n;
  else {
    let f = t.length - 1;
    if (!r && a.startsWith('..')) {
      let v = a.split('/');
      for (; v[0] === '..'; ) v.shift(), (f -= 1);
      i.pathname = v.join('/');
    }
    l = f >= 0 ? t[f] : '/';
  }
  let s = xh(i, l),
    u = a && a !== '/' && a.endsWith('/'),
    c = (o || a === '.') && n.endsWith('/');
  return !s.pathname.endsWith('/') && (u || c) && (s.pathname += '/'), s;
}
const li = (e) => e.join('/').replace(/\/\/+/g, '/'),
  kh = (e) => e.replace(/\/+$/, '').replace(/^\/*/, '/'),
  Ph = (e) => (!e || e === '?' ? '' : e.startsWith('?') ? e : '?' + e),
  Mh = (e) => (!e || e === '#' ? '' : e.startsWith('#') ? e : '#' + e);
function Rh(e) {
  return (
    e != null &&
    typeof e.status == 'number' &&
    typeof e.statusText == 'string' &&
    typeof e.internal == 'boolean' &&
    'data' in e
  );
}
const k7 = ['post', 'put', 'patch', 'delete'];
new Set(k7);
const Lh = ['get', ...k7];
new Set(Lh);
/**
 * React Router v6.26.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function rl() {
  return (
    (rl = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    rl.apply(this, arguments)
  );
}
const Bf = d.createContext(null),
  Ih = d.createContext(null),
  Di = d.createContext(null),
  Nu = d.createContext(null),
  Vi = d.createContext({ outlet: null, matches: [], isDataRoute: !1 }),
  P7 = d.createContext(null);
function _h(e, t) {
  let { relative: n } = t === void 0 ? {} : t;
  kl() || pt(!1);
  let { basename: r, navigator: i } = d.useContext(Di),
    { hash: o, pathname: a, search: l } = R7(e, { relative: n }),
    s = a;
  return (
    r !== '/' && (s = a === '/' ? r : li([r, a])), i.createHref({ pathname: s, search: l, hash: o })
  );
}
function kl() {
  return d.useContext(Nu) != null;
}
function Pl() {
  return kl() || pt(!1), d.useContext(Nu).location;
}
function M7(e) {
  d.useContext(Di).static || d.useLayoutEffect(e);
}
function Oh() {
  let { isDataRoute: e } = d.useContext(Vi);
  return e ? Wh() : $h();
}
function $h() {
  kl() || pt(!1);
  let e = d.useContext(Bf),
    { basename: t, future: n, navigator: r } = d.useContext(Di),
    { matches: i } = d.useContext(Vi),
    { pathname: o } = Pl(),
    a = JSON.stringify(b7(i, n.v7_relativeSplatPath)),
    l = d.useRef(!1);
  return (
    M7(() => {
      l.current = !0;
    }),
    d.useCallback(
      function (u, c) {
        if ((c === void 0 && (c = {}), !l.current)) return;
        if (typeof u == 'number') {
          r.go(u);
          return;
        }
        let f = E7(u, JSON.parse(a), o, c.relative === 'path');
        e == null && t !== '/' && (f.pathname = f.pathname === '/' ? t : li([t, f.pathname])),
          (c.replace ? r.replace : r.push)(f, c.state, c);
      },
      [t, r, a, o, e],
    )
  );
}
function R7(e, t) {
  let { relative: n } = t === void 0 ? {} : t,
    { future: r } = d.useContext(Di),
    { matches: i } = d.useContext(Vi),
    { pathname: o } = Pl(),
    a = JSON.stringify(b7(i, r.v7_relativeSplatPath));
  return d.useMemo(() => E7(e, JSON.parse(a), o, n === 'path'), [e, a, o, n]);
}
function Th(e, t) {
  return Nh(e, t);
}
function Nh(e, t, n, r) {
  kl() || pt(!1);
  let { navigator: i } = d.useContext(Di),
    { matches: o } = d.useContext(Vi),
    a = o[o.length - 1],
    l = a ? a.params : {};
  a && a.pathname;
  let s = a ? a.pathnameBase : '/';
  a && a.route;
  let u = Pl(),
    c;
  if (t) {
    var f;
    let w = typeof t == 'string' ? qo(t) : t;
    s === '/' || ((f = w.pathname) != null && f.startsWith(s)) || pt(!1), (c = w);
  } else c = u;
  let v = c.pathname || '/',
    y = v;
  if (s !== '/') {
    let w = s.replace(/^\//, '').split('/');
    y = '/' + v.replace(/^\//, '').split('/').slice(w.length).join('/');
  }
  let g = sh(e, { pathname: y }),
    C = Dh(
      g &&
        g.map((w) =>
          Object.assign({}, w, {
            params: Object.assign({}, l, w.params),
            pathname: li([
              s,
              i.encodeLocation ? i.encodeLocation(w.pathname).pathname : w.pathname,
            ]),
            pathnameBase:
              w.pathnameBase === '/'
                ? s
                : li([
                    s,
                    i.encodeLocation ? i.encodeLocation(w.pathnameBase).pathname : w.pathnameBase,
                  ]),
          }),
        ),
      o,
      n,
      r,
    );
  return t && C
    ? d.createElement(
        Nu.Provider,
        {
          value: {
            location: rl({ pathname: '/', search: '', hash: '', state: null, key: 'default' }, c),
            navigationType: Gr.Pop,
          },
        },
        C,
      )
    : C;
}
function Fh() {
  let e = Uh(),
    t = Rh(e) ? e.status + ' ' + e.statusText : e instanceof Error ? e.message : JSON.stringify(e),
    n = e instanceof Error ? e.stack : null,
    i = { padding: '0.5rem', backgroundColor: 'rgba(200,200,200, 0.5)' };
  return d.createElement(
    d.Fragment,
    null,
    d.createElement('h2', null, 'Unexpected Application Error!'),
    d.createElement('h3', { style: { fontStyle: 'italic' } }, t),
    n ? d.createElement('pre', { style: i }, n) : null,
    null,
  );
}
const jh = d.createElement(Fh, null);
class Ah extends d.Component {
  constructor(t) {
    super(t), (this.state = { location: t.location, revalidation: t.revalidation, error: t.error });
  }
  static getDerivedStateFromError(t) {
    return { error: t };
  }
  static getDerivedStateFromProps(t, n) {
    return n.location !== t.location || (n.revalidation !== 'idle' && t.revalidation === 'idle')
      ? { error: t.error, location: t.location, revalidation: t.revalidation }
      : {
          error: t.error !== void 0 ? t.error : n.error,
          location: n.location,
          revalidation: t.revalidation || n.revalidation,
        };
  }
  componentDidCatch(t, n) {
    console.error('React Router caught the following error during render', t, n);
  }
  render() {
    return this.state.error !== void 0
      ? d.createElement(
          Vi.Provider,
          { value: this.props.routeContext },
          d.createElement(P7.Provider, { value: this.state.error, children: this.props.component }),
        )
      : this.props.children;
  }
}
function zh(e) {
  let { routeContext: t, match: n, children: r } = e,
    i = d.useContext(Bf);
  return (
    i &&
      i.static &&
      i.staticContext &&
      (n.route.errorElement || n.route.ErrorBoundary) &&
      (i.staticContext._deepestRenderedBoundaryId = n.route.id),
    d.createElement(Vi.Provider, { value: t }, r)
  );
}
function Dh(e, t, n, r) {
  var i;
  if (
    (t === void 0 && (t = []), n === void 0 && (n = null), r === void 0 && (r = null), e == null)
  ) {
    var o;
    if (!n) return null;
    if (n.errors) e = n.matches;
    else if (
      (o = r) != null &&
      o.v7_partialHydration &&
      t.length === 0 &&
      !n.initialized &&
      n.matches.length > 0
    )
      e = n.matches;
    else return null;
  }
  let a = e,
    l = (i = n) == null ? void 0 : i.errors;
  if (l != null) {
    let c = a.findIndex((f) => f.route.id && (l == null ? void 0 : l[f.route.id]) !== void 0);
    c >= 0 || pt(!1), (a = a.slice(0, Math.min(a.length, c + 1)));
  }
  let s = !1,
    u = -1;
  if (n && r && r.v7_partialHydration)
    for (let c = 0; c < a.length; c++) {
      let f = a[c];
      if (((f.route.HydrateFallback || f.route.hydrateFallbackElement) && (u = c), f.route.id)) {
        let { loaderData: v, errors: y } = n,
          g = f.route.loader && v[f.route.id] === void 0 && (!y || y[f.route.id] === void 0);
        if (f.route.lazy || g) {
          (s = !0), u >= 0 ? (a = a.slice(0, u + 1)) : (a = [a[0]]);
          break;
        }
      }
    }
  return a.reduceRight((c, f, v) => {
    let y,
      g = !1,
      C = null,
      w = null;
    n &&
      ((y = l && f.route.id ? l[f.route.id] : void 0),
      (C = f.route.errorElement || jh),
      s &&
        (u < 0 && v === 0
          ? ((g = !0), (w = null))
          : u === v && ((g = !0), (w = f.route.hydrateFallbackElement || null))));
    let p = t.concat(a.slice(0, v + 1)),
      m = () => {
        let h;
        return (
          y
            ? (h = C)
            : g
              ? (h = w)
              : f.route.Component
                ? (h = d.createElement(f.route.Component, null))
                : f.route.element
                  ? (h = f.route.element)
                  : (h = c),
          d.createElement(zh, {
            match: f,
            routeContext: { outlet: c, matches: p, isDataRoute: n != null },
            children: h,
          })
        );
      };
    return n && (f.route.ErrorBoundary || f.route.errorElement || v === 0)
      ? d.createElement(Ah, {
          location: n.location,
          revalidation: n.revalidation,
          component: C,
          error: y,
          children: m(),
          routeContext: { outlet: null, matches: p, isDataRoute: !0 },
        })
      : m();
  }, null);
}
var L7 = (function (e) {
    return (
      (e.UseBlocker = 'useBlocker'),
      (e.UseRevalidator = 'useRevalidator'),
      (e.UseNavigateStable = 'useNavigate'),
      e
    );
  })(L7 || {}),
  lu = (function (e) {
    return (
      (e.UseBlocker = 'useBlocker'),
      (e.UseLoaderData = 'useLoaderData'),
      (e.UseActionData = 'useActionData'),
      (e.UseRouteError = 'useRouteError'),
      (e.UseNavigation = 'useNavigation'),
      (e.UseRouteLoaderData = 'useRouteLoaderData'),
      (e.UseMatches = 'useMatches'),
      (e.UseRevalidator = 'useRevalidator'),
      (e.UseNavigateStable = 'useNavigate'),
      (e.UseRouteId = 'useRouteId'),
      e
    );
  })(lu || {});
function Vh(e) {
  let t = d.useContext(Bf);
  return t || pt(!1), t;
}
function Hh(e) {
  let t = d.useContext(Ih);
  return t || pt(!1), t;
}
function Bh(e) {
  let t = d.useContext(Vi);
  return t || pt(!1), t;
}
function I7(e) {
  let t = Bh(),
    n = t.matches[t.matches.length - 1];
  return n.route.id || pt(!1), n.route.id;
}
function Uh() {
  var e;
  let t = d.useContext(P7),
    n = Hh(lu.UseRouteError),
    r = I7(lu.UseRouteError);
  return t !== void 0 ? t : (e = n.errors) == null ? void 0 : e[r];
}
function Wh() {
  let { router: e } = Vh(L7.UseNavigateStable),
    t = I7(lu.UseNavigateStable),
    n = d.useRef(!1);
  return (
    M7(() => {
      n.current = !0;
    }),
    d.useCallback(
      function (i, o) {
        o === void 0 && (o = {}),
          n.current &&
            (typeof i == 'number' ? e.navigate(i) : e.navigate(i, rl({ fromRouteId: t }, o)));
      },
      [e, t],
    )
  );
}
function ao(e) {
  pt(!1);
}
function Kh(e) {
  let {
    basename: t = '/',
    children: n = null,
    location: r,
    navigationType: i = Gr.Pop,
    navigator: o,
    static: a = !1,
    future: l,
  } = e;
  kl() && pt(!1);
  let s = t.replace(/^\/*/, '/'),
    u = d.useMemo(
      () => ({ basename: s, navigator: o, static: a, future: rl({ v7_relativeSplatPath: !1 }, l) }),
      [s, l, o, a],
    );
  typeof r == 'string' && (r = qo(r));
  let { pathname: c = '/', search: f = '', hash: v = '', state: y = null, key: g = 'default' } = r,
    C = d.useMemo(() => {
      let w = Hf(c, s);
      return w == null
        ? null
        : { location: { pathname: w, search: f, hash: v, state: y, key: g }, navigationType: i };
    }, [s, c, f, v, y, g, i]);
  return C == null
    ? null
    : d.createElement(
        Di.Provider,
        { value: u },
        d.createElement(Nu.Provider, { children: n, value: C }),
      );
}
function Zh(e) {
  let { children: t, location: n } = e;
  return Th(Z3(t), n);
}
new Promise(() => {});
function Z3(e, t) {
  t === void 0 && (t = []);
  let n = [];
  return (
    d.Children.forEach(e, (r, i) => {
      if (!d.isValidElement(r)) return;
      let o = [...t, i];
      if (r.type === d.Fragment) {
        n.push.apply(n, Z3(r.props.children, o));
        return;
      }
      r.type !== ao && pt(!1), !r.props.index || !r.props.children || pt(!1);
      let a = {
        id: r.props.id || o.join('-'),
        caseSensitive: r.props.caseSensitive,
        element: r.props.element,
        Component: r.props.Component,
        index: r.props.index,
        path: r.props.path,
        loader: r.props.loader,
        action: r.props.action,
        errorElement: r.props.errorElement,
        ErrorBoundary: r.props.ErrorBoundary,
        hasErrorBoundary: r.props.ErrorBoundary != null || r.props.errorElement != null,
        shouldRevalidate: r.props.shouldRevalidate,
        handle: r.props.handle,
        lazy: r.props.lazy,
      };
      r.props.children && (a.children = Z3(r.props.children, o)), n.push(a);
    }),
    n
  );
}
/**
 * React Router DOM v6.26.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function G3() {
  return (
    (G3 = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    G3.apply(this, arguments)
  );
}
function Gh(e, t) {
  if (e == null) return {};
  var n = {},
    r = Object.keys(e),
    i,
    o;
  for (o = 0; o < r.length; o++) (i = r[o]), !(t.indexOf(i) >= 0) && (n[i] = e[i]);
  return n;
}
function qh(e) {
  return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
}
function Qh(e, t) {
  return e.button === 0 && (!t || t === '_self') && !qh(e);
}
const Xh = [
    'onClick',
    'relative',
    'reloadDocument',
    'replace',
    'state',
    'target',
    'to',
    'preventScrollReset',
    'unstable_viewTransition',
  ],
  Yh = '6';
try {
  window.__reactRouterVersion = Yh;
} catch {}
const Jh = 'startTransition',
  R4 = Cl[Jh];
function eg(e) {
  let { basename: t, children: n, future: r, window: i } = e,
    o = d.useRef();
  o.current == null && (o.current = oh({ window: i, v5Compat: !0 }));
  let a = o.current,
    [l, s] = d.useState({ action: a.action, location: a.location }),
    { v7_startTransition: u } = r || {},
    c = d.useCallback(
      (f) => {
        u && R4 ? R4(() => s(f)) : s(f);
      },
      [s, u],
    );
  return (
    d.useLayoutEffect(() => a.listen(c), [a, c]),
    d.createElement(Kh, {
      basename: t,
      children: n,
      location: l.location,
      navigationType: l.action,
      navigator: a,
      future: r,
    })
  );
}
const tg =
    typeof window < 'u' &&
    typeof window.document < 'u' &&
    typeof window.document.createElement < 'u',
  ng = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
  Ut = d.forwardRef(function (t, n) {
    let {
        onClick: r,
        relative: i,
        reloadDocument: o,
        replace: a,
        state: l,
        target: s,
        to: u,
        preventScrollReset: c,
        unstable_viewTransition: f,
      } = t,
      v = Gh(t, Xh),
      { basename: y } = d.useContext(Di),
      g,
      C = !1;
    if (typeof u == 'string' && ng.test(u) && ((g = u), tg))
      try {
        let h = new URL(window.location.href),
          S = u.startsWith('//') ? new URL(h.protocol + u) : new URL(u),
          x = Hf(S.pathname, y);
        S.origin === h.origin && x != null ? (u = x + S.search + S.hash) : (C = !0);
      } catch {}
    let w = _h(u, { relative: i }),
      p = rg(u, {
        replace: a,
        state: l,
        target: s,
        preventScrollReset: c,
        relative: i,
        unstable_viewTransition: f,
      });
    function m(h) {
      r && r(h), h.defaultPrevented || p(h);
    }
    return d.createElement(
      'a',
      G3({}, v, { href: g || w, onClick: C || o ? r : m, ref: n, target: s }),
    );
  });
var L4;
(function (e) {
  (e.UseScrollRestoration = 'useScrollRestoration'),
    (e.UseSubmit = 'useSubmit'),
    (e.UseSubmitFetcher = 'useSubmitFetcher'),
    (e.UseFetcher = 'useFetcher'),
    (e.useViewTransitionState = 'useViewTransitionState');
})(L4 || (L4 = {}));
var I4;
(function (e) {
  (e.UseFetcher = 'useFetcher'),
    (e.UseFetchers = 'useFetchers'),
    (e.UseScrollRestoration = 'useScrollRestoration');
})(I4 || (I4 = {}));
function rg(e, t) {
  let {
      target: n,
      replace: r,
      state: i,
      preventScrollReset: o,
      relative: a,
      unstable_viewTransition: l,
    } = t === void 0 ? {} : t,
    s = Oh(),
    u = Pl(),
    c = R7(e, { relative: a });
  return d.useCallback(
    (f) => {
      if (Qh(f, n)) {
        f.preventDefault();
        let v = r !== void 0 ? r : au(u) === au(c);
        s(e, {
          replace: v,
          state: i,
          preventScrollReset: o,
          relative: a,
          unstable_viewTransition: l,
        });
      }
    },
    [u, s, c, r, i, n, e, o, a, l],
  );
}
var _7 = { exports: {} };
/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/ (function (e) {
  (function () {
    var t = {}.hasOwnProperty;
    function n() {
      for (var o = '', a = 0; a < arguments.length; a++) {
        var l = arguments[a];
        l && (o = i(o, r(l)));
      }
      return o;
    }
    function r(o) {
      if (typeof o == 'string' || typeof o == 'number') return o;
      if (typeof o != 'object') return '';
      if (Array.isArray(o)) return n.apply(null, o);
      if (
        o.toString !== Object.prototype.toString &&
        !o.toString.toString().includes('[native code]')
      )
        return o.toString();
      var a = '';
      for (var l in o) t.call(o, l) && o[l] && (a = i(a, l));
      return a;
    }
    function i(o, a) {
      return a ? (o ? o + ' ' + a : o + a) : o;
    }
    e.exports ? ((n.default = n), (e.exports = n)) : (window.classNames = n);
  })();
})(_7);
var ig = _7.exports;
const Ee = K2(ig);
function ye() {
  return (
    (ye = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    ye.apply(null, arguments)
  );
}
var O7 = { exports: {} },
  Le = {};
/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Uf = Symbol.for('react.element'),
  Wf = Symbol.for('react.portal'),
  Fu = Symbol.for('react.fragment'),
  ju = Symbol.for('react.strict_mode'),
  Au = Symbol.for('react.profiler'),
  zu = Symbol.for('react.provider'),
  Du = Symbol.for('react.context'),
  og = Symbol.for('react.server_context'),
  Vu = Symbol.for('react.forward_ref'),
  Hu = Symbol.for('react.suspense'),
  Bu = Symbol.for('react.suspense_list'),
  Uu = Symbol.for('react.memo'),
  Wu = Symbol.for('react.lazy'),
  ag = Symbol.for('react.offscreen'),
  $7;
$7 = Symbol.for('react.module.reference');
function zn(e) {
  if (typeof e == 'object' && e !== null) {
    var t = e.$$typeof;
    switch (t) {
      case Uf:
        switch (((e = e.type), e)) {
          case Fu:
          case Au:
          case ju:
          case Hu:
          case Bu:
            return e;
          default:
            switch (((e = e && e.$$typeof), e)) {
              case og:
              case Du:
              case Vu:
              case Wu:
              case Uu:
              case zu:
                return e;
              default:
                return t;
            }
        }
      case Wf:
        return t;
    }
  }
}
Le.ContextConsumer = Du;
Le.ContextProvider = zu;
Le.Element = Uf;
Le.ForwardRef = Vu;
Le.Fragment = Fu;
Le.Lazy = Wu;
Le.Memo = Uu;
Le.Portal = Wf;
Le.Profiler = Au;
Le.StrictMode = ju;
Le.Suspense = Hu;
Le.SuspenseList = Bu;
Le.isAsyncMode = function () {
  return !1;
};
Le.isConcurrentMode = function () {
  return !1;
};
Le.isContextConsumer = function (e) {
  return zn(e) === Du;
};
Le.isContextProvider = function (e) {
  return zn(e) === zu;
};
Le.isElement = function (e) {
  return typeof e == 'object' && e !== null && e.$$typeof === Uf;
};
Le.isForwardRef = function (e) {
  return zn(e) === Vu;
};
Le.isFragment = function (e) {
  return zn(e) === Fu;
};
Le.isLazy = function (e) {
  return zn(e) === Wu;
};
Le.isMemo = function (e) {
  return zn(e) === Uu;
};
Le.isPortal = function (e) {
  return zn(e) === Wf;
};
Le.isProfiler = function (e) {
  return zn(e) === Au;
};
Le.isStrictMode = function (e) {
  return zn(e) === ju;
};
Le.isSuspense = function (e) {
  return zn(e) === Hu;
};
Le.isSuspenseList = function (e) {
  return zn(e) === Bu;
};
Le.isValidElementType = function (e) {
  return (
    typeof e == 'string' ||
    typeof e == 'function' ||
    e === Fu ||
    e === Au ||
    e === ju ||
    e === Hu ||
    e === Bu ||
    e === ag ||
    (typeof e == 'object' &&
      e !== null &&
      (e.$$typeof === Wu ||
        e.$$typeof === Uu ||
        e.$$typeof === zu ||
        e.$$typeof === Du ||
        e.$$typeof === Vu ||
        e.$$typeof === $7 ||
        e.getModuleId !== void 0))
  );
};
Le.typeOf = zn;
O7.exports = Le;
var $a = O7.exports;
function zo(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
    n = [];
  return (
    mt.Children.forEach(e, function (r) {
      (r == null && !t.keepEmpty) ||
        (Array.isArray(r)
          ? (n = n.concat(zo(r)))
          : $a.isFragment(r) && r.props
            ? (n = n.concat(zo(r.props.children, t)))
            : n.push(r));
    }),
    n
  );
}
var q3 = {},
  lg = function (t) {};
function sg(e, t) {}
function ug(e, t) {}
function cg() {
  q3 = {};
}
function T7(e, t, n) {
  !t && !q3[n] && (e(!1, n), (q3[n] = !0));
}
function Xt(e, t) {
  T7(sg, e, t);
}
function fg(e, t) {
  T7(ug, e, t);
}
Xt.preMessage = lg;
Xt.resetWarned = cg;
Xt.noteOnce = fg;
function oe(e) {
  '@babel/helpers - typeof';
  return (
    (oe =
      typeof Symbol == 'function' && typeof Symbol.iterator == 'symbol'
        ? function (t) {
            return typeof t;
          }
        : function (t) {
            return t &&
              typeof Symbol == 'function' &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? 'symbol'
              : typeof t;
          }),
    oe(e)
  );
}
function dg(e, t) {
  if (oe(e) != 'object' || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t || 'default');
    if (oe(r) != 'object') return r;
    throw new TypeError('@@toPrimitive must return a primitive value.');
  }
  return (t === 'string' ? String : Number)(e);
}
function N7(e) {
  var t = dg(e, 'string');
  return oe(t) == 'symbol' ? t : t + '';
}
function L(e, t, n) {
  return (
    (t = N7(t)) in e
      ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 })
      : (e[t] = n),
    e
  );
}
function _4(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t &&
      (r = r.filter(function (i) {
        return Object.getOwnPropertyDescriptor(e, i).enumerable;
      })),
      n.push.apply(n, r);
  }
  return n;
}
function T(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? _4(Object(n), !0).forEach(function (r) {
          L(e, r, n[r]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : _4(Object(n)).forEach(function (r) {
            Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
          });
  }
  return e;
}
function il(e) {
  return e instanceof HTMLElement || e instanceof SVGElement;
}
function vg(e) {
  return e && oe(e) === 'object' && il(e.nativeElement) ? e.nativeElement : il(e) ? e : null;
}
function Ms(e) {
  var t = vg(e);
  if (t) return t;
  if (e instanceof mt.Component) {
    var n;
    return (n = S4.findDOMNode) === null || n === void 0 ? void 0 : n.call(S4, e);
  }
  return null;
}
function Ku(e, t, n) {
  var r = d.useRef({});
  return (
    (!('value' in r.current) || n(r.current.condition, t)) &&
      ((r.current.value = e()), (r.current.condition = t)),
    r.current.value
  );
}
var Kf = function (t, n) {
    typeof t == 'function' ? t(n) : oe(t) === 'object' && t && 'current' in t && (t.current = n);
  },
  F7 = function () {
    for (var t = arguments.length, n = new Array(t), r = 0; r < t; r++) n[r] = arguments[r];
    var i = n.filter(Boolean);
    return i.length <= 1
      ? i[0]
      : function (o) {
          n.forEach(function (a) {
            Kf(a, o);
          });
        };
  },
  Zu = function () {
    for (var t = arguments.length, n = new Array(t), r = 0; r < t; r++) n[r] = arguments[r];
    return Ku(
      function () {
        return F7.apply(void 0, n);
      },
      n,
      function (i, o) {
        return (
          i.length !== o.length ||
          i.every(function (a, l) {
            return a !== o[l];
          })
        );
      },
    );
  },
  Gu = function (t) {
    var n,
      r,
      i = $a.isMemo(t) ? t.type.type : t.type;
    return !(
      (typeof i == 'function' &&
        !((n = i.prototype) !== null && n !== void 0 && n.render) &&
        i.$$typeof !== $a.ForwardRef) ||
      (typeof t == 'function' &&
        !((r = t.prototype) !== null && r !== void 0 && r.render) &&
        t.$$typeof !== $a.ForwardRef)
    );
  };
function O4(e) {
  return d.isValidElement(e) && !$a.isFragment(e);
}
Number(d.version.split('.')[0]) >= 19;
var Q3 = d.createContext(null);
function mg(e) {
  var t = e.children,
    n = e.onBatchResize,
    r = d.useRef(0),
    i = d.useRef([]),
    o = d.useContext(Q3),
    a = d.useCallback(
      function (l, s, u) {
        r.current += 1;
        var c = r.current;
        i.current.push({ size: l, element: s, data: u }),
          Promise.resolve().then(function () {
            c === r.current && (n == null || n(i.current), (i.current = []));
          }),
          o == null || o(l, s, u);
      },
      [n, o],
    );
  return d.createElement(Q3.Provider, { value: a }, t);
}
var j7 = (function () {
    if (typeof Map < 'u') return Map;
    function e(t, n) {
      var r = -1;
      return (
        t.some(function (i, o) {
          return i[0] === n ? ((r = o), !0) : !1;
        }),
        r
      );
    }
    return (function () {
      function t() {
        this.__entries__ = [];
      }
      return (
        Object.defineProperty(t.prototype, 'size', {
          get: function () {
            return this.__entries__.length;
          },
          enumerable: !0,
          configurable: !0,
        }),
        (t.prototype.get = function (n) {
          var r = e(this.__entries__, n),
            i = this.__entries__[r];
          return i && i[1];
        }),
        (t.prototype.set = function (n, r) {
          var i = e(this.__entries__, n);
          ~i ? (this.__entries__[i][1] = r) : this.__entries__.push([n, r]);
        }),
        (t.prototype.delete = function (n) {
          var r = this.__entries__,
            i = e(r, n);
          ~i && r.splice(i, 1);
        }),
        (t.prototype.has = function (n) {
          return !!~e(this.__entries__, n);
        }),
        (t.prototype.clear = function () {
          this.__entries__.splice(0);
        }),
        (t.prototype.forEach = function (n, r) {
          r === void 0 && (r = null);
          for (var i = 0, o = this.__entries__; i < o.length; i++) {
            var a = o[i];
            n.call(r, a[1], a[0]);
          }
        }),
        t
      );
    })();
  })(),
  X3 = typeof window < 'u' && typeof document < 'u' && window.document === document,
  su = (function () {
    return typeof global < 'u' && global.Math === Math
      ? global
      : typeof self < 'u' && self.Math === Math
        ? self
        : typeof window < 'u' && window.Math === Math
          ? window
          : Function('return this')();
  })(),
  pg = (function () {
    return typeof requestAnimationFrame == 'function'
      ? requestAnimationFrame.bind(su)
      : function (e) {
          return setTimeout(function () {
            return e(Date.now());
          }, 1e3 / 60);
        };
  })(),
  hg = 2;
function gg(e, t) {
  var n = !1,
    r = !1,
    i = 0;
  function o() {
    n && ((n = !1), e()), r && l();
  }
  function a() {
    pg(o);
  }
  function l() {
    var s = Date.now();
    if (n) {
      if (s - i < hg) return;
      r = !0;
    } else (n = !0), (r = !1), setTimeout(a, t);
    i = s;
  }
  return l;
}
var yg = 20,
  Cg = ['top', 'right', 'bottom', 'left', 'width', 'height', 'size', 'weight'],
  wg = typeof MutationObserver < 'u',
  Sg = (function () {
    function e() {
      (this.connected_ = !1),
        (this.mutationEventsAdded_ = !1),
        (this.mutationsObserver_ = null),
        (this.observers_ = []),
        (this.onTransitionEnd_ = this.onTransitionEnd_.bind(this)),
        (this.refresh = gg(this.refresh.bind(this), yg));
    }
    return (
      (e.prototype.addObserver = function (t) {
        ~this.observers_.indexOf(t) || this.observers_.push(t), this.connected_ || this.connect_();
      }),
      (e.prototype.removeObserver = function (t) {
        var n = this.observers_,
          r = n.indexOf(t);
        ~r && n.splice(r, 1), !n.length && this.connected_ && this.disconnect_();
      }),
      (e.prototype.refresh = function () {
        var t = this.updateObservers_();
        t && this.refresh();
      }),
      (e.prototype.updateObservers_ = function () {
        var t = this.observers_.filter(function (n) {
          return n.gatherActive(), n.hasActive();
        });
        return (
          t.forEach(function (n) {
            return n.broadcastActive();
          }),
          t.length > 0
        );
      }),
      (e.prototype.connect_ = function () {
        !X3 ||
          this.connected_ ||
          (document.addEventListener('transitionend', this.onTransitionEnd_),
          window.addEventListener('resize', this.refresh),
          wg
            ? ((this.mutationsObserver_ = new MutationObserver(this.refresh)),
              this.mutationsObserver_.observe(document, {
                attributes: !0,
                childList: !0,
                characterData: !0,
                subtree: !0,
              }))
            : (document.addEventListener('DOMSubtreeModified', this.refresh),
              (this.mutationEventsAdded_ = !0)),
          (this.connected_ = !0));
      }),
      (e.prototype.disconnect_ = function () {
        !X3 ||
          !this.connected_ ||
          (document.removeEventListener('transitionend', this.onTransitionEnd_),
          window.removeEventListener('resize', this.refresh),
          this.mutationsObserver_ && this.mutationsObserver_.disconnect(),
          this.mutationEventsAdded_ &&
            document.removeEventListener('DOMSubtreeModified', this.refresh),
          (this.mutationsObserver_ = null),
          (this.mutationEventsAdded_ = !1),
          (this.connected_ = !1));
      }),
      (e.prototype.onTransitionEnd_ = function (t) {
        var n = t.propertyName,
          r = n === void 0 ? '' : n,
          i = Cg.some(function (o) {
            return !!~r.indexOf(o);
          });
        i && this.refresh();
      }),
      (e.getInstance = function () {
        return this.instance_ || (this.instance_ = new e()), this.instance_;
      }),
      (e.instance_ = null),
      e
    );
  })(),
  A7 = function (e, t) {
    for (var n = 0, r = Object.keys(t); n < r.length; n++) {
      var i = r[n];
      Object.defineProperty(e, i, { value: t[i], enumerable: !1, writable: !1, configurable: !0 });
    }
    return e;
  },
  Do = function (e) {
    var t = e && e.ownerDocument && e.ownerDocument.defaultView;
    return t || su;
  },
  z7 = qu(0, 0, 0, 0);
function uu(e) {
  return parseFloat(e) || 0;
}
function $4(e) {
  for (var t = [], n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
  return t.reduce(function (r, i) {
    var o = e['border-' + i + '-width'];
    return r + uu(o);
  }, 0);
}
function xg(e) {
  for (var t = ['top', 'right', 'bottom', 'left'], n = {}, r = 0, i = t; r < i.length; r++) {
    var o = i[r],
      a = e['padding-' + o];
    n[o] = uu(a);
  }
  return n;
}
function bg(e) {
  var t = e.getBBox();
  return qu(0, 0, t.width, t.height);
}
function Eg(e) {
  var t = e.clientWidth,
    n = e.clientHeight;
  if (!t && !n) return z7;
  var r = Do(e).getComputedStyle(e),
    i = xg(r),
    o = i.left + i.right,
    a = i.top + i.bottom,
    l = uu(r.width),
    s = uu(r.height);
  if (
    (r.boxSizing === 'border-box' &&
      (Math.round(l + o) !== t && (l -= $4(r, 'left', 'right') + o),
      Math.round(s + a) !== n && (s -= $4(r, 'top', 'bottom') + a)),
    !Pg(e))
  ) {
    var u = Math.round(l + o) - t,
      c = Math.round(s + a) - n;
    Math.abs(u) !== 1 && (l -= u), Math.abs(c) !== 1 && (s -= c);
  }
  return qu(i.left, i.top, l, s);
}
var kg = (function () {
  return typeof SVGGraphicsElement < 'u'
    ? function (e) {
        return e instanceof Do(e).SVGGraphicsElement;
      }
    : function (e) {
        return e instanceof Do(e).SVGElement && typeof e.getBBox == 'function';
      };
})();
function Pg(e) {
  return e === Do(e).document.documentElement;
}
function Mg(e) {
  return X3 ? (kg(e) ? bg(e) : Eg(e)) : z7;
}
function Rg(e) {
  var t = e.x,
    n = e.y,
    r = e.width,
    i = e.height,
    o = typeof DOMRectReadOnly < 'u' ? DOMRectReadOnly : Object,
    a = Object.create(o.prototype);
  return (
    A7(a, { x: t, y: n, width: r, height: i, top: n, right: t + r, bottom: i + n, left: t }), a
  );
}
function qu(e, t, n, r) {
  return { x: e, y: t, width: n, height: r };
}
var Lg = (function () {
    function e(t) {
      (this.broadcastWidth = 0),
        (this.broadcastHeight = 0),
        (this.contentRect_ = qu(0, 0, 0, 0)),
        (this.target = t);
    }
    return (
      (e.prototype.isActive = function () {
        var t = Mg(this.target);
        return (
          (this.contentRect_ = t),
          t.width !== this.broadcastWidth || t.height !== this.broadcastHeight
        );
      }),
      (e.prototype.broadcastRect = function () {
        var t = this.contentRect_;
        return (this.broadcastWidth = t.width), (this.broadcastHeight = t.height), t;
      }),
      e
    );
  })(),
  Ig = (function () {
    function e(t, n) {
      var r = Rg(n);
      A7(this, { target: t, contentRect: r });
    }
    return e;
  })(),
  _g = (function () {
    function e(t, n, r) {
      if (
        ((this.activeObservations_ = []), (this.observations_ = new j7()), typeof t != 'function')
      )
        throw new TypeError('The callback provided as parameter 1 is not a function.');
      (this.callback_ = t), (this.controller_ = n), (this.callbackCtx_ = r);
    }
    return (
      (e.prototype.observe = function (t) {
        if (!arguments.length) throw new TypeError('1 argument required, but only 0 present.');
        if (!(typeof Element > 'u' || !(Element instanceof Object))) {
          if (!(t instanceof Do(t).Element))
            throw new TypeError('parameter 1 is not of type "Element".');
          var n = this.observations_;
          n.has(t) ||
            (n.set(t, new Lg(t)), this.controller_.addObserver(this), this.controller_.refresh());
        }
      }),
      (e.prototype.unobserve = function (t) {
        if (!arguments.length) throw new TypeError('1 argument required, but only 0 present.');
        if (!(typeof Element > 'u' || !(Element instanceof Object))) {
          if (!(t instanceof Do(t).Element))
            throw new TypeError('parameter 1 is not of type "Element".');
          var n = this.observations_;
          n.has(t) && (n.delete(t), n.size || this.controller_.removeObserver(this));
        }
      }),
      (e.prototype.disconnect = function () {
        this.clearActive(), this.observations_.clear(), this.controller_.removeObserver(this);
      }),
      (e.prototype.gatherActive = function () {
        var t = this;
        this.clearActive(),
          this.observations_.forEach(function (n) {
            n.isActive() && t.activeObservations_.push(n);
          });
      }),
      (e.prototype.broadcastActive = function () {
        if (this.hasActive()) {
          var t = this.callbackCtx_,
            n = this.activeObservations_.map(function (r) {
              return new Ig(r.target, r.broadcastRect());
            });
          this.callback_.call(t, n, t), this.clearActive();
        }
      }),
      (e.prototype.clearActive = function () {
        this.activeObservations_.splice(0);
      }),
      (e.prototype.hasActive = function () {
        return this.activeObservations_.length > 0;
      }),
      e
    );
  })(),
  D7 = typeof WeakMap < 'u' ? new WeakMap() : new j7(),
  V7 = (function () {
    function e(t) {
      if (!(this instanceof e)) throw new TypeError('Cannot call a class as a function.');
      if (!arguments.length) throw new TypeError('1 argument required, but only 0 present.');
      var n = Sg.getInstance(),
        r = new _g(t, n, this);
      D7.set(this, r);
    }
    return e;
  })();
['observe', 'unobserve', 'disconnect'].forEach(function (e) {
  V7.prototype[e] = function () {
    var t;
    return (t = D7.get(this))[e].apply(t, arguments);
  };
});
var Og = (function () {
    return typeof su.ResizeObserver < 'u' ? su.ResizeObserver : V7;
  })(),
  qr = new Map();
function $g(e) {
  e.forEach(function (t) {
    var n,
      r = t.target;
    (n = qr.get(r)) === null ||
      n === void 0 ||
      n.forEach(function (i) {
        return i(r);
      });
  });
}
var H7 = new Og($g);
function Tg(e, t) {
  qr.has(e) || (qr.set(e, new Set()), H7.observe(e)), qr.get(e).add(t);
}
function Ng(e, t) {
  qr.has(e) && (qr.get(e).delete(t), qr.get(e).size || (H7.unobserve(e), qr.delete(e)));
}
function Ft(e, t) {
  if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
}
function T4(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    (r.enumerable = r.enumerable || !1),
      (r.configurable = !0),
      'value' in r && (r.writable = !0),
      Object.defineProperty(e, N7(r.key), r);
  }
}
function jt(e, t, n) {
  return (
    t && T4(e.prototype, t),
    n && T4(e, n),
    Object.defineProperty(e, 'prototype', { writable: !1 }),
    e
  );
}
function ol(e, t) {
  return (
    (ol = Object.setPrototypeOf
      ? Object.setPrototypeOf.bind()
      : function (n, r) {
          return (n.__proto__ = r), n;
        }),
    ol(e, t)
  );
}
function vi(e, t) {
  if (typeof t != 'function' && t !== null)
    throw new TypeError('Super expression must either be null or a function');
  (e.prototype = Object.create(t && t.prototype, {
    constructor: { value: e, writable: !0, configurable: !0 },
  })),
    Object.defineProperty(e, 'prototype', { writable: !1 }),
    t && ol(e, t);
}
function al(e) {
  return (
    (al = Object.setPrototypeOf
      ? Object.getPrototypeOf.bind()
      : function (t) {
          return t.__proto__ || Object.getPrototypeOf(t);
        }),
    al(e)
  );
}
function Zf() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
  } catch {}
  return (Zf = function () {
    return !!e;
  })();
}
function le(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function Fg(e, t) {
  if (t && (oe(t) == 'object' || typeof t == 'function')) return t;
  if (t !== void 0) throw new TypeError('Derived constructors may only return object or undefined');
  return le(e);
}
function mi(e) {
  var t = Zf();
  return function () {
    var n,
      r = al(e);
    if (t) {
      var i = al(this).constructor;
      n = Reflect.construct(r, arguments, i);
    } else n = r.apply(this, arguments);
    return Fg(this, n);
  };
}
var jg = (function (e) {
  vi(n, e);
  var t = mi(n);
  function n() {
    return Ft(this, n), t.apply(this, arguments);
  }
  return (
    jt(n, [
      {
        key: 'render',
        value: function () {
          return this.props.children;
        },
      },
    ]),
    n
  );
})(d.Component);
function Ag(e, t) {
  var n = e.children,
    r = e.disabled,
    i = d.useRef(null),
    o = d.useRef(null),
    a = d.useContext(Q3),
    l = typeof n == 'function',
    s = l ? n(i) : n,
    u = d.useRef({ width: -1, height: -1, offsetWidth: -1, offsetHeight: -1 }),
    c = !l && d.isValidElement(s) && Gu(s),
    f = c ? s.ref : null,
    v = Zu(f, i),
    y = function () {
      var p;
      return (
        Ms(i.current) ||
        (i.current && oe(i.current) === 'object'
          ? Ms((p = i.current) === null || p === void 0 ? void 0 : p.nativeElement)
          : null) ||
        Ms(o.current)
      );
    };
  d.useImperativeHandle(t, function () {
    return y();
  });
  var g = d.useRef(e);
  g.current = e;
  var C = d.useCallback(function (w) {
    var p = g.current,
      m = p.onResize,
      h = p.data,
      S = w.getBoundingClientRect(),
      x = S.width,
      b = S.height,
      E = w.offsetWidth,
      P = w.offsetHeight,
      M = Math.floor(x),
      I = Math.floor(b);
    if (
      u.current.width !== M ||
      u.current.height !== I ||
      u.current.offsetWidth !== E ||
      u.current.offsetHeight !== P
    ) {
      var F = { width: M, height: I, offsetWidth: E, offsetHeight: P };
      u.current = F;
      var z = E === Math.round(x) ? x : E,
        j = P === Math.round(b) ? b : P,
        A = T(T({}, F), {}, { offsetWidth: z, offsetHeight: j });
      a == null || a(A, w, h),
        m &&
          Promise.resolve().then(function () {
            m(A, w);
          });
    }
  }, []);
  return (
    d.useEffect(
      function () {
        var w = y();
        return (
          w && !r && Tg(w, C),
          function () {
            return Ng(w, C);
          }
        );
      },
      [i.current, r],
    ),
    d.createElement(jg, { ref: o }, c ? d.cloneElement(s, { ref: v }) : s)
  );
}
var zg = d.forwardRef(Ag),
  Dg = 'rc-observer-key';
function Vg(e, t) {
  var n = e.children,
    r = typeof n == 'function' ? [n] : zo(n);
  return r.map(function (i, o) {
    var a = (i == null ? void 0 : i.key) || ''.concat(Dg, '-').concat(o);
    return d.createElement(zg, ye({}, e, { key: a, ref: o === 0 ? t : void 0 }), i);
  });
}
var Ml = d.forwardRef(Vg);
Ml.Collection = mg;
function Rl(e, t) {
  var n = Object.assign({}, e);
  return (
    Array.isArray(t) &&
      t.forEach(function (r) {
        delete n[r];
      }),
    n
  );
}
function Y3(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function Hg(e) {
  if (Array.isArray(e)) return Y3(e);
}
function B7(e) {
  if ((typeof Symbol < 'u' && e[Symbol.iterator] != null) || e['@@iterator'] != null)
    return Array.from(e);
}
function Gf(e, t) {
  if (e) {
    if (typeof e == 'string') return Y3(e, t);
    var n = {}.toString.call(e).slice(8, -1);
    return (
      n === 'Object' && e.constructor && (n = e.constructor.name),
      n === 'Map' || n === 'Set'
        ? Array.from(e)
        : n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
          ? Y3(e, t)
          : void 0
    );
  }
}
function Bg() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function J(e) {
  return Hg(e) || B7(e) || Gf(e) || Bg();
}
var U7 = function (t) {
    return +setTimeout(t, 16);
  },
  W7 = function (t) {
    return clearTimeout(t);
  };
typeof window < 'u' &&
  'requestAnimationFrame' in window &&
  ((U7 = function (t) {
    return window.requestAnimationFrame(t);
  }),
  (W7 = function (t) {
    return window.cancelAnimationFrame(t);
  }));
var N4 = 0,
  qf = new Map();
function K7(e) {
  qf.delete(e);
}
var Mr = function (t) {
  var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1;
  N4 += 1;
  var r = N4;
  function i(o) {
    if (o === 0) K7(r), t();
    else {
      var a = U7(function () {
        i(o - 1);
      });
      qf.set(r, a);
    }
  }
  return i(n), r;
};
Mr.cancel = function (e) {
  var t = qf.get(e);
  return K7(e), W7(t);
};
function Z7(e) {
  if (Array.isArray(e)) return e;
}
function Ug(e, t) {
  var n = e == null ? null : (typeof Symbol < 'u' && e[Symbol.iterator]) || e['@@iterator'];
  if (n != null) {
    var r,
      i,
      o,
      a,
      l = [],
      s = !0,
      u = !1;
    try {
      if (((o = (n = n.call(e)).next), t === 0)) {
        if (Object(n) !== n) return;
        s = !1;
      } else for (; !(s = (r = o.call(n)).done) && (l.push(r.value), l.length !== t); s = !0);
    } catch (c) {
      (u = !0), (i = c);
    } finally {
      try {
        if (!s && n.return != null && ((a = n.return()), Object(a) !== a)) return;
      } finally {
        if (u) throw i;
      }
    }
    return l;
  }
}
function G7() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function B(e, t) {
  return Z7(e) || Ug(e, t) || Gf(e, t) || G7();
}
function ll(e) {
  for (var t = 0, n, r = 0, i = e.length; i >= 4; ++r, i -= 4)
    (n =
      (e.charCodeAt(r) & 255) |
      ((e.charCodeAt(++r) & 255) << 8) |
      ((e.charCodeAt(++r) & 255) << 16) |
      ((e.charCodeAt(++r) & 255) << 24)),
      (n = (n & 65535) * 1540483477 + (((n >>> 16) * 59797) << 16)),
      (n ^= n >>> 24),
      (t =
        ((n & 65535) * 1540483477 + (((n >>> 16) * 59797) << 16)) ^
        ((t & 65535) * 1540483477 + (((t >>> 16) * 59797) << 16)));
  switch (i) {
    case 3:
      t ^= (e.charCodeAt(r + 2) & 255) << 16;
    case 2:
      t ^= (e.charCodeAt(r + 1) & 255) << 8;
    case 1:
      (t ^= e.charCodeAt(r) & 255), (t = (t & 65535) * 1540483477 + (((t >>> 16) * 59797) << 16));
  }
  return (
    (t ^= t >>> 13),
    (t = (t & 65535) * 1540483477 + (((t >>> 16) * 59797) << 16)),
    ((t ^ (t >>> 15)) >>> 0).toString(36)
  );
}
function yn() {
  return !!(typeof window < 'u' && window.document && window.document.createElement);
}
function Wg(e, t) {
  if (!e) return !1;
  if (e.contains) return e.contains(t);
  for (var n = t; n; ) {
    if (n === e) return !0;
    n = n.parentNode;
  }
  return !1;
}
var F4 = 'data-rc-order',
  j4 = 'data-rc-priority',
  Kg = 'rc-util-key',
  J3 = new Map();
function q7() {
  var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {},
    t = e.mark;
  return t ? (t.startsWith('data-') ? t : 'data-'.concat(t)) : Kg;
}
function Qu(e) {
  if (e.attachTo) return e.attachTo;
  var t = document.querySelector('head');
  return t || document.body;
}
function Zg(e) {
  return e === 'queue' ? 'prependQueue' : e ? 'prepend' : 'append';
}
function Qf(e) {
  return Array.from((J3.get(e) || e).children).filter(function (t) {
    return t.tagName === 'STYLE';
  });
}
function Q7(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  if (!yn()) return null;
  var n = t.csp,
    r = t.prepend,
    i = t.priority,
    o = i === void 0 ? 0 : i,
    a = Zg(r),
    l = a === 'prependQueue',
    s = document.createElement('style');
  s.setAttribute(F4, a),
    l && o && s.setAttribute(j4, ''.concat(o)),
    n != null && n.nonce && (s.nonce = n == null ? void 0 : n.nonce),
    (s.innerHTML = e);
  var u = Qu(t),
    c = u.firstChild;
  if (r) {
    if (l) {
      var f = (t.styles || Qf(u)).filter(function (v) {
        if (!['prepend', 'prependQueue'].includes(v.getAttribute(F4))) return !1;
        var y = Number(v.getAttribute(j4) || 0);
        return o >= y;
      });
      if (f.length) return u.insertBefore(s, f[f.length - 1].nextSibling), s;
    }
    u.insertBefore(s, c);
  } else u.appendChild(s);
  return s;
}
function X7(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
    n = Qu(t);
  return (t.styles || Qf(n)).find(function (r) {
    return r.getAttribute(q7(t)) === e;
  });
}
function sl(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
    n = X7(e, t);
  if (n) {
    var r = Qu(t);
    r.removeChild(n);
  }
}
function Gg(e, t) {
  var n = J3.get(e);
  if (!n || !Wg(document, n)) {
    var r = Q7('', t),
      i = r.parentNode;
    J3.set(e, i), e.removeChild(r);
  }
}
function Rr(e, t) {
  var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {},
    r = Qu(n),
    i = Qf(r),
    o = T(T({}, n), {}, { styles: i });
  Gg(r, o);
  var a = X7(t, o);
  if (a) {
    var l, s;
    if (
      (l = o.csp) !== null &&
      l !== void 0 &&
      l.nonce &&
      a.nonce !== ((s = o.csp) === null || s === void 0 ? void 0 : s.nonce)
    ) {
      var u;
      a.nonce = (u = o.csp) === null || u === void 0 ? void 0 : u.nonce;
    }
    return a.innerHTML !== e && (a.innerHTML = e), a;
  }
  var c = Q7(e, o);
  return c.setAttribute(q7(o), t), c;
}
function qg(e, t) {
  if (e == null) return {};
  var n = {};
  for (var r in e)
    if ({}.hasOwnProperty.call(e, r)) {
      if (t.includes(r)) continue;
      n[r] = e[r];
    }
  return n;
}
function ze(e, t) {
  if (e == null) return {};
  var n,
    r,
    i = qg(e, t);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (r = 0; r < o.length; r++)
      (n = o[r]), t.includes(n) || ({}.propertyIsEnumerable.call(e, n) && (i[n] = e[n]));
  }
  return i;
}
function ul(e, t) {
  var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1,
    r = new Set();
  function i(o, a) {
    var l = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1,
      s = r.has(o);
    if ((Xt(!s, 'Warning: There may be circular references'), s)) return !1;
    if (o === a) return !0;
    if (n && l > 1) return !1;
    r.add(o);
    var u = l + 1;
    if (Array.isArray(o)) {
      if (!Array.isArray(a) || o.length !== a.length) return !1;
      for (var c = 0; c < o.length; c++) if (!i(o[c], a[c], u)) return !1;
      return !0;
    }
    if (o && a && oe(o) === 'object' && oe(a) === 'object') {
      var f = Object.keys(o);
      return f.length !== Object.keys(a).length
        ? !1
        : f.every(function (v) {
            return i(o[v], a[v], u);
          });
    }
    return !1;
  }
  return i(e, t);
}
var Qg = '%';
function e2(e) {
  return e.join(Qg);
}
var Xg = (function () {
    function e(t) {
      Ft(this, e),
        L(this, 'instanceId', void 0),
        L(this, 'cache', new Map()),
        (this.instanceId = t);
    }
    return (
      jt(e, [
        {
          key: 'get',
          value: function (n) {
            return this.opGet(e2(n));
          },
        },
        {
          key: 'opGet',
          value: function (n) {
            return this.cache.get(n) || null;
          },
        },
        {
          key: 'update',
          value: function (n, r) {
            return this.opUpdate(e2(n), r);
          },
        },
        {
          key: 'opUpdate',
          value: function (n, r) {
            var i = this.cache.get(n),
              o = r(i);
            o === null ? this.cache.delete(n) : this.cache.set(n, o);
          },
        },
      ]),
      e
    );
  })(),
  Vo = 'data-token-hash',
  Xn = 'data-css-hash',
  Qr = '__cssinjs_instance__';
function Yg() {
  var e = Math.random().toString(12).slice(2);
  if (typeof document < 'u' && document.head && document.body) {
    var t = document.body.querySelectorAll('style['.concat(Xn, ']')) || [],
      n = document.head.firstChild;
    Array.from(t).forEach(function (i) {
      (i[Qr] = i[Qr] || e), i[Qr] === e && document.head.insertBefore(i, n);
    });
    var r = {};
    Array.from(document.querySelectorAll('style['.concat(Xn, ']'))).forEach(function (i) {
      var o = i.getAttribute(Xn);
      if (r[o]) {
        if (i[Qr] === e) {
          var a;
          (a = i.parentNode) === null || a === void 0 || a.removeChild(i);
        }
      } else r[o] = !0;
    });
  }
  return new Xg(e);
}
var Jg = d.createContext({ hashPriority: 'low', cache: Yg(), defaultCache: !0 });
const Xu = Jg;
function e8(e, t) {
  if (e.length !== t.length) return !1;
  for (var n = 0; n < e.length; n++) if (e[n] !== t[n]) return !1;
  return !0;
}
var Xf = (function () {
  function e() {
    Ft(this, e),
      L(this, 'cache', void 0),
      L(this, 'keys', void 0),
      L(this, 'cacheCallTimes', void 0),
      (this.cache = new Map()),
      (this.keys = []),
      (this.cacheCallTimes = 0);
  }
  return (
    jt(e, [
      {
        key: 'size',
        value: function () {
          return this.keys.length;
        },
      },
      {
        key: 'internalGet',
        value: function (n) {
          var r,
            i,
            o = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1,
            a = { map: this.cache };
          return (
            n.forEach(function (l) {
              if (!a) a = void 0;
              else {
                var s;
                a =
                  (s = a) === null || s === void 0 || (s = s.map) === null || s === void 0
                    ? void 0
                    : s.get(l);
              }
            }),
            (r = a) !== null &&
              r !== void 0 &&
              r.value &&
              o &&
              (a.value[1] = this.cacheCallTimes++),
            (i = a) === null || i === void 0 ? void 0 : i.value
          );
        },
      },
      {
        key: 'get',
        value: function (n) {
          var r;
          return (r = this.internalGet(n, !0)) === null || r === void 0 ? void 0 : r[0];
        },
      },
      {
        key: 'has',
        value: function (n) {
          return !!this.internalGet(n);
        },
      },
      {
        key: 'set',
        value: function (n, r) {
          var i = this;
          if (!this.has(n)) {
            if (this.size() + 1 > e.MAX_CACHE_SIZE + e.MAX_CACHE_OFFSET) {
              var o = this.keys.reduce(
                  function (u, c) {
                    var f = B(u, 2),
                      v = f[1];
                    return i.internalGet(c)[1] < v ? [c, i.internalGet(c)[1]] : u;
                  },
                  [this.keys[0], this.cacheCallTimes],
                ),
                a = B(o, 1),
                l = a[0];
              this.delete(l);
            }
            this.keys.push(n);
          }
          var s = this.cache;
          n.forEach(function (u, c) {
            if (c === n.length - 1) s.set(u, { value: [r, i.cacheCallTimes++] });
            else {
              var f = s.get(u);
              f ? f.map || (f.map = new Map()) : s.set(u, { map: new Map() }), (s = s.get(u).map);
            }
          });
        },
      },
      {
        key: 'deleteByPath',
        value: function (n, r) {
          var i = n.get(r[0]);
          if (r.length === 1) {
            var o;
            return (
              i.map ? n.set(r[0], { map: i.map }) : n.delete(r[0]),
              (o = i.value) === null || o === void 0 ? void 0 : o[0]
            );
          }
          var a = this.deleteByPath(i.map, r.slice(1));
          return (!i.map || i.map.size === 0) && !i.value && n.delete(r[0]), a;
        },
      },
      {
        key: 'delete',
        value: function (n) {
          if (this.has(n))
            return (
              (this.keys = this.keys.filter(function (r) {
                return !e8(r, n);
              })),
              this.deleteByPath(this.cache, n)
            );
        },
      },
    ]),
    e
  );
})();
L(Xf, 'MAX_CACHE_SIZE', 20);
L(Xf, 'MAX_CACHE_OFFSET', 5);
var A4 = 0,
  Y7 = (function () {
    function e(t) {
      Ft(this, e),
        L(this, 'derivatives', void 0),
        L(this, 'id', void 0),
        (this.derivatives = Array.isArray(t) ? t : [t]),
        (this.id = A4),
        t.length === 0 && (t.length > 0, void 0),
        (A4 += 1);
    }
    return (
      jt(e, [
        {
          key: 'getDerivativeToken',
          value: function (n) {
            return this.derivatives.reduce(
              function (r, i) {
                return i(n, r);
              },
              void 0,
            );
          },
        },
      ]),
      e
    );
  })(),
  Fc = new Xf();
function t2(e) {
  var t = Array.isArray(e) ? e : [e];
  return Fc.has(t) || Fc.set(t, new Y7(t)), Fc.get(t);
}
var t8 = new WeakMap(),
  jc = {};
function n8(e, t) {
  for (var n = t8, r = 0; r < t.length; r += 1) {
    var i = t[r];
    n.has(i) || n.set(i, new WeakMap()), (n = n.get(i));
  }
  return n.has(jc) || n.set(jc, e()), n.get(jc);
}
var z4 = new WeakMap();
function Ta(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1,
    n = z4.get(e) || '';
  return (
    n ||
      (Object.keys(e).forEach(function (r) {
        var i = e[r];
        (n += r),
          i instanceof Y7 ? (n += i.id) : i && oe(i) === 'object' ? (n += Ta(i, t)) : (n += i);
      }),
      t && (n = ll(n)),
      z4.set(e, n)),
    n
  );
}
function D4(e, t) {
  return ll(''.concat(t, '_').concat(Ta(e, !0)));
}
var n2 = yn();
function be(e) {
  return typeof e == 'number' ? ''.concat(e, 'px') : e;
}
function cu(e, t, n) {
  var r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {},
    i = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : !1;
  if (i) return e;
  var o = T(T({}, r), {}, L(L({}, Vo, t), Xn, n)),
    a = Object.keys(o)
      .map(function (l) {
        var s = o[l];
        return s ? ''.concat(l, '="').concat(s, '"') : null;
      })
      .filter(function (l) {
        return l;
      })
      .join(' ');
  return '<style '.concat(a, '>').concat(e, '</style>');
}
var Rs = function (t) {
    var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : '';
    return '--'
      .concat(n ? ''.concat(n, '-') : '')
      .concat(t)
      .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
      .replace(/([A-Z]+)([A-Z][a-z0-9]+)/g, '$1-$2')
      .replace(/([a-z])([A-Z0-9])/g, '$1-$2')
      .toLowerCase();
  },
  r8 = function (t, n, r) {
    return Object.keys(t).length
      ? '.'
          .concat(n)
          .concat(r != null && r.scope ? '.'.concat(r.scope) : '', '{')
          .concat(
            Object.entries(t)
              .map(function (i) {
                var o = B(i, 2),
                  a = o[0],
                  l = o[1];
                return ''.concat(a, ':').concat(l, ';');
              })
              .join(''),
            '}',
          )
      : '';
  },
  J7 = function (t, n, r) {
    var i = {},
      o = {};
    return (
      Object.entries(t).forEach(function (a) {
        var l,
          s,
          u = B(a, 2),
          c = u[0],
          f = u[1];
        if (r != null && (l = r.preserve) !== null && l !== void 0 && l[c]) o[c] = f;
        else if (
          (typeof f == 'string' || typeof f == 'number') &&
          !(r != null && (s = r.ignore) !== null && s !== void 0 && s[c])
        ) {
          var v,
            y = Rs(c, r == null ? void 0 : r.prefix);
          (i[y] =
            typeof f == 'number' &&
            !(r != null && (v = r.unitless) !== null && v !== void 0 && v[c])
              ? ''.concat(f, 'px')
              : String(f)),
            (o[c] = 'var('.concat(y, ')'));
        }
      }),
      [o, r8(i, n, { scope: r == null ? void 0 : r.scope })]
    );
  },
  V4 = yn() ? d.useLayoutEffect : d.useEffect,
  Bt = function (t, n) {
    var r = d.useRef(!0);
    V4(function () {
      return t(r.current);
    }, n),
      V4(function () {
        return (
          (r.current = !1),
          function () {
            r.current = !0;
          }
        );
      }, []);
  },
  H4 = function (t, n) {
    Bt(function (r) {
      if (!r) return t();
    }, n);
  },
  i8 = T({}, Cl),
  B4 = i8.useInsertionEffect,
  o8 = function (t, n, r) {
    d.useMemo(t, r),
      Bt(function () {
        return n(!0);
      }, r);
  },
  a8 = B4
    ? function (e, t, n) {
        return B4(function () {
          return e(), t();
        }, n);
      }
    : o8;
const l8 = a8;
var s8 = T({}, Cl),
  u8 = s8.useInsertionEffect,
  c8 = function (t) {
    var n = [],
      r = !1;
    function i(o) {
      r || n.push(o);
    }
    return (
      d.useEffect(function () {
        return (
          (r = !1),
          function () {
            (r = !0),
              n.length &&
                n.forEach(function (o) {
                  return o();
                });
          }
        );
      }, t),
      i
    );
  },
  f8 = function () {
    return function (t) {
      t();
    };
  },
  d8 = typeof u8 < 'u' ? c8 : f8;
const v8 = d8;
function Yf(e, t, n, r, i) {
  var o = d.useContext(Xu),
    a = o.cache,
    l = [e].concat(J(t)),
    s = e2(l),
    u = v8([s]),
    c = function (g) {
      a.opUpdate(s, function (C) {
        var w = C || [void 0, void 0],
          p = B(w, 2),
          m = p[0],
          h = m === void 0 ? 0 : m,
          S = p[1],
          x = S,
          b = x || n(),
          E = [h, b];
        return g ? g(E) : E;
      });
    };
  d.useMemo(
    function () {
      c();
    },
    [s],
  );
  var f = a.opGet(s),
    v = f[1];
  return (
    l8(
      function () {
        i == null || i(v);
      },
      function (y) {
        return (
          c(function (g) {
            var C = B(g, 2),
              w = C[0],
              p = C[1];
            return y && w === 0 && (i == null || i(v)), [w + 1, p];
          }),
          function () {
            a.opUpdate(s, function (g) {
              var C = g || [],
                w = B(C, 2),
                p = w[0],
                m = p === void 0 ? 0 : p,
                h = w[1],
                S = m - 1;
              return S === 0
                ? (u(function () {
                    (y || !a.opGet(s)) && (r == null || r(h, !1));
                  }),
                  null)
                : [m - 1, h];
            });
          }
        );
      },
      [s],
    ),
    v
  );
}
var m8 = {},
  p8 = 'css',
  Ei = new Map();
function h8(e) {
  Ei.set(e, (Ei.get(e) || 0) + 1);
}
function g8(e, t) {
  if (typeof document < 'u') {
    var n = document.querySelectorAll('style['.concat(Vo, '="').concat(e, '"]'));
    n.forEach(function (r) {
      if (r[Qr] === t) {
        var i;
        (i = r.parentNode) === null || i === void 0 || i.removeChild(r);
      }
    });
  }
}
var y8 = 0;
function C8(e, t) {
  Ei.set(e, (Ei.get(e) || 0) - 1);
  var n = Array.from(Ei.keys()),
    r = n.filter(function (i) {
      var o = Ei.get(i) || 0;
      return o <= 0;
    });
  n.length - r.length > y8 &&
    r.forEach(function (i) {
      g8(i, t), Ei.delete(i);
    });
}
var w8 = function (t, n, r, i) {
    var o = r.getDerivativeToken(t),
      a = T(T({}, o), n);
    return i && (a = i(a)), a;
  },
  e0 = 'token';
function S8(e, t) {
  var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {},
    r = d.useContext(Xu),
    i = r.cache.instanceId,
    o = r.container,
    a = n.salt,
    l = a === void 0 ? '' : a,
    s = n.override,
    u = s === void 0 ? m8 : s,
    c = n.formatToken,
    f = n.getComputedToken,
    v = n.cssVar,
    y = n8(function () {
      return Object.assign.apply(Object, [{}].concat(J(t)));
    }, t),
    g = Ta(y),
    C = Ta(u),
    w = v ? Ta(v) : '',
    p = Yf(
      e0,
      [l, e.id, g, C, w],
      function () {
        var m,
          h = f ? f(y, u, e) : w8(y, u, e, c),
          S = T({}, h),
          x = '';
        if (v) {
          var b = J7(h, v.key, {
              prefix: v.prefix,
              ignore: v.ignore,
              unitless: v.unitless,
              preserve: v.preserve,
            }),
            E = B(b, 2);
          (h = E[0]), (x = E[1]);
        }
        var P = D4(h, l);
        (h._tokenKey = P), (S._tokenKey = D4(S, l));
        var M = (m = v == null ? void 0 : v.key) !== null && m !== void 0 ? m : P;
        (h._themeKey = M), h8(M);
        var I = ''.concat(p8, '-').concat(ll(P));
        return (h._hashId = I), [h, I, S, x, (v == null ? void 0 : v.key) || ''];
      },
      function (m) {
        C8(m[0]._themeKey, i);
      },
      function (m) {
        var h = B(m, 4),
          S = h[0],
          x = h[3];
        if (v && x) {
          var b = Rr(x, ll('css-variables-'.concat(S._themeKey)), {
            mark: Xn,
            prepend: 'queue',
            attachTo: o,
            priority: -999,
          });
          (b[Qr] = i), b.setAttribute(Vo, S._themeKey);
        }
      },
    );
  return p;
}
var x8 = function (t, n, r) {
    var i = B(t, 5),
      o = i[2],
      a = i[3],
      l = i[4],
      s = r || {},
      u = s.plain;
    if (!a) return null;
    var c = o._tokenKey,
      f = -999,
      v = { 'data-rc-order': 'prependQueue', 'data-rc-priority': ''.concat(f) },
      y = cu(a, l, c, v, u);
    return [f, c, y];
  },
  b8 = {
    animationIterationCount: 1,
    borderImageOutset: 1,
    borderImageSlice: 1,
    borderImageWidth: 1,
    boxFlex: 1,
    boxFlexGroup: 1,
    boxOrdinalGroup: 1,
    columnCount: 1,
    columns: 1,
    flex: 1,
    flexGrow: 1,
    flexPositive: 1,
    flexShrink: 1,
    flexNegative: 1,
    flexOrder: 1,
    gridRow: 1,
    gridRowEnd: 1,
    gridRowSpan: 1,
    gridRowStart: 1,
    gridColumn: 1,
    gridColumnEnd: 1,
    gridColumnSpan: 1,
    gridColumnStart: 1,
    msGridRow: 1,
    msGridRowSpan: 1,
    msGridColumn: 1,
    msGridColumnSpan: 1,
    fontWeight: 1,
    lineHeight: 1,
    opacity: 1,
    order: 1,
    orphans: 1,
    tabSize: 1,
    widows: 1,
    zIndex: 1,
    zoom: 1,
    WebkitLineClamp: 1,
    fillOpacity: 1,
    floodOpacity: 1,
    stopOpacity: 1,
    strokeDasharray: 1,
    strokeDashoffset: 1,
    strokeMiterlimit: 1,
    strokeOpacity: 1,
    strokeWidth: 1,
  },
  t0 = 'comm',
  n0 = 'rule',
  r0 = 'decl',
  E8 = '@import',
  k8 = '@keyframes',
  P8 = '@layer',
  i0 = Math.abs,
  Jf = String.fromCharCode;
function o0(e) {
  return e.trim();
}
function Ls(e, t, n) {
  return e.replace(t, n);
}
function M8(e, t, n) {
  return e.indexOf(t, n);
}
function cl(e, t) {
  return e.charCodeAt(t) | 0;
}
function Ho(e, t, n) {
  return e.slice(t, n);
}
function ar(e) {
  return e.length;
}
function R8(e) {
  return e.length;
}
function rs(e, t) {
  return t.push(e), e;
}
var Yu = 1,
  Bo = 1,
  a0 = 0,
  An = 0,
  dt = 0,
  Qo = '';
function ed(e, t, n, r, i, o, a, l) {
  return {
    value: e,
    root: t,
    parent: n,
    type: r,
    props: i,
    children: o,
    line: Yu,
    column: Bo,
    length: a,
    return: '',
    siblings: l,
  };
}
function L8() {
  return dt;
}
function I8() {
  return (dt = An > 0 ? cl(Qo, --An) : 0), Bo--, dt === 10 && ((Bo = 1), Yu--), dt;
}
function Yn() {
  return (dt = An < a0 ? cl(Qo, An++) : 0), Bo++, dt === 10 && ((Bo = 1), Yu++), dt;
}
function Xr() {
  return cl(Qo, An);
}
function Is() {
  return An;
}
function Ju(e, t) {
  return Ho(Qo, e, t);
}
function fl(e) {
  switch (e) {
    case 0:
    case 9:
    case 10:
    case 13:
    case 32:
      return 5;
    case 33:
    case 43:
    case 44:
    case 47:
    case 62:
    case 64:
    case 126:
    case 59:
    case 123:
    case 125:
      return 4;
    case 58:
      return 3;
    case 34:
    case 39:
    case 40:
    case 91:
      return 2;
    case 41:
    case 93:
      return 1;
  }
  return 0;
}
function _8(e) {
  return (Yu = Bo = 1), (a0 = ar((Qo = e))), (An = 0), [];
}
function O8(e) {
  return (Qo = ''), e;
}
function Ac(e) {
  return o0(Ju(An - 1, r2(e === 91 ? e + 2 : e === 40 ? e + 1 : e)));
}
function $8(e) {
  for (; (dt = Xr()) && dt < 33; ) Yn();
  return fl(e) > 2 || fl(dt) > 3 ? '' : ' ';
}
function T8(e, t) {
  for (; --t && Yn() && !(dt < 48 || dt > 102 || (dt > 57 && dt < 65) || (dt > 70 && dt < 97)); );
  return Ju(e, Is() + (t < 6 && Xr() == 32 && Yn() == 32));
}
function r2(e) {
  for (; Yn(); )
    switch (dt) {
      case e:
        return An;
      case 34:
      case 39:
        e !== 34 && e !== 39 && r2(dt);
        break;
      case 40:
        e === 41 && r2(e);
        break;
      case 92:
        Yn();
        break;
    }
  return An;
}
function N8(e, t) {
  for (; Yn() && e + dt !== 57; ) if (e + dt === 84 && Xr() === 47) break;
  return '/*' + Ju(t, An - 1) + '*' + Jf(e === 47 ? e : Yn());
}
function F8(e) {
  for (; !fl(Xr()); ) Yn();
  return Ju(e, An);
}
function j8(e) {
  return O8(_s('', null, null, null, [''], (e = _8(e)), 0, [0], e));
}
function _s(e, t, n, r, i, o, a, l, s) {
  for (
    var u = 0,
      c = 0,
      f = a,
      v = 0,
      y = 0,
      g = 0,
      C = 1,
      w = 1,
      p = 1,
      m = 0,
      h = '',
      S = i,
      x = o,
      b = r,
      E = h;
    w;

  )
    switch (((g = m), (m = Yn()))) {
      case 40:
        if (g != 108 && cl(E, f - 1) == 58) {
          M8((E += Ls(Ac(m), '&', '&\f')), '&\f', i0(u ? l[u - 1] : 0)) != -1 && (p = -1);
          break;
        }
      case 34:
      case 39:
      case 91:
        E += Ac(m);
        break;
      case 9:
      case 10:
      case 13:
      case 32:
        E += $8(g);
        break;
      case 92:
        E += T8(Is() - 1, 7);
        continue;
      case 47:
        switch (Xr()) {
          case 42:
          case 47:
            rs(A8(N8(Yn(), Is()), t, n, s), s),
              (fl(g || 1) == 5 || fl(Xr() || 1) == 5) &&
                ar(E) &&
                Ho(E, -1, void 0) !== ' ' &&
                (E += ' ');
            break;
          default:
            E += '/';
        }
        break;
      case 123 * C:
        l[u++] = ar(E) * p;
      case 125 * C:
      case 59:
      case 0:
        switch (m) {
          case 0:
          case 125:
            w = 0;
          case 59 + c:
            p == -1 && (E = Ls(E, /\f/g, '')),
              y > 0 &&
                (ar(E) - f || (C === 0 && g === 47)) &&
                rs(
                  y > 32 ? W4(E + ';', r, n, f - 1, s) : W4(Ls(E, ' ', '') + ';', r, n, f - 2, s),
                  s,
                );
            break;
          case 59:
            E += ';';
          default:
            if ((rs((b = U4(E, t, n, u, c, i, l, h, (S = []), (x = []), f, o)), o), m === 123))
              if (c === 0) _s(E, t, b, b, S, o, f, l, x);
              else
                switch (v === 99 && cl(E, 3) === 110 ? 100 : v) {
                  case 100:
                  case 108:
                  case 109:
                  case 115:
                    _s(
                      e,
                      b,
                      b,
                      r && rs(U4(e, b, b, 0, 0, i, l, h, i, (S = []), f, x), x),
                      i,
                      x,
                      f,
                      l,
                      r ? S : x,
                    );
                    break;
                  default:
                    _s(E, b, b, b, [''], x, 0, l, x);
                }
        }
        (u = c = y = 0), (C = p = 1), (h = E = ''), (f = a);
        break;
      case 58:
        (f = 1 + ar(E)), (y = g);
      default:
        if (C < 1) {
          if (m == 123) --C;
          else if (m == 125 && C++ == 0 && I8() == 125) continue;
        }
        switch (((E += Jf(m)), m * C)) {
          case 38:
            p = c > 0 ? 1 : ((E += '\f'), -1);
            break;
          case 44:
            (l[u++] = (ar(E) - 1) * p), (p = 1);
            break;
          case 64:
            Xr() === 45 && (E += Ac(Yn())), (v = Xr()), (c = f = ar((h = E += F8(Is())))), m++;
            break;
          case 45:
            g === 45 && ar(E) == 2 && (C = 0);
        }
    }
  return o;
}
function U4(e, t, n, r, i, o, a, l, s, u, c, f) {
  for (var v = i - 1, y = i === 0 ? o : [''], g = R8(y), C = 0, w = 0, p = 0; C < r; ++C)
    for (var m = 0, h = Ho(e, v + 1, (v = i0((w = a[C])))), S = e; m < g; ++m)
      (S = o0(w > 0 ? y[m] + ' ' + h : Ls(h, /&\f/g, y[m]))) && (s[p++] = S);
  return ed(e, t, n, i === 0 ? n0 : l, s, u, c, f);
}
function A8(e, t, n, r) {
  return ed(e, t, n, t0, Jf(L8()), Ho(e, 2, -2), 0, r);
}
function W4(e, t, n, r, i) {
  return ed(e, t, n, r0, Ho(e, 0, r), Ho(e, r + 1, -1), r, i);
}
function i2(e, t) {
  for (var n = '', r = 0; r < e.length; r++) n += t(e[r], r, e, t) || '';
  return n;
}
function z8(e, t, n, r) {
  switch (e.type) {
    case P8:
      if (e.children.length) break;
    case E8:
    case r0:
      return (e.return = e.return || e.value);
    case t0:
      return '';
    case k8:
      return (e.return = e.value + '{' + i2(e.children, r) + '}');
    case n0:
      if (!ar((e.value = e.props.join(',')))) return '';
  }
  return ar((n = i2(e.children, r))) ? (e.return = e.value + '{' + n + '}') : '';
}
var K4 = 'data-ant-cssinjs-cache-path',
  l0 = '_FILE_STYLE__',
  Oi,
  s0 = !0;
function D8() {
  if (!Oi && ((Oi = {}), yn())) {
    var e = document.createElement('div');
    (e.className = K4),
      (e.style.position = 'fixed'),
      (e.style.visibility = 'hidden'),
      (e.style.top = '-9999px'),
      document.body.appendChild(e);
    var t = getComputedStyle(e).content || '';
    (t = t.replace(/^"/, '').replace(/"$/, '')),
      t.split(';').forEach(function (i) {
        var o = i.split(':'),
          a = B(o, 2),
          l = a[0],
          s = a[1];
        Oi[l] = s;
      });
    var n = document.querySelector('style['.concat(K4, ']'));
    if (n) {
      var r;
      (s0 = !1), (r = n.parentNode) === null || r === void 0 || r.removeChild(n);
    }
    document.body.removeChild(e);
  }
}
function V8(e) {
  return D8(), !!Oi[e];
}
function H8(e) {
  var t = Oi[e],
    n = null;
  if (t && yn())
    if (s0) n = l0;
    else {
      var r = document.querySelector('style['.concat(Xn, '="').concat(Oi[e], '"]'));
      r ? (n = r.innerHTML) : delete Oi[e];
    }
  return [n, t];
}
var B8 = '_skip_check_',
  u0 = '_multi_value_';
function Os(e) {
  var t = i2(j8(e), z8);
  return t.replace(/\{%%%\:[^;];}/g, ';');
}
function U8(e) {
  return oe(e) === 'object' && e && (B8 in e || u0 in e);
}
function Z4(e, t, n) {
  if (!t) return e;
  var r = '.'.concat(t),
    i = n === 'low' ? ':where('.concat(r, ')') : r,
    o = e.split(',').map(function (a) {
      var l,
        s = a.trim().split(/\s+/),
        u = s[0] || '',
        c = ((l = u.match(/^\w+/)) === null || l === void 0 ? void 0 : l[0]) || '';
      return (
        (u = ''.concat(c).concat(i).concat(u.slice(c.length))), [u].concat(J(s.slice(1))).join(' ')
      );
    });
  return o.join(',');
}
var W8 = function e(t) {
  var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
    r =
      arguments.length > 2 && arguments[2] !== void 0
        ? arguments[2]
        : { root: !0, parentSelectors: [] },
    i = r.root,
    o = r.injectHash,
    a = r.parentSelectors,
    l = n.hashId,
    s = n.layer;
  n.path;
  var u = n.hashPriority,
    c = n.transformers,
    f = c === void 0 ? [] : c;
  n.linters;
  var v = '',
    y = {};
  function g(p) {
    var m = p.getName(l);
    if (!y[m]) {
      var h = e(p.style, n, { root: !1, parentSelectors: a }),
        S = B(h, 1),
        x = S[0];
      y[m] = '@keyframes '.concat(p.getName(l)).concat(x);
    }
  }
  function C(p) {
    var m = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
    return (
      p.forEach(function (h) {
        Array.isArray(h) ? C(h, m) : h && m.push(h);
      }),
      m
    );
  }
  var w = C(Array.isArray(t) ? t : [t]);
  return (
    w.forEach(function (p) {
      var m = typeof p == 'string' && !i ? {} : p;
      if (typeof m == 'string')
        v += ''.concat(
          m,
          `
`,
        );
      else if (m._keyframe) g(m);
      else {
        var h = f.reduce(function (S, x) {
          var b;
          return (x == null || (b = x.visit) === null || b === void 0 ? void 0 : b.call(x, S)) || S;
        }, m);
        Object.keys(h).forEach(function (S) {
          var x = h[S];
          if (oe(x) === 'object' && x && (S !== 'animationName' || !x._keyframe) && !U8(x)) {
            var b = !1,
              E = S.trim(),
              P = !1;
            (i || o) && l
              ? E.startsWith('@')
                ? (b = !0)
                : E === '&'
                  ? (E = Z4('', l, u))
                  : (E = Z4(S, l, u))
              : i && !l && (E === '&' || E === '') && ((E = ''), (P = !0));
            var M = e(x, n, { root: P, injectHash: b, parentSelectors: [].concat(J(a), [E]) }),
              I = B(M, 2),
              F = I[0],
              z = I[1];
            (y = T(T({}, y), z)), (v += ''.concat(E).concat(F));
          } else {
            let W = function (O, R) {
              var k = O.replace(/[A-Z]/g, function (N) {
                  return '-'.concat(N.toLowerCase());
                }),
                $ = R;
              !b8[O] && typeof $ == 'number' && $ !== 0 && ($ = ''.concat($, 'px')),
                O === 'animationName' &&
                  R !== null &&
                  R !== void 0 &&
                  R._keyframe &&
                  (g(R), ($ = R.getName(l))),
                (v += ''.concat(k, ':').concat($, ';'));
            };
            var j,
              A = (j = x == null ? void 0 : x.value) !== null && j !== void 0 ? j : x;
            oe(x) === 'object' && x !== null && x !== void 0 && x[u0] && Array.isArray(A)
              ? A.forEach(function (O) {
                  W(S, O);
                })
              : W(S, A);
          }
        });
      }
    }),
    i
      ? s &&
        ((v = '@layer '.concat(s.name, ' {').concat(v, '}')),
        s.dependencies &&
          (y['@layer '.concat(s.name)] = s.dependencies.map(function (p) {
            return '@layer '.concat(p, ', ').concat(s.name, ';');
          }).join(`
`)))
      : (v = '{'.concat(v, '}')),
    [v, y]
  );
};
function c0(e, t) {
  return ll(''.concat(e.join('%')).concat(t));
}
function K8() {
  return null;
}
var f0 = 'style';
function o2(e, t) {
  var n = e.token,
    r = e.path,
    i = e.hashId,
    o = e.layer,
    a = e.nonce,
    l = e.clientOnly,
    s = e.order,
    u = s === void 0 ? 0 : s,
    c = d.useContext(Xu),
    f = c.autoClear;
  c.mock;
  var v = c.defaultCache,
    y = c.hashPriority,
    g = c.container,
    C = c.ssrInline,
    w = c.transformers,
    p = c.linters,
    m = c.cache,
    h = c.layer,
    S = n._tokenKey,
    x = [S];
  h && x.push('layer'), x.push.apply(x, J(r));
  var b = n2,
    E = Yf(
      f0,
      x,
      function () {
        var z = x.join('|');
        if (V8(z)) {
          var j = H8(z),
            A = B(j, 2),
            W = A[0],
            O = A[1];
          if (W) return [W, S, O, {}, l, u];
        }
        var R = t(),
          k = W8(R, {
            hashId: i,
            hashPriority: y,
            layer: h ? o : void 0,
            path: r.join('-'),
            transformers: w,
            linters: p,
          }),
          $ = B(k, 2),
          N = $[0],
          D = $[1],
          V = Os(N),
          Z = c0(x, V);
        return [V, S, Z, D, l, u];
      },
      function (z, j) {
        var A = B(z, 3),
          W = A[2];
        (j || f) && n2 && sl(W, { mark: Xn });
      },
      function (z) {
        var j = B(z, 4),
          A = j[0];
        j[1];
        var W = j[2],
          O = j[3];
        if (b && A !== l0) {
          var R = { mark: Xn, prepend: h ? !1 : 'queue', attachTo: g, priority: u },
            k = typeof a == 'function' ? a() : a;
          k && (R.csp = { nonce: k });
          var $ = [],
            N = [];
          Object.keys(O).forEach(function (V) {
            V.startsWith('@layer') ? $.push(V) : N.push(V);
          }),
            $.forEach(function (V) {
              Rr(Os(O[V]), '_layer-'.concat(V), T(T({}, R), {}, { prepend: !0 }));
            });
          var D = Rr(A, W, R);
          (D[Qr] = m.instanceId),
            D.setAttribute(Vo, S),
            N.forEach(function (V) {
              Rr(Os(O[V]), '_effect-'.concat(V), R);
            });
        }
      },
    ),
    P = B(E, 3),
    M = P[0],
    I = P[1],
    F = P[2];
  return function (z) {
    var j;
    return (
      !C || b || !v
        ? (j = d.createElement(K8, null))
        : (j = d.createElement(
            'style',
            ye({}, L(L({}, Vo, I), Xn, F), { dangerouslySetInnerHTML: { __html: M } }),
          )),
      d.createElement(d.Fragment, null, j, z)
    );
  };
}
var Z8 = function (t, n, r) {
    var i = B(t, 6),
      o = i[0],
      a = i[1],
      l = i[2],
      s = i[3],
      u = i[4],
      c = i[5],
      f = r || {},
      v = f.plain;
    if (u) return null;
    var y = o,
      g = { 'data-rc-order': 'prependQueue', 'data-rc-priority': ''.concat(c) };
    return (
      (y = cu(o, a, l, g, v)),
      s &&
        Object.keys(s).forEach(function (C) {
          if (!n[C]) {
            n[C] = !0;
            var w = Os(s[C]),
              p = cu(w, a, '_effect-'.concat(C), g, v);
            C.startsWith('@layer') ? (y = p + y) : (y += p);
          }
        }),
      [c, l, y]
    );
  },
  d0 = 'cssVar',
  G8 = function (t, n) {
    var r = t.key,
      i = t.prefix,
      o = t.unitless,
      a = t.ignore,
      l = t.token,
      s = t.scope,
      u = s === void 0 ? '' : s,
      c = d.useContext(Xu),
      f = c.cache.instanceId,
      v = c.container,
      y = l._tokenKey,
      g = [].concat(J(t.path), [r, u, y]),
      C = Yf(
        d0,
        g,
        function () {
          var w = n(),
            p = J7(w, r, { prefix: i, unitless: o, ignore: a, scope: u }),
            m = B(p, 2),
            h = m[0],
            S = m[1],
            x = c0(g, S);
          return [h, S, x, r];
        },
        function (w) {
          var p = B(w, 3),
            m = p[2];
          n2 && sl(m, { mark: Xn });
        },
        function (w) {
          var p = B(w, 3),
            m = p[1],
            h = p[2];
          if (m) {
            var S = Rr(m, h, { mark: Xn, prepend: 'queue', attachTo: v, priority: -999 });
            (S[Qr] = f), S.setAttribute(Vo, r);
          }
        },
      );
    return C;
  },
  q8 = function (t, n, r) {
    var i = B(t, 4),
      o = i[1],
      a = i[2],
      l = i[3],
      s = r || {},
      u = s.plain;
    if (!o) return null;
    var c = -999,
      f = { 'data-rc-order': 'prependQueue', 'data-rc-priority': ''.concat(c) },
      v = cu(o, l, a, f, u);
    return [c, a, v];
  };
L(L(L({}, f0, Z8), e0, x8), d0, q8);
var ht = (function () {
  function e(t, n) {
    Ft(this, e),
      L(this, 'name', void 0),
      L(this, 'style', void 0),
      L(this, '_keyframe', !0),
      (this.name = t),
      (this.style = n);
  }
  return (
    jt(e, [
      {
        key: 'getName',
        value: function () {
          var n = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : '';
          return n ? ''.concat(n, '-').concat(this.name) : this.name;
        },
      },
    ]),
    e
  );
})();
function Yi(e) {
  return (e.notSplit = !0), e;
}
Yi(['borderTop', 'borderBottom']),
  Yi(['borderTop']),
  Yi(['borderBottom']),
  Yi(['borderLeft', 'borderRight']),
  Yi(['borderLeft']),
  Yi(['borderRight']);
var td = d.createContext({});
function Q8(e) {
  return Z7(e) || B7(e) || Gf(e) || G7();
}
function sr(e, t) {
  for (var n = e, r = 0; r < t.length; r += 1) {
    if (n == null) return;
    n = n[t[r]];
  }
  return n;
}
function v0(e, t, n, r) {
  if (!t.length) return n;
  var i = Q8(t),
    o = i[0],
    a = i.slice(1),
    l;
  return (
    !e && typeof o == 'number' ? (l = []) : Array.isArray(e) ? (l = J(e)) : (l = T({}, e)),
    r && n === void 0 && a.length === 1 ? delete l[o][a[0]] : (l[o] = v0(l[o], a, n, r)),
    l
  );
}
function Kn(e, t, n) {
  var r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1;
  return t.length && r && n === void 0 && !sr(e, t.slice(0, -1)) ? e : v0(e, t, n, r);
}
function X8(e) {
  return oe(e) === 'object' && e !== null && Object.getPrototypeOf(e) === Object.prototype;
}
function G4(e) {
  return Array.isArray(e) ? [] : {};
}
var Y8 = typeof Reflect > 'u' ? Object.keys : Reflect.ownKeys;
function So() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
  var r = G4(t[0]);
  return (
    t.forEach(function (i) {
      function o(a, l) {
        var s = new Set(l),
          u = sr(i, a),
          c = Array.isArray(u);
        if (c || X8(u)) {
          if (!s.has(u)) {
            s.add(u);
            var f = sr(r, a);
            c ? (r = Kn(r, a, [])) : (!f || oe(f) !== 'object') && (r = Kn(r, a, G4(u))),
              Y8(u).forEach(function (v) {
                o([].concat(J(a), [v]), s);
              });
          }
        } else r = Kn(r, a, u);
      }
      o([]);
    }),
    r
  );
}
function J8() {}
const e9 = d.createContext({}),
  m0 = () => {
    const e = () => {};
    return (e.deprecated = J8), e;
  },
  t9 = d.createContext(void 0);
var n9 = {
    items_per_page: '/ page',
    jump_to: 'Go to',
    jump_to_confirm: 'confirm',
    page: 'Page',
    prev_page: 'Previous Page',
    next_page: 'Next Page',
    prev_5: 'Previous 5 Pages',
    next_5: 'Next 5 Pages',
    prev_3: 'Previous 3 Pages',
    next_3: 'Next 3 Pages',
    page_size: 'Page Size',
  },
  r9 = { yearFormat: 'YYYY', dayFormat: 'D', cellMeridiemFormat: 'A', monthBeforeYear: !0 },
  i9 = T(
    T({}, r9),
    {},
    {
      locale: 'en_US',
      today: 'Today',
      now: 'Now',
      backToToday: 'Back to today',
      ok: 'OK',
      clear: 'Clear',
      month: 'Month',
      year: 'Year',
      timeSelect: 'select time',
      dateSelect: 'select date',
      weekSelect: 'Choose a week',
      monthSelect: 'Choose a month',
      yearSelect: 'Choose a year',
      decadeSelect: 'Choose a decade',
      dateFormat: 'M/D/YYYY',
      dateTimeFormat: 'M/D/YYYY HH:mm:ss',
      previousMonth: 'Previous month (PageUp)',
      nextMonth: 'Next month (PageDown)',
      previousYear: 'Last year (Control + left)',
      nextYear: 'Next year (Control + right)',
      previousDecade: 'Last decade',
      nextDecade: 'Next decade',
      previousCentury: 'Last century',
      nextCentury: 'Next century',
    },
  );
const p0 = { placeholder: 'Select time', rangePlaceholder: ['Start time', 'End time'] },
  q4 = {
    lang: Object.assign(
      {
        placeholder: 'Select date',
        yearPlaceholder: 'Select year',
        quarterPlaceholder: 'Select quarter',
        monthPlaceholder: 'Select month',
        weekPlaceholder: 'Select week',
        rangePlaceholder: ['Start date', 'End date'],
        rangeYearPlaceholder: ['Start year', 'End year'],
        rangeQuarterPlaceholder: ['Start quarter', 'End quarter'],
        rangeMonthPlaceholder: ['Start month', 'End month'],
        rangeWeekPlaceholder: ['Start week', 'End week'],
      },
      i9,
    ),
    timePickerLocale: Object.assign({}, p0),
  },
  cn = '${label} is not a valid ${type}',
  ec = {
    locale: 'en',
    Pagination: n9,
    DatePicker: q4,
    TimePicker: p0,
    Calendar: q4,
    global: { placeholder: 'Please select' },
    Table: {
      filterTitle: 'Filter menu',
      filterConfirm: 'OK',
      filterReset: 'Reset',
      filterEmptyText: 'No filters',
      filterCheckall: 'Select all items',
      filterSearchPlaceholder: 'Search in filters',
      emptyText: 'No data',
      selectAll: 'Select current page',
      selectInvert: 'Invert current page',
      selectNone: 'Clear all data',
      selectionAll: 'Select all data',
      sortTitle: 'Sort',
      expand: 'Expand row',
      collapse: 'Collapse row',
      triggerDesc: 'Click to sort descending',
      triggerAsc: 'Click to sort ascending',
      cancelSort: 'Click to cancel sorting',
    },
    Tour: { Next: 'Next', Previous: 'Previous', Finish: 'Finish' },
    Modal: { okText: 'OK', cancelText: 'Cancel', justOkText: 'OK' },
    Popconfirm: { okText: 'OK', cancelText: 'Cancel' },
    Transfer: {
      titles: ['', ''],
      searchPlaceholder: 'Search here',
      itemUnit: 'item',
      itemsUnit: 'items',
      remove: 'Remove',
      selectCurrent: 'Select current page',
      removeCurrent: 'Remove current page',
      selectAll: 'Select all data',
      deselectAll: 'Deselect all data',
      removeAll: 'Remove all data',
      selectInvert: 'Invert current page',
    },
    Upload: {
      uploading: 'Uploading...',
      removeFile: 'Remove file',
      uploadError: 'Upload error',
      previewFile: 'Preview file',
      downloadFile: 'Download file',
    },
    Empty: { description: 'No data' },
    Icon: { icon: 'icon' },
    Text: { edit: 'Edit', copy: 'Copy', copied: 'Copied', expand: 'Expand', collapse: 'Collapse' },
    Form: {
      optional: '(optional)',
      defaultValidateMessages: {
        default: 'Field validation error for ${label}',
        required: 'Please enter ${label}',
        enum: '${label} must be one of [${enum}]',
        whitespace: '${label} cannot be a blank character',
        date: {
          format: '${label} date format is invalid',
          parse: '${label} cannot be converted to a date',
          invalid: '${label} is an invalid date',
        },
        types: {
          string: cn,
          method: cn,
          array: cn,
          object: cn,
          number: cn,
          date: cn,
          boolean: cn,
          integer: cn,
          float: cn,
          regexp: cn,
          email: cn,
          url: cn,
          hex: cn,
        },
        string: {
          len: '${label} must be ${len} characters',
          min: '${label} must be at least ${min} characters',
          max: '${label} must be up to ${max} characters',
          range: '${label} must be between ${min}-${max} characters',
        },
        number: {
          len: '${label} must be equal to ${len}',
          min: '${label} must be minimum ${min}',
          max: '${label} must be maximum ${max}',
          range: '${label} must be between ${min}-${max}',
        },
        array: {
          len: 'Must be ${len} ${label}',
          min: 'At least ${min} ${label}',
          max: 'At most ${max} ${label}',
          range: 'The amount of ${label} must be between ${min}-${max}',
        },
        pattern: { mismatch: '${label} does not match the pattern ${pattern}' },
      },
    },
    Image: { preview: 'Preview' },
    QRCode: { expired: 'QR code expired', refresh: 'Refresh', scanned: 'Scanned' },
    ColorPicker: {
      presetEmpty: 'Empty',
      transparent: 'Transparent',
      singleColor: 'Single',
      gradientColor: 'Gradient',
    },
  };
Object.assign({}, ec.Modal);
let $s = [];
const Q4 = () => $s.reduce((e, t) => Object.assign(Object.assign({}, e), t), ec.Modal);
function o9(e) {
  if (e) {
    const t = Object.assign({}, e);
    return (
      $s.push(t),
      Q4(),
      () => {
        ($s = $s.filter((n) => n !== t)), Q4();
      }
    );
  }
  Object.assign({}, ec.Modal);
}
const h0 = d.createContext(void 0),
  a9 = 'internalMark',
  l9 = (e) => {
    const { locale: t = {}, children: n, _ANT_MARK__: r } = e;
    d.useEffect(() => o9(t == null ? void 0 : t.Modal), [t]);
    const i = d.useMemo(() => Object.assign(Object.assign({}, t), { exist: !0 }), [t]);
    return d.createElement(h0.Provider, { value: i }, n);
  };
function Tt(e, t) {
  s9(e) && (e = '100%');
  var n = u9(e);
  return (
    (e = t === 360 ? e : Math.min(t, Math.max(0, parseFloat(e)))),
    n && (e = parseInt(String(e * t), 10) / 100),
    Math.abs(e - t) < 1e-6
      ? 1
      : (t === 360
          ? (e = (e < 0 ? (e % t) + t : e % t) / parseFloat(String(t)))
          : (e = (e % t) / parseFloat(String(t))),
        e)
  );
}
function is(e) {
  return Math.min(1, Math.max(0, e));
}
function s9(e) {
  return typeof e == 'string' && e.indexOf('.') !== -1 && parseFloat(e) === 1;
}
function u9(e) {
  return typeof e == 'string' && e.indexOf('%') !== -1;
}
function g0(e) {
  return (e = parseFloat(e)), (isNaN(e) || e < 0 || e > 1) && (e = 1), e;
}
function os(e) {
  return e <= 1 ? ''.concat(Number(e) * 100, '%') : e;
}
function Ri(e) {
  return e.length === 1 ? '0' + e : String(e);
}
function c9(e, t, n) {
  return { r: Tt(e, 255) * 255, g: Tt(t, 255) * 255, b: Tt(n, 255) * 255 };
}
function X4(e, t, n) {
  (e = Tt(e, 255)), (t = Tt(t, 255)), (n = Tt(n, 255));
  var r = Math.max(e, t, n),
    i = Math.min(e, t, n),
    o = 0,
    a = 0,
    l = (r + i) / 2;
  if (r === i) (a = 0), (o = 0);
  else {
    var s = r - i;
    switch (((a = l > 0.5 ? s / (2 - r - i) : s / (r + i)), r)) {
      case e:
        o = (t - n) / s + (t < n ? 6 : 0);
        break;
      case t:
        o = (n - e) / s + 2;
        break;
      case n:
        o = (e - t) / s + 4;
        break;
    }
    o /= 6;
  }
  return { h: o, s: a, l };
}
function zc(e, t, n) {
  return (
    n < 0 && (n += 1),
    n > 1 && (n -= 1),
    n < 1 / 6
      ? e + (t - e) * (6 * n)
      : n < 1 / 2
        ? t
        : n < 2 / 3
          ? e + (t - e) * (2 / 3 - n) * 6
          : e
  );
}
function f9(e, t, n) {
  var r, i, o;
  if (((e = Tt(e, 360)), (t = Tt(t, 100)), (n = Tt(n, 100)), t === 0)) (i = n), (o = n), (r = n);
  else {
    var a = n < 0.5 ? n * (1 + t) : n + t - n * t,
      l = 2 * n - a;
    (r = zc(l, a, e + 1 / 3)), (i = zc(l, a, e)), (o = zc(l, a, e - 1 / 3));
  }
  return { r: r * 255, g: i * 255, b: o * 255 };
}
function a2(e, t, n) {
  (e = Tt(e, 255)), (t = Tt(t, 255)), (n = Tt(n, 255));
  var r = Math.max(e, t, n),
    i = Math.min(e, t, n),
    o = 0,
    a = r,
    l = r - i,
    s = r === 0 ? 0 : l / r;
  if (r === i) o = 0;
  else {
    switch (r) {
      case e:
        o = (t - n) / l + (t < n ? 6 : 0);
        break;
      case t:
        o = (n - e) / l + 2;
        break;
      case n:
        o = (e - t) / l + 4;
        break;
    }
    o /= 6;
  }
  return { h: o, s, v: a };
}
function d9(e, t, n) {
  (e = Tt(e, 360) * 6), (t = Tt(t, 100)), (n = Tt(n, 100));
  var r = Math.floor(e),
    i = e - r,
    o = n * (1 - t),
    a = n * (1 - i * t),
    l = n * (1 - (1 - i) * t),
    s = r % 6,
    u = [n, a, o, o, l, n][s],
    c = [l, n, n, a, o, o][s],
    f = [o, o, l, n, n, a][s];
  return { r: u * 255, g: c * 255, b: f * 255 };
}
function l2(e, t, n, r) {
  var i = [
    Ri(Math.round(e).toString(16)),
    Ri(Math.round(t).toString(16)),
    Ri(Math.round(n).toString(16)),
  ];
  return r &&
    i[0].startsWith(i[0].charAt(1)) &&
    i[1].startsWith(i[1].charAt(1)) &&
    i[2].startsWith(i[2].charAt(1))
    ? i[0].charAt(0) + i[1].charAt(0) + i[2].charAt(0)
    : i.join('');
}
function v9(e, t, n, r, i) {
  var o = [
    Ri(Math.round(e).toString(16)),
    Ri(Math.round(t).toString(16)),
    Ri(Math.round(n).toString(16)),
    Ri(m9(r)),
  ];
  return i &&
    o[0].startsWith(o[0].charAt(1)) &&
    o[1].startsWith(o[1].charAt(1)) &&
    o[2].startsWith(o[2].charAt(1)) &&
    o[3].startsWith(o[3].charAt(1))
    ? o[0].charAt(0) + o[1].charAt(0) + o[2].charAt(0) + o[3].charAt(0)
    : o.join('');
}
function m9(e) {
  return Math.round(parseFloat(e) * 255).toString(16);
}
function Y4(e) {
  return dn(e) / 255;
}
function dn(e) {
  return parseInt(e, 16);
}
function p9(e) {
  return { r: e >> 16, g: (e & 65280) >> 8, b: e & 255 };
}
var s2 = {
  aliceblue: '#f0f8ff',
  antiquewhite: '#faebd7',
  aqua: '#00ffff',
  aquamarine: '#7fffd4',
  azure: '#f0ffff',
  beige: '#f5f5dc',
  bisque: '#ffe4c4',
  black: '#000000',
  blanchedalmond: '#ffebcd',
  blue: '#0000ff',
  blueviolet: '#8a2be2',
  brown: '#a52a2a',
  burlywood: '#deb887',
  cadetblue: '#5f9ea0',
  chartreuse: '#7fff00',
  chocolate: '#d2691e',
  coral: '#ff7f50',
  cornflowerblue: '#6495ed',
  cornsilk: '#fff8dc',
  crimson: '#dc143c',
  cyan: '#00ffff',
  darkblue: '#00008b',
  darkcyan: '#008b8b',
  darkgoldenrod: '#b8860b',
  darkgray: '#a9a9a9',
  darkgreen: '#006400',
  darkgrey: '#a9a9a9',
  darkkhaki: '#bdb76b',
  darkmagenta: '#8b008b',
  darkolivegreen: '#556b2f',
  darkorange: '#ff8c00',
  darkorchid: '#9932cc',
  darkred: '#8b0000',
  darksalmon: '#e9967a',
  darkseagreen: '#8fbc8f',
  darkslateblue: '#483d8b',
  darkslategray: '#2f4f4f',
  darkslategrey: '#2f4f4f',
  darkturquoise: '#00ced1',
  darkviolet: '#9400d3',
  deeppink: '#ff1493',
  deepskyblue: '#00bfff',
  dimgray: '#696969',
  dimgrey: '#696969',
  dodgerblue: '#1e90ff',
  firebrick: '#b22222',
  floralwhite: '#fffaf0',
  forestgreen: '#228b22',
  fuchsia: '#ff00ff',
  gainsboro: '#dcdcdc',
  ghostwhite: '#f8f8ff',
  goldenrod: '#daa520',
  gold: '#ffd700',
  gray: '#808080',
  green: '#008000',
  greenyellow: '#adff2f',
  grey: '#808080',
  honeydew: '#f0fff0',
  hotpink: '#ff69b4',
  indianred: '#cd5c5c',
  indigo: '#4b0082',
  ivory: '#fffff0',
  khaki: '#f0e68c',
  lavenderblush: '#fff0f5',
  lavender: '#e6e6fa',
  lawngreen: '#7cfc00',
  lemonchiffon: '#fffacd',
  lightblue: '#add8e6',
  lightcoral: '#f08080',
  lightcyan: '#e0ffff',
  lightgoldenrodyellow: '#fafad2',
  lightgray: '#d3d3d3',
  lightgreen: '#90ee90',
  lightgrey: '#d3d3d3',
  lightpink: '#ffb6c1',
  lightsalmon: '#ffa07a',
  lightseagreen: '#20b2aa',
  lightskyblue: '#87cefa',
  lightslategray: '#778899',
  lightslategrey: '#778899',
  lightsteelblue: '#b0c4de',
  lightyellow: '#ffffe0',
  lime: '#00ff00',
  limegreen: '#32cd32',
  linen: '#faf0e6',
  magenta: '#ff00ff',
  maroon: '#800000',
  mediumaquamarine: '#66cdaa',
  mediumblue: '#0000cd',
  mediumorchid: '#ba55d3',
  mediumpurple: '#9370db',
  mediumseagreen: '#3cb371',
  mediumslateblue: '#7b68ee',
  mediumspringgreen: '#00fa9a',
  mediumturquoise: '#48d1cc',
  mediumvioletred: '#c71585',
  midnightblue: '#191970',
  mintcream: '#f5fffa',
  mistyrose: '#ffe4e1',
  moccasin: '#ffe4b5',
  navajowhite: '#ffdead',
  navy: '#000080',
  oldlace: '#fdf5e6',
  olive: '#808000',
  olivedrab: '#6b8e23',
  orange: '#ffa500',
  orangered: '#ff4500',
  orchid: '#da70d6',
  palegoldenrod: '#eee8aa',
  palegreen: '#98fb98',
  paleturquoise: '#afeeee',
  palevioletred: '#db7093',
  papayawhip: '#ffefd5',
  peachpuff: '#ffdab9',
  peru: '#cd853f',
  pink: '#ffc0cb',
  plum: '#dda0dd',
  powderblue: '#b0e0e6',
  purple: '#800080',
  rebeccapurple: '#663399',
  red: '#ff0000',
  rosybrown: '#bc8f8f',
  royalblue: '#4169e1',
  saddlebrown: '#8b4513',
  salmon: '#fa8072',
  sandybrown: '#f4a460',
  seagreen: '#2e8b57',
  seashell: '#fff5ee',
  sienna: '#a0522d',
  silver: '#c0c0c0',
  skyblue: '#87ceeb',
  slateblue: '#6a5acd',
  slategray: '#708090',
  slategrey: '#708090',
  snow: '#fffafa',
  springgreen: '#00ff7f',
  steelblue: '#4682b4',
  tan: '#d2b48c',
  teal: '#008080',
  thistle: '#d8bfd8',
  tomato: '#ff6347',
  turquoise: '#40e0d0',
  violet: '#ee82ee',
  wheat: '#f5deb3',
  white: '#ffffff',
  whitesmoke: '#f5f5f5',
  yellow: '#ffff00',
  yellowgreen: '#9acd32',
};
function lo(e) {
  var t = { r: 0, g: 0, b: 0 },
    n = 1,
    r = null,
    i = null,
    o = null,
    a = !1,
    l = !1;
  return (
    typeof e == 'string' && (e = y9(e)),
    typeof e == 'object' &&
      (wr(e.r) && wr(e.g) && wr(e.b)
        ? ((t = c9(e.r, e.g, e.b)), (a = !0), (l = String(e.r).substr(-1) === '%' ? 'prgb' : 'rgb'))
        : wr(e.h) && wr(e.s) && wr(e.v)
          ? ((r = os(e.s)), (i = os(e.v)), (t = d9(e.h, r, i)), (a = !0), (l = 'hsv'))
          : wr(e.h) &&
            wr(e.s) &&
            wr(e.l) &&
            ((r = os(e.s)), (o = os(e.l)), (t = f9(e.h, r, o)), (a = !0), (l = 'hsl')),
      Object.prototype.hasOwnProperty.call(e, 'a') && (n = e.a)),
    (n = g0(n)),
    {
      ok: a,
      format: e.format || l,
      r: Math.min(255, Math.max(t.r, 0)),
      g: Math.min(255, Math.max(t.g, 0)),
      b: Math.min(255, Math.max(t.b, 0)),
      a: n,
    }
  );
}
var h9 = '[-\\+]?\\d+%?',
  g9 = '[-\\+]?\\d*\\.\\d+%?',
  Yr = '(?:'.concat(g9, ')|(?:').concat(h9, ')'),
  Dc = '[\\s|\\(]+('.concat(Yr, ')[,|\\s]+(').concat(Yr, ')[,|\\s]+(').concat(Yr, ')\\s*\\)?'),
  Vc = '[\\s|\\(]+('
    .concat(Yr, ')[,|\\s]+(')
    .concat(Yr, ')[,|\\s]+(')
    .concat(Yr, ')[,|\\s]+(')
    .concat(Yr, ')\\s*\\)?'),
  Bn = {
    CSS_UNIT: new RegExp(Yr),
    rgb: new RegExp('rgb' + Dc),
    rgba: new RegExp('rgba' + Vc),
    hsl: new RegExp('hsl' + Dc),
    hsla: new RegExp('hsla' + Vc),
    hsv: new RegExp('hsv' + Dc),
    hsva: new RegExp('hsva' + Vc),
    hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
    hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
    hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
    hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
  };
function y9(e) {
  if (((e = e.trim().toLowerCase()), e.length === 0)) return !1;
  var t = !1;
  if (s2[e]) (e = s2[e]), (t = !0);
  else if (e === 'transparent') return { r: 0, g: 0, b: 0, a: 0, format: 'name' };
  var n = Bn.rgb.exec(e);
  return n
    ? { r: n[1], g: n[2], b: n[3] }
    : ((n = Bn.rgba.exec(e)),
      n
        ? { r: n[1], g: n[2], b: n[3], a: n[4] }
        : ((n = Bn.hsl.exec(e)),
          n
            ? { h: n[1], s: n[2], l: n[3] }
            : ((n = Bn.hsla.exec(e)),
              n
                ? { h: n[1], s: n[2], l: n[3], a: n[4] }
                : ((n = Bn.hsv.exec(e)),
                  n
                    ? { h: n[1], s: n[2], v: n[3] }
                    : ((n = Bn.hsva.exec(e)),
                      n
                        ? { h: n[1], s: n[2], v: n[3], a: n[4] }
                        : ((n = Bn.hex8.exec(e)),
                          n
                            ? {
                                r: dn(n[1]),
                                g: dn(n[2]),
                                b: dn(n[3]),
                                a: Y4(n[4]),
                                format: t ? 'name' : 'hex8',
                              }
                            : ((n = Bn.hex6.exec(e)),
                              n
                                ? {
                                    r: dn(n[1]),
                                    g: dn(n[2]),
                                    b: dn(n[3]),
                                    format: t ? 'name' : 'hex',
                                  }
                                : ((n = Bn.hex4.exec(e)),
                                  n
                                    ? {
                                        r: dn(n[1] + n[1]),
                                        g: dn(n[2] + n[2]),
                                        b: dn(n[3] + n[3]),
                                        a: Y4(n[4] + n[4]),
                                        format: t ? 'name' : 'hex8',
                                      }
                                    : ((n = Bn.hex3.exec(e)),
                                      n
                                        ? {
                                            r: dn(n[1] + n[1]),
                                            g: dn(n[2] + n[2]),
                                            b: dn(n[3] + n[3]),
                                            format: t ? 'name' : 'hex',
                                          }
                                        : !1)))))))));
}
function wr(e) {
  return !!Bn.CSS_UNIT.exec(String(e));
}
var qt = (function () {
    function e(t, n) {
      t === void 0 && (t = ''), n === void 0 && (n = {});
      var r;
      if (t instanceof e) return t;
      typeof t == 'number' && (t = p9(t)), (this.originalInput = t);
      var i = lo(t);
      (this.originalInput = t),
        (this.r = i.r),
        (this.g = i.g),
        (this.b = i.b),
        (this.a = i.a),
        (this.roundA = Math.round(100 * this.a) / 100),
        (this.format = (r = n.format) !== null && r !== void 0 ? r : i.format),
        (this.gradientType = n.gradientType),
        this.r < 1 && (this.r = Math.round(this.r)),
        this.g < 1 && (this.g = Math.round(this.g)),
        this.b < 1 && (this.b = Math.round(this.b)),
        (this.isValid = i.ok);
    }
    return (
      (e.prototype.isDark = function () {
        return this.getBrightness() < 128;
      }),
      (e.prototype.isLight = function () {
        return !this.isDark();
      }),
      (e.prototype.getBrightness = function () {
        var t = this.toRgb();
        return (t.r * 299 + t.g * 587 + t.b * 114) / 1e3;
      }),
      (e.prototype.getLuminance = function () {
        var t = this.toRgb(),
          n,
          r,
          i,
          o = t.r / 255,
          a = t.g / 255,
          l = t.b / 255;
        return (
          o <= 0.03928 ? (n = o / 12.92) : (n = Math.pow((o + 0.055) / 1.055, 2.4)),
          a <= 0.03928 ? (r = a / 12.92) : (r = Math.pow((a + 0.055) / 1.055, 2.4)),
          l <= 0.03928 ? (i = l / 12.92) : (i = Math.pow((l + 0.055) / 1.055, 2.4)),
          0.2126 * n + 0.7152 * r + 0.0722 * i
        );
      }),
      (e.prototype.getAlpha = function () {
        return this.a;
      }),
      (e.prototype.setAlpha = function (t) {
        return (this.a = g0(t)), (this.roundA = Math.round(100 * this.a) / 100), this;
      }),
      (e.prototype.isMonochrome = function () {
        var t = this.toHsl().s;
        return t === 0;
      }),
      (e.prototype.toHsv = function () {
        var t = a2(this.r, this.g, this.b);
        return { h: t.h * 360, s: t.s, v: t.v, a: this.a };
      }),
      (e.prototype.toHsvString = function () {
        var t = a2(this.r, this.g, this.b),
          n = Math.round(t.h * 360),
          r = Math.round(t.s * 100),
          i = Math.round(t.v * 100);
        return this.a === 1
          ? 'hsv('.concat(n, ', ').concat(r, '%, ').concat(i, '%)')
          : 'hsva('.concat(n, ', ').concat(r, '%, ').concat(i, '%, ').concat(this.roundA, ')');
      }),
      (e.prototype.toHsl = function () {
        var t = X4(this.r, this.g, this.b);
        return { h: t.h * 360, s: t.s, l: t.l, a: this.a };
      }),
      (e.prototype.toHslString = function () {
        var t = X4(this.r, this.g, this.b),
          n = Math.round(t.h * 360),
          r = Math.round(t.s * 100),
          i = Math.round(t.l * 100);
        return this.a === 1
          ? 'hsl('.concat(n, ', ').concat(r, '%, ').concat(i, '%)')
          : 'hsla('.concat(n, ', ').concat(r, '%, ').concat(i, '%, ').concat(this.roundA, ')');
      }),
      (e.prototype.toHex = function (t) {
        return t === void 0 && (t = !1), l2(this.r, this.g, this.b, t);
      }),
      (e.prototype.toHexString = function (t) {
        return t === void 0 && (t = !1), '#' + this.toHex(t);
      }),
      (e.prototype.toHex8 = function (t) {
        return t === void 0 && (t = !1), v9(this.r, this.g, this.b, this.a, t);
      }),
      (e.prototype.toHex8String = function (t) {
        return t === void 0 && (t = !1), '#' + this.toHex8(t);
      }),
      (e.prototype.toHexShortString = function (t) {
        return t === void 0 && (t = !1), this.a === 1 ? this.toHexString(t) : this.toHex8String(t);
      }),
      (e.prototype.toRgb = function () {
        return { r: Math.round(this.r), g: Math.round(this.g), b: Math.round(this.b), a: this.a };
      }),
      (e.prototype.toRgbString = function () {
        var t = Math.round(this.r),
          n = Math.round(this.g),
          r = Math.round(this.b);
        return this.a === 1
          ? 'rgb('.concat(t, ', ').concat(n, ', ').concat(r, ')')
          : 'rgba('.concat(t, ', ').concat(n, ', ').concat(r, ', ').concat(this.roundA, ')');
      }),
      (e.prototype.toPercentageRgb = function () {
        var t = function (n) {
          return ''.concat(Math.round(Tt(n, 255) * 100), '%');
        };
        return { r: t(this.r), g: t(this.g), b: t(this.b), a: this.a };
      }),
      (e.prototype.toPercentageRgbString = function () {
        var t = function (n) {
          return Math.round(Tt(n, 255) * 100);
        };
        return this.a === 1
          ? 'rgb('.concat(t(this.r), '%, ').concat(t(this.g), '%, ').concat(t(this.b), '%)')
          : 'rgba('
              .concat(t(this.r), '%, ')
              .concat(t(this.g), '%, ')
              .concat(t(this.b), '%, ')
              .concat(this.roundA, ')');
      }),
      (e.prototype.toName = function () {
        if (this.a === 0) return 'transparent';
        if (this.a < 1) return !1;
        for (
          var t = '#' + l2(this.r, this.g, this.b, !1), n = 0, r = Object.entries(s2);
          n < r.length;
          n++
        ) {
          var i = r[n],
            o = i[0],
            a = i[1];
          if (t === a) return o;
        }
        return !1;
      }),
      (e.prototype.toString = function (t) {
        var n = !!t;
        t = t ?? this.format;
        var r = !1,
          i = this.a < 1 && this.a >= 0,
          o = !n && i && (t.startsWith('hex') || t === 'name');
        return o
          ? t === 'name' && this.a === 0
            ? this.toName()
            : this.toRgbString()
          : (t === 'rgb' && (r = this.toRgbString()),
            t === 'prgb' && (r = this.toPercentageRgbString()),
            (t === 'hex' || t === 'hex6') && (r = this.toHexString()),
            t === 'hex3' && (r = this.toHexString(!0)),
            t === 'hex4' && (r = this.toHex8String(!0)),
            t === 'hex8' && (r = this.toHex8String()),
            t === 'name' && (r = this.toName()),
            t === 'hsl' && (r = this.toHslString()),
            t === 'hsv' && (r = this.toHsvString()),
            r || this.toHexString());
      }),
      (e.prototype.toNumber = function () {
        return (Math.round(this.r) << 16) + (Math.round(this.g) << 8) + Math.round(this.b);
      }),
      (e.prototype.clone = function () {
        return new e(this.toString());
      }),
      (e.prototype.lighten = function (t) {
        t === void 0 && (t = 10);
        var n = this.toHsl();
        return (n.l += t / 100), (n.l = is(n.l)), new e(n);
      }),
      (e.prototype.brighten = function (t) {
        t === void 0 && (t = 10);
        var n = this.toRgb();
        return (
          (n.r = Math.max(0, Math.min(255, n.r - Math.round(255 * -(t / 100))))),
          (n.g = Math.max(0, Math.min(255, n.g - Math.round(255 * -(t / 100))))),
          (n.b = Math.max(0, Math.min(255, n.b - Math.round(255 * -(t / 100))))),
          new e(n)
        );
      }),
      (e.prototype.darken = function (t) {
        t === void 0 && (t = 10);
        var n = this.toHsl();
        return (n.l -= t / 100), (n.l = is(n.l)), new e(n);
      }),
      (e.prototype.tint = function (t) {
        return t === void 0 && (t = 10), this.mix('white', t);
      }),
      (e.prototype.shade = function (t) {
        return t === void 0 && (t = 10), this.mix('black', t);
      }),
      (e.prototype.desaturate = function (t) {
        t === void 0 && (t = 10);
        var n = this.toHsl();
        return (n.s -= t / 100), (n.s = is(n.s)), new e(n);
      }),
      (e.prototype.saturate = function (t) {
        t === void 0 && (t = 10);
        var n = this.toHsl();
        return (n.s += t / 100), (n.s = is(n.s)), new e(n);
      }),
      (e.prototype.greyscale = function () {
        return this.desaturate(100);
      }),
      (e.prototype.spin = function (t) {
        var n = this.toHsl(),
          r = (n.h + t) % 360;
        return (n.h = r < 0 ? 360 + r : r), new e(n);
      }),
      (e.prototype.mix = function (t, n) {
        n === void 0 && (n = 50);
        var r = this.toRgb(),
          i = new e(t).toRgb(),
          o = n / 100,
          a = {
            r: (i.r - r.r) * o + r.r,
            g: (i.g - r.g) * o + r.g,
            b: (i.b - r.b) * o + r.b,
            a: (i.a - r.a) * o + r.a,
          };
        return new e(a);
      }),
      (e.prototype.analogous = function (t, n) {
        t === void 0 && (t = 6), n === void 0 && (n = 30);
        var r = this.toHsl(),
          i = 360 / n,
          o = [this];
        for (r.h = (r.h - ((i * t) >> 1) + 720) % 360; --t; )
          (r.h = (r.h + i) % 360), o.push(new e(r));
        return o;
      }),
      (e.prototype.complement = function () {
        var t = this.toHsl();
        return (t.h = (t.h + 180) % 360), new e(t);
      }),
      (e.prototype.monochromatic = function (t) {
        t === void 0 && (t = 6);
        for (var n = this.toHsv(), r = n.h, i = n.s, o = n.v, a = [], l = 1 / t; t--; )
          a.push(new e({ h: r, s: i, v: o })), (o = (o + l) % 1);
        return a;
      }),
      (e.prototype.splitcomplement = function () {
        var t = this.toHsl(),
          n = t.h;
        return [
          this,
          new e({ h: (n + 72) % 360, s: t.s, l: t.l }),
          new e({ h: (n + 216) % 360, s: t.s, l: t.l }),
        ];
      }),
      (e.prototype.onBackground = function (t) {
        var n = this.toRgb(),
          r = new e(t).toRgb(),
          i = n.a + r.a * (1 - n.a);
        return new e({
          r: (n.r * n.a + r.r * r.a * (1 - n.a)) / i,
          g: (n.g * n.a + r.g * r.a * (1 - n.a)) / i,
          b: (n.b * n.a + r.b * r.a * (1 - n.a)) / i,
          a: i,
        });
      }),
      (e.prototype.triad = function () {
        return this.polyad(3);
      }),
      (e.prototype.tetrad = function () {
        return this.polyad(4);
      }),
      (e.prototype.polyad = function (t) {
        for (var n = this.toHsl(), r = n.h, i = [this], o = 360 / t, a = 1; a < t; a++)
          i.push(new e({ h: (r + a * o) % 360, s: n.s, l: n.l }));
        return i;
      }),
      (e.prototype.equals = function (t) {
        return this.toRgbString() === new e(t).toRgbString();
      }),
      e
    );
  })(),
  as = 2,
  J4 = 0.16,
  C9 = 0.05,
  w9 = 0.05,
  S9 = 0.15,
  y0 = 5,
  C0 = 4,
  x9 = [
    { index: 7, opacity: 0.15 },
    { index: 6, opacity: 0.25 },
    { index: 5, opacity: 0.3 },
    { index: 5, opacity: 0.45 },
    { index: 5, opacity: 0.65 },
    { index: 5, opacity: 0.85 },
    { index: 4, opacity: 0.9 },
    { index: 3, opacity: 0.95 },
    { index: 2, opacity: 0.97 },
    { index: 1, opacity: 0.98 },
  ];
function e5(e) {
  var t = e.r,
    n = e.g,
    r = e.b,
    i = a2(t, n, r);
  return { h: i.h * 360, s: i.s, v: i.v };
}
function ls(e) {
  var t = e.r,
    n = e.g,
    r = e.b;
  return '#'.concat(l2(t, n, r, !1));
}
function b9(e, t, n) {
  var r = n / 100,
    i = { r: (t.r - e.r) * r + e.r, g: (t.g - e.g) * r + e.g, b: (t.b - e.b) * r + e.b };
  return i;
}
function t5(e, t, n) {
  var r;
  return (
    Math.round(e.h) >= 60 && Math.round(e.h) <= 240
      ? (r = n ? Math.round(e.h) - as * t : Math.round(e.h) + as * t)
      : (r = n ? Math.round(e.h) + as * t : Math.round(e.h) - as * t),
    r < 0 ? (r += 360) : r >= 360 && (r -= 360),
    r
  );
}
function n5(e, t, n) {
  if (e.h === 0 && e.s === 0) return e.s;
  var r;
  return (
    n ? (r = e.s - J4 * t) : t === C0 ? (r = e.s + J4) : (r = e.s + C9 * t),
    r > 1 && (r = 1),
    n && t === y0 && r > 0.1 && (r = 0.1),
    r < 0.06 && (r = 0.06),
    Number(r.toFixed(2))
  );
}
function r5(e, t, n) {
  var r;
  return n ? (r = e.v + w9 * t) : (r = e.v - S9 * t), r > 1 && (r = 1), Number(r.toFixed(2));
}
function dl(e) {
  for (
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
      n = [],
      r = lo(e),
      i = y0;
    i > 0;
    i -= 1
  ) {
    var o = e5(r),
      a = ls(lo({ h: t5(o, i, !0), s: n5(o, i, !0), v: r5(o, i, !0) }));
    n.push(a);
  }
  n.push(ls(r));
  for (var l = 1; l <= C0; l += 1) {
    var s = e5(r),
      u = ls(lo({ h: t5(s, l), s: n5(s, l), v: r5(s, l) }));
    n.push(u);
  }
  return t.theme === 'dark'
    ? x9.map(function (c) {
        var f = c.index,
          v = c.opacity,
          y = ls(b9(lo(t.backgroundColor || '#141414'), lo(n[f]), v * 100));
        return y;
      })
    : n;
}
var Hc = {
    red: '#F5222D',
    volcano: '#FA541C',
    orange: '#FA8C16',
    gold: '#FAAD14',
    yellow: '#FADB14',
    lime: '#A0D911',
    green: '#52C41A',
    cyan: '#13C2C2',
    blue: '#1677FF',
    geekblue: '#2F54EB',
    purple: '#722ED1',
    magenta: '#EB2F96',
    grey: '#666666',
  },
  u2 = [
    '#fff1f0',
    '#ffccc7',
    '#ffa39e',
    '#ff7875',
    '#ff4d4f',
    '#f5222d',
    '#cf1322',
    '#a8071a',
    '#820014',
    '#5c0011',
  ];
u2.primary = u2[5];
var c2 = [
  '#fff2e8',
  '#ffd8bf',
  '#ffbb96',
  '#ff9c6e',
  '#ff7a45',
  '#fa541c',
  '#d4380d',
  '#ad2102',
  '#871400',
  '#610b00',
];
c2.primary = c2[5];
var f2 = [
  '#fff7e6',
  '#ffe7ba',
  '#ffd591',
  '#ffc069',
  '#ffa940',
  '#fa8c16',
  '#d46b08',
  '#ad4e00',
  '#873800',
  '#612500',
];
f2.primary = f2[5];
var d2 = [
  '#fffbe6',
  '#fff1b8',
  '#ffe58f',
  '#ffd666',
  '#ffc53d',
  '#faad14',
  '#d48806',
  '#ad6800',
  '#874d00',
  '#613400',
];
d2.primary = d2[5];
var v2 = [
  '#feffe6',
  '#ffffb8',
  '#fffb8f',
  '#fff566',
  '#ffec3d',
  '#fadb14',
  '#d4b106',
  '#ad8b00',
  '#876800',
  '#614700',
];
v2.primary = v2[5];
var m2 = [
  '#fcffe6',
  '#f4ffb8',
  '#eaff8f',
  '#d3f261',
  '#bae637',
  '#a0d911',
  '#7cb305',
  '#5b8c00',
  '#3f6600',
  '#254000',
];
m2.primary = m2[5];
var p2 = [
  '#f6ffed',
  '#d9f7be',
  '#b7eb8f',
  '#95de64',
  '#73d13d',
  '#52c41a',
  '#389e0d',
  '#237804',
  '#135200',
  '#092b00',
];
p2.primary = p2[5];
var h2 = [
  '#e6fffb',
  '#b5f5ec',
  '#87e8de',
  '#5cdbd3',
  '#36cfc9',
  '#13c2c2',
  '#08979c',
  '#006d75',
  '#00474f',
  '#002329',
];
h2.primary = h2[5];
var fu = [
  '#e6f4ff',
  '#bae0ff',
  '#91caff',
  '#69b1ff',
  '#4096ff',
  '#1677ff',
  '#0958d9',
  '#003eb3',
  '#002c8c',
  '#001d66',
];
fu.primary = fu[5];
var g2 = [
  '#f0f5ff',
  '#d6e4ff',
  '#adc6ff',
  '#85a5ff',
  '#597ef7',
  '#2f54eb',
  '#1d39c4',
  '#10239e',
  '#061178',
  '#030852',
];
g2.primary = g2[5];
var y2 = [
  '#f9f0ff',
  '#efdbff',
  '#d3adf7',
  '#b37feb',
  '#9254de',
  '#722ed1',
  '#531dab',
  '#391085',
  '#22075e',
  '#120338',
];
y2.primary = y2[5];
var C2 = [
  '#fff0f6',
  '#ffd6e7',
  '#ffadd2',
  '#ff85c0',
  '#f759ab',
  '#eb2f96',
  '#c41d7f',
  '#9e1068',
  '#780650',
  '#520339',
];
C2.primary = C2[5];
var w2 = [
  '#a6a6a6',
  '#999999',
  '#8c8c8c',
  '#808080',
  '#737373',
  '#666666',
  '#404040',
  '#1a1a1a',
  '#000000',
  '#000000',
];
w2.primary = w2[5];
var Bc = {
  red: u2,
  volcano: c2,
  orange: f2,
  gold: d2,
  yellow: v2,
  lime: m2,
  green: p2,
  cyan: h2,
  blue: fu,
  geekblue: g2,
  purple: y2,
  magenta: C2,
  grey: w2,
};
const w0 = {
    blue: '#1677FF',
    purple: '#722ED1',
    cyan: '#13C2C2',
    green: '#52C41A',
    magenta: '#EB2F96',
    pink: '#EB2F96',
    red: '#F5222D',
    orange: '#FA8C16',
    yellow: '#FADB14',
    volcano: '#FA541C',
    geekblue: '#2F54EB',
    gold: '#FAAD14',
    lime: '#A0D911',
  },
  vl = Object.assign(Object.assign({}, w0), {
    colorPrimary: '#1677ff',
    colorSuccess: '#52c41a',
    colorWarning: '#faad14',
    colorError: '#ff4d4f',
    colorInfo: '#1677ff',
    colorLink: '',
    colorTextBase: '',
    colorBgBase: '',
    fontFamily: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
'Noto Color Emoji'`,
    fontFamilyCode: "'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace",
    fontSize: 14,
    lineWidth: 1,
    lineType: 'solid',
    motionUnit: 0.1,
    motionBase: 0,
    motionEaseOutCirc: 'cubic-bezier(0.08, 0.82, 0.17, 1)',
    motionEaseInOutCirc: 'cubic-bezier(0.78, 0.14, 0.15, 0.86)',
    motionEaseOut: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
    motionEaseInOut: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
    motionEaseOutBack: 'cubic-bezier(0.12, 0.4, 0.29, 1.46)',
    motionEaseInBack: 'cubic-bezier(0.71, -0.46, 0.88, 0.6)',
    motionEaseInQuint: 'cubic-bezier(0.755, 0.05, 0.855, 0.06)',
    motionEaseOutQuint: 'cubic-bezier(0.23, 1, 0.32, 1)',
    borderRadius: 6,
    sizeUnit: 4,
    sizeStep: 4,
    sizePopupArrow: 16,
    controlHeight: 32,
    zIndexBase: 0,
    zIndexPopupBase: 1e3,
    opacityImage: 1,
    wireframe: !1,
    motion: !0,
  });
function E9(e, t) {
  let { generateColorPalettes: n, generateNeutralColorPalettes: r } = t;
  const {
      colorSuccess: i,
      colorWarning: o,
      colorError: a,
      colorInfo: l,
      colorPrimary: s,
      colorBgBase: u,
      colorTextBase: c,
    } = e,
    f = n(s),
    v = n(i),
    y = n(o),
    g = n(a),
    C = n(l),
    w = r(u, c),
    p = e.colorLink || e.colorInfo,
    m = n(p);
  return Object.assign(Object.assign({}, w), {
    colorPrimaryBg: f[1],
    colorPrimaryBgHover: f[2],
    colorPrimaryBorder: f[3],
    colorPrimaryBorderHover: f[4],
    colorPrimaryHover: f[5],
    colorPrimary: f[6],
    colorPrimaryActive: f[7],
    colorPrimaryTextHover: f[8],
    colorPrimaryText: f[9],
    colorPrimaryTextActive: f[10],
    colorSuccessBg: v[1],
    colorSuccessBgHover: v[2],
    colorSuccessBorder: v[3],
    colorSuccessBorderHover: v[4],
    colorSuccessHover: v[4],
    colorSuccess: v[6],
    colorSuccessActive: v[7],
    colorSuccessTextHover: v[8],
    colorSuccessText: v[9],
    colorSuccessTextActive: v[10],
    colorErrorBg: g[1],
    colorErrorBgHover: g[2],
    colorErrorBgActive: g[3],
    colorErrorBorder: g[3],
    colorErrorBorderHover: g[4],
    colorErrorHover: g[5],
    colorError: g[6],
    colorErrorActive: g[7],
    colorErrorTextHover: g[8],
    colorErrorText: g[9],
    colorErrorTextActive: g[10],
    colorWarningBg: y[1],
    colorWarningBgHover: y[2],
    colorWarningBorder: y[3],
    colorWarningBorderHover: y[4],
    colorWarningHover: y[4],
    colorWarning: y[6],
    colorWarningActive: y[7],
    colorWarningTextHover: y[8],
    colorWarningText: y[9],
    colorWarningTextActive: y[10],
    colorInfoBg: C[1],
    colorInfoBgHover: C[2],
    colorInfoBorder: C[3],
    colorInfoBorderHover: C[4],
    colorInfoHover: C[4],
    colorInfo: C[6],
    colorInfoActive: C[7],
    colorInfoTextHover: C[8],
    colorInfoText: C[9],
    colorInfoTextActive: C[10],
    colorLinkHover: m[4],
    colorLink: m[6],
    colorLinkActive: m[7],
    colorBgMask: new qt('#000').setAlpha(0.45).toRgbString(),
    colorWhite: '#fff',
  });
}
const k9 = (e) => {
  let t = e,
    n = e,
    r = e,
    i = e;
  return (
    e < 6 && e >= 5 ? (t = e + 1) : e < 16 && e >= 6 ? (t = e + 2) : e >= 16 && (t = 16),
    e < 7 && e >= 5
      ? (n = 4)
      : e < 8 && e >= 7
        ? (n = 5)
        : e < 14 && e >= 8
          ? (n = 6)
          : e < 16 && e >= 14
            ? (n = 7)
            : e >= 16 && (n = 8),
    e < 6 && e >= 2 ? (r = 1) : e >= 6 && (r = 2),
    e > 4 && e < 8 ? (i = 4) : e >= 8 && (i = 6),
    {
      borderRadius: e,
      borderRadiusXS: r,
      borderRadiusSM: n,
      borderRadiusLG: t,
      borderRadiusOuter: i,
    }
  );
};
function P9(e) {
  const { motionUnit: t, motionBase: n, borderRadius: r, lineWidth: i } = e;
  return Object.assign(
    {
      motionDurationFast: `${(n + t).toFixed(1)}s`,
      motionDurationMid: `${(n + t * 2).toFixed(1)}s`,
      motionDurationSlow: `${(n + t * 3).toFixed(1)}s`,
      lineWidthBold: i + 1,
    },
    k9(r),
  );
}
const M9 = (e) => {
  const { controlHeight: t } = e;
  return { controlHeightSM: t * 0.75, controlHeightXS: t * 0.5, controlHeightLG: t * 1.25 };
};
function R9(e) {
  return (e + 8) / e;
}
function L9(e) {
  const t = new Array(10).fill(null).map((n, r) => {
    const i = r - 1,
      o = e * Math.pow(Math.E, i / 5),
      a = r > 1 ? Math.floor(o) : Math.ceil(o);
    return Math.floor(a / 2) * 2;
  });
  return (t[1] = e), t.map((n) => ({ size: n, lineHeight: R9(n) }));
}
const I9 = (e) => {
  const t = L9(e),
    n = t.map((c) => c.size),
    r = t.map((c) => c.lineHeight),
    i = n[1],
    o = n[0],
    a = n[2],
    l = r[1],
    s = r[0],
    u = r[2];
  return {
    fontSizeSM: o,
    fontSize: i,
    fontSizeLG: a,
    fontSizeXL: n[3],
    fontSizeHeading1: n[6],
    fontSizeHeading2: n[5],
    fontSizeHeading3: n[4],
    fontSizeHeading4: n[3],
    fontSizeHeading5: n[2],
    lineHeight: l,
    lineHeightLG: u,
    lineHeightSM: s,
    fontHeight: Math.round(l * i),
    fontHeightLG: Math.round(u * a),
    fontHeightSM: Math.round(s * o),
    lineHeightHeading1: r[6],
    lineHeightHeading2: r[5],
    lineHeightHeading3: r[4],
    lineHeightHeading4: r[3],
    lineHeightHeading5: r[2],
  };
};
function _9(e) {
  const { sizeUnit: t, sizeStep: n } = e;
  return {
    sizeXXL: t * (n + 8),
    sizeXL: t * (n + 4),
    sizeLG: t * (n + 2),
    sizeMD: t * (n + 1),
    sizeMS: t * n,
    size: t * n,
    sizeSM: t * (n - 1),
    sizeXS: t * (n - 2),
    sizeXXS: t * (n - 3),
  };
}
const Sr = (e, t) => new qt(e).setAlpha(t).toRgbString(),
  da = (e, t) => new qt(e).darken(t).toHexString(),
  O9 = (e) => {
    const t = dl(e);
    return {
      1: t[0],
      2: t[1],
      3: t[2],
      4: t[3],
      5: t[4],
      6: t[5],
      7: t[6],
      8: t[4],
      9: t[5],
      10: t[6],
    };
  },
  $9 = (e, t) => {
    const n = e || '#fff',
      r = t || '#000';
    return {
      colorBgBase: n,
      colorTextBase: r,
      colorText: Sr(r, 0.88),
      colorTextSecondary: Sr(r, 0.65),
      colorTextTertiary: Sr(r, 0.45),
      colorTextQuaternary: Sr(r, 0.25),
      colorFill: Sr(r, 0.15),
      colorFillSecondary: Sr(r, 0.06),
      colorFillTertiary: Sr(r, 0.04),
      colorFillQuaternary: Sr(r, 0.02),
      colorBgLayout: da(n, 4),
      colorBgContainer: da(n, 0),
      colorBgElevated: da(n, 0),
      colorBgSpotlight: Sr(r, 0.85),
      colorBgBlur: 'transparent',
      colorBorder: da(n, 15),
      colorBorderSecondary: da(n, 6),
    };
  };
function T9(e) {
  (Hc.pink = Hc.magenta), (Bc.pink = Bc.magenta);
  const t = Object.keys(w0)
    .map((n) => {
      const r = e[n] === Hc[n] ? Bc[n] : dl(e[n]);
      return new Array(10)
        .fill(1)
        .reduce((i, o, a) => ((i[`${n}-${a + 1}`] = r[a]), (i[`${n}${a + 1}`] = r[a]), i), {});
    })
    .reduce((n, r) => ((n = Object.assign(Object.assign({}, n), r)), n), {});
  return Object.assign(
    Object.assign(
      Object.assign(
        Object.assign(
          Object.assign(
            Object.assign(Object.assign({}, e), t),
            E9(e, { generateColorPalettes: O9, generateNeutralColorPalettes: $9 }),
          ),
          I9(e.fontSize),
        ),
        _9(e),
      ),
      M9(e),
    ),
    P9(e),
  );
}
const S0 = t2(T9),
  S2 = { token: vl, override: { override: vl }, hashed: !0 },
  x0 = mt.createContext(S2),
  du = 'ant',
  b0 = 'anticon',
  N9 = (e, t) => t || (e ? `${du}-${e}` : du),
  Tr = d.createContext({ getPrefixCls: N9, iconPrefixCls: b0 }),
  F9 = `-ant-${Date.now()}-${Math.random()}`;
function j9(e, t) {
  const n = {},
    r = (a, l) => {
      let s = a.clone();
      return (s = (l == null ? void 0 : l(s)) || s), s.toRgbString();
    },
    i = (a, l) => {
      const s = new qt(a),
        u = dl(s.toRgbString());
      (n[`${l}-color`] = r(s)),
        (n[`${l}-color-disabled`] = u[1]),
        (n[`${l}-color-hover`] = u[4]),
        (n[`${l}-color-active`] = u[6]),
        (n[`${l}-color-outline`] = s.clone().setAlpha(0.2).toRgbString()),
        (n[`${l}-color-deprecated-bg`] = u[0]),
        (n[`${l}-color-deprecated-border`] = u[2]);
    };
  if (t.primaryColor) {
    i(t.primaryColor, 'primary');
    const a = new qt(t.primaryColor),
      l = dl(a.toRgbString());
    l.forEach((u, c) => {
      n[`primary-${c + 1}`] = u;
    }),
      (n['primary-color-deprecated-l-35'] = r(a, (u) => u.lighten(35))),
      (n['primary-color-deprecated-l-20'] = r(a, (u) => u.lighten(20))),
      (n['primary-color-deprecated-t-20'] = r(a, (u) => u.tint(20))),
      (n['primary-color-deprecated-t-50'] = r(a, (u) => u.tint(50))),
      (n['primary-color-deprecated-f-12'] = r(a, (u) => u.setAlpha(u.getAlpha() * 0.12)));
    const s = new qt(l[0]);
    (n['primary-color-active-deprecated-f-30'] = r(s, (u) => u.setAlpha(u.getAlpha() * 0.3))),
      (n['primary-color-active-deprecated-d-02'] = r(s, (u) => u.darken(2)));
  }
  return (
    t.successColor && i(t.successColor, 'success'),
    t.warningColor && i(t.warningColor, 'warning'),
    t.errorColor && i(t.errorColor, 'error'),
    t.infoColor && i(t.infoColor, 'info'),
    `
  :root {
    ${Object.keys(n).map((a) => `--${e}-${a}: ${n[a]};`).join(`
`)}
  }
  `.trim()
  );
}
function A9(e, t) {
  const n = j9(e, t);
  yn() && Rr(n, `${F9}-dynamic-theme`);
}
const x2 = d.createContext(!1),
  z9 = (e) => {
    let { children: t, disabled: n } = e;
    const r = d.useContext(x2);
    return d.createElement(x2.Provider, { value: n ?? r }, t);
  },
  ml = d.createContext(void 0),
  D9 = (e) => {
    let { children: t, size: n } = e;
    const r = d.useContext(ml);
    return d.createElement(ml.Provider, { value: n || r }, t);
  };
function V9() {
  const e = d.useContext(x2),
    t = d.useContext(ml);
  return { componentDisabled: e, componentSize: t };
}
var E0 = jt(function e() {
    Ft(this, e);
  }),
  k0 = 'CALC_UNIT',
  H9 = new RegExp(k0, 'g');
function Uc(e) {
  return typeof e == 'number' ? ''.concat(e).concat(k0) : e;
}
var B9 = (function (e) {
    vi(n, e);
    var t = mi(n);
    function n(r, i) {
      var o;
      Ft(this, n),
        (o = t.call(this)),
        L(le(o), 'result', ''),
        L(le(o), 'unitlessCssVar', void 0),
        L(le(o), 'lowPriority', void 0);
      var a = oe(r);
      return (
        (o.unitlessCssVar = i),
        r instanceof n
          ? (o.result = '('.concat(r.result, ')'))
          : a === 'number'
            ? (o.result = Uc(r))
            : a === 'string' && (o.result = r),
        o
      );
    }
    return (
      jt(n, [
        {
          key: 'add',
          value: function (i) {
            return (
              i instanceof n
                ? (this.result = ''.concat(this.result, ' + ').concat(i.getResult()))
                : (typeof i == 'number' || typeof i == 'string') &&
                  (this.result = ''.concat(this.result, ' + ').concat(Uc(i))),
              (this.lowPriority = !0),
              this
            );
          },
        },
        {
          key: 'sub',
          value: function (i) {
            return (
              i instanceof n
                ? (this.result = ''.concat(this.result, ' - ').concat(i.getResult()))
                : (typeof i == 'number' || typeof i == 'string') &&
                  (this.result = ''.concat(this.result, ' - ').concat(Uc(i))),
              (this.lowPriority = !0),
              this
            );
          },
        },
        {
          key: 'mul',
          value: function (i) {
            return (
              this.lowPriority && (this.result = '('.concat(this.result, ')')),
              i instanceof n
                ? (this.result = ''.concat(this.result, ' * ').concat(i.getResult(!0)))
                : (typeof i == 'number' || typeof i == 'string') &&
                  (this.result = ''.concat(this.result, ' * ').concat(i)),
              (this.lowPriority = !1),
              this
            );
          },
        },
        {
          key: 'div',
          value: function (i) {
            return (
              this.lowPriority && (this.result = '('.concat(this.result, ')')),
              i instanceof n
                ? (this.result = ''.concat(this.result, ' / ').concat(i.getResult(!0)))
                : (typeof i == 'number' || typeof i == 'string') &&
                  (this.result = ''.concat(this.result, ' / ').concat(i)),
              (this.lowPriority = !1),
              this
            );
          },
        },
        {
          key: 'getResult',
          value: function (i) {
            return this.lowPriority || i ? '('.concat(this.result, ')') : this.result;
          },
        },
        {
          key: 'equal',
          value: function (i) {
            var o = this,
              a = i || {},
              l = a.unit,
              s = !0;
            return (
              typeof l == 'boolean'
                ? (s = l)
                : Array.from(this.unitlessCssVar).some(function (u) {
                    return o.result.includes(u);
                  }) && (s = !1),
              (this.result = this.result.replace(H9, s ? 'px' : '')),
              typeof this.lowPriority < 'u' ? 'calc('.concat(this.result, ')') : this.result
            );
          },
        },
      ]),
      n
    );
  })(E0),
  U9 = (function (e) {
    vi(n, e);
    var t = mi(n);
    function n(r) {
      var i;
      return (
        Ft(this, n),
        (i = t.call(this)),
        L(le(i), 'result', 0),
        r instanceof n ? (i.result = r.result) : typeof r == 'number' && (i.result = r),
        i
      );
    }
    return (
      jt(n, [
        {
          key: 'add',
          value: function (i) {
            return (
              i instanceof n
                ? (this.result += i.result)
                : typeof i == 'number' && (this.result += i),
              this
            );
          },
        },
        {
          key: 'sub',
          value: function (i) {
            return (
              i instanceof n
                ? (this.result -= i.result)
                : typeof i == 'number' && (this.result -= i),
              this
            );
          },
        },
        {
          key: 'mul',
          value: function (i) {
            return (
              i instanceof n
                ? (this.result *= i.result)
                : typeof i == 'number' && (this.result *= i),
              this
            );
          },
        },
        {
          key: 'div',
          value: function (i) {
            return (
              i instanceof n
                ? (this.result /= i.result)
                : typeof i == 'number' && (this.result /= i),
              this
            );
          },
        },
        {
          key: 'equal',
          value: function () {
            return this.result;
          },
        },
      ]),
      n
    );
  })(E0),
  W9 = function (t, n) {
    var r = t === 'css' ? B9 : U9;
    return function (i) {
      return new r(i, n);
    };
  },
  i5 = function (t, n) {
    return ''.concat(
      [n, t.replace(/([A-Z]+)([A-Z][a-z]+)/g, '$1-$2').replace(/([a-z])([A-Z])/g, '$1-$2')]
        .filter(Boolean)
        .join('-'),
    );
  };
function on(e) {
  var t = d.useRef();
  t.current = e;
  var n = d.useCallback(function () {
    for (var r, i = arguments.length, o = new Array(i), a = 0; a < i; a++) o[a] = arguments[a];
    return (r = t.current) === null || r === void 0 ? void 0 : r.call.apply(r, [t].concat(o));
  }, []);
  return n;
}
function pl(e) {
  var t = d.useRef(!1),
    n = d.useState(e),
    r = B(n, 2),
    i = r[0],
    o = r[1];
  d.useEffect(function () {
    return (
      (t.current = !1),
      function () {
        t.current = !0;
      }
    );
  }, []);
  function a(l, s) {
    (s && t.current) || o(l);
  }
  return [i, a];
}
function Wc(e) {
  return e !== void 0;
}
function Na(e, t) {
  var n = t || {},
    r = n.defaultValue,
    i = n.value,
    o = n.onChange,
    a = n.postState,
    l = pl(function () {
      return Wc(i)
        ? i
        : Wc(r)
          ? typeof r == 'function'
            ? r()
            : r
          : typeof e == 'function'
            ? e()
            : e;
    }),
    s = B(l, 2),
    u = s[0],
    c = s[1],
    f = i !== void 0 ? i : u,
    v = a ? a(f) : f,
    y = on(o),
    g = pl([f]),
    C = B(g, 2),
    w = C[0],
    p = C[1];
  H4(
    function () {
      var h = w[0];
      u !== h && y(u, h);
    },
    [w],
  ),
    H4(
      function () {
        Wc(i) || c(i);
      },
      [i],
    );
  var m = on(function (h, S) {
    c(h, S), p([f], S);
  });
  return [v, m];
}
function o5(e, t, n, r) {
  var i = T({}, t[e]);
  if (r != null && r.deprecatedTokens) {
    var o = r.deprecatedTokens;
    o.forEach(function (l) {
      var s = B(l, 2),
        u = s[0],
        c = s[1];
      if ((i != null && i[u]) || (i != null && i[c])) {
        var f;
        ((f = i[c]) !== null && f !== void 0) || (i[c] = i == null ? void 0 : i[u]);
      }
    });
  }
  var a = T(T({}, n), i);
  return (
    Object.keys(a).forEach(function (l) {
      a[l] === t[l] && delete a[l];
    }),
    a
  );
}
var P0 = typeof CSSINJS_STATISTIC < 'u',
  b2 = !0;
function Uo() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
  if (!P0) return Object.assign.apply(Object, [{}].concat(t));
  b2 = !1;
  var r = {};
  return (
    t.forEach(function (i) {
      if (oe(i) === 'object') {
        var o = Object.keys(i);
        o.forEach(function (a) {
          Object.defineProperty(r, a, {
            configurable: !0,
            enumerable: !0,
            get: function () {
              return i[a];
            },
          });
        });
      }
    }),
    (b2 = !0),
    r
  );
}
var a5 = {};
function K9() {}
var Z9 = function (t) {
  var n,
    r = t,
    i = K9;
  return (
    P0 &&
      typeof Proxy < 'u' &&
      ((n = new Set()),
      (r = new Proxy(t, {
        get: function (a, l) {
          if (b2) {
            var s;
            (s = n) === null || s === void 0 || s.add(l);
          }
          return a[l];
        },
      })),
      (i = function (a, l) {
        var s;
        a5[a] = {
          global: Array.from(n),
          component: T(T({}, (s = a5[a]) === null || s === void 0 ? void 0 : s.component), l),
        };
      })),
    { token: r, keys: n, flush: i }
  );
};
function l5(e, t, n) {
  if (typeof n == 'function') {
    var r;
    return n(Uo(t, (r = t[e]) !== null && r !== void 0 ? r : {}));
  }
  return n ?? {};
}
function G9(e) {
  return e === 'js'
    ? { max: Math.max, min: Math.min }
    : {
        max: function () {
          for (var n = arguments.length, r = new Array(n), i = 0; i < n; i++) r[i] = arguments[i];
          return 'max('.concat(
            r
              .map(function (o) {
                return be(o);
              })
              .join(','),
            ')',
          );
        },
        min: function () {
          for (var n = arguments.length, r = new Array(n), i = 0; i < n; i++) r[i] = arguments[i];
          return 'min('.concat(
            r
              .map(function (o) {
                return be(o);
              })
              .join(','),
            ')',
          );
        },
      };
}
var q9 = 1e3 * 60 * 10,
  Q9 = (function () {
    function e() {
      Ft(this, e),
        L(this, 'map', new Map()),
        L(this, 'objectIDMap', new WeakMap()),
        L(this, 'nextID', 0),
        L(this, 'lastAccessBeat', new Map()),
        L(this, 'accessBeat', 0);
    }
    return (
      jt(e, [
        {
          key: 'set',
          value: function (n, r) {
            this.clear();
            var i = this.getCompositeKey(n);
            this.map.set(i, r), this.lastAccessBeat.set(i, Date.now());
          },
        },
        {
          key: 'get',
          value: function (n) {
            var r = this.getCompositeKey(n),
              i = this.map.get(r);
            return this.lastAccessBeat.set(r, Date.now()), (this.accessBeat += 1), i;
          },
        },
        {
          key: 'getCompositeKey',
          value: function (n) {
            var r = this,
              i = n.map(function (o) {
                return o && oe(o) === 'object'
                  ? 'obj_'.concat(r.getObjectID(o))
                  : ''.concat(oe(o), '_').concat(o);
              });
            return i.join('|');
          },
        },
        {
          key: 'getObjectID',
          value: function (n) {
            if (this.objectIDMap.has(n)) return this.objectIDMap.get(n);
            var r = this.nextID;
            return this.objectIDMap.set(n, r), (this.nextID += 1), r;
          },
        },
        {
          key: 'clear',
          value: function () {
            var n = this;
            if (this.accessBeat > 1e4) {
              var r = Date.now();
              this.lastAccessBeat.forEach(function (i, o) {
                r - i > q9 && (n.map.delete(o), n.lastAccessBeat.delete(o));
              }),
                (this.accessBeat = 0);
            }
          },
        },
      ]),
      e
    );
  })(),
  s5 = new Q9();
function X9(e, t) {
  return mt.useMemo(function () {
    var n = s5.get(t);
    if (n) return n;
    var r = e();
    return s5.set(t, r), r;
  }, t);
}
var Y9 = function () {
  return {};
};
function J9(e) {
  var t = e.useCSP,
    n = t === void 0 ? Y9 : t,
    r = e.useToken,
    i = e.usePrefix,
    o = e.getResetStyles,
    a = e.getCommonStyle,
    l = e.getCompUnitless;
  function s(v, y, g, C) {
    var w = Array.isArray(v) ? v[0] : v;
    function p(P) {
      return ''.concat(String(w)).concat(P.slice(0, 1).toUpperCase()).concat(P.slice(1));
    }
    var m = (C == null ? void 0 : C.unitless) || {},
      h = typeof l == 'function' ? l(v) : {},
      S = T(T({}, h), {}, L({}, p('zIndexPopup'), !0));
    Object.keys(m).forEach(function (P) {
      S[p(P)] = m[P];
    });
    var x = T(T({}, C), {}, { unitless: S, prefixToken: p }),
      b = c(v, y, g, x),
      E = u(w, g, x);
    return function (P) {
      var M = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : P,
        I = b(P, M),
        F = B(I, 2),
        z = F[1],
        j = E(M),
        A = B(j, 2),
        W = A[0],
        O = A[1];
      return [W, z, O];
    };
  }
  function u(v, y, g) {
    var C = g.unitless,
      w = g.injectStyle,
      p = w === void 0 ? !0 : w,
      m = g.prefixToken,
      h = g.ignore,
      S = function (E) {
        var P = E.rootCls,
          M = E.cssVar,
          I = M === void 0 ? {} : M,
          F = r(),
          z = F.realToken;
        return (
          G8(
            { path: [v], prefix: I.prefix, key: I.key, unitless: C, ignore: h, token: z, scope: P },
            function () {
              var j = l5(v, z, y),
                A = o5(v, z, j, { deprecatedTokens: g == null ? void 0 : g.deprecatedTokens });
              return (
                Object.keys(j).forEach(function (W) {
                  (A[m(W)] = A[W]), delete A[W];
                }),
                A
              );
            },
          ),
          null
        );
      },
      x = function (E) {
        var P = r(),
          M = P.cssVar;
        return [
          function (I) {
            return p && M
              ? mt.createElement(
                  mt.Fragment,
                  null,
                  mt.createElement(S, { rootCls: E, cssVar: M, component: v }),
                  I,
                )
              : I;
          },
          M == null ? void 0 : M.key,
        ];
      };
    return x;
  }
  function c(v, y, g) {
    var C = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {},
      w = Array.isArray(v) ? v : [v, v],
      p = B(w, 1),
      m = p[0],
      h = w.join('-'),
      S = e.layer || { name: 'antd' };
    return function (x) {
      var b = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : x,
        E = r(),
        P = E.theme,
        M = E.realToken,
        I = E.hashId,
        F = E.token,
        z = E.cssVar,
        j = i(),
        A = j.rootPrefixCls,
        W = j.iconPrefixCls,
        O = n(),
        R = z ? 'css' : 'js',
        k = X9(
          function () {
            var H = new Set();
            return (
              z &&
                Object.keys(C.unitless || {}).forEach(function (Q) {
                  H.add(Rs(Q, z.prefix)), H.add(Rs(Q, i5(m, z.prefix)));
                }),
              W9(R, H)
            );
          },
          [R, m, z == null ? void 0 : z.prefix],
        ),
        $ = G9(R),
        N = $.max,
        D = $.min,
        V = {
          theme: P,
          token: F,
          hashId: I,
          nonce: function () {
            return O.nonce;
          },
          clientOnly: C.clientOnly,
          layer: S,
          order: C.order || -999,
        };
      o2(T(T({}, V), {}, { clientOnly: !1, path: ['Shared', A] }), function () {
        return typeof o == 'function' ? o(F) : [];
      });
      var Z = o2(T(T({}, V), {}, { path: [h, x, W] }), function () {
        if (C.injectStyle === !1) return [];
        var H = Z9(F),
          Q = H.token,
          ee = H.flush,
          te = l5(m, M, g),
          ve = '.'.concat(x),
          Ie = o5(m, M, te, { deprecatedTokens: C.deprecatedTokens });
        z &&
          te &&
          oe(te) === 'object' &&
          Object.keys(te).forEach(function ($e) {
            te[$e] = 'var('.concat(Rs($e, i5(m, z.prefix)), ')');
          });
        var fe = Uo(
            Q,
            {
              componentCls: ve,
              prefixCls: x,
              iconCls: '.'.concat(W),
              antCls: '.'.concat(A),
              calc: k,
              max: N,
              min: D,
            },
            z ? te : Ie,
          ),
          me = y(fe, { hashId: I, prefixCls: x, rootPrefixCls: A, iconPrefixCls: W });
        ee(m, Ie);
        var ue = typeof a == 'function' ? a(fe, x, b, C.resetFont) : null;
        return [C.resetStyle === !1 ? null : ue, me];
      });
      return [Z, I];
    };
  }
  function f(v, y, g) {
    var C = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {},
      w = c(v, y, g, T({ resetStyle: !1, order: -998 }, C)),
      p = function (h) {
        var S = h.prefixCls,
          x = h.rootCls,
          b = x === void 0 ? S : x;
        return w(S, b), null;
      };
    return p;
  }
  return { genStyleHooks: s, genSubStyleComponent: f, genComponentStyleHook: c };
}
const vu = [
    'blue',
    'purple',
    'cyan',
    'green',
    'magenta',
    'pink',
    'red',
    'orange',
    'yellow',
    'volcano',
    'geekblue',
    'lime',
    'gold',
  ],
  ey = '5.20.6';
function Kc(e) {
  return e >= 0 && e <= 255;
}
function ss(e, t) {
  const { r: n, g: r, b: i, a: o } = new qt(e).toRgb();
  if (o < 1) return e;
  const { r: a, g: l, b: s } = new qt(t).toRgb();
  for (let u = 0.01; u <= 1; u += 0.01) {
    const c = Math.round((n - a * (1 - u)) / u),
      f = Math.round((r - l * (1 - u)) / u),
      v = Math.round((i - s * (1 - u)) / u);
    if (Kc(c) && Kc(f) && Kc(v))
      return new qt({ r: c, g: f, b: v, a: Math.round(u * 100) / 100 }).toRgbString();
  }
  return new qt({ r: n, g: r, b: i, a: 1 }).toRgbString();
}
var ty = function (e, t) {
  var n = {};
  for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
  if (e != null && typeof Object.getOwnPropertySymbols == 'function')
    for (var i = 0, r = Object.getOwnPropertySymbols(e); i < r.length; i++)
      t.indexOf(r[i]) < 0 &&
        Object.prototype.propertyIsEnumerable.call(e, r[i]) &&
        (n[r[i]] = e[r[i]]);
  return n;
};
function M0(e) {
  const { override: t } = e,
    n = ty(e, ['override']),
    r = Object.assign({}, t);
  Object.keys(vl).forEach((v) => {
    delete r[v];
  });
  const i = Object.assign(Object.assign({}, n), r),
    o = 480,
    a = 576,
    l = 768,
    s = 992,
    u = 1200,
    c = 1600;
  if (i.motion === !1) {
    const v = '0s';
    (i.motionDurationFast = v), (i.motionDurationMid = v), (i.motionDurationSlow = v);
  }
  return Object.assign(
    Object.assign(Object.assign({}, i), {
      colorFillContent: i.colorFillSecondary,
      colorFillContentHover: i.colorFill,
      colorFillAlter: i.colorFillQuaternary,
      colorBgContainerDisabled: i.colorFillTertiary,
      colorBorderBg: i.colorBgContainer,
      colorSplit: ss(i.colorBorderSecondary, i.colorBgContainer),
      colorTextPlaceholder: i.colorTextQuaternary,
      colorTextDisabled: i.colorTextQuaternary,
      colorTextHeading: i.colorText,
      colorTextLabel: i.colorTextSecondary,
      colorTextDescription: i.colorTextTertiary,
      colorTextLightSolid: i.colorWhite,
      colorHighlight: i.colorError,
      colorBgTextHover: i.colorFillSecondary,
      colorBgTextActive: i.colorFill,
      colorIcon: i.colorTextTertiary,
      colorIconHover: i.colorText,
      colorErrorOutline: ss(i.colorErrorBg, i.colorBgContainer),
      colorWarningOutline: ss(i.colorWarningBg, i.colorBgContainer),
      fontSizeIcon: i.fontSizeSM,
      lineWidthFocus: i.lineWidth * 4,
      lineWidth: i.lineWidth,
      controlOutlineWidth: i.lineWidth * 2,
      controlInteractiveSize: i.controlHeight / 2,
      controlItemBgHover: i.colorFillTertiary,
      controlItemBgActive: i.colorPrimaryBg,
      controlItemBgActiveHover: i.colorPrimaryBgHover,
      controlItemBgActiveDisabled: i.colorFill,
      controlTmpOutline: i.colorFillQuaternary,
      controlOutline: ss(i.colorPrimaryBg, i.colorBgContainer),
      lineType: i.lineType,
      borderRadius: i.borderRadius,
      borderRadiusXS: i.borderRadiusXS,
      borderRadiusSM: i.borderRadiusSM,
      borderRadiusLG: i.borderRadiusLG,
      fontWeightStrong: 600,
      opacityLoading: 0.65,
      linkDecoration: 'none',
      linkHoverDecoration: 'none',
      linkFocusDecoration: 'none',
      controlPaddingHorizontal: 12,
      controlPaddingHorizontalSM: 8,
      paddingXXS: i.sizeXXS,
      paddingXS: i.sizeXS,
      paddingSM: i.sizeSM,
      padding: i.size,
      paddingMD: i.sizeMD,
      paddingLG: i.sizeLG,
      paddingXL: i.sizeXL,
      paddingContentHorizontalLG: i.sizeLG,
      paddingContentVerticalLG: i.sizeMS,
      paddingContentHorizontal: i.sizeMS,
      paddingContentVertical: i.sizeSM,
      paddingContentHorizontalSM: i.size,
      paddingContentVerticalSM: i.sizeXS,
      marginXXS: i.sizeXXS,
      marginXS: i.sizeXS,
      marginSM: i.sizeSM,
      margin: i.size,
      marginMD: i.sizeMD,
      marginLG: i.sizeLG,
      marginXL: i.sizeXL,
      marginXXL: i.sizeXXL,
      boxShadow: `
      0 6px 16px 0 rgba(0, 0, 0, 0.08),
      0 3px 6px -4px rgba(0, 0, 0, 0.12),
      0 9px 28px 8px rgba(0, 0, 0, 0.05)
    `,
      boxShadowSecondary: `
      0 6px 16px 0 rgba(0, 0, 0, 0.08),
      0 3px 6px -4px rgba(0, 0, 0, 0.12),
      0 9px 28px 8px rgba(0, 0, 0, 0.05)
    `,
      boxShadowTertiary: `
      0 1px 2px 0 rgba(0, 0, 0, 0.03),
      0 1px 6px -1px rgba(0, 0, 0, 0.02),
      0 2px 4px 0 rgba(0, 0, 0, 0.02)
    `,
      screenXS: o,
      screenXSMin: o,
      screenXSMax: a - 1,
      screenSM: a,
      screenSMMin: a,
      screenSMMax: l - 1,
      screenMD: l,
      screenMDMin: l,
      screenMDMax: s - 1,
      screenLG: s,
      screenLGMin: s,
      screenLGMax: u - 1,
      screenXL: u,
      screenXLMin: u,
      screenXLMax: c - 1,
      screenXXL: c,
      screenXXLMin: c,
      boxShadowPopoverArrow: '2px 2px 5px rgba(0, 0, 0, 0.05)',
      boxShadowCard: `
      0 1px 2px -2px ${new qt('rgba(0, 0, 0, 0.16)').toRgbString()},
      0 3px 6px 0 ${new qt('rgba(0, 0, 0, 0.12)').toRgbString()},
      0 5px 12px 4px ${new qt('rgba(0, 0, 0, 0.09)').toRgbString()}
    `,
      boxShadowDrawerRight: `
      -6px 0 16px 0 rgba(0, 0, 0, 0.08),
      -3px 0 6px -4px rgba(0, 0, 0, 0.12),
      -9px 0 28px 8px rgba(0, 0, 0, 0.05)
    `,
      boxShadowDrawerLeft: `
      6px 0 16px 0 rgba(0, 0, 0, 0.08),
      3px 0 6px -4px rgba(0, 0, 0, 0.12),
      9px 0 28px 8px rgba(0, 0, 0, 0.05)
    `,
      boxShadowDrawerUp: `
      0 6px 16px 0 rgba(0, 0, 0, 0.08),
      0 3px 6px -4px rgba(0, 0, 0, 0.12),
      0 9px 28px 8px rgba(0, 0, 0, 0.05)
    `,
      boxShadowDrawerDown: `
      0 -6px 16px 0 rgba(0, 0, 0, 0.08),
      0 -3px 6px -4px rgba(0, 0, 0, 0.12),
      0 -9px 28px 8px rgba(0, 0, 0, 0.05)
    `,
      boxShadowTabsOverflowLeft: 'inset 10px 0 8px -8px rgba(0, 0, 0, 0.08)',
      boxShadowTabsOverflowRight: 'inset -10px 0 8px -8px rgba(0, 0, 0, 0.08)',
      boxShadowTabsOverflowTop: 'inset 0 10px 8px -8px rgba(0, 0, 0, 0.08)',
      boxShadowTabsOverflowBottom: 'inset 0 -10px 8px -8px rgba(0, 0, 0, 0.08)',
    }),
    r,
  );
}
var u5 = function (e, t) {
  var n = {};
  for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
  if (e != null && typeof Object.getOwnPropertySymbols == 'function')
    for (var i = 0, r = Object.getOwnPropertySymbols(e); i < r.length; i++)
      t.indexOf(r[i]) < 0 &&
        Object.prototype.propertyIsEnumerable.call(e, r[i]) &&
        (n[r[i]] = e[r[i]]);
  return n;
};
const R0 = {
    lineHeight: !0,
    lineHeightSM: !0,
    lineHeightLG: !0,
    lineHeightHeading1: !0,
    lineHeightHeading2: !0,
    lineHeightHeading3: !0,
    lineHeightHeading4: !0,
    lineHeightHeading5: !0,
    opacityLoading: !0,
    fontWeightStrong: !0,
    zIndexPopupBase: !0,
    zIndexBase: !0,
    opacityImage: !0,
  },
  ny = {
    size: !0,
    sizeSM: !0,
    sizeLG: !0,
    sizeMD: !0,
    sizeXS: !0,
    sizeXXS: !0,
    sizeMS: !0,
    sizeXL: !0,
    sizeXXL: !0,
    sizeUnit: !0,
    sizeStep: !0,
    motionBase: !0,
    motionUnit: !0,
  },
  ry = {
    screenXS: !0,
    screenXSMin: !0,
    screenXSMax: !0,
    screenSM: !0,
    screenSMMin: !0,
    screenSMMax: !0,
    screenMD: !0,
    screenMDMin: !0,
    screenMDMax: !0,
    screenLG: !0,
    screenLGMin: !0,
    screenLGMax: !0,
    screenXL: !0,
    screenXLMin: !0,
    screenXLMax: !0,
    screenXXL: !0,
    screenXXLMin: !0,
  },
  L0 = (e, t, n) => {
    const r = n.getDerivativeToken(e),
      { override: i } = t,
      o = u5(t, ['override']);
    let a = Object.assign(Object.assign({}, r), { override: i });
    return (
      (a = M0(a)),
      o &&
        Object.entries(o).forEach((l) => {
          let [s, u] = l;
          const { theme: c } = u,
            f = u5(u, ['theme']);
          let v = f;
          c && (v = L0(Object.assign(Object.assign({}, a), f), { override: f }, c)), (a[s] = v);
        }),
      a
    );
  };
function Xo() {
  const { token: e, hashed: t, theme: n, override: r, cssVar: i } = mt.useContext(x0),
    o = `${ey}-${t || ''}`,
    a = n || S0,
    [l, s, u] = S8(a, [vl, e], {
      salt: o,
      override: r,
      getComputedToken: L0,
      formatToken: M0,
      cssVar: i && { prefix: i.prefix, key: i.key, unitless: R0, ignore: ny, preserve: ry },
    });
  return [a, u, t ? s : '', l, i];
}
const iy = { overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' },
  I0 = function (e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    return {
      boxSizing: 'border-box',
      margin: 0,
      padding: 0,
      color: e.colorText,
      fontSize: e.fontSize,
      lineHeight: e.lineHeight,
      listStyle: 'none',
      fontFamily: t ? 'inherit' : e.fontFamily,
    };
  },
  _0 = () => ({
    display: 'inline-flex',
    alignItems: 'center',
    color: 'inherit',
    fontStyle: 'normal',
    lineHeight: 0,
    textAlign: 'center',
    textTransform: 'none',
    verticalAlign: '-0.125em',
    textRendering: 'optimizeLegibility',
    '-webkit-font-smoothing': 'antialiased',
    '-moz-osx-font-smoothing': 'grayscale',
    '> *': { lineHeight: 1 },
    svg: { display: 'inline-block' },
  }),
  c5 = () => ({
    '&::before': { display: 'table', content: '""' },
    '&::after': { display: 'table', clear: 'both', content: '""' },
  }),
  oy = (e) => ({
    a: {
      color: e.colorLink,
      textDecoration: e.linkDecoration,
      backgroundColor: 'transparent',
      outline: 'none',
      cursor: 'pointer',
      transition: `color ${e.motionDurationSlow}`,
      '-webkit-text-decoration-skip': 'objects',
      '&:hover': { color: e.colorLinkHover },
      '&:active': { color: e.colorLinkActive },
      '&:active, &:hover': { textDecoration: e.linkHoverDecoration, outline: 0 },
      '&:focus': { textDecoration: e.linkFocusDecoration, outline: 0 },
      '&[disabled]': { color: e.colorTextDisabled, cursor: 'not-allowed' },
    },
  }),
  ay = (e, t, n, r) => {
    const i = `[class^="${t}"], [class*=" ${t}"]`,
      o = n ? `.${n}` : i,
      a = { boxSizing: 'border-box', '&::before, &::after': { boxSizing: 'border-box' } };
    let l = {};
    return (
      r !== !1 && (l = { fontFamily: e.fontFamily, fontSize: e.fontSize }),
      { [o]: Object.assign(Object.assign(Object.assign({}, l), a), { [i]: a }) }
    );
  },
  ly = (e) => ({
    outline: `${be(e.lineWidthFocus)} solid ${e.colorPrimaryBorder}`,
    outlineOffset: 1,
    transition: 'outline-offset 0s, outline 0s',
  }),
  O0 = (e, t) => {
    const [n, r] = Xo();
    return o2(
      {
        theme: n,
        token: r,
        hashId: '',
        path: ['ant-design-icons', e],
        nonce: () => (t == null ? void 0 : t.nonce),
        layer: { name: 'antd' },
      },
      () => [
        {
          [`.${e}`]: Object.assign(Object.assign({}, _0()), {
            [`.${e} .${e}-icon`]: { display: 'block' },
          }),
        },
      ],
    );
  },
  {
    genStyleHooks: $0,
    genComponentStyleHook: eb,
    genSubStyleComponent: tb,
  } = J9({
    usePrefix: () => {
      const { getPrefixCls: e, iconPrefixCls: t } = d.useContext(Tr);
      return { rootPrefixCls: e(), iconPrefixCls: t };
    },
    useToken: () => {
      const [e, t, n, r, i] = Xo();
      return { theme: e, realToken: t, hashId: n, token: r, cssVar: i };
    },
    useCSP: () => {
      const { csp: e, iconPrefixCls: t } = d.useContext(Tr);
      return O0(t, e), e ?? {};
    },
    getResetStyles: (e) => [{ '&': oy(e) }],
    getCommonStyle: ay,
    getCompUnitless: () => R0,
  });
function sy(e, t) {
  return vu.reduce((n, r) => {
    const i = e[`${r}1`],
      o = e[`${r}3`],
      a = e[`${r}6`],
      l = e[`${r}7`];
    return Object.assign(
      Object.assign({}, n),
      t(r, { lightColor: i, lightBorderColor: o, darkColor: a, textColor: l }),
    );
  }, {});
}
const uy = Object.assign({}, Cl),
  { useId: f5 } = uy,
  cy = () => '',
  fy = typeof f5 > 'u' ? cy : f5;
function dy(e, t, n) {
  var r;
  m0();
  const i = e || {},
    o =
      i.inherit === !1 || !t
        ? Object.assign(Object.assign({}, S2), {
            hashed: (r = t == null ? void 0 : t.hashed) !== null && r !== void 0 ? r : S2.hashed,
            cssVar: t == null ? void 0 : t.cssVar,
          })
        : t,
    a = fy();
  return Ku(
    () => {
      var l, s;
      if (!e) return t;
      const u = Object.assign({}, o.components);
      Object.keys(e.components || {}).forEach((v) => {
        u[v] = Object.assign(Object.assign({}, u[v]), e.components[v]);
      });
      const c = `css-var-${a.replace(/:/g, '')}`,
        f =
          ((l = i.cssVar) !== null && l !== void 0 ? l : o.cssVar) &&
          Object.assign(
            Object.assign(
              Object.assign(
                { prefix: n == null ? void 0 : n.prefixCls },
                typeof o.cssVar == 'object' ? o.cssVar : {},
              ),
              typeof i.cssVar == 'object' ? i.cssVar : {},
            ),
            {
              key:
                (typeof i.cssVar == 'object' &&
                  ((s = i.cssVar) === null || s === void 0 ? void 0 : s.key)) ||
                c,
            },
          );
      return Object.assign(Object.assign(Object.assign({}, o), i), {
        token: Object.assign(Object.assign({}, o.token), i.token),
        components: u,
        cssVar: f,
      });
    },
    [i, o],
    (l, s) =>
      l.some((u, c) => {
        const f = s[c];
        return !ul(u, f, !0);
      }),
  );
}
var vy = ['children'],
  T0 = d.createContext({});
function my(e) {
  var t = e.children,
    n = ze(e, vy);
  return d.createElement(T0.Provider, { value: n }, t);
}
var py = (function (e) {
  vi(n, e);
  var t = mi(n);
  function n() {
    return Ft(this, n), t.apply(this, arguments);
  }
  return (
    jt(n, [
      {
        key: 'render',
        value: function () {
          return this.props.children;
        },
      },
    ]),
    n
  );
})(d.Component);
function hy(e) {
  var t = d.useReducer(function (l) {
      return l + 1;
    }, 0),
    n = B(t, 2),
    r = n[1],
    i = d.useRef(e),
    o = on(function () {
      return i.current;
    }),
    a = on(function (l) {
      (i.current = typeof l == 'function' ? l(i.current) : l), r();
    });
  return [o, a];
}
var Vr = 'none',
  us = 'appear',
  cs = 'enter',
  fs = 'leave',
  d5 = 'none',
  Zn = 'prepare',
  xo = 'start',
  bo = 'active',
  nd = 'end',
  N0 = 'prepared';
function v5(e, t) {
  var n = {};
  return (
    (n[e.toLowerCase()] = t.toLowerCase()),
    (n['Webkit'.concat(e)] = 'webkit'.concat(t)),
    (n['Moz'.concat(e)] = 'moz'.concat(t)),
    (n['ms'.concat(e)] = 'MS'.concat(t)),
    (n['O'.concat(e)] = 'o'.concat(t.toLowerCase())),
    n
  );
}
function gy(e, t) {
  var n = {
    animationend: v5('Animation', 'AnimationEnd'),
    transitionend: v5('Transition', 'TransitionEnd'),
  };
  return (
    e &&
      ('AnimationEvent' in t || delete n.animationend.animation,
      'TransitionEvent' in t || delete n.transitionend.transition),
    n
  );
}
var yy = gy(yn(), typeof window < 'u' ? window : {}),
  F0 = {};
if (yn()) {
  var Cy = document.createElement('div');
  F0 = Cy.style;
}
var ds = {};
function j0(e) {
  if (ds[e]) return ds[e];
  var t = yy[e];
  if (t)
    for (var n = Object.keys(t), r = n.length, i = 0; i < r; i += 1) {
      var o = n[i];
      if (Object.prototype.hasOwnProperty.call(t, o) && o in F0) return (ds[e] = t[o]), ds[e];
    }
  return '';
}
var A0 = j0('animationend'),
  z0 = j0('transitionend'),
  D0 = !!(A0 && z0),
  m5 = A0 || 'animationend',
  p5 = z0 || 'transitionend';
function h5(e, t) {
  if (!e) return null;
  if (oe(e) === 'object') {
    var n = t.replace(/-\w/g, function (r) {
      return r[1].toUpperCase();
    });
    return e[n];
  }
  return ''.concat(e, '-').concat(t);
}
const wy = function (e) {
  var t = d.useRef();
  function n(i) {
    i && (i.removeEventListener(p5, e), i.removeEventListener(m5, e));
  }
  function r(i) {
    t.current && t.current !== i && n(t.current),
      i &&
        i !== t.current &&
        (i.addEventListener(p5, e), i.addEventListener(m5, e), (t.current = i));
  }
  return (
    d.useEffect(function () {
      return function () {
        n(t.current);
      };
    }, []),
    [r, n]
  );
};
var V0 = yn() ? d.useLayoutEffect : d.useEffect;
const Sy = function () {
  var e = d.useRef(null);
  function t() {
    Mr.cancel(e.current);
  }
  function n(r) {
    var i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 2;
    t();
    var o = Mr(function () {
      i <= 1
        ? r({
            isCanceled: function () {
              return o !== e.current;
            },
          })
        : n(r, i - 1);
    });
    e.current = o;
  }
  return (
    d.useEffect(function () {
      return function () {
        t();
      };
    }, []),
    [n, t]
  );
};
var xy = [Zn, xo, bo, nd],
  by = [Zn, N0],
  H0 = !1,
  Ey = !0;
function B0(e) {
  return e === bo || e === nd;
}
const ky = function (e, t, n) {
  var r = pl(d5),
    i = B(r, 2),
    o = i[0],
    a = i[1],
    l = Sy(),
    s = B(l, 2),
    u = s[0],
    c = s[1];
  function f() {
    a(Zn, !0);
  }
  var v = t ? by : xy;
  return (
    V0(
      function () {
        if (o !== d5 && o !== nd) {
          var y = v.indexOf(o),
            g = v[y + 1],
            C = n(o);
          C === H0
            ? a(g, !0)
            : g &&
              u(function (w) {
                function p() {
                  w.isCanceled() || a(g, !0);
                }
                C === !0 ? p() : Promise.resolve(C).then(p);
              });
        }
      },
      [e, o],
    ),
    d.useEffect(function () {
      return function () {
        c();
      };
    }, []),
    [f, o]
  );
};
function Py(e, t, n, r) {
  var i = r.motionEnter,
    o = i === void 0 ? !0 : i,
    a = r.motionAppear,
    l = a === void 0 ? !0 : a,
    s = r.motionLeave,
    u = s === void 0 ? !0 : s,
    c = r.motionDeadline,
    f = r.motionLeaveImmediately,
    v = r.onAppearPrepare,
    y = r.onEnterPrepare,
    g = r.onLeavePrepare,
    C = r.onAppearStart,
    w = r.onEnterStart,
    p = r.onLeaveStart,
    m = r.onAppearActive,
    h = r.onEnterActive,
    S = r.onLeaveActive,
    x = r.onAppearEnd,
    b = r.onEnterEnd,
    E = r.onLeaveEnd,
    P = r.onVisibleChanged,
    M = pl(),
    I = B(M, 2),
    F = I[0],
    z = I[1],
    j = hy(Vr),
    A = B(j, 2),
    W = A[0],
    O = A[1],
    R = pl(null),
    k = B(R, 2),
    $ = k[0],
    N = k[1],
    D = W(),
    V = d.useRef(!1),
    Z = d.useRef(null);
  function H() {
    return n();
  }
  var Q = d.useRef(!1);
  function ee() {
    O(Vr), N(null, !0);
  }
  var te = on(function (he) {
      var ae = W();
      if (ae !== Vr) {
        var Be = H();
        if (!(he && !he.deadline && he.target !== Be)) {
          var X = Q.current,
            Ce;
          ae === us && X
            ? (Ce = x == null ? void 0 : x(Be, he))
            : ae === cs && X
              ? (Ce = b == null ? void 0 : b(Be, he))
              : ae === fs && X && (Ce = E == null ? void 0 : E(Be, he)),
            X && Ce !== !1 && ee();
        }
      }
    }),
    ve = wy(te),
    Ie = B(ve, 1),
    fe = Ie[0],
    me = function (ae) {
      switch (ae) {
        case us:
          return L(L(L({}, Zn, v), xo, C), bo, m);
        case cs:
          return L(L(L({}, Zn, y), xo, w), bo, h);
        case fs:
          return L(L(L({}, Zn, g), xo, p), bo, S);
        default:
          return {};
      }
    },
    ue = d.useMemo(
      function () {
        return me(D);
      },
      [D],
    ),
    $e = ky(D, !e, function (he) {
      if (he === Zn) {
        var ae = ue[Zn];
        return ae ? ae(H()) : H0;
      }
      if (xe in ue) {
        var Be;
        N(((Be = ue[xe]) === null || Be === void 0 ? void 0 : Be.call(ue, H(), null)) || null);
      }
      return (
        xe === bo &&
          D !== Vr &&
          (fe(H()),
          c > 0 &&
            (clearTimeout(Z.current),
            (Z.current = setTimeout(function () {
              te({ deadline: !0 });
            }, c)))),
        xe === N0 && ee(),
        Ey
      );
    }),
    Pe = B($e, 2),
    Te = Pe[0],
    xe = Pe[1],
    it = B0(xe);
  (Q.current = it),
    V0(
      function () {
        z(t);
        var he = V.current;
        V.current = !0;
        var ae;
        !he && t && l && (ae = us),
          he && t && o && (ae = cs),
          ((he && !t && u) || (!he && f && !t && u)) && (ae = fs);
        var Be = me(ae);
        ae && (e || Be[Zn]) ? (O(ae), Te()) : O(Vr);
      },
      [t],
    ),
    d.useEffect(
      function () {
        ((D === us && !l) || (D === cs && !o) || (D === fs && !u)) && O(Vr);
      },
      [l, o, u],
    ),
    d.useEffect(function () {
      return function () {
        (V.current = !1), clearTimeout(Z.current);
      };
    }, []);
  var pe = d.useRef(!1);
  d.useEffect(
    function () {
      F && (pe.current = !0),
        F !== void 0 && D === Vr && ((pe.current || F) && (P == null || P(F)), (pe.current = !0));
    },
    [F, D],
  );
  var nt = $;
  return ue[Zn] && xe === xo && (nt = T({ transition: 'none' }, nt)), [D, xe, nt, F ?? t];
}
function My(e) {
  var t = e;
  oe(e) === 'object' && (t = e.transitionSupport);
  function n(i, o) {
    return !!(i.motionName && t && o !== !1);
  }
  var r = d.forwardRef(function (i, o) {
    var a = i.visible,
      l = a === void 0 ? !0 : a,
      s = i.removeOnLeave,
      u = s === void 0 ? !0 : s,
      c = i.forceRender,
      f = i.children,
      v = i.motionName,
      y = i.leavedClassName,
      g = i.eventProps,
      C = d.useContext(T0),
      w = C.motion,
      p = n(i, w),
      m = d.useRef(),
      h = d.useRef();
    function S() {
      try {
        return m.current instanceof HTMLElement ? m.current : Ms(h.current);
      } catch {
        return null;
      }
    }
    var x = Py(p, l, S, i),
      b = B(x, 4),
      E = b[0],
      P = b[1],
      M = b[2],
      I = b[3],
      F = d.useRef(I);
    I && (F.current = !0);
    var z = d.useCallback(
        function ($) {
          (m.current = $), Kf(o, $);
        },
        [o],
      ),
      j,
      A = T(T({}, g), {}, { visible: l });
    if (!f) j = null;
    else if (E === Vr)
      I
        ? (j = f(T({}, A), z))
        : !u && F.current && y
          ? (j = f(T(T({}, A), {}, { className: y }), z))
          : c || (!u && !y)
            ? (j = f(T(T({}, A), {}, { style: { display: 'none' } }), z))
            : (j = null);
    else {
      var W;
      P === Zn ? (W = 'prepare') : B0(P) ? (W = 'active') : P === xo && (W = 'start');
      var O = h5(v, ''.concat(E, '-').concat(W));
      j = f(
        T(
          T({}, A),
          {},
          { className: Ee(h5(v, E), L(L({}, O, O && W), v, typeof v == 'string')), style: M },
        ),
        z,
      );
    }
    if (d.isValidElement(j) && Gu(j)) {
      var R = j,
        k = R.ref;
      k || (j = d.cloneElement(j, { ref: z }));
    }
    return d.createElement(py, { ref: h }, j);
  });
  return (r.displayName = 'CSSMotion'), r;
}
const tc = My(D0);
var E2 = 'add',
  k2 = 'keep',
  P2 = 'remove',
  Zc = 'removed';
function Ry(e) {
  var t;
  return (
    e && oe(e) === 'object' && 'key' in e ? (t = e) : (t = { key: e }),
    T(T({}, t), {}, { key: String(t.key) })
  );
}
function M2() {
  var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
  return e.map(Ry);
}
function Ly() {
  var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [],
    t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [],
    n = [],
    r = 0,
    i = t.length,
    o = M2(e),
    a = M2(t);
  o.forEach(function (u) {
    for (var c = !1, f = r; f < i; f += 1) {
      var v = a[f];
      if (v.key === u.key) {
        r < f &&
          ((n = n.concat(
            a.slice(r, f).map(function (y) {
              return T(T({}, y), {}, { status: E2 });
            }),
          )),
          (r = f)),
          n.push(T(T({}, v), {}, { status: k2 })),
          (r += 1),
          (c = !0);
        break;
      }
    }
    c || n.push(T(T({}, u), {}, { status: P2 }));
  }),
    r < i &&
      (n = n.concat(
        a.slice(r).map(function (u) {
          return T(T({}, u), {}, { status: E2 });
        }),
      ));
  var l = {};
  n.forEach(function (u) {
    var c = u.key;
    l[c] = (l[c] || 0) + 1;
  });
  var s = Object.keys(l).filter(function (u) {
    return l[u] > 1;
  });
  return (
    s.forEach(function (u) {
      (n = n.filter(function (c) {
        var f = c.key,
          v = c.status;
        return f !== u || v !== P2;
      })),
        n.forEach(function (c) {
          c.key === u && (c.status = k2);
        });
    }),
    n
  );
}
var Iy = ['component', 'children', 'onVisibleChanged', 'onAllRemoved'],
  _y = ['status'],
  Oy = [
    'eventProps',
    'visible',
    'children',
    'motionName',
    'motionAppear',
    'motionEnter',
    'motionLeave',
    'motionLeaveImmediately',
    'motionDeadline',
    'removeOnLeave',
    'leavedClassName',
    'onAppearPrepare',
    'onAppearStart',
    'onAppearActive',
    'onAppearEnd',
    'onEnterStart',
    'onEnterActive',
    'onEnterEnd',
    'onLeaveStart',
    'onLeaveActive',
    'onLeaveEnd',
  ];
function $y(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : tc,
    n = (function (r) {
      vi(o, r);
      var i = mi(o);
      function o() {
        var a;
        Ft(this, o);
        for (var l = arguments.length, s = new Array(l), u = 0; u < l; u++) s[u] = arguments[u];
        return (
          (a = i.call.apply(i, [this].concat(s))),
          L(le(a), 'state', { keyEntities: [] }),
          L(le(a), 'removeKey', function (c) {
            a.setState(
              function (f) {
                var v = f.keyEntities.map(function (y) {
                  return y.key !== c ? y : T(T({}, y), {}, { status: Zc });
                });
                return { keyEntities: v };
              },
              function () {
                var f = a.state.keyEntities,
                  v = f.filter(function (y) {
                    var g = y.status;
                    return g !== Zc;
                  }).length;
                v === 0 && a.props.onAllRemoved && a.props.onAllRemoved();
              },
            );
          }),
          a
        );
      }
      return (
        jt(
          o,
          [
            {
              key: 'render',
              value: function () {
                var l = this,
                  s = this.state.keyEntities,
                  u = this.props,
                  c = u.component,
                  f = u.children,
                  v = u.onVisibleChanged;
                u.onAllRemoved;
                var y = ze(u, Iy),
                  g = c || d.Fragment,
                  C = {};
                return (
                  Oy.forEach(function (w) {
                    (C[w] = y[w]), delete y[w];
                  }),
                  delete y.keys,
                  d.createElement(
                    g,
                    y,
                    s.map(function (w, p) {
                      var m = w.status,
                        h = ze(w, _y),
                        S = m === E2 || m === k2;
                      return d.createElement(
                        t,
                        ye({}, C, {
                          key: h.key,
                          visible: S,
                          eventProps: h,
                          onVisibleChanged: function (b) {
                            v == null || v(b, { key: h.key }), b || l.removeKey(h.key);
                          },
                        }),
                        function (x, b) {
                          return f(T(T({}, x), {}, { index: p }), b);
                        },
                      );
                    }),
                  )
                );
              },
            },
          ],
          [
            {
              key: 'getDerivedStateFromProps',
              value: function (l, s) {
                var u = l.keys,
                  c = s.keyEntities,
                  f = M2(u),
                  v = Ly(c, f);
                return {
                  keyEntities: v.filter(function (y) {
                    var g = c.find(function (C) {
                      var w = C.key;
                      return y.key === w;
                    });
                    return !(g && g.status === Zc && y.status === P2);
                  }),
                };
              },
            },
          ],
        ),
        o
      );
    })(d.Component);
  return L(n, 'defaultProps', { component: 'div' }), n;
}
$y(D0);
function Ty(e) {
  const { children: t } = e,
    [, n] = Xo(),
    { motion: r } = n,
    i = d.useRef(!1);
  return (i.current = i.current || r === !1), i.current ? d.createElement(my, { motion: r }, t) : t;
}
const Ny = () => null;
var Fy = function (e, t) {
  var n = {};
  for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
  if (e != null && typeof Object.getOwnPropertySymbols == 'function')
    for (var i = 0, r = Object.getOwnPropertySymbols(e); i < r.length; i++)
      t.indexOf(r[i]) < 0 &&
        Object.prototype.propertyIsEnumerable.call(e, r[i]) &&
        (n[r[i]] = e[r[i]]);
  return n;
};
const jy = [
  'getTargetContainer',
  'getPopupContainer',
  'renderEmpty',
  'input',
  'pagination',
  'form',
  'select',
  'button',
];
let U0;
function Ay() {
  return U0 || du;
}
function zy(e) {
  return Object.keys(e).some((t) => t.endsWith('Color'));
}
const Dy = (e) => {
    const { prefixCls: t, iconPrefixCls: n, theme: r, holderRender: i } = e;
    t !== void 0 && (U0 = t), r && zy(r) && A9(Ay(), r);
  },
  Vy = (e) => {
    const {
        children: t,
        csp: n,
        autoInsertSpaceInButton: r,
        alert: i,
        anchor: o,
        form: a,
        locale: l,
        componentSize: s,
        direction: u,
        space: c,
        virtual: f,
        dropdownMatchSelectWidth: v,
        popupMatchSelectWidth: y,
        popupOverflow: g,
        legacyLocale: C,
        parentContext: w,
        iconPrefixCls: p,
        theme: m,
        componentDisabled: h,
        segmented: S,
        statistic: x,
        spin: b,
        calendar: E,
        carousel: P,
        cascader: M,
        collapse: I,
        typography: F,
        checkbox: z,
        descriptions: j,
        divider: A,
        drawer: W,
        skeleton: O,
        steps: R,
        image: k,
        layout: $,
        list: N,
        mentions: D,
        modal: V,
        progress: Z,
        result: H,
        slider: Q,
        breadcrumb: ee,
        menu: te,
        pagination: ve,
        input: Ie,
        textArea: fe,
        empty: me,
        badge: ue,
        radio: $e,
        rate: Pe,
        switch: Te,
        transfer: xe,
        avatar: it,
        message: pe,
        tag: nt,
        table: he,
        card: ae,
        tabs: Be,
        timeline: X,
        timePicker: Ce,
        upload: Ue,
        notification: ke,
        tree: xt,
        colorPicker: bt,
        datePicker: Mt,
        rangePicker: Et,
        flex: gt,
        wave: Qe,
        dropdown: We,
        warning: Xe,
        tour: Ne,
        floatButtonGroup: Ke,
        variant: ut,
        inputNumber: At,
        treeSelect: Dn,
      } = e,
      Sn = d.useCallback(
        (de, De) => {
          const { prefixCls: Fe } = e;
          if (De) return De;
          const Lt = Fe || w.getPrefixCls('');
          return de ? `${Lt}-${de}` : Lt;
        },
        [w.getPrefixCls, e.prefixCls],
      ),
      Rt = p || w.iconPrefixCls || b0,
      Kt = n || w.csp;
    O0(Rt, Kt);
    const ct = dy(m, w.theme, { prefixCls: Sn('') }),
      Ye = {
        csp: Kt,
        autoInsertSpaceInButton: r,
        alert: i,
        anchor: o,
        locale: l || C,
        direction: u,
        space: c,
        virtual: f,
        popupMatchSelectWidth: y ?? v,
        popupOverflow: g,
        getPrefixCls: Sn,
        iconPrefixCls: Rt,
        theme: ct,
        segmented: S,
        statistic: x,
        spin: b,
        calendar: E,
        carousel: P,
        cascader: M,
        collapse: I,
        typography: F,
        checkbox: z,
        descriptions: j,
        divider: A,
        drawer: W,
        skeleton: O,
        steps: R,
        image: k,
        input: Ie,
        textArea: fe,
        layout: $,
        list: N,
        mentions: D,
        modal: V,
        progress: Z,
        result: H,
        slider: Q,
        breadcrumb: ee,
        menu: te,
        pagination: ve,
        empty: me,
        badge: ue,
        radio: $e,
        rate: Pe,
        switch: Te,
        transfer: xe,
        avatar: it,
        message: pe,
        tag: nt,
        table: he,
        card: ae,
        tabs: Be,
        timeline: X,
        timePicker: Ce,
        upload: Ue,
        notification: ke,
        tree: xt,
        colorPicker: bt,
        datePicker: Mt,
        rangePicker: Et,
        flex: gt,
        wave: Qe,
        dropdown: We,
        warning: Xe,
        tour: Ne,
        floatButtonGroup: Ke,
        variant: ut,
        inputNumber: At,
        treeSelect: Dn,
      },
      ot = Object.assign({}, w);
    Object.keys(Ye).forEach((de) => {
      Ye[de] !== void 0 && (ot[de] = Ye[de]);
    }),
      jy.forEach((de) => {
        const De = e[de];
        De && (ot[de] = De);
      }),
      typeof r < 'u' && (ot.button = Object.assign({ autoInsertSpace: r }, ot.button));
    const Me = Ku(
        () => ot,
        ot,
        (de, De) => {
          const Fe = Object.keys(de),
            Lt = Object.keys(De);
          return Fe.length !== Lt.length || Fe.some((xn) => de[xn] !== De[xn]);
        },
      ),
      ne = d.useMemo(() => ({ prefixCls: Rt, csp: Kt }), [Rt, Kt]);
    let K = d.createElement(
      d.Fragment,
      null,
      d.createElement(Ny, { dropdownMatchSelectWidth: v }),
      t,
    );
    const re = d.useMemo(() => {
      var de, De, Fe, Lt;
      return So(
        ((de = ec.Form) === null || de === void 0 ? void 0 : de.defaultValidateMessages) || {},
        ((Fe = (De = Me.locale) === null || De === void 0 ? void 0 : De.Form) === null ||
        Fe === void 0
          ? void 0
          : Fe.defaultValidateMessages) || {},
        ((Lt = Me.form) === null || Lt === void 0 ? void 0 : Lt.validateMessages) || {},
        (a == null ? void 0 : a.validateMessages) || {},
      );
    }, [Me, a == null ? void 0 : a.validateMessages]);
    Object.keys(re).length > 0 && (K = d.createElement(t9.Provider, { value: re }, K)),
      l && (K = d.createElement(l9, { locale: l, _ANT_MARK__: a9 }, K)),
      (Rt || Kt) && (K = d.createElement(td.Provider, { value: ne }, K)),
      s && (K = d.createElement(D9, { size: s }, K)),
      (K = d.createElement(Ty, null, K));
    const we = d.useMemo(() => {
      const de = ct || {},
        { algorithm: De, token: Fe, components: Lt, cssVar: xn } = de,
        bn = Fy(de, ['algorithm', 'token', 'components', 'cssVar']),
        nr = De && (!Array.isArray(De) || De.length > 0) ? t2(De) : S0,
        En = {};
      Object.entries(Lt || {}).forEach((kn) => {
        let [Zt, Pn] = kn;
        const ft = Object.assign({}, Pn);
        'algorithm' in ft &&
          (ft.algorithm === !0
            ? (ft.theme = nr)
            : (Array.isArray(ft.algorithm) || typeof ft.algorithm == 'function') &&
              (ft.theme = t2(ft.algorithm)),
          delete ft.algorithm),
          (En[Zt] = ft);
      });
      const rr = Object.assign(Object.assign({}, vl), Fe);
      return Object.assign(Object.assign({}, bn), {
        theme: nr,
        token: rr,
        components: En,
        override: Object.assign({ override: rr }, En),
        cssVar: xn,
      });
    }, [ct]);
    return (
      m && (K = d.createElement(x0.Provider, { value: we }, K)),
      Me.warning && (K = d.createElement(e9.Provider, { value: Me.warning }, K)),
      h !== void 0 && (K = d.createElement(z9, { disabled: h }, K)),
      d.createElement(Tr.Provider, { value: Me }, K)
    );
  },
  Ll = (e) => {
    const t = d.useContext(Tr),
      n = d.useContext(h0);
    return d.createElement(Vy, Object.assign({ parentContext: t, legacyLocale: n }, e));
  };
Ll.ConfigContext = Tr;
Ll.SizeContext = ml;
Ll.config = Dy;
Ll.useConfig = V9;
Object.defineProperty(Ll, 'SizeContext', { get: () => ml });
function W0(e) {
  var t;
  return e == null || (t = e.getRootNode) === null || t === void 0 ? void 0 : t.call(e);
}
function Hy(e) {
  return W0(e) instanceof ShadowRoot;
}
function mu(e) {
  return Hy(e) ? W0(e) : null;
}
function By(e) {
  return e.replace(/-(.)/g, function (t, n) {
    return n.toUpperCase();
  });
}
function Uy(e, t) {
  Xt(e, '[@ant-design/icons] '.concat(t));
}
function g5(e) {
  return (
    oe(e) === 'object' &&
    typeof e.name == 'string' &&
    typeof e.theme == 'string' &&
    (oe(e.icon) === 'object' || typeof e.icon == 'function')
  );
}
function y5() {
  var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  return Object.keys(e).reduce(function (t, n) {
    var r = e[n];
    switch (n) {
      case 'class':
        (t.className = r), delete t.class;
        break;
      default:
        delete t[n], (t[By(n)] = r);
    }
    return t;
  }, {});
}
function R2(e, t, n) {
  return n
    ? mt.createElement(
        e.tag,
        T(T({ key: t }, y5(e.attrs)), n),
        (e.children || []).map(function (r, i) {
          return R2(r, ''.concat(t, '-').concat(e.tag, '-').concat(i));
        }),
      )
    : mt.createElement(
        e.tag,
        T({ key: t }, y5(e.attrs)),
        (e.children || []).map(function (r, i) {
          return R2(r, ''.concat(t, '-').concat(e.tag, '-').concat(i));
        }),
      );
}
function K0(e) {
  return dl(e)[0];
}
function Z0(e) {
  return e ? (Array.isArray(e) ? e : [e]) : [];
}
var Wy = `
.anticon {
  display: inline-flex;
  align-items: center;
  color: inherit;
  font-style: normal;
  line-height: 0;
  text-align: center;
  text-transform: none;
  vertical-align: -0.125em;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.anticon > * {
  line-height: 1;
}

.anticon svg {
  display: inline-block;
}

.anticon::before {
  display: none;
}

.anticon .anticon-icon {
  display: block;
}

.anticon[tabindex] {
  cursor: pointer;
}

.anticon-spin::before,
.anticon-spin {
  display: inline-block;
  -webkit-animation: loadingCircle 1s infinite linear;
  animation: loadingCircle 1s infinite linear;
}

@-webkit-keyframes loadingCircle {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@keyframes loadingCircle {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
`,
  Ky = function (t) {
    var n = d.useContext(td),
      r = n.csp,
      i = n.prefixCls,
      o = Wy;
    i && (o = o.replace(/anticon/g, i)),
      d.useEffect(function () {
        var a = t.current,
          l = mu(a);
        Rr(o, '@ant-design-icons', { prepend: !0, csp: r, attachTo: l });
      }, []);
  },
  Zy = ['icon', 'className', 'onClick', 'style', 'primaryColor', 'secondaryColor'],
  Fa = { primaryColor: '#333', secondaryColor: '#E6E6E6', calculated: !1 };
function Gy(e) {
  var t = e.primaryColor,
    n = e.secondaryColor;
  (Fa.primaryColor = t), (Fa.secondaryColor = n || K0(t)), (Fa.calculated = !!n);
}
function qy() {
  return T({}, Fa);
}
var Yo = function (t) {
  var n = t.icon,
    r = t.className,
    i = t.onClick,
    o = t.style,
    a = t.primaryColor,
    l = t.secondaryColor,
    s = ze(t, Zy),
    u = d.useRef(),
    c = Fa;
  if (
    (a && (c = { primaryColor: a, secondaryColor: l || K0(a) }),
    Ky(u),
    Uy(g5(n), 'icon should be icon definiton, but got '.concat(n)),
    !g5(n))
  )
    return null;
  var f = n;
  return (
    f &&
      typeof f.icon == 'function' &&
      (f = T(T({}, f), {}, { icon: f.icon(c.primaryColor, c.secondaryColor) })),
    R2(
      f.icon,
      'svg-'.concat(f.name),
      T(
        T(
          {
            className: r,
            onClick: i,
            style: o,
            'data-icon': f.name,
            width: '1em',
            height: '1em',
            fill: 'currentColor',
            'aria-hidden': 'true',
          },
          s,
        ),
        {},
        { ref: u },
      ),
    )
  );
};
Yo.displayName = 'IconReact';
Yo.getTwoToneColors = qy;
Yo.setTwoToneColors = Gy;
function G0(e) {
  var t = Z0(e),
    n = B(t, 2),
    r = n[0],
    i = n[1];
  return Yo.setTwoToneColors({ primaryColor: r, secondaryColor: i });
}
function Qy() {
  var e = Yo.getTwoToneColors();
  return e.calculated ? [e.primaryColor, e.secondaryColor] : e.primaryColor;
}
var Xy = ['className', 'icon', 'spin', 'rotate', 'tabIndex', 'onClick', 'twoToneColor'];
G0(fu.primary);
var nc = d.forwardRef(function (e, t) {
  var n = e.className,
    r = e.icon,
    i = e.spin,
    o = e.rotate,
    a = e.tabIndex,
    l = e.onClick,
    s = e.twoToneColor,
    u = ze(e, Xy),
    c = d.useContext(td),
    f = c.prefixCls,
    v = f === void 0 ? 'anticon' : f,
    y = c.rootClassName,
    g = Ee(
      y,
      v,
      L(
        L({}, ''.concat(v, '-').concat(r.name), !!r.name),
        ''.concat(v, '-spin'),
        !!i || r.name === 'loading',
      ),
      n,
    ),
    C = a;
  C === void 0 && l && (C = -1);
  var w = o
      ? { msTransform: 'rotate('.concat(o, 'deg)'), transform: 'rotate('.concat(o, 'deg)') }
      : void 0,
    p = Z0(s),
    m = B(p, 2),
    h = m[0],
    S = m[1];
  return d.createElement(
    'span',
    ye({ role: 'img', 'aria-label': r.name }, u, { ref: t, tabIndex: C, onClick: l, className: g }),
    d.createElement(Yo, { icon: r, primaryColor: h, secondaryColor: S, style: w }),
  );
});
nc.displayName = 'AntdIcon';
nc.getTwoToneColor = Qy;
nc.setTwoToneColor = G0;
function Yy(e) {
  return e && mt.isValidElement(e) && e.type === mt.Fragment;
}
const Jy = (e, t, n) =>
  mt.isValidElement(e) ? mt.cloneElement(e, typeof n == 'function' ? n(e.props || {}) : n) : t;
function rc(e, t) {
  return Jy(e, e, t);
}
const eC = (e) => {
  const [, , , , t] = Xo();
  return t ? `${e}-css-var` : '';
};
var Y = {
  MAC_ENTER: 3,
  BACKSPACE: 8,
  TAB: 9,
  NUM_CENTER: 12,
  ENTER: 13,
  SHIFT: 16,
  CTRL: 17,
  ALT: 18,
  PAUSE: 19,
  CAPS_LOCK: 20,
  ESC: 27,
  SPACE: 32,
  PAGE_UP: 33,
  PAGE_DOWN: 34,
  END: 35,
  HOME: 36,
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
  PRINT_SCREEN: 44,
  INSERT: 45,
  DELETE: 46,
  ZERO: 48,
  ONE: 49,
  TWO: 50,
  THREE: 51,
  FOUR: 52,
  FIVE: 53,
  SIX: 54,
  SEVEN: 55,
  EIGHT: 56,
  NINE: 57,
  QUESTION_MARK: 63,
  A: 65,
  B: 66,
  C: 67,
  D: 68,
  E: 69,
  F: 70,
  G: 71,
  H: 72,
  I: 73,
  J: 74,
  K: 75,
  L: 76,
  M: 77,
  N: 78,
  O: 79,
  P: 80,
  Q: 81,
  R: 82,
  S: 83,
  T: 84,
  U: 85,
  V: 86,
  W: 87,
  X: 88,
  Y: 89,
  Z: 90,
  META: 91,
  WIN_KEY_RIGHT: 92,
  CONTEXT_MENU: 93,
  NUM_ZERO: 96,
  NUM_ONE: 97,
  NUM_TWO: 98,
  NUM_THREE: 99,
  NUM_FOUR: 100,
  NUM_FIVE: 101,
  NUM_SIX: 102,
  NUM_SEVEN: 103,
  NUM_EIGHT: 104,
  NUM_NINE: 105,
  NUM_MULTIPLY: 106,
  NUM_PLUS: 107,
  NUM_MINUS: 109,
  NUM_PERIOD: 110,
  NUM_DIVISION: 111,
  F1: 112,
  F2: 113,
  F3: 114,
  F4: 115,
  F5: 116,
  F6: 117,
  F7: 118,
  F8: 119,
  F9: 120,
  F10: 121,
  F11: 122,
  F12: 123,
  NUMLOCK: 144,
  SEMICOLON: 186,
  DASH: 189,
  EQUALS: 187,
  COMMA: 188,
  PERIOD: 190,
  SLASH: 191,
  APOSTROPHE: 192,
  SINGLE_QUOTE: 222,
  OPEN_SQUARE_BRACKET: 219,
  BACKSLASH: 220,
  CLOSE_SQUARE_BRACKET: 221,
  WIN_KEY: 224,
  MAC_FF_META: 224,
  WIN_IME: 229,
  isTextModifyingKeyEvent: function (t) {
    var n = t.keyCode;
    if ((t.altKey && !t.ctrlKey) || t.metaKey || (n >= Y.F1 && n <= Y.F12)) return !1;
    switch (n) {
      case Y.ALT:
      case Y.CAPS_LOCK:
      case Y.CONTEXT_MENU:
      case Y.CTRL:
      case Y.DOWN:
      case Y.END:
      case Y.ESC:
      case Y.HOME:
      case Y.INSERT:
      case Y.LEFT:
      case Y.MAC_FF_META:
      case Y.META:
      case Y.NUMLOCK:
      case Y.NUM_CENTER:
      case Y.PAGE_DOWN:
      case Y.PAGE_UP:
      case Y.PAUSE:
      case Y.PRINT_SCREEN:
      case Y.RIGHT:
      case Y.SHIFT:
      case Y.UP:
      case Y.WIN_KEY:
      case Y.WIN_KEY_RIGHT:
        return !1;
      default:
        return !0;
    }
  },
  isCharacterKey: function (t) {
    if (
      (t >= Y.ZERO && t <= Y.NINE) ||
      (t >= Y.NUM_ZERO && t <= Y.NUM_MULTIPLY) ||
      (t >= Y.A && t <= Y.Z) ||
      (window.navigator.userAgent.indexOf('WebKit') !== -1 && t === 0)
    )
      return !0;
    switch (t) {
      case Y.SPACE:
      case Y.QUESTION_MARK:
      case Y.NUM_PLUS:
      case Y.NUM_MINUS:
      case Y.NUM_PERIOD:
      case Y.NUM_DIVISION:
      case Y.SEMICOLON:
      case Y.DASH:
      case Y.EQUALS:
      case Y.COMMA:
      case Y.PERIOD:
      case Y.SLASH:
      case Y.APOSTROPHE:
      case Y.SINGLE_QUOTE:
      case Y.OPEN_SQUARE_BRACKET:
      case Y.BACKSLASH:
      case Y.CLOSE_SQUARE_BRACKET:
        return !0;
      default:
        return !1;
    }
  },
};
const q0 = mt.createContext(void 0),
  Ji = 100,
  Q0 = { Modal: Ji, Drawer: Ji, Popover: Ji, Popconfirm: Ji, Tooltip: Ji, Tour: Ji },
  tC = { SelectLike: 50, Dropdown: 50, DatePicker: 50, Menu: 50, ImagePreview: 1 };
function nC(e) {
  return e in Q0;
}
function X0(e, t) {
  const [, n] = Xo(),
    r = mt.useContext(q0),
    i = nC(e);
  let o;
  if (t !== void 0) o = [t, t];
  else {
    let a = r ?? 0;
    i ? (a += (r ? 0 : n.zIndexPopupBase) + Q0[e]) : (a += tC[e]), (o = [r === void 0 ? t : a, a]);
  }
  return o;
}
function er() {
  er = function () {
    return t;
  };
  var e,
    t = {},
    n = Object.prototype,
    r = n.hasOwnProperty,
    i =
      Object.defineProperty ||
      function (O, R, k) {
        O[R] = k.value;
      },
    o = typeof Symbol == 'function' ? Symbol : {},
    a = o.iterator || '@@iterator',
    l = o.asyncIterator || '@@asyncIterator',
    s = o.toStringTag || '@@toStringTag';
  function u(O, R, k) {
    return (
      Object.defineProperty(O, R, { value: k, enumerable: !0, configurable: !0, writable: !0 }),
      O[R]
    );
  }
  try {
    u({}, '');
  } catch {
    u = function (k, $, N) {
      return (k[$] = N);
    };
  }
  function c(O, R, k, $) {
    var N = R && R.prototype instanceof p ? R : p,
      D = Object.create(N.prototype),
      V = new A($ || []);
    return i(D, '_invoke', { value: I(O, k, V) }), D;
  }
  function f(O, R, k) {
    try {
      return { type: 'normal', arg: O.call(R, k) };
    } catch ($) {
      return { type: 'throw', arg: $ };
    }
  }
  t.wrap = c;
  var v = 'suspendedStart',
    y = 'suspendedYield',
    g = 'executing',
    C = 'completed',
    w = {};
  function p() {}
  function m() {}
  function h() {}
  var S = {};
  u(S, a, function () {
    return this;
  });
  var x = Object.getPrototypeOf,
    b = x && x(x(W([])));
  b && b !== n && r.call(b, a) && (S = b);
  var E = (h.prototype = p.prototype = Object.create(S));
  function P(O) {
    ['next', 'throw', 'return'].forEach(function (R) {
      u(O, R, function (k) {
        return this._invoke(R, k);
      });
    });
  }
  function M(O, R) {
    function k(N, D, V, Z) {
      var H = f(O[N], O, D);
      if (H.type !== 'throw') {
        var Q = H.arg,
          ee = Q.value;
        return ee && oe(ee) == 'object' && r.call(ee, '__await')
          ? R.resolve(ee.__await).then(
              function (te) {
                k('next', te, V, Z);
              },
              function (te) {
                k('throw', te, V, Z);
              },
            )
          : R.resolve(ee).then(
              function (te) {
                (Q.value = te), V(Q);
              },
              function (te) {
                return k('throw', te, V, Z);
              },
            );
      }
      Z(H.arg);
    }
    var $;
    i(this, '_invoke', {
      value: function (D, V) {
        function Z() {
          return new R(function (H, Q) {
            k(D, V, H, Q);
          });
        }
        return ($ = $ ? $.then(Z, Z) : Z());
      },
    });
  }
  function I(O, R, k) {
    var $ = v;
    return function (N, D) {
      if ($ === g) throw Error('Generator is already running');
      if ($ === C) {
        if (N === 'throw') throw D;
        return { value: e, done: !0 };
      }
      for (k.method = N, k.arg = D; ; ) {
        var V = k.delegate;
        if (V) {
          var Z = F(V, k);
          if (Z) {
            if (Z === w) continue;
            return Z;
          }
        }
        if (k.method === 'next') k.sent = k._sent = k.arg;
        else if (k.method === 'throw') {
          if ($ === v) throw (($ = C), k.arg);
          k.dispatchException(k.arg);
        } else k.method === 'return' && k.abrupt('return', k.arg);
        $ = g;
        var H = f(O, R, k);
        if (H.type === 'normal') {
          if ((($ = k.done ? C : y), H.arg === w)) continue;
          return { value: H.arg, done: k.done };
        }
        H.type === 'throw' && (($ = C), (k.method = 'throw'), (k.arg = H.arg));
      }
    };
  }
  function F(O, R) {
    var k = R.method,
      $ = O.iterator[k];
    if ($ === e)
      return (
        (R.delegate = null),
        (k === 'throw' &&
          O.iterator.return &&
          ((R.method = 'return'), (R.arg = e), F(O, R), R.method === 'throw')) ||
          (k !== 'return' &&
            ((R.method = 'throw'),
            (R.arg = new TypeError("The iterator does not provide a '" + k + "' method")))),
        w
      );
    var N = f($, O.iterator, R.arg);
    if (N.type === 'throw') return (R.method = 'throw'), (R.arg = N.arg), (R.delegate = null), w;
    var D = N.arg;
    return D
      ? D.done
        ? ((R[O.resultName] = D.value),
          (R.next = O.nextLoc),
          R.method !== 'return' && ((R.method = 'next'), (R.arg = e)),
          (R.delegate = null),
          w)
        : D
      : ((R.method = 'throw'),
        (R.arg = new TypeError('iterator result is not an object')),
        (R.delegate = null),
        w);
  }
  function z(O) {
    var R = { tryLoc: O[0] };
    1 in O && (R.catchLoc = O[1]),
      2 in O && ((R.finallyLoc = O[2]), (R.afterLoc = O[3])),
      this.tryEntries.push(R);
  }
  function j(O) {
    var R = O.completion || {};
    (R.type = 'normal'), delete R.arg, (O.completion = R);
  }
  function A(O) {
    (this.tryEntries = [{ tryLoc: 'root' }]), O.forEach(z, this), this.reset(!0);
  }
  function W(O) {
    if (O || O === '') {
      var R = O[a];
      if (R) return R.call(O);
      if (typeof O.next == 'function') return O;
      if (!isNaN(O.length)) {
        var k = -1,
          $ = function N() {
            for (; ++k < O.length; ) if (r.call(O, k)) return (N.value = O[k]), (N.done = !1), N;
            return (N.value = e), (N.done = !0), N;
          };
        return ($.next = $);
      }
    }
    throw new TypeError(oe(O) + ' is not iterable');
  }
  return (
    (m.prototype = h),
    i(E, 'constructor', { value: h, configurable: !0 }),
    i(h, 'constructor', { value: m, configurable: !0 }),
    (m.displayName = u(h, s, 'GeneratorFunction')),
    (t.isGeneratorFunction = function (O) {
      var R = typeof O == 'function' && O.constructor;
      return !!R && (R === m || (R.displayName || R.name) === 'GeneratorFunction');
    }),
    (t.mark = function (O) {
      return (
        Object.setPrototypeOf
          ? Object.setPrototypeOf(O, h)
          : ((O.__proto__ = h), u(O, s, 'GeneratorFunction')),
        (O.prototype = Object.create(E)),
        O
      );
    }),
    (t.awrap = function (O) {
      return { __await: O };
    }),
    P(M.prototype),
    u(M.prototype, l, function () {
      return this;
    }),
    (t.AsyncIterator = M),
    (t.async = function (O, R, k, $, N) {
      N === void 0 && (N = Promise);
      var D = new M(c(O, R, k, $), N);
      return t.isGeneratorFunction(R)
        ? D
        : D.next().then(function (V) {
            return V.done ? V.value : D.next();
          });
    }),
    P(E),
    u(E, s, 'Generator'),
    u(E, a, function () {
      return this;
    }),
    u(E, 'toString', function () {
      return '[object Generator]';
    }),
    (t.keys = function (O) {
      var R = Object(O),
        k = [];
      for (var $ in R) k.push($);
      return (
        k.reverse(),
        function N() {
          for (; k.length; ) {
            var D = k.pop();
            if (D in R) return (N.value = D), (N.done = !1), N;
          }
          return (N.done = !0), N;
        }
      );
    }),
    (t.values = W),
    (A.prototype = {
      constructor: A,
      reset: function (R) {
        if (
          ((this.prev = 0),
          (this.next = 0),
          (this.sent = this._sent = e),
          (this.done = !1),
          (this.delegate = null),
          (this.method = 'next'),
          (this.arg = e),
          this.tryEntries.forEach(j),
          !R)
        )
          for (var k in this)
            k.charAt(0) === 't' && r.call(this, k) && !isNaN(+k.slice(1)) && (this[k] = e);
      },
      stop: function () {
        this.done = !0;
        var R = this.tryEntries[0].completion;
        if (R.type === 'throw') throw R.arg;
        return this.rval;
      },
      dispatchException: function (R) {
        if (this.done) throw R;
        var k = this;
        function $(Q, ee) {
          return (
            (V.type = 'throw'),
            (V.arg = R),
            (k.next = Q),
            ee && ((k.method = 'next'), (k.arg = e)),
            !!ee
          );
        }
        for (var N = this.tryEntries.length - 1; N >= 0; --N) {
          var D = this.tryEntries[N],
            V = D.completion;
          if (D.tryLoc === 'root') return $('end');
          if (D.tryLoc <= this.prev) {
            var Z = r.call(D, 'catchLoc'),
              H = r.call(D, 'finallyLoc');
            if (Z && H) {
              if (this.prev < D.catchLoc) return $(D.catchLoc, !0);
              if (this.prev < D.finallyLoc) return $(D.finallyLoc);
            } else if (Z) {
              if (this.prev < D.catchLoc) return $(D.catchLoc, !0);
            } else {
              if (!H) throw Error('try statement without catch or finally');
              if (this.prev < D.finallyLoc) return $(D.finallyLoc);
            }
          }
        }
      },
      abrupt: function (R, k) {
        for (var $ = this.tryEntries.length - 1; $ >= 0; --$) {
          var N = this.tryEntries[$];
          if (N.tryLoc <= this.prev && r.call(N, 'finallyLoc') && this.prev < N.finallyLoc) {
            var D = N;
            break;
          }
        }
        D &&
          (R === 'break' || R === 'continue') &&
          D.tryLoc <= k &&
          k <= D.finallyLoc &&
          (D = null);
        var V = D ? D.completion : {};
        return (
          (V.type = R),
          (V.arg = k),
          D ? ((this.method = 'next'), (this.next = D.finallyLoc), w) : this.complete(V)
        );
      },
      complete: function (R, k) {
        if (R.type === 'throw') throw R.arg;
        return (
          R.type === 'break' || R.type === 'continue'
            ? (this.next = R.arg)
            : R.type === 'return'
              ? ((this.rval = this.arg = R.arg), (this.method = 'return'), (this.next = 'end'))
              : R.type === 'normal' && k && (this.next = k),
          w
        );
      },
      finish: function (R) {
        for (var k = this.tryEntries.length - 1; k >= 0; --k) {
          var $ = this.tryEntries[k];
          if ($.finallyLoc === R) return this.complete($.completion, $.afterLoc), j($), w;
        }
      },
      catch: function (R) {
        for (var k = this.tryEntries.length - 1; k >= 0; --k) {
          var $ = this.tryEntries[k];
          if ($.tryLoc === R) {
            var N = $.completion;
            if (N.type === 'throw') {
              var D = N.arg;
              j($);
            }
            return D;
          }
        }
        throw Error('illegal catch attempt');
      },
      delegateYield: function (R, k, $) {
        return (
          (this.delegate = { iterator: W(R), resultName: k, nextLoc: $ }),
          this.method === 'next' && (this.arg = e),
          w
        );
      },
    }),
    t
  );
}
function C5(e, t, n, r, i, o, a) {
  try {
    var l = e[o](a),
      s = l.value;
  } catch (u) {
    return void n(u);
  }
  l.done ? t(s) : Promise.resolve(s).then(r, i);
}
function Il(e) {
  return function () {
    var t = this,
      n = arguments;
    return new Promise(function (r, i) {
      var o = e.apply(t, n);
      function a(s) {
        C5(o, r, i, a, l, 'next', s);
      }
      function l(s) {
        C5(o, r, i, a, l, 'throw', s);
      }
      a(void 0);
    });
  };
}
const Gc = () => ({ height: 0, opacity: 0 }),
  w5 = (e) => {
    const { scrollHeight: t } = e;
    return { height: t, opacity: 1 };
  },
  rC = (e) => ({ height: e ? e.offsetHeight : 0 }),
  qc = (e, t) => (t == null ? void 0 : t.deadline) === !0 || t.propertyName === 'height',
  iC = function () {
    return {
      motionName: `${arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : du}-motion-collapse`,
      onAppearStart: Gc,
      onEnterStart: Gc,
      onAppearActive: w5,
      onEnterActive: w5,
      onLeaveStart: rC,
      onLeaveActive: Gc,
      onAppearEnd: qc,
      onEnterEnd: qc,
      onLeaveEnd: qc,
      motionDeadline: 500,
    };
  },
  oC = (e, t, n) => (n !== void 0 ? n : `${e}-${t}`),
  Y0 = function (e) {
    if (!e) return !1;
    if (e instanceof Element) {
      if (e.offsetParent) return !0;
      if (e.getBBox) {
        var t = e.getBBox(),
          n = t.width,
          r = t.height;
        if (n || r) return !0;
      }
      if (e.getBoundingClientRect) {
        var i = e.getBoundingClientRect(),
          o = i.width,
          a = i.height;
        if (o || a) return !0;
      }
    }
    return !1;
  },
  aC = d.createContext(null),
  lC = (e) => {
    let { children: t } = e;
    return d.createElement(aC.Provider, { value: null }, t);
  };
var J0 = d.createContext(null),
  S5 = [];
function sC(e, t) {
  var n = d.useState(function () {
      if (!yn()) return null;
      var g = document.createElement('div');
      return g;
    }),
    r = B(n, 1),
    i = r[0],
    o = d.useRef(!1),
    a = d.useContext(J0),
    l = d.useState(S5),
    s = B(l, 2),
    u = s[0],
    c = s[1],
    f =
      a ||
      (o.current
        ? void 0
        : function (g) {
            c(function (C) {
              var w = [g].concat(J(C));
              return w;
            });
          });
  function v() {
    i.parentElement || document.body.appendChild(i), (o.current = !0);
  }
  function y() {
    var g;
    (g = i.parentElement) === null || g === void 0 || g.removeChild(i), (o.current = !1);
  }
  return (
    Bt(
      function () {
        return e ? (a ? a(v) : v()) : y(), y;
      },
      [e],
    ),
    Bt(
      function () {
        u.length &&
          (u.forEach(function (g) {
            return g();
          }),
          c(S5));
      },
      [u],
    ),
    [i, f]
  );
}
function uC(e) {
  var t = 'rc-scrollbar-measure-'.concat(Math.random().toString(36).substring(7)),
    n = document.createElement('div');
  n.id = t;
  var r = n.style;
  (r.position = 'absolute'),
    (r.left = '0'),
    (r.top = '0'),
    (r.width = '100px'),
    (r.height = '100px'),
    (r.overflow = 'scroll');
  var i, o;
  if (e) {
    var a = getComputedStyle(e);
    (r.scrollbarColor = a.scrollbarColor), (r.scrollbarWidth = a.scrollbarWidth);
    var l = getComputedStyle(e, '::-webkit-scrollbar'),
      s = parseInt(l.width, 10),
      u = parseInt(l.height, 10);
    try {
      var c = s ? 'width: '.concat(l.width, ';') : '',
        f = u ? 'height: '.concat(l.height, ';') : '';
      Rr(
        `
#`
          .concat(
            t,
            `::-webkit-scrollbar {
`,
          )
          .concat(
            c,
            `
`,
          )
          .concat(
            f,
            `
}`,
          ),
        t,
      );
    } catch (g) {
      console.error(g), (i = s), (o = u);
    }
  }
  document.body.appendChild(n);
  var v = e && i && !isNaN(i) ? i : n.offsetWidth - n.clientWidth,
    y = e && o && !isNaN(o) ? o : n.offsetHeight - n.clientHeight;
  return document.body.removeChild(n), sl(t), { width: v, height: y };
}
function cC(e) {
  return typeof document > 'u' || !e || !(e instanceof Element) ? { width: 0, height: 0 } : uC(e);
}
function fC() {
  return (
    document.body.scrollHeight > (window.innerHeight || document.documentElement.clientHeight) &&
    window.innerWidth > document.body.offsetWidth
  );
}
var dC = 'rc-util-locker-'.concat(Date.now()),
  x5 = 0;
function vC(e) {
  var t = !!e,
    n = d.useState(function () {
      return (x5 += 1), ''.concat(dC, '_').concat(x5);
    }),
    r = B(n, 1),
    i = r[0];
  Bt(
    function () {
      if (t) {
        var o = cC(document.body).width,
          a = fC();
        Rr(
          `
html body {
  overflow-y: hidden;
  `.concat(
            a ? 'width: calc(100% - '.concat(o, 'px);') : '',
            `
}`,
          ),
          i,
        );
      } else sl(i);
      return function () {
        sl(i);
      };
    },
    [t, i],
  );
}
var mC = !1;
function pC(e) {
  return mC;
}
var b5 = function (t) {
    return t === !1
      ? !1
      : !yn() || !t
        ? null
        : typeof t == 'string'
          ? document.querySelector(t)
          : typeof t == 'function'
            ? t()
            : t;
  },
  ev = d.forwardRef(function (e, t) {
    var n = e.open,
      r = e.autoLock,
      i = e.getContainer;
    e.debug;
    var o = e.autoDestroy,
      a = o === void 0 ? !0 : o,
      l = e.children,
      s = d.useState(n),
      u = B(s, 2),
      c = u[0],
      f = u[1],
      v = c || n;
    d.useEffect(
      function () {
        (a || n) && f(n);
      },
      [n, a],
    );
    var y = d.useState(function () {
        return b5(i);
      }),
      g = B(y, 2),
      C = g[0],
      w = g[1];
    d.useEffect(function () {
      var F = b5(i);
      w(F ?? null);
    });
    var p = sC(v && !C),
      m = B(p, 2),
      h = m[0],
      S = m[1],
      x = C ?? h;
    vC(r && n && yn() && (x === h || x === document.body));
    var b = null;
    if (l && Gu(l) && t) {
      var E = l;
      b = E.ref;
    }
    var P = Zu(b, t);
    if (!v || !yn() || C === void 0) return null;
    var M = x === !1 || pC(),
      I = l;
    return (
      t && (I = d.cloneElement(l, { ref: P })),
      d.createElement(J0.Provider, { value: S }, M ? I : El.createPortal(I, x))
    );
  });
function hC() {
  var e = T({}, Cl);
  return e.useId;
}
var E5 = 0,
  k5 = hC();
const gC = k5
  ? function (t) {
      var n = k5();
      return t || n;
    }
  : function (t) {
      var n = d.useState('ssr-id'),
        r = B(n, 2),
        i = r[0],
        o = r[1];
      return (
        d.useEffect(function () {
          var a = E5;
          (E5 += 1), o('rc_unique_'.concat(a));
        }, []),
        t || i
      );
    };
var Li = 'RC_FORM_INTERNAL_HOOKS',
  Oe = function () {
    Xt(!1, 'Can not find FormContext. Please make sure you wrap Field under Form.');
  },
  Wo = d.createContext({
    getFieldValue: Oe,
    getFieldsValue: Oe,
    getFieldError: Oe,
    getFieldWarning: Oe,
    getFieldsError: Oe,
    isFieldsTouched: Oe,
    isFieldTouched: Oe,
    isFieldValidating: Oe,
    isFieldsValidating: Oe,
    resetFields: Oe,
    setFields: Oe,
    setFieldValue: Oe,
    setFieldsValue: Oe,
    validateFields: Oe,
    submit: Oe,
    getInternalHooks: function () {
      return (
        Oe(),
        {
          dispatch: Oe,
          initEntityValue: Oe,
          registerField: Oe,
          useSubscribe: Oe,
          setInitialValues: Oe,
          destroyForm: Oe,
          setCallbacks: Oe,
          registerWatch: Oe,
          getFields: Oe,
          setValidateMessages: Oe,
          setPreserve: Oe,
          getInitialValue: Oe,
        }
      );
    },
  }),
  pu = d.createContext(null);
function L2(e) {
  return e == null ? [] : Array.isArray(e) ? e : [e];
}
function yC(e) {
  return e && !!e._init;
}
function I2() {
  return {
    default: 'Validation error on field %s',
    required: '%s is required',
    enum: '%s must be one of %s',
    whitespace: '%s cannot be empty',
    date: {
      format: '%s date %s is invalid for format %s',
      parse: '%s date could not be parsed, %s is invalid ',
      invalid: '%s date %s is invalid',
    },
    types: {
      string: '%s is not a %s',
      method: '%s is not a %s (function)',
      array: '%s is not an %s',
      object: '%s is not an %s',
      number: '%s is not a %s',
      date: '%s is not a %s',
      boolean: '%s is not a %s',
      integer: '%s is not an %s',
      float: '%s is not a %s',
      regexp: '%s is not a valid %s',
      email: '%s is not a valid %s',
      url: '%s is not a valid %s',
      hex: '%s is not a valid %s',
    },
    string: {
      len: '%s must be exactly %s characters',
      min: '%s must be at least %s characters',
      max: '%s cannot be longer than %s characters',
      range: '%s must be between %s and %s characters',
    },
    number: {
      len: '%s must equal %s',
      min: '%s cannot be less than %s',
      max: '%s cannot be greater than %s',
      range: '%s must be between %s and %s',
    },
    array: {
      len: '%s must be exactly %s in length',
      min: '%s cannot be less than %s in length',
      max: '%s cannot be greater than %s in length',
      range: '%s must be between %s and %s in length',
    },
    pattern: { mismatch: '%s value %s does not match pattern %s' },
    clone: function () {
      var t = JSON.parse(JSON.stringify(this));
      return (t.clone = this.clone), t;
    },
  };
}
var _2 = I2();
function CC(e) {
  try {
    return Function.toString.call(e).indexOf('[native code]') !== -1;
  } catch {
    return typeof e == 'function';
  }
}
function wC(e, t, n) {
  if (Zf()) return Reflect.construct.apply(null, arguments);
  var r = [null];
  r.push.apply(r, t);
  var i = new (e.bind.apply(e, r))();
  return n && ol(i, n.prototype), i;
}
function O2(e) {
  var t = typeof Map == 'function' ? new Map() : void 0;
  return (
    (O2 = function (r) {
      if (r === null || !CC(r)) return r;
      if (typeof r != 'function')
        throw new TypeError('Super expression must either be null or a function');
      if (t !== void 0) {
        if (t.has(r)) return t.get(r);
        t.set(r, i);
      }
      function i() {
        return wC(r, arguments, al(this).constructor);
      }
      return (
        (i.prototype = Object.create(r.prototype, {
          constructor: { value: i, enumerable: !1, writable: !0, configurable: !0 },
        })),
        ol(i, r)
      );
    }),
    O2(e)
  );
}
var SC = /%[sdj%]/g,
  xC = function () {};
function $2(e) {
  if (!e || !e.length) return null;
  var t = {};
  return (
    e.forEach(function (n) {
      var r = n.field;
      (t[r] = t[r] || []), t[r].push(n);
    }),
    t
  );
}
function pn(e) {
  for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++)
    n[r - 1] = arguments[r];
  var i = 0,
    o = n.length;
  if (typeof e == 'function') return e.apply(null, n);
  if (typeof e == 'string') {
    var a = e.replace(SC, function (l) {
      if (l === '%%') return '%';
      if (i >= o) return l;
      switch (l) {
        case '%s':
          return String(n[i++]);
        case '%d':
          return Number(n[i++]);
        case '%j':
          try {
            return JSON.stringify(n[i++]);
          } catch {
            return '[Circular]';
          }
          break;
        default:
          return l;
      }
    });
    return a;
  }
  return e;
}
function bC(e) {
  return (
    e === 'string' || e === 'url' || e === 'hex' || e === 'email' || e === 'date' || e === 'pattern'
  );
}
function St(e, t) {
  return !!(
    e == null ||
    (t === 'array' && Array.isArray(e) && !e.length) ||
    (bC(t) && typeof e == 'string' && !e)
  );
}
function EC(e, t, n) {
  var r = [],
    i = 0,
    o = e.length;
  function a(l) {
    r.push.apply(r, J(l || [])), i++, i === o && n(r);
  }
  e.forEach(function (l) {
    t(l, a);
  });
}
function P5(e, t, n) {
  var r = 0,
    i = e.length;
  function o(a) {
    if (a && a.length) {
      n(a);
      return;
    }
    var l = r;
    (r = r + 1), l < i ? t(e[l], o) : n([]);
  }
  o([]);
}
function kC(e) {
  var t = [];
  return (
    Object.keys(e).forEach(function (n) {
      t.push.apply(t, J(e[n] || []));
    }),
    t
  );
}
var M5 = (function (e) {
  vi(n, e);
  var t = mi(n);
  function n(r, i) {
    var o;
    return (
      Ft(this, n),
      (o = t.call(this, 'Async Validation Error')),
      L(le(o), 'errors', void 0),
      L(le(o), 'fields', void 0),
      (o.errors = r),
      (o.fields = i),
      o
    );
  }
  return jt(n);
})(O2(Error));
function PC(e, t, n, r, i) {
  if (t.first) {
    var o = new Promise(function (v, y) {
      var g = function (p) {
          return r(p), p.length ? y(new M5(p, $2(p))) : v(i);
        },
        C = kC(e);
      P5(C, n, g);
    });
    return (
      o.catch(function (v) {
        return v;
      }),
      o
    );
  }
  var a = t.firstFields === !0 ? Object.keys(e) : t.firstFields || [],
    l = Object.keys(e),
    s = l.length,
    u = 0,
    c = [],
    f = new Promise(function (v, y) {
      var g = function (w) {
        if ((c.push.apply(c, w), u++, u === s)) return r(c), c.length ? y(new M5(c, $2(c))) : v(i);
      };
      l.length || (r(c), v(i)),
        l.forEach(function (C) {
          var w = e[C];
          a.indexOf(C) !== -1 ? P5(w, n, g) : EC(w, n, g);
        });
    });
  return (
    f.catch(function (v) {
      return v;
    }),
    f
  );
}
function MC(e) {
  return !!(e && e.message !== void 0);
}
function RC(e, t) {
  for (var n = e, r = 0; r < t.length; r++) {
    if (n == null) return n;
    n = n[t[r]];
  }
  return n;
}
function R5(e, t) {
  return function (n) {
    var r;
    return (
      e.fullFields ? (r = RC(t, e.fullFields)) : (r = t[n.field || e.fullField]),
      MC(n)
        ? ((n.field = n.field || e.fullField), (n.fieldValue = r), n)
        : {
            message: typeof n == 'function' ? n() : n,
            fieldValue: r,
            field: n.field || e.fullField,
          }
    );
  };
}
function L5(e, t) {
  if (t) {
    for (var n in t)
      if (t.hasOwnProperty(n)) {
        var r = t[n];
        oe(r) === 'object' && oe(e[n]) === 'object' ? (e[n] = T(T({}, e[n]), r)) : (e[n] = r);
      }
  }
  return e;
}
var eo = 'enum',
  LC = function (t, n, r, i, o) {
    (t[eo] = Array.isArray(t[eo]) ? t[eo] : []),
      t[eo].indexOf(n) === -1 && i.push(pn(o.messages[eo], t.fullField, t[eo].join(', ')));
  },
  IC = function (t, n, r, i, o) {
    if (t.pattern) {
      if (t.pattern instanceof RegExp)
        (t.pattern.lastIndex = 0),
          t.pattern.test(n) || i.push(pn(o.messages.pattern.mismatch, t.fullField, n, t.pattern));
      else if (typeof t.pattern == 'string') {
        var a = new RegExp(t.pattern);
        a.test(n) || i.push(pn(o.messages.pattern.mismatch, t.fullField, n, t.pattern));
      }
    }
  },
  _C = function (t, n, r, i, o) {
    var a = typeof t.len == 'number',
      l = typeof t.min == 'number',
      s = typeof t.max == 'number',
      u = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g,
      c = n,
      f = null,
      v = typeof n == 'number',
      y = typeof n == 'string',
      g = Array.isArray(n);
    if ((v ? (f = 'number') : y ? (f = 'string') : g && (f = 'array'), !f)) return !1;
    g && (c = n.length),
      y && (c = n.replace(u, '_').length),
      a
        ? c !== t.len && i.push(pn(o.messages[f].len, t.fullField, t.len))
        : l && !s && c < t.min
          ? i.push(pn(o.messages[f].min, t.fullField, t.min))
          : s && !l && c > t.max
            ? i.push(pn(o.messages[f].max, t.fullField, t.max))
            : l &&
              s &&
              (c < t.min || c > t.max) &&
              i.push(pn(o.messages[f].range, t.fullField, t.min, t.max));
  },
  tv = function (t, n, r, i, o, a) {
    t.required &&
      (!r.hasOwnProperty(t.field) || St(n, a || t.type)) &&
      i.push(pn(o.messages.required, t.fullField));
  },
  vs;
const OC = function () {
  if (vs) return vs;
  var e = '[a-fA-F\\d:]',
    t = function (b) {
      return b && b.includeBoundaries
        ? '(?:(?<=\\s|^)(?='.concat(e, ')|(?<=').concat(e, ')(?=\\s|$))')
        : '';
    },
    n =
      '(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}',
    r = '[a-fA-F\\d]{1,4}',
    i = [
      '(?:'.concat(r, ':){7}(?:').concat(r, '|:)'),
      '(?:'.concat(r, ':){6}(?:').concat(n, '|:').concat(r, '|:)'),
      '(?:'.concat(r, ':){5}(?::').concat(n, '|(?::').concat(r, '){1,2}|:)'),
      '(?:'
        .concat(r, ':){4}(?:(?::')
        .concat(r, '){0,1}:')
        .concat(n, '|(?::')
        .concat(r, '){1,3}|:)'),
      '(?:'
        .concat(r, ':){3}(?:(?::')
        .concat(r, '){0,2}:')
        .concat(n, '|(?::')
        .concat(r, '){1,4}|:)'),
      '(?:'
        .concat(r, ':){2}(?:(?::')
        .concat(r, '){0,3}:')
        .concat(n, '|(?::')
        .concat(r, '){1,5}|:)'),
      '(?:'
        .concat(r, ':){1}(?:(?::')
        .concat(r, '){0,4}:')
        .concat(n, '|(?::')
        .concat(r, '){1,6}|:)'),
      '(?::(?:(?::'.concat(r, '){0,5}:').concat(n, '|(?::').concat(r, '){1,7}|:))'),
    ],
    o = '(?:%[0-9a-zA-Z]{1,})?',
    a = '(?:'.concat(i.join('|'), ')').concat(o),
    l = new RegExp('(?:^'.concat(n, '$)|(?:^').concat(a, '$)')),
    s = new RegExp('^'.concat(n, '$')),
    u = new RegExp('^'.concat(a, '$')),
    c = function (b) {
      return b && b.exact
        ? l
        : new RegExp(
            '(?:'
              .concat(t(b))
              .concat(n)
              .concat(t(b), ')|(?:')
              .concat(t(b))
              .concat(a)
              .concat(t(b), ')'),
            'g',
          );
    };
  (c.v4 = function (x) {
    return x && x.exact ? s : new RegExp(''.concat(t(x)).concat(n).concat(t(x)), 'g');
  }),
    (c.v6 = function (x) {
      return x && x.exact ? u : new RegExp(''.concat(t(x)).concat(a).concat(t(x)), 'g');
    });
  var f = '(?:(?:[a-z]+:)?//)',
    v = '(?:\\S+(?::\\S*)?@)?',
    y = c.v4().source,
    g = c.v6().source,
    C = '(?:(?:[a-z\\u00a1-\\uffff0-9][-_]*)*[a-z\\u00a1-\\uffff0-9]+)',
    w = '(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*',
    p = '(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))',
    m = '(?::\\d{2,5})?',
    h = '(?:[/?#][^\\s"]*)?',
    S = '(?:'
      .concat(f, '|www\\.)')
      .concat(v, '(?:localhost|')
      .concat(y, '|')
      .concat(g, '|')
      .concat(C)
      .concat(w)
      .concat(p, ')')
      .concat(m)
      .concat(h);
  return (vs = new RegExp('(?:^'.concat(S, '$)'), 'i')), vs;
};
var I5 = {
    email:
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+\.)+[a-zA-Z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]{2,}))$/,
    hex: /^#?([a-f0-9]{6}|[a-f0-9]{3})$/i,
  },
  Sa = {
    integer: function (t) {
      return Sa.number(t) && parseInt(t, 10) === t;
    },
    float: function (t) {
      return Sa.number(t) && !Sa.integer(t);
    },
    array: function (t) {
      return Array.isArray(t);
    },
    regexp: function (t) {
      if (t instanceof RegExp) return !0;
      try {
        return !!new RegExp(t);
      } catch {
        return !1;
      }
    },
    date: function (t) {
      return (
        typeof t.getTime == 'function' &&
        typeof t.getMonth == 'function' &&
        typeof t.getYear == 'function' &&
        !isNaN(t.getTime())
      );
    },
    number: function (t) {
      return isNaN(t) ? !1 : typeof t == 'number';
    },
    object: function (t) {
      return oe(t) === 'object' && !Sa.array(t);
    },
    method: function (t) {
      return typeof t == 'function';
    },
    email: function (t) {
      return typeof t == 'string' && t.length <= 320 && !!t.match(I5.email);
    },
    url: function (t) {
      return typeof t == 'string' && t.length <= 2048 && !!t.match(OC());
    },
    hex: function (t) {
      return typeof t == 'string' && !!t.match(I5.hex);
    },
  },
  $C = function (t, n, r, i, o) {
    if (t.required && n === void 0) {
      tv(t, n, r, i, o);
      return;
    }
    var a = [
        'integer',
        'float',
        'array',
        'regexp',
        'object',
        'method',
        'email',
        'number',
        'date',
        'url',
        'hex',
      ],
      l = t.type;
    a.indexOf(l) > -1
      ? Sa[l](n) || i.push(pn(o.messages.types[l], t.fullField, t.type))
      : l && oe(n) !== t.type && i.push(pn(o.messages.types[l], t.fullField, t.type));
  },
  TC = function (t, n, r, i, o) {
    (/^\s+$/.test(n) || n === '') && i.push(pn(o.messages.whitespace, t.fullField));
  };
const ce = { required: tv, whitespace: TC, type: $C, range: _C, enum: LC, pattern: IC };
var NC = function (t, n, r, i, o) {
    var a = [],
      l = t.required || (!t.required && i.hasOwnProperty(t.field));
    if (l) {
      if (St(n) && !t.required) return r();
      ce.required(t, n, i, a, o);
    }
    r(a);
  },
  FC = function (t, n, r, i, o) {
    var a = [],
      l = t.required || (!t.required && i.hasOwnProperty(t.field));
    if (l) {
      if (n == null && !t.required) return r();
      ce.required(t, n, i, a, o, 'array'),
        n != null && (ce.type(t, n, i, a, o), ce.range(t, n, i, a, o));
    }
    r(a);
  },
  jC = function (t, n, r, i, o) {
    var a = [],
      l = t.required || (!t.required && i.hasOwnProperty(t.field));
    if (l) {
      if (St(n) && !t.required) return r();
      ce.required(t, n, i, a, o), n !== void 0 && ce.type(t, n, i, a, o);
    }
    r(a);
  },
  AC = function (t, n, r, i, o) {
    var a = [],
      l = t.required || (!t.required && i.hasOwnProperty(t.field));
    if (l) {
      if (St(n, 'date') && !t.required) return r();
      if ((ce.required(t, n, i, a, o), !St(n, 'date'))) {
        var s;
        n instanceof Date ? (s = n) : (s = new Date(n)),
          ce.type(t, s, i, a, o),
          s && ce.range(t, s.getTime(), i, a, o);
      }
    }
    r(a);
  },
  zC = 'enum',
  DC = function (t, n, r, i, o) {
    var a = [],
      l = t.required || (!t.required && i.hasOwnProperty(t.field));
    if (l) {
      if (St(n) && !t.required) return r();
      ce.required(t, n, i, a, o), n !== void 0 && ce[zC](t, n, i, a, o);
    }
    r(a);
  },
  VC = function (t, n, r, i, o) {
    var a = [],
      l = t.required || (!t.required && i.hasOwnProperty(t.field));
    if (l) {
      if (St(n) && !t.required) return r();
      ce.required(t, n, i, a, o), n !== void 0 && (ce.type(t, n, i, a, o), ce.range(t, n, i, a, o));
    }
    r(a);
  },
  HC = function (t, n, r, i, o) {
    var a = [],
      l = t.required || (!t.required && i.hasOwnProperty(t.field));
    if (l) {
      if (St(n) && !t.required) return r();
      ce.required(t, n, i, a, o), n !== void 0 && (ce.type(t, n, i, a, o), ce.range(t, n, i, a, o));
    }
    r(a);
  },
  BC = function (t, n, r, i, o) {
    var a = [],
      l = t.required || (!t.required && i.hasOwnProperty(t.field));
    if (l) {
      if (St(n) && !t.required) return r();
      ce.required(t, n, i, a, o), n !== void 0 && ce.type(t, n, i, a, o);
    }
    r(a);
  },
  UC = function (t, n, r, i, o) {
    var a = [],
      l = t.required || (!t.required && i.hasOwnProperty(t.field));
    if (l) {
      if ((n === '' && (n = void 0), St(n) && !t.required)) return r();
      ce.required(t, n, i, a, o), n !== void 0 && (ce.type(t, n, i, a, o), ce.range(t, n, i, a, o));
    }
    r(a);
  },
  WC = function (t, n, r, i, o) {
    var a = [],
      l = t.required || (!t.required && i.hasOwnProperty(t.field));
    if (l) {
      if (St(n) && !t.required) return r();
      ce.required(t, n, i, a, o), n !== void 0 && ce.type(t, n, i, a, o);
    }
    r(a);
  },
  KC = function (t, n, r, i, o) {
    var a = [],
      l = t.required || (!t.required && i.hasOwnProperty(t.field));
    if (l) {
      if (St(n, 'string') && !t.required) return r();
      ce.required(t, n, i, a, o), St(n, 'string') || ce.pattern(t, n, i, a, o);
    }
    r(a);
  },
  ZC = function (t, n, r, i, o) {
    var a = [],
      l = t.required || (!t.required && i.hasOwnProperty(t.field));
    if (l) {
      if (St(n) && !t.required) return r();
      ce.required(t, n, i, a, o), St(n) || ce.type(t, n, i, a, o);
    }
    r(a);
  },
  GC = function (t, n, r, i, o) {
    var a = [],
      l = Array.isArray(n) ? 'array' : oe(n);
    ce.required(t, n, i, a, o, l), r(a);
  },
  qC = function (t, n, r, i, o) {
    var a = [],
      l = t.required || (!t.required && i.hasOwnProperty(t.field));
    if (l) {
      if (St(n, 'string') && !t.required) return r();
      ce.required(t, n, i, a, o, 'string'),
        St(n, 'string') ||
          (ce.type(t, n, i, a, o),
          ce.range(t, n, i, a, o),
          ce.pattern(t, n, i, a, o),
          t.whitespace === !0 && ce.whitespace(t, n, i, a, o));
    }
    r(a);
  },
  Qc = function (t, n, r, i, o) {
    var a = t.type,
      l = [],
      s = t.required || (!t.required && i.hasOwnProperty(t.field));
    if (s) {
      if (St(n, a) && !t.required) return r();
      ce.required(t, n, i, l, o, a), St(n, a) || ce.type(t, n, i, l, o);
    }
    r(l);
  };
const ja = {
  string: qC,
  method: BC,
  number: UC,
  boolean: jC,
  regexp: ZC,
  integer: HC,
  float: VC,
  array: FC,
  object: WC,
  enum: DC,
  pattern: KC,
  date: AC,
  url: Qc,
  hex: Qc,
  email: Qc,
  required: GC,
  any: NC,
};
var _l = (function () {
  function e(t) {
    Ft(this, e), L(this, 'rules', null), L(this, '_messages', _2), this.define(t);
  }
  return (
    jt(e, [
      {
        key: 'define',
        value: function (n) {
          var r = this;
          if (!n) throw new Error('Cannot configure a schema with no rules');
          if (oe(n) !== 'object' || Array.isArray(n)) throw new Error('Rules must be an object');
          (this.rules = {}),
            Object.keys(n).forEach(function (i) {
              var o = n[i];
              r.rules[i] = Array.isArray(o) ? o : [o];
            });
        },
      },
      {
        key: 'messages',
        value: function (n) {
          return n && (this._messages = L5(I2(), n)), this._messages;
        },
      },
      {
        key: 'validate',
        value: function (n) {
          var r = this,
            i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
            o = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : function () {},
            a = n,
            l = i,
            s = o;
          if (
            (typeof l == 'function' && ((s = l), (l = {})),
            !this.rules || Object.keys(this.rules).length === 0)
          )
            return s && s(null, a), Promise.resolve(a);
          function u(g) {
            var C = [],
              w = {};
            function p(h) {
              if (Array.isArray(h)) {
                var S;
                C = (S = C).concat.apply(S, J(h));
              } else C.push(h);
            }
            for (var m = 0; m < g.length; m++) p(g[m]);
            C.length ? ((w = $2(C)), s(C, w)) : s(null, a);
          }
          if (l.messages) {
            var c = this.messages();
            c === _2 && (c = I2()), L5(c, l.messages), (l.messages = c);
          } else l.messages = this.messages();
          var f = {},
            v = l.keys || Object.keys(this.rules);
          v.forEach(function (g) {
            var C = r.rules[g],
              w = a[g];
            C.forEach(function (p) {
              var m = p;
              typeof m.transform == 'function' &&
                (a === n && (a = T({}, a)),
                (w = a[g] = m.transform(w)),
                w != null && (m.type = m.type || (Array.isArray(w) ? 'array' : oe(w)))),
                typeof m == 'function' ? (m = { validator: m }) : (m = T({}, m)),
                (m.validator = r.getValidationMethod(m)),
                m.validator &&
                  ((m.field = g),
                  (m.fullField = m.fullField || g),
                  (m.type = r.getType(m)),
                  (f[g] = f[g] || []),
                  f[g].push({ rule: m, value: w, source: a, field: g }));
            });
          });
          var y = {};
          return PC(
            f,
            l,
            function (g, C) {
              var w = g.rule,
                p =
                  (w.type === 'object' || w.type === 'array') &&
                  (oe(w.fields) === 'object' || oe(w.defaultField) === 'object');
              (p = p && (w.required || (!w.required && g.value))), (w.field = g.field);
              function m(E, P) {
                return T(
                  T({}, P),
                  {},
                  {
                    fullField: ''.concat(w.fullField, '.').concat(E),
                    fullFields: w.fullFields ? [].concat(J(w.fullFields), [E]) : [E],
                  },
                );
              }
              function h() {
                var E = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [],
                  P = Array.isArray(E) ? E : [E];
                !l.suppressWarning && P.length && e.warning('async-validator:', P),
                  P.length && w.message !== void 0 && (P = [].concat(w.message));
                var M = P.map(R5(w, a));
                if (l.first && M.length) return (y[w.field] = 1), C(M);
                if (!p) C(M);
                else {
                  if (w.required && !g.value)
                    return (
                      w.message !== void 0
                        ? (M = [].concat(w.message).map(R5(w, a)))
                        : l.error && (M = [l.error(w, pn(l.messages.required, w.field))]),
                      C(M)
                    );
                  var I = {};
                  w.defaultField &&
                    Object.keys(g.value).map(function (j) {
                      I[j] = w.defaultField;
                    }),
                    (I = T(T({}, I), g.rule.fields));
                  var F = {};
                  Object.keys(I).forEach(function (j) {
                    var A = I[j],
                      W = Array.isArray(A) ? A : [A];
                    F[j] = W.map(m.bind(null, j));
                  });
                  var z = new e(F);
                  z.messages(l.messages),
                    g.rule.options &&
                      ((g.rule.options.messages = l.messages), (g.rule.options.error = l.error)),
                    z.validate(g.value, g.rule.options || l, function (j) {
                      var A = [];
                      M && M.length && A.push.apply(A, J(M)),
                        j && j.length && A.push.apply(A, J(j)),
                        C(A.length ? A : null);
                    });
                }
              }
              var S;
              if (w.asyncValidator) S = w.asyncValidator(w, g.value, h, g.source, l);
              else if (w.validator) {
                try {
                  S = w.validator(w, g.value, h, g.source, l);
                } catch (E) {
                  var x, b;
                  (x = (b = console).error) === null || x === void 0 || x.call(b, E),
                    l.suppressValidatorError ||
                      setTimeout(function () {
                        throw E;
                      }, 0),
                    h(E.message);
                }
                S === !0
                  ? h()
                  : S === !1
                    ? h(
                        typeof w.message == 'function'
                          ? w.message(w.fullField || w.field)
                          : w.message || ''.concat(w.fullField || w.field, ' fails'),
                      )
                    : S instanceof Array
                      ? h(S)
                      : S instanceof Error && h(S.message);
              }
              S &&
                S.then &&
                S.then(
                  function () {
                    return h();
                  },
                  function (E) {
                    return h(E);
                  },
                );
            },
            function (g) {
              u(g);
            },
            a,
          );
        },
      },
      {
        key: 'getType',
        value: function (n) {
          if (
            (n.type === void 0 && n.pattern instanceof RegExp && (n.type = 'pattern'),
            typeof n.validator != 'function' && n.type && !ja.hasOwnProperty(n.type))
          )
            throw new Error(pn('Unknown rule type %s', n.type));
          return n.type || 'string';
        },
      },
      {
        key: 'getValidationMethod',
        value: function (n) {
          if (typeof n.validator == 'function') return n.validator;
          var r = Object.keys(n),
            i = r.indexOf('message');
          return (
            i !== -1 && r.splice(i, 1),
            r.length === 1 && r[0] === 'required' ? ja.required : ja[this.getType(n)] || void 0
          );
        },
      },
    ]),
    e
  );
})();
L(_l, 'register', function (t, n) {
  if (typeof n != 'function')
    throw new Error('Cannot register a validator by type, validator is not a function');
  ja[t] = n;
});
L(_l, 'warning', xC);
L(_l, 'messages', _2);
L(_l, 'validators', ja);
var fn = "'${name}' is not a valid ${type}",
  nv = {
    default: "Validation error on field '${name}'",
    required: "'${name}' is required",
    enum: "'${name}' must be one of [${enum}]",
    whitespace: "'${name}' cannot be empty",
    date: {
      format: "'${name}' is invalid for format date",
      parse: "'${name}' could not be parsed as date",
      invalid: "'${name}' is invalid date",
    },
    types: {
      string: fn,
      method: fn,
      array: fn,
      object: fn,
      number: fn,
      date: fn,
      boolean: fn,
      integer: fn,
      float: fn,
      regexp: fn,
      email: fn,
      url: fn,
      hex: fn,
    },
    string: {
      len: "'${name}' must be exactly ${len} characters",
      min: "'${name}' must be at least ${min} characters",
      max: "'${name}' cannot be longer than ${max} characters",
      range: "'${name}' must be between ${min} and ${max} characters",
    },
    number: {
      len: "'${name}' must equal ${len}",
      min: "'${name}' cannot be less than ${min}",
      max: "'${name}' cannot be greater than ${max}",
      range: "'${name}' must be between ${min} and ${max}",
    },
    array: {
      len: "'${name}' must be exactly ${len} in length",
      min: "'${name}' cannot be less than ${min} in length",
      max: "'${name}' cannot be greater than ${max} in length",
      range: "'${name}' must be between ${min} and ${max} in length",
    },
    pattern: { mismatch: "'${name}' does not match pattern ${pattern}" },
  },
  _5 = _l;
function QC(e, t) {
  return e.replace(/\\?\$\{\w+\}/g, function (n) {
    if (n.startsWith('\\')) return n.slice(1);
    var r = n.slice(2, -1);
    return t[r];
  });
}
var O5 = 'CODE_LOGIC_ERROR';
function T2(e, t, n, r, i) {
  return N2.apply(this, arguments);
}
function N2() {
  return (
    (N2 = Il(
      er().mark(function e(t, n, r, i, o) {
        var a, l, s, u, c, f, v, y, g;
        return er().wrap(
          function (w) {
            for (;;)
              switch ((w.prev = w.next)) {
                case 0:
                  return (
                    (a = T({}, r)),
                    delete a.ruleIndex,
                    (_5.warning = function () {}),
                    a.validator &&
                      ((l = a.validator),
                      (a.validator = function () {
                        try {
                          return l.apply(void 0, arguments);
                        } catch (p) {
                          return console.error(p), Promise.reject(O5);
                        }
                      })),
                    (s = null),
                    a &&
                      a.type === 'array' &&
                      a.defaultField &&
                      ((s = a.defaultField), delete a.defaultField),
                    (u = new _5(L({}, t, [a]))),
                    (c = So(nv, i.validateMessages)),
                    u.messages(c),
                    (f = []),
                    (w.prev = 10),
                    (w.next = 13),
                    Promise.resolve(u.validate(L({}, t, n), T({}, i)))
                  );
                case 13:
                  w.next = 18;
                  break;
                case 15:
                  (w.prev = 15),
                    (w.t0 = w.catch(10)),
                    w.t0.errors &&
                      (f = w.t0.errors.map(function (p, m) {
                        var h = p.message,
                          S = h === O5 ? c.default : h;
                        return d.isValidElement(S)
                          ? d.cloneElement(S, { key: 'error_'.concat(m) })
                          : S;
                      }));
                case 18:
                  if (!(!f.length && s)) {
                    w.next = 23;
                    break;
                  }
                  return (
                    (w.next = 21),
                    Promise.all(
                      n.map(function (p, m) {
                        return T2(''.concat(t, '.').concat(m), p, s, i, o);
                      }),
                    )
                  );
                case 21:
                  return (
                    (v = w.sent),
                    w.abrupt(
                      'return',
                      v.reduce(function (p, m) {
                        return [].concat(J(p), J(m));
                      }, []),
                    )
                  );
                case 23:
                  return (
                    (y = T(T({}, r), {}, { name: t, enum: (r.enum || []).join(', ') }, o)),
                    (g = f.map(function (p) {
                      return typeof p == 'string' ? QC(p, y) : p;
                    })),
                    w.abrupt('return', g)
                  );
                case 26:
                case 'end':
                  return w.stop();
              }
          },
          e,
          null,
          [[10, 15]],
        );
      }),
    )),
    N2.apply(this, arguments)
  );
}
function XC(e, t, n, r, i, o) {
  var a = e.join('.'),
    l = n
      .map(function (c, f) {
        var v = c.validator,
          y = T(T({}, c), {}, { ruleIndex: f });
        return (
          v &&
            (y.validator = function (g, C, w) {
              var p = !1,
                m = function () {
                  for (var x = arguments.length, b = new Array(x), E = 0; E < x; E++)
                    b[E] = arguments[E];
                  Promise.resolve().then(function () {
                    Xt(
                      !p,
                      'Your validator function has already return a promise. `callback` will be ignored.',
                    ),
                      p || w.apply(void 0, b);
                  });
                },
                h = v(g, C, m);
              (p = h && typeof h.then == 'function' && typeof h.catch == 'function'),
                Xt(p, '`callback` is deprecated. Please return a promise instead.'),
                p &&
                  h
                    .then(function () {
                      w();
                    })
                    .catch(function (S) {
                      w(S || ' ');
                    });
            }),
          y
        );
      })
      .sort(function (c, f) {
        var v = c.warningOnly,
          y = c.ruleIndex,
          g = f.warningOnly,
          C = f.ruleIndex;
        return !!v == !!g ? y - C : v ? 1 : -1;
      }),
    s;
  if (i === !0)
    s = new Promise(
      (function () {
        var c = Il(
          er().mark(function f(v, y) {
            var g, C, w;
            return er().wrap(function (m) {
              for (;;)
                switch ((m.prev = m.next)) {
                  case 0:
                    g = 0;
                  case 1:
                    if (!(g < l.length)) {
                      m.next = 12;
                      break;
                    }
                    return (C = l[g]), (m.next = 5), T2(a, t, C, r, o);
                  case 5:
                    if (((w = m.sent), !w.length)) {
                      m.next = 9;
                      break;
                    }
                    return y([{ errors: w, rule: C }]), m.abrupt('return');
                  case 9:
                    (g += 1), (m.next = 1);
                    break;
                  case 12:
                    v([]);
                  case 13:
                  case 'end':
                    return m.stop();
                }
            }, f);
          }),
        );
        return function (f, v) {
          return c.apply(this, arguments);
        };
      })(),
    );
  else {
    var u = l.map(function (c) {
      return T2(a, t, c, r, o).then(function (f) {
        return { errors: f, rule: c };
      });
    });
    s = (i ? JC(u) : YC(u)).then(function (c) {
      return Promise.reject(c);
    });
  }
  return (
    s.catch(function (c) {
      return c;
    }),
    s
  );
}
function YC(e) {
  return F2.apply(this, arguments);
}
function F2() {
  return (
    (F2 = Il(
      er().mark(function e(t) {
        return er().wrap(function (r) {
          for (;;)
            switch ((r.prev = r.next)) {
              case 0:
                return r.abrupt(
                  'return',
                  Promise.all(t).then(function (i) {
                    var o,
                      a = (o = []).concat.apply(o, J(i));
                    return a;
                  }),
                );
              case 1:
              case 'end':
                return r.stop();
            }
        }, e);
      }),
    )),
    F2.apply(this, arguments)
  );
}
function JC(e) {
  return j2.apply(this, arguments);
}
function j2() {
  return (
    (j2 = Il(
      er().mark(function e(t) {
        var n;
        return er().wrap(function (i) {
          for (;;)
            switch ((i.prev = i.next)) {
              case 0:
                return (
                  (n = 0),
                  i.abrupt(
                    'return',
                    new Promise(function (o) {
                      t.forEach(function (a) {
                        a.then(function (l) {
                          l.errors.length && o([l]), (n += 1), n === t.length && o([]);
                        });
                      });
                    }),
                  )
                );
              case 2:
              case 'end':
                return i.stop();
            }
        }, e);
      }),
    )),
    j2.apply(this, arguments)
  );
}
function lt(e) {
  return L2(e);
}
function $5(e, t) {
  var n = {};
  return (
    t.forEach(function (r) {
      var i = sr(e, r);
      n = Kn(n, r, i);
    }),
    n
  );
}
function _o(e, t) {
  var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
  return (
    e &&
    e.some(function (r) {
      return rv(t, r, n);
    })
  );
}
function rv(e, t) {
  var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
  return !e || !t || (!n && e.length !== t.length)
    ? !1
    : t.every(function (r, i) {
        return e[i] === r;
      });
}
function ew(e, t) {
  if (e === t) return !0;
  if ((!e && t) || (e && !t) || !e || !t || oe(e) !== 'object' || oe(t) !== 'object') return !1;
  var n = Object.keys(e),
    r = Object.keys(t),
    i = new Set([].concat(n, r));
  return J(i).every(function (o) {
    var a = e[o],
      l = t[o];
    return typeof a == 'function' && typeof l == 'function' ? !0 : a === l;
  });
}
function tw(e) {
  var t = arguments.length <= 1 ? void 0 : arguments[1];
  return t && t.target && oe(t.target) === 'object' && e in t.target ? t.target[e] : t;
}
function T5(e, t, n) {
  var r = e.length;
  if (t < 0 || t >= r || n < 0 || n >= r) return e;
  var i = e[t],
    o = t - n;
  return o > 0
    ? [].concat(J(e.slice(0, n)), [i], J(e.slice(n, t)), J(e.slice(t + 1, r)))
    : o < 0
      ? [].concat(J(e.slice(0, t)), J(e.slice(t + 1, n + 1)), [i], J(e.slice(n + 1, r)))
      : e;
}
var nw = ['name'],
  In = [];
function Xc(e, t, n, r, i, o) {
  return typeof e == 'function' ? e(t, n, 'source' in o ? { source: o.source } : {}) : r !== i;
}
var rd = (function (e) {
  vi(n, e);
  var t = mi(n);
  function n(r) {
    var i;
    if (
      (Ft(this, n),
      (i = t.call(this, r)),
      L(le(i), 'state', { resetCount: 0 }),
      L(le(i), 'cancelRegisterFunc', null),
      L(le(i), 'mounted', !1),
      L(le(i), 'touched', !1),
      L(le(i), 'dirty', !1),
      L(le(i), 'validatePromise', void 0),
      L(le(i), 'prevValidating', void 0),
      L(le(i), 'errors', In),
      L(le(i), 'warnings', In),
      L(le(i), 'cancelRegister', function () {
        var s = i.props,
          u = s.preserve,
          c = s.isListField,
          f = s.name;
        i.cancelRegisterFunc && i.cancelRegisterFunc(c, u, lt(f)), (i.cancelRegisterFunc = null);
      }),
      L(le(i), 'getNamePath', function () {
        var s = i.props,
          u = s.name,
          c = s.fieldContext,
          f = c.prefixName,
          v = f === void 0 ? [] : f;
        return u !== void 0 ? [].concat(J(v), J(u)) : [];
      }),
      L(le(i), 'getRules', function () {
        var s = i.props,
          u = s.rules,
          c = u === void 0 ? [] : u,
          f = s.fieldContext;
        return c.map(function (v) {
          return typeof v == 'function' ? v(f) : v;
        });
      }),
      L(le(i), 'refresh', function () {
        i.mounted &&
          i.setState(function (s) {
            var u = s.resetCount;
            return { resetCount: u + 1 };
          });
      }),
      L(le(i), 'metaCache', null),
      L(le(i), 'triggerMetaEvent', function (s) {
        var u = i.props.onMetaChange;
        if (u) {
          var c = T(T({}, i.getMeta()), {}, { destroy: s });
          ul(i.metaCache, c) || u(c), (i.metaCache = c);
        } else i.metaCache = null;
      }),
      L(le(i), 'onStoreChange', function (s, u, c) {
        var f = i.props,
          v = f.shouldUpdate,
          y = f.dependencies,
          g = y === void 0 ? [] : y,
          C = f.onReset,
          w = c.store,
          p = i.getNamePath(),
          m = i.getValue(s),
          h = i.getValue(w),
          S = u && _o(u, p);
        switch (
          (c.type === 'valueUpdate' &&
            c.source === 'external' &&
            !ul(m, h) &&
            ((i.touched = !0),
            (i.dirty = !0),
            (i.validatePromise = null),
            (i.errors = In),
            (i.warnings = In),
            i.triggerMetaEvent()),
          c.type)
        ) {
          case 'reset':
            if (!u || S) {
              (i.touched = !1),
                (i.dirty = !1),
                (i.validatePromise = void 0),
                (i.errors = In),
                (i.warnings = In),
                i.triggerMetaEvent(),
                C == null || C(),
                i.refresh();
              return;
            }
            break;
          case 'remove': {
            if (v && Xc(v, s, w, m, h, c)) {
              i.reRender();
              return;
            }
            break;
          }
          case 'setField': {
            var x = c.data;
            if (S) {
              'touched' in x && (i.touched = x.touched),
                'validating' in x &&
                  !('originRCField' in x) &&
                  (i.validatePromise = x.validating ? Promise.resolve([]) : null),
                'errors' in x && (i.errors = x.errors || In),
                'warnings' in x && (i.warnings = x.warnings || In),
                (i.dirty = !0),
                i.triggerMetaEvent(),
                i.reRender();
              return;
            } else if ('value' in x && _o(u, p, !0)) {
              i.reRender();
              return;
            }
            if (v && !p.length && Xc(v, s, w, m, h, c)) {
              i.reRender();
              return;
            }
            break;
          }
          case 'dependenciesUpdate': {
            var b = g.map(lt);
            if (
              b.some(function (E) {
                return _o(c.relatedFields, E);
              })
            ) {
              i.reRender();
              return;
            }
            break;
          }
          default:
            if (S || ((!g.length || p.length || v) && Xc(v, s, w, m, h, c))) {
              i.reRender();
              return;
            }
            break;
        }
        v === !0 && i.reRender();
      }),
      L(le(i), 'validateRules', function (s) {
        var u = i.getNamePath(),
          c = i.getValue(),
          f = s || {},
          v = f.triggerName,
          y = f.validateOnly,
          g = y === void 0 ? !1 : y,
          C = Promise.resolve().then(
            Il(
              er().mark(function w() {
                var p, m, h, S, x, b, E;
                return er().wrap(function (M) {
                  for (;;)
                    switch ((M.prev = M.next)) {
                      case 0:
                        if (i.mounted) {
                          M.next = 2;
                          break;
                        }
                        return M.abrupt('return', []);
                      case 2:
                        if (
                          ((p = i.props),
                          (m = p.validateFirst),
                          (h = m === void 0 ? !1 : m),
                          (S = p.messageVariables),
                          (x = p.validateDebounce),
                          (b = i.getRules()),
                          v &&
                            (b = b
                              .filter(function (I) {
                                return I;
                              })
                              .filter(function (I) {
                                var F = I.validateTrigger;
                                if (!F) return !0;
                                var z = L2(F);
                                return z.includes(v);
                              })),
                          !(x && v))
                        ) {
                          M.next = 10;
                          break;
                        }
                        return (
                          (M.next = 8),
                          new Promise(function (I) {
                            setTimeout(I, x);
                          })
                        );
                      case 8:
                        if (i.validatePromise === C) {
                          M.next = 10;
                          break;
                        }
                        return M.abrupt('return', []);
                      case 10:
                        return (
                          (E = XC(u, c, b, s, h, S)),
                          E.catch(function (I) {
                            return I;
                          }).then(function () {
                            var I =
                              arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : In;
                            if (i.validatePromise === C) {
                              var F;
                              i.validatePromise = null;
                              var z = [],
                                j = [];
                              (F = I.forEach) === null ||
                                F === void 0 ||
                                F.call(I, function (A) {
                                  var W = A.rule.warningOnly,
                                    O = A.errors,
                                    R = O === void 0 ? In : O;
                                  W ? j.push.apply(j, J(R)) : z.push.apply(z, J(R));
                                }),
                                (i.errors = z),
                                (i.warnings = j),
                                i.triggerMetaEvent(),
                                i.reRender();
                            }
                          }),
                          M.abrupt('return', E)
                        );
                      case 13:
                      case 'end':
                        return M.stop();
                    }
                }, w);
              }),
            ),
          );
        return (
          g ||
            ((i.validatePromise = C),
            (i.dirty = !0),
            (i.errors = In),
            (i.warnings = In),
            i.triggerMetaEvent(),
            i.reRender()),
          C
        );
      }),
      L(le(i), 'isFieldValidating', function () {
        return !!i.validatePromise;
      }),
      L(le(i), 'isFieldTouched', function () {
        return i.touched;
      }),
      L(le(i), 'isFieldDirty', function () {
        if (i.dirty || i.props.initialValue !== void 0) return !0;
        var s = i.props.fieldContext,
          u = s.getInternalHooks(Li),
          c = u.getInitialValue;
        return c(i.getNamePath()) !== void 0;
      }),
      L(le(i), 'getErrors', function () {
        return i.errors;
      }),
      L(le(i), 'getWarnings', function () {
        return i.warnings;
      }),
      L(le(i), 'isListField', function () {
        return i.props.isListField;
      }),
      L(le(i), 'isList', function () {
        return i.props.isList;
      }),
      L(le(i), 'isPreserve', function () {
        return i.props.preserve;
      }),
      L(le(i), 'getMeta', function () {
        i.prevValidating = i.isFieldValidating();
        var s = {
          touched: i.isFieldTouched(),
          validating: i.prevValidating,
          errors: i.errors,
          warnings: i.warnings,
          name: i.getNamePath(),
          validated: i.validatePromise === null,
        };
        return s;
      }),
      L(le(i), 'getOnlyChild', function (s) {
        if (typeof s == 'function') {
          var u = i.getMeta();
          return T(
            T({}, i.getOnlyChild(s(i.getControlled(), u, i.props.fieldContext))),
            {},
            { isFunction: !0 },
          );
        }
        var c = zo(s);
        return c.length !== 1 || !d.isValidElement(c[0])
          ? { child: c, isFunction: !1 }
          : { child: c[0], isFunction: !1 };
      }),
      L(le(i), 'getValue', function (s) {
        var u = i.props.fieldContext.getFieldsValue,
          c = i.getNamePath();
        return sr(s || u(!0), c);
      }),
      L(le(i), 'getControlled', function () {
        var s = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {},
          u = i.props,
          c = u.name,
          f = u.trigger,
          v = u.validateTrigger,
          y = u.getValueFromEvent,
          g = u.normalize,
          C = u.valuePropName,
          w = u.getValueProps,
          p = u.fieldContext,
          m = v !== void 0 ? v : p.validateTrigger,
          h = i.getNamePath(),
          S = p.getInternalHooks,
          x = p.getFieldsValue,
          b = S(Li),
          E = b.dispatch,
          P = i.getValue(),
          M =
            w ||
            function (A) {
              return L({}, C, A);
            },
          I = s[f],
          F = c !== void 0 ? M(P) : {},
          z = T(T({}, s), F);
        z[f] = function () {
          (i.touched = !0), (i.dirty = !0), i.triggerMetaEvent();
          for (var A, W = arguments.length, O = new Array(W), R = 0; R < W; R++)
            O[R] = arguments[R];
          y ? (A = y.apply(void 0, O)) : (A = tw.apply(void 0, [C].concat(O))),
            g && (A = g(A, P, x(!0))),
            E({ type: 'updateValue', namePath: h, value: A }),
            I && I.apply(void 0, O);
        };
        var j = L2(m || []);
        return (
          j.forEach(function (A) {
            var W = z[A];
            z[A] = function () {
              W && W.apply(void 0, arguments);
              var O = i.props.rules;
              O && O.length && E({ type: 'validateField', namePath: h, triggerName: A });
            };
          }),
          z
        );
      }),
      r.fieldContext)
    ) {
      var o = r.fieldContext.getInternalHooks,
        a = o(Li),
        l = a.initEntityValue;
      l(le(i));
    }
    return i;
  }
  return (
    jt(n, [
      {
        key: 'componentDidMount',
        value: function () {
          var i = this.props,
            o = i.shouldUpdate,
            a = i.fieldContext;
          if (((this.mounted = !0), a)) {
            var l = a.getInternalHooks,
              s = l(Li),
              u = s.registerField;
            this.cancelRegisterFunc = u(this);
          }
          o === !0 && this.reRender();
        },
      },
      {
        key: 'componentWillUnmount',
        value: function () {
          this.cancelRegister(), this.triggerMetaEvent(!0), (this.mounted = !1);
        },
      },
      {
        key: 'reRender',
        value: function () {
          this.mounted && this.forceUpdate();
        },
      },
      {
        key: 'render',
        value: function () {
          var i = this.state.resetCount,
            o = this.props.children,
            a = this.getOnlyChild(o),
            l = a.child,
            s = a.isFunction,
            u;
          return (
            s
              ? (u = l)
              : d.isValidElement(l)
                ? (u = d.cloneElement(l, this.getControlled(l.props)))
                : (Xt(!l, '`children` of Field is not validate ReactElement.'), (u = l)),
            d.createElement(d.Fragment, { key: i }, u)
          );
        },
      },
    ]),
    n
  );
})(d.Component);
L(rd, 'contextType', Wo);
L(rd, 'defaultProps', { trigger: 'onChange', valuePropName: 'value' });
function iv(e) {
  var t = e.name,
    n = ze(e, nw),
    r = d.useContext(Wo),
    i = d.useContext(pu),
    o = t !== void 0 ? lt(t) : void 0,
    a = 'keep';
  return (
    n.isListField || (a = '_'.concat((o || []).join('_'))),
    d.createElement(rd, ye({ key: a, name: o, isListField: !!i }, n, { fieldContext: r }))
  );
}
function rw(e) {
  var t = e.name,
    n = e.initialValue,
    r = e.children,
    i = e.rules,
    o = e.validateTrigger,
    a = e.isListField,
    l = d.useContext(Wo),
    s = d.useContext(pu),
    u = d.useRef({ keys: [], id: 0 }),
    c = u.current,
    f = d.useMemo(
      function () {
        var C = lt(l.prefixName) || [];
        return [].concat(J(C), J(lt(t)));
      },
      [l.prefixName, t],
    ),
    v = d.useMemo(
      function () {
        return T(T({}, l), {}, { prefixName: f });
      },
      [l, f],
    ),
    y = d.useMemo(
      function () {
        return {
          getKey: function (w) {
            var p = f.length,
              m = w[p];
            return [c.keys[m], w.slice(p + 1)];
          },
        };
      },
      [f],
    );
  if (typeof r != 'function') return Xt(!1, 'Form.List only accepts function as children.'), null;
  var g = function (w, p, m) {
    var h = m.source;
    return h === 'internal' ? !1 : w !== p;
  };
  return d.createElement(
    pu.Provider,
    { value: y },
    d.createElement(
      Wo.Provider,
      { value: v },
      d.createElement(
        iv,
        {
          name: [],
          shouldUpdate: g,
          rules: i,
          validateTrigger: o,
          initialValue: n,
          isList: !0,
          isListField: a ?? !!s,
        },
        function (C, w) {
          var p = C.value,
            m = p === void 0 ? [] : p,
            h = C.onChange,
            S = l.getFieldValue,
            x = function () {
              var M = S(f || []);
              return M || [];
            },
            b = {
              add: function (M, I) {
                var F = x();
                I >= 0 && I <= F.length
                  ? ((c.keys = [].concat(J(c.keys.slice(0, I)), [c.id], J(c.keys.slice(I)))),
                    h([].concat(J(F.slice(0, I)), [M], J(F.slice(I)))))
                  : ((c.keys = [].concat(J(c.keys), [c.id])), h([].concat(J(F), [M]))),
                  (c.id += 1);
              },
              remove: function (M) {
                var I = x(),
                  F = new Set(Array.isArray(M) ? M : [M]);
                F.size <= 0 ||
                  ((c.keys = c.keys.filter(function (z, j) {
                    return !F.has(j);
                  })),
                  h(
                    I.filter(function (z, j) {
                      return !F.has(j);
                    }),
                  ));
              },
              move: function (M, I) {
                if (M !== I) {
                  var F = x();
                  M < 0 ||
                    M >= F.length ||
                    I < 0 ||
                    I >= F.length ||
                    ((c.keys = T5(c.keys, M, I)), h(T5(F, M, I)));
                }
              },
            },
            E = m || [];
          return (
            Array.isArray(E) || (E = []),
            r(
              E.map(function (P, M) {
                var I = c.keys[M];
                return (
                  I === void 0 && ((c.keys[M] = c.id), (I = c.keys[M]), (c.id += 1)),
                  { name: M, key: I, isListField: !0 }
                );
              }),
              b,
              w,
            )
          );
        },
      ),
    ),
  );
}
function iw(e) {
  var t = !1,
    n = e.length,
    r = [];
  return e.length
    ? new Promise(function (i, o) {
        e.forEach(function (a, l) {
          a.catch(function (s) {
            return (t = !0), s;
          }).then(function (s) {
            (n -= 1), (r[l] = s), !(n > 0) && (t && o(r), i(r));
          });
        });
      })
    : Promise.resolve([]);
}
var ov = '__@field_split__';
function Yc(e) {
  return e
    .map(function (t) {
      return ''.concat(oe(t), ':').concat(t);
    })
    .join(ov);
}
var to = (function () {
    function e() {
      Ft(this, e), L(this, 'kvs', new Map());
    }
    return (
      jt(e, [
        {
          key: 'set',
          value: function (n, r) {
            this.kvs.set(Yc(n), r);
          },
        },
        {
          key: 'get',
          value: function (n) {
            return this.kvs.get(Yc(n));
          },
        },
        {
          key: 'update',
          value: function (n, r) {
            var i = this.get(n),
              o = r(i);
            o ? this.set(n, o) : this.delete(n);
          },
        },
        {
          key: 'delete',
          value: function (n) {
            this.kvs.delete(Yc(n));
          },
        },
        {
          key: 'map',
          value: function (n) {
            return J(this.kvs.entries()).map(function (r) {
              var i = B(r, 2),
                o = i[0],
                a = i[1],
                l = o.split(ov);
              return n({
                key: l.map(function (s) {
                  var u = s.match(/^([^:]*):(.*)$/),
                    c = B(u, 3),
                    f = c[1],
                    v = c[2];
                  return f === 'number' ? Number(v) : v;
                }),
                value: a,
              });
            });
          },
        },
        {
          key: 'toJSON',
          value: function () {
            var n = {};
            return (
              this.map(function (r) {
                var i = r.key,
                  o = r.value;
                return (n[i.join('.')] = o), null;
              }),
              n
            );
          },
        },
      ]),
      e
    );
  })(),
  ow = ['name'],
  aw = jt(function e(t) {
    var n = this;
    Ft(this, e),
      L(this, 'formHooked', !1),
      L(this, 'forceRootUpdate', void 0),
      L(this, 'subscribable', !0),
      L(this, 'store', {}),
      L(this, 'fieldEntities', []),
      L(this, 'initialValues', {}),
      L(this, 'callbacks', {}),
      L(this, 'validateMessages', null),
      L(this, 'preserve', null),
      L(this, 'lastValidatePromise', null),
      L(this, 'getForm', function () {
        return {
          getFieldValue: n.getFieldValue,
          getFieldsValue: n.getFieldsValue,
          getFieldError: n.getFieldError,
          getFieldWarning: n.getFieldWarning,
          getFieldsError: n.getFieldsError,
          isFieldsTouched: n.isFieldsTouched,
          isFieldTouched: n.isFieldTouched,
          isFieldValidating: n.isFieldValidating,
          isFieldsValidating: n.isFieldsValidating,
          resetFields: n.resetFields,
          setFields: n.setFields,
          setFieldValue: n.setFieldValue,
          setFieldsValue: n.setFieldsValue,
          validateFields: n.validateFields,
          submit: n.submit,
          _init: !0,
          getInternalHooks: n.getInternalHooks,
        };
      }),
      L(this, 'getInternalHooks', function (r) {
        return r === Li
          ? ((n.formHooked = !0),
            {
              dispatch: n.dispatch,
              initEntityValue: n.initEntityValue,
              registerField: n.registerField,
              useSubscribe: n.useSubscribe,
              setInitialValues: n.setInitialValues,
              destroyForm: n.destroyForm,
              setCallbacks: n.setCallbacks,
              setValidateMessages: n.setValidateMessages,
              getFields: n.getFields,
              setPreserve: n.setPreserve,
              getInitialValue: n.getInitialValue,
              registerWatch: n.registerWatch,
            })
          : (Xt(!1, '`getInternalHooks` is internal usage. Should not call directly.'), null);
      }),
      L(this, 'useSubscribe', function (r) {
        n.subscribable = r;
      }),
      L(this, 'prevWithoutPreserves', null),
      L(this, 'setInitialValues', function (r, i) {
        if (((n.initialValues = r || {}), i)) {
          var o,
            a = So(r, n.store);
          (o = n.prevWithoutPreserves) === null ||
            o === void 0 ||
            o.map(function (l) {
              var s = l.key;
              a = Kn(a, s, sr(r, s));
            }),
            (n.prevWithoutPreserves = null),
            n.updateStore(a);
        }
      }),
      L(this, 'destroyForm', function (r) {
        if (r) n.updateStore({});
        else {
          var i = new to();
          n.getFieldEntities(!0).forEach(function (o) {
            n.isMergedPreserve(o.isPreserve()) || i.set(o.getNamePath(), !0);
          }),
            (n.prevWithoutPreserves = i);
        }
      }),
      L(this, 'getInitialValue', function (r) {
        var i = sr(n.initialValues, r);
        return r.length ? So(i) : i;
      }),
      L(this, 'setCallbacks', function (r) {
        n.callbacks = r;
      }),
      L(this, 'setValidateMessages', function (r) {
        n.validateMessages = r;
      }),
      L(this, 'setPreserve', function (r) {
        n.preserve = r;
      }),
      L(this, 'watchList', []),
      L(this, 'registerWatch', function (r) {
        return (
          n.watchList.push(r),
          function () {
            n.watchList = n.watchList.filter(function (i) {
              return i !== r;
            });
          }
        );
      }),
      L(this, 'notifyWatch', function () {
        var r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
        if (n.watchList.length) {
          var i = n.getFieldsValue(),
            o = n.getFieldsValue(!0);
          n.watchList.forEach(function (a) {
            a(i, o, r);
          });
        }
      }),
      L(this, 'timeoutId', null),
      L(this, 'warningUnhooked', function () {}),
      L(this, 'updateStore', function (r) {
        n.store = r;
      }),
      L(this, 'getFieldEntities', function () {
        var r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1;
        return r
          ? n.fieldEntities.filter(function (i) {
              return i.getNamePath().length;
            })
          : n.fieldEntities;
      }),
      L(this, 'getFieldsMap', function () {
        var r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1,
          i = new to();
        return (
          n.getFieldEntities(r).forEach(function (o) {
            var a = o.getNamePath();
            i.set(a, o);
          }),
          i
        );
      }),
      L(this, 'getFieldEntitiesForNamePathList', function (r) {
        if (!r) return n.getFieldEntities(!0);
        var i = n.getFieldsMap(!0);
        return r.map(function (o) {
          var a = lt(o);
          return i.get(a) || { INVALIDATE_NAME_PATH: lt(o) };
        });
      }),
      L(this, 'getFieldsValue', function (r, i) {
        n.warningUnhooked();
        var o, a, l;
        if (
          (r === !0 || Array.isArray(r)
            ? ((o = r), (a = i))
            : r && oe(r) === 'object' && ((l = r.strict), (a = r.filter)),
          o === !0 && !a)
        )
          return n.store;
        var s = n.getFieldEntitiesForNamePathList(Array.isArray(o) ? o : null),
          u = [];
        return (
          s.forEach(function (c) {
            var f,
              v,
              y = 'INVALIDATE_NAME_PATH' in c ? c.INVALIDATE_NAME_PATH : c.getNamePath();
            if (l) {
              var g, C;
              if ((g = (C = c).isList) !== null && g !== void 0 && g.call(C)) return;
            } else if (!o && (f = (v = c).isListField) !== null && f !== void 0 && f.call(v))
              return;
            if (!a) u.push(y);
            else {
              var w = 'getMeta' in c ? c.getMeta() : null;
              a(w) && u.push(y);
            }
          }),
          $5(n.store, u.map(lt))
        );
      }),
      L(this, 'getFieldValue', function (r) {
        n.warningUnhooked();
        var i = lt(r);
        return sr(n.store, i);
      }),
      L(this, 'getFieldsError', function (r) {
        n.warningUnhooked();
        var i = n.getFieldEntitiesForNamePathList(r);
        return i.map(function (o, a) {
          return o && !('INVALIDATE_NAME_PATH' in o)
            ? { name: o.getNamePath(), errors: o.getErrors(), warnings: o.getWarnings() }
            : { name: lt(r[a]), errors: [], warnings: [] };
        });
      }),
      L(this, 'getFieldError', function (r) {
        n.warningUnhooked();
        var i = lt(r),
          o = n.getFieldsError([i])[0];
        return o.errors;
      }),
      L(this, 'getFieldWarning', function (r) {
        n.warningUnhooked();
        var i = lt(r),
          o = n.getFieldsError([i])[0];
        return o.warnings;
      }),
      L(this, 'isFieldsTouched', function () {
        n.warningUnhooked();
        for (var r = arguments.length, i = new Array(r), o = 0; o < r; o++) i[o] = arguments[o];
        var a = i[0],
          l = i[1],
          s,
          u = !1;
        i.length === 0
          ? (s = null)
          : i.length === 1
            ? Array.isArray(a)
              ? ((s = a.map(lt)), (u = !1))
              : ((s = null), (u = a))
            : ((s = a.map(lt)), (u = l));
        var c = n.getFieldEntities(!0),
          f = function (w) {
            return w.isFieldTouched();
          };
        if (!s)
          return u
            ? c.every(function (C) {
                return f(C) || C.isList();
              })
            : c.some(f);
        var v = new to();
        s.forEach(function (C) {
          v.set(C, []);
        }),
          c.forEach(function (C) {
            var w = C.getNamePath();
            s.forEach(function (p) {
              p.every(function (m, h) {
                return w[h] === m;
              }) &&
                v.update(p, function (m) {
                  return [].concat(J(m), [C]);
                });
            });
          });
        var y = function (w) {
            return w.some(f);
          },
          g = v.map(function (C) {
            var w = C.value;
            return w;
          });
        return u ? g.every(y) : g.some(y);
      }),
      L(this, 'isFieldTouched', function (r) {
        return n.warningUnhooked(), n.isFieldsTouched([r]);
      }),
      L(this, 'isFieldsValidating', function (r) {
        n.warningUnhooked();
        var i = n.getFieldEntities();
        if (!r)
          return i.some(function (a) {
            return a.isFieldValidating();
          });
        var o = r.map(lt);
        return i.some(function (a) {
          var l = a.getNamePath();
          return _o(o, l) && a.isFieldValidating();
        });
      }),
      L(this, 'isFieldValidating', function (r) {
        return n.warningUnhooked(), n.isFieldsValidating([r]);
      }),
      L(this, 'resetWithFieldInitialValue', function () {
        var r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {},
          i = new to(),
          o = n.getFieldEntities(!0);
        o.forEach(function (s) {
          var u = s.props.initialValue,
            c = s.getNamePath();
          if (u !== void 0) {
            var f = i.get(c) || new Set();
            f.add({ entity: s, value: u }), i.set(c, f);
          }
        });
        var a = function (u) {
            u.forEach(function (c) {
              var f = c.props.initialValue;
              if (f !== void 0) {
                var v = c.getNamePath(),
                  y = n.getInitialValue(v);
                if (y !== void 0)
                  Xt(
                    !1,
                    "Form already set 'initialValues' with path '".concat(
                      v.join('.'),
                      "'. Field can not overwrite it.",
                    ),
                  );
                else {
                  var g = i.get(v);
                  if (g && g.size > 1)
                    Xt(
                      !1,
                      "Multiple Field with path '".concat(
                        v.join('.'),
                        "' set 'initialValue'. Can not decide which one to pick.",
                      ),
                    );
                  else if (g) {
                    var C = n.getFieldValue(v),
                      w = c.isListField();
                    !w &&
                      (!r.skipExist || C === void 0) &&
                      n.updateStore(Kn(n.store, v, J(g)[0].value));
                  }
                }
              }
            });
          },
          l;
        r.entities
          ? (l = r.entities)
          : r.namePathList
            ? ((l = []),
              r.namePathList.forEach(function (s) {
                var u = i.get(s);
                if (u) {
                  var c;
                  (c = l).push.apply(
                    c,
                    J(
                      J(u).map(function (f) {
                        return f.entity;
                      }),
                    ),
                  );
                }
              }))
            : (l = o),
          a(l);
      }),
      L(this, 'resetFields', function (r) {
        n.warningUnhooked();
        var i = n.store;
        if (!r) {
          n.updateStore(So(n.initialValues)),
            n.resetWithFieldInitialValue(),
            n.notifyObservers(i, null, { type: 'reset' }),
            n.notifyWatch();
          return;
        }
        var o = r.map(lt);
        o.forEach(function (a) {
          var l = n.getInitialValue(a);
          n.updateStore(Kn(n.store, a, l));
        }),
          n.resetWithFieldInitialValue({ namePathList: o }),
          n.notifyObservers(i, o, { type: 'reset' }),
          n.notifyWatch(o);
      }),
      L(this, 'setFields', function (r) {
        n.warningUnhooked();
        var i = n.store,
          o = [];
        r.forEach(function (a) {
          var l = a.name,
            s = ze(a, ow),
            u = lt(l);
          o.push(u),
            'value' in s && n.updateStore(Kn(n.store, u, s.value)),
            n.notifyObservers(i, [u], { type: 'setField', data: a });
        }),
          n.notifyWatch(o);
      }),
      L(this, 'getFields', function () {
        var r = n.getFieldEntities(!0),
          i = r.map(function (o) {
            var a = o.getNamePath(),
              l = o.getMeta(),
              s = T(T({}, l), {}, { name: a, value: n.getFieldValue(a) });
            return Object.defineProperty(s, 'originRCField', { value: !0 }), s;
          });
        return i;
      }),
      L(this, 'initEntityValue', function (r) {
        var i = r.props.initialValue;
        if (i !== void 0) {
          var o = r.getNamePath(),
            a = sr(n.store, o);
          a === void 0 && n.updateStore(Kn(n.store, o, i));
        }
      }),
      L(this, 'isMergedPreserve', function (r) {
        var i = r !== void 0 ? r : n.preserve;
        return i ?? !0;
      }),
      L(this, 'registerField', function (r) {
        n.fieldEntities.push(r);
        var i = r.getNamePath();
        if ((n.notifyWatch([i]), r.props.initialValue !== void 0)) {
          var o = n.store;
          n.resetWithFieldInitialValue({ entities: [r], skipExist: !0 }),
            n.notifyObservers(o, [r.getNamePath()], { type: 'valueUpdate', source: 'internal' });
        }
        return function (a, l) {
          var s = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : [];
          if (
            ((n.fieldEntities = n.fieldEntities.filter(function (f) {
              return f !== r;
            })),
            !n.isMergedPreserve(l) && (!a || s.length > 1))
          ) {
            var u = a ? void 0 : n.getInitialValue(i);
            if (
              i.length &&
              n.getFieldValue(i) !== u &&
              n.fieldEntities.every(function (f) {
                return !rv(f.getNamePath(), i);
              })
            ) {
              var c = n.store;
              n.updateStore(Kn(c, i, u, !0)),
                n.notifyObservers(c, [i], { type: 'remove' }),
                n.triggerDependenciesUpdate(c, i);
            }
          }
          n.notifyWatch([i]);
        };
      }),
      L(this, 'dispatch', function (r) {
        switch (r.type) {
          case 'updateValue': {
            var i = r.namePath,
              o = r.value;
            n.updateValue(i, o);
            break;
          }
          case 'validateField': {
            var a = r.namePath,
              l = r.triggerName;
            n.validateFields([a], { triggerName: l });
            break;
          }
        }
      }),
      L(this, 'notifyObservers', function (r, i, o) {
        if (n.subscribable) {
          var a = T(T({}, o), {}, { store: n.getFieldsValue(!0) });
          n.getFieldEntities().forEach(function (l) {
            var s = l.onStoreChange;
            s(r, i, a);
          });
        } else n.forceRootUpdate();
      }),
      L(this, 'triggerDependenciesUpdate', function (r, i) {
        var o = n.getDependencyChildrenFields(i);
        return (
          o.length && n.validateFields(o),
          n.notifyObservers(r, o, { type: 'dependenciesUpdate', relatedFields: [i].concat(J(o)) }),
          o
        );
      }),
      L(this, 'updateValue', function (r, i) {
        var o = lt(r),
          a = n.store;
        n.updateStore(Kn(n.store, o, i)),
          n.notifyObservers(a, [o], { type: 'valueUpdate', source: 'internal' }),
          n.notifyWatch([o]);
        var l = n.triggerDependenciesUpdate(a, o),
          s = n.callbacks.onValuesChange;
        if (s) {
          var u = $5(n.store, [o]);
          s(u, n.getFieldsValue());
        }
        n.triggerOnFieldsChange([o].concat(J(l)));
      }),
      L(this, 'setFieldsValue', function (r) {
        n.warningUnhooked();
        var i = n.store;
        if (r) {
          var o = So(n.store, r);
          n.updateStore(o);
        }
        n.notifyObservers(i, null, { type: 'valueUpdate', source: 'external' }), n.notifyWatch();
      }),
      L(this, 'setFieldValue', function (r, i) {
        n.setFields([{ name: r, value: i }]);
      }),
      L(this, 'getDependencyChildrenFields', function (r) {
        var i = new Set(),
          o = [],
          a = new to();
        n.getFieldEntities().forEach(function (s) {
          var u = s.props.dependencies;
          (u || []).forEach(function (c) {
            var f = lt(c);
            a.update(f, function () {
              var v = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : new Set();
              return v.add(s), v;
            });
          });
        });
        var l = function s(u) {
          var c = a.get(u) || new Set();
          c.forEach(function (f) {
            if (!i.has(f)) {
              i.add(f);
              var v = f.getNamePath();
              f.isFieldDirty() && v.length && (o.push(v), s(v));
            }
          });
        };
        return l(r), o;
      }),
      L(this, 'triggerOnFieldsChange', function (r, i) {
        var o = n.callbacks.onFieldsChange;
        if (o) {
          var a = n.getFields();
          if (i) {
            var l = new to();
            i.forEach(function (u) {
              var c = u.name,
                f = u.errors;
              l.set(c, f);
            }),
              a.forEach(function (u) {
                u.errors = l.get(u.name) || u.errors;
              });
          }
          var s = a.filter(function (u) {
            var c = u.name;
            return _o(r, c);
          });
          s.length && o(s, a);
        }
      }),
      L(this, 'validateFields', function (r, i) {
        n.warningUnhooked();
        var o, a;
        Array.isArray(r) || typeof r == 'string' || typeof i == 'string'
          ? ((o = r), (a = i))
          : (a = r);
        var l = !!o,
          s = l ? o.map(lt) : [],
          u = [],
          c = String(Date.now()),
          f = new Set(),
          v = a || {},
          y = v.recursive,
          g = v.dirty;
        n.getFieldEntities(!0).forEach(function (m) {
          if (
            (l || s.push(m.getNamePath()),
            !(!m.props.rules || !m.props.rules.length) && !(g && !m.isFieldDirty()))
          ) {
            var h = m.getNamePath();
            if ((f.add(h.join(c)), !l || _o(s, h, y))) {
              var S = m.validateRules(T({ validateMessages: T(T({}, nv), n.validateMessages) }, a));
              u.push(
                S.then(function () {
                  return { name: h, errors: [], warnings: [] };
                }).catch(function (x) {
                  var b,
                    E = [],
                    P = [];
                  return (
                    (b = x.forEach) === null ||
                      b === void 0 ||
                      b.call(x, function (M) {
                        var I = M.rule.warningOnly,
                          F = M.errors;
                        I ? P.push.apply(P, J(F)) : E.push.apply(E, J(F));
                      }),
                    E.length
                      ? Promise.reject({ name: h, errors: E, warnings: P })
                      : { name: h, errors: E, warnings: P }
                  );
                }),
              );
            }
          }
        });
        var C = iw(u);
        (n.lastValidatePromise = C),
          C.catch(function (m) {
            return m;
          }).then(function (m) {
            var h = m.map(function (S) {
              var x = S.name;
              return x;
            });
            n.notifyObservers(n.store, h, { type: 'validateFinish' }),
              n.triggerOnFieldsChange(h, m);
          });
        var w = C.then(function () {
          return n.lastValidatePromise === C
            ? Promise.resolve(n.getFieldsValue(s))
            : Promise.reject([]);
        }).catch(function (m) {
          var h = m.filter(function (S) {
            return S && S.errors.length;
          });
          return Promise.reject({
            values: n.getFieldsValue(s),
            errorFields: h,
            outOfDate: n.lastValidatePromise !== C,
          });
        });
        w.catch(function (m) {
          return m;
        });
        var p = s.filter(function (m) {
          return f.has(m.join(c));
        });
        return n.triggerOnFieldsChange(p), w;
      }),
      L(this, 'submit', function () {
        n.warningUnhooked(),
          n
            .validateFields()
            .then(function (r) {
              var i = n.callbacks.onFinish;
              if (i)
                try {
                  i(r);
                } catch (o) {
                  console.error(o);
                }
            })
            .catch(function (r) {
              var i = n.callbacks.onFinishFailed;
              i && i(r);
            });
      }),
      (this.forceRootUpdate = t);
  });
function av(e) {
  var t = d.useRef(),
    n = d.useState({}),
    r = B(n, 2),
    i = r[1];
  if (!t.current)
    if (e) t.current = e;
    else {
      var o = function () {
          i({});
        },
        a = new aw(o);
      t.current = a.getForm();
    }
  return [t.current];
}
var A2 = d.createContext({
    triggerFormChange: function () {},
    triggerFormFinish: function () {},
    registerForm: function () {},
    unregisterForm: function () {},
  }),
  lw = function (t) {
    var n = t.validateMessages,
      r = t.onFormChange,
      i = t.onFormFinish,
      o = t.children,
      a = d.useContext(A2),
      l = d.useRef({});
    return d.createElement(
      A2.Provider,
      {
        value: T(
          T({}, a),
          {},
          {
            validateMessages: T(T({}, a.validateMessages), n),
            triggerFormChange: function (u, c) {
              r && r(u, { changedFields: c, forms: l.current }), a.triggerFormChange(u, c);
            },
            triggerFormFinish: function (u, c) {
              i && i(u, { values: c, forms: l.current }), a.triggerFormFinish(u, c);
            },
            registerForm: function (u, c) {
              u && (l.current = T(T({}, l.current), {}, L({}, u, c))), a.registerForm(u, c);
            },
            unregisterForm: function (u) {
              var c = T({}, l.current);
              delete c[u], (l.current = c), a.unregisterForm(u);
            },
          },
        ),
      },
      o,
    );
  },
  sw = [
    'name',
    'initialValues',
    'fields',
    'form',
    'preserve',
    'children',
    'component',
    'validateMessages',
    'validateTrigger',
    'onValuesChange',
    'onFieldsChange',
    'onFinish',
    'onFinishFailed',
    'clearOnDestroy',
  ],
  uw = function (t, n) {
    var r = t.name,
      i = t.initialValues,
      o = t.fields,
      a = t.form,
      l = t.preserve,
      s = t.children,
      u = t.component,
      c = u === void 0 ? 'form' : u,
      f = t.validateMessages,
      v = t.validateTrigger,
      y = v === void 0 ? 'onChange' : v,
      g = t.onValuesChange,
      C = t.onFieldsChange,
      w = t.onFinish,
      p = t.onFinishFailed,
      m = t.clearOnDestroy,
      h = ze(t, sw),
      S = d.useRef(null),
      x = d.useContext(A2),
      b = av(a),
      E = B(b, 1),
      P = E[0],
      M = P.getInternalHooks(Li),
      I = M.useSubscribe,
      F = M.setInitialValues,
      z = M.setCallbacks,
      j = M.setValidateMessages,
      A = M.setPreserve,
      W = M.destroyForm;
    d.useImperativeHandle(n, function () {
      return T(T({}, P), {}, { nativeElement: S.current });
    }),
      d.useEffect(
        function () {
          return (
            x.registerForm(r, P),
            function () {
              x.unregisterForm(r);
            }
          );
        },
        [x, P, r],
      ),
      j(T(T({}, x.validateMessages), f)),
      z({
        onValuesChange: g,
        onFieldsChange: function (H) {
          if ((x.triggerFormChange(r, H), C)) {
            for (var Q = arguments.length, ee = new Array(Q > 1 ? Q - 1 : 0), te = 1; te < Q; te++)
              ee[te - 1] = arguments[te];
            C.apply(void 0, [H].concat(ee));
          }
        },
        onFinish: function (H) {
          x.triggerFormFinish(r, H), w && w(H);
        },
        onFinishFailed: p,
      }),
      A(l);
    var O = d.useRef(null);
    F(i, !O.current),
      O.current || (O.current = !0),
      d.useEffect(function () {
        return function () {
          return W(m);
        };
      }, []);
    var R,
      k = typeof s == 'function';
    if (k) {
      var $ = P.getFieldsValue(!0);
      R = s($, P);
    } else R = s;
    I(!k);
    var N = d.useRef();
    d.useEffect(
      function () {
        ew(N.current || [], o || []) || P.setFields(o || []), (N.current = o);
      },
      [o, P],
    );
    var D = d.useMemo(
        function () {
          return T(T({}, P), {}, { validateTrigger: y });
        },
        [P, y],
      ),
      V = d.createElement(
        pu.Provider,
        { value: null },
        d.createElement(Wo.Provider, { value: D }, R),
      );
    return c === !1
      ? V
      : d.createElement(
          c,
          ye({}, h, {
            ref: S,
            onSubmit: function (H) {
              H.preventDefault(), H.stopPropagation(), P.submit();
            },
            onReset: function (H) {
              var Q;
              H.preventDefault(),
                P.resetFields(),
                (Q = h.onReset) === null || Q === void 0 || Q.call(h, H);
            },
          }),
          V,
        );
  };
function N5(e) {
  try {
    return JSON.stringify(e);
  } catch {
    return Math.random();
  }
}
function cw() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
  var r = t[0],
    i = t[1],
    o = i === void 0 ? {} : i,
    a = yC(o) ? { form: o } : o,
    l = a.form,
    s = d.useState(),
    u = B(s, 2),
    c = u[0],
    f = u[1],
    v = d.useMemo(
      function () {
        return N5(c);
      },
      [c],
    ),
    y = d.useRef(v);
  y.current = v;
  var g = d.useContext(Wo),
    C = l || g,
    w = C && C._init,
    p = lt(r),
    m = d.useRef(p);
  return (
    (m.current = p),
    d.useEffect(
      function () {
        if (w) {
          var h = C.getFieldsValue,
            S = C.getInternalHooks,
            x = S(Li),
            b = x.registerWatch,
            E = function (F, z) {
              var j = a.preserve ? z : F;
              return typeof r == 'function' ? r(j) : sr(j, m.current);
            },
            P = b(function (I, F) {
              var z = E(I, F),
                j = N5(z);
              y.current !== j && ((y.current = j), f(z));
            }),
            M = E(h(), h(!0));
          return c !== M && f(M), P;
        }
      },
      [w],
    ),
    c
  );
}
var fw = d.forwardRef(uw),
  Ol = fw;
Ol.FormProvider = lw;
Ol.Field = iv;
Ol.List = rw;
Ol.useForm = av;
Ol.useWatch = cw;
const F5 = d.createContext({}),
  dw = (e) => {
    let { children: t, status: n, override: r } = e;
    const i = d.useContext(F5),
      o = d.useMemo(() => {
        const a = Object.assign({}, i);
        return (
          r && delete a.isFormItemInput,
          n && (delete a.status, delete a.hasFeedback, delete a.feedbackIcon),
          a
        );
      }, [n, r, i]);
    return d.createElement(F5.Provider, { value: o }, t);
  },
  vw = (e) => {
    const { space: t, form: n, children: r } = e;
    if (r == null) return null;
    let i = r;
    return (
      n && (i = mt.createElement(dw, { override: !0, status: !0 }, i)),
      t && (i = mt.createElement(lC, null, i)),
      i
    );
  },
  mw = (e) => ({
    [e.componentCls]: {
      [`${e.antCls}-motion-collapse-legacy`]: {
        overflow: 'hidden',
        '&-active': {
          transition: `height ${e.motionDurationMid} ${e.motionEaseInOut},
        opacity ${e.motionDurationMid} ${e.motionEaseInOut} !important`,
        },
      },
      [`${e.antCls}-motion-collapse`]: {
        overflow: 'hidden',
        transition: `height ${e.motionDurationMid} ${e.motionEaseInOut},
        opacity ${e.motionDurationMid} ${e.motionEaseInOut} !important`,
      },
    },
  }),
  pw = (e) => ({ animationDuration: e, animationFillMode: 'both' }),
  hw = (e) => ({ animationDuration: e, animationFillMode: 'both' }),
  lv = function (e, t, n, r) {
    const o = (arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : !1) ? '&' : '';
    return {
      [`
      ${o}${e}-enter,
      ${o}${e}-appear
    `]: Object.assign(Object.assign({}, pw(r)), { animationPlayState: 'paused' }),
      [`${o}${e}-leave`]: Object.assign(Object.assign({}, hw(r)), { animationPlayState: 'paused' }),
      [`
      ${o}${e}-enter${e}-enter-active,
      ${o}${e}-appear${e}-appear-active
    `]: { animationName: t, animationPlayState: 'running' },
      [`${o}${e}-leave${e}-leave-active`]: {
        animationName: n,
        animationPlayState: 'running',
        pointerEvents: 'none',
      },
    };
  },
  gw = new ht('antSlideUpIn', {
    '0%': { transform: 'scaleY(0.8)', transformOrigin: '0% 0%', opacity: 0 },
    '100%': { transform: 'scaleY(1)', transformOrigin: '0% 0%', opacity: 1 },
  }),
  yw = new ht('antSlideUpOut', {
    '0%': { transform: 'scaleY(1)', transformOrigin: '0% 0%', opacity: 1 },
    '100%': { transform: 'scaleY(0.8)', transformOrigin: '0% 0%', opacity: 0 },
  }),
  Cw = new ht('antSlideDownIn', {
    '0%': { transform: 'scaleY(0.8)', transformOrigin: '100% 100%', opacity: 0 },
    '100%': { transform: 'scaleY(1)', transformOrigin: '100% 100%', opacity: 1 },
  }),
  ww = new ht('antSlideDownOut', {
    '0%': { transform: 'scaleY(1)', transformOrigin: '100% 100%', opacity: 1 },
    '100%': { transform: 'scaleY(0.8)', transformOrigin: '100% 100%', opacity: 0 },
  }),
  Sw = new ht('antSlideLeftIn', {
    '0%': { transform: 'scaleX(0.8)', transformOrigin: '0% 0%', opacity: 0 },
    '100%': { transform: 'scaleX(1)', transformOrigin: '0% 0%', opacity: 1 },
  }),
  xw = new ht('antSlideLeftOut', {
    '0%': { transform: 'scaleX(1)', transformOrigin: '0% 0%', opacity: 1 },
    '100%': { transform: 'scaleX(0.8)', transformOrigin: '0% 0%', opacity: 0 },
  }),
  bw = new ht('antSlideRightIn', {
    '0%': { transform: 'scaleX(0.8)', transformOrigin: '100% 0%', opacity: 0 },
    '100%': { transform: 'scaleX(1)', transformOrigin: '100% 0%', opacity: 1 },
  }),
  Ew = new ht('antSlideRightOut', {
    '0%': { transform: 'scaleX(1)', transformOrigin: '100% 0%', opacity: 1 },
    '100%': { transform: 'scaleX(0.8)', transformOrigin: '100% 0%', opacity: 0 },
  }),
  kw = {
    'slide-up': { inKeyframes: gw, outKeyframes: yw },
    'slide-down': { inKeyframes: Cw, outKeyframes: ww },
    'slide-left': { inKeyframes: Sw, outKeyframes: xw },
    'slide-right': { inKeyframes: bw, outKeyframes: Ew },
  },
  j5 = (e, t) => {
    const { antCls: n } = e,
      r = `${n}-${t}`,
      { inKeyframes: i, outKeyframes: o } = kw[t];
    return [
      lv(r, i, o, e.motionDurationMid),
      {
        [`
      ${r}-enter,
      ${r}-appear
    `]: {
          transform: 'scale(0)',
          transformOrigin: '0% 0%',
          opacity: 0,
          animationTimingFunction: e.motionEaseOutQuint,
          '&-prepare': { transform: 'scale(1)' },
        },
        [`${r}-leave`]: { animationTimingFunction: e.motionEaseInQuint },
      },
    ];
  },
  Pw = new ht('antZoomIn', {
    '0%': { transform: 'scale(0.2)', opacity: 0 },
    '100%': { transform: 'scale(1)', opacity: 1 },
  }),
  Mw = new ht('antZoomOut', {
    '0%': { transform: 'scale(1)' },
    '100%': { transform: 'scale(0.2)', opacity: 0 },
  }),
  A5 = new ht('antZoomBigIn', {
    '0%': { transform: 'scale(0.8)', opacity: 0 },
    '100%': { transform: 'scale(1)', opacity: 1 },
  }),
  z5 = new ht('antZoomBigOut', {
    '0%': { transform: 'scale(1)' },
    '100%': { transform: 'scale(0.8)', opacity: 0 },
  }),
  Rw = new ht('antZoomUpIn', {
    '0%': { transform: 'scale(0.8)', transformOrigin: '50% 0%', opacity: 0 },
    '100%': { transform: 'scale(1)', transformOrigin: '50% 0%' },
  }),
  Lw = new ht('antZoomUpOut', {
    '0%': { transform: 'scale(1)', transformOrigin: '50% 0%' },
    '100%': { transform: 'scale(0.8)', transformOrigin: '50% 0%', opacity: 0 },
  }),
  Iw = new ht('antZoomLeftIn', {
    '0%': { transform: 'scale(0.8)', transformOrigin: '0% 50%', opacity: 0 },
    '100%': { transform: 'scale(1)', transformOrigin: '0% 50%' },
  }),
  _w = new ht('antZoomLeftOut', {
    '0%': { transform: 'scale(1)', transformOrigin: '0% 50%' },
    '100%': { transform: 'scale(0.8)', transformOrigin: '0% 50%', opacity: 0 },
  }),
  Ow = new ht('antZoomRightIn', {
    '0%': { transform: 'scale(0.8)', transformOrigin: '100% 50%', opacity: 0 },
    '100%': { transform: 'scale(1)', transformOrigin: '100% 50%' },
  }),
  $w = new ht('antZoomRightOut', {
    '0%': { transform: 'scale(1)', transformOrigin: '100% 50%' },
    '100%': { transform: 'scale(0.8)', transformOrigin: '100% 50%', opacity: 0 },
  }),
  Tw = new ht('antZoomDownIn', {
    '0%': { transform: 'scale(0.8)', transformOrigin: '50% 100%', opacity: 0 },
    '100%': { transform: 'scale(1)', transformOrigin: '50% 100%' },
  }),
  Nw = new ht('antZoomDownOut', {
    '0%': { transform: 'scale(1)', transformOrigin: '50% 100%' },
    '100%': { transform: 'scale(0.8)', transformOrigin: '50% 100%', opacity: 0 },
  }),
  Fw = {
    zoom: { inKeyframes: Pw, outKeyframes: Mw },
    'zoom-big': { inKeyframes: A5, outKeyframes: z5 },
    'zoom-big-fast': { inKeyframes: A5, outKeyframes: z5 },
    'zoom-left': { inKeyframes: Iw, outKeyframes: _w },
    'zoom-right': { inKeyframes: Ow, outKeyframes: $w },
    'zoom-up': { inKeyframes: Rw, outKeyframes: Lw },
    'zoom-down': { inKeyframes: Tw, outKeyframes: Nw },
  },
  sv = (e, t) => {
    const { antCls: n } = e,
      r = `${n}-${t}`,
      { inKeyframes: i, outKeyframes: o } = Fw[t];
    return [
      lv(r, i, o, t === 'zoom-big-fast' ? e.motionDurationFast : e.motionDurationMid),
      {
        [`
        ${r}-enter,
        ${r}-appear
      `]: {
          transform: 'scale(0)',
          opacity: 0,
          animationTimingFunction: e.motionEaseOutCirc,
          '&-prepare': { transform: 'none' },
        },
        [`${r}-leave`]: { animationTimingFunction: e.motionEaseInOutCirc },
      },
    ];
  },
  jw = function () {
    if (typeof navigator > 'u' || typeof window > 'u') return !1;
    var e = navigator.userAgent || navigator.vendor || window.opera;
    return (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
        e,
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw-(n|u)|c55\/|capi|ccwa|cdm-|cell|chtm|cldc|cmd-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc-s|devi|dica|dmob|do(c|p)o|ds(12|-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(-|_)|g1 u|g560|gene|gf-5|g-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd-(m|p|t)|hei-|hi(pt|ta)|hp( i|ip)|hs-c|ht(c(-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i-(20|go|ma)|i230|iac( |-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|-[a-w])|libw|lynx|m1-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|-([1-8]|c))|phil|pire|pl(ay|uc)|pn-2|po(ck|rt|se)|prox|psio|pt-g|qa-a|qc(07|12|21|32|60|-[2-7]|i-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h-|oo|p-)|sdk\/|se(c(-|0|1)|47|mc|nd|ri)|sgh-|shar|sie(-|m)|sk-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h-|v-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl-|tdg-|tel(i|m)|tim-|t-mo|to(pl|sh)|ts(70|m-|m3|m5)|tx-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas-|your|zeto|zte-/i.test(
        e == null ? void 0 : e.substr(0, 4),
      )
    );
  };
var Aw = [
    'prefixCls',
    'invalidate',
    'item',
    'renderItem',
    'responsive',
    'responsiveDisabled',
    'registerSize',
    'itemKey',
    'className',
    'style',
    'children',
    'display',
    'order',
    'component',
  ],
  no = void 0;
function zw(e, t) {
  var n = e.prefixCls,
    r = e.invalidate,
    i = e.item,
    o = e.renderItem,
    a = e.responsive,
    l = e.responsiveDisabled,
    s = e.registerSize,
    u = e.itemKey,
    c = e.className,
    f = e.style,
    v = e.children,
    y = e.display,
    g = e.order,
    C = e.component,
    w = C === void 0 ? 'div' : C,
    p = ze(e, Aw),
    m = a && !y;
  function h(P) {
    s(u, P);
  }
  d.useEffect(function () {
    return function () {
      h(null);
    };
  }, []);
  var S = o && i !== no ? o(i) : v,
    x;
  r ||
    (x = {
      opacity: m ? 0 : 1,
      height: m ? 0 : no,
      overflowY: m ? 'hidden' : no,
      order: a ? g : no,
      pointerEvents: m ? 'none' : no,
      position: m ? 'absolute' : no,
    });
  var b = {};
  m && (b['aria-hidden'] = !0);
  var E = d.createElement(
    w,
    ye({ className: Ee(!r && n, c), style: T(T({}, x), f) }, b, p, { ref: t }),
    S,
  );
  return (
    a &&
      (E = d.createElement(
        Ml,
        {
          onResize: function (M) {
            var I = M.offsetWidth;
            h(I);
          },
          disabled: l,
        },
        E,
      )),
    E
  );
}
var Aa = d.forwardRef(zw);
Aa.displayName = 'Item';
function Dw(e) {
  if (typeof MessageChannel > 'u') Mr(e);
  else {
    var t = new MessageChannel();
    (t.port1.onmessage = function () {
      return e();
    }),
      t.port2.postMessage(void 0);
  }
}
function Vw() {
  var e = d.useRef(null),
    t = function (r) {
      e.current ||
        ((e.current = []),
        Dw(function () {
          El.unstable_batchedUpdates(function () {
            e.current.forEach(function (i) {
              i();
            }),
              (e.current = null);
          });
        })),
        e.current.push(r);
    };
  return t;
}
function va(e, t) {
  var n = d.useState(t),
    r = B(n, 2),
    i = r[0],
    o = r[1],
    a = on(function (l) {
      e(function () {
        o(l);
      });
    });
  return [i, a];
}
var hu = mt.createContext(null),
  Hw = ['component'],
  Bw = ['className'],
  Uw = ['className'],
  Ww = function (t, n) {
    var r = d.useContext(hu);
    if (!r) {
      var i = t.component,
        o = i === void 0 ? 'div' : i,
        a = ze(t, Hw);
      return d.createElement(o, ye({}, a, { ref: n }));
    }
    var l = r.className,
      s = ze(r, Bw),
      u = t.className,
      c = ze(t, Uw);
    return d.createElement(
      hu.Provider,
      { value: null },
      d.createElement(Aa, ye({ ref: n, className: Ee(l, u) }, s, c)),
    );
  },
  uv = d.forwardRef(Ww);
uv.displayName = 'RawItem';
var Kw = [
    'prefixCls',
    'data',
    'renderItem',
    'renderRawItem',
    'itemKey',
    'itemWidth',
    'ssr',
    'style',
    'className',
    'maxCount',
    'renderRest',
    'renderRawRest',
    'suffix',
    'component',
    'itemComponent',
    'onVisibleChange',
  ],
  cv = 'responsive',
  fv = 'invalidate';
function Zw(e) {
  return '+ '.concat(e.length, ' ...');
}
function Gw(e, t) {
  var n = e.prefixCls,
    r = n === void 0 ? 'rc-overflow' : n,
    i = e.data,
    o = i === void 0 ? [] : i,
    a = e.renderItem,
    l = e.renderRawItem,
    s = e.itemKey,
    u = e.itemWidth,
    c = u === void 0 ? 10 : u,
    f = e.ssr,
    v = e.style,
    y = e.className,
    g = e.maxCount,
    C = e.renderRest,
    w = e.renderRawRest,
    p = e.suffix,
    m = e.component,
    h = m === void 0 ? 'div' : m,
    S = e.itemComponent,
    x = e.onVisibleChange,
    b = ze(e, Kw),
    E = f === 'full',
    P = Vw(),
    M = va(P, null),
    I = B(M, 2),
    F = I[0],
    z = I[1],
    j = F || 0,
    A = va(P, new Map()),
    W = B(A, 2),
    O = W[0],
    R = W[1],
    k = va(P, 0),
    $ = B(k, 2),
    N = $[0],
    D = $[1],
    V = va(P, 0),
    Z = B(V, 2),
    H = Z[0],
    Q = Z[1],
    ee = va(P, 0),
    te = B(ee, 2),
    ve = te[0],
    Ie = te[1],
    fe = d.useState(null),
    me = B(fe, 2),
    ue = me[0],
    $e = me[1],
    Pe = d.useState(null),
    Te = B(Pe, 2),
    xe = Te[0],
    it = Te[1],
    pe = d.useMemo(
      function () {
        return xe === null && E ? Number.MAX_SAFE_INTEGER : xe || 0;
      },
      [xe, F],
    ),
    nt = d.useState(!1),
    he = B(nt, 2),
    ae = he[0],
    Be = he[1],
    X = ''.concat(r, '-item'),
    Ce = Math.max(N, H),
    Ue = g === cv,
    ke = o.length && Ue,
    xt = g === fv,
    bt = ke || (typeof g == 'number' && o.length > g),
    Mt = d.useMemo(
      function () {
        var ne = o;
        return (
          ke
            ? F === null && E
              ? (ne = o)
              : (ne = o.slice(0, Math.min(o.length, j / c)))
            : typeof g == 'number' && (ne = o.slice(0, g)),
          ne
        );
      },
      [o, c, F, g, ke],
    ),
    Et = d.useMemo(
      function () {
        return ke ? o.slice(pe + 1) : o.slice(Mt.length);
      },
      [o, Mt, ke, pe],
    ),
    gt = d.useCallback(
      function (ne, K) {
        var re;
        return typeof s == 'function'
          ? s(ne)
          : (re = s && (ne == null ? void 0 : ne[s])) !== null && re !== void 0
            ? re
            : K;
      },
      [s],
    ),
    Qe = d.useCallback(
      a ||
        function (ne) {
          return ne;
        },
      [a],
    );
  function We(ne, K, re) {
    (xe === ne && (K === void 0 || K === ue)) ||
      (it(ne), re || (Be(ne < o.length - 1), x == null || x(ne)), K !== void 0 && $e(K));
  }
  function Xe(ne, K) {
    z(K.clientWidth);
  }
  function Ne(ne, K) {
    R(function (re) {
      var we = new Map(re);
      return K === null ? we.delete(ne) : we.set(ne, K), we;
    });
  }
  function Ke(ne, K) {
    Q(K), D(H);
  }
  function ut(ne, K) {
    Ie(K);
  }
  function At(ne) {
    return O.get(gt(Mt[ne], ne));
  }
  Bt(
    function () {
      if (j && typeof Ce == 'number' && Mt) {
        var ne = ve,
          K = Mt.length,
          re = K - 1;
        if (!K) {
          We(0, null);
          return;
        }
        for (var we = 0; we < K; we += 1) {
          var de = At(we);
          if ((E && (de = de || 0), de === void 0)) {
            We(we - 1, void 0, !0);
            break;
          }
          if (((ne += de), (re === 0 && ne <= j) || (we === re - 1 && ne + At(re) <= j))) {
            We(re, null);
            break;
          } else if (ne + Ce > j) {
            We(we - 1, ne - de - ve + H);
            break;
          }
        }
        p && At(0) + ve > j && $e(null);
      }
    },
    [j, O, H, ve, gt, Mt],
  );
  var Dn = ae && !!Et.length,
    Sn = {};
  ue !== null && ke && (Sn = { position: 'absolute', left: ue, top: 0 });
  var Rt = { prefixCls: X, responsive: ke, component: S, invalidate: xt },
    Kt = l
      ? function (ne, K) {
          var re = gt(ne, K);
          return d.createElement(
            hu.Provider,
            {
              key: re,
              value: T(
                T({}, Rt),
                {},
                { order: K, item: ne, itemKey: re, registerSize: Ne, display: K <= pe },
              ),
            },
            l(ne, K),
          );
        }
      : function (ne, K) {
          var re = gt(ne, K);
          return d.createElement(
            Aa,
            ye({}, Rt, {
              order: K,
              key: re,
              item: ne,
              renderItem: Qe,
              itemKey: re,
              registerSize: Ne,
              display: K <= pe,
            }),
          );
        },
    ct,
    Ye = {
      order: Dn ? pe : Number.MAX_SAFE_INTEGER,
      className: ''.concat(X, '-rest'),
      registerSize: Ke,
      display: Dn,
    };
  if (w) w && (ct = d.createElement(hu.Provider, { value: T(T({}, Rt), Ye) }, w(Et)));
  else {
    var ot = C || Zw;
    ct = d.createElement(Aa, ye({}, Rt, Ye), typeof ot == 'function' ? ot(Et) : ot);
  }
  var Me = d.createElement(
    h,
    ye({ className: Ee(!xt && r, y), style: v, ref: t }, b),
    Mt.map(Kt),
    bt ? ct : null,
    p &&
      d.createElement(
        Aa,
        ye({}, Rt, {
          responsive: Ue,
          responsiveDisabled: !ke,
          order: pe,
          className: ''.concat(X, '-suffix'),
          registerSize: ut,
          display: !0,
          style: Sn,
        }),
        p,
      ),
  );
  return Ue && (Me = d.createElement(Ml, { onResize: Xe, disabled: !ke }, Me)), Me;
}
var Lr = d.forwardRef(Gw);
Lr.displayName = 'Overflow';
Lr.Item = uv;
Lr.RESPONSIVE = cv;
Lr.INVALIDATE = fv;
function qw(e) {
  var t = e.prefixCls,
    n = e.align,
    r = e.arrow,
    i = e.arrowPos,
    o = r || {},
    a = o.className,
    l = o.content,
    s = i.x,
    u = s === void 0 ? 0 : s,
    c = i.y,
    f = c === void 0 ? 0 : c,
    v = d.useRef();
  if (!n || !n.points) return null;
  var y = { position: 'absolute' };
  if (n.autoArrow !== !1) {
    var g = n.points[0],
      C = n.points[1],
      w = g[0],
      p = g[1],
      m = C[0],
      h = C[1];
    w === m || !['t', 'b'].includes(w) ? (y.top = f) : w === 't' ? (y.top = 0) : (y.bottom = 0),
      p === h || !['l', 'r'].includes(p) ? (y.left = u) : p === 'l' ? (y.left = 0) : (y.right = 0);
  }
  return d.createElement('div', { ref: v, className: Ee(''.concat(t, '-arrow'), a), style: y }, l);
}
function Qw(e) {
  var t = e.prefixCls,
    n = e.open,
    r = e.zIndex,
    i = e.mask,
    o = e.motion;
  return i
    ? d.createElement(
        tc,
        ye({}, o, { motionAppear: !0, visible: n, removeOnLeave: !0 }),
        function (a) {
          var l = a.className;
          return d.createElement('div', {
            style: { zIndex: r },
            className: Ee(''.concat(t, '-mask'), l),
          });
        },
      )
    : null;
}
var Xw = d.memo(
    function (e) {
      var t = e.children;
      return t;
    },
    function (e, t) {
      return t.cache;
    },
  ),
  Yw = d.forwardRef(function (e, t) {
    var n = e.popup,
      r = e.className,
      i = e.prefixCls,
      o = e.style,
      a = e.target,
      l = e.onVisibleChanged,
      s = e.open,
      u = e.keepDom,
      c = e.fresh,
      f = e.onClick,
      v = e.mask,
      y = e.arrow,
      g = e.arrowPos,
      C = e.align,
      w = e.motion,
      p = e.maskMotion,
      m = e.forceRender,
      h = e.getPopupContainer,
      S = e.autoDestroy,
      x = e.portal,
      b = e.zIndex,
      E = e.onMouseEnter,
      P = e.onMouseLeave,
      M = e.onPointerEnter,
      I = e.ready,
      F = e.offsetX,
      z = e.offsetY,
      j = e.offsetR,
      A = e.offsetB,
      W = e.onAlign,
      O = e.onPrepare,
      R = e.stretch,
      k = e.targetWidth,
      $ = e.targetHeight,
      N = typeof n == 'function' ? n() : n,
      D = s || u,
      V = (h == null ? void 0 : h.length) > 0,
      Z = d.useState(!h || !V),
      H = B(Z, 2),
      Q = H[0],
      ee = H[1];
    if (
      (Bt(
        function () {
          !Q && V && a && ee(!0);
        },
        [Q, V, a],
      ),
      !Q)
    )
      return null;
    var te = 'auto',
      ve = { left: '-1000vw', top: '-1000vh', right: te, bottom: te };
    if (I || !s) {
      var Ie,
        fe = C.points,
        me =
          C.dynamicInset ||
          ((Ie = C._experimental) === null || Ie === void 0 ? void 0 : Ie.dynamicInset),
        ue = me && fe[0][1] === 'r',
        $e = me && fe[0][0] === 'b';
      ue ? ((ve.right = j), (ve.left = te)) : ((ve.left = F), (ve.right = te)),
        $e ? ((ve.bottom = A), (ve.top = te)) : ((ve.top = z), (ve.bottom = te));
    }
    var Pe = {};
    return (
      R &&
        (R.includes('height') && $
          ? (Pe.height = $)
          : R.includes('minHeight') && $ && (Pe.minHeight = $),
        R.includes('width') && k
          ? (Pe.width = k)
          : R.includes('minWidth') && k && (Pe.minWidth = k)),
      s || (Pe.pointerEvents = 'none'),
      d.createElement(
        x,
        {
          open: m || D,
          getContainer:
            h &&
            function () {
              return h(a);
            },
          autoDestroy: S,
        },
        d.createElement(Qw, { prefixCls: i, open: s, zIndex: b, mask: v, motion: p }),
        d.createElement(Ml, { onResize: W, disabled: !s }, function (Te) {
          return d.createElement(
            tc,
            ye(
              {
                motionAppear: !0,
                motionEnter: !0,
                motionLeave: !0,
                removeOnLeave: !1,
                forceRender: m,
                leavedClassName: ''.concat(i, '-hidden'),
              },
              w,
              {
                onAppearPrepare: O,
                onEnterPrepare: O,
                visible: s,
                onVisibleChanged: function (it) {
                  var pe;
                  w == null ||
                    (pe = w.onVisibleChanged) === null ||
                    pe === void 0 ||
                    pe.call(w, it),
                    l(it);
                },
              },
            ),
            function (xe, it) {
              var pe = xe.className,
                nt = xe.style,
                he = Ee(i, pe, r);
              return d.createElement(
                'div',
                {
                  ref: F7(Te, t, it),
                  className: he,
                  style: T(
                    T(
                      T(
                        T(
                          {
                            '--arrow-x': ''.concat(g.x || 0, 'px'),
                            '--arrow-y': ''.concat(g.y || 0, 'px'),
                          },
                          ve,
                        ),
                        Pe,
                      ),
                      nt,
                    ),
                    {},
                    { boxSizing: 'border-box', zIndex: b },
                    o,
                  ),
                  onMouseEnter: E,
                  onMouseLeave: P,
                  onPointerEnter: M,
                  onClick: f,
                },
                y && d.createElement(qw, { prefixCls: i, arrow: y, arrowPos: g, align: C }),
                d.createElement(Xw, { cache: !s && !c }, N),
              );
            },
          );
        }),
      )
    );
  }),
  Jw = d.forwardRef(function (e, t) {
    var n = e.children,
      r = e.getTriggerDOMNode,
      i = Gu(n),
      o = d.useCallback(
        function (l) {
          Kf(t, r ? r(l) : l);
        },
        [r],
      ),
      a = Zu(o, n.ref);
    return i ? d.cloneElement(n, { ref: a }) : n;
  }),
  D5 = d.createContext(null);
function V5(e) {
  return e ? (Array.isArray(e) ? e : [e]) : [];
}
function eS(e, t, n, r) {
  return d.useMemo(
    function () {
      var i = V5(n ?? t),
        o = V5(r ?? t),
        a = new Set(i),
        l = new Set(o);
      return (
        e &&
          (a.has('hover') && (a.delete('hover'), a.add('click')),
          l.has('hover') && (l.delete('hover'), l.add('click'))),
        [a, l]
      );
    },
    [e, t, n, r],
  );
}
function tS() {
  var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [],
    t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [],
    n = arguments.length > 2 ? arguments[2] : void 0;
  return n ? e[0] === t[0] : e[0] === t[0] && e[1] === t[1];
}
function nS(e, t, n, r) {
  for (var i = n.points, o = Object.keys(e), a = 0; a < o.length; a += 1) {
    var l,
      s = o[a];
    if (tS((l = e[s]) === null || l === void 0 ? void 0 : l.points, i, r))
      return ''.concat(t, '-placement-').concat(s);
  }
  return '';
}
function H5(e, t, n, r) {
  return t || (n ? { motionName: ''.concat(e, '-').concat(n) } : r ? { motionName: r } : null);
}
function $l(e) {
  return e.ownerDocument.defaultView;
}
function z2(e) {
  for (
    var t = [], n = e == null ? void 0 : e.parentElement, r = ['hidden', 'scroll', 'clip', 'auto'];
    n;

  ) {
    var i = $l(n).getComputedStyle(n),
      o = i.overflowX,
      a = i.overflowY,
      l = i.overflow;
    [o, a, l].some(function (s) {
      return r.includes(s);
    }) && t.push(n),
      (n = n.parentElement);
  }
  return t;
}
function hl(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1;
  return Number.isNaN(e) ? t : e;
}
function ma(e) {
  return hl(parseFloat(e), 0);
}
function B5(e, t) {
  var n = T({}, e);
  return (
    (t || []).forEach(function (r) {
      if (!(r instanceof HTMLBodyElement || r instanceof HTMLHtmlElement)) {
        var i = $l(r).getComputedStyle(r),
          o = i.overflow,
          a = i.overflowClipMargin,
          l = i.borderTopWidth,
          s = i.borderBottomWidth,
          u = i.borderLeftWidth,
          c = i.borderRightWidth,
          f = r.getBoundingClientRect(),
          v = r.offsetHeight,
          y = r.clientHeight,
          g = r.offsetWidth,
          C = r.clientWidth,
          w = ma(l),
          p = ma(s),
          m = ma(u),
          h = ma(c),
          S = hl(Math.round((f.width / g) * 1e3) / 1e3),
          x = hl(Math.round((f.height / v) * 1e3) / 1e3),
          b = (g - C - m - h) * S,
          E = (v - y - w - p) * x,
          P = w * x,
          M = p * x,
          I = m * S,
          F = h * S,
          z = 0,
          j = 0;
        if (o === 'clip') {
          var A = ma(a);
          (z = A * S), (j = A * x);
        }
        var W = f.x + I - z,
          O = f.y + P - j,
          R = W + f.width + 2 * z - I - F - b,
          k = O + f.height + 2 * j - P - M - E;
        (n.left = Math.max(n.left, W)),
          (n.top = Math.max(n.top, O)),
          (n.right = Math.min(n.right, R)),
          (n.bottom = Math.min(n.bottom, k));
      }
    }),
    n
  );
}
function U5(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0,
    n = ''.concat(t),
    r = n.match(/^(.*)\%$/);
  return r ? e * (parseFloat(r[1]) / 100) : parseFloat(n);
}
function W5(e, t) {
  var n = t || [],
    r = B(n, 2),
    i = r[0],
    o = r[1];
  return [U5(e.width, i), U5(e.height, o)];
}
function K5() {
  var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : '';
  return [e[0], e[1]];
}
function ro(e, t) {
  var n = t[0],
    r = t[1],
    i,
    o;
  return (
    n === 't' ? (o = e.y) : n === 'b' ? (o = e.y + e.height) : (o = e.y + e.height / 2),
    r === 'l' ? (i = e.x) : r === 'r' ? (i = e.x + e.width) : (i = e.x + e.width / 2),
    { x: i, y: o }
  );
}
function Dr(e, t) {
  var n = { t: 'b', b: 't', l: 'r', r: 'l' };
  return e
    .map(function (r, i) {
      return i === t ? n[r] || 'c' : r;
    })
    .join('');
}
function rS(e, t, n, r, i, o, a) {
  var l = d.useState({
      ready: !1,
      offsetX: 0,
      offsetY: 0,
      offsetR: 0,
      offsetB: 0,
      arrowX: 0,
      arrowY: 0,
      scaleX: 1,
      scaleY: 1,
      align: i[r] || {},
    }),
    s = B(l, 2),
    u = s[0],
    c = s[1],
    f = d.useRef(0),
    v = d.useMemo(
      function () {
        return t ? z2(t) : [];
      },
      [t],
    ),
    y = d.useRef({}),
    g = function () {
      y.current = {};
    };
  e || g();
  var C = on(function () {
      if (t && n && e) {
        let nn = function (ra, wi) {
            var qi = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : Ce,
              jl = H.x + ra,
              Al = H.y + wi,
              q = jl + $e,
              ie = Al + ue,
              Ze = Math.max(jl, qi.left),
              at = Math.max(Al, qi.top),
              Ge = Math.min(q, qi.right),
              Qi = Math.min(ie, qi.bottom);
            return Math.max(0, (Ge - Ze) * (Qi - at));
          },
          Ci = function () {
            (Pn = H.y + re), (ft = Pn + ue), (Vn = H.x + K), (fr = Vn + $e);
          };
        var fd = nn,
          Fl = Ci,
          m,
          h,
          S,
          x,
          b = t,
          E = b.ownerDocument,
          P = $l(b),
          M = P.getComputedStyle(b),
          I = M.width,
          F = M.height,
          z = M.position,
          j = b.style.left,
          A = b.style.top,
          W = b.style.right,
          O = b.style.bottom,
          R = b.style.overflow,
          k = T(T({}, i[r]), o),
          $ = E.createElement('div');
        (m = b.parentElement) === null || m === void 0 || m.appendChild($),
          ($.style.left = ''.concat(b.offsetLeft, 'px')),
          ($.style.top = ''.concat(b.offsetTop, 'px')),
          ($.style.position = z),
          ($.style.height = ''.concat(b.offsetHeight, 'px')),
          ($.style.width = ''.concat(b.offsetWidth, 'px')),
          (b.style.left = '0'),
          (b.style.top = '0'),
          (b.style.right = 'auto'),
          (b.style.bottom = 'auto'),
          (b.style.overflow = 'hidden');
        var N;
        if (Array.isArray(n)) N = { x: n[0], y: n[1], width: 0, height: 0 };
        else {
          var D,
            V,
            Z = n.getBoundingClientRect();
          (Z.x = (D = Z.x) !== null && D !== void 0 ? D : Z.left),
            (Z.y = (V = Z.y) !== null && V !== void 0 ? V : Z.top),
            (N = { x: Z.x, y: Z.y, width: Z.width, height: Z.height });
        }
        var H = b.getBoundingClientRect();
        (H.x = (h = H.x) !== null && h !== void 0 ? h : H.left),
          (H.y = (S = H.y) !== null && S !== void 0 ? S : H.top);
        var Q = E.documentElement,
          ee = Q.clientWidth,
          te = Q.clientHeight,
          ve = Q.scrollWidth,
          Ie = Q.scrollHeight,
          fe = Q.scrollTop,
          me = Q.scrollLeft,
          ue = H.height,
          $e = H.width,
          Pe = N.height,
          Te = N.width,
          xe = { left: 0, top: 0, right: ee, bottom: te },
          it = { left: -me, top: -fe, right: ve - me, bottom: Ie - fe },
          pe = k.htmlRegion,
          nt = 'visible',
          he = 'visibleFirst';
        pe !== 'scroll' && pe !== he && (pe = nt);
        var ae = pe === he,
          Be = B5(it, v),
          X = B5(xe, v),
          Ce = pe === nt ? X : Be,
          Ue = ae ? X : Ce;
        (b.style.left = 'auto'),
          (b.style.top = 'auto'),
          (b.style.right = '0'),
          (b.style.bottom = '0');
        var ke = b.getBoundingClientRect();
        (b.style.left = j),
          (b.style.top = A),
          (b.style.right = W),
          (b.style.bottom = O),
          (b.style.overflow = R),
          (x = b.parentElement) === null || x === void 0 || x.removeChild($);
        var xt = hl(Math.round(($e / parseFloat(I)) * 1e3) / 1e3),
          bt = hl(Math.round((ue / parseFloat(F)) * 1e3) / 1e3);
        if (xt === 0 || bt === 0 || (il(n) && !Y0(n))) return;
        var Mt = k.offset,
          Et = k.targetOffset,
          gt = W5(H, Mt),
          Qe = B(gt, 2),
          We = Qe[0],
          Xe = Qe[1],
          Ne = W5(N, Et),
          Ke = B(Ne, 2),
          ut = Ke[0],
          At = Ke[1];
        (N.x -= ut), (N.y -= At);
        var Dn = k.points || [],
          Sn = B(Dn, 2),
          Rt = Sn[0],
          Kt = Sn[1],
          ct = K5(Kt),
          Ye = K5(Rt),
          ot = ro(N, ct),
          Me = ro(H, Ye),
          ne = T({}, k),
          K = ot.x - Me.x + We,
          re = ot.y - Me.y + Xe,
          we = nn(K, re),
          de = nn(K, re, X),
          De = ro(N, ['t', 'l']),
          Fe = ro(H, ['t', 'l']),
          Lt = ro(N, ['b', 'r']),
          xn = ro(H, ['b', 'r']),
          bn = k.overflow || {},
          nr = bn.adjustX,
          En = bn.adjustY,
          rr = bn.shiftX,
          kn = bn.shiftY,
          Zt = function (wi) {
            return typeof wi == 'boolean' ? wi : wi >= 0;
          },
          Pn,
          ft,
          Vn,
          fr;
        Ci();
        var dr = Zt(En),
          pi = Ye[0] === ct[0];
        if (dr && Ye[0] === 't' && (ft > Ue.bottom || y.current.bt)) {
          var yt = re;
          pi ? (yt -= ue - Pe) : (yt = De.y - xn.y - Xe);
          var Hi = nn(K, yt),
            ea = nn(K, yt, X);
          Hi > we || (Hi === we && (!ae || ea >= de))
            ? ((y.current.bt = !0), (re = yt), (Xe = -Xe), (ne.points = [Dr(Ye, 0), Dr(ct, 0)]))
            : (y.current.bt = !1);
        }
        if (dr && Ye[0] === 'b' && (Pn < Ue.top || y.current.tb)) {
          var vr = re;
          pi ? (vr += ue - Pe) : (vr = Lt.y - Fe.y - Xe);
          var hi = nn(K, vr),
            mr = nn(K, vr, X);
          hi > we || (hi === we && (!ae || mr >= de))
            ? ((y.current.tb = !0), (re = vr), (Xe = -Xe), (ne.points = [Dr(Ye, 0), Dr(ct, 0)]))
            : (y.current.tb = !1);
        }
        var Fr = Zt(nr),
          Bi = Ye[1] === ct[1];
        if (Fr && Ye[1] === 'l' && (fr > Ue.right || y.current.rl)) {
          var pr = K;
          Bi ? (pr -= $e - Te) : (pr = De.x - xn.x - We);
          var Ui = nn(pr, re),
            hr = nn(pr, re, X);
          Ui > we || (Ui === we && (!ae || hr >= de))
            ? ((y.current.rl = !0), (K = pr), (We = -We), (ne.points = [Dr(Ye, 1), Dr(ct, 1)]))
            : (y.current.rl = !1);
        }
        if (Fr && Ye[1] === 'r' && (Vn < Ue.left || y.current.lr)) {
          var en = K;
          Bi ? (en += $e - Te) : (en = Lt.x - Fe.x - We);
          var Wi = nn(en, re),
            Ki = nn(en, re, X);
          Wi > we || (Wi === we && (!ae || Ki >= de))
            ? ((y.current.lr = !0), (K = en), (We = -We), (ne.points = [Dr(Ye, 1), Dr(ct, 1)]))
            : (y.current.lr = !1);
        }
        Ci();
        var Mn = rr === !0 ? 0 : rr;
        typeof Mn == 'number' &&
          (Vn < X.left &&
            ((K -= Vn - X.left - We), N.x + Te < X.left + Mn && (K += N.x - X.left + Te - Mn)),
          fr > X.right &&
            ((K -= fr - X.right - We), N.x > X.right - Mn && (K += N.x - X.right + Mn)));
        var tn = kn === !0 ? 0 : kn;
        typeof tn == 'number' &&
          (Pn < X.top &&
            ((re -= Pn - X.top - Xe), N.y + Pe < X.top + tn && (re += N.y - X.top + Pe - tn)),
          ft > X.bottom &&
            ((re -= ft - X.bottom - Xe), N.y > X.bottom - tn && (re += N.y - X.bottom + tn)));
        var jr = H.x + K,
          Ar = jr + $e,
          Rn = H.y + re,
          ta = Rn + ue,
          Zi = N.x,
          je = Zi + Te,
          ge = N.y,
          _e = ge + Pe,
          It = Math.max(jr, Zi),
          _t = Math.min(Ar, je),
          gr = (It + _t) / 2,
          gi = gr - jr,
          na = Math.max(Rn, ge),
          yi = Math.min(ta, _e),
          Gi = (na + yi) / 2,
          yr = Gi - Rn;
        a == null || a(t, ne);
        var Cr = ke.right - H.x - (K + H.width),
          Ln = ke.bottom - H.y - (re + H.height);
        xt === 1 && ((K = Math.round(K)), (Cr = Math.round(Cr))),
          bt === 1 && ((re = Math.round(re)), (Ln = Math.round(Ln)));
        var lc = {
          ready: !0,
          offsetX: K / xt,
          offsetY: re / bt,
          offsetR: Cr / xt,
          offsetB: Ln / bt,
          arrowX: gi / xt,
          arrowY: yr / bt,
          scaleX: xt,
          scaleY: bt,
          align: ne,
        };
        c(lc);
      }
    }),
    w = function () {
      f.current += 1;
      var h = f.current;
      Promise.resolve().then(function () {
        f.current === h && C();
      });
    },
    p = function () {
      c(function (h) {
        return T(T({}, h), {}, { ready: !1 });
      });
    };
  return (
    Bt(p, [r]),
    Bt(
      function () {
        e || p();
      },
      [e],
    ),
    [
      u.ready,
      u.offsetX,
      u.offsetY,
      u.offsetR,
      u.offsetB,
      u.arrowX,
      u.arrowY,
      u.scaleX,
      u.scaleY,
      u.align,
      w,
    ]
  );
}
function iS(e, t, n, r, i) {
  Bt(
    function () {
      if (e && t && n) {
        let v = function () {
          r(), i();
        };
        var f = v,
          o = t,
          a = n,
          l = z2(o),
          s = z2(a),
          u = $l(a),
          c = new Set([u].concat(J(l), J(s)));
        return (
          c.forEach(function (y) {
            y.addEventListener('scroll', v, { passive: !0 });
          }),
          u.addEventListener('resize', v, { passive: !0 }),
          r(),
          function () {
            c.forEach(function (y) {
              y.removeEventListener('scroll', v), u.removeEventListener('resize', v);
            });
          }
        );
      }
    },
    [e, t, n],
  );
}
function oS(e, t, n, r, i, o, a, l) {
  var s = d.useRef(e);
  (s.current = e),
    d.useEffect(
      function () {
        if (t && r && (!i || o)) {
          var u = function (y) {
              var g;
              s.current &&
                !a(
                  ((g = y.composedPath) === null ||
                  g === void 0 ||
                  (g = g.call(y)) === null ||
                  g === void 0
                    ? void 0
                    : g[0]) || y.target,
                ) &&
                l(!1);
            },
            c = $l(r);
          c.addEventListener('mousedown', u, !0), c.addEventListener('contextmenu', u, !0);
          var f = mu(n);
          return (
            f && (f.addEventListener('mousedown', u, !0), f.addEventListener('contextmenu', u, !0)),
            function () {
              c.removeEventListener('mousedown', u, !0),
                c.removeEventListener('contextmenu', u, !0),
                f &&
                  (f.removeEventListener('mousedown', u, !0),
                  f.removeEventListener('contextmenu', u, !0));
            }
          );
        }
      },
      [t, n, r, i, o],
    );
}
var aS = [
  'prefixCls',
  'children',
  'action',
  'showAction',
  'hideAction',
  'popupVisible',
  'defaultPopupVisible',
  'onPopupVisibleChange',
  'afterPopupVisibleChange',
  'mouseEnterDelay',
  'mouseLeaveDelay',
  'focusDelay',
  'blurDelay',
  'mask',
  'maskClosable',
  'getPopupContainer',
  'forceRender',
  'autoDestroy',
  'destroyPopupOnHide',
  'popup',
  'popupClassName',
  'popupStyle',
  'popupPlacement',
  'builtinPlacements',
  'popupAlign',
  'zIndex',
  'stretch',
  'getPopupClassNameFromAlign',
  'fresh',
  'alignPoint',
  'onPopupClick',
  'onPopupAlign',
  'arrow',
  'popupMotion',
  'maskMotion',
  'popupTransitionName',
  'popupAnimation',
  'maskTransitionName',
  'maskAnimation',
  'className',
  'getTriggerDOMNode',
];
function lS() {
  var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : ev,
    t = d.forwardRef(function (n, r) {
      var i = n.prefixCls,
        o = i === void 0 ? 'rc-trigger-popup' : i,
        a = n.children,
        l = n.action,
        s = l === void 0 ? 'hover' : l,
        u = n.showAction,
        c = n.hideAction,
        f = n.popupVisible,
        v = n.defaultPopupVisible,
        y = n.onPopupVisibleChange,
        g = n.afterPopupVisibleChange,
        C = n.mouseEnterDelay,
        w = n.mouseLeaveDelay,
        p = w === void 0 ? 0.1 : w,
        m = n.focusDelay,
        h = n.blurDelay,
        S = n.mask,
        x = n.maskClosable,
        b = x === void 0 ? !0 : x,
        E = n.getPopupContainer,
        P = n.forceRender,
        M = n.autoDestroy,
        I = n.destroyPopupOnHide,
        F = n.popup,
        z = n.popupClassName,
        j = n.popupStyle,
        A = n.popupPlacement,
        W = n.builtinPlacements,
        O = W === void 0 ? {} : W,
        R = n.popupAlign,
        k = n.zIndex,
        $ = n.stretch,
        N = n.getPopupClassNameFromAlign,
        D = n.fresh,
        V = n.alignPoint,
        Z = n.onPopupClick,
        H = n.onPopupAlign,
        Q = n.arrow,
        ee = n.popupMotion,
        te = n.maskMotion,
        ve = n.popupTransitionName,
        Ie = n.popupAnimation,
        fe = n.maskTransitionName,
        me = n.maskAnimation,
        ue = n.className,
        $e = n.getTriggerDOMNode,
        Pe = ze(n, aS),
        Te = M || I || !1,
        xe = d.useState(!1),
        it = B(xe, 2),
        pe = it[0],
        nt = it[1];
      Bt(function () {
        nt(jw());
      }, []);
      var he = d.useRef({}),
        ae = d.useContext(D5),
        Be = d.useMemo(
          function () {
            return {
              registerSubPopup: function (ie, Ze) {
                (he.current[ie] = Ze), ae == null || ae.registerSubPopup(ie, Ze);
              },
            };
          },
          [ae],
        ),
        X = gC(),
        Ce = d.useState(null),
        Ue = B(Ce, 2),
        ke = Ue[0],
        xt = Ue[1],
        bt = d.useRef(null),
        Mt = on(function (q) {
          (bt.current = q), il(q) && ke !== q && xt(q), ae == null || ae.registerSubPopup(X, q);
        }),
        Et = d.useState(null),
        gt = B(Et, 2),
        Qe = gt[0],
        We = gt[1],
        Xe = d.useRef(null),
        Ne = on(function (q) {
          il(q) && Qe !== q && (We(q), (Xe.current = q));
        }),
        Ke = d.Children.only(a),
        ut = (Ke == null ? void 0 : Ke.props) || {},
        At = {},
        Dn = on(function (q) {
          var ie,
            Ze,
            at = Qe;
          return (
            (at == null ? void 0 : at.contains(q)) ||
            ((ie = mu(at)) === null || ie === void 0 ? void 0 : ie.host) === q ||
            q === at ||
            (ke == null ? void 0 : ke.contains(q)) ||
            ((Ze = mu(ke)) === null || Ze === void 0 ? void 0 : Ze.host) === q ||
            q === ke ||
            Object.values(he.current).some(function (Ge) {
              return (Ge == null ? void 0 : Ge.contains(q)) || q === Ge;
            })
          );
        }),
        Sn = H5(o, ee, Ie, ve),
        Rt = H5(o, te, me, fe),
        Kt = d.useState(v || !1),
        ct = B(Kt, 2),
        Ye = ct[0],
        ot = ct[1],
        Me = f ?? Ye,
        ne = on(function (q) {
          f === void 0 && ot(q);
        });
      Bt(
        function () {
          ot(f || !1);
        },
        [f],
      );
      var K = d.useRef(Me);
      K.current = Me;
      var re = d.useRef([]);
      re.current = [];
      var we = on(function (q) {
          var ie;
          ne(q),
            ((ie = re.current[re.current.length - 1]) !== null && ie !== void 0 ? ie : Me) !== q &&
              (re.current.push(q), y == null || y(q));
        }),
        de = d.useRef(),
        De = function () {
          clearTimeout(de.current);
        },
        Fe = function (ie) {
          var Ze = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
          De(),
            Ze === 0
              ? we(ie)
              : (de.current = setTimeout(function () {
                  we(ie);
                }, Ze * 1e3));
        };
      d.useEffect(function () {
        return De;
      }, []);
      var Lt = d.useState(!1),
        xn = B(Lt, 2),
        bn = xn[0],
        nr = xn[1];
      Bt(
        function (q) {
          (!q || Me) && nr(!0);
        },
        [Me],
      );
      var En = d.useState(null),
        rr = B(En, 2),
        kn = rr[0],
        Zt = rr[1],
        Pn = d.useState(null),
        ft = B(Pn, 2),
        Vn = ft[0],
        fr = ft[1],
        dr = function (ie) {
          fr([ie.clientX, ie.clientY]);
        },
        pi = rS(Me, ke, V && Vn !== null ? Vn : Qe, A, O, R, H),
        yt = B(pi, 11),
        Hi = yt[0],
        ea = yt[1],
        vr = yt[2],
        hi = yt[3],
        mr = yt[4],
        Fr = yt[5],
        Bi = yt[6],
        pr = yt[7],
        Ui = yt[8],
        hr = yt[9],
        en = yt[10],
        Wi = eS(pe, s, u, c),
        Ki = B(Wi, 2),
        Mn = Ki[0],
        tn = Ki[1],
        jr = Mn.has('click'),
        Ar = tn.has('click') || tn.has('contextMenu'),
        Rn = on(function () {
          bn || en();
        }),
        ta = function () {
          K.current && V && Ar && Fe(!1);
        };
      iS(Me, Qe, ke, Rn, ta),
        Bt(
          function () {
            Rn();
          },
          [Vn, A],
        ),
        Bt(
          function () {
            Me && !(O != null && O[A]) && Rn();
          },
          [JSON.stringify(R)],
        );
      var Zi = d.useMemo(
        function () {
          var q = nS(O, o, hr, V);
          return Ee(q, N == null ? void 0 : N(hr));
        },
        [hr, N, O, o, V],
      );
      d.useImperativeHandle(r, function () {
        return { nativeElement: Xe.current, popupElement: bt.current, forceAlign: Rn };
      });
      var je = d.useState(0),
        ge = B(je, 2),
        _e = ge[0],
        It = ge[1],
        _t = d.useState(0),
        gr = B(_t, 2),
        gi = gr[0],
        na = gr[1],
        yi = function () {
          if ($ && Qe) {
            var ie = Qe.getBoundingClientRect();
            It(ie.width), na(ie.height);
          }
        },
        Gi = function () {
          yi(), Rn();
        },
        yr = function (ie) {
          nr(!1), en(), g == null || g(ie);
        },
        Cr = function () {
          return new Promise(function (ie) {
            yi(),
              Zt(function () {
                return ie;
              });
          });
        };
      Bt(
        function () {
          kn && (en(), kn(), Zt(null));
        },
        [kn],
      );
      function Ln(q, ie, Ze, at) {
        At[q] = function (Ge) {
          var Qi;
          at == null || at(Ge), Fe(ie, Ze);
          for (
            var sc = arguments.length, dd = new Array(sc > 1 ? sc - 1 : 0), zl = 1;
            zl < sc;
            zl++
          )
            dd[zl - 1] = arguments[zl];
          (Qi = ut[q]) === null || Qi === void 0 || Qi.call.apply(Qi, [ut, Ge].concat(dd));
        };
      }
      (jr || Ar) &&
        (At.onClick = function (q) {
          var ie;
          K.current && Ar ? Fe(!1) : !K.current && jr && (dr(q), Fe(!0));
          for (
            var Ze = arguments.length, at = new Array(Ze > 1 ? Ze - 1 : 0), Ge = 1;
            Ge < Ze;
            Ge++
          )
            at[Ge - 1] = arguments[Ge];
          (ie = ut.onClick) === null || ie === void 0 || ie.call.apply(ie, [ut, q].concat(at));
        }),
        oS(Me, Ar, Qe, ke, S, b, Dn, Fe);
      var lc = Mn.has('hover'),
        fd = tn.has('hover'),
        Fl,
        nn;
      lc &&
        (Ln('onMouseEnter', !0, C, function (q) {
          dr(q);
        }),
        Ln('onPointerEnter', !0, C, function (q) {
          dr(q);
        }),
        (Fl = function (ie) {
          (Me || bn) && ke !== null && ke !== void 0 && ke.contains(ie.target) && Fe(!0, C);
        }),
        V &&
          (At.onMouseMove = function (q) {
            var ie;
            (ie = ut.onMouseMove) === null || ie === void 0 || ie.call(ut, q);
          })),
        fd &&
          (Ln('onMouseLeave', !1, p),
          Ln('onPointerLeave', !1, p),
          (nn = function () {
            Fe(!1, p);
          })),
        Mn.has('focus') && Ln('onFocus', !0, m),
        tn.has('focus') && Ln('onBlur', !1, h),
        Mn.has('contextMenu') &&
          (At.onContextMenu = function (q) {
            var ie;
            K.current && tn.has('contextMenu') ? Fe(!1) : (dr(q), Fe(!0)), q.preventDefault();
            for (
              var Ze = arguments.length, at = new Array(Ze > 1 ? Ze - 1 : 0), Ge = 1;
              Ge < Ze;
              Ge++
            )
              at[Ge - 1] = arguments[Ge];
            (ie = ut.onContextMenu) === null ||
              ie === void 0 ||
              ie.call.apply(ie, [ut, q].concat(at));
          }),
        ue && (At.className = Ee(ut.className, ue));
      var Ci = T(T({}, ut), At),
        ra = {},
        wi = [
          'onContextMenu',
          'onClick',
          'onMouseDown',
          'onTouchStart',
          'onMouseEnter',
          'onMouseLeave',
          'onFocus',
          'onBlur',
        ];
      wi.forEach(function (q) {
        Pe[q] &&
          (ra[q] = function () {
            for (var ie, Ze = arguments.length, at = new Array(Ze), Ge = 0; Ge < Ze; Ge++)
              at[Ge] = arguments[Ge];
            (ie = Ci[q]) === null || ie === void 0 || ie.call.apply(ie, [Ci].concat(at)),
              Pe[q].apply(Pe, at);
          });
      });
      var qi = d.cloneElement(Ke, T(T({}, Ci), ra)),
        jl = { x: Fr, y: Bi },
        Al = Q ? T({}, Q !== !0 ? Q : {}) : null;
      return d.createElement(
        d.Fragment,
        null,
        d.createElement(
          Ml,
          { disabled: !Me, ref: Ne, onResize: Gi },
          d.createElement(Jw, { getTriggerDOMNode: $e }, qi),
        ),
        d.createElement(
          D5.Provider,
          { value: Be },
          d.createElement(Yw, {
            portal: e,
            ref: Mt,
            prefixCls: o,
            popup: F,
            className: Ee(z, Zi),
            style: j,
            target: Qe,
            onMouseEnter: Fl,
            onMouseLeave: nn,
            onPointerEnter: Fl,
            zIndex: k,
            open: Me,
            keepDom: bn,
            fresh: D,
            onClick: Z,
            mask: S,
            motion: Sn,
            maskMotion: Rt,
            onVisibleChanged: yr,
            onPrepare: Cr,
            forceRender: P,
            autoDestroy: Te,
            getPopupContainer: E,
            align: hr,
            arrow: Al,
            arrowPos: jl,
            ready: Hi,
            offsetX: ea,
            offsetY: vr,
            offsetR: hi,
            offsetB: mr,
            onAlign: Rn,
            stretch: $,
            targetWidth: _e / pr,
            targetHeight: gi / Ui,
          }),
        ),
      );
    });
  return t;
}
const dv = lS(ev);
function vv(e) {
  var t = e.children,
    n = e.prefixCls,
    r = e.id,
    i = e.overlayInnerStyle,
    o = e.className,
    a = e.style;
  return d.createElement(
    'div',
    { className: Ee(''.concat(n, '-content'), o), style: a },
    d.createElement(
      'div',
      { className: ''.concat(n, '-inner'), id: r, role: 'tooltip', style: i },
      typeof t == 'function' ? t() : t,
    ),
  );
}
var io = { shiftX: 64, adjustY: 1 },
  oo = { adjustX: 1, shiftY: !0 },
  _n = [0, 0],
  sS = {
    left: { points: ['cr', 'cl'], overflow: oo, offset: [-4, 0], targetOffset: _n },
    right: { points: ['cl', 'cr'], overflow: oo, offset: [4, 0], targetOffset: _n },
    top: { points: ['bc', 'tc'], overflow: io, offset: [0, -4], targetOffset: _n },
    bottom: { points: ['tc', 'bc'], overflow: io, offset: [0, 4], targetOffset: _n },
    topLeft: { points: ['bl', 'tl'], overflow: io, offset: [0, -4], targetOffset: _n },
    leftTop: { points: ['tr', 'tl'], overflow: oo, offset: [-4, 0], targetOffset: _n },
    topRight: { points: ['br', 'tr'], overflow: io, offset: [0, -4], targetOffset: _n },
    rightTop: { points: ['tl', 'tr'], overflow: oo, offset: [4, 0], targetOffset: _n },
    bottomRight: { points: ['tr', 'br'], overflow: io, offset: [0, 4], targetOffset: _n },
    rightBottom: { points: ['bl', 'br'], overflow: oo, offset: [4, 0], targetOffset: _n },
    bottomLeft: { points: ['tl', 'bl'], overflow: io, offset: [0, 4], targetOffset: _n },
    leftBottom: { points: ['br', 'bl'], overflow: oo, offset: [-4, 0], targetOffset: _n },
  },
  uS = [
    'overlayClassName',
    'trigger',
    'mouseEnterDelay',
    'mouseLeaveDelay',
    'overlayStyle',
    'prefixCls',
    'children',
    'onVisibleChange',
    'afterVisibleChange',
    'transitionName',
    'animation',
    'motion',
    'placement',
    'align',
    'destroyTooltipOnHide',
    'defaultVisible',
    'getTooltipContainer',
    'overlayInnerStyle',
    'arrowContent',
    'overlay',
    'id',
    'showArrow',
  ],
  cS = function (t, n) {
    var r = t.overlayClassName,
      i = t.trigger,
      o = i === void 0 ? ['hover'] : i,
      a = t.mouseEnterDelay,
      l = a === void 0 ? 0 : a,
      s = t.mouseLeaveDelay,
      u = s === void 0 ? 0.1 : s,
      c = t.overlayStyle,
      f = t.prefixCls,
      v = f === void 0 ? 'rc-tooltip' : f,
      y = t.children,
      g = t.onVisibleChange,
      C = t.afterVisibleChange,
      w = t.transitionName,
      p = t.animation,
      m = t.motion,
      h = t.placement,
      S = h === void 0 ? 'right' : h,
      x = t.align,
      b = x === void 0 ? {} : x,
      E = t.destroyTooltipOnHide,
      P = E === void 0 ? !1 : E,
      M = t.defaultVisible,
      I = t.getTooltipContainer,
      F = t.overlayInnerStyle;
    t.arrowContent;
    var z = t.overlay,
      j = t.id,
      A = t.showArrow,
      W = A === void 0 ? !0 : A,
      O = ze(t, uS),
      R = d.useRef(null);
    d.useImperativeHandle(n, function () {
      return R.current;
    });
    var k = T({}, O);
    'visible' in t && (k.popupVisible = t.visible);
    var $ = function () {
      return d.createElement(vv, { key: 'content', prefixCls: v, id: j, overlayInnerStyle: F }, z);
    };
    return d.createElement(
      dv,
      ye(
        {
          popupClassName: r,
          prefixCls: v,
          popup: $,
          action: o,
          builtinPlacements: sS,
          popupPlacement: S,
          ref: R,
          popupAlign: b,
          getPopupContainer: I,
          onPopupVisibleChange: g,
          afterPopupVisibleChange: C,
          popupTransitionName: w,
          popupAnimation: p,
          popupMotion: m,
          defaultPopupVisible: M,
          autoDestroy: P,
          mouseLeaveDelay: u,
          popupStyle: c,
          mouseEnterDelay: l,
          arrow: W,
        },
        k,
      ),
      y,
    );
  };
const fS = d.forwardRef(cS);
function dS(e) {
  const { sizePopupArrow: t, borderRadiusXS: n, borderRadiusOuter: r } = e,
    i = t / 2,
    o = 0,
    a = i,
    l = (r * 1) / Math.sqrt(2),
    s = i - r * (1 - 1 / Math.sqrt(2)),
    u = i - n * (1 / Math.sqrt(2)),
    c = r * (Math.sqrt(2) - 1) + n * (1 / Math.sqrt(2)),
    f = 2 * i - u,
    v = c,
    y = 2 * i - l,
    g = s,
    C = 2 * i - o,
    w = a,
    p = i * Math.sqrt(2) + r * (Math.sqrt(2) - 2),
    m = r * (Math.sqrt(2) - 1),
    h = `polygon(${m}px 100%, 50% ${m}px, ${2 * i - m}px 100%, ${m}px 100%)`,
    S = `path('M ${o} ${a} A ${r} ${r} 0 0 0 ${l} ${s} L ${u} ${c} A ${n} ${n} 0 0 1 ${f} ${v} L ${y} ${g} A ${r} ${r} 0 0 0 ${C} ${w} Z')`;
  return { arrowShadowWidth: p, arrowPath: S, arrowPolygon: h };
}
const vS = (e, t, n) => {
    const {
      sizePopupArrow: r,
      arrowPolygon: i,
      arrowPath: o,
      arrowShadowWidth: a,
      borderRadiusXS: l,
      calc: s,
    } = e;
    return {
      pointerEvents: 'none',
      width: r,
      height: r,
      overflow: 'hidden',
      '&::before': {
        position: 'absolute',
        bottom: 0,
        insetInlineStart: 0,
        width: r,
        height: s(r).div(2).equal(),
        background: t,
        clipPath: { _multi_value_: !0, value: [i, o] },
        content: '""',
      },
      '&::after': {
        content: '""',
        position: 'absolute',
        width: a,
        height: a,
        bottom: 0,
        insetInline: 0,
        margin: 'auto',
        borderRadius: { _skip_check_: !0, value: `0 0 ${be(l)} 0` },
        transform: 'translateY(50%) rotate(-135deg)',
        boxShadow: n,
        zIndex: 0,
        background: 'transparent',
      },
    };
  },
  mv = 8;
function pv(e) {
  const { contentRadius: t, limitVerticalRadius: n } = e,
    r = t > 12 ? t + 2 : 12;
  return { arrowOffsetHorizontal: r, arrowOffsetVertical: n ? mv : r };
}
function ms(e, t) {
  return e ? t : {};
}
function mS(e, t, n) {
  const {
      componentCls: r,
      boxShadowPopoverArrow: i,
      arrowOffsetVertical: o,
      arrowOffsetHorizontal: a,
    } = e,
    { arrowDistance: l = 0, arrowPlacement: s = { left: !0, right: !0, top: !0, bottom: !0 } } = {};
  return {
    [r]: Object.assign(
      Object.assign(
        Object.assign(
          Object.assign(
            {
              [`${r}-arrow`]: [
                Object.assign(
                  Object.assign({ position: 'absolute', zIndex: 1, display: 'block' }, vS(e, t, i)),
                  { '&:before': { background: t } },
                ),
              ],
            },
            ms(!!s.top, {
              [[
                `&-placement-top > ${r}-arrow`,
                `&-placement-topLeft > ${r}-arrow`,
                `&-placement-topRight > ${r}-arrow`,
              ].join(',')]: { bottom: l, transform: 'translateY(100%) rotate(180deg)' },
              [`&-placement-top > ${r}-arrow`]: {
                left: { _skip_check_: !0, value: '50%' },
                transform: 'translateX(-50%) translateY(100%) rotate(180deg)',
              },
              '&-placement-topLeft': {
                '--arrow-offset-horizontal': a,
                [`> ${r}-arrow`]: { left: { _skip_check_: !0, value: a } },
              },
              '&-placement-topRight': {
                '--arrow-offset-horizontal': `calc(100% - ${be(a)})`,
                [`> ${r}-arrow`]: { right: { _skip_check_: !0, value: a } },
              },
            }),
          ),
          ms(!!s.bottom, {
            [[
              `&-placement-bottom > ${r}-arrow`,
              `&-placement-bottomLeft > ${r}-arrow`,
              `&-placement-bottomRight > ${r}-arrow`,
            ].join(',')]: { top: l, transform: 'translateY(-100%)' },
            [`&-placement-bottom > ${r}-arrow`]: {
              left: { _skip_check_: !0, value: '50%' },
              transform: 'translateX(-50%) translateY(-100%)',
            },
            '&-placement-bottomLeft': {
              '--arrow-offset-horizontal': a,
              [`> ${r}-arrow`]: { left: { _skip_check_: !0, value: a } },
            },
            '&-placement-bottomRight': {
              '--arrow-offset-horizontal': `calc(100% - ${be(a)})`,
              [`> ${r}-arrow`]: { right: { _skip_check_: !0, value: a } },
            },
          }),
        ),
        ms(!!s.left, {
          [[
            `&-placement-left > ${r}-arrow`,
            `&-placement-leftTop > ${r}-arrow`,
            `&-placement-leftBottom > ${r}-arrow`,
          ].join(',')]: {
            right: { _skip_check_: !0, value: l },
            transform: 'translateX(100%) rotate(90deg)',
          },
          [`&-placement-left > ${r}-arrow`]: {
            top: { _skip_check_: !0, value: '50%' },
            transform: 'translateY(-50%) translateX(100%) rotate(90deg)',
          },
          [`&-placement-leftTop > ${r}-arrow`]: { top: o },
          [`&-placement-leftBottom > ${r}-arrow`]: { bottom: o },
        }),
      ),
      ms(!!s.right, {
        [[
          `&-placement-right > ${r}-arrow`,
          `&-placement-rightTop > ${r}-arrow`,
          `&-placement-rightBottom > ${r}-arrow`,
        ].join(',')]: {
          left: { _skip_check_: !0, value: l },
          transform: 'translateX(-100%) rotate(-90deg)',
        },
        [`&-placement-right > ${r}-arrow`]: {
          top: { _skip_check_: !0, value: '50%' },
          transform: 'translateY(-50%) translateX(-100%) rotate(-90deg)',
        },
        [`&-placement-rightTop > ${r}-arrow`]: { top: o },
        [`&-placement-rightBottom > ${r}-arrow`]: { bottom: o },
      }),
    ),
  };
}
function pS(e, t, n, r) {
  if (r === !1) return { adjustX: !1, adjustY: !1 };
  const i = r && typeof r == 'object' ? r : {},
    o = {};
  switch (e) {
    case 'top':
    case 'bottom':
      (o.shiftX = t.arrowOffsetHorizontal * 2 + n), (o.shiftY = !0), (o.adjustY = !0);
      break;
    case 'left':
    case 'right':
      (o.shiftY = t.arrowOffsetVertical * 2 + n), (o.shiftX = !0), (o.adjustX = !0);
      break;
  }
  const a = Object.assign(Object.assign({}, o), i);
  return a.shiftX || (a.adjustX = !0), a.shiftY || (a.adjustY = !0), a;
}
const Z5 = {
    left: { points: ['cr', 'cl'] },
    right: { points: ['cl', 'cr'] },
    top: { points: ['bc', 'tc'] },
    bottom: { points: ['tc', 'bc'] },
    topLeft: { points: ['bl', 'tl'] },
    leftTop: { points: ['tr', 'tl'] },
    topRight: { points: ['br', 'tr'] },
    rightTop: { points: ['tl', 'tr'] },
    bottomRight: { points: ['tr', 'br'] },
    rightBottom: { points: ['bl', 'br'] },
    bottomLeft: { points: ['tl', 'bl'] },
    leftBottom: { points: ['br', 'bl'] },
  },
  hS = {
    topLeft: { points: ['bl', 'tc'] },
    leftTop: { points: ['tr', 'cl'] },
    topRight: { points: ['br', 'tc'] },
    rightTop: { points: ['tl', 'cr'] },
    bottomRight: { points: ['tr', 'bc'] },
    rightBottom: { points: ['bl', 'cr'] },
    bottomLeft: { points: ['tl', 'bc'] },
    leftBottom: { points: ['br', 'cl'] },
  },
  gS = new Set([
    'topLeft',
    'topRight',
    'bottomLeft',
    'bottomRight',
    'leftTop',
    'leftBottom',
    'rightTop',
    'rightBottom',
  ]);
function yS(e) {
  const {
      arrowWidth: t,
      autoAdjustOverflow: n,
      arrowPointAtCenter: r,
      offset: i,
      borderRadius: o,
      visibleFirst: a,
    } = e,
    l = t / 2,
    s = {};
  return (
    Object.keys(Z5).forEach((u) => {
      const c = (r && hS[u]) || Z5[u],
        f = Object.assign(Object.assign({}, c), { offset: [0, 0], dynamicInset: !0 });
      switch (((s[u] = f), gS.has(u) && (f.autoArrow = !1), u)) {
        case 'top':
        case 'topLeft':
        case 'topRight':
          f.offset[1] = -l - i;
          break;
        case 'bottom':
        case 'bottomLeft':
        case 'bottomRight':
          f.offset[1] = l + i;
          break;
        case 'left':
        case 'leftTop':
        case 'leftBottom':
          f.offset[0] = -l - i;
          break;
        case 'right':
        case 'rightTop':
        case 'rightBottom':
          f.offset[0] = l + i;
          break;
      }
      const v = pv({ contentRadius: o, limitVerticalRadius: !0 });
      if (r)
        switch (u) {
          case 'topLeft':
          case 'bottomLeft':
            f.offset[0] = -v.arrowOffsetHorizontal - l;
            break;
          case 'topRight':
          case 'bottomRight':
            f.offset[0] = v.arrowOffsetHorizontal + l;
            break;
          case 'leftTop':
          case 'rightTop':
            f.offset[1] = -v.arrowOffsetHorizontal * 2 + l;
            break;
          case 'leftBottom':
          case 'rightBottom':
            f.offset[1] = v.arrowOffsetHorizontal * 2 - l;
            break;
        }
      (f.overflow = pS(u, v, t, n)), a && (f.htmlRegion = 'visibleFirst');
    }),
    s
  );
}
const CS = (e) => {
    const {
      componentCls: t,
      tooltipMaxWidth: n,
      tooltipColor: r,
      tooltipBg: i,
      tooltipBorderRadius: o,
      zIndexPopup: a,
      controlHeight: l,
      boxShadowSecondary: s,
      paddingSM: u,
      paddingXS: c,
    } = e;
    return [
      {
        [t]: Object.assign(
          Object.assign(
            Object.assign(Object.assign({}, I0(e)), {
              position: 'absolute',
              zIndex: a,
              display: 'block',
              width: 'max-content',
              maxWidth: n,
              visibility: 'visible',
              '--valid-offset-x': 'var(--arrow-offset-horizontal, var(--arrow-x))',
              transformOrigin: ['var(--valid-offset-x, 50%)', 'var(--arrow-y, 50%)'].join(' '),
              '&-hidden': { display: 'none' },
              '--antd-arrow-background-color': i,
              [`${t}-inner`]: {
                minWidth: '1em',
                minHeight: l,
                padding: `${be(e.calc(u).div(2).equal())} ${be(c)}`,
                color: r,
                textAlign: 'start',
                textDecoration: 'none',
                wordWrap: 'break-word',
                backgroundColor: i,
                borderRadius: o,
                boxShadow: s,
                boxSizing: 'border-box',
              },
              [[
                '&-placement-left',
                '&-placement-leftTop',
                '&-placement-leftBottom',
                '&-placement-right',
                '&-placement-rightTop',
                '&-placement-rightBottom',
              ].join(',')]: { [`${t}-inner`]: { borderRadius: e.min(o, mv) } },
              [`${t}-content`]: { position: 'relative' },
            }),
            sy(e, (f, v) => {
              let { darkColor: y } = v;
              return {
                [`&${t}-${f}`]: {
                  [`${t}-inner`]: { backgroundColor: y },
                  [`${t}-arrow`]: { '--antd-arrow-background-color': y },
                },
              };
            }),
          ),
          { '&-rtl': { direction: 'rtl' } },
        ),
      },
      mS(e, 'var(--antd-arrow-background-color)'),
      { [`${t}-pure`]: { position: 'relative', maxWidth: 'none', margin: e.sizePopupArrow } },
    ];
  },
  wS = (e) =>
    Object.assign(
      Object.assign(
        { zIndexPopup: e.zIndexPopupBase + 70 },
        pv({ contentRadius: e.borderRadius, limitVerticalRadius: !0 }),
      ),
      dS(Uo(e, { borderRadiusOuter: Math.min(e.borderRadiusOuter, 4) })),
    ),
  hv = function (e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
    return $0(
      'Tooltip',
      (r) => {
        const { borderRadius: i, colorTextLightSolid: o, colorBgSpotlight: a } = r,
          l = Uo(r, {
            tooltipMaxWidth: 250,
            tooltipColor: o,
            tooltipBorderRadius: i,
            tooltipBg: a,
          });
        return [CS(l), sv(r, 'zoom-big-fast')];
      },
      wS,
      { resetStyle: !1, injectStyle: t },
    )(e);
  },
  SS = vu.map((e) => `${e}-inverse`);
function xS(e) {
  return (arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0)
    ? [].concat(J(SS), J(vu)).includes(e)
    : vu.includes(e);
}
function gv(e, t) {
  const n = xS(t),
    r = Ee({ [`${e}-${t}`]: t && n }),
    i = {},
    o = {};
  return (
    t && !n && ((i.background = t), (o['--antd-arrow-background-color'] = t)),
    { className: r, overlayStyle: i, arrowStyle: o }
  );
}
const bS = (e) => {
  const {
      prefixCls: t,
      className: n,
      placement: r = 'top',
      title: i,
      color: o,
      overlayInnerStyle: a,
    } = e,
    { getPrefixCls: l } = d.useContext(Tr),
    s = l('tooltip', t),
    [u, c, f] = hv(s),
    v = gv(s, o),
    y = v.arrowStyle,
    g = Object.assign(Object.assign({}, a), v.overlayStyle),
    C = Ee(c, f, s, `${s}-pure`, `${s}-placement-${r}`, n, v.className);
  return u(
    d.createElement(
      'div',
      { className: C, style: y },
      d.createElement('div', { className: `${s}-arrow` }),
      d.createElement(
        vv,
        Object.assign({}, e, { className: c, prefixCls: s, overlayInnerStyle: g }),
        i,
      ),
    ),
  );
};
var ES = function (e, t) {
  var n = {};
  for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
  if (e != null && typeof Object.getOwnPropertySymbols == 'function')
    for (var i = 0, r = Object.getOwnPropertySymbols(e); i < r.length; i++)
      t.indexOf(r[i]) < 0 &&
        Object.prototype.propertyIsEnumerable.call(e, r[i]) &&
        (n[r[i]] = e[r[i]]);
  return n;
};
const kS = d.forwardRef((e, t) => {
    var n, r;
    const {
        prefixCls: i,
        openClassName: o,
        getTooltipContainer: a,
        overlayClassName: l,
        color: s,
        overlayInnerStyle: u,
        children: c,
        afterOpenChange: f,
        afterVisibleChange: v,
        destroyTooltipOnHide: y,
        arrow: g = !0,
        title: C,
        overlay: w,
        builtinPlacements: p,
        arrowPointAtCenter: m = !1,
        autoAdjustOverflow: h = !0,
      } = e,
      S = !!g,
      [, x] = Xo(),
      { getPopupContainer: b, getPrefixCls: E, direction: P } = d.useContext(Tr),
      M = m0(),
      I = d.useRef(null),
      F = () => {
        var X;
        (X = I.current) === null || X === void 0 || X.forceAlign();
      };
    d.useImperativeHandle(t, () => {
      var X;
      return {
        forceAlign: F,
        forcePopupAlign: () => {
          M.deprecated(!1, 'forcePopupAlign', 'forceAlign'), F();
        },
        nativeElement: (X = I.current) === null || X === void 0 ? void 0 : X.nativeElement,
      };
    });
    const [z, j] = Na(!1, {
        value: (n = e.open) !== null && n !== void 0 ? n : e.visible,
        defaultValue: (r = e.defaultOpen) !== null && r !== void 0 ? r : e.defaultVisible,
      }),
      A = !C && !w && C !== 0,
      W = (X) => {
        var Ce, Ue;
        j(A ? !1 : X),
          A ||
            ((Ce = e.onOpenChange) === null || Ce === void 0 || Ce.call(e, X),
            (Ue = e.onVisibleChange) === null || Ue === void 0 || Ue.call(e, X));
      },
      O = d.useMemo(() => {
        var X, Ce;
        let Ue = m;
        return (
          typeof g == 'object' &&
            (Ue =
              (Ce = (X = g.pointAtCenter) !== null && X !== void 0 ? X : g.arrowPointAtCenter) !==
                null && Ce !== void 0
                ? Ce
                : m),
          p ||
            yS({
              arrowPointAtCenter: Ue,
              autoAdjustOverflow: h,
              arrowWidth: S ? x.sizePopupArrow : 0,
              borderRadius: x.borderRadius,
              offset: x.marginXXS,
              visibleFirst: !0,
            })
        );
      }, [m, g, p, x]),
      R = d.useMemo(() => (C === 0 ? C : w || C || ''), [w, C]),
      k = d.createElement(vw, { space: !0 }, typeof R == 'function' ? R() : R),
      {
        getPopupContainer: $,
        placement: N = 'top',
        mouseEnterDelay: D = 0.1,
        mouseLeaveDelay: V = 0.1,
        overlayStyle: Z,
        rootClassName: H,
      } = e,
      Q = ES(e, [
        'getPopupContainer',
        'placement',
        'mouseEnterDelay',
        'mouseLeaveDelay',
        'overlayStyle',
        'rootClassName',
      ]),
      ee = E('tooltip', i),
      te = E(),
      ve = e['data-popover-inject'];
    let Ie = z;
    !('open' in e) && !('visible' in e) && A && (Ie = !1);
    const fe = d.isValidElement(c) && !Yy(c) ? c : d.createElement('span', null, c),
      me = fe.props,
      ue =
        !me.className || typeof me.className == 'string'
          ? Ee(me.className, o || `${ee}-open`)
          : me.className,
      [$e, Pe, Te] = hv(ee, !ve),
      xe = gv(ee, s),
      it = xe.arrowStyle,
      pe = Object.assign(Object.assign({}, u), xe.overlayStyle),
      nt = Ee(l, { [`${ee}-rtl`]: P === 'rtl' }, xe.className, H, Pe, Te),
      [he, ae] = X0('Tooltip', Q.zIndex),
      Be = d.createElement(
        fS,
        Object.assign({}, Q, {
          zIndex: he,
          showArrow: S,
          placement: N,
          mouseEnterDelay: D,
          mouseLeaveDelay: V,
          prefixCls: ee,
          overlayClassName: nt,
          overlayStyle: Object.assign(Object.assign({}, it), Z),
          getTooltipContainer: $ || a || b,
          ref: I,
          builtinPlacements: O,
          overlay: k,
          visible: Ie,
          onVisibleChange: W,
          afterVisibleChange: f ?? v,
          overlayInnerStyle: pe,
          arrowContent: d.createElement('span', { className: `${ee}-arrow-content` }),
          motion: { motionName: oC(te, 'zoom-big-fast', e.transitionName), motionDeadline: 1e3 },
          destroyTooltipOnHide: !!y,
        }),
        Ie ? rc(fe, { className: ue }) : fe,
      );
    return $e(d.createElement(q0.Provider, { value: ae }, Be));
  }),
  Eo = kS;
Eo._InternalPanelDoNotUseOrYouWillBeFired = bS;
var yv = d.createContext(null);
function Cv(e, t) {
  return e === void 0 ? null : ''.concat(e, '-').concat(t);
}
function wv(e) {
  var t = d.useContext(yv);
  return Cv(t, e);
}
var PS = ['children', 'locked'],
  tr = d.createContext(null);
function MS(e, t) {
  var n = T({}, e);
  return (
    Object.keys(t).forEach(function (r) {
      var i = t[r];
      i !== void 0 && (n[r] = i);
    }),
    n
  );
}
function gl(e) {
  var t = e.children,
    n = e.locked,
    r = ze(e, PS),
    i = d.useContext(tr),
    o = Ku(
      function () {
        return MS(i, r);
      },
      [i, r],
      function (a, l) {
        return !n && (a[0] !== l[0] || !ul(a[1], l[1], !0));
      },
    );
  return d.createElement(tr.Provider, { value: o }, t);
}
var RS = [],
  Sv = d.createContext(null);
function ic() {
  return d.useContext(Sv);
}
var xv = d.createContext(RS);
function Jo(e) {
  var t = d.useContext(xv);
  return d.useMemo(
    function () {
      return e !== void 0 ? [].concat(J(t), [e]) : t;
    },
    [t, e],
  );
}
var bv = d.createContext(null),
  id = d.createContext({});
function G5(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
  if (Y0(e)) {
    var n = e.nodeName.toLowerCase(),
      r =
        ['input', 'select', 'textarea', 'button'].includes(n) ||
        e.isContentEditable ||
        (n === 'a' && !!e.getAttribute('href')),
      i = e.getAttribute('tabindex'),
      o = Number(i),
      a = null;
    return (
      i && !Number.isNaN(o) ? (a = o) : r && a === null && (a = 0),
      r && e.disabled && (a = null),
      a !== null && (a >= 0 || (t && a < 0))
    );
  }
  return !1;
}
function LS(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1,
    n = J(e.querySelectorAll('*')).filter(function (r) {
      return G5(r, t);
    });
  return G5(e, t) && n.unshift(e), n;
}
var D2 = Y.LEFT,
  V2 = Y.RIGHT,
  H2 = Y.UP,
  Ts = Y.DOWN,
  Ns = Y.ENTER,
  Ev = Y.ESC,
  pa = Y.HOME,
  ha = Y.END,
  q5 = [H2, Ts, D2, V2];
function IS(e, t, n, r) {
  var i,
    o,
    a,
    l,
    s = 'prev',
    u = 'next',
    c = 'children',
    f = 'parent';
  if (e === 'inline' && r === Ns) return { inlineTrigger: !0 };
  var v = ((i = {}), L(i, H2, s), L(i, Ts, u), i),
    y = ((o = {}), L(o, D2, n ? u : s), L(o, V2, n ? s : u), L(o, Ts, c), L(o, Ns, c), o),
    g =
      ((a = {}),
      L(a, H2, s),
      L(a, Ts, u),
      L(a, Ns, c),
      L(a, Ev, f),
      L(a, D2, n ? c : f),
      L(a, V2, n ? f : c),
      a),
    C = { inline: v, horizontal: y, vertical: g, inlineSub: v, horizontalSub: g, verticalSub: g },
    w = (l = C[''.concat(e).concat(t ? '' : 'Sub')]) === null || l === void 0 ? void 0 : l[r];
  switch (w) {
    case s:
      return { offset: -1, sibling: !0 };
    case u:
      return { offset: 1, sibling: !0 };
    case f:
      return { offset: -1, sibling: !1 };
    case c:
      return { offset: 1, sibling: !1 };
    default:
      return null;
  }
}
function _S(e) {
  for (var t = e; t; ) {
    if (t.getAttribute('data-menu-list')) return t;
    t = t.parentElement;
  }
  return null;
}
function OS(e, t) {
  for (var n = e || document.activeElement; n; ) {
    if (t.has(n)) return n;
    n = n.parentElement;
  }
  return null;
}
function od(e, t) {
  var n = LS(e, !0);
  return n.filter(function (r) {
    return t.has(r);
  });
}
function Q5(e, t, n) {
  var r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 1;
  if (!e) return null;
  var i = od(e, t),
    o = i.length,
    a = i.findIndex(function (l) {
      return n === l;
    });
  return r < 0 ? (a === -1 ? (a = o - 1) : (a -= 1)) : r > 0 && (a += 1), (a = (a + o) % o), i[a];
}
var B2 = function (t, n) {
  var r = new Set(),
    i = new Map(),
    o = new Map();
  return (
    t.forEach(function (a) {
      var l = document.querySelector("[data-menu-id='".concat(Cv(n, a), "']"));
      l && (r.add(l), o.set(l, a), i.set(a, l));
    }),
    { elements: r, key2element: i, element2key: o }
  );
};
function $S(e, t, n, r, i, o, a, l, s, u) {
  var c = d.useRef(),
    f = d.useRef();
  f.current = t;
  var v = function () {
    Mr.cancel(c.current);
  };
  return (
    d.useEffect(function () {
      return function () {
        v();
      };
    }, []),
    function (y) {
      var g = y.which;
      if ([].concat(q5, [Ns, Ev, pa, ha]).includes(g)) {
        var C = o(),
          w = B2(C, r),
          p = w,
          m = p.elements,
          h = p.key2element,
          S = p.element2key,
          x = h.get(t),
          b = OS(x, m),
          E = S.get(b),
          P = IS(e, a(E, !0).length === 1, n, g);
        if (!P && g !== pa && g !== ha) return;
        (q5.includes(g) || [pa, ha].includes(g)) && y.preventDefault();
        var M = function (R) {
          if (R) {
            var k = R,
              $ = R.querySelector('a');
            $ != null && $.getAttribute('href') && (k = $);
            var N = S.get(R);
            l(N),
              v(),
              (c.current = Mr(function () {
                f.current === N && k.focus();
              }));
          }
        };
        if ([pa, ha].includes(g) || P.sibling || !b) {
          var I;
          !b || e === 'inline' ? (I = i.current) : (I = _S(b));
          var F,
            z = od(I, m);
          g === pa ? (F = z[0]) : g === ha ? (F = z[z.length - 1]) : (F = Q5(I, m, b, P.offset)),
            M(F);
        } else if (P.inlineTrigger) s(E);
        else if (P.offset > 0)
          s(E, !0),
            v(),
            (c.current = Mr(function () {
              w = B2(C, r);
              var O = b.getAttribute('aria-controls'),
                R = document.getElementById(O),
                k = Q5(R, w.elements);
              M(k);
            }, 5));
        else if (P.offset < 0) {
          var j = a(E, !0),
            A = j[j.length - 2],
            W = h.get(A);
          s(A, !1), M(W);
        }
      }
      u == null || u(y);
    }
  );
}
function TS(e) {
  Promise.resolve().then(e);
}
var ad = '__RC_UTIL_PATH_SPLIT__',
  X5 = function (t) {
    return t.join(ad);
  },
  NS = function (t) {
    return t.split(ad);
  },
  U2 = 'rc-menu-more';
function FS() {
  var e = d.useState({}),
    t = B(e, 2),
    n = t[1],
    r = d.useRef(new Map()),
    i = d.useRef(new Map()),
    o = d.useState([]),
    a = B(o, 2),
    l = a[0],
    s = a[1],
    u = d.useRef(0),
    c = d.useRef(!1),
    f = function () {
      c.current || n({});
    },
    v = d.useCallback(function (h, S) {
      var x = X5(S);
      i.current.set(x, h), r.current.set(h, x), (u.current += 1);
      var b = u.current;
      TS(function () {
        b === u.current && f();
      });
    }, []),
    y = d.useCallback(function (h, S) {
      var x = X5(S);
      i.current.delete(x), r.current.delete(h);
    }, []),
    g = d.useCallback(function (h) {
      s(h);
    }, []),
    C = d.useCallback(
      function (h, S) {
        var x = r.current.get(h) || '',
          b = NS(x);
        return S && l.includes(b[0]) && b.unshift(U2), b;
      },
      [l],
    ),
    w = d.useCallback(
      function (h, S) {
        return h
          .filter(function (x) {
            return x !== void 0;
          })
          .some(function (x) {
            var b = C(x, !0);
            return b.includes(S);
          });
      },
      [C],
    ),
    p = function () {
      var S = J(r.current.keys());
      return l.length && S.push(U2), S;
    },
    m = d.useCallback(function (h) {
      var S = ''.concat(r.current.get(h)).concat(ad),
        x = new Set();
      return (
        J(i.current.keys()).forEach(function (b) {
          b.startsWith(S) && x.add(i.current.get(b));
        }),
        x
      );
    }, []);
  return (
    d.useEffect(function () {
      return function () {
        c.current = !0;
      };
    }, []),
    {
      registerPath: v,
      unregisterPath: y,
      refreshOverflowKeys: g,
      isSubPathKey: w,
      getKeyPath: C,
      getKeys: p,
      getSubPathKeys: m,
    }
  );
}
function xa(e) {
  var t = d.useRef(e);
  t.current = e;
  var n = d.useCallback(function () {
    for (var r, i = arguments.length, o = new Array(i), a = 0; a < i; a++) o[a] = arguments[a];
    return (r = t.current) === null || r === void 0 ? void 0 : r.call.apply(r, [t].concat(o));
  }, []);
  return e ? n : void 0;
}
var jS = Math.random().toFixed(5).toString().slice(2),
  Y5 = 0;
function AS(e) {
  var t = Na(e, { value: e }),
    n = B(t, 2),
    r = n[0],
    i = n[1];
  return (
    d.useEffect(function () {
      Y5 += 1;
      var o = ''.concat(jS, '-').concat(Y5);
      i('rc-menu-uuid-'.concat(o));
    }, []),
    r
  );
}
function kv(e, t, n, r) {
  var i = d.useContext(tr),
    o = i.activeKey,
    a = i.onActive,
    l = i.onInactive,
    s = { active: o === e };
  return (
    t ||
      ((s.onMouseEnter = function (u) {
        n == null || n({ key: e, domEvent: u }), a(e);
      }),
      (s.onMouseLeave = function (u) {
        r == null || r({ key: e, domEvent: u }), l(e);
      })),
    s
  );
}
function Pv(e) {
  var t = d.useContext(tr),
    n = t.mode,
    r = t.rtl,
    i = t.inlineIndent;
  if (n !== 'inline') return null;
  var o = e;
  return r ? { paddingRight: o * i } : { paddingLeft: o * i };
}
function Mv(e) {
  var t = e.icon,
    n = e.props,
    r = e.children,
    i;
  return t === null || t === !1
    ? null
    : (typeof t == 'function'
        ? (i = d.createElement(t, T({}, n)))
        : typeof t != 'boolean' && (i = t),
      i || r || null);
}
var zS = ['item'];
function gu(e) {
  var t = e.item,
    n = ze(e, zS);
  return (
    Object.defineProperty(n, 'item', {
      get: function () {
        return (
          Xt(
            !1,
            '`info.item` is deprecated since we will move to function component that not provides React Node instance in future.',
          ),
          t
        );
      },
    }),
    n
  );
}
var DS = ['title', 'attribute', 'elementRef'],
  VS = [
    'style',
    'className',
    'eventKey',
    'warnKey',
    'disabled',
    'itemIcon',
    'children',
    'role',
    'onMouseEnter',
    'onMouseLeave',
    'onClick',
    'onKeyDown',
    'onFocus',
  ],
  HS = ['active'],
  BS = (function (e) {
    vi(n, e);
    var t = mi(n);
    function n() {
      return Ft(this, n), t.apply(this, arguments);
    }
    return (
      jt(n, [
        {
          key: 'render',
          value: function () {
            var i = this.props,
              o = i.title,
              a = i.attribute,
              l = i.elementRef,
              s = ze(i, DS),
              u = Rl(s, ['eventKey', 'popupClassName', 'popupOffset', 'onTitleClick']);
            return (
              Xt(!a, '`attribute` of Menu.Item is deprecated. Please pass attribute directly.'),
              d.createElement(
                Lr.Item,
                ye({}, a, { title: typeof o == 'string' ? o : void 0 }, u, { ref: l }),
              )
            );
          },
        },
      ]),
      n
    );
  })(d.Component),
  US = d.forwardRef(function (e, t) {
    var n,
      r = e.style,
      i = e.className,
      o = e.eventKey;
    e.warnKey;
    var a = e.disabled,
      l = e.itemIcon,
      s = e.children,
      u = e.role,
      c = e.onMouseEnter,
      f = e.onMouseLeave,
      v = e.onClick,
      y = e.onKeyDown,
      g = e.onFocus,
      C = ze(e, VS),
      w = wv(o),
      p = d.useContext(tr),
      m = p.prefixCls,
      h = p.onItemClick,
      S = p.disabled,
      x = p.overflowDisabled,
      b = p.itemIcon,
      E = p.selectedKeys,
      P = p.onActive,
      M = d.useContext(id),
      I = M._internalRenderMenuItem,
      F = ''.concat(m, '-item'),
      z = d.useRef(),
      j = d.useRef(),
      A = S || a,
      W = Zu(t, j),
      O = Jo(o),
      R = function (fe) {
        return { key: o, keyPath: J(O).reverse(), item: z.current, domEvent: fe };
      },
      k = l || b,
      $ = kv(o, A, c, f),
      N = $.active,
      D = ze($, HS),
      V = E.includes(o),
      Z = Pv(O.length),
      H = function (fe) {
        if (!A) {
          var me = R(fe);
          v == null || v(gu(me)), h(me);
        }
      },
      Q = function (fe) {
        if ((y == null || y(fe), fe.which === Y.ENTER)) {
          var me = R(fe);
          v == null || v(gu(me)), h(me);
        }
      },
      ee = function (fe) {
        P(o), g == null || g(fe);
      },
      te = {};
    e.role === 'option' && (te['aria-selected'] = V);
    var ve = d.createElement(
      BS,
      ye(
        {
          ref: z,
          elementRef: W,
          role: u === null ? 'none' : u || 'menuitem',
          tabIndex: a ? null : -1,
          'data-menu-id': x && w ? null : w,
        },
        C,
        D,
        te,
        {
          component: 'li',
          'aria-disabled': a,
          style: T(T({}, Z), r),
          className: Ee(
            F,
            ((n = {}),
            L(n, ''.concat(F, '-active'), N),
            L(n, ''.concat(F, '-selected'), V),
            L(n, ''.concat(F, '-disabled'), A),
            n),
            i,
          ),
          onClick: H,
          onKeyDown: Q,
          onFocus: ee,
        },
      ),
      s,
      d.createElement(Mv, { props: T(T({}, e), {}, { isSelected: V }), icon: k }),
    );
    return I && (ve = I(ve, e, { selected: V })), ve;
  });
function WS(e, t) {
  var n = e.eventKey,
    r = ic(),
    i = Jo(n);
  return (
    d.useEffect(
      function () {
        if (r)
          return (
            r.registerPath(n, i),
            function () {
              r.unregisterPath(n, i);
            }
          );
      },
      [i],
    ),
    r ? null : d.createElement(US, ye({}, e, { ref: t }))
  );
}
const oc = d.forwardRef(WS);
var KS = ['className', 'children'],
  ZS = function (t, n) {
    var r = t.className,
      i = t.children,
      o = ze(t, KS),
      a = d.useContext(tr),
      l = a.prefixCls,
      s = a.mode,
      u = a.rtl;
    return d.createElement(
      'ul',
      ye(
        {
          className: Ee(
            l,
            u && ''.concat(l, '-rtl'),
            ''.concat(l, '-sub'),
            ''.concat(l, '-').concat(s === 'inline' ? 'inline' : 'vertical'),
            r,
          ),
          role: 'menu',
        },
        o,
        { 'data-menu-list': !0, ref: n },
      ),
      i,
    );
  },
  ld = d.forwardRef(ZS);
ld.displayName = 'SubMenuList';
function sd(e, t) {
  return zo(e).map(function (n, r) {
    if (d.isValidElement(n)) {
      var i,
        o,
        a = n.key,
        l =
          (i = (o = n.props) === null || o === void 0 ? void 0 : o.eventKey) !== null &&
          i !== void 0
            ? i
            : a,
        s = l == null;
      s && (l = 'tmp_key-'.concat([].concat(J(t), [r]).join('-')));
      var u = { key: l, eventKey: l };
      return d.cloneElement(n, u);
    }
    return n;
  });
}
var Vt = { adjustX: 1, adjustY: 1 },
  GS = {
    topLeft: { points: ['bl', 'tl'], overflow: Vt },
    topRight: { points: ['br', 'tr'], overflow: Vt },
    bottomLeft: { points: ['tl', 'bl'], overflow: Vt },
    bottomRight: { points: ['tr', 'br'], overflow: Vt },
    leftTop: { points: ['tr', 'tl'], overflow: Vt },
    leftBottom: { points: ['br', 'bl'], overflow: Vt },
    rightTop: { points: ['tl', 'tr'], overflow: Vt },
    rightBottom: { points: ['bl', 'br'], overflow: Vt },
  },
  qS = {
    topLeft: { points: ['bl', 'tl'], overflow: Vt },
    topRight: { points: ['br', 'tr'], overflow: Vt },
    bottomLeft: { points: ['tl', 'bl'], overflow: Vt },
    bottomRight: { points: ['tr', 'br'], overflow: Vt },
    rightTop: { points: ['tr', 'tl'], overflow: Vt },
    rightBottom: { points: ['br', 'bl'], overflow: Vt },
    leftTop: { points: ['tl', 'tr'], overflow: Vt },
    leftBottom: { points: ['bl', 'br'], overflow: Vt },
  };
function Rv(e, t, n) {
  if (t) return t;
  if (n) return n[e] || n.other;
}
var QS = {
  horizontal: 'bottomLeft',
  vertical: 'rightTop',
  'vertical-left': 'rightTop',
  'vertical-right': 'leftTop',
};
function XS(e) {
  var t = e.prefixCls,
    n = e.visible,
    r = e.children,
    i = e.popup,
    o = e.popupStyle,
    a = e.popupClassName,
    l = e.popupOffset,
    s = e.disabled,
    u = e.mode,
    c = e.onVisibleChange,
    f = d.useContext(tr),
    v = f.getPopupContainer,
    y = f.rtl,
    g = f.subMenuOpenDelay,
    C = f.subMenuCloseDelay,
    w = f.builtinPlacements,
    p = f.triggerSubMenuAction,
    m = f.forceSubMenuRender,
    h = f.rootClassName,
    S = f.motion,
    x = f.defaultMotions,
    b = d.useState(!1),
    E = B(b, 2),
    P = E[0],
    M = E[1],
    I = T(y ? T({}, qS) : T({}, GS), w),
    F = QS[u],
    z = Rv(u, S, x),
    j = d.useRef(z);
  u !== 'inline' && (j.current = z);
  var A = T(
      T({}, j.current),
      {},
      { leavedClassName: ''.concat(t, '-hidden'), removeOnLeave: !1, motionAppear: !0 },
    ),
    W = d.useRef();
  return (
    d.useEffect(
      function () {
        return (
          (W.current = Mr(function () {
            M(n);
          })),
          function () {
            Mr.cancel(W.current);
          }
        );
      },
      [n],
    ),
    d.createElement(
      dv,
      {
        prefixCls: t,
        popupClassName: Ee(''.concat(t, '-popup'), L({}, ''.concat(t, '-rtl'), y), a, h),
        stretch: u === 'horizontal' ? 'minWidth' : null,
        getPopupContainer: v,
        builtinPlacements: I,
        popupPlacement: F,
        popupVisible: P,
        popup: i,
        popupStyle: o,
        popupAlign: l && { offset: l },
        action: s ? [] : [p],
        mouseEnterDelay: g,
        mouseLeaveDelay: C,
        onPopupVisibleChange: c,
        forceRender: m,
        popupMotion: A,
        fresh: !0,
      },
      r,
    )
  );
}
function YS(e) {
  var t = e.id,
    n = e.open,
    r = e.keyPath,
    i = e.children,
    o = 'inline',
    a = d.useContext(tr),
    l = a.prefixCls,
    s = a.forceSubMenuRender,
    u = a.motion,
    c = a.defaultMotions,
    f = a.mode,
    v = d.useRef(!1);
  v.current = f === o;
  var y = d.useState(!v.current),
    g = B(y, 2),
    C = g[0],
    w = g[1],
    p = v.current ? n : !1;
  d.useEffect(
    function () {
      v.current && w(!1);
    },
    [f],
  );
  var m = T({}, Rv(o, u, c));
  r.length > 1 && (m.motionAppear = !1);
  var h = m.onVisibleChanged;
  return (
    (m.onVisibleChanged = function (S) {
      return !v.current && !S && w(!0), h == null ? void 0 : h(S);
    }),
    C
      ? null
      : d.createElement(
          gl,
          { mode: o, locked: !v.current },
          d.createElement(
            tc,
            ye({ visible: p }, m, {
              forceRender: s,
              removeOnLeave: !1,
              leavedClassName: ''.concat(l, '-hidden'),
            }),
            function (S) {
              var x = S.className,
                b = S.style;
              return d.createElement(ld, { id: t, className: x, style: b }, i);
            },
          ),
        )
  );
}
var JS = [
    'style',
    'className',
    'title',
    'eventKey',
    'warnKey',
    'disabled',
    'internalPopupClose',
    'children',
    'itemIcon',
    'expandIcon',
    'popupClassName',
    'popupOffset',
    'popupStyle',
    'onClick',
    'onMouseEnter',
    'onMouseLeave',
    'onTitleClick',
    'onTitleMouseEnter',
    'onTitleMouseLeave',
  ],
  ex = ['active'],
  tx = d.forwardRef(function (e, t) {
    var n,
      r = e.style,
      i = e.className,
      o = e.title,
      a = e.eventKey;
    e.warnKey;
    var l = e.disabled,
      s = e.internalPopupClose,
      u = e.children,
      c = e.itemIcon,
      f = e.expandIcon,
      v = e.popupClassName,
      y = e.popupOffset,
      g = e.popupStyle,
      C = e.onClick,
      w = e.onMouseEnter,
      p = e.onMouseLeave,
      m = e.onTitleClick,
      h = e.onTitleMouseEnter,
      S = e.onTitleMouseLeave,
      x = ze(e, JS),
      b = wv(a),
      E = d.useContext(tr),
      P = E.prefixCls,
      M = E.mode,
      I = E.openKeys,
      F = E.disabled,
      z = E.overflowDisabled,
      j = E.activeKey,
      A = E.selectedKeys,
      W = E.itemIcon,
      O = E.expandIcon,
      R = E.onItemClick,
      k = E.onOpenChange,
      $ = E.onActive,
      N = d.useContext(id),
      D = N._internalRenderSubMenuItem,
      V = d.useContext(bv),
      Z = V.isSubPathKey,
      H = Jo(),
      Q = ''.concat(P, '-submenu'),
      ee = F || l,
      te = d.useRef(),
      ve = d.useRef(),
      Ie = c ?? W,
      fe = f ?? O,
      me = I.includes(a),
      ue = !z && me,
      $e = Z(A, a),
      Pe = kv(a, ee, h, S),
      Te = Pe.active,
      xe = ze(Pe, ex),
      it = d.useState(!1),
      pe = B(it, 2),
      nt = pe[0],
      he = pe[1],
      ae = function (Ke) {
        ee || he(Ke);
      },
      Be = function (Ke) {
        ae(!0), w == null || w({ key: a, domEvent: Ke });
      },
      X = function (Ke) {
        ae(!1), p == null || p({ key: a, domEvent: Ke });
      },
      Ce = d.useMemo(
        function () {
          return Te || (M !== 'inline' ? nt || Z([j], a) : !1);
        },
        [M, Te, j, nt, a, Z],
      ),
      Ue = Pv(H.length),
      ke = function (Ke) {
        ee || (m == null || m({ key: a, domEvent: Ke }), M === 'inline' && k(a, !me));
      },
      xt = xa(function (Ne) {
        C == null || C(gu(Ne)), R(Ne);
      }),
      bt = function (Ke) {
        M !== 'inline' && k(a, Ke);
      },
      Mt = function () {
        $(a);
      },
      Et = b && ''.concat(b, '-popup'),
      gt = d.createElement(
        'div',
        ye(
          {
            role: 'menuitem',
            style: Ue,
            className: ''.concat(Q, '-title'),
            tabIndex: ee ? null : -1,
            ref: te,
            title: typeof o == 'string' ? o : null,
            'data-menu-id': z && b ? null : b,
            'aria-expanded': ue,
            'aria-haspopup': !0,
            'aria-controls': Et,
            'aria-disabled': ee,
            onClick: ke,
            onFocus: Mt,
          },
          xe,
        ),
        o,
        d.createElement(
          Mv,
          {
            icon: M !== 'horizontal' ? fe : void 0,
            props: T(T({}, e), {}, { isOpen: ue, isSubMenu: !0 }),
          },
          d.createElement('i', { className: ''.concat(Q, '-arrow') }),
        ),
      ),
      Qe = d.useRef(M);
    if ((M !== 'inline' && H.length > 1 ? (Qe.current = 'vertical') : (Qe.current = M), !z)) {
      var We = Qe.current;
      gt = d.createElement(
        XS,
        {
          mode: We,
          prefixCls: Q,
          visible: !s && ue && M !== 'inline',
          popupClassName: v,
          popupOffset: y,
          popupStyle: g,
          popup: d.createElement(
            gl,
            { mode: We === 'horizontal' ? 'vertical' : We },
            d.createElement(ld, { id: Et, ref: ve }, u),
          ),
          disabled: ee,
          onVisibleChange: bt,
        },
        gt,
      );
    }
    var Xe = d.createElement(
      Lr.Item,
      ye({ ref: t, role: 'none' }, x, {
        component: 'li',
        style: r,
        className: Ee(
          Q,
          ''.concat(Q, '-').concat(M),
          i,
          ((n = {}),
          L(n, ''.concat(Q, '-open'), ue),
          L(n, ''.concat(Q, '-active'), Ce),
          L(n, ''.concat(Q, '-selected'), $e),
          L(n, ''.concat(Q, '-disabled'), ee),
          n),
        ),
        onMouseEnter: Be,
        onMouseLeave: X,
      }),
      gt,
      !z && d.createElement(YS, { id: Et, open: ue, keyPath: H }, u),
    );
    return (
      D && (Xe = D(Xe, e, { selected: $e, active: Ce, open: ue, disabled: ee })),
      d.createElement(
        gl,
        {
          onItemClick: xt,
          mode: M === 'horizontal' ? 'vertical' : M,
          itemIcon: Ie,
          expandIcon: fe,
        },
        Xe,
      )
    );
  }),
  ac = d.forwardRef(function (e, t) {
    var n = e.eventKey,
      r = e.children,
      i = Jo(n),
      o = sd(r, i),
      a = ic();
    d.useEffect(
      function () {
        if (a)
          return (
            a.registerPath(n, i),
            function () {
              a.unregisterPath(n, i);
            }
          );
      },
      [i],
    );
    var l;
    return (
      a ? (l = o) : (l = d.createElement(tx, ye({ ref: t }, e), o)),
      d.createElement(xv.Provider, { value: i }, l)
    );
  });
function ud(e) {
  var t = e.className,
    n = e.style,
    r = d.useContext(tr),
    i = r.prefixCls,
    o = ic();
  return o
    ? null
    : d.createElement('li', {
        role: 'separator',
        className: Ee(''.concat(i, '-item-divider'), t),
        style: n,
      });
}
var nx = ['className', 'title', 'eventKey', 'children'],
  rx = d.forwardRef(function (e, t) {
    var n = e.className,
      r = e.title;
    e.eventKey;
    var i = e.children,
      o = ze(e, nx),
      a = d.useContext(tr),
      l = a.prefixCls,
      s = ''.concat(l, '-item-group');
    return d.createElement(
      'li',
      ye({ ref: t, role: 'presentation' }, o, {
        onClick: function (c) {
          return c.stopPropagation();
        },
        className: Ee(s, n),
      }),
      d.createElement(
        'div',
        {
          role: 'presentation',
          className: ''.concat(s, '-title'),
          title: typeof r == 'string' ? r : void 0,
        },
        r,
      ),
      d.createElement('ul', { role: 'group', className: ''.concat(s, '-list') }, i),
    );
  }),
  cd = d.forwardRef(function (e, t) {
    var n = e.eventKey,
      r = e.children,
      i = Jo(n),
      o = sd(r, i),
      a = ic();
    return a ? o : d.createElement(rx, ye({ ref: t }, Rl(e, ['warnKey'])), o);
  }),
  ix = ['label', 'children', 'key', 'type'];
function W2(e, t) {
  var n = t.item,
    r = t.group,
    i = t.submenu,
    o = t.divider;
  return (e || [])
    .map(function (a, l) {
      if (a && oe(a) === 'object') {
        var s = a,
          u = s.label,
          c = s.children,
          f = s.key,
          v = s.type,
          y = ze(s, ix),
          g = f ?? 'tmp-'.concat(l);
        return c || v === 'group'
          ? v === 'group'
            ? d.createElement(r, ye({ key: g }, y, { title: u }), W2(c, t))
            : d.createElement(i, ye({ key: g }, y, { title: u }), W2(c, t))
          : v === 'divider'
            ? d.createElement(o, ye({ key: g }, y))
            : d.createElement(n, ye({ key: g }, y), u);
      }
      return null;
    })
    .filter(function (a) {
      return a;
    });
}
function J5(e, t, n, r) {
  var i = e,
    o = T({ divider: ud, item: oc, group: cd, submenu: ac }, r);
  return t && (i = W2(t, o)), sd(i, n);
}
var ox = [
    'prefixCls',
    'rootClassName',
    'style',
    'className',
    'tabIndex',
    'items',
    'children',
    'direction',
    'id',
    'mode',
    'inlineCollapsed',
    'disabled',
    'disabledOverflow',
    'subMenuOpenDelay',
    'subMenuCloseDelay',
    'forceSubMenuRender',
    'defaultOpenKeys',
    'openKeys',
    'activeKey',
    'defaultActiveFirst',
    'selectable',
    'multiple',
    'defaultSelectedKeys',
    'selectedKeys',
    'onSelect',
    'onDeselect',
    'inlineIndent',
    'motion',
    'defaultMotions',
    'triggerSubMenuAction',
    'builtinPlacements',
    'itemIcon',
    'expandIcon',
    'overflowedIndicator',
    'overflowedIndicatorPopupClassName',
    'getPopupContainer',
    'onClick',
    'onOpenChange',
    'onKeyDown',
    'openAnimation',
    'openTransitionName',
    '_internalRenderMenuItem',
    '_internalRenderSubMenuItem',
    '_internalComponents',
  ],
  Si = [],
  ax = d.forwardRef(function (e, t) {
    var n,
      r,
      i = e,
      o = i.prefixCls,
      a = o === void 0 ? 'rc-menu' : o,
      l = i.rootClassName,
      s = i.style,
      u = i.className,
      c = i.tabIndex,
      f = c === void 0 ? 0 : c,
      v = i.items,
      y = i.children,
      g = i.direction,
      C = i.id,
      w = i.mode,
      p = w === void 0 ? 'vertical' : w,
      m = i.inlineCollapsed,
      h = i.disabled,
      S = i.disabledOverflow,
      x = i.subMenuOpenDelay,
      b = x === void 0 ? 0.1 : x,
      E = i.subMenuCloseDelay,
      P = E === void 0 ? 0.1 : E,
      M = i.forceSubMenuRender,
      I = i.defaultOpenKeys,
      F = i.openKeys,
      z = i.activeKey,
      j = i.defaultActiveFirst,
      A = i.selectable,
      W = A === void 0 ? !0 : A,
      O = i.multiple,
      R = O === void 0 ? !1 : O,
      k = i.defaultSelectedKeys,
      $ = i.selectedKeys,
      N = i.onSelect,
      D = i.onDeselect,
      V = i.inlineIndent,
      Z = V === void 0 ? 24 : V,
      H = i.motion,
      Q = i.defaultMotions,
      ee = i.triggerSubMenuAction,
      te = ee === void 0 ? 'hover' : ee,
      ve = i.builtinPlacements,
      Ie = i.itemIcon,
      fe = i.expandIcon,
      me = i.overflowedIndicator,
      ue = me === void 0 ? '...' : me,
      $e = i.overflowedIndicatorPopupClassName,
      Pe = i.getPopupContainer,
      Te = i.onClick,
      xe = i.onOpenChange,
      it = i.onKeyDown;
    i.openAnimation, i.openTransitionName;
    var pe = i._internalRenderMenuItem,
      nt = i._internalRenderSubMenuItem,
      he = i._internalComponents,
      ae = ze(i, ox),
      Be = d.useMemo(
        function () {
          return [J5(y, v, Si, he), J5(y, v, Si, {})];
        },
        [y, v, he],
      ),
      X = B(Be, 2),
      Ce = X[0],
      Ue = X[1],
      ke = d.useState(!1),
      xt = B(ke, 2),
      bt = xt[0],
      Mt = xt[1],
      Et = d.useRef(),
      gt = AS(C),
      Qe = g === 'rtl',
      We = Na(I, {
        value: F,
        postState: function (ge) {
          return ge || Si;
        },
      }),
      Xe = B(We, 2),
      Ne = Xe[0],
      Ke = Xe[1],
      ut = function (ge) {
        var _e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
        function It() {
          Ke(ge), xe == null || xe(ge);
        }
        _e ? El.flushSync(It) : It();
      },
      At = d.useState(Ne),
      Dn = B(At, 2),
      Sn = Dn[0],
      Rt = Dn[1],
      Kt = d.useRef(!1),
      ct = d.useMemo(
        function () {
          return (p === 'inline' || p === 'vertical') && m ? ['vertical', m] : [p, !1];
        },
        [p, m],
      ),
      Ye = B(ct, 2),
      ot = Ye[0],
      Me = Ye[1],
      ne = ot === 'inline',
      K = d.useState(ot),
      re = B(K, 2),
      we = re[0],
      de = re[1],
      De = d.useState(Me),
      Fe = B(De, 2),
      Lt = Fe[0],
      xn = Fe[1];
    d.useEffect(
      function () {
        de(ot), xn(Me), Kt.current && (ne ? Ke(Sn) : ut(Si));
      },
      [ot, Me],
    );
    var bn = d.useState(0),
      nr = B(bn, 2),
      En = nr[0],
      rr = nr[1],
      kn = En >= Ce.length - 1 || we !== 'horizontal' || S;
    d.useEffect(
      function () {
        ne && Rt(Ne);
      },
      [Ne],
    ),
      d.useEffect(function () {
        return (
          (Kt.current = !0),
          function () {
            Kt.current = !1;
          }
        );
      }, []);
    var Zt = FS(),
      Pn = Zt.registerPath,
      ft = Zt.unregisterPath,
      Vn = Zt.refreshOverflowKeys,
      fr = Zt.isSubPathKey,
      dr = Zt.getKeyPath,
      pi = Zt.getKeys,
      yt = Zt.getSubPathKeys,
      Hi = d.useMemo(
        function () {
          return { registerPath: Pn, unregisterPath: ft };
        },
        [Pn, ft],
      ),
      ea = d.useMemo(
        function () {
          return { isSubPathKey: fr };
        },
        [fr],
      );
    d.useEffect(
      function () {
        Vn(
          kn
            ? Si
            : Ce.slice(En + 1).map(function (je) {
                return je.key;
              }),
        );
      },
      [En, kn],
    );
    var vr = Na(z || (j && ((n = Ce[0]) === null || n === void 0 ? void 0 : n.key)), { value: z }),
      hi = B(vr, 2),
      mr = hi[0],
      Fr = hi[1],
      Bi = xa(function (je) {
        Fr(je);
      }),
      pr = xa(function () {
        Fr(void 0);
      });
    d.useImperativeHandle(t, function () {
      return {
        list: Et.current,
        focus: function (ge) {
          var _e,
            It = pi(),
            _t = B2(It, gt),
            gr = _t.elements,
            gi = _t.key2element,
            na = _t.element2key,
            yi = od(Et.current, gr),
            Gi =
              mr ??
              (yi[0]
                ? na.get(yi[0])
                : (_e = Ce.find(function (Ln) {
                      return !Ln.props.disabled;
                    })) === null || _e === void 0
                  ? void 0
                  : _e.key),
            yr = gi.get(Gi);
          if (Gi && yr) {
            var Cr;
            yr == null || (Cr = yr.focus) === null || Cr === void 0 || Cr.call(yr, ge);
          }
        },
      };
    });
    var Ui = Na(k || [], {
        value: $,
        postState: function (ge) {
          return Array.isArray(ge) ? ge : ge == null ? Si : [ge];
        },
      }),
      hr = B(Ui, 2),
      en = hr[0],
      Wi = hr[1],
      Ki = function (ge) {
        if (W) {
          var _e = ge.key,
            It = en.includes(_e),
            _t;
          R
            ? It
              ? (_t = en.filter(function (gi) {
                  return gi !== _e;
                }))
              : (_t = [].concat(J(en), [_e]))
            : (_t = [_e]),
            Wi(_t);
          var gr = T(T({}, ge), {}, { selectedKeys: _t });
          It ? D == null || D(gr) : N == null || N(gr);
        }
        !R && Ne.length && we !== 'inline' && ut(Si);
      },
      Mn = xa(function (je) {
        Te == null || Te(gu(je)), Ki(je);
      }),
      tn = xa(function (je, ge) {
        var _e = Ne.filter(function (_t) {
          return _t !== je;
        });
        if (ge) _e.push(je);
        else if (we !== 'inline') {
          var It = yt(je);
          _e = _e.filter(function (_t) {
            return !It.has(_t);
          });
        }
        ul(Ne, _e, !0) || ut(_e, !0);
      }),
      jr = function (ge, _e) {
        var It = _e ?? !Ne.includes(ge);
        tn(ge, It);
      },
      Ar = $S(we, mr, Qe, gt, Et, pi, dr, Fr, jr, it);
    d.useEffect(function () {
      Mt(!0);
    }, []);
    var Rn = d.useMemo(
        function () {
          return { _internalRenderMenuItem: pe, _internalRenderSubMenuItem: nt };
        },
        [pe, nt],
      ),
      ta =
        we !== 'horizontal' || S
          ? Ce
          : Ce.map(function (je, ge) {
              return d.createElement(gl, { key: je.key, overflowDisabled: ge > En }, je);
            }),
      Zi = d.createElement(
        Lr,
        ye(
          {
            id: C,
            ref: Et,
            prefixCls: ''.concat(a, '-overflow'),
            component: 'ul',
            itemComponent: oc,
            className: Ee(
              a,
              ''.concat(a, '-root'),
              ''.concat(a, '-').concat(we),
              u,
              ((r = {}),
              L(r, ''.concat(a, '-inline-collapsed'), Lt),
              L(r, ''.concat(a, '-rtl'), Qe),
              r),
              l,
            ),
            dir: g,
            style: s,
            role: 'menu',
            tabIndex: f,
            data: ta,
            renderRawItem: function (ge) {
              return ge;
            },
            renderRawRest: function (ge) {
              var _e = ge.length,
                It = _e ? Ce.slice(-_e) : null;
              return d.createElement(
                ac,
                {
                  eventKey: U2,
                  title: ue,
                  disabled: kn,
                  internalPopupClose: _e === 0,
                  popupClassName: $e,
                },
                It,
              );
            },
            maxCount: we !== 'horizontal' || S ? Lr.INVALIDATE : Lr.RESPONSIVE,
            ssr: 'full',
            'data-menu-list': !0,
            onVisibleChange: function (ge) {
              rr(ge);
            },
            onKeyDown: Ar,
          },
          ae,
        ),
      );
    return d.createElement(
      id.Provider,
      { value: Rn },
      d.createElement(
        yv.Provider,
        { value: gt },
        d.createElement(
          gl,
          {
            prefixCls: a,
            rootClassName: l,
            mode: we,
            openKeys: Ne,
            rtl: Qe,
            disabled: h,
            motion: bt ? H : null,
            defaultMotions: bt ? Q : null,
            activeKey: mr,
            onActive: Bi,
            onInactive: pr,
            selectedKeys: en,
            inlineIndent: Z,
            subMenuOpenDelay: b,
            subMenuCloseDelay: P,
            forceSubMenuRender: M,
            builtinPlacements: ve,
            triggerSubMenuAction: te,
            getPopupContainer: Pe,
            itemIcon: Ie,
            expandIcon: fe,
            onItemClick: Mn,
            onOpenChange: tn,
          },
          d.createElement(bv.Provider, { value: ea }, Zi),
          d.createElement(
            'div',
            { style: { display: 'none' }, 'aria-hidden': !0 },
            d.createElement(Sv.Provider, { value: Hi }, Ue),
          ),
        ),
      ),
    );
  }),
  Tl = ax;
Tl.Item = oc;
Tl.SubMenu = ac;
Tl.ItemGroup = cd;
Tl.Divider = ud;
const Lv = d.createContext({});
var lx = {
    icon: {
      tag: 'svg',
      attrs: { viewBox: '64 64 896 896', focusable: 'false' },
      children: [
        {
          tag: 'path',
          attrs: {
            d: 'M176 511a56 56 0 10112 0 56 56 0 10-112 0zm280 0a56 56 0 10112 0 56 56 0 10-112 0zm280 0a56 56 0 10112 0 56 56 0 10-112 0z',
          },
        },
      ],
    },
    name: 'ellipsis',
    theme: 'outlined',
  },
  sx = function (t, n) {
    return d.createElement(nc, ye({}, t, { ref: n, icon: lx }));
  },
  ux = d.forwardRef(sx);
const yu = d.createContext({ prefixCls: '', firstLevel: !0, inlineCollapsed: !1 });
var cx = function (e, t) {
  var n = {};
  for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
  if (e != null && typeof Object.getOwnPropertySymbols == 'function')
    for (var i = 0, r = Object.getOwnPropertySymbols(e); i < r.length; i++)
      t.indexOf(r[i]) < 0 &&
        Object.prototype.propertyIsEnumerable.call(e, r[i]) &&
        (n[r[i]] = e[r[i]]);
  return n;
};
const Iv = (e) => {
    const { prefixCls: t, className: n, dashed: r } = e,
      i = cx(e, ['prefixCls', 'className', 'dashed']),
      { getPrefixCls: o } = d.useContext(Tr),
      a = o('menu', t),
      l = Ee({ [`${a}-item-divider-dashed`]: !!r }, n);
    return d.createElement(ud, Object.assign({ className: l }, i));
  },
  _v = (e) => {
    var t;
    const { className: n, children: r, icon: i, title: o, danger: a } = e,
      {
        prefixCls: l,
        firstLevel: s,
        direction: u,
        disableMenuItemTitleTooltip: c,
        inlineCollapsed: f,
      } = d.useContext(yu),
      v = (m) => {
        const h = d.createElement('span', { className: `${l}-title-content` }, r);
        return (!i || (d.isValidElement(r) && r.type === 'span')) &&
          r &&
          m &&
          s &&
          typeof r == 'string'
          ? d.createElement('div', { className: `${l}-inline-collapsed-noicon` }, r.charAt(0))
          : h;
      },
      { siderCollapsed: y } = d.useContext(Lv);
    let g = o;
    typeof o > 'u' ? (g = s ? r : '') : o === !1 && (g = '');
    const C = { title: g };
    !y && !f && ((C.title = null), (C.open = !1));
    const w = zo(r).length;
    let p = d.createElement(
      oc,
      Object.assign({}, Rl(e, ['title', 'icon', 'danger']), {
        className: Ee(
          { [`${l}-item-danger`]: a, [`${l}-item-only-child`]: (i ? w + 1 : w) === 1 },
          n,
        ),
        title: typeof o == 'string' ? o : void 0,
      }),
      rc(i, {
        className: Ee(
          d.isValidElement(i)
            ? (t = i.props) === null || t === void 0
              ? void 0
              : t.className
            : '',
          `${l}-item-icon`,
        ),
      }),
      v(f),
    );
    return (
      c ||
        (p = d.createElement(
          Eo,
          Object.assign({}, C, {
            placement: u === 'rtl' ? 'left' : 'right',
            overlayClassName: `${l}-inline-collapsed-tooltip`,
          }),
          p,
        )),
      p
    );
  },
  e6 = d.createContext(null),
  fx = (e) => {
    const {
      componentCls: t,
      motionDurationSlow: n,
      horizontalLineHeight: r,
      colorSplit: i,
      lineWidth: o,
      lineType: a,
      itemPaddingInline: l,
    } = e;
    return {
      [`${t}-horizontal`]: {
        lineHeight: r,
        border: 0,
        borderBottom: `${be(o)} ${a} ${i}`,
        boxShadow: 'none',
        '&::after': { display: 'block', clear: 'both', height: 0, content: '"\\20"' },
        [`${t}-item, ${t}-submenu`]: {
          position: 'relative',
          display: 'inline-block',
          verticalAlign: 'bottom',
          paddingInline: l,
        },
        [`> ${t}-item:hover,
        > ${t}-item-active,
        > ${t}-submenu ${t}-submenu-title:hover`]: { backgroundColor: 'transparent' },
        [`${t}-item, ${t}-submenu-title`]: {
          transition: [`border-color ${n}`, `background ${n}`].join(','),
        },
        [`${t}-submenu-arrow`]: { display: 'none' },
      },
    };
  },
  dx = (e) => {
    let { componentCls: t, menuArrowOffset: n, calc: r } = e;
    return {
      [`${t}-rtl`]: { direction: 'rtl' },
      [`${t}-submenu-rtl`]: { transformOrigin: '100% 0' },
      [`${t}-rtl${t}-vertical,
    ${t}-submenu-rtl ${t}-vertical`]: {
        [`${t}-submenu-arrow`]: {
          '&::before': { transform: `rotate(-45deg) translateY(${be(r(n).mul(-1).equal())})` },
          '&::after': { transform: `rotate(45deg) translateY(${be(n)})` },
        },
      },
    };
  },
  t6 = (e) => Object.assign({}, ly(e)),
  n6 = (e, t) => {
    const {
      componentCls: n,
      itemColor: r,
      itemSelectedColor: i,
      groupTitleColor: o,
      itemBg: a,
      subMenuItemBg: l,
      itemSelectedBg: s,
      activeBarHeight: u,
      activeBarWidth: c,
      activeBarBorderWidth: f,
      motionDurationSlow: v,
      motionEaseInOut: y,
      motionEaseOut: g,
      itemPaddingInline: C,
      motionDurationMid: w,
      itemHoverColor: p,
      lineType: m,
      colorSplit: h,
      itemDisabledColor: S,
      dangerItemColor: x,
      dangerItemHoverColor: b,
      dangerItemSelectedColor: E,
      dangerItemActiveBg: P,
      dangerItemSelectedBg: M,
      popupBg: I,
      itemHoverBg: F,
      itemActiveBg: z,
      menuSubMenuBg: j,
      horizontalItemSelectedColor: A,
      horizontalItemSelectedBg: W,
      horizontalItemBorderRadius: O,
      horizontalItemHoverBg: R,
    } = e;
    return {
      [`${n}-${t}, ${n}-${t} > ${n}`]: {
        color: r,
        background: a,
        [`&${n}-root:focus-visible`]: Object.assign({}, t6(e)),
        [`${n}-item-group-title`]: { color: o },
        [`${n}-submenu-selected`]: { [`> ${n}-submenu-title`]: { color: i } },
        [`${n}-item, ${n}-submenu-title`]: {
          color: r,
          [`&:not(${n}-item-disabled):focus-visible`]: Object.assign({}, t6(e)),
        },
        [`${n}-item-disabled, ${n}-submenu-disabled`]: { color: `${S} !important` },
        [`${n}-item:not(${n}-item-selected):not(${n}-submenu-selected)`]: {
          [`&:hover, > ${n}-submenu-title:hover`]: { color: p },
        },
        [`&:not(${n}-horizontal)`]: {
          [`${n}-item:not(${n}-item-selected)`]: {
            '&:hover': { backgroundColor: F },
            '&:active': { backgroundColor: z },
          },
          [`${n}-submenu-title`]: {
            '&:hover': { backgroundColor: F },
            '&:active': { backgroundColor: z },
          },
        },
        [`${n}-item-danger`]: {
          color: x,
          [`&${n}-item:hover`]: {
            [`&:not(${n}-item-selected):not(${n}-submenu-selected)`]: { color: b },
          },
          [`&${n}-item:active`]: { background: P },
        },
        [`${n}-item a`]: { '&, &:hover': { color: 'inherit' } },
        [`${n}-item-selected`]: {
          color: i,
          [`&${n}-item-danger`]: { color: E },
          'a, a:hover': { color: 'inherit' },
        },
        [`& ${n}-item-selected`]: {
          backgroundColor: s,
          [`&${n}-item-danger`]: { backgroundColor: M },
        },
        [`&${n}-submenu > ${n}`]: { backgroundColor: j },
        [`&${n}-popup > ${n}`]: { backgroundColor: I },
        [`&${n}-submenu-popup > ${n}`]: { backgroundColor: I },
        [`&${n}-horizontal`]: Object.assign(
          Object.assign({}, t === 'dark' ? { borderBottom: 0 } : {}),
          {
            [`> ${n}-item, > ${n}-submenu`]: {
              top: f,
              marginTop: e.calc(f).mul(-1).equal(),
              marginBottom: 0,
              borderRadius: O,
              '&::after': {
                position: 'absolute',
                insetInline: C,
                bottom: 0,
                borderBottom: `${be(u)} solid transparent`,
                transition: `border-color ${v} ${y}`,
                content: '""',
              },
              '&:hover, &-active, &-open': {
                background: R,
                '&::after': { borderBottomWidth: u, borderBottomColor: A },
              },
              '&-selected': {
                color: A,
                backgroundColor: W,
                '&:hover': { backgroundColor: W },
                '&::after': { borderBottomWidth: u, borderBottomColor: A },
              },
            },
          },
        ),
        [`&${n}-root`]: {
          [`&${n}-inline, &${n}-vertical`]: { borderInlineEnd: `${be(f)} ${m} ${h}` },
        },
        [`&${n}-inline`]: {
          [`${n}-sub${n}-inline`]: { background: l },
          [`${n}-item`]: {
            position: 'relative',
            '&::after': {
              position: 'absolute',
              insetBlock: 0,
              insetInlineEnd: 0,
              borderInlineEnd: `${be(c)} solid ${i}`,
              transform: 'scaleY(0.0001)',
              opacity: 0,
              transition: [`transform ${w} ${g}`, `opacity ${w} ${g}`].join(','),
              content: '""',
            },
            [`&${n}-item-danger`]: { '&::after': { borderInlineEndColor: E } },
          },
          [`${n}-selected, ${n}-item-selected`]: {
            '&::after': {
              transform: 'scaleY(1)',
              opacity: 1,
              transition: [`transform ${w} ${y}`, `opacity ${w} ${y}`].join(','),
            },
          },
        },
      },
    };
  },
  r6 = (e) => {
    const {
        componentCls: t,
        itemHeight: n,
        itemMarginInline: r,
        padding: i,
        menuArrowSize: o,
        marginXS: a,
        itemMarginBlock: l,
        itemWidth: s,
        itemPaddingInline: u,
      } = e,
      c = e.calc(o).add(i).add(a).equal();
    return {
      [`${t}-item`]: { position: 'relative', overflow: 'hidden' },
      [`${t}-item, ${t}-submenu-title`]: {
        height: n,
        lineHeight: be(n),
        paddingInline: u,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        marginInline: r,
        marginBlock: l,
        width: s,
      },
      [`> ${t}-item,
            > ${t}-submenu > ${t}-submenu-title`]: { height: n, lineHeight: be(n) },
      [`${t}-item-group-list ${t}-submenu-title,
            ${t}-submenu-title`]: { paddingInlineEnd: c },
    };
  },
  vx = (e) => {
    const {
        componentCls: t,
        iconCls: n,
        itemHeight: r,
        colorTextLightSolid: i,
        dropdownWidth: o,
        controlHeightLG: a,
        motionEaseOut: l,
        paddingXL: s,
        itemMarginInline: u,
        fontSizeLG: c,
        motionDurationFast: f,
        motionDurationSlow: v,
        paddingXS: y,
        boxShadowSecondary: g,
        collapsedWidth: C,
        collapsedIconSize: w,
      } = e,
      p = { height: r, lineHeight: be(r), listStylePosition: 'inside', listStyleType: 'disc' };
    return [
      {
        [t]: {
          '&-inline, &-vertical': Object.assign({ [`&${t}-root`]: { boxShadow: 'none' } }, r6(e)),
        },
        [`${t}-submenu-popup`]: {
          [`${t}-vertical`]: Object.assign(Object.assign({}, r6(e)), { boxShadow: g }),
        },
      },
      {
        [`${t}-submenu-popup ${t}-vertical${t}-sub`]: {
          minWidth: o,
          maxHeight: `calc(100vh - ${be(e.calc(a).mul(2.5).equal())})`,
          padding: '0',
          overflow: 'hidden',
          borderInlineEnd: 0,
          "&:not([class*='-active'])": { overflowX: 'hidden', overflowY: 'auto' },
        },
      },
      {
        [`${t}-inline`]: {
          width: '100%',
          [`&${t}-root`]: {
            [`${t}-item, ${t}-submenu-title`]: {
              display: 'flex',
              alignItems: 'center',
              transition: [`border-color ${v}`, `background ${v}`, `padding ${f} ${l}`].join(','),
              [`> ${t}-title-content`]: {
                flex: 'auto',
                minWidth: 0,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              },
              '> *': { flex: 'none' },
            },
          },
          [`${t}-sub${t}-inline`]: {
            padding: 0,
            border: 0,
            borderRadius: 0,
            boxShadow: 'none',
            [`& > ${t}-submenu > ${t}-submenu-title`]: p,
            [`& ${t}-item-group-title`]: { paddingInlineStart: s },
          },
          [`${t}-item`]: p,
        },
      },
      {
        [`${t}-inline-collapsed`]: {
          width: C,
          [`&${t}-root`]: {
            [`${t}-item, ${t}-submenu ${t}-submenu-title`]: {
              [`> ${t}-inline-collapsed-noicon`]: { fontSize: c, textAlign: 'center' },
            },
          },
          [`> ${t}-item,
          > ${t}-item-group > ${t}-item-group-list > ${t}-item,
          > ${t}-item-group > ${t}-item-group-list > ${t}-submenu > ${t}-submenu-title,
          > ${t}-submenu > ${t}-submenu-title`]: {
            insetInlineStart: 0,
            paddingInline: `calc(50% - ${be(e.calc(c).div(2).equal())} - ${be(u)})`,
            textOverflow: 'clip',
            [`
            ${t}-submenu-arrow,
            ${t}-submenu-expand-icon
          `]: { opacity: 0 },
            [`${t}-item-icon, ${n}`]: {
              margin: 0,
              fontSize: w,
              lineHeight: be(r),
              '+ span': { display: 'inline-block', opacity: 0 },
            },
          },
          [`${t}-item-icon, ${n}`]: { display: 'inline-block' },
          '&-tooltip': {
            pointerEvents: 'none',
            [`${t}-item-icon, ${n}`]: { display: 'none' },
            'a, a:hover': { color: i },
          },
          [`${t}-item-group-title`]: Object.assign(Object.assign({}, iy), { paddingInline: y }),
        },
      },
    ];
  },
  i6 = (e) => {
    const {
      componentCls: t,
      motionDurationSlow: n,
      motionDurationMid: r,
      motionEaseInOut: i,
      motionEaseOut: o,
      iconCls: a,
      iconSize: l,
      iconMarginInlineEnd: s,
    } = e;
    return {
      [`${t}-item, ${t}-submenu-title`]: {
        position: 'relative',
        display: 'block',
        margin: 0,
        whiteSpace: 'nowrap',
        cursor: 'pointer',
        transition: [`border-color ${n}`, `background ${n}`, `padding calc(${n} + 0.1s) ${i}`].join(
          ',',
        ),
        [`${t}-item-icon, ${a}`]: {
          minWidth: l,
          fontSize: l,
          transition: [`font-size ${r} ${o}`, `margin ${n} ${i}`, `color ${n}`].join(','),
          '+ span': {
            marginInlineStart: s,
            opacity: 1,
            transition: [`opacity ${n} ${i}`, `margin ${n}`, `color ${n}`].join(','),
          },
        },
        [`${t}-item-icon`]: Object.assign({}, _0()),
        [`&${t}-item-only-child`]: { [`> ${a}, > ${t}-item-icon`]: { marginInlineEnd: 0 } },
      },
      [`${t}-item-disabled, ${t}-submenu-disabled`]: {
        background: 'none !important',
        cursor: 'not-allowed',
        '&::after': { borderColor: 'transparent !important' },
        a: { color: 'inherit !important' },
        [`> ${t}-submenu-title`]: { color: 'inherit !important', cursor: 'not-allowed' },
      },
    };
  },
  o6 = (e) => {
    const {
      componentCls: t,
      motionDurationSlow: n,
      motionEaseInOut: r,
      borderRadius: i,
      menuArrowSize: o,
      menuArrowOffset: a,
    } = e;
    return {
      [`${t}-submenu`]: {
        '&-expand-icon, &-arrow': {
          position: 'absolute',
          top: '50%',
          insetInlineEnd: e.margin,
          width: o,
          color: 'currentcolor',
          transform: 'translateY(-50%)',
          transition: `transform ${n} ${r}, opacity ${n}`,
        },
        '&-arrow': {
          '&::before, &::after': {
            position: 'absolute',
            width: e.calc(o).mul(0.6).equal(),
            height: e.calc(o).mul(0.15).equal(),
            backgroundColor: 'currentcolor',
            borderRadius: i,
            transition: [
              `background ${n} ${r}`,
              `transform ${n} ${r}`,
              `top ${n} ${r}`,
              `color ${n} ${r}`,
            ].join(','),
            content: '""',
          },
          '&::before': { transform: `rotate(45deg) translateY(${be(e.calc(a).mul(-1).equal())})` },
          '&::after': { transform: `rotate(-45deg) translateY(${be(a)})` },
        },
      },
    };
  },
  mx = (e) => {
    const {
      antCls: t,
      componentCls: n,
      fontSize: r,
      motionDurationSlow: i,
      motionDurationMid: o,
      motionEaseInOut: a,
      paddingXS: l,
      padding: s,
      colorSplit: u,
      lineWidth: c,
      zIndexPopup: f,
      borderRadiusLG: v,
      subMenuItemBorderRadius: y,
      menuArrowSize: g,
      menuArrowOffset: C,
      lineType: w,
      groupTitleLineHeight: p,
      groupTitleFontSize: m,
    } = e;
    return [
      {
        '': { [n]: Object.assign(Object.assign({}, c5()), { '&-hidden': { display: 'none' } }) },
        [`${n}-submenu-hidden`]: { display: 'none' },
      },
      {
        [n]: Object.assign(
          Object.assign(
            Object.assign(
              Object.assign(
                Object.assign(Object.assign(Object.assign({}, I0(e)), c5()), {
                  marginBottom: 0,
                  paddingInlineStart: 0,
                  fontSize: r,
                  lineHeight: 0,
                  listStyle: 'none',
                  outline: 'none',
                  transition: `width ${i} cubic-bezier(0.2, 0, 0, 1) 0s`,
                  'ul, ol': { margin: 0, padding: 0, listStyle: 'none' },
                  '&-overflow': { display: 'flex', [`${n}-item`]: { flex: 'none' } },
                  [`${n}-item, ${n}-submenu, ${n}-submenu-title`]: {
                    borderRadius: e.itemBorderRadius,
                  },
                  [`${n}-item-group-title`]: {
                    padding: `${be(l)} ${be(s)}`,
                    fontSize: m,
                    lineHeight: p,
                    transition: `all ${i}`,
                  },
                  [`&-horizontal ${n}-submenu`]: {
                    transition: [`border-color ${i} ${a}`, `background ${i} ${a}`].join(','),
                  },
                  [`${n}-submenu, ${n}-submenu-inline`]: {
                    transition: [
                      `border-color ${i} ${a}`,
                      `background ${i} ${a}`,
                      `padding ${o} ${a}`,
                    ].join(','),
                  },
                  [`${n}-submenu ${n}-sub`]: {
                    cursor: 'initial',
                    transition: [`background ${i} ${a}`, `padding ${i} ${a}`].join(','),
                  },
                  [`${n}-title-content`]: {
                    transition: `color ${i}`,
                    [`> ${t}-typography-ellipsis-single-line`]: {
                      display: 'inline',
                      verticalAlign: 'unset',
                    },
                  },
                  [`${n}-item a`]: {
                    '&::before': {
                      position: 'absolute',
                      inset: 0,
                      backgroundColor: 'transparent',
                      content: '""',
                    },
                  },
                  [`${n}-item-divider`]: {
                    overflow: 'hidden',
                    lineHeight: 0,
                    borderColor: u,
                    borderStyle: w,
                    borderWidth: 0,
                    borderTopWidth: c,
                    marginBlock: c,
                    padding: 0,
                    '&-dashed': { borderStyle: 'dashed' },
                  },
                }),
                i6(e),
              ),
              {
                [`${n}-item-group`]: {
                  [`${n}-item-group-list`]: {
                    margin: 0,
                    padding: 0,
                    [`${n}-item, ${n}-submenu-title`]: {
                      paddingInline: `${be(e.calc(r).mul(2).equal())} ${be(s)}`,
                    },
                  },
                },
                '&-submenu': {
                  '&-popup': {
                    position: 'absolute',
                    zIndex: f,
                    borderRadius: v,
                    boxShadow: 'none',
                    transformOrigin: '0 0',
                    [`&${n}-submenu`]: { background: 'transparent' },
                    '&::before': {
                      position: 'absolute',
                      inset: 0,
                      zIndex: -1,
                      width: '100%',
                      height: '100%',
                      opacity: 0,
                      content: '""',
                    },
                    [`> ${n}`]: Object.assign(
                      Object.assign(Object.assign({ borderRadius: v }, i6(e)), o6(e)),
                      {
                        [`${n}-item, ${n}-submenu > ${n}-submenu-title`]: { borderRadius: y },
                        [`${n}-submenu-title::after`]: { transition: `transform ${i} ${a}` },
                      },
                    ),
                  },
                  '\n          &-placement-leftTop,\n          &-placement-bottomRight,\n          ':
                    { transformOrigin: '100% 0' },
                  '\n          &-placement-leftBottom,\n          &-placement-topRight,\n          ':
                    { transformOrigin: '100% 100%' },
                  '\n          &-placement-rightBottom,\n          &-placement-topLeft,\n          ':
                    { transformOrigin: '0 100%' },
                  '\n          &-placement-bottomLeft,\n          &-placement-rightTop,\n          ':
                    { transformOrigin: '0 0' },
                  '\n          &-placement-leftTop,\n          &-placement-leftBottom\n          ':
                    { paddingInlineEnd: e.paddingXS },
                  '\n          &-placement-rightTop,\n          &-placement-rightBottom\n          ':
                    { paddingInlineStart: e.paddingXS },
                  '\n          &-placement-topRight,\n          &-placement-topLeft\n          ': {
                    paddingBottom: e.paddingXS,
                  },
                  '\n          &-placement-bottomRight,\n          &-placement-bottomLeft\n          ':
                    { paddingTop: e.paddingXS },
                },
              },
            ),
            o6(e),
          ),
          {
            [`&-inline-collapsed ${n}-submenu-arrow,
        &-inline ${n}-submenu-arrow`]: {
              '&::before': { transform: `rotate(-45deg) translateX(${be(C)})` },
              '&::after': {
                transform: `rotate(45deg) translateX(${be(e.calc(C).mul(-1).equal())})`,
              },
            },
            [`${n}-submenu-open${n}-submenu-inline > ${n}-submenu-title > ${n}-submenu-arrow`]: {
              transform: `translateY(${be(e.calc(g).mul(0.2).mul(-1).equal())})`,
              '&::after': {
                transform: `rotate(-45deg) translateX(${be(e.calc(C).mul(-1).equal())})`,
              },
              '&::before': { transform: `rotate(45deg) translateX(${be(C)})` },
            },
          },
        ),
      },
      { [`${t}-layout-header`]: { [n]: { lineHeight: 'inherit' } } },
    ];
  },
  px = (e) => {
    var t, n, r;
    const {
        colorPrimary: i,
        colorError: o,
        colorTextDisabled: a,
        colorErrorBg: l,
        colorText: s,
        colorTextDescription: u,
        colorBgContainer: c,
        colorFillAlter: f,
        colorFillContent: v,
        lineWidth: y,
        lineWidthBold: g,
        controlItemBgActive: C,
        colorBgTextHover: w,
        controlHeightLG: p,
        lineHeight: m,
        colorBgElevated: h,
        marginXXS: S,
        padding: x,
        fontSize: b,
        controlHeightSM: E,
        fontSizeLG: P,
        colorTextLightSolid: M,
        colorErrorHover: I,
      } = e,
      F = (t = e.activeBarWidth) !== null && t !== void 0 ? t : 0,
      z = (n = e.activeBarBorderWidth) !== null && n !== void 0 ? n : y,
      j = (r = e.itemMarginInline) !== null && r !== void 0 ? r : e.marginXXS,
      A = new qt(M).setAlpha(0.65).toRgbString();
    return {
      dropdownWidth: 160,
      zIndexPopup: e.zIndexPopupBase + 50,
      radiusItem: e.borderRadiusLG,
      itemBorderRadius: e.borderRadiusLG,
      radiusSubMenuItem: e.borderRadiusSM,
      subMenuItemBorderRadius: e.borderRadiusSM,
      colorItemText: s,
      itemColor: s,
      colorItemTextHover: s,
      itemHoverColor: s,
      colorItemTextHoverHorizontal: i,
      horizontalItemHoverColor: i,
      colorGroupTitle: u,
      groupTitleColor: u,
      colorItemTextSelected: i,
      itemSelectedColor: i,
      colorItemTextSelectedHorizontal: i,
      horizontalItemSelectedColor: i,
      colorItemBg: c,
      itemBg: c,
      colorItemBgHover: w,
      itemHoverBg: w,
      colorItemBgActive: v,
      itemActiveBg: C,
      colorSubItemBg: f,
      subMenuItemBg: f,
      colorItemBgSelected: C,
      itemSelectedBg: C,
      colorItemBgSelectedHorizontal: 'transparent',
      horizontalItemSelectedBg: 'transparent',
      colorActiveBarWidth: 0,
      activeBarWidth: F,
      colorActiveBarHeight: g,
      activeBarHeight: g,
      colorActiveBarBorderSize: y,
      activeBarBorderWidth: z,
      colorItemTextDisabled: a,
      itemDisabledColor: a,
      colorDangerItemText: o,
      dangerItemColor: o,
      colorDangerItemTextHover: o,
      dangerItemHoverColor: o,
      colorDangerItemTextSelected: o,
      dangerItemSelectedColor: o,
      colorDangerItemBgActive: l,
      dangerItemActiveBg: l,
      colorDangerItemBgSelected: l,
      dangerItemSelectedBg: l,
      itemMarginInline: j,
      horizontalItemBorderRadius: 0,
      horizontalItemHoverBg: 'transparent',
      itemHeight: p,
      groupTitleLineHeight: m,
      collapsedWidth: p * 2,
      popupBg: h,
      itemMarginBlock: S,
      itemPaddingInline: x,
      horizontalLineHeight: `${p * 1.15}px`,
      iconSize: b,
      iconMarginInlineEnd: E - b,
      collapsedIconSize: P,
      groupTitleFontSize: b,
      darkItemDisabledColor: new qt(M).setAlpha(0.25).toRgbString(),
      darkItemColor: A,
      darkDangerItemColor: o,
      darkItemBg: '#001529',
      darkPopupBg: '#001529',
      darkSubMenuItemBg: '#000c17',
      darkItemSelectedColor: M,
      darkItemSelectedBg: i,
      darkDangerItemSelectedBg: o,
      darkItemHoverBg: 'transparent',
      darkGroupTitleColor: A,
      darkItemHoverColor: M,
      darkDangerItemHoverColor: I,
      darkDangerItemSelectedColor: M,
      darkDangerItemActiveBg: o,
      itemWidth: F ? `calc(100% + ${z}px)` : `calc(100% - ${j * 2}px)`,
    };
  },
  hx = function (e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e,
      n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0;
    return $0(
      'Menu',
      (i) => {
        const {
            colorBgElevated: o,
            controlHeightLG: a,
            fontSize: l,
            darkItemColor: s,
            darkDangerItemColor: u,
            darkItemBg: c,
            darkSubMenuItemBg: f,
            darkItemSelectedColor: v,
            darkItemSelectedBg: y,
            darkDangerItemSelectedBg: g,
            darkItemHoverBg: C,
            darkGroupTitleColor: w,
            darkItemHoverColor: p,
            darkItemDisabledColor: m,
            darkDangerItemHoverColor: h,
            darkDangerItemSelectedColor: S,
            darkDangerItemActiveBg: x,
            popupBg: b,
            darkPopupBg: E,
          } = i,
          P = i.calc(l).div(7).mul(5).equal(),
          M = Uo(i, {
            menuArrowSize: P,
            menuHorizontalHeight: i.calc(a).mul(1.15).equal(),
            menuArrowOffset: i.calc(P).mul(0.25).equal(),
            menuSubMenuBg: o,
            calc: i.calc,
            popupBg: b,
          }),
          I = Uo(M, {
            itemColor: s,
            itemHoverColor: p,
            groupTitleColor: w,
            itemSelectedColor: v,
            itemBg: c,
            popupBg: E,
            subMenuItemBg: f,
            itemActiveBg: 'transparent',
            itemSelectedBg: y,
            activeBarHeight: 0,
            activeBarBorderWidth: 0,
            itemHoverBg: C,
            itemDisabledColor: m,
            dangerItemColor: u,
            dangerItemHoverColor: h,
            dangerItemSelectedColor: S,
            dangerItemActiveBg: x,
            dangerItemSelectedBg: g,
            menuSubMenuBg: f,
            horizontalItemSelectedColor: v,
            horizontalItemSelectedBg: y,
          });
        return [
          mx(M),
          fx(M),
          vx(M),
          n6(M, 'light'),
          n6(I, 'dark'),
          dx(M),
          mw(M),
          j5(M, 'slide-up'),
          j5(M, 'slide-down'),
          sv(M, 'zoom-big'),
        ];
      },
      px,
      {
        deprecatedTokens: [
          ['colorGroupTitle', 'groupTitleColor'],
          ['radiusItem', 'itemBorderRadius'],
          ['radiusSubMenuItem', 'subMenuItemBorderRadius'],
          ['colorItemText', 'itemColor'],
          ['colorItemTextHover', 'itemHoverColor'],
          ['colorItemTextHoverHorizontal', 'horizontalItemHoverColor'],
          ['colorItemTextSelected', 'itemSelectedColor'],
          ['colorItemTextSelectedHorizontal', 'horizontalItemSelectedColor'],
          ['colorItemTextDisabled', 'itemDisabledColor'],
          ['colorDangerItemText', 'dangerItemColor'],
          ['colorDangerItemTextHover', 'dangerItemHoverColor'],
          ['colorDangerItemTextSelected', 'dangerItemSelectedColor'],
          ['colorDangerItemBgActive', 'dangerItemActiveBg'],
          ['colorDangerItemBgSelected', 'dangerItemSelectedBg'],
          ['colorItemBg', 'itemBg'],
          ['colorItemBgHover', 'itemHoverBg'],
          ['colorSubItemBg', 'subMenuItemBg'],
          ['colorItemBgActive', 'itemActiveBg'],
          ['colorItemBgSelectedHorizontal', 'horizontalItemSelectedBg'],
          ['colorActiveBarWidth', 'activeBarWidth'],
          ['colorActiveBarHeight', 'activeBarHeight'],
          ['colorActiveBarBorderSize', 'activeBarBorderWidth'],
          ['colorItemBgSelected', 'itemSelectedBg'],
        ],
        injectStyle: n,
        unitless: { groupTitleLineHeight: !0 },
      },
    )(e, t);
  },
  Ov = (e) => {
    var t;
    const { popupClassName: n, icon: r, title: i, theme: o } = e,
      a = d.useContext(yu),
      { prefixCls: l, inlineCollapsed: s, theme: u } = a,
      c = Jo();
    let f;
    if (!r)
      f =
        s && !c.length && i && typeof i == 'string'
          ? d.createElement('div', { className: `${l}-inline-collapsed-noicon` }, i.charAt(0))
          : d.createElement('span', { className: `${l}-title-content` }, i);
    else {
      const g = d.isValidElement(i) && i.type === 'span';
      f = d.createElement(
        d.Fragment,
        null,
        rc(r, {
          className: Ee(
            d.isValidElement(r)
              ? (t = r.props) === null || t === void 0
                ? void 0
                : t.className
              : '',
            `${l}-item-icon`,
          ),
        }),
        g ? i : d.createElement('span', { className: `${l}-title-content` }, i),
      );
    }
    const v = d.useMemo(() => Object.assign(Object.assign({}, a), { firstLevel: !1 }), [a]),
      [y] = X0('Menu');
    return d.createElement(
      yu.Provider,
      { value: v },
      d.createElement(
        ac,
        Object.assign({}, Rl(e, ['icon']), {
          title: f,
          popupClassName: Ee(l, n, `${l}-${o || u}`),
          popupStyle: { zIndex: y },
        }),
      ),
    );
  };
var gx = function (e, t) {
  var n = {};
  for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
  if (e != null && typeof Object.getOwnPropertySymbols == 'function')
    for (var i = 0, r = Object.getOwnPropertySymbols(e); i < r.length; i++)
      t.indexOf(r[i]) < 0 &&
        Object.prototype.propertyIsEnumerable.call(e, r[i]) &&
        (n[r[i]] = e[r[i]]);
  return n;
};
function Jc(e) {
  return e === null || e === !1;
}
const yx = { item: _v, submenu: Ov, divider: Iv },
  Cx = d.forwardRef((e, t) => {
    var n;
    const r = d.useContext(e6),
      i = r || {},
      { getPrefixCls: o, getPopupContainer: a, direction: l, menu: s } = d.useContext(Tr),
      u = o(),
      {
        prefixCls: c,
        className: f,
        style: v,
        theme: y = 'light',
        expandIcon: g,
        _internalDisableMenuItemTitleTooltip: C,
        inlineCollapsed: w,
        siderCollapsed: p,
        rootClassName: m,
        mode: h,
        selectable: S,
        onClick: x,
        overflowedIndicatorPopupClassName: b,
      } = e,
      E = gx(e, [
        'prefixCls',
        'className',
        'style',
        'theme',
        'expandIcon',
        '_internalDisableMenuItemTitleTooltip',
        'inlineCollapsed',
        'siderCollapsed',
        'rootClassName',
        'mode',
        'selectable',
        'onClick',
        'overflowedIndicatorPopupClassName',
      ]),
      P = Rl(E, ['collapsedWidth']);
    (n = i.validator) === null || n === void 0 || n.call(i, { mode: h });
    const M = on(function () {
        var V;
        x == null || x.apply(void 0, arguments),
          (V = i.onClick) === null || V === void 0 || V.call(i);
      }),
      I = i.mode || h,
      F = S ?? i.selectable,
      z = d.useMemo(() => (p !== void 0 ? p : w), [w, p]),
      j = {
        horizontal: { motionName: `${u}-slide-up` },
        inline: iC(u),
        other: { motionName: `${u}-zoom-big` },
      },
      A = o('menu', c || i.prefixCls),
      W = eC(A),
      [O, R, k] = hx(A, W, !r),
      $ = Ee(`${A}-${y}`, s == null ? void 0 : s.className, f),
      N = d.useMemo(() => {
        var V, Z;
        if (typeof g == 'function' || Jc(g)) return g || null;
        if (typeof i.expandIcon == 'function' || Jc(i.expandIcon)) return i.expandIcon || null;
        if (
          typeof (s == null ? void 0 : s.expandIcon) == 'function' ||
          Jc(s == null ? void 0 : s.expandIcon)
        )
          return (s == null ? void 0 : s.expandIcon) || null;
        const H =
          (V = g ?? (i == null ? void 0 : i.expandIcon)) !== null && V !== void 0
            ? V
            : s == null
              ? void 0
              : s.expandIcon;
        return rc(H, {
          className: Ee(
            `${A}-submenu-expand-icon`,
            d.isValidElement(H)
              ? (Z = H.props) === null || Z === void 0
                ? void 0
                : Z.className
              : void 0,
          ),
        });
      }, [g, i == null ? void 0 : i.expandIcon, s == null ? void 0 : s.expandIcon, A]),
      D = d.useMemo(
        () => ({
          prefixCls: A,
          inlineCollapsed: z || !1,
          direction: l,
          firstLevel: !0,
          theme: y,
          mode: I,
          disableMenuItemTitleTooltip: C,
        }),
        [A, z, l, C, y],
      );
    return O(
      d.createElement(
        e6.Provider,
        { value: null },
        d.createElement(
          yu.Provider,
          { value: D },
          d.createElement(
            Tl,
            Object.assign(
              {
                getPopupContainer: a,
                overflowedIndicator: d.createElement(ux, null),
                overflowedIndicatorPopupClassName: Ee(A, `${A}-${y}`, b),
                mode: I,
                selectable: F,
                onClick: M,
              },
              P,
              {
                inlineCollapsed: z,
                style: Object.assign(Object.assign({}, s == null ? void 0 : s.style), v),
                className: $,
                prefixCls: A,
                direction: l,
                defaultMotions: j,
                expandIcon: N,
                ref: t,
                rootClassName: Ee(m, R, i.rootClassName, k, W),
                _internalComponents: yx,
              },
            ),
          ),
        ),
      ),
    );
  }),
  Nl = d.forwardRef((e, t) => {
    const n = d.useRef(null),
      r = d.useContext(Lv);
    return (
      d.useImperativeHandle(t, () => ({
        menu: n.current,
        focus: (i) => {
          var o;
          (o = n.current) === null || o === void 0 || o.focus(i);
        },
      })),
      d.createElement(Cx, Object.assign({ ref: n }, e, r))
    );
  });
Nl.Item = _v;
Nl.SubMenu = Ov;
Nl.Divider = Iv;
Nl.ItemGroup = cd;
const wx = '_navigation_1jl34_1',
  Sx = { navigation: wx },
  ba = {
    newCollection: '/new-collection',
    giftCard: '/gift-card',
    contact: '/contact',
    about: '/about',
    home: '/',
  },
  a6 = [
    {
      label: _.jsx(Ut, { to: '/new-collection', children: 'New Collection' }),
      key: ba.newCollection,
    },
    { label: _.jsx(Ut, { to: '/gift-card', children: 'Gift Card' }), key: ba.giftCard },
    { label: _.jsx(Ut, { to: '/contact', children: 'Contact' }), key: ba.contact },
    { label: _.jsx(Ut, { to: '/about', children: 'About us' }), key: ba.about },
  ],
  xx = () => {
    const e = Pl(),
      [t, n] = d.useState('');
    return (
      d.useEffect(() => {
        var o, a;
        const r = e.pathname,
          i =
            ((a =
              (o = a6.find((l) => (l == null ? void 0 : l.key) === r)) == null ? void 0 : o.key) ==
            null
              ? void 0
              : a.toString()) || ba.home;
        n(i);
      }, [e.pathname]),
      _.jsx(Nl, { className: `${Sx.navigation}`, selectedKeys: [t], mode: 'horizontal', items: a6 })
    );
  },
  bx = () =>
    _.jsx(Ut, {
      to: '#',
      children: _.jsx('svg', {
        width: '15',
        height: '16',
        viewBox: '0 0 15 16',
        fill: 'none',
        xmlns: 'http://www.w3.org/2000/svg',
        children: _.jsx('path', {
          d: 'M1.00006 15C1.00006 15 0.999832 12.9031 1.00025 10.6251C1.00061 8.68055 14 8.68054 14 10.625V15M10.4546 3.91667C10.4546 5.5275 9.13177 6.83333 7.50003 6.83333C5.86829 6.83333 4.5455 5.5275 4.5455 3.91667C4.5455 2.30584 5.86829 1 7.50003 1C9.13177 1 10.4546 2.30584 10.4546 3.91667Z',
          stroke: 'black',
          strokeWidth: '1.5',
          strokeLinecap: 'round',
        }),
      }),
    }),
  Ex = () =>
    _.jsx(Ut, {
      to: '#',
      children: _.jsx('svg', {
        width: '17',
        height: '16',
        viewBox: '0 0 17 16',
        fill: 'none',
        xmlns: 'http://www.w3.org/2000/svg',
        children: _.jsx('path', {
          d: 'M1 1H3.72727L5.55455 9.92667C5.61689 10.2336 5.78766 10.5093 6.03696 10.7055C6.28626 10.9018 6.5982 11.006 6.91818 11H13.5455C13.8654 11.006 14.1774 10.9018 14.4267 10.7055C14.676 10.5093 14.8467 10.2336 14.9091 9.92667L16 4.33333H4.40909M7.13636 14.3333C7.13636 14.7015 6.8311 15 6.45455 15C6.07799 15 5.77273 14.7015 5.77273 14.3333C5.77273 13.9651 6.07799 13.6667 6.45455 13.6667C6.8311 13.6667 7.13636 13.9651 7.13636 14.3333ZM14.6364 14.3333C14.6364 14.7015 14.3311 15 13.9545 15C13.578 15 13.2727 14.7015 13.2727 14.3333C13.2727 13.9651 13.578 13.6667 13.9545 13.6667C14.3311 13.6667 14.6364 13.9651 14.6364 14.3333Z',
          stroke: '#1E1E1E',
          strokeWidth: '1.5',
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
        }),
      }),
    }),
  kx = () =>
    _.jsx(Ut, {
      to: '/',
      children: _.jsx('svg', {
        width: '15',
        height: '17',
        viewBox: '0 0 15 17',
        fill: 'none',
        xmlns: 'http://www.w3.org/2000/svg',
        children: _.jsx('path', {
          d: 'M5.2 15.5V8.5H9.4V15.5M1 6.4L7.3 1.5L13.6 6.4V14.1C13.6 14.4713 13.4525 14.8274 13.19 15.0899C12.9274 15.3525 12.5713 15.5 12.2 15.5H2.4C2.0287 15.5 1.6726 15.3525 1.41005 15.0899C1.1475 14.8274 1 14.4713 1 14.1V6.4Z',
          stroke: '#1E1E1E',
          strokeWidth: '1.5',
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
        }),
      }),
    }),
  Px = '_Logo_wbhls_1',
  Mx = { Logo: Px },
  Rx = () =>
    _.jsx(Ut, {
      to: '/',
      className: Mx.Logo,
      children: _.jsxs('svg', {
        width: '72',
        height: '29',
        viewBox: '0 0 72 29',
        fill: 'none',
        xmlns: 'http://www.w3.org/2000/svg',
        children: [
          _.jsx('path', {
            d: 'M0.5 0.5H4.4295L23.2911 24.0831V3.26056C23.2911 2.5507 23.0685 1.98545 22.6231 1.56479C22.204 1.11784 21.6407 0.894366 20.9334 0.894366V0.5H26.0418V0.894366C25.3345 0.894366 24.7581 1.11784 24.3128 1.56479C23.8936 1.98545 23.6841 2.5507 23.6841 3.26056V28.1056H23.2911L4.4295 4.52253V25.3451C4.4295 26.0549 4.63908 26.6333 5.05822 27.0803C5.50357 27.5009 6.0799 27.7113 6.78721 27.7113V28.1056H1.67885V27.7113C2.38616 27.7113 2.94939 27.5009 3.36854 27.0803C3.81388 26.6333 4.03655 26.0549 4.03655 25.3451V4.00986L2.30757 1.88028C2.098 1.59108 1.83603 1.35446 1.52167 1.17042C1.20731 0.986385 0.866754 0.894366 0.5 0.894366V0.5Z',
            fill: '#1E1E1E',
          }),
          _.jsx('path', {
            d: 'M37.8564 7.99296C39.271 7.99296 40.5939 8.26901 41.8252 8.82113C43.0564 9.34695 44.1305 10.07 45.0474 10.9901C45.9905 11.9103 46.724 13.0014 47.2479 14.2634C47.798 15.4991 48.0731 16.8268 48.0731 18.2465C48.0731 19.6662 47.798 20.9939 47.2479 22.2296C46.724 23.4653 45.9905 24.5563 45.0474 25.5028C44.1305 26.423 43.0564 27.1592 41.8252 27.7113C40.5939 28.2371 39.271 28.5 37.8564 28.5C36.4418 28.5 35.1188 28.2371 33.8876 27.7113C32.6563 27.1592 31.5692 26.423 30.6261 25.5028C29.7092 24.5563 28.9757 23.4653 28.4256 22.2296C27.9016 20.9939 27.6397 19.6662 27.6397 18.2465C27.6397 16.8268 27.9016 15.4991 28.4256 14.2634C28.9757 13.0014 29.7092 11.9103 30.6261 10.9901C31.5692 10.07 32.6563 9.34695 33.8876 8.82113C35.1188 8.26901 36.4418 7.99296 37.8564 7.99296ZM29.8009 18.2465C29.8009 19.5347 30.0105 20.7573 30.4296 21.9141C30.8488 23.0709 31.4251 24.0831 32.1586 24.9507C32.8921 25.792 33.7435 26.4624 34.7128 26.962C35.7083 27.4615 36.7561 27.7113 37.8564 27.7113C38.9566 27.7113 39.9914 27.4615 40.9607 26.962C41.9562 26.4624 42.8207 25.792 43.5542 24.9507C44.2877 24.0831 44.864 23.0709 45.2831 21.9141C45.7023 20.7573 45.9119 19.5347 45.9119 18.2465C45.9119 16.9319 45.7023 15.7094 45.2831 14.5789C44.864 13.4221 44.2877 12.423 43.5542 11.5817C42.8207 10.7141 41.9562 10.0305 40.9607 9.53099C39.9914 9.03146 38.9566 8.78169 37.8564 8.78169C36.7561 8.78169 35.7083 9.03146 34.7128 9.53099C33.7435 10.0305 32.8921 10.7141 32.1586 11.5817C31.4251 12.423 30.8488 13.4221 30.4296 14.5789C30.0105 15.7094 29.8009 16.9319 29.8009 18.2465Z',
            fill: '#1E1E1E',
          }),
          _.jsx('path', {
            d: 'M50.4139 28.1056V27.7113C51.0164 27.7113 51.488 27.5404 51.8285 27.1986C52.1953 26.8305 52.3787 26.3441 52.3787 25.7394V11.7394C52.3787 10.8981 52.0512 10.4775 51.3963 10.4775C51.0819 10.4775 50.7545 10.5695 50.4139 10.7535V10.3592L53.9505 8.38733H54.3434V25.7394C54.3434 26.3441 54.5137 26.8305 54.8542 27.1986C55.221 27.5404 55.7056 27.7113 56.3082 27.7113V28.1056H50.4139ZM53.361 0.5C53.885 0.5 54.3434 0.697183 54.7364 1.09155C55.1293 1.48592 55.3258 1.94601 55.3258 2.47183C55.3258 2.99765 55.1293 3.45775 54.7364 3.85211C54.3434 4.24648 53.885 4.44366 53.361 4.44366C52.8371 4.44366 52.3787 4.24648 51.9857 3.85211C51.5928 3.45775 51.3963 2.99765 51.3963 2.47183C51.3963 1.94601 51.5928 1.48592 51.9857 1.09155C52.3787 0.697183 52.8371 0.5 53.361 0.5Z',
            fill: '#1E1E1E',
          }),
          _.jsx('path', {
            d: 'M62.7765 8.38733H63.1694V13.7113C63.4838 13.0014 63.8899 12.331 64.3876 11.7C64.8853 11.0427 65.4486 10.4775 66.0773 10.0042C66.7322 9.5047 67.4395 9.11033 68.1992 8.82113C68.9851 8.53193 69.8103 8.38733 70.6748 8.38733L71.5 11.8183H71.107C70.8713 11.1347 70.4914 10.5826 69.9675 10.162C69.4698 9.74131 68.9327 9.53099 68.3564 9.53099C68.0944 9.53099 67.8063 9.59671 67.4919 9.72817C66.3916 10.2277 65.4617 10.9901 64.702 12.0155C63.9684 13.0146 63.4576 14.1714 63.1694 15.4859V25.7394C63.1694 26.3441 63.3397 26.8305 63.6803 27.1986C64.047 27.5404 64.5317 27.7113 65.1342 27.7113V28.1056H59.2399V27.7113C59.8425 27.7113 60.314 27.5404 60.6546 27.1986C61.0213 26.8305 61.2047 26.3441 61.2047 25.7394V11.7394C61.2047 10.8981 60.8772 10.4775 60.2223 10.4775C59.908 10.4775 59.5805 10.5695 59.2399 10.7535V10.3592L62.7765 8.38733Z',
            fill: '#1E1E1E',
          }),
        ],
      }),
    }),
  Lx = () =>
    _.jsx(Ut, {
      to: '#',
      children: _.jsx('svg', {
        width: '14',
        height: '14',
        viewBox: '0 0 14 14',
        fill: 'none',
        xmlns: 'http://www.w3.org/2000/svg',
        children: _.jsx('path', {
          d: 'M1 13L3.9 10.1M2.33333 6.33333C2.33333 9.27885 4.72115 11.6667 7.66667 11.6667C10.6122 11.6667 13 9.27885 13 6.33333C13 3.38781 10.6122 1 7.66667 1C4.72115 1 2.33333 3.38781 2.33333 6.33333Z',
          stroke: '#1E1E1E',
          strokeWidth: '1.5',
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
        }),
      }),
    }),
  Ix = '_Header_wezpe_1',
  _x = { Header: Ix },
  Ox = () =>
    _.jsx('div', {
      className: `${_x.Header}`,
      children: _.jsxs('div', {
        className: 'header-wrapper',
        children: [
          _.jsxs('div', {
            className: 'header-top',
            children: [
              _.jsxs('div', {
                className: 'header-container',
                children: [
                  _.jsx(Eo, {
                    title: 'Home',
                    arrow: !1,
                    children: _.jsx('span', { children: _.jsx(kx, {}) }),
                  }),
                  _.jsx(Eo, {
                    title: 'Search',
                    arrow: !1,
                    children: _.jsx('span', { children: _.jsx(Lx, {}) }),
                  }),
                ],
              }),
              _.jsx('div', {
                className: 'header-container',
                children: _.jsx('span', { children: _.jsx(Rx, {}) }),
              }),
              _.jsxs('div', {
                className: 'header-container',
                children: [
                  _.jsx(Eo, {
                    title: 'Cart',
                    arrow: !1,
                    children: _.jsx('span', { children: _.jsx(Ex, {}) }),
                  }),
                  _.jsx(Eo, {
                    title: 'Account',
                    arrow: !1,
                    children: _.jsx('span', { children: _.jsx(bx, {}) }),
                  }),
                ],
              }),
            ],
          }),
          _.jsx('div', { className: 'header-nav', children: _.jsx(xx, {}) }),
        ],
      }),
    }),
  $x = '/assets/banner_1-0GECNUQQ.png',
  Tx = '/assets/banner_2-DhIwp5rx.png',
  Nx = '/assets/banner_3-BLrYbZWK.png',
  Fx = '/assets/banner_4-pmA3nLKh.png',
  jx = () =>
    _.jsx('div', {
      className: 'banner',
      children: _.jsx('div', {
        className: 'banner-images',
        children: _.jsxs('div', {
          className: 'banner-image-item',
          children: [
            _.jsx('img', { src: $x, alt: 'banner-image' }),
            _.jsx('img', { src: Tx, alt: 'banner-image' }),
            _.jsx('img', { src: Nx, alt: 'banner-image' }),
            _.jsx('img', { src: Fx, alt: 'banner-image' }),
          ],
        }),
      }),
    }),
  Ax = () => _.jsx('div', { children: _.jsx(jx, {}) }),
  zx = () => _.jsx('div', { children: 'NewCollection' }),
  Dx = () => _.jsx('div', { children: 'GiftCard' }),
  Vx = () => _.jsx('div', { children: 'Contact' }),
  Hx = () => _.jsx('div', { children: 'About' }),
  Bx = () =>
    _.jsx(Ut, {
      to: '#',
      children: _.jsx('svg', {
        width: '15',
        height: '14',
        viewBox: '0 0 15 14',
        fill: 'none',
        xmlns: 'http://www.w3.org/2000/svg',
        children: _.jsx('path', {
          d: 'M5.2 10.6L1 13V3.4L5.2 1M5.2 10.6L10 13M5.2 10.6V1M10 13L14.2 10.6V1L10 3.4M10 13V3.4M10 3.4L5.2 1',
          stroke: 'black',
          'stroke-linecap': 'round',
          'stroke-linejoin': 'round',
        }),
      }),
    }),
  Ux = () =>
    _.jsx(Ut, {
      to: '#',
      children: _.jsx('svg', {
        width: '13',
        height: '14',
        viewBox: '0 0 13 14',
        fill: 'none',
        xmlns: 'http://www.w3.org/2000/svg',
        children: _.jsx('path', {
          d: 'M9.23184 1H7.43184C6.63619 1 5.87312 1.31607 5.31052 1.87868C4.74791 2.44129 4.43184 3.20435 4.43184 4V5.8H2.63184V8.2H4.43184V13H6.83184V8.2H8.63184L9.23184 5.8H6.83184V4C6.83184 3.84087 6.89505 3.68826 7.00757 3.57574C7.12009 3.46321 7.27271 3.4 7.43184 3.4H9.23184V1Z',
          stroke: '#1E1E1E',
          'stroke-linecap': 'round',
          'stroke-linejoin': 'round',
        }),
      }),
    }),
  Wx = () =>
    _.jsx(Ut, {
      to: '#',
      children: _.jsxs('svg', {
        width: '15',
        height: '14',
        viewBox: '0 0 15 14',
        fill: 'none',
        xmlns: 'http://www.w3.org/2000/svg',
        children: [
          _.jsx('path', {
            d: 'M9.8421 4.78947C10.8471 4.78947 11.811 5.18872 12.5217 5.89938C13.2323 6.61005 13.6316 7.57392 13.6316 8.57895V13H11.1053V8.57895C11.1053 8.24394 10.9722 7.92265 10.7353 7.68576C10.4984 7.44887 10.1771 7.31579 9.8421 7.31579C9.50709 7.31579 9.18581 7.44887 8.94892 7.68576C8.71203 7.92265 8.57895 8.24394 8.57895 8.57895V13H6.05263V8.57895C6.05263 7.57392 6.45188 6.61005 7.16254 5.89938C7.87321 5.18872 8.83707 4.78947 9.8421 4.78947Z',
            stroke: '#1E1E1E',
            'stroke-linecap': 'round',
            'stroke-linejoin': 'round',
          }),
          _.jsx('path', {
            d: 'M3.52632 5.42105H1V13H3.52632V5.42105Z',
            stroke: '#1E1E1E',
            'stroke-linecap': 'round',
            'stroke-linejoin': 'round',
          }),
          _.jsx('path', {
            d: 'M2.26316 3.52632C2.96078 3.52632 3.52632 2.96078 3.52632 2.26316C3.52632 1.56553 2.96078 1 2.26316 1C1.56553 1 1 1.56553 1 2.26316C1 2.96078 1.56553 3.52632 2.26316 3.52632Z',
            stroke: '#1E1E1E',
            'stroke-linecap': 'round',
            'stroke-linejoin': 'round',
          }),
        ],
      }),
    }),
  Kx = () =>
    _.jsx(Ut, {
      to: '#',
      children: _.jsx('svg', {
        width: '14',
        height: '14',
        viewBox: '0 0 14 14',
        fill: 'none',
        xmlns: 'http://www.w3.org/2000/svg',
        children: _.jsx('path', {
          d: 'M10.5314 3.7H10.5374M4.23145 1H10.2314C11.8883 1 13.2314 2.34315 13.2314 4V10C13.2314 11.6569 11.8883 13 10.2314 13H4.23145C2.57459 13 1.23145 11.6569 1.23145 10V4C1.23145 2.34315 2.57459 1 4.23145 1ZM9.63145 6.622C9.70549 7.12135 9.6202 7.63133 9.3877 8.07941C9.1552 8.52749 8.78733 8.89085 8.33642 9.1178C7.88551 9.34476 7.37451 9.42376 6.87612 9.34356C6.37772 9.26336 5.9173 9.02805 5.56035 8.6711C5.2034 8.31414 4.96808 7.85373 4.88789 7.35533C4.80769 6.85693 4.88668 6.34594 5.11364 5.89502C5.3406 5.44411 5.70396 5.07624 6.15204 4.84375C6.60012 4.61125 7.1101 4.52595 7.60945 4.6C8.1188 4.67553 8.59036 4.91288 8.95446 5.27698C9.31857 5.64109 9.55591 6.11265 9.63145 6.622Z',
          stroke: '#1E1E1E',
          'stroke-linecap': 'round',
          'stroke-linejoin': 'round',
        }),
      }),
    }),
  Zx = () =>
    _.jsx(Ut, {
      to: '#',
      children: _.jsx('svg', {
        width: '16',
        height: '9',
        viewBox: '0 0 16 9',
        fill: 'none',
        xmlns: 'http://www.w3.org/2000/svg',
        children: _.jsx('path', {
          d: 'M15 1.5C15 0.95 14.37 0.5 13.6 0.5H2.4C1.63 0.5 1 0.95 1 1.5M15 1.5V7.5C15 8.05 14.37 8.5 13.6 8.5H2.4C1.63 8.5 1 8.05 1 7.5V1.5M15 1.5L8 5L1 1.5',
          stroke: 'black',
          'stroke-linecap': 'round',
          'stroke-linejoin': 'round',
        }),
      }),
    }),
  Gx = () =>
    _.jsx(Ut, {
      to: '#',
      children: _.jsx('svg', {
        width: '14',
        height: '14',
        viewBox: '0 0 14 14',
        fill: 'none',
        xmlns: 'http://www.w3.org/2000/svg',
        children: _.jsx('path', {
          d: 'M12.9759 11.7908V9.98431C12.9832 9.68899 12.8817 9.40128 12.6908 9.1759C12.4998 8.95052 12.2326 8.80318 11.9401 8.76192C11.362 8.68567 10.7944 8.54427 10.2481 8.3404C10.0325 8.25939 9.7983 8.24185 9.57311 8.28988C9.34793 8.3379 9.14122 8.44948 8.9775 8.61138L8.21276 9.37612C6.70522 8.51891 5.457 7.27069 4.59979 5.76315L5.36454 4.99841C5.52643 4.83469 5.63801 4.62799 5.68603 4.4028C5.73406 4.17761 5.71653 3.94338 5.63551 3.72785C5.43165 3.18152 5.29024 2.61389 5.21399 2.03578C5.17309 1.74641 5.02837 1.48178 4.80679 1.29122C4.58521 1.10067 4.30191 0.997182 4.00967 1.00006H2.20319C2.03599 1.00022 1.87066 1.03519 1.71772 1.10274C1.56478 1.1703 1.42758 1.26896 1.31486 1.39244C1.20214 1.51592 1.11636 1.66153 1.063 1.81998C1.00963 1.97843 0.98984 2.14625 1.00489 2.31277C1.20254 4.17405 1.83586 5.96259 2.85352 7.53351C3.77804 8.98843 5.01157 10.222 6.46649 11.1465C8.0303 12.1606 9.81019 12.7938 11.6631 12.9951C11.8302 13.0102 11.9985 12.9903 12.1574 12.9365C12.3162 12.8828 12.4621 12.7965 12.5857 12.6831C12.7093 12.5697 12.8078 12.4318 12.875 12.2781C12.9422 12.1245 12.9765 11.9585 12.9759 11.7908Z',
          stroke: 'black',
          'stroke-linecap': 'round',
          'stroke-linejoin': 'round',
        }),
      }),
    }),
  qx = () =>
    _.jsx(Ut, {
      to: '#',
      children: _.jsxs('svg', {
        width: '22',
        height: '35',
        viewBox: '0 0 22 35',
        fill: 'none',
        xmlns: 'http://www.w3.org/2000/svg',
        children: [
          _.jsxs('mask', {
            id: 'path-1-inside-1_509_853',
            fill: 'white',
            children: [
              _.jsx('path', {
                d: 'M11.299 0.76878C13.183 0.76833 15.0282 1.30473 16.6192 2.31535C18.2102 3.32596 19.4813 4.76908 20.2841 6.47617C20.9165 7.83271 21.2391 9.31342 21.2282 10.8105L21.2282 23.8797C21.2495 25.0045 21.102 26.1261 20.7907 27.207C20.3757 28.5631 19.6759 29.8146 18.7381 30.8774C17.8003 31.9402 16.6463 32.7897 15.3537 33.3689C14.061 33.9481 12.6596 34.2435 11.2435 34.2354C9.82736 34.2273 8.42939 33.9158 7.14342 33.3218C5.42488 32.528 3.96874 31.2586 2.94662 29.6634C1.9245 28.0681 1.379 26.2134 1.37443 24.3179C1.37443 23.7905 1.37443 23.2616 1.37443 22.7327L1.37443 11.5808C1.34925 10.7728 1.38878 9.96401 1.49263 9.16227C1.85797 6.82122 3.04736 4.68828 4.84584 3.14891C6.64433 1.60955 8.93327 0.765312 11.299 0.76878C11.7933 0.76878 11.7949 3.8147e-06 11.299 3.8147e-06C9.29848 -0.00107956 7.33784 0.560394 5.64025 1.62051C3.94267 2.68063 2.57634 4.19681 1.6968 5.99645C0.975374 7.48834 0.602636 9.1252 0.606863 10.7829L0.606863 23.9597C0.585873 25.2302 0.773617 26.4956 1.16258 27.7051C1.96407 30.0909 3.57888 32.1176 5.72362 33.4297C7.86836 34.7419 10.406 35.2555 12.8911 34.8804C15.3763 34.5054 17.6501 33.2657 19.3136 31.3789C20.9771 29.4921 21.924 27.0787 21.9881 24.5624C21.9958 23.9704 21.9958 23.3769 21.9958 22.7834L21.9958 11.4917C22.0179 10.558 21.9532 9.62421 21.8023 8.70255C21.3381 6.25359 20.0345 4.04388 18.1169 2.455C16.1992 0.866119 13.7878 -0.00219727 11.299 3.8147e-06C10.8062 3.8147e-06 10.8047 0.76878 11.299 0.76878Z',
              }),
              _.jsx('path', {
                d: 'M14.7069 13.8132L11.5706 10.7504C11.4976 10.68 11.4002 10.6406 11.2989 10.6406C11.1975 10.6406 11.1001 10.68 11.0272 10.7504L8.01065 13.6548C7.65297 13.9993 8.1964 14.542 8.55255 14.1991L11.1976 11.653L11.5706 11.2947H11.0272L13.772 13.9731L14.1665 14.356C14.5211 14.7019 15.063 14.1592 14.7099 13.8132H14.7069Z',
              }),
              _.jsx('path', {
                d: 'M11.6274 24.0948L11.6765 12.6308V11.0226C11.6765 10.5275 10.909 10.5275 10.909 11.0226L10.8967 15.4676L10.8598 24.0994C10.8598 24.5945 11.6274 24.5945 11.6274 24.0994V24.0948Z',
              }),
            ],
          }),
          _.jsx('path', {
            d: 'M11.299 0.76878C13.183 0.76833 15.0282 1.30473 16.6192 2.31535C18.2102 3.32596 19.4813 4.76908 20.2841 6.47617C20.9165 7.83271 21.2391 9.31342 21.2282 10.8105L21.2282 23.8797C21.2495 25.0045 21.102 26.1261 20.7907 27.207C20.3757 28.5631 19.6759 29.8146 18.7381 30.8774C17.8003 31.9402 16.6463 32.7897 15.3537 33.3689C14.061 33.9481 12.6596 34.2435 11.2435 34.2354C9.82736 34.2273 8.42939 33.9158 7.14342 33.3218C5.42488 32.528 3.96874 31.2586 2.94662 29.6634C1.9245 28.0681 1.379 26.2134 1.37443 24.3179C1.37443 23.7905 1.37443 23.2616 1.37443 22.7327L1.37443 11.5808C1.34925 10.7728 1.38878 9.96401 1.49263 9.16227C1.85797 6.82122 3.04736 4.68828 4.84584 3.14891C6.64433 1.60955 8.93327 0.765312 11.299 0.76878C11.7933 0.76878 11.7949 3.8147e-06 11.299 3.8147e-06C9.29848 -0.00107956 7.33784 0.560394 5.64025 1.62051C3.94267 2.68063 2.57634 4.19681 1.6968 5.99645C0.975374 7.48834 0.602636 9.1252 0.606863 10.7829L0.606863 23.9597C0.585873 25.2302 0.773617 26.4956 1.16258 27.7051C1.96407 30.0909 3.57888 32.1176 5.72362 33.4297C7.86836 34.7419 10.406 35.2555 12.8911 34.8804C15.3763 34.5054 17.6501 33.2657 19.3136 31.3789C20.9771 29.4921 21.924 27.0787 21.9881 24.5624C21.9958 23.9704 21.9958 23.3769 21.9958 22.7834L21.9958 11.4917C22.0179 10.558 21.9532 9.62421 21.8023 8.70255C21.3381 6.25359 20.0345 4.04388 18.1169 2.455C16.1992 0.866119 13.7878 -0.00219727 11.299 3.8147e-06C10.8062 3.8147e-06 10.8047 0.76878 11.299 0.76878Z',
            fill: '#231F20',
          }),
          _.jsx('path', {
            d: 'M14.7069 13.8132L11.5706 10.7504C11.4976 10.68 11.4002 10.6406 11.2989 10.6406C11.1975 10.6406 11.1001 10.68 11.0272 10.7504L8.01065 13.6548C7.65297 13.9993 8.1964 14.542 8.55255 14.1991L11.1976 11.653L11.5706 11.2947H11.0272L13.772 13.9731L14.1665 14.356C14.5211 14.7019 15.063 14.1592 14.7099 13.8132H14.7069Z',
            fill: '#231F20',
          }),
          _.jsx('path', {
            d: 'M11.6274 24.0948L11.6765 12.6308V11.0226C11.6765 10.5275 10.909 10.5275 10.909 11.0226L10.8967 15.4676L10.8598 24.0994C10.8598 24.5945 11.6274 24.5945 11.6274 24.0994V24.0948Z',
            fill: '#231F20',
          }),
          _.jsx('path', {
            d: 'M11.299 0.76878V5.76878V0.76878ZM20.2841 6.47617L24.8158 4.36339L24.8123 4.35591L24.8088 4.34844L20.2841 6.47617ZM21.2282 10.8105L16.2283 10.7742L16.2282 10.7924V10.8105H21.2282ZM21.2282 23.8797H16.2282V23.927L16.2291 23.9742L21.2282 23.8797ZM20.7907 27.207L25.5719 28.67L25.584 28.6304L25.5954 28.5907L20.7907 27.207ZM7.14342 33.3218L5.04668 37.8609L5.0468 37.861L7.14342 33.3218ZM1.37443 24.3179L-3.62559 24.3179L-3.62556 24.33L1.37443 24.3179ZM1.37443 11.5808H6.37443V11.503L6.372 11.4252L1.37443 11.5808ZM1.49263 9.16227L-3.44757 8.39132L-3.45759 8.45553L-3.46594 8.51999L1.49263 9.16227ZM11.299 3.8147e-06V5V3.8147e-06ZM1.6968 5.99645L-2.7954 3.80098L-2.79999 3.81036L-2.80453 3.81976L1.6968 5.99645ZM0.606863 10.7829H5.60688L5.60685 10.7701L0.606863 10.7829ZM0.606863 23.9597L5.60618 24.0423L5.60686 24.001V23.9597H0.606863ZM1.16258 27.7051L-3.59736 29.2358L-3.58743 29.2667L-3.5771 29.2974L1.16258 27.7051ZM21.9881 24.5624L26.9865 24.6896L26.9873 24.6584L26.9877 24.6272L21.9881 24.5624ZM21.9958 11.4917L16.9972 11.3729L16.9958 11.4323V11.4917H21.9958ZM21.8023 8.70255L26.7367 7.89493L26.7265 7.83294L26.7148 7.77123L21.8023 8.70255ZM14.7069 13.8132L11.2135 17.3904L12.6704 18.8132H14.7069L14.7069 13.8132ZM11.5706 10.7504L15.064 7.17323L15.054 7.16351L15.044 7.15384L11.5706 10.7504ZM11.0272 10.7504L14.4952 14.3522L14.5006 14.347L11.0272 10.7504ZM8.01065 13.6548L4.54267 10.053L4.54257 10.0531L8.01065 13.6548ZM8.55255 14.1991L5.08496 10.5969L5.08478 10.5971L8.55255 14.1991ZM11.1976 11.653L7.73421 8.04668L7.72998 8.05076L11.1976 11.653ZM11.5706 11.2947L15.034 14.901L23.9954 6.2947H11.5706V11.2947ZM11.0272 11.2947V6.2947L-1.256 6.2947L7.53518 14.8732L11.0272 11.2947ZM13.772 13.9731L10.28 17.5517L10.2899 17.5613L13.772 13.9731ZM14.1665 14.356L17.658 10.777L17.6485 10.7677L14.1665 14.356ZM14.7099 13.8132L18.2092 10.2418L16.7512 8.81322H14.7099V13.8132ZM11.6274 24.0948L6.62745 24.0734L6.6274 24.0841V24.0948H11.6274ZM11.6765 12.6308L16.6765 12.6523L16.6765 12.6415V12.6308H11.6765ZM10.909 11.0226L15.909 11.0364V11.0226H10.909ZM10.8967 15.4676L15.8966 15.489L15.8967 15.4814L10.8967 15.4676ZM10.8598 24.0994L5.85988 24.0781L5.85984 24.0888V24.0994H10.8598ZM11.3002 5.76878C12.2338 5.76856 13.1488 6.03433 13.9383 6.53586L19.3001 -1.90517C16.9077 -3.42488 14.1322 -4.2319 11.2978 -4.23122L11.3002 5.76878ZM13.9383 6.53586C14.7279 7.03744 15.3599 7.7544 15.7594 8.60391L24.8088 4.34844C23.6027 1.78375 21.6925 -0.385517 19.3001 -1.90517L13.9383 6.53586ZM15.7524 8.58896C16.0711 9.27256 16.2338 10.0191 16.2283 10.7742L26.2281 10.8469C26.2443 8.60772 25.762 6.39286 24.8158 4.36339L15.7524 8.58896ZM16.2282 10.8105L16.2282 23.8797H26.2282L26.2282 10.8105H16.2282ZM16.2291 23.9742C16.2409 24.5994 16.1589 25.2227 15.986 25.8233L25.5954 28.5907C26.045 27.0295 26.258 25.4096 26.2273 23.7852L16.2291 23.9742ZM16.0095 25.744C15.803 26.4189 15.4548 27.0412 14.9889 27.5692L22.4873 34.1855C23.8969 32.5879 24.9485 30.7073 25.5719 28.67L16.0095 25.744ZM14.9889 27.5692C14.523 28.0973 13.9502 28.5188 13.3092 28.806L17.3981 37.9318C19.3425 37.0606 21.0776 35.7831 22.4873 34.1855L14.9889 27.5692ZM13.3092 28.806C12.6682 29.0932 11.9737 29.2395 11.2721 29.2355L11.2148 39.2353C13.3454 39.2476 15.4538 38.803 17.3981 37.9318L13.3092 28.806ZM11.2721 29.2355C10.5705 29.2315 9.87771 29.0772 9.24005 28.7826L5.0468 37.861C6.98107 38.7544 9.08418 39.2231 11.2148 39.2353L11.2721 29.2355ZM9.24017 28.7827C8.38801 28.3891 7.66478 27.7591 7.15659 26.9659L-1.26336 32.3608C0.272699 34.7582 2.46176 36.6669 5.04668 37.8609L9.24017 28.7827ZM7.15659 26.9659C6.64836 26.1727 6.37669 25.2497 6.37441 24.3059L-3.62556 24.33C-3.61869 27.1771 -2.79937 29.9635 -1.26336 32.3608L7.15659 26.9659ZM6.37443 24.3179C6.37443 24.3169 6.37443 24.3159 6.37443 24.3148C6.37443 24.3138 6.37443 24.3128 6.37443 24.3117C6.37443 24.3107 6.37443 24.3097 6.37443 24.3086C6.37443 24.3076 6.37443 24.3066 6.37443 24.3056C6.37443 24.3045 6.37443 24.3035 6.37443 24.3025C6.37443 24.3014 6.37443 24.3004 6.37443 24.2994C6.37443 24.2983 6.37443 24.2973 6.37443 24.2963C6.37443 24.2953 6.37443 24.2942 6.37443 24.2932C6.37443 24.2922 6.37443 24.2911 6.37443 24.2901C6.37443 24.2891 6.37443 24.288 6.37443 24.287C6.37443 24.286 6.37443 24.285 6.37443 24.2839C6.37443 24.2829 6.37443 24.2819 6.37443 24.2808C6.37443 24.2798 6.37443 24.2788 6.37443 24.2777C6.37443 24.2767 6.37443 24.2757 6.37443 24.2746C6.37443 24.2736 6.37443 24.2726 6.37443 24.2716C6.37443 24.2705 6.37443 24.2695 6.37443 24.2685C6.37443 24.2674 6.37443 24.2664 6.37443 24.2654C6.37443 24.2643 6.37443 24.2633 6.37443 24.2623C6.37443 24.2613 6.37443 24.2602 6.37443 24.2592C6.37443 24.2582 6.37443 24.2571 6.37443 24.2561C6.37443 24.2551 6.37443 24.254 6.37443 24.253C6.37443 24.252 6.37443 24.251 6.37443 24.2499C6.37443 24.2489 6.37443 24.2479 6.37443 24.2468C6.37443 24.2458 6.37443 24.2448 6.37443 24.2437C6.37443 24.2427 6.37443 24.2417 6.37443 24.2407C6.37443 24.2396 6.37443 24.2386 6.37443 24.2376C6.37443 24.2365 6.37443 24.2355 6.37443 24.2345C6.37443 24.2334 6.37443 24.2324 6.37443 24.2314C6.37443 24.2303 6.37443 24.2293 6.37443 24.2283C6.37443 24.2273 6.37443 24.2262 6.37443 24.2252C6.37443 24.2242 6.37443 24.2231 6.37443 24.2221C6.37443 24.2211 6.37443 24.22 6.37443 24.219C6.37443 24.218 6.37443 24.217 6.37443 24.2159C6.37443 24.2149 6.37443 24.2139 6.37443 24.2128C6.37443 24.2118 6.37443 24.2108 6.37443 24.2097C6.37443 24.2087 6.37443 24.2077 6.37443 24.2066C6.37443 24.2056 6.37443 24.2046 6.37443 24.2036C6.37443 24.2025 6.37443 24.2015 6.37443 24.2005C6.37443 24.1994 6.37443 24.1984 6.37443 24.1974C6.37443 24.1963 6.37443 24.1953 6.37443 24.1943C6.37443 24.1933 6.37443 24.1922 6.37443 24.1912C6.37443 24.1902 6.37443 24.1891 6.37443 24.1881C6.37443 24.1871 6.37443 24.186 6.37443 24.185C6.37443 24.184 6.37443 24.1829 6.37443 24.1819C6.37443 24.1809 6.37443 24.1799 6.37443 24.1788C6.37443 24.1778 6.37443 24.1768 6.37443 24.1757C6.37443 24.1747 6.37443 24.1737 6.37443 24.1726C6.37443 24.1716 6.37443 24.1706 6.37443 24.1695C6.37443 24.1685 6.37443 24.1675 6.37443 24.1665C6.37443 24.1654 6.37443 24.1644 6.37443 24.1634C6.37443 24.1623 6.37443 24.1613 6.37443 24.1603C6.37443 24.1592 6.37443 24.1582 6.37443 24.1572C6.37443 24.1562 6.37443 24.1551 6.37443 24.1541C6.37443 24.1531 6.37443 24.152 6.37443 24.151C6.37443 24.15 6.37443 24.1489 6.37443 24.1479C6.37443 24.1469 6.37443 24.1458 6.37443 24.1448C6.37443 24.1438 6.37443 24.1428 6.37443 24.1417C6.37443 24.1407 6.37443 24.1397 6.37443 24.1386C6.37443 24.1376 6.37443 24.1366 6.37443 24.1355C6.37443 24.1345 6.37443 24.1335 6.37443 24.1324C6.37443 24.1314 6.37443 24.1304 6.37443 24.1294C6.37443 24.1283 6.37443 24.1273 6.37443 24.1263C6.37443 24.1252 6.37443 24.1242 6.37443 24.1232C6.37443 24.1221 6.37443 24.1211 6.37443 24.1201C6.37443 24.119 6.37443 24.118 6.37443 24.117C6.37443 24.116 6.37443 24.1149 6.37443 24.1139C6.37443 24.1129 6.37443 24.1118 6.37443 24.1108C6.37443 24.1098 6.37443 24.1087 6.37443 24.1077C6.37443 24.1067 6.37443 24.1056 6.37443 24.1046C6.37443 24.1036 6.37443 24.1026 6.37443 24.1015C6.37443 24.1005 6.37443 24.0995 6.37443 24.0984C6.37443 24.0974 6.37443 24.0964 6.37443 24.0953C6.37443 24.0943 6.37443 24.0933 6.37443 24.0922C6.37443 24.0912 6.37443 24.0902 6.37443 24.0892C6.37443 24.0881 6.37443 24.0871 6.37443 24.0861C6.37443 24.085 6.37443 24.084 6.37443 24.083C6.37443 24.0819 6.37443 24.0809 6.37443 24.0799C6.37443 24.0788 6.37443 24.0778 6.37443 24.0768C6.37443 24.0758 6.37443 24.0747 6.37443 24.0737C6.37443 24.0727 6.37443 24.0716 6.37443 24.0706C6.37443 24.0696 6.37443 24.0685 6.37443 24.0675C6.37443 24.0665 6.37443 24.0654 6.37443 24.0644C6.37443 24.0634 6.37443 24.0624 6.37443 24.0613C6.37443 24.0603 6.37443 24.0593 6.37443 24.0582C6.37443 24.0572 6.37443 24.0562 6.37443 24.0551C6.37443 24.0541 6.37443 24.0531 6.37443 24.052C6.37443 24.051 6.37443 24.05 6.37443 24.0489C6.37443 24.0479 6.37443 24.0469 6.37443 24.0459C6.37443 24.0448 6.37443 24.0438 6.37443 24.0428C6.37443 24.0417 6.37443 24.0407 6.37443 24.0397C6.37443 24.0386 6.37443 24.0376 6.37443 24.0366C6.37443 24.0355 6.37443 24.0345 6.37443 24.0335C6.37443 24.0325 6.37443 24.0314 6.37443 24.0304C6.37443 24.0294 6.37443 24.0283 6.37443 24.0273C6.37443 24.0263 6.37443 24.0252 6.37443 24.0242C6.37443 24.0232 6.37443 24.0221 6.37443 24.0211C6.37443 24.0201 6.37443 24.019 6.37443 24.018C6.37443 24.017 6.37443 24.016 6.37443 24.0149C6.37443 24.0139 6.37443 24.0129 6.37443 24.0118C6.37443 24.0108 6.37443 24.0098 6.37443 24.0087C6.37443 24.0077 6.37443 24.0067 6.37443 24.0056C6.37443 24.0046 6.37443 24.0036 6.37443 24.0026C6.37443 24.0015 6.37443 24.0005 6.37443 23.9995C6.37443 23.9984 6.37443 23.9974 6.37443 23.9964C6.37443 23.9953 6.37443 23.9943 6.37443 23.9933C6.37443 23.9922 6.37443 23.9912 6.37443 23.9902C6.37443 23.9891 6.37443 23.9881 6.37443 23.9871C6.37443 23.9861 6.37443 23.985 6.37443 23.984C6.37443 23.983 6.37443 23.9819 6.37443 23.9809C6.37443 23.9799 6.37443 23.9788 6.37443 23.9778C6.37443 23.9768 6.37443 23.9757 6.37443 23.9747C6.37443 23.9737 6.37443 23.9726 6.37443 23.9716C6.37443 23.9706 6.37443 23.9696 6.37443 23.9685C6.37443 23.9675 6.37443 23.9665 6.37443 23.9654C6.37443 23.9644 6.37443 23.9634 6.37443 23.9623C6.37443 23.9613 6.37443 23.9603 6.37443 23.9592C6.37443 23.9582 6.37443 23.9572 6.37443 23.9561C6.37443 23.9551 6.37443 23.9541 6.37443 23.9531C6.37443 23.952 6.37443 23.951 6.37443 23.95C6.37443 23.9489 6.37443 23.9479 6.37443 23.9469C6.37443 23.9458 6.37443 23.9448 6.37443 23.9438C6.37443 23.9427 6.37443 23.9417 6.37443 23.9407C6.37443 23.9396 6.37443 23.9386 6.37443 23.9376C6.37443 23.9366 6.37443 23.9355 6.37443 23.9345C6.37443 23.9335 6.37443 23.9324 6.37443 23.9314C6.37443 23.9304 6.37443 23.9293 6.37443 23.9283C6.37443 23.9273 6.37443 23.9262 6.37443 23.9252C6.37443 23.9242 6.37443 23.9231 6.37443 23.9221C6.37443 23.9211 6.37443 23.9201 6.37443 23.919C6.37443 23.918 6.37443 23.917 6.37443 23.9159C6.37443 23.9149 6.37443 23.9139 6.37443 23.9128C6.37443 23.9118 6.37443 23.9108 6.37443 23.9097C6.37443 23.9087 6.37443 23.9077 6.37443 23.9066C6.37443 23.9056 6.37443 23.9046 6.37443 23.9036C6.37443 23.9025 6.37443 23.9015 6.37443 23.9005C6.37443 23.8994 6.37443 23.8984 6.37443 23.8974C6.37443 23.8963 6.37443 23.8953 6.37443 23.8943C6.37443 23.8932 6.37443 23.8922 6.37443 23.8912C6.37443 23.8901 6.37443 23.8891 6.37443 23.8881C6.37443 23.887 6.37443 23.886 6.37443 23.885C6.37443 23.884 6.37443 23.8829 6.37443 23.8819C6.37443 23.8809 6.37443 23.8798 6.37443 23.8788C6.37443 23.8778 6.37443 23.8767 6.37443 23.8757C6.37443 23.8747 6.37443 23.8736 6.37443 23.8726C6.37443 23.8716 6.37443 23.8705 6.37443 23.8695C6.37443 23.8685 6.37443 23.8674 6.37443 23.8664C6.37443 23.8654 6.37443 23.8644 6.37443 23.8633C6.37443 23.8623 6.37443 23.8613 6.37443 23.8602C6.37443 23.8592 6.37443 23.8582 6.37443 23.8571C6.37443 23.8561 6.37443 23.8551 6.37443 23.854C6.37443 23.853 6.37443 23.852 6.37443 23.8509C6.37443 23.8499 6.37443 23.8489 6.37443 23.8479C6.37443 23.8468 6.37443 23.8458 6.37443 23.8448C6.37443 23.8437 6.37443 23.8427 6.37443 23.8417C6.37443 23.8406 6.37443 23.8396 6.37443 23.8386C6.37443 23.8375 6.37443 23.8365 6.37443 23.8355C6.37443 23.8344 6.37443 23.8334 6.37443 23.8324C6.37443 23.8313 6.37443 23.8303 6.37443 23.8293C6.37443 23.8283 6.37443 23.8272 6.37443 23.8262C6.37443 23.8252 6.37443 23.8241 6.37443 23.8231C6.37443 23.8221 6.37443 23.821 6.37443 23.82C6.37443 23.819 6.37443 23.8179 6.37443 23.8169C6.37443 23.8159 6.37443 23.8148 6.37443 23.8138C6.37443 23.8128 6.37443 23.8117 6.37443 23.8107C6.37443 23.8097 6.37443 23.8086 6.37443 23.8076C6.37443 23.8066 6.37443 23.8056 6.37443 23.8045C6.37443 23.8035 6.37443 23.8025 6.37443 23.8014C6.37443 23.8004 6.37443 23.7994 6.37443 23.7983C6.37443 23.7973 6.37443 23.7963 6.37443 23.7952C6.37443 23.7942 6.37443 23.7932 6.37443 23.7921C6.37443 23.7911 6.37443 23.7901 6.37443 23.789C6.37443 23.788 6.37443 23.787 6.37443 23.786C6.37443 23.7849 6.37443 23.7839 6.37443 23.7829C6.37443 23.7818 6.37443 23.7808 6.37443 23.7798C6.37443 23.7787 6.37443 23.7777 6.37443 23.7767C6.37443 23.7756 6.37443 23.7746 6.37443 23.7736C6.37443 23.7725 6.37443 23.7715 6.37443 23.7705C6.37443 23.7694 6.37443 23.7684 6.37443 23.7674C6.37443 23.7663 6.37443 23.7653 6.37443 23.7643C6.37443 23.7633 6.37443 23.7622 6.37443 23.7612C6.37443 23.7602 6.37443 23.7591 6.37443 23.7581C6.37443 23.7571 6.37443 23.756 6.37443 23.755C6.37443 23.754 6.37443 23.7529 6.37443 23.7519C6.37443 23.7509 6.37443 23.7498 6.37443 23.7488C6.37443 23.7478 6.37443 23.7467 6.37443 23.7457C6.37443 23.7447 6.37443 23.7436 6.37443 23.7426C6.37443 23.7416 6.37443 23.7406 6.37443 23.7395C6.37443 23.7385 6.37443 23.7375 6.37443 23.7364C6.37443 23.7354 6.37443 23.7344 6.37443 23.7333C6.37443 23.7323 6.37443 23.7313 6.37443 23.7302C6.37443 23.7292 6.37443 23.7282 6.37443 23.7271C6.37443 23.7261 6.37443 23.7251 6.37443 23.724C6.37443 23.723 6.37443 23.722 6.37443 23.7209C6.37443 23.7199 6.37443 23.7189 6.37443 23.7179C6.37443 23.7168 6.37443 23.7158 6.37443 23.7148C6.37443 23.7137 6.37443 23.7127 6.37443 23.7117C6.37443 23.7106 6.37443 23.7096 6.37443 23.7086C6.37443 23.7075 6.37443 23.7065 6.37443 23.7055C6.37443 23.7044 6.37443 23.7034 6.37443 23.7024C6.37443 23.7013 6.37443 23.7003 6.37443 23.6993C6.37443 23.6982 6.37443 23.6972 6.37443 23.6962C6.37443 23.6952 6.37443 23.6941 6.37443 23.6931C6.37443 23.6921 6.37443 23.691 6.37443 23.69C6.37443 23.689 6.37443 23.6879 6.37443 23.6869C6.37443 23.6859 6.37443 23.6848 6.37443 23.6838C6.37443 23.6828 6.37443 23.6817 6.37443 23.6807C6.37443 23.6797 6.37443 23.6786 6.37443 23.6776C6.37443 23.6766 6.37443 23.6755 6.37443 23.6745C6.37443 23.6735 6.37443 23.6724 6.37443 23.6714C6.37443 23.6704 6.37443 23.6694 6.37443 23.6683C6.37443 23.6673 6.37443 23.6663 6.37443 23.6652C6.37443 23.6642 6.37443 23.6632 6.37443 23.6621C6.37443 23.6611 6.37443 23.6601 6.37443 23.659C6.37443 23.658 6.37443 23.657 6.37443 23.6559C6.37443 23.6549 6.37443 23.6539 6.37443 23.6528C6.37443 23.6518 6.37443 23.6508 6.37443 23.6497C6.37443 23.6487 6.37443 23.6477 6.37443 23.6466C6.37443 23.6456 6.37443 23.6446 6.37443 23.6436C6.37443 23.6425 6.37443 23.6415 6.37443 23.6405C6.37443 23.6394 6.37443 23.6384 6.37443 23.6374C6.37443 23.6363 6.37443 23.6353 6.37443 23.6343C6.37443 23.6332 6.37443 23.6322 6.37443 23.6312C6.37443 23.6301 6.37443 23.6291 6.37443 23.6281C6.37443 23.627 6.37443 23.626 6.37443 23.625C6.37443 23.6239 6.37443 23.6229 6.37443 23.6219C6.37443 23.6208 6.37443 23.6198 6.37443 23.6188C6.37443 23.6177 6.37443 23.6167 6.37443 23.6157C6.37443 23.6147 6.37443 23.6136 6.37443 23.6126C6.37443 23.6116 6.37443 23.6105 6.37443 23.6095C6.37443 23.6085 6.37443 23.6074 6.37443 23.6064C6.37443 23.6054 6.37443 23.6043 6.37443 23.6033C6.37443 23.6023 6.37443 23.6012 6.37443 23.6002C6.37443 23.5992 6.37443 23.5981 6.37443 23.5971C6.37443 23.5961 6.37443 23.595 6.37443 23.594C6.37443 23.593 6.37443 23.5919 6.37443 23.5909C6.37443 23.5899 6.37443 23.5889 6.37443 23.5878C6.37443 23.5868 6.37443 23.5858 6.37443 23.5847C6.37443 23.5837 6.37443 23.5827 6.37443 23.5816C6.37443 23.5806 6.37443 23.5796 6.37443 23.5785C6.37443 23.5775 6.37443 23.5765 6.37443 23.5754C6.37443 23.5744 6.37443 23.5734 6.37443 23.5723C6.37443 23.5713 6.37443 23.5703 6.37443 23.5692C6.37443 23.5682 6.37443 23.5672 6.37443 23.5661C6.37443 23.5651 6.37443 23.5641 6.37443 23.563C6.37443 23.562 6.37443 23.561 6.37443 23.5599C6.37443 23.5589 6.37443 23.5579 6.37443 23.5569C6.37443 23.5558 6.37443 23.5548 6.37443 23.5538C6.37443 23.5527 6.37443 23.5517 6.37443 23.5507C6.37443 23.5496 6.37443 23.5486 6.37443 23.5476C6.37443 23.5465 6.37443 23.5455 6.37443 23.5445C6.37443 23.5434 6.37443 23.5424 6.37443 23.5414C6.37443 23.5403 6.37443 23.5393 6.37443 23.5383C6.37443 23.5372 6.37443 23.5362 6.37443 23.5352C6.37443 23.5341 6.37443 23.5331 6.37443 23.5321C6.37443 23.531 6.37443 23.53 6.37443 23.529C6.37443 23.5279 6.37443 23.5269 6.37443 23.5259C6.37443 23.5249 6.37443 23.5238 6.37443 23.5228C6.37443 23.5218 6.37443 23.5207 6.37443 23.5197C6.37443 23.5187 6.37443 23.5176 6.37443 23.5166C6.37443 23.5156 6.37443 23.5145 6.37443 23.5135C6.37443 23.5125 6.37443 23.5114 6.37443 23.5104C6.37443 23.5094 6.37443 23.5083 6.37443 23.5073C6.37443 23.5063 6.37443 23.5052 6.37443 23.5042C6.37443 23.5032 6.37443 23.5021 6.37443 23.5011C6.37443 23.5001 6.37443 23.499 6.37443 23.498C6.37443 23.497 6.37443 23.4959 6.37443 23.4949C6.37443 23.4939 6.37443 23.4928 6.37443 23.4918C6.37443 23.4908 6.37443 23.4898 6.37443 23.4887C6.37443 23.4877 6.37443 23.4867 6.37443 23.4856C6.37443 23.4846 6.37443 23.4836 6.37443 23.4825C6.37443 23.4815 6.37443 23.4805 6.37443 23.4794C6.37443 23.4784 6.37443 23.4774 6.37443 23.4763C6.37443 23.4753 6.37443 23.4743 6.37443 23.4732C6.37443 23.4722 6.37443 23.4712 6.37443 23.4701C6.37443 23.4691 6.37443 23.4681 6.37443 23.467C6.37443 23.466 6.37443 23.465 6.37443 23.4639C6.37443 23.4629 6.37443 23.4619 6.37443 23.4608C6.37443 23.4598 6.37443 23.4588 6.37443 23.4577C6.37443 23.4567 6.37443 23.4557 6.37443 23.4547C6.37443 23.4536 6.37443 23.4526 6.37443 23.4516C6.37443 23.4505 6.37443 23.4495 6.37443 23.4485C6.37443 23.4474 6.37443 23.4464 6.37443 23.4454C6.37443 23.4443 6.37443 23.4433 6.37443 23.4423C6.37443 23.4412 6.37443 23.4402 6.37443 23.4392C6.37443 23.4381 6.37443 23.4371 6.37443 23.4361C6.37443 23.435 6.37443 23.434 6.37443 23.433C6.37443 23.4319 6.37443 23.4309 6.37443 23.4299C6.37443 23.4288 6.37443 23.4278 6.37443 23.4268C6.37443 23.4257 6.37443 23.4247 6.37443 23.4237C6.37443 23.4226 6.37443 23.4216 6.37443 23.4206C6.37443 23.4195 6.37443 23.4185 6.37443 23.4175C6.37443 23.4165 6.37443 23.4154 6.37443 23.4144C6.37443 23.4134 6.37443 23.4123 6.37443 23.4113C6.37443 23.4103 6.37443 23.4092 6.37443 23.4082C6.37443 23.4072 6.37443 23.4061 6.37443 23.4051C6.37443 23.4041 6.37443 23.403 6.37443 23.402C6.37443 23.401 6.37443 23.3999 6.37443 23.3989C6.37443 23.3979 6.37443 23.3968 6.37443 23.3958C6.37443 23.3948 6.37443 23.3937 6.37443 23.3927C6.37443 23.3917 6.37443 23.3906 6.37443 23.3896C6.37443 23.3886 6.37443 23.3875 6.37443 23.3865C6.37443 23.3855 6.37443 23.3844 6.37443 23.3834C6.37443 23.3824 6.37443 23.3813 6.37443 23.3803C6.37443 23.3793 6.37443 23.3782 6.37443 23.3772C6.37443 23.3762 6.37443 23.3751 6.37443 23.3741C6.37443 23.3731 6.37443 23.3721 6.37443 23.371C6.37443 23.37 6.37443 23.369 6.37443 23.3679C6.37443 23.3669 6.37443 23.3659 6.37443 23.3648C6.37443 23.3638 6.37443 23.3628 6.37443 23.3617C6.37443 23.3607 6.37443 23.3597 6.37443 23.3586C6.37443 23.3576 6.37443 23.3566 6.37443 23.3555C6.37443 23.3545 6.37443 23.3535 6.37443 23.3524C6.37443 23.3514 6.37443 23.3504 6.37443 23.3493C6.37443 23.3483 6.37443 23.3473 6.37443 23.3462C6.37443 23.3452 6.37443 23.3442 6.37443 23.3431C6.37443 23.3421 6.37443 23.3411 6.37443 23.34C6.37443 23.339 6.37443 23.338 6.37443 23.3369C6.37443 23.3359 6.37443 23.3349 6.37443 23.3338C6.37443 23.3328 6.37443 23.3318 6.37443 23.3307C6.37443 23.3297 6.37443 23.3287 6.37443 23.3277C6.37443 23.3266 6.37443 23.3256 6.37443 23.3246C6.37443 23.3235 6.37443 23.3225 6.37443 23.3215C6.37443 23.3204 6.37443 23.3194 6.37443 23.3184C6.37443 23.3173 6.37443 23.3163 6.37443 23.3153C6.37443 23.3142 6.37443 23.3132 6.37443 23.3122C6.37443 23.3111 6.37443 23.3101 6.37443 23.3091C6.37443 23.308 6.37443 23.307 6.37443 23.306C6.37443 23.3049 6.37443 23.3039 6.37443 23.3029C6.37443 23.3018 6.37443 23.3008 6.37443 23.2998C6.37443 23.2987 6.37443 23.2977 6.37443 23.2967C6.37443 23.2956 6.37443 23.2946 6.37443 23.2936C6.37443 23.2925 6.37443 23.2915 6.37443 23.2905C6.37443 23.2894 6.37443 23.2884 6.37443 23.2874C6.37443 23.2863 6.37443 23.2853 6.37443 23.2843C6.37443 23.2832 6.37443 23.2822 6.37443 23.2812C6.37443 23.2801 6.37443 23.2791 6.37443 23.2781C6.37443 23.2771 6.37443 23.276 6.37443 23.275C6.37443 23.274 6.37443 23.2729 6.37443 23.2719C6.37443 23.2709 6.37443 23.2698 6.37443 23.2688C6.37443 23.2678 6.37443 23.2667 6.37443 23.2657C6.37443 23.2647 6.37443 23.2636 6.37443 23.2626C6.37443 23.2616 6.37443 23.2605 6.37443 23.2595C6.37443 23.2585 6.37443 23.2574 6.37443 23.2564C6.37443 23.2554 6.37443 23.2543 6.37443 23.2533C6.37443 23.2523 6.37443 23.2512 6.37443 23.2502C6.37443 23.2492 6.37443 23.2481 6.37443 23.2471C6.37443 23.2461 6.37443 23.245 6.37443 23.244C6.37443 23.243 6.37443 23.2419 6.37443 23.2409C6.37443 23.2399 6.37443 23.2388 6.37443 23.2378C6.37443 23.2368 6.37443 23.2357 6.37443 23.2347C6.37443 23.2337 6.37443 23.2326 6.37443 23.2316C6.37443 23.2306 6.37443 23.2295 6.37443 23.2285C6.37443 23.2275 6.37443 23.2264 6.37443 23.2254C6.37443 23.2244 6.37443 23.2233 6.37443 23.2223C6.37443 23.2213 6.37443 23.2203 6.37443 23.2192C6.37443 23.2182 6.37443 23.2172 6.37443 23.2161C6.37443 23.2151 6.37443 23.2141 6.37443 23.213C6.37443 23.212 6.37443 23.211 6.37443 23.2099C6.37443 23.2089 6.37443 23.2079 6.37443 23.2068C6.37443 23.2058 6.37443 23.2048 6.37443 23.2037C6.37443 23.2027 6.37443 23.2017 6.37443 23.2006C6.37443 23.1996 6.37443 23.1986 6.37443 23.1975C6.37443 23.1965 6.37443 23.1955 6.37443 23.1944C6.37443 23.1934 6.37443 23.1924 6.37443 23.1913C6.37443 23.1903 6.37443 23.1893 6.37443 23.1882C6.37443 23.1872 6.37443 23.1862 6.37443 23.1851C6.37443 23.1841 6.37443 23.1831 6.37443 23.182C6.37443 23.181 6.37443 23.18 6.37443 23.1789C6.37443 23.1779 6.37443 23.1769 6.37443 23.1758C6.37443 23.1748 6.37443 23.1738 6.37443 23.1727C6.37443 23.1717 6.37443 23.1707 6.37443 23.1696C6.37443 23.1686 6.37443 23.1676 6.37443 23.1665C6.37443 23.1655 6.37443 23.1645 6.37443 23.1634C6.37443 23.1624 6.37443 23.1614 6.37443 23.1603C6.37443 23.1593 6.37443 23.1583 6.37443 23.1573C6.37443 23.1562 6.37443 23.1552 6.37443 23.1542C6.37443 23.1531 6.37443 23.1521 6.37443 23.1511C6.37443 23.15 6.37443 23.149 6.37443 23.148C6.37443 23.1469 6.37443 23.1459 6.37443 23.1449C6.37443 23.1438 6.37443 23.1428 6.37443 23.1418C6.37443 23.1407 6.37443 23.1397 6.37443 23.1387C6.37443 23.1376 6.37443 23.1366 6.37443 23.1356C6.37443 23.1345 6.37443 23.1335 6.37443 23.1325C6.37443 23.1314 6.37443 23.1304 6.37443 23.1294C6.37443 23.1283 6.37443 23.1273 6.37443 23.1263C6.37443 23.1252 6.37443 23.1242 6.37443 23.1232C6.37443 23.1221 6.37443 23.1211 6.37443 23.1201C6.37443 23.119 6.37443 23.118 6.37443 23.117C6.37443 23.1159 6.37443 23.1149 6.37443 23.1139C6.37443 23.1128 6.37443 23.1118 6.37443 23.1108C6.37443 23.1097 6.37443 23.1087 6.37443 23.1077C6.37443 23.1066 6.37443 23.1056 6.37443 23.1046C6.37443 23.1035 6.37443 23.1025 6.37443 23.1015C6.37443 23.1004 6.37443 23.0994 6.37443 23.0984C6.37443 23.0973 6.37443 23.0963 6.37443 23.0953C6.37443 23.0942 6.37443 23.0932 6.37443 23.0922C6.37443 23.0911 6.37443 23.0901 6.37443 23.0891C6.37443 23.088 6.37443 23.087 6.37443 23.086C6.37443 23.085 6.37443 23.0839 6.37443 23.0829C6.37443 23.0819 6.37443 23.0808 6.37443 23.0798C6.37443 23.0788 6.37443 23.0777 6.37443 23.0767C6.37443 23.0757 6.37443 23.0746 6.37443 23.0736C6.37443 23.0726 6.37443 23.0715 6.37443 23.0705C6.37443 23.0695 6.37443 23.0684 6.37443 23.0674C6.37443 23.0664 6.37443 23.0653 6.37443 23.0643C6.37443 23.0633 6.37443 23.0622 6.37443 23.0612C6.37443 23.0602 6.37443 23.0591 6.37443 23.0581C6.37443 23.0571 6.37443 23.056 6.37443 23.055C6.37443 23.054 6.37443 23.0529 6.37443 23.0519C6.37443 23.0509 6.37443 23.0498 6.37443 23.0488C6.37443 23.0478 6.37443 23.0467 6.37443 23.0457C6.37443 23.0447 6.37443 23.0436 6.37443 23.0426C6.37443 23.0416 6.37443 23.0405 6.37443 23.0395C6.37443 23.0385 6.37443 23.0374 6.37443 23.0364C6.37443 23.0354 6.37443 23.0343 6.37443 23.0333C6.37443 23.0323 6.37443 23.0312 6.37443 23.0302C6.37443 23.0292 6.37443 23.0281 6.37443 23.0271C6.37443 23.0261 6.37443 23.025 6.37443 23.024C6.37443 23.023 6.37443 23.0219 6.37443 23.0209C6.37443 23.0199 6.37443 23.0188 6.37443 23.0178C6.37443 23.0168 6.37443 23.0157 6.37443 23.0147C6.37443 23.0137 6.37443 23.0126 6.37443 23.0116C6.37443 23.0106 6.37443 23.0095 6.37443 23.0085C6.37443 23.0075 6.37443 23.0064 6.37443 23.0054C6.37443 23.0044 6.37443 23.0033 6.37443 23.0023C6.37443 23.0013 6.37443 23.0002 6.37443 22.9992C6.37443 22.9982 6.37443 22.9972 6.37443 22.9961C6.37443 22.9951 6.37443 22.9941 6.37443 22.993C6.37443 22.992 6.37443 22.991 6.37443 22.9899C6.37443 22.9889 6.37443 22.9879 6.37443 22.9868C6.37443 22.9858 6.37443 22.9848 6.37443 22.9837C6.37443 22.9827 6.37443 22.9817 6.37443 22.9806C6.37443 22.9796 6.37443 22.9786 6.37443 22.9775C6.37443 22.9765 6.37443 22.9755 6.37443 22.9744C6.37443 22.9734 6.37443 22.9724 6.37443 22.9713C6.37443 22.9703 6.37443 22.9693 6.37443 22.9682C6.37443 22.9672 6.37443 22.9662 6.37443 22.9651C6.37443 22.9641 6.37443 22.9631 6.37443 22.962C6.37443 22.961 6.37443 22.96 6.37443 22.9589C6.37443 22.9579 6.37443 22.9569 6.37443 22.9558C6.37443 22.9548 6.37443 22.9538 6.37443 22.9527C6.37443 22.9517 6.37443 22.9507 6.37443 22.9496C6.37443 22.9486 6.37443 22.9476 6.37443 22.9465C6.37443 22.9455 6.37443 22.9445 6.37443 22.9434C6.37443 22.9424 6.37443 22.9414 6.37443 22.9403C6.37443 22.9393 6.37443 22.9383 6.37443 22.9372C6.37443 22.9362 6.37443 22.9352 6.37443 22.9341C6.37443 22.9331 6.37443 22.9321 6.37443 22.931C6.37443 22.93 6.37443 22.929 6.37443 22.9279C6.37443 22.9269 6.37443 22.9259 6.37443 22.9248C6.37443 22.9238 6.37443 22.9228 6.37443 22.9217C6.37443 22.9207 6.37443 22.9197 6.37443 22.9186C6.37443 22.9176 6.37443 22.9166 6.37443 22.9155C6.37443 22.9145 6.37443 22.9135 6.37443 22.9124C6.37443 22.9114 6.37443 22.9104 6.37443 22.9093C6.37443 22.9083 6.37443 22.9073 6.37443 22.9062C6.37443 22.9052 6.37443 22.9042 6.37443 22.9031C6.37443 22.9021 6.37443 22.9011 6.37443 22.9001C6.37443 22.899 6.37443 22.898 6.37443 22.897C6.37443 22.8959 6.37443 22.8949 6.37443 22.8939C6.37443 22.8928 6.37443 22.8918 6.37443 22.8908C6.37443 22.8897 6.37443 22.8887 6.37443 22.8877C6.37443 22.8866 6.37443 22.8856 6.37443 22.8846C6.37443 22.8835 6.37443 22.8825 6.37443 22.8815C6.37443 22.8804 6.37443 22.8794 6.37443 22.8784C6.37443 22.8773 6.37443 22.8763 6.37443 22.8753C6.37443 22.8742 6.37443 22.8732 6.37443 22.8722C6.37443 22.8711 6.37443 22.8701 6.37443 22.8691C6.37443 22.868 6.37443 22.867 6.37443 22.866C6.37443 22.8649 6.37443 22.8639 6.37443 22.8629C6.37443 22.8618 6.37443 22.8608 6.37443 22.8598C6.37443 22.8587 6.37443 22.8577 6.37443 22.8567C6.37443 22.8556 6.37443 22.8546 6.37443 22.8536C6.37443 22.8525 6.37443 22.8515 6.37443 22.8505C6.37443 22.8494 6.37443 22.8484 6.37443 22.8474C6.37443 22.8463 6.37443 22.8453 6.37443 22.8443C6.37443 22.8432 6.37443 22.8422 6.37443 22.8412C6.37443 22.8401 6.37443 22.8391 6.37443 22.8381C6.37443 22.837 6.37443 22.836 6.37443 22.835C6.37443 22.8339 6.37443 22.8329 6.37443 22.8319C6.37443 22.8308 6.37443 22.8298 6.37443 22.8288C6.37443 22.8277 6.37443 22.8267 6.37443 22.8257C6.37443 22.8246 6.37443 22.8236 6.37443 22.8226C6.37443 22.8215 6.37443 22.8205 6.37443 22.8195C6.37443 22.8184 6.37443 22.8174 6.37443 22.8164C6.37443 22.8153 6.37443 22.8143 6.37443 22.8133C6.37443 22.8122 6.37443 22.8112 6.37443 22.8102C6.37443 22.8091 6.37443 22.8081 6.37443 22.8071C6.37443 22.806 6.37443 22.805 6.37443 22.804C6.37443 22.8029 6.37443 22.8019 6.37443 22.8009C6.37443 22.7998 6.37443 22.7988 6.37443 22.7978C6.37443 22.7967 6.37443 22.7957 6.37443 22.7947C6.37443 22.7936 6.37443 22.7926 6.37443 22.7916C6.37443 22.7905 6.37443 22.7895 6.37443 22.7885C6.37443 22.7875 6.37443 22.7864 6.37443 22.7854C6.37443 22.7844 6.37443 22.7833 6.37443 22.7823C6.37443 22.7813 6.37443 22.7802 6.37443 22.7792C6.37443 22.7782 6.37443 22.7771 6.37443 22.7761C6.37443 22.7751 6.37443 22.774 6.37443 22.773C6.37443 22.772 6.37443 22.7709 6.37443 22.7699C6.37443 22.7689 6.37443 22.7678 6.37443 22.7668C6.37443 22.7658 6.37443 22.7647 6.37443 22.7637C6.37443 22.7627 6.37443 22.7616 6.37443 22.7606C6.37443 22.7596 6.37443 22.7585 6.37443 22.7575C6.37443 22.7565 6.37443 22.7554 6.37443 22.7544C6.37443 22.7534 6.37443 22.7523 6.37443 22.7513C6.37443 22.7503 6.37443 22.7492 6.37443 22.7482C6.37443 22.7472 6.37443 22.7461 6.37443 22.7451C6.37443 22.7441 6.37443 22.743 6.37443 22.742C6.37443 22.741 6.37443 22.7399 6.37443 22.7389C6.37443 22.7379 6.37443 22.7368 6.37443 22.7358C6.37443 22.7348 6.37443 22.7337 6.37443 22.7327L-3.62557 22.7327C-3.62557 22.7337 -3.62557 22.7348 -3.62557 22.7358C-3.62557 22.7368 -3.62557 22.7379 -3.62557 22.7389C-3.62557 22.7399 -3.62557 22.741 -3.62557 22.742C-3.62557 22.743 -3.62557 22.7441 -3.62557 22.7451C-3.62557 22.7461 -3.62557 22.7472 -3.62557 22.7482C-3.62557 22.7492 -3.62557 22.7503 -3.62557 22.7513C-3.62557 22.7523 -3.62557 22.7534 -3.62557 22.7544C-3.62557 22.7554 -3.62557 22.7565 -3.62557 22.7575C-3.62557 22.7585 -3.62557 22.7596 -3.62557 22.7606C-3.62557 22.7616 -3.62557 22.7627 -3.62557 22.7637C-3.62557 22.7647 -3.62557 22.7658 -3.62557 22.7668C-3.62557 22.7678 -3.62557 22.7689 -3.62557 22.7699C-3.62557 22.7709 -3.62557 22.772 -3.62557 22.773C-3.62557 22.774 -3.62557 22.7751 -3.62557 22.7761C-3.62557 22.7771 -3.62557 22.7782 -3.62557 22.7792C-3.62557 22.7802 -3.62557 22.7813 -3.62557 22.7823C-3.62557 22.7833 -3.62557 22.7844 -3.62557 22.7854C-3.62557 22.7864 -3.62557 22.7875 -3.62557 22.7885C-3.62557 22.7895 -3.62557 22.7905 -3.62557 22.7916C-3.62557 22.7926 -3.62557 22.7936 -3.62557 22.7947C-3.62557 22.7957 -3.62557 22.7967 -3.62557 22.7978C-3.62557 22.7988 -3.62557 22.7998 -3.62557 22.8009C-3.62557 22.8019 -3.62557 22.8029 -3.62557 22.804C-3.62557 22.805 -3.62557 22.806 -3.62557 22.8071C-3.62557 22.8081 -3.62557 22.8091 -3.62557 22.8102C-3.62557 22.8112 -3.62557 22.8122 -3.62557 22.8133C-3.62557 22.8143 -3.62557 22.8153 -3.62557 22.8164C-3.62557 22.8174 -3.62557 22.8184 -3.62557 22.8195C-3.62557 22.8205 -3.62557 22.8215 -3.62557 22.8226C-3.62557 22.8236 -3.62557 22.8246 -3.62557 22.8257C-3.62557 22.8267 -3.62557 22.8277 -3.62557 22.8288C-3.62557 22.8298 -3.62557 22.8308 -3.62557 22.8319C-3.62557 22.8329 -3.62557 22.8339 -3.62557 22.835C-3.62557 22.836 -3.62557 22.837 -3.62557 22.8381C-3.62557 22.8391 -3.62557 22.8401 -3.62557 22.8412C-3.62557 22.8422 -3.62557 22.8432 -3.62557 22.8443C-3.62557 22.8453 -3.62557 22.8463 -3.62557 22.8474C-3.62557 22.8484 -3.62557 22.8494 -3.62557 22.8505C-3.62557 22.8515 -3.62557 22.8525 -3.62557 22.8536C-3.62557 22.8546 -3.62557 22.8556 -3.62557 22.8567C-3.62557 22.8577 -3.62557 22.8587 -3.62557 22.8598C-3.62557 22.8608 -3.62557 22.8618 -3.62557 22.8629C-3.62557 22.8639 -3.62557 22.8649 -3.62557 22.866C-3.62557 22.867 -3.62557 22.868 -3.62557 22.8691C-3.62557 22.8701 -3.62557 22.8711 -3.62557 22.8722C-3.62557 22.8732 -3.62557 22.8742 -3.62557 22.8753C-3.62557 22.8763 -3.62557 22.8773 -3.62557 22.8784C-3.62557 22.8794 -3.62557 22.8804 -3.62557 22.8815C-3.62557 22.8825 -3.62557 22.8835 -3.62557 22.8846C-3.62557 22.8856 -3.62557 22.8866 -3.62557 22.8877C-3.62557 22.8887 -3.62557 22.8897 -3.62557 22.8908C-3.62557 22.8918 -3.62557 22.8928 -3.62557 22.8939C-3.62557 22.8949 -3.62557 22.8959 -3.62557 22.897C-3.62557 22.898 -3.62557 22.899 -3.62557 22.9001C-3.62557 22.9011 -3.62557 22.9021 -3.62557 22.9031C-3.62557 22.9042 -3.62557 22.9052 -3.62557 22.9062C-3.62557 22.9073 -3.62557 22.9083 -3.62557 22.9093C-3.62557 22.9104 -3.62557 22.9114 -3.62557 22.9124C-3.62557 22.9135 -3.62557 22.9145 -3.62557 22.9155C-3.62557 22.9166 -3.62557 22.9176 -3.62557 22.9186C-3.62557 22.9197 -3.62557 22.9207 -3.62557 22.9217C-3.62557 22.9228 -3.62557 22.9238 -3.62557 22.9248C-3.62557 22.9259 -3.62557 22.9269 -3.62557 22.9279C-3.62557 22.929 -3.62557 22.93 -3.62557 22.931C-3.62557 22.9321 -3.62557 22.9331 -3.62557 22.9341C-3.62557 22.9352 -3.62557 22.9362 -3.62557 22.9372C-3.62557 22.9383 -3.62557 22.9393 -3.62557 22.9403C-3.62557 22.9414 -3.62557 22.9424 -3.62557 22.9434C-3.62557 22.9445 -3.62557 22.9455 -3.62557 22.9465C-3.62557 22.9476 -3.62557 22.9486 -3.62557 22.9496C-3.62557 22.9507 -3.62557 22.9517 -3.62557 22.9527C-3.62557 22.9538 -3.62557 22.9548 -3.62557 22.9558C-3.62557 22.9569 -3.62557 22.9579 -3.62557 22.9589C-3.62557 22.96 -3.62557 22.961 -3.62557 22.962C-3.62557 22.9631 -3.62557 22.9641 -3.62557 22.9651C-3.62557 22.9662 -3.62557 22.9672 -3.62557 22.9682C-3.62557 22.9693 -3.62557 22.9703 -3.62557 22.9713C-3.62557 22.9724 -3.62557 22.9734 -3.62557 22.9744C-3.62557 22.9755 -3.62557 22.9765 -3.62557 22.9775C-3.62557 22.9786 -3.62557 22.9796 -3.62557 22.9806C-3.62557 22.9817 -3.62557 22.9827 -3.62557 22.9837C-3.62557 22.9848 -3.62557 22.9858 -3.62557 22.9868C-3.62557 22.9879 -3.62557 22.9889 -3.62557 22.9899C-3.62557 22.991 -3.62557 22.992 -3.62557 22.993C-3.62557 22.9941 -3.62557 22.9951 -3.62557 22.9961C-3.62557 22.9972 -3.62557 22.9982 -3.62557 22.9992C-3.62557 23.0002 -3.62557 23.0013 -3.62557 23.0023C-3.62557 23.0033 -3.62557 23.0044 -3.62557 23.0054C-3.62557 23.0064 -3.62557 23.0075 -3.62557 23.0085C-3.62557 23.0095 -3.62557 23.0106 -3.62557 23.0116C-3.62557 23.0126 -3.62557 23.0137 -3.62557 23.0147C-3.62557 23.0157 -3.62557 23.0168 -3.62557 23.0178C-3.62557 23.0188 -3.62557 23.0199 -3.62557 23.0209C-3.62557 23.0219 -3.62557 23.023 -3.62557 23.024C-3.62557 23.025 -3.62557 23.0261 -3.62557 23.0271C-3.62557 23.0281 -3.62557 23.0292 -3.62557 23.0302C-3.62557 23.0312 -3.62557 23.0323 -3.62557 23.0333C-3.62557 23.0343 -3.62557 23.0354 -3.62557 23.0364C-3.62557 23.0374 -3.62557 23.0385 -3.62557 23.0395C-3.62557 23.0405 -3.62557 23.0416 -3.62557 23.0426C-3.62557 23.0436 -3.62557 23.0447 -3.62557 23.0457C-3.62557 23.0467 -3.62557 23.0478 -3.62557 23.0488C-3.62557 23.0498 -3.62557 23.0509 -3.62557 23.0519C-3.62557 23.0529 -3.62557 23.054 -3.62557 23.055C-3.62557 23.056 -3.62557 23.0571 -3.62557 23.0581C-3.62557 23.0591 -3.62557 23.0602 -3.62557 23.0612C-3.62557 23.0622 -3.62557 23.0633 -3.62557 23.0643C-3.62557 23.0653 -3.62557 23.0664 -3.62557 23.0674C-3.62557 23.0684 -3.62557 23.0695 -3.62557 23.0705C-3.62557 23.0715 -3.62557 23.0726 -3.62557 23.0736C-3.62557 23.0746 -3.62557 23.0757 -3.62557 23.0767C-3.62557 23.0777 -3.62557 23.0788 -3.62557 23.0798C-3.62557 23.0808 -3.62557 23.0819 -3.62557 23.0829C-3.62557 23.0839 -3.62557 23.085 -3.62557 23.086C-3.62557 23.087 -3.62557 23.088 -3.62557 23.0891C-3.62557 23.0901 -3.62557 23.0911 -3.62557 23.0922C-3.62557 23.0932 -3.62557 23.0942 -3.62557 23.0953C-3.62557 23.0963 -3.62557 23.0973 -3.62557 23.0984C-3.62557 23.0994 -3.62557 23.1004 -3.62557 23.1015C-3.62557 23.1025 -3.62557 23.1035 -3.62557 23.1046C-3.62557 23.1056 -3.62557 23.1066 -3.62557 23.1077C-3.62557 23.1087 -3.62557 23.1097 -3.62557 23.1108C-3.62557 23.1118 -3.62557 23.1128 -3.62557 23.1139C-3.62557 23.1149 -3.62557 23.1159 -3.62557 23.117C-3.62557 23.118 -3.62557 23.119 -3.62557 23.1201C-3.62557 23.1211 -3.62557 23.1221 -3.62557 23.1232C-3.62557 23.1242 -3.62557 23.1252 -3.62557 23.1263C-3.62557 23.1273 -3.62557 23.1283 -3.62557 23.1294C-3.62557 23.1304 -3.62557 23.1314 -3.62557 23.1325C-3.62557 23.1335 -3.62557 23.1345 -3.62557 23.1356C-3.62557 23.1366 -3.62557 23.1376 -3.62557 23.1387C-3.62557 23.1397 -3.62557 23.1407 -3.62557 23.1418C-3.62557 23.1428 -3.62557 23.1438 -3.62557 23.1449C-3.62557 23.1459 -3.62557 23.1469 -3.62557 23.148C-3.62557 23.149 -3.62557 23.15 -3.62557 23.1511C-3.62557 23.1521 -3.62557 23.1531 -3.62557 23.1542C-3.62557 23.1552 -3.62557 23.1562 -3.62557 23.1573C-3.62557 23.1583 -3.62557 23.1593 -3.62557 23.1603C-3.62557 23.1614 -3.62557 23.1624 -3.62557 23.1634C-3.62557 23.1645 -3.62557 23.1655 -3.62557 23.1665C-3.62557 23.1676 -3.62557 23.1686 -3.62557 23.1696C-3.62557 23.1707 -3.62557 23.1717 -3.62557 23.1727C-3.62557 23.1738 -3.62557 23.1748 -3.62557 23.1758C-3.62557 23.1769 -3.62557 23.1779 -3.62557 23.1789C-3.62557 23.18 -3.62557 23.181 -3.62557 23.182C-3.62557 23.1831 -3.62557 23.1841 -3.62557 23.1851C-3.62557 23.1862 -3.62557 23.1872 -3.62557 23.1882C-3.62557 23.1893 -3.62557 23.1903 -3.62557 23.1913C-3.62557 23.1924 -3.62557 23.1934 -3.62557 23.1944C-3.62557 23.1955 -3.62557 23.1965 -3.62557 23.1975C-3.62557 23.1986 -3.62557 23.1996 -3.62557 23.2006C-3.62557 23.2017 -3.62557 23.2027 -3.62557 23.2037C-3.62557 23.2048 -3.62557 23.2058 -3.62557 23.2068C-3.62557 23.2079 -3.62557 23.2089 -3.62557 23.2099C-3.62557 23.211 -3.62557 23.212 -3.62557 23.213C-3.62557 23.2141 -3.62557 23.2151 -3.62557 23.2161C-3.62557 23.2172 -3.62557 23.2182 -3.62557 23.2192C-3.62557 23.2203 -3.62557 23.2213 -3.62557 23.2223C-3.62557 23.2233 -3.62557 23.2244 -3.62557 23.2254C-3.62557 23.2264 -3.62557 23.2275 -3.62557 23.2285C-3.62557 23.2295 -3.62557 23.2306 -3.62557 23.2316C-3.62557 23.2326 -3.62557 23.2337 -3.62557 23.2347C-3.62557 23.2357 -3.62557 23.2368 -3.62557 23.2378C-3.62557 23.2388 -3.62557 23.2399 -3.62557 23.2409C-3.62557 23.2419 -3.62557 23.243 -3.62557 23.244C-3.62557 23.245 -3.62557 23.2461 -3.62557 23.2471C-3.62557 23.2481 -3.62557 23.2492 -3.62557 23.2502C-3.62557 23.2512 -3.62557 23.2523 -3.62557 23.2533C-3.62557 23.2543 -3.62557 23.2554 -3.62557 23.2564C-3.62557 23.2574 -3.62557 23.2585 -3.62557 23.2595C-3.62557 23.2605 -3.62557 23.2616 -3.62557 23.2626C-3.62557 23.2636 -3.62557 23.2647 -3.62557 23.2657C-3.62557 23.2667 -3.62557 23.2678 -3.62557 23.2688C-3.62557 23.2698 -3.62557 23.2709 -3.62557 23.2719C-3.62557 23.2729 -3.62557 23.274 -3.62557 23.275C-3.62557 23.276 -3.62557 23.2771 -3.62557 23.2781C-3.62557 23.2791 -3.62557 23.2801 -3.62557 23.2812C-3.62557 23.2822 -3.62557 23.2832 -3.62557 23.2843C-3.62557 23.2853 -3.62557 23.2863 -3.62557 23.2874C-3.62557 23.2884 -3.62557 23.2894 -3.62557 23.2905C-3.62557 23.2915 -3.62557 23.2925 -3.62557 23.2936C-3.62557 23.2946 -3.62557 23.2956 -3.62557 23.2967C-3.62557 23.2977 -3.62557 23.2987 -3.62557 23.2998C-3.62557 23.3008 -3.62557 23.3018 -3.62557 23.3029C-3.62557 23.3039 -3.62557 23.3049 -3.62557 23.306C-3.62557 23.307 -3.62557 23.308 -3.62557 23.3091C-3.62557 23.3101 -3.62557 23.3111 -3.62557 23.3122C-3.62557 23.3132 -3.62557 23.3142 -3.62557 23.3153C-3.62557 23.3163 -3.62557 23.3173 -3.62557 23.3184C-3.62557 23.3194 -3.62557 23.3204 -3.62557 23.3215C-3.62557 23.3225 -3.62557 23.3235 -3.62557 23.3246C-3.62557 23.3256 -3.62557 23.3266 -3.62557 23.3277C-3.62557 23.3287 -3.62557 23.3297 -3.62557 23.3307C-3.62557 23.3318 -3.62557 23.3328 -3.62557 23.3338C-3.62557 23.3349 -3.62557 23.3359 -3.62557 23.3369C-3.62557 23.338 -3.62557 23.339 -3.62557 23.34C-3.62557 23.3411 -3.62557 23.3421 -3.62557 23.3431C-3.62557 23.3442 -3.62557 23.3452 -3.62557 23.3462C-3.62557 23.3473 -3.62557 23.3483 -3.62557 23.3493C-3.62557 23.3504 -3.62557 23.3514 -3.62557 23.3524C-3.62557 23.3535 -3.62557 23.3545 -3.62557 23.3555C-3.62557 23.3566 -3.62557 23.3576 -3.62557 23.3586C-3.62557 23.3597 -3.62557 23.3607 -3.62557 23.3617C-3.62557 23.3628 -3.62557 23.3638 -3.62557 23.3648C-3.62557 23.3659 -3.62557 23.3669 -3.62557 23.3679C-3.62557 23.369 -3.62557 23.37 -3.62557 23.371C-3.62557 23.3721 -3.62557 23.3731 -3.62557 23.3741C-3.62557 23.3751 -3.62557 23.3762 -3.62557 23.3772C-3.62557 23.3782 -3.62557 23.3793 -3.62557 23.3803C-3.62557 23.3813 -3.62557 23.3824 -3.62557 23.3834C-3.62557 23.3844 -3.62557 23.3855 -3.62557 23.3865C-3.62557 23.3875 -3.62557 23.3886 -3.62557 23.3896C-3.62557 23.3906 -3.62557 23.3917 -3.62557 23.3927C-3.62557 23.3937 -3.62557 23.3948 -3.62557 23.3958C-3.62557 23.3968 -3.62557 23.3979 -3.62557 23.3989C-3.62557 23.3999 -3.62557 23.401 -3.62557 23.402C-3.62557 23.403 -3.62557 23.4041 -3.62557 23.4051C-3.62557 23.4061 -3.62557 23.4072 -3.62557 23.4082C-3.62557 23.4092 -3.62557 23.4103 -3.62557 23.4113C-3.62557 23.4123 -3.62557 23.4134 -3.62557 23.4144C-3.62557 23.4154 -3.62557 23.4165 -3.62557 23.4175C-3.62557 23.4185 -3.62557 23.4195 -3.62557 23.4206C-3.62557 23.4216 -3.62557 23.4226 -3.62557 23.4237C-3.62557 23.4247 -3.62557 23.4257 -3.62557 23.4268C-3.62557 23.4278 -3.62557 23.4288 -3.62557 23.4299C-3.62557 23.4309 -3.62557 23.4319 -3.62557 23.433C-3.62557 23.434 -3.62557 23.435 -3.62557 23.4361C-3.62557 23.4371 -3.62557 23.4381 -3.62557 23.4392C-3.62557 23.4402 -3.62557 23.4412 -3.62557 23.4423C-3.62557 23.4433 -3.62557 23.4443 -3.62557 23.4454C-3.62557 23.4464 -3.62557 23.4474 -3.62557 23.4485C-3.62557 23.4495 -3.62557 23.4505 -3.62557 23.4516C-3.62557 23.4526 -3.62557 23.4536 -3.62557 23.4547C-3.62557 23.4557 -3.62557 23.4567 -3.62557 23.4577C-3.62557 23.4588 -3.62557 23.4598 -3.62557 23.4608C-3.62557 23.4619 -3.62557 23.4629 -3.62557 23.4639C-3.62557 23.465 -3.62557 23.466 -3.62557 23.467C-3.62557 23.4681 -3.62557 23.4691 -3.62557 23.4701C-3.62557 23.4712 -3.62557 23.4722 -3.62557 23.4732C-3.62557 23.4743 -3.62557 23.4753 -3.62557 23.4763C-3.62557 23.4774 -3.62557 23.4784 -3.62557 23.4794C-3.62557 23.4805 -3.62557 23.4815 -3.62557 23.4825C-3.62557 23.4836 -3.62557 23.4846 -3.62557 23.4856C-3.62557 23.4867 -3.62557 23.4877 -3.62557 23.4887C-3.62557 23.4898 -3.62557 23.4908 -3.62557 23.4918C-3.62557 23.4928 -3.62557 23.4939 -3.62557 23.4949C-3.62557 23.4959 -3.62557 23.497 -3.62557 23.498C-3.62557 23.499 -3.62557 23.5001 -3.62557 23.5011C-3.62557 23.5021 -3.62557 23.5032 -3.62557 23.5042C-3.62557 23.5052 -3.62557 23.5063 -3.62557 23.5073C-3.62557 23.5083 -3.62557 23.5094 -3.62557 23.5104C-3.62557 23.5114 -3.62557 23.5125 -3.62557 23.5135C-3.62557 23.5145 -3.62557 23.5156 -3.62557 23.5166C-3.62557 23.5176 -3.62557 23.5187 -3.62557 23.5197C-3.62557 23.5207 -3.62557 23.5218 -3.62557 23.5228C-3.62557 23.5238 -3.62557 23.5249 -3.62557 23.5259C-3.62557 23.5269 -3.62557 23.5279 -3.62557 23.529C-3.62557 23.53 -3.62557 23.531 -3.62557 23.5321C-3.62557 23.5331 -3.62557 23.5341 -3.62557 23.5352C-3.62557 23.5362 -3.62557 23.5372 -3.62557 23.5383C-3.62557 23.5393 -3.62557 23.5403 -3.62557 23.5414C-3.62557 23.5424 -3.62557 23.5434 -3.62557 23.5445C-3.62557 23.5455 -3.62557 23.5465 -3.62557 23.5476C-3.62557 23.5486 -3.62557 23.5496 -3.62557 23.5507C-3.62557 23.5517 -3.62557 23.5527 -3.62557 23.5538C-3.62557 23.5548 -3.62557 23.5558 -3.62557 23.5569C-3.62557 23.5579 -3.62557 23.5589 -3.62557 23.5599C-3.62557 23.561 -3.62557 23.562 -3.62557 23.563C-3.62557 23.5641 -3.62557 23.5651 -3.62557 23.5661C-3.62557 23.5672 -3.62557 23.5682 -3.62557 23.5692C-3.62557 23.5703 -3.62557 23.5713 -3.62557 23.5723C-3.62557 23.5734 -3.62557 23.5744 -3.62557 23.5754C-3.62557 23.5765 -3.62557 23.5775 -3.62557 23.5785C-3.62557 23.5796 -3.62557 23.5806 -3.62557 23.5816C-3.62557 23.5827 -3.62557 23.5837 -3.62557 23.5847C-3.62557 23.5858 -3.62557 23.5868 -3.62557 23.5878C-3.62557 23.5889 -3.62557 23.5899 -3.62557 23.5909C-3.62557 23.5919 -3.62557 23.593 -3.62557 23.594C-3.62557 23.595 -3.62557 23.5961 -3.62557 23.5971C-3.62557 23.5981 -3.62557 23.5992 -3.62557 23.6002C-3.62557 23.6012 -3.62557 23.6023 -3.62557 23.6033C-3.62557 23.6043 -3.62557 23.6054 -3.62557 23.6064C-3.62557 23.6074 -3.62557 23.6085 -3.62557 23.6095C-3.62557 23.6105 -3.62557 23.6116 -3.62557 23.6126C-3.62557 23.6136 -3.62557 23.6147 -3.62557 23.6157C-3.62557 23.6167 -3.62557 23.6177 -3.62557 23.6188C-3.62557 23.6198 -3.62557 23.6208 -3.62557 23.6219C-3.62557 23.6229 -3.62557 23.6239 -3.62557 23.625C-3.62557 23.626 -3.62557 23.627 -3.62557 23.6281C-3.62557 23.6291 -3.62557 23.6301 -3.62557 23.6312C-3.62557 23.6322 -3.62557 23.6332 -3.62557 23.6343C-3.62557 23.6353 -3.62557 23.6363 -3.62557 23.6374C-3.62557 23.6384 -3.62557 23.6394 -3.62557 23.6405C-3.62557 23.6415 -3.62557 23.6425 -3.62557 23.6436C-3.62557 23.6446 -3.62557 23.6456 -3.62557 23.6466C-3.62557 23.6477 -3.62557 23.6487 -3.62557 23.6497C-3.62557 23.6508 -3.62557 23.6518 -3.62557 23.6528C-3.62557 23.6539 -3.62557 23.6549 -3.62557 23.6559C-3.62557 23.657 -3.62557 23.658 -3.62557 23.659C-3.62557 23.6601 -3.62557 23.6611 -3.62557 23.6621C-3.62557 23.6632 -3.62557 23.6642 -3.62557 23.6652C-3.62557 23.6663 -3.62557 23.6673 -3.62557 23.6683C-3.62557 23.6694 -3.62557 23.6704 -3.62557 23.6714C-3.62557 23.6724 -3.62557 23.6735 -3.62557 23.6745C-3.62557 23.6755 -3.62557 23.6766 -3.62557 23.6776C-3.62557 23.6786 -3.62557 23.6797 -3.62557 23.6807C-3.62557 23.6817 -3.62557 23.6828 -3.62557 23.6838C-3.62557 23.6848 -3.62557 23.6859 -3.62557 23.6869C-3.62557 23.6879 -3.62557 23.689 -3.62557 23.69C-3.62557 23.691 -3.62557 23.6921 -3.62557 23.6931C-3.62557 23.6941 -3.62557 23.6952 -3.62557 23.6962C-3.62557 23.6972 -3.62557 23.6982 -3.62557 23.6993C-3.62557 23.7003 -3.62557 23.7013 -3.62557 23.7024C-3.62557 23.7034 -3.62557 23.7044 -3.62557 23.7055C-3.62557 23.7065 -3.62557 23.7075 -3.62557 23.7086C-3.62557 23.7096 -3.62557 23.7106 -3.62557 23.7117C-3.62557 23.7127 -3.62557 23.7137 -3.62557 23.7148C-3.62557 23.7158 -3.62557 23.7168 -3.62557 23.7179C-3.62557 23.7189 -3.62557 23.7199 -3.62557 23.7209C-3.62557 23.722 -3.62557 23.723 -3.62557 23.724C-3.62557 23.7251 -3.62557 23.7261 -3.62557 23.7271C-3.62557 23.7282 -3.62557 23.7292 -3.62557 23.7302C-3.62557 23.7313 -3.62557 23.7323 -3.62557 23.7333C-3.62557 23.7344 -3.62557 23.7354 -3.62557 23.7364C-3.62557 23.7375 -3.62557 23.7385 -3.62557 23.7395C-3.62557 23.7406 -3.62557 23.7416 -3.62557 23.7426C-3.62557 23.7436 -3.62557 23.7447 -3.62557 23.7457C-3.62557 23.7467 -3.62557 23.7478 -3.62557 23.7488C-3.62557 23.7498 -3.62557 23.7509 -3.62557 23.7519C-3.62557 23.7529 -3.62557 23.754 -3.62557 23.755C-3.62557 23.756 -3.62557 23.7571 -3.62557 23.7581C-3.62557 23.7591 -3.62557 23.7602 -3.62557 23.7612C-3.62557 23.7622 -3.62557 23.7633 -3.62557 23.7643C-3.62557 23.7653 -3.62557 23.7663 -3.62557 23.7674C-3.62557 23.7684 -3.62557 23.7694 -3.62557 23.7705C-3.62557 23.7715 -3.62557 23.7725 -3.62557 23.7736C-3.62557 23.7746 -3.62557 23.7756 -3.62557 23.7767C-3.62557 23.7777 -3.62557 23.7787 -3.62557 23.7798C-3.62557 23.7808 -3.62557 23.7818 -3.62557 23.7829C-3.62557 23.7839 -3.62557 23.7849 -3.62557 23.786C-3.62557 23.787 -3.62557 23.788 -3.62557 23.789C-3.62557 23.7901 -3.62557 23.7911 -3.62557 23.7921C-3.62557 23.7932 -3.62557 23.7942 -3.62557 23.7952C-3.62557 23.7963 -3.62557 23.7973 -3.62557 23.7983C-3.62557 23.7994 -3.62557 23.8004 -3.62557 23.8014C-3.62557 23.8025 -3.62557 23.8035 -3.62557 23.8045C-3.62557 23.8056 -3.62557 23.8066 -3.62557 23.8076C-3.62557 23.8086 -3.62557 23.8097 -3.62557 23.8107C-3.62557 23.8117 -3.62557 23.8128 -3.62557 23.8138C-3.62557 23.8148 -3.62557 23.8159 -3.62557 23.8169C-3.62557 23.8179 -3.62557 23.819 -3.62557 23.82C-3.62557 23.821 -3.62557 23.8221 -3.62557 23.8231C-3.62557 23.8241 -3.62557 23.8252 -3.62557 23.8262C-3.62557 23.8272 -3.62557 23.8283 -3.62557 23.8293C-3.62557 23.8303 -3.62557 23.8313 -3.62557 23.8324C-3.62557 23.8334 -3.62557 23.8344 -3.62557 23.8355C-3.62557 23.8365 -3.62557 23.8375 -3.62557 23.8386C-3.62557 23.8396 -3.62557 23.8406 -3.62557 23.8417C-3.62557 23.8427 -3.62557 23.8437 -3.62557 23.8448C-3.62557 23.8458 -3.62557 23.8468 -3.62557 23.8479C-3.62557 23.8489 -3.62557 23.8499 -3.62557 23.8509C-3.62557 23.852 -3.62557 23.853 -3.62557 23.854C-3.62557 23.8551 -3.62557 23.8561 -3.62557 23.8571C-3.62557 23.8582 -3.62557 23.8592 -3.62557 23.8602C-3.62557 23.8613 -3.62557 23.8623 -3.62557 23.8633C-3.62557 23.8644 -3.62557 23.8654 -3.62557 23.8664C-3.62557 23.8674 -3.62557 23.8685 -3.62557 23.8695C-3.62557 23.8705 -3.62557 23.8716 -3.62557 23.8726C-3.62557 23.8736 -3.62557 23.8747 -3.62557 23.8757C-3.62557 23.8767 -3.62557 23.8778 -3.62557 23.8788C-3.62557 23.8798 -3.62557 23.8809 -3.62557 23.8819C-3.62557 23.8829 -3.62557 23.884 -3.62557 23.885C-3.62557 23.886 -3.62557 23.887 -3.62557 23.8881C-3.62557 23.8891 -3.62557 23.8901 -3.62557 23.8912C-3.62557 23.8922 -3.62557 23.8932 -3.62557 23.8943C-3.62557 23.8953 -3.62557 23.8963 -3.62557 23.8974C-3.62557 23.8984 -3.62557 23.8994 -3.62557 23.9005C-3.62557 23.9015 -3.62557 23.9025 -3.62557 23.9036C-3.62557 23.9046 -3.62557 23.9056 -3.62557 23.9066C-3.62557 23.9077 -3.62557 23.9087 -3.62557 23.9097C-3.62557 23.9108 -3.62557 23.9118 -3.62557 23.9128C-3.62557 23.9139 -3.62557 23.9149 -3.62557 23.9159C-3.62557 23.917 -3.62557 23.918 -3.62557 23.919C-3.62557 23.9201 -3.62557 23.9211 -3.62557 23.9221C-3.62557 23.9231 -3.62557 23.9242 -3.62557 23.9252C-3.62557 23.9262 -3.62557 23.9273 -3.62557 23.9283C-3.62557 23.9293 -3.62557 23.9304 -3.62557 23.9314C-3.62557 23.9324 -3.62557 23.9335 -3.62557 23.9345C-3.62557 23.9355 -3.62557 23.9366 -3.62557 23.9376C-3.62557 23.9386 -3.62557 23.9396 -3.62557 23.9407C-3.62557 23.9417 -3.62557 23.9427 -3.62557 23.9438C-3.62557 23.9448 -3.62557 23.9458 -3.62557 23.9469C-3.62557 23.9479 -3.62557 23.9489 -3.62557 23.95C-3.62557 23.951 -3.62557 23.952 -3.62557 23.9531C-3.62557 23.9541 -3.62557 23.9551 -3.62557 23.9561C-3.62557 23.9572 -3.62557 23.9582 -3.62557 23.9592C-3.62557 23.9603 -3.62557 23.9613 -3.62557 23.9623C-3.62557 23.9634 -3.62557 23.9644 -3.62557 23.9654C-3.62557 23.9665 -3.62557 23.9675 -3.62557 23.9685C-3.62557 23.9696 -3.62557 23.9706 -3.62557 23.9716C-3.62557 23.9726 -3.62557 23.9737 -3.62557 23.9747C-3.62557 23.9757 -3.62557 23.9768 -3.62557 23.9778C-3.62557 23.9788 -3.62557 23.9799 -3.62557 23.9809C-3.62557 23.9819 -3.62557 23.983 -3.62557 23.984C-3.62557 23.985 -3.62557 23.9861 -3.62557 23.9871C-3.62557 23.9881 -3.62557 23.9891 -3.62557 23.9902C-3.62557 23.9912 -3.62557 23.9922 -3.62557 23.9933C-3.62557 23.9943 -3.62557 23.9953 -3.62557 23.9964C-3.62557 23.9974 -3.62557 23.9984 -3.62557 23.9995C-3.62557 24.0005 -3.62557 24.0015 -3.62557 24.0026C-3.62557 24.0036 -3.62557 24.0046 -3.62557 24.0056C-3.62557 24.0067 -3.62557 24.0077 -3.62557 24.0087C-3.62557 24.0098 -3.62557 24.0108 -3.62557 24.0118C-3.62557 24.0129 -3.62557 24.0139 -3.62557 24.0149C-3.62557 24.016 -3.62557 24.017 -3.62557 24.018C-3.62557 24.019 -3.62557 24.0201 -3.62557 24.0211C-3.62557 24.0221 -3.62557 24.0232 -3.62557 24.0242C-3.62557 24.0252 -3.62557 24.0263 -3.62557 24.0273C-3.62557 24.0283 -3.62557 24.0294 -3.62557 24.0304C-3.62557 24.0314 -3.62557 24.0325 -3.62557 24.0335C-3.62557 24.0345 -3.62557 24.0355 -3.62557 24.0366C-3.62557 24.0376 -3.62557 24.0386 -3.62557 24.0397C-3.62557 24.0407 -3.62557 24.0417 -3.62557 24.0428C-3.62557 24.0438 -3.62557 24.0448 -3.62557 24.0459C-3.62557 24.0469 -3.62557 24.0479 -3.62557 24.0489C-3.62557 24.05 -3.62557 24.051 -3.62557 24.052C-3.62557 24.0531 -3.62557 24.0541 -3.62557 24.0551C-3.62557 24.0562 -3.62557 24.0572 -3.62557 24.0582C-3.62557 24.0593 -3.62557 24.0603 -3.62557 24.0613C-3.62557 24.0624 -3.62557 24.0634 -3.62557 24.0644C-3.62557 24.0654 -3.62557 24.0665 -3.62557 24.0675C-3.62557 24.0685 -3.62557 24.0696 -3.62557 24.0706C-3.62557 24.0716 -3.62557 24.0727 -3.62557 24.0737C-3.62557 24.0747 -3.62557 24.0758 -3.62557 24.0768C-3.62557 24.0778 -3.62557 24.0788 -3.62557 24.0799C-3.62557 24.0809 -3.62557 24.0819 -3.62557 24.083C-3.62557 24.084 -3.62557 24.085 -3.62557 24.0861C-3.62557 24.0871 -3.62557 24.0881 -3.62557 24.0892C-3.62557 24.0902 -3.62557 24.0912 -3.62557 24.0922C-3.62557 24.0933 -3.62557 24.0943 -3.62557 24.0953C-3.62557 24.0964 -3.62557 24.0974 -3.62557 24.0984C-3.62557 24.0995 -3.62557 24.1005 -3.62557 24.1015C-3.62557 24.1026 -3.62557 24.1036 -3.62557 24.1046C-3.62557 24.1056 -3.62557 24.1067 -3.62557 24.1077C-3.62557 24.1087 -3.62557 24.1098 -3.62557 24.1108C-3.62557 24.1118 -3.62557 24.1129 -3.62557 24.1139C-3.62557 24.1149 -3.62557 24.116 -3.62557 24.117C-3.62557 24.118 -3.62557 24.119 -3.62557 24.1201C-3.62557 24.1211 -3.62557 24.1221 -3.62557 24.1232C-3.62557 24.1242 -3.62557 24.1252 -3.62557 24.1263C-3.62557 24.1273 -3.62557 24.1283 -3.62557 24.1294C-3.62557 24.1304 -3.62557 24.1314 -3.62557 24.1324C-3.62557 24.1335 -3.62557 24.1345 -3.62557 24.1355C-3.62557 24.1366 -3.62557 24.1376 -3.62557 24.1386C-3.62557 24.1397 -3.62557 24.1407 -3.62557 24.1417C-3.62557 24.1428 -3.62557 24.1438 -3.62557 24.1448C-3.62557 24.1458 -3.62557 24.1469 -3.62557 24.1479C-3.62557 24.1489 -3.62557 24.15 -3.62557 24.151C-3.62557 24.152 -3.62557 24.1531 -3.62557 24.1541C-3.62557 24.1551 -3.62557 24.1562 -3.62557 24.1572C-3.62557 24.1582 -3.62557 24.1592 -3.62557 24.1603C-3.62557 24.1613 -3.62557 24.1623 -3.62557 24.1634C-3.62557 24.1644 -3.62557 24.1654 -3.62557 24.1665C-3.62557 24.1675 -3.62557 24.1685 -3.62557 24.1695C-3.62557 24.1706 -3.62557 24.1716 -3.62557 24.1726C-3.62557 24.1737 -3.62557 24.1747 -3.62557 24.1757C-3.62557 24.1768 -3.62557 24.1778 -3.62557 24.1788C-3.62557 24.1799 -3.62557 24.1809 -3.62557 24.1819C-3.62557 24.1829 -3.62557 24.184 -3.62557 24.185C-3.62557 24.186 -3.62557 24.1871 -3.62557 24.1881C-3.62557 24.1891 -3.62557 24.1902 -3.62557 24.1912C-3.62557 24.1922 -3.62557 24.1933 -3.62557 24.1943C-3.62557 24.1953 -3.62557 24.1963 -3.62557 24.1974C-3.62557 24.1984 -3.62557 24.1994 -3.62557 24.2005C-3.62557 24.2015 -3.62557 24.2025 -3.62557 24.2036C-3.62557 24.2046 -3.62557 24.2056 -3.62557 24.2066C-3.62557 24.2077 -3.62557 24.2087 -3.62557 24.2097C-3.62557 24.2108 -3.62557 24.2118 -3.62557 24.2128C-3.62557 24.2139 -3.62557 24.2149 -3.62557 24.2159C-3.62557 24.217 -3.62557 24.218 -3.62557 24.219C-3.62557 24.22 -3.62557 24.2211 -3.62557 24.2221C-3.62557 24.2231 -3.62557 24.2242 -3.62557 24.2252C-3.62557 24.2262 -3.62557 24.2273 -3.62557 24.2283C-3.62557 24.2293 -3.62557 24.2303 -3.62557 24.2314C-3.62557 24.2324 -3.62557 24.2334 -3.62557 24.2345C-3.62557 24.2355 -3.62557 24.2365 -3.62557 24.2376C-3.62557 24.2386 -3.62557 24.2396 -3.62557 24.2407C-3.62557 24.2417 -3.62557 24.2427 -3.62557 24.2437C-3.62557 24.2448 -3.62557 24.2458 -3.62557 24.2468C-3.62557 24.2479 -3.62557 24.2489 -3.62557 24.2499C-3.62557 24.251 -3.62557 24.252 -3.62557 24.253C-3.62557 24.254 -3.62557 24.2551 -3.62557 24.2561C-3.62557 24.2571 -3.62557 24.2582 -3.62557 24.2592C-3.62557 24.2602 -3.62557 24.2613 -3.62557 24.2623C-3.62557 24.2633 -3.62557 24.2643 -3.62557 24.2654C-3.62557 24.2664 -3.62557 24.2674 -3.62557 24.2685C-3.62557 24.2695 -3.62557 24.2705 -3.62557 24.2716C-3.62557 24.2726 -3.62557 24.2736 -3.62557 24.2746C-3.62557 24.2757 -3.62557 24.2767 -3.62557 24.2777C-3.62557 24.2788 -3.62557 24.2798 -3.62557 24.2808C-3.62557 24.2819 -3.62557 24.2829 -3.62557 24.2839C-3.62557 24.285 -3.62557 24.286 -3.62557 24.287C-3.62557 24.288 -3.62557 24.2891 -3.62557 24.2901C-3.62557 24.2911 -3.62557 24.2922 -3.62557 24.2932C-3.62557 24.2942 -3.62557 24.2953 -3.62557 24.2963C-3.62557 24.2973 -3.62557 24.2983 -3.62557 24.2994C-3.62557 24.3004 -3.62557 24.3014 -3.62557 24.3025C-3.62557 24.3035 -3.62557 24.3045 -3.62557 24.3056C-3.62557 24.3066 -3.62557 24.3076 -3.62557 24.3086C-3.62557 24.3097 -3.62557 24.3107 -3.62557 24.3117C-3.62557 24.3128 -3.62557 24.3138 -3.62557 24.3148C-3.62557 24.3159 -3.62557 24.3169 -3.62557 24.3179L6.37443 24.3179ZM6.37443 22.7327L6.37443 11.5808H-3.62557L-3.62557 22.7327L6.37443 22.7327ZM6.372 11.4252C6.35513 10.8837 6.38162 10.3418 6.45121 9.80456L-3.46594 8.51999C-3.60406 9.58624 -3.65663 10.6619 -3.62315 11.7365L6.372 11.4252ZM6.43284 9.93323C6.61447 8.76937 7.20554 7.71061 8.09713 6.94748L1.59456 -0.649662C-1.11083 1.66594 -2.89853 4.87307 -3.44757 8.39132L6.43284 9.93323ZM8.09713 6.94748C8.98852 6.18452 10.1217 5.76706 11.2917 5.76878L11.3063 -4.23121C7.74486 -4.23643 4.30014 -2.96542 1.59456 -0.649662L8.09713 6.94748ZM11.299 5.76878C12.8434 5.76878 14.3345 5.11229 15.3701 3.90662C16.3162 2.80523 16.6692 1.50504 16.6703 0.389385C16.6714 -0.726303 16.3208 -2.03069 15.3718 -3.13638C14.3328 -4.34693 12.839 -5 11.299 -5L11.299 5C10.0069 5 8.69891 4.44303 7.78361 3.37663C6.9583 2.41508 6.6694 1.30289 6.67032 0.379402C6.67124 -0.544064 6.96217 -1.65205 7.78442 -2.6093C8.69625 -3.67083 10.0018 -4.23122 11.299 -4.23122L11.299 5.76878ZM11.3017 -5C8.36336 -5.00159 5.48413 -4.17686 2.99183 -2.62045L8.28868 5.86148C9.19155 5.29766 10.2336 4.99943 11.2963 5L11.3017 -5ZM2.99183 -2.62045C0.499601 -1.06409 -1.50521 1.1611 -2.7954 3.80098L6.189 8.19193C6.6579 7.23252 7.38574 6.42536 8.28868 5.86148L2.99183 -2.62045ZM-2.80453 3.81976C-3.85613 5.99443 -4.39928 8.38 -4.39312 10.7956L5.60685 10.7701C5.60455 9.87039 5.80688 8.98226 6.19813 8.17315L-2.80453 3.81976ZM-4.39314 10.7829L-4.39314 23.9597L5.60686 23.9597L5.60686 10.7829H-4.39314ZM-4.39245 23.8771C-4.42248 25.6948 -4.1539 27.5052 -3.59736 29.2358L5.92252 26.1745C5.70113 25.486 5.59423 24.7657 5.60618 24.0423L-4.39245 23.8771ZM-3.5771 29.2974C-2.40193 32.7955 -0.033577 35.7691 3.11429 37.6949L8.33295 29.1646C7.19135 28.4662 6.33006 27.3862 5.90226 26.1128L-3.5771 29.2974ZM3.11429 37.6949C6.26235 39.6208 9.98806 40.3751 13.6372 39.8245L12.145 29.9364C10.8239 30.1358 9.47438 29.8629 8.33295 29.1646L3.11429 37.6949ZM13.6372 39.8245C17.2863 39.2738 20.6236 37.4536 23.0641 34.6855L15.5631 28.0723C14.6766 29.0778 13.4662 29.737 12.145 29.9364L13.6372 39.8245ZM23.0641 34.6855C25.5045 31.9176 26.8926 28.3785 26.9865 24.6896L16.9897 24.4351C16.9555 25.779 16.4498 27.0666 15.5631 28.0723L23.0641 34.6855ZM26.9877 24.6272C26.9958 23.9974 26.9958 23.3715 26.9958 22.7834H16.9958C16.9958 23.3824 16.9957 23.9434 16.9885 24.4976L26.9877 24.6272ZM26.9958 22.7834L26.9958 11.4917H16.9958L16.9958 22.7834H26.9958ZM26.9943 11.6104C27.0239 10.3666 26.9376 9.12274 26.7367 7.89493L16.868 9.51015C16.9687 10.1257 17.012 10.7493 16.9972 11.3729L26.9943 11.6104ZM26.7148 7.77123C26.0339 4.17958 24.1219 0.937206 21.3069 -1.39515L14.9268 6.30515C15.9472 7.15056 16.6422 8.3276 16.8898 9.63386L26.7148 7.77123ZM21.3069 -1.39515C18.4918 -3.72763 14.9505 -5.00323 11.2946 -4.99999L11.3034 5C12.625 4.99883 13.9066 5.45987 14.9268 6.30515L21.3069 -1.39515ZM11.299 -5C9.74939 -5 8.25732 -4.339 7.22376 -3.13201C6.28042 -2.03038 5.92996 -0.732254 5.92885 0.379402C5.92774 1.49108 6.27579 2.7934 7.22208 3.89934C8.25904 5.11123 9.75375 5.76878 11.299 5.76878L11.299 -4.23122C12.5971 -4.23122 13.9066 -3.66977 14.8203 -2.60202C15.6432 -1.64022 15.9298 -0.530098 15.9288 0.389385C15.9279 1.30885 15.6394 2.41477 14.8194 3.37226C13.9093 4.43511 12.6022 5 11.299 5L11.299 -5ZM15.044 7.15384C14.0397 6.18389 12.6973 5.64058 11.2989 5.64058L11.2989 15.6406C10.1032 15.6406 8.9556 15.176 8.09717 14.347L15.044 7.15384ZM11.2989 5.64058C9.9005 5.64058 8.5581 6.18388 7.55374 7.15384L14.5006 14.347C13.6422 15.176 12.4946 15.6406 11.2989 15.6406L11.2989 5.64058ZM4.54257 10.0531C3.4349 11.1197 2.79787 12.6395 2.90523 14.2633C3.00306 15.7429 3.68704 16.9277 4.47558 17.7175C5.26615 18.5093 6.42404 19.1695 7.84719 19.2895C9.39988 19.4204 10.9111 18.869 12.0203 17.8012L5.08478 10.5971C6.01588 9.70072 7.32566 9.21003 8.68746 9.32486C9.91973 9.42877 10.8973 9.99606 11.5522 10.652C12.2051 11.3059 12.798 12.3119 12.8834 13.6035C12.9784 15.0394 12.4076 16.3622 11.4787 17.2566L4.54257 10.0531ZM12.0201 17.8013L14.6652 15.2551L7.72998 8.05076L5.08496 10.5969L12.0201 17.8013ZM14.6609 15.2592L15.034 14.901L8.10725 7.68843L7.73421 8.04669L14.6609 15.2592ZM11.5706 6.2947H11.0272L11.0272 16.2947H11.5706L11.5706 6.2947ZM7.53518 14.8732L10.28 17.5517L17.264 10.3946L14.5192 7.71616L7.53518 14.8732ZM10.2899 17.5613L10.6845 17.9442L17.6485 10.7677L17.254 10.3849L10.2899 17.5613ZM10.675 17.935C11.774 19.0071 13.2845 19.5755 14.8508 19.4497C16.2854 19.3345 17.4488 18.6701 18.2394 17.8793C19.0286 17.09 19.7071 15.9126 19.8113 14.4472C19.9255 12.8409 19.3103 11.3206 18.2092 10.2418L11.2106 17.3846C10.2861 16.4788 9.73561 15.1561 9.83643 13.738C9.92723 12.4609 10.5142 11.4625 11.1678 10.8088C11.8228 10.1537 12.8063 9.5817 14.0505 9.4818C15.4265 9.37132 16.7363 9.87778 17.658 10.777L10.675 17.935ZM14.7099 8.81322H14.7069L14.7069 18.8132H14.7099L14.7099 8.81322ZM16.6765 12.6308V11.0226L6.67653 11.0226V12.6308L16.6765 12.6308ZM16.6765 11.0226C16.6765 9.48329 16.0241 7.9915 14.8168 6.95319C13.7135 6.00433 12.4104 5.65124 11.2927 5.65124C10.1751 5.65124 8.87194 6.00433 7.76865 6.95319C6.56135 7.9915 5.90896 9.48329 5.90896 11.0226L15.909 11.0226C15.909 12.3143 15.3525 13.6204 14.2891 14.5349C13.3298 15.36 12.2185 15.6512 11.2927 15.6512C10.367 15.6512 9.25572 15.36 8.29634 14.5349C7.23296 13.6204 6.67653 12.3143 6.67653 11.0226L16.6765 11.0226ZM5.90898 11.0087L5.8967 15.4538L15.8967 15.4814L15.9089 11.0364L5.90898 11.0087ZM5.85984 24.0994C5.85984 25.6387 6.51222 27.1305 7.71952 28.1688C8.82282 29.1177 10.126 29.4707 11.2436 29.4707C12.3612 29.4707 13.6644 29.1177 14.7677 28.1688C15.975 27.1305 16.6274 25.6387 16.6274 24.0994H6.6274C6.6274 22.8077 7.18384 21.5016 8.24722 20.587C9.2066 19.762 10.3179 19.4707 11.2436 19.4707C12.1693 19.4707 13.2806 19.762 14.24 20.587C15.3034 21.5016 15.8598 22.8077 15.8598 24.0994H5.85984ZM16.6274 24.0994V24.0948H6.6274V24.0994H16.6274ZM18.2003 10.236L15.064 7.17323L8.07721 14.3276L11.2135 17.3904L18.2003 10.236ZM7.55919 7.1486L4.54267 10.053L11.4786 17.2567L14.4952 14.3522L7.55919 7.1486ZM16.6274 24.1162L16.6765 12.6523L6.67657 12.6094L6.62745 24.0734L16.6274 24.1162ZM5.89673 15.4463L5.85988 24.0781L15.8598 24.1208L15.8966 15.489L5.89673 15.4463Z',
            fill: 'black',
            mask: 'url(#path-1-inside-1_509_853)',
          }),
        ],
      }),
    }),
  Qx = '_Footer_112p5_1',
  Xx = { Footer: Qx },
  Yx = () =>
    _.jsx('div', {
      className: Xx.Footer,
      children: _.jsxs('div', {
        className: 'footer-wrapper',
        children: [
          _.jsxs('div', {
            className: 'footer-container',
            children: [
              _.jsxs('div', {
                className: 'footer-contact',
                children: [
                  _.jsx('h5', { children: 'Contact us' }),
                  _.jsxs('div', {
                    className: 'footer-contact-item',
                    children: [
                      _.jsxs('div', {
                        className: 'footer-item-title',
                        children: [
                          _.jsx('div', {
                            className: 'footer-item-icon',
                            children: _.jsx('span', { children: _.jsx(Zx, {}) }),
                          }),
                          _.jsx('span', { children: 'Email:' }),
                        ],
                      }),
                      _.jsx('div', {
                        className: 'footer-item-content',
                        children: _.jsx('span', { children: 'support@noir.com' }),
                      }),
                    ],
                  }),
                  _.jsxs('div', {
                    className: 'footer-contact-item',
                    children: [
                      _.jsxs('div', {
                        className: 'footer-item-title',
                        children: [
                          _.jsx('div', {
                            className: 'footer-item-icon',
                            children: _.jsx('span', { children: _.jsx(Bx, {}) }),
                          }),
                          _.jsx('span', { children: 'Address:' }),
                        ],
                      }),
                      _.jsx('div', {
                        className: 'footer-item-content',
                        children: _.jsx('span', { children: 'Ho Chi Minh City, Viet Nam' }),
                      }),
                    ],
                  }),
                  _.jsxs('div', {
                    className: 'footer-contact-item',
                    children: [
                      _.jsxs('div', {
                        className: 'footer-item-title',
                        children: [
                          _.jsx('div', {
                            className: 'footer-item-icon',
                            children: _.jsx('span', { children: _.jsx(Gx, {}) }),
                          }),
                          _.jsx('span', { children: 'Phone:' }),
                        ],
                      }),
                      _.jsx('div', {
                        className: 'footer-item-content',
                        children: _.jsx('span', { children: '+(84) 28 366 400 874' }),
                      }),
                    ],
                  }),
                ],
              }),
              _.jsxs('div', {
                className: 'footer-policy',
                children: [
                  _.jsx('h5', { children: 'Policy' }),
                  _.jsx('div', {
                    className: 'footer-item-content',
                    children: _.jsx('span', { children: 'Private Policy' }),
                  }),
                  _.jsx('div', {
                    className: 'footer-item-content',
                    children: _.jsx('span', { children: 'Shipping and Return Policy' }),
                  }),
                  _.jsx('div', {
                    className: 'footer-item-content',
                    children: _.jsx('span', { children: 'Membership Policy' }),
                  }),
                ],
              }),
            ],
          }),
          _.jsxs('div', {
            className: 'footer-container',
            children: [
              _.jsxs('div', {
                className: 'footer-shortcut',
                children: [
                  _.jsx('span', { children: 'Shopping Now' }),
                  _.jsx('span', { children: _.jsx(qx, {}) }),
                ],
              }),
              _.jsxs('div', {
                className: 'footer-meta',
                children: [
                  _.jsx('span', { className: 'footer-meta-item', children: _.jsx(Wx, {}) }),
                  _.jsx('span', { className: 'footer-meta-item', children: _.jsx(Ux, {}) }),
                  _.jsx('span', { className: 'footer-meta-item', children: _.jsx(Kx, {}) }),
                ],
              }),
            ],
          }),
        ],
      }),
    });
function Jx() {
  return _.jsx(eg, {
    children: _.jsxs(_.Fragment, {
      children: [
        _.jsx(Ox, {}),
        _.jsxs(Zh, {
          children: [
            _.jsx(ao, { path: '/', element: _.jsx(Ax, {}) }),
            _.jsx(ao, { path: '/new-collection', element: _.jsx(zx, {}) }),
            _.jsx(ao, { path: '/gift-card', element: _.jsx(Dx, {}) }),
            _.jsx(ao, { path: '/contact', element: _.jsx(Vx, {}) }),
            _.jsx(ao, { path: '/about', element: _.jsx(Hx, {}) }),
          ],
        }),
        _.jsx(Yx, {}),
      ],
    }),
  });
}
C7(document.getElementById('root')).render(_.jsx(d.StrictMode, { children: _.jsx(Jx, {}) }));
