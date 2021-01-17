const fs = require("fs");
const yaml = require("js-yaml");
const constants = require("../constants/index");

const openFontFile = (name) => {
  let font_name = ''
  const { fonts } = yaml.load(fs.readFileSync(`${constants.DEFAULT_SETTINGS_FOLDER}/fonts.yml`, {
    encoding: "utf-8",
    flag: "r",
  }));
  for (var f in fonts) {
    if(f === name) font_name = fonts[f]
  }

  return font_name
};

const openThemeFile = (file) => {
  const theme = yaml.load(fs.readFileSync(`${constants.DEFAULT_THEME_FOLDER}/${file}.yml`, {
    encoding: "utf-8",
    flag: "r",
  }));
  return theme
};

const init = async (file, args) => {
  const { theme, font: newFont } = args;
  
  var new_colors
  if (theme) {
    const colors = openThemeFile(theme);
    new_colors = colors.colors
  }

  var f = ''
  if (newFont) {
    const nFont = openFontFile(newFont)
    f = nFont
  }

  return { new_colors, f }
};

module.exports = init;
