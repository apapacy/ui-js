// Generated by CoffeeScript 1.10.0
var ref, ref1, ref2, ref3, ref4, ref5, ref6, ref7, ref8, ref9, requestFrame, stopFrame,
  slice = [].slice;

requestFrame = ((ref = window.requestAnimationFrame) != null ? ref.bind(window) : void 0) || ((ref1 = window.webkitRequestAnimationFrame) != null ? ref1.bind(window) : void 0) || ((ref2 = window.mozRequestAnimationFrame) != null ? ref2.bind(window) : void 0) || ((ref3 = window.oRequestAnimationFrame) != null ? ref3.bind(window) : void 0) || ((ref4 = window.msRequestAnimationFrame) != null ? ref4.bind(window) : void 0) || function(callback, element) {
  return window.setTimeout(callback, 1000 / 60);
};

stopFrame = ((ref5 = window.cancelAnimationFrame) != null ? ref5.bind(window) : void 0) || ((ref6 = window.webkitCancelAnimationFrame) != null ? ref6.bind(window) : void 0) || ((ref7 = window.mozCancelAnimationFrame) != null ? ref7.bind(window) : void 0) || ((ref8 = window.oCancelAnimationFrame) != null ? ref8.bind(window) : void 0) || ((ref9 = window.msCancelAnimationFrame) != null ? ref9.bind(window) : void 0) || function(id) {
  return window.clearTimeout(id);
};

module.exports = function() {
  var args;
  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  return requestFrame.apply(null, args);
};

module.exports.stop = function() {
  var args;
  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  return stopFrame.apply(null, args);
};

//# sourceMappingURL=animation-frame.js.map
