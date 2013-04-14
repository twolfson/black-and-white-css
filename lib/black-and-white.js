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
    // TODO: Convert into {r,g,b} -> h,s,l -> h,0,l
    this.setValue(prop, Math.random() >= 0.5 ? 'black' : 'white');
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

var retRules = rules.map(function (_rule) {
  // Create a rule
  var rule = new Rule(_rule);

  // Desaturate the rule
  rule.desaturate('color');
  rule.desaturate('background-color');

  // Export it
  var ruleObj = rule.exportChanges();

  console.log(ruleObj);

  // Create a CSS rule
  var retVal = ruleObj.selector + ' { ' + ruleObj.value + ' } ';
  return retVal;
});

// Create a new rule set for the sheet
retSheet.innerHTML = retRules.join('\n');

// Append the sheet
document.getElementsByTagName('head')[0].appendChild(retSheet);