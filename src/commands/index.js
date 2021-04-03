const fs = require('fs')
const yaml = require('js-yaml')
const chalk = require('chalk')

const constants = require('../constants')
const initialConfig = require('./initialConfig')
const colorSchemeAndFont = require('./colorSchemeAndFont')
const listAllThemes = require('./listAllThemes')
const { DEFAULT_FOLDER, DEFAULT_FILE } = constants

const writeFile = (file) => {
  fs.writeFile(`${DEFAULT_FOLDER}/${DEFAULT_FILE}`, yaml.dump(file), (err) => {
    if (err) {
      throw Error(chalk.red('an error occurred while trying to save changes'))
    }
  })
}

/**
 *
 * @param {Object} args
 */
const init = async (args) => {
  const {
    opacity,
    padding,
    theme,
    font,
    size,
    initial,
    add_font: addFont,
    list_themes: listThemes
  } = args

  if (initial) return initialConfig()

  if (listThemes) return await listAllThemes()

  try {
    const file = yaml.load(
      fs.readFileSync(`${DEFAULT_FOLDER}/${DEFAULT_FILE}`, {
        encoding: 'utf8',
        flag: 'r'
      })
    )

    if (theme || font || addFont) {
      const { newColors, fn } = await colorSchemeAndFont({
        font,
        theme,
        addFont
      })
      if (font) file.font.normal.family = fn
      if (theme) file.colors = newColors
    }

    file.font.size = size === undefined ? file.font.size : size
    file.background_opacity =
      opacity === undefined ? file.background_opacity : opacity
    file.window.padding.x =
      padding === undefined ? file.window.padding.x : padding[0]
    file.window.padding.y =
      padding === undefined ? file.window.padding.y : padding[1]
    writeFile(file)
    console.log(chalk.green('Done!'), ' ✨' + '\n')
    console.log(
      chalk.hex('#f0f696')(
        'if there are no changes, try restarting the terminal' + '\n'
      )
    )
  } catch (err) {
    console.error(err.message)
  }
}

module.exports = init
