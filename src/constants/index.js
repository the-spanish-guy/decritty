const homedir = require('os').homedir()

const DEFAULT_FOLDER = `${homedir}/.config/alacritty`
const BKP_FOLDER = `${homedir}/.config/old_alacritty`
const DEFAULT_FILE = 'alacritty.yml'

module.exports = {DEFAULT_FOLDER, DEFAULT_FILE, BKP_FOLDER}
