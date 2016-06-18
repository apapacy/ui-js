// Generated by CoffeeScript 1.10.0
var SourceMapConsumer, SourceNode, exceptRegExp;

SourceNode = require('source-map').SourceNode;

SourceMapConsumer = require('source-map').SourceMapConsumer;

exceptRegExp = /[\\\/]webpack[\\\/]buildin[\\\/]module\.js|[\\\/]ui-js-loader[\\\/]/;

module.exports = function(source, map) {
  var appendText, node, result, separator;
  if (typeof this.cacheable === "function") {
    this.cacheable();
  }
  if (exceptRegExp.test(this.resourcePath)) {
    return this.callback(null, source, map);
  }
  separator = '\n\n';
  appendText = 'if(module.hot){ require(' + JSON.stringify(require.resolve('./hot-loader')) + ').patch(module) };';
  if (this.sourceMap === false) {
    return this.callback(null, [source, appendText].join(separator));
  }
  node = new SourceNode(null, null, null, [SourceNode.fromStringWithSourceMap(source, new SourceMapConsumer(map)), new SourceNode(null, null, this.resourcePath, appendText)]).join(separator);
  result = node.toStringWithSourceMap();
  this.callback(null, result.code, result.map.toString());
};

//# sourceMappingURL=index.js.map
