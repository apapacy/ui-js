// Generated by CoffeeScript 1.10.0
var ArrayObserver, Component, DOM, DOMRender, DataBind, Directive, Draggable, EventEmitter, Exp, ExpObserver, For, Html, If, Pre, Promise, UI, animationFrame, immediate, keyboard,
  slice = [].slice;

Component = require('ui-js/core/component');

Directive = require('ui-js/core/directive');

keyboard = require('ui-js/core/keyboard');

Promise = require('ui-js/core/promise');

EventEmitter = require('ui-js/core/event-emitter');

ArrayObserver = require('ui-js/data-bind/array-observer');

ExpObserver = require('ui-js/data-bind/exp-observer');

DataBind = require('ui-js/data-bind/data-bind');

Exp = require('ui-js/data-bind/exp');

Draggable = require('ui-js/directives/draggable');

Html = require('ui-js/directives/html');

Pre = require('ui-js/directives/pre');

For = require('ui-js/directives/for');

If = require('ui-js/directives/if');

DOM = require('ui-js/dom');

DOMRender = require('ui-js/render/dom-render');

animationFrame = require('ui-js/polyfill/animation-frame');

immediate = require('ui-js/polyfill/immediate');

module.exports = window['ui'] = new (UI = (function() {
  UI.prototype.EventEmitter = EventEmitter;

  UI.prototype.Promise = Promise;

  function UI() {
    this.directives = [Pre, For, If, Html, Draggable];
    this.components = [];
    this.pipes = {};
    this.dom = DOM;
    this.keyboard = keyboard;
    this.systemGlobals = Object.create(null);
    this.globals = Object.create(this.systemGlobals);
    return;
  }

  UI.prototype.bootstrap = function() {
    var MainComponent, Render, host, render, renderOptions;
    MainComponent = arguments[0], Render = arguments[1], renderOptions = 3 <= arguments.length ? slice.call(arguments, 2) : [];
    if (Render == null) {
      Render = DOMRender;
    }
    this.components = this.components.map(function(Class) {
      return Component.create(Class);
    });
    this.directives = this.directives.map(function(Class) {
      return Directive.create(Class);
    });
    MainComponent = Component.create(MainComponent);
    host = DOM.createElement(MainComponent.tag);
    MainComponent.init(host);
    render = (function(func, args, ctor) {
      ctor.prototype = func.prototype;
      var child = new ctor, result = func.apply(child, args);
      return Object(result) === result ? result : child;
    })(Render, [host].concat(slice.call(renderOptions)), function(){});
    return render;
  };

  UI.prototype.directive = function(directive) {
    this.directives.push(directive);
  };

  UI.prototype.component = function(component) {
    this.components.push(component);
  };

  UI.prototype.pipe = function(name, pipe) {
    return Exp.addPipe(name, pipe);
  };

  UI.prototype.global = function(name, value) {
    return this.globals[name] = value;
  };

  UI.prototype.watch = function(context, exp, handler, scope, init) {
    if (init == null) {
      init = true;
    }
    return new ExpObserver(context, exp, handler, scope, init);
  };

  UI.prototype.watchArray = function(arr, handler) {
    return new ArrayObserver(arr, handler);
  };

  UI.prototype.diff = function(arr, oldArr) {
    return ArrayObserver.diff(arr, oldArr);
  };

  UI.prototype.bind = function(objL, expL, objR, expR, scope) {
    return new DataBind(objL, expL, objR, expR, scope);
  };

  UI.prototype["eval"] = function(context, exp, scope) {
    exp = new Exp(exp);
    return exp(context, scope);
  };

  UI.prototype.set = function(context, exp, value, scope) {
    exp = new Exp(exp);
    return exp.set(context, value, scope);
  };

  UI.prototype.frame = function(handler, element) {
    return animationFrame(handler, element);
  };

  UI.prototype.immediate = function(handler) {
    return immediate(handler);
  };

  UI.prototype.timeout = function(handler, time) {
    var ref;
    if (typeof time === 'function') {
      ref = [handler, time], handler = ref[0], time = ref[1];
    }
    return setTimeout(handler, time);
  };

  UI.prototype.on = function(event, handler) {
    return ui.dom.on(event, handler);
  };

  UI.prototype.init = function(handler) {
    ui.dom.on('DOMContentLoaded', handler);
  };

  UI.prototype.resize = function(handler) {
    return ui.dom.on('resize', handler);
  };

  UI.prototype.imageInfo = function(src, handler) {
    var img;
    img = document.createElement('img');
    img.onload = function() {
      var info;
      info = {
        width: img.naturalWidth,
        height: img.naturalHeight
      };
      return handler(info);
    };
    img.src = src;
  };

  return UI;

})());

//# sourceMappingURL=index.js.map
