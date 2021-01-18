const fs = require('fs')
const yaml = require('js-yaml')

const constants = require('../constants')
const initialConfig = require('./initialConfig')
const colorSchemeAndFont = require('./colorSchemeAndFont')
const { DEFAULT_FOLDER, DEFAULT_FILE } = constants

const writeFile = (file) => {
  try {
    fs.writeFile(
      `${DEFAULT_FOLDER}/${DEFAULT_FILE}`,
      yaml.dump(file),
      (err) => {
        if (err)
          throw new Error('an error occurred while trying to save changes')
      }
    )
  } catch (err) {
    console.log(err)
  }
}

/**
 *
 * @param {Object} args
 */
const init = async (args) => {
  const { opacity, padding, theme, font, size, initial } = args

  if (initial) return initialConfig()

  try {
    const file = yaml.load(
      fs.readFileSync(`${DEFAULT_FOLDER}/${DEFAULT_FILE}`, {
        encoding: 'utf8',
        flag: 'r'
      })
    )

    if (theme || font) {
      const { newColors, f } = await colorSchemeAndFont(file, { font, theme })
      if (font) file.font.normal.family = f
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
    console.log('Done! ✨' + '\n')
    console.log('if there are no changes, try restarting the terminal' + '\n')
  } catch (err) {
    console.error(err)
  }
}

module.exports = init
