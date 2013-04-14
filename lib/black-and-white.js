// Quirks mode reference -- http://www.quirksmode.org/dom/w3c_css.html
var styleSheets = document.styleSheets,
    styleSheetRules = [].map.call(styleSheets, function (sheet) { return sheet.cssRules || sheet.rules || []; }),
    rules = [];

styleSheetRules.forEach(function (sheetRules) {
  rules.push.apply(rules, sheetRules);
});

// TODO: Don't forget about imports ;_;

// TODO: Might need to normalize rules formats

// Create a new style sheet
// TODO: Cross-browser with same technique as getComputedStyle -- should be abstracted into module
var retSheet = document.createElement('style');

// TODO: Get full list from http://www.w3.org/TR/css3-color/#svg-color
// TOOD: Use https://github.com/cloudhead/less.js/blob/master/lib/less/colors.js
var COLORS = {
      red: {r: 255, g: 0, b: 0},
      green: {r: 0, g: 128, b: 0},
      blue: {r: 0, g: 0, b: 255}
    };
function RgbColor(colorName) {
  // Assume the colorName is an rgb object
  var color = colorName;

  // If the colorName is a string, attempt to look it up
  if (typeof colorName === 'string') {
    color = COLORS[color];

    // If there was no color
    if (!color) {
      // Extract rgb values
      var rgbMatch = colorName.match(/rgb\((\d+), (\d+), (\d+)\)/);
      if (rgbMatch) {
        color = {
          r: rgbMatch[1],
          g: rgbMatch[2],
          b: rgbMatch[3]
        };
      }
    }
    // TODO: What if hex?
    // TODO: What if short-hex?
    // TODO: What if hsla?
    // TODO: What if rgba?
    // TODO: What if transparent?
  }

  console.log('AAA', color, colorName);

  // Save the color
  this.val = color;
}
RgbColor.prototype = {
  // Attribution to https://github.com/cloudhead/less.js/blob/5e0ed82e71d812a5c133ab2dcdb5a8a978298fe7/lib/less/tree/color.js#L83-L105
  toHSL: function () {
    var r = this.val.r / 255,
        g = this.val.g / 255,
        b = this.val.b / 255;

    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2, d = max - min;

    if (max === min) {
        h = s = 0;
    } else {
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    return { h: h * 360, s: s, l: l};
  },
  invert: function () {
    // TODO: Should be new RgbColor
    return {
      r: 255 - this.val.r,
      g: 255 - this.val.g,
      b: 255 - this.val.b
    };
  }
};

// Iterate over the rules
function Rule(_rule) {
  // Save the original rule and style
  this._rule = _rule;
  this._style = _rule.style;

  // Create a location for storing overrides
  this.overrides = {};
}
Rule.prototype = {
  getValue: function (prop) {
    // Attempt to resolve value from overrides and fallback to getPropertyValue
    // TODO: getPropertyValue will not work in IE
    return this.overrides[prop] || this._style.getPropertyValue(prop);
  },
  setValue: function (prop, val) {
    // Save the property to overrides
    this.overrides[prop] = val;
  },
  desaturate: function (prop) {
    // Grab the original value
    var origVal = this.getValue(prop);

    // If there was no value, skip it
    if (!origVal) { return; }

    // Otherwise, desaturate it
    var color = new RgbColor(origVal),
        rgb = color.invert();
    this.setValue(prop, 'rgb(' + rgb.r + ', ' + rgb.g + ', ' + rgb.b + ')');
  },
  exportChanges: function () {
    // Create an object with new definitions
    // TODO: selectorText is incorrect in IE according to quirksmode
    var selector = this._rule.selectorText;

    var overrides = this.overrides,
        changedNames = Object.getOwnPropertyNames(overrides),
        changes = changedNames.map(function (name) {
          return name + ': ' + overrides[name] + ';';
        });

    return {
      selector: selector,
      value: changes.join('\n')
    };
  }
};

var retRules = [];
rules.forEach(function (_rule) {
  if (_rule) {
    // Create a rule
    var rule = new Rule(_rule);

    // Desaturate the rule
    rule.desaturate('color');
    rule.desaturate('background-color');

    // Export it
    var ruleObj = rule.exportChanges();

    // Create a CSS rule
    var retVal = ruleObj.selector + ' { ' + ruleObj.value + ' } ';
    console.log(_rule, retVal);
    retRules.push(retVal);
  }
});

// Create a new rule set for the sheet
retSheet.innerHTML = retRules.join('\n');

// Append the sheet
document.getElementsByTagName('head')[0].appendChild(retSheet);