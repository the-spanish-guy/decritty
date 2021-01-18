const homedir = require('os').homedir()

const DEFAULT_FOLDER = `${homedir}/.config/alacritty`
const DEFAULT_SETTINGS_FOLDER = `${DEFAULT_FOLDER}/settings`
const DEFAULT_THEME_FOLDER = `${DEFAULT_SETTINGS_FOLDER}/themes`
const BKP_FOLDER = `${homedir}/.config/old_alacritty`
const DEFAULT_FILE = 'alacritty.yml'
const FONT_FILE = 'fonts.yml'

module.exports = {
  DEFAULT_FOLDER,
  DEFAULT_SETTINGS_FOLDER,
  DEFAULT_THEME_FOLDER,
  BKP_FOLDER,
  DEFAULT_FILE,
  FONT_FILE
}
