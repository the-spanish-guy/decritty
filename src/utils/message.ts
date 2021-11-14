import * as Color from './colors'

type TypeColor = 'red' | 'blue' | 'cyan' | 'green' | 'lightGreen' | 'lightCyan' | 'lightRed' | 'lightBlue'
export const printMessage = (color: TypeColor, msg: string) => {
  const colors: Record<string, string> = {
    red: Color.red,
    blue: Color.blue,
    cyan: Color.cyan,
    green: Color.green,
    lightGreen: Color.lightGreen,
    lightCyan: Color.lightCyan,
    lightRed: Color.lightRed,
    lightBlue: Color.lightBlue
  }

  console.log(colors[color], msg)
}
