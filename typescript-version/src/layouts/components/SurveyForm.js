import React, { useState } from 'react'
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Box } from '@mui/material'
import { db } from '../../utils/firebaseConfig.js'
import { collection, addDoc } from 'firebase/firestore/lite'
import { useRouter } from 'next/router'
import Web3 from 'web3'
import detectProvider from '@metamask/detect-provider'

const tokenAddress = '0x95A6640F5d60AC4D1B0F2465820399fc5B5C7337'; // Replace with your contract address
const tokenABI = [{
  "inputs": [
    {
      "internalType": "uint32",
      "name": "_id",
      "type": "uint32"
    },
    {
      "internalType": "uint8",
      "name": "_score",
      "type": "uint8"
    },
    {
      "internalType": "uint32",
      "name": "_time",
      "type": "uint32"
    }
  ],
  "name": "setStudyData",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "inputs": [
    {
      "internalType": "string",
      "name": "_Q1",
      "type": "string"
    },
    {
      "internalType": "string",
      "name": "_Q2",
      "type": "string"
    },
    {
      "internalType": "string",
      "name": "_Q3",
      "type": "string"
    },
    {
      "internalType": "string",
      "name": "_Q4",
      "type": "string"
    },
    {
      "internalType": "string",
      "name": "_Q5",
      "type": "string"
    },
    {
      "internalType": "string",
      "name": "_Q6",
      "type": "string"
    }
  ],
  "name": "setSurveyData",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "inputs": [
    {
      "internalType": "address",
      "name": "_userAddress",
      "type": "address"
    }
  ],
  "name": "getStudyData",
  "outputs": [
    {
      "components": [
        {
          "internalType": "uint32",
          "name": "id",
          "type": "uint32"
        },
        {
          "internalType": "uint8",
          "name": "score",
          "type": "uint8"
        },
        {
          "internalType": "uint32",
          "name": "time",
          "type": "uint32"
        }
      ],
      "internalType": "struct UtilityToken.StudyData[]",
      "name": "",
      "type": "tuple[]"
    }
  ],
  "stateMutability": "view",
  "type": "function"
},
{
  "inputs": [
    {
      "internalType": "address",
      "name": "_userAddress",
      "type": "address"
    }
  ],
  "name": "getSurveyData",
  "outputs": [
    {
      "internalType": "string",
      "name": "",
      "type": "string"
    },
    {
      "internalType": "string",
      "name": "",
      "type": "string"
    },
    {
      "internalType": "string",
      "name": "",
      "type": "string"
    },
    {
      "internalType": "string",
      "name": "",
      "type": "string"
    },
    {
      "internalType": "string",
      "name": "",
      "type": "string"
    },
    {
      "internalType": "string",
      "name": "",
      "type": "string"
    }
  ],
  "stateMutability": "view",
  "type": "function"
}];

async function writeDataToToken(data) {
  try {
    const provider = await detectProvider()
    const web3 = new Web3(provider);
    if (!provider) {
      throw new Error('MetaMask not detected')
    }

    await provider.request({ method: 'eth_requestAccounts' });
    
    const tokenContract = new web3.eth.Contract(tokenABI, tokenAddress);
    
    const _Q1 = data.Q1
    const _Q2 = data.Q2
    const _Q3 = data.Q3
    const _Q4 = data.Q4
    const _Q5 = data.Q5
    const _Q6 = data.Q6

    // Call the desired function of your token contract to write the JSON data
    await tokenContract.methods.setSurveyData(_Q1, _Q2, _Q3, _Q4, _Q5, _Q6).send({ from: provider.selectedAddress });
    
    console.log('Data written successfully');

  } catch (error) {
    console.error('Error writing data to token:', error)
  }
}

const SurveyForm = () => {
  const [region, setRegion] = useState('')
  const [grade, setGrade] = useState('')
  const [schoolGrade, setSchoolGrade] = useState('')
  const [schooltype, setschoolType] = useState('')
  const [target, setTarget] = useState('')
  const [studyType, setStudyType] = useState('')
  const router = useRouter()

  const handleSubmit = e => {
    e.preventDefault()
  }

  const submitUser = async () => {
    const cookieName = 'myCookie'
    let cookieValue = ''
    const cookies = document.cookie.split(';')
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim()
      if (cookie.startsWith(`${cookieName}=`)) {
        cookieValue = cookie.substring(cookieName.length + 1)
        break
      }
    }

    const userData = {
      MockGrade: grade,
      Region: region,
      SchoolGrade: schoolGrade,
      SchoolType: schooltype,
      StudyType: studyType,
      TargetGrade: target,
      wallet: cookieValue,
      score : 0
    }
    
    const surveyData = {
      Q1 : schooltype,
      Q2 : region,
      Q3 : grade,
      Q4 : schoolGrade,
      Q5 : target,
      Q6 : studyType
    }

    writeDataToToken(surveyData)

    const usersRef = collection(db, 'user')
    try {
      await addDoc(usersRef, userData)
      console.log('user added')
    } catch (error) {
      console.error('Error adding user: ', error)
    } finally {
      router.push('/')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Box mb={2}>
        <FormControl fullWidth required>
          <InputLabel>School Type</InputLabel>
          <Select value={schooltype} onChange={e => setschoolType(e.target.value)} fullWidth>
            <MenuItem value='Elementary'>Elementary</MenuItem>
            <MenuItem value='Middle'>Middle</MenuItem>
            <MenuItem value='High'>High</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box mb={2}>
        <TextField label='Region' value={region} onChange={e => setRegion(e.target.value)} fullWidth required />
      </Box>
      <Box mb={2}>
        <FormControl fullWidth required>
          <InputLabel>Mock Exam Grade</InputLabel>
          <Select value={grade} onChange={e => setGrade(e.target.value)} fullWidth>
            <MenuItem value='1'>1</MenuItem>
            <MenuItem value='23'>2~3</MenuItem>
            <MenuItem value='45'>4~5</MenuItem>
            <MenuItem value='67'>6~7</MenuItem>
            <MenuItem value='89'>8~9</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box mb={2}>
        <FormControl fullWidth required>
          <InputLabel>School Grade</InputLabel>
          <Select value={schoolGrade} onChange={e => setSchoolGrade(e.target.value)} fullWidth>
            <MenuItem value='1'>1</MenuItem>
            <MenuItem value='23'>2~3</MenuItem>
            <MenuItem value='45'>4~5</MenuItem>
            <MenuItem value='67'>6~7</MenuItem>
            <MenuItem value='89'>8~9</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box mb={2}>
        <FormControl fullWidth required>
          <InputLabel>Target Grade</InputLabel>
          <Select value={target} onChange={e => setTarget(e.target.value)} fullWidth>
            <MenuItem value='1'>1</MenuItem>
            <MenuItem value='23'>2~3</MenuItem>
            <MenuItem value='45'>4~5</MenuItem>
            <MenuItem value='67'>6~7</MenuItem>
            <MenuItem value='89'>8~9</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box mb={2}>
        <FormControl fullWidth required>
          <InputLabel>Study Type</InputLabel>
          <Select value={studyType} onChange={e => setStudyType(e.target.value)} fullWidth>
            <MenuItem value='solve'>Problem solving</MenuItem>
            <MenuItem value='memorization'>Memorization</MenuItem>
            <MenuItem value='concept'>concept-oriented</MenuItem>
            <MenuItem value='difficult'>high-difficulty problems</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Button type='submit' variant='contained' color='primary' onClick={submitUser}>
        Submit
      </Button>
    </form>
  )
}

export default SurveyForm
