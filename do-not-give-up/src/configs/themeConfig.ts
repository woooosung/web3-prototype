import { ContentWidth } from 'src/@core/layouts/types'

type ThemeConfig = {
  appName: string
  routingLoader: boolean
  disableRipple: boolean
  navigationSize: number
  menuTextTruncate: boolean
  contentWidth: ContentWidth
  responsiveFontSizes: boolean
}

const themeConfig: ThemeConfig = {
  appName: 'Do Not Give Up',
  contentWidth: 'boxed',

  routingLoader: true,

  menuTextTruncate: true,
  navigationSize: 260,

  responsiveFontSizes: true,
  disableRipple: false,
}

export default themeConfig
