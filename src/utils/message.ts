import * as Color from './colors'

type TypeColor = 'red' | 'blue' | 'cyan' | 'green' | 'lightGreen' | 'lightCyan' | 'lightRed' | 'lightBlue' | 'magenta' | 'lightMagenta'
export const printMessage = (color: TypeColor, msg: string) => {
  const colors: Record<string, string> = {
    red: Color.red,
    blue: Color.blue,
    cyan: Color.cyan,
    green: Color.green,
    magenta: Color.magenta,
    lightRed: Color.lightRed,
    lightBlue: Color.lightBlue,
    lightCyan: Color.lightCyan,
    lightGreen: Color.lightGreen,
    lightMagenta: Color.lightMagenta
  }

  console.log(colors[color], msg)
}
