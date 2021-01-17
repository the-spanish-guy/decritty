const fs = require("fs");
const yaml = require("js-yaml");
const os = require("os");
const path = require("path");

const constants = require("../constants");
//const fontTemplate = require("../templates/fonts");
const {
  DEFAULT_FOLDER,
  DEFAULT_FILE,
  BKP_FOLDER,
  DEFAULT_THEME_FOLDER,
  DEFAULT_SETTINGS_FOLDER,
} = constants;

/**
 *
 * @param {*} files Array
 * @param {*} destinationFolder String
 * @param {*} localFolder String
 */
const copyFolderRecursive = (files, localFolder, destinationFolder) => {
  files.map((file) => {
    fs.copyFileSync(`${localFolder}/${file}`, `${destinationFolder}/${file}`);
  });
};

const defaultConfigs = () => {
  try {
    if (fs.existsSync(DEFAULT_FOLDER)) {
      fs.rename(DEFAULT_FOLDER, BKP_FOLDER, (err) => {
        if (err)
          throw Error(
            "An error occurred while creating the backup folder, rename the existing folder and try again"
          );
      });
    }

    fs.mkdirSync(DEFAULT_FOLDER, { recursive: true });
    fs.mkdirSync(DEFAULT_THEME_FOLDER, { recursive: true });

    fs.copyFileSync(
      `${BKP_FOLDER}/${DEFAULT_FILE}`,
      `${DEFAULT_FOLDER}/${DEFAULT_FILE}`
    );

    const template_foler = path.join(__dirname, "..", "templates");

    const themes = fs.readdirSync(`${template_foler}/themes/`);
    copyFolderRecursive(
      themes,
      `${template_foler}/themes`,
      `${DEFAULT_THEME_FOLDER}/`
    );

    fs.copyFileSync(
      `${template_foler}/fonts.yml`,
      `${DEFAULT_SETTINGS_FOLDER}/fonts.yml`
    );
  } catch (error) {
    console.log(error);
  }
};

module.exports = defaultConfigs;
