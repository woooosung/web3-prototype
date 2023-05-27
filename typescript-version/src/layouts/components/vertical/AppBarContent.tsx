import Box from '@mui/material/Box'
import UserDropdown from 'src/@core/layouts/components/shared-components/UserDropdown'
import NotificationDropdown from 'src/@core/layouts/components/shared-components/NotificationDropdown'

const AppBarContent = () => {
  return (
    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'right' }}>
      <Box className='actions-right' sx={{ display: 'flex', alignItems: 'center' }}>
        <NotificationDropdown />
        <UserDropdown />
      </Box>
    </Box>
  )
}

export default AppBarContent
