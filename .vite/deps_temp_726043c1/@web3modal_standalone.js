import {
  ae,
  d,
  se,
  y
} from "./chunk-RVOIZ2RW.js";
import "./chunk-JZQ37OGZ.js";

// node_modules/.pnpm/@web3modal+standalone@2.4.1_react@18.2.0/node_modules/@web3modal/standalone/dist/index.js
var c = Object.defineProperty;
var i = Object.getOwnPropertySymbols;
var d2 = Object.prototype.hasOwnProperty;
var b = Object.prototype.propertyIsEnumerable;
var a = (o, e, t) => e in o ? c(o, e, { enumerable: true, configurable: true, writable: true, value: t }) : o[e] = t;
var m = (o, e) => {
  for (var t in e || (e = {}))
    d2.call(e, t) && a(o, t, e[t]);
  if (i)
    for (var t of i(e))
      b.call(e, t) && a(o, t, e[t]);
  return o;
};
var f = class {
  constructor(e) {
    this.openModal = se.open, this.closeModal = se.close, this.subscribeModal = se.subscribe, this.setTheme = ae.setThemeConfig, ae.setThemeConfig(e), y.setConfig(m({ enableStandaloneMode: true }, e)), this.initUi();
  }
  async initUi() {
    if (typeof window < "u") {
      await import("./dist-ROIA3UZS.js");
      const e = document.createElement("w3m-modal");
      document.body.insertAdjacentElement("beforeend", e), d.setIsUiLoaded(true);
    }
  }
};
export {
  f as Web3Modal
};
//# sourceMappingURL=@web3modal_standalone.js.map
