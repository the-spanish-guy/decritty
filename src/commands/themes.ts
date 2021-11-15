import { opendir } from 'fs/promises'
import { printMessage } from '../utils/message'
import { DEFAULT_THEME_FOLDER } from '../constants'
import { FileType } from '../types/file'
import File from './file'
import { ColorsFileType } from '../types/colorsFile'

export default class ThemesServices {
  static listThemes = async (): Promise<void> => {
    const themes = []
    const listThemes = await opendir(DEFAULT_THEME_FOLDER).catch(err => {
      throw err
    })

    for await (const theme of listThemes) {
      if (theme.isFile()) {
        themes.push(theme.name.replace('.yml', ''))
      }
    }

    printMessage('green', 'These are all available themes! ✨')
    printMessage(
      'cyan',
      'To add a new theme, copy to ~/.config/alacritty/settings/themes/ or open a PR in github' +
        '\n'
    )
    printMessage('lightMagenta', themes.join(', '))
  }

  static setTheme = (name: string, file: FileType) => {
    const path = `${DEFAULT_THEME_FOLDER}/${name}.yml`

    const customColors = File.openFile(path) as ColorsFileType

    file.colors = { ...customColors.colors }
  }
}
