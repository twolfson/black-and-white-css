var styleSheets = document.styleSheets,
    styleSheetRules = [].map.call(styleSheets, function (sheet) { return sheet.cssRules || sheet.rules || []; }),
    rules = [];

styleSheetRules.forEach(function (sheetRules) {
  rules.push.apply(rules, sheetRules);
});

// Create a new style sheet
// TODO: Cross-browser with same technique as getComputedStyle -- should be abstracted into module
var retSheet = document.createElement('style');

// Create a new rule set for the sheet
retSheet.innerHTML = 'body { color: black; }';

// Append the sheet
document.getElementsByTagName('head')[0].appendChild(retSheet);