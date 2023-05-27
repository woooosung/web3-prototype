// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

const CardOnly = () => {
  return (
    <Card sx={{ border: 0, boxShadow: 0, color: 'common.white', backgroundColor: 'info.main' }}>
      <CardContent sx={{ padding: theme => `${theme.spacing(3.25, 5, 4.5)} !important` }}>
        <Typography
          variant='h6'
          sx={{ display: 'flex', marginBottom: 2.75, alignItems: 'center', color: 'common.white' }}
        >
          2018 3월 모의고사
        </Typography>
        <Typography variant='body2' sx={{ marginBottom: 3, color: 'common.white' }}>
          도전해보세요!
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
            <Avatar alt='Woosung' src='/images/avatars/4.png' sx={{ width: 34, height: 34, marginRight: 2.75 }} />
            <Typography variant='body2' sx={{ color: 'common.white' }}>
              Woosung Kang
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}

export default CardOnly
