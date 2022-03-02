import * as Color from './colors'

type TypeColor =
  | 'red'
  | 'blue'
  | 'cyan'
  | 'green'
  | 'white'
  | 'magenta'
  | 'lightRed'
  | 'lightBlue'
  | 'lightCyan'
  | 'lightGreen'
  | 'lightWhite'
  | 'lightMagenta'
export const printMessage = (color: TypeColor, msg: string): string | void => {
  const colors: Record<string, string> = {
    red: Color.red,
    blue: Color.blue,
    cyan: Color.cyan,
    green: Color.green,
    white: Color.white,
    magenta: Color.magenta,
    lightRed: Color.lightRed,
    lightBlue: Color.lightBlue,
    lightCyan: Color.lightCyan,
    lightGreen: Color.lightGreen,
    lightWhite: Color.lightWhite,
    lightMagenta: Color.lightMagenta
  }

  return console.log(colors[color], msg)
}

export const successMessage = () => {
  printMessage('green', 'Done! ✨' + '\n')

  printMessage('lightGreen', 'if there are no changes, try restarting the terminal' + '\n')
}
