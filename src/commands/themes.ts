import { opendir } from 'fs/promises'
import { printMessage } from '../utils/message'
import { DEFAULT_SETTINGS_FOLDER, DEFAULT_THEME_FOLDER } from '../constants'
import { FileType } from '../types/file'
import File from './file'
import { ColorsFileType } from '../types/colorsFile'
import { FontFileType } from 'src/types/fontFile'

export default class ThemesServices {
  private static async listThemes(): Promise<Array<string>> {
    const themes = []
    const listThemes = await opendir(DEFAULT_THEME_FOLDER).catch(err => {
      throw err
    })

    for await (const theme of listThemes) {
      if (theme.isFile()) {
        themes.push(theme.name.replace('.yml', ''))
      }
    }

    return themes
  }

  private static listFonts(): Array<string> {
    const fonts: Array<string> = []
    const listFonts = File.openFile(`${DEFAULT_SETTINGS_FOLDER}/fonts.yml`) as FontFileType

    for (const font in listFonts.fonts) {
      fonts.push(font)
    }

    return fonts
  }

  static async listResources (): Promise<void> {
    const themes = await this.listThemes()
    const fonts = this.listFonts()

    printMessage('lightWhite', 'Themes:')
    printMessage('magenta', `\t${themes.join('\n\t')}`)
    printMessage('lightWhite', 'Fonts:')
    printMessage('magenta', `\t${fonts.join('\n\t')}`)

    printMessage('green', '\n\nThese are all available themes! ✨')
    printMessage(
      'cyan',
      'To add a new theme, copy to ~/.config/alacritty/settings/themes/ or open a PR in github' +
        '\n'
    )
  }

  static setTheme(name: string, file: FileType) {
    const path = `${DEFAULT_THEME_FOLDER}/${name}.yml`

    const customColors = File.openFile(path) as ColorsFileType

    file.colors = { ...customColors.colors }
  }
}
