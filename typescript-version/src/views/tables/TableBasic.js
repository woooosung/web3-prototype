// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import { Avatar } from '@mui/material'

import { useEffect, useState } from 'react';

import { db } from '../../utils/firebaseConfig.js'
import { collection, query, getDocs, orderBy, limit } from 'firebase/firestore/lite'

const createData = (rank, name, score, level, ow, image) => {
  return { rank, name, score, level, ow, image }
}

function determineStep(score) {
  let step;
  if (score < 20) {
    step = "Novice";
  } else if (score < 50) {
    step = "Contributor";
  } else if (score < 100) {
    step = "Master";
  } else {
    step = "Grand Master";
  }

  return step;
}

function determineImage(gender) {
  let image;
  if (gender === "male"){
    image = "man"
  } 
  else if (gender === "female") {
    image = "girl"
  }
  else {
    image = "unknown"
  }

  return image;
}

let rows= [];

const createRow = (data) =>  {
  rows = [];
  for (let i = 0; i < data.length; i++){
    let rank = i+1;
    let name = data[i].userName;
    let score = data[i].score;
    const step = determineStep(score);
    let ow = data[i].intro;
    let image = determineImage(data[i].gender)

    rows.push(createData(rank, name, score, step, ow, image))
  }
}

const TableBasic = () => {
  const [topScores, setTopScores] = useState([]);
  useEffect(() => {
    const fetchTopScores = async () => {
      try {
        const scoresCollectionRef = collection(db, 'user');
        const queryRef = query(scoresCollectionRef, orderBy('score', 'desc'), limit(5));
        const querySnapshot = await getDocs(queryRef);
    
        const scoresData = [];
        querySnapshot.forEach((doc) => {
          const scoreData = doc.data();
          scoresData.push(scoreData);
        });

        setTopScores(scoresData);
      } catch (error) {
        console.error('Error fetching top scores:', error);
      }
    };
    fetchTopScores();
    
  }, []);
  
  createRow(topScores)
  
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>Rank</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Score</TableCell>
            <TableCell>Level</TableCell>
            <TableCell>One word</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow
              key={row.name}
              sx={{
                '&:last-of-type td, &:last-of-type th': {
                  border: 0
                }
              }}
            >
              <TableCell><h4>{row.rank}</h4></TableCell>
              <TableCell>
                <h3>{row.name}</h3>
              </TableCell>
              <TableCell><h4>{row.score}</h4></TableCell>
              <TableCell><h4>{row.level}</h4></TableCell>
              <TableCell><Avatar alt='Woosung' src={`/images/avatars/${row.image}.png`} sx={{ width: 34, height: 34 }} /><h4>{row.ow}</h4></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TableBasic
