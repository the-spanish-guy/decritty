const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");
const emoji = require("emojic")

const constants = require("../constants");
const initialConfig = require("./initialConfig");
const colorSchemeAndFont = require("./colorSchemeAndFont");
const { DEFAULT_FOLDER, DEFAULT_FILE, BKP_FOLDER } = constants;

const writeFile = (file) => {
  try {
    fs.writeFile(
      `${DEFAULT_FOLDER}/${DEFAULT_FILE}`,
      yaml.dump(file),
      (err) => {
        if (err)
          throw new Error("an error occurred while trying to save changes");
      }
    );
  } catch (err) {
    console.log(err);
  }
};

/**
 *
 * @param {*} args Object
 */
const init = async (args) => {
  const { opacity, padding, theme, font, size, initial } = args;

  if (initial) return initialConfig();

  try {
    let file = yaml.load(
      fs.readFileSync(`${DEFAULT_FOLDER}/${DEFAULT_FILE}`, {
        encoding: "utf8",
        flag: "r",
      })
    );

    if (theme || font) {
      const { new_colors, f } = await colorSchemeAndFont(file, { font, theme });
      if (font) file.font.normal.family = f;
      if (theme) file.colors = new_colors;
    }

    file.font.size = size === undefined ? file.font.size : size;
    file.background_opacity =
      opacity === undefined ? file.background_opacity : opacity;
    file.window.padding.x =
      padding === undefined ? file.window.padding.x : padding[0];
    file.window.padding.y =
      padding === undefined ? file.window.padding.y : padding[1];
    writeFile(file);
    process.stdout.setEncoding('utf-8').write("Done! ✨" + "\n")
    process.stdout.write("if there are no changes, try restarting the terminal" + "\n")
  } catch (err) {
    process.stderr.write(error)
  }
};

module.exports = init;
