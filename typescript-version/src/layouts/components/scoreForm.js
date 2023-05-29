import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Button } from '@mui/material'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Web3 from 'web3'
import detectProvider from '@metamask/detect-provider'
import { db } from '../../utils/firebaseConfig.js'
import { collection, query, where, getDocs, updateDoc } from 'firebase/firestore/lite'

const tokenAddress = '0x95A6640F5d60AC4D1B0F2465820399fc5B5C7337' // Replace with your contract address
const tokenABI = [
  {
    inputs: [
      {
        internalType: 'uint32',
        name: '_id',
        type: 'uint32'
      },
      {
        internalType: 'uint8',
        name: '_score',
        type: 'uint8'
      },
      {
        internalType: 'uint32',
        name: '_time',
        type: 'uint32'
      }
    ],
    name: 'setStudyData',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '_Q1',
        type: 'string'
      },
      {
        internalType: 'string',
        name: '_Q2',
        type: 'string'
      },
      {
        internalType: 'string',
        name: '_Q3',
        type: 'string'
      },
      {
        internalType: 'string',
        name: '_Q4',
        type: 'string'
      },
      {
        internalType: 'string',
        name: '_Q5',
        type: 'string'
      },
      {
        internalType: 'string',
        name: '_Q6',
        type: 'string'
      }
    ],
    name: 'setSurveyData',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_userAddress',
        type: 'address'
      }
    ],
    name: 'getStudyData',
    outputs: [
      {
        components: [
          {
            internalType: 'uint32',
            name: 'id',
            type: 'uint32'
          },
          {
            internalType: 'uint8',
            name: 'score',
            type: 'uint8'
          },
          {
            internalType: 'uint32',
            name: 'time',
            type: 'uint32'
          }
        ],
        internalType: 'struct UtilityToken.StudyData[]',
        name: '',
        type: 'tuple[]'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_userAddress',
        type: 'address'
      }
    ],
    name: 'getSurveyData',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string'
      },
      {
        internalType: 'string',
        name: '',
        type: 'string'
      },
      {
        internalType: 'string',
        name: '',
        type: 'string'
      },
      {
        internalType: 'string',
        name: '',
        type: 'string'
      },
      {
        internalType: 'string',
        name: '',
        type: 'string'
      },
      {
        internalType: 'string',
        name: '',
        type: 'string'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  }
]

async function writeDataToToken(data) {
  try {
    const provider = await detectProvider()

    if (!provider) {
      throw new Error('MetaMask not detected')
    }
    const web3 = new Web3(provider)

    await provider.request({ method: 'eth_requestAccounts' })

    const tokenContract = new web3.eth.Contract(tokenABI, tokenAddress)

    const _Q1 = data.Q1
    const _Q2 = data.Q2
    const _Q3 = data.Q3

    // Call the desired function of your token contract to write the JSON data
    await tokenContract.methods.setStudyData(_Q1, _Q2, _Q3).send({ from: provider.selectedAddress })
    console.log('Data written successfully')
  } catch (error) {
    console.error('Error writing data to token:', error)
  }
}

async function setData(wallet, score){
  const usersCollectionRef = collection(db, 'user');
  let storeScore;
  let tmpData;
  try {
    const q = query(usersCollectionRef, where('wallet', '==', wallet));
    const querySnapshot = await getDocs(q);
    
    querySnapshot.forEach((doc) => {
      tmpData = doc.data();
  });
    
  } catch (error) {
    console.error('Error getting user data:', error);
  } finally {
    
    if (tmpData !== undefined){
      storeScore = parseInt(tmpData["score"]) + parseInt(score);
    } else {
      console.log("Error occured")
    }
  }

  try {
    await storeData(wallet, storeScore)
  } catch (error) {
    console.error('Error storing user data:', error);
  }
}

async function storeData(wallet, score) {
  const usersCollectionRef = collection(db, 'user')

  const q = query(usersCollectionRef, where('wallet', '==', wallet))
  try {
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const userData = doc.data();
      const updatedData = { ...userData, score : score};
  
      const docRef = doc.ref;
      updateDoc(docRef, updatedData)
        .then(() => {
          console.log('Document updated successfully!')
        })
        .catch(error => {
          console.error('Error updating document:', error)
        })
    })
  } catch (error) {
    console.error('Error getting user data:', error)
  }
}

const ScoreForm = () => {
  const router = useRouter();
  const { score } = router.query;
  
  let cookieValue = ''
  const cookieName = 'myCookie'
    const cookies = document.cookie.split(';')
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim()
      if (cookie.startsWith(`${cookieName}=`)) {
        cookieValue = cookie.substring(cookieName.length + 1)
        break
    }
  }

  const testData = {
    Q1 : 1241234,
    Q2 : score,
    Q3 : 12341
  };

  //writeDataToToken(testData)

  const update = async () => {
    try{
      await setData(cookieValue, score);
    } catch (err) {
      console.log(err);
    }
  }

    if (isScore == null) {
      // If the score is not available, redirect the user back to the upload page
      router.push('/upload')
    }
  }, [score, router])

  return (
    <div>
      <Typography align='center' variant='h4'>🔥Score🔥</Typography><br/>
      <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant='h6' sx={{ fontWeight: 1000 }}>
          Number of correct answers: {isScore}
          <br />
          <br />
        </Typography>
      </Box>
      <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant='h6' sx={{ fontWeight: 1000}}>
        <Button onClick={update}>Update Score</Button>
        <Button onClick={() => (router.push('/ranking'))}>Ranking Page</Button>
        </Typography>
      </Box>
    </div>
  )
}

export default ScoreForm
