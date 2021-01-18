const fs = require('fs')
const path = require('path')

const constants = require('../constants')
// const fontTemplate = require("../templates/fonts");
const {
  DEFAULT_FOLDER,
  DEFAULT_FILE,
  BKP_FOLDER,
  DEFAULT_THEME_FOLDER,
  DEFAULT_SETTINGS_FOLDER
} = constants

/**
 *
 * @param {Array} files
 * @param {String} destinationFolder
 * @param {String} localFolder
 */
const copyFolderRecursive = (files, localFolder, destinationFolder) => {
  files.map((file) => {
    fs.copyFileSync(`${localFolder}/${file}`, `${destinationFolder}/${file}`)
  })
}

const copyTemplateFolders = () => {
  const templateFoler = path.join(__dirname, '..', 'templates')
  fs.mkdirSync(DEFAULT_THEME_FOLDER, { recursive: true })
  fs.copyFileSync(
    `${templateFoler}/${DEFAULT_FILE}`,
    `${DEFAULT_FOLDER}/${DEFAULT_FILE}`
  )

  const themes = fs.readdirSync(`${templateFoler}/themes/`)
  copyFolderRecursive(
    themes,
    `${templateFoler}/themes`,
    `${DEFAULT_THEME_FOLDER}/`
  )

  fs.copyFileSync(
    `${templateFoler}/fonts.yml`,
    `${DEFAULT_SETTINGS_FOLDER}/fonts.yml`
  )
}

const createFolderIfNotExists = () => {
  if (fs.existsSync(BKP_FOLDER))
    return console.log(
      `rename the existing backup folder and try again ${'\n'}`
    )
  if (fs.existsSync(DEFAULT_FOLDER)) {
    fs.renameSync(DEFAULT_FOLDER, BKP_FOLDER)
    console.log(`the backup folder was created at: ${BKP_FOLDER} ${'\n'}`)
  }

  fs.mkdirSync(DEFAULT_FOLDER, { recursive: true })
  copyTemplateFolders()
  console.log('Done!' + '\n')
}

const defaultConfigs = () => {
  try {
    return createFolderIfNotExists()
  } catch (error) {
    console.error(error)
  }
}

module.exports = defaultConfigs
