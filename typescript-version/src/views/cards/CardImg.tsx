// ** MUI Imports
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

const CardImg = () => {
  return (
    <Card>
      <CardMedia sx={{ height: '10rem' }} image='/images/cards/2023_03.png' />
      <CardContent>
        <Typography variant='h6' sx={{ marginBottom: 2 }}>
          2023 3월 모의고사
        </Typography>
        <Typography variant='body2'>
          도전해보세요!
        </Typography>
      </CardContent>
    </Card>
  )
}

export default CardImg
