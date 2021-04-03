const chalk = require('chalk')
const fs = require('fs')
const constants = require('../constants/index')
const { DEFAULT_THEME_FOLDER } = constants

const init = async () => {
  const themes = []
  const allThemes = await fs.promises
    .opendir(DEFAULT_THEME_FOLDER)
    .catch((err) => {
      throw err
    })

  for await (const theme of allThemes) {
    if (theme.isFile()) {
      themes.push(theme.name.replace('.yml', ''))
    }
  }

  console.log(chalk.hex('#2cb978')('These are all available themes! ✨'))
  console.info(
    chalk.hex('#9bced7')(
      'To add a new theme, copy to ~/.config/alacritty/settings/themes/ or open a PR in github' +
        '\n'
    )
  )
  console.log(themes.join(', '))
  return true
}

module.exports = init
