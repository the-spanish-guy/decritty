type ENVType = {
  TERM: 'xterm-256color' | 'alacritty'
}

type DimensionsType = {
  columns: number
  lines: number
}

type AxesType = {
  x: number
  y: number
}

export type PositionType = AxesType
export type PaddingType = AxesType

type DecorationType = 'full' | 'none' | 'transparent' | 'buttonless'
type StartupType = 'Windowed' | 'Maximized' | 'Fullscreen' | 'SimpleFullscreen'

type GtkThemeVariant = 'None' | 'light' | 'dark'

type WindowType = {
  dimensions?: DimensionsType
  position?: PositionType
  padding?: PaddingType
  dynamic_padding?: boolean
  decorations?: DecorationType
  opacity?: number
  startup_mode?: StartupType
  title?: string
  dynamic_title?: boolean
  gtk_theme_variant?: GtkThemeVariant
}

type ScrollingType = {
  history: number
  multiplier: number
}

export type AttributesFontType = {
  family: string
  style: string
}

export type FontType = {
  normal?: AttributesFontType
  bold?: AttributesFontType
  italic?: AttributesFontType
  bold_italic?: AttributesFontType
  size?: number
  offset?: AxesType
  glyph_offset?: AxesType
  use_thin_strokes?: boolean
}

type ColorsPrimaryType = {
  background?: string
  foreground?: string
  bright_foreground?: string
  dim_foreground?: string
}

type CursorColorType = {
  text?: string
  cursor?: string
}

type DefaultAttributesColorType = {
  foreground: string
  background: string
}
type SearchType = {
  matches: DefaultAttributesColorType
  focused_match: DefaultAttributesColorType
  bar: DefaultAttributesColorType
}

type HintsType = {
  start: DefaultAttributesColorType
  end: DefaultAttributesColorType
}

type SelectionType = {
  text: string
  background: string
}

type AttributesColorsType = {
  black: string
  red: string
  green: string
  yellow: string
  blue: string
  magenta: string
  cyan: string
  white: string
}

type ColorsType = {
  primary?: ColorsPrimaryType
  cursor?: CursorColorType
  vi_mode_cursor?: CursorColorType
  search?: SearchType
  hints?: HintsType
  line_indicators?: DefaultAttributesColorType
  selection?: SelectionType
  normal?: AttributesColorsType
  bright?: AttributesColorsType
  dim?: AttributesColorsType
  transparent_background_colors?: boolean
}

type CommandType = {
program: string
args: Array<string>
}

type BellType = {
  animation?: 'Ease' | 'EaseOut' | 'EaseOutSine' | 'EaseOutQuad' | 'EaseOutCubic' | 'EaseOutQuart' | 'EaseOutQuint' | 'EaseOutExpo' | 'EaseOutCirc' | 'Linear'
  duration?: number
  color?: string
  command?: CommandType
}

type BlockShape = 'Block'// ▇
type UnderlineShape = 'Underline' // _
type BeamShape = 'Beam' // |

type CursorStyleType = {
  shape?: BlockShape | UnderlineShape | BeamShape
  blinking?: 'Never' | 'Off' | 'On' | 'Always'
}

type CursorType = {
  style?: CursorStyleType
  vi_mode_style?: CursorStyleType
  blink_interval?: number
  unfocused_hollow?: boolean
  thickness?: number
}

type ShellType = {
  program: string
  args?: Array<string>
}

type MouseType = {
  double_click?: {
    threshold: number
  }
  triple_click?: {
    threshold: number
  }
  hide_when_typing?: boolean

}

export type FileType = {
  env?: ENVType
  window: WindowType
  scrolling?: ScrollingType
  font: FontType
  draw_bold_text_with_bright_colors?: boolean
  colors?: ColorsType
  bell?:BellType
  background_opacity?: number
  cursor?: CursorType
  shell?: ShellType
  working_directory?: string
  alt_send_esc?: boolean
  ipc_socket?: boolean
  mouse?: MouseType
}
