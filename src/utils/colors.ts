// ref: https://en.wikipedia.org/wiki/ANSI_escape_code#Colors

type Red = string | number
type Green = string | number
type Blue = string | number

const getColor = (color: number) => `\x1b[${color}m%s\x1b[0m`
const getRGBColor = (red: Red, green: Green, blue: Blue) => `\x1b[ 38;2;⟨${red}⟩;⟨${green}⟩;⟨${blue}⟩ m`

const red = getColor(31)
const blue = getColor(34)
const cyan = getColor(36)
const green = getColor(32)
const lightGreen = getColor(92)
const lightCyan = getColor(96)
const lightRed = getColor(91)
const lightBlue = getColor(96)

export {
  red,
  blue,
  cyan,
  green,
  lightGreen,
  lightCyan,
  lightRed,
  lightBlue
}
