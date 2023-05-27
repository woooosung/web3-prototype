// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import { Avatar } from '@mui/material'

const createData = (rank: number, name: string, score: number, level: number, ow: string, image: string) => {
  return { rank, name, score, level, ow, image }
}

const rows = [
  createData(1, 'Woosung Kang', 1000, 24, '수학의 정석', 'man'),
  createData(2, 'Namwoo Kim', 500, 37, 'Hellooooo', 'man'),
  createData(3, 'Hyunhee Kang', 262, 16, 'Hiiii Heyyyy', 'girl')
]

const TableBasic = () => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
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
              <TableCell>
                <Avatar alt='Woosung' src={`/images/avatars/${row.image}.png`} sx={{ width: 34, height: 34 }} />
                <h4>{row.rank}</h4>
                <h3>{row.name}</h3>
              </TableCell>
              <TableCell>{row.score}</TableCell>
              <TableCell>{row.level}</TableCell>
              <TableCell>{row.ow}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TableBasic
