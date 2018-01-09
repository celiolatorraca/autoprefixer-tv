# PostCSS Autoprefixer Tv [![Build Status][ci-img]][ci]

[PostCSS] plugin to split **only** duplicated prefixed property declarations into multiple rules.

## Why should I use this plugin?

Some of the TV manufacturers use custom webkit distributions as the engine in their applications.

Especially the WebOS TVs. The webpack distribution they use has a bug that invalidates the overwriting declarations in a same CSS definition.

So, as you can see in the example below, the property `display: flex` invalidates the previous one (`display: -webkit-flex`) which is accepted by this distribution.

This is an example of the splitting this plugin is intended to do:

Before:
```css
.foo {
    display: -webkit-flex;
    display: flex;
    color: red;
    height: 50px;
    height: 100px;
}
```

After:
```css
.foo {
    display: -webkit-flex;
}

.foo {
    display: flex;
    color: red;
    height: 50px;
    height: 100px;
}
```

## Usage

```js
postcss([ require('autoprefixer-tv') ])
```

### [PostCSS] - [Autoprefixer]

You can use this plugin separately, but it is well integrated with [Autoprefixer] plugin. You just need to require it after the `autoprefixer` postcss plugin.

```js
postcss([ require('autoprefixer'), require('autoprefixer-tv') ])
```

[PostCSS]: https://github.com/postcss/postcss
[Autoprefixer]: https://github.com/postcss/autoprefixer
[ci-img]:  https://travis-ci.org/celiolatorraca/postcss-autoprefixer-tv.svg
[ci]:      https://travis-ci.org/celiolatorraca/postcss-autoprefixer-tv
