import { dump, load } from 'js-yaml'
import { readFileSync, writeFile } from 'fs'
import { FileType } from '../types/file'
import { DEFAULT_FOLDER, DEFAULT_FILE } from '../constants/index'
import { printMessage } from '../utils/message'

export default class File {
  public static openFile: FileType = load(
    readFileSync(`${DEFAULT_FOLDER}/${DEFAULT_FILE}`, {
      encoding: 'utf8',
      flag: 'r'
    })) as FileType

  public static writeFile = (file: FileType) => {
    writeFile(`${DEFAULT_FOLDER}/${DEFAULT_FILE}`, dump(file), err => {
      if (err) {
        const msg = 'an error occurred while trying to save changes'
        throw Error(printMessage('red', msg) || msg)
      }
    })
  }

  static setOpacity = (opacity: number, file: FileType) => {
    console.log(' opacity: ', opacity)
    file.background_opacity = opacity
  }
}
