import React, { useState } from 'react'
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Box } from '@mui/material'

const SurveyForm = () => {
  const [region, setRegion] = useState('')
  const [grade, setGrade] = useState('')
  const [schoolGrade, setSchoolGrade] = useState('')
  const [schooltype, setschoolType] = useState('')
  const [mathStudyTime, setmathStudyTime] = useState('')
  const [target, setTarget] = useState('')
  const [studyType, setStudyType] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
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
        <TextField
          label='mathStudyTime (0~7)'
          value={mathStudyTime}
          onChange={e => setmathStudyTime(e.target.value)}
          fullWidth
          required
        />
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
      <Button type='submit' variant='contained' color='primary' onClick={() => submitUser}>
        Submit
      </Button>
    </form>
  )
}

export default SurveyForm
