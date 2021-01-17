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

const copyTemplateFolders = () => {
  const template_foler = path.join(__dirname, "..", "templates");
  fs.mkdirSync(DEFAULT_THEME_FOLDER, { recursive: true });
  
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
}

const createDefaultTemplate = () => {
  const template_foler = path.join(__dirname, "..", "templates");
  fs.copyFileSync(
    `${template_foler}/${DEFAULT_FILE}`,
    `${DEFAULT_FOLDER}/${DEFAULT_FILE}`
  );
  copyTemplateFolders()
}

const usingConfigOfUser = () => {
  fs.mkdirSync(DEFAULT_FOLDER, { recursive: true });

  fs.copyFileSync(
    `${BKP_FOLDER}/${DEFAULT_FILE}`,
    `${DEFAULT_FOLDER}/${DEFAULT_FILE}`
  );
  return copyTemplateFolders()
};

const createFolderIfNotExists = () => {
  if (fs.existsSync(BKP_FOLDER))
    return process.stdout.write(
      `rename the existing backup folder and try again ${"\n"}`
    );
  if (fs.existsSync(DEFAULT_FOLDER)) {
    fs.renameSync(DEFAULT_FOLDER, BKP_FOLDER);
    process.stdout.write(
      `the backup folder was created at: ${BKP_FOLDER} ${"\n"}`
    );
    usingConfigOfUser()
    return process.stdout.write("Done!" + "\n");
  }

  fs.mkdirSync(DEFAULT_FOLDER, { recursive: true });
  createDefaultTemplate()
  process.stdout.write("Done!" + "\n");
};

const defaultConfigs = () => {
  try {
    return createFolderIfNotExists()
  } catch (error) {
    process.stderr(error)
  }
};

module.exports = defaultConfigs;
