const fs = require('fs')
const yaml = require('js-yaml')
const constants = require('../constants/index')
const chalk = require('chalk')

const openFontFile = (name) => {
  let fontName = ''
  const { fonts } = yaml.load(
    fs.readFileSync(`${constants.DEFAULT_SETTINGS_FOLDER}/fonts.yml`, {
      encoding: 'utf-8',
      flag: 'r'
    })
  )

  if (!Object.prototype.hasOwnProperty.call(fonts, name)) {
    throw Error(
      chalk.red(`The font ${chalk.hex('#c03546').bold(name)} was not found`)
    )
  }

  for (const f in fonts) {
    if (f === name) fontName = fonts[f]
  }

  return fontName
}

const openThemeFile = (fileName) => {
  const path = `${constants.DEFAULT_THEME_FOLDER}/${fileName}.yml`

  if (!fs.existsSync(path)) {
    throw Error(
      chalk.red(
        `The theme ${chalk.hex('#c03546').bold(fileName)} was not found`
      )
    )
  }

  const theme = yaml.load(
    fs.readFileSync(path, {
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
