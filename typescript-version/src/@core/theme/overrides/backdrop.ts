// ** MUI Imports
import { Theme } from '@mui/material/styles'

const Backdrop = (theme: Theme) => {
  return {
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor:`rgba(${theme.palette.customColors.main}, 0.7)`
        },
        invisible: {
          backgroundColor: 'transparent'
        }
      }
    }
  }
}

export default Backdrop
