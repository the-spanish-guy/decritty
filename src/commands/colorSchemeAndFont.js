const fs = require('fs')
const yaml = require('js-yaml')
const constants = require('../constants/index')
const chalk = require('chalk')
const { FONT_FILE, DEFAULT_THEME_FOLDER, DEFAULT_SETTINGS_FOLDER } = constants

const writeFile = file => {
  fs.writeFile(`${DEFAULT_SETTINGS_FOLDER}/${FONT_FILE}`, yaml.dump(file), err => {
    if (err) {
      throw Error(chalk.red('an error occurred while trying to save changes'))
    }
  })
}

const openFontFile = name => {
  const file = yaml.load(
    fs.readFileSync(`${DEFAULT_SETTINGS_FOLDER}/fonts.yml`, {
      encoding: 'utf-8',
      flag: 'r'
    })
  )

  return file
}

const openThemeFile = fileName => {
  const path = `${DEFAULT_THEME_FOLDER}/${fileName}.yml`

  if (!fs.existsSync(path)) {
    throw Error(chalk.red(`The theme ${chalk.hex('#c03546').bold(fileName)} was not found`))
  }

  const theme = yaml.load(
    fs.readFileSync(path, {
      encoding: 'utf-8',
      flag: 'r'
    })
  )
  return theme
}

const init = async args => {
  const { theme, font: newFont, addFont } = args

  let newColors
  if (theme) {
    const colors = openThemeFile(theme)
    newColors = colors.colors
  }

  let fn = ''
  if (newFont || addFont) {
    let file = openFontFile()

    if (addFont) {
      const nf = Object.fromEntries([addFont])
      file = { fonts: { ...file.fonts, ...nf } }
      writeFile(file)
    }

    if (newFont) {
      if (!Object.prototype.hasOwnProperty.call(file.fonts, newFont)) {
        throw Error(chalk.red(`The font ${chalk.hex('#c03546').bold(newFont)} was not found`))
      }
      for (const f in file.fonts) {
        if (f === newFont) fn = file.fonts[f]
      }
    }
  }

  return { newColors, fn }
}

module.exports = init
