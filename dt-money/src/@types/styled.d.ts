import 'styled-components'
import { defaultTheme } from '../Styles/Themes/dafault'

type ThemeType = typeof defaultTheme 

declare module 'style-components' {
  export interface DefaultTheme extends ThemeType {}
}