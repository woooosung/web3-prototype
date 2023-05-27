import Link from 'next/link'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { CardActionArea } from '@mui/material'

type CardImgProps = {
  text: string
  id: number
  grade: number
}

const CardImg = (props: CardImgProps) => {
  const {text, id, grade } =  props

  return (
    <Card>
      <Link href={`/competitions/test`} passHref>
        <CardActionArea>
          <CardMedia sx={{ height: '5rem' }} image='/images/cards/2023_03.png' />
          <CardContent>
            <Typography variant='h6' sx={{ marginBottom: 2 }}>
              {text}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
    </Card>
  )
}

export default CardImg
