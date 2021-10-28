import { hex } from 'chalk'
import { opendir } from 'fs/promises'
import { DEFAULT_THEME_FOLDER } from '../constants'

export default class ThemesServices {
  static listThemes = async (): Promise<void> => {
    const themes = []
    const listThemes = await opendir(DEFAULT_THEME_FOLDER).catch(err => { throw err })

    for await (const theme of listThemes) {
      if (theme.isFile()) {
        themes.push(theme.name.replace('.yml', ''))
      }
    }

    console.log(hex('#2cb978')('These are all available themes! ✨'))
    console.info(
      hex('#9bced7')(
        'To add a new theme, copy to ~/.config/alacritty/settings/themes/ or open a PR in github' +
        '\n'
      )
    )
    console.log(themes.join(', '))
  }
}
