import { ArgumentParser } from 'argparse'
import { version } from '../package.json'
import InitCommands from './commands/index'

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
  type: (n: number | string) => Number(n)
})
parser.add_argument('-p', '--padding', {
  help: 'Set a padding',
  nargs: 2,
  metavar: ['x', 'y'],
  type: 'int'
})
parser.add_argument('-t', '--theme', { help: 'Choose a color scheme to set' })
parser.add_argument('-f', '--font', { help: 'Set a family font' })
parser.add_argument('-s', '--size', {
  help: 'Set a size to family font',
  type: 'int'
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

/* parser.parse_args() */

InitCommands(parser.parse_args())
