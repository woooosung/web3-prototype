import React, { useState } from 'react'
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Box } from '@mui/material'
import { db } from '../../utils/firebaseConfig.js'
import { collection, addDoc } from 'firebase/firestore/lite'
import { useRouter } from 'next/router'

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
      wallet: cookieValue
    }
    console.log('DATA', userData)
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
