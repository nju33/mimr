# mimr

Minify images recursively

[![npm](https://img.shields.io/npm/v/mimr.svg)](https://www.npmjs.com/package/mimr)  
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

## Usage

```bash
mimr [command]

Commands:
  mimr img  Minify *.jpg, *.png, *.gif and *.svg
  mimr jpg  Minify *.jpg
  mimr png  Minify *.png
  mimr gif  Minify *.gif
  mimr svg  Minify *.svg

Options:
  --version  Show version number                                       [boolean]
  --help     Show help                                                 [boolean]
```

## Example

```bash
$ mimr img
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
