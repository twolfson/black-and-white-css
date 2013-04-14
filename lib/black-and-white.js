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
  // Save the original rule
  this._rule = _rule;
  var _style = _rule.style;
  this._style = _style;

  // TODO: Pull out all properties
  // Pull out color and background-color
  this['background-color'] = _style.getPropertyValue('background-color');
  this.color = _style.getPropertyValue('color');
}
Rule.prototype = {

};

var retRules = [];
rules.forEach(function (rule) {
  // If there is a color
  console.log(rule;
  // console.log(rule.style['background-color']);
  console.log(rule.style.getPropertyValue('background-color'));
});

// Create a new rule set for the sheet
retSheet.innerHTML = 'body { color: black; }';

// Append the sheet
document.getElementsByTagName('head')[0].appendChild(retSheet);