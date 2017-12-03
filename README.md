# min

[![npm](https://img.shields.io/npm/v/@geekcojp/min.svg)](https://www.npmjs.com/package/@geekcojp/min) [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier) [![CircleCI](https://circleci.com/gh/geekcojp/min/tree/master.svg?style=svg&circle-token=baaecbf0a3dea0a009c82e981e6713d8515b13cd)](https://circleci.com/gh/geekcojp/min/tree/master) ![license: mit](https://img.shields.io/packagist/l/doctrine/orm.svg)

## Usage

```bash
min [command]

Commands:
  min img  Minify *.jpg, *.png, *.gif and *.svg
  min jpg  Minify *.jpg
  min png  Minify *.png
  min gif  Minify *.gif
  min svg  Minify *.svg

Options:
  --version  Show version number                                       [boolean]
  --help     Show help                                                 [boolean]
```

## Example

```bash
$ min img
 ✔ Minify

 Filename      Size «B»   Size «A»  
 ------------  ---------  ----------
 nest/npm.jpg  34.93 KB   9.99 KB   
 npm.jpg       34.93 KB   9.99 KB   
 npm.png       3.34 KB    1.46 KB   
 cat.gif       989.78 KB  989.41 KB
 npm.svg       3.46 KB    2.98 KB   
 ------------  ---------  ----------
               1.04 MB    1013.84 KB
```

## TODO

- [x] minify jpg
- [x] minify png
- [x] minify gif
- [x] minify svg
- [ ] minify html
- [ ] minify css
- [ ] minify js
- [ ] minify php
