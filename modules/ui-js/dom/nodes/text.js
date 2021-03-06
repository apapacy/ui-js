// Generated by CoffeeScript 1.10.0
var Node, Text,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Node = require('./node');

module.exports = Text = (function(superClass) {
  extend(Text, superClass);

  Object.defineProperty(Text.prototype, 'value', {
    get: function() {
      return this.value_;
    },
    set: function(value) {
      return this.setValue(value);
    }
  });

  function Text(value_) {
    this.value_ = value_ != null ? value_ : '';
    Text.__super__.constructor.apply(this, arguments);
    this.nodeType = 'text';
    return;
  }

  Text.prototype.setValue = function(value) {
    this.value_ = value + '';
    this.mutate();
  };

  Text.prototype.clone = function() {
    return new this.constructor(this.value);
  };

  return Text;

})(Node);

//# sourceMappingURL=text.js.map
