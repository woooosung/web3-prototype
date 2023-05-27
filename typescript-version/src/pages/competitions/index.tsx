// ** MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

// ** Demo Components Imports
import CardImg from 'src/views/cards/CardImg'
import CardOnly from 'src/views/cards/CardOnly'

const CardBasic = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12} sx={{ paddingBottom: 4 }}>
        <Typography variant='h5'>Competitions</Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <CardImg />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <CardImg />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <CardImg />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <CardOnly />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <CardOnly />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <CardOnly />
      </Grid>
    </Grid>
  )
}

export default CardBasic
