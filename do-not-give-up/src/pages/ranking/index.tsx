import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import TableBasic from 'src/views/tables/TableBasic.js'

const Rankings = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h5'> Rankers </Typography>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <TableBasic />
        </Card>
      </Grid>
    </Grid>
  )
}

export default Rankings
