// ** MUI Imports
import { Theme } from '@mui/material/styles'

const Snackbar = (theme: Theme) => {
  return {
    MuiSnackbarContent: {
      styleOverrides: {
        root: {
          backgroundColor: theme.palette.grey[900]
        }
      }
    }
  }
}

export default Snackbar
