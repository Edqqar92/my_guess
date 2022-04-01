// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/js/utils.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createHints = createHints;
exports.createElement = createElement;
exports.appendChildren = appendChildren;

function createHints(dom) {
  var hints = [];

  for (var x = 0; x < 5; x++) {
    var hint = createElement("li", "hint");
    dom.appendChild(hint);
    hints.push(hint);
  }

  return hints;
}

function createElement(tag, className, text) {
  var element = document.createElement(tag);

  if (className) {
    element.classList.add(className);
  }

  if (text) {
    element.innerText = text;
  }

  return element;
}

function appendChildren(dom) {
  for (var _len = arguments.length, children = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    children[_key - 1] = arguments[_key];
  }

  children.forEach(function (child) {
    dom.appendChild(child);
  });
}
},{}],"src/js/view/guessesView.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GuessesView = void 0;

var _utils = require("../utils");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var COLORS = ["red", "blue", "green", "yellow", "orange"];

var GuessesView = function GuessesView(rowView) {
  var _this = this;

  _classCallCheck(this, GuessesView);

  this.code = [];
  this.dom = (0, _utils.createElement)("ul", "guesses");
  var hints = (0, _utils.createHints)(this.dom);
  hints.forEach(function (hint, index) {
    var x = 0;
    hint.addEventListener("click", function () {
      if (rowView.active) {
        _this.code[index] = x;
        hint.style.background = COLORS[x];
        x = (x + 1) % 5;
      }
    });
  });
};

exports.GuessesView = GuessesView;
},{"../utils":"src/js/utils.js"}],"src/js/view/answersView.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AnswersView = void 0;

var _utils = require("../utils");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var AnswersView =
/*#__PURE__*/
function () {
  function AnswersView() {
    _classCallCheck(this, AnswersView);

    this.dom = (0, _utils.createElement)("ul", "answers");
    this._hints = (0, _utils.createHints)(this.dom);
  }

  _createClass(AnswersView, [{
    key: "check",
    value: function check(_ref) {
      var exact = _ref.exact,
          correct = _ref.correct;

      this._hints.forEach(function (hint, index) {
        if (exact > index) {
          hint.classList.add("exact");
        } else if (correct > index) {
          hint.classList.add("correct");
        }
      });
    }
  }]);

  return AnswersView;
}();

exports.AnswersView = AnswersView;
},{"../utils":"src/js/utils.js"}],"src/js/code.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.compare = compare;

function compare(code, guess) {
  var exact = 0; // Determine how many are exact
  // ...implementation

  for (var x = 0; x < code.length; x += 1) {
    if (code[x] === guess[x]) {
      exact += 1;
    }
  } // Determine how many are correct
  // ...implementation


  var incorrectos = code.slice();

  for (var y = 0; y < guess.length; y += 1) {
    if (incorrectos.includes(guess[y])) {
      var index = incorrectos.indexOf(guess[y]);
      incorrectos.splice(index, 1);
    }
  }

  var correct = code.length - incorrectos.length;
  return {
    exact: exact,
    correct: correct
  };
}
},{}],"src/js/view/rowView.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RowView = void 0;

var _guessesView = require("./guessesView");

var _answersView = require("./answersView");

var _utils = require("../utils");

var _code = require("../code");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var RowView =
/*#__PURE__*/
function () {
  function RowView(number, game, done) {
    var _this = this;

    _classCallCheck(this, RowView);

    this.dom = (0, _utils.createElement)("div", "row");
    var numberLine = (0, _utils.createElement)("div", "numbers", number);
    var buttonBlock = (0, _utils.createElement)("div", "button_block");
    var button = (0, _utils.createElement)("button", undefined, "OK");
    var guessesView = new _guessesView.GuessesView(this);
    var answersView = new _answersView.AnswersView();
    (0, _utils.appendChildren)(this.dom, numberLine, guessesView.dom, buttonBlock);
    (0, _utils.appendChildren)(buttonBlock, answersView.dom, button);
    this.setActive(false);
    button.addEventListener("click", function () {
      _this.setActive(false);

      done();
      _this.result = (0, _code.compare)(game.code, guessesView.code);
      console.log(_this.result);
      answersView.check(_this.result);
    });
  }

  _createClass(RowView, [{
    key: "setActive",
    value: function setActive(value) {
      // if (value) { 
      //     this.dom.classList.remove("inactive"); 
      // } else {
      //     this.dom.classList.add("inactive");
      // }
      this.dom.classList.toggle("inactive", !value);
      this.active = value;
    }
  }]);

  return RowView;
}();

exports.RowView = RowView;
},{"./guessesView":"src/js/view/guessesView.js","./answersView":"src/js/view/answersView.js","../utils":"src/js/utils.js","../code":"src/js/code.js"}],"src/js/view/rowsView.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RowsView = void 0;

var _rowView = require("./rowView");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var RowsView =
/*#__PURE__*/
function () {
  function RowsView(rowCount, game) {
    _classCallCheck(this, RowsView);

    this.dom = document.querySelector(".rows");
    this.rows = [];
    this.index = 0;

    for (var x = 1; x <= rowCount; x++) {
      var rowView = new _rowView.RowView(x, game, this._next.bind(this));
      this.dom.appendChild(rowView.dom);
      this.rows.push(rowView);
    }

    this._next();
  }

  _createClass(RowsView, [{
    key: "_next",
    value: function _next() {
      this.rows[this.index].setActive(true);
      this.index += 1;
    }
  }]);

  return RowsView;
}();

exports.RowsView = RowsView;
},{"./rowView":"src/js/view/rowView.js"}],"src/js/guess.js":[function(require,module,exports) {
"use strict";

var _rowsView = require("./view/rowsView");

var _code = require("./code");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = function Game() {
  _classCallCheck(this, Game);

  this.code = [];

  while (this.code.length < 5) {
    this.code.push(Math.floor(Math.random() * 5));
  }

  var rowsView = new _rowsView.RowsView(10, this);
};

var hola = new Game();
},{"./view/rowsView":"src/js/view/rowsView.js","./code":"src/js/code.js"}],"node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "57964" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel/src/builtins/hmr-runtime.js","src/js/guess.js"], null)
//# sourceMappingURL=/guess.edef689c.js.map