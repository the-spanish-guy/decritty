import { ArgumentParser } from 'argparse'
import { version } from '../package.json'
import Themes from './commands/themes'
import DefaultConfigs from './commands/defaultConfigs'
import File from './commands/file'
import { FileType, PaddingType } from './types/file'
import { successMessage } from './utils/message'

const parser = new ArgumentParser({
  description: 'CLI program to change the alacritty configuration'
})

parser.add_argument('-v', '--version', { action: 'version', version })
parser.add_argument('-i', '--initial', {
  help: 'Command to set a default configs',
  action: 'store_true'
})
parser.add_argument('-o', '--opacity', {
  help: 'Set opacity',
  type: (n: number) => Number(n)
})
parser.add_argument('-p', '--padding', {
  help: 'Set a padding',
  nargs: 2,
  metavar: ['x', 'y'],
  type: (n: number) => Number(n)
})
parser.add_argument('-t', '--theme', { help: 'Choose a color scheme to set' })
parser.add_argument('-f', '--font', { help: 'Set a family font' })
parser.add_argument('-s', '--size', {
  help: 'Set a size to family font',
  type: (n: number) => Number(n)
})
parser.add_argument('-add-font', '--add-font', {
  help: 'Set a new font',
  nargs: 2,
  metavar: ['Alias', 'Font name']
})
parser.add_argument('-l', '--list-themes', {
  help: 'List all themes',
  action: 'store_true'
})

type ArgsTypes = {
  opacity: number
  padding: PaddingType[]
  theme: string
  font: string
  size: number
  initial: string
  add_font: string
  list_themes: boolean
}
const InitCommands = async (args: ArgsTypes) => {
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

  const file: FileType = File.openFile

  console.log(listThemes)

  if (listThemes) return await Themes.listThemes()

  console.log('passei do listThemes')
  if (initial) return DefaultConfigs.initialConfigs()

  if (opacity) File.setOpacity(opacity, file)
  if (padding) File.setPadding(padding, file)
  if (size) File.setFontSIze(size, file)

  console.log(' n passo aqui ?')
  File.writeFile(file)
  successMessage()
}

InitCommands(parser.parse_args())
