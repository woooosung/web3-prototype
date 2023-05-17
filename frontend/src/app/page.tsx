"use client";
import { Button, Grid, Stack } from "@mui/material";

export default function Home() {
  return (
    <Grid container height="100vh" alignItems="center" justifyContent="center" direction="column">
        <h1>Let's study with us!</h1>
        <Button variant="contained">Start</Button>
    </Grid>
  );
}