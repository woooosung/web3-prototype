import React, { useState } from 'react'
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Box } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { db } from '../../utils/firebaseConfig.js'
import { collection, addDoc } from 'firebase/firestore/lite'
import { useRouter } from 'next/router'
import Web3 from 'web3'
import detectProvider from '@metamask/detect-provider'
import Typography from '@mui/material/Typography'

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

const useStyles = makeStyles((theme) => ({
  requiredIndicator: {
    color: theme.palette.error.main,
    '&::after': {
      content: "' *'",
    },
  },
}));


async function writeDataToToken(data) {
  try {
    const provider = await detectProvider()
    const web3 = new Web3(provider)
    if (!provider) {
      throw new Error('MetaMask not detected')
    }

    await provider.request({ method: 'eth_requestAccounts' })

    const tokenContract = new web3.eth.Contract(tokenABI, tokenAddress)

    const _Q1 = data.Q1
    const _Q2 = data.Q2
    const _Q3 = data.Q3
    const _Q4 = data.Q4
    const _Q5 = data.Q5
    const _Q6 = data.Q6

    // Call the desired function of your token contract to write the JSON data
    await tokenContract.methods.setSurveyData(_Q1, _Q2, _Q3, _Q4, _Q5, _Q6).send({ from: provider.selectedAddress })

    console.log('Data written successfully')
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
  const [userName, setUserName] = useState('')
  const [gender, setGender] = useState('')
  const [introduce, setIntroduce] = useState('')
  const router = useRouter()

  const handleSubmit = (e)=> {
    e.preventDefault()
  }

  function defaultPrevent() {
    if (userName.trim() === '') {
      alert(`You need to enter value into userName field!`);

      return false;
    }
    if (gender.trim() === '') {
      alert(`You need to enter value into gender field!`);

      return false;
    }
    if (schooltype.trim() === '') {
      alert(`You need to enter value into School Type field!`);

      return false;
    }
    if (region.trim() === '') {
      alert(`You need to enter value into Current Region field!`);

      return false;
    }
    if (grade.trim() === '') {
      alert(`You need to enter value into Mock Grade field!`);

      return false;
    }
    if (schoolGrade.trim() === '') {
      alert(`You need to enter value into School Grade field!`);

      return false;
    }
    if (target.trim() === '') {
      alert(`You need to enter value into Target Grade field!`);

      return false;
    }
    if (studyType.trim() === '') {
      alert(`You need to enter value into Study Type field!`);

      return false;
    }

    return true;
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
      userName : userName,
      gender : gender,
      intro : introduce,
      MockGrade: grade,
      Region: region,
      SchoolGrade: schoolGrade,
      SchoolType: schooltype,
      StudyType: studyType,
      TargetGrade: target,
      wallet: cookieValue,
      score: 0
    }

    const surveyData = {
      Q1: schooltype,
      Q2: region,
      Q3: grade,
      Q4: schoolGrade,
      Q5: target,
      Q6: studyType
    }

    const usersRef = collection(db, 'user')
    if (defaultPrevent()){
      try {
        await addDoc(usersRef, userData)
        console.log('user added')
      } catch (error) {
        console.error('Error adding user: ', error)
      } 
      const result = window.confirm('If you press "Yes" button, your survey about Study habit will be written in our utility token which is using Sepolia Testnet. If you agree, press "Yes"');
      try {
        if (result){
          await writeDataToToken(surveyData)
        }
      } catch (error) {
        console.log(error)
      } finally {
        window.location.replace('/')
      }
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant='h5'>Personal Information</Typography><br/>
      <Box mb={2}>
        <TextField label='UserName' value={userName} onChange={e => setUserName(e.target.value)} fullWidth required />
      </Box>
      <Box mb={2}>
        <TextField label='Please Introduce yourself with simple words' value={introduce} onChange={e => setIntroduce(e.target.value)} fullWidth required />
      </Box>
      <Box mb={2}>
        <FormControl fullWidth required>
          <InputLabel>Gender</InputLabel>
          <Select value={gender} onChange={e => setGender(e.target.value)} fullWidth>
            <MenuItem value='male'>Male</MenuItem>
            <MenuItem value='felame'>Female</MenuItem>
            <MenuItem value='unknown'>Don't want to specify</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <br/>
      <Typography variant='h5'>Study Information</Typography><br/>
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
        <TextField label='Current Region' value={region} onChange={e => setRegion(e.target.value)} fullWidth required />
      </Box>
      <Box mb={2}>
        <FormControl fullWidth required>
          <InputLabel>Mock Exam Grade(모의고사 성적)</InputLabel>
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
          <InputLabel>School Grade(내신 성적)</InputLabel>
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
          <InputLabel>Target Grade(목표 등급)</InputLabel>
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
