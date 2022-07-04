# Decritty

> Inspired on [pycritty](https://github.com/antoniosarosi/pycritty)

![imagem](./.screenshots/argumentos.gif)

> Change your alacritty config in real time!</br>

---

**Table of Contents**

- [:wrench: Installation](#installation)
- [:dark_sunglasses: Usage](#usage)
- [:file_folder: Folder Structure](#folder-structure)
- [:pencil: Fonts](#fonts)

---

<a id="installation"></a>

## :wrench: Installation

- npm

  ```shell
  npm i -g decritty
  ```

<a id="usage"></a>

## :dark_sunglasses: Usage

### Initial configs

Run the command below to create the initial settings</br>

> If the alacritty folder is already exists, it will be backup and the folder structure will be set up to work correctly

```shell
decritty -i
```

### Opacity

This argument receive a int | float

```shell
decritty -o 0.6
```

### Padding

This argument receives 2 parameters x, y of type int</br>
X and Y need not be exactly the same

```shell
decritty -p 2 2

---

decritty -p 4 8
```

### Font

This argument receives the alias that is in the font file </br>

> You may be found the file on `~/.config/alacritty/settings/fonts.yml` </br>
> [click here](#fonts) to see structure of `fonts` file

```shell
decritty -f FiraCode
```

### Add new font

This argument receives two parameters `Alias: 'Font Name'`</br>
`Alias` is the alias of the font name </br>
`'Font Name'` is the original font name </br>

> You may be found the file on `~/.config/alacritty/settings/fonts.yml`

```shell
decritty --add-font FiraCode 'Fira Code Nerd Font'

# abbreviated command
decritty -af FiraCode 'Fira Code Nerd Font'
```

### Font Size

This argument receive a int

```shell
decritty -s 18
```

### Themes

This argument receive the name of theme</br>

> You may be found the file folder on `~/.config/alacritty/settings/themes`</br>
> [click here](#folder-structure) to see folder structure

```shell
decritty -t AyuDark
```

![imagem](./.screenshots/temas.gif)

If you wish, you can match all the arguments

![imagem](./.screenshots/argumentos.gif)

### Add Themes

To add a new theme just move it to `~/.config/alacritty/settings/themes` and then run

```shell
decritty -t YourTheme
```

### List Resources

To list all resources

```shell
decritty --list-resources

# abbreviated command
decritty -l
```

### Set Shell

To set a new shell

```bash
decritty --set-shell zsh

## abbreviated command
decritty -ss zsh
```

<a id="folder-structure"></a>

## :file_folder: Folder Structure

```
alacritty
│   alacritty.yml
│
│
└───settings
│   │   fonts.yml
│   │
│   │
│   └───themes
│       │   AyuDark.yml
│       │   AyuMirage.yml
│       │   ...
```

<a id="fonts"></a>

## :pencil: Fonts

> `~/.config/alacritty/settings/fonts.yml`

```yaml
fonts:
  Ubuntu: UbuntuMono Nerd Font # alias: font name
  FiraCode: Fira Code Nerd Font
```

## :writing_hand: License

This project is under the [MIT LICENSE](https://en.wikipedia.org/wiki/MIT_License). See [LICENSE](https://github.com/the-spanish-guy/decritty/blob/main/LICENSE) for more information.

---

Made by [the spanish guy](https://github.com/the-spanish-guy) with :purple_heart:
