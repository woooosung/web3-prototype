import Image from 'next/image'
import Box, { BoxProps } from '@mui/material/Box'
import { styled } from '@mui/material/styles'

// ** Styled Components
const MenuHeaderWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingRight: theme.spacing(4.5),
  transition: 'padding .25s ease-in-out',
  minHeight: theme.mixins.toolbar.minHeight
}))

const VerticalNavHeader = () => {
  return (
    <MenuHeaderWrapper className='nav-header' sx={{ pl: 6 }}>
      <Image src='/dngu.png' alt='Logo' width={320} height={80} />
    </MenuHeaderWrapper>
  )
}

export default VerticalNavHeader
