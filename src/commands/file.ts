import { dump, load } from 'js-yaml'
import { readFileSync, writeFile } from 'fs'
import { FileType, FontType, PaddingType } from '../types/file'
import { DEFAULT_FOLDER, DEFAULT_FILE, DEFAULT_SETTINGS_FOLDER } from '../constants/index'
import { printMessage } from '../utils/message'
import { FontFileType } from '../types/fontFile'

const DEFAULT_PATH = `${DEFAULT_FOLDER}/${DEFAULT_FILE}`

export default class File {
  public static getFile: FileType = load(
    readFileSync(`${DEFAULT_FOLDER}/${DEFAULT_FILE}`, {
      encoding: 'utf8',
      flag: 'r'
    })) as FileType

  public static writeFile = (file: any, path: string = DEFAULT_PATH) => {
    writeFile(path, dump(file), err => {
      if (err) {
        const msg = 'an error occurred while trying to save changes'
        throw Error(printMessage('red', msg) || msg)
      }
    })
  }

  static openFile = (path: string) => {
    return load(readFileSync(path, {
      encoding: 'utf8',
      flag: 'r'
    }))
  }

  static setOpacity = (opacity: number, file: FileType) => {
    console.log(' opacity: ', opacity)
    file.background_opacity = opacity
  }

  static setPadding = (padding: PaddingType[], file: FileType) => {
    const [x, y] = padding

    file.window.padding = { x: Number(x), y: Number(y) }
  }

  static setFontSIze = (size: number, file: FileType) => {
    file.font.size = size
  }

  static setFont = (font: string, file: FileType) => {
    const fontProperties: FontType = file.font

    file.font = {
      ...fontProperties,
      normal: {
        family: font,
        style: 'Regular'
      },
      bold: {
        family: font,
        style: 'Bold'
      },
      italic: {
        family: font,
        style: 'Italic'
      },
      bold_italic: {
        family: font,
        style: 'Bold Italic'
      }
    }
  }

  static setNewFont = (name: Array<string>) => {
    const newFont = Object.fromEntries([name])

    const path = `${DEFAULT_SETTINGS_FOLDER}/fonts.yml`
    const customFontFile = File.openFile(path) as FontFileType

    customFontFile.fonts = { ...customFontFile.fonts, ...newFont }

    File.writeFile(customFontFile, path)
  }
}
