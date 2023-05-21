import {
  __commonJS,
  __esm,
  __export,
  __reExport,
  __require,
  __toCommonJS,
  __toESM
} from "./chunk-JZQ37OGZ.js";

// node_modules/.pnpm/events@3.3.0/node_modules/events/events.js
var require_events = __commonJS({
  "node_modules/.pnpm/events@3.3.0/node_modules/events/events.js"(exports, module) {
    "use strict";
    var R2 = typeof Reflect === "object" ? Reflect : null;
    var ReflectApply = R2 && typeof R2.apply === "function" ? R2.apply : function ReflectApply2(target, receiver, args) {
      return Function.prototype.apply.call(target, receiver, args);
    };
    var ReflectOwnKeys;
    if (R2 && typeof R2.ownKeys === "function") {
      ReflectOwnKeys = R2.ownKeys;
    } else if (Object.getOwnPropertySymbols) {
      ReflectOwnKeys = function ReflectOwnKeys2(target) {
        return Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target));
      };
    } else {
      ReflectOwnKeys = function ReflectOwnKeys2(target) {
        return Object.getOwnPropertyNames(target);
      };
    }
    function ProcessEmitWarning(warning) {
      if (console && console.warn)
        console.warn(warning);
    }
    var NumberIsNaN = Number.isNaN || function NumberIsNaN2(value) {
      return value !== value;
    };
    function EventEmitter3() {
      EventEmitter3.init.call(this);
    }
    module.exports = EventEmitter3;
    module.exports.once = once;
    EventEmitter3.EventEmitter = EventEmitter3;
    EventEmitter3.prototype._events = void 0;
    EventEmitter3.prototype._eventsCount = 0;
    EventEmitter3.prototype._maxListeners = void 0;
    var defaultMaxListeners = 10;
    function checkListener(listener) {
      if (typeof listener !== "function") {
        throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
      }
    }
    Object.defineProperty(EventEmitter3, "defaultMaxListeners", {
      enumerable: true,
      get: function() {
        return defaultMaxListeners;
      },
      set: function(arg) {
        if (typeof arg !== "number" || arg < 0 || NumberIsNaN(arg)) {
          throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + ".");
        }
        defaultMaxListeners = arg;
      }
    });
    EventEmitter3.init = function() {
      if (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) {
        this._events = /* @__PURE__ */ Object.create(null);
        this._eventsCount = 0;
      }
      this._maxListeners = this._maxListeners || void 0;
    };
    EventEmitter3.prototype.setMaxListeners = function setMaxListeners(n2) {
      if (typeof n2 !== "number" || n2 < 0 || NumberIsNaN(n2)) {
        throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n2 + ".");
      }
      this._maxListeners = n2;
      return this;
    };
    function _getMaxListeners(that) {
      if (that._maxListeners === void 0)
        return EventEmitter3.defaultMaxListeners;
      return that._maxListeners;
    }
    EventEmitter3.prototype.getMaxListeners = function getMaxListeners() {
      return _getMaxListeners(this);
    };
    EventEmitter3.prototype.emit = function emit(type) {
      var args = [];
      for (var i2 = 1; i2 < arguments.length; i2++)
        args.push(arguments[i2]);
      var doError = type === "error";
      var events = this._events;
      if (events !== void 0)
        doError = doError && events.error === void 0;
      else if (!doError)
        return false;
      if (doError) {
        var er2;
        if (args.length > 0)
          er2 = args[0];
        if (er2 instanceof Error) {
          throw er2;
        }
        var err = new Error("Unhandled error." + (er2 ? " (" + er2.message + ")" : ""));
        err.context = er2;
        throw err;
      }
      var handler = events[type];
      if (handler === void 0)
        return false;
      if (typeof handler === "function") {
        ReflectApply(handler, this, args);
      } else {
        var len = handler.length;
        var listeners = arrayClone(handler, len);
        for (var i2 = 0; i2 < len; ++i2)
          ReflectApply(listeners[i2], this, args);
      }
      return true;
    };
    function _addListener(target, type, listener, prepend) {
      var m4;
      var events;
      var existing;
      checkListener(listener);
      events = target._events;
      if (events === void 0) {
        events = target._events = /* @__PURE__ */ Object.create(null);
        target._eventsCount = 0;
      } else {
        if (events.newListener !== void 0) {
          target.emit(
            "newListener",
            type,
            listener.listener ? listener.listener : listener
          );
          events = target._events;
        }
        existing = events[type];
      }
      if (existing === void 0) {
        existing = events[type] = listener;
        ++target._eventsCount;
      } else {
        if (typeof existing === "function") {
          existing = events[type] = prepend ? [listener, existing] : [existing, listener];
        } else if (prepend) {
          existing.unshift(listener);
        } else {
          existing.push(listener);
        }
        m4 = _getMaxListeners(target);
        if (m4 > 0 && existing.length > m4 && !existing.warned) {
          existing.warned = true;
          var w2 = new Error("Possible EventEmitter memory leak detected. " + existing.length + " " + String(type) + " listeners added. Use emitter.setMaxListeners() to increase limit");
          w2.name = "MaxListenersExceededWarning";
          w2.emitter = target;
          w2.type = type;
          w2.count = existing.length;
          ProcessEmitWarning(w2);
        }
      }
      return target;
    }
    EventEmitter3.prototype.addListener = function addListener(type, listener) {
      return _addListener(this, type, listener, false);
    };
    EventEmitter3.prototype.on = EventEmitter3.prototype.addListener;
    EventEmitter3.prototype.prependListener = function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };
    function onceWrapper() {
      if (!this.fired) {
        this.target.removeListener(this.type, this.wrapFn);
        this.fired = true;
        if (arguments.length === 0)
          return this.listener.call(this.target);
        return this.listener.apply(this.target, arguments);
      }
    }
    function _onceWrap(target, type, listener) {
      var state = { fired: false, wrapFn: void 0, target, type, listener };
      var wrapped = onceWrapper.bind(state);
      wrapped.listener = listener;
      state.wrapFn = wrapped;
      return wrapped;
    }
    EventEmitter3.prototype.once = function once2(type, listener) {
      checkListener(listener);
      this.on(type, _onceWrap(this, type, listener));
      return this;
    };
    EventEmitter3.prototype.prependOnceListener = function prependOnceListener(type, listener) {
      checkListener(listener);
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };
    EventEmitter3.prototype.removeListener = function removeListener(type, listener) {
      var list, events, position, i2, originalListener;
      checkListener(listener);
      events = this._events;
      if (events === void 0)
        return this;
      list = events[type];
      if (list === void 0)
        return this;
      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = /* @__PURE__ */ Object.create(null);
        else {
          delete events[type];
          if (events.removeListener)
            this.emit("removeListener", type, list.listener || listener);
        }
      } else if (typeof list !== "function") {
        position = -1;
        for (i2 = list.length - 1; i2 >= 0; i2--) {
          if (list[i2] === listener || list[i2].listener === listener) {
            originalListener = list[i2].listener;
            position = i2;
            break;
          }
        }
        if (position < 0)
          return this;
        if (position === 0)
          list.shift();
        else {
          spliceOne(list, position);
        }
        if (list.length === 1)
          events[type] = list[0];
        if (events.removeListener !== void 0)
          this.emit("removeListener", type, originalListener || listener);
      }
      return this;
    };
    EventEmitter3.prototype.off = EventEmitter3.prototype.removeListener;
    EventEmitter3.prototype.removeAllListeners = function removeAllListeners(type) {
      var listeners, events, i2;
      events = this._events;
      if (events === void 0)
        return this;
      if (events.removeListener === void 0) {
        if (arguments.length === 0) {
          this._events = /* @__PURE__ */ Object.create(null);
          this._eventsCount = 0;
        } else if (events[type] !== void 0) {
          if (--this._eventsCount === 0)
            this._events = /* @__PURE__ */ Object.create(null);
          else
            delete events[type];
        }
        return this;
      }
      if (arguments.length === 0) {
        var keys = Object.keys(events);
        var key;
        for (i2 = 0; i2 < keys.length; ++i2) {
          key = keys[i2];
          if (key === "removeListener")
            continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners("removeListener");
        this._events = /* @__PURE__ */ Object.create(null);
        this._eventsCount = 0;
        return this;
      }
      listeners = events[type];
      if (typeof listeners === "function") {
        this.removeListener(type, listeners);
      } else if (listeners !== void 0) {
        for (i2 = listeners.length - 1; i2 >= 0; i2--) {
          this.removeListener(type, listeners[i2]);
        }
      }
      return this;
    };
    function _listeners(target, type, unwrap) {
      var events = target._events;
      if (events === void 0)
        return [];
      var evlistener = events[type];
      if (evlistener === void 0)
        return [];
      if (typeof evlistener === "function")
        return unwrap ? [evlistener.listener || evlistener] : [evlistener];
      return unwrap ? unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
    }
    EventEmitter3.prototype.listeners = function listeners(type) {
      return _listeners(this, type, true);
    };
    EventEmitter3.prototype.rawListeners = function rawListeners(type) {
      return _listeners(this, type, false);
    };
    EventEmitter3.listenerCount = function(emitter, type) {
      if (typeof emitter.listenerCount === "function") {
        return emitter.listenerCount(type);
      } else {
        return listenerCount.call(emitter, type);
      }
    };
    EventEmitter3.prototype.listenerCount = listenerCount;
    function listenerCount(type) {
      var events = this._events;
      if (events !== void 0) {
        var evlistener = events[type];
        if (typeof evlistener === "function") {
          return 1;
        } else if (evlistener !== void 0) {
          return evlistener.length;
        }
      }
      return 0;
    }
    EventEmitter3.prototype.eventNames = function eventNames() {
      return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
    };
    function arrayClone(arr, n2) {
      var copy = new Array(n2);
      for (var i2 = 0; i2 < n2; ++i2)
        copy[i2] = arr[i2];
      return copy;
    }
    function spliceOne(list, index) {
      for (; index + 1 < list.length; index++)
        list[index] = list[index + 1];
      list.pop();
    }
    function unwrapListeners(arr) {
      var ret = new Array(arr.length);
      for (var i2 = 0; i2 < ret.length; ++i2) {
        ret[i2] = arr[i2].listener || arr[i2];
      }
      return ret;
    }
    function once(emitter, name2) {
      return new Promise(function(resolve, reject) {
        function errorListener(err) {
          emitter.removeListener(name2, resolver);
          reject(err);
        }
        function resolver() {
          if (typeof emitter.removeListener === "function") {
            emitter.removeListener("error", errorListener);
          }
          resolve([].slice.call(arguments));
        }
        ;
        eventTargetAgnosticAddListener(emitter, name2, resolver, { once: true });
        if (name2 !== "error") {
          addErrorHandlerIfEventEmitter(emitter, errorListener, { once: true });
        }
      });
    }
    function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
      if (typeof emitter.on === "function") {
        eventTargetAgnosticAddListener(emitter, "error", handler, flags);
      }
    }
    function eventTargetAgnosticAddListener(emitter, name2, listener, flags) {
      if (typeof emitter.on === "function") {
        if (flags.once) {
          emitter.once(name2, listener);
        } else {
          emitter.on(name2, listener);
        }
      } else if (typeof emitter.addEventListener === "function") {
        emitter.addEventListener(name2, function wrapListener(arg) {
          if (flags.once) {
            emitter.removeEventListener(name2, wrapListener);
          }
          listener(arg);
        });
      } else {
        throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
      }
    }
  }
});

// node_modules/.pnpm/tslib@1.14.1/node_modules/tslib/tslib.js
var require_tslib = __commonJS({
  "node_modules/.pnpm/tslib@1.14.1/node_modules/tslib/tslib.js"(exports, module) {
    var __extends;
    var __assign;
    var __rest;
    var __decorate;
    var __param;
    var __metadata;
    var __awaiter;
    var __generator;
    var __exportStar;
    var __values;
    var __read;
    var __spread;
    var __spreadArrays;
    var __await;
    var __asyncGenerator;
    var __asyncDelegator;
    var __asyncValues;
    var __makeTemplateObject;
    var __importStar;
    var __importDefault;
    var __classPrivateFieldGet;
    var __classPrivateFieldSet;
    var __createBinding;
    (function(factory) {
      var root = typeof global === "object" ? global : typeof self === "object" ? self : typeof this === "object" ? this : {};
      if (typeof define === "function" && define.amd) {
        define("tslib", ["exports"], function(exports2) {
          factory(createExporter(root, createExporter(exports2)));
        });
      } else if (typeof module === "object" && typeof module.exports === "object") {
        factory(createExporter(root, createExporter(module.exports)));
      } else {
        factory(createExporter(root));
      }
      function createExporter(exports2, previous) {
        if (exports2 !== root) {
          if (typeof Object.create === "function") {
            Object.defineProperty(exports2, "__esModule", { value: true });
          } else {
            exports2.__esModule = true;
          }
        }
        return function(id, v) {
          return exports2[id] = previous ? previous(id, v) : v;
        };
      }
    })(function(exporter) {
      var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b4) {
        d2.__proto__ = b4;
      } || function(d2, b4) {
        for (var p3 in b4)
          if (b4.hasOwnProperty(p3))
            d2[p3] = b4[p3];
      };
      __extends = function(d2, b4) {
        extendStatics(d2, b4);
        function __() {
          this.constructor = d2;
        }
        d2.prototype = b4 === null ? Object.create(b4) : (__.prototype = b4.prototype, new __());
      };
      __assign = Object.assign || function(t) {
        for (var s, i2 = 1, n2 = arguments.length; i2 < n2; i2++) {
          s = arguments[i2];
          for (var p3 in s)
            if (Object.prototype.hasOwnProperty.call(s, p3))
              t[p3] = s[p3];
        }
        return t;
      };
      __rest = function(s, e) {
        var t = {};
        for (var p3 in s)
          if (Object.prototype.hasOwnProperty.call(s, p3) && e.indexOf(p3) < 0)
            t[p3] = s[p3];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
          for (var i2 = 0, p3 = Object.getOwnPropertySymbols(s); i2 < p3.length; i2++) {
            if (e.indexOf(p3[i2]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p3[i2]))
              t[p3[i2]] = s[p3[i2]];
          }
        return t;
      };
      __decorate = function(decorators, target, key, desc) {
        var c2 = arguments.length, r = c2 < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d2;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
          r = Reflect.decorate(decorators, target, key, desc);
        else
          for (var i2 = decorators.length - 1; i2 >= 0; i2--)
            if (d2 = decorators[i2])
              r = (c2 < 3 ? d2(r) : c2 > 3 ? d2(target, key, r) : d2(target, key)) || r;
        return c2 > 3 && r && Object.defineProperty(target, key, r), r;
      };
      __param = function(paramIndex, decorator) {
        return function(target, key) {
          decorator(target, key, paramIndex);
        };
      };
      __metadata = function(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
          return Reflect.metadata(metadataKey, metadataValue);
      };
      __awaiter = function(thisArg, _arguments, P2, generator) {
        function adopt(value) {
          return value instanceof P2 ? value : new P2(function(resolve) {
            resolve(value);
          });
        }
        return new (P2 || (P2 = Promise))(function(resolve, reject) {
          function fulfilled(value) {
            try {
              step(generator.next(value));
            } catch (e) {
              reject(e);
            }
          }
          function rejected(value) {
            try {
              step(generator["throw"](value));
            } catch (e) {
              reject(e);
            }
          }
          function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
          }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
      };
      __generator = function(thisArg, body) {
        var _2 = { label: 0, sent: function() {
          if (t[0] & 1)
            throw t[1];
          return t[1];
        }, trys: [], ops: [] }, f3, y2, t, g2;
        return g2 = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g2[Symbol.iterator] = function() {
          return this;
        }), g2;
        function verb(n2) {
          return function(v) {
            return step([n2, v]);
          };
        }
        function step(op) {
          if (f3)
            throw new TypeError("Generator is already executing.");
          while (_2)
            try {
              if (f3 = 1, y2 && (t = op[0] & 2 ? y2["return"] : op[0] ? y2["throw"] || ((t = y2["return"]) && t.call(y2), 0) : y2.next) && !(t = t.call(y2, op[1])).done)
                return t;
              if (y2 = 0, t)
                op = [op[0] & 2, t.value];
              switch (op[0]) {
                case 0:
                case 1:
                  t = op;
                  break;
                case 4:
                  _2.label++;
                  return { value: op[1], done: false };
                case 5:
                  _2.label++;
                  y2 = op[1];
                  op = [0];
                  continue;
                case 7:
                  op = _2.ops.pop();
                  _2.trys.pop();
                  continue;
                default:
                  if (!(t = _2.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                    _2 = 0;
                    continue;
                  }
                  if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                    _2.label = op[1];
                    break;
                  }
                  if (op[0] === 6 && _2.label < t[1]) {
                    _2.label = t[1];
                    t = op;
                    break;
                  }
                  if (t && _2.label < t[2]) {
                    _2.label = t[2];
                    _2.ops.push(op);
                    break;
                  }
                  if (t[2])
                    _2.ops.pop();
                  _2.trys.pop();
                  continue;
              }
              op = body.call(thisArg, _2);
            } catch (e) {
              op = [6, e];
              y2 = 0;
            } finally {
              f3 = t = 0;
            }
          if (op[0] & 5)
            throw op[1];
          return { value: op[0] ? op[1] : void 0, done: true };
        }
      };
      __createBinding = function(o, m4, k3, k22) {
        if (k22 === void 0)
          k22 = k3;
        o[k22] = m4[k3];
      };
      __exportStar = function(m4, exports2) {
        for (var p3 in m4)
          if (p3 !== "default" && !exports2.hasOwnProperty(p3))
            exports2[p3] = m4[p3];
      };
      __values = function(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m4 = s && o[s], i2 = 0;
        if (m4)
          return m4.call(o);
        if (o && typeof o.length === "number")
          return {
            next: function() {
              if (o && i2 >= o.length)
                o = void 0;
              return { value: o && o[i2++], done: !o };
            }
          };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
      };
      __read = function(o, n2) {
        var m4 = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m4)
          return o;
        var i2 = m4.call(o), r, ar2 = [], e;
        try {
          while ((n2 === void 0 || n2-- > 0) && !(r = i2.next()).done)
            ar2.push(r.value);
        } catch (error) {
          e = { error };
        } finally {
          try {
            if (r && !r.done && (m4 = i2["return"]))
              m4.call(i2);
          } finally {
            if (e)
              throw e.error;
          }
        }
        return ar2;
      };
      __spread = function() {
        for (var ar2 = [], i2 = 0; i2 < arguments.length; i2++)
          ar2 = ar2.concat(__read(arguments[i2]));
        return ar2;
      };
      __spreadArrays = function() {
        for (var s = 0, i2 = 0, il = arguments.length; i2 < il; i2++)
          s += arguments[i2].length;
        for (var r = Array(s), k3 = 0, i2 = 0; i2 < il; i2++)
          for (var a2 = arguments[i2], j3 = 0, jl = a2.length; j3 < jl; j3++, k3++)
            r[k3] = a2[j3];
        return r;
      };
      __await = function(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
      };
      __asyncGenerator = function(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
        var g2 = generator.apply(thisArg, _arguments || []), i2, q4 = [];
        return i2 = {}, verb("next"), verb("throw"), verb("return"), i2[Symbol.asyncIterator] = function() {
          return this;
        }, i2;
        function verb(n2) {
          if (g2[n2])
            i2[n2] = function(v) {
              return new Promise(function(a2, b4) {
                q4.push([n2, v, a2, b4]) > 1 || resume(n2, v);
              });
            };
        }
        function resume(n2, v) {
          try {
            step(g2[n2](v));
          } catch (e) {
            settle(q4[0][3], e);
          }
        }
        function step(r) {
          r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q4[0][2], r);
        }
        function fulfill(value) {
          resume("next", value);
        }
        function reject(value) {
          resume("throw", value);
        }
        function settle(f3, v) {
          if (f3(v), q4.shift(), q4.length)
            resume(q4[0][0], q4[0][1]);
        }
      };
      __asyncDelegator = function(o) {
        var i2, p3;
        return i2 = {}, verb("next"), verb("throw", function(e) {
          throw e;
        }), verb("return"), i2[Symbol.iterator] = function() {
          return this;
        }, i2;
        function verb(n2, f3) {
          i2[n2] = o[n2] ? function(v) {
            return (p3 = !p3) ? { value: __await(o[n2](v)), done: n2 === "return" } : f3 ? f3(v) : v;
          } : f3;
        }
      };
      __asyncValues = function(o) {
        if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
        var m4 = o[Symbol.asyncIterator], i2;
        return m4 ? m4.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i2 = {}, verb("next"), verb("throw"), verb("return"), i2[Symbol.asyncIterator] = function() {
          return this;
        }, i2);
        function verb(n2) {
          i2[n2] = o[n2] && function(v) {
            return new Promise(function(resolve, reject) {
              v = o[n2](v), settle(resolve, reject, v.done, v.value);
            });
          };
        }
        function settle(resolve, reject, d2, v) {
          Promise.resolve(v).then(function(v2) {
            resolve({ value: v2, done: d2 });
          }, reject);
        }
      };
      __makeTemplateObject = function(cooked, raw) {
        if (Object.defineProperty) {
          Object.defineProperty(cooked, "raw", { value: raw });
        } else {
          cooked.raw = raw;
        }
        return cooked;
      };
      __importStar = function(mod) {
        if (mod && mod.__esModule)
          return mod;
        var result = {};
        if (mod != null) {
          for (var k3 in mod)
            if (Object.hasOwnProperty.call(mod, k3))
              result[k3] = mod[k3];
        }
        result["default"] = mod;
        return result;
      };
      __importDefault = function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      __classPrivateFieldGet = function(receiver, privateMap) {
        if (!privateMap.has(receiver)) {
          throw new TypeError("attempted to get private field on non-instance");
        }
        return privateMap.get(receiver);
      };
      __classPrivateFieldSet = function(receiver, privateMap, value) {
        if (!privateMap.has(receiver)) {
          throw new TypeError("attempted to set private field on non-instance");
        }
        privateMap.set(receiver, value);
        return value;
      };
      exporter("__extends", __extends);
      exporter("__assign", __assign);
      exporter("__rest", __rest);
      exporter("__decorate", __decorate);
      exporter("__param", __param);
      exporter("__metadata", __metadata);
      exporter("__awaiter", __awaiter);
      exporter("__generator", __generator);
      exporter("__exportStar", __exportStar);
      exporter("__createBinding", __createBinding);
      exporter("__values", __values);
      exporter("__read", __read);
      exporter("__spread", __spread);
      exporter("__spreadArrays", __spreadArrays);
      exporter("__await", __await);
      exporter("__asyncGenerator", __asyncGenerator);
      exporter("__asyncDelegator", __asyncDelegator);
      exporter("__asyncValues", __asyncValues);
      exporter("__makeTemplateObject", __makeTemplateObject);
      exporter("__importStar", __importStar);
      exporter("__importDefault", __importDefault);
      exporter("__classPrivateFieldGet", __classPrivateFieldGet);
      exporter("__classPrivateFieldSet", __classPrivateFieldSet);
    });
  }
});

// node_modules/.pnpm/safe-json-utils@1.1.1/node_modules/safe-json-utils/dist/cjs/index.js
var require_cjs = __commonJS({
  "node_modules/.pnpm/safe-json-utils@1.1.1/node_modules/safe-json-utils/dist/cjs/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function safeJsonParse2(value) {
      if (typeof value !== "string") {
        throw new Error(`Cannot safe json parse value of type ${typeof value}`);
      }
      try {
        return JSON.parse(value);
      } catch (_a) {
        return value;
      }
    }
    exports.safeJsonParse = safeJsonParse2;
    function safeJsonStringify2(value) {
      return typeof value === "string" ? value : JSON.stringify(value, (key, value2) => typeof value2 === "undefined" ? null : value2);
    }
    exports.safeJsonStringify = safeJsonStringify2;
  }
});

// node_modules/.pnpm/@walletconnect+keyvaluestorage@1.0.2/node_modules/@walletconnect/keyvaluestorage/dist/cjs/browser/lib/localStorage.js
var require_localStorage = __commonJS({
  "node_modules/.pnpm/@walletconnect+keyvaluestorage@1.0.2/node_modules/@walletconnect/keyvaluestorage/dist/cjs/browser/lib/localStorage.js"(exports, module) {
    "use strict";
    (function() {
      "use strict";
      let db;
      function LocalStorage() {
      }
      db = LocalStorage;
      db.prototype.getItem = function(key) {
        if (this.hasOwnProperty(key)) {
          return String(this[key]);
        }
        return null;
      };
      db.prototype.setItem = function(key, val) {
        this[key] = String(val);
      };
      db.prototype.removeItem = function(key) {
        delete this[key];
      };
      db.prototype.clear = function() {
        const self2 = this;
        Object.keys(self2).forEach(function(key) {
          self2[key] = void 0;
          delete self2[key];
        });
      };
      db.prototype.key = function(i2) {
        i2 = i2 || 0;
        return Object.keys(this)[i2];
      };
      db.prototype.__defineGetter__("length", function() {
        return Object.keys(this).length;
      });
      if (typeof global !== "undefined" && global.localStorage) {
        module.exports = global.localStorage;
      } else if (typeof window !== "undefined" && window.localStorage) {
        module.exports = window.localStorage;
      } else {
        module.exports = new LocalStorage();
      }
    })();
  }
});

// node_modules/.pnpm/@walletconnect+keyvaluestorage@1.0.2/node_modules/@walletconnect/keyvaluestorage/dist/cjs/shared/types.js
var require_types = __commonJS({
  "node_modules/.pnpm/@walletconnect+keyvaluestorage@1.0.2/node_modules/@walletconnect/keyvaluestorage/dist/cjs/shared/types.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.IKeyValueStorage = void 0;
    var IKeyValueStorage = class {
    };
    exports.IKeyValueStorage = IKeyValueStorage;
  }
});

// node_modules/.pnpm/@walletconnect+keyvaluestorage@1.0.2/node_modules/@walletconnect/keyvaluestorage/dist/cjs/shared/utils.js
var require_utils = __commonJS({
  "node_modules/.pnpm/@walletconnect+keyvaluestorage@1.0.2/node_modules/@walletconnect/keyvaluestorage/dist/cjs/shared/utils.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.parseEntry = void 0;
    var safe_json_utils_1 = require_cjs();
    function parseEntry(entry) {
      var _a;
      return [entry[0], safe_json_utils_1.safeJsonParse((_a = entry[1]) !== null && _a !== void 0 ? _a : "")];
    }
    exports.parseEntry = parseEntry;
  }
});

// node_modules/.pnpm/@walletconnect+keyvaluestorage@1.0.2/node_modules/@walletconnect/keyvaluestorage/dist/cjs/shared/index.js
var require_shared = __commonJS({
  "node_modules/.pnpm/@walletconnect+keyvaluestorage@1.0.2/node_modules/@walletconnect/keyvaluestorage/dist/cjs/shared/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require_tslib();
    tslib_1.__exportStar(require_types(), exports);
    tslib_1.__exportStar(require_utils(), exports);
  }
});

// node_modules/.pnpm/@walletconnect+keyvaluestorage@1.0.2/node_modules/@walletconnect/keyvaluestorage/dist/cjs/browser/index.js
var require_browser = __commonJS({
  "node_modules/.pnpm/@walletconnect+keyvaluestorage@1.0.2/node_modules/@walletconnect/keyvaluestorage/dist/cjs/browser/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.KeyValueStorage = void 0;
    var tslib_1 = require_tslib();
    var safe_json_utils_1 = require_cjs();
    var localStorage_1 = tslib_1.__importDefault(require_localStorage());
    var shared_1 = require_shared();
    var KeyValueStorage = class {
      constructor() {
        this.localStorage = localStorage_1.default;
      }
      getKeys() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
          return Object.keys(this.localStorage);
        });
      }
      getEntries() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
          return Object.entries(this.localStorage).map(shared_1.parseEntry);
        });
      }
      getItem(key) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
          const item = this.localStorage.getItem(key);
          if (item === null) {
            return void 0;
          }
          return safe_json_utils_1.safeJsonParse(item);
        });
      }
      setItem(key, value) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
          this.localStorage.setItem(key, safe_json_utils_1.safeJsonStringify(value));
        });
      }
      removeItem(key) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
          this.localStorage.removeItem(key);
        });
      }
    };
    exports.KeyValueStorage = KeyValueStorage;
    exports.default = KeyValueStorage;
  }
});

// node_modules/.pnpm/@walletconnect+time@1.0.2/node_modules/@walletconnect/time/dist/cjs/utils/delay.js
var require_delay = __commonJS({
  "node_modules/.pnpm/@walletconnect+time@1.0.2/node_modules/@walletconnect/time/dist/cjs/utils/delay.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.delay = void 0;
    function delay(timeout) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(true);
        }, timeout);
      });
    }
    exports.delay = delay;
  }
});

// node_modules/.pnpm/@walletconnect+time@1.0.2/node_modules/@walletconnect/time/dist/cjs/constants/misc.js
var require_misc = __commonJS({
  "node_modules/.pnpm/@walletconnect+time@1.0.2/node_modules/@walletconnect/time/dist/cjs/constants/misc.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ONE_THOUSAND = exports.ONE_HUNDRED = void 0;
    exports.ONE_HUNDRED = 100;
    exports.ONE_THOUSAND = 1e3;
  }
});

// node_modules/.pnpm/@walletconnect+time@1.0.2/node_modules/@walletconnect/time/dist/cjs/constants/time.js
var require_time = __commonJS({
  "node_modules/.pnpm/@walletconnect+time@1.0.2/node_modules/@walletconnect/time/dist/cjs/constants/time.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ONE_YEAR = exports.FOUR_WEEKS = exports.THREE_WEEKS = exports.TWO_WEEKS = exports.ONE_WEEK = exports.THIRTY_DAYS = exports.SEVEN_DAYS = exports.FIVE_DAYS = exports.THREE_DAYS = exports.ONE_DAY = exports.TWENTY_FOUR_HOURS = exports.TWELVE_HOURS = exports.SIX_HOURS = exports.THREE_HOURS = exports.ONE_HOUR = exports.SIXTY_MINUTES = exports.THIRTY_MINUTES = exports.TEN_MINUTES = exports.FIVE_MINUTES = exports.ONE_MINUTE = exports.SIXTY_SECONDS = exports.THIRTY_SECONDS = exports.TEN_SECONDS = exports.FIVE_SECONDS = exports.ONE_SECOND = void 0;
    exports.ONE_SECOND = 1;
    exports.FIVE_SECONDS = 5;
    exports.TEN_SECONDS = 10;
    exports.THIRTY_SECONDS = 30;
    exports.SIXTY_SECONDS = 60;
    exports.ONE_MINUTE = exports.SIXTY_SECONDS;
    exports.FIVE_MINUTES = exports.ONE_MINUTE * 5;
    exports.TEN_MINUTES = exports.ONE_MINUTE * 10;
    exports.THIRTY_MINUTES = exports.ONE_MINUTE * 30;
    exports.SIXTY_MINUTES = exports.ONE_MINUTE * 60;
    exports.ONE_HOUR = exports.SIXTY_MINUTES;
    exports.THREE_HOURS = exports.ONE_HOUR * 3;
    exports.SIX_HOURS = exports.ONE_HOUR * 6;
    exports.TWELVE_HOURS = exports.ONE_HOUR * 12;
    exports.TWENTY_FOUR_HOURS = exports.ONE_HOUR * 24;
    exports.ONE_DAY = exports.TWENTY_FOUR_HOURS;
    exports.THREE_DAYS = exports.ONE_DAY * 3;
    exports.FIVE_DAYS = exports.ONE_DAY * 5;
    exports.SEVEN_DAYS = exports.ONE_DAY * 7;
    exports.THIRTY_DAYS = exports.ONE_DAY * 30;
    exports.ONE_WEEK = exports.SEVEN_DAYS;
    exports.TWO_WEEKS = exports.ONE_WEEK * 2;
    exports.THREE_WEEKS = exports.ONE_WEEK * 3;
    exports.FOUR_WEEKS = exports.ONE_WEEK * 4;
    exports.ONE_YEAR = exports.ONE_DAY * 365;
  }
});

// node_modules/.pnpm/@walletconnect+time@1.0.2/node_modules/@walletconnect/time/dist/cjs/constants/index.js
var require_constants = __commonJS({
  "node_modules/.pnpm/@walletconnect+time@1.0.2/node_modules/@walletconnect/time/dist/cjs/constants/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require_tslib();
    tslib_1.__exportStar(require_misc(), exports);
    tslib_1.__exportStar(require_time(), exports);
  }
});

// node_modules/.pnpm/@walletconnect+time@1.0.2/node_modules/@walletconnect/time/dist/cjs/utils/convert.js
var require_convert = __commonJS({
  "node_modules/.pnpm/@walletconnect+time@1.0.2/node_modules/@walletconnect/time/dist/cjs/utils/convert.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.fromMiliseconds = exports.toMiliseconds = void 0;
    var constants_1 = require_constants();
    function toMiliseconds(seconds) {
      return seconds * constants_1.ONE_THOUSAND;
    }
    exports.toMiliseconds = toMiliseconds;
    function fromMiliseconds2(miliseconds) {
      return Math.floor(miliseconds / constants_1.ONE_THOUSAND);
    }
    exports.fromMiliseconds = fromMiliseconds2;
  }
});

// node_modules/.pnpm/@walletconnect+time@1.0.2/node_modules/@walletconnect/time/dist/cjs/utils/index.js
var require_utils2 = __commonJS({
  "node_modules/.pnpm/@walletconnect+time@1.0.2/node_modules/@walletconnect/time/dist/cjs/utils/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require_tslib();
    tslib_1.__exportStar(require_delay(), exports);
    tslib_1.__exportStar(require_convert(), exports);
  }
});

// node_modules/.pnpm/@walletconnect+time@1.0.2/node_modules/@walletconnect/time/dist/cjs/watch.js
var require_watch = __commonJS({
  "node_modules/.pnpm/@walletconnect+time@1.0.2/node_modules/@walletconnect/time/dist/cjs/watch.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Watch = void 0;
    var Watch = class {
      constructor() {
        this.timestamps = /* @__PURE__ */ new Map();
      }
      start(label) {
        if (this.timestamps.has(label)) {
          throw new Error(`Watch already started for label: ${label}`);
        }
        this.timestamps.set(label, { started: Date.now() });
      }
      stop(label) {
        const timestamp = this.get(label);
        if (typeof timestamp.elapsed !== "undefined") {
          throw new Error(`Watch already stopped for label: ${label}`);
        }
        const elapsed = Date.now() - timestamp.started;
        this.timestamps.set(label, { started: timestamp.started, elapsed });
      }
      get(label) {
        const timestamp = this.timestamps.get(label);
        if (typeof timestamp === "undefined") {
          throw new Error(`No timestamp found for label: ${label}`);
        }
        return timestamp;
      }
      elapsed(label) {
        const timestamp = this.get(label);
        const elapsed = timestamp.elapsed || Date.now() - timestamp.started;
        return elapsed;
      }
    };
    exports.Watch = Watch;
    exports.default = Watch;
  }
});

// node_modules/.pnpm/@walletconnect+time@1.0.2/node_modules/@walletconnect/time/dist/cjs/types/watch.js
var require_watch2 = __commonJS({
  "node_modules/.pnpm/@walletconnect+time@1.0.2/node_modules/@walletconnect/time/dist/cjs/types/watch.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.IWatch = void 0;
    var IWatch = class {
    };
    exports.IWatch = IWatch;
  }
});

// node_modules/.pnpm/@walletconnect+time@1.0.2/node_modules/@walletconnect/time/dist/cjs/types/index.js
var require_types2 = __commonJS({
  "node_modules/.pnpm/@walletconnect+time@1.0.2/node_modules/@walletconnect/time/dist/cjs/types/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require_tslib();
    tslib_1.__exportStar(require_watch2(), exports);
  }
});

// node_modules/.pnpm/@walletconnect+time@1.0.2/node_modules/@walletconnect/time/dist/cjs/index.js
var require_cjs2 = __commonJS({
  "node_modules/.pnpm/@walletconnect+time@1.0.2/node_modules/@walletconnect/time/dist/cjs/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require_tslib();
    tslib_1.__exportStar(require_utils2(), exports);
    tslib_1.__exportStar(require_watch(), exports);
    tslib_1.__exportStar(require_types2(), exports);
    tslib_1.__exportStar(require_constants(), exports);
  }
});

// node_modules/.pnpm/@walletconnect+events@1.0.1/node_modules/@walletconnect/events/dist/esm/events.js
var IEvents;
var init_events = __esm({
  "node_modules/.pnpm/@walletconnect+events@1.0.1/node_modules/@walletconnect/events/dist/esm/events.js"() {
    IEvents = class {
    };
  }
});

// node_modules/.pnpm/@walletconnect+events@1.0.1/node_modules/@walletconnect/events/dist/esm/index.js
var esm_exports = {};
__export(esm_exports, {
  IEvents: () => IEvents
});
var init_esm = __esm({
  "node_modules/.pnpm/@walletconnect+events@1.0.1/node_modules/@walletconnect/events/dist/esm/index.js"() {
    init_events();
  }
});

// node_modules/.pnpm/@walletconnect+heartbeat@1.2.1/node_modules/@walletconnect/heartbeat/dist/cjs/types/heartbeat.js
var require_heartbeat = __commonJS({
  "node_modules/.pnpm/@walletconnect+heartbeat@1.2.1/node_modules/@walletconnect/heartbeat/dist/cjs/types/heartbeat.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.IHeartBeat = void 0;
    var events_1 = (init_esm(), __toCommonJS(esm_exports));
    var IHeartBeat = class extends events_1.IEvents {
      constructor(opts) {
        super();
      }
    };
    exports.IHeartBeat = IHeartBeat;
  }
});

// node_modules/.pnpm/@walletconnect+heartbeat@1.2.1/node_modules/@walletconnect/heartbeat/dist/cjs/types/index.js
var require_types3 = __commonJS({
  "node_modules/.pnpm/@walletconnect+heartbeat@1.2.1/node_modules/@walletconnect/heartbeat/dist/cjs/types/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require_tslib();
    tslib_1.__exportStar(require_heartbeat(), exports);
  }
});

// node_modules/.pnpm/@walletconnect+heartbeat@1.2.1/node_modules/@walletconnect/heartbeat/dist/cjs/constants/heartbeat.js
var require_heartbeat2 = __commonJS({
  "node_modules/.pnpm/@walletconnect+heartbeat@1.2.1/node_modules/@walletconnect/heartbeat/dist/cjs/constants/heartbeat.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.HEARTBEAT_EVENTS = exports.HEARTBEAT_INTERVAL = void 0;
    var time_1 = require_cjs2();
    exports.HEARTBEAT_INTERVAL = time_1.FIVE_SECONDS;
    exports.HEARTBEAT_EVENTS = {
      pulse: "heartbeat_pulse"
    };
  }
});

// node_modules/.pnpm/@walletconnect+heartbeat@1.2.1/node_modules/@walletconnect/heartbeat/dist/cjs/constants/index.js
var require_constants2 = __commonJS({
  "node_modules/.pnpm/@walletconnect+heartbeat@1.2.1/node_modules/@walletconnect/heartbeat/dist/cjs/constants/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require_tslib();
    tslib_1.__exportStar(require_heartbeat2(), exports);
  }
});

// node_modules/.pnpm/@walletconnect+heartbeat@1.2.1/node_modules/@walletconnect/heartbeat/dist/cjs/heartbeat.js
var require_heartbeat3 = __commonJS({
  "node_modules/.pnpm/@walletconnect+heartbeat@1.2.1/node_modules/@walletconnect/heartbeat/dist/cjs/heartbeat.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.HeartBeat = void 0;
    var tslib_1 = require_tslib();
    var events_1 = require_events();
    var time_1 = require_cjs2();
    var types_1 = require_types3();
    var constants_1 = require_constants2();
    var HeartBeat = class extends types_1.IHeartBeat {
      constructor(opts) {
        super(opts);
        this.events = new events_1.EventEmitter();
        this.interval = constants_1.HEARTBEAT_INTERVAL;
        this.interval = (opts === null || opts === void 0 ? void 0 : opts.interval) || constants_1.HEARTBEAT_INTERVAL;
      }
      static init(opts) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
          const heartbeat = new HeartBeat(opts);
          yield heartbeat.init();
          return heartbeat;
        });
      }
      init() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
          yield this.initialize();
        });
      }
      stop() {
        clearInterval(this.intervalRef);
      }
      on(event, listener) {
        this.events.on(event, listener);
      }
      once(event, listener) {
        this.events.once(event, listener);
      }
      off(event, listener) {
        this.events.off(event, listener);
      }
      removeListener(event, listener) {
        this.events.removeListener(event, listener);
      }
      initialize() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
          this.intervalRef = setInterval(() => this.pulse(), time_1.toMiliseconds(this.interval));
        });
      }
      pulse() {
        this.events.emit(constants_1.HEARTBEAT_EVENTS.pulse);
      }
    };
    exports.HeartBeat = HeartBeat;
  }
});

// node_modules/.pnpm/@walletconnect+heartbeat@1.2.1/node_modules/@walletconnect/heartbeat/dist/cjs/index.js
var require_cjs3 = __commonJS({
  "node_modules/.pnpm/@walletconnect+heartbeat@1.2.1/node_modules/@walletconnect/heartbeat/dist/cjs/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require_tslib();
    tslib_1.__exportStar(require_heartbeat3(), exports);
    tslib_1.__exportStar(require_types3(), exports);
    tslib_1.__exportStar(require_constants2(), exports);
  }
});

// node_modules/.pnpm/quick-format-unescaped@4.0.4/node_modules/quick-format-unescaped/index.js
var require_quick_format_unescaped = __commonJS({
  "node_modules/.pnpm/quick-format-unescaped@4.0.4/node_modules/quick-format-unescaped/index.js"(exports, module) {
    "use strict";
    function tryStringify(o) {
      try {
        return JSON.stringify(o);
      } catch (e) {
        return '"[Circular]"';
      }
    }
    module.exports = format;
    function format(f3, args, opts) {
      var ss3 = opts && opts.stringify || tryStringify;
      var offset = 1;
      if (typeof f3 === "object" && f3 !== null) {
        var len = args.length + offset;
        if (len === 1)
          return f3;
        var objects = new Array(len);
        objects[0] = ss3(f3);
        for (var index = 1; index < len; index++) {
          objects[index] = ss3(args[index]);
        }
        return objects.join(" ");
      }
      if (typeof f3 !== "string") {
        return f3;
      }
      var argLen = args.length;
      if (argLen === 0)
        return f3;
      var str = "";
      var a2 = 1 - offset;
      var lastPos = -1;
      var flen = f3 && f3.length || 0;
      for (var i2 = 0; i2 < flen; ) {
        if (f3.charCodeAt(i2) === 37 && i2 + 1 < flen) {
          lastPos = lastPos > -1 ? lastPos : 0;
          switch (f3.charCodeAt(i2 + 1)) {
            case 100:
            case 102:
              if (a2 >= argLen)
                break;
              if (args[a2] == null)
                break;
              if (lastPos < i2)
                str += f3.slice(lastPos, i2);
              str += Number(args[a2]);
              lastPos = i2 + 2;
              i2++;
              break;
            case 105:
              if (a2 >= argLen)
                break;
              if (args[a2] == null)
                break;
              if (lastPos < i2)
                str += f3.slice(lastPos, i2);
              str += Math.floor(Number(args[a2]));
              lastPos = i2 + 2;
              i2++;
              break;
            case 79:
            case 111:
            case 106:
              if (a2 >= argLen)
                break;
              if (args[a2] === void 0)
                break;
              if (lastPos < i2)
                str += f3.slice(lastPos, i2);
              var type = typeof args[a2];
              if (type === "string") {
                str += "'" + args[a2] + "'";
                lastPos = i2 + 2;
                i2++;
                break;
              }
              if (type === "function") {
                str += args[a2].name || "<anonymous>";
                lastPos = i2 + 2;
                i2++;
                break;
              }
              str += ss3(args[a2]);
              lastPos = i2 + 2;
              i2++;
              break;
            case 115:
              if (a2 >= argLen)
                break;
              if (lastPos < i2)
                str += f3.slice(lastPos, i2);
              str += String(args[a2]);
              lastPos = i2 + 2;
              i2++;
              break;
            case 37:
              if (lastPos < i2)
                str += f3.slice(lastPos, i2);
              str += "%";
              lastPos = i2 + 2;
              i2++;
              a2--;
              break;
          }
          ++a2;
        }
        ++i2;
      }
      if (lastPos === -1)
        return f3;
      else if (lastPos < flen) {
        str += f3.slice(lastPos);
      }
      return str;
    }
  }
});

// node_modules/.pnpm/pino@7.11.0/node_modules/pino/browser.js
var require_browser2 = __commonJS({
  "node_modules/.pnpm/pino@7.11.0/node_modules/pino/browser.js"(exports, module) {
    "use strict";
    var format = require_quick_format_unescaped();
    module.exports = pino;
    var _console = pfGlobalThisOrFallback().console || {};
    var stdSerializers = {
      mapHttpRequest: mock,
      mapHttpResponse: mock,
      wrapRequestSerializer: passthrough,
      wrapResponseSerializer: passthrough,
      wrapErrorSerializer: passthrough,
      req: mock,
      res: mock,
      err: asErrValue
    };
    function shouldSerialize(serialize, serializers) {
      if (Array.isArray(serialize)) {
        const hasToFilter = serialize.filter(function(k3) {
          return k3 !== "!stdSerializers.err";
        });
        return hasToFilter;
      } else if (serialize === true) {
        return Object.keys(serializers);
      }
      return false;
    }
    function pino(opts) {
      opts = opts || {};
      opts.browser = opts.browser || {};
      const transmit2 = opts.browser.transmit;
      if (transmit2 && typeof transmit2.send !== "function") {
        throw Error("pino: transmit option must have a send function");
      }
      const proto = opts.browser.write || _console;
      if (opts.browser.write)
        opts.browser.asObject = true;
      const serializers = opts.serializers || {};
      const serialize = shouldSerialize(opts.browser.serialize, serializers);
      let stdErrSerialize = opts.browser.serialize;
      if (Array.isArray(opts.browser.serialize) && opts.browser.serialize.indexOf("!stdSerializers.err") > -1)
        stdErrSerialize = false;
      const levels = ["error", "fatal", "warn", "info", "debug", "trace"];
      if (typeof proto === "function") {
        proto.error = proto.fatal = proto.warn = proto.info = proto.debug = proto.trace = proto;
      }
      if (opts.enabled === false)
        opts.level = "silent";
      const level = opts.level || "info";
      const logger = Object.create(proto);
      if (!logger.log)
        logger.log = noop;
      Object.defineProperty(logger, "levelVal", {
        get: getLevelVal
      });
      Object.defineProperty(logger, "level", {
        get: getLevel,
        set: setLevel
      });
      const setOpts = {
        transmit: transmit2,
        serialize,
        asObject: opts.browser.asObject,
        levels,
        timestamp: getTimeFunction(opts)
      };
      logger.levels = pino.levels;
      logger.level = level;
      logger.setMaxListeners = logger.getMaxListeners = logger.emit = logger.addListener = logger.on = logger.prependListener = logger.once = logger.prependOnceListener = logger.removeListener = logger.removeAllListeners = logger.listeners = logger.listenerCount = logger.eventNames = logger.write = logger.flush = noop;
      logger.serializers = serializers;
      logger._serialize = serialize;
      logger._stdErrSerialize = stdErrSerialize;
      logger.child = child;
      if (transmit2)
        logger._logEvent = createLogEventShape();
      function getLevelVal() {
        return this.level === "silent" ? Infinity : this.levels.values[this.level];
      }
      function getLevel() {
        return this._level;
      }
      function setLevel(level2) {
        if (level2 !== "silent" && !this.levels.values[level2]) {
          throw Error("unknown level " + level2);
        }
        this._level = level2;
        set(setOpts, logger, "error", "log");
        set(setOpts, logger, "fatal", "error");
        set(setOpts, logger, "warn", "error");
        set(setOpts, logger, "info", "log");
        set(setOpts, logger, "debug", "log");
        set(setOpts, logger, "trace", "log");
      }
      function child(bindings, childOptions) {
        if (!bindings) {
          throw new Error("missing bindings for child Pino");
        }
        childOptions = childOptions || {};
        if (serialize && bindings.serializers) {
          childOptions.serializers = bindings.serializers;
        }
        const childOptionsSerializers = childOptions.serializers;
        if (serialize && childOptionsSerializers) {
          var childSerializers = Object.assign({}, serializers, childOptionsSerializers);
          var childSerialize = opts.browser.serialize === true ? Object.keys(childSerializers) : serialize;
          delete bindings.serializers;
          applySerializers([bindings], childSerialize, childSerializers, this._stdErrSerialize);
        }
        function Child(parent) {
          this._childLevel = (parent._childLevel | 0) + 1;
          this.error = bind(parent, bindings, "error");
          this.fatal = bind(parent, bindings, "fatal");
          this.warn = bind(parent, bindings, "warn");
          this.info = bind(parent, bindings, "info");
          this.debug = bind(parent, bindings, "debug");
          this.trace = bind(parent, bindings, "trace");
          if (childSerializers) {
            this.serializers = childSerializers;
            this._serialize = childSerialize;
          }
          if (transmit2) {
            this._logEvent = createLogEventShape(
              [].concat(parent._logEvent.bindings, bindings)
            );
          }
        }
        Child.prototype = this;
        return new Child(this);
      }
      return logger;
    }
    pino.levels = {
      values: {
        fatal: 60,
        error: 50,
        warn: 40,
        info: 30,
        debug: 20,
        trace: 10
      },
      labels: {
        10: "trace",
        20: "debug",
        30: "info",
        40: "warn",
        50: "error",
        60: "fatal"
      }
    };
    pino.stdSerializers = stdSerializers;
    pino.stdTimeFunctions = Object.assign({}, { nullTime, epochTime, unixTime, isoTime });
    function set(opts, logger, level, fallback) {
      const proto = Object.getPrototypeOf(logger);
      logger[level] = logger.levelVal > logger.levels.values[level] ? noop : proto[level] ? proto[level] : _console[level] || _console[fallback] || noop;
      wrap(opts, logger, level);
    }
    function wrap(opts, logger, level) {
      if (!opts.transmit && logger[level] === noop)
        return;
      logger[level] = function(write) {
        return function LOG() {
          const ts3 = opts.timestamp();
          const args = new Array(arguments.length);
          const proto = Object.getPrototypeOf && Object.getPrototypeOf(this) === _console ? _console : this;
          for (var i2 = 0; i2 < args.length; i2++)
            args[i2] = arguments[i2];
          if (opts.serialize && !opts.asObject) {
            applySerializers(args, this._serialize, this.serializers, this._stdErrSerialize);
          }
          if (opts.asObject)
            write.call(proto, asObject(this, level, args, ts3));
          else
            write.apply(proto, args);
          if (opts.transmit) {
            const transmitLevel = opts.transmit.level || logger.level;
            const transmitValue = pino.levels.values[transmitLevel];
            const methodValue = pino.levels.values[level];
            if (methodValue < transmitValue)
              return;
            transmit(this, {
              ts: ts3,
              methodLevel: level,
              methodValue,
              transmitLevel,
              transmitValue: pino.levels.values[opts.transmit.level || logger.level],
              send: opts.transmit.send,
              val: logger.levelVal
            }, args);
          }
        };
      }(logger[level]);
    }
    function asObject(logger, level, args, ts3) {
      if (logger._serialize)
        applySerializers(args, logger._serialize, logger.serializers, logger._stdErrSerialize);
      const argsCloned = args.slice();
      let msg = argsCloned[0];
      const o = {};
      if (ts3) {
        o.time = ts3;
      }
      o.level = pino.levels.values[level];
      let lvl = (logger._childLevel | 0) + 1;
      if (lvl < 1)
        lvl = 1;
      if (msg !== null && typeof msg === "object") {
        while (lvl-- && typeof argsCloned[0] === "object") {
          Object.assign(o, argsCloned.shift());
        }
        msg = argsCloned.length ? format(argsCloned.shift(), argsCloned) : void 0;
      } else if (typeof msg === "string")
        msg = format(argsCloned.shift(), argsCloned);
      if (msg !== void 0)
        o.msg = msg;
      return o;
    }
    function applySerializers(args, serialize, serializers, stdErrSerialize) {
      for (const i2 in args) {
        if (stdErrSerialize && args[i2] instanceof Error) {
          args[i2] = pino.stdSerializers.err(args[i2]);
        } else if (typeof args[i2] === "object" && !Array.isArray(args[i2])) {
          for (const k3 in args[i2]) {
            if (serialize && serialize.indexOf(k3) > -1 && k3 in serializers) {
              args[i2][k3] = serializers[k3](args[i2][k3]);
            }
          }
        }
      }
    }
    function bind(parent, bindings, level) {
      return function() {
        const args = new Array(1 + arguments.length);
        args[0] = bindings;
        for (var i2 = 1; i2 < args.length; i2++) {
          args[i2] = arguments[i2 - 1];
        }
        return parent[level].apply(this, args);
      };
    }
    function transmit(logger, opts, args) {
      const send = opts.send;
      const ts3 = opts.ts;
      const methodLevel = opts.methodLevel;
      const methodValue = opts.methodValue;
      const val = opts.val;
      const bindings = logger._logEvent.bindings;
      applySerializers(
        args,
        logger._serialize || Object.keys(logger.serializers),
        logger.serializers,
        logger._stdErrSerialize === void 0 ? true : logger._stdErrSerialize
      );
      logger._logEvent.ts = ts3;
      logger._logEvent.messages = args.filter(function(arg) {
        return bindings.indexOf(arg) === -1;
      });
      logger._logEvent.level.label = methodLevel;
      logger._logEvent.level.value = methodValue;
      send(methodLevel, logger._logEvent, val);
      logger._logEvent = createLogEventShape(bindings);
    }
    function createLogEventShape(bindings) {
      return {
        ts: 0,
        messages: [],
        bindings: bindings || [],
        level: { label: "", value: 0 }
      };
    }
    function asErrValue(err) {
      const obj = {
        type: err.constructor.name,
        msg: err.message,
        stack: err.stack
      };
      for (const key in err) {
        if (obj[key] === void 0) {
          obj[key] = err[key];
        }
      }
      return obj;
    }
    function getTimeFunction(opts) {
      if (typeof opts.timestamp === "function") {
        return opts.timestamp;
      }
      if (opts.timestamp === false) {
        return nullTime;
      }
      return epochTime;
    }
    function mock() {
      return {};
    }
    function passthrough(a2) {
      return a2;
    }
    function noop() {
    }
    function nullTime() {
      return false;
    }
    function epochTime() {
      return Date.now();
    }
    function unixTime() {
      return Math.round(Date.now() / 1e3);
    }
    function isoTime() {
      return new Date(Date.now()).toISOString();
    }
    function pfGlobalThisOrFallback() {
      function defd(o) {
        return typeof o !== "undefined" && o;
      }
      try {
        if (typeof globalThis !== "undefined")
          return globalThis;
        Object.defineProperty(Object.prototype, "globalThis", {
          get: function() {
            delete Object.prototype.globalThis;
            return this.globalThis = this;
          },
          configurable: true
        });
        return globalThis;
      } catch (e) {
        return defd(self) || defd(window) || defd(this) || {};
      }
    }
  }
});

// node_modules/.pnpm/@walletconnect+logger@2.0.1/node_modules/@walletconnect/logger/dist/cjs/constants.js
var require_constants3 = __commonJS({
  "node_modules/.pnpm/@walletconnect+logger@2.0.1/node_modules/@walletconnect/logger/dist/cjs/constants.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PINO_CUSTOM_CONTEXT_KEY = exports.PINO_LOGGER_DEFAULTS = void 0;
    exports.PINO_LOGGER_DEFAULTS = {
      level: "info"
    };
    exports.PINO_CUSTOM_CONTEXT_KEY = "custom_context";
  }
});

// node_modules/.pnpm/@walletconnect+logger@2.0.1/node_modules/@walletconnect/logger/dist/cjs/utils.js
var require_utils3 = __commonJS({
  "node_modules/.pnpm/@walletconnect+logger@2.0.1/node_modules/@walletconnect/logger/dist/cjs/utils.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.generateChildLogger = exports.formatChildLoggerContext = exports.getLoggerContext = exports.setBrowserLoggerContext = exports.getBrowserLoggerContext = exports.getDefaultLoggerOptions = void 0;
    var constants_1 = require_constants3();
    function getDefaultLoggerOptions(opts) {
      return Object.assign(Object.assign({}, opts), { level: (opts === null || opts === void 0 ? void 0 : opts.level) || constants_1.PINO_LOGGER_DEFAULTS.level });
    }
    exports.getDefaultLoggerOptions = getDefaultLoggerOptions;
    function getBrowserLoggerContext(logger, customContextKey = constants_1.PINO_CUSTOM_CONTEXT_KEY) {
      return logger[customContextKey] || "";
    }
    exports.getBrowserLoggerContext = getBrowserLoggerContext;
    function setBrowserLoggerContext(logger, context, customContextKey = constants_1.PINO_CUSTOM_CONTEXT_KEY) {
      logger[customContextKey] = context;
      return logger;
    }
    exports.setBrowserLoggerContext = setBrowserLoggerContext;
    function getLoggerContext(logger, customContextKey = constants_1.PINO_CUSTOM_CONTEXT_KEY) {
      let context = "";
      if (typeof logger.bindings === "undefined") {
        context = getBrowserLoggerContext(logger, customContextKey);
      } else {
        context = logger.bindings().context || "";
      }
      return context;
    }
    exports.getLoggerContext = getLoggerContext;
    function formatChildLoggerContext(logger, childContext, customContextKey = constants_1.PINO_CUSTOM_CONTEXT_KEY) {
      const parentContext = getLoggerContext(logger, customContextKey);
      const context = parentContext.trim() ? `${parentContext}/${childContext}` : childContext;
      return context;
    }
    exports.formatChildLoggerContext = formatChildLoggerContext;
    function generateChildLogger(logger, childContext, customContextKey = constants_1.PINO_CUSTOM_CONTEXT_KEY) {
      const context = formatChildLoggerContext(logger, childContext, customContextKey);
      const child = logger.child({ context });
      return setBrowserLoggerContext(child, context, customContextKey);
    }
    exports.generateChildLogger = generateChildLogger;
  }
});

// node_modules/.pnpm/@walletconnect+logger@2.0.1/node_modules/@walletconnect/logger/dist/cjs/index.js
var require_cjs4 = __commonJS({
  "node_modules/.pnpm/@walletconnect+logger@2.0.1/node_modules/@walletconnect/logger/dist/cjs/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.pino = void 0;
    var tslib_1 = require_tslib();
    var pino_1 = tslib_1.__importDefault(require_browser2());
    Object.defineProperty(exports, "pino", { enumerable: true, get: function() {
      return pino_1.default;
    } });
    tslib_1.__exportStar(require_constants3(), exports);
    tslib_1.__exportStar(require_utils3(), exports);
  }
});

// node_modules/.pnpm/@stablelib+random@1.0.2/node_modules/@stablelib/random/lib/source/browser.js
var require_browser3 = __commonJS({
  "node_modules/.pnpm/@stablelib+random@1.0.2/node_modules/@stablelib/random/lib/source/browser.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.BrowserRandomSource = void 0;
    var QUOTA = 65536;
    var BrowserRandomSource = class {
      constructor() {
        this.isAvailable = false;
        this.isInstantiated = false;
        const browserCrypto = typeof self !== "undefined" ? self.crypto || self.msCrypto : null;
        if (browserCrypto && browserCrypto.getRandomValues !== void 0) {
          this._crypto = browserCrypto;
          this.isAvailable = true;
          this.isInstantiated = true;
        }
      }
      randomBytes(length2) {
        if (!this.isAvailable || !this._crypto) {
          throw new Error("Browser random byte generator is not available.");
        }
        const out = new Uint8Array(length2);
        for (let i2 = 0; i2 < out.length; i2 += QUOTA) {
          this._crypto.getRandomValues(out.subarray(i2, i2 + Math.min(out.length - i2, QUOTA)));
        }
        return out;
      }
    };
    exports.BrowserRandomSource = BrowserRandomSource;
  }
});

// node_modules/.pnpm/@stablelib+wipe@1.0.1/node_modules/@stablelib/wipe/lib/wipe.js
var require_wipe = __commonJS({
  "node_modules/.pnpm/@stablelib+wipe@1.0.1/node_modules/@stablelib/wipe/lib/wipe.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function wipe(array) {
      for (var i2 = 0; i2 < array.length; i2++) {
        array[i2] = 0;
      }
      return array;
    }
    exports.wipe = wipe;
  }
});

// browser-external:crypto
var require_crypto = __commonJS({
  "browser-external:crypto"(exports, module) {
    module.exports = Object.create(new Proxy({}, {
      get(_2, key) {
        if (key !== "__esModule" && key !== "__proto__" && key !== "constructor" && key !== "splice") {
          console.warn(`Module "crypto" has been externalized for browser compatibility. Cannot access "crypto.${key}" in client code. See http://vitejs.dev/guide/troubleshooting.html#module-externalized-for-browser-compatibility for more details.`);
        }
      }
    }));
  }
});

// node_modules/.pnpm/@stablelib+random@1.0.2/node_modules/@stablelib/random/lib/source/node.js
var require_node = __commonJS({
  "node_modules/.pnpm/@stablelib+random@1.0.2/node_modules/@stablelib/random/lib/source/node.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.NodeRandomSource = void 0;
    var wipe_1 = require_wipe();
    var NodeRandomSource = class {
      constructor() {
        this.isAvailable = false;
        this.isInstantiated = false;
        if (typeof __require !== "undefined") {
          const nodeCrypto = require_crypto();
          if (nodeCrypto && nodeCrypto.randomBytes) {
            this._crypto = nodeCrypto;
            this.isAvailable = true;
            this.isInstantiated = true;
          }
        }
      }
      randomBytes(length2) {
        if (!this.isAvailable || !this._crypto) {
          throw new Error("Node.js random byte generator is not available.");
        }
        let buffer = this._crypto.randomBytes(length2);
        if (buffer.length !== length2) {
          throw new Error("NodeRandomSource: got fewer bytes than requested");
        }
        const out = new Uint8Array(length2);
        for (let i2 = 0; i2 < out.length; i2++) {
          out[i2] = buffer[i2];
        }
        (0, wipe_1.wipe)(buffer);
        return out;
      }
    };
    exports.NodeRandomSource = NodeRandomSource;
  }
});

// node_modules/.pnpm/@stablelib+random@1.0.2/node_modules/@stablelib/random/lib/source/system.js
var require_system = __commonJS({
  "node_modules/.pnpm/@stablelib+random@1.0.2/node_modules/@stablelib/random/lib/source/system.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SystemRandomSource = void 0;
    var browser_1 = require_browser3();
    var node_1 = require_node();
    var SystemRandomSource = class {
      constructor() {
        this.isAvailable = false;
        this.name = "";
        this._source = new browser_1.BrowserRandomSource();
        if (this._source.isAvailable) {
          this.isAvailable = true;
          this.name = "Browser";
          return;
        }
        this._source = new node_1.NodeRandomSource();
        if (this._source.isAvailable) {
          this.isAvailable = true;
          this.name = "Node";
          return;
        }
      }
      randomBytes(length2) {
        if (!this.isAvailable) {
          throw new Error("System random byte generator is not available.");
        }
        return this._source.randomBytes(length2);
      }
    };
    exports.SystemRandomSource = SystemRandomSource;
  }
});

// node_modules/.pnpm/@stablelib+int@1.0.1/node_modules/@stablelib/int/lib/int.js
var require_int = __commonJS({
  "node_modules/.pnpm/@stablelib+int@1.0.1/node_modules/@stablelib/int/lib/int.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function imulShim(a2, b4) {
      var ah = a2 >>> 16 & 65535, al = a2 & 65535;
      var bh = b4 >>> 16 & 65535, bl = b4 & 65535;
      return al * bl + (ah * bl + al * bh << 16 >>> 0) | 0;
    }
    exports.mul = Math.imul || imulShim;
    function add(a2, b4) {
      return a2 + b4 | 0;
    }
    exports.add = add;
    function sub(a2, b4) {
      return a2 - b4 | 0;
    }
    exports.sub = sub;
    function rotl(x2, n2) {
      return x2 << n2 | x2 >>> 32 - n2;
    }
    exports.rotl = rotl;
    function rotr(x2, n2) {
      return x2 << 32 - n2 | x2 >>> n2;
    }
    exports.rotr = rotr;
    function isIntegerShim(n2) {
      return typeof n2 === "number" && isFinite(n2) && Math.floor(n2) === n2;
    }
    exports.isInteger = Number.isInteger || isIntegerShim;
    exports.MAX_SAFE_INTEGER = 9007199254740991;
    exports.isSafeInteger = function(n2) {
      return exports.isInteger(n2) && (n2 >= -exports.MAX_SAFE_INTEGER && n2 <= exports.MAX_SAFE_INTEGER);
    };
  }
});

// node_modules/.pnpm/@stablelib+binary@1.0.1/node_modules/@stablelib/binary/lib/binary.js
var require_binary = __commonJS({
  "node_modules/.pnpm/@stablelib+binary@1.0.1/node_modules/@stablelib/binary/lib/binary.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var int_1 = require_int();
    function readInt16BE(array, offset) {
      if (offset === void 0) {
        offset = 0;
      }
      return (array[offset + 0] << 8 | array[offset + 1]) << 16 >> 16;
    }
    exports.readInt16BE = readInt16BE;
    function readUint16BE(array, offset) {
      if (offset === void 0) {
        offset = 0;
      }
      return (array[offset + 0] << 8 | array[offset + 1]) >>> 0;
    }
    exports.readUint16BE = readUint16BE;
    function readInt16LE(array, offset) {
      if (offset === void 0) {
        offset = 0;
      }
      return (array[offset + 1] << 8 | array[offset]) << 16 >> 16;
    }
    exports.readInt16LE = readInt16LE;
    function readUint16LE(array, offset) {
      if (offset === void 0) {
        offset = 0;
      }
      return (array[offset + 1] << 8 | array[offset]) >>> 0;
    }
    exports.readUint16LE = readUint16LE;
    function writeUint16BE(value, out, offset) {
      if (out === void 0) {
        out = new Uint8Array(2);
      }
      if (offset === void 0) {
        offset = 0;
      }
      out[offset + 0] = value >>> 8;
      out[offset + 1] = value >>> 0;
      return out;
    }
    exports.writeUint16BE = writeUint16BE;
    exports.writeInt16BE = writeUint16BE;
    function writeUint16LE(value, out, offset) {
      if (out === void 0) {
        out = new Uint8Array(2);
      }
      if (offset === void 0) {
        offset = 0;
      }
      out[offset + 0] = value >>> 0;
      out[offset + 1] = value >>> 8;
      return out;
    }
    exports.writeUint16LE = writeUint16LE;
    exports.writeInt16LE = writeUint16LE;
    function readInt32BE(array, offset) {
      if (offset === void 0) {
        offset = 0;
      }
      return array[offset] << 24 | array[offset + 1] << 16 | array[offset + 2] << 8 | array[offset + 3];
    }
    exports.readInt32BE = readInt32BE;
    function readUint32BE(array, offset) {
      if (offset === void 0) {
        offset = 0;
      }
      return (array[offset] << 24 | array[offset + 1] << 16 | array[offset + 2] << 8 | array[offset + 3]) >>> 0;
    }
    exports.readUint32BE = readUint32BE;
    function readInt32LE(array, offset) {
      if (offset === void 0) {
        offset = 0;
      }
      return array[offset + 3] << 24 | array[offset + 2] << 16 | array[offset + 1] << 8 | array[offset];
    }
    exports.readInt32LE = readInt32LE;
    function readUint32LE(array, offset) {
      if (offset === void 0) {
        offset = 0;
      }
      return (array[offset + 3] << 24 | array[offset + 2] << 16 | array[offset + 1] << 8 | array[offset]) >>> 0;
    }
    exports.readUint32LE = readUint32LE;
    function writeUint32BE(value, out, offset) {
      if (out === void 0) {
        out = new Uint8Array(4);
      }
      if (offset === void 0) {
        offset = 0;
      }
      out[offset + 0] = value >>> 24;
      out[offset + 1] = value >>> 16;
      out[offset + 2] = value >>> 8;
      out[offset + 3] = value >>> 0;
      return out;
    }
    exports.writeUint32BE = writeUint32BE;
    exports.writeInt32BE = writeUint32BE;
    function writeUint32LE(value, out, offset) {
      if (out === void 0) {
        out = new Uint8Array(4);
      }
      if (offset === void 0) {
        offset = 0;
      }
      out[offset + 0] = value >>> 0;
      out[offset + 1] = value >>> 8;
      out[offset + 2] = value >>> 16;
      out[offset + 3] = value >>> 24;
      return out;
    }
    exports.writeUint32LE = writeUint32LE;
    exports.writeInt32LE = writeUint32LE;
    function readInt64BE(array, offset) {
      if (offset === void 0) {
        offset = 0;
      }
      var hi = readInt32BE(array, offset);
      var lo = readInt32BE(array, offset + 4);
      return hi * 4294967296 + lo - (lo >> 31) * 4294967296;
    }
    exports.readInt64BE = readInt64BE;
    function readUint64BE(array, offset) {
      if (offset === void 0) {
        offset = 0;
      }
      var hi = readUint32BE(array, offset);
      var lo = readUint32BE(array, offset + 4);
      return hi * 4294967296 + lo;
    }
    exports.readUint64BE = readUint64BE;
    function readInt64LE(array, offset) {
      if (offset === void 0) {
        offset = 0;
      }
      var lo = readInt32LE(array, offset);
      var hi = readInt32LE(array, offset + 4);
      return hi * 4294967296 + lo - (lo >> 31) * 4294967296;
    }
    exports.readInt64LE = readInt64LE;
    function readUint64LE(array, offset) {
      if (offset === void 0) {
        offset = 0;
      }
      var lo = readUint32LE(array, offset);
      var hi = readUint32LE(array, offset + 4);
      return hi * 4294967296 + lo;
    }
    exports.readUint64LE = readUint64LE;
    function writeUint64BE(value, out, offset) {
      if (out === void 0) {
        out = new Uint8Array(8);
      }
      if (offset === void 0) {
        offset = 0;
      }
      writeUint32BE(value / 4294967296 >>> 0, out, offset);
      writeUint32BE(value >>> 0, out, offset + 4);
      return out;
    }
    exports.writeUint64BE = writeUint64BE;
    exports.writeInt64BE = writeUint64BE;
    function writeUint64LE(value, out, offset) {
      if (out === void 0) {
        out = new Uint8Array(8);
      }
      if (offset === void 0) {
        offset = 0;
      }
      writeUint32LE(value >>> 0, out, offset);
      writeUint32LE(value / 4294967296 >>> 0, out, offset + 4);
      return out;
    }
    exports.writeUint64LE = writeUint64LE;
    exports.writeInt64LE = writeUint64LE;
    function readUintBE(bitLength, array, offset) {
      if (offset === void 0) {
        offset = 0;
      }
      if (bitLength % 8 !== 0) {
        throw new Error("readUintBE supports only bitLengths divisible by 8");
      }
      if (bitLength / 8 > array.length - offset) {
        throw new Error("readUintBE: array is too short for the given bitLength");
      }
      var result = 0;
      var mul = 1;
      for (var i2 = bitLength / 8 + offset - 1; i2 >= offset; i2--) {
        result += array[i2] * mul;
        mul *= 256;
      }
      return result;
    }
    exports.readUintBE = readUintBE;
    function readUintLE(bitLength, array, offset) {
      if (offset === void 0) {
        offset = 0;
      }
      if (bitLength % 8 !== 0) {
        throw new Error("readUintLE supports only bitLengths divisible by 8");
      }
      if (bitLength / 8 > array.length - offset) {
        throw new Error("readUintLE: array is too short for the given bitLength");
      }
      var result = 0;
      var mul = 1;
      for (var i2 = offset; i2 < offset + bitLength / 8; i2++) {
        result += array[i2] * mul;
        mul *= 256;
      }
      return result;
    }
    exports.readUintLE = readUintLE;
    function writeUintBE(bitLength, value, out, offset) {
      if (out === void 0) {
        out = new Uint8Array(bitLength / 8);
      }
      if (offset === void 0) {
        offset = 0;
      }
      if (bitLength % 8 !== 0) {
        throw new Error("writeUintBE supports only bitLengths divisible by 8");
      }
      if (!int_1.isSafeInteger(value)) {
        throw new Error("writeUintBE value must be an integer");
      }
      var div = 1;
      for (var i2 = bitLength / 8 + offset - 1; i2 >= offset; i2--) {
        out[i2] = value / div & 255;
        div *= 256;
      }
      return out;
    }
    exports.writeUintBE = writeUintBE;
    function writeUintLE(bitLength, value, out, offset) {
      if (out === void 0) {
        out = new Uint8Array(bitLength / 8);
      }
      if (offset === void 0) {
        offset = 0;
      }
      if (bitLength % 8 !== 0) {
        throw new Error("writeUintLE supports only bitLengths divisible by 8");
      }
      if (!int_1.isSafeInteger(value)) {
        throw new Error("writeUintLE value must be an integer");
      }
      var div = 1;
      for (var i2 = offset; i2 < offset + bitLength / 8; i2++) {
        out[i2] = value / div & 255;
        div *= 256;
      }
      return out;
    }
    exports.writeUintLE = writeUintLE;
    function readFloat32BE(array, offset) {
      if (offset === void 0) {
        offset = 0;
      }
      var view = new DataView(array.buffer, array.byteOffset, array.byteLength);
      return view.getFloat32(offset);
    }
    exports.readFloat32BE = readFloat32BE;
    function readFloat32LE(array, offset) {
      if (offset === void 0) {
        offset = 0;
      }
      var view = new DataView(array.buffer, array.byteOffset, array.byteLength);
      return view.getFloat32(offset, true);
    }
    exports.readFloat32LE = readFloat32LE;
    function readFloat64BE(array, offset) {
      if (offset === void 0) {
        offset = 0;
      }
      var view = new DataView(array.buffer, array.byteOffset, array.byteLength);
      return view.getFloat64(offset);
    }
    exports.readFloat64BE = readFloat64BE;
    function readFloat64LE(array, offset) {
      if (offset === void 0) {
        offset = 0;
      }
      var view = new DataView(array.buffer, array.byteOffset, array.byteLength);
      return view.getFloat64(offset, true);
    }
    exports.readFloat64LE = readFloat64LE;
    function writeFloat32BE(value, out, offset) {
      if (out === void 0) {
        out = new Uint8Array(4);
      }
      if (offset === void 0) {
        offset = 0;
      }
      var view = new DataView(out.buffer, out.byteOffset, out.byteLength);
      view.setFloat32(offset, value);
      return out;
    }
    exports.writeFloat32BE = writeFloat32BE;
    function writeFloat32LE(value, out, offset) {
      if (out === void 0) {
        out = new Uint8Array(4);
      }
      if (offset === void 0) {
        offset = 0;
      }
      var view = new DataView(out.buffer, out.byteOffset, out.byteLength);
      view.setFloat32(offset, value, true);
      return out;
    }
    exports.writeFloat32LE = writeFloat32LE;
    function writeFloat64BE(value, out, offset) {
      if (out === void 0) {
        out = new Uint8Array(8);
      }
      if (offset === void 0) {
        offset = 0;
      }
      var view = new DataView(out.buffer, out.byteOffset, out.byteLength);
      view.setFloat64(offset, value);
      return out;
    }
    exports.writeFloat64BE = writeFloat64BE;
    function writeFloat64LE(value, out, offset) {
      if (out === void 0) {
        out = new Uint8Array(8);
      }
      if (offset === void 0) {
        offset = 0;
      }
      var view = new DataView(out.buffer, out.byteOffset, out.byteLength);
      view.setFloat64(offset, value, true);
      return out;
    }
    exports.writeFloat64LE = writeFloat64LE;
  }
});

// node_modules/.pnpm/@stablelib+random@1.0.2/node_modules/@stablelib/random/lib/random.js
var require_random = __commonJS({
  "node_modules/.pnpm/@stablelib+random@1.0.2/node_modules/@stablelib/random/lib/random.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.randomStringForEntropy = exports.randomString = exports.randomUint32 = exports.randomBytes = exports.defaultRandomSource = void 0;
    var system_1 = require_system();
    var binary_1 = require_binary();
    var wipe_1 = require_wipe();
    exports.defaultRandomSource = new system_1.SystemRandomSource();
    function randomBytes2(length2, prng = exports.defaultRandomSource) {
      return prng.randomBytes(length2);
    }
    exports.randomBytes = randomBytes2;
    function randomUint32(prng = exports.defaultRandomSource) {
      const buf = randomBytes2(4, prng);
      const result = (0, binary_1.readUint32LE)(buf);
      (0, wipe_1.wipe)(buf);
      return result;
    }
    exports.randomUint32 = randomUint32;
    var ALPHANUMERIC = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    function randomString(length2, charset = ALPHANUMERIC, prng = exports.defaultRandomSource) {
      if (charset.length < 2) {
        throw new Error("randomString charset is too short");
      }
      if (charset.length > 256) {
        throw new Error("randomString charset is too long");
      }
      let out = "";
      const charsLen = charset.length;
      const maxByte = 256 - 256 % charsLen;
      while (length2 > 0) {
        const buf = randomBytes2(Math.ceil(length2 * 256 / maxByte), prng);
        for (let i2 = 0; i2 < buf.length && length2 > 0; i2++) {
          const randomByte = buf[i2];
          if (randomByte < maxByte) {
            out += charset.charAt(randomByte % charsLen);
            length2--;
          }
        }
        (0, wipe_1.wipe)(buf);
      }
      return out;
    }
    exports.randomString = randomString;
    function randomStringForEntropy(bits, charset = ALPHANUMERIC, prng = exports.defaultRandomSource) {
      const length2 = Math.ceil(bits / (Math.log(charset.length) / Math.LN2));
      return randomString(length2, charset, prng);
    }
    exports.randomStringForEntropy = randomStringForEntropy;
  }
});

// node_modules/.pnpm/@stablelib+sha512@1.0.1/node_modules/@stablelib/sha512/lib/sha512.js
var require_sha512 = __commonJS({
  "node_modules/.pnpm/@stablelib+sha512@1.0.1/node_modules/@stablelib/sha512/lib/sha512.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var binary_1 = require_binary();
    var wipe_1 = require_wipe();
    exports.DIGEST_LENGTH = 64;
    exports.BLOCK_SIZE = 128;
    var SHA512 = (
      /** @class */
      function() {
        function SHA5122() {
          this.digestLength = exports.DIGEST_LENGTH;
          this.blockSize = exports.BLOCK_SIZE;
          this._stateHi = new Int32Array(8);
          this._stateLo = new Int32Array(8);
          this._tempHi = new Int32Array(16);
          this._tempLo = new Int32Array(16);
          this._buffer = new Uint8Array(256);
          this._bufferLength = 0;
          this._bytesHashed = 0;
          this._finished = false;
          this.reset();
        }
        SHA5122.prototype._initState = function() {
          this._stateHi[0] = 1779033703;
          this._stateHi[1] = 3144134277;
          this._stateHi[2] = 1013904242;
          this._stateHi[3] = 2773480762;
          this._stateHi[4] = 1359893119;
          this._stateHi[5] = 2600822924;
          this._stateHi[6] = 528734635;
          this._stateHi[7] = 1541459225;
          this._stateLo[0] = 4089235720;
          this._stateLo[1] = 2227873595;
          this._stateLo[2] = 4271175723;
          this._stateLo[3] = 1595750129;
          this._stateLo[4] = 2917565137;
          this._stateLo[5] = 725511199;
          this._stateLo[6] = 4215389547;
          this._stateLo[7] = 327033209;
        };
        SHA5122.prototype.reset = function() {
          this._initState();
          this._bufferLength = 0;
          this._bytesHashed = 0;
          this._finished = false;
          return this;
        };
        SHA5122.prototype.clean = function() {
          wipe_1.wipe(this._buffer);
          wipe_1.wipe(this._tempHi);
          wipe_1.wipe(this._tempLo);
          this.reset();
        };
        SHA5122.prototype.update = function(data, dataLength) {
          if (dataLength === void 0) {
            dataLength = data.length;
          }
          if (this._finished) {
            throw new Error("SHA512: can't update because hash was finished.");
          }
          var dataPos = 0;
          this._bytesHashed += dataLength;
          if (this._bufferLength > 0) {
            while (this._bufferLength < exports.BLOCK_SIZE && dataLength > 0) {
              this._buffer[this._bufferLength++] = data[dataPos++];
              dataLength--;
            }
            if (this._bufferLength === this.blockSize) {
              hashBlocks(this._tempHi, this._tempLo, this._stateHi, this._stateLo, this._buffer, 0, this.blockSize);
              this._bufferLength = 0;
            }
          }
          if (dataLength >= this.blockSize) {
            dataPos = hashBlocks(this._tempHi, this._tempLo, this._stateHi, this._stateLo, data, dataPos, dataLength);
            dataLength %= this.blockSize;
          }
          while (dataLength > 0) {
            this._buffer[this._bufferLength++] = data[dataPos++];
            dataLength--;
          }
          return this;
        };
        SHA5122.prototype.finish = function(out) {
          if (!this._finished) {
            var bytesHashed = this._bytesHashed;
            var left = this._bufferLength;
            var bitLenHi = bytesHashed / 536870912 | 0;
            var bitLenLo = bytesHashed << 3;
            var padLength = bytesHashed % 128 < 112 ? 128 : 256;
            this._buffer[left] = 128;
            for (var i2 = left + 1; i2 < padLength - 8; i2++) {
              this._buffer[i2] = 0;
            }
            binary_1.writeUint32BE(bitLenHi, this._buffer, padLength - 8);
            binary_1.writeUint32BE(bitLenLo, this._buffer, padLength - 4);
            hashBlocks(this._tempHi, this._tempLo, this._stateHi, this._stateLo, this._buffer, 0, padLength);
            this._finished = true;
          }
          for (var i2 = 0; i2 < this.digestLength / 8; i2++) {
            binary_1.writeUint32BE(this._stateHi[i2], out, i2 * 8);
            binary_1.writeUint32BE(this._stateLo[i2], out, i2 * 8 + 4);
          }
          return this;
        };
        SHA5122.prototype.digest = function() {
          var out = new Uint8Array(this.digestLength);
          this.finish(out);
          return out;
        };
        SHA5122.prototype.saveState = function() {
          if (this._finished) {
            throw new Error("SHA256: cannot save finished state");
          }
          return {
            stateHi: new Int32Array(this._stateHi),
            stateLo: new Int32Array(this._stateLo),
            buffer: this._bufferLength > 0 ? new Uint8Array(this._buffer) : void 0,
            bufferLength: this._bufferLength,
            bytesHashed: this._bytesHashed
          };
        };
        SHA5122.prototype.restoreState = function(savedState) {
          this._stateHi.set(savedState.stateHi);
          this._stateLo.set(savedState.stateLo);
          this._bufferLength = savedState.bufferLength;
          if (savedState.buffer) {
            this._buffer.set(savedState.buffer);
          }
          this._bytesHashed = savedState.bytesHashed;
          this._finished = false;
          return this;
        };
        SHA5122.prototype.cleanSavedState = function(savedState) {
          wipe_1.wipe(savedState.stateHi);
          wipe_1.wipe(savedState.stateLo);
          if (savedState.buffer) {
            wipe_1.wipe(savedState.buffer);
          }
          savedState.bufferLength = 0;
          savedState.bytesHashed = 0;
        };
        return SHA5122;
      }()
    );
    exports.SHA512 = SHA512;
    var K2 = new Int32Array([
      1116352408,
      3609767458,
      1899447441,
      602891725,
      3049323471,
      3964484399,
      3921009573,
      2173295548,
      961987163,
      4081628472,
      1508970993,
      3053834265,
      2453635748,
      2937671579,
      2870763221,
      3664609560,
      3624381080,
      2734883394,
      310598401,
      1164996542,
      607225278,
      1323610764,
      1426881987,
      3590304994,
      1925078388,
      4068182383,
      2162078206,
      991336113,
      2614888103,
      633803317,
      3248222580,
      3479774868,
      3835390401,
      2666613458,
      4022224774,
      944711139,
      264347078,
      2341262773,
      604807628,
      2007800933,
      770255983,
      1495990901,
      1249150122,
      1856431235,
      1555081692,
      3175218132,
      1996064986,
      2198950837,
      2554220882,
      3999719339,
      2821834349,
      766784016,
      2952996808,
      2566594879,
      3210313671,
      3203337956,
      3336571891,
      1034457026,
      3584528711,
      2466948901,
      113926993,
      3758326383,
      338241895,
      168717936,
      666307205,
      1188179964,
      773529912,
      1546045734,
      1294757372,
      1522805485,
      1396182291,
      2643833823,
      1695183700,
      2343527390,
      1986661051,
      1014477480,
      2177026350,
      1206759142,
      2456956037,
      344077627,
      2730485921,
      1290863460,
      2820302411,
      3158454273,
      3259730800,
      3505952657,
      3345764771,
      106217008,
      3516065817,
      3606008344,
      3600352804,
      1432725776,
      4094571909,
      1467031594,
      275423344,
      851169720,
      430227734,
      3100823752,
      506948616,
      1363258195,
      659060556,
      3750685593,
      883997877,
      3785050280,
      958139571,
      3318307427,
      1322822218,
      3812723403,
      1537002063,
      2003034995,
      1747873779,
      3602036899,
      1955562222,
      1575990012,
      2024104815,
      1125592928,
      2227730452,
      2716904306,
      2361852424,
      442776044,
      2428436474,
      593698344,
      2756734187,
      3733110249,
      3204031479,
      2999351573,
      3329325298,
      3815920427,
      3391569614,
      3928383900,
      3515267271,
      566280711,
      3940187606,
      3454069534,
      4118630271,
      4000239992,
      116418474,
      1914138554,
      174292421,
      2731055270,
      289380356,
      3203993006,
      460393269,
      320620315,
      685471733,
      587496836,
      852142971,
      1086792851,
      1017036298,
      365543100,
      1126000580,
      2618297676,
      1288033470,
      3409855158,
      1501505948,
      4234509866,
      1607167915,
      987167468,
      1816402316,
      1246189591
    ]);
    function hashBlocks(wh, wl, hh, hl, m4, pos, len) {
      var ah0 = hh[0], ah1 = hh[1], ah2 = hh[2], ah3 = hh[3], ah4 = hh[4], ah5 = hh[5], ah6 = hh[6], ah7 = hh[7], al0 = hl[0], al1 = hl[1], al2 = hl[2], al3 = hl[3], al4 = hl[4], al5 = hl[5], al6 = hl[6], al7 = hl[7];
      var h2, l;
      var th, tl;
      var a2, b4, c2, d2;
      while (len >= 128) {
        for (var i2 = 0; i2 < 16; i2++) {
          var j3 = 8 * i2 + pos;
          wh[i2] = binary_1.readUint32BE(m4, j3);
          wl[i2] = binary_1.readUint32BE(m4, j3 + 4);
        }
        for (var i2 = 0; i2 < 80; i2++) {
          var bh0 = ah0;
          var bh1 = ah1;
          var bh2 = ah2;
          var bh3 = ah3;
          var bh4 = ah4;
          var bh5 = ah5;
          var bh6 = ah6;
          var bh7 = ah7;
          var bl0 = al0;
          var bl1 = al1;
          var bl2 = al2;
          var bl3 = al3;
          var bl4 = al4;
          var bl5 = al5;
          var bl6 = al6;
          var bl7 = al7;
          h2 = ah7;
          l = al7;
          a2 = l & 65535;
          b4 = l >>> 16;
          c2 = h2 & 65535;
          d2 = h2 >>> 16;
          h2 = (ah4 >>> 14 | al4 << 32 - 14) ^ (ah4 >>> 18 | al4 << 32 - 18) ^ (al4 >>> 41 - 32 | ah4 << 32 - (41 - 32));
          l = (al4 >>> 14 | ah4 << 32 - 14) ^ (al4 >>> 18 | ah4 << 32 - 18) ^ (ah4 >>> 41 - 32 | al4 << 32 - (41 - 32));
          a2 += l & 65535;
          b4 += l >>> 16;
          c2 += h2 & 65535;
          d2 += h2 >>> 16;
          h2 = ah4 & ah5 ^ ~ah4 & ah6;
          l = al4 & al5 ^ ~al4 & al6;
          a2 += l & 65535;
          b4 += l >>> 16;
          c2 += h2 & 65535;
          d2 += h2 >>> 16;
          h2 = K2[i2 * 2];
          l = K2[i2 * 2 + 1];
          a2 += l & 65535;
          b4 += l >>> 16;
          c2 += h2 & 65535;
          d2 += h2 >>> 16;
          h2 = wh[i2 % 16];
          l = wl[i2 % 16];
          a2 += l & 65535;
          b4 += l >>> 16;
          c2 += h2 & 65535;
          d2 += h2 >>> 16;
          b4 += a2 >>> 16;
          c2 += b4 >>> 16;
          d2 += c2 >>> 16;
          th = c2 & 65535 | d2 << 16;
          tl = a2 & 65535 | b4 << 16;
          h2 = th;
          l = tl;
          a2 = l & 65535;
          b4 = l >>> 16;
          c2 = h2 & 65535;
          d2 = h2 >>> 16;
          h2 = (ah0 >>> 28 | al0 << 32 - 28) ^ (al0 >>> 34 - 32 | ah0 << 32 - (34 - 32)) ^ (al0 >>> 39 - 32 | ah0 << 32 - (39 - 32));
          l = (al0 >>> 28 | ah0 << 32 - 28) ^ (ah0 >>> 34 - 32 | al0 << 32 - (34 - 32)) ^ (ah0 >>> 39 - 32 | al0 << 32 - (39 - 32));
          a2 += l & 65535;
          b4 += l >>> 16;
          c2 += h2 & 65535;
          d2 += h2 >>> 16;
          h2 = ah0 & ah1 ^ ah0 & ah2 ^ ah1 & ah2;
          l = al0 & al1 ^ al0 & al2 ^ al1 & al2;
          a2 += l & 65535;
          b4 += l >>> 16;
          c2 += h2 & 65535;
          d2 += h2 >>> 16;
          b4 += a2 >>> 16;
          c2 += b4 >>> 16;
          d2 += c2 >>> 16;
          bh7 = c2 & 65535 | d2 << 16;
          bl7 = a2 & 65535 | b4 << 16;
          h2 = bh3;
          l = bl3;
          a2 = l & 65535;
          b4 = l >>> 16;
          c2 = h2 & 65535;
          d2 = h2 >>> 16;
          h2 = th;
          l = tl;
          a2 += l & 65535;
          b4 += l >>> 16;
          c2 += h2 & 65535;
          d2 += h2 >>> 16;
          b4 += a2 >>> 16;
          c2 += b4 >>> 16;
          d2 += c2 >>> 16;
          bh3 = c2 & 65535 | d2 << 16;
          bl3 = a2 & 65535 | b4 << 16;
          ah1 = bh0;
          ah2 = bh1;
          ah3 = bh2;
          ah4 = bh3;
          ah5 = bh4;
          ah6 = bh5;
          ah7 = bh6;
          ah0 = bh7;
          al1 = bl0;
          al2 = bl1;
          al3 = bl2;
          al4 = bl3;
          al5 = bl4;
          al6 = bl5;
          al7 = bl6;
          al0 = bl7;
          if (i2 % 16 === 15) {
            for (var j3 = 0; j3 < 16; j3++) {
              h2 = wh[j3];
              l = wl[j3];
              a2 = l & 65535;
              b4 = l >>> 16;
              c2 = h2 & 65535;
              d2 = h2 >>> 16;
              h2 = wh[(j3 + 9) % 16];
              l = wl[(j3 + 9) % 16];
              a2 += l & 65535;
              b4 += l >>> 16;
              c2 += h2 & 65535;
              d2 += h2 >>> 16;
              th = wh[(j3 + 1) % 16];
              tl = wl[(j3 + 1) % 16];
              h2 = (th >>> 1 | tl << 32 - 1) ^ (th >>> 8 | tl << 32 - 8) ^ th >>> 7;
              l = (tl >>> 1 | th << 32 - 1) ^ (tl >>> 8 | th << 32 - 8) ^ (tl >>> 7 | th << 32 - 7);
              a2 += l & 65535;
              b4 += l >>> 16;
              c2 += h2 & 65535;
              d2 += h2 >>> 16;
              th = wh[(j3 + 14) % 16];
              tl = wl[(j3 + 14) % 16];
              h2 = (th >>> 19 | tl << 32 - 19) ^ (tl >>> 61 - 32 | th << 32 - (61 - 32)) ^ th >>> 6;
              l = (tl >>> 19 | th << 32 - 19) ^ (th >>> 61 - 32 | tl << 32 - (61 - 32)) ^ (tl >>> 6 | th << 32 - 6);
              a2 += l & 65535;
              b4 += l >>> 16;
              c2 += h2 & 65535;
              d2 += h2 >>> 16;
              b4 += a2 >>> 16;
              c2 += b4 >>> 16;
              d2 += c2 >>> 16;
              wh[j3] = c2 & 65535 | d2 << 16;
              wl[j3] = a2 & 65535 | b4 << 16;
            }
          }
        }
        h2 = ah0;
        l = al0;
        a2 = l & 65535;
        b4 = l >>> 16;
        c2 = h2 & 65535;
        d2 = h2 >>> 16;
        h2 = hh[0];
        l = hl[0];
        a2 += l & 65535;
        b4 += l >>> 16;
        c2 += h2 & 65535;
        d2 += h2 >>> 16;
        b4 += a2 >>> 16;
        c2 += b4 >>> 16;
        d2 += c2 >>> 16;
        hh[0] = ah0 = c2 & 65535 | d2 << 16;
        hl[0] = al0 = a2 & 65535 | b4 << 16;
        h2 = ah1;
        l = al1;
        a2 = l & 65535;
        b4 = l >>> 16;
        c2 = h2 & 65535;
        d2 = h2 >>> 16;
        h2 = hh[1];
        l = hl[1];
        a2 += l & 65535;
        b4 += l >>> 16;
        c2 += h2 & 65535;
        d2 += h2 >>> 16;
        b4 += a2 >>> 16;
        c2 += b4 >>> 16;
        d2 += c2 >>> 16;
        hh[1] = ah1 = c2 & 65535 | d2 << 16;
        hl[1] = al1 = a2 & 65535 | b4 << 16;
        h2 = ah2;
        l = al2;
        a2 = l & 65535;
        b4 = l >>> 16;
        c2 = h2 & 65535;
        d2 = h2 >>> 16;
        h2 = hh[2];
        l = hl[2];
        a2 += l & 65535;
        b4 += l >>> 16;
        c2 += h2 & 65535;
        d2 += h2 >>> 16;
        b4 += a2 >>> 16;
        c2 += b4 >>> 16;
        d2 += c2 >>> 16;
        hh[2] = ah2 = c2 & 65535 | d2 << 16;
        hl[2] = al2 = a2 & 65535 | b4 << 16;
        h2 = ah3;
        l = al3;
        a2 = l & 65535;
        b4 = l >>> 16;
        c2 = h2 & 65535;
        d2 = h2 >>> 16;
        h2 = hh[3];
        l = hl[3];
        a2 += l & 65535;
        b4 += l >>> 16;
        c2 += h2 & 65535;
        d2 += h2 >>> 16;
        b4 += a2 >>> 16;
        c2 += b4 >>> 16;
        d2 += c2 >>> 16;
        hh[3] = ah3 = c2 & 65535 | d2 << 16;
        hl[3] = al3 = a2 & 65535 | b4 << 16;
        h2 = ah4;
        l = al4;
        a2 = l & 65535;
        b4 = l >>> 16;
        c2 = h2 & 65535;
        d2 = h2 >>> 16;
        h2 = hh[4];
        l = hl[4];
        a2 += l & 65535;
        b4 += l >>> 16;
        c2 += h2 & 65535;
        d2 += h2 >>> 16;
        b4 += a2 >>> 16;
        c2 += b4 >>> 16;
        d2 += c2 >>> 16;
        hh[4] = ah4 = c2 & 65535 | d2 << 16;
        hl[4] = al4 = a2 & 65535 | b4 << 16;
        h2 = ah5;
        l = al5;
        a2 = l & 65535;
        b4 = l >>> 16;
        c2 = h2 & 65535;
        d2 = h2 >>> 16;
        h2 = hh[5];
        l = hl[5];
        a2 += l & 65535;
        b4 += l >>> 16;
        c2 += h2 & 65535;
        d2 += h2 >>> 16;
        b4 += a2 >>> 16;
        c2 += b4 >>> 16;
        d2 += c2 >>> 16;
        hh[5] = ah5 = c2 & 65535 | d2 << 16;
        hl[5] = al5 = a2 & 65535 | b4 << 16;
        h2 = ah6;
        l = al6;
        a2 = l & 65535;
        b4 = l >>> 16;
        c2 = h2 & 65535;
        d2 = h2 >>> 16;
        h2 = hh[6];
        l = hl[6];
        a2 += l & 65535;
        b4 += l >>> 16;
        c2 += h2 & 65535;
        d2 += h2 >>> 16;
        b4 += a2 >>> 16;
        c2 += b4 >>> 16;
        d2 += c2 >>> 16;
        hh[6] = ah6 = c2 & 65535 | d2 << 16;
        hl[6] = al6 = a2 & 65535 | b4 << 16;
        h2 = ah7;
        l = al7;
        a2 = l & 65535;
        b4 = l >>> 16;
        c2 = h2 & 65535;
        d2 = h2 >>> 16;
        h2 = hh[7];
        l = hl[7];
        a2 += l & 65535;
        b4 += l >>> 16;
        c2 += h2 & 65535;
        d2 += h2 >>> 16;
        b4 += a2 >>> 16;
        c2 += b4 >>> 16;
        d2 += c2 >>> 16;
        hh[7] = ah7 = c2 & 65535 | d2 << 16;
        hl[7] = al7 = a2 & 65535 | b4 << 16;
        pos += 128;
        len -= 128;
      }
      return pos;
    }
    function hash(data) {
      var h2 = new SHA512();
      h2.update(data);
      var digest2 = h2.digest();
      h2.clean();
      return digest2;
    }
    exports.hash = hash;
  }
});

// node_modules/.pnpm/@stablelib+ed25519@1.0.3/node_modules/@stablelib/ed25519/lib/ed25519.js
var require_ed25519 = __commonJS({
  "node_modules/.pnpm/@stablelib+ed25519@1.0.3/node_modules/@stablelib/ed25519/lib/ed25519.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.convertSecretKeyToX25519 = exports.convertPublicKeyToX25519 = exports.verify = exports.sign = exports.extractPublicKeyFromSecretKey = exports.generateKeyPair = exports.generateKeyPairFromSeed = exports.SEED_LENGTH = exports.SECRET_KEY_LENGTH = exports.PUBLIC_KEY_LENGTH = exports.SIGNATURE_LENGTH = void 0;
    var random_1 = require_random();
    var sha512_1 = require_sha512();
    var wipe_1 = require_wipe();
    exports.SIGNATURE_LENGTH = 64;
    exports.PUBLIC_KEY_LENGTH = 32;
    exports.SECRET_KEY_LENGTH = 64;
    exports.SEED_LENGTH = 32;
    function gf(init) {
      const r = new Float64Array(16);
      if (init) {
        for (let i2 = 0; i2 < init.length; i2++) {
          r[i2] = init[i2];
        }
      }
      return r;
    }
    var _9 = new Uint8Array(32);
    _9[0] = 9;
    var gf0 = gf();
    var gf1 = gf([1]);
    var D2 = gf([
      30883,
      4953,
      19914,
      30187,
      55467,
      16705,
      2637,
      112,
      59544,
      30585,
      16505,
      36039,
      65139,
      11119,
      27886,
      20995
    ]);
    var D22 = gf([
      61785,
      9906,
      39828,
      60374,
      45398,
      33411,
      5274,
      224,
      53552,
      61171,
      33010,
      6542,
      64743,
      22239,
      55772,
      9222
    ]);
    var X3 = gf([
      54554,
      36645,
      11616,
      51542,
      42930,
      38181,
      51040,
      26924,
      56412,
      64982,
      57905,
      49316,
      21502,
      52590,
      14035,
      8553
    ]);
    var Y3 = gf([
      26200,
      26214,
      26214,
      26214,
      26214,
      26214,
      26214,
      26214,
      26214,
      26214,
      26214,
      26214,
      26214,
      26214,
      26214,
      26214
    ]);
    var I2 = gf([
      41136,
      18958,
      6951,
      50414,
      58488,
      44335,
      6150,
      12099,
      55207,
      15867,
      153,
      11085,
      57099,
      20417,
      9344,
      11139
    ]);
    function set25519(r, a2) {
      for (let i2 = 0; i2 < 16; i2++) {
        r[i2] = a2[i2] | 0;
      }
    }
    function car25519(o) {
      let c2 = 1;
      for (let i2 = 0; i2 < 16; i2++) {
        let v = o[i2] + c2 + 65535;
        c2 = Math.floor(v / 65536);
        o[i2] = v - c2 * 65536;
      }
      o[0] += c2 - 1 + 37 * (c2 - 1);
    }
    function sel25519(p3, q4, b4) {
      const c2 = ~(b4 - 1);
      for (let i2 = 0; i2 < 16; i2++) {
        const t = c2 & (p3[i2] ^ q4[i2]);
        p3[i2] ^= t;
        q4[i2] ^= t;
      }
    }
    function pack25519(o, n2) {
      const m4 = gf();
      const t = gf();
      for (let i2 = 0; i2 < 16; i2++) {
        t[i2] = n2[i2];
      }
      car25519(t);
      car25519(t);
      car25519(t);
      for (let j3 = 0; j3 < 2; j3++) {
        m4[0] = t[0] - 65517;
        for (let i2 = 1; i2 < 15; i2++) {
          m4[i2] = t[i2] - 65535 - (m4[i2 - 1] >> 16 & 1);
          m4[i2 - 1] &= 65535;
        }
        m4[15] = t[15] - 32767 - (m4[14] >> 16 & 1);
        const b4 = m4[15] >> 16 & 1;
        m4[14] &= 65535;
        sel25519(t, m4, 1 - b4);
      }
      for (let i2 = 0; i2 < 16; i2++) {
        o[2 * i2] = t[i2] & 255;
        o[2 * i2 + 1] = t[i2] >> 8;
      }
    }
    function verify32(x2, y2) {
      let d2 = 0;
      for (let i2 = 0; i2 < 32; i2++) {
        d2 |= x2[i2] ^ y2[i2];
      }
      return (1 & d2 - 1 >>> 8) - 1;
    }
    function neq25519(a2, b4) {
      const c2 = new Uint8Array(32);
      const d2 = new Uint8Array(32);
      pack25519(c2, a2);
      pack25519(d2, b4);
      return verify32(c2, d2);
    }
    function par25519(a2) {
      const d2 = new Uint8Array(32);
      pack25519(d2, a2);
      return d2[0] & 1;
    }
    function unpack25519(o, n2) {
      for (let i2 = 0; i2 < 16; i2++) {
        o[i2] = n2[2 * i2] + (n2[2 * i2 + 1] << 8);
      }
      o[15] &= 32767;
    }
    function add(o, a2, b4) {
      for (let i2 = 0; i2 < 16; i2++) {
        o[i2] = a2[i2] + b4[i2];
      }
    }
    function sub(o, a2, b4) {
      for (let i2 = 0; i2 < 16; i2++) {
        o[i2] = a2[i2] - b4[i2];
      }
    }
    function mul(o, a2, b4) {
      let v, c2, t0 = 0, t1 = 0, t2 = 0, t3 = 0, t4 = 0, t5 = 0, t6 = 0, t7 = 0, t8 = 0, t9 = 0, t10 = 0, t11 = 0, t12 = 0, t13 = 0, t14 = 0, t15 = 0, t16 = 0, t17 = 0, t18 = 0, t19 = 0, t20 = 0, t21 = 0, t22 = 0, t23 = 0, t24 = 0, t25 = 0, t26 = 0, t27 = 0, t28 = 0, t29 = 0, t30 = 0, b0 = b4[0], b1 = b4[1], b22 = b4[2], b32 = b4[3], b42 = b4[4], b5 = b4[5], b6 = b4[6], b7 = b4[7], b8 = b4[8], b9 = b4[9], b10 = b4[10], b11 = b4[11], b12 = b4[12], b13 = b4[13], b14 = b4[14], b15 = b4[15];
      v = a2[0];
      t0 += v * b0;
      t1 += v * b1;
      t2 += v * b22;
      t3 += v * b32;
      t4 += v * b42;
      t5 += v * b5;
      t6 += v * b6;
      t7 += v * b7;
      t8 += v * b8;
      t9 += v * b9;
      t10 += v * b10;
      t11 += v * b11;
      t12 += v * b12;
      t13 += v * b13;
      t14 += v * b14;
      t15 += v * b15;
      v = a2[1];
      t1 += v * b0;
      t2 += v * b1;
      t3 += v * b22;
      t4 += v * b32;
      t5 += v * b42;
      t6 += v * b5;
      t7 += v * b6;
      t8 += v * b7;
      t9 += v * b8;
      t10 += v * b9;
      t11 += v * b10;
      t12 += v * b11;
      t13 += v * b12;
      t14 += v * b13;
      t15 += v * b14;
      t16 += v * b15;
      v = a2[2];
      t2 += v * b0;
      t3 += v * b1;
      t4 += v * b22;
      t5 += v * b32;
      t6 += v * b42;
      t7 += v * b5;
      t8 += v * b6;
      t9 += v * b7;
      t10 += v * b8;
      t11 += v * b9;
      t12 += v * b10;
      t13 += v * b11;
      t14 += v * b12;
      t15 += v * b13;
      t16 += v * b14;
      t17 += v * b15;
      v = a2[3];
      t3 += v * b0;
      t4 += v * b1;
      t5 += v * b22;
      t6 += v * b32;
      t7 += v * b42;
      t8 += v * b5;
      t9 += v * b6;
      t10 += v * b7;
      t11 += v * b8;
      t12 += v * b9;
      t13 += v * b10;
      t14 += v * b11;
      t15 += v * b12;
      t16 += v * b13;
      t17 += v * b14;
      t18 += v * b15;
      v = a2[4];
      t4 += v * b0;
      t5 += v * b1;
      t6 += v * b22;
      t7 += v * b32;
      t8 += v * b42;
      t9 += v * b5;
      t10 += v * b6;
      t11 += v * b7;
      t12 += v * b8;
      t13 += v * b9;
      t14 += v * b10;
      t15 += v * b11;
      t16 += v * b12;
      t17 += v * b13;
      t18 += v * b14;
      t19 += v * b15;
      v = a2[5];
      t5 += v * b0;
      t6 += v * b1;
      t7 += v * b22;
      t8 += v * b32;
      t9 += v * b42;
      t10 += v * b5;
      t11 += v * b6;
      t12 += v * b7;
      t13 += v * b8;
      t14 += v * b9;
      t15 += v * b10;
      t16 += v * b11;
      t17 += v * b12;
      t18 += v * b13;
      t19 += v * b14;
      t20 += v * b15;
      v = a2[6];
      t6 += v * b0;
      t7 += v * b1;
      t8 += v * b22;
      t9 += v * b32;
      t10 += v * b42;
      t11 += v * b5;
      t12 += v * b6;
      t13 += v * b7;
      t14 += v * b8;
      t15 += v * b9;
      t16 += v * b10;
      t17 += v * b11;
      t18 += v * b12;
      t19 += v * b13;
      t20 += v * b14;
      t21 += v * b15;
      v = a2[7];
      t7 += v * b0;
      t8 += v * b1;
      t9 += v * b22;
      t10 += v * b32;
      t11 += v * b42;
      t12 += v * b5;
      t13 += v * b6;
      t14 += v * b7;
      t15 += v * b8;
      t16 += v * b9;
      t17 += v * b10;
      t18 += v * b11;
      t19 += v * b12;
      t20 += v * b13;
      t21 += v * b14;
      t22 += v * b15;
      v = a2[8];
      t8 += v * b0;
      t9 += v * b1;
      t10 += v * b22;
      t11 += v * b32;
      t12 += v * b42;
      t13 += v * b5;
      t14 += v * b6;
      t15 += v * b7;
      t16 += v * b8;
      t17 += v * b9;
      t18 += v * b10;
      t19 += v * b11;
      t20 += v * b12;
      t21 += v * b13;
      t22 += v * b14;
      t23 += v * b15;
      v = a2[9];
      t9 += v * b0;
      t10 += v * b1;
      t11 += v * b22;
      t12 += v * b32;
      t13 += v * b42;
      t14 += v * b5;
      t15 += v * b6;
      t16 += v * b7;
      t17 += v * b8;
      t18 += v * b9;
      t19 += v * b10;
      t20 += v * b11;
      t21 += v * b12;
      t22 += v * b13;
      t23 += v * b14;
      t24 += v * b15;
      v = a2[10];
      t10 += v * b0;
      t11 += v * b1;
      t12 += v * b22;
      t13 += v * b32;
      t14 += v * b42;
      t15 += v * b5;
      t16 += v * b6;
      t17 += v * b7;
      t18 += v * b8;
      t19 += v * b9;
      t20 += v * b10;
      t21 += v * b11;
      t22 += v * b12;
      t23 += v * b13;
      t24 += v * b14;
      t25 += v * b15;
      v = a2[11];
      t11 += v * b0;
      t12 += v * b1;
      t13 += v * b22;
      t14 += v * b32;
      t15 += v * b42;
      t16 += v * b5;
      t17 += v * b6;
      t18 += v * b7;
      t19 += v * b8;
      t20 += v * b9;
      t21 += v * b10;
      t22 += v * b11;
      t23 += v * b12;
      t24 += v * b13;
      t25 += v * b14;
      t26 += v * b15;
      v = a2[12];
      t12 += v * b0;
      t13 += v * b1;
      t14 += v * b22;
      t15 += v * b32;
      t16 += v * b42;
      t17 += v * b5;
      t18 += v * b6;
      t19 += v * b7;
      t20 += v * b8;
      t21 += v * b9;
      t22 += v * b10;
      t23 += v * b11;
      t24 += v * b12;
      t25 += v * b13;
      t26 += v * b14;
      t27 += v * b15;
      v = a2[13];
      t13 += v * b0;
      t14 += v * b1;
      t15 += v * b22;
      t16 += v * b32;
      t17 += v * b42;
      t18 += v * b5;
      t19 += v * b6;
      t20 += v * b7;
      t21 += v * b8;
      t22 += v * b9;
      t23 += v * b10;
      t24 += v * b11;
      t25 += v * b12;
      t26 += v * b13;
      t27 += v * b14;
      t28 += v * b15;
      v = a2[14];
      t14 += v * b0;
      t15 += v * b1;
      t16 += v * b22;
      t17 += v * b32;
      t18 += v * b42;
      t19 += v * b5;
      t20 += v * b6;
      t21 += v * b7;
      t22 += v * b8;
      t23 += v * b9;
      t24 += v * b10;
      t25 += v * b11;
      t26 += v * b12;
      t27 += v * b13;
      t28 += v * b14;
      t29 += v * b15;
      v = a2[15];
      t15 += v * b0;
      t16 += v * b1;
      t17 += v * b22;
      t18 += v * b32;
      t19 += v * b42;
      t20 += v * b5;
      t21 += v * b6;
      t22 += v * b7;
      t23 += v * b8;
      t24 += v * b9;
      t25 += v * b10;
      t26 += v * b11;
      t27 += v * b12;
      t28 += v * b13;
      t29 += v * b14;
      t30 += v * b15;
      t0 += 38 * t16;
      t1 += 38 * t17;
      t2 += 38 * t18;
      t3 += 38 * t19;
      t4 += 38 * t20;
      t5 += 38 * t21;
      t6 += 38 * t22;
      t7 += 38 * t23;
      t8 += 38 * t24;
      t9 += 38 * t25;
      t10 += 38 * t26;
      t11 += 38 * t27;
      t12 += 38 * t28;
      t13 += 38 * t29;
      t14 += 38 * t30;
      c2 = 1;
      v = t0 + c2 + 65535;
      c2 = Math.floor(v / 65536);
      t0 = v - c2 * 65536;
      v = t1 + c2 + 65535;
      c2 = Math.floor(v / 65536);
      t1 = v - c2 * 65536;
      v = t2 + c2 + 65535;
      c2 = Math.floor(v / 65536);
      t2 = v - c2 * 65536;
      v = t3 + c2 + 65535;
      c2 = Math.floor(v / 65536);
      t3 = v - c2 * 65536;
      v = t4 + c2 + 65535;
      c2 = Math.floor(v / 65536);
      t4 = v - c2 * 65536;
      v = t5 + c2 + 65535;
      c2 = Math.floor(v / 65536);
      t5 = v - c2 * 65536;
      v = t6 + c2 + 65535;
      c2 = Math.floor(v / 65536);
      t6 = v - c2 * 65536;
      v = t7 + c2 + 65535;
      c2 = Math.floor(v / 65536);
      t7 = v - c2 * 65536;
      v = t8 + c2 + 65535;
      c2 = Math.floor(v / 65536);
      t8 = v - c2 * 65536;
      v = t9 + c2 + 65535;
      c2 = Math.floor(v / 65536);
      t9 = v - c2 * 65536;
      v = t10 + c2 + 65535;
      c2 = Math.floor(v / 65536);
      t10 = v - c2 * 65536;
      v = t11 + c2 + 65535;
      c2 = Math.floor(v / 65536);
      t11 = v - c2 * 65536;
      v = t12 + c2 + 65535;
      c2 = Math.floor(v / 65536);
      t12 = v - c2 * 65536;
      v = t13 + c2 + 65535;
      c2 = Math.floor(v / 65536);
      t13 = v - c2 * 65536;
      v = t14 + c2 + 65535;
      c2 = Math.floor(v / 65536);
      t14 = v - c2 * 65536;
      v = t15 + c2 + 65535;
      c2 = Math.floor(v / 65536);
      t15 = v - c2 * 65536;
      t0 += c2 - 1 + 37 * (c2 - 1);
      c2 = 1;
      v = t0 + c2 + 65535;
      c2 = Math.floor(v / 65536);
      t0 = v - c2 * 65536;
      v = t1 + c2 + 65535;
      c2 = Math.floor(v / 65536);
      t1 = v - c2 * 65536;
      v = t2 + c2 + 65535;
      c2 = Math.floor(v / 65536);
      t2 = v - c2 * 65536;
      v = t3 + c2 + 65535;
      c2 = Math.floor(v / 65536);
      t3 = v - c2 * 65536;
      v = t4 + c2 + 65535;
      c2 = Math.floor(v / 65536);
      t4 = v - c2 * 65536;
      v = t5 + c2 + 65535;
      c2 = Math.floor(v / 65536);
      t5 = v - c2 * 65536;
      v = t6 + c2 + 65535;
      c2 = Math.floor(v / 65536);
      t6 = v - c2 * 65536;
      v = t7 + c2 + 65535;
      c2 = Math.floor(v / 65536);
      t7 = v - c2 * 65536;
      v = t8 + c2 + 65535;
      c2 = Math.floor(v / 65536);
      t8 = v - c2 * 65536;
      v = t9 + c2 + 65535;
      c2 = Math.floor(v / 65536);
      t9 = v - c2 * 65536;
      v = t10 + c2 + 65535;
      c2 = Math.floor(v / 65536);
      t10 = v - c2 * 65536;
      v = t11 + c2 + 65535;
      c2 = Math.floor(v / 65536);
      t11 = v - c2 * 65536;
      v = t12 + c2 + 65535;
      c2 = Math.floor(v / 65536);
      t12 = v - c2 * 65536;
      v = t13 + c2 + 65535;
      c2 = Math.floor(v / 65536);
      t13 = v - c2 * 65536;
      v = t14 + c2 + 65535;
      c2 = Math.floor(v / 65536);
      t14 = v - c2 * 65536;
      v = t15 + c2 + 65535;
      c2 = Math.floor(v / 65536);
      t15 = v - c2 * 65536;
      t0 += c2 - 1 + 37 * (c2 - 1);
      o[0] = t0;
      o[1] = t1;
      o[2] = t2;
      o[3] = t3;
      o[4] = t4;
      o[5] = t5;
      o[6] = t6;
      o[7] = t7;
      o[8] = t8;
      o[9] = t9;
      o[10] = t10;
      o[11] = t11;
      o[12] = t12;
      o[13] = t13;
      o[14] = t14;
      o[15] = t15;
    }
    function square(o, a2) {
      mul(o, a2, a2);
    }
    function inv25519(o, i2) {
      const c2 = gf();
      let a2;
      for (a2 = 0; a2 < 16; a2++) {
        c2[a2] = i2[a2];
      }
      for (a2 = 253; a2 >= 0; a2--) {
        square(c2, c2);
        if (a2 !== 2 && a2 !== 4) {
          mul(c2, c2, i2);
        }
      }
      for (a2 = 0; a2 < 16; a2++) {
        o[a2] = c2[a2];
      }
    }
    function pow2523(o, i2) {
      const c2 = gf();
      let a2;
      for (a2 = 0; a2 < 16; a2++) {
        c2[a2] = i2[a2];
      }
      for (a2 = 250; a2 >= 0; a2--) {
        square(c2, c2);
        if (a2 !== 1) {
          mul(c2, c2, i2);
        }
      }
      for (a2 = 0; a2 < 16; a2++) {
        o[a2] = c2[a2];
      }
    }
    function edadd(p3, q4) {
      const a2 = gf(), b4 = gf(), c2 = gf(), d2 = gf(), e = gf(), f3 = gf(), g2 = gf(), h2 = gf(), t = gf();
      sub(a2, p3[1], p3[0]);
      sub(t, q4[1], q4[0]);
      mul(a2, a2, t);
      add(b4, p3[0], p3[1]);
      add(t, q4[0], q4[1]);
      mul(b4, b4, t);
      mul(c2, p3[3], q4[3]);
      mul(c2, c2, D22);
      mul(d2, p3[2], q4[2]);
      add(d2, d2, d2);
      sub(e, b4, a2);
      sub(f3, d2, c2);
      add(g2, d2, c2);
      add(h2, b4, a2);
      mul(p3[0], e, f3);
      mul(p3[1], h2, g2);
      mul(p3[2], g2, f3);
      mul(p3[3], e, h2);
    }
    function cswap(p3, q4, b4) {
      for (let i2 = 0; i2 < 4; i2++) {
        sel25519(p3[i2], q4[i2], b4);
      }
    }
    function pack(r, p3) {
      const tx = gf(), ty = gf(), zi2 = gf();
      inv25519(zi2, p3[2]);
      mul(tx, p3[0], zi2);
      mul(ty, p3[1], zi2);
      pack25519(r, ty);
      r[31] ^= par25519(tx) << 7;
    }
    function scalarmult(p3, q4, s) {
      set25519(p3[0], gf0);
      set25519(p3[1], gf1);
      set25519(p3[2], gf1);
      set25519(p3[3], gf0);
      for (let i2 = 255; i2 >= 0; --i2) {
        const b4 = s[i2 / 8 | 0] >> (i2 & 7) & 1;
        cswap(p3, q4, b4);
        edadd(q4, p3);
        edadd(p3, p3);
        cswap(p3, q4, b4);
      }
    }
    function scalarbase(p3, s) {
      const q4 = [gf(), gf(), gf(), gf()];
      set25519(q4[0], X3);
      set25519(q4[1], Y3);
      set25519(q4[2], gf1);
      mul(q4[3], X3, Y3);
      scalarmult(p3, q4, s);
    }
    function generateKeyPairFromSeed2(seed) {
      if (seed.length !== exports.SEED_LENGTH) {
        throw new Error(`ed25519: seed must be ${exports.SEED_LENGTH} bytes`);
      }
      const d2 = (0, sha512_1.hash)(seed);
      d2[0] &= 248;
      d2[31] &= 127;
      d2[31] |= 64;
      const publicKey = new Uint8Array(32);
      const p3 = [gf(), gf(), gf(), gf()];
      scalarbase(p3, d2);
      pack(publicKey, p3);
      const secretKey = new Uint8Array(64);
      secretKey.set(seed);
      secretKey.set(publicKey, 32);
      return {
        publicKey,
        secretKey
      };
    }
    exports.generateKeyPairFromSeed = generateKeyPairFromSeed2;
    function generateKeyPair3(prng) {
      const seed = (0, random_1.randomBytes)(32, prng);
      const result = generateKeyPairFromSeed2(seed);
      (0, wipe_1.wipe)(seed);
      return result;
    }
    exports.generateKeyPair = generateKeyPair3;
    function extractPublicKeyFromSecretKey(secretKey) {
      if (secretKey.length !== exports.SECRET_KEY_LENGTH) {
        throw new Error(`ed25519: secret key must be ${exports.SECRET_KEY_LENGTH} bytes`);
      }
      return new Uint8Array(secretKey.subarray(32));
    }
    exports.extractPublicKeyFromSecretKey = extractPublicKeyFromSecretKey;
    var L = new Float64Array([
      237,
      211,
      245,
      92,
      26,
      99,
      18,
      88,
      214,
      156,
      247,
      162,
      222,
      249,
      222,
      20,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      16
    ]);
    function modL(r, x2) {
      let carry;
      let i2;
      let j3;
      let k3;
      for (i2 = 63; i2 >= 32; --i2) {
        carry = 0;
        for (j3 = i2 - 32, k3 = i2 - 12; j3 < k3; ++j3) {
          x2[j3] += carry - 16 * x2[i2] * L[j3 - (i2 - 32)];
          carry = Math.floor((x2[j3] + 128) / 256);
          x2[j3] -= carry * 256;
        }
        x2[j3] += carry;
        x2[i2] = 0;
      }
      carry = 0;
      for (j3 = 0; j3 < 32; j3++) {
        x2[j3] += carry - (x2[31] >> 4) * L[j3];
        carry = x2[j3] >> 8;
        x2[j3] &= 255;
      }
      for (j3 = 0; j3 < 32; j3++) {
        x2[j3] -= carry * L[j3];
      }
      for (i2 = 0; i2 < 32; i2++) {
        x2[i2 + 1] += x2[i2] >> 8;
        r[i2] = x2[i2] & 255;
      }
    }
    function reduce(r) {
      const x2 = new Float64Array(64);
      for (let i2 = 0; i2 < 64; i2++) {
        x2[i2] = r[i2];
      }
      for (let i2 = 0; i2 < 64; i2++) {
        r[i2] = 0;
      }
      modL(r, x2);
    }
    function sign2(secretKey, message) {
      const x2 = new Float64Array(64);
      const p3 = [gf(), gf(), gf(), gf()];
      const d2 = (0, sha512_1.hash)(secretKey.subarray(0, 32));
      d2[0] &= 248;
      d2[31] &= 127;
      d2[31] |= 64;
      const signature = new Uint8Array(64);
      signature.set(d2.subarray(32), 32);
      const hs2 = new sha512_1.SHA512();
      hs2.update(signature.subarray(32));
      hs2.update(message);
      const r = hs2.digest();
      hs2.clean();
      reduce(r);
      scalarbase(p3, r);
      pack(signature, p3);
      hs2.reset();
      hs2.update(signature.subarray(0, 32));
      hs2.update(secretKey.subarray(32));
      hs2.update(message);
      const h2 = hs2.digest();
      reduce(h2);
      for (let i2 = 0; i2 < 32; i2++) {
        x2[i2] = r[i2];
      }
      for (let i2 = 0; i2 < 32; i2++) {
        for (let j3 = 0; j3 < 32; j3++) {
          x2[i2 + j3] += h2[i2] * d2[j3];
        }
      }
      modL(signature.subarray(32), x2);
      return signature;
    }
    exports.sign = sign2;
    function unpackneg(r, p3) {
      const t = gf(), chk = gf(), num = gf(), den = gf(), den2 = gf(), den4 = gf(), den6 = gf();
      set25519(r[2], gf1);
      unpack25519(r[1], p3);
      square(num, r[1]);
      mul(den, num, D2);
      sub(num, num, r[2]);
      add(den, r[2], den);
      square(den2, den);
      square(den4, den2);
      mul(den6, den4, den2);
      mul(t, den6, num);
      mul(t, t, den);
      pow2523(t, t);
      mul(t, t, num);
      mul(t, t, den);
      mul(t, t, den);
      mul(r[0], t, den);
      square(chk, r[0]);
      mul(chk, chk, den);
      if (neq25519(chk, num)) {
        mul(r[0], r[0], I2);
      }
      square(chk, r[0]);
      mul(chk, chk, den);
      if (neq25519(chk, num)) {
        return -1;
      }
      if (par25519(r[0]) === p3[31] >> 7) {
        sub(r[0], gf0, r[0]);
      }
      mul(r[3], r[0], r[1]);
      return 0;
    }
    function verify2(publicKey, message, signature) {
      const t = new Uint8Array(32);
      const p3 = [gf(), gf(), gf(), gf()];
      const q4 = [gf(), gf(), gf(), gf()];
      if (signature.length !== exports.SIGNATURE_LENGTH) {
        throw new Error(`ed25519: signature must be ${exports.SIGNATURE_LENGTH} bytes`);
      }
      if (unpackneg(q4, publicKey)) {
        return false;
      }
      const hs2 = new sha512_1.SHA512();
      hs2.update(signature.subarray(0, 32));
      hs2.update(publicKey);
      hs2.update(message);
      const h2 = hs2.digest();
      reduce(h2);
      scalarmult(p3, q4, h2);
      scalarbase(q4, signature.subarray(32));
      edadd(p3, q4);
      pack(t, p3);
      if (verify32(signature, t)) {
        return false;
      }
      return true;
    }
    exports.verify = verify2;
    function convertPublicKeyToX25519(publicKey) {
      let q4 = [gf(), gf(), gf(), gf()];
      if (unpackneg(q4, publicKey)) {
        throw new Error("Ed25519: invalid public key");
      }
      let a2 = gf();
      let b4 = gf();
      let y2 = q4[1];
      add(a2, gf1, y2);
      sub(b4, gf1, y2);
      inv25519(b4, b4);
      mul(a2, a2, b4);
      let z2 = new Uint8Array(32);
      pack25519(z2, a2);
      return z2;
    }
    exports.convertPublicKeyToX25519 = convertPublicKeyToX25519;
    function convertSecretKeyToX25519(secretKey) {
      const d2 = (0, sha512_1.hash)(secretKey.subarray(0, 32));
      d2[0] &= 248;
      d2[31] &= 127;
      d2[31] |= 64;
      const o = new Uint8Array(d2.subarray(0, 32));
      (0, wipe_1.wipe)(d2);
      return o;
    }
    exports.convertSecretKeyToX25519 = convertSecretKeyToX25519;
  }
});

// node_modules/.pnpm/@stablelib+chacha@1.0.1/node_modules/@stablelib/chacha/lib/chacha.js
var require_chacha = __commonJS({
  "node_modules/.pnpm/@stablelib+chacha@1.0.1/node_modules/@stablelib/chacha/lib/chacha.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var binary_1 = require_binary();
    var wipe_1 = require_wipe();
    var ROUNDS = 20;
    function core(out, input, key) {
      var j0 = 1634760805;
      var j1 = 857760878;
      var j22 = 2036477234;
      var j3 = 1797285236;
      var j4 = key[3] << 24 | key[2] << 16 | key[1] << 8 | key[0];
      var j5 = key[7] << 24 | key[6] << 16 | key[5] << 8 | key[4];
      var j6 = key[11] << 24 | key[10] << 16 | key[9] << 8 | key[8];
      var j7 = key[15] << 24 | key[14] << 16 | key[13] << 8 | key[12];
      var j8 = key[19] << 24 | key[18] << 16 | key[17] << 8 | key[16];
      var j9 = key[23] << 24 | key[22] << 16 | key[21] << 8 | key[20];
      var j10 = key[27] << 24 | key[26] << 16 | key[25] << 8 | key[24];
      var j11 = key[31] << 24 | key[30] << 16 | key[29] << 8 | key[28];
      var j12 = input[3] << 24 | input[2] << 16 | input[1] << 8 | input[0];
      var j13 = input[7] << 24 | input[6] << 16 | input[5] << 8 | input[4];
      var j14 = input[11] << 24 | input[10] << 16 | input[9] << 8 | input[8];
      var j15 = input[15] << 24 | input[14] << 16 | input[13] << 8 | input[12];
      var x0 = j0;
      var x1 = j1;
      var x2 = j22;
      var x3 = j3;
      var x4 = j4;
      var x5 = j5;
      var x6 = j6;
      var x7 = j7;
      var x8 = j8;
      var x9 = j9;
      var x10 = j10;
      var x11 = j11;
      var x12 = j12;
      var x13 = j13;
      var x14 = j14;
      var x15 = j15;
      for (var i2 = 0; i2 < ROUNDS; i2 += 2) {
        x0 = x0 + x4 | 0;
        x12 ^= x0;
        x12 = x12 >>> 32 - 16 | x12 << 16;
        x8 = x8 + x12 | 0;
        x4 ^= x8;
        x4 = x4 >>> 32 - 12 | x4 << 12;
        x1 = x1 + x5 | 0;
        x13 ^= x1;
        x13 = x13 >>> 32 - 16 | x13 << 16;
        x9 = x9 + x13 | 0;
        x5 ^= x9;
        x5 = x5 >>> 32 - 12 | x5 << 12;
        x2 = x2 + x6 | 0;
        x14 ^= x2;
        x14 = x14 >>> 32 - 16 | x14 << 16;
        x10 = x10 + x14 | 0;
        x6 ^= x10;
        x6 = x6 >>> 32 - 12 | x6 << 12;
        x3 = x3 + x7 | 0;
        x15 ^= x3;
        x15 = x15 >>> 32 - 16 | x15 << 16;
        x11 = x11 + x15 | 0;
        x7 ^= x11;
        x7 = x7 >>> 32 - 12 | x7 << 12;
        x2 = x2 + x6 | 0;
        x14 ^= x2;
        x14 = x14 >>> 32 - 8 | x14 << 8;
        x10 = x10 + x14 | 0;
        x6 ^= x10;
        x6 = x6 >>> 32 - 7 | x6 << 7;
        x3 = x3 + x7 | 0;
        x15 ^= x3;
        x15 = x15 >>> 32 - 8 | x15 << 8;
        x11 = x11 + x15 | 0;
        x7 ^= x11;
        x7 = x7 >>> 32 - 7 | x7 << 7;
        x1 = x1 + x5 | 0;
        x13 ^= x1;
        x13 = x13 >>> 32 - 8 | x13 << 8;
        x9 = x9 + x13 | 0;
        x5 ^= x9;
        x5 = x5 >>> 32 - 7 | x5 << 7;
        x0 = x0 + x4 | 0;
        x12 ^= x0;
        x12 = x12 >>> 32 - 8 | x12 << 8;
        x8 = x8 + x12 | 0;
        x4 ^= x8;
        x4 = x4 >>> 32 - 7 | x4 << 7;
        x0 = x0 + x5 | 0;
        x15 ^= x0;
        x15 = x15 >>> 32 - 16 | x15 << 16;
        x10 = x10 + x15 | 0;
        x5 ^= x10;
        x5 = x5 >>> 32 - 12 | x5 << 12;
        x1 = x1 + x6 | 0;
        x12 ^= x1;
        x12 = x12 >>> 32 - 16 | x12 << 16;
        x11 = x11 + x12 | 0;
        x6 ^= x11;
        x6 = x6 >>> 32 - 12 | x6 << 12;
        x2 = x2 + x7 | 0;
        x13 ^= x2;
        x13 = x13 >>> 32 - 16 | x13 << 16;
        x8 = x8 + x13 | 0;
        x7 ^= x8;
        x7 = x7 >>> 32 - 12 | x7 << 12;
        x3 = x3 + x4 | 0;
        x14 ^= x3;
        x14 = x14 >>> 32 - 16 | x14 << 16;
        x9 = x9 + x14 | 0;
        x4 ^= x9;
        x4 = x4 >>> 32 - 12 | x4 << 12;
        x2 = x2 + x7 | 0;
        x13 ^= x2;
        x13 = x13 >>> 32 - 8 | x13 << 8;
        x8 = x8 + x13 | 0;
        x7 ^= x8;
        x7 = x7 >>> 32 - 7 | x7 << 7;
        x3 = x3 + x4 | 0;
        x14 ^= x3;
        x14 = x14 >>> 32 - 8 | x14 << 8;
        x9 = x9 + x14 | 0;
        x4 ^= x9;
        x4 = x4 >>> 32 - 7 | x4 << 7;
        x1 = x1 + x6 | 0;
        x12 ^= x1;
        x12 = x12 >>> 32 - 8 | x12 << 8;
        x11 = x11 + x12 | 0;
        x6 ^= x11;
        x6 = x6 >>> 32 - 7 | x6 << 7;
        x0 = x0 + x5 | 0;
        x15 ^= x0;
        x15 = x15 >>> 32 - 8 | x15 << 8;
        x10 = x10 + x15 | 0;
        x5 ^= x10;
        x5 = x5 >>> 32 - 7 | x5 << 7;
      }
      binary_1.writeUint32LE(x0 + j0 | 0, out, 0);
      binary_1.writeUint32LE(x1 + j1 | 0, out, 4);
      binary_1.writeUint32LE(x2 + j22 | 0, out, 8);
      binary_1.writeUint32LE(x3 + j3 | 0, out, 12);
      binary_1.writeUint32LE(x4 + j4 | 0, out, 16);
      binary_1.writeUint32LE(x5 + j5 | 0, out, 20);
      binary_1.writeUint32LE(x6 + j6 | 0, out, 24);
      binary_1.writeUint32LE(x7 + j7 | 0, out, 28);
      binary_1.writeUint32LE(x8 + j8 | 0, out, 32);
      binary_1.writeUint32LE(x9 + j9 | 0, out, 36);
      binary_1.writeUint32LE(x10 + j10 | 0, out, 40);
      binary_1.writeUint32LE(x11 + j11 | 0, out, 44);
      binary_1.writeUint32LE(x12 + j12 | 0, out, 48);
      binary_1.writeUint32LE(x13 + j13 | 0, out, 52);
      binary_1.writeUint32LE(x14 + j14 | 0, out, 56);
      binary_1.writeUint32LE(x15 + j15 | 0, out, 60);
    }
    function streamXOR(key, nonce, src2, dst, nonceInplaceCounterLength) {
      if (nonceInplaceCounterLength === void 0) {
        nonceInplaceCounterLength = 0;
      }
      if (key.length !== 32) {
        throw new Error("ChaCha: key size must be 32 bytes");
      }
      if (dst.length < src2.length) {
        throw new Error("ChaCha: destination is shorter than source");
      }
      var nc;
      var counterLength;
      if (nonceInplaceCounterLength === 0) {
        if (nonce.length !== 8 && nonce.length !== 12) {
          throw new Error("ChaCha nonce must be 8 or 12 bytes");
        }
        nc = new Uint8Array(16);
        counterLength = nc.length - nonce.length;
        nc.set(nonce, counterLength);
      } else {
        if (nonce.length !== 16) {
          throw new Error("ChaCha nonce with counter must be 16 bytes");
        }
        nc = nonce;
        counterLength = nonceInplaceCounterLength;
      }
      var block = new Uint8Array(64);
      for (var i2 = 0; i2 < src2.length; i2 += 64) {
        core(block, nc, key);
        for (var j3 = i2; j3 < i2 + 64 && j3 < src2.length; j3++) {
          dst[j3] = src2[j3] ^ block[j3 - i2];
        }
        incrementCounter(nc, 0, counterLength);
      }
      wipe_1.wipe(block);
      if (nonceInplaceCounterLength === 0) {
        wipe_1.wipe(nc);
      }
      return dst;
    }
    exports.streamXOR = streamXOR;
    function stream(key, nonce, dst, nonceInplaceCounterLength) {
      if (nonceInplaceCounterLength === void 0) {
        nonceInplaceCounterLength = 0;
      }
      wipe_1.wipe(dst);
      return streamXOR(key, nonce, dst, dst, nonceInplaceCounterLength);
    }
    exports.stream = stream;
    function incrementCounter(counter, pos, len) {
      var carry = 1;
      while (len--) {
        carry = carry + (counter[pos] & 255) | 0;
        counter[pos] = carry & 255;
        carry >>>= 8;
        pos++;
      }
      if (carry > 0) {
        throw new Error("ChaCha: counter overflow");
      }
    }
  }
});

// node_modules/.pnpm/@stablelib+constant-time@1.0.1/node_modules/@stablelib/constant-time/lib/constant-time.js
var require_constant_time = __commonJS({
  "node_modules/.pnpm/@stablelib+constant-time@1.0.1/node_modules/@stablelib/constant-time/lib/constant-time.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function select(subject, resultIfOne, resultIfZero) {
      return ~(subject - 1) & resultIfOne | subject - 1 & resultIfZero;
    }
    exports.select = select;
    function lessOrEqual(a2, b4) {
      return (a2 | 0) - (b4 | 0) - 1 >>> 31 & 1;
    }
    exports.lessOrEqual = lessOrEqual;
    function compare2(a2, b4) {
      if (a2.length !== b4.length) {
        return 0;
      }
      var result = 0;
      for (var i2 = 0; i2 < a2.length; i2++) {
        result |= a2[i2] ^ b4[i2];
      }
      return 1 & result - 1 >>> 8;
    }
    exports.compare = compare2;
    function equal(a2, b4) {
      if (a2.length === 0 || b4.length === 0) {
        return false;
      }
      return compare2(a2, b4) !== 0;
    }
    exports.equal = equal;
  }
});

// node_modules/.pnpm/@stablelib+poly1305@1.0.1/node_modules/@stablelib/poly1305/lib/poly1305.js
var require_poly1305 = __commonJS({
  "node_modules/.pnpm/@stablelib+poly1305@1.0.1/node_modules/@stablelib/poly1305/lib/poly1305.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var constant_time_1 = require_constant_time();
    var wipe_1 = require_wipe();
    exports.DIGEST_LENGTH = 16;
    var Poly1305 = (
      /** @class */
      function() {
        function Poly13052(key) {
          this.digestLength = exports.DIGEST_LENGTH;
          this._buffer = new Uint8Array(16);
          this._r = new Uint16Array(10);
          this._h = new Uint16Array(10);
          this._pad = new Uint16Array(8);
          this._leftover = 0;
          this._fin = 0;
          this._finished = false;
          var t0 = key[0] | key[1] << 8;
          this._r[0] = t0 & 8191;
          var t1 = key[2] | key[3] << 8;
          this._r[1] = (t0 >>> 13 | t1 << 3) & 8191;
          var t2 = key[4] | key[5] << 8;
          this._r[2] = (t1 >>> 10 | t2 << 6) & 7939;
          var t3 = key[6] | key[7] << 8;
          this._r[3] = (t2 >>> 7 | t3 << 9) & 8191;
          var t4 = key[8] | key[9] << 8;
          this._r[4] = (t3 >>> 4 | t4 << 12) & 255;
          this._r[5] = t4 >>> 1 & 8190;
          var t5 = key[10] | key[11] << 8;
          this._r[6] = (t4 >>> 14 | t5 << 2) & 8191;
          var t6 = key[12] | key[13] << 8;
          this._r[7] = (t5 >>> 11 | t6 << 5) & 8065;
          var t7 = key[14] | key[15] << 8;
          this._r[8] = (t6 >>> 8 | t7 << 8) & 8191;
          this._r[9] = t7 >>> 5 & 127;
          this._pad[0] = key[16] | key[17] << 8;
          this._pad[1] = key[18] | key[19] << 8;
          this._pad[2] = key[20] | key[21] << 8;
          this._pad[3] = key[22] | key[23] << 8;
          this._pad[4] = key[24] | key[25] << 8;
          this._pad[5] = key[26] | key[27] << 8;
          this._pad[6] = key[28] | key[29] << 8;
          this._pad[7] = key[30] | key[31] << 8;
        }
        Poly13052.prototype._blocks = function(m4, mpos, bytes) {
          var hibit = this._fin ? 0 : 1 << 11;
          var h0 = this._h[0], h1 = this._h[1], h2 = this._h[2], h3 = this._h[3], h4 = this._h[4], h5 = this._h[5], h6 = this._h[6], h7 = this._h[7], h8 = this._h[8], h9 = this._h[9];
          var r0 = this._r[0], r1 = this._r[1], r2 = this._r[2], r3 = this._r[3], r4 = this._r[4], r5 = this._r[5], r6 = this._r[6], r7 = this._r[7], r8 = this._r[8], r9 = this._r[9];
          while (bytes >= 16) {
            var t0 = m4[mpos + 0] | m4[mpos + 1] << 8;
            h0 += t0 & 8191;
            var t1 = m4[mpos + 2] | m4[mpos + 3] << 8;
            h1 += (t0 >>> 13 | t1 << 3) & 8191;
            var t2 = m4[mpos + 4] | m4[mpos + 5] << 8;
            h2 += (t1 >>> 10 | t2 << 6) & 8191;
            var t3 = m4[mpos + 6] | m4[mpos + 7] << 8;
            h3 += (t2 >>> 7 | t3 << 9) & 8191;
            var t4 = m4[mpos + 8] | m4[mpos + 9] << 8;
            h4 += (t3 >>> 4 | t4 << 12) & 8191;
            h5 += t4 >>> 1 & 8191;
            var t5 = m4[mpos + 10] | m4[mpos + 11] << 8;
            h6 += (t4 >>> 14 | t5 << 2) & 8191;
            var t6 = m4[mpos + 12] | m4[mpos + 13] << 8;
            h7 += (t5 >>> 11 | t6 << 5) & 8191;
            var t7 = m4[mpos + 14] | m4[mpos + 15] << 8;
            h8 += (t6 >>> 8 | t7 << 8) & 8191;
            h9 += t7 >>> 5 | hibit;
            var c2 = 0;
            var d0 = c2;
            d0 += h0 * r0;
            d0 += h1 * (5 * r9);
            d0 += h2 * (5 * r8);
            d0 += h3 * (5 * r7);
            d0 += h4 * (5 * r6);
            c2 = d0 >>> 13;
            d0 &= 8191;
            d0 += h5 * (5 * r5);
            d0 += h6 * (5 * r4);
            d0 += h7 * (5 * r3);
            d0 += h8 * (5 * r2);
            d0 += h9 * (5 * r1);
            c2 += d0 >>> 13;
            d0 &= 8191;
            var d1 = c2;
            d1 += h0 * r1;
            d1 += h1 * r0;
            d1 += h2 * (5 * r9);
            d1 += h3 * (5 * r8);
            d1 += h4 * (5 * r7);
            c2 = d1 >>> 13;
            d1 &= 8191;
            d1 += h5 * (5 * r6);
            d1 += h6 * (5 * r5);
            d1 += h7 * (5 * r4);
            d1 += h8 * (5 * r3);
            d1 += h9 * (5 * r2);
            c2 += d1 >>> 13;
            d1 &= 8191;
            var d2 = c2;
            d2 += h0 * r2;
            d2 += h1 * r1;
            d2 += h2 * r0;
            d2 += h3 * (5 * r9);
            d2 += h4 * (5 * r8);
            c2 = d2 >>> 13;
            d2 &= 8191;
            d2 += h5 * (5 * r7);
            d2 += h6 * (5 * r6);
            d2 += h7 * (5 * r5);
            d2 += h8 * (5 * r4);
            d2 += h9 * (5 * r3);
            c2 += d2 >>> 13;
            d2 &= 8191;
            var d3 = c2;
            d3 += h0 * r3;
            d3 += h1 * r2;
            d3 += h2 * r1;
            d3 += h3 * r0;
            d3 += h4 * (5 * r9);
            c2 = d3 >>> 13;
            d3 &= 8191;
            d3 += h5 * (5 * r8);
            d3 += h6 * (5 * r7);
            d3 += h7 * (5 * r6);
            d3 += h8 * (5 * r5);
            d3 += h9 * (5 * r4);
            c2 += d3 >>> 13;
            d3 &= 8191;
            var d4 = c2;
            d4 += h0 * r4;
            d4 += h1 * r3;
            d4 += h2 * r2;
            d4 += h3 * r1;
            d4 += h4 * r0;
            c2 = d4 >>> 13;
            d4 &= 8191;
            d4 += h5 * (5 * r9);
            d4 += h6 * (5 * r8);
            d4 += h7 * (5 * r7);
            d4 += h8 * (5 * r6);
            d4 += h9 * (5 * r5);
            c2 += d4 >>> 13;
            d4 &= 8191;
            var d5 = c2;
            d5 += h0 * r5;
            d5 += h1 * r4;
            d5 += h2 * r3;
            d5 += h3 * r2;
            d5 += h4 * r1;
            c2 = d5 >>> 13;
            d5 &= 8191;
            d5 += h5 * r0;
            d5 += h6 * (5 * r9);
            d5 += h7 * (5 * r8);
            d5 += h8 * (5 * r7);
            d5 += h9 * (5 * r6);
            c2 += d5 >>> 13;
            d5 &= 8191;
            var d6 = c2;
            d6 += h0 * r6;
            d6 += h1 * r5;
            d6 += h2 * r4;
            d6 += h3 * r3;
            d6 += h4 * r2;
            c2 = d6 >>> 13;
            d6 &= 8191;
            d6 += h5 * r1;
            d6 += h6 * r0;
            d6 += h7 * (5 * r9);
            d6 += h8 * (5 * r8);
            d6 += h9 * (5 * r7);
            c2 += d6 >>> 13;
            d6 &= 8191;
            var d7 = c2;
            d7 += h0 * r7;
            d7 += h1 * r6;
            d7 += h2 * r5;
            d7 += h3 * r4;
            d7 += h4 * r3;
            c2 = d7 >>> 13;
            d7 &= 8191;
            d7 += h5 * r2;
            d7 += h6 * r1;
            d7 += h7 * r0;
            d7 += h8 * (5 * r9);
            d7 += h9 * (5 * r8);
            c2 += d7 >>> 13;
            d7 &= 8191;
            var d8 = c2;
            d8 += h0 * r8;
            d8 += h1 * r7;
            d8 += h2 * r6;
            d8 += h3 * r5;
            d8 += h4 * r4;
            c2 = d8 >>> 13;
            d8 &= 8191;
            d8 += h5 * r3;
            d8 += h6 * r2;
            d8 += h7 * r1;
            d8 += h8 * r0;
            d8 += h9 * (5 * r9);
            c2 += d8 >>> 13;
            d8 &= 8191;
            var d9 = c2;
            d9 += h0 * r9;
            d9 += h1 * r8;
            d9 += h2 * r7;
            d9 += h3 * r6;
            d9 += h4 * r5;
            c2 = d9 >>> 13;
            d9 &= 8191;
            d9 += h5 * r4;
            d9 += h6 * r3;
            d9 += h7 * r2;
            d9 += h8 * r1;
            d9 += h9 * r0;
            c2 += d9 >>> 13;
            d9 &= 8191;
            c2 = (c2 << 2) + c2 | 0;
            c2 = c2 + d0 | 0;
            d0 = c2 & 8191;
            c2 = c2 >>> 13;
            d1 += c2;
            h0 = d0;
            h1 = d1;
            h2 = d2;
            h3 = d3;
            h4 = d4;
            h5 = d5;
            h6 = d6;
            h7 = d7;
            h8 = d8;
            h9 = d9;
            mpos += 16;
            bytes -= 16;
          }
          this._h[0] = h0;
          this._h[1] = h1;
          this._h[2] = h2;
          this._h[3] = h3;
          this._h[4] = h4;
          this._h[5] = h5;
          this._h[6] = h6;
          this._h[7] = h7;
          this._h[8] = h8;
          this._h[9] = h9;
        };
        Poly13052.prototype.finish = function(mac, macpos) {
          if (macpos === void 0) {
            macpos = 0;
          }
          var g2 = new Uint16Array(10);
          var c2;
          var mask;
          var f3;
          var i2;
          if (this._leftover) {
            i2 = this._leftover;
            this._buffer[i2++] = 1;
            for (; i2 < 16; i2++) {
              this._buffer[i2] = 0;
            }
            this._fin = 1;
            this._blocks(this._buffer, 0, 16);
          }
          c2 = this._h[1] >>> 13;
          this._h[1] &= 8191;
          for (i2 = 2; i2 < 10; i2++) {
            this._h[i2] += c2;
            c2 = this._h[i2] >>> 13;
            this._h[i2] &= 8191;
          }
          this._h[0] += c2 * 5;
          c2 = this._h[0] >>> 13;
          this._h[0] &= 8191;
          this._h[1] += c2;
          c2 = this._h[1] >>> 13;
          this._h[1] &= 8191;
          this._h[2] += c2;
          g2[0] = this._h[0] + 5;
          c2 = g2[0] >>> 13;
          g2[0] &= 8191;
          for (i2 = 1; i2 < 10; i2++) {
            g2[i2] = this._h[i2] + c2;
            c2 = g2[i2] >>> 13;
            g2[i2] &= 8191;
          }
          g2[9] -= 1 << 13;
          mask = (c2 ^ 1) - 1;
          for (i2 = 0; i2 < 10; i2++) {
            g2[i2] &= mask;
          }
          mask = ~mask;
          for (i2 = 0; i2 < 10; i2++) {
            this._h[i2] = this._h[i2] & mask | g2[i2];
          }
          this._h[0] = (this._h[0] | this._h[1] << 13) & 65535;
          this._h[1] = (this._h[1] >>> 3 | this._h[2] << 10) & 65535;
          this._h[2] = (this._h[2] >>> 6 | this._h[3] << 7) & 65535;
          this._h[3] = (this._h[3] >>> 9 | this._h[4] << 4) & 65535;
          this._h[4] = (this._h[4] >>> 12 | this._h[5] << 1 | this._h[6] << 14) & 65535;
          this._h[5] = (this._h[6] >>> 2 | this._h[7] << 11) & 65535;
          this._h[6] = (this._h[7] >>> 5 | this._h[8] << 8) & 65535;
          this._h[7] = (this._h[8] >>> 8 | this._h[9] << 5) & 65535;
          f3 = this._h[0] + this._pad[0];
          this._h[0] = f3 & 65535;
          for (i2 = 1; i2 < 8; i2++) {
            f3 = (this._h[i2] + this._pad[i2] | 0) + (f3 >>> 16) | 0;
            this._h[i2] = f3 & 65535;
          }
          mac[macpos + 0] = this._h[0] >>> 0;
          mac[macpos + 1] = this._h[0] >>> 8;
          mac[macpos + 2] = this._h[1] >>> 0;
          mac[macpos + 3] = this._h[1] >>> 8;
          mac[macpos + 4] = this._h[2] >>> 0;
          mac[macpos + 5] = this._h[2] >>> 8;
          mac[macpos + 6] = this._h[3] >>> 0;
          mac[macpos + 7] = this._h[3] >>> 8;
          mac[macpos + 8] = this._h[4] >>> 0;
          mac[macpos + 9] = this._h[4] >>> 8;
          mac[macpos + 10] = this._h[5] >>> 0;
          mac[macpos + 11] = this._h[5] >>> 8;
          mac[macpos + 12] = this._h[6] >>> 0;
          mac[macpos + 13] = this._h[6] >>> 8;
          mac[macpos + 14] = this._h[7] >>> 0;
          mac[macpos + 15] = this._h[7] >>> 8;
          this._finished = true;
          return this;
        };
        Poly13052.prototype.update = function(m4) {
          var mpos = 0;
          var bytes = m4.length;
          var want;
          if (this._leftover) {
            want = 16 - this._leftover;
            if (want > bytes) {
              want = bytes;
            }
            for (var i2 = 0; i2 < want; i2++) {
              this._buffer[this._leftover + i2] = m4[mpos + i2];
            }
            bytes -= want;
            mpos += want;
            this._leftover += want;
            if (this._leftover < 16) {
              return this;
            }
            this._blocks(this._buffer, 0, 16);
            this._leftover = 0;
          }
          if (bytes >= 16) {
            want = bytes - bytes % 16;
            this._blocks(m4, mpos, want);
            mpos += want;
            bytes -= want;
          }
          if (bytes) {
            for (var i2 = 0; i2 < bytes; i2++) {
              this._buffer[this._leftover + i2] = m4[mpos + i2];
            }
            this._leftover += bytes;
          }
          return this;
        };
        Poly13052.prototype.digest = function() {
          if (this._finished) {
            throw new Error("Poly1305 was finished");
          }
          var mac = new Uint8Array(16);
          this.finish(mac);
          return mac;
        };
        Poly13052.prototype.clean = function() {
          wipe_1.wipe(this._buffer);
          wipe_1.wipe(this._r);
          wipe_1.wipe(this._h);
          wipe_1.wipe(this._pad);
          this._leftover = 0;
          this._fin = 0;
          this._finished = true;
          return this;
        };
        return Poly13052;
      }()
    );
    exports.Poly1305 = Poly1305;
    function oneTimeAuth(key, data) {
      var h2 = new Poly1305(key);
      h2.update(data);
      var digest2 = h2.digest();
      h2.clean();
      return digest2;
    }
    exports.oneTimeAuth = oneTimeAuth;
    function equal(a2, b4) {
      if (a2.length !== exports.DIGEST_LENGTH || b4.length !== exports.DIGEST_LENGTH) {
        return false;
      }
      return constant_time_1.equal(a2, b4);
    }
    exports.equal = equal;
  }
});

// node_modules/.pnpm/@stablelib+chacha20poly1305@1.0.1/node_modules/@stablelib/chacha20poly1305/lib/chacha20poly1305.js
var require_chacha20poly1305 = __commonJS({
  "node_modules/.pnpm/@stablelib+chacha20poly1305@1.0.1/node_modules/@stablelib/chacha20poly1305/lib/chacha20poly1305.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var chacha_1 = require_chacha();
    var poly1305_1 = require_poly1305();
    var wipe_1 = require_wipe();
    var binary_1 = require_binary();
    var constant_time_1 = require_constant_time();
    exports.KEY_LENGTH = 32;
    exports.NONCE_LENGTH = 12;
    exports.TAG_LENGTH = 16;
    var ZEROS = new Uint8Array(16);
    var ChaCha20Poly1305 = (
      /** @class */
      function() {
        function ChaCha20Poly13052(key) {
          this.nonceLength = exports.NONCE_LENGTH;
          this.tagLength = exports.TAG_LENGTH;
          if (key.length !== exports.KEY_LENGTH) {
            throw new Error("ChaCha20Poly1305 needs 32-byte key");
          }
          this._key = new Uint8Array(key);
        }
        ChaCha20Poly13052.prototype.seal = function(nonce, plaintext, associatedData, dst) {
          if (nonce.length > 16) {
            throw new Error("ChaCha20Poly1305: incorrect nonce length");
          }
          var counter = new Uint8Array(16);
          counter.set(nonce, counter.length - nonce.length);
          var authKey = new Uint8Array(32);
          chacha_1.stream(this._key, counter, authKey, 4);
          var resultLength = plaintext.length + this.tagLength;
          var result;
          if (dst) {
            if (dst.length !== resultLength) {
              throw new Error("ChaCha20Poly1305: incorrect destination length");
            }
            result = dst;
          } else {
            result = new Uint8Array(resultLength);
          }
          chacha_1.streamXOR(this._key, counter, plaintext, result, 4);
          this._authenticate(result.subarray(result.length - this.tagLength, result.length), authKey, result.subarray(0, result.length - this.tagLength), associatedData);
          wipe_1.wipe(counter);
          return result;
        };
        ChaCha20Poly13052.prototype.open = function(nonce, sealed, associatedData, dst) {
          if (nonce.length > 16) {
            throw new Error("ChaCha20Poly1305: incorrect nonce length");
          }
          if (sealed.length < this.tagLength) {
            return null;
          }
          var counter = new Uint8Array(16);
          counter.set(nonce, counter.length - nonce.length);
          var authKey = new Uint8Array(32);
          chacha_1.stream(this._key, counter, authKey, 4);
          var calculatedTag = new Uint8Array(this.tagLength);
          this._authenticate(calculatedTag, authKey, sealed.subarray(0, sealed.length - this.tagLength), associatedData);
          if (!constant_time_1.equal(calculatedTag, sealed.subarray(sealed.length - this.tagLength, sealed.length))) {
            return null;
          }
          var resultLength = sealed.length - this.tagLength;
          var result;
          if (dst) {
            if (dst.length !== resultLength) {
              throw new Error("ChaCha20Poly1305: incorrect destination length");
            }
            result = dst;
          } else {
            result = new Uint8Array(resultLength);
          }
          chacha_1.streamXOR(this._key, counter, sealed.subarray(0, sealed.length - this.tagLength), result, 4);
          wipe_1.wipe(counter);
          return result;
        };
        ChaCha20Poly13052.prototype.clean = function() {
          wipe_1.wipe(this._key);
          return this;
        };
        ChaCha20Poly13052.prototype._authenticate = function(tagOut, authKey, ciphertext, associatedData) {
          var h2 = new poly1305_1.Poly1305(authKey);
          if (associatedData) {
            h2.update(associatedData);
            if (associatedData.length % 16 > 0) {
              h2.update(ZEROS.subarray(associatedData.length % 16));
            }
          }
          h2.update(ciphertext);
          if (ciphertext.length % 16 > 0) {
            h2.update(ZEROS.subarray(ciphertext.length % 16));
          }
          var length2 = new Uint8Array(8);
          if (associatedData) {
            binary_1.writeUint64LE(associatedData.length, length2);
          }
          h2.update(length2);
          binary_1.writeUint64LE(ciphertext.length, length2);
          h2.update(length2);
          var tag = h2.digest();
          for (var i2 = 0; i2 < tag.length; i2++) {
            tagOut[i2] = tag[i2];
          }
          h2.clean();
          wipe_1.wipe(tag);
          wipe_1.wipe(length2);
        };
        return ChaCha20Poly13052;
      }()
    );
    exports.ChaCha20Poly1305 = ChaCha20Poly1305;
  }
});

// node_modules/.pnpm/@stablelib+hash@1.0.1/node_modules/@stablelib/hash/lib/hash.js
var require_hash = __commonJS({
  "node_modules/.pnpm/@stablelib+hash@1.0.1/node_modules/@stablelib/hash/lib/hash.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function isSerializableHash(h2) {
      return typeof h2.saveState !== "undefined" && typeof h2.restoreState !== "undefined" && typeof h2.cleanSavedState !== "undefined";
    }
    exports.isSerializableHash = isSerializableHash;
  }
});

// node_modules/.pnpm/@stablelib+hmac@1.0.1/node_modules/@stablelib/hmac/lib/hmac.js
var require_hmac = __commonJS({
  "node_modules/.pnpm/@stablelib+hmac@1.0.1/node_modules/@stablelib/hmac/lib/hmac.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var hash_1 = require_hash();
    var constant_time_1 = require_constant_time();
    var wipe_1 = require_wipe();
    var HMAC = (
      /** @class */
      function() {
        function HMAC2(hash, key) {
          this._finished = false;
          this._inner = new hash();
          this._outer = new hash();
          this.blockSize = this._outer.blockSize;
          this.digestLength = this._outer.digestLength;
          var pad = new Uint8Array(this.blockSize);
          if (key.length > this.blockSize) {
            this._inner.update(key).finish(pad).clean();
          } else {
            pad.set(key);
          }
          for (var i2 = 0; i2 < pad.length; i2++) {
            pad[i2] ^= 54;
          }
          this._inner.update(pad);
          for (var i2 = 0; i2 < pad.length; i2++) {
            pad[i2] ^= 54 ^ 92;
          }
          this._outer.update(pad);
          if (hash_1.isSerializableHash(this._inner) && hash_1.isSerializableHash(this._outer)) {
            this._innerKeyedState = this._inner.saveState();
            this._outerKeyedState = this._outer.saveState();
          }
          wipe_1.wipe(pad);
        }
        HMAC2.prototype.reset = function() {
          if (!hash_1.isSerializableHash(this._inner) || !hash_1.isSerializableHash(this._outer)) {
            throw new Error("hmac: can't reset() because hash doesn't implement restoreState()");
          }
          this._inner.restoreState(this._innerKeyedState);
          this._outer.restoreState(this._outerKeyedState);
          this._finished = false;
          return this;
        };
        HMAC2.prototype.clean = function() {
          if (hash_1.isSerializableHash(this._inner)) {
            this._inner.cleanSavedState(this._innerKeyedState);
          }
          if (hash_1.isSerializableHash(this._outer)) {
            this._outer.cleanSavedState(this._outerKeyedState);
          }
          this._inner.clean();
          this._outer.clean();
        };
        HMAC2.prototype.update = function(data) {
          this._inner.update(data);
          return this;
        };
        HMAC2.prototype.finish = function(out) {
          if (this._finished) {
            this._outer.finish(out);
            return this;
          }
          this._inner.finish(out);
          this._outer.update(out.subarray(0, this.digestLength)).finish(out);
          this._finished = true;
          return this;
        };
        HMAC2.prototype.digest = function() {
          var out = new Uint8Array(this.digestLength);
          this.finish(out);
          return out;
        };
        HMAC2.prototype.saveState = function() {
          if (!hash_1.isSerializableHash(this._inner)) {
            throw new Error("hmac: can't saveState() because hash doesn't implement it");
          }
          return this._inner.saveState();
        };
        HMAC2.prototype.restoreState = function(savedState) {
          if (!hash_1.isSerializableHash(this._inner) || !hash_1.isSerializableHash(this._outer)) {
            throw new Error("hmac: can't restoreState() because hash doesn't implement it");
          }
          this._inner.restoreState(savedState);
          this._outer.restoreState(this._outerKeyedState);
          this._finished = false;
          return this;
        };
        HMAC2.prototype.cleanSavedState = function(savedState) {
          if (!hash_1.isSerializableHash(this._inner)) {
            throw new Error("hmac: can't cleanSavedState() because hash doesn't implement it");
          }
          this._inner.cleanSavedState(savedState);
        };
        return HMAC2;
      }()
    );
    exports.HMAC = HMAC;
    function hmac(hash, key, data) {
      var h2 = new HMAC(hash, key);
      h2.update(data);
      var digest2 = h2.digest();
      h2.clean();
      return digest2;
    }
    exports.hmac = hmac;
    exports.equal = constant_time_1.equal;
  }
});

// node_modules/.pnpm/@stablelib+hkdf@1.0.1/node_modules/@stablelib/hkdf/lib/hkdf.js
var require_hkdf = __commonJS({
  "node_modules/.pnpm/@stablelib+hkdf@1.0.1/node_modules/@stablelib/hkdf/lib/hkdf.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var hmac_1 = require_hmac();
    var wipe_1 = require_wipe();
    var HKDF = (
      /** @class */
      function() {
        function HKDF2(hash, key, salt, info) {
          if (salt === void 0) {
            salt = new Uint8Array(0);
          }
          this._counter = new Uint8Array(1);
          this._hash = hash;
          this._info = info;
          var okm = hmac_1.hmac(this._hash, salt, key);
          this._hmac = new hmac_1.HMAC(hash, okm);
          this._buffer = new Uint8Array(this._hmac.digestLength);
          this._bufpos = this._buffer.length;
        }
        HKDF2.prototype._fillBuffer = function() {
          this._counter[0]++;
          var ctr = this._counter[0];
          if (ctr === 0) {
            throw new Error("hkdf: cannot expand more");
          }
          this._hmac.reset();
          if (ctr > 1) {
            this._hmac.update(this._buffer);
          }
          if (this._info) {
            this._hmac.update(this._info);
          }
          this._hmac.update(this._counter);
          this._hmac.finish(this._buffer);
          this._bufpos = 0;
        };
        HKDF2.prototype.expand = function(length2) {
          var out = new Uint8Array(length2);
          for (var i2 = 0; i2 < out.length; i2++) {
            if (this._bufpos === this._buffer.length) {
              this._fillBuffer();
            }
            out[i2] = this._buffer[this._bufpos++];
          }
          return out;
        };
        HKDF2.prototype.clean = function() {
          this._hmac.clean();
          wipe_1.wipe(this._buffer);
          wipe_1.wipe(this._counter);
          this._bufpos = 0;
        };
        return HKDF2;
      }()
    );
    exports.HKDF = HKDF;
  }
});

// node_modules/.pnpm/@stablelib+sha256@1.0.1/node_modules/@stablelib/sha256/lib/sha256.js
var require_sha256 = __commonJS({
  "node_modules/.pnpm/@stablelib+sha256@1.0.1/node_modules/@stablelib/sha256/lib/sha256.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var binary_1 = require_binary();
    var wipe_1 = require_wipe();
    exports.DIGEST_LENGTH = 32;
    exports.BLOCK_SIZE = 64;
    var SHA256 = (
      /** @class */
      function() {
        function SHA2562() {
          this.digestLength = exports.DIGEST_LENGTH;
          this.blockSize = exports.BLOCK_SIZE;
          this._state = new Int32Array(8);
          this._temp = new Int32Array(64);
          this._buffer = new Uint8Array(128);
          this._bufferLength = 0;
          this._bytesHashed = 0;
          this._finished = false;
          this.reset();
        }
        SHA2562.prototype._initState = function() {
          this._state[0] = 1779033703;
          this._state[1] = 3144134277;
          this._state[2] = 1013904242;
          this._state[3] = 2773480762;
          this._state[4] = 1359893119;
          this._state[5] = 2600822924;
          this._state[6] = 528734635;
          this._state[7] = 1541459225;
        };
        SHA2562.prototype.reset = function() {
          this._initState();
          this._bufferLength = 0;
          this._bytesHashed = 0;
          this._finished = false;
          return this;
        };
        SHA2562.prototype.clean = function() {
          wipe_1.wipe(this._buffer);
          wipe_1.wipe(this._temp);
          this.reset();
        };
        SHA2562.prototype.update = function(data, dataLength) {
          if (dataLength === void 0) {
            dataLength = data.length;
          }
          if (this._finished) {
            throw new Error("SHA256: can't update because hash was finished.");
          }
          var dataPos = 0;
          this._bytesHashed += dataLength;
          if (this._bufferLength > 0) {
            while (this._bufferLength < this.blockSize && dataLength > 0) {
              this._buffer[this._bufferLength++] = data[dataPos++];
              dataLength--;
            }
            if (this._bufferLength === this.blockSize) {
              hashBlocks(this._temp, this._state, this._buffer, 0, this.blockSize);
              this._bufferLength = 0;
            }
          }
          if (dataLength >= this.blockSize) {
            dataPos = hashBlocks(this._temp, this._state, data, dataPos, dataLength);
            dataLength %= this.blockSize;
          }
          while (dataLength > 0) {
            this._buffer[this._bufferLength++] = data[dataPos++];
            dataLength--;
          }
          return this;
        };
        SHA2562.prototype.finish = function(out) {
          if (!this._finished) {
            var bytesHashed = this._bytesHashed;
            var left = this._bufferLength;
            var bitLenHi = bytesHashed / 536870912 | 0;
            var bitLenLo = bytesHashed << 3;
            var padLength = bytesHashed % 64 < 56 ? 64 : 128;
            this._buffer[left] = 128;
            for (var i2 = left + 1; i2 < padLength - 8; i2++) {
              this._buffer[i2] = 0;
            }
            binary_1.writeUint32BE(bitLenHi, this._buffer, padLength - 8);
            binary_1.writeUint32BE(bitLenLo, this._buffer, padLength - 4);
            hashBlocks(this._temp, this._state, this._buffer, 0, padLength);
            this._finished = true;
          }
          for (var i2 = 0; i2 < this.digestLength / 4; i2++) {
            binary_1.writeUint32BE(this._state[i2], out, i2 * 4);
          }
          return this;
        };
        SHA2562.prototype.digest = function() {
          var out = new Uint8Array(this.digestLength);
          this.finish(out);
          return out;
        };
        SHA2562.prototype.saveState = function() {
          if (this._finished) {
            throw new Error("SHA256: cannot save finished state");
          }
          return {
            state: new Int32Array(this._state),
            buffer: this._bufferLength > 0 ? new Uint8Array(this._buffer) : void 0,
            bufferLength: this._bufferLength,
            bytesHashed: this._bytesHashed
          };
        };
        SHA2562.prototype.restoreState = function(savedState) {
          this._state.set(savedState.state);
          this._bufferLength = savedState.bufferLength;
          if (savedState.buffer) {
            this._buffer.set(savedState.buffer);
          }
          this._bytesHashed = savedState.bytesHashed;
          this._finished = false;
          return this;
        };
        SHA2562.prototype.cleanSavedState = function(savedState) {
          wipe_1.wipe(savedState.state);
          if (savedState.buffer) {
            wipe_1.wipe(savedState.buffer);
          }
          savedState.bufferLength = 0;
          savedState.bytesHashed = 0;
        };
        return SHA2562;
      }()
    );
    exports.SHA256 = SHA256;
    var K2 = new Int32Array([
      1116352408,
      1899447441,
      3049323471,
      3921009573,
      961987163,
      1508970993,
      2453635748,
      2870763221,
      3624381080,
      310598401,
      607225278,
      1426881987,
      1925078388,
      2162078206,
      2614888103,
      3248222580,
      3835390401,
      4022224774,
      264347078,
      604807628,
      770255983,
      1249150122,
      1555081692,
      1996064986,
      2554220882,
      2821834349,
      2952996808,
      3210313671,
      3336571891,
      3584528711,
      113926993,
      338241895,
      666307205,
      773529912,
      1294757372,
      1396182291,
      1695183700,
      1986661051,
      2177026350,
      2456956037,
      2730485921,
      2820302411,
      3259730800,
      3345764771,
      3516065817,
      3600352804,
      4094571909,
      275423344,
      430227734,
      506948616,
      659060556,
      883997877,
      958139571,
      1322822218,
      1537002063,
      1747873779,
      1955562222,
      2024104815,
      2227730452,
      2361852424,
      2428436474,
      2756734187,
      3204031479,
      3329325298
    ]);
    function hashBlocks(w2, v, p3, pos, len) {
      while (len >= 64) {
        var a2 = v[0];
        var b4 = v[1];
        var c2 = v[2];
        var d2 = v[3];
        var e = v[4];
        var f3 = v[5];
        var g2 = v[6];
        var h2 = v[7];
        for (var i2 = 0; i2 < 16; i2++) {
          var j3 = pos + i2 * 4;
          w2[i2] = binary_1.readUint32BE(p3, j3);
        }
        for (var i2 = 16; i2 < 64; i2++) {
          var u2 = w2[i2 - 2];
          var t1 = (u2 >>> 17 | u2 << 32 - 17) ^ (u2 >>> 19 | u2 << 32 - 19) ^ u2 >>> 10;
          u2 = w2[i2 - 15];
          var t2 = (u2 >>> 7 | u2 << 32 - 7) ^ (u2 >>> 18 | u2 << 32 - 18) ^ u2 >>> 3;
          w2[i2] = (t1 + w2[i2 - 7] | 0) + (t2 + w2[i2 - 16] | 0);
        }
        for (var i2 = 0; i2 < 64; i2++) {
          var t1 = (((e >>> 6 | e << 32 - 6) ^ (e >>> 11 | e << 32 - 11) ^ (e >>> 25 | e << 32 - 25)) + (e & f3 ^ ~e & g2) | 0) + (h2 + (K2[i2] + w2[i2] | 0) | 0) | 0;
          var t2 = ((a2 >>> 2 | a2 << 32 - 2) ^ (a2 >>> 13 | a2 << 32 - 13) ^ (a2 >>> 22 | a2 << 32 - 22)) + (a2 & b4 ^ a2 & c2 ^ b4 & c2) | 0;
          h2 = g2;
          g2 = f3;
          f3 = e;
          e = d2 + t1 | 0;
          d2 = c2;
          c2 = b4;
          b4 = a2;
          a2 = t1 + t2 | 0;
        }
        v[0] += a2;
        v[1] += b4;
        v[2] += c2;
        v[3] += d2;
        v[4] += e;
        v[5] += f3;
        v[6] += g2;
        v[7] += h2;
        pos += 64;
        len -= 64;
      }
      return pos;
    }
    function hash(data) {
      var h2 = new SHA256();
      h2.update(data);
      var digest2 = h2.digest();
      h2.clean();
      return digest2;
    }
    exports.hash = hash;
  }
});

// node_modules/.pnpm/@stablelib+x25519@1.0.3/node_modules/@stablelib/x25519/lib/x25519.js
var require_x25519 = __commonJS({
  "node_modules/.pnpm/@stablelib+x25519@1.0.3/node_modules/@stablelib/x25519/lib/x25519.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.sharedKey = exports.generateKeyPair = exports.generateKeyPairFromSeed = exports.scalarMultBase = exports.scalarMult = exports.SHARED_KEY_LENGTH = exports.SECRET_KEY_LENGTH = exports.PUBLIC_KEY_LENGTH = void 0;
    var random_1 = require_random();
    var wipe_1 = require_wipe();
    exports.PUBLIC_KEY_LENGTH = 32;
    exports.SECRET_KEY_LENGTH = 32;
    exports.SHARED_KEY_LENGTH = 32;
    function gf(init) {
      const r = new Float64Array(16);
      if (init) {
        for (let i2 = 0; i2 < init.length; i2++) {
          r[i2] = init[i2];
        }
      }
      return r;
    }
    var _9 = new Uint8Array(32);
    _9[0] = 9;
    var _121665 = gf([56129, 1]);
    function car25519(o) {
      let c2 = 1;
      for (let i2 = 0; i2 < 16; i2++) {
        let v = o[i2] + c2 + 65535;
        c2 = Math.floor(v / 65536);
        o[i2] = v - c2 * 65536;
      }
      o[0] += c2 - 1 + 37 * (c2 - 1);
    }
    function sel25519(p3, q4, b4) {
      const c2 = ~(b4 - 1);
      for (let i2 = 0; i2 < 16; i2++) {
        const t = c2 & (p3[i2] ^ q4[i2]);
        p3[i2] ^= t;
        q4[i2] ^= t;
      }
    }
    function pack25519(o, n2) {
      const m4 = gf();
      const t = gf();
      for (let i2 = 0; i2 < 16; i2++) {
        t[i2] = n2[i2];
      }
      car25519(t);
      car25519(t);
      car25519(t);
      for (let j3 = 0; j3 < 2; j3++) {
        m4[0] = t[0] - 65517;
        for (let i2 = 1; i2 < 15; i2++) {
          m4[i2] = t[i2] - 65535 - (m4[i2 - 1] >> 16 & 1);
          m4[i2 - 1] &= 65535;
        }
        m4[15] = t[15] - 32767 - (m4[14] >> 16 & 1);
        const b4 = m4[15] >> 16 & 1;
        m4[14] &= 65535;
        sel25519(t, m4, 1 - b4);
      }
      for (let i2 = 0; i2 < 16; i2++) {
        o[2 * i2] = t[i2] & 255;
        o[2 * i2 + 1] = t[i2] >> 8;
      }
    }
    function unpack25519(o, n2) {
      for (let i2 = 0; i2 < 16; i2++) {
        o[i2] = n2[2 * i2] + (n2[2 * i2 + 1] << 8);
      }
      o[15] &= 32767;
    }
    function add(o, a2, b4) {
      for (let i2 = 0; i2 < 16; i2++) {
        o[i2] = a2[i2] + b4[i2];
      }
    }
    function sub(o, a2, b4) {
      for (let i2 = 0; i2 < 16; i2++) {
        o[i2] = a2[i2] - b4[i2];
      }
    }
    function mul(o, a2, b4) {
      let v, c2, t0 = 0, t1 = 0, t2 = 0, t3 = 0, t4 = 0, t5 = 0, t6 = 0, t7 = 0, t8 = 0, t9 = 0, t10 = 0, t11 = 0, t12 = 0, t13 = 0, t14 = 0, t15 = 0, t16 = 0, t17 = 0, t18 = 0, t19 = 0, t20 = 0, t21 = 0, t22 = 0, t23 = 0, t24 = 0, t25 = 0, t26 = 0, t27 = 0, t28 = 0, t29 = 0, t30 = 0, b0 = b4[0], b1 = b4[1], b22 = b4[2], b32 = b4[3], b42 = b4[4], b5 = b4[5], b6 = b4[6], b7 = b4[7], b8 = b4[8], b9 = b4[9], b10 = b4[10], b11 = b4[11], b12 = b4[12], b13 = b4[13], b14 = b4[14], b15 = b4[15];
      v = a2[0];
      t0 += v * b0;
      t1 += v * b1;
      t2 += v * b22;
      t3 += v * b32;
      t4 += v * b42;
      t5 += v * b5;
      t6 += v * b6;
      t7 += v * b7;
      t8 += v * b8;
      t9 += v * b9;
      t10 += v * b10;
      t11 += v * b11;
      t12 += v * b12;
      t13 += v * b13;
      t14 += v * b14;
      t15 += v * b15;
      v = a2[1];
      t1 += v * b0;
      t2 += v * b1;
      t3 += v * b22;
      t4 += v * b32;
      t5 += v * b42;
      t6 += v * b5;
      t7 += v * b6;
      t8 += v * b7;
      t9 += v * b8;
      t10 += v * b9;
      t11 += v * b10;
      t12 += v * b11;
      t13 += v * b12;
      t14 += v * b13;
      t15 += v * b14;
      t16 += v * b15;
      v = a2[2];
      t2 += v * b0;
      t3 += v * b1;
      t4 += v * b22;
      t5 += v * b32;
      t6 += v * b42;
      t7 += v * b5;
      t8 += v * b6;
      t9 += v * b7;
      t10 += v * b8;
      t11 += v * b9;
      t12 += v * b10;
      t13 += v * b11;
      t14 += v * b12;
      t15 += v * b13;
      t16 += v * b14;
      t17 += v * b15;
      v = a2[3];
      t3 += v * b0;
      t4 += v * b1;
      t5 += v * b22;
      t6 += v * b32;
      t7 += v * b42;
      t8 += v * b5;
      t9 += v * b6;
      t10 += v * b7;
      t11 += v * b8;
      t12 += v * b9;
      t13 += v * b10;
      t14 += v * b11;
      t15 += v * b12;
      t16 += v * b13;
      t17 += v * b14;
      t18 += v * b15;
      v = a2[4];
      t4 += v * b0;
      t5 += v * b1;
      t6 += v * b22;
      t7 += v * b32;
      t8 += v * b42;
      t9 += v * b5;
      t10 += v * b6;
      t11 += v * b7;
      t12 += v * b8;
      t13 += v * b9;
      t14 += v * b10;
      t15 += v * b11;
      t16 += v * b12;
      t17 += v * b13;
      t18 += v * b14;
      t19 += v * b15;
      v = a2[5];
      t5 += v * b0;
      t6 += v * b1;
      t7 += v * b22;
      t8 += v * b32;
      t9 += v * b42;
      t10 += v * b5;
      t11 += v * b6;
      t12 += v * b7;
      t13 += v * b8;
      t14 += v * b9;
      t15 += v * b10;
      t16 += v * b11;
      t17 += v * b12;
      t18 += v * b13;
      t19 += v * b14;
      t20 += v * b15;
      v = a2[6];
      t6 += v * b0;
      t7 += v * b1;
      t8 += v * b22;
      t9 += v * b32;
      t10 += v * b42;
      t11 += v * b5;
      t12 += v * b6;
      t13 += v * b7;
      t14 += v * b8;
      t15 += v * b9;
      t16 += v * b10;
      t17 += v * b11;
      t18 += v * b12;
      t19 += v * b13;
      t20 += v * b14;
      t21 += v * b15;
      v = a2[7];
      t7 += v * b0;
      t8 += v * b1;
      t9 += v * b22;
      t10 += v * b32;
      t11 += v * b42;
      t12 += v * b5;
      t13 += v * b6;
      t14 += v * b7;
      t15 += v * b8;
      t16 += v * b9;
      t17 += v * b10;
      t18 += v * b11;
      t19 += v * b12;
      t20 += v * b13;
      t21 += v * b14;
      t22 += v * b15;
      v = a2[8];
      t8 += v * b0;
      t9 += v * b1;
      t10 += v * b22;
      t11 += v * b32;
      t12 += v * b42;
      t13 += v * b5;
      t14 += v * b6;
      t15 += v * b7;
      t16 += v * b8;
      t17 += v * b9;
      t18 += v * b10;
      t19 += v * b11;
      t20 += v * b12;
      t21 += v * b13;
      t22 += v * b14;
      t23 += v * b15;
      v = a2[9];
      t9 += v * b0;
      t10 += v * b1;
      t11 += v * b22;
      t12 += v * b32;
      t13 += v * b42;
      t14 += v * b5;
      t15 += v * b6;
      t16 += v * b7;
      t17 += v * b8;
      t18 += v * b9;
      t19 += v * b10;
      t20 += v * b11;
      t21 += v * b12;
      t22 += v * b13;
      t23 += v * b14;
      t24 += v * b15;
      v = a2[10];
      t10 += v * b0;
      t11 += v * b1;
      t12 += v * b22;
      t13 += v * b32;
      t14 += v * b42;
      t15 += v * b5;
      t16 += v * b6;
      t17 += v * b7;
      t18 += v * b8;
      t19 += v * b9;
      t20 += v * b10;
      t21 += v * b11;
      t22 += v * b12;
      t23 += v * b13;
      t24 += v * b14;
      t25 += v * b15;
      v = a2[11];
      t11 += v * b0;
      t12 += v * b1;
      t13 += v * b22;
      t14 += v * b32;
      t15 += v * b42;
      t16 += v * b5;
      t17 += v * b6;
      t18 += v * b7;
      t19 += v * b8;
      t20 += v * b9;
      t21 += v * b10;
      t22 += v * b11;
      t23 += v * b12;
      t24 += v * b13;
      t25 += v * b14;
      t26 += v * b15;
      v = a2[12];
      t12 += v * b0;
      t13 += v * b1;
      t14 += v * b22;
      t15 += v * b32;
      t16 += v * b42;
      t17 += v * b5;
      t18 += v * b6;
      t19 += v * b7;
      t20 += v * b8;
      t21 += v * b9;
      t22 += v * b10;
      t23 += v * b11;
      t24 += v * b12;
      t25 += v * b13;
      t26 += v * b14;
      t27 += v * b15;
      v = a2[13];
      t13 += v * b0;
      t14 += v * b1;
      t15 += v * b22;
      t16 += v * b32;
      t17 += v * b42;
      t18 += v * b5;
      t19 += v * b6;
      t20 += v * b7;
      t21 += v * b8;
      t22 += v * b9;
      t23 += v * b10;
      t24 += v * b11;
      t25 += v * b12;
      t26 += v * b13;
      t27 += v * b14;
      t28 += v * b15;
      v = a2[14];
      t14 += v * b0;
      t15 += v * b1;
      t16 += v * b22;
      t17 += v * b32;
      t18 += v * b42;
      t19 += v * b5;
      t20 += v * b6;
      t21 += v * b7;
      t22 += v * b8;
      t23 += v * b9;
      t24 += v * b10;
      t25 += v * b11;
      t26 += v * b12;
      t27 += v * b13;
      t28 += v * b14;
      t29 += v * b15;
      v = a2[15];
      t15 += v * b0;
      t16 += v * b1;
      t17 += v * b22;
      t18 += v * b32;
      t19 += v * b42;
      t20 += v * b5;
      t21 += v * b6;
      t22 += v * b7;
      t23 += v * b8;
      t24 += v * b9;
      t25 += v * b10;
      t26 += v * b11;
      t27 += v * b12;
      t28 += v * b13;
      t29 += v * b14;
      t30 += v * b15;
      t0 += 38 * t16;
      t1 += 38 * t17;
      t2 += 38 * t18;
      t3 += 38 * t19;
      t4 += 38 * t20;
      t5 += 38 * t21;
      t6 += 38 * t22;
      t7 += 38 * t23;
      t8 += 38 * t24;
      t9 += 38 * t25;
      t10 += 38 * t26;
      t11 += 38 * t27;
      t12 += 38 * t28;
      t13 += 38 * t29;
      t14 += 38 * t30;
      c2 = 1;
      v = t0 + c2 + 65535;
      c2 = Math.floor(v / 65536);
      t0 = v - c2 * 65536;
      v = t1 + c2 + 65535;
      c2 = Math.floor(v / 65536);
      t1 = v - c2 * 65536;
      v = t2 + c2 + 65535;
      c2 = Math.floor(v / 65536);
      t2 = v - c2 * 65536;
      v = t3 + c2 + 65535;
      c2 = Math.floor(v / 65536);
      t3 = v - c2 * 65536;
      v = t4 + c2 + 65535;
      c2 = Math.floor(v / 65536);
      t4 = v - c2 * 65536;
      v = t5 + c2 + 65535;
      c2 = Math.floor(v / 65536);
      t5 = v - c2 * 65536;
      v = t6 + c2 + 65535;
      c2 = Math.floor(v / 65536);
      t6 = v - c2 * 65536;
      v = t7 + c2 + 65535;
      c2 = Math.floor(v / 65536);
      t7 = v - c2 * 65536;
      v = t8 + c2 + 65535;
      c2 = Math.floor(v / 65536);
      t8 = v - c2 * 65536;
      v = t9 + c2 + 65535;
      c2 = Math.floor(v / 65536);
      t9 = v - c2 * 65536;
      v = t10 + c2 + 65535;
      c2 = Math.floor(v / 65536);
      t10 = v - c2 * 65536;
      v = t11 + c2 + 65535;
      c2 = Math.floor(v / 65536);
      t11 = v - c2 * 65536;
      v = t12 + c2 + 65535;
      c2 = Math.floor(v / 65536);
      t12 = v - c2 * 65536;
      v = t13 + c2 + 65535;
      c2 = Math.floor(v / 65536);
      t13 = v - c2 * 65536;
      v = t14 + c2 + 65535;
      c2 = Math.floor(v / 65536);
      t14 = v - c2 * 65536;
      v = t15 + c2 + 65535;
      c2 = Math.floor(v / 65536);
      t15 = v - c2 * 65536;
      t0 += c2 - 1 + 37 * (c2 - 1);
      c2 = 1;
      v = t0 + c2 + 65535;
      c2 = Math.floor(v / 65536);
      t0 = v - c2 * 65536;
      v = t1 + c2 + 65535;
      c2 = Math.floor(v / 65536);
      t1 = v - c2 * 65536;
      v = t2 + c2 + 65535;
      c2 = Math.floor(v / 65536);
      t2 = v - c2 * 65536;
      v = t3 + c2 + 65535;
      c2 = Math.floor(v / 65536);
      t3 = v - c2 * 65536;
      v = t4 + c2 + 65535;
      c2 = Math.floor(v / 65536);
      t4 = v - c2 * 65536;
      v = t5 + c2 + 65535;
      c2 = Math.floor(v / 65536);
      t5 = v - c2 * 65536;
      v = t6 + c2 + 65535;
      c2 = Math.floor(v / 65536);
      t6 = v - c2 * 65536;
      v = t7 + c2 + 65535;
      c2 = Math.floor(v / 65536);
      t7 = v - c2 * 65536;
      v = t8 + c2 + 65535;
      c2 = Math.floor(v / 65536);
      t8 = v - c2 * 65536;
      v = t9 + c2 + 65535;
      c2 = Math.floor(v / 65536);
      t9 = v - c2 * 65536;
      v = t10 + c2 + 65535;
      c2 = Math.floor(v / 65536);
      t10 = v - c2 * 65536;
      v = t11 + c2 + 65535;
      c2 = Math.floor(v / 65536);
      t11 = v - c2 * 65536;
      v = t12 + c2 + 65535;
      c2 = Math.floor(v / 65536);
      t12 = v - c2 * 65536;
      v = t13 + c2 + 65535;
      c2 = Math.floor(v / 65536);
      t13 = v - c2 * 65536;
      v = t14 + c2 + 65535;
      c2 = Math.floor(v / 65536);
      t14 = v - c2 * 65536;
      v = t15 + c2 + 65535;
      c2 = Math.floor(v / 65536);
      t15 = v - c2 * 65536;
      t0 += c2 - 1 + 37 * (c2 - 1);
      o[0] = t0;
      o[1] = t1;
      o[2] = t2;
      o[3] = t3;
      o[4] = t4;
      o[5] = t5;
      o[6] = t6;
      o[7] = t7;
      o[8] = t8;
      o[9] = t9;
      o[10] = t10;
      o[11] = t11;
      o[12] = t12;
      o[13] = t13;
      o[14] = t14;
      o[15] = t15;
    }
    function square(o, a2) {
      mul(o, a2, a2);
    }
    function inv25519(o, inp) {
      const c2 = gf();
      for (let i2 = 0; i2 < 16; i2++) {
        c2[i2] = inp[i2];
      }
      for (let i2 = 253; i2 >= 0; i2--) {
        square(c2, c2);
        if (i2 !== 2 && i2 !== 4) {
          mul(c2, c2, inp);
        }
      }
      for (let i2 = 0; i2 < 16; i2++) {
        o[i2] = c2[i2];
      }
    }
    function scalarMult(n2, p3) {
      const z2 = new Uint8Array(32);
      const x2 = new Float64Array(80);
      const a2 = gf(), b4 = gf(), c2 = gf(), d2 = gf(), e = gf(), f3 = gf();
      for (let i2 = 0; i2 < 31; i2++) {
        z2[i2] = n2[i2];
      }
      z2[31] = n2[31] & 127 | 64;
      z2[0] &= 248;
      unpack25519(x2, p3);
      for (let i2 = 0; i2 < 16; i2++) {
        b4[i2] = x2[i2];
      }
      a2[0] = d2[0] = 1;
      for (let i2 = 254; i2 >= 0; --i2) {
        const r = z2[i2 >>> 3] >>> (i2 & 7) & 1;
        sel25519(a2, b4, r);
        sel25519(c2, d2, r);
        add(e, a2, c2);
        sub(a2, a2, c2);
        add(c2, b4, d2);
        sub(b4, b4, d2);
        square(d2, e);
        square(f3, a2);
        mul(a2, c2, a2);
        mul(c2, b4, e);
        add(e, a2, c2);
        sub(a2, a2, c2);
        square(b4, a2);
        sub(c2, d2, f3);
        mul(a2, c2, _121665);
        add(a2, a2, d2);
        mul(c2, c2, a2);
        mul(a2, d2, f3);
        mul(d2, b4, x2);
        square(b4, e);
        sel25519(a2, b4, r);
        sel25519(c2, d2, r);
      }
      for (let i2 = 0; i2 < 16; i2++) {
        x2[i2 + 16] = a2[i2];
        x2[i2 + 32] = c2[i2];
        x2[i2 + 48] = b4[i2];
        x2[i2 + 64] = d2[i2];
      }
      const x32 = x2.subarray(32);
      const x16 = x2.subarray(16);
      inv25519(x32, x32);
      mul(x16, x16, x32);
      const q4 = new Uint8Array(32);
      pack25519(q4, x16);
      return q4;
    }
    exports.scalarMult = scalarMult;
    function scalarMultBase(n2) {
      return scalarMult(n2, _9);
    }
    exports.scalarMultBase = scalarMultBase;
    function generateKeyPairFromSeed2(seed) {
      if (seed.length !== exports.SECRET_KEY_LENGTH) {
        throw new Error(`x25519: seed must be ${exports.SECRET_KEY_LENGTH} bytes`);
      }
      const secretKey = new Uint8Array(seed);
      const publicKey = scalarMultBase(secretKey);
      return {
        publicKey,
        secretKey
      };
    }
    exports.generateKeyPairFromSeed = generateKeyPairFromSeed2;
    function generateKeyPair3(prng) {
      const seed = (0, random_1.randomBytes)(32, prng);
      const result = generateKeyPairFromSeed2(seed);
      (0, wipe_1.wipe)(seed);
      return result;
    }
    exports.generateKeyPair = generateKeyPair3;
    function sharedKey2(mySecretKey, theirPublicKey, rejectZero = false) {
      if (mySecretKey.length !== exports.PUBLIC_KEY_LENGTH) {
        throw new Error("X25519: incorrect secret key length");
      }
      if (theirPublicKey.length !== exports.PUBLIC_KEY_LENGTH) {
        throw new Error("X25519: incorrect public key length");
      }
      const result = scalarMult(mySecretKey, theirPublicKey);
      if (rejectZero) {
        let zeros = 0;
        for (let i2 = 0; i2 < result.length; i2++) {
          zeros |= result[i2];
        }
        if (zeros === 0) {
          throw new Error("X25519: invalid shared key");
        }
      }
      return result;
    }
    exports.sharedKey = sharedKey2;
  }
});

// node_modules/.pnpm/@walletconnect+window-getters@1.0.1/node_modules/@walletconnect/window-getters/dist/cjs/index.js
var require_cjs5 = __commonJS({
  "node_modules/.pnpm/@walletconnect+window-getters@1.0.1/node_modules/@walletconnect/window-getters/dist/cjs/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getLocalStorage = exports.getLocalStorageOrThrow = exports.getCrypto = exports.getCryptoOrThrow = exports.getLocation = exports.getLocationOrThrow = exports.getNavigator = exports.getNavigatorOrThrow = exports.getDocument = exports.getDocumentOrThrow = exports.getFromWindowOrThrow = exports.getFromWindow = void 0;
    function getFromWindow(name2) {
      let res = void 0;
      if (typeof window !== "undefined" && typeof window[name2] !== "undefined") {
        res = window[name2];
      }
      return res;
    }
    exports.getFromWindow = getFromWindow;
    function getFromWindowOrThrow(name2) {
      const res = getFromWindow(name2);
      if (!res) {
        throw new Error(`${name2} is not defined in Window`);
      }
      return res;
    }
    exports.getFromWindowOrThrow = getFromWindowOrThrow;
    function getDocumentOrThrow() {
      return getFromWindowOrThrow("document");
    }
    exports.getDocumentOrThrow = getDocumentOrThrow;
    function getDocument() {
      return getFromWindow("document");
    }
    exports.getDocument = getDocument;
    function getNavigatorOrThrow() {
      return getFromWindowOrThrow("navigator");
    }
    exports.getNavigatorOrThrow = getNavigatorOrThrow;
    function getNavigator() {
      return getFromWindow("navigator");
    }
    exports.getNavigator = getNavigator;
    function getLocationOrThrow() {
      return getFromWindowOrThrow("location");
    }
    exports.getLocationOrThrow = getLocationOrThrow;
    function getLocation() {
      return getFromWindow("location");
    }
    exports.getLocation = getLocation;
    function getCryptoOrThrow() {
      return getFromWindowOrThrow("crypto");
    }
    exports.getCryptoOrThrow = getCryptoOrThrow;
    function getCrypto() {
      return getFromWindow("crypto");
    }
    exports.getCrypto = getCrypto;
    function getLocalStorageOrThrow() {
      return getFromWindowOrThrow("localStorage");
    }
    exports.getLocalStorageOrThrow = getLocalStorageOrThrow;
    function getLocalStorage() {
      return getFromWindow("localStorage");
    }
    exports.getLocalStorage = getLocalStorage;
  }
});

// node_modules/.pnpm/@walletconnect+window-metadata@1.0.1/node_modules/@walletconnect/window-metadata/dist/cjs/index.js
var require_cjs6 = __commonJS({
  "node_modules/.pnpm/@walletconnect+window-metadata@1.0.1/node_modules/@walletconnect/window-metadata/dist/cjs/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getWindowMetadata = void 0;
    var window_getters_1 = require_cjs5();
    function getWindowMetadata() {
      let doc;
      let loc;
      try {
        doc = window_getters_1.getDocumentOrThrow();
        loc = window_getters_1.getLocationOrThrow();
      } catch (e) {
        return null;
      }
      function getIcons() {
        const links = doc.getElementsByTagName("link");
        const icons2 = [];
        for (let i2 = 0; i2 < links.length; i2++) {
          const link = links[i2];
          const rel = link.getAttribute("rel");
          if (rel) {
            if (rel.toLowerCase().indexOf("icon") > -1) {
              const href = link.getAttribute("href");
              if (href) {
                if (href.toLowerCase().indexOf("https:") === -1 && href.toLowerCase().indexOf("http:") === -1 && href.indexOf("//") !== 0) {
                  let absoluteHref = loc.protocol + "//" + loc.host;
                  if (href.indexOf("/") === 0) {
                    absoluteHref += href;
                  } else {
                    const path = loc.pathname.split("/");
                    path.pop();
                    const finalPath = path.join("/");
                    absoluteHref += finalPath + "/" + href;
                  }
                  icons2.push(absoluteHref);
                } else if (href.indexOf("//") === 0) {
                  const absoluteUrl = loc.protocol + href;
                  icons2.push(absoluteUrl);
                } else {
                  icons2.push(href);
                }
              }
            }
          }
        }
        return icons2;
      }
      function getWindowMetadataOfAny(...args) {
        const metaTags = doc.getElementsByTagName("meta");
        for (let i2 = 0; i2 < metaTags.length; i2++) {
          const tag = metaTags[i2];
          const attributes = ["itemprop", "property", "name"].map((target) => tag.getAttribute(target)).filter((attr) => {
            if (attr) {
              return args.includes(attr);
            }
            return false;
          });
          if (attributes.length && attributes) {
            const content = tag.getAttribute("content");
            if (content) {
              return content;
            }
          }
        }
        return "";
      }
      function getName() {
        let name3 = getWindowMetadataOfAny("name", "og:site_name", "og:title", "twitter:title");
        if (!name3) {
          name3 = doc.title;
        }
        return name3;
      }
      function getDescription() {
        const description2 = getWindowMetadataOfAny("description", "og:description", "twitter:description", "keywords");
        return description2;
      }
      const name2 = getName();
      const description = getDescription();
      const url = loc.origin;
      const icons = getIcons();
      const meta = {
        description,
        url,
        icons,
        name: name2
      };
      return meta;
    }
    exports.getWindowMetadata = getWindowMetadata;
  }
});

// node_modules/.pnpm/strict-uri-encode@2.0.0/node_modules/strict-uri-encode/index.js
var require_strict_uri_encode = __commonJS({
  "node_modules/.pnpm/strict-uri-encode@2.0.0/node_modules/strict-uri-encode/index.js"(exports, module) {
    "use strict";
    module.exports = (str) => encodeURIComponent(str).replace(/[!'()*]/g, (x2) => `%${x2.charCodeAt(0).toString(16).toUpperCase()}`);
  }
});

// node_modules/.pnpm/decode-uri-component@0.2.2/node_modules/decode-uri-component/index.js
var require_decode_uri_component = __commonJS({
  "node_modules/.pnpm/decode-uri-component@0.2.2/node_modules/decode-uri-component/index.js"(exports, module) {
    "use strict";
    var token = "%[a-f0-9]{2}";
    var singleMatcher = new RegExp("(" + token + ")|([^%]+?)", "gi");
    var multiMatcher = new RegExp("(" + token + ")+", "gi");
    function decodeComponents(components, split) {
      try {
        return [decodeURIComponent(components.join(""))];
      } catch (err) {
      }
      if (components.length === 1) {
        return components;
      }
      split = split || 1;
      var left = components.slice(0, split);
      var right = components.slice(split);
      return Array.prototype.concat.call([], decodeComponents(left), decodeComponents(right));
    }
    function decode6(input) {
      try {
        return decodeURIComponent(input);
      } catch (err) {
        var tokens = input.match(singleMatcher) || [];
        for (var i2 = 1; i2 < tokens.length; i2++) {
          input = decodeComponents(tokens, i2).join("");
          tokens = input.match(singleMatcher) || [];
        }
        return input;
      }
    }
    function customDecodeURIComponent(input) {
      var replaceMap = {
        "%FE%FF": "��",
        "%FF%FE": "��"
      };
      var match = multiMatcher.exec(input);
      while (match) {
        try {
          replaceMap[match[0]] = decodeURIComponent(match[0]);
        } catch (err) {
          var result = decode6(match[0]);
          if (result !== match[0]) {
            replaceMap[match[0]] = result;
          }
        }
        match = multiMatcher.exec(input);
      }
      replaceMap["%C2"] = "�";
      var entries = Object.keys(replaceMap);
      for (var i2 = 0; i2 < entries.length; i2++) {
        var key = entries[i2];
        input = input.replace(new RegExp(key, "g"), replaceMap[key]);
      }
      return input;
    }
    module.exports = function(encodedURI) {
      if (typeof encodedURI !== "string") {
        throw new TypeError("Expected `encodedURI` to be of type `string`, got `" + typeof encodedURI + "`");
      }
      try {
        encodedURI = encodedURI.replace(/\+/g, " ");
        return decodeURIComponent(encodedURI);
      } catch (err) {
        return customDecodeURIComponent(encodedURI);
      }
    };
  }
});

// node_modules/.pnpm/split-on-first@1.1.0/node_modules/split-on-first/index.js
var require_split_on_first = __commonJS({
  "node_modules/.pnpm/split-on-first@1.1.0/node_modules/split-on-first/index.js"(exports, module) {
    "use strict";
    module.exports = (string2, separator) => {
      if (!(typeof string2 === "string" && typeof separator === "string")) {
        throw new TypeError("Expected the arguments to be of type `string`");
      }
      if (separator === "") {
        return [string2];
      }
      const separatorIndex = string2.indexOf(separator);
      if (separatorIndex === -1) {
        return [string2];
      }
      return [
        string2.slice(0, separatorIndex),
        string2.slice(separatorIndex + separator.length)
      ];
    };
  }
});

// node_modules/.pnpm/filter-obj@1.1.0/node_modules/filter-obj/index.js
var require_filter_obj = __commonJS({
  "node_modules/.pnpm/filter-obj@1.1.0/node_modules/filter-obj/index.js"(exports, module) {
    "use strict";
    module.exports = function(obj, predicate) {
      var ret = {};
      var keys = Object.keys(obj);
      var isArr = Array.isArray(predicate);
      for (var i2 = 0; i2 < keys.length; i2++) {
        var key = keys[i2];
        var val = obj[key];
        if (isArr ? predicate.indexOf(key) !== -1 : predicate(key, val, obj)) {
          ret[key] = val;
        }
      }
      return ret;
    };
  }
});

// node_modules/.pnpm/query-string@7.1.3/node_modules/query-string/index.js
var require_query_string = __commonJS({
  "node_modules/.pnpm/query-string@7.1.3/node_modules/query-string/index.js"(exports) {
    "use strict";
    var strictUriEncode = require_strict_uri_encode();
    var decodeComponent = require_decode_uri_component();
    var splitOnFirst = require_split_on_first();
    var filterObject = require_filter_obj();
    var isNullOrUndefined = (value) => value === null || value === void 0;
    var encodeFragmentIdentifier = Symbol("encodeFragmentIdentifier");
    function encoderForArrayFormat(options) {
      switch (options.arrayFormat) {
        case "index":
          return (key) => (result, value) => {
            const index = result.length;
            if (value === void 0 || options.skipNull && value === null || options.skipEmptyString && value === "") {
              return result;
            }
            if (value === null) {
              return [...result, [encode5(key, options), "[", index, "]"].join("")];
            }
            return [
              ...result,
              [encode5(key, options), "[", encode5(index, options), "]=", encode5(value, options)].join("")
            ];
          };
        case "bracket":
          return (key) => (result, value) => {
            if (value === void 0 || options.skipNull && value === null || options.skipEmptyString && value === "") {
              return result;
            }
            if (value === null) {
              return [...result, [encode5(key, options), "[]"].join("")];
            }
            return [...result, [encode5(key, options), "[]=", encode5(value, options)].join("")];
          };
        case "colon-list-separator":
          return (key) => (result, value) => {
            if (value === void 0 || options.skipNull && value === null || options.skipEmptyString && value === "") {
              return result;
            }
            if (value === null) {
              return [...result, [encode5(key, options), ":list="].join("")];
            }
            return [...result, [encode5(key, options), ":list=", encode5(value, options)].join("")];
          };
        case "comma":
        case "separator":
        case "bracket-separator": {
          const keyValueSep = options.arrayFormat === "bracket-separator" ? "[]=" : "=";
          return (key) => (result, value) => {
            if (value === void 0 || options.skipNull && value === null || options.skipEmptyString && value === "") {
              return result;
            }
            value = value === null ? "" : value;
            if (result.length === 0) {
              return [[encode5(key, options), keyValueSep, encode5(value, options)].join("")];
            }
            return [[result, encode5(value, options)].join(options.arrayFormatSeparator)];
          };
        }
        default:
          return (key) => (result, value) => {
            if (value === void 0 || options.skipNull && value === null || options.skipEmptyString && value === "") {
              return result;
            }
            if (value === null) {
              return [...result, encode5(key, options)];
            }
            return [...result, [encode5(key, options), "=", encode5(value, options)].join("")];
          };
      }
    }
    function parserForArrayFormat(options) {
      let result;
      switch (options.arrayFormat) {
        case "index":
          return (key, value, accumulator) => {
            result = /\[(\d*)\]$/.exec(key);
            key = key.replace(/\[\d*\]$/, "");
            if (!result) {
              accumulator[key] = value;
              return;
            }
            if (accumulator[key] === void 0) {
              accumulator[key] = {};
            }
            accumulator[key][result[1]] = value;
          };
        case "bracket":
          return (key, value, accumulator) => {
            result = /(\[\])$/.exec(key);
            key = key.replace(/\[\]$/, "");
            if (!result) {
              accumulator[key] = value;
              return;
            }
            if (accumulator[key] === void 0) {
              accumulator[key] = [value];
              return;
            }
            accumulator[key] = [].concat(accumulator[key], value);
          };
        case "colon-list-separator":
          return (key, value, accumulator) => {
            result = /(:list)$/.exec(key);
            key = key.replace(/:list$/, "");
            if (!result) {
              accumulator[key] = value;
              return;
            }
            if (accumulator[key] === void 0) {
              accumulator[key] = [value];
              return;
            }
            accumulator[key] = [].concat(accumulator[key], value);
          };
        case "comma":
        case "separator":
          return (key, value, accumulator) => {
            const isArray = typeof value === "string" && value.includes(options.arrayFormatSeparator);
            const isEncodedArray = typeof value === "string" && !isArray && decode6(value, options).includes(options.arrayFormatSeparator);
            value = isEncodedArray ? decode6(value, options) : value;
            const newValue = isArray || isEncodedArray ? value.split(options.arrayFormatSeparator).map((item) => decode6(item, options)) : value === null ? value : decode6(value, options);
            accumulator[key] = newValue;
          };
        case "bracket-separator":
          return (key, value, accumulator) => {
            const isArray = /(\[\])$/.test(key);
            key = key.replace(/\[\]$/, "");
            if (!isArray) {
              accumulator[key] = value ? decode6(value, options) : value;
              return;
            }
            const arrayValue = value === null ? [] : value.split(options.arrayFormatSeparator).map((item) => decode6(item, options));
            if (accumulator[key] === void 0) {
              accumulator[key] = arrayValue;
              return;
            }
            accumulator[key] = [].concat(accumulator[key], arrayValue);
          };
        default:
          return (key, value, accumulator) => {
            if (accumulator[key] === void 0) {
              accumulator[key] = value;
              return;
            }
            accumulator[key] = [].concat(accumulator[key], value);
          };
      }
    }
    function validateArrayFormatSeparator(value) {
      if (typeof value !== "string" || value.length !== 1) {
        throw new TypeError("arrayFormatSeparator must be single character string");
      }
    }
    function encode5(value, options) {
      if (options.encode) {
        return options.strict ? strictUriEncode(value) : encodeURIComponent(value);
      }
      return value;
    }
    function decode6(value, options) {
      if (options.decode) {
        return decodeComponent(value);
      }
      return value;
    }
    function keysSorter(input) {
      if (Array.isArray(input)) {
        return input.sort();
      }
      if (typeof input === "object") {
        return keysSorter(Object.keys(input)).sort((a2, b4) => Number(a2) - Number(b4)).map((key) => input[key]);
      }
      return input;
    }
    function removeHash(input) {
      const hashStart = input.indexOf("#");
      if (hashStart !== -1) {
        input = input.slice(0, hashStart);
      }
      return input;
    }
    function getHash(url) {
      let hash = "";
      const hashStart = url.indexOf("#");
      if (hashStart !== -1) {
        hash = url.slice(hashStart);
      }
      return hash;
    }
    function extract(input) {
      input = removeHash(input);
      const queryStart = input.indexOf("?");
      if (queryStart === -1) {
        return "";
      }
      return input.slice(queryStart + 1);
    }
    function parseValue(value, options) {
      if (options.parseNumbers && !Number.isNaN(Number(value)) && (typeof value === "string" && value.trim() !== "")) {
        value = Number(value);
      } else if (options.parseBooleans && value !== null && (value.toLowerCase() === "true" || value.toLowerCase() === "false")) {
        value = value.toLowerCase() === "true";
      }
      return value;
    }
    function parse2(query, options) {
      options = Object.assign({
        decode: true,
        sort: true,
        arrayFormat: "none",
        arrayFormatSeparator: ",",
        parseNumbers: false,
        parseBooleans: false
      }, options);
      validateArrayFormatSeparator(options.arrayFormatSeparator);
      const formatter = parserForArrayFormat(options);
      const ret = /* @__PURE__ */ Object.create(null);
      if (typeof query !== "string") {
        return ret;
      }
      query = query.trim().replace(/^[?#&]/, "");
      if (!query) {
        return ret;
      }
      for (const param of query.split("&")) {
        if (param === "") {
          continue;
        }
        let [key, value] = splitOnFirst(options.decode ? param.replace(/\+/g, " ") : param, "=");
        value = value === void 0 ? null : ["comma", "separator", "bracket-separator"].includes(options.arrayFormat) ? value : decode6(value, options);
        formatter(decode6(key, options), value, ret);
      }
      for (const key of Object.keys(ret)) {
        const value = ret[key];
        if (typeof value === "object" && value !== null) {
          for (const k3 of Object.keys(value)) {
            value[k3] = parseValue(value[k3], options);
          }
        } else {
          ret[key] = parseValue(value, options);
        }
      }
      if (options.sort === false) {
        return ret;
      }
      return (options.sort === true ? Object.keys(ret).sort() : Object.keys(ret).sort(options.sort)).reduce((result, key) => {
        const value = ret[key];
        if (Boolean(value) && typeof value === "object" && !Array.isArray(value)) {
          result[key] = keysSorter(value);
        } else {
          result[key] = value;
        }
        return result;
      }, /* @__PURE__ */ Object.create(null));
    }
    exports.extract = extract;
    exports.parse = parse2;
    exports.stringify = (object, options) => {
      if (!object) {
        return "";
      }
      options = Object.assign({
        encode: true,
        strict: true,
        arrayFormat: "none",
        arrayFormatSeparator: ","
      }, options);
      validateArrayFormatSeparator(options.arrayFormatSeparator);
      const shouldFilter = (key) => options.skipNull && isNullOrUndefined(object[key]) || options.skipEmptyString && object[key] === "";
      const formatter = encoderForArrayFormat(options);
      const objectCopy = {};
      for (const key of Object.keys(object)) {
        if (!shouldFilter(key)) {
          objectCopy[key] = object[key];
        }
      }
      const keys = Object.keys(objectCopy);
      if (options.sort !== false) {
        keys.sort(options.sort);
      }
      return keys.map((key) => {
        const value = object[key];
        if (value === void 0) {
          return "";
        }
        if (value === null) {
          return encode5(key, options);
        }
        if (Array.isArray(value)) {
          if (value.length === 0 && options.arrayFormat === "bracket-separator") {
            return encode5(key, options) + "[]";
          }
          return value.reduce(formatter(key), []).join("&");
        }
        return encode5(key, options) + "=" + encode5(value, options);
      }).filter((x2) => x2.length > 0).join("&");
    };
    exports.parseUrl = (url, options) => {
      options = Object.assign({
        decode: true
      }, options);
      const [url_, hash] = splitOnFirst(url, "#");
      return Object.assign(
        {
          url: url_.split("?")[0] || "",
          query: parse2(extract(url), options)
        },
        options && options.parseFragmentIdentifier && hash ? { fragmentIdentifier: decode6(hash, options) } : {}
      );
    };
    exports.stringifyUrl = (object, options) => {
      options = Object.assign({
        encode: true,
        strict: true,
        [encodeFragmentIdentifier]: true
      }, options);
      const url = removeHash(object.url).split("?")[0] || "";
      const queryFromUrl = exports.extract(object.url);
      const parsedQueryFromUrl = exports.parse(queryFromUrl, { sort: false });
      const query = Object.assign(parsedQueryFromUrl, object.query);
      let queryString = exports.stringify(query, options);
      if (queryString) {
        queryString = `?${queryString}`;
      }
      let hash = getHash(object.url);
      if (object.fragmentIdentifier) {
        hash = `#${options[encodeFragmentIdentifier] ? encode5(object.fragmentIdentifier, options) : object.fragmentIdentifier}`;
      }
      return `${url}${queryString}${hash}`;
    };
    exports.pick = (input, filter, options) => {
      options = Object.assign({
        parseFragmentIdentifier: true,
        [encodeFragmentIdentifier]: false
      }, options);
      const { url, query, fragmentIdentifier } = exports.parseUrl(input, options);
      return exports.stringifyUrl({
        url,
        query: filterObject(query, filter),
        fragmentIdentifier
      }, options);
    };
    exports.exclude = (input, filter, options) => {
      const exclusionFilter = Array.isArray(filter) ? (key) => !filter.includes(key) : (key, value) => !filter(key, value);
      return exports.pick(input, exclusionFilter, options);
    };
  }
});

// node_modules/.pnpm/@walletconnect+environment@1.0.1/node_modules/@walletconnect/environment/dist/cjs/crypto.js
var require_crypto2 = __commonJS({
  "node_modules/.pnpm/@walletconnect+environment@1.0.1/node_modules/@walletconnect/environment/dist/cjs/crypto.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isBrowserCryptoAvailable = exports.getSubtleCrypto = exports.getBrowerCrypto = void 0;
    function getBrowerCrypto() {
      return (global === null || global === void 0 ? void 0 : global.crypto) || (global === null || global === void 0 ? void 0 : global.msCrypto) || {};
    }
    exports.getBrowerCrypto = getBrowerCrypto;
    function getSubtleCrypto() {
      const browserCrypto = getBrowerCrypto();
      return browserCrypto.subtle || browserCrypto.webkitSubtle;
    }
    exports.getSubtleCrypto = getSubtleCrypto;
    function isBrowserCryptoAvailable() {
      return !!getBrowerCrypto() && !!getSubtleCrypto();
    }
    exports.isBrowserCryptoAvailable = isBrowserCryptoAvailable;
  }
});

// node_modules/.pnpm/@walletconnect+environment@1.0.1/node_modules/@walletconnect/environment/dist/cjs/env.js
var require_env = __commonJS({
  "node_modules/.pnpm/@walletconnect+environment@1.0.1/node_modules/@walletconnect/environment/dist/cjs/env.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isBrowser = exports.isNode = exports.isReactNative = void 0;
    function isReactNative2() {
      return typeof document === "undefined" && typeof navigator !== "undefined" && navigator.product === "ReactNative";
    }
    exports.isReactNative = isReactNative2;
    function isNode2() {
      return typeof process !== "undefined" && typeof process.versions !== "undefined" && typeof process.versions.node !== "undefined";
    }
    exports.isNode = isNode2;
    function isBrowser2() {
      return !isReactNative2() && !isNode2();
    }
    exports.isBrowser = isBrowser2;
  }
});

// node_modules/.pnpm/@walletconnect+environment@1.0.1/node_modules/@walletconnect/environment/dist/cjs/index.js
var require_cjs7 = __commonJS({
  "node_modules/.pnpm/@walletconnect+environment@1.0.1/node_modules/@walletconnect/environment/dist/cjs/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require_tslib();
    tslib_1.__exportStar(require_crypto2(), exports);
    tslib_1.__exportStar(require_env(), exports);
  }
});

// node_modules/.pnpm/ws@7.5.9/node_modules/ws/browser.js
var require_browser4 = __commonJS({
  "node_modules/.pnpm/ws@7.5.9/node_modules/ws/browser.js"(exports, module) {
    "use strict";
    module.exports = function() {
      throw new Error(
        "ws does not work in the browser. Browser clients must use the native WebSocket object"
      );
    };
  }
});

// node_modules/.pnpm/lodash.isequal@4.5.0/node_modules/lodash.isequal/index.js
var require_lodash = __commonJS({
  "node_modules/.pnpm/lodash.isequal@4.5.0/node_modules/lodash.isequal/index.js"(exports, module) {
    var LARGE_ARRAY_SIZE = 200;
    var HASH_UNDEFINED = "__lodash_hash_undefined__";
    var COMPARE_PARTIAL_FLAG = 1;
    var COMPARE_UNORDERED_FLAG = 2;
    var MAX_SAFE_INTEGER = 9007199254740991;
    var argsTag = "[object Arguments]";
    var arrayTag = "[object Array]";
    var asyncTag = "[object AsyncFunction]";
    var boolTag = "[object Boolean]";
    var dateTag = "[object Date]";
    var errorTag = "[object Error]";
    var funcTag = "[object Function]";
    var genTag = "[object GeneratorFunction]";
    var mapTag = "[object Map]";
    var numberTag = "[object Number]";
    var nullTag = "[object Null]";
    var objectTag = "[object Object]";
    var promiseTag = "[object Promise]";
    var proxyTag = "[object Proxy]";
    var regexpTag = "[object RegExp]";
    var setTag = "[object Set]";
    var stringTag = "[object String]";
    var symbolTag = "[object Symbol]";
    var undefinedTag = "[object Undefined]";
    var weakMapTag = "[object WeakMap]";
    var arrayBufferTag = "[object ArrayBuffer]";
    var dataViewTag = "[object DataView]";
    var float32Tag = "[object Float32Array]";
    var float64Tag = "[object Float64Array]";
    var int8Tag = "[object Int8Array]";
    var int16Tag = "[object Int16Array]";
    var int32Tag = "[object Int32Array]";
    var uint8Tag = "[object Uint8Array]";
    var uint8ClampedTag = "[object Uint8ClampedArray]";
    var uint16Tag = "[object Uint16Array]";
    var uint32Tag = "[object Uint32Array]";
    var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
    var reIsHostCtor = /^\[object .+?Constructor\]$/;
    var reIsUint = /^(?:0|[1-9]\d*)$/;
    var typedArrayTags = {};
    typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
    typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
    var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
    var freeSelf = typeof self == "object" && self && self.Object === Object && self;
    var root = freeGlobal || freeSelf || Function("return this")();
    var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
    var freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
    var moduleExports = freeModule && freeModule.exports === freeExports;
    var freeProcess = moduleExports && freeGlobal.process;
    var nodeUtil = function() {
      try {
        return freeProcess && freeProcess.binding && freeProcess.binding("util");
      } catch (e) {
      }
    }();
    var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
    function arrayFilter(array, predicate) {
      var index = -1, length2 = array == null ? 0 : array.length, resIndex = 0, result = [];
      while (++index < length2) {
        var value = array[index];
        if (predicate(value, index, array)) {
          result[resIndex++] = value;
        }
      }
      return result;
    }
    function arrayPush(array, values) {
      var index = -1, length2 = values.length, offset = array.length;
      while (++index < length2) {
        array[offset + index] = values[index];
      }
      return array;
    }
    function arraySome(array, predicate) {
      var index = -1, length2 = array == null ? 0 : array.length;
      while (++index < length2) {
        if (predicate(array[index], index, array)) {
          return true;
        }
      }
      return false;
    }
    function baseTimes(n2, iteratee) {
      var index = -1, result = Array(n2);
      while (++index < n2) {
        result[index] = iteratee(index);
      }
      return result;
    }
    function baseUnary(func) {
      return function(value) {
        return func(value);
      };
    }
    function cacheHas(cache, key) {
      return cache.has(key);
    }
    function getValue(object, key) {
      return object == null ? void 0 : object[key];
    }
    function mapToArray(map) {
      var index = -1, result = Array(map.size);
      map.forEach(function(value, key) {
        result[++index] = [key, value];
      });
      return result;
    }
    function overArg(func, transform) {
      return function(arg) {
        return func(transform(arg));
      };
    }
    function setToArray(set) {
      var index = -1, result = Array(set.size);
      set.forEach(function(value) {
        result[++index] = value;
      });
      return result;
    }
    var arrayProto = Array.prototype;
    var funcProto = Function.prototype;
    var objectProto = Object.prototype;
    var coreJsData = root["__core-js_shared__"];
    var funcToString = funcProto.toString;
    var hasOwnProperty = objectProto.hasOwnProperty;
    var maskSrcKey = function() {
      var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
      return uid ? "Symbol(src)_1." + uid : "";
    }();
    var nativeObjectToString = objectProto.toString;
    var reIsNative = RegExp(
      "^" + funcToString.call(hasOwnProperty).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
    );
    var Buffer = moduleExports ? root.Buffer : void 0;
    var Symbol2 = root.Symbol;
    var Uint8Array2 = root.Uint8Array;
    var propertyIsEnumerable = objectProto.propertyIsEnumerable;
    var splice = arrayProto.splice;
    var symToStringTag = Symbol2 ? Symbol2.toStringTag : void 0;
    var nativeGetSymbols = Object.getOwnPropertySymbols;
    var nativeIsBuffer = Buffer ? Buffer.isBuffer : void 0;
    var nativeKeys = overArg(Object.keys, Object);
    var DataView2 = getNative(root, "DataView");
    var Map2 = getNative(root, "Map");
    var Promise2 = getNative(root, "Promise");
    var Set2 = getNative(root, "Set");
    var WeakMap = getNative(root, "WeakMap");
    var nativeCreate = getNative(Object, "create");
    var dataViewCtorString = toSource(DataView2);
    var mapCtorString = toSource(Map2);
    var promiseCtorString = toSource(Promise2);
    var setCtorString = toSource(Set2);
    var weakMapCtorString = toSource(WeakMap);
    var symbolProto = Symbol2 ? Symbol2.prototype : void 0;
    var symbolValueOf = symbolProto ? symbolProto.valueOf : void 0;
    function Hash(entries) {
      var index = -1, length2 = entries == null ? 0 : entries.length;
      this.clear();
      while (++index < length2) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }
    function hashClear() {
      this.__data__ = nativeCreate ? nativeCreate(null) : {};
      this.size = 0;
    }
    function hashDelete(key) {
      var result = this.has(key) && delete this.__data__[key];
      this.size -= result ? 1 : 0;
      return result;
    }
    function hashGet(key) {
      var data = this.__data__;
      if (nativeCreate) {
        var result = data[key];
        return result === HASH_UNDEFINED ? void 0 : result;
      }
      return hasOwnProperty.call(data, key) ? data[key] : void 0;
    }
    function hashHas(key) {
      var data = this.__data__;
      return nativeCreate ? data[key] !== void 0 : hasOwnProperty.call(data, key);
    }
    function hashSet(key, value) {
      var data = this.__data__;
      this.size += this.has(key) ? 0 : 1;
      data[key] = nativeCreate && value === void 0 ? HASH_UNDEFINED : value;
      return this;
    }
    Hash.prototype.clear = hashClear;
    Hash.prototype["delete"] = hashDelete;
    Hash.prototype.get = hashGet;
    Hash.prototype.has = hashHas;
    Hash.prototype.set = hashSet;
    function ListCache(entries) {
      var index = -1, length2 = entries == null ? 0 : entries.length;
      this.clear();
      while (++index < length2) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }
    function listCacheClear() {
      this.__data__ = [];
      this.size = 0;
    }
    function listCacheDelete(key) {
      var data = this.__data__, index = assocIndexOf(data, key);
      if (index < 0) {
        return false;
      }
      var lastIndex = data.length - 1;
      if (index == lastIndex) {
        data.pop();
      } else {
        splice.call(data, index, 1);
      }
      --this.size;
      return true;
    }
    function listCacheGet(key) {
      var data = this.__data__, index = assocIndexOf(data, key);
      return index < 0 ? void 0 : data[index][1];
    }
    function listCacheHas(key) {
      return assocIndexOf(this.__data__, key) > -1;
    }
    function listCacheSet(key, value) {
      var data = this.__data__, index = assocIndexOf(data, key);
      if (index < 0) {
        ++this.size;
        data.push([key, value]);
      } else {
        data[index][1] = value;
      }
      return this;
    }
    ListCache.prototype.clear = listCacheClear;
    ListCache.prototype["delete"] = listCacheDelete;
    ListCache.prototype.get = listCacheGet;
    ListCache.prototype.has = listCacheHas;
    ListCache.prototype.set = listCacheSet;
    function MapCache(entries) {
      var index = -1, length2 = entries == null ? 0 : entries.length;
      this.clear();
      while (++index < length2) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }
    function mapCacheClear() {
      this.size = 0;
      this.__data__ = {
        "hash": new Hash(),
        "map": new (Map2 || ListCache)(),
        "string": new Hash()
      };
    }
    function mapCacheDelete(key) {
      var result = getMapData(this, key)["delete"](key);
      this.size -= result ? 1 : 0;
      return result;
    }
    function mapCacheGet(key) {
      return getMapData(this, key).get(key);
    }
    function mapCacheHas(key) {
      return getMapData(this, key).has(key);
    }
    function mapCacheSet(key, value) {
      var data = getMapData(this, key), size = data.size;
      data.set(key, value);
      this.size += data.size == size ? 0 : 1;
      return this;
    }
    MapCache.prototype.clear = mapCacheClear;
    MapCache.prototype["delete"] = mapCacheDelete;
    MapCache.prototype.get = mapCacheGet;
    MapCache.prototype.has = mapCacheHas;
    MapCache.prototype.set = mapCacheSet;
    function SetCache(values) {
      var index = -1, length2 = values == null ? 0 : values.length;
      this.__data__ = new MapCache();
      while (++index < length2) {
        this.add(values[index]);
      }
    }
    function setCacheAdd(value) {
      this.__data__.set(value, HASH_UNDEFINED);
      return this;
    }
    function setCacheHas(value) {
      return this.__data__.has(value);
    }
    SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
    SetCache.prototype.has = setCacheHas;
    function Stack(entries) {
      var data = this.__data__ = new ListCache(entries);
      this.size = data.size;
    }
    function stackClear() {
      this.__data__ = new ListCache();
      this.size = 0;
    }
    function stackDelete(key) {
      var data = this.__data__, result = data["delete"](key);
      this.size = data.size;
      return result;
    }
    function stackGet(key) {
      return this.__data__.get(key);
    }
    function stackHas(key) {
      return this.__data__.has(key);
    }
    function stackSet(key, value) {
      var data = this.__data__;
      if (data instanceof ListCache) {
        var pairs = data.__data__;
        if (!Map2 || pairs.length < LARGE_ARRAY_SIZE - 1) {
          pairs.push([key, value]);
          this.size = ++data.size;
          return this;
        }
        data = this.__data__ = new MapCache(pairs);
      }
      data.set(key, value);
      this.size = data.size;
      return this;
    }
    Stack.prototype.clear = stackClear;
    Stack.prototype["delete"] = stackDelete;
    Stack.prototype.get = stackGet;
    Stack.prototype.has = stackHas;
    Stack.prototype.set = stackSet;
    function arrayLikeKeys(value, inherited) {
      var isArr = isArray(value), isArg = !isArr && isArguments(value), isBuff = !isArr && !isArg && isBuffer(value), isType = !isArr && !isArg && !isBuff && isTypedArray(value), skipIndexes = isArr || isArg || isBuff || isType, result = skipIndexes ? baseTimes(value.length, String) : [], length2 = result.length;
      for (var key in value) {
        if ((inherited || hasOwnProperty.call(value, key)) && !(skipIndexes && // Safari 9 has enumerable `arguments.length` in strict mode.
        (key == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
        isBuff && (key == "offset" || key == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
        isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || // Skip index properties.
        isIndex(key, length2)))) {
          result.push(key);
        }
      }
      return result;
    }
    function assocIndexOf(array, key) {
      var length2 = array.length;
      while (length2--) {
        if (eq(array[length2][0], key)) {
          return length2;
        }
      }
      return -1;
    }
    function baseGetAllKeys(object, keysFunc, symbolsFunc) {
      var result = keysFunc(object);
      return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
    }
    function baseGetTag(value) {
      if (value == null) {
        return value === void 0 ? undefinedTag : nullTag;
      }
      return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
    }
    function baseIsArguments(value) {
      return isObjectLike(value) && baseGetTag(value) == argsTag;
    }
    function baseIsEqual(value, other, bitmask, customizer, stack) {
      if (value === other) {
        return true;
      }
      if (value == null || other == null || !isObjectLike(value) && !isObjectLike(other)) {
        return value !== value && other !== other;
      }
      return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
    }
    function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
      var objIsArr = isArray(object), othIsArr = isArray(other), objTag = objIsArr ? arrayTag : getTag(object), othTag = othIsArr ? arrayTag : getTag(other);
      objTag = objTag == argsTag ? objectTag : objTag;
      othTag = othTag == argsTag ? objectTag : othTag;
      var objIsObj = objTag == objectTag, othIsObj = othTag == objectTag, isSameTag = objTag == othTag;
      if (isSameTag && isBuffer(object)) {
        if (!isBuffer(other)) {
          return false;
        }
        objIsArr = true;
        objIsObj = false;
      }
      if (isSameTag && !objIsObj) {
        stack || (stack = new Stack());
        return objIsArr || isTypedArray(object) ? equalArrays(object, other, bitmask, customizer, equalFunc, stack) : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
      }
      if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
        var objIsWrapped = objIsObj && hasOwnProperty.call(object, "__wrapped__"), othIsWrapped = othIsObj && hasOwnProperty.call(other, "__wrapped__");
        if (objIsWrapped || othIsWrapped) {
          var objUnwrapped = objIsWrapped ? object.value() : object, othUnwrapped = othIsWrapped ? other.value() : other;
          stack || (stack = new Stack());
          return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
        }
      }
      if (!isSameTag) {
        return false;
      }
      stack || (stack = new Stack());
      return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
    }
    function baseIsNative(value) {
      if (!isObject(value) || isMasked(value)) {
        return false;
      }
      var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
      return pattern.test(toSource(value));
    }
    function baseIsTypedArray(value) {
      return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
    }
    function baseKeys(object) {
      if (!isPrototype(object)) {
        return nativeKeys(object);
      }
      var result = [];
      for (var key in Object(object)) {
        if (hasOwnProperty.call(object, key) && key != "constructor") {
          result.push(key);
        }
      }
      return result;
    }
    function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG, arrLength = array.length, othLength = other.length;
      if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
        return false;
      }
      var stacked = stack.get(array);
      if (stacked && stack.get(other)) {
        return stacked == other;
      }
      var index = -1, result = true, seen = bitmask & COMPARE_UNORDERED_FLAG ? new SetCache() : void 0;
      stack.set(array, other);
      stack.set(other, array);
      while (++index < arrLength) {
        var arrValue = array[index], othValue = other[index];
        if (customizer) {
          var compared = isPartial ? customizer(othValue, arrValue, index, other, array, stack) : customizer(arrValue, othValue, index, array, other, stack);
        }
        if (compared !== void 0) {
          if (compared) {
            continue;
          }
          result = false;
          break;
        }
        if (seen) {
          if (!arraySome(other, function(othValue2, othIndex) {
            if (!cacheHas(seen, othIndex) && (arrValue === othValue2 || equalFunc(arrValue, othValue2, bitmask, customizer, stack))) {
              return seen.push(othIndex);
            }
          })) {
            result = false;
            break;
          }
        } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
          result = false;
          break;
        }
      }
      stack["delete"](array);
      stack["delete"](other);
      return result;
    }
    function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
      switch (tag) {
        case dataViewTag:
          if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) {
            return false;
          }
          object = object.buffer;
          other = other.buffer;
        case arrayBufferTag:
          if (object.byteLength != other.byteLength || !equalFunc(new Uint8Array2(object), new Uint8Array2(other))) {
            return false;
          }
          return true;
        case boolTag:
        case dateTag:
        case numberTag:
          return eq(+object, +other);
        case errorTag:
          return object.name == other.name && object.message == other.message;
        case regexpTag:
        case stringTag:
          return object == other + "";
        case mapTag:
          var convert = mapToArray;
        case setTag:
          var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
          convert || (convert = setToArray);
          if (object.size != other.size && !isPartial) {
            return false;
          }
          var stacked = stack.get(object);
          if (stacked) {
            return stacked == other;
          }
          bitmask |= COMPARE_UNORDERED_FLAG;
          stack.set(object, other);
          var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
          stack["delete"](object);
          return result;
        case symbolTag:
          if (symbolValueOf) {
            return symbolValueOf.call(object) == symbolValueOf.call(other);
          }
      }
      return false;
    }
    function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG, objProps = getAllKeys(object), objLength = objProps.length, othProps = getAllKeys(other), othLength = othProps.length;
      if (objLength != othLength && !isPartial) {
        return false;
      }
      var index = objLength;
      while (index--) {
        var key = objProps[index];
        if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
          return false;
        }
      }
      var stacked = stack.get(object);
      if (stacked && stack.get(other)) {
        return stacked == other;
      }
      var result = true;
      stack.set(object, other);
      stack.set(other, object);
      var skipCtor = isPartial;
      while (++index < objLength) {
        key = objProps[index];
        var objValue = object[key], othValue = other[key];
        if (customizer) {
          var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
        }
        if (!(compared === void 0 ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack) : compared)) {
          result = false;
          break;
        }
        skipCtor || (skipCtor = key == "constructor");
      }
      if (result && !skipCtor) {
        var objCtor = object.constructor, othCtor = other.constructor;
        if (objCtor != othCtor && ("constructor" in object && "constructor" in other) && !(typeof objCtor == "function" && objCtor instanceof objCtor && typeof othCtor == "function" && othCtor instanceof othCtor)) {
          result = false;
        }
      }
      stack["delete"](object);
      stack["delete"](other);
      return result;
    }
    function getAllKeys(object) {
      return baseGetAllKeys(object, keys, getSymbols);
    }
    function getMapData(map, key) {
      var data = map.__data__;
      return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
    }
    function getNative(object, key) {
      var value = getValue(object, key);
      return baseIsNative(value) ? value : void 0;
    }
    function getRawTag(value) {
      var isOwn = hasOwnProperty.call(value, symToStringTag), tag = value[symToStringTag];
      try {
        value[symToStringTag] = void 0;
        var unmasked = true;
      } catch (e) {
      }
      var result = nativeObjectToString.call(value);
      if (unmasked) {
        if (isOwn) {
          value[symToStringTag] = tag;
        } else {
          delete value[symToStringTag];
        }
      }
      return result;
    }
    var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
      if (object == null) {
        return [];
      }
      object = Object(object);
      return arrayFilter(nativeGetSymbols(object), function(symbol) {
        return propertyIsEnumerable.call(object, symbol);
      });
    };
    var getTag = baseGetTag;
    if (DataView2 && getTag(new DataView2(new ArrayBuffer(1))) != dataViewTag || Map2 && getTag(new Map2()) != mapTag || Promise2 && getTag(Promise2.resolve()) != promiseTag || Set2 && getTag(new Set2()) != setTag || WeakMap && getTag(new WeakMap()) != weakMapTag) {
      getTag = function(value) {
        var result = baseGetTag(value), Ctor = result == objectTag ? value.constructor : void 0, ctorString = Ctor ? toSource(Ctor) : "";
        if (ctorString) {
          switch (ctorString) {
            case dataViewCtorString:
              return dataViewTag;
            case mapCtorString:
              return mapTag;
            case promiseCtorString:
              return promiseTag;
            case setCtorString:
              return setTag;
            case weakMapCtorString:
              return weakMapTag;
          }
        }
        return result;
      };
    }
    function isIndex(value, length2) {
      length2 = length2 == null ? MAX_SAFE_INTEGER : length2;
      return !!length2 && (typeof value == "number" || reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length2);
    }
    function isKeyable(value) {
      var type = typeof value;
      return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
    }
    function isMasked(func) {
      return !!maskSrcKey && maskSrcKey in func;
    }
    function isPrototype(value) {
      var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto;
      return value === proto;
    }
    function objectToString(value) {
      return nativeObjectToString.call(value);
    }
    function toSource(func) {
      if (func != null) {
        try {
          return funcToString.call(func);
        } catch (e) {
        }
        try {
          return func + "";
        } catch (e) {
        }
      }
      return "";
    }
    function eq(value, other) {
      return value === other || value !== value && other !== other;
    }
    var isArguments = baseIsArguments(function() {
      return arguments;
    }()) ? baseIsArguments : function(value) {
      return isObjectLike(value) && hasOwnProperty.call(value, "callee") && !propertyIsEnumerable.call(value, "callee");
    };
    var isArray = Array.isArray;
    function isArrayLike(value) {
      return value != null && isLength(value.length) && !isFunction(value);
    }
    var isBuffer = nativeIsBuffer || stubFalse;
    function isEqual(value, other) {
      return baseIsEqual(value, other);
    }
    function isFunction(value) {
      if (!isObject(value)) {
        return false;
      }
      var tag = baseGetTag(value);
      return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
    }
    function isLength(value) {
      return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
    }
    function isObject(value) {
      var type = typeof value;
      return value != null && (type == "object" || type == "function");
    }
    function isObjectLike(value) {
      return value != null && typeof value == "object";
    }
    var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
    function keys(object) {
      return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
    }
    function stubArray() {
      return [];
    }
    function stubFalse() {
      return false;
    }
    module.exports = isEqual;
  }
});

// node_modules/.pnpm/@walletconnect+core@2.7.3/node_modules/@walletconnect/core/dist/index.es.js
var import_events5 = __toESM(require_events());
var import_keyvaluestorage = __toESM(require_browser());
var import_heartbeat = __toESM(require_cjs3());
var import_logger = __toESM(require_cjs4());

// node_modules/.pnpm/@walletconnect+types@2.7.3/node_modules/@walletconnect/types/dist/index.es.js
init_esm();
var import_events2 = __toESM(require_events());
var n = class extends IEvents {
  constructor(s) {
    super(), this.opts = s, this.protocol = "wc", this.version = 2;
  }
};
var h = class extends IEvents {
  constructor(s, t) {
    super(), this.core = s, this.logger = t, this.records = /* @__PURE__ */ new Map();
  }
};
var a = class {
  constructor(s, t) {
    this.logger = s, this.core = t;
  }
};
var u = class extends IEvents {
  constructor(s, t) {
    super(), this.relayer = s, this.logger = t;
  }
};
var g = class extends IEvents {
  constructor(s) {
    super();
  }
};
var p = class {
  constructor(s, t, o, w2) {
    this.core = s, this.logger = t, this.name = o;
  }
};
var d = class extends IEvents {
  constructor(s, t) {
    super(), this.relayer = s, this.logger = t;
  }
};
var E = class extends IEvents {
  constructor(s, t) {
    super(), this.core = s, this.logger = t;
  }
};
var y = class {
  constructor(s, t) {
    this.projectId = s, this.logger = t;
  }
};
var b = class {
  constructor(s) {
    this.opts = s, this.protocol = "wc", this.version = 2;
  }
};
var S = class {
  constructor(s) {
    this.client = s;
  }
};

// node_modules/.pnpm/@walletconnect+safe-json@1.0.2/node_modules/@walletconnect/safe-json/dist/esm/index.js
var JSONStringify = (data) => JSON.stringify(data, (_2, value) => typeof value === "bigint" ? value.toString() + "n" : value);
var JSONParse = (json) => {
  const numbersBiggerThanMaxInt = /([\[:])?(\d{17,}|(?:[9](?:[1-9]07199254740991|0[1-9]7199254740991|00[8-9]199254740991|007[2-9]99254740991|007199[3-9]54740991|0071992[6-9]4740991|00719925[5-9]740991|007199254[8-9]40991|0071992547[5-9]0991|00719925474[1-9]991|00719925474099[2-9])))([,\}\]])/g;
  const serializedData = json.replace(numbersBiggerThanMaxInt, '$1"$2n"$3');
  return JSON.parse(serializedData, (_2, value) => {
    const isCustomFormatBigInt = typeof value === "string" && value.match(/^\d+n$/);
    if (isCustomFormatBigInt)
      return BigInt(value.substring(0, value.length - 1));
    return value;
  });
};
function safeJsonParse(value) {
  if (typeof value !== "string") {
    throw new Error(`Cannot safe json parse value of type ${typeof value}`);
  }
  try {
    return JSONParse(value);
  } catch (_a) {
    return value;
  }
}
function safeJsonStringify(value) {
  return typeof value === "string" ? value : JSONStringify(value) || "";
}

// node_modules/.pnpm/@walletconnect+relay-auth@1.0.4/node_modules/@walletconnect/relay-auth/dist/esm/api.js
var ed25519 = __toESM(require_ed25519());
var import_random = __toESM(require_random());
var import_time = __toESM(require_cjs2());

// node_modules/.pnpm/@walletconnect+relay-auth@1.0.4/node_modules/@walletconnect/relay-auth/dist/esm/constants.js
var JWT_IRIDIUM_ALG = "EdDSA";
var JWT_IRIDIUM_TYP = "JWT";
var JWT_DELIMITER = ".";
var JWT_ENCODING = "base64url";
var JSON_ENCODING = "utf8";
var DATA_ENCODING = "utf8";
var DID_DELIMITER = ":";
var DID_PREFIX = "did";
var DID_METHOD = "key";
var MULTICODEC_ED25519_ENCODING = "base58btc";
var MULTICODEC_ED25519_BASE = "z";
var MULTICODEC_ED25519_HEADER = "K36";
var KEY_PAIR_SEED_LENGTH = 32;

// node_modules/.pnpm/uint8arrays@3.1.1/node_modules/uint8arrays/esm/src/util/as-uint8array.js
function asUint8Array(buf) {
  if (globalThis.Buffer != null) {
    return new Uint8Array(buf.buffer, buf.byteOffset, buf.byteLength);
  }
  return buf;
}

// node_modules/.pnpm/uint8arrays@3.1.1/node_modules/uint8arrays/esm/src/alloc.js
function allocUnsafe(size = 0) {
  if (globalThis.Buffer != null && globalThis.Buffer.allocUnsafe != null) {
    return asUint8Array(globalThis.Buffer.allocUnsafe(size));
  }
  return new Uint8Array(size);
}

// node_modules/.pnpm/uint8arrays@3.1.1/node_modules/uint8arrays/esm/src/concat.js
function concat(arrays, length2) {
  if (!length2) {
    length2 = arrays.reduce((acc, curr) => acc + curr.length, 0);
  }
  const output = allocUnsafe(length2);
  let offset = 0;
  for (const arr of arrays) {
    output.set(arr, offset);
    offset += arr.length;
  }
  return asUint8Array(output);
}

// node_modules/.pnpm/multiformats@9.9.0/node_modules/multiformats/esm/src/bases/identity.js
var identity_exports = {};
__export(identity_exports, {
  identity: () => identity
});

// node_modules/.pnpm/multiformats@9.9.0/node_modules/multiformats/esm/vendor/base-x.js
function base(ALPHABET, name2) {
  if (ALPHABET.length >= 255) {
    throw new TypeError("Alphabet too long");
  }
  var BASE_MAP = new Uint8Array(256);
  for (var j3 = 0; j3 < BASE_MAP.length; j3++) {
    BASE_MAP[j3] = 255;
  }
  for (var i2 = 0; i2 < ALPHABET.length; i2++) {
    var x2 = ALPHABET.charAt(i2);
    var xc = x2.charCodeAt(0);
    if (BASE_MAP[xc] !== 255) {
      throw new TypeError(x2 + " is ambiguous");
    }
    BASE_MAP[xc] = i2;
  }
  var BASE = ALPHABET.length;
  var LEADER = ALPHABET.charAt(0);
  var FACTOR = Math.log(BASE) / Math.log(256);
  var iFACTOR = Math.log(256) / Math.log(BASE);
  function encode5(source) {
    if (source instanceof Uint8Array)
      ;
    else if (ArrayBuffer.isView(source)) {
      source = new Uint8Array(source.buffer, source.byteOffset, source.byteLength);
    } else if (Array.isArray(source)) {
      source = Uint8Array.from(source);
    }
    if (!(source instanceof Uint8Array)) {
      throw new TypeError("Expected Uint8Array");
    }
    if (source.length === 0) {
      return "";
    }
    var zeroes = 0;
    var length2 = 0;
    var pbegin = 0;
    var pend = source.length;
    while (pbegin !== pend && source[pbegin] === 0) {
      pbegin++;
      zeroes++;
    }
    var size = (pend - pbegin) * iFACTOR + 1 >>> 0;
    var b58 = new Uint8Array(size);
    while (pbegin !== pend) {
      var carry = source[pbegin];
      var i3 = 0;
      for (var it1 = size - 1; (carry !== 0 || i3 < length2) && it1 !== -1; it1--, i3++) {
        carry += 256 * b58[it1] >>> 0;
        b58[it1] = carry % BASE >>> 0;
        carry = carry / BASE >>> 0;
      }
      if (carry !== 0) {
        throw new Error("Non-zero carry");
      }
      length2 = i3;
      pbegin++;
    }
    var it22 = size - length2;
    while (it22 !== size && b58[it22] === 0) {
      it22++;
    }
    var str = LEADER.repeat(zeroes);
    for (; it22 < size; ++it22) {
      str += ALPHABET.charAt(b58[it22]);
    }
    return str;
  }
  function decodeUnsafe(source) {
    if (typeof source !== "string") {
      throw new TypeError("Expected String");
    }
    if (source.length === 0) {
      return new Uint8Array();
    }
    var psz = 0;
    if (source[psz] === " ") {
      return;
    }
    var zeroes = 0;
    var length2 = 0;
    while (source[psz] === LEADER) {
      zeroes++;
      psz++;
    }
    var size = (source.length - psz) * FACTOR + 1 >>> 0;
    var b256 = new Uint8Array(size);
    while (source[psz]) {
      var carry = BASE_MAP[source.charCodeAt(psz)];
      if (carry === 255) {
        return;
      }
      var i3 = 0;
      for (var it3 = size - 1; (carry !== 0 || i3 < length2) && it3 !== -1; it3--, i3++) {
        carry += BASE * b256[it3] >>> 0;
        b256[it3] = carry % 256 >>> 0;
        carry = carry / 256 >>> 0;
      }
      if (carry !== 0) {
        throw new Error("Non-zero carry");
      }
      length2 = i3;
      psz++;
    }
    if (source[psz] === " ") {
      return;
    }
    var it4 = size - length2;
    while (it4 !== size && b256[it4] === 0) {
      it4++;
    }
    var vch = new Uint8Array(zeroes + (size - it4));
    var j4 = zeroes;
    while (it4 !== size) {
      vch[j4++] = b256[it4++];
    }
    return vch;
  }
  function decode6(string2) {
    var buffer = decodeUnsafe(string2);
    if (buffer) {
      return buffer;
    }
    throw new Error(`Non-${name2} character`);
  }
  return {
    encode: encode5,
    decodeUnsafe,
    decode: decode6
  };
}
var src = base;
var _brrp__multiformats_scope_baseX = src;
var base_x_default = _brrp__multiformats_scope_baseX;

// node_modules/.pnpm/multiformats@9.9.0/node_modules/multiformats/esm/src/bytes.js
var empty = new Uint8Array(0);
var equals = (aa, bb) => {
  if (aa === bb)
    return true;
  if (aa.byteLength !== bb.byteLength) {
    return false;
  }
  for (let ii = 0; ii < aa.byteLength; ii++) {
    if (aa[ii] !== bb[ii]) {
      return false;
    }
  }
  return true;
};
var coerce = (o) => {
  if (o instanceof Uint8Array && o.constructor.name === "Uint8Array")
    return o;
  if (o instanceof ArrayBuffer)
    return new Uint8Array(o);
  if (ArrayBuffer.isView(o)) {
    return new Uint8Array(o.buffer, o.byteOffset, o.byteLength);
  }
  throw new Error("Unknown type, must be binary type");
};
var fromString = (str) => new TextEncoder().encode(str);
var toString = (b4) => new TextDecoder().decode(b4);

// node_modules/.pnpm/multiformats@9.9.0/node_modules/multiformats/esm/src/bases/base.js
var Encoder = class {
  constructor(name2, prefix, baseEncode) {
    this.name = name2;
    this.prefix = prefix;
    this.baseEncode = baseEncode;
  }
  encode(bytes) {
    if (bytes instanceof Uint8Array) {
      return `${this.prefix}${this.baseEncode(bytes)}`;
    } else {
      throw Error("Unknown type, must be binary type");
    }
  }
};
var Decoder = class {
  constructor(name2, prefix, baseDecode) {
    this.name = name2;
    this.prefix = prefix;
    if (prefix.codePointAt(0) === void 0) {
      throw new Error("Invalid prefix character");
    }
    this.prefixCodePoint = prefix.codePointAt(0);
    this.baseDecode = baseDecode;
  }
  decode(text) {
    if (typeof text === "string") {
      if (text.codePointAt(0) !== this.prefixCodePoint) {
        throw Error(`Unable to decode multibase string ${JSON.stringify(text)}, ${this.name} decoder only supports inputs prefixed with ${this.prefix}`);
      }
      return this.baseDecode(text.slice(this.prefix.length));
    } else {
      throw Error("Can only multibase decode strings");
    }
  }
  or(decoder) {
    return or(this, decoder);
  }
};
var ComposedDecoder = class {
  constructor(decoders) {
    this.decoders = decoders;
  }
  or(decoder) {
    return or(this, decoder);
  }
  decode(input) {
    const prefix = input[0];
    const decoder = this.decoders[prefix];
    if (decoder) {
      return decoder.decode(input);
    } else {
      throw RangeError(`Unable to decode multibase string ${JSON.stringify(input)}, only inputs prefixed with ${Object.keys(this.decoders)} are supported`);
    }
  }
};
var or = (left, right) => new ComposedDecoder({
  ...left.decoders || { [left.prefix]: left },
  ...right.decoders || { [right.prefix]: right }
});
var Codec = class {
  constructor(name2, prefix, baseEncode, baseDecode) {
    this.name = name2;
    this.prefix = prefix;
    this.baseEncode = baseEncode;
    this.baseDecode = baseDecode;
    this.encoder = new Encoder(name2, prefix, baseEncode);
    this.decoder = new Decoder(name2, prefix, baseDecode);
  }
  encode(input) {
    return this.encoder.encode(input);
  }
  decode(input) {
    return this.decoder.decode(input);
  }
};
var from = ({ name: name2, prefix, encode: encode5, decode: decode6 }) => new Codec(name2, prefix, encode5, decode6);
var baseX = ({ prefix, name: name2, alphabet: alphabet2 }) => {
  const { encode: encode5, decode: decode6 } = base_x_default(alphabet2, name2);
  return from({
    prefix,
    name: name2,
    encode: encode5,
    decode: (text) => coerce(decode6(text))
  });
};
var decode = (string2, alphabet2, bitsPerChar, name2) => {
  const codes = {};
  for (let i2 = 0; i2 < alphabet2.length; ++i2) {
    codes[alphabet2[i2]] = i2;
  }
  let end = string2.length;
  while (string2[end - 1] === "=") {
    --end;
  }
  const out = new Uint8Array(end * bitsPerChar / 8 | 0);
  let bits = 0;
  let buffer = 0;
  let written = 0;
  for (let i2 = 0; i2 < end; ++i2) {
    const value = codes[string2[i2]];
    if (value === void 0) {
      throw new SyntaxError(`Non-${name2} character`);
    }
    buffer = buffer << bitsPerChar | value;
    bits += bitsPerChar;
    if (bits >= 8) {
      bits -= 8;
      out[written++] = 255 & buffer >> bits;
    }
  }
  if (bits >= bitsPerChar || 255 & buffer << 8 - bits) {
    throw new SyntaxError("Unexpected end of data");
  }
  return out;
};
var encode = (data, alphabet2, bitsPerChar) => {
  const pad = alphabet2[alphabet2.length - 1] === "=";
  const mask = (1 << bitsPerChar) - 1;
  let out = "";
  let bits = 0;
  let buffer = 0;
  for (let i2 = 0; i2 < data.length; ++i2) {
    buffer = buffer << 8 | data[i2];
    bits += 8;
    while (bits > bitsPerChar) {
      bits -= bitsPerChar;
      out += alphabet2[mask & buffer >> bits];
    }
  }
  if (bits) {
    out += alphabet2[mask & buffer << bitsPerChar - bits];
  }
  if (pad) {
    while (out.length * bitsPerChar & 7) {
      out += "=";
    }
  }
  return out;
};
var rfc4648 = ({ name: name2, prefix, bitsPerChar, alphabet: alphabet2 }) => {
  return from({
    prefix,
    name: name2,
    encode(input) {
      return encode(input, alphabet2, bitsPerChar);
    },
    decode(input) {
      return decode(input, alphabet2, bitsPerChar, name2);
    }
  });
};

// node_modules/.pnpm/multiformats@9.9.0/node_modules/multiformats/esm/src/bases/identity.js
var identity = from({
  prefix: "\0",
  name: "identity",
  encode: (buf) => toString(buf),
  decode: (str) => fromString(str)
});

// node_modules/.pnpm/multiformats@9.9.0/node_modules/multiformats/esm/src/bases/base2.js
var base2_exports = {};
__export(base2_exports, {
  base2: () => base2
});
var base2 = rfc4648({
  prefix: "0",
  name: "base2",
  alphabet: "01",
  bitsPerChar: 1
});

// node_modules/.pnpm/multiformats@9.9.0/node_modules/multiformats/esm/src/bases/base8.js
var base8_exports = {};
__export(base8_exports, {
  base8: () => base8
});
var base8 = rfc4648({
  prefix: "7",
  name: "base8",
  alphabet: "01234567",
  bitsPerChar: 3
});

// node_modules/.pnpm/multiformats@9.9.0/node_modules/multiformats/esm/src/bases/base10.js
var base10_exports = {};
__export(base10_exports, {
  base10: () => base10
});
var base10 = baseX({
  prefix: "9",
  name: "base10",
  alphabet: "0123456789"
});

// node_modules/.pnpm/multiformats@9.9.0/node_modules/multiformats/esm/src/bases/base16.js
var base16_exports = {};
__export(base16_exports, {
  base16: () => base16,
  base16upper: () => base16upper
});
var base16 = rfc4648({
  prefix: "f",
  name: "base16",
  alphabet: "0123456789abcdef",
  bitsPerChar: 4
});
var base16upper = rfc4648({
  prefix: "F",
  name: "base16upper",
  alphabet: "0123456789ABCDEF",
  bitsPerChar: 4
});

// node_modules/.pnpm/multiformats@9.9.0/node_modules/multiformats/esm/src/bases/base32.js
var base32_exports = {};
__export(base32_exports, {
  base32: () => base32,
  base32hex: () => base32hex,
  base32hexpad: () => base32hexpad,
  base32hexpadupper: () => base32hexpadupper,
  base32hexupper: () => base32hexupper,
  base32pad: () => base32pad,
  base32padupper: () => base32padupper,
  base32upper: () => base32upper,
  base32z: () => base32z
});
var base32 = rfc4648({
  prefix: "b",
  name: "base32",
  alphabet: "abcdefghijklmnopqrstuvwxyz234567",
  bitsPerChar: 5
});
var base32upper = rfc4648({
  prefix: "B",
  name: "base32upper",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567",
  bitsPerChar: 5
});
var base32pad = rfc4648({
  prefix: "c",
  name: "base32pad",
  alphabet: "abcdefghijklmnopqrstuvwxyz234567=",
  bitsPerChar: 5
});
var base32padupper = rfc4648({
  prefix: "C",
  name: "base32padupper",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567=",
  bitsPerChar: 5
});
var base32hex = rfc4648({
  prefix: "v",
  name: "base32hex",
  alphabet: "0123456789abcdefghijklmnopqrstuv",
  bitsPerChar: 5
});
var base32hexupper = rfc4648({
  prefix: "V",
  name: "base32hexupper",
  alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV",
  bitsPerChar: 5
});
var base32hexpad = rfc4648({
  prefix: "t",
  name: "base32hexpad",
  alphabet: "0123456789abcdefghijklmnopqrstuv=",
  bitsPerChar: 5
});
var base32hexpadupper = rfc4648({
  prefix: "T",
  name: "base32hexpadupper",
  alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV=",
  bitsPerChar: 5
});
var base32z = rfc4648({
  prefix: "h",
  name: "base32z",
  alphabet: "ybndrfg8ejkmcpqxot1uwisza345h769",
  bitsPerChar: 5
});

// node_modules/.pnpm/multiformats@9.9.0/node_modules/multiformats/esm/src/bases/base36.js
var base36_exports = {};
__export(base36_exports, {
  base36: () => base36,
  base36upper: () => base36upper
});
var base36 = baseX({
  prefix: "k",
  name: "base36",
  alphabet: "0123456789abcdefghijklmnopqrstuvwxyz"
});
var base36upper = baseX({
  prefix: "K",
  name: "base36upper",
  alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
});

// node_modules/.pnpm/multiformats@9.9.0/node_modules/multiformats/esm/src/bases/base58.js
var base58_exports = {};
__export(base58_exports, {
  base58btc: () => base58btc,
  base58flickr: () => base58flickr
});
var base58btc = baseX({
  name: "base58btc",
  prefix: "z",
  alphabet: "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
});
var base58flickr = baseX({
  name: "base58flickr",
  prefix: "Z",
  alphabet: "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ"
});

// node_modules/.pnpm/multiformats@9.9.0/node_modules/multiformats/esm/src/bases/base64.js
var base64_exports = {};
__export(base64_exports, {
  base64: () => base64,
  base64pad: () => base64pad,
  base64url: () => base64url,
  base64urlpad: () => base64urlpad
});
var base64 = rfc4648({
  prefix: "m",
  name: "base64",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
  bitsPerChar: 6
});
var base64pad = rfc4648({
  prefix: "M",
  name: "base64pad",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
  bitsPerChar: 6
});
var base64url = rfc4648({
  prefix: "u",
  name: "base64url",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_",
  bitsPerChar: 6
});
var base64urlpad = rfc4648({
  prefix: "U",
  name: "base64urlpad",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=",
  bitsPerChar: 6
});

// node_modules/.pnpm/multiformats@9.9.0/node_modules/multiformats/esm/src/bases/base256emoji.js
var base256emoji_exports = {};
__export(base256emoji_exports, {
  base256emoji: () => base256emoji
});
var alphabet = Array.from("🚀🪐☄🛰🌌🌑🌒🌓🌔🌕🌖🌗🌘🌍🌏🌎🐉☀💻🖥💾💿😂❤😍🤣😊🙏💕😭😘👍😅👏😁🔥🥰💔💖💙😢🤔😆🙄💪😉☺👌🤗💜😔😎😇🌹🤦🎉💞✌✨🤷😱😌🌸🙌😋💗💚😏💛🙂💓🤩😄😀🖤😃💯🙈👇🎶😒🤭❣😜💋👀😪😑💥🙋😞😩😡🤪👊🥳😥🤤👉💃😳✋😚😝😴🌟😬🙃🍀🌷😻😓⭐✅🥺🌈😈🤘💦✔😣🏃💐☹🎊💘😠☝😕🌺🎂🌻😐🖕💝🙊😹🗣💫💀👑🎵🤞😛🔴😤🌼😫⚽🤙☕🏆🤫👈😮🙆🍻🍃🐶💁😲🌿🧡🎁⚡🌞🎈❌✊👋😰🤨😶🤝🚶💰🍓💢🤟🙁🚨💨🤬✈🎀🍺🤓😙💟🌱😖👶🥴▶➡❓💎💸⬇😨🌚🦋😷🕺⚠🙅😟😵👎🤲🤠🤧📌🔵💅🧐🐾🍒😗🤑🌊🤯🐷☎💧😯💆👆🎤🙇🍑❄🌴💣🐸💌📍🥀🤢👅💡💩👐📸👻🤐🤮🎼🥵🚩🍎🍊👼💍📣🥂");
var alphabetBytesToChars = alphabet.reduce((p3, c2, i2) => {
  p3[i2] = c2;
  return p3;
}, []);
var alphabetCharsToBytes = alphabet.reduce((p3, c2, i2) => {
  p3[c2.codePointAt(0)] = i2;
  return p3;
}, []);
function encode2(data) {
  return data.reduce((p3, c2) => {
    p3 += alphabetBytesToChars[c2];
    return p3;
  }, "");
}
function decode2(str) {
  const byts = [];
  for (const char of str) {
    const byt = alphabetCharsToBytes[char.codePointAt(0)];
    if (byt === void 0) {
      throw new Error(`Non-base256emoji character: ${char}`);
    }
    byts.push(byt);
  }
  return new Uint8Array(byts);
}
var base256emoji = from({
  prefix: "🚀",
  name: "base256emoji",
  encode: encode2,
  decode: decode2
});

// node_modules/.pnpm/multiformats@9.9.0/node_modules/multiformats/esm/src/hashes/sha2-browser.js
var sha2_browser_exports = {};
__export(sha2_browser_exports, {
  sha256: () => sha256,
  sha512: () => sha512
});

// node_modules/.pnpm/multiformats@9.9.0/node_modules/multiformats/esm/vendor/varint.js
var encode_1 = encode3;
var MSB = 128;
var REST = 127;
var MSBALL = ~REST;
var INT = Math.pow(2, 31);
function encode3(num, out, offset) {
  out = out || [];
  offset = offset || 0;
  var oldOffset = offset;
  while (num >= INT) {
    out[offset++] = num & 255 | MSB;
    num /= 128;
  }
  while (num & MSBALL) {
    out[offset++] = num & 255 | MSB;
    num >>>= 7;
  }
  out[offset] = num | 0;
  encode3.bytes = offset - oldOffset + 1;
  return out;
}
var decode3 = read;
var MSB$1 = 128;
var REST$1 = 127;
function read(buf, offset) {
  var res = 0, offset = offset || 0, shift = 0, counter = offset, b4, l = buf.length;
  do {
    if (counter >= l) {
      read.bytes = 0;
      throw new RangeError("Could not decode varint");
    }
    b4 = buf[counter++];
    res += shift < 28 ? (b4 & REST$1) << shift : (b4 & REST$1) * Math.pow(2, shift);
    shift += 7;
  } while (b4 >= MSB$1);
  read.bytes = counter - offset;
  return res;
}
var N1 = Math.pow(2, 7);
var N2 = Math.pow(2, 14);
var N3 = Math.pow(2, 21);
var N4 = Math.pow(2, 28);
var N5 = Math.pow(2, 35);
var N6 = Math.pow(2, 42);
var N7 = Math.pow(2, 49);
var N8 = Math.pow(2, 56);
var N9 = Math.pow(2, 63);
var length = function(value) {
  return value < N1 ? 1 : value < N2 ? 2 : value < N3 ? 3 : value < N4 ? 4 : value < N5 ? 5 : value < N6 ? 6 : value < N7 ? 7 : value < N8 ? 8 : value < N9 ? 9 : 10;
};
var varint = {
  encode: encode_1,
  decode: decode3,
  encodingLength: length
};
var _brrp_varint = varint;
var varint_default = _brrp_varint;

// node_modules/.pnpm/multiformats@9.9.0/node_modules/multiformats/esm/src/varint.js
var decode4 = (data, offset = 0) => {
  const code2 = varint_default.decode(data, offset);
  return [
    code2,
    varint_default.decode.bytes
  ];
};
var encodeTo = (int, target, offset = 0) => {
  varint_default.encode(int, target, offset);
  return target;
};
var encodingLength = (int) => {
  return varint_default.encodingLength(int);
};

// node_modules/.pnpm/multiformats@9.9.0/node_modules/multiformats/esm/src/hashes/digest.js
var create = (code2, digest2) => {
  const size = digest2.byteLength;
  const sizeOffset = encodingLength(code2);
  const digestOffset = sizeOffset + encodingLength(size);
  const bytes = new Uint8Array(digestOffset + size);
  encodeTo(code2, bytes, 0);
  encodeTo(size, bytes, sizeOffset);
  bytes.set(digest2, digestOffset);
  return new Digest(code2, size, digest2, bytes);
};
var decode5 = (multihash) => {
  const bytes = coerce(multihash);
  const [code2, sizeOffset] = decode4(bytes);
  const [size, digestOffset] = decode4(bytes.subarray(sizeOffset));
  const digest2 = bytes.subarray(sizeOffset + digestOffset);
  if (digest2.byteLength !== size) {
    throw new Error("Incorrect length");
  }
  return new Digest(code2, size, digest2, bytes);
};
var equals2 = (a2, b4) => {
  if (a2 === b4) {
    return true;
  } else {
    return a2.code === b4.code && a2.size === b4.size && equals(a2.bytes, b4.bytes);
  }
};
var Digest = class {
  constructor(code2, size, digest2, bytes) {
    this.code = code2;
    this.size = size;
    this.digest = digest2;
    this.bytes = bytes;
  }
};

// node_modules/.pnpm/multiformats@9.9.0/node_modules/multiformats/esm/src/hashes/hasher.js
var from2 = ({ name: name2, code: code2, encode: encode5 }) => new Hasher(name2, code2, encode5);
var Hasher = class {
  constructor(name2, code2, encode5) {
    this.name = name2;
    this.code = code2;
    this.encode = encode5;
  }
  digest(input) {
    if (input instanceof Uint8Array) {
      const result = this.encode(input);
      return result instanceof Uint8Array ? create(this.code, result) : result.then((digest2) => create(this.code, digest2));
    } else {
      throw Error("Unknown type, must be binary type");
    }
  }
};

// node_modules/.pnpm/multiformats@9.9.0/node_modules/multiformats/esm/src/hashes/sha2-browser.js
var sha = (name2) => async (data) => new Uint8Array(await crypto.subtle.digest(name2, data));
var sha256 = from2({
  name: "sha2-256",
  code: 18,
  encode: sha("SHA-256")
});
var sha512 = from2({
  name: "sha2-512",
  code: 19,
  encode: sha("SHA-512")
});

// node_modules/.pnpm/multiformats@9.9.0/node_modules/multiformats/esm/src/hashes/identity.js
var identity_exports2 = {};
__export(identity_exports2, {
  identity: () => identity2
});
var code = 0;
var name = "identity";
var encode4 = coerce;
var digest = (input) => create(code, encode4(input));
var identity2 = {
  code,
  name,
  encode: encode4,
  digest
};

// node_modules/.pnpm/multiformats@9.9.0/node_modules/multiformats/esm/src/codecs/json.js
var textEncoder = new TextEncoder();
var textDecoder = new TextDecoder();

// node_modules/.pnpm/multiformats@9.9.0/node_modules/multiformats/esm/src/cid.js
var CID = class {
  constructor(version2, code2, multihash, bytes) {
    this.code = code2;
    this.version = version2;
    this.multihash = multihash;
    this.bytes = bytes;
    this.byteOffset = bytes.byteOffset;
    this.byteLength = bytes.byteLength;
    this.asCID = this;
    this._baseCache = /* @__PURE__ */ new Map();
    Object.defineProperties(this, {
      byteOffset: hidden,
      byteLength: hidden,
      code: readonly,
      version: readonly,
      multihash: readonly,
      bytes: readonly,
      _baseCache: hidden,
      asCID: hidden
    });
  }
  toV0() {
    switch (this.version) {
      case 0: {
        return this;
      }
      default: {
        const { code: code2, multihash } = this;
        if (code2 !== DAG_PB_CODE) {
          throw new Error("Cannot convert a non dag-pb CID to CIDv0");
        }
        if (multihash.code !== SHA_256_CODE) {
          throw new Error("Cannot convert non sha2-256 multihash CID to CIDv0");
        }
        return CID.createV0(multihash);
      }
    }
  }
  toV1() {
    switch (this.version) {
      case 0: {
        const { code: code2, digest: digest2 } = this.multihash;
        const multihash = create(code2, digest2);
        return CID.createV1(this.code, multihash);
      }
      case 1: {
        return this;
      }
      default: {
        throw Error(`Can not convert CID version ${this.version} to version 0. This is a bug please report`);
      }
    }
  }
  equals(other) {
    return other && this.code === other.code && this.version === other.version && equals2(this.multihash, other.multihash);
  }
  toString(base3) {
    const { bytes, version: version2, _baseCache } = this;
    switch (version2) {
      case 0:
        return toStringV0(bytes, _baseCache, base3 || base58btc.encoder);
      default:
        return toStringV1(bytes, _baseCache, base3 || base32.encoder);
    }
  }
  toJSON() {
    return {
      code: this.code,
      version: this.version,
      hash: this.multihash.bytes
    };
  }
  get [Symbol.toStringTag]() {
    return "CID";
  }
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return "CID(" + this.toString() + ")";
  }
  static isCID(value) {
    deprecate(/^0\.0/, IS_CID_DEPRECATION);
    return !!(value && (value[cidSymbol] || value.asCID === value));
  }
  get toBaseEncodedString() {
    throw new Error("Deprecated, use .toString()");
  }
  get codec() {
    throw new Error('"codec" property is deprecated, use integer "code" property instead');
  }
  get buffer() {
    throw new Error("Deprecated .buffer property, use .bytes to get Uint8Array instead");
  }
  get multibaseName() {
    throw new Error('"multibaseName" property is deprecated');
  }
  get prefix() {
    throw new Error('"prefix" property is deprecated');
  }
  static asCID(value) {
    if (value instanceof CID) {
      return value;
    } else if (value != null && value.asCID === value) {
      const { version: version2, code: code2, multihash, bytes } = value;
      return new CID(version2, code2, multihash, bytes || encodeCID(version2, code2, multihash.bytes));
    } else if (value != null && value[cidSymbol] === true) {
      const { version: version2, multihash, code: code2 } = value;
      const digest2 = decode5(multihash);
      return CID.create(version2, code2, digest2);
    } else {
      return null;
    }
  }
  static create(version2, code2, digest2) {
    if (typeof code2 !== "number") {
      throw new Error("String codecs are no longer supported");
    }
    switch (version2) {
      case 0: {
        if (code2 !== DAG_PB_CODE) {
          throw new Error(`Version 0 CID must use dag-pb (code: ${DAG_PB_CODE}) block encoding`);
        } else {
          return new CID(version2, code2, digest2, digest2.bytes);
        }
      }
      case 1: {
        const bytes = encodeCID(version2, code2, digest2.bytes);
        return new CID(version2, code2, digest2, bytes);
      }
      default: {
        throw new Error("Invalid version");
      }
    }
  }
  static createV0(digest2) {
    return CID.create(0, DAG_PB_CODE, digest2);
  }
  static createV1(code2, digest2) {
    return CID.create(1, code2, digest2);
  }
  static decode(bytes) {
    const [cid, remainder] = CID.decodeFirst(bytes);
    if (remainder.length) {
      throw new Error("Incorrect length");
    }
    return cid;
  }
  static decodeFirst(bytes) {
    const specs = CID.inspectBytes(bytes);
    const prefixSize = specs.size - specs.multihashSize;
    const multihashBytes = coerce(bytes.subarray(prefixSize, prefixSize + specs.multihashSize));
    if (multihashBytes.byteLength !== specs.multihashSize) {
      throw new Error("Incorrect length");
    }
    const digestBytes = multihashBytes.subarray(specs.multihashSize - specs.digestSize);
    const digest2 = new Digest(specs.multihashCode, specs.digestSize, digestBytes, multihashBytes);
    const cid = specs.version === 0 ? CID.createV0(digest2) : CID.createV1(specs.codec, digest2);
    return [
      cid,
      bytes.subarray(specs.size)
    ];
  }
  static inspectBytes(initialBytes) {
    let offset = 0;
    const next = () => {
      const [i2, length2] = decode4(initialBytes.subarray(offset));
      offset += length2;
      return i2;
    };
    let version2 = next();
    let codec = DAG_PB_CODE;
    if (version2 === 18) {
      version2 = 0;
      offset = 0;
    } else if (version2 === 1) {
      codec = next();
    }
    if (version2 !== 0 && version2 !== 1) {
      throw new RangeError(`Invalid CID version ${version2}`);
    }
    const prefixSize = offset;
    const multihashCode = next();
    const digestSize = next();
    const size = offset + digestSize;
    const multihashSize = size - prefixSize;
    return {
      version: version2,
      codec,
      multihashCode,
      digestSize,
      multihashSize,
      size
    };
  }
  static parse(source, base3) {
    const [prefix, bytes] = parseCIDtoBytes(source, base3);
    const cid = CID.decode(bytes);
    cid._baseCache.set(prefix, source);
    return cid;
  }
};
var parseCIDtoBytes = (source, base3) => {
  switch (source[0]) {
    case "Q": {
      const decoder = base3 || base58btc;
      return [
        base58btc.prefix,
        decoder.decode(`${base58btc.prefix}${source}`)
      ];
    }
    case base58btc.prefix: {
      const decoder = base3 || base58btc;
      return [
        base58btc.prefix,
        decoder.decode(source)
      ];
    }
    case base32.prefix: {
      const decoder = base3 || base32;
      return [
        base32.prefix,
        decoder.decode(source)
      ];
    }
    default: {
      if (base3 == null) {
        throw Error("To parse non base32 or base58btc encoded CID multibase decoder must be provided");
      }
      return [
        source[0],
        base3.decode(source)
      ];
    }
  }
};
var toStringV0 = (bytes, cache, base3) => {
  const { prefix } = base3;
  if (prefix !== base58btc.prefix) {
    throw Error(`Cannot string encode V0 in ${base3.name} encoding`);
  }
  const cid = cache.get(prefix);
  if (cid == null) {
    const cid2 = base3.encode(bytes).slice(1);
    cache.set(prefix, cid2);
    return cid2;
  } else {
    return cid;
  }
};
var toStringV1 = (bytes, cache, base3) => {
  const { prefix } = base3;
  const cid = cache.get(prefix);
  if (cid == null) {
    const cid2 = base3.encode(bytes);
    cache.set(prefix, cid2);
    return cid2;
  } else {
    return cid;
  }
};
var DAG_PB_CODE = 112;
var SHA_256_CODE = 18;
var encodeCID = (version2, code2, multihash) => {
  const codeOffset = encodingLength(version2);
  const hashOffset = codeOffset + encodingLength(code2);
  const bytes = new Uint8Array(hashOffset + multihash.byteLength);
  encodeTo(version2, bytes, 0);
  encodeTo(code2, bytes, codeOffset);
  bytes.set(multihash, hashOffset);
  return bytes;
};
var cidSymbol = Symbol.for("@ipld/js-cid/CID");
var readonly = {
  writable: false,
  configurable: false,
  enumerable: true
};
var hidden = {
  writable: false,
  enumerable: false,
  configurable: false
};
var version = "0.0.0-dev";
var deprecate = (range, message) => {
  if (range.test(version)) {
    console.warn(message);
  } else {
    throw new Error(message);
  }
};
var IS_CID_DEPRECATION = `CID.isCID(v) is deprecated and will be removed in the next major release.
Following code pattern:

if (CID.isCID(value)) {
  doSomethingWithCID(value)
}

Is replaced with:

const cid = CID.asCID(value)
if (cid) {
  // Make sure to use cid instead of value
  doSomethingWithCID(cid)
}
`;

// node_modules/.pnpm/multiformats@9.9.0/node_modules/multiformats/esm/src/basics.js
var bases = {
  ...identity_exports,
  ...base2_exports,
  ...base8_exports,
  ...base10_exports,
  ...base16_exports,
  ...base32_exports,
  ...base36_exports,
  ...base58_exports,
  ...base64_exports,
  ...base256emoji_exports
};
var hashes = {
  ...sha2_browser_exports,
  ...identity_exports2
};

// node_modules/.pnpm/uint8arrays@3.1.1/node_modules/uint8arrays/esm/src/util/bases.js
function createCodec(name2, prefix, encode5, decode6) {
  return {
    name: name2,
    prefix,
    encoder: {
      name: name2,
      prefix,
      encode: encode5
    },
    decoder: { decode: decode6 }
  };
}
var string = createCodec("utf8", "u", (buf) => {
  const decoder = new TextDecoder("utf8");
  return "u" + decoder.decode(buf);
}, (str) => {
  const encoder = new TextEncoder();
  return encoder.encode(str.substring(1));
});
var ascii = createCodec("ascii", "a", (buf) => {
  let string2 = "a";
  for (let i2 = 0; i2 < buf.length; i2++) {
    string2 += String.fromCharCode(buf[i2]);
  }
  return string2;
}, (str) => {
  str = str.substring(1);
  const buf = allocUnsafe(str.length);
  for (let i2 = 0; i2 < str.length; i2++) {
    buf[i2] = str.charCodeAt(i2);
  }
  return buf;
});
var BASES = {
  utf8: string,
  "utf-8": string,
  hex: bases.base16,
  latin1: ascii,
  ascii,
  binary: ascii,
  ...bases
};
var bases_default = BASES;

// node_modules/.pnpm/uint8arrays@3.1.1/node_modules/uint8arrays/esm/src/to-string.js
function toString2(array, encoding = "utf8") {
  const base3 = bases_default[encoding];
  if (!base3) {
    throw new Error(`Unsupported encoding "${encoding}"`);
  }
  if ((encoding === "utf8" || encoding === "utf-8") && globalThis.Buffer != null && globalThis.Buffer.from != null) {
    return globalThis.Buffer.from(array.buffer, array.byteOffset, array.byteLength).toString("utf8");
  }
  return base3.encoder.encode(array).substring(1);
}

// node_modules/.pnpm/uint8arrays@3.1.1/node_modules/uint8arrays/esm/src/from-string.js
function fromString2(string2, encoding = "utf8") {
  const base3 = bases_default[encoding];
  if (!base3) {
    throw new Error(`Unsupported encoding "${encoding}"`);
  }
  if ((encoding === "utf8" || encoding === "utf-8") && globalThis.Buffer != null && globalThis.Buffer.from != null) {
    return asUint8Array(globalThis.Buffer.from(string2, "utf-8"));
  }
  return base3.decoder.decode(`${base3.prefix}${string2}`);
}

// node_modules/.pnpm/@walletconnect+relay-auth@1.0.4/node_modules/@walletconnect/relay-auth/dist/esm/utils.js
function encodeJSON(val) {
  return toString2(fromString2(safeJsonStringify(val), JSON_ENCODING), JWT_ENCODING);
}
function encodeIss(publicKey) {
  const header = fromString2(MULTICODEC_ED25519_HEADER, MULTICODEC_ED25519_ENCODING);
  const multicodec = MULTICODEC_ED25519_BASE + toString2(concat([header, publicKey]), MULTICODEC_ED25519_ENCODING);
  return [DID_PREFIX, DID_METHOD, multicodec].join(DID_DELIMITER);
}
function encodeSig(bytes) {
  return toString2(bytes, JWT_ENCODING);
}
function encodeData(params) {
  return fromString2([encodeJSON(params.header), encodeJSON(params.payload)].join(JWT_DELIMITER), DATA_ENCODING);
}
function encodeJWT(params) {
  return [
    encodeJSON(params.header),
    encodeJSON(params.payload),
    encodeSig(params.signature)
  ].join(JWT_DELIMITER);
}

// node_modules/.pnpm/@walletconnect+relay-auth@1.0.4/node_modules/@walletconnect/relay-auth/dist/esm/api.js
function generateKeyPair(seed = (0, import_random.randomBytes)(KEY_PAIR_SEED_LENGTH)) {
  return ed25519.generateKeyPairFromSeed(seed);
}
async function signJWT(sub, aud, ttl, keyPair, iat = (0, import_time.fromMiliseconds)(Date.now())) {
  const header = { alg: JWT_IRIDIUM_ALG, typ: JWT_IRIDIUM_TYP };
  const iss = encodeIss(keyPair.publicKey);
  const exp = iat + ttl;
  const payload = { iss, sub, aud, iat, exp };
  const data = encodeData({ header, payload });
  const signature = ed25519.sign(keyPair.secretKey, data);
  return encodeJWT({ header, payload, signature });
}

// node_modules/.pnpm/@walletconnect+utils@2.7.3/node_modules/@walletconnect/utils/dist/index.es.js
var import_chacha20poly1305 = __toESM(require_chacha20poly1305());
var import_hkdf = __toESM(require_hkdf());
var import_random2 = __toESM(require_random());
var import_sha256 = __toESM(require_sha256());
var ue = __toESM(require_x25519());

// node_modules/.pnpm/detect-browser@5.3.0/node_modules/detect-browser/es/index.js
var __spreadArray = function(to, from3, pack) {
  if (pack || arguments.length === 2)
    for (var i2 = 0, l = from3.length, ar2; i2 < l; i2++) {
      if (ar2 || !(i2 in from3)) {
        if (!ar2)
          ar2 = Array.prototype.slice.call(from3, 0, i2);
        ar2[i2] = from3[i2];
      }
    }
  return to.concat(ar2 || Array.prototype.slice.call(from3));
};
var BrowserInfo = (
  /** @class */
  function() {
    function BrowserInfo2(name2, version2, os2) {
      this.name = name2;
      this.version = version2;
      this.os = os2;
      this.type = "browser";
    }
    return BrowserInfo2;
  }()
);
var NodeInfo = (
  /** @class */
  function() {
    function NodeInfo2(version2) {
      this.version = version2;
      this.type = "node";
      this.name = "node";
      this.os = process.platform;
    }
    return NodeInfo2;
  }()
);
var SearchBotDeviceInfo = (
  /** @class */
  function() {
    function SearchBotDeviceInfo2(name2, version2, os2, bot) {
      this.name = name2;
      this.version = version2;
      this.os = os2;
      this.bot = bot;
      this.type = "bot-device";
    }
    return SearchBotDeviceInfo2;
  }()
);
var BotInfo = (
  /** @class */
  function() {
    function BotInfo2() {
      this.type = "bot";
      this.bot = true;
      this.name = "bot";
      this.version = null;
      this.os = null;
    }
    return BotInfo2;
  }()
);
var ReactNativeInfo = (
  /** @class */
  function() {
    function ReactNativeInfo2() {
      this.type = "react-native";
      this.name = "react-native";
      this.version = null;
      this.os = null;
    }
    return ReactNativeInfo2;
  }()
);
var SEARCHBOX_UA_REGEX = /alexa|bot|crawl(er|ing)|facebookexternalhit|feedburner|google web preview|nagios|postrank|pingdom|slurp|spider|yahoo!|yandex/;
var SEARCHBOT_OS_REGEX = /(nuhk|curl|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask\ Jeeves\/Teoma|ia_archiver)/;
var REQUIRED_VERSION_PARTS = 3;
var userAgentRules = [
  ["aol", /AOLShield\/([0-9\._]+)/],
  ["edge", /Edge\/([0-9\._]+)/],
  ["edge-ios", /EdgiOS\/([0-9\._]+)/],
  ["yandexbrowser", /YaBrowser\/([0-9\._]+)/],
  ["kakaotalk", /KAKAOTALK\s([0-9\.]+)/],
  ["samsung", /SamsungBrowser\/([0-9\.]+)/],
  ["silk", /\bSilk\/([0-9._-]+)\b/],
  ["miui", /MiuiBrowser\/([0-9\.]+)$/],
  ["beaker", /BeakerBrowser\/([0-9\.]+)/],
  ["edge-chromium", /EdgA?\/([0-9\.]+)/],
  [
    "chromium-webview",
    /(?!Chrom.*OPR)wv\).*Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/
  ],
  ["chrome", /(?!Chrom.*OPR)Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/],
  ["phantomjs", /PhantomJS\/([0-9\.]+)(:?\s|$)/],
  ["crios", /CriOS\/([0-9\.]+)(:?\s|$)/],
  ["firefox", /Firefox\/([0-9\.]+)(?:\s|$)/],
  ["fxios", /FxiOS\/([0-9\.]+)/],
  ["opera-mini", /Opera Mini.*Version\/([0-9\.]+)/],
  ["opera", /Opera\/([0-9\.]+)(?:\s|$)/],
  ["opera", /OPR\/([0-9\.]+)(:?\s|$)/],
  ["pie", /^Microsoft Pocket Internet Explorer\/(\d+\.\d+)$/],
  ["pie", /^Mozilla\/\d\.\d+\s\(compatible;\s(?:MSP?IE|MSInternet Explorer) (\d+\.\d+);.*Windows CE.*\)$/],
  ["netfront", /^Mozilla\/\d\.\d+.*NetFront\/(\d.\d)/],
  ["ie", /Trident\/7\.0.*rv\:([0-9\.]+).*\).*Gecko$/],
  ["ie", /MSIE\s([0-9\.]+);.*Trident\/[4-7].0/],
  ["ie", /MSIE\s(7\.0)/],
  ["bb10", /BB10;\sTouch.*Version\/([0-9\.]+)/],
  ["android", /Android\s([0-9\.]+)/],
  ["ios", /Version\/([0-9\._]+).*Mobile.*Safari.*/],
  ["safari", /Version\/([0-9\._]+).*Safari/],
  ["facebook", /FB[AS]V\/([0-9\.]+)/],
  ["instagram", /Instagram\s([0-9\.]+)/],
  ["ios-webview", /AppleWebKit\/([0-9\.]+).*Mobile/],
  ["ios-webview", /AppleWebKit\/([0-9\.]+).*Gecko\)$/],
  ["curl", /^curl\/([0-9\.]+)$/],
  ["searchbot", SEARCHBOX_UA_REGEX]
];
var operatingSystemRules = [
  ["iOS", /iP(hone|od|ad)/],
  ["Android OS", /Android/],
  ["BlackBerry OS", /BlackBerry|BB10/],
  ["Windows Mobile", /IEMobile/],
  ["Amazon OS", /Kindle/],
  ["Windows 3.11", /Win16/],
  ["Windows 95", /(Windows 95)|(Win95)|(Windows_95)/],
  ["Windows 98", /(Windows 98)|(Win98)/],
  ["Windows 2000", /(Windows NT 5.0)|(Windows 2000)/],
  ["Windows XP", /(Windows NT 5.1)|(Windows XP)/],
  ["Windows Server 2003", /(Windows NT 5.2)/],
  ["Windows Vista", /(Windows NT 6.0)/],
  ["Windows 7", /(Windows NT 6.1)/],
  ["Windows 8", /(Windows NT 6.2)/],
  ["Windows 8.1", /(Windows NT 6.3)/],
  ["Windows 10", /(Windows NT 10.0)/],
  ["Windows ME", /Windows ME/],
  ["Windows CE", /Windows CE|WinCE|Microsoft Pocket Internet Explorer/],
  ["Open BSD", /OpenBSD/],
  ["Sun OS", /SunOS/],
  ["Chrome OS", /CrOS/],
  ["Linux", /(Linux)|(X11)/],
  ["Mac OS", /(Mac_PowerPC)|(Macintosh)/],
  ["QNX", /QNX/],
  ["BeOS", /BeOS/],
  ["OS/2", /OS\/2/]
];
function detect(userAgent) {
  if (!!userAgent) {
    return parseUserAgent(userAgent);
  }
  if (typeof document === "undefined" && typeof navigator !== "undefined" && navigator.product === "ReactNative") {
    return new ReactNativeInfo();
  }
  if (typeof navigator !== "undefined") {
    return parseUserAgent(navigator.userAgent);
  }
  return getNodeVersion();
}
function matchUserAgent(ua) {
  return ua !== "" && userAgentRules.reduce(function(matched, _a) {
    var browser = _a[0], regex = _a[1];
    if (matched) {
      return matched;
    }
    var uaMatch = regex.exec(ua);
    return !!uaMatch && [browser, uaMatch];
  }, false);
}
function parseUserAgent(ua) {
  var matchedRule = matchUserAgent(ua);
  if (!matchedRule) {
    return null;
  }
  var name2 = matchedRule[0], match = matchedRule[1];
  if (name2 === "searchbot") {
    return new BotInfo();
  }
  var versionParts = match[1] && match[1].split(".").join("_").split("_").slice(0, 3);
  if (versionParts) {
    if (versionParts.length < REQUIRED_VERSION_PARTS) {
      versionParts = __spreadArray(__spreadArray([], versionParts, true), createVersionParts(REQUIRED_VERSION_PARTS - versionParts.length), true);
    }
  } else {
    versionParts = [];
  }
  var version2 = versionParts.join(".");
  var os2 = detectOS(ua);
  var searchBotMatch = SEARCHBOT_OS_REGEX.exec(ua);
  if (searchBotMatch && searchBotMatch[1]) {
    return new SearchBotDeviceInfo(name2, version2, os2, searchBotMatch[1]);
  }
  return new BrowserInfo(name2, version2, os2);
}
function detectOS(ua) {
  for (var ii = 0, count = operatingSystemRules.length; ii < count; ii++) {
    var _a = operatingSystemRules[ii], os2 = _a[0], regex = _a[1];
    var match = regex.exec(ua);
    if (match) {
      return os2;
    }
  }
  return null;
}
function getNodeVersion() {
  var isNode2 = typeof process !== "undefined" && process.version;
  return isNode2 ? new NodeInfo(process.version.slice(1)) : null;
}
function createVersionParts(count) {
  var output = [];
  for (var ii = 0; ii < count; ii++) {
    output.push("0");
  }
  return output;
}

// node_modules/.pnpm/@walletconnect+utils@2.7.3/node_modules/@walletconnect/utils/dist/index.es.js
var import_time2 = __toESM(require_cjs2());
var import_window_getters = __toESM(require_cjs5());
var import_window_metadata = __toESM(require_cjs6());
var $ = __toESM(require_query_string());

// node_modules/.pnpm/@walletconnect+relay-api@1.0.9/node_modules/@walletconnect/relay-api/dist/esm/jsonrpc.js
var RELAY_JSONRPC = {
  waku: {
    publish: "waku_publish",
    batchPublish: "waku_batchPublish",
    subscribe: "waku_subscribe",
    batchSubscribe: "waku_batchSubscribe",
    subscription: "waku_subscription",
    unsubscribe: "waku_unsubscribe",
    batchUnsubscribe: "waku_batchUnsubscribe"
  },
  irn: {
    publish: "irn_publish",
    batchPublish: "irn_batchPublish",
    subscribe: "irn_subscribe",
    batchSubscribe: "irn_batchSubscribe",
    subscription: "irn_subscription",
    unsubscribe: "irn_unsubscribe",
    batchUnsubscribe: "irn_batchUnsubscribe"
  },
  iridium: {
    publish: "iridium_publish",
    batchPublish: "iridium_batchPublish",
    subscribe: "iridium_subscribe",
    batchSubscribe: "iridium_batchSubscribe",
    subscription: "iridium_subscription",
    unsubscribe: "iridium_unsubscribe",
    batchUnsubscribe: "iridium_batchUnsubscribe"
  }
};

// node_modules/.pnpm/@walletconnect+utils@2.7.3/node_modules/@walletconnect/utils/dist/index.es.js
function V(e, n2) {
  return e.includes(":") ? [e] : n2.chains || [];
}
var G = "base10";
var f = "base16";
var K = "base64pad";
var k = "utf8";
var Y = 0;
var U = 1;
var Tn = 0;
var Oe = 1;
var W = 12;
var J = 32;
function Rn() {
  const e = ue.generateKeyPair();
  return { privateKey: toString2(e.secretKey, f), publicKey: toString2(e.publicKey, f) };
}
function An() {
  const e = (0, import_random2.randomBytes)(J);
  return toString2(e, f);
}
function Un(e, n2) {
  const t = ue.sharedKey(fromString2(e, f), fromString2(n2, f)), r = new import_hkdf.HKDF(import_sha256.SHA256, t).expand(J);
  return toString2(r, f);
}
function _n(e) {
  const n2 = (0, import_sha256.hash)(fromString2(e, f));
  return toString2(n2, f);
}
function wn(e) {
  const n2 = (0, import_sha256.hash)(fromString2(e, k));
  return toString2(n2, f);
}
function Se(e) {
  return fromString2(`${e}`, G);
}
function j(e) {
  return Number(toString2(e, G));
}
function jn(e) {
  const n2 = Se(typeof e.type < "u" ? e.type : Y);
  if (j(n2) === U && typeof e.senderPublicKey > "u")
    throw new Error("Missing sender public key for type 1 envelope");
  const t = typeof e.senderPublicKey < "u" ? fromString2(e.senderPublicKey, f) : void 0, r = typeof e.iv < "u" ? fromString2(e.iv, f) : (0, import_random2.randomBytes)(W), o = new import_chacha20poly1305.ChaCha20Poly1305(fromString2(e.symKey, f)).seal(r, fromString2(e.message, k));
  return Ie({ type: n2, sealed: o, iv: r, senderPublicKey: t });
}
function Cn(e) {
  const n2 = new import_chacha20poly1305.ChaCha20Poly1305(fromString2(e.symKey, f)), { sealed: t, iv: r } = Q(e.encoded), o = n2.open(r, t);
  if (o === null)
    throw new Error("Failed to decrypt");
  return toString2(o, k);
}
function Ie(e) {
  if (j(e.type) === U) {
    if (typeof e.senderPublicKey > "u")
      throw new Error("Missing sender public key for type 1 envelope");
    return toString2(concat([e.type, e.senderPublicKey, e.iv, e.sealed]), K);
  }
  return toString2(concat([e.type, e.iv, e.sealed]), K);
}
function Q(e) {
  const n2 = fromString2(e, K), t = n2.slice(Tn, Oe), r = Oe;
  if (j(t) === U) {
    const d2 = r + J, l = d2 + W, i2 = n2.slice(r, d2), u2 = n2.slice(d2, l), a2 = n2.slice(l);
    return { type: t, sealed: a2, iv: u2, senderPublicKey: i2 };
  }
  const o = r + W, s = n2.slice(r, o), c2 = n2.slice(o);
  return { type: t, sealed: c2, iv: s };
}
function $n(e, n2) {
  const t = Q(e);
  return Pe({ type: j(t.type), senderPublicKey: typeof t.senderPublicKey < "u" ? toString2(t.senderPublicKey, f) : void 0, receiverPublicKey: n2 == null ? void 0 : n2.receiverPublicKey });
}
function Pe(e) {
  const n2 = (e == null ? void 0 : e.type) || Y;
  if (n2 === U) {
    if (typeof (e == null ? void 0 : e.senderPublicKey) > "u")
      throw new Error("missing sender public key");
    if (typeof (e == null ? void 0 : e.receiverPublicKey) > "u")
      throw new Error("missing receiver public key");
  }
  return { type: n2, senderPublicKey: e == null ? void 0 : e.senderPublicKey, receiverPublicKey: e == null ? void 0 : e.receiverPublicKey };
}
function Dn(e) {
  return e.type === U && typeof e.senderPublicKey == "string" && typeof e.receiverPublicKey == "string";
}
var Vn = Object.defineProperty;
var Te = Object.getOwnPropertySymbols;
var Mn = Object.prototype.hasOwnProperty;
var Kn = Object.prototype.propertyIsEnumerable;
var Re = (e, n2, t) => n2 in e ? Vn(e, n2, { enumerable: true, configurable: true, writable: true, value: t }) : e[n2] = t;
var Ae = (e, n2) => {
  for (var t in n2 || (n2 = {}))
    Mn.call(n2, t) && Re(e, t, n2[t]);
  if (Te)
    for (var t of Te(n2))
      Kn.call(n2, t) && Re(e, t, n2[t]);
  return e;
};
var Ue = "ReactNative";
var _ = { reactNative: "react-native", node: "node", browser: "browser", unknown: "unknown" };
var we = "js";
function X() {
  return typeof process < "u" && typeof process.versions < "u" && typeof process.versions.node < "u";
}
function je() {
  return !(0, import_window_getters.getDocument)() && !!(0, import_window_getters.getNavigator)() && navigator.product === Ue;
}
function Ce() {
  return !X() && !!(0, import_window_getters.getNavigator)();
}
function ee() {
  return je() ? _.reactNative : X() ? _.node : Ce() ? _.browser : _.unknown;
}
function $e(e, n2) {
  let t = $.parse(e);
  return t = Ae(Ae({}, t), n2), e = $.stringify(t), e;
}
function xn() {
  return (0, import_window_metadata.getWindowMetadata)() || { name: "", description: "", url: "", icons: [""] };
}
function De() {
  const e = detect();
  if (e === null)
    return "unknown";
  const n2 = e.os ? e.os.replace(" ", "").toLowerCase() : "unknown";
  return e.type === "browser" ? [n2, e.name, e.version].join("-") : [n2, e.version].join("-");
}
function Ve() {
  var e;
  const n2 = ee();
  return n2 === _.browser ? [n2, ((e = (0, import_window_getters.getLocation)()) == null ? void 0 : e.host) || "unknown"].join(":") : n2;
}
function Me(e, n2, t) {
  const r = De(), o = Ve();
  return [[e, n2].join("-"), [we, t].join("-"), r, o].join("/");
}
function Hn({ protocol: e, version: n2, relayUrl: t, sdkVersion: r, auth: o, projectId: s, useOnCloseEvent: c2 }) {
  const d2 = t.split("?"), l = Me(e, n2, r), i2 = { auth: o, ua: l, projectId: s, useOnCloseEvent: c2 || void 0 }, u2 = $e(d2[1] || "", i2);
  return d2[0] + "?" + u2;
}
function b2(e, n2) {
  return e.filter((t) => n2.includes(t)).length === e.length;
}
function Gn(e) {
  return Object.fromEntries(e.entries());
}
function Yn(e) {
  return new Map(Object.entries(e));
}
function Zn(e = import_time2.FIVE_MINUTES, n2) {
  const t = (0, import_time2.toMiliseconds)(e || import_time2.FIVE_MINUTES);
  let r, o, s;
  return { resolve: (c2) => {
    s && r && (clearTimeout(s), r(c2));
  }, reject: (c2) => {
    s && o && (clearTimeout(s), o(c2));
  }, done: () => new Promise((c2, d2) => {
    s = setTimeout(() => {
      d2(new Error(n2));
    }, t), r = c2, o = d2;
  }) };
}
function Xn(e, n2, t) {
  return new Promise(async (r, o) => {
    const s = setTimeout(() => o(new Error(t)), n2);
    try {
      const c2 = await e;
      r(c2);
    } catch (c2) {
      o(c2);
    }
    clearTimeout(s);
  });
}
function ne(e, n2) {
  if (typeof n2 == "string" && n2.startsWith(`${e}:`))
    return n2;
  if (e.toLowerCase() === "topic") {
    if (typeof n2 != "string")
      throw new Error('Value must be "string" for expirer target type: topic');
    return `topic:${n2}`;
  } else if (e.toLowerCase() === "id") {
    if (typeof n2 != "number")
      throw new Error('Value must be "number" for expirer target type: id');
    return `id:${n2}`;
  }
  throw new Error(`Unknown expirer target type: ${e}`);
}
function et(e) {
  return ne("topic", e);
}
function nt(e) {
  return ne("id", e);
}
function tt(e) {
  const [n2, t] = e.split(":"), r = { id: void 0, topic: void 0 };
  if (n2 === "topic" && typeof t == "string")
    r.topic = t;
  else if (n2 === "id" && Number.isInteger(Number(t)))
    r.id = Number(t);
  else
    throw new Error(`Invalid target, expected id:number or topic:string, got ${n2}:${t}`);
  return r;
}
function rt(e, n2) {
  return (0, import_time2.fromMiliseconds)((n2 || Date.now()) + (0, import_time2.toMiliseconds)(e));
}
function ot(e) {
  return Date.now() >= (0, import_time2.toMiliseconds)(e);
}
function st(e, n2) {
  return `${e}${n2 ? `:${n2}` : ""}`;
}
var xe = "irn";
function it(e) {
  return (e == null ? void 0 : e.relay) || { protocol: xe };
}
function ct(e) {
  const n2 = RELAY_JSONRPC[e];
  if (typeof n2 > "u")
    throw new Error(`Relay Protocol not supported: ${e}`);
  return n2;
}
var at = Object.defineProperty;
var Fe = Object.getOwnPropertySymbols;
var ut = Object.prototype.hasOwnProperty;
var dt = Object.prototype.propertyIsEnumerable;
var He = (e, n2, t) => n2 in e ? at(e, n2, { enumerable: true, configurable: true, writable: true, value: t }) : e[n2] = t;
var lt = (e, n2) => {
  for (var t in n2 || (n2 = {}))
    ut.call(n2, t) && He(e, t, n2[t]);
  if (Fe)
    for (var t of Fe(n2))
      dt.call(n2, t) && He(e, t, n2[t]);
  return e;
};
function qe(e, n2 = "-") {
  const t = {}, r = "relay" + n2;
  return Object.keys(e).forEach((o) => {
    if (o.startsWith(r)) {
      const s = o.replace(r, ""), c2 = e[o];
      t[s] = c2;
    }
  }), t;
}
function ft(e) {
  const n2 = e.indexOf(":"), t = e.indexOf("?") !== -1 ? e.indexOf("?") : void 0, r = e.substring(0, n2), o = e.substring(n2 + 1, t).split("@"), s = typeof t < "u" ? e.substring(t) : "", c2 = $.parse(s);
  return { protocol: r, topic: o[0], version: parseInt(o[1], 10), symKey: c2.symKey, relay: qe(c2) };
}
function ze(e, n2 = "-") {
  const t = "relay", r = {};
  return Object.keys(e).forEach((o) => {
    const s = t + n2 + o;
    e[o] && (r[s] = e[o]);
  }), r;
}
function pt(e) {
  return `${e.protocol}:${e.topic}@${e.version}?` + $.stringify(lt({ symKey: e.symKey }, ze(e.relay)));
}
function T(e) {
  const n2 = [];
  return e.forEach((t) => {
    const [r, o] = t.split(":");
    n2.push(`${r}:${o}`);
  }), n2;
}
function Ye(e) {
  const n2 = [];
  return Object.values(e).forEach((t) => {
    n2.push(...T(t.accounts));
  }), n2;
}
function We(e, n2) {
  const t = [];
  return Object.values(e).forEach((r) => {
    T(r.accounts).includes(n2) && t.push(...r.methods);
  }), t;
}
function Je(e, n2) {
  const t = [];
  return Object.values(e).forEach((r) => {
    T(r.accounts).includes(n2) && t.push(...r.events);
  }), t;
}
function bt(e, n2) {
  const t = on(e, n2);
  if (t)
    throw new Error(t.message);
  const r = {};
  for (const [o, s] of Object.entries(e))
    r[o] = { methods: s.methods, events: s.events, chains: s.accounts.map((c2) => `${c2.split(":")[0]}:${c2.split(":")[1]}`) };
  return r;
}
var St = { INVALID_METHOD: { message: "Invalid method.", code: 1001 }, INVALID_EVENT: { message: "Invalid event.", code: 1002 }, INVALID_UPDATE_REQUEST: { message: "Invalid update request.", code: 1003 }, INVALID_EXTEND_REQUEST: { message: "Invalid extend request.", code: 1004 }, INVALID_SESSION_SETTLE_REQUEST: { message: "Invalid session settle request.", code: 1005 }, UNAUTHORIZED_METHOD: { message: "Unauthorized method.", code: 3001 }, UNAUTHORIZED_EVENT: { message: "Unauthorized event.", code: 3002 }, UNAUTHORIZED_UPDATE_REQUEST: { message: "Unauthorized update request.", code: 3003 }, UNAUTHORIZED_EXTEND_REQUEST: { message: "Unauthorized extend request.", code: 3004 }, USER_REJECTED: { message: "User rejected.", code: 5e3 }, USER_REJECTED_CHAINS: { message: "User rejected chains.", code: 5001 }, USER_REJECTED_METHODS: { message: "User rejected methods.", code: 5002 }, USER_REJECTED_EVENTS: { message: "User rejected events.", code: 5003 }, UNSUPPORTED_CHAINS: { message: "Unsupported chains.", code: 5100 }, UNSUPPORTED_METHODS: { message: "Unsupported methods.", code: 5101 }, UNSUPPORTED_EVENTS: { message: "Unsupported events.", code: 5102 }, UNSUPPORTED_ACCOUNTS: { message: "Unsupported accounts.", code: 5103 }, UNSUPPORTED_NAMESPACE_KEY: { message: "Unsupported namespace key.", code: 5104 }, USER_DISCONNECTED: { message: "User disconnected.", code: 6e3 }, SESSION_SETTLEMENT_FAILED: { message: "Session settlement failed.", code: 7e3 }, WC_METHOD_UNSUPPORTED: { message: "Unsupported wc_ method.", code: 10001 } };
var It = { NOT_INITIALIZED: { message: "Not initialized.", code: 1 }, NO_MATCHING_KEY: { message: "No matching key.", code: 2 }, RESTORE_WILL_OVERRIDE: { message: "Restore will override.", code: 3 }, RESUBSCRIBED: { message: "Resubscribed.", code: 4 }, MISSING_OR_INVALID: { message: "Missing or invalid.", code: 5 }, EXPIRED: { message: "Expired.", code: 6 }, UNKNOWN_TYPE: { message: "Unknown type.", code: 7 }, MISMATCHED_TOPIC: { message: "Mismatched topic.", code: 8 }, NON_CONFORMING_NAMESPACES: { message: "Non conforming namespaces.", code: 9 } };
function N(e, n2) {
  const { message: t, code: r } = It[e];
  return { message: n2 ? `${t} ${n2}` : t, code: r };
}
function R(e, n2) {
  const { message: t, code: r } = St[e];
  return { message: n2 ? `${t} ${n2}` : t, code: r };
}
function C(e, n2) {
  return Array.isArray(e) ? typeof n2 < "u" && e.length ? e.every(n2) : true : false;
}
function x(e) {
  return Object.getPrototypeOf(e) === Object.prototype && Object.keys(e).length;
}
function S2(e) {
  return typeof e > "u";
}
function m(e, n2) {
  return n2 && S2(e) ? true : typeof e == "string" && Boolean(e.trim().length);
}
function F(e, n2) {
  return n2 && S2(e) ? true : typeof e == "number" && !isNaN(e);
}
function Pt(e, n2) {
  const { requiredNamespaces: t } = n2, r = Object.keys(e.namespaces), o = Object.keys(t);
  let s = true;
  return b2(o, r) ? (r.forEach((c2) => {
    const { accounts: d2, methods: l, events: i2 } = e.namespaces[c2], u2 = T(d2), a2 = t[c2];
    (!b2(V(c2, a2), u2) || !b2(a2.methods, l) || !b2(a2.events, i2)) && (s = false);
  }), s) : false;
}
function H(e) {
  return m(e, false) && e.includes(":") ? e.split(":").length === 2 : false;
}
function Ze(e) {
  if (m(e, false) && e.includes(":")) {
    const n2 = e.split(":");
    if (n2.length === 3) {
      const t = n2[0] + ":" + n2[1];
      return !!n2[2] && H(t);
    }
  }
  return false;
}
function Tt(e) {
  if (m(e, false))
    try {
      return typeof new URL(e) < "u";
    } catch {
      return false;
    }
  return false;
}
function Rt(e) {
  var n2;
  return (n2 = e == null ? void 0 : e.proposer) == null ? void 0 : n2.publicKey;
}
function At(e) {
  return e == null ? void 0 : e.topic;
}
function Ut(e, n2) {
  let t = null;
  return m(e == null ? void 0 : e.publicKey, false) || (t = N("MISSING_OR_INVALID", `${n2} controller public key should be a string`)), t;
}
function oe(e) {
  let n2 = true;
  return C(e) ? e.length && (n2 = e.every((t) => m(t, false))) : n2 = false, n2;
}
function Xe(e, n2, t) {
  let r = null;
  return C(n2) ? n2.forEach((o) => {
    r || (!H(o) || !o.includes(e)) && (r = R("UNSUPPORTED_CHAINS", `${t}, chain ${o} should be a string and conform to "namespace:chainId" format`));
  }) : r = R("UNSUPPORTED_CHAINS", `${t}, chains ${n2} should be an array of strings conforming to "namespace:chainId" format`), r;
}
function en(e, n2) {
  let t = null;
  return Object.entries(e).forEach(([r, o]) => {
    if (t)
      return;
    const s = Xe(r, V(r, o), `${n2} requiredNamespace`);
    s && (t = s);
  }), t;
}
function nn(e, n2) {
  let t = null;
  return C(e) ? e.forEach((r) => {
    t || Ze(r) || (t = R("UNSUPPORTED_ACCOUNTS", `${n2}, account ${r} should be a string and conform to "namespace:chainId:address" format`));
  }) : t = R("UNSUPPORTED_ACCOUNTS", `${n2}, accounts should be an array of strings conforming to "namespace:chainId:address" format`), t;
}
function tn(e, n2) {
  let t = null;
  return Object.values(e).forEach((r) => {
    if (t)
      return;
    const o = nn(r == null ? void 0 : r.accounts, `${n2} namespace`);
    o && (t = o);
  }), t;
}
function rn(e, n2) {
  let t = null;
  return oe(e == null ? void 0 : e.methods) ? oe(e == null ? void 0 : e.events) || (t = R("UNSUPPORTED_EVENTS", `${n2}, events should be an array of strings or empty array for no events`)) : t = R("UNSUPPORTED_METHODS", `${n2}, methods should be an array of strings or empty array for no methods`), t;
}
function se(e, n2) {
  let t = null;
  return Object.values(e).forEach((r) => {
    if (t)
      return;
    const o = rn(r, `${n2}, namespace`);
    o && (t = o);
  }), t;
}
function _t(e, n2, t) {
  let r = null;
  if (e && x(e)) {
    const o = se(e, n2);
    o && (r = o);
    const s = en(e, n2);
    s && (r = s);
  } else
    r = N("MISSING_OR_INVALID", `${n2}, ${t} should be an object with data`);
  return r;
}
function on(e, n2) {
  let t = null;
  if (e && x(e)) {
    const r = se(e, n2);
    r && (t = r);
    const o = tn(e, n2);
    o && (t = o);
  } else
    t = N("MISSING_OR_INVALID", `${n2}, namespaces should be an object with data`);
  return t;
}
function sn(e) {
  return m(e.protocol, true);
}
function wt(e, n2) {
  let t = false;
  return n2 && !e ? t = true : e && C(e) && e.length && e.forEach((r) => {
    t = sn(r);
  }), t;
}
function jt(e) {
  return typeof e == "number";
}
function Ct(e) {
  return typeof e < "u" && typeof e !== null;
}
function $t(e) {
  return !(!e || typeof e != "object" || !e.code || !F(e.code, false) || !e.message || !m(e.message, false));
}
function Dt(e) {
  return !(S2(e) || !m(e.method, false));
}
function Vt(e) {
  return !(S2(e) || S2(e.result) && S2(e.error) || !F(e.id, false) || !m(e.jsonrpc, false));
}
function Mt(e) {
  return !(S2(e) || !m(e.name, false));
}
function Kt(e, n2) {
  return !(!H(n2) || !Ye(e).includes(n2));
}
function kt(e, n2, t) {
  return m(t, false) ? We(e, n2).includes(t) : false;
}
function Lt(e, n2, t) {
  return m(t, false) ? Je(e, n2).includes(t) : false;
}
function cn(e, n2, t) {
  let r = null;
  const o = xt(e), s = Ft(n2), c2 = Object.keys(o), d2 = Object.keys(s), l = an(Object.keys(e)), i2 = an(Object.keys(n2)), u2 = l.filter((a2) => !i2.includes(a2));
  return u2.length && (r = N("NON_CONFORMING_NAMESPACES", `${t} namespaces keys don't satisfy requiredNamespaces.
      Required: ${u2.toString()}
      Received: ${Object.keys(n2).toString()}`)), b2(c2, d2) || (r = N("NON_CONFORMING_NAMESPACES", `${t} namespaces chains don't satisfy required namespaces.
      Required: ${c2.toString()}
      Approved: ${d2.toString()}`)), Object.keys(n2).forEach((a2) => {
    if (!a2.includes(":") || r)
      return;
    const g2 = T(n2[a2].accounts);
    g2.includes(a2) || (r = N("NON_CONFORMING_NAMESPACES", `${t} namespaces accounts don't satisfy namespace accounts for ${a2}
        Required: ${a2}
        Approved: ${g2.toString()}`));
  }), c2.forEach((a2) => {
    r || (b2(o[a2].methods, s[a2].methods) ? b2(o[a2].events, s[a2].events) || (r = N("NON_CONFORMING_NAMESPACES", `${t} namespaces events don't satisfy namespace events for ${a2}`)) : r = N("NON_CONFORMING_NAMESPACES", `${t} namespaces methods don't satisfy namespace methods for ${a2}`));
  }), r;
}
function xt(e) {
  const n2 = {};
  return Object.keys(e).forEach((t) => {
    var r;
    t.includes(":") ? n2[t] = e[t] : (r = e[t].chains) == null || r.forEach((o) => {
      n2[o] = { methods: e[t].methods, events: e[t].events };
    });
  }), n2;
}
function an(e) {
  return [...new Set(e.map((n2) => n2.includes(":") ? n2.split(":")[0] : n2))];
}
function Ft(e) {
  const n2 = {};
  return Object.keys(e).forEach((t) => {
    if (t.includes(":"))
      n2[t] = e[t];
    else {
      const r = T(e[t].accounts);
      r == null ? void 0 : r.forEach((o) => {
        n2[o] = { accounts: e[t].accounts.filter((s) => s.includes(`${o}:`)), methods: e[t].methods, events: e[t].events };
      });
    }
  }), n2;
}
function Ht(e, n2) {
  return F(e, false) && e <= n2.max && e >= n2.min;
}

// node_modules/.pnpm/@walletconnect+core@2.7.3/node_modules/@walletconnect/core/dist/index.es.js
var import_time3 = __toESM(require_cjs2());

// node_modules/.pnpm/@walletconnect+jsonrpc-provider@1.0.12/node_modules/@walletconnect/jsonrpc-provider/dist/esm/provider.js
var import_events3 = __toESM(require_events());

// node_modules/.pnpm/@walletconnect+jsonrpc-utils@1.0.7/node_modules/@walletconnect/jsonrpc-utils/dist/esm/index.js
var esm_exports2 = {};
__export(esm_exports2, {
  DEFAULT_ERROR: () => DEFAULT_ERROR,
  IBaseJsonRpcProvider: () => IBaseJsonRpcProvider,
  IEvents: () => IEvents2,
  IJsonRpcConnection: () => IJsonRpcConnection,
  IJsonRpcProvider: () => IJsonRpcProvider,
  INTERNAL_ERROR: () => INTERNAL_ERROR,
  INVALID_PARAMS: () => INVALID_PARAMS,
  INVALID_REQUEST: () => INVALID_REQUEST,
  METHOD_NOT_FOUND: () => METHOD_NOT_FOUND,
  PARSE_ERROR: () => PARSE_ERROR,
  RESERVED_ERROR_CODES: () => RESERVED_ERROR_CODES,
  SERVER_ERROR: () => SERVER_ERROR,
  SERVER_ERROR_CODE_RANGE: () => SERVER_ERROR_CODE_RANGE,
  STANDARD_ERROR_MAP: () => STANDARD_ERROR_MAP,
  formatErrorMessage: () => formatErrorMessage,
  formatJsonRpcError: () => formatJsonRpcError,
  formatJsonRpcRequest: () => formatJsonRpcRequest,
  formatJsonRpcResult: () => formatJsonRpcResult,
  getBigIntRpcId: () => getBigIntRpcId,
  getError: () => getError,
  getErrorByCode: () => getErrorByCode,
  isHttpUrl: () => isHttpUrl,
  isJsonRpcError: () => isJsonRpcError,
  isJsonRpcPayload: () => isJsonRpcPayload,
  isJsonRpcRequest: () => isJsonRpcRequest,
  isJsonRpcResponse: () => isJsonRpcResponse,
  isJsonRpcResult: () => isJsonRpcResult,
  isJsonRpcValidationInvalid: () => isJsonRpcValidationInvalid,
  isLocalhostUrl: () => isLocalhostUrl,
  isNodeJs: () => isNodeJs,
  isReservedErrorCode: () => isReservedErrorCode,
  isServerErrorCode: () => isServerErrorCode,
  isValidDefaultRoute: () => isValidDefaultRoute,
  isValidErrorCode: () => isValidErrorCode,
  isValidLeadingWildcardRoute: () => isValidLeadingWildcardRoute,
  isValidRoute: () => isValidRoute,
  isValidTrailingWildcardRoute: () => isValidTrailingWildcardRoute,
  isValidWildcardRoute: () => isValidWildcardRoute,
  isWsUrl: () => isWsUrl,
  parseConnectionError: () => parseConnectionError,
  payloadId: () => payloadId,
  validateJsonRpcError: () => validateJsonRpcError
});

// node_modules/.pnpm/@walletconnect+jsonrpc-utils@1.0.7/node_modules/@walletconnect/jsonrpc-utils/dist/esm/constants.js
var PARSE_ERROR = "PARSE_ERROR";
var INVALID_REQUEST = "INVALID_REQUEST";
var METHOD_NOT_FOUND = "METHOD_NOT_FOUND";
var INVALID_PARAMS = "INVALID_PARAMS";
var INTERNAL_ERROR = "INTERNAL_ERROR";
var SERVER_ERROR = "SERVER_ERROR";
var RESERVED_ERROR_CODES = [-32700, -32600, -32601, -32602, -32603];
var SERVER_ERROR_CODE_RANGE = [-32e3, -32099];
var STANDARD_ERROR_MAP = {
  [PARSE_ERROR]: { code: -32700, message: "Parse error" },
  [INVALID_REQUEST]: { code: -32600, message: "Invalid Request" },
  [METHOD_NOT_FOUND]: { code: -32601, message: "Method not found" },
  [INVALID_PARAMS]: { code: -32602, message: "Invalid params" },
  [INTERNAL_ERROR]: { code: -32603, message: "Internal error" },
  [SERVER_ERROR]: { code: -32e3, message: "Server error" }
};
var DEFAULT_ERROR = SERVER_ERROR;

// node_modules/.pnpm/@walletconnect+jsonrpc-utils@1.0.7/node_modules/@walletconnect/jsonrpc-utils/dist/esm/error.js
function isServerErrorCode(code2) {
  return code2 <= SERVER_ERROR_CODE_RANGE[0] && code2 >= SERVER_ERROR_CODE_RANGE[1];
}
function isReservedErrorCode(code2) {
  return RESERVED_ERROR_CODES.includes(code2);
}
function isValidErrorCode(code2) {
  return typeof code2 === "number";
}
function getError(type) {
  if (!Object.keys(STANDARD_ERROR_MAP).includes(type)) {
    return STANDARD_ERROR_MAP[DEFAULT_ERROR];
  }
  return STANDARD_ERROR_MAP[type];
}
function getErrorByCode(code2) {
  const match = Object.values(STANDARD_ERROR_MAP).find((e) => e.code === code2);
  if (!match) {
    return STANDARD_ERROR_MAP[DEFAULT_ERROR];
  }
  return match;
}
function validateJsonRpcError(response) {
  if (typeof response.error.code === "undefined") {
    return { valid: false, error: "Missing code for JSON-RPC error" };
  }
  if (typeof response.error.message === "undefined") {
    return { valid: false, error: "Missing message for JSON-RPC error" };
  }
  if (!isValidErrorCode(response.error.code)) {
    return {
      valid: false,
      error: `Invalid error code type for JSON-RPC: ${response.error.code}`
    };
  }
  if (isReservedErrorCode(response.error.code)) {
    const error = getErrorByCode(response.error.code);
    if (error.message !== STANDARD_ERROR_MAP[DEFAULT_ERROR].message && response.error.message === error.message) {
      return {
        valid: false,
        error: `Invalid error code message for JSON-RPC: ${response.error.code}`
      };
    }
  }
  return { valid: true };
}
function parseConnectionError(e, url, type) {
  return e.message.includes("getaddrinfo ENOTFOUND") || e.message.includes("connect ECONNREFUSED") ? new Error(`Unavailable ${type} RPC url at ${url}`) : e;
}

// node_modules/.pnpm/@walletconnect+jsonrpc-utils@1.0.7/node_modules/@walletconnect/jsonrpc-utils/dist/esm/env.js
var env_exports = {};
__export(env_exports, {
  isNodeJs: () => isNodeJs
});
var import_environment = __toESM(require_cjs7());
__reExport(env_exports, __toESM(require_cjs7()));
var isNodeJs = import_environment.isNode;

// node_modules/.pnpm/@walletconnect+jsonrpc-utils@1.0.7/node_modules/@walletconnect/jsonrpc-utils/dist/esm/index.js
__reExport(esm_exports2, env_exports);

// node_modules/.pnpm/@walletconnect+jsonrpc-utils@1.0.7/node_modules/@walletconnect/jsonrpc-utils/dist/esm/format.js
function payloadId(entropy = 3) {
  const date = Date.now() * Math.pow(10, entropy);
  const extra = Math.floor(Math.random() * Math.pow(10, entropy));
  return date + extra;
}
function getBigIntRpcId(entropy = 6) {
  return BigInt(payloadId(entropy));
}
function formatJsonRpcRequest(method, params, id) {
  return {
    id: id || payloadId(),
    jsonrpc: "2.0",
    method,
    params
  };
}
function formatJsonRpcResult(id, result) {
  return {
    id,
    jsonrpc: "2.0",
    result
  };
}
function formatJsonRpcError(id, error, data) {
  return {
    id,
    jsonrpc: "2.0",
    error: formatErrorMessage(error, data)
  };
}
function formatErrorMessage(error, data) {
  if (typeof error === "undefined") {
    return getError(INTERNAL_ERROR);
  }
  if (typeof error === "string") {
    error = Object.assign(Object.assign({}, getError(SERVER_ERROR)), { message: error });
  }
  if (typeof data !== "undefined") {
    error.data = data;
  }
  if (isReservedErrorCode(error.code)) {
    error = getErrorByCode(error.code);
  }
  return error;
}

// node_modules/.pnpm/@walletconnect+jsonrpc-utils@1.0.7/node_modules/@walletconnect/jsonrpc-utils/dist/esm/routing.js
function isValidRoute(route) {
  if (route.includes("*")) {
    return isValidWildcardRoute(route);
  }
  if (/\W/g.test(route)) {
    return false;
  }
  return true;
}
function isValidDefaultRoute(route) {
  return route === "*";
}
function isValidWildcardRoute(route) {
  if (isValidDefaultRoute(route)) {
    return true;
  }
  if (!route.includes("*")) {
    return false;
  }
  if (route.split("*").length !== 2) {
    return false;
  }
  if (route.split("*").filter((x2) => x2.trim() === "").length !== 1) {
    return false;
  }
  return true;
}
function isValidLeadingWildcardRoute(route) {
  return !isValidDefaultRoute(route) && isValidWildcardRoute(route) && !route.split("*")[0].trim();
}
function isValidTrailingWildcardRoute(route) {
  return !isValidDefaultRoute(route) && isValidWildcardRoute(route) && !route.split("*")[1].trim();
}

// node_modules/.pnpm/@walletconnect+jsonrpc-types@1.0.2/node_modules/@walletconnect/jsonrpc-types/dist/esm/misc.js
var IEvents2 = class {
};

// node_modules/.pnpm/@walletconnect+jsonrpc-types@1.0.2/node_modules/@walletconnect/jsonrpc-types/dist/esm/provider.js
var IJsonRpcConnection = class extends IEvents2 {
  constructor(opts) {
    super();
  }
};
var IBaseJsonRpcProvider = class extends IEvents2 {
  constructor() {
    super();
  }
};
var IJsonRpcProvider = class extends IBaseJsonRpcProvider {
  constructor(connection) {
    super();
  }
};

// node_modules/.pnpm/@walletconnect+jsonrpc-utils@1.0.7/node_modules/@walletconnect/jsonrpc-utils/dist/esm/url.js
var HTTP_REGEX = "^https?:";
var WS_REGEX = "^wss?:";
function getUrlProtocol(url) {
  const matches = url.match(new RegExp(/^\w+:/, "gi"));
  if (!matches || !matches.length)
    return;
  return matches[0];
}
function matchRegexProtocol(url, regex) {
  const protocol = getUrlProtocol(url);
  if (typeof protocol === "undefined")
    return false;
  return new RegExp(regex).test(protocol);
}
function isHttpUrl(url) {
  return matchRegexProtocol(url, HTTP_REGEX);
}
function isWsUrl(url) {
  return matchRegexProtocol(url, WS_REGEX);
}
function isLocalhostUrl(url) {
  return new RegExp("wss?://localhost(:d{2,5})?").test(url);
}

// node_modules/.pnpm/@walletconnect+jsonrpc-utils@1.0.7/node_modules/@walletconnect/jsonrpc-utils/dist/esm/validators.js
function isJsonRpcPayload(payload) {
  return typeof payload === "object" && "id" in payload && "jsonrpc" in payload && payload.jsonrpc === "2.0";
}
function isJsonRpcRequest(payload) {
  return isJsonRpcPayload(payload) && "method" in payload;
}
function isJsonRpcResponse(payload) {
  return isJsonRpcPayload(payload) && (isJsonRpcResult(payload) || isJsonRpcError(payload));
}
function isJsonRpcResult(payload) {
  return "result" in payload;
}
function isJsonRpcError(payload) {
  return "error" in payload;
}
function isJsonRpcValidationInvalid(validation) {
  return "error" in validation && validation.valid === false;
}

// node_modules/.pnpm/@walletconnect+jsonrpc-provider@1.0.12/node_modules/@walletconnect/jsonrpc-provider/dist/esm/provider.js
var JsonRpcProvider = class extends IJsonRpcProvider {
  constructor(connection) {
    super(connection);
    this.events = new import_events3.EventEmitter();
    this.hasRegisteredEventListeners = false;
    this.connection = this.setConnection(connection);
    if (this.connection.connected) {
      this.registerEventListeners();
    }
  }
  async connect(connection = this.connection) {
    await this.open(connection);
  }
  async disconnect() {
    await this.close();
  }
  on(event, listener) {
    this.events.on(event, listener);
  }
  once(event, listener) {
    this.events.once(event, listener);
  }
  off(event, listener) {
    this.events.off(event, listener);
  }
  removeListener(event, listener) {
    this.events.removeListener(event, listener);
  }
  async request(request, context) {
    return this.requestStrict(formatJsonRpcRequest(request.method, request.params || [], getBigIntRpcId().toString()), context);
  }
  async requestStrict(request, context) {
    return new Promise(async (resolve, reject) => {
      if (!this.connection.connected) {
        try {
          await this.open();
        } catch (e) {
          reject(e);
        }
      }
      this.events.on(`${request.id}`, (response) => {
        if (isJsonRpcError(response)) {
          reject(response.error);
        } else {
          resolve(response.result);
        }
      });
      try {
        await this.connection.send(request, context);
      } catch (e) {
        reject(e);
      }
    });
  }
  setConnection(connection = this.connection) {
    return connection;
  }
  onPayload(payload) {
    this.events.emit("payload", payload);
    if (isJsonRpcResponse(payload)) {
      this.events.emit(`${payload.id}`, payload);
    } else {
      this.events.emit("message", {
        type: payload.method,
        data: payload.params
      });
    }
  }
  onClose(event) {
    if (event && event.code === 3e3) {
      this.events.emit("error", new Error(`WebSocket connection closed abnormally with code: ${event.code} ${event.reason ? `(${event.reason})` : ""}`));
    }
    this.events.emit("disconnect");
  }
  async open(connection = this.connection) {
    if (this.connection === connection && this.connection.connected)
      return;
    if (this.connection.connected)
      this.close();
    if (typeof connection === "string") {
      await this.connection.open(connection);
      connection = this.connection;
    }
    this.connection = this.setConnection(connection);
    await this.connection.open();
    this.registerEventListeners();
    this.events.emit("connect");
  }
  async close() {
    await this.connection.close();
  }
  registerEventListeners() {
    if (this.hasRegisteredEventListeners)
      return;
    this.connection.on("payload", (payload) => this.onPayload(payload));
    this.connection.on("close", (event) => this.onClose(event));
    this.connection.on("error", (error) => this.events.emit("error", error));
    this.connection.on("register_error", (error) => this.onClose());
    this.hasRegisteredEventListeners = true;
  }
};

// node_modules/.pnpm/@walletconnect+jsonrpc-ws-connection@1.0.11/node_modules/@walletconnect/jsonrpc-ws-connection/dist/esm/ws.js
var import_events4 = __toESM(require_events());
var EVENT_EMITTER_MAX_LISTENERS_DEFAULT = 10;
var resolveWebSocketImplementation = () => {
  if (typeof global !== "undefined" && typeof global.WebSocket !== "undefined") {
    return global.WebSocket;
  }
  if (typeof window !== "undefined" && typeof window.WebSocket !== "undefined") {
    return window.WebSocket;
  }
  return require_browser4();
};
var isBrowser = () => typeof window !== "undefined";
var WS = resolveWebSocketImplementation();
var WsConnection = class {
  constructor(url) {
    this.url = url;
    this.events = new import_events4.EventEmitter();
    this.registering = false;
    if (!isWsUrl(url)) {
      throw new Error(`Provided URL is not compatible with WebSocket connection: ${url}`);
    }
    this.url = url;
  }
  get connected() {
    return typeof this.socket !== "undefined";
  }
  get connecting() {
    return this.registering;
  }
  on(event, listener) {
    this.events.on(event, listener);
  }
  once(event, listener) {
    this.events.once(event, listener);
  }
  off(event, listener) {
    this.events.off(event, listener);
  }
  removeListener(event, listener) {
    this.events.removeListener(event, listener);
  }
  async open(url = this.url) {
    await this.register(url);
  }
  async close() {
    return new Promise((resolve, reject) => {
      if (typeof this.socket === "undefined") {
        reject(new Error("Connection already closed"));
        return;
      }
      this.socket.onclose = (event) => {
        this.onClose(event);
        resolve();
      };
      this.socket.close();
    });
  }
  async send(payload, context) {
    if (typeof this.socket === "undefined") {
      this.socket = await this.register();
    }
    try {
      this.socket.send(safeJsonStringify(payload));
    } catch (e) {
      this.onError(payload.id, e);
    }
  }
  register(url = this.url) {
    if (!isWsUrl(url)) {
      throw new Error(`Provided URL is not compatible with WebSocket connection: ${url}`);
    }
    if (this.registering) {
      const currentMaxListeners = this.events.getMaxListeners();
      if (this.events.listenerCount("register_error") >= currentMaxListeners || this.events.listenerCount("open") >= currentMaxListeners) {
        this.events.setMaxListeners(currentMaxListeners + 1);
      }
      return new Promise((resolve, reject) => {
        this.events.once("register_error", (error) => {
          this.resetMaxListeners();
          reject(error);
        });
        this.events.once("open", () => {
          this.resetMaxListeners();
          if (typeof this.socket === "undefined") {
            return reject(new Error("WebSocket connection is missing or invalid"));
          }
          resolve(this.socket);
        });
      });
    }
    this.url = url;
    this.registering = true;
    return new Promise((resolve, reject) => {
      const opts = !(0, esm_exports2.isReactNative)() ? { rejectUnauthorized: !isLocalhostUrl(url) } : void 0;
      const socket = new WS(url, [], opts);
      if (isBrowser()) {
        socket.onerror = (event) => {
          const errorEvent = event;
          reject(this.emitError(errorEvent.error));
        };
      } else {
        socket.on("error", (errorEvent) => {
          reject(this.emitError(errorEvent));
        });
      }
      socket.onopen = () => {
        this.onOpen(socket);
        resolve(socket);
      };
    });
  }
  onOpen(socket) {
    socket.onmessage = (event) => this.onPayload(event);
    socket.onclose = (event) => this.onClose(event);
    this.socket = socket;
    this.registering = false;
    this.events.emit("open");
  }
  onClose(event) {
    this.socket = void 0;
    this.registering = false;
    this.events.emit("close", event);
  }
  onPayload(e) {
    if (typeof e.data === "undefined")
      return;
    const payload = typeof e.data === "string" ? safeJsonParse(e.data) : e.data;
    this.events.emit("payload", payload);
  }
  onError(id, e) {
    const error = this.parseError(e);
    const message = error.message || error.toString();
    const payload = formatJsonRpcError(id, message);
    this.events.emit("payload", payload);
  }
  parseError(e, url = this.url) {
    return parseConnectionError(e, url, "WS");
  }
  resetMaxListeners() {
    if (this.events.getMaxListeners() > EVENT_EMITTER_MAX_LISTENERS_DEFAULT) {
      this.events.setMaxListeners(EVENT_EMITTER_MAX_LISTENERS_DEFAULT);
    }
  }
  emitError(errorEvent) {
    const error = this.parseError(new Error((errorEvent === null || errorEvent === void 0 ? void 0 : errorEvent.message) || `WebSocket connection failed for URL: ${this.url}`));
    this.events.emit("register_error", error);
    return error;
  }
};
var ws_default = WsConnection;

// node_modules/.pnpm/@walletconnect+jsonrpc-ws-connection@1.0.11/node_modules/@walletconnect/jsonrpc-ws-connection/dist/esm/index.js
var esm_default = ws_default;

// node_modules/.pnpm/@walletconnect+core@2.7.3/node_modules/@walletconnect/core/dist/index.es.js
var import_lodash = __toESM(require_lodash());
function Ai(r, e) {
  if (r.length >= 255)
    throw new TypeError("Alphabet too long");
  for (var t = new Uint8Array(256), i2 = 0; i2 < t.length; i2++)
    t[i2] = 255;
  for (var s = 0; s < r.length; s++) {
    var n2 = r.charAt(s), a2 = n2.charCodeAt(0);
    if (t[a2] !== 255)
      throw new TypeError(n2 + " is ambiguous");
    t[a2] = s;
  }
  var o = r.length, h2 = r.charAt(0), d2 = Math.log(o) / Math.log(256), l = Math.log(256) / Math.log(o);
  function g2(u2) {
    if (u2 instanceof Uint8Array || (ArrayBuffer.isView(u2) ? u2 = new Uint8Array(u2.buffer, u2.byteOffset, u2.byteLength) : Array.isArray(u2) && (u2 = Uint8Array.from(u2))), !(u2 instanceof Uint8Array))
      throw new TypeError("Expected Uint8Array");
    if (u2.length === 0)
      return "";
    for (var y2 = 0, O2 = 0, w2 = 0, _2 = u2.length; w2 !== _2 && u2[w2] === 0; )
      w2++, y2++;
    for (var R2 = (_2 - w2) * l + 1 >>> 0, b4 = new Uint8Array(R2); w2 !== _2; ) {
      for (var S3 = u2[w2], x2 = 0, v = R2 - 1; (S3 !== 0 || x2 < O2) && v !== -1; v--, x2++)
        S3 += 256 * b4[v] >>> 0, b4[v] = S3 % o >>> 0, S3 = S3 / o >>> 0;
      if (S3 !== 0)
        throw new Error("Non-zero carry");
      O2 = x2, w2++;
    }
    for (var T2 = R2 - O2; T2 !== R2 && b4[T2] === 0; )
      T2++;
    for (var K2 = h2.repeat(y2); T2 < R2; ++T2)
      K2 += r.charAt(b4[T2]);
    return K2;
  }
  function L(u2) {
    if (typeof u2 != "string")
      throw new TypeError("Expected String");
    if (u2.length === 0)
      return new Uint8Array();
    var y2 = 0;
    if (u2[y2] !== " ") {
      for (var O2 = 0, w2 = 0; u2[y2] === h2; )
        O2++, y2++;
      for (var _2 = (u2.length - y2) * d2 + 1 >>> 0, R2 = new Uint8Array(_2); u2[y2]; ) {
        var b4 = t[u2.charCodeAt(y2)];
        if (b4 === 255)
          return;
        for (var S3 = 0, x2 = _2 - 1; (b4 !== 0 || S3 < w2) && x2 !== -1; x2--, S3++)
          b4 += o * R2[x2] >>> 0, R2[x2] = b4 % 256 >>> 0, b4 = b4 / 256 >>> 0;
        if (b4 !== 0)
          throw new Error("Non-zero carry");
        w2 = S3, y2++;
      }
      if (u2[y2] !== " ") {
        for (var v = _2 - w2; v !== _2 && R2[v] === 0; )
          v++;
        for (var T2 = new Uint8Array(O2 + (_2 - v)), K2 = O2; v !== _2; )
          T2[K2++] = R2[v++];
        return T2;
      }
    }
  }
  function X3(u2) {
    var y2 = L(u2);
    if (y2)
      return y2;
    throw new Error(`Non-${e} character`);
  }
  return { encode: g2, decodeUnsafe: L, decode: X3 };
}
var zi = Ai;
var Ni = zi;
var Te2 = (r) => {
  if (r instanceof Uint8Array && r.constructor.name === "Uint8Array")
    return r;
  if (r instanceof ArrayBuffer)
    return new Uint8Array(r);
  if (ArrayBuffer.isView(r))
    return new Uint8Array(r.buffer, r.byteOffset, r.byteLength);
  throw new Error("Unknown type, must be binary type");
};
var Ui = (r) => new TextEncoder().encode(r);
var Li = (r) => new TextDecoder().decode(r);
var Fi = class {
  constructor(e, t, i2) {
    this.name = e, this.prefix = t, this.baseEncode = i2;
  }
  encode(e) {
    if (e instanceof Uint8Array)
      return `${this.prefix}${this.baseEncode(e)}`;
    throw Error("Unknown type, must be binary type");
  }
};
var $i = class {
  constructor(e, t, i2) {
    if (this.name = e, this.prefix = t, t.codePointAt(0) === void 0)
      throw new Error("Invalid prefix character");
    this.prefixCodePoint = t.codePointAt(0), this.baseDecode = i2;
  }
  decode(e) {
    if (typeof e == "string") {
      if (e.codePointAt(0) !== this.prefixCodePoint)
        throw Error(`Unable to decode multibase string ${JSON.stringify(e)}, ${this.name} decoder only supports inputs prefixed with ${this.prefix}`);
      return this.baseDecode(e.slice(this.prefix.length));
    } else
      throw Error("Can only multibase decode strings");
  }
  or(e) {
    return Pe2(this, e);
  }
};
var Mi = class {
  constructor(e) {
    this.decoders = e;
  }
  or(e) {
    return Pe2(this, e);
  }
  decode(e) {
    const t = e[0], i2 = this.decoders[t];
    if (i2)
      return i2.decode(e);
    throw RangeError(`Unable to decode multibase string ${JSON.stringify(e)}, only inputs prefixed with ${Object.keys(this.decoders)} are supported`);
  }
};
var Pe2 = (r, e) => new Mi({ ...r.decoders || { [r.prefix]: r }, ...e.decoders || { [e.prefix]: e } });
var Ki = class {
  constructor(e, t, i2, s) {
    this.name = e, this.prefix = t, this.baseEncode = i2, this.baseDecode = s, this.encoder = new Fi(e, t, i2), this.decoder = new $i(e, t, s);
  }
  encode(e) {
    return this.encoder.encode(e);
  }
  decode(e) {
    return this.decoder.decode(e);
  }
};
var G2 = ({ name: r, prefix: e, encode: t, decode: i2 }) => new Ki(r, e, t, i2);
var $2 = ({ prefix: r, name: e, alphabet: t }) => {
  const { encode: i2, decode: s } = Ni(t, e);
  return G2({ prefix: r, name: e, encode: i2, decode: (n2) => Te2(s(n2)) });
};
var Bi = (r, e, t, i2) => {
  const s = {};
  for (let l = 0; l < e.length; ++l)
    s[e[l]] = l;
  let n2 = r.length;
  for (; r[n2 - 1] === "="; )
    --n2;
  const a2 = new Uint8Array(n2 * t / 8 | 0);
  let o = 0, h2 = 0, d2 = 0;
  for (let l = 0; l < n2; ++l) {
    const g2 = s[r[l]];
    if (g2 === void 0)
      throw new SyntaxError(`Non-${i2} character`);
    h2 = h2 << t | g2, o += t, o >= 8 && (o -= 8, a2[d2++] = 255 & h2 >> o);
  }
  if (o >= t || 255 & h2 << 8 - o)
    throw new SyntaxError("Unexpected end of data");
  return a2;
};
var ki = (r, e, t) => {
  const i2 = e[e.length - 1] === "=", s = (1 << t) - 1;
  let n2 = "", a2 = 0, o = 0;
  for (let h2 = 0; h2 < r.length; ++h2)
    for (o = o << 8 | r[h2], a2 += 8; a2 > t; )
      a2 -= t, n2 += e[s & o >> a2];
  if (a2 && (n2 += e[s & o << t - a2]), i2)
    for (; n2.length * t & 7; )
      n2 += "=";
  return n2;
};
var p2 = ({ name: r, prefix: e, bitsPerChar: t, alphabet: i2 }) => G2({ prefix: e, name: r, encode(s) {
  return ki(s, i2, t);
}, decode(s) {
  return Bi(s, i2, t, r);
} });
var ji = G2({ prefix: "\0", name: "identity", encode: (r) => Li(r), decode: (r) => Ui(r) });
var Vi = Object.freeze({ __proto__: null, identity: ji });
var qi = p2({ prefix: "0", name: "base2", alphabet: "01", bitsPerChar: 1 });
var Gi = Object.freeze({ __proto__: null, base2: qi });
var Yi = p2({ prefix: "7", name: "base8", alphabet: "01234567", bitsPerChar: 3 });
var Ji = Object.freeze({ __proto__: null, base8: Yi });
var Hi = $2({ prefix: "9", name: "base10", alphabet: "0123456789" });
var Xi = Object.freeze({ __proto__: null, base10: Hi });
var Wi = p2({ prefix: "f", name: "base16", alphabet: "0123456789abcdef", bitsPerChar: 4 });
var Zi = p2({ prefix: "F", name: "base16upper", alphabet: "0123456789ABCDEF", bitsPerChar: 4 });
var Qi = Object.freeze({ __proto__: null, base16: Wi, base16upper: Zi });
var es = p2({ prefix: "b", name: "base32", alphabet: "abcdefghijklmnopqrstuvwxyz234567", bitsPerChar: 5 });
var ts = p2({ prefix: "B", name: "base32upper", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567", bitsPerChar: 5 });
var is = p2({ prefix: "c", name: "base32pad", alphabet: "abcdefghijklmnopqrstuvwxyz234567=", bitsPerChar: 5 });
var ss = p2({ prefix: "C", name: "base32padupper", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567=", bitsPerChar: 5 });
var rs = p2({ prefix: "v", name: "base32hex", alphabet: "0123456789abcdefghijklmnopqrstuv", bitsPerChar: 5 });
var ns = p2({ prefix: "V", name: "base32hexupper", alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV", bitsPerChar: 5 });
var as = p2({ prefix: "t", name: "base32hexpad", alphabet: "0123456789abcdefghijklmnopqrstuv=", bitsPerChar: 5 });
var os = p2({ prefix: "T", name: "base32hexpadupper", alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV=", bitsPerChar: 5 });
var hs = p2({ prefix: "h", name: "base32z", alphabet: "ybndrfg8ejkmcpqxot1uwisza345h769", bitsPerChar: 5 });
var cs = Object.freeze({ __proto__: null, base32: es, base32upper: ts, base32pad: is, base32padupper: ss, base32hex: rs, base32hexupper: ns, base32hexpad: as, base32hexpadupper: os, base32z: hs });
var us = $2({ prefix: "k", name: "base36", alphabet: "0123456789abcdefghijklmnopqrstuvwxyz" });
var ls = $2({ prefix: "K", name: "base36upper", alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ" });
var ds = Object.freeze({ __proto__: null, base36: us, base36upper: ls });
var gs = $2({ name: "base58btc", prefix: "z", alphabet: "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz" });
var ps = $2({ name: "base58flickr", prefix: "Z", alphabet: "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ" });
var Ds = Object.freeze({ __proto__: null, base58btc: gs, base58flickr: ps });
var ys = p2({ prefix: "m", name: "base64", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", bitsPerChar: 6 });
var bs = p2({ prefix: "M", name: "base64pad", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", bitsPerChar: 6 });
var ms = p2({ prefix: "u", name: "base64url", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_", bitsPerChar: 6 });
var fs = p2({ prefix: "U", name: "base64urlpad", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=", bitsPerChar: 6 });
var Es = Object.freeze({ __proto__: null, base64: ys, base64pad: bs, base64url: ms, base64urlpad: fs });
var xe2 = Array.from("🚀🪐☄🛰🌌🌑🌒🌓🌔🌕🌖🌗🌘🌍🌏🌎🐉☀💻🖥💾💿😂❤😍🤣😊🙏💕😭😘👍😅👏😁🔥🥰💔💖💙😢🤔😆🙄💪😉☺👌🤗💜😔😎😇🌹🤦🎉💞✌✨🤷😱😌🌸🙌😋💗💚😏💛🙂💓🤩😄😀🖤😃💯🙈👇🎶😒🤭❣😜💋👀😪😑💥🙋😞😩😡🤪👊🥳😥🤤👉💃😳✋😚😝😴🌟😬🙃🍀🌷😻😓⭐✅🥺🌈😈🤘💦✔😣🏃💐☹🎊💘😠☝😕🌺🎂🌻😐🖕💝🙊😹🗣💫💀👑🎵🤞😛🔴😤🌼😫⚽🤙☕🏆🤫👈😮🙆🍻🍃🐶💁😲🌿🧡🎁⚡🌞🎈❌✊👋😰🤨😶🤝🚶💰🍓💢🤟🙁🚨💨🤬✈🎀🍺🤓😙💟🌱😖👶🥴▶➡❓💎💸⬇😨🌚🦋😷🕺⚠🙅😟😵👎🤲🤠🤧📌🔵💅🧐🐾🍒😗🤑🌊🤯🐷☎💧😯💆👆🎤🙇🍑❄🌴💣🐸💌📍🥀🤢👅💡💩👐📸👻🤐🤮🎼🥵🚩🍎🍊👼💍📣🥂");
var ws = xe2.reduce((r, e, t) => (r[t] = e, r), []);
var vs = xe2.reduce((r, e, t) => (r[e.codePointAt(0)] = t, r), []);
function Is(r) {
  return r.reduce((e, t) => (e += ws[t], e), "");
}
function Cs(r) {
  const e = [];
  for (const t of r) {
    const i2 = vs[t.codePointAt(0)];
    if (i2 === void 0)
      throw new Error(`Non-base256emoji character: ${t}`);
    e.push(i2);
  }
  return new Uint8Array(e);
}
var _s = G2({ prefix: "🚀", name: "base256emoji", encode: Is, decode: Cs });
var Rs = Object.freeze({ __proto__: null, base256emoji: _s });
var Ss = Ae2;
var Oe2 = 128;
var Ts = 127;
var Ps = ~Ts;
var xs = Math.pow(2, 31);
function Ae2(r, e, t) {
  e = e || [], t = t || 0;
  for (var i2 = t; r >= xs; )
    e[t++] = r & 255 | Oe2, r /= 128;
  for (; r & Ps; )
    e[t++] = r & 255 | Oe2, r >>>= 7;
  return e[t] = r | 0, Ae2.bytes = t - i2 + 1, e;
}
var Os = ne2;
var As = 128;
var ze2 = 127;
function ne2(r, i2) {
  var t = 0, i2 = i2 || 0, s = 0, n2 = i2, a2, o = r.length;
  do {
    if (n2 >= o)
      throw ne2.bytes = 0, new RangeError("Could not decode varint");
    a2 = r[n2++], t += s < 28 ? (a2 & ze2) << s : (a2 & ze2) * Math.pow(2, s), s += 7;
  } while (a2 >= As);
  return ne2.bytes = n2 - i2, t;
}
var zs = Math.pow(2, 7);
var Ns = Math.pow(2, 14);
var Us = Math.pow(2, 21);
var Ls = Math.pow(2, 28);
var Fs = Math.pow(2, 35);
var $s = Math.pow(2, 42);
var Ms = Math.pow(2, 49);
var Ks = Math.pow(2, 56);
var Bs = Math.pow(2, 63);
var ks = function(r) {
  return r < zs ? 1 : r < Ns ? 2 : r < Us ? 3 : r < Ls ? 4 : r < Fs ? 5 : r < $s ? 6 : r < Ms ? 7 : r < Ks ? 8 : r < Bs ? 9 : 10;
};
var js = { encode: Ss, decode: Os, encodingLength: ks };
var Ne = js;
var Ue2 = (r, e, t = 0) => (Ne.encode(r, e, t), e);
var Le = (r) => Ne.encodingLength(r);
var ae2 = (r, e) => {
  const t = e.byteLength, i2 = Le(r), s = i2 + Le(t), n2 = new Uint8Array(s + t);
  return Ue2(r, n2, 0), Ue2(t, n2, i2), n2.set(e, s), new Vs(r, t, e, n2);
};
var Vs = class {
  constructor(e, t, i2, s) {
    this.code = e, this.size = t, this.digest = i2, this.bytes = s;
  }
};
var Fe2 = ({ name: r, code: e, encode: t }) => new qs(r, e, t);
var qs = class {
  constructor(e, t, i2) {
    this.name = e, this.code = t, this.encode = i2;
  }
  digest(e) {
    if (e instanceof Uint8Array) {
      const t = this.encode(e);
      return t instanceof Uint8Array ? ae2(this.code, t) : t.then((i2) => ae2(this.code, i2));
    } else
      throw Error("Unknown type, must be binary type");
  }
};
var $e2 = (r) => async (e) => new Uint8Array(await crypto.subtle.digest(r, e));
var Gs = Fe2({ name: "sha2-256", code: 18, encode: $e2("SHA-256") });
var Ys = Fe2({ name: "sha2-512", code: 19, encode: $e2("SHA-512") });
var Js = Object.freeze({ __proto__: null, sha256: Gs, sha512: Ys });
var Me2 = 0;
var Hs = "identity";
var Ke = Te2;
var Xs = (r) => ae2(Me2, Ke(r));
var Ws = { code: Me2, name: Hs, encode: Ke, digest: Xs };
var Zs = Object.freeze({ __proto__: null, identity: Ws });
new TextEncoder(), new TextDecoder();
var Be = { ...Vi, ...Gi, ...Ji, ...Xi, ...Qi, ...cs, ...ds, ...Ds, ...Es, ...Rs };
({ ...Js, ...Zs });
function ke(r) {
  return globalThis.Buffer != null ? new Uint8Array(r.buffer, r.byteOffset, r.byteLength) : r;
}
function Qs(r = 0) {
  return globalThis.Buffer != null && globalThis.Buffer.allocUnsafe != null ? ke(globalThis.Buffer.allocUnsafe(r)) : new Uint8Array(r);
}
function je2(r, e, t, i2) {
  return { name: r, prefix: e, encoder: { name: r, prefix: e, encode: t }, decoder: { decode: i2 } };
}
var Ve2 = je2("utf8", "u", (r) => "u" + new TextDecoder("utf8").decode(r), (r) => new TextEncoder().encode(r.substring(1)));
var oe2 = je2("ascii", "a", (r) => {
  let e = "a";
  for (let t = 0; t < r.length; t++)
    e += String.fromCharCode(r[t]);
  return e;
}, (r) => {
  r = r.substring(1);
  const e = Qs(r.length);
  for (let t = 0; t < r.length; t++)
    e[t] = r.charCodeAt(t);
  return e;
});
var er = { utf8: Ve2, "utf-8": Ve2, hex: Be.base16, latin1: oe2, ascii: oe2, binary: oe2, ...Be };
function tr(r, e = "utf8") {
  const t = er[e];
  if (!t)
    throw new Error(`Unsupported encoding "${e}"`);
  return (e === "utf8" || e === "utf-8") && globalThis.Buffer != null && globalThis.Buffer.from != null ? ke(globalThis.Buffer.from(r, "utf-8")) : t.decoder.decode(`${t.prefix}${r}`);
}
var he = "wc";
var qe2 = 2;
var Y2 = "core";
var P = `${he}@${2}:${Y2}:`;
var Ge = { name: Y2, logger: "error" };
var Ye2 = { database: ":memory:" };
var Je2 = "crypto";
var ce2 = "client_ed25519_seed";
var He2 = import_time3.ONE_DAY;
var Xe2 = "keychain";
var We2 = "0.3";
var Ze2 = "messages";
var Qe = "0.3";
var et2 = import_time3.SIX_HOURS;
var tt2 = "publisher";
var it2 = "irn";
var st2 = "error";
var ue2 = "wss://relay.walletconnect.com";
var rt2 = "relayer";
var D = { message: "relayer_message", connect: "relayer_connect", disconnect: "relayer_disconnect", error: "relayer_error", connection_stalled: "relayer_connection_stalled", transport_closed: "relayer_transport_closed", publish: "relayer_publish" };
var nt2 = "_subscription";
var N10 = { payload: "payload", connect: "connect", disconnect: "disconnect", error: "error" };
var at2 = import_time3.ONE_SECOND / 2;
var ot2 = "2.7.3";
var ht = "0.3";
var I = { created: "subscription_created", deleted: "subscription_deleted", expired: "subscription_expired", disabled: "subscription_disabled", sync: "subscription_sync", resubscribed: "subscription_resubscribed" };
var ct2 = "subscription";
var ut2 = "0.3";
var lt2 = import_time3.FIVE_SECONDS * 1e3;
var dt2 = "pairing";
var gt = "0.3";
var U2 = { wc_pairingDelete: { req: { ttl: import_time3.ONE_DAY, prompt: false, tag: 1e3 }, res: { ttl: import_time3.ONE_DAY, prompt: false, tag: 1001 } }, wc_pairingPing: { req: { ttl: import_time3.THIRTY_SECONDS, prompt: false, tag: 1002 }, res: { ttl: import_time3.THIRTY_SECONDS, prompt: false, tag: 1003 } }, unregistered_method: { req: { ttl: import_time3.ONE_DAY, prompt: false, tag: 0 }, res: { ttl: import_time3.ONE_DAY, prompt: false, tag: 0 } } };
var C2 = { created: "history_created", updated: "history_updated", deleted: "history_deleted", sync: "history_sync" };
var pt2 = "history";
var Dt2 = "0.3";
var yt = "expirer";
var E2 = { created: "expirer_created", deleted: "expirer_deleted", expired: "expirer_expired", sync: "expirer_sync" };
var bt2 = "0.3";
var J2 = "verify-api";
var le2 = "https://verify.walletconnect.com";
var mt = class {
  constructor(e, t) {
    this.core = e, this.logger = t, this.keychain = /* @__PURE__ */ new Map(), this.name = Xe2, this.version = We2, this.initialized = false, this.storagePrefix = P, this.init = async () => {
      if (!this.initialized) {
        const i2 = await this.getKeyChain();
        typeof i2 < "u" && (this.keychain = i2), this.initialized = true;
      }
    }, this.has = (i2) => (this.isInitialized(), this.keychain.has(i2)), this.set = async (i2, s) => {
      this.isInitialized(), this.keychain.set(i2, s), await this.persist();
    }, this.get = (i2) => {
      this.isInitialized();
      const s = this.keychain.get(i2);
      if (typeof s > "u") {
        const { message: n2 } = N("NO_MATCHING_KEY", `${this.name}: ${i2}`);
        throw new Error(n2);
      }
      return s;
    }, this.del = async (i2) => {
      this.isInitialized(), this.keychain.delete(i2), await this.persist();
    }, this.core = e, this.logger = (0, import_logger.generateChildLogger)(t, this.name);
  }
  get context() {
    return (0, import_logger.getLoggerContext)(this.logger);
  }
  get storageKey() {
    return this.storagePrefix + this.version + "//" + this.name;
  }
  async setKeyChain(e) {
    await this.core.storage.setItem(this.storageKey, Gn(e));
  }
  async getKeyChain() {
    const e = await this.core.storage.getItem(this.storageKey);
    return typeof e < "u" ? Yn(e) : void 0;
  }
  async persist() {
    await this.setKeyChain(this.keychain);
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e } = N("NOT_INITIALIZED", this.name);
      throw new Error(e);
    }
  }
};
var ft2 = class {
  constructor(e, t, i2) {
    this.core = e, this.logger = t, this.name = Je2, this.initialized = false, this.init = async () => {
      this.initialized || (await this.keychain.init(), this.initialized = true);
    }, this.hasKeys = (s) => (this.isInitialized(), this.keychain.has(s)), this.getClientId = async () => {
      this.isInitialized();
      const s = await this.getClientSeed(), n2 = generateKeyPair(s);
      return encodeIss(n2.publicKey);
    }, this.generateKeyPair = () => {
      this.isInitialized();
      const s = Rn();
      return this.setPrivateKey(s.publicKey, s.privateKey);
    }, this.signJWT = async (s) => {
      this.isInitialized();
      const n2 = await this.getClientSeed(), a2 = generateKeyPair(n2), o = An(), h2 = He2;
      return await signJWT(o, s, h2, a2);
    }, this.generateSharedKey = (s, n2, a2) => {
      this.isInitialized();
      const o = this.getPrivateKey(s), h2 = Un(o, n2);
      return this.setSymKey(h2, a2);
    }, this.setSymKey = async (s, n2) => {
      this.isInitialized();
      const a2 = n2 || _n(s);
      return await this.keychain.set(a2, s), a2;
    }, this.deleteKeyPair = async (s) => {
      this.isInitialized(), await this.keychain.del(s);
    }, this.deleteSymKey = async (s) => {
      this.isInitialized(), await this.keychain.del(s);
    }, this.encode = async (s, n2, a2) => {
      this.isInitialized();
      const o = Pe(a2), h2 = safeJsonStringify(n2);
      if (Dn(o)) {
        const L = o.senderPublicKey, X3 = o.receiverPublicKey;
        s = await this.generateSharedKey(L, X3);
      }
      const d2 = this.getSymKey(s), { type: l, senderPublicKey: g2 } = o;
      return jn({ type: l, symKey: d2, message: h2, senderPublicKey: g2 });
    }, this.decode = async (s, n2, a2) => {
      this.isInitialized();
      const o = $n(n2, a2);
      if (Dn(o)) {
        const l = o.receiverPublicKey, g2 = o.senderPublicKey;
        s = await this.generateSharedKey(l, g2);
      }
      const h2 = this.getSymKey(s), d2 = Cn({ symKey: h2, encoded: n2 });
      return safeJsonParse(d2);
    }, this.getPayloadType = (s) => {
      const n2 = Q(s);
      return j(n2.type);
    }, this.getPayloadSenderPublicKey = (s) => {
      const n2 = Q(s);
      return n2.senderPublicKey ? toString2(n2.senderPublicKey, f) : void 0;
    }, this.core = e, this.logger = (0, import_logger.generateChildLogger)(t, this.name), this.keychain = i2 || new mt(this.core, this.logger);
  }
  get context() {
    return (0, import_logger.getLoggerContext)(this.logger);
  }
  async setPrivateKey(e, t) {
    return await this.keychain.set(e, t), e;
  }
  getPrivateKey(e) {
    return this.keychain.get(e);
  }
  async getClientSeed() {
    let e = "";
    try {
      e = this.keychain.get(ce2);
    } catch {
      e = An(), await this.keychain.set(ce2, e);
    }
    return tr(e, "base16");
  }
  getSymKey(e) {
    return this.keychain.get(e);
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e } = N("NOT_INITIALIZED", this.name);
      throw new Error(e);
    }
  }
};
var Et = class extends a {
  constructor(e, t) {
    super(e, t), this.logger = e, this.core = t, this.messages = /* @__PURE__ */ new Map(), this.name = Ze2, this.version = Qe, this.initialized = false, this.storagePrefix = P, this.init = async () => {
      if (!this.initialized) {
        this.logger.trace("Initialized");
        try {
          const i2 = await this.getRelayerMessages();
          typeof i2 < "u" && (this.messages = i2), this.logger.debug(`Successfully Restored records for ${this.name}`), this.logger.trace({ type: "method", method: "restore", size: this.messages.size });
        } catch (i2) {
          this.logger.debug(`Failed to Restore records for ${this.name}`), this.logger.error(i2);
        } finally {
          this.initialized = true;
        }
      }
    }, this.set = async (i2, s) => {
      this.isInitialized();
      const n2 = wn(s);
      let a2 = this.messages.get(i2);
      return typeof a2 > "u" && (a2 = {}), typeof a2[n2] < "u" || (a2[n2] = s, this.messages.set(i2, a2), await this.persist()), n2;
    }, this.get = (i2) => {
      this.isInitialized();
      let s = this.messages.get(i2);
      return typeof s > "u" && (s = {}), s;
    }, this.has = (i2, s) => {
      this.isInitialized();
      const n2 = this.get(i2), a2 = wn(s);
      return typeof n2[a2] < "u";
    }, this.del = async (i2) => {
      this.isInitialized(), this.messages.delete(i2), await this.persist();
    }, this.logger = (0, import_logger.generateChildLogger)(e, this.name), this.core = t;
  }
  get context() {
    return (0, import_logger.getLoggerContext)(this.logger);
  }
  get storageKey() {
    return this.storagePrefix + this.version + "//" + this.name;
  }
  async setRelayerMessages(e) {
    await this.core.storage.setItem(this.storageKey, Gn(e));
  }
  async getRelayerMessages() {
    const e = await this.core.storage.getItem(this.storageKey);
    return typeof e < "u" ? Yn(e) : void 0;
  }
  async persist() {
    await this.setRelayerMessages(this.messages);
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e } = N("NOT_INITIALIZED", this.name);
      throw new Error(e);
    }
  }
};
var ar = class extends u {
  constructor(e, t) {
    super(e, t), this.relayer = e, this.logger = t, this.events = new import_events5.EventEmitter(), this.name = tt2, this.queue = /* @__PURE__ */ new Map(), this.publishTimeout = 1e4, this.publish = async (i2, s, n2) => {
      this.logger.debug("Publishing Payload"), this.logger.trace({ type: "method", method: "publish", params: { topic: i2, message: s, opts: n2 } });
      try {
        const a2 = (n2 == null ? void 0 : n2.ttl) || et2, o = it(n2), h2 = (n2 == null ? void 0 : n2.prompt) || false, d2 = (n2 == null ? void 0 : n2.tag) || 0, l = { topic: i2, message: s, opts: { ttl: a2, relay: o, prompt: h2, tag: d2 } }, g2 = wn(s);
        this.queue.set(g2, l);
        try {
          await await Xn(this.rpcPublish(i2, s, a2, o, h2, d2), this.publishTimeout), this.relayer.events.emit(D.publish, l);
        } catch {
          this.logger.debug("Publishing Payload stalled"), this.relayer.events.emit(D.connection_stalled);
          return;
        }
        this.onPublish(g2, l), this.logger.debug("Successfully Published Payload"), this.logger.trace({ type: "method", method: "publish", params: { topic: i2, message: s, opts: n2 } });
      } catch (a2) {
        throw this.logger.debug("Failed to Publish Payload"), this.logger.error(a2), a2;
      }
    }, this.on = (i2, s) => {
      this.events.on(i2, s);
    }, this.once = (i2, s) => {
      this.events.once(i2, s);
    }, this.off = (i2, s) => {
      this.events.off(i2, s);
    }, this.removeListener = (i2, s) => {
      this.events.removeListener(i2, s);
    }, this.relayer = e, this.logger = (0, import_logger.generateChildLogger)(t, this.name), this.registerEventListeners();
  }
  get context() {
    return (0, import_logger.getLoggerContext)(this.logger);
  }
  rpcPublish(e, t, i2, s, n2, a2) {
    var o, h2, d2, l;
    const g2 = { method: ct(s.protocol).publish, params: { topic: e, message: t, ttl: i2, prompt: n2, tag: a2 } };
    return S2((o = g2.params) == null ? void 0 : o.prompt) && ((h2 = g2.params) == null || delete h2.prompt), S2((d2 = g2.params) == null ? void 0 : d2.tag) && ((l = g2.params) == null || delete l.tag), this.logger.debug("Outgoing Relay Payload"), this.logger.trace({ type: "message", direction: "outgoing", request: g2 }), this.relayer.request(g2);
  }
  onPublish(e, t) {
    this.queue.delete(e);
  }
  checkQueue() {
    this.queue.forEach(async (e) => {
      const { topic: t, message: i2, opts: s } = e;
      await this.publish(t, i2, s);
    });
  }
  registerEventListeners() {
    this.relayer.core.heartbeat.on(import_heartbeat.HEARTBEAT_EVENTS.pulse, () => {
      this.checkQueue();
    });
  }
};
var or2 = class {
  constructor() {
    this.map = /* @__PURE__ */ new Map(), this.set = (e, t) => {
      const i2 = this.get(e);
      this.exists(e, t) || this.map.set(e, [...i2, t]);
    }, this.get = (e) => this.map.get(e) || [], this.exists = (e, t) => this.get(e).includes(t), this.delete = (e, t) => {
      if (typeof t > "u") {
        this.map.delete(e);
        return;
      }
      if (!this.map.has(e))
        return;
      const i2 = this.get(e);
      if (!this.exists(e, t))
        return;
      const s = i2.filter((n2) => n2 !== t);
      if (!s.length) {
        this.map.delete(e);
        return;
      }
      this.map.set(e, s);
    }, this.clear = () => {
      this.map.clear();
    };
  }
  get topics() {
    return Array.from(this.map.keys());
  }
};
var hr = Object.defineProperty;
var cr = Object.defineProperties;
var ur = Object.getOwnPropertyDescriptors;
var wt2 = Object.getOwnPropertySymbols;
var lr = Object.prototype.hasOwnProperty;
var dr = Object.prototype.propertyIsEnumerable;
var vt = (r, e, t) => e in r ? hr(r, e, { enumerable: true, configurable: true, writable: true, value: t }) : r[e] = t;
var M = (r, e) => {
  for (var t in e || (e = {}))
    lr.call(e, t) && vt(r, t, e[t]);
  if (wt2)
    for (var t of wt2(e))
      dr.call(e, t) && vt(r, t, e[t]);
  return r;
};
var de = (r, e) => cr(r, ur(e));
var It2 = class extends d {
  constructor(e, t) {
    super(e, t), this.relayer = e, this.logger = t, this.subscriptions = /* @__PURE__ */ new Map(), this.topicMap = new or2(), this.events = new import_events5.EventEmitter(), this.name = ct2, this.version = ut2, this.pending = /* @__PURE__ */ new Map(), this.cached = [], this.initialized = false, this.pendingSubscriptionWatchLabel = "pending_sub_watch_label", this.pollingInterval = 20, this.storagePrefix = P, this.subscribeTimeout = 1e4, this.restartInProgress = false, this.batchSubscribeTopicsLimit = 500, this.init = async () => {
      this.initialized || (this.logger.trace("Initialized"), await this.restart(), this.registerEventListeners(), this.onEnable(), this.clientId = await this.relayer.core.crypto.getClientId());
    }, this.subscribe = async (i2, s) => {
      await this.restartToComplete(), this.isInitialized(), this.logger.debug("Subscribing Topic"), this.logger.trace({ type: "method", method: "subscribe", params: { topic: i2, opts: s } });
      try {
        const n2 = it(s), a2 = { topic: i2, relay: n2 };
        this.pending.set(i2, a2);
        const o = await this.rpcSubscribe(i2, n2);
        return this.onSubscribe(o, a2), this.logger.debug("Successfully Subscribed Topic"), this.logger.trace({ type: "method", method: "subscribe", params: { topic: i2, opts: s } }), o;
      } catch (n2) {
        throw this.logger.debug("Failed to Subscribe Topic"), this.logger.error(n2), n2;
      }
    }, this.unsubscribe = async (i2, s) => {
      await this.restartToComplete(), this.isInitialized(), typeof (s == null ? void 0 : s.id) < "u" ? await this.unsubscribeById(i2, s.id, s) : await this.unsubscribeByTopic(i2, s);
    }, this.isSubscribed = async (i2) => this.topics.includes(i2) ? true : await new Promise((s, n2) => {
      const a2 = new import_time3.Watch();
      a2.start(this.pendingSubscriptionWatchLabel);
      const o = setInterval(() => {
        !this.pending.has(i2) && this.topics.includes(i2) && (clearInterval(o), a2.stop(this.pendingSubscriptionWatchLabel), s(true)), a2.elapsed(this.pendingSubscriptionWatchLabel) >= lt2 && (clearInterval(o), a2.stop(this.pendingSubscriptionWatchLabel), n2(false));
      }, this.pollingInterval);
    }), this.on = (i2, s) => {
      this.events.on(i2, s);
    }, this.once = (i2, s) => {
      this.events.once(i2, s);
    }, this.off = (i2, s) => {
      this.events.off(i2, s);
    }, this.removeListener = (i2, s) => {
      this.events.removeListener(i2, s);
    }, this.restart = async () => {
      this.restartInProgress = true, await this.restore(), await this.reset(), this.restartInProgress = false;
    }, this.relayer = e, this.logger = (0, import_logger.generateChildLogger)(t, this.name), this.clientId = "";
  }
  get context() {
    return (0, import_logger.getLoggerContext)(this.logger);
  }
  get storageKey() {
    return this.storagePrefix + this.version + "//" + this.name;
  }
  get length() {
    return this.subscriptions.size;
  }
  get ids() {
    return Array.from(this.subscriptions.keys());
  }
  get values() {
    return Array.from(this.subscriptions.values());
  }
  get topics() {
    return this.topicMap.topics;
  }
  hasSubscription(e, t) {
    let i2 = false;
    try {
      i2 = this.getSubscription(e).topic === t;
    } catch {
    }
    return i2;
  }
  onEnable() {
    this.cached = [], this.initialized = true;
  }
  onDisable() {
    this.cached = this.values, this.subscriptions.clear(), this.topicMap.clear();
  }
  async unsubscribeByTopic(e, t) {
    const i2 = this.topicMap.get(e);
    await Promise.all(i2.map(async (s) => await this.unsubscribeById(e, s, t)));
  }
  async unsubscribeById(e, t, i2) {
    this.logger.debug("Unsubscribing Topic"), this.logger.trace({ type: "method", method: "unsubscribe", params: { topic: e, id: t, opts: i2 } });
    try {
      const s = it(i2);
      await this.rpcUnsubscribe(e, t, s);
      const n2 = R("USER_DISCONNECTED", `${this.name}, ${e}`);
      await this.onUnsubscribe(e, t, n2), this.logger.debug("Successfully Unsubscribed Topic"), this.logger.trace({ type: "method", method: "unsubscribe", params: { topic: e, id: t, opts: i2 } });
    } catch (s) {
      throw this.logger.debug("Failed to Unsubscribe Topic"), this.logger.error(s), s;
    }
  }
  async rpcSubscribe(e, t) {
    const i2 = { method: ct(t.protocol).subscribe, params: { topic: e } };
    this.logger.debug("Outgoing Relay Payload"), this.logger.trace({ type: "payload", direction: "outgoing", request: i2 });
    try {
      await await Xn(this.relayer.request(i2), this.subscribeTimeout);
    } catch {
      this.logger.debug("Outgoing Relay Subscribe Payload stalled"), this.relayer.events.emit(D.connection_stalled);
    }
    return wn(e + this.clientId);
  }
  async rpcBatchSubscribe(e) {
    if (!e.length)
      return;
    const t = e[0].relay, i2 = { method: ct(t.protocol).batchSubscribe, params: { topics: e.map((s) => s.topic) } };
    this.logger.debug("Outgoing Relay Payload"), this.logger.trace({ type: "payload", direction: "outgoing", request: i2 });
    try {
      return await await Xn(this.relayer.request(i2), this.subscribeTimeout);
    } catch {
      this.logger.debug("Outgoing Relay Payload stalled"), this.relayer.events.emit(D.connection_stalled);
    }
  }
  rpcUnsubscribe(e, t, i2) {
    const s = { method: ct(i2.protocol).unsubscribe, params: { topic: e, id: t } };
    return this.logger.debug("Outgoing Relay Payload"), this.logger.trace({ type: "payload", direction: "outgoing", request: s }), this.relayer.request(s);
  }
  onSubscribe(e, t) {
    this.setSubscription(e, de(M({}, t), { id: e })), this.pending.delete(t.topic);
  }
  onBatchSubscribe(e) {
    e.length && e.forEach((t) => {
      this.setSubscription(t.id, M({}, t)), this.pending.delete(t.topic);
    });
  }
  async onUnsubscribe(e, t, i2) {
    this.events.removeAllListeners(t), this.hasSubscription(t, e) && this.deleteSubscription(t, i2), await this.relayer.messages.del(e);
  }
  async setRelayerSubscriptions(e) {
    await this.relayer.core.storage.setItem(this.storageKey, e);
  }
  async getRelayerSubscriptions() {
    return await this.relayer.core.storage.getItem(this.storageKey);
  }
  setSubscription(e, t) {
    this.subscriptions.has(e) || (this.logger.debug("Setting subscription"), this.logger.trace({ type: "method", method: "setSubscription", id: e, subscription: t }), this.addSubscription(e, t));
  }
  addSubscription(e, t) {
    this.subscriptions.set(e, M({}, t)), this.topicMap.set(t.topic, e), this.events.emit(I.created, t);
  }
  getSubscription(e) {
    this.logger.debug("Getting subscription"), this.logger.trace({ type: "method", method: "getSubscription", id: e });
    const t = this.subscriptions.get(e);
    if (!t) {
      const { message: i2 } = N("NO_MATCHING_KEY", `${this.name}: ${e}`);
      throw new Error(i2);
    }
    return t;
  }
  deleteSubscription(e, t) {
    this.logger.debug("Deleting subscription"), this.logger.trace({ type: "method", method: "deleteSubscription", id: e, reason: t });
    const i2 = this.getSubscription(e);
    this.subscriptions.delete(e), this.topicMap.delete(i2.topic, e), this.events.emit(I.deleted, de(M({}, i2), { reason: t }));
  }
  async persist() {
    await this.setRelayerSubscriptions(this.values), this.events.emit(I.sync);
  }
  async reset() {
    if (this.cached.length) {
      const e = Math.ceil(this.cached.length / this.batchSubscribeTopicsLimit);
      for (let t = 0; t < e; t++) {
        const i2 = this.cached.splice(0, this.batchSubscribeTopicsLimit);
        await this.batchSubscribe(i2);
      }
    }
    this.events.emit(I.resubscribed);
  }
  async restore() {
    try {
      const e = await this.getRelayerSubscriptions();
      if (typeof e > "u" || !e.length)
        return;
      if (this.subscriptions.size) {
        const { message: t } = N("RESTORE_WILL_OVERRIDE", this.name);
        throw this.logger.error(t), this.logger.error(`${this.name}: ${JSON.stringify(this.values)}`), new Error(t);
      }
      this.cached = e, this.logger.debug(`Successfully Restored subscriptions for ${this.name}`), this.logger.trace({ type: "method", method: "restore", subscriptions: this.values });
    } catch (e) {
      this.logger.debug(`Failed to Restore subscriptions for ${this.name}`), this.logger.error(e);
    }
  }
  async batchSubscribe(e) {
    if (!e.length)
      return;
    const t = await this.rpcBatchSubscribe(e);
    C(t) && this.onBatchSubscribe(t.map((i2, s) => de(M({}, e[s]), { id: i2 })));
  }
  async onConnect() {
    this.restartInProgress || (await this.restart(), this.onEnable());
  }
  onDisconnect() {
    this.onDisable();
  }
  async checkPending() {
    if (this.relayer.transportExplicitlyClosed)
      return;
    const e = [];
    this.pending.forEach((t) => {
      e.push(t);
    }), await this.batchSubscribe(e);
  }
  registerEventListeners() {
    this.relayer.core.heartbeat.on(import_heartbeat.HEARTBEAT_EVENTS.pulse, async () => {
      await this.checkPending();
    }), this.relayer.on(D.connect, async () => {
      await this.onConnect();
    }), this.relayer.on(D.disconnect, () => {
      this.onDisconnect();
    }), this.events.on(I.created, async (e) => {
      const t = I.created;
      this.logger.info(`Emitting ${t}`), this.logger.debug({ type: "event", event: t, data: e }), await this.persist();
    }), this.events.on(I.deleted, async (e) => {
      const t = I.deleted;
      this.logger.info(`Emitting ${t}`), this.logger.debug({ type: "event", event: t, data: e }), await this.persist();
    });
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e } = N("NOT_INITIALIZED", this.name);
      throw new Error(e);
    }
  }
  async restartToComplete() {
    this.restartInProgress && await new Promise((e) => {
      const t = setInterval(() => {
        this.restartInProgress || (clearInterval(t), e());
      }, this.pollingInterval);
    });
  }
};
var gr = Object.defineProperty;
var Ct2 = Object.getOwnPropertySymbols;
var pr = Object.prototype.hasOwnProperty;
var Dr = Object.prototype.propertyIsEnumerable;
var _t2 = (r, e, t) => e in r ? gr(r, e, { enumerable: true, configurable: true, writable: true, value: t }) : r[e] = t;
var yr = (r, e) => {
  for (var t in e || (e = {}))
    pr.call(e, t) && _t2(r, t, e[t]);
  if (Ct2)
    for (var t of Ct2(e))
      Dr.call(e, t) && _t2(r, t, e[t]);
  return r;
};
var Rt2 = class extends g {
  constructor(e) {
    super(e), this.protocol = "wc", this.version = 2, this.events = new import_events5.EventEmitter(), this.name = rt2, this.transportExplicitlyClosed = false, this.initialized = false, this.reconnecting = false, this.connectionStatusPollingInterval = 20, this.staleConnectionErrors = ["socket hang up", "socket stalled"], this.request = async (t) => {
      this.logger.debug("Publishing Request Payload");
      try {
        return await this.toEstablishConnection(), await this.provider.request(t);
      } catch (i2) {
        throw this.logger.debug("Failed to Publish Request"), this.logger.error(i2), i2;
      }
    }, this.core = e.core, this.logger = typeof e.logger < "u" && typeof e.logger != "string" ? (0, import_logger.generateChildLogger)(e.logger, this.name) : (0, import_logger.pino)((0, import_logger.getDefaultLoggerOptions)({ level: e.logger || st2 })), this.messages = new Et(this.logger, e.core), this.subscriber = new It2(this, this.logger), this.publisher = new ar(this, this.logger), this.relayUrl = (e == null ? void 0 : e.relayUrl) || ue2, this.projectId = e.projectId, this.provider = {};
  }
  async init() {
    this.logger.trace("Initialized"), await this.createProvider(), await Promise.all([this.messages.init(), this.transportOpen(), this.subscriber.init()]), this.registerEventListeners(), this.initialized = true;
  }
  get context() {
    return (0, import_logger.getLoggerContext)(this.logger);
  }
  get connected() {
    return this.provider.connection.connected;
  }
  get connecting() {
    return this.provider.connection.connecting;
  }
  async publish(e, t, i2) {
    this.isInitialized(), await this.publisher.publish(e, t, i2), await this.recordMessageEvent({ topic: e, message: t, publishedAt: Date.now() });
  }
  async subscribe(e, t) {
    this.isInitialized();
    let i2 = "";
    return await Promise.all([new Promise((s) => {
      this.subscriber.once(I.created, (n2) => {
        n2.topic === e && s();
      });
    }), new Promise(async (s) => {
      i2 = await this.subscriber.subscribe(e, t), s();
    })]), i2;
  }
  async unsubscribe(e, t) {
    this.isInitialized(), await this.subscriber.unsubscribe(e, t);
  }
  on(e, t) {
    this.events.on(e, t);
  }
  once(e, t) {
    this.events.once(e, t);
  }
  off(e, t) {
    this.events.off(e, t);
  }
  removeListener(e, t) {
    this.events.removeListener(e, t);
  }
  async transportClose() {
    this.transportExplicitlyClosed = true, this.connected && (await this.provider.disconnect(), this.events.emit(D.transport_closed));
  }
  async transportOpen(e) {
    if (this.transportExplicitlyClosed = false, !this.reconnecting) {
      this.relayUrl = e || this.relayUrl, this.reconnecting = true;
      try {
        await Promise.all([new Promise((t) => {
          this.initialized || t(), this.subscriber.once(I.resubscribed, () => {
            t();
          });
        }), await Promise.race([new Promise(async (t, i2) => {
          await Xn(this.provider.connect(), 5e3, "socket stalled").catch((s) => i2(s)).then(() => t()).finally(() => this.removeListener(D.transport_closed, this.rejectTransportOpen));
        }), new Promise((t) => this.once(D.transport_closed, this.rejectTransportOpen))])]);
      } catch (t) {
        this.logger.error(t);
        const i2 = t;
        if (!this.isConnectionStalled(i2.message))
          throw t;
        this.events.emit(D.transport_closed);
      } finally {
        this.reconnecting = false;
      }
    }
  }
  async restartTransport(e) {
    this.transportExplicitlyClosed || (this.relayUrl = e || this.relayUrl, this.connected && await Promise.all([new Promise((t) => {
      this.provider.once(N10.disconnect, () => {
        t();
      });
    }), this.transportClose()]), await this.createProvider(), await this.transportOpen());
  }
  isConnectionStalled(e) {
    return this.staleConnectionErrors.some((t) => e.includes(t));
  }
  rejectTransportOpen() {
    throw new Error("closeTransport called before connection was established");
  }
  async createProvider() {
    const e = await this.core.crypto.signJWT(this.relayUrl);
    this.provider = new JsonRpcProvider(new esm_default(Hn({ sdkVersion: ot2, protocol: this.protocol, version: this.version, relayUrl: this.relayUrl, projectId: this.projectId, auth: e, useOnCloseEvent: true }))), this.registerProviderListeners();
  }
  async recordMessageEvent(e) {
    const { topic: t, message: i2 } = e;
    await this.messages.set(t, i2);
  }
  async shouldIgnoreMessageEvent(e) {
    const { topic: t, message: i2 } = e;
    return await this.subscriber.isSubscribed(t) ? this.messages.has(t, i2) : true;
  }
  async onProviderPayload(e) {
    if (this.logger.debug("Incoming Relay Payload"), this.logger.trace({ type: "payload", direction: "incoming", payload: e }), isJsonRpcRequest(e)) {
      if (!e.method.endsWith(nt2))
        return;
      const t = e.params, { topic: i2, message: s, publishedAt: n2 } = t.data, a2 = { topic: i2, message: s, publishedAt: n2 };
      this.logger.debug("Emitting Relayer Payload"), this.logger.trace(yr({ type: "event", event: t.id }, a2)), this.events.emit(t.id, a2), await this.acknowledgePayload(e), await this.onMessageEvent(a2);
    }
  }
  async onMessageEvent(e) {
    await this.shouldIgnoreMessageEvent(e) || (this.events.emit(D.message, e), await this.recordMessageEvent(e));
  }
  async acknowledgePayload(e) {
    const t = formatJsonRpcResult(e.id, true);
    await this.provider.connection.send(t);
  }
  registerProviderListeners() {
    this.provider.on(N10.payload, (e) => this.onProviderPayload(e)), this.provider.on(N10.connect, () => {
      this.events.emit(D.connect);
    }), this.provider.on(N10.disconnect, () => {
      this.onProviderDisconnect();
    }), this.provider.on(N10.error, (e) => {
      this.logger.error(e), this.events.emit(D.error, e);
    });
  }
  registerEventListeners() {
    this.events.on(D.connection_stalled, async () => {
      await this.restartTransport();
    });
  }
  onProviderDisconnect() {
    this.events.emit(D.disconnect), this.attemptToReconnect();
  }
  attemptToReconnect() {
    this.transportExplicitlyClosed || setTimeout(async () => {
      await this.restartTransport();
    }, (0, import_time3.toMiliseconds)(at2));
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e } = N("NOT_INITIALIZED", this.name);
      throw new Error(e);
    }
  }
  async toEstablishConnection() {
    if (!this.connected) {
      if (this.connecting)
        return await new Promise((e) => {
          const t = setInterval(() => {
            this.connected && (clearInterval(t), e());
          }, this.connectionStatusPollingInterval);
        });
      await this.restartTransport();
    }
  }
};
var br = Object.defineProperty;
var St2 = Object.getOwnPropertySymbols;
var mr = Object.prototype.hasOwnProperty;
var fr = Object.prototype.propertyIsEnumerable;
var Tt2 = (r, e, t) => e in r ? br(r, e, { enumerable: true, configurable: true, writable: true, value: t }) : r[e] = t;
var Pt2 = (r, e) => {
  for (var t in e || (e = {}))
    mr.call(e, t) && Tt2(r, t, e[t]);
  if (St2)
    for (var t of St2(e))
      fr.call(e, t) && Tt2(r, t, e[t]);
  return r;
};
var xt2 = class extends p {
  constructor(e, t, i2, s = P, n2 = void 0) {
    super(e, t, i2, s), this.core = e, this.logger = t, this.name = i2, this.map = /* @__PURE__ */ new Map(), this.version = ht, this.cached = [], this.initialized = false, this.storagePrefix = P, this.init = async () => {
      this.initialized || (this.logger.trace("Initialized"), await this.restore(), this.cached.forEach((a2) => {
        this.getKey && a2 !== null && !S2(a2) ? this.map.set(this.getKey(a2), a2) : Rt(a2) ? this.map.set(a2.id, a2) : At(a2) && this.map.set(a2.topic, a2);
      }), this.cached = [], this.initialized = true);
    }, this.set = async (a2, o) => {
      this.isInitialized(), this.map.has(a2) ? await this.update(a2, o) : (this.logger.debug("Setting value"), this.logger.trace({ type: "method", method: "set", key: a2, value: o }), this.map.set(a2, o), await this.persist());
    }, this.get = (a2) => (this.isInitialized(), this.logger.debug("Getting value"), this.logger.trace({ type: "method", method: "get", key: a2 }), this.getData(a2)), this.getAll = (a2) => (this.isInitialized(), a2 ? this.values.filter((o) => Object.keys(a2).every((h2) => (0, import_lodash.default)(o[h2], a2[h2]))) : this.values), this.update = async (a2, o) => {
      this.isInitialized(), this.logger.debug("Updating value"), this.logger.trace({ type: "method", method: "update", key: a2, update: o });
      const h2 = Pt2(Pt2({}, this.getData(a2)), o);
      this.map.set(a2, h2), await this.persist();
    }, this.delete = async (a2, o) => {
      this.isInitialized(), this.map.has(a2) && (this.logger.debug("Deleting value"), this.logger.trace({ type: "method", method: "delete", key: a2, reason: o }), this.map.delete(a2), await this.persist());
    }, this.logger = (0, import_logger.generateChildLogger)(t, this.name), this.storagePrefix = s, this.getKey = n2;
  }
  get context() {
    return (0, import_logger.getLoggerContext)(this.logger);
  }
  get storageKey() {
    return this.storagePrefix + this.version + "//" + this.name;
  }
  get length() {
    return this.map.size;
  }
  get keys() {
    return Array.from(this.map.keys());
  }
  get values() {
    return Array.from(this.map.values());
  }
  async setDataStore(e) {
    await this.core.storage.setItem(this.storageKey, e);
  }
  async getDataStore() {
    return await this.core.storage.getItem(this.storageKey);
  }
  getData(e) {
    const t = this.map.get(e);
    if (!t) {
      const { message: i2 } = N("NO_MATCHING_KEY", `${this.name}: ${e}`);
      throw this.logger.error(i2), new Error(i2);
    }
    return t;
  }
  async persist() {
    await this.setDataStore(this.values);
  }
  async restore() {
    try {
      const e = await this.getDataStore();
      if (typeof e > "u" || !e.length)
        return;
      if (this.map.size) {
        const { message: t } = N("RESTORE_WILL_OVERRIDE", this.name);
        throw this.logger.error(t), new Error(t);
      }
      this.cached = e, this.logger.debug(`Successfully Restored value for ${this.name}`), this.logger.trace({ type: "method", method: "restore", value: this.values });
    } catch (e) {
      this.logger.debug(`Failed to Restore value for ${this.name}`), this.logger.error(e);
    }
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e } = N("NOT_INITIALIZED", this.name);
      throw new Error(e);
    }
  }
};
var Ot = class {
  constructor(e, t) {
    this.core = e, this.logger = t, this.name = dt2, this.version = gt, this.events = new import_events5.default(), this.initialized = false, this.storagePrefix = P, this.ignoredPayloadTypes = [U], this.registeredMethods = [], this.init = async () => {
      this.initialized || (await this.pairings.init(), await this.cleanup(), this.registerRelayerEvents(), this.registerExpirerEvents(), this.initialized = true, this.logger.trace("Initialized"));
    }, this.register = ({ methods: i2 }) => {
      this.isInitialized(), this.registeredMethods = [.../* @__PURE__ */ new Set([...this.registeredMethods, ...i2])];
    }, this.create = async () => {
      this.isInitialized();
      const i2 = An(), s = await this.core.crypto.setSymKey(i2), n2 = rt(import_time3.FIVE_MINUTES), a2 = { protocol: it2 }, o = { topic: s, expiry: n2, relay: a2, active: false }, h2 = pt({ protocol: this.core.protocol, version: this.core.version, topic: s, symKey: i2, relay: a2 });
      return await this.pairings.set(s, o), await this.core.relayer.subscribe(s), this.core.expirer.set(s, n2), { topic: s, uri: h2 };
    }, this.pair = async (i2) => {
      this.isInitialized(), this.isValidPair(i2);
      const { topic: s, symKey: n2, relay: a2 } = ft(i2.uri);
      if (this.pairings.keys.includes(s))
        throw new Error(`Pairing already exists: ${s}`);
      if (this.core.crypto.hasKeys(s))
        throw new Error(`Keychain already exists: ${s}`);
      const o = rt(import_time3.FIVE_MINUTES), h2 = { topic: s, relay: a2, expiry: o, active: false };
      return await this.pairings.set(s, h2), await this.core.crypto.setSymKey(n2, s), await this.core.relayer.subscribe(s, { relay: a2 }), this.core.expirer.set(s, o), i2.activatePairing && await this.activate({ topic: s }), h2;
    }, this.activate = async ({ topic: i2 }) => {
      this.isInitialized();
      const s = rt(import_time3.THIRTY_DAYS);
      await this.pairings.update(i2, { active: true, expiry: s }), this.core.expirer.set(i2, s);
    }, this.ping = async (i2) => {
      this.isInitialized(), await this.isValidPing(i2);
      const { topic: s } = i2;
      if (this.pairings.keys.includes(s)) {
        const n2 = await this.sendRequest(s, "wc_pairingPing", {}), { done: a2, resolve: o, reject: h2 } = Zn();
        this.events.once(st("pairing_ping", n2), ({ error: d2 }) => {
          d2 ? h2(d2) : o();
        }), await a2();
      }
    }, this.updateExpiry = async ({ topic: i2, expiry: s }) => {
      this.isInitialized(), await this.pairings.update(i2, { expiry: s });
    }, this.updateMetadata = async ({ topic: i2, metadata: s }) => {
      this.isInitialized(), await this.pairings.update(i2, { peerMetadata: s });
    }, this.getPairings = () => (this.isInitialized(), this.pairings.values), this.disconnect = async (i2) => {
      this.isInitialized(), await this.isValidDisconnect(i2);
      const { topic: s } = i2;
      this.pairings.keys.includes(s) && (await this.sendRequest(s, "wc_pairingDelete", R("USER_DISCONNECTED")), await this.deletePairing(s));
    }, this.sendRequest = async (i2, s, n2) => {
      const a2 = formatJsonRpcRequest(s, n2), o = await this.core.crypto.encode(i2, a2), h2 = U2[s].req;
      return this.core.history.set(i2, a2), await this.core.relayer.publish(i2, o, h2), a2.id;
    }, this.sendResult = async (i2, s, n2) => {
      const a2 = formatJsonRpcResult(i2, n2), o = await this.core.crypto.encode(s, a2), h2 = await this.core.history.get(s, i2), d2 = U2[h2.request.method].res;
      await this.core.relayer.publish(s, o, d2), await this.core.history.resolve(a2);
    }, this.sendError = async (i2, s, n2) => {
      const a2 = formatJsonRpcError(i2, n2), o = await this.core.crypto.encode(s, a2), h2 = await this.core.history.get(s, i2), d2 = U2[h2.request.method] ? U2[h2.request.method].res : U2.unregistered_method.res;
      await this.core.relayer.publish(s, o, d2), await this.core.history.resolve(a2);
    }, this.deletePairing = async (i2, s) => {
      await this.core.relayer.unsubscribe(i2), await Promise.all([this.pairings.delete(i2, R("USER_DISCONNECTED")), this.core.crypto.deleteSymKey(i2), s ? Promise.resolve() : this.core.expirer.del(i2)]);
    }, this.cleanup = async () => {
      const i2 = this.pairings.getAll().filter((s) => ot(s.expiry));
      await Promise.all(i2.map((s) => this.deletePairing(s.topic)));
    }, this.onRelayEventRequest = (i2) => {
      const { topic: s, payload: n2 } = i2, a2 = n2.method;
      if (this.pairings.keys.includes(s))
        switch (a2) {
          case "wc_pairingPing":
            return this.onPairingPingRequest(s, n2);
          case "wc_pairingDelete":
            return this.onPairingDeleteRequest(s, n2);
          default:
            return this.onUnknownRpcMethodRequest(s, n2);
        }
    }, this.onRelayEventResponse = async (i2) => {
      const { topic: s, payload: n2 } = i2, a2 = (await this.core.history.get(s, n2.id)).request.method;
      if (this.pairings.keys.includes(s))
        switch (a2) {
          case "wc_pairingPing":
            return this.onPairingPingResponse(s, n2);
          default:
            return this.onUnknownRpcMethodResponse(a2);
        }
    }, this.onPairingPingRequest = async (i2, s) => {
      const { id: n2 } = s;
      try {
        this.isValidPing({ topic: i2 }), await this.sendResult(n2, i2, true), this.events.emit("pairing_ping", { id: n2, topic: i2 });
      } catch (a2) {
        await this.sendError(n2, i2, a2), this.logger.error(a2);
      }
    }, this.onPairingPingResponse = (i2, s) => {
      const { id: n2 } = s;
      setTimeout(() => {
        isJsonRpcResult(s) ? this.events.emit(st("pairing_ping", n2), {}) : isJsonRpcError(s) && this.events.emit(st("pairing_ping", n2), { error: s.error });
      }, 500);
    }, this.onPairingDeleteRequest = async (i2, s) => {
      const { id: n2 } = s;
      try {
        this.isValidDisconnect({ topic: i2 }), await this.deletePairing(i2), this.events.emit("pairing_delete", { id: n2, topic: i2 });
      } catch (a2) {
        await this.sendError(n2, i2, a2), this.logger.error(a2);
      }
    }, this.onUnknownRpcMethodRequest = async (i2, s) => {
      const { id: n2, method: a2 } = s;
      try {
        if (this.registeredMethods.includes(a2))
          return;
        const o = R("WC_METHOD_UNSUPPORTED", a2);
        await this.sendError(n2, i2, o), this.logger.error(o);
      } catch (o) {
        await this.sendError(n2, i2, o), this.logger.error(o);
      }
    }, this.onUnknownRpcMethodResponse = (i2) => {
      this.registeredMethods.includes(i2) || this.logger.error(R("WC_METHOD_UNSUPPORTED", i2));
    }, this.isValidPair = (i2) => {
      if (!Ct(i2)) {
        const { message: s } = N("MISSING_OR_INVALID", `pair() params: ${i2}`);
        throw new Error(s);
      }
      if (!Tt(i2.uri)) {
        const { message: s } = N("MISSING_OR_INVALID", `pair() uri: ${i2.uri}`);
        throw new Error(s);
      }
    }, this.isValidPing = async (i2) => {
      if (!Ct(i2)) {
        const { message: n2 } = N("MISSING_OR_INVALID", `ping() params: ${i2}`);
        throw new Error(n2);
      }
      const { topic: s } = i2;
      await this.isValidPairingTopic(s);
    }, this.isValidDisconnect = async (i2) => {
      if (!Ct(i2)) {
        const { message: n2 } = N("MISSING_OR_INVALID", `disconnect() params: ${i2}`);
        throw new Error(n2);
      }
      const { topic: s } = i2;
      await this.isValidPairingTopic(s);
    }, this.isValidPairingTopic = async (i2) => {
      if (!m(i2, false)) {
        const { message: s } = N("MISSING_OR_INVALID", `pairing topic should be a string: ${i2}`);
        throw new Error(s);
      }
      if (!this.pairings.keys.includes(i2)) {
        const { message: s } = N("NO_MATCHING_KEY", `pairing topic doesn't exist: ${i2}`);
        throw new Error(s);
      }
      if (ot(this.pairings.get(i2).expiry)) {
        await this.deletePairing(i2);
        const { message: s } = N("EXPIRED", `pairing topic: ${i2}`);
        throw new Error(s);
      }
    }, this.core = e, this.logger = (0, import_logger.generateChildLogger)(t, this.name), this.pairings = new xt2(this.core, this.logger, this.name, this.storagePrefix);
  }
  get context() {
    return (0, import_logger.getLoggerContext)(this.logger);
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e } = N("NOT_INITIALIZED", this.name);
      throw new Error(e);
    }
  }
  registerRelayerEvents() {
    this.core.relayer.on(D.message, async (e) => {
      const { topic: t, message: i2 } = e;
      if (this.ignoredPayloadTypes.includes(this.core.crypto.getPayloadType(i2)))
        return;
      const s = await this.core.crypto.decode(t, i2);
      isJsonRpcRequest(s) ? (this.core.history.set(t, s), this.onRelayEventRequest({ topic: t, payload: s })) : isJsonRpcResponse(s) && (await this.core.history.resolve(s), this.onRelayEventResponse({ topic: t, payload: s }));
    });
  }
  registerExpirerEvents() {
    this.core.expirer.on(E2.expired, async (e) => {
      const { topic: t } = tt(e.target);
      t && this.pairings.keys.includes(t) && (await this.deletePairing(t, true), this.events.emit("pairing_expire", { topic: t }));
    });
  }
};
var At2 = class extends h {
  constructor(e, t) {
    super(e, t), this.core = e, this.logger = t, this.records = /* @__PURE__ */ new Map(), this.events = new import_events5.EventEmitter(), this.name = pt2, this.version = Dt2, this.cached = [], this.initialized = false, this.storagePrefix = P, this.init = async () => {
      this.initialized || (this.logger.trace("Initialized"), await this.restore(), this.cached.forEach((i2) => this.records.set(i2.id, i2)), this.cached = [], this.registerEventListeners(), this.initialized = true);
    }, this.set = (i2, s, n2) => {
      if (this.isInitialized(), this.logger.debug("Setting JSON-RPC request history record"), this.logger.trace({ type: "method", method: "set", topic: i2, request: s, chainId: n2 }), this.records.has(s.id))
        return;
      const a2 = { id: s.id, topic: i2, request: { method: s.method, params: s.params || null }, chainId: n2 };
      this.records.set(a2.id, a2), this.events.emit(C2.created, a2);
    }, this.resolve = async (i2) => {
      if (this.isInitialized(), this.logger.debug("Updating JSON-RPC response history record"), this.logger.trace({ type: "method", method: "update", response: i2 }), !this.records.has(i2.id))
        return;
      const s = await this.getRecord(i2.id);
      typeof s.response > "u" && (s.response = isJsonRpcError(i2) ? { error: i2.error } : { result: i2.result }, this.records.set(s.id, s), this.events.emit(C2.updated, s));
    }, this.get = async (i2, s) => (this.isInitialized(), this.logger.debug("Getting record"), this.logger.trace({ type: "method", method: "get", topic: i2, id: s }), await this.getRecord(s)), this.delete = (i2, s) => {
      this.isInitialized(), this.logger.debug("Deleting record"), this.logger.trace({ type: "method", method: "delete", id: s }), this.values.forEach((n2) => {
        if (n2.topic === i2) {
          if (typeof s < "u" && n2.id !== s)
            return;
          this.records.delete(n2.id), this.events.emit(C2.deleted, n2);
        }
      });
    }, this.exists = async (i2, s) => (this.isInitialized(), this.records.has(s) ? (await this.getRecord(s)).topic === i2 : false), this.on = (i2, s) => {
      this.events.on(i2, s);
    }, this.once = (i2, s) => {
      this.events.once(i2, s);
    }, this.off = (i2, s) => {
      this.events.off(i2, s);
    }, this.removeListener = (i2, s) => {
      this.events.removeListener(i2, s);
    }, this.logger = (0, import_logger.generateChildLogger)(t, this.name);
  }
  get context() {
    return (0, import_logger.getLoggerContext)(this.logger);
  }
  get storageKey() {
    return this.storagePrefix + this.version + "//" + this.name;
  }
  get size() {
    return this.records.size;
  }
  get keys() {
    return Array.from(this.records.keys());
  }
  get values() {
    return Array.from(this.records.values());
  }
  get pending() {
    const e = [];
    return this.values.forEach((t) => {
      if (typeof t.response < "u")
        return;
      const i2 = { topic: t.topic, request: formatJsonRpcRequest(t.request.method, t.request.params, t.id), chainId: t.chainId };
      return e.push(i2);
    }), e;
  }
  async setJsonRpcRecords(e) {
    await this.core.storage.setItem(this.storageKey, e);
  }
  async getJsonRpcRecords() {
    return await this.core.storage.getItem(this.storageKey);
  }
  getRecord(e) {
    this.isInitialized();
    const t = this.records.get(e);
    if (!t) {
      const { message: i2 } = N("NO_MATCHING_KEY", `${this.name}: ${e}`);
      throw new Error(i2);
    }
    return t;
  }
  async persist() {
    await this.setJsonRpcRecords(this.values), this.events.emit(C2.sync);
  }
  async restore() {
    try {
      const e = await this.getJsonRpcRecords();
      if (typeof e > "u" || !e.length)
        return;
      if (this.records.size) {
        const { message: t } = N("RESTORE_WILL_OVERRIDE", this.name);
        throw this.logger.error(t), new Error(t);
      }
      this.cached = e, this.logger.debug(`Successfully Restored records for ${this.name}`), this.logger.trace({ type: "method", method: "restore", records: this.values });
    } catch (e) {
      this.logger.debug(`Failed to Restore records for ${this.name}`), this.logger.error(e);
    }
  }
  registerEventListeners() {
    this.events.on(C2.created, (e) => {
      const t = C2.created;
      this.logger.info(`Emitting ${t}`), this.logger.debug({ type: "event", event: t, record: e }), this.persist();
    }), this.events.on(C2.updated, (e) => {
      const t = C2.updated;
      this.logger.info(`Emitting ${t}`), this.logger.debug({ type: "event", event: t, record: e }), this.persist();
    }), this.events.on(C2.deleted, (e) => {
      const t = C2.deleted;
      this.logger.info(`Emitting ${t}`), this.logger.debug({ type: "event", event: t, record: e }), this.persist();
    });
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e } = N("NOT_INITIALIZED", this.name);
      throw new Error(e);
    }
  }
};
var zt = class extends E {
  constructor(e, t) {
    super(e, t), this.core = e, this.logger = t, this.expirations = /* @__PURE__ */ new Map(), this.events = new import_events5.EventEmitter(), this.name = yt, this.version = bt2, this.cached = [], this.initialized = false, this.storagePrefix = P, this.init = async () => {
      this.initialized || (this.logger.trace("Initialized"), await this.restore(), this.cached.forEach((i2) => this.expirations.set(i2.target, i2)), this.cached = [], this.registerEventListeners(), this.initialized = true);
    }, this.has = (i2) => {
      try {
        const s = this.formatTarget(i2);
        return typeof this.getExpiration(s) < "u";
      } catch {
        return false;
      }
    }, this.set = (i2, s) => {
      this.isInitialized();
      const n2 = this.formatTarget(i2), a2 = { target: n2, expiry: s };
      this.expirations.set(n2, a2), this.checkExpiry(n2, a2), this.events.emit(E2.created, { target: n2, expiration: a2 });
    }, this.get = (i2) => {
      this.isInitialized();
      const s = this.formatTarget(i2);
      return this.getExpiration(s);
    }, this.del = (i2) => {
      if (this.isInitialized(), this.has(i2)) {
        const s = this.formatTarget(i2), n2 = this.getExpiration(s);
        this.expirations.delete(s), this.events.emit(E2.deleted, { target: s, expiration: n2 });
      }
    }, this.on = (i2, s) => {
      this.events.on(i2, s);
    }, this.once = (i2, s) => {
      this.events.once(i2, s);
    }, this.off = (i2, s) => {
      this.events.off(i2, s);
    }, this.removeListener = (i2, s) => {
      this.events.removeListener(i2, s);
    }, this.logger = (0, import_logger.generateChildLogger)(t, this.name);
  }
  get context() {
    return (0, import_logger.getLoggerContext)(this.logger);
  }
  get storageKey() {
    return this.storagePrefix + this.version + "//" + this.name;
  }
  get length() {
    return this.expirations.size;
  }
  get keys() {
    return Array.from(this.expirations.keys());
  }
  get values() {
    return Array.from(this.expirations.values());
  }
  formatTarget(e) {
    if (typeof e == "string")
      return et(e);
    if (typeof e == "number")
      return nt(e);
    const { message: t } = N("UNKNOWN_TYPE", `Target type: ${typeof e}`);
    throw new Error(t);
  }
  async setExpirations(e) {
    await this.core.storage.setItem(this.storageKey, e);
  }
  async getExpirations() {
    return await this.core.storage.getItem(this.storageKey);
  }
  async persist() {
    await this.setExpirations(this.values), this.events.emit(E2.sync);
  }
  async restore() {
    try {
      const e = await this.getExpirations();
      if (typeof e > "u" || !e.length)
        return;
      if (this.expirations.size) {
        const { message: t } = N("RESTORE_WILL_OVERRIDE", this.name);
        throw this.logger.error(t), new Error(t);
      }
      this.cached = e, this.logger.debug(`Successfully Restored expirations for ${this.name}`), this.logger.trace({ type: "method", method: "restore", expirations: this.values });
    } catch (e) {
      this.logger.debug(`Failed to Restore expirations for ${this.name}`), this.logger.error(e);
    }
  }
  getExpiration(e) {
    const t = this.expirations.get(e);
    if (!t) {
      const { message: i2 } = N("NO_MATCHING_KEY", `${this.name}: ${e}`);
      throw this.logger.error(i2), new Error(i2);
    }
    return t;
  }
  checkExpiry(e, t) {
    const { expiry: i2 } = t;
    (0, import_time3.toMiliseconds)(i2) - Date.now() <= 0 && this.expire(e, t);
  }
  expire(e, t) {
    this.expirations.delete(e), this.events.emit(E2.expired, { target: e, expiration: t });
  }
  checkExpirations() {
    this.core.relayer.connected && this.expirations.forEach((e, t) => this.checkExpiry(t, e));
  }
  registerEventListeners() {
    this.core.heartbeat.on(import_heartbeat.HEARTBEAT_EVENTS.pulse, () => this.checkExpirations()), this.events.on(E2.created, (e) => {
      const t = E2.created;
      this.logger.info(`Emitting ${t}`), this.logger.debug({ type: "event", event: t, data: e }), this.persist();
    }), this.events.on(E2.expired, (e) => {
      const t = E2.expired;
      this.logger.info(`Emitting ${t}`), this.logger.debug({ type: "event", event: t, data: e }), this.persist();
    }), this.events.on(E2.deleted, (e) => {
      const t = E2.deleted;
      this.logger.info(`Emitting ${t}`), this.logger.debug({ type: "event", event: t, data: e }), this.persist();
    });
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e } = N("NOT_INITIALIZED", this.name);
      throw new Error(e);
    }
  }
};
var Nt = class extends y {
  constructor(e, t) {
    super(e, t), this.projectId = e, this.logger = t, this.name = J2, this.initialized = false, this.init = async (i2) => {
      je() || !Ce() || (this.verifyUrl = (i2 == null ? void 0 : i2.verifyUrl) || le2, await this.createIframe());
    }, this.register = async (i2) => {
      var s;
      this.initialized || await this.init(), this.iframe && ((s = this.iframe.contentWindow) == null || s.postMessage(i2.attestationId, this.verifyUrl), this.logger.info(`postMessage sent: ${i2.attestationId} ${this.verifyUrl}`));
    }, this.resolve = async (i2) => {
      var s;
      if (this.isDevEnv)
        return "";
      this.logger.info(`resolving attestation: ${i2.attestationId}`);
      const n2 = this.startAbortTimer(import_time3.FIVE_SECONDS), a2 = await fetch(`${this.verifyUrl}/attestation/${i2.attestationId}`, { signal: this.abortController.signal });
      return clearTimeout(n2), a2.status === 200 ? (s = await a2.json()) == null ? void 0 : s.origin : "";
    }, this.createIframe = async () => {
      try {
        await Promise.race([new Promise((i2, s) => {
          if (document.getElementById(J2))
            return i2();
          const n2 = document.createElement("iframe");
          n2.setAttribute("id", J2), n2.setAttribute("src", `${this.verifyUrl}/${this.projectId}`), n2.style.display = "none", n2.addEventListener("load", () => {
            this.initialized = true, i2();
          }), n2.addEventListener("error", (a2) => {
            s(a2);
          }), document.body.append(n2), this.iframe = n2;
        }), new Promise((i2) => {
          setTimeout(() => i2("iframe load timeout"), (0, import_time3.toMiliseconds)(import_time3.ONE_SECOND / 2));
        })]);
      } catch (i2) {
        this.logger.error(`Verify iframe failed to load: ${this.verifyUrl}`), this.logger.error(i2);
      }
    }, this.logger = (0, import_logger.generateChildLogger)(t, this.name), this.verifyUrl = le2, this.abortController = new AbortController(), this.isDevEnv = X() && process.env.IS_VITEST;
  }
  get context() {
    return (0, import_logger.getLoggerContext)(this.logger);
  }
  startAbortTimer(e) {
    return setTimeout(() => this.abortController.abort(), (0, import_time3.toMiliseconds)(e));
  }
};
var Er = Object.defineProperty;
var Ut2 = Object.getOwnPropertySymbols;
var wr = Object.prototype.hasOwnProperty;
var vr = Object.prototype.propertyIsEnumerable;
var Lt2 = (r, e, t) => e in r ? Er(r, e, { enumerable: true, configurable: true, writable: true, value: t }) : r[e] = t;
var Ft2 = (r, e) => {
  for (var t in e || (e = {}))
    wr.call(e, t) && Lt2(r, t, e[t]);
  if (Ut2)
    for (var t of Ut2(e))
      vr.call(e, t) && Lt2(r, t, e[t]);
  return r;
};
var H2 = class extends n {
  constructor(e) {
    super(e), this.protocol = he, this.version = qe2, this.name = Y2, this.events = new import_events5.EventEmitter(), this.initialized = false, this.on = (i2, s) => this.events.on(i2, s), this.once = (i2, s) => this.events.once(i2, s), this.off = (i2, s) => this.events.off(i2, s), this.removeListener = (i2, s) => this.events.removeListener(i2, s), this.projectId = e == null ? void 0 : e.projectId, this.relayUrl = (e == null ? void 0 : e.relayUrl) || ue2;
    const t = typeof (e == null ? void 0 : e.logger) < "u" && typeof (e == null ? void 0 : e.logger) != "string" ? e.logger : (0, import_logger.pino)((0, import_logger.getDefaultLoggerOptions)({ level: (e == null ? void 0 : e.logger) || Ge.logger }));
    this.logger = (0, import_logger.generateChildLogger)(t, this.name), this.heartbeat = new import_heartbeat.HeartBeat(), this.crypto = new ft2(this, this.logger, e == null ? void 0 : e.keychain), this.history = new At2(this, this.logger), this.expirer = new zt(this, this.logger), this.storage = e != null && e.storage ? e.storage : new import_keyvaluestorage.default(Ft2(Ft2({}, Ye2), e == null ? void 0 : e.storageOptions)), this.relayer = new Rt2({ core: this, logger: this.logger, relayUrl: this.relayUrl, projectId: this.projectId }), this.pairing = new Ot(this, this.logger), this.verify = new Nt(this.projectId || "", this.logger);
  }
  static async init(e) {
    const t = new H2(e);
    return await t.initialize(), t;
  }
  get context() {
    return (0, import_logger.getLoggerContext)(this.logger);
  }
  async start() {
    this.initialized || await this.initialize();
  }
  async initialize() {
    this.logger.trace("Initialized");
    try {
      await this.crypto.init(), await this.history.init(), await this.expirer.init(), await this.relayer.init(), await this.heartbeat.init(), await this.pairing.init(), this.initialized = true, this.logger.info("Core Initialization Success");
    } catch (e) {
      throw this.logger.warn(`Core Initialization Failure at epoch ${Date.now()}`, e), this.logger.error(e.message), e;
    }
  }
};
var Ir = H2;

// node_modules/.pnpm/@walletconnect+sign-client@2.7.3/node_modules/@walletconnect/sign-client/dist/index.es.js
var import_logger2 = __toESM(require_cjs4());
var import_events6 = __toESM(require_events());
var import_time4 = __toESM(require_cjs2());
var j2 = "wc";
var k2 = 2;
var J3 = "client";
var b3 = `${j2}@${k2}:${J3}:`;
var C3 = { name: J3, logger: "error", controller: false, relayUrl: "wss://relay.walletconnect.com" };
var je3 = { session_proposal: "session_proposal", session_update: "session_update", session_extend: "session_extend", session_ping: "session_ping", session_delete: "session_delete", session_expire: "session_expire", session_request: "session_request", session_request_sent: "session_request_sent", session_event: "session_event", proposal_expire: "proposal_expire" };
var ke2 = { database: ":memory:" };
var Je3 = { created: "history_created", updated: "history_updated", deleted: "history_deleted", sync: "history_sync" };
var Xe3 = "history";
var He3 = "0.3";
var ee2 = "proposal";
var Fe3 = import_time4.THIRTY_DAYS;
var se2 = "Proposal expired";
var te = "session";
var A2 = import_time4.SEVEN_DAYS;
var ie2 = "engine";
var O = { wc_sessionPropose: { req: { ttl: import_time4.FIVE_MINUTES, prompt: true, tag: 1100 }, res: { ttl: import_time4.FIVE_MINUTES, prompt: false, tag: 1101 } }, wc_sessionSettle: { req: { ttl: import_time4.FIVE_MINUTES, prompt: false, tag: 1102 }, res: { ttl: import_time4.FIVE_MINUTES, prompt: false, tag: 1103 } }, wc_sessionUpdate: { req: { ttl: import_time4.ONE_DAY, prompt: false, tag: 1104 }, res: { ttl: import_time4.ONE_DAY, prompt: false, tag: 1105 } }, wc_sessionExtend: { req: { ttl: import_time4.ONE_DAY, prompt: false, tag: 1106 }, res: { ttl: import_time4.ONE_DAY, prompt: false, tag: 1107 } }, wc_sessionRequest: { req: { ttl: import_time4.FIVE_MINUTES, prompt: true, tag: 1108 }, res: { ttl: import_time4.FIVE_MINUTES, prompt: false, tag: 1109 } }, wc_sessionEvent: { req: { ttl: import_time4.FIVE_MINUTES, prompt: true, tag: 1110 }, res: { ttl: import_time4.FIVE_MINUTES, prompt: false, tag: 1111 } }, wc_sessionDelete: { req: { ttl: import_time4.ONE_DAY, prompt: false, tag: 1112 }, res: { ttl: import_time4.ONE_DAY, prompt: false, tag: 1113 } }, wc_sessionPing: { req: { ttl: import_time4.THIRTY_SECONDS, prompt: false, tag: 1114 }, res: { ttl: import_time4.THIRTY_SECONDS, prompt: false, tag: 1115 } } };
var G3 = { min: import_time4.FIVE_MINUTES, max: import_time4.SEVEN_DAYS };
var re2 = "request";
var ne3 = ["wc_sessionPropose", "wc_sessionRequest", "wc_authRequest"];
var Be2 = Object.defineProperty;
var Qe2 = Object.defineProperties;
var We3 = Object.getOwnPropertyDescriptors;
var oe3 = Object.getOwnPropertySymbols;
var Ze3 = Object.prototype.hasOwnProperty;
var es2 = Object.prototype.propertyIsEnumerable;
var ae3 = (d2, r, e) => r in d2 ? Be2(d2, r, { enumerable: true, configurable: true, writable: true, value: e }) : d2[r] = e;
var w = (d2, r) => {
  for (var e in r || (r = {}))
    Ze3.call(r, e) && ae3(d2, e, r[e]);
  if (oe3)
    for (var e of oe3(r))
      es2.call(r, e) && ae3(d2, e, r[e]);
  return d2;
};
var X2 = (d2, r) => Qe2(d2, We3(r));
var ss2 = class extends S {
  constructor(r) {
    super(r), this.name = ie2, this.events = new import_events6.default(), this.initialized = false, this.ignoredPayloadTypes = [U], this.init = async () => {
      this.initialized || (await this.cleanup(), this.registerRelayerEvents(), this.registerExpirerEvents(), this.client.core.pairing.register({ methods: Object.keys(O) }), this.initialized = true);
    }, this.connect = async (e) => {
      this.isInitialized();
      const s = X2(w({}, e), { requiredNamespaces: e.requiredNamespaces || {}, optionalNamespaces: e.optionalNamespaces || {} });
      await this.isValidConnect(s);
      const { pairingTopic: t, requiredNamespaces: i2, optionalNamespaces: n2, sessionProperties: a2, relays: o } = s;
      let l = t, h2, I2 = false;
      if (l && (I2 = this.client.core.pairing.pairings.get(l).active), !l || !I2) {
        const { topic: v, uri: y2 } = await this.client.core.pairing.create();
        l = v, h2 = y2;
      }
      const g2 = await this.client.core.crypto.generateKeyPair(), f3 = w({ requiredNamespaces: i2, optionalNamespaces: n2, relays: o ?? [{ protocol: it2 }], proposer: { publicKey: g2, metadata: this.client.metadata } }, a2 && { sessionProperties: a2 }), { reject: u2, resolve: V2, done: M2 } = Zn(import_time4.FIVE_MINUTES, se2);
      if (this.events.once(st("session_connect"), async ({ error: v, session: y2 }) => {
        if (v)
          u2(v);
        else if (y2) {
          y2.self.publicKey = g2;
          const H3 = X2(w({}, y2), { requiredNamespaces: y2.requiredNamespaces, optionalNamespaces: y2.optionalNamespaces });
          await this.client.session.set(y2.topic, H3), await this.setExpiry(y2.topic, y2.expiry), l && await this.client.core.pairing.updateMetadata({ topic: l, metadata: y2.peer.metadata }), V2(H3);
        }
      }), !l) {
        const { message: v } = N("NO_MATCHING_KEY", `connect() pairing topic: ${l}`);
        throw new Error(v);
      }
      const L = await this.sendRequest(l, "wc_sessionPropose", f3), ce3 = rt(import_time4.FIVE_MINUTES);
      return await this.setProposal(L, w({ id: L, expiry: ce3 }, f3)), { uri: h2, approval: M2 };
    }, this.pair = async (e) => (this.isInitialized(), await this.client.core.pairing.pair(e)), this.approve = async (e) => {
      this.isInitialized(), await this.isValidApprove(e);
      const { id: s, relayProtocol: t, namespaces: i2, sessionProperties: n2 } = e, a2 = this.client.proposal.get(s);
      let { pairingTopic: o, proposer: l, requiredNamespaces: h2, optionalNamespaces: I2 } = a2;
      o = o || "", x(h2) || (h2 = bt(i2, "approve()"));
      const g2 = await this.client.core.crypto.generateKeyPair(), f3 = l.publicKey, u2 = await this.client.core.crypto.generateSharedKey(g2, f3);
      o && s && (await this.client.core.pairing.updateMetadata({ topic: o, metadata: l.metadata }), await this.sendResult(s, o, { relay: { protocol: t ?? "irn" }, responderPublicKey: g2 }), await this.client.proposal.delete(s, R("USER_DISCONNECTED")), await this.client.core.pairing.activate({ topic: o }));
      const V2 = w({ relay: { protocol: t ?? "irn" }, namespaces: i2, requiredNamespaces: h2, optionalNamespaces: I2, pairingTopic: o, controller: { publicKey: g2, metadata: this.client.metadata }, expiry: rt(A2) }, n2 && { sessionProperties: n2 });
      await this.client.core.relayer.subscribe(u2), await this.sendRequest(u2, "wc_sessionSettle", V2);
      const M2 = X2(w({}, V2), { topic: u2, pairingTopic: o, acknowledged: false, self: V2.controller, peer: { publicKey: l.publicKey, metadata: l.metadata }, controller: g2 });
      return await this.client.session.set(u2, M2), await this.setExpiry(u2, rt(A2)), { topic: u2, acknowledged: () => new Promise((L) => L(this.client.session.get(u2))) };
    }, this.reject = async (e) => {
      this.isInitialized(), await this.isValidReject(e);
      const { id: s, reason: t } = e, { pairingTopic: i2 } = this.client.proposal.get(s);
      i2 && (await this.sendError(s, i2, t), await this.client.proposal.delete(s, R("USER_DISCONNECTED")));
    }, this.update = async (e) => {
      this.isInitialized(), await this.isValidUpdate(e);
      const { topic: s, namespaces: t } = e, i2 = await this.sendRequest(s, "wc_sessionUpdate", { namespaces: t }), { done: n2, resolve: a2, reject: o } = Zn();
      return this.events.once(st("session_update", i2), ({ error: l }) => {
        l ? o(l) : a2();
      }), await this.client.session.update(s, { namespaces: t }), { acknowledged: n2 };
    }, this.extend = async (e) => {
      this.isInitialized(), await this.isValidExtend(e);
      const { topic: s } = e, t = await this.sendRequest(s, "wc_sessionExtend", {}), { done: i2, resolve: n2, reject: a2 } = Zn();
      return this.events.once(st("session_extend", t), ({ error: o }) => {
        o ? a2(o) : n2();
      }), await this.setExpiry(s, rt(A2)), { acknowledged: i2 };
    }, this.request = async (e) => {
      this.isInitialized(), await this.isValidRequest(e);
      const { chainId: s, request: t, topic: i2, expiry: n2 } = e, a2 = await this.sendRequest(i2, "wc_sessionRequest", { request: t, chainId: s }, n2), { done: o, resolve: l, reject: h2 } = Zn(n2);
      return this.events.once(st("session_request", a2), ({ error: I2, result: g2 }) => {
        I2 ? h2(I2) : l(g2);
      }), this.client.events.emit("session_request_sent", { topic: i2, request: t, chainId: s, id: a2 }), await o();
    }, this.respond = async (e) => {
      this.isInitialized(), await this.isValidRespond(e);
      const { topic: s, response: t } = e, { id: i2 } = t;
      isJsonRpcResult(t) ? await this.sendResult(i2, s, t.result) : isJsonRpcError(t) && await this.sendError(i2, s, t.error), this.deletePendingSessionRequest(e.response.id, { message: "fulfilled", code: 0 });
    }, this.ping = async (e) => {
      this.isInitialized(), await this.isValidPing(e);
      const { topic: s } = e;
      if (this.client.session.keys.includes(s)) {
        const t = await this.sendRequest(s, "wc_sessionPing", {}), { done: i2, resolve: n2, reject: a2 } = Zn();
        this.events.once(st("session_ping", t), ({ error: o }) => {
          o ? a2(o) : n2();
        }), await i2();
      } else
        this.client.core.pairing.pairings.keys.includes(s) && await this.client.core.pairing.ping({ topic: s });
    }, this.emit = async (e) => {
      this.isInitialized(), await this.isValidEmit(e);
      const { topic: s, event: t, chainId: i2 } = e;
      await this.sendRequest(s, "wc_sessionEvent", { event: t, chainId: i2 });
    }, this.disconnect = async (e) => {
      this.isInitialized(), await this.isValidDisconnect(e);
      const { topic: s } = e;
      this.client.session.keys.includes(s) ? (await this.sendRequest(s, "wc_sessionDelete", R("USER_DISCONNECTED")), await this.deleteSession(s)) : await this.client.core.pairing.disconnect({ topic: s });
    }, this.find = (e) => (this.isInitialized(), this.client.session.getAll().filter((s) => Pt(s, e))), this.getPendingSessionRequests = () => (this.isInitialized(), this.client.pendingRequest.getAll()), this.deleteSession = async (e, s) => {
      const { self: t } = this.client.session.get(e);
      await this.client.core.relayer.unsubscribe(e), await Promise.all([this.client.session.delete(e, R("USER_DISCONNECTED")), this.client.core.crypto.deleteKeyPair(t.publicKey), this.client.core.crypto.deleteSymKey(e), s ? Promise.resolve() : this.client.core.expirer.del(e)]);
    }, this.deleteProposal = async (e, s) => {
      await Promise.all([this.client.proposal.delete(e, R("USER_DISCONNECTED")), s ? Promise.resolve() : this.client.core.expirer.del(e)]);
    }, this.deletePendingSessionRequest = async (e, s, t = false) => {
      await Promise.all([this.client.pendingRequest.delete(e, s), t ? Promise.resolve() : this.client.core.expirer.del(e)]);
    }, this.setExpiry = async (e, s) => {
      this.client.session.keys.includes(e) && await this.client.session.update(e, { expiry: s }), this.client.core.expirer.set(e, s);
    }, this.setProposal = async (e, s) => {
      await this.client.proposal.set(e, s), this.client.core.expirer.set(e, s.expiry);
    }, this.setPendingSessionRequest = async (e) => {
      const s = O.wc_sessionRequest.req.ttl, { id: t, topic: i2, params: n2 } = e;
      await this.client.pendingRequest.set(t, { id: t, topic: i2, params: n2 }), s && this.client.core.expirer.set(t, rt(s));
    }, this.sendRequest = async (e, s, t, i2) => {
      const n2 = formatJsonRpcRequest(s, t);
      if (Ce() && ne3.includes(s)) {
        const l = wn(JSON.stringify(n2));
        await this.client.core.verify.register({ attestationId: l });
      }
      const a2 = await this.client.core.crypto.encode(e, n2), o = O[s].req;
      return i2 && (o.ttl = i2), this.client.core.history.set(e, n2), this.client.core.relayer.publish(e, a2, o), n2.id;
    }, this.sendResult = async (e, s, t) => {
      const i2 = formatJsonRpcResult(e, t), n2 = await this.client.core.crypto.encode(s, i2), a2 = await this.client.core.history.get(s, e), o = O[a2.request.method].res;
      this.client.core.relayer.publish(s, n2, o), await this.client.core.history.resolve(i2);
    }, this.sendError = async (e, s, t) => {
      const i2 = formatJsonRpcError(e, t), n2 = await this.client.core.crypto.encode(s, i2), a2 = await this.client.core.history.get(s, e), o = O[a2.request.method].res;
      this.client.core.relayer.publish(s, n2, o), await this.client.core.history.resolve(i2);
    }, this.cleanup = async () => {
      const e = [], s = [];
      this.client.session.getAll().forEach((t) => {
        ot(t.expiry) && e.push(t.topic);
      }), this.client.proposal.getAll().forEach((t) => {
        ot(t.expiry) && s.push(t.id);
      }), await Promise.all([...e.map((t) => this.deleteSession(t)), ...s.map((t) => this.deleteProposal(t))]);
    }, this.onRelayEventRequest = (e) => {
      const { topic: s, payload: t } = e, i2 = t.method;
      switch (i2) {
        case "wc_sessionPropose":
          return this.onSessionProposeRequest(s, t);
        case "wc_sessionSettle":
          return this.onSessionSettleRequest(s, t);
        case "wc_sessionUpdate":
          return this.onSessionUpdateRequest(s, t);
        case "wc_sessionExtend":
          return this.onSessionExtendRequest(s, t);
        case "wc_sessionPing":
          return this.onSessionPingRequest(s, t);
        case "wc_sessionDelete":
          return this.onSessionDeleteRequest(s, t);
        case "wc_sessionRequest":
          return this.onSessionRequest(s, t);
        case "wc_sessionEvent":
          return this.onSessionEventRequest(s, t);
        default:
          return this.client.logger.info(`Unsupported request method ${i2}`);
      }
    }, this.onRelayEventResponse = async (e) => {
      const { topic: s, payload: t } = e, i2 = (await this.client.core.history.get(s, t.id)).request.method;
      switch (i2) {
        case "wc_sessionPropose":
          return this.onSessionProposeResponse(s, t);
        case "wc_sessionSettle":
          return this.onSessionSettleResponse(s, t);
        case "wc_sessionUpdate":
          return this.onSessionUpdateResponse(s, t);
        case "wc_sessionExtend":
          return this.onSessionExtendResponse(s, t);
        case "wc_sessionPing":
          return this.onSessionPingResponse(s, t);
        case "wc_sessionRequest":
          return this.onSessionRequestResponse(s, t);
        default:
          return this.client.logger.info(`Unsupported response method ${i2}`);
      }
    }, this.onSessionProposeRequest = async (e, s) => {
      const { params: t, id: i2 } = s;
      try {
        this.isValidConnect(w({}, s.params));
        const n2 = rt(import_time4.FIVE_MINUTES), a2 = w({ id: i2, pairingTopic: e, expiry: n2 }, t);
        await this.setProposal(i2, a2);
        const o = wn(JSON.stringify(s)), l = await this.getVerifyContext(o, a2.proposer.metadata);
        this.client.events.emit("session_proposal", { id: i2, params: a2, context: l });
      } catch (n2) {
        await this.sendError(i2, e, n2), this.client.logger.error(n2);
      }
    }, this.onSessionProposeResponse = async (e, s) => {
      const { id: t } = s;
      if (isJsonRpcResult(s)) {
        const { result: i2 } = s;
        this.client.logger.trace({ type: "method", method: "onSessionProposeResponse", result: i2 });
        const n2 = this.client.proposal.get(t);
        this.client.logger.trace({ type: "method", method: "onSessionProposeResponse", proposal: n2 });
        const a2 = n2.proposer.publicKey;
        this.client.logger.trace({ type: "method", method: "onSessionProposeResponse", selfPublicKey: a2 });
        const o = i2.responderPublicKey;
        this.client.logger.trace({ type: "method", method: "onSessionProposeResponse", peerPublicKey: o });
        const l = await this.client.core.crypto.generateSharedKey(a2, o);
        this.client.logger.trace({ type: "method", method: "onSessionProposeResponse", sessionTopic: l });
        const h2 = await this.client.core.relayer.subscribe(l);
        this.client.logger.trace({ type: "method", method: "onSessionProposeResponse", subscriptionId: h2 }), await this.client.core.pairing.activate({ topic: e });
      } else
        isJsonRpcError(s) && (await this.client.proposal.delete(t, R("USER_DISCONNECTED")), this.events.emit(st("session_connect"), { error: s.error }));
    }, this.onSessionSettleRequest = async (e, s) => {
      const { id: t, params: i2 } = s;
      try {
        this.isValidSessionSettleRequest(i2);
        const { relay: n2, controller: a2, expiry: o, namespaces: l, requiredNamespaces: h2, optionalNamespaces: I2, sessionProperties: g2, pairingTopic: f3 } = s.params, u2 = w({ topic: e, relay: n2, expiry: o, namespaces: l, acknowledged: true, pairingTopic: f3, requiredNamespaces: h2, optionalNamespaces: I2, controller: a2.publicKey, self: { publicKey: "", metadata: this.client.metadata }, peer: { publicKey: a2.publicKey, metadata: a2.metadata } }, g2 && { sessionProperties: g2 });
        await this.sendResult(s.id, e, true), this.events.emit(st("session_connect"), { session: u2 });
      } catch (n2) {
        await this.sendError(t, e, n2), this.client.logger.error(n2);
      }
    }, this.onSessionSettleResponse = async (e, s) => {
      const { id: t } = s;
      isJsonRpcResult(s) ? (await this.client.session.update(e, { acknowledged: true }), this.events.emit(st("session_approve", t), {})) : isJsonRpcError(s) && (await this.client.session.delete(e, R("USER_DISCONNECTED")), this.events.emit(st("session_approve", t), { error: s.error }));
    }, this.onSessionUpdateRequest = async (e, s) => {
      const { params: t, id: i2 } = s;
      try {
        this.isValidUpdate(w({ topic: e }, t)), await this.client.session.update(e, { namespaces: t.namespaces }), await this.sendResult(i2, e, true), this.client.events.emit("session_update", { id: i2, topic: e, params: t });
      } catch (n2) {
        await this.sendError(i2, e, n2), this.client.logger.error(n2);
      }
    }, this.onSessionUpdateResponse = (e, s) => {
      const { id: t } = s;
      isJsonRpcResult(s) ? this.events.emit(st("session_update", t), {}) : isJsonRpcError(s) && this.events.emit(st("session_update", t), { error: s.error });
    }, this.onSessionExtendRequest = async (e, s) => {
      const { id: t } = s;
      try {
        this.isValidExtend({ topic: e }), await this.setExpiry(e, rt(A2)), await this.sendResult(t, e, true), this.client.events.emit("session_extend", { id: t, topic: e });
      } catch (i2) {
        await this.sendError(t, e, i2), this.client.logger.error(i2);
      }
    }, this.onSessionExtendResponse = (e, s) => {
      const { id: t } = s;
      isJsonRpcResult(s) ? this.events.emit(st("session_extend", t), {}) : isJsonRpcError(s) && this.events.emit(st("session_extend", t), { error: s.error });
    }, this.onSessionPingRequest = async (e, s) => {
      const { id: t } = s;
      try {
        this.isValidPing({ topic: e }), await this.sendResult(t, e, true), this.client.events.emit("session_ping", { id: t, topic: e });
      } catch (i2) {
        await this.sendError(t, e, i2), this.client.logger.error(i2);
      }
    }, this.onSessionPingResponse = (e, s) => {
      const { id: t } = s;
      setTimeout(() => {
        isJsonRpcResult(s) ? this.events.emit(st("session_ping", t), {}) : isJsonRpcError(s) && this.events.emit(st("session_ping", t), { error: s.error });
      }, 500);
    }, this.onSessionDeleteRequest = async (e, s) => {
      const { id: t } = s;
      try {
        this.isValidDisconnect({ topic: e, reason: s.params }), await Promise.all([new Promise((i2) => {
          this.client.core.relayer.once(D.publish, async () => {
            i2(await this.deleteSession(e));
          });
        }), this.sendResult(t, e, true)]), this.client.events.emit("session_delete", { id: t, topic: e });
      } catch (i2) {
        await this.sendError(t, e, i2), this.client.logger.error(i2);
      }
    }, this.onSessionRequest = async (e, s) => {
      const { id: t, params: i2 } = s;
      try {
        this.isValidRequest(w({ topic: e }, i2)), await this.setPendingSessionRequest({ id: t, topic: e, params: i2 });
        const n2 = wn(JSON.stringify(s)), a2 = this.client.session.get(e), o = await this.getVerifyContext(n2, a2.peer.metadata);
        this.client.events.emit("session_request", { id: t, topic: e, params: i2, context: o });
      } catch (n2) {
        await this.sendError(t, e, n2), this.client.logger.error(n2);
      }
    }, this.onSessionRequestResponse = (e, s) => {
      const { id: t } = s;
      isJsonRpcResult(s) ? this.events.emit(st("session_request", t), { result: s.result }) : isJsonRpcError(s) && this.events.emit(st("session_request", t), { error: s.error });
    }, this.onSessionEventRequest = async (e, s) => {
      const { id: t, params: i2 } = s;
      try {
        this.isValidEmit(w({ topic: e }, i2)), this.client.events.emit("session_event", { id: t, topic: e, params: i2 });
      } catch (n2) {
        await this.sendError(t, e, n2), this.client.logger.error(n2);
      }
    }, this.isValidConnect = async (e) => {
      if (!Ct(e)) {
        const { message: o } = N("MISSING_OR_INVALID", `connect() params: ${JSON.stringify(e)}`);
        throw new Error(o);
      }
      const { pairingTopic: s, requiredNamespaces: t, optionalNamespaces: i2, sessionProperties: n2, relays: a2 } = e;
      if (S2(s) || await this.isValidPairingTopic(s), !wt(a2, true)) {
        const { message: o } = N("MISSING_OR_INVALID", `connect() relays: ${a2}`);
        throw new Error(o);
      }
      !S2(t) && x(t) !== 0 && this.validateNamespaces(t, "requiredNamespaces"), !S2(i2) && x(i2) !== 0 && this.validateNamespaces(i2, "optionalNamespaces"), S2(n2) || this.validateSessionProps(n2, "sessionProperties");
    }, this.validateNamespaces = (e, s) => {
      const t = _t(e, "connect()", s);
      if (t)
        throw new Error(t.message);
    }, this.isValidApprove = async (e) => {
      if (!Ct(e))
        throw new Error(N("MISSING_OR_INVALID", `approve() params: ${e}`).message);
      const { id: s, namespaces: t, relayProtocol: i2, sessionProperties: n2 } = e;
      await this.isValidProposalId(s);
      const a2 = this.client.proposal.get(s), o = on(t, "approve()");
      if (o)
        throw new Error(o.message);
      const l = cn(a2.requiredNamespaces, t, "approve()");
      if (l)
        throw new Error(l.message);
      if (!m(i2, true)) {
        const { message: h2 } = N("MISSING_OR_INVALID", `approve() relayProtocol: ${i2}`);
        throw new Error(h2);
      }
      S2(n2) || this.validateSessionProps(n2, "sessionProperties");
    }, this.isValidReject = async (e) => {
      if (!Ct(e)) {
        const { message: i2 } = N("MISSING_OR_INVALID", `reject() params: ${e}`);
        throw new Error(i2);
      }
      const { id: s, reason: t } = e;
      if (await this.isValidProposalId(s), !$t(t)) {
        const { message: i2 } = N("MISSING_OR_INVALID", `reject() reason: ${JSON.stringify(t)}`);
        throw new Error(i2);
      }
    }, this.isValidSessionSettleRequest = (e) => {
      if (!Ct(e)) {
        const { message: l } = N("MISSING_OR_INVALID", `onSessionSettleRequest() params: ${e}`);
        throw new Error(l);
      }
      const { relay: s, controller: t, namespaces: i2, expiry: n2 } = e;
      if (!sn(s)) {
        const { message: l } = N("MISSING_OR_INVALID", "onSessionSettleRequest() relay protocol should be a string");
        throw new Error(l);
      }
      const a2 = Ut(t, "onSessionSettleRequest()");
      if (a2)
        throw new Error(a2.message);
      const o = on(i2, "onSessionSettleRequest()");
      if (o)
        throw new Error(o.message);
      if (ot(n2)) {
        const { message: l } = N("EXPIRED", "onSessionSettleRequest()");
        throw new Error(l);
      }
    }, this.isValidUpdate = async (e) => {
      if (!Ct(e)) {
        const { message: o } = N("MISSING_OR_INVALID", `update() params: ${e}`);
        throw new Error(o);
      }
      const { topic: s, namespaces: t } = e;
      await this.isValidSessionTopic(s);
      const i2 = this.client.session.get(s), n2 = on(t, "update()");
      if (n2)
        throw new Error(n2.message);
      const a2 = cn(i2.requiredNamespaces, t, "update()");
      if (a2)
        throw new Error(a2.message);
    }, this.isValidExtend = async (e) => {
      if (!Ct(e)) {
        const { message: t } = N("MISSING_OR_INVALID", `extend() params: ${e}`);
        throw new Error(t);
      }
      const { topic: s } = e;
      await this.isValidSessionTopic(s);
    }, this.isValidRequest = async (e) => {
      if (!Ct(e)) {
        const { message: o } = N("MISSING_OR_INVALID", `request() params: ${e}`);
        throw new Error(o);
      }
      const { topic: s, request: t, chainId: i2, expiry: n2 } = e;
      await this.isValidSessionTopic(s);
      const { namespaces: a2 } = this.client.session.get(s);
      if (!Kt(a2, i2)) {
        const { message: o } = N("MISSING_OR_INVALID", `request() chainId: ${i2}`);
        throw new Error(o);
      }
      if (!Dt(t)) {
        const { message: o } = N("MISSING_OR_INVALID", `request() ${JSON.stringify(t)}`);
        throw new Error(o);
      }
      if (!kt(a2, i2, t.method)) {
        const { message: o } = N("MISSING_OR_INVALID", `request() method: ${t.method}`);
        throw new Error(o);
      }
      if (n2 && !Ht(n2, G3)) {
        const { message: o } = N("MISSING_OR_INVALID", `request() expiry: ${n2}. Expiry must be a number (in seconds) between ${G3.min} and ${G3.max}`);
        throw new Error(o);
      }
    }, this.isValidRespond = async (e) => {
      if (!Ct(e)) {
        const { message: i2 } = N("MISSING_OR_INVALID", `respond() params: ${e}`);
        throw new Error(i2);
      }
      const { topic: s, response: t } = e;
      if (await this.isValidSessionTopic(s), !Vt(t)) {
        const { message: i2 } = N("MISSING_OR_INVALID", `respond() response: ${JSON.stringify(t)}`);
        throw new Error(i2);
      }
    }, this.isValidPing = async (e) => {
      if (!Ct(e)) {
        const { message: t } = N("MISSING_OR_INVALID", `ping() params: ${e}`);
        throw new Error(t);
      }
      const { topic: s } = e;
      await this.isValidSessionOrPairingTopic(s);
    }, this.isValidEmit = async (e) => {
      if (!Ct(e)) {
        const { message: a2 } = N("MISSING_OR_INVALID", `emit() params: ${e}`);
        throw new Error(a2);
      }
      const { topic: s, event: t, chainId: i2 } = e;
      await this.isValidSessionTopic(s);
      const { namespaces: n2 } = this.client.session.get(s);
      if (!Kt(n2, i2)) {
        const { message: a2 } = N("MISSING_OR_INVALID", `emit() chainId: ${i2}`);
        throw new Error(a2);
      }
      if (!Mt(t)) {
        const { message: a2 } = N("MISSING_OR_INVALID", `emit() event: ${JSON.stringify(t)}`);
        throw new Error(a2);
      }
      if (!Lt(n2, i2, t.name)) {
        const { message: a2 } = N("MISSING_OR_INVALID", `emit() event: ${JSON.stringify(t)}`);
        throw new Error(a2);
      }
    }, this.isValidDisconnect = async (e) => {
      if (!Ct(e)) {
        const { message: t } = N("MISSING_OR_INVALID", `disconnect() params: ${e}`);
        throw new Error(t);
      }
      const { topic: s } = e;
      await this.isValidSessionOrPairingTopic(s);
    }, this.getVerifyContext = async (e, s) => {
      const t = { verified: { verifyUrl: s.verifyUrl || "", validation: "UNKNOWN", origin: s.url || "" } };
      try {
        const i2 = await this.client.core.verify.resolve({ attestationId: e, verifyUrl: s.verifyUrl });
        i2 && (t.verified.origin = i2, t.verified.validation = i2 === s.url ? "VALID" : "INVALID");
      } catch (i2) {
        this.client.logger.error(i2);
      }
      return this.client.logger.info(`Verify context: ${JSON.stringify(t)}`), t;
    }, this.validateSessionProps = (e, s) => {
      Object.values(e).forEach((t) => {
        if (!m(t, false)) {
          const { message: i2 } = N("MISSING_OR_INVALID", `${s} must be in Record<string, string> format. Received: ${JSON.stringify(t)}`);
          throw new Error(i2);
        }
      });
    };
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: r } = N("NOT_INITIALIZED", this.name);
      throw new Error(r);
    }
  }
  registerRelayerEvents() {
    this.client.core.relayer.on(D.message, async (r) => {
      const { topic: e, message: s } = r;
      if (this.ignoredPayloadTypes.includes(this.client.core.crypto.getPayloadType(s)))
        return;
      const t = await this.client.core.crypto.decode(e, s);
      isJsonRpcRequest(t) ? (this.client.core.history.set(e, t), this.onRelayEventRequest({ topic: e, payload: t })) : isJsonRpcResponse(t) && (await this.client.core.history.resolve(t), this.onRelayEventResponse({ topic: e, payload: t }));
    });
  }
  registerExpirerEvents() {
    this.client.core.expirer.on(E2.expired, async (r) => {
      const { topic: e, id: s } = tt(r.target);
      if (s && this.client.pendingRequest.keys.includes(s))
        return await this.deletePendingSessionRequest(s, N("EXPIRED"), true);
      e ? this.client.session.keys.includes(e) && (await this.deleteSession(e, true), this.client.events.emit("session_expire", { topic: e })) : s && (await this.deleteProposal(s, true), this.client.events.emit("proposal_expire", { id: s }));
    });
  }
  isValidPairingTopic(r) {
    if (!m(r, false)) {
      const { message: e } = N("MISSING_OR_INVALID", `pairing topic should be a string: ${r}`);
      throw new Error(e);
    }
    if (!this.client.core.pairing.pairings.keys.includes(r)) {
      const { message: e } = N("NO_MATCHING_KEY", `pairing topic doesn't exist: ${r}`);
      throw new Error(e);
    }
    if (ot(this.client.core.pairing.pairings.get(r).expiry)) {
      const { message: e } = N("EXPIRED", `pairing topic: ${r}`);
      throw new Error(e);
    }
  }
  async isValidSessionTopic(r) {
    if (!m(r, false)) {
      const { message: e } = N("MISSING_OR_INVALID", `session topic should be a string: ${r}`);
      throw new Error(e);
    }
    if (!this.client.session.keys.includes(r)) {
      const { message: e } = N("NO_MATCHING_KEY", `session topic doesn't exist: ${r}`);
      throw new Error(e);
    }
    if (ot(this.client.session.get(r).expiry)) {
      await this.deleteSession(r);
      const { message: e } = N("EXPIRED", `session topic: ${r}`);
      throw new Error(e);
    }
  }
  async isValidSessionOrPairingTopic(r) {
    if (this.client.session.keys.includes(r))
      await this.isValidSessionTopic(r);
    else if (this.client.core.pairing.pairings.keys.includes(r))
      this.isValidPairingTopic(r);
    else if (m(r, false)) {
      const { message: e } = N("NO_MATCHING_KEY", `session or pairing topic doesn't exist: ${r}`);
      throw new Error(e);
    } else {
      const { message: e } = N("MISSING_OR_INVALID", `session or pairing topic should be a string: ${r}`);
      throw new Error(e);
    }
  }
  async isValidProposalId(r) {
    if (!jt(r)) {
      const { message: e } = N("MISSING_OR_INVALID", `proposal id should be a number: ${r}`);
      throw new Error(e);
    }
    if (!this.client.proposal.keys.includes(r)) {
      const { message: e } = N("NO_MATCHING_KEY", `proposal id doesn't exist: ${r}`);
      throw new Error(e);
    }
    if (ot(this.client.proposal.get(r).expiry)) {
      await this.deleteProposal(r);
      const { message: e } = N("EXPIRED", `proposal id: ${r}`);
      throw new Error(e);
    }
  }
};
var ts2 = class extends xt2 {
  constructor(r, e) {
    super(r, e, ee2, b3), this.core = r, this.logger = e;
  }
};
var is2 = class extends xt2 {
  constructor(r, e) {
    super(r, e, te, b3), this.core = r, this.logger = e;
  }
};
var rs2 = class extends xt2 {
  constructor(r, e) {
    super(r, e, re2, b3, (s) => s.id), this.core = r, this.logger = e;
  }
};
var $3 = class extends b {
  constructor(r) {
    super(r), this.protocol = j2, this.version = k2, this.name = C3.name, this.events = new import_events6.EventEmitter(), this.on = (s, t) => this.events.on(s, t), this.once = (s, t) => this.events.once(s, t), this.off = (s, t) => this.events.off(s, t), this.removeListener = (s, t) => this.events.removeListener(s, t), this.removeAllListeners = (s) => this.events.removeAllListeners(s), this.connect = async (s) => {
      try {
        return await this.engine.connect(s);
      } catch (t) {
        throw this.logger.error(t.message), t;
      }
    }, this.pair = async (s) => {
      try {
        return await this.engine.pair(s);
      } catch (t) {
        throw this.logger.error(t.message), t;
      }
    }, this.approve = async (s) => {
      try {
        return await this.engine.approve(s);
      } catch (t) {
        throw this.logger.error(t.message), t;
      }
    }, this.reject = async (s) => {
      try {
        return await this.engine.reject(s);
      } catch (t) {
        throw this.logger.error(t.message), t;
      }
    }, this.update = async (s) => {
      try {
        return await this.engine.update(s);
      } catch (t) {
        throw this.logger.error(t.message), t;
      }
    }, this.extend = async (s) => {
      try {
        return await this.engine.extend(s);
      } catch (t) {
        throw this.logger.error(t.message), t;
      }
    }, this.request = async (s) => {
      try {
        return await this.engine.request(s);
      } catch (t) {
        throw this.logger.error(t.message), t;
      }
    }, this.respond = async (s) => {
      try {
        return await this.engine.respond(s);
      } catch (t) {
        throw this.logger.error(t.message), t;
      }
    }, this.ping = async (s) => {
      try {
        return await this.engine.ping(s);
      } catch (t) {
        throw this.logger.error(t.message), t;
      }
    }, this.emit = async (s) => {
      try {
        return await this.engine.emit(s);
      } catch (t) {
        throw this.logger.error(t.message), t;
      }
    }, this.disconnect = async (s) => {
      try {
        return await this.engine.disconnect(s);
      } catch (t) {
        throw this.logger.error(t.message), t;
      }
    }, this.find = (s) => {
      try {
        return this.engine.find(s);
      } catch (t) {
        throw this.logger.error(t.message), t;
      }
    }, this.getPendingSessionRequests = () => {
      try {
        return this.engine.getPendingSessionRequests();
      } catch (s) {
        throw this.logger.error(s.message), s;
      }
    }, this.name = (r == null ? void 0 : r.name) || C3.name, this.metadata = (r == null ? void 0 : r.metadata) || xn();
    const e = typeof (r == null ? void 0 : r.logger) < "u" && typeof (r == null ? void 0 : r.logger) != "string" ? r.logger : (0, import_logger2.pino)((0, import_logger2.getDefaultLoggerOptions)({ level: (r == null ? void 0 : r.logger) || C3.logger }));
    this.core = (r == null ? void 0 : r.core) || new Ir(r), this.logger = (0, import_logger2.generateChildLogger)(e, this.name), this.session = new is2(this.core, this.logger), this.proposal = new ts2(this.core, this.logger), this.pendingRequest = new rs2(this.core, this.logger), this.engine = new ss2(this);
  }
  static async init(r) {
    const e = new $3(r);
    return await e.initialize(), e;
  }
  get context() {
    return (0, import_logger2.getLoggerContext)(this.logger);
  }
  get pairing() {
    return this.core.pairing.pairings;
  }
  async initialize() {
    this.logger.trace("Initialized");
    try {
      await this.core.start(), await this.session.init(), await this.proposal.init(), await this.pendingRequest.init(), await this.engine.init(), this.core.verify.init({ verifyUrl: this.metadata.verifyUrl }), this.logger.info("SignClient Initialization Success");
    } catch (r) {
      throw this.logger.info("SignClient Initialization Failure"), this.logger.error(r.message), r;
    }
  }
};
var ns2 = $3;
export {
  ie2 as ENGINE_CONTEXT,
  O as ENGINE_RPC_OPTS,
  Xe3 as HISTORY_CONTEXT,
  Je3 as HISTORY_EVENTS,
  He3 as HISTORY_STORAGE_VERSION,
  ne3 as METHODS_TO_VERIFY,
  ee2 as PROPOSAL_CONTEXT,
  Fe3 as PROPOSAL_EXPIRY,
  se2 as PROPOSAL_EXPIRY_MESSAGE,
  re2 as REQUEST_CONTEXT,
  te as SESSION_CONTEXT,
  A2 as SESSION_EXPIRY,
  G3 as SESSION_REQUEST_EXPIRY_BOUNDARIES,
  J3 as SIGN_CLIENT_CONTEXT,
  C3 as SIGN_CLIENT_DEFAULT,
  je3 as SIGN_CLIENT_EVENTS,
  j2 as SIGN_CLIENT_PROTOCOL,
  ke2 as SIGN_CLIENT_STORAGE_OPTIONS,
  b3 as SIGN_CLIENT_STORAGE_PREFIX,
  k2 as SIGN_CLIENT_VERSION,
  ns2 as SignClient,
  $3 as default
};
/*! Bundled license information:

tslib/tslib.js:
  (*! *****************************************************************************
  Copyright (c) Microsoft Corporation.
  
  Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.
  
  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
  ***************************************************************************** *)
*/
//# sourceMappingURL=@walletconnect_sign-client.js.map
