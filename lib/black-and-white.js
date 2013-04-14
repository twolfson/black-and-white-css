var styleSheets = document.styleSheets,
    styleSheetRules = [].map.call(styleSheets, function (sheet) { return sheet.cssRules || sheet.rules || []; }),
    rules = [];

styleSheetRules.forEach(function (sheetRules) {
  rules.push.apply(rules, sheetRules);
});

console.log(rules);
