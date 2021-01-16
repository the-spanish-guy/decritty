const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");

const constants = require("../constants");

const createFolderIfNotExists = () => {
  const { DEFAULT_FOLDER, DEFAULT_FILE, BKP_FOLDER } = constants;

  if (fs.existsSync(DEFAULT_FOLDER)) {
    fs.renameSync(DEFAULT_FOLDER, BKP_FOLDER);
  }
  fs.mkdirSync(DEFAULT_FOLDER, { recursive: true });
  fs.copyFileSync(
    `${BKP_FOLDER}/${DEFAULT_FILE}`,
    `${DEFAULT_FOLDER}/${DEFAULT_FILE}`
  );
};

const writeFile = (file) => {
  try {
    console.log(file);
    fs.writeFile(
      `${constants.DEFAULT_FOLDER}/${constants.DEFAULT_FILE}`,
      yaml.dump(file),
      (err) => console.log(err)
    );
  } catch (err) {
    console.log(err);
  }
};

const readFile = (args) => {
  try {
    const file = yaml.load(
      fs.readFileSync(`${constants.DEFAULT_FOLDER}/${constants.DEFAULT_FILE}`, {
        encoding: "utf8",
        flag: "r",
      })
    );
    //let {colors, background_opacity} = file
    //console.log(colors, background_opacity)
    //file.background_opacity = 0.8;
    //writeFile(file);
  } catch (err) {
    console.log(err);
  }
};

/**
 *
 * @param {*} args Object
 */
const init = (args) => {
  const { opacity, padding, colors, font, size } = args
  try {
    const file = yaml.load(
      fs.readFileSync(`${constants.DEFAULT_FOLDER}/${constants.DEFAULT_FILE}`, {
        encoding: "utf8",
        flag: "r",
      })
    );

    file.background_opacity = opacity === undefined ? file.background_opacity : opacity
    file.window.padding.x = padding === undefined ? file.window.padding.x : padding[0]
    file.window.padding.y = padding === undefined ? file.window.padding.y : padding[1]
    file.font.size = size === undefined ? file.font.size : size
    writeFile(file);
  } catch (err) {
    console.log(err);
  }
};

module.exports = init;
