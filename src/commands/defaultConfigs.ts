import { join } from 'path'
import {
  existsSync,
  renameSync,
  mkdirSync,
  copyFileSync,
  readdirSync
} from 'fs'

import {
  BKP_FOLDER,
  DEFAULT_FILE,
  DEFAULT_FOLDER,
  DEFAULT_SETTINGS_FOLDER,
  DEFAULT_THEME_FOLDER
} from '../constants/index'
import { printMessage, successMessage } from '../utils/message'

export default class DefaultConfigs {
  private static copyFolderRecursive(
    files: Array<string>,
    localFolder: string,
    destinationFolder: string
  ) {
    files.map(file =>
      copyFileSync(`${localFolder}/${file}`, `${destinationFolder}/${file}`)
    )
  }

  static initialConfigs() {
    try {
      // criando pastas caso nao existam
      if (existsSync(BKP_FOLDER)) {
        printMessage(
          'red',
          `Rename the existing backup folder and try again ${'\n'}`
        )
        return
      }

      if (existsSync(DEFAULT_FOLDER)) {
        renameSync(DEFAULT_FOLDER, BKP_FOLDER)
        console.log('the backup folder was created at:')
        printMessage('lightCyan', `${BKP_FOLDER}  ${'\n'}`)
      }

      mkdirSync(DEFAULT_FOLDER, { recursive: true })

      // copiar o template

      const templateFoler = join(__dirname, '..', 'templates')
      mkdirSync(DEFAULT_THEME_FOLDER, { recursive: true })
      copyFileSync(
        `${templateFoler}/${DEFAULT_FILE}`,
        `${DEFAULT_FOLDER}/${DEFAULT_FILE}`
      )

      const themes = readdirSync(`${templateFoler}/themes/`)
      this.copyFolderRecursive(
        themes,
        `${templateFoler}/themes`,
        `${DEFAULT_THEME_FOLDER}/`
      )

      copyFileSync(
        `${templateFoler}/fonts.yml`,
        `${DEFAULT_SETTINGS_FOLDER}/fonts.yml`
      )

      successMessage()
    } catch (error) {
      throw new Error(error)
    }
  }
}
