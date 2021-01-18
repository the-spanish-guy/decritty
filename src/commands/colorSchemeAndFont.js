const fs = require('fs')
const yaml = require('js-yaml')
const constants = require('../constants/index')

const openFontFile = (name) => {
  let fontName = ''
  const { fonts } = yaml.load(
    fs.readFileSync(`${constants.DEFAULT_SETTINGS_FOLDER}/fonts.yml`, {
      encoding: 'utf-8',
      flag: 'r'
    })
  )
  for (const f in fonts) {
    if (f === name) fontName = fonts[f]
  }

  return fontName
}

const openThemeFile = (file) => {
  const theme = yaml.load(
    fs.readFileSync(`${constants.DEFAULT_THEME_FOLDER}/${file}.yml`, {
      encoding: 'utf-8',
      flag: 'r'
    })
  )
  return theme
}

const init = async (file, args) => {
  const { theme, font: newFont } = args

  let newColors
  if (theme) {
    const colors = openThemeFile(theme)
    newColors = colors.colors
  }

  let f = ''
  if (newFont) {
    const nFont = openFontFile(newFont)
    f = nFont
  }

  return { newColors, f }
}

module.exports = init
