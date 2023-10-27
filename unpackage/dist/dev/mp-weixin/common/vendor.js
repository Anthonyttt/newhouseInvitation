"use strict";
var _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
function makeMap(str, expectsLowerCase) {
  const map = /* @__PURE__ */ Object.create(null);
  const list = str.split(",");
  for (let i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase ? (val) => !!map[val.toLowerCase()] : (val) => !!map[val];
}
const EMPTY_OBJ = Object.freeze({});
const EMPTY_ARR = Object.freeze([]);
const NOOP = () => {
};
const NO = () => false;
const onRE = /^on[^a-z]/;
const isOn = (key) => onRE.test(key);
const isModelListener = (key) => key.startsWith("onUpdate:");
const extend = Object.assign;
const remove = (arr, el) => {
  const i = arr.indexOf(el);
  if (i > -1) {
    arr.splice(i, 1);
  }
};
const hasOwnProperty = Object.prototype.hasOwnProperty;
const hasOwn = (val, key) => hasOwnProperty.call(val, key);
const isArray = Array.isArray;
const isMap = (val) => toTypeString(val) === "[object Map]";
const isSet = (val) => toTypeString(val) === "[object Set]";
const isFunction = (val) => typeof val === "function";
const isString = (val) => typeof val === "string";
const isSymbol = (val) => typeof val === "symbol";
const isObject = (val) => val !== null && typeof val === "object";
const isPromise = (val) => {
  return isObject(val) && isFunction(val.then) && isFunction(val.catch);
};
const objectToString = Object.prototype.toString;
const toTypeString = (value) => objectToString.call(value);
const toRawType = (value) => {
  return toTypeString(value).slice(8, -1);
};
const isPlainObject = (val) => toTypeString(val) === "[object Object]";
const isIntegerKey = (key) => isString(key) && key !== "NaN" && key[0] !== "-" && "" + parseInt(key, 10) === key;
const isReservedProp = /* @__PURE__ */ makeMap(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted");
const isBuiltInDirective = /* @__PURE__ */ makeMap("bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo");
const cacheStringFunction = (fn) => {
  const cache = /* @__PURE__ */ Object.create(null);
  return (str) => {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
};
const camelizeRE = /-(\w)/g;
const camelize = cacheStringFunction((str) => {
  return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : "");
});
const hyphenateRE = /\B([A-Z])/g;
const hyphenate = cacheStringFunction((str) => str.replace(hyphenateRE, "-$1").toLowerCase());
const capitalize = cacheStringFunction((str) => str.charAt(0).toUpperCase() + str.slice(1));
const toHandlerKey = cacheStringFunction((str) => str ? `on${capitalize(str)}` : ``);
const hasChanged = (value, oldValue) => !Object.is(value, oldValue);
const invokeArrayFns$1 = (fns, arg) => {
  for (let i = 0; i < fns.length; i++) {
    fns[i](arg);
  }
};
const def = (obj, key, value) => {
  Object.defineProperty(obj, key, {
    configurable: true,
    enumerable: false,
    value
  });
};
const toNumber = (val) => {
  const n = parseFloat(val);
  return isNaN(n) ? val : n;
};
const LINEFEED = "\n";
const SLOT_DEFAULT_NAME = "d";
const ON_SHOW = "onShow";
const ON_HIDE = "onHide";
const ON_LAUNCH = "onLaunch";
const ON_ERROR = "onError";
const ON_THEME_CHANGE = "onThemeChange";
const ON_PAGE_NOT_FOUND = "onPageNotFound";
const ON_UNHANDLE_REJECTION = "onUnhandledRejection";
const ON_LOAD = "onLoad";
const ON_READY = "onReady";
const ON_UNLOAD = "onUnload";
const ON_INIT = "onInit";
const ON_SAVE_EXIT_STATE = "onSaveExitState";
const ON_RESIZE = "onResize";
const ON_BACK_PRESS = "onBackPress";
const ON_PAGE_SCROLL = "onPageScroll";
const ON_TAB_ITEM_TAP = "onTabItemTap";
const ON_REACH_BOTTOM = "onReachBottom";
const ON_PULL_DOWN_REFRESH = "onPullDownRefresh";
const ON_SHARE_TIMELINE = "onShareTimeline";
const ON_ADD_TO_FAVORITES = "onAddToFavorites";
const ON_SHARE_APP_MESSAGE = "onShareAppMessage";
const ON_NAVIGATION_BAR_BUTTON_TAP = "onNavigationBarButtonTap";
const ON_NAVIGATION_BAR_SEARCH_INPUT_CLICKED = "onNavigationBarSearchInputClicked";
const ON_NAVIGATION_BAR_SEARCH_INPUT_CHANGED = "onNavigationBarSearchInputChanged";
const ON_NAVIGATION_BAR_SEARCH_INPUT_CONFIRMED = "onNavigationBarSearchInputConfirmed";
const ON_NAVIGATION_BAR_SEARCH_INPUT_FOCUS_CHANGED = "onNavigationBarSearchInputFocusChanged";
const customizeRE = /:/g;
function customizeEvent(str) {
  return camelize(str.replace(customizeRE, "-"));
}
function hasLeadingSlash(str) {
  return str.indexOf("/") === 0;
}
function addLeadingSlash(str) {
  return hasLeadingSlash(str) ? str : "/" + str;
}
const invokeArrayFns = (fns, arg) => {
  let ret;
  for (let i = 0; i < fns.length; i++) {
    ret = fns[i](arg);
  }
  return ret;
};
function once(fn, ctx = null) {
  let res;
  return (...args) => {
    if (fn) {
      res = fn.apply(ctx, args);
      fn = null;
    }
    return res;
  };
}
function getValueByDataPath(obj, path) {
  if (!isString(path)) {
    return;
  }
  path = path.replace(/\[(\d+)\]/g, ".$1");
  const parts = path.split(".");
  let key = parts[0];
  if (!obj) {
    obj = {};
  }
  if (parts.length === 1) {
    return obj[key];
  }
  return getValueByDataPath(obj[key], parts.slice(1).join("."));
}
function sortObject(obj) {
  let sortObj = {};
  if (isPlainObject(obj)) {
    Object.keys(obj).sort().forEach((key) => {
      const _key = key;
      sortObj[_key] = obj[_key];
    });
  }
  return !Object.keys(sortObj) ? obj : sortObj;
}
const encode = encodeURIComponent;
function stringifyQuery(obj, encodeStr = encode) {
  const res = obj ? Object.keys(obj).map((key) => {
    let val = obj[key];
    if (typeof val === void 0 || val === null) {
      val = "";
    } else if (isPlainObject(val)) {
      val = JSON.stringify(val);
    }
    return encodeStr(key) + "=" + encodeStr(val);
  }).filter((x) => x.length > 0).join("&") : null;
  return res ? `?${res}` : "";
}
const PAGE_HOOKS = [
  ON_INIT,
  ON_LOAD,
  ON_SHOW,
  ON_HIDE,
  ON_UNLOAD,
  ON_BACK_PRESS,
  ON_PAGE_SCROLL,
  ON_TAB_ITEM_TAP,
  ON_REACH_BOTTOM,
  ON_PULL_DOWN_REFRESH,
  ON_SHARE_TIMELINE,
  ON_SHARE_APP_MESSAGE,
  ON_ADD_TO_FAVORITES,
  ON_SAVE_EXIT_STATE,
  ON_NAVIGATION_BAR_BUTTON_TAP,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CLICKED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CHANGED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CONFIRMED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_FOCUS_CHANGED
];
function isRootHook(name) {
  return PAGE_HOOKS.indexOf(name) > -1;
}
const UniLifecycleHooks = [
  ON_SHOW,
  ON_HIDE,
  ON_LAUNCH,
  ON_ERROR,
  ON_THEME_CHANGE,
  ON_PAGE_NOT_FOUND,
  ON_UNHANDLE_REJECTION,
  ON_INIT,
  ON_LOAD,
  ON_READY,
  ON_UNLOAD,
  ON_RESIZE,
  ON_BACK_PRESS,
  ON_PAGE_SCROLL,
  ON_TAB_ITEM_TAP,
  ON_REACH_BOTTOM,
  ON_PULL_DOWN_REFRESH,
  ON_SHARE_TIMELINE,
  ON_ADD_TO_FAVORITES,
  ON_SHARE_APP_MESSAGE,
  ON_SAVE_EXIT_STATE,
  ON_NAVIGATION_BAR_BUTTON_TAP,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CLICKED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CHANGED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CONFIRMED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_FOCUS_CHANGED
];
const MINI_PROGRAM_PAGE_RUNTIME_HOOKS = /* @__PURE__ */ (() => {
  return {
    onPageScroll: 1,
    onShareAppMessage: 1 << 1,
    onShareTimeline: 1 << 2
  };
})();
let vueApp;
const createVueAppHooks = [];
function onCreateVueApp(hook) {
  if (vueApp) {
    return hook(vueApp);
  }
  createVueAppHooks.push(hook);
}
function invokeCreateVueAppHook(app) {
  vueApp = app;
  createVueAppHooks.forEach((hook) => hook(app));
}
const E = function() {
};
E.prototype = {
  on: function(name, callback, ctx) {
    var e2 = this.e || (this.e = {});
    (e2[name] || (e2[name] = [])).push({
      fn: callback,
      ctx
    });
    return this;
  },
  once: function(name, callback, ctx) {
    var self2 = this;
    function listener() {
      self2.off(name, listener);
      callback.apply(ctx, arguments);
    }
    listener._ = callback;
    return this.on(name, listener, ctx);
  },
  emit: function(name) {
    var data = [].slice.call(arguments, 1);
    var evtArr = ((this.e || (this.e = {}))[name] || []).slice();
    var i = 0;
    var len = evtArr.length;
    for (i; i < len; i++) {
      evtArr[i].fn.apply(evtArr[i].ctx, data);
    }
    return this;
  },
  off: function(name, callback) {
    var e2 = this.e || (this.e = {});
    var evts = e2[name];
    var liveEvents = [];
    if (evts && callback) {
      for (var i = 0, len = evts.length; i < len; i++) {
        if (evts[i].fn !== callback && evts[i].fn._ !== callback)
          liveEvents.push(evts[i]);
      }
    }
    liveEvents.length ? e2[name] = liveEvents : delete e2[name];
    return this;
  }
};
var E$1 = E;
const LOCALE_ZH_HANS = "zh-Hans";
const LOCALE_ZH_HANT = "zh-Hant";
const LOCALE_EN = "en";
const LOCALE_FR = "fr";
const LOCALE_ES = "es";
function include(str, parts) {
  return !!parts.find((part) => str.indexOf(part) !== -1);
}
function startsWith(str, parts) {
  return parts.find((part) => str.indexOf(part) === 0);
}
function normalizeLocale(locale, messages) {
  if (!locale) {
    return;
  }
  locale = locale.trim().replace(/_/g, "-");
  if (messages && messages[locale]) {
    return locale;
  }
  locale = locale.toLowerCase();
  if (locale === "chinese") {
    return LOCALE_ZH_HANS;
  }
  if (locale.indexOf("zh") === 0) {
    if (locale.indexOf("-hans") > -1) {
      return LOCALE_ZH_HANS;
    }
    if (locale.indexOf("-hant") > -1) {
      return LOCALE_ZH_HANT;
    }
    if (include(locale, ["-tw", "-hk", "-mo", "-cht"])) {
      return LOCALE_ZH_HANT;
    }
    return LOCALE_ZH_HANS;
  }
  const lang = startsWith(locale, [LOCALE_EN, LOCALE_FR, LOCALE_ES]);
  if (lang) {
    return lang;
  }
}
function getBaseSystemInfo() {
  return wx.getSystemInfoSync();
}
function validateProtocolFail(name, msg) {
  console.warn(`${name}: ${msg}`);
}
function validateProtocol(name, data, protocol, onFail) {
  if (!onFail) {
    onFail = validateProtocolFail;
  }
  for (const key in protocol) {
    const errMsg = validateProp$1(key, data[key], protocol[key], !hasOwn(data, key));
    if (isString(errMsg)) {
      onFail(name, errMsg);
    }
  }
}
function validateProtocols(name, args, protocol, onFail) {
  if (!protocol) {
    return;
  }
  if (!isArray(protocol)) {
    return validateProtocol(name, args[0] || /* @__PURE__ */ Object.create(null), protocol, onFail);
  }
  const len = protocol.length;
  const argsLen = args.length;
  for (let i = 0; i < len; i++) {
    const opts = protocol[i];
    const data = /* @__PURE__ */ Object.create(null);
    if (argsLen > i) {
      data[opts.name] = args[i];
    }
    validateProtocol(name, data, { [opts.name]: opts }, onFail);
  }
}
function validateProp$1(name, value, prop, isAbsent) {
  if (!isPlainObject(prop)) {
    prop = { type: prop };
  }
  const { type, required, validator } = prop;
  if (required && isAbsent) {
    return 'Missing required args: "' + name + '"';
  }
  if (value == null && !required) {
    return;
  }
  if (type != null) {
    let isValid = false;
    const types = isArray(type) ? type : [type];
    const expectedTypes = [];
    for (let i = 0; i < types.length && !isValid; i++) {
      const { valid, expectedType } = assertType$1(value, types[i]);
      expectedTypes.push(expectedType || "");
      isValid = valid;
    }
    if (!isValid) {
      return getInvalidTypeMessage$1(name, value, expectedTypes);
    }
  }
  if (validator) {
    return validator(value);
  }
}
const isSimpleType$1 = /* @__PURE__ */ makeMap("String,Number,Boolean,Function,Symbol");
function assertType$1(value, type) {
  let valid;
  const expectedType = getType$1(type);
  if (isSimpleType$1(expectedType)) {
    const t = typeof value;
    valid = t === expectedType.toLowerCase();
    if (!valid && t === "object") {
      valid = value instanceof type;
    }
  } else if (expectedType === "Object") {
    valid = isObject(value);
  } else if (expectedType === "Array") {
    valid = isArray(value);
  } else {
    {
      valid = value instanceof type;
    }
  }
  return {
    valid,
    expectedType
  };
}
function getInvalidTypeMessage$1(name, value, expectedTypes) {
  let message = `Invalid args: type check failed for args "${name}". Expected ${expectedTypes.map(capitalize).join(", ")}`;
  const expectedType = expectedTypes[0];
  const receivedType = toRawType(value);
  const expectedValue = styleValue$1(value, expectedType);
  const receivedValue = styleValue$1(value, receivedType);
  if (expectedTypes.length === 1 && isExplicable$1(expectedType) && !isBoolean$1(expectedType, receivedType)) {
    message += ` with value ${expectedValue}`;
  }
  message += `, got ${receivedType} `;
  if (isExplicable$1(receivedType)) {
    message += `with value ${receivedValue}.`;
  }
  return message;
}
function getType$1(ctor) {
  const match = ctor && ctor.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : "";
}
function styleValue$1(value, type) {
  if (type === "String") {
    return `"${value}"`;
  } else if (type === "Number") {
    return `${Number(value)}`;
  } else {
    return `${value}`;
  }
}
function isExplicable$1(type) {
  const explicitTypes = ["string", "number", "boolean"];
  return explicitTypes.some((elem) => type.toLowerCase() === elem);
}
function isBoolean$1(...args) {
  return args.some((elem) => elem.toLowerCase() === "boolean");
}
function tryCatch(fn) {
  return function() {
    try {
      return fn.apply(fn, arguments);
    } catch (e2) {
      console.error(e2);
    }
  };
}
let invokeCallbackId = 1;
const invokeCallbacks = {};
function addInvokeCallback(id, name, callback, keepAlive = false) {
  invokeCallbacks[id] = {
    name,
    keepAlive,
    callback
  };
  return id;
}
function invokeCallback(id, res, extras) {
  if (typeof id === "number") {
    const opts = invokeCallbacks[id];
    if (opts) {
      if (!opts.keepAlive) {
        delete invokeCallbacks[id];
      }
      return opts.callback(res, extras);
    }
  }
  return res;
}
const API_SUCCESS = "success";
const API_FAIL = "fail";
const API_COMPLETE = "complete";
function getApiCallbacks(args) {
  const apiCallbacks = {};
  for (const name in args) {
    const fn = args[name];
    if (isFunction(fn)) {
      apiCallbacks[name] = tryCatch(fn);
      delete args[name];
    }
  }
  return apiCallbacks;
}
function normalizeErrMsg$1(errMsg, name) {
  if (!errMsg || errMsg.indexOf(":fail") === -1) {
    return name + ":ok";
  }
  return name + errMsg.substring(errMsg.indexOf(":fail"));
}
function createAsyncApiCallback(name, args = {}, { beforeAll, beforeSuccess } = {}) {
  if (!isPlainObject(args)) {
    args = {};
  }
  const { success, fail, complete } = getApiCallbacks(args);
  const hasSuccess = isFunction(success);
  const hasFail = isFunction(fail);
  const hasComplete = isFunction(complete);
  const callbackId = invokeCallbackId++;
  addInvokeCallback(callbackId, name, (res) => {
    res = res || {};
    res.errMsg = normalizeErrMsg$1(res.errMsg, name);
    isFunction(beforeAll) && beforeAll(res);
    if (res.errMsg === name + ":ok") {
      isFunction(beforeSuccess) && beforeSuccess(res, args);
      hasSuccess && success(res);
    } else {
      hasFail && fail(res);
    }
    hasComplete && complete(res);
  });
  return callbackId;
}
const HOOK_SUCCESS = "success";
const HOOK_FAIL = "fail";
const HOOK_COMPLETE = "complete";
const globalInterceptors = {};
const scopedInterceptors = {};
function wrapperHook(hook) {
  return function(data) {
    return hook(data) || data;
  };
}
function queue$1(hooks, data) {
  let promise = false;
  for (let i = 0; i < hooks.length; i++) {
    const hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook));
    } else {
      const res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then() {
          },
          catch() {
          }
        };
      }
    }
  }
  return promise || {
    then(callback) {
      return callback(data);
    },
    catch() {
    }
  };
}
function wrapperOptions(interceptors2, options = {}) {
  [HOOK_SUCCESS, HOOK_FAIL, HOOK_COMPLETE].forEach((name) => {
    const hooks = interceptors2[name];
    if (!isArray(hooks)) {
      return;
    }
    const oldCallback = options[name];
    options[name] = function callbackInterceptor(res) {
      queue$1(hooks, res).then((res2) => {
        return isFunction(oldCallback) && oldCallback(res2) || res2;
      });
    };
  });
  return options;
}
function wrapperReturnValue(method, returnValue) {
  const returnValueHooks = [];
  if (isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push(...globalInterceptors.returnValue);
  }
  const interceptor = scopedInterceptors[method];
  if (interceptor && isArray(interceptor.returnValue)) {
    returnValueHooks.push(...interceptor.returnValue);
  }
  returnValueHooks.forEach((hook) => {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}
function getApiInterceptorHooks(method) {
  const interceptor = /* @__PURE__ */ Object.create(null);
  Object.keys(globalInterceptors).forEach((hook) => {
    if (hook !== "returnValue") {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  const scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach((hook) => {
      if (hook !== "returnValue") {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}
function invokeApi(method, api, options, params) {
  const interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (isArray(interceptor.invoke)) {
      const res = queue$1(interceptor.invoke, options);
      return res.then((options2) => {
        return api(wrapperOptions(interceptor, options2), ...params);
      });
    } else {
      return api(wrapperOptions(interceptor, options), ...params);
    }
  }
  return api(options, ...params);
}
function hasCallback(args) {
  if (isPlainObject(args) && [API_SUCCESS, API_FAIL, API_COMPLETE].find((cb) => isFunction(args[cb]))) {
    return true;
  }
  return false;
}
function handlePromise(promise) {
  return promise;
}
function promisify$1(name, fn) {
  return (args = {}, ...rest) => {
    if (hasCallback(args)) {
      return wrapperReturnValue(name, invokeApi(name, fn, args, rest));
    }
    return wrapperReturnValue(name, handlePromise(new Promise((resolve2, reject) => {
      invokeApi(name, fn, extend(args, { success: resolve2, fail: reject }), rest);
    })));
  };
}
function formatApiArgs(args, options) {
  const params = args[0];
  if (!options || !isPlainObject(options.formatArgs) && isPlainObject(params)) {
    return;
  }
  const formatArgs = options.formatArgs;
  const keys = Object.keys(formatArgs);
  for (let i = 0; i < keys.length; i++) {
    const name = keys[i];
    const formatterOrDefaultValue = formatArgs[name];
    if (isFunction(formatterOrDefaultValue)) {
      const errMsg = formatterOrDefaultValue(args[0][name], params);
      if (isString(errMsg)) {
        return errMsg;
      }
    } else {
      if (!hasOwn(params, name)) {
        params[name] = formatterOrDefaultValue;
      }
    }
  }
}
function invokeSuccess(id, name, res) {
  return invokeCallback(id, extend(res || {}, { errMsg: name + ":ok" }));
}
function invokeFail(id, name, errMsg, errRes) {
  return invokeCallback(id, extend({ errMsg: name + ":fail" + (errMsg ? " " + errMsg : "") }, errRes));
}
function beforeInvokeApi(name, args, protocol, options) {
  {
    validateProtocols(name, args, protocol);
  }
  if (options && options.beforeInvoke) {
    const errMsg2 = options.beforeInvoke(args);
    if (isString(errMsg2)) {
      return errMsg2;
    }
  }
  const errMsg = formatApiArgs(args, options);
  if (errMsg) {
    return errMsg;
  }
}
function normalizeErrMsg(errMsg) {
  if (!errMsg || isString(errMsg)) {
    return errMsg;
  }
  if (errMsg.stack) {
    console.error(errMsg.message + LINEFEED + errMsg.stack);
    return errMsg.message;
  }
  return errMsg;
}
function wrapperTaskApi(name, fn, protocol, options) {
  return (args) => {
    const id = createAsyncApiCallback(name, args, options);
    const errMsg = beforeInvokeApi(name, [args], protocol, options);
    if (errMsg) {
      return invokeFail(id, name, errMsg);
    }
    return fn(args, {
      resolve: (res) => invokeSuccess(id, name, res),
      reject: (errMsg2, errRes) => invokeFail(id, name, normalizeErrMsg(errMsg2), errRes)
    });
  };
}
function wrapperSyncApi(name, fn, protocol, options) {
  return (...args) => {
    const errMsg = beforeInvokeApi(name, args, protocol, options);
    if (errMsg) {
      throw new Error(errMsg);
    }
    return fn.apply(null, args);
  };
}
function wrapperAsyncApi(name, fn, protocol, options) {
  return wrapperTaskApi(name, fn, protocol, options);
}
function defineSyncApi(name, fn, protocol, options) {
  return wrapperSyncApi(name, fn, protocol, options);
}
function defineAsyncApi(name, fn, protocol, options) {
  return promisify$1(name, wrapperAsyncApi(name, fn, protocol, options));
}
const API_UPX2PX = "upx2px";
const Upx2pxProtocol = [
  {
    name: "upx",
    type: [Number, String],
    required: true
  }
];
const EPS = 1e-4;
const BASE_DEVICE_WIDTH = 750;
let isIOS = false;
let deviceWidth = 0;
let deviceDPR = 0;
function checkDeviceWidth() {
  const { platform, pixelRatio, windowWidth } = getBaseSystemInfo();
  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === "ios";
}
const upx2px = defineSyncApi(API_UPX2PX, (number, newDeviceWidth) => {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }
  number = Number(number);
  if (number === 0) {
    return 0;
  }
  let width = newDeviceWidth || deviceWidth;
  let result = number / BASE_DEVICE_WIDTH * width;
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}, Upx2pxProtocol);
const API_ADD_INTERCEPTOR = "addInterceptor";
const API_REMOVE_INTERCEPTOR = "removeInterceptor";
const AddInterceptorProtocol = [
  {
    name: "method",
    type: [String, Object],
    required: true
  }
];
const RemoveInterceptorProtocol = AddInterceptorProtocol;
function mergeInterceptorHook(interceptors2, interceptor) {
  Object.keys(interceptor).forEach((hook) => {
    if (isFunction(interceptor[hook])) {
      interceptors2[hook] = mergeHook(interceptors2[hook], interceptor[hook]);
    }
  });
}
function removeInterceptorHook(interceptors2, interceptor) {
  if (!interceptors2 || !interceptor) {
    return;
  }
  Object.keys(interceptor).forEach((name) => {
    const hooks = interceptors2[name];
    const hook = interceptor[name];
    if (isArray(hooks) && isFunction(hook)) {
      remove(hooks, hook);
    }
  });
}
function mergeHook(parentVal, childVal) {
  const res = childVal ? parentVal ? parentVal.concat(childVal) : isArray(childVal) ? childVal : [childVal] : parentVal;
  return res ? dedupeHooks(res) : res;
}
function dedupeHooks(hooks) {
  const res = [];
  for (let i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}
const addInterceptor = defineSyncApi(API_ADD_INTERCEPTOR, (method, interceptor) => {
  if (isString(method) && isPlainObject(interceptor)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), interceptor);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}, AddInterceptorProtocol);
const removeInterceptor = defineSyncApi(API_REMOVE_INTERCEPTOR, (method, interceptor) => {
  if (isString(method)) {
    if (isPlainObject(interceptor)) {
      removeInterceptorHook(scopedInterceptors[method], interceptor);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}, RemoveInterceptorProtocol);
const interceptors = {};
const API_ON = "$on";
const OnProtocol = [
  {
    name: "event",
    type: String,
    required: true
  },
  {
    name: "callback",
    type: Function,
    required: true
  }
];
const API_ONCE = "$once";
const OnceProtocol = OnProtocol;
const API_OFF = "$off";
const OffProtocol = [
  {
    name: "event",
    type: [String, Array]
  },
  {
    name: "callback",
    type: Function
  }
];
const API_EMIT = "$emit";
const EmitProtocol = [
  {
    name: "event",
    type: String,
    required: true
  }
];
const emitter = new E$1();
const $on = defineSyncApi(API_ON, (name, callback) => {
  emitter.on(name, callback);
  return () => emitter.off(name, callback);
}, OnProtocol);
const $once = defineSyncApi(API_ONCE, (name, callback) => {
  emitter.once(name, callback);
  return () => emitter.off(name, callback);
}, OnceProtocol);
const $off = defineSyncApi(API_OFF, (name, callback) => {
  if (!name) {
    emitter.e = {};
    return;
  }
  if (!isArray(name))
    name = [name];
  name.forEach((n) => emitter.off(n, callback));
}, OffProtocol);
const $emit = defineSyncApi(API_EMIT, (name, ...args) => {
  emitter.emit(name, ...args);
}, EmitProtocol);
let cid;
let cidErrMsg;
let enabled;
function normalizePushMessage(message) {
  try {
    return JSON.parse(message);
  } catch (e2) {
  }
  return message;
}
function invokePushCallback(args) {
  if (args.type === "enabled") {
    enabled = true;
  } else if (args.type === "clientId") {
    cid = args.cid;
    cidErrMsg = args.errMsg;
    invokeGetPushCidCallbacks(cid, args.errMsg);
  } else if (args.type === "pushMsg") {
    const message = {
      type: "receive",
      data: normalizePushMessage(args.message)
    };
    for (let i = 0; i < onPushMessageCallbacks.length; i++) {
      const callback = onPushMessageCallbacks[i];
      callback(message);
      if (message.stopped) {
        break;
      }
    }
  } else if (args.type === "click") {
    onPushMessageCallbacks.forEach((callback) => {
      callback({
        type: "click",
        data: normalizePushMessage(args.message)
      });
    });
  }
}
const getPushCidCallbacks = [];
function invokeGetPushCidCallbacks(cid2, errMsg) {
  getPushCidCallbacks.forEach((callback) => {
    callback(cid2, errMsg);
  });
  getPushCidCallbacks.length = 0;
}
const API_GET_PUSH_CLIENT_ID = "getPushClientId";
const getPushClientId = defineAsyncApi(API_GET_PUSH_CLIENT_ID, (_, { resolve: resolve2, reject }) => {
  Promise.resolve().then(() => {
    if (typeof enabled === "undefined") {
      enabled = false;
      cid = "";
      cidErrMsg = "uniPush is not enabled";
    }
    getPushCidCallbacks.push((cid2, errMsg) => {
      if (cid2) {
        resolve2({ cid: cid2 });
      } else {
        reject(errMsg);
      }
    });
    if (typeof cid !== "undefined") {
      invokeGetPushCidCallbacks(cid, cidErrMsg);
    }
  });
});
const onPushMessageCallbacks = [];
const onPushMessage = (fn) => {
  if (onPushMessageCallbacks.indexOf(fn) === -1) {
    onPushMessageCallbacks.push(fn);
  }
};
const offPushMessage = (fn) => {
  if (!fn) {
    onPushMessageCallbacks.length = 0;
  } else {
    const index2 = onPushMessageCallbacks.indexOf(fn);
    if (index2 > -1) {
      onPushMessageCallbacks.splice(index2, 1);
    }
  }
};
const SYNC_API_RE = /^\$|getLocale|setLocale|sendNativeEvent|restoreGlobal|requireGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64|getDeviceInfo|getAppBaseInfo|getWindowInfo|getSystemSetting|getAppAuthorizeSetting/;
const CONTEXT_API_RE = /^create|Manager$/;
const CONTEXT_API_RE_EXC = ["createBLEConnection"];
const ASYNC_API = ["createBLEConnection"];
const CALLBACK_API_RE = /^on|^off/;
function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}
function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== "onPush";
}
function shouldPromise(name) {
  if (isContextApi(name) || isSyncApi(name) || isCallbackApi(name)) {
    return false;
  }
  return true;
}
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function(onfinally) {
    const promise = this.constructor;
    return this.then((value) => promise.resolve(onfinally && onfinally()).then(() => value), (reason) => promise.resolve(onfinally && onfinally()).then(() => {
      throw reason;
    }));
  };
}
function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  if (!isFunction(api)) {
    return api;
  }
  return function promiseApi(options = {}, ...rest) {
    if (isFunction(options.success) || isFunction(options.fail) || isFunction(options.complete)) {
      return wrapperReturnValue(name, invokeApi(name, api, options, rest));
    }
    return wrapperReturnValue(name, handlePromise(new Promise((resolve2, reject) => {
      invokeApi(name, api, extend({}, options, {
        success: resolve2,
        fail: reject
      }), rest);
    })));
  };
}
const CALLBACKS = ["success", "fail", "cancel", "complete"];
function initWrapper(protocols2) {
  function processCallback(methodName, method, returnValue) {
    return function(res) {
      return method(processReturnValue(methodName, res, returnValue));
    };
  }
  function processArgs(methodName, fromArgs, argsOption = {}, returnValue = {}, keepFromArgs = false) {
    if (isPlainObject(fromArgs)) {
      const toArgs = keepFromArgs === true ? fromArgs : {};
      if (isFunction(argsOption)) {
        argsOption = argsOption(fromArgs, toArgs) || {};
      }
      for (const key in fromArgs) {
        if (hasOwn(argsOption, key)) {
          let keyOption = argsOption[key];
          if (isFunction(keyOption)) {
            keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
          }
          if (!keyOption) {
            console.warn(`\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F ${methodName} \u6682\u4E0D\u652F\u6301 ${key}`);
          } else if (isString(keyOption)) {
            toArgs[keyOption] = fromArgs[key];
          } else if (isPlainObject(keyOption)) {
            toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
          }
        } else if (CALLBACKS.indexOf(key) !== -1) {
          const callback = fromArgs[key];
          if (isFunction(callback)) {
            toArgs[key] = processCallback(methodName, callback, returnValue);
          }
        } else {
          if (!keepFromArgs && !hasOwn(toArgs, key)) {
            toArgs[key] = fromArgs[key];
          }
        }
      }
      return toArgs;
    } else if (isFunction(fromArgs)) {
      fromArgs = processCallback(methodName, fromArgs, returnValue);
    }
    return fromArgs;
  }
  function processReturnValue(methodName, res, returnValue, keepReturnValue = false) {
    if (isFunction(protocols2.returnValue)) {
      res = protocols2.returnValue(methodName, res);
    }
    return processArgs(methodName, res, returnValue, {}, keepReturnValue);
  }
  return function wrapper(methodName, method) {
    if (!hasOwn(protocols2, methodName)) {
      return method;
    }
    const protocol = protocols2[methodName];
    if (!protocol) {
      return function() {
        console.error(`\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F \u6682\u4E0D\u652F\u6301${methodName}`);
      };
    }
    return function(arg1, arg2) {
      let options = protocol;
      if (isFunction(protocol)) {
        options = protocol(arg1);
      }
      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);
      const args = [arg1];
      if (typeof arg2 !== "undefined") {
        args.push(arg2);
      }
      const returnValue = wx[options.name || methodName].apply(wx, args);
      if (isSyncApi(methodName)) {
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  };
}
const getLocale = () => {
  const app = getApp({ allowDefault: true });
  if (app && app.$vm) {
    return app.$vm.$locale;
  }
  return normalizeLocale(wx.getSystemInfoSync().language) || LOCALE_EN;
};
const setLocale = (locale) => {
  const app = getApp();
  if (!app) {
    return false;
  }
  const oldLocale = app.$vm.$locale;
  if (oldLocale !== locale) {
    app.$vm.$locale = locale;
    onLocaleChangeCallbacks.forEach((fn) => fn({ locale }));
    return true;
  }
  return false;
};
const onLocaleChangeCallbacks = [];
const onLocaleChange = (fn) => {
  if (onLocaleChangeCallbacks.indexOf(fn) === -1) {
    onLocaleChangeCallbacks.push(fn);
  }
};
if (typeof global !== "undefined") {
  global.getLocale = getLocale;
}
const baseApis = {
  $on,
  $off,
  $once,
  $emit,
  upx2px,
  interceptors,
  addInterceptor,
  removeInterceptor,
  onCreateVueApp,
  invokeCreateVueAppHook,
  getLocale,
  setLocale,
  onLocaleChange,
  getPushClientId,
  onPushMessage,
  offPushMessage,
  invokePushCallback
};
function initUni(api, protocols2) {
  const wrapper = initWrapper(protocols2);
  const UniProxyHandlers = {
    get(target, key) {
      if (hasOwn(target, key)) {
        return target[key];
      }
      if (hasOwn(api, key)) {
        return promisify(key, api[key]);
      }
      if (hasOwn(baseApis, key)) {
        return promisify(key, baseApis[key]);
      }
      return promisify(key, wrapper(key, wx[key]));
    }
  };
  return new Proxy({}, UniProxyHandlers);
}
function initGetProvider(providers) {
  return function getProvider2({ service, success, fail, complete }) {
    let res;
    if (providers[service]) {
      res = {
        errMsg: "getProvider:ok",
        service,
        provider: providers[service]
      };
      isFunction(success) && success(res);
    } else {
      res = {
        errMsg: "getProvider:fail:\u670D\u52A1[" + service + "]\u4E0D\u5B58\u5728"
      };
      isFunction(fail) && fail(res);
    }
    isFunction(complete) && complete(res);
  };
}
const UUID_KEY = "__DC_STAT_UUID";
let deviceId;
function useDeviceId(global2 = wx) {
  return function addDeviceId(_, toRes) {
    deviceId = deviceId || global2.getStorageSync(UUID_KEY);
    if (!deviceId) {
      deviceId = Date.now() + "" + Math.floor(Math.random() * 1e7);
      wx.setStorage({
        key: UUID_KEY,
        data: deviceId
      });
    }
    toRes.deviceId = deviceId;
  };
}
function addSafeAreaInsets(fromRes, toRes) {
  if (fromRes.safeArea) {
    const safeArea = fromRes.safeArea;
    toRes.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: fromRes.windowWidth - safeArea.right,
      bottom: fromRes.screenHeight - safeArea.bottom
    };
  }
}
function populateParameters(fromRes, toRes) {
  const { brand = "", model = "", system = "", language = "", theme, version: version2, platform, fontSizeSetting, SDKVersion, pixelRatio, deviceOrientation } = fromRes;
  let osName = "";
  let osVersion = "";
  {
    osName = system.split(" ")[0] || "";
    osVersion = system.split(" ")[1] || "";
  }
  let hostVersion = version2;
  let deviceType = getGetDeviceType(fromRes, model);
  let deviceBrand = getDeviceBrand(brand);
  let _hostName = getHostName(fromRes);
  let _deviceOrientation = deviceOrientation;
  let _devicePixelRatio = pixelRatio;
  let _SDKVersion = SDKVersion;
  const hostLanguage = language.replace(/_/g, "-");
  const parameters = {
    appId: "__UNI__250724A",
    appName: "\u65B0\u5BB6\u9080\u8BF7\u51FD",
    appVersion: "1.0.0",
    appVersionCode: "100",
    appLanguage: getAppLanguage(hostLanguage),
    uniCompileVersion: "3.6.4",
    uniRuntimeVersion: "3.6.4",
    uniPlatform: "mp-weixin",
    deviceBrand,
    deviceModel: model,
    deviceType,
    devicePixelRatio: _devicePixelRatio,
    deviceOrientation: _deviceOrientation,
    osName: osName.toLocaleLowerCase(),
    osVersion,
    hostTheme: theme,
    hostVersion,
    hostLanguage,
    hostName: _hostName,
    hostSDKVersion: _SDKVersion,
    hostFontSizeSetting: fontSizeSetting,
    windowTop: 0,
    windowBottom: 0,
    osLanguage: void 0,
    osTheme: void 0,
    ua: void 0,
    hostPackageName: void 0,
    browserName: void 0,
    browserVersion: void 0
  };
  extend(toRes, parameters);
}
function getGetDeviceType(fromRes, model) {
  let deviceType = fromRes.deviceType || "phone";
  {
    const deviceTypeMaps = {
      ipad: "pad",
      windows: "pc",
      mac: "pc"
    };
    const deviceTypeMapsKeys = Object.keys(deviceTypeMaps);
    const _model = model.toLocaleLowerCase();
    for (let index2 = 0; index2 < deviceTypeMapsKeys.length; index2++) {
      const _m = deviceTypeMapsKeys[index2];
      if (_model.indexOf(_m) !== -1) {
        deviceType = deviceTypeMaps[_m];
        break;
      }
    }
  }
  return deviceType;
}
function getDeviceBrand(brand) {
  let deviceBrand = brand;
  if (deviceBrand) {
    deviceBrand = deviceBrand.toLocaleLowerCase();
  }
  return deviceBrand;
}
function getAppLanguage(defaultLanguage) {
  return getLocale ? getLocale() : defaultLanguage;
}
function getHostName(fromRes) {
  const _platform = "WeChat";
  let _hostName = fromRes.hostName || _platform;
  {
    if (fromRes.environment) {
      _hostName = fromRes.environment;
    } else if (fromRes.host && fromRes.host.env) {
      _hostName = fromRes.host.env;
    }
  }
  return _hostName;
}
const getSystemInfo = {
  returnValue: (fromRes, toRes) => {
    addSafeAreaInsets(fromRes, toRes);
    useDeviceId()(fromRes, toRes);
    populateParameters(fromRes, toRes);
  }
};
const getSystemInfoSync = getSystemInfo;
const redirectTo = {};
const previewImage = {
  args(fromArgs, toArgs) {
    let currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    const urls = fromArgs.urls;
    if (!isArray(urls)) {
      return;
    }
    const len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      toArgs.current = urls[currentIndex];
      toArgs.urls = urls.filter((item, index2) => index2 < currentIndex ? item !== urls[currentIndex] : true);
    } else {
      toArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false
    };
  }
};
const showActionSheet = {
  args(fromArgs, toArgs) {
    toArgs.alertText = fromArgs.title;
  }
};
const getDeviceInfo = {
  returnValue: (fromRes, toRes) => {
    const { brand, model } = fromRes;
    let deviceType = getGetDeviceType(fromRes, model);
    let deviceBrand = getDeviceBrand(brand);
    useDeviceId()(fromRes, toRes);
    toRes = sortObject(extend(toRes, {
      deviceType,
      deviceBrand,
      deviceModel: model
    }));
  }
};
const getAppBaseInfo = {
  returnValue: (fromRes, toRes) => {
    const { version: version2, language, SDKVersion, theme } = fromRes;
    let _hostName = getHostName(fromRes);
    let hostLanguage = language.replace(/_/g, "-");
    toRes = sortObject(extend(toRes, {
      hostVersion: version2,
      hostLanguage,
      hostName: _hostName,
      hostSDKVersion: SDKVersion,
      hostTheme: theme,
      appId: "__UNI__250724A",
      appName: "\u65B0\u5BB6\u9080\u8BF7\u51FD",
      appVersion: "1.0.0",
      appVersionCode: "100",
      appLanguage: getAppLanguage(hostLanguage)
    }));
  }
};
const getWindowInfo = {
  returnValue: (fromRes, toRes) => {
    addSafeAreaInsets(fromRes, toRes);
    toRes = sortObject(extend(toRes, {
      windowTop: 0,
      windowBottom: 0
    }));
  }
};
const getAppAuthorizeSetting = {
  returnValue: function(fromRes, toRes) {
    const { locationReducedAccuracy } = fromRes;
    toRes.locationAccuracy = "unsupported";
    if (locationReducedAccuracy === true) {
      toRes.locationAccuracy = "reduced";
    } else if (locationReducedAccuracy === false) {
      toRes.locationAccuracy = "full";
    }
  }
};
const mocks$1 = ["__route__", "__wxExparserNodeId__", "__wxWebviewId__"];
const getProvider = initGetProvider({
  oauth: ["weixin"],
  share: ["weixin"],
  payment: ["wxpay"],
  push: ["weixin"]
});
function initComponentMocks(component) {
  const res = /* @__PURE__ */ Object.create(null);
  mocks$1.forEach((name) => {
    res[name] = component[name];
  });
  return res;
}
function createSelectorQuery() {
  const query = wx.createSelectorQuery();
  const oldIn = query.in;
  query.in = function newIn(component) {
    return oldIn.call(this, initComponentMocks(component));
  };
  return query;
}
var shims = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  getProvider,
  createSelectorQuery
});
var protocols = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  redirectTo,
  previewImage,
  getSystemInfo,
  getSystemInfoSync,
  showActionSheet,
  getDeviceInfo,
  getAppBaseInfo,
  getWindowInfo,
  getAppAuthorizeSetting
});
var index = initUni(shims, protocols);
function warn(msg, ...args) {
  console.warn(`[Vue warn] ${msg}`, ...args);
}
let activeEffectScope;
class EffectScope {
  constructor(detached = false) {
    this.active = true;
    this.effects = [];
    this.cleanups = [];
    if (!detached && activeEffectScope) {
      this.parent = activeEffectScope;
      this.index = (activeEffectScope.scopes || (activeEffectScope.scopes = [])).push(this) - 1;
    }
  }
  run(fn) {
    if (this.active) {
      const currentEffectScope = activeEffectScope;
      try {
        activeEffectScope = this;
        return fn();
      } finally {
        activeEffectScope = currentEffectScope;
      }
    } else {
      warn(`cannot run an inactive effect scope.`);
    }
  }
  on() {
    activeEffectScope = this;
  }
  off() {
    activeEffectScope = this.parent;
  }
  stop(fromParent) {
    if (this.active) {
      let i, l;
      for (i = 0, l = this.effects.length; i < l; i++) {
        this.effects[i].stop();
      }
      for (i = 0, l = this.cleanups.length; i < l; i++) {
        this.cleanups[i]();
      }
      if (this.scopes) {
        for (i = 0, l = this.scopes.length; i < l; i++) {
          this.scopes[i].stop(true);
        }
      }
      if (this.parent && !fromParent) {
        const last = this.parent.scopes.pop();
        if (last && last !== this) {
          this.parent.scopes[this.index] = last;
          last.index = this.index;
        }
      }
      this.active = false;
    }
  }
}
function recordEffectScope(effect, scope = activeEffectScope) {
  if (scope && scope.active) {
    scope.effects.push(effect);
  }
}
const createDep = (effects) => {
  const dep = new Set(effects);
  dep.w = 0;
  dep.n = 0;
  return dep;
};
const wasTracked = (dep) => (dep.w & trackOpBit) > 0;
const newTracked = (dep) => (dep.n & trackOpBit) > 0;
const initDepMarkers = ({ deps }) => {
  if (deps.length) {
    for (let i = 0; i < deps.length; i++) {
      deps[i].w |= trackOpBit;
    }
  }
};
const finalizeDepMarkers = (effect) => {
  const { deps } = effect;
  if (deps.length) {
    let ptr = 0;
    for (let i = 0; i < deps.length; i++) {
      const dep = deps[i];
      if (wasTracked(dep) && !newTracked(dep)) {
        dep.delete(effect);
      } else {
        deps[ptr++] = dep;
      }
      dep.w &= ~trackOpBit;
      dep.n &= ~trackOpBit;
    }
    deps.length = ptr;
  }
};
const targetMap = /* @__PURE__ */ new WeakMap();
let effectTrackDepth = 0;
let trackOpBit = 1;
const maxMarkerBits = 30;
let activeEffect;
const ITERATE_KEY = Symbol("iterate");
const MAP_KEY_ITERATE_KEY = Symbol("Map key iterate");
class ReactiveEffect {
  constructor(fn, scheduler = null, scope) {
    this.fn = fn;
    this.scheduler = scheduler;
    this.active = true;
    this.deps = [];
    this.parent = void 0;
    recordEffectScope(this, scope);
  }
  run() {
    if (!this.active) {
      return this.fn();
    }
    let parent = activeEffect;
    let lastShouldTrack = shouldTrack;
    while (parent) {
      if (parent === this) {
        return;
      }
      parent = parent.parent;
    }
    try {
      this.parent = activeEffect;
      activeEffect = this;
      shouldTrack = true;
      trackOpBit = 1 << ++effectTrackDepth;
      if (effectTrackDepth <= maxMarkerBits) {
        initDepMarkers(this);
      } else {
        cleanupEffect(this);
      }
      return this.fn();
    } finally {
      if (effectTrackDepth <= maxMarkerBits) {
        finalizeDepMarkers(this);
      }
      trackOpBit = 1 << --effectTrackDepth;
      activeEffect = this.parent;
      shouldTrack = lastShouldTrack;
      this.parent = void 0;
      if (this.deferStop) {
        this.stop();
      }
    }
  }
  stop() {
    if (activeEffect === this) {
      this.deferStop = true;
    } else if (this.active) {
      cleanupEffect(this);
      if (this.onStop) {
        this.onStop();
      }
      this.active = false;
    }
  }
}
function cleanupEffect(effect) {
  const { deps } = effect;
  if (deps.length) {
    for (let i = 0; i < deps.length; i++) {
      deps[i].delete(effect);
    }
    deps.length = 0;
  }
}
let shouldTrack = true;
const trackStack = [];
function pauseTracking() {
  trackStack.push(shouldTrack);
  shouldTrack = false;
}
function resetTracking() {
  const last = trackStack.pop();
  shouldTrack = last === void 0 ? true : last;
}
function track(target, type, key) {
  if (shouldTrack && activeEffect) {
    let depsMap = targetMap.get(target);
    if (!depsMap) {
      targetMap.set(target, depsMap = /* @__PURE__ */ new Map());
    }
    let dep = depsMap.get(key);
    if (!dep) {
      depsMap.set(key, dep = createDep());
    }
    const eventInfo = { effect: activeEffect, target, type, key };
    trackEffects(dep, eventInfo);
  }
}
function trackEffects(dep, debuggerEventExtraInfo) {
  let shouldTrack2 = false;
  if (effectTrackDepth <= maxMarkerBits) {
    if (!newTracked(dep)) {
      dep.n |= trackOpBit;
      shouldTrack2 = !wasTracked(dep);
    }
  } else {
    shouldTrack2 = !dep.has(activeEffect);
  }
  if (shouldTrack2) {
    dep.add(activeEffect);
    activeEffect.deps.push(dep);
    if (activeEffect.onTrack) {
      activeEffect.onTrack(Object.assign({ effect: activeEffect }, debuggerEventExtraInfo));
    }
  }
}
function trigger(target, type, key, newValue, oldValue, oldTarget) {
  const depsMap = targetMap.get(target);
  if (!depsMap) {
    return;
  }
  let deps = [];
  if (type === "clear") {
    deps = [...depsMap.values()];
  } else if (key === "length" && isArray(target)) {
    depsMap.forEach((dep, key2) => {
      if (key2 === "length" || key2 >= newValue) {
        deps.push(dep);
      }
    });
  } else {
    if (key !== void 0) {
      deps.push(depsMap.get(key));
    }
    switch (type) {
      case "add":
        if (!isArray(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
          if (isMap(target)) {
            deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
          }
        } else if (isIntegerKey(key)) {
          deps.push(depsMap.get("length"));
        }
        break;
      case "delete":
        if (!isArray(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
          if (isMap(target)) {
            deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
          }
        }
        break;
      case "set":
        if (isMap(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
        }
        break;
    }
  }
  const eventInfo = { target, type, key, newValue, oldValue, oldTarget };
  if (deps.length === 1) {
    if (deps[0]) {
      {
        triggerEffects(deps[0], eventInfo);
      }
    }
  } else {
    const effects = [];
    for (const dep of deps) {
      if (dep) {
        effects.push(...dep);
      }
    }
    {
      triggerEffects(createDep(effects), eventInfo);
    }
  }
}
function triggerEffects(dep, debuggerEventExtraInfo) {
  const effects = isArray(dep) ? dep : [...dep];
  for (const effect of effects) {
    if (effect.computed) {
      triggerEffect(effect, debuggerEventExtraInfo);
    }
  }
  for (const effect of effects) {
    if (!effect.computed) {
      triggerEffect(effect, debuggerEventExtraInfo);
    }
  }
}
function triggerEffect(effect, debuggerEventExtraInfo) {
  if (effect !== activeEffect || effect.allowRecurse) {
    if (effect.onTrigger) {
      effect.onTrigger(extend({ effect }, debuggerEventExtraInfo));
    }
    if (effect.scheduler) {
      effect.scheduler();
    } else {
      effect.run();
    }
  }
}
const isNonTrackableKeys = /* @__PURE__ */ makeMap(`__proto__,__v_isRef,__isVue`);
const builtInSymbols = new Set(/* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((key) => key !== "arguments" && key !== "caller").map((key) => Symbol[key]).filter(isSymbol));
const get = /* @__PURE__ */ createGetter();
const shallowGet = /* @__PURE__ */ createGetter(false, true);
const readonlyGet = /* @__PURE__ */ createGetter(true);
const shallowReadonlyGet = /* @__PURE__ */ createGetter(true, true);
const arrayInstrumentations = /* @__PURE__ */ createArrayInstrumentations();
function createArrayInstrumentations() {
  const instrumentations = {};
  ["includes", "indexOf", "lastIndexOf"].forEach((key) => {
    instrumentations[key] = function(...args) {
      const arr = toRaw(this);
      for (let i = 0, l = this.length; i < l; i++) {
        track(arr, "get", i + "");
      }
      const res = arr[key](...args);
      if (res === -1 || res === false) {
        return arr[key](...args.map(toRaw));
      } else {
        return res;
      }
    };
  });
  ["push", "pop", "shift", "unshift", "splice"].forEach((key) => {
    instrumentations[key] = function(...args) {
      pauseTracking();
      const res = toRaw(this)[key].apply(this, args);
      resetTracking();
      return res;
    };
  });
  return instrumentations;
}
function createGetter(isReadonly2 = false, shallow = false) {
  return function get2(target, key, receiver) {
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_isShallow") {
      return shallow;
    } else if (key === "__v_raw" && receiver === (isReadonly2 ? shallow ? shallowReadonlyMap : readonlyMap : shallow ? shallowReactiveMap : reactiveMap).get(target)) {
      return target;
    }
    const targetIsArray = isArray(target);
    if (!isReadonly2 && targetIsArray && hasOwn(arrayInstrumentations, key)) {
      return Reflect.get(arrayInstrumentations, key, receiver);
    }
    const res = Reflect.get(target, key, receiver);
    if (isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) {
      return res;
    }
    if (!isReadonly2) {
      track(target, "get", key);
    }
    if (shallow) {
      return res;
    }
    if (isRef(res)) {
      return targetIsArray && isIntegerKey(key) ? res : res.value;
    }
    if (isObject(res)) {
      return isReadonly2 ? readonly(res) : reactive(res);
    }
    return res;
  };
}
const set$1 = /* @__PURE__ */ createSetter();
const shallowSet = /* @__PURE__ */ createSetter(true);
function createSetter(shallow = false) {
  return function set2(target, key, value, receiver) {
    let oldValue = target[key];
    if (isReadonly(oldValue) && isRef(oldValue) && !isRef(value)) {
      return false;
    }
    if (!shallow && !isReadonly(value)) {
      if (!isShallow(value)) {
        value = toRaw(value);
        oldValue = toRaw(oldValue);
      }
      if (!isArray(target) && isRef(oldValue) && !isRef(value)) {
        oldValue.value = value;
        return true;
      }
    }
    const hadKey = isArray(target) && isIntegerKey(key) ? Number(key) < target.length : hasOwn(target, key);
    const result = Reflect.set(target, key, value, receiver);
    if (target === toRaw(receiver)) {
      if (!hadKey) {
        trigger(target, "add", key, value);
      } else if (hasChanged(value, oldValue)) {
        trigger(target, "set", key, value, oldValue);
      }
    }
    return result;
  };
}
function deleteProperty(target, key) {
  const hadKey = hasOwn(target, key);
  const oldValue = target[key];
  const result = Reflect.deleteProperty(target, key);
  if (result && hadKey) {
    trigger(target, "delete", key, void 0, oldValue);
  }
  return result;
}
function has(target, key) {
  const result = Reflect.has(target, key);
  if (!isSymbol(key) || !builtInSymbols.has(key)) {
    track(target, "has", key);
  }
  return result;
}
function ownKeys(target) {
  track(target, "iterate", isArray(target) ? "length" : ITERATE_KEY);
  return Reflect.ownKeys(target);
}
const mutableHandlers = {
  get,
  set: set$1,
  deleteProperty,
  has,
  ownKeys
};
const readonlyHandlers = {
  get: readonlyGet,
  set(target, key) {
    {
      warn(`Set operation on key "${String(key)}" failed: target is readonly.`, target);
    }
    return true;
  },
  deleteProperty(target, key) {
    {
      warn(`Delete operation on key "${String(key)}" failed: target is readonly.`, target);
    }
    return true;
  }
};
const shallowReactiveHandlers = /* @__PURE__ */ extend({}, mutableHandlers, {
  get: shallowGet,
  set: shallowSet
});
const shallowReadonlyHandlers = /* @__PURE__ */ extend({}, readonlyHandlers, {
  get: shallowReadonlyGet
});
const toShallow = (value) => value;
const getProto = (v) => Reflect.getPrototypeOf(v);
function get$1(target, key, isReadonly2 = false, isShallow2 = false) {
  target = target["__v_raw"];
  const rawTarget = toRaw(target);
  const rawKey = toRaw(key);
  if (!isReadonly2) {
    if (key !== rawKey) {
      track(rawTarget, "get", key);
    }
    track(rawTarget, "get", rawKey);
  }
  const { has: has2 } = getProto(rawTarget);
  const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
  if (has2.call(rawTarget, key)) {
    return wrap(target.get(key));
  } else if (has2.call(rawTarget, rawKey)) {
    return wrap(target.get(rawKey));
  } else if (target !== rawTarget) {
    target.get(key);
  }
}
function has$1(key, isReadonly2 = false) {
  const target = this["__v_raw"];
  const rawTarget = toRaw(target);
  const rawKey = toRaw(key);
  if (!isReadonly2) {
    if (key !== rawKey) {
      track(rawTarget, "has", key);
    }
    track(rawTarget, "has", rawKey);
  }
  return key === rawKey ? target.has(key) : target.has(key) || target.has(rawKey);
}
function size(target, isReadonly2 = false) {
  target = target["__v_raw"];
  !isReadonly2 && track(toRaw(target), "iterate", ITERATE_KEY);
  return Reflect.get(target, "size", target);
}
function add(value) {
  value = toRaw(value);
  const target = toRaw(this);
  const proto = getProto(target);
  const hadKey = proto.has.call(target, value);
  if (!hadKey) {
    target.add(value);
    trigger(target, "add", value, value);
  }
  return this;
}
function set$1$1(key, value) {
  value = toRaw(value);
  const target = toRaw(this);
  const { has: has2, get: get2 } = getProto(target);
  let hadKey = has2.call(target, key);
  if (!hadKey) {
    key = toRaw(key);
    hadKey = has2.call(target, key);
  } else {
    checkIdentityKeys(target, has2, key);
  }
  const oldValue = get2.call(target, key);
  target.set(key, value);
  if (!hadKey) {
    trigger(target, "add", key, value);
  } else if (hasChanged(value, oldValue)) {
    trigger(target, "set", key, value, oldValue);
  }
  return this;
}
function deleteEntry(key) {
  const target = toRaw(this);
  const { has: has2, get: get2 } = getProto(target);
  let hadKey = has2.call(target, key);
  if (!hadKey) {
    key = toRaw(key);
    hadKey = has2.call(target, key);
  } else {
    checkIdentityKeys(target, has2, key);
  }
  const oldValue = get2 ? get2.call(target, key) : void 0;
  const result = target.delete(key);
  if (hadKey) {
    trigger(target, "delete", key, void 0, oldValue);
  }
  return result;
}
function clear() {
  const target = toRaw(this);
  const hadItems = target.size !== 0;
  const oldTarget = isMap(target) ? new Map(target) : new Set(target);
  const result = target.clear();
  if (hadItems) {
    trigger(target, "clear", void 0, void 0, oldTarget);
  }
  return result;
}
function createForEach(isReadonly2, isShallow2) {
  return function forEach(callback, thisArg) {
    const observed = this;
    const target = observed["__v_raw"];
    const rawTarget = toRaw(target);
    const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
    !isReadonly2 && track(rawTarget, "iterate", ITERATE_KEY);
    return target.forEach((value, key) => {
      return callback.call(thisArg, wrap(value), wrap(key), observed);
    });
  };
}
function createIterableMethod(method, isReadonly2, isShallow2) {
  return function(...args) {
    const target = this["__v_raw"];
    const rawTarget = toRaw(target);
    const targetIsMap = isMap(rawTarget);
    const isPair = method === "entries" || method === Symbol.iterator && targetIsMap;
    const isKeyOnly = method === "keys" && targetIsMap;
    const innerIterator = target[method](...args);
    const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
    !isReadonly2 && track(rawTarget, "iterate", isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY);
    return {
      next() {
        const { value, done } = innerIterator.next();
        return done ? { value, done } : {
          value: isPair ? [wrap(value[0]), wrap(value[1])] : wrap(value),
          done
        };
      },
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function createReadonlyMethod(type) {
  return function(...args) {
    {
      const key = args[0] ? `on key "${args[0]}" ` : ``;
      console.warn(`${capitalize(type)} operation ${key}failed: target is readonly.`, toRaw(this));
    }
    return type === "delete" ? false : this;
  };
}
function createInstrumentations() {
  const mutableInstrumentations2 = {
    get(key) {
      return get$1(this, key);
    },
    get size() {
      return size(this);
    },
    has: has$1,
    add,
    set: set$1$1,
    delete: deleteEntry,
    clear,
    forEach: createForEach(false, false)
  };
  const shallowInstrumentations2 = {
    get(key) {
      return get$1(this, key, false, true);
    },
    get size() {
      return size(this);
    },
    has: has$1,
    add,
    set: set$1$1,
    delete: deleteEntry,
    clear,
    forEach: createForEach(false, true)
  };
  const readonlyInstrumentations2 = {
    get(key) {
      return get$1(this, key, true);
    },
    get size() {
      return size(this, true);
    },
    has(key) {
      return has$1.call(this, key, true);
    },
    add: createReadonlyMethod("add"),
    set: createReadonlyMethod("set"),
    delete: createReadonlyMethod("delete"),
    clear: createReadonlyMethod("clear"),
    forEach: createForEach(true, false)
  };
  const shallowReadonlyInstrumentations2 = {
    get(key) {
      return get$1(this, key, true, true);
    },
    get size() {
      return size(this, true);
    },
    has(key) {
      return has$1.call(this, key, true);
    },
    add: createReadonlyMethod("add"),
    set: createReadonlyMethod("set"),
    delete: createReadonlyMethod("delete"),
    clear: createReadonlyMethod("clear"),
    forEach: createForEach(true, true)
  };
  const iteratorMethods = ["keys", "values", "entries", Symbol.iterator];
  iteratorMethods.forEach((method) => {
    mutableInstrumentations2[method] = createIterableMethod(method, false, false);
    readonlyInstrumentations2[method] = createIterableMethod(method, true, false);
    shallowInstrumentations2[method] = createIterableMethod(method, false, true);
    shallowReadonlyInstrumentations2[method] = createIterableMethod(method, true, true);
  });
  return [
    mutableInstrumentations2,
    readonlyInstrumentations2,
    shallowInstrumentations2,
    shallowReadonlyInstrumentations2
  ];
}
const [mutableInstrumentations, readonlyInstrumentations, shallowInstrumentations, shallowReadonlyInstrumentations] = /* @__PURE__ */ createInstrumentations();
function createInstrumentationGetter(isReadonly2, shallow) {
  const instrumentations = shallow ? isReadonly2 ? shallowReadonlyInstrumentations : shallowInstrumentations : isReadonly2 ? readonlyInstrumentations : mutableInstrumentations;
  return (target, key, receiver) => {
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_raw") {
      return target;
    }
    return Reflect.get(hasOwn(instrumentations, key) && key in target ? instrumentations : target, key, receiver);
  };
}
const mutableCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(false, false)
};
const shallowCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(false, true)
};
const readonlyCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(true, false)
};
const shallowReadonlyCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(true, true)
};
function checkIdentityKeys(target, has2, key) {
  const rawKey = toRaw(key);
  if (rawKey !== key && has2.call(target, rawKey)) {
    const type = toRawType(target);
    console.warn(`Reactive ${type} contains both the raw and reactive versions of the same object${type === `Map` ? ` as keys` : ``}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`);
  }
}
const reactiveMap = /* @__PURE__ */ new WeakMap();
const shallowReactiveMap = /* @__PURE__ */ new WeakMap();
const readonlyMap = /* @__PURE__ */ new WeakMap();
const shallowReadonlyMap = /* @__PURE__ */ new WeakMap();
function targetTypeMap(rawType) {
  switch (rawType) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function getTargetType(value) {
  return value["__v_skip"] || !Object.isExtensible(value) ? 0 : targetTypeMap(toRawType(value));
}
function reactive(target) {
  if (isReadonly(target)) {
    return target;
  }
  return createReactiveObject(target, false, mutableHandlers, mutableCollectionHandlers, reactiveMap);
}
function shallowReactive(target) {
  return createReactiveObject(target, false, shallowReactiveHandlers, shallowCollectionHandlers, shallowReactiveMap);
}
function readonly(target) {
  return createReactiveObject(target, true, readonlyHandlers, readonlyCollectionHandlers, readonlyMap);
}
function shallowReadonly(target) {
  return createReactiveObject(target, true, shallowReadonlyHandlers, shallowReadonlyCollectionHandlers, shallowReadonlyMap);
}
function createReactiveObject(target, isReadonly2, baseHandlers, collectionHandlers, proxyMap) {
  if (!isObject(target)) {
    {
      console.warn(`value cannot be made reactive: ${String(target)}`);
    }
    return target;
  }
  if (target["__v_raw"] && !(isReadonly2 && target["__v_isReactive"])) {
    return target;
  }
  const existingProxy = proxyMap.get(target);
  if (existingProxy) {
    return existingProxy;
  }
  const targetType = getTargetType(target);
  if (targetType === 0) {
    return target;
  }
  const proxy = new Proxy(target, targetType === 2 ? collectionHandlers : baseHandlers);
  proxyMap.set(target, proxy);
  return proxy;
}
function isReactive(value) {
  if (isReadonly(value)) {
    return isReactive(value["__v_raw"]);
  }
  return !!(value && value["__v_isReactive"]);
}
function isReadonly(value) {
  return !!(value && value["__v_isReadonly"]);
}
function isShallow(value) {
  return !!(value && value["__v_isShallow"]);
}
function toRaw(observed) {
  const raw = observed && observed["__v_raw"];
  return raw ? toRaw(raw) : observed;
}
function markRaw(value) {
  def(value, "__v_skip", true);
  return value;
}
const toReactive = (value) => isObject(value) ? reactive(value) : value;
const toReadonly = (value) => isObject(value) ? readonly(value) : value;
function trackRefValue(ref2) {
  if (shouldTrack && activeEffect) {
    ref2 = toRaw(ref2);
    {
      trackEffects(ref2.dep || (ref2.dep = createDep()), {
        target: ref2,
        type: "get",
        key: "value"
      });
    }
  }
}
function triggerRefValue(ref2, newVal) {
  ref2 = toRaw(ref2);
  if (ref2.dep) {
    {
      triggerEffects(ref2.dep, {
        target: ref2,
        type: "set",
        key: "value",
        newValue: newVal
      });
    }
  }
}
function isRef(r) {
  return !!(r && r.__v_isRef === true);
}
function ref(value) {
  return createRef(value, false);
}
function createRef(rawValue, shallow) {
  if (isRef(rawValue)) {
    return rawValue;
  }
  return new RefImpl(rawValue, shallow);
}
class RefImpl {
  constructor(value, __v_isShallow) {
    this.__v_isShallow = __v_isShallow;
    this.dep = void 0;
    this.__v_isRef = true;
    this._rawValue = __v_isShallow ? value : toRaw(value);
    this._value = __v_isShallow ? value : toReactive(value);
  }
  get value() {
    trackRefValue(this);
    return this._value;
  }
  set value(newVal) {
    newVal = this.__v_isShallow ? newVal : toRaw(newVal);
    if (hasChanged(newVal, this._rawValue)) {
      this._rawValue = newVal;
      this._value = this.__v_isShallow ? newVal : toReactive(newVal);
      triggerRefValue(this, newVal);
    }
  }
}
function unref(ref2) {
  return isRef(ref2) ? ref2.value : ref2;
}
const shallowUnwrapHandlers = {
  get: (target, key, receiver) => unref(Reflect.get(target, key, receiver)),
  set: (target, key, value, receiver) => {
    const oldValue = target[key];
    if (isRef(oldValue) && !isRef(value)) {
      oldValue.value = value;
      return true;
    } else {
      return Reflect.set(target, key, value, receiver);
    }
  }
};
function proxyRefs(objectWithRefs) {
  return isReactive(objectWithRefs) ? objectWithRefs : new Proxy(objectWithRefs, shallowUnwrapHandlers);
}
class ComputedRefImpl {
  constructor(getter, _setter, isReadonly2, isSSR) {
    this._setter = _setter;
    this.dep = void 0;
    this.__v_isRef = true;
    this._dirty = true;
    this.effect = new ReactiveEffect(getter, () => {
      if (!this._dirty) {
        this._dirty = true;
        triggerRefValue(this);
      }
    });
    this.effect.computed = this;
    this.effect.active = this._cacheable = !isSSR;
    this["__v_isReadonly"] = isReadonly2;
  }
  get value() {
    const self2 = toRaw(this);
    trackRefValue(self2);
    if (self2._dirty || !self2._cacheable) {
      self2._dirty = false;
      self2._value = self2.effect.run();
    }
    return self2._value;
  }
  set value(newValue) {
    this._setter(newValue);
  }
}
function computed(getterOrOptions, debugOptions, isSSR = false) {
  let getter;
  let setter;
  const onlyGetter = isFunction(getterOrOptions);
  if (onlyGetter) {
    getter = getterOrOptions;
    setter = () => {
      console.warn("Write operation failed: computed value is readonly");
    };
  } else {
    getter = getterOrOptions.get;
    setter = getterOrOptions.set;
  }
  const cRef = new ComputedRefImpl(getter, setter, onlyGetter || !setter, isSSR);
  if (debugOptions && !isSSR) {
    cRef.effect.onTrack = debugOptions.onTrack;
    cRef.effect.onTrigger = debugOptions.onTrigger;
  }
  return cRef;
}
const stack = [];
function pushWarningContext(vnode) {
  stack.push(vnode);
}
function popWarningContext() {
  stack.pop();
}
function warn$1(msg, ...args) {
  pauseTracking();
  const instance = stack.length ? stack[stack.length - 1].component : null;
  const appWarnHandler = instance && instance.appContext.config.warnHandler;
  const trace = getComponentTrace();
  if (appWarnHandler) {
    callWithErrorHandling(appWarnHandler, instance, 11, [
      msg + args.join(""),
      instance && instance.proxy,
      trace.map(({ vnode }) => `at <${formatComponentName(instance, vnode.type)}>`).join("\n"),
      trace
    ]);
  } else {
    const warnArgs = [`[Vue warn]: ${msg}`, ...args];
    if (trace.length && true) {
      warnArgs.push(`
`, ...formatTrace(trace));
    }
    console.warn(...warnArgs);
  }
  resetTracking();
}
function getComponentTrace() {
  let currentVNode = stack[stack.length - 1];
  if (!currentVNode) {
    return [];
  }
  const normalizedStack = [];
  while (currentVNode) {
    const last = normalizedStack[0];
    if (last && last.vnode === currentVNode) {
      last.recurseCount++;
    } else {
      normalizedStack.push({
        vnode: currentVNode,
        recurseCount: 0
      });
    }
    const parentInstance = currentVNode.component && currentVNode.component.parent;
    currentVNode = parentInstance && parentInstance.vnode;
  }
  return normalizedStack;
}
function formatTrace(trace) {
  const logs = [];
  trace.forEach((entry, i) => {
    logs.push(...i === 0 ? [] : [`
`], ...formatTraceEntry(entry));
  });
  return logs;
}
function formatTraceEntry({ vnode, recurseCount }) {
  const postfix = recurseCount > 0 ? `... (${recurseCount} recursive calls)` : ``;
  const isRoot = vnode.component ? vnode.component.parent == null : false;
  const open = ` at <${formatComponentName(vnode.component, vnode.type, isRoot)}`;
  const close = `>` + postfix;
  return vnode.props ? [open, ...formatProps(vnode.props), close] : [open + close];
}
function formatProps(props) {
  const res = [];
  const keys = Object.keys(props);
  keys.slice(0, 3).forEach((key) => {
    res.push(...formatProp(key, props[key]));
  });
  if (keys.length > 3) {
    res.push(` ...`);
  }
  return res;
}
function formatProp(key, value, raw) {
  if (isString(value)) {
    value = JSON.stringify(value);
    return raw ? value : [`${key}=${value}`];
  } else if (typeof value === "number" || typeof value === "boolean" || value == null) {
    return raw ? value : [`${key}=${value}`];
  } else if (isRef(value)) {
    value = formatProp(key, toRaw(value.value), true);
    return raw ? value : [`${key}=Ref<`, value, `>`];
  } else if (isFunction(value)) {
    return [`${key}=fn${value.name ? `<${value.name}>` : ``}`];
  } else {
    value = toRaw(value);
    return raw ? value : [`${key}=`, value];
  }
}
const ErrorTypeStrings = {
  ["sp"]: "serverPrefetch hook",
  ["bc"]: "beforeCreate hook",
  ["c"]: "created hook",
  ["bm"]: "beforeMount hook",
  ["m"]: "mounted hook",
  ["bu"]: "beforeUpdate hook",
  ["u"]: "updated",
  ["bum"]: "beforeUnmount hook",
  ["um"]: "unmounted hook",
  ["a"]: "activated hook",
  ["da"]: "deactivated hook",
  ["ec"]: "errorCaptured hook",
  ["rtc"]: "renderTracked hook",
  ["rtg"]: "renderTriggered hook",
  [0]: "setup function",
  [1]: "render function",
  [2]: "watcher getter",
  [3]: "watcher callback",
  [4]: "watcher cleanup function",
  [5]: "native event handler",
  [6]: "component event handler",
  [7]: "vnode hook",
  [8]: "directive hook",
  [9]: "transition hook",
  [10]: "app errorHandler",
  [11]: "app warnHandler",
  [12]: "ref function",
  [13]: "async component loader",
  [14]: "scheduler flush. This is likely a Vue internals bug. Please open an issue at https://new-issue.vuejs.org/?repo=vuejs/core"
};
function callWithErrorHandling(fn, instance, type, args) {
  let res;
  try {
    res = args ? fn(...args) : fn();
  } catch (err) {
    handleError(err, instance, type);
  }
  return res;
}
function callWithAsyncErrorHandling(fn, instance, type, args) {
  if (isFunction(fn)) {
    const res = callWithErrorHandling(fn, instance, type, args);
    if (res && isPromise(res)) {
      res.catch((err) => {
        handleError(err, instance, type);
      });
    }
    return res;
  }
  const values = [];
  for (let i = 0; i < fn.length; i++) {
    values.push(callWithAsyncErrorHandling(fn[i], instance, type, args));
  }
  return values;
}
function handleError(err, instance, type, throwInDev = true) {
  const contextVNode = instance ? instance.vnode : null;
  if (instance) {
    let cur = instance.parent;
    const exposedInstance = instance.proxy;
    const errorInfo = ErrorTypeStrings[type] || type;
    while (cur) {
      const errorCapturedHooks = cur.ec;
      if (errorCapturedHooks) {
        for (let i = 0; i < errorCapturedHooks.length; i++) {
          if (errorCapturedHooks[i](err, exposedInstance, errorInfo) === false) {
            return;
          }
        }
      }
      cur = cur.parent;
    }
    const appErrorHandler = instance.appContext.config.errorHandler;
    if (appErrorHandler) {
      callWithErrorHandling(appErrorHandler, null, 10, [err, exposedInstance, errorInfo]);
      return;
    }
  }
  logError(err, type, contextVNode, throwInDev);
}
function logError(err, type, contextVNode, throwInDev = true) {
  {
    const info = ErrorTypeStrings[type] || type;
    if (contextVNode) {
      pushWarningContext(contextVNode);
    }
    warn$1(`Unhandled error${info ? ` during execution of ${info}` : ``}`);
    if (contextVNode) {
      popWarningContext();
    }
    if (throwInDev) {
      console.error(err);
    } else {
      console.error(err);
    }
  }
}
let isFlushing = false;
let isFlushPending = false;
const queue = [];
let flushIndex = 0;
const pendingPreFlushCbs = [];
let activePreFlushCbs = null;
let preFlushIndex = 0;
const pendingPostFlushCbs = [];
let activePostFlushCbs = null;
let postFlushIndex = 0;
const resolvedPromise = /* @__PURE__ */ Promise.resolve();
let currentFlushPromise = null;
let currentPreFlushParentJob = null;
const RECURSION_LIMIT = 100;
function nextTick(fn) {
  const p = currentFlushPromise || resolvedPromise;
  return fn ? p.then(this ? fn.bind(this) : fn) : p;
}
function findInsertionIndex(id) {
  let start = flushIndex + 1;
  let end = queue.length;
  while (start < end) {
    const middle = start + end >>> 1;
    const middleJobId = getId(queue[middle]);
    middleJobId < id ? start = middle + 1 : end = middle;
  }
  return start;
}
function queueJob(job) {
  if ((!queue.length || !queue.includes(job, isFlushing && job.allowRecurse ? flushIndex + 1 : flushIndex)) && job !== currentPreFlushParentJob) {
    if (job.id == null) {
      queue.push(job);
    } else {
      queue.splice(findInsertionIndex(job.id), 0, job);
    }
    queueFlush();
  }
}
function queueFlush() {
  if (!isFlushing && !isFlushPending) {
    isFlushPending = true;
    currentFlushPromise = resolvedPromise.then(flushJobs);
  }
}
function hasQueueJob(job) {
  return queue.indexOf(job) > -1;
}
function invalidateJob(job) {
  const i = queue.indexOf(job);
  if (i > flushIndex) {
    queue.splice(i, 1);
  }
}
function queueCb(cb, activeQueue, pendingQueue, index2) {
  if (!isArray(cb)) {
    if (!activeQueue || !activeQueue.includes(cb, cb.allowRecurse ? index2 + 1 : index2)) {
      pendingQueue.push(cb);
    }
  } else {
    pendingQueue.push(...cb);
  }
  queueFlush();
}
function queuePreFlushCb(cb) {
  queueCb(cb, activePreFlushCbs, pendingPreFlushCbs, preFlushIndex);
}
function queuePostFlushCb(cb) {
  queueCb(cb, activePostFlushCbs, pendingPostFlushCbs, postFlushIndex);
}
function flushPreFlushCbs(seen, parentJob = null) {
  if (pendingPreFlushCbs.length) {
    currentPreFlushParentJob = parentJob;
    activePreFlushCbs = [...new Set(pendingPreFlushCbs)];
    pendingPreFlushCbs.length = 0;
    {
      seen = seen || /* @__PURE__ */ new Map();
    }
    for (preFlushIndex = 0; preFlushIndex < activePreFlushCbs.length; preFlushIndex++) {
      if (checkRecursiveUpdates(seen, activePreFlushCbs[preFlushIndex])) {
        continue;
      }
      activePreFlushCbs[preFlushIndex]();
    }
    activePreFlushCbs = null;
    preFlushIndex = 0;
    currentPreFlushParentJob = null;
    flushPreFlushCbs(seen, parentJob);
  }
}
function flushPostFlushCbs(seen) {
  flushPreFlushCbs();
  if (pendingPostFlushCbs.length) {
    const deduped = [...new Set(pendingPostFlushCbs)];
    pendingPostFlushCbs.length = 0;
    if (activePostFlushCbs) {
      activePostFlushCbs.push(...deduped);
      return;
    }
    activePostFlushCbs = deduped;
    {
      seen = seen || /* @__PURE__ */ new Map();
    }
    activePostFlushCbs.sort((a, b) => getId(a) - getId(b));
    for (postFlushIndex = 0; postFlushIndex < activePostFlushCbs.length; postFlushIndex++) {
      if (checkRecursiveUpdates(seen, activePostFlushCbs[postFlushIndex])) {
        continue;
      }
      activePostFlushCbs[postFlushIndex]();
    }
    activePostFlushCbs = null;
    postFlushIndex = 0;
  }
}
const getId = (job) => job.id == null ? Infinity : job.id;
function flushJobs(seen) {
  isFlushPending = false;
  isFlushing = true;
  {
    seen = seen || /* @__PURE__ */ new Map();
  }
  flushPreFlushCbs(seen);
  queue.sort((a, b) => getId(a) - getId(b));
  const check = (job) => checkRecursiveUpdates(seen, job);
  try {
    for (flushIndex = 0; flushIndex < queue.length; flushIndex++) {
      const job = queue[flushIndex];
      if (job && job.active !== false) {
        if (check(job)) {
          continue;
        }
        callWithErrorHandling(job, null, 14);
      }
    }
  } finally {
    flushIndex = 0;
    queue.length = 0;
    flushPostFlushCbs(seen);
    isFlushing = false;
    currentFlushPromise = null;
    if (queue.length || pendingPreFlushCbs.length || pendingPostFlushCbs.length) {
      flushJobs(seen);
    }
  }
}
function checkRecursiveUpdates(seen, fn) {
  if (!seen.has(fn)) {
    seen.set(fn, 1);
  } else {
    const count = seen.get(fn);
    if (count > RECURSION_LIMIT) {
      const instance = fn.ownerInstance;
      const componentName = instance && getComponentName(instance.type);
      warn$1(`Maximum recursive updates exceeded${componentName ? ` in component <${componentName}>` : ``}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`);
      return true;
    } else {
      seen.set(fn, count + 1);
    }
  }
}
function emit(event, ...args) {
}
function devtoolsComponentEmit(component, event, params) {
  emit("component:emit", component.appContext.app, component, event, params);
}
function emit$1(instance, event, ...rawArgs) {
  if (instance.isUnmounted)
    return;
  const props = instance.vnode.props || EMPTY_OBJ;
  {
    const { emitsOptions, propsOptions: [propsOptions] } = instance;
    if (emitsOptions) {
      if (!(event in emitsOptions) && true) {
        if (!propsOptions || !(toHandlerKey(event) in propsOptions)) {
          warn$1(`Component emitted event "${event}" but it is neither declared in the emits option nor as an "${toHandlerKey(event)}" prop.`);
        }
      } else {
        const validator = emitsOptions[event];
        if (isFunction(validator)) {
          const isValid = validator(...rawArgs);
          if (!isValid) {
            warn$1(`Invalid event arguments: event validation failed for event "${event}".`);
          }
        }
      }
    }
  }
  let args = rawArgs;
  const isModelListener2 = event.startsWith("update:");
  const modelArg = isModelListener2 && event.slice(7);
  if (modelArg && modelArg in props) {
    const modifiersKey = `${modelArg === "modelValue" ? "model" : modelArg}Modifiers`;
    const { number, trim } = props[modifiersKey] || EMPTY_OBJ;
    if (trim) {
      args = rawArgs.map((a) => a.trim());
    }
    if (number) {
      args = rawArgs.map(toNumber);
    }
  }
  {
    devtoolsComponentEmit(instance, event, args);
  }
  {
    const lowerCaseEvent = event.toLowerCase();
    if (lowerCaseEvent !== event && props[toHandlerKey(lowerCaseEvent)]) {
      warn$1(`Event "${lowerCaseEvent}" is emitted in component ${formatComponentName(instance, instance.type)} but the handler is registered for "${event}". Note that HTML attributes are case-insensitive and you cannot use v-on to listen to camelCase events when using in-DOM templates. You should probably use "${hyphenate(event)}" instead of "${event}".`);
    }
  }
  let handlerName;
  let handler = props[handlerName = toHandlerKey(event)] || props[handlerName = toHandlerKey(camelize(event))];
  if (!handler && isModelListener2) {
    handler = props[handlerName = toHandlerKey(hyphenate(event))];
  }
  if (handler) {
    callWithAsyncErrorHandling(handler, instance, 6, args);
  }
  const onceHandler = props[handlerName + `Once`];
  if (onceHandler) {
    if (!instance.emitted) {
      instance.emitted = {};
    } else if (instance.emitted[handlerName]) {
      return;
    }
    instance.emitted[handlerName] = true;
    callWithAsyncErrorHandling(onceHandler, instance, 6, args);
  }
}
function normalizeEmitsOptions(comp, appContext, asMixin = false) {
  const cache = appContext.emitsCache;
  const cached = cache.get(comp);
  if (cached !== void 0) {
    return cached;
  }
  const raw = comp.emits;
  let normalized = {};
  let hasExtends = false;
  if (!isFunction(comp)) {
    const extendEmits = (raw2) => {
      const normalizedFromExtend = normalizeEmitsOptions(raw2, appContext, true);
      if (normalizedFromExtend) {
        hasExtends = true;
        extend(normalized, normalizedFromExtend);
      }
    };
    if (!asMixin && appContext.mixins.length) {
      appContext.mixins.forEach(extendEmits);
    }
    if (comp.extends) {
      extendEmits(comp.extends);
    }
    if (comp.mixins) {
      comp.mixins.forEach(extendEmits);
    }
  }
  if (!raw && !hasExtends) {
    cache.set(comp, null);
    return null;
  }
  if (isArray(raw)) {
    raw.forEach((key) => normalized[key] = null);
  } else {
    extend(normalized, raw);
  }
  cache.set(comp, normalized);
  return normalized;
}
function isEmitListener(options, key) {
  if (!options || !isOn(key)) {
    return false;
  }
  key = key.slice(2).replace(/Once$/, "");
  return hasOwn(options, key[0].toLowerCase() + key.slice(1)) || hasOwn(options, hyphenate(key)) || hasOwn(options, key);
}
let currentRenderingInstance = null;
function setCurrentRenderingInstance(instance) {
  const prev = currentRenderingInstance;
  currentRenderingInstance = instance;
  instance && instance.type.__scopeId || null;
  return prev;
}
function provide(key, value) {
  if (!currentInstance) {
    {
      warn$1(`provide() can only be used inside setup().`);
    }
  } else {
    let provides = currentInstance.provides;
    const parentProvides = currentInstance.parent && currentInstance.parent.provides;
    if (parentProvides === provides) {
      provides = currentInstance.provides = Object.create(parentProvides);
    }
    provides[key] = value;
    if (currentInstance.type.mpType === "app") {
      currentInstance.appContext.app.provide(key, value);
    }
  }
}
function inject(key, defaultValue, treatDefaultAsFactory = false) {
  const instance = currentInstance || currentRenderingInstance;
  if (instance) {
    const provides = instance.parent == null ? instance.vnode.appContext && instance.vnode.appContext.provides : instance.parent.provides;
    if (provides && key in provides) {
      return provides[key];
    } else if (arguments.length > 1) {
      return treatDefaultAsFactory && isFunction(defaultValue) ? defaultValue.call(instance.proxy) : defaultValue;
    } else {
      warn$1(`injection "${String(key)}" not found.`);
    }
  } else {
    warn$1(`inject() can only be used inside setup() or functional components.`);
  }
}
const INITIAL_WATCHER_VALUE = {};
function watch(source, cb, options) {
  if (!isFunction(cb)) {
    warn$1(`\`watch(fn, options?)\` signature has been moved to a separate API. Use \`watchEffect(fn, options?)\` instead. \`watch\` now only supports \`watch(source, cb, options?) signature.`);
  }
  return doWatch(source, cb, options);
}
function doWatch(source, cb, { immediate, deep, flush, onTrack, onTrigger } = EMPTY_OBJ) {
  if (!cb) {
    if (immediate !== void 0) {
      warn$1(`watch() "immediate" option is only respected when using the watch(source, callback, options?) signature.`);
    }
    if (deep !== void 0) {
      warn$1(`watch() "deep" option is only respected when using the watch(source, callback, options?) signature.`);
    }
  }
  const warnInvalidSource = (s) => {
    warn$1(`Invalid watch source: `, s, `A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types.`);
  };
  const instance = currentInstance;
  let getter;
  let forceTrigger = false;
  let isMultiSource = false;
  if (isRef(source)) {
    getter = () => source.value;
    forceTrigger = isShallow(source);
  } else if (isReactive(source)) {
    getter = () => source;
    deep = true;
  } else if (isArray(source)) {
    isMultiSource = true;
    forceTrigger = source.some((s) => isReactive(s) || isShallow(s));
    getter = () => source.map((s) => {
      if (isRef(s)) {
        return s.value;
      } else if (isReactive(s)) {
        return traverse(s);
      } else if (isFunction(s)) {
        return callWithErrorHandling(s, instance, 2);
      } else {
        warnInvalidSource(s);
      }
    });
  } else if (isFunction(source)) {
    if (cb) {
      getter = () => callWithErrorHandling(source, instance, 2);
    } else {
      getter = () => {
        if (instance && instance.isUnmounted) {
          return;
        }
        if (cleanup) {
          cleanup();
        }
        return callWithAsyncErrorHandling(source, instance, 3, [onCleanup]);
      };
    }
  } else {
    getter = NOOP;
    warnInvalidSource(source);
  }
  if (cb && deep) {
    const baseGetter = getter;
    getter = () => traverse(baseGetter());
  }
  let cleanup;
  let onCleanup = (fn) => {
    cleanup = effect.onStop = () => {
      callWithErrorHandling(fn, instance, 4);
    };
  };
  let oldValue = isMultiSource ? [] : INITIAL_WATCHER_VALUE;
  const job = () => {
    if (!effect.active) {
      return;
    }
    if (cb) {
      const newValue = effect.run();
      if (deep || forceTrigger || (isMultiSource ? newValue.some((v, i) => hasChanged(v, oldValue[i])) : hasChanged(newValue, oldValue)) || false) {
        if (cleanup) {
          cleanup();
        }
        callWithAsyncErrorHandling(cb, instance, 3, [
          newValue,
          oldValue === INITIAL_WATCHER_VALUE ? void 0 : oldValue,
          onCleanup
        ]);
        oldValue = newValue;
      }
    } else {
      effect.run();
    }
  };
  job.allowRecurse = !!cb;
  let scheduler;
  if (flush === "sync") {
    scheduler = job;
  } else if (flush === "post") {
    scheduler = () => queuePostRenderEffect(job, instance && instance.suspense);
  } else {
    scheduler = () => {
      if (!instance || instance.isMounted) {
        queuePreFlushCb(job);
      } else {
        job();
      }
    };
  }
  const effect = new ReactiveEffect(getter, scheduler);
  {
    effect.onTrack = onTrack;
    effect.onTrigger = onTrigger;
  }
  if (cb) {
    if (immediate) {
      job();
    } else {
      oldValue = effect.run();
    }
  } else if (flush === "post") {
    queuePostRenderEffect(effect.run.bind(effect), instance && instance.suspense);
  } else {
    effect.run();
  }
  return () => {
    effect.stop();
    if (instance && instance.scope) {
      remove(instance.scope.effects, effect);
    }
  };
}
function instanceWatch(source, value, options) {
  const publicThis = this.proxy;
  const getter = isString(source) ? source.includes(".") ? createPathGetter(publicThis, source) : () => publicThis[source] : source.bind(publicThis, publicThis);
  let cb;
  if (isFunction(value)) {
    cb = value;
  } else {
    cb = value.handler;
    options = value;
  }
  const cur = currentInstance;
  setCurrentInstance(this);
  const res = doWatch(getter, cb.bind(publicThis), options);
  if (cur) {
    setCurrentInstance(cur);
  } else {
    unsetCurrentInstance();
  }
  return res;
}
function createPathGetter(ctx, path) {
  const segments = path.split(".");
  return () => {
    let cur = ctx;
    for (let i = 0; i < segments.length && cur; i++) {
      cur = cur[segments[i]];
    }
    return cur;
  };
}
function traverse(value, seen) {
  if (!isObject(value) || value["__v_skip"]) {
    return value;
  }
  seen = seen || /* @__PURE__ */ new Set();
  if (seen.has(value)) {
    return value;
  }
  seen.add(value);
  if (isRef(value)) {
    traverse(value.value, seen);
  } else if (isArray(value)) {
    for (let i = 0; i < value.length; i++) {
      traverse(value[i], seen);
    }
  } else if (isSet(value) || isMap(value)) {
    value.forEach((v) => {
      traverse(v, seen);
    });
  } else if (isPlainObject(value)) {
    for (const key in value) {
      traverse(value[key], seen);
    }
  }
  return value;
}
const isKeepAlive = (vnode) => vnode.type.__isKeepAlive;
function onActivated(hook, target) {
  registerKeepAliveHook(hook, "a", target);
}
function onDeactivated(hook, target) {
  registerKeepAliveHook(hook, "da", target);
}
function registerKeepAliveHook(hook, type, target = currentInstance) {
  const wrappedHook = hook.__wdc || (hook.__wdc = () => {
    let current = target;
    while (current) {
      if (current.isDeactivated) {
        return;
      }
      current = current.parent;
    }
    return hook();
  });
  injectHook(type, wrappedHook, target);
  if (target) {
    let current = target.parent;
    while (current && current.parent) {
      if (isKeepAlive(current.parent.vnode)) {
        injectToKeepAliveRoot(wrappedHook, type, target, current);
      }
      current = current.parent;
    }
  }
}
function injectToKeepAliveRoot(hook, type, target, keepAliveRoot) {
  const injected = injectHook(type, hook, keepAliveRoot, true);
  onUnmounted(() => {
    remove(keepAliveRoot[type], injected);
  }, target);
}
function injectHook(type, hook, target = currentInstance, prepend = false) {
  if (target) {
    if (isRootHook(type)) {
      target = target.root;
    }
    const hooks = target[type] || (target[type] = []);
    const wrappedHook = hook.__weh || (hook.__weh = (...args) => {
      if (target.isUnmounted) {
        return;
      }
      pauseTracking();
      setCurrentInstance(target);
      const res = callWithAsyncErrorHandling(hook, target, type, args);
      unsetCurrentInstance();
      resetTracking();
      return res;
    });
    if (prepend) {
      hooks.unshift(wrappedHook);
    } else {
      hooks.push(wrappedHook);
    }
    return wrappedHook;
  } else {
    const apiName = toHandlerKey((ErrorTypeStrings[type] || type.replace(/^on/, "")).replace(/ hook$/, ""));
    warn$1(`${apiName} is called when there is no active component instance to be associated with. Lifecycle injection APIs can only be used during execution of setup().`);
  }
}
const createHook = (lifecycle) => (hook, target = currentInstance) => (!isInSSRComponentSetup || lifecycle === "sp") && injectHook(lifecycle, hook, target);
const onBeforeMount = createHook("bm");
const onMounted = createHook("m");
const onBeforeUpdate = createHook("bu");
const onUpdated = createHook("u");
const onBeforeUnmount = createHook("bum");
const onUnmounted = createHook("um");
const onServerPrefetch = createHook("sp");
const onRenderTriggered = createHook("rtg");
const onRenderTracked = createHook("rtc");
function onErrorCaptured(hook, target = currentInstance) {
  injectHook("ec", hook, target);
}
function validateDirectiveName(name) {
  if (isBuiltInDirective(name)) {
    warn$1("Do not use built-in directive ids as custom directive id: " + name);
  }
}
const COMPONENTS = "components";
function resolveComponent(name, maybeSelfReference) {
  return resolveAsset(COMPONENTS, name, true, maybeSelfReference) || name;
}
function resolveAsset(type, name, warnMissing = true, maybeSelfReference = false) {
  const instance = currentRenderingInstance || currentInstance;
  if (instance) {
    const Component2 = instance.type;
    if (type === COMPONENTS) {
      const selfName = getComponentName(Component2, false);
      if (selfName && (selfName === name || selfName === camelize(name) || selfName === capitalize(camelize(name)))) {
        return Component2;
      }
    }
    const res = resolve(instance[type] || Component2[type], name) || resolve(instance.appContext[type], name);
    if (!res && maybeSelfReference) {
      return Component2;
    }
    if (warnMissing && !res) {
      const extra = type === COMPONENTS ? `
If this is a native custom element, make sure to exclude it from component resolution via compilerOptions.isCustomElement.` : ``;
      warn$1(`Failed to resolve ${type.slice(0, -1)}: ${name}${extra}`);
    }
    return res;
  } else {
    warn$1(`resolve${capitalize(type.slice(0, -1))} can only be used in render() or setup().`);
  }
}
function resolve(registry, name) {
  return registry && (registry[name] || registry[camelize(name)] || registry[capitalize(camelize(name))]);
}
const getPublicInstance = (i) => {
  if (!i)
    return null;
  if (isStatefulComponent(i))
    return getExposeProxy(i) || i.proxy;
  return getPublicInstance(i.parent);
};
const publicPropertiesMap = /* @__PURE__ */ extend(/* @__PURE__ */ Object.create(null), {
  $: (i) => i,
  $el: (i) => i.__$el || (i.__$el = {}),
  $data: (i) => i.data,
  $props: (i) => shallowReadonly(i.props),
  $attrs: (i) => shallowReadonly(i.attrs),
  $slots: (i) => shallowReadonly(i.slots),
  $refs: (i) => shallowReadonly(i.refs),
  $parent: (i) => getPublicInstance(i.parent),
  $root: (i) => getPublicInstance(i.root),
  $emit: (i) => i.emit,
  $options: (i) => resolveMergedOptions(i),
  $forceUpdate: (i) => i.f || (i.f = () => queueJob(i.update)),
  $watch: (i) => instanceWatch.bind(i)
});
const isReservedPrefix = (key) => key === "_" || key === "$";
const PublicInstanceProxyHandlers = {
  get({ _: instance }, key) {
    const { ctx, setupState, data, props, accessCache, type, appContext } = instance;
    if (key === "__isVue") {
      return true;
    }
    if (setupState !== EMPTY_OBJ && setupState.__isScriptSetup && hasOwn(setupState, key)) {
      return setupState[key];
    }
    let normalizedProps;
    if (key[0] !== "$") {
      const n = accessCache[key];
      if (n !== void 0) {
        switch (n) {
          case 1:
            return setupState[key];
          case 2:
            return data[key];
          case 4:
            return ctx[key];
          case 3:
            return props[key];
        }
      } else if (setupState !== EMPTY_OBJ && hasOwn(setupState, key)) {
        accessCache[key] = 1;
        return setupState[key];
      } else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
        accessCache[key] = 2;
        return data[key];
      } else if ((normalizedProps = instance.propsOptions[0]) && hasOwn(normalizedProps, key)) {
        accessCache[key] = 3;
        return props[key];
      } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
        accessCache[key] = 4;
        return ctx[key];
      } else if (shouldCacheAccess) {
        accessCache[key] = 0;
      }
    }
    const publicGetter = publicPropertiesMap[key];
    let cssModule, globalProperties;
    if (publicGetter) {
      if (key === "$attrs") {
        track(instance, "get", key);
      }
      return publicGetter(instance);
    } else if ((cssModule = type.__cssModules) && (cssModule = cssModule[key])) {
      return cssModule;
    } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
      accessCache[key] = 4;
      return ctx[key];
    } else if (globalProperties = appContext.config.globalProperties, hasOwn(globalProperties, key)) {
      {
        return globalProperties[key];
      }
    } else if (currentRenderingInstance && (!isString(key) || key.indexOf("__v") !== 0)) {
      if (data !== EMPTY_OBJ && isReservedPrefix(key[0]) && hasOwn(data, key)) {
        warn$1(`Property ${JSON.stringify(key)} must be accessed via $data because it starts with a reserved character ("$" or "_") and is not proxied on the render context.`);
      } else if (instance === currentRenderingInstance) {
        warn$1(`Property ${JSON.stringify(key)} was accessed during render but is not defined on instance.`);
      }
    }
  },
  set({ _: instance }, key, value) {
    const { data, setupState, ctx } = instance;
    if (setupState !== EMPTY_OBJ && hasOwn(setupState, key)) {
      setupState[key] = value;
      return true;
    } else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
      data[key] = value;
      return true;
    } else if (hasOwn(instance.props, key)) {
      warn$1(`Attempting to mutate prop "${key}". Props are readonly.`, instance);
      return false;
    }
    if (key[0] === "$" && key.slice(1) in instance) {
      warn$1(`Attempting to mutate public property "${key}". Properties starting with $ are reserved and readonly.`, instance);
      return false;
    } else {
      if (key in instance.appContext.config.globalProperties) {
        Object.defineProperty(ctx, key, {
          enumerable: true,
          configurable: true,
          value
        });
      } else {
        ctx[key] = value;
      }
    }
    return true;
  },
  has({ _: { data, setupState, accessCache, ctx, appContext, propsOptions } }, key) {
    let normalizedProps;
    return !!accessCache[key] || data !== EMPTY_OBJ && hasOwn(data, key) || setupState !== EMPTY_OBJ && hasOwn(setupState, key) || (normalizedProps = propsOptions[0]) && hasOwn(normalizedProps, key) || hasOwn(ctx, key) || hasOwn(publicPropertiesMap, key) || hasOwn(appContext.config.globalProperties, key);
  },
  defineProperty(target, key, descriptor) {
    if (descriptor.get != null) {
      target._.accessCache[key] = 0;
    } else if (hasOwn(descriptor, "value")) {
      this.set(target, key, descriptor.value, null);
    }
    return Reflect.defineProperty(target, key, descriptor);
  }
};
{
  PublicInstanceProxyHandlers.ownKeys = (target) => {
    warn$1(`Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead.`);
    return Reflect.ownKeys(target);
  };
}
function createDevRenderContext(instance) {
  const target = {};
  Object.defineProperty(target, `_`, {
    configurable: true,
    enumerable: false,
    get: () => instance
  });
  Object.keys(publicPropertiesMap).forEach((key) => {
    Object.defineProperty(target, key, {
      configurable: true,
      enumerable: false,
      get: () => publicPropertiesMap[key](instance),
      set: NOOP
    });
  });
  return target;
}
function exposePropsOnRenderContext(instance) {
  const { ctx, propsOptions: [propsOptions] } = instance;
  if (propsOptions) {
    Object.keys(propsOptions).forEach((key) => {
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => instance.props[key],
        set: NOOP
      });
    });
  }
}
function exposeSetupStateOnRenderContext(instance) {
  const { ctx, setupState } = instance;
  Object.keys(toRaw(setupState)).forEach((key) => {
    if (!setupState.__isScriptSetup) {
      if (isReservedPrefix(key[0])) {
        warn$1(`setup() return property ${JSON.stringify(key)} should not start with "$" or "_" which are reserved prefixes for Vue internals.`);
        return;
      }
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => setupState[key],
        set: NOOP
      });
    }
  });
}
function createDuplicateChecker() {
  const cache = /* @__PURE__ */ Object.create(null);
  return (type, key) => {
    if (cache[key]) {
      warn$1(`${type} property "${key}" is already defined in ${cache[key]}.`);
    } else {
      cache[key] = type;
    }
  };
}
let shouldCacheAccess = true;
function applyOptions$1(instance) {
  const options = resolveMergedOptions(instance);
  const publicThis = instance.proxy;
  const ctx = instance.ctx;
  shouldCacheAccess = false;
  if (options.beforeCreate) {
    callHook$1(options.beforeCreate, instance, "bc");
  }
  const {
    data: dataOptions,
    computed: computedOptions,
    methods,
    watch: watchOptions,
    provide: provideOptions,
    inject: injectOptions,
    created,
    beforeMount,
    mounted,
    beforeUpdate,
    updated,
    activated,
    deactivated,
    beforeDestroy,
    beforeUnmount,
    destroyed,
    unmounted,
    render,
    renderTracked,
    renderTriggered,
    errorCaptured,
    serverPrefetch,
    expose,
    inheritAttrs,
    components,
    directives,
    filters
  } = options;
  const checkDuplicateProperties = createDuplicateChecker();
  {
    const [propsOptions] = instance.propsOptions;
    if (propsOptions) {
      for (const key in propsOptions) {
        checkDuplicateProperties("Props", key);
      }
    }
  }
  if (injectOptions) {
    resolveInjections(injectOptions, ctx, checkDuplicateProperties, instance.appContext.config.unwrapInjectedRef);
  }
  if (methods) {
    for (const key in methods) {
      const methodHandler = methods[key];
      if (isFunction(methodHandler)) {
        {
          Object.defineProperty(ctx, key, {
            value: methodHandler.bind(publicThis),
            configurable: true,
            enumerable: true,
            writable: true
          });
        }
        {
          checkDuplicateProperties("Methods", key);
        }
      } else {
        warn$1(`Method "${key}" has type "${typeof methodHandler}" in the component definition. Did you reference the function correctly?`);
      }
    }
  }
  if (dataOptions) {
    if (!isFunction(dataOptions)) {
      warn$1(`The data option must be a function. Plain object usage is no longer supported.`);
    }
    const data = dataOptions.call(publicThis, publicThis);
    if (isPromise(data)) {
      warn$1(`data() returned a Promise - note data() cannot be async; If you intend to perform data fetching before component renders, use async setup() + <Suspense>.`);
    }
    if (!isObject(data)) {
      warn$1(`data() should return an object.`);
    } else {
      instance.data = reactive(data);
      {
        for (const key in data) {
          checkDuplicateProperties("Data", key);
          if (!isReservedPrefix(key[0])) {
            Object.defineProperty(ctx, key, {
              configurable: true,
              enumerable: true,
              get: () => data[key],
              set: NOOP
            });
          }
        }
      }
    }
  }
  shouldCacheAccess = true;
  if (computedOptions) {
    for (const key in computedOptions) {
      const opt = computedOptions[key];
      const get2 = isFunction(opt) ? opt.bind(publicThis, publicThis) : isFunction(opt.get) ? opt.get.bind(publicThis, publicThis) : NOOP;
      if (get2 === NOOP) {
        warn$1(`Computed property "${key}" has no getter.`);
      }
      const set2 = !isFunction(opt) && isFunction(opt.set) ? opt.set.bind(publicThis) : () => {
        warn$1(`Write operation failed: computed property "${key}" is readonly.`);
      };
      const c = computed$1({
        get: get2,
        set: set2
      });
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => c.value,
        set: (v) => c.value = v
      });
      {
        checkDuplicateProperties("Computed", key);
      }
    }
  }
  if (watchOptions) {
    for (const key in watchOptions) {
      createWatcher(watchOptions[key], ctx, publicThis, key);
    }
  }
  {
    if (provideOptions) {
      const provides = isFunction(provideOptions) ? provideOptions.call(publicThis) : provideOptions;
      Reflect.ownKeys(provides).forEach((key) => {
        provide(key, provides[key]);
      });
    }
  }
  {
    if (created) {
      callHook$1(created, instance, "c");
    }
  }
  function registerLifecycleHook(register, hook) {
    if (isArray(hook)) {
      hook.forEach((_hook) => register(_hook.bind(publicThis)));
    } else if (hook) {
      register(hook.bind(publicThis));
    }
  }
  registerLifecycleHook(onBeforeMount, beforeMount);
  registerLifecycleHook(onMounted, mounted);
  registerLifecycleHook(onBeforeUpdate, beforeUpdate);
  registerLifecycleHook(onUpdated, updated);
  registerLifecycleHook(onActivated, activated);
  registerLifecycleHook(onDeactivated, deactivated);
  registerLifecycleHook(onErrorCaptured, errorCaptured);
  registerLifecycleHook(onRenderTracked, renderTracked);
  registerLifecycleHook(onRenderTriggered, renderTriggered);
  registerLifecycleHook(onBeforeUnmount, beforeUnmount);
  registerLifecycleHook(onUnmounted, unmounted);
  registerLifecycleHook(onServerPrefetch, serverPrefetch);
  if (isArray(expose)) {
    if (expose.length) {
      const exposed = instance.exposed || (instance.exposed = {});
      expose.forEach((key) => {
        Object.defineProperty(exposed, key, {
          get: () => publicThis[key],
          set: (val) => publicThis[key] = val
        });
      });
    } else if (!instance.exposed) {
      instance.exposed = {};
    }
  }
  if (render && instance.render === NOOP) {
    instance.render = render;
  }
  if (inheritAttrs != null) {
    instance.inheritAttrs = inheritAttrs;
  }
  if (components)
    instance.components = components;
  if (directives)
    instance.directives = directives;
  if (instance.ctx.$onApplyOptions) {
    instance.ctx.$onApplyOptions(options, instance, publicThis);
  }
}
function resolveInjections(injectOptions, ctx, checkDuplicateProperties = NOOP, unwrapRef = false) {
  if (isArray(injectOptions)) {
    injectOptions = normalizeInject(injectOptions);
  }
  for (const key in injectOptions) {
    const opt = injectOptions[key];
    let injected;
    if (isObject(opt)) {
      if ("default" in opt) {
        injected = inject(opt.from || key, opt.default, true);
      } else {
        injected = inject(opt.from || key);
      }
    } else {
      injected = inject(opt);
    }
    if (isRef(injected)) {
      if (unwrapRef) {
        Object.defineProperty(ctx, key, {
          enumerable: true,
          configurable: true,
          get: () => injected.value,
          set: (v) => injected.value = v
        });
      } else {
        {
          warn$1(`injected property "${key}" is a ref and will be auto-unwrapped and no longer needs \`.value\` in the next minor release. To opt-in to the new behavior now, set \`app.config.unwrapInjectedRef = true\` (this config is temporary and will not be needed in the future.)`);
        }
        ctx[key] = injected;
      }
    } else {
      ctx[key] = injected;
    }
    {
      checkDuplicateProperties("Inject", key);
    }
  }
}
function callHook$1(hook, instance, type) {
  callWithAsyncErrorHandling(isArray(hook) ? hook.map((h) => h.bind(instance.proxy)) : hook.bind(instance.proxy), instance, type);
}
function createWatcher(raw, ctx, publicThis, key) {
  const getter = key.includes(".") ? createPathGetter(publicThis, key) : () => publicThis[key];
  if (isString(raw)) {
    const handler = ctx[raw];
    if (isFunction(handler)) {
      watch(getter, handler);
    } else {
      warn$1(`Invalid watch handler specified by key "${raw}"`, handler);
    }
  } else if (isFunction(raw)) {
    watch(getter, raw.bind(publicThis));
  } else if (isObject(raw)) {
    if (isArray(raw)) {
      raw.forEach((r) => createWatcher(r, ctx, publicThis, key));
    } else {
      const handler = isFunction(raw.handler) ? raw.handler.bind(publicThis) : ctx[raw.handler];
      if (isFunction(handler)) {
        watch(getter, handler, raw);
      } else {
        warn$1(`Invalid watch handler specified by key "${raw.handler}"`, handler);
      }
    }
  } else {
    warn$1(`Invalid watch option: "${key}"`, raw);
  }
}
function resolveMergedOptions(instance) {
  const base = instance.type;
  const { mixins, extends: extendsOptions } = base;
  const { mixins: globalMixins, optionsCache: cache, config: { optionMergeStrategies } } = instance.appContext;
  const cached = cache.get(base);
  let resolved;
  if (cached) {
    resolved = cached;
  } else if (!globalMixins.length && !mixins && !extendsOptions) {
    {
      resolved = base;
    }
  } else {
    resolved = {};
    if (globalMixins.length) {
      globalMixins.forEach((m) => mergeOptions(resolved, m, optionMergeStrategies, true));
    }
    mergeOptions(resolved, base, optionMergeStrategies);
  }
  cache.set(base, resolved);
  return resolved;
}
function mergeOptions(to, from, strats, asMixin = false) {
  const { mixins, extends: extendsOptions } = from;
  if (extendsOptions) {
    mergeOptions(to, extendsOptions, strats, true);
  }
  if (mixins) {
    mixins.forEach((m) => mergeOptions(to, m, strats, true));
  }
  for (const key in from) {
    if (asMixin && key === "expose") {
      warn$1(`"expose" option is ignored when declared in mixins or extends. It should only be declared in the base component itself.`);
    } else {
      const strat = internalOptionMergeStrats[key] || strats && strats[key];
      to[key] = strat ? strat(to[key], from[key]) : from[key];
    }
  }
  return to;
}
const internalOptionMergeStrats = {
  data: mergeDataFn,
  props: mergeObjectOptions,
  emits: mergeObjectOptions,
  methods: mergeObjectOptions,
  computed: mergeObjectOptions,
  beforeCreate: mergeAsArray$1,
  created: mergeAsArray$1,
  beforeMount: mergeAsArray$1,
  mounted: mergeAsArray$1,
  beforeUpdate: mergeAsArray$1,
  updated: mergeAsArray$1,
  beforeDestroy: mergeAsArray$1,
  beforeUnmount: mergeAsArray$1,
  destroyed: mergeAsArray$1,
  unmounted: mergeAsArray$1,
  activated: mergeAsArray$1,
  deactivated: mergeAsArray$1,
  errorCaptured: mergeAsArray$1,
  serverPrefetch: mergeAsArray$1,
  components: mergeObjectOptions,
  directives: mergeObjectOptions,
  watch: mergeWatchOptions,
  provide: mergeDataFn,
  inject: mergeInject
};
function mergeDataFn(to, from) {
  if (!from) {
    return to;
  }
  if (!to) {
    return from;
  }
  return function mergedDataFn() {
    return extend(isFunction(to) ? to.call(this, this) : to, isFunction(from) ? from.call(this, this) : from);
  };
}
function mergeInject(to, from) {
  return mergeObjectOptions(normalizeInject(to), normalizeInject(from));
}
function normalizeInject(raw) {
  if (isArray(raw)) {
    const res = {};
    for (let i = 0; i < raw.length; i++) {
      res[raw[i]] = raw[i];
    }
    return res;
  }
  return raw;
}
function mergeAsArray$1(to, from) {
  return to ? [...new Set([].concat(to, from))] : from;
}
function mergeObjectOptions(to, from) {
  return to ? extend(extend(/* @__PURE__ */ Object.create(null), to), from) : from;
}
function mergeWatchOptions(to, from) {
  if (!to)
    return from;
  if (!from)
    return to;
  const merged = extend(/* @__PURE__ */ Object.create(null), to);
  for (const key in from) {
    merged[key] = mergeAsArray$1(to[key], from[key]);
  }
  return merged;
}
function initProps$1(instance, rawProps, isStateful, isSSR = false) {
  const props = {};
  const attrs = {};
  instance.propsDefaults = /* @__PURE__ */ Object.create(null);
  setFullProps(instance, rawProps, props, attrs);
  for (const key in instance.propsOptions[0]) {
    if (!(key in props)) {
      props[key] = void 0;
    }
  }
  {
    validateProps(rawProps || {}, props, instance);
  }
  if (isStateful) {
    instance.props = isSSR ? props : shallowReactive(props);
  } else {
    if (!instance.type.props) {
      instance.props = attrs;
    } else {
      instance.props = props;
    }
  }
  instance.attrs = attrs;
}
function updateProps(instance, rawProps, rawPrevProps, optimized) {
  const { props, attrs, vnode: { patchFlag } } = instance;
  const rawCurrentProps = toRaw(props);
  const [options] = instance.propsOptions;
  let hasAttrsChanged = false;
  if (!(instance.type.__hmrId || instance.parent && instance.parent.type.__hmrId) && (optimized || patchFlag > 0) && !(patchFlag & 16)) {
    if (patchFlag & 8) {
      const propsToUpdate = instance.vnode.dynamicProps;
      for (let i = 0; i < propsToUpdate.length; i++) {
        let key = propsToUpdate[i];
        if (isEmitListener(instance.emitsOptions, key)) {
          continue;
        }
        const value = rawProps[key];
        if (options) {
          if (hasOwn(attrs, key)) {
            if (value !== attrs[key]) {
              attrs[key] = value;
              hasAttrsChanged = true;
            }
          } else {
            const camelizedKey = camelize(key);
            props[camelizedKey] = resolvePropValue(options, rawCurrentProps, camelizedKey, value, instance, false);
          }
        } else {
          if (value !== attrs[key]) {
            attrs[key] = value;
            hasAttrsChanged = true;
          }
        }
      }
    }
  } else {
    if (setFullProps(instance, rawProps, props, attrs)) {
      hasAttrsChanged = true;
    }
    let kebabKey;
    for (const key in rawCurrentProps) {
      if (!rawProps || !hasOwn(rawProps, key) && ((kebabKey = hyphenate(key)) === key || !hasOwn(rawProps, kebabKey))) {
        if (options) {
          if (rawPrevProps && (rawPrevProps[key] !== void 0 || rawPrevProps[kebabKey] !== void 0)) {
            props[key] = resolvePropValue(options, rawCurrentProps, key, void 0, instance, true);
          }
        } else {
          delete props[key];
        }
      }
    }
    if (attrs !== rawCurrentProps) {
      for (const key in attrs) {
        if (!rawProps || !hasOwn(rawProps, key) && true) {
          delete attrs[key];
          hasAttrsChanged = true;
        }
      }
    }
  }
  if (hasAttrsChanged) {
    trigger(instance, "set", "$attrs");
  }
  {
    validateProps(rawProps || {}, props, instance);
  }
}
function setFullProps(instance, rawProps, props, attrs) {
  const [options, needCastKeys] = instance.propsOptions;
  let hasAttrsChanged = false;
  let rawCastValues;
  if (rawProps) {
    for (let key in rawProps) {
      if (isReservedProp(key)) {
        continue;
      }
      const value = rawProps[key];
      let camelKey;
      if (options && hasOwn(options, camelKey = camelize(key))) {
        if (!needCastKeys || !needCastKeys.includes(camelKey)) {
          props[camelKey] = value;
        } else {
          (rawCastValues || (rawCastValues = {}))[camelKey] = value;
        }
      } else if (!isEmitListener(instance.emitsOptions, key)) {
        if (!(key in attrs) || value !== attrs[key]) {
          attrs[key] = value;
          hasAttrsChanged = true;
        }
      }
    }
  }
  if (needCastKeys) {
    const rawCurrentProps = toRaw(props);
    const castValues = rawCastValues || EMPTY_OBJ;
    for (let i = 0; i < needCastKeys.length; i++) {
      const key = needCastKeys[i];
      props[key] = resolvePropValue(options, rawCurrentProps, key, castValues[key], instance, !hasOwn(castValues, key));
    }
  }
  return hasAttrsChanged;
}
function resolvePropValue(options, props, key, value, instance, isAbsent) {
  const opt = options[key];
  if (opt != null) {
    const hasDefault = hasOwn(opt, "default");
    if (hasDefault && value === void 0) {
      const defaultValue = opt.default;
      if (opt.type !== Function && isFunction(defaultValue)) {
        const { propsDefaults } = instance;
        if (key in propsDefaults) {
          value = propsDefaults[key];
        } else {
          setCurrentInstance(instance);
          value = propsDefaults[key] = defaultValue.call(null, props);
          unsetCurrentInstance();
        }
      } else {
        value = defaultValue;
      }
    }
    if (opt[0]) {
      if (isAbsent && !hasDefault) {
        value = false;
      } else if (opt[1] && (value === "" || value === hyphenate(key))) {
        value = true;
      }
    }
  }
  return value;
}
function normalizePropsOptions(comp, appContext, asMixin = false) {
  const cache = appContext.propsCache;
  const cached = cache.get(comp);
  if (cached) {
    return cached;
  }
  const raw = comp.props;
  const normalized = {};
  const needCastKeys = [];
  let hasExtends = false;
  if (!isFunction(comp)) {
    const extendProps = (raw2) => {
      hasExtends = true;
      const [props, keys] = normalizePropsOptions(raw2, appContext, true);
      extend(normalized, props);
      if (keys)
        needCastKeys.push(...keys);
    };
    if (!asMixin && appContext.mixins.length) {
      appContext.mixins.forEach(extendProps);
    }
    if (comp.extends) {
      extendProps(comp.extends);
    }
    if (comp.mixins) {
      comp.mixins.forEach(extendProps);
    }
  }
  if (!raw && !hasExtends) {
    cache.set(comp, EMPTY_ARR);
    return EMPTY_ARR;
  }
  if (isArray(raw)) {
    for (let i = 0; i < raw.length; i++) {
      if (!isString(raw[i])) {
        warn$1(`props must be strings when using array syntax.`, raw[i]);
      }
      const normalizedKey = camelize(raw[i]);
      if (validatePropName(normalizedKey)) {
        normalized[normalizedKey] = EMPTY_OBJ;
      }
    }
  } else if (raw) {
    if (!isObject(raw)) {
      warn$1(`invalid props options`, raw);
    }
    for (const key in raw) {
      const normalizedKey = camelize(key);
      if (validatePropName(normalizedKey)) {
        const opt = raw[key];
        const prop = normalized[normalizedKey] = isArray(opt) || isFunction(opt) ? { type: opt } : opt;
        if (prop) {
          const booleanIndex = getTypeIndex(Boolean, prop.type);
          const stringIndex = getTypeIndex(String, prop.type);
          prop[0] = booleanIndex > -1;
          prop[1] = stringIndex < 0 || booleanIndex < stringIndex;
          if (booleanIndex > -1 || hasOwn(prop, "default")) {
            needCastKeys.push(normalizedKey);
          }
        }
      }
    }
  }
  const res = [normalized, needCastKeys];
  cache.set(comp, res);
  return res;
}
function validatePropName(key) {
  if (key[0] !== "$") {
    return true;
  } else {
    warn$1(`Invalid prop name: "${key}" is a reserved property.`);
  }
  return false;
}
function getType(ctor) {
  const match = ctor && ctor.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ctor === null ? "null" : "";
}
function isSameType(a, b) {
  return getType(a) === getType(b);
}
function getTypeIndex(type, expectedTypes) {
  if (isArray(expectedTypes)) {
    return expectedTypes.findIndex((t) => isSameType(t, type));
  } else if (isFunction(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1;
  }
  return -1;
}
function validateProps(rawProps, props, instance) {
  const resolvedValues = toRaw(props);
  const options = instance.propsOptions[0];
  for (const key in options) {
    let opt = options[key];
    if (opt == null)
      continue;
    validateProp(key, resolvedValues[key], opt, !hasOwn(rawProps, key) && !hasOwn(rawProps, hyphenate(key)));
  }
}
function validateProp(name, value, prop, isAbsent) {
  const { type, required, validator } = prop;
  if (required && isAbsent) {
    warn$1('Missing required prop: "' + name + '"');
    return;
  }
  if (value == null && !prop.required) {
    return;
  }
  if (type != null && type !== true) {
    let isValid = false;
    const types = isArray(type) ? type : [type];
    const expectedTypes = [];
    for (let i = 0; i < types.length && !isValid; i++) {
      const { valid, expectedType } = assertType(value, types[i]);
      expectedTypes.push(expectedType || "");
      isValid = valid;
    }
    if (!isValid) {
      warn$1(getInvalidTypeMessage(name, value, expectedTypes));
      return;
    }
  }
  if (validator && !validator(value)) {
    warn$1('Invalid prop: custom validator check failed for prop "' + name + '".');
  }
}
const isSimpleType = /* @__PURE__ */ makeMap("String,Number,Boolean,Function,Symbol,BigInt");
function assertType(value, type) {
  let valid;
  const expectedType = getType(type);
  if (isSimpleType(expectedType)) {
    const t = typeof value;
    valid = t === expectedType.toLowerCase();
    if (!valid && t === "object") {
      valid = value instanceof type;
    }
  } else if (expectedType === "Object") {
    valid = isObject(value);
  } else if (expectedType === "Array") {
    valid = isArray(value);
  } else if (expectedType === "null") {
    valid = value === null;
  } else {
    valid = value instanceof type;
  }
  return {
    valid,
    expectedType
  };
}
function getInvalidTypeMessage(name, value, expectedTypes) {
  let message = `Invalid prop: type check failed for prop "${name}". Expected ${expectedTypes.map(capitalize).join(" | ")}`;
  const expectedType = expectedTypes[0];
  const receivedType = toRawType(value);
  const expectedValue = styleValue(value, expectedType);
  const receivedValue = styleValue(value, receivedType);
  if (expectedTypes.length === 1 && isExplicable(expectedType) && !isBoolean(expectedType, receivedType)) {
    message += ` with value ${expectedValue}`;
  }
  message += `, got ${receivedType} `;
  if (isExplicable(receivedType)) {
    message += `with value ${receivedValue}.`;
  }
  return message;
}
function styleValue(value, type) {
  if (type === "String") {
    return `"${value}"`;
  } else if (type === "Number") {
    return `${Number(value)}`;
  } else {
    return `${value}`;
  }
}
function isExplicable(type) {
  const explicitTypes = ["string", "number", "boolean"];
  return explicitTypes.some((elem) => type.toLowerCase() === elem);
}
function isBoolean(...args) {
  return args.some((elem) => elem.toLowerCase() === "boolean");
}
function createAppContext() {
  return {
    app: null,
    config: {
      isNativeTag: NO,
      performance: false,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
let uid = 0;
function createAppAPI(render, hydrate) {
  return function createApp2(rootComponent, rootProps = null) {
    if (!isFunction(rootComponent)) {
      rootComponent = Object.assign({}, rootComponent);
    }
    if (rootProps != null && !isObject(rootProps)) {
      warn$1(`root props passed to app.mount() must be an object.`);
      rootProps = null;
    }
    const context = createAppContext();
    const installedPlugins = /* @__PURE__ */ new Set();
    const app = context.app = {
      _uid: uid++,
      _component: rootComponent,
      _props: rootProps,
      _container: null,
      _context: context,
      _instance: null,
      version,
      get config() {
        return context.config;
      },
      set config(v) {
        {
          warn$1(`app.config cannot be replaced. Modify individual options instead.`);
        }
      },
      use(plugin2, ...options) {
        if (installedPlugins.has(plugin2)) {
          warn$1(`Plugin has already been applied to target app.`);
        } else if (plugin2 && isFunction(plugin2.install)) {
          installedPlugins.add(plugin2);
          plugin2.install(app, ...options);
        } else if (isFunction(plugin2)) {
          installedPlugins.add(plugin2);
          plugin2(app, ...options);
        } else {
          warn$1(`A plugin must either be a function or an object with an "install" function.`);
        }
        return app;
      },
      mixin(mixin) {
        {
          if (!context.mixins.includes(mixin)) {
            context.mixins.push(mixin);
          } else {
            warn$1("Mixin has already been applied to target app" + (mixin.name ? `: ${mixin.name}` : ""));
          }
        }
        return app;
      },
      component(name, component) {
        {
          validateComponentName(name, context.config);
        }
        if (!component) {
          return context.components[name];
        }
        if (context.components[name]) {
          warn$1(`Component "${name}" has already been registered in target app.`);
        }
        context.components[name] = component;
        return app;
      },
      directive(name, directive) {
        {
          validateDirectiveName(name);
        }
        if (!directive) {
          return context.directives[name];
        }
        if (context.directives[name]) {
          warn$1(`Directive "${name}" has already been registered in target app.`);
        }
        context.directives[name] = directive;
        return app;
      },
      mount() {
      },
      unmount() {
      },
      provide(key, value) {
        if (key in context.provides) {
          warn$1(`App already provides property with key "${String(key)}". It will be overwritten with the new value.`);
        }
        context.provides[key] = value;
        return app;
      }
    };
    return app;
  };
}
const queuePostRenderEffect = queuePostFlushCb;
function isVNode(value) {
  return value ? value.__v_isVNode === true : false;
}
const emptyAppContext = createAppContext();
let uid$1 = 0;
function createComponentInstance(vnode, parent, suspense) {
  const type = vnode.type;
  const appContext = (parent ? parent.appContext : vnode.appContext) || emptyAppContext;
  const instance = {
    uid: uid$1++,
    vnode,
    type,
    parent,
    appContext,
    root: null,
    next: null,
    subTree: null,
    effect: null,
    update: null,
    scope: new EffectScope(true),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: parent ? parent.provides : Object.create(appContext.provides),
    accessCache: null,
    renderCache: [],
    components: null,
    directives: null,
    propsOptions: normalizePropsOptions(type, appContext),
    emitsOptions: normalizeEmitsOptions(type, appContext),
    emit: null,
    emitted: null,
    propsDefaults: EMPTY_OBJ,
    inheritAttrs: type.inheritAttrs,
    ctx: EMPTY_OBJ,
    data: EMPTY_OBJ,
    props: EMPTY_OBJ,
    attrs: EMPTY_OBJ,
    slots: EMPTY_OBJ,
    refs: EMPTY_OBJ,
    setupState: EMPTY_OBJ,
    setupContext: null,
    suspense,
    suspenseId: suspense ? suspense.pendingId : 0,
    asyncDep: null,
    asyncResolved: false,
    isMounted: false,
    isUnmounted: false,
    isDeactivated: false,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null
  };
  {
    instance.ctx = createDevRenderContext(instance);
  }
  instance.root = parent ? parent.root : instance;
  instance.emit = emit$1.bind(null, instance);
  if (vnode.ce) {
    vnode.ce(instance);
  }
  return instance;
}
let currentInstance = null;
const getCurrentInstance = () => currentInstance || currentRenderingInstance;
const setCurrentInstance = (instance) => {
  currentInstance = instance;
  instance.scope.on();
};
const unsetCurrentInstance = () => {
  currentInstance && currentInstance.scope.off();
  currentInstance = null;
};
const isBuiltInTag = /* @__PURE__ */ makeMap("slot,component");
function validateComponentName(name, config) {
  const appIsNativeTag = config.isNativeTag || NO;
  if (isBuiltInTag(name) || appIsNativeTag(name)) {
    warn$1("Do not use built-in or reserved HTML elements as component id: " + name);
  }
}
function isStatefulComponent(instance) {
  return instance.vnode.shapeFlag & 4;
}
let isInSSRComponentSetup = false;
function setupComponent(instance, isSSR = false) {
  isInSSRComponentSetup = isSSR;
  const { props } = instance.vnode;
  const isStateful = isStatefulComponent(instance);
  initProps$1(instance, props, isStateful, isSSR);
  const setupResult = isStateful ? setupStatefulComponent(instance, isSSR) : void 0;
  isInSSRComponentSetup = false;
  return setupResult;
}
function setupStatefulComponent(instance, isSSR) {
  const Component2 = instance.type;
  {
    if (Component2.name) {
      validateComponentName(Component2.name, instance.appContext.config);
    }
    if (Component2.components) {
      const names = Object.keys(Component2.components);
      for (let i = 0; i < names.length; i++) {
        validateComponentName(names[i], instance.appContext.config);
      }
    }
    if (Component2.directives) {
      const names = Object.keys(Component2.directives);
      for (let i = 0; i < names.length; i++) {
        validateDirectiveName(names[i]);
      }
    }
    if (Component2.compilerOptions && isRuntimeOnly()) {
      warn$1(`"compilerOptions" is only supported when using a build of Vue that includes the runtime compiler. Since you are using a runtime-only build, the options should be passed via your build tool config instead.`);
    }
  }
  instance.accessCache = /* @__PURE__ */ Object.create(null);
  instance.proxy = markRaw(new Proxy(instance.ctx, PublicInstanceProxyHandlers));
  {
    exposePropsOnRenderContext(instance);
  }
  const { setup } = Component2;
  if (setup) {
    const setupContext = instance.setupContext = setup.length > 1 ? createSetupContext(instance) : null;
    setCurrentInstance(instance);
    pauseTracking();
    const setupResult = callWithErrorHandling(setup, instance, 0, [shallowReadonly(instance.props), setupContext]);
    resetTracking();
    unsetCurrentInstance();
    if (isPromise(setupResult)) {
      setupResult.then(unsetCurrentInstance, unsetCurrentInstance);
      {
        warn$1(`setup() returned a Promise, but the version of Vue you are using does not support it yet.`);
      }
    } else {
      handleSetupResult(instance, setupResult, isSSR);
    }
  } else {
    finishComponentSetup(instance, isSSR);
  }
}
function handleSetupResult(instance, setupResult, isSSR) {
  if (isFunction(setupResult)) {
    {
      instance.render = setupResult;
    }
  } else if (isObject(setupResult)) {
    if (isVNode(setupResult)) {
      warn$1(`setup() should not return VNodes directly - return a render function instead.`);
    }
    {
      instance.devtoolsRawSetupState = setupResult;
    }
    instance.setupState = proxyRefs(setupResult);
    {
      exposeSetupStateOnRenderContext(instance);
    }
  } else if (setupResult !== void 0) {
    warn$1(`setup() should return an object. Received: ${setupResult === null ? "null" : typeof setupResult}`);
  }
  finishComponentSetup(instance, isSSR);
}
let compile;
const isRuntimeOnly = () => !compile;
function finishComponentSetup(instance, isSSR, skipOptions) {
  const Component2 = instance.type;
  if (!instance.render) {
    instance.render = Component2.render || NOOP;
  }
  {
    setCurrentInstance(instance);
    pauseTracking();
    applyOptions$1(instance);
    resetTracking();
    unsetCurrentInstance();
  }
  if (!Component2.render && instance.render === NOOP && !isSSR) {
    if (Component2.template) {
      warn$1(`Component provided template option but runtime compilation is not supported in this build of Vue. Configure your bundler to alias "vue" to "vue/dist/vue.esm-bundler.js".`);
    } else {
      warn$1(`Component is missing template or render function.`);
    }
  }
}
function createAttrsProxy(instance) {
  return new Proxy(instance.attrs, {
    get(target, key) {
      track(instance, "get", "$attrs");
      return target[key];
    },
    set() {
      warn$1(`setupContext.attrs is readonly.`);
      return false;
    },
    deleteProperty() {
      warn$1(`setupContext.attrs is readonly.`);
      return false;
    }
  });
}
function createSetupContext(instance) {
  const expose = (exposed) => {
    if (instance.exposed) {
      warn$1(`expose() should be called only once per setup().`);
    }
    instance.exposed = exposed || {};
  };
  let attrs;
  {
    return Object.freeze({
      get attrs() {
        return attrs || (attrs = createAttrsProxy(instance));
      },
      get slots() {
        return shallowReadonly(instance.slots);
      },
      get emit() {
        return (event, ...args) => instance.emit(event, ...args);
      },
      expose
    });
  }
}
function getExposeProxy(instance) {
  if (instance.exposed) {
    return instance.exposeProxy || (instance.exposeProxy = new Proxy(proxyRefs(markRaw(instance.exposed)), {
      get(target, key) {
        if (key in target) {
          return target[key];
        }
        return instance.proxy[key];
      }
    }));
  }
}
const classifyRE = /(?:^|[-_])(\w)/g;
const classify = (str) => str.replace(classifyRE, (c) => c.toUpperCase()).replace(/[-_]/g, "");
function getComponentName(Component2, includeInferred = true) {
  return isFunction(Component2) ? Component2.displayName || Component2.name : Component2.name || includeInferred && Component2.__name;
}
function formatComponentName(instance, Component2, isRoot = false) {
  let name = getComponentName(Component2);
  if (!name && Component2.__file) {
    const match = Component2.__file.match(/([^/\\]+)\.\w+$/);
    if (match) {
      name = match[1];
    }
  }
  if (!name && instance && instance.parent) {
    const inferFromRegistry = (registry) => {
      for (const key in registry) {
        if (registry[key] === Component2) {
          return key;
        }
      }
    };
    name = inferFromRegistry(instance.components || instance.parent.type.components) || inferFromRegistry(instance.appContext.components);
  }
  return name ? classify(name) : isRoot ? `App` : `Anonymous`;
}
const computed$1 = (getterOrOptions, debugOptions) => {
  return computed(getterOrOptions, debugOptions, isInSSRComponentSetup);
};
const version = "3.2.37";
function unwrapper(target) {
  return unref(target);
}
const ARRAYTYPE = "[object Array]";
const OBJECTTYPE = "[object Object]";
function diff(current, pre) {
  const result = {};
  syncKeys(current, pre);
  _diff(current, pre, "", result);
  return result;
}
function syncKeys(current, pre) {
  current = unwrapper(current);
  if (current === pre)
    return;
  const rootCurrentType = toTypeString(current);
  const rootPreType = toTypeString(pre);
  if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
    for (let key in pre) {
      const currentValue = current[key];
      if (currentValue === void 0) {
        current[key] = null;
      } else {
        syncKeys(currentValue, pre[key]);
      }
    }
  } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
    if (current.length >= pre.length) {
      pre.forEach((item, index2) => {
        syncKeys(current[index2], item);
      });
    }
  }
}
function _diff(current, pre, path, result) {
  current = unwrapper(current);
  if (current === pre)
    return;
  const rootCurrentType = toTypeString(current);
  const rootPreType = toTypeString(pre);
  if (rootCurrentType == OBJECTTYPE) {
    if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
      setResult(result, path, current);
    } else {
      for (let key in current) {
        const currentValue = unwrapper(current[key]);
        const preValue = pre[key];
        const currentType = toTypeString(currentValue);
        const preType = toTypeString(preValue);
        if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
          if (currentValue != preValue) {
            setResult(result, (path == "" ? "" : path + ".") + key, currentValue);
          }
        } else if (currentType == ARRAYTYPE) {
          if (preType != ARRAYTYPE) {
            setResult(result, (path == "" ? "" : path + ".") + key, currentValue);
          } else {
            if (currentValue.length < preValue.length) {
              setResult(result, (path == "" ? "" : path + ".") + key, currentValue);
            } else {
              currentValue.forEach((item, index2) => {
                _diff(item, preValue[index2], (path == "" ? "" : path + ".") + key + "[" + index2 + "]", result);
              });
            }
          }
        } else if (currentType == OBJECTTYPE) {
          if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
            setResult(result, (path == "" ? "" : path + ".") + key, currentValue);
          } else {
            for (let subKey in currentValue) {
              _diff(currentValue[subKey], preValue[subKey], (path == "" ? "" : path + ".") + key + "." + subKey, result);
            }
          }
        }
      }
    }
  } else if (rootCurrentType == ARRAYTYPE) {
    if (rootPreType != ARRAYTYPE) {
      setResult(result, path, current);
    } else {
      if (current.length < pre.length) {
        setResult(result, path, current);
      } else {
        current.forEach((item, index2) => {
          _diff(item, pre[index2], path + "[" + index2 + "]", result);
        });
      }
    }
  } else {
    setResult(result, path, current);
  }
}
function setResult(result, k, v) {
  result[k] = v;
}
function hasComponentEffect(instance) {
  return queue.includes(instance.update);
}
function flushCallbacks(instance) {
  const ctx = instance.ctx;
  const callbacks = ctx.__next_tick_callbacks;
  if (callbacks && callbacks.length) {
    const copies = callbacks.slice(0);
    callbacks.length = 0;
    for (let i = 0; i < copies.length; i++) {
      copies[i]();
    }
  }
}
function nextTick$1(instance, fn) {
  const ctx = instance.ctx;
  if (!ctx.__next_tick_pending && !hasComponentEffect(instance)) {
    return nextTick(fn && fn.bind(instance.proxy));
  }
  let _resolve;
  if (!ctx.__next_tick_callbacks) {
    ctx.__next_tick_callbacks = [];
  }
  ctx.__next_tick_callbacks.push(() => {
    if (fn) {
      callWithErrorHandling(fn.bind(instance.proxy), instance, 14);
    } else if (_resolve) {
      _resolve(instance.proxy);
    }
  });
  return new Promise((resolve2) => {
    _resolve = resolve2;
  });
}
function clone(src, seen) {
  src = unwrapper(src);
  const type = typeof src;
  if (type === "object" && src !== null) {
    let copy = seen.get(src);
    if (typeof copy !== "undefined") {
      return copy;
    }
    if (isArray(src)) {
      const len = src.length;
      copy = new Array(len);
      seen.set(src, copy);
      for (let i = 0; i < len; i++) {
        copy[i] = clone(src[i], seen);
      }
    } else {
      copy = {};
      seen.set(src, copy);
      for (const name in src) {
        if (hasOwn(src, name)) {
          copy[name] = clone(src[name], seen);
        }
      }
    }
    return copy;
  }
  if (type !== "symbol") {
    return src;
  }
}
function deepCopy(src) {
  return clone(src, typeof WeakMap !== "undefined" ? /* @__PURE__ */ new WeakMap() : /* @__PURE__ */ new Map());
}
function getMPInstanceData(instance, keys) {
  const data = instance.data;
  const ret = /* @__PURE__ */ Object.create(null);
  keys.forEach((key) => {
    ret[key] = data[key];
  });
  return ret;
}
function patch(instance, data, oldData) {
  if (!data) {
    return;
  }
  data = deepCopy(data);
  const ctx = instance.ctx;
  const mpType = ctx.mpType;
  if (mpType === "page" || mpType === "component") {
    data.r0 = 1;
    const mpInstance = ctx.$scope;
    const keys = Object.keys(data);
    const diffData = diff(data, oldData || getMPInstanceData(mpInstance, keys));
    if (Object.keys(diffData).length) {
      ctx.__next_tick_pending = true;
      mpInstance.setData(diffData, () => {
        ctx.__next_tick_pending = false;
        flushCallbacks(instance);
      });
      flushPreFlushCbs(void 0, instance.update);
    } else {
      flushCallbacks(instance);
    }
  }
}
function initAppConfig(appConfig) {
  appConfig.globalProperties.$nextTick = function $nextTick(fn) {
    return nextTick$1(this.$, fn);
  };
}
function onApplyOptions(options, instance, publicThis) {
  instance.appContext.config.globalProperties.$applyOptions(options, instance, publicThis);
  const computedOptions = options.computed;
  if (computedOptions) {
    const keys = Object.keys(computedOptions);
    if (keys.length) {
      const ctx = instance.ctx;
      if (!ctx.$computedKeys) {
        ctx.$computedKeys = [];
      }
      ctx.$computedKeys.push(...keys);
    }
  }
  delete instance.ctx.$onApplyOptions;
}
function setRef$1(instance, isUnmount = false) {
  const { setupState, $templateRefs, ctx: { $scope, $mpPlatform } } = instance;
  if ($mpPlatform === "mp-alipay") {
    return;
  }
  if (!$templateRefs || !$scope) {
    return;
  }
  if (isUnmount) {
    return $templateRefs.forEach((templateRef) => setTemplateRef(templateRef, null, setupState));
  }
  const check = $mpPlatform === "mp-baidu" || $mpPlatform === "mp-toutiao";
  const doSetByRefs = (refs) => {
    const mpComponents = $scope.selectAllComponents(".r").concat($scope.selectAllComponents(".r-i-f"));
    return refs.filter((templateRef) => {
      const refValue = findComponentPublicInstance(mpComponents, templateRef.i);
      if (check && refValue === null) {
        return true;
      }
      setTemplateRef(templateRef, refValue, setupState);
      return false;
    });
  };
  const doSet = () => {
    const refs = doSetByRefs($templateRefs);
    if (refs.length && instance.proxy && instance.proxy.$scope) {
      instance.proxy.$scope.setData({ r1: 1 }, () => {
        doSetByRefs(refs);
      });
    }
  };
  if ($scope._$setRef) {
    $scope._$setRef(doSet);
  } else {
    nextTick$1(instance, doSet);
  }
}
function findComponentPublicInstance(mpComponents, id) {
  const mpInstance = mpComponents.find((com) => com && (com.properties || com.props).uI === id);
  if (mpInstance) {
    const vm = mpInstance.$vm;
    if (vm) {
      return getExposeProxy(vm.$) || vm;
    }
    return mpInstance;
  }
  return null;
}
function setTemplateRef({ r, f }, refValue, setupState) {
  if (isFunction(r)) {
    r(refValue, {});
  } else {
    const _isString = isString(r);
    const _isRef = isRef(r);
    if (_isString || _isRef) {
      if (f) {
        if (!_isRef) {
          return;
        }
        if (!isArray(r.value)) {
          r.value = [];
        }
        const existing = r.value;
        if (existing.indexOf(refValue) === -1) {
          existing.push(refValue);
          if (!refValue) {
            return;
          }
          onBeforeUnmount(() => remove(existing, refValue), refValue.$);
        }
      } else if (_isString) {
        if (hasOwn(setupState, r)) {
          setupState[r] = refValue;
        }
      } else if (isRef(r)) {
        r.value = refValue;
      } else {
        warnRef(r);
      }
    } else {
      warnRef(r);
    }
  }
}
function warnRef(ref2) {
  warn$1("Invalid template ref type:", ref2, `(${typeof ref2})`);
}
var MPType;
(function(MPType2) {
  MPType2["APP"] = "app";
  MPType2["PAGE"] = "page";
  MPType2["COMPONENT"] = "component";
})(MPType || (MPType = {}));
const queuePostRenderEffect$1 = queuePostFlushCb;
function mountComponent(initialVNode, options) {
  const instance = initialVNode.component = createComponentInstance(initialVNode, options.parentComponent, null);
  {
    instance.ctx.$onApplyOptions = onApplyOptions;
    instance.ctx.$children = [];
  }
  if (options.mpType === "app") {
    instance.render = NOOP;
  }
  if (options.onBeforeSetup) {
    options.onBeforeSetup(instance, options);
  }
  {
    pushWarningContext(initialVNode);
  }
  setupComponent(instance);
  {
    if (options.parentComponent && instance.proxy) {
      options.parentComponent.ctx.$children.push(getExposeProxy(instance) || instance.proxy);
    }
  }
  setupRenderEffect(instance);
  {
    popWarningContext();
  }
  return instance.proxy;
}
const getFunctionalFallthrough = (attrs) => {
  let res;
  for (const key in attrs) {
    if (key === "class" || key === "style" || isOn(key)) {
      (res || (res = {}))[key] = attrs[key];
    }
  }
  return res;
};
function renderComponentRoot(instance) {
  const { type: Component2, vnode, proxy, withProxy, props, propsOptions: [propsOptions], slots, attrs, emit: emit2, render, renderCache, data, setupState, ctx, uid: uid2, appContext: { app: { config: { globalProperties: { pruneComponentPropsCache: pruneComponentPropsCache2 } } } }, inheritAttrs } = instance;
  instance.$templateRefs = [];
  instance.$ei = 0;
  pruneComponentPropsCache2(uid2);
  instance.__counter = instance.__counter === 0 ? 1 : 0;
  let result;
  const prev = setCurrentRenderingInstance(instance);
  try {
    if (vnode.shapeFlag & 4) {
      fallthroughAttrs(inheritAttrs, props, propsOptions, attrs);
      const proxyToUse = withProxy || proxy;
      result = render.call(proxyToUse, proxyToUse, renderCache, props, setupState, data, ctx);
    } else {
      fallthroughAttrs(inheritAttrs, props, propsOptions, Component2.props ? attrs : getFunctionalFallthrough(attrs));
      const render2 = Component2;
      result = render2.length > 1 ? render2(props, { attrs, slots, emit: emit2 }) : render2(props, null);
    }
  } catch (err) {
    handleError(err, instance, 1);
    result = false;
  }
  setRef$1(instance);
  setCurrentRenderingInstance(prev);
  return result;
}
function fallthroughAttrs(inheritAttrs, props, propsOptions, fallthroughAttrs2) {
  if (props && fallthroughAttrs2 && inheritAttrs !== false) {
    const keys = Object.keys(fallthroughAttrs2).filter((key) => key !== "class" && key !== "style");
    if (!keys.length) {
      return;
    }
    if (propsOptions && keys.some(isModelListener)) {
      keys.forEach((key) => {
        if (!isModelListener(key) || !(key.slice(9) in propsOptions)) {
          props[key] = fallthroughAttrs2[key];
        }
      });
    } else {
      keys.forEach((key) => props[key] = fallthroughAttrs2[key]);
    }
  }
}
const updateComponentPreRender = (instance) => {
  pauseTracking();
  flushPreFlushCbs(void 0, instance.update);
  resetTracking();
};
function componentUpdateScopedSlotsFn() {
  const scopedSlotsData = this.$scopedSlotsData;
  if (!scopedSlotsData || scopedSlotsData.length === 0) {
    return;
  }
  const mpInstance = this.ctx.$scope;
  const oldData = mpInstance.data;
  const diffData = /* @__PURE__ */ Object.create(null);
  scopedSlotsData.forEach(({ path, index: index2, data }) => {
    const oldScopedSlotData = getValueByDataPath(oldData, path);
    const diffPath = isString(index2) ? `${path}.${index2}` : `${path}[${index2}]`;
    if (typeof oldScopedSlotData === "undefined" || typeof oldScopedSlotData[index2] === "undefined") {
      diffData[diffPath] = data;
    } else {
      const diffScopedSlotData = diff(data, oldScopedSlotData[index2]);
      Object.keys(diffScopedSlotData).forEach((name) => {
        diffData[diffPath + "." + name] = diffScopedSlotData[name];
      });
    }
  });
  scopedSlotsData.length = 0;
  if (Object.keys(diffData).length) {
    mpInstance.setData(diffData);
  }
}
function toggleRecurse({ effect, update }, allowed) {
  effect.allowRecurse = update.allowRecurse = allowed;
}
function setupRenderEffect(instance) {
  const updateScopedSlots = componentUpdateScopedSlotsFn.bind(instance);
  instance.$updateScopedSlots = () => nextTick(() => queueJob(updateScopedSlots));
  const componentUpdateFn = () => {
    if (!instance.isMounted) {
      onBeforeUnmount(() => {
        setRef$1(instance, true);
      }, instance);
      patch(instance, renderComponentRoot(instance));
    } else {
      const { bu, u } = instance;
      toggleRecurse(instance, false);
      updateComponentPreRender(instance);
      if (bu) {
        invokeArrayFns$1(bu);
      }
      toggleRecurse(instance, true);
      patch(instance, renderComponentRoot(instance));
      if (u) {
        queuePostRenderEffect$1(u);
      }
    }
  };
  const effect = instance.effect = new ReactiveEffect(componentUpdateFn, () => queueJob(instance.update), instance.scope);
  const update = instance.update = effect.run.bind(effect);
  update.id = instance.uid;
  toggleRecurse(instance, true);
  {
    effect.onTrack = instance.rtc ? (e2) => invokeArrayFns$1(instance.rtc, e2) : void 0;
    effect.onTrigger = instance.rtg ? (e2) => invokeArrayFns$1(instance.rtg, e2) : void 0;
    update.ownerInstance = instance;
  }
  update();
}
function unmountComponent(instance) {
  const { bum, scope, update, um } = instance;
  if (bum) {
    invokeArrayFns$1(bum);
  }
  scope.stop();
  if (update) {
    update.active = false;
  }
  if (um) {
    queuePostRenderEffect$1(um);
  }
  queuePostRenderEffect$1(() => {
    instance.isUnmounted = true;
  });
}
const oldCreateApp = createAppAPI();
function createVueApp(rootComponent, rootProps = null) {
  const app = oldCreateApp(rootComponent, rootProps);
  const appContext = app._context;
  initAppConfig(appContext.config);
  const createVNode = (initialVNode) => {
    initialVNode.appContext = appContext;
    initialVNode.shapeFlag = 6;
    return initialVNode;
  };
  const createComponent2 = function createComponent3(initialVNode, options) {
    return mountComponent(createVNode(initialVNode), options);
  };
  const destroyComponent = function destroyComponent2(component) {
    return component && unmountComponent(component.$);
  };
  app.mount = function mount() {
    rootComponent.render = NOOP;
    const instance = mountComponent(createVNode({ type: rootComponent }), {
      mpType: MPType.APP,
      mpInstance: null,
      parentComponent: null,
      slots: [],
      props: null
    });
    app._instance = instance.$;
    instance.$app = app;
    instance.$createComponent = createComponent2;
    instance.$destroyComponent = destroyComponent;
    appContext.$appInstance = instance;
    return instance;
  };
  app.unmount = function unmount() {
    warn$1(`Cannot unmount an app.`);
  };
  return app;
}
function injectLifecycleHook(name, hook, publicThis, instance) {
  if (isFunction(hook)) {
    injectHook(name, hook.bind(publicThis), instance);
  }
}
function initHooks$1(options, instance, publicThis) {
  const mpType = options.mpType || publicThis.$mpType;
  if (!mpType) {
    return;
  }
  Object.keys(options).forEach((name) => {
    if (name.indexOf("on") === 0) {
      const hooks = options[name];
      if (isArray(hooks)) {
        hooks.forEach((hook) => injectLifecycleHook(name, hook, publicThis, instance));
      } else {
        injectLifecycleHook(name, hooks, publicThis, instance);
      }
    }
  });
}
function applyOptions$2(options, instance, publicThis) {
  initHooks$1(options, instance, publicThis);
}
function set(target, key, val) {
  return target[key] = val;
}
function createErrorHandler(app) {
  return function errorHandler(err, instance, _info) {
    if (!instance) {
      throw err;
    }
    const appInstance = app._instance;
    if (!appInstance || !appInstance.proxy) {
      throw err;
    }
    {
      appInstance.proxy.$callHook(ON_ERROR, err);
    }
  };
}
function mergeAsArray(to, from) {
  return to ? [...new Set([].concat(to, from))] : from;
}
function initOptionMergeStrategies(optionMergeStrategies) {
  UniLifecycleHooks.forEach((name) => {
    optionMergeStrategies[name] = mergeAsArray;
  });
}
let realAtob;
const b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
const b64re = /^(?:[A-Za-z\d+/]{4})*?(?:[A-Za-z\d+/]{2}(?:==)?|[A-Za-z\d+/]{3}=?)?$/;
if (typeof atob !== "function") {
  realAtob = function(str) {
    str = String(str).replace(/[\t\n\f\r ]+/g, "");
    if (!b64re.test(str)) {
      throw new Error("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");
    }
    str += "==".slice(2 - (str.length & 3));
    var bitmap;
    var result = "";
    var r1;
    var r2;
    var i = 0;
    for (; i < str.length; ) {
      bitmap = b64.indexOf(str.charAt(i++)) << 18 | b64.indexOf(str.charAt(i++)) << 12 | (r1 = b64.indexOf(str.charAt(i++))) << 6 | (r2 = b64.indexOf(str.charAt(i++)));
      result += r1 === 64 ? String.fromCharCode(bitmap >> 16 & 255) : r2 === 64 ? String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255) : String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255, bitmap & 255);
    }
    return result;
  };
} else {
  realAtob = atob;
}
function b64DecodeUnicode(str) {
  return decodeURIComponent(realAtob(str).split("").map(function(c) {
    return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(""));
}
function getCurrentUserInfo() {
  const token = index.getStorageSync("uni_id_token") || "";
  const tokenArr = token.split(".");
  if (!token || tokenArr.length !== 3) {
    return {
      uid: null,
      role: [],
      permission: [],
      tokenExpired: 0
    };
  }
  let userInfo;
  try {
    userInfo = JSON.parse(b64DecodeUnicode(tokenArr[1]));
  } catch (error) {
    throw new Error("\u83B7\u53D6\u5F53\u524D\u7528\u6237\u4FE1\u606F\u51FA\u9519\uFF0C\u8BE6\u7EC6\u9519\u8BEF\u4FE1\u606F\u4E3A\uFF1A" + error.message);
  }
  userInfo.tokenExpired = userInfo.exp * 1e3;
  delete userInfo.exp;
  delete userInfo.iat;
  return userInfo;
}
function uniIdMixin(globalProperties) {
  globalProperties.uniIDHasRole = function(roleId) {
    const { role } = getCurrentUserInfo();
    return role.indexOf(roleId) > -1;
  };
  globalProperties.uniIDHasPermission = function(permissionId) {
    const { permission } = getCurrentUserInfo();
    return this.uniIDHasRole("admin") || permission.indexOf(permissionId) > -1;
  };
  globalProperties.uniIDTokenValid = function() {
    const { tokenExpired } = getCurrentUserInfo();
    return tokenExpired > Date.now();
  };
}
function initApp(app) {
  const appConfig = app._context.config;
  if (isFunction(app._component.onError)) {
    appConfig.errorHandler = createErrorHandler(app);
  }
  initOptionMergeStrategies(appConfig.optionMergeStrategies);
  const globalProperties = appConfig.globalProperties;
  {
    uniIdMixin(globalProperties);
  }
  {
    globalProperties.$set = set;
    globalProperties.$applyOptions = applyOptions$2;
  }
  {
    index.invokeCreateVueAppHook(app);
  }
}
const propsCaches = /* @__PURE__ */ Object.create(null);
function pruneComponentPropsCache(uid2) {
  delete propsCaches[uid2];
}
function findComponentPropsData(up) {
  if (!up) {
    return;
  }
  const [uid2, propsId] = up.split(",");
  if (!propsCaches[uid2]) {
    return;
  }
  return propsCaches[uid2][parseInt(propsId)];
}
var plugin = {
  install(app) {
    initApp(app);
    app.config.globalProperties.pruneComponentPropsCache = pruneComponentPropsCache;
    const oldMount = app.mount;
    app.mount = function mount(rootContainer) {
      const instance = oldMount.call(app, rootContainer);
      const createApp2 = getCreateApp();
      if (createApp2) {
        createApp2(instance);
      } else {
        if (typeof createMiniProgramApp !== "undefined") {
          createMiniProgramApp(instance);
        }
      }
      return instance;
    };
  }
};
function getCreateApp() {
  const method = "createApp";
  if (typeof global !== "undefined") {
    return global[method];
  } else if (typeof my !== "undefined") {
    return my[method];
  }
}
function vOn(value, key) {
  const instance = getCurrentInstance();
  const ctx = instance.ctx;
  const extraKey = typeof key !== "undefined" && (ctx.$mpPlatform === "mp-weixin" || ctx.$mpPlatform === "mp-qq") && (isString(key) || typeof key === "number") ? "_" + key : "";
  const name = "e" + instance.$ei++ + extraKey;
  const mpInstance = ctx.$scope;
  if (!value) {
    delete mpInstance[name];
    return name;
  }
  const existingInvoker = mpInstance[name];
  if (existingInvoker) {
    existingInvoker.value = value;
  } else {
    mpInstance[name] = createInvoker(value, instance);
  }
  return name;
}
function createInvoker(initialValue, instance) {
  const invoker = (e2) => {
    patchMPEvent(e2);
    let args = [e2];
    if (e2.detail && e2.detail.__args__) {
      args = e2.detail.__args__;
    }
    const eventValue = invoker.value;
    const invoke = () => callWithAsyncErrorHandling(patchStopImmediatePropagation(e2, eventValue), instance, 5, args);
    const eventTarget = e2.target;
    const eventSync = eventTarget ? eventTarget.dataset ? eventTarget.dataset.eventsync === "true" : false : false;
    if (bubbles.includes(e2.type) && !eventSync) {
      setTimeout(invoke);
    } else {
      const res = invoke();
      if (e2.type === "input" && (isArray(res) || isPromise(res))) {
        return;
      }
      return res;
    }
  };
  invoker.value = initialValue;
  return invoker;
}
const bubbles = [
  "tap",
  "longpress",
  "longtap",
  "transitionend",
  "animationstart",
  "animationiteration",
  "animationend",
  "touchforcechange"
];
function patchMPEvent(event) {
  if (event.type && event.target) {
    event.preventDefault = NOOP;
    event.stopPropagation = NOOP;
    event.stopImmediatePropagation = NOOP;
    if (!hasOwn(event, "detail")) {
      event.detail = {};
    }
    if (hasOwn(event, "markerId")) {
      event.detail = typeof event.detail === "object" ? event.detail : {};
      event.detail.markerId = event.markerId;
    }
    if (isPlainObject(event.detail) && hasOwn(event.detail, "checked") && !hasOwn(event.detail, "value")) {
      event.detail.value = event.detail.checked;
    }
    if (isPlainObject(event.detail)) {
      event.target = extend({}, event.target, event.detail);
    }
  }
}
function patchStopImmediatePropagation(e2, value) {
  if (isArray(value)) {
    const originalStop = e2.stopImmediatePropagation;
    e2.stopImmediatePropagation = () => {
      originalStop && originalStop.call(e2);
      e2._stopped = true;
    };
    return value.map((fn) => (e3) => !e3._stopped && fn(e3));
  } else {
    return value;
  }
}
const o = (value, key) => vOn(value, key);
const e = (target, ...sources) => extend(target, ...sources);
function createApp$1(rootComponent, rootProps = null) {
  rootComponent && (rootComponent.mpType = "app");
  return createVueApp(rootComponent, rootProps).use(plugin);
}
const createSSRApp = createApp$1;
const eventChannels = {};
const eventChannelStack = [];
function getEventChannel(id) {
  if (id) {
    const eventChannel = eventChannels[id];
    delete eventChannels[id];
    return eventChannel;
  }
  return eventChannelStack.shift();
}
const MP_METHODS = [
  "createSelectorQuery",
  "createIntersectionObserver",
  "selectAllComponents",
  "selectComponent"
];
function createEmitFn(oldEmit, ctx) {
  return function emit2(event, ...args) {
    const scope = ctx.$scope;
    if (scope && event) {
      const detail = { __args__: args };
      {
        scope.triggerEvent(event, detail);
      }
    }
    return oldEmit.apply(this, [event, ...args]);
  };
}
function initBaseInstance(instance, options) {
  const ctx = instance.ctx;
  ctx.mpType = options.mpType;
  ctx.$mpType = options.mpType;
  ctx.$mpPlatform = "mp-weixin";
  ctx.$scope = options.mpInstance;
  ctx.$mp = {};
  {
    ctx._self = {};
  }
  instance.slots = {};
  if (isArray(options.slots) && options.slots.length) {
    options.slots.forEach((name) => {
      instance.slots[name] = true;
    });
    if (instance.slots[SLOT_DEFAULT_NAME]) {
      instance.slots.default = true;
    }
  }
  ctx.getOpenerEventChannel = function() {
    {
      return options.mpInstance.getOpenerEventChannel();
    }
  };
  ctx.$hasHook = hasHook;
  ctx.$callHook = callHook;
  instance.emit = createEmitFn(instance.emit, ctx);
}
function initComponentInstance(instance, options) {
  initBaseInstance(instance, options);
  const ctx = instance.ctx;
  MP_METHODS.forEach((method) => {
    ctx[method] = function(...args) {
      const mpInstance = ctx.$scope;
      if (mpInstance && mpInstance[method]) {
        return mpInstance[method].apply(mpInstance, args);
      }
    };
  });
}
function initMocks(instance, mpInstance, mocks2) {
  const ctx = instance.ctx;
  mocks2.forEach((mock) => {
    if (hasOwn(mpInstance, mock)) {
      instance[mock] = ctx[mock] = mpInstance[mock];
    }
  });
}
function hasHook(name) {
  const hooks = this.$[name];
  if (hooks && hooks.length) {
    return true;
  }
  return false;
}
function callHook(name, args) {
  if (name === "mounted") {
    callHook.call(this, "bm");
    this.$.isMounted = true;
    name = "m";
  } else if (name === "onLoad" && args && args.__id__) {
    this.__eventChannel__ = getEventChannel(args.__id__);
    delete args.__id__;
  }
  const hooks = this.$[name];
  return hooks && invokeArrayFns(hooks, args);
}
const PAGE_INIT_HOOKS = [
  ON_LOAD,
  ON_SHOW,
  ON_HIDE,
  ON_UNLOAD,
  ON_RESIZE,
  ON_TAB_ITEM_TAP,
  ON_REACH_BOTTOM,
  ON_PULL_DOWN_REFRESH,
  ON_ADD_TO_FAVORITES
];
function findHooks(vueOptions, hooks = /* @__PURE__ */ new Set()) {
  if (vueOptions) {
    Object.keys(vueOptions).forEach((name) => {
      if (name.indexOf("on") === 0 && isFunction(vueOptions[name])) {
        hooks.add(name);
      }
    });
    {
      const { extends: extendsOptions, mixins } = vueOptions;
      if (mixins) {
        mixins.forEach((mixin) => findHooks(mixin, hooks));
      }
      if (extendsOptions) {
        findHooks(extendsOptions, hooks);
      }
    }
  }
  return hooks;
}
function initHook(mpOptions, hook, excludes) {
  if (excludes.indexOf(hook) === -1 && !hasOwn(mpOptions, hook)) {
    mpOptions[hook] = function(args) {
      return this.$vm && this.$vm.$callHook(hook, args);
    };
  }
}
const EXCLUDE_HOOKS = [ON_READY];
function initHooks(mpOptions, hooks, excludes = EXCLUDE_HOOKS) {
  hooks.forEach((hook) => initHook(mpOptions, hook, excludes));
}
function initUnknownHooks(mpOptions, vueOptions, excludes = EXCLUDE_HOOKS) {
  findHooks(vueOptions).forEach((hook) => initHook(mpOptions, hook, excludes));
}
function initRuntimeHooks(mpOptions, runtimeHooks) {
  if (!runtimeHooks) {
    return;
  }
  const hooks = Object.keys(MINI_PROGRAM_PAGE_RUNTIME_HOOKS);
  hooks.forEach((hook) => {
    if (runtimeHooks & MINI_PROGRAM_PAGE_RUNTIME_HOOKS[hook]) {
      initHook(mpOptions, hook, []);
    }
  });
}
const findMixinRuntimeHooks = /* @__PURE__ */ once(() => {
  const runtimeHooks = [];
  const app = getApp({ allowDefault: true });
  if (app && app.$vm && app.$vm.$) {
    const mixins = app.$vm.$.appContext.mixins;
    if (isArray(mixins)) {
      const hooks = Object.keys(MINI_PROGRAM_PAGE_RUNTIME_HOOKS);
      mixins.forEach((mixin) => {
        hooks.forEach((hook) => {
          if (hasOwn(mixin, hook) && !runtimeHooks.includes(hook)) {
            runtimeHooks.push(hook);
          }
        });
      });
    }
  }
  return runtimeHooks;
});
function initMixinRuntimeHooks(mpOptions) {
  initHooks(mpOptions, findMixinRuntimeHooks());
}
const HOOKS = [
  ON_SHOW,
  ON_HIDE,
  ON_ERROR,
  ON_THEME_CHANGE,
  ON_PAGE_NOT_FOUND,
  ON_UNHANDLE_REJECTION
];
function parseApp(instance, parseAppOptions) {
  const internalInstance = instance.$;
  const appOptions = {
    globalData: instance.$options && instance.$options.globalData || {},
    $vm: instance,
    onLaunch(options) {
      this.$vm = instance;
      const ctx = internalInstance.ctx;
      if (this.$vm && ctx.$scope) {
        return;
      }
      initBaseInstance(internalInstance, {
        mpType: "app",
        mpInstance: this,
        slots: []
      });
      ctx.globalData = this.globalData;
      instance.$callHook(ON_LAUNCH, options);
    }
  };
  initLocale(instance);
  const vueOptions = instance.$.type;
  initHooks(appOptions, HOOKS);
  initUnknownHooks(appOptions, vueOptions);
  {
    const methods = vueOptions.methods;
    methods && extend(appOptions, methods);
  }
  if (parseAppOptions) {
    parseAppOptions.parse(appOptions);
  }
  return appOptions;
}
function initCreateApp(parseAppOptions) {
  return function createApp2(vm) {
    return App(parseApp(vm, parseAppOptions));
  };
}
function initCreateSubpackageApp(parseAppOptions) {
  return function createApp2(vm) {
    const appOptions = parseApp(vm, parseAppOptions);
    const app = getApp({
      allowDefault: true
    });
    vm.$.ctx.$scope = app;
    const globalData = app.globalData;
    if (globalData) {
      Object.keys(appOptions.globalData).forEach((name) => {
        if (!hasOwn(globalData, name)) {
          globalData[name] = appOptions.globalData[name];
        }
      });
    }
    Object.keys(appOptions).forEach((name) => {
      if (!hasOwn(app, name)) {
        app[name] = appOptions[name];
      }
    });
    initAppLifecycle(appOptions, vm);
  };
}
function initAppLifecycle(appOptions, vm) {
  if (isFunction(appOptions.onLaunch)) {
    const args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    appOptions.onLaunch(args);
  }
  if (isFunction(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow((args) => {
      vm.$callHook("onShow", args);
    });
  }
  if (isFunction(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide((args) => {
      vm.$callHook("onHide", args);
    });
  }
}
function initLocale(appVm) {
  const locale = ref(normalizeLocale(wx.getSystemInfoSync().language) || LOCALE_EN);
  Object.defineProperty(appVm, "$locale", {
    get() {
      return locale.value;
    },
    set(v) {
      locale.value = v;
    }
  });
}
function initVueIds(vueIds, mpInstance) {
  if (!vueIds) {
    return;
  }
  const ids = vueIds.split(",");
  const len = ids.length;
  if (len === 1) {
    mpInstance._$vueId = ids[0];
  } else if (len === 2) {
    mpInstance._$vueId = ids[0];
    mpInstance._$vuePid = ids[1];
  }
}
const EXTRAS = ["externalClasses"];
function initExtraOptions(miniProgramComponentOptions, vueOptions) {
  EXTRAS.forEach((name) => {
    if (hasOwn(vueOptions, name)) {
      miniProgramComponentOptions[name] = vueOptions[name];
    }
  });
}
function initWxsCallMethods(methods, wxsCallMethods) {
  if (!isArray(wxsCallMethods)) {
    return;
  }
  wxsCallMethods.forEach((callMethod) => {
    methods[callMethod] = function(args) {
      return this.$vm[callMethod](args);
    };
  });
}
function selectAllComponents(mpInstance, selector, $refs) {
  const components = mpInstance.selectAllComponents(selector);
  components.forEach((component) => {
    const ref2 = component.properties.uR;
    $refs[ref2] = component.$vm || component;
  });
}
function initRefs(instance, mpInstance) {
  Object.defineProperty(instance, "refs", {
    get() {
      const $refs = {};
      selectAllComponents(mpInstance, ".r", $refs);
      const forComponents = mpInstance.selectAllComponents(".r-i-f");
      forComponents.forEach((component) => {
        const ref2 = component.properties.uR;
        if (!ref2) {
          return;
        }
        if (!$refs[ref2]) {
          $refs[ref2] = [];
        }
        $refs[ref2].push(component.$vm || component);
      });
      return $refs;
    }
  });
}
function findVmByVueId(instance, vuePid) {
  const $children = instance.$children;
  for (let i = $children.length - 1; i >= 0; i--) {
    const childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  let parentVm;
  for (let i = $children.length - 1; i >= 0; i--) {
    parentVm = findVmByVueId($children[i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}
const builtInProps = [
  "eO",
  "uR",
  "uRIF",
  "uI",
  "uT",
  "uP",
  "uS"
];
function initDefaultProps(isBehavior = false) {
  const properties = {};
  if (!isBehavior) {
    builtInProps.forEach((name) => {
      properties[name] = {
        type: null,
        value: ""
      };
    });
    properties.uS = {
      type: null,
      value: [],
      observer: function(newVal) {
        const $slots = /* @__PURE__ */ Object.create(null);
        newVal && newVal.forEach((slotName) => {
          $slots[slotName] = true;
        });
        this.setData({
          $slots
        });
      }
    };
  }
  return properties;
}
function initVirtualHostProps(options) {
  const properties = {};
  {
    if (options && options.virtualHost) {
      properties.virtualHostStyle = {
        type: null,
        value: ""
      };
      properties.virtualHostClass = {
        type: null,
        value: ""
      };
    }
  }
  return properties;
}
function initProps(mpComponentOptions) {
  if (!mpComponentOptions.properties) {
    mpComponentOptions.properties = {};
  }
  extend(mpComponentOptions.properties, initDefaultProps(), initVirtualHostProps(mpComponentOptions.options));
}
const PROP_TYPES = [String, Number, Boolean, Object, Array, null];
function parsePropType(type, defaultValue) {
  if (isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}
function normalizePropType(type, defaultValue) {
  const res = parsePropType(type);
  return PROP_TYPES.indexOf(res) !== -1 ? res : null;
}
function initPageProps({ properties }, rawProps) {
  if (isArray(rawProps)) {
    rawProps.forEach((key) => {
      properties[key] = {
        type: String,
        value: ""
      };
    });
  } else if (isPlainObject(rawProps)) {
    Object.keys(rawProps).forEach((key) => {
      const opts = rawProps[key];
      if (isPlainObject(opts)) {
        let value = opts.default;
        if (isFunction(value)) {
          value = value();
        }
        const type = opts.type;
        opts.type = normalizePropType(type);
        properties[key] = {
          type: opts.type,
          value
        };
      } else {
        properties[key] = {
          type: normalizePropType(opts)
        };
      }
    });
  }
}
function findPropsData(properties, isPage2) {
  return (isPage2 ? findPagePropsData(properties) : findComponentPropsData(properties.uP)) || {};
}
function findPagePropsData(properties) {
  const propsData = {};
  if (isPlainObject(properties)) {
    Object.keys(properties).forEach((name) => {
      if (builtInProps.indexOf(name) === -1) {
        propsData[name] = properties[name];
      }
    });
  }
  return propsData;
}
function initData(_) {
  return {};
}
function initPropsObserver(componentOptions) {
  const observe = function observe2() {
    const up = this.properties.uP;
    if (!up) {
      return;
    }
    if (this.$vm) {
      updateComponentProps(up, this.$vm.$);
    } else if (this.properties.uT === "m") {
      updateMiniProgramComponentProperties(up, this);
    }
  };
  {
    if (!componentOptions.observers) {
      componentOptions.observers = {};
    }
    componentOptions.observers.uP = observe;
  }
}
function updateMiniProgramComponentProperties(up, mpInstance) {
  const prevProps = mpInstance.properties;
  const nextProps = findComponentPropsData(up) || {};
  if (hasPropsChanged(prevProps, nextProps, false)) {
    mpInstance.setData(nextProps);
  }
}
function updateComponentProps(up, instance) {
  const prevProps = toRaw(instance.props);
  const nextProps = findComponentPropsData(up) || {};
  if (hasPropsChanged(prevProps, nextProps)) {
    updateProps(instance, nextProps, prevProps, false);
    if (hasQueueJob(instance.update)) {
      invalidateJob(instance.update);
    }
    {
      instance.update();
    }
  }
}
function hasPropsChanged(prevProps, nextProps, checkLen = true) {
  const nextKeys = Object.keys(nextProps);
  if (checkLen && nextKeys.length !== Object.keys(prevProps).length) {
    return true;
  }
  for (let i = 0; i < nextKeys.length; i++) {
    const key = nextKeys[i];
    if (nextProps[key] !== prevProps[key]) {
      return true;
    }
  }
  return false;
}
function initBehaviors(vueOptions) {
  const vueBehaviors = vueOptions.behaviors;
  let vueProps = vueOptions.props;
  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }
  const behaviors = [];
  if (isArray(vueBehaviors)) {
    vueBehaviors.forEach((behavior) => {
      behaviors.push(behavior.replace("uni://", "wx://"));
      if (behavior === "uni://form-field") {
        if (isArray(vueProps)) {
          vueProps.push("name");
          vueProps.push("value");
        } else {
          vueProps.name = {
            type: String,
            default: ""
          };
          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: ""
          };
        }
      }
    });
  }
  return behaviors;
}
function applyOptions(componentOptions, vueOptions) {
  componentOptions.data = initData();
  componentOptions.behaviors = initBehaviors(vueOptions);
}
function parseComponent(vueOptions, { parse, mocks: mocks2, isPage: isPage2, initRelation: initRelation2, handleLink: handleLink2, initLifetimes: initLifetimes2 }) {
  vueOptions = vueOptions.default || vueOptions;
  const options = {
    multipleSlots: true,
    addGlobalClass: true,
    pureDataPattern: /^uP$/
  };
  if (vueOptions.options) {
    extend(options, vueOptions.options);
  }
  const mpComponentOptions = {
    options,
    lifetimes: initLifetimes2({ mocks: mocks2, isPage: isPage2, initRelation: initRelation2, vueOptions }),
    pageLifetimes: {
      show() {
        this.$vm && this.$vm.$callHook("onPageShow");
      },
      hide() {
        this.$vm && this.$vm.$callHook("onPageHide");
      },
      resize(size2) {
        this.$vm && this.$vm.$callHook("onPageResize", size2);
      }
    },
    methods: {
      __l: handleLink2
    }
  };
  {
    applyOptions(mpComponentOptions, vueOptions);
  }
  initProps(mpComponentOptions);
  initPropsObserver(mpComponentOptions);
  initExtraOptions(mpComponentOptions, vueOptions);
  initWxsCallMethods(mpComponentOptions.methods, vueOptions.wxsCallMethods);
  if (parse) {
    parse(mpComponentOptions, { handleLink: handleLink2 });
  }
  return mpComponentOptions;
}
function initCreateComponent(parseOptions2) {
  return function createComponent2(vueComponentOptions) {
    return Component(parseComponent(vueComponentOptions, parseOptions2));
  };
}
let $createComponentFn;
let $destroyComponentFn;
function getAppVm() {
  return getApp().$vm;
}
function $createComponent(initialVNode, options) {
  if (!$createComponentFn) {
    $createComponentFn = getAppVm().$createComponent;
  }
  const proxy = $createComponentFn(initialVNode, options);
  return getExposeProxy(proxy.$) || proxy;
}
function $destroyComponent(instance) {
  if (!$destroyComponentFn) {
    $destroyComponentFn = getApp().$vm.$destroyComponent;
  }
  return $destroyComponentFn(instance);
}
function parsePage(vueOptions, parseOptions2) {
  const { parse, mocks: mocks2, isPage: isPage2, initRelation: initRelation2, handleLink: handleLink2, initLifetimes: initLifetimes2 } = parseOptions2;
  const miniProgramPageOptions = parseComponent(vueOptions, {
    mocks: mocks2,
    isPage: isPage2,
    initRelation: initRelation2,
    handleLink: handleLink2,
    initLifetimes: initLifetimes2
  });
  initPageProps(miniProgramPageOptions, (vueOptions.default || vueOptions).props);
  const methods = miniProgramPageOptions.methods;
  methods.onLoad = function(query) {
    this.options = query;
    this.$page = {
      fullPath: addLeadingSlash(this.route + stringifyQuery(query))
    };
    return this.$vm && this.$vm.$callHook(ON_LOAD, query);
  };
  initHooks(methods, PAGE_INIT_HOOKS);
  {
    initUnknownHooks(methods, vueOptions);
  }
  initRuntimeHooks(methods, vueOptions.__runtimeHooks);
  initMixinRuntimeHooks(methods);
  parse && parse(miniProgramPageOptions, { handleLink: handleLink2 });
  return miniProgramPageOptions;
}
function initCreatePage(parseOptions2) {
  return function createPage2(vuePageOptions) {
    return Component(parsePage(vuePageOptions, parseOptions2));
  };
}
function initCreatePluginApp(parseAppOptions) {
  return function createApp2(vm) {
    initAppLifecycle(parseApp(vm, parseAppOptions), vm);
  };
}
const MPPage = Page;
const MPComponent = Component;
function initTriggerEvent(mpInstance) {
  const oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function(event, ...args) {
    return oldTriggerEvent.apply(mpInstance, [customizeEvent(event), ...args]);
  };
}
function initMiniProgramHook(name, options, isComponent) {
  const oldHook = options[name];
  if (!oldHook) {
    options[name] = function() {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function(...args) {
      initTriggerEvent(this);
      return oldHook.apply(this, args);
    };
  }
}
Page = function(options) {
  initMiniProgramHook(ON_LOAD, options);
  return MPPage(options);
};
Component = function(options) {
  initMiniProgramHook("created", options);
  const isVueComponent = options.properties && options.properties.uP;
  if (!isVueComponent) {
    initProps(options);
    initPropsObserver(options);
  }
  return MPComponent(options);
};
function initLifetimes({ mocks: mocks2, isPage: isPage2, initRelation: initRelation2, vueOptions }) {
  return {
    attached() {
      let properties = this.properties;
      initVueIds(properties.uI, this);
      const relationOptions = {
        vuePid: this._$vuePid
      };
      initRelation2(this, relationOptions);
      const mpInstance = this;
      const isMiniProgramPage = isPage2(mpInstance);
      let propsData = properties;
      this.$vm = $createComponent({
        type: vueOptions,
        props: findPropsData(propsData, isMiniProgramPage)
      }, {
        mpType: isMiniProgramPage ? "page" : "component",
        mpInstance,
        slots: properties.uS || {},
        parentComponent: relationOptions.parent && relationOptions.parent.$,
        onBeforeSetup(instance, options) {
          initRefs(instance, mpInstance);
          initMocks(instance, mpInstance, mocks2);
          initComponentInstance(instance, options);
        }
      });
    },
    ready() {
      if (this.$vm) {
        {
          this.$vm.$callHook("mounted");
          this.$vm.$callHook(ON_READY);
        }
      }
    },
    detached() {
      if (this.$vm) {
        pruneComponentPropsCache(this.$vm.$.uid);
        $destroyComponent(this.$vm);
      }
    }
  };
}
const mocks = ["__route__", "__wxExparserNodeId__", "__wxWebviewId__"];
function isPage(mpInstance) {
  return !!mpInstance.route;
}
function initRelation(mpInstance, detail) {
  mpInstance.triggerEvent("__l", detail);
}
function handleLink(event) {
  const detail = event.detail || event.value;
  const vuePid = detail.vuePid;
  let parentVm;
  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }
  if (!parentVm) {
    parentVm = this.$vm;
  }
  detail.parent = parentVm;
}
var parseOptions = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  mocks,
  isPage,
  initRelation,
  handleLink,
  initLifetimes
});
const createApp = initCreateApp();
const createPage = initCreatePage(parseOptions);
const createComponent = initCreateComponent(parseOptions);
const createPluginApp = initCreatePluginApp();
const createSubpackageApp = initCreateSubpackageApp();
{
  wx.createApp = global.createApp = createApp;
  wx.createPage = createPage;
  wx.createComponent = createComponent;
  wx.createPluginApp = global.createPluginApp = createPluginApp;
  wx.createSubpackageApp = global.createSubpackageApp = createSubpackageApp;
}
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
function createCommonjsModule(fn) {
  var module = { exports: {} };
  return fn(module, module.exports), module.exports;
}
/*! For license information please see gtpush-min.js.LICENSE.txt */
var gtpushMin = createCommonjsModule(function(module, exports2) {
  (function t(e2, r) {
    module.exports = r();
  })(self, () => (() => {
    var t = { 4736: (t2, e3, r2) => {
      t2 = r2.nmd(t2);
      var i2;
      var n = function(t3) {
        var e4 = 1e7, r3 = 7, i3 = 9007199254740992, s = d(i3), a = "0123456789abcdefghijklmnopqrstuvwxyz";
        var o2 = typeof BigInt === "function";
        function u(t4, e5, r4, i4) {
          if (typeof t4 === "undefined")
            return u[0];
          if (typeof e5 !== "undefined")
            return +e5 === 10 && !r4 ? st(t4) : X(t4, e5, r4, i4);
          return st(t4);
        }
        function c(t4, e5) {
          this.value = t4;
          this.sign = e5;
          this.isSmall = false;
        }
        c.prototype = Object.create(u.prototype);
        function l(t4) {
          this.value = t4;
          this.sign = t4 < 0;
          this.isSmall = true;
        }
        l.prototype = Object.create(u.prototype);
        function f(t4) {
          this.value = t4;
        }
        f.prototype = Object.create(u.prototype);
        function h(t4) {
          return -i3 < t4 && t4 < i3;
        }
        function d(t4) {
          if (t4 < 1e7)
            return [t4];
          if (t4 < 1e14)
            return [t4 % 1e7, Math.floor(t4 / 1e7)];
          return [t4 % 1e7, Math.floor(t4 / 1e7) % 1e7, Math.floor(t4 / 1e14)];
        }
        function p(t4) {
          v(t4);
          var r4 = t4.length;
          if (r4 < 4 && N(t4, s) < 0)
            switch (r4) {
              case 0:
                return 0;
              case 1:
                return t4[0];
              case 2:
                return t4[0] + t4[1] * e4;
              default:
                return t4[0] + (t4[1] + t4[2] * e4) * e4;
            }
          return t4;
        }
        function v(t4) {
          var e5 = t4.length;
          while (t4[--e5] === 0)
            ;
          t4.length = e5 + 1;
        }
        function g(t4) {
          var e5 = new Array(t4);
          var r4 = -1;
          while (++r4 < t4)
            e5[r4] = 0;
          return e5;
        }
        function y(t4) {
          if (t4 > 0)
            return Math.floor(t4);
          return Math.ceil(t4);
        }
        function m(t4, r4) {
          var i4 = t4.length, n2 = r4.length, s2 = new Array(i4), a2 = 0, o3 = e4, u2, c2;
          for (c2 = 0; c2 < n2; c2++) {
            u2 = t4[c2] + r4[c2] + a2;
            a2 = u2 >= o3 ? 1 : 0;
            s2[c2] = u2 - a2 * o3;
          }
          while (c2 < i4) {
            u2 = t4[c2] + a2;
            a2 = u2 === o3 ? 1 : 0;
            s2[c2++] = u2 - a2 * o3;
          }
          if (a2 > 0)
            s2.push(a2);
          return s2;
        }
        function w(t4, e5) {
          if (t4.length >= e5.length)
            return m(t4, e5);
          return m(e5, t4);
        }
        function S(t4, r4) {
          var i4 = t4.length, n2 = new Array(i4), s2 = e4, a2, o3;
          for (o3 = 0; o3 < i4; o3++) {
            a2 = t4[o3] - s2 + r4;
            r4 = Math.floor(a2 / s2);
            n2[o3] = a2 - r4 * s2;
            r4 += 1;
          }
          while (r4 > 0) {
            n2[o3++] = r4 % s2;
            r4 = Math.floor(r4 / s2);
          }
          return n2;
        }
        c.prototype.add = function(t4) {
          var e5 = st(t4);
          if (this.sign !== e5.sign)
            return this.subtract(e5.negate());
          var r4 = this.value, i4 = e5.value;
          if (e5.isSmall)
            return new c(S(r4, Math.abs(i4)), this.sign);
          return new c(w(r4, i4), this.sign);
        };
        c.prototype.plus = c.prototype.add;
        l.prototype.add = function(t4) {
          var e5 = st(t4);
          var r4 = this.value;
          if (r4 < 0 !== e5.sign)
            return this.subtract(e5.negate());
          var i4 = e5.value;
          if (e5.isSmall) {
            if (h(r4 + i4))
              return new l(r4 + i4);
            i4 = d(Math.abs(i4));
          }
          return new c(S(i4, Math.abs(r4)), r4 < 0);
        };
        l.prototype.plus = l.prototype.add;
        f.prototype.add = function(t4) {
          return new f(this.value + st(t4).value);
        };
        f.prototype.plus = f.prototype.add;
        function _(t4, r4) {
          var i4 = t4.length, n2 = r4.length, s2 = new Array(i4), a2 = 0, o3 = e4, u2, c2;
          for (u2 = 0; u2 < n2; u2++) {
            c2 = t4[u2] - a2 - r4[u2];
            if (c2 < 0) {
              c2 += o3;
              a2 = 1;
            } else
              a2 = 0;
            s2[u2] = c2;
          }
          for (u2 = n2; u2 < i4; u2++) {
            c2 = t4[u2] - a2;
            if (c2 < 0)
              c2 += o3;
            else {
              s2[u2++] = c2;
              break;
            }
            s2[u2] = c2;
          }
          for (; u2 < i4; u2++)
            s2[u2] = t4[u2];
          v(s2);
          return s2;
        }
        function b(t4, e5, r4) {
          var i4;
          if (N(t4, e5) >= 0)
            i4 = _(t4, e5);
          else {
            i4 = _(e5, t4);
            r4 = !r4;
          }
          i4 = p(i4);
          if (typeof i4 === "number") {
            if (r4)
              i4 = -i4;
            return new l(i4);
          }
          return new c(i4, r4);
        }
        function E2(t4, r4, i4) {
          var n2 = t4.length, s2 = new Array(n2), a2 = -r4, o3 = e4, u2, f2;
          for (u2 = 0; u2 < n2; u2++) {
            f2 = t4[u2] + a2;
            a2 = Math.floor(f2 / o3);
            f2 %= o3;
            s2[u2] = f2 < 0 ? f2 + o3 : f2;
          }
          s2 = p(s2);
          if (typeof s2 === "number") {
            if (i4)
              s2 = -s2;
            return new l(s2);
          }
          return new c(s2, i4);
        }
        c.prototype.subtract = function(t4) {
          var e5 = st(t4);
          if (this.sign !== e5.sign)
            return this.add(e5.negate());
          var r4 = this.value, i4 = e5.value;
          if (e5.isSmall)
            return E2(r4, Math.abs(i4), this.sign);
          return b(r4, i4, this.sign);
        };
        c.prototype.minus = c.prototype.subtract;
        l.prototype.subtract = function(t4) {
          var e5 = st(t4);
          var r4 = this.value;
          if (r4 < 0 !== e5.sign)
            return this.add(e5.negate());
          var i4 = e5.value;
          if (e5.isSmall)
            return new l(r4 - i4);
          return E2(i4, Math.abs(r4), r4 >= 0);
        };
        l.prototype.minus = l.prototype.subtract;
        f.prototype.subtract = function(t4) {
          return new f(this.value - st(t4).value);
        };
        f.prototype.minus = f.prototype.subtract;
        c.prototype.negate = function() {
          return new c(this.value, !this.sign);
        };
        l.prototype.negate = function() {
          var t4 = this.sign;
          var e5 = new l(-this.value);
          e5.sign = !t4;
          return e5;
        };
        f.prototype.negate = function() {
          return new f(-this.value);
        };
        c.prototype.abs = function() {
          return new c(this.value, false);
        };
        l.prototype.abs = function() {
          return new l(Math.abs(this.value));
        };
        f.prototype.abs = function() {
          return new f(this.value >= 0 ? this.value : -this.value);
        };
        function D(t4, r4) {
          var i4 = t4.length, n2 = r4.length, s2 = i4 + n2, a2 = g(s2), o3 = e4, u2, c2, l2, f2, h2;
          for (l2 = 0; l2 < i4; ++l2) {
            f2 = t4[l2];
            for (var d2 = 0; d2 < n2; ++d2) {
              h2 = r4[d2];
              u2 = f2 * h2 + a2[l2 + d2];
              c2 = Math.floor(u2 / o3);
              a2[l2 + d2] = u2 - c2 * o3;
              a2[l2 + d2 + 1] += c2;
            }
          }
          v(a2);
          return a2;
        }
        function M(t4, r4) {
          var i4 = t4.length, n2 = new Array(i4), s2 = e4, a2 = 0, o3, u2;
          for (u2 = 0; u2 < i4; u2++) {
            o3 = t4[u2] * r4 + a2;
            a2 = Math.floor(o3 / s2);
            n2[u2] = o3 - a2 * s2;
          }
          while (a2 > 0) {
            n2[u2++] = a2 % s2;
            a2 = Math.floor(a2 / s2);
          }
          return n2;
        }
        function T(t4, e5) {
          var r4 = [];
          while (e5-- > 0)
            r4.push(0);
          return r4.concat(t4);
        }
        function I(t4, e5) {
          var r4 = Math.max(t4.length, e5.length);
          if (r4 <= 30)
            return D(t4, e5);
          r4 = Math.ceil(r4 / 2);
          var i4 = t4.slice(r4), n2 = t4.slice(0, r4), s2 = e5.slice(r4), a2 = e5.slice(0, r4);
          var o3 = I(n2, a2), u2 = I(i4, s2), c2 = I(w(n2, i4), w(a2, s2));
          var l2 = w(w(o3, T(_(_(c2, o3), u2), r4)), T(u2, 2 * r4));
          v(l2);
          return l2;
        }
        function A(t4, e5) {
          return -0.012 * t4 - 0.012 * e5 + 15e-6 * t4 * e5 > 0;
        }
        c.prototype.multiply = function(t4) {
          var r4 = st(t4), i4 = this.value, n2 = r4.value, s2 = this.sign !== r4.sign, a2;
          if (r4.isSmall) {
            if (n2 === 0)
              return u[0];
            if (n2 === 1)
              return this;
            if (n2 === -1)
              return this.negate();
            a2 = Math.abs(n2);
            if (a2 < e4)
              return new c(M(i4, a2), s2);
            n2 = d(a2);
          }
          if (A(i4.length, n2.length))
            return new c(I(i4, n2), s2);
          return new c(D(i4, n2), s2);
        };
        c.prototype.times = c.prototype.multiply;
        function x(t4, r4, i4) {
          if (t4 < e4)
            return new c(M(r4, t4), i4);
          return new c(D(r4, d(t4)), i4);
        }
        l.prototype._multiplyBySmall = function(t4) {
          if (h(t4.value * this.value))
            return new l(t4.value * this.value);
          return x(Math.abs(t4.value), d(Math.abs(this.value)), this.sign !== t4.sign);
        };
        c.prototype._multiplyBySmall = function(t4) {
          if (t4.value === 0)
            return u[0];
          if (t4.value === 1)
            return this;
          if (t4.value === -1)
            return this.negate();
          return x(Math.abs(t4.value), this.value, this.sign !== t4.sign);
        };
        l.prototype.multiply = function(t4) {
          return st(t4)._multiplyBySmall(this);
        };
        l.prototype.times = l.prototype.multiply;
        f.prototype.multiply = function(t4) {
          return new f(this.value * st(t4).value);
        };
        f.prototype.times = f.prototype.multiply;
        function R(t4) {
          var r4 = t4.length, i4 = g(r4 + r4), n2 = e4, s2, a2, o3, u2, c2;
          for (o3 = 0; o3 < r4; o3++) {
            u2 = t4[o3];
            a2 = 0 - u2 * u2;
            for (var l2 = o3; l2 < r4; l2++) {
              c2 = t4[l2];
              s2 = 2 * (u2 * c2) + i4[o3 + l2] + a2;
              a2 = Math.floor(s2 / n2);
              i4[o3 + l2] = s2 - a2 * n2;
            }
            i4[o3 + r4] = a2;
          }
          v(i4);
          return i4;
        }
        c.prototype.square = function() {
          return new c(R(this.value), false);
        };
        l.prototype.square = function() {
          var t4 = this.value * this.value;
          if (h(t4))
            return new l(t4);
          return new c(R(d(Math.abs(this.value))), false);
        };
        f.prototype.square = function(t4) {
          return new f(this.value * this.value);
        };
        function B(t4, r4) {
          var i4 = t4.length, n2 = r4.length, s2 = e4, a2 = g(r4.length), o3 = r4[n2 - 1], u2 = Math.ceil(s2 / (2 * o3)), c2 = M(t4, u2), l2 = M(r4, u2), f2, h2, d2, v2, y2, m2, w2;
          if (c2.length <= i4)
            c2.push(0);
          l2.push(0);
          o3 = l2[n2 - 1];
          for (h2 = i4 - n2; h2 >= 0; h2--) {
            f2 = s2 - 1;
            if (c2[h2 + n2] !== o3)
              f2 = Math.floor((c2[h2 + n2] * s2 + c2[h2 + n2 - 1]) / o3);
            d2 = 0;
            v2 = 0;
            m2 = l2.length;
            for (y2 = 0; y2 < m2; y2++) {
              d2 += f2 * l2[y2];
              w2 = Math.floor(d2 / s2);
              v2 += c2[h2 + y2] - (d2 - w2 * s2);
              d2 = w2;
              if (v2 < 0) {
                c2[h2 + y2] = v2 + s2;
                v2 = -1;
              } else {
                c2[h2 + y2] = v2;
                v2 = 0;
              }
            }
            while (v2 !== 0) {
              f2 -= 1;
              d2 = 0;
              for (y2 = 0; y2 < m2; y2++) {
                d2 += c2[h2 + y2] - s2 + l2[y2];
                if (d2 < 0) {
                  c2[h2 + y2] = d2 + s2;
                  d2 = 0;
                } else {
                  c2[h2 + y2] = d2;
                  d2 = 1;
                }
              }
              v2 += d2;
            }
            a2[h2] = f2;
          }
          c2 = k(c2, u2)[0];
          return [p(a2), p(c2)];
        }
        function O(t4, r4) {
          var i4 = t4.length, n2 = r4.length, s2 = [], a2 = [], o3 = e4, u2, c2, l2, f2, h2;
          while (i4) {
            a2.unshift(t4[--i4]);
            v(a2);
            if (N(a2, r4) < 0) {
              s2.push(0);
              continue;
            }
            c2 = a2.length;
            l2 = a2[c2 - 1] * o3 + a2[c2 - 2];
            f2 = r4[n2 - 1] * o3 + r4[n2 - 2];
            if (c2 > n2)
              l2 = (l2 + 1) * o3;
            u2 = Math.ceil(l2 / f2);
            do {
              h2 = M(r4, u2);
              if (N(h2, a2) <= 0)
                break;
              u2--;
            } while (u2);
            s2.push(u2);
            a2 = _(a2, h2);
          }
          s2.reverse();
          return [p(s2), p(a2)];
        }
        function k(t4, r4) {
          var i4 = t4.length, n2 = g(i4), s2 = e4, a2, o3, u2, c2;
          u2 = 0;
          for (a2 = i4 - 1; a2 >= 0; --a2) {
            c2 = u2 * s2 + t4[a2];
            o3 = y(c2 / r4);
            u2 = c2 - o3 * r4;
            n2[a2] = 0 | o3;
          }
          return [n2, 0 | u2];
        }
        function C(t4, r4) {
          var i4, n2 = st(r4);
          if (o2)
            return [new f(t4.value / n2.value), new f(t4.value % n2.value)];
          var s2 = t4.value, a2 = n2.value;
          var h2;
          if (a2 === 0)
            throw new Error("Cannot divide by zero");
          if (t4.isSmall) {
            if (n2.isSmall)
              return [new l(y(s2 / a2)), new l(s2 % a2)];
            return [u[0], t4];
          }
          if (n2.isSmall) {
            if (a2 === 1)
              return [t4, u[0]];
            if (a2 == -1)
              return [t4.negate(), u[0]];
            var v2 = Math.abs(a2);
            if (v2 < e4) {
              i4 = k(s2, v2);
              h2 = p(i4[0]);
              var g2 = i4[1];
              if (t4.sign)
                g2 = -g2;
              if (typeof h2 === "number") {
                if (t4.sign !== n2.sign)
                  h2 = -h2;
                return [new l(h2), new l(g2)];
              }
              return [new c(h2, t4.sign !== n2.sign), new l(g2)];
            }
            a2 = d(v2);
          }
          var m2 = N(s2, a2);
          if (m2 === -1)
            return [u[0], t4];
          if (m2 === 0)
            return [u[t4.sign === n2.sign ? 1 : -1], u[0]];
          if (s2.length + a2.length <= 200)
            i4 = B(s2, a2);
          else
            i4 = O(s2, a2);
          h2 = i4[0];
          var w2 = t4.sign !== n2.sign, S2 = i4[1], _2 = t4.sign;
          if (typeof h2 === "number") {
            if (w2)
              h2 = -h2;
            h2 = new l(h2);
          } else
            h2 = new c(h2, w2);
          if (typeof S2 === "number") {
            if (_2)
              S2 = -S2;
            S2 = new l(S2);
          } else
            S2 = new c(S2, _2);
          return [h2, S2];
        }
        c.prototype.divmod = function(t4) {
          var e5 = C(this, t4);
          return { quotient: e5[0], remainder: e5[1] };
        };
        f.prototype.divmod = l.prototype.divmod = c.prototype.divmod;
        c.prototype.divide = function(t4) {
          return C(this, t4)[0];
        };
        f.prototype.over = f.prototype.divide = function(t4) {
          return new f(this.value / st(t4).value);
        };
        l.prototype.over = l.prototype.divide = c.prototype.over = c.prototype.divide;
        c.prototype.mod = function(t4) {
          return C(this, t4)[1];
        };
        f.prototype.mod = f.prototype.remainder = function(t4) {
          return new f(this.value % st(t4).value);
        };
        l.prototype.remainder = l.prototype.mod = c.prototype.remainder = c.prototype.mod;
        c.prototype.pow = function(t4) {
          var e5 = st(t4), r4 = this.value, i4 = e5.value, n2, s2, a2;
          if (i4 === 0)
            return u[1];
          if (r4 === 0)
            return u[0];
          if (r4 === 1)
            return u[1];
          if (r4 === -1)
            return e5.isEven() ? u[1] : u[-1];
          if (e5.sign)
            return u[0];
          if (!e5.isSmall)
            throw new Error("The exponent " + e5.toString() + " is too large.");
          if (this.isSmall) {
            if (h(n2 = Math.pow(r4, i4)))
              return new l(y(n2));
          }
          s2 = this;
          a2 = u[1];
          while (true) {
            if (i4 & true) {
              a2 = a2.times(s2);
              --i4;
            }
            if (i4 === 0)
              break;
            i4 /= 2;
            s2 = s2.square();
          }
          return a2;
        };
        l.prototype.pow = c.prototype.pow;
        f.prototype.pow = function(t4) {
          var e5 = st(t4);
          var r4 = this.value, i4 = e5.value;
          var n2 = BigInt(0), s2 = BigInt(1), a2 = BigInt(2);
          if (i4 === n2)
            return u[1];
          if (r4 === n2)
            return u[0];
          if (r4 === s2)
            return u[1];
          if (r4 === BigInt(-1))
            return e5.isEven() ? u[1] : u[-1];
          if (e5.isNegative())
            return new f(n2);
          var o3 = this;
          var c2 = u[1];
          while (true) {
            if ((i4 & s2) === s2) {
              c2 = c2.times(o3);
              --i4;
            }
            if (i4 === n2)
              break;
            i4 /= a2;
            o3 = o3.square();
          }
          return c2;
        };
        c.prototype.modPow = function(t4, e5) {
          t4 = st(t4);
          e5 = st(e5);
          if (e5.isZero())
            throw new Error("Cannot take modPow with modulus 0");
          var r4 = u[1], i4 = this.mod(e5);
          if (t4.isNegative()) {
            t4 = t4.multiply(u[-1]);
            i4 = i4.modInv(e5);
          }
          while (t4.isPositive()) {
            if (i4.isZero())
              return u[0];
            if (t4.isOdd())
              r4 = r4.multiply(i4).mod(e5);
            t4 = t4.divide(2);
            i4 = i4.square().mod(e5);
          }
          return r4;
        };
        f.prototype.modPow = l.prototype.modPow = c.prototype.modPow;
        function N(t4, e5) {
          if (t4.length !== e5.length)
            return t4.length > e5.length ? 1 : -1;
          for (var r4 = t4.length - 1; r4 >= 0; r4--)
            if (t4[r4] !== e5[r4])
              return t4[r4] > e5[r4] ? 1 : -1;
          return 0;
        }
        c.prototype.compareAbs = function(t4) {
          var e5 = st(t4), r4 = this.value, i4 = e5.value;
          if (e5.isSmall)
            return 1;
          return N(r4, i4);
        };
        l.prototype.compareAbs = function(t4) {
          var e5 = st(t4), r4 = Math.abs(this.value), i4 = e5.value;
          if (e5.isSmall) {
            i4 = Math.abs(i4);
            return r4 === i4 ? 0 : r4 > i4 ? 1 : -1;
          }
          return -1;
        };
        f.prototype.compareAbs = function(t4) {
          var e5 = this.value;
          var r4 = st(t4).value;
          e5 = e5 >= 0 ? e5 : -e5;
          r4 = r4 >= 0 ? r4 : -r4;
          return e5 === r4 ? 0 : e5 > r4 ? 1 : -1;
        };
        c.prototype.compare = function(t4) {
          if (t4 === 1 / 0)
            return -1;
          if (t4 === -1 / 0)
            return 1;
          var e5 = st(t4), r4 = this.value, i4 = e5.value;
          if (this.sign !== e5.sign)
            return e5.sign ? 1 : -1;
          if (e5.isSmall)
            return this.sign ? -1 : 1;
          return N(r4, i4) * (this.sign ? -1 : 1);
        };
        c.prototype.compareTo = c.prototype.compare;
        l.prototype.compare = function(t4) {
          if (t4 === 1 / 0)
            return -1;
          if (t4 === -1 / 0)
            return 1;
          var e5 = st(t4), r4 = this.value, i4 = e5.value;
          if (e5.isSmall)
            return r4 == i4 ? 0 : r4 > i4 ? 1 : -1;
          if (r4 < 0 !== e5.sign)
            return r4 < 0 ? -1 : 1;
          return r4 < 0 ? 1 : -1;
        };
        l.prototype.compareTo = l.prototype.compare;
        f.prototype.compare = function(t4) {
          if (t4 === 1 / 0)
            return -1;
          if (t4 === -1 / 0)
            return 1;
          var e5 = this.value;
          var r4 = st(t4).value;
          return e5 === r4 ? 0 : e5 > r4 ? 1 : -1;
        };
        f.prototype.compareTo = f.prototype.compare;
        c.prototype.equals = function(t4) {
          return this.compare(t4) === 0;
        };
        f.prototype.eq = f.prototype.equals = l.prototype.eq = l.prototype.equals = c.prototype.eq = c.prototype.equals;
        c.prototype.notEquals = function(t4) {
          return this.compare(t4) !== 0;
        };
        f.prototype.neq = f.prototype.notEquals = l.prototype.neq = l.prototype.notEquals = c.prototype.neq = c.prototype.notEquals;
        c.prototype.greater = function(t4) {
          return this.compare(t4) > 0;
        };
        f.prototype.gt = f.prototype.greater = l.prototype.gt = l.prototype.greater = c.prototype.gt = c.prototype.greater;
        c.prototype.lesser = function(t4) {
          return this.compare(t4) < 0;
        };
        f.prototype.lt = f.prototype.lesser = l.prototype.lt = l.prototype.lesser = c.prototype.lt = c.prototype.lesser;
        c.prototype.greaterOrEquals = function(t4) {
          return this.compare(t4) >= 0;
        };
        f.prototype.geq = f.prototype.greaterOrEquals = l.prototype.geq = l.prototype.greaterOrEquals = c.prototype.geq = c.prototype.greaterOrEquals;
        c.prototype.lesserOrEquals = function(t4) {
          return this.compare(t4) <= 0;
        };
        f.prototype.leq = f.prototype.lesserOrEquals = l.prototype.leq = l.prototype.lesserOrEquals = c.prototype.leq = c.prototype.lesserOrEquals;
        c.prototype.isEven = function() {
          return (1 & this.value[0]) === 0;
        };
        l.prototype.isEven = function() {
          return (1 & this.value) === 0;
        };
        f.prototype.isEven = function() {
          return (this.value & BigInt(1)) === BigInt(0);
        };
        c.prototype.isOdd = function() {
          return (1 & this.value[0]) === 1;
        };
        l.prototype.isOdd = function() {
          return (1 & this.value) === 1;
        };
        f.prototype.isOdd = function() {
          return (this.value & BigInt(1)) === BigInt(1);
        };
        c.prototype.isPositive = function() {
          return !this.sign;
        };
        l.prototype.isPositive = function() {
          return this.value > 0;
        };
        f.prototype.isPositive = l.prototype.isPositive;
        c.prototype.isNegative = function() {
          return this.sign;
        };
        l.prototype.isNegative = function() {
          return this.value < 0;
        };
        f.prototype.isNegative = l.prototype.isNegative;
        c.prototype.isUnit = function() {
          return false;
        };
        l.prototype.isUnit = function() {
          return Math.abs(this.value) === 1;
        };
        f.prototype.isUnit = function() {
          return this.abs().value === BigInt(1);
        };
        c.prototype.isZero = function() {
          return false;
        };
        l.prototype.isZero = function() {
          return this.value === 0;
        };
        f.prototype.isZero = function() {
          return this.value === BigInt(0);
        };
        c.prototype.isDivisibleBy = function(t4) {
          var e5 = st(t4);
          if (e5.isZero())
            return false;
          if (e5.isUnit())
            return true;
          if (e5.compareAbs(2) === 0)
            return this.isEven();
          return this.mod(e5).isZero();
        };
        f.prototype.isDivisibleBy = l.prototype.isDivisibleBy = c.prototype.isDivisibleBy;
        function P(t4) {
          var e5 = t4.abs();
          if (e5.isUnit())
            return false;
          if (e5.equals(2) || e5.equals(3) || e5.equals(5))
            return true;
          if (e5.isEven() || e5.isDivisibleBy(3) || e5.isDivisibleBy(5))
            return false;
          if (e5.lesser(49))
            return true;
        }
        function V(t4, e5) {
          var r4 = t4.prev(), i4 = r4, s2 = 0, a2, u2, c2;
          while (i4.isEven())
            i4 = i4.divide(2), s2++;
          t:
            for (u2 = 0; u2 < e5.length; u2++) {
              if (t4.lesser(e5[u2]))
                continue;
              c2 = n(e5[u2]).modPow(i4, t4);
              if (c2.isUnit() || c2.equals(r4))
                continue;
              for (a2 = s2 - 1; a2 != 0; a2--) {
                c2 = c2.square().mod(t4);
                if (c2.isUnit())
                  return false;
                if (c2.equals(r4))
                  continue t;
              }
              return false;
            }
          return true;
        }
        c.prototype.isPrime = function(e5) {
          var r4 = P(this);
          if (r4 !== t3)
            return r4;
          var i4 = this.abs();
          var s2 = i4.bitLength();
          if (s2 <= 64)
            return V(i4, [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37]);
          var a2 = Math.log(2) * s2.toJSNumber();
          var o3 = Math.ceil(e5 === true ? 2 * Math.pow(a2, 2) : a2);
          for (var u2 = [], c2 = 0; c2 < o3; c2++)
            u2.push(n(c2 + 2));
          return V(i4, u2);
        };
        f.prototype.isPrime = l.prototype.isPrime = c.prototype.isPrime;
        c.prototype.isProbablePrime = function(e5, r4) {
          var i4 = P(this);
          if (i4 !== t3)
            return i4;
          var s2 = this.abs();
          var a2 = e5 === t3 ? 5 : e5;
          for (var o3 = [], u2 = 0; u2 < a2; u2++)
            o3.push(n.randBetween(2, s2.minus(2), r4));
          return V(s2, o3);
        };
        f.prototype.isProbablePrime = l.prototype.isProbablePrime = c.prototype.isProbablePrime;
        c.prototype.modInv = function(t4) {
          var e5 = n.zero, r4 = n.one, i4 = st(t4), s2 = this.abs(), a2, o3, u2;
          while (!s2.isZero()) {
            a2 = i4.divide(s2);
            o3 = e5;
            u2 = i4;
            e5 = r4;
            i4 = s2;
            r4 = o3.subtract(a2.multiply(r4));
            s2 = u2.subtract(a2.multiply(s2));
          }
          if (!i4.isUnit())
            throw new Error(this.toString() + " and " + t4.toString() + " are not co-prime");
          if (e5.compare(0) === -1)
            e5 = e5.add(t4);
          if (this.isNegative())
            return e5.negate();
          return e5;
        };
        f.prototype.modInv = l.prototype.modInv = c.prototype.modInv;
        c.prototype.next = function() {
          var t4 = this.value;
          if (this.sign)
            return E2(t4, 1, this.sign);
          return new c(S(t4, 1), this.sign);
        };
        l.prototype.next = function() {
          var t4 = this.value;
          if (t4 + 1 < i3)
            return new l(t4 + 1);
          return new c(s, false);
        };
        f.prototype.next = function() {
          return new f(this.value + BigInt(1));
        };
        c.prototype.prev = function() {
          var t4 = this.value;
          if (this.sign)
            return new c(S(t4, 1), true);
          return E2(t4, 1, this.sign);
        };
        l.prototype.prev = function() {
          var t4 = this.value;
          if (t4 - 1 > -i3)
            return new l(t4 - 1);
          return new c(s, true);
        };
        f.prototype.prev = function() {
          return new f(this.value - BigInt(1));
        };
        var L = [1];
        while (2 * L[L.length - 1] <= e4)
          L.push(2 * L[L.length - 1]);
        var H = L.length, K = L[H - 1];
        function U(t4) {
          return Math.abs(t4) <= e4;
        }
        c.prototype.shiftLeft = function(t4) {
          var e5 = st(t4).toJSNumber();
          if (!U(e5))
            throw new Error(String(e5) + " is too large for shifting.");
          if (e5 < 0)
            return this.shiftRight(-e5);
          var r4 = this;
          if (r4.isZero())
            return r4;
          while (e5 >= H) {
            r4 = r4.multiply(K);
            e5 -= H - 1;
          }
          return r4.multiply(L[e5]);
        };
        f.prototype.shiftLeft = l.prototype.shiftLeft = c.prototype.shiftLeft;
        c.prototype.shiftRight = function(t4) {
          var e5;
          var r4 = st(t4).toJSNumber();
          if (!U(r4))
            throw new Error(String(r4) + " is too large for shifting.");
          if (r4 < 0)
            return this.shiftLeft(-r4);
          var i4 = this;
          while (r4 >= H) {
            if (i4.isZero() || i4.isNegative() && i4.isUnit())
              return i4;
            e5 = C(i4, K);
            i4 = e5[1].isNegative() ? e5[0].prev() : e5[0];
            r4 -= H - 1;
          }
          e5 = C(i4, L[r4]);
          return e5[1].isNegative() ? e5[0].prev() : e5[0];
        };
        f.prototype.shiftRight = l.prototype.shiftRight = c.prototype.shiftRight;
        function j(t4, e5, r4) {
          e5 = st(e5);
          var i4 = t4.isNegative(), s2 = e5.isNegative();
          var a2 = i4 ? t4.not() : t4, o3 = s2 ? e5.not() : e5;
          var u2 = 0, c2 = 0;
          var l2 = null, f2 = null;
          var h2 = [];
          while (!a2.isZero() || !o3.isZero()) {
            l2 = C(a2, K);
            u2 = l2[1].toJSNumber();
            if (i4)
              u2 = K - 1 - u2;
            f2 = C(o3, K);
            c2 = f2[1].toJSNumber();
            if (s2)
              c2 = K - 1 - c2;
            a2 = l2[0];
            o3 = f2[0];
            h2.push(r4(u2, c2));
          }
          var d2 = r4(i4 ? 1 : 0, s2 ? 1 : 0) !== 0 ? n(-1) : n(0);
          for (var p2 = h2.length - 1; p2 >= 0; p2 -= 1)
            d2 = d2.multiply(K).add(n(h2[p2]));
          return d2;
        }
        c.prototype.not = function() {
          return this.negate().prev();
        };
        f.prototype.not = l.prototype.not = c.prototype.not;
        c.prototype.and = function(t4) {
          return j(this, t4, function(t5, e5) {
            return t5 & e5;
          });
        };
        f.prototype.and = l.prototype.and = c.prototype.and;
        c.prototype.or = function(t4) {
          return j(this, t4, function(t5, e5) {
            return t5 | e5;
          });
        };
        f.prototype.or = l.prototype.or = c.prototype.or;
        c.prototype.xor = function(t4) {
          return j(this, t4, function(t5, e5) {
            return t5 ^ e5;
          });
        };
        f.prototype.xor = l.prototype.xor = c.prototype.xor;
        var q = 1 << 30, F = (e4 & -e4) * (e4 & -e4) | q;
        function z(t4) {
          var r4 = t4.value, i4 = typeof r4 === "number" ? r4 | q : typeof r4 === "bigint" ? r4 | BigInt(q) : r4[0] + r4[1] * e4 | F;
          return i4 & -i4;
        }
        function G(t4, e5) {
          if (e5.compareTo(t4) <= 0) {
            var r4 = G(t4, e5.square(e5));
            var i4 = r4.p;
            var s2 = r4.e;
            var a2 = i4.multiply(e5);
            return a2.compareTo(t4) <= 0 ? { p: a2, e: 2 * s2 + 1 } : { p: i4, e: 2 * s2 };
          }
          return { p: n(1), e: 0 };
        }
        c.prototype.bitLength = function() {
          var t4 = this;
          if (t4.compareTo(n(0)) < 0)
            t4 = t4.negate().subtract(n(1));
          if (t4.compareTo(n(0)) === 0)
            return n(0);
          return n(G(t4, n(2)).e).add(n(1));
        };
        f.prototype.bitLength = l.prototype.bitLength = c.prototype.bitLength;
        function Y(t4, e5) {
          t4 = st(t4);
          e5 = st(e5);
          return t4.greater(e5) ? t4 : e5;
        }
        function W(t4, e5) {
          t4 = st(t4);
          e5 = st(e5);
          return t4.lesser(e5) ? t4 : e5;
        }
        function J(t4, e5) {
          t4 = st(t4).abs();
          e5 = st(e5).abs();
          if (t4.equals(e5))
            return t4;
          if (t4.isZero())
            return e5;
          if (e5.isZero())
            return t4;
          var r4 = u[1], i4, n2;
          while (t4.isEven() && e5.isEven()) {
            i4 = W(z(t4), z(e5));
            t4 = t4.divide(i4);
            e5 = e5.divide(i4);
            r4 = r4.multiply(i4);
          }
          while (t4.isEven())
            t4 = t4.divide(z(t4));
          do {
            while (e5.isEven())
              e5 = e5.divide(z(e5));
            if (t4.greater(e5)) {
              n2 = e5;
              e5 = t4;
              t4 = n2;
            }
            e5 = e5.subtract(t4);
          } while (!e5.isZero());
          return r4.isUnit() ? t4 : t4.multiply(r4);
        }
        function Z(t4, e5) {
          t4 = st(t4).abs();
          e5 = st(e5).abs();
          return t4.divide(J(t4, e5)).multiply(e5);
        }
        function $(t4, r4, i4) {
          t4 = st(t4);
          r4 = st(r4);
          var n2 = i4 || Math.random;
          var s2 = W(t4, r4), a2 = Y(t4, r4);
          var o3 = a2.subtract(s2).add(1);
          if (o3.isSmall)
            return s2.add(Math.floor(n2() * o3));
          var c2 = et(o3, e4).value;
          var l2 = [], f2 = true;
          for (var h2 = 0; h2 < c2.length; h2++) {
            var d2 = f2 ? c2[h2] + (h2 + 1 < c2.length ? c2[h2 + 1] / e4 : 0) : e4;
            var p2 = y(n2() * d2);
            l2.push(p2);
            if (p2 < c2[h2])
              f2 = false;
          }
          return s2.add(u.fromArray(l2, e4, false));
        }
        var X = function(t4, e5, r4, i4) {
          r4 = r4 || a;
          t4 = String(t4);
          if (!i4) {
            t4 = t4.toLowerCase();
            r4 = r4.toLowerCase();
          }
          var n2 = t4.length;
          var s2;
          var o3 = Math.abs(e5);
          var u2 = {};
          for (s2 = 0; s2 < r4.length; s2++)
            u2[r4[s2]] = s2;
          for (s2 = 0; s2 < n2; s2++) {
            var c2 = t4[s2];
            if (c2 === "-")
              continue;
            if (c2 in u2) {
              if (u2[c2] >= o3) {
                if (c2 === "1" && o3 === 1)
                  continue;
                throw new Error(c2 + " is not a valid digit in base " + e5 + ".");
              }
            }
          }
          e5 = st(e5);
          var l2 = [];
          var f2 = t4[0] === "-";
          for (s2 = f2 ? 1 : 0; s2 < t4.length; s2++) {
            var c2 = t4[s2];
            if (c2 in u2)
              l2.push(st(u2[c2]));
            else if (c2 === "<") {
              var h2 = s2;
              do {
                s2++;
              } while (t4[s2] !== ">" && s2 < t4.length);
              l2.push(st(t4.slice(h2 + 1, s2)));
            } else
              throw new Error(c2 + " is not a valid character");
          }
          return Q(l2, e5, f2);
        };
        function Q(t4, e5, r4) {
          var i4 = u[0], n2 = u[1], s2;
          for (s2 = t4.length - 1; s2 >= 0; s2--) {
            i4 = i4.add(t4[s2].times(n2));
            n2 = n2.times(e5);
          }
          return r4 ? i4.negate() : i4;
        }
        function tt2(t4, e5) {
          e5 = e5 || a;
          if (t4 < e5.length)
            return e5[t4];
          return "<" + t4 + ">";
        }
        function et(t4, e5) {
          e5 = n(e5);
          if (e5.isZero()) {
            if (t4.isZero())
              return { value: [0], isNegative: false };
            throw new Error("Cannot convert nonzero numbers to base 0.");
          }
          if (e5.equals(-1)) {
            if (t4.isZero())
              return { value: [0], isNegative: false };
            if (t4.isNegative())
              return { value: [].concat.apply([], Array.apply(null, Array(-t4.toJSNumber())).map(Array.prototype.valueOf, [1, 0])), isNegative: false };
            var r4 = Array.apply(null, Array(t4.toJSNumber() - 1)).map(Array.prototype.valueOf, [0, 1]);
            r4.unshift([1]);
            return { value: [].concat.apply([], r4), isNegative: false };
          }
          var i4 = false;
          if (t4.isNegative() && e5.isPositive()) {
            i4 = true;
            t4 = t4.abs();
          }
          if (e5.isUnit()) {
            if (t4.isZero())
              return { value: [0], isNegative: false };
            return { value: Array.apply(null, Array(t4.toJSNumber())).map(Number.prototype.valueOf, 1), isNegative: i4 };
          }
          var s2 = [];
          var a2 = t4, o3;
          while (a2.isNegative() || a2.compareAbs(e5) >= 0) {
            o3 = a2.divmod(e5);
            a2 = o3.quotient;
            var u2 = o3.remainder;
            if (u2.isNegative()) {
              u2 = e5.minus(u2).abs();
              a2 = a2.next();
            }
            s2.push(u2.toJSNumber());
          }
          s2.push(a2.toJSNumber());
          return { value: s2.reverse(), isNegative: i4 };
        }
        function rt(t4, e5, r4) {
          var i4 = et(t4, e5);
          return (i4.isNegative ? "-" : "") + i4.value.map(function(t5) {
            return tt2(t5, r4);
          }).join("");
        }
        c.prototype.toArray = function(t4) {
          return et(this, t4);
        };
        l.prototype.toArray = function(t4) {
          return et(this, t4);
        };
        f.prototype.toArray = function(t4) {
          return et(this, t4);
        };
        c.prototype.toString = function(e5, r4) {
          if (e5 === t3)
            e5 = 10;
          if (e5 !== 10)
            return rt(this, e5, r4);
          var i4 = this.value, n2 = i4.length, s2 = String(i4[--n2]), a2 = "0000000", o3;
          while (--n2 >= 0) {
            o3 = String(i4[n2]);
            s2 += a2.slice(o3.length) + o3;
          }
          var u2 = this.sign ? "-" : "";
          return u2 + s2;
        };
        l.prototype.toString = function(e5, r4) {
          if (e5 === t3)
            e5 = 10;
          if (e5 != 10)
            return rt(this, e5, r4);
          return String(this.value);
        };
        f.prototype.toString = l.prototype.toString;
        f.prototype.toJSON = c.prototype.toJSON = l.prototype.toJSON = function() {
          return this.toString();
        };
        c.prototype.valueOf = function() {
          return parseInt(this.toString(), 10);
        };
        c.prototype.toJSNumber = c.prototype.valueOf;
        l.prototype.valueOf = function() {
          return this.value;
        };
        l.prototype.toJSNumber = l.prototype.valueOf;
        f.prototype.valueOf = f.prototype.toJSNumber = function() {
          return parseInt(this.toString(), 10);
        };
        function it(t4) {
          if (h(+t4)) {
            var e5 = +t4;
            if (e5 === y(e5))
              return o2 ? new f(BigInt(e5)) : new l(e5);
            throw new Error("Invalid integer: " + t4);
          }
          var i4 = t4[0] === "-";
          if (i4)
            t4 = t4.slice(1);
          var n2 = t4.split(/e/i);
          if (n2.length > 2)
            throw new Error("Invalid integer: " + n2.join("e"));
          if (n2.length === 2) {
            var s2 = n2[1];
            if (s2[0] === "+")
              s2 = s2.slice(1);
            s2 = +s2;
            if (s2 !== y(s2) || !h(s2))
              throw new Error("Invalid integer: " + s2 + " is not a valid exponent.");
            var a2 = n2[0];
            var u2 = a2.indexOf(".");
            if (u2 >= 0) {
              s2 -= a2.length - u2 - 1;
              a2 = a2.slice(0, u2) + a2.slice(u2 + 1);
            }
            if (s2 < 0)
              throw new Error("Cannot include negative exponent part for integers");
            a2 += new Array(s2 + 1).join("0");
            t4 = a2;
          }
          var d2 = /^([0-9][0-9]*)$/.test(t4);
          if (!d2)
            throw new Error("Invalid integer: " + t4);
          if (o2)
            return new f(BigInt(i4 ? "-" + t4 : t4));
          var p2 = [], g2 = t4.length, m2 = r3, w2 = g2 - m2;
          while (g2 > 0) {
            p2.push(+t4.slice(w2, g2));
            w2 -= m2;
            if (w2 < 0)
              w2 = 0;
            g2 -= m2;
          }
          v(p2);
          return new c(p2, i4);
        }
        function nt(t4) {
          if (o2)
            return new f(BigInt(t4));
          if (h(t4)) {
            if (t4 !== y(t4))
              throw new Error(t4 + " is not an integer.");
            return new l(t4);
          }
          return it(t4.toString());
        }
        function st(t4) {
          if (typeof t4 === "number")
            return nt(t4);
          if (typeof t4 === "string")
            return it(t4);
          if (typeof t4 === "bigint")
            return new f(t4);
          return t4;
        }
        for (var at = 0; at < 1e3; at++) {
          u[at] = st(at);
          if (at > 0)
            u[-at] = st(-at);
        }
        u.one = u[1];
        u.zero = u[0];
        u.minusOne = u[-1];
        u.max = Y;
        u.min = W;
        u.gcd = J;
        u.lcm = Z;
        u.isInstance = function(t4) {
          return t4 instanceof c || t4 instanceof l || t4 instanceof f;
        };
        u.randBetween = $;
        u.fromArray = function(t4, e5, r4) {
          return Q(t4.map(st), st(e5 || 10), r4);
        };
        return u;
      }();
      if (t2.hasOwnProperty("exports"))
        t2.exports = n;
      i2 = function() {
        return n;
      }.call(e3, r2, e3, t2), i2 !== void 0 && (t2.exports = i2);
    }, 452: function(t2, e3, r2) {
      (function(i2, n, s) {
        t2.exports = n(r2(8249), r2(8269), r2(8214), r2(888), r2(5109));
      })(this, function(t3) {
        (function() {
          var e4 = t3;
          var r3 = e4.lib;
          var i2 = r3.BlockCipher;
          var n = e4.algo;
          var s = [];
          var a = [];
          var o2 = [];
          var u = [];
          var c = [];
          var l = [];
          var f = [];
          var h = [];
          var d = [];
          var p = [];
          (function() {
            var t4 = [];
            for (var e5 = 0; e5 < 256; e5++)
              if (e5 < 128)
                t4[e5] = e5 << 1;
              else
                t4[e5] = e5 << 1 ^ 283;
            var r4 = 0;
            var i3 = 0;
            for (var e5 = 0; e5 < 256; e5++) {
              var n2 = i3 ^ i3 << 1 ^ i3 << 2 ^ i3 << 3 ^ i3 << 4;
              n2 = n2 >>> 8 ^ 255 & n2 ^ 99;
              s[r4] = n2;
              a[n2] = r4;
              var v2 = t4[r4];
              var g2 = t4[v2];
              var y = t4[g2];
              var m = 257 * t4[n2] ^ 16843008 * n2;
              o2[r4] = m << 24 | m >>> 8;
              u[r4] = m << 16 | m >>> 16;
              c[r4] = m << 8 | m >>> 24;
              l[r4] = m;
              var m = 16843009 * y ^ 65537 * g2 ^ 257 * v2 ^ 16843008 * r4;
              f[n2] = m << 24 | m >>> 8;
              h[n2] = m << 16 | m >>> 16;
              d[n2] = m << 8 | m >>> 24;
              p[n2] = m;
              if (!r4)
                r4 = i3 = 1;
              else {
                r4 = v2 ^ t4[t4[t4[y ^ v2]]];
                i3 ^= t4[t4[i3]];
              }
            }
          })();
          var v = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54];
          var g = n.AES = i2.extend({ _doReset: function() {
            var t4;
            if (this._nRounds && this._keyPriorReset === this._key)
              return;
            var e5 = this._keyPriorReset = this._key;
            var r4 = e5.words;
            var i3 = e5.sigBytes / 4;
            var n2 = this._nRounds = i3 + 6;
            var a2 = 4 * (n2 + 1);
            var o3 = this._keySchedule = [];
            for (var u2 = 0; u2 < a2; u2++)
              if (u2 < i3)
                o3[u2] = r4[u2];
              else {
                t4 = o3[u2 - 1];
                if (!(u2 % i3)) {
                  t4 = t4 << 8 | t4 >>> 24;
                  t4 = s[t4 >>> 24] << 24 | s[t4 >>> 16 & 255] << 16 | s[t4 >>> 8 & 255] << 8 | s[255 & t4];
                  t4 ^= v[u2 / i3 | 0] << 24;
                } else if (i3 > 6 && u2 % i3 == 4)
                  t4 = s[t4 >>> 24] << 24 | s[t4 >>> 16 & 255] << 16 | s[t4 >>> 8 & 255] << 8 | s[255 & t4];
                o3[u2] = o3[u2 - i3] ^ t4;
              }
            var c2 = this._invKeySchedule = [];
            for (var l2 = 0; l2 < a2; l2++) {
              var u2 = a2 - l2;
              if (l2 % 4)
                var t4 = o3[u2];
              else
                var t4 = o3[u2 - 4];
              if (l2 < 4 || u2 <= 4)
                c2[l2] = t4;
              else
                c2[l2] = f[s[t4 >>> 24]] ^ h[s[t4 >>> 16 & 255]] ^ d[s[t4 >>> 8 & 255]] ^ p[s[255 & t4]];
            }
          }, encryptBlock: function(t4, e5) {
            this._doCryptBlock(t4, e5, this._keySchedule, o2, u, c, l, s);
          }, decryptBlock: function(t4, e5) {
            var r4 = t4[e5 + 1];
            t4[e5 + 1] = t4[e5 + 3];
            t4[e5 + 3] = r4;
            this._doCryptBlock(t4, e5, this._invKeySchedule, f, h, d, p, a);
            var r4 = t4[e5 + 1];
            t4[e5 + 1] = t4[e5 + 3];
            t4[e5 + 3] = r4;
          }, _doCryptBlock: function(t4, e5, r4, i3, n2, s2, a2, o3) {
            var u2 = this._nRounds;
            var c2 = t4[e5] ^ r4[0];
            var l2 = t4[e5 + 1] ^ r4[1];
            var f2 = t4[e5 + 2] ^ r4[2];
            var h2 = t4[e5 + 3] ^ r4[3];
            var d2 = 4;
            for (var p2 = 1; p2 < u2; p2++) {
              var v2 = i3[c2 >>> 24] ^ n2[l2 >>> 16 & 255] ^ s2[f2 >>> 8 & 255] ^ a2[255 & h2] ^ r4[d2++];
              var g2 = i3[l2 >>> 24] ^ n2[f2 >>> 16 & 255] ^ s2[h2 >>> 8 & 255] ^ a2[255 & c2] ^ r4[d2++];
              var y = i3[f2 >>> 24] ^ n2[h2 >>> 16 & 255] ^ s2[c2 >>> 8 & 255] ^ a2[255 & l2] ^ r4[d2++];
              var m = i3[h2 >>> 24] ^ n2[c2 >>> 16 & 255] ^ s2[l2 >>> 8 & 255] ^ a2[255 & f2] ^ r4[d2++];
              c2 = v2;
              l2 = g2;
              f2 = y;
              h2 = m;
            }
            var v2 = (o3[c2 >>> 24] << 24 | o3[l2 >>> 16 & 255] << 16 | o3[f2 >>> 8 & 255] << 8 | o3[255 & h2]) ^ r4[d2++];
            var g2 = (o3[l2 >>> 24] << 24 | o3[f2 >>> 16 & 255] << 16 | o3[h2 >>> 8 & 255] << 8 | o3[255 & c2]) ^ r4[d2++];
            var y = (o3[f2 >>> 24] << 24 | o3[h2 >>> 16 & 255] << 16 | o3[c2 >>> 8 & 255] << 8 | o3[255 & l2]) ^ r4[d2++];
            var m = (o3[h2 >>> 24] << 24 | o3[c2 >>> 16 & 255] << 16 | o3[l2 >>> 8 & 255] << 8 | o3[255 & f2]) ^ r4[d2++];
            t4[e5] = v2;
            t4[e5 + 1] = g2;
            t4[e5 + 2] = y;
            t4[e5 + 3] = m;
          }, keySize: 256 / 32 });
          e4.AES = i2._createHelper(g);
        })();
        return t3.AES;
      });
    }, 5109: function(t2, e3, r2) {
      (function(i2, n, s) {
        t2.exports = n(r2(8249), r2(888));
      })(this, function(t3) {
        t3.lib.Cipher || function(e4) {
          var r3 = t3;
          var i2 = r3.lib;
          var n = i2.Base;
          var s = i2.WordArray;
          var a = i2.BufferedBlockAlgorithm;
          var o2 = r3.enc;
          o2.Utf8;
          var c = o2.Base64;
          var l = r3.algo;
          var f = l.EvpKDF;
          var h = i2.Cipher = a.extend({ cfg: n.extend(), createEncryptor: function(t4, e5) {
            return this.create(this._ENC_XFORM_MODE, t4, e5);
          }, createDecryptor: function(t4, e5) {
            return this.create(this._DEC_XFORM_MODE, t4, e5);
          }, init: function(t4, e5, r4) {
            this.cfg = this.cfg.extend(r4);
            this._xformMode = t4;
            this._key = e5;
            this.reset();
          }, reset: function() {
            a.reset.call(this);
            this._doReset();
          }, process: function(t4) {
            this._append(t4);
            return this._process();
          }, finalize: function(t4) {
            if (t4)
              this._append(t4);
            var e5 = this._doFinalize();
            return e5;
          }, keySize: 128 / 32, ivSize: 128 / 32, _ENC_XFORM_MODE: 1, _DEC_XFORM_MODE: 2, _createHelper: function() {
            function t4(t5) {
              if (typeof t5 == "string")
                return T;
              else
                return E2;
            }
            return function(e5) {
              return { encrypt: function(r4, i3, n2) {
                return t4(i3).encrypt(e5, r4, i3, n2);
              }, decrypt: function(r4, i3, n2) {
                return t4(i3).decrypt(e5, r4, i3, n2);
              } };
            };
          }() });
          i2.StreamCipher = h.extend({ _doFinalize: function() {
            var t4 = this._process(true);
            return t4;
          }, blockSize: 1 });
          var p = r3.mode = {};
          var v = i2.BlockCipherMode = n.extend({ createEncryptor: function(t4, e5) {
            return this.Encryptor.create(t4, e5);
          }, createDecryptor: function(t4, e5) {
            return this.Decryptor.create(t4, e5);
          }, init: function(t4, e5) {
            this._cipher = t4;
            this._iv = e5;
          } });
          var g = p.CBC = function() {
            var t4 = v.extend();
            t4.Encryptor = t4.extend({ processBlock: function(t5, e5) {
              var i3 = this._cipher;
              var n2 = i3.blockSize;
              r4.call(this, t5, e5, n2);
              i3.encryptBlock(t5, e5);
              this._prevBlock = t5.slice(e5, e5 + n2);
            } });
            t4.Decryptor = t4.extend({ processBlock: function(t5, e5) {
              var i3 = this._cipher;
              var n2 = i3.blockSize;
              var s2 = t5.slice(e5, e5 + n2);
              i3.decryptBlock(t5, e5);
              r4.call(this, t5, e5, n2);
              this._prevBlock = s2;
            } });
            function r4(t5, r5, i3) {
              var n2;
              var s2 = this._iv;
              if (s2) {
                n2 = s2;
                this._iv = e4;
              } else
                n2 = this._prevBlock;
              for (var a2 = 0; a2 < i3; a2++)
                t5[r5 + a2] ^= n2[a2];
            }
            return t4;
          }();
          var y = r3.pad = {};
          var m = y.Pkcs7 = { pad: function(t4, e5) {
            var r4 = 4 * e5;
            var i3 = r4 - t4.sigBytes % r4;
            var n2 = i3 << 24 | i3 << 16 | i3 << 8 | i3;
            var a2 = [];
            for (var o3 = 0; o3 < i3; o3 += 4)
              a2.push(n2);
            var u = s.create(a2, i3);
            t4.concat(u);
          }, unpad: function(t4) {
            var e5 = 255 & t4.words[t4.sigBytes - 1 >>> 2];
            t4.sigBytes -= e5;
          } };
          i2.BlockCipher = h.extend({ cfg: h.cfg.extend({ mode: g, padding: m }), reset: function() {
            var t4;
            h.reset.call(this);
            var e5 = this.cfg;
            var r4 = e5.iv;
            var i3 = e5.mode;
            if (this._xformMode == this._ENC_XFORM_MODE)
              t4 = i3.createEncryptor;
            else {
              t4 = i3.createDecryptor;
              this._minBufferSize = 1;
            }
            if (this._mode && this._mode.__creator == t4)
              this._mode.init(this, r4 && r4.words);
            else {
              this._mode = t4.call(i3, this, r4 && r4.words);
              this._mode.__creator = t4;
            }
          }, _doProcessBlock: function(t4, e5) {
            this._mode.processBlock(t4, e5);
          }, _doFinalize: function() {
            var t4;
            var e5 = this.cfg.padding;
            if (this._xformMode == this._ENC_XFORM_MODE) {
              e5.pad(this._data, this.blockSize);
              t4 = this._process(true);
            } else {
              t4 = this._process(true);
              e5.unpad(t4);
            }
            return t4;
          }, blockSize: 128 / 32 });
          var S = i2.CipherParams = n.extend({ init: function(t4) {
            this.mixIn(t4);
          }, toString: function(t4) {
            return (t4 || this.formatter).stringify(this);
          } });
          var _ = r3.format = {};
          var b = _.OpenSSL = { stringify: function(t4) {
            var e5;
            var r4 = t4.ciphertext;
            var i3 = t4.salt;
            if (i3)
              e5 = s.create([1398893684, 1701076831]).concat(i3).concat(r4);
            else
              e5 = r4;
            return e5.toString(c);
          }, parse: function(t4) {
            var e5;
            var r4 = c.parse(t4);
            var i3 = r4.words;
            if (i3[0] == 1398893684 && i3[1] == 1701076831) {
              e5 = s.create(i3.slice(2, 4));
              i3.splice(0, 4);
              r4.sigBytes -= 16;
            }
            return S.create({ ciphertext: r4, salt: e5 });
          } };
          var E2 = i2.SerializableCipher = n.extend({ cfg: n.extend({ format: b }), encrypt: function(t4, e5, r4, i3) {
            i3 = this.cfg.extend(i3);
            var n2 = t4.createEncryptor(r4, i3);
            var s2 = n2.finalize(e5);
            var a2 = n2.cfg;
            return S.create({ ciphertext: s2, key: r4, iv: a2.iv, algorithm: t4, mode: a2.mode, padding: a2.padding, blockSize: t4.blockSize, formatter: i3.format });
          }, decrypt: function(t4, e5, r4, i3) {
            i3 = this.cfg.extend(i3);
            e5 = this._parse(e5, i3.format);
            var n2 = t4.createDecryptor(r4, i3).finalize(e5.ciphertext);
            return n2;
          }, _parse: function(t4, e5) {
            if (typeof t4 == "string")
              return e5.parse(t4, this);
            else
              return t4;
          } });
          var D = r3.kdf = {};
          var M = D.OpenSSL = { execute: function(t4, e5, r4, i3) {
            if (!i3)
              i3 = s.random(64 / 8);
            var n2 = f.create({ keySize: e5 + r4 }).compute(t4, i3);
            var a2 = s.create(n2.words.slice(e5), 4 * r4);
            n2.sigBytes = 4 * e5;
            return S.create({ key: n2, iv: a2, salt: i3 });
          } };
          var T = i2.PasswordBasedCipher = E2.extend({ cfg: E2.cfg.extend({ kdf: M }), encrypt: function(t4, e5, r4, i3) {
            i3 = this.cfg.extend(i3);
            var n2 = i3.kdf.execute(r4, t4.keySize, t4.ivSize);
            i3.iv = n2.iv;
            var s2 = E2.encrypt.call(this, t4, e5, n2.key, i3);
            s2.mixIn(n2);
            return s2;
          }, decrypt: function(t4, e5, r4, i3) {
            i3 = this.cfg.extend(i3);
            e5 = this._parse(e5, i3.format);
            var n2 = i3.kdf.execute(r4, t4.keySize, t4.ivSize, e5.salt);
            i3.iv = n2.iv;
            var s2 = E2.decrypt.call(this, t4, e5, n2.key, i3);
            return s2;
          } });
        }();
      });
    }, 8249: function(t2, e3, r2) {
      (function(r3, i2) {
        t2.exports = i2();
      })(this, function() {
        var t3 = t3 || function(t4, e4) {
          var i2;
          if (typeof window !== "undefined" && window.crypto)
            i2 = window.crypto;
          if (typeof self !== "undefined" && self.crypto)
            i2 = self.crypto;
          if (typeof globalThis !== "undefined" && globalThis.crypto)
            i2 = globalThis.crypto;
          if (!i2 && typeof window !== "undefined" && window.msCrypto)
            i2 = window.msCrypto;
          if (!i2 && typeof r2.g !== "undefined" && r2.g.crypto)
            i2 = r2.g.crypto;
          if (!i2 && true)
            try {
              i2 = r2(2480);
            } catch (t5) {
            }
          var n = function() {
            if (i2) {
              if (typeof i2.getRandomValues === "function")
                try {
                  return i2.getRandomValues(new Uint32Array(1))[0];
                } catch (t5) {
                }
              if (typeof i2.randomBytes === "function")
                try {
                  return i2.randomBytes(4).readInt32LE();
                } catch (t5) {
                }
            }
            throw new Error("Native crypto module could not be used to get secure random number.");
          };
          var s = Object.create || function() {
            function t5() {
            }
            return function(e5) {
              var r3;
              t5.prototype = e5;
              r3 = new t5();
              t5.prototype = null;
              return r3;
            };
          }();
          var a = {};
          var o2 = a.lib = {};
          var u = o2.Base = function() {
            return { extend: function(t5) {
              var e5 = s(this);
              if (t5)
                e5.mixIn(t5);
              if (!e5.hasOwnProperty("init") || this.init === e5.init)
                e5.init = function() {
                  e5.$super.init.apply(this, arguments);
                };
              e5.init.prototype = e5;
              e5.$super = this;
              return e5;
            }, create: function() {
              var t5 = this.extend();
              t5.init.apply(t5, arguments);
              return t5;
            }, init: function() {
            }, mixIn: function(t5) {
              for (var e5 in t5)
                if (t5.hasOwnProperty(e5))
                  this[e5] = t5[e5];
              if (t5.hasOwnProperty("toString"))
                this.toString = t5.toString;
            }, clone: function() {
              return this.init.prototype.extend(this);
            } };
          }();
          var c = o2.WordArray = u.extend({ init: function(t5, r3) {
            t5 = this.words = t5 || [];
            if (r3 != e4)
              this.sigBytes = r3;
            else
              this.sigBytes = 4 * t5.length;
          }, toString: function(t5) {
            return (t5 || f).stringify(this);
          }, concat: function(t5) {
            var e5 = this.words;
            var r3 = t5.words;
            var i3 = this.sigBytes;
            var n2 = t5.sigBytes;
            this.clamp();
            if (i3 % 4)
              for (var s2 = 0; s2 < n2; s2++) {
                var a2 = r3[s2 >>> 2] >>> 24 - s2 % 4 * 8 & 255;
                e5[i3 + s2 >>> 2] |= a2 << 24 - (i3 + s2) % 4 * 8;
              }
            else
              for (var o3 = 0; o3 < n2; o3 += 4)
                e5[i3 + o3 >>> 2] = r3[o3 >>> 2];
            this.sigBytes += n2;
            return this;
          }, clamp: function() {
            var e5 = this.words;
            var r3 = this.sigBytes;
            e5[r3 >>> 2] &= 4294967295 << 32 - r3 % 4 * 8;
            e5.length = t4.ceil(r3 / 4);
          }, clone: function() {
            var t5 = u.clone.call(this);
            t5.words = this.words.slice(0);
            return t5;
          }, random: function(t5) {
            var e5 = [];
            for (var r3 = 0; r3 < t5; r3 += 4)
              e5.push(n());
            return new c.init(e5, t5);
          } });
          var l = a.enc = {};
          var f = l.Hex = { stringify: function(t5) {
            var e5 = t5.words;
            var r3 = t5.sigBytes;
            var i3 = [];
            for (var n2 = 0; n2 < r3; n2++) {
              var s2 = e5[n2 >>> 2] >>> 24 - n2 % 4 * 8 & 255;
              i3.push((s2 >>> 4).toString(16));
              i3.push((15 & s2).toString(16));
            }
            return i3.join("");
          }, parse: function(t5) {
            var e5 = t5.length;
            var r3 = [];
            for (var i3 = 0; i3 < e5; i3 += 2)
              r3[i3 >>> 3] |= parseInt(t5.substr(i3, 2), 16) << 24 - i3 % 8 * 4;
            return new c.init(r3, e5 / 2);
          } };
          var h = l.Latin1 = { stringify: function(t5) {
            var e5 = t5.words;
            var r3 = t5.sigBytes;
            var i3 = [];
            for (var n2 = 0; n2 < r3; n2++) {
              var s2 = e5[n2 >>> 2] >>> 24 - n2 % 4 * 8 & 255;
              i3.push(String.fromCharCode(s2));
            }
            return i3.join("");
          }, parse: function(t5) {
            var e5 = t5.length;
            var r3 = [];
            for (var i3 = 0; i3 < e5; i3++)
              r3[i3 >>> 2] |= (255 & t5.charCodeAt(i3)) << 24 - i3 % 4 * 8;
            return new c.init(r3, e5);
          } };
          var d = l.Utf8 = { stringify: function(t5) {
            try {
              return decodeURIComponent(escape(h.stringify(t5)));
            } catch (t6) {
              throw new Error("Malformed UTF-8 data");
            }
          }, parse: function(t5) {
            return h.parse(unescape(encodeURIComponent(t5)));
          } };
          var p = o2.BufferedBlockAlgorithm = u.extend({ reset: function() {
            this._data = new c.init();
            this._nDataBytes = 0;
          }, _append: function(t5) {
            if (typeof t5 == "string")
              t5 = d.parse(t5);
            this._data.concat(t5);
            this._nDataBytes += t5.sigBytes;
          }, _process: function(e5) {
            var r3;
            var i3 = this._data;
            var n2 = i3.words;
            var s2 = i3.sigBytes;
            var a2 = this.blockSize;
            var o3 = 4 * a2;
            var u2 = s2 / o3;
            if (e5)
              u2 = t4.ceil(u2);
            else
              u2 = t4.max((0 | u2) - this._minBufferSize, 0);
            var l2 = u2 * a2;
            var f2 = t4.min(4 * l2, s2);
            if (l2) {
              for (var h2 = 0; h2 < l2; h2 += a2)
                this._doProcessBlock(n2, h2);
              r3 = n2.splice(0, l2);
              i3.sigBytes -= f2;
            }
            return new c.init(r3, f2);
          }, clone: function() {
            var t5 = u.clone.call(this);
            t5._data = this._data.clone();
            return t5;
          }, _minBufferSize: 0 });
          o2.Hasher = p.extend({ cfg: u.extend(), init: function(t5) {
            this.cfg = this.cfg.extend(t5);
            this.reset();
          }, reset: function() {
            p.reset.call(this);
            this._doReset();
          }, update: function(t5) {
            this._append(t5);
            this._process();
            return this;
          }, finalize: function(t5) {
            if (t5)
              this._append(t5);
            var e5 = this._doFinalize();
            return e5;
          }, blockSize: 512 / 32, _createHelper: function(t5) {
            return function(e5, r3) {
              return new t5.init(r3).finalize(e5);
            };
          }, _createHmacHelper: function(t5) {
            return function(e5, r3) {
              return new g.HMAC.init(t5, r3).finalize(e5);
            };
          } });
          var g = a.algo = {};
          return a;
        }(Math);
        return t3;
      });
    }, 8269: function(t2, e3, r2) {
      (function(i2, n) {
        t2.exports = n(r2(8249));
      })(this, function(t3) {
        (function() {
          var e4 = t3;
          var r3 = e4.lib;
          var i2 = r3.WordArray;
          var n = e4.enc;
          n.Base64 = { stringify: function(t4) {
            var e5 = t4.words;
            var r4 = t4.sigBytes;
            var i3 = this._map;
            t4.clamp();
            var n2 = [];
            for (var s = 0; s < r4; s += 3) {
              var a2 = e5[s >>> 2] >>> 24 - s % 4 * 8 & 255;
              var o2 = e5[s + 1 >>> 2] >>> 24 - (s + 1) % 4 * 8 & 255;
              var u = e5[s + 2 >>> 2] >>> 24 - (s + 2) % 4 * 8 & 255;
              var c = a2 << 16 | o2 << 8 | u;
              for (var l = 0; l < 4 && s + 0.75 * l < r4; l++)
                n2.push(i3.charAt(c >>> 6 * (3 - l) & 63));
            }
            var f = i3.charAt(64);
            if (f)
              while (n2.length % 4)
                n2.push(f);
            return n2.join("");
          }, parse: function(t4) {
            var e5 = t4.length;
            var r4 = this._map;
            var i3 = this._reverseMap;
            if (!i3) {
              i3 = this._reverseMap = [];
              for (var n2 = 0; n2 < r4.length; n2++)
                i3[r4.charCodeAt(n2)] = n2;
            }
            var s = r4.charAt(64);
            if (s) {
              var o2 = t4.indexOf(s);
              if (o2 !== -1)
                e5 = o2;
            }
            return a(t4, e5, i3);
          }, _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=" };
          function a(t4, e5, r4) {
            var n2 = [];
            var s = 0;
            for (var a2 = 0; a2 < e5; a2++)
              if (a2 % 4) {
                var o2 = r4[t4.charCodeAt(a2 - 1)] << a2 % 4 * 2;
                var u = r4[t4.charCodeAt(a2)] >>> 6 - a2 % 4 * 2;
                var c = o2 | u;
                n2[s >>> 2] |= c << 24 - s % 4 * 8;
                s++;
              }
            return i2.create(n2, s);
          }
        })();
        return t3.enc.Base64;
      });
    }, 3786: function(t2, e3, r2) {
      (function(i2, n) {
        t2.exports = n(r2(8249));
      })(this, function(t3) {
        (function() {
          var e4 = t3;
          var r3 = e4.lib;
          var i2 = r3.WordArray;
          var n = e4.enc;
          n.Base64url = { stringify: function(t4, e5 = true) {
            var r4 = t4.words;
            var i3 = t4.sigBytes;
            var n2 = e5 ? this._safe_map : this._map;
            t4.clamp();
            var s = [];
            for (var a2 = 0; a2 < i3; a2 += 3) {
              var o2 = r4[a2 >>> 2] >>> 24 - a2 % 4 * 8 & 255;
              var u = r4[a2 + 1 >>> 2] >>> 24 - (a2 + 1) % 4 * 8 & 255;
              var c = r4[a2 + 2 >>> 2] >>> 24 - (a2 + 2) % 4 * 8 & 255;
              var l = o2 << 16 | u << 8 | c;
              for (var f = 0; f < 4 && a2 + 0.75 * f < i3; f++)
                s.push(n2.charAt(l >>> 6 * (3 - f) & 63));
            }
            var h = n2.charAt(64);
            if (h)
              while (s.length % 4)
                s.push(h);
            return s.join("");
          }, parse: function(t4, e5 = true) {
            var r4 = t4.length;
            var i3 = e5 ? this._safe_map : this._map;
            var n2 = this._reverseMap;
            if (!n2) {
              n2 = this._reverseMap = [];
              for (var s = 0; s < i3.length; s++)
                n2[i3.charCodeAt(s)] = s;
            }
            var o2 = i3.charAt(64);
            if (o2) {
              var u = t4.indexOf(o2);
              if (u !== -1)
                r4 = u;
            }
            return a(t4, r4, n2);
          }, _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", _safe_map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_" };
          function a(t4, e5, r4) {
            var n2 = [];
            var s = 0;
            for (var a2 = 0; a2 < e5; a2++)
              if (a2 % 4) {
                var o2 = r4[t4.charCodeAt(a2 - 1)] << a2 % 4 * 2;
                var u = r4[t4.charCodeAt(a2)] >>> 6 - a2 % 4 * 2;
                var c = o2 | u;
                n2[s >>> 2] |= c << 24 - s % 4 * 8;
                s++;
              }
            return i2.create(n2, s);
          }
        })();
        return t3.enc.Base64url;
      });
    }, 298: function(t2, e3, r2) {
      (function(i2, n) {
        t2.exports = n(r2(8249));
      })(this, function(t3) {
        (function() {
          var e4 = t3;
          var r3 = e4.lib;
          var i2 = r3.WordArray;
          var n = e4.enc;
          n.Utf16 = n.Utf16BE = { stringify: function(t4) {
            var e5 = t4.words;
            var r4 = t4.sigBytes;
            var i3 = [];
            for (var n2 = 0; n2 < r4; n2 += 2) {
              var s = e5[n2 >>> 2] >>> 16 - n2 % 4 * 8 & 65535;
              i3.push(String.fromCharCode(s));
            }
            return i3.join("");
          }, parse: function(t4) {
            var e5 = t4.length;
            var r4 = [];
            for (var n2 = 0; n2 < e5; n2++)
              r4[n2 >>> 1] |= t4.charCodeAt(n2) << 16 - n2 % 2 * 16;
            return i2.create(r4, 2 * e5);
          } };
          n.Utf16LE = { stringify: function(t4) {
            var e5 = t4.words;
            var r4 = t4.sigBytes;
            var i3 = [];
            for (var n2 = 0; n2 < r4; n2 += 2) {
              var s = a(e5[n2 >>> 2] >>> 16 - n2 % 4 * 8 & 65535);
              i3.push(String.fromCharCode(s));
            }
            return i3.join("");
          }, parse: function(t4) {
            var e5 = t4.length;
            var r4 = [];
            for (var n2 = 0; n2 < e5; n2++)
              r4[n2 >>> 1] |= a(t4.charCodeAt(n2) << 16 - n2 % 2 * 16);
            return i2.create(r4, 2 * e5);
          } };
          function a(t4) {
            return t4 << 8 & 4278255360 | t4 >>> 8 & 16711935;
          }
        })();
        return t3.enc.Utf16;
      });
    }, 888: function(t2, e3, r2) {
      (function(i2, n, s) {
        t2.exports = n(r2(8249), r2(2783), r2(9824));
      })(this, function(t3) {
        (function() {
          var e4 = t3;
          var r3 = e4.lib;
          var i2 = r3.Base;
          var n = r3.WordArray;
          var s = e4.algo;
          var a = s.MD5;
          var o2 = s.EvpKDF = i2.extend({ cfg: i2.extend({ keySize: 128 / 32, hasher: a, iterations: 1 }), init: function(t4) {
            this.cfg = this.cfg.extend(t4);
          }, compute: function(t4, e5) {
            var r4;
            var i3 = this.cfg;
            var s2 = i3.hasher.create();
            var a2 = n.create();
            var o3 = a2.words;
            var u = i3.keySize;
            var c = i3.iterations;
            while (o3.length < u) {
              if (r4)
                s2.update(r4);
              r4 = s2.update(t4).finalize(e5);
              s2.reset();
              for (var l = 1; l < c; l++) {
                r4 = s2.finalize(r4);
                s2.reset();
              }
              a2.concat(r4);
            }
            a2.sigBytes = 4 * u;
            return a2;
          } });
          e4.EvpKDF = function(t4, e5, r4) {
            return o2.create(r4).compute(t4, e5);
          };
        })();
        return t3.EvpKDF;
      });
    }, 2209: function(t2, e3, r2) {
      (function(i2, n, s) {
        t2.exports = n(r2(8249), r2(5109));
      })(this, function(t3) {
        (function(e4) {
          var r3 = t3;
          var i2 = r3.lib;
          var n = i2.CipherParams;
          var s = r3.enc;
          var a = s.Hex;
          var o2 = r3.format;
          o2.Hex = { stringify: function(t4) {
            return t4.ciphertext.toString(a);
          }, parse: function(t4) {
            var e5 = a.parse(t4);
            return n.create({ ciphertext: e5 });
          } };
        })();
        return t3.format.Hex;
      });
    }, 9824: function(t2, e3, r2) {
      (function(i2, n) {
        t2.exports = n(r2(8249));
      })(this, function(t3) {
        (function() {
          var e4 = t3;
          var r3 = e4.lib;
          var i2 = r3.Base;
          var n = e4.enc;
          var s = n.Utf8;
          var a = e4.algo;
          a.HMAC = i2.extend({ init: function(t4, e5) {
            t4 = this._hasher = new t4.init();
            if (typeof e5 == "string")
              e5 = s.parse(e5);
            var r4 = t4.blockSize;
            var i3 = 4 * r4;
            if (e5.sigBytes > i3)
              e5 = t4.finalize(e5);
            e5.clamp();
            var n2 = this._oKey = e5.clone();
            var a2 = this._iKey = e5.clone();
            var o2 = n2.words;
            var u = a2.words;
            for (var c = 0; c < r4; c++) {
              o2[c] ^= 1549556828;
              u[c] ^= 909522486;
            }
            n2.sigBytes = a2.sigBytes = i3;
            this.reset();
          }, reset: function() {
            var t4 = this._hasher;
            t4.reset();
            t4.update(this._iKey);
          }, update: function(t4) {
            this._hasher.update(t4);
            return this;
          }, finalize: function(t4) {
            var e5 = this._hasher;
            var r4 = e5.finalize(t4);
            e5.reset();
            var i3 = e5.finalize(this._oKey.clone().concat(r4));
            return i3;
          } });
        })();
      });
    }, 1354: function(t2, e3, r2) {
      (function(i2, n, s) {
        t2.exports = n(r2(8249), r2(4938), r2(4433), r2(298), r2(8269), r2(3786), r2(8214), r2(2783), r2(2153), r2(7792), r2(34), r2(7460), r2(3327), r2(706), r2(9824), r2(2112), r2(888), r2(5109), r2(8568), r2(4242), r2(9968), r2(7660), r2(1148), r2(3615), r2(2807), r2(1077), r2(6475), r2(6991), r2(2209), r2(452), r2(4253), r2(1857), r2(4454), r2(3974));
      })(this, function(t3) {
        return t3;
      });
    }, 4433: function(t2, e3, r2) {
      (function(i2, n) {
        t2.exports = n(r2(8249));
      })(this, function(t3) {
        (function() {
          if (typeof ArrayBuffer != "function")
            return;
          var e4 = t3;
          var r3 = e4.lib;
          var i2 = r3.WordArray;
          var n = i2.init;
          var s = i2.init = function(t4) {
            if (t4 instanceof ArrayBuffer)
              t4 = new Uint8Array(t4);
            if (t4 instanceof Int8Array || typeof Uint8ClampedArray !== "undefined" && t4 instanceof Uint8ClampedArray || t4 instanceof Int16Array || t4 instanceof Uint16Array || t4 instanceof Int32Array || t4 instanceof Uint32Array || t4 instanceof Float32Array || t4 instanceof Float64Array)
              t4 = new Uint8Array(t4.buffer, t4.byteOffset, t4.byteLength);
            if (t4 instanceof Uint8Array) {
              var e5 = t4.byteLength;
              var r4 = [];
              for (var i3 = 0; i3 < e5; i3++)
                r4[i3 >>> 2] |= t4[i3] << 24 - i3 % 4 * 8;
              n.call(this, r4, e5);
            } else
              n.apply(this, arguments);
          };
          s.prototype = i2;
        })();
        return t3.lib.WordArray;
      });
    }, 8214: function(t2, e3, r2) {
      (function(i2, n) {
        t2.exports = n(r2(8249));
      })(this, function(t3) {
        (function(e4) {
          var r3 = t3;
          var i2 = r3.lib;
          var n = i2.WordArray;
          var s = i2.Hasher;
          var a = r3.algo;
          var o2 = [];
          (function() {
            for (var t4 = 0; t4 < 64; t4++)
              o2[t4] = 4294967296 * e4.abs(e4.sin(t4 + 1)) | 0;
          })();
          var u = a.MD5 = s.extend({ _doReset: function() {
            this._hash = new n.init([1732584193, 4023233417, 2562383102, 271733878]);
          }, _doProcessBlock: function(t4, e5) {
            for (var r4 = 0; r4 < 16; r4++) {
              var i3 = e5 + r4;
              var n2 = t4[i3];
              t4[i3] = 16711935 & (n2 << 8 | n2 >>> 24) | 4278255360 & (n2 << 24 | n2 >>> 8);
            }
            var s2 = this._hash.words;
            var a2 = t4[e5 + 0];
            var u2 = t4[e5 + 1];
            var d = t4[e5 + 2];
            var p = t4[e5 + 3];
            var v = t4[e5 + 4];
            var g = t4[e5 + 5];
            var y = t4[e5 + 6];
            var m = t4[e5 + 7];
            var w = t4[e5 + 8];
            var S = t4[e5 + 9];
            var _ = t4[e5 + 10];
            var b = t4[e5 + 11];
            var E2 = t4[e5 + 12];
            var D = t4[e5 + 13];
            var M = t4[e5 + 14];
            var T = t4[e5 + 15];
            var I = s2[0];
            var A = s2[1];
            var x = s2[2];
            var R = s2[3];
            I = c(I, A, x, R, a2, 7, o2[0]);
            R = c(R, I, A, x, u2, 12, o2[1]);
            x = c(x, R, I, A, d, 17, o2[2]);
            A = c(A, x, R, I, p, 22, o2[3]);
            I = c(I, A, x, R, v, 7, o2[4]);
            R = c(R, I, A, x, g, 12, o2[5]);
            x = c(x, R, I, A, y, 17, o2[6]);
            A = c(A, x, R, I, m, 22, o2[7]);
            I = c(I, A, x, R, w, 7, o2[8]);
            R = c(R, I, A, x, S, 12, o2[9]);
            x = c(x, R, I, A, _, 17, o2[10]);
            A = c(A, x, R, I, b, 22, o2[11]);
            I = c(I, A, x, R, E2, 7, o2[12]);
            R = c(R, I, A, x, D, 12, o2[13]);
            x = c(x, R, I, A, M, 17, o2[14]);
            A = c(A, x, R, I, T, 22, o2[15]);
            I = l(I, A, x, R, u2, 5, o2[16]);
            R = l(R, I, A, x, y, 9, o2[17]);
            x = l(x, R, I, A, b, 14, o2[18]);
            A = l(A, x, R, I, a2, 20, o2[19]);
            I = l(I, A, x, R, g, 5, o2[20]);
            R = l(R, I, A, x, _, 9, o2[21]);
            x = l(x, R, I, A, T, 14, o2[22]);
            A = l(A, x, R, I, v, 20, o2[23]);
            I = l(I, A, x, R, S, 5, o2[24]);
            R = l(R, I, A, x, M, 9, o2[25]);
            x = l(x, R, I, A, p, 14, o2[26]);
            A = l(A, x, R, I, w, 20, o2[27]);
            I = l(I, A, x, R, D, 5, o2[28]);
            R = l(R, I, A, x, d, 9, o2[29]);
            x = l(x, R, I, A, m, 14, o2[30]);
            A = l(A, x, R, I, E2, 20, o2[31]);
            I = f(I, A, x, R, g, 4, o2[32]);
            R = f(R, I, A, x, w, 11, o2[33]);
            x = f(x, R, I, A, b, 16, o2[34]);
            A = f(A, x, R, I, M, 23, o2[35]);
            I = f(I, A, x, R, u2, 4, o2[36]);
            R = f(R, I, A, x, v, 11, o2[37]);
            x = f(x, R, I, A, m, 16, o2[38]);
            A = f(A, x, R, I, _, 23, o2[39]);
            I = f(I, A, x, R, D, 4, o2[40]);
            R = f(R, I, A, x, a2, 11, o2[41]);
            x = f(x, R, I, A, p, 16, o2[42]);
            A = f(A, x, R, I, y, 23, o2[43]);
            I = f(I, A, x, R, S, 4, o2[44]);
            R = f(R, I, A, x, E2, 11, o2[45]);
            x = f(x, R, I, A, T, 16, o2[46]);
            A = f(A, x, R, I, d, 23, o2[47]);
            I = h(I, A, x, R, a2, 6, o2[48]);
            R = h(R, I, A, x, m, 10, o2[49]);
            x = h(x, R, I, A, M, 15, o2[50]);
            A = h(A, x, R, I, g, 21, o2[51]);
            I = h(I, A, x, R, E2, 6, o2[52]);
            R = h(R, I, A, x, p, 10, o2[53]);
            x = h(x, R, I, A, _, 15, o2[54]);
            A = h(A, x, R, I, u2, 21, o2[55]);
            I = h(I, A, x, R, w, 6, o2[56]);
            R = h(R, I, A, x, T, 10, o2[57]);
            x = h(x, R, I, A, y, 15, o2[58]);
            A = h(A, x, R, I, D, 21, o2[59]);
            I = h(I, A, x, R, v, 6, o2[60]);
            R = h(R, I, A, x, b, 10, o2[61]);
            x = h(x, R, I, A, d, 15, o2[62]);
            A = h(A, x, R, I, S, 21, o2[63]);
            s2[0] = s2[0] + I | 0;
            s2[1] = s2[1] + A | 0;
            s2[2] = s2[2] + x | 0;
            s2[3] = s2[3] + R | 0;
          }, _doFinalize: function() {
            var t4 = this._data;
            var r4 = t4.words;
            var i3 = 8 * this._nDataBytes;
            var n2 = 8 * t4.sigBytes;
            r4[n2 >>> 5] |= 128 << 24 - n2 % 32;
            var s2 = e4.floor(i3 / 4294967296);
            var a2 = i3;
            r4[(n2 + 64 >>> 9 << 4) + 15] = 16711935 & (s2 << 8 | s2 >>> 24) | 4278255360 & (s2 << 24 | s2 >>> 8);
            r4[(n2 + 64 >>> 9 << 4) + 14] = 16711935 & (a2 << 8 | a2 >>> 24) | 4278255360 & (a2 << 24 | a2 >>> 8);
            t4.sigBytes = 4 * (r4.length + 1);
            this._process();
            var o3 = this._hash;
            var u2 = o3.words;
            for (var c2 = 0; c2 < 4; c2++) {
              var l2 = u2[c2];
              u2[c2] = 16711935 & (l2 << 8 | l2 >>> 24) | 4278255360 & (l2 << 24 | l2 >>> 8);
            }
            return o3;
          }, clone: function() {
            var t4 = s.clone.call(this);
            t4._hash = this._hash.clone();
            return t4;
          } });
          function c(t4, e5, r4, i3, n2, s2, a2) {
            var o3 = t4 + (e5 & r4 | ~e5 & i3) + n2 + a2;
            return (o3 << s2 | o3 >>> 32 - s2) + e5;
          }
          function l(t4, e5, r4, i3, n2, s2, a2) {
            var o3 = t4 + (e5 & i3 | r4 & ~i3) + n2 + a2;
            return (o3 << s2 | o3 >>> 32 - s2) + e5;
          }
          function f(t4, e5, r4, i3, n2, s2, a2) {
            var o3 = t4 + (e5 ^ r4 ^ i3) + n2 + a2;
            return (o3 << s2 | o3 >>> 32 - s2) + e5;
          }
          function h(t4, e5, r4, i3, n2, s2, a2) {
            var o3 = t4 + (r4 ^ (e5 | ~i3)) + n2 + a2;
            return (o3 << s2 | o3 >>> 32 - s2) + e5;
          }
          r3.MD5 = s._createHelper(u);
          r3.HmacMD5 = s._createHmacHelper(u);
        })(Math);
        return t3.MD5;
      });
    }, 8568: function(t2, e3, r2) {
      (function(i2, n, s) {
        t2.exports = n(r2(8249), r2(5109));
      })(this, function(t3) {
        t3.mode.CFB = function() {
          var e4 = t3.lib.BlockCipherMode.extend();
          e4.Encryptor = e4.extend({ processBlock: function(t4, e5) {
            var i2 = this._cipher;
            var n = i2.blockSize;
            r3.call(this, t4, e5, n, i2);
            this._prevBlock = t4.slice(e5, e5 + n);
          } });
          e4.Decryptor = e4.extend({ processBlock: function(t4, e5) {
            var i2 = this._cipher;
            var n = i2.blockSize;
            var s = t4.slice(e5, e5 + n);
            r3.call(this, t4, e5, n, i2);
            this._prevBlock = s;
          } });
          function r3(t4, e5, r4, i2) {
            var n;
            var s = this._iv;
            if (s) {
              n = s.slice(0);
              this._iv = void 0;
            } else
              n = this._prevBlock;
            i2.encryptBlock(n, 0);
            for (var a = 0; a < r4; a++)
              t4[e5 + a] ^= n[a];
          }
          return e4;
        }();
        return t3.mode.CFB;
      });
    }, 9968: function(t2, e3, r2) {
      (function(i2, n, s) {
        t2.exports = n(r2(8249), r2(5109));
      })(this, function(t3) {
        t3.mode.CTRGladman = function() {
          var e4 = t3.lib.BlockCipherMode.extend();
          function r3(t4) {
            if ((t4 >> 24 & 255) === 255) {
              var e5 = t4 >> 16 & 255;
              var r4 = t4 >> 8 & 255;
              var i3 = 255 & t4;
              if (e5 === 255) {
                e5 = 0;
                if (r4 === 255) {
                  r4 = 0;
                  if (i3 === 255)
                    i3 = 0;
                  else
                    ++i3;
                } else
                  ++r4;
              } else
                ++e5;
              t4 = 0;
              t4 += e5 << 16;
              t4 += r4 << 8;
              t4 += i3;
            } else
              t4 += 1 << 24;
            return t4;
          }
          function i2(t4) {
            if ((t4[0] = r3(t4[0])) === 0)
              t4[1] = r3(t4[1]);
            return t4;
          }
          var n = e4.Encryptor = e4.extend({ processBlock: function(t4, e5) {
            var r4 = this._cipher;
            var n2 = r4.blockSize;
            var s = this._iv;
            var a = this._counter;
            if (s) {
              a = this._counter = s.slice(0);
              this._iv = void 0;
            }
            i2(a);
            var o2 = a.slice(0);
            r4.encryptBlock(o2, 0);
            for (var u = 0; u < n2; u++)
              t4[e5 + u] ^= o2[u];
          } });
          e4.Decryptor = n;
          return e4;
        }();
        return t3.mode.CTRGladman;
      });
    }, 4242: function(t2, e3, r2) {
      (function(i2, n, s) {
        t2.exports = n(r2(8249), r2(5109));
      })(this, function(t3) {
        t3.mode.CTR = function() {
          var e4 = t3.lib.BlockCipherMode.extend();
          var r3 = e4.Encryptor = e4.extend({ processBlock: function(t4, e5) {
            var r4 = this._cipher;
            var i2 = r4.blockSize;
            var n = this._iv;
            var s = this._counter;
            if (n) {
              s = this._counter = n.slice(0);
              this._iv = void 0;
            }
            var a = s.slice(0);
            r4.encryptBlock(a, 0);
            s[i2 - 1] = s[i2 - 1] + 1 | 0;
            for (var o2 = 0; o2 < i2; o2++)
              t4[e5 + o2] ^= a[o2];
          } });
          e4.Decryptor = r3;
          return e4;
        }();
        return t3.mode.CTR;
      });
    }, 1148: function(t2, e3, r2) {
      (function(i2, n, s) {
        t2.exports = n(r2(8249), r2(5109));
      })(this, function(t3) {
        t3.mode.ECB = function() {
          var e4 = t3.lib.BlockCipherMode.extend();
          e4.Encryptor = e4.extend({ processBlock: function(t4, e5) {
            this._cipher.encryptBlock(t4, e5);
          } });
          e4.Decryptor = e4.extend({ processBlock: function(t4, e5) {
            this._cipher.decryptBlock(t4, e5);
          } });
          return e4;
        }();
        return t3.mode.ECB;
      });
    }, 7660: function(t2, e3, r2) {
      (function(i2, n, s) {
        t2.exports = n(r2(8249), r2(5109));
      })(this, function(t3) {
        t3.mode.OFB = function() {
          var e4 = t3.lib.BlockCipherMode.extend();
          var r3 = e4.Encryptor = e4.extend({ processBlock: function(t4, e5) {
            var r4 = this._cipher;
            var i2 = r4.blockSize;
            var n = this._iv;
            var s = this._keystream;
            if (n) {
              s = this._keystream = n.slice(0);
              this._iv = void 0;
            }
            r4.encryptBlock(s, 0);
            for (var a = 0; a < i2; a++)
              t4[e5 + a] ^= s[a];
          } });
          e4.Decryptor = r3;
          return e4;
        }();
        return t3.mode.OFB;
      });
    }, 3615: function(t2, e3, r2) {
      (function(i2, n, s) {
        t2.exports = n(r2(8249), r2(5109));
      })(this, function(t3) {
        t3.pad.AnsiX923 = { pad: function(t4, e4) {
          var r3 = t4.sigBytes;
          var i2 = 4 * e4;
          var n = i2 - r3 % i2;
          var s = r3 + n - 1;
          t4.clamp();
          t4.words[s >>> 2] |= n << 24 - s % 4 * 8;
          t4.sigBytes += n;
        }, unpad: function(t4) {
          var e4 = 255 & t4.words[t4.sigBytes - 1 >>> 2];
          t4.sigBytes -= e4;
        } };
        return t3.pad.Ansix923;
      });
    }, 2807: function(t2, e3, r2) {
      (function(i2, n, s) {
        t2.exports = n(r2(8249), r2(5109));
      })(this, function(t3) {
        t3.pad.Iso10126 = { pad: function(e4, r3) {
          var i2 = 4 * r3;
          var n = i2 - e4.sigBytes % i2;
          e4.concat(t3.lib.WordArray.random(n - 1)).concat(t3.lib.WordArray.create([n << 24], 1));
        }, unpad: function(t4) {
          var e4 = 255 & t4.words[t4.sigBytes - 1 >>> 2];
          t4.sigBytes -= e4;
        } };
        return t3.pad.Iso10126;
      });
    }, 1077: function(t2, e3, r2) {
      (function(i2, n, s) {
        t2.exports = n(r2(8249), r2(5109));
      })(this, function(t3) {
        t3.pad.Iso97971 = { pad: function(e4, r3) {
          e4.concat(t3.lib.WordArray.create([2147483648], 1));
          t3.pad.ZeroPadding.pad(e4, r3);
        }, unpad: function(e4) {
          t3.pad.ZeroPadding.unpad(e4);
          e4.sigBytes--;
        } };
        return t3.pad.Iso97971;
      });
    }, 6991: function(t2, e3, r2) {
      (function(i2, n, s) {
        t2.exports = n(r2(8249), r2(5109));
      })(this, function(t3) {
        t3.pad.NoPadding = { pad: function() {
        }, unpad: function() {
        } };
        return t3.pad.NoPadding;
      });
    }, 6475: function(t2, e3, r2) {
      (function(i2, n, s) {
        t2.exports = n(r2(8249), r2(5109));
      })(this, function(t3) {
        t3.pad.ZeroPadding = { pad: function(t4, e4) {
          var r3 = 4 * e4;
          t4.clamp();
          t4.sigBytes += r3 - (t4.sigBytes % r3 || r3);
        }, unpad: function(t4) {
          var e4 = t4.words;
          var r3 = t4.sigBytes - 1;
          for (var r3 = t4.sigBytes - 1; r3 >= 0; r3--)
            if (e4[r3 >>> 2] >>> 24 - r3 % 4 * 8 & 255) {
              t4.sigBytes = r3 + 1;
              break;
            }
        } };
        return t3.pad.ZeroPadding;
      });
    }, 2112: function(t2, e3, r2) {
      (function(i2, n, s) {
        t2.exports = n(r2(8249), r2(2783), r2(9824));
      })(this, function(t3) {
        (function() {
          var e4 = t3;
          var r3 = e4.lib;
          var i2 = r3.Base;
          var n = r3.WordArray;
          var s = e4.algo;
          var a = s.SHA1;
          var o2 = s.HMAC;
          var u = s.PBKDF2 = i2.extend({ cfg: i2.extend({ keySize: 128 / 32, hasher: a, iterations: 1 }), init: function(t4) {
            this.cfg = this.cfg.extend(t4);
          }, compute: function(t4, e5) {
            var r4 = this.cfg;
            var i3 = o2.create(r4.hasher, t4);
            var s2 = n.create();
            var a2 = n.create([1]);
            var u2 = s2.words;
            var c = a2.words;
            var l = r4.keySize;
            var f = r4.iterations;
            while (u2.length < l) {
              var h = i3.update(e5).finalize(a2);
              i3.reset();
              var d = h.words;
              var p = d.length;
              var v = h;
              for (var g = 1; g < f; g++) {
                v = i3.finalize(v);
                i3.reset();
                var y = v.words;
                for (var m = 0; m < p; m++)
                  d[m] ^= y[m];
              }
              s2.concat(h);
              c[0]++;
            }
            s2.sigBytes = 4 * l;
            return s2;
          } });
          e4.PBKDF2 = function(t4, e5, r4) {
            return u.create(r4).compute(t4, e5);
          };
        })();
        return t3.PBKDF2;
      });
    }, 3974: function(t2, e3, r2) {
      (function(i2, n, s) {
        t2.exports = n(r2(8249), r2(8269), r2(8214), r2(888), r2(5109));
      })(this, function(t3) {
        (function() {
          var e4 = t3;
          var r3 = e4.lib;
          var i2 = r3.StreamCipher;
          var n = e4.algo;
          var s = [];
          var a = [];
          var o2 = [];
          var u = n.RabbitLegacy = i2.extend({ _doReset: function() {
            var t4 = this._key.words;
            var e5 = this.cfg.iv;
            var r4 = this._X = [t4[0], t4[3] << 16 | t4[2] >>> 16, t4[1], t4[0] << 16 | t4[3] >>> 16, t4[2], t4[1] << 16 | t4[0] >>> 16, t4[3], t4[2] << 16 | t4[1] >>> 16];
            var i3 = this._C = [t4[2] << 16 | t4[2] >>> 16, 4294901760 & t4[0] | 65535 & t4[1], t4[3] << 16 | t4[3] >>> 16, 4294901760 & t4[1] | 65535 & t4[2], t4[0] << 16 | t4[0] >>> 16, 4294901760 & t4[2] | 65535 & t4[3], t4[1] << 16 | t4[1] >>> 16, 4294901760 & t4[3] | 65535 & t4[0]];
            this._b = 0;
            for (var n2 = 0; n2 < 4; n2++)
              c.call(this);
            for (var n2 = 0; n2 < 8; n2++)
              i3[n2] ^= r4[n2 + 4 & 7];
            if (e5) {
              var s2 = e5.words;
              var a2 = s2[0];
              var o3 = s2[1];
              var u2 = 16711935 & (a2 << 8 | a2 >>> 24) | 4278255360 & (a2 << 24 | a2 >>> 8);
              var l = 16711935 & (o3 << 8 | o3 >>> 24) | 4278255360 & (o3 << 24 | o3 >>> 8);
              var f = u2 >>> 16 | 4294901760 & l;
              var h = l << 16 | 65535 & u2;
              i3[0] ^= u2;
              i3[1] ^= f;
              i3[2] ^= l;
              i3[3] ^= h;
              i3[4] ^= u2;
              i3[5] ^= f;
              i3[6] ^= l;
              i3[7] ^= h;
              for (var n2 = 0; n2 < 4; n2++)
                c.call(this);
            }
          }, _doProcessBlock: function(t4, e5) {
            var r4 = this._X;
            c.call(this);
            s[0] = r4[0] ^ r4[5] >>> 16 ^ r4[3] << 16;
            s[1] = r4[2] ^ r4[7] >>> 16 ^ r4[5] << 16;
            s[2] = r4[4] ^ r4[1] >>> 16 ^ r4[7] << 16;
            s[3] = r4[6] ^ r4[3] >>> 16 ^ r4[1] << 16;
            for (var i3 = 0; i3 < 4; i3++) {
              s[i3] = 16711935 & (s[i3] << 8 | s[i3] >>> 24) | 4278255360 & (s[i3] << 24 | s[i3] >>> 8);
              t4[e5 + i3] ^= s[i3];
            }
          }, blockSize: 128 / 32, ivSize: 64 / 32 });
          function c() {
            var t4 = this._X;
            var e5 = this._C;
            for (var r4 = 0; r4 < 8; r4++)
              a[r4] = e5[r4];
            e5[0] = e5[0] + 1295307597 + this._b | 0;
            e5[1] = e5[1] + 3545052371 + (e5[0] >>> 0 < a[0] >>> 0 ? 1 : 0) | 0;
            e5[2] = e5[2] + 886263092 + (e5[1] >>> 0 < a[1] >>> 0 ? 1 : 0) | 0;
            e5[3] = e5[3] + 1295307597 + (e5[2] >>> 0 < a[2] >>> 0 ? 1 : 0) | 0;
            e5[4] = e5[4] + 3545052371 + (e5[3] >>> 0 < a[3] >>> 0 ? 1 : 0) | 0;
            e5[5] = e5[5] + 886263092 + (e5[4] >>> 0 < a[4] >>> 0 ? 1 : 0) | 0;
            e5[6] = e5[6] + 1295307597 + (e5[5] >>> 0 < a[5] >>> 0 ? 1 : 0) | 0;
            e5[7] = e5[7] + 3545052371 + (e5[6] >>> 0 < a[6] >>> 0 ? 1 : 0) | 0;
            this._b = e5[7] >>> 0 < a[7] >>> 0 ? 1 : 0;
            for (var r4 = 0; r4 < 8; r4++) {
              var i3 = t4[r4] + e5[r4];
              var n2 = 65535 & i3;
              var s2 = i3 >>> 16;
              var u2 = ((n2 * n2 >>> 17) + n2 * s2 >>> 15) + s2 * s2;
              var c2 = ((4294901760 & i3) * i3 | 0) + ((65535 & i3) * i3 | 0);
              o2[r4] = u2 ^ c2;
            }
            t4[0] = o2[0] + (o2[7] << 16 | o2[7] >>> 16) + (o2[6] << 16 | o2[6] >>> 16) | 0;
            t4[1] = o2[1] + (o2[0] << 8 | o2[0] >>> 24) + o2[7] | 0;
            t4[2] = o2[2] + (o2[1] << 16 | o2[1] >>> 16) + (o2[0] << 16 | o2[0] >>> 16) | 0;
            t4[3] = o2[3] + (o2[2] << 8 | o2[2] >>> 24) + o2[1] | 0;
            t4[4] = o2[4] + (o2[3] << 16 | o2[3] >>> 16) + (o2[2] << 16 | o2[2] >>> 16) | 0;
            t4[5] = o2[5] + (o2[4] << 8 | o2[4] >>> 24) + o2[3] | 0;
            t4[6] = o2[6] + (o2[5] << 16 | o2[5] >>> 16) + (o2[4] << 16 | o2[4] >>> 16) | 0;
            t4[7] = o2[7] + (o2[6] << 8 | o2[6] >>> 24) + o2[5] | 0;
          }
          e4.RabbitLegacy = i2._createHelper(u);
        })();
        return t3.RabbitLegacy;
      });
    }, 4454: function(t2, e3, r2) {
      (function(i2, n, s) {
        t2.exports = n(r2(8249), r2(8269), r2(8214), r2(888), r2(5109));
      })(this, function(t3) {
        (function() {
          var e4 = t3;
          var r3 = e4.lib;
          var i2 = r3.StreamCipher;
          var n = e4.algo;
          var s = [];
          var a = [];
          var o2 = [];
          var u = n.Rabbit = i2.extend({ _doReset: function() {
            var t4 = this._key.words;
            var e5 = this.cfg.iv;
            for (var r4 = 0; r4 < 4; r4++)
              t4[r4] = 16711935 & (t4[r4] << 8 | t4[r4] >>> 24) | 4278255360 & (t4[r4] << 24 | t4[r4] >>> 8);
            var i3 = this._X = [t4[0], t4[3] << 16 | t4[2] >>> 16, t4[1], t4[0] << 16 | t4[3] >>> 16, t4[2], t4[1] << 16 | t4[0] >>> 16, t4[3], t4[2] << 16 | t4[1] >>> 16];
            var n2 = this._C = [t4[2] << 16 | t4[2] >>> 16, 4294901760 & t4[0] | 65535 & t4[1], t4[3] << 16 | t4[3] >>> 16, 4294901760 & t4[1] | 65535 & t4[2], t4[0] << 16 | t4[0] >>> 16, 4294901760 & t4[2] | 65535 & t4[3], t4[1] << 16 | t4[1] >>> 16, 4294901760 & t4[3] | 65535 & t4[0]];
            this._b = 0;
            for (var r4 = 0; r4 < 4; r4++)
              c.call(this);
            for (var r4 = 0; r4 < 8; r4++)
              n2[r4] ^= i3[r4 + 4 & 7];
            if (e5) {
              var s2 = e5.words;
              var a2 = s2[0];
              var o3 = s2[1];
              var u2 = 16711935 & (a2 << 8 | a2 >>> 24) | 4278255360 & (a2 << 24 | a2 >>> 8);
              var l = 16711935 & (o3 << 8 | o3 >>> 24) | 4278255360 & (o3 << 24 | o3 >>> 8);
              var f = u2 >>> 16 | 4294901760 & l;
              var h = l << 16 | 65535 & u2;
              n2[0] ^= u2;
              n2[1] ^= f;
              n2[2] ^= l;
              n2[3] ^= h;
              n2[4] ^= u2;
              n2[5] ^= f;
              n2[6] ^= l;
              n2[7] ^= h;
              for (var r4 = 0; r4 < 4; r4++)
                c.call(this);
            }
          }, _doProcessBlock: function(t4, e5) {
            var r4 = this._X;
            c.call(this);
            s[0] = r4[0] ^ r4[5] >>> 16 ^ r4[3] << 16;
            s[1] = r4[2] ^ r4[7] >>> 16 ^ r4[5] << 16;
            s[2] = r4[4] ^ r4[1] >>> 16 ^ r4[7] << 16;
            s[3] = r4[6] ^ r4[3] >>> 16 ^ r4[1] << 16;
            for (var i3 = 0; i3 < 4; i3++) {
              s[i3] = 16711935 & (s[i3] << 8 | s[i3] >>> 24) | 4278255360 & (s[i3] << 24 | s[i3] >>> 8);
              t4[e5 + i3] ^= s[i3];
            }
          }, blockSize: 128 / 32, ivSize: 64 / 32 });
          function c() {
            var t4 = this._X;
            var e5 = this._C;
            for (var r4 = 0; r4 < 8; r4++)
              a[r4] = e5[r4];
            e5[0] = e5[0] + 1295307597 + this._b | 0;
            e5[1] = e5[1] + 3545052371 + (e5[0] >>> 0 < a[0] >>> 0 ? 1 : 0) | 0;
            e5[2] = e5[2] + 886263092 + (e5[1] >>> 0 < a[1] >>> 0 ? 1 : 0) | 0;
            e5[3] = e5[3] + 1295307597 + (e5[2] >>> 0 < a[2] >>> 0 ? 1 : 0) | 0;
            e5[4] = e5[4] + 3545052371 + (e5[3] >>> 0 < a[3] >>> 0 ? 1 : 0) | 0;
            e5[5] = e5[5] + 886263092 + (e5[4] >>> 0 < a[4] >>> 0 ? 1 : 0) | 0;
            e5[6] = e5[6] + 1295307597 + (e5[5] >>> 0 < a[5] >>> 0 ? 1 : 0) | 0;
            e5[7] = e5[7] + 3545052371 + (e5[6] >>> 0 < a[6] >>> 0 ? 1 : 0) | 0;
            this._b = e5[7] >>> 0 < a[7] >>> 0 ? 1 : 0;
            for (var r4 = 0; r4 < 8; r4++) {
              var i3 = t4[r4] + e5[r4];
              var n2 = 65535 & i3;
              var s2 = i3 >>> 16;
              var u2 = ((n2 * n2 >>> 17) + n2 * s2 >>> 15) + s2 * s2;
              var c2 = ((4294901760 & i3) * i3 | 0) + ((65535 & i3) * i3 | 0);
              o2[r4] = u2 ^ c2;
            }
            t4[0] = o2[0] + (o2[7] << 16 | o2[7] >>> 16) + (o2[6] << 16 | o2[6] >>> 16) | 0;
            t4[1] = o2[1] + (o2[0] << 8 | o2[0] >>> 24) + o2[7] | 0;
            t4[2] = o2[2] + (o2[1] << 16 | o2[1] >>> 16) + (o2[0] << 16 | o2[0] >>> 16) | 0;
            t4[3] = o2[3] + (o2[2] << 8 | o2[2] >>> 24) + o2[1] | 0;
            t4[4] = o2[4] + (o2[3] << 16 | o2[3] >>> 16) + (o2[2] << 16 | o2[2] >>> 16) | 0;
            t4[5] = o2[5] + (o2[4] << 8 | o2[4] >>> 24) + o2[3] | 0;
            t4[6] = o2[6] + (o2[5] << 16 | o2[5] >>> 16) + (o2[4] << 16 | o2[4] >>> 16) | 0;
            t4[7] = o2[7] + (o2[6] << 8 | o2[6] >>> 24) + o2[5] | 0;
          }
          e4.Rabbit = i2._createHelper(u);
        })();
        return t3.Rabbit;
      });
    }, 1857: function(t2, e3, r2) {
      (function(i2, n, s) {
        t2.exports = n(r2(8249), r2(8269), r2(8214), r2(888), r2(5109));
      })(this, function(t3) {
        (function() {
          var e4 = t3;
          var r3 = e4.lib;
          var i2 = r3.StreamCipher;
          var n = e4.algo;
          var s = n.RC4 = i2.extend({ _doReset: function() {
            var t4 = this._key;
            var e5 = t4.words;
            var r4 = t4.sigBytes;
            var i3 = this._S = [];
            for (var n2 = 0; n2 < 256; n2++)
              i3[n2] = n2;
            for (var n2 = 0, s2 = 0; n2 < 256; n2++) {
              var a2 = n2 % r4;
              var o3 = e5[a2 >>> 2] >>> 24 - a2 % 4 * 8 & 255;
              s2 = (s2 + i3[n2] + o3) % 256;
              var u = i3[n2];
              i3[n2] = i3[s2];
              i3[s2] = u;
            }
            this._i = this._j = 0;
          }, _doProcessBlock: function(t4, e5) {
            t4[e5] ^= a.call(this);
          }, keySize: 256 / 32, ivSize: 0 });
          function a() {
            var t4 = this._S;
            var e5 = this._i;
            var r4 = this._j;
            var i3 = 0;
            for (var n2 = 0; n2 < 4; n2++) {
              e5 = (e5 + 1) % 256;
              r4 = (r4 + t4[e5]) % 256;
              var s2 = t4[e5];
              t4[e5] = t4[r4];
              t4[r4] = s2;
              i3 |= t4[(t4[e5] + t4[r4]) % 256] << 24 - 8 * n2;
            }
            this._i = e5;
            this._j = r4;
            return i3;
          }
          e4.RC4 = i2._createHelper(s);
          var o2 = n.RC4Drop = s.extend({ cfg: s.cfg.extend({ drop: 192 }), _doReset: function() {
            s._doReset.call(this);
            for (var t4 = this.cfg.drop; t4 > 0; t4--)
              a.call(this);
          } });
          e4.RC4Drop = i2._createHelper(o2);
        })();
        return t3.RC4;
      });
    }, 706: function(t2, e3, r2) {
      (function(i2, n) {
        t2.exports = n(r2(8249));
      })(this, function(t3) {
        (function(e4) {
          var r3 = t3;
          var i2 = r3.lib;
          var n = i2.WordArray;
          var s = i2.Hasher;
          var a = r3.algo;
          var o2 = n.create([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8, 3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12, 1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2, 4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13]);
          var u = n.create([5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12, 6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2, 15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13, 8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14, 12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11]);
          var c = n.create([11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8, 7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12, 11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5, 11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12, 9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6]);
          var l = n.create([8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6, 9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11, 9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5, 15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8, 8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11]);
          var f = n.create([0, 1518500249, 1859775393, 2400959708, 2840853838]);
          var h = n.create([1352829926, 1548603684, 1836072691, 2053994217, 0]);
          var d = a.RIPEMD160 = s.extend({ _doReset: function() {
            this._hash = n.create([1732584193, 4023233417, 2562383102, 271733878, 3285377520]);
          }, _doProcessBlock: function(t4, e5) {
            for (var r4 = 0; r4 < 16; r4++) {
              var i3 = e5 + r4;
              var n2 = t4[i3];
              t4[i3] = 16711935 & (n2 << 8 | n2 >>> 24) | 4278255360 & (n2 << 24 | n2 >>> 8);
            }
            var s2 = this._hash.words;
            var a2 = f.words;
            var d2 = h.words;
            var S = o2.words;
            var _ = u.words;
            var b = c.words;
            var E2 = l.words;
            var D, M, T, I, A;
            var x, R, B, O, k;
            x = D = s2[0];
            R = M = s2[1];
            B = T = s2[2];
            O = I = s2[3];
            k = A = s2[4];
            var C;
            for (var r4 = 0; r4 < 80; r4 += 1) {
              C = D + t4[e5 + S[r4]] | 0;
              if (r4 < 16)
                C += p(M, T, I) + a2[0];
              else if (r4 < 32)
                C += v(M, T, I) + a2[1];
              else if (r4 < 48)
                C += g(M, T, I) + a2[2];
              else if (r4 < 64)
                C += y(M, T, I) + a2[3];
              else
                C += m(M, T, I) + a2[4];
              C |= 0;
              C = w(C, b[r4]);
              C = C + A | 0;
              D = A;
              A = I;
              I = w(T, 10);
              T = M;
              M = C;
              C = x + t4[e5 + _[r4]] | 0;
              if (r4 < 16)
                C += m(R, B, O) + d2[0];
              else if (r4 < 32)
                C += y(R, B, O) + d2[1];
              else if (r4 < 48)
                C += g(R, B, O) + d2[2];
              else if (r4 < 64)
                C += v(R, B, O) + d2[3];
              else
                C += p(R, B, O) + d2[4];
              C |= 0;
              C = w(C, E2[r4]);
              C = C + k | 0;
              x = k;
              k = O;
              O = w(B, 10);
              B = R;
              R = C;
            }
            C = s2[1] + T + O | 0;
            s2[1] = s2[2] + I + k | 0;
            s2[2] = s2[3] + A + x | 0;
            s2[3] = s2[4] + D + R | 0;
            s2[4] = s2[0] + M + B | 0;
            s2[0] = C;
          }, _doFinalize: function() {
            var t4 = this._data;
            var e5 = t4.words;
            var r4 = 8 * this._nDataBytes;
            var i3 = 8 * t4.sigBytes;
            e5[i3 >>> 5] |= 128 << 24 - i3 % 32;
            e5[(i3 + 64 >>> 9 << 4) + 14] = 16711935 & (r4 << 8 | r4 >>> 24) | 4278255360 & (r4 << 24 | r4 >>> 8);
            t4.sigBytes = 4 * (e5.length + 1);
            this._process();
            var n2 = this._hash;
            var s2 = n2.words;
            for (var a2 = 0; a2 < 5; a2++) {
              var o3 = s2[a2];
              s2[a2] = 16711935 & (o3 << 8 | o3 >>> 24) | 4278255360 & (o3 << 24 | o3 >>> 8);
            }
            return n2;
          }, clone: function() {
            var t4 = s.clone.call(this);
            t4._hash = this._hash.clone();
            return t4;
          } });
          function p(t4, e5, r4) {
            return t4 ^ e5 ^ r4;
          }
          function v(t4, e5, r4) {
            return t4 & e5 | ~t4 & r4;
          }
          function g(t4, e5, r4) {
            return (t4 | ~e5) ^ r4;
          }
          function y(t4, e5, r4) {
            return t4 & r4 | e5 & ~r4;
          }
          function m(t4, e5, r4) {
            return t4 ^ (e5 | ~r4);
          }
          function w(t4, e5) {
            return t4 << e5 | t4 >>> 32 - e5;
          }
          r3.RIPEMD160 = s._createHelper(d);
          r3.HmacRIPEMD160 = s._createHmacHelper(d);
        })();
        return t3.RIPEMD160;
      });
    }, 2783: function(t2, e3, r2) {
      (function(i2, n) {
        t2.exports = n(r2(8249));
      })(this, function(t3) {
        (function() {
          var e4 = t3;
          var r3 = e4.lib;
          var i2 = r3.WordArray;
          var n = r3.Hasher;
          var s = e4.algo;
          var a = [];
          var o2 = s.SHA1 = n.extend({ _doReset: function() {
            this._hash = new i2.init([1732584193, 4023233417, 2562383102, 271733878, 3285377520]);
          }, _doProcessBlock: function(t4, e5) {
            var r4 = this._hash.words;
            var i3 = r4[0];
            var n2 = r4[1];
            var s2 = r4[2];
            var o3 = r4[3];
            var u = r4[4];
            for (var c = 0; c < 80; c++) {
              if (c < 16)
                a[c] = 0 | t4[e5 + c];
              else {
                var l = a[c - 3] ^ a[c - 8] ^ a[c - 14] ^ a[c - 16];
                a[c] = l << 1 | l >>> 31;
              }
              var f = (i3 << 5 | i3 >>> 27) + u + a[c];
              if (c < 20)
                f += (n2 & s2 | ~n2 & o3) + 1518500249;
              else if (c < 40)
                f += (n2 ^ s2 ^ o3) + 1859775393;
              else if (c < 60)
                f += (n2 & s2 | n2 & o3 | s2 & o3) - 1894007588;
              else
                f += (n2 ^ s2 ^ o3) - 899497514;
              u = o3;
              o3 = s2;
              s2 = n2 << 30 | n2 >>> 2;
              n2 = i3;
              i3 = f;
            }
            r4[0] = r4[0] + i3 | 0;
            r4[1] = r4[1] + n2 | 0;
            r4[2] = r4[2] + s2 | 0;
            r4[3] = r4[3] + o3 | 0;
            r4[4] = r4[4] + u | 0;
          }, _doFinalize: function() {
            var t4 = this._data;
            var e5 = t4.words;
            var r4 = 8 * this._nDataBytes;
            var i3 = 8 * t4.sigBytes;
            e5[i3 >>> 5] |= 128 << 24 - i3 % 32;
            e5[(i3 + 64 >>> 9 << 4) + 14] = Math.floor(r4 / 4294967296);
            e5[(i3 + 64 >>> 9 << 4) + 15] = r4;
            t4.sigBytes = 4 * e5.length;
            this._process();
            return this._hash;
          }, clone: function() {
            var t4 = n.clone.call(this);
            t4._hash = this._hash.clone();
            return t4;
          } });
          e4.SHA1 = n._createHelper(o2);
          e4.HmacSHA1 = n._createHmacHelper(o2);
        })();
        return t3.SHA1;
      });
    }, 7792: function(t2, e3, r2) {
      (function(i2, n, s) {
        t2.exports = n(r2(8249), r2(2153));
      })(this, function(t3) {
        (function() {
          var e4 = t3;
          var r3 = e4.lib;
          var i2 = r3.WordArray;
          var n = e4.algo;
          var s = n.SHA256;
          var a = n.SHA224 = s.extend({ _doReset: function() {
            this._hash = new i2.init([3238371032, 914150663, 812702999, 4144912697, 4290775857, 1750603025, 1694076839, 3204075428]);
          }, _doFinalize: function() {
            var t4 = s._doFinalize.call(this);
            t4.sigBytes -= 4;
            return t4;
          } });
          e4.SHA224 = s._createHelper(a);
          e4.HmacSHA224 = s._createHmacHelper(a);
        })();
        return t3.SHA224;
      });
    }, 2153: function(t2, e3, r2) {
      (function(i2, n) {
        t2.exports = n(r2(8249));
      })(this, function(t3) {
        (function(e4) {
          var r3 = t3;
          var i2 = r3.lib;
          var n = i2.WordArray;
          var s = i2.Hasher;
          var a = r3.algo;
          var o2 = [];
          var u = [];
          (function() {
            function t4(t5) {
              var r5 = e4.sqrt(t5);
              for (var i4 = 2; i4 <= r5; i4++)
                if (!(t5 % i4))
                  return false;
              return true;
            }
            function r4(t5) {
              return 4294967296 * (t5 - (0 | t5)) | 0;
            }
            var i3 = 2;
            var n2 = 0;
            while (n2 < 64) {
              if (t4(i3)) {
                if (n2 < 8)
                  o2[n2] = r4(e4.pow(i3, 1 / 2));
                u[n2] = r4(e4.pow(i3, 1 / 3));
                n2++;
              }
              i3++;
            }
          })();
          var c = [];
          var l = a.SHA256 = s.extend({ _doReset: function() {
            this._hash = new n.init(o2.slice(0));
          }, _doProcessBlock: function(t4, e5) {
            var r4 = this._hash.words;
            var i3 = r4[0];
            var n2 = r4[1];
            var s2 = r4[2];
            var a2 = r4[3];
            var o3 = r4[4];
            var l2 = r4[5];
            var f = r4[6];
            var h = r4[7];
            for (var d = 0; d < 64; d++) {
              if (d < 16)
                c[d] = 0 | t4[e5 + d];
              else {
                var p = c[d - 15];
                var v = (p << 25 | p >>> 7) ^ (p << 14 | p >>> 18) ^ p >>> 3;
                var g = c[d - 2];
                var y = (g << 15 | g >>> 17) ^ (g << 13 | g >>> 19) ^ g >>> 10;
                c[d] = v + c[d - 7] + y + c[d - 16];
              }
              var m = o3 & l2 ^ ~o3 & f;
              var w = i3 & n2 ^ i3 & s2 ^ n2 & s2;
              var S = (i3 << 30 | i3 >>> 2) ^ (i3 << 19 | i3 >>> 13) ^ (i3 << 10 | i3 >>> 22);
              var _ = (o3 << 26 | o3 >>> 6) ^ (o3 << 21 | o3 >>> 11) ^ (o3 << 7 | o3 >>> 25);
              var b = h + _ + m + u[d] + c[d];
              var E2 = S + w;
              h = f;
              f = l2;
              l2 = o3;
              o3 = a2 + b | 0;
              a2 = s2;
              s2 = n2;
              n2 = i3;
              i3 = b + E2 | 0;
            }
            r4[0] = r4[0] + i3 | 0;
            r4[1] = r4[1] + n2 | 0;
            r4[2] = r4[2] + s2 | 0;
            r4[3] = r4[3] + a2 | 0;
            r4[4] = r4[4] + o3 | 0;
            r4[5] = r4[5] + l2 | 0;
            r4[6] = r4[6] + f | 0;
            r4[7] = r4[7] + h | 0;
          }, _doFinalize: function() {
            var t4 = this._data;
            var r4 = t4.words;
            var i3 = 8 * this._nDataBytes;
            var n2 = 8 * t4.sigBytes;
            r4[n2 >>> 5] |= 128 << 24 - n2 % 32;
            r4[(n2 + 64 >>> 9 << 4) + 14] = e4.floor(i3 / 4294967296);
            r4[(n2 + 64 >>> 9 << 4) + 15] = i3;
            t4.sigBytes = 4 * r4.length;
            this._process();
            return this._hash;
          }, clone: function() {
            var t4 = s.clone.call(this);
            t4._hash = this._hash.clone();
            return t4;
          } });
          r3.SHA256 = s._createHelper(l);
          r3.HmacSHA256 = s._createHmacHelper(l);
        })(Math);
        return t3.SHA256;
      });
    }, 3327: function(t2, e3, r2) {
      (function(i2, n, s) {
        t2.exports = n(r2(8249), r2(4938));
      })(this, function(t3) {
        (function(e4) {
          var r3 = t3;
          var i2 = r3.lib;
          var n = i2.WordArray;
          var s = i2.Hasher;
          var a = r3.x64;
          var o2 = a.Word;
          var u = r3.algo;
          var c = [];
          var l = [];
          var f = [];
          (function() {
            var t4 = 1, e5 = 0;
            for (var r4 = 0; r4 < 24; r4++) {
              c[t4 + 5 * e5] = (r4 + 1) * (r4 + 2) / 2 % 64;
              var i3 = e5 % 5;
              var n2 = (2 * t4 + 3 * e5) % 5;
              t4 = i3;
              e5 = n2;
            }
            for (var t4 = 0; t4 < 5; t4++)
              for (var e5 = 0; e5 < 5; e5++)
                l[t4 + 5 * e5] = e5 + (2 * t4 + 3 * e5) % 5 * 5;
            var s2 = 1;
            for (var a2 = 0; a2 < 24; a2++) {
              var u2 = 0;
              var h2 = 0;
              for (var d2 = 0; d2 < 7; d2++) {
                if (1 & s2) {
                  var p = (1 << d2) - 1;
                  if (p < 32)
                    h2 ^= 1 << p;
                  else
                    u2 ^= 1 << p - 32;
                }
                if (128 & s2)
                  s2 = s2 << 1 ^ 113;
                else
                  s2 <<= 1;
              }
              f[a2] = o2.create(u2, h2);
            }
          })();
          var h = [];
          (function() {
            for (var t4 = 0; t4 < 25; t4++)
              h[t4] = o2.create();
          })();
          var d = u.SHA3 = s.extend({ cfg: s.cfg.extend({ outputLength: 512 }), _doReset: function() {
            var t4 = this._state = [];
            for (var e5 = 0; e5 < 25; e5++)
              t4[e5] = new o2.init();
            this.blockSize = (1600 - 2 * this.cfg.outputLength) / 32;
          }, _doProcessBlock: function(t4, e5) {
            var r4 = this._state;
            var i3 = this.blockSize / 2;
            for (var n2 = 0; n2 < i3; n2++) {
              var s2 = t4[e5 + 2 * n2];
              var a2 = t4[e5 + 2 * n2 + 1];
              s2 = 16711935 & (s2 << 8 | s2 >>> 24) | 4278255360 & (s2 << 24 | s2 >>> 8);
              a2 = 16711935 & (a2 << 8 | a2 >>> 24) | 4278255360 & (a2 << 24 | a2 >>> 8);
              var o3 = r4[n2];
              o3.high ^= a2;
              o3.low ^= s2;
            }
            for (var u2 = 0; u2 < 24; u2++) {
              for (var d2 = 0; d2 < 5; d2++) {
                var p = 0, v = 0;
                for (var g = 0; g < 5; g++) {
                  var o3 = r4[d2 + 5 * g];
                  p ^= o3.high;
                  v ^= o3.low;
                }
                var y = h[d2];
                y.high = p;
                y.low = v;
              }
              for (var d2 = 0; d2 < 5; d2++) {
                var m = h[(d2 + 4) % 5];
                var w = h[(d2 + 1) % 5];
                var S = w.high;
                var _ = w.low;
                var p = m.high ^ (S << 1 | _ >>> 31);
                var v = m.low ^ (_ << 1 | S >>> 31);
                for (var g = 0; g < 5; g++) {
                  var o3 = r4[d2 + 5 * g];
                  o3.high ^= p;
                  o3.low ^= v;
                }
              }
              for (var b = 1; b < 25; b++) {
                var p;
                var v;
                var o3 = r4[b];
                var E2 = o3.high;
                var D = o3.low;
                var M = c[b];
                if (M < 32) {
                  p = E2 << M | D >>> 32 - M;
                  v = D << M | E2 >>> 32 - M;
                } else {
                  p = D << M - 32 | E2 >>> 64 - M;
                  v = E2 << M - 32 | D >>> 64 - M;
                }
                var T = h[l[b]];
                T.high = p;
                T.low = v;
              }
              var I = h[0];
              var A = r4[0];
              I.high = A.high;
              I.low = A.low;
              for (var d2 = 0; d2 < 5; d2++)
                for (var g = 0; g < 5; g++) {
                  var b = d2 + 5 * g;
                  var o3 = r4[b];
                  var x = h[b];
                  var R = h[(d2 + 1) % 5 + 5 * g];
                  var B = h[(d2 + 2) % 5 + 5 * g];
                  o3.high = x.high ^ ~R.high & B.high;
                  o3.low = x.low ^ ~R.low & B.low;
                }
              var o3 = r4[0];
              var O = f[u2];
              o3.high ^= O.high;
              o3.low ^= O.low;
            }
          }, _doFinalize: function() {
            var t4 = this._data;
            var r4 = t4.words;
            8 * this._nDataBytes;
            var s2 = 8 * t4.sigBytes;
            var a2 = 32 * this.blockSize;
            r4[s2 >>> 5] |= 1 << 24 - s2 % 32;
            r4[(e4.ceil((s2 + 1) / a2) * a2 >>> 5) - 1] |= 128;
            t4.sigBytes = 4 * r4.length;
            this._process();
            var o3 = this._state;
            var u2 = this.cfg.outputLength / 8;
            var c2 = u2 / 8;
            var l2 = [];
            for (var f2 = 0; f2 < c2; f2++) {
              var h2 = o3[f2];
              var d2 = h2.high;
              var p = h2.low;
              d2 = 16711935 & (d2 << 8 | d2 >>> 24) | 4278255360 & (d2 << 24 | d2 >>> 8);
              p = 16711935 & (p << 8 | p >>> 24) | 4278255360 & (p << 24 | p >>> 8);
              l2.push(p);
              l2.push(d2);
            }
            return new n.init(l2, u2);
          }, clone: function() {
            var t4 = s.clone.call(this);
            var e5 = t4._state = this._state.slice(0);
            for (var r4 = 0; r4 < 25; r4++)
              e5[r4] = e5[r4].clone();
            return t4;
          } });
          r3.SHA3 = s._createHelper(d);
          r3.HmacSHA3 = s._createHmacHelper(d);
        })(Math);
        return t3.SHA3;
      });
    }, 7460: function(t2, e3, r2) {
      (function(i2, n, s) {
        t2.exports = n(r2(8249), r2(4938), r2(34));
      })(this, function(t3) {
        (function() {
          var e4 = t3;
          var r3 = e4.x64;
          var i2 = r3.Word;
          var n = r3.WordArray;
          var s = e4.algo;
          var a = s.SHA512;
          var o2 = s.SHA384 = a.extend({ _doReset: function() {
            this._hash = new n.init([new i2.init(3418070365, 3238371032), new i2.init(1654270250, 914150663), new i2.init(2438529370, 812702999), new i2.init(355462360, 4144912697), new i2.init(1731405415, 4290775857), new i2.init(2394180231, 1750603025), new i2.init(3675008525, 1694076839), new i2.init(1203062813, 3204075428)]);
          }, _doFinalize: function() {
            var t4 = a._doFinalize.call(this);
            t4.sigBytes -= 16;
            return t4;
          } });
          e4.SHA384 = a._createHelper(o2);
          e4.HmacSHA384 = a._createHmacHelper(o2);
        })();
        return t3.SHA384;
      });
    }, 34: function(t2, e3, r2) {
      (function(i2, n, s) {
        t2.exports = n(r2(8249), r2(4938));
      })(this, function(t3) {
        (function() {
          var e4 = t3;
          var r3 = e4.lib;
          var i2 = r3.Hasher;
          var n = e4.x64;
          var s = n.Word;
          var a = n.WordArray;
          var o2 = e4.algo;
          function u() {
            return s.create.apply(s, arguments);
          }
          var c = [u(1116352408, 3609767458), u(1899447441, 602891725), u(3049323471, 3964484399), u(3921009573, 2173295548), u(961987163, 4081628472), u(1508970993, 3053834265), u(2453635748, 2937671579), u(2870763221, 3664609560), u(3624381080, 2734883394), u(310598401, 1164996542), u(607225278, 1323610764), u(1426881987, 3590304994), u(1925078388, 4068182383), u(2162078206, 991336113), u(2614888103, 633803317), u(3248222580, 3479774868), u(3835390401, 2666613458), u(4022224774, 944711139), u(264347078, 2341262773), u(604807628, 2007800933), u(770255983, 1495990901), u(1249150122, 1856431235), u(1555081692, 3175218132), u(1996064986, 2198950837), u(2554220882, 3999719339), u(2821834349, 766784016), u(2952996808, 2566594879), u(3210313671, 3203337956), u(3336571891, 1034457026), u(3584528711, 2466948901), u(113926993, 3758326383), u(338241895, 168717936), u(666307205, 1188179964), u(773529912, 1546045734), u(1294757372, 1522805485), u(1396182291, 2643833823), u(1695183700, 2343527390), u(1986661051, 1014477480), u(2177026350, 1206759142), u(2456956037, 344077627), u(2730485921, 1290863460), u(2820302411, 3158454273), u(3259730800, 3505952657), u(3345764771, 106217008), u(3516065817, 3606008344), u(3600352804, 1432725776), u(4094571909, 1467031594), u(275423344, 851169720), u(430227734, 3100823752), u(506948616, 1363258195), u(659060556, 3750685593), u(883997877, 3785050280), u(958139571, 3318307427), u(1322822218, 3812723403), u(1537002063, 2003034995), u(1747873779, 3602036899), u(1955562222, 1575990012), u(2024104815, 1125592928), u(2227730452, 2716904306), u(2361852424, 442776044), u(2428436474, 593698344), u(2756734187, 3733110249), u(3204031479, 2999351573), u(3329325298, 3815920427), u(3391569614, 3928383900), u(3515267271, 566280711), u(3940187606, 3454069534), u(4118630271, 4000239992), u(116418474, 1914138554), u(174292421, 2731055270), u(289380356, 3203993006), u(460393269, 320620315), u(685471733, 587496836), u(852142971, 1086792851), u(1017036298, 365543100), u(1126000580, 2618297676), u(1288033470, 3409855158), u(1501505948, 4234509866), u(1607167915, 987167468), u(1816402316, 1246189591)];
          var l = [];
          (function() {
            for (var t4 = 0; t4 < 80; t4++)
              l[t4] = u();
          })();
          var f = o2.SHA512 = i2.extend({ _doReset: function() {
            this._hash = new a.init([new s.init(1779033703, 4089235720), new s.init(3144134277, 2227873595), new s.init(1013904242, 4271175723), new s.init(2773480762, 1595750129), new s.init(1359893119, 2917565137), new s.init(2600822924, 725511199), new s.init(528734635, 4215389547), new s.init(1541459225, 327033209)]);
          }, _doProcessBlock: function(t4, e5) {
            var r4 = this._hash.words;
            var i3 = r4[0];
            var n2 = r4[1];
            var s2 = r4[2];
            var a2 = r4[3];
            var o3 = r4[4];
            var u2 = r4[5];
            var f2 = r4[6];
            var h = r4[7];
            var d = i3.high;
            var p = i3.low;
            var v = n2.high;
            var g = n2.low;
            var y = s2.high;
            var m = s2.low;
            var w = a2.high;
            var S = a2.low;
            var _ = o3.high;
            var b = o3.low;
            var E2 = u2.high;
            var D = u2.low;
            var M = f2.high;
            var T = f2.low;
            var I = h.high;
            var A = h.low;
            var x = d;
            var R = p;
            var B = v;
            var O = g;
            var k = y;
            var C = m;
            var N = w;
            var P = S;
            var V = _;
            var L = b;
            var H = E2;
            var K = D;
            var U = M;
            var j = T;
            var q = I;
            var F = A;
            for (var z = 0; z < 80; z++) {
              var G;
              var Y;
              var W = l[z];
              if (z < 16) {
                Y = W.high = 0 | t4[e5 + 2 * z];
                G = W.low = 0 | t4[e5 + 2 * z + 1];
              } else {
                var J = l[z - 15];
                var Z = J.high;
                var $ = J.low;
                var X = (Z >>> 1 | $ << 31) ^ (Z >>> 8 | $ << 24) ^ Z >>> 7;
                var Q = ($ >>> 1 | Z << 31) ^ ($ >>> 8 | Z << 24) ^ ($ >>> 7 | Z << 25);
                var tt2 = l[z - 2];
                var et = tt2.high;
                var rt = tt2.low;
                var it = (et >>> 19 | rt << 13) ^ (et << 3 | rt >>> 29) ^ et >>> 6;
                var nt = (rt >>> 19 | et << 13) ^ (rt << 3 | et >>> 29) ^ (rt >>> 6 | et << 26);
                var st = l[z - 7];
                var at = st.high;
                var ot = st.low;
                var ut = l[z - 16];
                var ct = ut.high;
                var lt = ut.low;
                G = Q + ot;
                Y = X + at + (G >>> 0 < Q >>> 0 ? 1 : 0);
                G += nt;
                Y = Y + it + (G >>> 0 < nt >>> 0 ? 1 : 0);
                G += lt;
                Y = Y + ct + (G >>> 0 < lt >>> 0 ? 1 : 0);
                W.high = Y;
                W.low = G;
              }
              var ft = V & H ^ ~V & U;
              var ht = L & K ^ ~L & j;
              var dt = x & B ^ x & k ^ B & k;
              var pt = R & O ^ R & C ^ O & C;
              var vt = (x >>> 28 | R << 4) ^ (x << 30 | R >>> 2) ^ (x << 25 | R >>> 7);
              var gt = (R >>> 28 | x << 4) ^ (R << 30 | x >>> 2) ^ (R << 25 | x >>> 7);
              var yt = (V >>> 14 | L << 18) ^ (V >>> 18 | L << 14) ^ (V << 23 | L >>> 9);
              var mt = (L >>> 14 | V << 18) ^ (L >>> 18 | V << 14) ^ (L << 23 | V >>> 9);
              var wt = c[z];
              var St = wt.high;
              var _t = wt.low;
              var bt = F + mt;
              var Et = q + yt + (bt >>> 0 < F >>> 0 ? 1 : 0);
              var bt = bt + ht;
              var Et = Et + ft + (bt >>> 0 < ht >>> 0 ? 1 : 0);
              var bt = bt + _t;
              var Et = Et + St + (bt >>> 0 < _t >>> 0 ? 1 : 0);
              var bt = bt + G;
              var Et = Et + Y + (bt >>> 0 < G >>> 0 ? 1 : 0);
              var Dt = gt + pt;
              var Mt = vt + dt + (Dt >>> 0 < gt >>> 0 ? 1 : 0);
              q = U;
              F = j;
              U = H;
              j = K;
              H = V;
              K = L;
              L = P + bt | 0;
              V = N + Et + (L >>> 0 < P >>> 0 ? 1 : 0) | 0;
              N = k;
              P = C;
              k = B;
              C = O;
              B = x;
              O = R;
              R = bt + Dt | 0;
              x = Et + Mt + (R >>> 0 < bt >>> 0 ? 1 : 0) | 0;
            }
            p = i3.low = p + R;
            i3.high = d + x + (p >>> 0 < R >>> 0 ? 1 : 0);
            g = n2.low = g + O;
            n2.high = v + B + (g >>> 0 < O >>> 0 ? 1 : 0);
            m = s2.low = m + C;
            s2.high = y + k + (m >>> 0 < C >>> 0 ? 1 : 0);
            S = a2.low = S + P;
            a2.high = w + N + (S >>> 0 < P >>> 0 ? 1 : 0);
            b = o3.low = b + L;
            o3.high = _ + V + (b >>> 0 < L >>> 0 ? 1 : 0);
            D = u2.low = D + K;
            u2.high = E2 + H + (D >>> 0 < K >>> 0 ? 1 : 0);
            T = f2.low = T + j;
            f2.high = M + U + (T >>> 0 < j >>> 0 ? 1 : 0);
            A = h.low = A + F;
            h.high = I + q + (A >>> 0 < F >>> 0 ? 1 : 0);
          }, _doFinalize: function() {
            var t4 = this._data;
            var e5 = t4.words;
            var r4 = 8 * this._nDataBytes;
            var i3 = 8 * t4.sigBytes;
            e5[i3 >>> 5] |= 128 << 24 - i3 % 32;
            e5[(i3 + 128 >>> 10 << 5) + 30] = Math.floor(r4 / 4294967296);
            e5[(i3 + 128 >>> 10 << 5) + 31] = r4;
            t4.sigBytes = 4 * e5.length;
            this._process();
            var n2 = this._hash.toX32();
            return n2;
          }, clone: function() {
            var t4 = i2.clone.call(this);
            t4._hash = this._hash.clone();
            return t4;
          }, blockSize: 1024 / 32 });
          e4.SHA512 = i2._createHelper(f);
          e4.HmacSHA512 = i2._createHmacHelper(f);
        })();
        return t3.SHA512;
      });
    }, 4253: function(t2, e3, r2) {
      (function(i2, n, s) {
        t2.exports = n(r2(8249), r2(8269), r2(8214), r2(888), r2(5109));
      })(this, function(t3) {
        (function() {
          var e4 = t3;
          var r3 = e4.lib;
          var i2 = r3.WordArray;
          var n = r3.BlockCipher;
          var s = e4.algo;
          var a = [57, 49, 41, 33, 25, 17, 9, 1, 58, 50, 42, 34, 26, 18, 10, 2, 59, 51, 43, 35, 27, 19, 11, 3, 60, 52, 44, 36, 63, 55, 47, 39, 31, 23, 15, 7, 62, 54, 46, 38, 30, 22, 14, 6, 61, 53, 45, 37, 29, 21, 13, 5, 28, 20, 12, 4];
          var o2 = [14, 17, 11, 24, 1, 5, 3, 28, 15, 6, 21, 10, 23, 19, 12, 4, 26, 8, 16, 7, 27, 20, 13, 2, 41, 52, 31, 37, 47, 55, 30, 40, 51, 45, 33, 48, 44, 49, 39, 56, 34, 53, 46, 42, 50, 36, 29, 32];
          var u = [1, 2, 4, 6, 8, 10, 12, 14, 15, 17, 19, 21, 23, 25, 27, 28];
          var c = [{ 0: 8421888, 268435456: 32768, 536870912: 8421378, 805306368: 2, 1073741824: 512, 1342177280: 8421890, 1610612736: 8389122, 1879048192: 8388608, 2147483648: 514, 2415919104: 8389120, 2684354560: 33280, 2952790016: 8421376, 3221225472: 32770, 3489660928: 8388610, 3758096384: 0, 4026531840: 33282, 134217728: 0, 402653184: 8421890, 671088640: 33282, 939524096: 32768, 1207959552: 8421888, 1476395008: 512, 1744830464: 8421378, 2013265920: 2, 2281701376: 8389120, 2550136832: 33280, 2818572288: 8421376, 3087007744: 8389122, 3355443200: 8388610, 3623878656: 32770, 3892314112: 514, 4160749568: 8388608, 1: 32768, 268435457: 2, 536870913: 8421888, 805306369: 8388608, 1073741825: 8421378, 1342177281: 33280, 1610612737: 512, 1879048193: 8389122, 2147483649: 8421890, 2415919105: 8421376, 2684354561: 8388610, 2952790017: 33282, 3221225473: 514, 3489660929: 8389120, 3758096385: 32770, 4026531841: 0, 134217729: 8421890, 402653185: 8421376, 671088641: 8388608, 939524097: 512, 1207959553: 32768, 1476395009: 8388610, 1744830465: 2, 2013265921: 33282, 2281701377: 32770, 2550136833: 8389122, 2818572289: 514, 3087007745: 8421888, 3355443201: 8389120, 3623878657: 0, 3892314113: 33280, 4160749569: 8421378 }, { 0: 1074282512, 16777216: 16384, 33554432: 524288, 50331648: 1074266128, 67108864: 1073741840, 83886080: 1074282496, 100663296: 1073758208, 117440512: 16, 134217728: 540672, 150994944: 1073758224, 167772160: 1073741824, 184549376: 540688, 201326592: 524304, 218103808: 0, 234881024: 16400, 251658240: 1074266112, 8388608: 1073758208, 25165824: 540688, 41943040: 16, 58720256: 1073758224, 75497472: 1074282512, 92274688: 1073741824, 109051904: 524288, 125829120: 1074266128, 142606336: 524304, 159383552: 0, 176160768: 16384, 192937984: 1074266112, 209715200: 1073741840, 226492416: 540672, 243269632: 1074282496, 260046848: 16400, 268435456: 0, 285212672: 1074266128, 301989888: 1073758224, 318767104: 1074282496, 335544320: 1074266112, 352321536: 16, 369098752: 540688, 385875968: 16384, 402653184: 16400, 419430400: 524288, 436207616: 524304, 452984832: 1073741840, 469762048: 540672, 486539264: 1073758208, 503316480: 1073741824, 520093696: 1074282512, 276824064: 540688, 293601280: 524288, 310378496: 1074266112, 327155712: 16384, 343932928: 1073758208, 360710144: 1074282512, 377487360: 16, 394264576: 1073741824, 411041792: 1074282496, 427819008: 1073741840, 444596224: 1073758224, 461373440: 524304, 478150656: 0, 494927872: 16400, 511705088: 1074266128, 528482304: 540672 }, { 0: 260, 1048576: 0, 2097152: 67109120, 3145728: 65796, 4194304: 65540, 5242880: 67108868, 6291456: 67174660, 7340032: 67174400, 8388608: 67108864, 9437184: 67174656, 10485760: 65792, 11534336: 67174404, 12582912: 67109124, 13631488: 65536, 14680064: 4, 15728640: 256, 524288: 67174656, 1572864: 67174404, 2621440: 0, 3670016: 67109120, 4718592: 67108868, 5767168: 65536, 6815744: 65540, 7864320: 260, 8912896: 4, 9961472: 256, 11010048: 67174400, 12058624: 65796, 13107200: 65792, 14155776: 67109124, 15204352: 67174660, 16252928: 67108864, 16777216: 67174656, 17825792: 65540, 18874368: 65536, 19922944: 67109120, 20971520: 256, 22020096: 67174660, 23068672: 67108868, 24117248: 0, 25165824: 67109124, 26214400: 67108864, 27262976: 4, 28311552: 65792, 29360128: 67174400, 30408704: 260, 31457280: 65796, 32505856: 67174404, 17301504: 67108864, 18350080: 260, 19398656: 67174656, 20447232: 0, 21495808: 65540, 22544384: 67109120, 23592960: 256, 24641536: 67174404, 25690112: 65536, 26738688: 67174660, 27787264: 65796, 28835840: 67108868, 29884416: 67109124, 30932992: 67174400, 31981568: 4, 33030144: 65792 }, { 0: 2151682048, 65536: 2147487808, 131072: 4198464, 196608: 2151677952, 262144: 0, 327680: 4198400, 393216: 2147483712, 458752: 4194368, 524288: 2147483648, 589824: 4194304, 655360: 64, 720896: 2147487744, 786432: 2151678016, 851968: 4160, 917504: 4096, 983040: 2151682112, 32768: 2147487808, 98304: 64, 163840: 2151678016, 229376: 2147487744, 294912: 4198400, 360448: 2151682112, 425984: 0, 491520: 2151677952, 557056: 4096, 622592: 2151682048, 688128: 4194304, 753664: 4160, 819200: 2147483648, 884736: 4194368, 950272: 4198464, 1015808: 2147483712, 1048576: 4194368, 1114112: 4198400, 1179648: 2147483712, 1245184: 0, 1310720: 4160, 1376256: 2151678016, 1441792: 2151682048, 1507328: 2147487808, 1572864: 2151682112, 1638400: 2147483648, 1703936: 2151677952, 1769472: 4198464, 1835008: 2147487744, 1900544: 4194304, 1966080: 64, 2031616: 4096, 1081344: 2151677952, 1146880: 2151682112, 1212416: 0, 1277952: 4198400, 1343488: 4194368, 1409024: 2147483648, 1474560: 2147487808, 1540096: 64, 1605632: 2147483712, 1671168: 4096, 1736704: 2147487744, 1802240: 2151678016, 1867776: 4160, 1933312: 2151682048, 1998848: 4194304, 2064384: 4198464 }, { 0: 128, 4096: 17039360, 8192: 262144, 12288: 536870912, 16384: 537133184, 20480: 16777344, 24576: 553648256, 28672: 262272, 32768: 16777216, 36864: 537133056, 40960: 536871040, 45056: 553910400, 49152: 553910272, 53248: 0, 57344: 17039488, 61440: 553648128, 2048: 17039488, 6144: 553648256, 10240: 128, 14336: 17039360, 18432: 262144, 22528: 537133184, 26624: 553910272, 30720: 536870912, 34816: 537133056, 38912: 0, 43008: 553910400, 47104: 16777344, 51200: 536871040, 55296: 553648128, 59392: 16777216, 63488: 262272, 65536: 262144, 69632: 128, 73728: 536870912, 77824: 553648256, 81920: 16777344, 86016: 553910272, 90112: 537133184, 94208: 16777216, 98304: 553910400, 102400: 553648128, 106496: 17039360, 110592: 537133056, 114688: 262272, 118784: 536871040, 122880: 0, 126976: 17039488, 67584: 553648256, 71680: 16777216, 75776: 17039360, 79872: 537133184, 83968: 536870912, 88064: 17039488, 92160: 128, 96256: 553910272, 100352: 262272, 104448: 553910400, 108544: 0, 112640: 553648128, 116736: 16777344, 120832: 262144, 124928: 537133056, 129024: 536871040 }, { 0: 268435464, 256: 8192, 512: 270532608, 768: 270540808, 1024: 268443648, 1280: 2097152, 1536: 2097160, 1792: 268435456, 2048: 0, 2304: 268443656, 2560: 2105344, 2816: 8, 3072: 270532616, 3328: 2105352, 3584: 8200, 3840: 270540800, 128: 270532608, 384: 270540808, 640: 8, 896: 2097152, 1152: 2105352, 1408: 268435464, 1664: 268443648, 1920: 8200, 2176: 2097160, 2432: 8192, 2688: 268443656, 2944: 270532616, 3200: 0, 3456: 270540800, 3712: 2105344, 3968: 268435456, 4096: 268443648, 4352: 270532616, 4608: 270540808, 4864: 8200, 5120: 2097152, 5376: 268435456, 5632: 268435464, 5888: 2105344, 6144: 2105352, 6400: 0, 6656: 8, 6912: 270532608, 7168: 8192, 7424: 268443656, 7680: 270540800, 7936: 2097160, 4224: 8, 4480: 2105344, 4736: 2097152, 4992: 268435464, 5248: 268443648, 5504: 8200, 5760: 270540808, 6016: 270532608, 6272: 270540800, 6528: 270532616, 6784: 8192, 7040: 2105352, 7296: 2097160, 7552: 0, 7808: 268435456, 8064: 268443656 }, { 0: 1048576, 16: 33555457, 32: 1024, 48: 1049601, 64: 34604033, 80: 0, 96: 1, 112: 34603009, 128: 33555456, 144: 1048577, 160: 33554433, 176: 34604032, 192: 34603008, 208: 1025, 224: 1049600, 240: 33554432, 8: 34603009, 24: 0, 40: 33555457, 56: 34604032, 72: 1048576, 88: 33554433, 104: 33554432, 120: 1025, 136: 1049601, 152: 33555456, 168: 34603008, 184: 1048577, 200: 1024, 216: 34604033, 232: 1, 248: 1049600, 256: 33554432, 272: 1048576, 288: 33555457, 304: 34603009, 320: 1048577, 336: 33555456, 352: 34604032, 368: 1049601, 384: 1025, 400: 34604033, 416: 1049600, 432: 1, 448: 0, 464: 34603008, 480: 33554433, 496: 1024, 264: 1049600, 280: 33555457, 296: 34603009, 312: 1, 328: 33554432, 344: 1048576, 360: 1025, 376: 34604032, 392: 33554433, 408: 34603008, 424: 0, 440: 34604033, 456: 1049601, 472: 1024, 488: 33555456, 504: 1048577 }, { 0: 134219808, 1: 131072, 2: 134217728, 3: 32, 4: 131104, 5: 134350880, 6: 134350848, 7: 2048, 8: 134348800, 9: 134219776, 10: 133120, 11: 134348832, 12: 2080, 13: 0, 14: 134217760, 15: 133152, 2147483648: 2048, 2147483649: 134350880, 2147483650: 134219808, 2147483651: 134217728, 2147483652: 134348800, 2147483653: 133120, 2147483654: 133152, 2147483655: 32, 2147483656: 134217760, 2147483657: 2080, 2147483658: 131104, 2147483659: 134350848, 2147483660: 0, 2147483661: 134348832, 2147483662: 134219776, 2147483663: 131072, 16: 133152, 17: 134350848, 18: 32, 19: 2048, 20: 134219776, 21: 134217760, 22: 134348832, 23: 131072, 24: 0, 25: 131104, 26: 134348800, 27: 134219808, 28: 134350880, 29: 133120, 30: 2080, 31: 134217728, 2147483664: 131072, 2147483665: 2048, 2147483666: 134348832, 2147483667: 133152, 2147483668: 32, 2147483669: 134348800, 2147483670: 134217728, 2147483671: 134219808, 2147483672: 134350880, 2147483673: 134217760, 2147483674: 134219776, 2147483675: 0, 2147483676: 133120, 2147483677: 2080, 2147483678: 131104, 2147483679: 134350848 }];
          var l = [4160749569, 528482304, 33030144, 2064384, 129024, 8064, 504, 2147483679];
          var f = s.DES = n.extend({ _doReset: function() {
            var t4 = this._key;
            var e5 = t4.words;
            var r4 = [];
            for (var i3 = 0; i3 < 56; i3++) {
              var n2 = a[i3] - 1;
              r4[i3] = e5[n2 >>> 5] >>> 31 - n2 % 32 & 1;
            }
            var s2 = this._subKeys = [];
            for (var c2 = 0; c2 < 16; c2++) {
              var l2 = s2[c2] = [];
              var f2 = u[c2];
              for (var i3 = 0; i3 < 24; i3++) {
                l2[i3 / 6 | 0] |= r4[(o2[i3] - 1 + f2) % 28] << 31 - i3 % 6;
                l2[4 + (i3 / 6 | 0)] |= r4[28 + (o2[i3 + 24] - 1 + f2) % 28] << 31 - i3 % 6;
              }
              l2[0] = l2[0] << 1 | l2[0] >>> 31;
              for (var i3 = 1; i3 < 7; i3++)
                l2[i3] = l2[i3] >>> 4 * (i3 - 1) + 3;
              l2[7] = l2[7] << 5 | l2[7] >>> 27;
            }
            var h2 = this._invSubKeys = [];
            for (var i3 = 0; i3 < 16; i3++)
              h2[i3] = s2[15 - i3];
          }, encryptBlock: function(t4, e5) {
            this._doCryptBlock(t4, e5, this._subKeys);
          }, decryptBlock: function(t4, e5) {
            this._doCryptBlock(t4, e5, this._invSubKeys);
          }, _doCryptBlock: function(t4, e5, r4) {
            this._lBlock = t4[e5];
            this._rBlock = t4[e5 + 1];
            h.call(this, 4, 252645135);
            h.call(this, 16, 65535);
            d.call(this, 2, 858993459);
            d.call(this, 8, 16711935);
            h.call(this, 1, 1431655765);
            for (var i3 = 0; i3 < 16; i3++) {
              var n2 = r4[i3];
              var s2 = this._lBlock;
              var a2 = this._rBlock;
              var o3 = 0;
              for (var u2 = 0; u2 < 8; u2++)
                o3 |= c[u2][((a2 ^ n2[u2]) & l[u2]) >>> 0];
              this._lBlock = a2;
              this._rBlock = s2 ^ o3;
            }
            var f2 = this._lBlock;
            this._lBlock = this._rBlock;
            this._rBlock = f2;
            h.call(this, 1, 1431655765);
            d.call(this, 8, 16711935);
            d.call(this, 2, 858993459);
            h.call(this, 16, 65535);
            h.call(this, 4, 252645135);
            t4[e5] = this._lBlock;
            t4[e5 + 1] = this._rBlock;
          }, keySize: 64 / 32, ivSize: 64 / 32, blockSize: 64 / 32 });
          function h(t4, e5) {
            var r4 = (this._lBlock >>> t4 ^ this._rBlock) & e5;
            this._rBlock ^= r4;
            this._lBlock ^= r4 << t4;
          }
          function d(t4, e5) {
            var r4 = (this._rBlock >>> t4 ^ this._lBlock) & e5;
            this._lBlock ^= r4;
            this._rBlock ^= r4 << t4;
          }
          e4.DES = n._createHelper(f);
          var p = s.TripleDES = n.extend({ _doReset: function() {
            var t4 = this._key;
            var e5 = t4.words;
            if (e5.length !== 2 && e5.length !== 4 && e5.length < 6)
              throw new Error("Invalid key length - 3DES requires the key length to be 64, 128, 192 or >192.");
            var r4 = e5.slice(0, 2);
            var n2 = e5.length < 4 ? e5.slice(0, 2) : e5.slice(2, 4);
            var s2 = e5.length < 6 ? e5.slice(0, 2) : e5.slice(4, 6);
            this._des1 = f.createEncryptor(i2.create(r4));
            this._des2 = f.createEncryptor(i2.create(n2));
            this._des3 = f.createEncryptor(i2.create(s2));
          }, encryptBlock: function(t4, e5) {
            this._des1.encryptBlock(t4, e5);
            this._des2.decryptBlock(t4, e5);
            this._des3.encryptBlock(t4, e5);
          }, decryptBlock: function(t4, e5) {
            this._des3.decryptBlock(t4, e5);
            this._des2.encryptBlock(t4, e5);
            this._des1.decryptBlock(t4, e5);
          }, keySize: 192 / 32, ivSize: 64 / 32, blockSize: 64 / 32 });
          e4.TripleDES = n._createHelper(p);
        })();
        return t3.TripleDES;
      });
    }, 4938: function(t2, e3, r2) {
      (function(i2, n) {
        t2.exports = n(r2(8249));
      })(this, function(t3) {
        (function(e4) {
          var r3 = t3;
          var i2 = r3.lib;
          var n = i2.Base;
          var s = i2.WordArray;
          var a = r3.x64 = {};
          a.Word = n.extend({ init: function(t4, e5) {
            this.high = t4;
            this.low = e5;
          } });
          a.WordArray = n.extend({ init: function(t4, r4) {
            t4 = this.words = t4 || [];
            if (r4 != e4)
              this.sigBytes = r4;
            else
              this.sigBytes = 8 * t4.length;
          }, toX32: function() {
            var t4 = this.words;
            var e5 = t4.length;
            var r4 = [];
            for (var i3 = 0; i3 < e5; i3++) {
              var n2 = t4[i3];
              r4.push(n2.high);
              r4.push(n2.low);
            }
            return s.create(r4, this.sigBytes);
          }, clone: function() {
            var t4 = n.clone.call(this);
            var e5 = t4.words = this.words.slice(0);
            var r4 = e5.length;
            for (var i3 = 0; i3 < r4; i3++)
              e5[i3] = e5[i3].clone();
            return t4;
          } });
        })();
        return t3;
      });
    }, 3118: (t2, e3) => {
      Object.defineProperty(e3, "__esModule", { value: true });
      e3.ErrorCode = void 0;
      (function(t3) {
        t3[t3["SUCCESS"] = 0] = "SUCCESS";
        t3[t3["CLIENT_ID_NOT_FOUND"] = 1] = "CLIENT_ID_NOT_FOUND";
        t3[t3["OPERATION_TOO_OFTEN"] = 2] = "OPERATION_TOO_OFTEN";
        t3[t3["REPEAT_MESSAGE"] = 3] = "REPEAT_MESSAGE";
        t3[t3["TIME_OUT"] = 4] = "TIME_OUT";
      })(e3.ErrorCode || (e3.ErrorCode = {}));
    }, 5987: function(t2, e3, r2) {
      var i2 = this && this.__importDefault || function(t3) {
        return t3 && t3.__esModule ? t3 : { default: t3 };
      };
      const n = i2(r2(127));
      const s = i2(r2(1901));
      const a = i2(r2(1754));
      const o2 = i2(r2(1237));
      var u;
      (function(t3) {
        function e4(t4) {
          o2.default.debugMode = t4;
          o2.default.info(`setDebugMode: ${t4}`);
        }
        t3.setDebugMode = e4;
        function r3(t4) {
          try {
            s.default.init(t4);
          } catch (t5) {
            o2.default.error(`init error`, t5);
          }
        }
        t3.init = r3;
        function i3(t4) {
          try {
            if (!t4.url)
              throw new Error("invalid url");
            if (!t4.key || !t4.keyId)
              throw new Error("invalid key or keyId");
            a.default.socketUrl = t4.url;
            a.default.publicKeyId = t4.keyId;
            a.default.publicKey = t4.key;
          } catch (t5) {
            o2.default.error(`setSocketServer error`, t5);
          }
        }
        t3.setSocketServer = i3;
        function u2(t4) {
          try {
            s.default.enableSocket(t4);
          } catch (t5) {
            o2.default.error(`enableSocket error`, t5);
          }
        }
        t3.enableSocket = u2;
        function c() {
          return n.default.SDK_VERSION;
        }
        t3.getVersion = c;
      })(u || (u = {}));
      t2.exports = u;
    }, 2852: function(t2, e3, r2) {
      var i2 = this && this.__importDefault || function(t3) {
        return t3 && t3.__esModule ? t3 : { default: t3 };
      };
      Object.defineProperty(e3, "__esModule", { value: true });
      const n = i2(r2(4806));
      const s = i2(r2(3396));
      const a = i2(r2(6565));
      const o2 = i2(r2(5912));
      const u = i2(r2(3174));
      const c = i2(r2(4698));
      const l = i2(r2(87));
      const f = i2(r2(523));
      const h = i2(r2(7252));
      const d = i2(r2(4668));
      const p = i2(r2(3072));
      const v = i2(r2(1996));
      const g = i2(r2(9342));
      const y = i2(r2(155));
      const m = i2(r2(3751));
      var w;
      (function(t3) {
        let e4;
        let r3;
        let i3;
        function w2() {
          if (typeof index != "undefined") {
            e4 = new d.default();
            r3 = new p.default();
            i3 = new v.default();
          } else if (typeof tt != "undefined") {
            e4 = new l.default();
            r3 = new f.default();
            i3 = new h.default();
          } else if (typeof my != "undefined") {
            e4 = new n.default();
            r3 = new s.default();
            i3 = new a.default();
          } else if (typeof wx != "undefined") {
            e4 = new g.default();
            r3 = new y.default();
            i3 = new m.default();
          } else if (typeof window != "undefined") {
            e4 = new o2.default();
            r3 = new u.default();
            i3 = new c.default();
          }
        }
        function S() {
          if (!e4)
            w2();
          return e4;
        }
        t3.getDevice = S;
        function _() {
          if (!r3)
            w2();
          return r3;
        }
        t3.getStorage = _;
        function b() {
          if (!i3)
            w2();
          return i3;
        }
        t3.getWebSocket = b;
      })(w || (w = {}));
      e3["default"] = w;
    }, 7406: function(t2, e3, r2) {
      var i2 = this && this.__importDefault || function(t3) {
        return t3 && t3.__esModule ? t3 : { default: t3 };
      };
      Object.defineProperty(e3, "__esModule", { value: true });
      const n = i2(r2(2852));
      var s;
      (function(t3) {
        function e4() {
          return n.default.getDevice().os();
        }
        t3.os = e4;
        function r3() {
          return n.default.getDevice().osVersion();
        }
        t3.osVersion = r3;
        function i3() {
          return n.default.getDevice().model();
        }
        t3.model = i3;
        function s2() {
          return n.default.getDevice().brand();
        }
        t3.brand = s2;
        function a() {
          return n.default.getDevice().platform();
        }
        t3.platform = a;
        function o2() {
          return n.default.getDevice().platformVersion();
        }
        t3.platformVersion = o2;
        function u() {
          return n.default.getDevice().platformId();
        }
        t3.platformId = u;
        function c() {
          return n.default.getDevice().language();
        }
        t3.language = c;
        function l() {
          let t4 = n.default.getDevice().userAgent;
          if (t4)
            return t4();
          return "";
        }
        t3.userAgent = l;
        function f(t4) {
          n.default.getDevice().getNetworkType(t4);
        }
        t3.getNetworkType = f;
        function h(t4) {
          n.default.getDevice().onNetworkStatusChange(t4);
        }
        t3.onNetworkStatusChange = h;
      })(s || (s = {}));
      e3["default"] = s;
    }, 7071: function(t2, e3, r2) {
      var i2 = this && this.__importDefault || function(t3) {
        return t3 && t3.__esModule ? t3 : { default: t3 };
      };
      Object.defineProperty(e3, "__esModule", { value: true });
      const n = i2(r2(1754));
      const s = i2(r2(358));
      const a = i2(r2(1236));
      const o2 = r2(53);
      const u = i2(r2(1571));
      const c = i2(r2(1237));
      const l = i2(r2(2852));
      const f = i2(r2(9934));
      var h;
      (function(t3) {
        let e4;
        let r3 = false;
        let i3 = false;
        t3.allowReconnect = true;
        function h2() {
          return r3 && i3;
        }
        t3.isAvailable = h2;
        function d(e5) {
          if (!t3.allowReconnect)
            return;
          setTimeout(function() {
            p();
          }, e5);
        }
        t3.reconnect = d;
        function p() {
          t3.allowReconnect = true;
          if (!n.default.networkConnected) {
            c.default.info(`connect failed, network is not available`);
            return;
          }
          if (i3 || r3)
            return;
          let s2 = n.default.socketUrl;
          try {
            let t4 = f.default.getSync(f.default.KEY_REDIRECT_SERVER, "");
            if (t4) {
              let e5 = o2.RedirectServerData.parse(t4);
              let r4 = e5.addressList[0].split(",");
              let i4 = r4[0];
              let n2 = Number(r4[1]);
              let a2 = new Date().getTime();
              if (a2 - e5.time < 1e3 * n2)
                s2 = i4;
            }
          } catch (t4) {
          }
          e4 = l.default.getWebSocket().connect({ url: s2, success: function() {
            i3 = true;
            v();
          }, fail: function() {
            i3 = false;
            m();
          } });
          e4.onOpen(w);
          e4.onClose(b);
          e4.onError(_);
          e4.onMessage(S);
        }
        t3.connect = p;
        function v() {
          if (i3 && r3) {
            s.default.create().send();
            u.default.getInstance().start();
          }
        }
        function g(t4) {
          e4 == null ? void 0 : e4.close({ reason: t4, success: function(t5) {
          }, fail: function(t5) {
            m();
          } });
        }
        t3.close = g;
        function y(t4) {
          if (r3 && r3)
            e4 == null ? void 0 : e4.send({ data: t4, success: function(t5) {
            }, fail: function(t5) {
            } });
          else
            throw new Error(`socket not connect`);
        }
        t3.send = y;
        function m(t4) {
          var _a, _b;
          i3 = false;
          r3 = false;
          u.default.getInstance().cancel();
          if (n.default.online) {
            n.default.online = false;
            (_a = n.default.onlineState) == null ? void 0 : _a.call(n.default.onlineState, { online: n.default.online });
          }
          if (n.default.online) {
            n.default.online = false;
            (_b = n.default.onlineState) == null ? void 0 : _b.call(n.default.onlineState, { online: n.default.online });
          }
          d(1e3);
        }
        let w = function(t4) {
          r3 = true;
          v();
        };
        let S = function(t4) {
          try {
            t4.data;
            u.default.getInstance().refresh();
            a.default.receiveMessage(t4.data);
          } catch (t5) {
          }
        };
        let _ = function(t4) {
          g(`socket error`);
        };
        let b = function(t4) {
          m();
        };
      })(h || (h = {}));
      e3["default"] = h;
    }, 9934: function(t2, e3, r2) {
      var i2 = this && this.__importDefault || function(t3) {
        return t3 && t3.__esModule ? t3 : { default: t3 };
      };
      Object.defineProperty(e3, "__esModule", { value: true });
      const n = i2(r2(2852));
      var s;
      (function(t3) {
        t3.KEY_APPID = "getui_appid";
        t3.KEY_CID = "getui_cid";
        t3.KEY_SESSION = "getui_session";
        t3.KEY_REGID = "getui_regid";
        t3.KEY_SOCKET_URL = "getui_socket_url";
        t3.KEY_DEVICE_ID = "getui_deviceid";
        t3.KEY_ADD_PHONE_INFO_TIME = "getui_api_time";
        t3.KEY_BIND_ALIAS_TIME = "getui_ba_time";
        t3.KEY_SET_TAG_TIME = "getui_st_time";
        t3.KEY_REDIRECT_SERVER = "getui_redirect_server";
        function e4(t4) {
          n.default.getStorage().set(t4);
        }
        t3.set = e4;
        function r3(t4, e5) {
          n.default.getStorage().setSync(t4, e5);
        }
        t3.setSync = r3;
        function i3(t4) {
          n.default.getStorage().get(t4);
        }
        t3.get = i3;
        function s2(t4, e5) {
          let r4 = n.default.getStorage().getSync(t4);
          return r4 ? r4 : e5;
        }
        t3.getSync = s2;
      })(s || (s = {}));
      e3["default"] = s;
    }, 4806: (t2) => {
      class e3 {
        constructor() {
          this.systemInfo = my.getSystemInfoSync();
        }
        os() {
          var _a;
          return (_a = this.systemInfo) == null ? void 0 : _a.platform;
        }
        osVersion() {
          var _a;
          return (_a = this.systemInfo) == null ? void 0 : _a.system;
        }
        model() {
          var _a;
          return (_a = this.systemInfo) == null ? void 0 : _a.model;
        }
        brand() {
          var _a;
          return (_a = this.systemInfo) == null ? void 0 : _a.brand;
        }
        platform() {
          return "MP-ALIPAY";
        }
        platformVersion() {
          return this.systemInfo.app + " " + this.systemInfo.version;
        }
        platformId() {
          return my.getAppIdSync();
        }
        language() {
          var _a;
          return (_a = this.systemInfo) == null ? void 0 : _a.language;
        }
        getNetworkType(t3) {
          my.getNetworkType({ success: (e4) => {
            var _a;
            (_a = t3.success) == null ? void 0 : _a.call(t3.success, { networkType: e4.networkType });
          }, fail: () => {
            var _a;
            (_a = t3.fail) == null ? void 0 : _a.call(t3.fail, "");
          } });
        }
        onNetworkStatusChange(t3) {
          my.onNetworkStatusChange(t3);
        }
      }
      t2.exports = e3;
    }, 3396: (t2) => {
      class e3 {
        set(t3) {
          my.setStorage({ key: t3.key, data: t3.data, success: t3.success, fail: t3.fail });
        }
        setSync(t3, e4) {
          my.setStorageSync({ key: t3, data: e4 });
        }
        get(t3) {
          my.getStorage({ key: t3.key, success: t3.success, fail: t3.fail, complete: t3.complete });
        }
        getSync(t3) {
          return my.getStorageSync({ key: t3 }).data;
        }
      }
      t2.exports = e3;
    }, 6565: (t2) => {
      class e3 {
        connect(t3) {
          my.connectSocket({ url: t3.url, header: t3.header, method: t3.method, success: t3.success, fail: t3.fail, complete: t3.complete });
          return { onOpen: my.onSocketOpen, send: my.sendSocketMessage, onMessage: (t4) => {
            my.onSocketMessage.call(my.onSocketMessage, (e4) => {
              t4.call(t4, { data: e4 ? e4.data : "" });
            });
          }, onError: my.onSocketError, onClose: my.onSocketClose, close: my.closeSocket };
        }
      }
      t2.exports = e3;
    }, 5912: (t2, e3) => {
      Object.defineProperty(e3, "__esModule", { value: true });
      class r2 {
        os() {
          let t3 = window.navigator.userAgent.toLowerCase();
          if (t3.indexOf("android") > 0 || t3.indexOf("adr") > 0)
            return "android";
          if (!!t3.match(/\(i[^;]+;( u;)? cpu.+mac os x/))
            return "ios";
          if (t3.indexOf("windows") > 0 || t3.indexOf("win32") > 0 || t3.indexOf("win64") > 0)
            return "windows";
          if (t3.indexOf("macintosh") > 0 || t3.indexOf("mac os") > 0)
            return "mac os";
          if (t3.indexOf("linux") > 0)
            return "linux";
          if (t3.indexOf("unix") > 0)
            return "linux";
          return "other";
        }
        osVersion() {
          let t3 = window.navigator.userAgent.toLowerCase();
          let e4 = t3.substring(t3.indexOf(";") + 1).trim();
          if (e4.indexOf(";") > 0)
            return e4.substring(0, e4.indexOf(";")).trim();
          return e4.substring(0, e4.indexOf(")")).trim();
        }
        model() {
          return "";
        }
        brand() {
          return "";
        }
        platform() {
          return "H5";
        }
        platformVersion() {
          return "";
        }
        platformId() {
          return "";
        }
        language() {
          return window.navigator.language;
        }
        userAgent() {
          return window.navigator.userAgent;
        }
        getNetworkType(t3) {
          var _a;
          (_a = t3.success) == null ? void 0 : _a.call(t3.success, { networkType: window.navigator.connection.type });
        }
        onNetworkStatusChange(t3) {
        }
      }
      e3["default"] = r2;
    }, 3174: (t2, e3) => {
      Object.defineProperty(e3, "__esModule", { value: true });
      class r2 {
        set(t3) {
          var _a;
          window.localStorage.setItem(t3.key, t3.data);
          (_a = t3.success) == null ? void 0 : _a.call(t3.success, "");
        }
        setSync(t3, e4) {
          window.localStorage.setItem(t3, e4);
        }
        get(t3) {
          var _a;
          let e4 = window.localStorage.getItem(t3.key);
          (_a = t3.success) == null ? void 0 : _a.call(t3.success, e4);
        }
        getSync(t3) {
          return window.localStorage.getItem(t3);
        }
      }
      e3["default"] = r2;
    }, 4698: (t2, e3) => {
      Object.defineProperty(e3, "__esModule", { value: true });
      class r2 {
        connect(t3) {
          let e4 = new WebSocket(t3.url);
          return { send: (t4) => {
            var _a, _b;
            try {
              e4.send(t4.data);
              (_a = t4.success) == null ? void 0 : _a.call(t4.success, { errMsg: "" });
            } catch (e5) {
              (_b = t4.fail) == null ? void 0 : _b.call(t4.fail, { errMsg: e5 + "" });
            }
          }, close: (t4) => {
            var _a, _b;
            try {
              e4.close(t4.code, t4.reason);
              (_a = t4.success) == null ? void 0 : _a.call(t4.success, { errMsg: "" });
            } catch (e5) {
              (_b = t4.fail) == null ? void 0 : _b.call(t4.fail, { errMsg: e5 + "" });
            }
          }, onOpen: (r3) => {
            e4.onopen = (e5) => {
              var _a;
              (_a = t3.success) == null ? void 0 : _a.call(t3.success, "");
              r3({ header: "" });
            };
          }, onError: (r3) => {
            e4.onerror = (e5) => {
              var _a;
              (_a = t3.fail) == null ? void 0 : _a.call(t3.fail, "");
              r3({ errMsg: "" });
            };
          }, onMessage: (t4) => {
            e4.onmessage = (e5) => {
              t4({ data: e5.data });
            };
          }, onClose: (t4) => {
            e4.onclose = (e5) => {
              t4(e5);
            };
          } };
        }
      }
      e3["default"] = r2;
    }, 87: (t2, e3) => {
      Object.defineProperty(e3, "__esModule", { value: true });
      class r2 {
        constructor() {
          this.systemInfo = tt.getSystemInfoSync();
        }
        os() {
          return this.systemInfo.platform;
        }
        osVersion() {
          return this.systemInfo.system;
        }
        model() {
          return this.systemInfo.model;
        }
        brand() {
          return this.systemInfo.brand;
        }
        platform() {
          return "MP-TOUTIAO";
        }
        platformVersion() {
          return this.systemInfo.appName + " " + this.systemInfo.version;
        }
        language() {
          return "";
        }
        platformId() {
          return "";
        }
        getNetworkType(t3) {
          tt.getNetworkType(t3);
        }
        onNetworkStatusChange(t3) {
          tt.onNetworkStatusChange(t3);
        }
      }
      e3["default"] = r2;
    }, 523: (t2, e3) => {
      Object.defineProperty(e3, "__esModule", { value: true });
      class r2 {
        set(t3) {
          tt.setStorage(t3);
        }
        setSync(t3, e4) {
          tt.setStorageSync(t3, e4);
        }
        get(t3) {
          tt.getStorage(t3);
        }
        getSync(t3) {
          return tt.getStorageSync(t3);
        }
      }
      e3["default"] = r2;
    }, 7252: (t2, e3) => {
      Object.defineProperty(e3, "__esModule", { value: true });
      class r2 {
        connect(t3) {
          let e4 = tt.connectSocket({ url: t3.url, header: t3.header, protocols: t3.protocols, success: t3.success, fail: t3.fail, complete: t3.complete });
          return { onOpen: e4.onOpen, send: e4.send, onMessage: e4.onMessage, onError: e4.onError, onClose: e4.onClose, close: e4.close };
        }
      }
      e3["default"] = r2;
    }, 4668: (t2, e3) => {
      Object.defineProperty(e3, "__esModule", { value: true });
      class r2 {
        constructor() {
          try {
            this.systemInfo = index.getSystemInfoSync();
            this.accountInfo = index.getAccountInfoSync();
          } catch (t3) {
          }
        }
        os() {
          return this.systemInfo ? this.systemInfo.platform : "";
        }
        model() {
          return this.systemInfo ? this.systemInfo.model : "";
        }
        brand() {
          var _a;
          return ((_a = this.systemInfo) == null ? void 0 : _a.brand) ? this.systemInfo.brand : "";
        }
        osVersion() {
          return this.systemInfo ? this.systemInfo.system : "";
        }
        platform() {
          let t3 = "";
          t3 = "MP-WEIXIN";
          return t3;
        }
        platformVersion() {
          return this.systemInfo ? this.systemInfo.version : "";
        }
        platformId() {
          return this.accountInfo ? this.accountInfo.miniProgram.appId : "";
        }
        language() {
          var _a;
          return ((_a = this.systemInfo) == null ? void 0 : _a.language) ? this.systemInfo.language : "";
        }
        userAgent() {
          return window ? window.navigator.userAgent : "";
        }
        getNetworkType(t3) {
          index.getNetworkType(t3);
        }
        onNetworkStatusChange(t3) {
          index.onNetworkStatusChange(t3);
        }
      }
      e3["default"] = r2;
    }, 3072: (t2, e3) => {
      Object.defineProperty(e3, "__esModule", { value: true });
      class r2 {
        set(t3) {
          index.setStorage(t3);
        }
        setSync(t3, e4) {
          index.setStorageSync(t3, e4);
        }
        get(t3) {
          index.getStorage(t3);
        }
        getSync(t3) {
          return index.getStorageSync(t3);
        }
      }
      e3["default"] = r2;
    }, 1996: (t2, e3) => {
      Object.defineProperty(e3, "__esModule", { value: true });
      class r2 {
        connect(t3) {
          let e4 = index.connectSocket(t3);
          return { send: (t4) => {
            e4 == null ? void 0 : e4.send(t4);
          }, close: (t4) => {
            e4 == null ? void 0 : e4.close(t4);
          }, onOpen: (t4) => {
            e4 == null ? void 0 : e4.onOpen(t4);
          }, onError: (t4) => {
            e4 == null ? void 0 : e4.onError(t4);
          }, onMessage: (t4) => {
            e4 == null ? void 0 : e4.onMessage(t4);
          }, onClose: (t4) => {
            e4 == null ? void 0 : e4.onClose(t4);
          } };
        }
      }
      e3["default"] = r2;
    }, 9342: (t2, e3) => {
      Object.defineProperty(e3, "__esModule", { value: true });
      class r2 {
        constructor() {
          this.systemInfo = wx.getSystemInfoSync();
        }
        os() {
          return this.systemInfo.platform;
        }
        osVersion() {
          return this.systemInfo.system;
        }
        model() {
          return this.systemInfo.model;
        }
        brand() {
          return this.systemInfo.brand;
        }
        platform() {
          return "MP-WEIXIN";
        }
        platformVersion() {
          return this.systemInfo.version;
        }
        language() {
          return this.systemInfo.language;
        }
        platformId() {
          if (wx.canIUse("getAccountInfoSync"))
            return wx.getAccountInfoSync().miniProgram.appId;
          return "";
        }
        getNetworkType(t3) {
          wx.getNetworkType({ success: (e4) => {
            var _a;
            (_a = t3.success) == null ? void 0 : _a.call(t3.success, { networkType: e4.networkType });
          }, fail: t3.fail });
        }
        onNetworkStatusChange(t3) {
          wx.onNetworkStatusChange(t3);
        }
      }
      e3["default"] = r2;
    }, 155: (t2, e3) => {
      Object.defineProperty(e3, "__esModule", { value: true });
      class r2 {
        set(t3) {
          wx.setStorage(t3);
        }
        setSync(t3, e4) {
          wx.setStorageSync(t3, e4);
        }
        get(t3) {
          wx.getStorage(t3);
        }
        getSync(t3) {
          return wx.getStorageSync(t3);
        }
      }
      e3["default"] = r2;
    }, 3751: (t2, e3) => {
      Object.defineProperty(e3, "__esModule", { value: true });
      class r2 {
        connect(t3) {
          let e4 = wx.connectSocket({ url: t3.url, header: t3.header, protocols: t3.protocols, success: t3.success, fail: t3.fail, complete: t3.complete });
          return { onOpen: e4.onOpen, send: e4.send, onMessage: e4.onMessage, onError: e4.onError, onClose: e4.onClose, close: e4.close };
        }
      }
      e3["default"] = r2;
    }, 127: (t2, e3) => {
      Object.defineProperty(e3, "__esModule", { value: true });
      var r2;
      (function(t3) {
        t3.SDK_VERSION = "GTMP-2.0.1.dcloud";
        t3.DEFAULT_SOCKET_URL = "wss://wshz.getui.net:5223/nws";
        t3.SOCKET_PROTOCOL_VERSION = "1.0";
        t3.SERVER_PUBLIC_KEY = "MHwwDQYJKoZIhvcNAQEBBQADawAwaAJhAJp1rROuvBF7sBSnvLaesj2iFhMcY8aXyLvpnNLKs2wjL3JmEnyr++SlVa35liUlzi83tnAFkn3A9GB7pHBNzawyUkBh8WUhq5bnFIkk2RaDa6+5MpG84DEv52p7RR+aWwIDAQAB";
        t3.SERVER_PUBLIC_KEY_ID = "69d747c4b9f641baf4004be4297e9f3b";
      })(r2 || (r2 = {}));
      e3["default"] = r2;
    }, 1901: function(t2, e3, r2) {
      var i2 = this && this.__importDefault || function(t3) {
        return t3 && t3.__esModule ? t3 : { default: t3 };
      };
      Object.defineProperty(e3, "__esModule", { value: true });
      const n = i2(r2(7071));
      const s = i2(r2(1237));
      const a = i2(r2(1754));
      class o2 {
        static init(t3) {
          var _a;
          if (this.inited)
            return;
          try {
            this.checkAppid(t3.appid);
            this.inited = true;
            s.default.info(`init: appid=${t3.appid}`);
            a.default.init(t3);
            n.default.connect();
          } catch (e4) {
            this.inited = false;
            (_a = t3.onError) == null ? void 0 : _a.call(t3.onError, { error: e4 });
            throw e4;
          }
        }
        static enableSocket(t3) {
          this.checkInit();
          n.default.allowReconnect = t3;
          if (t3)
            n.default.reconnect(0);
          else
            n.default.close(`enableSocket ${t3}`);
        }
        static checkInit() {
          if (!this.inited)
            throw new Error(`not init, please invoke init method firstly`);
        }
        static checkAppid(t3) {
          if (t3 == null || t3 == void 0 || t3.trim() == "")
            throw new Error(`invalid appid ${t3}`);
        }
      }
      o2.inited = false;
      e3["default"] = o2;
    }, 1754: function(t2, e3, r2) {
      var i2 = this && this.__importDefault || function(t3) {
        return t3 && t3.__esModule ? t3 : { default: t3 };
      };
      Object.defineProperty(e3, "__esModule", { value: true });
      const n = i2(r2(323));
      const s = i2(r2(9934));
      const a = i2(r2(127));
      const o2 = i2(r2(7071));
      const u = i2(r2(1237));
      const c = i2(r2(5574));
      const l = i2(r2(7406));
      class f {
        static init(t3) {
          var _a;
          this.appid = c.default.to_getui(t3.appid);
          u.default.info(`getui appid: ${this.appid}`);
          this.onError = t3.onError;
          this.onClientId = t3.onClientId;
          this.onlineState = t3.onlineState;
          this.onPushMsg = t3.onPushMsg;
          if (this.appid != s.default.getSync(s.default.KEY_APPID, this.appid)) {
            u.default.info("appid changed, clear session and cid");
            s.default.setSync(s.default.KEY_CID, "");
            s.default.setSync(s.default.KEY_SESSION, "");
          }
          s.default.setSync(s.default.KEY_APPID, this.appid);
          this.cid = s.default.getSync(s.default.KEY_CID, this.cid);
          if (this.cid)
            (_a = this.onClientId) == null ? void 0 : _a.call(this.onClientId, { cid: f.cid });
          this.session = s.default.getSync(s.default.KEY_SESSION, this.session);
          this.deviceId = s.default.getSync(s.default.KEY_DEVICE_ID, this.deviceId);
          this.regId = s.default.getSync(s.default.KEY_REGID, this.regId);
          if (!this.regId) {
            this.regId = this.createRegId();
            s.default.set({ key: s.default.KEY_REGID, data: this.regId });
          }
          this.socketUrl = s.default.getSync(s.default.KEY_SOCKET_URL, this.socketUrl);
          let e4 = this;
          l.default.getNetworkType({ success: (t4) => {
            e4.networkType = t4.networkType;
            e4.networkConnected = e4.networkType != "none" && e4.networkType != "";
          } });
          l.default.onNetworkStatusChange((t4) => {
            e4.networkConnected = t4.isConnected;
            e4.networkType = t4.networkType;
            if (e4.networkConnected)
              o2.default.reconnect(0);
          });
        }
        static createRegId() {
          return `M-V${n.default.md5Hex(this.getUuid())}-${new Date().getTime()}`;
        }
        static getUuid() {
          return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(t3) {
            let e4 = 16 * Math.random() | 0, r3 = t3 === "x" ? e4 : 3 & e4 | 8;
            return r3.toString(16);
          });
        }
      }
      f.appid = "";
      f.cid = "";
      f.regId = "";
      f.session = "";
      f.deviceId = "";
      f.packetId = 1;
      f.online = false;
      f.socketUrl = a.default.DEFAULT_SOCKET_URL;
      f.publicKeyId = a.default.SERVER_PUBLIC_KEY_ID;
      f.publicKey = a.default.SERVER_PUBLIC_KEY;
      f.lastAliasTime = 0;
      f.networkConnected = true;
      f.networkType = "none";
      e3["default"] = f;
    }, 9214: function(t2, e3, r2) {
      var i2 = this && this.__importDefault || function(t3) {
        return t3 && t3.__esModule ? t3 : { default: t3 };
      };
      var n, s;
      Object.defineProperty(e3, "__esModule", { value: true });
      const a = i2(r2(9800));
      const o2 = r2(3118);
      const u = i2(r2(1754));
      class c extends a.default {
        constructor() {
          super(...arguments);
          this.actionMsgData = new l();
        }
        static initActionMsg(t3, ...e4) {
          super.initMsg(t3);
          t3.command = a.default.Command.CLIENT_MSG;
          t3.data = t3.actionMsgData = l.create();
          return t3;
        }
        static parseActionMsg(t3, e4) {
          super.parseMsg(t3, e4);
          t3.actionMsgData = l.parse(t3.data);
          return t3;
        }
        send() {
          setTimeout(() => {
            var _a;
            if (c.waitingLoginMsgMap.has(this.actionMsgData.msgId) || c.waitingResponseMsgMap.has(this.actionMsgData.msgId)) {
              c.waitingLoginMsgMap.delete(this.actionMsgData.msgId);
              c.waitingResponseMsgMap.delete(this.actionMsgData.msgId);
              (_a = this.callback) == null ? void 0 : _a.call(this.callback, { resultCode: o2.ErrorCode.TIME_OUT, message: "waiting time out" });
            }
          }, 1e4);
          if (!u.default.online) {
            c.waitingLoginMsgMap.set(this.actionMsgData.msgId, this);
            return;
          }
          if (this.actionMsgData.msgAction != c.ClientAction.RECEIVED)
            c.waitingResponseMsgMap.set(this.actionMsgData.msgId, this);
          super.send();
        }
        receive() {
        }
        static sendWaitingMessages() {
          let t3 = this.waitingLoginMsgMap.keys();
          let e4;
          while (e4 = t3.next(), !e4.done) {
            let t4 = this.waitingLoginMsgMap.get(e4.value);
            this.waitingLoginMsgMap.delete(e4.value);
            t4 == null ? void 0 : t4.send();
          }
        }
        static getWaitingResponseMessage(t3) {
          return c.waitingResponseMsgMap.get(t3);
        }
        static removeWaitingResponseMessage(t3) {
          let e4 = c.waitingResponseMsgMap.get(t3);
          if (e4)
            c.waitingResponseMsgMap.delete(t3);
          return e4;
        }
      }
      c.ServerAction = (n = class {
      }, n.PUSH_MESSAGE = "pushmessage", n.REDIRECT_SERVER = "redirect_server", n.ADD_PHONE_INFO_RESULT = "addphoneinfo", n.SET_MODE_RESULT = "set_mode_result", n.SET_TAG_RESULT = "settag_result", n.BIND_ALIAS_RESULT = "response_bind", n.UNBIND_ALIAS_RESULT = "response_unbind", n.FEED_BACK_RESULT = "pushmessage_feedback", n.RECEIVED = "received", n);
      c.ClientAction = (s = class {
      }, s.ADD_PHONE_INFO = "addphoneinfo", s.SET_MODE = "set_mode", s.FEED_BACK = "pushmessage_feedback", s.SET_TAGS = "set_tag", s.BIND_ALIAS = "bind_alias", s.UNBIND_ALIAS = "unbind_alias", s.RECEIVED = "received", s);
      c.waitingLoginMsgMap = /* @__PURE__ */ new Map();
      c.waitingResponseMsgMap = /* @__PURE__ */ new Map();
      class l {
        constructor() {
          this.appId = "";
          this.cid = "";
          this.msgId = "";
          this.msgAction = "";
          this.msgData = "";
          this.msgExtraData = "";
        }
        static create() {
          let t3 = new l();
          t3.appId = u.default.appid;
          t3.cid = u.default.cid;
          t3.msgId = (2147483647 & new Date().getTime()).toString();
          return t3;
        }
        static parse(t3) {
          let e4 = new l();
          let r3 = JSON.parse(t3);
          e4.appId = r3.appId;
          e4.cid = r3.cid;
          e4.msgId = r3.msgId;
          e4.msgAction = r3.msgAction;
          e4.msgData = r3.msgData;
          e4.msgExtraData = r3.msgExtraData;
          return e4;
        }
      }
      e3["default"] = c;
    }, 708: function(t2, e3, r2) {
      var i2 = this && this.__importDefault || function(t3) {
        return t3 && t3.__esModule ? t3 : { default: t3 };
      };
      Object.defineProperty(e3, "__esModule", { value: true });
      const n = i2(r2(7406));
      const s = i2(r2(9934));
      const a = i2(r2(127));
      const o2 = r2(3118);
      const u = i2(r2(9214));
      const c = i2(r2(1754));
      class l extends u.default {
        constructor() {
          super(...arguments);
          this.addPhoneInfoData = new f();
        }
        static create() {
          let t3 = new l();
          super.initActionMsg(t3);
          t3.callback = (e4) => {
            if (e4.resultCode != o2.ErrorCode.SUCCESS && e4.resultCode != o2.ErrorCode.REPEAT_MESSAGE)
              setTimeout(function() {
                t3.send();
              }, 30 * 1e3);
            else
              s.default.set({ key: s.default.KEY_ADD_PHONE_INFO_TIME, data: new Date().getTime() });
          };
          t3.actionMsgData.msgAction = u.default.ClientAction.ADD_PHONE_INFO;
          t3.addPhoneInfoData = f.create();
          t3.actionMsgData.msgData = JSON.stringify(t3.addPhoneInfoData);
          return t3;
        }
        send() {
          let t3 = new Date().getTime();
          let e4 = s.default.getSync(s.default.KEY_ADD_PHONE_INFO_TIME, 0);
          if (t3 - e4 < 24 * 60 * 60 * 1e3)
            return;
          super.send();
        }
      }
      class f {
        constructor() {
          this.model = "";
          this.brand = "";
          this.system_version = "";
          this.version = "";
          this.deviceid = "";
          this.type = "";
        }
        static create() {
          let t3 = new f();
          t3.model = n.default.model();
          t3.brand = n.default.brand();
          t3.system_version = n.default.osVersion();
          t3.version = a.default.SDK_VERSION;
          t3.device_token = "";
          t3.imei = "";
          t3.oaid = "";
          t3.mac = "";
          t3.idfa = "";
          t3.type = "MINIPROGRAM";
          t3.deviceid = `${t3.type}-${c.default.deviceId}`;
          t3.extra = { os: n.default.os(), platform: n.default.platform(), platformVersion: n.default.platformVersion(), platformId: n.default.platformId(), language: n.default.language(), userAgent: n.default.userAgent() };
          return t3;
        }
      }
      e3["default"] = l;
    }, 652: function(t2, e3, r2) {
      var i2 = this && this.__importDefault || function(t3) {
        return t3 && t3.__esModule ? t3 : { default: t3 };
      };
      var n, s;
      Object.defineProperty(e3, "__esModule", { value: true });
      const a = i2(r2(1754));
      const o2 = r2(3118);
      const u = i2(r2(9214));
      class c extends u.default {
        constructor() {
          super(...arguments);
          this.feedbackData = new l();
        }
        static create(t3, e4) {
          let r3 = new c();
          super.initActionMsg(r3);
          r3.callback = (t4) => {
            if (t4.resultCode != o2.ErrorCode.SUCCESS && t4.resultCode != o2.ErrorCode.REPEAT_MESSAGE)
              setTimeout(function() {
                r3.send();
              }, 30 * 1e3);
          };
          r3.feedbackData = l.create(t3, e4);
          r3.actionMsgData.msgAction = u.default.ClientAction.FEED_BACK;
          r3.actionMsgData.msgData = JSON.stringify(r3.feedbackData);
          return r3;
        }
        send() {
          super.send();
        }
      }
      c.ActionId = (n = class {
      }, n.RECEIVE = "0", n.MP_RECEIVE = "210000", n.WEB_RECEIVE = "220000", n.BEGIN = "1", n);
      c.RESULT = (s = class {
      }, s.OK = "ok", s);
      class l {
        constructor() {
          this.messageid = "";
          this.appkey = "";
          this.appid = "";
          this.taskid = "";
          this.actionid = "";
          this.result = "";
          this.timestamp = "";
        }
        static create(t3, e4) {
          let r3 = new l();
          r3.messageid = t3.pushMessageData.messageid;
          r3.appkey = t3.pushMessageData.appKey;
          r3.appid = a.default.appid;
          r3.taskid = t3.pushMessageData.taskId;
          r3.actionid = e4;
          r3.result = c.RESULT.OK;
          r3.timestamp = new Date().getTime().toString();
          return r3;
        }
      }
      e3["default"] = c;
    }, 6561: function(t2, e3, r2) {
      var i2 = this && this.__importDefault || function(t3) {
        return t3 && t3.__esModule ? t3 : { default: t3 };
      };
      Object.defineProperty(e3, "__esModule", { value: true });
      const n = i2(r2(9800));
      class s extends n.default {
        static create() {
          let t3 = new s();
          super.initMsg(t3);
          t3.command = n.default.Command.HEART_BEAT;
          return t3;
        }
      }
      e3["default"] = s;
    }, 358: function(t2, e3, r2) {
      var i2 = this && this.__importDefault || function(t3) {
        return t3 && t3.__esModule ? t3 : { default: t3 };
      };
      Object.defineProperty(e3, "__esModule", { value: true });
      const n = i2(r2(323));
      const s = i2(r2(1754));
      const a = i2(r2(9800));
      class o2 extends a.default {
        constructor() {
          super(...arguments);
          this.keyNegotiateData = new u();
        }
        static create() {
          let t3 = new o2();
          super.initMsg(t3);
          t3.command = a.default.Command.KEY_NEGOTIATE;
          n.default.resetKey();
          t3.data = t3.keyNegotiateData = u.create();
          return t3;
        }
        send() {
          super.send();
        }
      }
      class u {
        constructor() {
          this.appId = "";
          this.rsaPublicKeyId = "";
          this.algorithm = "";
          this.secretKey = "";
          this.iv = "";
        }
        static create() {
          let t3 = new u();
          t3.appId = s.default.appid;
          t3.rsaPublicKeyId = s.default.publicKeyId;
          t3.algorithm = "AES";
          t3.secretKey = n.default.getEncryptedSecretKey();
          t3.iv = n.default.getEncryptedIV();
          return t3;
        }
      }
      e3["default"] = o2;
    }, 5301: function(t2, e3, r2) {
      var i2 = this && this.__importDefault || function(t3) {
        return t3 && t3.__esModule ? t3 : { default: t3 };
      };
      Object.defineProperty(e3, "__esModule", { value: true });
      const n = i2(r2(9800));
      const s = i2(r2(323));
      const a = i2(r2(2544));
      const o2 = i2(r2(1237));
      const u = i2(r2(1754));
      class c extends n.default {
        constructor() {
          super(...arguments);
          this.keyNegotiateResultData = new l();
        }
        static parse(t3) {
          let e4 = new c();
          super.parseMsg(e4, t3);
          e4.keyNegotiateResultData = l.parse(e4.data);
          return e4;
        }
        receive() {
          var _a, _b;
          if (this.keyNegotiateResultData.errorCode != 0) {
            o2.default.error(`key negotiate fail: ${this.data}`);
            (_a = u.default.onError) == null ? void 0 : _a.call(u.default.onError, { error: `key negotiate fail: ${this.data}` });
            return;
          }
          let t3 = this.keyNegotiateResultData.encryptType.split("/");
          if (!s.default.algorithmMap.has(t3[0].trim().toLowerCase()) || !s.default.modeMap.has(t3[1].trim().toLowerCase()) || !s.default.paddingMap.has(t3[2].trim().toLowerCase())) {
            o2.default.error(`key negotiate fail: ${this.data}`);
            (_b = u.default.onError) == null ? void 0 : _b.call(u.default.onError, { error: `key negotiate fail: ${this.data}` });
            return;
          }
          s.default.setEncryptParams(t3[0].trim().toLowerCase(), t3[1].trim().toLowerCase(), t3[2].trim().toLowerCase());
          a.default.create().send();
        }
      }
      class l {
        constructor() {
          this.errorCode = -1;
          this.errorMsg = "";
          this.encryptType = "";
        }
        static parse(t3) {
          let e4 = new l();
          let r3 = JSON.parse(t3);
          e4.errorCode = r3.errorCode;
          e4.errorMsg = r3.errorMsg;
          e4.encryptType = r3.encryptType;
          return e4;
        }
      }
      e3["default"] = c;
    }, 2544: function(t2, e3, r2) {
      var i2 = this && this.__importDefault || function(t3) {
        return t3 && t3.__esModule ? t3 : { default: t3 };
      };
      Object.defineProperty(e3, "__esModule", { value: true });
      const n = i2(r2(1754));
      const s = i2(r2(323));
      const a = i2(r2(9800));
      const o2 = i2(r2(3527));
      class u extends a.default {
        constructor() {
          super(...arguments);
          this.loginData = new c();
        }
        static create() {
          let t3 = new u();
          super.initMsg(t3);
          t3.command = a.default.Command.LOGIN;
          t3.data = t3.loginData = c.create();
          return t3;
        }
        send() {
          if (!this.loginData.session || n.default.cid != s.default.md5Hex(this.loginData.session)) {
            o2.default.create().send();
            return;
          }
          super.send();
        }
      }
      class c {
        constructor() {
          this.appId = "";
          this.session = "";
        }
        static create() {
          let t3 = new c();
          t3.appId = n.default.appid;
          t3.session = n.default.session;
          return t3;
        }
      }
      e3["default"] = u;
    }, 8734: function(t2, e3, r2) {
      var i2 = this && this.__importDefault || function(t3) {
        return t3 && t3.__esModule ? t3 : { default: t3 };
      };
      Object.defineProperty(e3, "__esModule", { value: true });
      const n = i2(r2(9934));
      const s = i2(r2(9800));
      const a = i2(r2(1754));
      const o2 = i2(r2(9214));
      const u = i2(r2(708));
      const c = i2(r2(2544));
      class l extends s.default {
        constructor() {
          super(...arguments);
          this.loginResultData = new f();
        }
        static parse(t3) {
          let e4 = new l();
          super.parseMsg(e4, t3);
          e4.loginResultData = f.parse(e4.data);
          return e4;
        }
        receive() {
          var _a;
          if (this.loginResultData.errorCode != 0) {
            this.data;
            a.default.session = a.default.cid = "";
            n.default.setSync(n.default.KEY_CID, "");
            n.default.setSync(n.default.KEY_SESSION, "");
            c.default.create().send();
            return;
          }
          if (!a.default.online) {
            a.default.online = true;
            (_a = a.default.onlineState) == null ? void 0 : _a.call(a.default.onlineState, { online: a.default.online });
          }
          o2.default.sendWaitingMessages();
          u.default.create().send();
        }
      }
      class f {
        constructor() {
          this.errorCode = -1;
          this.errorMsg = "";
          this.session = "";
        }
        static parse(t3) {
          let e4 = new f();
          let r3 = JSON.parse(t3);
          e4.errorCode = r3.errorCode;
          e4.errorMsg = r3.errorMsg;
          e4.session = r3.session;
          return e4;
        }
      }
      e3["default"] = l;
    }, 9800: function(t2, e3, r2) {
      var i2 = this && this.__importDefault || function(t3) {
        return t3 && t3.__esModule ? t3 : { default: t3 };
      };
      var n;
      Object.defineProperty(e3, "__esModule", { value: true });
      const s = i2(r2(350));
      const a = i2(r2(7071));
      const o2 = i2(r2(127));
      const u = i2(r2(1754));
      class c {
        constructor() {
          this.version = "";
          this.command = 0;
          this.packetId = 0;
          this.timeStamp = 0;
          this.data = "";
          this.signature = "";
        }
        static initMsg(t3, ...e4) {
          t3.version = o2.default.SOCKET_PROTOCOL_VERSION;
          t3.command = 0;
          t3.timeStamp = new Date().getTime();
          return t3;
        }
        static parseMsg(t3, e4) {
          let r3 = JSON.parse(e4);
          t3.version = r3.version;
          t3.command = r3.command;
          t3.packetId = r3.packetId;
          t3.timeStamp = r3.timeStamp;
          t3.data = r3.data;
          t3.signature = r3.signature;
          return t3;
        }
        stringify() {
          return JSON.stringify(this, ["version", "command", "packetId", "timeStamp", "data", "signature"]);
        }
        send() {
          if (!a.default.isAvailable())
            return;
          this.packetId = u.default.packetId++;
          this.data = JSON.stringify(this.data);
          this.stringify();
          if (this.command != c.Command.HEART_BEAT) {
            s.default.sign(this);
            if (this.data && this.command != c.Command.KEY_NEGOTIATE)
              s.default.encrypt(this);
          }
          a.default.send(this.stringify());
        }
      }
      c.Command = (n = class {
      }, n.HEART_BEAT = 0, n.KEY_NEGOTIATE = 1, n.KEY_NEGOTIATE_RESULT = 16, n.REGISTER = 2, n.REGISTER_RESULT = 32, n.LOGIN = 3, n.LOGIN_RESULT = 48, n.LOGOUT = 4, n.LOGOUT_RESULT = 64, n.CLIENT_MSG = 5, n.SERVER_MSG = 80, n.SERVER_CLOSE = 96, n.REDIRECT_SERVER = 112, n);
      e3["default"] = c;
    }, 350: function(t2, e3, r2) {
      var i2 = this && this.__importDefault || function(t3) {
        return t3 && t3.__esModule ? t3 : { default: t3 };
      };
      Object.defineProperty(e3, "__esModule", { value: true });
      const n = i2(r2(323));
      var s;
      (function(t3) {
        function e4(t4) {
          t4.data = n.default.encrypt(t4.data);
        }
        t3.encrypt = e4;
        function r3(t4) {
          t4.data = n.default.decrypt(t4.data);
        }
        t3.decrypt = r3;
        function i3(t4) {
          t4.signature = n.default.sha256(`${t4.timeStamp}${t4.packetId}${t4.command}${t4.data}`);
        }
        t3.sign = i3;
        function s2(t4) {
          let e5 = n.default.sha256(`${t4.timeStamp}${t4.packetId}${t4.command}${t4.data}`);
          if (t4.signature != e5)
            throw new Error(`msg signature vierfy failed`);
        }
        t3.verify = s2;
      })(s || (s = {}));
      e3["default"] = s;
    }, 1236: function(t2, e3, r2) {
      var i2 = this && this.__importDefault || function(t3) {
        return t3 && t3.__esModule ? t3 : { default: t3 };
      };
      Object.defineProperty(e3, "__esModule", { value: true });
      const n = i2(r2(5301));
      const s = i2(r2(8734));
      const a = i2(r2(9800));
      const o2 = i2(r2(7078));
      const u = i2(r2(538));
      const c = i2(r2(7821));
      const l = i2(r2(217));
      const f = i2(r2(7156));
      const h = i2(r2(53));
      const d = i2(r2(9214));
      const p = i2(r2(7303));
      const v = i2(r2(6063));
      const g = i2(r2(7923));
      const y = i2(r2(350));
      const m = i2(r2(9214));
      const w = i2(r2(6254));
      const S = i2(r2(5035));
      class _ {
        static receiveMessage(t3) {
          let e4 = a.default.parseMsg(new a.default(), t3);
          if (e4.command == a.default.Command.HEART_BEAT)
            return;
          if (e4.command != a.default.Command.KEY_NEGOTIATE_RESULT && e4.command != a.default.Command.SERVER_CLOSE && e4.command != a.default.Command.REDIRECT_SERVER)
            y.default.decrypt(e4);
          if (e4.command != a.default.Command.SERVER_CLOSE && e4.command != a.default.Command.REDIRECT_SERVER)
            y.default.verify(e4);
          switch (e4.command) {
            case a.default.Command.KEY_NEGOTIATE_RESULT:
              n.default.parse(e4.stringify()).receive();
              break;
            case a.default.Command.REGISTER_RESULT:
              o2.default.parse(e4.stringify()).receive();
              break;
            case a.default.Command.LOGIN_RESULT:
              s.default.parse(e4.stringify()).receive();
              break;
            case a.default.Command.SERVER_MSG:
              this.receiveActionMsg(e4.stringify());
              break;
            case a.default.Command.SERVER_CLOSE:
              S.default.parse(e4.stringify()).receive();
              break;
            case a.default.Command.REDIRECT_SERVER:
              h.default.parse(e4.stringify()).receive();
              break;
          }
        }
        static receiveActionMsg(t3) {
          let e4 = m.default.parseActionMsg(new m.default(), t3);
          if (e4.actionMsgData.msgAction != d.default.ServerAction.RECEIVED && e4.actionMsgData.msgAction != d.default.ServerAction.REDIRECT_SERVER) {
            let t4 = JSON.parse(e4.actionMsgData.msgData);
            w.default.create(t4.id).send();
          }
          switch (e4.actionMsgData.msgAction) {
            case d.default.ServerAction.PUSH_MESSAGE:
              f.default.parse(t3).receive();
              break;
            case d.default.ServerAction.ADD_PHONE_INFO_RESULT:
              u.default.parse(t3).receive();
              break;
            case d.default.ServerAction.SET_MODE_RESULT:
              p.default.parse(t3).receive();
              break;
            case d.default.ServerAction.SET_TAG_RESULT:
              v.default.parse(t3).receive();
              break;
            case d.default.ServerAction.BIND_ALIAS_RESULT:
              c.default.parse(t3).receive();
              break;
            case d.default.ServerAction.UNBIND_ALIAS_RESULT:
              g.default.parse(t3).receive();
              break;
            case d.default.ServerAction.FEED_BACK_RESULT:
              l.default.parse(t3).receive();
              break;
            case d.default.ServerAction.RECEIVED:
              w.default.parse(t3).receive();
              break;
          }
        }
      }
      e3["default"] = _;
    }, 6254: function(t2, e3, r2) {
      var i2 = this && this.__importDefault || function(t3) {
        return t3 && t3.__esModule ? t3 : { default: t3 };
      };
      Object.defineProperty(e3, "__esModule", { value: true });
      const n = r2(3118);
      const s = i2(r2(1754));
      const a = i2(r2(9214));
      class o2 extends a.default {
        constructor() {
          super(...arguments);
          this.receivedData = new u();
        }
        static create(t3) {
          let e4 = new o2();
          super.initActionMsg(e4);
          e4.callback = (t4) => {
            if (t4.resultCode != n.ErrorCode.SUCCESS && t4.resultCode != n.ErrorCode.REPEAT_MESSAGE)
              setTimeout(function() {
                e4.send();
              }, 3 * 1e3);
          };
          e4.actionMsgData.msgAction = a.default.ClientAction.RECEIVED;
          e4.receivedData = u.create(t3);
          e4.actionMsgData.msgData = JSON.stringify(e4.receivedData);
          return e4;
        }
        static parse(t3) {
          let e4 = new o2();
          super.parseActionMsg(e4, t3);
          e4.receivedData = u.parse(e4.data);
          return e4;
        }
        receive() {
          var _a;
          let t3 = a.default.getWaitingResponseMessage(this.actionMsgData.msgId);
          if (t3 && t3.actionMsgData.msgAction == a.default.ClientAction.ADD_PHONE_INFO || t3 && t3.actionMsgData.msgAction == a.default.ClientAction.FEED_BACK) {
            a.default.removeWaitingResponseMessage(t3.actionMsgData.msgId);
            (_a = t3.callback) == null ? void 0 : _a.call(t3.callback, { resultCode: n.ErrorCode.SUCCESS, message: "received" });
          }
        }
        send() {
          super.send();
        }
      }
      class u {
        constructor() {
          this.msgId = "";
          this.cid = "";
        }
        static create(t3) {
          let e4 = new u();
          e4.cid = s.default.cid;
          e4.msgId = t3;
          return e4;
        }
        static parse(t3) {
          let e4 = new u();
          let r3 = JSON.parse(t3);
          e4.cid = r3.cid;
          e4.msgId = r3.msgId;
          return e4;
        }
      }
      e3["default"] = o2;
    }, 53: function(t2, e3, r2) {
      var i2 = this && this.__importDefault || function(t3) {
        return t3 && t3.__esModule ? t3 : { default: t3 };
      };
      Object.defineProperty(e3, "__esModule", { value: true });
      e3.RedirectServerData = void 0;
      const n = i2(r2(7071));
      const s = i2(r2(9934));
      const a = i2(r2(9800));
      class o2 extends a.default {
        constructor() {
          super(...arguments);
          this.redirectServerData = new u();
        }
        static parse(t3) {
          let e4 = new o2();
          super.parseMsg(e4, t3);
          e4.redirectServerData = u.parse(e4.data);
          return e4;
        }
        receive() {
          this.redirectServerData;
          s.default.setSync(s.default.KEY_REDIRECT_SERVER, JSON.stringify(this.redirectServerData));
          n.default.close("redirect server");
          n.default.reconnect(this.redirectServerData.delay);
        }
      }
      class u {
        constructor() {
          this.addressList = [];
          this.delay = 0;
          this.loc = "";
          this.conf = "";
          this.time = 0;
        }
        static parse(t3) {
          let e4 = new u();
          let r3 = JSON.parse(t3);
          e4.addressList = r3.addressList;
          e4.delay = r3.delay;
          e4.loc = r3.loc;
          e4.conf = r3.conf;
          e4.time = r3.time ? r3.time : new Date().getTime();
          return e4;
        }
      }
      e3.RedirectServerData = u;
      e3["default"] = o2;
    }, 3527: function(t2, e3, r2) {
      var i2 = this && this.__importDefault || function(t3) {
        return t3 && t3.__esModule ? t3 : { default: t3 };
      };
      Object.defineProperty(e3, "__esModule", { value: true });
      const n = i2(r2(1754));
      const s = i2(r2(9800));
      class a extends s.default {
        constructor() {
          super(...arguments);
          this.registerData = new o2();
        }
        static create() {
          let t3 = new a();
          super.initMsg(t3);
          t3.command = s.default.Command.REGISTER;
          t3.data = t3.registerData = o2.create();
          return t3;
        }
        send() {
          super.send();
        }
      }
      class o2 {
        constructor() {
          this.appId = "";
          this.regId = "";
        }
        static create() {
          let t3 = new o2();
          t3.appId = n.default.appid;
          t3.regId = n.default.regId;
          return t3;
        }
      }
      e3["default"] = a;
    }, 7078: function(t2, e3, r2) {
      var i2 = this && this.__importDefault || function(t3) {
        return t3 && t3.__esModule ? t3 : { default: t3 };
      };
      Object.defineProperty(e3, "__esModule", { value: true });
      const n = i2(r2(9800));
      const s = i2(r2(9934));
      const a = i2(r2(1754));
      const o2 = i2(r2(2544));
      const u = i2(r2(1237));
      class c extends n.default {
        constructor() {
          super(...arguments);
          this.registerResultData = new l();
        }
        static parse(t3) {
          let e4 = new c();
          super.parseMsg(e4, t3);
          e4.registerResultData = l.parse(e4.data);
          return e4;
        }
        receive() {
          var _a, _b;
          if (this.registerResultData.errorCode != 0 || !this.registerResultData.cid || !this.registerResultData.session) {
            u.default.error(`register fail: ${this.data}`);
            (_a = a.default.onError) == null ? void 0 : _a.call(a.default.onError, { error: `register fail: ${this.data}` });
            return;
          }
          if (a.default.cid != this.registerResultData.cid)
            s.default.setSync(s.default.KEY_ADD_PHONE_INFO_TIME, 0);
          a.default.cid = this.registerResultData.cid;
          (_b = a.default.onClientId) == null ? void 0 : _b.call(a.default.onClientId, { cid: a.default.cid });
          s.default.set({ key: s.default.KEY_CID, data: a.default.cid });
          a.default.session = this.registerResultData.session;
          s.default.set({ key: s.default.KEY_SESSION, data: a.default.session });
          a.default.deviceId = this.registerResultData.deviceId;
          s.default.set({ key: s.default.KEY_DEVICE_ID, data: a.default.deviceId });
          o2.default.create().send();
        }
      }
      class l {
        constructor() {
          this.errorCode = -1;
          this.errorMsg = "";
          this.cid = "";
          this.session = "";
          this.deviceId = "";
          this.regId = "";
        }
        static parse(t3) {
          let e4 = new l();
          let r3 = JSON.parse(t3);
          e4.errorCode = r3.errorCode;
          e4.errorMsg = r3.errorMsg;
          e4.cid = r3.cid;
          e4.session = r3.session;
          e4.deviceId = r3.deviceId;
          e4.regId = r3.regId;
          return e4;
        }
      }
      e3["default"] = c;
    }, 5035: function(t2, e3, r2) {
      var i2 = this && this.__importDefault || function(t3) {
        return t3 && t3.__esModule ? t3 : { default: t3 };
      };
      Object.defineProperty(e3, "__esModule", { value: true });
      const n = i2(r2(7071));
      const s = i2(r2(9800));
      class a extends s.default {
        constructor() {
          super(...arguments);
          this.serverCloseData = new o2();
        }
        static parse(t3) {
          let e4 = new a();
          super.parseMsg(e4, t3);
          e4.serverCloseData = o2.parse(e4.data);
          return e4;
        }
        receive() {
          this.data;
          if (this.serverCloseData.code == 20 || this.serverCloseData.code == 23 || this.serverCloseData.code == 24)
            n.default.allowReconnect = false;
          n.default.close();
        }
      }
      class o2 {
        constructor() {
          this.code = -1;
          this.msg = "";
        }
        static parse(t3) {
          let e4 = new o2();
          let r3 = JSON.parse(t3);
          e4.code = r3.code;
          e4.msg = r3.msg;
          return e4;
        }
      }
      e3["default"] = a;
    }, 538: function(t2, e3, r2) {
      var i2 = this && this.__importDefault || function(t3) {
        return t3 && t3.__esModule ? t3 : { default: t3 };
      };
      Object.defineProperty(e3, "__esModule", { value: true });
      const n = i2(r2(9934));
      const s = i2(r2(9214));
      class a extends s.default {
        constructor() {
          super(...arguments);
          this.addPhoneInfoResultData = new o2();
        }
        static parse(t3) {
          let e4 = new a();
          super.parseActionMsg(e4, t3);
          e4.addPhoneInfoResultData = o2.parse(e4.actionMsgData.msgData);
          return e4;
        }
        receive() {
          var _a;
          this.addPhoneInfoResultData;
          let t3 = s.default.removeWaitingResponseMessage(this.actionMsgData.msgId);
          if (t3)
            (_a = t3.callback) == null ? void 0 : _a.call(t3.callback, { resultCode: this.addPhoneInfoResultData.errorCode, message: this.addPhoneInfoResultData.errorMsg });
          n.default.set({ key: n.default.KEY_ADD_PHONE_INFO_TIME, data: new Date().getTime() });
        }
      }
      class o2 {
        constructor() {
          this.errorCode = -1;
          this.errorMsg = "";
        }
        static parse(t3) {
          let e4 = new o2();
          let r3 = JSON.parse(t3);
          e4.errorCode = r3.errorCode;
          e4.errorMsg = r3.errorMsg;
          return e4;
        }
      }
      e3["default"] = a;
    }, 7821: function(t2, e3, r2) {
      var i2 = this && this.__importDefault || function(t3) {
        return t3 && t3.__esModule ? t3 : { default: t3 };
      };
      Object.defineProperty(e3, "__esModule", { value: true });
      const n = i2(r2(9934));
      const s = i2(r2(1237));
      const a = i2(r2(9214));
      class o2 extends a.default {
        constructor() {
          super(...arguments);
          this.bindAliasResultData = new u();
        }
        static parse(t3) {
          let e4 = new o2();
          super.parseActionMsg(e4, t3);
          e4.bindAliasResultData = u.parse(e4.actionMsgData.msgData);
          return e4;
        }
        receive() {
          var _a;
          s.default.info(`bind alias result`, this.bindAliasResultData);
          let t3 = a.default.removeWaitingResponseMessage(this.actionMsgData.msgId);
          if (t3)
            (_a = t3.callback) == null ? void 0 : _a.call(t3.callback, { resultCode: this.bindAliasResultData.errorCode, message: this.bindAliasResultData.errorMsg });
          n.default.set({ key: n.default.KEY_BIND_ALIAS_TIME, data: new Date().getTime() });
        }
      }
      class u {
        constructor() {
          this.errorCode = -1;
          this.errorMsg = "";
        }
        static parse(t3) {
          let e4 = new u();
          let r3 = JSON.parse(t3);
          e4.errorCode = r3.errorCode;
          e4.errorMsg = r3.errorMsg;
          return e4;
        }
      }
      e3["default"] = o2;
    }, 217: function(t2, e3, r2) {
      var i2 = this && this.__importDefault || function(t3) {
        return t3 && t3.__esModule ? t3 : { default: t3 };
      };
      Object.defineProperty(e3, "__esModule", { value: true });
      const n = r2(3118);
      const s = i2(r2(9214));
      class a extends s.default {
        constructor() {
          super(...arguments);
          this.feedbackResultData = new o2();
        }
        static parse(t3) {
          let e4 = new a();
          super.parseActionMsg(e4, t3);
          e4.feedbackResultData = o2.parse(e4.actionMsgData.msgData);
          return e4;
        }
        receive() {
          var _a;
          this.feedbackResultData;
          let t3 = s.default.removeWaitingResponseMessage(this.actionMsgData.msgId);
          if (t3)
            (_a = t3.callback) == null ? void 0 : _a.call(t3.callback, { resultCode: n.ErrorCode.SUCCESS, message: "received" });
        }
      }
      class o2 {
        constructor() {
          this.actionId = "";
          this.taskId = "";
          this.result = "";
        }
        static parse(t3) {
          let e4 = new o2();
          let r3 = JSON.parse(t3);
          e4.actionId = r3.actionId;
          e4.taskId = r3.taskId;
          e4.result = r3.result;
          return e4;
        }
      }
      e3["default"] = a;
    }, 7156: function(t2, e3, r2) {
      var i2 = this && this.__importDefault || function(t3) {
        return t3 && t3.__esModule ? t3 : { default: t3 };
      };
      var n;
      Object.defineProperty(e3, "__esModule", { value: true });
      const s = i2(r2(1754));
      const a = i2(r2(9214));
      const o2 = i2(r2(652));
      class u extends a.default {
        constructor() {
          super(...arguments);
          this.pushMessageData = new c();
        }
        static parse(t3) {
          let e4 = new u();
          super.parseActionMsg(e4, t3);
          e4.pushMessageData = c.parse(e4.actionMsgData.msgData);
          return e4;
        }
        receive() {
          var _a;
          this.pushMessageData;
          if (this.pushMessageData.appId != s.default.appid || !this.pushMessageData.messageid || !this.pushMessageData.taskId)
            this.stringify();
          o2.default.create(this, o2.default.ActionId.RECEIVE).send();
          o2.default.create(this, o2.default.ActionId.MP_RECEIVE).send();
          if (this.actionMsgData.msgExtraData && s.default.onPushMsg)
            (_a = s.default.onPushMsg) == null ? void 0 : _a.call(s.default.onPushMsg, { message: this.actionMsgData.msgExtraData });
        }
      }
      class c {
        constructor() {
          this.id = "";
          this.appKey = "";
          this.appId = "";
          this.messageid = "";
          this.taskId = "";
          this.actionChain = [];
          this.cdnType = "";
        }
        static parse(t3) {
          let e4 = new c();
          let r3 = JSON.parse(t3);
          e4.id = r3.id;
          e4.appKey = r3.appKey;
          e4.appId = r3.appId;
          e4.messageid = r3.messageid;
          e4.taskId = r3.taskId;
          e4.actionChain = r3.actionChain;
          e4.cdnType = r3.cdnType;
          return e4;
        }
      }
      n = class {
      }, n.GO_TO = "goto", n.TRANSMIT = "transmit";
      e3["default"] = u;
    }, 7303: function(t2, e3, r2) {
      var i2 = this && this.__importDefault || function(t3) {
        return t3 && t3.__esModule ? t3 : { default: t3 };
      };
      Object.defineProperty(e3, "__esModule", { value: true });
      const n = i2(r2(9214));
      class s extends n.default {
        constructor() {
          super(...arguments);
          this.setModeResultData = new a();
        }
        static parse(t3) {
          let e4 = new s();
          super.parseActionMsg(e4, t3);
          e4.setModeResultData = a.parse(e4.actionMsgData.msgData);
          return e4;
        }
        receive() {
          var _a;
          this.setModeResultData;
          let t3 = n.default.removeWaitingResponseMessage(this.actionMsgData.msgId);
          if (t3)
            (_a = t3.callback) == null ? void 0 : _a.call(t3.callback, { resultCode: this.setModeResultData.errorCode, message: this.setModeResultData.errorMsg });
        }
      }
      class a {
        constructor() {
          this.errorCode = -1;
          this.errorMsg = "";
        }
        static parse(t3) {
          let e4 = new a();
          let r3 = JSON.parse(t3);
          e4.errorCode = r3.errorCode;
          e4.errorMsg = r3.errorMsg;
          return e4;
        }
      }
      e3["default"] = s;
    }, 6063: function(t2, e3, r2) {
      var i2 = this && this.__importDefault || function(t3) {
        return t3 && t3.__esModule ? t3 : { default: t3 };
      };
      Object.defineProperty(e3, "__esModule", { value: true });
      const n = i2(r2(9934));
      const s = i2(r2(1237));
      const a = i2(r2(9214));
      class o2 extends a.default {
        constructor() {
          super(...arguments);
          this.setTagResultData = new u();
        }
        static parse(t3) {
          let e4 = new o2();
          super.parseActionMsg(e4, t3);
          e4.setTagResultData = u.parse(e4.actionMsgData.msgData);
          return e4;
        }
        receive() {
          var _a;
          s.default.info(`set tag result`, this.setTagResultData);
          let t3 = a.default.removeWaitingResponseMessage(this.actionMsgData.msgId);
          if (t3)
            (_a = t3.callback) == null ? void 0 : _a.call(t3.callback, { resultCode: this.setTagResultData.errorCode, message: this.setTagResultData.errorMsg });
          n.default.set({ key: n.default.KEY_SET_TAG_TIME, data: new Date().getTime() });
        }
      }
      class u {
        constructor() {
          this.errorCode = 0;
          this.errorMsg = "";
        }
        static parse(t3) {
          let e4 = new u();
          let r3 = JSON.parse(t3);
          e4.errorCode = r3.errorCode;
          e4.errorMsg = r3.errorMsg;
          return e4;
        }
      }
      e3["default"] = o2;
    }, 7923: function(t2, e3, r2) {
      var i2 = this && this.__importDefault || function(t3) {
        return t3 && t3.__esModule ? t3 : { default: t3 };
      };
      Object.defineProperty(e3, "__esModule", { value: true });
      const n = i2(r2(9934));
      const s = i2(r2(1237));
      const a = i2(r2(9214));
      class o2 extends a.default {
        constructor() {
          super(...arguments);
          this.unbindAliasResultData = new u();
        }
        static parse(t3) {
          let e4 = new o2();
          super.parseActionMsg(e4, t3);
          e4.unbindAliasResultData = u.parse(e4.actionMsgData.msgData);
          return e4;
        }
        receive() {
          var _a;
          s.default.info(`unbind alias result`, this.unbindAliasResultData);
          let t3 = a.default.removeWaitingResponseMessage(this.actionMsgData.msgId);
          if (t3)
            (_a = t3.callback) == null ? void 0 : _a.call(t3.callback, { resultCode: this.unbindAliasResultData.errorCode, message: this.unbindAliasResultData.errorMsg });
          n.default.set({ key: n.default.KEY_BIND_ALIAS_TIME, data: new Date().getTime() });
        }
      }
      class u {
        constructor() {
          this.errorCode = -1;
          this.errorMsg = "";
        }
        static parse(t3) {
          let e4 = new u();
          let r3 = JSON.parse(t3);
          e4.errorCode = r3.errorCode;
          e4.errorMsg = r3.errorMsg;
          return e4;
        }
      }
      e3["default"] = o2;
    }, 9285: (t2, e3) => {
      Object.defineProperty(e3, "__esModule", { value: true });
      class r2 {
        constructor(t3) {
          this.delay = 10;
          this.delay = t3;
        }
        start() {
          this.cancel();
          let t3 = this;
          this.timer = setInterval(function() {
            t3.run();
          }, this.delay);
        }
        cancel() {
          if (this.timer)
            clearInterval(this.timer);
        }
      }
      e3["default"] = r2;
    }, 1571: function(t2, e3, r2) {
      var i2 = this && this.__importDefault || function(t3) {
        return t3 && t3.__esModule ? t3 : { default: t3 };
      };
      var n;
      Object.defineProperty(e3, "__esModule", { value: true });
      const s = i2(r2(6561));
      const a = i2(r2(9285));
      class o2 extends a.default {
        static getInstance() {
          return o2.InstanceHolder.instance;
        }
        run() {
          s.default.create().send();
        }
        refresh() {
          this.delay = 60 * 1e3;
          this.start();
        }
      }
      o2.INTERVAL = 60 * 1e3;
      o2.InstanceHolder = (n = class {
      }, n.instance = new o2(o2.INTERVAL), n);
      e3["default"] = o2;
    }, 5574: function(t2, e3, r2) {
      var i2 = this && this.__importDefault || function(t3) {
        return t3 && t3.__esModule ? t3 : { default: t3 };
      };
      Object.defineProperty(e3, "__esModule", { value: true });
      const n = i2(r2(4736));
      const s = i2(r2(323));
      var a;
      (function(t3) {
        let e4 = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        let r3 = (0, n.default)("9223372036854775808");
        function i3(t4) {
          let e5 = a2(t4);
          let r4 = o2(e5);
          let i4 = r4[1];
          let n2 = r4[0];
          return u(i4) + u(n2);
        }
        t3.to_getui = i3;
        function a2(t4) {
          let e5 = s.default.md5Hex(t4);
          let r4 = c(e5);
          r4[6] &= 15;
          r4[6] |= 48;
          r4[8] &= 63;
          r4[8] |= 128;
          return r4;
        }
        function o2(t4) {
          let e5 = (0, n.default)(0);
          let r4 = (0, n.default)(0);
          for (let r5 = 0; r5 < 8; r5++)
            e5 = e5.multiply(256).plus((0, n.default)(255 & t4[r5]));
          for (let e6 = 8; e6 < 16; e6++)
            r4 = r4.multiply(256).plus((0, n.default)(255 & t4[e6]));
          return [e5, r4];
        }
        function u(t4) {
          if (t4 >= r3)
            t4 = r3.multiply(2).minus(t4);
          let i4 = "";
          for (; t4 > (0, n.default)(0); t4 = t4.divide(62))
            i4 += e4.charAt(Number(t4.divmod(62).remainder));
          return i4;
        }
        function c(t4) {
          let e5 = t4.length;
          if (e5 % 2 != 0)
            return [];
          let r4 = new Array();
          for (let i4 = 0; i4 < e5; i4 += 2)
            r4.push(parseInt(t4.substring(i4, i4 + 2), 16));
          return r4;
        }
      })(a || (a = {}));
      e3["default"] = a;
    }, 323: function(t2, e3, r2) {
      var i2 = this && this.__importDefault || function(t3) {
        return t3 && t3.__esModule ? t3 : { default: t3 };
      };
      Object.defineProperty(e3, "__esModule", { value: true });
      const n = i2(r2(2620));
      const s = i2(r2(1354));
      const a = i2(r2(1754));
      var o2;
      (function(t3) {
        let e4;
        let r3;
        let i3;
        let o3;
        let u = new n.default();
        let c = s.default.mode.CBC;
        let l = s.default.pad.Pkcs7;
        let f = s.default.AES;
        t3.algorithmMap = /* @__PURE__ */ new Map([["aes", s.default.AES]]);
        t3.modeMap = /* @__PURE__ */ new Map([["cbc", s.default.mode.CBC], ["cfb", s.default.mode.CFB], ["cfb128", s.default.mode.CFB], ["ecb", s.default.mode.ECB], ["ofb", s.default.mode.OFB]]);
        t3.paddingMap = /* @__PURE__ */ new Map([["nopadding", s.default.pad.NoPadding], ["pkcs7", s.default.pad.Pkcs7]]);
        function h() {
          e4 = s.default.MD5(new Date().getTime().toString());
          r3 = s.default.MD5(e4);
          u.setPublicKey(a.default.publicKey);
          e4.toString(s.default.enc.Hex);
          r3.toString(s.default.enc.Hex);
          i3 = u.encrypt(e4.toString(s.default.enc.Hex));
          o3 = u.encrypt(r3.toString(s.default.enc.Hex));
        }
        t3.resetKey = h;
        function d(e5, r4, i4) {
          f = t3.algorithmMap.get(e5);
          c = t3.modeMap.get(r4);
          l = t3.paddingMap.get(i4);
        }
        t3.setEncryptParams = d;
        function p(t4) {
          return f.encrypt(t4, e4, { iv: r3, mode: c, padding: l }).toString();
        }
        t3.encrypt = p;
        function v(t4) {
          return f.decrypt(t4, e4, { iv: r3, mode: c, padding: l }).toString(s.default.enc.Utf8);
        }
        t3.decrypt = v;
        function g(t4) {
          return s.default.SHA256(t4).toString(s.default.enc.Base64);
        }
        t3.sha256 = g;
        function y(t4) {
          return s.default.MD5(t4).toString(s.default.enc.Hex);
        }
        t3.md5Hex = y;
        function m() {
          return i3 ? i3 : "";
        }
        t3.getEncryptedSecretKey = m;
        function w() {
          return o3 ? o3 : "";
        }
        t3.getEncryptedIV = w;
      })(o2 || (o2 = {}));
      e3["default"] = o2;
    }, 1237: (t2, e3) => {
      Object.defineProperty(e3, "__esModule", { value: true });
      class r2 {
        static info(...t3) {
          if (this.debugMode)
            console.info(`[GtPush]`, t3);
        }
        static error(...t3) {
          console.error(`[GtPush]`, t3);
        }
      }
      r2.debugMode = false;
      e3["default"] = r2;
    }, 2620: (t2, e3, r2) => {
      r2.r(e3);
      r2.d(e3, { JSEncrypt: () => wt, default: () => St });
      var i2 = "0123456789abcdefghijklmnopqrstuvwxyz";
      function n(t3) {
        return i2.charAt(t3);
      }
      function s(t3, e4) {
        return t3 & e4;
      }
      function a(t3, e4) {
        return t3 | e4;
      }
      function o2(t3, e4) {
        return t3 ^ e4;
      }
      function u(t3, e4) {
        return t3 & ~e4;
      }
      function c(t3) {
        if (t3 == 0)
          return -1;
        var e4 = 0;
        if ((65535 & t3) == 0) {
          t3 >>= 16;
          e4 += 16;
        }
        if ((255 & t3) == 0) {
          t3 >>= 8;
          e4 += 8;
        }
        if ((15 & t3) == 0) {
          t3 >>= 4;
          e4 += 4;
        }
        if ((3 & t3) == 0) {
          t3 >>= 2;
          e4 += 2;
        }
        if ((1 & t3) == 0)
          ++e4;
        return e4;
      }
      function l(t3) {
        var e4 = 0;
        while (t3 != 0) {
          t3 &= t3 - 1;
          ++e4;
        }
        return e4;
      }
      var f = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
      var h = "=";
      function d(t3) {
        var e4;
        var r3;
        var i3 = "";
        for (e4 = 0; e4 + 3 <= t3.length; e4 += 3) {
          r3 = parseInt(t3.substring(e4, e4 + 3), 16);
          i3 += f.charAt(r3 >> 6) + f.charAt(63 & r3);
        }
        if (e4 + 1 == t3.length) {
          r3 = parseInt(t3.substring(e4, e4 + 1), 16);
          i3 += f.charAt(r3 << 2);
        } else if (e4 + 2 == t3.length) {
          r3 = parseInt(t3.substring(e4, e4 + 2), 16);
          i3 += f.charAt(r3 >> 2) + f.charAt((3 & r3) << 4);
        }
        while ((3 & i3.length) > 0)
          i3 += h;
        return i3;
      }
      function p(t3) {
        var e4 = "";
        var r3;
        var i3 = 0;
        var s2 = 0;
        for (r3 = 0; r3 < t3.length; ++r3) {
          if (t3.charAt(r3) == h)
            break;
          var a2 = f.indexOf(t3.charAt(r3));
          if (a2 < 0)
            continue;
          if (i3 == 0) {
            e4 += n(a2 >> 2);
            s2 = 3 & a2;
            i3 = 1;
          } else if (i3 == 1) {
            e4 += n(s2 << 2 | a2 >> 4);
            s2 = 15 & a2;
            i3 = 2;
          } else if (i3 == 2) {
            e4 += n(s2);
            e4 += n(a2 >> 2);
            s2 = 3 & a2;
            i3 = 3;
          } else {
            e4 += n(s2 << 2 | a2 >> 4);
            e4 += n(15 & a2);
            i3 = 0;
          }
        }
        if (i3 == 1)
          e4 += n(s2 << 2);
        return e4;
      }
      var g;
      var y = { decode: function(t3) {
        var e4;
        if (g === void 0) {
          var r3 = "0123456789ABCDEF";
          var i3 = " \f\n\r	\xA0\u2028\u2029";
          g = {};
          for (e4 = 0; e4 < 16; ++e4)
            g[r3.charAt(e4)] = e4;
          r3 = r3.toLowerCase();
          for (e4 = 10; e4 < 16; ++e4)
            g[r3.charAt(e4)] = e4;
          for (e4 = 0; e4 < i3.length; ++e4)
            g[i3.charAt(e4)] = -1;
        }
        var n2 = [];
        var s2 = 0;
        var a2 = 0;
        for (e4 = 0; e4 < t3.length; ++e4) {
          var o3 = t3.charAt(e4);
          if (o3 == "=")
            break;
          o3 = g[o3];
          if (o3 == -1)
            continue;
          if (o3 === void 0)
            throw new Error("Illegal character at offset " + e4);
          s2 |= o3;
          if (++a2 >= 2) {
            n2[n2.length] = s2;
            s2 = 0;
            a2 = 0;
          } else
            s2 <<= 4;
        }
        if (a2)
          throw new Error("Hex encoding incomplete: 4 bits missing");
        return n2;
      } };
      var m;
      var w = { decode: function(t3) {
        var e4;
        if (m === void 0) {
          var r3 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
          var i3 = "= \f\n\r	\xA0\u2028\u2029";
          m = /* @__PURE__ */ Object.create(null);
          for (e4 = 0; e4 < 64; ++e4)
            m[r3.charAt(e4)] = e4;
          m["-"] = 62;
          m["_"] = 63;
          for (e4 = 0; e4 < i3.length; ++e4)
            m[i3.charAt(e4)] = -1;
        }
        var n2 = [];
        var s2 = 0;
        var a2 = 0;
        for (e4 = 0; e4 < t3.length; ++e4) {
          var o3 = t3.charAt(e4);
          if (o3 == "=")
            break;
          o3 = m[o3];
          if (o3 == -1)
            continue;
          if (o3 === void 0)
            throw new Error("Illegal character at offset " + e4);
          s2 |= o3;
          if (++a2 >= 4) {
            n2[n2.length] = s2 >> 16;
            n2[n2.length] = s2 >> 8 & 255;
            n2[n2.length] = 255 & s2;
            s2 = 0;
            a2 = 0;
          } else
            s2 <<= 6;
        }
        switch (a2) {
          case 1:
            throw new Error("Base64 encoding incomplete: at least 2 bits missing");
          case 2:
            n2[n2.length] = s2 >> 10;
            break;
          case 3:
            n2[n2.length] = s2 >> 16;
            n2[n2.length] = s2 >> 8 & 255;
            break;
        }
        return n2;
      }, re: /-----BEGIN [^-]+-----([A-Za-z0-9+\/=\s]+)-----END [^-]+-----|begin-base64[^\n]+\n([A-Za-z0-9+\/=\s]+)====/, unarmor: function(t3) {
        var e4 = w.re.exec(t3);
        if (e4)
          if (e4[1])
            t3 = e4[1];
          else if (e4[2])
            t3 = e4[2];
          else
            throw new Error("RegExp out of sync");
        return w.decode(t3);
      } };
      var S = 1e13;
      var _ = function() {
        function t3(t4) {
          this.buf = [+t4 || 0];
        }
        t3.prototype.mulAdd = function(t4, e4) {
          var r3 = this.buf;
          var i3 = r3.length;
          var n2;
          var s2;
          for (n2 = 0; n2 < i3; ++n2) {
            s2 = r3[n2] * t4 + e4;
            if (s2 < S)
              e4 = 0;
            else {
              e4 = 0 | s2 / S;
              s2 -= e4 * S;
            }
            r3[n2] = s2;
          }
          if (e4 > 0)
            r3[n2] = e4;
        };
        t3.prototype.sub = function(t4) {
          var e4 = this.buf;
          var r3 = e4.length;
          var i3;
          var n2;
          for (i3 = 0; i3 < r3; ++i3) {
            n2 = e4[i3] - t4;
            if (n2 < 0) {
              n2 += S;
              t4 = 1;
            } else
              t4 = 0;
            e4[i3] = n2;
          }
          while (e4[e4.length - 1] === 0)
            e4.pop();
        };
        t3.prototype.toString = function(t4) {
          if ((t4 || 10) != 10)
            throw new Error("only base 10 is supported");
          var e4 = this.buf;
          var r3 = e4[e4.length - 1].toString();
          for (var i3 = e4.length - 2; i3 >= 0; --i3)
            r3 += (S + e4[i3]).toString().substring(1);
          return r3;
        };
        t3.prototype.valueOf = function() {
          var t4 = this.buf;
          var e4 = 0;
          for (var r3 = t4.length - 1; r3 >= 0; --r3)
            e4 = e4 * S + t4[r3];
          return e4;
        };
        t3.prototype.simplify = function() {
          var t4 = this.buf;
          return t4.length == 1 ? t4[0] : this;
        };
        return t3;
      }();
      var b = "\u2026";
      var E2 = /^(\d\d)(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([01]\d|2[0-3])(?:([0-5]\d)(?:([0-5]\d)(?:[.,](\d{1,3}))?)?)?(Z|[-+](?:[0]\d|1[0-2])([0-5]\d)?)?$/;
      var D = /^(\d\d\d\d)(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([01]\d|2[0-3])(?:([0-5]\d)(?:([0-5]\d)(?:[.,](\d{1,3}))?)?)?(Z|[-+](?:[0]\d|1[0-2])([0-5]\d)?)?$/;
      function M(t3, e4) {
        if (t3.length > e4)
          t3 = t3.substring(0, e4) + b;
        return t3;
      }
      var T = function() {
        function t3(e4, r3) {
          this.hexDigits = "0123456789ABCDEF";
          if (e4 instanceof t3) {
            this.enc = e4.enc;
            this.pos = e4.pos;
          } else {
            this.enc = e4;
            this.pos = r3;
          }
        }
        t3.prototype.get = function(t4) {
          if (t4 === void 0)
            t4 = this.pos++;
          if (t4 >= this.enc.length)
            throw new Error("Requesting byte offset " + t4 + " on a stream of length " + this.enc.length);
          return typeof this.enc === "string" ? this.enc.charCodeAt(t4) : this.enc[t4];
        };
        t3.prototype.hexByte = function(t4) {
          return this.hexDigits.charAt(t4 >> 4 & 15) + this.hexDigits.charAt(15 & t4);
        };
        t3.prototype.hexDump = function(t4, e4, r3) {
          var i3 = "";
          for (var n2 = t4; n2 < e4; ++n2) {
            i3 += this.hexByte(this.get(n2));
            if (r3 !== true)
              switch (15 & n2) {
                case 7:
                  i3 += "  ";
                  break;
                case 15:
                  i3 += "\n";
                  break;
                default:
                  i3 += " ";
              }
          }
          return i3;
        };
        t3.prototype.isASCII = function(t4, e4) {
          for (var r3 = t4; r3 < e4; ++r3) {
            var i3 = this.get(r3);
            if (i3 < 32 || i3 > 176)
              return false;
          }
          return true;
        };
        t3.prototype.parseStringISO = function(t4, e4) {
          var r3 = "";
          for (var i3 = t4; i3 < e4; ++i3)
            r3 += String.fromCharCode(this.get(i3));
          return r3;
        };
        t3.prototype.parseStringUTF = function(t4, e4) {
          var r3 = "";
          for (var i3 = t4; i3 < e4; ) {
            var n2 = this.get(i3++);
            if (n2 < 128)
              r3 += String.fromCharCode(n2);
            else if (n2 > 191 && n2 < 224)
              r3 += String.fromCharCode((31 & n2) << 6 | 63 & this.get(i3++));
            else
              r3 += String.fromCharCode((15 & n2) << 12 | (63 & this.get(i3++)) << 6 | 63 & this.get(i3++));
          }
          return r3;
        };
        t3.prototype.parseStringBMP = function(t4, e4) {
          var r3 = "";
          var i3;
          var n2;
          for (var s2 = t4; s2 < e4; ) {
            i3 = this.get(s2++);
            n2 = this.get(s2++);
            r3 += String.fromCharCode(i3 << 8 | n2);
          }
          return r3;
        };
        t3.prototype.parseTime = function(t4, e4, r3) {
          var i3 = this.parseStringISO(t4, e4);
          var n2 = (r3 ? E2 : D).exec(i3);
          if (!n2)
            return "Unrecognized time: " + i3;
          if (r3) {
            n2[1] = +n2[1];
            n2[1] += +n2[1] < 70 ? 2e3 : 1900;
          }
          i3 = n2[1] + "-" + n2[2] + "-" + n2[3] + " " + n2[4];
          if (n2[5]) {
            i3 += ":" + n2[5];
            if (n2[6]) {
              i3 += ":" + n2[6];
              if (n2[7])
                i3 += "." + n2[7];
            }
          }
          if (n2[8]) {
            i3 += " UTC";
            if (n2[8] != "Z") {
              i3 += n2[8];
              if (n2[9])
                i3 += ":" + n2[9];
            }
          }
          return i3;
        };
        t3.prototype.parseInteger = function(t4, e4) {
          var r3 = this.get(t4);
          var i3 = r3 > 127;
          var n2 = i3 ? 255 : 0;
          var s2;
          var a2 = "";
          while (r3 == n2 && ++t4 < e4)
            r3 = this.get(t4);
          s2 = e4 - t4;
          if (s2 === 0)
            return i3 ? -1 : 0;
          if (s2 > 4) {
            a2 = r3;
            s2 <<= 3;
            while ((128 & (+a2 ^ n2)) == 0) {
              a2 = +a2 << 1;
              --s2;
            }
            a2 = "(" + s2 + " bit)\n";
          }
          if (i3)
            r3 -= 256;
          var o3 = new _(r3);
          for (var u2 = t4 + 1; u2 < e4; ++u2)
            o3.mulAdd(256, this.get(u2));
          return a2 + o3.toString();
        };
        t3.prototype.parseBitString = function(t4, e4, r3) {
          var i3 = this.get(t4);
          var n2 = (e4 - t4 - 1 << 3) - i3;
          var s2 = "(" + n2 + " bit)\n";
          var a2 = "";
          for (var o3 = t4 + 1; o3 < e4; ++o3) {
            var u2 = this.get(o3);
            var c2 = o3 == e4 - 1 ? i3 : 0;
            for (var l2 = 7; l2 >= c2; --l2)
              a2 += u2 >> l2 & 1 ? "1" : "0";
            if (a2.length > r3)
              return s2 + M(a2, r3);
          }
          return s2 + a2;
        };
        t3.prototype.parseOctetString = function(t4, e4, r3) {
          if (this.isASCII(t4, e4))
            return M(this.parseStringISO(t4, e4), r3);
          var i3 = e4 - t4;
          var n2 = "(" + i3 + " byte)\n";
          r3 /= 2;
          if (i3 > r3)
            e4 = t4 + r3;
          for (var s2 = t4; s2 < e4; ++s2)
            n2 += this.hexByte(this.get(s2));
          if (i3 > r3)
            n2 += b;
          return n2;
        };
        t3.prototype.parseOID = function(t4, e4, r3) {
          var i3 = "";
          var n2 = new _();
          var s2 = 0;
          for (var a2 = t4; a2 < e4; ++a2) {
            var o3 = this.get(a2);
            n2.mulAdd(128, 127 & o3);
            s2 += 7;
            if (!(128 & o3)) {
              if (i3 === "") {
                n2 = n2.simplify();
                if (n2 instanceof _) {
                  n2.sub(80);
                  i3 = "2." + n2.toString();
                } else {
                  var u2 = n2 < 80 ? n2 < 40 ? 0 : 1 : 2;
                  i3 = u2 + "." + (n2 - 40 * u2);
                }
              } else
                i3 += "." + n2.toString();
              if (i3.length > r3)
                return M(i3, r3);
              n2 = new _();
              s2 = 0;
            }
          }
          if (s2 > 0)
            i3 += ".incomplete";
          return i3;
        };
        return t3;
      }();
      var I = function() {
        function t3(t4, e4, r3, i3, n2) {
          if (!(i3 instanceof A))
            throw new Error("Invalid tag value.");
          this.stream = t4;
          this.header = e4;
          this.length = r3;
          this.tag = i3;
          this.sub = n2;
        }
        t3.prototype.typeName = function() {
          switch (this.tag.tagClass) {
            case 0:
              switch (this.tag.tagNumber) {
                case 0:
                  return "EOC";
                case 1:
                  return "BOOLEAN";
                case 2:
                  return "INTEGER";
                case 3:
                  return "BIT_STRING";
                case 4:
                  return "OCTET_STRING";
                case 5:
                  return "NULL";
                case 6:
                  return "OBJECT_IDENTIFIER";
                case 7:
                  return "ObjectDescriptor";
                case 8:
                  return "EXTERNAL";
                case 9:
                  return "REAL";
                case 10:
                  return "ENUMERATED";
                case 11:
                  return "EMBEDDED_PDV";
                case 12:
                  return "UTF8String";
                case 16:
                  return "SEQUENCE";
                case 17:
                  return "SET";
                case 18:
                  return "NumericString";
                case 19:
                  return "PrintableString";
                case 20:
                  return "TeletexString";
                case 21:
                  return "VideotexString";
                case 22:
                  return "IA5String";
                case 23:
                  return "UTCTime";
                case 24:
                  return "GeneralizedTime";
                case 25:
                  return "GraphicString";
                case 26:
                  return "VisibleString";
                case 27:
                  return "GeneralString";
                case 28:
                  return "UniversalString";
                case 30:
                  return "BMPString";
              }
              return "Universal_" + this.tag.tagNumber.toString();
            case 1:
              return "Application_" + this.tag.tagNumber.toString();
            case 2:
              return "[" + this.tag.tagNumber.toString() + "]";
            case 3:
              return "Private_" + this.tag.tagNumber.toString();
          }
        };
        t3.prototype.content = function(t4) {
          if (this.tag === void 0)
            return null;
          if (t4 === void 0)
            t4 = 1 / 0;
          var e4 = this.posContent();
          var r3 = Math.abs(this.length);
          if (!this.tag.isUniversal()) {
            if (this.sub !== null)
              return "(" + this.sub.length + " elem)";
            return this.stream.parseOctetString(e4, e4 + r3, t4);
          }
          switch (this.tag.tagNumber) {
            case 1:
              return this.stream.get(e4) === 0 ? "false" : "true";
            case 2:
              return this.stream.parseInteger(e4, e4 + r3);
            case 3:
              return this.sub ? "(" + this.sub.length + " elem)" : this.stream.parseBitString(e4, e4 + r3, t4);
            case 4:
              return this.sub ? "(" + this.sub.length + " elem)" : this.stream.parseOctetString(e4, e4 + r3, t4);
            case 6:
              return this.stream.parseOID(e4, e4 + r3, t4);
            case 16:
            case 17:
              if (this.sub !== null)
                return "(" + this.sub.length + " elem)";
              else
                return "(no elem)";
            case 12:
              return M(this.stream.parseStringUTF(e4, e4 + r3), t4);
            case 18:
            case 19:
            case 20:
            case 21:
            case 22:
            case 26:
              return M(this.stream.parseStringISO(e4, e4 + r3), t4);
            case 30:
              return M(this.stream.parseStringBMP(e4, e4 + r3), t4);
            case 23:
            case 24:
              return this.stream.parseTime(e4, e4 + r3, this.tag.tagNumber == 23);
          }
          return null;
        };
        t3.prototype.toString = function() {
          return this.typeName() + "@" + this.stream.pos + "[header:" + this.header + ",length:" + this.length + ",sub:" + (this.sub === null ? "null" : this.sub.length) + "]";
        };
        t3.prototype.toPrettyString = function(t4) {
          if (t4 === void 0)
            t4 = "";
          var e4 = t4 + this.typeName() + " @" + this.stream.pos;
          if (this.length >= 0)
            e4 += "+";
          e4 += this.length;
          if (this.tag.tagConstructed)
            e4 += " (constructed)";
          else if (this.tag.isUniversal() && (this.tag.tagNumber == 3 || this.tag.tagNumber == 4) && this.sub !== null)
            e4 += " (encapsulates)";
          e4 += "\n";
          if (this.sub !== null) {
            t4 += "  ";
            for (var r3 = 0, i3 = this.sub.length; r3 < i3; ++r3)
              e4 += this.sub[r3].toPrettyString(t4);
          }
          return e4;
        };
        t3.prototype.posStart = function() {
          return this.stream.pos;
        };
        t3.prototype.posContent = function() {
          return this.stream.pos + this.header;
        };
        t3.prototype.posEnd = function() {
          return this.stream.pos + this.header + Math.abs(this.length);
        };
        t3.prototype.toHexString = function() {
          return this.stream.hexDump(this.posStart(), this.posEnd(), true);
        };
        t3.decodeLength = function(t4) {
          var e4 = t4.get();
          var r3 = 127 & e4;
          if (r3 == e4)
            return r3;
          if (r3 > 6)
            throw new Error("Length over 48 bits not supported at position " + (t4.pos - 1));
          if (r3 === 0)
            return null;
          e4 = 0;
          for (var i3 = 0; i3 < r3; ++i3)
            e4 = 256 * e4 + t4.get();
          return e4;
        };
        t3.prototype.getHexStringValue = function() {
          var t4 = this.toHexString();
          var e4 = 2 * this.header;
          var r3 = 2 * this.length;
          return t4.substr(e4, r3);
        };
        t3.decode = function(e4) {
          var r3;
          if (!(e4 instanceof T))
            r3 = new T(e4, 0);
          else
            r3 = e4;
          var i3 = new T(r3);
          var n2 = new A(r3);
          var s2 = t3.decodeLength(r3);
          var a2 = r3.pos;
          var o3 = a2 - i3.pos;
          var u2 = null;
          var c2 = function() {
            var e5 = [];
            if (s2 !== null) {
              var i4 = a2 + s2;
              while (r3.pos < i4)
                e5[e5.length] = t3.decode(r3);
              if (r3.pos != i4)
                throw new Error("Content size is not correct for container starting at offset " + a2);
            } else
              try {
                for (; ; ) {
                  var n3 = t3.decode(r3);
                  if (n3.tag.isEOC())
                    break;
                  e5[e5.length] = n3;
                }
                s2 = a2 - r3.pos;
              } catch (t4) {
                throw new Error("Exception while decoding undefined length content: " + t4);
              }
            return e5;
          };
          if (n2.tagConstructed)
            u2 = c2();
          else if (n2.isUniversal() && (n2.tagNumber == 3 || n2.tagNumber == 4))
            try {
              if (n2.tagNumber == 3) {
                if (r3.get() != 0)
                  throw new Error("BIT STRINGs with unused bits cannot encapsulate.");
              }
              u2 = c2();
              for (var l2 = 0; l2 < u2.length; ++l2)
                if (u2[l2].tag.isEOC())
                  throw new Error("EOC is not supposed to be actual content.");
            } catch (t4) {
              u2 = null;
            }
          if (u2 === null) {
            if (s2 === null)
              throw new Error("We can't skip over an invalid tag with undefined length at offset " + a2);
            r3.pos = a2 + Math.abs(s2);
          }
          return new t3(i3, o3, s2, n2, u2);
        };
        return t3;
      }();
      var A = function() {
        function t3(t4) {
          var e4 = t4.get();
          this.tagClass = e4 >> 6;
          this.tagConstructed = (32 & e4) !== 0;
          this.tagNumber = 31 & e4;
          if (this.tagNumber == 31) {
            var r3 = new _();
            do {
              e4 = t4.get();
              r3.mulAdd(128, 127 & e4);
            } while (128 & e4);
            this.tagNumber = r3.simplify();
          }
        }
        t3.prototype.isUniversal = function() {
          return this.tagClass === 0;
        };
        t3.prototype.isEOC = function() {
          return this.tagClass === 0 && this.tagNumber === 0;
        };
        return t3;
      }();
      var x;
      var R = 244837814094590;
      var B = (16777215 & R) == 15715070;
      var O = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997];
      var k = (1 << 26) / O[O.length - 1];
      var C = function() {
        function t3(t4, e4, r3) {
          if (t4 != null)
            if (typeof t4 == "number")
              this.fromNumber(t4, e4, r3);
            else if (e4 == null && typeof t4 != "string")
              this.fromString(t4, 256);
            else
              this.fromString(t4, e4);
        }
        t3.prototype.toString = function(t4) {
          if (this.s < 0)
            return "-" + this.negate().toString(t4);
          var e4;
          if (t4 == 16)
            e4 = 4;
          else if (t4 == 8)
            e4 = 3;
          else if (t4 == 2)
            e4 = 1;
          else if (t4 == 32)
            e4 = 5;
          else if (t4 == 4)
            e4 = 2;
          else
            return this.toRadix(t4);
          var r3 = (1 << e4) - 1;
          var i3;
          var s2 = false;
          var a2 = "";
          var o3 = this.t;
          var u2 = this.DB - o3 * this.DB % e4;
          if (o3-- > 0) {
            if (u2 < this.DB && (i3 = this[o3] >> u2) > 0) {
              s2 = true;
              a2 = n(i3);
            }
            while (o3 >= 0) {
              if (u2 < e4) {
                i3 = (this[o3] & (1 << u2) - 1) << e4 - u2;
                i3 |= this[--o3] >> (u2 += this.DB - e4);
              } else {
                i3 = this[o3] >> (u2 -= e4) & r3;
                if (u2 <= 0) {
                  u2 += this.DB;
                  --o3;
                }
              }
              if (i3 > 0)
                s2 = true;
              if (s2)
                a2 += n(i3);
            }
          }
          return s2 ? a2 : "0";
        };
        t3.prototype.negate = function() {
          var e4 = H();
          t3.ZERO.subTo(this, e4);
          return e4;
        };
        t3.prototype.abs = function() {
          return this.s < 0 ? this.negate() : this;
        };
        t3.prototype.compareTo = function(t4) {
          var e4 = this.s - t4.s;
          if (e4 != 0)
            return e4;
          var r3 = this.t;
          e4 = r3 - t4.t;
          if (e4 != 0)
            return this.s < 0 ? -e4 : e4;
          while (--r3 >= 0)
            if ((e4 = this[r3] - t4[r3]) != 0)
              return e4;
          return 0;
        };
        t3.prototype.bitLength = function() {
          if (this.t <= 0)
            return 0;
          return this.DB * (this.t - 1) + W(this[this.t - 1] ^ this.s & this.DM);
        };
        t3.prototype.mod = function(e4) {
          var r3 = H();
          this.abs().divRemTo(e4, null, r3);
          if (this.s < 0 && r3.compareTo(t3.ZERO) > 0)
            e4.subTo(r3, r3);
          return r3;
        };
        t3.prototype.modPowInt = function(t4, e4) {
          var r3;
          if (t4 < 256 || e4.isEven())
            r3 = new P(e4);
          else
            r3 = new V(e4);
          return this.exp(t4, r3);
        };
        t3.prototype.clone = function() {
          var t4 = H();
          this.copyTo(t4);
          return t4;
        };
        t3.prototype.intValue = function() {
          if (this.s < 0) {
            if (this.t == 1)
              return this[0] - this.DV;
            else if (this.t == 0)
              return -1;
          } else if (this.t == 1)
            return this[0];
          else if (this.t == 0)
            return 0;
          return (this[1] & (1 << 32 - this.DB) - 1) << this.DB | this[0];
        };
        t3.prototype.byteValue = function() {
          return this.t == 0 ? this.s : this[0] << 24 >> 24;
        };
        t3.prototype.shortValue = function() {
          return this.t == 0 ? this.s : this[0] << 16 >> 16;
        };
        t3.prototype.signum = function() {
          if (this.s < 0)
            return -1;
          else if (this.t <= 0 || this.t == 1 && this[0] <= 0)
            return 0;
          else
            return 1;
        };
        t3.prototype.toByteArray = function() {
          var t4 = this.t;
          var e4 = [];
          e4[0] = this.s;
          var r3 = this.DB - t4 * this.DB % 8;
          var i3;
          var n2 = 0;
          if (t4-- > 0) {
            if (r3 < this.DB && (i3 = this[t4] >> r3) != (this.s & this.DM) >> r3)
              e4[n2++] = i3 | this.s << this.DB - r3;
            while (t4 >= 0) {
              if (r3 < 8) {
                i3 = (this[t4] & (1 << r3) - 1) << 8 - r3;
                i3 |= this[--t4] >> (r3 += this.DB - 8);
              } else {
                i3 = this[t4] >> (r3 -= 8) & 255;
                if (r3 <= 0) {
                  r3 += this.DB;
                  --t4;
                }
              }
              if ((128 & i3) != 0)
                i3 |= -256;
              if (n2 == 0 && (128 & this.s) != (128 & i3))
                ++n2;
              if (n2 > 0 || i3 != this.s)
                e4[n2++] = i3;
            }
          }
          return e4;
        };
        t3.prototype.equals = function(t4) {
          return this.compareTo(t4) == 0;
        };
        t3.prototype.min = function(t4) {
          return this.compareTo(t4) < 0 ? this : t4;
        };
        t3.prototype.max = function(t4) {
          return this.compareTo(t4) > 0 ? this : t4;
        };
        t3.prototype.and = function(t4) {
          var e4 = H();
          this.bitwiseTo(t4, s, e4);
          return e4;
        };
        t3.prototype.or = function(t4) {
          var e4 = H();
          this.bitwiseTo(t4, a, e4);
          return e4;
        };
        t3.prototype.xor = function(t4) {
          var e4 = H();
          this.bitwiseTo(t4, o2, e4);
          return e4;
        };
        t3.prototype.andNot = function(t4) {
          var e4 = H();
          this.bitwiseTo(t4, u, e4);
          return e4;
        };
        t3.prototype.not = function() {
          var t4 = H();
          for (var e4 = 0; e4 < this.t; ++e4)
            t4[e4] = this.DM & ~this[e4];
          t4.t = this.t;
          t4.s = ~this.s;
          return t4;
        };
        t3.prototype.shiftLeft = function(t4) {
          var e4 = H();
          if (t4 < 0)
            this.rShiftTo(-t4, e4);
          else
            this.lShiftTo(t4, e4);
          return e4;
        };
        t3.prototype.shiftRight = function(t4) {
          var e4 = H();
          if (t4 < 0)
            this.lShiftTo(-t4, e4);
          else
            this.rShiftTo(t4, e4);
          return e4;
        };
        t3.prototype.getLowestSetBit = function() {
          for (var t4 = 0; t4 < this.t; ++t4)
            if (this[t4] != 0)
              return t4 * this.DB + c(this[t4]);
          if (this.s < 0)
            return this.t * this.DB;
          return -1;
        };
        t3.prototype.bitCount = function() {
          var t4 = 0;
          var e4 = this.s & this.DM;
          for (var r3 = 0; r3 < this.t; ++r3)
            t4 += l(this[r3] ^ e4);
          return t4;
        };
        t3.prototype.testBit = function(t4) {
          var e4 = Math.floor(t4 / this.DB);
          if (e4 >= this.t)
            return this.s != 0;
          return (this[e4] & 1 << t4 % this.DB) != 0;
        };
        t3.prototype.setBit = function(t4) {
          return this.changeBit(t4, a);
        };
        t3.prototype.clearBit = function(t4) {
          return this.changeBit(t4, u);
        };
        t3.prototype.flipBit = function(t4) {
          return this.changeBit(t4, o2);
        };
        t3.prototype.add = function(t4) {
          var e4 = H();
          this.addTo(t4, e4);
          return e4;
        };
        t3.prototype.subtract = function(t4) {
          var e4 = H();
          this.subTo(t4, e4);
          return e4;
        };
        t3.prototype.multiply = function(t4) {
          var e4 = H();
          this.multiplyTo(t4, e4);
          return e4;
        };
        t3.prototype.divide = function(t4) {
          var e4 = H();
          this.divRemTo(t4, e4, null);
          return e4;
        };
        t3.prototype.remainder = function(t4) {
          var e4 = H();
          this.divRemTo(t4, null, e4);
          return e4;
        };
        t3.prototype.divideAndRemainder = function(t4) {
          var e4 = H();
          var r3 = H();
          this.divRemTo(t4, e4, r3);
          return [e4, r3];
        };
        t3.prototype.modPow = function(t4, e4) {
          var r3 = t4.bitLength();
          var i3;
          var n2 = Y(1);
          var s2;
          if (r3 <= 0)
            return n2;
          else if (r3 < 18)
            i3 = 1;
          else if (r3 < 48)
            i3 = 3;
          else if (r3 < 144)
            i3 = 4;
          else if (r3 < 768)
            i3 = 5;
          else
            i3 = 6;
          if (r3 < 8)
            s2 = new P(e4);
          else if (e4.isEven())
            s2 = new L(e4);
          else
            s2 = new V(e4);
          var a2 = [];
          var o3 = 3;
          var u2 = i3 - 1;
          var c2 = (1 << i3) - 1;
          a2[1] = s2.convert(this);
          if (i3 > 1) {
            var l2 = H();
            s2.sqrTo(a2[1], l2);
            while (o3 <= c2) {
              a2[o3] = H();
              s2.mulTo(l2, a2[o3 - 2], a2[o3]);
              o3 += 2;
            }
          }
          var f2 = t4.t - 1;
          var h2;
          var d2 = true;
          var p2 = H();
          var v;
          r3 = W(t4[f2]) - 1;
          while (f2 >= 0) {
            if (r3 >= u2)
              h2 = t4[f2] >> r3 - u2 & c2;
            else {
              h2 = (t4[f2] & (1 << r3 + 1) - 1) << u2 - r3;
              if (f2 > 0)
                h2 |= t4[f2 - 1] >> this.DB + r3 - u2;
            }
            o3 = i3;
            while ((1 & h2) == 0) {
              h2 >>= 1;
              --o3;
            }
            if ((r3 -= o3) < 0) {
              r3 += this.DB;
              --f2;
            }
            if (d2) {
              a2[h2].copyTo(n2);
              d2 = false;
            } else {
              while (o3 > 1) {
                s2.sqrTo(n2, p2);
                s2.sqrTo(p2, n2);
                o3 -= 2;
              }
              if (o3 > 0)
                s2.sqrTo(n2, p2);
              else {
                v = n2;
                n2 = p2;
                p2 = v;
              }
              s2.mulTo(p2, a2[h2], n2);
            }
            while (f2 >= 0 && (t4[f2] & 1 << r3) == 0) {
              s2.sqrTo(n2, p2);
              v = n2;
              n2 = p2;
              p2 = v;
              if (--r3 < 0) {
                r3 = this.DB - 1;
                --f2;
              }
            }
          }
          return s2.revert(n2);
        };
        t3.prototype.modInverse = function(e4) {
          var r3 = e4.isEven();
          if (this.isEven() && r3 || e4.signum() == 0)
            return t3.ZERO;
          var i3 = e4.clone();
          var n2 = this.clone();
          var s2 = Y(1);
          var a2 = Y(0);
          var o3 = Y(0);
          var u2 = Y(1);
          while (i3.signum() != 0) {
            while (i3.isEven()) {
              i3.rShiftTo(1, i3);
              if (r3) {
                if (!s2.isEven() || !a2.isEven()) {
                  s2.addTo(this, s2);
                  a2.subTo(e4, a2);
                }
                s2.rShiftTo(1, s2);
              } else if (!a2.isEven())
                a2.subTo(e4, a2);
              a2.rShiftTo(1, a2);
            }
            while (n2.isEven()) {
              n2.rShiftTo(1, n2);
              if (r3) {
                if (!o3.isEven() || !u2.isEven()) {
                  o3.addTo(this, o3);
                  u2.subTo(e4, u2);
                }
                o3.rShiftTo(1, o3);
              } else if (!u2.isEven())
                u2.subTo(e4, u2);
              u2.rShiftTo(1, u2);
            }
            if (i3.compareTo(n2) >= 0) {
              i3.subTo(n2, i3);
              if (r3)
                s2.subTo(o3, s2);
              a2.subTo(u2, a2);
            } else {
              n2.subTo(i3, n2);
              if (r3)
                o3.subTo(s2, o3);
              u2.subTo(a2, u2);
            }
          }
          if (n2.compareTo(t3.ONE) != 0)
            return t3.ZERO;
          if (u2.compareTo(e4) >= 0)
            return u2.subtract(e4);
          if (u2.signum() < 0)
            u2.addTo(e4, u2);
          else
            return u2;
          if (u2.signum() < 0)
            return u2.add(e4);
          else
            return u2;
        };
        t3.prototype.pow = function(t4) {
          return this.exp(t4, new N());
        };
        t3.prototype.gcd = function(t4) {
          var e4 = this.s < 0 ? this.negate() : this.clone();
          var r3 = t4.s < 0 ? t4.negate() : t4.clone();
          if (e4.compareTo(r3) < 0) {
            var i3 = e4;
            e4 = r3;
            r3 = i3;
          }
          var n2 = e4.getLowestSetBit();
          var s2 = r3.getLowestSetBit();
          if (s2 < 0)
            return e4;
          if (n2 < s2)
            s2 = n2;
          if (s2 > 0) {
            e4.rShiftTo(s2, e4);
            r3.rShiftTo(s2, r3);
          }
          while (e4.signum() > 0) {
            if ((n2 = e4.getLowestSetBit()) > 0)
              e4.rShiftTo(n2, e4);
            if ((n2 = r3.getLowestSetBit()) > 0)
              r3.rShiftTo(n2, r3);
            if (e4.compareTo(r3) >= 0) {
              e4.subTo(r3, e4);
              e4.rShiftTo(1, e4);
            } else {
              r3.subTo(e4, r3);
              r3.rShiftTo(1, r3);
            }
          }
          if (s2 > 0)
            r3.lShiftTo(s2, r3);
          return r3;
        };
        t3.prototype.isProbablePrime = function(t4) {
          var e4;
          var r3 = this.abs();
          if (r3.t == 1 && r3[0] <= O[O.length - 1]) {
            for (e4 = 0; e4 < O.length; ++e4)
              if (r3[0] == O[e4])
                return true;
            return false;
          }
          if (r3.isEven())
            return false;
          e4 = 1;
          while (e4 < O.length) {
            var i3 = O[e4];
            var n2 = e4 + 1;
            while (n2 < O.length && i3 < k)
              i3 *= O[n2++];
            i3 = r3.modInt(i3);
            while (e4 < n2)
              if (i3 % O[e4++] == 0)
                return false;
          }
          return r3.millerRabin(t4);
        };
        t3.prototype.copyTo = function(t4) {
          for (var e4 = this.t - 1; e4 >= 0; --e4)
            t4[e4] = this[e4];
          t4.t = this.t;
          t4.s = this.s;
        };
        t3.prototype.fromInt = function(t4) {
          this.t = 1;
          this.s = t4 < 0 ? -1 : 0;
          if (t4 > 0)
            this[0] = t4;
          else if (t4 < -1)
            this[0] = t4 + this.DV;
          else
            this.t = 0;
        };
        t3.prototype.fromString = function(e4, r3) {
          var i3;
          if (r3 == 16)
            i3 = 4;
          else if (r3 == 8)
            i3 = 3;
          else if (r3 == 256)
            i3 = 8;
          else if (r3 == 2)
            i3 = 1;
          else if (r3 == 32)
            i3 = 5;
          else if (r3 == 4)
            i3 = 2;
          else {
            this.fromRadix(e4, r3);
            return;
          }
          this.t = 0;
          this.s = 0;
          var n2 = e4.length;
          var s2 = false;
          var a2 = 0;
          while (--n2 >= 0) {
            var o3 = i3 == 8 ? 255 & +e4[n2] : G(e4, n2);
            if (o3 < 0) {
              if (e4.charAt(n2) == "-")
                s2 = true;
              continue;
            }
            s2 = false;
            if (a2 == 0)
              this[this.t++] = o3;
            else if (a2 + i3 > this.DB) {
              this[this.t - 1] |= (o3 & (1 << this.DB - a2) - 1) << a2;
              this[this.t++] = o3 >> this.DB - a2;
            } else
              this[this.t - 1] |= o3 << a2;
            a2 += i3;
            if (a2 >= this.DB)
              a2 -= this.DB;
          }
          if (i3 == 8 && (128 & +e4[0]) != 0) {
            this.s = -1;
            if (a2 > 0)
              this[this.t - 1] |= (1 << this.DB - a2) - 1 << a2;
          }
          this.clamp();
          if (s2)
            t3.ZERO.subTo(this, this);
        };
        t3.prototype.clamp = function() {
          var t4 = this.s & this.DM;
          while (this.t > 0 && this[this.t - 1] == t4)
            --this.t;
        };
        t3.prototype.dlShiftTo = function(t4, e4) {
          var r3;
          for (r3 = this.t - 1; r3 >= 0; --r3)
            e4[r3 + t4] = this[r3];
          for (r3 = t4 - 1; r3 >= 0; --r3)
            e4[r3] = 0;
          e4.t = this.t + t4;
          e4.s = this.s;
        };
        t3.prototype.drShiftTo = function(t4, e4) {
          for (var r3 = t4; r3 < this.t; ++r3)
            e4[r3 - t4] = this[r3];
          e4.t = Math.max(this.t - t4, 0);
          e4.s = this.s;
        };
        t3.prototype.lShiftTo = function(t4, e4) {
          var r3 = t4 % this.DB;
          var i3 = this.DB - r3;
          var n2 = (1 << i3) - 1;
          var s2 = Math.floor(t4 / this.DB);
          var a2 = this.s << r3 & this.DM;
          for (var o3 = this.t - 1; o3 >= 0; --o3) {
            e4[o3 + s2 + 1] = this[o3] >> i3 | a2;
            a2 = (this[o3] & n2) << r3;
          }
          for (var o3 = s2 - 1; o3 >= 0; --o3)
            e4[o3] = 0;
          e4[s2] = a2;
          e4.t = this.t + s2 + 1;
          e4.s = this.s;
          e4.clamp();
        };
        t3.prototype.rShiftTo = function(t4, e4) {
          e4.s = this.s;
          var r3 = Math.floor(t4 / this.DB);
          if (r3 >= this.t) {
            e4.t = 0;
            return;
          }
          var i3 = t4 % this.DB;
          var n2 = this.DB - i3;
          var s2 = (1 << i3) - 1;
          e4[0] = this[r3] >> i3;
          for (var a2 = r3 + 1; a2 < this.t; ++a2) {
            e4[a2 - r3 - 1] |= (this[a2] & s2) << n2;
            e4[a2 - r3] = this[a2] >> i3;
          }
          if (i3 > 0)
            e4[this.t - r3 - 1] |= (this.s & s2) << n2;
          e4.t = this.t - r3;
          e4.clamp();
        };
        t3.prototype.subTo = function(t4, e4) {
          var r3 = 0;
          var i3 = 0;
          var n2 = Math.min(t4.t, this.t);
          while (r3 < n2) {
            i3 += this[r3] - t4[r3];
            e4[r3++] = i3 & this.DM;
            i3 >>= this.DB;
          }
          if (t4.t < this.t) {
            i3 -= t4.s;
            while (r3 < this.t) {
              i3 += this[r3];
              e4[r3++] = i3 & this.DM;
              i3 >>= this.DB;
            }
            i3 += this.s;
          } else {
            i3 += this.s;
            while (r3 < t4.t) {
              i3 -= t4[r3];
              e4[r3++] = i3 & this.DM;
              i3 >>= this.DB;
            }
            i3 -= t4.s;
          }
          e4.s = i3 < 0 ? -1 : 0;
          if (i3 < -1)
            e4[r3++] = this.DV + i3;
          else if (i3 > 0)
            e4[r3++] = i3;
          e4.t = r3;
          e4.clamp();
        };
        t3.prototype.multiplyTo = function(e4, r3) {
          var i3 = this.abs();
          var n2 = e4.abs();
          var s2 = i3.t;
          r3.t = s2 + n2.t;
          while (--s2 >= 0)
            r3[s2] = 0;
          for (s2 = 0; s2 < n2.t; ++s2)
            r3[s2 + i3.t] = i3.am(0, n2[s2], r3, s2, 0, i3.t);
          r3.s = 0;
          r3.clamp();
          if (this.s != e4.s)
            t3.ZERO.subTo(r3, r3);
        };
        t3.prototype.squareTo = function(t4) {
          var e4 = this.abs();
          var r3 = t4.t = 2 * e4.t;
          while (--r3 >= 0)
            t4[r3] = 0;
          for (r3 = 0; r3 < e4.t - 1; ++r3) {
            var i3 = e4.am(r3, e4[r3], t4, 2 * r3, 0, 1);
            if ((t4[r3 + e4.t] += e4.am(r3 + 1, 2 * e4[r3], t4, 2 * r3 + 1, i3, e4.t - r3 - 1)) >= e4.DV) {
              t4[r3 + e4.t] -= e4.DV;
              t4[r3 + e4.t + 1] = 1;
            }
          }
          if (t4.t > 0)
            t4[t4.t - 1] += e4.am(r3, e4[r3], t4, 2 * r3, 0, 1);
          t4.s = 0;
          t4.clamp();
        };
        t3.prototype.divRemTo = function(e4, r3, i3) {
          var n2 = e4.abs();
          if (n2.t <= 0)
            return;
          var s2 = this.abs();
          if (s2.t < n2.t) {
            if (r3 != null)
              r3.fromInt(0);
            if (i3 != null)
              this.copyTo(i3);
            return;
          }
          if (i3 == null)
            i3 = H();
          var a2 = H();
          var o3 = this.s;
          var u2 = e4.s;
          var c2 = this.DB - W(n2[n2.t - 1]);
          if (c2 > 0) {
            n2.lShiftTo(c2, a2);
            s2.lShiftTo(c2, i3);
          } else {
            n2.copyTo(a2);
            s2.copyTo(i3);
          }
          var l2 = a2.t;
          var f2 = a2[l2 - 1];
          if (f2 == 0)
            return;
          var h2 = f2 * (1 << this.F1) + (l2 > 1 ? a2[l2 - 2] >> this.F2 : 0);
          var d2 = this.FV / h2;
          var p2 = (1 << this.F1) / h2;
          var v = 1 << this.F2;
          var g2 = i3.t;
          var y2 = g2 - l2;
          var m2 = r3 == null ? H() : r3;
          a2.dlShiftTo(y2, m2);
          if (i3.compareTo(m2) >= 0) {
            i3[i3.t++] = 1;
            i3.subTo(m2, i3);
          }
          t3.ONE.dlShiftTo(l2, m2);
          m2.subTo(a2, a2);
          while (a2.t < l2)
            a2[a2.t++] = 0;
          while (--y2 >= 0) {
            var w2 = i3[--g2] == f2 ? this.DM : Math.floor(i3[g2] * d2 + (i3[g2 - 1] + v) * p2);
            if ((i3[g2] += a2.am(0, w2, i3, y2, 0, l2)) < w2) {
              a2.dlShiftTo(y2, m2);
              i3.subTo(m2, i3);
              while (i3[g2] < --w2)
                i3.subTo(m2, i3);
            }
          }
          if (r3 != null) {
            i3.drShiftTo(l2, r3);
            if (o3 != u2)
              t3.ZERO.subTo(r3, r3);
          }
          i3.t = l2;
          i3.clamp();
          if (c2 > 0)
            i3.rShiftTo(c2, i3);
          if (o3 < 0)
            t3.ZERO.subTo(i3, i3);
        };
        t3.prototype.invDigit = function() {
          if (this.t < 1)
            return 0;
          var t4 = this[0];
          if ((1 & t4) == 0)
            return 0;
          var e4 = 3 & t4;
          e4 = e4 * (2 - (15 & t4) * e4) & 15;
          e4 = e4 * (2 - (255 & t4) * e4) & 255;
          e4 = e4 * (2 - ((65535 & t4) * e4 & 65535)) & 65535;
          e4 = e4 * (2 - t4 * e4 % this.DV) % this.DV;
          return e4 > 0 ? this.DV - e4 : -e4;
        };
        t3.prototype.isEven = function() {
          return (this.t > 0 ? 1 & this[0] : this.s) == 0;
        };
        t3.prototype.exp = function(e4, r3) {
          if (e4 > 4294967295 || e4 < 1)
            return t3.ONE;
          var i3 = H();
          var n2 = H();
          var s2 = r3.convert(this);
          var a2 = W(e4) - 1;
          s2.copyTo(i3);
          while (--a2 >= 0) {
            r3.sqrTo(i3, n2);
            if ((e4 & 1 << a2) > 0)
              r3.mulTo(n2, s2, i3);
            else {
              var o3 = i3;
              i3 = n2;
              n2 = o3;
            }
          }
          return r3.revert(i3);
        };
        t3.prototype.chunkSize = function(t4) {
          return Math.floor(Math.LN2 * this.DB / Math.log(t4));
        };
        t3.prototype.toRadix = function(t4) {
          if (t4 == null)
            t4 = 10;
          if (this.signum() == 0 || t4 < 2 || t4 > 36)
            return "0";
          var e4 = this.chunkSize(t4);
          var r3 = Math.pow(t4, e4);
          var i3 = Y(r3);
          var n2 = H();
          var s2 = H();
          var a2 = "";
          this.divRemTo(i3, n2, s2);
          while (n2.signum() > 0) {
            a2 = (r3 + s2.intValue()).toString(t4).substr(1) + a2;
            n2.divRemTo(i3, n2, s2);
          }
          return s2.intValue().toString(t4) + a2;
        };
        t3.prototype.fromRadix = function(e4, r3) {
          this.fromInt(0);
          if (r3 == null)
            r3 = 10;
          var i3 = this.chunkSize(r3);
          var n2 = Math.pow(r3, i3);
          var s2 = false;
          var a2 = 0;
          var o3 = 0;
          for (var u2 = 0; u2 < e4.length; ++u2) {
            var c2 = G(e4, u2);
            if (c2 < 0) {
              if (e4.charAt(u2) == "-" && this.signum() == 0)
                s2 = true;
              continue;
            }
            o3 = r3 * o3 + c2;
            if (++a2 >= i3) {
              this.dMultiply(n2);
              this.dAddOffset(o3, 0);
              a2 = 0;
              o3 = 0;
            }
          }
          if (a2 > 0) {
            this.dMultiply(Math.pow(r3, a2));
            this.dAddOffset(o3, 0);
          }
          if (s2)
            t3.ZERO.subTo(this, this);
        };
        t3.prototype.fromNumber = function(e4, r3, i3) {
          if (typeof r3 == "number")
            if (e4 < 2)
              this.fromInt(1);
            else {
              this.fromNumber(e4, i3);
              if (!this.testBit(e4 - 1))
                this.bitwiseTo(t3.ONE.shiftLeft(e4 - 1), a, this);
              if (this.isEven())
                this.dAddOffset(1, 0);
              while (!this.isProbablePrime(r3)) {
                this.dAddOffset(2, 0);
                if (this.bitLength() > e4)
                  this.subTo(t3.ONE.shiftLeft(e4 - 1), this);
              }
            }
          else {
            var n2 = [];
            var s2 = 7 & e4;
            n2.length = (e4 >> 3) + 1;
            r3.nextBytes(n2);
            if (s2 > 0)
              n2[0] &= (1 << s2) - 1;
            else
              n2[0] = 0;
            this.fromString(n2, 256);
          }
        };
        t3.prototype.bitwiseTo = function(t4, e4, r3) {
          var i3;
          var n2;
          var s2 = Math.min(t4.t, this.t);
          for (i3 = 0; i3 < s2; ++i3)
            r3[i3] = e4(this[i3], t4[i3]);
          if (t4.t < this.t) {
            n2 = t4.s & this.DM;
            for (i3 = s2; i3 < this.t; ++i3)
              r3[i3] = e4(this[i3], n2);
            r3.t = this.t;
          } else {
            n2 = this.s & this.DM;
            for (i3 = s2; i3 < t4.t; ++i3)
              r3[i3] = e4(n2, t4[i3]);
            r3.t = t4.t;
          }
          r3.s = e4(this.s, t4.s);
          r3.clamp();
        };
        t3.prototype.changeBit = function(e4, r3) {
          var i3 = t3.ONE.shiftLeft(e4);
          this.bitwiseTo(i3, r3, i3);
          return i3;
        };
        t3.prototype.addTo = function(t4, e4) {
          var r3 = 0;
          var i3 = 0;
          var n2 = Math.min(t4.t, this.t);
          while (r3 < n2) {
            i3 += this[r3] + t4[r3];
            e4[r3++] = i3 & this.DM;
            i3 >>= this.DB;
          }
          if (t4.t < this.t) {
            i3 += t4.s;
            while (r3 < this.t) {
              i3 += this[r3];
              e4[r3++] = i3 & this.DM;
              i3 >>= this.DB;
            }
            i3 += this.s;
          } else {
            i3 += this.s;
            while (r3 < t4.t) {
              i3 += t4[r3];
              e4[r3++] = i3 & this.DM;
              i3 >>= this.DB;
            }
            i3 += t4.s;
          }
          e4.s = i3 < 0 ? -1 : 0;
          if (i3 > 0)
            e4[r3++] = i3;
          else if (i3 < -1)
            e4[r3++] = this.DV + i3;
          e4.t = r3;
          e4.clamp();
        };
        t3.prototype.dMultiply = function(t4) {
          this[this.t] = this.am(0, t4 - 1, this, 0, 0, this.t);
          ++this.t;
          this.clamp();
        };
        t3.prototype.dAddOffset = function(t4, e4) {
          if (t4 == 0)
            return;
          while (this.t <= e4)
            this[this.t++] = 0;
          this[e4] += t4;
          while (this[e4] >= this.DV) {
            this[e4] -= this.DV;
            if (++e4 >= this.t)
              this[this.t++] = 0;
            ++this[e4];
          }
        };
        t3.prototype.multiplyLowerTo = function(t4, e4, r3) {
          var i3 = Math.min(this.t + t4.t, e4);
          r3.s = 0;
          r3.t = i3;
          while (i3 > 0)
            r3[--i3] = 0;
          for (var n2 = r3.t - this.t; i3 < n2; ++i3)
            r3[i3 + this.t] = this.am(0, t4[i3], r3, i3, 0, this.t);
          for (var n2 = Math.min(t4.t, e4); i3 < n2; ++i3)
            this.am(0, t4[i3], r3, i3, 0, e4 - i3);
          r3.clamp();
        };
        t3.prototype.multiplyUpperTo = function(t4, e4, r3) {
          --e4;
          var i3 = r3.t = this.t + t4.t - e4;
          r3.s = 0;
          while (--i3 >= 0)
            r3[i3] = 0;
          for (i3 = Math.max(e4 - this.t, 0); i3 < t4.t; ++i3)
            r3[this.t + i3 - e4] = this.am(e4 - i3, t4[i3], r3, 0, 0, this.t + i3 - e4);
          r3.clamp();
          r3.drShiftTo(1, r3);
        };
        t3.prototype.modInt = function(t4) {
          if (t4 <= 0)
            return 0;
          var e4 = this.DV % t4;
          var r3 = this.s < 0 ? t4 - 1 : 0;
          if (this.t > 0)
            if (e4 == 0)
              r3 = this[0] % t4;
            else
              for (var i3 = this.t - 1; i3 >= 0; --i3)
                r3 = (e4 * r3 + this[i3]) % t4;
          return r3;
        };
        t3.prototype.millerRabin = function(e4) {
          var r3 = this.subtract(t3.ONE);
          var i3 = r3.getLowestSetBit();
          if (i3 <= 0)
            return false;
          var n2 = r3.shiftRight(i3);
          e4 = e4 + 1 >> 1;
          if (e4 > O.length)
            e4 = O.length;
          var s2 = H();
          for (var a2 = 0; a2 < e4; ++a2) {
            s2.fromInt(O[Math.floor(Math.random() * O.length)]);
            var o3 = s2.modPow(n2, this);
            if (o3.compareTo(t3.ONE) != 0 && o3.compareTo(r3) != 0) {
              var u2 = 1;
              while (u2++ < i3 && o3.compareTo(r3) != 0) {
                o3 = o3.modPowInt(2, this);
                if (o3.compareTo(t3.ONE) == 0)
                  return false;
              }
              if (o3.compareTo(r3) != 0)
                return false;
            }
          }
          return true;
        };
        t3.prototype.square = function() {
          var t4 = H();
          this.squareTo(t4);
          return t4;
        };
        t3.prototype.gcda = function(t4, e4) {
          var r3 = this.s < 0 ? this.negate() : this.clone();
          var i3 = t4.s < 0 ? t4.negate() : t4.clone();
          if (r3.compareTo(i3) < 0) {
            var n2 = r3;
            r3 = i3;
            i3 = n2;
          }
          var s2 = r3.getLowestSetBit();
          var a2 = i3.getLowestSetBit();
          if (a2 < 0) {
            e4(r3);
            return;
          }
          if (s2 < a2)
            a2 = s2;
          if (a2 > 0) {
            r3.rShiftTo(a2, r3);
            i3.rShiftTo(a2, i3);
          }
          var o3 = function() {
            if ((s2 = r3.getLowestSetBit()) > 0)
              r3.rShiftTo(s2, r3);
            if ((s2 = i3.getLowestSetBit()) > 0)
              i3.rShiftTo(s2, i3);
            if (r3.compareTo(i3) >= 0) {
              r3.subTo(i3, r3);
              r3.rShiftTo(1, r3);
            } else {
              i3.subTo(r3, i3);
              i3.rShiftTo(1, i3);
            }
            if (!(r3.signum() > 0)) {
              if (a2 > 0)
                i3.lShiftTo(a2, i3);
              setTimeout(function() {
                e4(i3);
              }, 0);
            } else
              setTimeout(o3, 0);
          };
          setTimeout(o3, 10);
        };
        t3.prototype.fromNumberAsync = function(e4, r3, i3, n2) {
          if (typeof r3 == "number")
            if (e4 < 2)
              this.fromInt(1);
            else {
              this.fromNumber(e4, i3);
              if (!this.testBit(e4 - 1))
                this.bitwiseTo(t3.ONE.shiftLeft(e4 - 1), a, this);
              if (this.isEven())
                this.dAddOffset(1, 0);
              var s2 = this;
              var o3 = function() {
                s2.dAddOffset(2, 0);
                if (s2.bitLength() > e4)
                  s2.subTo(t3.ONE.shiftLeft(e4 - 1), s2);
                if (s2.isProbablePrime(r3))
                  setTimeout(function() {
                    n2();
                  }, 0);
                else
                  setTimeout(o3, 0);
              };
              setTimeout(o3, 0);
            }
          else {
            var u2 = [];
            var c2 = 7 & e4;
            u2.length = (e4 >> 3) + 1;
            r3.nextBytes(u2);
            if (c2 > 0)
              u2[0] &= (1 << c2) - 1;
            else
              u2[0] = 0;
            this.fromString(u2, 256);
          }
        };
        return t3;
      }();
      var N = function() {
        function t3() {
        }
        t3.prototype.convert = function(t4) {
          return t4;
        };
        t3.prototype.revert = function(t4) {
          return t4;
        };
        t3.prototype.mulTo = function(t4, e4, r3) {
          t4.multiplyTo(e4, r3);
        };
        t3.prototype.sqrTo = function(t4, e4) {
          t4.squareTo(e4);
        };
        return t3;
      }();
      var P = function() {
        function t3(t4) {
          this.m = t4;
        }
        t3.prototype.convert = function(t4) {
          if (t4.s < 0 || t4.compareTo(this.m) >= 0)
            return t4.mod(this.m);
          else
            return t4;
        };
        t3.prototype.revert = function(t4) {
          return t4;
        };
        t3.prototype.reduce = function(t4) {
          t4.divRemTo(this.m, null, t4);
        };
        t3.prototype.mulTo = function(t4, e4, r3) {
          t4.multiplyTo(e4, r3);
          this.reduce(r3);
        };
        t3.prototype.sqrTo = function(t4, e4) {
          t4.squareTo(e4);
          this.reduce(e4);
        };
        return t3;
      }();
      var V = function() {
        function t3(t4) {
          this.m = t4;
          this.mp = t4.invDigit();
          this.mpl = 32767 & this.mp;
          this.mph = this.mp >> 15;
          this.um = (1 << t4.DB - 15) - 1;
          this.mt2 = 2 * t4.t;
        }
        t3.prototype.convert = function(t4) {
          var e4 = H();
          t4.abs().dlShiftTo(this.m.t, e4);
          e4.divRemTo(this.m, null, e4);
          if (t4.s < 0 && e4.compareTo(C.ZERO) > 0)
            this.m.subTo(e4, e4);
          return e4;
        };
        t3.prototype.revert = function(t4) {
          var e4 = H();
          t4.copyTo(e4);
          this.reduce(e4);
          return e4;
        };
        t3.prototype.reduce = function(t4) {
          while (t4.t <= this.mt2)
            t4[t4.t++] = 0;
          for (var e4 = 0; e4 < this.m.t; ++e4) {
            var r3 = 32767 & t4[e4];
            var i3 = r3 * this.mpl + ((r3 * this.mph + (t4[e4] >> 15) * this.mpl & this.um) << 15) & t4.DM;
            r3 = e4 + this.m.t;
            t4[r3] += this.m.am(0, i3, t4, e4, 0, this.m.t);
            while (t4[r3] >= t4.DV) {
              t4[r3] -= t4.DV;
              t4[++r3]++;
            }
          }
          t4.clamp();
          t4.drShiftTo(this.m.t, t4);
          if (t4.compareTo(this.m) >= 0)
            t4.subTo(this.m, t4);
        };
        t3.prototype.mulTo = function(t4, e4, r3) {
          t4.multiplyTo(e4, r3);
          this.reduce(r3);
        };
        t3.prototype.sqrTo = function(t4, e4) {
          t4.squareTo(e4);
          this.reduce(e4);
        };
        return t3;
      }();
      var L = function() {
        function t3(t4) {
          this.m = t4;
          this.r2 = H();
          this.q3 = H();
          C.ONE.dlShiftTo(2 * t4.t, this.r2);
          this.mu = this.r2.divide(t4);
        }
        t3.prototype.convert = function(t4) {
          if (t4.s < 0 || t4.t > 2 * this.m.t)
            return t4.mod(this.m);
          else if (t4.compareTo(this.m) < 0)
            return t4;
          else {
            var e4 = H();
            t4.copyTo(e4);
            this.reduce(e4);
            return e4;
          }
        };
        t3.prototype.revert = function(t4) {
          return t4;
        };
        t3.prototype.reduce = function(t4) {
          t4.drShiftTo(this.m.t - 1, this.r2);
          if (t4.t > this.m.t + 1) {
            t4.t = this.m.t + 1;
            t4.clamp();
          }
          this.mu.multiplyUpperTo(this.r2, this.m.t + 1, this.q3);
          this.m.multiplyLowerTo(this.q3, this.m.t + 1, this.r2);
          while (t4.compareTo(this.r2) < 0)
            t4.dAddOffset(1, this.m.t + 1);
          t4.subTo(this.r2, t4);
          while (t4.compareTo(this.m) >= 0)
            t4.subTo(this.m, t4);
        };
        t3.prototype.mulTo = function(t4, e4, r3) {
          t4.multiplyTo(e4, r3);
          this.reduce(r3);
        };
        t3.prototype.sqrTo = function(t4, e4) {
          t4.squareTo(e4);
          this.reduce(e4);
        };
        return t3;
      }();
      function H() {
        return new C(null);
      }
      function K(t3, e4) {
        return new C(t3, e4);
      }
      var U = typeof navigator !== "undefined";
      if (U && B && navigator.appName == "Microsoft Internet Explorer") {
        C.prototype.am = function t3(e4, r3, i3, n2, s2, a2) {
          var o3 = 32767 & r3;
          var u2 = r3 >> 15;
          while (--a2 >= 0) {
            var c2 = 32767 & this[e4];
            var l2 = this[e4++] >> 15;
            var f2 = u2 * c2 + l2 * o3;
            c2 = o3 * c2 + ((32767 & f2) << 15) + i3[n2] + (1073741823 & s2);
            s2 = (c2 >>> 30) + (f2 >>> 15) + u2 * l2 + (s2 >>> 30);
            i3[n2++] = 1073741823 & c2;
          }
          return s2;
        };
        x = 30;
      } else if (U && B && navigator.appName != "Netscape") {
        C.prototype.am = function t3(e4, r3, i3, n2, s2, a2) {
          while (--a2 >= 0) {
            var o3 = r3 * this[e4++] + i3[n2] + s2;
            s2 = Math.floor(o3 / 67108864);
            i3[n2++] = 67108863 & o3;
          }
          return s2;
        };
        x = 26;
      } else {
        C.prototype.am = function t3(e4, r3, i3, n2, s2, a2) {
          var o3 = 16383 & r3;
          var u2 = r3 >> 14;
          while (--a2 >= 0) {
            var c2 = 16383 & this[e4];
            var l2 = this[e4++] >> 14;
            var f2 = u2 * c2 + l2 * o3;
            c2 = o3 * c2 + ((16383 & f2) << 14) + i3[n2] + s2;
            s2 = (c2 >> 28) + (f2 >> 14) + u2 * l2;
            i3[n2++] = 268435455 & c2;
          }
          return s2;
        };
        x = 28;
      }
      C.prototype.DB = x;
      C.prototype.DM = (1 << x) - 1;
      C.prototype.DV = 1 << x;
      var j = 52;
      C.prototype.FV = Math.pow(2, j);
      C.prototype.F1 = j - x;
      C.prototype.F2 = 2 * x - j;
      var q = [];
      var F;
      var z;
      F = "0".charCodeAt(0);
      for (z = 0; z <= 9; ++z)
        q[F++] = z;
      F = "a".charCodeAt(0);
      for (z = 10; z < 36; ++z)
        q[F++] = z;
      F = "A".charCodeAt(0);
      for (z = 10; z < 36; ++z)
        q[F++] = z;
      function G(t3, e4) {
        var r3 = q[t3.charCodeAt(e4)];
        return r3 == null ? -1 : r3;
      }
      function Y(t3) {
        var e4 = H();
        e4.fromInt(t3);
        return e4;
      }
      function W(t3) {
        var e4 = 1;
        var r3;
        if ((r3 = t3 >>> 16) != 0) {
          t3 = r3;
          e4 += 16;
        }
        if ((r3 = t3 >> 8) != 0) {
          t3 = r3;
          e4 += 8;
        }
        if ((r3 = t3 >> 4) != 0) {
          t3 = r3;
          e4 += 4;
        }
        if ((r3 = t3 >> 2) != 0) {
          t3 = r3;
          e4 += 2;
        }
        if ((r3 = t3 >> 1) != 0) {
          t3 = r3;
          e4 += 1;
        }
        return e4;
      }
      C.ZERO = Y(0);
      C.ONE = Y(1);
      var J = function() {
        function t3() {
          this.i = 0;
          this.j = 0;
          this.S = [];
        }
        t3.prototype.init = function(t4) {
          var e4;
          var r3;
          var i3;
          for (e4 = 0; e4 < 256; ++e4)
            this.S[e4] = e4;
          r3 = 0;
          for (e4 = 0; e4 < 256; ++e4) {
            r3 = r3 + this.S[e4] + t4[e4 % t4.length] & 255;
            i3 = this.S[e4];
            this.S[e4] = this.S[r3];
            this.S[r3] = i3;
          }
          this.i = 0;
          this.j = 0;
        };
        t3.prototype.next = function() {
          var t4;
          this.i = this.i + 1 & 255;
          this.j = this.j + this.S[this.i] & 255;
          t4 = this.S[this.i];
          this.S[this.i] = this.S[this.j];
          this.S[this.j] = t4;
          return this.S[t4 + this.S[this.i] & 255];
        };
        return t3;
      }();
      function Z() {
        return new J();
      }
      var $ = 256;
      var X;
      var Q = null;
      var tt2;
      if (Q == null) {
        Q = [];
        tt2 = 0;
      }
      function nt() {
        if (X == null) {
          X = Z();
          while (tt2 < $) {
            var t3 = Math.floor(65536 * Math.random());
            Q[tt2++] = 255 & t3;
          }
          X.init(Q);
          for (tt2 = 0; tt2 < Q.length; ++tt2)
            Q[tt2] = 0;
          tt2 = 0;
        }
        return X.next();
      }
      var st = function() {
        function t3() {
        }
        t3.prototype.nextBytes = function(t4) {
          for (var e4 = 0; e4 < t4.length; ++e4)
            t4[e4] = nt();
        };
        return t3;
      }();
      function at(t3, e4) {
        if (e4 < t3.length + 22) {
          console.error("Message too long for RSA");
          return null;
        }
        var r3 = e4 - t3.length - 6;
        var i3 = "";
        for (var n2 = 0; n2 < r3; n2 += 2)
          i3 += "ff";
        var s2 = "0001" + i3 + "00" + t3;
        return K(s2, 16);
      }
      function ot(t3, e4) {
        if (e4 < t3.length + 11) {
          console.error("Message too long for RSA");
          return null;
        }
        var r3 = [];
        var i3 = t3.length - 1;
        while (i3 >= 0 && e4 > 0) {
          var n2 = t3.charCodeAt(i3--);
          if (n2 < 128)
            r3[--e4] = n2;
          else if (n2 > 127 && n2 < 2048) {
            r3[--e4] = 63 & n2 | 128;
            r3[--e4] = n2 >> 6 | 192;
          } else {
            r3[--e4] = 63 & n2 | 128;
            r3[--e4] = n2 >> 6 & 63 | 128;
            r3[--e4] = n2 >> 12 | 224;
          }
        }
        r3[--e4] = 0;
        var s2 = new st();
        var a2 = [];
        while (e4 > 2) {
          a2[0] = 0;
          while (a2[0] == 0)
            s2.nextBytes(a2);
          r3[--e4] = a2[0];
        }
        r3[--e4] = 2;
        r3[--e4] = 0;
        return new C(r3);
      }
      var ut = function() {
        function t3() {
          this.n = null;
          this.e = 0;
          this.d = null;
          this.p = null;
          this.q = null;
          this.dmp1 = null;
          this.dmq1 = null;
          this.coeff = null;
        }
        t3.prototype.doPublic = function(t4) {
          return t4.modPowInt(this.e, this.n);
        };
        t3.prototype.doPrivate = function(t4) {
          if (this.p == null || this.q == null)
            return t4.modPow(this.d, this.n);
          var e4 = t4.mod(this.p).modPow(this.dmp1, this.p);
          var r3 = t4.mod(this.q).modPow(this.dmq1, this.q);
          while (e4.compareTo(r3) < 0)
            e4 = e4.add(this.p);
          return e4.subtract(r3).multiply(this.coeff).mod(this.p).multiply(this.q).add(r3);
        };
        t3.prototype.setPublic = function(t4, e4) {
          if (t4 != null && e4 != null && t4.length > 0 && e4.length > 0) {
            this.n = K(t4, 16);
            this.e = parseInt(e4, 16);
          } else
            console.error("Invalid RSA public key");
        };
        t3.prototype.encrypt = function(t4) {
          var e4 = this.n.bitLength() + 7 >> 3;
          var r3 = ot(t4, e4);
          if (r3 == null)
            return null;
          var i3 = this.doPublic(r3);
          if (i3 == null)
            return null;
          var n2 = i3.toString(16);
          var s2 = n2.length;
          for (var a2 = 0; a2 < 2 * e4 - s2; a2++)
            n2 = "0" + n2;
          return n2;
        };
        t3.prototype.setPrivate = function(t4, e4, r3) {
          if (t4 != null && e4 != null && t4.length > 0 && e4.length > 0) {
            this.n = K(t4, 16);
            this.e = parseInt(e4, 16);
            this.d = K(r3, 16);
          } else
            console.error("Invalid RSA private key");
        };
        t3.prototype.setPrivateEx = function(t4, e4, r3, i3, n2, s2, a2, o3) {
          if (t4 != null && e4 != null && t4.length > 0 && e4.length > 0) {
            this.n = K(t4, 16);
            this.e = parseInt(e4, 16);
            this.d = K(r3, 16);
            this.p = K(i3, 16);
            this.q = K(n2, 16);
            this.dmp1 = K(s2, 16);
            this.dmq1 = K(a2, 16);
            this.coeff = K(o3, 16);
          } else
            console.error("Invalid RSA private key");
        };
        t3.prototype.generate = function(t4, e4) {
          var r3 = new st();
          var i3 = t4 >> 1;
          this.e = parseInt(e4, 16);
          var n2 = new C(e4, 16);
          for (; ; ) {
            for (; ; ) {
              this.p = new C(t4 - i3, 1, r3);
              if (this.p.subtract(C.ONE).gcd(n2).compareTo(C.ONE) == 0 && this.p.isProbablePrime(10))
                break;
            }
            for (; ; ) {
              this.q = new C(i3, 1, r3);
              if (this.q.subtract(C.ONE).gcd(n2).compareTo(C.ONE) == 0 && this.q.isProbablePrime(10))
                break;
            }
            if (this.p.compareTo(this.q) <= 0) {
              var s2 = this.p;
              this.p = this.q;
              this.q = s2;
            }
            var a2 = this.p.subtract(C.ONE);
            var o3 = this.q.subtract(C.ONE);
            var u2 = a2.multiply(o3);
            if (u2.gcd(n2).compareTo(C.ONE) == 0) {
              this.n = this.p.multiply(this.q);
              this.d = n2.modInverse(u2);
              this.dmp1 = this.d.mod(a2);
              this.dmq1 = this.d.mod(o3);
              this.coeff = this.q.modInverse(this.p);
              break;
            }
          }
        };
        t3.prototype.decrypt = function(t4) {
          var e4 = K(t4, 16);
          var r3 = this.doPrivate(e4);
          if (r3 == null)
            return null;
          return ct(r3, this.n.bitLength() + 7 >> 3);
        };
        t3.prototype.generateAsync = function(t4, e4, r3) {
          var i3 = new st();
          var n2 = t4 >> 1;
          this.e = parseInt(e4, 16);
          var s2 = new C(e4, 16);
          var a2 = this;
          var o3 = function() {
            var e5 = function() {
              if (a2.p.compareTo(a2.q) <= 0) {
                var t5 = a2.p;
                a2.p = a2.q;
                a2.q = t5;
              }
              var e6 = a2.p.subtract(C.ONE);
              var i4 = a2.q.subtract(C.ONE);
              var n3 = e6.multiply(i4);
              if (n3.gcd(s2).compareTo(C.ONE) == 0) {
                a2.n = a2.p.multiply(a2.q);
                a2.d = s2.modInverse(n3);
                a2.dmp1 = a2.d.mod(e6);
                a2.dmq1 = a2.d.mod(i4);
                a2.coeff = a2.q.modInverse(a2.p);
                setTimeout(function() {
                  r3();
                }, 0);
              } else
                setTimeout(o3, 0);
            };
            var u2 = function() {
              a2.q = H();
              a2.q.fromNumberAsync(n2, 1, i3, function() {
                a2.q.subtract(C.ONE).gcda(s2, function(t5) {
                  if (t5.compareTo(C.ONE) == 0 && a2.q.isProbablePrime(10))
                    setTimeout(e5, 0);
                  else
                    setTimeout(u2, 0);
                });
              });
            };
            var c2 = function() {
              a2.p = H();
              a2.p.fromNumberAsync(t4 - n2, 1, i3, function() {
                a2.p.subtract(C.ONE).gcda(s2, function(t5) {
                  if (t5.compareTo(C.ONE) == 0 && a2.p.isProbablePrime(10))
                    setTimeout(u2, 0);
                  else
                    setTimeout(c2, 0);
                });
              });
            };
            setTimeout(c2, 0);
          };
          setTimeout(o3, 0);
        };
        t3.prototype.sign = function(t4, e4, r3) {
          var i3 = ht(r3);
          var n2 = i3 + e4(t4).toString();
          var s2 = at(n2, this.n.bitLength() / 4);
          if (s2 == null)
            return null;
          var a2 = this.doPrivate(s2);
          if (a2 == null)
            return null;
          var o3 = a2.toString(16);
          if ((1 & o3.length) == 0)
            return o3;
          else
            return "0" + o3;
        };
        t3.prototype.verify = function(t4, e4, r3) {
          var i3 = K(e4, 16);
          var n2 = this.doPublic(i3);
          if (n2 == null)
            return null;
          var s2 = n2.toString(16).replace(/^1f+00/, "");
          var a2 = dt(s2);
          return a2 == r3(t4).toString();
        };
        t3.prototype.encryptLong = function(t4) {
          var e4 = this;
          var r3 = "";
          var i3 = (this.n.bitLength() + 7 >> 3) - 11;
          var n2 = this.setSplitChn(t4, i3);
          n2.forEach(function(t5) {
            r3 += e4.encrypt(t5);
          });
          return r3;
        };
        t3.prototype.decryptLong = function(t4) {
          var e4 = "";
          var r3 = this.n.bitLength() + 7 >> 3;
          var i3 = 2 * r3;
          if (t4.length > i3) {
            var n2 = t4.match(new RegExp(".{1," + i3 + "}", "g")) || [];
            var s2 = [];
            for (var a2 = 0; a2 < n2.length; a2++) {
              var o3 = K(n2[a2], 16);
              var u2 = this.doPrivate(o3);
              if (u2 == null)
                return null;
              s2.push(u2);
            }
            e4 = lt(s2, r3);
          } else
            e4 = this.decrypt(t4);
          return e4;
        };
        t3.prototype.setSplitChn = function(t4, e4, r3) {
          if (r3 === void 0)
            r3 = [];
          var i3 = t4.split("");
          var n2 = 0;
          for (var s2 = 0; s2 < i3.length; s2++) {
            var a2 = i3[s2].charCodeAt(0);
            if (a2 <= 127)
              n2 += 1;
            else if (a2 <= 2047)
              n2 += 2;
            else if (a2 <= 65535)
              n2 += 3;
            else
              n2 += 4;
            if (n2 > e4) {
              var o3 = t4.substring(0, s2);
              r3.push(o3);
              return this.setSplitChn(t4.substring(s2), e4, r3);
            }
          }
          r3.push(t4);
          return r3;
        };
        return t3;
      }();
      function ct(t3, e4) {
        var r3 = t3.toByteArray();
        var i3 = 0;
        while (i3 < r3.length && r3[i3] == 0)
          ++i3;
        if (r3.length - i3 != e4 - 1 || r3[i3] != 2)
          return null;
        ++i3;
        while (r3[i3] != 0)
          if (++i3 >= r3.length)
            return null;
        var n2 = "";
        while (++i3 < r3.length) {
          var s2 = 255 & r3[i3];
          if (s2 < 128)
            n2 += String.fromCharCode(s2);
          else if (s2 > 191 && s2 < 224) {
            n2 += String.fromCharCode((31 & s2) << 6 | 63 & r3[i3 + 1]);
            ++i3;
          } else {
            n2 += String.fromCharCode((15 & s2) << 12 | (63 & r3[i3 + 1]) << 6 | 63 & r3[i3 + 2]);
            i3 += 2;
          }
        }
        return n2;
      }
      function lt(t3, e4) {
        var r3 = [];
        for (var i3 = 0; i3 < t3.length; i3++) {
          var n2 = t3[i3];
          var s2 = n2.toByteArray();
          var a2 = 0;
          while (a2 < s2.length && s2[a2] == 0)
            ++a2;
          if (s2.length - a2 != e4 - 1 || s2[a2] != 2)
            return null;
          ++a2;
          while (s2[a2] != 0)
            if (++a2 >= s2.length)
              return null;
          r3 = r3.concat(s2.slice(a2 + 1));
        }
        var o3 = r3;
        var u2 = -1;
        var c2 = "";
        while (++u2 < o3.length) {
          var l2 = 255 & o3[u2];
          if (l2 < 128)
            c2 += String.fromCharCode(l2);
          else if (l2 > 191 && l2 < 224) {
            c2 += String.fromCharCode((31 & l2) << 6 | 63 & o3[u2 + 1]);
            ++u2;
          } else {
            c2 += String.fromCharCode((15 & l2) << 12 | (63 & o3[u2 + 1]) << 6 | 63 & o3[u2 + 2]);
            u2 += 2;
          }
        }
        return c2;
      }
      var ft = { md2: "3020300c06082a864886f70d020205000410", md5: "3020300c06082a864886f70d020505000410", sha1: "3021300906052b0e03021a05000414", sha224: "302d300d06096086480165030402040500041c", sha256: "3031300d060960864801650304020105000420", sha384: "3041300d060960864801650304020205000430", sha512: "3051300d060960864801650304020305000440", ripemd160: "3021300906052b2403020105000414" };
      function ht(t3) {
        return ft[t3] || "";
      }
      function dt(t3) {
        for (var e4 in ft)
          if (ft.hasOwnProperty(e4)) {
            var r3 = ft[e4];
            var i3 = r3.length;
            if (t3.substr(0, i3) == r3)
              return t3.substr(i3);
          }
        return t3;
      }
      var pt = {};
      pt.lang = { extend: function(t3, e4, r3) {
        if (!e4 || !t3)
          throw new Error("YAHOO.lang.extend failed, please check that all dependencies are included.");
        var i3 = function() {
        };
        i3.prototype = e4.prototype;
        t3.prototype = new i3();
        t3.prototype.constructor = t3;
        t3.superclass = e4.prototype;
        if (e4.prototype.constructor == Object.prototype.constructor)
          e4.prototype.constructor = e4;
        if (r3) {
          var n2;
          for (n2 in r3)
            t3.prototype[n2] = r3[n2];
          var s2 = function() {
          }, a2 = ["toString", "valueOf"];
          try {
            if (/MSIE/.test(navigator.userAgent))
              s2 = function(t4, e5) {
                for (n2 = 0; n2 < a2.length; n2 += 1) {
                  var r4 = a2[n2], i4 = e5[r4];
                  if (typeof i4 === "function" && i4 != Object.prototype[r4])
                    t4[r4] = i4;
                }
              };
          } catch (t4) {
          }
          s2(t3.prototype, r3);
        }
      } };
      var vt = {};
      if (typeof vt.asn1 == "undefined" || !vt.asn1)
        vt.asn1 = {};
      vt.asn1.ASN1Util = new function() {
        this.integerToByteHex = function(t3) {
          var e4 = t3.toString(16);
          if (e4.length % 2 == 1)
            e4 = "0" + e4;
          return e4;
        };
        this.bigIntToMinTwosComplementsHex = function(t3) {
          var e4 = t3.toString(16);
          if (e4.substr(0, 1) != "-") {
            if (e4.length % 2 == 1)
              e4 = "0" + e4;
            else if (!e4.match(/^[0-7]/))
              e4 = "00" + e4;
          } else {
            var r3 = e4.substr(1);
            var i3 = r3.length;
            if (i3 % 2 == 1)
              i3 += 1;
            else if (!e4.match(/^[0-7]/))
              i3 += 2;
            var n2 = "";
            for (var s2 = 0; s2 < i3; s2++)
              n2 += "f";
            var a2 = new C(n2, 16);
            var o3 = a2.xor(t3).add(C.ONE);
            e4 = o3.toString(16).replace(/^-/, "");
          }
          return e4;
        };
        this.getPEMStringFromHex = function(t3, e4) {
          return hextopem(t3, e4);
        };
        this.newObject = function(t3) {
          var e4 = vt, r3 = e4.asn1, i3 = r3.DERBoolean, n2 = r3.DERInteger, s2 = r3.DERBitString, a2 = r3.DEROctetString, o3 = r3.DERNull, u2 = r3.DERObjectIdentifier, c2 = r3.DEREnumerated, l2 = r3.DERUTF8String, f2 = r3.DERNumericString, h2 = r3.DERPrintableString, d2 = r3.DERTeletexString, p2 = r3.DERIA5String, v = r3.DERUTCTime, g2 = r3.DERGeneralizedTime, y2 = r3.DERSequence, m2 = r3.DERSet, w2 = r3.DERTaggedObject, S2 = r3.ASN1Util.newObject;
          var _2 = Object.keys(t3);
          if (_2.length != 1)
            throw "key of param shall be only one.";
          var b2 = _2[0];
          if (":bool:int:bitstr:octstr:null:oid:enum:utf8str:numstr:prnstr:telstr:ia5str:utctime:gentime:seq:set:tag:".indexOf(":" + b2 + ":") == -1)
            throw "undefined key: " + b2;
          if (b2 == "bool")
            return new i3(t3[b2]);
          if (b2 == "int")
            return new n2(t3[b2]);
          if (b2 == "bitstr")
            return new s2(t3[b2]);
          if (b2 == "octstr")
            return new a2(t3[b2]);
          if (b2 == "null")
            return new o3(t3[b2]);
          if (b2 == "oid")
            return new u2(t3[b2]);
          if (b2 == "enum")
            return new c2(t3[b2]);
          if (b2 == "utf8str")
            return new l2(t3[b2]);
          if (b2 == "numstr")
            return new f2(t3[b2]);
          if (b2 == "prnstr")
            return new h2(t3[b2]);
          if (b2 == "telstr")
            return new d2(t3[b2]);
          if (b2 == "ia5str")
            return new p2(t3[b2]);
          if (b2 == "utctime")
            return new v(t3[b2]);
          if (b2 == "gentime")
            return new g2(t3[b2]);
          if (b2 == "seq") {
            var E3 = t3[b2];
            var D2 = [];
            for (var M2 = 0; M2 < E3.length; M2++) {
              var T2 = S2(E3[M2]);
              D2.push(T2);
            }
            return new y2({ array: D2 });
          }
          if (b2 == "set") {
            var E3 = t3[b2];
            var D2 = [];
            for (var M2 = 0; M2 < E3.length; M2++) {
              var T2 = S2(E3[M2]);
              D2.push(T2);
            }
            return new m2({ array: D2 });
          }
          if (b2 == "tag") {
            var I2 = t3[b2];
            if (Object.prototype.toString.call(I2) === "[object Array]" && I2.length == 3) {
              var A2 = S2(I2[2]);
              return new w2({ tag: I2[0], explicit: I2[1], obj: A2 });
            } else {
              var x2 = {};
              if (I2.explicit !== void 0)
                x2.explicit = I2.explicit;
              if (I2.tag !== void 0)
                x2.tag = I2.tag;
              if (I2.obj === void 0)
                throw "obj shall be specified for 'tag'.";
              x2.obj = S2(I2.obj);
              return new w2(x2);
            }
          }
        };
        this.jsonToASN1HEX = function(t3) {
          var e4 = this.newObject(t3);
          return e4.getEncodedHex();
        };
      }();
      vt.asn1.ASN1Util.oidHexToInt = function(t3) {
        var e4 = "";
        var r3 = parseInt(t3.substr(0, 2), 16);
        var i3 = Math.floor(r3 / 40);
        var n2 = r3 % 40;
        var e4 = i3 + "." + n2;
        var s2 = "";
        for (var a2 = 2; a2 < t3.length; a2 += 2) {
          var o3 = parseInt(t3.substr(a2, 2), 16);
          var u2 = ("00000000" + o3.toString(2)).slice(-8);
          s2 += u2.substr(1, 7);
          if (u2.substr(0, 1) == "0") {
            var c2 = new C(s2, 2);
            e4 = e4 + "." + c2.toString(10);
            s2 = "";
          }
        }
        return e4;
      };
      vt.asn1.ASN1Util.oidIntToHex = function(t3) {
        var e4 = function(t4) {
          var e5 = t4.toString(16);
          if (e5.length == 1)
            e5 = "0" + e5;
          return e5;
        };
        var r3 = function(t4) {
          var r4 = "";
          var i4 = new C(t4, 10);
          var n3 = i4.toString(2);
          var s3 = 7 - n3.length % 7;
          if (s3 == 7)
            s3 = 0;
          var a3 = "";
          for (var o3 = 0; o3 < s3; o3++)
            a3 += "0";
          n3 = a3 + n3;
          for (var o3 = 0; o3 < n3.length - 1; o3 += 7) {
            var u2 = n3.substr(o3, 7);
            if (o3 != n3.length - 7)
              u2 = "1" + u2;
            r4 += e4(parseInt(u2, 2));
          }
          return r4;
        };
        if (!t3.match(/^[0-9.]+$/))
          throw "malformed oid string: " + t3;
        var i3 = "";
        var n2 = t3.split(".");
        var s2 = 40 * parseInt(n2[0]) + parseInt(n2[1]);
        i3 += e4(s2);
        n2.splice(0, 2);
        for (var a2 = 0; a2 < n2.length; a2++)
          i3 += r3(n2[a2]);
        return i3;
      };
      vt.asn1.ASN1Object = function() {
        var n2 = "";
        this.getLengthHexFromValue = function() {
          if (typeof this.hV == "undefined" || this.hV == null)
            throw "this.hV is null or undefined.";
          if (this.hV.length % 2 == 1)
            throw "value hex must be even length: n=" + n2.length + ",v=" + this.hV;
          var t3 = this.hV.length / 2;
          var e4 = t3.toString(16);
          if (e4.length % 2 == 1)
            e4 = "0" + e4;
          if (t3 < 128)
            return e4;
          else {
            var r3 = e4.length / 2;
            if (r3 > 15)
              throw "ASN.1 length too long to represent by 8x: n = " + t3.toString(16);
            var i3 = 128 + r3;
            return i3.toString(16) + e4;
          }
        };
        this.getEncodedHex = function() {
          if (this.hTLV == null || this.isModified) {
            this.hV = this.getFreshValueHex();
            this.hL = this.getLengthHexFromValue();
            this.hTLV = this.hT + this.hL + this.hV;
            this.isModified = false;
          }
          return this.hTLV;
        };
        this.getValueHex = function() {
          this.getEncodedHex();
          return this.hV;
        };
        this.getFreshValueHex = function() {
          return "";
        };
      };
      vt.asn1.DERAbstractString = function(t3) {
        vt.asn1.DERAbstractString.superclass.constructor.call(this);
        this.getString = function() {
          return this.s;
        };
        this.setString = function(t4) {
          this.hTLV = null;
          this.isModified = true;
          this.s = t4;
          this.hV = stohex(this.s);
        };
        this.setStringHex = function(t4) {
          this.hTLV = null;
          this.isModified = true;
          this.s = null;
          this.hV = t4;
        };
        this.getFreshValueHex = function() {
          return this.hV;
        };
        if (typeof t3 != "undefined") {
          if (typeof t3 == "string")
            this.setString(t3);
          else if (typeof t3["str"] != "undefined")
            this.setString(t3["str"]);
          else if (typeof t3["hex"] != "undefined")
            this.setStringHex(t3["hex"]);
        }
      };
      pt.lang.extend(vt.asn1.DERAbstractString, vt.asn1.ASN1Object);
      vt.asn1.DERAbstractTime = function(t3) {
        vt.asn1.DERAbstractTime.superclass.constructor.call(this);
        this.localDateToUTC = function(t4) {
          utc = t4.getTime() + 6e4 * t4.getTimezoneOffset();
          var e4 = new Date(utc);
          return e4;
        };
        this.formatDate = function(t4, e4, r3) {
          var i3 = this.zeroPadding;
          var n2 = this.localDateToUTC(t4);
          var s2 = String(n2.getFullYear());
          if (e4 == "utc")
            s2 = s2.substr(2, 2);
          var a2 = i3(String(n2.getMonth() + 1), 2);
          var o3 = i3(String(n2.getDate()), 2);
          var u2 = i3(String(n2.getHours()), 2);
          var c2 = i3(String(n2.getMinutes()), 2);
          var l2 = i3(String(n2.getSeconds()), 2);
          var f2 = s2 + a2 + o3 + u2 + c2 + l2;
          if (r3 === true) {
            var h2 = n2.getMilliseconds();
            if (h2 != 0) {
              var d2 = i3(String(h2), 3);
              d2 = d2.replace(/[0]+$/, "");
              f2 = f2 + "." + d2;
            }
          }
          return f2 + "Z";
        };
        this.zeroPadding = function(t4, e4) {
          if (t4.length >= e4)
            return t4;
          return new Array(e4 - t4.length + 1).join("0") + t4;
        };
        this.getString = function() {
          return this.s;
        };
        this.setString = function(t4) {
          this.hTLV = null;
          this.isModified = true;
          this.s = t4;
          this.hV = stohex(t4);
        };
        this.setByDateValue = function(t4, e4, r3, i3, n2, s2) {
          var a2 = new Date(Date.UTC(t4, e4 - 1, r3, i3, n2, s2, 0));
          this.setByDate(a2);
        };
        this.getFreshValueHex = function() {
          return this.hV;
        };
      };
      pt.lang.extend(vt.asn1.DERAbstractTime, vt.asn1.ASN1Object);
      vt.asn1.DERAbstractStructured = function(t3) {
        vt.asn1.DERAbstractString.superclass.constructor.call(this);
        this.setByASN1ObjectArray = function(t4) {
          this.hTLV = null;
          this.isModified = true;
          this.asn1Array = t4;
        };
        this.appendASN1Object = function(t4) {
          this.hTLV = null;
          this.isModified = true;
          this.asn1Array.push(t4);
        };
        this.asn1Array = new Array();
        if (typeof t3 != "undefined") {
          if (typeof t3["array"] != "undefined")
            this.asn1Array = t3["array"];
        }
      };
      pt.lang.extend(vt.asn1.DERAbstractStructured, vt.asn1.ASN1Object);
      vt.asn1.DERBoolean = function() {
        vt.asn1.DERBoolean.superclass.constructor.call(this);
        this.hT = "01";
        this.hTLV = "0101ff";
      };
      pt.lang.extend(vt.asn1.DERBoolean, vt.asn1.ASN1Object);
      vt.asn1.DERInteger = function(t3) {
        vt.asn1.DERInteger.superclass.constructor.call(this);
        this.hT = "02";
        this.setByBigInteger = function(t4) {
          this.hTLV = null;
          this.isModified = true;
          this.hV = vt.asn1.ASN1Util.bigIntToMinTwosComplementsHex(t4);
        };
        this.setByInteger = function(t4) {
          var e4 = new C(String(t4), 10);
          this.setByBigInteger(e4);
        };
        this.setValueHex = function(t4) {
          this.hV = t4;
        };
        this.getFreshValueHex = function() {
          return this.hV;
        };
        if (typeof t3 != "undefined") {
          if (typeof t3["bigint"] != "undefined")
            this.setByBigInteger(t3["bigint"]);
          else if (typeof t3["int"] != "undefined")
            this.setByInteger(t3["int"]);
          else if (typeof t3 == "number")
            this.setByInteger(t3);
          else if (typeof t3["hex"] != "undefined")
            this.setValueHex(t3["hex"]);
        }
      };
      pt.lang.extend(vt.asn1.DERInteger, vt.asn1.ASN1Object);
      vt.asn1.DERBitString = function(t3) {
        if (t3 !== void 0 && typeof t3.obj !== "undefined") {
          var e4 = vt.asn1.ASN1Util.newObject(t3.obj);
          t3.hex = "00" + e4.getEncodedHex();
        }
        vt.asn1.DERBitString.superclass.constructor.call(this);
        this.hT = "03";
        this.setHexValueIncludingUnusedBits = function(t4) {
          this.hTLV = null;
          this.isModified = true;
          this.hV = t4;
        };
        this.setUnusedBitsAndHexValue = function(t4, e5) {
          if (t4 < 0 || 7 < t4)
            throw "unused bits shall be from 0 to 7: u = " + t4;
          var r3 = "0" + t4;
          this.hTLV = null;
          this.isModified = true;
          this.hV = r3 + e5;
        };
        this.setByBinaryString = function(t4) {
          t4 = t4.replace(/0+$/, "");
          var e5 = 8 - t4.length % 8;
          if (e5 == 8)
            e5 = 0;
          for (var r3 = 0; r3 <= e5; r3++)
            t4 += "0";
          var i3 = "";
          for (var r3 = 0; r3 < t4.length - 1; r3 += 8) {
            var n2 = t4.substr(r3, 8);
            var s2 = parseInt(n2, 2).toString(16);
            if (s2.length == 1)
              s2 = "0" + s2;
            i3 += s2;
          }
          this.hTLV = null;
          this.isModified = true;
          this.hV = "0" + e5 + i3;
        };
        this.setByBooleanArray = function(t4) {
          var e5 = "";
          for (var r3 = 0; r3 < t4.length; r3++)
            if (t4[r3] == true)
              e5 += "1";
            else
              e5 += "0";
          this.setByBinaryString(e5);
        };
        this.newFalseArray = function(t4) {
          var e5 = new Array(t4);
          for (var r3 = 0; r3 < t4; r3++)
            e5[r3] = false;
          return e5;
        };
        this.getFreshValueHex = function() {
          return this.hV;
        };
        if (typeof t3 != "undefined") {
          if (typeof t3 == "string" && t3.toLowerCase().match(/^[0-9a-f]+$/))
            this.setHexValueIncludingUnusedBits(t3);
          else if (typeof t3["hex"] != "undefined")
            this.setHexValueIncludingUnusedBits(t3["hex"]);
          else if (typeof t3["bin"] != "undefined")
            this.setByBinaryString(t3["bin"]);
          else if (typeof t3["array"] != "undefined")
            this.setByBooleanArray(t3["array"]);
        }
      };
      pt.lang.extend(vt.asn1.DERBitString, vt.asn1.ASN1Object);
      vt.asn1.DEROctetString = function(t3) {
        if (t3 !== void 0 && typeof t3.obj !== "undefined") {
          var e4 = vt.asn1.ASN1Util.newObject(t3.obj);
          t3.hex = e4.getEncodedHex();
        }
        vt.asn1.DEROctetString.superclass.constructor.call(this, t3);
        this.hT = "04";
      };
      pt.lang.extend(vt.asn1.DEROctetString, vt.asn1.DERAbstractString);
      vt.asn1.DERNull = function() {
        vt.asn1.DERNull.superclass.constructor.call(this);
        this.hT = "05";
        this.hTLV = "0500";
      };
      pt.lang.extend(vt.asn1.DERNull, vt.asn1.ASN1Object);
      vt.asn1.DERObjectIdentifier = function(t3) {
        var e4 = function(t4) {
          var e5 = t4.toString(16);
          if (e5.length == 1)
            e5 = "0" + e5;
          return e5;
        };
        var r3 = function(t4) {
          var r4 = "";
          var i3 = new C(t4, 10);
          var n2 = i3.toString(2);
          var s2 = 7 - n2.length % 7;
          if (s2 == 7)
            s2 = 0;
          var a2 = "";
          for (var o3 = 0; o3 < s2; o3++)
            a2 += "0";
          n2 = a2 + n2;
          for (var o3 = 0; o3 < n2.length - 1; o3 += 7) {
            var u2 = n2.substr(o3, 7);
            if (o3 != n2.length - 7)
              u2 = "1" + u2;
            r4 += e4(parseInt(u2, 2));
          }
          return r4;
        };
        vt.asn1.DERObjectIdentifier.superclass.constructor.call(this);
        this.hT = "06";
        this.setValueHex = function(t4) {
          this.hTLV = null;
          this.isModified = true;
          this.s = null;
          this.hV = t4;
        };
        this.setValueOidString = function(t4) {
          if (!t4.match(/^[0-9.]+$/))
            throw "malformed oid string: " + t4;
          var i3 = "";
          var n2 = t4.split(".");
          var s2 = 40 * parseInt(n2[0]) + parseInt(n2[1]);
          i3 += e4(s2);
          n2.splice(0, 2);
          for (var a2 = 0; a2 < n2.length; a2++)
            i3 += r3(n2[a2]);
          this.hTLV = null;
          this.isModified = true;
          this.s = null;
          this.hV = i3;
        };
        this.setValueName = function(t4) {
          var e5 = vt.asn1.x509.OID.name2oid(t4);
          if (e5 !== "")
            this.setValueOidString(e5);
          else
            throw "DERObjectIdentifier oidName undefined: " + t4;
        };
        this.getFreshValueHex = function() {
          return this.hV;
        };
        if (t3 !== void 0) {
          if (typeof t3 === "string")
            if (t3.match(/^[0-2].[0-9.]+$/))
              this.setValueOidString(t3);
            else
              this.setValueName(t3);
          else if (t3.oid !== void 0)
            this.setValueOidString(t3.oid);
          else if (t3.hex !== void 0)
            this.setValueHex(t3.hex);
          else if (t3.name !== void 0)
            this.setValueName(t3.name);
        }
      };
      pt.lang.extend(vt.asn1.DERObjectIdentifier, vt.asn1.ASN1Object);
      vt.asn1.DEREnumerated = function(t3) {
        vt.asn1.DEREnumerated.superclass.constructor.call(this);
        this.hT = "0a";
        this.setByBigInteger = function(t4) {
          this.hTLV = null;
          this.isModified = true;
          this.hV = vt.asn1.ASN1Util.bigIntToMinTwosComplementsHex(t4);
        };
        this.setByInteger = function(t4) {
          var e4 = new C(String(t4), 10);
          this.setByBigInteger(e4);
        };
        this.setValueHex = function(t4) {
          this.hV = t4;
        };
        this.getFreshValueHex = function() {
          return this.hV;
        };
        if (typeof t3 != "undefined") {
          if (typeof t3["int"] != "undefined")
            this.setByInteger(t3["int"]);
          else if (typeof t3 == "number")
            this.setByInteger(t3);
          else if (typeof t3["hex"] != "undefined")
            this.setValueHex(t3["hex"]);
        }
      };
      pt.lang.extend(vt.asn1.DEREnumerated, vt.asn1.ASN1Object);
      vt.asn1.DERUTF8String = function(t3) {
        vt.asn1.DERUTF8String.superclass.constructor.call(this, t3);
        this.hT = "0c";
      };
      pt.lang.extend(vt.asn1.DERUTF8String, vt.asn1.DERAbstractString);
      vt.asn1.DERNumericString = function(t3) {
        vt.asn1.DERNumericString.superclass.constructor.call(this, t3);
        this.hT = "12";
      };
      pt.lang.extend(vt.asn1.DERNumericString, vt.asn1.DERAbstractString);
      vt.asn1.DERPrintableString = function(t3) {
        vt.asn1.DERPrintableString.superclass.constructor.call(this, t3);
        this.hT = "13";
      };
      pt.lang.extend(vt.asn1.DERPrintableString, vt.asn1.DERAbstractString);
      vt.asn1.DERTeletexString = function(t3) {
        vt.asn1.DERTeletexString.superclass.constructor.call(this, t3);
        this.hT = "14";
      };
      pt.lang.extend(vt.asn1.DERTeletexString, vt.asn1.DERAbstractString);
      vt.asn1.DERIA5String = function(t3) {
        vt.asn1.DERIA5String.superclass.constructor.call(this, t3);
        this.hT = "16";
      };
      pt.lang.extend(vt.asn1.DERIA5String, vt.asn1.DERAbstractString);
      vt.asn1.DERUTCTime = function(t3) {
        vt.asn1.DERUTCTime.superclass.constructor.call(this, t3);
        this.hT = "17";
        this.setByDate = function(t4) {
          this.hTLV = null;
          this.isModified = true;
          this.date = t4;
          this.s = this.formatDate(this.date, "utc");
          this.hV = stohex(this.s);
        };
        this.getFreshValueHex = function() {
          if (typeof this.date == "undefined" && typeof this.s == "undefined") {
            this.date = new Date();
            this.s = this.formatDate(this.date, "utc");
            this.hV = stohex(this.s);
          }
          return this.hV;
        };
        if (t3 !== void 0) {
          if (t3.str !== void 0)
            this.setString(t3.str);
          else if (typeof t3 == "string" && t3.match(/^[0-9]{12}Z$/))
            this.setString(t3);
          else if (t3.hex !== void 0)
            this.setStringHex(t3.hex);
          else if (t3.date !== void 0)
            this.setByDate(t3.date);
        }
      };
      pt.lang.extend(vt.asn1.DERUTCTime, vt.asn1.DERAbstractTime);
      vt.asn1.DERGeneralizedTime = function(t3) {
        vt.asn1.DERGeneralizedTime.superclass.constructor.call(this, t3);
        this.hT = "18";
        this.withMillis = false;
        this.setByDate = function(t4) {
          this.hTLV = null;
          this.isModified = true;
          this.date = t4;
          this.s = this.formatDate(this.date, "gen", this.withMillis);
          this.hV = stohex(this.s);
        };
        this.getFreshValueHex = function() {
          if (this.date === void 0 && this.s === void 0) {
            this.date = new Date();
            this.s = this.formatDate(this.date, "gen", this.withMillis);
            this.hV = stohex(this.s);
          }
          return this.hV;
        };
        if (t3 !== void 0) {
          if (t3.str !== void 0)
            this.setString(t3.str);
          else if (typeof t3 == "string" && t3.match(/^[0-9]{14}Z$/))
            this.setString(t3);
          else if (t3.hex !== void 0)
            this.setStringHex(t3.hex);
          else if (t3.date !== void 0)
            this.setByDate(t3.date);
          if (t3.millis === true)
            this.withMillis = true;
        }
      };
      pt.lang.extend(vt.asn1.DERGeneralizedTime, vt.asn1.DERAbstractTime);
      vt.asn1.DERSequence = function(t3) {
        vt.asn1.DERSequence.superclass.constructor.call(this, t3);
        this.hT = "30";
        this.getFreshValueHex = function() {
          var t4 = "";
          for (var e4 = 0; e4 < this.asn1Array.length; e4++) {
            var r3 = this.asn1Array[e4];
            t4 += r3.getEncodedHex();
          }
          this.hV = t4;
          return this.hV;
        };
      };
      pt.lang.extend(vt.asn1.DERSequence, vt.asn1.DERAbstractStructured);
      vt.asn1.DERSet = function(t3) {
        vt.asn1.DERSet.superclass.constructor.call(this, t3);
        this.hT = "31";
        this.sortFlag = true;
        this.getFreshValueHex = function() {
          var t4 = new Array();
          for (var e4 = 0; e4 < this.asn1Array.length; e4++) {
            var r3 = this.asn1Array[e4];
            t4.push(r3.getEncodedHex());
          }
          if (this.sortFlag == true)
            t4.sort();
          this.hV = t4.join("");
          return this.hV;
        };
        if (typeof t3 != "undefined") {
          if (typeof t3.sortflag != "undefined" && t3.sortflag == false)
            this.sortFlag = false;
        }
      };
      pt.lang.extend(vt.asn1.DERSet, vt.asn1.DERAbstractStructured);
      vt.asn1.DERTaggedObject = function(t3) {
        vt.asn1.DERTaggedObject.superclass.constructor.call(this);
        this.hT = "a0";
        this.hV = "";
        this.isExplicit = true;
        this.asn1Object = null;
        this.setASN1Object = function(t4, e4, r3) {
          this.hT = e4;
          this.isExplicit = t4;
          this.asn1Object = r3;
          if (this.isExplicit) {
            this.hV = this.asn1Object.getEncodedHex();
            this.hTLV = null;
            this.isModified = true;
          } else {
            this.hV = null;
            this.hTLV = r3.getEncodedHex();
            this.hTLV = this.hTLV.replace(/^../, e4);
            this.isModified = false;
          }
        };
        this.getFreshValueHex = function() {
          return this.hV;
        };
        if (typeof t3 != "undefined") {
          if (typeof t3["tag"] != "undefined")
            this.hT = t3["tag"];
          if (typeof t3["explicit"] != "undefined")
            this.isExplicit = t3["explicit"];
          if (typeof t3["obj"] != "undefined") {
            this.asn1Object = t3["obj"];
            this.setASN1Object(this.isExplicit, this.hT, this.asn1Object);
          }
        }
      };
      pt.lang.extend(vt.asn1.DERTaggedObject, vt.asn1.ASN1Object);
      var gt = function() {
        var t3 = function(e4, r3) {
          t3 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t4, e5) {
            t4.__proto__ = e5;
          } || function(t4, e5) {
            for (var r4 in e5)
              if (Object.prototype.hasOwnProperty.call(e5, r4))
                t4[r4] = e5[r4];
          };
          return t3(e4, r3);
        };
        return function(e4, r3) {
          if (typeof r3 !== "function" && r3 !== null)
            throw new TypeError("Class extends value " + String(r3) + " is not a constructor or null");
          t3(e4, r3);
          function i3() {
            this.constructor = e4;
          }
          e4.prototype = r3 === null ? Object.create(r3) : (i3.prototype = r3.prototype, new i3());
        };
      }();
      var yt = function(t3) {
        gt(e4, t3);
        function e4(r3) {
          var i3 = t3.call(this) || this;
          if (r3) {
            if (typeof r3 === "string")
              i3.parseKey(r3);
            else if (e4.hasPrivateKeyProperty(r3) || e4.hasPublicKeyProperty(r3))
              i3.parsePropertiesFrom(r3);
          }
          return i3;
        }
        e4.prototype.parseKey = function(t4) {
          try {
            var e5 = 0;
            var r3 = 0;
            var i3 = /^\s*(?:[0-9A-Fa-f][0-9A-Fa-f]\s*)+$/;
            var n2 = i3.test(t4) ? y.decode(t4) : w.unarmor(t4);
            var s2 = I.decode(n2);
            if (s2.sub.length === 3)
              s2 = s2.sub[2].sub[0];
            if (s2.sub.length === 9) {
              e5 = s2.sub[1].getHexStringValue();
              this.n = K(e5, 16);
              r3 = s2.sub[2].getHexStringValue();
              this.e = parseInt(r3, 16);
              var a2 = s2.sub[3].getHexStringValue();
              this.d = K(a2, 16);
              var o3 = s2.sub[4].getHexStringValue();
              this.p = K(o3, 16);
              var u2 = s2.sub[5].getHexStringValue();
              this.q = K(u2, 16);
              var c2 = s2.sub[6].getHexStringValue();
              this.dmp1 = K(c2, 16);
              var l2 = s2.sub[7].getHexStringValue();
              this.dmq1 = K(l2, 16);
              var f2 = s2.sub[8].getHexStringValue();
              this.coeff = K(f2, 16);
            } else if (s2.sub.length === 2) {
              var h2 = s2.sub[1];
              var d2 = h2.sub[0];
              e5 = d2.sub[0].getHexStringValue();
              this.n = K(e5, 16);
              r3 = d2.sub[1].getHexStringValue();
              this.e = parseInt(r3, 16);
            } else
              return false;
            return true;
          } catch (t5) {
            return false;
          }
        };
        e4.prototype.getPrivateBaseKey = function() {
          var t4 = { array: [new vt.asn1.DERInteger({ int: 0 }), new vt.asn1.DERInteger({ bigint: this.n }), new vt.asn1.DERInteger({ int: this.e }), new vt.asn1.DERInteger({ bigint: this.d }), new vt.asn1.DERInteger({ bigint: this.p }), new vt.asn1.DERInteger({ bigint: this.q }), new vt.asn1.DERInteger({ bigint: this.dmp1 }), new vt.asn1.DERInteger({ bigint: this.dmq1 }), new vt.asn1.DERInteger({ bigint: this.coeff })] };
          var e5 = new vt.asn1.DERSequence(t4);
          return e5.getEncodedHex();
        };
        e4.prototype.getPrivateBaseKeyB64 = function() {
          return d(this.getPrivateBaseKey());
        };
        e4.prototype.getPublicBaseKey = function() {
          var t4 = new vt.asn1.DERSequence({ array: [new vt.asn1.DERObjectIdentifier({ oid: "1.2.840.113549.1.1.1" }), new vt.asn1.DERNull()] });
          var e5 = new vt.asn1.DERSequence({ array: [new vt.asn1.DERInteger({ bigint: this.n }), new vt.asn1.DERInteger({ int: this.e })] });
          var r3 = new vt.asn1.DERBitString({ hex: "00" + e5.getEncodedHex() });
          var i3 = new vt.asn1.DERSequence({ array: [t4, r3] });
          return i3.getEncodedHex();
        };
        e4.prototype.getPublicBaseKeyB64 = function() {
          return d(this.getPublicBaseKey());
        };
        e4.wordwrap = function(t4, e5) {
          e5 = e5 || 64;
          if (!t4)
            return t4;
          var r3 = "(.{1," + e5 + "})( +|$\n?)|(.{1," + e5 + "})";
          return t4.match(RegExp(r3, "g")).join("\n");
        };
        e4.prototype.getPrivateKey = function() {
          var t4 = "-----BEGIN RSA PRIVATE KEY-----\n";
          t4 += e4.wordwrap(this.getPrivateBaseKeyB64()) + "\n";
          t4 += "-----END RSA PRIVATE KEY-----";
          return t4;
        };
        e4.prototype.getPublicKey = function() {
          var t4 = "-----BEGIN PUBLIC KEY-----\n";
          t4 += e4.wordwrap(this.getPublicBaseKeyB64()) + "\n";
          t4 += "-----END PUBLIC KEY-----";
          return t4;
        };
        e4.hasPublicKeyProperty = function(t4) {
          t4 = t4 || {};
          return t4.hasOwnProperty("n") && t4.hasOwnProperty("e");
        };
        e4.hasPrivateKeyProperty = function(t4) {
          t4 = t4 || {};
          return t4.hasOwnProperty("n") && t4.hasOwnProperty("e") && t4.hasOwnProperty("d") && t4.hasOwnProperty("p") && t4.hasOwnProperty("q") && t4.hasOwnProperty("dmp1") && t4.hasOwnProperty("dmq1") && t4.hasOwnProperty("coeff");
        };
        e4.prototype.parsePropertiesFrom = function(t4) {
          this.n = t4.n;
          this.e = t4.e;
          if (t4.hasOwnProperty("d")) {
            this.d = t4.d;
            this.p = t4.p;
            this.q = t4.q;
            this.dmp1 = t4.dmp1;
            this.dmq1 = t4.dmq1;
            this.coeff = t4.coeff;
          }
        };
        return e4;
      }(ut);
      const mt = { i: "3.2.1" };
      var wt = function() {
        function t3(t4) {
          if (t4 === void 0)
            t4 = {};
          t4 = t4 || {};
          this.default_key_size = t4.default_key_size ? parseInt(t4.default_key_size, 10) : 1024;
          this.default_public_exponent = t4.default_public_exponent || "010001";
          this.log = t4.log || false;
          this.key = null;
        }
        t3.prototype.setKey = function(t4) {
          if (this.log && this.key)
            console.warn("A key was already set, overriding existing.");
          this.key = new yt(t4);
        };
        t3.prototype.setPrivateKey = function(t4) {
          this.setKey(t4);
        };
        t3.prototype.setPublicKey = function(t4) {
          this.setKey(t4);
        };
        t3.prototype.decrypt = function(t4) {
          try {
            return this.getKey().decrypt(p(t4));
          } catch (t5) {
            return false;
          }
        };
        t3.prototype.encrypt = function(t4) {
          try {
            return this.getKey().encrypt(t4);
          } catch (t5) {
            return false;
          }
        };
        t3.prototype.encryptLong = function(t4) {
          try {
            return d(this.getKey().encryptLong(t4));
          } catch (t5) {
            return false;
          }
        };
        t3.prototype.decryptLong = function(t4) {
          try {
            return this.getKey().decryptLong(t4);
          } catch (t5) {
            return false;
          }
        };
        t3.prototype.sign = function(t4, e4, r3) {
          try {
            return d(this.getKey().sign(t4, e4, r3));
          } catch (t5) {
            return false;
          }
        };
        t3.prototype.verify = function(t4, e4, r3) {
          try {
            return this.getKey().verify(t4, p(e4), r3);
          } catch (t5) {
            return false;
          }
        };
        t3.prototype.getKey = function(t4) {
          if (!this.key) {
            this.key = new yt();
            if (t4 && {}.toString.call(t4) === "[object Function]") {
              this.key.generateAsync(this.default_key_size, this.default_public_exponent, t4);
              return;
            }
            this.key.generate(this.default_key_size, this.default_public_exponent);
          }
          return this.key;
        };
        t3.prototype.getPrivateKey = function() {
          return this.getKey().getPrivateKey();
        };
        t3.prototype.getPrivateKeyB64 = function() {
          return this.getKey().getPrivateBaseKeyB64();
        };
        t3.prototype.getPublicKey = function() {
          return this.getKey().getPublicKey();
        };
        t3.prototype.getPublicKeyB64 = function() {
          return this.getKey().getPublicBaseKeyB64();
        };
        t3.version = mt.i;
        return t3;
      }();
      const St = wt;
    }, 2480: () => {
    } };
    var e2 = {};
    function r(i2) {
      var n = e2[i2];
      if (n !== void 0)
        return n.exports;
      var s = e2[i2] = { id: i2, loaded: false, exports: {} };
      t[i2].call(s.exports, s, s.exports, r);
      s.loaded = true;
      return s.exports;
    }
    (() => {
      r.d = (t2, e3) => {
        for (var i2 in e3)
          if (r.o(e3, i2) && !r.o(t2, i2))
            Object.defineProperty(t2, i2, { enumerable: true, get: e3[i2] });
      };
    })();
    (() => {
      r.g = function() {
        if (typeof globalThis === "object")
          return globalThis;
        try {
          return this || new Function("return this")();
        } catch (t2) {
          if (typeof window === "object")
            return window;
        }
      }();
    })();
    (() => {
      r.o = (t2, e3) => Object.prototype.hasOwnProperty.call(t2, e3);
    })();
    (() => {
      r.r = (t2) => {
        if (typeof Symbol !== "undefined" && Symbol.toStringTag)
          Object.defineProperty(t2, Symbol.toStringTag, { value: "Module" });
        Object.defineProperty(t2, "__esModule", { value: true });
      };
    })();
    (() => {
      r.nmd = (t2) => {
        t2.paths = [];
        if (!t2.children)
          t2.children = [];
        return t2;
      };
    })();
    var i = r(5987);
    return i;
  })());
});
var GtPush = /* @__PURE__ */ getDefaultExportFromCjs(gtpushMin);
index.invokePushCallback({
  type: "enabled"
});
const appid = "__UNI__250724A";
{
  GtPush.init({
    appid,
    onError: (res) => {
      console.error(res.error);
      index.invokePushCallback({
        type: "clientId",
        cid: "",
        errMsg: res.error
      });
    },
    onClientId: (res) => {
      index.invokePushCallback({
        type: "clientId",
        cid: res.cid
      });
    },
    onlineState: (res) => {
      index.invokePushCallback({
        type: "lineState",
        online: res.online
      });
    },
    onPushMsg: (res) => {
      index.invokePushCallback({
        type: "pushMsg",
        message: res.message
      });
    }
  });
}
exports._export_sfc = _export_sfc;
exports.createSSRApp = createSSRApp;
exports.e = e;
exports.index = index;
exports.o = o;
exports.resolveComponent = resolveComponent;
