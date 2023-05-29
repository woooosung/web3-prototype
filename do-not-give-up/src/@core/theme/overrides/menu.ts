// ** MUI Imports
import { Theme } from '@mui/material/styles'

const Menu = (theme: Theme) => {
  return {
    MuiMenu: {
      styleOverrides: {
        root: {
          '& .MuiMenu-paper': {
            borderRadius: 5,
            boxShadow: theme.shadows[8]
          }
        }
      }
    }
  }
}

export default Menu
