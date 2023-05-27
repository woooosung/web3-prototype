import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Button } from '@mui/material'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const ScorePage = () => {
  const router = useRouter();
  const { score } = router.query;

  useEffect(() => {
    if (!score) {
      // If the score is not available, redirect the user back to the upload page
      router.push('/upload');
    }
  }, [score, router]);

  return (
    <div>
      <h1>🔥Score🔥</h1>
      <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant='h6' sx={{ fontWeight: 1000}}>
        Number of correct answers: {score}
        <br/><br/>
        </Typography>
        </Box>
      <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant='h6' sx={{ fontWeight: 1000}}>
    
        <Button onClick={()=>router.push('/ranking')}>Ranking Page</Button>
        </Typography>
        </Box>


    </div>
  );
};

export default ScorePage;