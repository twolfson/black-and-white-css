# black-and-white-css

Downgrade your CSS to black and white

## Getting Started
Download one of the available flavors:

- [Production version][min]
- [Development version][max] - Available via `bower install computedStyle`
- [CommonJS version][commonjs] - Available via `npm install computed-style` and `component install twolfson/computedStyle`
- [AMD version][amd]
- [140 bytes version][140]

[min]: https://raw.github.com/twolfson/computedStyle/master/dist/computedStyle.min.js
[max]: https://raw.github.com/twolfson/computedStyle/master/dist/computedStyle.js
[commonjs]: https://raw.github.com/twolfson/computedStyle/master/dist/computedStyle.commonjs.js
[amd]: https://raw.github.com/twolfson/computedStyle/master/dist/computedStyle.amd.js
[140]: https://raw.github.com/twolfson/computedStyle/master/dist/computedStyle.140.js

In your web page:

```html
<script src="dist/computedStyle.min.js"></script>
<script>
computedStyle(el, 'color'); // Returns color of the element
</script>
```

## Documentation
__TODO__

## Examples
__TODO__

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint your code using [grunt][grunt] and test via `npm test`.

## License
Copyright (c) 2013 Todd Wolfson

Licensed under the MIT license.