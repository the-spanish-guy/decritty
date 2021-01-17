const { ArgumentParser } = require("argparse");
const { version } = require("../package.json");
const Init = require("./commands/index");

const parser = new ArgumentParser({
  description: "CLI program to change the alacritty configuration",
});

parser.add_argument("-v", "--version", { action: "version", version });
parser.add_argument("-i", "--initial", {
  help: "Command to set a default configs",
  action: "store_true",
});
parser.add_argument("-o", "--opacity", {
  help: "Set opacity",
  type: (n) => Number(n),
});
parser.add_argument("-p", "--padding", {
  help: "Set a padding",
  nargs: 2,
  metavar: ["x", "y"],
  type: "int",
});
parser.add_argument("-t", "--theme", { help: "Choose a color scheme to set" });
parser.add_argument("-f", "--font", { help: "Set a family font" });
parser.add_argument("-s", "--size", {
  help: "Set a size to family font",
  type: "int",
});

Init(parser.parse_args());
