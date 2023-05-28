import { Button } from '@mui/material'
import Grid from '@mui/material/Grid'
import { useState } from 'react'
import CardImg from 'src/views/cards/CardImg'
import CardOnly from 'src/views/cards/CardOnly'

const CardBasic = () => {
  const [grade, setGrade] = useState<number>(3)

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} sx={{ paddingBottom: 4, justifyContent: 'right' }}>
        <Button onClick={()=>setGrade(3)} variant='contained' color='primary' sx={{ marginTop: 2 }}>3학년</Button>
        <Button onClick={()=>setGrade(2)} variant='contained' color='primary' sx={{ marginTop: 2, marginLeft: 3 }}>2학년</Button>
        <Button onClick={()=>setGrade(1)} variant='contained' color='primary' sx={{ marginTop: 2, marginLeft: 3 }}>1학년</Button>
      </Grid>
      <Grid item xs={12} sm={4} md={4}>
        <CardImg grade={grade} id={3} text="2023 3월 모의고사"/>
      </Grid>
      <Grid item xs={12} sm={4} md={4}>
        <CardImg grade={grade} id={6} text="2022 6월 모의고사"/>
      </Grid>
      <Grid item xs={12} sm={4} md={4}>
        <CardImg grade={grade} id={9} text="2022 9월 모의고사"/>
      </Grid>
      <Grid item xs={12} sm={4} md={4}>
        <CardOnly text='참여 인원: (3/15)' description='도전해보세요!' />
      </Grid>
      <Grid item xs={12} sm={4} md={4}>
        <CardOnly text='참여 인원: (10/15)' description='도전해보세요!' />
      </Grid>
      <Grid item xs={12} sm={4} md={4}>
        <CardOnly text='참여 인원: (15/15)' description='도전해보세요!' />
      </Grid>
    </Grid>
  )
}



export default CardBasic
