const { src, dest } = require("gulp");

function copyIcons() {
  return src("src/nodes/**/*.png").pipe(dest("dist/nodes"));
}

exports.default = copyIcons;
