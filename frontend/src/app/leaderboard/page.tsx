"use client"
import { 
    Table,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableBody,
    Paper 
} from "@mui/material";

// take data from firebase
// async function getLeaderboardData() {
//     // await firebase results
//     const res = await fetch('http://localhost:3000/api/leaderboard');

//     if (!res.ok) {
//         throw new Error("Failed to fetch leaderboard data");
//     }
// }

const columns = [
    "User Name",
    "Level",
    "Score",
]

export default async function LeaderboardPage() {
    // const data = await getLeaderboardData();
    // test data
    const data = [
        {name: "John", level: 1, score: 100},
        {name: "Woosung", level: 1, score: 1},
        {name: "Namwoo", level: 100, score: 1000},
    ];

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                    {columns.map((column) => (<TableCell>{column}</TableCell>))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row) => (
                        <TableRow>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>{row.level}</TableCell>
                            <TableCell>{row.score}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}