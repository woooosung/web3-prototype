import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

type CardOnlyProps = {  
  text: string
  description: string
}

const CardOnly = (props: CardOnlyProps) => {
  const { text, description} = props

  return (
    <Card sx={{ border: 0, boxShadow: 0, color: 'common.white', backgroundColor: '#16a5f0' }}>
      <CardContent sx={{ padding: theme => `${theme.spacing(3, 4, 4)} !important` }}>
        <Typography
          variant='h6'
          sx={{ display: 'flex', marginBottom: 2, alignItems: 'center', color: 'common.white' }}
        >
          {text}
        </Typography>
        { description ?
          <Typography variant='body2' sx={{ marginBottom: 3, color: 'common.white' }}>
            {description}
          </Typography>
        : null }   
      </CardContent>
    </Card>
  )
}

export default CardOnly
