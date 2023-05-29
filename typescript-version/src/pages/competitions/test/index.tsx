import { Button } from '@mui/material'
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useRouter } from 'next/router'
 

const Upload = () => {

  const router = useRouter();

  const [inputs, setInputs] = useState<string[]>(['', '', '', '', '']); // Array to store the input values
  const [timer, setTimer] = useState(600); // Timer in seconds
  const [timerRunning, setTimerRunning] = useState(true); // Flag to indicate if the timer is running

  const query= router.query
  const grade = query.grade
  const id = query.id
  const AAA: any = {'g13': ['5', '4', '5', '5', '23'], 'g16': ['5', '3', '5', '3', '10'], 'g19': ['2', '3', '4', '2', '6'],
              'g23' : ['1', '1', '1', '3', '15'], 'g26': ['2', '5', '3', '2', '72'], 'g29': ['1', '1', '1', '5', '4'],
              'g33' : ['1', '5', '2', '5', '45'], 'g36': ['5', '3', '2', '4', '96'], 'g39': ['4', '5', '1', '50', '25'] }
  const indexx =`g${grade}${id}`

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timerRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      submitBtn();

      /*
      setTimerRunning(false); // Stop the timer when it reaches 0
      router.push(`/score?score=${calculateScore()}`); // Redirect to the score page with the score as a query parameter */
    }
    
    return () => {
        clearInterval(interval);
      };
    }, []);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
      const inputValue = event.target.value; // Get the input value
      setInputs(prevInputs => {
        const updatedInputs = [...prevInputs];
        updatedInputs[index] = inputValue; // Store the input value in the corresponding index of the array
        
        return updatedInputs;
      });
    };

    const submitBtn = () => {
      setTimerRunning(false); // Stop the timer
      
      router.push(`/score?score=${calculateScore()}`); // Redirect to the score page with the score as a query parameter
    };

    const handleSubmit = (event: React.FormEvent) => {
      event.preventDefault();
    };

    const calculateScore = () => {
      // Process the inputs and calculate the number of correct answers
      const correctAnswers = AAA[indexx]
      
      return inputs.filter((input, index) => input.trim().toLowerCase() === correctAnswers[index]).length;
    };

    const formatTime = (time: number) => {
      const minutes = Math.floor(time / 60);
      const seconds = time % 60;
      
      return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
      <div>
        <h1>🔥Competition🔥</h1>
        <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Typography variant='h6' sx={{ fontWeight: 1000, marginBottom: 1.5 }}>
          Time remaining: {formatTime(timer)}
          </Typography>
          </Box>
      <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <form onSubmit={handleSubmit}>
          {/* Display image files from the server */}
          <img src={`../../images/problem/H${grade}_0${id}_1.png`} alt="Image 1" width="500px"/>
          <br /><br />
          <input type="text" onChange={event => handleInputChange(event, 0)} />
          <br /><br />
          <img src={`../../images/problem/H${grade}_0${id}_2.png`} alt="Image 2" width="500px"/>
          <br /><br />
          <input type="text" onChange={event => handleInputChange(event, 1)} />
          <br /><br />
          <img src={`../../images/problem/H${grade}_0${id}_3.png`} alt="Image 3" width="500px"/>
          <br /><br />
          <input type="text" onChange={event => handleInputChange(event, 2)} />
          <br /><br />
          <img src={`../../images/problem/H${grade}_0${id}_4.png`} alt="Image 4" width="500px"/>
          <br /><br />
          <input type="text" onChange={event => handleInputChange(event, 3)} />
          <br /><br />
          <img src={`../../images/problem/H${grade}_0${id}_5.png`} alt="Image 5" width="500px"/>
          <br /><br />
          <input type="text" onChange={event => handleInputChange(event, 4)} />
          <br /><br /><br />
          <Button onClick={submitBtn} type='submit'>Submit</Button>
        </form>
        </Box>
      </div>
    );
};

export default Upload;