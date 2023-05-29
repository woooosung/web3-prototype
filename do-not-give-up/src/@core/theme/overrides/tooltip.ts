// ** MUI Imports
import { Theme } from '@mui/material/styles'

// ** Util Import
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'

const Tooltip = (theme: Theme) => {
  return {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: hexToRGBA(theme.palette.grey[900], 0.9)
        },
        arrow: {
          color: hexToRGBA(theme.palette.grey[900], 0.9)
        }
      }
    }
  }
}

export default Tooltip
